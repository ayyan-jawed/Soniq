import type { Metadata } from "next";
import Link from "next/link";
import { careers } from "@/lib/content";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight } from "@/components/ui/icons";
import "../pages.css";
import "../editorial.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "How the SONIQ studio works, and the roles it would open first. Sample listings for a concept brand.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        kicker="Careers — sample listings"
        title={
          <>
            Build the
            <br />
            second hour<span className="lime">.</span>
          </>
        }
        lede={careers.intro}
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-head__title">Four working principles.</h2>
            </div>
            <p className="section-head__note">
              Not perks. These are the constraints that decide what gets built and what gets cut.
            </p>
          </div>

          <div className="principles">
            {careers.values.map((value, index) => (
              <article className="principle" key={value.title}>
                <span className="mono principle__num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight careers-roles">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Open roles — none live</p>
              <h2 className="section-head__title">Who we would hire first.</h2>
            </div>
            <p className="section-head__note">
              These are sample listings for a fictional studio. There is no application process and
              no role to apply for.
            </p>
          </div>

          <div className="roles">
            {careers.roles.map((role) => (
              <article className="role" key={role.title}>
                <div>
                  <h3>{role.title}</h3>
                  <p className="mono role__meta">
                    {role.location} · {role.type}
                  </p>
                  <p className="role__body">{role.body}</p>
                </div>
                <span className="badge badge--outline role__badge">Sample role</span>
              </article>
            ))}
          </div>

          <div className="careers-note">
            <p>
              There is no application form here on purpose. A fictional studio collecting real CVs
              would be the least honest thing on this site.
            </p>
            <Link href="/contact" className="link-arrow">
              Ask a question instead <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
