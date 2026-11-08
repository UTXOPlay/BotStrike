// Private D3 fixture phase selection. Scalars supplement, never replace, ACK proof.
import assert from 'node:assert/strict';
import {neutral} from './botstrike-store-observations.mjs';
export function selectStoreRecoveryBarrier({localFenceRequired=false,observation,uiRows,beforeCut}={}){
 if(!Array.isArray(uiRows))return null;
 if(!localFenceRequired){const resync=observation?.resyncs?.[0],waiting=uiRows.find(row=>!row.playing&&row.disabled&&/SYNCING CONTROLS/.test(row.resume||''));return resync&&waiting?{kind:'server_resync',eventIndex:resync.eventIndex,uiAtMs:waiting.atMs,pageAtMs:null,localRecoveryEpoch:null,serverResyncObserved:true}:null;}
 if(observation?.localFenceRequired!==true||beforeCut?.localFenceAvailable!==true||beforeCut.localPaused!==false||!Number.isSafeInteger(beforeCut.localRecoveryEpoch)||!Number.isFinite(beforeCut.pageNowMs))return null;
 for(const boundary of observation.localBoundaries||[]){
  if(boundary.pageInstance!==beforeCut.pageInstance||!Number.isSafeInteger(boundary.localRecoveryEpoch)||boundary.localRecoveryEpoch<=beforeCut.localRecoveryEpoch||boundary.boundaryObservedAt<beforeCut.pageNowMs)continue;
  const waiting=uiRows.find(row=>row.localFenceAvailable===true&&row.localRecoveryEpoch>=boundary.localRecoveryEpoch&&row.localPaused===true&&row.playing===false&&row.disabled===true&&row.atMs>=beforeCut.pageNowMs);
  if(waiting)return{kind:'local_epoch',eventIndex:boundary.eventIndex,pageAtMs:boundary.boundaryObservedAt,localRecoveryEpoch:boundary.localRecoveryEpoch,pageInstance:boundary.pageInstance,uiAtMs:waiting.atMs,serverResyncObserved:(observation.resyncs?.length||0)>0,waitingUiText:waiting.resume};
 }
 return null;
}
export function assertStoreHeldClearedAfterBarrier(observation,barrier,{throughPageAt=Infinity,throughEvent=Infinity}={}){
 assert.ok(barrier,'An actual recovery barrier is required');
 const rows=observation.inputs.filter(input=>barrier.kind==='local_epoch'?input.eventIndex>barrier.eventIndex&&input.pageSentAt>=barrier.pageAtMs&&input.pageSentAt<throughPageAt:input.eventIndex>barrier.eventIndex&&input.eventIndex<=throughEvent);
 assert.ok(rows.length,'Actual post-barrier input observations are required');
 if(barrier.kind==='local_epoch')assert.ok(rows.every(row=>row.localFenceAvailable===true&&row.localRecoveryEpoch>=barrier.localRecoveryEpoch),'Missing or older local send stamps cannot prove held clearing');
 assert.ok(rows.every(neutral),'Every actual post-barrier pre-intent input must remain neutral');return{observations:rows.length,barrierKind:barrier.kind,originalSendTimesUsed:barrier.kind==='local_epoch'};
}
