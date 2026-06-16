/* ============================================================
   Jawad Design — Homepage Direction E: scrollable canvas
   A scroll-driven camera travels a tweakable path through the
   homepage sections (Hero→Work→About→Process→Trust→Contact→Footer).
   Plugs into the existing tab system in wireframe.js.
   Loaded AFTER wireframe.js.
   ============================================================ */
(function(){
  /* ---------- inject E-specific CSS ---------- */
  const css = `
  @import url('https://fonts.googleapis.com/css2?family=Rubik+Bubbles&family=Bungee&family=Baloo+2:wght@700;800&family=Caveat:wght@600;700&family=Rock+Salt&display=swap');
  .e-wrap{margin-top:8px;}
  .e-annot{display:flex;flex-wrap:wrap;gap:18px 26px;border:1px dashed var(--line-soft);border-radius:6px;
    padding:14px 16px;margin-bottom:16px;background:var(--paper);}
  .e-annot .en{display:grid;grid-template-columns:20px 1fr;gap:4px 8px;max-width:300px;font-size:11px;color:var(--ink-soft);line-height:1.45;}
  .e-annot .en .eye-dot{grid-row:span 2;}
  .e-annot .en b{font-family:var(--mono);font-size:10px;letter-spacing:.04em;text-transform:uppercase;color:var(--ink);}
  .e-stage{position:relative;border:2px solid var(--ink);border-radius:8px;overflow:hidden;background:
    repeating-linear-gradient(0deg,transparent 0 31px,rgba(0,0,0,.05) 31px 32px),
    repeating-linear-gradient(90deg,transparent 0 31px,rgba(0,0,0,.05) 31px 32px),var(--paper);}
  .e-viewport{height:min(78vh,780px);overflow-y:auto;overflow-x:hidden;position:relative;scrollbar-width:thin;}
  .e-track{position:relative;}
  .e-camera{position:sticky;top:0;height:min(78vh,780px);overflow:hidden;}
  .e-world{position:absolute;left:0;top:0;width:100%;height:100%;transform-origin:0 0;will-change:transform;}
  .e-wires{position:absolute;left:0;top:0;width:4000px;height:4000px;overflow:visible;pointer-events:none;}
  .e-wires line{stroke:none;}
  .e-wires path{fill:none;stroke:none;}
  .e-wires .e-spine{stroke:none;}
  .e-wires .e-trav{stroke:none;}
  .e-wires line.done{stroke:none;}
  /* directional arrowheads along the route (replaces the old dashed path) */
  .e-wires .e-arrow{fill:none;stroke:var(--ink);stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round;opacity:.82;}

  .e-panel{position:absolute;transform:translate(-50%,-50%);background:linear-gradient(152deg,rgba(255,255,255,.7),rgba(245,244,240,.6) 52%,rgba(235,233,228,.66));backdrop-filter:blur(10px) saturate(1.06);-webkit-backdrop-filter:blur(10px) saturate(1.06);border:3px solid rgba(255,255,255,.82);
    border-radius:13px;padding:18px 20px;display:flex;flex-direction:column;gap:9px;box-shadow:0 0 0 1px var(--line-soft),0 14px 30px rgba(0,0,0,.15),inset 0 1px 0 rgba(255,255,255,.78);
    transition:box-shadow .25s var(--ease-smooth,ease),border-color .2s;}
  .e-panel.is-active{box-shadow:0 0 0 1px var(--line-soft),0 22px 48px rgba(0,0,0,.18);border-color:rgba(255,255,255,.95);transform:translate(-50%,-50%) scale(1.04);z-index:5;}
  .e-panel.bare.is-active{transform:translate(-50%,-50%) scale(1.03);}
  .e-panel.openable{cursor:pointer;}
  .e-panel.openable:focus-visible{outline:2px solid var(--ink);outline-offset:4px;}
  .e-panel.openable:hover{box-shadow:0 22px 46px rgba(0,0,0,.24);}
  /* (corner-peel removed) */
  .e-panel.openable::after{content:none;}
  /* ENTER REVEAL — panel contents rise as one when the panel is approached (fires once per visit) */
  .e-panel > *:not(.e-num):not(.e-open-cur){transition:opacity .5s ease, transform .55s cubic-bezier(.2,.8,.2,1);}
  .e-panel.e-reveal-pending > *:not(.e-num):not(.e-open-cur){opacity:0;transform:translateY(16px);}
  .e-panel.openable:not(.e-reveal-pending):hover > *:not(.e-num):not(.e-open-cur){transform:translateY(-5px);}  /* slight lift on hover */
  @media (prefers-reduced-motion: reduce){ .e-panel.e-reveal-pending > *:not(.e-num):not(.e-open-cur){opacity:1!important;transform:none!important;} }
  .e-num{position:absolute;top:-12px;left:-12px;width:26px;height:26px;border-radius:50%;background:var(--ink);color:var(--paper);
    font-family:var(--mono);font-size:12px;display:flex;align-items:center;justify-content:center;z-index:2;}
  .e-tag{font-family:var(--mono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-soft);}
  .e-title{font-family:var(--hand);font-size:34px;line-height:.9;color:var(--ink);}
  .e-title.xl{font-family:'Permanent Marker','Architects Daughter',cursive;font-size:46px;}
  .e-title.hero{font-family:'Permanent Marker','Architects Daughter',cursive;font-size:154px;line-height:.8;letter-spacing:3px;}
  .e-title.big{font-family:'Permanent Marker','Architects Daughter',cursive;font-size:60px;line-height:.92;}
  .e-hook{font-family:var(--hand);font-size:30px;line-height:.95;color:var(--ink);max-width:18ch;margin-top:2px;}
  .e-cta.xl{font-size:14px;padding:11px 22px;border-width:2px;}
  .e-scroll-cue{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-soft);
    display:inline-flex;align-items:center;gap:7px;}
  .e-scroll-cue::after{content:"→";display:inline-block;animation:e-cue 1.7s ease-in-out infinite;}
  @keyframes e-cue{0%,100%{transform:translateX(0);opacity:.55;}50%{transform:translateX(7px);opacity:1;}}
  @media (prefers-reduced-motion: reduce){.e-scroll-cue::after{animation:none;}}
  /* black backdrop behind the bookends (hero + footer); grid stays, text goes white */
  .e-blackout{position:absolute;inset:0;opacity:0;pointer-events:none;background:#141310;
    background-image:repeating-linear-gradient(0deg,transparent 0 31px,rgba(255,255,255,.055) 31px 32px),
      repeating-linear-gradient(90deg,transparent 0 31px,rgba(255,255,255,.055) 31px 32px);}
  .e-panel.e-on-dark, .e-panel.e-on-dark .e-title, .e-panel.e-on-dark .e-hook, .e-panel.e-on-dark .e-tag,
  .e-panel.e-on-dark .e-factv, .e-panel.e-on-dark .e-foot-links span, .e-panel.e-on-dark .e-scroll-cue,
  .e-panel.e-on-dark .e-foot-email b, .e-panel.e-on-dark .e-foot-signoff, .e-panel.e-on-dark .e-foot-echo,
  .e-panel.e-on-dark .e-foot-wordmark, .e-panel.e-on-dark .e-foot-nav span,
  .e-panel.e-on-dark .e-bigquote{color:#f4f3f0!important;}
  .e-panel.e-on-dark .e-cta{border-color:#f4f3f0;color:#f4f3f0;background:transparent;}
  .e-panel.e-on-dark .e-cta.primary{background:#f4f3f0;color:#141310;border-color:#f4f3f0;}
  .e-panel.e-on-dark .e-socdot{border-color:#f4f3f0;color:#f4f3f0;}
  .e-panel.e-on-dark .e-foot-links span{opacity:.85;}
  .e-panel.e-block{background:linear-gradient(152deg,rgba(255,255,255,.7),rgba(245,244,240,.6) 52%,rgba(235,233,228,.66));border:3px solid rgba(255,255,255,.82);box-shadow:0 0 0 1px var(--line-soft),0 14px 30px rgba(0,0,0,.15),inset 0 1px 0 rgba(255,255,255,.78);
    justify-content:center;padding:30px 32px;}
  /* CONTACT — the dark slab (climax; dark frosted glass, large, tilts + glares like the others) */
  .e-panel.e-slab{align-items:center;justify-content:center;text-align:center;gap:26px;padding:56px 56px;
    background-color:rgba(18,17,14,.72);
    background-image:repeating-linear-gradient(0deg,transparent 0 31px,rgba(255,255,255,.05) 31px 32px),repeating-linear-gradient(90deg,transparent 0 31px,rgba(255,255,255,.05) 31px 32px);
    backdrop-filter:blur(12px) saturate(1.1);-webkit-backdrop-filter:blur(12px) saturate(1.1);
    border:1px solid rgba(255,255,255,.12)!important;
    box-shadow:0 0 0 1px rgba(0,0,0,.4),0 26px 64px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.14)!important;}
  .e-slab-head{font-family:var(--hand);font-size:clamp(60px,8vw,104px);line-height:.88;color:#f4f3f0;letter-spacing:-.015em;}
  .e-slab .e-cta{font-size:14px;}
  .e-slab-base a{font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:rgba(244,243,240,.5);text-decoration:none;border-bottom:1px solid rgba(244,243,240,.18);padding-bottom:2px;transition:color .15s,border-color .15s;}
  .e-slab-base a:hover{color:#f4f3f0;border-color:rgba(244,243,240,.55);}
  /* refined glare on the dark slab: a soft, diffuse highlight that adds light (screen) rather than a hard white patch */
  .e-panel.e-slab .e-panel-glare{mix-blend-mode:screen;}
  .e-panel.e-slab .e-panel-glare::before{inset:-30%;
    background:radial-gradient(50% 46% at var(--gx,50%) var(--gy,28%), rgba(255,247,238,.17), rgba(255,247,238,.05) 52%, transparent 76%)!important;}
  /* nested enquiry form (dark, match-cut from the slab) */
  .e-detail.e-detail-dark{background:#141310;
    background-image:repeating-linear-gradient(0deg,transparent 0 31px,rgba(255,255,255,.05) 31px 32px),repeating-linear-gradient(90deg,transparent 0 31px,rgba(255,255,255,.05) 31px 32px);}
  .e-detail-dark .e-detail-chrome{background:rgba(18,17,14,.92);border-bottom-color:rgba(255,255,255,.12);}
  .e-detail-dark .e-back,.e-detail-dark .e-close{color:#f4f3f0;border-color:rgba(244,243,240,.5);background:transparent;}
  .e-contact-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:22px;width:min(560px,84vw);text-align:center;pointer-events:none;}
  .e-form{display:flex;flex-direction:column;gap:12px;width:100%;}
  .e-field{min-height:46px;border-radius:8px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.05);display:flex;align-items:center;padding:13px 14px;font-family:var(--mono);font-size:12px;color:rgba(244,243,240,.5);text-align:left;}
  .e-field.tall{min-height:96px;align-items:flex-start;}
  .e-detail-dark .e-cta.primary{background:#f4f3f0;color:#141310;border-color:#f4f3f0;}
  .bar{height:9px;background:var(--fill);border-radius:2px;}
  .e-bars{display:flex;flex-direction:column;gap:7px;}
  .e-img{background:repeating-linear-gradient(45deg,var(--hatch) 0 7px,transparent 7px 14px);border:1.5px solid var(--line);border-radius:4px;}
  .e-portrait{width:120px;height:120px;border-radius:50%;align-self:center;}
  .e-portrait-xl{width:208px;height:208px;}
  /* ABOUT — me, in a frosted panel (framed portrait; behaves like every other panel — lifts, tilts, glares, previews) */
  .e-panel.e-portal{width:420px;min-height:300px;align-items:center;text-align:center;gap:16px;}
  .e-portal>.e-title{font-size:26px;line-height:1.04;}
  .e-portal-frame{position:relative;padding:13px;border-radius:50%;align-self:center;
    background:linear-gradient(152deg,rgba(255,255,255,.55),rgba(235,233,228,.4));backdrop-filter:blur(10px) saturate(1.05);-webkit-backdrop-filter:blur(10px) saturate(1.05);
    border:1.5px solid rgba(255,255,255,.85);box-shadow:0 18px 40px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.7);}
  .e-portal-ring{position:relative;width:240px;height:240px;border-radius:50%;overflow:hidden;
    border:2px solid rgba(255,255,255,.9);box-shadow:0 0 0 1px var(--line-soft);background:var(--paper-2);}
  .e-portal-face{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%;-webkit-user-drag:none;user-select:none;}
  .e-portal-glare{position:absolute;inset:0;border-radius:50%;pointer-events:none;
    background:radial-gradient(110px 80px at 33% 24%,rgba(255,255,255,.5),rgba(255,255,255,0) 62%);mix-blend-mode:soft-light;}
  .e-portal-facts{display:flex;gap:16px;justify-content:center;align-items:center;}
  .e-portal-chip{width:78px;height:78px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
    font-family:var(--mono);font-size:9px;line-height:1.5;letter-spacing:.04em;text-transform:uppercase;color:var(--ink-soft);padding:8px;
    background:linear-gradient(152deg,rgba(255,255,255,.6),rgba(233,231,226,.5));backdrop-filter:blur(8px) saturate(1.04);-webkit-backdrop-filter:blur(8px) saturate(1.04);
    border:1.5px solid rgba(255,255,255,.85);box-shadow:0 8px 18px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.7);}
  .e-portal-chip b{font-family:var(--mono);font-weight:700;font-size:12px;letter-spacing:0;text-transform:none;color:var(--ink);}
  /* nested orbit canvas */
  .e-about-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;text-align:center;z-index:4;pointer-events:none;}
  .e-portal-ring-xl{width:260px;height:260px;}
  .e-orbit-panel{transform:translate(-50%,-50%);}
  @keyframes e-orbit-in{
    from{opacity:0;transform:translate(-50%,-50%) translate(calc(var(--ox)*-0.66),calc(var(--oy)*-0.66)) scale(.5);}
    to{opacity:1;transform:translate(-50%,-50%) translate(0,0) scale(1);}}
  @media (prefers-reduced-motion:no-preference){
    .e-detail.open .e-orbit-panel{animation:e-orbit-in .62s cubic-bezier(.2,.72,.28,1) both;}
    .e-detail.open .e-orbit-panel:nth-of-type(3){animation-delay:.07s;}
    .e-detail.open .e-orbit-panel:nth-of-type(4){animation-delay:.14s;}
    .e-detail.open .e-orbit-panel:nth-of-type(5){animation-delay:.21s;}}
  @media (pointer:coarse),(max-width:760px){
    .e-panel.e-portal{width:auto;}
    .e-portal-ring{width:190px;height:190px;}
    .e-portal-chip{width:66px;height:66px;}}
  /* TRUST — the pull-quote panel (frosted card; quote is the match-cut constant) */
  .e-panel.e-poster{width:480px;min-height:240px;align-items:center;text-align:center;justify-content:center;gap:14px;}
  .e-poster-sheet{display:flex;flex-direction:column;align-items:center;gap:14px;padding:6px 4px;}
  .e-quote{display:flex;flex-direction:column;align-items:center;gap:2px;font-family:var(--hand);color:var(--ink);line-height:.92;letter-spacing:-.01em;}
  .e-quote .q1{font-size:36px;} .e-quote .q2{font-size:48px;} .e-quote .q3{font-size:60px;}
  .e-attrib{font-family:var(--mono);font-size:12.5px;letter-spacing:.06em;color:var(--ink-soft);text-transform:uppercase;}
  .e-quote-sm .q1{font-size:24px;} .e-quote-sm .q2{font-size:32px;} .e-quote-sm .q3{font-size:42px;}
  .e-trust-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;z-index:4;pointer-events:none;}
  @media (prefers-reduced-motion:no-preference){
    .e-poster .e-qline{transition:opacity .5s ease,transform .5s cubic-bezier(.2,.7,.2,1);}
    .e-panel.e-reveal-pending.e-poster .e-qline{opacity:0;transform:translateY(16px);}
    .e-poster .q1{transition-delay:.04s;} .e-poster .q2{transition-delay:.16s;} .e-poster .q3{transition-delay:.28s;}}
  @media (pointer:coarse),(max-width:760px){
    .e-quote .q1{font-size:26px;} .e-quote .q2{font-size:32px;} .e-quote .q3{font-size:40px;}}
  /* PRICING — three frosted tier chips (route panel; popular tier lifts on settle) */
  .e-panel.e-pricing{align-items:center;text-align:center;gap:14px;}
  .e-tiers{display:flex;gap:12px;align-items:stretch;justify-content:center;width:100%;padding-top:8px;}
  .e-tier{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:18px 12px;border-radius:12px;
    background:linear-gradient(152deg,rgba(255,255,255,.55),rgba(235,233,228,.42));backdrop-filter:blur(7px) saturate(1.04);-webkit-backdrop-filter:blur(7px) saturate(1.04);
    border:1.5px solid rgba(255,255,255,.8);box-shadow:0 8px 18px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.65);
    transition:transform .42s cubic-bezier(.2,.7,.2,1),box-shadow .42s ease;}
  .e-tier-name{font-family:var(--hand);font-size:18px;color:var(--ink);line-height:1;}
  .e-tier-price{font-family:var(--mono);font-size:12px;color:var(--ink-soft);letter-spacing:.02em;}
  .e-tier-badge{position:absolute;top:-9px;left:50%;transform:translateX(-50%);display:none;white-space:nowrap;
    font-family:var(--mono);font-size:8.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--paper);background:var(--ink);padding:3px 9px;border-radius:999px;}
  body.show-tier-badges .e-tier-badge{display:inline-flex;}
  .e-tier.is-pop{border-color:rgba(255,255,255,.96);}
  .e-panel.e-pricing.is-active .e-tier.is-pop,.e-panel.e-pricing.is-expanded .e-tier.is-pop{transform:translateY(-12px) scale(1.04);box-shadow:0 16px 32px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.72);}
  @media (pointer:coarse),(max-width:760px){ .e-tiers{flex-direction:column;} }
  .e-ghost{border:1.5px dashed var(--line);background:var(--paper-2);border-radius:4px;display:flex;align-items:center;justify-content:center;
    color:var(--ink-soft);font-family:var(--mono);font-size:10px;text-align:center;gap:4px;}
  .e-cta{align-self:flex-start;display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:11px;color:var(--ink);
    border:1.5px solid var(--ink);border-radius:999px;padding:5px 12px;margin-top:2px;background:var(--paper);}
  .e-cta.primary{background:var(--ink);color:var(--paper);}
  .e-cta.open{border-style:dashed;}
  .e-open-cur{position:absolute;top:10px;right:12px;font-family:var(--mono);font-size:9px;letter-spacing:.1em;
    background:var(--ink);color:var(--paper);padding:2px 7px;border-radius:3px;opacity:0;transition:opacity .12s;}
  .e-panel.openable:hover .e-open-cur{opacity:1;}
  .e-foot-links{display:flex;gap:12px;flex-wrap:wrap;}
  .e-foot-links span{font-family:var(--mono);font-size:11px;color:var(--ink-soft);}

  /* ---------- HERO — Direction B "Graffiti signature" (bare; the one panel that breaks the grid) ----------
     THE TAG: oversized JAWAD painted lower-right, tilted, bleeding off the right+bottom (clipped).
     THE RAIL: dead-straight functional column, top-left. Only the TAG is ever tilted/expressive;
     eyebrow, hook, CTA and cue stay straight, high-contrast and mono. */
  .e-panel.bare.hero-panel{padding:0;overflow:hidden;justify-content:flex-start;align-items:flex-start;}
  .e-panel.hero-panel > .e-title{display:none;}     /* suppress default (empty) title slot */
  .e-panel.hero-panel > .e-eyemark{display:none;}
  .e-hero-b{position:relative;width:100%;height:100%;min-height:inherit;}
  /* RAIL — counterweight, dead-straight functional column, vertically centred */
  .e-hero-rail{position:absolute;left:56px;top:0;bottom:0;display:flex;flex-direction:column;
    justify-content:center;align-items:flex-start;max-width:360px;z-index:2;}
  .e-hero-rail .e-hero-eyebrow{font-size:11px;color:var(--ink);}
  .e-hero-hook{font-family:var(--mono);font-size:26px;line-height:1.28;color:var(--ink);
    margin-top:16px;max-width:18ch;font-weight:500;letter-spacing:-.012em;}
  .e-hero-cta-wrap{margin-top:30px;}
  .e-hero-cta-wrap .e-cta{font-size:13px;padding:9px 18px;}
  .e-hero-cue{position:absolute;left:56px;bottom:40px;z-index:2;display:inline-flex;align-items:center;gap:7px;}
  /* TAG — the only expressive element: small "i'm" + oversized JAWAD, tilted, bleeds off right + bottom.
     Font is a Tweak via --hero-font (HOMEE.setHeroFont). */
  .e-hero-tag{position:absolute;left:50%;top:50%;z-index:1;pointer-events:none;
    transform:translate(-50%,-50%) rotate(-9deg);transform-origin:50% 50%;line-height:.78;will-change:transform,opacity;}
  .e-hero-tag-ink{display:block;color:var(--ink);position:relative;
    font-family:var(--hero-font,'Permanent Marker'),'Architects Daughter',cursive;
    font-size:clamp(200px,33vh,380px);letter-spacing:3px;white-space:nowrap;}
  .e-hero-tag-im{position:absolute;left:12px;top:-4px;transform:translateY(-100%);
    font-family:var(--mono);font-size:16px;letter-spacing:.22em;color:var(--ink-soft);}
  /* dark mode (focused hero bookend): the wordmark reads as WHITE PAINT on the dark wall */
  .e-panel.e-on-dark .e-hero-tag-ink{color:#f4f3f0;
    text-shadow:0 0 1px rgba(244,243,240,.5), 1px 1px 0 rgba(244,243,240,.12);}
  .e-panel.e-on-dark .e-hero-tag-im{color:rgba(244,243,240,.72);}
  @media (prefers-reduced-motion: reduce){ .e-hero-tag{will-change:auto;} }
  /* ---------- HERO LOADER — light-mode canvas landing: portrait ring + wordmark + scrolling stack rails.
     A click OR scroll opens the canvas behind it. ---------- */
  .e-loader{position:absolute;inset:0;z-index:20;display:flex;align-items:center;justify-content:center;
    overflow:hidden;cursor:pointer;background:var(--paper,#f4f3f0);
    --hero-accent:#c0584a;--ink-red:#c0584a;--ink-blue:#3f6cad;--ink-green:#4a8a5f;
    transition:opacity .55s ease, transform .6s cubic-bezier(.4,0,.2,1);}
  .e-loader.gone{opacity:0;transform:scale(1.04);pointer-events:none;}
  .e-loader-grid{position:absolute;inset:0;pointer-events:none;z-index:0;
    background-image:repeating-linear-gradient(0deg,transparent 0 31px,rgba(0,0,0,.045) 31px 32px),
      repeating-linear-gradient(90deg,transparent 0 31px,rgba(0,0,0,.045) 31px 32px);}
  /* centre composition */
  .e-orbit{position:relative;z-index:3;display:flex;align-items:center;justify-content:center;}
  .e-hero-word{position:absolute;left:50%;top:53%;transform:translate(-50%,-50%);z-index:1;pointer-events:none;
    font-family:var(--hero-font,'Bungee'),'Permanent Marker',cursive;
    font-size:clamp(168px,36vh,416px);line-height:.8;letter-spacing:1px;color:var(--ink);white-space:nowrap;}
  .e-hero-ring{position:relative;z-index:2;width:clamp(326px,51vh,506px);height:clamp(326px,51vh,506px);
    border-radius:50%;overflow:hidden;border:3px solid var(--ink);background:var(--paper-2,#e9e7e2);
    box-shadow:0 18px 50px rgba(0,0,0,.18);}
  .e-hero-ring img{width:100%;height:100%;object-fit:cover;object-position:58% 28%;display:block;transform:scale(1.18);transform-origin:58% 28%;}
  .e-hero-im{position:absolute;z-index:4;top:-34px;left:0;font-family:var(--hand,'Caveat'),cursive;
    font-size:clamp(32px,5vh,50px);color:var(--ink);transform:rotate(-7deg);}
  /* curved 'design that delivers' along the ring — a Tweak, off by default */
  .e-hero-curve{position:absolute;z-index:3;left:50%;top:50%;
    width:calc(clamp(326px,51vh,506px) + 70px);height:calc(clamp(326px,51vh,506px) + 70px);
    transform:translate(-50%,-50%);display:none;pointer-events:none;}
  .e-loader.show-curve .e-hero-curve{display:block;}
  .e-hero-curve text{font-family:var(--mono);font-size:13px;letter-spacing:.16em;fill:var(--ink);}
  .e-loader-cue{position:absolute;left:50%;bottom:36px;transform:translateX(-50%);z-index:5;
    font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);
    display:inline-flex;align-items:center;gap:9px;}
  .e-loader-cue::after{content:"";width:5px;height:5px;border-radius:50%;background:var(--ink-soft);
    animation:e-pulse 1.6s ease-in-out infinite;}
  @keyframes e-pulse{0%,100%{opacity:.25;}50%{opacity:1;}}
  /* ---------- sticker hero: scrub from "i'm Jawad" to "i make things" (die-cut paper layering) ---------- */
  .e-hero2{position:absolute;inset:0;z-index:3;transform-origin:center;}
  .e-hero2 .e-hero-ring{position:absolute;left:50%;top:50%;z-index:4;
    width:clamp(380px,57.5vh,575px);height:clamp(380px,57.5vh,575px);border-radius:50%;overflow:hidden;
    border:10px solid #fff;background:#fff;box-shadow:0 18px 40px rgba(0,0,0,.22);}
  .e-hero2 .e-hero-ring img{width:100%;height:100%;object-fit:cover;object-position:58% 28%;display:block;transform:scale(1.18);transform-origin:58% 28%;}
  .e-ring-glare{position:absolute;inset:0;z-index:2;border-radius:50%;pointer-events:none;overflow:hidden;
    background:radial-gradient(42% 38% at var(--gx,40%) var(--gy,26%), rgba(255,255,255,.42), rgba(255,255,255,.08) 46%, transparent 72%);
    mix-blend-mode:screen;opacity:.72;}
  .e-ring-glare::after{content:"";position:absolute;inset:0;border-radius:50%;pointer-events:none;
    background:radial-gradient(125% 115% at 50% 128%, rgba(0,0,0,.20), rgba(0,0,0,.05) 42%, transparent 60%),
      linear-gradient(157deg, rgba(255,255,255,.16) 0%, transparent 30%);}
  .e-wsticker{position:absolute;left:50%;top:50%;z-index:2;font-family:'Bungee',sans-serif;
    font-weight:800;color:#1a1a1a;white-space:nowrap;line-height:.92;letter-spacing:-.5px;pointer-events:none;
    text-shadow:3px 0 0 #fff,-3px 0 0 #fff,0 3px 0 #fff,0 -3px 0 #fff,2.2px 2.2px 0 #fff,-2.2px 2.2px 0 #fff,2.2px -2.2px 0 #fff,-2.2px -2.2px 0 #fff,0 9px 16px rgba(0,0,0,.18);}
  .e-w1{font-size:clamp(154px,26.4vw,528px);text-align:center;z-index:2;font-family:'Bungee',sans-serif;letter-spacing:.01em;
    text-shadow:3px 0 0 #fff,-3px 0 0 #fff,0 3px 0 #fff,0 -3px 0 #fff,
      1px 1px 0 #d9d7d1,2px 2px 0 #d0cec8,3px 3px 0 #c7c5bf,4px 4px 0 #bebcb6,5px 5px 0 #b5b3ad,6px 6px 0 #adaba5,7px 7px 0 #a4a29c,8px 8px 0 #9b9994,9px 9px 0 #939189,
      0 18px 28px rgba(0,0,0,.24);}
  .e-w1 b{display:block;}
  /* DESIGN reads a touch smaller than JAWAD */
  #e-w1b{font-size:clamp(132px,22.6vw,452px);}
  .e-im{position:absolute;left:50%;top:calc(50% - clamp(288px,38vh,378px));transform:translateX(-50%);z-index:6;
    font-family:var(--hand,'Caveat'),cursive;font-weight:600;font-size:clamp(20px,2.6vh,34px);letter-spacing:.04em;
    text-transform:lowercase;color:#2c2c2a;white-space:nowrap;pointer-events:none;
    text-shadow:1.5px 0 0 #fff,-1.5px 0 0 #fff,0 1.5px 0 #fff,0 -1.5px 0 #fff;}
  .e-w2{font-size:clamp(58px,12.8vh,162px);text-align:left;font-family:'Baloo 2',sans-serif;font-weight:800;line-height:.82;letter-spacing:-1.5px;}
  .e-w2 span{display:block;}
  .e-w2-ul{position:absolute;left:1%;bottom:-7%;width:74%;height:.2em;overflow:visible;}
  .e-w2-ul path{filter:drop-shadow(2.2px 2.2px 0 #fff);}
  /* logo stickers: emerge from behind the portrait, spin BEHIND the wordmark, then settle into a symmetric arc (no names), 5 each side */
  .e-hlogo{position:absolute;z-index:1;width:0;height:0;}
  .e-hlogo-ic{position:absolute;left:0;top:0;width:50px;height:50px;background:transparent;
    display:flex;align-items:center;justify-content:center;
    transform:translate(-50%,-50%) scale(var(--sc,1));}
  .e-hlogo-ic svg,.e-hlogo-ic img{width:44px;height:44px;display:block;object-fit:contain;
    filter:drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff) drop-shadow(2.2px 2.2px 0 #fff) drop-shadow(-2.2px 2.2px 0 #fff) drop-shadow(2.2px -2.2px 0 #fff) drop-shadow(-2.2px -2.2px 0 #fff) drop-shadow(0 9px 14px rgba(0,0,0,.22));
    animation:e-flt 4.4s ease-in-out infinite var(--d,0s);}
  .e-hlogo-name{display:none;}
  /* left-arc labels sit to the LEFT of their icon (pointing outward, away from the portrait) */
  .e-hlogo--left .e-hlogo-name{left:auto;right:54px;text-align:right;transform-origin:right center;
    transform:translateY(-50%) translateX(calc((1 - var(--exp,0)) * 8px)) scale(calc(.72 + var(--exp,0)*.28));}
  /* state-2 eyebrow "i also" inherits .e-im — sits at the top centre, exactly where "hi, i'm" is (the word swaps in place) */
  @keyframes e-flt{0%,100%{transform:translateY(0);}50%{transform:translateY(-3px);}}
  @keyframes e-railfloat{0%{transform:translateY(0) rotate(-1.6deg) scale(1);}50%{transform:translateY(-7px) rotate(1.6deg) scale(1.05);}100%{transform:translateY(0) rotate(-1.6deg) scale(1);}}
  /* ---------- whiteboard decor: post-its, splatters, doodles, tape, halftone (one spot ink) ---------- */
  .e-decor{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden;}
  .e-loader.dens-light .e-decor .d-extra{display:none;}
  .e-dec{position:absolute;}
  .e-halftone{border-radius:50%;background-image:radial-gradient(currentColor 1.4px,transparent 1.7px);
    background-size:11px 11px;opacity:.13;-webkit-mask-image:radial-gradient(closest-side,#000 55%,transparent);
            mask-image:radial-gradient(closest-side,#000 55%,transparent);}
  .e-halftone.a{color:var(--hero-accent);} .e-halftone.g{color:var(--ink);}
  .e-postit{width:122px;min-height:88px;padding:16px 13px 12px;background:var(--paper-2,#eceae4);
    font-family:var(--hand,'Caveat'),cursive;font-size:20px;line-height:1.12;color:var(--ink);
    box-shadow:2px 7px 15px rgba(0,0,0,.13);}
  .e-postit::before{content:"";position:absolute;left:50%;top:-8px;transform:translateX(-50%) rotate(-2.5deg);
    width:50px;height:16px;background:rgba(255,255,255,.55);border:1px solid rgba(0,0,0,.06);}
  .e-tape{width:62px;height:21px;background:rgba(176,176,170,.32);border:1px solid rgba(0,0,0,.05);}
  .e-torn{width:120px;height:72px;background:var(--paper,#f4f3f0);box-shadow:1px 3px 11px rgba(0,0,0,.08);
    clip-path:polygon(0 7%,13% 0,38% 7%,60% 1%,88% 6%,100% 0,98% 92%,72% 100%,40% 94%,16% 100%,2% 93%);}
  .e-splat{color:var(--hero-accent);opacity:.5;}
  .e-doodle{color:var(--ink);opacity:.82;}
  .e-brush{color:var(--ink);opacity:.14;}
  .e-postit svg, .e-doodle svg, .e-splat svg, .e-brush svg{display:block;}
  @keyframes e-wig{0%,100%{transform:rotate(var(--rot,0deg)) translateY(0);}50%{transform:rotate(calc(var(--rot,0deg) + 1.1deg)) translateY(-3px);}}
  .e-wiggle{animation:e-wig 6.5s ease-in-out infinite;}
  .e-wiggle.slow{animation-duration:8.5s;}
  /* connector draws itself in — dashoffset is driven by JS (setTimeout tween) so it works where CSS animations are paused; visible base state as a fallback */
  .e-draw path{stroke-dasharray:var(--len,320);stroke-dashoffset:0;}
  /* the two 'stack' rails — exactly five marks visible, constantly looping (never empty) */
  .e-rail{position:absolute;top:0;bottom:0;width:156px;z-index:4;overflow:hidden;
    -webkit-mask-image:linear-gradient(180deg,transparent,#000 11%,#000 89%,transparent);
            mask-image:linear-gradient(180deg,transparent,#000 11%,#000 89%,transparent);}
  .e-rail.left{left:0;} .e-rail.right{right:0;}
  .e-rail-track{display:flex;flex-direction:column;align-items:center;gap:42px;padding:24px 0;
    animation:railScroll 22s linear infinite;will-change:transform;}
  .e-rail.right .e-rail-track{animation-duration:23s;}
  .e-rail:hover .e-rail-track{animation-play-state:paused;}
  @keyframes railScroll{from{transform:translateY(0);}to{transform:translateY(-33.333%);}}
  .e-logo{flex:none;display:flex;align-items:center;justify-content:center;padding:6px;
    position:relative;cursor:pointer;background:transparent;border:none;box-shadow:none;
    transition:transform .22s cubic-bezier(.2,.8,.2,1),opacity .2s;}
  .e-logo svg,.e-logo img{height:82px;width:auto;max-width:110px;display:block;object-fit:contain;
    filter:drop-shadow(0 5px 12px rgba(0,0,0,.16));
    animation:e-railfloat 4.8s ease-in-out infinite var(--fd,0s);}
  .e-rail:hover .e-logo svg,.e-rail:hover .e-logo img{animation-play-state:paused;}
  .e-rail:hover .e-logo{opacity:.34;}
  .e-rail .e-logo:hover{opacity:1;transform:scale(1.16);}
  .e-logo-tip{position:absolute;left:50%;top:-7px;transform:translate(-50%,-100%) scale(.9);
    background:var(--ink);color:var(--paper);font-family:var(--mono);font-size:11px;letter-spacing:.04em;
    padding:3px 8px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .15s,transform .15s;}
  .e-rail.right .e-logo-tip{left:auto;right:50%;transform:translate(50%,-100%) scale(.9);}
  .e-rail .e-logo:hover .e-logo-tip{opacity:1;transform:translate(-50%,-100%) scale(1);}
  .e-rail.right .e-logo:hover .e-logo-tip{transform:translate(50%,-100%) scale(1);}
  @media (prefers-reduced-motion: reduce){ .e-loader-cue::after{animation-duration:2.4s;} }
  /* footer bookend — wordmark + nav, anchored far-left. JAWAD spreads the full height;
     the nav list stays a compact centred cluster. (per the sketch) */
  .e-panel.footer-panel{flex-direction:row;justify-content:flex-end;align-items:stretch;gap:clamp(36px,5vw,72px);padding:48px 56px;}
  .e-panel.footer-panel > .e-title{display:none;}
  .e-foot-wordmark{display:flex;flex-direction:column;align-items:center;justify-content:space-between;flex:none;
    font-family:var(--hero-font,'Permanent Marker'),'Architects Daughter',cursive;
    font-size:clamp(56px,10vh,104px);line-height:.88;letter-spacing:2px;color:var(--ink);}
  .e-foot-nav{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;flex:none;gap:14px;}
  .e-foot-nav span{font-family:var(--mono);font-size:18px;color:var(--ink);cursor:pointer;transition:opacity .15s;}
  .e-foot-nav span:hover{opacity:.6;}

  .e-hint{position:absolute;left:14px;bottom:12px;z-index:6;font-family:var(--mono);font-size:10px;letter-spacing:.04em;
    color:var(--ink-soft);background:rgba(244,243,240,.9);border:1px solid var(--line-soft);border-radius:999px;padding:5px 11px;pointer-events:none;}
  .e-progress{position:absolute;left:0;top:0;height:3px;background:var(--accent);z-index:7;transition:width .05s linear;}

  /* ---------- spatial-map nav: the camera path in miniature + Tour/Play (bottom-centre) ---------- */
  .e-minimap{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:8;
    display:flex;flex-direction:column;align-items:center;background:rgba(244,243,240,.93);border:1.5px solid var(--ink);
    backdrop-filter:blur(3px);box-shadow:0 10px 30px rgba(0,0,0,.16);}
  .e-minimap.hide{display:none;}
  /* embedded in the prototype shell: the curve merges into the shell navbar, so hide the in-page card */
  .direction.e-embedded .e-minimap{display:none;}
  /* embedded in the prototype shell: lift the bar above the shell's bottom navbar */
  .direction.e-embedded .e-minimap{bottom:86px;}
  .e-minimap.v-spine{border-radius:20px;padding:10px 18px 8px;gap:13px;}
  .e-minimap.v-constellation{border-radius:16px;padding:0;gap:0;}
  .e-nav-map{position:relative;display:flex;align-items:center;justify-content:center;flex:none;}
  .e-minimap.v-spine .e-nav-map{padding:0 2px 1px;}
  .e-minimap.v-constellation .e-nav-map{padding:12px 20px 13px;}
  .e-nav-plot{position:relative;}
  .e-nav-svg{display:block;overflow:visible;}
  .e-nav-base{fill:none;stroke:var(--line-soft);stroke-width:1.4;}
  .e-minimap.v-constellation .e-nav-base{stroke-width:1.6;stroke-dasharray:1.5 5;stroke-linecap:round;}
  .e-nav-trav{fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;transition:stroke-dashoffset .28s linear;}
  .e-minimap.v-constellation .e-nav-trav{stroke-width:3;}
  .e-nav-node{fill:var(--paper);stroke:var(--ink);stroke-width:1.5;cursor:pointer;
    transition:r .26s cubic-bezier(.2,.8,.2,1),fill .2s ease;}
  .e-nav-node.on{fill:var(--ink);}
  .e-minimap.v-spine .e-nav-node{r:3;}
  .e-minimap.v-spine .e-nav-node.on{r:4.6;}
  .e-minimap.v-constellation .e-nav-node{r:2.2;stroke-width:1.3;}
  .e-minimap.v-constellation .e-nav-node.on{r:5;}
  .e-nav-hit{fill:transparent;cursor:pointer;}
  .e-nav-comet{fill:var(--ink);opacity:0;}
  .e-minimap.v-constellation .e-nav-comet{opacity:1;}
  .e-nav-label{position:absolute;left:0;top:0;font-family:var(--mono);font-size:8.5px;letter-spacing:.16em;
    text-transform:uppercase;color:var(--ink);white-space:nowrap;pointer-events:none;transform-origin:50% 100%;
    transform:translate(-50%,-118%) scale(.55);opacity:0;
    transition:opacity .2s ease,transform .3s cubic-bezier(.2,.85,.25,1);}
  .e-nav-label.show{opacity:1;transform:translate(-50%,-118%) scale(1);}
  .e-minimap.v-constellation .e-nav-label{background:var(--ink);color:var(--paper);padding:2px 7px;border-radius:5px;letter-spacing:.12em;}
  @media (prefers-reduced-motion: reduce){ .e-nav-trav,.e-nav-node,.e-nav-label{transition:none;} }

  /* nested detail overlay */
  .e-detail{position:absolute;inset:0;z-index:20;background:var(--paper);opacity:0;transform:scale(.2);pointer-events:none;
    transition:transform .42s cubic-bezier(.2,.7,.2,1),opacity .3s;}
  .e-detail.open{opacity:1;transform:scale(1);pointer-events:auto;}
  .e-detail-chrome{position:absolute;top:0;left:0;right:0;z-index:24;display:flex;align-items:center;justify-content:space-between;
    padding:10px 14px;background:rgba(244,243,240,.92);backdrop-filter:blur(3px);border-bottom:1px solid var(--line-soft);}
  .e-back{font-family:var(--mono);font-size:11px;border:1.5px solid var(--ink);border-radius:999px;padding:5px 12px;color:var(--ink);background:var(--paper);cursor:pointer;}
  .e-close{font-family:var(--mono);font-size:13px;width:26px;height:26px;border:1.5px solid var(--ink);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--ink);background:var(--paper);cursor:pointer;}
  .e-dwrap{position:absolute;inset:0;overflow:hidden;background:
    repeating-linear-gradient(0deg,transparent 0 29px,rgba(0,0,0,.05) 29px 30px),
    repeating-linear-gradient(90deg,transparent 0 29px,rgba(0,0,0,.05) 29px 30px),var(--paper);cursor:grab;touch-action:none;}
  .e-dwrap.grabbing{cursor:grabbing;}
  .e-dworld{position:absolute;left:50%;top:50%;transform-origin:center;will-change:transform;}
  .e-dctrls{position:absolute;right:12px;bottom:12px;z-index:6;display:flex;gap:6px;}
  .e-dctrls button{width:30px;height:30px;border:1.5px solid var(--ink);background:var(--paper);border-radius:7px;
    font-family:var(--mono);font-size:15px;color:var(--ink);cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;padding:0;}
  .e-panel.bare{border:none;background:transparent;box-shadow:none;padding:6px 8px;}
  /* dark wall intrinsic to the hero/footer bookend when focused — guarantees the white
     text is legible even if the full-screen .e-blackout layer fails to paint */
  .e-panel.bare.e-on-dark{background:#141310;
    background-image:repeating-linear-gradient(0deg,transparent 0 31px,rgba(255,255,255,.055) 31px 32px),
      repeating-linear-gradient(90deg,transparent 0 31px,rgba(255,255,255,.055) 31px 32px);}
  .e-panel.bare .e-num{left:-6px;top:-6px;}
  .e-imlbl{font-family:var(--mono);font-size:10px;background:var(--paper);padding:2px 7px;border:1px solid var(--line-soft);color:var(--ink-soft);}
  .e-img{display:flex;align-items:center;justify-content:center;}
  .e-shelf{display:flex;gap:10px;}
  .e-facts{display:flex;gap:22px;flex-wrap:wrap;margin-top:2px;}
  .e-fact{display:flex;flex-direction:column;gap:2px;}
  .e-factv{font-family:var(--mono);font-size:13px;color:var(--ink);}
  .e-timeline{display:flex;justify-content:space-between;align-items:flex-start;position:relative;margin:6px 4px 2px;}
  .e-timeline::before{content:"";position:absolute;top:18px;left:6%;right:6%;height:2px;background:var(--line-soft);}
  .e-step{display:flex;flex-direction:column;align-items:center;gap:8px;position:relative;z-index:1;}
  .e-stepdot{width:36px;height:36px;border-radius:50%;border:2px solid var(--ink);background:var(--paper);
    font-family:var(--mono);font-size:13px;display:flex;align-items:center;justify-content:center;}
  .e-bigquote{font-family:var(--hand);font-size:50px;line-height:.3;color:var(--line);height:24px;}
  .e-socials{display:flex;gap:8px;align-items:center;}
  .e-socdot{width:28px;height:28px;border-radius:50%;border:1.5px solid var(--ink);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:10px;}
  body.e-hide-markers .eye,body.e-hide-markers .cta-flag,body.e-hide-markers .e-eyemark{display:none!important;}

  /* ---------- expand-on-settle: panel grows to preview its destination page ---------- */
  .e-preview{position:absolute;left:50%;top:calc(100% + 18px);transform:translateX(-50%) translateY(-10px);width:min(1200px,72vw);z-index:9;pointer-events:none;
    max-height:0;opacity:0;overflow:hidden;display:flex;flex-direction:column;gap:8px;
    transition:max-height .55s cubic-bezier(.22,1,.36,1),opacity .42s ease .07s,transform .55s cubic-bezier(.22,1,.36,1);}
  .e-panel.is-expanded .e-preview{max-height:360px;opacity:1!important;transform:translateX(-50%) translateY(0)!important;}
  .e-panel.is-expanded{box-shadow:0 0 0 1px var(--line-soft),0 26px 60px rgba(0,0,0,.22);border-color:rgba(255,255,255,.95);z-index:9;overflow:visible;}
  .e-prevtag{font-family:var(--mono);font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);}
  .e-prevframe{display:flex;flex-direction:column;gap:8px;border:1.5px solid var(--line);border-radius:8px;padding:12px;background:var(--paper-2);}
  .e-pv-row{display:flex;gap:8px;}
  .e-pv-row>*{min-width:0;}
  /* live scaled page preview (real screenshot of the destination) */
  .e-prevframe.e-pv-live{padding:0;overflow:hidden;position:relative;background:var(--paper);}
  .e-pv-scaleport{position:relative;overflow:hidden;width:100%;}
  .e-pv-iframe{position:absolute;top:0;left:0;border:none;transform-origin:top left;pointer-events:none;
    background:var(--paper);opacity:0;transition:opacity .5s ease;}
  .e-pv-iframe.ready{opacity:1;}
  .e-pv-loading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
    font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-soft);
    background:repeating-linear-gradient(45deg,var(--hatch) 0 8px,transparent 8px 16px);}

  /* ---------- non-spatial fallback: conventional vertical stack ----------
     The spatial camera + inertia + settle is desktop + pointer:fine + wide only.
     Touch (coarse) or narrow (≤760px) users get a plain vertical stack of the 7
     panels in path order — no camera, native scroll. Reduced-motion KEEPS the
     spatial camera but strips the motion: native 1:1 tracking, no inertia, no
     animated settle (see JS). */
  @media (pointer:coarse), (max-width: 760px){
    body .e-viewport{overflow-y:auto!important;overflow-x:hidden!important;-webkit-overflow-scrolling:touch;}
    body .e-track{height:auto!important;min-height:0!important;}
    body .e-camera{position:static!important;height:auto!important;overflow:visible!important;}
    body .e-world{position:static!important;transform:none!important;width:100%!important;height:auto!important;
      display:flex!important;flex-direction:column;align-items:center;gap:20px;padding:24px 16px 96px;}
    body .e-world .e-wires{display:none!important;}
    body .e-world .e-panel{position:static!important;left:auto!important;top:auto!important;
      transform:none!important;width:min(560px,92vw)!important;min-height:0!important;opacity:1!important;}
    body .e-world .e-panel.is-active{transform:none!important;box-shadow:0 8px 22px rgba(0,0,0,.10)!important;}
    body .e-minimap,body .e-progress,body .e-hint{display:none!important;}
    body .e-title.big{font-size:46px;}
  }
  `;
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  /* ---------- atoms ---------- */
  const bars=(arr)=>`<div class="e-bars">${arr.map(w=>`<div class="bar" style="width:${w}"></div>`).join('')}</div>`;
  const cta=(txt,cls='')=>`<span class="e-cta ${cls}">${txt}</span>`;
  const img=(label,style)=>`<div class="e-img" style="${style||''}">${label?`<span class="e-imlbl">${label}</span>`:''}</div>`;
  const ghost=(label,style)=>`<div class="e-ghost" style="${style||''}">+ ${label}</div>`;
  const fact=(k,v)=>`<div class="e-fact"><span class="e-tag">${k}</span><span class="e-factv">${v}</span></div>`;
  // greybox “page preview” revealed when the camera settles on a panel
  const pv=(label,inner)=>`<div class="e-prevtag">preview · ${label}</div><div class="e-prevframe">${inner}</div>`;

  /* ---------- sections (each a panel on the world) ---------- */
  const SECTIONS=[
    {id:'work',ix:'01',tag:'WORK',title:'my designs',w:900,h:340,route:'work',pvZoom:1.28,say:'open weld \u2197',dwellMs:900,
     body:`<div class="e-work-img"><img src="assets/weld/cards.png" alt="weld — this is who'll be here" draggable="false"></div>
       <span class="e-tag"><b class="e-bb-num" data-count="200">200</b> signups \u00b7 $0 paid \u00b7 built solo</span>`,
     pvSrc:'Jawad Work Wireframes.html', pvDir:'D',
     prev:pv('/work', `<div class="e-pv-row">${img('weld','flex:2;height:96px;')}${ghost('soon','flex:1;height:96px;')}</div><div class="e-pv-row">${ghost('soon','flex:1;height:52px;')}${ghost('soon','flex:1;height:52px;')}</div>`),
     note:['Work','my designs \u2014 weld image; tilts + glares like the others, blooms the live /work preview on dwell.']},
    {id:'services',ix:'02',tag:'SERVICES',title:'',w:620,h:300,route:'services',say:'open services ↗',dwellMs:250,merge:true,
     body:`<div class="e-svc">
       <div class="e-svc-cluster" aria-hidden="true">
         <span class="e-svc-sticker s1">design</span>
         <span class="e-svc-sticker s2">build</span>
         <span class="e-svc-sticker s3">ship</span>
       </div>
       <div class="e-svc-merged">
         <span class="e-svc-stmt">I design it, build it, ship it.</span>
       </div>
     </div>`,
     pvSrc:'Jawad Services Wireframes.html', pvDir:'D',
     prev:pv('/services', `<div class="e-pv-row">${ghost('design','flex:1;height:54px;')}${ghost('build','flex:1;height:54px;')}</div><div class="e-pv-row">${ghost('ship','flex:1;height:46px;')}${ghost('care','flex:1;height:46px;')}</div>`),
     note:['Services','Sticker-merge — design/build/ship stickers merge into one statement on dwell, then the /services preview blooms.']},
    {id:'process',ix:'03',tag:'PROCESS',title:'',w:1480,h:250,route:'process',say:'open process ↗',dwellMs:260,ribbon:true,
     body:(function(){
       const P=[['Brief','we agree the goal before anything starts'],['Direction','you sign off the look first'],['Build','the real thing in your hands early'],['Polish','the details that make it feel right'],['Ship','it goes live'],['Maintain','a CMS, so you never wait on me for a change']];
       const N=P.length, W=2000, cy=120, amp=16, OFF=108, ext=150;
       const nd=P.map((p,i)=>({x:((i+0.5)/N*W), y:cy+amp*Math.sin((i/(N-1))*1.2*Math.PI)}));
       const cr=(pts)=>{let s='';for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||pts[i+1];s+=' C '+(p1.x+(p2.x-p0.x)/6).toFixed(1)+' '+(p1.y+(p2.y-p0.y)/6).toFixed(1)+' '+(p2.x-(p3.x-p1.x)/6).toFixed(1)+' '+(p2.y-(p3.y-p1.y)/6).toFixed(1)+' '+p2.x.toFixed(1)+' '+p2.y.toFixed(1);}return s;};
       const d='M '+nd[0].x.toFixed(1)+' '+nd[0].y.toFixed(1)+cr(nd);
       const tp=nd.map(p=>({x:p.x,y:p.y-OFF})), bp=nd.map(p=>({x:p.x,y:p.y+OFF}));
       const L=(nd[0].x-ext), R=(nd[N-1].x+ext), rr=22;
       const border='M '+nd[0].x.toFixed(1)+' '+tp[0].y.toFixed(1)+cr(tp)
         +' L '+(R-rr).toFixed(1)+' '+tp[N-1].y.toFixed(1)+' Q '+R.toFixed(1)+' '+tp[N-1].y.toFixed(1)+' '+R.toFixed(1)+' '+(tp[N-1].y+rr).toFixed(1)
         +' L '+R.toFixed(1)+' '+(bp[N-1].y-rr).toFixed(1)+' Q '+R.toFixed(1)+' '+bp[N-1].y.toFixed(1)+' '+(R-rr).toFixed(1)+' '+bp[N-1].y.toFixed(1)
         +' L '+nd[N-1].x.toFixed(1)+' '+bp[N-1].y.toFixed(1)+cr(bp.slice().reverse())
         +' L '+(L+rr).toFixed(1)+' '+bp[0].y.toFixed(1)+' Q '+L.toFixed(1)+' '+bp[0].y.toFixed(1)+' '+L.toFixed(1)+' '+(bp[0].y-rr).toFixed(1)
         +' L '+L.toFixed(1)+' '+(tp[0].y+rr).toFixed(1)+' Q '+L.toFixed(1)+' '+tp[0].y.toFixed(1)+' '+(L+rr).toFixed(1)+' '+tp[0].y.toFixed(1)
         +' L '+nd[0].x.toFixed(1)+' '+tp[0].y.toFixed(1)+' Z';
       const steps=P.map((p,i)=>'<div class="e-rstep" data-i="'+i+'" style="left:'+((i+0.5)/N*100).toFixed(2)+'%;--cy:'+nd[i].y.toFixed(1)+'px"><span class="e-rdot">'+(i+1)+'</span><span class="e-rlabel">'+p[0]+'</span><span class="e-rline">'+p[1]+'</span></div>').join('');
       return '<div class="e-ribbon"><svg class="e-ribbon-line" viewBox="0 0 '+W+' 260" preserveAspectRatio="none" aria-hidden="true"><path class="e-rb-border" d="'+border+'"></path><path class="e-rb-path" d="'+d+'"></path></svg><div class="e-ribbon-steps">'+steps+'</div></div><span class="e-tag e-ribbon-tag">the full story</span>';
     })(),
     pvSrc:'Jawad Process Wireframes.html', pvDir:'D',
     prev:pv('/process', `<div class="e-pv-row">${[1,2,3,4,5,6].map(()=>ghost('','flex:1;height:46px;')).join('')}</div>${bars(['100%','72%'])}`),
     note:['Process','The ribbon — filled low-wide band; 6 phases reveal left→right scrubbed to camera; tilts+glares; opens /process.']},
    {id:'about',ix:'04',tag:'ABOUT',title:'just me',w:420,h:300,open:'about',cls:'e-portal',say:'open about ↗',
     body:`<div class="e-portal-frame"><div class="e-portal-ring"><img class="e-portal-face" src="assets/jawad-portrait.png" alt="Jawad" draggable="false"><span class="e-portal-glare"></span></div></div>
       <div class="e-portal-facts"><div class="e-portal-chip">based in<b>london</b></div><div class="e-portal-chip">age<b>15</b></div><div class="e-portal-chip">builds<b>good stuff</b></div></div>`,
     pvDetail:'about',
     prev:pv('/about', `<div class="e-pv-row" style="align-items:center;"><div class="e-img e-portrait" style="width:72px;height:72px;"></div><div style="flex:1;">${bars(['100%','80%','62%'])}</div></div><div class="e-pv-row">${ghost('who','flex:1;height:46px;')}${ghost('how I work','flex:1;height:46px;')}</div>`),
     note:['About','just me — a framed portrait in a frosted panel with three frosted fact chips; lifts, tilts, glares and previews /about like every other panel. Click zooms into the portrait (match-cut) to the orbit canvas.']},
    {id:'trust',ix:'05',tag:'TRUST',title:'',w:520,h:300,open:'trust',cls:'e-poster',say:'open trust ↗',
     body:`<div class="e-poster-sheet"><div class="e-quote" data-matchcut><span class="e-qline q1">great skill</span><span class="e-qline q2">great design</span><span class="e-qline q3">great speed</span></div></div>
       <div class="e-attrib">Joel Jeon · founder, weld</div>`,
     pvDetail:'trust',
     prev:pv('/trust', `<div class="e-pv-row">${ghost('“ great skill · great design · great speed','flex:1;height:58px;')}</div><div class="e-pv-row">${ghost('the full testimonial','flex:2;height:46px;')}${ghost('200 · $0','flex:1;height:46px;')}</div>`),
     note:['Trust','A torn pull-quote poster — great skill / great design / great speed, leaning, with Joel Jeon · founder, weld straight beneath. Click zooms in (match-cut on the quote) to the proof behind the line.']},
    {id:'pricing',ix:'06',tag:'PRICING',title:'3 packages.',w:720,h:360,route:'pricing',cls:'e-podiumpanel',say:'open pricing ↗',dwellMs:250,
     body:`<div class="e-podium-wrap">
       <div class="e-pod e-pod1"><div class="e-pod-h"><b>The Single</b><span>from $500</span></div><div class="e-pod-line">A focused site, live in a week.</div><ul class="e-pod-list"><li>up to 3 pages</li><li>1 revision</li><li>30 days care</li></ul></div>
       <div class="e-pod e-pod2"><div class="e-pod-h"><b>The Edition</b><span>from $1,200</span></div><div class="e-pod-line">Room to grow, a look that travels.</div><ul class="e-pod-list"><li>up to 5 pages</li><li>CMS + source files</li><li>2 revisions</li></ul></div>
       <div class="e-pod e-pod3"><div class="e-pod-h"><b>The Commission</b><span>from $3,000</span></div><div class="e-pod-line">A flagship that has to land.</div><ul class="e-pod-list"><li>full multi-page site</li><li>signature interaction</li><li>full brand system</li></ul></div>
     </div>
     <span class="e-tag">prices are where the conversation starts</span>`,
     pvSrc:'Jawad Pricing Wireframes.html', pvDir:'D',
     prev:pv('/pricing', `<div class="e-pv-row" style="align-items:stretch;">${ghost('The Single · $500','flex:1;height:88px;')}${ghost('The Edition · $1,200','flex:1.12;height:100px;')}${ghost('The Commission · $3,000','flex:1;height:88px;')}</div><div class="e-pv-row">${bars(['100%','70%'])}</div>`),
     note:['Pricing','Three tiers as one rising podium — Single, Edition, Commission — ascending with price; blooms the live /pricing preview on dwell; opens /pricing.']},
    {id:'contact',ix:'06',tag:'CONTACT',title:'',w:1040,h:600,open:'contact',cls:'e-slab e-on-dark',say:'open contact ↗',dwellMs:250,
     body:`<div class="e-slab-head" data-matchcut>Your move.</div>
       <div class="e-slab-base"><a href="mailto:hijawadjalal@gmail.com">hijawadjalal@gmail.com</a></div>`,
     pvDetail:'contact',
     note:['Contact','The dark slab — Your move., one CTA to /contact, email baseline. No bloom preview, so the slab stays full and centred. Click match-cuts into the nested enquiry form. Terminal panel: advancing loops back to the hero.']},
  ];

  /* ---------- path layouts (tweakable) ---------- */
  function layout(path){
    if(path==='vertical') return SECTIONS.map((s,i)=>({x:0,y:i*440}));
    if(path==='horizontal'){
      // horizontal filmstrip with ONE smooth S-curve through it — gentle, gradual rise/fall
      // (not per-panel zig-zag), so it reads as a flowing path without the sway that causes nausea
      const wave=[0,-35,-35,0,-35,0,35];
      return SECTIONS.map((s,i)=>({x:i*880, y:wave[i]!==undefined?wave[i]:0}));
    }
    // gentle zig-zag: mild left/right sway, generous vertical spacing
    const X=236, DY=480;
    const xs=[0,-X,X,0,-X,0,0];
    return SECTIONS.map((s,i)=>({x:xs[i]!==undefined?xs[i]:(i%2?X:-X), y:i*DY}));
  }

  /* ---------- build E into the tab system ---------- */
  const tabsWrap=document.getElementById('tabs');
  const canvasEl=document.getElementById('canvas');

  // E tab
  const tabBtn=document.createElement('button');
  tabBtn.className='tab'; tabBtn.setAttribute('role','tab'); tabBtn.setAttribute('aria-selected','false'); tabBtn.dataset.target='E';
  tabBtn.innerHTML=`<b>E · Scrollable Canvas</b><small>direction 5 of 5</small>`;
  tabsWrap.appendChild(tabBtn);
  // fix the "x of 4" labels on existing tabs
  tabsWrap.querySelectorAll('.tab small').forEach((s,i)=>{ if(i<4) s.textContent=`direction ${i+1} of 5`; });

  // E section
  const section=document.createElement('section');
  section.className='direction'; section.dataset.dir='E'; section.setAttribute('data-screen-label','Direction E — Scrollable Canvas');
  if(window.self!==window.top) section.classList.add('e-embedded');
  const annotItems=SECTIONS.map((s,i)=>`<div class="en"><span class="eye-dot">${i+1}</span><b>${s.note[0]}</b><span>${s.note[1]}</span></div>`).join('');
  section.innerHTML=`
    <div class="dir-head"><div class="num">E</div>
      <div class="meta"><h2>Scrollable Canvas <span style="font-family:var(--mono);font-size:11px;color:var(--ink-soft);letter-spacing:.06em;text-transform:uppercase;margin-left:8px;">scroll-driven camera · structured path</span></h2>
      <p>The whole site is a canvas — so the homepage becomes one too. Scroll and a camera travels a fixed path through the sections in order, keeping structure while feeling spatial. The path is a Tweak (zig-zag · vertical · horizontal), every section has a little CTA to its dedicated page, About + Trust open into nested canvases, and Free roam lets you drag/zoom anywhere.</p></div></div>
    <div class="e-wrap">
      <div class="e-annot">${annotItems}</div>
      <div class="e-stage" id="e-stage">
        <div class="e-progress" id="e-progress"></div>
        <div class="e-viewport" id="e-viewport">
          <div class="e-track" id="e-track"><div class="e-camera"><div class="e-world" id="e-world"><svg class="e-wires" id="e-wires"></svg></div></div></div>
        </div>
        <div class="e-minimap v-spine" id="e-minimap"><div class="e-nav-map" id="e-nav-map"></div></div>
        <div class="e-hint">‹ left-click · back &nbsp;·&nbsp; right-click · forward ›</div>
        <div class="e-detail" id="e-detail"><div class="e-detail-chrome"><span class="e-back">← Back to the page</span><span class="e-close">✕</span></div><div class="e-detail-body" id="e-detail-body"></div></div>
      </div>
    </div>`;
  canvasEl.appendChild(section);

  /* ---------- state ---------- */
  const stage=section.querySelector('#e-stage');
  const viewport=section.querySelector('#e-viewport');
  viewport.tabIndex=0; viewport.setAttribute('aria-label','Homepage tour — use arrow keys to move between sections');
  const track=section.querySelector('#e-track');
  const world=section.querySelector('#e-world');
  const wires=section.querySelector('#e-wires');
  const minimap=section.querySelector('#e-minimap');
  const navMap=section.querySelector('#e-nav-map');
  const progressBar=section.querySelector('#e-progress');
  const detail=section.querySelector('#e-detail');
  const detailBody=section.querySelector('#e-detail-body');
  let PATH='horizontal', MINIMAP=true, EASE='subtle', pts=[], scale=1.0, built=false, pgSuspended=false;
  let navStyle='spine', navPts=null, navTravEl=null, navTravLen=0, navCometEl=null, navLabelEl=null;
  let introActive=false, introRAF=null, introPlayed=false, introHeal=null;
  let navLastFrac=0, navLastIdx=0, navSubs=[], navRebuildSubs=[];
  let travPath=null, travLen=0, panelLen=[];
  const FINE = (window.matchMedia && window.matchMedia('(pointer:fine)').matches);
  // spatial canvas (inertia scroll + magnetic settle + drag) is desktop / pointer:fine / wide.
  // Touch or narrow drop to the plain vertical-stack fallback. Reduced-motion keeps the camera
  // but tracks scroll 1:1 with no inertia and no animated settle (motion stripped).
  const mqCoarse = window.matchMedia('(pointer:coarse)');
  const mqNarrow = window.matchMedia('(max-width: 760px)');
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  // spatial camera (inertia scroll + magnetic settle + drag) is desktop / pointer:fine / wide / motion-OK.
  // Reduced-motion (like coarse + narrow) drops to the plain vertical-stack fallback — no camera, no settle.
  function spatial(){ return FINE && !mqCoarse.matches && !mqNarrow.matches; }
  const BASE_SCALE=1.0, SETTLE_SCALE=1.02; // base zoom kept close so panel copy is readable at rest
  const HERO_ZOOM=1.16;                    // the loader lands the camera in close on the hero, then pulls back toward Work
  // per-panel depth (z ~0.6 far → 1.4 near), index-matched to SECTIONS
  // [work, services, process, about, trust, pricing, contact]
  const DEPTH=[0.8, 1.12, 1.16, 0.78, 0.84, 1.18, 1.34];
  let settled=false, zoomRAF=null, settledIdx=-1;
  let blackout=null, loaderEl=null, loaderWheel=null, heroHP=0, heroResize=null;
  let heroEndAt=0, idleSpin=0, idleSpinTimer=null, idleSpinLast=0, heroDir=1, heroAnimId=0, heroAnimating=false;   // gate + slow orbit + direction + anim token

  /* find the arc-length along the spine at each panel point, so the camera rests dead-centre */
  function computePanelLens(){
    panelLen=[];
    const n=pts.length;
    if(!travPath || travLen<=0){ for(let i=0;i<n;i++) panelLen.push(i/Math.max(1,n-1)*travLen); return; }
    const N=700, samples=[];
    for(let s=0;s<=N;s++){ const l=s/N*travLen; const pt=travPath.getPointAtLength(l); samples.push({l,x:pt.x,y:pt.y}); }
    for(let i=0;i<n;i++){
      let best=0,bd=Infinity;
      for(const sm of samples){ const dx=sm.x-pts[i].x, dy=sm.y-pts[i].y, dd=dx*dx+dy*dy; if(dd<bd){bd=dd;best=sm.l;} }
      panelLen.push(best);
    }
    panelLen[0]=0; panelLen[n-1]=travLen;
  }

  /* homepage path arrows removed per request — keep the function as a no-op so callers stay intact */
  function drawPathArrows(){
    wires.querySelectorAll('.e-arrow').forEach(a=>a.remove());
  }

  /* per-segment easing — kept close to linear so camera velocity stays steady (less motion sickness) */
  function segEase(f, mode){
    const ss=x=>x*x*(3-2*x);            // smoothstep
    const sss=x=>x*x*x*(x*(x*6-15)+10); // smootherstep
    if(mode==='subtle') return f + (ss(f)-f)*0.18; // nearly linear
    if(mode==='strong') return sss(f);
    return f + (ss(f)-f)*0.4; // medium: mild slow-in, no lurch
  }
  /* Catmull-Rom → cubic bezier, for a smooth curved spine through the panel points */
  function splineD(P){
    if(P.length<2) return '';
    let d=`M ${P[0].x} ${P[0].y}`;
    for(let i=0;i<P.length-1;i++){
      const p0=P[i-1]||P[i], p1=P[i], p2=P[i+1], p3=P[i+2]||P[i+1];
      const c1x=p1.x+(p2.x-p0.x)/6, c1y=p1.y+(p2.y-p0.y)/6;
      const c2x=p2.x-(p3.x-p1.x)/6, c2y=p2.y-(p3.y-p1.y)/6;
      d+=` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  }

  function panelHTML(s,i){
    const openA = s.open?` data-open="${s.open}" tabindex="0" role="button" aria-label="Open ${s.tag}"`:'';
    const routeA = s.route?` data-route="${s.route}" tabindex="0" role="button" aria-label="Open ${s.tag} page"`:'';
    const pvA = s.pvSrc?` data-pvsrc="${s.pvSrc}" data-pvdir="${s.pvDir||'D'}"`:(s.pvDetail?` data-pvdetail="${s.pvDetail}"`:'');
    const sayA = s.say?` data-cursor-say="${s.say}"`:'';
    const dwellA = s.dwellMs?` data-dwell="${s.dwellMs}"`:'';
    const pvzA = s.pvZoom?` data-pvzoom="${s.pvZoom}"`:'';
    const mergeA = s.merge?' data-merge="1"':'';
    return `<div class="e-panel${(s.open||s.route)?' openable':''}${s.billboard?' e-billboard':''}${s.ribbon?' e-ribbon-panel':''}${s.bare?' bare':''}${s.cls?' '+s.cls:''}" data-i="${i}"${openA}${routeA}${pvA}${sayA}${dwellA}${pvzA}${mergeA} style="left:0;top:0;width:${s.w}px;min-height:${s.h}px;">
      <div class="e-title${s.titleCls?' '+s.titleCls:(s.xl?' xl':'')}">${s.title}</div>${s.body}
      ${s.prev?`<div class="e-preview">${s.prev}</div>`:''}
      ${s.open?'<span class="e-open-cur">Enter ⤢</span>':''}</div>`;
  }
  function build(){
    // panels
    SECTIONS.forEach((s,i)=>{ const d=document.createElement('div'); d.innerHTML=panelHTML(s,i).trim();
      const pe=d.firstChild; if(!mqReduce.matches) pe.classList.add('e-reveal-pending');   // armed; reveals on approach
      world.appendChild(pe); });
    built=true;
    if(!blackout){ blackout=document.createElement('div'); blackout.className='e-blackout'; stage.insertBefore(blackout, stage.firstChild); }
    if(!loaderEl) buildLoader();
    placePanels();
    initPanelTilt();
    injectBillboardCSS();
    injectPodiumCSS();
    if(idleRAF==null) idleRAF=requestAnimationFrame(idleBreath);   // living-canvas idle drift
    maybeIntro();   // show the loader once. Plain opaque overlay → safe in embedded/hidden frames; a click opens the canvas.
    buildPreloader();   // quick controls intro on top; auto-fades into the hero
  }
  /* ---------- WORK = billboard variant: biggest, dead-straight, full-bleed weld; poster stat strip; weld trailer on dwell ---------- */
  function injectPodiumCSS(){
    if(document.getElementById('__podium')) return;
    const st=document.createElement('style'); st.id='__podium';
    st.textContent=`
      /* PRICING = one rising podium (3 tiers fused into a staircase, ascending with price; no popular marker) */
      .e-panel.e-podiumpanel{align-items:center;gap:12px;}
      .e-podium-wrap{display:flex;align-items:flex-end;justify-content:center;gap:0;width:100%;
        filter:drop-shadow(0 14px 26px rgba(0,0,0,.16));}
      .e-pod{position:relative;flex:1;display:flex;flex-direction:column;gap:8px;padding:15px 15px 17px;
        background:linear-gradient(152deg,rgba(255,255,255,.8),rgba(236,234,229,.62));
        -webkit-backdrop-filter:blur(7px) saturate(1.05);backdrop-filter:blur(7px) saturate(1.05);
        border-top:2px solid var(--line-soft);border-bottom:2px solid var(--line-soft);}
      /* ascending heights: Single (short) -> Edition (mid) -> Commission (tall) */
      .e-pod1{min-height:170px;border-left:2px solid var(--line-soft);border-right:1.5px solid var(--line-soft);border-radius:20px 14px 0 20px;}
      .e-pod2{min-height:218px;border-right:1.5px solid var(--line-soft);border-radius:14px 14px 0 0;}
      .e-pod3{min-height:266px;border-right:2px solid var(--line-soft);border-radius:14px 20px 20px 0;}
      .e-pod-h{display:flex;flex-direction:column;gap:3px;}
      .e-pod-h b{font-family:var(--hand);font-size:20px;color:var(--ink);line-height:1;}
      .e-pod-h span{font-family:var(--mono);font-size:13px;color:var(--accent);}
      .e-pod-line{font-family:var(--mono);font-size:10.5px;color:var(--ink);line-height:1.35;}
      .e-pod-list{list-style:none;margin:auto 0 0;padding:0;display:flex;flex-direction:column;gap:5px;}
      .e-pod-list li{position:relative;font-family:var(--mono);font-size:10px;color:var(--ink-soft);padding-left:15px;}
      .e-pod-list li::before{content:"\\2713";position:absolute;left:0;color:var(--accent);}
      @media (prefers-reduced-motion:no-preference){
        .e-panel.e-podiumpanel.is-active .e-pod{animation:e-pod-rise .6s cubic-bezier(.2,.8,.2,1) both;transform-origin:50% 100%;}
        .e-panel.e-podiumpanel.is-active .e-pod2{animation-delay:.08s;}
        .e-panel.e-podiumpanel.is-active .e-pod3{animation-delay:.16s;} }
      @keyframes e-pod-rise{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:none;}}
      @media (pointer:coarse),(max-width:760px){
        .e-podium-wrap{flex-direction:column;align-items:stretch;gap:10px;filter:none;}
        .e-pod{min-height:0!important;border-radius:12px!important;border:2px solid var(--line-soft)!important;} }
    `;
    (document.head||document.documentElement).appendChild(st);
  }

  function injectBillboardCSS(){
    if(document.getElementById('__billboard')) return;
    const st=document.createElement('style'); st.id='__billboard';
    st.textContent=`
      .e-panel.e-billboard{padding:0;overflow:hidden;border-radius:5px;border-width:2.5px;box-shadow:0 20px 50px rgba(0,0,0,.22);}
      .e-panel.e-billboard > .e-title{display:none;}
      .e-work-img{border-radius:6px;overflow:hidden;border:1.5px solid var(--line);background:var(--paper-2);}
      .e-work-img img{width:100%;height:214px;object-fit:cover;object-position:50% 0;display:block;}
      /* services = sticker-merge */
      .e-svc{position:relative;min-height:150px;}
      .e-svc-cluster{position:relative;height:150px;}
      .e-svc-sticker{position:absolute;left:50%;top:50%;white-space:nowrap;font-family:var(--mono);font-size:14px;letter-spacing:.04em;color:var(--ink);
        background:var(--paper);border:2.5px solid #fff;border-radius:11px;padding:9px 17px;
        box-shadow:0 0 0 1px var(--line-soft), 0 9px 20px rgba(0,0,0,.16);will-change:transform,opacity;
        transition:transform 1.5s cubic-bezier(.2,.8,.2,1),opacity 1.3s ease;}
      .e-svc-sticker.s1{transform:translate(-122%,-82%) rotate(-8deg);}
      .e-svc-sticker.s2{transform:translate(-48%,-2%) rotate(6deg);}
      .e-svc-sticker.s3{transform:translate(6%,-92%) rotate(-4deg);}
      .e-svc-merged{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(.92);opacity:0;
        display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;width:max-content;max-width:94%;
        will-change:transform,opacity;transition:transform 1.5s cubic-bezier(.2,.8,.2,1),opacity 1.2s ease;pointer-events:none;}
      .e-svc-stmt{font-family:var(--hand);font-size:28px;line-height:1.02;color:var(--ink);text-align:center;white-space:nowrap;
        background:var(--paper);border:3px solid #fff;border-radius:14px;padding:9px 18px;
        box-shadow:0 0 0 1px var(--line-soft), 0 12px 26px rgba(0,0,0,.18);}
      .e-panel.svc-merged .e-svc-sticker{transform:translate(-50%,-50%) rotate(0deg) scale(.85);opacity:0;}
      .e-panel.svc-merged .e-svc-merged{transform:translate(-50%,-50%) scale(1);opacity:1;pointer-events:auto;}
      @media (pointer:coarse),(max-width:760px){ .e-svc-cluster{display:none;} .e-svc-merged{position:static;transform:none!important;opacity:1!important;pointer-events:auto;} }
      /* process = the ribbon (nodes ride a flowing curve; the panel border IS the curve, drawn on with the camera) */
      .e-panel.e-ribbon-panel{justify-content:center;border:none!important;background:transparent!important;box-shadow:none!important;padding:0;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}
       .e-panel.bare{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}
      .e-ribbon{position:relative;width:100%;height:300px;padding:6px 0 0;}
      .e-ribbon-line{position:absolute;left:0;top:6px;width:100%;height:260px;overflow:visible;z-index:0;}
      .e-ribbon-line path{fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:6000;stroke-dashoffset:6000;transition:stroke-dashoffset 3.6s linear;}
      .e-ribbon-line .e-rb-border{stroke:rgba(255,255,255,.85);stroke-width:3;fill:rgba(247,246,243,.55);stroke-dasharray:0!important;stroke-dashoffset:0!important;filter:drop-shadow(0 12px 22px rgba(0,0,0,.14));}
      .e-ribbon-steps{position:relative;height:260px;z-index:1;}
      .e-rstep{position:absolute;top:calc(var(--cy,128px) - 17px);transform:translate(-50%,12px);width:128px;display:flex;flex-direction:column;align-items:center;gap:7px;text-align:center;
        opacity:0;transition:opacity .4s ease,transform .45s cubic-bezier(.2,.8,.2,1);}
      .e-rstep.on{opacity:1;transform:translate(-50%,0);}
      .e-rdot{position:relative;width:34px;height:34px;border-radius:50%;border:2px solid var(--ink);background:var(--paper);
        font-family:var(--mono);font-size:13px;display:flex;align-items:center;justify-content:center;color:var(--ink);transition:background .2s ease,color .2s ease;}
      .e-rstep.on .e-rdot{background:var(--ink);color:var(--paper);}
       .e-panel.e-ribbon-panel.ribbon-play .e-rstep{opacity:1;transform:translate(-50%,0);}
       .e-panel.e-ribbon-panel.ribbon-play .e-rstep .e-rdot{background:var(--ink);color:var(--paper);animation-name:e-dotpop;animation-duration:.7s;animation-timing-function:cubic-bezier(.34,1.56,.64,1);animation-fill-mode:both;}
       @keyframes e-dotpop{0%{transform:scale(.45);box-shadow:0 0 0 0 rgba(44,44,42,.5);}55%{transform:scale(1.22);box-shadow:0 0 0 9px rgba(44,44,42,0);}100%{transform:scale(1);box-shadow:0 0 0 0 rgba(44,44,42,0);}}
       .e-panel.e-ribbon-panel.ribbon-play .e-ribbon-line path{stroke-dashoffset:0;}
       .e-ribbon-steps .e-rstep:nth-child(2),.e-ribbon-steps .e-rstep:nth-child(2) .e-rdot{transition-delay:0.6s;animation-delay:0.6s;}
       .e-ribbon-steps .e-rstep:nth-child(3),.e-ribbon-steps .e-rstep:nth-child(3) .e-rdot{transition-delay:1.2s;animation-delay:1.2s;}
       .e-ribbon-steps .e-rstep:nth-child(4),.e-ribbon-steps .e-rstep:nth-child(4) .e-rdot{transition-delay:1.8s;animation-delay:1.8s;}
       .e-ribbon-steps .e-rstep:nth-child(5),.e-ribbon-steps .e-rstep:nth-child(5) .e-rdot{transition-delay:2.4s;animation-delay:2.4s;}
       .e-ribbon-steps .e-rstep:nth-child(6),.e-ribbon-steps .e-rstep:nth-child(6) .e-rdot{transition-delay:3s;animation-delay:3s;}
      .e-rlabel{font-family:var(--hand);font-size:20px;line-height:1;color:var(--ink);}
      .e-rline{font-family:var(--mono);font-size:10px;line-height:1.4;color:var(--ink-soft);}
      .e-ribbon-tag{display:block;text-align:center;margin-top:6px;}
      /* reduced-motion: the ribbon still scrubs with the camera (per request) */
      @media (pointer:coarse),(max-width:760px){ .e-ribbon{height:auto;padding:12px 14px;} .e-ribbon-line{display:none;} .e-ribbon-steps{height:auto;display:flex;flex-direction:column;gap:14px;} .e-rstep{position:static;transform:none!important;opacity:1!important;width:auto;flex-direction:row;align-items:center;gap:12px;text-align:left;} }
      .e-bb-img{position:absolute;inset:0;background:var(--paper-2);}
      .e-bb-img img{width:100%;height:100%;object-fit:cover;object-position:50% 12%;display:block;}
      .e-bb-strip{position:absolute;left:0;right:0;bottom:0;z-index:2;display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;
        padding:30px 22px 16px;color:#f4f3f0;
        background:linear-gradient(0deg, rgba(20,19,16,.86), rgba(20,19,16,.5) 62%, transparent);}
      .e-bb-tag{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(244,243,240,.72);}
      .e-bb-stats{font-family:var(--mono);font-size:13px;letter-spacing:.02em;color:rgba(244,243,240,.9);}
      .e-bb-stats .e-bb-num{font-family:var(--hand);font-size:30px;line-height:1;color:#fff;margin-right:2px;}
      /* dwell-gated bloom: the weld trailer */
      .e-weld-trailer{display:flex;flex-direction:column;gap:10px;}
      .e-wt-frames{display:flex;gap:8px;}
      .e-wt-frame{flex:1;border:1.5px solid var(--line);border-radius:6px;overflow:hidden;background:var(--paper-2);
        opacity:0;transform:translateY(12px);transition:opacity .42s ease, transform .5s cubic-bezier(.2,.8,.2,1);}
      .e-panel.is-expanded .e-wt-frame{opacity:1;transform:none;}
      .e-panel.is-expanded .e-wt-frame.f2{transition-delay:.1s;}
      .e-panel.is-expanded .e-wt-frame.f3{transition-delay:.2s;}
      .e-wt-frame img{width:100%;height:92px;object-fit:cover;object-position:50% 0;display:block;}
      .e-wt-proof{display:flex;align-items:baseline;gap:8px;margin-top:2px;}
      .e-wt-num{font-family:var(--mono);font-size:32px;line-height:1;color:var(--ink);}
      .e-wt-proof span{font-family:var(--mono);font-size:12px;color:var(--ink-soft);}
      .e-wt-line{font-family:var(--hand);font-size:21px;color:var(--ink);}
      @media (prefers-reduced-motion: reduce){ .e-wt-frame{opacity:1!important;transform:none!important;transition:none!important;} }
      @media (pointer:coarse),(max-width:760px){ .e-panel.e-billboard{min-height:300px!important;} .e-bb-strip{position:static;background:var(--ink);} .e-wt-frame{opacity:1!important;transform:none!important;} }
    `;
    (document.head||document.documentElement).appendChild(st);
  }

  /* ---------- intro pre-loader: quick typewriter of the controls (desktop) or a 'scroll' hint (mobile),
     keeps the whiteboard grid, skippable by any click/scroll, then auto-fades into the hero. Once per session. ---------- */
  let preEl=null;
  function buildPreloader(){
    if(preEl) return;
    let replayEvery=true;                                  // default: play on every refresh (tweak ON by default)
    try{ if(localStorage.getItem('jawad-pre-replay')==='0') replayEvery=false; }catch(_){ }
    if(!replayEvery){ try{ if(sessionStorage.getItem('jawad-preloader')==='1') return; }catch(_){ } }
    const mobile = !spatial();
    if(!document.getElementById('__preload')){
      const st=document.createElement('style'); st.id='__preload';
      st.textContent = `
        .e-preload{position:absolute;inset:0;z-index:30;display:flex;align-items:center;justify-content:center;
          background:var(--paper,#f4f3f0);cursor:pointer;overflow:hidden;
          transition:opacity .55s ease, transform .6s cubic-bezier(.4,0,.2,1);}
        .e-preload.gone{opacity:0;transform:scale(1.02);pointer-events:none;}
        .e-preload-grid{position:absolute;inset:0;pointer-events:none;
          background-image:repeating-linear-gradient(0deg,transparent 0 31px,rgba(0,0,0,.045) 31px 32px),
            repeating-linear-gradient(90deg,transparent 0 31px,rgba(0,0,0,.045) 31px 32px);}
        .e-pl-stage{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:26px;padding:0 24px;text-align:center;}
        .e-pl-mouse{width:46px;height:66px;opacity:0;transform:translateY(6px);transition:opacity .45s ease,transform .45s cubic-bezier(.2,.8,.2,1);}
        .e-pl-mouse.in{opacity:1;transform:translateY(0);}
        .e-pl-mouse .pm-body{fill:none;stroke:var(--ink,#2c2c2a);stroke-width:2;}
        .e-pl-mouse .pm-div{stroke:var(--ink,#2c2c2a);stroke-width:1.5;}
        .e-pl-mouse .pm-btn{fill:var(--hero-accent,#c0584a);opacity:0;transition:opacity .1s ease;}
        .e-pl-mouse .pm-btn.on{opacity:.85;}
        .e-pl-lines{display:flex;flex-direction:column;gap:11px;align-items:center;}
        .e-pl-line{font-family:var(--mono,monospace);color:var(--ink,#2c2c2a);min-height:1.3em;letter-spacing:.02em;}
        .e-pl-l1{font-size:clamp(15px,2.1vw,22px);}
        .e-pl-l2{font-size:clamp(12px,1.5vw,15px);color:var(--ink-soft,#6f6e6a);letter-spacing:.07em;}
        .e-pl-caret{display:inline-block;width:.6ch;height:1.05em;vertical-align:-2px;margin-left:2px;background:var(--ink,#2c2c2a);
          animation:e-pl-blink 1s steps(1) infinite;}
        @keyframes e-pl-blink{0%,49.9%{opacity:1;}50%,100%{opacity:0;}}
        .e-pl-hint{font-family:var(--mono,monospace);font-size:clamp(22px,3.4vw,32px);color:var(--ink,#2c2c2a);
          display:inline-flex;flex-direction:column;align-items:center;gap:10px;letter-spacing:.06em;text-transform:lowercase;}
        .e-pl-hint .ar{font-size:.9em;animation:e-pl-bob 1.4s ease-in-out infinite;}
        @keyframes e-pl-bob{0%,100%{transform:translateY(-4px);opacity:.45;}50%{transform:translateY(5px);opacity:1;}}
      `;
      (document.head||document.documentElement).appendChild(st);
    }
    preEl=document.createElement('div'); preEl.className='e-preload'; preEl.id='e-preload';
    preEl.setAttribute('role','button'); preEl.tabIndex=0;
    preEl.setAttribute('aria-label', mobile?'Intro — scroll to enter':'Intro — left click to go backward, right click to go forward');
    if(mobile){
      preEl.innerHTML='<div class="e-preload-grid"></div>'+
        '<div class="e-pl-stage"><div class="e-pl-hint">scroll<span class="ar">↓</span></div></div>';
    } else {
      preEl.innerHTML='<div class="e-preload-grid"></div>'+
        '<div class="e-pl-stage">'+
          '<svg class="e-pl-mouse" id="e-pl-mouse" viewBox="0 0 44 64" aria-hidden="true">'+
            '<path class="pm-btn pm-left" d="M22 3 A19 19 0 0 0 3 22 L3 26 L22 26 Z"></path>'+
            '<path class="pm-btn pm-right" d="M22 3 A19 19 0 0 1 41 22 L41 26 L22 26 Z"></path>'+
            '<rect class="pm-body" x="3" y="3" width="38" height="58" rx="19"></rect>'+
            '<line class="pm-div" x1="22" y1="3" x2="22" y2="26"></line>'+
            '<line class="pm-div" x1="3" y1="26" x2="41" y2="26"></line>'+
          '</svg>'+
          '<div class="e-pl-lines">'+
            '<div class="e-pl-line e-pl-l1"><span class="t1"></span><span class="e-pl-caret"></span></div>'+
            '<div class="e-pl-line e-pl-l2"><span class="t2"></span></div>'+
          '</div>'+
        '</div>';
    }
    stage.appendChild(preEl);

    let alive=true; const timers=[];
    const T=(fn,ms)=>{ const id=setTimeout(()=>{ if(alive||fn===finish) fn(); }, ms); timers.push(id); return id; };
    function finish(){ if(preEl){ preEl.remove(); preEl=null; } }
    function done(){ if(!alive) return; alive=false; timers.forEach(clearTimeout);
      preEl.classList.add('gone'); setTimeout(finish, 600); }
    preEl.addEventListener('pointerdown',done);
    preEl.addEventListener('wheel',done,{passive:true});
    preEl.addEventListener('touchstart',done,{passive:true});
    preEl.addEventListener('keydown',e=>{ done(); });
    try{ sessionStorage.setItem('jawad-preloader','1'); }catch(_){ }

    if(mobile){ T(done,1700); return; }

    // desktop: typewriter the controls, flashing the mouse buttons in sync
    const mouse=preEl.querySelector('#e-pl-mouse');
    const t1=preEl.querySelector('.t1'), t2=preEl.querySelector('.t2');
    const L1='left click to go backward, right click to go forward';
    const L2='on mobile? scroll';
    const left=mouse&&mouse.querySelector('.pm-left'), right=mouse&&mouse.querySelector('.pm-right');
    const flash=(el)=>{ if(!el||!alive) return; el.classList.add('on'); T(()=>el.classList.remove('on'),240); };
    const SP=29;
    function type(el,text,i,cb){ if(!alive) return; el.textContent=text.slice(0,i);
      if(i===('left click').length) flash(left);
      if(i===('left click to go backward, right click').length) flash(right);
      if(i<text.length) T(()=>type(el,text,i+1,cb),SP);
      else if(cb) T(cb,320);
    }
    T(()=>{ if(mouse) mouse.classList.add('in'); }, 120);
    T(()=>type(t1,L1,0,()=>{
      const c1=preEl&&preEl.querySelector('.e-pl-l1 .e-pl-caret'); if(c1) c1.remove();
      const c2=document.createElement('span'); c2.className='e-pl-caret';
      if(t2&&t2.parentNode) t2.parentNode.appendChild(c2);
      T(()=>type(t2,L2,0,()=>T(done,700)),260);
    }), 440);
  }

  /* ---------- LOADER — the brand landing. The wordmark + copy live here; the canvas is built
     behind it and a click (anywhere, or Enter) opens it. No auto-dismiss, so it can never strand
     a blank canvas the way a timed splash could. ---------- */
  function railHTML(side){
    const keys=(window.JAWAD_RAILS&&window.JAWAD_RAILS[side])||[];
    const one=keys.map((k,idx)=>{
      const svg=(window.JAWAD_LOGOS&&window.JAWAD_LOGOS[k])||'';
      const nm=(window.JAWAD_LOGO_NAMES&&window.JAWAD_LOGO_NAMES[k])||k;
      return `<div class="e-logo" data-logo="${k}" aria-label="${nm}" style="--fd:${(idx*0.6).toFixed(2)}s">${svg}<span class="e-logo-tip">${nm}</span></div>`;
    }).join('');
    return `<div class="e-rail-track">${one}${one}${one}</div>`;   // tripled for a seamless, never-empty loop
  }
  function buildLoader(){
    loaderEl=document.createElement('div');
    loaderEl.className='e-loader'; loaderEl.id='e-loader';
    loaderEl.setAttribute('role','button'); loaderEl.tabIndex=0;
    loaderEl.setAttribute('aria-label','Enter — open the canvas');
    const HS=(window.JAWAD_HERO||{left:[],right:[]});
    const lg=(key,side,j)=>{ const svg=(window.JAWAD_LOGOS&&window.JAWAD_LOGOS[key])||'';
      const nm=(window.JAWAD_LOGO_NAMES&&window.JAWAD_LOGO_NAMES[key])||key;
      return '<div class="e-hlogo e-hlogo--'+side+'" data-side="'+side+'" data-j="'+j+'" style="--exp:0;--d:'+((j*0.5)+(side==='right'?0.25:0)).toFixed(2)+'s">'+
        '<span class="e-hlogo-ic">'+svg+'</span><span class="e-hlogo-name">'+nm+'</span></div>'; };
    const logos=(HS.left||[]).map((k,j)=>lg(k,'left',j)).join('')+(HS.right||[]).map((k,j)=>lg(k,'right',j)).join('');
    loaderEl.innerHTML='<div class="e-loader-grid" aria-hidden="true"></div>'+
      '<div class="e-hero2" id="e-hero2">'+
        '<div class="e-hlogos" id="e-hlogos">'+logos+'</div>'+
        '<div class="e-w1 e-wsticker" id="e-w1"><b>JAWAD</b></div>'+
        '<div class="e-w1 e-wsticker" id="e-w1b" style="opacity:0"><b>DESIGN</b></div>'+
        '<div class="e-im" id="e-im">hi, i\'m</div>'+
        '<div class="e-im" id="e-im2" style="opacity:0">i also</div>'+
        '<div class="e-hero-ring e-sticker" id="e-ring"><img src="assets/jawad-hero.png" alt="Jawad" draggable="false"><span class="e-ring-glare"></span></div>'+
      '</div>'+
      '<span class="e-loader-cue" id="e-cue">scroll</span>';
    stage.appendChild(loaderEl);
    setupTilt();
    const act=(e)=>{ if(e&&e.preventDefault) e.preventDefault(); if(heroHP>0.01) animateHeroTo(0); };   // left-click = back
    loaderEl.addEventListener('click', act);
    loaderEl.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') act(e); });
    // right-click on the hero goes FORWARD (advance to state 2, then enter the canvas)
    loaderEl.addEventListener('contextmenu', e=>{ if(e&&e.preventDefault) e.preventDefault(); if(heroHP<0.99) animateHeroTo(1); else dismissLoader(); });
    heroResize=()=>{ if(loaderEl && loaderEl.style.display!=='none') renderHero(heroHP); };
    window.addEventListener('resize', heroResize);
  }
  const _cl=(v,a,b)=>Math.max(a,Math.min(b,v));
  /* ---------- portrait: stays centred; tilts in 3D toward the cursor (both states), with a soft
     moving glare; lifts a touch in state 2. One writer (applyRing) is shared by scroll + pointer. ---------- */
  let tiltRX=0, tiltRY=0, tiltTX=0, tiltTY=0, tiltRAF=null;
  function applyRing(){
    const ring=loaderEl&&loaderEl.querySelector('#e-ring'); if(!ring) return;
    const tC=_cl((heroHP-0.64)/0.36,0,1);
    const lift=tC*-20, sc=1+tC*0.05;                          // state-2: slight lift + grow
    ring.style.transform='translate(-50%,-50%) translateY('+lift.toFixed(1)+'px) perspective(950px) '+
      'rotateX('+tiltRX.toFixed(2)+'deg) rotateY('+tiltRY.toFixed(2)+'deg) scale('+sc.toFixed(3)+')';
    const glare=ring.querySelector('.e-ring-glare');
    if(glare){ glare.style.setProperty('--gx',(46 - tiltRY*1.7).toFixed(1)+'%');
      glare.style.setProperty('--gy',(32 + tiltRX*1.7).toFixed(1)+'%'); }
  }
  function tiltLoop(){
    tiltRAF=null;
    tiltRX+=(tiltTX-tiltRX)*0.12; tiltRY+=(tiltTY-tiltRY)*0.12;
    applyRing();
    if(Math.abs(tiltTX-tiltRX)>0.04 || Math.abs(tiltTY-tiltRY)>0.04) tiltRAF=requestAnimationFrame(tiltLoop);
    else { tiltRX=tiltTX; tiltRY=tiltTY; applyRing(); }
  }
  function kickTilt(){ if(tiltRAF==null) tiltRAF=requestAnimationFrame(tiltLoop); }
  function setupTilt(){
    const MAX=15;
    loaderEl.addEventListener('pointermove', e=>{
      const ring=loaderEl.querySelector('#e-ring'); if(!ring) return;
      const r=ring.getBoundingClientRect(); const rx=r.left+r.width/2, ry=r.top+r.height/2;
      const dx=_cl((e.clientX-rx)/(r.width/2),-1,1), dy=_cl((e.clientY-ry)/(r.height/2),-1,1);
      tiltTY=dx*MAX; tiltTX=dy*-MAX; kickTilt();
    });
    loaderEl.addEventListener('pointerleave', ()=>{ tiltTX=0; tiltTY=0; kickTilt(); });
  }
  function renderHero(hp){
    if(!loaderEl) return;
    const W=loaderEl.clientWidth||1200, Hh=loaderEl.clientHeight||700, cx=W/2, cy=Hh/2;
    const ring=loaderEl.querySelector('#e-ring'); if(!ring) return;
    const pr=(ring.offsetWidth||340)/2;
    // phases: A) head + JAWAD centred · B) all 10 logos pop out & ORBIT (one full turn) · C) regroup into a symmetric arc
    const popP=_cl((hp-0.05)/0.20,0,1);                       // logos pop out (early)
    const tC=_cl((hp-0.58)/0.42,0,1);                         // stage-2 regroup -> wider, gentler window so the logos open more slowly
    const eC = tC<0.5 ? 2*tC*tC : 1-Math.pow(-2*tC+2,2)/2;    // easeInOut regroup
    const lift=tC*-20;                                        // state-2 portrait lift (arc follows so it stays concentric)
    // word swap: old word pops OUT (shrink + lift + fade), new word BOUNCES in to replace it (back-ease overshoot)
    const eiC=x=>x*x*x;                                       // ease-in (exit)
    const backO=x=>1+2.70158*Math.pow(x-1,3)+1.70158*Math.pow(x-1,2);  // back ease-out (bounce in) — forward only
    const easeO=x=>1-(1-x)*(1-x);                             // plain ease-out (no overshoot) — used on reverse so DESIGN->JAWAD is clean
    const enterEase = heroDir<0 ? easeO : backO;
    const outP=_cl(tC/0.42,0,1), inP=_cl((tC-0.40)/0.60,0,1);
    const eX=eiC(outP), bN=inP>0?enterEase(inP):0;
    const w1=loaderEl.querySelector('#e-w1'), w1b=loaderEl.querySelector('#e-w1b');
    if(w1){ w1.style.opacity=(1-eX).toFixed(3); w1.style.transform='translate(-50%,-50%) translateY('+(-30*eX).toFixed(1)+'px) scale('+(1-0.5*eX).toFixed(3)+')'; }
    if(w1b){ w1b.style.opacity=_cl(inP*1.5,0,1).toFixed(3); w1b.style.transform='translate(-50%,-50%) scale('+(0.32+0.68*bN).toFixed(3)+')'; }
    const im=loaderEl.querySelector('#e-im'), im2=loaderEl.querySelector('#e-im2');
    if(im) im.style.opacity=(1-eX).toFixed(3);
    if(im2){ im2.style.opacity=_cl(inP*1.5,0,1).toFixed(3); im2.style.transform='translateX(-50%) scale('+(0.42+0.58*bN).toFixed(3)+')'; }
    applyRing();                                              // centred portrait + tilt + state-2 lift
    // logos: EMERGE from behind the portrait (radius 0 -> Ro, no fade — hidden behind the head until they clear it),
    // spin one revolution, then regroup into a symmetric, evenly-balanced arc further out from the circle (5 each side)
    const Rarc=Math.min(pr+94,(Hh*0.5-30)/0.92), Ro=Rarc+8;   // clamp to viewport so no logo clips off-screen
    const rightBase=[-72,-36,0,36,72],  leftBase=[252,216,180,144,108];   // even orbit spread (10 around)
    const rightArc =[-64,-27,0,27,64],  leftArc =[244,207,180,153,116];   // even VERTICAL spacing, balanced (mirror)
    const emergeP=_cl((hp-0.03)/0.25,0,1);
    const emE=1-Math.pow(1-emergeP,3);                        // easeOut emerge
    const orbT=_cl((hp-0.05)/0.59,0,1);
    const orbRot=orbT*2.0*Math.PI;                            // ~1 full revolution -> lands at base just as regroup starts
    const spin=idleSpin;                                      // slow, always-on ambient rotation on the 2D stage
    const D2R=Math.PI/180;
    loaderEl.querySelectorAll('.e-hlogo').forEach(el=>{
      const side=el.dataset.side, j=+el.dataset.j;
      const baseA=((side==='left'?leftBase[j]:rightBase[j])||0)*D2R;
      const arcA =((side==='left'?leftArc[j]:rightArc[j])||0)*D2R;
      const spinAng=baseA+orbRot+spin;                        // state-1 spinning + ambient drift
      const ang=spinAng*(1-eC)+(arcA+2*Math.PI)*eC;     // settled arc is a STABLE, symmetric arrangement (no resting spin)
      const R=(Ro*emE)*(1-eC)+Rarc*eC;                       // emerge from behind the head, then settle to arc radius
      const x=cx+R*Math.cos(ang), y=cy+lift+R*Math.sin(ang);
      el.style.left=x.toFixed(1)+'px'; el.style.top=y.toFixed(1)+'px';
      el.style.opacity='1';
      el.style.setProperty('--sc', (0.7+0.3*emE).toFixed(3));
    });
  }
  function animateHeroTo(target){
    heroDir = target<heroHP ? -1 : 1;
    const myId=++heroAnimId; heroAnimating=true;          // supersede any in-flight hero animation (prevents two loops fighting over heroHP -> jitter)
    const start=heroHP, t0=performance.now(), dur=1950, eo=x=>1-Math.pow(1-x,3);
    (function step(){
      if(myId!==heroAnimId) return;                       // a newer animation took over
      const x=Math.min(1,(performance.now()-t0)/dur);
      heroHP=start+(target-start)*eo(x); renderHero(heroHP); updateCue();
      if(x<1) setTimeout(step,16); else { heroHP=target; renderHero(heroHP); updateCue(); if(myId===heroAnimId) heroAnimating=false; }
    })();
  }
  function updateCue(){ const c=loaderEl&&loaderEl.querySelector('#e-cue'); if(c) c.textContent = heroHP>0.985?'scroll again to enter \u2193':'scroll \u2193'; }
  /* slow, perpetual orbit of the logos once the canvas-frame (state 2) is reached; setTimeout-driven (rAF can be throttled in embedded frames) */
  function startIdleSpin(){
    if(idleSpinTimer) return;
    idleSpinLast=performance.now();
    (function tick(){
      idleSpinTimer=setTimeout(tick,33);
      if(!loaderEl || loaderEl.classList.contains('gone') || loaderEl.style.display==='none'){ stopIdleSpin(); return; }
      const now=performance.now(), dt=Math.min(0.1,(now-idleSpinLast)/1000); idleSpinLast=now;
      if(!heroAnimating){ idleSpin += dt*0.13; if(heroHP>0.06) renderHero(heroHP); }  // ambient orbit only at rest; the animation owns motion during a transition
    })();
  }
  function stopIdleSpin(){ if(idleSpinTimer){ clearTimeout(idleSpinTimer); idleSpinTimer=null; } }
  // setTimeout-driven tween — reliable in embedded frames where rAF / CSS animations are paused
  function introTween(dur, onUpdate, onDone){
    const t0=performance.now();
    (function tick(){
      if(!introActive) return;
      const x=Math.min(1,(performance.now()-t0)/dur);
      onUpdate(x);
      if(x<1) setTimeout(tick,16); else if(onDone) onDone();
    })();
  }
  function maybeIntro(){
    if(introPlayed) return;
    if(!built || !loaderEl || !spatial()) return;
    introPlayed=true;
    showLoader();
  }
  function showLoader(){
    if(!loaderEl) return;
    introActive=true;
    loaderEl.style.display='flex';
    loaderEl.classList.remove('gone');
    viewport.style.overflow='hidden';
    heroHP=0; renderHero(0); updateCue();
    startIdleSpin();                                  // logos slowly rotate on the 2D stage from the start
    if(!loaderWheel){
      let ty=0;
      loaderWheel=(e)=>{ if(e&&e.cancelable) e.preventDefault();
        let dy=e.deltaY||0;
        if(e.type==='touchmove' && e.touches && e.touches[0]){ dy=ty-e.touches[0].clientY; ty=e.touches[0].clientY; }
        const prev=heroHP;
        heroAnimId++; heroAnimating=false;          // scroll input supersedes any in-flight click animation
        heroDir = dy<0 ? -1 : 1;
        heroHP=Math.max(0,Math.min(1, heroHP + dy*0.00098));
        renderHero(heroHP); updateCue();
        if(heroHP>=1 && prev<1){ heroEndAt=performance.now(); startIdleSpin(); }   // reached the end -> arm + begin slow orbit
        else if(heroHP>=1 && dy>0 && heroEndAt && (performance.now()-heroEndAt)>500){ dismissLoader(); }   // a separate, deliberate scroll enters the canvas
      };
      loaderEl.addEventListener('wheel', loaderWheel, {passive:false});
      loaderEl.addEventListener('touchstart', e=>{ if(e.touches&&e.touches[0]) ty=e.touches[0].clientY; }, {passive:true});
      loaderEl.addEventListener('touchmove', loaderWheel, {passive:false});
    }
    const hero2=loaderEl.querySelector('#e-hero2'), grid=loaderEl.querySelector('.e-loader-grid'), cue=loaderEl.querySelector('#e-cue');
    const back=x=>{ const c1=1.70158,c3=c1+1; return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2); };
    const eo=x=>1-Math.pow(1-x,3);
    if(grid) grid.style.opacity='0';
    if(cue) cue.style.opacity='0';
    if(hero2){ hero2.style.opacity='0'; hero2.style.transform='scale(.86)'; }
    introTween(540, x=>{ if(hero2){ hero2.style.opacity=Math.min(1,x*1.5).toFixed(3); hero2.style.transform='scale('+back(x).toFixed(3)+')'; } });
    setTimeout(()=>{ if(!introActive) return; introTween(460, x=>{ const v=eo(x).toFixed(3); if(grid)grid.style.opacity=v; if(cue)cue.style.opacity=v; }); }, 340);
  }
    function dismissLoader(){
    if(!loaderEl) return;
    introActive=false;                            // stops any running pop tween
    stopIdleSpin();
    if(loaderWheel){ loaderEl.removeEventListener('wheel', loaderWheel); loaderEl.removeEventListener('touchmove', loaderWheel); loaderWheel=null; }
    loaderEl.classList.add('gone');               // CSS fades + scales the loader out
    setTimeout(()=>{ if(loaderEl) loaderEl.style.display='none'; }, 620);
    viewport.style.overflow='';                   // unlock the canvas
    pos=target=0; viewport.scrollTop=0; applyFromProgress(0);
    settled=true; expandActive(0);                // ease the opening panel in (lift + reveal) instead of a hard cut
  }
  function placePanels(){
    pts=layout(PATH);
    // normalise so min is positive margin
    const minX=Math.min(...pts.map(p=>p.x)), minY=Math.min(...pts.map(p=>p.y));
    const off={x:700-minX, y:420-minY};
    pts=pts.map(p=>({x:p.x+off.x,y:p.y+off.y}));
    const panels=world.querySelectorAll(':scope > .e-panel');
    panels.forEach((el,i)=>{ el.style.left=pts[i].x+'px'; el.style.top=pts[i].y+'px'; });
    // bookends (hero + footer) fill top→bottom as tall right-side columns when spatial
    const vhFill=(viewport.clientHeight||720)-72;
    panels.forEach((el,i)=>{ const sid=SECTIONS[i]&&SECTIONS[i].id;
      if(sid==='hero'||sid==='footer'){ el.style.height = spatial()? vhFill+'px' : ''; }
    });
    // curved spine through the points (Catmull-Rom)
    const d=splineD(pts);
    // the VISIBLE route starts at Work (pts[1]) so the painted line never cuts across the hero wordmark;
    // the camera path (e-trav) keeps the full spline incl. the hero so the camera still lands on it.
    const dVis=splineD(pts.slice(1));
    wires.innerHTML=`<path class="e-spine" d="${dVis}"></path><path class="e-trav" d="${d}"></path>`;
    travPath=wires.querySelector('.e-trav');
    try{ travLen=travPath.getTotalLength(); }catch(_){ travLen=0; }
    if(travLen>0){ travPath.style.strokeDasharray=travLen; travPath.style.strokeDashoffset=travLen; }
    computePanelLens();
    drawPathArrows();
    // track height for scroll length
    const vh=viewport.clientHeight||640;
    track.style.height=(vh*(PATH==='horizontal'?SECTIONS.length+2:SECTIONS.length))+'px';
    // spatial-map nav: draw the camera path in miniature with a node per panel
    buildNav();
    // keep the inertia integrator in sync with the real scroll position after any relayout
    pos=target=viewport.scrollTop;
    if(spatial() && !introActive) applyFromProgress(currentProgress()); // intro owns the camera while it plays; stack uses the CSS fallback
  }

  /* ---------- spatial-map nav (mini curve + nodes) ---------- */
  function buildNav(){
    if(!navMap) return;
    const n=pts.length; if(n<2){ navMap.innerHTML=''; return; }
    const W=300, H=46, padX=18, padY=10;
    const xs=pts.map(p=>p.x), ys=pts.map(p=>p.y);
    const minx=Math.min(...xs), maxx=Math.max(...xs), miny=Math.min(...ys), maxy=Math.max(...ys);
    const spanx=Math.max(1,maxx-minx), spany=Math.max(1,maxy-miny);
    const NP=pts.map(p=>({ x: padX + (p.x-minx)/spanx*(W-2*padX),
                           y: padY + (1-(p.y-miny)/spany)*(H-2*padY) }));
    navPts=NP;
    const d=splineD(NP);
    const hits=NP.map((p,i)=>`<circle class="e-nav-hit" data-i="${i}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="12"></circle>`).join('');
    const dots=NP.map((p,i)=>`<circle class="e-nav-node" data-i="${i}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3"></circle>`).join('');
    navMap.innerHTML=`<div class="e-nav-plot" style="width:${W}px;height:${H}px;">
      <svg class="e-nav-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">
        <path class="e-nav-base" d="${d}"></path>
        <path class="e-nav-trav" d="${d}"></path>
        ${dots}${hits}
        <circle class="e-nav-comet" r="2.6" cx="${NP[0].x.toFixed(1)}" cy="${NP[0].y.toFixed(1)}"></circle>
      </svg>
      <div class="e-nav-label"></div>
    </div>`;
    navTravEl=navMap.querySelector('.e-nav-trav');
    navCometEl=navMap.querySelector('.e-nav-comet');
    navLabelEl=navMap.querySelector('.e-nav-label');
    try{ navTravLen=navTravEl.getTotalLength(); }catch(_){ navTravLen=0; }
    if(navTravLen>0){ navTravEl.style.strokeDasharray=navTravLen; navTravEl.style.strokeDashoffset=navTravLen; }
    navRebuildSubs.forEach(f=>{ try{ f(); }catch(_){} });   // tell the shell navbar to re-pull geometry
  }
  function updateNav(pt,p){
    const frac = (pt.frac!=null?pt.frac:p);
    navLastFrac=frac; navLastIdx=pt.idx;
    navSubs.forEach(f=>{ try{ f({frac, idx:pt.idx}); }catch(_){} });   // drive the shell navbar strip
    if(!navTravEl||!navPts) return;
    if(navTravLen>0) navTravEl.style.strokeDashoffset=((1-frac)*navTravLen).toFixed(1);
    if(navCometEl && navTravLen>0){ const cp=navTravEl.getPointAtLength(frac*navTravLen);
      navCometEl.setAttribute('cx',cp.x.toFixed(1)); navCometEl.setAttribute('cy',cp.y.toFixed(1)); }
    navMap.querySelectorAll('.e-nav-node').forEach((c,i)=>c.classList.toggle('on',i===pt.idx));
    if(navLabelEl && navPts[pt.idx]){
      const tag=SECTIONS[pt.idx]?SECTIONS[pt.idx].tag:'';
      if(navLabelEl.textContent!==tag) navLabelEl.textContent=tag;
      const lx=Math.max(26,Math.min(300-26,navPts[pt.idx].x));
      navLabelEl.style.left=lx+'px'; navLabelEl.style.top=(navPts[pt.idx].y-6)+'px';
      navLabelEl.classList.add('show');
    }
  }
  function currentProgress(){
    const max=track.scrollHeight? (viewport.scrollHeight-viewport.clientHeight):0;
    return max>0 ? Math.min(1,Math.max(0, viewport.scrollTop/max)) : 0;
  }
  function pathPoint(p){
    const n=pts.length, seg=n-1;
    if(seg<1) return {x:pts[0].x,y:pts[0].y,idx:0,frac:0};
    let t=p*seg; const i=Math.min(seg-1,Math.floor(t)); let f=t-i;
    f=segEase(f, EASE);
    if(travPath && travLen>0 && panelLen.length===n){
      const dist=panelLen[i]+(panelLen[i+1]-panelLen[i])*f;
      const pt=travPath.getPointAtLength(dist);
      return {x:pt.x,y:pt.y, idx:Math.round(p*seg), frac:dist/travLen};
    }
    const a=pts[i], b=pts[i+1];
    return {x:a.x+(b.x-a.x)*f, y:a.y+(b.y-a.y)*f, idx:Math.round(p*seg), frac:(i+f)/seg};
  }
  let camX=0,camY=0;
  let curEff=scale, idleX=0, idleY=0, idleAmp=0, idleRAF=null, lastInputT=0;
  const IDLE_AMP=7;   // living-canvas idle drift amplitude (px)
  function writeWorld(){ world.style.transform=`translate(${(camX+idleX).toFixed(1)}px,${(camY+idleY).toFixed(1)}px) scale(${curEff})`; }
  function idleBreath(now){
    idleRAF=requestAnimationFrame(idleBreath);
    if(!spatial() || mqReduce.matches){ if(idleX||idleY){ idleX=idleY=0; writeWorld(); } return; }
    const still = (performance.now()-lastInputT>220) && !settling;   // breathe only when scroll is at rest
    idleAmp += ((still?1:0)-idleAmp)*0.05;                          // ease amplitude in/out
    const t=now/1000;
    idleX=Math.sin(t*0.85)*IDLE_AMP*idleAmp;
    idleY=Math.cos(t*0.62)*IDLE_AMP*0.7*idleAmp;
    writeWorld();
  }
  function centerOn(px,py,biasX,eff){
    eff=eff||scale;
    const vw=world.clientWidth, vh=viewport.clientHeight;
    camX=vw/2 + (biasX||0) - px*eff; camY=vh/2 - py*eff; curEff=eff;
    writeWorld();
  }
  function applyFromProgress(p){
    const pt=pathPoint(p);
    // only the FOOTER is a bookend now (hero lives in the loader, not the canvas)
    const seg=SECTIONS.length-1;
    const footerT = 0; // footer removed — Contact centres like a normal panel (no right-bias bookend)
    const fS=smooth(footerT);
    const vwB = viewport.clientWidth||1200;            // footer fills the right side as you reach the end
    const eff = scale;
    const biasX = fS*(vwB/2 - 56 - 210);
    if(blackout){ const slabT = seg>0 ? Math.max(0, Math.min(1, p*seg-(seg-1))) : 0; blackout.style.opacity=(smooth(slabT)*0.8).toFixed(3); }   // the whole canvas darkens toward the Contact slab
    centerOn(pt.x,pt.y,biasX,eff);
    progressBar.style.width=(p*100)+'%';
    if(travPath && travLen>0) travPath.style.strokeDashoffset=(1-(pt.frac!=null?pt.frac:p))*travLen;
    // ---- depth + parallax: panels drift / scale / fade by their z; focused panel resolves crisp ----
    const fx=pt.x, fy=pt.y, reduce=mqReduce.matches;
    const PARF = reduce ? 0 : 0.45;   // parallax strength pushed harder — moving through the canvas reads as moving through space
    const RANGE = 820;
    world.querySelectorAll(':scope > .e-panel').forEach((el,i)=>{
      const active = (i===pt.idx);
      el.classList.toggle('is-active', active);
      if(!(SECTIONS[i]&&SECTIONS[i].id==='contact')) el.classList.remove('e-on-dark');   // keep the dark slab dark; strip elsewhere
      const z = (DEPTH[i]!=null?DEPTH[i]:1);
      const px=(pts[i]?pts[i].x:fx), py=(pts[i]?pts[i].y:fy);
      const dx=px-fx, dy=py-fy, dist=Math.hypot(dx,dy);
      let pr=Math.max(0,Math.min(1,1-dist/RANGE)); pr=pr*pr*(3-2*pr);   // smoothstep proximity
      /* ribbon phases fill one-per-second via the .ribbon-play class added on settle (see expandActive) */
      const tx=dx*(z-1)*PARF, ty=dy*(z-1)*PARF;                          // nearer (z>1) drift more
      const sf=0.58+(z-0.6)*0.55, of=0.40+(z-0.6)*0.5;                   // WIDER depth: far panels noticeably smaller/fainter
      const sc=sf+(SETTLE_SCALE-sf)*pr;                                  // -> full at focus
      const op=of+(1-of)*pr;                                            // -> opaque at focus
      // ENTER REVEAL: arm on full exit, fire as the panel approaches focus (once per visit)
      if(!reduce){
        if(pr>0.55 && el.dataset.rev!=='1'){ el.dataset.rev='1'; el.classList.remove('e-reveal-pending'); }
        else if(pr<0.05 && el.dataset.rev==='1'){ el.dataset.rev=''; el.classList.add('e-reveal-pending'); }
      } else if(el.classList.contains('e-reveal-pending')) el.classList.remove('e-reveal-pending');
      // while a panel is settled, the lift+tilt pose owns its transform — don't clobber it here
      if(!(settled && i===settledIdx)){
        el.__base=`translate(-50%,-50%) translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${(active?SETTLE_SCALE:sc).toFixed(3)})`;
        el.style.transform=el.__base+tiltSuffix(el);
      }
      el.style.opacity=(active?1:op).toFixed(3);
      el.style.zIndex=Math.round(z*10 + pr*12 + (active?20:0));
    });
    updateNav(pt,p);
  }

  /* ---------- subtle cursor-tilt + refined glare on every canvas panel (gentler than the hero portrait) ---------- */
  let panelTiltRAF=null, ptMouse=null, panelTiltWired=false;
  function tiltSuffix(el){ const rx=el.__rx||0, ry=el.__ry||0; if(Math.abs(rx)<0.02&&Math.abs(ry)<0.02) return ''; return ` perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`; }
  function initPanelTilt(){
    if(!document.getElementById('__panelfx')){
      const st=document.createElement('style'); st.id='__panelfx';
      st.textContent='.e-panel-glare{position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none;z-index:7;opacity:0;transition:opacity .35s ease;}'+
        '.e-panel-glare::before{content:"";position:absolute;inset:-25%;background:radial-gradient(38% 34% at var(--gx,50%) var(--gy,28%), rgba(255,255,255,.42), rgba(255,255,255,.06) 46%, transparent 72%);mix-blend-mode:soft-light;}';
      (document.head||document.documentElement).appendChild(st);
    }
    world.querySelectorAll(':scope > .e-panel').forEach(p=>{ if(!p.querySelector(':scope > .e-panel-glare')){ const g=document.createElement('span'); g.className='e-panel-glare'; p.appendChild(g); } });
    if(panelTiltWired) return; panelTiltWired=true;
    viewport.addEventListener('pointermove', e=>{ ptMouse={x:e.clientX,y:e.clientY}; kickPanelTilt(); }, {passive:true});
    viewport.addEventListener('pointerleave', ()=>{ ptMouse=null; kickPanelTilt(); });
  }
  function kickPanelTilt(){ if(panelTiltRAF==null) panelTiltRAF=setTimeout(panelTiltStep,16); }
  function panelTiltStep(){
    panelTiltRAF=null;
    const MAX=5.5;                                  // subtle — the hero portrait tilts ~15°
    const loaderVisible = loaderEl && loaderEl.style.display!=='none';
    let alive=false;
    world.querySelectorAll(':scope > .e-panel').forEach(p=>{
      if(p.classList.contains('e-billboard')) return;   // billboard is dead-straight — no tilt/glare
      let trx=0, try_=0, gx=50, gy=28, ga=0;
      if(ptMouse && !loaderVisible){
        const r=p.getBoundingClientRect();
        if(r.width && r.height){
          const nx=(ptMouse.x-(r.left+r.width/2))/(r.width/2);
          const ny=(ptMouse.y-(r.top+r.height/2))/(r.height/2);
          const reach=Math.hypot(nx,ny);
          const fall = reach<=1 ? 1 : Math.max(0, 1-(reach-1)/1.3);   // only panels near the cursor tilt
          const cnx=Math.max(-1,Math.min(1,nx)), cny=Math.max(-1,Math.min(1,ny));
          try_ = cnx*MAX*fall;          // rotateY follows horizontal cursor offset
          trx  = cny*-MAX*fall;         // rotateX inverse of vertical
          gx = 50 + cnx*32; gy = 30 + cny*30; ga = 0.92*fall;
        }
      }
      p.__rx = (p.__rx||0) + (trx-(p.__rx||0))*0.14;
      p.__ry = (p.__ry||0) + (try_-(p.__ry||0))*0.14;
      if(Math.abs(trx-p.__rx)>0.02 || Math.abs(try_-p.__ry)>0.02) alive=true;
      if(p.__base!=null) p.style.transform = p.__base + tiltSuffix(p);
      const g=p.querySelector(':scope > .e-panel-glare');
      if(g) g.style.opacity=ga.toFixed(3);
      if(g){ g.style.setProperty('--gx',gx.toFixed(1)+'%'); g.style.setProperty('--gy',gy.toFixed(1)+'%'); }
    });
    if(alive || ptMouse) panelTiltRAF=setTimeout(panelTiltStep,16);
  }

  /* ---------- inertia scroll + gentle magnetic settle (no scroll-snap) ----------
     Wheel / scrollbar feed a weighted, continuous integrator (~1.1s ease-out inertia)
     so travel reads smooth and curved. When input goes idle (~120ms) AND the camera has
     come to rest within ~35% of a panel centre, a short (~0.5s) ease-out nudge settles
     onto it; beyond that we leave the reader exactly where they stopped (free-glide).
     ANY new wheel / touch / pointer / key input cancels an in-flight settle instantly. */
  let pos=0, target=0, scrollRAF=null, lastWriteT=0;
  let subActive=false; const PROC_I=2, PROC_SUB=2.45;   // process = one ultra-long ribbon read across TWO camera stops
  let idleTimer=null, settling=false, settleRAF=null;
  const scrollMax=()=>Math.max(0, viewport.scrollHeight-viewport.clientHeight);
  const clampS=(v)=>Math.max(0,Math.min(scrollMax(),v));
  const SMOOTH=0.11;                               // per-frame approach → ~1.1s ease-out inertia
  const SETTLE_DUR=500, GLIDE_DUR=700, SETTLE_ZONE=0.35;

  function writeScroll(v){
    lastWriteT=performance.now();
    viewport.scrollTop=v;                          // echo scroll events are filtered via lastWriteT
    applyFromProgress(currentProgress());
  }
  function cancelInertia(){ if(scrollRAF){ cancelAnimationFrame(scrollRAF); scrollRAF=null; } }
  function cancelSettle(){ settling=false; if(settleRAF){ clearTimeout(settleRAF); cancelAnimationFrame(settleRAF); settleRAF=null; } }
  // external "stop everything" hook (minimap, pg.suspend, media-change)
  function cancelSnap(){ cancelSettle(); cancelInertia(); clearTimeout(idleTimer); clearSettlePose(); }

  function kickInertia(){ if(scrollRAF==null) scrollRAF=requestAnimationFrame(inertiaStep); }
  function inertiaStep(){
    scrollRAF=null;
    if(pgSuspended || !spatial()) return;
    const diff=target-pos;
    if(Math.abs(diff)<0.4){ pos=target; writeScroll(pos); return; }   // at rest
    pos+=diff*SMOOTH;
    writeScroll(pos);
    scrollRAF=requestAnimationFrame(inertiaStep);
  }

  function scheduleIdleSettle(){ clearTimeout(idleTimer); idleTimer=setTimeout(tryMagneticSettle, 120); }
  function tryMagneticSettle(){
    if(pgSuspended || !spatial() || settling) return;
    if(subActive){ const sub=PROC_SUB/(SECTIONS.length-1); if(Math.abs(currentProgress()-sub)<0.05) return; subActive=false; }
    const seg=SECTIONS.length-1, max=scrollMax(); if(seg<1||max<=0) return;
    if(Math.abs(target-pos)>1.2){ scheduleIdleSettle(); return; }     // let inertia finish gliding first
    const p=(pos/max)*seg;                                            // progress in panel units
    const idx=Math.round(p), dist=Math.abs(p-idx);                   // 0 .. 0.5 from nearest panel
    if(dist>SETTLE_ZONE){ settled=false; return; }                   // free-glide — leave them put
    settleTo((idx/seg)*max, idx);
  }
  function settleTo(dest, idx){
    dest=clampS(dest);
    if(!spatial()){ pos=target=dest; settled=true; expandActive(idx); return; }
    cancelInertia(); cancelSettle();
    settling=true;
    const start=pos, distp=dest-start, t0=performance.now();
    const dur=Math.max(420, Math.min(720, 380+Math.abs(distp)*0.6));   // distance-aware, gentle landing
    const ease=x=> x<0.5 ? 4*x*x*x : 1-Math.pow(-2*x+2,3)/2;           // easeInOutCubic — smooth in AND out
    (function step(){ if(!settling) return;                            // any input flips settling=false
      const x=Math.min(1,(performance.now()-t0)/dur), e=ease(x);
      pos=start+distp*e; target=pos; writeScroll(pos);
      if(x<1) settleRAF=setTimeout(step,16);                           // setTimeout: stays smooth even where rAF is throttled
      else { settling=false; settled=true; expandActive(idx); }
    })();
  }

  // wheel / trackpad → feed the weighted inertia integrator (continuous, no paging)
  viewport.addEventListener('wheel',e=>{
    if(!spatial() || introActive) return;
    lastInputT=performance.now();
    if(mqReduce.matches){ cancelSettle(); settled=false; clearSettlePose(); collapseAll(); return; } // reduced-motion: native 1:1 scroll, no inertia
    e.preventDefault();
    cancelSettle();                                                  // new input cancels any settle
    settled=false; clearSettlePose(); collapseAll();
    const dom = Math.abs(e.deltaY)>=Math.abs(e.deltaX)? e.deltaY : e.deltaX;
    let d=dom; if(e.deltaMode===1) d*=16; else if(e.deltaMode===2) d*=viewport.clientHeight; // lines/pages → px
    target=clampS(target + d);
    kickInertia();
    scheduleIdleSettle();
  },{passive:false});

  // native scroll (scrollbar drag / OS momentum): sync state, render, settle when idle
  viewport.addEventListener('scroll',()=>{
    if(pgSuspended || !spatial() || introActive) return;
    lastInputT=performance.now();
    if(performance.now()-lastWriteT < 80) return;                    // ignore echoes of our own writes
    if(mqReduce.matches){ pos=target=viewport.scrollTop; settled=false; clearSettlePose(); collapseAll(); applyFromProgress(currentProgress()); scheduleIdleSettle(); return; } // reduced-motion: track 1:1, settle (preview+tilt) fires instantly when idle
    cancelSettle(); cancelInertia();
    pos=target=viewport.scrollTop;
    settled=false; clearSettlePose(); collapseAll();
    applyFromProgress(currentProgress());
    scheduleIdleSettle();
  });
  // touch / pointer contact cancels an in-flight settle instantly
  const breakSettle=()=>{ cancelSettle(); };
  viewport.addEventListener('touchstart',breakSettle,{passive:true});
  viewport.addEventListener('pointerdown',breakSettle,{passive:true});

  // ---------- smooth glide to a specific panel (keyboard · minimap) ----------
  function glideTo(i){
    const seg=SECTIONS.length-1, max=scrollMax();
    const t=Math.max(0,Math.min(seg,i)), dest=clampS((t/seg)*max);
    clearTimeout(idleTimer);
    if(!spatial()){ pos=target=dest; settled=true; expandActive(t); return; }
    cancelInertia(); cancelSettle();
    settling=true;
    const start=pos, distp=dest-start, t0=performance.now();
    const dur=Math.max(460, Math.min(820, 420+Math.abs(distp)*0.5));
    const easeInOut=x=> x<0.5 ? 4*x*x*x : 1-Math.pow(-2*x+2,3)/2;    // easeInOutCubic
    (function step(){ if(!settling) return;
      const x=Math.min(1,(performance.now()-t0)/dur), e=easeInOut(x);
      pos=start+distp*e; target=pos; writeScroll(pos);
      if(x<1) settleRAF=setTimeout(step,16);
      else { settling=false; settled=true; expandActive(t); }
    })();
  }
  function gotoPanel(i){ cancelSnap(); glideTo(Math.max(0,Math.min(SECTIONS.length-1,i))); }
  function currentIdx(){ return Math.round(currentProgress()*(SECTIONS.length-1)); }
  // right-click steps through the process ribbon's second stop before moving on; left-click rewinds it
  function navFwd(){ const i=currentIdx(); if(i>=SECTIONS.length-1){ loopToHero(); return; } gotoPanel(i+1); }
  function loopToHero(){            // Contact is the terminal panel — advancing past it returns to the hero (the bookend close)
    if(mqReduce.matches){ try{ pos=target=0; viewport.scrollTop=0; applyFromProgress(0); }catch(_){ } if(loaderEl){ introPlayed=true; showLoader(); } return; }
    gotoPanel(0);                                   // glide the whole wall back to the start
    setTimeout(()=>{ if(loaderEl){ introPlayed=true; showLoader(); } }, 1300);   // then replay the hero intro
  }
  function navBack(){ gotoPanel(currentIdx()-1); }
  section.addEventListener('keydown',e=>{
    if(!spatial() || introActive) return;            // stack mode uses native scroll/Tab; intro owns the camera
    if(e.target.closest('.e-minimap')) return;       // let nav controls handle their own keys
    const k=e.key;
    if(k==='ArrowDown'||k==='ArrowRight'||k==='PageDown'){ e.preventDefault(); navFwd(); }
    else if(k==='ArrowUp'||k==='ArrowLeft'||k==='PageUp'){ e.preventDefault(); navBack(); }
    else if(k==='Home'){ e.preventDefault(); gotoPanel(0); }
    else if(k==='End'){ e.preventDefault(); gotoPanel(SECTIONS.length-1); }
  });

  // minimap node click -> glide to section
  minimap.addEventListener('click',e=>{ const d=e.target.closest('.e-nav-node,.e-nav-hit'); if(!d || introActive) return;
    cancelSnap(); glideTo(+d.dataset.i);
  });

  /* (Free-roam / playground removed — Tour camera-on-path is the only mode.) */

  /* ---------- open / close nested canvases (About, Trust) ---------- */
  world.addEventListener('click',e=>{
    if(e.target.closest('.e-panel[data-route]')) return;   // route panels open a page (wired by the shell)
    const op=e.target.closest('.e-panel.openable');
    if(op){ openDetail(op.dataset.open, op); return; }
    // clicking an expanded preview opens its destination via the panel's primary CTA
    const pv=e.target.closest('.e-preview');
    if(pv){ const c=pv.closest('.e-panel').querySelector('.e-cta'); if(c && c!==e.target && !pv.contains(c)) c.click(); }
  });
  /* click anywhere on the canvas (not on an interactive element) -> advance forward one panel */
  /* click anywhere on the canvas (not on an interactive element) -> go BACK one panel (left-click = back) */
  stage.addEventListener('click',e=>{
    if(loaderEl && loaderEl.style.display!=='none') return;                     // hero stage visible/fading -> it owns its clicks
    if(detail.classList.contains('open')) return;                              // nested canvas open
    if(e.target.closest('.e-minimap,.e-detail,.e-hint,.e-progress,.e-cta,.e-foot-nav span,.e-socdot,.e-panel.openable,.e-panel[data-route],.e-preview,.e-dctrls,a,button')) return;
    navBack();
  });
  /* right-click anywhere on the canvas -> go FORWARD one panel (suppresses the context menu) */
  stage.addEventListener('contextmenu',e=>{
    if(loaderEl && loaderEl.style.display!=='none') return;                     // hero stage visible/fading -> leave it alone
    if(detail.classList.contains('open')) return;                              // nested canvas open
    if(e.target.closest('.e-minimap,.e-detail,.e-dctrls,a,button')) return;     // let real controls keep their menu
    e.preventDefault();
    navFwd();
  });
  function expandActive(idx){
    if(!spatial()) return;
    // resolve the settled panel by INDEX (robust against is-active class timing races)
    if(idx==null) idx=Math.round(currentProgress()*(SECTIONS.length-1));
    settledIdx=idx;
    const a=world.querySelector(`.e-panel[data-i="${idx}"]`);
    world.querySelectorAll('.e-panel.e-ribbon-panel').forEach(rp=>rp.classList.toggle('ribbon-play', rp===a));
    world.querySelectorAll('.e-panel.is-expanded').forEach(p=>{ if(p!==a) p.classList.remove('is-expanded'); });
    if(a){
      if(a.querySelector('.e-preview')){
        const dwell = spatial() ? (parseInt(a.dataset.dwell,10)||0) : 0;   // give the panel its solo beat first
        clearTimeout(a.__dwellT);
        a.__dwellT=setTimeout(()=>{ if(!settled || settledIdx!=+a.dataset.i) return;
          const bloom=()=>{ if(!settled || settledIdx!=+a.dataset.i) return; a.classList.add('is-expanded'); mountPreview(a); countUp(a); };
          if(a.dataset.merge){ a.classList.add('svc-merged'); if(spatial()){ setTimeout(bloom,1000); } else bloom(); }
          else bloom();
        }, dwell);
      }
      startSettlePose(a);                 // lift, then lean back as the preview opens
    }
  }
  function countUp(scope){
    scope.querySelectorAll('[data-count]').forEach(el=>{
      if(el.__counted) return; el.__counted=true;
      const to=parseInt(el.dataset.count,10)||0, dur=900, t0=performance.now();
      (function tick(){ const x=Math.min(1,(performance.now()-t0)/dur), e=1-Math.pow(1-x,3);
        el.textContent=Math.round(to*e); if(x<1) setTimeout(tick,40); else el.textContent=to; })();
    });
  }
  function collapseAll(){ clearSettlePose(); world.querySelectorAll('.e-panel.is-expanded').forEach(p=>p.classList.remove('is-expanded')); }

  /* ---------- settle pose: the active panel centres, lifts, then tilts back (depth) ---------- */
  let poseRAF=null;
  function clearSettlePose(){ if(poseRAF){ clearTimeout(poseRAF); cancelAnimationFrame(poseRAF); poseRAF=null; } }
  function startSettlePose(a){
    clearSettlePose(); if(!a) return;
    const hasPv=!!a.querySelector('.e-preview');
    const t0=performance.now(), dur=hasPv?660:430;
    (function step(){ const x=Math.min(1,(performance.now()-t0)/dur); applySettlePose(a,x,hasPv);
      if(x<1) poseRAF=setTimeout(step,16); })();   // setTimeout so the lift eases smoothly everywhere
  }
  function smooth(v){ v=Math.max(0,Math.min(1,v)); return v*v*(3-2*v); }
  function applySettlePose(a, x, hasPv){
    const easeOut=1-Math.pow(1-x,3);
    const lift = (hasPv?-186:-13)*smooth(x/0.55);          // lift ~half the preview height so panel+preview center as one block
    const tilt = (hasPv?7.5:2.6)*smooth((x-0.32)/0.68);     // then lean back as preview opens
    const sc = SETTLE_SCALE + 0.04*easeOut;
    a.__base=`translate(-50%,-50%) perspective(1200px) translateY(${lift.toFixed(1)}px) rotateX(${tilt.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
    a.style.transform=a.__base+tiltSuffix(a);
  }

  /* ---------- live, scaled, non-interactive preview = a real screenshot of the page ---------- */
  const PV_FS_CSS = `html,body{overflow:hidden!important;background:#f4f3f0!important;margin:0!important;}
    .topbar,.legend,.tabs,.dir-head,.view-cap,.annot,.m-col,.e-annot,.tk-hint,#tweaks-root{display:none!important;}
    .pill{display:none!important;}
    .canvas{padding:0!important;margin:0!important;max-width:none!important;}
    .direction:not(.active){display:none!important;}
    .direction{margin:0!important;padding:0!important;}
    .band,.svc-bandrow,.slug-band{display:block!important;padding:0!important;margin:0!important;border:none!important;}
    .d-col{width:100%!important;margin:0!important;}
    .frame.desktop{width:1280px!important;height:800px!important;max-width:none!important;border:none!important;border-radius:0!important;margin:0!important;box-shadow:none!important;}
    .frame.desktop .chrome{display:none!important;}
    .frame.desktop .screen{height:800px!important;min-height:0!important;padding:0!important;}
    .svc-screen.no-scroll,.slug-screen.no-scroll,.wb{height:800px!important;}`;
  const PV_W=1280, PV_H=800;
  function mountPreview(panel){
    if(panel.dataset.pvdetail) return mountDetailPreview(panel);
    const src=panel.dataset.pvsrc; if(!src) return;
    const frame=panel.querySelector('.e-prevframe'); if(!frame || frame.dataset.pvMounted) return;
    frame.dataset.pvMounted='1';
    const fw=frame.clientWidth||360, fit=fw/PV_W, z=parseFloat(panel.dataset.pvzoom)||1, s=fit*z;
    const CLIP=Math.min(Math.round(PV_H*fit), 336);   // show a CENTERED horizontal band of the page, not the top
    const pvtx=-(PV_W*s-fw)/2, pvty=-(PV_H*s-CLIP)/2;   // center the crop on the page centre on BOTH axes
    frame.classList.add('e-pv-live'); frame.innerHTML='';
    frame.style.height=CLIP+'px';
    const port=document.createElement('div'); port.className='e-pv-scaleport'; port.style.height=CLIP+'px';
    const load=document.createElement('div'); load.className='e-pv-loading'; load.textContent='loading preview…';
    const ifr=document.createElement('iframe'); ifr.className='e-pv-iframe'; ifr.setAttribute('tabindex','-1'); ifr.setAttribute('aria-hidden','true'); ifr.setAttribute('scrolling','no');
    ifr.style.width=PV_W+'px'; ifr.style.height=PV_H+'px'; ifr.style.transform='translate('+pvtx.toFixed(1)+'px,'+pvty.toFixed(1)+'px) scale('+s+')';
    ifr.addEventListener('load',()=>stripPreview(ifr, panel.dataset.pvdir||'D', load));
    ifr.src=src;
    port.appendChild(ifr); port.appendChild(load); frame.appendChild(port);
  }
  /* about & trust have no standalone file — render their real nested-canvas markup, scaled, as the preview */
  function mountDetailPreview(panel){
    const id=panel.dataset.pvdetail;
    const frame=panel.querySelector('.e-prevframe'); if(!frame || frame.dataset.pvMounted) return;
    frame.dataset.pvMounted='1';
    const SW=980, SH=600, fw=frame.clientWidth||360, s=fw/SW, h=Math.round(SH*s);
    const CLIP=Math.min(h,336);
    frame.classList.add('e-pv-live'); frame.innerHTML='';
    frame.style.height=CLIP+'px';
    const port=document.createElement('div'); port.className='e-pv-scaleport'; port.style.height=CLIP+'px';
    const stage=document.createElement('div');
    stage.style.cssText='position:absolute;top:'+(-Math.round((h-CLIP)/2))+'px;left:0;width:'+SW+'px;height:'+SH+'px;transform-origin:top left;transform:scale('+s+');pointer-events:none;overflow:hidden;';
    stage.innerHTML=detailFor(id);
    port.appendChild(stage); frame.appendChild(port);
    const dctrls=stage.querySelector('.e-dctrls'); if(dctrls) dctrls.style.display='none';
    const wrap=stage.querySelector('.e-dwrap'); if(wrap){ wrap.style.cursor='default'; wrap.style.position='absolute'; wrap.style.inset='0'; }
    const dw=stage.querySelector('.e-dworld'); if(dw){ dw.style.transform='translate(-50%,-50%) scale(0.84)'; }
  }
  function stripPreview(ifr, dir, load){
    let d; try{ d=ifr.contentDocument; }catch(e){ return; }
    if(!d) return;
    let tries=0;
    (function sel(){
      const t=d.querySelector(`.tab[data-target="${dir}"]`);
      if(t){ if(t.getAttribute('aria-selected')!=='true') t.click(); }
      else if(tries++<40){ return void setTimeout(sel,80); }
      if(!d.getElementById('__pvfs')){ const st=d.createElement('style'); st.id='__pvfs'; st.textContent=PV_FS_CSS; (d.head||d.documentElement).appendChild(st); }
      try{ d.body.style.pointerEvents='none'; }catch(_){}
      // refit each spatial canvas to fill the 1280×800 preview frame, then reveal
      [80,300,640].forEach(t=>setTimeout(()=>{ refitPvCanvas(d); try{ d.defaultView.dispatchEvent(new Event('resize')); }catch(_){} }, t));
      setTimeout(()=>{ ifr.classList.add('ready'); if(load) load.remove(); }, 360);
    })();
  }
  function refitPvCanvas(d){
    d.querySelectorAll('.scase').forEach(sc=>{
      const cv=sc.querySelector('.sc-canvas'); if(!cv||!sc._st||!sc._apply) return;
      const prev=cv.style.transform; cv.style.transform='none';
      const c=cv.getBoundingClientRect(); if(!c.width||!c.height){ cv.style.transform=prev; return; }
      const cx=c.left+c.width/2, cy=c.top+c.height/2; let hw=0,hh=0,any=false;
      cv.querySelectorAll('.sc-panel').forEach(p=>{ any=true; const r=p.getBoundingClientRect();
        hw=Math.max(hw,Math.abs(r.left-cx),Math.abs(r.right-cx)); hh=Math.max(hh,Math.abs(r.top-cy),Math.abs(r.bottom-cy)); });
      cv.style.transform=prev; if(!any||!hw||!hh) return;
      let s=Math.min((c.width*0.9)/(2*hw),(c.height*0.9)/(2*hh)); s=Math.max(0.34,Math.min(1.25,s));
      sc._st.s=s; sc._st.home=s; sc._st.px=0; sc._st.py=0; sc._apply();
    });
  }
  world.addEventListener('keydown',e=>{
    if(e.key!=='Enter' && e.key!==' ') return;
    const p=e.target.closest('.e-panel.openable'); if(!p) return;
    e.preventDefault(); if(p.dataset.route){ p.click(); return; } openDetail(p.dataset.open, p);
  });
  function openDetail(id, panel){
    detailBody.innerHTML = detailFor(id);
    detail.classList.toggle('e-detail-dark', id==='contact');
    const sr=stage.getBoundingClientRect();
    const anchorEl=panel.querySelector('.e-portal-ring,[data-matchcut]')||panel;   // match-cut: pin the zoom origin to the shared constant (portrait / quote), not the panel box
    const pr=anchorEl.getBoundingClientRect();
    detail.style.transformOrigin=`${pr.left+pr.width/2-sr.left}px ${pr.top+pr.height/2-sr.top}px`;
    detail.classList.add('open');
    setTimeout(()=>initDetailCanvas(),0);
  }
  function closeDetail(){ detail.classList.remove('open'); }
  section.querySelector('.e-back').addEventListener('click',closeDetail);
  section.querySelector('.e-close').addEventListener('click',closeDetail);

  function dpanel(o){
    return `<div class="e-panel${o.cls?' '+o.cls:''}" style="left:calc(50% + ${o.x}px);top:calc(50% + ${o.y}px);transform:translate(-50%,-50%);width:${o.w}px;min-height:${o.h}px;">
      ${o.tag?`<span class="e-tag">${o.tag}</span>`:''}<div class="e-title" style="font-size:24px;">${o.title||''}</div>${o.body||''}</div>`;
  }
  function detailFor(id){
    if(id==='about'){
      const orb=(o)=>`<div class="e-panel e-orbit-panel" style="left:calc(50% + ${o.x}px);top:calc(50% + ${o.y}px);--ox:${o.x}px;--oy:${o.y}px;width:${o.w}px;min-height:${o.h}px;">
        ${o.tag?`<span class="e-tag">${o.tag}</span>`:''}<div class="e-title" style="font-size:22px;">${o.title||''}</div>${o.body||''}</div>`;
      const inner=`<div class="e-dworld" id="e-dworld">
        <div class="e-about-core">
          <div class="e-portal-ring e-portal-ring-xl"><img class="e-portal-face" src="assets/jawad-hero.png" alt="Jawad" draggable="false"><span class="e-portal-glare"></span></div>
          <div class="e-title" style="font-size:30px;margin-top:14px;">Jawad</div><span class="e-tag">designer · engineer · 15 · london</span></div>
        ${orb({tag:'WHO',title:'The short version',x:-360,y:-185,w:280,h:128,body:bars(['100%','86%','60%'])})}
        ${orb({tag:'HOW I WORK',title:'One person, start to ship',x:360,y:-185,w:280,h:128,body:bars(['100%','78%'])})}
        ${orb({tag:'BEYOND WORK',title:'Off the clock',x:-360,y:185,w:280,h:128,body:bars(['100%','70%'])})}
        ${orb({tag:'SAY HI',title:'Work with me',x:360,y:185,w:280,h:128,body:cta('→ /contact','primary')})}
      </div>`;
      return chrome('About — me, in the middle', inner);
    }
    if(id==='trust'){
      const sat=(o)=>`<div class="e-panel e-orbit-panel" style="left:calc(50% + ${o.x}px);top:calc(50% + ${o.y}px);--ox:${o.x}px;--oy:${o.y}px;width:${o.w}px;min-height:${o.h}px;">
        ${o.tag?`<span class="e-tag">${o.tag}</span>`:''}<div class="e-title" style="font-size:21px;">${o.title||''}</div>${o.body||''}</div>`;
      const inner=`<div class="e-dworld" id="e-dworld">
        <div class="e-trust-core">
          <div class="e-quote e-quote-sm"><span class="e-qline q1">great skill</span><span class="e-qline q2">great design</span><span class="e-qline q3">great speed</span></div>
          <div class="e-attrib">Joel Jeon · founder, weld</div></div>
        ${sat({tag:'THE TESTIMONIAL',title:'others love me',x:-380,y:-128,w:300,h:140,body:bars(['100%','88%','62%'])})}
        ${sat({tag:'WHO JOEL IS',title:'Founder, weld',x:380,y:-128,w:300,h:140,body:`<span class="e-tag">roblox talent studio</span>${bars(['100%','70%'])}`})}
        ${sat({tag:'THE RESULT',title:'weld, in numbers',x:0,y:212,w:380,h:120,body:`<div class="e-facts" style="justify-content:center;">${fact('signups','200')}${fact('paid','$0')}${fact('trajectory','grew fast')}</div>`})}
      </div>`;
      return chrome('Trust — the proof behind the line', inner);
    }
    if(id==='contact'){
      const field=(label,tall)=>`<div class="e-field${tall?' tall':''}">${label}</div>`;
      const inner=`<div class="e-dworld" id="e-dworld">
        <div class="e-contact-core">
          <div class="e-slab-head" data-matchcut style="font-size:clamp(40px,6vw,68px);">Your move.</div>
          <div class="e-form">
            ${field('your name')}${field('email')}${field('what do you want to build?',true)}
            <div class="e-cta primary" style="align-self:center;margin-top:2px;pointer-events:auto;">Send it ▸</div>
          </div>
          <div class="e-slab-base"><a href="mailto:hijawadjalal@gmail.com">hijawadjalal@gmail.com</a></div>
        </div>
      </div>`;
      return chrome('Contact — your move', inner);
    }
    return '';
  }
  function chrome(title,inner){
    return `<div class="e-dwrap" id="e-dwrap"><div class="e-dctrls"><button data-z="out">–</button><button data-z="home">⊚</button><button data-z="in">+</button></div>${inner}</div>`;
  }
  // pan/zoom for the nested detail canvases
  let dscale=0.82,dx=0,dy=0,ddrag=false,dsx=0,dsy=0,dox=0,doy=0;
  function initDetailCanvas(){
    const wrap=detail.querySelector('#e-dwrap'), dw=detail.querySelector('#e-dworld'); if(!wrap||!dw) return;
    dscale=0.82;dx=0;dy=0; const apply=()=>dw.style.transform=`translate(-50%,-50%) translate(${dx}px,${dy}px) scale(${dscale})`; apply();
    wrap.onpointerdown=e=>{ if(e.target.closest('.e-dctrls')) return; ddrag=true;wrap.classList.add('grabbing');dsx=e.clientX;dsy=e.clientY;dox=dx;doy=dy;try{wrap.setPointerCapture(e.pointerId);}catch(_){}}
    wrap.onpointermove=e=>{ if(!ddrag) return; dx=dox+(e.clientX-dsx);dy=doy+(e.clientY-dsy);apply(); };
    wrap.onpointerup=()=>{ddrag=false;wrap.classList.remove('grabbing');};
    wrap.onwheel=e=>{e.preventDefault();dscale=Math.min(1.5,Math.max(0.4,dscale-e.deltaY*0.0012));apply();};
    wrap.querySelector('.e-dctrls').onclick=e=>{const z=e.target.dataset.z;if(!z)return;if(z==='in')dscale=Math.min(1.5,dscale+0.15);if(z==='out')dscale=Math.max(0.4,dscale-0.15);if(z==='home'){dscale=0.82;dx=0;dy=0;}apply();};
  }

  /* ---------- show/relayout when E tab becomes active ---------- */
  function isActive(){ return section.classList.contains('active'); }
  tabsWrap.addEventListener('click',e=>{ const t=e.target.closest('.tab'); if(!t) return;
    if(t.dataset.target==='E'){ if(!built) build(); else placePanels(); setTimeout(()=>{ if(built) placePanels(); },50); }
  });
  window.addEventListener('resize',()=>{ if(isActive()&&built) placePanels(); });
  // re-evaluate spatial-vs-stack when the OS motion pref or pointer/width changes
  [mqReduce,mqCoarse,mqNarrow].forEach(mq=>{ const h=()=>{ if(built){ cancelSnap&&cancelSnap(); placePanels(); } };
    if(mq.addEventListener) mq.addEventListener('change',h); else if(mq.addListener) mq.addListener(h); });

  /* ---------- public API for Tweaks ---------- */
  window.HOMEE={
    setPath(p){ PATH=p; if(built) placePanels(); },
    setMinimap(v){ MINIMAP=!!v; minimap.classList.toggle('hide',!MINIMAP); },
    setNavStyle(s){ navStyle=(s==='constellation')?'constellation':'spine';
      minimap.classList.toggle('v-constellation',navStyle==='constellation');
      minimap.classList.toggle('v-spine',navStyle==='spine');
      navRebuildSubs.forEach(f=>{ try{ f(); }catch(_){} }); },
    // ---- spatial-map nav data (consumed by the prototype shell navbar) ----
    navData(){ if(!navPts) return null; const W=300,H=46;
      return { nx:navPts.map(p=>p.x/W), ny:navPts.map(p=>p.y/H), tags:SECTIONS.map(s=>s.tag), style:navStyle, frac:navLastFrac, idx:navLastIdx }; },
    navState(){ return { frac:navLastFrac, idx:navLastIdx, style:navStyle }; },
    onNav(fn){ navSubs.push(fn); return ()=>{ navSubs=navSubs.filter(f=>f!==fn); }; },
    onNavRebuild(fn){ navRebuildSubs.push(fn); return ()=>{ navRebuildSubs=navRebuildSubs.filter(f=>f!==fn); }; },
    gotoPanel(i){ try{ gotoPanel(Math.max(0,Math.min(SECTIONS.length-1,i))); }catch(_){} },
    setMarkers(v){ document.body.classList.toggle('e-hide-markers',!v); },
    setBadges(on){ document.body.classList.toggle('show-tier-badges', !!on); },
    setEasing(m){ EASE=m||'medium'; if(built) applyFromProgress(currentProgress()); },
    setHeroFont(f){ section.style.setProperty('--hero-font', f||"'Bungee'"); },
    setHeroCurve(on){ if(!loaderEl) return; loaderEl.classList.toggle('show-curve', !!on);
      const c=loaderEl.querySelector('.e-hero-curve'); if(c && !introActive) c.style.opacity=on?'1':''; },
    setHeroDecor(d){ if(loaderEl) loaderEl.classList.toggle('dens-light', d==='light'); },
    replayIntro(){ if(loaderEl){ introPlayed=true; showLoader(); } },
    playIntroOnce(){ maybeIntro(); },   // shell calls this once home is visible (shows the loader, once per page load)
  };
  // build immediately if E happens to be active (it isn't by default), else lazy on first show
})();
