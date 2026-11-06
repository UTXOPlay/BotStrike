import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19894',out=process.env.CADENCE_ARTIFACTS||'/tmp/botstrike-v3-render-cadence';
mkdirSync(out,{recursive:true});
// Uncap headless RAF so this verifies actual draw callbacks at 120, rather than
// pretending that a requested packet cadence measures browser rendering.
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader','--disable-frame-rate-limit','--disable-gpu-vsync']});
const results=[];
const record=()=>writeFileSync(out+'/measurements.json',JSON.stringify({automated:true,physicalDisplayAccepted:false,viewport:[844,390],deviceScaleFactor:.25,results},null,2));
try{
 for(const cap of [30,60,120]){
  const context=await browser.newContext({viewport:{width:844,height:390},deviceScaleFactor:.25}),page=await context.newPage(),errors=[];
  page.setDefaultTimeout(45000);page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(cap=>localStorage.setItem('botstrike:settings',JSON.stringify({renderFps:cap,sound:false})),cap);
  try{
   await page.goto(base+'/games/botstrike/');await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
   assert.equal(await page.locator('#render-fps').inputValue(),String(cap));
   await page.locator('#training-start').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
   await page.waitForTimeout(2500);
   const samples=[];for(let i=0;i<3;i++){await page.waitForTimeout(1100);samples.push(await page.evaluate(()=>({...document.documentElement.dataset})));}
   const rates=samples.map(s=>Number(s.renderFps)),median=[...rates].sort((a,b)=>a-b)[1];
   results.push({cap,rates,samples,errors,withinTarget:median>=cap*.8&&median<=cap*1.1});record();
   assert.ok(median>=cap*.8&&median<=cap*1.1,`actual ${rates.join('/')} at cap ${cap}`);
   await page.keyboard.press('Escape');await leaveBrowserRoom(page);assert.deepEqual(errors,[]);
  }finally{await context.close();}
 }
 const result={automated:true,physicalDisplayAccepted:false,viewport:[844,390],deviceScaleFactor:.25,results};
 writeFileSync(out+'/measurements.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}finally{await browser.close();}
