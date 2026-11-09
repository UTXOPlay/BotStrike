import test from 'node:test';import assert from 'node:assert/strict';import * as fs from 'node:fs/promises';import os from 'node:os';import path from 'node:path';
import {analyzeBrowserTrace,rawDistribution,runtimeNativeState,explicitBrowserInputAck,packedControlNeutral,analyzeRuntimeRows,analyzeRuntimeFile} from '../tools/network-matrix-analysis.mjs';
import {matrixEvidenceManifest,matrixCaseSummary,fileSha256,developmentArtifactBinding} from '../tools/network-matrix-artifacts.mjs';
import {waitBrowserAppliedInput} from '../tools/run-network-matrix.mjs';
test('browser analysis keeps raw sample counts and requires exact explicit ACK independently of render and JS latency',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'matrix-analysis-'));
 try{const rows=[{kind:'input',index:1,nodeUnixMs:1000,data:{socketGeneration:1,ownerGeneration:1,proofGeneration:1,roomGeneration:2,life:1,minTick:40,protocolVersion:2,deliveryAttached:true,input:{seq:9,viewTick:40,fire:true}}},{kind:'snapshot',index:2,nodeUnixMs:1050,data:{currentSocket:true,controllerActive:true,socketGeneration:1,ownerGeneration:1,proofGeneration:1,roomGeneration:2,slot:0,tick:45,inputAck:{version:1,seq:9,tick:45,life:1,neutral:false},players:[{slot:0,last_seq:9,life:1}]}},{kind:'shared_summary',data:{metrics:{inputAckMs:{n:100,p95:9000}}}}];
 for(let i=0;i<24;i++){rows.push({kind:'scalar',data:{atMs:100+i*34,metric:'renderFrameMs',value:34}},{kind:'scalar',data:{atMs:100+i*34,metric:'inputAckMs',value:i+1}},{kind:'presentation',index:3+i,data:{atMs:100+i*34,animationAtMs:99+i*34,tick:45,viewTick:41,renderTick:41,sequence:10,players:[{slot:5,alive:true}]}});}
 const file=path.join(root,'A.jsonl');await fs.writeFile(file,rows.map(row=>JSON.stringify(row)+'\n').join(''));
 const result=await analyzeBrowserTrace(file,{actorId:'A',slot:0,actions:[{actor:'A',label:'arc-a',kind:'shot',seq:9,presentation:{frameIndex:3,viewTick:41,renderTick:41,targetSlot:5},nativeShots:[{tick:45,seq:9,packedViewTick:40,receipt:{issuedAt:1,deadlineAt:401}}]}],window:{fromBrowserMs:100,toBrowserMs:1000}});
 assert.deepEqual(result.failures,[]);assert.equal(result.metrics.inputAckMs.n,24);assert.equal(result.metrics.inputAckMs.p95,23);assert.equal(result.metrics.renderFrameMs.p50,34);assert.equal(result.correlations[0].firstAckSnapshot.exactRequestedSeq,true);assert.equal(result.correlations[0].firstAckSnapshot.cdpObservationElapsedMs,50);assert.match(result.correlations[0].firstFollowingPresentation.meaning,/not a Native ACK/);
 const atomic=await analyzeBrowserTrace(file,{actorId:'A',slot:0,actions:[{actor:'A',label:'arc-a',kind:'shot',life:1,seq:9,presentation:{frameIndex:3,viewTick:41,renderTick:41,targetSlot:5},nativeShots:[{tick:45,seq:9,packedViewTick:40,receipt:{issuedAt:1,deadlineAt:401}}]}],window:{fromBrowserMs:100,toBrowserMs:1000},requireAtomicPresentation:true,localFenceStatus:{presentationReferenceVersion:1,evidenceAvailable:true,unavailableReason:null,dropped:0,wireJoin:{available:true}}});
 assert.ok(atomic.failures.some(failure=>failure.code==='shot_atomic_presentation_unavailable'&&failure.reason==='atomic_presentation_reference_missing'),'An earlier aim frame plus exact wire ACK cannot substitute for an original-send completed-frame reference');assert.deepEqual(atomic.atomicShotPresentations,[]);
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

const boundaryIssued=7823.925204;
function nextFloat(value,direction=1n){const buffer=new ArrayBuffer(8),view=new DataView(buffer);view.setFloat64(0,value);view.setBigUint64(0,view.getBigUint64(0)+direction);return view.getFloat64(0);}
function boundaryAckRows(deadline=boundaryIssued+400,applied=boundaryIssued+20){
 const room='boundary',frame=(tick,seq)=>({type:'native_frame',room,at:20000+tick,state:{tick,players:[{last_seq:seq,life:1}],events:[]}});
 return [{type:'room_started',room,config:{bots:Array(10).fill(false)}},frame(1,0),{type:'input_arrival',room,slot:0,seq:7,at:10010,input:{seq:7,x:0,y:0,preview_item:2},admission:{generation:3,issuedAt:boundaryIssued,deadlineAt:deadline}},{type:'native_input',room,tick:2,at:10020,monotonicMs:applied,inputs:[[7,0,0,0,0,256,null,null,0,0,1,0,6]]},{type:'input_ack',room,slot:0,seq:7,tick:2,life:1,neutral:true,generation:3},frame(2,7)];
}
function causalBoundaryFixture({shotTick=4,includeCrouchAck=true}={}){
 const room='causal-boundary',ref=(seq,tick)=>({slot:1,seq,tick,life:7,socketGeneration:1,ownerGeneration:1,proofGeneration:1,roomGeneration:1}),requirement={kind:'target-stance-transition',version:2,targetSlot:1,targetLife:7,nativeTargetTransitionRequired:true,targetBaselineApplication:ref(10,2),targetCrouchApplication:ref(11,3),minimumNativeTick:3};
 const action={kind:'shot',actor:'A',slot:0,label:'stance',weapon:0,expectedShots:1,seq:7,ackSeq:7,life:1,fromTick:2,toTick:4,boundaryRequirement:requirement},rows=[{type:'room_started',room,config:{bots:Array(10).fill(false)}}];
 const packed=(seq,flags,view=1)=>[seq,0,0,0,0,flags,null,null,0,0,view,0,6],admission={generation:4,issuedAt:100,deadlineAt:500};
 for(let tick=1;tick<=4;tick++){
  if(tick===2){rows.push({type:'input_arrival',room,slot:1,seq:10,at:1001,monotonicMs:101,input:{seq:10,x:0,y:0,crouch:false},admission},{type:'input_arrival',room,slot:0,seq:7,at:1001,monotonicMs:101,input:{seq:7,x:0,y:0,fire:true},admission});}
  if(tick===3)rows.push({type:'input_arrival',room,slot:1,seq:11,at:1002,monotonicMs:102,input:{seq:11,x:0,y:0,crouch:true},admission});
  const shooterSeq=tick>=shotTick?7:0,targetSeq=tick>=3?11:tick>=2?10:0,inputs=[packed(shooterSeq,tick===shotTick?257:256,tick===shotTick?Math.max(0,shotTick-1):1),packed(targetSeq,tick>=3?264:256)];
  rows.push({type:'native_input',room,tick,at:1000+tick,monotonicMs:110+tick,inputs,pulseTickets:tick===shotTick?[{slot:0,field:'fire',sourceSeq:7,issuedAt:100,deadlineAt:500,generation:4,life:1}]:[]});
  if(tick===2)rows.push({type:'input_ack',room,slot:1,seq:10,tick,life:7,neutral:true,generation:4});
  if(tick===3&&includeCrouchAck)rows.push({type:'input_ack',room,slot:1,seq:11,tick,life:7,neutral:false,generation:4});
  if(tick===shotTick)rows.push({type:'input_ack',room,slot:0,seq:7,tick,life:1,neutral:false,generation:4});
  rows.push({type:'native_frame',room,at:1000+tick,state:{tick,players:[{slot:0,last_seq:shooterSeq,life:1,alive:true,stance:0,crouch:false},{slot:1,last_seq:targetSeq,life:7,alive:true,stance:tick>=3?.25:0,crouch:tick>=3}],events:tick===shotTick?[{kind:'shot',actor:0,value:0}]:[]}});
 }
 return{rows,action,room};
}
test('a new target crouch must be exactly applied before the actual shot; later transitions cannot rescue old residue',async()=>{
 const {rows,action,room}=causalBoundaryFixture(),options={roomId:room,actions:[action]},valid=analyzeRuntimeRows(rows,options);assert.equal(valid.actionResults[0].boundaryTargetTransition.verified,true);assert.equal(valid.actionResults[0].boundaryTargetTransition.baselineVerified,true);assert.equal(valid.actionResults[0].boundaryTargetTransition.newCrouchVerified,true);
 assert.equal(analyzeRuntimeRows(rows,{roomId:room,actions:[{...action,fromTick:3}]}).actionResults[0].boundaryTargetTransition.verified,true,'The settled baseline can precede the shot action while remaining bound to its exact Native frame');
 const legacy=structuredClone(action);legacy.boundaryRequirement.version=1;assert.equal(analyzeRuntimeRows(rows,{roomId:room,actions:[legacy]}).actionResults[0].boundaryTargetTransition.verified,false,'The new causal gate must not reinterpret an older partial-only boundary contract');
 const early=causalBoundaryFixture({shotTick:2});assert.equal(analyzeRuntimeRows(early.rows,{roomId:early.room,actions:[early.action]}).actionResults[0].boundaryTargetTransition.verified,false,'A later real crouch cannot support an earlier shot/rewind');
 const noAck=causalBoundaryFixture({includeCrouchAck:false});assert.ok(analyzeRuntimeRows(noAck.rows,{roomId:noAck.room,actions:[noAck.action]}).failures.some(failure=>failure.code==='boundary_native_target_transition_missing'));
 const otherLife=structuredClone(rows);otherLife.find(row=>row.type==='native_frame'&&row.state.tick===3).state.players[1].life=8;assert.equal(analyzeRuntimeRows(otherLife,options).actionResults[0].boundaryTargetTransition.verified,false);
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'native-stance-projection-'));try{const file=path.join(root,'runtime.jsonl'),rawRows=rows.map(row=>row.type==='native_frame'?{...row,rawLine:JSON.stringify({type:'frame',state:row.state}),state:{...row.state,players:row.state.players.map(player=>({...player,stance:0,crouch:false}))}}:row);await fs.writeFile(file,rawRows.map(row=>JSON.stringify(row)+'\n').join(''));const fromFile=await analyzeRuntimeFile(file,options);assert.equal(fromFile.actionResults[0].boundaryTargetTransition.verified,true,'The actual file wrapper must retain stance from original Native lines, not a conflicting JS projection');}finally{await fs.rm(root,{recursive:true,force:true});}
});
test('ACK TTL uses the exact issued-plus-400 construction across8192 and rejects a one-ULP extension',()=>{
 const deadline=boundaryIssued+400;assert.notEqual(deadline-boundaryIssued,400,'Subtraction must expose the actual cancellation boundary');
 const options={roomId:'boundary',requiredInputAcks:[{slot:0,seq:7,tick:2,life:1}]},valid=analyzeRuntimeRows(boundaryAckRows(),options);assert.deepEqual(valid.failures,[]);assert.equal(valid.requiredInputAckProofs[0].verified,true);
 const invalid=analyzeRuntimeRows(boundaryAckRows(nextFloat(deadline)),options);assert.ok(invalid.failures.some(row=>row.code==='invalid_authoritative_input_ack'));assert.equal(invalid.requiredInputAckProofs[0].verified,false);
});
test('pulse TTL accepts exact construction at8192 boundary but a one-ULP extended original ticket is invalid',()=>{
 function rows(deadline){return[{type:'room_started',room:'pulse-boundary',config:{bots:Array(10).fill(false)}},{type:'input_arrival',room:'pulse-boundary',slot:0,seq:7,input:{fire:true},admission:{issuedAt:boundaryIssued,deadlineAt:deadline,generation:3}},{type:'native_input',room:'pulse-boundary',tick:1,monotonicMs:boundaryIssued+20,inputs:[[7,0,0,0,0,257,null,null,0,0,1]],pulseTickets:[{slot:0,field:'fire',sourceSeq:7,issuedAt:boundaryIssued,deadlineAt:deadline,generation:3,life:1}]}];}
 const valid=analyzeRuntimeRows(rows(boundaryIssued+400),{roomId:'pulse-boundary',requirePulseTickets:true});assert.deepEqual(valid.failures,[]);assert.equal(valid.pulseSummary.observed,1);const invalid=analyzeRuntimeRows(rows(nextFloat(boundaryIssued+400)),{roomId:'pulse-boundary',requirePulseTickets:true});assert.ok(invalid.failures.some(row=>row.code==='pulse_receipt_correlation_missing'));
});
test('HTTP purchase TTL retains its independent exact construction and rejects a one-ULP extension',()=>{
 function rows(deadline){const ticket={slot:0,requestId:1,item:12,life:1,issuedAt:boundaryIssued,deadlineAt:deadline,generation:3};return[{type:'room_started',room:'buy-boundary',config:{bots:Array(10).fill(false)}},{type:'purchase_arrival',room:'buy-boundary',...ticket,accepted:true},{type:'native_input',room:'buy-boundary',tick:1,monotonicMs:boundaryIssued+20,inputs:[[7,0,0,0,0,256,null,12,0,0,1]],purchaseTickets:[ticket]},{type:'native_frame',room:'buy-boundary',state:{tick:1,players:[{last_seq:7,life:1}],events:[{kind:'buy',actor:0,value:12}]}}];}
 const valid=analyzeRuntimeRows(rows(boundaryIssued+400),{roomId:'buy-boundary'});assert.deepEqual(valid.failures,[]);assert.equal(valid.purchases[0].nativeConfirmed,true);const invalid=analyzeRuntimeRows(rows(nextFloat(boundaryIssued+400)),{roomId:'buy-boundary'});assert.ok(invalid.failures.some(row=>row.code==='purchase_receipt_correlation_missing'));
});
test('exact construction does not extend authority: send at deadline fails while the immediately preceding float is valid',()=>{
 const deadline=boundaryIssued+400,before=analyzeRuntimeRows(boundaryAckRows(deadline,nextFloat(deadline,-1n)),{roomId:'boundary'});assert.deepEqual(before.failures,[]);assert.equal(before.inputAckCount,1);
 const at=analyzeRuntimeRows(boundaryAckRows(deadline,deadline),{roomId:'boundary'});assert.ok(at.failures.some(row=>row.code==='invalid_authoritative_input_ack'));assert.equal(at.inputAckCount,0,'A later frame receipt must not renew the original send deadline');
});

