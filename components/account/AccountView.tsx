"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProduct } from "@/lib/products";
import { ArrowRight, CheckIcon, LockIcon, UserIcon } from "@/components/ui/icons";

const SESSION_KEY = "soniq.demo.session";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Tab = "overview" | "orders" | "saved" | "addresses";

const SAVED = ["soniq-pro", "soniq-air-lite"].flatMap((slug) => {
  const product = getProduct(slug);
  return product ? [product] : [];
});

export function AccountView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [session, setSession] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(SESSION_KEY);
      if (stored) setSession(stored);
    } catch {
      /* ignore */
    }
  }, []);

  function signIn(event: React.FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
    if (password.trim().length < 6) next.password = "Use at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSession(email.trim());
    try {
      window.sessionStorage.setItem(SESSION_KEY, email.trim());
    } catch {
      /* ignore */
    }
  }

  function signOut() {
    setSession(null);
    setPassword("");
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }

  if (!session) {
    return (
      <div className="container account">
        <div className="account__intro">
          <p className="eyebrow">Account</p>
          <h2>There is no account system here.</h2>
          <p>
            SONIQ is a concept storefront, so this page demonstrates the interface without
            pretending to authenticate anyone. Any valid-looking email and a six-character password
            opens the demo view below.
          </p>
          <ul className="account__facts">
            <li>
              <CheckIcon width={14} height={14} /> No password is stored or transmitted
            </li>
            <li>
              <CheckIcon width={14} height={14} /> No account is created
            </li>
            <li>
              <CheckIcon width={14} height={14} /> The demo session clears when the tab closes
            </li>
          </ul>
        </div>

        <form className="account__form" onSubmit={signIn} noValidate>
          <div className="account__form-head">
            <UserIcon width={16} height={16} />
            <span className="mono">Demo sign-in</span>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="account-email">
              Email
            </label>
            <input
              id="account-email"
              className="input"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email) setErrors((current) => ({ ...current, email: "" }));
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "account-email-error" : undefined}
              placeholder="you@domain.com"
            />
            <p className="field__error" id="account-email-error" role="alert">
              {errors.email}
            </p>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="account-password">
              Password
            </label>
            <input
              id="account-password"
              className="input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (errors.password) setErrors((current) => ({ ...current, password: "" }));
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "account-password-error" : undefined}
              placeholder="At least 6 characters"
            />
            <p className="field__error" id="account-password-error" role="alert">
              {errors.password}
            </p>
          </div>

          <button type="submit" className="btn btn--lime btn--block">
            <LockIcon width={15} height={15} /> Open demo account
          </button>
          <p className="form-note">
            Nothing is sent anywhere. No credentials are validated against a server because there
            is no server.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="container account account--signed">
      <div className="account__banner">
        <span className="mono">Demo session</span>
        <p>
          Signed in locally as <strong>{session}</strong>. This is not an authenticated account and
          no data is stored on a server.
        </p>
        <button type="button" className="btn btn--ghost btn--sm" onClick={signOut}>
          Sign out
        </button>
      </div>

      <div className="account__layout">
        <nav className="account__tabs" aria-label="Account sections">
          {(
            [
              ["overview", "Overview"],
              ["orders", "Orders"],
              ["saved", "Saved"],
              ["addresses", "Addresses"],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-current={tab === id}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="account__panel">
          {tab === "overview" && (
            <>
              <h2 className="account__title">Good to see you.</h2>
              <p className="account__lede">
                This panel shows what an account area would contain. Because the store has no
                backend, orders, addresses and saved items are sample content.
              </p>
              <dl className="account__meta">
                <div>
                  <dt>Email</dt>
                  <dd>{session}</dd>
                </div>
                <div>
                  <dt>Member since</dt>
                  <dd>Not applicable — demo</dd>
                </div>
                <div>
                  <dt>Orders</dt>
                  <dd>0</dd>
                </div>
                <div>
                  <dt>Saved items</dt>
                  <dd>{SAVED.length} (sample)</dd>
                </div>
              </dl>
              <div className="account__links">
                <Link href="/shop" className="btn btn--ghost btn--sm">
                  Shop the catalogue <ArrowRight />
                </Link>
                <Link href="/contact" className="link-arrow">
                  Contact support
                </Link>
              </div>
            </>
          )}

          {tab === "orders" && (
            <>
              <h2 className="account__title">No orders.</h2>
              <p className="account__lede">
                Checkout is a demonstration and never creates an order, so this list is
                intentionally empty. A real store would show dispatch status, tracking and returns
                here.
              </p>
              <div className="empty account__empty">
                <p className="mono">Order history</p>
                <p>Nothing to show. Complete the checkout demo to see its confirmation screen.</p>
                <Link href="/checkout" className="btn btn--ghost btn--sm">
                  Try the checkout demo
                </Link>
              </div>
            </>
          )}

          {tab === "saved" && (
            <>
              <h2 className="account__title">Saved for later.</h2>
              <p className="account__lede">
                Sample saved items — they are not persisted to an account, because there is no
                account.
              </p>
              <div className="account__saved">
                {SAVED.map((product) => (
                  <Link key={product.slug} href={`/product/${product.slug}`} className="account-saved">
                    <Image src={product.image} alt={product.name} width={240} height={180} sizes="100px" />
                    <span>
                      <strong>{product.name}</strong>
                      <span className="mono">{product.tagline}</span>
                    </span>
                    <span className="mono">{formatPrice(product.price)}</span>
                  </Link>
                ))}
              </div>
            </>
          )}

          {tab === "addresses" && (
            <>
              <h2 className="account__title">No saved addresses.</h2>
              <p className="account__lede">
                Addresses in the checkout demo are validated in the browser and then discarded. In a
                production store this is where they would be stored, encrypted, with a deletion
                control.
              </p>
              <Link href="/checkout" className="btn btn--ghost btn--sm">
                Open checkout demo
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
