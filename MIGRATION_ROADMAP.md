# Jawad Portfolio — Migration & Hi-Fi Roadmap

**From:** Claude Design export (multi-file HTML + vanilla JS, iframe shell)
**To:** Next.js + React + Tailwind + GSAP
**Art direction:** "Paper drawn & ripped onto a canvas" — keep the sketch soul, step away from liquid glass.
**Date:** June 2026

---

## 0. Read this first (the one-paragraph version)

Your stack choice is correct. The migration is **90% deletion of export scaffolding + 10% genuine re-architecture**. The current prototype works by loading each page as an `<iframe>` and injecting CSS into it from a parent shell — that's an artifact of how Claude Design exports, not a real architecture. In Next.js the iframes disappear: pages become routes, repeated HTML becomes React components, the `:root` tokens become a Tailwind theme, and all the hand-written animation loops (`requestAnimationFrame`, manual lerps, SVG path math) get replaced by GSAP. Build it in **phases**, homepage first, because the homepage engine (`HOMEE`) is the hardest and most signature piece — nail it and the rest is repetition.

---

## 1. What you have now (prototype audit)

Understanding the export is what makes the migration safe. Here's how it actually works.

### 1.1 The shell (`Jawad Prototype v2.html`)
- A parent page with a `#stage` div. It creates **one `<iframe>` per page** (`home`, `work`, `services`, `process`, `pricing`, `contact`, `casestudy`), preloads them hidden, and toggles `.active` to show one.
- On each iframe load it **injects** a full-screen stylesheet (`FS_CSS`) to strip the wireframe chrome, plus `cursor.js` and `playground.js`.
- It re-routes in-page links/CTAs back through the shell's `go(key)` function via text-matching (`routeFromText`).
- The bottom nav pill is drawn here, including the **curved SVG nav-path** that fills as you progress (`buildNavCurve`, `applyNavProgress`).
- `About` and `Trust` are **not pages** — they're panels *inside* the homepage canvas, opened via `HOMEE` openers.

> **Migration consequence:** all of this (iframes, CSS injection, text-based routing, the FS_CSS hack) gets **thrown away**. It only exists to glue separately-exported HTML files together.

### 1.2 The homepage engine (`homepage-e-v2.js`, global `HOMEE`)
This is the crown jewel and the hardest port.
- Sections live on a 2D "world": `Hero → Work → About → Process → Trust → Contact → Footer` (the `SECTIONS` array).
- A **camera travels a fixed path** through them as you scroll. Path shape is a Tweak: zig-zag / vertical / horizontal.
- Scroll/trackpad feeds a **weighted inertia integrator** (continuous, no hard paging) — that's the smooth "gliding along a path" feel.
- **Free roam:** drag/zoom anywhere on the world.
- Public API you'll need to recreate as React/store actions: `gotoPanel(i)`, `navFwd()`, `navBack()`, `navData()`, `navState()`, `onNav(fn)`, `onNavRebuild(fn)`, `replayIntro()`, `setHeroFont/Decor/Curve`, `setNavStyle`, `setBadges`, `currentIdx()`, `glideTo()`.
- It emits scroll fraction + active index so the **navbar fill** and **minimap comet** stay in sync.

### 1.3 The spatial canvas (`services-render.js`, `work.js`, etc.)
- Reusable pattern called `.scase` → `.sc-canvas` → `.sc-panel`.
- Drag to **pan**, wheel to **zoom** (`st = {s, px, py, home}`, `apply()` writes the transform).
- Clicking a panel **zoom-expands it into a nested "canvas-in-a-canvas"** detail view (`openDetail`) — this is your signature "zoom into a panel → it becomes a page" move.
- **Connector wires:** SVG lines tie an anchor panel to the others (`drawWires`).

### 1.4 Supporting pieces
- `cursor.js` — custom cursor with an ink-splat "marker" trail, feel modes (`snappy` / `smooth` / `magnetic`), inverts over CTAs, shows a tooltip bubble via `data-cursor-say`, magnetises to `[data-cursor-path]`.
- Per-page **"directions" (A/B/C/D/E)** — these are *design explorations* (multiple takes on each page). The shell picks one (E for home, D for others). **In the real build, keep only the chosen direction and delete the explorer.**
- A **Tweaks panel** — live controls for nav style, fonts, curviness, cursor feel, etc. Great as a dev tool; optional in production.

### 1.5 Tokens already defined (reuse these)
```
--paper:#f4f3f0;  --paper-2:#eceae6;  --ink:#2c2c2a;  --ink-soft:#6f6e6a;
--line:#8d8c88;   --line-soft:#b9b8b3; --accent:#d2502f;
--ease-smooth:cubic-bezier(0.16,1,0.3,1);
--ease-bounce:cubic-bezier(0.34,1.56,0.64,1);
```

