import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {movementKeys,visibleAim,verifyControlledTape,moveBrowser} from '../tools/network-fairness-scenarios.mjs';
test('normal keyboard navigation uses the native world/local direction convention from either spawn facing',()=>{
 assert.deepEqual(movementKeys(0,1,0),['KeyD']);assert.deepEqual(movementKeys(0,0,-1),['KeyW']);assert.deepEqual(movementKeys(Math.PI,1,0),['KeyA']);assert.deepEqual(movementKeys(Math.PI,0,1,{walk:true}),['KeyW','ShiftLeft']);assert.deepEqual(movementKeys(Math.PI/2,-1,0),['KeyW']);assert.deepEqual(movementKeys(0,0,0),[]);
});
test('synthetic packed-log validation distinguishes bots-capable configuration from actual per-tick takeover',async t=>{
 const directory=mkdtempSync(path.join(tmpdir(),'fairness-takeover-test-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));const file=path.join(directory,'tape.jsonl'),header={config:{bots:Array(10).fill(true)}},inputs=()=>Array.from({length:10},()=>[0,0,0,0,0,256]),first=inputs();first[0][5]=0;writeFileSync(file,[header,{inputs:first},{inputs:inputs()},{inputs:inputs()}].map(JSON.stringify).join('\n')+'\n',{mode:0o600});const result=await verifyControlledTape(file,{fromTick:2,toTick:3});assert.equal(result.checkedNativeFrames,2);assert.equal(result.allBotsCapableSeatsTakenOver,true);assert.ok(result.headerBotsCapable.every(Boolean));await assert.rejects(verifyControlledTape(file,{fromTick:1,toTick:3}),/takeover bit 256/);await assert.rejects(verifyControlledTape(file,{fromTick:2,toTick:4}),/interval must be complete/);
});
test('aim geometry is derived only from a visible presented target and the actual camera eye',()=>{
 const frame={renderTick:99.25,viewTick:99,camera:{position:[-100,56,600],yaw:0,pitch:0},players:[{slot:5,alive:true,position:[-100,0,240],stance:0}]};const result=visibleAim(frame,5);assert.equal(Math.abs(result.yaw),0);assert.equal(result.pitch,Math.atan2(-12,360));assert.deepEqual(result.eye,[-100,56,600]);assert.deepEqual(result.point,[-100,44,240]);assert.equal(result.renderTick,99.25);assert.throws(()=>visibleAim({...frame,players:[]},5),/currently authorized visible/);assert.throws(()=>visibleAim({...frame,players:[{...frame.players[0],alive:false}]},5),/currently authorized visible/);
});

// These are control-contract fixtures, not a network or Native simulator. The
// public stopped positions deliberately include lost motion and an overshoot.
function navigationActor(stoppedPositions,{modifiers=[],paused=false}={}){
 const history=[],keys=new Set(modifiers),positions=[...stoppedPositions];let pendingStop=false,seq=0;
 const player={slot:0,alive:true,position:[0,0,0],velocity:[0,0,0],yaw:0,pitch:0,crouch:keys.has('KeyF'),stance:keys.has('KeyF')?1:0,last_seq:0};
 const state={slot:0,state:{tick:0,players:[player]}};
 const actor={id:'Contract',index:0,heldKeys:keys,lastPresentation:{index:0,camera:{yaw:0,pitch:0}},commands:[],history,
  record(kind,data){const row={index:++this.index,nodeAtMs:performance.now(),nodeUnixMs:Date.now(),...data};history.push({kind,...row});return row;},
  async key(code,direction){this.record('driver_input',{code,direction});this.commands.push({code,direction});const moved=keys.has('KeyW')||keys.has('KeyA')||keys.has('KeyS')||keys.has('KeyD');if(direction==='down')keys.add(code);else keys.delete(code);if(moved&&direction==='up'&&['KeyW','KeyA','KeyS','KeyD'].includes(code))pendingStop=true;},
  emit(){const input={seq:++seq,x:Number(keys.has('KeyD'))-Number(keys.has('KeyA')),y:Number(keys.has('KeyW'))-Number(keys.has('KeyS')),walk:keys.has('ShiftLeft'),crouch:keys.has('KeyF'),yaw:0,pitch:0};this.lastInput=this.record('input',{input});player.last_seq=input.seq;player.crouch=input.crouch;player.stance=input.crouch?1:0;state.state.tick++;if(!input.x&&!input.y&&pendingStop){pendingStop=false;const position=positions.shift();if(position)player.position=[position[0],0,position[1]];}return this.lastInput;},
  async waitInput(predicate,{afterIndex=0}={}){if(paused)throw Error('No new controls while paused');const existing=history.find(row=>row.kind==='input'&&row.index>afterIndex&&predicate(row));if(existing)return existing;await new Promise(resolve=>setTimeout(resolve,15));const row=this.emit();assert.ok(row.index>afterIndex);assert.ok(predicate(row),'Contract fixture must request the current normal keyboard state');return row;},
  async waitRoom(predicate){assert.ok(predicate(structuredClone(state)),'Must wait for the public stopped acknowledgement');return structuredClone(state);},
  async room(){return structuredClone(state);},async drain(){},async sample(){return{window:{playing:!paused,visibility:'visible',hasFocus:true},status:paused?'Restoring controls. Online match continues.':''};}
 };actor.emit();return actor;
}
test('navigation anchors actual nonzero send and post-keyup neutral, adapts zero displacement and restores modifiers',async()=>{
 const actor=navigationActor([[0,0],[4,0]],{modifiers:['ShiftLeft']}),marks=[];
 const arrivals=await moveBrowser(actor,[[5,0]],{mark:(label,data)=>marks.push({label,...structuredClone(data)})});
 assert.equal(arrivals.length,1);assert.ok(Math.hypot(arrivals[0].position[0]-5,arrivals[0].position[2])<=2);
 const starts=marks.filter(row=>row.label==='route-pulse-start'),sends=marks.filter(row=>row.label==='route-pulse-sent'),releases=marks.filter(row=>row.label==='route-pulse-keyup'),stops=marks.filter(row=>row.label==='route-pulse-stopped');
 assert.deepEqual(starts.map(row=>row.extraHoldMs),[0,4]);assert.deepEqual(stops.map(row=>row.publicDisplacement),[0,4]);
 for(let i=0;i<2;i++){assert.ok(sends[i].observedSend.index>sends[i].downAnchor.index);assert.ok(stops[i].neutral.index>releases[i].keyupAnchor.index);assert.ok(stops[i].neutral.seq>sends[i].observedSend.seq);assert.ok(stops[i].publicAck.lastSeq>=stops[i].neutral.seq);assert.ok(stops[i].publicAck.speed<8);}
 assert.deepEqual([...actor.heldKeys],['ShiftLeft']);assert.equal(actor.lastInput.input.walk,true);assert.equal(actor.lastInput.input.crouch,false);assert.equal(marks.at(-1).label,'route-modifiers-restored');
});
test('navigation reverses normal keyboard direction after observed overshoot without increasing tolerance',async()=>{
 const actor=navigationActor([[10,0],[1,0],[5,0]]),marks=[];
 const arrivals=await moveBrowser(actor,[[5,0]],{mark:(label,data)=>marks.push({label,...structuredClone(data)})});
 assert.deepEqual(actor.commands.filter(row=>row.direction==='down'&&['KeyA','KeyD'].includes(row.code)).map(row=>row.code),['KeyD','KeyA','KeyD']);
 assert.equal(marks.find(row=>row.label==='route-pulse-stopped').overshot,true);assert.deepEqual(arrivals[0].goal,[5,0]);assert.equal(arrivals[0].position[0],5);assert.deepEqual([...actor.heldKeys],[]);
});
test('navigation exposes a real paused-control failure and separately reports unconfirmed cleanup',async()=>{
 const actor=navigationActor([],{paused:true}),marks=[];
 await assert.rejects(moveBrowser(actor,[[5,0]],{mark:(label,data)=>marks.push({label,...data})}),error=>{assert.match(error.message,/real browser controls are paused/);assert.match(error.navigationCleanupError,/No new controls while paused/);return true;});
 assert.equal(marks.at(-1).label,'route-modifiers-unconfirmed');assert.ok(!marks.some(row=>row.label==='route-waypoint-arrived'));
});
