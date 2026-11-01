"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";
import { useCart } from "@/components/cart/cart-context";
import { navCollections } from "@/lib/collections";
import { AnnouncementBar } from "./AnnouncementBar";
import { SearchOverlay } from "./SearchOverlay";
import { MobileMenu } from "./MobileMenu";
import {
  ArrowRight,
  BagIcon,
  ChevronDown,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/icons";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/technology", label: "Technology" },
  { href: "/our-story", label: "Our Story" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaPinned, setMegaPinned] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const openMega = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  const scheduleCloseMega = useCallback(() => {
    if (megaPinned) return;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  }, [megaPinned]);

  const toggleMega = useCallback(() => {
    if (megaOpen && megaPinned) {
      setMegaOpen(false);
      setMegaPinned(false);
      return;
    }
    setMegaOpen(true);
    setMegaPinned(true);
  }, [megaOpen, megaPinned]);

  const closeMega = useCallback(() => {
    setMegaOpen(false);
    setMegaPinned(false);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setMegaPinned(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header className="header" data-scrolled={scrolled}>
        <div className="container header__inner">
          <div className="header__brand">
            <Wordmark />
            <span className="header__descriptor" aria-hidden="true">
              Audio lab — Copenhagen
            </span>
          </div>

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              <li>
                <Link
                  href="/shop"
                  className="nav__link"
                  data-active={pathname.startsWith("/shop") || pathname.startsWith("/product")}
                >
                  Shop
                </Link>
              </li>
              <li onMouseEnter={openMega} onMouseLeave={scheduleCloseMega}>
                <button
                  type="button"
                  className="nav__link"
                  data-active={pathname.startsWith("/collections")}
                  aria-expanded={megaOpen}
                  aria-controls="collections-mega"
                  onFocus={openMega}
                  onClick={toggleMega}
                >
                  Collections
                  <ChevronDown />
                </button>
              </li>
              {NAV.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav__link"
                    data-active={pathname === item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
            >
              <SearchIcon />
            </button>
            <Link href="/account" className="icon-btn" aria-label="Account">
              <UserIcon />
            </Link>
            <button
              type="button"
              className="icon-btn"
              onClick={openCart}
              aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
            >
              <BagIcon />
              <span className="cart-count" data-empty={count === 0}>
                {count}
              </span>
            </button>
            <button
              type="button"
              className="icon-btn burger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {megaOpen && (
          <div
            className="mega"
            id="collections-mega"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <div className="container mega__grid">
              <div className="mega__intro">
                <p className="eyebrow">Collections</p>
                <h3 style={{ marginTop: "0.85rem" }}>
                  Four ways
                  <br />
                  to listen.
                </h3>
                <p>
                  Grouped by how you use them, not by what they cost. Every model keeps a wired
                  input.
                </p>
                <Link href="/shop" className="link-arrow" onClick={closeMega}>
                  All headphones
                  <ArrowRight />
                </Link>
              </div>

              {navCollections.map((collection) => (
                <Link
                  key={collection.slug}
                  href={`/collections/${collection.slug}`}
                  className="mega__card"
                  onClick={closeMega}
                >
                  <span className="mega__thumb">
                    <Image
                      src={collection.image}
                      alt=""
                      width={320}
                      height={240}
                      sizes="(max-width: 900px) 40vw, 16vw"
                    />
                  </span>
                  <span className="mega__label">
                    <span>{collection.shortName}</span>
                    <span>{collection.kicker.replace("Collection ", "0")}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
