/* ============================================================
   Jawad Design — /pricing render: tabs, directions,
   nested-canvas pan/zoom, Tweaks-driven body classes.
   Depends on window.PRICE (pricing.js).
   ============================================================ */
(function(){
  const S = window.PRICE;

  const DIRS = [
    { key:'A', name:'Tier Cards', short:'middle raised · most popular',
      desc:'Three pricing cards side by side. The middle tier (The Edition) is raised and flagged MOST POPULAR — the recommended default. Prices read “from $X”, so the $500 floor anchors the left and $3,000 anchors the right; the eye settles on the raised middle.',
      build:S.sheetA, mdir:'A',
      bands:[
        ['Header','“Three ways to work together. Prices are where the conversation starts.”'],
        ['Tiers · cards','The Single ($500) · The Edition ($1,200, raised + flagged) · The Commission ($3,000). Price anchoring: cheap floor left, premium right, recommended middle.'],
        ['Always included','Six standards as one quiet strip below the cards.'],
        ['FAQ','Five honest answers — “from”, revisions, retainers, ownership, timing.'],
        ['Closing CTA','“Not sure which? Start the conversation.” → /contact.'],
      ]},
    { key:'B', name:'Comparison Table', short:'tiers as columns · ticks',
      desc:'A comparison table: tiers as columns, the “includes” as rows with ticks. The Edition column is highlighted as recommended. Best for buyers who want to scan exactly what differs between tiers.',
      build:S.sheetB, mdir:'B',
      bands:[
        ['Header','Same header line above the table.'],
        ['Tiers · table','Columns = tiers (price in the header row, so anchoring sits at the top), rows = features with ✓ / —. The Edition column is highlighted; its CTA is primary.'],
        ['Always included','Six standards strip under the table.'],
        ['FAQ','Five honest answers.'],
        ['Closing CTA','→ /contact.'],
      ]},
    { key:'C', name:'Editorial Rows', short:'stacked · middle heavier',
      desc:'Tiers as stacked editorial rows — name + price left, the includes right. The middle tier is visually heavier (larger, accent-outlined, flagged) so the recommended option carries the most weight on the page.',
      build:S.sheetC, mdir:'C',
      bands:[
        ['Header','Header line up top.'],
        ['Tiers · rows','01 The Single · 02 The Edition (heavier, flagged) · 03 The Commission. Price anchoring runs top($500)→bottom($3,000); the heavy middle row is the recommended beat.'],
        ['Always included','Six standards.'],
        ['FAQ','Five honest answers.'],
        ['Closing CTA','→ /contact.'],
      ]},
    { key:'D', name:'Value-Ladder Canvas', short:'tiers left→right by price · click to open',
      desc:'A pannable canvas laid out as a value ladder — the tiers run left→right by price ($500 → $1,200 → $3,000) so anchoring is spatial. The Edition sits dead-centre as the hub: it’s the largest, flagged MOST POPULAR, and every wire radiates from it. Click any tier (or the FAQ) and it zoom-expands into its own canvas-in-a-canvas. Drag to pan, scroll to zoom, ⊚ to recentre; back affordance is a Tweak.',
      build:S.sheetD, mdir:'D', isCanvas:true,
      bands:[
        ['Header bar','The header line as a top banner — sets the frame, not openable.'],
        ['The Single · $500','Left end of the ladder — the price FLOOR that anchors the low end. Opens its detail canvas.'],
        ['The Edition · $1,200','Dead-centre HUB — largest panel, MOST POPULAR, accent-outlined; all wires radiate from it. The recommended default. Opens its detail canvas.'],
        ['The Commission · $3,000','Right end — the CEILING that anchors the premium end and makes the middle feel reasonable. Opens its detail canvas.'],
        ['Always included','Supporting panel — six standards (not openable).'],
        ['FAQ','Openable — expands into a canvas of the five honest answers.'],
        ['Closing CTA','Supporting panel; primary CTA also pinned in the floating nav.'],
        ['Tier detail','Each tier opens a canvas-in-a-canvas — a Tweak switches it between a spatial detail map and a scope sheet.'],
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
        <p class="state-note"><b>recommended emphasis</b>The Edition is the default — raised/centred, flagged <u>MOST POPULAR</u>, and accent-outlined so the eye rests there first.</p>
        <p class="state-note"><b>price anchoring</b>The $500 <u>floor</u> sits at the low end and the $3,000 <u>ceiling</u> at the high end; flanking the $1,200 Edition makes it read as the reasonable middle.</p>
        <p class="cta-where">Each tier CTA → /contact?tier=… · primary on The Edition</p>
      </div>`;
  }

  function renderDir(dir,active){
    const df = dir.isCanvas ? dframeCanvas(dir.build()) : dframe(dir.build());
    const mf = dir.isCanvas ? mframeCanvas(S.sheetM(dir.mdir)) : mframe(S.sheetM(dir.mdir));
    return `<section class="direction${active?' active':''}" data-dir="${dir.key}" data-screen-label="Pricing · Direction ${dir.key} — ${dir.name}">
        <div class="dir-head"><div class="num">${dir.key}</div>
          <div class="meta"><h2>${dir.name} <span class="dh-sub">${dir.short}</span></h2><p>${dir.desc}</p></div></div>
        <div class="band svc-bandrow">
          ${annot(dir)}
          <div class="d-col"><p class="view-cap">Desktop ~1440 · ${dir.isCanvas?'value-ladder canvas':'pricing page'}</p>${df}</div>
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
    body.innerHTML = window.PRICE.detailFor(id);
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
