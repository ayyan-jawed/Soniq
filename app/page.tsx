import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HeroMedia } from "@/components/home/HeroMedia";
import { HomeSpotlight } from "@/components/home/HomeSpotlight";
import { ProductCard } from "@/components/product/ProductCard";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { SloganBand } from "@/components/ui/SloganBand";
import { ArrowRight, ArrowUpRight, ShieldIcon, TruckIcon, RefreshIcon, WaveIcon } from "@/components/ui/icons";
import { getProduct, formatPrice } from "@/lib/products";
import { collections } from "@/lib/collections";
import "./home.css";

export const metadata: Metadata = {
  title: { absolute: "SONIQ — Feel every frequency" },
  description:
    "SONIQ builds premium over-ear headphones for people who listen closely: adaptive noise cancelling, head-tracked spatial audio and custom-tuned drivers.",
};

const WAVE_BARS = Array.from({ length: 44 }, (_, i) => {
  const wave = Math.sin(i * 0.42) * 0.5 + Math.sin(i * 0.13 + 2) * 0.5;
  return Math.round(22 + Math.abs(wave) * 70);
});

const SPEC_LABELS = [
  { value: "40 mm", label: "Beryllium driver" },
  { value: "42 h", label: "Playback, ANC on" },
  { value: "−42 dB", label: "Adaptive cancelling" },
];

