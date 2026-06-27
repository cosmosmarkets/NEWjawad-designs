import type { Config } from 'tailwindcss';

/**
 * Design tokens ported VERBATIM from the prototype's :root block.
 * These are the single source of truth for color + easing across the app.
 * globals.css mirrors them as CSS custom properties so the ported component
 * CSS (nav, cursor) can keep using var(--ink) etc. unchanged. No new colors.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    // Breakpoints are the site's single source of truth for "when do we switch
    // layouts". `md` (768px) MUST stay in sync with STACK_MQ in src/lib/motion.ts
    // and the `@media (max-width: 768px)` blocks in the CSS — that's the width at
    // which spatial canvases drop to a stacked scroll. `sm`/`lg` are here so new
    // components can use sm:/lg: utilities instead of hand-written media queries.
    screens: {
      sm: '430px', // top of the phone range we target (iPhone Pro Max etc.)
      md: '768px', // canvas stack / mobile-shell breakpoint (== STACK_MQ)
      lg: '1024px', // small-laptop floor
      xl: '1280px', // small-laptop ceiling
    },
    extend: {
      colors: {
        // Neutral ramp warmed a few degrees (polish: colour pass, Phase 1).
        // MUST stay in sync with the --paper/--ink/... tokens in globals.css —
        // see the note there for the prior cool values + rationale.
        paper: '#f4f2ea',
        'paper-2': '#ece9e1',
        ink: '#2c2a27',
        'ink-soft': '#6f6c64',
        line: '#8d8a82',
        'line-soft': '#b9b6ad',
        accent: '#d2502f',
      },
      fontFamily: {
        // mirror --hand / --mono / --display from the prototype
        hand: ['var(--font-architects)', '"Comic Sans MS"', 'cursive'],
        mono: ['"SF Mono"', 'ui-monospace', 'Menlo', 'monospace'],
        display: ['var(--font-baloo)', 'sans-serif'],
        marker: ['var(--font-marker)', 'cursive'],
      },
      transitionTimingFunction: {
        // --ease-smooth / --ease-bounce
        smooth: 'cubic-bezier(0.16,1,0.3,1)',
        bounce: 'cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
};

export default config;
