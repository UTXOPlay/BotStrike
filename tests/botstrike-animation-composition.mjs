import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
import spec from '../botstrike/spec.json' with {type:'json'};

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-animation-composition';await mkdir(out,{recursive:true});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(180000);
try{
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const results=[];
 for(let hero=0;hero<6;hero++)for(let weapon=0;weapon<12;weapon++)for(const firstPerson of [false,true]){
  const result=await page.evaluate(({hero,weapon,firstPerson,reloadTicks})=>{
   motionLab.reset({hero,weapon,count:1,view:firstPerson?'first-person':'front'});
   let maxError=0,maxWrist=0,contacts=0,finite=true,unchanged=true,hitPreservedReload=false,x=0,z=0,previous=0;
   const bad=[];
   for(let frame=0;frame<420;frame++){
    const t=frame/60,dt=1/60,yaw=Math.sin(t*2)*Math.PI,pitch=Math.sin(t*1.7)*1.15,speed=t<4?240:90;
    const air=t-4,y=air>0&&air<.8?200*air*(.8-air):0,vertical=air>0&&air<.8?200*(.8-2*air):0;
    const velocity=[Math.cos(t*2.3)*speed,vertical,-Math.sin(t*2.3)*speed];x+=velocity[0]*dt;z+=velocity[2]*dt;
    const reload=t>=1?Math.max(0,reloadTicks-Math.floor((t-1)*64)):0;
    const player={slot:0,team:0,hero,weapon,position:[x,y,z],velocity,yaw,pitch,life:1,alive:true,crouch:t>=5,scoped:t>=5,reload};
    const events=[];
    for(const [at,name]of [[.3,'fire'],[1,'reload'],[1.3,'hit'],[5,'fire'],[5.5,'utility']])if(previous<at&&t>=at)events.push({name,duration:name==='reload'?reloadTicks/64:undefined,value:name==='hit'?35:undefined});
    const before=JSON.stringify(player),r=motionLab.sample({player,dt,now:t*1000+1,events});previous=t;finite&&=r.finite;unchanged&&=before===JSON.stringify(player);
    if(t>=1.3&&t<1.4&&r.action.upper==='upper:reload')hitPreservedReload=true;
    for(const [side,c]of Object.entries(r.contacts))if(c.engaged&&c.weight>=.999){
     contacts++;maxError=Math.max(maxError,c.actualError);maxWrist=Math.max(maxWrist,c.wrist);
     if(c.actualError>2&&bad.length<3)bad.push({t,side,...c,action:r.action});
    }
   }
   motionLab.render();return {hero,weapon,firstPerson,maxError,maxWrist,contacts,finite,unchanged,hitPreservedReload,bad};
  },{hero,weapon,firstPerson,reloadTicks:spec.weapons[weapon].reload});
  results.push(result);
  assert.ok(result.finite&&result.unchanged,JSON.stringify(result));
  assert.ok(result.contacts>400&&result.maxError<=2&&result.maxWrist<=1.10001,JSON.stringify(result));
  assert.ok(result.hitPreservedReload,JSON.stringify(result));
 }
 const lifecycle=await page.evaluate(()=>{
  const results=[];
  for(let hero=0;hero<6;hero++)for(const firstPerson of [false,true]){
   motionLab.reset({hero,count:1,view:firstPerson?'first-person':'front'});
   const p={slot:0,team:0,hero,weapon:2,position:[0,0,0],velocity:[0,0,0],yaw:0,pitch:0,life:1,alive:true,crouch:false,reload:0};
   const sample=(changes={},extra={})=>motionLab.sample({player:{...p,...changes},...extra});
   sample();sample({alive:false});
   const fresh=sample({life:2},{events:[{name:'fire',life:2}]}),switched=sample({life:2,weapon:3},{events:[{name:'fire',life:2}]}),noStale=sample({life:2},{events:[{name:'reload',life:1,duration:2}]});
   const room=sample({life:2},{invalidate:'room'}),hidden=sample({life:2},{invalidate:'visibility'});
   const gap=sample({life:2},{dt:.4}),correction=sample({life:2,position:[600,0,0]}),map=sample({life:2,position:[600,0,0]},{state:{phase:'live',config:{map:1},objective:{}}});
   motionLab.reset({hero,count:1,view:firstPerson?'first-person':'front'});
   sample();const air=sample({position:[0,20,0],velocity:[0,200,0]});sample();const pivot=sample({yaw:Math.PI});let settled;
   for(let i=0;i<12;i++)settled=sample({yaw:Math.PI});
   sample({}, {invalidate:'room'});const unreachable=sample({position:[60,0,0]});
   results.push({hero,firstPerson,fresh:fresh.action,firstShotRecoil:fresh.springs.recoil[0],switched:switched.action,switchedRecoil:switched.springs.recoil[0],noStale:noStale.action,resets:[room.reset,hidden.reset,gap.reset,correction.reset,map.reset],air:air.feet,pivot:pivot.feet,settled:settled.feet,unreachable:unreachable.feet,finite:[fresh,switched,noStale,room,hidden,gap,correction,map,air,pivot,settled,unreachable].every(r=>r.finite)});
  }
  return results;
 });
 for(const r of lifecycle){assert.ok(r.finite);assert.equal(r.fresh.upper,'upper:fire');assert.equal(r.fresh.full,undefined);assert.ok(r.firstShotRecoil>0);assert.equal(r.switched.upper,'upper:fire');assert.ok(r.switchedRecoil>.02);assert.notEqual(r.noStale.upper,'upper:reload');assert.deepEqual(r.resets,['room','visibility','gap','correction','map']);if(!r.firstPerson){assert.ok(r.air.every(f=>!f.feasible&&f.reason==='air'));assert.ok(r.pivot.every(f=>!f.feasible&&f.reason==='pivot'));assert.ok(r.settled.every(f=>f.feasible));assert.ok(r.unreachable.every(f=>!f.feasible&&['unreachable','joint-limit'].includes(f.reason)));}}
 assert.deepEqual(errors,[]);await writeFile(`${out}/measurements.json`,JSON.stringify({results,lifecycle},null,2));
 console.log(JSON.stringify({cases:results.length,framesPerCase:420,maxGripError:Math.max(...results.map(r=>r.maxError)),lifecycle:12,out}));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
