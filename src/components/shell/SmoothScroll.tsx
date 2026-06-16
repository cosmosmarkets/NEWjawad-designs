'use client';

/**
 * Lenis smooth scroll, driven off GSAP's ticker so it stays in lockstep with
 * ScrollTrigger (which the home camera will use in Phase 2). Disable it by
 * flipping ENABLE_LENIS to false — nothing else depends on it being on.
 * Respects prefers-reduced-motion (skips entirely so native scroll stays crisp).
 */
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

const ENABLE_LENIS = true;

export default function SmoothScroll() {
  useEffect(() => {
    if (!ENABLE_LENIS || prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000); // GSAP ticker is in seconds
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
