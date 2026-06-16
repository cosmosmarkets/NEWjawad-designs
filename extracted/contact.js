/* ============================================================
   Jawad Design — /contact wireframes
   3 linear directions + D single-focused-form canvas.
   Reuses wireframe.css + shared sc-* canvas CSS.
   ============================================================ */
window.CONTACT = (function(){
  const eye  = (n,pos)=>`<span class="eye" style="${pos}">${n}</span>`;
  const flag = (t,pos)=>`<span class="cta-flag" style="${pos}">${t}</span>`;
  const btn  = (txt,cls='')=>`<span class="btn ${cls}">${txt}</span>`;
  const lbl  = (t)=>`<span class="lbl">${t}</span>`;

  const HEADLINE = 'Let’s build something.';
  const SCARCITY = 'One project at a time… one seat this month.';
  const EMAIL = 'hi@jawad.design';
  const TIERS = {none:'—', single:'The Single', edition:'The Edition', commission:'The Commission'};

  /* ---------- the form (real, focusable, grayscale-tactile) ---------- */
  function form(o){
    o=o||{};
    return `<form class="cf-form" novalidate>
      <div class="cf-tier" data-tier-label><span class="lbl">tier</span><b data-tier-name>—</b><span class="cf-tier-from">pre-filled from /pricing?tier=</span></div>
      <label class="cf-field"><span class="cf-lab">name</span><input class="cf-input" type="text" placeholder="your name" autocomplete="name"></label>
      <label class="cf-field"><span class="cf-lab">email</span><input class="cf-input" type="email" placeholder="you@studio.com" autocomplete="email"></label>
      <label class="cf-field"><span class="cf-lab">message</span><textarea class="cf-input cf-area${o.big?' cf-area-lg':''}" rows="${o.big?4:3}" placeholder="what are we building?"></textarea></label>
      <input type="text" class="cf-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" placeholder="leave blank">
      <div class="cf-foot">
        <div class="cf-tierseg" role="group" aria-label="choose a tier">
          <span class="lbl">switch tier</span>
          ${Object.keys(TIERS).map(k=>`<button type="button" data-tier="${k}">${k==='none'?'none':TIERS[k].replace('The ','')}</button>`).join('')}
        </div>
        <span class="btn cta-ring cf-send">Send it ▸</span>
      </div>
      ${o.flags?`${flag('honeypot · hidden anti-spam field','top:-13px;right:10px;')}`:''}
    </form>`;
  }
  function success(){
    return `<div class="cf-success">
      <div class="cf-check">✓</div>
      <div class="cf-suc-line">Sent. I’ll get back to you within a day.</div>
      <span class="lbl">in-brand success state · replaces the form on “Send it”</span>
    </div>`;
  }
  function formWrap(o){ return `<div class="cf-wrap">${form(o)}${success()}</div>`; }

  /* ---------- shared sections ---------- */
  function headline(ix,eyeN,big){
    return `<div class="cf-sec cf-head${big?' cf-head-xl':''}"><span class="section-tag csec-tag">${ix} BIG TYPE</span>
      <div class="cf-headline">${HEADLINE}</div>${eyeN?eye(eyeN,'top:10px;right:10px;'):''}</div>`;
  }
  function scarcityLine(ix,eyeN){
    return `<div class="cf-sec cf-scarcity"><span class="section-tag csec-tag">${ix} SCARCITY / PITCH</span>
      <div class="cf-scar-line">${SCARCITY}</div>${eyeN?eye(eyeN,'top:10px;right:10px;'):''}</div>`;
  }
  function social(name){ return `<div class="soc-card"><span class="soc-name">${name}</span><span class="lbl">@jawad.design</span></div>`; }
  function socialsBlock(ix,eyeN,withCal){
    return `<div class="cf-sec"><span class="section-tag csec-tag">${ix} SOCIALS + DIRECT</span>
      <div class="soc-row" style="position:relative;">
        ${social('Instagram')}${social('Behance')}${social('LinkedIn')}
        ${flag('confirm which are live','top:-13px;left:10px;')}
      </div>
      <div class="cf-direct">
        <div class="cf-email"><span class="lbl">email direct</span><b>${EMAIL}</b></div>
        <div class="disc-card"><span class="soc-name">Discord</span><span class="lbl">join the studio channel</span>${btn('Open invite ▸')}</div>
      </div>
      ${withCal?calendly():''}
      ${eyeN?eye(eyeN,'top:10px;right:10px;'):''}</div>`;
  }
  function calendly(eyeN){
    return `<div class="cal-embed"><span class="section-tag csec-tag" style="margin:0 0 10px;">CALENDLY · restyled embed</span>
      <div class="cal-grid"><div class="cal-col">${[0,1,2,3,4].map(()=>'<span class="cal-slot"></span>').join('')}</div>
        <div class="cal-times">${[0,1,2,3].map(()=>'<span class="cal-time"></span>').join('')}</div></div>
      ${eyeN?eye(eyeN,'top:8px;right:8px;'):''}</div>`;
  }

  /* ============================================================ DIRECTIONS ============= */
  /* A — split: headline left, form right */
  function sheetA(){
    return `<div class="cf-sheet">
      <div class="cf-sec cf-split"><span class="section-tag csec-tag">① + ② SPLIT · headline left, form right</span>
        <div class="split-grid">
          <div class="split-left"><div class="cf-headline">${HEADLINE}</div>${scarcityInline()}</div>
          <div class="split-right" style="position:relative;">${formWrap({flags:true})}
            ${flag('tier pre-fills here','top:-13px;left:10px;')}${eye(1,'top:-10px;right:-10px;')}</div>
        </div>
      </div>
      ${socialsBlock('③',2,true)}</div>`;
  }
  function scarcityInline(){ return `<div class="cf-scar-line sm">${SCARCITY}</div>`; }

  /* B — form-forward: large centred form, scarcity + socials quiet footer */
  function sheetB(){
    return `<div class="cf-sheet">
      <div class="cf-sec center cf-formfwd"><span class="section-tag csec-tag">① + ② FORM-FORWARD · centred</span>
        <div class="cf-headline mid">${HEADLINE}</div>
        <div class="cf-form-big" style="position:relative;">${formWrap({flags:true})}${eye(1,'top:-10px;right:-10px;')}</div>
      </div>
      <div class="cf-sec cf-quiet"><span class="section-tag csec-tag">③ QUIET FOOTER · scarcity + socials</span>
        <div class="cf-scar-line sm">${SCARCITY}</div>
        <div class="soc-row" style="position:relative;margin-top:14px;">${social('Instagram')}${social('Behance')}${social('LinkedIn')}${flag('confirm which are live','top:-13px;left:10px;')}</div>
        <div class="cf-email" style="margin-top:12px;"><span class="lbl">email direct</span><b>${EMAIL}</b></div>
        ${calendly(2)}</div></div>`;
  }

  /* C — statement-led: oversized headline first screen, form below, socials/Calendly card row */
  function sheetC(){
    return `<div class="cf-sheet">
      ${headline('①',1,true)}
      <div class="cf-sec"><span class="section-tag csec-tag">② FORM · revealed below</span>
        <div style="position:relative;max-width:520px;">${formWrap({flags:true})}${flag('tier pre-fills here','top:-13px;left:10px;')}${eye(2,'top:-10px;right:-10px;')}</div>
        <div class="cf-scar-line sm" style="margin-top:18px;">${SCARCITY}</div></div>
      <div class="cf-sec"><span class="section-tag csec-tag">③ SOCIALS / CALENDLY · card row</span>
        <div class="card-row">
          <div class="soc-card">${'<span class="soc-name">Instagram</span>'}<span class="lbl">@jawad.design</span></div>
          <div class="soc-card"><span class="soc-name">Behance</span><span class="lbl">@jawad.design</span></div>
          <div class="soc-card"><span class="soc-name">LinkedIn</span><span class="lbl">/in/jawad</span></div>
          <div class="disc-card"><span class="soc-name">Discord</span>${btn('Open invite ▸')}</div>
        </div>
        ${flag('confirm which socials are live','top:46px;left:10px;')}
        ${calendly(3)}</div></div>`;
  }

  /* ============================================================ D · canvas ============= */
  function scPanel(o){
    const base=`left:calc(50% + ${o.x}px);top:calc(50% + ${o.y}px);width:${o.w}px;height:${o.h}px;`;
    const open=o.open?` data-open="${o.open}"`:'';
    return `<div class="sc-panel${o.cls?' '+o.cls:''}${o.open?' openable':''}" style="${base}"${open}>
        ${o.n?`<span class="sc-num">${o.n}</span>`:''}
        ${o.tag?`<span class="sc-tag">${o.tag}</span>`:''}
        <div class="sc-body">${o.body}</div>
        ${o.flag?flag(o.flag,'top:-13px;left:10px;'):''}
        ${o.open?'<span class="sc-open-cur">OPEN ⤢</span>':''}
      </div>`;
  }
  function sheetD(){
    // the FORM is the one focused panel you land on (centre, sc-hero); supporting cards orbit and open.
    const formPanel = scPanel({n:1,tag:'① THE FORM · land here',cls:'sc-hero cf-formpanel accent-zone',x:0,y:0,w:404,h:486,
      body:`<div class="cf-headline sm">${HEADLINE}</div>${form({flags:false,big:true})}`});
    const socials = scPanel({n:2,tag:'② SOCIALS + DIRECT',cls:'sc-clushead',open:'socials',x:-418,y:-118,w:262,h:152,
      body:`<div class="clus-title">Find me</div><span class="lbl">Instagram · Behance · LinkedIn</span><span class="lbl" style="margin-top:5px;">${EMAIL}</span>`});
    const discord = scPanel({n:3,tag:'③ DISCORD',cls:'sc-clushead',open:'discord',x:418,y:-118,w:262,h:152,
      body:`<div class="clus-title">My Discord server</div><span class="lbl">the studio’s community channel</span>`});
    const cal = scPanel({n:4,tag:'④ BOOK A CALL',cls:'sc-clushead sc-cta',open:'calendly',x:0,y:348,w:300,h:140,
      body:`<div class="clus-title">Book a call</div><span class="lbl">restyled Calendly · 15 min</span>`});
    return `<div class="scase worlds cf-canvas">
        <div class="sc-head">Contact <span>the form is centred · drag to reveal cards · click a card to open</span></div>
        <div class="sc-canvas"><svg class="sc-wires"></svg>
          ${formPanel}${socials}${discord}${cal}</div>
        <div class="wb-ctrls sc-ctrls"><button data-z="out">–</button><button data-z="home">⊚</button><button data-z="in">+</button></div>
      </div>
      <div class="sc-detail"><div class="detail-chrome"><span class="back-pill">← Back to form</span><span class="close-x">✕</span></div><div class="detail-body"></div></div>`;
  }

  /* nested canvas-in-a-canvas detail for the side cards (radial, like the other slugs) */
  function ndHero(title,sub){
    return scPanel({n:1,tag:'① '+title.toUpperCase(),cls:'sc-hero sc-dhero accent-zone',x:0,y:-40,w:300,h:140,
      body:`<div class="pr-tname">${title}</div><span class="nd-foot" style="margin-top:6px;">${sub}</span>`});
  }
  function ndP(n,tag,body,x,y,w,h,cls){ return scPanel({n:n,tag:tag,cls:'sc-clushead'+(cls?' '+cls:''),x:x,y:y,w:w,h:h,body:body}); }
  function nestedWrap(title,inner){
    return `<div class="scase nested">
        <div class="sc-head">${title} <span>drag · scroll to zoom</span></div>
        <div class="sc-canvas"><svg class="sc-wires"></svg>${inner}</div>
        <div class="wb-ctrls sc-ctrls"><button data-z="out">–</button><button data-z="home">⊚</button><button data-z="in">+</button></div>
      </div>`;
  }
  function detailFor(id){
    if(id==='socials'){
      const hero=ndHero('Find me','where I actually post');
      const ig=ndP(2,'',`<span class="soc-circ-name">IG</span><span class="nd-foot">@jawad.design</span>`,-210,134,150,150,'nd-soc-circle');
      const be=ndP(3,'',`<span class="soc-circ-name">Be</span><span class="nd-foot">@jawad.design</span>`,0,134,150,150,'nd-soc-circle');
      const li=ndP(4,'',`<span class="soc-circ-name">in</span><span class="nd-foot">/in/jawad</span>`,210,134,150,150,'nd-soc-circle');
      const em=scPanel({n:5,tag:'email',cls:'sc-cta nd-cta-prom accent-zone',x:0,y:300,w:392,h:126,
        body:`<span class="nd-cta-lead">Or just email me.</span><span class="btn cta-ring sc-btn-lg">${EMAIL}</span>`});
      return nestedWrap('Socials — detail', hero+ig+be+li+em+flag('confirm which are live','top:8px;left:10px;'));
    }
    if(id==='discord'){
      const hero=ndHero('My Discord server','the studio community');
      const a=ndP(2,'what’s inside','<div class="nd-best">Channels for works-in-progress, resources I’m sharing, and a #show-your-work room.</div>',-300,34,300,150,'nd-best');
      const b=ndP(3,'who’s in','<div class="nd-best">Clients, past + present, plus designers and founders I’ve worked with.</div>',300,34,300,150,'nd-best');
      const j=scPanel({n:4,tag:'join',cls:'sc-cta nd-cta-prom accent-zone',x:0,y:232,w:392,h:128,
        body:`<span class="nd-cta-lead">Come hang out in the server.</span><span class="btn cta-ring sc-btn-lg">Join the server ▸</span><span class="sc-sat-eyebrow">→ discord.gg/jawad</span>`});
      return nestedWrap('Discord — detail', hero+a+b+j);
    }
    if(id==='calendly'){
      // compact: hero + embed + a single prominent CTA, tightly grouped
      const hero=scPanel({n:1,tag:'① BOOK A CALL',cls:'sc-hero sc-dhero accent-zone',x:0,y:-128,w:300,h:96,
        body:`<div class="pr-tname">Book a call</div><span class="nd-foot" style="margin-top:4px;">15 min · no pitch</span>`});
      const embed=ndP(2,'restyled embed',calendly(),0,46,360,176,'nd-cal');
      const j=scPanel({n:3,tag:'or',cls:'sc-cta nd-cta-prom accent-zone',x:0,y:210,w:360,h:96,
        body:`<span class="nd-cta-lead">Prefer email?</span><span class="btn cta-ring sc-btn">${EMAIL}</span>`});
      return nestedWrap('Calendly — detail', hero+embed+j);
    }
    return '';
  }

  /* ---------- mobile (single column) ---------- */
  function sheetM(dir){
    if(dir==='D') return sheetD();
    if(dir==='C') return `<div class="cf-sheet">${headline('①',1,true)}
      <div class="cf-sec"><span class="section-tag csec-tag">② FORM</span>${formWrap({flags:true})}<div class="cf-scar-line sm" style="margin-top:14px;">${SCARCITY}</div></div>
      <div class="cf-sec"><span class="section-tag csec-tag">③ SOCIALS / CALENDLY</span><div class="soc-row col">${social('Instagram')}${social('Behance')}${social('LinkedIn')}</div>${calendly()}</div></div>`;
    if(dir==='B') return `<div class="cf-sheet"><div class="cf-sec center"><span class="section-tag csec-tag">① + ② FORM-FORWARD</span><div class="cf-headline mid">${HEADLINE}</div>${formWrap({flags:true})}</div>
      <div class="cf-sec"><span class="section-tag csec-tag">③ FOOTER</span><div class="cf-scar-line sm">${SCARCITY}</div><div class="soc-row col" style="margin-top:12px;">${social('Instagram')}${social('Behance')}${social('LinkedIn')}</div>${calendly()}</div></div>`;
    // A
    return `<div class="cf-sheet"><div class="cf-sec"><span class="section-tag csec-tag">① BIG TYPE</span><div class="cf-headline">${HEADLINE}</div><div class="cf-scar-line sm" style="margin-top:10px;">${SCARCITY}</div></div>
      <div class="cf-sec"><span class="section-tag csec-tag">② FORM</span>${formWrap({flags:true})}</div>
      ${socialsBlock('③',undefined,true)}</div>`;
  }

  return { sheetA, sheetB, sheetC, sheetD, sheetM, detailFor };
})();
