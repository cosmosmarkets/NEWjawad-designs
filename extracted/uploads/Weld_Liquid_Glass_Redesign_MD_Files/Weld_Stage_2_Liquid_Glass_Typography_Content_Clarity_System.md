# Weld Stage 2 — Liquid Glass Typography + Content Clarity System

**Stage focus:** Rewrite the content and typography rules for a clean, premium, black-and-white liquid glass landing page with a dynamic hero and signup flow.

**Audience:** Codex, Claude Code, frontend engineers, designers, copy reviewers, product leads.

**Scope:** Frontend copy structure, typography scale, hero messaging, card labels, signup copy, role copy, audience-mode copy, information density, and anti-jargon rules.

---

## 00. Core Oath

This stage must make Weld understandable from a screenshot of the hero.

The page should read as:

- clean
- direct
- premium
- confident
- trustworthy
- developer-first
- studio-friendly
- Roblox-specific without pretending to be official Roblox

It should not read as:

- cartoony
- whimsical
- technical for its own sake
- terminal-like
- dashboard-like
- corporate SaaS filler
- generic waitlist language

---

## 01. Executive Objective

The old static page already had useful context: Weld is the talent network for Roblox, built around linking games, showing rates, and matching with studios that ship. Keep that product truth, but refine the language for the new cleaner visual direction.

The new page should explain in seconds:

1. Weld helps Roblox developers turn work, rates, links, and availability into a clean talent card.
2. Studios can scan proof before starting a conversation.
3. The dynamic hero previews exactly what a card will look like.
4. Signup is for early access, not a generic newsletter.
5. Developer and studio modes should change the framing without changing the core product.

---

## 02. What This Stage Owns

Stage 2 owns:

- typography tokens
- font recommendations
- headline system
- hero copy
- subhead copy
- audience-mode copy
- talent card labels
- stat labels
- proof and trust wording
- waitlist/signup states
- role copy config
- banned and replacement phrases
- content density rules
- accessibility copy requirements

It does **not** own:

- visual tokens
- component layout
- backend waitlist behavior
- animation curves
- final data model

---

## 03. Major Direction Change

### Previous cartoon language

The previous direction allowed:

- playful notes
- doodle labels
- sticker-style microcopy
- toy-like action language
- colorful role framing

### New liquid glass language

The new copy should use:

- short, polished product language
- simple nouns: card, proof, rate, availability, links
- direct developer/studio benefits
- restrained confidence
- minimal exclamation
- no childish phrasing

### New rule

If a line sounds like a cartoon annotation, fake developer console, or generic SaaS homepage, rewrite it.

---

## 04. Typography Tokens

Use clean modern type. Rounded can be used subtly, but avoid cartoon display fonts.

```css
:root {
  --w-font-display: "Outfit", "Inter", "SF Pro Display", system-ui, sans-serif;
  --w-font-body: "Inter", "Outfit", system-ui, sans-serif;
  --w-font-label: "Inter", "Outfit", system-ui, sans-serif;

  --w-type-hero: clamp(3.4rem, 7vw, 6.6rem);
  --w-type-section: clamp(2.2rem, 5vw, 4.2rem);
  --w-type-card-title: clamp(1.55rem, 2.5vw, 2.35rem);
  --w-type-subhead: clamp(1rem, 1.45vw, 1.18rem);
  --w-type-body: 1rem;
  --w-type-small: .875rem;
  --w-type-micro: .76rem;
  --w-type-chip: .76rem;
}
```

Recommended fonts:

- Display: Outfit, Inter Display, SF Pro Display, Geist, Satoshi, Avenir Next
- Body: Inter, Outfit, Geist, system sans
- Avoid: Baloo, Fredoka, handwritten fonts, heavy serif display, dense monospace

Typography behavior:

- headline: large and tight
- body: clear and restrained
- card labels: small but readable
- nav: compact, not tiny
- CTA: sentence case or clean title case, not aggressive all-caps

---

## 05. Hero Messaging System

The hero must be built around reference layout 1.

Recommended default hero:

**Headline:**

> The talent network for Roblox.

**Subhead:**

> Link your games, set your rate, and match with studios that actually ship.

**Support line:**

> Weld turns shipped work, availability, links, and proof into swipeable talent cards studios can trust.

**Primary CTA:**

> Join as a developer

**Secondary CTA:**

