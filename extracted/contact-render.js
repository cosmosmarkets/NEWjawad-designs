/* ============================================================
   Jawad Design — /contact render: tabs, directions,
   nested-canvas pan/zoom, Tweaks-driven body classes.
   Depends on window.CONTACT (contact.js).
   ============================================================ */
(function(){
  const S = window.CONTACT;

  const DIRS = [
    { key:'A', name:'Split', short:'headline left · form right',
      desc:'Headline on the left, the form on the right — a calm, classic contact split. “Let’s build something.” holds the left; the minimal name/email/message form sits right, with the tier pre-fill and the honeypot in place. Socials, direct email, Discord and a restyled Calendly follow below.',
      build:S.sheetA, mdir:'A',
      bands:[
        ['Split · headline + form','Big type left; minimal form right (name · email · message). A pre-filled tier label appears if arriving from /pricing?tier=, with an in-form tier switcher.'],
        ['Socials + direct','Instagram · Behance · LinkedIn (confirm which are live), email shown directly, Discord as a CTA card, restyled Calendly embed.'],
      ]},
    { key:'B', name:'Form-Forward', short:'large centred form · quiet footer',
      desc:'The form is the hero — large and centred, rough-edged tactile styling — so there’s one obvious thing to do. Scarcity line and socials sit quietly in the footer beneath it; a restyled Calendly closes it out.',
      build:S.sheetB, mdir:'B',
      bands:[
        ['Form-forward','Centred headline + a big tactile form. Tier pre-fill + in-form switcher; honeypot + inline validation.'],
        ['Quiet footer','Scarcity line, socials (confirm which live), direct email, restyled Calendly — all understated below the form.'],
      ]},
    { key:'C', name:'Statement-Led', short:'oversized headline · form below',
      desc:'An oversized, full-bleed “Let’s build something.” owns the first screen; the form is revealed on scroll, then socials and Calendly sit as a card row. Boldest, most editorial.',
      build:S.sheetC, mdir:'C',
      bands:[
        ['Big type','Oversized full-bleed headline fills screen one.'],
        ['Form · revealed below','The minimal form on scroll — tier pre-fill + switcher, honeypot, validation; scarcity line beneath.'],
        ['Socials / Calendly · card row','Instagram · Behance · LinkedIn (confirm which live) + Discord + restyled Calendly as cards.'],
      ]},
    { key:'D', name:'Focused-Form Canvas', short:'land on the form · pan to the cards',
      desc:'A pannable canvas, but kept simple to use: you LAND on the form, centred and ready, with real focusable fields and a roomy message box. Drag to reveal the supporting cards orbiting it — socials, my Discord server, a restyled Calendly. Click a card and it zoom-expands into a canvas-in-a-canvas. The form itself never gets in the way.',
      build:S.sheetD, mdir:'D', isCanvas:true,
      bands:[
        ['The form · land here','Centre panel, real focusable fields (name · email · a larger message box), tier pre-fill + in-form tier switcher, honeypot, Send it. This is what you see first.'],
        ['Socials + direct','Opens a canvas of Instagram · Behance · LinkedIn as circular badges (confirm which live) + direct email.'],
        ['My Discord server','Opens a canvas about the studio server — what’s inside, who’s in, and the join link.'],
        ['Book a call','Opens a compact canvas — the restyled Calendly embed + an email fallback.'],
        ['Simple by design','The form is the .sc-hero you start on; wires tie the cards back to it; only the cards open, never the form.'],
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
        <p class="state-note"><b>tier pre-fill</b>Arriving from <u>/pricing?tier=…</u> pre-fills the tier label. The in-form switcher lets a visitor change tier without going back — try the segmented control, or the Tweak.</p>
        <p class="state-note"><b>honeypot + validation</b>A hidden <u>honeypot</u> field catches bots (real users never see it). On submit: required name/message, and email is format-checked inline before “Send it” fires the success state.</p>
        <p class="cta-where">Send it → in-brand success state (Tweak) · email → ${''}hi@jawad.design</p>
      </div>`;
  }

  function renderDir(dir,active){
    const df = dir.isCanvas ? dframeCanvas(dir.build()) : dframe(dir.build());
    const mf = dir.isCanvas ? mframeCanvas(S.sheetM(dir.mdir)) : mframe(S.sheetM(dir.mdir));
    return `<section class="direction${active?' active':''}" data-dir="${dir.key}" data-screen-label="Contact · Direction ${dir.key} — ${dir.name}">
        <div class="dir-head"><div class="num">${dir.key}</div>
          <div class="meta"><h2>${dir.name} <span class="dh-sub">${dir.short}</span></h2><p>${dir.desc}</p></div></div>
        <div class="band svc-bandrow">
          ${annot(dir)}
          <div class="d-col"><p class="view-cap">Desktop ~1440 · ${dir.isCanvas?'focused-form canvas':'contact page'}</p>${df}</div>
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
    body.innerHTML = window.CONTACT.detailFor(id);
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
        if(e.target.closest('.sc-ctrls')||e.target.closest('.btn')||e.target.closest('input,textarea,label,.cf-tierseg,.cf-form')) return;
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

  /* ---------- tier pre-fill: in-form switcher + Tweak both update the label ---------- */
  const TIER_NAMES = {none:'—', single:'The Single', edition:'The Edition', commission:'The Commission'};
  function setTier(k){
    if(!TIER_NAMES[k]) k='none';
    document.body.setAttribute('data-tier', k);
    document.querySelectorAll('[data-tier-name]').forEach(el=>{ el.textContent = TIER_NAMES[k]; });
    document.querySelectorAll('.cf-tierseg button').forEach(b=>b.setAttribute('aria-pressed', b.dataset.tier===k));
    document.querySelectorAll('.cf-tier').forEach(t=>t.classList.toggle('is-set', k!=='none'));
  }
  window.__setTier = setTier;
  // delegated: in-form tier segmented control + Send it -> success
  document.addEventListener('click',e=>{
    const seg=e.target.closest('.cf-tierseg button');
    if(seg){ e.preventDefault(); setTier(seg.dataset.tier); return; }
    const send=e.target.closest('.cf-send');
    if(send){ e.preventDefault(); document.body.classList.add('show-success'); }
  });
  setTier(document.body.getAttribute('data-tier')||'none');

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
