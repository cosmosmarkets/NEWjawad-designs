# Claude Code — Tech-Stack Migration Prompt

> **Goal of this work: migrate the tech stack only.** Port the existing portfolio from the Claude Design export (HTML + iframes + vanilla JS) to Next.js + React + Tailwind + GSAP, with **the look and every interaction kept identical**. No redesign, no new textures, no "paper/sketch" art direction — that's a separate effort I'll plan later.
>
> Paste the block below into Claude Code from the repo root. It's scoped to **Phase 0 + Phase 1 only** on purpose — review the result, then say "continue to Phase 2," etc.

---

## The prompt (copy from here)

You are migrating my design portfolio from a Claude Design export (multi-file vanilla HTML/JS using an iframe shell) to a Next.js app. **This is a 1:1 tech-stack migration — preserve the current design and all interactions exactly. Do not change how anything looks or feels.** Read `CLAUDE.md` and `MIGRATION_ROADMAP.md` first; `CLAUDE.md` rules win if anything conflicts. Note: roadmap §4 (the "paper / sketch" design system) is a FUTURE effort — ignore it here.

**About me:** I'm a designer and AI power user, not a deep engineer, and I want to learn from this code. Comment non-obvious logic in plain language (the *why*). Log architectural decisions in `NOTES.md`. Prefer clear, idiomatic patterns.

**Stack (decided — do not substitute):**
- Next.js (App Router) + TypeScript
- Tailwind CSS — layout + tokens, NOT animation
- GSAP + plugins via `@gsap/react` (`useGSAP`): ScrollTrigger, Draggable, InertiaPlugin, Flip, DrawSVGPlugin, MotionPathPlugin (all free as of 2025)
- Zustand — cross-component animation state
- `next/font` — fonts (no CSS `@import`)
- Lenis — smooth scroll (wire it, keep it easy to disable)

Do **not** add Framer Motion, a pan/zoom library, rough.js, or any design/texture libraries.

**Preserve exactly (reuse the prototype tokens — keep the liquid-glass nav, hand fonts, grid paper, all of it):**
```
--paper:#f4f3f0; --paper-2:#eceae6; --ink:#2c2c2a; --ink-soft:#6f6e6a;
--line:#8d8c88;  --line-soft:#b9b8b3; --accent:#d2502f;
--hand:'Architects Daughter','Comic Sans MS',cursive;
--mono:'SF Mono',ui-monospace,'Menlo',monospace;
--ease-smooth:cubic-bezier(0.16,1,0.3,1);
--ease-bounce:cubic-bezier(0.34,1.56,0.64,1);
```

**Reference files (read for behavior, then DISCARD the iframe/injection approach):**
- `extracted/Jawad Prototype v2.html` — iframe shell + curved nav-path logic (`buildNavCurve`, `applyNavProgress`)
- `extracted/homepage-e-v2.js` — homepage camera (`HOMEE`); `SECTIONS` = Hero→Work→About→Process→Trust→Contact→Footer; API: `gotoPanel/navFwd/navBack/navData/navState/onNav/replayIntro/setHero*`; About + Trust are in-canvas panels, not routes
- `extracted/services-render.js`, `extracted/work.js` — `.scase`/`.sc-canvas`/`.sc-panel` pan/zoom canvas, `openDetail` nested canvas, `drawWires`
- `extracted/cursor.js` — custom cursor (feel modes snappy/smooth/magnetic, ink splat, `data-cursor-say`, magnetic to `[data-cursor-path]`)
- `extracted/assets/`, `extracted/uploads/` — images (optimize to WebP/AVIF, serve via `next/image`)

### SCOPE FOR THIS SESSION: Phase 0 + Phase 1 ONLY

**Phase 0 — Foundation**
1. Scaffold Next.js (App Router, TypeScript, ESLint) + Tailwind + the dependencies above.
2. `src/lib/gsap.ts`: register all plugins once; export configured `gsap` + `useGSAP`.
3. Port the `:root` tokens verbatim into `tailwind.config.ts` (colors, easings) and `globals.css` (CSS vars + the existing paper background). No new colors or textures.
4. Load the existing fonts (Architects Daughter, Baloo 2, etc.) via `next/font`.
5. Set up the folder structure from roadmap §3.2.
6. **Decision to record in `NOTES.md`:** routes vs. one-canvas + the route-transition strategy (recommend real routes + `next-view-transitions`). Implement the chosen skeleton.