---

## 2. Target stack (validated)

| Tool | Role in *this* site | Verdict |
|---|---|---|
| **Next.js (App Router)** | Routing, SEO/metadata, image optimization, `next/font`, free Vercel deploy | ✅ Keep |
| **React** | `.scase`/`.sc-panel`/nav → components; state instead of copy-paste HTML | ✅ Keep |
| **Tailwind** | Spacing, layout, color/type tokens (map your `:root` vars in) | ✅ Keep — for structure, *not* animation |
| **GSAP** | Every moving thing: path travel, zoom/pan, drawn lines, transitions | ✅ Keep — the engine |
| **Zustand** | Cross-component state: current section, zoom, pan, nav progress | ➕ Add (tiny, free) |
| **Lenis** | Smooth scroll that feeds ScrollTrigger; the "expensive" feel | ➕ Add (free, optional) |
| **rough.js** | Hand-drawn rendering of shapes/borders/paths — *core to the paper direction* | ➕ Add (free) |
| **`next/font`** | Self-host fonts, kill layout shift | ➕ Use instead of `@import` |

### GSAP plugins (all free since April 2025)
- **ScrollTrigger** — horizontal path travel (pin a section, scrub `translateX`/camera along scroll).
- **Draggable + InertiaPlugin** — free-roam pan + throw momentum on the canvas.
- **Flip** — "zoom panel → page" and route transitions.
- **DrawSVG** — draw the hand-drawn path/progress line on as you scroll.
- **MotionPathPlugin** — move the minimap comet along the spline.

### Deliberately NOT added (and why)
- **Framer Motion** — GSAP covers everything here. You *can* add it later for simple component enter/exit if you prefer its React-y API, but it's not required and overlaps with GSAP.
- **A pan/zoom library** (panzoom, react-zoom-pan-pinch) — your canvas needs bespoke behavior (nested zoom-into-detail, wires). Roll it with GSAP Draggable + manual wheel-zoom for full control.
- **Heavy glass/blur stacks** — the art direction is moving away from liquid glass, so drop the `backdrop-filter` machinery.

---

## 3. Target architecture (the consolidation)

### 3.1 The core decision: routes vs. one canvas
Your prototype is a hybrid (home = a canvas you fly around; work/services/etc = separate layers). For a **portfolio**, recruiters Google you and share deep links, so URLs matter. Recommendation:

- **Real routes** for SEO + shareable links: `/`, `/work`, `/work/[slug]`, `/services`, `/process`, `/pricing`, `/contact`.
- **One persistent shell** (nav + cursor + canvas frame) in the **root layout** so it never remounts between routes — that's what keeps motion seamless.
- The homepage `/` is the signature path-travel canvas. About + Trust stay as in-canvas panels there.
- Dedicated pages reuse the **same `<SpatialCanvas>` component** (pan/zoom/wires) but with their own panels.

> **Honest pitfall:** animated *exit* transitions between routes in the Next App Router are fiddly. Two clean options: (a) use the **View Transitions API** (`next-view-transitions` package) for cross-route Flip-style morphs, or (b) keep the whole spatial experience under one route with internal section state and only route-out for true sub-pages (case studies). Pick (a) for best feel + SEO; pick (b) if transitions fight you. Decide in Phase 0.

### 3.2 Folder structure
```
src/
  app/
    layout.tsx            # <Shell>: nav, cursor, providers, fonts
    page.tsx              # / homepage path-travel canvas
    work/page.tsx
    work/[slug]/page.tsx  # case study (e.g. /work/weld)
    services/page.tsx
    process/page.tsx
    pricing/page.tsx
    contact/page.tsx
  components/
    shell/                # Nav, Cursor, Tweaks(dev), PathProgress
    canvas/               # SpatialCanvas, Panel, Wires, DetailCanvas
    home/                 # HomeCamera (the HOMEE port), Section, Minimap
    ui/                   # Button, PostIt, Badge, TornCard ...
  lib/
    gsap.ts               # central GSAP + plugin registration
    store.ts              # Zustand: nav/camera/canvas state
    paper.ts              # rough.js + SVG-filter helpers
    motion.ts             # shared eases, durations, reduced-motion guard
  styles/
    globals.css           # tokens as CSS vars + base
  public/
    textures/             # paper grain, torn-edge masks
    assets/               # optimized images (WebP/AVIF)
```

### 3.3 State (Zustand)
Keep animation-critical state out of React re-render churn:
```ts
// lib/store.ts — sketch
type Nav = {
  sectionIndex: number;
  scrollFrac: number;        // 0..1 along the path
  mode: 'travel' | 'freeroam';
  zoom: number; panX: number; panY: number;
  goto: (i: number) => void; // wraps the GSAP glide
};
```
GSAP reads/writes these via refs; React only subscribes to what the UI shows (active label, minimap).