> Learn more

This keeps the old static page's strongest proposition but makes it cleaner and better aligned with the new hero.

---

## 06. Alternate Hero Copy Options

Use these if the team wants to test variants.

### Option A — strongest product clarity

Headline:

> The talent network for Roblox.

Subhead:

> Build a clean proof card with your work, rate, availability, and links.

CTA:

> Join as a developer

### Option B — developer-first

Headline:

> Turn Roblox work into a card studios can trust.

Subhead:

> Weld shows your shipped games, rate, availability, links, and proof in one clean profile.

CTA:

> Build my card

### Option C — studio-first

Headline:

> Scout Roblox talent without Discord chaos.

Subhead:

> See role, rate, availability, links, and proof before the first message.

CTA:

> Join as a studio

### Option D — short and premium

Headline:

> Roblox talent, made clear.

Subhead:

> Talent cards for developers and studios that want proof before the conversation.

CTA:

> Get early access

---

## 07. Audience Mode Copy

The page should support Developer and Studio modes. Mode changes should update copy, CTA labels, and card framing, but not create two separate products.

```ts
export const audienceCopy = {
  developer: {
    tab: "I'm a developer",
    headline: "The talent network for Roblox.",
    subhead: "Link your games, set your rate, and match with studios that actually ship.",
    support: "Your card shows the proof studios ask for anyway: work, rate, availability, links, and notes.",
    primaryCta: "Join as a developer",
    secondaryCta: "Learn more",
    signupHeadline: "Build your Weld card early.",
    signupSubhead: "Get early access to the developer card studios will scan before they Spark."
  },
  studio: {
    tab: "I'm a studio",
    headline: "Scout Roblox talent with proof up front.",
    subhead: "Scan rate, availability, shipped work, links, and notes before you message.",
    support: "Weld turns scattered profiles and Discord posts into clean cards your team can review quickly.",
    primaryCta: "Join as a studio",
    secondaryCta: "See the card",
    signupHeadline: "Scout talent early.",
    signupSubhead: "Get access to the first cards built for Roblox teams that ship."
  }
};
```

Rules:

- Developer mode emphasizes building a card and getting seen.
- Studio mode emphasizes scanning proof and reducing Discord noise.
- Do not make Studio mode feel like an enterprise dashboard.
- Do not make Developer mode sound like a job board profile.

---

## 08. Talent Card Copy Anatomy

The hero talent card should read like a premium product card, not a playful trading card.

Required labels:

- Verified
- Available for work
- Experience
- Projects
- Reliability
- Rate
- Services
- Links
- Latest project
- Client notes

Recommended example card copy:

```ts
export const heroProfile = {
  name: "Eclipse",
  handle: "@EclipseDev",
  title: "Roblox scripter",
  availability: "Available for work",
  verified: "Verified",
  summary: "Builds clean Roblox systems, ships fast, and shows real proof of work.",
  stats: [
    { label: "Experience", value: "3+ yrs" },
    { label: "Projects", value: "Linked work" },
    { label: "Reliability", value: "On-time notes" }
  ],
  rate: "$65/hr",
  rateNote: "Hourly or milestone",
  services: ["Lua", "Roblox API", "Remote Events", "Data Stores", "Optimization", "Game Systems"],
  links: ["Roblox", "Discord", "X", "GitHub"]
};
```

Avoid:

- Top talent
- Hire amazing talent ✨
- Made 10+ games if not real
- 92% algorithmic match if not accurate
- Certified by Roblox
- Roblox Verified
- Official Roblox developer

---

## 09. Proof Wording

Proof should sound credible, not exaggerated.

Use:

- Verified
- Proof checked
- Linked work
- Portfolio linked
- Rate visible
- Availability shown
- Client notes
- Latest project
- Work samples
- Example profile
- Preview card

Avoid:

- Roblox Verified
- Official Roblox talent
- Certified developer
- Guaranteed match
- Scientifically ranked
- Top 1% talent
- Trusted by major studios unless true and approved

Tooltip copy examples:

```ts
export const proofTooltips = {
  verified: "This preview shows where checked proof and linked work will appear.",
  linkedWork: "Cards can include Roblox links, portfolios, GitHub, Discord, and project notes.",
  availability: "Availability is shown up front so studios know when to reach out.",
  rate: "Rates can be hourly, milestone-based, or hidden depending on the card owner."
};
```

