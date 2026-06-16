/* ============================================================
   Jawad Design — /work/[slug] case-study template wireframes
   3 directions, populated with weld. Reuses wireframe.css.
   ============================================================ */
window.SLUG = (function(){
  /* ---------- atoms ---------- */
  const bar  = (w='100%',h)=>`<div class="bar" style="width:${w}${h?`;height:${h}px`:''}"></div>`;
  const eye  = (n,pos)=>`<span class="eye" style="${pos}">${n}</span>`;
  const flag = (t,pos)=>`<span class="cta-flag" style="${pos}">${t}</span>`;
  const btn  = (txt,cls='')=>`<span class="btn ${cls}">${txt}</span>`;
  const lbl  = (t)=>`<span class="lbl">${t}</span>`;

  const STACK = 'Next.js · TypeScript · Tailwind · Supabase · Vercel';

  /* ---------- section fragments ---------- */
  const hero = (eyeN)=>`<div class="csec hero accent-zone">
      <span class="section-tag csec-tag">① HERO · full-bleed accent</span>
      <div class="proj-name">weld</div>
      <div class="bars" style="width:46%;margin-top:14px;">${bar('100%',11)}${bar('64%',11)}</div>
      ${flag('data-theme accent','top:12px;left:50%;transform:translateX(-50%);')}
      ${eyeN?eye(eyeN,'top:14px;right:14px;'):''}
    </div>`;

  const meta = (eyeN,sticky)=>`<div class="csec meta${sticky?' is-sticky':''}">
      <span class="section-tag csec-tag">② META${sticky?' · pinned (sticky)':''}</span>
      <div class="metarow">
        <div class="mcell">${lbl('Client')}<span class="mval">weld — own product</span></div>
        <div class="mcell">${lbl('Year')}<span class="mval">2025</span></div>
        <div class="mcell">${lbl('Services')}<span class="mval">Product · Design · Engineering</span></div>
      </div>
      ${eyeN?eye(eyeN,'top:8px;right:8px;'):''}
    </div>`;

  const problem = (eyeN)=>`<div class="csec">
      <span class="section-tag csec-tag">③ PROBLEM / AMBITION · lead with the problem</span>
      <div class="bars" style="width:78%;">${bar('100%',16)}${bar('86%',16)}</div>
      <div class="bars" style="width:64%;margin-top:14px;">${bar('100%',9)}${bar('100%',9)}${bar('72%',9)}</div>
      ${eyeN?eye(eyeN,'top:8px;right:8px;'):''}
    </div>`;

  const built = (eyeN)=>`<div class="csec">
      <span class="section-tag csec-tag">④ WHAT I BUILT · scope</span>
      <span class="solo-badge">designed + built solo</span>
      <div class="bars" style="width:70%;margin-top:12px;">${bar('100%',9)}${bar('100%',9)}${bar('58%',9)}</div>
      ${eyeN?eye(eyeN,'top:8px;right:8px;'):''}
    </div>`;

  const procImg = (label,parallax)=>`<div class="img proc-img" style="height:200px;">
      <span class="lbl">${label}</span>${parallax?flag('parallax','top:10px;left:10px;'):''}</div>`;
  const process = (eyeN)=>`<div class="csec flush">
      <span class="section-tag csec-tag">⑤ PROCESS · full-bleed imagery</span>
      <div class="col" style="gap:14px;position:relative;">
        ${procImg('process shot — exploration',true)}
        ${procImg('process shot — build / UI',true)}
        ${eyeN?eye(eyeN,'top:8px;right:8px;'):''}
      </div>
    </div>`;

  const stat = (num,cap)=>`<div class="stat"><span class="stat-num">${num}</span><span class="lbl">${cap}</span></div>`;
  const statRow = ()=>`<div class="statrow accent-zone" style="position:relative;">
      ${stat('200','signups')}${stat('$0','paid')}${stat('1','solo build')}
      ${flag('data-theme accent','top:-14px;left:14px;')}${flag('counts up on scroll','bottom:-15px;right:14px;')}</div>`;
  const stackLine = ()=>`<div class="stackline">${lbl('stack')}<span class="mval">${STACK}</span></div>`;
  const outcome = (eyeN)=>`<div class="csec">
      <span class="section-tag csec-tag">⑥ OUTCOME</span>
      ${statRow()}
      ${stackLine()}
      ${eyeN?eye(eyeN,'top:8px;right:8px;'):''}
    </div>`;

  const next = (eyeN)=>`<div class="csec next-row">
      <span class="section-tag csec-tag">⑦ NEXT</span>
      <div class="nextlinks">
        <span class="nlink">← Back to canvas</span>
        <span class="nlink">Next panel →</span>
      </div>
      ${eyeN?eye(eyeN,'top:8px;right:8px;'):''}
    </div>`;

  const cta = (eyeN)=>`<div class="csec cta-sec" style="background:var(--paper-2);">
      <span class="section-tag csec-tag">⑧ CONTACT CTA</span>
      <div class="bars" style="width:40%;margin:0 auto 16px;align-items:center;">${bar('100%',13)}</div>
      <div style="position:relative;display:inline-block;">${btn('Work with me ▸','cta-ring')}${flag('Primary CTA → /contact','top:-17px;left:50%;transform:translateX(-50%);')}${eyeN?eye(eyeN,'top:6px;right:-34px;'):''}</div>
    </div>`;

  /* ---------- sheets (desktop) ---------- */
  function sheetA(){
    return `<div class="sheet">${hero(1)}${meta(2)}${problem(3)}${built(4)}${process(5)}${outcome(6)}${next(7)}${cta(8)}</div>`;
  }
  function sheetB(){
    return `<div class="sheet">${hero(1)}
        <div class="split">
          <aside class="split-left">${meta(2,true)}</aside>
          <div class="split-right">${problem(3)}${built(4)}${process(5)}${outcome(6)}</div>
        </div>
        ${next(7)}${cta(8)}</div>`;
  }
  function beat(num,cap,bodyHTML,eyeN){
    return `<div class="beat"><div class="beat-num">${num}<span class="lbl">${cap}</span></div><div class="beat-body">${bodyHTML}${eyeN?eye(eyeN,'top:-4px;right:0;'):''}</div></div>`;
  }
  function sheetC(){
    const pBody = `<span class="section-tag csec-tag">③ PROBLEM / AMBITION</span><div class="bars" style="width:90%;">${bar('100%',13)}${bar('76%',13)}</div>`;
    const bBody = `<span class="section-tag csec-tag">④ WHAT I BUILT · solo</span><div class="bars" style="width:88%;">${bar('100%',9)}${bar('100%',9)}${bar('60%',9)}</div>`;
    const prBody= `<span class="section-tag csec-tag">⑤ PROCESS</span>${procImg('process shot — full-bleed',true)}`;
    return `<div class="sheet">${hero(1)}${meta(2)}
        <div class="beats accent-zone" style="position:relative;">
          ${flag('data-theme accent · counts up on scroll','top:-14px;left:14px;')}
          ${beat('200','signups',pBody,3)}
          ${beat('$0','paid',bBody,4)}
          ${beat('1','solo build',prBody,5)}
        </div>
        <div class="csec">${stackLine()}${eye(6,'top:8px;right:8px;')}</div>
        ${next(7)}${cta(8)}</div>`;
  }

  /* ---------- mobile sheet (single column) ---------- */
  function sheetM(dir){
    const proc = `<div class="csec flush"><span class="section-tag csec-tag">⑤ PROCESS</span><div class="col" style="gap:12px;">${procImg('process shot',true)}${procImg('process shot',true)}</div></div>`;
    if(dir==='D') return sheetD();
    if(dir==='C') return `<div class="sheet">${hero(1)}${meta(2)}
        <div class="beats accent-zone" style="position:relative;">${flag('accent · counter','top:-13px;left:10px;')}
          ${beat('200','signups',`<div class="bars" style="width:96%;">${bar('100%',10)}${bar('70%',10)}</div>`)}
          ${beat('$0','paid',`<div class="bars" style="width:96%;">${bar('100%',9)}${bar('60%',9)}</div>`)}
          ${beat('1','solo',procImg('process shot',true))}</div>
        <div class="csec">${stackLine()}</div>${next(7)}${cta(8)}</div>`;
    return `<div class="sheet">${hero(1)}${meta(2)}${problem(3)}${built(4)}${proc}${outcome(6)}${next(7)}${cta(8)}</div>`;
  }

  /* ---------- D · compact nested canvas (canvas-in-a-canvas) ---------- */
  // Each section becomes a compact panel placed spatially around the weld hero.
  // offsets are px from the nested canvas centre. n = reading-order badge.
  function scasePanel(o){
    const base=`left:calc(50% + ${o.x}px);top:calc(50% + ${o.y}px);width:${o.w}px;height:${o.h}px;`;
    const badge = o.n?`<span class="sc-num">${o.n}</span>`:'';
    return `<div class="sc-panel${o.cls?' '+o.cls:''}" style="${base}">${badge}
        <span class="sc-tag">${o.tag}</span>
        <div class="sc-body">${o.body}</div>
        ${o.flag?flag(o.flag,'top:-13px;left:10px;'):''}
        ${o.cur?'<span class="view-cur">VIEW</span>':''}
      </div>`;
  }
  function sheetD(){
    const microMeta = `<div class="sc-meta">
        <div><span class="lbl">Client</span><span class="mval">weld — own product</span></div>
        <div><span class="lbl">Year</span><span class="mval">2025</span></div>
        <div><span class="lbl">Services</span><span class="mval">Product · Design · Eng</span></div></div>`;
    const miniStats = `<div class="sc-stats">
        <div class="sc-stat"><span class="sc-statnum">200</span><span class="lbl">signups</span></div>
        <div class="sc-stat"><span class="sc-statnum">$0</span><span class="lbl">paid</span></div>
        <div class="sc-stat"><span class="sc-statnum">1</span><span class="lbl">solo</span></div></div>`;
    const twoThumbs = `<div class="sc-thumbs"><div class="img" style="flex:1;height:100%;"></div><div class="img" style="flex:1;height:100%;"></div></div>`;
    const panels = [
      {n:1,tag:'① HERO',cls:'sc-hero accent-zone',x:0,   y:-26, w:248,h:150,
        body:`<div class="sc-proj">weld</div><div class="bars" style="width:80%;margin-top:8px;">${bar('100%',8)}${bar('60%',8)}</div>`, cur:true},
      {n:2,tag:'② META',          x:308, y:-176, w:212,h:118, body:microMeta},
      {n:3,tag:'③ PROBLEM',       x:-318,y:-168, w:214,h:128,
        body:`<div class="bars" style="width:92%;">${bar('100%',12)}${bar('78%',12)}</div><div class="bars" style="width:80%;margin-top:8px;">${bar('100%',7)}${bar('66%',7)}</div>`},
      {n:4,tag:'④ WHAT I BUILT',  x:-330,y:108,  w:206,h:122,
        body:`<span class="solo-badge">built solo</span><div class="bars" style="width:88%;margin-top:9px;">${bar('100%',7)}${bar('100%',7)}${bar('54%',7)}</div>`},
      {n:5,tag:'⑤ PROCESS',       x:318, y:96,   w:230,h:140, flag:'parallax', body:twoThumbs},
      {n:6,tag:'⑥ OUTCOME',cls:'accent-zone',x:0,y:188,w:300,h:128, flag:'counts up on scroll', body:miniStats},
      {n:7,tag:'⑦ STACK',         x:0,   y:344,  w:330,h:62,
        body:`<span class="mval" style="font-size:11px;">Next.js · TypeScript · Tailwind · Supabase · Vercel</span>`},
      {n:8,tag:'⑧ CONTACT',cls:'sc-cta',x:330,y:286,w:206,h:118,
        body:`<div class="bars" style="width:78%;margin-bottom:9px;">${bar('100%',9)}</div>${btn('Work with me ▸','cta-ring')}`},
    ];
    return `<div class="scase">
        <div class="sc-head">weld — case study <span>nested canvas · drag · scroll to zoom</span></div>
        <div class="sc-canvas">
          <svg class="sc-wires"></svg>
          ${panels.map(scasePanel).join('')}
        </div>
        <div class="sc-next">Next panel →</div>
        <div class="wb-ctrls sc-ctrls"><button data-z="out">–</button><button data-z="home">⊚</button><button data-z="in">+</button></div>
      </div>`;
  }

  return { sheetA, sheetB, sheetC, sheetD, sheetM };
})();
