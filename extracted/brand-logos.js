/* ============================================================
   Jawad Design — brand logo marks for the hero "stack" rails.
   Uses the 10 REAL logo files in assets/logos/ (Jawad's exact set).
   window.JAWAD_LOGOS[name] -> <img> html string.
   Sized by CSS (.e-logo img / .e-hlogo-ic img). Each is wrapped by
   homepage-e.js in a hoverable chip / pill.
   ============================================================ */
(function(){
  // map of key -> real asset file (svg or png, exactly as supplied)
  const FILES = {
    figma:      'assets/logos/figma.png',
    claude:     'assets/logos/claude.svg',
    claudecode: 'assets/logos/claudecode.svg',
    codex:      'assets/logos/codex.svg',
    chatgpt:    'assets/logos/chatgpt.svg',
    cursor:     'assets/logos/cursor.svg',
    blender:    'assets/logos/blender.svg',
    excalidraw: 'assets/logos/excalidraw.svg',
    framer:     'assets/logos/framer.svg',
    spline:     'assets/logos/spline.png'
  };

  const NAMES = {
    figma:'Figma', claude:'Claude', claudecode:'Claude Code', codex:'Codex',
    chatgpt:'ChatGPT', cursor:'Cursor', blender:'Blender', excalidraw:'Excalidraw',
    framer:'Framer', spline:'Spline'
  };

  // build an <img> string for each logo
  const L = {};
  Object.keys(FILES).forEach(k=>{
    L[k] = `<img src="${FILES[k]}" alt="${NAMES[k]}" draggable="false">`;
  });

  window.JAWAD_LOGOS = L;
  window.JAWAD_LOGO_NAMES = NAMES;

  // hero orbit set — all 10 logos orbit the name (5 each side), then settle as state-2 labels
  window.JAWAD_HERO = {
    left:  ['figma','claude','claudecode','codex','chatgpt'],
    right: ['cursor','blender','excalidraw','framer','spline']
  };
  // exactly 5 per side — all 10 logos live in the two scrolling rails
  // (these loop seamlessly; the rail is never empty)
  window.JAWAD_RAILS = {
    left:  ['figma','claude','claudecode','codex','chatgpt'],
    right: ['cursor','blender','excalidraw','framer','spline']
  };
})();
