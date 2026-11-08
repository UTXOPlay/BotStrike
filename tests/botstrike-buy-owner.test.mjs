import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {mkdtemp,rm} from 'node:fs/promises';
import {createBotStrike} from '../botstrike-service/server.mjs';
import {WebSocket} from 'ws';
import {trackSocketDelivery} from './ws-delivery-client.mjs';

test('buy time reserves a human seat until its pilot connects',async()=>{
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-buy-owner-')),secret='buy-owner-test-'.repeat(3);
 const service=createBotStrike({secret,data});
 await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+service.server.address().port;
 const headers={'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':'a'.repeat(64)};
 const action=async(body,expectedStatus=200)=>{const response=await fetch(base+'/api/action',{method:'POST',headers,body:JSON.stringify(body)});assert.equal(response.status,expectedStatus);return response.json();};
 const until=async predicate=>{const end=Date.now()+5000;while(!predicate()){if(Date.now()>end)throw Error('Native buy phase did not advance');await new Promise(resolve=>setTimeout(resolve,20));}};
 let ws;try{
  const created=await action({type:'create',kind:'practice',mode:'demolition',map:0,hero:0,difficulty:0});
  const room=service.rooms.get(created.room.id),state=()=>room.state;
  await until(()=>state()?.tick>=8);
  assert.equal(state().phase,'buy');
  assert.equal(state().players[0].credits,800);
  assert.equal(state().players[0].items.reduce((total,count)=>total+count,0),0);
  assert.equal(room.controlled[0],null,'neutral buy frames are not human play');
  await action({type:'buy',item:12},400);assert.equal(state().players[0].credits,800,'an unconnected HTTP caller has no state receipt and cannot spend the reserved budget');
  ws=new WebSocket(base.replace('http','ws')+'/api/socket',{headers});const messages=[],delivery=trackSocketDelivery(ws);ws.on('message',raw=>messages.push(JSON.parse(raw)));await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject);});await until(()=>messages.some(message=>message.type==='control'&&message.active));await delivery.ready(room.id);
  const control=messages.findLast(message=>message.type==='control'&&message.active);await action({type:'buy',item:12,life:state().players[0].life,controlToken:control.token,delivery:delivery.get(room.id)});
  await until(()=>state().players[0].armor===100);
  assert.equal(state().players[0].credits,150);
 }finally{ws?.terminate();await service.close();await rm(data,{recursive:true,force:true});}
});
