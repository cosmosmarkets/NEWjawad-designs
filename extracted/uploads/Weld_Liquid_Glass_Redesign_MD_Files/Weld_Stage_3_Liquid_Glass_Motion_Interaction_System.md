# Weld Stage 3 — Liquid Glass Motion + Interaction System

**Stage focus:** Replace cartoon, toy-like motion with subtle liquid glass motion for the dynamic Weld landing page, split hero, role switching, talent card interactions, and signup states.

**Audience:** Codex, Claude Code, frontend engineers, motion designers, QA reviewers.

**Scope:** Frontend-only interaction behavior, hero entrance, glass hover states, role switching, audience toggle, proof popovers, signup feedback, reduced motion, and performance rules.

---

## 00. Core Oath

Motion must make Weld feel premium and responsive.

It should feel:

- smooth
- controlled
- glassy
- crisp
- responsive
- high-trust
- lightweight

It should not feel:

- bouncy
- cartoonish
- toy-like
- gamey
- terminal-like
- cinematic for no reason
- slow or scroll-jacked

The attached reference layout 1 is a calm split hero. Motion should support that composition, not distract from it.

---

## 01. Executive Objective

The previous cartoon motion system used tactile card pops, sticker bounces, and expressive Spark bursts. The new system should feel like polished liquid glass:

- surfaces reveal softly
- glass highlights shift subtly
- role changes crossfade with a small slide
- audience toggle glides inside its capsule
- the talent card lifts slightly on hover
- signup state changes are immediate but restrained
- proof popovers open cleanly

The goal is not animation spectacle. The goal is premium responsiveness.

---

## 02. What This Stage Owns

Stage 3 owns:

- motion tokens
- hero load sequence
- glass hover/press behavior
- talent card hover behavior
- role switching transitions
- audience toggle transition
- proof badge popover behavior
- signup form state motion
- card action feedback
- section reveal motion
- reduced-motion rules
- performance constraints

It does **not** own:

- visual tokens
- final copy
- backend signup submission
- analytics/events backend
- production data

---

## 03. Major Direction Change

### Previous cartoon motion

- bounces
- sticker pops
- squish buttons
- spark bursts
- playful card nudges
- doodle reveals

### New liquid glass motion

- soft fade/slide
- subtle scale
- capsule glide
- specular sweep
- card lift
- restrained blur/opacity transitions
- single feedback pulse only when useful

### New rule

If an animation feels like a toy, game, sticker, or confetti moment, remove or calm it down.

---

## 04. Motion Principles

### 1. Response within 100ms

Controls should feel immediate even if the full transition continues after the click.

### 2. One layer moves at a time

Avoid moving the entire hero, card, chips, CTA, and background at once.

### 3. Glass reacts subtly

Glass surfaces can lift, brighten, or reveal a highlight. They should not wobble.

### 4. State must stay readable

Every motion state must also be visible through text, color, and layout.

### 5. Reduced motion is first-class

Reduced motion should preserve all functionality and all state changes.

---

## 05. Motion Tokens

```css
:root {
  --w-ease-standard: cubic-bezier(.16, 1, .3, 1);
  --w-ease-smooth: cubic-bezier(.22, 1, .36, 1);
  --w-ease-press: cubic-bezier(.2, .8, .2, 1);
  --w-ease-exit: cubic-bezier(.4, 0, .2, 1);

  --w-dur-instant: 90ms;
  --w-dur-fast: 140ms;
  --w-dur-base: 220ms;
  --w-dur-card: 320ms;
  --w-dur-hero: 620ms;

  --w-hover-lift: -4px;
  --w-press-scale: .985;
  --w-card-scale-hover: 1.008;
  --w-glass-highlight-x: 36px;
}
```

Rules:

- Default UI motion: 140-220ms.
- Card/state transitions: 220-320ms.
- Hero entrance: 500-700ms total.
- No looping attention animations in the first viewport.

---

## 06. Motion Event Model