test('ACK neutral is the exact conjunction of the original request and final packed input, including repeated weapon0',()=>{
 const repeated=boundaryAckRows();repeated[2].input.weapon=0;repeated[4].neutral=false;
 const valid=analyzeRuntimeRows(repeated,{roomId:'boundary'});assert.deepEqual(valid.failures,[]);assert.equal(valid.inputAckCount,1,'A filtered repeat selection is observable as an ordinary false ACK');
 repeated[4].neutral=true;assert.ok(analyzeRuntimeRows(repeated,{roomId:'boundary'}).failures.some(row=>row.code==='invalid_authoritative_input_ack'),'A repeat weapon request cannot become a recovery-neutral proof');
 const latched=boundaryAckRows();latched[3].inputs[0][5]|=1;latched[4].neutral=false;assert.deepEqual(analyzeRuntimeRows(latched,{roomId:'boundary'}).failures,[],'A neutral base with a final latched action can only have a false ACK');latched[4].neutral=true;assert.ok(analyzeRuntimeRows(latched,{roomId:'boundary'}).failures.some(row=>row.code==='invalid_authoritative_input_ack'));
});

test('private ACK requires an existing immediately previous player in the same life, matching backend construction',()=>{
 const valid=boundaryAckRows();assert.deepEqual(analyzeRuntimeRows(valid,{roomId:'boundary'}).failures,[]);
 const crossLife=structuredClone(valid);crossLife[1].state.players[0].life=2;
 for(const rows of [crossLife,valid.filter((_,index)=>index!==1)]){const result=analyzeRuntimeRows(rows,{roomId:'boundary',requiredInputAcks:[{slot:0,seq:7,tick:2,life:1}]});assert.ok(result.failures.some(row=>row.code==='invalid_authoritative_input_ack'));assert.equal(result.inputAckCount,0);assert.equal(result.requiredInputAckProofs[0].verified,false);}
});


