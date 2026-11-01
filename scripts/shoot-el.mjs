import { chromium } from "playwright-core";

const [url, selector, out, width = "1440"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const locator = page.locator(selector).first();
await locator.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await locator.screenshot({ path: out });
const box = await locator.boundingBox();
console.log(JSON.stringify({ selector, width: Math.round(box?.width ?? 0), height: Math.round(box?.height ?? 0) }));
await browser.close();
