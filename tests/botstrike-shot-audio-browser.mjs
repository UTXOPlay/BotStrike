import assert from 'node:assert/strict';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1920,height:1080}});
await context.addInitScript(()=>{
 window.__shotBuffers=[];window.__startedShots=[];
 const original=AudioContext.prototype.createBuffer;
 AudioContext.prototype.createBuffer=function(channels,length,rate){window.__shotBuffers.push({channels,length,rate});return original.call(this,channels,length,rate)};
 const start=AudioBufferSourceNode.prototype.start;
 AudioBufferSourceNode.prototype.start=function(...args){window.__startedShots.push(this.buffer?.duration);return start.apply(this,args)};
});
const page=await context.newPage(),errors=[];
page.on('pageerror',error=>errors.push(error.message));
try{
 await page.goto(base+'/games/botstrike/');
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await page.locator('#practice').click();
 try{await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&document.querySelector('#phase').textContent==='TEAM DEATHMATCH',undefined,{timeout:15000});}
 catch(error){console.error('Practice startup:',await page.evaluate(()=>({status:document.querySelector('#status').textContent,phase:document.querySelector('#phase').textContent,playing:document.documentElement.dataset.playing})),errors);throw error;}
 for(const [key,weapon,name,duration]of [['Digit1',0,'ARC-9',.28],['Digit2',1,'NEEDLE',.15],['Digit5',4,'SCATTER',.38]]){
  await page.keyboard.press(key);
  await page.waitForFunction(expected=>document.querySelector('#weapon-label').textContent===expected,name);
  const canvas=await page.locator('#arena').boundingBox();await page.mouse.move(canvas.x+canvas.width/2,canvas.y+canvas.height/2);
  await page.waitForTimeout(350);
  await page.waitForFunction(expected=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>{const pilot=room.state.players[room.slot];return pilot.weapon===expected&&pilot.alive&&pilot.fire_wait===0&&pilot.reload===0&&pilot.ammo[expected]>0}),weapon);
  const before=await page.evaluate(()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>({shots:room.state.players[room.slot].shots,seq:room.state.players[room.slot].last_seq})));
  const started=await page.evaluate(()=>window.__startedShots.length);
  await page.mouse.down();
  try{await page.waitForFunction(([started,duration])=>window.__startedShots.slice(started).some(value=>Math.abs(value-duration)<.01),[started,duration],{timeout:1500});}
  catch(error){console.error('Sampled shot missing:',name,before,await page.evaluate(()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>{const pilot=room.state.players[room.slot];return{shots:pilot.shots,seq:pilot.last_seq,alive:pilot.alive,weapon:pilot.weapon,startedShots:window.__startedShots,playing:document.documentElement.dataset.playing}})),errors);throw error;}
  finally{await page.mouse.up();}
  await page.waitForFunction(before=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>{const pilot=room.state.players[room.slot];return pilot.shots>before.shots&&pilot.last_seq>before.seq}),before, {timeout:5000});
 }
 await page.waitForFunction(()=>window.__shotBuffers.length>=3);
 const buffers=await page.evaluate(()=>window.__shotBuffers);
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.27&&buffer.length/buffer.rate<.29),'ARC-9 sample reached Web Audio');
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.14&&buffer.length/buffer.rate<.16),'NEEDLE sample reached Web Audio');
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.37&&buffer.length/buffer.rate<.39),'SCATTER sample reached Web Audio');
 assert.deepEqual(errors,[]);
 console.log('ARC-9, NEEDLE and SCATTER sampled playback started in native practice without page errors');
}finally{
 try{await leaveBrowserRoom(page)}finally{await browser.close()}
}
