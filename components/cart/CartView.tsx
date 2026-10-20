"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-context";
import { QuantityStepper } from "./QuantityStepper";
import { formatPrice, getProduct, SHIPPING_THRESHOLD } from "@/lib/products";
import { ArrowRight, BagIcon, LockIcon, RefreshIcon, ShieldIcon, TruckIcon } from "@/components/ui/icons";

export function CartView() {
  const {
    detailed,
    count,
    subtotal,
    discount,
    shipping,
    total,
    promo,
    promoError,
    hydrated,
    setQty,
    remove,
    applyPromo,
    removePromo,
    freeShippingRemaining,
  } = useCart();
  const [code, setCode] = useState("");

  if (!hydrated) {
    return (
      <div className="container cart-loading">
        <p className="mono">Loading bag…</p>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="container cart-page">
        <div className="empty cart-empty">
          <BagIcon width={26} height={26} style={{ color: "var(--lime)" }} />
          <h2>Your bag is empty.</h2>
          <p>
            Nothing has been added yet. The ONE is the reference point; the PRO is the studio
            answer; the AIR is for the flight.
          </p>
          <div className="cart-empty__actions">
            <Link href="/shop" className="btn btn--lime">
              Shop all headphones <ArrowRight />
            </Link>
            <Link href="/collections/new" className="btn btn--ghost">
              New arrivals
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const suggestions = ["soniq-one-se", "soniq-air-lite"].flatMap((slug) => {
    const product = getProduct(slug);
    if (!product) return [];
    return detailed.some((line) => line.slug === product.slug) ? [] : [product];
  });

  return (
    <div className="container cart-page">
      <div className="cart-page__lines">
        <div className="cart-page__head">
          <p className="mono">
            {count} {count === 1 ? "item" : "items"}
          </p>
          <Link href="/shop" className="link-arrow">
            Continue shopping <ArrowRight />
          </Link>
        </div>

        {detailed.map((line) => (
          <article className="cart-line" key={line.key}>
            <Link href={`/product/${line.product.slug}`} className="cart-line__media">
              <Image src={line.image} alt={line.product.name} width={280} height={210} sizes="140px" />
            </Link>
            <div className="cart-line__body">
              <div className="cart-line__top">
                <div>
                  <h2 className="cart-line__name">
                    <Link href={`/product/${line.product.slug}`}>{line.product.name}</Link>
                  </h2>
                  <p className="mono cart-line__meta">
                    {line.color} · {line.product.categoryLabel}
                  </p>
                  <p className="cart-line__tag">{line.product.tagline}</p>
                </div>
                <p className="cart-line__price">{formatPrice(line.lineTotal)}</p>
              </div>
              <div className="cart-line__bottom">
                <QuantityStepper
                  value={line.qty}
                  onChange={(next) => setQty(line.key, next)}
                  label={`${line.product.name} in ${line.color}`}
                />
                <div className="cart-line__unit mono">{formatPrice(line.unitPrice)} each</div>
                <button type="button" className="remove-btn" onClick={() => remove(line.key)}>
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}

        <div className="cart-page__notes">
          <div>
            <TruckIcon /> <span>Free express shipping over ${SHIPPING_THRESHOLD}</span>
          </div>
          <div>
            <RefreshIcon /> <span>30-day returns</span>
          </div>
          <div>
            <ShieldIcon /> <span>2-year warranty</span>
          </div>
        </div>
      </div>

      <aside className="summary" aria-label="Order summary">
        <h2 className="summary__title">Summary</h2>

        <div className="summary__ship">
          <div className="ship-progress__track">
            <div
              className="ship-progress__bar"
              style={{ width: `${Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)}%` }}
            />
          </div>
          <p className="mono">
            {freeShippingRemaining > 0
              ? `${formatPrice(freeShippingRemaining)} from free shipping`
              : "Free express shipping unlocked"}
          </p>
        </div>

        <div className="totals summary__totals">
          <div className="totals__row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="totals__row summary__discount">
              <span>Discount ({promo})</span>
              <span>−{formatPrice(discount)}</span>
            </div>
          )}
          <div className="totals__row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          <div className="totals__row totals__row--grand">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <p className="summary__tax mono">Taxes calculated at checkout — demo only.</p>
        </div>

        <div className="summary__promo">
          {promo ? (
            <div className="summary__promo-applied">
              <span className="mono">Code {promo} applied</span>
              <button type="button" className="remove-btn" onClick={removePromo}>
                Remove
              </button>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (applyPromo(code)) setCode("");
              }}
            >
              <label htmlFor="promo" className="mono summary__promo-label">
                Promo code
              </label>
              <div className="summary__promo-row">
                <input
                  id="promo"
                  className="input"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="LISTEN10"
                  aria-invalid={Boolean(promoError)}
                  aria-describedby={promoError ? "promo-error" : undefined}
                />
                <button type="submit" className="btn btn--ghost btn--sm">
                  Apply
                </button>
              </div>
              <p className="field__error" id="promo-error" role="alert">
                {promoError ?? ""}
              </p>
            </form>
          )}
        </div>

        <Link href="/checkout" className="btn btn--lime btn--block summary__checkout">
          <LockIcon width={15} height={15} /> Checkout
        </Link>
        <p className="form-note summary__note">
          Demo storefront. No payment is collected and no order is created — checkout states this
          again before you submit.
        </p>
      </aside>

      {suggestions.length > 0 && (
        <section className="cart-suggestions">
          <p className="eyebrow">Pairs well with</p>
          <div className="cart-suggestions__grid">
            {suggestions.map((product) => (
              <Link key={product.slug} href={`/product/${product.slug}`} className="cart-suggestion">
                <Image src={product.image} alt={product.name} width={280} height={210} sizes="120px" />
                <span>
                  <strong>{product.name}</strong>
                  <span className="mono">{product.tagline}</span>
                </span>
                <span className="mono">{formatPrice(product.price)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
