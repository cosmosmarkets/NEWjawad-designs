// Deterministic capture of the three nested detail canvases (About / Trust /
// Contact). Opening goes through the engine's real click delegation
// (panel.click() bubbles to the world handler -> openDetail), so this exercises
// the actual code path; it just avoids Puppeteer's flaky SVG-node hit-testing.
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

await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
await sleep(900);
// dismiss preloader
await page.mouse.move(720, 450); await page.mouse.wheel({ deltaY: 12 }); await sleep(800);
// dismiss loader: push heroHP to 1, then a deliberate extra scroll
for (let i = 0; i < 5; i++) { await page.mouse.wheel({ deltaY: 300 }); await sleep(110); }
await sleep(600); await page.mouse.wheel({ deltaY: 300 }); await sleep(1400);

async function detail(idx, name) {
  await page.$eval(`.e-panel[data-i="${idx}"]`, (el) => el.click());
  await sleep(1100); // open transition + orbit-in stagger
  await shot(name);
  await page.$eval('.e-detail .e-close', (el) => el.click());
  await sleep(700);
}

await detail(3, 'home-7-about-detail');
await detail(4, 'home-8-trust-detail');
await detail(6, 'home-9-contact-detail');

await browser.close();
console.log('done');
