// Generic Direction-D canvas capture. Usage:
//   PAGE=/pricing OPENS=single,faq node screenshot-canvas.mjs
// Captures: landed, a +zoom, then each OPENS panel zoomed into its detail.
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';

const OUT = './temporary screenshots';
mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE || 'http://localhost:3000';
const PAGE = process.env.PAGE || '/pricing';
const OPENS = (process.env.OPENS || '').split(',').filter(Boolean);
const PREFIX = process.env.PREFIX || PAGE.replace(/\W+/g, '-').replace(/^-|-$/g, '');
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

await page.goto(`${BASE}${PAGE}`, { waitUntil: 'networkidle0' });
await sleep(1000);
await shot(`${PREFIX}-1-landed`);

for (let i = 0; i < 3; i++) {
  await page.$eval('.sc-ctrls button[data-z="in"]', (b) => b.click());
  await sleep(120);
}
await shot(`${PREFIX}-2-zoomed`);
await page.$eval('.sc-ctrls button[data-z="home"]', (b) => b.click());
await sleep(250);

async function tapOpen(open, idx) {
  const box = await page.$eval(`.sc-panel[data-open="${open}"]`, (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  await page.mouse.move(box.x, box.y);
  await page.mouse.down();
  await page.mouse.up();
  await sleep(750);
  await shot(`${PREFIX}-${3 + idx}-detail-${open}`);
  await page.$eval('.sc-detail .close-x', (el) => el.click());
  await sleep(550);
}
for (let i = 0; i < OPENS.length; i++) await tapOpen(OPENS[i], i);

await shot(`${PREFIX}-9-full`);
await browser.close();
console.log('done');
