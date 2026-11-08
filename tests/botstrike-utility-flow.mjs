// Actual native releases at three requested cadences, under the browser's 60 Hz
// transport cap. This does not claim physical 120 FPS rendering acceptance.
import assert from 'node:assert/strict';import {mkdtempSync,writeFileSync,readFileSync} from 'node:fs';import {tmpdir} from 'node:os';import path from 'node:path';import {execFileSync} from 'node:child_process';
import {trackSocketDelivery} from './ws-delivery-client.mjs';
import {WebSocket} from 'ws';import {createBotStrike,neutral} from '../botstrike-service/server.mjs';
const token='botstrike-utility-flow-fixture-token-2050',account='a'.repeat(64),data=mkdtempSync(path.join(tmpdir(),'botstrike-utility-flow-')),service=createBotStrike({secret:token,data});
await new Promise(r=>service.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+service.server.address().port,headers={'Content-Type':'application/json','X-Runtime-Token':token,'X-UTXOPlay-Account':account};
let socket,deliveryClient,controlToken,seq=0,timer,roomId;const results=[];
async function request(body){const r=await fetch(base+'/api/'+(body?'action':'state'),{method:body?'POST':'GET',headers,body:body?JSON.stringify(body):undefined});const value=await r.json();assert.equal(r.status,200,JSON.stringify(value));return value.room;}
async function until(predicate,timeout=10000){const end=Date.now()+timeout;while(Date.now()<end){const r=await request();if(r?.status==='failed')throw Error(r.error);if(predicate(r))return r;await new Promise(r=>setTimeout(r,12));}throw Error('Utility flow timeout');}
async function connect(){socket=new WebSocket(base.replace('http','ws')+'/api/socket',{headers});deliveryClient=trackSocketDelivery(socket);const control=new Promise(resolve=>socket.on('message',raw=>{const m=JSON.parse(raw);if(m.type==='control'&&m.active){controlToken=m.token;seq=Math.max(seq,m.nextSeq||0);resolve();}}));await new Promise((resolve,reject)=>{socket.once('open',resolve);socket.once('error',reject)});await control;await deliveryClient.ready(roomId);}
const send=input=>socket.send(JSON.stringify(deliveryClient.envelope(roomId,{...neutral(),seq:++seq,...input})));
try{
 let room=await request({type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:0,drill:5});roomId=room.id;await connect();await until(r=>r.state?.practice);
 for(const fps of [30,60,120])for(const mode of [0,1,2]){
  const prior=(await request()).state.practice.attempt;send({practice:1,throw_mode:mode,preview_item:2});send({throw_mode:mode,preview_item:2});room=await until(r=>r.state?.practice?.attempt===prior+1);
  await deliveryClient.ready(roomId,{life:room.state.players[0].life});
  const player=room.state.players[0],yaw=Math.round(player.yaw*1e6)/1e6,control={yaw,pitch:0,throw_mode:mode,preview_item:2};send(control);
  room=await until(r=>r.state?.players[0].throw_mode===mode&&r.state.practice.preview_kind===2&&r.state.practice.preview_mode===mode&&r.state.practice.preview_release);
  const pose=room.state.players[0],fixture={map:0,mode,kind:2,position:pose.position,velocity:pose.velocity,yaw,pitch:0,stance:pose.stance};
  const expected=JSON.parse(execFileSync('release/botstrike-engine',['projectile-probe'],{input:JSON.stringify(fixture)+'\n',maxBuffer:1e6}));
  send({...control,item:2});timer=setInterval(()=>send({...control,item:2}),1000/Math.min(fps,60));
  room=await until(r=>r.state?.practice?.last_throw);const released=room.state.practice.last_throw,releaseTick=room.state.practice.last_throw_tick;
  assert.deepEqual(released,expected.initial);let samples=0,disconnected=false;
  do{
   room=await request();const current=room.state.utilities.find(u=>u.owner===0&&u.kind===2);
   if(current){const index=released.fuse-current.fuse;assert.ok(index>=0&&index<expected.points.length);for(let axis=0;axis<3;axis++)assert.ok(Math.abs(current.position[axis]-expected.points[index][axis])<1e-8);samples++;if(current.fuse===0)break;}
   if(fps===60&&mode===2&&!disconnected&&current?.fuse<90){clearInterval(timer);timer=null;socket.terminate();await new Promise(r=>setTimeout(r,40));await connect();send(control);disconnected=true;}
   assert.equal(room.state.practice.last_throw_tick,releaseTick,'held packets/reconnect cannot duplicate a release');await new Promise(r=>setTimeout(r,20));
  }while(room.state.tick-releaseTick<150);
  clearInterval(timer);timer=null;send(control);assert.ok(samples>20);assert.equal(room.state.utilities.find(u=>u.kind===2)?.fuse,0);assert.equal(room.state.practice.last_throw_tick,releaseTick);
  results.push({requestedCadence:fps,transportCadence:Math.min(fps,60),mode,samples,reconnected:disconnected,trajectoryMatched:true,releaseTick,initial:released,landing:expected.points.at(-1),pose:fixture});
 }
 send({practice:2});send({});room=await until(r=>r.status==='finished',180000);assert.equal(room.proof.verified,true);
 const response=await fetch(base+'/api/export',{headers}),exported=await response.json(),file=path.join(data,'export.json');writeFileSync(file,JSON.stringify(exported));const verified=JSON.parse(execFileSync('release/myelin-botstrike',['verify',file],{env:{...process.env,BOTSTRIKE_ASSETS:path.resolve('release')},timeout:180000,maxBuffer:20e6}));assert.equal(verified.verified,true);
 const career=await(await fetch(base+'/api/career',{headers})).json();assert.equal(career.matches,0);
 const action=JSON.parse(readFileSync(path.join(data,'rooms',roomId,'match.json')));action.result.score[0]+=1;const bad=path.join(data,'bad.json');writeFileSync(bad,JSON.stringify(action));assert.throws(()=>execFileSync('release/myelin-botstrike',['record',path.join(data,'bad-session'),bad],{env:{...process.env,BOTSTRIKE_ASSETS:path.resolve('release')},stdio:'pipe'}));
 console.log(JSON.stringify({data,profile:room.proof.profile,signedReplay:true,tamperRejected:true,careerMatches:0,results,limitations:['Input-rate and controller tests are automated; not human feel or physical-device acceptance.','Spawn-to-A lineup references are provisional until flagship-map playtests.']},null,2));
}finally{clearInterval(timer);socket?.terminate();await service.close();}
