import type { Metadata } from "next";
import Link from "next/link";
import { generalFaqs, supportPages } from "@/lib/content";
import { PageHero } from "@/components/site/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight } from "@/components/ui/icons";
import "../../pages.css";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Honest answers about the SONIQ concept storefront: what is real, what is simulated, and what the specifications mean.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        kicker="Support"
        title={
          <>
            Frequently asked
            <br />
            questions<span className="lime">.</span>
          </>
        }
        lede="Most of these are about the demo itself, because that is the part that needs explaining. The product questions are answered the same way they are on the product pages."
      />

      <div className="container doc">
        <aside className="doc__aside">
          <p className="mono doc__aside-title">Support</p>
          <nav aria-label="Support pages">
            {supportPages.map((item) => (
              <Link key={item.slug} href={`/support/${item.slug}`}>
                {item.title}
              </Link>
            ))}
            <Link href="/support/faqs" aria-current="page">
              FAQs
            </Link>
            <Link href="/contact">Contact us</Link>
          </nav>
        </aside>

        <article className="doc__body">
          <Accordion
            defaultOpen={0}
            items={generalFaqs.map((faq) => ({
              title: faq.q,
              content: <p>{faq.a}</p>,
            }))}
          />

          <div className="doc__next">
            <p className="mono">Still stuck</p>
            <div>
              <Link href="/contact" className="link-arrow">
                Contact support <ArrowRight />
              </Link>
              <Link href="/support/product-support" className="link-arrow">
                Product support <ArrowRight />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
