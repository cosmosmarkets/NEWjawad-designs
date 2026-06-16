/* ============================================================
   Jawad Design — wireframe builders + 3 layout directions
   Pure string templating, rendered into #canvas. Low-fi only.
   ============================================================ */
(function(){
  /* ---------- atoms ---------- */
  const bar  = (w='100%',h)=>`<div class="bar" style="width:${w}${h?`;height:${h}px`:''}"></div>`;
  const bars = (arr,cls='')=>`<div class="bars ${cls}">${arr.map(w=>bar(w)).join('')}</div>`;
  const head = (arr,center)=>`<div class="headline" style="${center?'align-items:center':''}">${arr.map(w=>`<div class="bar" style="width:${w}"></div>`).join('')}</div>`;
  const eye  = (n,pos)=>`<span class="eye" style="${pos}">${n}</span>`;
  const flag = (t,pos)=>`<span class="cta-flag" style="${pos}">${t}</span>`;
  const img  = (label,style='')=>`<div class="img" style="${style}"><span class="lbl">${label}</span></div>`;
  const ghost= (label,style='')=>`<div class="ghost" style="${style}"><span class="plus">+</span><span class="lbl">${label}</span></div>`;
  const wm   = (txt,style='')=>`<div class="wordmark" style="${style}">${txt}</div>`;
  const btn  = (txt,cls='')=>`<span class="btn ${cls}">${txt}</span>`;
  const stag = (t)=>`<span class="section-tag">${t}</span>`;
  const cap  = (t)=>`<div class="lbl" style="margin-bottom:10px;">${t}</div>`;

  const pill  = ()=>`<nav class="pill"><span>Work</span><span>Services</span><span>Pricing</span><span>Contact</span></nav>`;
  const pillM = ()=>`<nav class="pill icon"><span><i></i></span><span><i></i></span><span><i></i></span><span><i></i></span></nav>`;
  const dframe= (inner)=>`<div class="frame desktop"><div class="chrome"><i></i><i></i><i></i></div><div class="screen">${inner}${pill()}</div></div>`;
  const mframe= (inner)=>`<div class="frame mobile"><div class="chrome"><i></i></div><div class="screen">${inner}${pillM()}</div></div>`;

  /* project cards used by Work */
  const realCard = (h,eyeN)=>`<div class="col" style="gap:6px;">
     <div class="img" style="height:${h}px;"><span class="lbl">weld — flagship</span>${eyeN?eye(eyeN,'top:8px;right:8px;'):''}</div>
     <div class="bar" style="width:52%;height:11px;"></div><span class="lbl">case study · product</span></div>`;
  const realFlush = (h,eyeN)=>`<div class="img" style="height:${h}px;align-items:flex-end;justify-content:flex-start;padding:12px;">
     <span class="lbl">weld — flagship project · 200 signups, $0 paid, built solo</span>${eyeN?eye(eyeN,'top:10px;right:10px;'):''}</div>`;
  const gCard = (h,label='coming soon')=>`<div class="ghost" style="height:${h}px;"><span class="plus">+</span><span class="lbl">${label}</span></div>`;

  /* ---------- HERO ---------- */
  function hero(v){
    if(v==='center'||v==='center-xl'){
      const xl = v==='center-xl';
      return {
      d:`<div class="block center" style="min-height:${xl?380:340}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${xl?24:20}px;">
           ${stag('HERO · full viewport · centered')}
           <div style="position:relative;width:${xl?'82%':'62%'};">${wm('JAWAD',`font-size:${xl?96:56}px;height:${xl?140:100}px;width:100%;${xl?'border:none;':''}`)}${eye(1,'top:-12px;right:-12px;')}</div>
           <div style="position:relative;width:${xl?'54%':'48%'};">${head(['100%','72%'],true)}${eye(2,'top:-9px;right:-30px;')}</div>
           <div style="position:relative;margin-top:6px;">${btn('See the work ▸','cta-ring')}${flag('Primary CTA','top:-17px;left:50%;transform:translateX(-50%);')}${eye(3,'top:6px;right:-32px;')}</div>
         </div>`,
      m:`<div class="block center" style="min-height:400px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px ${xl?8:14}px 46px;">
           ${stag('HERO')}${xl?`<div style="margin:0 -10px;">${wm('JAWAD','font-size:52px;height:78px;width:calc(100% + 20px);border:none;')}</div>`:wm('JAWAD','font-size:34px;height:62px;width:92%;')}${head(['92%','62%'],true)}${btn('See the work ▸','cta-ring')}</div>`
      };
    }
    if(v==='left') return {
      d:`<div class="block" style="min-height:340px;display:flex;flex-direction:column;justify-content:center;gap:18px;padding-right:40%;">
           ${stag('HERO · full viewport · left-anchored, open right field')}
           <span class="lbl" style="position:absolute;top:14px;right:16px;">est. 2025 · solo studio</span>
           <div style="position:relative;width:80%;">${wm('JAWAD','font-size:54px;height:96px;width:100%;')}${eye(1,'top:-12px;left:-12px;')}</div>
           <div style="position:relative;width:70%;">${head(['100%','64%'])}${eye(2,'top:-9px;left:-30px;')}</div>
           <div style="position:relative;align-self:flex-start;margin-top:4px;">${btn('See the work ▸','cta-ring')}${flag('Primary CTA','top:-17px;left:0;')}${eye(3,'top:6px;right:-32px;')}</div>
         </div>`,
      m:`<div class="block" style="min-height:400px;display:flex;flex-direction:column;justify-content:center;gap:16px;padding:24px 14px 46px;">
           ${stag('HERO')}<span class="lbl">est. 2025</span>${wm('JAWAD','font-size:34px;height:60px;width:96%;')}${head(['96%','70%'])}<div>${btn('See the work ▸','cta-ring')}</div></div>`
    };
    /* hybrid-clip — centred, oversized WIDE graffiti wordmark clipping BOTH edges,
       one-line hook, one primary CTA */
    if(v==='hybrid-clip'){
      return {
        d:`<div class="block" style="min-height:380px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;">
             ${stag('HERO · centred · oversized wide graffiti wordmark clips both edges')}
             <div class="wm-stack" style="width:100%;">
               <div class="wm-graffiti" style="font-size:176px;">JAWAD</div>
               ${eye(1,'top:6px;right:36px;')}
             </div>
             <div style="position:relative;display:flex;align-items:center;justify-content:center;gap:9px;">
               ${bar('130px',12)}${bar('160px',12)}${bar('96px',12)}
               ${eye(2,'top:-10px;right:-28px;')}
             </div>
             <div style="position:relative;margin-top:2px;">${btn('See the work ▸','cta-ring')}${flag('Primary CTA','top:-17px;left:50%;transform:translateX(-50%);')}${eye(3,'top:6px;right:-32px;')}</div>
           </div>`,
        m:`<div class="block" style="min-height:400px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:24px 4px 46px;">
             ${stag('HERO')}
             <div class="wm-stack" style="width:100%;">
               <div class="wm-graffiti" style="font-size:82px;letter-spacing:3px;">JAWAD</div>
             </div>
             <div style="display:flex;align-items:center;justify-content:center;gap:7px;">${bar('66px',10)}${bar('84px',10)}${bar('50px',10)}</div>
             ${btn('See the work ▸','cta-ring')}
           </div>`
      };
    }
    /* oversized — wordmark clips the edges */
    return {
      d:`<div class="block" style="min-height:360px;overflow:hidden;display:flex;flex-direction:column;justify-content:center;">
           ${stag('HERO · oversized type clipping the frame edges')}
           <div style="position:relative;margin:0 -40px;">${wm('JAWAD','font-size:120px;height:150px;width:calc(100% + 80px);justify-content:flex-start;border:none;')}${eye(1,'top:6px;left:60px;')}</div>
           <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-top:6px;">
             <div style="position:relative;width:46%;">${head(['100%','80%'])}${eye(2,'top:-9px;right:-28px;')}</div>
             <div style="position:relative;">${btn('See the work ▸','cta-ring')}${flag('Primary CTA','top:-17px;left:0;')}${eye(3,'top:6px;right:-30px;')}</div>
           </div>
         </div>`,
      m:`<div class="block" style="min-height:400px;overflow:hidden;display:flex;flex-direction:column;justify-content:center;gap:16px;padding:24px 8px 46px;">
           ${stag('HERO')}<div style="margin:0 -14px;">${wm('JAWAD','font-size:62px;height:88px;width:calc(100% + 28px);border:none;')}</div>${head(['96%','66%'])}<div>${btn('See the work ▸','cta-ring')}</div></div>`
    };
  }

  /* ---------- WORK (3 arrangements for "1 real + placeholders") ---------- */
  function work(v){
    if(v==='alt') return {
      d:`<div class="block flush" style="min-height:330px;">${stag('WORK · masonry teaser')}
           ${cap('arrangement A — alternating rows · the real card leads, ghosts keep the rhythm so the grid reads full, not empty')}
           <div class="grid" style="grid-template-columns:1fr 1fr 1fr;">
             <div style="grid-column:span 2;">${realCard(150,1)}</div>
             <div style="grid-column:span 1;">${gCard(150,'coming soon')}</div>
             <div style="grid-column:span 1;">${gCard(118,'coming soon')}</div>
             <div style="grid-column:span 2;position:relative;">${gCard(118,'next project — TBD')}${eye(2,'top:8px;right:8px;')}</div>
           </div></div>`,
      m:`<div class="block flush" style="min-height:380px;">${stag('WORK')}${cap('single column')}
           <div class="col">${realCard(150,1)}${gCard(96)}${gCard(96)}</div></div>`
    };
    if(v==='feature-left') return {
      d:`<div class="block flush" style="min-height:330px;">${stag('WORK · masonry teaser')}
           ${cap('arrangement B — anchored feature · one tall hero project beside a "pipeline" stack, so few projects look deliberate')}
           <div class="grid" style="grid-template-columns:1.5fr 1fr;align-items:stretch;">
             <div class="col" style="gap:6px;"><div class="img" style="flex:1;min-height:250px;"><span class="lbl">weld — flagship</span>${eye(1,'top:10px;right:10px;')}</div><div class="bar" style="width:46%;height:11px;"></div><span class="lbl">case study · product</span></div>
             <div class="col" style="justify-content:space-between;position:relative;">${gCard(82)}${gCard(82)}${gCard(82)}${eye(2,'top:-9px;right:-8px;')}</div>
           </div></div>`,
      m:`<div class="block flush" style="min-height:380px;">${stag('WORK')}${cap('feature then pipeline')}
           <div class="col">${realCard(150,1)}${gCard(72)}${gCard(72)}</div></div>`
    };
    /* hero-shelf */
    return {
      d:`<div class="block flush" style="min-height:330px;">${stag('WORK · masonry teaser')}
           ${cap('arrangement C — hero + shelf · the one real project goes full-bleed and huge; a small shelf of ghosts hints "more soon"')}
           <div class="col">
             ${realFlush(190,1)}
             <div class="lbl">more, soon —</div>
             <div class="grid" style="grid-template-columns:1fr 1fr 1fr;position:relative;">${gCard(86)}${gCard(86)}${gCard(86)}${eye(2,'top:8px;right:8px;')}</div>
           </div></div>`,
      m:`<div class="block flush" style="min-height:380px;">${stag('WORK')}${cap('full-bleed hero + shelf')}
           <div class="col">${realFlush(150,1)}<div class="lbl">more, soon —</div><div class="grid" style="grid-template-columns:1fr 1fr;">${gCard(70)}${gCard(70)}</div></div></div>`
    };
  }

  /* ---------- ABOUT ---------- */
  function about(v){
    const facts = `<div class="row" style="gap:18px;flex-wrap:wrap;">
        <div class="col" style="gap:4px;"><span class="lbl">based in —</span>${bar('70px',9)}</div>
        <div class="col" style="gap:4px;"><span class="lbl">working since —</span>${bar('60px',9)}</div>
        <div class="col" style="gap:4px;"><span class="lbl">shipped —</span>${bar('64px',9)}</div></div>`;
    if(v==='centered') return {
      d:`<div class="block center" style="min-height:300px;display:flex;flex-direction:column;align-items:center;gap:18px;">${stag('ABOUT · a statement, not a bio')}
           <div style="position:relative;width:66%;">${head(['100%','86%','60%'],true)}${eye(1,'top:-9px;right:-28px;')}</div>
           <div style="position:relative;">${img('portrait','width:120px;height:120px;border-radius:50%;')}${eye(2,'top:0;right:-26px;')}</div>
           ${facts}</div>`,
      m:`<div class="block center" style="min-height:340px;display:flex;flex-direction:column;align-items:center;gap:16px;">${stag('ABOUT')}${head(['100%','84%','60%'],true)}${img('portrait','width:96px;height:96px;border-radius:50%;')}${facts}</div>`
    };
    if(v==='split') return {
      d:`<div class="block" style="min-height:300px;">${stag('ABOUT · statement + face, split')}
           <div class="grid" style="grid-template-columns:1.4fr 1fr;align-items:center;gap:24px;">
             <div class="col" style="gap:16px;"><div style="position:relative;">${head(['100%','92%','64%'])}${eye(1,'top:-9px;right:-26px;')}</div>${facts}</div>
             <div style="position:relative;">${img('portrait','height:200px;')}${eye(2,'top:10px;right:10px;')}</div>
           </div></div>`,
      m:`<div class="block" style="min-height:340px;">${stag('ABOUT')}<div class="col" style="gap:16px;">${img('portrait','height:160px;')}${head(['100%','88%','60%'])}${facts}</div></div>`
    };
    /* bold-oversized */
    return {
      d:`<div class="block" style="min-height:300px;">${stag('ABOUT · oversized claim, portrait inset')}
           <div style="position:relative;">${img('portrait','width:120px;height:120px;border-radius:50%;float:right;margin:0 0 10px 18px;')}
             ${head(['100%','100%','78%','52%'])}${eye(1,'top:-9px;left:-8px;')}${eye(2,'top:0;right:0;')}</div>
           <div style="margin-top:16px;">${facts}</div></div>`,
      m:`<div class="block" style="min-height:340px;">${stag('ABOUT')}${img('portrait','width:88px;height:88px;border-radius:50%;')}<div style="margin-top:14px;">${head(['100%','94%','70%'])}</div><div style="margin-top:14px;">${facts}</div></div>`
    };
  }

  /* ---------- PROCESS (5 steps: Brief · Direction · Build · Polish · Ship) ---------- */
  const STEPS=['Brief','Direction','Build','Polish','Ship'];
  function proc(v){
    if(v==='vertical'){
      const rows = STEPS.map((s,i)=>`<div class="row" style="align-items:center;gap:14px;">
          <span class="eye-dot" style="position:static;${i===0?'':'opacity:.85'}">${i+1}</span>
          <div class="col" style="gap:6px;flex:1;"><span class="lbl">${s.toLowerCase()}</span>${bar(`${88-i*8}%`,10)}</div></div>`).join('');
      return {
        d:`<div class="block" style="min-height:300px;">${stag('PROCESS · 5-step path, vertical')}${cap('within Trust — a predictable 5-day path de-risks hiring one person')}
             <div class="col" style="gap:14px;position:relative;">${rows}<span class="eye" style="left:-30px;top:6px;">1</span></div></div>`,
        m:`<div class="block" style="min-height:340px;">${stag('PROCESS')}<div class="col" style="gap:12px;">${rows}</div></div>`
      };
    }
    if(v==='horizontal'){
      const nodes = STEPS.map((s,i)=>`<div class="col center" style="gap:8px;flex:1;position:relative;z-index:2;">
          <span class="eye-dot" style="position:static;">${i+1}</span><span class="lbl">${s.toLowerCase()}</span>${bar('80%',8)}</div>`).join('');
      return {
        d:`<div class="block" style="min-height:240px;">${stag('PROCESS · 5-step path, horizontal timeline')}${cap('within Trust — left→right path reads as momentum toward Ship')}
             <div style="position:relative;margin-top:24px;"><div style="position:absolute;top:9px;left:6%;right:6%;height:2px;background:var(--line-soft);"></div>
             <div class="row" style="gap:8px;align-items:flex-start;">${nodes}</div>${eye(1,'left:2%;top:-14px;')}</div></div>`,
        m:`<div class="block" style="min-height:340px;">${stag('PROCESS')}<div class="col" style="gap:12px;">${STEPS.map((s,i)=>`<div class="row" style="align-items:center;gap:12px;"><span class="eye-dot" style="position:static;">${i+1}</span><div class="col" style="flex:1;gap:5px;"><span class="lbl">${s.toLowerCase()}</span>${bar('80%',9)}</div></div>`).join('')}</div></div>`
      };
    }
    /* horizontal-bignum */
    const big = STEPS.map((s,i)=>`<div class="col" style="gap:6px;flex:1;position:relative;">
        <span class="wordmark" style="border:none;padding:0;justify-content:flex-start;font-size:44px;height:44px;color:var(--line-soft);">0${i+1}</span>
        <span class="lbl">${s.toLowerCase()}</span>${bar('70%',7)}</div>`).join('');
    return {
      d:`<div class="block" style="min-height:240px;">${stag('PROCESS · oversized numbered steps')}${cap('within Trust — big numerals make the 5 steps the visual beat of the section')}
           <div class="row" style="gap:16px;align-items:flex-start;position:relative;margin-top:8px;">${big}${eye(1,'left:0;top:-12px;')}</div></div>`,
      m:`<div class="block" style="min-height:340px;">${stag('PROCESS')}<div class="grid" style="grid-template-columns:1fr 1fr;gap:16px;">${big}</div></div>`
    };
  }

  /* ---------- TESTIMONIALS ---------- */
  function testi(v){
    const quote=(w,eyeN)=>`<div class="col" style="gap:10px;position:relative;"><span class="lbl" style="font-size:26px;color:var(--line);">“</span>${head(w)}<span class="lbl">client name · company</span>${eyeN?eye(eyeN,'top:0;right:-26px;'):''}</div>`;
    if(v==='stack') return {
      d:`<div class="block center" style="min-height:240px;display:flex;flex-direction:column;align-items:center;gap:22px;">${stag('TESTIMONIALS · 1–3 stacked pull quotes')}
           <div style="width:70%;">${quote(['100%','90%','58%'],1)}</div><div style="width:62%;opacity:.6;">${quote(['100%','64%'])}</div></div>`,
      m:`<div class="block" style="min-height:300px;">${stag('TESTIMONIALS')}<div class="col" style="gap:20px;">${quote(['100%','86%','60%'],1)}${quote(['100%','60%'])}</div></div>`
    };
    if(v==='3col') return {
      d:`<div class="block" style="min-height:220px;">${stag('TESTIMONIALS · three columns')}
           <div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:18px;">
             <div style="position:relative;">${quote(['100%','80%','52%'],1)}</div>${quote(['100%','74%'])}${quote(['100%','68%'])}</div></div>`,
      m:`<div class="block" style="min-height:320px;">${stag('TESTIMONIALS')}<div class="col" style="gap:20px;">${quote(['100%','82%','54%'],1)}${quote(['100%','70%'])}</div></div>`
    };
    /* one-giant */
    return {
      d:`<div class="block center" style="min-height:240px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;">${stag('TESTIMONIALS · one giant pull quote')}
           <span class="lbl" style="font-size:40px;color:var(--line);">“</span><div style="width:82%;position:relative;">${head(['100%','100%','70%'],true)}${eye(1,'top:-9px;right:-26px;')}</div><span class="lbl">client name · company</span></div>`,
      m:`<div class="block center" style="min-height:300px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;">${stag('TESTIMONIALS')}<span class="lbl" style="font-size:32px;color:var(--line);">“</span>${head(['100%','96%','66%'],true)}<span class="lbl">client · company</span></div>`
    };
  }

  /* ---------- CONTACT CTA ---------- */
  function contact(v){
    if(v==='center') return {
      d:`<div class="block center" style="min-height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;">${stag('CONTACT CTA · a full stop')}
           <div style="width:60%;">${head(['100%','70%'],true)}</div>
           <div style="position:relative;">${btn('Let’s build something ▸','cta-ring')}${flag('Primary CTA → /contact','top:-17px;left:50%;transform:translateX(-50%);')}${eye(1,'top:6px;right:-32px;')}</div></div>`,
      m:`<div class="block center" style="min-height:240px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;">${stag('CONTACT')}${head(['90%','64%'],true)}${btn('Let’s build something ▸','cta-ring')}</div>`
    };
    if(v==='split') return {
      d:`<div class="block" style="min-height:220px;display:flex;align-items:center;">${stag('CONTACT CTA · big line + button, split')}
           <div class="grid" style="grid-template-columns:1.6fr 1fr;align-items:center;gap:24px;width:100%;">
             <div>${head(['100%','78%'])}</div>
             <div style="position:relative;justify-self:end;">${btn('Let’s build something ▸','cta-ring')}${flag('Primary CTA → /contact','top:-17px;left:0;')}${eye(1,'top:6px;right:-32px;')}</div></div></div>`,
      m:`<div class="block" style="min-height:240px;display:flex;flex-direction:column;justify-content:center;gap:16px;">${stag('CONTACT')}${head(['100%','72%'])}<div>${btn('Let’s build something ▸','cta-ring')}</div></div>`
    };
    /* fullbleed */
    return {
      d:`<div class="block center" style="min-height:240px;background:var(--paper-2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;">${stag('CONTACT CTA · full-bleed moment')}
           <div style="width:88%;">${head(['100%','100%','64%'],true)}</div>
           <div style="position:relative;">${btn('Let’s build something ▸','cta-ring')}${flag('Primary CTA → /contact','top:-17px;left:50%;transform:translateX(-50%);')}${eye(1,'top:6px;right:-32px;')}</div></div>`,
      m:`<div class="block center" style="min-height:260px;background:var(--paper-2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;">${stag('CONTACT')}${head(['96%','96%','62%'],true)}${btn('Let’s build something ▸','cta-ring')}</div>`
    };
  }

  /* ---------- FOOTER (light, consistent) ---------- */
  function footer(){
    const social=`<div class="row" style="gap:8px;">${[0,1,2].map(()=>`<span class="img" style="width:22px;height:22px;"></span>`).join('')}</div>`;
    return {
      d:`<div class="block flush" style="min-height:90px;display:flex;align-items:center;justify-content:space-between;gap:20px;">${stag('FOOTER · light')}
           <div class="col" style="gap:6px;"><span class="lbl">hi@jawad.design</span>${bar('120px',9)}</div>
           <div class="row" style="gap:14px;"><span class="lbl">Work</span><span class="lbl">Services</span><span class="lbl">Pricing</span><span class="lbl">Contact</span></div>
           ${social}</div>`,
      m:`<div class="block flush" style="min-height:140px;display:flex;flex-direction:column;gap:12px;">${stag('FOOTER')}<span class="lbl">hi@jawad.design</span><div class="row" style="gap:12px;flex-wrap:wrap;"><span class="lbl">Work</span><span class="lbl">Services</span><span class="lbl">Pricing</span><span class="lbl">Contact</span></div>${social}</div>`
    };
  }

  /* ---------- annotation column ---------- */
  function annot(b){
    const eyes = (b.eye||[]).map((t,i)=>`<li><span class="eye-dot">${i+1}</span>${t}</li>`).join('');
    return `<div class="annot">
      <p class="tag"><span class="ix">${b.ix}</span> ${b.tag}</p>
      <p class="note">${b.note}</p>
      ${eyes?`<ul class="eyelist">${eyes}</ul>`:''}
      ${b.cta?`<p class="cta-where">${b.cta}</p>`:''}
    </div>`;
  }

  /* ---------- shared section notes (medium density) ---------- */
  const N = {
    work:'Proof the talent is real. One strong card carries it; ghost tiles read as an intentional pipeline, never as empty gaps.',
    about:'Trust step — reframe "solo" as the feature: undivided attention, nothing lost in handoffs. A claim, not a bio.',
    proc:'Still Trust — a clear, predictable path. Shows hiring one person is safe *because* it’s one person.',
    testi:'Social proof without the LinkedIn-endorsement feel. Few, large, and confident.',
    footer:'Light close — email, repeated nav, socials. No heavy sitemap.'
  };

  /* ---------- DIRECTIONS ---------- */
  const DIRS=[
    { key:'A', name:'Centered Stack', desc:'Symmetric, editorial. Everything resolves to the centre line — calm, confident, classic. Process runs vertically; work uses an alternating masonry.',
      bands:[
        {ix:'01',tag:'Hero',v:'center',build:()=>hero('center'),
          note:'Earn the scroll. Centred wordmark owns the viewport; one hook, one CTA, no nav noise.',
          eye:['Wordmark / name','One-line hook','“See the work” CTA'],cta:'Primary CTA — centred directly under the headline'},
        {ix:'02',tag:'Work',v:'alt',build:()=>work('alt'),note:N.work,
          eye:['weld flagship card','“coming soon” pipeline'],cta:'Cards link → /work (secondary)'},
        {ix:'03',tag:'About',v:'centered',build:()=>about('centered'),note:N.about,
          eye:['Bold statement','Portrait + quick facts']},
        {ix:'04',tag:'Process',v:'vertical',build:()=>proc('vertical'),note:N.proc,
          eye:['Step 01 — Brief','…flows down to Ship']},
        {ix:'05',tag:'Testimonials',v:'stack',build:()=>testi('stack'),note:N.testi,
          eye:['Lead pull quote']},
        {ix:'06',tag:'Contact CTA',v:'center',build:()=>contact('center'),note:'The full stop. Bold line, single action, real scarcity ("one project at a time").',
          eye:['“Let’s build something”'],cta:'Primary CTA → /contact, dead centre'},
        {ix:'07',tag:'Footer',v:'',build:()=>footer(),note:N.footer},
      ]},
    { key:'B', name:'Left-Anchored Grid', desc:'Asymmetric and structural. Content hugs a left baseline with open right field; an anchored feature project and a horizontal process timeline give it momentum.',
      bands:[
        {ix:'01',tag:'Hero',v:'left',build:()=>hero('left'),
          note:'Type anchored left, generous empty field right. Reads like a studio masthead.',
          eye:['Wordmark / name','One-line hook','“See the work” CTA'],cta:'Primary CTA — left-aligned, start of the baseline'},
        {ix:'02',tag:'Work',v:'feature-left',build:()=>work('feature-left'),note:N.work,
          eye:['Tall weld feature','Pipeline stack beside it'],cta:'Cards link → /work (secondary)'},
        {ix:'03',tag:'About',v:'split',build:()=>about('split'),note:N.about,
          eye:['Statement (left)','Portrait (right)']},
        {ix:'04',tag:'Process',v:'horizontal',build:()=>proc('horizontal'),note:N.proc,
          eye:['Step 01 — Brief','…timeline runs to Ship']},
        {ix:'05',tag:'Testimonials',v:'3col',build:()=>testi('3col'),note:N.testi,
          eye:['First quote anchors the row']},
        {ix:'06',tag:'Contact CTA',v:'split',build:()=>contact('split'),note:'Big line left, button right — a confident hand-off across the baseline.',
          eye:['“Let’s build something”'],cta:'Primary CTA → /contact, right edge'},
        {ix:'07',tag:'Footer',v:'',build:()=>footer(),note:N.footer},
      ]},
    { key:'C', name:'Oversized & Clipped', desc:'Display-led and bold. The wordmark bleeds past the frame edges, the one real project goes full-bleed, and oversized numerals drive the process — maximum gravity, minimum clutter.',
      bands:[
        {ix:'01',tag:'Hero',v:'oversized',build:()=>hero('oversized'),
          note:'Oversized lettering clips the edges — gravity in 3 seconds. Hook and CTA tuck beneath.',
          eye:['Giant wordmark (clipped)','One-line hook','“See the work” CTA'],cta:'Primary CTA — bottom-right of the type block'},
        {ix:'02',tag:'Work',v:'hero-shelf',build:()=>work('hero-shelf'),note:N.work,
          eye:['Full-bleed weld feature','“more soon” shelf'],cta:'Feature links → /work (secondary)'},
        {ix:'03',tag:'About',v:'bold-oversized',build:()=>about('bold-oversized'),note:N.about,
          eye:['Oversized claim','Inset portrait + facts']},
        {ix:'04',tag:'Process',v:'bignum',build:()=>proc('bignum'),note:N.proc,
          eye:['Numeral 01 — Brief','…big beats to Ship']},
        {ix:'05',tag:'Testimonials',v:'one-giant',build:()=>testi('one-giant'),note:N.testi,
          eye:['One giant pull quote']},
        {ix:'06',tag:'Contact CTA',v:'fullbleed',build:()=>contact('fullbleed'),note:'A full-bleed tonal block — the loudest moment on the page before the footer.',
          eye:['“Let’s build something”'],cta:'Primary CTA → /contact, centred in the block'},
        {ix:'07',tag:'Footer',v:'',build:()=>footer(),note:N.footer},
      ]},
    { key:'D', name:'The Hybrid', desc:'Best-of: a big centred hero (the one place centring earns it), the full-bleed feature for the single project, then a clean symmetrical About handed off to a horizontal timeline that breaks the symmetry — closing on one giant quote and a full-bleed contact block.',
      bands:[
        {ix:'01',tag:'Hero',v:'hybrid-clip',build:()=>hero('hybrid-clip'),
          note:'Centred, but the oversized graffiti wordmark is huge and wide — it blows past both edges, loud and unmissable. One-line hook, one CTA. Tidy turns loud.',
          eye:['Wordmark / name (graffiti, clipped)','One-line hook','“See the work” CTA'],cta:'Primary CTA — centred directly under the headline'},
        {ix:'02',tag:'Work',v:'hero-shelf',build:()=>work('hero-shelf'),note:N.work,
          eye:['Full-bleed weld feature','“more soon” shelf'],cta:'Feature links → /work (secondary)'},
        {ix:'03',tag:'About',v:'centered',build:()=>about('centered'),note:N.about,
          eye:['Bold statement','Portrait + quick facts']},
        {ix:'04',tag:'Process',v:'horizontal',build:()=>proc('horizontal'),note:N.proc+' Horizontal timeline breaks the symmetry and adds momentum toward Ship.',
          eye:['Step 01 — Brief','…timeline runs to Ship']},
        {ix:'05',tag:'Testimonials',v:'one-giant',build:()=>testi('one-giant'),note:N.testi+' You have one — lean in and make it huge.',
          eye:['One giant pull quote']},
        {ix:'06',tag:'Contact CTA',v:'fullbleed',build:()=>contact('fullbleed'),note:'A full-bleed tonal block — the loudest moment on the page before the footer.',
          eye:['“Let’s build something”'],cta:'Primary CTA → /contact, centred in the block'},
        {ix:'07',tag:'Footer',v:'',build:()=>footer(),note:N.footer},
      ]},
  ];

  /* ---------- render ---------- */
  function renderBand(b){
    const {d,m}=b.build();
    return `<div class="band">
      ${annot(b)}
      <div><p class="view-cap">Desktop ~1440</p>${dframe(d)}</div>
      <div><p class="view-cap">Mobile ~390</p>${mframe(m)}</div>
    </div>`;
  }
  function renderDir(dir,active){
    return `<section class="direction${active?' active':''}" data-dir="${dir.key}" data-screen-label="Direction ${dir.key} — ${dir.name}">
      <div class="dir-head"><div class="num">${dir.key}</div>
        <div class="meta"><h2>${dir.name}</h2><p>${dir.desc}</p></div></div>
      ${dir.bands.map(renderBand).join('')}
    </section>`;
  }

  const canvas=document.getElementById('canvas');
  const tabsWrap=document.getElementById('tabs');
  canvas.innerHTML=DIRS.map((d,i)=>renderDir(d,i===0)).join('');
  tabsWrap.innerHTML=DIRS.map((d,i)=>`<button class="tab" role="tab" aria-selected="${i===0}" data-target="${d.key}"><b>${d.key} · ${d.name}</b><small>direction ${i+1} of ${DIRS.length}</small></button>`).join('');

  tabsWrap.addEventListener('click',e=>{
    const t=e.target.closest('.tab'); if(!t) return;
    const k=t.dataset.target;
    tabsWrap.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected', x.dataset.target===k));
    canvas.querySelectorAll('.direction').forEach(s=>s.classList.toggle('active', s.dataset.dir===k));
    window.scrollTo({top:0,behavior:'instant'});
  });
})();
