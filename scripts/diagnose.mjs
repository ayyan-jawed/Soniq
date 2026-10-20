import { chromium } from "playwright-core";

const base = process.argv[2] || "http://localhost:3100";
const browser = await chromium.launch({ channel: "msedge" });

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const logs = [];
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning") logs.push(`${m.type()}: ${m.text()}`);
});
page.on("pageerror", (e) => logs.push("pageerror: " + e.message));
await page.goto(base + "/search?q=studio", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(base + "/", { waitUntil: "networkidle" });
await mobile.waitForTimeout(800);
const offenders = await mobile.evaluate(() => {
  const width = document.documentElement.clientWidth;
  const out = [];
  document.querySelectorAll("*").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.right > width + 1) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className && typeof el.className === "string" ? el.className : "").slice(0, 80),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      });
    }
  });
  return out.slice(0, 20);
});

console.log(JSON.stringify({ searchLogs: logs, mobileOffenders: offenders }, null, 2));
await browser.close();
