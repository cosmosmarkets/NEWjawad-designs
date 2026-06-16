# Weld Stage 4 — Liquid Glass Component Surface + Signup System

**Stage focus:** Rebuild the Weld landing page component system around the reference-1 split hero, a dynamic liquid-glass talent card, developer/studio modes, role switching, proof visibility, and early-access signup.

**Audience:** Codex, Claude Code, frontend engineers, designers, product leads, QA reviewers.

**Scope:** Frontend-only component architecture, page structure, shared state, hero layout, card anatomy, signup states, responsive behavior, and implementation contracts.

---

## 00. Core Oath

The page is not a cartoon marketplace, not a dashboard, not a Studio interface, not a terminal, and not a generic SaaS landing page.

The page is a premium liquid-glass product preview built around one idea:

> Weld turns Roblox talent into clean, swipeable proof cards.

Every major component must support that idea.

The first viewport should look closest to **reference layout 1: Split hero**.

---

## 01. Executive Objective

Stage 4 is the main rebuild stage.

The old static page already had a useful product frame: developers and studios use Weld to move past scattered Discord-style profiles and into cleaner proof, rate, availability, and matching. The new component system keeps that product frame but presents it through a refined liquid glass interface.

The new page maps sections to:

- glass nav
- developer/studio mode toggle
- split hero shell
- large dynamic talent card
- hero copy and CTA
- role selector
- proof/trust modules
- studio scouting explanation
- early-access signup
- lightweight FAQ

The result should be easy to understand before the user scrolls.

---

## 02. What This Stage Owns

Stage 4 owns:

- component tree
- shared frontend state
- reference-1 hero layout
- nav and audience toggle
- dynamic talent card anatomy
- role selector
- card actions
- proof badge popovers
- how-it-works section
- proof/trust section
- studio scout section
- waitlist/signup section
- FAQ section
- mobile layout
- implementation routes
- agent work packages

It does **not** own:

- backend waitlist persistence
- authentication
- database schema
- production API details
- real marketplace data
- final marketing imagery

---

## 03. Page Architecture

Recommended React/component tree:

```tsx
<WeldLandingPage>
  <GlassNav />
  <HeroShell>
    <HeroTalentCard />
    <HeroCopyPanel />
  </HeroShell>
  <RoleTalentExplorer />
  <HowItWorks />
  <ProofTrustSection />
  <StudioScoutSection />
  <WaitlistSignupSection />
  <FriendlyFAQ />
  <FooterCTA />
</WeldLandingPage>
```

If the current codebase is a single `index.html`, build semantic sections with shared JavaScript state first. If React/Next is available, componentize directly.

---

## 04. Shared Frontend State Model

```ts
type WeldRole = "scripter" | "builder" | "uiux" | "vfx" | "animator" | "systems";
type AudienceMode = "developer" | "studio";
type CardAction = "none" | "reject" | "like" | "spark";
type WaitlistState = "idle" | "focused" | "typing" | "valid" | "submitting" | "success" | "error";

type WeldLandingState = {
  selectedRole: WeldRole;
  audienceMode: AudienceMode;
  activeProfileIndex: number;
  lastCardAction: CardAction;
  openProofBadge: string | null;
  email: string;
  waitlistState: WaitlistState;
  reducedMotion: boolean;
  compactMode: boolean;
};
```

Rules:

- `selectedRole` updates card name/title/services/rate/proof/CTA.
- `audienceMode` updates hero copy, signup copy, mode tab, and CTA framing.
- `lastCardAction` updates status text and optional card feedback.
- `openProofBadge` controls accessible proof popovers.
- `waitlistState` controls signup visual and text states.
- `reducedMotion` and `compactMode` affect transition behavior.

---

## 05. Role Data Config

All role-specific data must live in config.

