import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { formatPrice, getProduct, products } from "@/lib/products";
import "./technology.css";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "How SONIQ tunes a headphone: a machined acoustic chamber, beryllium-coated drivers measured in matched pairs, adaptive cancellation and a layout built around the second hour.",
};

const HERO_META = [
  { label: "Tuning", value: "Anechoic + panel" },
  { label: "Matching", value: "±0.4 dB" },
  { label: "Warranty", value: "Two years" },
  { label: "Repairable", value: "7 parts" },
];

const CONTENTS = [
  { href: "#driver", index: "01", label: "Driver" },
  { href: "#cancelling", index: "02", label: "Cancelling" },
  { href: "#materials", index: "03", label: "Materials" },
  { href: "#power", index: "04", label: "Power" },
  { href: "#measurements", index: "05", label: "Measurements" },
];

const DRIVER_SPECS = [
  { label: "Driver", value: "40 / 45 mm beryllium-coated" },
  { label: "Response", value: "5 Hz – 40 kHz" },
  { label: "Pair matching", value: "±0.4 dB, vocal band" },
  { label: "Serviceable", value: "7 of 31 parts" },
];

const QUIET_METRICS = [
  { value: "−42 dB", label: "Cancelling", note: "100–1,000 Hz average" },
  { value: "8", label: "Microphones", note: "6 cancelling, 2 voice" },
  { value: "48,000", label: "Room reads", note: "Per second, adaptive" },
];

const MATERIAL_FACTS = [
  { label: "Yoke", value: "6061 aluminium, machined" },
  { label: "Headband", value: "Leather over spring steel" },
  { label: "Pads", value: "Memory foam, replaceable" },
  { label: "Weight", value: "268 g" },
];

const CONNECTIVITY = [
  { label: "Wireless", value: "Bluetooth 5.4" },
  { label: "Multipoint", value: "Two devices, simultaneous" },
  { label: "Codecs", value: "SBC · AAC · LDAC · LC3" },
  { label: "Wired", value: "USB-C audio · 3.5 mm analogue" },
  { label: "Playback", value: "42 h ANC on · 60 h off" },
  { label: "Charging", value: "USB-C — 10 minutes, 6 hours" },
  { label: "Microphones", value: "8 — 6 ANC, 2 beamforming" },
  { label: "Spatial", value: "Head-tracked, switchable" },
];

const FIGURES = [
  { value: "42 h", label: "Playback", note: "ONE, cancelling on, 60% volume" },
  { value: "−42 dB", label: "Cancelling", note: "ONE, 100–1,000 Hz average" },
  { value: "40 / 45", label: "Driver, mm", note: "Beryllium-coated, ONE / PRO" },
  { value: "268 g", label: "Weight", note: "ONE, headphones only" },
  { value: "8", label: "Microphones", note: "6 for cancelling, 2 for voice" },
  { value: "±0.4 dB", label: "Pair matching", note: "PRO REFERENCE, vocal band" },
];

