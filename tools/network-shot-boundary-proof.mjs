// Pure host evidence validation. Timestamps constrain an existing atomic ref;
// they never select a presentation or turn an earlier aim marker into a ref.
export const MAX_SHOT_PRESENTATION_AGE_MS=100;
const integer=(value,min=0)=>Number.isSafeInteger(value)&&value>=min;
const finite=value=>typeof value==='number'&&Number.isFinite(value);
const vector=value=>Array.isArray(value)&&value.length===3&&value.every(finite);
const contextKeys=['pageInstance','socketGeneration','ownerEpoch','proofGeneration','room','slot','life','localRecoveryEpoch'];
const matches=(a,b,keys=contextKeys)=>!!a&&!!b&&keys.every(key=>a[key]===b[key]);
const unavailable=reason=>({available:false,reason,presentation:null,ref:null});
const compactRef=(ref,context)=>ref?.presentationReferenceVersion===1&&integer(ref.eventIndex,1)&&finite(ref.callbackObservedAtMs)&&ref.callbackObservedAtMs>=0&&matches(ref,context);
const logicalFrame=frame=>integer(frame?.tick,1)&&integer(frame.viewTick)&&finite(frame.renderTick)&&frame.renderTick>=0&&integer(frame.sequence)&&integer(frame.slot)&&frame.slot<10&&vector(frame.camera?.position)&&['yaw','pitch','roll','fov'].every(key=>finite(frame.camera[key]))&&frame.camera.fov>0&&frame.camera.fov<180&&vector(frame.local?.position)&&vector(frame.local?.velocity)&&Array.isArray(frame.players)&&frame.players.length<=10&&!frame.players.some(player=>!integer(player?.slot)||player.slot>9||!integer(player.life,1)||typeof player.alive!=='boolean'||!vector(player.position)||!['yaw','pitch','stance'].every(key=>finite(player[key])))&&new Set(frame.players.map(player=>player.slot)).size===frame.players.length;

