/** @type {import('next').NextConfig} */
const nextConfig = {
  // The prototype ships large PNGs; Phase 4 optimizes them. Keep modern formats on by default.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