---

## 10. Role Copy Config

Role copy should live in config and update the hero card dynamically.

```ts
export const roleCopy = {
  scripter: {
    label: "Scripter",
    title: "Roblox scripter",
    summary: "Builds clean game systems, reliable server logic, and scalable Roblox features.",
    services: ["Lua", "Roblox API", "Remote Events", "Data Stores", "Optimization", "Game Systems"],
    developerCta: "Build my scripter card",
    studioCta: "Scout scripters"
  },
  builder: {
    label: "Builder",
    title: "Roblox builder",
    summary: "Creates polished worlds, maps, lighting passes, and playable spaces.",
    services: ["Maps", "Lighting", "World Flow", "Props", "Terrain", "Optimization"],
    developerCta: "Build my builder card",
    studioCta: "Scout builders"
  },
  uiux: {
    label: "UI/UX",
    title: "Roblox UI/UX designer",
    summary: "Designs menus, shops, HUDs, and flows that make games easier to use.",
    services: ["HUDs", "Shops", "Icons", "Menus", "UX Flows", "Mobile UI"],
    developerCta: "Build my UI card",
    studioCta: "Scout UI talent"
  },
  vfx: {
    label: "VFX",
    title: "Roblox VFX artist",
    summary: "Creates ability effects, hit reactions, particles, and polished gameplay moments.",
    services: ["Particles", "Abilities", "Combat", "Impact FX", "Polish", "Atmosphere"],
    developerCta: "Build my VFX card",
    studioCta: "Scout VFX talent"
  },
  animator: {
    label: "Animator",
    title: "Roblox animator",
    summary: "Builds combat, emotes, movement, and character motion that feels responsive.",
    services: ["Combat", "Emotes", "Movement", "Cutscenes", "Rigs", "Polish"],
    developerCta: "Build my animator card",
    studioCta: "Scout animators"
  },
  systems: {
    label: "Systems",
    title: "Roblox systems developer",
    summary: "Designs reliable backend systems, data flows, economies, and live-game tools.",
    services: ["Data Stores", "Economy", "Live Ops", "Tools", "Matchmaking", "Analytics"],
    developerCta: "Build my systems card",
    studioCta: "Scout systems devs"
  }
};
```

---

## 11. Waitlist and Signup Copy

The signup should feel like early access to the product, not a newsletter.

### Main signup copy

Headline:

> Get early access to Weld.

Subhead:

> Join the list for the first developer cards and studio scouting tools.

Field label:

> Email address

Placeholder:

> you@example.com

Button:

> Save my spot

Privacy note:

> No spam. Just launch updates and early access.

### Developer mode

Headline:

> Build your talent card early.

Subhead:

> Get first access to the card studios will scan before they Spark.

Button:

> Join as a developer

### Studio mode

Headline:

> Scout Roblox talent early.

Subhead:

> Get early access to clean talent cards with proof, rate, links, and availability.

Button:

> Join as a studio

---

## 12. Signup State Messages

```ts
export const waitlistCopy = {
  idle: {
    helper: "Enter your email to join early access.",
    button: "Save my spot"
  },
  focused: {
    helper: "We’ll send launch updates and early access only.",
    button: "Save my spot"
  },
  typing: {
    helper: "Checking the email format...",
    button: "Save my spot"
  },
  valid: {
    helper: "Looks good. You’re ready to join.",
    button: "Save my spot"
  },
  submitting: {
    helper: "Saving your spot...",
    button: "Saving..."
  },
  success: {
    helper: "Spot saved. We’ll send the next step soon.",
    button: "You’re on the list"
  },
  error: {
    helper: "Add a valid email so we can reach you.",
    button: "Try again"
  }
};
```

Accessibility rules:

- Input must have a visible label.
- Error and success messages must be connected with `aria-describedby`.
- Do not rely on placeholder copy alone.
- Do not use “Submit” as the main button.

---

## 13. Section Copy Blueprint

### Hero

Headline:

> The talent network for Roblox.

Subhead:

> Link your games, set your rate, and match with studios that actually ship.

Support:

> Weld turns shipped work, availability, links, and proof into swipeable talent cards studios can trust.

### How it works

Headline:

> From proof to Spark.

Cards:

