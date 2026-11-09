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
function navigationActor(stoppedPositions,{modifiers=[],paused=false,stoppedPosition,startPosition=[0,0],life=1}={}){
 const history=[],keys=new Set(modifiers),positions=[...stoppedPositions];let pendingStop=false,seq=0,lastMovement=null;
 const player={slot:0,life,alive:true,position:[startPosition[0],0,startPosition[1]],velocity:[0,0,0],yaw:0,pitch:0,crouch:keys.has('KeyF'),stance:keys.has('KeyF')?1:0,last_seq:0};
 const state={id:'ContractRoom',slot:0,config:{map:0},state:{tick:0,players:[player]}};
 const actor={id:'Contract',index:0,heldKeys:keys,lastPresentation:{index:0,camera:{yaw:0,pitch:0}},commands:[],history,
  record(kind,data){const row={index:++this.index,nodeAtMs:performance.now(),nodeUnixMs:Date.now(),...data};history.push({kind,...row});return row;},
  async key(code,direction){this.record('driver_input',{code,direction});this.commands.push({code,direction});const moved=keys.has('KeyW')||keys.has('KeyA')||keys.has('KeyS')||keys.has('KeyD');if(direction==='down')keys.add(code);else keys.delete(code);if(moved&&direction==='up'&&['KeyW','KeyA','KeyS','KeyD'].includes(code))pendingStop=true;},
  emit(){const input={seq:++seq,x:Number(keys.has('KeyD'))-Number(keys.has('KeyA')),y:Number(keys.has('KeyW'))-Number(keys.has('KeyS')),walk:keys.has('ShiftLeft'),crouch:keys.has('KeyF'),yaw:this.lastPresentation.camera.yaw,pitch:this.lastPresentation.camera.pitch};this.lastInput=this.record('input',{input});player.last_seq=input.seq;player.yaw=input.yaw;player.pitch=input.pitch;player.crouch=input.crouch;player.stance=input.crouch?1:0;state.state.tick++;if(input.x||input.y)lastMovement={x:input.x,y:input.y,yaw:input.yaw,world:[-Math.sin(input.yaw)*input.y+Math.cos(input.yaw)*input.x,-Math.cos(input.yaw)*input.y-Math.sin(input.yaw)*input.x]};if(!input.x&&!input.y&&pendingStop){pendingStop=false;const position=stoppedPosition?stoppedPosition({position:[player.position[0],player.position[2]],movement:lastMovement}):positions.shift();if(position)player.position=[position[0],0,position[1]];}return this.lastInput;},
  async waitInput(predicate,{afterIndex=0}={}){if(paused)throw Error('No new controls while paused');const existing=history.find(row=>row.kind==='input'&&row.index>afterIndex&&predicate(row));if(existing)return existing;await new Promise(resolve=>setTimeout(resolve,15));const row=this.emit();assert.ok(row.index>afterIndex);assert.ok(predicate(row),'Contract fixture must request the current normal keyboard state');return row;},
  watchInputSent(predicate,{afterIndex=0}={}){let timer;const promise=new Promise((resolve,reject)=>{timer=setTimeout(()=>{try{const row=this.emit();assert.ok(row.index>afterIndex);assert.ok(predicate(row));resolve(row);}catch(error){reject(error);}},15);});return{promise,cancel(){clearTimeout(timer);}};},
  async waitRoom(predicate){assert.ok(predicate(structuredClone(state)),'Must wait for the public stopped acknowledgement');return structuredClone(state);},
  async aim(dx,dy){this.commands.push({device:'aim',dx,dy});this.lastPresentation.camera.yaw-=Math.round(dx)*.0025;this.lastPresentation.camera.pitch-=Math.round(dy)*.0025;},
  async waitPresentation(predicate,{afterIndex=0}={}){this.lastPresentation={index:++this.index,camera:{...this.lastPresentation.camera}};assert.ok(this.index>afterIndex);assert.ok(predicate(this.lastPresentation));return this.lastPresentation;},
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

test('navigation releases a sent pulse before unrelated observation reads can hold it open',{timeout:1500},async()=>{
 const actor=navigationActor([[5,0]]),wait=actor.waitInput;let readsWhileMoving=0;
 actor.waitInput=async function(...args){if([...this.heldKeys].some(key=>['KeyW','KeyA','KeyS','KeyD'].includes(key))){readsWhileMoving++;await new Promise(()=>{});}return wait.apply(this,args);};
 const arrivals=await moveBrowser(actor,[[5,0]],{timeoutPerWaypoint:1000});
 assert.equal(arrivals[0].position[0],5);assert.equal(readsWhileMoving,0);
 assert.ok(actor.commands.some(row=>row.code==='KeyD'&&row.direction==='up'));
});

test('a missing sent pulse fails and releases held keys before any success marker',async()=>{
 const actor=navigationActor([]),marks=[];let cancelled=false;
 actor.watchInputSent=()=>({promise:new Promise((_,reject)=>setTimeout(()=>reject(Error('No matching actual send')),20)),cancel(){cancelled=true;}});
 await assert.rejects(moveBrowser(actor,[[5,0]],{mark:(label,data)=>marks.push({label,...data})}),/No matching actual send/);
 assert.equal(cancelled,true);assert.deepEqual([...actor.heldKeys],[]);
 assert.ok(actor.commands.some(row=>row.code==='KeyD'&&row.direction==='up'));
 assert.ok(!marks.some(row=>row.label==='route-pulse-sent'||row.label==='route-waypoint-arrived'));
});

test('a delivered keydown that rejects still requests keyup and retains the original failure',async()=>{
 const actor=navigationActor([]),key=actor.key,watch=actor.watchInputSent,marks=[];let cancelled=false;
 actor.key=async function(code,direction){await key.call(this,code,direction);if(code==='KeyD'&&direction==='down')throw Error('Delivered keydown failure');};
 actor.watchInputSent=function(...args){const value=watch.apply(this,args);return{promise:value.promise,cancel(){cancelled=true;value.cancel();}};};
 await assert.rejects(moveBrowser(actor,[[5,0]],{mark:label=>marks.push(label)}),/Delivered keydown failure/);
 assert.equal(cancelled,true);assert.deepEqual([...actor.heldKeys],[]);
 assert.ok(actor.commands.some(row=>row.code==='KeyD'&&row.direction==='up'));
 assert.ok(!marks.includes('route-pulse-sent')&&!marks.includes('route-waypoint-arrived'));
});

test('bounded fine search retains a shorter pulse after overshoot instead of repeating a cold linear search',{timeout:3000},async()=>{
 let requestedHold=0,pulses=0,applied=0;const marks=[];
 const actor=navigationActor([],{stoppedPosition({position,movement}){
  if(++pulses>9)throw Error('Synthetic actuation budget exceeded');
  if(requestedHold<20)return position;
  const step=++applied===1?11.28:7.91;
  return[position[0]+movement.x*step,position[1]-movement.y*step];
 }});
 const arrivals=await moveBrowser(actor,[[5,0]],{mark:(label,data)=>{marks.push({label,...structuredClone(data)});if(label==='route-pulse-start')requestedHold=data.extraHoldMs;}});
 assert.deepEqual(marks.filter(x=>x.label==='route-pulse-start').map(x=>x.extraHoldMs),[0,4,8,16,32,16,32]);
 assert.equal(pulses,7);assert.equal(applied,2);assert.ok(Math.abs(arrivals[0].position[0]-5)<=2);
 assert.deepEqual(marks.filter(x=>x.label==='route-pulse-stopped').map(x=>x.fineAdjustmentReason),['zero_displacement_double','zero_displacement_double','zero_displacement_double','zero_displacement_double','overshoot_halve','zero_displacement_double','overshoot_halve']);
 assert.deepEqual([...actor.heldKeys],[]);
});

test('fine search reaches the unchanged60ms cap and reports stalled motion without inventing arrival',{timeout:3000},async()=>{
 let requestedHold=0,pulses=0;const starts=[],marks=[];
 const actor=navigationActor([],{stoppedPosition({position}){assert.ok(requestedHold<=60);if(++pulses>8)throw Error('Synthetic stalled-motion budget exceeded');return position;}});
 await assert.rejects(moveBrowser(actor,[[5,0]],{mark:(label,data)=>{marks.push(label);if(label==='route-pulse-start'){requestedHold=data.extraHoldMs;starts.push(requestedHold);}}}),/Synthetic stalled-motion budget exceeded/);
 assert.deepEqual(starts,[0,4,8,16,32,60,60,60,60]);assert.ok(!marks.includes('route-waypoint-arrived'));assert.deepEqual([...actor.heldKeys],[]);
});

test('useful variable displacements can still shrink below the search seed without a persistent actuation floor',{timeout:3000},async()=>{
 let requestedHold=0,applied=0;const starts=[];
 const actor=navigationActor([],{stoppedPosition({position,movement}){
  if(requestedHold===0||requestedHold===4)return position;
  const steps=[4,3,.5,.75],step=steps[applied++];assert.ok(step!==undefined,'Bounded synthetic variable-motion catalog');
  return[position[0]+movement.x*step,position[1]-movement.y*step];
 }});
 const arrivals=await moveBrowser(actor,[[10,0]],{mark:(label,data)=>{if(label==='route-pulse-start'){requestedHold=data.extraHoldMs;starts.push(requestedHold);}}});
 assert.deepEqual(starts,[0,4,8,8,2,2]);assert.ok(Math.abs(arrivals[0].position[0]-10)<=2);assert.deepEqual([...actor.heldKeys],[]);
});

test('normal mouse plus cardinal inputs escape the observed axis trap using actual stopped poses',{timeout:3000},async()=>{
 const length=7.91015625,marks=[];let pulses=0;
 const actor=navigationActor([],{startPosition:[95.77664375,241],stoppedPosition({position,movement}){
  assert.ok(++pulses<=4,'Bounded two-leg counterexample');assert.equal(Math.hypot(movement.x,movement.y),1);
  return position.map((value,i)=>value+movement.world[i]*length);
 }});
 const watch=actor.watchInputSent;let rejectedOldHeadings=0;
 actor.watchInputSent=function(predicate,options){return watch.call(this,row=>{if(this.commands.some(command=>command.device==='aim')){assert.equal(predicate({...row,input:{...row.input,yaw:row.input.yaw+.1}}),false);assert.equal(predicate({...row,input:{...row.input,pitch:.1}}),false);rejectedOldHeadings++;}return predicate(row);},options);};
 const arrivals=await moveBrowser(actor,[[100,240]],{mark:(label,data)=>marks.push({label,...structuredClone(data)})});
 assert.equal(pulses,3);assert.ok(Math.hypot(arrivals[0].position[0]-100,arrivals[0].position[2]-240)<=2);
 const plans=marks.filter(row=>row.label==='route-steering-planned');assert.equal(plans.length,1);assert.equal(plans[0].observedStep,length);assert.equal(plans[0].envelope,20);assert.match(plans[0].specSha256,/^[a-f0-9]{64}$/);
 const starts=marks.filter(row=>row.label==='route-pulse-start'),stops=marks.filter(row=>row.label==='route-pulse-stopped');
 assert.deepEqual(starts.map(row=>row.steering?.phase),[undefined,'detour','closure']);assert.equal(starts[2].extraHoldMs,starts[1].extraHoldMs);
 assert.deepEqual(starts[2].beforePublic.position,stops[1].publicAck.position,'Closure starts at the real stopped position');
 assert.ok(stops[1].publicAck.distance>stops[0].publicAck.distance,'The first leg earns no radial progress');
 assert.equal(rejectedOldHeadings,2);assert.ok(actor.commands.some(row=>row.device==='aim'));assert.deepEqual([...actor.heldKeys],[]);
});

test('variable real step lengths never turn a predicted triangle endpoint into arrival',{timeout:3000},async()=>{
 const lengths=[7.91015625,11.28,1],marks=[];let pulses=0;
 const actor=navigationActor([],{startPosition:[95.77664375,241],stoppedPosition({position,movement}){
  const length=lengths[pulses++];if(length===undefined)throw Error('Variable-motion script complete');return position.map((value,i)=>value+movement.world[i]*length);
 }});
 await assert.rejects(moveBrowser(actor,[[100,240]],{mark:(label,data)=>marks.push({label,...structuredClone(data)})}),/Variable-motion script complete/);
 const stops=marks.filter(row=>row.label==='route-pulse-stopped');assert.equal(stops.length,3);assert.ok(stops[2].publicAck.distance>2);
 assert.ok(!marks.some(row=>row.label==='route-waypoint-arrived'));assert.deepEqual([...actor.heldKeys],[]);
 const starts=marks.filter(row=>row.label==='route-pulse-start');assert.deepEqual(starts[2].beforePublic.position,stops[1].publicAck.position);assert.equal(starts[3].steering.phase,'radial');
});

test('an actual steered displacement outside the fixed20-unit envelope fails with released keys',{timeout:3000},async()=>{
 const lengths=[7.91015625,25],marks=[];
 const actor=navigationActor([],{startPosition:[95.77664375,241],stoppedPosition({position,movement}){const length=lengths.shift();assert.ok(length!==undefined);return position.map((value,i)=>value+movement.world[i]*length);}});
 await assert.rejects(moveBrowser(actor,[[100,240]],{mark:label=>marks.push(label)}),/actual stopped motion left its safe20-unit/);
 assert.ok(!marks.includes('route-waypoint-arrived'));assert.deepEqual([...actor.heldKeys],[]);
});

test('a late in-flight mouse operation settles before cleanup and grants no later navigation input',{timeout:2000},async()=>{
 let pulses=0,aimSettled=false;const marks=[];
 const actor=navigationActor([],{startPosition:[95.77664375,241],stoppedPosition({position,movement}){pulses++;return position.map((value,i)=>value+movement.world[i]*7.91015625);}}),aim=actor.aim;
 actor.aim=async function(...args){await new Promise(resolve=>setTimeout(resolve,180));await aim.apply(this,args);aimSettled=true;};
 await assert.rejects(moveBrowser(actor,[[100,240]],{timeoutPerWaypoint:180,mark:label=>marks.push(label)}),/Navigation steering deadline exceeded/);
 assert.equal(aimSettled,true);assert.equal(pulses,1);assert.equal(actor.commands.filter(row=>row.device==='aim').length,1);
 assert.equal(actor.commands.filter(row=>row.direction==='down'&&['KeyW','KeyA','KeyS','KeyD'].includes(row.code)).length,1);
 assert.ok(!marks.includes('route-waypoint-arrived'));assert.deepEqual([...actor.heldKeys],[]);
});

test('unknown life cannot authorize geometric steering after a real overshoot',async()=>{
 const actor=navigationActor([],{life:null,startPosition:[95.77664375,241],stoppedPosition({position,movement}){return position.map((value,i)=>value+movement.world[i]*7.91015625);}});
 await assert.rejects(moveBrowser(actor,[[100,240]]),/needs a valid current life/);
 assert.ok(!actor.commands.some(row=>row.device==='aim'));assert.deepEqual([...actor.heldKeys],[]);
});

test('a changed life during turning prevents the next movement keydown',async()=>{
 const actor=navigationActor([],{startPosition:[95.77664375,241],stoppedPosition({position,movement}){return position.map((value,i)=>value+movement.world[i]*7.91015625);}}),room=actor.room;
 actor.room=async function(){const value=await room.call(this);if(this.commands.some(row=>row.device==='aim'))value.state.players[0].life=2;return value;};
 await assert.rejects(moveBrowser(actor,[[100,240]]),/pose or swept path is unavailable or unsafe/);
 assert.equal(actor.commands.filter(row=>row.direction==='down'&&['KeyW','KeyA','KeyS','KeyD'].includes(row.code)).length,1);assert.deepEqual([...actor.heldKeys],[]);
});

test('a new room with the same map and life cannot inherit the old steering plan',async()=>{
 const actor=navigationActor([],{startPosition:[95.77664375,241],stoppedPosition({position,movement}){return position.map((value,i)=>value+movement.world[i]*7.91015625);}}),room=actor.room;
 actor.room=async function(){const value=await room.call(this);if(this.commands.some(row=>row.device==='aim'))value.id='DifferentRoom';return value;};
 await assert.rejects(moveBrowser(actor,[[100,240]]),/pose or swept path is unavailable or unsafe/);
 assert.equal(actor.commands.filter(row=>row.direction==='down'&&['KeyW','KeyA','KeyS','KeyD'].includes(row.code)).length,1);assert.deepEqual([...actor.heldKeys],[]);
});


test('optional actuation guard blocks the next keydown after abort during a pending first modifier',async()=>{
 const actor=navigationActor([]),key=actor.key;let abort=false,started,release;
 const first=new Promise(resolve=>started=resolve),pending=new Promise(resolve=>release=resolve);
 actor.key=async function(code,direction){await key.call(this,code,direction);if(code==='ShiftLeft'&&direction==='down'){started();await pending;}};
 const task=moveBrowser(actor,[[5,0]],{actuationGuard(){if(abort)throw Error('Owned movement aborted');}});task.catch(()=>{});await first;abort=true;release();await assert.rejects(task,/Owned movement aborted/);
 assert.deepEqual(actor.commands.filter(x=>x.direction==='down').map(x=>x.code),['ShiftLeft']);assert.ok(actor.commands.some(x=>x.code==='ShiftLeft'&&x.direction==='up'));assert.deepEqual([...actor.heldKeys],[]);
});
test('optional pinned-context guard allows cleanup but prevents later keys after life changes mid-operation',async()=>{
 const actor=navigationActor([]),key=actor.key;let life=1;
 actor.key=async function(code,direction){await key.call(this,code,direction);if(code==='ShiftLeft'&&direction==='down'){await Promise.resolve();life=2;}};
 await assert.rejects(moveBrowser(actor,[[5,0]],{actuationGuard(){assert.equal(life,1,'Pinned target life changed');}}),/Pinned target life changed/);
 assert.deepEqual(actor.commands.filter(x=>x.direction==='down').map(x=>x.code),['ShiftLeft']);assert.ok(actor.commands.some(x=>x.code==='ShiftLeft'&&x.direction==='up'));assert.deepEqual([...actor.heldKeys],[]);
});
