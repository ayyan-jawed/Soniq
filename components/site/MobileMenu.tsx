"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { navCollections } from "@/lib/collections";
import { useDialog } from "@/components/ui/useDialog";
import { CloseIcon, SearchIcon, UserIcon, BagIcon, ArrowUpRight } from "@/components/ui/icons";

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
};

export function MobileMenu({ open, onClose, onOpenSearch }: Props) {
  const { count, openCart } = useCart();
  const panelRef = useDialog<HTMLDivElement>({ open, onClose });

  if (!open) return null;

  return (
    <div
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      ref={panelRef}
      tabIndex={-1}
    >
      <div className="mobile-menu__top container">
        <span className="wordmark">
          <span className="wordmark__mark" aria-hidden="true" />
          SONIQ
        </span>
        <button
          type="button"
          className="icon-btn"
          onClick={onClose}
          aria-label="Close menu"
          data-autofocus
        >
          <CloseIcon />
        </button>
      </div>

      <div className="mobile-menu__body container">
        <nav aria-label="Mobile primary">
          <ul className="mobile-menu__links">
            {[
              { href: "/shop", label: "Shop", index: "01" },
              { href: "/technology", label: "Technology", index: "02" },
              { href: "/our-story", label: "Our Story", index: "03" },
              { href: "/contact", label: "Contact", index: "04" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={onClose}>
                  <span className="mono">{item.index}</span>
                  {item.label}
                  <ArrowUpRight />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu__collections">
          <p className="eyebrow">Collections</p>
          <div className="mobile-menu__grid">
            {navCollections.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}`} onClick={onClose}>
                <span className="mobile-menu__thumb">
                  <Image src={c.image} alt="" width={200} height={140} sizes="40vw" />
                </span>
                <span className="mono">{c.shortName}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mobile-menu__foot container">
        <button
          type="button"
          className="mobile-menu__action"
          onClick={() => {
            onClose();
            onOpenSearch();
          }}
        >
          <SearchIcon /> Search
        </button>
        <Link href="/account" className="mobile-menu__action" onClick={onClose}>
          <UserIcon /> Account
        </Link>
        <button
          type="button"
          className="mobile-menu__action"
          onClick={() => {
            onClose();
            openCart();
          }}
        >
          <BagIcon /> Bag
          <span className="mobile-menu__count">{count}</span>
        </button>
      </div>
    </div>
  );
}
