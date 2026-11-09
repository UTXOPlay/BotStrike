import {observeStoreProtocol,storeInputAck,neutral,until} from './botstrike-store-observations.mjs';
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885',out=process.env.CONTROL_ARTIFACTS||'/tmp/botstrike-controller-browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1920,height:1080}}),errors=[],frames=new Map();
const watch=page=>{page.setDefaultTimeout(60000);page.on('pageerror',error=>errors.push(error.message));frames.set(page,observeStoreProtocol(page,new URL(base).origin));};
async function currentNeutralProof(page,{afterEvent=0}={}){const record=frames.get(page);return until(()=>{const current=record.currentContext;return record.snapshots.find(snapshot=>snapshot.eventIndex>afterEvent&&record.inputs.some(input=>input.eventIndex>afterEvent&&storeInputAck(snapshot,input,{requireNeutral:true,current})));},{label:'Exact current-controller neutral Native ACK after claim'});}
const state=async()=>(await(await context.request.get(base+'/games/botstrike/api/state')).json()).room;

try{
 const first=await context.newPage();watch(first);
 await first.goto(base+'/games/botstrike/');
 await first.waitForFunction(()=>document.querySelector('#status').textContent.includes('Choose your chassis'));
 await first.locator('#practice').click();
 await first.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await first.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Connected'));
 const room=await state(),slot=room.slot,firstRecord=frames.get(first);await currentNeutralProof(first);
 await first.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&document.querySelector('#resume').hidden===false);
 const second=await context.newPage();watch(second);
 await second.goto(base+'/games/botstrike/');
 await second.waitForFunction(()=>document.querySelector('#status').textContent.includes('Viewing match. Resume to play.'));
 assert.equal((await state()).id,room.id);
 assert.notEqual(await second.locator('html').getAttribute('data-playing'),'true');
 assert.equal(frames.get(second).inputs.length,0,'the passive tab sends no combat input');
 await second.screenshot({path:out+'/passive-tab.png'});
 const before=(await state()).state.players[slot].last_seq,claimFrom=frames.get(second).snapshots.at(-1)?.eventIndex??0;assert.equal(await second.locator('#resume').isDisabled(),false,'Passive tab must be able to claim before it owns any receipt proof');
 await second.locator('#resume').click();
 await second.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await first.waitForFunction(()=>document.documentElement.dataset.playing==='false'&&/Control moved|Viewing match/.test(document.querySelector('#status').textContent));
 await second.waitForFunction(()=>document.querySelector('#status').textContent.startsWith('Connected'));
 const secondRecord=frames.get(second);
 assert.ok(secondRecord.controls.some(message=>message.active));
 const secondProof=await currentNeutralProof(second,{afterEvent:claimFrom});assert.equal(secondProof.room,room.id);assert.ok(neutral(secondRecord.inputs.find(input=>input.eventIndex>claimFrom)),'The new controller initially sends only neutral input');
 assert.ok(secondRecord.inputs.some(input=>input.seq>before));
 await second.screenshot({path:out+'/takeover-play.png'});
 await first.bringToFront();await first.waitForTimeout(200);
 const firstCount=firstRecord.inputs.length;await first.waitForTimeout(200);
 assert.equal(firstRecord.inputs.length,firstCount,'the previous tab stops submitting input');
 const returnClaimFrom=firstRecord.snapshots.at(-1)?.eventIndex??0;assert.equal(await first.locator('#resume').isDisabled(),false);await first.locator('#resume').click();
 await first.waitForFunction(()=>document.documentElement.dataset.playing==='true');
 await second.waitForFunction(()=>document.documentElement.dataset.playing==='false');
 await currentNeutralProof(first,{afterEvent:returnClaimFrom});assert.equal(await second.locator('#leave').isDisabled(),true);
 const passiveLeave=await second.evaluate(()=>fetch('/games/botstrike/api/action',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'leave'})}).then(response=>response.status));
 assert.equal(passiveLeave,400);
 assert.equal((await state()).status,'running');
 await first.keyboard.press('Escape');
 const [departure]=await Promise.all([first.waitForResponse(response=>response.url().endsWith('/api/action')&&response.request().postDataJSON()?.type==='leave'),first.locator('#leave').click()]);
 assert.equal(departure.status(),200);
 await second.waitForFunction(()=>document.querySelector('#room-info').hidden);
 assert.equal(await state(),null);
 assert.deepEqual(errors,[]);
 console.log('Two tabs share the room, and Resume transfers the live seat in both directions');
}finally{await browser.close()}
