/* ============================================================
   Jawad — Playground mode (shared engine)
   Opt-in layer over the authored canvases. TOUR (default) keeps
   panels fixed; PLAYGROUND lets you drag (gentle inertia), scale
   (corner handle), and pan/zoom the world. Reset layout restores
   authored positions; Back to tour exits. Persists per-canvas.
   Desktop / pointer:fine only. Reduced-motion = no animation.
   Loaded into every page by the prototype (and standalone pages).
   ============================================================ */
(function(){
  if(window.__jawadPG) return; window.__jawadPG=1;
  const FINE = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  const REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COARSE = window.matchMedia && window.matchMedia('(pointer:coarse)').matches;
  const NARROW = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
  const ENABLED = FINE && !COARSE && !NARROW;   // playground is desktop / pointer:fine only

  const SMIN=0.5, SMAX=2.4;

  function ready(fn){ if(document.body) fn(); else addEventListener('DOMContentLoaded',fn); }
  ready(()=>{ if(!ENABLED) return; injectCSS(); tryBoot(0); });
  function tryBoot(n){
    if(window.__jawadPGbooted) return;
    const ad=makeAdapter();
    if(ad){ window.__jawadPGbooted=1; boot(ad); return; }
    if(n<60) setTimeout(()=>tryBoot(n+1),150);   // canvas builds lazily after tab select
  }

  function injectCSS(){
    if(document.getElementById('__pgcss')) return;
    const st=document.createElement('style'); st.id='__pgcss';
    st.textContent=`
      .pg-ctrls{position:absolute;right:14px;z-index:30;display:flex;flex-direction:column;gap:8px;align-items:flex-end;}
      .pg-seg{display:flex;align-items:center;background:rgba(244,243,240,.94);border:1.5px solid var(--ink,#2c2c2a);
        border-radius:999px;padding:3px;backdrop-filter:blur(4px);box-shadow:0 4px 16px rgba(0,0,0,.14);}
      .pg-seg button{appearance:none;cursor:pointer;font-family:'SF Mono',ui-monospace,monospace;font-size:11px;
        color:var(--ink-soft,#6f6e6a);background:transparent;border:none;border-radius:999px;padding:6px 14px;
        display:flex;align-items:center;gap:6px;transition:color .16s,background .22s cubic-bezier(.2,.8,.2,1);letter-spacing:.02em;}
      .pg-seg button .ic{width:12px;height:12px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;}
      .pg-seg button[aria-pressed="true"]{background:var(--ink,#2c2c2a);color:var(--paper,#f4f3f0);box-shadow:0 2px 8px rgba(0,0,0,.2);}
      .pg-btn{appearance:none;cursor:pointer;font-family:'SF Mono',ui-monospace,monospace;font-size:10.5px;
        color:var(--ink,#2c2c2a);background:rgba(244,243,240,.94);border:1.5px solid var(--ink,#2c2c2a);
        border-radius:999px;padding:6px 12px;display:flex;align-items:center;gap:6px;backdrop-filter:blur(3px);
        box-shadow:0 3px 12px rgba(0,0,0,.12);transition:background .14s,color .14s,transform .12s;}
      .pg-btn:hover{background:var(--paper,#f4f3f0);transform:translateY(-1px);}
      .pg-btn:active{transform:translateY(0) scale(.97);}
      .pg-sub{display:flex;flex-direction:column;gap:7px;align-items:flex-end;opacity:0;transform:translateY(-6px) scale(.96);
        transform-origin:top right;pointer-events:none;transition:opacity .26s ease,transform .3s cubic-bezier(.2,.85,.25,1);}
      .pg-ctrls.playing .pg-sub{opacity:1;transform:none;pointer-events:auto;}
      .pg-zoomrow{display:flex;align-items:center;gap:5px;}
      .pg-zbtn{padding:5px 0;width:30px;justify-content:center;font-size:14px;line-height:1;}
      .pg-zoom{font-family:'SF Mono',ui-monospace,monospace;font-size:10px;color:var(--ink,#2c2c2a);
        background:rgba(244,243,240,.94);border:1.5px solid var(--ink,#2c2c2a);border-radius:999px;padding:5px 11px;
        min-width:54px;text-align:center;box-shadow:0 3px 12px rgba(0,0,0,.12);}
      .pg-hint{font-family:'SF Mono',ui-monospace,monospace;font-size:9.5px;letter-spacing:.04em;max-width:230px;text-align:right;
        color:var(--ink-soft,#6f6e6a);background:rgba(244,243,240,.86);border:1px solid var(--line-soft,#b9b8b3);
        border-radius:12px;padding:6px 11px;line-height:1.5;}
      /* first-time toast */
      .pg-toast{position:absolute;left:50%;top:18px;transform:translateX(-50%) translateY(-8px);z-index:34;opacity:0;
        font-family:'SF Mono',ui-monospace,monospace;font-size:11px;color:var(--paper,#f4f3f0);background:rgba(44,44,42,.94);
        border-radius:999px;padding:9px 16px;letter-spacing:.02em;pointer-events:none;
        transition:opacity .4s ease,transform .5s cubic-bezier(.2,.85,.25,1);box-shadow:0 8px 24px rgba(0,0,0,.25);}
      .pg-toast.show{opacity:1;transform:translateX(-50%) translateY(0);}

      /* world gets a faint "unlocked" wash while playing */
      .pg-on{cursor:none;}
      .pg-on .jawad-pg-grab{cursor:none;}
      /* movable panel affordances (play mode only) */
      .pg-grabbable{transition:box-shadow .3s cubic-bezier(.2,.8,.2,1),outline-color .25s ease;}
      .pg-on .pg-grabbable{outline:1.2px dashed var(--line-soft,#b9b8b3);outline-offset:4px;
        box-shadow:0 10px 26px rgba(0,0,0,.10);}
      .pg-on .pg-grabbable:hover{outline-color:var(--ink,#2c2c2a);box-shadow:0 16px 36px rgba(0,0,0,.16);}
      /* grab-dots affordance, top-left, fade in on hover */
      .pg-dots{position:absolute;left:8px;top:8px;width:14px;height:14px;z-index:8;opacity:0;
        transition:opacity .2s ease;pointer-events:none;
        background-image:radial-gradient(var(--ink,#2c2c2a) 1px,transparent 1.4px);background-size:5px 5px;}
      .pg-on .pg-grabbable:hover .pg-dots{opacity:.55;}
      .pg-handle{position:absolute;right:-9px;bottom:-9px;width:21px;height:21px;border-radius:50%;
        border:1.6px solid var(--ink,#2c2c2a);background:var(--paper,#f4f3f0);z-index:9;cursor:nwse-resize;
        display:none;align-items:center;justify-content:center;box-shadow:0 2px 7px rgba(0,0,0,.22);
        opacity:0;transform:scale(.5);transition:opacity .22s ease,transform .26s cubic-bezier(.2,.85,.25,1),background .14s;}
      .pg-handle::after{content:"";width:7px;height:7px;border-right:1.6px solid var(--ink,#2c2c2a);
        border-bottom:1.6px solid var(--ink,#2c2c2a);transform:translate(-1px,-1px);}
      .pg-handle:hover{background:var(--ink,#2c2c2a);}
      .pg-handle:hover::after{border-color:var(--paper,#f4f3f0);}
      .pg-on .pg-grabbable .pg-handle{display:flex;}
      .pg-on .pg-grabbable:hover .pg-handle, .pg-grabbable.pg-dragging .pg-handle{opacity:1;transform:scale(1);}
      /* dragged panel sits on top; others dim to focus it */
      .pg-dragging{z-index:60!important;}
      .pg-on.pg-has-drag .pg-grabbable:not(.pg-dragging){opacity:.5!important;transition:opacity .2s ease;}
      /* alignment guides */
      .pg-guide{position:absolute;z-index:55;background:var(--accent,#d2502f);pointer-events:none;opacity:.7;}
      .pg-guide.v{width:1px;top:0;bottom:0;}
      .pg-guide.h{height:1px;left:0;right:0;}
    `;
    document.head.appendChild(st);
  }

  /* ---------- detect the canvas family + build an adapter ---------- */
  function makeAdapter(){
    // HOME (Direction E) — defers to HOMEE hooks
    if(window.HOMEE && window.HOMEE.pg && document.querySelector('#e-world')){
      const h=window.HOMEE.pg;
      return {
        family:'home', mount:h.stage||document.querySelector('.e-stage'),
        world:h.world, viewport:h.viewport, panelSel:'.e-panel',
        base:()=> 'translate(-50%,-50%)',
        home:(el)=>({x:parseFloat(el.style.left)||0,y:parseFloat(el.style.top)||0}),
        getCam:h.getCam, setCam:h.setCam, suspend:h.suspend, resume:h.resume,
        openSel:'.e-panel.openable'
      };
    }
    // SCASE family (services/pricing/contact/process/casestudy + nested .sc-detail)
    const scase=visibleScase();
    if(scase){
      const cv=scase.querySelector('.sc-canvas');
      return adapterForScase(scase,cv);
    }
    // WB whiteboard (work)
    const wb=document.querySelector('.wb');
    if(wb){
      const cv=wb.querySelector('.wb-canvas')||wb;
      return adapterForFree(wb,cv,'.wb-panel','wb');
    }
    return null;
  }
  function visibleScase(){
    const all=[...document.querySelectorAll('.scase')];
    // prefer one inside an open detail overlay, else the first visible
    const open=all.find(s=>{ const d=s.closest('.sc-detail,.demo-sheet'); return d && d.classList.contains('open') && s.offsetParent; });
    if(open) return open;
    return all.find(s=>s.offsetParent) || all[0] || null;
  }
  function adapterForScase(scase,cv){
    // sc canvases expose _st {s,px,py} and _apply()
    return {
      family:'scase', mount:scase, world:cv, viewport:scase, panelSel:'.sc-panel',
      base:()=> 'translate(-50%,-50%)',
      home:(el)=>({ x: pctLeft(el), y: pctTop(el) }),
      getCam:()=> scase._st?{x:scase._st.px,y:scase._st.py,s:scase._st.s}:{x:0,y:0,s:1},
      setCam:(c)=>{ if(scase._st){ scase._st.px=c.x;scase._st.py=c.y;scase._st.s=c.s; scase._apply&&scase._apply(); } else { cv.style.transform=`translate(${c.x}px,${c.y}px) scale(${c.s})`; } },
      suspend:()=>{}, resume:()=>{}, openSel:'.sc-panel.openable,[data-open]'
    };
  }
  function adapterForFree(mount,cv,sel,fam){
    return {
      family:fam, mount, world:cv, viewport:mount, panelSel:sel,
      base:(el)=> el.__pgBase!=null?el.__pgBase:'translate(-50%,-50%)',
      home:(el)=>({x:pctLeft(el),y:pctTop(el)}),
      getCam:()=>{ const m=parseTransform(cv); return {x:m.x,y:m.y,s:m.s}; },
      setCam:(c)=>{ cv.style.transform=`translate(${c.x}px,${c.y}px) scale(${c.s})`; },
      suspend:()=>{}, resume:()=>{}, openSel:'[data-open],.openable'
    };
  }
  function pctLeft(el){ const v=el.style.left||''; return v.includes('calc')? evalCalc(v): (parseFloat(v)||0); }
  function pctTop(el){ const v=el.style.top||''; return v.includes('calc')? evalCalc(v): (parseFloat(v)||0); }
  function evalCalc(v){ const m=v.match(/calc\(\s*50%\s*([+-])\s*([\d.]+)px/); if(m){ return (m[1]==='-'?-1:1)*parseFloat(m[2]); } return 0; }
  function parseTransform(el){ const t=el.style.transform||''; const tr=t.match(/translate\(\s*(-?[\d.]+)px\s*,\s*(-?[\d.]+)px/); const sc=t.match(/scale\(\s*([\d.]+)/); return {x:tr?parseFloat(tr[1]):0,y:tr?parseFloat(tr[2]):0,s:sc?parseFloat(sc[1]):1}; }

  /* ---------- engine ---------- */
  function boot(ad){
    if(!ad) return;
    const KEY='jawad-pg:'+location.pathname.split('/').pop()+':'+ad.family;
    let PLAY=false;
    const deltas=new Map();   // panel el -> {dx,dy,s}
    let camHome=null;         // camera saved on entering play

    /* controls cluster near the existing minimap/controls */
    const ctrls=document.createElement('div'); ctrls.className='pg-ctrls';
    // on home, the Tour/Play toggle docks INSIDE the unified nav card (bottom-centre);
    // elsewhere it floats top-right.
    const navSlot = ad.family==='home' ? document.getElementById('e-nav-toggle') : null;
    if(!navSlot) ctrls.style.top = ad.family==='home' ? '64px' : '12px';
    ctrls.innerHTML=`
      <div class="pg-seg" role="group" aria-label="Tour or Playground">
        <button data-act="tour" aria-pressed="true"><span class="ic">⊙</span>Tour</button>
        <button data-act="play" aria-pressed="false"><span class="ic">▦</span>Play</button>
      </div>
      <div class="pg-sub">
        <div class="pg-zoomrow">
          <button class="pg-btn pg-zbtn" data-act="zout" title="Zoom out">−</button>
          <div class="pg-zoom" title="Click to fit">100%</div>
          <button class="pg-btn pg-zbtn" data-act="zin" title="Zoom in">+</button>
        </div>
        <button class="pg-btn" data-act="reset">↺ Reset layout</button>
        <span class="pg-hint">drag panels to rearrange · corner handle resizes · drag empty canvas to pan · wheel to zoom</span>
      </div>`;
    (navSlot||ad.mount).appendChild(ctrls);
    const segTour=ctrls.querySelector('[data-act="tour"]');
    const segPlay=ctrls.querySelector('[data-act="play"]');
    const zoomReadout=ctrls.querySelector('.pg-zoom');

    const toast=document.createElement('div'); toast.className='pg-toast';
    toast.textContent='Playground — drag, resize and rearrange anything';
    ad.mount.appendChild(toast);

    ctrls.addEventListener('click',e=>{
      const b=e.target.closest('[data-act]'); if(!b) return;
      const a=b.dataset.act;
      if(a==='play') enterPlay();
      else if(a==='tour') exitPlay();
      else if(a==='reset') resetLayout();
      else if(a==='zin') stepZoom(1.18);
      else if(a==='zout') stepZoom(1/1.18);
    });
    zoomReadout.addEventListener('click',()=>fitWorld());
    function stepZoom(f){ const c=ad.getCam(); const ns=clamp((c.s||1)*f,0.3,2.2);
      if(REDUCE){ ad.setCam({x:c.x,y:c.y,s:ns}); setZoomReadout(); return; }
      const t0=performance.now(),dur=200,s0=c.s||1;
      (function st(now){ const x=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-x,3);
        ad.setCam({x:c.x,y:c.y,s:s0+(ns-s0)*e}); setZoomReadout(); if(x<1) requestAnimationFrame(st); })(t0);
    }

    function panels(){ return [...ad.world.querySelectorAll(ad.panelSel)]; }
    function setZoomReadout(){ const c=ad.getCam(); zoomReadout.textContent=Math.round((c.s||1)*100)+'%'; }

    function enterPlay(){
      if(PLAY) return; PLAY=true;
      ad.mount.classList.add('pg-on'); ctrls.classList.add('playing');
      segPlay.setAttribute('aria-pressed','true'); segTour.setAttribute('aria-pressed','false');
      ad.suspend && ad.suspend();
      camHome=ad.getCam();
      panels().forEach((el,i)=>{
        if(ad.family==='wb' && el.__pgBase==null) el.__pgBase=el.style.transform||'translate(-50%,-50%)';
        if(!deltas.has(el)) deltas.set(el,{dx:0,dy:0,s:1});
        el.classList.add('jawad-pg-grab','pg-grabbable');
        el.style.opacity='1';
        ensureHandle(el); ensureDots(el);
        applyPanel(el);
        wirePanel(el);
        if(!REDUCE) liftIn(el,i);     // staggered "unlock" lift
      });
      restore();   // load saved layout if any
      setZoomReadout();
      firstTimeToast();
      document.querySelectorAll(overlaySel+'.open').forEach(ov=>wireNested(ov));
    }
    function liftIn(el,i){
      const d=deltas.get(el); const base=ad.base(el);
      el.animate(
        [{transform:panelTF(base,d.dx,d.dy-10,d.s*0.97)},{transform:panelTF(base,d.dx,d.dy,d.s)}],
        {duration:420,delay:i*34,easing:'cubic-bezier(.2,.85,.25,1)'}
      );
    }
    function exitPlay(){
      if(!PLAY) return; PLAY=false;
      ad.mount.classList.remove('pg-on','pg-has-drag'); ctrls.classList.remove('playing');
      segPlay.setAttribute('aria-pressed','false'); segTour.setAttribute('aria-pressed','true');
      panels().forEach(el=>{ el.classList.remove('jawad-pg-grab','pg-grabbable','pg-dragging'); el.style.transition=''; });
      document.querySelectorAll(overlaySel).forEach(ov=>ov.classList.remove('pg-on','pg-has-drag'));
      if(camHome) ad.setCam(camHome);
      ad.resume && ad.resume();          // home: resumes the tour camera loop
      if(ad.family!=='home') restorePanelTransforms();
    }
    function firstTimeToast(){
      try{ if(localStorage.getItem('jawad-pg-seen')) return; localStorage.setItem('jawad-pg-seen','1'); }catch(_){}
      requestAnimationFrame(()=>toast.classList.add('show'));
      setTimeout(()=>toast.classList.remove('show'),3400);
    }
    function fitWorld(){
      const c=ad.getCam(), target=camHome||{x:0,y:0,s:1};
      if(REDUCE){ ad.setCam(target); setZoomReadout(); return; }
      const t0=performance.now(),dur=420;
      (function step(now){ const x=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-x,3);
        ad.setCam({x:c.x+(target.x-c.x)*e,y:c.y+(target.y-c.y)*e,s:c.s+(target.s-c.s)*e}); setZoomReadout();
        if(x<1) requestAnimationFrame(step); })(t0);
    }
    function panelTF(base,dx,dy,s,extra){
      if(ad.family==='wb') return `translate(${dx}px,${dy}px) ${base} scale(${s})${extra||''}`;
      return `${base} translate(${dx}px,${dy}px) scale(${s})${extra||''}`;
    }
    function restorePanelTransforms(){
      panels().forEach(el=>{ el.style.transform = ad.base(el); });
    }

    function ensureHandle(el){
      if(el.querySelector(':scope > .pg-handle')) return;
      const h=document.createElement('div'); h.className='pg-handle'; h.title='Resize';
      el.appendChild(h);
      let s0,d0,sx,sy;
      h.addEventListener('pointerdown',ev=>{
        ev.stopPropagation(); ev.preventDefault();
        const d=deltas.get(el); s0=d.s; sx=ev.clientX; sy=ev.clientY;
        window.__jawadDragging=true; window.__jawadDragLabel='SIZE';
        const move=mv=>{ const dd=((mv.clientX-sx)+(mv.clientY-sy))/2; d.s=clamp(s0 + dd/120, SMIN, SMAX); applyPanel(el); };
        const up=()=>{ window.__jawadDragging=false; document.removeEventListener('pointermove',move); document.removeEventListener('pointerup',up); persist(); };
        document.addEventListener('pointermove',move); document.addEventListener('pointerup',up);
        try{h.setPointerCapture(ev.pointerId);}catch(_){}
      });
    }

    function applyPanel(el, live){
      const d=deltas.get(el)||{dx:0,dy:0,s:1};
      const base=ad.base(el);
      let s=d.s, extra='';
      if(live){ s=d.s*(live.k||1); if(live.tilt) extra=` rotate(${live.tilt.toFixed(2)}deg)`; }
      el.style.transform=panelTF(base,d.dx,d.dy,s,extra);
    }
    function ensureDots(el){
      if(el.querySelector(':scope > .pg-dots')) return;
      const dt=document.createElement('div'); dt.className='pg-dots'; el.appendChild(dt);
    }
    /* soft alignment guides while dragging */
    let guideV, guideH;
    function ensureGuides(){
      if(guideV) return;
      guideV=document.createElement('div'); guideV.className='pg-guide v'; guideV.style.display='none';
      guideH=document.createElement('div'); guideH.className='pg-guide h'; guideH.style.display='none';
      ad.world.appendChild(guideV); ad.world.appendChild(guideH);
    }
    function clearGuides(){ if(guideV){guideV.style.display='none';guideH.style.display='none';} }
    function snapGuides(el){
      ensureGuides();
      const d=deltas.get(el); const cam=ad.getCam();
      const me=el.getBoundingClientRect();
      const mc={x:me.left+me.width/2,y:me.top+me.height/2,l:me.left,r:me.right,t:me.top,b:me.bottom};
      const TOL=7; let snapX=null,snapY=null,gx=null,gy=null;
      panels().forEach(o=>{ if(o===el) return; const r=o.getBoundingClientRect();
        const oc={x:r.left+r.width/2,l:r.left,r:r.right,y:r.top+r.height/2,t:r.top,b:r.bottom};
        [[mc.x,oc.x],[mc.l,oc.l],[mc.r,oc.r]].forEach(([a,b])=>{ if(snapX===null&&Math.abs(a-b)<TOL){ snapX=(b-a)/cam.s; gx=b; } });
        [[mc.y,oc.y],[mc.t,oc.t],[mc.b,oc.b]].forEach(([a,b])=>{ if(snapY===null&&Math.abs(a-b)<TOL){ snapY=(b-a)/cam.s; gy=b; } });
      });
      const wr=ad.world.getBoundingClientRect();
      if(gx!==null){ d.dx+=snapX; guideV.style.display='block'; guideV.style.left=((gx-wr.left)/cam.s)+'px'; } else if(guideV) guideV.style.display='none';
      if(gy!==null){ d.dy+=snapY; guideH.style.display='block'; guideH.style.top=((gy-wr.top)/cam.s)+'px'; } else if(guideH) guideH.style.display='none';
    }

    function wirePanel(el){
      if(el.__pgWired) return; el.__pgWired=true;
      let sx,sy,ox,oy,moved,downT,vx=0,vy=0,lx,ly,lt,raf;
      el.addEventListener('pointerdown',ev=>{
        if(!PLAY) return;
        if(ev.target.closest('.pg-handle')) return;        // resize handle owns this
        ev.stopPropagation();
        const d=deltas.get(el); ox=d.dx; oy=d.dy; sx=ev.clientX; sy=ev.clientY;
        lx=ev.clientX; ly=ev.clientY; lt=performance.now(); vx=vy=0; moved=false; downT=performance.now();
        cancelAnimationFrame(raf);
        el.classList.add('pg-dragging'); ad.mount.classList.add('pg-has-drag');
        window.__jawadDragging=true; window.__jawadDragLabel='DRAG';
        const cam=ad.getCam();
        let tilt=0;
        const move=mv=>{
          const dxp=(mv.clientX-sx)/cam.s, dyp=(mv.clientY-sy)/cam.s;
          if(Math.abs(mv.clientX-sx)+Math.abs(mv.clientY-sy)>4) moved=true;
          d.dx=ox+dxp; d.dy=oy+dyp;
          const now=performance.now(), dt=Math.max(1,now-lt);
          vx=(mv.clientX-lx)/dt/cam.s*16; vy=(mv.clientY-ly)/dt/cam.s*16;
          lx=mv.clientX; ly=mv.clientY; lt=now;
          if(moved && !REDUCE) snapGuides(el);          // soft-align after committing the move delta
          tilt = REDUCE?0:clamp(vx*0.6,-7,7);            // lean into the drag direction
          applyPanel(el, {k:REDUCE?1:1.05, tilt});       // lift + scale-up while held
        };
        const up=ev2=>{
          document.removeEventListener('pointermove',move); document.removeEventListener('pointerup',up);
          ad.mount.classList.remove('pg-has-drag'); clearGuides();
          window.__jawadDragging=false;
          if(!moved){ el.classList.remove('pg-dragging');
            if(el.matches&&el.matches(ad.openSel)) maybeOpen(el);
            persist(); return;
          }
          settle();
          function settle(){ // springy scale/​tilt back to rest, then drop z-index
            if(REDUCE){ applyPanel(el); el.classList.remove('pg-dragging'); maybeGlide(); return; }
            const t0=performance.now(),dur=260;
            (function s(now){ const x=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-x,3);
              applyPanel(el,{k:1+0.05*(1-e),tilt:tilt*(1-e)});
              if(x<1) requestAnimationFrame(s); else { applyPanel(el); el.classList.remove('pg-dragging'); maybeGlide(); }
            })(t0);
          }
          function maybeGlide(){
            if(!REDUCE && (Math.abs(vx)>0.6||Math.abs(vy)>0.6)){ const d2=deltas.get(el);
              (function step(){ vx*=0.88; vy*=0.88; d2.dx+=vx; d2.dy+=vy; applyPanel(el);
                if(Math.abs(vx)>0.15||Math.abs(vy)>0.15) raf=requestAnimationFrame(step); else persist(); })();
            } else persist();
          }
        };
        document.addEventListener('pointermove',move); document.addEventListener('pointerup',up);
        try{el.setPointerCapture(ev.pointerId);}catch(_){}
      });
    }
    function maybeOpen(el){
      // let the page's own click handler run (we didn't preventDefault); nothing else needed
      el.dispatchEvent(new MouseEvent('click',{bubbles:true}));
    }

    /* world pan (drag empty canvas) + wheel zoom — only in play, only when not on a panel */
    ad.viewport.addEventListener('pointerdown',ev=>{
      if(!PLAY) return;
      if(ev.target.closest(ad.panelSel)||ev.target.closest('.pg-ctrls')||ev.target.closest('.pg-handle')) return;
      window.__jawadDragging=true; window.__jawadDragLabel='PAN';
      const cam=ad.getCam(); const sx=ev.clientX, sy=ev.clientY, ox=cam.x, oy=cam.y;
      const move=mv=>{ ad.setCam({x:ox+(mv.clientX-sx),y:oy+(mv.clientY-sy),s:cam.s}); };
      const up=()=>{ window.__jawadDragging=false; document.removeEventListener('pointermove',move); document.removeEventListener('pointerup',up); };
      document.addEventListener('pointermove',move); document.addEventListener('pointerup',up);
    },true);
    ad.viewport.addEventListener('wheel',ev=>{
      if(!PLAY) return; ev.preventDefault(); ev.stopPropagation();
      const cam=ad.getCam(); const ns=clamp(cam.s - ev.deltaY*0.0012, 0.3, 2.2);
      ad.setCam({x:cam.x,y:cam.y,s:ns}); setZoomReadout();
    },{capture:true,passive:false});

    /* persistence */
    function persist(){
      try{ const o={}; deltas.forEach((d,el)=>{ const i=panels().indexOf(el); if(i>=0) o[i]={dx:Math.round(d.dx),dy:Math.round(d.dy),s:+d.s.toFixed(3)}; });
        localStorage.setItem(KEY, JSON.stringify(o)); }catch(_){}
    }
    function restore(){
      try{ const o=JSON.parse(localStorage.getItem(KEY)||'{}'); const ps=panels();
        Object.keys(o).forEach(k=>{ const el=ps[+k]; if(el){ deltas.set(el,Object.assign({dx:0,dy:0,s:1},o[k])); applyPanel(el); } });
      }catch(_){}
    }
    function resetLayout(){
      const ps=panels();
      if(REDUCE){ ps.forEach(el=>{ deltas.set(el,{dx:0,dy:0,s:1}); applyPanel(el); }); try{localStorage.removeItem(KEY);}catch(_){}; if(camHome)ad.setCam(camHome); return; }
      // springy "fly home" with a soft settle + slight stagger
      const start=ps.map(el=>Object.assign({},deltas.get(el)||{dx:0,dy:0,s:1}));
      try{localStorage.removeItem(KEY);}catch(_){}
      const back=(x)=>{ const c1=1.70158*0.6, c3=c1+1; return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2); };
      const dur=560, stag=40, t0=performance.now();
      ps.forEach((el,i)=>{
        const s=start[i], d=deltas.get(el), delay=i*stag;
        (function step(now){
          const x=Math.max(0,Math.min(1,(now-t0-delay)/dur)); const e=back(x);
          d.dx=s.dx*(1-e); d.dy=s.dy*(1-e); d.s=s.s+(1-s.s)*e; applyPanel(el);
          if(x<1) requestAnimationFrame(step);
        })(performance.now());
      });
      if(camHome){ const c0=ad.getCam(); const t1=performance.now();
        (function camStep(now){ const x=Math.min(1,(now-t1)/dur); const e=1-Math.pow(1-x,3);
          ad.setCam({x:c0.x+(camHome.x-c0.x)*e,y:c0.y+(camHome.y-c0.y)*e,s:c0.s+(camHome.s-c0.s)*e}); setZoomReadout();
          if(x<1) requestAnimationFrame(camStep); })(t1);
      }
    }
    function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

    /* ---------- nested overlays (About/Trust on home, .sc-detail on scase) ---------- */
    // When Play is on and a nested overlay opens, make its inner panels draggable too.
    const overlaySel = ad.family==='home' ? '.e-detail' : '.sc-detail,.demo-sheet';
    const nestedWorldSel = ad.family==='home' ? '.e-dworld' : '.scase .sc-canvas';
    const nestedPanelSel = ad.family==='home' ? '.e-panel' : '.sc-panel';
    document.querySelectorAll(overlaySel).forEach(ov=>{
      const obs=new MutationObserver(()=>{ if(ov.classList.contains('open')) setTimeout(()=>wireNested(ov),120); });
      obs.observe(ov,{attributes:true,attributeFilter:['class']});
    });
    function wireNested(ov){
      if(!PLAY) return;
      const world=ov.querySelector(nestedWorldSel)||ov;
      ov.classList.add('pg-on');
      world.querySelectorAll(nestedPanelSel).forEach(el=>{
        if(el.__nestWired) return; el.__nestWired=true;
        el.classList.add('jawad-pg-grab','pg-grabbable');
        el.__nd={dx:0,dy:0};
        const baseTF=el.style.transform||'';
        ensureDots(el);
        const nApply=()=>{ el.style.transform=`${baseTF} translate(${el.__nd.dx}px,${el.__nd.dy}px)`; };
        el.addEventListener('pointerdown',ev=>{
          if(!PLAY) return; ev.stopPropagation();
          const sx=ev.clientX,sy=ev.clientY,ox=el.__nd.dx,oy=el.__nd.dy; let moved=false;
          el.classList.add('pg-dragging'); ov.classList.add('pg-has-drag');
          window.__jawadDragging=true; window.__jawadDragLabel='DRAG';
          const sc=getNestedScale(world);
          const move=mv=>{ if(Math.abs(mv.clientX-sx)+Math.abs(mv.clientY-sy)>4) moved=true;
            el.__nd.dx=ox+(mv.clientX-sx)/sc; el.__nd.dy=oy+(mv.clientY-sy)/sc; nApply(); };
          const up=()=>{ document.removeEventListener('pointermove',move); document.removeEventListener('pointerup',up);
            el.classList.remove('pg-dragging'); ov.classList.remove('pg-has-drag'); window.__jawadDragging=false;
            if(!moved && el.matches(ad.openSel)) maybeOpen(el); };
          document.addEventListener('pointermove',move); document.addEventListener('pointerup',up);
          try{el.setPointerCapture(ev.pointerId);}catch(_){}
        });
      });
    }
    function getNestedScale(world){ const m=(world.style.transform||'').match(/scale\(\s*([\d.]+)/); return m?parseFloat(m[1]):1; }

    // expose for the prototype / debugging
    window.__jawadPGapi={ enterPlay, exitPlay, isPlaying:()=>PLAY, family:ad.family, wireNested:()=>document.querySelectorAll(overlaySel+'.open').forEach(wireNested) };
  }
})();
