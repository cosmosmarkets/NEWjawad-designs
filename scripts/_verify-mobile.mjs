// Phase 5b verification — screenshots every route as a phone so the
// (pointer:coarse) stacked fallback engages. Captures the top of each route
// plus a couple of scrolled frames (content scrolls inside the fixed
// .canvas-page container, so fullPage won't catch it). Temporary helper.
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';

const OUT = './temporary screenshots';
mkdirSync(OUT, { recursive: true });
const BASE = 'http://localhost:3000';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ROUTES = [
  ['/', 'home'],
  ['/work', 'work'],
  ['/services', 'services'],
  ['/process', 'process'],
  ['/pricing', 'pricing'],
  ['/contact', 'contact'],
  ['/work/weld', 'slug'],
];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
// iPhone-ish: narrow + touch so STACK_MQ ((pointer:coarse)) matches.
// 390px < 768px → STACK_MQ matches via its (max-width:768px) arm even though
// headless Chrome reports (pointer:fine); isMobile/hasTouch set the touch UA.
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

const scrollTo = (y) =>
  page.evaluate((y) => {
    const el = document.querySelector('.canvas-page') || document.querySelector('.e-stage') || document.scrollingElement;
    if (el) el.scrollTo ? el.scrollTo(0, y) : (el.scrollTop = y);
    document.scrollingElement && (document.scrollingElement.scrollTop = y);
  }, y);

for (const [route, name] of ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle0' });
  await sleep(1200); // let intro/preloader settle
  await scrollTo(0);
  await sleep(150);
  await page.screenshot({ path: `${OUT}/m-${name}-1top.png` });
  await scrollTo(700);
  await sleep(250);
  await page.screenshot({ path: `${OUT}/m-${name}-2mid.png` });
  await scrollTo(1500);
  await sleep(250);
  await page.screenshot({ path: `${OUT}/m-${name}-3low.png` });
}
await browser.close();
console.log('mobile shots done');
