import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(process.argv[2], { waitUntil: "networkidle" });
await page.waitForTimeout(500);

const selectors = process.argv.slice(3);
const result = {};
for (const sel of selectors) {
  const el = page.locator(sel).first();
  if ((await el.count()) === 0) {
    result[sel] = null;
    continue;
  }
  result[sel] = await el.evaluate((node) => {
    const r = node.getBoundingClientRect();
    const cs = getComputedStyle(node);
    return {
      w: Math.round(r.width),
      h: Math.round(r.height),
      aspect: cs.aspectRatio,
      objectFit: cs.objectFit,
      natural: node.tagName === "IMG" ? `${node.naturalWidth}x${node.naturalHeight}` : undefined,
    };
  });
}
console.log(JSON.stringify(result, null, 2));
await browser.close();
