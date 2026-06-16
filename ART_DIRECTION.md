# ART_DIRECTION.md — Jawad Portfolio Redesign

**Status:** Future design phase. Do **not** start during the tech-stack migration (see `CLAUDE.md` + `MIGRATION_ROADMAP.md`). This is the plan for *after* the 1:1 port is done and stable.
**Direction:** Studio Wall (cozy/personal) foundation + Arcade-Zine energy in the hero & section transitions.
**Date:** June 2026

---

## 1. The big idea

**Your site is a studio wall — an artist's working canvas you fly around.** Each section is a "piece" pinned to it. The governing rule that keeps the collage meaningful instead of noisy:

> **Every piece exists in two states — rough and finished — and the site shows both.** A polished case-study poster sits next to the napkin sketch it grew from. Pieces can *develop* from sketch → final as you approach or hover.

Why this works: it's the anti-eyesore safety net (it's a *wall* — busy is the point), it's personal (it's literally your studio), and it tells your story (idea → shipped, designer + AI power user). It also reuses your existing spatial-canvas navigation instead of replacing it.

> ⚠️ **Content cost:** the rough/finished duality only sings if real (or convincingly faked) sketches exist behind your work. The wall-assembling hero is deferred until you have more pieces — see §9 and §13.

---

## 2. The loudness system (the most important rule)

Maximalism without rhythm is exhausting. We run the site on a **loudness budget**, 1–10:

- **Baseline (the wall): floats 4–7, sits at ~6.** Warm paper, gentle motion, readable type, 2–3 colours in view.
- **Hero: 8.** Full saturation, kinetic type, 3D, halftone shimmer, mascot. The first-3-seconds "whoa."
- **Section transitions: brief 8 spikes, then settle back to ~6.** A burst of colour/halftone/motion as you cross into a new zone, then calm. *This pulse is what makes it feel expensive instead of loud.*
- **Reading moments (case-study body, contact): drop to 3–4.** Let content breathe.

Rule of thumb: **loud objects, calm canvas.** Chaos is decorative; the grid underneath is strict. One focal "shout" per screen — if two things shout, neither wins.

---

## 3. Experience walkthrough

1. **Boot up.** Hero at loudness 8: a glossy **3D blob** floats; the **"Jawad" bubble logo draws itself on** with a halftone fill; mascot energy, colour at full pop.
2. **Hand-off.** As you scroll/drag in, the 3D blob **melts down into your 2D cursor-blob** (your guide for the rest of the site). Camera pulls back into the wall; palette mellows to warm paper (~6).
3. **Travel the wall.** Past Work (finished posters that peel from their sketches), About (a corner of the desk — coffee, doodles, your face as a sticker), Process (the rough→final idea, literalised).
4. **Open a piece.** Click a poster → it **Flip-zooms** into a full case study with its *own colour world* (Palette B or C). Loudness dips to 3–4 for reading.
5. **Contact.** A pinned post-it you can practically grab; mascot celebrates.

---

## 4. Colour

No pure white, no pure black, ever. Warm, pastel-but-grounded. **Palette A is the site baseline; B and C are per-case-study "colour worlds"** so each project feels distinct (MasterGo-style) without the whole site screaming.

### Palette A — Warm Studio (baseline)
| Role | Hex | Use |
|---|---|---|
| Paper (bg) | `#F2E7D3` | primary background |
| Board (bg-2) | `#E7D7BD` | the wall behind pinned pieces |
| Ink | `#3A2E3F` | body text, line work (replaces pure black) |
| Ink-soft | `#6F5E66` | captions, secondary text |
| Accent (pop) | `#D2502F` | one focal hit per view — CTAs, highlights |
| Sky | `#A8C7D9` | pastel support |
| Mint | `#BFD8B8` | pastel support |
| Butter | `#F2D479` | pastel support / warmth |

### Palette B — Dusk Riso (case-study world: moody)
Deep plum base `#3A2E3F`/`#5A4660` · peach `#F2B79B` · coral `#D2502F` · butter `#F2D479` · teal `#2E7D7B`. For darker, grown-up projects.