export default function HomePage() {
  const one = getProduct("soniq-one")!;
  const pro = getProduct("soniq-pro")!;
  const air = getProduct("soniq-air")!;
  const flow = getProduct("soniq-flow")!;
  const spotlightNotes = one.notes;
  const compareProducts = [one, pro, air, flow];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero" aria-labelledby="hero-title">
        <HeroMedia />

        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">SONIQ 001 — Active noise cancelling</p>

            <h1 className="hero__title" id="hero-title" aria-label="Feel every frequency.">
              <span className="hero__line">
                <span>Feel every</span>
              </span>
              <span className="hero__line">
                <span>
                  frequency<span className="lime">.</span>
                </span>
              </span>
            </h1>

            <p className="hero__lede">
              Engineered for the sound you live in. Designed for the world you move through.
            </p>

            <div className="hero__actions">
              <Link href="/shop" className="btn btn--lime">
                Explore the collection <ArrowRight />
              </Link>
              <Link href="/our-story" className="btn btn--ghost">
                Discover SONIQ
              </Link>
            </div>

            <dl className="hero__specs">
              {SPEC_LABELS.map((spec) => (
                <div key={spec.label}>
                  <dd>{spec.value}</dd>
                  <dt>{spec.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="hero__labels" aria-hidden="true">
          <span className="hero__label">
            <span className="hero__label-text">40 mm beryllium</span>
            <span className="hero__label-line" />
          </span>
          <span className="hero__label">
            <span className="hero__label-text">Adaptive −42 dB</span>
            <span className="hero__label-line" />
          </span>
          <span className="hero__label">
            <span className="hero__label-text">268 g / 42 h</span>
            <span className="hero__label-line" />
          </span>
        </div>

        <div className="hero__wave" aria-hidden="true">
          {WAVE_BARS.map((h, i) => (
            <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 55}ms` }} />
          ))}
        </div>

        <a href="#collection" className="hero__scroll">
          <span className="mono">Scroll</span>
          <span className="hero__scroll-line" aria-hidden="true" />
        </a>
      </section>

      <div className="trust-strip">
        <div className="container trust-strip__inner">
          <span className="trust-strip__item">
            <TruckIcon /> Free express shipping over $150
          </span>
          <span className="trust-strip__item">
            <RefreshIcon /> 30-day returns
          </span>
          <span className="trust-strip__item">
            <ShieldIcon /> 2-year warranty
          </span>
          <span className="trust-strip__item">
            <WaveIcon /> Tuned in Copenhagen
          </span>
        </div>
      </div>

      {/* ================= FEATURED ================= */}
      <section className="section" id="collection" aria-labelledby="collection-title">
        <div className="container">
          <div className="section-head">
            <div data-reveal>
              <p className="eyebrow">01 — Featured collection</p>
              <h2 className="section-head__title" id="collection-title">
                The reference.
                <br />
                And the four that follow it.
              </h2>
            </div>
            <div data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
              <p className="section-head__note">
                Four models, one tuning philosophy. Prices shown are demo data, consistent everywhere
                on this site.
              </p>
              <Link href="/shop" className="link-arrow" style={{ marginTop: "1rem" }}>
                Shop all headphones <ArrowUpRight />
              </Link>
            </div>
          </div>

          <div className="feature-grid">
            <div className="feature-grid__hero" data-reveal>
              <ProductCard product={one} sizes="(max-width: 900px) 100vw, 66vw" priority />
            </div>

            <div
              className="feature-grid__cta"
              data-reveal
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              <p className="mono">All 8 products · demo catalogue</p>
              <h3>
                Not sure
                <br />
                which one?
              </h3>
              <p className="feature-grid__cta-copy">
                Filter by how you listen. Four collections, one tuning philosophy.
              </p>
              <ul className="feature-grid__cta-list">
                {collections.map((collection) => (
                  <li key={collection.slug}>
                    <Link href={`/collections/${collection.slug}`}>
                      <span>{collection.shortName}</span>
                      <ArrowUpRight width={12} height={12} />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="feature-grid__cta-note">
                Every model ships with a case, a USB-C cable and a two-year warranty.
              </p>
              <Link href="/shop" className="link-arrow">
                Browse the catalogue <ArrowUpRight />
              </Link>
            </div>

            {[getProduct("soniq-one-se")!, pro, air, flow].map((product, index) => (
              <div
                className="feature-grid__small"
                key={product.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
              >
                <ProductCard product={product} sizes="(max-width: 640px) 100vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SOUND LAB ================= */}
      <section className="section section--lab" aria-labelledby="lab-title">
        <div className="container">
          <div className="section-head">
            <div data-reveal>
              <p className="eyebrow">02 — The sound lab</p>
              <h2 className="section-head__title" id="lab-title">
                Three systems,
                <br />
                one intention.
              </h2>
            </div>
            <p className="section-head__note" data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
              Everything below is described the way it was designed, not the way a brochure would
              sell it. Figures are product specifications from the demo catalogue.
            </p>
          </div>

          <div className="lab">
            <figure className="lab__visual" data-reveal>
              <Image
                src="/images/lab-exploded.jpg"
                alt="Exploded view of a SONIQ headphone: driver housings, ear pads, mesh grilles and circuit board laid out on a workbench"
                width={1200}
                height={900}
                sizes="(max-width: 900px) 100vw, 55vw"
              />
              <figcaption>
                <span className="mono">Exploded study — 31 parts, 7 serviceable</span>
                <span className="mono">Fig. 02</span>
              </figcaption>
            </figure>

            <div className="lab__features">
              {[
                {
                  n: "01",
                  title: "Adaptive cancellation",
                  body: "Six microphones sample the room 48,000 times a second. The correction is continuous rather than a set of fixed presets, so the cabin, the carriage and the open-plan office are handled by different curves.",
                  spec: "−42 dB · 8 microphones",
                },
                {
                  n: "02",
                  title: "Head-tracked spatial audio",
                  body: "A deliberate front bias keeps the mix in front of you when you turn. Film and games open up; music stays where the mastering engineer left it.",
                  spec: "Dynamic · head-tracked",
                },
                {
                  n: "03",
                  title: "Custom-tuned drivers",
                  body: "Beryllium-coated diaphragms are measured in pairs, matched before assembly and written into the serial record. The chamber is tuned in an anechoic room, not in software.",
                  spec: "40–45 mm · 5 Hz – 48 kHz",
                },
              ].map((feature, index) => (
                <article
                  className="lab__feature"
                  key={feature.n}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
                >
                  <span className="lab__num mono">{feature.n}</span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                    <p className="mono lab__spec">{feature.spec}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <p className="lab__note mono">
            Demo content — SONIQ is a fictional brand. Specifications are internally consistent but
            not certified by any third party.
          </p>
        </div>
      </section>

      {/* ================= SPOTLIGHT ================= */}
      <HomeSpotlight />

      {/* ================= SLOGAN ================= */}
      <SloganBand first="Made for the moment." second="Tuned for everything." />

      {/* ================= LIFESTYLE ================= */}
      <section className="section" aria-labelledby="life-title">
        <div className="container">
          <div className="section-head">
            <div data-reveal>
              <p className="eyebrow">03 — In use</p>
              <h2 className="section-head__title" id="life-title">
                Three rooms.
                <br />
                Three curves.
              </h2>
            </div>
            <p className="section-head__note" data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
              Three environments the family was tuned in. The commute shapes the cancelling, the
              studio shapes the curve, the late desk shapes the clamp.
            </p>
          </div>

          <div className="life-grid">
            <figure className="life-grid__main" data-reveal>
              <Image
                src="/images/life-commute.jpg"
                alt="Listener wearing obsidian SONIQ headphones on a night station platform as a train arrives"
                width={1600}
                height={2000}
                sizes="(max-width: 900px) 100vw, 58vw"
              />
              <figcaption>
                <span className="mono">06:42 — Line 4, northbound</span>
                <span className="mono">ONE · ANC</span>
              </figcaption>
            </figure>
            <div className="life-grid__side">
              <figure data-reveal style={{ ["--reveal-delay" as string]: "90ms" }}>
                <Image
                  src="/images/life-studio.jpg"
                  alt="Producer at a mixing console in a dark studio wearing SONIQ PRO headphones"
                  width={1800}
                  height={1011}
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
                <figcaption>
                  <span className="mono">14:20 — Studio B</span>
                  <span className="mono">PRO · 4 ms wired</span>
                </figcaption>
              </figure>
              <figure data-reveal style={{ ["--reveal-delay" as string]: "170ms" }}>
                <Image
                  src="/images/life-night.jpg"
                  alt="Designer working late at a dark desk wearing warm ivory SONIQ AIR headphones"
                  width={1800}
                  height={1011}
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
                <figcaption>
                  <span className="mono">23:10 — Kitchen table</span>
                  <span className="mono">AIR · 218 g</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPARISON ================= */}
      <section className="section section--compare" aria-labelledby="compare-title">
        <div className="container">
          <div className="section-head">
            <div data-reveal>
              <p className="eyebrow">04 — Compare</p>
              <h2 className="section-head__title" id="compare-title">
                The numbers,
                <br />
                without the adjectives.
              </h2>
            </div>
            <p className="section-head__note" data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
              Measured with cancelling on, at 60% volume. Full specifications live on each product
              page.
            </p>
          </div>

          <div className="compare-wrap" data-reveal>
            <table className="compare">
              <caption className="sr-only">Comparison of SONIQ ONE, PRO, AIR and FLOW</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="mono">Model</span>
                  </th>
                  {compareProducts.map((p) => (
                    <th scope="col" key={p.slug}>
                      <Link href={`/product/${p.slug}`}>
                        <span className="compare__name">{p.name}</span>
                        <span className="compare__price">{formatPrice(p.price)}</span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Battery (ANC on)",
                    values: compareProducts.map((p) => `${p.battery} h`),
                  },
                  { label: "Weight", values: compareProducts.map((p) => `${p.weight} g`) },
                  { label: "Cancelling", values: compareProducts.map((p) => `−${p.ancDepth} dB`) },
                  { label: "Driver", values: compareProducts.map((p) => p.driver) },
                  { label: "Connectivity", values: compareProducts.map((p) => p.connectivity) },
                  { label: "Best for", values: compareProducts.map((p) => p.bestFor) },
                ].map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, i) => (
                      <td key={`${row.label}-${i}`}>{value}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row">
                    <span className="sr-only">Links</span>
                  </th>
                  {compareProducts.map((p) => (
                    <td key={`link-${p.slug}`}>
                      <Link href={`/product/${p.slug}`} className="compare__link mono">
                        View <ArrowUpRight width={10} height={10} />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <p className="compare__hint mono">Scroll horizontally to see every model →</p>
          </div>
        </div>
      </section>

      {/* ================= SOCIAL PROOF ================= */}
      <section className="section" aria-labelledby="notes-title">
        <div className="container">
          <div className="section-head">
            <div data-reveal>
              <p className="eyebrow">05 — Sample notes</p>
              <h2 className="section-head__title" id="notes-title">
                What listeners said
                <br />
                in testing.
              </h2>
            </div>
            <p className="section-head__note" data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
              Written for this demo, not collected from real customers. No star ratings, no verified
              badges, no invented purchase counts.
            </p>
          </div>

          <div className="quotes">
            {spotlightNotes.slice(0, 3).map((note, index) => (
              <blockquote
                className="quote"
                key={note.author}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${index * 90}ms` }}
              >
                <span className="quote__mark" aria-hidden="true">
                  “
                </span>
                <p className="quote__text serif">{note.quote}</p>
                <footer>
                  <span>{note.author}</span>
                  <span className="mono">{note.context}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="mono quotes__note">
            Sample testimonials — illustrative only, not verified customer reviews.
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="section section--story" aria-labelledby="story-title">
        <div className="container story">
          <figure className="story__visual" data-reveal>
            <Image
              src="/images/story-workshop.jpg"
              alt="Design workshop at night with headphone sketches, aluminium prototypes and calipers"
              width={1400}
              height={933}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <figcaption className="mono">Design review — Copenhagen, 2026</figcaption>
          </figure>

          <div className="story__copy" data-reveal style={{ ["--reveal-delay" as string]: "90ms" }}>
            <p className="eyebrow">06 — Our story</p>
            <h2 id="story-title">
              We build for the
              <br />
              <span className="serif">second hour.</span>
            </h2>
            <p>
              Most headphones are tuned for the first ten minutes: a lift in the low end, a little
              sparkle on top, something that sounds impressive in a shop. We tune for the second
              hour, when the sparkle becomes fatigue and the bass starts to mask the vocal.
            </p>
            <p>
              That decision shapes everything else. Heavier yokes that distribute weight. Pads you
              can replace instead of a headphone you have to replace. A curve that stays honest at
              low volume, where most listening actually happens.
            </p>
            <dl className="story__stats">
              <div>
                <dd>31</dd>
                <dt>parts, 7 serviceable</dt>
              </div>
              <div>
                <dd>2 yrs</dd>
                <dt>warranty, battery included</dt>
              </div>
              <div>
                <dd>0</dd>
                <dt>glued assemblies</dt>
              </div>
            </dl>
            <Link href="/our-story" className="btn btn--ghost">
              Read the full story <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="newsletter-panel" aria-labelledby="news-title">
        <div className="container newsletter-panel__inner">
          <div data-reveal>
            <p className="eyebrow eyebrow--dark">07 — Field notes</p>
            <h2 id="news-title">
              One email a month.
              <br />
              Measurements, not marketing.
            </h2>
            <p className="newsletter-panel__note">
              New measurements, teardown notes and the occasional service guide. No countdown
              timers, no drip campaigns.
            </p>
          </div>
          <div data-reveal style={{ ["--reveal-delay" as string]: "90ms" }}>
            <NewsletterForm variant="panel" />
          </div>
        </div>
      </section>
    </>
  );
}
