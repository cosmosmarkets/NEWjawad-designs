# Weld Stage 5 — Liquid Glass Polish + Conversion System

**Stage focus:** Add final premium polish, liquid glass details, proof trust refinements, responsive finishing, and early-access conversion improvements to the Weld landing page.

**Audience:** Codex, Claude Code, frontend engineers, designers, product leads, conversion reviewers, QA.

**Scope:** Frontend-only polish, glass highlights, trust details, hero screenshot quality, signup conversion, mobile finish, accessibility, performance, brand safety, and launch QA.

---

## 00. Core Oath

Polish must make Weld feel more premium, clearer, and easier to join.

If polish makes the page busier, blurrier, slower, more cartoonish, less readable, or less trustworthy, remove it.

The final page should feel:

- clean
- premium
- liquid glass
- black and white
- trustworthy
- screenshot-worthy
- conversion-ready
- Roblox-specific but not Roblox-branded

---

## 01. Executive Objective

Stage 5 is the final layer that turns the liquid glass direction into a shippable page.

The previous polish direction used doodles, stickers, and playful card motifs. The new polish direction uses:

- glass edge highlights
- specular glints
- controlled shadow depth
- proof microcopy
- refined card anatomy
- premium status chips
- clean mobile stacking
- clear early-access CTA states

The goal is not decoration. The goal is trust, clarity, and conversion.

---

## 02. What This Stage Owns

Stage 5 owns:

- glass highlight system
- subtle background depth
- proof/status chip polish
- talent card detail polish
- link and rate cell polish
- final signup CTA polish
- success/error visual finish
- mobile finishing pass
- accessibility audit
- performance audit
- brand safety audit
- launch QA checklist

It does **not** own:

- backend waitlist submission
- authentication
- official Roblox integrations
- real marketplace data
- fake testimonials
- fake traction or public volume

---

## 03. Polish Principles

### 1. Polish should clarify hierarchy

A highlight should help identify the primary surface, not become decoration.

### 2. Glass must remain readable

If text sits on glass, the layer behind it must be opaque enough.

### 3. Trust beats spectacle

Use proof labels, honest preview copy, and clear states over flashy effects.

### 4. Conversion stays central

The final CTA and hero CTA should be easy to find, easy to understand, and easy to use.

### 5. Mobile is designed, not compressed

Mobile must preserve the hero, role switching, proof inspection, and signup.

---

## 04. Glass Highlight System

Liquid glass needs highlights, but only a few.

### Highlight types

```ts
type GlassHighlight =
  | "edge"
  | "corner-bloom"
  | "specular-line"
  | "inner-stroke"
  | "ambient-refraction";
```

### Recommended usage

- hero shell: edge highlight + corner bloom
- talent card: inner stroke + soft top highlight
- nav: subtle inner stroke
- signup card: edge highlight + soft ambient bloom
- buttons: tiny top highlight only

### CSS example

```css
.liquid-edge {
  position: relative;
  overflow: hidden;
}

.liquid-edge::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background:
    linear-gradient(135deg, rgba(255,255,255,.78), transparent 34%),
    radial-gradient(circle at 18% 0%, rgba(255,255,255,.58), transparent 28%);
  pointer-events: none;
  opacity: .68;
}

.liquid-edge::after {
  content: "";
  position: absolute;
  left: 12%;
  right: 12%;
  top: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.92), transparent);
  pointer-events: none;
}
```

Rules:

- Do not animate all highlights.
- Do not place highlights over text.
- Hide complex highlights on small mobile.
- Never use highlights as the only way to show state.

---

## 05. Proof and Status Chip Polish

Chips should look premium and readable.

### Chip types

| Chip | Meaning | Visual |
|---|---|---|
| Verified | proof can be checked or linked | white glass chip, black text, small accent icon |
| Available | open to work | green dot + neutral text |
| Linked work | work links exist | white glass chip, link icon |
| Rate visible | rate shown before messaging | neutral glass chip |
| Preview card | illustrative example | small muted label |

### Safe badge copy

Use:

- Verified
- Proof checked
- Linked work
- Rate visible
- Availability shown
- Preview card
- Example profile

Avoid:

- Roblox Verified
- Certified by Roblox
- Official Roblox talent
- Roblox-approved
- Guaranteed match
- Top 1% talent

### Component contract

```tsx
type ProofChipProps = {
  label: string;
  tone: "neutral" | "verified" | "available" | "info" | "warning";
  tooltip?: string;
  isPreview?: boolean;
};
```

Rules:

- label must be readable at mobile sizes
- tooltip must be keyboard/touch accessible
- no color-only state
- no official-looking checkmark if it implies Roblox endorsement

---

## 06. Talent Card Polish

The hero card should feel like the product, not a decoration.

### Required finish

- glass card with strong readability
- avatar block aligned with name/status
- verified chip visible but not oversized
- stat pills equal height
- service chips wrap cleanly
- rate bubble has clear hierarchy
- links row uses consistent cells
- card content aligns to a grid

### Recommended structure

