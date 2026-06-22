// One-off: capture the homepage hero (settled "i also DESIGN" state, portrait +
// orbiting tool logos) as the OpenGraph / Twitter card image. The hero lives in
// the brand loader (#e-loader); right-click drives it to heroHP=1. We dismiss
// the controls preloader, hide the persistent nav + custom cursor + scroll cue,
// then screenshot a clean 1200x630 frame. Not part of the build — run by hand.
import puppeteer from 'puppeteer';

const BASE = `http://localhost:${process.env.PORT || 3000}`;
const OUT = process.argv[2] || 'src/app/opengraph-image.png';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
// 1200x630 is the canonical OG ratio; DSF 2 keeps the hand-drawn type crisp.
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
// the desktop-only hero/cursor want a fine pointer under headless Chrome
await page.evaluateOnNewDocument(() => {
  const orig = window.matchMedia.bind(window);
  window.matchMedia = (q) =>
    /pointer:\s*fine/.test(q)
      ? { matches: true, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false }
      : orig(q);
});

await page.goto(BASE, { waitUntil: 'networkidle0' });

// wait for the brand loader to mount
await page.waitForSelector('#e-loader', { timeout: 15000 });
await sleep(800);

// dismiss the controls preloader overlay if it's up (wheel = "done")
await page.evaluate(() => {
  const pre = document.querySelector('#e-preload');
  if (pre) pre.dispatchEvent(new WheelEvent('wheel', { deltaY: 10, bubbles: true }));
});
await sleep(900);

// right-click the loader -> animateHeroTo(1): JAWAD→DESIGN swap, logos settle
await page.evaluate(() => {
  const l = document.querySelector('#e-loader');
  if (l) l.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }));
});
// the swap tween is ~1950ms; give it room to fully settle
await sleep(2600);

// make sure fonts are painted, then strip the overlays the social card shouldn't show
await page.evaluate(async () => {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  for (const sel of ['#nav', '#nav-hint', '#jawad-cursor', '#e-cue', '.e-loader-cue', 'nextjs-portal', '[data-nextjs-dev-tools-button]']) {
    document.querySelectorAll(sel).forEach((n) => { n.style.display = 'none'; });
  }
});
await sleep(200);

await page.screenshot({ path: OUT });
console.log('wrote', OUT, await page.evaluate(() => ({ hp: 'shot' })));
await browser.close();
