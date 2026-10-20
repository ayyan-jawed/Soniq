import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import "../editorial.css";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Why SONIQ tunes for the second hour: a fictional audio studio's design philosophy, told through its principles, timeline and workshop.",
};

const TIMELINE = [
  {
    year: "2019",
    title: "A room and a problem",
    body: "Two engineers rent a basement in Nørrebro and spend nine months measuring why every headphone they own sounds impressive for ten minutes and tiring by the third track.",
  },
  {
    year: "2021",
    title: "The single yoke",
    body: "The first machined aluminium yoke is cut by hand. It solves the weight distribution problem that the whole family still inherits.",
  },
  {
    year: "2023",
    title: "ONE, first run",
    body: "A run of 300 pairs sells out in eleven days, mostly to people who had read the measurement notes rather than a review.",
  },
  {
    year: "2025",
    title: "The studio split",
    body: "PRO and PRO REFERENCE separate the family into two jobs: one for listening, one for deciding.",
  },
  {
    year: "2026",
    title: "Eight models",
    body: "AIR, FLOW and the limited SIGNAL run complete the range. The tuning philosophy does not change.",
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Tune the second hour",
    body: "A lift in the low end and a little sparkle will win a shop demo. They will also make you take the headphones off after forty minutes. Every curve is judged at low volume, late in a session.",
  },
  {
    n: "02",
    title: "If it cannot be repaired, redesign it",
    body: "Pads, cables and headbands are replaceable without tools. Batteries are service parts. Nothing is glued. The product should outlive the warranty by years, not days.",
  },
  {
    n: "03",
    title: "One material, one job",
    body: "Aluminium carries load, leather distributes clamp, polymer isolates. A decorative seam is a cost with no return. The restraint is the design language.",
  },
  {
    n: "04",
    title: "Publish the compromise",
    body: "Every model has a weakness, and the product page should say what it is. PRO is heavy. AIR LITE cancels less. FLOW is not neutral. A buyer who knows that will keep the product longer.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <header className="story-hero">
        <Image
          src="/images/story-workshop.jpg"
          alt="Design workshop at night with headphone sketches, aluminium prototypes and calipers"
          fill
          priority
          sizes="100vw"
          className="story-hero__image"
        />
        <div className="story-hero__veil" aria-hidden="true" />
        <div className="container story-hero__inner">
          <p className="eyebrow">Our story</p>
          <h1 className="story-hero__title">
            Built for the
            <br />
            second hour<span className="lime">.</span>
          </h1>
          <p className="story-hero__lede">
            A fictional studio with a real opinion: the measure of a headphone is how it feels when
            the novelty has worn off.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container story-manifesto">
          <p className="story-manifesto__lead serif" data-reveal>
            “Most headphones are tuned to be impressive. We tune ours to be <span>inhabitable</span>.”
          </p>
          <div className="story-manifesto__body" data-reveal style={{ ["--reveal-delay" as string]: "90ms" }}>
            <p>
              SONIQ began as a measurement project rather than a brand. Two engineers, one anechoic
              chamber borrowed after hours, a stack of headphones they had each bought and
              returned.
            </p>
            <p>
              The finding was not exotic: almost every pair measured well in the first minute and
              drifted toward fatigue in the second hour. A lifted low end masked the vocal; a
              presence peak made cymbals sharp. The fix was not more technology — it was a
              different target curve and a lighter structure.
            </p>
            <p>
              Everything on this site follows from those two decisions. The catalogue is small
              because each model has a clear job. The specifications are published because a buyer
              deserves the compromise, not just the highlight.
            </p>
            <p className="story-manifesto__note mono">
              SONIQ is a fictional brand created for this demonstration. The timeline, studio and
              people described here are part of the concept, not a real company history.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight story-timeline">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">A short history</p>
              <h2 className="section-head__title">Seven years, eight models.</h2>
            </div>
            <p className="section-head__note">
              Concept timeline. Dates are illustrative and consistent with the product release
              dates in the catalogue.
            </p>
          </div>

          <ol className="timeline">
            {TIMELINE.map((entry, index) => (
              <li key={entry.year} data-reveal style={{ ["--reveal-delay" as string]: `${index * 60}ms` }}>
                <span className="timeline__year">{entry.year}</span>
                <div className="timeline__body">
                  <h3>{entry.title}</h3>
                  <p>{entry.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Principles</p>
              <h2 className="section-head__title">
                Four rules we
                <br />
                do not bend.
              </h2>
            </div>
            <p className="section-head__note">
              These are the constraints every model is designed against. When a feature conflicts
              with one of them, the feature loses.
            </p>
          </div>

          <div className="principles">
            {PRINCIPLES.map((principle, index) => (
              <article
                className="principle"
                key={principle.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
              >
                <span className="mono principle__num">{principle.n}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-band">
        <div className="container story-band__inner">
          <figure className="story-band__figure" data-reveal>
            <Image
              src="/images/detail-headband.jpg"
              alt="Close-up of the SONIQ headband: stitched leather over brushed aluminium with a lime adjustment slider"
              width={1200}
              height={900}
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </figure>
          <div className="story-band__copy" data-reveal style={{ ["--reveal-delay" as string]: "90ms" }}>
            <p className="eyebrow">The workshop</p>
            <h2>
              Prototype in
              <br />
              <span className="serif">aluminium.</span>
            </h2>
            <p>
              Every form starts as a machined block, not a render. It is faster to feel a mistake in
              your hand than to find it on a screen, and a prototype you can wear for an hour will
              tell you more than a week of CAD reviews.
            </p>
            <p>
              The workshop runs on a simple rule: if a part cannot be disassembled, it cannot be
              approved. That rule is why the family shares pads, cables and a service procedure.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container story-cta">
          <div>
            <p className="eyebrow">Continue</p>
            <h2>The catalogue is the argument.</h2>
            <p>Four families, eight models, one tuning target. Judge it by the second hour.</p>
          </div>
          <div className="story-cta__actions">
            <Link href="/shop" className="btn btn--lime">
              Shop headphones <ArrowRight />
            </Link>
            <Link href="/careers" className="btn btn--ghost">
              How we work <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