```ts
export const weldRoles = {
  scripter: {
    label: "Scripter",
    name: "Eclipse",
    handle: "@EclipseDev",
    avatarAlt: "Eclipse developer avatar",
    title: "Roblox scripter",
    availability: "Available for work",
    verified: "Verified",
    rate: "$65/hr",
    rateNote: "Hourly or milestone",
    experience: "3+ yrs",
    projects: "Linked work",
    reliability: "On-time notes",
    summary: "Builds clean Roblox systems, ships fast, and shows real proof of work.",
    services: ["Lua", "Roblox API", "Remote Events", "Data Stores", "Optimization", "Game Systems"],
    links: [
      { label: "Roblox", value: "/EclipseDev" },
      { label: "Discord", value: "eclipse.dev" },
      { label: "X", value: "@EclipseRBLX" },
      { label: "GitHub", value: "eclipsedev" }
    ],
    proofBadges: ["Verified", "Linked work", "Availability shown"],
    developerCta: "Build my scripter card",
    studioCta: "Scout scripters"
  },
  builder: {
    label: "Builder",
    name: "NovaBuild",
    handle: "@NovaBuild",
    title: "Roblox builder",
    availability: "Available for work",
    verified: "Verified",
    rate: "$55/hr",
    rateNote: "Hourly or milestone",
    experience: "4+ yrs",
    projects: "Portfolio linked",
    reliability: "Clear handoff",
    summary: "Creates polished Roblox worlds with readable layouts, lighting, and flow.",
    services: ["Maps", "Lighting", "Terrain", "Props", "World Flow", "Optimization"],
    links: ["Roblox", "Discord", "X", "Portfolio"],
    proofBadges: ["Verified", "Portfolio linked", "Availability shown"],
    developerCta: "Build my builder card",
    studioCta: "Scout builders"
  },
  uiux: {
    label: "UI/UX",
    name: "PixelKai",
    handle: "@PixelKai",
    title: "Roblox UI/UX designer",
    availability: "Available for work",
    verified: "Verified",
    rate: "$60/hr",
    rateNote: "Hourly or milestone",
    experience: "3+ yrs",
    projects: "Figma linked",
    reliability: "Mobile-aware",
    summary: "Designs menus, shops, HUDs, and flows that make games easier to use.",
    services: ["HUDs", "Shops", "Menus", "Icons", "UX Flows", "Mobile UI"],
    links: ["Roblox", "Discord", "X", "Figma"],
    proofBadges: ["Verified", "Figma linked", "Availability shown"],
    developerCta: "Build my UI card",
    studioCta: "Scout UI talent"
  },
  vfx: {
    label: "VFX",
    name: "RikuFX",
    handle: "@RikuFX",
    title: "Roblox VFX artist",
    availability: "Available for work",
    verified: "Verified",
    rate: "$58/hr",
    rateNote: "Milestone preferred",
    experience: "5+ yrs",
    projects: "Clips linked",
    reliability: "Fast previews",
    summary: "Creates effects, particles, and gameplay moments that feel responsive.",
    services: ["Particles", "Abilities", "Combat", "Impact FX", "Atmosphere", "Polish"],
    links: ["Roblox", "Discord", "X", "Portfolio"],
    proofBadges: ["Verified", "Clips linked", "Availability shown"],
    developerCta: "Build my VFX card",
    studioCta: "Scout VFX talent"
  },
  animator: {
    label: "Animator",
    name: "Orbit",
    handle: "@OrbitAnim",
    title: "Roblox animator",
    availability: "Available for work",
    verified: "Verified",
    rate: "$52/hr",
    rateNote: "Per set or hourly",
    experience: "4+ yrs",
    projects: "Demo reel linked",
    reliability: "Clean exports",
    summary: "Builds combat, emotes, and movement that feels polished in-game.",
    services: ["Combat", "Emotes", "Movement", "Cutscenes", "Rigs", "Polish"],
    links: ["Roblox", "Discord", "X", "Portfolio"],
    proofBadges: ["Verified", "Reel linked", "Availability shown"],
    developerCta: "Build my animator card",
    studioCta: "Scout animators"
  },
  systems: {
    label: "Systems",
    name: "DataForge",
    handle: "@DataForge",
    title: "Roblox systems developer",
    availability: "Available for work",
    verified: "Verified",
    rate: "$72/hr",
    rateNote: "Hourly or milestone",
    experience: "6+ yrs",
    projects: "Case notes linked",
    reliability: "Production-minded",
    summary: "Designs data, economy, live ops, and backend systems for Roblox games.",
    services: ["Data Stores", "Economy", "Live Ops", "Tools", "Matchmaking", "Analytics"],
    links: ["Roblox", "Discord", "X", "GitHub"],
    proofBadges: ["Verified", "Case notes linked", "Availability shown"],
    developerCta: "Build my systems card",
    studioCta: "Scout systems devs"
  }
} as const;
```

