/* ============================================================
   Jawad Design — /work/[slug] render: tabs, directions,
   the canvas "open" transition demo, and Tweaks-driven body classes.
   Depends on window.SLUG (slug.js).
   ============================================================ */
(function(){
  const S = window.SLUG;

  const DIRS = [
    { key:'A', name:'Classic Vertical', short:'vertical scroll',
      desc:'Full-width sections stacked top to bottom — the most readable, predictable case-study read. Hero → meta → problem → build → process imagery → outcome → next → CTA, each a full-bleed band.',
      build:S.sheetA, mdir:'A',
      bands:[
        ['Hero','Full-bleed accent band. Big project name owns the first screen; the data-theme accent paints the whole zone.'],
        ['Meta row','Client · Year · Services in mono micro-labels — scannable, sits right under the hero.'],
        ['Problem','Lead with the problem/ambition before any solution. Largest body type on the page.'],
        ['What I built','Scope, framed as solo: designed + built by one person.'],
        ['Process','2–3 full-width focal images; parallax noted on each.'],
        ['Outcome','Accent stat row (200 / $0 / 1) that counts up on scroll, then the stack line.'],
        ['Next','Reframed for the canvas world: ← Back to canvas / Next panel →.'],
        ['Contact CTA','One primary action — “Work with me.”'],
      ]},
    { key:'B', name:'Sticky-Split', short:'pinned meta + scroll',
      desc:'The meta column pins to the left and stays put while the narrative scrolls on the right. Keeps Client/Year/Services and project identity in view the whole read — feels like a considered dossier.',
      build:S.sheetB, mdir:'B',
      bands:[
        ['Hero','Same full-bleed accent hero spanning both columns before the split begins.'],
        ['Meta (pinned)','The meta column is position:sticky — it holds as the right side scrolls past it.'],
        ['Problem','First block in the scrolling right column. Lead with the problem.'],
        ['What I built','Continues the right-column scroll; solo scope.'],
        ['Process','Full-width focal imagery within the right column; parallax noted.'],
        ['Outcome','Accent stat row + counter, then stack line — still right column.'],
        ['Next','Full-width again below the split: ← Back to canvas / Next panel →.'],
        ['Contact CTA','Full-width primary close — “Work with me.”'],
      ]},
    { key:'C', name:'Big-Numeral Narrative', short:'outcome numbers as beats',
      desc:'The outcome numbers (200 · $0 · 1) become oversized structural beats, with the story woven between them — the proof leads and the copy supports. Boldest, most editorial of the three.',
      build:S.sheetC, mdir:'C',
      bands:[
        ['Hero','Full-bleed accent hero — same anchor as the others.'],
        ['Meta row','Mono micro-labels under the hero before the numerals begin.'],
        ['200 · signups','First giant beat. Problem/ambition copy woven beside the number.'],
        ['$0 · paid','Second beat — “what I built”, solo, sits against the zero-spend proof.'],
        ['1 · solo build','Third beat carries the process imagery beside it.'],
        ['Stack','The stack line as a quiet coda after the numerals.'],
        ['Next','← Back to canvas / Next panel →.'],
        ['Contact CTA','Primary close — “Work with me.”'],
        ['Accent + counter','The whole numeral band is the data-theme accent zone; numbers count up on scroll.'],
      ]},
    { key:'D', name:'Canvas-in-Canvas', short:'nested spatial detail',
      desc:'Radical match to the /work whiteboard — clicking weld zooms past the panel into a second, more compact canvas where the whole case study lives as spatial panels. The hero anchors the centre; meta, problem, build, process, outcome and CTA orbit it. Drag to explore, scroll to zoom, ⊚ to recentre.',
      build:S.sheetD, mdir:'D', isCanvas:true,
      bands:[
        ['Hero','Anchors the centre of the nested canvas — weld name + accent zone, the “VIEW” entry point.'],
        ['Meta','Compact Client · Year · Services panel, top-right of the hero.'],
        ['Problem','Problem/ambition panel — still the first read after the hero (badge ③).'],
        ['What I built','Solo-scope panel, lower-left.'],
        ['Process','Two process thumbnails in one panel; parallax noted.'],
        ['Outcome','Accent stat panel (200 · $0 · 1) that counts up when it enters view.'],
        ['Stack','Quiet stack-line panel below the outcome.'],
        ['Contact CTA','“Work with me” panel — the primary action, pinned in the cluster.'],
        ['Spatial reading order','Numbered badges keep the ①→⑧ read legible even though the layout is spatial, not linear.'],
      ]},
  ];

  /* ---------- frames ---------- */
  function backChrome(){
    return `<div class="slug-chrome">
        <span class="back-pill">← Back to canvas</span>
        <span class="close-x">✕</span>
      </div>`;
  }
  function dframe(inner){
    return `<div class="frame desktop slug-frame"><div class="chrome"><i></i><i></i><i></i></div>
        <div class="screen slug-screen">${backChrome()}<div class="scroller">${inner}</div></div></div>`;
  }
  function mframe(inner){
    return `<div class="frame mobile slug-frame"><div class="chrome"><i></i></div>
        <div class="screen slug-screen">${backChrome()}<div class="scroller">${inner}</div></div></div>`;
  }
  // canvas directions skip the scroller (the nested canvas pans instead)
  function dframeCanvas(inner){
    return `<div class="frame desktop slug-frame"><div class="chrome"><i></i><i></i><i></i></div>
        <div class="screen slug-screen no-scroll">${backChrome()}${inner}</div></div>`;
  }
  function mframeCanvas(inner){
    return `<div class="frame mobile slug-frame"><div class="chrome"><i></i></div>
        <div class="screen slug-screen no-scroll">${backChrome()}${inner}</div></div>`;
  }

  /* ---------- annotation column ---------- */
  function annot(dir){
    const items = dir.bands.map((b,i)=>`<li><span class="eye-dot">${i+1}</span><b>${b[0]}</b><span>${b[1]}</span></li>`).join('');
    return `<div class="annot slug-annot">
        <p class="tag"><span class="ix">${dir.key}</span> ${dir.name}</p>
        <p class="note">${dir.desc}</p>
        <ul class="seclist">${items}</ul>
        <p class="state-note"><b>data-theme accent</b>Applied to the <u>hero</u> and the <u>outcome stats</u> only — the slug’s own colour. Everything else stays neutral.</p>
        <p class="state-note"><b>stat counter</b>The outcome numbers animate from 0 → value when they scroll into view.</p>
        <p class="cta-where">Primary CTA → /contact · Next reframed as ← canvas / panel →</p>
      </div>`;
  }

  function renderDir(dir,active){
    const df = dir.isCanvas ? dframeCanvas(dir.build()) : dframe(dir.build());
    const mf = dir.isCanvas ? mframeCanvas(S.sheetM(dir.mdir)) : mframe(S.sheetM(dir.mdir));
    return `<section class="direction${active?' active':''}" data-dir="${dir.key}" data-screen-label="Slug · Direction ${dir.key} — ${dir.name}">
        <div class="dir-head"><div class="num">${dir.key}</div>
          <div class="meta"><h2>${dir.name} <span class="dh-sub">${dir.short}</span></h2><p>${dir.desc}</p></div></div>
        <div class="band slug-band">
          ${annot(dir)}
          <div class="d-col"><p class="view-cap">Desktop ~1440 · ${dir.isCanvas?'nested canvas':'case-study sheet'}</p>${df}</div>
          <div class="m-col"><p class="view-cap">Mobile ~390</p>${mf}</div>
        </div>
      </section>`;
  }

  const canvas=document.getElementById('canvas');
  const tabsWrap=document.getElementById('tabs');
  canvas.innerHTML=DIRS.map((d,i)=>renderDir(d,i===0)).join('');

  /* ---------- nested case-study canvas: pan + zoom + connector wires ---------- */
  function drawWires(sc,cv){
    const svg=sc.querySelector('.sc-wires'); const hero=cv.querySelector('.sc-hero');
    if(!svg||!hero) return;
    const prev=cv.style.transform; cv.style.transform='none';
    const c=cv.getBoundingClientRect();
    const hr=hero.getBoundingClientRect();
    const hx=hr.left+hr.width/2-c.left, hy=hr.top+hr.height/2-c.top;
    svg.setAttribute('viewBox',`0 0 ${c.width} ${c.height}`);
    svg.setAttribute('preserveAspectRatio','none');
    let lines='';
    const arrow=(ax,ay,bx,by)=>{
      const mx=(ax+bx)/2,my=(ay+by)/2,ang=Math.atan2(by-ay,bx-ax),S=14,SP=0.6;
      const x1=mx-S*Math.cos(ang-SP),y1=my-S*Math.sin(ang-SP),x2=mx-S*Math.cos(ang+SP),y2=my-S*Math.sin(ang+SP);
      return `<polyline points="${x1.toFixed(1)},${y1.toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}"/>`;
    };
    cv.querySelectorAll('.sc-panel:not(.sc-hero)').forEach(p=>{
      const r=p.getBoundingClientRect();
      lines+=arrow(hx,hy, r.left+r.width/2-c.left, r.top+r.height/2-c.top);
    });
    svg.innerHTML=lines;
    cv.style.transform=prev;
  }
  function ensureCanvas(sc){
    const cv=sc.querySelector('.sc-canvas'); if(!cv) return;
    if(!sc._st){
      const isMobile=!!sc.closest('.frame.mobile');
      const home=isMobile?0.42:0.78;
      const st={s:home,px:0,py:0,home};
      sc._st=st;
      const apply=()=>{cv.style.transform=`translate(${st.px}px,${st.py}px) scale(${st.s})`;};
      sc._apply=apply; apply();
      let drag=false,sx=0,sy=0,ox=0,oy=0;
      sc.addEventListener('pointerdown',e=>{
        if(e.target.closest('.sc-ctrls')||e.target.closest('.btn')) return;
        drag=true; sc.classList.add('grabbing'); sx=e.clientX; sy=e.clientY; ox=st.px; oy=st.py;
        try{sc.setPointerCapture(e.pointerId);}catch(_){}
      });
      sc.addEventListener('pointermove',e=>{ if(!drag) return; st.px=ox+(e.clientX-sx); st.py=oy+(e.clientY-sy); apply(); });
      const end=()=>{drag=false; sc.classList.remove('grabbing');};
      sc.addEventListener('pointerup',end); sc.addEventListener('pointercancel',end);
      sc.addEventListener('wheel',e=>{ e.preventDefault(); st.s=Math.min(1.5,Math.max(0.3, st.s - e.deltaY*0.0012)); apply(); },{passive:false});
      const ctrls=sc.querySelector('.sc-ctrls');
      if(ctrls) ctrls.addEventListener('click',e=>{ const z=e.target.dataset.z; if(!z) return;
        if(z==='in') st.s=Math.min(1.5, st.s+0.14);
        if(z==='out') st.s=Math.max(0.3, st.s-0.14);
        if(z==='home'){ st.s=st.home; st.px=0; st.py=0; }
        apply(); });
    }
    if(sc.offsetParent!==null && cv.getBoundingClientRect().width>0 && !sc.dataset.wired){
      drawWires(sc,cv); sc.dataset.wired='1'; sc._apply();
    }
  }
  function ensureAll(root){ (root||document).querySelectorAll('.scase').forEach(ensureCanvas); }
  ensureAll();
  tabsWrap.innerHTML=DIRS.map((d,i)=>`<button class="tab" role="tab" aria-selected="${i===0}" data-target="${d.key}"><b>${d.key} · ${d.name}</b><small>direction ${i+1} of ${DIRS.length}</small></button>`).join('');
  tabsWrap.addEventListener('click',e=>{
    const t=e.target.closest('.tab'); if(!t) return;
    const k=t.dataset.target;
    tabsWrap.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected', x.dataset.target===k));
    canvas.querySelectorAll('.direction').forEach(s=>s.classList.toggle('active', s.dataset.dir===k));
    window.scrollTo({top:0,behavior:'instant'});
    requestAnimationFrame(()=>ensureAll(canvas));
  });

  /* ---------- the "open from canvas" transition demo ---------- */
  // A mini whiteboard with a weld panel; clicking it plays the chosen open transition
  // into the active direction's desktop sheet. Mode set via body data-open attr (Tweak).
  const demo = document.getElementById('open-demo-mount');
  if(demo){
    demo.innerHTML = `
      <div class="demo-wrap">
        <div class="demo-board" id="demo-board">
          <div class="demo-grid"></div>
          <div class="demo-panel demo-ghost" style="left:14%;top:18%;">+ <span>coming soon</span></div>
          <div class="demo-panel demo-ghost" style="left:64%;top:12%;">+ <span>coming soon</span></div>
          <div class="demo-panel demo-ghost" style="left:72%;top:62%;">+ <span>coming soon</span></div>
          <div class="demo-panel demo-ghost" style="left:10%;top:64%;">+ <span>coming soon</span></div>
          <div class="demo-panel demo-weld" id="demo-weld">
            <span class="lbl">weld — flagship</span><span class="lbl">200 signups · $0 paid</span>
            <span class="demo-cur">VIEW</span>
          </div>
          <div class="demo-hint">click <b>weld</b> to open the case study →</div>
        </div>
        <div class="demo-sheet" id="demo-sheet">
          <div class="slug-chrome"><span class="back-pill" id="demo-back">← Back to canvas</span><span class="close-x" id="demo-close">✕</span></div>
          <div class="scroller" id="demo-sheet-body"></div>
        </div>
      </div>`;

    const board = demo.querySelector('#demo-board');
    const weld  = demo.querySelector('#demo-weld');
    const sheet = demo.querySelector('#demo-sheet');
    const body  = demo.querySelector('#demo-sheet-body');
    const activeDir = ()=>DIRS.find(d=>d.key===(document.querySelector('.tab[aria-selected="true"]')?.dataset.target||'A'));

    function openDemo(){
      body.innerHTML = activeDir().build();
      const mode = document.body.getAttribute('data-open') || 'zoom';
      sheet.className = 'demo-sheet open mode-'+mode;
      board.classList.add('behind');
      requestAnimationFrame(()=>ensureAll(body));
    }
    function closeDemo(){
      const mode = document.body.getAttribute('data-open') || 'zoom';
      sheet.className = 'demo-sheet closing mode-'+mode;
      board.classList.remove('behind');
      setTimeout(()=>{ sheet.className='demo-sheet mode-'+mode; },360);
    }
    weld.addEventListener('click',openDemo);
    demo.querySelector('#demo-back').addEventListener('click',closeDemo);
    demo.querySelector('#demo-close').addEventListener('click',closeDemo);
  }
})();
