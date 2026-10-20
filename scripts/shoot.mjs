import { chromium } from "playwright-core";

const [url, out, widthArg = "1440", heightArg = "900", fullArg = "true"] = process.argv.slice(2);
const width = Number(widthArg);
const height = Number(heightArg);
const fullPage = fullArg !== "false";

const browser = await chromium.launch({
  channel: process.env.PW_CHANNEL || "msedge",
  args: ["--force-color-profile=srgb", "--font-render-hinting=none"],
});
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });

const problems = [];
page.on("console", (msg) => {
  if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
});
page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
page.on("requestfailed", (req) => problems.push(`requestfailed: ${req.url()} — ${req.failure()?.errorText}`));

const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(600);

// scroll through the document so lazy images and reveals are triggered
const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += Math.round(height * 0.8)) {
  await page.evaluate((pos) => window.scrollTo(0, pos), y);
  await page.waitForTimeout(220);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);

await page.evaluate(() => {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
});
await page.waitForTimeout(400);

await page.screenshot({ path: out, fullPage });

const metrics = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  height: document.documentElement.scrollHeight,
  title: document.title,
  brokenImages: Array.from(document.images)
    .filter((img) => !img.complete || img.naturalWidth === 0)
    .map((img) => img.currentSrc || img.src),
  imageCount: document.images.length,
}));

console.log(JSON.stringify({ status: response?.status(), url: page.url(), ...metrics, problems }, null, 2));
await browser.close();