If metrics are illustrative, label them as preview/example. Do not pretend fake traction is real.

---

## 06. Section Contract — GlassNav

### Purpose

Provide simple navigation, audience toggle, and primary CTA without becoming a toolbar.

### Visual anatomy

- left: Weld logo
- center/right: minimal nav links
- developer/studio glass segmented control
- black primary CTA

### Required behavior

- Developer/Studio updates `audienceMode`
- CTA scrolls to/focuses signup
- mobile keeps logo + CTA visible; links can collapse

### Suggested nav labels

- What it does
- Profile card
- Proof
- Log in
- Join as a developer

### Forbidden variants

- dense toolbar
- Studio menu bar
- terminal command nav
- too many links
- dropdown-heavy SaaS nav

---

## 07. Section Contract — HeroShell

### Purpose

Explain the product visually and emotionally in the first viewport.

### Desktop layout

Reference 1 split hero:

- outer rounded glass shell
- left: `HeroTalentCard`
- right: `HeroCopyPanel`
- nav appears above or integrated with the shell
- optional soft light bloom behind card

### Mobile layout

- headline first
- talent card second
- CTA immediately after card/copy
- mode toggle visible near top
- no horizontal overflow

### Required content

- headline
- subhead
- support sentence
- main talent card
- proof badge
- availability status
- service chips
- links row
- rate
- CTA
- role selector or visible selected role

### Required behavior

- role changes card content
- audience mode changes copy and CTA framing
- Spark/primary action moves focus to signup
- Like/Reject update local status if present

### Forbidden variants

- generic screenshot mockup
- abstract dashboard graphic
- dark terminal/code panel
- loose card floating without shared shell
- cartoon doodle annotations

---

## 08. Section Contract — HeroTalentCard

### Purpose

Show exactly what Weld creates: a clean profile card studios can scan.

### Required anatomy

1. top proof row
   - Verified
   - selected role
   - optional preview note
2. avatar block
3. name + role title
4. availability
5. stat pills
   - Experience
   - Projects
   - Reliability
6. short summary
7. service chips
8. rate bubble
9. links row
10. optional actions
   - Reject
   - Like
   - Spark / Join early

### Behavior

- all content reads from role config
- proof badge opens accessible popover
- links can be placeholder anchors in reference build
- action buttons update `lastCardAction`

### Accessibility

- buttons are real `button` elements
- icon-only controls need `aria-label`
- avatar image has alt text if meaningful
- decorative avatars use `aria-hidden="true"`
- proof trigger uses `aria-expanded`
- popover can close via Escape

### Forbidden variants

- over-cluttered card
- tiny unreadable stats
- fake official verification
- dark inspector card
- thick cartoon outlines

---

## 09. Section Contract — HeroCopyPanel

### Purpose

Make the value proposition obvious next to the card.

### Required anatomy

- audience mode chip or tab
- headline
- subhead
- support line
- primary CTA
- secondary CTA
- small trust line

Example:

```tsx
<HeroCopyPanel>
  <ModePill>I'm a developer</ModePill>
  <h1>The talent network for Roblox.</h1>
  <p>Link your games, set your rate, and match with studios that actually ship.</p>
  <p className="support">Weld turns shipped work, availability, links, and proof into swipeable talent cards studios can trust.</p>
  <Button>Join as a developer</Button>
  <Button variant="glass">Learn more</Button>
</HeroCopyPanel>
```

Rules:

- copy must not exceed the visual weight of the card
- CTA must be obvious
- avoid paragraph stacks
- support line can be hidden on very small mobile

---

## 10. Section Contract — RoleTalentExplorer

### Purpose

Show Weld supports multiple Roblox talent types without making the hero busy.

### Visual anatomy

