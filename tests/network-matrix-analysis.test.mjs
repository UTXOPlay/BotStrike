import test from 'node:test';import assert from 'node:assert/strict';import * as fs from 'node:fs/promises';import os from 'node:os';import path from 'node:path';
import {analyzeBrowserTrace,rawDistribution,runtimeNativeState,explicitBrowserInputAck,packedControlNeutral,analyzeRuntimeRows} from '../tools/network-matrix-analysis.mjs';
import {matrixEvidenceManifest,matrixCaseSummary,fileSha256,developmentArtifactBinding} from '../tools/network-matrix-artifacts.mjs';
import {waitBrowserAppliedInput} from '../tools/run-network-matrix.mjs';
test('browser analysis keeps raw sample counts and requires exact explicit ACK independently of render and JS latency',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'matrix-analysis-'));
 try{const rows=[{kind:'input',index:1,nodeUnixMs:1000,data:{socketGeneration:1,ownerGeneration:1,proofGeneration:1,roomGeneration:2,life:1,minTick:40,protocolVersion:2,deliveryAttached:true,input:{seq:9,viewTick:40,fire:true}}},{kind:'snapshot',index:2,nodeUnixMs:1050,data:{currentSocket:true,controllerActive:true,socketGeneration:1,ownerGeneration:1,proofGeneration:1,roomGeneration:2,slot:0,tick:45,inputAck:{version:1,seq:9,tick:45,life:1,neutral:false},players:[{slot:0,last_seq:9,life:1}]}},{kind:'shared_summary',data:{metrics:{inputAckMs:{n:100,p95:9000}}}}];
 for(let i=0;i<24;i++){rows.push({kind:'scalar',data:{atMs:100+i*34,metric:'renderFrameMs',value:34}},{kind:'scalar',data:{atMs:100+i*34,metric:'inputAckMs',value:i+1}},{kind:'presentation',index:3+i,data:{atMs:100+i*34,animationAtMs:99+i*34,tick:45,viewTick:41,renderTick:41,sequence:10,players:[{slot:5,alive:true}]}});}
 const file=path.join(root,'A.jsonl');await fs.writeFile(file,rows.map(row=>JSON.stringify(row)+'\n').join(''));
 const result=await analyzeBrowserTrace(file,{actorId:'A',slot:0,actions:[{actor:'A',label:'arc-a',kind:'shot',seq:9,presentation:{frameIndex:3,viewTick:41,renderTick:41,targetSlot:5},nativeShots:[{tick:45,seq:9,packedViewTick:40,receipt:{issuedAt:1,deadlineAt:401}}]}],window:{fromBrowserMs:100,toBrowserMs:1000}});
 assert.deepEqual(result.failures,[]);assert.equal(result.metrics.inputAckMs.n,24);assert.equal(result.metrics.inputAckMs.p95,23);assert.equal(result.metrics.renderFrameMs.p50,34);assert.equal(result.correlations[0].firstAckSnapshot.exactRequestedSeq,true);assert.equal(result.correlations[0].firstAckSnapshot.cdpObservationElapsedMs,50);assert.match(result.correlations[0].firstFollowingPresentation.meaning,/not a Native ACK/);
 assert.deepEqual(rawDistribution([]),null);
 }finally{await fs.rm(root,{recursive:true,force:true});}
});
test('wrong owner/socket generation cannot supply an action ACK and a requested render cap alone supplies no samples',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'matrix-analysis-'));
 try{const file=path.join(root,'A.jsonl');await fs.writeFile(file,[{kind:'input',index:1,data:{socketGeneration:2,roomGeneration:2,deliveryAttached:true,input:{seq:9}}},{kind:'snapshot',index:2,data:{currentSocket:false,socketGeneration:1,roomGeneration:2,players:[{slot:0,last_seq:999}]}},{kind:'render_preference',data:{fps:30}}].map(row=>JSON.stringify(row)+'\n').join(''));const result=await analyzeBrowserTrace(file,{actorId:'A',slot:0,actions:[{actor:'A',label:'shot',seq:9}],window:{fromBrowserMs:0,toBrowserMs:1000}});assert.ok(result.failures.some(row=>row.code==='browser_action_missing_snapshot_ack_observation'));assert.ok(result.failures.some(row=>row.code==='browser_measured_render_window_missing'));assert.equal(result.metrics.renderFrameMs,null);
 }finally{await fs.rm(root,{recursive:true,force:true});}
});
test('public resume summary excludes private poses/transport/auth and immutable manifest detects raw tampering',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'matrix-artifacts-'));
 try{await fs.writeFile(path.join(root,'raw.jsonl'),'private original\n');const before=await matrixEvidenceManifest(root);await fs.writeFile(path.join(root,'matrix-case.json'),'private metadata');await fs.writeFile(path.join(root,'evidence-manifest.json'),JSON.stringify(before));assert.deepEqual(await matrixEvidenceManifest(root),before);const old=await fileSha256(path.join(root,'raw.jsonl'));await fs.writeFile(path.join(root,'raw.jsonl'),'changed');assert.notEqual(await fileSha256(path.join(root,'raw.jsonl')),old);assert.notDeepEqual(await matrixEvidenceManifest(root),before);
 const publicSummary=JSON.stringify(matrixCaseSummary({id:'a',status:'passed',labRoot:root,marks:[{nonce:'hidden-nonce'}],samples:[{token:'secret-token',position:[123,456,789]}],kernel:[{ip:'1.2.3.4'}],rawArchives:{status:'complete',files:1,rawLine:'hidden-nonce',position:[123,456,789],token:'secret-token'},failures:[{code:'X',message:'secret-token'}]}));for(const secret of ['hidden-nonce','secret-token','position','1.2.3.4'])assert.equal(publicSummary.includes(secret),false);await fs.symlink(path.join(root,'raw.jsonl'),path.join(root,'symlink'));await assert.rejects(matrixEvidenceManifest(root),/symlinks/);
 }finally{await fs.rm(root,{recursive:true,force:true});}
});

