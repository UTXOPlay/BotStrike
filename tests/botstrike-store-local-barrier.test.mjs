import test from 'node:test';import assert from 'node:assert/strict';
import {selectStoreRecoveryBarrier,assertStoreHeldClearedAfterBarrier} from './botstrike-store-local-barrier.mjs';
const before={pageInstance:'page',localFenceAvailable:true,localRecoveryEpoch:3,localPaused:false,pageNowMs:100};
const boundary={pageInstance:'page',localRecoveryEpoch:4,boundaryObservedAt:500,eventIndex:10};
const waiting={atMs:501,playing:false,disabled:true,resume:'WAITING FOR CONTROLS…',localFenceAvailable:true,localRecoveryEpoch:4,localPaused:true};
const observation=()=>({localFenceRequired:true,resyncs:[],localBoundaries:[{...boundary}],inputs:[{eventIndex:11,seq:5,x:0,y:0,pageSentAt:500,localFenceAvailable:true,localRecoveryEpoch:4}]});
test('D3 local latch is the primary barrier even when no server resync has arrived',()=>{
 const o=observation(),barrier=selectStoreRecoveryBarrier({localFenceRequired:true,observation:o,uiRows:[waiting],beforeCut:before});assert.equal(barrier.kind,'local_epoch');assert.equal(barrier.serverResyncObserved,false);assert.equal(barrier.localRecoveryEpoch,4);assert.equal(assertStoreHeldClearedAfterBarrier(o,barrier).observations,1);
 o.resyncs.push({eventIndex:20});assert.equal(selectStoreRecoveryBarrier({localFenceRequired:true,observation:o,uiRows:[waiting],beforeCut:before}).eventIndex,10);
});
test('renaming a button without a real post-cut local epoch and valid paused scalar is never sufficient',()=>{
 for(const patch of [{localFenceAvailable:false},{localPaused:false},{localRecoveryEpoch:3},{playing:true},{disabled:false}])assert.equal(selectStoreRecoveryBarrier({localFenceRequired:true,observation:observation(),uiRows:[{...waiting,...patch}],beforeCut:before}),null);
 for(const patch of [{localRecoveryEpoch:3},{pageInstance:'old-page'},{boundaryObservedAt:99}]){const o=observation();o.localBoundaries=[{...boundary,...patch}];assert.equal(selectStoreRecoveryBarrier({localFenceRequired:true,observation:o,uiRows:[waiting],beforeCut:before}),null);}
});
test('D2 explicit legacy mode still requires the original server-resync and SYNCING UI semantics, without scalar backfill',()=>{
 const o={resyncs:[{eventIndex:7}]};assert.equal(selectStoreRecoveryBarrier({observation:o,uiRows:[{playing:false,disabled:true,resume:'SYNCING CONTROLS',atMs:30}]}).kind,'server_resync');assert.equal(selectStoreRecoveryBarrier({observation:{resyncs:[]},uiRows:[waiting]}),null);assert.equal(selectStoreRecoveryBarrier({observation:o,uiRows:[waiting]}),null);
});
test('actual post-local-barrier sends stay neutral until explicit intent; missing stamps and active inputs fail',()=>{
 const o=observation(),barrier=selectStoreRecoveryBarrier({localFenceRequired:true,observation:o,uiRows:[waiting],beforeCut:before});
 o.inputs.unshift({eventIndex:9,seq:4,x:1,y:0,pageSentAt:500,localFenceAvailable:true,localRecoveryEpoch:3});
 o.inputs.push({eventIndex:12,seq:6,x:1,y:0,pageSentAt:600,localFenceAvailable:true,localRecoveryEpoch:4});assert.throws(()=>assertStoreHeldClearedAfterBarrier(o,barrier),/remain neutral/);assert.equal(assertStoreHeldClearedAfterBarrier(o,barrier,{throughPageAt:600}).observations,1);
 o.inputs.find(row=>row.eventIndex===11).localFenceAvailable=false;assert.throws(()=>assertStoreHeldClearedAfterBarrier(o,barrier,{throughPageAt:600}),/Missing or older/);
});
