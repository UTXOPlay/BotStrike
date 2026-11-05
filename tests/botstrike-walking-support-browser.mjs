import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-walking-support';await mkdir(out,{recursive:true});
const spec=JSON.parse(await readFile('botstrike/spec.json','utf8'));
const sourcePaths=['games/botstrike/client/locomotion-gait.mjs','games/botstrike/client/locomotion-blend.mjs','games/botstrike/client/foot-ik.mjs','games/botstrike/client/characters.mjs','games/botstrike/client/animation-motion.mjs','games/botstrike/client/foot-recovery.mjs','tools/botstrike-motion-lab.mjs','tests/botstrike-walking-support-browser.mjs','botstrike/spec.json'];
const sources=Object.fromEntries(await Promise.all(sourcePaths.map(async p=>[p,createHash('sha256').update(await readFile(p)).digest('hex')])));
// Identical read-only instrumentation in both revisions. Measure CPU-skinned
// sole landmarks; solver feasibility alone cannot establish actual support.
const bundle=await build({entryPoints:['tools/botstrike-motion-lab.mjs'],bundle:true,format:'esm',write:false,plugins:[{name:'support-probe',setup(b){b.onLoad({filter:/\/botstrike-motion-lab\.mjs$/},async a=>({loader:'js',resolveDir:a.path.slice(0,a.path.lastIndexOf('/')),contents:(await readFile(a.path,'utf8')).replace('return {side:f.side,state:f.status',`return {skinError:Math.max(...points.map((p,i)=>p.distanceTo(f.samples[i].local.clone().sub(f.offset).multiply(actor.model.getWorldScale(new THREE.Vector3())).applyQuaternion(f.rotation).add(f.anchor)))),anchor:f.anchor.toArray(),plantId:f.plantId,bounds:{min:points.reduce((a,p)=>a.map((v,i)=>Math.min(v,p.getComponent(i))),[Infinity,Infinity,Infinity]),max:points.reduce((a,p)=>a.map((v,i)=>Math.max(v,p.getComponent(i))),[-Infinity,-Infinity,-Infinity])},side:f.side,state:f.status`)}));}}]});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(240000);
 await page.route('**/lab.js',r=>r.fulfill({body:Buffer.from(bundle.outputFiles[0].contents),contentType:'text/javascript'}));
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 await page.exposeFunction('supportProgress',count=>console.log(JSON.stringify({completedCases:count})));
 const results=await page.evaluate(async({heroes,weapons,smoke})=>{
  motionLab.stop();const rows=[];
  const directions=[['forward',0,1],['back',0,-1],['right',1,0],['left',-1,0],['forward-right',Math.SQRT1_2,Math.SQRT1_2],['forward-left',-Math.SQRT1_2,Math.SQRT1_2],['back-right',Math.SQRT1_2,-Math.SQRT1_2],['back-left',-Math.SQRT1_2,-Math.SQRT1_2]];
  const fixtures=[];
  for(let hero=0;hero<6;hero++)for(const d of directions.slice(0,smoke?4:8))for(const mode of ['quiet-walk','crouch','run'])fixtures.push({hero,d,mode,weapon:2,timing:'120',root:'continuous'});
  if(!smoke){
   // Clock coverage is layered, not a repeated full Cartesian asset matrix.
   for(let hero=0;hero<6;hero++)for(const d of [directions[0],directions[2],directions[4]])for(const mode of ['quiet-walk','crouch'])for(const timing of ['30','60','120','jitter'])fixtures.push({hero,d,mode,weapon:2,timing,root:'64'});
   for(let hero=0;hero<6;hero++)for(const d of [directions[0],directions[2],directions[4]])for(const [from,mode] of [['run','quiet-walk'],['quiet-walk','crouch'],['crouch','quiet-walk'],['run','scoped']])fixtures.push({hero,d,mode,from,weapon:mode==='scoped'?3:2,timing:'120',root:'64'});
   for(let hero=0;hero<6;hero++)for(const d of [directions[0],directions[2]])for(const analog of [.08,.20,.40])fixtures.push({hero,d,mode:'analog-walk',analog,weapon:2,timing:'120',root:'64'});
   for(let weapon=0;weapon<weapons.length;weapon++)for(const mode of ['quiet-walk','crouch'])fixtures.push({hero:weapon%6,d:directions[2],mode,weapon,timing:'60',root:'64'});
  }
  let loadedHero=-1;
  for(const f of fixtures){
   const {hero,d:[direction,side,forward],mode,weapon,timing,root}=f,maximum=heroes[hero].speed*weapons[weapon].mobility,fraction=f.analog??(mode==='run'?1:mode==='crouch'?.45:.55),speed=maximum*fraction,initialSpeed=maximum*(f.from==='run'?1:f.from==='crouch'?.45:.55);
   if(hero!==loadedHero){motionLab.reset({hero,count:1,view:'front',diagnostics:false});loadedHero=hero;}
   let t=0,n=0,time=0,noLockTime=0,bothAboveQuarterTime=0,transientNoLockTime=0,firstSupportAfterChange=null,doubleTime=0,noScheduleTime=0,longestNoLock=0,gap=0,scheduled=0,feasible=0,maxSlip=0,maxNearFloorUnlockedSpeed=0,maxSkinError=0,minPlantHeight=Infinity,maxPlantHeight=-Infinity,maxHeight=0,maxDrop=0,minDuty=1,maxDuty=0,minCycle=Infinity,maxCycle=0,minSeparation=Infinity,maxError=0,maxToeYaw=0,finite=true,unchanged=true,prior=null,priorPlayer=null,zeroTimeShift=0,probed=false;
   const stance=[null,null],durations=[],jitter=[1/120,1/40,1/75,1/30,1/90];
   while(t<3){
    const dt=timing==='jitter'?jitter[n%jitter.length]:1/Number(timing);t+=dt;
    const rt=root==='64'?Math.floor((t+1e-9)*64)/64:t,active=f.from&&rt<1?f.from:mode,activeSpeed=f.from&&rt<1?initialSpeed:speed,distance=f.from?Math.min(rt,1)*initialSpeed+Math.max(0,rt-1)*speed:rt*speed,player={slot:0,team:0,hero,weapon,life:1,position:[distance*side,0,-distance*forward],velocity:[activeSpeed*side,0,-activeSpeed*forward],yaw:0,pitch:0,alive:true,crouch:active==='crouch',scoped:active==='scoped',reload:0},before=JSON.stringify(player);
    if(f.from&&rt>=1&&!probed){const beforeSoles=motionLab.soleMetrics();motionLab.sample({player:{...player,position:[...priorPlayer.position]},dt:0,now:1+(t-dt)*1000,state:{phase:'live',config:{map:1},objective:{},tick:Math.floor((rt-dt)*64)}});const afterSoles=motionLab.soleMetrics();zeroTimeShift=Math.max(...afterSoles.map((s,i)=>Math.hypot(...s.center.map((v,j)=>v-beforeSoles[i].center[j]))));probed=true;}
    const r=motionLab.sample({player,dt,now:1+t*1000,state:{phase:'live',config:{map:1},objective:{},tick:Math.floor(rt*64)},invalidate:n===0?'room':null}),soles=motionLab.soleMetrics();finite&&=r.finite;unchanged&&=before===JSON.stringify(player);
    const supportedFeet=soles.map((s,i)=>r.feet[i].feasible&&r.feet[i].error<.02&&s.skinError<.02&&s.minHeight>-.5&&s.maxHeight<.5);
    if(f.from&&t>=1&&t<=1.5){if(!supportedFeet.some(Boolean))transientNoLockTime+=dt;else if(firstSupportAfterChange===null)firstSupportAfterChange=t-1;}
    if(t>(f.from?1.5:1)){
     time+=dt;let count=0;
     for(let i=0;i<2;i++){
      const s=soles[i],foot=r.feet[i],supported=supportedFeet[i];
      count+=Number(supported);scheduled+=Number(foot.scheduled);feasible+=Number(foot.feasible);
      if(supported&&prior?.[i].feasible&&s.plantId===prior[i].plantId)maxSlip=Math.max(maxSlip,Math.hypot(...s.center.map((v,j)=>v-prior[i].center[j])));
      if(supported){if(stance[i]?.id!==s.plantId){if(stance[i]&&!stance[i].partial)durations.push(stance[i].time);stance[i]={id:s.plantId,time:0,partial:t<(f.from?1.5:1)+dt*2};}stance[i].time+=dt;}
      else if(stance[i]){if(!stance[i].partial)durations.push(stance[i].time);stance[i]=null;}
      if(!supported&&s.minHeight<.25&&prior)maxNearFloorUnlockedSpeed=Math.max(maxNearFloorUnlockedSpeed,Math.hypot(...s.center.map((v,j)=>v-prior[i].center[j]))/dt);
      maxError=Math.max(maxError,foot.error);if(foot.feasible){maxSkinError=Math.max(maxSkinError,s.skinError);minPlantHeight=Math.min(minPlantHeight,s.minHeight);maxPlantHeight=Math.max(maxPlantHeight,s.maxHeight);}maxHeight=Math.max(maxHeight,s.maxHeight);maxDrop=Math.max(maxDrop,foot.drop);if(supported)maxToeYaw=Math.max(maxToeYaw,Math.abs(s.toeYaw));
     }
     if(soles.every(s=>s.minHeight>.25))bothAboveQuarterTime+=dt;
     if(!count){noLockTime+=dt;gap+=dt;longestNoLock=Math.max(longestNoLock,gap);}else gap=0;
     if(count===2)doubleTime+=dt;if(!r.feet.some(x=>x.scheduled))noScheduleTime+=dt;
     minSeparation=Math.min(minSeparation,soles[1].bounds.min[0]-soles[0].bounds.max[0]);
     minDuty=Math.min(minDuty,r.gait.duty);maxDuty=Math.max(maxDuty,r.gait.duty);minCycle=Math.min(minCycle,r.gait.cycleDuration);maxCycle=Math.max(maxCycle,r.gait.cycleDuration);
    }
    prior=soles;priorPlayer=player;n++;
   }
   rows.push({...f,d:undefined,direction,speed,frames:n,measuredTime:time,noLockFraction:noLockTime/time,bothAboveQuarterFraction:bothAboveQuarterTime/time,transientNoLockTime,firstSupportAfterChange,noScheduleFraction:noScheduleTime/time,doubleSupportFraction:doubleTime/time,longestNoLock,scheduled,feasible,maxSlip,maxNearFloorUnlockedSpeed,maxError,maxSkinError,minPlantHeight,maxPlantHeight,maxHeight,maxDrop,minDuty,maxDuty,minCycle,maxCycle,minSoleXSeparation:minSeparation,maxToeYaw,zeroTimeShift,stanceDurationRange:[Math.min(...durations),Math.max(...durations)],finite,unchanged});
   if(rows.length%24===0)await window.supportProgress(rows.length);
  }return rows;
 },{heroes:spec.heroes,weapons:spec.weapons,smoke:process.env.SMOKE==='1'});
 for(const [path,hash]of Object.entries(sources))assert.equal(createHash('sha256').update(await readFile(path)).digest('hex'),hash,'Source changed during collection: '+path);
 const failures=results.flatMap(r=>[...(!r.finite||!r.unchanged?['finite/native']:[]),...(r.maxError>.02||r.maxSkinError>.02||r.maxSlip>.02?['plant-slip']:[]),...(r.mode!=='run'&&r.noLockFraction>1e-9?['missing-support']:[]),...(r.mode!=='run'&&r.minSoleXSeparation<.25?['sole-lane-clearance']:[]),...(r.maxDrop>7.0001?['steady-reach']:[]),...(r.zeroTimeShift>.25?['style-discontinuity']:[]),...(r.from&&(r.firstSupportAfterChange===null||r.firstSupportAfterChange>.25)?['style-settling']:[])].map(gate=>({hero:r.hero,direction:r.direction,mode:r.mode,root:r.root,timing:r.timing,weapon:r.weapon,gate})));
 await writeFile(out+'/report.json',JSON.stringify({head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),scope:'Fixed-step independent skin support correctness; software timing is not hardware performance.',sources,bundleSha256:createHash('sha256').update(bundle.outputFiles[0].contents).digest('hex'),results,failures,errors},null,2));
 console.log(JSON.stringify({out,cases:results.length,failures:failures.length,unsupportedWalk:results.filter(r=>r.mode!=='run'&&r.noLockFraction>0).length,maxNoLock:Math.max(...results.filter(r=>r.mode!=='run').map(r=>r.noLockFraction)),maxSlip:Math.max(...results.map(r=>r.maxSlip))}));
 assert.deepEqual(errors,[]);if(process.env.REQUIRE_PASS!=='0')assert.deepEqual(failures,[]);
}finally{await browser.close();server.close();server.closeAllConnections();}