```tsx
<HeroTalentCard>
  <CardTopRow>
    <ProofChip label="Verified" />
    <RoleChip label={role.label} />
  </CardTopRow>
  <IdentityRow>
    <Avatar />
    <NameBlock />
    <Availability />
  </IdentityRow>
  <StatsGrid />
  <Summary />
  <Services />
  <RateAndLinks />
</HeroTalentCard>
```

### Card microcopy polish

- Use `Roblox scripter`, not `Scripter / UI Designer / Systems / PRO`.
- Use `Available for work`, not `Hiring Now` for developer profiles.
- Use `Hourly or milestone`, not vague rate notes.
- Use `Linked work`, not fake project counts unless real.

---

## 07. Match / Fit Signal Polish

If a match or fit signal is present, keep it honest.

Safe labels:

- Strong fit preview
- Studio fit preview
- Role match preview
- Good for systems work

Avoid:

- guaranteed match
- verified algorithmic fit
- scientifically ranked
- exact score if not real

If a meter is used:

```html
<div role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="92" aria-label="92 percent fit preview">
```

Rules:

- use `preview` when based on mock data
- mobile meter should be horizontal inside the card
- no pulsing meter animation

---

## 08. Link and Rate Row Polish

The reference card uses visible links and rate cells. These should be crisp.

### Links row

Recommended labels:

- Roblox
- Discord
- X
- GitHub
- Portfolio
- Figma

Rules:

- use readable labels and icon aria-labels
- links can be placeholder anchors in reference build
- no broken-looking mock URLs
- no dark Discord-like row

### Rate row

Recommended:

- label: `Rate`
- value: `$65/hr`
- note: `Hourly or milestone`

Rules:

- rate must be visually easy to scan
- do not hide rate behind hover
- if rate is optional, add copy: `Rate can be hidden or milestone-based.`

---

## 09. Waitlist Conversion Polish

The signup CTA should feel like an invitation to early access.

### Final CTA layout

- large glass card
- short headline
- mode-aware tabs or selected mode chip
- visible email label
- email field
- black primary button
- privacy note
- success/error message area

### Strong copy options

Developer:

- Build your Weld card early.
- Join as a developer.
- Get first access to talent cards.

Studio:

- Scout talent early.
- Join as a studio.
- Get hiring access.

Neutral:

- Get early access to Weld.
- Save my spot.

### Success state

Use:

> Spot saved. We’ll send the next step soon.

Avoid:

- confetti
- fake waitlist position
- “You are founder #241” unless true

### Privacy microcopy

Use:

> No spam. Just launch updates and early access.

---

## 10. Trust and Honesty Rules

Do not fake:

- user activity
- waitlist size
- marketplace volume
- testimonials
- client logos
- Roblox endorsement
- algorithmic ranking accuracy
- studio demand
- revenue/visits unless real or clearly illustrative

Allowed:

- `Preview card`
- `Example profile`
- `Sample proof`
- `Early access`
- `Linked work preview`
- `Client notes preview`

Honest section copy:

> These are example cards showing the profile format Weld is building. Real proof and feedback appear after cards are connected and checked.

---

## 11. Mobile Polish System

Mobile must feel intentionally designed.

### Mobile requirements

- hero shell stacks cleanly
- headline remains readable
- talent card fills width comfortably
- glass blur reduced
- role chips scroll horizontally
- primary CTA appears early
- proof popovers fit viewport
- signup card remains visible and usable
- no horizontal overflow

### Mobile simplifications

Hide or reduce:

- complex edge highlights
- secondary decorative blooms
- extra glass layers
- side-by-side link grids if cramped
- nonessential action buttons if CTA needs priority

Keep:

- audience toggle
- role selection
- profile card
- proof/status chips
- rate and links
- signup form

---

## 12. Screenshot-Grade Hero Checklist

The first viewport should contain:

- Weld logo/nav
- developer/studio toggle
- large split glass hero shell
- dominant talent card
- headline: `The talent network for Roblox.` or approved variant
- short subhead
- primary CTA
- secondary CTA or learn more
- proof/verified chip
- availability status
- rate and links on the card

It should not contain:

- dense paragraphs
- dark dashboards
- code/terminal UI
- cartoon doodles
- sticker clutter
- ambiguous abstract art
- fake testimonials or stats

Reviewer question:

> Would someone understand Weld from a screenshot of the hero alone?

If no, fix the hero before polishing lower sections.

---

## 13. Brand Safety

Weld can be Roblox-specific without impersonating Roblox.

Use:

- Roblox talent
- Roblox developers
- Roblox teams
- Roblox games
- linked Roblox work
- proof checked

Avoid:

- official Roblox logo unless legally approved
- Roblox Verified
- official-looking verification marks
- implying partnership
- copying Roblox UI assets
- using Roblox red/brand palette as Weld’s visual identity

---

## 14. Accessibility Polish

- Glass surfaces behind text must have enough opacity.
- Proof popovers must be accessible by click, keyboard, and touch.
- Escape closes popovers/modals.
- Form errors connect with `aria-describedby`.
- Success/error messages are text, not color-only.
- Card actions are buttons.
- Toggle tabs use `aria-pressed` or tab semantics.
- Match/fit meter uses `role="meter"` if implemented.
- Do not rely on hover-only states.
- Provide high-contrast fallback for translucent surfaces.

