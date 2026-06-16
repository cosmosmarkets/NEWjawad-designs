/* ============================================================
   Jawad Design — /services render: tabs, directions,
   nested-canvas pan/zoom, Tweaks-driven body classes.
   Depends on window.SVC (services.js).
   ============================================================ */
(function(){
  const S = window.SVC;

  const DIRS = [
    { key:'A', name:'Stacked Bands', short:'name left · outcome right',
      desc:'Three full-width bands stacked top to bottom. Each service puts its name on the left and the outcome line on the right — the eye lands on the name, then reads what you get. Calm, scannable, confident.',
      build:S.sheetA, mdir:'A',
      bands:[
        ['Header','One philosophy line — “Two things, done exceptionally.” Sets the whole offer before any detail.'],
        ['Service 1 · Portfolio sites','Name left, outcome right. Outcome-first: leads with what the client gets, not what I do.'],
        ['Service 2 · Landing pages','Same band rhythm; examples shown as chips beneath the outcome.'],
        ['Service 3 · Brand system','“With every project” — framed as a bonus that ships alongside.'],
        ['Always included','Six standards as one quiet strip under the services.'],
        ['CTA','See pricing (primary) + Work with me (secondary).'],
      ]},
    { key:'B', name:'Zig-Zag Anchors', short:'alternating sides · icon grid',
      desc:'Services alternate sides — an anchor image left, then right, then left — so the page has visual rhythm and momentum. The “always included” standards become a 2×3 icon grid.',
      build:S.sheetB, mdir:'B',
      bands:[
        ['Header','Philosophy line up top, same anchor for the page.'],
        ['Service 1 · anchor left','Image anchor left, outcome-first copy right.'],
        ['Service 2 · anchor right','Flips to anchor right — the zig-zag keeps the eye moving.'],
        ['Service 3 · anchor left','Back to anchor left; brand system as the third beat.'],
        ['Always included','Six standards as an icon + label grid (2×3).'],
        ['CTA','See pricing (primary) + Work with me (secondary).'],
      ]},
    { key:'C', name:'Manifesto-First', short:'oversized statement · numbered list',
      desc:'The philosophy statement is blown up to fill the first screen — a manifesto. Services follow as compact numbered entries (01 · 02 · 03), each leading with its outcome. Boldest, most editorial.',
      build:S.sheetC, mdir:'C',
      bands:[
        ['Manifesto','Oversized “Two things, done exceptionally.” owns screen one — opinion before offer.'],
        ['Services · numbered','01–03 compact entries; outcome-first line carries each.'],
        ['Always included','Six standards woven in as a tight inline run.'],
        ['CTA','See pricing (primary) + Work with me (secondary).'],
      ]},
    { key:'D', name:'Openable Canvas', short:'6 panels · click to open a detail canvas',
      desc:'The page is a pannable canvas of six panels — a showstopper philosophy anchor plus the three services, “always included”, and the CTA. Click any panel except the anchor and it zoom-expands into its own canvas-in-a-canvas of detail (matches the work slug). Drag to pan, scroll to zoom, ⊚ to recentre; back affordance is a Tweak.',
      build:S.sheetD, mdir:'D', isCanvas:true,
      bands:[
        ['Philosophy anchor','The showstopper, centre — oversized, double-framed. Sets the offer; not openable, it’s the hub the others wire back to.'],
        ['Service panels (×3)','Portfolio sites, Landing pages, Brand system. Each opens a detail canvas: hero · the outcome · the examples as tiles · a “what you get” deliverables panel.'],
        ['Always included','Opens a canvas of the six standards, each with a one-line gloss.'],
        ['CTA','Opens a canvas with See pricing (primary) + Work with me (secondary) + a scarcity note. Primary CTA is ALSO pinned in the floating nav.'],
        ['Zoom-expand','Clicking a panel scales it up into the nested canvas from the panel’s position; ← Back / ✕ returns (Tweak controls which show).'],
        ['Wires','Bold wires tie the anchor to all five panels — the whole offer as one system; nested canvases wire their hero to each detail panel.'],
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
    // philosophy anchor -> each world head + each offer panel (main wires)
    cv.querySelectorAll('.sc-clushead, .sc-offerpanel').forEach(p=>{ lines+=line(h,ctr(p),'w-main'); });
    // each world head -> its example satellites (light wires)
    cv.querySelectorAll('.sc-clushead').forEach(head=>{
      const cl=head.dataset.cluster;
      cv.querySelectorAll(`.sc-sat[data-cluster="${cl}"]`).forEach(s=>{ lines+=line(ctr(head),ctr(s),'w-sat'); });
    });
    svg.innerHTML=lines;
    cv.style.transform=prev;
  }
  function openDetail(detail, panel){
    const body=detail.querySelector('.detail-body');
    const id=panel.dataset.open;
    body.innerHTML = window.SVC.detailFor(id);
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
})();