**Phase 1 — Persistent shell (must match the prototype's nav + cursor exactly)**
1. `src/lib/store.ts`: Zustand store (`sectionIndex`, `scrollFrac`, `mode`, `zoom`, `panX`, `panY`, `goto`).
2. `components/shell/Nav.tsx` + `PathProgress.tsx`: reproduce the current bottom nav pill **as-is**, including the liquid-glass styling and the curved SVG nav path whose fill follows `scrollFrac` (port `buildNavCurve`/`applyNavProgress`). Links: Work, Services, Process, About, Trust, Pricing, Contact + the CTA. Add visible buttons + arrow-key support as the primary nav path (the existing left/right-click stays as a power-user shortcut).
3. `components/shell/Cursor.tsx`: port `cursor.js` faithfully (feel modes, ink splat, invert over `.cta`, `data-cursor-say` bubble, magnetic to `[data-cursor-path]`). Use `gsap.quickTo()` for the lerp; keep the same feel constants.
4. Mount Nav + Cursor in `app/layout.tsx` so they persist across routes and never remount.
5. Stub routes (`/`, `/work`, `/services`, `/process`, `/pricing`, `/contact`, `/work/[slug]`) each rendering a simple placeholder with the route name, so transitions are testable.

### Constraints & guardrails
- **No design/texture changes.** Visual + interaction parity with the prototype is the bar. If you're unsure whether something is "design," leave it exactly as the prototype has it and ask.
- **Do NOT** port the iframes, `FS_CSS` injection, `routeFromText` text routing, or the A/B/C/D "directions" explorer. Keep only each page's shipped direction (E home, D others).
- **GSAP re-implements existing motion to look/feel identical** — same easings, same speeds. Don't invent new animation.
- All animated components are `'use client'`; DOM math in `useGSAP`/`useLayoutEffect`, SSR-guarded.
- Wrap motion in `gsap.matchMedia()` with a `prefers-reduced-motion` branch from the start.
- Small, phase-labelled commits. Don't start Phase 2 until I review.

### Acceptance criteria for this session
- [ ] `npm run dev` boots clean; `npm run build` passes with no type errors.
- [ ] Tokens live in `tailwind.config.ts` + `globals.css`; no hard-coded hex in components.
- [ ] The nav pill is **visually identical** to the prototype (glass, curved path, fill) and the curve fill tracks a (stubbed) `scrollFrac`.
- [ ] Custom cursor matches the prototype: all three feel modes, ink splat, inverts over the CTA, `data-cursor-say` bubble.
- [ ] Nav + cursor persist across route changes without remounting/flashing.
- [ ] `NOTES.md` records the routes-vs-canvas + transition decision.

When Phase 0+1 pass, stop and summarize what you built + how to run it, then wait for me to say "continue to Phase 2."

### Later phases (do NOT start yet — for context only)
- **Phase 2 — Homepage camera:** port `HOMEE` (path travel + free roam + minimap) to GSAP, identical feel.
- **Phase 3 — Spatial canvas:** port `.scase` pan/zoom + `openDetail` (via Flip) + `drawWires`.
- **Phase 4 — Pages:** Work + `/work/[slug]`, Services, Process, Pricing, Contact, reusing the canvas components, with real content + optimized images.
- **(Separate future track) — Redesign:** the "paper / sketch" art direction. Not part of this migration.

---

## (end of prompt)

### Tips for running this with Claude Code
- Run from the **repo root** with the `extracted/` folder present so it can read your prototype files.
- After each phase, open the dev server and compare side-by-side with the old prototype before saying "continue."
- If a phase drifts, say: *"revert that and redo Phase X — keep parity with the prototype, follow CLAUDE.md."*
- Phase 2 (the homepage camera) is the hard one — give it its own focused session.