1. **Link your work** — Add Roblox projects, portfolios, GitHub, Discord, rate, and availability.
2. **Build your card** — Weld formats everything into one clean profile studios can scan.
3. **Spark with teams** — Studios shortlist and reach out when there is a fit.

### Proof section

Headline:

> Proof before the first message.

Subhead:

> Cards show what teams usually have to ask for: work, rate, availability, links, and notes.

### Studio section

Headline:

> Less Discord digging. More signal.

Subhead:

> Scan talent by role, rate, availability, and linked proof before starting a conversation.

### Final CTA

Headline:

> Get early access to Weld.

Subhead:

> Join the first developers and studios shaping Roblox talent cards.

---

## 14. Banned Phrases

Do not use:

- unlock opportunities
- empower creators
- creator-first platform
- seamless solution
- all-in-one platform
- next-generation
- revolutionary
- robust ecosystem
- leverage your network
- optimize hiring workflows
- dynamic proof surface
- compile your profile
- boot your roster
- command buffer
- Output
- terminal
- LuaU editor
- top talent unless based on real criteria
- guaranteed match

Replacement table:

| Bad | Better |
|---|---|
| Get discovered | Get seen by studios |
| Unlock opportunities | Spark with teams hiring now |
| Join the waitlist | Get early access |
| Seamless hiring workflow | Scout without Discord chaos |
| Dynamic proof surface | Talent card |
| Verified talent infrastructure | Proof you can scan |
| Developer ecosystem | Roblox devs and studios |
| Submit | Save my spot |

---

## 15. Content Density Rules

- Hero headline: 4-8 words preferred, max 2 lines on desktop.
- Hero subhead: 1-2 lines.
- Support line: optional, max 2 lines.
- Card summary: max 16 words.
- Stat labels: 1-2 words.
- Chips: 1-3 words.
- Section body: max 2 lines before visual content carries the rest.
- FAQ answers: 2-4 short sentences.

---

## 16. Agent Work Packages

### Package 1 — Copy replacement

Replace cartoon and old static copy with premium product clarity.

Acceptance:

- hero explains Weld in under five seconds
- no terminal/cartoon/doodle language remains
- old “Swipe. Spark. Ship.” can remain as a supporting phrase, not the main headline

### Package 2 — Type scale

Implement clean, modern typography tokens.

Acceptance:

- headline is large and sharp
- body is readable
- labels are not tiny or overly technical
- no decorative/handwritten font is used

### Package 3 — Card content config

Move profile and role copy into config.

Acceptance:

- role switch updates card title, summary, services, and CTA
- copy remains concise

### Package 4 — Signup copy states

Add all signup states.

Acceptance:

- idle/focused/typing/valid/submitting/success/error text exists
- state messages are accessible
- signup feels like early access, not a newsletter

---

## 17. Codex Implementation Prompt

```text
Implement Stage 2 of the Weld liquid glass redesign.

Rewrite copy and typography for a premium black-and-white liquid glass landing page. Use the reference 1 split hero direction. The main hero should say: “The talent network for Roblox.” Support it with short copy about linking games, setting rates, and matching with studios that actually ship.

Replace cartoon, terminal, Studio, Output, compile, command, and doodle language with clean product language. Use a modern sans-serif display/body system. Keep card labels clear: Verified, Available for work, Experience, Projects, Reliability, Rate, Services, Links, Latest project, Client notes.

Create developer/studio audience copy, role copy config, and waitlist state messages. Keep all work frontend-only.

Return files changed, copy replaced, role config additions, accessibility notes, and remaining copy risks.
```

---

## 18. Review Prompt

```text
Review Stage 2.

Reject if the hero does not explain Weld quickly, if copy feels cartoonish, if old terminal/Studio language remains, if the signup reads like a generic newsletter, or if role copy is hard-coded across components.

Approve only if the page reads like a premium Roblox talent network with clear proof-card value, developer/studio framing, and a strong early-access CTA.
```

---

## 19. Final Handoff Checklist

- [ ] Hero headline is short and clear.
- [ ] Subhead explains Weld plainly.
- [ ] Copy aligns with black-and-white liquid glass style.
- [ ] Talent card labels are scannable.
- [ ] Role copy lives in config.
- [ ] Signup states have polished messages.
- [ ] Developer/studio modes have distinct but related copy.
- [ ] No cartoon, terminal, Studio, or generic SaaS language remains.
- [ ] Accessibility labels are present.
