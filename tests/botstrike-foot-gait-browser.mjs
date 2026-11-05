import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {startMotionLab} from '../tools/serve-botstrike-motion-lab.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-foot-gait';await mkdir(out,{recursive:true});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(180000);await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const results=await page.evaluate(()=>{
  const results=[];
  for(let hero=0;hero<6;hero++)for(const [gait,speed,crouch]of [['walk',100,false],['run',250,false],['crouch',90,true]]){
   motionLab.reset({hero,count:1,view:'front'});let maxLift=0,maxToeAngle=0,maxLaneRatio=0,maxPelvisDrop=0,pelvisDropTotal=0,finite=true,contacts=0,samples=0;
   for(let frame=0;frame<180;frame++){
    const player={slot:0,team:0,hero,weapon:2,position:[0,0,-frame*speed/60],velocity:[0,0,-speed],yaw:0,pitch:0,life:1,alive:true,crouch,reload:0};
    const r=motionLab.sample({player,now:frame*1000/60+1});finite&&=r.finite;
    const drop=motionLab.diagnostics()[0].feet[0].drop;maxPelvisDrop=Math.max(maxPelvisDrop,drop);pelvisDropTotal+=drop;
    const feet=motionLab.soleMetrics();if(feet.length===2)maxLaneRatio=Math.max(maxLaneRatio,Math.abs(feet[0].center[0]-feet[1].center[0])/feet[0].hipWidth);
    for(const f of feet){samples++;if(f.feasible){contacts++;maxToeAngle=Math.max(maxToeAngle,Math.abs(f.toeYaw));}maxLift=Math.max(maxLift,f.maxHeight);}
   }
   results.push({hero,gait,maxLift,maxToeAngle,maxLaneRatio,maxPelvisDrop,meanPelvisDrop:pelvisDropTotal/180,finite,contacts,samples});
  }
  return results;
 });
 await writeFile(`${out}/measurements.json`,JSON.stringify(results,null,2));
 for(const r of results){assert.ok(r.finite&&r.contacts/r.samples>(r.gait==='run'?.20:.35),JSON.stringify(r));assert.ok(r.maxToeAngle<.03,JSON.stringify(r));assert.ok(r.maxLaneRatio<(r.gait==='crouch'?1.8:1.45),JSON.stringify(r));assert.ok(r.maxLift<({walk:1.6,run:4.1,crouch:1.3}[r.gait]),JSON.stringify(r));if(r.gait==='walk')assert.ok(r.meanPelvisDrop<2.5&&r.maxPelvisDrop<5,'walking pelvis must recover from support reach correction: '+JSON.stringify(r));}
 assert.deepEqual(errors,[]);console.log(JSON.stringify({cases:results.length,results,out}));
}finally{await browser.close();server.close();server.closeAllConnections();}
