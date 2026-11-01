import { chromium } from "playwright-core";

const [url, label = "run"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "msedge" });

async function runOnce() {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__perf = { lcp: 0, cls: 0, longTasks: 0, longTaskMs: 0, fcp: 0 };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__perf.lcp = Math.max(window.__perf.lcp, entry.startTime);
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__perf.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__perf.longTasks += 1;
        window.__perf.longTaskMs += entry.duration;
      }
    }).observe({ type: "longtask", buffered: true });
    new PerformanceObserver((list) => {
      const fcp = list.getEntries().find((e) => e.name === "first-contentful-paint");
      if (fcp) window.__perf.fcp = fcp.startTime;
    }).observe({ type: "paint", buffered: true });
  });

  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(3500);

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const res = performance.getEntriesByType("resource");
    const js = res.filter((r) => r.initiatorType === "script" || /\.js(\?|$)/.test(r.name));
    const imgs = res.filter((r) => r.initiatorType === "img" || /\/_next\/image/.test(r.name));
    const sum = (arr, key) => arr.reduce((s, r) => s + (r[key] || 0), 0);
    return {
      ttfb: Math.round(nav.responseStart),
      fcp: Math.round(window.__perf.fcp),
      lcp: Math.round(window.__perf.lcp),
      cls: Number(window.__perf.cls.toFixed(4)),
      longTasks: window.__perf.longTasks,
      longTaskMs: Math.round(window.__perf.longTaskMs),
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
      load: Math.round(nav.loadEventEnd),
      requests: res.length,
      transferKB: Math.round(sum(res, "transferSize") / 1024),
      jsTransferKB: Math.round(sum(js, "transferSize") / 1024),
      imgTransferKB: Math.round(sum(imgs, "transferSize") / 1024),
      jsRequests: js.length,
    };
  });

  await context.close();
  return metrics;
}

// first run warms caches / image optimiser, second run is the measured one
await runOnce();
const metrics = await runOnce();
console.log(JSON.stringify({ label, url, metrics }, null, 2));
await browser.close();
