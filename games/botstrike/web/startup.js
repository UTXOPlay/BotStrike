// Optional same-origin launch reporting. BotStrike also runs as a standalone game.
(() => {
  const game='botstrike',attempt=new URLSearchParams(location.search).get('launch')||'standalone';
  const steps=[false,false,false,false];let error='',errorKind='',wanted=false,scheduled=false,graphics=false,models=0;
  const messages={assets:'Some artwork could not load. Please try again.',session:'The game session could not connect. Please try again.',graphics:'Graphics could not initialize. Check WebGL support and try again.',game:'The game could not start. Please try again.'};
  function snapshot(){const ready=steps.every(Boolean)&&graphics&&!error;return{type:'utxoplay:load',game,attempt,progress:(steps[0]?10:0)+(steps[1]?25:0)+Math.floor(models*30)+(graphics?5:0)+(steps[2]?15:0)+(steps[3]?15:0),steps:[...steps],phase:!steps[0]?'Starting BotStrike':!steps[1]?'Loading artwork':!graphics?'Preparing your scene':!steps[2]?'Connecting your session':!steps[3]?'Finishing setup':'Ready to play',detail:error||(!steps[1]?'Loading robot and map previews':!graphics?(models<1?'Loading 3D chassis and materials':'Preparing graphics for your device'):!steps[2]?'Connecting automatically; no reload needed':'Almost ready'),error,ready};}
  function emit(){if(parent!==window)parent.postMessage(snapshot(),location.origin);}
  function finish(){if(!scheduled&&wanted&&!error&&graphics&&steps.slice(0,3).every(Boolean)){scheduled=true;requestAnimationFrame(()=>requestAnimationFrame(()=>{if(error)return;steps[3]=true;emit();}));}}
  function gate(index){if(error||steps[3])return;steps[index]=true;emit();finish();}
  window.BotStrikeStartup={boot:()=>gate(0),assets:()=>gate(1),models(loaded,total){if(error||!steps[1]||steps[3]||!Number.isFinite(loaded)||!Number.isFinite(total)||total<=0)return;models=Math.max(models,Math.min(1,Math.max(0,loaded/total)));emit();},graphics(){if(error||steps[3])return;models=1;graphics=true;emit();finish();},session(){if(errorKind==='session'){error=errorKind='';}gate(2);},ready(){wanted=true;finish();},fail(kind='game'){if(error||steps[3])return;errorKind=kind;error=messages[kind]||messages.game;emit();},get state(){return snapshot();}};
  addEventListener('message',event=>{if(parent!==window&&event.source===parent&&event.origin===location.origin&&event.data?.type==='utxoplay:load-request'&&event.data.attempt===attempt)emit();});
  addEventListener('error',event=>{if(event.target?.tagName==='SCRIPT'||event.error)window.BotStrikeStartup.fail();},true);
  addEventListener('unhandledrejection',()=>window.BotStrikeStartup.fail());
  emit();
})();