test('original engine line survives normalization while legacy JS projection is never synthesized as raw evidence',()=>{const rawLine='{\"type\":\"frame\",\"state\":{\"tick\":3,\"value\":-0.0}}',event={type:'native_frame',rawLine};assert.ok(Object.is(runtimeNativeState(event).value,-0));assert.equal(event.rawLine,rawLine);const legacy={type:'native_frame',state:{tick:3,value:0}};assert.ok(Object.is(runtimeNativeState(legacy).value,0));assert.equal('rawLine'in legacy,false);assert.throws(()=>runtimeNativeState({type:'native_frame',rawLine:'{\"type\":\"ready\"}'}),/original Native/);});

test('DEV resume binds every mounted source and asset, including service and HTML beyond the driver file list',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'matrix-dev-binding-'));try{for(const directory of ['host','botstrike-service','dist','shared','tools','botstrike'])await fs.mkdir(path.join(root,directory));await fs.writeFile(path.join(root,'botstrike/spec.json'),'{}');await fs.writeFile(path.join(root,'botstrike-service/server.mjs'),'first');await fs.writeFile(path.join(root,'dist/index.html'),'<canvas>');const first=await developmentArtifactBinding(root);await fs.writeFile(path.join(root,'botstrike-service/server.mjs'),'second');assert.notDeepEqual(await developmentArtifactBinding(root),first);const second=await developmentArtifactBinding(root);await fs.writeFile(path.join(root,'dist/index.html'),'<button>');assert.notDeepEqual(await developmentArtifactBinding(root),second);}finally{await fs.rm(root,{recursive:true,force:true});}
});

test('explicit browser ACK requires exact known seq, current socket/owner/life and a newer Native tick',()=>{
 const sent={socketGeneration:2,ownerGeneration:3,proofGeneration:1,roomGeneration:4,life:1,minTick:40,deliveryAttached:true,protocolVersion:2,input:{seq:9,x:0,y:0,preview_item:2,throw_mode:1}},snapshot={currentSocket:true,controllerActive:true,socketGeneration:2,ownerGeneration:3,proofGeneration:1,roomGeneration:4,slot:0,tick:45,players:[{slot:0,life:1,last_seq:9}],inputAck:{version:1,seq:9,tick:44,life:1,neutral:true}};
 assert.deepEqual(explicitBrowserInputAck(snapshot,sent),snapshot.inputAck);
 for(const altered of [{...snapshot,inputAck:null,players:[{slot:0,life:1,last_seq:99999}]},{...snapshot,currentSocket:false},{...snapshot,ownerGeneration:2},{...snapshot,controllerActive:false},{...snapshot,inputAck:{...snapshot.inputAck,seq:10}},{...snapshot,inputAck:{...snapshot.inputAck,life:2}},{...snapshot,inputAck:{...snapshot.inputAck,tick:40}}])assert.equal(explicitBrowserInputAck(altered,sent),null);
 assert.equal(explicitBrowserInputAck(snapshot,{...sent,input:{...sent.input,fire:true}}),null);
 assert.equal(explicitBrowserInputAck(snapshot,{...sent,protocolVersion:1}),null);
 assert.ok(explicitBrowserInputAck({...snapshot,inputAck:{...snapshot.inputAck,neutral:false}},sent),'Latched final pulse may make a known-sent neutral base non-neutral');
});

