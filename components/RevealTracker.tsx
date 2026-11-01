"use client";

import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements as they enter the viewport.
 *
 * Two mechanisms, deliberately:
 *  - IntersectionObserver for the normal case.
 *  - A rAF-throttled scroll sweep that reveals anything already above the fold.
 *    Fast scrolling and anchor jumps can move an element from below the viewport
 *    to above it without ever producing an intersection, which would otherwise
 *    leave whole sections invisible.
 *
 * A MutationObserver covers streamed/mounted-late content. If scripting is off,
 * the <noscript> rule in the layout keeps everything visible.
 */
export function RevealTracker() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      return;
    }

    const pending = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
          pending.delete(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    function scan() {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (pending.has(el) || el.classList.contains("is-in")) return;
        pending.add(el);
        observer.observe(el);
      });
    }

    let frame = 0;

    function sweep() {
      frame = 0;
      const limit = window.innerHeight * 0.98;
      pending.forEach((el) => {
        if (el.classList.contains("is-in")) {
          pending.delete(el);
          return;
        }
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add("is-in");
          observer.unobserve(el);
          pending.delete(el);
        }
      });
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(sweep);
    }

    scan();
    sweep();

    const mutation = new MutationObserver(() => scan());
    mutation.observe(document.body, { childList: true, subtree: true });

    const timers = [window.setTimeout(scan, 250), window.setTimeout(scan, 1200)];
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", scan);

    return () => {
      observer.disconnect();
      mutation.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", scan);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
