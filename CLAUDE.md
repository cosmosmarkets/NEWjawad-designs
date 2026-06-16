# CLAUDE.md — Jawad Portfolio

Project rules and context for Claude Code. Read this before doing anything.

## What this project is

My design portfolio. The current version is a **Claude Design export**: multiple standalone HTML files glued together by a parent shell that loads each page in an `<iframe>` and injects CSS into it. It works, but the iframe/injection setup is an export artifact, not real architecture.

**Current job:** migrate the *tech stack* to Next.js + React + Tailwind + GSAP — **without changing how anything looks or behaves.** This is a 1:1 port. A redesign (new "paper / sketch" art direction) is a **separate, later** effort that I will plan on its own. Do not start it.

See `MIGRATION_ROADMAP.md` for the full architecture map and the prototype audit. Note: roadmap §4 (the "paper ripped onto canvas" design system) is the *future* design plan — **ignore it for the migration.**

## About me (how to write code for me)

I'm a designer and AI power user, not a deep engineer. I use AI to build *and* to learn. So:
- Comment non-obvious logic in plain language — explain the **why**, not the what.
- When you make an architectural decision, add a 2–3 line note to `NOTES.md` with the tradeoff.
- Favor clear, modern, idiomatic patterns over clever ones. No premature abstraction.
- I work solo on a laptop. Prefer free/low-cost, low-maintenance tools.

## Stack (decided — do not substitute)

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS** — layout + design tokens only, NOT animation
- **GSAP** + plugins (all free as of 2025), via `@gsap/react` (`useGSAP`): ScrollTrigger, Draggable, InertiaPlugin, Flip, DrawSVGPlugin, MotionPathPlugin
- **Zustand** — cross-component animation state (current section, scroll fraction, zoom, pan)
- **`next/font`** — fonts (no CSS `@import`)
- **Lenis** — smooth scroll (wire it, keep it easy to disable)

Do **not** add: Framer Motion, a pan/zoom library, rough.js, or any new design libraries during the migration.

## Hard rules

1. **No visual or texture changes.** Match the existing prototype pixel-for-pixel and interaction-for-interaction. Keep the current hand-drawn fonts, grid paper, the liquid-glass nav, colors, spacing — all of it. The redesign is a separate future phase.
2. **Kill the export scaffolding.** Do NOT port the iframes, the `FS_CSS` injection, the text-based `routeFromText` routing, or the per-page A/B/C/D "directions" explorer. Keep only the direction each page actually ships (E for home, D for the others).
3. **GSAP is the motion engine.** Re-implement the existing animations (homepage camera, canvas pan/zoom, nav-path fill, cursor) with GSAP so the result *looks and feels identical* to the current vanilla-JS behavior. Same easings, same speeds.
4. **Client vs server:** all animated/DOM-measuring components are `'use client'`; DOM math goes in `useGSAP`/`useLayoutEffect`, SSR-guarded.
5. **Reduced motion from day one:** wrap motion in `gsap.matchMedia()` with a `prefers-reduced-motion` calm branch.
6. **Tokens are the source of truth:** the `:root` vars below live in `tailwind.config.ts` + `globals.css`. No hard-coded hex in components.
7. **Phased + reviewed:** keep commits small and labelled by phase. Finish a phase, summarize, and wait for my review before the next one. Don't sprint the whole site in one go.

## Tokens (reuse exactly — from the prototype `:root`)

```
--paper:#f4f3f0; --paper-2:#eceae6; --ink:#2c2c2a; --ink-soft:#6f6e6a;
--line:#8d8c88;  --line-soft:#b9b8b3; --accent:#d2502f;
--hand: 'Architects Daughter','Comic Sans MS', cursive;
--mono: 'SF Mono', ui-monospace, 'Menlo', monospace;
--ease-smooth: cubic-bezier(0.16,1,0.3,1);
--ease-bounce: cubic-bezier(0.34,1.56,0.64,1);
```

## Reference files (read for behavior, then discard the approach)

- `extracted/Jawad Prototype v2.html` — iframe shell + curved nav-path logic (`buildNavCurve`, `applyNavProgress`)
- `extracted/homepage-e-v2.js` — homepage camera engine (`HOMEE`). Sections: Hero→Work→About→Process→Trust→Contact→Footer. API: `gotoPanel/navFwd/navBack/navData/navState/onNav/replayIntro/setHero*`. About + Trust are in-canvas panels, not routes.
- `extracted/services-render.js`, `extracted/work.js` — the `.scase`/`.sc-canvas`/`.sc-panel` pan+zoom canvas, `openDetail` nested canvas, `drawWires`
- `extracted/cursor.js` — custom cursor: feel modes (snappy/smooth/magnetic), ink splat, `data-cursor-say` bubble, magnetic to `[data-cursor-path]`
- `extracted/assets/`, `extracted/uploads/` — images (optimize to WebP/AVIF, serve via `next/image`)

## Target structure

```
src/
  app/            layout.tsx (persistent Shell), page.tsx (home), work/, work/[slug]/, services/, process/, pricing/, contact/
  components/     shell/ (Nav, Cursor, PathProgress)  canvas/ (SpatialCanvas, Panel, Wires, DetailCanvas)  home/ (HomeCamera, Section, Minimap)  ui/
  lib/            gsap.ts (register plugins once), store.ts (Zustand), motion.ts (eases/reduced-motion)
  styles/         globals.css (tokens + base)
public/           assets/ (optimized images)
```

## Commands

- `npm run dev` — local dev
- `npm run build` — production build (must pass with no type errors before a phase is "done")
- `npm run lint`

## Definition of done (every phase)

- `npm run dev` boots with no console errors; `npm run build` passes.
- The migrated piece is **visually and behaviorally identical** to the prototype.
- Non-obvious code is commented; decisions logged in `NOTES.md`.
- Then stop and summarize for review.
