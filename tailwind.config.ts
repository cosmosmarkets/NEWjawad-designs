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
    extend: {
      colors: {
        paper: '#f4f3f0',
        'paper-2': '#eceae6',
        ink: '#2c2c2a',
        'ink-soft': '#6f6e6a',
        line: '#8d8c88',
        'line-soft': '#b9b8b3',
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
