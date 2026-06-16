/**
 * Single place where GSAP + every plugin we use is registered.
 * Import { gsap } from '@/lib/gsap' everywhere instead of registering
 * plugins ad-hoc — double registration is harmless but this keeps the
 * plugin list in one auditable spot, and tree-shaking honest.
 *
 * All of these plugins are free as of GSAP 3.13 (April 2025).
 */
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Flip } from 'gsap/Flip';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// useGSAP itself is a plugin; registering it silences the dev warning and
// lets gsap.context cleanup hook into React's lifecycle.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    Draggable,
    InertiaPlugin,
    Flip,
    DrawSVGPlugin,
    MotionPathPlugin,
  );
}

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  Draggable,
  InertiaPlugin,
  Flip,
  DrawSVGPlugin,
  MotionPathPlugin,
};
