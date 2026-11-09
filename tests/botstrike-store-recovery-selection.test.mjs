import test from 'node:test';
import assert from 'node:assert/strict';
import {storeInputAck} from './botstrike-store-observations.mjs';
import {selectCurrentStoreNeutral,storeNeutralProofRecord,assertStorePreIntentPaused,storeRecoveryBarrierHistory} from './botstrike-store-recovery-selection.mjs';

const live=(socketGeneration,proofGeneration)=>({socketGeneration,ownerEpoch:1,proofGeneration,room:'room',life:1,connected:true,controller:true,protocolVersion:2,maxAgeMs:400});
function pair(context,{seq,tick,nativeTick,inputEventIndex,snapshotEventIndex,at=1100}){
 return {input:{...context,seq,x:0,y:0,preview_item:2,throw_mode:1,nativeTick,protocolVersion:2,deliveryAttached:true,currentSocket:true,eventIndex:inputEventIndex,nodeUnixMs:at},snapshot:{...context,slot:0,tick,lastSeq:seq,deliveryAttached:true,currentSocket:true,currentContext:true,eventIndex:snapshotEventIndex,nodeUnixMs:at+15,inputAck:{version:1,seq,tick,life:1,neutral:true}}};
}
test('a lawful pre-intent reconnect replaces the selected proof while retaining the first exact neutral as history',()=>{
 const old=pair(live(1,4),{seq:735,tick:928,nativeTick:924,inputEventIndex:978,snapshotEventIndex:979}),observation={currentContext:live(1,4),inputs:[old.input],snapshots:[old.snapshot],resyncs:[{eventIndex:974,socketGeneration:1,ownerEpoch:1,proofGeneration:4,code:'stale_delivery'}],controls:[],socketCloses:[]},options={room:'room',life:1,afterEvent:974,afterAt:1000};
 const first=selectCurrentStoreNeutral(observation,options);assert.equal(first.input.seq,735);const history=[storeNeutralProofRecord(first,{phase:'intermediate'})];
 observation.currentContext={...live(1,5),connected:false,controller:false};observation.socketCloses.push({eventIndex:1000,socketGeneration:1,ownerEpoch:1,proofGeneration:5,closed:true,currentSocket:true});assert.equal(selectCurrentStoreNeutral(observation,options),null);
 observation.currentContext=live(2,2);observation.controls.push({eventIndex:1001,socketGeneration:2,ownerEpoch:1,proofGeneration:1,active:true,currentSocket:true});const fresh=pair(live(2,2),{seq:992,tick:996,nativeTick:992,inputEventIndex:1017,snapshotEventIndex:1018,at:2100});observation.inputs.push(fresh.input);observation.snapshots.push(fresh.snapshot);
 const before=JSON.stringify(observation),selected=selectCurrentStoreNeutral(observation,options);assert.equal(selected.input.seq,992);assert.equal(selected.snapshot.inputAck.tick,996);history.push(storeNeutralProofRecord(selected,{phase:'pre-intent'}));assert.deepEqual(history.map(row=>row.seq),[735,992]);assert.equal(JSON.stringify(observation),before,'Selection must not mutate original observations');
 assert.equal(storeInputAck(old.snapshot,old.input,{requireNeutral:true,current:observation.currentContext}),false);assert.equal(storeInputAck(fresh.snapshot,fresh.input,{requireNeutral:true,current:observation.currentContext}),true);
 assert.equal(storeInputAck(fresh.snapshot,fresh.input,{requireNeutral:true,current:{...live(2,3)}}),false,'A further post-selection barrier must still fail the complete tail fence');
 const barriers=storeRecoveryBarrierHistory(observation,{afterEvent:973});assert.deepEqual(barriers.map(row=>row.kind),['resync','snapshot-context','close','control','snapshot-context']);assert.throws(()=>storeRecoveryBarrierHistory(observation,{afterEvent:973,limit:2}),/bound/);
});
test('selection never treats missing live proof, AI progression or another room/life as the final neutral',()=>{
 const good=pair(live(2,2),{seq:992,tick:996,nativeTick:992,inputEventIndex:1017,snapshotEventIndex:1018,at:2100}),observation={currentContext:live(2,2),inputs:[good.input],snapshots:[good.snapshot]},options={room:'room',life:1,afterEvent:1000,afterAt:2000};
 for(const change of [{connected:false},{controller:false},{protocolVersion:1},{room:'another-room'},{life:2},{socketGeneration:3},{ownerEpoch:2},{proofGeneration:3}]){observation.currentContext={...live(2,2),...change};assert.equal(selectCurrentStoreNeutral(observation,options),null);}
 observation.currentContext=live(2,2);observation.snapshots=[{...good.snapshot,inputAck:null,lastSeq:99999}];assert.equal(selectCurrentStoreNeutral(observation,options),null);observation.snapshots=[good.snapshot];assert.equal(selectCurrentStoreNeutral(observation,{...options,afterAt:2200}),null);assert.equal(selectCurrentStoreNeutral(observation,{...options,afterEvent:1020}),null);observation.currentContext=null;assert.equal(selectCurrentStoreNeutral(observation,options),null);
});
test('all observed recovery UI states stay paused until the one explicit intent boundary',()=>{
 const rows=[{atMs:9,playing:true},{atMs:10,playing:false,disabled:true},{atMs:11,playing:false,disabled:false},{atMs:12,playing:false,disabled:false},{atMs:13,playing:false,disabled:true},{atMs:14,playing:false,disabled:false},{atMs:20,playing:true}];
 const result=assertStorePreIntentPaused({rows,dropped:0,fromAtMs:10,throughAtMs:20});assert.equal(result.states.length,5);assert.equal(result.automaticallyPlayingObserved,false);
 assert.throws(()=>assertStorePreIntentPaused({rows,dropped:0,fromAtMs:10}),/remain paused/);assert.throws(()=>assertStorePreIntentPaused({rows:[...rows,{atMs:18,playing:true}],dropped:0,fromAtMs:10,throughAtMs:20}),/remain paused/);assert.throws(()=>assertStorePreIntentPaused({rows,dropped:1,fromAtMs:10,throughAtMs:20}),/drop/);assert.throws(()=>assertStorePreIntentPaused({rows:[],dropped:0,fromAtMs:10,throughAtMs:20}),/actual UI/);
});