function nativePeekFixture({forwardWest=false}={}){
 const room='native-peek',ref=(seq,tick)=>({slot:5,seq,tick,life:7,socketGeneration:1,ownerGeneration:1,proofGeneration:1,roomGeneration:1});
 const requirement={kind:'target-peek-transition',version:1,targetSlot:5,targetLife:7,targetBaselineApplication:ref(10,2),targetMoveApplication:ref(11,4),minimumNativeTick:4,coverShotLabel:'peek-cover-a',geometry:{coveredGoal:[120,240],peekGoal:[-100,240]}};
 const covered={kind:'shot',actor:'A',slot:0,label:'peek-cover-a',weapon:0,expectedShots:1,seq:7,ackSeq:7,life:1,fromTick:3,toTick:3},action={kind:'shot',actor:'A',slot:0,label:'peek-boundary-a',weapon:0,expectedShots:1,seq:10,ackSeq:10,life:1,fromTick:6,toTick:6,boundaryRequirement:requirement},rows=[{type:'room_started',room,config:{bots:Array(10).fill(false)}}];
 for(let tick=1;tick<=6;tick++){
  const inputs=Array.from({length:10},()=>[0,0,0,0,0,256,null,null,0,0,0]),targetSeq=tick>=4?11:tick>=2?10:0,shooterSeq=tick>=6?10:tick>=3?7:0,moving=tick>=4;
  inputs[0]=[shooterSeq,0,0,0,0,256+([3,6].includes(tick)?1:0),null,null,0,0,tick===6?5:Math.max(0,tick-1)];inputs[5]=[targetSeq,moving&&!forwardWest?-1:0,moving&&forwardWest?1:0,moving&&forwardWest?Math.PI/2:0,0,256,null,null,0,0,Math.max(0,tick-1)];
  const newInputs=[];if(tick===2||tick===4)newInputs.push({slot:5,seq:targetSeq,fire:false,crouch:false,x:inputs[5][1],y:inputs[5][2],yaw:inputs[5][3],pitch:0});if(tick===3||tick===6)newInputs.push({slot:0,seq:shooterSeq,fire:true,crouch:false,x:0,y:0,yaw:0,pitch:0});
  for(const value of newInputs)rows.push({type:'input_arrival',room,slot:value.slot,seq:value.seq,accepted:true,at:1000+tick,monotonicMs:100+tick,input:value,admission:{generation:3,issuedAt:100,deadlineAt:500,requested:Math.max(0,tick-1),acceptedViewTick:Math.max(0,tick-1)}});
  rows.push({type:'native_input',room,tick,at:1000+tick,monotonicMs:200+tick,inputs,pulseTickets:[3,6].includes(tick)?[{slot:0,field:'fire',sourceSeq:shooterSeq,issuedAt:100,deadlineAt:500,generation:3,life:1}]:[]});
  const players=Array.from({length:6},(_,slot)=>({slot,last_seq:slot===0?shooterSeq:slot===5?targetSeq:0,life:slot===5?7:1,alive:true,crouch:false,stance:0,position:slot===5?[tick>=4?123-tick:120,0,240]:[-100,0,600],velocity:slot===5&&tick>=4&&tick<6?[-60,0,0]:[0,0,0]}));
  rows.push({type:'native_frame',room,at:1000+tick,state:{tick,players,events:[3,6].includes(tick)?[{kind:'shot',actor:0,value:0}]:[]}});
  for(const value of newInputs)rows.push({type:'input_ack',room,slot:value.slot,seq:value.seq,tick,life:value.slot===5?7:1,neutral:value.slot===5&&tick===2,generation:3});
 }
 return{rows,room,covered,action};
}

