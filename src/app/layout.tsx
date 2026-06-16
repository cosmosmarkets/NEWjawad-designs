import type { Metadata, Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { fontVars } from '@/lib/fonts';
import Nav from '@/components/shell/Nav';
import Cursor from '@/components/shell/Cursor';
import SmoothScroll from '@/components/shell/SmoothScroll';
import './globals.css';

const DESCRIPTION = 'Design portfolio. A hand-drawn world you fly through.';
// Production alias on Vercel (Phase 5c deploy). metadataBase resolves absolute
// URLs for OG/Twitter tags; update this if a custom domain is added later.
const SITE_URL = 'https://jawad-portfolio-kohl.vercel.app';

/**
 * Phase 5c — viewport + richer metadata for the Lighthouse SEO / best-practices
 * pass. The explicit viewport (device-width) makes the mobile fallback engage
 * correctly; themeColor matches the paper surface so the mobile browser chrome
 * blends in. Title uses a template so each route can set its own leaf title.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4f3f0',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Jawad Design — Portfolio', template: '%s · Jawad Design' },
  description: DESCRIPTION,
  applicationName: 'Jawad Design',
  keywords: ['design portfolio', 'web design', 'landing pages', 'brand systems', 'Jawad'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Jawad Design',
    title: 'Jawad Design — Portfolio',
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image', title: 'Jawad Design — Portfolio', description: DESCRIPTION },
};

/**
 * Root layout = the persistent shell. Nav + Cursor + SmoothScroll live here so
 * they NEVER remount between routes — that's what keeps the nav fill, the
 * cursor, and (later) the camera continuous as you move around. <ViewTransitions>
 * enables the cross-route morph transitions (see NOTES.md for why routes won).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" className={fontVars}>
        <body>
          <SmoothScroll />
          {/* <main> landmark for screen-reader navigation (roadmap §9). Layout-
              neutral: every page root is position:fixed (out of flow), so the
              wrapper adds the landmark without changing a pixel. */}
          <main>{children}</main>
          <Nav />
          <Cursor />
        </body>
      </html>
    </ViewTransitions>
  );
}
