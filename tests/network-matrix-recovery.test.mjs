import test from 'node:test';
import assert from 'node:assert/strict';
import {readMatrixRecoveryProof} from '../tools/network-matrix-recovery.mjs';
import {installLocalRecoveryPageCapture} from '../tools/local-recovery-fence.mjs';
import {NetworkBrowserActor,NETWORK_GAME_ORIGIN} from '../tools/network-browser-actors.mjs';

// Run the real page send stamp, exact-byte join and actor WS callbacks without
// starting a browser, process, server or transport fault.
function fixture(){
 let time=10;const attrs=new Map([['data-control-recovery-epoch','0'],['data-control-paused','1']]);
 class Socket{
  constructor(url){this.url=url;this.listeners=new Map();}
  addEventListener(kind,fn){this.listeners.set(kind,[...(this.listeners.get(kind)||[]),fn]);}
  removeEventListener(kind,fn){this.listeners.set(kind,(this.listeners.get(kind)||[]).filter(value=>value!==fn));}
  send(){}
  receive(value){for(const fn of this.listeners.get('message')||[])fn({data:JSON.stringify(value)});}
 }
 const env={WebSocket:Socket,URL,TextEncoder,crypto:{randomUUID:()=> 'private-test-page'},performance:{now:()=>time},document:{documentElement:{getAttribute:key=>attrs.get(key)??null}}};
 const capture=installLocalRecoveryPageCapture(env,{wireJoin:true}),socket=new env.WebSocket(NETWORK_GAME_ORIGIN.replace(/^http/,'ws')+'/games/botstrike/api/socket'),handlers=new Map();
 const actor=new NetworkBrowserActor('A',null,null,{setDefaultTimeout(){},on(){}},{closed:false,append(){return true;}},{localRecoveryFence:true});
 actor.watchSocket({url:()=>socket.url,on:(kind,fn)=>handlers.set(kind,fn)});
 actor.drain=async()=>{actor.localFence.ingest(capture.read());};
 const cdpState=value=>handlers.get('framereceived')({payload:JSON.stringify(value)});
 const deliver=(value,{deferCdp=false}={})=>{socket.receive(value);if(!deferCdp)cdpState(value);return value;};
 const state=(seq=0,ack=null,tick=10,options)=>deliver({type:'state',room:{id:'room',status:'running',slot:0,state:{tick,players:[{slot:0,position:[0,0,0],velocity:[0,0,0],life:1,last_seq:seq,alive:true}]}},delivery:{version:2,nonce:'SECRET_NONCE'},inputAck:ack},options);
 deliver({type:'control',active:true,token:'SECRET_TOKEN',inputProtocol:{version:2,maxAgeMs:400}});state();
 const send=(seq,{deferCdp=false,...extra}={})=>{const raw=JSON.stringify({type:'input',room:'room',input:{seq,x:0,y:0,...extra},delivery:{version:2,nonce:'SECRET_NONCE'}});socket.send(raw);if(!deferCdp)handlers.get('framesent')({payload:raw});return raw;};
 const applied=(seq=1,tick=11,options)=>state(seq,{version:1,seq,tick,life:1,neutral:true},tick,options);
 const ready=()=>{time=20;send(1);time=21;applied();};
 return{actor,attrs,ready,send,applied,state,cdpState,time:value=>{time=value;},cdp:raw=>handlers.get('framesent')({payload:raw})};
}

test('fresh paused original send joins current public exact ACK without exposing wire secrets',async()=>{
 const f=fixture();f.ready();const proof=await readMatrixRecoveryProof(f.actor,{afterPageSentAt:15});
 assert.equal(proof.ack.seq,1);assert.equal(proof.ack.tick,11);assert.equal(proof.local.input.pageSentAt,20);assert.equal(proof.local.current.localPaused,true);assert.equal(proof.sent.socketGeneration,proof.local.input.cdpSocketGeneration);
 assert.equal(JSON.stringify(proof).includes('SECRET_'),false);
});

