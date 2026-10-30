import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885',out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-reconnect-browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1920,height:1080}}),sockets=[],errors=[];
page.setDefaultTimeout(30000);page.on('pageerror',error=>errors.push(error.message));
page.on('websocket',socket=>{
 const record={states:[],inputs:[]};sockets.push(record);
 socket.on('framereceived',event=>{try{const message=JSON.parse(event.payload);if(message.type==='state'&&message.room?.state)record.states.push(message.room)}catch{}});
 socket.on('framesent',event=>{try{const message=JSON.parse(event.payload);if(message.type==='input')record.inputs.push(message.input)}catch{}});
});
await page.addInitScript(()=>{const Original=WebSocket;window.WebSocket=class extends Original{constructor(...args){super(...args);window.__gameSocket=this;this.addEventListener('open',()=>{if(window.__holdSocket)this.close()})}}});

try{
 await page.goto(base+'/games/botstrike/');
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await page.locator('#practice').click();
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&window.__gameSocket?.readyState===WebSocket.OPEN);
 const state=async()=>(await(await page.request.get(base+'/games/botstrike/api/state')).json()).room;
 const initial=await state(),slot=initial.slot,origin=initial.state.players[slot].position,yaw=initial.state.players[slot].yaw;
 await page.evaluate(()=>{window.__holdSocket=true;window.__gameSocket.close()});
 await page.waitForFunction(({origin,yaw})=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(({room})=>{if(!room?.state)return false;const pilot=room.state.players[room.slot],turn=Math.atan2(Math.sin(pilot.yaw-yaw),Math.cos(pilot.yaw-yaw));return Math.hypot(...pilot.position.map((v,i)=>v-origin[i]))>250&&Math.abs(turn)>.3}),{origin,yaw},{timeout:20000,polling:500});
 await page.evaluate(()=>window.__holdSocket=false);
 await page.waitForFunction(()=>window.__gameSocket?.readyState===WebSocket.OPEN&&document.querySelector('#status').textContent.startsWith('Connected'));
 const restored=await state();assert.equal(restored.id,initial.id);assert.equal(restored.slot,slot);
 assert.equal(await page.locator('html').getAttribute('data-playing'),'false');assert.equal(await page.locator('#resume').isVisible(),true);
 await page.screenshot({path:out+'/returned-to-menu.png'});
 const socket=sockets.at(-1);await page.waitForTimeout(150);
 assert.ok(socket.states.length&&socket.inputs.length,'restored socket receives state and resumes neutral inputs');
 const authority=socket.states[0].state,first=socket.inputs[0],angle=Math.atan2(Math.sin(first.yaw-authority.players[slot].yaw),Math.cos(first.yaw-authority.players[slot].yaw));
 assert.ok(Math.abs(angle)<.1,`first input facing differs from native handoff by ${angle.toFixed(3)} radians`);
 assert.ok(first.viewTick>=authority.tick-4,'first input uses a fresh snapshot timeline');
 assert.equal(first.x,0);assert.equal(first.y,0);assert.equal(first.fire,false);
 await page.locator('#resume').click();
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await page.waitForFunction(seq=>fetch('/games/botstrike/api/state').then(r=>r.json()).then(({room})=>room.state.players[room.slot].last_seq>=seq),first.seq);
 assert.deepEqual(errors,[]);
 console.log('Delayed reconnect restores native facing, snapshot timeline and the same playable seat');
}finally{await browser.close()}
