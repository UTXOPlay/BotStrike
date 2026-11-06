// Automation verifies task mechanics only. Never count these answers as humans.
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resizeMobile,screenshotMobile} from './mobile-viewport.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const base=process.env.RECOGNITION_URL||'http://127.0.0.1:19893',out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-recognition-browser';mkdirSync(out,{recursive:true});
const errors=[];let report;
async function ready(page){page.setDefaultTimeout(60000);page.on('pageerror',e=>errors.push(e.message));await page.goto(base);await page.waitForFunction(()=>window.recognitionLab?.phase==='intro');}
async function active(page){
 const deadline=Date.now()+30000;
 while(Date.now()<deadline){const phase=await page.evaluate(()=>window.recognitionLab.phase);if(phase==='active')return;if(phase==='paused')await page.locator('#start').click();await new Promise(r=>setTimeout(r,50));}
 throw Error('Study did not present an active trial');
}
try{
 const desktop=await browser.newContext({viewport:{width:844,height:390},deviceScaleFactor:.5}),page=await desktop.newPage();await ready(page);
 await page.locator('#participant').fill('automated-qa');await page.locator('#start').click();await active(page);await page.keyboard.press('KeyA');
 await page.waitForFunction(()=>window.recognitionLab.rows>=1);report=await page.evaluate(()=>window.recognitionLab.report());
 assert.equal(report.automatedBrowser,true);assert.equal(report.humanInputAttested,false);assert.equal(report.plannedTrials,72);assert.ok(report.rows.some(r=>r.input==='keyboard'));
 await active(page);await page.setViewportSize({width:1280,height:720});await page.waitForFunction(()=>window.recognitionLab.phase==='paused');
 report=await page.evaluate(()=>window.recognitionLab.report());assert.ok(report.rows.some(r=>r.invalid==='resize'));assert.ok(report.summary.total.invalid>0);
 await page.screenshot({path:out+'/paused-after-resize.png'});await page.setViewportSize({width:844,height:390});
 await page.locator('#start').click();await active(page);await page.screenshot({path:out+'/trial-844x390.png'});
 const boxes=await page.locator('#responses button').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}}));assert.ok(boxes.every(r=>r.x>=0&&r.y>=0&&r.x+r.w<=844&&r.y+r.h<=390&&r.h>=44));
 await page.locator('[data-answer="enemy"]').click();await page.waitForFunction(()=>window.recognitionLab.rows>=3);
 await page.locator('#pause').click();await page.locator('#setup').waitFor({state:'visible'});const downloadPromise=page.waitForEvent('download');await page.locator('#download').click();const download=await downloadPromise;await download.saveAs(out+'/automated-only.json');
 await desktop.close();
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1}),phone=await mobile.newPage();await ready(phone);await phone.locator('#rotate').waitFor({state:'visible'});await screenshotMobile(phone,out+'/portrait-gate.png');
 await phone.locator('#rotate-fullscreen').click();await resizeMobile(phone,844,390);await phone.locator('#rotate').waitFor({state:'hidden'});await phone.locator('#cohort').selectOption('controller');
 await phone.evaluate(()=>{window.qaPad={index:0,mapping:'standard',connected:true,axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))};navigator.getGamepads=()=>[window.qaPad];});
 await phone.locator('#start').click();await active(phone);await phone.evaluate(()=>{window.qaPad.buttons[14]={pressed:true,value:1}});await phone.waitForTimeout(180);await phone.evaluate(()=>{window.qaPad.buttons[14]={pressed:false,value:0}});
 await phone.waitForFunction(()=>window.recognitionLab.rows>=1);const controllerReport=await phone.evaluate(()=>window.recognitionLab.report());assert.ok(controllerReport.rows.some(r=>r.input==='controller'));
 await active(phone);await phone.locator('[data-answer="unseen"]').tap();await phone.waitForFunction(()=>window.recognitionLab.rows>=2);await resizeMobile(phone,390,844);await phone.locator('#rotate').waitFor({state:'visible'});
 const mobileReport=await phone.evaluate(()=>window.recognitionLab.report());assert.ok(mobileReport.rows.some(r=>r.input==='touch'));await mobile.close();
 assert.deepEqual(errors,[]);writeFileSync(out+'/mechanics.json',JSON.stringify({automatedOnly:true,humanRecognitionAcceptance:false,desktopRows:report.rows.length,invalidTrialsRecorded:true,mouseKeyboard:true,touch:true,controllerApi:true,portraitGate:true,errors},null,2));console.log(JSON.stringify({out,automatedOnly:true,errors},null,2));
}finally{await browser.close();}