test('a local latch invalidates the old neutral with every wire generation unchanged',async()=>{
 const f=fixture();f.ready();assert.ok(await readMatrixRecoveryProof(f.actor,{afterPageSentAt:15}));
 const before=[f.actor.socketGeneration,f.actor.ownerGeneration,f.actor.proofGeneration,f.actor.roomGeneration];
 f.attrs.set('data-control-recovery-epoch','2');f.time(30);
 assert.equal(await readMatrixRecoveryProof(f.actor,{afterPageSentAt:15,minimumLocalEpoch:2}),null);
 assert.deepEqual([f.actor.socketGeneration,f.actor.ownerGeneration,f.actor.proofGeneration,f.actor.roomGeneration],before);
 f.time(40);f.send(2);f.time(41);f.applied(2,12);
 const proof=await readMatrixRecoveryProof(f.actor,{afterPageSentAt:30,minimumLocalEpoch:2});assert.equal(proof.ack.seq,2);assert.equal(proof.local.input.localRecoveryEpoch,2);
});

test('late CDP observation cannot turn a pre-restore page send into post-restore evidence',async()=>{
 const f=fixture();f.time(20);const raw=f.send(1,{deferCdp:true});f.time(21);const state=f.applied(1,11,{deferCdp:true});f.time(40);f.cdp(raw);f.cdpState(state);
 assert.ok(f.actor.events('input')[0].nodeUnixMs>30,'CDP wall clock is not the original page clock');
 assert.equal(await readMatrixRecoveryProof(f.actor,{afterPageSentAt:30}),null);
 assert.ok(await readMatrixRecoveryProof(f.actor,{afterPageSentAt:15}),'The same original send remains valid only before the restore barrier');
});

test('a quantized timestamp equal to restoration cannot establish a later original send',async()=>{
 const f=fixture();f.ready();assert.equal(await readMatrixRecoveryProof(f.actor,{afterPageSentAt:20}),null);
 assert.ok(await readMatrixRecoveryProof(f.actor,{afterPageSentAt:19.999}));
});

test('public wire ACK mismatch, current resumed state and unavailable observers fail closed',async()=>{
 const mismatch=fixture();mismatch.ready();mismatch.actor.recent.get('snapshot').at(-1).data.inputAck.tick=12;
 assert.equal(await readMatrixRecoveryProof(mismatch.actor,{afterPageSentAt:15}),null);
 const resumed=fixture();resumed.ready();resumed.attrs.set('data-control-paused','0');resumed.time(30);
 assert.equal(await readMatrixRecoveryProof(resumed.actor,{afterPageSentAt:15}),null);
 const missing=fixture();missing.ready();missing.actor.localFenceEnabled=false;
 assert.equal(await readMatrixRecoveryProof(missing.actor,{afterPageSentAt:15}),null);
 const overflow=fixture();overflow.ready();overflow.actor.localFence.invalid='local_history_overflow';
 assert.equal(await readMatrixRecoveryProof(overflow.actor,{afterPageSentAt:15}),null);
});

test('each call refreshes local evidence and cannot reuse a proof across another latch',async()=>{
 const f=fixture();f.ready();const proof=await readMatrixRecoveryProof(f.actor,{afterPageSentAt:15});assert.ok(proof);
 f.attrs.set('data-control-recovery-epoch','1');f.time(30);
 assert.equal(await readMatrixRecoveryProof(f.actor,{afterPageSentAt:15}),null);
 assert.equal(proof.local.current.localRecoveryEpoch,0,'The old result is detached history, never relabelled current');
});

test('context movement during the fresh read, expired original send and invalid barriers reject evidence',async()=>{
 const changed=fixture();changed.ready();const read=changed.actor.currentLocalNeutral.bind(changed.actor);changed.actor.currentLocalNeutral=async options=>{const proof=await read(options);changed.actor.proofGeneration++;return proof;};
 assert.equal(await readMatrixRecoveryProof(changed.actor,{afterPageSentAt:15}),null);
 const aged=fixture();aged.ready();aged.time(1020);assert.equal(await readMatrixRecoveryProof(aged.actor,{afterPageSentAt:15}),null);
 for(const options of [{},{afterPageSentAt:NaN},{afterPageSentAt:-1},{afterPageSentAt:15,minimumLocalEpoch:-1}])assert.equal(await readMatrixRecoveryProof(aged.actor,options),null);
});
