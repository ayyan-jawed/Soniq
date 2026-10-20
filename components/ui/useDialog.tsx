"use client";

import { useEffect, useRef } from "react";

type UseDialogOptions = {
  open: boolean;
  onClose: () => void;
  lockScroll?: boolean;
};

/**
 * Shared dialog behaviour: escape to close, focus containment, focus restore,
 * and body scroll locking. Keeps every overlay in the site consistent.
 */
export function useDialog<T extends HTMLElement>({ open, onClose, lockScroll = true }: UseDialogOptions) {
  const panelRef = useRef<T | null>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;

    if (lockScroll) {
      const scrollbar = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    }

    const focusFirst = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const target = panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel;
      target.focus({ preventScroll: true });
    }, 30);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);

      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      restoreRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose, lockScroll]);

  return panelRef;
}
