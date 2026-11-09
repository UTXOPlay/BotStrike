// Ten automated authenticated clients exercise the protocol. This is not a
// ten-human playtest, device usability study, or evidence of balance.
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run=promisify(execFile);
import {WebSocket} from 'ws';
import {trackSocketDelivery} from './ws-delivery-client.mjs';
import {createBotStrike,neutral} from '../botstrike-service/server.mjs';
const secret='botstrike-tactical-protocol-test-private-token',data=mkdtempSync(path.join(tmpdir(),'botstrike-tactical-flow-'));
const service=createBotStrike({secret,data,tickMs:0,maxRooms:2});await new Promise(r=>service.server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+service.server.address().port,accounts=Array.from({length:11},(_,i)=>(i+1).toString(16).padStart(64,'0'));
const headers=i=>({'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':accounts[i]});
const sockets=[],tokens=[],deliveries=[],errors=[];let room;
async function request(i,body,expected=200){const res=await fetch(base+'/api/'+(body?'action':'state'),{method:body?'POST':'GET',headers:headers(i),body:body?JSON.stringify({...body,...(tokens[i]?{controlToken:tokens[i]}:{}),...(body.type==='buy'?{delivery:await deliveries[i].ready(room.id)}:{})}):undefined});const out=await res.json();assert.equal(res.status,expected,JSON.stringify(out));return out.room;}
async function until(predicate,limit=20000){const deadline=Date.now()+limit;while(Date.now()<deadline){const r=await request(0);if(r?.status==='failed')throw Error(r.error);if(predicate(r))return r;await new Promise(r=>setTimeout(r,15));}throw Error('Tactical protocol condition timeout');}
async function connect(i){const ws=new WebSocket(base.replace('http','ws')+'/api/socket',{headers:headers(i)});sockets[i]=ws;deliveries[i]=trackSocketDelivery(ws);const controlled=new Promise(resolve=>ws.on('message',raw=>{const m=JSON.parse(raw);if(m.type==='control'&&m.active){tokens[i]=m.token;resolve();}if(m.type==='error')errors.push(m.error);}));await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject)});await controlled;}
try{
 await request(0,{type:'create',kind:'public',mode:'demolition',ruleset:'tactical',map:0,hero:0,difficulty:0},400);
 room=await request(0,{type:'create',kind:'private',mode:'demolition',ruleset:'tactical',map:0,hero:0,difficulty:0});await connect(0);
 await request(0,{type:'start'},400);assert.equal((await request(0)).status,'waiting','an unmet ready gate must not fail the room');
 for(let i=1;i<10;i++){await request(i,{type:'join',room:room.id,hero:Math.floor(i/2)});await connect(i);}
 await request(2,{type:'hero',hero:0},400);assert.equal((await request(0)).status,'waiting');
 for(let i=0;i<10;i++)await request(i,{type:'ready',ready:true});
 await request(4,{type:'hero',hero:5});assert.ok((await request(0)).roster.every(p=>!p.ready),'selection invalidates squad readiness');
 for(let i=0;i<10;i++)await request(i,{type:'ready',ready:true});
 room=await request(0,{type:'start'});room=await until(r=>r.state?.phase==='buy');
 const id=room.id,life=room.state.players[0].life,firstLife=life;await deliveries[0].ready(id,{life});assert.equal(room.config.ruleset,'tactical');
 assert.ok(room.roster.every(p=>!p.bot));assert.ok(service.rooms.get(id).config.bots.every(b=>!b));
 assert.equal(room.state.players[0].armor,0);assert.equal(room.state.players[1].credits,800);assert.equal(room.state.players[5].credits,undefined,'enemy funds remain private');assert.equal(room.state.players[5].owned,undefined);
 await request(0,{type:'hero',hero:1},400);await request(10,{type:'join',room:id,hero:5},400);await request(0,{type:'buy',item:2,life:0},400);
 sockets[0].send(JSON.stringify(deliveries[0].envelope(id,{...neutral(),seq:1,action_life:life,drop:true})));
 sockets[0].send(JSON.stringify(deliveries[0].envelope(id,{...neutral(),seq:2,action_life:life})));
 room=await until(r=>r.state?.players[0].owned[0]===false);assert.equal(room.state.players[0].unarmed,true);assert.ok(room.state.drops.some(d=>d.weapon===0));
 await request(0,{type:'buy',item:0,life});await new Promise(r=>setTimeout(r,20));assert.equal((await request(0)).state.players[0].owned[0],false,'free purchase cannot restore a gifted ARC');
 room=await until(r=>r.state?.round===2&&r.state.phase==='buy',30000);assert.equal(room.state.players[0].owned[0],false,'surviving without ARC remains consequential');
 const currentLife=room.state.players[0].life;await deliveries[0].ready(id,{life:currentLife});
 // An old-life pulse followed by new-life neutral must be discarded before buy.
 sockets[0].send(JSON.stringify(deliveries[0].envelope(id,{...neutral(),seq:3,action_life:firstLife,drop:true,item:3})));
 sockets[0].send(JSON.stringify(deliveries[0].envelope(id,{...neutral(),seq:4,action_life:currentLife})));
 await request(0,{type:'buy',item:2,life:currentLife});
 room=await until(r=>r.state?.players[0].owned[2]);assert.equal(room.state.players[0].owned[2],true);assert.equal(room.state.players[0].items[3],0);
 const position=room.state.players[0].position;sockets[0].terminate();
 await new Promise(r=>setTimeout(r,30));await request(0,{type:'leave'});assert.equal(service.rooms.get(id).members[0],accounts[0],'running tactical owner keeps a reserved seat');
 await request(10,{type:'join',room:id,hero:0},400);room=await request(0,{type:'join',room:id,hero:0});assert.equal(room.slot,0);await connect(0);
 await new Promise(r=>setTimeout(r,40));room=await request(0);assert.deepEqual(room.state.players[0].position,position,'idle tactical seat gets no AI movement');
 sockets.forEach(s=>s?.terminate());
 room=await until(r=>r.status==='finished',360000);assert.equal(room.proof.verified,true);
 const exp=await(await fetch(base+'/api/export',{headers:headers(0)})).json(),file=path.join(data,'export.json');writeFileSync(file,JSON.stringify(exp));
 assert.equal(JSON.parse((await run('release/myelin-botstrike',['verify',file],{env:{...process.env,BOTSTRIKE_ASSETS:path.resolve('release')},timeout:180000,maxBuffer:200e6})).stdout).verified,true);
 const action=JSON.parse(readFileSync(path.join(data,'rooms',id,'match.json')));action.result.score[0]++;const tamper=path.join(data,'tamper.json');writeFileSync(tamper,JSON.stringify(action));
 await assert.rejects(run('release/myelin-botstrike',['record',path.join(data,'tamper-session'),tamper],{env:{...process.env,BOTSTRIKE_ASSETS:path.resolve('release')},timeout:180000,maxBuffer:200e6}));
 for(let i=0;i<10;i++){const career=await(await fetch(base+'/api/career',{headers:headers(i)})).json();assert.equal(career.matches,0);}
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({data,profile:room.proof.profile,ticks:room.state.tick,score:room.state.score,automatedClients:10,humanParticipants:0,readyGate:true,uniqueHeroes:true,lockedHeroes:true,shortDropPreserved:true,unarmed:true,staleLifeRejected:true,noFreeArc:true,reservedIdleReconnect:true,enemyBudgetPrivate:true,signedReplay:true,tamperRejected:true,careerMatches:0},null,2));
}finally{sockets.forEach(s=>s?.terminate());await service.close();}
