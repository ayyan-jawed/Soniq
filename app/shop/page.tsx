import type { Metadata } from "next";
import Link from "next/link";
import { products, formatPrice, SHIPPING_THRESHOLD } from "@/lib/products";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { PageHero } from "@/components/site/PageHero";
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
      <PageHero
        kicker="Catalogue — 2026"
        title={
          <>
            All headphones<span className="lime">.</span>
          </>
        }
        lede="Eight models across four collections. Every pair keeps a wired input, replaceable pads and a two-year warranty. Filter by how you actually listen."
        meta={[
          { label: "Models", value: "8" },
          { label: "From", value: formatPrice(cheapest) },
          { label: "To", value: formatPrice(dearest) },
          { label: "Shipping", value: `Free over $${SHIPPING_THRESHOLD}` },
        ]}
      />

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
