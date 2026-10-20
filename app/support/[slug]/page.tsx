import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupportPage, supportPages } from "@/lib/content";
import { PageHero } from "@/components/site/PageHero";
import { ArrowRight } from "@/components/ui/icons";
import "../../pages.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return supportPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSupportPage(slug);
  if (!page) return { title: "Support" };
  return { title: page.title, description: page.intro };
}

export default async function SupportPage({ params }: Props) {
  const { slug } = await params;
  const page = getSupportPage(slug);
  if (!page) notFound();

  const others = supportPages.filter((p) => p.slug !== slug);

  return (
    <>
      <PageHero
        kicker={page.kicker}
        title={
          <>
            {page.title}
            <span className="lime">.</span>
          </>
        }
        lede={page.intro}
      />

      <div className="container doc">
        <aside className="doc__aside">
          <p className="mono doc__aside-title">Support</p>
          <nav aria-label="Support pages">
            {supportPages.map((item) => (
              <Link
                key={item.slug}
                href={`/support/${item.slug}`}
                aria-current={item.slug === slug ? "page" : undefined}
              >
                {item.title}
              </Link>
            ))}
            <Link href="/support/faqs" aria-current="page">
              FAQs
            </Link>
            <Link href="/contact">Contact us</Link>
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

          <div className="doc__note">
            <p className="mono">Demonstration notice</p>
            <p>
              This policy describes a fictional store. No order is processed, no parcel ships and no
              warranty is offered in reality. The wording exists to show how the information would be
              structured.
            </p>
          </div>

          <div className="doc__next">
            <p className="mono">Also in support</p>
            <div>
              {others.map((item) => (
                <Link key={item.slug} href={`/support/${item.slug}`} className="link-arrow">
                  {item.title} <ArrowRight />
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
