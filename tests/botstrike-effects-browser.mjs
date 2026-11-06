import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {waitNativeState} from './browser-native-state.mjs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19894',out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-v4-effects-browser';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:.5}),page=await context.newPage(),errors=[],results=[];
page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(45000);
async function hold(key){await page.keyboard.down(key);await page.waitForTimeout(100);await page.keyboard.up(key);}
async function equipment(kind){await page.keyboard.press('KeyB');await page.locator('#buy-menu').waitFor({state:'visible'});await page.locator('#utility-choice').selectOption(String(kind));await page.locator('#throw-mode').selectOption('1');await waitNativeState(page,(r,k)=>r.state.players[0].throw_mode===1&&r.state.practice.preview_kind===k,kind);await page.locator('#buy-close').focus();await page.keyboard.press('Enter');await hold('KeyG');}
async function reset(){await page.keyboard.press('Escape');const old=(await page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()))).room.state.practice.attempt;await page.locator('[data-command="1"]').focus();await page.keyboard.press('Enter');await waitNativeState(page,(r,n)=>r.state.practice.attempt===n+1,old);await page.locator('#resume').focus();await page.keyboard.press('Enter');}
try{
 await page.goto(base+'/games/botstrike/');await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await page.locator('.hero-card').nth(3).click();await page.locator('#training-start').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await waitNativeState(page,r=>r.state.players[0].hero===3&&r.state.players[5].optical===true);
 await reset();await equipment(2);await waitNativeState(page,r=>r.state.utilities.some(u=>u.kind===2&&u.fuse===0)&&r.state.players[5].hidden===true);
 await page.waitForTimeout(150);const hiddenTriangles=await page.evaluate(()=>Number(document.documentElement.dataset.renderTriangles));
 await hold('KeyQ');const radio=await waitNativeState(page,r=>r.state.players[5].revealed>0&&r.state.players[5].optical===false&&!!r.state.players[5].position);
 assert.equal(radio.state.players[5].weapon,undefined);assert.equal(radio.state.players[5].velocity,undefined);
 await page.waitForTimeout(150);const radioTriangles=await page.evaluate(()=>Number(document.documentElement.dataset.renderTriangles));assert.equal(radioTriangles,hiddenTriangles,'a radio mark must not add a rendered enemy model');
 await page.screenshot({path:out+'/smoke-radio.png'});results.push({smokeHidden:true,radarRevealOnly:true,hiddenTriangles,radioTriangles});
 await reset();await page.emulateMedia({reducedMotion:'reduce'});await equipment(1);const flashed=await waitNativeState(page,r=>r.state.players[0].flash>32);
 await page.waitForFunction(()=>document.querySelector('#flash').style.opacity==='1'&&document.querySelector('#flash').classList.contains('gentle'));
 const overlay=await page.locator('#flash').evaluate(el=>({parent:el.parentElement.id,opacity:getComputedStyle(el).opacity,background:getComputedStyle(el).backgroundColor,text:el.textContent}));assert.equal(overlay.opacity,'1');assert.notEqual(overlay.parent,'hud');assert.match(overlay.text,/OPTICS JAMMED/);
 await page.screenshot({path:out+'/flash-reduced.png'});results.push({nativeFlash:flashed.state.players[0].flash,reducedMotionOpaque:true,overlay});
 await waitNativeState(page,r=>r.state.players[0].flash===0);await page.waitForFunction(()=>document.querySelector('#flash').style.opacity==='0');
 await reset();await page.emulateMedia({reducedMotion:'no-preference'});await equipment(1);await waitNativeState(page,r=>r.state.players[0].flash>32);
 await page.waitForFunction(()=>document.querySelector('#flash').style.opacity==='1'&&!document.querySelector('#flash').classList.contains('gentle'));await page.screenshot({path:out+'/flash-normal.png'});results.push({normalMotionOpaque:true});
 await page.keyboard.press('Escape');await leaveBrowserRoom(page);assert.deepEqual(errors,[]);writeFileSync(out+'/measurements.json',JSON.stringify({automated:true,humanAcceptance:false,results,errors},null,2));console.log(JSON.stringify({out,results,errors},null,2));
}catch(error){writeFileSync(out+'/failure-state.json',JSON.stringify(await page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json())),null,2));await page.screenshot({path:out+'/failure.png'});throw error;}finally{await browser.close();}