---

## 15. Performance Polish

- Limit `backdrop-filter` to major surfaces.
- Avoid animating blur/backdrop-filter.
- Avoid heavy shadows on dozens of cards.
- Use transform/opacity for animation.
- Do not animate background gradients continuously.
- Avoid full-screen canvas or shader backgrounds.
- Use optimized image assets.
- Reduce blur and highlights on mobile.
- Keep font budget lean.

Suggested font budget:

- one display/body family if possible
- 2-3 weights total
- no decorative font
- no heavy icon font if inline SVGs are enough

---

## 16. Final QA Rubric

| Area | Pass | Fail |
|---|---|---|
| Hero clarity | product clear in screenshot | user must scroll deeply |
| Style | premium liquid glass | cartoon/dashboard/terminal |
| Color | black and white first | rainbow/coral-heavy |
| Card | dominant and readable | small or decorative |
| Waitlist | CTA obvious and accessible | generic newsletter form |
| Proof | honest and labeled | fake claims/endorsement |
| Motion | calm and responsive | bouncy/slow/scroll-jacked |
| Mobile | designed and interactive | cramped static stack |
| Accessibility | keyboard/touch readable | hover/color-only states |
| Performance | light glass use | heavy blur/canvas/runtime |

---

## 17. Launch Copy Audit

Before launch, search for and remove:

- unlock opportunities
- empower
- seamless platform
- all-in-one solution
- revolutionary
- next-generation
- output
- compile
- boot
- command
- terminal
- LuaU editor
- Studio-native
- Roblox Verified
- certified by Roblox
- guaranteed match
- top 1% unless true

Approved language:

- talent card
- proof
- linked work
- services
- rate
- availability
- Spark
- early access
- studios
- Roblox teams
- Roblox developers
- Discord chaos
- proof before the first message

---

## 18. Agent Work Packages

### Package 1 — Glass highlight system

Add reusable edge, inner stroke, and specular highlight utilities.

Acceptance:

- hero shell and card feel liquid glass
- highlights do not reduce readability
- mobile simplification exists

### Package 2 — Proof/status polish

Refine proof, availability, linked work, and rate chips.

Acceptance:

- copy is brand-safe
- chips are readable
- tooltips accessible

### Package 3 — Talent card polish

Make the hero card screenshot-grade.

Acceptance:

- card is dominant
- sections align cleanly
- rate/links/stat chips scan quickly

### Package 4 — Signup conversion pass

Polish final signup card and states.

Acceptance:

- visible label
- black primary CTA
- privacy note
- success/error states
- no fake waitlist number

### Package 5 — Mobile polish

Remove clutter and reduce expensive effects.

Acceptance:

- no overflow
- role/mode/signup interactions preserved
- glass remains readable

### Package 6 — Final audit

Run copy, accessibility, performance, and brand-safety review.

Acceptance:

- no old cartoon/terminal/Studio language remains
- no fake claims
- launch checklist passes

---

## 19. Codex Implementation Prompt

```text
Implement Stage 5 of the Weld liquid glass redesign.

Add final polish for a premium black-and-white liquid glass landing page. Refine glass edge highlights, hero shell depth, talent card readability, proof/status chips, link and rate rows, and the waitlist signup card. The reference 1 split hero should be screenshot-grade.

Do not add cartoon doodles, sticker clutter, confetti, fake testimonials, fake marketplace volume, fake waitlist counts, or official Roblox claims. Keep proof honest and label mock data as preview/example where needed.

Mobile must preserve audience mode, role selection, profile card, proof chips, rate/links, and signup. Reduce blur/highlights on mobile. Keep animations lightweight and respect reduced motion.

Return files changed, polish added, accessibility notes, performance notes, brand-safety notes, and remaining launch risks.
```

---

## 20. Review Prompt

```text
Review Stage 5.

Reject if polish makes the page busier, blurrier, slower, more cartoonish, or less readable. Reject if proof badges imply official Roblox endorsement, if fake traction/testimonials appear, if the hero is not screenshot-grade, or if mobile loses core interactions.

Approve only if the page feels premium, liquid-glass, black-and-white, honest, accessible, and clearly optimized for early-access signup.
```

---

## 21. Final Handoff Checklist

- [ ] Hero is screenshot-grade.
- [ ] Reference-1 split hero remains intact.
- [ ] Glass highlights are controlled.
- [ ] Talent card is readable and dominant.
- [ ] Proof/status chips are brand-safe.
- [ ] Rate and links row is polished.
- [ ] Final signup CTA is strong.
- [ ] Success/error states are accessible.
- [ ] Mobile is clean and interactive.
- [ ] No cartoon/sticker/doodle system remains as primary language.
- [ ] No terminal/Studio/dashboard language remains.
- [ ] No fake claims or Roblox endorsement implications remain.
- [ ] Performance and reduced-motion checks pass.
