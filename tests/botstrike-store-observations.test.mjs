import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {EventEmitter} from 'node:events';
import {observeStoreProtocol,neutral,analyzeStoreRecovery,kernelCDrops} from './botstrike-store-observations.mjs';

test('Store observation retains only receipt/token presence and exact input acknowledgements',()=>{
 const page=new EventEmitter(),observation=observeStoreProtocol(page,'http://store.example'),socket=new EventEmitter();socket.url=()=> 'ws://store.example/games/botstrike/api/socket';page.emit('websocket',socket);
 socket.emit('framesent',{payload:JSON.stringify({type:'input',room:'private-room',input:{seq:4,x:1,y:0},delivery:{version:1,nonce:'SECRET_NONCE'}})});
 socket.emit('framereceived',{payload:JSON.stringify({type:'control',active:true,token:'SECRET_OWNER',inputProtocol:{version:1,maxAgeMs:400}})});
 page.emit('request',{method:()=> 'POST',url:()=> 'http://store.example/games/botstrike/api/action',postDataJSON:()=>({type:'buy',item:12,controlToken:'SECRET_OWNER',delivery:{nonce:'SECRET_NONCE'}})});
 assert.equal(observation.inputs[0].seq,4);assert.equal(observation.inputs[0].deliveryAttached,true);assert.equal(observation.buys[0].controlTokenAttached,true);assert.deepEqual(observation.controls[0].inputProtocol,{version:1,maxAgeMs:400});assert.equal(JSON.stringify(observation).includes('SECRET_'),false);
});
test('recovery neutral excludes action pulses and kernel drops use only the actual C link',()=>{
 assert.equal(neutral({x:0,y:0,weapon:null}),true);for(const input of [{x:1,y:0},{x:0,y:0,fire:true},{x:0,y:0,weapon:0},{x:0,y:0,practice:1}])assert.equal(neutral(input),false);
 assert.equal(kernelCDrops({server:{qdisc:[{kind:'netem',dev:'ifbuC',drops:2},{dev:'ifbuA',drops:99}]},actors:{C:{qdisc:[{kind:'netem',dev:'ifbdC',drops:3},{kind:'fq_codel',dev:'ifbdC',drops:99},{dev:'eth0',drops:99}]}}}),5);
});
test('raw-frame recovery analysis separates legitimate Casual AI cover from obsolete human controls',async t=>{
 const directory=mkdtempSync(path.join(tmpdir(),'store-recovery-analysis-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));
 const packed=(seq,x,flags)=>[seq,x,0,0,0,flags,null,null],arrival=(seq,at)=>({type:'input_arrival',slot:0,seq,at,admission:{deadlineAt:at+400}}),frame=(tick,seq,events=[])=>({type:'native_frame',at:1200+tick*50,rawLine:JSON.stringify({type:'frame',state:{tick,players:[{last_seq:seq}],events}})});
 const rows=[{type:'room_started',config:{bots:[true]}},{type:'input_rejected',slot:0,seq:1,reason:'expired'},arrival(10,1200),{type:'native_input',tick:1,at:1250,monotonicMs:1250,inputs:[packed(10,0,256)]},frame(1,10),{type:'native_input',tick:2,at:1300,monotonicMs:1300,inputs:[null]},frame(2,10,[{kind:'shot',actor:0}]),arrival(11,1350),{type:'native_input',tick:3,at:1360,monotonicMs:1360,inputs:[packed(11,1,256)]},frame(3,11)];
 const file=path.join(directory,'runtime.jsonl'),options={restoreAt:1100,heldSequences:[1],neutralSeq:10,newMovementSeq:11};writeFileSync(file,rows.map(row=>JSON.stringify(row)).join('\n'));
 const result=await analyzeStoreRecovery(file,options);assert.equal(result.aiCoverShotEvents,1);assert.equal(result.humanShotEvents,0);assert.equal(result.rawNativeFrames,3);assert.ok(result.neutralAck&&result.newMovementAck);
 const falseNeutral=structuredClone(rows);falseNeutral[3].inputs[0][1]=1;writeFileSync(file,falseNeutral.map(row=>JSON.stringify(row)).join('\n'));await assert.rejects(analyzeStoreRecovery(file,options),/Fresh neutral and subsequent/);
 const unmatched=rows.filter(row=>!(row.type==='native_input'&&row.tick===2));writeFileSync(file,unmatched.map(row=>JSON.stringify(row)).join('\n'));await assert.rejects(analyzeStoreRecovery(file,options),/same-tick dispatched input/);
 const bad=[...rows,{type:'native_input',tick:4,at:1400,monotonicMs:1400,inputs:[packed(1,1,257)]}];writeFileSync(file,bad.map(row=>JSON.stringify(row)).join('\n'));await assert.rejects(analyzeStoreRecovery(file,options),/Old held human controls/);
 writeFileSync(file,[...rows,{type:'native_frame',at:1500,state:{tick:4}}].map(row=>JSON.stringify(row)).join('\n'));await assert.rejects(analyzeStoreRecovery(file,options),/original raw JSON line/);
});
