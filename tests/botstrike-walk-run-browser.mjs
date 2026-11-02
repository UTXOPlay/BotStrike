import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
import spec from '../botstrike/spec.json' with {type:'json'};

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-walk-run';await mkdir(out,{recursive:true});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(180000);
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const results=[];
 for(let hero=0;hero<6;hero++)for(let weapon=0;weapon<12;weapon++){
  const pair=[];
  for(const firstPerson of [false,true]){
   const result=await page.evaluate(({hero,weapon,firstPerson,runSpeed})=>{
    motionLab.reset({hero,weapon,count:1,view:firstPerson?'first-person':'front'});
    let now=1,z=0,maxGripError=0,finite=true,unchanged=true;const phases=[],settled=[];
    for(let frame=0;frame<420;frame++){
     const stage=Math.floor(frame/60),local=frame%60,dt=[1/120,1/30,.012,.019][frame%4];
     const fraction=stage===0||stage===3?.55:stage===1?.55+.45*local/59:stage===4?.55:stage===5?.45:stage===6?0:1;
     const speed=runSpeed*fraction;z-=speed*dt;now+=dt*1000;
     const player={slot:0,team:0,hero,weapon,position:[0,0,z],velocity:[0,0,-speed],yaw:0,pitch:0,life:1,alive:true,crouch:stage===5,scoped:stage===4,reload:0};
     const before=JSON.stringify(player),r=motionLab.sample({player,dt,now});finite&&=r.finite;unchanged&&=JSON.stringify(player)===before;
     phases.push(r.gait.phase);
     for(const c of Object.values(r.contacts))if(c.engaged&&c.weight>=.999)maxGripError=Math.max(maxGripError,c.actualError);
     if(local===59)settled.push({stage,...r.gait,ready:r.springs.ready[0]});
    }
    return {hero,weapon,firstPerson,runSpeed,maxGripError,finite,unchanged,phases,settled};
   },{hero,weapon,firstPerson,runSpeed:spec.heroes[hero].speed*(spec.weapons[weapon].mobility??1)});
   assert.ok(result.finite&&result.unchanged&&result.maxGripError<=2,JSON.stringify({...result,phases:undefined}));
   for(const r of result.settled){
    assert.equal(r.runSpeed,result.runSpeed);assert.ok(r.cycleDuration>=.26&&r.cycleDuration<=1.25);
    if(r.stage===2){assert.equal(r.runAmount,1);assert.ok(r.weights[2]>.999&&r.ready>.99,JSON.stringify(r));}
    if([0,3,4,5,6].includes(r.stage)){assert.equal(r.runAmount,0);assert.ok(r.weights[2]<.001&&r.ready<.01,JSON.stringify(r));}
    if([0,3,4].includes(r.stage))assert.ok(r.weights[1]>.999,JSON.stringify(r));
    if(r.stage===5)assert.ok(r.weights[7]>.999,JSON.stringify(r));
    if(r.stage===6)assert.ok(r.weights[0]>.999,JSON.stringify(r));
   }
   pair.push(result);
  }
  const maxPhaseDelta=Math.max(...pair[0].phases.map((v,i)=>Math.abs(v-pair[1].phases[i])));
  assert.ok(maxPhaseDelta<1e-8,`First/third-person foot clocks diverged: ${hero}/${weapon}: ${maxPhaseDelta}`);
  results.push({hero,weapon,maxPhaseDelta,views:pair.map(({phases,...r})=>r)});
 }
 assert.ok(spec.weapons[7].mobility<spec.weapons[2].mobility,'directional probes must include the heavy-weapon speed penalty');
 const feet=await page.evaluate(({heroes,weapons})=>{
  const results=[];
  for(let hero=0;hero<6;hero++)for(const weapon of [2,7])for(const gait of ['walk','run'])for(const [direction,dx,dz]of [['forward',0,-1],['back',0,1],['side',1,0],['diagonal',Math.SQRT1_2,-Math.SQRT1_2]]){
   const speed=heroes[hero].speed*(weapons[weapon].mobility??1)*(gait==='walk'?.55:1);
   motionLab.reset({hero,weapon,count:1,view:'front'});let finite=true,scheduled=0,feasible=0,maxError=0,maxHeight=0,maxLift=0,maxToeAngle=0;
   for(let frame=0;frame<180;frame++){
    const r=motionLab.sample({player:{slot:0,team:0,hero,weapon,position:[dx*speed*frame/60,0,dz*speed*frame/60],velocity:[dx*speed,0,dz*speed],yaw:0,pitch:0,life:1,alive:true,crouch:false,scoped:false,reload:0},now:frame*1000/60+1});finite&&=r.finite;
    const geometry=motionLab.soleMetrics();
    for(let i=0;i<r.feet.length;i++){
     const f=r.feet[i],g=geometry[i];if(f.scheduled)scheduled++;
     maxLift=Math.max(maxLift,g.maxHeight);
     if(!f.feasible)continue;feasible++;maxError=Math.max(maxError,f.error);maxHeight=Math.max(maxHeight,Math.abs(g.minHeight),Math.abs(g.maxHeight));maxToeAngle=Math.max(maxToeAngle,Math.abs(g.toeYaw));
    }
   }
   results.push({hero,weapon,gait,direction,speed,finite,scheduled,feasible,maxError,maxHeight,maxLift,maxToeAngle});
  }
  return results;
 },{heroes:spec.heroes,weapons:spec.weapons});
 for(const r of feet){
  assert.ok(r.finite&&r.scheduled>0&&r.feasible/r.scheduled>.75,JSON.stringify(r));
  assert.ok(r.maxError<=2&&r.maxHeight<=2&&r.maxToeAngle<.03,JSON.stringify(r));
  assert.ok(r.maxLift<(r.gait==='walk'?1.6:4.1),JSON.stringify(r));
 }
 assert.deepEqual(errors,[]);
 const manifest=await page.evaluate(()=>fetch('./manifest.json').then(r=>r.json()));
 await writeFile(`${out}/measurements.json`,JSON.stringify({cases:144,framesPerCase:420,results,feet,manifest},null,2));
 console.log(JSON.stringify({cases:144,frames:60480,directionalFeetCases:feet.length,minFeasibleCoverage:Math.min(...feet.map(r=>r.feasible/r.scheduled)),maxPhaseDelta:Math.max(...results.map(r=>r.maxPhaseDelta)),maxGripError:Math.max(...results.flatMap(r=>r.views.map(v=>v.maxGripError))),out}));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
