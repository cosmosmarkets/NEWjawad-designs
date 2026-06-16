/* ============================================================
   Jawad Design — /work gallery wireframes (3 directions)
   ============================================================ */
(function(){

  /* === Billboard CSS injection === */
  !function(){
    const s=document.createElement('style'); s.id='bb-css';
    s.textContent=`
      .bb-wrap{position:relative;width:100%;height:100%;overflow:hidden;border-radius:4px;background:#111;}
      .bb-slats{position:absolute;inset:0;display:flex;flex-direction:column;}
      .bb-slat{flex:1;overflow:hidden;transform-origin:50% 50%;position:relative;}
      .bb-slat img{position:absolute;left:0;width:100%;object-fit:cover;display:block;pointer-events:none;}
      .bb-overlay{position:absolute;inset:0;z-index:3;pointer-events:none;
        display:flex;flex-direction:column;justify-content:flex-end;padding:9px 11px;gap:2px;
        background:linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 55%);}
      .bb-name{font-family:var(--hand);font-size:16px;color:#fff;line-height:1;}
      .bb-cat{font-family:var(--mono);font-size:8.5px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6);}
      .bb-pips{position:absolute;top:9px;right:10px;display:flex;gap:4px;z-index:4;}
      .bb-pips span{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.28);transition:background .35s;}
      .bb-pips span.on{background:#fff;}
      .wb-proj>div{transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease;}
      .wb-panel.wb-proj:hover>div:first-child{transform:scale(1.05);box-shadow:0 10px 24px rgba(0,0,0,.16);}
      .wb-panel.wb-billboard:hover .bb-wrap{box-shadow:0 10px 24px rgba(0,0,0,.2);}
      .wb-panel.wb-billboard:hover{z-index:3;}
    `;
    document.head.appendChild(s);
  }();

  /* === Project data === */
  const PROJS=[
    {id:'vizzbees',src:'uploads/pasted-1781353449899-0.png',name:'VizzBees',cat:'web · saas',pos:'50% 8%'},
    {id:'kleoklaw',src:'uploads/pasted-1781353513462-0.png',name:'KleoKlaw',cat:'product · mobile',pos:'50% 5%'},
  ];
  // Billboard cycles KleoKlaw → Weld → VizzBees
  const BB_PROJS=[
    {id:'kleoklaw',src:'uploads/pasted-1781353513462-0.png',name:'KleoKlaw',cat:'product · mobile',pos:'50% 5%'},
    {id:'weld',    src:'assets/weld/cards.png',             name:'weld',    cat:'product · 2025',  pos:'50% 0%'},
    {id:'vizzbees',src:'uploads/pasted-1781353449899-0.png',name:'VizzBees',cat:'web · saas',       pos:'50% 8%'},
  ];

  /* === Atoms === */
  const bar  =(w='100%',h)=>`<div class="bar" style="width:${w}${h?`;height:${h}px`:''}"></div>`;
  const eye  =(n,pos)=>`<span class="eye" style="${pos}">${n}</span>`;
  const flag =(t,pos)=>`<span class="cta-flag" style="${pos}">${t}</span>`;
  const btn  =(txt,cls='')=>`<span class="btn ${cls}">${txt}</span>`;
  const stag =(t)=>`<span class="section-tag">${t}</span>`;
  const cap  =(t)=>`<div class="lbl" style="margin-bottom:10px;">${t}</div>`;

  const pill  =(cta)=>`<nav class="pill"><span>Work</span><span>Services</span><span>Pricing</span><span>Contact</span>${cta?`<span class="pill-cta">Work with me ▸${eye(3,'top:-13px;right:-11px;')}</span>`:''}</nav>`;
  const pillM =(cta)=>`<nav class="pill icon"><span><i></i></span><span><i></i></span><span><i></i></span><span><i></i></span>${cta?`<span class="pill-cta-m">▸</span>`:''}</nav>`;
  const dframe=(inner,o={})=>`<div class="frame desktop"><div class="chrome"><i></i><i></i><i></i></div><div class="screen">${inner}${pill(o.cta)}</div></div>`;
  const mframe=(inner,o={})=>`<div class="frame mobile"><div class="chrome"><i></i></div><div class="screen">${inner}${pillM(o.cta)}</div></div>`;

  /* === Tile helpers === */
  const projTile=(proj,h,en)=>`<div class="tile">
    <div style="height:${h}px;overflow:hidden;border-radius:3px;border:1px solid var(--line-soft);position:relative;">
      <img src="${proj.src}" alt="${proj.name}" draggable="false"
        style="width:100%;height:100%;object-fit:cover;object-position:${proj.pos};display:block;"/>
      ${en?eye(en,'top:8px;right:8px;'):''}
    </div>
    <div class="tmeta">${bar('46%',12)}<span class="lbl">${proj.name}</span><span class="lbl">${proj.cat}</span><span class="lbl slug">→ /work/${proj.id}</span></div>
  </div>`;
  const ghostTile=(h)=>`<div class="tile ghost-tile">
    <div class="ghost" style="height:${h}px;"><span class="plus">+</span><span class="lbl">coming soon</span></div>
    <span class="lbl slug">→ /work/[slug]</span></div>`;
  const irow=(num,name,meta,o={})=>`<div class="irow${o.ghost?' ghost-row':''}">
    <span class="inum">${num}</span><span class="iname">${name}</span>
    <span class="imeta">${meta}${o.slug?' · → /work/'+o.slug:''}</span>${o.eye?eye(o.eye,'top:14px;right:-26px;'):''}</div>`;

  /* === Shared sections === */
  function header(){
    return {
      d:`<div class="block" style="min-height:150px;display:flex;flex-direction:column;justify-content:center;gap:12px;">${stag('PAGE HEADER')}
           <div style="position:relative;display:inline-block;"><div class="bigtitle">Selected&nbsp;work.</div>${eye(1,'top:-6px;right:-26px;')}</div>
           <div style="position:relative;width:42%;">${bar('100%',9)}${eye(2,'top:-9px;right:-26px;')}</div></div>`,
      m:`<div class="block" style="min-height:150px;display:flex;flex-direction:column;justify-content:center;gap:10px;">${stag('HEADER')}
           <div class="bigtitle">Selected work.</div>${bar('70%',9)}</div>`
    };
  }
  function cta(){
    return {
      d:`<div class="block center" style="min-height:180px;background:var(--paper-2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;">${stag('CLOSING CTA · a full stop')}
           <div class="cta-line">One seat is open this month.</div>
           <div style="position:relative;">${btn('Work with me ▸','cta-ring')}${flag('Primary CTA → /contact','top:-17px;left:50%;transform:translateX(-50%);')}${eye(1,'top:6px;right:-32px;')}</div></div>`,
      m:`<div class="block center" style="min-height:200px;background:var(--paper-2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;">${stag('CLOSING CTA')}
           <div class="cta-line">One seat is open this month.</div>${btn('Work with me ▸','cta-ring')}</div>`
    };
  }

  /* === Galleries === */
  function galleryA(){
    return {
      d:`<div class="block flush" style="min-height:420px;">${stag('WORK GALLERY · editorial masonry')}
           ${cap('VizzBees leads the 2/3 column · KleoKlaw takes 1/3 · ghost tiles hold the rhythm')}
           <div class="grid" style="grid-template-columns:1fr 1fr 1fr;">
             <div style="grid-column:span 2;">${projTile(PROJS[0],196,1)}</div>
             <div style="grid-column:span 1;">${projTile(PROJS[1],196,2)}</div>
             <div style="grid-column:span 1;">${ghostTile(150)}</div>
             <div style="grid-column:span 2;">${ghostTile(150)}</div>
           </div></div>`,
      m:`<div class="block flush" style="min-height:460px;">${stag('WORK GALLERY')}${cap('single column')}
           <div class="col">${projTile(PROJS[0],160,1)}${projTile(PROJS[1],120,2)}${ghostTile(100)}</div></div>`
    };
  }
  function galleryB(){
    return {
      d:`<div class="block flush" style="min-height:380px;">${stag('WORK GALLERY · hero + shelf')}
           ${cap('VizzBees full-bleed hero · KleoKlaw + ghosts on the shelf')}
           <div class="col">${projTile(PROJS[0],220,1)}
             <div class="lbl" style="margin-top:2px;">in the studio —</div>
             <div class="grid" style="grid-template-columns:1fr 1fr 1fr;">${projTile(PROJS[1],112,2)}${ghostTile(112)}${ghostTile(112)}</div>
           </div></div>`,
      m:`<div class="block flush" style="min-height:420px;">${stag('WORK GALLERY')}${cap('hero + shelf')}
           <div class="col">${projTile(PROJS[0],160,1)}<div class="lbl">in the studio —</div><div class="grid" style="grid-template-columns:1fr 1fr;">${projTile(PROJS[1],96,2)}${ghostTile(96)}</div></div></div>`
    };
  }
  function galleryC(){
    const rows=`${irow('01','VizzBees','2025 · web',{slug:'vizzbees',eye:1})}
       ${irow('02','KleoKlaw','2025 · mobile',{slug:'kleoklaw',eye:2})}
       ${irow('03','coming soon','—',{ghost:true})}
       ${irow('04','coming soon','—',{ghost:true})}`;
    return {
      d:`<div class="block" style="min-height:360px;">${stag('WORK GALLERY · index list')}
           ${cap('type-led rows · VizzBees + KleoKlaw lead · ghost rows below')}
           <div class="ilist">${rows}</div></div>`,
      m:`<div class="block" style="min-height:400px;">${stag('WORK GALLERY')}${cap('type-led rows')}
           <div class="ilist">${rows}</div></div>`
    };
  }

  /* === D · Infinite whiteboard === */
  const PANELS=[
    // Centre flagship
    {type:'weld',     x:0,    y:0,    w:286, h:212, r:0  },
    // Main billboard — cycles all real projects
    {type:'bb',       x:-390, y:-202, w:234, h:164, r:-3 },
    // Individual project panels
    {type:'vizzbees', x:262,  y:-232, w:186, h:132, r:-2 },
    {type:'kleoklaw', x:-90,  y:-272, w:172, h:128, r:2  },
    // Ghost coming-soon panels
    {x:-504, y:20,   w:150, h:152, r:3  },
    {x:318,  y:-50,  w:192, h:136, r:-2 },
    {x:-348, y:244,  w:172, h:122, r:-3 },
    {x:-50,  y:308,  w:156, h:140, r:2  },
    {x:222,  y:302,  w:164, h:122, r:-2 },
    {x:566,  y:-54,  w:152, h:166, r:3  },
    {x:-582, y:270,  w:142, h:120, r:-2 },
    {x:128,  y:-348, w:150, h:112, r:2  },
    {x:574,  y:156,  w:160, h:132, r:-3 },
  ];

  const N_SLATS=8;
  function bbSlatsHTML(proj){
    // pixel top/height applied by initBillboards() after layout
    return Array.from({length:N_SLATS},(_,i)=>
      `<div class="bb-slat"><img src="${proj.src}" alt="${proj.name}" draggable="false"
        style="position:absolute;left:0;width:100%;display:block;object-fit:cover;object-position:${proj.pos};"/></div>`
    ).join('');
  }

  function wbBillboard(p){
    const base=`left:calc(50% + ${p.x}px);top:calc(50% + ${p.y}px);width:${p.w}px;height:${p.h}px;transform:translate(-50%,-50%) rotate(${p.r||0}deg);`;
    const projJSON=JSON.stringify(BB_PROJS.map(pr=>({src:pr.src,name:pr.name,cat:pr.cat,pos:pr.pos})));
    const pips=BB_PROJS.map((_,i)=>`<span class="${i===0?'on':''}"></span>`).join('');
    return `<div class="wb-panel wb-billboard" style="${base}box-sizing:border-box;" data-bb='${projJSON}'>
      <div class="bb-wrap">
        <div class="bb-slats">${bbSlatsHTML(BB_PROJS[0])}</div>
        <div class="bb-overlay"><span class="bb-name">${BB_PROJS[0].name}</span><span class="bb-cat">${BB_PROJS[0].cat}</span></div>
        <div class="bb-pips">${pips}</div>
      </div>
      <span class="view-cur">open work</span>
    </div>`;
  }

  function wbProj(p,proj){
    const base=`left:calc(50% + ${p.x}px);top:calc(50% + ${p.y}px);width:${p.w}px;height:${p.h}px;transform:translate(-50%,-50%) rotate(${p.r||0}deg);`;
    return `<div class="wb-panel wb-proj" style="${base}box-sizing:border-box;background:var(--paper);padding:8px;display:flex;flex-direction:column;gap:6px;border:1px solid var(--line-soft);border-radius:5px;box-shadow:0 4px 14px rgba(0,0,0,.1);">
      <div style="flex:1;min-height:0;border-radius:3px;overflow:hidden;">
        <img src="${proj.src}" alt="${proj.name}" draggable="false"
          style="width:100%;height:100%;object-fit:cover;object-position:${proj.pos};display:block;"/>
      </div>
      <div style="flex:none;display:flex;align-items:baseline;gap:6px;padding:0 1px;">
        <span class="lbl" style="font-family:var(--hand);font-size:14px;color:var(--ink);">${proj.name}</span>
        <span class="lbl" style="color:var(--ink-soft);font-size:8px;text-transform:uppercase;letter-spacing:.08em;">${proj.cat}</span>
      </div>
      <span class="view-cur">VIEW</span>
    </div>`;
  }

  function wbPanel(p){
    const base=`left:calc(50% + ${p.x}px);top:calc(50% + ${p.y}px);width:${p.w}px;height:${p.h}px;transform:translate(-50%,-50%) rotate(${p.r||0}deg);`;
    if(p.type==='bb')        return wbBillboard(p);
    if(p.type==='vizzbees')  return wbProj(p,PROJS[0]);
    if(p.type==='kleoklaw')  return wbProj(p,PROJS[1]);
    if(p.type==='weld'){
      const projJSON=JSON.stringify(BB_PROJS.map(pr=>({src:pr.src,name:pr.name,cat:pr.cat,pos:pr.pos})));
      const pips=BB_PROJS.map((_,i)=>`<span class="${i===0?'on':''}"></span>`).join('');
      return `<div class="wb-panel wb-weld" style="${base}box-sizing:border-box;background:var(--paper);padding:10px;display:flex;flex-direction:column;gap:8px;border:1px solid var(--line-soft);border-radius:7px;box-shadow:0 6px 28px rgba(0,0,0,.16);" data-bb='${projJSON}'>
        <div class="bb-wrap" style="flex:1;min-height:0;border-radius:4px;overflow:hidden;">
          <div class="bb-slats">${bbSlatsHTML(BB_PROJS[0])}</div>
          <div class="bb-overlay"><span class="bb-name">${BB_PROJS[0].name}</span><span class="bb-cat">${BB_PROJS[0].cat}</span></div>
          <div class="bb-pips">${pips}</div>
        </div>
        <div style="flex:none;display:flex;align-items:baseline;gap:8px;padding:0 2px;">
          <span class="lbl wb-bb-meta-name" style="font-family:var(--hand);font-size:18px;color:var(--ink);">${BB_PROJS[0].name}</span>
          <span class="lbl wb-bb-meta-cat" style="color:var(--ink-soft);">${BB_PROJS[0].cat}</span>
        </div>
        <span class="view-cur">open work</span>
      </div>`;
    }
    // Ghost
    return `<div class="wb-panel" style="${base}">
      <div class="ghost" style="width:100%;height:100%;"><span class="plus">+</span><span class="lbl">coming soon</span><span class="view-cur">VIEW</span></div></div>`;
  }

  function whiteboard(){
    const panels=PANELS.map(wbPanel).join('');
    const wb=`<div class="wb">
      <div class="wb-head">Selected work. <span>drag to explore · scroll to zoom</span></div>
      <div class="wb-canvas">${panels}</div>
      <div class="wb-ctrls"><button data-z="out" title="zoom out">–</button><button data-z="home" title="recentre">⊚</button><button data-z="in" title="zoom in">+</button></div>
    </div>`;
    return {d:wb,m:wb};
  }

  /* === Annotation notes === */
  const STATE='Default: image shown. Hover: card lifts + "VIEW" cursor. The billboard panel auto-cycles VizzBees → KleoKlaw with a venetian-blind slat animation every 4 s.';
  const headNote='Sets the room. VizzBees + KleoKlaw are real projects; ghost panels signal the pipeline.';
  const ctaNote='Scarcity is real — one seat a month. One confident action, no soft alternatives.';

  /* === Directions === */
  const DIRS=[
    {key:'A',name:'Editorial Masonry',desc:'VizzBees leads the 2/3 column with a real screenshot; KleoKlaw takes the 1/3 slot. Ghost tiles keep the grid balanced — a thin portfolio reads intentional, not empty.',
      bands:[
        {ix:'01',tag:'Header',build:header,note:headNote,eye:['"Selected work." title','One-line sub']},
        {ix:'02',tag:'Gallery',build:galleryA,note:'VizzBees in the dominant 2/3 tile; KleoKlaw secondary in 1/3.',
          state:STATE,eye:['VizzBees — leads (2/3 col)','KleoKlaw — 1/3 slot'],cta:'Every tile → /work/[slug]'},
        {ix:'03',tag:'Closing CTA',build:cta,note:ctaNote,eye:['"One seat is open this month."','"Work with me"'],cta:'Primary CTA → /contact'},
      ]},
    {key:'B',name:'Hero + Shelf',desc:'VizzBees goes full-bleed across the top; a "in the studio" shelf with KleoKlaw + ghost tiles sits beneath. Best when one project dominates.',
      bands:[
        {ix:'01',tag:'Header',build:header,note:headNote,eye:['"Selected work." title','One-line sub']},
        {ix:'02',tag:'Gallery',build:galleryB,note:'VizzBees dominates hero; KleoKlaw + ghosts form the secondary shelf.',
          state:STATE,eye:['VizzBees hero (full-bleed, first)','KleoKlaw + ghosts shelf'],cta:'Every tile → /work/[slug]'},
        {ix:'03',tag:'Closing CTA',build:cta,note:ctaNote,eye:['"One seat is open this month."','"Work with me"'],cta:'Primary CTA → /contact'},
      ]},
    {key:'C',name:'Index List',desc:'Type-led rows — VizzBees first, KleoKlaw second. Big display type, thumbnails revealed on hover. Scales cleanly as projects are added.',
      bands:[
        {ix:'01',tag:'Header',build:header,note:headNote,eye:['"Selected work." title','One-line sub']},
        {ix:'02',tag:'Gallery',build:galleryC,note:'VizzBees + KleoKlaw as solid rows; ghost rows fade back.',
          state:STATE,eye:['VizzBees row (solid, first)','KleoKlaw row (solid, second)'],cta:'Every row → /work/[slug]'},
        {ix:'03',tag:'Closing CTA',build:cta,note:ctaNote,eye:['"One seat is open this month."','"Work with me"'],cta:'Primary CTA → /contact'},
      ]},
    {key:'D',name:'Infinite Canvas',desc:'Gallery as infinite whiteboard. Weld anchored at centre; VizzBees and KleoKlaw orbit as real project panels; a large billboard panel auto-cycles all real projects. Drag to pan, scroll to zoom.',
      bands:[
        {ix:'01',tag:'Infinite canvas',build:whiteboard,pillCta:true,
          note:'Weld holds centre as flagship. VizzBees and KleoKlaw orbit as individual panels with their real screenshots. A larger billboard panel (top-left of centre) cycles through all real projects with a venetian-blind slat animation every 4 s.',
          state:STATE,
          eye:['weld — anchored dead centre','VizzBees + KleoKlaw orbit panels','Billboard cycles all real projects'],
          cta:'Primary CTA → /contact, in nav · every panel → /work/[slug]'},
      ]},
  ];

  /* === Render === */
  function annot(b){
    const eyes=(b.eye||[]).map((t,i)=>`<li><span class="eye-dot">${i+1}</span>${t}</li>`).join('');
    return `<div class="annot">
      <p class="tag"><span class="ix">${b.ix}</span> ${b.tag}</p>
      <p class="note">${b.note}</p>
      ${eyes?`<ul class="eyelist">${eyes}</ul>`:''}
      ${b.state?`<p class="state-note"><b>card states</b>${b.state}</p>`:''}
      ${b.cta?`<p class="cta-where">${b.cta}</p>`:''}
    </div>`;
  }
  function renderBand(b){
    const {d,m}=b.build();
    return `<div class="band">
      ${annot(b)}
      <div class="d-col"><p class="view-cap">Desktop ~1440</p>${dframe(d,{cta:b.pillCta})}</div>
      <div class="m-col"><p class="view-cap">Mobile ~390</p>${mframe(m,{cta:b.pillCta})}</div>
    </div>`;
  }
  function renderDir(dir,active){
    return `<section class="direction${active?' active':''}" data-dir="${dir.key}" data-screen-label="Work · Direction ${dir.key} — ${dir.name}">
      <div class="dir-head"><div class="num">${dir.key}</div>
        <div class="meta"><h2>${dir.name}</h2><p>${dir.desc}</p></div></div>
      ${dir.bands.map(renderBand).join('')}
    </section>`;
  }

  const canvas=document.getElementById('canvas');
  const tabsWrap=document.getElementById('tabs');
  canvas.innerHTML=DIRS.map((d,i)=>renderDir(d,i===0)).join('');

  /* === Whiteboard pan + zoom === */
  function initWhiteboards(){
    document.querySelectorAll('.wb').forEach(wb=>{
      const cv=wb.querySelector('.wb-canvas');
      const isMobile=!!wb.closest('.frame.mobile');
      const home=isMobile?0.5:0.9;
      let s=home,px=0,py=0;
      const apply=()=>{cv.style.transform=`translate(${px}px,${py}px) scale(${s})`;};
      apply();
      let drag=false,pend=false,sx=0,sy=0,ox=0,oy=0;
      const PAN_TH=5;
      wb.addEventListener('pointerdown',e=>{
        if(e.target.closest('.wb-ctrls')||e.target.closest('.btn')) return;
        pend=true;drag=false;sx=e.clientX;sy=e.clientY;ox=px;oy=py;
      });
      wb.addEventListener('pointermove',e=>{
        if(!pend) return;
        if(!drag){
          if(Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)<PAN_TH) return;
          drag=true; wb.classList.add('grabbing');
          try{wb.setPointerCapture(e.pointerId);}catch(_){}
        }
        px=ox+(e.clientX-sx); py=oy+(e.clientY-sy); apply();
      });
      const end=()=>{pend=false;drag=false;wb.classList.remove('grabbing');};
      wb.addEventListener('pointerup',end); wb.addEventListener('pointercancel',end);
      wb.addEventListener('wheel',e=>{e.preventDefault();s=Math.min(1.6,Math.max(0.35,s-e.deltaY*0.0012));apply();},{passive:false});
      const ctrls=wb.querySelector('.wb-ctrls');
      if(ctrls) ctrls.addEventListener('click',e=>{
        const z=e.target.dataset.z; if(!z) return;
        if(z==='in')   s=Math.min(1.6,s+0.15);
        if(z==='out')  s=Math.max(0.35,s-0.15);
        if(z==='home'){ s=home; px=0; py=0; }
        apply();
      });
    });
  }
  initWhiteboards();

  /* === Billboard venetian-blind animation === */
  function initBillboards(){
    document.querySelectorAll('[data-bb]').forEach(panel=>{
      let projs;
      try{ projs=JSON.parse(panel.dataset.bb); }catch(e){ return; }
      if(!projs||projs.length<2) return;

      const slats=[...panel.querySelectorAll('.bb-slat')];
      const nameEl=panel.querySelector('.bb-name');
      const catEl =panel.querySelector('.bb-cat');
      const pips  =[...panel.querySelectorAll('.bb-pips span')];
      const N=slats.length; if(!N) return;
      let cur=0, busy=false;

      function slatH(){ return panel.querySelector('.bb-wrap').offsetHeight||164; }
      function setSlat(slat,proj,idx){
        const img=slat.querySelector('img'); if(!img) return;
        const h=slatH(); const sh=h/N;
        img.src=proj.src; img.alt=proj.name;
        img.style.objectPosition=proj.pos||'50% 5%';
        img.style.height=h+'px';
        img.style.top=-(idx*sh)+'px';
      }
      // Apply pixel positions after layout settles
      function applyPx(){
        const h=slatH(); const sh=h/N;
        slats.forEach((sl,i)=>{
          const img=sl.querySelector('img'); if(!img) return;
          img.style.height=h+'px';
          img.style.top=-(i*sh)+'px';
        });
      }
      requestAnimationFrame(()=>applyPx());

      function flip(){
        if(busy) return; busy=true;
        const next=(cur+1)%projs.length;
        const nextP=projs[next];
        const STAGGER=38, HALF=220;

        slats.forEach((slat,i)=>{
          setTimeout(()=>{
            // Fold away — squish to centre line
            slat.style.transformOrigin='50% 50%';
            slat.style.transition=`transform ${HALF}ms cubic-bezier(0.55,0,0.45,1)`;
            slat.style.transform='scaleY(0)';
            // Swap & unfold — void offsetHeight forces reflow
            setTimeout(()=>{
              setSlat(slat,nextP,i);
              slat.style.transition='none';
              slat.style.transform='scaleY(0)';
              void slat.offsetHeight;
              slat.style.transition=`transform ${HALF}ms cubic-bezier(0.45,0,0.55,1)`;
              slat.style.transform='scaleY(1)';
            }, HALF+8);
          }, i*STAGGER);
        });

        const done=(N-1)*STAGGER+HALF*2+80;
        setTimeout(()=>{
          if(nameEl) nameEl.textContent=nextP.name;
          if(catEl)  catEl.textContent=nextP.cat;
          pips.forEach((p,i)=>p.classList.toggle('on',i===next));
          // also sync bottom meta label if present (weld flagship panel)
          const metaName=panel.querySelector('.wb-bb-meta-name');
          const metaCat =panel.querySelector('.wb-bb-meta-cat');
          if(metaName) metaName.textContent=nextP.name;
          if(metaCat)  metaCat.textContent=nextP.cat;
          cur=next; busy=false;
        }, done);
      }

      setInterval(flip, 4200);
    });
  }
  initBillboards();

  /* === Tabs === */
  tabsWrap.innerHTML=DIRS.map((d,i)=>`<button class="tab" role="tab" aria-selected="${i===0}" data-target="${d.key}"><b>${d.key} · ${d.name}</b><small>direction ${i+1} of ${DIRS.length}</small></button>`).join('');
  tabsWrap.addEventListener('click',e=>{
    const t=e.target.closest('.tab'); if(!t) return;
    const k=t.dataset.target;
    tabsWrap.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',x.dataset.target===k));
    canvas.querySelectorAll('.direction').forEach(s=>s.classList.toggle('active',s.dataset.dir===k));
    window.scrollTo({top:0,behavior:'instant'});
  });

})();
