import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {leaveBrowserRoom} from './botstrike-browser-room.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const base=process.env.STORE_URL||'http://127.0.0.1:19885',out=process.env.ART_OUTPUT||'tmp/post-match-browser';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']});
const errors=[];

async function launch(page,touch=false){
 page.setDefaultTimeout(60000);page.on('pageerror',error=>errors.push(error.message));
 await page.addInitScript(()=>{const Original=WebSocket;window.WebSocket=class extends Original{constructor(...args){super(...args);window.__roomSocket=this}}});
 await page.goto(base+'/games/botstrike/');
 await page.waitForFunction(()=>document.querySelector('#status')?.textContent.includes('Choose your chassis'));
 if(touch){await page.locator('#immersive-enter').click();await page.locator('#immersive-gate').waitFor({state:'hidden'});}
 await page.locator('#practice').click();
 await page.waitForFunction(()=>document.documentElement.dataset.playing==='true'&&window.__roomSocket?.onmessage);
 assert.equal(await page.locator('#match-results').isVisible(),false);
}

async function finalState(page,status='sealing',winner=0,verified=false){
 return await page.evaluate(async({status,winner,verified})=>{
  const room=(await(await fetch('/games/botstrike/api/state')).json()).room;
  const socket=window.__roomSocket;
  if(!window.__originalRoomMessage){window.__originalRoomMessage=socket.onmessage;socket.onmessage=null;window.__resultStep=0;}
  room.status=status;room.state.phase='finished';room.state.tick=1000000+(++window.__resultStep);room.state.winner=winner;room.state.score=[50,47];room.proof=verified?{verified:true}:null;
  room.state.players.forEach((player,i)=>{player.kills=i+2;player.deaths=10-i;player.assists=i%4;player.damage=(i+1)*170});
  Object.assign(room.state.players[0],{kills:7,deaths:5,assists:2,damage:1200});
  Object.assign(room.state.players[8],{kills:16,deaths:3,assists:4,damage:2800});
  window.__originalRoomMessage({data:JSON.stringify({type:'state',room})});
  return room;
 },{status,winner,verified});
}

async function leave(page){
 await page.evaluate(()=>{if(window.__roomSocket&&window.__originalRoomMessage)window.__roomSocket.onmessage=window.__originalRoomMessage});
 await leaveBrowserRoom(page);
}