### Palette C — Sunbleached Arcade (case-study world: loud)
Pink-cream base `#F6D9CE` · red `#D63B2A` · cyan `#3FB8C4` · mustard `#E4A11B`. For playful/gaming projects (closest to the #2 energy).

**Rules:** ≤3 colours visible at once; accent is a *seasoning*, not a base; pastels carry the mid-range; ink (not black) anchors contrast. Each case study declares its palette as tokens so the whole page recolours from one source.

---

## 5. Typography

The wild-headline / calm-body contrast is what keeps maximalism legible.

- **Wordmark "Jawad":** a **bubble / graffiti** display (Playtopia energy). Drawn-on, halftone-fillable, treated as a logo-art-object — not just text.
- **Section headlines:** a **chunky condensed display** (Tetrix energy). Big, punchy, halftone/outline/layered-shadow treatments allowed. These are the "art piece" headlines.
- **Body:** one clean, highly readable sans (or your existing mono for captions/labels). Quiet, high-contrast, never decorated. Legibility is sacred.
- **Hand accent:** your existing hand font (Architects Daughter / Caveat) for doodles, margin notes, post-its — the personal layer.

**Type treatments (display only):** halftone dot fills, single-colour outline, layered drop shadow (sticker look), draw-on via SVG/DrawSVG, subtle kinetic wobble. Never on body.

**Free sources:** [Fontshare](https://fontshare.com) (Clash Display, General Sans, Satoshi — free commercial), Google Fonts (Bagel Fat One / Boogaloo for bubble, Anton / Archivo for condensed). Load via `next/font`.

---

## 6. The Blob (mascot)

**The blob is your custom cursor, evolved into a character.** It follows you, sticks to key headlines/buttons, recolours to any background, and has moods. One system, grown from the cursor you already have.

**Behaviours**
- **Follow:** trails the pointer with GSAP `quickTo` lerp (reuse cursor feel modes — snappy/smooth/magnetic).
- **Stick / merge:** on `[data-blob-stick]` elements (headlines, CTAs), it *magnetically snaps and visually merges* into the element via the gooey filter, then releases on exit.
- **Colour-shift:** `mix-blend-mode` (difference/hard-light/exclusion) so it auto-recolours against any background — or it reads the section's palette token. Pick per-section for control.
- **Moods (GSAP squash/stretch):** idle breathing wobble · excite/grow on hover · merge when sticking · drag-stretch on free-roam · **splat on click** (reuse your existing ink-splat).

**Tech (cheap → fancy)**
1. **SVG gooey filter** — 2–3 `<circle>`s + `feGaussianBlur` + `feColorMatrix` (contrast the alpha) = liquid metaball look. Cheap, ships first.
2. **GSAP** for all motion/morph/squash.
3. **Upgrade (optional, later):** WebGL metaballs (R3F) for true 3D goo and the hero blob.

**Personality guardrails:** the blob reacts, it doesn't perform constantly. It rests when you read. Respect `prefers-reduced-motion` (static blob, no chase).

---

## 7. Texture & material

The collage glue. This is where you get the most personality per kilobyte.

- **Halftone** — the unifier across mismatched illustrations. Static via SVG filter/CSS; animated/interactive via WebGL shader (the "wow" version). Apply to images, big shapes, type fills.
- **Paper grain + riso misregistration** — low-opacity grain over the board; slight CMYK channel offset on key art for the print-zine feel.
- **Physical collage** — tape strips, push-pins, sticker cut-out edges, post-its (in your hand font), torn/deckle paper edges (SVG `feTurbulence` + `feDisplacementMap`).
- **Hand-drawn connectors** — sketchy lines/arrows linking related pieces (this replaces the old `drawWires` with a rougher look; rough.js is now in-scope for the *design phase*).

---

## 8. Motion language

**Principles:** motion on intent (scroll/hover/enter) · stagger, don't fire everything at once · physics/springs for life · always a reduced-motion calm branch.

**Signature moves**
- Pieces **peel** from sketch → final on approach.
- Posters **Flip-zoom** into case studies.
- Headlines **draw on** (DrawSVG) rather than fade.
- Cards **settle** with a tiny drop-rotation (placed on the wall).
- Section-crossing **colour/halftone burst**, then settle.
- Marquee/arrow banners between zones (MasterGo-style) for rhythm.

**Engine:** GSAP (ScrollTrigger, Flip, Draggable, Inertia, DrawSVG, MotionPath) — already your stack. Lenis for smooth scroll feel.

**Perf budget:** see §9 + §11. Motion is rhythmic, not constant.

---

## 9. 3D & shaders

Surgical, not everywhere. **Budget: 1–2 showpieces + shader backgrounds.**

- **Hero 3D blob** — the showpiece; melts into the 2D cursor-blob on scroll (unifies hero + mascot).
- **Shader treatments** — animated gradient + halftone/grain/dither backgrounds; cursor-reactive halftone on key art.
- **Build path:** you already use **Spline** — model the hero blob there and drop it in via `@splinetool/react-spline` (no raw GLSL needed). Keep hand-written GLSL for background halftone/grain only, via `@react-three/postprocessing`.
- **Guardrails:** 3D only above the fold / on the hero; lazy-load; pause when offscreen; FPS guard; **mobile fallback = a 2D illustrated hero + static blob** (no WebGL). 3D is a rabbit hole — timebox it.

---

## 10. Layout & grid

- **Strict grid under the chaos.** Pieces are placed with intent on an underlying baseline/column grid; the *rotation and overlap* are the only "mess."
- **Generous negative space** (in warm paper) — this is what makes loud bits read as deliberate.
- **One focal point per screen**, clear hierarchy, then supporting pieces.
- **Responsive:** desktop = spatial wall; **mobile = vertical-scroll stack** of the same pieces (decided in migration). Mobile drops 3D + heaviest halftone.

---

## 11. Anti-eyesore rulebook (pin this above the monitor)

1. Loud objects, calm canvas. Strict grid, decorative chaos.
2. One shout per screen.
3. ≤3 colours visible at once; accent is seasoning.
4. Body type stays quiet + high-contrast. Wild type = display only.
5. Breathing room even in maximalism.
6. Motion budget: stagger, rest, reduced-motion branch.
7. Perf budget: 3D/halftone are GPU-expensive — measure, fallback on mobile.
8. It's a *system* (tokens + components), so collage feels authored, not random.

---

## 12. Treatment checklist (what makes something "on-brand")

- [ ] Warm paper background (never white)
- [ ] Halftone somewhere in the composition
- [ ] One accent hit, max
- [ ] A hand/personal element (doodle, post-it, sticker, your face)
- [ ] Display type treated as an object; body type quiet
- [ ] The blob has a reason to react here
- [ ] A rough + a finished state present (or implied)
- [ ] Reduced-motion + mobile fallback considered

---

## 13. How this maps onto the locked stack

Everything builds on the migration stack (Next + React + Tailwind + GSAP + Zustand). **For the design phase, add:**

- `three` + `@react-three/fiber` + `@react-three/drei` — 3D
- `@react-three/postprocessing` — halftone/grain/dither shaders
- `@splinetool/react-spline` — drop-in hero blob from Spline
- `rough.js` — hand-drawn connectors/borders (now in-scope, design phase only)
- SVG filters — gooey blob, halftone, torn edges (no library)

All free / open source. Tokens (A/B/C palettes) extend the migration's token system — same source-of-truth pattern, no hard-coded hex.

---

## 14. Open items before build

- [ ] **Sketches/rough assets** for the rough→finished duality (gates the wall-assembling hero).
- [ ] **Hero 3D blob** modelled in Spline.
- [ ] **Final font picks** (bubble wordmark + condensed headline + body) licensed/loaded.
- [ ] **Mascot mood set** defined (idle / hover / stick / drag / splat).
- [ ] **Per-case-study palettes** assigned (which project = B, which = C).
- [ ] A **visual moodboard** to lock the vibe before coding (next step — I can render one).

---

*Foundation = cozy studio wall at loudness ~6. Spend the fireworks on the hero and the doorways between zones. The blob is the thread that ties it all together — and it's the cursor you already have.*