```ts
type WeldGlassEvent =
  | { type: "ROLE_SELECTED"; role: WeldRole }
  | { type: "AUDIENCE_SWITCHED"; mode: "developer" | "studio" }
  | { type: "PROFILE_CARD_CHANGED"; cardId: string }
  | { type: "PROFILE_LIKED"; cardId: string }
  | { type: "PROFILE_REJECTED"; cardId: string }
  | { type: "PROFILE_SPARKED"; cardId: string }
  | { type: "PROOF_OPENED"; badgeId: string }
  | { type: "PROOF_CLOSED"; badgeId: string }
  | { type: "WAITLIST_EMAIL_CHANGED"; valid: boolean }
  | { type: "WAITLIST_SUBMITTED" }
  | { type: "WAITLIST_RESOLVED"; ok: boolean };
```

Rules:

- Events update state directly.
- Do not emit fake logs.
- Do not simulate booting, compiling, parsing, or loading systems.
- User-facing feedback should be short and visible.

---

## 07. Hero Entrance Motion

The split hero should assemble quietly.

Suggested sequence:

1. page background appears immediately
2. hero glass shell fades/slides up 12px
3. nav elements fade in
4. talent card fades/slides in from the left 16px
5. headline/subhead fade in from the right 12px
6. CTA appears last

Total: 620ms preferred.

```css
.hero-shell {
  opacity: 0;
  transform: translateY(14px) scale(.992);
  animation: shell-in var(--w-dur-hero) var(--w-ease-standard) forwards;
}

@keyframes shell-in {
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.hero-card-enter {
  opacity: 0;
  transform: translateX(-16px) translateY(8px);
  animation: card-in 520ms var(--w-ease-standard) 120ms forwards;
}

.hero-copy-enter {
  opacity: 0;
  transform: translateX(12px) translateY(8px);
  animation: copy-in 520ms var(--w-ease-standard) 180ms forwards;
}

@keyframes card-in,
@keyframes copy-in {
  to { opacity: 1; transform: translate(0, 0); }
}
```

Avoid:

- word-by-word scramble
- huge parallax reveal
- blur-heavy masked text entrance
- long delays before CTA is visible

---

## 08. Glass Hover Behavior

Desktop glass hover should be subtle.

```css
.glass-interactive {
  transition:
    transform var(--w-dur-base) var(--w-ease-standard),
    border-color var(--w-dur-base) var(--w-ease-standard),
    box-shadow var(--w-dur-base) var(--w-ease-standard),
    background var(--w-dur-base) var(--w-ease-standard);
}

@media (hover: hover) and (pointer: fine) {
  .glass-interactive:hover {
    transform: translateY(var(--w-hover-lift));
    border-color: rgba(255,255,255,.9);
    box-shadow: 0 28px 78px rgba(32,40,72,.16), inset 0 1px 0 rgba(255,255,255,.9);
  }
}
```

Rules:

- Do not rotate glass cards by default.
- Do not bounce.
- No hover dependency on mobile.
- Hover should never move text out of alignment.

---

## 09. Button Press Behavior

Buttons should feel crisp, not squishy.

```css
.button-primary,
.button-secondary,
.role-tab,
.mode-tab {
  transition:
    transform var(--w-dur-fast) var(--w-ease-press),
    box-shadow var(--w-dur-fast) var(--w-ease-press),
    background var(--w-dur-fast) var(--w-ease-press);
}

.button-primary:active,
.button-secondary:active,
.role-tab:active,
.mode-tab:active {
  transform: translateY(1px) scale(var(--w-press-scale));
}
```

Do not use:

- cartoon squash
- elastic bounces
- confetti
- large radial bursts

---

## 10. Audience Toggle Motion

The developer/studio toggle should glide like a pill inside glass.

```css
.mode-toggle-indicator {
  transition:
    transform 260ms var(--w-ease-standard),
    width 220ms var(--w-ease-standard),
    background 180ms var(--w-ease-standard);
}
```

Sequence:

