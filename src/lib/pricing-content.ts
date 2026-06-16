/**
 * Pricing page — Direction D content builders.
 *
 * Faithful 1:1 port of the Direction-D parts of the prototype's `pricing.js`
 * (`window.PRICE`): the seven-panel openable canvas (`sheetD`) and the nested
 * tier / FAQ detail canvases (`detailFor`). Returns HTML strings, exactly as
 * the prototype did; the shared spatial-canvas engine injects and wires them.
 *
 * Direction D only (the shipped direction). The Tweaks-only `tierMode:"scope"`
 * variant is dropped — the shipped default is `"map"`, so `detailFor` always
 * returns the map layout. Copy / coordinates / sizes / class names are verbatim.
 */

const flag = (t: string, pos: string) => `<span class="cta-flag" style="${pos}">${t}</span>`;
const btn = (txt: string, cls = '') => `<span class="btn ${cls}">${txt}</span>`;
const tick = (t: string) => `<li class="tick"><span class="tk">✓</span>${t}</li>`;

const HEADER = 'Three ways to work together.';
const SUBHEAD = 'Prices are where the conversation starts.';

type Tier = {
  key: string;
  name: string;
  price: string;
  popular: boolean;
  line: string;
  bestFor: string;
  includes: string[];
  timeline: string;
  care: string;
  rev: string;
  fits: string;
};

const TIERS: Tier[] = [
  {
    key: 'single',
    name: 'The Single',
    price: 'from $500',
    popular: false,
    line: 'A focused site, live in a week.',
    bestFor: 'a one-pager or a small, sharp site',
    includes: ['up to 3 pages', 'copy direction', '1 revision', 'live in 5 days', '30 days care'],
    timeline: '5 days',
    care: '30 days',
    rev: '1 revision',
    fits: 'a photographer’s one-page portfolio',
  },
  {
    key: 'edition',
    name: 'The Edition',
    price: 'from $1,200',
    popular: true,
    line: 'Room to grow, and a look that travels.',
    bestFor: 'founders who need a site that can expand',
    includes: ['up to 5 pages', 'copy + light brand polish', '2 revisions', 'CMS', 'source files'],
    timeline: '1–2 weeks',
    care: '30 days',
    rev: '2 revisions',
    fits: 'a founder’s 5-page product site + waitlist',
  },
  {
    key: 'commission',
    name: 'The Commission',
    price: 'from $3,000',
    popular: false,
    line: 'A flagship site that has to land.',
    bestFor: 'a signature site with a moment of craft',
    includes: ['full multi-page site', 'one signature interaction', 'full brand system', '3 revisions', 'priority + 60 days care'],
    timeline: '3–5 weeks',
    care: '60 days',
    rev: '3 revisions',
    fits: 'a studio’s flagship site with a signature scroll moment',
  },
];
const STANDARDS = ['loads under a second', 'SEO done right', 'you own it', 'no lock-in', 'responsive', 'measured'];
const FAQ: [string, string][] = [
  ['Why does every price say “from”?', 'Scope sets the final number — “from” is the floor, not a bait. You get a fixed quote before we start.'],
  ['What if I need more revisions?', 'Extra rounds are billed hourly at a rate we agree up front. No surprises on the invoice.'],
  ['Do you offer retainers?', 'Care windows cover the launch period. Ongoing work is a separate, simple monthly.'],
  ['Who owns the finished work?', 'You do — the code, the domain, the accounts, and the source files. No lock-in, ever.'],
  ['How soon can we start?', 'I take one project at a time. Typically there’s an opening within two weeks.'],
];
const ctaText = (t: Tier) => `Start ${t.name.replace('The ', 'a ')} ▸`;

type PanelOpts = { n?: number; tag?: string; cls?: string; open?: string; flag?: string; x: number; y: number; w: number; h: number; body: string };
function scPanel(o: PanelOpts): string {
  const base = `left:calc(50% + ${o.x}px);top:calc(50% + ${o.y}px);width:${o.w}px;height:${o.h}px;`;
  const open = o.open ? ` data-open="${o.open}"` : '';
  return `<div class="sc-panel${o.cls ? ' ' + o.cls : ''}${o.open ? ' openable' : ''}" style="${base}"${open}>
      ${o.n ? `<span class="sc-num">${o.n}</span>` : ''}
      ${o.tag ? `<span class="sc-tag">${o.tag}</span>` : ''}
      <div class="sc-body">${o.body}</div>
      ${o.flag ? flag(o.flag, 'top:-13px;left:10px;') : ''}
      ${o.open ? '<span class="sc-open-cur">OPEN ⤢</span>' : ''}
    </div>`;
}
function tierPanelBody(t: Tier): string {
  return `<div class="pr-tname${t.popular ? '' : ' sm'}">${t.name}</div><div class="pr-price${t.popular ? '' : ' sm'}">${t.price}</div>
      <ul class="ticks tight">${t.includes.slice(0, 3).map(tick).join('')}<li class="tick more">+${t.includes.length - 3} more inside ⤢</li></ul>`;
}

