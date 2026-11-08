import test from 'node:test';
import assert from 'node:assert/strict';
import {InputDelivery,INPUT_DELIVERY_PENDING_LIMIT} from '../games/botstrike/client/input-delivery.mjs';
const one={version:2,nonce:'a'.repeat(32)},two={version:2,nonce:'b'.repeat(32)},protocol={version:2,maxAgeMs:400};
const context={room:'room',life:1,tick:10,lastSeq:0};
const ack=(seq,extra={})=>({version:1,seq,tick:11,life:1,neutral:true,...extra});
function setup(){const c=new InputDelivery();c.resetOwner();c.advertise(protocol);c.receive(one,context);return c;}
function receive(c,inputAck,lastSeq=inputAck?.seq,extra={}){return c.receive(two,{...context,tick:12,lastSeq,inputAck,...extra});}

test('receipt v2 requires its exact envelope; v1 and unknown protocols cannot downgrade',()=>{
 const c=new InputDelivery();assert.equal(c.advertise(protocol),'receipt');assert.equal(c.canSend(),false);
 for(const invalid of [{version:1,nonce:one.nonce},{...one,extra:1},{version:2,nonce:'bad'},null]){c.receive(invalid,context);assert.equal(c.canSend(),false);}
 c.receive(one,context);assert.equal(c.canSend(),true);assert.deepEqual(c.envelope(),{delivery:one});
 c.resetOwner();assert.equal(c.canSend(),false);assert.equal(c.recovering,true);
 for(const unsupported of [{version:1,maxAgeMs:400},{version:3,maxAgeMs:400},{version:2,maxAgeMs:401},null]){assert.equal(c.advertise(unsupported),'unsupported');assert.equal(c.canSend(),false);}
 c.transportReset();assert.equal(c.advertise(undefined),'legacy');assert.equal(c.canSend(),true);assert.equal(c.recovering,false);assert.deepEqual(c.envelope(),{});
});
test('AI last_seq, including exact collision, never proves recovery without a wire ACK',()=>{
 const c=setup();c.sent({seq:100});
 for(const lastSeq of [99,100,101,3961]){assert.equal(receive(c,undefined,lastSeq),false);assert.equal(c.recovering,true);assert.equal(c.ack,null);}
 assert.equal(receive(c,ack(100)),true);assert.equal(c.recovering,false);assert.deepEqual(c.ack,ack(100));
 assert.equal(receive(c,ack(100)),false,'repeat state is not another recovery');
});
test('recovery clears gameplay intent while preserving aim and persistent preview settings',()=>{
 const c=setup();const requested={seq:100,action_life:1,viewTick:88,yaw:.4,pitch:.2,x:1,y:1,fire:true,reload:true,crouch:true,jump:true,walk:true,ability:true,interact:true,scope:true,drop:true,item:2,practice:4,weapon:3,preview_item:2,throw_mode:1};
 const control=c.control(requested);assert.equal(requested.fire,true,'caller input is not mutated');
 for(const key of ['fire','reload','crouch','jump','walk','ability','interact','scope','drop'])assert.equal(control[key],false,key);
 for(const key of ['x','y','item','practice'])assert.equal(control[key],0,key);assert.equal(control.weapon,null);
 for(const key of ['seq','action_life','viewTick','yaw','pitch','preview_item','throw_mode'])assert.equal(control[key],requested[key],key);
 c.sent(control);assert.equal(receive(c,ack(100)),true);
});
test('coalesced first neutral does not block a later actually sent neutral ACK',()=>{
 const c=setup();c.sent({seq:100,preview_item:2,throw_mode:1});c.sent({seq:101,preview_item:2,throw_mode:1});
 assert.equal(receive(c,ack(102)),false,'unsent sequence cannot prove input');assert.equal(c.recovering,true);
 assert.equal(receive(c,ack(101)),true);assert.equal(c.ack.seq,101);
});
test('ACK requires exact Native sequence, frame time, life, shape and original neutral intent',()=>{
 const invalid=[null,ack(101),ack(100,{version:2}),ack(100,{extra:true}),ack(100,{tick:10}),ack(100,{tick:13}),ack(100,{tick:NaN}),ack(100,{life:2}),ack(100,{neutral:1})];
 for(const value of invalid){const c=setup();c.sent({seq:100});assert.equal(receive(c,value),false,JSON.stringify(value));assert.equal(c.recovering,true);assert.equal(c.ack,null);}
 const c=setup();c.sent({seq:100});assert.equal(receive(c,ack(100),101),false);assert.equal(c.recovering,true);
 for(const action of [{x:1},{y:-1},{fire:true},{walk:true},{crouch:true},{jump:true},{reload:true},{ability:true},{interact:true},{scope:true},{drop:true},{item:2},{practice:4},{weapon:0},{buy:1},{buy:0}]){
  const client=setup();client.sent({seq:100,...action});assert.equal(receive(client,ack(100)),false,JSON.stringify(action));assert.equal(client.recovering,true);
  assert.equal(receive(client,ack(100,{neutral:false})),false);assert.equal(client.ack.seq,100,'real active ACK is observable but never resumes');assert.equal(client.recovering,true);
 }
});
test('owner, transport, room, life and explicit resync revoke every old proof',()=>{
 for(const reset of [c=>c.resetOwner(),c=>c.transportReset(),c=>c.context('other',1),c=>c.context('room',2),c=>c.recover()]){
  const c=setup();c.sent({seq:100});reset(c);c.advertise(protocol);assert.equal(c.pending.size,0);assert.equal(c.ack,null);assert.equal(receive(c,ack(100)),false);assert.equal(c.ack,null);
 }
 const c=setup();c.sent({seq:100});c.receive(two,{...context,life:2,lastSeq:100,tick:12,inputAck:ack(100)});assert.equal(c.recovering,true);
 c.sent({seq:101});assert.equal(receive(c,ack(101,{life:2,tick:13}),101,{life:2,tick:14}),true);
});
test('proof retention is bounded and duplicate sends cannot advance the original send tick',()=>{
 const c=setup();for(let seq=1;seq<=INPUT_DELIVERY_PENDING_LIMIT+1;seq++)c.sent({seq});assert.equal(c.pending.size,INPUT_DELIVERY_PENDING_LIMIT);
 assert.equal(receive(c,ack(1)),false,'evicted input is not an ACK candidate');
 c.receive(two,{...context,tick:12});c.sent({seq:2,fire:true});assert.equal(c.pending.get(2).tick,10);assert.equal(receive(c,ack(2)),true,'duplicate sequence cannot mutate originally recorded intent');
 c.receive(two,{...context,tick:14});assert.equal(c.ack,null,'missing ACK in a later state never inherits prior proof');
});

test('a final packed latched action ACK is observable but cannot complete neutral recovery',()=>{
 const c=setup();c.sent({seq:100});assert.equal(receive(c,ack(100,{neutral:false})),false);assert.equal(c.recovering,true);assert.equal(c.ack.neutral,false);
});


test('completed room proof cannot bypass a new-room initial neutral barrier on the same socket',()=>{
 const c=setup();c.sent({seq:100});assert.equal(receive(c,ack(100)),true);assert.equal(c.recovering,false);
 c.context(null,null);c.receive(one,{room:'new-room',life:1,tick:0,lastSeq:0,inputAck:null});assert.equal(c.canSend(),true);assert.equal(c.recovering,true);assert.equal(c.ack,null);
 c.sent({seq:101});assert.equal(c.receive(two,{room:'new-room',life:1,tick:1,lastSeq:101,inputAck:ack(101,{tick:1})}),true);assert.equal(c.recovering,false);
 c.receive(two,{room:'new-room',life:2,tick:2,lastSeq:101,inputAck:null});assert.equal(c.recovering,false,'ordinary respawn does not force a new menu');assert.equal(c.ack,null);assert.equal(c.pending.size,0);
});