try{
 const page=await browser.newPage({viewport:{width:1920,height:1080}});
 await page.addInitScript(()=>{
  const pad={index:0,connected:true,mapping:'standard',axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))};
  Object.defineProperty(navigator,'getGamepads',{configurable:true,value:()=>[pad]});window.__resultPad=pad;
 });
 async function tapPad(index){await page.evaluate(index=>{const button=window.__resultPad.buttons[index];button.pressed=true;button.value=1},index);await page.waitForTimeout(100);await page.evaluate(index=>{const button=window.__resultPad.buttons[index];button.pressed=false;button.value=0},index);await page.waitForTimeout(80)}
 let storageState;
 try{
  await launch(page);
  await finalState(page);
  assert.equal(await page.locator('#result-title').textContent(),'VICTORY');
  assert.equal(await page.locator('#result-our-score').textContent(),'50');
  assert.equal(await page.locator('#result-their-score').textContent(),'47');
  assert.equal(await page.locator('#result-own-line').textContent(),'7 K / 5 D / 2 A');
  assert.equal(await page.locator('#result-own-damage').textContent(),'1,200 DAMAGE');
  assert.match(await page.locator('#result-mvp-name').textContent(),/BOT 9/);
  assert.equal(await page.locator('#result-rows .result-row').count(),10);
  assert.deepEqual(await page.locator('.result-row[data-slot="0"] .result-number').allTextContents(),['7','5','2','1,200']);
  assert.equal(await page.locator('#roster').isVisible(),false);
  assert.equal(await page.locator('.room-chassis').isVisible(),false);
  assert.equal(await page.locator('#export').isVisible(),false);
  assert.match(await page.locator('#room-status').textContent(),/Verifying/);
  for(const [width,height]of [[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844],[844,390]]){
   await page.setViewportSize({width,height});
   await page.screenshot({path:join(out,`result-${width}x${height}.png`)});
   const layout=await page.evaluate(()=>{const result=document.querySelector('#match-results'),bounds=result.getBoundingClientRect();return{page:document.documentElement.scrollWidth,viewport:innerWidth,resultRight:bounds.right,rowOverflow:[...document.querySelectorAll('#result-rows .result-row')].some(row=>row.scrollWidth>row.clientWidth+1)}});
   assert.ok(layout.page<=width+1&&layout.resultRight<=width+1&&!layout.rowOverflow,JSON.stringify({width,height,layout}));
  }
  await page.setViewportSize({width:1920,height:1080});
  await tapPad(13);
  const focusedSlot=await page.evaluate(()=>document.activeElement?.dataset.slot);
  assert.ok(focusedSlot,'controller down reaches a final-result player row: '+JSON.stringify(await page.evaluate(()=>({active:document.activeElement?.outerHTML.slice(0,220),result:document.querySelector('#panel')?.dataset.result}))));
  const verifiedRoom=await finalState(page,'finished',0,true);
  assert.equal(await page.evaluate(()=>document.activeElement?.dataset.slot),focusedSlot,'focus survives a sealing update');
  assert.equal(await page.locator('#export').isVisible(),true);
  assert.match(await page.locator('#room-status').textContent(),/verified/);
  await finalState(page,'finished',1,true);
  assert.equal(await page.locator('#result-title').textContent(),'DEFEAT');
  await finalState(page,'finished',null,true);
  assert.equal(await page.locator('#result-title').textContent(),'MATCH DRAW');
  await finalState(page,'failed',0,false);
  assert.equal(await page.locator('#match-results').isVisible(),false);
  assert.equal(await page.locator('#result-title').textContent(),'MATCH INTERRUPTED');
  await page.route('**/games/botstrike/api/state',route=>route.fulfill({json:{room:verifiedRoom}}));
  await page.reload();await page.locator('#match-results').waitFor({state:'visible'});
  assert.equal(await page.locator('#result-rows .result-row').count(),10,'reload restores the final scoreboard');
  assert.equal(await page.locator('#rematch').isVisible(),true);
  assert.equal(await page.locator('#leave').isVisible(),true);
  await page.unroute('**/games/botstrike/api/state');
 }finally{await leave(page);storageState=await page.context().storageState();await page.close()}
 const mobile=await browser.newPage({viewport:{width:844,height:390},hasTouch:true,isMobile:true,storageState});
 try{
  await launch(mobile,true);
  await finalState(mobile,'finished',0,true);
  assert.equal(await mobile.locator('#match-results').isVisible(),true);
  assert.equal(await mobile.locator('#result-rows .result-row').count(),10);
  await mobile.screenshot({path:join(out,'result-touch-844x390.png')});
  await mobile.evaluate(()=>document.exitFullscreen?.());
  await mobile.setViewportSize({width:390,height:844});
  await mobile.waitForFunction(()=>document.querySelector('#immersive-gate').hidden);
  assert.equal(await mobile.locator('#match-results').isVisible(),true,'finished results remain readable in portrait');
  assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'portrait results fit the viewport');
  await mobile.screenshot({path:join(out,'result-touch-390x844.png')});
  await mobile.locator('#result-rows .result-row').last().scrollIntoViewIfNeeded();
  assert.ok(await mobile.evaluate(()=>document.querySelector('#result-rows .result-row:last-child').getBoundingClientRect().bottom<=innerHeight),'the last result row is reachable by touch scroll');
  await mobile.waitForFunction(()=>document.documentElement.dataset.resultScrolled==='true');
  const chrome=await mobile.evaluate(()=>({result:document.documentElement.dataset.result,scrolled:document.documentElement.dataset.resultScrolled,scrollTop:document.querySelector('#panel').scrollTop,brand:getComputedStyle(document.querySelector('.brand')).display,menu:getComputedStyle(document.querySelector('#menu-toggle')).display}));
  assert.deepEqual([chrome.brand,chrome.menu],['none','none'],'scrolled results release the top corners: '+JSON.stringify(chrome));
  await mobile.screenshot({path:join(out,'result-touch-390x844-bottom.png')});
  await leave(mobile);
  await mobile.waitForFunction(()=>!document.querySelector('#immersive-gate').hidden);
 }finally{await leave(mobile);await mobile.close()}
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({winnerLoserDraw:true,allPlayers:10,verificationStates:true,viewports:6,touch:true,out}));
}finally{await browser.close()}