export function sheetD(): string {
  // value ladder: Single ($500) left → Edition ($1.2k) centre → Commission ($3k) right.
  // The Edition is the HUB (sc-hero) — wires radiate from it; it is the visual centre.
  const headbar = scPanel({ n: 1, tag: '① HEADER', cls: 'sc-offerpanel pr-headbar', x: 0, y: -250, w: 540, h: 140, body: `<div class="philo big">${HEADER}</div><span class="anchor-foot">${SUBHEAD}</span>` });
  const single = scPanel({ n: 2, tag: '② THE SINGLE · from $500', cls: 'sc-clushead pr-tier', open: 'single', x: -446, y: 36, w: 286, h: 222, body: tierPanelBody(TIERS[0]) });
  const edition = scPanel({ n: 3, tag: '② THE EDITION · most popular', cls: 'sc-hero pr-tier pr-pop accent-zone', open: 'edition', x: 0, y: 14, w: 344, h: 296, body: `<span class="pop-flag">★ MOST POPULAR</span>${tierPanelBody(TIERS[1])}` });
  const commission = scPanel({ n: 4, tag: '② THE COMMISSION · from $3,000', cls: 'sc-clushead pr-tier', open: 'commission', x: 446, y: 36, w: 286, h: 222, body: tierPanelBody(TIERS[2]) });
  const always = scPanel({ n: 5, tag: '③ ALWAYS INCLUDED', cls: 'sc-offerpanel', x: -396, y: 372, w: 284, h: 170, body: `<div class="clus-title">Always included</div><ul class="ticks two-col tight ai-ticks">${STANDARDS.map(tick).join('')}</ul>` });
  const faqP = scPanel({ n: 6, tag: '④ FAQ', cls: 'sc-clushead', open: 'faq', x: 0, y: 374, w: 286, h: 150, body: `<div class="clus-title">Honest answers</div><span class="lbl">why “from” · revisions · ownership · timing</span><span class="lbl" style="margin-top:6px;">${FAQ.length} questions · open to read ⤢</span>` });
  const ctaP = scPanel({ n: 7, tag: '⑤ CLOSING CTA', cls: 'sc-offerpanel sc-cta', x: 396, y: 366, w: 262, h: 150, body: `<div class="clus-title">Start the conversation</div><span class="lbl">not sure which? just reach out</span><span class="lbl" style="margin-top:6px;">CTA also pinned in the nav →</span>` });
  return `<div class="scase worlds">
      <div class="sc-head">Pricing <span>drag · scroll to zoom · click a tier or FAQ to open</span></div>
      <div class="sc-canvas"><svg class="sc-wires"></svg>
        ${headbar}${single}${edition}${commission}${always}${faqP}${ctaP}</div>
      <div class="wb-ctrls sc-ctrls"><button data-z="out">–</button><button data-z="home">⊚</button><button data-z="in">+</button></div>
    </div>
    <div class="sc-detail"><div class="detail-chrome"><span class="back-pill">← Back to pricing</span><span class="close-x">✕</span></div><div class="detail-body"></div></div>`;
}

/* ---------- nested canvas-in-a-canvas: radial map layout ---------- */
function ndHero(title: string, sub: string): string {
  return scPanel({ n: 1, tag: '① TIER', cls: 'sc-hero sc-dhero accent-zone', x: 0, y: -40, w: 292, h: 142, body: `<div class="pr-tname">${title}</div><div class="pr-price" style="margin-top:6px;">${sub}</div>` });
}
function ndP(n: number, tag: string, body: string, x: number, y: number, w: number, h: number, cls?: string): string {
  return scPanel({ n, tag, cls: 'sc-clushead' + (cls ? ' ' + cls : ''), x, y, w, h, body });
}
function ndCta(n: number, t: Tier): string {
  return scPanel({ n, tag: 'start', cls: 'sc-cta nd-cta-prom accent-zone', x: 0, y: 218, w: 392, h: 138, body: `<span class="nd-cta-lead">Ready when you are.</span><span class="btn cta-ring sc-btn-lg">${ctaText(t)}</span><span class="sc-sat-eyebrow">→ /contact?tier=${t.key}</span>` });
}
function nestedWrap(title: string, inner: string): string {
  return `<div class="scase nested">
      <div class="sc-head">${title} <span>drag · scroll to zoom</span></div>
      <div class="sc-canvas"><svg class="sc-wires"></svg>${inner}</div>
      <div class="wb-ctrls sc-ctrls"><button data-z="out">–</button><button data-z="home">⊚</button><button data-z="in">+</button></div>
    </div>`;
}
function tierDetailMap(t: Tier): string {
  const hero = ndHero(t.name, t.price);
  const includes = ndP(2, 'what’s included', `<ul class="ticks">${t.includes.map(tick).join('')}</ul>`, -326, -30, 254, 196, 'nd-inc');
  const bestFor = ndP(3, 'best for', `<div class="nd-best">${t.bestFor}</div>`, 326, -122, 248, 114, 'nd-best');
  const timeline = ndP(4, 'timeline', `<div class="nd-figure">${t.timeline}</div><span class="nd-foot">live · then ${t.care} of care</span>`, 326, 52, 248, 114, 'nd-fig');
  return nestedWrap(`${t.name} — detail map`, hero + includes + bestFor + timeline + ndCta(5, t));
}
function faqDetail(): string {
  const hero = scPanel({ n: 1, tag: '① FAQ', cls: 'sc-hero sc-dhero accent-zone', x: 0, y: -26, w: 300, h: 118, body: `<div class="pr-tname">FAQ</div><span class="nd-foot" style="margin-top:5px;">${FAQ.length} honest answers</span>` });
  const pos = [
    [-330, -156],
    [330, -156],
    [-330, 30],
    [330, 30],
    [0, 212],
  ];
  const tiles = FAQ.map((q, i) => ndP(i + 2, 'q' + (i + 1), `<div class="faq-q sm">${q[0]}</div><div class="faq-a sm">${q[1]}</div>`, pos[i][0], pos[i][1], 300, 134, 'nd-faq')).join('');
  return nestedWrap('FAQ — detail', hero + tiles);
}

export function detailFor(id: string): string {
  if (id === 'faq') return faqDetail();
  const t = TIERS.find((x) => x.key === id);
  if (!t) return '';
  return tierDetailMap(t);
}
