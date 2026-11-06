import {waitBrowserCondition} from './browser-condition.mjs';
import assert from 'node:assert/strict';
import {makeShotSample,shotProfiles} from '../games/botstrike/client/shot-sound.mjs';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader','--mute-audio']});
const context=await browser.newContext({viewport:{width:1920,height:1080},deviceScaleFactor:.5});
await context.addInitScript(()=>{
 window.__shotBuffers=[];window.__startedShots=[];window.__startedHashes=[];
 window.__audioHash=sample=>{let h=2166136261;for(const b of new Uint8Array(sample.buffer,sample.byteOffset,sample.byteLength))h=Math.imul(h^b,16777619)>>>0;return h};
 const OriginalSocket=WebSocket;
 window.WebSocket=class extends OriginalSocket{constructor(...args){super(...args);window.__testSocket=this;this.addEventListener('message',event=>{try{const value=JSON.parse(event.data);if(value.room?.state)window.__testRoom=value.room;}catch{}})}};
 const original=AudioContext.prototype.createBuffer;
 AudioContext.prototype.createBuffer=function(channels,length,rate){window.__shotBuffers.push({channels,length,rate});return original.call(this,channels,length,rate)};
 const start=AudioBufferSourceNode.prototype.start;
 AudioBufferSourceNode.prototype.start=function(...args){window.__startedShots.push(this.buffer?.duration);window.__startedHashes.push(window.__audioHash(this.buffer.getChannelData(0)));return start.apply(this,args)};
});
const page=await context.newPage(),errors=[];page.setDefaultTimeout(60000);
page.on('pageerror',error=>errors.push(error.message));
try{
 await page.goto(base+'/games/botstrike/');
 try{await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));}catch(error){console.error('Game boot:',await page.evaluate(()=>({status:document.querySelector('#status')?.textContent,fatal:document.querySelector('#fatal')?.textContent,hidden:document.querySelector('#fatal')?.hidden})),errors);throw error;}
 await page.locator('#practice').click();
 try{await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&document.querySelector('#phase').textContent==='TEAM DEATHMATCH',undefined,{timeout:15000});}
 catch(error){console.error('Practice startup:',await page.evaluate(()=>({status:document.querySelector('#status').textContent,phase:document.querySelector('#phase').textContent,playing:document.documentElement.dataset.playing})),errors);throw error;}
 await page.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Connected'));await waitBrowserCondition(page,()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(({room})=>room.state.players[room.slot].last_seq>=4));
 const spec=await(await context.request.get(base+'/games/botstrike/spec.json')).json();
 for(let weapon=0;weapon<12;weapon++){
  const name=spec.weapons[weapon].name,duration=shotProfiles[weapon].duration;
  for(let attempt=0;attempt<3;attempt++){
   if(await page.evaluate(()=>document.documentElement.dataset.playing!=='true'))await page.locator('#resume').click();await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&document.querySelector('#status').textContent.startsWith('Connected'));
   await waitBrowserCondition(page,()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(({room})=>room.state.players[room.slot].alive));
   if(weapon<5)await page.keyboard.press('Digit'+(weapon+1));else{await page.keyboard.press('KeyB');await page.locator('#buy-menu').waitFor({state:'visible'});await page.locator('#buy-items button[data-item="'+weapon+'"]').click();}
   const canvas=await page.locator('#arena').boundingBox();await page.mouse.move(canvas.x+canvas.width/2,canvas.y+canvas.height/2);
   try{await waitBrowserCondition(page,expected=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(({room})=>{const p=room.state.players[room.slot];return p.weapon===expected&&p.alive&&p.fire_wait===0&&p.reload===0&&p.ammo[expected]>0}),weapon,{timeout:5000});break;}
   catch(error){const pilot=await page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(({room})=>room.state.players[room.slot]));console.log('Live readiness retry',name,{alive:pilot.alive,life:pilot.life,weapon:pilot.weapon,fire_wait:pilot.fire_wait,seq:pilot.last_seq},await page.evaluate(()=>({playing:document.documentElement.dataset.playing,status:document.querySelector('#status').textContent,buyHidden:document.querySelector('#buy-menu').hidden,lock:document.pointerLockElement?.id})));if(attempt===2||pilot.alive&&pilot.weapon===weapon)throw error;}
  }
  await page.waitForFunction(expected=>document.querySelector('#weapon-label').textContent===expected,name);
  const before=await page.evaluate(()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>({shots:room.state.players[room.slot].shots,seq:room.state.players[room.slot].last_seq})));
  const started=await page.evaluate(()=>window.__startedShots.length);
  const rate=await page.evaluate(()=>window.__shotBuffers[0].rate),sample=makeShotSample(weapon,rate);let hash=2166136261;for(const b of new Uint8Array(sample.buffer))hash=Math.imul(hash^b,16777619)>>>0;
  await page.mouse.down();
  try{await waitBrowserCondition(page,([started,duration])=>window.__startedShots.slice(started).some(value=>Math.abs(value-duration)<.01),[started,duration],{timeout:5000});}
  catch(error){console.error('Sampled shot missing:',name,{...before,started},await page.evaluate(()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>{const pilot=room.state.players[room.slot];return{shots:pilot.shots,seq:pilot.last_seq,alive:pilot.alive,weapon:pilot.weapon,startedShots:window.__startedShots,playing:document.documentElement.dataset.playing}})),errors);throw error;}
  finally{await page.mouse.up();}
  assert.ok(await page.evaluate(([start,hash])=>window.__startedHashes.slice(start).includes(hash),[started,hash]),name+' exact sample was started');
  await waitBrowserCondition(page,before=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>{const pilot=room.state.players[room.slot];return pilot.shots>before.shots&&pilot.last_seq>before.seq}),before, {timeout:5000});
 }
 await page.waitForFunction(()=>window.__shotBuffers.length>=5);
 const buffers=await page.evaluate(()=>window.__shotBuffers);
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.27&&buffer.length/buffer.rate<.29),'ARC-9 sample reached Web Audio');
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.14&&buffer.length/buffer.rate<.16),'NEEDLE sample reached Web Audio');
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.10&&buffer.length/buffer.rate<.11),'ION-5 sample reached Web Audio');
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.31&&buffer.length/buffer.rate<.33),'RAIL-LANCE sample reached Web Audio');
 assert.ok(buffers.some(buffer=>buffer.length/buffer.rate>.37&&buffer.length/buffer.rate<.39),'SCATTER sample reached Web Audio');
 await waitBrowserCondition(page,()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>room.state.players[room.slot].alive));
 const landingStart=await page.evaluate(()=>window.__startedShots.length);
 await page.keyboard.press('Space',{delay:80});
 await waitBrowserCondition(page,()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>room.state.players[room.slot].position[1]>1));
 await page.waitForFunction(start=>window.__startedShots.slice(start).some(value=>Math.abs(value-.19)<.003),landingStart);
 const stepStart=await page.evaluate(()=>window.__startedShots.length);
 const beforeMove=await page.evaluate(()=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>room.state.players[room.slot].position));
 await page.keyboard.down('KeyW');
 try{
  await waitBrowserCondition(page,([start,origin])=>fetch('/games/botstrike/api/state').then(response=>response.json()).then(({room})=>{
   const position=room.state.players[room.slot].position;
   return Math.hypot(position[0]-origin[0],position[2]-origin[2])>40&&[.11,.125].every(duration=>window.__startedShots.slice(start).some(value=>Math.abs(value-duration)<.003));
  }),[stepStart,beforeMove]);
 }finally{await page.keyboard.up('KeyW')}
 await page.waitForFunction(()=>window.__testRoom?.state);
 const impactStart=await page.evaluate(()=>window.__startedShots.length);
 await page.evaluate(()=>{
  const room=structuredClone(window.__testRoom),tick=++room.state.tick,slot=room.slot,target=(slot+5)%10;
  room.feedback=[{id:'impact-body',tick,kind:'hit',actor:slot,target,value:20},{id:'impact-head',tick,kind:'headshot',actor:slot,target,value:45},{id:'impact-damage',tick,kind:'hit',actor:target,target:slot,value:30,bearing:0}];
  window.__testSocket.dispatchEvent(new MessageEvent('message',{data:JSON.stringify({type:'state',room})}));
 });
 await page.waitForFunction(start=>[.12,.17,.19].every(duration=>window.__startedShots.slice(start).some(value=>Math.abs(value-duration)<.003)),impactStart);
 assert.ok(buffers.length>=24&&buffers.length<=84,'12 shots, 3 impacts, 9 surface footfalls and at most 60 lazy actions');
 const projected=await page.evaluate(()=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(({room})=>room.state));
 const own=projected.players[0];assert.ok(Number.isFinite(own.gait?.phase));assert.equal(own.gait.tick,projected.tick);assert.equal(own.gait.life,own.life);
 for(const p of projected.players.filter(p=>p.hidden||p.optical===false&&p.team!==own.team))assert.equal(p.gait,undefined);
 assert.deepEqual(errors,[]);
 console.log('Native practice started all twelve exact weapon buffers, alternating surface footsteps and landing; confirmed body, head and damage feedback started distinct samples');
}finally{
 try{await leaveBrowserRoom(page)}finally{await browser.close()}
}
