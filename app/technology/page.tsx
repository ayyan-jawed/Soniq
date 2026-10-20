import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import "../editorial.css";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "How SONIQ tunes a headphone: beryllium-coated drivers, adaptive cancellation that samples the room 48,000 times a second, and head-tracked spatial audio.",
};

const SYSTEMS = [
  {
    n: "01",
    title: "The chamber",
    body: "Every model starts as a sealed volume with a single machined yoke. We prototype in aluminium, measure the resonance, then remove material until the chamber stops arguing with the driver. Nothing is added to fix a problem — material is taken away.",
    spec: "31 parts · 7 serviceable",
  },
  {
    n: "02",
    title: "The driver",
    body: "Beryllium-coated diaphragms are stiff and light, which keeps transients quick without the metallic edge of a pure metal dome. Each pair is measured across the vocal band and matched within 0.4 dB before it is assembled.",
    spec: "40–45 mm · 4 Hz – 48 kHz",
  },
  {
    n: "03",
    title: "The correction",
    body: "Six microphones sample the environment 48,000 times a second. Instead of switching between fixed profiles, the correction follows the room continuously — the cabin drone, the carriage rattle and the open-plan hum are different curves.",
    spec: "−42 dB · 8 microphones",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        kicker="Technology"
        title={
          <>
            The measured
            <br />
            approach<span className="lime">.</span>
          </>
        }
        lede="No proprietary acronyms, no invented certifications. Three systems, described the way they were designed — with the numbers attached."
        meta={[
          { label: "Tuning", value: "Anechoic + panel" },
          { label: "Matching", value: "±0.4 dB" },
          { label: "Warranty", value: "2 years" },
          { label: "Repairable", value: "7 parts" },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="tech-intro">
            <div data-reveal>
              <p className="eyebrow">A signal path, not a feature list</p>
              <h2 className="section-head__title" style={{ marginTop: "1rem" }}>
                Everything is a
                <br />
                trade-off.
              </h2>
            </div>
            <div data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
              <p className="tech-intro__lede">
                A headphone is a set of compromises arranged in a particular order. More clamp means
                a better seal and a worse second hour. A flatter curve means translation and less
                excitement. We choose the compromise, then write it down.
              </p>
              <p className="tech-intro__note mono">
                Demo content — SONIQ is fictional. Figures are internally consistent across the
                catalogue but not third-party certified.
              </p>
            </div>
          </div>

          <div className="tech-systems">
            <figure className="tech-systems__visual" data-reveal>
              <Image
                src="/images/lab-exploded.jpg"
                alt="Exploded headphone parts arranged on a dark workbench"
                width={1200}
                height={900}
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <figcaption className="mono">Fig. 01 — teardown, 31 parts</figcaption>
            </figure>
            <div className="tech-systems__list">
              {SYSTEMS.map((system, index) => (
                <article
                  className="tech-system"
                  key={system.n}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
                >
                  <span className="mono tech-system__num">{system.n}</span>
                  <div>
                    <h3>{system.title}</h3>
                    <p>{system.body}</p>
                    <p className="mono tech-system__spec">{system.spec}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section tech-deep">
        <div className="container">
          <div className="tech-deep__row">
            <figure className="tech-deep__figure" data-reveal>
              <Image
                src="/images/detail-cup.jpg"
                alt="Macro detail of a SONIQ ear cup: machined aluminium, leather pad and a lime anodised ring"
                width={1200}
                height={900}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <figcaption className="mono">Ear cup — 6° bevelled edge, 1.2 mm wall</figcaption>
            </figure>
            <div className="tech-deep__copy" data-reveal style={{ ["--reveal-delay" as string]: "90ms" }}>
              <p className="eyebrow">Materials</p>
              <h2>
                Metal where it
                <br />
                <span className="serif">carries load.</span>
              </h2>
              <p>
                The yoke is a single piece of 6061 aluminium, machined rather than cast, because a
                cast part needs a thicker wall to reach the same stiffness. Thicker walls mean more
                weight above the ear, which is exactly where weight is least welcome.
              </p>
              <p>
                The headband is stitched leather over a spring steel strip. It looks like a
                decorative choice and is not: leather conforms over a week of use and holds the
                clamp force more evenly than a moulded polymer band.
              </p>
            </div>
          </div>

          <div className="tech-deep__row tech-deep__row--reverse">
            <figure className="tech-deep__figure" data-reveal>
              <Image
                src="/images/life-commute.jpg"
                alt="Listener on a night platform, wearing noise cancelling headphones"
                width={1600}
                height={900}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <figcaption className="mono">Field measurement — platform, 84 dB ambient</figcaption>
            </figure>
            <div className="tech-deep__copy" data-reveal style={{ ["--reveal-delay" as string]: "90ms" }}>
              <p className="eyebrow">Cancellation</p>
              <h2>
                Quiet that keeps
                <br />
                <span className="serif">the useful noise.</span>
              </h2>
              <p>
                Total silence is disorienting, and on a platform it is unsafe. Our cancelling is
                deliberately shaped: low-frequency rumble is removed almost entirely, speech and
                announcements are attenuated but kept intelligible.
              </p>
              <p>
                Transparency mode is a real microphone path, not a volume trick. It runs at 2.4 ms
                latency, which is fast enough that your own voice does not sound tunnelled.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Measured, not claimed</p>
              <h2 className="section-head__title">
                What the numbers
                <br />
                actually mean.
              </h2>
            </div>
            <p className="section-head__note">
              Every figure quoted on a product page is reproduced below with its measurement
              condition. Figures are demo data.
            </p>
          </div>

          <div className="tech-table">
            {[
              { label: "Battery", value: "42 h", note: "ANC on, 60% volume, AAC" },
              { label: "Cancelling", value: "−42 dB", note: "100–1,000 Hz average, 8-mic hybrid" },
              { label: "Latency", value: "4 ms", note: "Wired, analogue input" },
              { label: "Weight", value: "268 g", note: "Headphones only, no case" },
              { label: "Frequency response", value: "5 Hz – 40 kHz", note: "−3 dB limits, IEC coupler" },
              { label: "Driver matching", value: "±0.4 dB", note: "200 Hz – 4 kHz, per pair" },
            ].map((row) => (
              <div key={row.label}>
                <span className="mono">{row.label}</span>
                <strong>{row.value}</strong>
                <span className="tech-table__note">{row.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container tech-faq">
          <div>
            <p className="eyebrow">Engineering questions</p>
            <h2 className="section-head__title" style={{ marginTop: "1rem" }}>
              The honest
              <br />
              answers.
            </h2>
          </div>
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
      </section>

      <section className="section section--tight">
        <div className="container tech-cta">
          <div>
            <p className="eyebrow">Hear it</p>
            <h2>Specifications are a map, not the territory.</h2>
            <p>
              The only test that matters is the second hour. Every model shares the same return
              window for that reason.
            </p>
          </div>
          <div className="tech-cta__actions">
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