1. clicked tab changes text color immediately
2. indicator glides to selected tab
3. hero copy crossfades
4. card content updates after or during crossfade

Rules:

- No pulsing or popping indicator.
- No color explosion between modes.
- Studio mode can use slightly cooler accent light, but keep the same black/white system.

---

## 11. Role Selection Motion

Role switching should update the card cleanly.

Sequence:

1. role chip active state changes within 100ms
2. content area fades to 0 and slides 8px
3. role data updates
4. content fades in and returns to position
5. status text updates if needed

```css
.card-content[data-changing="true"] {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 110ms var(--w-ease-exit), transform 110ms var(--w-ease-exit);
}

.card-content[data-changing="false"] {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 180ms var(--w-ease-standard), transform 180ms var(--w-ease-standard);
}
```

Rules:

- total perceived transition under 280ms
- no typing effect
- no fake data loading
- no avatar spin
- no role-specific rainbow flashes

---

## 12. Card Action Motion

The hero can still include Reject / Like / Spark or similar card actions, but the motion must be restrained.

### Reject

- small lateral nudge left, max 10px
- status text: “Skipped for now”
- no dramatic throwaway animation in the hero reference build

### Like

- slight card lift or icon fill
- status text: “Saved to shortlist”
- no heart burst unless product explicitly asks later

### Spark

- primary CTA or action highlights briefly
- status text: “Join early to Spark first”
- scrolls/focuses signup when appropriate

```ts
export const cardActions = {
  reject: {
    label: "Reject",
    aria: "Reject this talent preview",
    status: "Skipped for now",
    motionClass: "action-nudge-left"
  },
  like: {
    label: "Like",
    aria: "Like this talent preview",
    status: "Saved to shortlist",
    motionClass: "action-soft-lift"
  },
  spark: {
    label: "Spark",
    aria: "Spark with this talent",
    status: "Join early to Spark first",
    motionClass: "action-focus-signup"
  }
};
```

---

## 13. Proof Popover Motion

Proof popovers should open like refined glass cards.

```css
.proof-popover {
  opacity: 0;
  transform: translateY(8px) scale(.985);
  filter: blur(2px);
  transform-origin: top left;
  transition:
    opacity var(--w-dur-base) var(--w-ease-standard),
    transform var(--w-dur-base) var(--w-ease-standard),
    filter var(--w-dur-base) var(--w-ease-standard);
}

.proof-popover[data-open="true"] {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}
```

Accessibility:

- open on click and keyboard activation
- dismiss on Escape
- `aria-expanded` on trigger
- connect popover content with `aria-controls` or clear descriptive text
- do not make proof hover-only

---

## 14. Signup Motion

Signup is the conversion moment. It should feel stable, not playful.

### States

```ts
type WaitlistState =
  | "idle"
  | "focused"
  | "typing"
  | "valid"
  | "submitting"
  | "success"
  | "error";
```

### Motion by state

| State | Visual feedback | Motion |
|---|---|---|
| idle | neutral glass field | none |
| focused | accent focus ring | soft border transition |
| typing | helper text changes | fade text only |
| valid | success icon appears | quick fade/scale `.98 -> 1` |
| submitting | button disabled/loading | subtle opacity, no loop over 2s |
| success | success message appears | fade/slide 6px |
| error | error text appears | one restrained shake or no motion |

Recommended error shake:

```css
@keyframes input-nudge {
  0%, 100% { transform: translateX(0); }
  35% { transform: translateX(-4px); }
  70% { transform: translateX(4px); }
}

.waitlist-field[data-state="error"] {
  animation: input-nudge 180ms var(--w-ease-exit) both;
}
```

Do not shake if reduced motion is enabled.

---

## 15. Section Reveal Motion

Supporting sections may reveal softly.

Allowed:

- fade + 12px translate
- gentle stagger of cards by 40ms
- one-time reveal

Forbidden:

- scroll-jacking
- long parallax scenes
- animated shader backgrounds
- required animations to understand content
- section transitions longer than 500ms

