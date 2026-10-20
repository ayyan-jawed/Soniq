import { chromium } from "playwright-core";

const [url, out] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.addInitScript(() => {
  window.localStorage.setItem(
    "soniq.cart.v1",
    JSON.stringify([
      { slug: "soniq-one", color: "Obsidian", qty: 1 },
      { slug: "soniq-pro", color: "Graphite", qty: 1 },
    ]),
  );
  window.localStorage.removeItem("soniq.announce.dismissed");
});

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += 700) {
  await page.evaluate((pos) => window.scrollTo(0, pos), y);
  await page.waitForTimeout(120);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.screenshot({ path: out, fullPage: true });
console.log(JSON.stringify({ url: page.url(), height: total }, null, 2));
await browser.close();