export function validateTargetPeekMetadata(requirement,{shooterSlot}={}){
 const bad=reason=>({available:false,reason}),r=requirement,baseline=r?.targetBaselineApplication,move=r?.targetMoveApplication;
 const application=v=>v&&['seq','tick','life','socketGeneration','ownerGeneration','proofGeneration','roomGeneration'].every(key=>integer(v[key],1))&&integer(v.slot)&&v.slot<10;
 if(r?.kind!=='target-peek-transition'||r.version!==1||!application(baseline)||!application(move)||!['slot','life','socketGeneration','ownerGeneration','proofGeneration','roomGeneration'].every(key=>baseline[key]===move[key])||baseline.slot!==r.targetSlot||baseline.life!==r.targetLife||baseline.seq>=move.seq||baseline.tick>=move.tick||r.minimumNativeTick!==move.tick||!['A','B'].includes(r.targetActor)||shooterSlot!==undefined&&baseline.slot===shooterSlot)return bad('peek_target_application_metadata_invalid');
 const viewer=r.sourceContext?.slot,targetZ=viewer===0?240:viewer===5?600:null,shooterZ=viewer===0?600:240,g=r.geometry;
 const point=(a,b)=>Array.isArray(a)&&a.length===b.length&&a.every((value,index)=>value===b[index]);
 if(targetZ===null||baseline.slot!==(viewer===0?5:0)||r.targetActor!==(viewer===0?'B':'A')||r.coverShotLabel!=='peek-cover-'+(viewer===0?'a':'b')||g?.mapIndex!==0||g.coverIndex!==2||g.axis!==0||g.direction!==-1||g.tolerance!==2||!point(g.shooterGoal,[-100,shooterZ])||!point(g.coveredGoal,[120,targetZ])||!point(g.peekGoal,[-100,targetZ])||!point(g.publicPeekAnchor,[viewer===0?70:0,44,targetZ]))return bad('peek_geometry_or_role_metadata_invalid');
 for(const [window,duration,ackAt]of [[r.targetBaselineWindow,2000,'ackObservedAtNodeMs'],[r.targetMoveWindow,1000,'moveAckObservedAtNodeMs']])if(!window||!integer(window.afterIndex)||!finite(window.startedAtNodeMs)||window.startedAtNodeMs<0||window.deadlineAtNodeMs!==window.startedAtNodeMs+duration||!finite(window[ackAt])||window[ackAt]<window.startedAtNodeMs||window[ackAt]>window.deadlineAtNodeMs)return bad('peek_application_window_invalid');
 if(r.targetMoveWindow.startedAtNodeMs<r.targetBaselineWindow.ackObservedAtNodeMs)return bad('peek_application_window_invalid');
 for(const [barrier,send,app,window,moving]of [[r.targetBaselineBarrier,r.targetBaselineOriginalSend,baseline,r.targetBaselineWindow,false],[r.targetMoveBarrier,r.targetMoveOriginalSend,move,r.targetMoveWindow,true]]){
  if(!barrier||!integer(barrier.pageEventIndex)||!integer(barrier.afterIndex)||barrier.afterIndex<window.afterIndex||!finite(barrier.pageNowMs)||barrier.pageNowMs<0||!finite(barrier.driverMonotonicMs)||barrier.driverMonotonicMs<window.startedAtNodeMs||barrier.driverMonotonicMs>window.deadlineAtNodeMs||!send||typeof send.pageInstance!=='string'||!send.pageInstance||!['socketGeneration','ownerEpoch','proofGeneration'].every(key=>integer(send[key],1))||!integer(send.localRecoveryEpoch)||!integer(send.eventIndex,1)||send.eventIndex<=barrier.pageEventIndex||!finite(send.pageSentAt)||send.pageSentAt<barrier.pageNowMs||send.seq!==app.seq||send.slot!==app.slot||send.life!==app.life||send.cdpSocketGeneration!==app.socketGeneration||!integer(send.sendSerial,1)||!integer(send.nativeTick)||send.nativeTick>=app.tick||send.wireVerified!==true||send.wireJoin!=='exact_bytes_unique'||!integer(send.wireBytes,1)||send.wireBytes>65536||typeof send.wireSha256!=='string'||!/^[a-f0-9]{64}$/.test(send.wireSha256)||send.localFenceRequired!==true||send.localFenceAvailable!==true||send.localPaused!==false||send.crouch!==false||send.fire!==false||!['x','y','yaw','pitch'].every(key=>finite(send[key]))||send.originalNeutral!==!moving||send.protocolVersion!==2||send.deliveryAttached!==true||!finite(send.localEpochObservedAt)||send.localEpochObservedAt<0||send.localEpochObservedAt>send.pageSentAt||!matches(barrier.sourceContext,send)||send.room!==r.sourceContext?.room)return bad('peek_original_target_send_barrier_invalid');
  const worldX=-Math.sin(send.yaw)*send.y+Math.cos(send.yaw)*send.x;
  if(moving?!(Math.hypot(send.x,send.y)>0&&worldX<0):send.x!==0||send.y!==0)return bad('peek_original_target_motion_invalid');
 }
 if(!matches(r.targetBaselineOriginalSend,r.targetMoveOriginalSend))return bad('peek_original_target_context_changed');
 const refs=[r.baselinePresentationRef,r.firstOpticalPresentationRef,r.selectedPreviousPresentationRef,r.selectedPresentationRef];
 if(refs.some(ref=>!compactRef(ref,r.sourceContext))||r.maxPresentationAgeMs!==MAX_SHOT_PRESENTATION_AGE_MS||r.firstOpticalToFireMaxMs!==250||!integer(r.pageBarrier?.pageEventIndex)||!finite(r.pageBarrier.pageNowMs)||r.baselinePresentationRef.eventIndex>r.pageBarrier.pageEventIndex||r.baselinePresentationRef.callbackObservedAtMs>r.pageBarrier.pageNowMs||r.firstOpticalPresentationRef.eventIndex<=r.pageBarrier.pageEventIndex||r.firstOpticalPresentationRef.callbackObservedAtMs<r.pageBarrier.pageNowMs||r.selectedPreviousPresentationRef.eventIndex<r.firstOpticalPresentationRef.eventIndex||r.selectedPresentationRef.eventIndex<=r.selectedPreviousPresentationRef.eventIndex||r.selectedPresentationEventIndex!==r.selectedPresentationRef.eventIndex||r.selectedCallbackObservedAtMs!==r.selectedPresentationRef.callbackObservedAtMs||!finite(r.selectionPageNowMs)||r.selectionPageNowMs<r.selectedCallbackObservedAtMs)return bad('peek_presentation_metadata_invalid');
 return{available:true,reason:null};
}

