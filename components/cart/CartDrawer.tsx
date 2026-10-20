"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-context";
import { QuantityStepper } from "./QuantityStepper";
import { useDialog } from "@/components/ui/useDialog";
import { CloseIcon, TruckIcon } from "@/components/ui/icons";
import { formatPrice, SHIPPING_THRESHOLD } from "@/lib/products";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    detailed,
    count,
    subtotal,
    shipping,
    total,
    setQty,
    remove,
    freeShippingRemaining,
  } = useCart();

  const panelRef = useDialog<HTMLDivElement>({ open: isOpen, onClose: closeCart });

  if (!isOpen) return null;

  const progress = Math.min(100, Math.round((subtotal / SHIPPING_THRESHOLD) * 100));

  return (
    <>
      <div className="drawer-scrim" onClick={closeCart} aria-hidden="true" />
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="drawer__head">
          <p className="drawer__title">
            Your bag <span className="drawer__count">({count})</span>
          </p>
          <button type="button" className="drawer__close" onClick={closeCart} aria-label="Close bag">
            <CloseIcon />
          </button>
        </div>

        <div className="drawer__body">
          {detailed.length === 0 ? (
            <div className="drawer__empty">
              <h3>Nothing in the bag yet.</h3>
              <p style={{ fontSize: "0.88rem", maxWidth: "28ch" }}>
                Four models, two finishes each. Start with the ONE if you want the reference point.
              </p>
              <Link href="/shop" className="btn btn--lime" onClick={closeCart} data-autofocus>
                Shop headphones
              </Link>
            </div>
          ) : (
            <>
              <div className="ship-progress">
                <p className="ship-progress__label">
                  <span>
                    {freeShippingRemaining > 0
                      ? `${formatPrice(freeShippingRemaining)} from free express shipping`
                      : "Free express shipping unlocked"}
                  </span>
                  <span>{progress}%</span>
                </p>
                <div className="ship-progress__track">
                  <div className="ship-progress__bar" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {detailed.map((line) => (
                <div className="line-item" key={line.key}>
                  <Link
                    href={`/product/${line.product.slug}`}
                    className="line-item__media"
                    onClick={closeCart}
                    aria-label={line.product.name}
                  >
                    <Image
                      src={line.image}
                      alt=""
                      width={160}
                      height={160}
                      sizes="72px"
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </Link>
                  <div>
                    <div className="line-item__top">
                      <div>
                        <Link
                          href={`/product/${line.product.slug}`}
                          className="line-item__name"
                          onClick={closeCart}
                        >
                          {line.product.name}
                        </Link>
                        <p className="line-item__variant">{line.color}</p>
                      </div>
                      <p className="line-item__price">{formatPrice(line.lineTotal)}</p>
                    </div>
                    <div className="line-item__bottom">
                      <QuantityStepper
                        value={line.qty}
                        onChange={(next) => setQty(line.key, next)}
                        label={`${line.product.name} in ${line.color}`}
                        compact
                      />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => remove(line.key)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {detailed.length > 0 && (
          <div className="drawer__foot">
            <div className="totals">
              <div className="totals__row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="totals__row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="totals__row totals__row--grand">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="btn btn--lime btn--block"
              style={{ marginTop: "1rem" }}
              onClick={closeCart}
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              className="btn btn--ghost btn--block"
              style={{ marginTop: "0.5rem" }}
              onClick={closeCart}
            >
              View bag
            </Link>
            <p className="form-note" style={{ marginTop: "0.9rem", display: "flex", gap: "0.5rem" }}>
              <TruckIcon width={14} height={14} aria-hidden="true" />
              Demo store — checkout is a simulation. No payment is taken, no order is placed.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
