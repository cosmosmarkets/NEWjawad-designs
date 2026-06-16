// Minimal landed capture for canvases without a detail flow (Work, slug).
// PAGE=/work PREFIX=wb node screenshot-simple.mjs
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';
const OUT = './temporary screenshots';
mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE || 'http://localhost:3000';
const PAGE = process.env.PAGE || '/work';
const PREFIX = process.env.PREFIX || 'cap';
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
await page.goto(`${BASE}${PAGE}`, { waitUntil: 'networkidle0' });
await sleep(1400);
await page.screenshot({ path: `${OUT}/${PREFIX}-1-landed.png` });
console.log('done');
await browser.close();
