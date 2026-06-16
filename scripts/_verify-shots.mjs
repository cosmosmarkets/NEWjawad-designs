// Phase 5a verification: full-viewport screenshot of every route, to confirm
// the WebP swap + a11y edits changed nothing visible. Temporary helper.
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';

const OUT = './temporary screenshots';
mkdirSync(OUT, { recursive: true });
const BASE = `http://localhost:${process.env.PORT || 3000}`;
const label = process.argv[2] || 'after';
const mobile = process.argv[3] === 'mobile';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const routes = [
  ['home', '/'],
  ['work', '/work'],
  ['work-slug', '/work/weld'],
  ['services', '/services'],
  ['process', '/process'],
  ['pricing', '/pricing'],
  ['contact', '/contact'],
];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
if (mobile) {
  // iPhone-ish: narrow viewport + coarse pointer + touch, real device metrics
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.setUserAgent(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  );
} else {
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  // desktop-only cursor needs a fine pointer under headless Chrome
  await page.evaluateOnNewDocument(() => {
    const orig = window.matchMedia.bind(window);
    window.matchMedia = (q) =>
      /pointer:\s*fine/.test(q)
        ? { matches: true, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false }
        : orig(q);
  });
}

const failures = [];
page.on('console', (m) => {
  if (m.type() === 'error') failures.push(m.text());
});
page.on('requestfailed', (r) => failures.push(`REQFAIL ${r.url()}`));
page.on('response', (r) => {
  if (r.status() === 404) failures.push(`404 ${r.url()}`);
});

for (const [name, path] of routes) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle0' });
  await sleep(1200); // let the intro / camera settle
  await page.screenshot({ path: `${OUT}/r-${name}-${label}.png` });
  const m = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    iw: window.innerWidth,
    bodyOverflow: document.body.scrollWidth - window.innerWidth,
  }));
  const flag = m.sw > m.iw ? `  ⚠ H-OVERFLOW sw=${m.sw} iw=${m.iw}` : '';
  console.log(`shot ${name}${flag}`);
}

await browser.close();
if (failures.length) {
  console.log('CONSOLE ERRORS:\n' + failures.join('\n'));
} else {
  console.log('no console errors');
}
console.log('done');
