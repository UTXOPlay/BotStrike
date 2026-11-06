import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {hitVolumes} from '../games/botstrike/client/hit-regions.mjs';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const engine=process.env.BOTSTRIKE_TEST_ENGINE||'release/botstrike-engine',out=process.env.ART_OUTPUT||'/tmp/botstrike-tactical-hit-inspector';await mkdir(out,{recursive:true});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']}),page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(180000);
try{
 await page.goto('http://127.0.0.1:'+server.address().port);await page.evaluate(()=>motionLabReady);await page.evaluate(()=>motionLab.stop());const results=[];
 for(let hero=0;hero<6;hero++){
  const config={map:0,mode:'deathmatch',heroes:Array(10).fill(hero),bots:Array(10).fill(false),difficulty:1,seed:2050};
  const tape=JSON.stringify({config})+'\n'+Array.from({length:96},(_,t)=>JSON.stringify({inputs:[{crouch:t>=8&&t<40},...Array(9).fill(null)]})).join('\n')+'\n';
  const frames=execFileSync(engine,[],{input:tape,maxBuffer:12e6}).toString().trim().split('\n').map(JSON.parse).filter(v=>v.type==='frame');
  for(const tick of [0,10,39,48,95])for(const pitch of tick===0||tick===39?[-1.3,0,1.3]:[0]){
   const player={...frames[tick].state.players[0],position:[0,0,0],yaw:0,pitch},stance=player.stance;
   const volume=hitVolumes(player.position,stance,[player.yaw,player.pitch]),up=[0,Math.cos(volume.head_pitch),Math.sin(volume.head_pitch)],probe={origin:volume.head.map((v,a)=>v+up[a]*100),direction:up.map(v=>-v),position:[0,0,0],stance,yaw:0,pitch};
   const native=JSON.parse(execFileSync(engine,['hit-probe'],{input:JSON.stringify(probe)+'\n'}));assert.equal(native.hit.region,'head');
   const result=await page.evaluate(({hero,player,probe,native})=>{motionLab.reset({hero,count:1,view:'front',hitRegions:true,diagnostics:false});const sample=motionLab.sample({player,now:1000});const trace=motionLab.inspectRay({...probe,hit:native.hit});motionLab.render();return {trace,finite:sample.finite,stance:sample.posture.crouchAmount,head:motionLab.bodyMetrics().points.head,headMesh:motionLab.headMetrics()};},{hero,player,probe,native});
   assert.ok(result.finite);assert.ok(Math.abs(result.trace.renderedHeadDistance-native.hit.distance)<1e-6,JSON.stringify(result.trace));assert.ok(Math.abs(result.stance-stance)<1e-12);const delta=result.head.map((x,a)=>x-native.volumes.head[a]),phi=native.volumes.head_pitch,local=[delta[0],Math.cos(phi)*delta[1]+Math.sin(phi)*delta[2],-Math.sin(phi)*delta[1]+Math.cos(phi)*delta[2]];
   assert.ok(local.every((x,a)=>Math.abs(x)<=native.volumes.head_half_extents[a]),JSON.stringify({hero,tick,pitch,joint:result.head,volumes:native.volumes,local}));results.push({hero,tick,pitch,nativeStance:stance,volumes:native.volumes,...result});
   if((tick===0||tick===39)&&pitch===0)await page.screenshot({path:`${out}/hero-${hero}-${tick===0?'standing':'crouched'}.png`});
  }
 }
 assert.deepEqual(errors,[]);await writeFile(out+'/measurements.json',JSON.stringify({normalizedRoots:true,scope:'Native stance, development overlay and finite-transform checks; screenshots require visual/human review.',results},null,2));console.log(JSON.stringify({cases:results.length,captures:12,out}));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
