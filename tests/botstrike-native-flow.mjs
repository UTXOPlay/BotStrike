// Isolated integration: identical native rules, accelerated wall clock only.
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {WebSocket} from 'ws';
import {createBotStrike,neutral} from '../botstrike-service/server.mjs';
const secret='botstrike-integration-private-token-2050',data=mkdtempSync(path.join(tmpdir(),'botstrike-flow-'));
const service=createBotStrike({secret,data,tickMs:0});await new Promise(r=>service.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+service.server.address().port;
const accounts=['a'.repeat(64),'b'.repeat(64)];const headers=id=>({'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':id});
async function request(id,body){const response=await fetch(base+'/api/'+(body?'action':'state'),{method:body?'POST':'GET',headers:headers(id),body:body?JSON.stringify(body):undefined});const value=await response.json();assert.equal(response.status,200,JSON.stringify(value));return value;}
const ws=[];
try{
 const unauthorized=await fetch(base+'/api/state');assert.equal(unauthorized.status,403);
 let a=await request(accounts[0],{type:'create',kind:'private',mode:'deathmatch',map:1,hero:2,difficulty:1});assert.equal(a.room.status,'waiting');const id=a.room.id;
 const b=await request(accounts[1],{type:'join',room:id,hero:4});assert.equal(b.room.slot,5,'balance human teams');assert.equal(b.room.config.heroes[5],4);
 const denied=await fetch(base+'/api/action',{method:'POST',headers:headers(accounts[1]),body:JSON.stringify({type:'start'})});assert.equal(denied.status,400);
 for(const account of accounts){const socket=new WebSocket(base.replace('http','ws')+'/api/socket',{headers:headers(account)});await new Promise((resolve,reject)=>{socket.on('open',resolve);socket.on('error',reject)});ws.push(socket)}
 await request(accounts[0],{type:'start'});
 await new Promise(r=>setTimeout(r,50));let state=(await request(accounts[0])).room.state;assert.equal(state.players.length,10);
 ws[0].send(JSON.stringify({type:'input',room:id,input:{...neutral(),seq:100,x:1,fire:true,viewTick:Math.max(0,state.tick-6)}}));await new Promise(r=>setTimeout(r,50));state=(await request(accounts[0])).room.state;assert.equal(state.players[0].last_seq,100,'native accepts authenticated human input');
 ws[0].send(JSON.stringify({type:'input',room:id,input:{...neutral(),seq:101,ability:true}}));
 ws[0].send(JSON.stringify({type:'input',room:id,input:{...neutral(),seq:102}}));await new Promise(r=>setTimeout(r,80));state=(await request(accounts[0])).room.state;assert.ok(state.players[0].skill_wait>0,'a short press between ticks is retained');
 await new Promise(r=>setTimeout(r,450));state=(await request(accounts[0])).room.state;assert.equal(state.players[0].last_seq,102,'network input silence must not hand a connected player to AI');
 ws.forEach(s=>s.close());
 const deadline=Date.now()+180000;let end;
 do{await new Promise(r=>setTimeout(r,500));end=(await request(accounts[0])).room;if(end.status==='failed')throw Error(end.error);if(Date.now()>deadline)throw Error('Complete native room did not seal in time');}while(end.status!=='finished');
 assert.equal(end.proof.verified,true);assert.ok(end.state.players.some(p=>p.deaths>1),'respawns occur in the complete match');
 const exported=await fetch(base+'/api/export',{headers:headers(accounts[0])});assert.equal(exported.status,200);const exp=await exported.json();const exportPath=path.join(data,'export.json');writeFileSync(exportPath,JSON.stringify(exp));
 const verify=JSON.parse(execFileSync('release/myelin-botstrike',['verify',exportPath],{env:{...process.env,BOTSTRIKE_ASSETS:path.resolve('release')},timeout:180000,maxBuffer:200e6}));assert.equal(verify.verified,true);
 const actionPath=path.join(data,'rooms',id,'match.json'),action=JSON.parse(readFileSync(actionPath));action.result.score[0]+=1;const tampered=path.join(data,'tampered.json');writeFileSync(tampered,JSON.stringify(action));assert.throws(()=>execFileSync('release/myelin-botstrike',['record',path.join(data,'tamper-session'),tampered],{env:{...process.env,BOTSTRIKE_ASSETS:path.resolve('release')},timeout:180000,stdio:'pipe'}),'tampered result must be rejected');
 const publicA=(await request(accounts[0],{type:'queue',mode:'deathmatch',map:2,hero:0,difficulty:1})).room;
 const publicB=(await request(accounts[1],{type:'queue',mode:'deathmatch',map:2,hero:5,difficulty:1})).room;
 assert.equal(publicA.status,'waiting','public queue allows time for humans');assert.ok(publicA.queueDeadline>Date.now());
 assert.equal(publicA.id,publicB.id,'public matchmaking joins the existing compatible room');
 assert.equal(publicB.slot,5);
 const reconnect=new WebSocket(base.replace('http','ws')+'/api/socket',{headers:headers(accounts[1])});ws.push(reconnect);
 await new Promise((resolve,reject)=>{reconnect.on('open',resolve);reconnect.on('error',reject)});
 await new Promise(r=>setTimeout(r,25));
 assert.equal((await request(accounts[1])).room.slot,5,'reconnected pilot keeps their balanced slot');
 reconnect.close();
 console.log(JSON.stringify({data,ticks:end.state.tick,score:end.state.score,players:10,privateJoin:true,publicMatchmaking:true,reconnect:true,balancedTeams:true,humanInput:true,respawns:true,signedReplay:true,tamperRejected:true},null,2));
}finally{ws.forEach(s=>s.terminate());await service.close();}
