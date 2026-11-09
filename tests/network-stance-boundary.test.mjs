import test from 'node:test';
import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {STANCE_BOUNDARY_LIMITS,selectTargetStancePresentation,runTargetStanceBoundary} from '../tools/network-stance-boundary.mjs';

const context={pageInstance:'page-A',socketGeneration:1,ownerEpoch:1,proofGeneration:1,room:'contract-room',slot:0,life:1,localRecoveryEpoch:0};
const selection={sourceContext:context,afterEventIndex:10,afterPageMs:90,targetSlot:5,targetLife:1,minimumNativeTick:21};
function observation({stance=.5,eventIndex=11,callback=99,pageNow=100,targetLife=1,viewTick=21}={}){
 return{unavailableReason:null,dropped:0,presentationReferenceVersion:1,presentationReferenceAvailable:true,presentationReferenceUnavailableReason:null,currentPresentationRef:{...context,presentationReferenceVersion:1,eventIndex,callbackObservedAtMs:callback},pageEventIndex:eventIndex,sourceStatus:{evidenceAvailable:true,unavailableReason:null,dropped:0},currentContext:{...context,captureEvidenceAvailable:true,localFenceAvailable:true,connected:true,controller:true,localPaused:false,protocolVersion:2,maxAgeMs:400,pageNowMs:pageNow},presentations:[{...context,eventIndex,localPaused:false,localFenceAvailable:true,presentationReferenceVersion:1,callbackObservedAtMs:callback,frame:{slot:0,viewTick,players:[{slot:0,life:1,alive:true,stance:0},{slot:5,life:targetLife,alive:true,stance}]}}]};
}

test('boundary selection requires a new, current, fresh partial pose and never substitutes an older partial frame',()=>{
 const good=observation(),result=selectTargetStancePresentation(good,selection);assert.equal(result.renderedStance,.5);assert.equal(result.eventIndex,11);
 for(const stance of [0,1])assert.equal(selectTargetStancePresentation(observation({stance}),selection),null);
 assert.equal(selectTargetStancePresentation(observation({eventIndex:10}),selection),null);
 assert.equal(selectTargetStancePresentation(observation({callback:89}),selection),null);
 assert.equal(selectTargetStancePresentation(observation({callback:90}),selection).eventIndex,11,'Strict later serial establishes order when the page clock ties');
 assert.equal(selectTargetStancePresentation(observation({eventIndex:10,callback:90}),selection),null,'A tied clock cannot rescue an old serial');
 assert.equal(selectTargetStancePresentation(observation({pageNow:200}),selection),null);
 const newestSettled=observation({stance:0,eventIndex:12});newestSettled.presentations.unshift(good.presentations[0]);assert.equal(selectTargetStancePresentation(newestSettled,selection),null);
 const missing=observation();missing.presentations[0].frame.players=[];assert.equal(selectTargetStancePresentation(missing,selection),null);
 assert.equal(selectTargetStancePresentation(observation({viewTick:20}),selection),null,'A post-barrier partial frame from the old residual transition predates this train application');
 assert.equal(selectTargetStancePresentation(observation({viewTick:21}),selection).eventIndex,11,'A fresh partial pose at the newly proven train tick can be selected');
});

test('context, life, clock and durable-source failures cannot select a stance window',()=>{
 assert.throws(()=>selectTargetStancePresentation(observation({targetLife:2}),selection),/life changed/);
 const paused=observation();paused.currentContext.localPaused=true;assert.throws(()=>selectTargetStancePresentation(paused,selection),/unpaused/);
 const changed=observation();changed.currentContext.ownerEpoch++;assert.throws(()=>selectTargetStancePresentation(changed,selection),/context changed/);
 const lost=observation();lost.sourceStatus.evidenceAvailable=false;assert.throws(()=>selectTargetStancePresentation(lost,selection),/Durable/);
 const future=observation({callback:101});assert.throws(()=>selectTargetStancePresentation(future,selection),/ahead/);
 const noSerial=observation();delete noSerial.pageEventIndex;assert.throws(()=>selectTargetStancePresentation(noSerial,selection),/shared page event serial/);
 const invalidated=observation();invalidated.currentPresentationRef=null;invalidated.presentationReferenceAvailable=false;invalidated.presentationReferenceUnavailableReason='invalid_presentation_payload';assert.throws(()=>selectTargetStancePresentation(invalidated,selection),/Current completed presentation reference/);
 const mismatched=observation();mismatched.currentPresentationRef.eventIndex++;assert.throws(()=>selectTargetStancePresentation(mismatched,selection),/reference does not match/);
});

