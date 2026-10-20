import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { NewsletterForm } from "./NewsletterForm";
import { SocialLinks } from "./SocialLinks";
import { BackToTop } from "./BackToTop";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "Wireless Headphones", href: "/collections/wireless" },
      { label: "Studio Collection", href: "/collections/studio" },
      { label: "Travel Collection", href: "/collections/travel" },
      { label: "New Arrivals", href: "/collections/new" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Returns", href: "/support/shipping-returns" },
      { label: "Warranty", href: "/support/warranty" },
      { label: "FAQs", href: "/support/faqs" },
      { label: "Product Support", href: "/support/product-support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Technology", href: "/technology" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Wordmark />
            <p className="footer__statement">
              Audio equipment for people who listen closely. Designed in Copenhagen, tuned in an
              anechoic room, built to be repaired rather than replaced.
            </p>
            <SocialLinks />
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="footer__col-title">{column.title}</p>
              <div className="footer__links">
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div className="footer__newsletter">
          <div>
            <p className="eyebrow">Field notes</p>
            <p className="footer__newsletter-title">
              Get the field notes — one email a month, no marketing.
            </p>
          </div>
          <NewsletterForm variant="footer" />
        </div>

        <div className="footer__bottom">
          <span>
            © {year} SONIQ Audio — fictional brand, concept storefront
          </span>
          <div className="footer__legal">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/support/shipping-returns">Shipping</Link>
            <BackToTop />
          </div>
        </div>
        <p className="footer__disclaimer">
          Demo environment: no payment is processed, no order is placed, and no customer data is
          transmitted. Product imagery is generated for this concept.
        </p>
      </div>
    </footer>
  );
}
