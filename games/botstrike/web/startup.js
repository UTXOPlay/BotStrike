// Optional same-origin launch reporting. BotStrike also runs as a standalone game.
(() => {
  const game='botstrike',attempt=new URLSearchParams(location.search).get('launch')||'standalone';
  const steps=[false,false,false,false];let error='',wanted=false,scheduled=false;
  const messages={assets:'Some artwork could not load. Please try again.',session:'The game session could not connect. Please try again.',graphics:'Graphics could not initialize. Check WebGL support and try again.',game:'The game could not start. Please try again.'};
  function snapshot(){const ready=steps.every(Boolean)&&!error;return{type:'utxoplay:load',game,attempt,progress:steps.reduce((n,v,i)=>n+(v?[10,45,30,15][i]:0),0),steps:[...steps],phase:!steps[0]?'Starting BotStrike':!steps[1]?'Loading artwork':!steps[2]?'Connecting your session':!steps[3]?'Preparing the scene':'Ready to play',detail:error||(!steps[1]?'Loading robot and map previews':!steps[2]?'Connecting to the squad service':'Preparing your chassis'),error,ready};}
  function emit(){if(parent!==window)parent.postMessage(snapshot(),location.origin);}
  function finish(){if(!scheduled&&wanted&&!error&&steps.slice(0,3).every(Boolean)){scheduled=true;requestAnimationFrame(()=>requestAnimationFrame(()=>{if(error)return;steps[3]=true;emit();}));}}
  function gate(index){if(error||steps[3])return;steps[index]=true;emit();finish();}
  window.BotStrikeStartup={boot:()=>gate(0),assets:()=>gate(1),session:()=>gate(2),ready(){wanted=true;finish();},fail(kind='game'){if(error||steps[3])return;error=messages[kind]||messages.game;emit();},get state(){return snapshot();}};
  addEventListener('message',event=>{if(parent!==window&&event.source===parent&&event.origin===location.origin&&event.data?.type==='utxoplay:load-request'&&event.data.attempt===attempt)emit();});
  addEventListener('error',event=>{if(event.target?.tagName==='SCRIPT'||event.error)window.BotStrikeStartup.fail();},true);
  addEventListener('unhandledrejection',()=>window.BotStrikeStartup.fail());
  emit();
})();
