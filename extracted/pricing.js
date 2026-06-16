/* ============================================================
   Jawad Design — /pricing wireframes
   3 linear directions (cards · table · editorial) + D openable canvas.
   Three tiers, $500 floor. Reuses wireframe.css + the shared sc-* canvas CSS.
   ============================================================ */
window.PRICE = (function(){
  /* ---------- atoms ---------- */
  const bar  = (w='100%',h)=>`<div class="bar" style="width:${w}${h?`;height:${h}px`:''}"></div>`;
  const eye  = (n,pos)=>`<span class="eye" style="${pos}">${n}</span>`;
  const flag = (t,pos)=>`<span class="cta-flag" style="${pos}">${t}</span>`;
  const btn  = (txt,cls='')=>`<span class="btn ${cls}">${txt}</span>`;
  const tick = (t)=>`<li class="tick"><span class="tk">✓</span>${t}</li>`;
  const lbl  = (t)=>`<span class="lbl">${t}</span>`;

  /* ---------- content ---------- */
  const HEADER = 'Three ways to work together.';
  const SUBHEAD = 'Prices are where the conversation starts.';
  const TIERS = [
    {key:'single', name:'The Single', price:'from $500', popular:false,
     line:'A focused site, live in a week.',
     bestFor:'a one-pager or a small, sharp site',
     includes:['up to 3 pages','copy direction','1 revision','live in 5 days','30 days care'],
     timeline:'5 days', care:'30 days', rev:'1 revision', fits:'a photographer’s one-page portfolio'},
    {key:'edition', name:'The Edition', price:'from $1,200', popular:true,
     line:'Room to grow, and a look that travels.',
     bestFor:'founders who need a site that can expand',
     includes:['up to 5 pages','copy + light brand polish','2 revisions','CMS','source files'],
     timeline:'1–2 weeks', care:'30 days', rev:'2 revisions', fits:'a founder’s 5-page product site + waitlist'},
    {key:'commission', name:'The Commission', price:'from $3,000', popular:false,
     line:'A flagship site that has to land.',
     bestFor:'a signature site with a moment of craft',
     includes:['full multi-page site','one signature interaction','full brand system','3 revisions','priority + 60 days care'],
     timeline:'3–5 weeks', care:'60 days', rev:'3 revisions', fits:'a studio’s flagship site with a signature scroll moment'},
  ];
  const STANDARDS = ['loads under a second','SEO done right','you own it','no lock-in','responsive','measured'];
  const PROCESS = [['Brief','day 1'],['Direction','day 2'],['Build','day 3'],['Polish','day 4'],['Ship','day 5']];
  const FAQ = [
    ['Why does every price say “from”?','Scope sets the final number — “from” is the floor, not a bait. You get a fixed quote before we start.'],
    ['What if I need more revisions?','Extra rounds are billed hourly at a rate we agree up front. No surprises on the invoice.'],
    ['Do you offer retainers?','Care windows cover the launch period. Ongoing work is a separate, simple monthly.'],
    ['Who owns the finished work?','You do — the code, the domain, the accounts, and the source files. No lock-in, ever.'],
    ['How soon can we start?','I take one project at a time. Typically there’s an opening within two weeks.'],
  ];
  const ctaText = (t)=>`Start ${t.name.replace('The ','a ')} ▸`; // "Start a Single ▸" etc.

  /* ---------- shared sections ---------- */
  function header(ix,eyeN){
    return `<div class="pr-sec header"><span class="section-tag csec-tag">${ix} HEADER</span>
      <div class="pr-headline">${HEADER}</div>
      <div class="pr-sub">${SUBHEAD}</div>${eyeN?eye(eyeN,'top:10px;right:10px;'):''}</div>`;
  }
  function alwaysIncluded(ix,eyeN){
    return `<div class="pr-sec"><span class="section-tag csec-tag">${ix} ALWAYS INCLUDED · six standards</span>
      <div class="std-strip">${STANDARDS.map(s=>`<span class="std-item">${s}</span>`).join('')}</div>${eyeN?eye(eyeN,'top:10px;right:10px;'):''}</div>`;
  }
  function processStrip(ix,eyeN){
    return `<div class="pr-sec"><span class="section-tag csec-tag">${ix} PROCESS · 5-day path</span>
      <div class="proc-row">${PROCESS.map((p,i)=>`<div class="proc-step"><span class="proc-dot">${i+1}</span><span class="proc-name">${p[0]}</span><span class="lbl">${p[1]}</span></div>${i<PROCESS.length-1?'<span class="proc-arrow">→</span>':''}`).join('')}</div>${eyeN?eye(eyeN,'top:10px;right:10px;'):''}</div>`;
  }
  function faq(ix,eyeN){
    return `<div class="pr-sec"><span class="section-tag csec-tag">${ix} FAQ · honest answers</span>
      <div class="faq-list">${FAQ.map(q=>`<div class="faq-item"><div class="faq-q">${q[0]}</div><div class="faq-a">${q[1]}</div></div>`).join('')}</div>${eyeN?eye(eyeN,'top:10px;right:10px;'):''}</div>`;
  }
  function closingCta(ix,eyeN){
    return `<div class="pr-sec cta-sec center"><span class="section-tag csec-tag">${ix} CLOSING CTA</span>
      <div class="pr-close-line">Not sure which? Start the conversation.</div>
      <div style="position:relative;display:inline-block;margin-top:14px;">${btn('Work with me ▸','cta-ring')}${flag('→ /contact','top:-17px;left:50%;transform:translateX(-50%);')}${eyeN?eye(eyeN,'top:6px;right:-34px;'):''}</div></div>`;
  }

  /* ---------- tier card (Direction A) ---------- */
  function tierCard(t,eyeN){
    return `<div class="pr-card${t.popular?' popular accent-zone':''}">
      ${t.popular?'<span class="pop-flag">★ MOST POPULAR</span>':''}
      <div class="pr-tname">${t.name}</div>
      <div class="pr-price">${t.price}</div>
      <div class="pr-line">${t.line}</div>
      <ul class="ticks">${t.includes.map(tick).join('')}</ul>
      <div style="position:relative;margin-top:auto;">${btn(ctaText(t), t.popular?'cta-ring':'')}${t.popular?flag('Primary → /contact?tier','top:-17px;left:50%;transform:translateX(-50%);'):''}${eyeN?eye(eyeN,'top:-10px;right:-10px;'):''}</div>
    </div>`;
  }
  function sheetA(){
    return `<div class="pr-sheet">${header('①',1)}
      <div class="pr-sec cards-sec"><span class="section-tag csec-tag">② TIERS · cards, middle raised</span>
        <div class="pr-cards">${tierCard(TIERS[0])}${tierCard(TIERS[1],2)}${tierCard(TIERS[2])}</div></div>
      ${alwaysIncluded('③',3)}${faq('④',4)}${closingCta('⑤',5)}</div>`;
  }

  /* ---------- comparison table (Direction B) ---------- */
  function sheetB(){
    const rows = [
      ['pages','up to 3','up to 5','full multi-page'],
      ['copy','direction','+ light brand polish','+ full brand system'],
      ['revisions','1','2','3'],
      ['CMS','—','✓','✓'],
      ['source files','—','✓','✓'],
      ['signature interaction','—','—','✓'],
      ['care','30 days','30 days','priority · 60 days'],
      ['live in','5 days','1–2 weeks','3–5 weeks'],
    ];
    const cell=(v)=>`<td class="${v==='✓'?'yes':(v==='—'?'no':'')}">${v}</td>`;
    return `<div class="pr-sheet">${header('①',1)}
      <div class="pr-sec"><span class="section-tag csec-tag">② TIERS · comparison table</span>
        <table class="pr-table">
          <thead><tr><th></th>
            <th>The Single<span class="th-price">from $500</span></th>
            <th class="pop-col">The Edition<span class="pop-flag inline">★ MOST POPULAR</span><span class="th-price">from $1,200</span></th>
            <th>The Commission<span class="th-price">from $3,000</span></th></tr></thead>
          <tbody>${rows.map(r=>`<tr><th class="rowh">${r[0]}</th>${cell(r[1])}<td class="pop-col">${r[2]==='✓'?'<span class="yes">✓</span>':(r[2]==='—'?'<span class="no">—</span>':r[2])}</td>${cell(r[3])}</tr>`).join('')}
            <tr class="cta-row"><th class="rowh"></th>
              <td>${btn('Start a Single ▸')}</td>
              <td class="pop-col" style="position:relative;">${btn('Start an Edition ▸','cta-ring')}${flag('Primary','top:-15px;left:50%;transform:translateX(-50%);')}</td>
              <td>${btn('Start a Commission ▸')}</td></tr>
          </tbody>
        </table>${eye(2,'top:8px;right:8px;')}</div>
      ${alwaysIncluded('③',3)}${faq('④',4)}${closingCta('⑤',5)}</div>`;
  }

  /* ---------- editorial rows (Direction C) ---------- */
  function tierRow(t,num,eyeN){
    return `<div class="pr-row${t.popular?' heavy accent-zone':''}">
      ${t.popular?'<span class="pop-flag">★ MOST POPULAR</span>':''}
      <div class="row-num">0${num}</div>
      <div class="row-id"><div class="pr-tname${t.popular?'':' sm'}">${t.name}</div><div class="pr-price${t.popular?'':' sm'}">${t.price}</div><div class="pr-line">${t.line}</div></div>
      <div class="row-inc"><ul class="ticks two-col">${t.includes.map(tick).join('')}</ul>
        <div style="position:relative;">${btn(ctaText(t), t.popular?'cta-ring':'')}${eyeN?eye(eyeN,'top:-10px;right:-10px;'):''}</div></div>
    </div>`;
  }
  function sheetC(){
    return `<div class="pr-sheet">${header('①',1)}
      <div class="pr-sec"><span class="section-tag csec-tag">② TIERS · editorial rows, middle heavier</span>
        <div class="pr-rows">${tierRow(TIERS[0],1)}${tierRow(TIERS[1],2,2)}${tierRow(TIERS[2],3)}</div></div>
      ${alwaysIncluded('③',3)}${faq('④',4)}${closingCta('⑤',5)}</div>`;
  }

  /* ============================================================
     D · openable canvas — header anchor + tiers + supporting panels
     ============================================================ */
  function scPanel(o){
    const base=`left:calc(50% + ${o.x}px);top:calc(50% + ${o.y}px);width:${o.w}px;height:${o.h}px;`;
    const open=o.open?` data-open="${o.open}"`:'';
    return `<div class="sc-panel${o.cls?' '+o.cls:''}${o.open?' openable':''}" style="${base}"${open}>
        ${o.n?`<span class="sc-num">${o.n}</span>`:''}
        ${o.tag?`<span class="sc-tag">${o.tag}</span>`:''}
        <div class="sc-body">${o.body}</div>
        ${o.flag?flag(o.flag,'top:-13px;left:10px;'):''}
        ${o.open?'<span class="sc-open-cur">OPEN ⤢</span>':''}
      </div>`;
  }
  function tierPanelBody(t){
    return `<div class="pr-tname${t.popular?'':' sm'}">${t.name}</div><div class="pr-price${t.popular?'':' sm'}">${t.price}</div>
      <ul class="ticks tight">${t.includes.slice(0,3).map(tick).join('')}<li class="tick more">+${t.includes.length-3} more inside ⤢</li></ul>`;
  }
  function sheetD(){
    // value ladder: Single ($500) left → Edition ($1.2k) centre → Commission ($3k) right.
    // The Edition is the HUB (sc-hero) — wires radiate from it; it is the visual centre/anchor.
    const headbar = scPanel({n:1,tag:'① HEADER',cls:'sc-offerpanel pr-headbar',x:0,y:-250,w:540,h:140,
      body:`<div class="philo big">${HEADER}</div><span class="anchor-foot">${SUBHEAD}</span>`});
    const single = scPanel({n:2,tag:'② THE SINGLE · from $500',cls:'sc-clushead pr-tier',open:'single',x:-446,y:36,w:286,h:222,body:tierPanelBody(TIERS[0])});
    const edition = scPanel({n:3,tag:'② THE EDITION · most popular',cls:'sc-hero pr-tier pr-pop accent-zone',open:'edition',x:0,y:14,w:344,h:296,
      body:`<span class="pop-flag">★ MOST POPULAR</span>${tierPanelBody(TIERS[1])}`});
    const commission = scPanel({n:4,tag:'② THE COMMISSION · from $3,000',cls:'sc-clushead pr-tier',open:'commission',x:446,y:36,w:286,h:222,body:tierPanelBody(TIERS[2])});
    const always = scPanel({n:5,tag:'③ ALWAYS INCLUDED',cls:'sc-offerpanel',x:-396,y:372,w:284,h:170,
      body:`<div class="clus-title">Always included</div><ul class="ticks two-col tight ai-ticks">${STANDARDS.map(tick).join('')}</ul>`});
    const faqP = scPanel({n:6,tag:'④ FAQ',cls:'sc-clushead',open:'faq',x:0,y:374,w:286,h:150,
      body:`<div class="clus-title">Honest answers</div><span class="lbl">why “from” · revisions · ownership · timing</span><span class="lbl" style="margin-top:6px;">${FAQ.length} questions · open to read ⤢</span>`});
    const ctaP = scPanel({n:7,tag:'⑤ CLOSING CTA',cls:'sc-offerpanel sc-cta',x:396,y:366,w:262,h:150,
      body:`<div class="clus-title">Start the conversation</div><span class="lbl">not sure which? just reach out</span><span class="lbl" style="margin-top:6px;">CTA also pinned in the nav →</span>`});
    return `<div class="scase worlds">
        <div class="sc-head">Pricing <span>drag · scroll to zoom · click a tier or FAQ to open</span></div>
        <div class="sc-canvas"><svg class="sc-wires"></svg>
          ${headbar}${single}${edition}${commission}${always}${faqP}${ctaP}</div>
        <div class="wb-ctrls sc-ctrls"><button data-z="out">–</button><button data-z="home">⊚</button><button data-z="in">+</button></div>
      </div>
      <div class="sc-detail"><div class="detail-chrome"><span class="back-pill">← Back to pricing</span><span class="close-x">✕</span></div><div class="detail-body"></div></div>`;
  }

  /* ---------- nested canvas-in-a-canvas: radial layout (like the work slug) ---------- */
  function ndHero(title,sub){
    return scPanel({n:1,tag:'① TIER',cls:'sc-hero sc-dhero accent-zone',x:0,y:-40,w:292,h:142,
      body:`<div class="pr-tname">${title}</div><div class="pr-price" style="margin-top:6px;">${sub}</div>`});
  }
  function ndP(n,tag,body,x,y,w,h,cls){
    return scPanel({n:n,tag:tag,cls:'sc-clushead'+(cls?' '+cls:''),x:x,y:y,w:w,h:h,body:body});
  }
  function ndCta(n,t){
    return scPanel({n:n,tag:'start',cls:'sc-cta nd-cta-prom accent-zone',x:0,y:218,w:392,h:138,
      body:`<span class="nd-cta-lead">Ready when you are.</span><span class="btn cta-ring sc-btn-lg">${ctaText(t)}</span><span class="sc-sat-eyebrow">→ /contact?tier=${t.key}</span>`});
  }
  function nestedWrap(title,inner){
    return `<div class="scase nested">
        <div class="sc-head">${title} <span>drag · scroll to zoom</span></div>
        <div class="sc-canvas"><svg class="sc-wires"></svg>${inner}</div>
        <div class="wb-ctrls sc-ctrls"><button data-z="out">–</button><button data-z="home">⊚</button><button data-z="in">+</button></div>
      </div>`;
  }
  // hero centred; panels orbit with numbered badges; prominent CTA anchors the bottom
  function tierDetailMap(t){
    const hero = ndHero(t.name, t.price);
    const includes = ndP(2,'what’s included',`<ul class="ticks">${t.includes.map(tick).join('')}</ul>`,-326,-30,254,196,'nd-inc');
    const bestFor = ndP(3,'best for',`<div class="nd-best">${t.bestFor}</div>`,326,-122,248,114,'nd-best');
    const timeline = ndP(4,'timeline',`<div class="nd-figure">${t.timeline}</div><span class="nd-foot">live · then ${t.care} of care</span>`,326,52,248,114,'nd-fig');
    return nestedWrap(`${t.name} — detail map`, hero+includes+bestFor+timeline+ndCta(5,t));
  }
  function tierDetailScope(t){
    const hero = ndHero(t.name, t.price);
    const deliver = ndP(2,'deliverables',`<ul class="ticks">${t.includes.map(tick).join('')}</ul>`,-326,-30,254,196,'nd-inc');
    const terms = ndP(3,'revisions + care',`<div class="nd-figure">${t.rev}</div><span class="nd-foot">then ${t.care} of care · live in ${t.timeline}</span>`,326,-122,248,114,'nd-fig');
    const fits = ndP(4,'what fits this budget',`<div class="nd-best">${t.fits}</div>`,326,52,248,114,'nd-best');
    return nestedWrap(`${t.name} — scope sheet`, hero+deliver+terms+fits+ndCta(5,t));
  }
  function faqDetail(){
    const hero = scPanel({n:1,tag:'① FAQ',cls:'sc-hero sc-dhero accent-zone',x:0,y:-26,w:300,h:118,
      body:`<div class="pr-tname">FAQ</div><span class="nd-foot" style="margin-top:5px;">${FAQ.length} honest answers</span>`});
    const pos=[[-330,-156],[330,-156],[-330,30],[330,30],[0,212]];
    const tiles = FAQ.map((q,i)=>ndP(i+2,'q'+(i+1),`<div class="faq-q sm">${q[0]}</div><div class="faq-a sm">${q[1]}</div>`,pos[i][0],pos[i][1],300,134,'nd-faq')).join('');
    return nestedWrap('FAQ — detail', hero+tiles);
  }
  function detailFor(id){
    if(id==='faq') return faqDetail();
    const t = TIERS.find(x=>x.key===id);
    if(!t) return '';
    const mode = (document.body.getAttribute('data-tiermode')||'map');
    return mode==='scope' ? tierDetailScope(t) : tierDetailMap(t);
  }

  /* ---------- mobile (single column; popular tier FIRST) ---------- */
  function mTierCard(t){
    return `<div class="pr-card${t.popular?' popular accent-zone':''}">${t.popular?'<span class="pop-flag">★ MOST POPULAR</span>':''}
      <div class="pr-tname sm">${t.name}</div><div class="pr-price">${t.price}</div><div class="pr-line">${t.line}</div>
      <ul class="ticks">${t.includes.map(tick).join('')}</ul>${btn(ctaText(t), t.popular?'cta-ring':'')}</div>`;
  }
  function sheetM(dir){
    if(dir==='D') return sheetD();
    // popular tier first on mobile
    const order=[TIERS[1],TIERS[0],TIERS[2]];
    const cards = `<div class="pr-sec"><span class="section-tag csec-tag">② TIERS · popular first</span><div class="pr-cards stackM">${order.map(mTierCard).join('')}</div></div>`;
    return `<div class="pr-sheet">${header('①',1)}${cards}${alwaysIncluded('③')}${faq('④')}${closingCta('⑤')}</div>`;
  }

  return { sheetA, sheetB, sheetC, sheetD, sheetM, detailFor };
})();