test('preview/throw configuration is neutral while real gameplay fields and HTTP buys remain actions',()=>{
 const input=[7,0,0,0,0,256,null,null,0,0,1,0,6];
 for(const configuration of [0,1,2,3,6,17])assert.equal(packedControlNeutral([...input.slice(0,12),configuration]),true);
 for(const [index,value]of [[1,1],[2,1],[5,257],[5,260],[5,264],[5,384],[6,0],[7,12],[9,1],[11,1]]){const changed=[...input];changed[index]=value;assert.equal(packedControlNeutral(changed),false);}
});

test('recovery requires the selected public ACK to match private admission, final packed input and exact Native frame',()=>{
 const room='ack-fixture',input=[7,0,0,0,0,256,null,null,0,0,1,0,6],frame=(tick,last)=>({type:'native_frame',room,at:1020,state:{tick,players:[{last_seq:last,life:1}],events:[]}}),ack={type:'input_ack',room,slot:0,seq:7,tick:2,life:1,neutral:true,generation:4},rows=[{type:'room_started',room,config:{bots:Array(10).fill(false)}},frame(1,0),{type:'input_arrival',room,slot:0,seq:7,at:1010,input:{seq:7,x:0,y:0,preview_item:2,throw_mode:0},admission:{generation:4,issuedAt:100,deadlineAt:500}},{type:'native_input',room,tick:2,at:1018,monotonicMs:110,inputs:[input]},ack,frame(2,7)],options={roomId:room,faultWindow:{slot:0,restoredAt:1000,releasedAt:500,freshActionAt:2000,recoveryBudgetMs:60000,recoveryAck:{version:1,seq:7,tick:2,life:1,neutral:true}},requiredInputAcks:[{slot:0,seq:7,tick:2,life:1}]};
 const result=analyzeRuntimeRows(rows,options);assert.deepEqual(result.failures,[]);assert.equal(result.recovery.neutralAck.seq,7);assert.equal(result.requiredInputAckProofs[0].verified,true);
 const noAck=analyzeRuntimeRows(rows.filter(row=>row!==ack),options);assert.ok(noAck.failures.some(row=>row.code==='missing_or_late_recovery_neutral_ack'));
 for(const changed of [{...ack,generation:5},{...ack,life:2},{...ack,seq:8},{...ack,neutral:false}]){const bad=analyzeRuntimeRows(rows.map(row=>row===ack?changed:row),options);assert.ok(bad.failures.some(row=>row.code==='invalid_authoritative_input_ack'));assert.equal(bad.recovery.neutralAck,null);}
 const ai=structuredClone(rows);ai.at(-1).state.players[0].last_seq=99999;assert.ok(analyzeRuntimeRows(ai,options).failures.some(row=>row.code==='invalid_authoritative_input_ack'));
});

test('the live recovery waiter cannot use AI progression or a historical exact ACK across same-socket resync',async()=>{
 const input={index:1,nodeUnixMs:1010,socketGeneration:2,ownerGeneration:3,proofGeneration:1,roomGeneration:4,life:1,minTick:40,deliveryAttached:true,protocolVersion:2,input:{seq:9,x:0,y:0,preview_item:2}},snapshot={index:2,currentSocket:true,controllerActive:true,socketGeneration:2,ownerGeneration:3,proofGeneration:1,roomGeneration:4,slot:0,tick:45,players:[{slot:0,life:1,last_seq:99999}],inputAck:null},inputs=[input],snapshots=[snapshot];
 const actor={control:{active:true},socketGeneration:2,ownerGeneration:3,proofGeneration:1,roomGeneration:4,async room(){return {slot:0,state:{players:[{life:1}]}};},events(kind,{afterIndex=0}={}){return(kind==='input'?inputs:snapshots).filter(row=>row.index>afterIndex);}};
 await assert.rejects(waitBrowserAppliedInput(actor,{afterAt:1000,neutral:true,timeout:15}),/exact Native input ACK/);
 snapshot.players[0].last_seq=9;snapshot.inputAck={version:1,seq:9,tick:44,life:1,neutral:true};assert.equal((await waitBrowserAppliedInput(actor,{afterAt:1000,neutral:true,timeout:15})).ack.seq,9);
 actor.proofGeneration=2;await assert.rejects(waitBrowserAppliedInput(actor,{afterAt:1000,neutral:true,timeout:15}),/exact Native input ACK/);
 inputs.push({...input,index:3,proofGeneration:2,nodeUnixMs:1100,minTick:45,input:{seq:11,x:0,y:0,throw_mode:2}});snapshots.push({...snapshot,index:4,proofGeneration:2,tick:49,players:[{slot:0,life:1,last_seq:11}],inputAck:{version:1,seq:11,tick:48,life:1,neutral:true}});assert.equal((await waitBrowserAppliedInput(actor,{afterAt:1050,neutral:true,timeout:15})).ack.seq,11);
 actor.control.active=false;await assert.rejects(waitBrowserAppliedInput(actor,{afterAt:1050,neutral:true,timeout:15}),/exact Native input ACK/);
});