- glass segmented chips on desktop
- horizontal scroll chips on mobile
- selected chip has dark/active state or accent ring
- optional mini cards below hero/lower section

### Roles

- Scripter
- Builder
- UI/UX
- VFX
- Animator
- Systems

### Required behavior

- clicking role updates hero card
- selected role is visible through label, state, and `aria-pressed`
- CTA copy can update based on role and audience mode

### Forbidden variants

- Explorer tree
- code folders
- rainbow role blocks
- selector that only changes itself

---

## 11. Section Contract — HowItWorks

### Purpose

Explain the flow in three clean steps.

### Content

1. **Link your work**
   - Add projects, portfolios, rate, availability, and proof.
2. **Build your card**
   - Weld formats your details into a clean profile studios can scan.
3. **Spark with teams**
   - Studios shortlist and reach out when there is a fit.

### Visual style

- three glass cards
- minimal icons
- short copy
- no dense timelines
- no code metaphors

### Forbidden variants

- process timeline with long paragraphs
- terminal/script tabs
- cartoon step stickers

---

## 12. Section Contract — ProofTrustSection

### Purpose

Show why a card beats scattered Discord links.

### Required modules

- proof badge explanation
- rate visibility
- availability status
- service chips
- links row
- client notes or feedback preview

### Suggested layout

- left: simplified glass card anatomy preview
- right: short proof callouts

### Copy angle

> Proof before the first message.

### Honesty rules

- label examples as examples
- avoid fake testimonials
- avoid official Roblox claims
- avoid fake marketplace volume

---

## 13. Section Contract — StudioScoutSection

### Purpose

Explain studio value without creating an enterprise dashboard.

### Required content

- scan by role
- see rate before messaging
- check proof and links first
- shortlist or Spark talent
- reduce Discord back-and-forth

### Visual style

- glass filter chips
- small stack/list of clean profile cards
- no data tables
- no admin panels

### Behavior

- optional local filters update visible mini cards
- Studio mode updates CTA and section copy

---

## 14. Section Contract — WaitlistSignupSection

### Purpose

Convert visitors into early-access signups.

### Required anatomy

- large glass signup card
- headline
- short promise
- audience mode tabs or mode-aware copy
- visible email label
- email input
- submit button
- helper/status message
- privacy reassurance

### Suggested copy

Headline:

> Get early access to Weld.

Subhead:

> Join the list for the first developer cards and studio scouting tools.

Button:

> Save my spot

Privacy note:

> No spam. Just launch updates and early access.

### Required states

- idle
- focused
- typing
- valid
- submitting
- success
- error

### Frontend-only behavior

```ts
async function handleWaitlistSubmit(email: string) {
  setWaitlistState("submitting");
  // TODO: connect to waitlist API when backend is ready.
  await new Promise((resolve) => setTimeout(resolve, 600));
  setWaitlistState("success");
}
```

### Forbidden variants

- generic newsletter box
- placeholder-only input
- hidden errors
- command-style input
- fake count of signups

---

## 15. Section Contract — FriendlyFAQ

### Purpose

Answer objections plainly.

Recommended questions:

1. What is Weld?
2. Is this for developers or studios?
3. What goes on a talent card?
4. Do I need lots of projects?
5. Is this official Roblox?
6. When will access open?

Tone:

- direct
- honest
- short
- premium, not playful

Accessibility:

- use real buttons
- support `aria-expanded`
- keyboard navigable

---

## 16. Responsive Layout Rules

### Desktop

- hero shell is split: card left, copy right
- nav/toggle visible
- role chips can sit under card or in a short row
- CTA visible without scrolling

### Tablet

- reduce shell padding
- keep card large
- role chips wrap
- copy remains compact

### Mobile

- headline first
- card second
- CTA third
- toggle visible
- glass blur reduced
- role chips horizontal-scroll
- proof popovers fit viewport
- signup appears early and final
- no horizontal overflow

Mobile acceptance:

- user can select role
- user can switch audience
- user can open proof details
- user can signup
- primary CTA remains reachable

---

## 17. Implementation Routes

### Route A — Static reference first

Use if currently working in one HTML/CSS/JS file.

Build:

