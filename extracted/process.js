/* ============================================================
   Jawad Design — /process content module (window.PROC)
   Direction D only: a left→right spatial timeline of the
   five-step path, each step opening a radial canvas-in-canvas.
   Reuses the sc-* canvas system from the services/slug pages.
   ============================================================ */
window.PROC = (function(){
  const flag=()=>''; // no annotation flags on this page

  /* ---------- content ---------- */
  const PATH_TITLE = 'Six steps, brief to live.';
  const STEPS = [
    {id:'brief', n:'Brief', dur:'~ a day or two', tag:'we get aligned',
     happens:'A kickoff call — I learn the goal, the audience, and the references you love. We agree on scope before a pixel is drawn.',
     deliver:['a one-page brief','a moodboard direction','an agreed scope'],
     you:'Share goals, examples, and any content you have.',
     me:'Ask the right questions and frame the scope.'},
    {id:'direction', n:'Direction', dur:'~ a couple of days', tag:'we pick a look',
     happens:'I explore two distinct visual directions — type, colour, layout — and we choose the one that fits before building.',
     deliver:['two design directions','a chosen art direction','type + colour scale'],
     you:'React honestly, then pick a direction.',
     me:'Design the options and make a recommendation.'},
    {id:'build', n:'Build', dur:'the bulk of the timeline', tag:'I make it real',
     happens:'I design and build the actual pages — designed and engineered by one person, so nothing is lost in a handoff.',
     deliver:['the working site','built page by page','responsive from the start'],
     you:'Supply the final words and images.',
     me:'Design and build every page, end to end.'},
    {id:'polish', n:'Polish', dur:'~ a day or two', tag:'we sweat the details',
     happens:'One consolidated round of revisions, plus speed, SEO, and responsiveness passes until it’s sharp on every screen.',
     deliver:['a refined, tested site','a speed + SEO pass','one revision round'],
     you:'Send one consolidated round of feedback.',
     me:'Refine, optimise, and test thoroughly.'},
    {id:'ship', n:'Ship', dur:'launch + aftercare', tag:'we go live',
     happens:'We launch, I hand over everything, and you get a care window so the site stays healthy well after go-live.',
     deliver:['the live site','a simple how-to','30 days of care'],
     you:'Approve the launch.',
     me:'Deploy, monitor, and support.'},
    {id:'maintain', n:'Maintain', dur:'ongoing, on your terms', tag:'you stay in control',
     happens:'You get a CMS to edit content yourself, so you never wait on me for a routine change.',
     deliver:['a simple CMS','editable content','docs to self-serve'],
     you:'Update copy and images whenever you want.',
     me:'On call for the bigger changes only.'},
  ];

  /* ---------- panel helper (mirrors the services/slug system) ---------- */
  function scPanel(o){
    const base=`left:calc(50% + ${o.x}px);top:calc(50% + ${o.y}px);width:${o.w}px;height:${o.h}px;`;
    const open=o.open?` data-open="${o.open}"`:'';
    return `<div class="sc-panel${o.cls?' '+o.cls:''}${o.open?' openable':''}" style="${base}"${open}>
        ${o.n?`<span class="sc-num">${o.n}</span>`:''}
        ${o.tag?`<span class="sc-tag">${o.tag}</span>`:''}
        <div class="sc-body">${o.body}</div>
        ${o.open?'<span class="sc-open-cur">OPEN ⤢</span>':''}
      </div>`;
  }

  /* ---------- MAIN view: horizontal scroll-strip through the 5 steps ---------- */
  function sheetD(){
    const cards = STEPS.map((s,i)=>`
      <div class="proc-step" data-open="${s.id}" data-step="${i}">
        <span class="proc-num">${i+1}</span>
        <span class="proc-step-tag">STEP ${i+1} OF 5</span>
        <div class="proc-step-name">${s.n}</div>
        <span class="proc-step-dur">${s.dur}</span>
        <div class="proc-step-line">${s.tag}.</div>
        <span class="proc-open-hint">open this step ⤢</span>
      </div>`).join('');
    return `<div class="proc-stage">
        <div class="proc-topbar">
          <span class="proc-h-eyebrow">how I work — one person, start to finish</span>
          <div class="proc-h-title">${PATH_TITLE}</div>
          <span class="proc-h-sub">scroll sideways through the five steps →</span>
        </div>
        <div class="proc-scroller">
          <div class="proc-track">
            <div class="proc-rail"></div>
            ${cards}
          </div>
        </div>
        <div class="proc-cta">
          <span class="proc-cta-title">Ready when you are</span>
          <div class="cta-row"><span class="btn cta-ring sc-btn">See pricing ▸</span><span class="btn ghost-btn sc-btn">Work with me ▸</span></div>
          <span class="proc-cta-note">one project at a time · one seat this month</span>
        </div>
        <div class="proc-progress"><i></i></div>
        <div class="sc-detail"><div class="detail-chrome"><span class="back-pill">← Back to the path</span><span class="close-x">✕</span></div><div class="detail-body"></div></div>
      </div>`;
  }

  /* ---------- NESTED canvas-in-a-canvas: per-step detail ---------- */
  function ndHero(title,sub){
    return scPanel({cls:'sc-hero sc-dhero accent-zone',x:0,y:-160,w:360,h:128,
      body:`<div class="svc-name sm">${title}</div>${sub?`<span class="svc-for" style="margin-top:6px;">${sub}</span>`:''}`});
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
  function stepDetail(s,idx){
    const hero    = ndHero(s.n, `Step ${idx+1} of 5 · ${s.dur}`);
    const happens = ndPanel('▸ WHAT HAPPENS',`<div class="svc-outcome">${s.happens}</div>`,-310,16,308,150,'nd-outcome');
    const get     = ndPanel('▸ WHAT YOU GET · deliverables',`<div class="std-chiplist">${s.deliver.map(d=>`<span class="chip">${d}</span>`).join('')}</div>`,310,16,308,150,'nd-deliver');
    const dur     = ndPanel('▸ HOW LONG',`<div class="clus-title">${s.dur}</div><span class="svc-for">rough — not a fixed quote</span>`,-196,222,272,118);
    const split   = ndPanel('▸ YOUR PART / MY PART',
      `<div class="proc-split"><div class="proc-col"><span class="sc-sat-eyebrow">your part</span><div class="svc-for">${s.you}</div></div><div class="proc-col"><span class="sc-sat-eyebrow">my part</span><div class="svc-for">${s.me}</div></div></div>`,
      212,222,336,130);
    return nestedWrap(`${s.n} — detail`, hero+happens+get+dur+split);
  }
  function detailFor(id){
    const i=STEPS.findIndex(s=>s.id===id);
    return i>=0 ? stepDetail(STEPS[i],i) : '';
  }

  function sheetM(){ return sheetD(); }

  return { sheetD, sheetM, detailFor };
})();
