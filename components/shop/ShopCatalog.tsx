"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { useDialog } from "@/components/ui/useDialog";
import { CloseIcon, SlidersIcon } from "@/components/ui/icons";
import {
  CATEGORY_LABELS,
  FEATURE_LABELS,
  type Category,
  type FeatureKey,
  type Product,
} from "@/lib/products";

type PriceBand = "all" | "under-250" | "250-350" | "350-450" | "over-450";

const PRICE_BANDS: { id: PriceBand; label: string; test: (p: number) => boolean }[] = [
  { id: "all", label: "All prices", test: () => true },
  { id: "under-250", label: "Under $250", test: (p) => p < 250 },
  { id: "250-350", label: "$250 – $350", test: (p) => p >= 250 && p <= 350 },
  { id: "350-450", label: "$350 – $450", test: (p) => p > 350 && p <= 450 },
  { id: "over-450", label: "$450 and above", test: (p) => p > 450 },
];

const CATEGORIES: Category[] = ["wireless", "studio", "travel", "lifestyle"];
const FEATURES: FeatureKey[] = ["anc", "spatial", "hires", "multipoint", "foldable", "wired", "lowlatency", "eq"];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
];

export function ShopCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [features, setFeatures] = useState<FeatureKey[]>([]);
  const [price, setPrice] = useState<PriceBand>("all");
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(6);
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useDialog<HTMLDivElement>({ open: mobileOpen, onClose: () => setMobileOpen(false) });

  const toggle = <T,>(value: T, list: T[], set: (next: T[]) => void) => {
    set(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
    setVisible(6);
  };

  const filtered = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.id === price)!;
    const q = query.trim().toLowerCase();

    const result = products.filter((product) => {
      if (q && !`${product.name} ${product.tagline} ${product.bestFor}`.toLowerCase().includes(q)) {
        return false;
      }
      if (categories.length && !categories.includes(product.category)) return false;
      if (features.length && !features.every((f) => product.features.includes(f))) return false;
      if (!band.test(product.price)) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        return result.sort((a, b) => a.price - b.price);
      case "price-desc":
        return result.sort((a, b) => b.price - a.price);
      case "newest":
        return result.sort((a, b) => (a.releasedAt < b.releasedAt ? 1 : -1));
      default:
        return result;
    }
  }, [products, query, categories, features, price, sort]);

  const activeCount =
    categories.length + features.length + (price !== "all" ? 1 : 0) + (query.trim() ? 1 : 0);

  function clearAll() {
    setQuery("");
    setCategories([]);
    setFeatures([]);
    setPrice("all");
    setVisible(6);
  }

  const filterBody = (
    <>
      <div className="filter-group">
        <p className="filter-group__title">Search</p>
        <label className="sr-only" htmlFor="catalog-search">
          Search products by name
        </label>
        <input
          id="catalog-search"
          className="input"
          type="search"
          placeholder="Search by name…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisible(6);
          }}
        />
      </div>

      <fieldset className="filter-group">
        <legend className="filter-group__title">Collection</legend>
        <div className="filter-list">
          {CATEGORIES.map((category) => (
            <label className="filter-check" key={category}>
              <input
                type="checkbox"
                checked={categories.includes(category)}
                onChange={() => toggle(category, categories, setCategories)}
              />
              <span>{CATEGORY_LABELS[category]}</span>
              <span className="filter-check__count">
                {products.filter((p) => p.category === category).length}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend className="filter-group__title">Price</legend>
        <div className="filter-list">
          {PRICE_BANDS.map((band) => (
            <label className="filter-check" key={band.id}>
              <input
                type="radio"
                name="price-band"
                checked={price === band.id}
                onChange={() => {
                  setPrice(band.id);
                  setVisible(6);
                }}
              />
              <span>{band.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend className="filter-group__title">Features</legend>
        <div className="filter-chips">
          {FEATURES.map((feature) => (
            <button
              key={feature}
              type="button"
              className="chip"
              aria-pressed={features.includes(feature)}
              onClick={() => toggle(feature, features, setFeatures)}
            >
              {FEATURE_LABELS[feature]}
            </button>
          ))}
        </div>
      </fieldset>

      <button type="button" className="filter-clear" onClick={clearAll} disabled={activeCount === 0}>
        Clear all filters
      </button>
    </>
  );

  return (
    <div className="catalog">
      <aside className="catalog__aside" aria-label="Product filters">
        <div className="catalog__aside-head">
          <p className="mono">Filters</p>
          {activeCount > 0 && <span className="filter-badge">{activeCount}</span>}
        </div>
        {filterBody}
      </aside>

      <div className="catalog__main">
        <div className="catalog__bar">
          <div className="catalog__bar-left">
            <button
              type="button"
              className="btn btn--ghost btn--sm catalog__filter-toggle"
              onClick={() => setMobileOpen(true)}
            >
              <SlidersIcon width={14} height={14} /> Filters
              {activeCount > 0 && <span className="filter-badge">{activeCount}</span>}
            </button>
            <p className="mono catalog__count" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
              {activeCount > 0 && " · filtered"}
            </p>
          </div>

          <div className="catalog__sort">
            <label htmlFor="sort" className="mono">
              Sort
            </label>
            <select
              id="sort"
              className="select select--bare"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              {SORTS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeCount > 0 && (
          <div className="active-filters">
            {query.trim() && (
              <button type="button" className="active-filter" onClick={() => setQuery("")}>
                “{query.trim()}” <CloseIcon width={10} height={10} />
              </button>
            )}
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className="active-filter"
                onClick={() => toggle(c, categories, setCategories)}
              >
                {CATEGORY_LABELS[c]} <CloseIcon width={10} height={10} />
              </button>
            ))}
            {features.map((f) => (
              <button
                key={f}
                type="button"
                className="active-filter"
                onClick={() => toggle(f, features, setFeatures)}
              >
                {FEATURE_LABELS[f]} <CloseIcon width={10} height={10} />
              </button>
            ))}
            {price !== "all" && (
              <button type="button" className="active-filter" onClick={() => setPrice("all")}>
                {PRICE_BANDS.find((b) => b.id === price)?.label} <CloseIcon width={10} height={10} />
              </button>
            )}
            <button type="button" className="filter-clear filter-clear--inline" onClick={clearAll}>
              Clear all
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="empty">
            <p className="mono">No matches</p>
            <h3>Nothing fits those filters.</h3>
            <p>
              Try removing a feature or widening the price range. The catalogue only has eight
              models, so narrow combinations run out quickly.
            </p>
            <button type="button" className="btn btn--lime" onClick={clearAll}>
              Reset all filters
            </button>
          </div>
        ) : (
          <>
            <div className="catalog__grid">
              {filtered.slice(0, visible).map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  priority={index < 2}
                />
              ))}
            </div>

            <div className="catalog__more">
              <p className="mono">
                Showing {Math.min(visible, filtered.length)} of {filtered.length}
              </p>
              {visible < filtered.length && (
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => setVisible((v) => v + 6)}
                >
                  Load more
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {mobileOpen && (
        <>
          <div className="drawer-scrim" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div
            className="filter-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            ref={panelRef}
            tabIndex={-1}
          >
            <div className="filter-sheet__head">
              <p className="mono">Filters {activeCount > 0 ? `(${activeCount})` : ""}</p>
              <button
                type="button"
                className="drawer__close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close filters"
                data-autofocus
              >
                <CloseIcon />
              </button>
            </div>
            <div className="filter-sheet__body">{filterBody}</div>
            <div className="filter-sheet__foot">
              <button type="button" className="btn btn--ghost" onClick={clearAll}>
                Clear
              </button>
              <button type="button" className="btn btn--lime" onClick={() => setMobileOpen(false)}>
                Show {filtered.length} products
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
