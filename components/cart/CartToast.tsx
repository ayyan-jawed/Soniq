"use client";

import Link from "next/link";
import { useCart } from "./cart-context";
import { CheckIcon, CloseIcon } from "@/components/ui/icons";

export function CartToast() {
  const { toast, dismissToast, isOpen } = useCart();
  if (!toast) return null;

  return (
    <div className="toast" role="status" aria-live="polite" style={isOpen ? { bottom: "1.75rem" } : undefined}>
      <CheckIcon width={16} height={16} aria-hidden="true" />
      <span className="toast__text">{toast.message}</span>
      {toast.action && (
        <Link href={toast.action.href} className="toast__action" onClick={dismissToast}>
          {toast.action.label}
        </Link>
      )}
      <button
        type="button"
        onClick={dismissToast}
        aria-label="Dismiss notification"
        style={{ opacity: 0.6, display: "inline-flex" }}
      >
        <CloseIcon width={13} height={13} />
      </button>
    </div>
  );
}
