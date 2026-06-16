/**
 * Fonts via next/font (self-hosted, no layout shift, no CSS @import).
 * These match the prototype's @import: Architects Daughter (the hand font),
 * Baloo 2 700/800 (the CTA / display weight), Permanent Marker (accents),
 * Bungee (the home hero wordmark — the prototype's default --hero-font).
 * Each exposes a CSS variable consumed by globals.css / tailwind.config.ts.
 */
import { Architects_Daughter, Baloo_2, Permanent_Marker, Bungee } from 'next/font/google';

export const architects = Architects_Daughter({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-architects',
});

export const baloo = Baloo_2({
  weight: ['700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-baloo',
});

export const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-marker',
});

export const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bungee',
});

/** Convenience: every font variable to spread onto <html className>. */
export const fontVars = `${architects.variable} ${baloo.variable} ${permanentMarker.variable} ${bungee.variable}`;
