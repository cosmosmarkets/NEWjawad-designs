# Weld Stage 1 — Liquid Glass Visual Identity System

**Stage focus:** Replace the previous 2D cartoony direction with a cleaner, premium, black-and-white liquid glass identity for the dynamic Weld landing page, hero, and signup flow.

**Audience:** Codex, Claude Code, frontend engineers, designers, reviewers.

**Scope:** Frontend visual system only. This stage defines tokens, surfaces, glass behavior, monochrome color usage, hierarchy, trust signals, and visual guardrails for the new landing page.

---

## 00. Core Oath

This stage must not make the cartoon direction more polished.

It must reset Weld into a cleaner, calmer, more premium landing page that feels like:

- liquid glass
- black and white first
- high-trust
- developer-first
- crisp and spacious
- soft, layered, and modern
- centered around one strong split hero
- built for a dynamic hero card and early-access signup

The target reference is **layout 1: Split hero** from the attached landing-page concepts. The large talent card sits on one side, the value proposition sits on the other, both inside a rounded glass shell.

If the page still feels cartoony, sticker-heavy, doodled, childish, terminal-like, Discord-like, or like a generic SaaS dashboard, the implementation fails.

---

## 01. Executive Objective

Weld is moving from a playful 2D card style into a premium liquid glass interface.

The page should still communicate the same product idea:

> Weld turns Roblox work, rate, availability, links, and proof into swipeable talent cards studios can trust.

But the emotional target changes.

The new visual system should feel:

1. clean enough for studios to trust
2. sharp enough for developers to want a card
3. calm enough to scan instantly
4. premium without becoming corporate
5. dynamic without looking like a dashboard
6. glassy without becoming blurry or low-contrast

The hero should clearly prioritize:

- the profile/talent card
- the short product explanation
- developer/studio mode
- proof and availability
- signup/join CTA

---

## 02. What This Stage Owns

Stage 1 owns:

- global visual tokens
- monochrome palette
- controlled accent palette
- liquid glass surface model
- background system
- talent card surface rules
- nav glass rules
- CTA visual hierarchy
- proof/status color rules
- focus and contrast rules
- black/white brand usage
- forbidden visual patterns
- agent-safe token naming

It does **not** own:

- final copy
- component architecture
- animation timing
- backend waitlist submission
- database/auth logic
- final production images

---

## 03. Major Direction Change

### Previous cartoon direction

The old five-stage system used:

- bright playful accents
- doodle notes
- thick ink outlines
- sticker badges
- chunky card shadows
- toy-like physical motion
- whimsical polish

### New liquid glass direction

The new system uses:

- black and white as the primary color scheme
- soft blue/lilac glass refraction only as ambience
- thin translucent borders
- layered frosted surfaces
- rounded capsules and panels
- subtle depth shadows
- clean proof chips
- crisp typography
- minimal ornamentation

### Review rule

A reviewer should say:

> This feels like a premium liquid-glass talent network for Roblox.

Not:

> This feels like a cartoon marketplace, a developer dashboard, or a terminal.

---

## 04. Visual Principles

### 1. Monochrome first

Black, white, and near-neutral grey own the interface. Accents are supportive, not decorative.

### 2. Glass must improve hierarchy

Use glass to separate layers, not to blur everything. The main card and headline must remain highly legible.

### 3. Reference layout 1 is canonical

The default desktop hero is a split composition:

- left: talent/profile card preview
- right: headline, subhead, proof sentence, CTA
- both inside a large rounded glass hero shell
- nav floats above or inside the shell as a glass capsule

### 4. Premium, not sterile

The page should be clean, but not empty. Use soft gradients, gentle depth, and subtle specular highlights to keep it alive.

### 5. Trust through clarity

Avoid fake numbers, fake logos, fake volume, or algorithmic overclaims. Proof, rate, availability, and links should feel concrete.

---

## 05. Canonical Liquid Glass Tokens

Use this as the starting token set. Tune values after visual QA, but keep the semantic roles intact.

