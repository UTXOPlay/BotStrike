// Host-only normal keyboard/mouse peek fixture. No private state steers actors.
import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {localRecoveryProofMatches} from './local-recovery-fence.mjs';
import {moveBrowser as defaultMoveBrowser,visibleAim} from './network-fairness-scenarios.mjs';

export const PEEK_BOUNDARY_LIMITS=Object.freeze({baselineApplicationWindowMs:2000,observationWindowMs:1000,maxPresentationAgeMs:100,firstOpticalToFireMaxMs:250,pollMs:10});
const contextKeys=['pageInstance','socketGeneration','ownerEpoch','proofGeneration','room','slot','life','localRecoveryEpoch'];
const wireKeys=['socketGeneration','ownerGeneration','proofGeneration','roomGeneration'];
const refKeys=['presentationReferenceVersion',...contextKeys,'eventIndex','callbackObservedAtMs'];
const own=room=>room?.state?.players?.[room.slot],finite=Number.isFinite;
const stamp=()=>({driverWallAt:Date.now(),driverMonotonicMs:performance.now()});
const same=(a,b)=>!!a&&!!b&&contextKeys.every(key=>a[key]===b[key]);
const wrap=value=>Math.atan2(Math.sin(value),Math.cos(value));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const reference=row=>Object.fromEntries(refKeys.map(key=>[key,row[key]]));
const targetOf=(row,slot)=>row?.frame?.players?.find(player=>player.slot===slot);
const groundStanding=player=>player?.alive===true&&player.crouch===false&&player.stance===0&&Array.isArray(player.position)&&player.position[1]===0&&Array.isArray(player.velocity)&&player.velocity[1]===0;
const baselineInput=input=>input.x===0&&input.y===0&&!input.fire&&!input.jump&&!input.crouch;
const movingInput=input=>finite(input.x)&&finite(input.y)&&finite(input.yaw)&&(input.x!==0||input.y!==0)&&-Math.sin(input.yaw)*input.y+Math.cos(input.yaw)*input.x<0&&!input.fire&&!input.jump&&!input.crouch;
const cancelled=()=>Object.assign(Error('Owned peek movement cancelled'),{code:'PEEK_MOVEMENT_CANCELLED'});

