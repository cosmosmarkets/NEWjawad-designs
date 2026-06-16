/**
 * Cross-component animation state.
 *
 * Why Zustand and not React state: the nav fill, minimap, and (later) the
 * home camera all read/write this 60×/second. Putting it in React state
 * would trigger a re-render storm. GSAP code reads the current values via
 * `useStore.getState()` and writes with `setScroll(...)` without subscribing;
 * only the small bits of UI that must visibly change (active label, etc.)
 * subscribe with the hook.
 *
 * This is the Phase 1 shape. `goto` currently just snaps the section index +
 * a matching scrollFrac so the nav curve fills to the right node; in Phase 2
 * it will wrap the real GSAP camera glide.
 */
import { create } from 'zustand';

/** The home world's sections, in travel order (see homepage-e-v2 SECTIONS). */
export const SECTION_COUNT = 7;

export type CameraMode = 'travel' | 'freeroam';

type StoreState = {
  /** Active section along the path, 0..SECTION_COUNT-1. */
  sectionIndex: number;
  /** Continuous progress along the path, 0..1. Drives nav fill + minimap. */
  scrollFrac: number;
  /** Home camera interaction mode. */
  mode: CameraMode;
  /** Spatial-canvas transform (Phase 3). */
  zoom: number;
  panX: number;
  panY: number;

  /** Jump to a section. Phase 2 will make this a GSAP glide. */
  goto: (i: number) => void;
  /** Continuous update from the scroll integrator (Phase 2). */
  setScroll: (frac: number, idx?: number) => void;
  setMode: (mode: CameraMode) => void;
  setCanvas: (t: { zoom?: number; panX?: number; panY?: number }) => void;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export const useStore = create<StoreState>((set) => ({
  sectionIndex: 0,
  scrollFrac: 0,
  mode: 'travel',
  zoom: 1,
  panX: 0,
  panY: 0,

  goto: (i) => {
    const idx = clamp(Math.round(i), 0, SECTION_COUNT - 1);
    // Stub fill: place the curve tip proportionally at this node. Phase 2
    // replaces this with the actual fraction emitted by the camera.
    set({ sectionIndex: idx, scrollFrac: idx / (SECTION_COUNT - 1) });
  },

  setScroll: (frac, idx) =>
    set((s) => ({
      scrollFrac: clamp(frac, 0, 1),
      sectionIndex: idx != null ? clamp(Math.round(idx), 0, SECTION_COUNT - 1) : s.sectionIndex,
    })),

  setMode: (mode) => set({ mode }),
  setCanvas: (t) => set((s) => ({ ...s, ...t })),
}));
