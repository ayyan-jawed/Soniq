import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SearchForm } from "@/components/shop/SearchForm";
import { collections } from "@/lib/collections";
import { PageHero } from "@/components/site/PageHero";
import "./search.css";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Search",
  description: "Search the SONIQ catalogue by model, finish or use case.",
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const needle = query.toLowerCase();

  const results = query
    ? products.filter((product) =>
        [
          product.name,
          product.tagline,
          product.shortDescription,
          product.categoryLabel,
          product.bestFor,
          ...product.colorways.map((c) => c.name),
          ...product.features,
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
    : [];

  return (
    <>
      <PageHero
        kicker="Search"
        title={
          <>
            Find your
            <br />
            frequency<span className="lime">.</span>
          </>
        }
        lede="Search by model name, finish or the way you listen. Eight products, so exact matches appear fast."
      >
        <div className="search-page__wrap">
          <SearchForm initialQuery={query} />
          <div className="search-page__suggestions">
            <span className="mono">Try</span>
            {["ONE", "Studio", "Travel", "Signal Lime", "Noise cancelling"].map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="chip"
                prefetch={false}
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="section section--tight">
        <div className="container">
          {query ? (
            <>
              <div className="search-page__meta">
                <p className="mono" aria-live="polite">
                  {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
                </p>
                <Link href="/shop" className="link-arrow">
                  Browse everything instead
                </Link>
              </div>

              {results.length > 0 ? (
                <div className="search-grid">
                  {results.map((product) => (
                    <ProductCard
                      key={product.slug}
                      product={product}
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    />
                  ))}
                </div>
              ) : (
                <div className="empty">
                  <p className="mono">0 results</p>
                  <h3>No product matches “{query}”.</h3>
                  <p>
                    The catalogue is deliberately small. Try a model name such as ONE or PRO, a
                    finish such as Signal Lime, or a use case such as travel.
                  </p>
                  <div className="search-page__empty-actions">
                    <Link href="/shop" className="btn btn--lime">
                      Shop all headphones
                    </Link>
                    <Link href="/contact" className="btn btn--ghost">
                      Ask support
                    </Link>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="search-shelves">
              <div>
                <p className="eyebrow">Start here</p>
                <h2 className="section-head__title" style={{ marginTop: "0.9rem" }}>
                  Four collections,
                  <br />
                  four ways to listen.
                </h2>
              </div>
              <div className="search-shelves__list">
                {collections.map((collection) => (
                  <Link key={collection.slug} href={`/collections/${collection.slug}`}>
                    <span className="mono">{collection.kicker}</span>
                    <span>{collection.name}</span>
                    <span className="search-shelves__tag">{collection.tagline}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
