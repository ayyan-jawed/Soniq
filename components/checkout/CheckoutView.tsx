"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice, SHIPPING_THRESHOLD } from "@/lib/products";
import { CheckIcon, LockIcon, TruckIcon } from "@/components/ui/icons";

type Errors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Denmark",
  "Germany",
  "France",
  "Netherlands",
  "Canada",
  "Australia",
  "Japan",
];

export function CheckoutView() {
  const { detailed, subtotal, discount, total, promo, hydrated, clear } = useCart();
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postal: "",
    country: "United States",
    delivery: "standard",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [stage, setStage] = useState<"form" | "done">("form");
  const [order, setOrder] = useState<{
    id: string;
    total: number;
    items: { name: string; color: string; qty: number; price: number; image: string }[];
  } | null>(null);

  const shipping = values.delivery === "express" ? 19 : subtotal - discount >= SHIPPING_THRESHOLD ? 0 : 9;
  const grand = Math.max(0, subtotal - discount) + shipping;

  const snapshot = useMemo(
    () =>
      detailed.map((line) => ({
        name: line.product.name,
        color: line.color,
        qty: line.qty,
        price: line.lineTotal,
        image: line.image,
      })),
    [detailed],
  );

  function update(field: string, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  }

  function validate() {
    const next: Errors = {};
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (!values.firstName.trim()) next.firstName = "First name is required.";
    if (!values.lastName.trim()) next.lastName = "Last name is required.";
    if (!values.address.trim()) next.address = "Street address is required.";
    if (!values.city.trim()) next.city = "City is required.";
    if (!/^[A-Za-z0-9 -]{3,10}$/.test(values.postal.trim()))
      next.postal = "Enter a valid postal code (3–10 characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setOrder({
      id: `SONIQ-DEMO-${Math.floor(100000 + Math.random() * 899999)}`,
      total: grand,
      items: snapshot,
    });
    setStage("done");
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!hydrated) {
    return (
      <div className="container cart-loading">
        <p className="mono">Loading checkout…</p>
      </div>
    );
  }

  if (stage === "done" && order) {
    return (
      <div className="container checkout-done">
        <div className="checkout-done__panel">
          <span className="checkout-done__icon">
            <CheckIcon width={22} height={22} />
          </span>
          <p className="mono">Demo order simulated</p>
          <h2>No order was placed.</h2>
          <p className="checkout-done__lede">
            The form worked, the validation passed, and the flow ended here on purpose. This
            storefront has no payment processor, no inventory and no carrier integration — so
            nothing was charged, reserved or shipped.
          </p>

          <dl className="checkout-done__meta">
            <div>
              <dt>Reference</dt>
              <dd>{order.id}</dd>
            </div>
            <div>
              <dt>Items</dt>
              <dd>{order.items.reduce((sum, item) => sum + item.qty, 0)}</dd>
            </div>
            <div>
              <dt>Simulated total</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{values.email}</dd>
            </div>
          </dl>

          <div className="checkout-done__items">
            {order.items.map((item) => (
              <div key={`${item.name}-${item.color}`}>
                <Image src={item.image} alt="" width={120} height={90} sizes="80px" />
                <span>
                  <strong>{item.name}</strong>
                  <span className="mono">
                    {item.color} · ×{item.qty}
                  </span>
                </span>
                <span className="mono">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>

          <div className="checkout-done__actions">
            <Link href="/shop" className="btn btn--lime">
              Back to the catalogue
            </Link>
            <Link href="/support/shipping-returns" className="btn btn--ghost">
              Read the shipping policy
            </Link>
          </div>
          <p className="form-note">
            No email confirmation was sent. No payment details were ever requested or stored.
          </p>
        </div>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="container cart-page">
        <div className="empty cart-empty">
          <h2>There is nothing to check out.</h2>
          <p>Add a pair to the bag first. The checkout demo only runs with items in it.</p>
          <Link href="/shop" className="btn btn--lime">
            Shop all headphones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout">
      <div className="checkout__main">
        <div className="checkout__demo">
          <LockIcon width={16} height={16} />
          <p>
            <strong>Demo checkout.</strong> No payment is collected, no card details are requested
            and no order is created. Submitting this form only validates it.
          </p>
        </div>

        <form onSubmit={submit} noValidate>
          <fieldset className="form-section">
            <legend>
              <span className="mono">01</span> Contact
            </legend>
            <div className="form-grid">
              <div className="field form-grid__full">
                <label className="field__label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  className="input"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : "email-hint"}
                />
                <p className="field__error" id="email-error" role="alert">
                  {errors.email}
                </p>
                <p className="field__hint" id="email-hint">
                  Used only to demonstrate the form. Nothing is sent.
                </p>
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>
              <span className="mono">02</span> Shipping address
            </legend>
            <div className="form-grid">
              <div className="field">
                <label className="field__label" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  className="input"
                  autoComplete="given-name"
                  value={values.firstName}
                  onChange={(event) => update("firstName", event.target.value)}
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                />
                <p className="field__error" id="firstName-error" role="alert">
                  {errors.firstName}
                </p>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  className="input"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={(event) => update("lastName", event.target.value)}
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                />
                <p className="field__error" id="lastName-error" role="alert">
                  {errors.lastName}
                </p>
              </div>
              <div className="field form-grid__full">
                <label className="field__label" htmlFor="address">
                  Street address
                </label>
                <input
                  id="address"
                  className="input"
                  autoComplete="address-line1"
                  value={values.address}
                  onChange={(event) => update("address", event.target.value)}
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={errors.address ? "address-error" : undefined}
                />
                <p className="field__error" id="address-error" role="alert">
                  {errors.address}
                </p>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="apartment">
                  Apartment <span>optional</span>
                </label>
                <input
                  id="apartment"
                  className="input"
                  autoComplete="address-line2"
                  value={values.apartment}
                  onChange={(event) => update("apartment", event.target.value)}
                />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  className="input"
                  autoComplete="address-level2"
                  value={values.city}
                  onChange={(event) => update("city", event.target.value)}
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? "city-error" : undefined}
                />
                <p className="field__error" id="city-error" role="alert">
                  {errors.city}
                </p>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="postal">
                  Postal code
                </label>
                <input
                  id="postal"
                  className="input"
                  autoComplete="postal-code"
                  value={values.postal}
                  onChange={(event) => update("postal", event.target.value)}
                  aria-invalid={Boolean(errors.postal)}
                  aria-describedby={errors.postal ? "postal-error" : undefined}
                />
                <p className="field__error" id="postal-error" role="alert">
                  {errors.postal}
                </p>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="country">
                  Country
                </label>
                <select
                  id="country"
                  className="select"
                  autoComplete="country-name"
                  value={values.country}
                  onChange={(event) => update("country", event.target.value)}
                >
                  {COUNTRIES.map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>
              <span className="mono">03</span> Delivery
            </legend>
            <div className="delivery-options">
              {[
                {
                  id: "standard",
                  label: "Standard",
                  detail: "3–5 working days",
                  price: subtotal >= SHIPPING_THRESHOLD ? "Free" : "$9",
                },
                { id: "express", label: "Express", detail: "1–2 working days", price: "$19" },
              ].map((option) => (
                <label
                  key={option.id}
                  className="delivery-option"
                  data-active={values.delivery === option.id}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={option.id}
                    checked={values.delivery === option.id}
                    onChange={() => update("delivery", option.id)}
                  />
                  <span className="delivery-option__label">{option.label}</span>
                  <span className="delivery-option__detail">{option.detail}</span>
                  <span className="delivery-option__price">{option.price}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>
              <span className="mono">04</span> Payment
            </legend>
            <div className="payment-demo">
              <LockIcon width={18} height={18} />
              <div>
                <p>
                  <strong>Payment is not enabled in this demo.</strong>
                </p>
                <p>
                  No card fields are shown because no processor is configured. In a production store
                  this step would redirect to a PCI-compliant provider; here it is intentionally
                  absent rather than simulated.
                </p>
              </div>
            </div>
          </fieldset>

          <div className="checkout__submit">
            <button type="submit" className="btn btn--lime btn--block">
              Place demo order — {formatPrice(grand)}
            </button>
            <p className="form-note">
              By submitting you are testing a form, not buying a product. No payment is taken.
            </p>
          </div>
        </form>
      </div>

      <aside className="summary checkout__summary" aria-label="Order summary">
        <h2 className="summary__title">Order summary</h2>
        <div className="checkout__items">
          {detailed.map((line) => (
            <div key={line.key} className="checkout__item">
              <span className="checkout__item-media">
                <Image src={line.image} alt="" width={120} height={90} sizes="60px" />
                <span className="checkout__item-qty">{line.qty}</span>
              </span>
              <span className="checkout__item-body">
                <strong>{line.product.name}</strong>
                <span className="mono">{line.color}</span>
              </span>
              <span className="mono">{formatPrice(line.lineTotal)}</span>
            </div>
          ))}
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
            <span>Delivery</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          <div className="totals__row totals__row--grand">
            <span>Total</span>
            <span>{formatPrice(grand)}</span>
          </div>
        </div>

        <p className="summary__note mono">
          <TruckIcon width={13} height={13} /> Demo order — nothing ships.
        </p>
      </aside>
    </div>
  );
}
