// Pure host evidence validation. Timestamps constrain an existing atomic ref;
// they never select a presentation or turn an earlier aim marker into a ref.
export const MAX_SHOT_PRESENTATION_AGE_MS=100;
const integer=(value,min=0)=>Number.isSafeInteger(value)&&value>=min;
const finite=value=>typeof value==='number'&&Number.isFinite(value);
const vector=value=>Array.isArray(value)&&value.length===3&&value.every(finite);
const contextKeys=['pageInstance','socketGeneration','ownerEpoch','proofGeneration','room','slot','life','localRecoveryEpoch'];
const matches=(a,b,keys=contextKeys)=>!!a&&!!b&&keys.every(key=>a[key]===b[key]);
const unavailable=reason=>({available:false,reason,presentation:null,ref:null});

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
 if(!integer(frame.tick,1)||!integer(frame.viewTick)||!finite(frame.renderTick)||frame.renderTick<0||!integer(frame.sequence)||!integer(frame.slot)||frame.slot>9||!vector(frame.camera?.position)||!['yaw','pitch','roll','fov'].every(key=>finite(frame.camera[key]))||frame.camera.fov<=0||frame.camera.fov>=180||!vector(frame.local?.position)||!vector(frame.local?.velocity)||!Array.isArray(frame.players)||frame.players.length>10||frame.players.some(player=>!integer(player?.slot)||player.slot>9||!integer(player.life,1)||typeof player.alive!=='boolean'||!vector(player.position)||!['yaw','pitch','stance'].every(key=>finite(player[key])))||new Set(frame.players.map(player=>player.slot)).size!==frame.players.length)return unavailable('authorized_presentation_payload_invalid');
 if(frame.slot!==input.slot)return unavailable('presentation_viewer_shooter_mismatch');
 if(!integer(input.viewTick)||input.viewTick!==frame.viewTick)return unavailable('original_send_presentation_view_tick_mismatch');
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
