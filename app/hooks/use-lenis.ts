"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchLikeDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    // Native scrolling is more stable on touch devices and avoids scroll jank.
    if (prefersReducedMotion || isTouchLikeDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.72,
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.12,
    });
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);
}
