import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-flight-reconstruction';await mkdir(out,{recursive:true});
const sha=b=>createHash('sha256').update(b).digest('hex'),engine=process.env.BOTSTRIKE_NATIVE_ENGINE||'release/botstrike-engine';
const spec=JSON.parse(await readFile('botstrike/spec.json'));assert.deepEqual(JSON.parse(execFileSync(engine,['spec'])),spec,'native binary uses the checked-in specification');
const paths=['games/botstrike/client/flight-phase.mjs','games/botstrike/client/animation-motion.mjs','games/botstrike/client/locomotion-blend.mjs','games/botstrike/client/animation-springs.mjs','games/botstrike/client/characters.mjs','botstrike/src/lib.rs','tools/botstrike-motion-lab.mjs','tests/botstrike-flight-reconstruction-browser.mjs'];
const sourceSha256=Object.fromEntries(await Promise.all(paths.map(async p=>{try{return [p,sha(await readFile(p))];}catch{return [p,null];}})));
const fixtures=[];
for(let hero=0;hero<6;hero++)for(const mode of ['still','enter','release','fire']){
 const config={map:1,mode:'deathmatch',heroes:Array(10).fill(hero),bots:Array(10).fill(false),difficulty:1,seed:2050};
 const controls=Array.from({length:226},(_,i)=>{const tick=i+1,jumpTick=tick-60;return {seq:tick,weapon:2,x:mode==='still'?0:.3,y:mode==='still'?0:.5,yaw:.3,pitch:.1,jump:tick===61||tick===107||tick===181,crouch:mode==='enter'?jumpTick>=10:mode==='release'?jumpTick<10:false,fire:mode==='fire'&&jumpTick>=8&&jumpTick<20};});
 const tape=JSON.stringify({config})+'\n'+controls.map(p=>JSON.stringify({inputs:[p,...Array(9).fill(null)]})).join('\n')+'\n';
 const native=execFileSync(engine,[],{input:tape,maxBuffer:8e6}).toString().trim().split('\n').map(JSON.parse),frames=native.filter(f=>f.type==='ready'||f.type==='frame');
 const players=frames.map(f=>Object.fromEntries(['slot','team','hero','weapon','position','velocity','yaw','pitch','life','alive','crouch','scoped','reload','shots'].map(k=>[k,f.state.players[0][k]])));
 assert.equal(players[61].velocity[1],210.625);assert.equal(players[72].position[1],29.82421875);assert.equal(players[72].velocity[1],107.5);assert.equal(players[106].position[1],0);assert.equal(players[107].velocity[1],210.625);
 fixtures.push({hero,mode,map:1,tapeSha256:sha(tape),nativeResult:native.at(-1).result,players});
}
// Both versions use the same actor-only sample collector. Refreshing inactive
// actors dominated long correctness matrices on the shared laptop. The probe
// compares every active world/bind matrix against a full-scene refresh below.
const collector=source=>{const start=source.indexOf('  sample({player,'),end=source.indexOf('  matrixWork(',start);assert.ok(start>=0&&end>start);return source.slice(0,start)+source.slice(start,end).replaceAll('scene.updateMatrixWorld(true);','a.rig.parent.updateWorldMatrix(true,false);a.rig.updateMatrixWorld(true);')+source.slice(end);};
const bundle=await build({entryPoints:['tools/botstrike-motion-lab.mjs'],bundle:true,format:'esm',write:false,plugins:[{name:'flight-clock-probe',setup(b){b.onLoad({filter:/\/botstrike-motion-lab\.mjs$/},async a=>({loader:'js',resolveDir:a.path.slice(0,a.path.lastIndexOf('/')),contents:collector(await readFile(a.path,'utf8')).replace('installHardwareBenchmark(window.motionLab,options);',`
window.motionLab.flightState=()=>{const a=actors[current.mode][0];return {clock:[...a.animation.blend.times],durations:[...a.animation.blend.durations],continuity:a.animation.signals.flightContinuity??false,crouch:a.animation.signals.crouchAmount};};
window.motionLab.worldRefreshDelta=()=>{const a=actors[current.mode][0],values=[];a.rig.traverse(o=>{values.push([o,o.matrixWorld.elements.slice(),o.isSkinnedMesh?o.bindMatrixInverse.elements.slice():null]);});scene.updateMatrixWorld(true);let delta=0;for(const [o,m,b]of values)for(let i=0;i<16;i++){delta=Math.max(delta,Math.abs(m[i]-o.matrixWorld.elements[i]));if(b)delta=Math.max(delta,Math.abs(b[i]-o.bindMatrixInverse.elements[i]));}return delta;};
installHardwareBenchmark(window.motionLab,options);`)}));}}]});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(180000);
 await page.route('**/lab.js',r=>r.fulfill({body:Buffer.from(bundle.outputFiles[0].contents),contentType:'text/javascript'}));await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const results=await page.evaluate(({fixtures,smoke})=>{
  motionLab.stop();const resets=[],gaps=[],cold=[],lifecycle=[];let worldRefreshChecks=0,maxWorldRefreshDelta=0;
  const compare=(a,b)=>{
   let localShift=0,boneAngle=0;for(let i=0;i<a.frame.pose.length;i+=7){localShift=Math.max(localShift,Math.hypot(...a.frame.pose.slice(i,i+3).map((v,j)=>v-b.frame.pose[i+j])));let dot=0;for(let j=3;j<7;j++)dot+=a.frame.pose[i+j]*b.frame.pose[i+j];boneAngle=Math.max(boneAngle,2*Math.acos(Math.min(1,Math.abs(dot))));}
   return {jointShift:Math.max(...Object.keys(a.body.points).map(k=>Math.hypot(...a.body.points[k].map((v,j)=>v-b.body.points[k][j])))),handShift:Math.max(...['L','R'].map(k=>Math.hypot(...a.frame.contacts[k].position.map((v,j)=>v-b.frame.contacts[k].position[j])))),localShift,boneAngle,recoilShift:Math.max(...a.frame.springs.recoil.map((v,i)=>Math.abs(v-b.frame.springs.recoil[i]))),crouchShift:Math.abs(a.clock.crouch-b.clock.crouch),weightShift:Math.max(...a.frame.gait.weights.map((v,i)=>Math.abs(v-b.frame.gait.weights[i]))),riseShift:Math.abs(a.frame.posture.riseProgress-b.frame.posture.riseProgress)};
  };
  const snapshot=frame=>({frame,clock:motionLab.flightState(),body:motionLab.bodyMetrics()});
  const sample=(f,index,now,dt,extra={})=>motionLab.sample({player:f.players[index],state:{tick:index,phase:'live',config:{map:f.map},objective:{}},now,dt,...extra});
  const expected=(p,c)=>({riseError:Math.abs(c.clock[8]/c.durations[8]-Math.max(0,Math.min(1,1-Math.max(0,p.velocity[1])/210.625))),fallError:p.velocity[1]<=0?Math.abs(c.clock[9]-Math.min(-p.velocity[1]/600,c.durations[9])):0});
  const prepare=(f,tick,fps)=>{
   let time=0,frame=0,previous=0,result=sample(f,0,1,0,{invalidate:'room'});const end=(60+tick)/64;
   while(time<end-1e-10){const dt=Math.min(fps?1/fps:[.012,.026,.009,.022,.014][frame%5],end-time);time+=dt;const index=Math.min(60+tick,Math.floor(time*64+1e-8)),events=f.mode==='fire'&&previous<68&&index>=68?[{name:'fire',life:f.players[index].life}]:[];result=sample(f,index,1+time*1000,dt,{events});previous=index;frame++;}
   return snapshot(result);
  };
  for(let hero=0;hero<6;hero++)for(const firstPerson of [false,true]){
   motionLab.reset({hero,count:1,view:firstPerson?'first-person':'side',diagnostics:false});
   for(const f of fixtures.filter(f=>f.hero===hero&&(smoke?['still','enter'].includes(f.mode):true)))for(const fps of smoke?[60]:[30,60,120,0]){
    for(const tick of smoke?[12,38]:[2,12,22,26,38]){
     const before=prepare(f,tick,fps),p=f.players[60+tick];
     if(fps===60&&tick===12){const delta=motionLab.worldRefreshDelta();if(delta>1e-8)throw Error('Actor-only collector changed world/bind matrices');maxWorldRefreshDelta=Math.max(maxWorldRefreshDelta,delta);worldRefreshChecks++;}
     for(const reason of smoke?['visibility']:['visibility','gap','correction']){
     const nativeBefore=JSON.stringify(p),frame=sample(f,60+tick,1+(60+tick)*1000/64,0,{invalidate:reason}),after=snapshot(frame);
     resets.push({hero,firstPerson,mode:f.mode,fps:fps||'jitter',tick,reason,...compare(before,after),beforePhase:expected(p,before.clock),afterPhase:expected(p,after.clock),continuity:after.clock.continuity,finite:before.frame.finite&&frame.finite,unchanged:JSON.stringify(p)===nativeBefore,airLocks:frame.feet?.filter(x=>x.feasible).length||0});
     }
    }
    for(const [from,to]of [[4,22],[12,34],[26,44]]){
     prepare(f,from,fps);const p=f.players[60+to],nativeBefore=JSON.stringify(p),r=sample(f,60+to,1+(60+to)*1000/64,(to-from)/64),c=motionLab.flightState();
     gaps.push({hero,firstPerson,mode:f.mode,fps:fps||'jitter',from,to,...expected(p,c),continuity:c.continuity,finite:r.finite,unchanged:JSON.stringify(p)===nativeBefore,airLocks:r.feet?.filter(x=>x.feasible).length||0});
    }
   }
   for(const f of fixtures.filter(f=>f.hero===hero))for(const tick of [12,26,38]){
    const p=f.players[60+tick],r=sample(f,60+tick,1,0,{invalidate:'room'}),c=motionLab.flightState();cold.push({hero,firstPerson,mode:f.mode,tick,...expected(p,c),continuity:c.continuity,finite:r.finite});
   }
   const f=fixtures.find(f=>f.hero===hero&&f.mode==='enter');
   for(const kind of ['room','map','life','landing','next-flight','rapid-next-flight']){
    prepare(f,kind==='rapid-next-flight'?1:12,60);let index=kind==='landing'?106:kind==='next-flight'?192:kind==='rapid-next-flight'?107:72,now=kind==='next-flight'?3001:kind==='rapid-next-flight'?1+107*1000/64:1201,p={...f.players[index]},map=f.map;if(kind==='life')p.life++;if(kind==='map')map=2;
    const nativeBefore=JSON.stringify(p),r=motionLab.sample({player:p,state:{tick:index,phase:'live',config:{map},objective:{}},now,dt:0,invalidate:kind==='room'?'room':'visibility',events:kind==='life'?[{name:'fire',life:p.life}]:[]}),c=motionLab.flightState();
    lifecycle.push({hero,firstPerson,kind,continuity:c.continuity,finite:r.finite,unchanged:JSON.stringify(p)===nativeBefore,crouch:c.crouch,expectedCrouch:Number(p.crouch),freshAction:r.action,recoil:r.springs.recoil[0],grounded:r.posture.grounded});
   }
  }
  return {resets,gaps,cold,lifecycle,collector:{worldRefreshChecks,maxWorldRefreshDelta}};
 },{fixtures,smoke:process.env.SMOKE==='1'});
 await writeFile(out+'/report.json',JSON.stringify({scope:'F04 real native-engine snapshots; software correctness, timing advisory',resetMethod:'Each reason in a same-time chain compares against the original outgoing pose. Unit tests also check the three reasons independently.',nativeEngineSha256:sha(await readFile(engine)),sourceSha256,bundleSha256:sha(bundle.outputFiles[0].contents),fixtures,results,errors},null,2));
 const bad={resets:results.resets.filter(r=>!r.finite||!r.unchanged||r.airLocks||!r.continuity||r.jointShift>.25||r.handShift>.25||r.localShift>.001||r.boneAngle>.003||r.recoilShift>1e-10||r.crouchShift>1e-10||r.weightShift>1e-10||r.riseShift>1e-10||r.beforePhase.riseError>1e-10||r.afterPhase.riseError>1e-10||r.afterPhase.fallError>1e-10),gaps:results.gaps.filter(r=>!r.finite||!r.unchanged||r.airLocks||!r.continuity||r.riseError>1e-10||r.fallError>1e-10),cold:results.cold.filter(r=>!r.finite||r.continuity||r.riseError>1e-10||r.fallError>1e-10),lifecycle:results.lifecycle.filter(r=>!r.finite||!r.unchanged||r.continuity||r.crouch!==r.expectedCrouch||r.kind==='life'&&(r.freshAction.upper!=='upper:fire'||r.recoil<=0)||r.kind==='landing'&&!r.grounded)};
 console.log(JSON.stringify({cases:Object.fromEntries(['resets','gaps','cold','lifecycle'].map(k=>[k,results[k].length])),failures:Object.fromEntries(Object.entries(bad).map(([k,v])=>[k,v.length])),maxJointShift:Math.max(...results.resets.map(r=>r.jointShift)),collector:results.collector,out}));
 assert.deepEqual(errors,[]);for(const [group,rows]of Object.entries(bad))assert.equal(rows.length,0,group+': '+JSON.stringify(rows[0]));
}finally{await browser.close();server.close();server.closeAllConnections();}
