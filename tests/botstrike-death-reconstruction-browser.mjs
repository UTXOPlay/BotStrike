import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-death-reconstruction';await mkdir(out,{recursive:true});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(180000);
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const results=await page.evaluate(()=>{
  motionLab.stop();const settled=[],collapsing=[],gaps=[],firstSeen=[],corrections=[],lifecycle=[],repeated=[];
  const compare=(a,b)=>{
   const maxJointShift=Math.max(...Object.keys(a.body.points).map(k=>Math.hypot(...a.body.points[k].map((v,i)=>v-b.body.points[k][i]))));
   let maxBoneAngle=0,maxLocalTranslation=0;
   for(let i=0;i<a.frame.pose.length;i+=7){
    maxLocalTranslation=Math.max(maxLocalTranslation,Math.hypot(...a.frame.pose.slice(i,i+3).map((v,j)=>v-b.frame.pose[i+j])));
    const q=a.frame.pose.slice(i+3,i+7),r=b.frame.pose.slice(i+3,i+7),dot=Math.abs(q.reduce((n,v,j)=>n+v*r[j],0));maxBoneAngle=Math.max(maxBoneAngle,2*Math.acos(Math.min(1,dot)));
   }
   return {maxJointShift,maxBoneAngle,maxLocalTranslation,rigYawShift:Math.abs(a.body.rigYaw-b.body.rigYaw)};
  };
  const prepare=(hero,life,posture)=>{
   motionLab.reset({hero,count:1,view:'side',diagnostics:false});
   const player={slot:0,team:0,hero,weapon:2,life,position:[0,0,0],velocity:[0,0,0],yaw:0,pitch:0,alive:true,crouch:posture==='crouch'||posture==='release',reload:0};
   for(let i=0;i<60;i++)motionLab.sample({player,now:1+i*1000/60,...(i===0?{invalidate:'room'}:{})});
   if(posture==='enter'||posture==='release'){player.crouch=posture==='enter';motionLab.sample({player,now:993,dt:.01});}
   return player;
  };
  const snapshot=frame=>({frame,body:motionLab.bodyMetrics()});
  for(let hero=0;hero<6;hero++)for(const posture of ['standing','crouch','enter','release'])for(const life of [1,2,3]){
   const p=prepare(hero,life,posture);p.alive=false;let frame;
   for(let i=0;i<120;i++)frame=motionLab.sample({player:p,now:1001+i*1000/60});
   const before=snapshot(frame),after=snapshot(motionLab.sample({player:p,now:2984+1/3,dt:0,invalidate:'visibility'}));
   settled.push({hero,life,posture,...compare(before,after),beforeClip:before.frame.action.full,afterClip:after.frame.action.full,finite:before.frame.finite&&after.frame.finite});
  }
  for(let hero=0;hero<6;hero++)for(const posture of ['standing','crouch']){
   const p=prepare(hero,2,posture);p.alive=false;p.yaw=1.2;let frame;
   for(let i=0;i<=6;i++)frame=motionLab.sample({player:p,now:1001+i*1000/60});
   const before=snapshot(frame),after=snapshot(motionLab.sample({player:p,now:1101,dt:0,invalidate:'visibility'}));
   collapsing.push({hero,posture,...compare(before,after),beforeYaw:before.body.rigYaw,afterYaw:after.body.rigYaw,finite:before.frame.finite&&after.frame.finite});
   const run=gap=>{
    const player=prepare(hero,2,posture);player.alive=false;let r=motionLab.sample({player,now:1001});
    if(gap)r=motionLab.sample({player,now:1401,dt:.4});
    else for(let i=1;i<=24;i++)r=motionLab.sample({player,now:1001+i*1000/60});
    return snapshot(r);
   };
   const continuous=run(false),rejoined=run(true);gaps.push({hero,posture,...compare(continuous,rejoined),finite:continuous.frame.finite&&rejoined.frame.finite});
   for(const life of [1,2,3]){
    motionLab.reset({hero,count:1,view:'side',diagnostics:false});
    const player={...p,life,yaw:.8,crouch:posture==='crouch'};
    const observed=motionLab.sample({player,now:1,invalidate:'room'}),name=observed.action.full?.split('|').pop(),expected=['death_back','death_left','death_right'][life%3]+(player.crouch?'_crouch':'');
    firstSeen.push({hero,life,posture,name,expected,finite:observed.finite});
   }
   const airborne=prepare(hero,2,posture);airborne.position=[0,35,0];airborne.velocity=[0,-100,0];motionLab.sample({player:airborne,now:1000});airborne.alive=false;let end;
   for(let i=0;i<120;i++)end=motionLab.sample({player:airborne,now:1001+i*1000/60});
   const beforeCorrection=snapshot(end);airborne.position=[0,0,0];airborne.velocity=[0,0,0];
   const afterCorrection=snapshot(motionLab.sample({player:airborne,now:2984+1/3,dt:0,invalidate:'correction'}));
   corrections.push({hero,posture,...compare(beforeCorrection,afterCorrection),finite:beforeCorrection.frame.finite&&afterCorrection.frame.finite});
   // Room and map boundaries deliberately discard the old death descriptor.
   const changed={...airborne,position:[600,0,0],yaw:1.1,crouch:false};
   const map=motionLab.sample({player:changed,now:3100,state:{phase:'live',config:{map:1},objective:{}}}),mapBody=motionLab.bodyMetrics();
   const room=motionLab.sample({player:{...changed,yaw:.6},now:3200,state:{phase:'live',config:{map:1},objective:{}},invalidate:'room'}),roomBody=motionLab.bodyMetrics();
   const fresh=motionLab.sample({player:{...changed,alive:true,life:3},now:3300,state:{phase:'live',config:{map:1},objective:{}},events:[{name:'fire',life:3}]});
   lifecycle.push({hero,posture,mapYaw:mapBody.rigYaw,mapClip:map.action.full?.split('|').pop(),roomYaw:roomBody.rigYaw,roomClip:room.action.full?.split('|').pop(),freshAction:fresh.action,firstShotRecoil:fresh.springs.recoil[0],finite:map.finite&&room.finite&&fresh.finite});
   const repeatPlayer=prepare(hero,2,posture);repeatPlayer.position=[0,35,0];repeatPlayer.velocity=[0,-100,0];motionLab.sample({player:repeatPlayer,now:1000});repeatPlayer.alive=false;
   for(let i=0;i<120;i++)end=motionLab.sample({player:repeatPlayer,now:1001+i*1000/60});
   const reference=snapshot(end),repeat={hero,posture,cycles:100,maxJointShift:0,maxBoneAngle:0,maxLocalTranslation:0,rigYawShift:0,finite:true},nativeBefore=JSON.stringify(repeatPlayer);
   for(let i=0;i<100;i++){
    const next=snapshot(motionLab.sample({player:repeatPlayer,now:3001+i,dt:.001,invalidate:'visibility'})),delta=compare(reference,next);
    for(const key of ['maxJointShift','maxBoneAngle','maxLocalTranslation','rigYawShift'])repeat[key]=Math.max(repeat[key],delta[key]);repeat.finite&&=next.frame.finite;
   }
   repeat.unchanged=JSON.stringify(repeatPlayer)===nativeBefore;repeated.push(repeat);
  }
  return {settled,collapsing,gaps,firstSeen,corrections,lifecycle,repeated};
 });
 await writeFile(out+'/report.json',JSON.stringify({scope:'F02 same-life corpse identity and elapsed-time reconstruction; software-rendered correctness, not physical performance',results,errors},null,2));
 for(const group of ['settled','collapsing','gaps','corrections','repeated'])for(const r of results[group]){
  assert.ok(r.finite&&(r.unchanged??true)&&r.maxJointShift<.25&&r.maxBoneAngle<.003&&r.maxLocalTranslation<.001&&r.rigYawShift<1e-6,`${group}: ${JSON.stringify(r)}`);
 }
 for(const r of results.firstSeen)assert.ok(r.finite&&r.name===r.expected,`first seen corpse: ${JSON.stringify(r)}`);
 for(const r of results.lifecycle)assert.ok(r.finite&&Math.abs(r.mapYaw-1.1)<1e-8&&Math.abs(r.roomYaw-.6)<1e-8&&r.mapClip==='death_right'&&r.roomClip==='death_right'&&r.freshAction.upper==='upper:fire'&&r.freshAction.full===undefined&&r.firstShotRecoil>0,`lifecycle: ${JSON.stringify(r)}`);
 assert.deepEqual(errors,[]);console.log(JSON.stringify({cases:Object.fromEntries(Object.entries(results).map(([k,v])=>[k,v.length])),out}));
}finally{await browser.close();server.close();server.closeAllConnections();}
