"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice, getProduct } from "@/lib/products";
import { ArrowRight, BagIcon } from "@/components/ui/icons";

const BARS = Array.from({ length: 44 }, (_, i) => {
  const wave = Math.sin(i * 0.55) * 0.5 + Math.sin(i * 0.18 + 1.4) * 0.35;
  return Math.round((18 + Math.abs(wave) * 74) * 10) / 10;
});

export function HomeSpotlight() {
  const product = getProduct("soniq-one")!;
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const color = product.colorways[active];

  return (
    <section className="section spotlight" aria-labelledby="spotlight-title">
      <div className="container spotlight__grid">
        <div className="spotlight__stage" data-reveal>
          <div
            className="spotlight__ambient"
            style={{
              background: `radial-gradient(60% 55% at 50% 55%, ${color.hex}22, transparent 70%)`,
            }}
          />
          <div className="spotlight__frame">
            <Image
              key={color.image}
              src={color.image ?? product.image}
              alt={`${product.name} in ${color.name}`}
              width={1200}
              height={900}
              sizes="(max-width: 900px) 100vw, 52vw"
              className="spotlight__image"
            />
            <div className="spotlight__meta">
              <span className="mono">Fig. 01</span>
              <span className="mono">{color.name}</span>
            </div>
          </div>
          <div className="spotlight__bar" aria-hidden="true">
            {BARS.map((h, i) => (
              <span
                key={i}
                style={{
                  height: `${h}%`,
                  animationDelay: `${(i % 11) * 90}ms`,
                  opacity: Math.round((0.25 + (h / 100) * 0.6) * 1000) / 1000,
                }}
              />
            ))}
          </div>
        </div>

        <div className="spotlight__copy" data-reveal style={{ ["--reveal-delay" as string]: "90ms" }}>
          <p className="eyebrow">Interactive — pick a finish</p>
          <h2 className="spotlight__title" id="spotlight-title">
            SONIQ
            <br />
            ONE<span className="lime">.</span>
          </h2>
          <p className="spotlight__tagline serif">{product.tagline}</p>
          <p className="spotlight__desc">{product.shortDescription}</p>

          <div className="spotlight__price">
            <span>{formatPrice(product.price)}</span>
            {product.compareAt && <s>{formatPrice(product.compareAt)}</s>}
            <span className="spotlight__price-note">Free express shipping over $150</span>
          </div>

          <div className="spotlight__colors">
            <p className="mono spotlight__colors-label">
              Finish — <strong>{color.name}</strong>
            </p>
            <div className="swatches" role="group" aria-label="Choose a finish">
              {product.colorways.map((c, index) => (
                <button
                  key={c.name}
                  type="button"
                  className="swatch"
                  aria-pressed={index === active}
                  aria-label={c.name}
                  title={c.name}
                  onClick={() => setActive(index)}
                >
                  <span className="swatch__inner" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </div>

          <dl className="spotlight__specs">
            {product.highlights.map((h) => (
              <div key={h.label}>
                <dt>{h.label}</dt>
                <dd>{h.value}</dd>
              </div>
            ))}
          </dl>

          <div className="spotlight__actions">
            <Link href={`/product/${product.slug}`} className="btn btn--lime">
              Product details <ArrowRight />
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => add(product.slug, color.name, 1)}
            >
              <BagIcon width={15} height={15} /> Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
