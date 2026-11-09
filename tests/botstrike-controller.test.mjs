import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {mkdtemp,rm} from 'node:fs/promises';
import {WebSocket} from 'ws';
import {trackSocketDelivery} from './ws-delivery-client.mjs';
import {createBotStrike,neutral} from '../botstrike-service/server.mjs';

for(const closeController of [false,true])for(const nextAction of ['start','leave']){
 test(`a waiting lobby can be claimed and ${nextAction==='start'?'started':'left'} ${closeController?'after its controller closes':'while its controller remains open'}`,async()=>{
  const data=await mkdtemp(path.join(tmpdir(),'botstrike-lobby-control-')),secret='lobby-control-test-'.repeat(3),account='a'.repeat(64);
  const service=createBotStrike({secret,data}),sockets=[];
  await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+service.server.address().port;
  const headers={'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':account};
  const action=async body=>{const response=await fetch(base+'/api/action',{method:'POST',headers,body:JSON.stringify(body)});return{status:response.status,body:await response.json()};};
  const until=async predicate=>{const deadline=Date.now()+5000;while(!predicate()){if(Date.now()>deadline)throw Error('Lobby control did not arrive');await new Promise(resolve=>setTimeout(resolve,10));}};
  const connect=async()=>{const ws=new WebSocket(base.replace('http','ws')+'/api/socket',{headers}),messages=[],delivery=trackSocketDelivery(ws);sockets.push(ws);ws.on('message',raw=>messages.push(JSON.parse(raw)));await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject)});return{ws,messages,delivery};};
  const control=(peer,active)=>peer.messages.findLast(message=>message.type==='control'&&message.active===active);
  try{
   const created=await action({type:'create',kind:'private',mode:'deathmatch',map:0,hero:0,difficulty:0});
   assert.equal(created.status,200);const room=service.rooms.get(created.body.room.id);
   const first=await connect(),second=await connect();
   await until(()=>control(first,true)&&control(second,false));
   const previousToken=control(first,true).token;
   second.ws.send(JSON.stringify({type:'claim',room:'0'.repeat(24)}));
   await until(()=>second.messages.some(message=>message.type==='error'));
   assert.equal((await action({type:'hero',hero:1,controlToken:previousToken})).status,200,'an invalid room cannot revoke lobby control');
   if(closeController){first.ws.close();await new Promise(resolve=>first.ws.once('close',resolve));}
   second.ws.send(JSON.stringify({type:'claim',room:room.id}));
   await until(()=>control(second,true));
   if(!closeController)await until(()=>control(first,false));
   const token=control(second,true).token;
   assert.notEqual(token,previousToken);assert.equal(control(second,true).nextSeq,0);
   assert.equal(room.status,'waiting','claiming a lobby never starts simulation');
   assert.equal((await action({type:'hero',hero:2,controlToken:previousToken})).status,400,'the old controller token is invalid');
   assert.equal((await action({type:'hero',hero:3,controlToken:token})).status,200);
   assert.equal(room.config.heroes[0],3);
   assert.equal((await action({type:nextAction,controlToken:previousToken})).status,400);
   const result=await action({type:nextAction,controlToken:token});assert.equal(result.status,200);
   if(nextAction==='start'){await until(()=>room.state?.tick>0);assert.equal(room.status,'running');}
   else{assert.equal(result.body.room,null);assert.equal(room.status,'cancelled');}
  }finally{for(const ws of sockets)ws.terminate();await service.close();await rm(data,{recursive:true,force:true});}
 });
}