```css
:root {
  /* Page foundations */
  --w-bg-page: #f6f8ff;
  --w-bg-page-2: #eef2ff;
  --w-bg-ink: #05070c;
  --w-bg-white: #ffffff;
  --w-bg-soft: rgba(255, 255, 255, 0.62);
  --w-bg-mist: rgba(246, 248, 255, 0.74);

  /* Text */
  --w-ink: #070912;
  --w-ink-soft: #343849;
  --w-ink-muted: #687083;
  --w-ink-faint: #98a1b3;
  --w-white: #ffffff;
  --w-white-soft: rgba(255, 255, 255, 0.74);

  /* Glass surfaces */
  --w-glass-bg: rgba(255, 255, 255, 0.56);
  --w-glass-bg-strong: rgba(255, 255, 255, 0.76);
  --w-glass-bg-soft: rgba(255, 255, 255, 0.34);
  --w-glass-dark: rgba(7, 9, 18, 0.82);
  --w-glass-border: rgba(255, 255, 255, 0.72);
  --w-glass-border-soft: rgba(15, 23, 42, 0.08);
  --w-glass-inner: inset 0 1px 0 rgba(255, 255, 255, 0.72);
  --w-glass-blur: 24px;
  --w-glass-blur-strong: 36px;

  /* Premium neutral borders */
  --w-border-strong: rgba(7, 9, 18, 0.12);
  --w-border-soft: rgba(7, 9, 18, 0.07);
  --w-border-white: rgba(255, 255, 255, 0.72);

  /* Controlled accents */
  --w-accent: #5965ff;
  --w-accent-soft: rgba(89, 101, 255, 0.12);
  --w-accent-glow: rgba(89, 101, 255, 0.24);
  --w-success: #10b981;
  --w-success-soft: rgba(16, 185, 129, 0.12);
  --w-warning: #f59e0b;
  --w-error: #ef4444;

  /* CTA */
  --w-cta-bg: #070912;
  --w-cta-bg-hover: #151927;
  --w-cta-text: #ffffff;
  --w-cta-secondary-bg: rgba(255, 255, 255, 0.58);
  --w-cta-secondary-text: #111827;

  /* Shadows */
  --w-shadow-shell: 0 34px 90px rgba(28, 37, 69, 0.16);
  --w-shadow-card: 0 24px 70px rgba(32, 40, 72, 0.18);
  --w-shadow-float: 0 14px 42px rgba(32, 40, 72, 0.14);
  --w-shadow-dark: 0 28px 90px rgba(5, 7, 12, 0.24);

  /* Radii */
  --w-radius-xs: 10px;
  --w-radius-sm: 14px;
  --w-radius-md: 20px;
  --w-radius-lg: 28px;
  --w-radius-xl: 36px;
  --w-radius-shell: 42px;
  --w-radius-pill: 999px;

  /* Layout */
  --w-max: 1180px;
  --w-section-pad-x: clamp(18px, 4vw, 44px);
  --w-section-pad-y: clamp(72px, 10vw, 124px);
}
```

---

## 06. Color Roles

| Token | Job | Use it for | Do not use it for |
|---|---|---|---|
| `--w-bg-page` | page base | body, section backgrounds | card interiors only |
| `--w-ink` | primary text | headline, nav, card names | muted metadata |
| `--w-glass-bg` | main frosted surface | hero shell, nav, secondary cards | dark CTA |
| `--w-glass-bg-strong` | readable frosted panels | talent card, form shell | background decoration |
| `--w-glass-dark` | dark premium contrast | optional dark footer or black CTA card | full page by default |
| `--w-accent` | subtle Weld signal | selected mode, verified dot, focus ring | every button |
| `--w-success` | availability/success | available status, success check | primary CTA |
| `--w-cta-bg` | strongest action | Join as developer, Save my spot | passive tags |
| `--w-error` | validation errors | invalid email, destructive state | like/reject decoration |

---

## 07. Background System

The page background should feel luminous and clean, not colorful.

Recommended:

```css
body {
  min-height: 100vh;
  background:
    radial-gradient(circle at 8% 10%, rgba(89, 101, 255, 0.10), transparent 28%),
    radial-gradient(circle at 88% 12%, rgba(255, 255, 255, 0.92), transparent 24%),
    radial-gradient(circle at 78% 86%, rgba(160, 174, 255, 0.18), transparent 32%),
    linear-gradient(180deg, #f7f9ff 0%, #eef2ff 54%, #f7f8fb 100%);
  color: var(--w-ink);
}
```

Allowed ambient elements:

- one or two soft radial blooms
- one subtle liquid highlight behind the hero card
- low-opacity mesh wash
- very soft noise at `opacity: .02` if needed

Forbidden:

```css
body { background: #090807; }
body { background: linear-gradient(135deg, red, orange, pink); }
```

Do not recreate the old ember/dark static landing page as the main background. The old page can inform copy and audience modes, not the visual surface.

---

## 08. Liquid Glass Surface Model

### Glass shell

Use for the main hero wrapper, nav shell, and large signup card.

```css
.glass-shell {
  background: linear-gradient(135deg, rgba(255,255,255,.78), rgba(255,255,255,.38));
  border: 1px solid var(--w-glass-border);
  box-shadow: var(--w-shadow-shell), var(--w-glass-inner);
  backdrop-filter: blur(var(--w-glass-blur)) saturate(1.18);
  -webkit-backdrop-filter: blur(var(--w-glass-blur)) saturate(1.18);
  border-radius: var(--w-radius-shell);
}
```