export default function TechnologyPage() {
  const one = getProduct("soniq-one") ?? products[0];

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <header className="tech-hero">
        <div className="container tech-hero__grid">
          <div className="tech-hero__copy">
            <p className="eyebrow">Technology</p>
            <h1 className="tech-hero__title">
              The measured
              <br />
              <span className="serif">approach.</span>
            </h1>
            <p className="tech-hero__lede">
              No proprietary acronyms, no invented certifications. Four systems, described the way
              they were designed — with the numbers attached.
            </p>
            <div className="tech-hero__actions">
              <Link href="#driver" className="btn btn--lime">
                Start with the driver <ArrowRight />
              </Link>
              <Link href="#measurements" className="link-arrow">
                Every measurement <ArrowUpRight />
              </Link>
            </div>
          </div>

          <figure className="tech-hero__figure">
            <div className="tech-frame tech-frame--4x3">
              <Image
                src="/images/detail-cup.jpg"
                alt="Macro detail of a SONIQ ear cup: machined aluminium, leather pad and a lime anodised ring"
                width={1400}
                height={1050}
                priority
                sizes="(max-width: 1080px) 92vw, 31rem"
              />
            </div>
            <figcaption className="tech-caption">
              <span>Ear cup — 1.2 mm machined wall</span>
              <span>Fig. 01</span>
            </figcaption>
          </figure>
        </div>

        <div className="container">
          <dl className="tech-hero__meta">
            {HERO_META.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* --------------------------------------------------------- contents */}
      <nav className="tech-index" aria-label="Technology contents">
        <div className="container tech-index__inner">
          <span className="tech-index__label">Contents</span>
          {CONTENTS.map((item) => (
            <a key={item.href} href={item.href}>
              <b>{item.index}</b>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* -------------------------------------------------------- statement */}
      <section className="tech-statement" aria-labelledby="tech-philosophy">
        <div className="container tech-statement__grid">
          <p className="eyebrow tech-statement__eyebrow">A signal path, not a feature list</p>
          <p className="tech-statement__quote" id="tech-philosophy">
            A headphone is a set of <em>compromises</em> arranged in a particular order.
          </p>
          <div className="tech-statement__foot">
            <p>
              More clamp means a better seal and a worse second hour. A flatter curve means
              translation and less excitement. We choose the compromise, then write it down.
            </p>
            <p className="tech-note">
              Demo content — SONIQ is fictional. Figures are internally consistent across the
              catalogue but not third-party certified.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- driver */}
      <section className="tech-section" id="driver" aria-labelledby="tech-driver-title">
        <div className="container">
          <div className="tech-head">
            <p className="eyebrow">01 — Driver &amp; chamber</p>
            <h2 id="tech-driver-title">
              A diaphragm is only as good as the air behind it.
            </h2>
            <p className="tech-head__note">
              The chamber is machined first and measured second. That order is the whole method.
            </p>
          </div>

          <div className="tech-split tech-split--5-7">
            <div className="tech-copy">
              <p>
                Every model starts as a sealed volume with a single machined yoke. We prototype in
                aluminium, measure the resonance, then remove material until the chamber stops
                arguing with the driver. Nothing is added to fix a problem — material is taken away.
              </p>
              <p>
                Beryllium-coated diaphragms are stiff and light, which keeps transients quick without
                the metallic edge of a pure metal dome. ONE carries a 40 mm driver, PRO a 45 mm. The
                larger chamber is only worth its weight in a headphone that does not have to travel.
              </p>
            </div>

            <figure className="tech-figure">
              <div className="tech-frame tech-frame--3x2">
                <Image
                  src="/images/lab-exploded.jpg"
                  alt="Exploded view of a SONIQ headphone: driver housings, ear pads, mesh grilles and circuit board laid out on a workbench"
                  width={1600}
                  height={1200}
                  sizes="(max-width: 1080px) 92vw, 44rem"
                />
              </div>
              <figcaption className="tech-caption">
                <span>Teardown — 31 parts, 7 serviceable</span>
                <span>Fig. 02</span>
              </figcaption>
            </figure>
          </div>

          <dl className="tech-specstrip">
            {DRIVER_SPECS.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------- cancelling */}
      <section className="tech-section tech-quiet" id="cancelling" aria-labelledby="tech-quiet-title">
        <div className="container">
          <div className="tech-head">
            <p className="eyebrow">02 — Cancelling</p>
            <h2 id="tech-quiet-title">Quiet that keeps the useful noise.</h2>
            <p className="tech-head__note">
              Total silence is disorienting, and on a platform it is unsafe. So the cancelling is
              shaped, not absolute.
            </p>
          </div>

          <div className="tech-split tech-split--5-6">
            <figure className="tech-figure">
              <div className="tech-frame tech-frame--4x5">
                <Image
                  src="/images/life-commute.jpg"
                  alt="Listener on a night station platform wearing noise cancelling SONIQ headphones"
                  width={1600}
                  height={2000}
                  sizes="(max-width: 1080px) 80vw, 26rem"
                />
              </div>
              <figcaption className="tech-caption">
                <span>Line 4, northbound — 06:42</span>
                <span>Fig. 03</span>
              </figcaption>
            </figure>

            <div className="tech-copy">
              <p>
                Low-frequency rumble is removed almost entirely; speech and announcements are
                attenuated but kept intelligible. A microphone array reads the room 48,000 times a
                second, so the correction follows the environment instead of switching between fixed
                profiles.
              </p>
              <p>
                Transparency is a real microphone path, not a volume trick — fast enough that your own
                voice does not sound tunnelled. Both modes are switchable from the left cup without
                taking the headphones off.
              </p>

              <dl className="tech-metrics">
                {QUIET_METRICS.map((metric) => (
                  <div key={metric.label}>
                    <dd className="tech-metrics__value">{metric.value}</dd>
                    <dt className="tech-metrics__label">{metric.label}</dt>
                    <p className="tech-metrics__note">{metric.note}</p>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- materials */}
      <section className="tech-section" id="materials" aria-labelledby="tech-materials-title">
        <div className="container">
          <div className="tech-head">
            <p className="eyebrow">03 — Materials &amp; comfort</p>
            <h2 id="tech-materials-title">Metal where it carries load. Foam where it touches you.</h2>
            <p className="tech-head__note">
              268 grams, and most of it sits where you are not looking.
            </p>
          </div>

          <div className="tech-split tech-split--7-5">
            <figure className="tech-figure">
              <div className="tech-frame tech-frame--3x2">
                <Image
                  src="/images/detail-headband.jpg"
                  alt="Macro detail of the SONIQ headband: stitched leather wrapping a spring steel strip with a lime accent"
                  width={1400}
                  height={1050}
                  sizes="(max-width: 1080px) 92vw, 45rem"
                />
              </div>
              <figcaption className="tech-caption">
                <span>Headband — leather over spring steel</span>
                <span>Fig. 04</span>
              </figcaption>
            </figure>

            <div className="tech-copy">
              <h3>Machined, not cast</h3>
              <p>
                The yoke is a single piece of 6061 aluminium, machined rather than cast, because a
                cast part needs a thicker wall to reach the same stiffness. Thicker walls mean more
                weight above the ear, which is exactly where weight is least welcome.
              </p>
              <p>
                The headband is stitched leather over a spring steel strip. It looks like a decorative
                choice and is not: leather conforms over a week of use and holds clamp force more
                evenly than a moulded polymer band.
              </p>
            </div>
          </div>

          <div className="tech-split tech-split--5-5 tech-split--spaced">
            <div className="tech-copy">
              <h3>The second hour is the test.</h3>
              <p>
                Clamp force is easy to get wrong in the direction of security. Ours is set by the
                headband, not the pads, so the weight sits across the crown instead of pressing at the
                temples — the difference you notice at 90 minutes, not at 9.
              </p>
              <p>
                Pads are memory foam under vegan leather, replaceable without tools and sold as a
                service part. They stay cool through a working day, which is a materials decision, not
                a claim about your ears.
              </p>

              <dl className="tech-facts">
                {MATERIAL_FACTS.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <figure className="tech-figure tech-figure--offset">
              <div className="tech-frame tech-frame--4x3">
                <Image
                  src="/images/p-one-lime.jpg"
                  alt="SONIQ ONE over-ear headphones in Signal Lime, full product view"
                  width={1600}
                  height={1200}
                  sizes="(max-width: 1080px) 80vw, 28rem"
                />
              </div>
              <figcaption className="tech-caption">
                <span>ONE — Signal Lime, 268 g</span>
                <span>Fig. 05</span>
              </figcaption>
            </figure>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------ power */}
      <section className="tech-section tech-power" id="power" aria-labelledby="tech-power-title">
        <div className="container">
          <div className="tech-head">
            <p className="eyebrow">04 — Connectivity &amp; power</p>
            <h2 id="tech-power-title">Wireless when it helps. Wired when it matters.</h2>
            <p className="tech-head__note">
              Two devices at once, four codecs, and a cable that works with the headphones switched
              off.
            </p>
          </div>

          <div className="tech-power__grid">
            <div className="tech-copy tech-power__copy">
              <p className="tech-power__lead">
                A flat battery should end the commute, not the session. The analogue input is passive,
                so the headphones work with no power at all; USB-C audio runs from the same port that
                charges them.
              </p>
              <p>
                Multipoint is simultaneous, not a switch: a call on your phone interrupts playback on
                the laptop and hands it back when the call ends. Ten minutes on USB-C returns six
                hours of playback with cancelling on.
              </p>
              <p className="tech-power__note">
                Spatial audio is a real head-tracked render, switchable per source. It is not applied
                automatically to everything you play.
              </p>
            </div>

            <dl className="tech-table">
              {CONNECTIVITY.map((row) => (
                <div className="tech-table__row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- measurements */}
      <section className="tech-section tech-data" id="measurements" aria-labelledby="tech-data-title">
        <div className="container">
          <div className="tech-head">
            <p className="eyebrow">05 — Measured, not claimed</p>
            <h2 id="tech-data-title">What the numbers actually mean.</h2>
            <p className="tech-head__note">
              Every figure quoted on a product page appears here with its measurement condition.
              Figures are demo data, not third-party results.
            </p>
          </div>

          <dl className="tech-stats">
            {FIGURES.map((figure) => (
              <div className="tech-stat" key={figure.label}>
                <dt className="tech-stat__label">{figure.label}</dt>
                <dd className="tech-stat__value">{figure.value}</dd>
                <dd className="tech-stat__note">{figure.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------ faq */}
      <section className="tech-section tech-faq" id="questions" aria-labelledby="tech-faq-title">
        <div className="container tech-faq__grid">
          <div className="tech-faq__intro">
            <p className="eyebrow">Engineering questions</p>
            <h2 id="tech-faq-title">The honest answers.</h2>
            <p className="tech-faq__note">
              Four questions we get on the bench, answered the way we would answer them in person.
            </p>

            <Accordion
              defaultOpen={0}
              items={[
                {
                  title: "Does a 45 mm driver automatically sound better than a 40 mm?",
                  content: (
                    <p>
                      No. A larger diaphragm moves more air and can reach lower, but it also needs a
                      larger chamber and more control. PRO uses 45 mm because a studio headphone can
                      afford the weight. ONE uses 40 mm because it cannot.
                    </p>
                  ),
                },
                {
                  title: "Why is the curve not perfectly flat?",
                  content: (
                    <p>
                      A truly flat curve measured at the eardrum is exhausting over a full day — the
                      ear gains energy in the upper mids. Every model carries a small, deliberate
                      contour. PRO REFERENCE comes closest to flat because it is a working tool.
                    </p>
                  ),
                },
                {
                  title: "Is spatial audio real or a plugin?",
                  content: (
                    <p>
                      It is a real head-tracked render: a gyroscope and accelerometer feed a filter
                      that keeps a virtual stage fixed in space. It is not applied to every source
                      automatically, and it can be switched off.
                    </p>
                  ),
                },
                {
                  title: "Can the battery be replaced?",
                  content: (
                    <p>
                      Yes, on every model, as a service part. On PRO REFERENCE it is user-replaceable
                      with the two tools in the box. This is why the warranty covers capacity below
                      80% for two years.
                    </p>
                  ),
                },
              ]}
            />
          </div>

          <aside className="tech-buy" aria-label="Shop SONIQ ONE">
            <div className="tech-buy__media">
              <Image
                src="/images/p-one.jpg"
                alt="SONIQ ONE over-ear headphones in obsidian"
                width={1600}
                height={1200}
                sizes="(max-width: 1080px) 80vw, 20rem"
              />
            </div>
            <div className="tech-buy__meta">
              <span className="tech-buy__name">{one.name}</span>
              <span className="tech-buy__price">{formatPrice(one.price)}</span>
            </div>
            <p className="tech-buy__line">
              The reference model: 40 mm beryllium-coated driver, adaptive cancelling, 42 hours.
            </p>
            <div className="tech-buy__actions">
              <Link href={`/product/${one.slug}`} className="btn btn--lime btn--sm">
                View the ONE <ArrowRight />
              </Link>
              <Link href="/shop" className="btn btn--ghost btn--sm">
                All headphones <ArrowUpRight />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------------------------------------------------------- closing */}
      <section className="tech-close" aria-labelledby="tech-close-title">
        <div className="container tech-close__inner">
          <div>
            <p className="eyebrow">Hear it</p>
            <h2 id="tech-close-title">
              Specifications are a map, <span className="serif">not the territory.</span>
            </h2>
            <p>
              The only test that matters is the second hour. Every model shares the same return window
              for that reason.
            </p>
          </div>
          <div className="tech-close__actions">
            <Link href="/shop" className="btn btn--lime">
              Shop headphones <ArrowRight />
            </Link>
            <Link href="/our-story" className="btn btn--ghost">
              Our story <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
