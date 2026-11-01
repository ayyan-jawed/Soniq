"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Pointer-driven parallax on the hero product. Disabled for reduced motion,
 * touch devices and small screens. The image itself is not a 3D model — the
 * depth comes from layered lighting, mask and a small camera offset.
 */
export function HeroMedia() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(max-width: 860px)").matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function onMove(event: PointerEvent) {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = window.requestAnimationFrame(tick);
    }

    function tick() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      layer!.style.transform = `translate3d(${(-currentX * 14).toFixed(2)}px, ${(-currentY * 10).toFixed(2)}px, 0) scale(1.03)`;
      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        frame = window.requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero__media">
      <div className="hero__layer" ref={layerRef}>
        <Image
          src="/images/hero.jpg"
          alt="SONIQ ONE over-ear headphones in obsidian, lit in a dark studio"
          fill
          priority
          sizes="100vw"
          quality={86}
        />
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
    </div>
  );
}
