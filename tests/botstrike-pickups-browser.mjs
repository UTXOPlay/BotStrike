import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885',out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-pickups';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const desktop=await browser.newContext({viewport:{width:1920,height:1080}}),touch=await browser.newContext({viewport:{width:844,height:390},hasTouch:true,isMobile:true});
const pages=[await desktop.newPage(),await touch.newPage()],errors=[],sent=[];
for(const page of pages){page.setDefaultTimeout(60000);page.on('pageerror',e=>errors.push(e.message));page.on('websocket',ws=>ws.on('framesent',e=>{try{const v=JSON.parse(e.payload);if(v.type==='input')sent.push(v.input)}catch{}}));await page.addInitScript(()=>{const Original=WebSocket;window.WebSocket=class extends Original{constructor(...args){super(...args);window.testSocket=this;this.addEventListener('message',e=>{if(window.freezeGame&&!e.synthetic&&JSON.parse(e.data).type==='state'){e.stopImmediatePropagation();return;}try{const v=JSON.parse(e.data);if(v.room?.state)window.testRoom=v.room;}catch{}})}};});}
const inject=async(page,drop,picked=false,weapons=[2],eventKind='gun_pickup')=>page.evaluate(({drop,picked,weapons,eventKind})=>{window.freezeGame=true;const room=structuredClone(window.testRoom),s=room.state,me=s.players[room.slot];s.tick++;s.phase='live';me.position=[-1100,0,100];me.velocity=[0,0,0];me.yaw=0;me.pitch=-.1;me.reserve[2]=0;if(picked)me.weapon=2;s.drops=drop?weapons.map((weapon,i)=>({id:42+i,weapon,team:1,position:[-1100+i*12,0,46],ammo:10,reserve:20,expires:s.tick+1000})):[];room.feedback=picked?[{id:eventKind+'-'+s.tick,tick:s.tick,kind:eventKind,actor:room.slot,value:2}]:[];const e=new MessageEvent('message',{data:JSON.stringify({type:'state',room})});e.synthetic=true;testSocket.dispatchEvent(e);},{drop,picked,weapons,eventKind});
try{
 const [desk,phone]=pages;
 await desk.goto(base+'/games/botstrike/');
 await desk.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await desk.locator('#mode').selectOption('deathmatch');
 await desk.locator('#practice').click();
 await desk.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&!!window.testRoom?.state);
 await desk.keyboard.press('Digit2');
 await desk.waitForFunction(async()=>{const {room}=await(await fetch('/games/botstrike/api/state')).json();return room.state.players[room.slot].weapon===1});
 await inject(desk,true);
 await desk.waitForFunction(()=>document.querySelector('#pickup-hud').textContent.includes('RECOVER ION-5'));
 await desk.locator('#arena').dispatchEvent('mousemove',{movementX:0,movementY:130,buttons:1});
 await desk.waitForTimeout(150);
 assert.match(await desk.locator('#pickup-hud').textContent(),/\+30 RESERVE/);
 assert.equal(await desk.locator('#touch-interact').getAttribute('hidden'),null);
 await desk.keyboard.down('KeyE');
 await desk.waitForTimeout(150);
 await desk.keyboard.up('KeyE');
 assert.ok(sent.some(input=>input.interact),'keyboard interact reaches the room input path: '+JSON.stringify(sent.slice(-4)));
 for(const [width,height] of [[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844],[844,390]]){
  await desk.setViewportSize({width,height});
  await desk.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  const box=await desk.locator('#pickup-hud').boundingBox();
  assert.ok(box&&box.x>=0&&box.y>=0&&box.x+box.width<=width&&box.y+box.height<=height,JSON.stringify({width,height,box}));
  await desk.screenshot({path:`${out}/pickup-${width}x${height}.png`});
 }
 const dropDrawCalls=Number(await desk.evaluate(()=>document.documentElement.dataset.drawCalls));
 await desk.keyboard.press('Digit4');
 await desk.waitForTimeout(100);
 assert.ok(sent.some(input=>input.weapon===3),'test established a pending weapon choice');
 const before=sent.length;
 await inject(desk,true,true);
 await desk.waitForTimeout(150);
 assert.ok(sent.slice(before).some(input=>input.weapon==null),'confirmed pickup clears a stale weapon choice');
 await inject(desk,false);
 await desk.locator('#pickup-hud').waitFor({state:'hidden'});
 await desk.waitForTimeout(150);
 const clearDrawCalls=Number(await desk.evaluate(()=>document.documentElement.dataset.drawCalls));
 assert.ok(dropDrawCalls>clearDrawCalls&&dropDrawCalls-clearDrawCalls<=8,JSON.stringify({dropDrawCalls,clearDrawCalls}));
 for(const weapons of [[0,1,2,3,4,5,6,7],[8,9,10,11]]){
  await inject(desk,true,false,weapons);
  await desk.waitForTimeout(150);
 }
 await inject(desk,false,true,[2],'ammo_pickup');
 await desk.waitForFunction(()=>document.querySelector('#combat-banner').textContent.includes('AMMO RECOVERED'));
 await leaveBrowserRoom(desk);

 await phone.goto(base+'/games/botstrike/');
 await phone.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await phone.locator('#immersive-enter').click();
 await phone.locator('#immersive-gate').waitFor({state:'hidden'});
 await phone.locator('#mode').selectOption('deathmatch');
 await phone.locator('#practice').click();
 await phone.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&!!window.testRoom?.state);
 await inject(phone,true);
 await phone.locator('#pickup-hud').waitFor({state:'visible'});
 const touchBox=await phone.locator('#touch-interact').boundingBox();
 assert.ok(touchBox&&touchBox.x>=0&&touchBox.y>=0&&touchBox.x+touchBox.width<=844&&touchBox.y+touchBox.height<=390);
 await phone.locator('#touch-interact').tap();
 assert.ok(sent.some(input=>input.interact),'touch interact reaches the room input path');
 await phone.screenshot({path:out+'/pickup-touch.png'});
 await phone.setViewportSize({width:390,height:844});
 await phone.locator('#immersive-gate').waitFor({state:'visible'});
 await phone.screenshot({path:out+'/portrait-gate.png'});
 await leaveBrowserRoom(phone);
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({pickupPrompt:true,keyboardTouchInput:true,removal:true,sixViewports:true,dropDrawCalls,clearDrawCalls}));
}finally{for(const page of pages)try{await leaveBrowserRoom(page)}catch{}await browser.close()}
