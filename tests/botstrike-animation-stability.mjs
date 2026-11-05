import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
import {scenarios} from '../tools/motion-sequences.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-animation-stability';await mkdir(out,{recursive:true});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(180000);
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const fixtures=[];
 for(const reduced of [false,true])for(const scenario of scenarios){
  const r=await page.evaluate(config=>motionLab.run(config),{scenario,jitter:true,reduced,seconds:8,count:10});assert.ok(r.finite&&r.unchanged);if(reduced)assert.equal(r.debug.orientation,0);
  for(const stats of r.debug.contactStats){assert.ok(stats.scheduled>0&&stats.feasible/stats.scheduled>.75);assert.ok(stats.maxError<=2&&stats.maxSoleHeight<=2&&stats.maxSoleDrift<=2);assert.ok(stats.maxAnchorDrift<1e-6);}
  fixtures.push(r);
 }
 const resets=await page.evaluate(()=>{
  const cases=[];
  for(let hero=0;hero<6;hero++)for(const firstPerson of [false,true]){
   const config={hero,count:1,view:firstPerson?'first-person':'front'},p={slot:0,team:0,hero,weapon:2,position:[0,0,0],velocity:[0,0,-250],yaw:0,pitch:.4,life:1,alive:true,crouch:false,reload:0};
   motionLab.reset(config);let finite=true,peakBend=0,peakWrist=0;
   for(let cycle=0;cycle<100;cycle++)for(let frame=0;frame<24;frame++){
    const player={...p,life:cycle+1,alive:frame>1,position:[cycle%2*600,frame>=8&&frame<12?20:0,-frame*4],yaw:frame>15?Math.PI:0};
    const r=motionLab.sample({player,dt:[.012,.026,.009,.022][frame%4],invalidate:frame===0?cycle%2?'room':'visibility':null,events:frame===2?[{name:'fire',life:cycle+1}]:[]});finite&&=r.finite;
    for(const f of r.feet||[])peakBend=Math.max(peakBend,f.bend||0);for(const c of Object.values(r.contacts))peakWrist=Math.max(peakWrist,c.wrist||0);
   }
   const replay=()=>{motionLab.reset(config);let r;for(let frame=0;frame<90;frame++)r=motionLab.sample({player:{...p,position:[0,0,-frame*250/60]},now:frame*1000/60+1});return [...r.pose,...r.modelPose];};
   const a=replay(),b=replay();cases.push({hero,firstPerson,cycles:100,finite,peakBend,peakWrist,resetPoseError:Math.max(...a.map((v,i)=>Math.abs(v-b[i])))});
  }
  return cases;
 });
 for(const r of resets){assert.ok(r.finite);assert.ok(r.peakBend<=2.700001&&r.peakWrist<=1.100001);assert.ok(r.resetPoseError<1e-6,JSON.stringify(r));}
 assert.deepEqual(errors,[]);await writeFile(`${out}/measurements.json`,JSON.stringify({fixtures,resets},null,2));console.log(JSON.stringify({jitterFixtures:fixtures.length,rigs:10,lifecycleCycles:1200,frames:28800,out}));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
