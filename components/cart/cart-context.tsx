"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, SHIPPING_THRESHOLD, type Product } from "@/lib/products";

export type CartLine = {
  slug: string;
  color: string;
  qty: number;
};

export type DetailedLine = CartLine & {
  product: Product;
  unitPrice: number;
  lineTotal: number;
  key: string;
  image: string;
};

type ToastNotice = { id: number; message: string; action?: { label: string; href: string } };

type CartState = {
  lines: CartLine[];
  detailed: DetailedLine[];
  count: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promo: string | null;
  promoError: string | null;
  hydrated: boolean;
  isOpen: boolean;
  toast: ToastNotice | null;
  add: (slug: string, color: string, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  dismissToast: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  freeShippingRemaining: number;
};

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "soniq.cart.v1";
const PROMO_KEY = "soniq.promo.v1";
const PROMOS: Record<string, number> = { LISTEN10: 0.1 };

function lineKey(slug: string, color: string) {
  return `${slug}::${color}`;
}

function isValidLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as CartLine;
  return (
    typeof line.slug === "string" &&
    typeof line.color === "string" &&
    typeof line.qty === "number" &&
    line.qty > 0 &&
    Boolean(getProduct(line.slug))
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [promo, setPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<ToastNotice | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(parsed.filter(isValidLine).map((l) => ({ ...l, qty: Math.min(l.qty, 10) })));
        }
      }
      const storedPromo = window.localStorage.getItem(PROMO_KEY);
      if (storedPromo && PROMOS[storedPromo]) setPromo(storedPromo);
    } catch {
      /* storage unavailable — cart simply starts empty */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
      if (promo) window.localStorage.setItem(PROMO_KEY, promo);
      else window.localStorage.removeItem(PROMO_KEY);
    } catch {
      /* ignore quota errors */
    }
  }, [lines, promo, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const add = useCallback((slug: string, color: string, qty = 1) => {
    const product = getProduct(slug);
    if (!product) return;
    setLines((current) => {
      const key = lineKey(slug, color);
      const existing = current.find((l) => lineKey(l.slug, l.color) === key);
      if (existing) {
        return current.map((l) =>
          lineKey(l.slug, l.color) === key ? { ...l, qty: Math.min(l.qty + qty, 10) } : l,
        );
      }
      return [...current, { slug, color, qty: Math.min(qty, 10) }];
    });
    setToast({
      id: Date.now(),
      message: `${product.name} · ${color} added`,
      action: { label: "View bag", href: "/cart" },
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((key: string) => {
    setLines((current) => current.filter((l) => lineKey(l.slug, l.color) !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((current) =>
      current
        .map((l) =>
          lineKey(l.slug, l.color) === key ? { ...l, qty: Math.max(0, Math.min(qty, 10)) } : l,
        )
        .filter((l) => l.qty > 0),
    );
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    setPromo(null);
    setPromoError(null);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      setPromoError("Enter a code to continue.");
      return false;
    }
    if (!PROMOS[normalized]) {
      setPromoError("That code is not recognised. Try LISTEN10.");
      return false;
    }
    setPromo(normalized);
    setPromoError(null);
    return true;
  }, []);

  const removePromo = useCallback(() => {
    setPromo(null);
    setPromoError(null);
  }, []);

  const detailed = useMemo<DetailedLine[]>(() => {
    return lines.flatMap((line) => {
      const product = getProduct(line.slug);
      if (!product) return [];
      return [
        {
          ...line,
          key: lineKey(line.slug, line.color),
          product,
          unitPrice: product.price,
          lineTotal: product.price * line.qty,
          image:
            product.colorways.find((c) => c.name === line.color)?.image ?? product.image,
        },
      ];
    });
  }, [lines]);

  const subtotal = detailed.reduce((sum, line) => sum + line.lineTotal, 0);
  const count = detailed.reduce((sum, line) => sum + line.qty, 0);
  const discount = promo && PROMOS[promo] ? Math.round(subtotal * PROMOS[promo] * 100) / 100 : 0;
  const merchandise = Math.max(0, subtotal - discount);
  const shipping = merchandise === 0 || merchandise >= SHIPPING_THRESHOLD ? 0 : 9;

  const value = useMemo<CartState>(
    () => ({
      lines,
      detailed,
      count,
      subtotal,
      discount,
      shipping,
      total: merchandise + shipping,
      promo,
      promoError,
      hydrated,
      isOpen,
      toast,
      add,
      remove,
      setQty,
      clear,
      openCart,
      closeCart,
      dismissToast,
      applyPromo,
      removePromo,
      freeShippingRemaining: Math.max(0, SHIPPING_THRESHOLD - merchandise),
    }),
    [
      lines,
      detailed,
      count,
      subtotal,
      discount,
      shipping,
      merchandise,
      promo,
      promoError,
      hydrated,
      isOpen,
      toast,
      add,
      remove,
      setQty,
      clear,
      openCart,
      closeCart,
      dismissToast,
      applyPromo,
      removePromo,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export { lineKey };
