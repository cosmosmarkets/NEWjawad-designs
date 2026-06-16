// Phase-1 verification screenshots. Captures the nav pill + cursor states from
// localhost. Overrides matchMedia('(pointer:fine)') so the desktop-only cursor
// mounts under headless Chrome, and drives the real mouse so it positions.
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';

const OUT = './temporary screenshots';
mkdirSync(OUT, { recursive: true });
const BASE = 'http://localhost:3000';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

// make the desktop cursor think it has a fine pointer
await page.evaluateOnNewDocument(() => {
  const orig = window.matchMedia.bind(window);
  window.matchMedia = (q) =>
    /pointer:\s*fine/.test(q) ? { matches: true, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false } : orig(q);
});

async function shot(name) {
  await page.screenshot({ path: `${OUT}/${name}.png` });
}
async function navShot(name) {
  const box = await page.$eval('#nav', (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  const pad = 60;
  await page.screenshot({
    path: `${OUT}/${name}.png`,
    clip: { x: box.x - pad, y: box.y - pad, width: box.width + pad * 2, height: box.height + pad * 2 },
  });
}

// 1) Home, full
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
await sleep(600);
await shot('home-full');
await navShot('nav-home');

// 2) Mouse over a nav link → cursor locks to the curve
const link = await page.$('.nav-links a:nth-of-type(2)'); // "Services"
const lb = await link.boundingBox();
await page.mouse.move(lb.x + lb.width / 2, lb.y + lb.height / 2, { steps: 12 });
await sleep(450);
await navShot('nav-cursor-lock');

// 3) Mouse over the CTA → cursor inverts
const cta = await page.$('#nav .cta');
const cb = await cta.boundingBox();
await page.mouse.move(cb.x + cb.width / 2, cb.y + cb.height / 2, { steps: 12 });
await sleep(450);
await navShot('nav-cta-invert');

// 4) Scrolled home → continuous fill grows
await page.mouse.move(720, 300, { steps: 6 });
await page.evaluate(() => window.scrollTo({ top: window.innerHeight, behavior: 'instant' }));
await sleep(300);
await navShot('nav-scrolled');

// 5) Route page → fill snaps to that node
await page.goto(`${BASE}/services`, { waitUntil: 'networkidle0' });
await sleep(600);
await navShot('nav-services');

// 6) Contact page → CTA flips label
await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle0' });
await sleep(600);
await navShot('nav-contact');

await browser.close();
console.log('done');
