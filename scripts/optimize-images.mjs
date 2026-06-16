/**
 * Build-time image optimizer (Phase 5a).
 *
 * Why this exists: the page content is generated as HTML *strings* injected via
 * innerHTML (see NOTES Phase 2/3/4), so `next/image` can't be dropped in without
 * rewriting every builder to JSX and breaking the byte-identical-markup
 * guarantee the migration relied on. Instead we optimize at the *asset* level:
 * walk public/, emit a sibling `.webp` (and `.avif` when it's a worthwhile win)
 * for every raster image, and repoint the string `src`/`url()` to the `.webp`.
 * The original PNG/JPG stay on disk as the source of truth + fallback.
 *
 * Run: `npm run optimize:images`
 */
import { readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIRS = ['public/assets', 'public/uploads'];
const RASTER = new Set(['.png', '.jpg', '.jpeg']);

// Only emit AVIF when it saves a meaningful chunk over WebP — AVIF encodes
// slowly and the win is small for already-compact files.
const AVIF_MIN_SAVING = 0.15; // 15% smaller than the webp to be worth keeping

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const fmtKB = (n) => (n / 1024).toFixed(0) + ' KB';

async function run() {
  let totalIn = 0;
  let totalOut = 0;
  for (const rel of DIRS) {
    const base = join(ROOT, rel);
    if (!existsSync(base)) continue;
    for await (const file of walk(base)) {
      if (!RASTER.has(extname(file).toLowerCase())) continue;
      const srcSize = (await stat(file)).size;
      const input = sharp(file);

      const webpPath = file.replace(/\.(png|jpe?g)$/i, '.webp');
      const webpBuf = await input.clone().webp({ quality: 80 }).toBuffer();
      await writeFile(webpPath, webpBuf);

      // Try AVIF; keep it only if it beats WebP by the threshold.
      const avifPath = file.replace(/\.(png|jpe?g)$/i, '.avif');
      const avifBuf = await input.clone().avif({ quality: 62 }).toBuffer();
      const keepAvif = avifBuf.length < webpBuf.length * (1 - AVIF_MIN_SAVING);
      if (keepAvif) await writeFile(avifPath, avifBuf);

      const best = keepAvif ? Math.min(webpBuf.length, avifBuf.length) : webpBuf.length;
      totalIn += srcSize;
      totalOut += best;
      console.log(
        `${rel}/${file.slice(base.length + 1)}  ${fmtKB(srcSize)} → webp ${fmtKB(webpBuf.length)}` +
          (keepAvif ? ` · avif ${fmtKB(avifBuf.length)}` : ''),
      );
    }
  }
  console.log(
    `\nTotal raster: ${fmtKB(totalIn)} → ${fmtKB(totalOut)} ` +
      `(−${(100 - (totalOut / totalIn) * 100).toFixed(0)}%) best-format`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
