import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885',out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-relay';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1920,height:1080}}),page=await context.newPage(),errors=[];
page.setDefaultTimeout(60000);page.on('pageerror',error=>errors.push(error.message));
const init=()=>{const Original=WebSocket;window.WebSocket=class extends Original{constructor(...args){super(...args);window.testSocket=this;this.addEventListener('message',event=>{if(window.freezeGame&&!event.synthetic&&JSON.parse(event.data).type==='state'){event.stopImmediatePropagation();return}try{const value=JSON.parse(event.data);if(value.room?.state)window.testRoom=value.room}catch{}})}}};
await page.addInitScript(init);
const inject=async(target,planted,hidden=false)=>target.evaluate(({planted,hidden})=>{window.freezeGame=true;const room=structuredClone(window.testRoom),state=room.state,me=state.players[room.slot];state.tick++;state.phase='live';me.position=[-1100,0,100];me.velocity=[0,0,0];me.yaw=0;me.pitch=-.2;state.objective={...state.objective,position:[-1100,0,-10],carrier:null,planted,hidden,site:0,fuse:planted?40*64:0,actor:null,progress:0};room.feedback=[];const event=new MessageEvent('message',{data:JSON.stringify({type:'state',room})});event.synthetic=true;testSocket.dispatchEvent(event);},{planted,hidden});
const pixels=(target,screenshot)=>target.evaluate(async encoded=>{const image=new Image();image.src='data:image/png;base64,'+encoded;await image.decode();const sample=document.createElement('canvas');sample.width=16;sample.height=16;const context=sample.getContext('2d',{willReadFrequently:true});context.drawImage(image,0,0,16,16);const data=context.getImageData(0,0,16,16).data,colors=new Set();for(let i=0;i<data.length;i+=4)colors.add(`${data[i]},${data[i+1]},${data[i+2]}`);return colors.size},screenshot.toString('base64'));
try{
 await page.goto(base+'/games/botstrike/');
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await page.locator('#mode').selectOption('demolition');
 await page.locator('#practice').click();
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&!!window.testRoom?.state);
 await page.locator('#arena').dispatchEvent('mousemove',{movementX:0,movementY:110,buttons:1});
 await inject(page,false,true);await page.waitForTimeout(150);const hiddenCalls=Number(await page.evaluate(()=>document.documentElement.dataset.drawCalls));
 await inject(page,false);await page.waitForTimeout(150);const visibleCalls=Number(await page.evaluate(()=>document.documentElement.dataset.drawCalls));
 assert.ok(visibleCalls>hiddenCalls,JSON.stringify({visibleCalls,hiddenCalls}));
 for(const [width,height] of [[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844],[844,390]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  const screenshot=await page.screenshot({path:`${out}/relay-${width}x${height}.png`});
  assert.ok(await pixels(page,screenshot)>12,`rendered frame should contain scenery at ${width}x${height}`);
 }
 await page.setViewportSize({width:1920,height:1080});await inject(page,true);await page.waitForTimeout(150);
 const plantedFrame=await page.screenshot({path:out+'/relay-planted.png'});
 assert.ok(await pixels(page,plantedFrame)>12,'planted relay should render with scenery');
 const touch=await browser.newContext({viewport:{width:844,height:390},hasTouch:true,isMobile:true}),phone=await touch.newPage();
 phone.setDefaultTimeout(60000);phone.on('pageerror',error=>errors.push(error.message));await phone.addInitScript(init);
 await phone.goto(base+'/games/botstrike/');await phone.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await phone.locator('#immersive-enter').click();await phone.locator('#immersive-gate').waitFor({state:'hidden'});
 await phone.locator('#mode').selectOption('demolition');await phone.locator('#practice').click();
 await phone.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&!!window.testRoom?.state);
 await phone.locator('#arena').dispatchEvent('mousemove',{movementX:0,movementY:110,buttons:1});await inject(phone,false);await phone.waitForTimeout(150);
 const touchFrame=await phone.screenshot({path:out+'/relay-touch-844x390.png'});
 assert.ok(await pixels(phone,touchFrame)>12,'touch relay frame should contain scenery');
 await leaveBrowserRoom(phone);await touch.close();
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({relayVisible:true,hiddenCalls,visibleCalls,sixViewports:true,touchViewport:true,framePixels:true}));
}finally{try{await leaveBrowserRoom(page)}finally{await browser.close()}}
