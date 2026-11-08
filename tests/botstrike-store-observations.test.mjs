import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {EventEmitter} from 'node:events';
import {observeStoreProtocol,storeInputAck,neutral,analyzeStoreRecovery,kernelCDrops} from './botstrike-store-observations.mjs';

test('Store observation retains only receipt/token presence and exact input acknowledgements',()=>{
 const page=new EventEmitter(),observation=observeStoreProtocol(page,'http://store.example'),socket=new EventEmitter();socket.url=()=> 'ws://store.example/games/botstrike/api/socket';page.emit('websocket',socket);
 socket.emit('framesent',{payload:JSON.stringify({type:'input',room:'private-room',input:{seq:4,x:1,y:0},delivery:{version:2,nonce:'SECRET_NONCE'}})});
 socket.emit('framereceived',{payload:JSON.stringify({type:'control',active:true,token:'SECRET_OWNER',inputProtocol:{version:2,maxAgeMs:400}})});
 page.emit('request',{method:()=> 'POST',url:()=> 'http://store.example/games/botstrike/api/action',postDataJSON:()=>({type:'buy',item:12,controlToken:'SECRET_OWNER',delivery:{nonce:'SECRET_NONCE'}})});
 assert.equal(observation.inputs[0].seq,4);assert.equal(observation.inputs[0].deliveryAttached,true);assert.equal(observation.buys[0].controlTokenAttached,true);assert.deepEqual(observation.controls[0].inputProtocol,{version:2,maxAgeMs:400});assert.equal(JSON.stringify(observation).includes('SECRET_'),false);
});
test('recovery neutral excludes action pulses and kernel drops use only the actual C link',()=>{
 assert.equal(neutral({x:0,y:0,weapon:null}),true);for(const input of [{x:1,y:0},{x:0,y:0,fire:true},{x:0,y:0,weapon:0},{x:0,y:0,practice:1}])assert.equal(neutral(input),false);
 assert.equal(kernelCDrops({server:{qdisc:[{kind:'netem',dev:'ifbuC',drops:2},{dev:'ifbuA',drops:99}]},actors:{C:{qdisc:[{kind:'netem',dev:'ifbdC',drops:3},{kind:'fq_codel',dev:'ifbdC',drops:99},{dev:'eth0',drops:99}]}}}),5);
});
test('raw-frame recovery analysis separates legitimate Casual AI cover from obsolete human controls',async t=>{
 const directory=mkdtempSync(path.join(tmpdir(),'store-recovery-analysis-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));
 const packed=(seq,x,flags)=>[seq,x,0,0,0,flags,null,null],arrival=(seq,at)=>({type:'input_arrival',slot:0,seq,at,admission:{deadlineAt:at+400}}),frame=(tick,seq,events=[])=>({type:'native_frame',at:1200+tick*50,rawLine:JSON.stringify({type:'frame',state:{tick,players:[{last_seq:seq,life:1}],events}})});
 const rows=[{type:'room_started',config:{bots:[true]}},{type:'input_rejected',slot:0,seq:1,reason:'expired'},arrival(10,1200),{type:'native_input',tick:1,at:1250,monotonicMs:1250,inputs:[packed(10,0,256)]},frame(1,10),{type:'native_input',tick:2,at:1300,monotonicMs:1300,inputs:[null]},frame(2,10,[{kind:'shot',actor:0}]),arrival(11,1350),{type:'native_input',tick:3,at:1360,monotonicMs:1360,inputs:[packed(11,1,256)]},frame(3,11)];
 rows.splice(4,0,{type:'input_ack',slot:0,tick:1,seq:10,life:1,neutral:true});rows.splice(rows.length-1,0,{type:'input_ack',slot:0,tick:3,seq:11,life:1,neutral:false});
 const file=path.join(directory,'runtime.jsonl'),options={restoreAt:1100,heldSequences:[1],neutralSeq:10,newMovementSeq:11};writeFileSync(file,rows.map(row=>JSON.stringify(row)).join('\n'));
 const result=await analyzeStoreRecovery(file,options);assert.equal(result.aiCoverShotEvents,1);assert.equal(result.humanShotEvents,0);assert.equal(result.rawNativeFrames,3);assert.ok(result.neutralAck&&result.newMovementAck);
 const falseNeutral=structuredClone(rows);falseNeutral[3].inputs[0][1]=1;writeFileSync(file,falseNeutral.map(row=>JSON.stringify(row)).join('\n'));await assert.rejects(analyzeStoreRecovery(file,options),/Fresh neutral and subsequent/);
 const noProof=rows.filter(row=>row.type!=='input_ack');writeFileSync(file,noProof.map(row=>JSON.stringify(row)).join('\n'));await assert.rejects(analyzeStoreRecovery(file,options),/Fresh neutral and subsequent/);
 const collided=structuredClone(rows);collided.find(row=>row.type==='native_frame'&&JSON.parse(row.rawLine).state.tick===1).rawLine=JSON.stringify({type:'frame',state:{tick:1,players:[{last_seq:9999,life:1}],events:[]}});writeFileSync(file,collided.map(row=>JSON.stringify(row)).join('\n'));await assert.rejects(analyzeStoreRecovery(file,options),/Fresh neutral and subsequent/);
 const unmatched=rows.filter(row=>!(row.type==='native_input'&&row.tick===2));writeFileSync(file,unmatched.map(row=>JSON.stringify(row)).join('\n'));await assert.rejects(analyzeStoreRecovery(file,options),/same-tick dispatched input/);
 const bad=[...rows,{type:'native_input',tick:4,at:1400,monotonicMs:1400,inputs:[packed(1,1,257)]}];writeFileSync(file,bad.map(row=>JSON.stringify(row)).join('\n'));await assert.rejects(analyzeStoreRecovery(file,options),/Old held human controls/);
 writeFileSync(file,[...rows,{type:'native_frame',at:1500,state:{tick:4}}].map(row=>JSON.stringify(row)).join('\n'));await assert.rejects(analyzeStoreRecovery(file,options),/original raw JSON line/);
});


test('Store wire proof is bound to actual sent input, owner/socket, life and Native frame',()=>{
 const input={proofGeneration:2,protocolVersion:2,seq:5,x:0,y:0,preview_item:2,throw_mode:1,room:'room',life:1,nativeTick:10,socketGeneration:1,ownerEpoch:1,deliveryAttached:true};
 const snapshot={proofGeneration:2,room:'room',life:1,tick:12,lastSeq:5,socketGeneration:1,ownerEpoch:1,deliveryAttached:true,inputAck:{version:1,seq:5,tick:11,life:1,neutral:true}};
 const current={...snapshot,connected:true,controller:true,protocolVersion:2,maxAgeMs:400};assert.equal(storeInputAck(snapshot,input,{requireNeutral:true,current}),true);assert.equal(storeInputAck(snapshot,input,{requireNeutral:true}),false,'Historical snapshot is never a default live context');
 for(const patch of [{inputAck:null},{lastSeq:6},{life:2},{room:'old'},{socketGeneration:2},{ownerEpoch:2},{tick:10},{deliveryAttached:false}])assert.equal(storeInputAck({...snapshot,...patch},input,{requireNeutral:true,current}),false);
 assert.equal(storeInputAck({...snapshot,inputAck:{...snapshot.inputAck,tick:10}},input,{current}),false);
 assert.equal(storeInputAck({...snapshot,inputAck:{...snapshot.inputAck,neutral:false}},input,{requireNeutral:true,current}),false);
 assert.equal(storeInputAck(snapshot,{...input,fire:true},{requireNeutral:true,current}),false);
});

test('Store parser records normalized ACK context without receipt nonce or ownership token',()=>{
 const page=new EventEmitter(),observation=observeStoreProtocol(page,'http://store.example'),socket=new EventEmitter();socket.url=()=> 'ws://store.example/games/botstrike/api/socket';page.emit('websocket',socket);
 socket.emit('framereceived',{payload:JSON.stringify({type:'control',active:true,token:'SECRET_OWNER',inputProtocol:{version:2,maxAgeMs:400}})});
 const state={type:'state',delivery:{version:2,nonce:'SECRET_NONCE'},room:{id:'room',slot:0,state:{tick:10,players:[{life:1,last_seq:0}]}}};
 socket.emit('framereceived',{payload:JSON.stringify(state)});socket.emit('framesent',{payload:JSON.stringify({type:'input',room:'room',input:{seq:5,x:0,y:0},delivery:state.delivery})});
 socket.emit('framereceived',{payload:JSON.stringify({...state,inputAck:{version:1,seq:5,tick:11,life:1,neutral:true},room:{...state.room,state:{tick:12,players:[{life:1,last_seq:5}]}}})});
 assert.equal(storeInputAck(observation.snapshots.at(-1),observation.inputs[0],{requireNeutral:true,current:observation.currentContext}),true);
 socket.emit('framereceived',{payload:JSON.stringify({...state,inputAck:{version:1,seq:5,tick:11,life:1,neutral:true,token:'SECRET_OWNER'}})});
 assert.equal(observation.snapshots.at(-1).inputAck,null);assert.equal(JSON.stringify(observation).includes('SECRET_'),false);
});


test('same-socket resync revokes historical neutral proof even when owner and life are unchanged',()=>{
 const input={protocolVersion:2,seq:5,x:0,y:0,room:'room',life:1,nativeTick:10,socketGeneration:1,ownerEpoch:1,proofGeneration:2,deliveryAttached:true};
 const snapshot={...input,tick:12,lastSeq:5,inputAck:{version:1,seq:5,tick:11,life:1,neutral:true}};
 const current={...snapshot,connected:true,controller:true,protocolVersion:2,maxAgeMs:400};assert.equal(storeInputAck(snapshot,input,{requireNeutral:true,current}),true);assert.equal(storeInputAck(snapshot,input,{requireNeutral:true}),false,'Historical snapshot is never a default live context');
 assert.equal(storeInputAck(snapshot,input,{requireNeutral:true,current:{...current,proofGeneration:3}}),false);
 assert.equal(storeInputAck({...snapshot,proofGeneration:3},input,{requireNeutral:true,current}),false);
});

function wireProof(){
 const page=new EventEmitter(),observation=observeStoreProtocol(page,'http://store.example');
 function socket(){const value=new EventEmitter();value.url=()=> 'ws://store.example/games/botstrike/api/socket';value.receive=data=>value.emit('framereceived',{payload:JSON.stringify(data)});value.send=data=>value.emit('framesent',{payload:JSON.stringify(data)});page.emit('websocket',value);return value;}
 const control=(value,active=true,token='SECRET_OWNER')=>value.receive({type:'control',active,token:active?token:undefined,inputProtocol:{version:2,maxAgeMs:400}});
 const state=(value,{room='room',life=1,tick=10,lastSeq=0,ack=null}={})=>value.receive({type:'state',delivery:{version:2,nonce:'SECRET_NONCE'},inputAck:ack,room:room===null?null:{id:room,slot:0,state:{tick,players:[{life,last_seq:lastSeq}]}}});
 const send=(value,seq=5)=>value.send({type:'input',room:'room',delivery:{version:2,nonce:'SECRET_NONCE'},input:{seq,x:0,y:0}});
 const first=socket();control(first);state(first);send(first);state(first,{tick:12,lastSeq:5,ack:{version:1,seq:5,tick:11,life:1,neutral:true}});
 return {observation,first,socket,control,state,send,input:observation.inputs[0],snapshot:observation.snapshots.at(-1),matches(snapshot=observation.snapshots.at(-1),input=observation.inputs[0]){return storeInputAck(snapshot,input,{requireNeutral:true,current:observation.currentContext});}};
}
test('live context revokes proof immediately after resync, before any replacement state arrives',()=>{
 const f=wireProof();assert.equal(f.matches(),true);const snapshots=f.observation.snapshots.length,epoch=f.observation.currentContext.proofGeneration;
 f.first.receive({type:'input_resync',code:'stale_delivery'});assert.equal(f.observation.snapshots.length,snapshots);assert.equal(f.observation.currentContext.proofGeneration,epoch+1);assert.equal(f.matches(),false);
 f.send(f.first,6);f.state(f.first,{tick:14,lastSeq:6,ack:{version:1,seq:6,tick:13,life:1,neutral:true}});assert.equal(f.matches(f.observation.snapshots.at(-1),f.observation.inputs.at(-1)),true);assert.equal(f.matches(f.snapshot,f.input),false,'A newer snapshot cannot revive a historical barrier');
 const copy=f.observation.currentContext;copy.proofGeneration=0;assert.notEqual(f.observation.currentContext.proofGeneration,0,'Caller mutation cannot alter the live observer');assert.equal(JSON.stringify(f.observation).includes('SECRET_'),false);
});
test('inactive or closed controllers cannot use their last true ACK without a new state',()=>{
 for(const event of ['inactive','close']){const f=wireProof();assert.equal(f.matches(),true);const snapshots=f.observation.snapshots.length;if(event==='inactive')f.control(f.first,false);else f.first.emit('close');assert.equal(f.observation.snapshots.length,snapshots);assert.equal(f.matches(),false);if(event==='close'){assert.equal(f.observation.currentContext.connected,false);f.control(f.first);assert.equal(f.matches(),false,'Late control cannot reopen a closed transport');}}
});
test('old socket late control/state/close cannot replace the new socket live context',()=>{
 const f=wireProof(),second=f.socket();assert.equal(f.matches(f.snapshot,f.input),false);f.control(second,true,'SECRET_NEW_OWNER');f.state(second);f.send(second,20);f.state(second,{tick:12,lastSeq:20,ack:{version:1,seq:20,tick:11,life:1,neutral:true}});const current=f.observation.currentContext,snapshot=f.observation.snapshots.at(-1),input=f.observation.inputs.at(-1);assert.equal(f.matches(snapshot,input),true);
 f.control(f.first,false);f.state(f.first,{room:'old-room',life:9,tick:99,lastSeq:5,ack:{version:1,seq:5,tick:98,life:9,neutral:true}});f.first.emit('close');assert.deepEqual(f.observation.currentContext,current);assert.equal(f.matches(snapshot,input),true);assert.equal(f.matches(f.observation.snapshots.at(-1),f.input),false);
});
test('room/life changes and leaving clear the current proof even when historical ACKs remain recorded',()=>{
 const room=wireProof();room.state(room.first,{room:'another-room'});assert.equal(room.matches(room.snapshot,room.input),false);
 const life=wireProof();life.state(life.first,{life:2,tick:13});assert.equal(life.matches(life.snapshot,life.input),false);
 const leave=wireProof();leave.state(leave.first,{room:null});assert.equal(leave.observation.currentContext.room,null);assert.equal(leave.matches(leave.snapshot,leave.input),false);
 const protocol=wireProof();protocol.first.receive({type:'control',active:true,token:'SECRET_OWNER',inputProtocol:{version:1,maxAgeMs:400}});assert.equal(protocol.matches(protocol.snapshot,protocol.input),false);
});