function validatePeekPresentations({input,presentations,requirement:r}){
 const metadata=validateTargetPeekMetadata(r,{shooterSlot:input.slot});if(!metadata.available)return metadata;
 const ref=input.lastCompletedPresentationRef,bad=reason=>({available:false,reason});
 if(!matches(r.sourceContext,input)||ref.eventIndex<r.selectedPresentationRef.eventIndex||r.selectionPageNowMs>input.pageSentAt)return bad('peek_original_fire_before_selection_or_wrong_context');
 // The archive reader supplies every retained original completed row in this
 // interval. No scan backwards for an eligible moving pair is permitted.
 const ordered=presentations.filter(row=>row.pageInstance===ref.pageInstance&&row.eventIndex>=r.baselinePresentationRef.eventIndex&&row.eventIndex<=ref.eventIndex).sort((a,b)=>a.eventIndex-b.eventIndex);
 if(new Set(ordered.map(row=>row.eventIndex)).size!==ordered.length||ordered.some(row=>!matches(row,input)||row.presentationReferenceVersion!==1||row.connected!==true||row.controller!==true||row.localFenceAvailable!==true||row.localPaused!==false||!integer(row.eventIndex,1)||!finite(row.callbackObservedAtMs)||!finite(row.frame?.atMs)||!finite(row.frame.animationAtMs)||row.frame.atMs>row.callbackObservedAtMs||row.frame.animationAtMs>row.callbackObservedAtMs||!logicalFrame(row.frame)||row.frame.slot!==input.slot))return bad('peek_completed_interval_unavailable_or_context_changed');
 const find=wanted=>{const row=ordered.find(value=>value.eventIndex===wanted.eventIndex);return row&&compactRef(wanted,row)&&wanted.callbackObservedAtMs===row.callbackObservedAtMs?row:null;};
 const baseline=find(r.baselinePresentationRef),first=find(r.firstOpticalPresentationRef),selected=find(r.selectedPresentationRef),selectedPrevious=find(r.selectedPreviousPresentationRef),actual=find(ref),target=row=>row?.frame.players.find(value=>value.slot===r.targetSlot);
 if(!baseline||!first||!selected||!selectedPrevious||!actual||target(baseline)||baseline.frame.viewTick<r.targetBaselineApplication.tick||ordered.filter(row=>row.eventIndex<=r.pageBarrier.pageEventIndex).at(-1)!==baseline)return bad('peek_covered_baseline_reference_invalid');
 const firstObserved=ordered.find(row=>row.eventIndex>r.pageBarrier.pageEventIndex&&target(row));
 if(firstObserved!==first||target(first)?.alive!==true||target(first).life!==r.targetLife)return bad('peek_first_optical_reference_not_first_or_wrong_life');
 const pair=(previous,current)=>{const a=target(previous),b=target(current);return previous&&current&&ordered[ordered.indexOf(current)-1]===previous&&[a,b].every(value=>value?.alive===true&&value.life===r.targetLife&&value.position[1]===0&&value.stance===0)&&previous.frame.viewTick>=r.minimumNativeTick&&current.frame.viewTick>=r.minimumNativeTick&&b.position[0]<a.position[0]&&previous.callbackObservedAtMs<=current.callbackObservedAtMs;};
 const actualPrevious=ordered[ordered.indexOf(actual)-1];
 if(!pair(selectedPrevious,selected)||!pair(actualPrevious,actual))return bad('peek_adjacent_rendered_left_motion_missing');
 if(input.pageSentAt-first.callbackObservedAtMs<0||input.pageSentAt-first.callbackObservedAtMs>r.firstOpticalToFireMaxMs)return bad('peek_original_fire_outside_first_optical_window');
 return{available:true,reason:null,peek:{baselinePresentation:structuredClone(baseline),firstOpticalPresentation:structuredClone(first),selectedPreviousPresentation:structuredClone(selectedPrevious),selectedPresentation:structuredClone(selected),actualPreviousPresentation:structuredClone(actualPrevious),firstOpticalToOriginalFireMs:input.pageSentAt-first.callbackObservedAtMs,meaning:'Negative-X displacement between adjacent retained completed logical callbacks; no remote presentation velocity or compositor claim.'}};
}

