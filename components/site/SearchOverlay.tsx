"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products, formatPrice } from "@/lib/products";
import { useDialog } from "@/components/ui/useDialog";
import { SearchIcon } from "@/components/ui/icons";

type Props = {
  open: boolean;
  onClose: () => void;
};

const SUGGESTIONS = ["Studio", "Travel", "Signal Lime", "Noise cancelling"];

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const panelRef = useDialog<HTMLDivElement>({ open, onClose });
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      const t = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) =>
        [p.name, p.tagline, p.categoryLabel, p.family, p.bestFor, ...p.colorways.map((c) => c.name)]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 5);
  }, [query]);

  if (!open) return null;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const q = query.trim();
    onClose();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search SONIQ"
      ref={panelRef}
      tabIndex={-1}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="search-panel">
        <form className="search-panel__form" onSubmit={submit} role="search">
          <SearchIcon />
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            ref={inputRef}
            id="site-search"
            className="search-panel__input"
            type="search"
            placeholder="Search headphones, collections, finishes…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            data-autofocus
          />
          <button type="button" className="search-panel__esc" onClick={onClose} aria-label="Close search">
            ESC
          </button>
        </form>

        <div className="search-panel__body">
          {query.trim() === "" ? (
            <>
              <p className="search-panel__label">Try</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", padding: "0 0.25rem" }}>
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" className="chip" onClick={() => setQuery(s)}>
                    {s}
                  </button>
                ))}
              </div>
              <p className="search-panel__label" style={{ marginTop: "1.5rem" }}>
                Recently released
              </p>
              {products
                .slice()
                .sort((a, b) => (a.releasedAt < b.releasedAt ? 1 : -1))
                .slice(0, 3)
                .map((p) => (
                  <Link key={p.slug} href={`/product/${p.slug}`} className="search-result" onClick={onClose}>
                    <span className="search-result__thumb">
                      <Image src={p.image} alt="" width={80} height={80} sizes="56px" />
                    </span>
                    <span>
                      <span className="search-result__name">{p.name}</span>
                      <span className="search-result__sub">{p.categoryLabel}</span>
                    </span>
                    <span className="search-result__price">{formatPrice(p.price)}</span>
                  </Link>
                ))}
            </>
          ) : results.length > 0 ? (
            <>
              <p className="search-panel__label">
                {results.length} {results.length === 1 ? "product" : "products"}
              </p>
              {results.map((p) => (
                <Link key={p.slug} href={`/product/${p.slug}`} className="search-result" onClick={onClose}>
                  <span className="search-result__thumb">
                    <Image src={p.image} alt="" width={80} height={80} sizes="56px" />
                  </span>
                  <span>
                    <span className="search-result__name">{p.name}</span>
                    <span className="search-result__sub">{p.categoryLabel}</span>
                  </span>
                  <span className="search-result__price">{formatPrice(p.price)}</span>
                </Link>
              ))}
            </>
          ) : (
            <div className="search-empty">
              <p style={{ color: "var(--ink)" }}>No products match “{query.trim()}”.</p>
              <p style={{ marginTop: "0.5rem", fontSize: "0.82rem" }}>
                Try “ONE”, “studio”, “travel” or “lime”.
              </p>
              <Link
                href="/shop"
                className="link-arrow"
                onClick={onClose}
                style={{ marginTop: "1.25rem" }}
              >
                Browse all headphones
              </Link>
            </div>
          )}
        </div>

        <div className="search-panel__footer">
          <span>Press enter for all results</span>
          <span>8 products · demo catalogue</span>
        </div>
      </div>
    </div>
  );
}