test('Native peek checkpoint requires fresh target movement after a covered shot and permits stopped current pose',async()=>{
 const f=nativePeekFixture(),options={roomId:f.room,actions:[f.covered,f.action]},result=analyzeRuntimeRows(f.rows,options),proof=result.actionResults[1].boundaryTargetTransition;
 assert.equal(proof.verified,true);assert.equal(proof.baselineVerified,true);assert.equal(proof.newMoveVerified,true);assert.equal(proof.coveredShotNativeEventBeforeMoveVerified,true);assert.equal(proof.historicalMoving,true);assert.equal(proof.currentMoving,false);assert.equal(proof.currentMotionRequired,false);
 const forward=nativePeekFixture({forwardWest:true});assert.equal(analyzeRuntimeRows(forward.rows,{roomId:forward.room,actions:[forward.covered,forward.action]}).actionResults[1].boundaryTargetTransition.verified,true);
 for(const change of [g=>{g.rows.find(row=>row.type==='native_frame'&&row.state.tick===5).state.players[5].velocity[0]=0;},g=>{g.action.boundaryRequirement.targetMoveApplication.tick=6;},g=>{g.rows.find(row=>row.type==='native_input'&&row.tick===4).inputs[5][1]=1;},g=>{g.rows.find(row=>row.type==='native_frame'&&row.state.tick===5).state.players[5].life=8;},g=>{g.covered.label='unrelated-cover';}]){const bad=nativePeekFixture();change(bad);assert.equal(analyzeRuntimeRows(bad.rows,{roomId:bad.room,actions:[bad.covered,bad.action]}).actionResults[1].boundaryTargetTransition.verified,false);}
 const directory=await fs.mkdtemp(path.join(os.tmpdir(),'native-peek-projection-'));try{const file=path.join(directory,'runtime.jsonl');await fs.writeFile(file,f.rows.map(row=>JSON.stringify(row.type==='native_frame'?{...row,rawLine:JSON.stringify({type:'frame',state:row.state}),state:{...row.state,players:row.state.players.map(p=>({...p,position:[999,99,999],velocity:[999,0,0]}))}}:row)).join('\n')+'\n');assert.equal((await analyzeRuntimeFile(file,options)).actionResults[1].boundaryTargetTransition.verified,true,'File projection retains original Native position/velocity rather than misleading JS projections');}finally{await fs.rm(directory,{recursive:true,force:true});}
});
