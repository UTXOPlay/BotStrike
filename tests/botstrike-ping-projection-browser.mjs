import assert from 'node:assert/strict';import {mkdirSync,writeFileSync} from 'node:fs';import {startCommsProjectionAudit} from '../tools/serve-comms-projection-audit.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright'),out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-ping-projection';mkdirSync(out,{recursive:true});const server=await startCommsProjectionAudit(),browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader']}),rows=[],errors=[];
try{
 const page=await browser.newPage();page.setDefaultTimeout(60000);page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>!!window.CommsProjectionAudit);const manifest=await(await page.request.get('http://127.0.0.1:'+server.address().port+'/manifest.json')).json();
 for(const [width,height]of [[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844],[844,390]]){
  await page.setViewportSize({width,height});for(const fov of [20,38,80,110])for(const eyeHeight of [56,200,500]){
   await page.evaluate(config=>window.CommsProjectionAudit.set(config),{fov,height:eyeHeight,mapId:0});
   for(const [u,v]of [[.5,.5],[.2,.7],[.8,.7],[.5,.9]]){await page.mouse.click(width*u,height*v);const row=await page.evaluate(()=>window.CommsProjectionAudit.result());rows.push({width,height,fov,eyeHeight,...row});assert.equal(!!row.actual,!!row.mesh,JSON.stringify(rows.at(-1)));if(row.actual){assert.ok(Math.hypot(...row.actual.map((n,i)=>n-row.mesh[i]))<1e-5,JSON.stringify(rows.at(-1)));assert.ok(row.screenError<1e-5);}assert.ok(row.backing[0]*row.backing[1]<=2560*1440);}
  }await page.screenshot({path:`${out}/native-hulls-${width}x${height}.png`});
 }
 assert.deepEqual(errors,[]);writeFileSync(out+'/measurements.json',JSON.stringify({automated:true,humanParticipants:0,manifest,rows,errors},null,2));console.log(JSON.stringify({pointerCases:rows.length,viewports:6,maximumScreenError:Math.max(...rows.map(r=>r.screenError||0)),errors}));
}catch(error){writeFileSync(out+'/failure.json',JSON.stringify({error:String(error),rows,errors},null,2));throw error;}finally{await browser.close();await new Promise(r=>server.close(r));}
