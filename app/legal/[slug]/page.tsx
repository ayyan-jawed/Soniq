import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLegalPage, legalPages } from "@/lib/content";
import { PageHero } from "@/components/site/PageHero";
import "../../pages.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return { title: "Legal" };
  return { title: page.title, description: page.intro };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  const other = legalPages.find((item) => item.slug !== slug);

  return (
    <>
      <PageHero kicker={page.kicker} title={page.title} lede={page.intro} />

      <div className="container doc doc--narrow">
        <aside className="doc__aside">
          <p className="mono doc__aside-title">Legal</p>
          <nav aria-label="Legal pages">
            {legalPages.map((item) => (
              <Link
                key={item.slug}
                href={`/legal/${item.slug}`}
                aria-current={item.slug === slug ? "page" : undefined}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <p className="mono doc__updated">Last updated {page.updated}</p>
        </aside>

        <article className="doc__body">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body?.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p className="doc__updated">Last updated {page.updated}</p>

          {other && (
            <div className="doc__next">
              <p className="mono">Read next</p>
              <Link href={`/legal/${other.slug}`} className="link-arrow">
                {other.title}
              </Link>
            </div>
          )}
        </article>
      </div>
    </>
  );
}
