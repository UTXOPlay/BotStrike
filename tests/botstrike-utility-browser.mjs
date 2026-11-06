import assert from 'node:assert/strict';import {mkdirSync,writeFileSync} from 'node:fs';
import {waitNativeState} from './browser-native-state.mjs';import {leaveBrowserRoom} from './botstrike-browser-room.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');const base=process.env.STORE_URL||'http://127.0.0.1:19894',out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-v3-utility-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:.5}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(45000);
await page.addInitScript(()=>{window.qaPad={index:0,mapping:'standard',connected:true,axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))};navigator.getGamepads=()=>[window.qaPad];});
async function button(index){await page.evaluate(index=>{window.qaPad.buttons[index]={pressed:true,value:1}},index);await page.waitForTimeout(150);await page.evaluate(index=>{window.qaPad.buttons[index]={pressed:false,value:0}},index);await page.waitForTimeout(100);}
try{
 await page.goto(base+'/games/botstrike/');await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));await page.locator('#training-start').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await button(12);await page.locator('#buy-menu').waitFor({state:'visible'});await page.locator('#throw-mode').focus();
 for(const [key,mode]of [[15,1],[15,2],[14,1],[14,0]]){await button(key);await waitNativeState(page,(r,m)=>r.state.players[0].throw_mode===m,mode);assert.equal(await page.locator('#throw-mode').inputValue(),String(mode));}
 await page.locator('#utility-choice').selectOption('2');await page.screenshot({path:out+'/controller-throw-mode.png'});
 await button(1);await page.locator('#buy-menu').waitFor({state:'hidden'});await waitNativeState(page,r=>r.state.players[0].stance<.01);
 await button(13);const released=await waitNativeState(page,r=>!!r.state.practice.last_throw);assert.equal(released.state.practice.last_throw.kind,2);assert.equal(released.state.practice.last_throw_mode,0);
 const tick=released.state.practice.last_throw_tick;await page.waitForTimeout(250);const current=await page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(r=>r.room));assert.equal(current.state.practice.last_throw_tick,tick);
 await waitNativeState(page,r=>r.state.players[0].item_wait===0);await page.keyboard.down('KeyG');const keyboardRelease=await waitNativeState(page,r=>r.state.practice.last_throw_tick>tick);const keyboardTick=keyboardRelease.state.practice.last_throw_tick;
 await page.keyboard.press('KeyB');await page.locator('#buy-menu').waitFor({state:'visible'});await page.locator('#throw-mode').selectOption('1');await page.locator('#buy-close').click();await waitNativeState(page,r=>r.state.players[0].item_wait===0);
 await page.keyboard.down('KeyG');await page.waitForTimeout(200);let after=await page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(r=>r.room));assert.equal(after.state.practice.last_throw_tick,keyboardTick,'held autorepeat cannot re-arm after a mode/menu boundary');
 await page.keyboard.up('KeyG');await page.keyboard.press('KeyG');after=await waitNativeState(page,r=>r.state.practice.last_throw_tick>keyboardTick);assert.equal(after.state.practice.last_throw_mode,1);
 await page.keyboard.press('Escape');await leaveBrowserRoom(page);assert.deepEqual(errors,[]);const result={controllerApi:true,allThreeModesSelected:true,oneButtonRelease:true,noDuplicateRelease:true,heldKeyboardModeChangeBlocked:true,freshPressReleases:true,errors,physicalControllerAccepted:false};writeFileSync(out+'/measurements.json',JSON.stringify(result,null,2));console.log(JSON.stringify({out,...result},null,2));
}finally{await browser.close();}