// These are API/control contract fixtures. No Native simulator or game-state
// injection API is supplied; synthetic displayed stance follows normal F events.
function fixture({neverPartial=false,changedTargetLife=false,rejectFirstDown=false,lateSnapshotOnce=false,oldOriginalOnce=false}={}){
 const actors={},commands=[],marks=[],actions=[],shots=[],proofCalls=[];let rejectPending=rejectFirstDown,nativeTick=100,latePending=lateSnapshotOnce,oldPending=oldOriginalOnce;
 const players=[{slot:0,life:1,alive:true,crouch:false},{slot:5,life:1,alive:true,crouch:false}];
 for(const [id,slot]of [['A',0],['B',5]]){
  let serial=0;const inputs=[],snapshots=[];
  const pageContext=()=>({...context,pageInstance:'page-'+id,slot,localFenceRequired:true,localFenceAvailable:true,localPaused:false,localEpochObservedAt:0,connected:true,controller:true,protocolVersion:2,maxAgeMs:400,captureEvidenceAvailable:true,nativeTick});
  actors[id]={id,index:0,seq:0,socketGeneration:1,ownerGeneration:1,proofGeneration:1,roomGeneration:1,control:{active:true},heldKeys:new Set(),async key(code,state){assert.equal(code,'KeyF','Scenario must use only normal crouch key commands');assert.ok(state==='down'||state==='up');this.index++;commands.push({actor:id,code,state,at:performance.now()});if(state==='down')this.heldKeys.add(code);else this.heldKeys.delete(code);players.find(p=>p.slot===slot).crouch=this.heldKeys.has('KeyF');if(state==='down'&&rejectPending){rejectPending=false;throw Error('Delivered crouch keydown rejected');}},async room(){const all=Array.from({length:10},(_,i)=>({slot:i,life:1,alive:true,crouch:false}));for(const p of players)all[p.slot]={...p};return{id:'contract-room',slot,status:'running',state:{tick:nativeTick,players:all}};},async readLocalRecovery(){return{currentContext:{...pageContext(),pageNowMs:performance.now()},pageEventIndex:serial,wireJoin:{available:true},unavailableReason:null,dropped:0,inputs:structuredClone(inputs),snapshots:structuredClone(snapshots)};},makeProof(){
   const crouch=this.heldKeys.has('KeyF'),seq=++this.seq,tick=++nativeTick,now=performance.now(),ctx=pageContext(),wire={socketGeneration:1,ownerGeneration:1,proofGeneration:1,roomGeneration:1},input={seq,crouch,x:0,y:0},sent={...wire,index:++this.index,life:1,input},ack={version:1,seq,tick,life:1,neutral:!crouch},player={slot,alive:true,life:1,last_seq:seq,crouch,stance:crouch?.5:0};
   const original={...ctx,...input,eventIndex:++serial,pageSentAt:now,sendSerial:seq,nativeTick:tick-1,currentSocket:true,cdpSocketGeneration:1,wireVerified:true,wireJoin:'exact_bytes_unique',wireSha256:'a'.repeat(64),wireBytes:100,deliveryAttached:true};
   if(crouch&&oldPending){oldPending=false;original.eventIndex=0;original.pageSentAt=0;}
   inputs.push(original);snapshots.push({...ctx,eventIndex:++serial,tick,slot,lastSeq:seq,currentSocket:true,currentContext:true,inputAck:ack,originalSendStamp:{...original}});
   const snapshot={...wire,index:++this.index,nodeAtMs:performance.now(),slot,tick,players:[player],inputAck:ack};if(!crouch&&latePending){latePending=false;snapshot.tick++;}
   return{sent,snapshot,ack};
  },async readCurrentPresentation(){
   const other=actors[id==='A'?'B':'A'],active=other.heldKeys.has('KeyF'),now=performance.now(),ctx={...context,pageInstance:'page-'+id,slot};
   serial++;return{unavailableReason:null,dropped:0,presentationReferenceVersion:1,presentationReferenceAvailable:true,presentationReferenceUnavailableReason:null,currentPresentationRef:{...ctx,presentationReferenceVersion:1,eventIndex:serial,callbackObservedAtMs:now-.01},pageEventIndex:serial,sourceStatus:{evidenceAvailable:true,unavailableReason:null,dropped:0},currentContext:{...ctx,captureEvidenceAvailable:true,localFenceAvailable:true,connected:true,controller:true,localPaused:false,protocolVersion:2,maxAgeMs:400,pageNowMs:now},presentations:[{...ctx,eventIndex:serial,localPaused:false,localFenceAvailable:true,presentationReferenceVersion:1,callbackObservedAtMs:now-.01,frame:{slot,viewTick:nativeTick,players:players.map(p=>({...p,life:changedTargetLife&&active&&p.slot!==slot?2:p.life,stance:p.slot!==slot&&active&&!neverPartial?.5:0}))}}]};
  }};
 }
 const ctx={browsers:actors,actions,intervals:[],async mark(label,data){marks.push({label,data:structuredClone(data)});}};
 const singleShot=async(shooter,target,options)=>{const {metadata}=await options.beforePress();shots.push({shooter:shooter.id,target:target.id,metadata});const action={label:options.label,kind:'shot',weapon:options.weapon,boundaryRequirement:metadata};actions.push(action);return action;};
 const waitAppliedInput=async(actor,options)=>{proofCalls.push({actor:actor.id,afterIndex:options.afterIndex,timeout:options.timeout});const proof=actor.makeProof();assert.ok(options.predicate(proof.sent.input,proof.snapshot.players[0]),'Contract asks for the actual requested normal crouch state');return proof;};
 return{ctx,actors,commands,marks,actions,shots,singleShot,waitAppliedInput,proofCalls};
}
const run=(f,singleShot=f.singleShot)=>runTargetStanceBoundary(f.ctx,{singleShot,waitAppliedInput:f.waitAppliedInput});

