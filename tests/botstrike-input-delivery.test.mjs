import test from 'node:test';
import assert from 'node:assert/strict';
import {InputDelivery} from '../games/botstrike/client/input-delivery.mjs';
const one={version:1,nonce:'a'.repeat(32)},two={version:1,nonce:'b'.repeat(32)},protocol={version:1,maxAgeMs:400};
test('an advertised receipt server cannot be silently treated as legacy or send before state receipt',()=>{
 const c=new InputDelivery();assert.equal(c.advertise(protocol),'receipt');assert.equal(c.canSend(),false);
 c.receive({version:2,nonce:one.nonce},{room:'room',life:1});assert.equal(c.canSend(),false);
 c.receive({...one,extra:1},{room:'room',life:1});assert.equal(c.canSend(),false);
 c.receive(one,{room:'room',life:1});assert.equal(c.canSend(),true);assert.deepEqual(c.envelope(),{delivery:one});
 c.resetOwner();assert.equal(c.canSend(),false);c.advertise({version:2,maxAgeMs:400});assert.equal(c.canSend(),false);
});
test('outage recovery sends only neutral controls and waits for a same-context Native ACK before Resume',()=>{
 const c=new InputDelivery();c.advertise(protocol);c.receive(one,{room:'room',life:1});c.recover();assert.equal(c.canSend(),false);
 c.receive(two,{room:'room',life:1,lastSeq:99});assert.equal(c.recovering,true);
 const requested={seq:100,action_life:1,viewTick:88,yaw:.4,pitch:.2,x:1,y:1,fire:true,reload:true,crouch:true,jump:true,walk:true,ability:true,interact:true,scope:true,drop:true,item:2,practice:4,weapon:3};
 const control=c.control(requested);assert.equal(requested.fire,true,'caller input is not mutated');
 for(const key of ['fire','reload','crouch','jump','walk','ability','interact','scope','drop'])assert.equal(control[key],false,key);
 for(const key of ['x','y','item','practice'])assert.equal(control[key],0,key);assert.equal(control.weapon,null);
 assert.equal(control.action_life,1);assert.equal(control.seq,100);assert.equal(control.viewTick,88);c.sent(control);
 c.receive(two,{room:'room',life:1,lastSeq:99});assert.equal(c.recovering,true);
 assert.equal(c.receive(two,{room:'room',life:1,lastSeq:101}),true);assert.equal(c.recovering,false);
});
test('life and control changes revoke receipts and old recovery ACKs while legacy fallback stays explicit',()=>{
 const c=new InputDelivery();c.advertise(protocol);c.receive(one,{room:'room',life:1});c.recover();c.receive(two,{room:'room',life:1});c.sent({seq:100});
 c.receive(two,{room:'room',life:2,lastSeq:100});assert.equal(c.recovering,true);assert.equal(c.neutralSeq,null,'an old-life ACK cannot complete new-life recovery');
 c.sent({seq:101});c.receive(two,{room:'room',life:2,lastSeq:101});assert.equal(c.recovering,false);
 c.context('other-room',1);assert.equal(c.canSend(),false);c.transportReset();assert.equal(c.advertise(undefined),'legacy');assert.equal(c.canSend(),true);assert.deepEqual(c.envelope(),{});
});
