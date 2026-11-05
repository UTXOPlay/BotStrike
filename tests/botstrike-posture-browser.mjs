import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-posture';await mkdir(out,{recursive:true});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(180000);
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const results=await page.evaluate(()=>{
  const results=[];
  for(let hero=0;hero<6;hero++)for(const posture of ['standing','crouch','release','enter'])for(const life of [1,2,3]){
   if((posture==='release'||posture==='enter')&&life!==1)continue;
   const crouch=posture!=='standing',p={slot:0,team:0,hero,weapon:2,position:[0,0,0],velocity:[0,0,0],yaw:0,pitch:0,life,alive:true,crouch:posture==='crouch'||posture==='release',reload:0};
   motionLab.reset({hero,count:1,view:'side'});
   for(let frame=0;frame<60;frame++)motionLab.sample({player:p,now:frame*1000/60+1});
   if(posture==='release'||posture==='enter'){p.crouch=posture==='enter';motionLab.sample({player:p,now:993,dt:.01});}
   const before=motionLab.bodyMetrics({geometry:true}),frames=[];
   for(let frame=0;frame<120;frame++){
    const player={...p,alive:false,yaw:frame/60*Math.PI};const snapshot=JSON.stringify(player);
    const r=motionLab.sample({player,now:1001+frame*1000/60});
    const body=motionLab.bodyMetrics({geometry:frame%6===0||frame===119,regions:frame===119});
    frames.push({frame,finite:r.finite,unchanged:JSON.stringify(player)===snapshot,full:r.action.full,feet:r.feet,body});
   }
   const rejoined=motionLab.sample({player:{...p,alive:false},now:3050,invalidate:'visibility'}),rejoinedBody=motionLab.bodyMetrics({geometry:true,regions:true});
   const fresh=motionLab.sample({player:{...p,life:life+1,crouch:false},now:3100,events:[{name:'fire',life:life+1}]}),freshBody=motionLab.bodyMetrics();
   results.push({hero,crouch,posture,life,before,frames,rejoined:{finite:rejoined.finite,body:rejoinedBody},fresh:{finite:fresh.finite,action:fresh.action,recoil:fresh.springs.recoil[0],body:freshBody}});
  }
  const airborne=[];
  for(let hero=0;hero<6;hero++){
   motionLab.reset({hero,count:1,view:'side'});
   const p={slot:0,team:0,hero,weapon:2,position:[0,35,0],velocity:[0,-100,0],yaw:.4,pitch:0,life:1,alive:true,crouch:false,reload:0};
   motionLab.sample({player:p,now:1});
   const nearGround=motionLab.sample({player:{...p,position:[0,.5,0]},now:17}),touchdown=motionLab.sample({player:{...p,position:[0,0,0],velocity:[0,0,0]},now:33});
   motionLab.reset({hero,count:1,view:'side'});
   motionLab.sample({player:p,now:1});const frames=[];
   for(let frame=0;frame<120;frame++){
    const player={...p,alive:false,velocity:[0,0,0],yaw:1.5};const before=JSON.stringify(player),r=motionLab.sample({player,now:17+frame*1000/60});
    if(frame%6===0||frame===119)frames.push({frame,finite:r.finite,unchanged:JSON.stringify(player)===before,feet:r.feet,body:motionLab.bodyMetrics({geometry:true})});
   }
   const corrected=motionLab.sample({player:{...p,alive:false,position:[600,0,0],velocity:[0,0,0]},now:2100,state:{phase:'live',config:{map:1},objective:{}}}),correctedBody=motionLab.bodyMetrics({geometry:true});
   airborne.push({hero,frames,nearGround:{action:nearGround.action,posture:nearGround.posture},touchdown:{action:touchdown.action,posture:touchdown.posture},corrected:{finite:corrected.finite,body:correctedBody}});
  }
  const posture=[];
  for(let hero=0;hero<6;hero++)for(const fps of [30,60,120,0])for(const reduced of [false,true])for(const firstPerson of [false,true]){
   motionLab.reset({hero,count:1,view:firstPerson?'first-person':'side',reduced});
   let t=0,z=0,frame=0,takeoffs=0,landings=0,finite=true,unchanged=true,maxGripError=0,maxCrouchDifference=0,maxSoleHeight=0,maxShadowError=0,airContactViolations=0,airCrouch=false;const trace=[];
   while(t<5-1e-7){
    const dt=Math.min(fps?1/fps:[.012,.026,.009,.022,.014][frame%5],5-t),previous=t;t+=dt;
    const air=t-(t<2.5?1:3),inAir=air>0&&air<440/600,crouch=t>=.7&&t<1.45||t>=3.2&&t<4.2,speed=crouch?90:160;z-=speed*dt;
    const p={slot:0,team:0,hero,weapon:2,position:[0,inAir?220*air-300*air*air:0,z],velocity:[0,inAir?220-600*air:0,-speed],yaw:0,pitch:0,life:1,alive:true,crouch,reload:t>=3.1?Math.max(0,120-Math.floor((t-3.1)*64)):0};
    const events=[];if(previous<1.3&&t>=1.3)events.push({name:'fire'});if(previous<3.1&&t>=3.1)events.push({name:'reload',duration:120/64});
    const before=JSON.stringify(p),r=motionLab.sample({player:p,dt,now:t*1000+1,events});finite&&=r.finite;unchanged&&=before===JSON.stringify(p);takeoffs+=Number(r.posture.takeoff);landings+=Number(r.posture.landed);
    maxCrouchDifference=Math.max(maxCrouchDifference,Math.abs(r.posture.crouchAmount-r.gait.weights[6]-r.gait.weights[7]));
    if(!firstPerson&&frame%6===0)maxShadowError=Math.max(maxShadowError,Math.abs(motionLab.bodyMetrics().shadowY-.15));
    for(const c of Object.values(r.contacts))if(c.engaged&&c.weight>=.999)maxGripError=Math.max(maxGripError,c.actualError);
    if(p.position[1]>.001||p.velocity[1]>0){if(r.feet?.some(f=>f.feasible))airContactViolations++;airCrouch||=r.gait.weights[6]>.8;}
    else if(!firstPerson&&frame%6===0)for(const f of motionLab.soleMetrics())if(f.feasible)maxSoleHeight=Math.max(maxSoleHeight,Math.abs(f.minHeight),Math.abs(f.maxHeight));
    trace.push({phase:r.gait.phase,crouch:r.posture.crouchAmount});frame++;
   }
   posture.push({hero,fps:fps||'jitter',reduced,firstPerson,frames:frame,takeoffs,landings,finite,unchanged,maxGripError,maxCrouchDifference,maxSoleHeight,maxShadowError,airContactViolations,airCrouch,trace});
  }
  return {deaths:results,airborne,posture};
 });
 const manifest=await page.evaluate(()=>fetch('./manifest.json').then(r=>r.json()));
 await writeFile(`${out}/measurements.json`,JSON.stringify({results,errors,manifest},null,2));
 if(!process.env.RECORD_ONLY){
  for(const r of results.deaths){
   assert.ok(r.frames.every(f=>f.finite&&f.unchanged&&f.feet.every(p=>!p.feasible)),`${r.hero}/${r.crouch}: stale death contact`);
   assert.ok(r.frames.every(f=>Math.abs(f.body.rigYaw-r.before.rigYaw)<1e-6),`${r.hero}: corpse follows dead player's aim`);
   assert.ok(Math.abs(r.frames.at(-1).body.torsoMinY)<2,`${r.hero}: resting torso surface is propped above the floor: ${r.frames.at(-1).body.torsoMinY}`);
   assert.ok(r.rejoined.finite&&Math.abs(r.rejoined.body.minY)<.5&&Math.abs(r.rejoined.body.torsoMinY)<2,`${r.hero}: reconnect revived an idle layer under the corpse`);
   if(r.crouch)assert.ok(Math.max(...r.frames.map(f=>f.body.points.head[1]))<r.before.points.head[1]+2,`${r.hero}: crouched death stands up`);
   assert.ok(r.fresh.finite&&r.fresh.action.upper==='upper:fire'&&r.fresh.recoil>0,`${r.hero}: fresh-life fire lost`);
   assert.ok(Math.abs(r.fresh.body.modelPosition[1])<1e-6,`${r.hero}: fresh life retains corpse fall offset`);
  }
  for(const r of results.airborne){
   assert.ok(r.frames.every(f=>f.finite&&f.unchanged&&f.feet.every(p=>!p.feasible)));
   const last=r.frames.at(-1);assert.ok(Math.abs(last.body.minY)<.5,`${r.hero}: airborne corpse never reaches the floor: ${last.body.minY}`);
   assert.ok(!r.nearGround.posture.grounded&&r.nearGround.action.upper!=='upper:land');assert.ok(r.touchdown.posture.landed&&r.touchdown.action.upper==='upper:land');
   assert.ok(r.corrected.finite&&Math.abs(r.corrected.body.minY)<.5,`${r.hero}: dead map correction retained old fall height`);
  }
  for(const r of results.posture){
   assert.ok(r.finite&&r.unchanged&&r.airCrouch,JSON.stringify({...r,trace:undefined}));assert.equal(r.takeoffs,2);assert.equal(r.landings,2);assert.equal(r.airContactViolations,0);
   assert.ok(r.maxGripError<=2&&r.maxSoleHeight<=2&&r.maxCrouchDifference<1e-8&&r.maxShadowError<1e-8,JSON.stringify({...r,trace:undefined}));
  }
  for(let i=0;i<results.posture.length;i+=2){const a=results.posture[i],b=results.posture[i+1];assert.equal(a.trace.length,b.trace.length);for(let j=0;j<a.trace.length;j++){assert.ok(Math.abs(a.trace[j].phase-b.trace[j].phase)<1e-8);assert.equal(a.trace[j].crouch,b.trace[j].crouch);}}
  assert.deepEqual(errors,[]);
 }
 console.log(JSON.stringify({deathCases:results.deaths.length,airborneDeathCases:results.airborne.length,postureCases:results.posture.length,recordOnly:!!process.env.RECORD_ONLY,out}));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
