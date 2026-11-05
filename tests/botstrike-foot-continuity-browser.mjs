import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-foot-continuity';await mkdir(out,{recursive:true});
const spec=JSON.parse(await readFile('botstrike/spec.json','utf8')),server=await startMotionLab();
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage(),errors=[];page.setDefaultTimeout(240000);page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 await page.exposeFunction('motionProgress',completedCases=>console.log(JSON.stringify({completedCases})));
 const results=await page.evaluate(async({heroes,smoke})=>{
  motionLab.stop();const results=[];
  for(let hero=0;hero<6;hero++)for(const mode of ['quiet-walk','run'])for(const direction of ['forward','lateral'])for(const timing of smoke?['64']:['30','60','64','120','jitter'])for(const scenario of smoke?['stutter']:['stutter','reverse','settle']){
   motionLab.reset({hero,count:1,view:'side',diagnostics:false});
   const speed=heroes[hero].speed*(mode==='run'?1:.55),jitter=[1/120,1/40,1/75,1/30,1/90];
   let now=0,nativeTick=0,position=[0,0,0],velocity=[0,0,0],prior=null,finite=true,unchanged=true,maxSpeed=0,maxPelvisDrop=0,maxRelativeSpeed=0,maxStopStep=0,worst=null,worstRelative=null,locked=0,measured=0,finalFeet=null;
   const trace=[];
   for(let frame=0;now<2.5;frame++){
    const dt=timing==='jitter'?jitter[frame%jitter.length]:1/Number(timing);now+=dt;
    // Native state advances independently at 64 Hz. Initial warm-up lengths
    // differ across rigs, so interruptions exercise different gait phases.
    while(nativeTick/64<=now+1e-9){
     const t=nativeTick/64,warm=.4+hero*.027,segment=Math.floor((t-warm)*16);
     let sign=t<warm?1:scenario==='settle'?(t<warm+.4?1:0):scenario==='reverse'?(segment%2===0?1:-1):(segment%2===0?1:0);
     velocity=direction==='forward'?[0,0,-speed*sign]:[speed*sign,0,0];
     position=position.map((v,i)=>v+velocity[i]/64);nativeTick++;
    }
    const player={slot:0,team:0,hero,weapon:2,life:1,position:[...position],velocity:[...velocity],yaw:0,pitch:0,alive:true,crouch:false,reload:0},before=JSON.stringify(player);
    const r=motionLab.sample({player,dt,now:now*1000+1}),soles=motionLab.soleMetrics();finite&&=r.finite;unchanged&&=before===JSON.stringify(player);finalFeet=r.feet;if(Number.isFinite(r.feet[0].drop))maxPelvisDrop=Math.max(maxPelvisDrop,r.feet[0].drop);
    if(prior&&now>Math.max(.7,.4+hero*.027+(scenario==='settle'?.4:0))){
     for(let f=0;f<2;f++){
      const step=Math.hypot(...soles[f].center.map((v,i)=>v-prior.soles[f].center[i])),footSpeed=step/dt;
      const relativeSpeed=Math.hypot(...soles[f].center.map((v,i)=>v-prior.soles[f].center[i]-position[i]+prior.position[i]))/dt;
      if(relativeSpeed>maxRelativeSpeed){maxRelativeSpeed=relativeSpeed;worstRelative={frame,dt,nativeTick,position:[...position],velocity:[...velocity],side:soles[f].side,step,feet:r.feet};}
      if(footSpeed>maxSpeed){maxSpeed=footSpeed;worst={frame,dt,nativeTick,position:[...position],velocity:[...velocity],side:soles[f].side,step,feet:r.feet};}
      if(velocity.every(v=>v===0)&&prior.velocity.every(v=>v===0))maxStopStep=Math.max(maxStopStep,step);
      if(soles[f].feasible)locked++;
     }
     measured++;
     if(smoke)trace.push({frame,dt,position:[...position],velocity:[...velocity],soles,feet:r.feet});
    }
    prior={soles,velocity:[...velocity],position:[...position]};
   }
   const beforeSoles=motionLab.soleMetrics();
   const player={slot:0,team:0,hero,weapon:2,life:1,position:[...position],velocity:[0,0,0],yaw:0,pitch:0,alive:true,crouch:false,reload:0};
   motionLab.sample({player,dt:0,now:now*1000+1});const afterSoles=motionLab.soleMetrics();
   let zeroTimeShift=Math.max(...afterSoles.map((f,i)=>Math.hypot(...f.center.map((v,j)=>v-beforeSoles[i].center[j]))));
   const zeroTimeTrace=[{kind:'stop',soles:afterSoles,diagnostics:motionLab.diagnostics()[0].feet}];
   let lastSoles=afterSoles;
   for(const sign of [1,-1,0]){
    player.velocity=direction==='forward'?[0,0,-speed*sign]:[speed*sign,0,0];
    motionLab.sample({player,dt:0,now:now*1000+1});const soles=motionLab.soleMetrics();
    zeroTimeShift=Math.max(zeroTimeShift,...soles.map((f,i)=>Math.hypot(...f.center.map((v,j)=>v-lastSoles[i].center[j]))));lastSoles=soles;zeroTimeTrace.push({sign,soles,diagnostics:motionLab.diagnostics()[0].feet});
   }
   results.push({hero,mode,direction,timing,scenario,speed,maxSpeed,maxPelvisDrop,maxRelativeSpeed,maxStopStep,zeroTimeShift,finite,unchanged,lockedFraction:locked/(measured*2),finalFeet,worst,worstRelative,zeroTimeTrace,...(smoke?{trace}:{})});
   if(results.length%60===0)await window.motionProgress(results.length);
  }
  return results;
 },{heroes:spec.heroes,smoke:process.env.FOOT_CASES==='smoke'});
 await writeFile(out+'/report.json',JSON.stringify({scope:'Post-skinning sole continuity; fixed-step correctness, not a hardware benchmark',results,errors},null,2));
 for(const r of results){
  assert.ok(r.finite&&r.unchanged,JSON.stringify(r));
  // A forward swing must overtake the root. This bound permits that motion,
  // while rejecting the old one-frame 12–20 unit snaps at native 64 Hz.
  assert.ok(r.maxRelativeSpeed<r.speed*(r.mode==='quiet-walk'?2.5:1.75)+100,`discontinuous root-relative foot speed: ${JSON.stringify({...r,trace:undefined})}`);
  assert.ok(r.zeroTimeShift<.25,`zero-time interruption changed the solved sole: ${JSON.stringify({...r,trace:undefined})}`);
  if(r.scenario==='settle')assert.ok(r.finalFeet.every(f=>f.feasible),'stopped feet must finish in stable support: '+JSON.stringify(r));
 }
 assert.deepEqual(errors,[]);console.log(JSON.stringify({cases:results.length,maxSpeed:Math.max(...results.map(r=>r.maxSpeed)),maxZeroTimeShift:Math.max(...results.map(r=>r.zeroTimeShift)),out}));
}finally{await browser.close();server.close();server.closeAllConnections();}
