import { chromium } from "playwright-core";

const base = process.argv[2] || "http://localhost:3100";
const routes = ["/", "/shop", "/product/soniq-one", "/search?q=studio", "/cart", "/checkout", "/support/faqs"];
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const bad = [];
page.on("pageerror", (e) => bad.push("pageerror " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") bad.push("console " + m.text().slice(0, 120));
});
const rows = [];
for (const route of routes) {
  const res = await page.goto(base + route, { waitUntil: "networkidle" });
  rows.push({ route, status: res?.status(), title: await page.title() });
}
console.log(JSON.stringify({ rows, bad }, null, 2));
await browser.close();
