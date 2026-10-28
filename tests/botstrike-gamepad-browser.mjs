import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1920,height:1080}});
await context.addInitScript(()=>{
 const pad={index:0,connected:true,mapping:'standard',axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))};
 Object.defineProperty(navigator,'getGamepads',{configurable:true,value:()=>pad.connected?[pad]:[]});
 window.__testPad=pad;
});
const page=await context.newPage(),sent=[],errors=[];
page.on('pageerror',error=>errors.push(error.message));
page.on('websocket',socket=>socket.on('framesent',frame=>{try{const message=JSON.parse(frame.payload);if(message.type==='input')sent.push(message.input);}catch{}}));
async function button(index,down){await page.evaluate(({index,down})=>{const b=window.__testPad.buttons[index];b.pressed=down;b.value=down?1:0;},{index,down});}
async function tap(index){await button(index,true);await page.waitForTimeout(100);await button(index,false);await page.waitForTimeout(80);}
try{
 await page.goto(base+'/games/botstrike/');
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await tap(15);
 const firstFocus=await page.evaluate(()=>({id:document.activeElement?.id,label:document.activeElement?.getAttribute('aria-label'),tag:document.activeElement?.tagName}));
 assert.equal(firstFocus.label?.startsWith('PATCH'),true,'D-pad moves focus across hero choices: '+JSON.stringify(firstFocus));
 await tap(0);
 assert.equal(await page.locator('.hero-card').nth(1).getAttribute('aria-pressed'),'true','controller selects a hero');
 await tap(13);
 assert.equal(await page.evaluate(()=>document.activeElement?.id),'mode');
 await tap(15);
 assert.equal(await page.locator('#mode').inputValue(),'demolition','D-pad changes a focused selector');
 await tap(14);
 assert.equal(await page.locator('#mode').inputValue(),'deathmatch');
 const focusPath=[];
 for(let i=0;i<8;i++){const focused=await page.evaluate(()=>({id:document.activeElement?.id,tag:document.activeElement?.tagName,label:document.activeElement?.getAttribute('aria-label')}));focusPath.push(focused);if(focused.id==='quick'||focused.id==='practice')break;await tap(13);}
 const launchFocus=await page.evaluate(()=>document.activeElement?.id);
 const layout=await page.evaluate(()=>['mode','private','quick'].map(id=>document.getElementById(id)).concat([...document.querySelectorAll('.map-card')]).map(el=>({id:el.id,class:el.className,visible:el.checkVisibility({checkVisibilityCSS:true}),rect:el.getBoundingClientRect().toJSON()})));
 assert.ok(['quick','practice'].includes(launchFocus),'D-pad reaches launch actions: '+JSON.stringify({focusPath,layout}));
 if(launchFocus==='quick')await tap(15);
 const practiceFocus=await page.evaluate(()=>({id:document.activeElement?.id,class:document.activeElement?.className,text:document.activeElement?.textContent?.slice(0,50)}));
 assert.equal(practiceFocus.id,'practice','D-pad reaches Practice: '+JSON.stringify({focusPath,launchFocus,practiceFocus}));
 if(process.env.GAMEPAD_ARTIFACTS){mkdirSync(process.env.GAMEPAD_ARTIFACTS,{recursive:true});await page.screenshot({path:process.env.GAMEPAD_ARTIFACTS+'/selection-focus.png'});}
 await tap(0);
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 if(process.env.GAMEPAD_ARTIFACTS){await page.waitForTimeout(350);await page.screenshot({path:process.env.GAMEPAD_ARTIFACTS+'/practice.png'});}
 assert.equal(await page.evaluate(()=>document.pointerLockElement),null,'gamepad entry does not capture the mouse');
 await page.evaluate(()=>{window.__testPad.axes=[.8,-1,.6,0];for(const i of [3,6,7,11,13])window.__testPad.buttons[i]={pressed:true,value:1};});
 await page.waitForTimeout(500);
 assert.ok(sent.some(input=>input.x>.5&&input.y>.5&&input.fire&&input.ability),'movement, fire and skill use existing native inputs');
 assert.ok(sent.some(input=>Math.abs(input.yaw)>.01),'right stick changes native yaw');
 assert.ok(sent.some(input=>input.scope&&input.interact&&input.item>0),'scope, interact and utility use existing native inputs');
 await page.evaluate(()=>{window.__testPad.axes=[0,0,0,0];for(const i of [3,6,7,11,13])window.__testPad.buttons[i]={pressed:false,value:0};});
 await tap(9);
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='false');
 assert.equal(await page.evaluate(()=>document.activeElement?.id),'resume','menu focus lands on resume');
 await tap(0);
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await tap(12);
 await page.locator('#buy-menu').waitFor({state:'visible'});
 await tap(1);
 await page.locator('#buy-menu').waitFor({state:'hidden'});
 await button(8,true);
 await page.locator('#scoreboard').waitFor({state:'visible'});
 await button(8,false);
 await page.locator('#scoreboard').waitFor({state:'hidden'});
 await page.evaluate(()=>{window.__testPad.axes=[0,-1,0,0];});
 await page.waitForTimeout(150);
 await page.evaluate(()=>{window.__testPad.connected=false;});
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='false');
 await page.waitForTimeout(100);
 assert.ok(sent.slice(-5).some(input=>input.y===0),'disconnect releases movement');
 await page.evaluate(()=>{Object.defineProperty(navigator,'getGamepads',{configurable:true,value:()=>{throw new DOMException('Gamepad access denied','SecurityError')}});});
 await page.waitForTimeout(150);
 assert.deepEqual(errors,[]);
 console.log('Controller menu, native movement/aim/fire/skill, scoreboard and disconnect passed');
}finally{await context.request.post(base+'/games/botstrike/api/action',{data:{type:'leave'}}).catch(()=>{});await browser.close()}