1. tokens
2. split hero shell
3. hero talent card
4. copy panel
5. role switching
6. signup states
7. supporting sections

Exit criteria:

- first viewport looks and feels right before refactor

### Route B — Componentized React route

Use if app is React/Next.

Build:

- role config
- audience copy config
- shared state hook/provider
- GlassNav
- HeroShell
- HeroTalentCard
- HeroCopyPanel
- WaitlistSignupSection

Exit criteria:

- mode/role/signup flows cleanly

### Route C — Hero-first route

Use if speed matters.

Build:

1. nav
2. hero shell
3. card
4. copy/CTA
5. signup
6. role switching
7. sections

Exit criteria:

- first screen is strong and conversion-ready

---

## 18. Agent Work Packages

### Package 1 — State and config

Create role data, audience copy, waitlist copy, and landing state.

Acceptance:

- selectedRole, audienceMode, lastCardAction, openProofBadge, email, waitlistState exist

### Package 2 — Reference-1 hero

Build split glass shell.

Acceptance:

- card left/copy right on desktop
- headline and CTA visible
- card is dominant

### Package 3 — Talent card anatomy

Build full glass talent card.

Acceptance:

- includes proof, avatar, name, status, stats, summary, services, rate, links, actions

### Package 4 — Dynamic interactions

Wire role, audience, card actions, proof popovers.

Acceptance:

- at least 4 card fields update on role change
- audience changes copy and CTA
- proof popover accessible

### Package 5 — Signup form

Build waitlist with local validation.

Acceptance:

- idle/focused/typing/valid/submitting/success/error states visible
- no placeholder-only input

### Package 6 — Supporting sections

Build how-it-works, proof, studio, FAQ.

Acceptance:

- no old terminal/Studio/dashboard metaphors
- sections visually support signup

### Package 7 — Mobile pass

Adapt under 720px.

Acceptance:

- no overflow
- core interactions preserved
- glass remains readable

---

## 19. Codex Implementation Prompt

```text
Implement Stage 4 of the Weld liquid glass redesign.

Rebuild the landing page around the attached reference layout 1: a premium split hero with a large glass talent card on the left and concise copy/CTA on the right inside a rounded frosted-glass shell. Keep the black-and-white color scheme.

Use shared frontend state for selectedRole, audienceMode, activeProfileIndex, lastCardAction, openProofBadge, email, waitlistState, reducedMotion, and compactMode. Create role and audience copy configs. Build GlassNav, HeroShell, HeroTalentCard, HeroCopyPanel, RoleTalentExplorer, HowItWorks, ProofTrustSection, StudioScoutSection, WaitlistSignupSection, FriendlyFAQ, and FooterCTA.

The hero card must show Verified, avatar, name, role, availability, experience, projects, reliability, summary, services, rate, links, and actions. The signup form must be frontend-only, accessible, and support idle/focused/typing/valid/submitting/success/error states.

Remove cartoon doodles/stickers, thick ink outlines, terminal/Studio/dashboard metaphors, and old dark ember visual dominance.

Return files changed, state added, components created, mobile behavior, accessibility notes, performance notes, and deviations.
```

---

## 20. Review Prompt

```text
Review Stage 4.

Reject if the hero is not a split liquid-glass shell, if the profile card is not dominant, if role selection does not update the card, if the signup form is generic or inaccessible, if mobile removes core interactions, or if any major section keeps the old cartoon/terminal/Studio/dashboard metaphor.

Approve only if the page feels like a premium black-and-white liquid-glass Roblox talent network with a clear early-access signup path.
```

---

## 21. Final Handoff Checklist

- [ ] Component tree matches the liquid glass architecture.
- [ ] Shared frontend state exists.
- [ ] Role config drives card content.
- [ ] Audience mode updates copy and CTA.
- [ ] Reference-1 split hero is implemented.
- [ ] Talent card is dominant and readable.
- [ ] Proof popovers are accessible.
- [ ] Signup form has all states.
- [ ] Supporting sections are clean and visual.
- [ ] FAQ is accessible.
- [ ] Mobile preserves interactions.
- [ ] Old cartoon/terminal/Studio/dashboard components are removed from primary page.