test('one fixed normal-input train and one planned ARC shot run in each shooter role',{timeout:3000},async()=>{
 const f=fixture({lateSnapshotOnce:true,oldOriginalOnce:true}),result=await run(f);
 assert.deepEqual(f.shots.map(x=>[x.shooter,x.target]),[['A','B'],['B','A']]);assert.equal(result.plannedShots,2);assert.equal(result.acceptanceComplete,false);
 assert.deepEqual(result.limits,{toggleCount:8,toggleIntervalMs:80,baselineApplicationWindowMs:2000,observationWindowMs:1000,maxPresentationAgeMs:100,pollMs:10});
 for(const role of result.roles){assert.equal(role.commands.length,8);assert.deepEqual(role.commands.map(c=>c.state),['down','up','down','up','down','up','down','up']);assert.ok(role.requirement.selectedRenderedStance>0&&role.requirement.selectedRenderedStance<1);assert.ok(role.requirement.selectedPresentationEventIndex>role.requirement.pageBarrier.pageEventIndex);assert.ok(role.requirement.selectedCallbackObservedAtMs>=role.requirement.pageBarrier.pageNowMs);assert.deepEqual(role.requirement.requiredRenderedStance,{min:0,max:1,exclusive:true});assert.equal(role.requirement.maxPresentationAgeMs,100);assert.equal(role.requirement.nativeTargetTransitionRequired,true);}
 for(const {requirement:q}of result.roles){assert.equal(q.version,2);assert.equal(q.minimumNativeTick,q.targetCrouchApplication.tick);assert.ok(q.targetCrouchApplication.tick>q.targetBaselineApplication.tick&&q.targetCrouchApplication.seq>q.targetBaselineApplication.seq);assert.equal(q.targetTrainWindow.deadlineAtNodeMs,q.targetTrainWindow.startedAtNodeMs+1000);assert.equal(q.targetBaselineWindow.deadlineAtNodeMs,q.targetBaselineWindow.startedAtNodeMs+2000);for(const kind of ['Baseline','Crouch']){const original=q['target'+kind+'OriginalSend'],barrier=q['target'+kind+'Barrier'];assert.ok(original.eventIndex>barrier.pageEventIndex&&original.pageSentAt>=barrier.pageNowMs);assert.equal(original.wireJoin,'exact_bytes_unique');}assert.ok(q.targetTrainWindow.crouchAckObservedAtNodeMs<=q.targetTrainWindow.deadlineAtNodeMs);}
 assert.equal(f.proofCalls.length,6,'A late snapshot and pre-barrier original send are filtered within the same windows, without another train');
 for(const actor of Object.values(f.actors)){assert.equal(actor.heldKeys.size,0);assert.equal(f.commands.filter(x=>x.actor===actor.id).at(-1).state,'up');}
 assert.equal(f.actions.length,2);assert.ok(f.actions.every(a=>a.boundaryTrain.commands.length===8));assert.ok(Object.isFrozen(STANCE_BOUNDARY_LIMITS));
});

test('a missing partial window fails without a settled-shot substitution or another role attempt',{timeout:2000},async()=>{
 const f=fixture({neverPartial:true});let calls=0;
 await assert.rejects(run(f,async(...args)=>{calls++;return f.singleShot(...args);}),/fixed.*window|partial target stance/);
 assert.equal(calls,1);assert.equal(f.shots.length,0);assert.equal(f.actions.length,0);assert.equal(f.actors.B.heldKeys.size,0);assert.equal(f.commands.at(-1).state,'up');assert.equal(f.commands.filter(x=>x.state==='down').length,4);
});

test('a shot failure cancels the remaining fixed train and releases target crouch immediately',async()=>{
 const f=fixture();
 await assert.rejects(run(f,async(_shooter,_target,options)=>{await options.beforePress();throw Error('Planned shot failed');}),/Planned shot failed/);
 assert.equal(f.actors.B.heldKeys.size,0);assert.equal(f.commands.at(-1).state,'up');assert.ok(f.commands.filter(x=>x.state==='down').length<4);assert.equal(f.shots.length,0);assert.ok(!f.commands.some(x=>x.actor==='A'));
});

test('target life changes and delivered-but-rejected F events fail closed and release the key',async()=>{
 for(const options of [{changedTargetLife:true},{rejectFirstDown:true}]){
  const f=fixture(options);await assert.rejects(run(f),/life changed|keydown rejected/);assert.equal(f.shots.length,0);assert.equal(f.actors.B.heldKeys.size,0);assert.equal(f.commands.at(-1).state,'up');
 }
});

test('a callback that skips the hook cannot create boundary success',async()=>{
 const f=fixture();await assert.rejects(run(f,async()=>({})),/invoke the boundary hook/);assert.equal(f.shots.length,0);assert.equal(f.commands.filter(x=>x.state==='down').length,0);assert.equal(f.commands.at(-1).state,'up');
});
