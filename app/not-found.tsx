import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container notfound__inner">
        <p className="eyebrow">Error 404</p>
        <p className="notfound__code" aria-hidden="true">
          404
        </p>
        <h1>
          Off
          <br />
          frequency<span className="lime">.</span>
        </h1>
        <p className="notfound__lede">
          This page does not exist — or it did and has been retired. Nothing is broken; the route
          simply is not part of the catalogue.
        </p>
        <div className="notfound__actions">
          <Link href="/shop" className="btn btn--lime">
            Shop headphones <ArrowRight />
          </Link>
          <Link href="/" className="btn btn--ghost">
            Back to home
          </Link>
        </div>
        <div className="notfound__links">
          <Link href="/technology">Technology</Link>
          <Link href="/our-story">Our story</Link>
          <Link href="/support/faqs">FAQs</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </section>
  );
}
