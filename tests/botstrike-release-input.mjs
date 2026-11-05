import assert from 'node:assert/strict';
import {resizeMobile} from './mobile-viewport.mjs';
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));

// The default camera contract is 0.0025 radians per CSS pixel. GPU backing
// scale and iframe size must not alter that mapping. Controlled DOM mouse
// fixtures, outgoing packets and native state are compared independently.
// This verifies mapping while a real keyboard key is held; it does not verify
// physical mouse/touchpad delivery or OS palm rejection.
export async function verifyDesktopMapping({page,game,native,sent,records}){
 for(const [width,height]of [[1920,1080],[2560,1080],[2560,1440],[3840,2160]]){
  if(await game.locator('html').getAttribute('data-playing')==='true')await page.keyboard.press('Escape');
  await page.setViewportSize({width,height});
  await game.locator('canvas#arena').evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  if(await game.locator('html').getAttribute('data-playing')!=='true')await game.locator('#resume').click();
  await game.locator('html[data-playing=true]').waitFor();
  assert.equal(await game.locator('body').evaluate(()=>document.pointerLockElement?.id),'arena');
  const startSequence=sent.at(-1)?.seq??-1;
  await page.keyboard.down('KeyW');
  try{
   const baseline=await native((p,r)=>p.alive&&sent.some(i=>i.room===r.id&&i.seq===p.last_seq&&i.seq>startSequence&&i.y===1));
   // A wall may legitimately block root velocity. Match the movement packet
   // and native acknowledgement, rather than requiring free travel here.
   const before=sent.findLast(i=>i.room===baseline.id);assert.ok(before&&before.y===1);
   await game.locator('body').evaluate(()=>{
    window.releaseMouseDeltas=[];
    if(!window.releaseMouseObserver){window.releaseMouseObserver=true;document.addEventListener('mousemove',e=>window.releaseMouseDeltas.push([e.movementX,e.movementY]),true);}
   });
   const dy=before.pitch>0?8:-8;
   // A single explicit delta avoids headless DevTools pointer-lock warps,
   // which can insert opposite deltas and saturate pitch before measurement.
   const inputMode='controlled-dom-deltas';
   await game.locator('#arena').evaluate((el,dy)=>el.dispatchEvent(new MouseEvent('mousemove',{bubbles:true,movementX:24,movementY:dy,buttons:1})),dy);
   const deltas=await game.locator('body').evaluate(()=>window.releaseMouseDeltas);
   const dx=deltas.reduce((n,d)=>n+d[0],0),deliveredY=deltas.reduce((n,d)=>n+d[1],0);
   assert.ok(Math.abs(dx)>0&&Math.abs(deliveredY)>0,'the fixture must deliver both look axes: '+JSON.stringify(deltas));
   const yaw=angle(before.yaw-dx*.0025),pitch=Math.max(-1.5,Math.min(1.5,before.pitch-deliveredY*.0025));
   console.log('CSS mapping probe',JSON.stringify({viewport:[width,height],room:baseline.id,before:{seq:before.seq,yaw:before.yaw,pitch:before.pitch},deltas,expected:[yaw,pitch]}));
   const applied=await native((p,r)=>{
    const i=sent.findLast(i=>i.room===r.id&&i.seq===p.last_seq);
    return p.alive&&i?.seq>before.seq&&i.y===1&&Math.abs(angle(i.yaw-yaw))<1e-6&&Math.abs(i.pitch-pitch)<1e-6&&Math.abs(angle(p.yaw-i.yaw))<1e-6&&Math.abs(p.pitch-i.pitch)<1e-6;
   });
   const canvas=await game.locator('#arena').evaluate(e=>({css:[e.clientWidth,e.clientHeight],backing:[e.width,e.height]}));
   assert.deepEqual(canvas.css,[width,height]);assert.ok(canvas.backing[0]*canvas.backing[1]<=2560*1440+5000);
   records.push({kind:'desktop-move-aim',inputMode,roomId:applied.id,devicePixelRatio:await game.locator('body').evaluate(()=>devicePixelRatio),viewport:[width,height],canvas,deliveredDeltas:[dx,deliveredY],expected:[yaw,pitch],native:[applied.state.players[applied.slot].yaw,applied.state.players[applied.slot].pitch],nativeVelocity:applied.state.players[applied.slot].velocity,acknowledgedSequence:applied.state.players[applied.slot].last_seq});
   console.log('Simultaneous move/aim and CSS-pixel mapping passed',width,height);
  }finally{await page.keyboard.up('KeyW');}
 }
}

// Call while the two touch owners are still held. Rotation must clear fresh
// packets, while the server-driven match continues with the same room identity.
export async function verifyHeldRotation({page,game,native,sent,cdp,records}){
 const before=await native(p=>p.alive),roomId=before.id;
 await resizeMobile(page,390,844);await game.locator('#immersive-gate').waitFor();
 assert.equal(await game.locator('html').getAttribute('data-playing'),'false');
 // Ignore packets already in flight before the portrait gate was observed.
 const start=sent.length;
 const until=Date.now()+15000;
 while(sent.length<start+2&&Date.now()<until)await page.waitForTimeout(50);
 const fresh=sent.slice(start).filter(i=>i.room===roomId);assert.ok(fresh.length>=2,'rotation must send fresh released input');
 assert.ok(fresh.slice(-2).every(i=>i.x===0&&i.y===0&&!i.fire),'held touch controls must clear after portrait gating');
 const continued=await native((p,r)=>r.id===roomId&&r.state.tick>before.state.tick&&sent.some(i=>i.room===r.id&&i.seq===p.last_seq&&i.seq>=fresh.at(-1).seq&&i.x===0&&i.y===0&&!i.fire));
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await resizeMobile(page,844,390);await game.locator('#immersive-gate').waitFor({state:'hidden'});await game.locator('#resume').click();await game.locator('html[data-playing=true]').waitFor();
 records.push({kind:'portrait-releases-held-touch',viewport:[390,844],roomPreserved:continued.id===roomId,nativeTickBefore:before.state.tick,nativeTickAfter:continued.state.tick,freshReleasedPackets:fresh.length});
 console.log('Portrait released held movement/fire; native match continued and resumed');
}