```css
.reveal-card {
  opacity: 0;
  transform: translateY(12px);
}

.reveal-card[data-seen="true"] {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 260ms ease, transform 260ms var(--w-ease-standard);
}
```

---

## 16. Reduced Motion Policy

```ts
export function useWeldMotionPolicy() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 720px)");
    const sync = () => {
      setReducedMotion(motion.matches);
      setCompactMode(compact.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    compact.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      compact.removeEventListener("change", sync);
    };
  }, []);

  return {
    reducedMotion,
    compactMode,
    allowHeroEntrance: !reducedMotion,
    allowGlassHover: !reducedMotion && !compactMode,
    allowCardNudge: !reducedMotion,
    allowSpecularSweep: !reducedMotion && !compactMode
  };
}
```

CSS baseline:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

Reduced motion must preserve:

- selected role
- selected audience mode
- proof popover state
- signup validation state
- success/error messages
- focus movement to signup when Spark is selected

---

## 17. Performance Gates

- Animate transform and opacity only.
- Do not animate backdrop-filter values.
- Do not animate large blur layers.
- Do not loop specular highlights endlessly.
- Limit first-viewport reveal to one simple sequence.
- Avoid JS-driven mouse parallax unless explicitly needed and measured.
- Prefer CSS transitions over heavy animation libraries for this page.
- Respect mobile and low-power devices.

---

## 18. Agent Work Packages

### Package 1 — Motion token replacement

Replace cartoon spring/bounce tokens with glass motion tokens.

Acceptance:

- no bounce/squish/confetti defaults
- motion is subtle and fast

### Package 2 — Hero entrance

Implement reference-1 split hero entrance.

Acceptance:

- shell, card, copy, and CTA reveal within 700ms
- no heavy blur or text scramble

### Package 3 — Role and audience transitions

Wire role and audience mode state transitions.

Acceptance:

- content crossfades/slides cleanly
- toggle indicator glides
- role update is under 280ms perceived

### Package 4 — Signup states

Add accessible state transitions for signup.

Acceptance:

- valid, submitting, success, and error are visible
- no looping animation beyond short loading state

### Package 5 — Reduced motion pass

Implement motion policy and CSS fallback.

Acceptance:

- all interactions work with reduced motion
- no required information depends on animation

---

## 19. Codex Implementation Prompt

```text
Implement Stage 3 of the Weld liquid glass redesign.

Replace cartoon motion with premium liquid glass motion. Use short fade/slide/scale transitions, subtle glass hover lift, a gliding audience toggle, and clean crossfades for role changes. Do not use bouncy sticker motion, confetti, dramatic Spark bursts, boot/compile animations, typing effects, or scroll-jacked scenes.

The reference 1 split hero should reveal calmly: shell first, then card, copy, and CTA, all within about 700ms. Role changes should crossfade card content in under 280ms. Signup state changes must be clear and accessible.

Add reduced-motion behavior, avoid animating backdrop-filter, and keep work frontend-only.

Return files changed, motion tokens added, old motion removed, state transitions wired, accessibility notes, performance notes, and deviations.
```

---

## 20. Review Prompt

```text
Review Stage 3.

Reject if motion feels cartoonish, bouncy, game-like, slow, or technical. Reject if animations hide state changes, if reduced motion loses functionality, or if the page animates blur/backdrop-filter heavily.

Approve only if the page feels calm, premium, responsive, and readable while preserving all dynamic hero, card, mode, and signup interactions.
```

---

## 21. Final Handoff Checklist

- [ ] Motion tokens are premium and restrained.
- [ ] Hero reveal is calm and fast.
- [ ] Glass hover is subtle.
- [ ] Audience toggle glides cleanly.
- [ ] Role changes update card content without bounce.
- [ ] Card actions provide text/status feedback.
- [ ] Proof popovers are accessible.
- [ ] Signup states are visible and restrained.
- [ ] Reduced motion works.
- [ ] No cartoon/sticker/terminal motion remains.
