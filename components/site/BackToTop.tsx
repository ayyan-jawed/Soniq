"use client";

import { ArrowUp } from "@/components/ui/icons";

export function BackToTop() {
  function scrollTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <button type="button" className="to-top" onClick={scrollTop}>
      Back to top
      <ArrowUp />
    </button>
  );
}
