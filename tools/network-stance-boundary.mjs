// Host-only normal-input scenario. Rendered poses select a planned observation
// window; only the original fire stamp and independent Native oracle prove it.
import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {localRecoveryProofMatches} from './local-recovery-fence.mjs';

export const STANCE_BOUNDARY_LIMITS=Object.freeze({toggleCount:8,toggleIntervalMs:80,baselineApplicationWindowMs:2000,observationWindowMs:1000,maxPresentationAgeMs:100,pollMs:10});
const contextKeys=['pageInstance','socketGeneration','ownerEpoch','proofGeneration','room','slot','life','localRecoveryEpoch'];
const wireContextKeys=['socketGeneration','ownerGeneration','proofGeneration','roomGeneration'];
const own=room=>room?.state?.players?.[room.slot];
const stamp=()=>({driverWallAt:Date.now(),driverMonotonicMs:performance.now()});
const abortError=()=>Error('Target stance train cancelled');

function currentObservation(observation){
 assert.ok(observation&&observation.unavailableReason===null&&observation.dropped===0,'Original local presentation observation must be available and lossless');
 assert.ok(observation.sourceStatus?.evidenceAvailable===true&&observation.sourceStatus.unavailableReason===null&&observation.sourceStatus.dropped===0,'Durable atomic observer source must be available and lossless');
 assert.ok(observation.presentationReferenceAvailable===true&&observation.presentationReferenceUnavailableReason===null&&observation.currentPresentationRef?.presentationReferenceVersion===1,'Current completed presentation reference is required');
 assert.equal(observation.presentationReferenceVersion,1,'Atomic presentation reference version 1 is required');
 const current=observation.currentContext;
 assert.ok(current?.captureEvidenceAvailable===true&&current.localFenceAvailable===true&&current.connected===true&&current.controller===true&&current.localPaused===false,'Current unpaused controller context is required');
 assert.equal(current.protocolVersion,2);assert.equal(current.maxAgeMs,400);
 assert.ok(typeof current.pageInstance==='string'&&typeof current.room==='string'&&Number.isFinite(current.pageNowMs)&&current.pageNowMs>=0,'Fresh original page clock/context is required');
 for(const key of ['socketGeneration','ownerEpoch','proofGeneration','life'])assert.ok(Number.isSafeInteger(current[key])&&current[key]>0,'Positive local context generation required');
 assert.ok(Number.isInteger(current.slot)&&current.slot>=0&&current.slot<10,'Current controlled slot is required');
 assert.ok(Number.isSafeInteger(current.localRecoveryEpoch)&&current.localRecoveryEpoch>=0);
 assert.ok(Number.isSafeInteger(observation.pageEventIndex)&&observation.pageEventIndex>=0,'Fresh shared page event serial is required');
 assert.ok(Array.isArray(observation.presentations),'Original completed presentations are required');
 return current;
}

// Examine only the most recently completed frame. An older partial pose behind
// a newer settled frame cannot be selected to manufacture a boundary window.
export function selectTargetStancePresentation(observation,{sourceContext,afterEventIndex,afterPageMs,targetSlot,targetLife,minimumNativeTick}={}){
 const current=currentObservation(observation);
 assert.ok(sourceContext&&contextKeys.every(key=>current[key]===sourceContext[key]),'Shooter context changed during target stance window');
 assert.ok(Number.isSafeInteger(afterEventIndex)&&afterEventIndex>=0&&Number.isFinite(afterPageMs)&&afterPageMs>=0);
 assert.ok(Number.isInteger(targetSlot)&&targetSlot>=0&&targetSlot<10&&Number.isSafeInteger(targetLife)&&targetLife>0);
 assert.ok(Number.isSafeInteger(minimumNativeTick)&&minimumNativeTick>0,'Current train application tick is required');
 assert.ok(observation.pageEventIndex>=afterEventIndex&&current.pageNowMs>=afterPageMs,'Original page barrier regressed');
 const latest=observation.presentations.at(-1);
 assert.ok(latest,'Current completed presentation payload is missing');
 const reference=observation.currentPresentationRef;
 assert.ok(contextKeys.every(key=>reference[key]===current[key]&&reference[key]===latest[key])&&reference.eventIndex===latest.eventIndex&&reference.callbackObservedAtMs===latest.callbackObservedAtMs&&reference.presentationReferenceVersion===latest.presentationReferenceVersion,'Current completed presentation reference does not match the latest payload');
 assert.ok(Number.isSafeInteger(latest.eventIndex)&&latest.eventIndex<=observation.pageEventIndex,'Completed frame has invalid shared serial');
 if(!contextKeys.every(key=>latest[key]===current[key])||latest.localPaused!==false||latest.localFenceAvailable!==true||latest.presentationReferenceVersion!==1)return null;
 // A strictly later shared event serial establishes order even when the page
 // performance clock quantizes the read and callback to the same timestamp.
 if(latest.eventIndex<=afterEventIndex||!Number.isFinite(latest.callbackObservedAtMs)||latest.callbackObservedAtMs<afterPageMs)return null;
 assert.ok(latest.callbackObservedAtMs<=current.pageNowMs,'Completed frame is ahead of the original page clock');
 if(current.pageNowMs-latest.callbackObservedAtMs>STANCE_BOUNDARY_LIMITS.maxPresentationAgeMs)return null;
 const frame=latest.frame;
 if(!frame||!Array.isArray(frame.players)||frame.slot!==current.slot||!Number.isSafeInteger(frame.viewTick)||frame.viewTick<minimumNativeTick)return null;
 const target=frame.players.find(player=>player.slot===targetSlot);
 if(!target)return null;
 assert.equal(target.life,targetLife,'Target life changed during stance window');
 assert.equal(target.alive,true,'Target died during stance window');
 if(!Number.isFinite(target.stance)||target.stance<=0||target.stance>=1)return null;
 return{eventIndex:latest.eventIndex,callbackObservedAtMs:latest.callbackObservedAtMs,pageNowMs:current.pageNowMs,renderedStance:target.stance,targetSlot,targetLife};
}

