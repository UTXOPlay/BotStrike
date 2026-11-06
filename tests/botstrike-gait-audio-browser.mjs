import assert from 'node:assert/strict';import {mkdirSync,writeFileSync} from 'node:fs';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright'),out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-gait-audio';mkdirSync(out,{recursive:true});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader','--mute-audio']}),runs=[],errors=[];
try{
 const page=await browser.newPage({viewport:{width:1200,height:800}});page.on('pageerror',e=>errors.push(String(e)));await page.goto('http://127.0.0.1:'+server.address().port);await page.evaluate(()=>window.motionLabReady);
 for(let hero=0;hero<6;hero++)for(const fps of [30,60,120])for(const reduced of [false,true]){
  const run=await page.evaluate(config=>window.motionLab.auditAudioGait(config),{hero,fps,reduced});runs.push(run);writeFileSync(out+'/measurements.json',JSON.stringify({automated:true,humanParticipants:0,runs,errors},null,2));
  assert.ok(run.finite&&run.unchanged);assert.ok(run.phaseError<1e-10);assert.ok(run.matched.length>10);
  for(const match of run.matched){assert.ok(match.contact?.stance,JSON.stringify({hero,fps,reduced,match}));assert.ok(Math.abs(match.contact.at-match.tick/64)<=1/fps+1/64);assert.ok(match.contact.meshSoleHeight<1.5,JSON.stringify({hero,fps,reduced,match}));}
  console.log(JSON.stringify({hero,fps,reduced,matched:run.matched.length,maxMeshSoleHeight:Math.max(...run.matched.map(m=>m.contact.meshSoleHeight)),p95:run.cpuMs.p95}));
 }
 assert.deepEqual(errors,[]);console.log('All service-clock foot contacts matched the real skinned meshes at 30/60/120 Hz. Software rendering only; no physical audio acceptance.');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