// These refs request a causal gate; only raw public/private ACK joins can prove
// the target applications. This pure layer validates their form and frame age.
export function validateTargetStanceMetadata(requirement,{shooterSlot}={}){
 if(requirement?.version===1)return{available:false,reason:'legacy_requirement_without_applied_target_gate'};
 const baseline=requirement?.targetBaselineApplication,crouch=requirement?.targetCrouchApplication,baselineWindow=requirement?.targetBaselineWindow,train=requirement?.targetTrainWindow;
 const application=value=>value&&['seq','tick','life','socketGeneration','ownerGeneration','proofGeneration','roomGeneration'].every(key=>integer(value[key],1))&&integer(value.slot)&&value.slot<10;
 if(requirement?.version!==2||typeof requirement.targetActor!=='string'||!/^[A-Za-z][A-Za-z0-9_-]{0,23}$/.test(requirement.targetActor)||!application(baseline)||!application(crouch)||!['slot','life','socketGeneration','ownerGeneration','proofGeneration','roomGeneration'].every(key=>baseline[key]===crouch[key])||baseline.slot!==requirement.targetSlot||baseline.life!==requirement.targetLife||baseline.seq>=crouch.seq||baseline.tick>=crouch.tick||requirement.minimumNativeTick!==crouch.tick||shooterSlot!==undefined&&baseline.slot===shooterSlot)return{available:false,reason:'target_application_metadata_invalid'};
 const windows=[[baselineWindow,2000,'ackObservedAtNodeMs'],[train,1000,'crouchAckObservedAtNodeMs']];
 for(const [window,duration,ackAt]of windows)if(!window||!integer(window.afterIndex)||!finite(window.startedAtNodeMs)||window.startedAtNodeMs<0||window.deadlineAtNodeMs!==window.startedAtNodeMs+duration||!finite(window[ackAt])||window[ackAt]<window.startedAtNodeMs||window[ackAt]>window.deadlineAtNodeMs)return{available:false,reason:'target_application_window_invalid'};
 if(train.startedAtNodeMs<baselineWindow.ackObservedAtNodeMs)return{available:false,reason:'target_application_window_invalid'};
 const entries=[[requirement.targetBaselineBarrier,requirement.targetBaselineOriginalSend,baseline,baselineWindow,false],[requirement.targetCrouchBarrier,requirement.targetCrouchOriginalSend,crouch,train,true]];
 for(const [barrier,send,app,window,expectedCrouch]of entries){
  if(!barrier||!integer(barrier.pageEventIndex)||!integer(barrier.afterIndex)||barrier.afterIndex<window.afterIndex||!finite(barrier.pageNowMs)||barrier.pageNowMs<0||!finite(barrier.driverMonotonicMs)||barrier.driverMonotonicMs<window.startedAtNodeMs||barrier.driverMonotonicMs>window.deadlineAtNodeMs||!send||typeof send.pageInstance!=='string'||!send.pageInstance||!['socketGeneration','ownerEpoch','proofGeneration'].every(key=>integer(send[key],1))||!integer(send.localRecoveryEpoch)||!integer(send.eventIndex,1)||send.eventIndex<=barrier.pageEventIndex||!finite(send.pageSentAt)||send.pageSentAt<barrier.pageNowMs||send.seq!==app.seq||send.slot!==app.slot||send.life!==app.life||send.crouch!==expectedCrouch||send.cdpSocketGeneration!==app.socketGeneration||!integer(send.sendSerial,1)||!integer(send.nativeTick)||send.nativeTick>=app.tick||send.wireVerified!==true||send.wireJoin!=='exact_bytes_unique'||!integer(send.wireBytes,1)||send.wireBytes>65536||typeof send.wireSha256!=='string'||!/^[a-f0-9]{64}$/.test(send.wireSha256)||send.localFenceRequired!==true||send.localFenceAvailable!==true||send.localPaused!==false||send.protocolVersion!==2||send.deliveryAttached!==true||!finite(send.localEpochObservedAt)||send.localEpochObservedAt<0||send.localEpochObservedAt>send.pageSentAt||!matches(barrier.sourceContext,send)||send.room!==requirement.sourceContext?.room)return{available:false,reason:'target_original_send_barrier_invalid'};
 }
 if(!matches(requirement.targetBaselineOriginalSend,requirement.targetCrouchOriginalSend))return{available:false,reason:'target_original_send_context_changed'};
 return{available:true,reason:null};
}

