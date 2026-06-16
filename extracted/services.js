/* ============================================================
   Jawad Design — /services wireframes
   3 linear directions + D nested canvas. Reuses wireframe.css.
   Outcome-first voice throughout.
   ============================================================ */
window.SVC = (function(){
  /* ---------- atoms ---------- */
  const bar  = (w='100%',h)=>`<div class="bar" style="width:${w}${h?`;height:${h}px`:''}"></div>`;
  const eye  = (n,pos)=>`<span class="eye" style="${pos}">${n}</span>`;
  const flag = (t,pos)=>`<span class="cta-flag" style="${pos}">${t}</span>`;
  const btn  = (txt,cls='')=>`<span class="btn ${cls}">${txt}</span>`;
  const chip = (t)=>`<span class="chip">${t}</span>`;

  /* ---------- content ---------- */
  const PHILOSOPHY = 'Two things, done exceptionally.';
  const SERVICES = [
    {name:'Portfolio sites', for:'for creatives',
     outcome:'You get a site that earns trust in the first three seconds.',
     ex:['photographers','illustrators','studios'],
     deliver:['responsive build','your CMS or static','contact + analytics','SEO basics','you own the code']},
    {name:'Landing pages', for:'for founders',
     outcome:'You get one page that turns a launch into signups.',
     ex:['waitlists','pre-orders','demos'],
     deliver:['one focused page','signup / waitlist form','A/B-ready copy slots','fast + measured','you own it']},
    {name:'A light brand system', for:'with every project',
     outcome:'You get a consistent look you can keep running yourself.',
     ex:['type + colour','logo lockup','UI components'],
     deliver:['type + colour scale','logo lockup','reusable components','usage notes','handover files']},
  ];
  const STANDARDS = ['loads under a second','SEO done right','you own it','no lock-in','responsive','measured'];
  const STD_GLOSS = {
    'loads under a second':'a performance budget on every page',
    'SEO done right':'semantic, indexable, sitemap + meta',
    'you own it':'your repo, your domain, your accounts',
    'no lock-in':'no proprietary builder to escape',
    'responsive':'great from 320px to ultrawide',
    'measured':'analytics wired in from day one',
  };

  const chips = (arr)=>`<div class="chips">${arr.map(chip).join('')}</div>`;

  /* ---------- header ---------- */
  const header = (eyeN)=>`<div class="svc-sec header">
      <span class="section-tag csec-tag">① HEADER · philosophy</span>
      <div class="philo">${PHILOSOPHY}</div>
      ${eyeN?eye(eyeN,'top:10px;right:10px;'):''}
    </div>`;

  /* ---------- standards strips (vary per direction) ---------- */
  function standards(variant,eyeN){
    const tag = `<span class="section-tag csec-tag">③ ALWAYS INCLUDED · six standards</span>`;
    if(variant==='grid'){
      const cells = STANDARDS.map(s=>`<div class="std-cell"><span class="std-ico"></span><span class="std-lbl">${s}</span></div>`).join('');
      return `<div class="svc-sec standards">${tag}<div class="std-grid">${cells}</div>${eyeN?eye(eyeN,'top:10px;right:10px;'):''}</div>`;
    }
    if(variant==='inline'){
      return `<div class="svc-sec standards"><span class="section-tag csec-tag">③ ALWAYS INCLUDED</span>
        <div class="std-inline">${STANDARDS.map(s=>`<span>${s}</span>`).join('')}</div>${eyeN?eye(eyeN,'top:10px;right:10px;'):''}</div>`;
    }
    // default: single-row strip
    return `<div class="svc-sec standards">${tag}
      <div class="std-strip">${STANDARDS.map(s=>`<span class="std-item">${s}</span>`).join('')}</div>
      ${eyeN?eye(eyeN,'top:10px;right:10px;'):''}</div>`;
  }

  /* ---------- CTA ---------- */
  const cta = (eyeN)=>`<div class="svc-sec cta-sec">
      <span class="section-tag csec-tag">④ CTA</span>
      <div class="cta-pair">
        <span style="position:relative;display:inline-block;">${btn('See pricing ▸','cta-ring')}${flag('Primary → /pricing','top:-17px;left:50%;transform:translateX(-50%);')}</span>
        <span class="btn ghost-btn">Work with me ▸</span>
      </div>
      <span class="lbl" style="margin-top:8px;">secondary → /contact</span>
      ${eyeN?eye(eyeN,'top:10px;right:10px;'):''}
    </div>`;

  /* ============================================================
     A · three stacked full-width bands (name left, outcome right)
     ============================================================ */
  function serviceBandA(s,num,eyeN){
    return `<div class="svc-sec svc-band">
      <span class="section-tag csec-tag">② SERVICE ${num}</span>
      <div class="band-grid">
        <div class="name-col"><div class="svc-name">${s.name}</div><span class="svc-for">${s.for}</span></div>
        <div class="out-col"><div class="svc-outcome">${s.outcome}</div>${chips(s.ex)}</div>
      </div>
      ${eyeN?eye(eyeN,'top:10px;right:10px;'):''}
    </div>`;
  }
  function sheetA(){
    return `<div class="svc-sheet">
      ${header(1)}
      ${serviceBandA(SERVICES[0],1,2)}
      ${serviceBandA(SERVICES[1],2)}
      ${serviceBandA(SERVICES[2],3)}
      ${standards('strip',3)}
      ${cta(4)}
    </div>`;
  }

  /* ============================================================
     B · alternating zig-zag anchors + icon-grid standards
     ============================================================ */
  function serviceZig(s,num,side,eyeN){
    const anchor = `<div class="zig-anchor img"><span class="lbl">anchor image</span></div>`;
    const text = `<div class="zig-text"><div class="svc-name">${s.name}</div><span class="svc-for">${s.for}</span>
        <div class="svc-outcome">${s.outcome}</div>${chips(s.ex)}</div>`;
    const inner = side==='left' ? anchor+text : text+anchor;
    return `<div class="svc-sec svc-zig ${side}">
      <span class="section-tag csec-tag">② SERVICE ${num} · ${side==='left'?'anchor left':'anchor right'}</span>
      <div class="zig-grid">${inner}</div>
      ${eyeN?eye(eyeN,'top:10px;right:10px;'):''}
    </div>`;
  }
  function sheetB(){
    return `<div class="svc-sheet">
      ${header(1)}
      ${serviceZig(SERVICES[0],1,'left',2)}
      ${serviceZig(SERVICES[1],2,'right')}
      ${serviceZig(SERVICES[2],3,'left')}
      ${standards('grid',3)}
      ${cta(4)}
    </div>`;
  }

  /* ============================================================
     C · manifesto-first: oversized philosophy fills screen 1,
         services as compact numbered entries below
     ============================================================ */
  function svcEntry(s,num,eyeN){
    return `<div class="svc-entry">
      <span class="entry-num">0${num}</span>
      <div class="entry-body">
        <div class="entry-head"><span class="svc-name sm">${s.name}</span><span class="svc-for">${s.for}</span></div>
        <div class="svc-outcome">${s.outcome}</div>${chips(s.ex)}
      </div>${eyeN?eye(eyeN,'top:-2px;right:0;'):''}
    </div>`;
  }
  function sheetC(){
    return `<div class="svc-sheet">
      <div class="svc-sec manifesto">
        <span class="section-tag csec-tag">① MANIFESTO · fills the first screen</span>
        <div class="manifesto-line">${PHILOSOPHY}</div>
        <span class="lbl manifesto-sub">scroll for the two things ↓</span>
        ${eye(1,'top:12px;right:12px;')}
      </div>
      <div class="svc-sec entries">
        <span class="section-tag csec-tag">② SERVICES · compact numbered entries</span>
        ${svcEntry(SERVICES[0],1,2)}
        ${svcEntry(SERVICES[1],2)}
        ${svcEntry(SERVICES[2],3)}
      </div>
      ${standards('inline',3)}
      ${cta(4)}
    </div>`;
  }

  /* ============================================================
     D · always-on nested canvas — THREE SERVICE WORLDS
        Three spatial clusters you pan between; each service groups
        its name + outcome + example tiles together. A philosophy
        anchor ties all three worlds (and the offer panels) together.
     ============================================================ */
  function scPanel(o){
    const base=`left:calc(50% + ${o.x}px);top:calc(50% + ${o.y}px);width:${o.w}px;height:${o.h}px;`;
    const data=o.cluster?` data-cluster="${o.cluster}"`:'';
    const open=o.open?` data-open="${o.open}"`:'';
    return `<div class="sc-panel${o.cls?' '+o.cls:''}${o.open?' openable':''}" style="${base}"${data}${open}>
        ${o.n?`<span class="sc-num">${o.n}</span>`:''}
        ${o.tag?`<span class="sc-tag">${o.tag}</span>`:''}
        <div class="sc-body">${o.body}</div>
        ${o.flag?flag(o.flag,'top:-13px;left:10px;'):''}
        ${o.open?'<span class="sc-open-cur">OPEN ⤢</span>':''}
      </div>`;
  }

  /* ---------- MAIN canvas: 6 showstopper panels, no satellites ---------- */
  function sheetD(){
    const anchor = scPanel({n:1,tag:'① PHILOSOPHY · the offer',cls:'sc-hero sc-anchor accent-zone',
      x:0,y:-244,w:480,h:182,
      body:`<span class="anchor-eyebrow">the whole offer — in one line</span><div class="philo big">${PHILOSOPHY}</div><span class="anchor-foot">click a service or panel to open it ⤢</span>`});
    // panels 2 & 3 — the two CORE services, substantial; panel 4 (brand) is the lighter “+ bonus”
    const svcCore=(s,n,id,x,y)=>scPanel({n:n,tag:`② SERVICE ${n-1} · core`,cls:'sc-clushead sc-svc-core',open:id,x:x,y:y,w:336,h:222,
      body:`<div class="svc-name md">${s.name}</div><span class="svc-for">${s.for}</span><div class="svc-outcome">${s.outcome}</div><div class="chips">${s.ex.map(e=>`<span class="chip">${e}</span>`).join('')}</div><span class="sc-deliver-hint">+ what you get inside ⤢</span>`});
    const svcBonus=(s,id,x,y)=>scPanel({n:4,tag:'② SERVICE 3 · with every project',cls:'sc-clushead sc-svc-bonus',open:id,x:x,y:y,w:312,h:150,
      body:`<div class="svc-name sm">${s.name}</div><span class="svc-for">${s.for}</span><div class="svc-outcome sm">${s.outcome}</div>`});
    const services = svcCore(SERVICES[0],2,'svc1',-378,8)+svcCore(SERVICES[1],3,'svc2',378,8)+svcBonus(SERVICES[2],'svc3',0,62);
    const standards = scPanel({n:5,tag:'③ ALWAYS INCLUDED',cls:'sc-offerpanel',open:'standards',x:-378,y:272,w:300,h:150,
      body:`<div class="clus-title">Always included</div><span class="lbl">six standards · every project</span><div class="std-chiplist tight">${STANDARDS.slice(0,3).map(s=>`<span class="chip">${s}</span>`).join('')}<span class="chip ghost-chip">+3</span></div>`});
    const ctaP = scPanel({n:6,tag:'④ CTA',cls:'sc-offerpanel sc-cta',open:'cta',x:378,y:272,w:300,h:150,
      body:`<div class="clus-title">Start a project</div><span class="lbl">see pricing · or get in touch</span><span class="lbl" style="margin-top:6px;">primary CTA also pinned in the nav →</span>`});
    return `<div class="scase worlds">
        <div class="sc-head">Services <span>drag · scroll to zoom · click a panel to open</span></div>
        <div class="sc-canvas">
          <svg class="sc-wires"></svg>
          ${anchor}${services}${standards}${ctaP}
        </div>
        <div class="wb-ctrls sc-ctrls"><button data-z="out">–</button><button data-z="home">⊚</button><button data-z="in">+</button></div>
      </div>
      <div class="sc-detail"><div class="detail-chrome"><span class="back-pill">← Back to services</span><span class="close-x">✕</span></div><div class="detail-body"></div></div>`;
  }

  /* ---------- NESTED canvas-in-a-canvas: per-panel detail map ---------- */
  function ndHero(title,sub,big){
    return scPanel({cls:'sc-hero sc-dhero accent-zone',x:0,y:-156,w:330,h:128,
      body:`<div class="${big?'svc-name sm':'philo sm'}">${title}</div>${sub?`<span class="svc-for" style="margin-top:6px;">${sub}</span>`:''}`});
  }
  function ndPanel(tag,body,x,y,w,h,cls){
    return scPanel({tag:tag,cls:'sc-clushead'+(cls?' '+cls:''),x:x,y:y,w:w,h:h,body:body});
  }
  function nestedWrap(title,inner){
    return `<div class="scase nested">
        <div class="sc-head">${title} <span>drag · scroll to zoom</span></div>
        <div class="sc-canvas"><svg class="sc-wires"></svg>${inner}</div>
        <div class="wb-ctrls sc-ctrls"><button data-z="out">–</button><button data-z="home">⊚</button><button data-z="in">+</button></div>
      </div>`;
  }
  function serviceDetail(s){
    const hero = ndHero(s.name, s.for, true);
    const outcome = ndPanel('▸ THE OUTCOME',`<div class="svc-outcome">${s.outcome}</div>`,0,8,380,96,'nd-outcome');
    const exTiles = s.ex.map((ex,i)=>ndPanel('example',`<span class="sc-sat-lbl">${ex}</span>`,-176+i*176,168,150,64,'nd-ex')).join('');
    const deliver = ndPanel('▸ WHAT YOU GET · deliverables',
      `<div class="std-chiplist">${s.deliver.map(d=>`<span class="chip">${d}</span>`).join('')}</div>`,0,288,400,118,'nd-deliver');
    return nestedWrap(`${s.name} — detail`, hero+outcome+exTiles+deliver);
  }
  function detailFor(id){
    if(id==='svc1') return serviceDetail(SERVICES[0]);
    if(id==='svc2') return serviceDetail(SERVICES[1]);
    if(id==='svc3') return serviceDetail(SERVICES[2]);
    if(id==='philosophy'){
      const hero=ndHero(PHILOSOPHY,'the whole offer');
      const a=ndPanel('① TWO THINGS','<div class="clus-title">Two things</div><span class="svc-for">Portfolio sites · Landing pages — nothing else.</span>',-220,30,250,116);
      const b=ndPanel('② DONE EXCEPTIONALLY','<div class="clus-title">Done exceptionally</div><span class="svc-for">Not ten services done okay.</span>',220,30,250,116);
      const c=ndPanel('③ WHY TWO','<div class="clus-title">Focus is the feature</div><span class="svc-for">One person, two things, all-in on the outcome.</span>',0,210,300,112);
      return nestedWrap('Philosophy — detail', hero+a+b+c);
    }
    if(id==='standards'){
      const hero=ndHero('Always included','six standards, every project');
      const offs=[[-310,-6],[0,-6],[310,-6],[-310,158],[0,158],[310,158]];
      const tiles=STANDARDS.map((s,i)=>ndPanel('▸ standard',`<div class="std-name">${s}</div><span class="svc-for">${STD_GLOSS[s]}</span>`,offs[i][0],offs[i][1],240,118,'nd-std')).join('');
      return nestedWrap('Always included — detail', hero+tiles);
    }
    if(id==='cta'){
      const hero=ndHero('Start a project','two ways in');
      const a=ndPanel('▸ PRIMARY',`<span class="btn cta-ring sc-btn">See pricing ▸</span><span class="sc-sat-eyebrow">→ /pricing</span>`,-200,30,230,116,'nd-cta');
      const b=ndPanel('▸ SECONDARY',`<span class="btn ghost-btn sc-btn">Work with me ▸</span><span class="sc-sat-eyebrow">→ /contact</span>`,200,30,230,116);
      const c=ndPanel('▸ SCARCITY','<div class="clus-title">One project at a time</div><span class="svc-for">One seat open this month.</span>',0,208,300,112);
      return nestedWrap('Start a project — detail', hero+a+b+c);
    }
    return '';
  }

  /* ---------- mobile (single column for A/B/C; canvas for D) ---------- */
  function entryM(s,num){ return svcEntry(s,num); }
  function sheetM(dir){
    if(dir==='D') return sheetD();
    if(dir==='C') return `<div class="svc-sheet">
        <div class="svc-sec manifesto"><span class="section-tag csec-tag">① MANIFESTO</span><div class="manifesto-line sm">${PHILOSOPHY}</div><span class="lbl manifesto-sub">scroll ↓</span></div>
        <div class="svc-sec entries"><span class="section-tag csec-tag">② SERVICES</span>${entryM(SERVICES[0],1)}${entryM(SERVICES[1],2)}${entryM(SERVICES[2],3)}</div>
        ${standards('inline')}${cta()}</div>`;
    if(dir==='B') return `<div class="svc-sheet">${header(1)}
        ${SERVICES.map((s,i)=>`<div class="svc-sec svc-zig left"><span class="section-tag csec-tag">② SERVICE ${i+1}</span><div class="zig-grid stackM"><div class="zig-anchor img"><span class="lbl">anchor</span></div><div class="zig-text"><div class="svc-name sm">${s.name}</div><span class="svc-for">${s.for}</span><div class="svc-outcome">${s.outcome}</div>${chips(s.ex)}</div></div></div>`).join('')}
        ${standards('grid')}${cta()}</div>`;
    // A
    return `<div class="svc-sheet">${header(1)}
      ${SERVICES.map((s,i)=>`<div class="svc-sec svc-band"><span class="section-tag csec-tag">② SERVICE ${i+1}</span><div class="band-grid stackM"><div class="name-col"><div class="svc-name sm">${s.name}</div><span class="svc-for">${s.for}</span></div><div class="out-col"><div class="svc-outcome">${s.outcome}</div>${chips(s.ex)}</div></div></div>`).join('')}
      ${standards('strip')}${cta()}</div>`;
  }

  return { sheetA, sheetB, sheetC, sheetD, sheetM, detailFor };
})();
