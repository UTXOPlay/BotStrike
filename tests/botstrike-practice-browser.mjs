import {waitNativeState} from './browser-native-state.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resizeMobile,screenshotMobile} from './mobile-viewport.mjs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19896',out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-training-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const errors=[],results=[];
async function boot(context){
 await context.request.post(base+'/api/guest',{headers:{Origin:base},data:{}});
 const page=await context.newPage();page.setDefaultTimeout(45000);page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/games/botstrike/');await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 return page;
}
const state=page=>page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(r=>r.room));
const attempt=page=>page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(r=>r.room.state.practice.attempt));
async function reset(page,button){const old=await attempt(page);await button.click();await waitNativeState(page,(r,before)=>r.state.practice.attempt===before+1,old);assert.equal((await state(page)).state.practice.shots,0);}
try{
 const desktop=await browser.newContext({viewport:{width:1920,height:1080},deviceScaleFactor:.5});const page=await boot(desktop);
 assert.equal(await page.locator('.map-card').count(),3,'the range is absent from combat queues');
 await page.locator('#practice-drill').selectOption('1');await page.locator('#training-start').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await page.waitForFunction(()=>document.pointerLockElement?.id==='arena');
 assert.equal((await state(page)).config.mode,'practice');assert.equal((await state(page)).state.config.map,3);
 await page.mouse.down();await page.waitForTimeout(200);await page.mouse.up();
 await waitNativeState(page,r=>r.state.practice.shots>0);
 await page.keyboard.press('KeyB');await page.locator('#buy-menu').waitFor({state:'visible'});
 for(const mode of ['0','1','2']){await page.locator('#throw-mode').selectOption(mode);await waitNativeState(page,(r,m)=>r.state.players[0].throw_mode===m,Number(mode));}
 await page.locator('#utility-choice').selectOption('5');await waitNativeState(page,r=>r.state.practice.preview_kind===5&&r.state.practice.preview.length===33);assert.equal((await state(page)).state.practice.last_throw,null);
 await page.locator('#utility-choice').selectOption('6');await waitNativeState(page,r=>r.state.practice.preview_kind===6&&r.state.practice.preview.length===0);
 await page.locator('#utility-choice').selectOption('2');await page.locator('#throw-mode').selectOption('0');await page.locator('#buy-close').click();

 for(const [width,height]of [[1920,1080],[2560,1080],[2560,1440],[3840,2160]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(150);
  await page.keyboard.press('Escape');await page.locator('#resume').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
  const bounds=await page.locator('#practice-hud').boundingBox();assert.ok(bounds&&bounds.x>=0&&bounds.y>=0&&bounds.x+bounds.width<=width&&bounds.y+bounds.height<=height);
  await page.screenshot({path:`${out}/range-${width}x${height}.png`});results.push({width,height,insideViewport:true});
 }
 // Commands are available from the pause menu, preserving normal input clearing.
 await page.keyboard.press('Escape');await reset(page,page.locator('[data-command="1"]'));
 const before=await state(page);await page.locator('[data-command="6"]').click();await waitNativeState(page,(r,drill)=>r.state.practice.settings.drill===drill+1,before.state.practice.settings.drill);
 // Standard controller confirmation activates the same focused reset action.
 await page.evaluate(()=>{window.testPad={index:0,mapping:'standard',connected:true,axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))};navigator.getGamepads=()=>[window.testPad];});
 await page.waitForTimeout(100);await page.locator('[data-command="1"]').focus();const old=await attempt(page);
 await page.evaluate(()=>{window.testPad.buttons[0]={pressed:true,value:1}});await page.waitForTimeout(150);await page.evaluate(()=>{window.testPad.buttons[0]={pressed:false,value:0}});await page.waitForTimeout(100);
 await waitNativeState(page,(r,before)=>r.state.practice.attempt===before+1,old);
 async function padClick(selector){await page.locator(selector).focus();await page.evaluate(()=>{window.testPad.buttons[0]={pressed:true,value:1}});await page.waitForTimeout(150);await page.evaluate(()=>{window.testPad.buttons[0]={pressed:false,value:0}});await page.waitForTimeout(100);}
 await padClick('#leave');await waitNativeState(page,r=>r===null);
 await padClick('#training-start');await waitNativeState(page,r=>!!r?.state?.practice);
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await page.evaluate(()=>{window.testPad.buttons[9]={pressed:true,value:1}});await page.waitForTimeout(150);await page.evaluate(()=>{window.testPad.buttons[9]={pressed:false,value:0}});await page.locator('#panel').waitFor({state:'visible'});await page.waitForTimeout(100);
 const nextAttempt=await attempt(page);await padClick('[data-command="1"]');await waitNativeState(page,(r,before)=>r.state.practice.attempt===before+1,nextAttempt);
 await padClick('#leave');await waitNativeState(page,r=>r===null);
 results.push({controller:'standard API emulation',startAccepted:true,resetAccepted:true,leaveAccepted:true});await desktop.close();
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});const phone=await boot(mobile);
 await phone.locator('#immersive-gate').waitFor({state:'visible'});await screenshotMobile(phone,out+'/portrait-gate.png');
 await phone.locator('#immersive-enter').click();await resizeMobile(phone,844,390);await phone.locator('#immersive-gate').waitFor({state:'hidden'});
 await phone.locator('#training-start').click();await phone.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await phone.locator('#rack-open').tap();await phone.locator('#throw-mode').selectOption('1');await waitNativeState(phone,r=>r.state.players[0].throw_mode===1);await phone.locator('#buy-close').tap();
 await phone.locator('#touch-fire').tap();await waitNativeState(phone,r=>r.state.practice.shots>0);
 const card=await phone.locator('#practice-hud').boundingBox();const vitals=await phone.locator('.vitals').boundingBox();assert.ok(card.y>=vitals.y+vitals.height||card.x>=vitals.x+vitals.width||card.x+card.width<=vitals.x||card.y+card.height<=vitals.y,'practice controls do not cover HP and armor');assert.ok(card&&card.x>=0&&card.y>=0&&card.x+card.width<=844&&card.y+card.height<=390);
 await screenshotMobile(phone,out+'/range-844x390.png');
 await phone.locator('#practice-hud button').nth(1).tap();await reset(phone,phone.locator('[data-command="1"]'));
 await phone.locator('#resume').tap();await phone.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 const priorId=(await state(phone)).id;await phone.evaluate(()=>document.exitFullscreen());await phone.locator('#immersive-gate').waitFor({state:'visible'});
 assert.equal((await state(phone)).id,priorId,'fullscreen exit preserves the instance');
 await phone.locator('#immersive-enter').click();await phone.locator('#immersive-gate').waitFor({state:'hidden'});await leaveBrowserRoom(phone);await mobile.close();
 results.push({width:390,height:844,portraitGate:true},{width:844,height:390,touchFire:true,touchReset:true,fullscreenInstancePreserved:true});
 assert.deepEqual(errors,[]);writeFileSync(out+'/measurements.json',JSON.stringify({results,errors,functionalOnly:true,desktopDpr:.5,mobileDpr:1},null,2));console.log(JSON.stringify({out,results,errors},null,2));
}catch(error){console.error(error);throw error;}finally{await browser.close();}
