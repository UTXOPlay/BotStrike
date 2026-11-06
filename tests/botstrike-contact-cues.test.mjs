import test from 'node:test';import assert from 'node:assert/strict';import {ContactCues} from '../games/botstrike/client/contact-cues.mjs';
test('anonymous contacts follow the render timeline and expire across gaps, mute and listener changes',()=>{
 const queue=new ContactCues(),event={id:'a',kind:'step',tick:12,value:2,bearing:0,level:.6};queue.scope('room:0:1');queue.push(event,100);
 assert.deepEqual(queue.drain(14,11,130),[]);assert.deepEqual(queue.drain(14,12,140),[event]);assert.deepEqual(queue.drain(14,13,150),[]);
 queue.push(event,200);assert.deepEqual(queue.drain(22,22,220),[]);queue.push(event,200);assert.deepEqual(queue.drain(12,12,701),[]);
 queue.push(event,200);queue.scope('room:0:2');assert.deepEqual(queue.drain(12,12,220),[]);
 queue.push(event,200);assert.deepEqual(queue.drain(12,12,220,false),[]);assert.equal(queue.queue.length,0);
 for(let i=0;i<100;i++)queue.push({...event,id:String(i)},200);assert.equal(queue.queue.length,48);
});
