/* ============================================================
   Jawad Design — /process render: Direction D canvas only,
   nested-canvas pan/zoom, timeline connector wires.
   Depends on window.PROC (process.js).
   ============================================================ */
(function(){
  const S = window.PROC;

  const DIRS = [
    { key:'D', name:'Process Canvas', short:'5-step timeline · click a step to open',
      desc:'The five-day path as a pannable left→right timeline — Brief at the left, Ship at the right. Click any step and it zoom-expands into its own canvas-in-a-canvas: what happens, what you get, how long, and your part vs mine. Drag to pan, scroll to zoom, ⊚ to recentre.',
      build:S.sheetD, mdir:'D', isCanvas:true,
      bands:[
        ['The path','Header anchor — “Five steps, brief to ship.” Sets the journey; the timeline wires run left→right beneath it.'],
        ['Steps (×5)','Brief · Direction · Build · Polish · Ship. Each opens a radial detail canvas (what happens · deliverable · rough duration · your part / my part).'],
        ['Start','A closing panel with both a “See pricing” (primary) and “Work with me” (secondary) action.'],
        ['Zoom-expand','Clicking a step scales it up into the nested canvas; ← Back / ✕ returns.'],
      ]},
  ];

  /* ---------- frames ---------- */
  const pill  = ()=>`<nav class="pill"><span>Work</span><span>Services</span><span>Pricing</span><span>Contact</span></nav>`;
  const pillM = ()=>`<nav class="pill icon"><span><i></i></span><span><i></i></span><span><i></i></span><span><i></i></span></nav>`;
  const pillCta  = ()=>`<nav class="pill"><span>Work</span><span>Services</span><span>Pricing</span><span>Contact</span><span class="pill-cta">See pricing ▸</span></nav>`;
  const pillMCta = ()=>`<nav class="pill icon"><span><i></i></span><span><i></i></span><span><i></i></span><span><i></i></span><span class="pill-cta-m">▸</span></nav>`;
  function dframe(inner){
    return `<div class="frame desktop svc-frame"><div class="chrome"><i></i><i></i><i></i></div>
        <div class="screen svc-screen"><div class="scroller">${inner}</div>${pill()}</div></div>`;
  }
  function mframe(inner){
    return `<div class="frame mobile svc-frame"><div class="chrome"><i></i></div>
        <div class="screen svc-screen"><div class="scroller">${inner}</div>${pillM()}</div></div>`;
  }
  function dframeCanvas(inner){
    return `<div class="frame desktop svc-frame"><div class="chrome"><i></i><i></i><i></i></div>
        <div class="screen svc-screen no-scroll">${inner}${pillCta()}</div></div>`;
  }
  function mframeCanvas(inner){
    return `<div class="frame mobile svc-frame"><div class="chrome"><i></i></div>
        <div class="screen svc-screen no-scroll">${inner}${pillMCta()}</div></div>`;
  }

  /* ---------- annotation column ---------- */
  function annot(dir){
    const items = dir.bands.map((b,i)=>`<li><span class="eye-dot">${i+1}</span><b>${b[0]}</b><span>${b[1]}</span></li>`).join('');
    return `<div class="annot svc-annot">
        <p class="tag"><span class="ix">${dir.key}</span> ${dir.name}</p>
        <p class="note">${dir.desc}</p>
        <ul class="seclist">${items}</ul>
        <p class="state-note"><b>outcome-first voice</b>Every service leads with what the client <u>gets</u> — “You get a site that earns trust…” — not with the task I perform. The name labels the thing; the outcome sells it.</p>
        <p class="cta-where">Primary → /pricing · Secondary → /contact</p>
      </div>`;
  }

  function renderDir(dir,active){
    const df = dir.isCanvas ? dframeCanvas(dir.build()) : dframe(dir.build());
    const mf = dir.isCanvas ? mframeCanvas(S.sheetM(dir.mdir)) : mframe(S.sheetM(dir.mdir));
    return `<section class="direction${active?' active':''}" data-dir="${dir.key}" data-screen-label="Services · Direction ${dir.key} — ${dir.name}">
        <div class="dir-head"><div class="num">${dir.key}</div>
          <div class="meta"><h2>${dir.name} <span class="dh-sub">${dir.short}</span></h2><p>${dir.desc}</p></div></div>
        <div class="band svc-bandrow">
          ${annot(dir)}
          <div class="d-col"><p class="view-cap">Desktop ~1440 · ${dir.isCanvas?'pannable canvas':'services page'}</p>${df}</div>
          <div class="m-col"><p class="view-cap">Mobile ~390</p>${mf}</div>
        </div>
      </section>`;
  }

  const canvas=document.getElementById('canvas');
  const tabsWrap=document.getElementById('tabs');
  canvas.innerHTML=DIRS.map((d,i)=>renderDir(d,i===0)).join('');

  /* ---------- nested canvas: pan + zoom + connector wires ---------- */
  function drawWires(sc,cv){
    const svg=sc.querySelector('.sc-wires'); const hero=cv.querySelector('.sc-hero');
    if(!svg||!hero) return;
    const prev=cv.style.transform; cv.style.transform='none';
    const c=cv.getBoundingClientRect();
    const ctr=el=>{const r=el.getBoundingClientRect();return {x:r.left+r.width/2-c.left,y:r.top+r.height/2-c.top};};
    svg.setAttribute('viewBox',`0 0 ${c.width} ${c.height}`);
    svg.setAttribute('preserveAspectRatio','none');
    const h=ctr(hero); let lines='';
    const line=(a,b,cls)=>{
      const mx=(a.x+b.x)/2,my=(a.y+b.y)/2,ang=Math.atan2(b.y-a.y,b.x-a.x),S=14,SP=0.6;
      const x1=mx-S*Math.cos(ang-SP),y1=my-S*Math.sin(ang-SP),x2=mx-S*Math.cos(ang+SP),y2=my-S*Math.sin(ang+SP);
      return `<polyline points="${x1.toFixed(1)},${y1.toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}"${cls?` class="${cls}"`:''}/>`;
    };
    // MAIN canvas: a left→right timeline through the 5 step panels (header → first → … → last → CTA)
    const steps=[...cv.querySelectorAll('.proc-step')];
    if(steps.length){
      lines+=line(h, ctr(steps[0]), 'w-main');
      for(let i=0;i<steps.length-1;i++) lines+=line(ctr(steps[i]), ctr(steps[i+1]), 'w-main');
      const cta=cv.querySelector('.proc-cta');
      if(cta) lines+=line(ctr(steps[steps.length-1]), ctr(cta), 'w-sat');
    } else {
      // nested detail canvas: hero → each surrounding panel
      cv.querySelectorAll('.sc-clushead').forEach(p=>{ lines+=line(h,ctr(p),'w-main'); });
    }
    svg.innerHTML=lines;
    cv.style.transform=prev;
  }
  function openDetail(detail, panel){
    const body=detail.querySelector('.detail-body');
    const id=panel.dataset.open;
    body.innerHTML = window.PROC.detailFor(id);
    const screen=detail.closest('.svc-screen');
    const sr=screen.getBoundingClientRect(), pr=panel.getBoundingClientRect();
    detail.style.transformOrigin=`${pr.left+pr.width/2-sr.left}px ${pr.top+pr.height/2-sr.top}px`;
    detail.classList.add('open');
    requestAnimationFrame(()=>ensureAll(detail));
  }
  function closeDetail(detail){ detail.classList.remove('open'); }

  function ensureCanvas(sc){
    const cv=sc.querySelector('.sc-canvas'); if(!cv) return;
    if(!sc._st){
      const isMobile=!!sc.closest('.frame.mobile');
      const nested=!!sc.closest('.sc-detail');
      const home=nested?(isMobile?0.5:0.74):(isMobile?0.28:0.46);
      const st={s:home,px:0,py:0,home};
      sc._st=st;
      const apply=()=>{cv.style.transform=`translate(${st.px}px,${st.py}px) scale(${st.s})`;};
      sc._apply=apply; apply();
      const isMain=sc.classList.contains('worlds');
      let drag=false,sx=0,sy=0,ox=0,oy=0,moved=false,downPanel=null;
      sc.addEventListener('pointerdown',e=>{
        if(e.target.closest('.sc-ctrls')||e.target.closest('.btn')) return;
        drag=true; moved=false; sc.classList.add('grabbing'); sx=e.clientX; sy=e.clientY; ox=st.px; oy=st.py;
        downPanel = isMain ? e.target.closest('.sc-panel[data-open]') : null;
        try{sc.setPointerCapture(e.pointerId);}catch(_){}
      });
      sc.addEventListener('pointermove',e=>{ if(!drag) return; if(Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)>5) moved=true; st.px=ox+(e.clientX-sx); st.py=oy+(e.clientY-sy); apply(); });
      const end=(e)=>{
        if(drag && isMain && downPanel && !moved){
          const detail=sc.closest('.svc-screen').querySelector('.sc-detail');
          if(detail) openDetail(detail, downPanel);
        }
        drag=false; downPanel=null; sc.classList.remove('grabbing');
      };
      sc.addEventListener('pointerup',end); sc.addEventListener('pointercancel',()=>{drag=false;sc.classList.remove('grabbing');});
      sc.addEventListener('wheel',e=>{ e.preventDefault(); st.s=Math.min(1.5,Math.max(0.28, st.s - e.deltaY*0.0012)); apply(); },{passive:false});
      const ctrls=sc.querySelector('.sc-ctrls');
      if(ctrls) ctrls.addEventListener('click',e=>{ const z=e.target.dataset.z; if(!z) return;
        if(z==='in') st.s=Math.min(1.5, st.s+0.14);
        if(z==='out') st.s=Math.max(0.28, st.s-0.14);
        if(z==='home'){ st.s=st.home; st.px=0; st.py=0; }
        apply(); });
      // wire the detail overlay's back/close once per main canvas
      if(isMain){
        const detail=sc.closest('.svc-screen').querySelector('.sc-detail');
        if(detail && !detail.dataset.wired){
          detail.dataset.wired='1';
          detail.querySelector('.back-pill').addEventListener('click',()=>closeDetail(detail));
          detail.querySelector('.close-x').addEventListener('click',()=>closeDetail(detail));
        }
      }
    }
    if(sc.offsetParent!==null && cv.getBoundingClientRect().width>0 && !sc.dataset.wired){
      drawWires(sc,cv); sc.dataset.wired='1'; sc._apply();
    }
  }
  function ensureAll(root){ (root||document).querySelectorAll('.scase').forEach(ensureCanvas); }

  /* ---------- horizontal scroll-strip behaviour (main view) ---------- */
  function initProcess(root){
    (root||document).querySelectorAll('.proc-stage').forEach(stage=>{
      if(stage.__wired) return; stage.__wired=true;
      const scroller=stage.querySelector('.proc-scroller');
      const prog=stage.querySelector('.proc-progress>i');
      const detail=stage.querySelector('.sc-detail');
      const steps=[...stage.querySelectorAll('.proc-step')];
      // vertical wheel → horizontal travel
      scroller.addEventListener('wheel',e=>{
        const dom=Math.abs(e.deltaY)>=Math.abs(e.deltaX)?e.deltaY:e.deltaX;
        if(!dom) return; e.preventDefault(); scroller.scrollLeft+=dom;
      },{passive:false});
      // drag to scroll sideways
      let drag=false,sx=0,sl=0,moved=false;
      scroller.addEventListener('pointerdown',e=>{ if(e.target.closest('.btn')) return;
        drag=true; moved=false; sx=e.clientX; sl=scroller.scrollLeft; scroller.classList.add('grabbing');
        try{scroller.setPointerCapture(e.pointerId);}catch(_){}});
      scroller.addEventListener('pointermove',e=>{ if(!drag) return; const dx=e.clientX-sx; if(Math.abs(dx)>4) moved=true; scroller.scrollLeft=sl-dx; });
      const endDrag=()=>{drag=false; scroller.classList.remove('grabbing');};
      scroller.addEventListener('pointerup',endDrag); scroller.addEventListener('pointercancel',endDrag);
      // active-card highlight + progress bar
      function update(){
        const max=scroller.scrollWidth-scroller.clientWidth;
        if(prog) prog.style.width=(max>0?(scroller.scrollLeft/max*100):0)+'%';
        const mid=scroller.scrollLeft+scroller.clientWidth/2; let best=0,bd=1e9;
        steps.forEach((c,i)=>{ const cc=c.offsetLeft+c.offsetWidth/2, d=Math.abs(cc-mid); if(d<bd){bd=d;best=i;} });
        steps.forEach((c,i)=>c.classList.toggle('active',i===best));
      }
      scroller.addEventListener('scroll',update); setTimeout(update,60);
      // click a step (not a drag) → open its detail slug
      steps.forEach(card=>card.addEventListener('click',()=>{ if(moved) return; if(detail) openDetail(detail, card); }));
      // detail back / close
      if(detail && !detail.dataset.wired){ detail.dataset.wired='1';
        detail.querySelector('.back-pill').addEventListener('click',()=>closeDetail(detail));
        detail.querySelector('.close-x').addEventListener('click',()=>closeDetail(detail));
      }
    });
  }
  ensureAll(); initProcess();

  tabsWrap.innerHTML=DIRS.map((d,i)=>`<button class="tab" role="tab" aria-selected="${i===0}" data-target="${d.key}"><b>${d.key} · ${d.name}</b><small>direction ${i+1} of ${DIRS.length}</small></button>`).join('');
  tabsWrap.addEventListener('click',e=>{
    const t=e.target.closest('.tab'); if(!t) return;
    const k=t.dataset.target;
    tabsWrap.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected', x.dataset.target===k));
    canvas.querySelectorAll('.direction').forEach(s=>s.classList.toggle('active', s.dataset.dir===k));
    window.scrollTo({top:0,behavior:'instant'});
    requestAnimationFrame(()=>{ ensureAll(canvas); initProcess(canvas); });
  });
})();