export function validateAtomicShotPresentation({input,presentations,requirement=null,sourceStatus}={}){
 if(!sourceStatus||sourceStatus.presentationReferenceVersion!==1)return unavailable('presentation_source_status_missing');
 if(sourceStatus.evidenceAvailable!==true||sourceStatus.dropped!==0||sourceStatus.unavailableReason!=null||sourceStatus.wireJoin?.available!==true)return unavailable('presentation_source_unavailable');
 if(input?.presentationReferenceVersion!==1||input.presentationReferenceAvailable!==true||input.presentationReferenceUnavailableReason!=null||!input.lastCompletedPresentationRef)return unavailable('atomic_presentation_reference_missing');
 const ref=input.lastCompletedPresentationRef;
 if(input.wireVerified!==true||input.wireJoin!=='exact_bytes_unique'||input.currentSocket!==true||input.connected!==true||input.controller!==true||input.protocolVersion!==2||input.maxAgeMs!==400||input.deliveryAttached!==true||input.localFenceRequired!==true||input.localFenceAvailable!==true||input.localPaused!==false||input.fire!==true||!integer(input.seq,1)||!integer(input.slot)||input.slot>9||!integer(input.sendSerial,1)||typeof input.pageInstance!=='string'||!input.pageInstance||input.pageInstance.length>128||typeof input.room!=='string'||!input.room||input.room.length>64||!['socketGeneration','ownerEpoch','proofGeneration','life'].every(key=>integer(input[key],1))||!integer(input.localRecoveryEpoch)||!integer(input.cdpSocketGeneration,1))return unavailable('original_send_context_invalid');
 if(ref.presentationReferenceVersion!==1||!integer(ref.eventIndex,1)||!integer(input.eventIndex,1)||!integer(input.pageEventIndexBeforeNativeSend)||ref.eventIndex>input.pageEventIndexBeforeNativeSend||input.pageEventIndexBeforeNativeSend>=input.eventIndex)return unavailable('presentation_serial_not_before_native_send');
 if(!Array.isArray(presentations)||presentations.length>16384)return unavailable('presentation_history_unavailable');
 const candidates=presentations.filter(row=>row?.pageInstance===ref.pageInstance&&row.eventIndex===ref.eventIndex);
 if(candidates.length!==1)return unavailable('presentation_reference_missing_or_ambiguous');
 const presentation=candidates[0],frame=presentation.frame;
 if(presentation.presentationReferenceVersion!==1||!matches(ref,input)||!matches(presentation,input)||!matches(presentation,ref)||presentation.connected!==true||presentation.controller!==true||presentation.localFenceAvailable!==true||presentation.localPaused!==false)return unavailable('presentation_reference_context_mismatch');
 if(!finite(input.pageSentAt)||!finite(ref.callbackObservedAtMs)||!finite(presentation.callbackObservedAtMs)||ref.callbackObservedAtMs!==presentation.callbackObservedAtMs||!finite(frame?.atMs)||!finite(frame.animationAtMs)||frame.atMs>presentation.callbackObservedAtMs||frame.animationAtMs>presentation.callbackObservedAtMs||presentation.callbackObservedAtMs>input.pageSentAt)return unavailable('presentation_reference_time_invalid');
 if(input.pageSentAt-presentation.callbackObservedAtMs>MAX_SHOT_PRESENTATION_AGE_MS)return unavailable('presentation_reference_stale');
 if(!logicalFrame(frame))return unavailable('authorized_presentation_payload_invalid');
 if(frame.slot!==input.slot)return unavailable('presentation_viewer_shooter_mismatch');
 if(!integer(input.viewTick)||input.viewTick!==frame.viewTick)return unavailable('original_send_presentation_view_tick_mismatch');
 if(requirement?.kind==='target-peek-transition'){
  const peek=validatePeekPresentations({input,presentations,requirement});if(!peek.available)return unavailable(peek.reason);
  return{available:true,reason:null,presentation:structuredClone(presentation),ref:structuredClone(ref),peek:peek.peek};
 }
 if(requirement!==null){
  const causal=validateTargetStanceMetadata(requirement,{shooterSlot:input.slot});if(!causal.available)return unavailable(causal.reason);
  const wanted=requirement.requiredRenderedStance,barrier=requirement.pageBarrier;
  if(requirement.kind!=='target-stance-transition'||!integer(requirement.targetSlot)||requirement.targetSlot>9||!integer(requirement.targetLife,1)||wanted?.min!==0||wanted.max!==1||wanted.exclusive!==true||!finite(requirement.maxPresentationAgeMs)||requirement.maxPresentationAgeMs<=0||requirement.maxPresentationAgeMs>MAX_SHOT_PRESENTATION_AGE_MS||!integer(requirement.selectedPresentationEventIndex,1)||!finite(requirement.selectedCallbackObservedAtMs)||!finite(requirement.selectionPageNowMs)||!finite(requirement.selectedRenderedStance)||requirement.selectedRenderedStance<=0||requirement.selectedRenderedStance>=1||!integer(barrier?.pageEventIndex)||!finite(barrier.pageNowMs)||requirement.nativeTargetTransitionRequired!==true)return unavailable('shot_boundary_requirement_invalid');
  if(frame.viewTick<requirement.minimumNativeTick)return unavailable('original_fire_frame_before_applied_target_crouch');
  if(!matches(requirement.sourceContext,input))return unavailable('shot_boundary_context_mismatch');
  if(ref.eventIndex<requirement.selectedPresentationEventIndex||ref.eventIndex<=barrier.pageEventIndex||presentation.callbackObservedAtMs<barrier.pageNowMs||presentation.callbackObservedAtMs<requirement.selectedCallbackObservedAtMs||requirement.selectedCallbackObservedAtMs>requirement.selectionPageNowMs||requirement.selectionPageNowMs>input.pageSentAt)return unavailable('shot_boundary_frame_before_selection');
  if(input.pageSentAt-presentation.callbackObservedAtMs>requirement.maxPresentationAgeMs)return unavailable('shot_boundary_presentation_stale');
  const target=frame.players.find(player=>player.slot===requirement.targetSlot);
  if(!target||target.alive!==true||target.life!==requirement.targetLife)return unavailable('shot_boundary_target_not_visible_or_current_life');
  if(target.stance<=wanted.min||target.stance>=wanted.max)return unavailable('shot_boundary_target_not_transitioning');
 }
 return{available:true,reason:null,presentation:structuredClone(presentation),ref:structuredClone(ref)};
}
