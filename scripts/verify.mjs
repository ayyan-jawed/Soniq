import { chromium } from "playwright-core";

const base = process.argv[2] || "http://localhost:3100";
const browser = await chromium.launch({ channel: "msedge" });
const results = [];
const check = (name, pass, detail = "") => results.push({ name, pass: Boolean(pass), detail: String(detail).slice(0, 120) });
const settled = (t) => { if (!t || t === "none") return true; const m = t.match(/matrix\(([^)]+)\)/); if (!m) return false; const parts = m[1].split(",").map(Number); return Math.abs(parts[5] || 0) < 0.5; };

// ---------- navigation + mega menu ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });

  for (const [label, path, heading] of [
    ["Shop", "/shop", "All headphones"],
    ["Technology", "/technology", "The measured"],
    ["Our Story", "/our-story", "Built for the"],
  ]) {
    await page.getByRole("link", { name: label, exact: true }).first().click();
    await page.waitForURL(`**${path}`, { timeout: 15000 });
    const h1 = await page.locator("h1").first().innerText();
    check(`nav → ${path}`, page.url().endsWith(path) && h1.toLowerCase().includes(heading.split(" ")[0].toLowerCase()), h1.replace(/\n/g, " "));
    await page.goto(base, { waitUntil: "networkidle" });
  }

  const collections = page.getByRole("button", { name: "Collections" });
  await collections.click();
  await page.waitForTimeout(400);
  const megaVisible = await page.locator(".mega").isVisible();
  const megaLinks = await page.locator(".mega__card").count();
  check("mega menu opens with 4 collections", megaVisible && megaLinks === 4, `${megaLinks} cards`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  check("Escape closes mega menu", (await page.locator(".mega").count()) === 0);

  await page.getByRole("button", { name: /open bag/i }).click();
  await page.waitForTimeout(400);
  check("bag button opens drawer", await page.locator(".drawer").isVisible());
  await page.keyboard.press("Escape");

  check("no console errors during nav", errors.length === 0, errors.join(" | "));
  await page.close();
}

// ---------- slogan + reveal + rapid scroll ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator(".slogan").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  const slogan = await page.evaluate(() => {
    const lines = Array.from(document.querySelectorAll(".slogan__text"));
    return lines.map((el) => {
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { text: el.textContent.trim(), transform: cs.transform, visible: rect.width > 0 && rect.height > 0 };
    });
  });
  check(
    "slogan shows both clauses in full",
    slogan.length === 2 && slogan[0].text === "Made for the moment." && slogan[1].text === "Tuned for everything.",
    JSON.stringify(slogan.map((s) => s.text)),
  );
  check(
    "slogan lines are not clipped by transform",
    slogan.every((s) => settled(s.transform) && s.visible),
    slogan.map((s) => s.transform).join(" / "),
  );

  // rapid scroll to the bottom
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 1800) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForTimeout(1500);
  const reveal = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll("[data-reveal]"));
    return { total: all.length, shown: all.filter((el) => el.classList.contains("is-in")).length };
  });
  check("every reveal block is visible after a fast scroll", reveal.shown === reveal.total, `${reveal.shown}/${reveal.total}`);

  const hiddenText = await page.evaluate(() => {
    const hero = document.querySelector(".hero__title");
    const h1 = document.querySelector("h1");
    return { heroText: hero?.textContent?.trim().length ?? 0, h1: h1?.textContent?.trim().length ?? 0 };
  });
  check("hero headline text present", hiddenText.heroText > 10 && hiddenText.h1 > 10, JSON.stringify(hiddenText));
  await page.close();
}

// ---------- mobile overflow on every route ----------
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const routes = [
    "/", "/shop", "/product/soniq-one", "/collections/wireless", "/collections/studio",
    "/collections/travel", "/collections/new", "/technology", "/our-story", "/search",
    "/search?q=studio", "/cart", "/checkout", "/account", "/contact",
    "/support/shipping-returns", "/support/warranty", "/support/product-support",
    "/support/faqs", "/legal/privacy", "/legal/terms", "/careers",
  ];
  const overflows = [];
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(150);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (over > 0) overflows.push(`${route}:${over}px`);
  }
  check("no horizontal overflow on any mobile route", overflows.length === 0, overflows.join(", "));

  // slogan at mobile width
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator(".slogan").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const mobileSlogan = await page.evaluate(() => {
    const el = document.querySelector(".slogan__title");
    const rect = el.getBoundingClientRect();
    const lines = Array.from(document.querySelectorAll(".slogan__text")).map((s) => s.getBoundingClientRect());
    return {
      width: Math.round(rect.width),
      within: lines.every((l) => l.right <= window.innerWidth && l.left >= 0),
      heights: lines.map((l) => Math.round(l.height)),
    };
  });
  check("slogan fits inside the mobile viewport", mobileSlogan.within && mobileSlogan.heights.every((h) => h > 10), JSON.stringify(mobileSlogan));
  await page.close();
}

// ---------- no JavaScript ----------
{
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "load" });
  const visible = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const slogan = document.querySelector(".slogan__text");
    const cs = slogan ? getComputedStyle(slogan) : null;
    return {
      h1: h1?.textContent?.trim().slice(0, 40) ?? "",
      sloganOpacity: cs?.opacity ?? "0",
      sloganTransform: cs?.transform ?? "none",
    };
  });
  check("content is readable without JavaScript", visible.h1.length > 5 && visible.sloganOpacity !== "0", JSON.stringify(visible));
  await context.close();
}

// ---------- reduced motion ----------
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  const state = await page.evaluate(() => {
    const slogan = document.querySelector(".slogan__text");
    const firstReveal = document.querySelector("[data-reveal]");
    return {
      sloganTransform: slogan ? getComputedStyle(slogan).transform : "none",
      revealed: document.querySelectorAll("[data-reveal].is-in").length,
      total: document.querySelectorAll("[data-reveal]").length,
    };
  });
  check(
    "reduced motion shows content immediately",
    settled(state.sloganTransform) && state.revealed === state.total,
    JSON.stringify(state),
  );
  await context.close();
}

// ---------- images across key routes ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const broken = [];
  for (const route of ["/", "/shop", "/product/soniq-one", "/collections/studio", "/technology", "/our-story"]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 600) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(90);
    }
    await page.waitForTimeout(700);
    const bad = await page.evaluate(() =>
      Array.from(document.images)
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src),
    );
    if (bad.length) broken.push(`${route}: ${bad.join(" ")}`);
  }
  check("all images load on every image-heavy route", broken.length === 0, broken.join(" | "));
  await page.close();
}

console.log(JSON.stringify({ results, failed: results.filter((r) => !r.pass).length }, null, 2));
await browser.close();
