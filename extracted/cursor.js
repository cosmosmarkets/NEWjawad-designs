/* ============================================================
   Jawad — custom cursor (desktop / pointer:fine only)
   A clean 4-point sparkle (concave curved sides) flanked by two
   chevron arrows ‹ ›, mirroring left=forward / right=back. Over an
   openable target the sparkle blooms into a filled "OPEN" mark; over
   a draggable it reads "GRAB"/"DRAG". Every click leaves a quick ink
   splat (marker feel). Movement feel is a Tweak:
   window.__jawadCursorFeel = 'snappy' (default) | 'smooth' | 'magnetic'.
   Hidden on touch. Loaded into every page + the parent shell.
   ============================================================ */
(function(){
  if(!window.matchMedia || !window.matchMedia('(pointer:fine)').matches) return; // desktop only
  if(window.__jawadCursor) return; window.__jawadCursor=1;

  const INK='var(--ink,#2c2c2a)', PAPER='var(--paper,#f4f3f0)';
  try{ if(window.__jawadCursorFeel==null){ const v=localStorage.getItem('jawad-cursor-feel'); if(v) window.__jawadCursorFeel=v; } }catch(_){ }

  const css=document.createElement('style');
  css.textContent=`
    html.jawad-hidecursor, html.jawad-hidecursor *{cursor:none!important;}
    #jawad-cursor{position:fixed;left:-80px;top:-80px;z-index:2147483600;pointer-events:none;
      transform:translate(-50%,-50%);display:none;opacity:1;transition:opacity .2s ease;}
    #jawad-cursor.on{display:block;}
    #jawad-cursor.dim{opacity:0;}
    #jawad-cursor .jc-star{position:absolute;left:50%;top:50%;width:22px;height:22px;transform:translate(-50%,-50%);
      transition:width .18s cubic-bezier(.2,.8,.2,1),height .18s cubic-bezier(.2,.8,.2,1);overflow:visible;}
    #jawad-cursor .jc-star path{fill:none;stroke:${INK};stroke-width:1.6;stroke-linejoin:round;
      vector-effect:non-scaling-stroke;transition:fill .18s ease;}
    #jawad-cursor .jc-arrow{position:absolute;top:50%;width:13px;height:16px;transform:translateY(-50%) scale(1);
      opacity:1;transition:opacity .16s ease,transform .16s cubic-bezier(.2,.8,.2,1);overflow:visible;}
    #jawad-cursor .jc-arrow path{fill:none;stroke:${INK};stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;
      vector-effect:non-scaling-stroke;transition:stroke-width .12s ease;}
    /* directional emphasis: forward (left-click) boldens the RIGHT chevron, back (right-click) the LEFT */
    #jawad-cursor.fwd .jc-right{transform:translateY(-50%) translateX(2px) scale(1.28);}
    #jawad-cursor.fwd .jc-right path{stroke-width:3.6;}
    #jawad-cursor.bwd .jc-left{transform:translateY(-50%) translateX(-2px) scale(1.28);}
    #jawad-cursor.bwd .jc-left path{stroke-width:3.6;}
    #jawad-cursor .jc-left{right:calc(50% + 13px);}
    #jawad-cursor .jc-right{left:calc(50% + 13px);}
    #jawad-cursor .jc-lbl{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
      font-family:'SF Mono',ui-monospace,'Menlo',monospace;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;
      color:${PAPER};white-space:nowrap;opacity:0;transition:opacity .14s ease;}
    /* openable target: bloom into a filled sparkle + label, hide arrows */
    #jawad-cursor.open .jc-star{width:62px;height:62px;}
    #jawad-cursor.open .jc-star path{fill:rgba(44,44,42,.93);}
    #jawad-cursor.open .jc-arrow{opacity:0;transform:translateY(-50%) scale(.6);}
    #jawad-cursor .jc-star path{transform-box:fill-box;transform-origin:center;}
    #jawad-cursor.spin .jc-star path{animation:jc-spin .55s cubic-bezier(.34,1.35,.5,1);}
    @keyframes jc-spin{from{transform:rotate(0deg);}to{transform:rotate(90deg);}}
    /* draggable / dragging (playground) */
    #jawad-cursor.grab .jc-star{width:48px;height:48px;}
    #jawad-cursor.grab .jc-star path{fill:rgba(44,44,42,.96);}
    #jawad-cursor.grab .jc-lbl{opacity:1;}
    #jawad-cursor.grab .jc-arrow{opacity:0;transform:translateY(-50%) scale(.6);}
    /* press squash */
    #jawad-cursor.press .jc-star{transform:translate(-50%,-50%) scale(.8);}
    /* ---- ink splat (marker feel) ---- */
    .jc-ink{position:fixed;z-index:2147483590;pointer-events:none;transform:translate(-50%,-50%) scale(.2);opacity:0;}
    .jc-ink .blob{width:30px;height:30px;background:${INK};border-radius:46% 54% 52% 48% / 55% 47% 53% 45%;}
    .jc-ink.back .blob{background:transparent;border:3px solid ${INK};box-sizing:border-box;}
    .jc-ink.go{animation:jc-ink .5s cubic-bezier(.2,.7,.2,1) forwards;}
    @keyframes jc-ink{0%{transform:translate(-50%,-50%) scale(.25) rotate(0deg);opacity:.82;}
      55%{opacity:.5;}100%{transform:translate(-50%,-50%) scale(1.5) rotate(16deg);opacity:0;}}
    .jc-drop{position:fixed;z-index:2147483590;pointer-events:none;border-radius:50%;background:${INK};
      transform:translate(-50%,-50%);opacity:0;}
    .jc-drop.go{animation:jc-drop .48s ease-out forwards;}
    @keyframes jc-drop{0%{opacity:.7;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + var(--dx,0px)),calc(-50% + var(--dy,0px)));}}
    #jawad-cursor.inv .jc-star path,#jawad-cursor.inv .jc-arrow path{stroke:${PAPER};}
    #jawad-cursor.inv.open .jc-star path{fill:rgba(244,243,240,.95);}
    .jc-say{position:absolute;left:16px;top:13px;white-space:nowrap;pointer-events:none;
      font-family:'SF Mono',ui-monospace,'Menlo',monospace;font-size:10px;letter-spacing:.04em;
      color:var(--ink,#2c2c2a);background:var(--paper,#f4f3f0);border:1.5px solid var(--ink,#2c2c2a);
      border-radius:7px;padding:4px 8px;box-shadow:0 4px 12px rgba(0,0,0,.16);
      opacity:0;transform:scale(.7);transform-origin:left top;transition:opacity .14s ease,transform .14s cubic-bezier(.2,.8,.2,1);}
    #jawad-cursor.say .jc-say{opacity:1;transform:scale(1);}
    @media (prefers-reduced-motion: reduce){ .jc-ink.go,.jc-drop.go{animation-duration:.36s;} }
  `;
  const STAR='M0,-8 Q1.6,-1.6 8,0 Q1.6,1.6 0,8 Q-1.6,1.6 -8,0 Q-1.6,-1.6 0,-8 Z';
  const el=document.createElement('div'); el.id='jawad-cursor';
  el.innerHTML=
    '<svg class="jc-star" viewBox="-12 -12 24 24" aria-hidden="true"><path d="'+STAR+'"></path></svg>'+
    '<svg class="jc-arrow jc-left" viewBox="-6 -8 12 16" aria-hidden="true"><path d="M2.5,-5 L-2.5,0 L2.5,5"></path></svg>'+
    '<svg class="jc-arrow jc-right" viewBox="-6 -8 12 16" aria-hidden="true"><path d="M-2.5,-5 L2.5,0 L-2.5,5"></path></svg>'+
    '<span class="jc-lbl"></span>'+
    '<span class="jc-say"></span>';

  const OPEN_SEL='.openable,[data-open],.wb-panel.wb-weld,.e-panel';

  function feelK(){ const f=window.__jawadCursorFeel||'snappy';
    return f==='smooth'?0.16 : f==='magnetic'?0.30 : 0.5; }
  /* nearest point + tangent on an SVG path (authored in px == user units, no viewBox scaling) */
  function nearestOnPath(pe, cx, cy){
    let total=0; try{ total=pe.getTotalLength(); }catch(_){ } if(!total) return null;
    const svg=pe.ownerSVGElement||(pe.closest&&pe.closest('svg')); if(!svg) return null;
    const sr=svg.getBoundingClientRect();
    let best=0,bd=Infinity; const N=64;
    for(let i=0;i<=N;i++){ const l=total*i/N,p=pe.getPointAtLength(l),dx=sr.left+p.x-cx,dy=sr.top+p.y-cy,dd=dx*dx+dy*dy; if(dd<bd){bd=dd;best=l;} }
    for(let s=total/N; s>0.5; s/=2){ for(const dl of [-s,s]){ const l=Math.max(0,Math.min(total,best+dl)),p=pe.getPointAtLength(l),dx=sr.left+p.x-cx,dy=sr.top+p.y-cy,dd=dx*dx+dy*dy; if(dd<bd){bd=dd;best=l;} } }
    const p=pe.getPointAtLength(best);
    const a=pe.getPointAtLength(Math.max(0,best-2)), b=pe.getPointAtLength(Math.min(total,best+2));
    let ang=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI; ang=Math.max(-30,Math.min(30,ang));
    return {x:sr.left+p.x, y:sr.top+p.y, ang};
  }

  function init(){
    document.head.appendChild(css);
    document.body.appendChild(el);
    document.documentElement.classList.add('jawad-hidecursor');
    const lbl=el.querySelector('.jc-lbl');
    const sayBubble=el.querySelector('.jc-say');
    let tx=-80,ty=-80, x=-80,y=-80, raf=null, magnet=null, lock=null, rot=0;
    function loop(){
      const k=feelK();
      let gx=tx, gy=ty;
      if(lock){ gx=lock.x; gy=lock.y; }                                  // ride the nav path
      else if(window.__jawadCursorFeel==='magnetic' && magnet){ gx=tx+(magnet.x-tx)*0.34; gy=ty+(magnet.y-ty)*0.34; }
      const kk = lock?0.45:k;
      x+=(gx-x)*kk; y+=(gy-y)*kk;
      const tRot=lock?lock.ang:0; rot+=(tRot-rot)*0.25;
      el.style.left=x+'px'; el.style.top=y+'px';
      el.style.transform='translate(-50%,-50%) rotate('+rot.toFixed(2)+'deg)';
      if(Math.abs(gx-x)>0.4||Math.abs(gy-y)>0.4||Math.abs(tRot-rot)>0.2) raf=requestAnimationFrame(loop); else raf=null;
    }
    function kick(){ if(!raf) raf=requestAnimationFrame(loop); }

    addEventListener('pointermove',e=>{
      if(e.pointerType==='touch') return;
      tx=e.clientX; ty=e.clientY; el.classList.add('on'); el.classList.remove('dim'); kick();
      const t=e.target; magnet=null;
      if(window.__jawadDragging){ el.classList.remove('open'); el.classList.add('grab');
        lbl.textContent=window.__jawadDragLabel||'DRAG'; return; }
      const open = t.closest && t.closest(OPEN_SEL);
      const grab = t.closest && t.closest('.jawad-pg-grab');
      el.classList.remove('grab','open');
      // white over the dark CTA
      el.classList.toggle('inv', !!(t.closest && t.closest('.cta,.e-slab,[data-cursor-invert]')));
      const sayEl=t.closest && t.closest('[data-cursor-say]');
      if(sayEl){ sayBubble.textContent=sayEl.getAttribute('data-cursor-say'); el.classList.add('say'); } else el.classList.remove('say');
      // lock onto + rotate along the nav path while hovering it
      const pz = t.closest && t.closest('[data-cursor-path]');
      if(pz){ const pe=pz.querySelector('.nc-line')||pz.querySelector('.nc-trav')||pz.querySelector('path'); lock = pe?nearestOnPath(pe,e.clientX,e.clientY):null; }
      else lock=null;
      if(open){ el.classList.add('open'); lbl.textContent='';
        if(window.__jawadCursorFeel==='magnetic'){ const r=open.getBoundingClientRect(); magnet={x:r.left+r.width/2,y:r.top+r.height/2}; } }
      else if(grab){ el.classList.add('grab'); lbl.textContent='Grab'; }
      else { lbl.textContent=''; }
    },{passive:true,capture:true});

    addEventListener('pointerdown',e=>{ if(e.pointerType==='touch') return;
      el.classList.add('press');
      el.classList.remove('spin'); void el.offsetWidth; el.classList.add('spin');   // soft spin gives it life
      const dir = e.button===2 ? 'fwd' : 'bwd';   // right-click = forward (right chevron), left-click = back (left chevron)
      el.classList.add(dir); clearTimeout(el.__dirT); el.__dirT=setTimeout(()=>el.classList.remove('fwd','bwd'), 320);
    },{passive:true,capture:true});
    addEventListener('pointerup',()=>{ el.classList.remove('press'); },{passive:true,capture:true});
    document.addEventListener('mouseleave',()=>el.classList.add('dim'));
    window.addEventListener('blur',()=>el.classList.add('dim'));
  }

  function inkSplat(cx,cy,back){
    const ink=document.createElement('div'); ink.className='jc-ink'+(back?' back':'');
    ink.style.left=cx+'px'; ink.style.top=cy+'px';
    ink.innerHTML='<span class="blob"></span>';
    document.body.appendChild(ink);
    const drops=[];
    if(!back){
      const n=3+(Math.random()*2|0);
      for(let i=0;i<n;i++){ const d=document.createElement('div'); d.className='jc-drop';
        const a=Math.random()*Math.PI*2, dist=13+Math.random()*16, sz=3+Math.random()*4;
        d.style.left=cx+'px'; d.style.top=cy+'px'; d.style.width=sz+'px'; d.style.height=sz+'px';
        d.style.setProperty('--dx',(Math.cos(a)*dist).toFixed(0)+'px');
        d.style.setProperty('--dy',(Math.sin(a)*dist).toFixed(0)+'px');
        document.body.appendChild(d); drops.push(d); }
    }
    setTimeout(()=>{ ink.classList.add('go'); drops.forEach(d=>d.classList.add('go')); }, 16);
    setTimeout(()=>{ ink.remove(); drops.forEach(d=>d.remove()); }, 580);
  }

  if(document.body) init(); else addEventListener('DOMContentLoaded',init);
})();