function sleep(ms,signal){
 return new Promise((resolve,reject)=>{
  if(signal?.aborted){reject(abortError());return;}
  const cleanup=()=>{clearTimeout(timer);signal?.removeEventListener('abort',abort);};
  const abort=()=>{cleanup();reject(abortError());};
  const timer=setTimeout(()=>{cleanup();resolve();},ms);
  signal?.addEventListener('abort',abort,{once:true});
 });
}

async function within(operation,deadline){
 const remaining=deadline-performance.now();
 if(remaining<=0)throw Error('No fresh partial target stance in the fixed observation window');
 let timer;
 try{const value=await Promise.race([Promise.resolve().then(operation),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Observation exceeded the fixed stance window')),remaining);})]);if(performance.now()>deadline)throw Error('Observation exceeded the fixed stance window');return value;}
 finally{clearTimeout(timer);}
}
const readWithin=(actor,deadline)=>within(()=>actor.readCurrentPresentation(),deadline);

function targetWireContext(actor){
 assert.equal(actor.control?.active,true,'Target controller must remain active');
 const context=Object.fromEntries(wireContextKeys.map(key=>[key,actor[key]]));
 assert.ok(Object.values(context).every(value=>Number.isSafeInteger(value)&&value>0),'Target wire context is required');
 return context;
}
function application(actor,proof,{context,slot,life,afterIndex,crouch}){
 const current=targetWireContext(actor),sent=proof?.sent,snapshot=proof?.snapshot,ack=proof?.ack,player=snapshot?.players?.find(player=>player.slot===slot);
 assert.ok(wireContextKeys.every(key=>current[key]===context[key]&&sent?.[key]===context[key]&&snapshot?.[key]===context[key]),'Target application context changed');
 assert.ok(Number.isSafeInteger(sent?.index)&&sent.index>afterIndex&&Number.isSafeInteger(snapshot?.index)&&snapshot.index>sent.index&&Number.isFinite(snapshot.nodeAtMs),'Fresh original target send and snapshot are required');
 assert.ok(ack?.version===1&&Number.isSafeInteger(ack.seq)&&ack.seq>0&&Number.isSafeInteger(ack.tick)&&ack.tick>0&&ack.life===life&&sent.input?.seq===ack.seq&&sent.input.crouch===crouch&&sent.life===life&&snapshot.slot===slot&&snapshot.tick===ack.tick&&player?.last_seq===ack.seq,'Exact same-frame target applied-input ACK is required');
 assert.ok(player.alive===true&&player.life===life&&player.crouch===crouch&&(crouch?player.stance>0&&player.stance<1:player.stance===0),'Target Native stance application is required');
 return{slot,seq:ack.seq,tick:ack.tick,life,...context};
}
function localTargetContext(observation){
 const current=observation?.currentContext;
 assert.ok(observation?.unavailableReason===null&&observation.dropped===0&&observation.wireJoin?.available===true&&Number.isSafeInteger(observation.pageEventIndex)&&observation.pageEventIndex>=0,'Fresh lossless target original-send evidence is required');
 assert.ok(current?.captureEvidenceAvailable===true&&current.localFenceRequired===true&&current.localFenceAvailable===true&&current.connected===true&&current.controller===true&&current.localPaused===false&&current.protocolVersion===2&&current.maxAgeMs===400&&Number.isFinite(current.pageNowMs),'Target original-send controller context is unavailable');
 return current;
}
async function targetBarrier(actor,deadline){
 const observed=await within(()=>actor.readLocalRecovery(),deadline),current=localTargetContext(observed);
 return{pageEventIndex:observed.pageEventIndex,pageNowMs:current.pageNowMs,sourceContext:Object.fromEntries(contextKeys.map(key=>[key,current[key]])),afterIndex:actor.index,...stamp()};
}
function originalTargetSend(observation,proof,barrier,crouch){
 const current=localTargetContext(observation);
 assert.ok(contextKeys.every(key=>current[key]===barrier.sourceContext[key]),'Target original-send context changed');
 const rows=observation.inputs.filter(input=>input.seq===proof.ack.seq&&input.cdpSocketGeneration===proof.sent.socketGeneration);
 if(rows.length!==1)return null;const input=rows[0];
 if(input.localFenceRequired!==true||input.currentSocket!==true||input.wireVerified!==true||input.wireJoin!=='exact_bytes_unique'||!/^([a-f0-9]{64})$/.test(input.wireSha256)||!Number.isSafeInteger(input.wireBytes)||input.wireBytes<1||input.wireBytes>65536||!Number.isSafeInteger(input.eventIndex)||input.eventIndex<=barrier.pageEventIndex||!Number.isFinite(input.pageSentAt)||input.pageSentAt<barrier.pageNowMs||input.localPaused!==false||input.crouch!==crouch||!contextKeys.every(key=>input[key]===barrier.sourceContext[key])||input.protocolVersion!==2||input.deliveryAttached!==true)return null;
 const snapshots=observation.snapshots.filter(snapshot=>snapshot.tick===proof.ack.tick&&snapshot.slot===proof.snapshot.slot&&snapshot.inputAck&&['version','seq','tick','life','neutral'].every(key=>snapshot.inputAck[key]===proof.ack[key]));
 if(!snapshots.some(snapshot=>snapshot.localFenceRequired===true&&snapshot.currentSocket===true&&snapshot.currentContext===true&&snapshot.controller===true&&snapshot.life===input.life&&snapshot.lastSeq===proof.ack.seq&&localRecoveryProofMatches(snapshot,input,current)))return null;
 const keys=['seq','eventIndex','pageSentAt','sendSerial','nativeTick',...contextKeys,'cdpSocketGeneration','wireSha256','wireBytes','wireVerified','wireJoin','localFenceRequired','localFenceAvailable','localPaused','localEpochObservedAt','crouch','protocolVersion','deliveryAttached'];
 return Object.fromEntries(keys.map(key=>[key,input[key]]));
}
async function targetApplication(actor,waitAppliedInput,{context,slot,life,barrier,crouch,deadline,previous,train}){
 let afterIndex=barrier.afterIndex;
 for(;;){
  const proof=await within(()=>{if(train?.failure)throw train.failure;return waitAppliedInput(actor,{afterIndex,timeout:Math.max(1,deadline-performance.now()),predicate:(input,player)=>input.crouch===crouch&&player?.alive===true&&player.life===life&&player.crouch===crouch&&(crouch?player.stance>0&&player.stance<1:player.stance===0)});},deadline);
  if(train?.failure)throw train.failure;
  assert.ok(proof?.sent&&proof?.snapshot&&proof?.ack&&Number.isSafeInteger(proof.sent.index)&&proof.sent.index>afterIndex,'Fresh target ACK candidate required');
  assert.ok(wireContextKeys.every(key=>actor[key]===context[key]),'Target application context changed');
  if(proof.ack.tick!==proof.snapshot.tick){afterIndex=proof.sent.index;continue;}
  const applied=application(actor,proof,{context,slot,life,afterIndex:barrier.afterIndex,crouch});
  if(previous&&(applied.seq<=previous.seq||applied.tick<=previous.tick)){afterIndex=proof.sent.index;continue;}
  const original=originalTargetSend(await within(()=>actor.readLocalRecovery(),deadline),proof,barrier,crouch);
  if(original)return{applied,original,snapshot:proof.snapshot};
  afterIndex=proof.sent.index;
 }
}

function startTrain(target){
 const controller=new AbortController(),commands=[];let failure=null;
 const done=(async()=>{
  let primary;
  try{
   for(let i=0;i<STANCE_BOUNDARY_LIMITS.toggleCount;i++){
    if(controller.signal.aborted)throw abortError();
    const state=i%2===0?'down':'up',requested=stamp();
    await target.key('KeyF',state);commands.push({toggle:i+1,state,...requested,completedDriverMonotonicMs:performance.now()});
    await sleep(STANCE_BOUNDARY_LIMITS.toggleIntervalMs,controller.signal);
   }
  }catch(error){primary=error;failure=error;throw error;}
  finally{
   try{await target.key('KeyF','up');}catch(error){if(!primary){failure=error;throw error;}primary.stanceReleaseError=error.message;}
  }
 })();
 done.catch(()=>{});
 return{done,commands,cancel:()=>controller.abort(),get failure(){return failure;}};
}

async function runRole(ctx,singleShot,waitAppliedInput,shooter,target){
 const targetRoom=await target.room(),shooterRoom=await shooter.room(),targetPlayer=own(targetRoom);
 assert.ok(targetRoom?.status==='running'&&shooterRoom?.status==='running'&&targetRoom.id===shooterRoom.id,'Both real actors must share the running room');
 assert.ok(targetPlayer?.alive===true&&Number.isSafeInteger(targetPlayer.life)&&targetPlayer.life>0,'Living target life required');
 const label='stance-boundary-'+shooter.id.toLowerCase(),targetSlot=targetRoom.slot,targetLife=targetPlayer.life;
 const targetContext=targetWireContext(target),targetBaselineWindow={startedAtNodeMs:performance.now()};targetBaselineWindow.deadlineAtNodeMs=targetBaselineWindow.startedAtNodeMs+STANCE_BOUNDARY_LIMITS.baselineApplicationWindowMs;
 const targetBaselineBarrier=await targetBarrier(target,targetBaselineWindow.deadlineAtNodeMs);targetBaselineWindow.afterIndex=targetBaselineBarrier.afterIndex;
 await target.key('KeyF','up');
 const baselineProof=await targetApplication(target,waitAppliedInput,{context:targetContext,slot:targetSlot,life:targetLife,barrier:targetBaselineBarrier,crouch:false,deadline:targetBaselineWindow.deadlineAtNodeMs});
 const targetBaselineApplication=baselineProof.applied,targetBaselineOriginalSend=baselineProof.original;targetBaselineWindow.ackObservedAtNodeMs=baselineProof.snapshot.nodeAtMs;
 assert.ok(baselineProof.snapshot.nodeAtMs>=targetBaselineWindow.startedAtNodeMs&&baselineProof.snapshot.nodeAtMs<=targetBaselineWindow.deadlineAtNodeMs,'Standing baseline ACK must be observed inside the fixed baseline window');
 let train,metadata,hookCalls=0,primary;
 const beforePress=async()=>{
  assert.equal(++hookCalls,1,'A role gets one planned stance window, without retries');
  await ctx.mark(label+'-prepare',{targetSlot,targetLife,...stamp()});
  const initial=await readWithin(shooter,performance.now()+STANCE_BOUNDARY_LIMITS.observationWindowMs),current=currentObservation(initial);
  assert.equal(current.room,shooterRoom.id);assert.equal(current.slot,shooterRoom.slot);assert.equal(current.life,own(shooterRoom)?.life);
  const sourceContext=Object.fromEntries(contextKeys.map(key=>[key,current[key]]));
  const pageBarrier={pageEventIndex:initial.pageEventIndex,pageNowMs:current.pageNowMs,...stamp()};
  const targetTrainWindow={startedAtNodeMs:performance.now()};targetTrainWindow.deadlineAtNodeMs=targetTrainWindow.startedAtNodeMs+STANCE_BOUNDARY_LIMITS.observationWindowMs;
  const targetCrouchBarrier=await targetBarrier(target,targetTrainWindow.deadlineAtNodeMs);
  assert.ok(contextKeys.every(key=>targetCrouchBarrier.sourceContext[key]===targetBaselineBarrier.sourceContext[key]),'Target context changed after standing baseline');
  targetTrainWindow.afterIndex=targetCrouchBarrier.afterIndex;
  train=startTrain(target);const deadline=targetTrainWindow.deadlineAtNodeMs;
  const crouchProof=await targetApplication(target,waitAppliedInput,{context:targetContext,slot:targetSlot,life:targetLife,barrier:targetCrouchBarrier,crouch:true,deadline,previous:targetBaselineApplication,train});
  const targetCrouchApplication=crouchProof.applied,targetCrouchOriginalSend=crouchProof.original;
  assert.ok(targetCrouchApplication.seq>targetBaselineApplication.seq&&targetCrouchApplication.tick>targetBaselineApplication.tick,'Current train crouch must follow the exact standing baseline');
  targetTrainWindow.crouchAckObservedAtNodeMs=crouchProof.snapshot.nodeAtMs;
  assert.ok(crouchProof.snapshot.nodeAtMs>=targetTrainWindow.startedAtNodeMs&&crouchProof.snapshot.nodeAtMs<=deadline,'Current train ACK must be observed inside the fixed stance window');
  for(;;){
   if(train.failure)throw train.failure;
   const observed=await readWithin(shooter,deadline);
   const selected=selectTargetStancePresentation(observed,{sourceContext,afterEventIndex:pageBarrier.pageEventIndex,afterPageMs:pageBarrier.pageNowMs,targetSlot,targetLife,minimumNativeTick:targetCrouchApplication.tick});
   if(selected){
    metadata={kind:'target-stance-transition',version:2,targetActor:target.id,targetSlot,targetLife,targetBaselineApplication,targetCrouchApplication,targetBaselineWindow,targetTrainWindow,targetBaselineBarrier,targetCrouchBarrier,targetBaselineOriginalSend,targetCrouchOriginalSend,minimumNativeTick:targetCrouchApplication.tick,requiredRenderedStance:{min:0,max:1,exclusive:true},maxPresentationAgeMs:STANCE_BOUNDARY_LIMITS.maxPresentationAgeMs,selectedPresentationEventIndex:selected.eventIndex,selectedCallbackObservedAtMs:selected.callbackObservedAtMs,selectionPageNowMs:selected.pageNowMs,selectedRenderedStance:selected.renderedStance,pageBarrier,sourceContext,nativeTargetTransitionRequired:true,toggleCount:STANCE_BOUNDARY_LIMITS.toggleCount,toggleIntervalMs:STANCE_BOUNDARY_LIMITS.toggleIntervalMs};
    return{metadata};
   }
   await sleep(Math.min(STANCE_BOUNDARY_LIMITS.pollMs,Math.max(0,deadline-performance.now())));
  }
 };
 try{
  // singleShot must finish ordinary standing body aim before invoking this hook,
  // then dispatch real mouse.down immediately after it, without another read.
  const action=await singleShot(shooter,target,{...ctx,label,weapon:0,expectedTarget:null,beforePress});
  assert.equal(hookCalls,1,'singleShot must invoke the boundary hook exactly once');
  assert.ok(metadata&&action?.boundaryRequirement?.selectedPresentationEventIndex===metadata.selectedPresentationEventIndex,'Shot action must retain the requested atomic boundary metadata');
  await train.done;
  const summary={shooter:shooter.id,target:target.id,targetSlot,targetLife,commands:structuredClone(train.commands),requirement:metadata};
  action.boundaryTrain=summary;
  await ctx.mark(label+'-train-complete',summary);
  return summary;
 }catch(error){primary=error;train?.cancel();throw error;}
 finally{
  if(train){train.cancel();try{await train.done;}catch(error){if(!primary)throw error;if(error.stanceReleaseError)primary.stanceReleaseError=error.stanceReleaseError;}}
  else try{await target.key('KeyF','up');}catch(error){if(!primary)throw error;primary.stanceReleaseError=error.message;}
 }
}

export async function runTargetStanceBoundary(ctx,{singleShot,waitAppliedInput}={}){
 assert.equal(typeof singleShot,'function');assert.equal(typeof waitAppliedInput,'function');assert.equal(typeof ctx?.mark,'function');
 const {A,B}=ctx.browsers||{};assert.ok(A&&B&&A.id==='A'&&B.id==='B','Distinct A/B browser actors are required');
 const roles=[];
 for(const [shooter,target]of [[A,B],[B,A]])roles.push(await runRole(ctx,singleShot,waitAppliedInput,shooter,target));
 return{schemaVersion:1,scenario:'target-stance-boundary',automated:true,humanParticipants:0,plannedShots:2,roles,limits:{...STANCE_BOUNDARY_LIMITS},acceptanceComplete:false,limitations:['One planned normal-input ARC shot per role during a selected fresh rendered partial stance.','The hook observation is a requested boundary; only original fire references and independent Native timelines/rays establish actual coverage.','No settled-shot substitution, retry-to-pass, physical-input, human, WAN or all-boundary acceptance.']};
}
