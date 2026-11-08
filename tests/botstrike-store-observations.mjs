// Private Store QA observations. No Native input, camera or receipt is assigned.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createReadStream} from 'node:fs';
import {createInterface} from 'node:readline';
import {classifyWebGLRenderer} from '../tools/network-browser-actors.mjs';

export const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
export const angle=value=>Math.atan2(Math.sin(value),Math.cos(value));
export const neutral=input=>!!input&&input.x===0&&input.y===0&&['fire','reload','walk','crouch','jump','ability','interact','scope','drop'].every(key=>!input[key])&&!input.item&&!input.practice&&input.weapon==null;
export function privateArtifacts(directory){
 fs.mkdirSync(directory,{recursive:true,mode:0o700});const stat=fs.lstatSync(directory);
 assert.ok(stat.isDirectory()&&!stat.isSymbolicLink()&&(process.getuid?.()===undefined||stat.uid===process.getuid()),'QA artifacts require an owned directory');
 fs.chmodSync(directory,0o700);return path.resolve(directory);
}
export function writePrivate(file,value){fs.writeFileSync(file,JSON.stringify(value,null,2)+'\n',{mode:0o600,flag:'wx'});}
export async function until(predicate,{timeout=15000,label='Store observation'}={}){
 const end=performance.now()+timeout;while(performance.now()<end){const value=await predicate();if(value)return value;await pause(20);}throw Error(label+' timed out');
}
export function observeStoreProtocol(page,origin,{limit=16384}={}){
 const observation={inputs:[],controls:[],resyncs:[],snapshots:[],buys:[],socketCloses:[],errors:[],dropped:0};let eventIndex=0;
 const keep=(key,value)=>{if(observation[key].length>=limit){observation.dropped++;return;}observation[key].push({eventIndex:++eventIndex,nodeAtMs:performance.now(),nodeUnixMs:Date.now(),...value});};
 page.on('websocket',socket=>{
  const url=new URL(socket.url());if(url.origin!==origin.replace(/^http/,'ws')||url.pathname!=='/games/botstrike/api/socket')return;
  socket.on('close',()=>keep('socketCloses',{closed:true}));
  socket.on('framesent',({payload})=>{let value;try{value=JSON.parse(String(payload));}catch{return;}
   if(value.type==='input')keep('inputs',{...value.input,room:value.room,deliveryAttached:!!value.delivery});
  });
  socket.on('framereceived',({payload})=>{let value;try{value=JSON.parse(String(payload));}catch{return;}
   if(value.type==='control')keep('controls',{active:value.active===true,inputProtocol:value.inputProtocol?{version:value.inputProtocol.version,maxAgeMs:value.inputProtocol.maxAgeMs}:null});
   if(value.type==='input_resync')keep('resyncs',{code:value.code});
   if(value.type==='state'&&value.room?.state){const room=value.room,me=room.state.players[room.slot];keep('snapshots',{room:room.id,tick:room.state.tick,phase:room.state.phase,slot:room.slot,life:me.life,lastSeq:me.last_seq,deliveryAttached:!!value.delivery,alive:me.alive});}
  });
 });
 page.on('request',request=>{if(request.method()!=='POST'||request.url()!==origin+'/games/botstrike/api/action')return;let value;try{value=request.postDataJSON();}catch{return;}
  if(value?.type==='buy')keep('buys',{item:value.item,life:value.life??null,deliveryAttached:!!value.delivery,controlTokenAttached:typeof value.controlToken==='string'});
 });
 page.on('pageerror',error=>keep('errors',{code:error.name||'PageError'}));return observation;
}
export async function assertReceiptProtocol(game,observation){
 await until(()=>observation.controls.some(control=>control.active&&control.inputProtocol?.version===1&&control.inputProtocol.maxAgeMs===400),{label:'Store receipt control handshake'});
 await until(async()=>await game.locator('html').getAttribute('data-input-protocol')==='receipt',{label:'Actual Store iframe receipt protocol UI'});
 assert.ok(observation.inputs.every(input=>input.deliveryAttached),'Every modern Store input carries the outer delivery envelope');
}
export async function graphicsObservation(game,browser,{hardware=false}={}){
 const value=await game.locator('#arena').evaluate(canvas=>{
  const gl=canvas.getContext('webgl2')||canvas.getContext('webgl'),ext=gl?.getExtension('WEBGL_debug_renderer_info'),rect=canvas.getBoundingClientRect();
  return {atMs:performance.now(),version:gl?.getParameter(gl.VERSION)??null,renderer:gl?.getParameter(gl.RENDERER)??null,unmaskedRenderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null,unmaskedVendor:ext?gl.getParameter(ext.UNMASKED_VENDOR_WEBGL):null,devicePixelRatio,pointerCoarse:matchMedia('(pointer:coarse)').matches,viewport:{width:innerWidth,height:innerHeight},canvasCss:{width:rect.width,height:rect.height},canvasBacking:{width:canvas.width,height:canvas.height}};
 });
 value.browserVersion=browser.version();value.classification=classifyWebGLRenderer(value);value.sourceConfiguredShadow={width:value.pointerCoarse?512:1024,height:value.pointerCoarse?512:1024,basis:'unchanged scene.mjs initial coarse-media branch; not GPU texture readback'};
 if(hardware)assert.equal(value.classification,'hardware','Hardware QA requires a known actual game-canvas hardware renderer');return value;
}
export async function integerResume(page,game){
 const box=await game.locator('#resume').boundingBox();assert.ok(box&&box.width>0&&box.height>0);const anchor={x:Math.round(box.x+box.width/2),y:Math.round(box.y+box.height/2)};
 await page.mouse.click(anchor.x,anchor.y);await game.locator('html[data-playing=true]').waitFor();
 await until(()=>game.locator('#arena').evaluate(canvas=>document.pointerLockElement===canvas),{label:'Actual Store iframe pointer lock'});return anchor;
}
export async function trustedStoreAim({page,game,native,observation}){
 if(await game.locator('html').getAttribute('data-playing')==='true')await page.keyboard.press('Escape');
 const capture=await game.locator('#arena').evaluateHandle(canvas=>{const events=[];let dropped=0;const observe=event=>{if(event.target===canvas){if(events.length>=128){dropped++;return;}events.push({trusted:event.isTrusted,movementX:event.movementX,movementY:event.movementY,locked:document.pointerLockElement===canvas});}};addEventListener('mousemove',observe);return{clear(){events.length=0;dropped=0;},read(){return events.slice();},dropped(){return dropped;},close(){removeEventListener('mousemove',observe);}};});
 try{
  const anchor=await integerResume(page,game);await pause(100);await capture.evaluate(handle=>handle.clear());
  const from=observation.inputs.at(-1)?.seq??-1;await page.keyboard.down('KeyW');
  try{
   const before=await native((player,room)=>observation.inputs.some(input=>input.room===room.id&&input.seq===player.last_seq&&input.seq>from&&input.y===1));
   const input=observation.inputs.findLast(row=>row.room===before.id&&row.seq===before.state.players[before.slot].last_seq);assert.ok(input&&!input.scope);
   const dx=24,dy=input.pitch>0?8:-8;await page.mouse.move(anchor.x+dx,anchor.y+dy);await pause(60);
   const events=await capture.evaluate(handle=>handle.read()),sum=events.reduce((total,event)=>({x:total.x+event.movementX,y:total.y+event.movementY}),{x:0,y:0});
   assert.equal(await capture.evaluate(handle=>handle.dropped()),0,'Trusted mouse evidence must not drop events');assert.ok(events.length&&events.every(event=>event.trusted&&event.locked),'Look must be delivered by trusted locked browser mouse events');assert.deepEqual(sum,{x:dx,y:dy},'Real integer mouse movement must not be cancelled by a headless pointer warp');
   const yaw=angle(input.yaw-dx*.0025),pitch=Math.max(-1.5,Math.min(1.5,input.pitch-dy*.0025));
   const applied=await native((player,room)=>{const sent=observation.inputs.findLast(row=>row.room===room.id&&row.seq===player.last_seq);return sent?.seq>input.seq&&sent.y===1&&Math.abs(angle(sent.yaw-yaw))<1e-6&&Math.abs(sent.pitch-pitch)<1e-6&&Math.abs(angle(player.yaw-sent.yaw))<1e-6&&Math.abs(player.pitch-sent.pitch)<1e-6;});
   return {kind:'trusted-store-move-aim',inputMode:'trusted-browser-pointerlock',anchor,requestedDelta:{x:dx,y:dy},observedDelta:sum,trustedEvents:events.length,acknowledgedSequence:applied.state.players[applied.slot].last_seq,nativeTick:applied.state.tick,expected:{yaw,pitch}};
  }finally{await page.keyboard.up('KeyW');}
 }finally{await capture.evaluate(handle=>handle.close());await capture.dispose();}
}
export async function installRecoveryUiObserver(game){return game.locator('body').evaluateHandle(()=>{
 const rows=[];let signature,dropped=0;const sample=()=>{const resume=document.querySelector('#resume'),value={atMs:performance.now(),playing:document.documentElement.dataset.playing==='true',disabled:resume.disabled,resume:resume.textContent,status:document.querySelector('#status').textContent};const next=JSON.stringify([value.playing,value.disabled,value.resume,value.status]);if(next!==signature){signature=next;if(rows.length<256)rows.push(value);else dropped++;}};
 const observer=new MutationObserver(sample);for(const el of [document.documentElement,document.querySelector('#resume'),document.querySelector('#status')])observer.observe(el,{attributes:true,childList:true,subtree:el!==document.documentElement});sample();return{read(){return rows.slice();},dropped(){return dropped;},close(){observer.disconnect();}};
 });}