---

## 4. Design system — "paper drawn, ripped onto a canvas"

This is the biggest *visual* change from the prototype. The goal: it should look like sketches on torn paper pinned to a board, not CSS pretending to be glass.

### 4.1 Color & material
- **Base:** keep `--paper` / `--ink` / `--accent`. Warm off-white paper, near-black ink, the burnt-orange accent (`#d2502f`) as the single pop.
- **The board:** a subtle darker `--paper-2` canvas/cork behind torn cards, so cards read as *placed on* something.
- **Drop liquid glass:** replace `backdrop-filter` blur pills with **opaque torn-paper cards** + soft, layered, *warm* shadows (two stacked shadows: a tight contact shadow + a wider ambient one).

### 4.2 Texture (the secret sauce)
- **Paper grain:** one tileable grain PNG or an inline SVG `feTurbulence` noise overlay at low opacity over the whole board.
- **Torn edges:** SVG `feTurbulence` + `feDisplacementMap` on a clip/mask to give cards a ragged deckle edge instead of clean `border-radius`. Build it once as a reusable `<TornCard>`.
- **Hand-drawn strokes:** **rough.js** for borders, underlines, the connector wires, arrows, and the nav path. This is what makes lines look *drawn*, not vector-perfect.
- **Tape/pins:** small tape strips or pin dots at card corners sell "ripped and placed." Cheap, high payoff.

### 4.3 Type
- Keep a hand font for display/wordmark (Architects Daughter works; **Caveat** or a higher-quality hand font reads more "premium sketch"). Load via `next/font`.
- Consider a clean mono (you already use SF Mono) for captions/labels — the contrast of *hand display + crisp mono caption* is what makes sketch look intentional rather than unfinished.

### 4.4 Motion language (define once, reuse everywhere)
- **Eases:** `--ease-smooth` for camera/travel, `--ease-bounce` for playful pop (panel open, badges).
- **Durations:** travel 0.6–0.9s; panel zoom 0.5s; micro-hovers 0.15–0.2s.
- **Signature flourish:** lines *draw on* (DrawSVG) rather than fade in; cards *settle* with a tiny rotation (like being dropped on the board).

---

## 5. Component map (prototype → React)

| Prototype thing | React component | Notes |
|---|---|---|
| `#nav` pill + curved SVG path | `Nav` + `PathProgress` | rough.js path; fill driven by store `scrollFrac` |
| `cursor.js` | `<Cursor/>` hook/component | port feel modes; `data-cursor-*` → props/attrs |
| `HOMEE` camera + `SECTIONS` | `<HomeCamera/>` + `Section` | ScrollTrigger scrub + Draggable free-roam |
| `.e-minimap` | `<Minimap/>` | MotionPath comet along spline |
| `.scase`/`.sc-canvas`/`.sc-panel` | `<SpatialCanvas/>` + `<Panel/>` | Draggable pan + wheel zoom |
| `openDetail()` nested canvas | `<DetailCanvas/>` via **Flip** | zoom-expand from panel rect |
| `drawWires()` | `<Wires/>` | rough.js lines between panel centers |
| Per-page "directions" explorer | *(deleted)* | keep only the chosen direction |
| Tweaks panel | `<DevTweaks/>` | dev-only; gate behind `?dev` or NODE_ENV |
| `.e-postit`, tier badges, CTAs | `ui/PostIt`, `ui/Badge`, `ui/Button` | |

---

## 6. GSAP motion plan (interaction → technique)

