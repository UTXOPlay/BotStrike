// Real service/native engine/signed host replay; no browser-submitted score.
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {WebSocket} from 'ws';
import {trackSocketDelivery} from './ws-delivery-client.mjs';
import {createBotStrike,neutral} from '../botstrike-service/server.mjs';
const secret='botstrike-practice-integration-token-2050',account='a'.repeat(64),data=mkdtempSync(path.join(tmpdir(),'botstrike-practice-flow-'));
const service=createBotStrike({secret,data,tickMs:2});await new Promise(r=>service.server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+service.server.address().port,headers=id=>({'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':id});
async function request(body,id=account,expected=200){const response=await fetch(base+'/api/'+(body?'action':'state'),{method:body?'POST':'GET',headers:headers(id),body:body?JSON.stringify(body):undefined});const value=await response.json();assert.equal(response.status,expected,JSON.stringify(value));return value.room;}
async function until(predicate,limit=15000){const deadline=Date.now()+limit;while(Date.now()<deadline){const room=await request();if(room?.status==='failed')throw Error(room.error);if(predicate(room))return room;await new Promise(r=>setTimeout(r,20));}throw Error('Timed out waiting for native training state');}
let socket,deliveryClient,token,seq=0;const errors=[];
try{
 let room=await request({type:'create',kind:'private',map:0,mode:'deathmatch',hero:0,difficulty:0});
 socket=new WebSocket(base.replace('http','ws')+'/api/socket',{headers:headers(account)});deliveryClient=trackSocketDelivery(socket);
 const controlled=new Promise(resolve=>socket.on('message',raw=>{const value=JSON.parse(raw);if(value.type==='control'&&value.active){token=value.token;resolve();}if(value.type==='error')errors.push(value.error);}));
 await new Promise((resolve,reject)=>{socket.once('open',resolve);socket.once('error',reject)});await controlled;
 await request({type:'start',controlToken:token});await until(r=>r.state);await deliveryClient.ready(room.id);
 socket.send(JSON.stringify(deliveryClient.envelope(room.id,{...neutral(),seq:++seq,practice:1})));
 const deadline=Date.now()+3000;while(!errors.length&&Date.now()<deadline)await new Promise(r=>setTimeout(r,10));
 assert.match(errors.shift(),/solo range/);assert.equal((await request()).status,'running');
 await request({type:'leave',controlToken:token});
 room=await request({type:'create',kind:'practice',map:0,mode:'deathmatch',hero:0,difficulty:0,drill:0,targetHero:2,armor:1});
 assert.equal(room.config.mode,'practice');assert.equal(room.config.map,3);
 await request({type:'join',room:room.id,hero:1},'b'.repeat(64),400);
 room=await until(r=>r.state?.practice);const attempt=room.state.practice.attempt;await deliveryClient.ready(room.id,{life:room.state.players[0].life});
 const send=input=>socket.send(JSON.stringify(deliveryClient.envelope(room.id,{...neutral(),seq:++seq,...input})));
 send({fire:true,weapon:2,score:999999,position:[100,100,100]});
 room=await until(r=>r.state?.practice?.shots>=4);assert.ok(room.state.practice.damage>0);assert.ok(room.state.practice.impacts.length>0);
 send({practice:1,fire:true,x:1});send({});
 room=await until(r=>r.state?.practice?.attempt===attempt+1);
 assert.equal(room.state.practice.shots,0);assert.equal(room.state.practice.damage,0);assert.equal(room.state.practice.seed,undefined);assert.equal(room.state.practice.last_command,undefined);
 await deliveryClient.ready(room.id,{life:room.state.players[0].life});
 assert.ok(room.state.players[1].hidden);assert.equal(room.state.players[1].position,null);
 // Fast utility press and release must survive between service ticks.
 send({item:3,pitch:.4});send({pitch:.4});room=await until(r=>r.state?.practice?.last_throw);
 assert.equal(room.state.practice.last_throw.kind,3);assert.ok(room.state.practice.preview.length<=65);
 send({practice:7});send({});
 await new Promise(r=>setTimeout(r,60));room=await request();assert.equal(room.state.practice.attempt,attempt+1);
 send({practice:2});send({});room=await until(r=>r.status==='finished',180000);
 assert.equal(room.proof.verified,true);assert.equal(room.state.winner,null);assert.equal(room.state.config.mode,'practice');
 const exp=await(await fetch(base+'/api/export',{headers:headers(account)})).json(),file=path.join(data,'export.json');writeFileSync(file,JSON.stringify(exp));
 const verify=JSON.parse(execFileSync('release/myelin-botstrike',['verify',file],{env:{...process.env,BOTSTRIKE_ASSETS:path.resolve('release')},timeout:180000,maxBuffer:200e6}));assert.equal(verify.verified,true);
 const action=JSON.parse(readFileSync(path.join(data,'rooms',room.id,'match.json')));action.result.score[0]+=1;const tamper=path.join(data,'tamper.json');writeFileSync(tamper,JSON.stringify(action));
 assert.throws(()=>execFileSync('release/myelin-botstrike',['record',path.join(data,'tamper-session'),tamper],{env:{...process.env,BOTSTRIKE_ASSETS:path.resolve('release')},timeout:180000,stdio:'pipe'}));
 const career=await(await fetch(base+'/api/career',{headers:headers(account)})).json();assert.equal(career.matches,0);assert.equal(career.damage,0);
 console.log(JSON.stringify({data,room:room.id,ticks:room.state.tick,attempt:room.state.practice.attempt,practiceVerified:true,profile:room.proof.profile,publicCommandRejected:true,joinsRejected:true,heldResetCleared:true,shortUtilityRetained:true,tamperRejected:true,careerMatches:career.matches},null,2));
}finally{socket?.terminate();await service.close();}
