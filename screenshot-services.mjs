// Phase-3 verification: the /services spatial canvas (Direction D).
// Captures the landed canvas, a zoom/pan, and a panel zoom-expanded into its
// nested detail canvas (via real pointer events, exercising the tap-to-open
// path), then the close. Overrides matchMedia('(pointer:fine)') so the custom
// cursor mounts under headless Chrome (the canvas itself is pointer-agnostic).
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

await page.goto(`${BASE}/services`, { waitUntil: 'networkidle0' });
await sleep(900); // mount + injection + wire draw + fonts.ready redraw

// 1) landed canvas — six panels, anchor wires, controls
await shot('svc-1-landed');

// 2) zoom in a couple of steps via the + control
for (let i = 0; i < 3; i++) {
  await page.$eval('.sc-ctrls button[data-z="in"]', (b) => b.click());
  await sleep(120);
}
await shot('svc-2-zoomed');

// 3) recentre
await page.$eval('.sc-ctrls button[data-z="home"]', (b) => b.click());
await sleep(250);

// 4) open a core service panel -> nested detail canvas (real pointer tap)
async function tapOpen(open, name) {
  const box = await page.$eval(`.sc-panel[data-open="${open}"]`, (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  await page.mouse.move(box.x, box.y);
  await page.mouse.down();
  await page.mouse.up();
  await sleep(700); // .42s zoom-open + ensureAll
  await shot(name);
  await page.$eval('.sc-detail .close-x', (el) => el.click());
  await sleep(550);
}

await tapOpen('svc1', 'svc-3-detail-service');
await tapOpen('standards', 'svc-4-detail-standards');
await tapOpen('cta', 'svc-5-detail-cta');

// 5) full view with the persistent bottom-nav
await shot('svc-6-full');

await browser.close();
console.log('done');