1. **Horizontal path travel (home):** `ScrollTrigger` with `pin: true` on the canvas, `scrub: true`; map scroll progress → camera x/y along a precomputed path (sample points like the prototype's `pts`/`travLen`). Feed `scrollFrac` to the store for nav + minimap.
2. **Free roam:** `Draggable` on `.sc-canvas` with `inertia: true`; toggle between `travel` and `freeroam` modes in the store.
3. **Zoom:** wheel handler → `gsap.to(canvas, {scale})` clamped (your prototype uses 0.28–1.5). Keep zoom origin under the cursor.
4. **Panel → page (the showpiece):** `Flip.getState(panel)` → navigate/expand → `Flip.from(state, {duration, ease})`. Works both for in-canvas detail and (with View Transitions) cross-route.
5. **Drawn lines / path progress:** `DrawSVG` on the rough.js path; animate `drawSVG` from `0%` to the scroll fraction.
6. **Minimap comet:** `MotionPathPlugin` to ride the spline; position from `scrollFrac`.
7. **Custom cursor:** keep your `requestAnimationFrame` lerp *or* use `gsap.quickTo()` (cleaner, same feel). Magnetic = lerp target toward element center.
8. **Reduced motion:** wrap everything in `gsap.matchMedia()` with a `(prefers-reduced-motion: reduce)` branch that disables scrub/inertia and snaps instead.

---

## 7. Phased build order

**Phase 0 — Foundation (½ day)**
Scaffold Next + TS + Tailwind + GSAP + Zustand. Central `lib/gsap.ts` (register plugins once). Port `:root` tokens into `tailwind.config` + `globals.css`. Add paper grain + a `<TornCard>` proof-of-concept. Decide routes-vs-canvas + transition approach. **Checkpoint:** one torn card on a paper board with a rough.js border renders.

**Phase 1 — Shell (½ day)**
`<Nav>` + curved rough.js `PathProgress` + `<Cursor>` in root layout, persistent across routes. Zustand store wired. **Checkpoint:** nav + cursor work on a blank page and survive route changes.

**Phase 2 — Homepage camera (1–2 days, the hard part)**
`<HomeCamera>` + `<Section>` + `<Minimap>`. ScrollTrigger travel, Draggable free-roam, scroll-frac → nav/minimap sync. Hero with hand wordmark. **Checkpoint:** scroll glides the camera Hero→Footer; nav fill + minimap track it; arrow keys jump sections.

**Phase 3 — Spatial canvas + Flip (1 day)**
`<SpatialCanvas>`/`<Panel>`/`<Wires>` reusable; `<DetailCanvas>` zoom-open via Flip. **Checkpoint:** Services page pans/zooms; clicking a panel zoom-expands into detail and back.

**Phase 4 — Pages (1–2 days)**
Work + `/work/[slug]` (Weld case study), Services, Process, Pricing, Contact — all reusing the canvas + UI components. Real content + optimized images.

**Phase 5 — Hi-fi polish (ongoing)**
Micro-interactions (hover tilt, card settle, ink splat), reduced-motion branch, mobile vertical fallback, Lighthouse/a11y pass, deploy to Vercel.

---

## 8. Pitfalls (decide/handle these on purpose)

- **Left-click=back / right-click=forward** is an a11y trap (hijacks context menu, no keyboard path). Keep as a power-user shortcut; make visible buttons + arrow keys the primary nav. Show a one-time hint.
- **Big images:** Weld PNGs are 1.5–2 MB each. Convert to WebP/AVIF, serve via `next/image`, lazy-load off-screen panels. This alone makes/breaks mobile.
- **Mobile touch:** scroll-jack + pinch-zoom canvas is rough on phones. Ship the **vertical-scroll fallback** (you chose this). Detect via `gsap.matchMedia()` breakpoints; render a simpler stacked layout under ~768px.
- **App Router exit animations:** see §3.1 — choose your transition strategy in Phase 0, don't discover it in Phase 4.
- **SSR + GSAP:** all animation components are client-only (`'use client'`), and DOM-measuring code runs in `useLayoutEffect` guarded for SSR (use `useGSAP()` from `@gsap/react`).
- **`getPointAtLength` / layout math** needs the DOM laid out + fonts loaded. Recompute paths on `document.fonts.ready` and on resize (debounced) — the prototype already does this; keep the habit.

---

## 9. Performance & accessibility checklist

- [ ] Images: WebP/AVIF + `next/image` + lazy off-screen
- [ ] Fonts: `next/font`, `display: swap`, subset
- [ ] `prefers-reduced-motion`: full calm fallback via `gsap.matchMedia()`
- [ ] Keyboard nav: Tab order, arrow-key section jumps, Esc closes detail
- [ ] Focus states visible (not just cursor effects)
- [ ] Semantic HTML + alt text + landmark roles for the spatial regions
- [ ] Lighthouse ≥ 90 perf on desktop; test real mobile
- [ ] `will-change`/transform-only animations (no layout-thrashing props)

## 10. Deployment & cost
- **Vercel** free tier — built for Next, push-to-deploy from Git. Custom domain ~$10–15/yr.
- Everything in the stack is **free/open source** (GSAP included as of April 2025).

---

## 11. "Next level" (optional, later)
- **One canvas, routed views:** persistent canvas in the root layout; routes just refocus a region → real URLs *and* seamless motion.
- **Dev HUD:** turn the Tweaks panel into a `leva` debug panel for live-tuning eases/curviness — speeds the hi-fi loop.
- **View Transitions API** for buttery cross-route morphs once it's stable in your Next version.
- **Sound design:** subtle paper rustle / pencil scratch on key interactions (respect a mute + reduced-motion).

---

*Build the homepage camera first. It's the hardest and most "you" — everything else is repetition of the canvas + card patterns.*