### Inner glass card

Use for talent card sections, stat pills, link cells, and proof chips.

```css
.glass-card {
  background: linear-gradient(180deg, rgba(255,255,255,.84), rgba(255,255,255,.58));
  border: 1px solid rgba(255,255,255,.78);
  box-shadow: var(--w-shadow-card), inset 0 1px 0 rgba(255,255,255,.86);
  backdrop-filter: blur(20px) saturate(1.12);
  border-radius: var(--w-radius-xl);
}
```

### Glass pill

Use for nav toggles, tabs, chips, and metadata.

```css
.glass-pill {
  background: rgba(255,255,255,.62);
  border: 1px solid rgba(255,255,255,.72);
  border-radius: var(--w-radius-pill);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.80), 0 8px 24px rgba(32,40,72,.08);
  backdrop-filter: blur(16px) saturate(1.08);
}
```

### Specular highlight

Every large glass surface may have one highlight only.

```css
.glass-shell::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255,255,255,.72), transparent 36%);
  opacity: .58;
  pointer-events: none;
}
```

Rules:

- Use glass mostly on larger containers and important controls.
- Avoid applying blur to dozens of tiny elements.
- Text must sit on a sufficiently opaque layer.
- Do not stack more than two blurred layers in the same visual area.

---

## 09. Reference 1 Hero Visual Rules

Reference layout 1 is the default desktop hero.

Required qualities:

- split layout inside one rounded hero shell
- talent/profile card on the left
- hero copy on the right
- Weld logo and nav inside/above glass shell
- mode toggle appears as a small glass segmented control
- CTA is black/white, not colorful
- card shadow is soft and premium
- edge highlights make the shell feel liquid

Suggested desktop layout:

```css
.hero-shell {
  max-width: var(--w-max);
  margin: 0 auto;
  min-height: min(690px, calc(100vh - 120px));
  display: grid;
  grid-template-columns: minmax(420px, .95fr) minmax(360px, .9fr);
  gap: clamp(28px, 5vw, 64px);
  align-items: center;
  padding: clamp(24px, 4vw, 46px);
}
```

Hero failure cases:

- card is smaller than the copy and loses importance
- copy floats without a shared shell
- glass blur makes text fuzzy
- nav feels detached or like an admin toolbar
- CTA blends into other pills
- card uses thick cartoon borders

---

## 10. Talent Card Surface Rules

The talent card is still the product object. It just becomes cleaner and glassier.

Required look:

- white/glass card face
- 28-36px radius
- fine translucent border
- subtle inner highlight
- soft shadow below
- clear section hierarchy
- compact but readable stat pills
- one accent color at most

Recommended:

```css
.talent-card {
  position: relative;
  background:
    linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.66));
  border: 1px solid rgba(255,255,255,.82);
  border-radius: 34px;
  box-shadow:
    0 30px 80px rgba(31, 41, 55, .18),
    inset 0 1px 0 rgba(255,255,255,.90);
  backdrop-filter: blur(24px) saturate(1.12);
}
```

Talent card sections:

- top proof row
- avatar/name/status row
- short summary
- stat pills
- service chips
- links row
- rate box

Do not include:

- heavy doodles
- thick ink borders
- fake Studio UI
- fake terminal lines
- overwhelming gradients

---

## 11. CTA System

The primary CTA should be the darkest object in the hero, matching the black-and-white scheme.

Primary CTA:

```css
.button-primary {
  background: #070912;
  color: #fff;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: var(--w-radius-pill);
  box-shadow: 0 18px 40px rgba(7, 9, 18, .20);
}
```

Secondary CTA:

```css
.button-secondary {
  background: rgba(255,255,255,.62);
  color: #111827;
  border: 1px solid rgba(255,255,255,.78);
  border-radius: var(--w-radius-pill);
  backdrop-filter: blur(16px);
}
```

CTA hierarchy:

1. `Join as a developer` / `Save my spot` — black primary
2. `Learn more` — white glass secondary
3. link-style tertiary actions — low emphasis

Avoid orange/coral as the main CTA in the new direction unless specifically requested later.

---

## 12. Proof, Availability, and Trust Colors

Because the scheme is black and white, proof/status accents must be tiny and meaningful.

- Verified/proof: black text + blue/lilac icon/dot
- Available: green dot + text
- Rate: soft lavender/white glass bubble
- Links: black icons/text on white glass cells
- Errors: red outline and text only where needed
- Success: green icon/text, not a full green panel

Example:

```css
.status-available::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--w-success);
  box-shadow: 0 0 0 4px var(--w-success-soft);
}
```

---

## 13. Accessibility Gates

