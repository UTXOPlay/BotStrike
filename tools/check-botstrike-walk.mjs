// Review a full steady walking cycle from three cameras on all six chassis.
// Fixed-step images complement, rather than replace, a human motion review.
import {mkdir,writeFile} from 'node:fs/promises';
import {startMotionLab} from './serve-botstrike-motion-lab.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const out=process.env.ART_OUTPUT||'/tmp/botstrike-walk-review';await mkdir(out,{recursive:true});
const server=await startMotionLab(),browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:960,height:540}});page.setDefaultTimeout(180000);
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>motionLabReady);
 const manifest=await page.evaluate(()=>fetch('./manifest.json').then(r=>r.json())),frames=[];
 await page.addStyleTag({content:'aside{display:none}'});
 for(let hero=0;hero<6;hero++)for(const view of ['front','side','feet']){
  await page.evaluate(config=>motionLab.run(config),{hero,view,scenario:'walk',seconds:.8,diagnostics:false});
  for(let frame=0;frame<8;frame++){
   if(frame)await page.evaluate(()=>{for(let i=0;i<6;i++)motionLab.step(1/60);});
   const file=`${hero}-${view}-${frame}.png`;
   await page.screenshot({path:`${out}/${file}`,clip:{x:300,y:40,width:360,height:450}});
   frames.push({hero,view,frame,time:.8+frame*.1,file,feet:await page.evaluate(()=>motionLab.diagnostics()[0].feet),soles:await page.evaluate(()=>motionLab.soleMetrics())});
  }
 }
 await writeFile(`${out}/frames.json`,JSON.stringify({manifest,frames},null,2));console.log(JSON.stringify({frames:frames.length,out}));
}finally{await browser.close();server.close();server.closeAllConnections();}
