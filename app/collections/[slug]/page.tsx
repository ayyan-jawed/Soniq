import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections, getCollection, getCollectionProducts } from "@/lib/collections";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import "../collections.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection not found" };
  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      title: `${collection.name} — SONIQ`,
      description: collection.description,
      images: [{ url: collection.image, width: 1600, height: 900, alt: collection.imageAlt }],
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = getCollectionProducts(slug);
  const others = collections.filter((c) => c.slug !== slug);

  return (
    <>
      <header className="collection-hero">
        <Image
          src={collection.image}
          alt={collection.imageAlt}
          fill
          priority
          sizes="100vw"
          className="collection-hero__image"
        />
        <div className="collection-hero__veil" aria-hidden="true" />
        <div className="container collection-hero__inner">
          <p className="eyebrow">{collection.kicker}</p>
          <h1 className="collection-hero__title">{collection.name}</h1>
          <p className="collection-hero__tagline serif">{collection.tagline}</p>
          <p className="collection-hero__desc">{collection.description}</p>
          <p className="mono collection-hero__count">
            {String(items.length).padStart(2, "0")}{" "}
            {items.length === 1 ? "model" : "models"} in this collection
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {items.length > 0 ? (
            <div className="collection-grid">
              {items.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  showTagline
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>Nothing in this collection yet.</h3>
              <p>The demonstration catalogue has not been extended here.</p>
              <Link href="/shop" className="btn btn--lime">
                Shop all headphones
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section section--tight collection-next">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Keep looking</p>
              <h2 className="section-head__title">Other collections.</h2>
            </div>
            <Link href="/shop" className="link-arrow">
              All headphones <ArrowRight />
            </Link>
          </div>
          <div className="collection-next__grid">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/collections/${other.slug}`}
                className="collection-next__card"
              >
                <span className="collection-next__thumb">
                  <Image src={other.image} alt="" width={600} height={360} sizes="30vw" />
                </span>
                <span className="collection-next__label">
                  <span>{other.name}</span>
                  <ArrowUpRight width={12} height={12} />
                </span>
                <span className="collection-next__tag mono">{other.tagline}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
