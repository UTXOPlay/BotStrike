import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
import {scenarios} from '../tools/motion-sequences.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-locomotion';await mkdir(out,{recursive:true});
const server=await startMotionLab();
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[];
page.on('pageerror',error=>errors.push(error.message));page.setDefaultTimeout(180000);
try{
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const results=[];
 for(const fps of [30,60,120])for(const scenario of scenarios){
  const r=await page.evaluate(config=>motionLab.run(config),{scenario,fps,seconds:6,count:10});
  assert.equal(r.finite,true,`${scenario}/${fps}: invalid or accumulated transforms`);
  assert.equal(r.unchanged,true,`${scenario}/${fps}: actor mutated native state`);
  assert.ok(Object.values(r.debug.weights).every(Number.isFinite));results.push(r);
 }
 for(const scenario of scenarios){
  const r=await page.evaluate(config=>motionLab.run(config),{scenario,jitter:true,reduced:true,seconds:6,count:10});
  assert.equal(r.finite,true);assert.equal(r.unchanged,true);assert.equal(r.debug.orientation,0);results.push(r);
 }
 const comparison=[];
 // Warm both paths before recording CPU. These are software-browser CPU samples,
 // not representative hardware budgets or GPU/input-latency measurements.
 for(const mode of ['baseline','candidate'])await page.evaluate(mode=>motionLab.run({mode,scenario:'circle',seconds:2}),mode);
 for(const mode of ['baseline','candidate']){
  comparison.push(await page.evaluate(mode=>motionLab.run({mode,scenario:'circle',seconds:2.5}),mode));
  await page.screenshot({path:`${out}/${mode}-circle.png`});
 }
 for(const [width,height]of [[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844],[844,390]]){
  await page.setViewportSize({width,height});
  const r=await page.evaluate(()=>motionLab.run({scenario:'turn_fire',seconds:2.5,count:10}));
  assert.ok(r.backing[0]*r.backing[1]<=2560*1440+2560,'lab backing resolution exceeds the budget');
  assert.equal(r.finite,true);await page.screenshot({path:`${out}/viewport-${width}x${height}.png`});
 }
 // Detect additive pose accumulation by replaying the exact fixture twice.
 const repeat=()=>page.evaluate(()=>motionLab.run({scenario:'reload',seconds:3,count:10}));
 const a=await repeat(),b=await repeat();
 for(const side of ['L','R'])for(let i=0;i<3;i++)assert.ok(Math.abs(a.debug.feet[side].position[i]-b.debug.feet[side].position[i])<1e-5,'restarting a sequence retained a bone offset');
 assert.deepEqual(errors,[]);
 await writeFile(`${out}/measurements.json`,JSON.stringify({results,comparison},null,2));
 console.log(JSON.stringify({fixtures:results.length,rigsPerFixture:10,chassis:6,viewports:6,comparison:comparison.map(({mode,cpuMs,maxEstimatedFootDrift,renderer})=>({mode,cpuMs,maxEstimatedFootDrift,renderer})),out}));
}finally{await browser.close();server.close();}
