import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCard } from "@/components/product/ProductCard";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowUpRight } from "@/components/ui/icons";
import { formatPrice, getProduct, getRelatedProducts, products } from "@/lib/products";
import "../../pdp.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: `${product.tagline} ${product.shortDescription}`,
    openGraph: {
      title: `${product.name} — ${product.tagline}`,
      description: product.shortDescription,
      images: [{ url: product.image, width: 2304, height: 1728, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 3);

  return (
    <>
      <nav className="container pdp-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href={`/collections/${product.collections[0]}`}>
              {product.categoryLabel}
            </Link>
          </li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="container">
        <ProductDetail product={product} />
      </div>

      <section className="pdp-story" aria-labelledby="engineering-title">
        <div className="container pdp-story__inner">
          <div className="pdp-story__copy">
            <p className="eyebrow">Engineering notes</p>
            <h2 id="engineering-title">
              What you are
              <br />
              actually paying for.
            </h2>
            {product.description.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <Link href="/technology" className="link-arrow">
              Read the engineering approach <ArrowUpRight />
            </Link>
          </div>
          <figure className="pdp-story__figure">
            <Image
              src={product.detailImages[0]}
              alt={`${product.name} ear cup detail`}
              width={1200}
              height={900}
              sizes="(max-width: 900px) 100vw, 45vw"
            />
            <figcaption className="mono">
              {product.name} — ear cup, machined aluminium and memory foam
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="specs-title">
        <div className="container pdp-specs">
          <div>
            <p className="eyebrow">Full specification</p>
            <h2 id="specs-title" className="section-head__title" style={{ marginTop: "1rem" }}>
              {product.name}
            </h2>
            <p className="pdp-specs__price mono">
              {formatPrice(product.price)} · {product.colorways.length}{" "}
              {product.colorways.length === 1 ? "finish" : "finishes"}
            </p>
          </div>
          <div className="pdp-specs__table">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <span>{spec.label}</span>
                <span>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight pdp-faq" aria-labelledby="faq-title">
        <div className="container pdp-faq__inner">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="faq-title" className="section-head__title" style={{ marginTop: "1rem" }}>
              Before you
              <br />
              commit.
            </h2>
            <p className="section-head__note" style={{ marginTop: "1rem" }}>
              Still unsure? The contact form reaches a demo inbox that does not send email — this
              storefront is a concept, not a live shop.
            </p>
          </div>
          <Accordion
            defaultOpen={0}
            items={product.faqs.map((faq) => ({
              title: faq.q,
              content: <p>{faq.a}</p>,
            }))}
          />
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="notes-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">In the field</p>
              <h2 id="notes-title" className="section-head__title">
                Sample notes<span className="lime">.</span>
              </h2>
            </div>
            <p className="section-head__note">
              Written for this demo, not collected from customers. No verified-purchase badges, no
              star averages.
            </p>
          </div>
          <div className="quotes">
            {product.notes.map((note) => (
              <blockquote className="quote" key={note.author}>
                <span className="quote__mark" aria-hidden="true">
                  “
                </span>
                <p className="quote__text serif">{note.quote}</p>
                <footer>
                  <span>{note.author}</span>
                  <span className="mono">{note.context}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section pdp-related" aria-labelledby="related-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Also consider</p>
              <h2 id="related-title" className="section-head__title">
                Next to {product.name}.
              </h2>
            </div>
            <Link href="/shop" className="link-arrow">
              All headphones <ArrowUpRight />
            </Link>
          </div>
          <div className="pdp-related__grid">
            {related.map((item) => (
              <ProductCard
                key={item.slug}
                product={item}
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