export function peekRoleGeometry(shooterId){
 assert.ok(shooterId==='A'||shooterId==='B');const z=shooterId==='A'?240:600;
 return{mapIndex:0,coverIndex:2,shooterGoal:[-100,shooterId==='A'?600:240],coveredGoal:[120,z],peekGoal:[-100,z],publicPeekAnchor:[shooterId==='A'?70:0,44,z],axis:0,direction:-1,tolerance:2};
}
function currentObservation(observation,sourceContext){
 assert.ok(observation?.unavailableReason===null&&observation.dropped===0&&observation.sourceStatus?.evidenceAvailable===true&&observation.sourceStatus.dropped===0&&observation.sourceStatus.unavailableReason===null,'Lossless original presentation evidence required');
 const current=observation.currentContext;
 assert.ok(current?.captureEvidenceAvailable===true&&current.localFenceAvailable===true&&current.connected===true&&current.controller===true&&current.localPaused===false&&current.protocolVersion===2&&current.maxAgeMs===400&&finite(current.pageNowMs),'Current unpaused original page context required');
 assert.ok(observation.presentationReferenceVersion===1&&observation.presentationReferenceAvailable===true&&observation.presentationReferenceUnavailableReason===null&&Number.isSafeInteger(observation.pageEventIndex),'Latest completed presentation reference required');
 assert.ok(typeof current.pageInstance==='string'&&current.pageInstance&&typeof current.room==='string'&&current.room&&['socketGeneration','ownerEpoch','proofGeneration','life'].every(key=>Number.isSafeInteger(current[key])&&current[key]>0)&&Number.isSafeInteger(current.slot)&&current.slot>=0&&current.slot<10&&Number.isSafeInteger(current.localRecoveryEpoch)&&current.localRecoveryEpoch>=0&&(!sourceContext||same(current,sourceContext)),'Peek shooter context changed');
 const latest=observation.presentations?.at(-1),ref=observation.currentPresentationRef;
 assert.ok(latest&&ref&&same(ref,current)&&same(latest,current)&&ref.eventIndex===latest.eventIndex&&ref.callbackObservedAtMs===latest.callbackObservedAtMs&&latest.eventIndex<=observation.pageEventIndex&&latest.presentationReferenceVersion===1&&latest.localPaused===false&&latest.localFenceAvailable===true,'Latest reference must identify the actual latest completed payload');
 assert.ok(finite(latest.callbackObservedAtMs)&&latest.callbackObservedAtMs<=current.pageNowMs,'Completed callback cannot be ahead of its page clock');
 return{current,latest};
}
// Only newly ingested rows are consumed, in original callback order. Old rows
// cannot be searched for a more convenient firing pose. First appearance is
// retained as a causal boundary; shot selection below always uses the latest.
export function consumePeekPresentations(tracker,rows,{sourceContext,pageBarrier,targetSlot,targetLife}={}){
 assert.ok(Array.isArray(rows)&&rows.length<512,'Presentation batch must be complete within its fixed recent-row bound');
 for(const row of rows){
  assert.ok(same(row,sourceContext)&&row.presentationReferenceVersion===1&&row.localPaused===false&&row.localFenceAvailable===true,'Peek presentation context changed');
  assert.ok(Number.isSafeInteger(row.eventIndex)&&row.eventIndex>tracker.latest.eventIndex&&row.eventIndex>pageBarrier.pageEventIndex&&finite(row.callbackObservedAtMs)&&row.callbackObservedAtMs>=pageBarrier.pageNowMs&&row.callbackObservedAtMs>=tracker.latest.callbackObservedAtMs,'New presentation callback order regressed');
  const target=targetOf(row,targetSlot);if(target){assert.ok(target.life===targetLife&&target.alive===true,'Peek target life changed');if(!tracker.firstOpticalPresentationRef)tracker.firstOpticalPresentationRef=reference(row);}
  tracker.previous=tracker.latest;tracker.latest=row;if(Number.isSafeInteger(row.index))tracker.cursor=row.index;
 }
 return tracker;
}
export function selectTargetPeekPresentation(observation,tracker,{sourceContext,pageBarrier,targetSlot,targetLife,minimumNativeTick,geometry}={}){
 const {current,latest}=currentObservation(observation,sourceContext);
 assert.equal(tracker.latest.eventIndex,latest.eventIndex,'Missing original latest presentation row');
 const first=tracker.firstOpticalPresentationRef;
 if(first&&current.pageNowMs-first.callbackObservedAtMs>PEEK_BOUNDARY_LIMITS.firstOpticalToFireMaxMs)throw Error('The single first-optical peek window expired');
 if(!first||!tracker.previous||current.pageNowMs-latest.callbackObservedAtMs>PEEK_BOUNDARY_LIMITS.maxPresentationAgeMs||latest.eventIndex<=pageBarrier.pageEventIndex||!Number.isSafeInteger(latest.frame?.viewTick)||latest.frame.viewTick<minimumNativeTick||!Number.isSafeInteger(tracker.previous.frame?.viewTick)||tracker.previous.frame.viewTick<minimumNativeTick||latest.frame.slot!==current.slot)return null;
 const before=targetOf(tracker.previous,targetSlot),target=targetOf(latest,targetSlot);
 if(!before||!target)return null;
 assert.ok(before.life===targetLife&&target.life===targetLife&&before.alive===true&&target.alive===true,'Peek target life changed');
 const position=p=>Array.isArray(p.position)&&p.position.length===3&&p.position.every(finite);
 if(!position(before)||!position(target)||target.stance!==0||before.stance!==0||target.position[1]!==0||before.position[1]!==0||Math.abs(target.position[2]-geometry.peekGoal[1])>geometry.tolerance||target.position[0]>=geometry.coveredGoal[0]||target.position[0]<=geometry.peekGoal[0]+30||target.position[0]>=before.position[0])return null;
 return{selectedPresentationRef:reference(latest),selectedPreviousPresentationRef:reference(tracker.previous),firstOpticalPresentationRef:structuredClone(first),eventIndex:latest.eventIndex,callbackObservedAtMs:latest.callbackObservedAtMs,pageNowMs:current.pageNowMs,frame:latest.frame,targetPosition:[...target.position],previousTargetPosition:[...before.position]};
}
const remaining=deadline=>{const left=deadline-performance.now();if(left<=0)throw Error('The fixed peek observation window expired');return left;};
async function boundedRead(operation,deadline){remaining(deadline);const result=await operation();remaining(deadline);return result;}
function localContext(observation){
 const current=observation?.currentContext;
 assert.ok(observation?.unavailableReason===null&&observation.dropped===0&&observation.wireJoin?.available===true&&Number.isSafeInteger(observation.pageEventIndex)&&current?.captureEvidenceAvailable===true&&current.localFenceRequired===true&&current.localFenceAvailable===true&&current.localPaused===false&&current.connected===true&&current.controller===true&&current.protocolVersion===2&&current.maxAgeMs===400&&finite(current.pageNowMs),'Fresh original target context required');return current;
}
async function targetBarrier(actor,deadline){const observed=await boundedRead(()=>actor.readLocalRecovery(),deadline),current=localContext(observed);return{pageEventIndex:observed.pageEventIndex,pageNowMs:current.pageNowMs,sourceContext:Object.fromEntries(contextKeys.map(key=>[key,current[key]])),afterIndex:actor.index,...stamp()};}
function originalTargetSend(observed,proof,barrier,predicate){
 const current=localContext(observed);assert.ok(same(current,barrier.sourceContext),'Target original-send context changed');
 const rows=observed.inputs.filter(input=>input.seq===proof.ack.seq&&input.cdpSocketGeneration===proof.sent.socketGeneration);if(rows.length!==1)return null;const input=rows[0];
 if(!same(input,barrier.sourceContext)||!predicate(input)||input.localFenceRequired!==true||input.currentSocket!==true||input.wireVerified!==true||input.wireJoin!=='exact_bytes_unique'||!/^([a-f0-9]{64})$/.test(input.wireSha256)||!Number.isSafeInteger(input.wireBytes)||input.wireBytes<1||input.wireBytes>65536||input.eventIndex<=barrier.pageEventIndex||!finite(input.pageSentAt)||input.pageSentAt<barrier.pageNowMs||input.localPaused!==false||input.protocolVersion!==2||input.deliveryAttached!==true)return null;
 const snapshots=observed.snapshots.filter(row=>row.tick===proof.ack.tick&&row.slot===proof.snapshot.slot&&row.inputAck&&['version','seq','tick','life','neutral'].every(key=>row.inputAck[key]===proof.ack[key]));
 if(!snapshots.some(row=>row.localFenceRequired===true&&row.currentSocket===true&&row.currentContext===true&&row.controller===true&&row.life===input.life&&row.lastSeq===proof.ack.seq&&localRecoveryProofMatches(row,input,current)))return null;
 const keys=['seq','eventIndex','pageSentAt','sendSerial','nativeTick',...contextKeys,'cdpSocketGeneration','wireSha256','wireBytes','wireVerified','wireJoin','localFenceRequired','localFenceAvailable','localPaused','localEpochObservedAt','x','y','yaw','pitch','fire','walk','crouch','jump','originalNeutral','protocolVersion','deliveryAttached'];return Object.fromEntries(keys.map(key=>[key,input[key]]));
}
async function targetApplication(actor,waitAppliedInput,{context,slot,life,barrier,deadline,geometry,moving,previous,motion}){
 let afterIndex=barrier.afterIndex;const predicate=moving?movingInput:baselineInput;
 for(;;){
  if(motion?.failure)throw motion.failure;
  const proof=await boundedRead(()=>waitAppliedInput(actor,{afterIndex,neutral:!moving,timeout:remaining(deadline),predicate:(input,player)=>{if(motion?.failure)throw motion.failure;return predicate(input)&&groundStanding(player)&&player.life===life&&(moving?player.velocity[0]<-20&&player.position[0]<geometry.coveredGoal[0]:Math.hypot(player.velocity[0],player.velocity[2])<8&&Math.hypot(player.position[0]-geometry.coveredGoal[0],player.position[2]-geometry.coveredGoal[1])<=geometry.tolerance);}}),deadline);
  if(motion?.failure)throw motion.failure;
  assert.ok(wireKeys.every(key=>actor[key]===context[key]&&proof.sent?.[key]===context[key]&&proof.snapshot?.[key]===context[key]),'Target application wire context changed');
  const {sent,snapshot,ack}=proof,player=snapshot.players?.find(p=>p.slot===slot);
  assert.ok(Number.isSafeInteger(sent.index)&&sent.index>barrier.afterIndex&&snapshot.index>sent.index&&finite(snapshot.nodeAtMs)&&sent.life===life&&ack?.version===1&&ack.seq===sent.input.seq&&ack.life===life&&snapshot.slot===slot,'Exact same-context target application required');
  if(snapshot.tick!==ack.tick||previous&&(ack.seq<=previous.seq||ack.tick<=previous.tick)){afterIndex=sent.index;continue;}
  assert.ok(predicate(sent.input)&&groundStanding(player)&&player.life===life&&player.last_seq===ack.seq&&(moving?player.velocity[0]<-20:Math.hypot(player.velocity[0],player.velocity[2])<8),'Target Native application must have the requested motion');
  const original=originalTargetSend(await boundedRead(()=>actor.readLocalRecovery(),deadline),proof,barrier,predicate);if(!original){afterIndex=sent.index;continue;}
  return{applied:{slot,seq:ack.seq,tick:ack.tick,life,...context},original,snapshot};
 }
}
// Optional navigation actuation guards check the pinned public context before
// each keydown and after every awaited key operation. Cleanup releases remain
// unguarded; always settle them rather than racing abandoned mutation promises.
export function startOwnedPeekMovement(ctx,target,goal,move=defaultMoveBrowser){
 let aborted=false,failure=null,settled=false,done,stopping;const initial=target.inputSentContext?.(),original=Array.isArray(initial)?[...initial]:null;assert.ok(Array.isArray(original)&&original.length===7&&original.slice(0,4).every(value=>Number.isSafeInteger(value)&&value>0)&&typeof original[4]==='string'&&original[4]&&Number.isInteger(original[5])&&original[5]>=0&&original[5]<10&&Number.isSafeInteger(original[6])&&original[6]>0,'Actual public target actuation context is required');
 const guard=()=>{if(aborted||ctx.aborted)throw cancelled();const current=target.inputSentContext();assert.ok(Array.isArray(current)&&current.length===original.length&&current.every((value,index)=>value===original[index]),'Peek target actuation room/slot/life or wire context changed');};
 const mark=async(label,data)=>{if(label==='route-modifiers-restored'||label==='route-modifiers-unconfirmed'){if(!aborted&&!ctx.aborted)await ctx.mark(label,data);return;}guard();await ctx.mark(label,data);guard();};
 done=(async()=>{try{guard();return await move(target,[goal],{mark,actuationGuard:guard});}catch(error){failure=error;throw error;}finally{settled=true;}})();done.catch(()=>{});
 const handle={done,get failure(){return failure;},get settled(){return settled;},cancelAndSettle(){return stopping??=(async()=>{aborted=true;try{await done;}catch(error){if(error.code!=='PEEK_MOVEMENT_CANCELLED'||error.navigationCleanupError)throw error;}finally{try{await target.neutral();}finally{ctx.ownedMotions?.delete(handle);}}})();}};
 (ctx.ownedMotions??=new Set()).add(handle);return handle;
}
async function coveredObservation(shooter,{sourceContext,targetSlot,targetLife,minimumNativeTick},deadline){
 for(;;){const observed=await boundedRead(()=>shooter.readCurrentPresentation(),deadline),{current,latest}=currentObservation(observed,sourceContext);const target=targetOf(latest,targetSlot);if(target)assert.ok(target.life===targetLife,'Peek target life changed');if(!target&&latest.frame?.viewTick>=minimumNativeTick&&current.pageNowMs-latest.callbackObservedAtMs<=PEEK_BOUNDARY_LIMITS.maxPresentationAgeMs)return{observed,current,latest};await sleep(Math.min(PEEK_BOUNDARY_LIMITS.pollMs,remaining(deadline)));}
}
async function runRole(ctx,{singleShot,waitAppliedInput,aimPoint,moveBrowser},shooter,target){
 const geometry=peekRoleGeometry(shooter.id);for(const [actor,goal]of [[shooter,geometry.shooterGoal],[target,geometry.coveredGoal]]){const navigation=startOwnedPeekMovement(ctx,actor,goal,moveBrowser);let failure;try{await navigation.done;}catch(error){failure=error;throw error;}finally{try{await navigation.cancelAndSettle();}catch(error){if(!failure)throw error;failure.peekMovementCleanupError=error.message;}}}
 const targetRoom=await target.room(),shooterRoom=await shooter.room(),player=own(targetRoom);assert.ok(targetRoom.id===shooterRoom.id&&targetRoom.status==='running'&&shooterRoom.status==='running'&&targetRoom.config?.map===0&&player?.alive===true,'Both owned actors must share map0 running room');
 const targetSlot=targetRoom.slot,targetLife=player.life,context=Object.fromEntries(wireKeys.map(key=>[key,target[key]]));assert.ok(Object.values(context).every(value=>Number.isSafeInteger(value)&&value>0));
 const label='peek-boundary-'+shooter.id.toLowerCase(),coverShotLabel='peek-cover-'+shooter.id.toLowerCase(),targetBaselineWindow={startedAtNodeMs:performance.now()};targetBaselineWindow.deadlineAtNodeMs=targetBaselineWindow.startedAtNodeMs+PEEK_BOUNDARY_LIMITS.baselineApplicationWindowMs;
 const targetBaselineBarrier=await targetBarrier(target,targetBaselineWindow.deadlineAtNodeMs);targetBaselineWindow.afterIndex=targetBaselineBarrier.afterIndex;await target.neutral();
 const baseline=await targetApplication(target,waitAppliedInput,{context,slot:targetSlot,life:targetLife,barrier:targetBaselineBarrier,deadline:targetBaselineWindow.deadlineAtNodeMs,geometry,moving:false});targetBaselineWindow.ackObservedAtNodeMs=baseline.snapshot.nodeAtMs;
 await coveredObservation(shooter,{targetSlot,targetLife,minimumNativeTick:baseline.applied.tick},performance.now()+PEEK_BOUNDARY_LIMITS.baselineApplicationWindowMs);
 const cover=await singleShot(shooter,target,{...ctx,label:coverShotLabel,weapon:0,anchor:[120,44,geometry.coveredGoal[1]],expectedTarget:null});
 let motion,metadata,hookCalls=0,primary;
 const beforePress=async()=>{
  assert.ok(!ctx.aborted,'Peek case aborted');assert.equal(++hookCalls,1,'Exactly one peek window per role, without retries');
  const covered=await coveredObservation(shooter,{targetSlot,targetLife,minimumNativeTick:Math.max(baseline.applied.tick,cover.ackTick)},performance.now()+PEEK_BOUNDARY_LIMITS.baselineApplicationWindowMs),sourceContext=Object.fromEntries(contextKeys.map(key=>[key,covered.current[key]])),pageBarrier={pageEventIndex:covered.observed.pageEventIndex,pageNowMs:covered.current.pageNowMs,...stamp()},baselinePresentationRef=reference(covered.latest);
  const tracker={latest:covered.latest,previous:null,cursor:shooter.index,firstOpticalPresentationRef:null};
  const targetMoveWindow={startedAtNodeMs:performance.now()};targetMoveWindow.deadlineAtNodeMs=targetMoveWindow.startedAtNodeMs+PEEK_BOUNDARY_LIMITS.observationWindowMs;
  const targetMoveBarrier=await targetBarrier(target,targetMoveWindow.deadlineAtNodeMs);assert.ok(same(targetMoveBarrier.sourceContext,targetBaselineBarrier.sourceContext),'Target context changed after covered baseline');targetMoveWindow.afterIndex=targetMoveBarrier.afterIndex;
  motion=startOwnedPeekMovement(ctx,target,geometry.peekGoal,moveBrowser);
  const moved=await targetApplication(target,waitAppliedInput,{context,slot:targetSlot,life:targetLife,barrier:targetMoveBarrier,deadline:targetMoveWindow.deadlineAtNodeMs,geometry,moving:true,previous:baseline.applied,motion});targetMoveWindow.moveAckObservedAtNodeMs=moved.snapshot.nodeAtMs;
  let lastAimEventIndex=-1;for(;;){
   assert.ok(!ctx.aborted,'Peek case aborted');if(motion.failure)throw motion.failure;
   const observed=await boundedRead(()=>shooter.readCurrentPresentation(),targetMoveWindow.deadlineAtNodeMs);currentObservation(observed,sourceContext);
   const rows=shooter.events('local_presentation',{afterIndex:tracker.cursor,limit:512});consumePeekPresentations(tracker,rows,{sourceContext,pageBarrier,targetSlot,targetLife});
   const selected=selectTargetPeekPresentation(observed,tracker,{sourceContext,pageBarrier,targetSlot,targetLife,minimumNativeTick:moved.applied.tick,geometry});
   if(selected){
    const aim=visibleAim(selected.frame,targetSlot),dyaw=wrap(aim.yaw-selected.frame.camera.yaw),dpitch=aim.pitch-selected.frame.camera.pitch;
    if(Math.hypot(dyaw,dpitch)<=.003){assert.ok(!ctx.aborted,'Peek case aborted');
     metadata={kind:'target-peek-transition',version:1,targetActor:target.id,targetSlot,targetLife,targetBaselineApplication:baseline.applied,targetMoveApplication:moved.applied,targetBaselineWindow,targetMoveWindow,targetBaselineBarrier,targetMoveBarrier,targetBaselineOriginalSend:baseline.original,targetMoveOriginalSend:moved.original,minimumNativeTick:moved.applied.tick,sourceContext,pageBarrier,baselinePresentationRef,firstOpticalPresentationRef:selected.firstOpticalPresentationRef,selectedPresentationRef:selected.selectedPresentationRef,selectedPreviousPresentationRef:selected.selectedPreviousPresentationRef,selectedPresentationEventIndex:selected.eventIndex,selectedCallbackObservedAtMs:selected.callbackObservedAtMs,selectionPageNowMs:selected.pageNowMs,maxPresentationAgeMs:PEEK_BOUNDARY_LIMITS.maxPresentationAgeMs,firstOpticalToFireMaxMs:PEEK_BOUNDARY_LIMITS.firstOpticalToFireMaxMs,geometry,coverShotLabel,nativeTargetTransitionRequired:true};
     return{metadata,aim:{...aim,meaning:'Actual latest authorized target pose used for normal mouse convergence; original fire ref and Native ray remain authority.'}};
    }
    if(lastAimEventIndex!==selected.eventIndex){remaining(targetMoveWindow.deadlineAtNodeMs);assert.ok(!ctx.aborted,'Peek case aborted');await shooter.aim(Math.max(-240,Math.min(240,-dyaw/.0025)),Math.max(-120,Math.min(120,-dpitch/.0025)));lastAimEventIndex=selected.eventIndex;remaining(targetMoveWindow.deadlineAtNodeMs);}
   }
   await sleep(Math.min(PEEK_BOUNDARY_LIMITS.pollMs,remaining(targetMoveWindow.deadlineAtNodeMs)));
  }
 };
 try{
  const action=await singleShot(shooter,target,{...ctx,label,weapon:0,expectedTarget:targetSlot,preAim:()=>aimPoint(shooter,geometry.publicPeekAnchor),beforePress});
  assert.equal(hookCalls,1,'singleShot must invoke the peek hook exactly once');assert.ok(metadata&&action.boundaryRequirement?.selectedPresentationEventIndex===metadata.selectedPresentationEventIndex,'Actual shot must retain peek metadata');
  await motion.done;const summary={shooter:shooter.id,target:target.id,targetSlot,targetLife,coverShotLabel,requirement:metadata};action.boundaryPeek=summary;await ctx.mark(label+'-complete',summary);return summary;
 }catch(error){primary=error;throw error;}
 finally{if(motion){try{await motion.cancelAndSettle();}catch(error){if(!primary)throw error;primary.peekMovementCleanupError=error.message;}}else try{await target.neutral();}catch(error){if(!primary)throw error;primary.peekMovementCleanupError=error.message;}}
}
export async function runTargetPeekBoundary(ctx,{singleShot,waitAppliedInput,aimPoint,moveBrowser=defaultMoveBrowser}={}){
 for(const f of [singleShot,waitAppliedInput,aimPoint,moveBrowser])assert.equal(typeof f,'function');assert.equal(typeof ctx?.mark,'function');const {A,B}=ctx.browsers||{};assert.ok(A?.id==='A'&&B?.id==='B','Distinct A/B browser actors required');const roles=[];for(const [shooter,target]of [[A,B],[B,A]])roles.push(await runRole(ctx,{singleShot,waitAppliedInput,aimPoint,moveBrowser},shooter,target));return{schemaVersion:1,scenario:'target-peek-boundary',automated:true,humanParticipants:0,plannedShots:4,roles,limits:{...PEEK_BOUNDARY_LIMITS},acceptanceComplete:false,limitations:['Unchanged common combat core plus one covered and one moving-peek ARC shot per shooter role.','First optical appearance and adjacent logical-frame motion constrain selection; Native historical pose/ray/damage decide actual coverage.','250ms is a fixed driver selection window, not an SLO. No retry, settled-shot substitution, physical display or complete issue acceptance.']};
}
