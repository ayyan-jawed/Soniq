import { chromium } from "playwright-core";

const base = process.argv[2] || "http://localhost:3100";
const routes = [
  "/",
  "/shop",
  "/product/soniq-one",
  "/product/soniq-one-se",
  "/product/soniq-pro",
  "/product/soniq-pro-reference",
  "/product/soniq-air",
  "/product/soniq-air-lite",
  "/product/soniq-flow",
  "/product/soniq-flow-signal",
  "/collections/wireless",
  "/collections/studio",
  "/collections/travel",
  "/collections/new",
  "/technology",
  "/our-story",
  "/search",
  "/search?q=studio",
  "/search?q=zzzz",
  "/cart",
  "/checkout",
  "/account",
  "/contact",
  "/support/shipping-returns",
  "/support/warranty",
  "/support/product-support",
  "/support/faqs",
  "/legal/privacy",
  "/legal/terms",
  "/careers",
  "/definitely-not-a-page",
];

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

let consoleErrors = [];
let failedRequests = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text().slice(0, 300));
});
page.on("pageerror", (err) => consoleErrors.push("pageerror: " + err.message.slice(0, 300)));
page.on("requestfailed", (req) => failedRequests.push(`${req.url()} ${req.failure()?.errorText}`));

const results = [];
for (const route of routes) {
  consoleErrors = [];
  failedRequests = [];
  const response = await page.goto(base + route, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(250);
  // scroll through so lazy images are requested before we measure
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < totalHeight; y += 700) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(90);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
  const data = await page.evaluate(() => {
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const broken = Array.from(document.images)
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src);
    return {
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim().slice(0, 70) ?? null,
      overflow,
      broken: broken.length,
      imgCount: document.images.length,
    };
  });
  results.push({
    route,
    status: response?.status(),
    ...data,
    errors: [...consoleErrors, ...failedRequests].slice(0, 3),
  });
}

// mobile overflow sweep
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mobileResults = [];
for (const route of ["/", "/shop", "/product/soniq-one", "/cart", "/checkout", "/account", "/contact", "/our-story", "/technology", "/support/faqs", "/careers"]) {
  await mobile.goto(base + route, { waitUntil: "networkidle", timeout: 45000 });
  await mobile.waitForTimeout(250);
  const overflow = await mobile.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  mobileResults.push({ route, overflow });
}

console.log(JSON.stringify({ results, mobileResults }, null, 2));
await browser.close();
