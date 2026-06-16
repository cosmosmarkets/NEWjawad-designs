import type { NextConfig } from 'next';

/**
 * Project config (Phase 5a). Previously absent — Next ran on all defaults.
 *
 * Note on images: page content is injected as HTML strings (NOTES Phase 2–4),
 * so we don't use `next/image`; raster assets are pre-converted to WebP by
 * `npm run optimize:images` and referenced directly. The `images.formats` line
 * below is the documented default in case a real `next/image` is ever added.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
