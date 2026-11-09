// Pure host-fixture selection. Historical snapshots are evidence, never the
// current controller context. This module does not send input or resume a game.
import assert from 'node:assert/strict';
import {storeInputAck} from './botstrike-store-observations.mjs';

const key=value=>JSON.stringify([value.socketGeneration,value.ownerEpoch,value.proofGeneration,value.room,value.life,value.inputAck?.seq??value.seq,value.pageInstance??null,value.localRecoveryEpoch??null,value.sendSerial??value.originalSendStamp?.sendSerial??null]);
function select(observation,{room,life,afterEvent=0,afterAt=0,afterPageSentAt=-Infinity}={},allowLocal=false){
 if(observation.localFenceRequired&&!allowLocal)return null;
 const current=observation.currentContext;if(!current||current.room!==room||current.life!==life)return null;
 if(observation.localFenceRequired&&(observation.dropped!==0||current.localFenceRequired!==true||current.localFenceAvailable!==true||current.localPaused!==true||current.captureEvidenceAvailable!==true))return null;
 const sent=new Map();for(const input of observation.inputs)if(input.eventIndex>afterEvent&&input.nodeUnixMs>=afterAt&&(!observation.localFenceRequired||input.pageSentAt>=afterPageSentAt)&&input.room===room&&input.life===life)sent.set(key(input),input);
 for(let i=observation.snapshots.length-1;i>=0;i--){const snapshot=observation.snapshots[i];if(snapshot.eventIndex<=afterEvent||!snapshot.inputAck)continue;const input=sent.get(key(snapshot));if(input&&storeInputAck(snapshot,input,{requireNeutral:true,current}))return {input,snapshot,current:{...current}};}
 return null;
}
export function selectCurrentStoreNeutral(observation,options={}){return select(observation,options,false);}
export async function selectCurrentStoreNeutralLive(capture,options={}){
 const observation=await capture.refresh({fresh:true});
 if(observation.localFenceRequired!==true)return null;
 return select(observation,options,true);
}
export function storeNeutralProofRecord(proof,{phase,observedAt=Date.now()}={}){
 assert.ok(proof&&storeInputAck(proof.snapshot,proof.input,{requireNeutral:true,current:proof.current}),'Only a current exact neutral proof may be recorded');
 const {input,snapshot,current}=proof;
 const local=current.localFenceRequired?{localFenceRequired:true,pageInstance:input.pageInstance,localRecoveryEpoch:input.localRecoveryEpoch,localPausedAtSend:input.localPaused,pageSentAt:input.pageSentAt,sendSerial:input.sendSerial}:{};
 return {phase,observedAt,...local,seq:input.seq,inputEventIndex:input.eventIndex,inputObservedAt:input.nodeUnixMs,snapshotEventIndex:snapshot.eventIndex,snapshotObservedAt:snapshot.nodeUnixMs,ack:{...snapshot.inputAck},context:{socketGeneration:current.socketGeneration,ownerEpoch:current.ownerEpoch,proofGeneration:current.proofGeneration,room:current.room,life:current.life,connected:current.connected,controller:current.controller,protocolVersion:current.protocolVersion,maxAgeMs:current.maxAgeMs}};
}
export function assertStorePreIntentPaused({rows,dropped,fromAtMs,throughAtMs=Infinity}){
 assert.equal(dropped,0,'Recovery UI observations must not drop transitions');assert.ok(Number.isFinite(fromAtMs)&&throughAtMs>fromAtMs,'A bounded observed recovery UI interval is required');
 const states=rows.filter(row=>row.atMs>=fromAtMs&&row.atMs<throughAtMs);assert.ok(states.length,'The pre-intent recovery interval needs actual UI observations');assert.ok(states.every(row=>row.playing===false),'Every observed pre-intent recovery UI state must remain paused');
 return {fromAtMs,throughAtMs:Number.isFinite(throughAtMs)?throughAtMs:null,throughExclusive:true,states,observationDrops:dropped,automaticallyPlayingObserved:false};
}
export function storeRecoveryBarrierHistory(observation,{afterEvent=0,throughEvent=Infinity,limit=256}={}){
 const rows=[];for(const [kind,name]of [['control','controls'],['resync','resyncs'],['close','socketCloses'],['local-epoch','localBoundaries'],['snapshot-context','snapshots']])for(const row of observation[name]||[])if(row.eventIndex>afterEvent&&row.eventIndex<=throughEvent)rows.push({kind,row});
 rows.sort((a,b)=>a.row.eventIndex-b.row.eventIndex);const contexts=new Map(),history=[];
 for(const {kind,row}of rows){if(kind==='snapshot-context'){const identity=JSON.stringify([row.room,row.life,row.ownerEpoch,row.proofGeneration,row.currentSocket,row.currentContext]);if(contexts.get(row.socketGeneration)===identity)continue;contexts.set(row.socketGeneration,identity);}
  assert.ok(history.length<limit,'Recovery barrier history exceeds its explicit bound; preserve raw observations and fail');
  history.push({kind,...Object.fromEntries(['eventIndex','nodeUnixMs','socketGeneration','ownerEpoch','proofGeneration','currentSocket','currentContext','active','closed','code','room','life','pageInstance','localRecoveryEpoch','boundaryObservedAt'].filter(name=>row[name]!==undefined).map(name=>[name,row[name]]))});
 }
 return history;
}