export function kernelCDrops(stats){return [...stats.server.qdisc.filter(row=>row.kind==='netem'&&row.dev==='ifbuC'),...stats.actors.C.qdisc.filter(row=>row.kind==='netem'&&row.dev==='ifbdC')].reduce((sum,row)=>sum+(row.drops||0),0);}

// Exact raw frames stay private. AI cover is identified from the corresponding
// packed takeover flag, never inferred from a human seat's aggregate shot count.
export async function analyzeStoreRecovery(file,{slot=0,restoreAt,heldSequences=[],neutralSeq,newMovementSeq}={}){
 const reader=createInterface({input:createReadStream(file),crlfDelay:Infinity}),held=new Set(heldSequences),arrivals=new Map(),inputs=new Map(),appliedNeutralTicks=new Set(),appliedMovementTicks=new Set(),result={nativeFrames:0,rawNativeFrames:0,obsoleteHeldFrames:[],expiredControlFrames:[],missingAdmissionFrames:[],rejected:{},neutralAck:false,newMovementAck:false,aiCoverShotEvents:0,humanShotEvents:0,headerBotsCapable:null};
 try{for await(const line of reader){const event=JSON.parse(line);
  if(event.type==='room_started')result.headerBotsCapable=event.config.bots;
  if(event.type==='input_arrival'&&event.slot===slot)arrivals.set(event.seq,event);
  if(event.type==='input_rejected'&&event.slot===slot)result.rejected[event.reason]=(result.rejected[event.reason]||0)+1;
  if(event.type==='native_input'){
   inputs.set(event.tick,event.inputs[slot]);if(inputs.size>128)inputs.delete(inputs.keys().next().value);const input=event.inputs[slot];if(!input||!(input[5]&256))continue;
   if(event.at>=restoreAt&&input[0]===neutralSeq&&input[1]===0&&input[2]===0&&(input[5]&767)===0&&input[6]==null&&input[7]==null&&!input[9]&&!input[11])appliedNeutralTicks.add(event.tick);
   if(event.at>=restoreAt&&input[0]===newMovementSeq&&(input[1]||input[2]))appliedMovementTicks.add(event.tick);
   const active=!!(input[1]||input[2]||(input[5]&1));if(event.at>=restoreAt&&active&&held.has(input[0]))result.obsoleteHeldFrames.push({tick:event.tick,seq:input[0]});
   const admission=arrivals.get(input[0])?.admission;if(active&&!admission)result.missingAdmissionFrames.push({tick:event.tick,seq:input[0]});if(active&&admission&&event.monotonicMs>=admission.deadlineAt)result.expiredControlFrames.push({tick:event.tick,seq:input[0]});
   for(const ticket of [...(event.pulseTickets||[]),...(event.purchaseTickets||[])])if(ticket.slot===slot){if(event.monotonicMs>=ticket.deadlineAt)result.expiredControlFrames.push({tick:event.tick,sourceSeq:ticket.sourceSeq??null});if(event.at>=restoreAt&&held.has(ticket.sourceSeq))result.obsoleteHeldFrames.push({tick:event.tick,sourceSeq:ticket.sourceSeq,field:ticket.field});}
  }
  if(event.type==='native_frame'){
   result.nativeFrames++;assert.equal(typeof event.rawLine,'string','Private Native frames must retain their original raw JSON line');result.rawNativeFrames++;
   const frame=JSON.parse(event.rawLine).state,player=frame.players[slot],input=inputs.get(frame.tick);assert.ok(inputs.has(frame.tick),'Every raw Native frame needs its exact same-tick dispatched input, including null AI input');
   if(event.at>=restoreAt){if(appliedNeutralTicks.has(frame.tick)&&player.last_seq>=neutralSeq&&arrivals.get(neutralSeq)?.at>=restoreAt)result.neutralAck=true;if(appliedMovementTicks.has(frame.tick)&&player.last_seq>=newMovementSeq&&arrivals.get(newMovementSeq)?.at>=restoreAt)result.newMovementAck=true;
    for(const shot of frame.events||[])if(shot.kind==='shot'&&shot.actor===slot){if(input?.[5]&256)result.humanShotEvents++;else if(result.headerBotsCapable?.[slot])result.aiCoverShotEvents++;}
   }
  }
 }}finally{reader.close();}
 assert.ok(result.nativeFrames>0&&result.rawNativeFrames===result.nativeFrames);assert.deepEqual(result.obsoleteHeldFrames,[],'Old held human controls cannot reacquire a fresh receipt');assert.deepEqual(result.missingAdmissionFrames,[],'Every active human input needs its original admission');assert.deepEqual(result.expiredControlFrames,[],'No human action reaches Native after its original receipt deadline');assert.ok(result.rejected.expired||result.rejected.unknown,'The real outage must cause an observed stale receipt rejection');assert.ok(result.neutralAck&&result.newMovementAck,'Fresh neutral and subsequent intentional movement need actual Native ACKs');return result;
}
