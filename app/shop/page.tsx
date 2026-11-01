import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products, formatPrice, SHIPPING_THRESHOLD } from "@/lib/products";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { ArrowRight } from "@/components/ui/icons";
import "../shop.css";

export const metadata: Metadata = {
  title: "Shop all headphones",
  description:
    "Eight over-ear models: SONIQ ONE, ONE SE, PRO, PRO REFERENCE, AIR, AIR LITE, FLOW and FLOW SIGNAL. Filter by collection, price and features.",
};

export default function ShopPage() {
  const cheapest = Math.min(...products.map((p) => p.price));
  const dearest = Math.max(...products.map((p) => p.price));

  return (
    <>
      <header className="shop-hero">
        <div className="container shop-hero__grid">
          <div className="shop-hero__copy">
            <p className="eyebrow">Catalogue — 2026</p>
            <h1 className="shop-hero__title">
              All headphones<span className="lime">.</span>
            </h1>
            <p className="shop-hero__lede">
              Eight models across four collections. Every pair keeps a wired input, replaceable
              pads and a two-year warranty. Filter by how you actually listen.
            </p>
            <dl className="shop-hero__meta">
              <div>
                <dt>Models</dt>
                <dd>8</dd>
              </div>
              <div>
                <dt>From</dt>
                <dd>{formatPrice(cheapest)}</dd>
              </div>
              <div>
                <dt>To</dt>
                <dd>{formatPrice(dearest)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>Free over ${SHIPPING_THRESHOLD}</dd>
              </div>
            </dl>
          </div>

          <figure className="shop-hero__visual">
            <Image
              src="/images/p-one-lime.jpg"
              alt="SONIQ ONE over-ear headphones in Signal Lime, studio lit"
              width={1600}
              height={1200}
              priority
              sizes="(max-width: 900px) 100vw, 38vw"
            />
            <figcaption>
              <span className="mono">SONIQ ONE — Signal Lime</span>
              <span className="mono">Fig. 01</span>
            </figcaption>
          </figure>
        </div>
      </header>

      <div className="container">
        <ShopCatalog products={products} />
      </div>

      <section className="shop-help">
        <div className="container shop-help__inner">
          <div>
            <p className="eyebrow">Can&apos;t decide?</p>
            <h2>The catalogue is small on purpose.</h2>
            <p>
              Four families, each with a clear job. If you want the reference point, start with ONE.
              If you mix, start with PRO. If you fly, start with AIR.
            </p>
          </div>
          <div className="shop-help__links">
            <Link href="/technology" className="btn btn--ghost">
              How the tuning works <ArrowRight />
            </Link>
            <Link href="/contact" className="link-arrow">
              Ask a human
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
