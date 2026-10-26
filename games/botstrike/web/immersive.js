// Browser presentation only. The native match continues while controls are paused.
(() => {
  const root=document.documentElement,content=document.getElementById('game-content'),gate=document.getElementById('immersive-gate'),button=document.getElementById('immersive-enter'),title=document.getElementById('immersive-title'),hint=document.getElementById('immersive-hint');
  const touch=matchMedia('(pointer: coarse)'),portrait=matchMedia('(orientation: portrait)');
  const mobile=()=>touch.matches||navigator.userAgentData?.mobile===true;
  const canFullscreen=()=>typeof root.requestFullscreen==='function'&&document.fullscreenEnabled;
  let blocked=false,pending=false;
  function update(){
    const next=mobile()&&(portrait.matches||(canFullscreen()&&!document.fullscreenElement));
    root.dataset.mobile=String(mobile());root.dataset.immersiveBlocked=String(next);gate.hidden=!next;content.inert=next;content.setAttribute('aria-hidden',String(next));
    title.textContent=portrait.matches?'Turn to landscape':'Go fullscreen';
    hint.textContent=portrait.matches?'Turn your phone sideways for room to move and aim.':'Enter fullscreen to keep the browser bars out of your match.';
    button.setAttribute('aria-label',portrait.matches?'Enter fullscreen and landscape':'Enter fullscreen');button.hidden=!canFullscreen()&&!screen.orientation?.lock;
    if(next!==blocked){blocked=next;dispatchEvent(new CustomEvent('botstrike:immersive',{detail:{blocked}}));if(next&&!button.hidden)button.focus({preventScroll:true});}
  }
  async function enter(){
    if(pending||!mobile())return;pending=true;button.disabled=true;
    try{
      if(canFullscreen()&&!document.fullscreenElement)await root.requestFullscreen({navigationUI:'hide'});
      try{await screen.orientation?.lock?.('landscape');}catch{/* Manual rotation remains required when locking is unsupported. */}
      update();
    }catch{update();hint.textContent='Fullscreen was not allowed. Tap again, or open this game in your browser.';}
    finally{pending=false;button.disabled=false;}
  }
  window.BotStrikeImmersive={get blocked(){return blocked},enter};
  button.addEventListener('click',enter);touch.addEventListener('change',update);portrait.addEventListener('change',update);addEventListener('resize',update);document.addEventListener('fullscreenchange',update);addEventListener('pageshow',update);
  addEventListener('pagehide',()=>{try{screen.orientation?.unlock?.()}catch{}});
  update();
})();
