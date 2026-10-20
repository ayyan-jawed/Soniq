import { chromium } from "playwright-core";

const base = process.argv[2] || "http://localhost:3100";
const browser = await chromium.launch({ channel: "msedge" });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

const results = [];
const check = (name, pass, detail = "") => results.push({ name, pass: Boolean(pass), detail });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

// ---------- cart: add from PDP ----------
await page.goto(base + "/product/soniq-one", { waitUntil: "networkidle" });
await page.locator(".pdp__add").click();
await page.waitForSelector(".drawer", { timeout: 5000 });
const drawerVisible = await page.locator(".drawer").isVisible();
check("PDP add to bag opens drawer", drawerVisible);
const drawerText = await page.locator(".drawer").innerText();
check("drawer shows SONIQ ONE", drawerText.includes("SONIQ ONE"));
check("drawer shows Obsidian finish", drawerText.toLowerCase().includes("obsidian"));

// badge count
const badge = await page.locator(".cart-count").innerText();
check("header bag count is 1", badge.trim() === "1", `got "${badge}"`);

// close drawer with Escape
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
check("Escape closes drawer", (await page.locator(".drawer").count()) === 0);

// persistence after reload
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(500);
const badgeAfter = await page.locator(".cart-count").innerText();
check("cart persists after reload", badgeAfter.trim() === "1", `got "${badgeAfter}"`);

// ---------- colour switch on PDP ----------
await page.goto(base + "/product/soniq-one", { waitUntil: "networkidle" });
const swatches = page.locator(".pdp__colors .swatch");
check("PDP has 3 finishes", (await swatches.count()) === 3, `${await swatches.count()}`);
await swatches.nth(2).click();
await page.waitForTimeout(300);
const colorName = await page.locator(".pdp__color-name").innerText();
check("colour switch updates finish label", colorName.includes("Signal Lime"), colorName);

// quantity + add second line
await page.locator(".qty button").nth(1).click();
await page.locator(".pdp__add").click();
await page.waitForSelector(".drawer");
const lineCount = await page.locator(".drawer .line-item").count();
check("second finish becomes a separate line", lineCount === 2, `${lineCount} lines`);
await page.keyboard.press("Escape");

// ---------- cart page: qty + promo ----------
await page.goto(base + "/cart", { waitUntil: "networkidle" });
await page.waitForTimeout(400);
const subtotalText = await page.locator(".summary__totals .totals__row").first().innerText();
check("cart summary renders subtotal", subtotalText.includes("$"), subtotalText);

await page.fill("#promo", "LISTEN10");
await page.locator(".summary__promo button[type=submit]").click();
await page.waitForTimeout(300);
const discountRow = await page.locator(".summary__discount").innerText().catch(() => "");
check("promo LISTEN10 applies discount", discountRow.includes("LISTEN10"), discountRow);

// invalid promo
await page.evaluate(() => window.localStorage.removeItem("soniq.promo.v1"));
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(300);
await page.fill("#promo", "NOPE");
await page.locator(".summary__promo button[type=submit]").click();
await page.waitForTimeout(200);
const promoError = await page.locator("#promo-error").innerText();
check("invalid promo shows error", promoError.toLowerCase().includes("not recognised"), promoError);

// ---------- checkout validation ----------
await page.goto(base + "/checkout", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.locator(".checkout__submit button[type=submit]").click();
await page.waitForTimeout(300);
const emailErr = await page.locator("#email-error").innerText();
check("empty checkout shows email error", emailErr.length > 0, emailErr);

await page.fill("#email", "test@example.com");
await page.fill("#firstName", "Ada");
await page.fill("#lastName", "Lovelace");
await page.fill("#address", "12 Analytical Way");
await page.fill("#city", "London");
await page.fill("#postal", "N1 9AB");
await page.locator(".checkout__submit button[type=submit]").click();
await page.waitForTimeout(600);
const doneText = await page.locator(".checkout-done__panel").innerText().catch(() => "");
check("checkout reaches demo confirmation", doneText.includes("No order was placed"), doneText.slice(0, 80));
const paymentClaims = /charged successfully|payment received|order confirmed/i.test(doneText);
check("confirmation does not claim a real payment", !paymentClaims);

// ---------- shop filters ----------
await page.goto(base + "/shop", { waitUntil: "networkidle" });
const initialCount = await page.locator(".catalog__count").innerText();
check("shop shows 8 products", initialCount.includes("8"), initialCount);
await page.getByRole("checkbox", { name: "Studio", exact: false }).check();
await page.waitForTimeout(300);
const studioCount = await page.locator(".catalog__count").innerText();
check("studio filter narrows to 2", studioCount.includes("2"), studioCount);
const activeChips = await page.locator(".active-filter").count();
check("active filter chip is shown", activeChips >= 1, `${activeChips}`);

// empty state
await page.getByRole("searchbox", { name: /search products by name/i }).fill("zzzz");
await page.waitForTimeout(300);
const emptyVisible = await page.locator(".empty").isVisible();
check("no-match state appears", emptyVisible);
await page.getByRole("button", { name: /reset all filters/i }).click();
await page.waitForTimeout(300);
const resetCount = await page.locator(".catalog__count").innerText();
check("reset restores full catalogue", resetCount.includes("8"), resetCount);

// load more
const cardsBefore = await page.locator(".catalog__grid .product-card").count();
check("load-more initial page is 6", cardsBefore === 6, `${cardsBefore}`);
await page.getByRole("button", { name: "Load more" }).click();
await page.waitForTimeout(300);
const cardsAfter = await page.locator(".catalog__grid .product-card").count();
check("load more reveals remaining 2", cardsAfter === 8, `${cardsAfter}`);

// ---------- search overlay ----------
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Search products" }).click();
await page.waitForTimeout(300);
await page.locator("#site-search").fill("PRO");
await page.waitForTimeout(300);
const resultsCount = await page.locator(".search-panel .search-result").count();
check("search overlay returns results for PRO", resultsCount >= 2, `${resultsCount}`);
await page.locator("#site-search").press("Enter");
await page.waitForTimeout(600);
check("search submit navigates to /search", page.url().includes("/search?q=PRO"), page.url());

// ---------- newsletter validation ----------
await page.goto(base + "/", { waitUntil: "networkidle" });
const panelForm = page.locator(".newsletter-panel form");
await panelForm.locator("button[type=submit]").click();
await page.waitForTimeout(200);
const nlError = await panelForm.locator(".field__error").first().innerText();
check("newsletter blocks empty submit", nlError.length > 0, nlError);
await panelForm.locator("input[type=email]").fill("listener@example.com");
await panelForm.locator("input[type=checkbox]").check();
await panelForm.locator("button[type=submit]").click();
await page.waitForTimeout(300);
const nlStatus = await page.locator(".newsletter-panel .form-status").innerText();
check("newsletter success states no email was sent", /no email was sent|nothing/i.test(nlStatus), nlStatus.slice(0, 60));

// ---------- mobile menu ----------
const mobile = await context.newPage();
await mobile.setViewportSize({ width: 390, height: 844 });
await mobile.goto(base + "/", { waitUntil: "networkidle" });
await mobile.getByRole("button", { name: "Open menu" }).click();
await mobile.waitForTimeout(300);
check("mobile menu opens", await mobile.locator(".mobile-menu").isVisible());
await mobile.keyboard.press("Escape");
await mobile.waitForTimeout(300);
check("Escape closes mobile menu", (await mobile.locator(".mobile-menu").count()) === 0);

console.log(JSON.stringify({ results, consoleErrors: errors.slice(0, 5) }, null, 2));
await browser.close();