test('only the claimed tab controls a seat and takeover releases held input',async()=>{
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-controller-')),secret='controller-test-'.repeat(3),account='a'.repeat(64);
 const service=createBotStrike({secret,data}),sockets=[];
 await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+service.server.address().port;
 const headers={'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':account};
 const action=async body=>{const response=await fetch(base+'/api/action',{method:'POST',headers,body:JSON.stringify(body)});return{status:response.status,body:await response.json()};};
 const until=async predicate=>{const deadline=Date.now()+5000;while(!predicate()){if(Date.now()>deadline)throw Error('Controller state did not arrive');await new Promise(resolve=>setTimeout(resolve,10));}};
 const connect=async()=>{const ws=new WebSocket(base.replace('http','ws')+'/api/socket',{headers}),messages=[],delivery=trackSocketDelivery(ws);ws.on('message',raw=>messages.push(JSON.parse(raw)));await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject)});sockets.push(ws);return{ws,messages,delivery};};
 const control=(peer,active)=>peer.messages.findLast(message=>message.type==='control'&&message.active===active);
 const packet=(peer,seq,extra={})=>JSON.stringify({...peer.delivery.envelope(room.id,{...neutral(),seq,...extra})});
 let room;
 try{
  const created=await fetch(base+'/api/action',{method:'POST',headers,body:JSON.stringify({type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:0})});
  assert.equal(created.status,200);room=(await created.json()).room;
  await until(()=>service.rooms.get(room.id).state?.tick>0);
  const first=await connect(),second=await connect(),live=service.rooms.get(room.id);
  await until(()=>control(first,true)&&control(second,false));
  const passiveHero=await action({type:'hero',hero:2});
  assert.equal(passiveHero.status,400,'a passive tab cannot change the active pilot');
  assert.equal(live.selected[0],0);
  const firstToken=control(first,true).token;
  assert.match(firstToken,/^[a-f0-9]{32}$/);
  assert.equal((await action({type:'hero',hero:2,controlToken:firstToken})).status,200);
  assert.equal(live.selected[0],2);
  await first.delivery.ready(room.id);
  first.ws.send(packet(first,1,{fire:true}));await until(()=>live.inputs[0].seq===1);
  second.ws.send(JSON.stringify({type:'input',room:room.id,input:{...neutral(),seq:100,x:-1},delivery:first.delivery.get(room.id)}));await new Promise(resolve=>setTimeout(resolve,60));
  assert.equal(live.inputs[0].seq,1,'passive tab cannot submit input with a higher sequence');
  second.ws.send(JSON.stringify({type:'claim',room:'0'.repeat(24)}));
  await until(()=>second.messages.some(message=>message.type==='error'&&message.error==='No active seat to control'));
  assert.equal(live.inputs[0].fire,true,'an invalid claim cannot release the active tab');
  const http=await fetch(base+'/api/action',{method:'POST',headers,body:JSON.stringify({type:'input',room:room.id,input:{...neutral(),seq:101}})});
  assert.equal(http.status,400,'HTTP actions cannot bypass socket control');
  const firstReceipt=first.delivery.get(room.id);second.ws.send(JSON.stringify({type:'claim',room:room.id}));
  await until(()=>control(first,false)&&control(second,true));
  assert.equal(control(second,true).nextSeq,1);
  const secondToken=control(second,true).token;
  assert.notEqual(secondToken,firstToken);
  assert.equal((await action({type:'hero',hero:3,controlToken:firstToken})).status,400,'takeover invalidates the previous token');
  assert.equal((await action({type:'hero',hero:4,controlToken:secondToken})).status,200);
  assert.equal(live.selected[0],4);
  assert.equal(live.inputs[0].fire,false,'takeover releases a held trigger');
  assert.deepEqual(live.pulses[0],{},'takeover clears pending trigger pulses');
  await second.delivery.ready(room.id);
  first.ws.send(JSON.stringify({type:'input',room:room.id,input:{...neutral(),seq:1000,fire:true},delivery:firstReceipt}));second.ws.send(packet(second,2,{x:-1,fire:true}));
  await until(()=>live.inputs[0].seq===2);assert.equal(live.inputs[0].x,-1);
  second.ws.close();await new Promise(resolve=>second.ws.once('close',resolve));
  await until(()=>live.inputs[0].fire===false);
  assert.equal(live.inputs[0].fire,false,'closing the controller releases a held trigger');
  first.ws.send(JSON.stringify({type:'input',room:room.id,input:{...neutral(),seq:1001,x:1},delivery:firstReceipt}));await new Promise(resolve=>setTimeout(resolve,60));
  assert.equal(live.inputs[0].seq,2,'a remaining passive tab does not take control silently');
  first.ws.send(JSON.stringify({type:'claim',room:room.id}));await until(()=>first.messages.filter(message=>message.type==='control'&&message.active).length===2);
  assert.equal(control(first,true).nextSeq,2);
  assert.notEqual(control(first,true).token,firstToken);
  await first.delivery.ready(room.id);first.ws.send(packet(first,3,{x:1,weapon:1}));await until(()=>live.state?.players[0].last_seq===3);
  assert.equal(live.inputs[0].weapon,undefined,'weapon selection is not retained as a held control');
  first.ws.send(packet(first,4,{x:1,weapon:1}));await until(()=>live.inputs[0].seq===4);
  assert.equal(live.pulses[0].weapon,undefined,'repeated snapshots do not queue another switch');
  const observer=await connect();await until(()=>control(observer,false));
  assert.equal((await action({type:'leave'})).status,400,'a passive tab cannot leave the live room');
  assert.equal(live.status,'running');
  assert.equal((await action({type:'leave',controlToken:control(first,true).token})).status,200);
  await until(()=>observer.messages.some(message=>message.type==='state'&&message.room===null));
  assert.equal(live.status,'cancelled');
  assert.equal(service.metrics.reconnections,0,'tab handoffs are not network reconnects');
 }finally{for(const ws of sockets)ws.terminate();await service.close();await rm(data,{recursive:true,force:true});}
});
