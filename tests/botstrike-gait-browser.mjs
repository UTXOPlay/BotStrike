import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {mkdtemp,readFile,mkdir,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createServer} from 'node:http';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const dir=await mkdtemp(join(tmpdir(),'botstrike-gait-'));
const out=process.env.ART_OUTPUT||dir;
await mkdir(out,{recursive:true});
await build({entryPoints:['tools/botstrike-art-preview.mjs'],bundle:true,format:'esm',outfile:join(dir,'preview.js')});
const js=await readFile(join(dir,'preview.js'));
const server=createServer(async(req,res)=>{
 res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
 if(/^\/models\/(?:[a-z]+\.glb|textures\/[a-z0-9-]+\.webp)$/.test(req.url)){res.setHeader('Content-Type',req.url.endsWith('.webp')?'image/webp':'model/gltf-binary');return res.end(await readFile('games/botstrike/web'+req.url))}
 res.setHeader('Content-Type',req.url==='/preview.js'?'text/javascript':'text/html');
 res.end(req.url==='/preview.js'?js:'<!doctype html><html><style>html,body{margin:0;background:#09121d}canvas{display:block;width:100vw;height:100vh}</style><canvas></canvas><script type="module" src="/preview.js"></script></html>');
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1920,height:1080}});
const errors=[];page.on('pageerror',error=>errors.push(error.message));page.setDefaultTimeout(60000);
const span=values=>Math.max(...values)-Math.min(...values);
const correlation=(a,b)=>{const ax=a.reduce((sum,n)=>sum+n,0)/a.length,bx=b.reduce((sum,n)=>sum+n,0)/b.length;let top=0,left=0,right=0;for(let i=0;i<a.length;i++){const x=a[i]-ax,y=b[i]-bx;top+=x*y;left+=x*x;right+=y*y}return top/Math.sqrt(left*right)};
try{
 await page.goto(`http://127.0.0.1:${server.address().port}`);
 await page.waitForFunction(()=>window.artReady);
 await page.evaluate(()=>renderLineup(true));
 const samples=await page.evaluate(()=>probeRunGroup());
 await page.screenshot({path:join(out,'running-group.png')});
 await writeFile(join(out,'gait.json'),JSON.stringify(samples,null,2));
 const rootRange=samples.map(actor=>span(actor.root)),hipRange=samples.map(actor=>span(actor.hip));
 const phaseCorrelation=correlation(samples[0].root,samples[1].root);
 await page.evaluate(()=>renderLineup(true));
 const jittered=await page.evaluate(()=>probeRunGroup(true));
 await page.screenshot({path:join(out,'running-group-jitter.png')});
 await writeFile(join(out,'gait-jitter.json'),JSON.stringify(jittered,null,2));
 await page.evaluate(()=>renderHero(0));
 const jump=await page.evaluate(()=>probeMotion('jump',.2));
 const fall=await page.evaluate(()=>probeMotion('fall',.2));
 await page.evaluate(()=>renderHero(0));
 const miss=await page.evaluate(()=>probeRunningContact());
 await page.screenshot({path:join(out,'running-miss.png')});
 await page.evaluate(()=>renderHero(0));
 const hit=await page.evaluate(()=>probeRunningContact(true));
 await page.screenshot({path:join(out,'running-hit.png')});
 await page.evaluate(()=>renderHero(0));
 const hitFire=await page.evaluate(()=>probeRunningContact(true,true));
 await page.screenshot({path:join(out,'running-hit-fire.png')});
 await page.evaluate(()=>renderHero(0));
 const reducedMiss=await page.evaluate(()=>probeRunningContact(false,false,true));
 await page.evaluate(()=>renderHero(0));
 const reducedHit=await page.evaluate(()=>probeRunningContact(true,false,true));
 await page.evaluate(()=>renderHero(0));
 const recoveredMiss=await page.evaluate(()=>probeRunningContact(false,false,false,40));
 await page.evaluate(()=>renderHero(0));
 const recoveredHit=await page.evaluate(()=>probeRunningContact(true,false,false,40));
 await page.evaluate(()=>renderHero(0));
 const repeatedHit=await page.evaluate(()=>probeRunningContact(true,false,false,8,true));
 const poseDistance=(a,b)=>Math.hypot(a.chest[0]-b.chest[0],a.chest[2]-b.chest[2],a.head[0]-b.head[0],a.head[2]-b.head[2]);
 const hitPose=poseDistance(hit,miss),hitFirePose=poseDistance(hitFire,miss),reducedHitPose=poseDistance(reducedHit,reducedMiss),recoveryPose=poseDistance(recoveredHit,recoveredMiss),repeatedPose=poseDistance(repeatedHit,miss);
 await writeFile(join(out,'hit-pose.json'),JSON.stringify({miss,hit,hitFire,reducedMiss,reducedHit,recoveredMiss,recoveredHit,repeatedHit,hitPose,hitFirePose,reducedHitPose,recoveryPose,repeatedPose},null,2));
 assert.deepEqual(errors,[]);
 assert.ok(samples.every(actor=>actor.motion.every(name=>name==='lower:run')),'every actor uses the run clip');
 assert.equal(jump.motion,'lower:jump');
 assert.equal(fall.motion,'lower:fall');
 if(!process.env.GAIT_BASELINE){
  assert.ok(Math.abs(phaseCorrelation)<.9,`running actors still share the same gait phase: ${phaseCorrelation}`);
  assert.ok(new Set(samples.map(actor=>actor.root[0].toFixed(2))).size>=4,'running actors still pose together');
  assert.ok(new Set(jittered.map(actor=>actor.root[0].toFixed(2))).size>=4,'irregular frame times synchronized the group');
  for(const [label,actors]of [['steady',samples],['jittered',jittered]]){
   assert.equal(actors[0].ground.length,60,`${label} run clip has missing mesh samples`);
   assert.ok(actors[0].ground.every(y=>y>=-1&&y<=.5),`${label} run clip lost ground contact`);
  }
 }
 if(!process.env.HIT_BASELINE){assert.ok(hitPose>.4,`confirmed hit pose is too subtle: ${hitPose}`);assert.ok(hitFirePose>.4,`gunfire cancelled the hit pose: ${hitFirePose}`);assert.ok(reducedHitPose>.1&&reducedHitPose<hitPose,`reduced-motion hit cue was lost or amplified: ${reducedHitPose}`);assert.ok(recoveryPose<.05,`hit pose did not recover: ${recoveryPose}`);assert.ok(repeatedPose<.8,`repeated hit pose accumulated: ${repeatedPose}`)}
 let nativeMotion=null;
 if(process.env.STORE_URL){
  const live=await browser.newPage({viewport:{width:844,height:390}});
  try{
   await live.goto(process.env.STORE_URL+'/games/botstrike/');
   await live.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
   await live.locator('#practice').click();
   await live.waitForFunction(()=>document.documentElement.dataset.playing==='true');
   nativeMotion=await live.evaluate(async()=>{
    const bots=[];
    for(let i=0;i<35;i++){
     const room=(await(await fetch('/games/botstrike/api/state')).json()).room;
     for(const p of room.state.players.slice(1))if(p.alive&&p.position&&p.velocity)bots.push({height:p.position[1],vertical:p.velocity[1],speed:Math.hypot(p.velocity[0],p.velocity[2])});
     await new Promise(resolve=>setTimeout(resolve,50));
    }
    return bots;
   });
   assert.ok(nativeMotion.some(p=>p.speed>20),'live bots moved during the sample');
   assert.ok(nativeMotion.every(p=>p.height===0&&p.vertical===0),'AI motion changed native height');
   await writeFile(join(out,'native-motion.json'),JSON.stringify(nativeMotion,null,2));
   await live.keyboard.press('Space',{delay:80});
   await live.waitForFunction(async()=>{const room=(await(await fetch('/games/botstrike/api/state')).json()).room;return room.state.players[room.slot].position[1]>1});
  }finally{await leaveBrowserRoom(live);await live.close()}
 }
 console.log(JSON.stringify({rootRange,hipRange,phaseCorrelation,groundRange:[Math.min(...samples[0].ground),Math.max(...samples[0].ground)],jitteredGroundRange:[Math.min(...jittered[0].ground),Math.max(...jittered[0].ground)],hitPose,hitFirePose,reducedHitPose,recoveryPose,repeatedPose,nativeBotSamples:nativeMotion?.length,out}));
}finally{await browser.close();server.close()}
