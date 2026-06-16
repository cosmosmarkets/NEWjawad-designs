// Phase-2 verification: drives the home camera (Direction E) through its real
// flow — preloader → brand loader → canvas travel → nested detail canvases —
// and screenshots each beat. Overrides matchMedia('(pointer:fine)') so the
// desktop-only spatial canvas + loader mount under headless Chrome.
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';

const OUT = './temporary screenshots';
mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE || 'http://localhost:3001';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

await page.evaluateOnNewDocument(() => {
  const orig = window.matchMedia.bind(window);
  window.matchMedia = (q) =>
    /pointer:\s*fine/.test(q)
      ? { matches: true, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false }
      : orig(q);
});

const shot = (name) => page.screenshot({ path: `${OUT}/${name}.png` });
const center = () => page.mouse.move(720, 450, { steps: 4 });

await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
await sleep(900);

// 1) controls preloader (typewriter intro)
await shot('home-1-preloader');

// dismiss the preloader (a wheel tick triggers its done())
await center();
await page.mouse.wheel({ deltaY: 12 });
await sleep(900);

// 2) brand loader — JAWAD wordmark + orbiting tool logos + portrait ring
await shot('home-2-loader');

// push heroHP 0 -> 1 (JAWAD -> DESIGN swap). dy*0.00098 per tick, need ~1020.
for (let i = 0; i < 5; i++) { await page.mouse.wheel({ deltaY: 300 }); await sleep(120); }
await sleep(500);
await shot('home-3-loader-design');

// a separate, deliberate scroll past the end dismisses the loader -> canvas
await sleep(600);
await page.mouse.wheel({ deltaY: 300 });
await sleep(1400); // loader fade (620ms) + land on Work

// 3) canvas landed on Work (billboard + stat strip); wait the dwell for the bloom
await shot('home-4-work');
await sleep(1100);
await shot('home-5-work-preview'); // greybox preview bloomed on dwell

// 4) travel forward a couple of panels, let it settle
for (let i = 0; i < 6; i++) { await page.mouse.wheel({ deltaY: 260 }); await sleep(90); }
await sleep(1200);
await shot('home-6-travel');

// 5) nested detail canvases — click the panel node in the minimap to glide there,
//    then click the panel itself to open its match-cut detail.
async function openVia(idx, name) {
  const node = await page.$(`.e-nav-node[data-i="${idx}"]`);
  if (node) {
    const b = await node.boundingBox();
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
    await sleep(1100);
  }
  const panel = await page.$(`.e-panel[data-i="${idx}"]`);
  if (panel) {
    const b = await panel.boundingBox();
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
    await sleep(900);
  }
  await shot(name);
  // close the detail
  const close = await page.$('.e-detail .e-close');
  if (close) { await close.click(); await sleep(700); }
}

await openVia(3, 'home-7-about-detail');
await openVia(4, 'home-8-trust-detail');
await openVia(6, 'home-9-contact-detail');

// 6) full page incl. the persistent bottom-nav curve filled to the camera
await shot('home-10-full');

await browser.close();
console.log('done');