- Body text must meet WCAG contrast.
- Glass surfaces behind text must be opaque enough for readability.
- Focus rings must be visible on both white glass and dark CTA surfaces.
- Buttons must not rely on color alone.
- Success/error states need text and icon cues.
- Do not use tiny uppercase labels for important information.
- Reduce transparency if the user has contrast preferences enabled.

Focus example:

```css
:where(a, button, input, select, textarea):focus-visible {
  outline: 3px solid rgba(89,101,255,.78);
  outline-offset: 3px;
}
```

High contrast fallback:

```css
@media (prefers-contrast: more) {
  :root {
    --w-glass-bg: rgba(255,255,255,.92);
    --w-glass-bg-strong: rgba(255,255,255,.98);
    --w-glass-border-soft: rgba(7,9,18,.22);
  }
}
```

---

## 14. Performance Gates

Liquid glass can get expensive. Keep it restrained.

- No full-screen animated shader canvas.
- No full-page blur layer.
- Avoid animated backdrop-filter values.
- Limit blurred glass panels in the first viewport.
- Prefer static gradients over moving gradients.
- Use transform/opacity for motion.
- Keep the hero lightweight on mobile.
- Disable or reduce blur on low-power layouts if needed.

Mobile fallback:

```css
@media (max-width: 720px) {
  .glass-shell,
  .glass-card,
  .glass-pill {
    backdrop-filter: blur(14px) saturate(1.05);
    -webkit-backdrop-filter: blur(14px) saturate(1.05);
  }
}
```

---

## 15. Forbidden Patterns

Reject any implementation that introduces:

- cartoon doodle systems as the main visual language
- thick black ink outlines
- sticker-heavy decorations
- dark terminal dashboards
- fake Output logs
- LuaU editor panels
- Discord dark-mode blocks as primary sections
- neon/cyberpunk glow
- orange/coral dominant background from the old static page
- rainbow role colors
- excessive blur that weakens readability
- official Roblox logos or official-looking verification marks
- fake endorsements or fake traction

---

## 16. Agent Work Packages

### Package 1 — Token replacement

Replace cartoon tokens with liquid glass tokens.

Acceptance:

- page is black/white/neutral first
- glass shell and card tokens exist
- CTA is black/white
- accent use is minimal

### Package 2 — Hero surface system

Build the reference-1 split hero shell.

Acceptance:

- card left, copy right on desktop
- shared rounded glass shell exists
- nav/toggle feel integrated
- no cartoon borders/shadows remain

### Package 3 — Talent card glass treatment

Convert profile card into a premium glass object.

Acceptance:

- profile card is the dominant object
- text is clear
- stat/link/rate chips are readable
- card does not look like a dashboard panel

### Package 4 — Accessibility and contrast pass

Review all glass surfaces.

Acceptance:

- focus states visible
- important text passes contrast
- success/error states are not color-only
- high-contrast fallback exists

---

## 17. Codex Implementation Prompt

```text
Implement Stage 1 of the Weld liquid glass redesign.

Replace the previous cartoon visual system with a clean black-and-white liquid glass identity. Use the attached reference layout 1 as the hero target: a split hero with a large talent card on one side and copy/CTA on the other inside a rounded frosted-glass shell.

Create CSS tokens for page foundations, glass surfaces, monochrome text, translucent borders, subtle blue/lilac accents, black primary CTA, success/error states, shadows, and radii. Remove thick cartoon outlines, doodle/sticker-heavy styling, orange/coral dominant backgrounds, terminal/dashboard visuals, and fake Studio/Discord UI.

Keep all important text readable on glass. Add focus, contrast, and reduced-transparency fallbacks. Keep work frontend-only.

Return files changed, tokens added, old visual patterns removed, accessibility notes, performance notes, and visual deviations from reference 1.
```

---

## 18. Review Prompt

```text
Review Stage 1.

Reject if the page still feels cartoony, terminal-like, Studio-like, Discord-like, or generic SaaS. Reject if the hero is not a split glass shell with the profile card as a dominant object. Reject if glass blur reduces readability, if the CTA is not clearly primary, or if the page uses rainbow/playful accents instead of a black-and-white scheme.

Approve only if the first viewport feels like a premium liquid-glass Roblox talent network with clear hero hierarchy and a trustworthy signup path.
```

---

## 19. Final Handoff Checklist

- [ ] Black-and-white scheme is primary.
- [ ] Liquid glass tokens exist and are used consistently.
- [ ] Reference 1 split hero is the default desktop layout.
- [ ] Talent card is visually dominant.
- [ ] CTA is black, clear, and high-priority.
- [ ] Proof/status accents are small and semantic.
- [ ] Glass does not reduce readability.
- [ ] Mobile blur is controlled.
- [ ] No cartoon doodle/sticker system remains as primary language.
- [ ] No terminal/Studio/Discord/dashboard aesthetic remains.
