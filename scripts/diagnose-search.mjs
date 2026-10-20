import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const out = [];
page.on("console", (m) => {
  if (m.type() === "error") out.push("console: " + m.text());
});
page.on("pageerror", (e) => out.push("pageerror: " + e.message));
page.on("requestfailed", (r) => out.push("requestfailed: " + r.url() + " " + r.failure()?.errorText));
page.on("response", (r) => {
  if (r.status() >= 400) out.push(`response ${r.status()}: ${r.url()}`);
});

for (const route of ["/search", "/search?q=studio", "/search?q=zzzz"]) {
  out.push("--- " + route);
  await page.goto("http://localhost:3100" + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
}

console.log(JSON.stringify(out, null, 2));
await browser.close();
