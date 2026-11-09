import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm,stat} from 'node:fs/promises';
import {tmpdir,cpus,totalmem} from 'node:os';
import path from 'node:path';
import {performance} from 'node:perf_hooks';
import {WebSocket} from 'ws';
import {trackSocketDelivery} from './ws-delivery-client.mjs';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createBotStrike,neutral} from '../botstrike-service/server.mjs';

const execFileAsync=promisify(execFile);
const data=await mkdtemp(path.join(tmpdir(),'botstrike-online-load-'));
const secret='online-load-test-'.repeat(3);
const service=createBotStrike({secret,data,maxRooms:4,queueMs:2000,heartbeatMs:500});
const sockets=[],clients=[],rooms=[],gaps=[],loopDelays=[];
let inputTimer,loopTimer,nativeTimer,peakRss=process.memoryUsage().rss,peakNativeRssMb=0,nativeSamples=0,nativeSampleError=null,nativeSamplePromise=Promise.resolve();
await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));
const base='http://127.0.0.1:'+service.server.address().port;
const account=index=>index.toString(16).padStart(64,'0');
const headers=id=>({'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':id});
const action=async(id,body)=>{const response=await fetch(base+'/api/action',{method:'POST',headers:headers(id),body:JSON.stringify(body)});return{status:response.status,body:await response.json()};};
const metrics=async()=>{const response=await fetch(base+'/api/metrics',{headers:headers(account(1))});assert.equal(response.status,200);return response.json();};
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(predicate,timeout=10000){const end=Date.now()+timeout;while(!(await predicate())){if(Date.now()>end)throw Error('Timed out waiting for room state');await wait(25)}}
function percentile(values,p){if(!values.length)return null;const sorted=[...values].sort((a,b)=>a-b);return Math.round(sorted[Math.ceil(sorted.length*p)-1]);}
async function nativeRssMb(){
 const pids=rooms.map(id=>service.rooms.get(id)?.child?.pid);
 assert.ok(pids.length===4&&pids.every(Number.isInteger),'four native engines remain running');
 const values=process.platform==='linux'
  ?await Promise.all(pids.map(async pid=>{const status=await readFile(`/proc/${pid}/status`,'utf8'),rss=/^VmRSS:\s+(\d+)\s+kB$/m.exec(status);assert.ok(rss,`native engine ${pid} has RSS`);return Number(rss[1]);}))
  :(await execFileAsync('ps',['-o','rss=','-p',pids.join(',')])).stdout.trim().split(/\s+/).map(Number);
 assert.equal(values.length,pids.length,'sample every native engine');
 assert.ok(values.every(value=>Number.isFinite(value)&&value>0),'native RSS samples are valid');
 return Math.round(values.reduce((sum,value)=>sum+value,0)/1024);
}
function sampleNative(){nativeSamplePromise=nativeSamplePromise.then(async()=>{try{peakNativeRssMb=Math.max(peakNativeRssMb,await nativeRssMb());nativeSamples++;}catch(error){nativeSampleError??=error;}});}
async function connect(client){
 const socket=new WebSocket(base.replace('http','ws')+'/api/socket',{headers:headers(client.id)});
 sockets.push(socket);client.socket=socket;client.delivery=trackSocketDelivery(socket);
 socket.on('message',raw=>{const message=JSON.parse(raw);if(message.type==='error')client.errors.push(message.error);if(message.type==='control'&&message.active)client.controlToken=message.token;if(message.type!=='state'||!message.room?.state)return;const now=performance.now();if(client.lastAt!==undefined)gaps.push(now-client.lastAt);client.lastAt=now;client.snapshots++;client.lastTick=message.room.state.tick;});
 await new Promise((resolve,reject)=>{socket.once('open',resolve);socket.once('error',reject)});
 return socket;
}
async function close(socket){socket.close();await new Promise(resolve=>socket.once('close',resolve));}

try{
 const configurations=[{map:0,difficulty:0},{map:1,difficulty:0},{map:2,difficulty:0},{map:0,difficulty:1}];
 for(const [group,config]of configurations.entries()){
  let roomId;
  for(let seat=0;seat<10;seat++){
   const client={id:account(group*10+seat+1),socket:null,seq:0,snapshots:0,lastTick:0,lastAt:undefined,errors:[]};
   const response=await action(client.id,{type:'queue',mode:'deathmatch',hero:seat%6,...config});
   assert.equal(response.status,200,JSON.stringify(response.body));
   roomId??=response.body.room.id;assert.equal(response.body.room.id,roomId);
   client.room=roomId;
   clients.push(client);
  }
  rooms.push(roomId);
 }
 await until(()=>rooms.every(id=>service.rooms.get(id)?.state?.tick>4));
 assert.equal(new Set(rooms).size,4);
 for(const client of clients)await connect(client);
 await until(()=>clients.every(client=>client.controlToken));
 const duplicate=await connect({id:clients[0].id,snapshots:0,errors:[]});
 await close(duplicate);
 assert.equal((await metrics()).publicReconnects,0,'a duplicate tab closing is not a reconnect');
 const full=await action(account(41),{type:'queue',mode:'deathmatch',map:0,hero:0,difficulty:2});
 assert.equal(full.status,400,'four occupied rooms enforce the room limit');

 const started=performance.now(),cpu=process.cpuUsage();let previous=started;
 sampleNative();await nativeSamplePromise;nativeTimer=setInterval(sampleNative,500);
 loopTimer=setInterval(()=>{const now=performance.now();loopDelays.push(Math.max(0,now-previous-100));previous=now;peakRss=Math.max(peakRss,process.memoryUsage().rss)},100);
 inputTimer=setInterval(()=>{for(const client of clients){if(client.socket?.readyState!==WebSocket.OPEN||!client.delivery.get(client.room))continue;client.socket.send(JSON.stringify(client.delivery.envelope(client.room,{...neutral(),seq:++client.seq})))}},62);
 await wait(2000);
 const disconnected=clients[1],oldSocket=disconnected.socket;
 await close(oldSocket);await wait(100);await connect(disconnected);
 await wait(6000);
 clearInterval(inputTimer);inputTimer=null;clearInterval(loopTimer);loopTimer=null;clearInterval(nativeTimer);nativeTimer=null;
 sampleNative();await nativeSamplePromise;assert.ifError(nativeSampleError);assert.ok(nativeSamples>=8&&peakNativeRssMb>0,'native memory was sampled throughout the load');
 const elapsed=performance.now()-started,used=process.cpuUsage(cpu);
 await until(async()=>{const current=await metrics();return current.publicSocketJitterMs.samples>0&&current.publicReconnects===1});
 const live=await metrics();
 assert.equal(live.publicMatchesStarted,4);assert.equal(live.publicHumanSeatsAtStart,40);assert.equal(live.publicBotSeatsAtStart,0);
 assert.equal(live.publicRunningHumans,40);assert.equal(live.publicBotSeats,0);
 assert.equal(live.publicReconnects,1);assert.equal(live.failedRooms,0);assert.equal(live.recordingErrors,0);
 assert.ok(clients.every(client=>client.snapshots>=8&&client.lastTick>100&&!client.errors.length),'all 40 clients receive live state without socket errors');
 const drained=await fetch(base+'/api/admin/drain',{method:'POST',headers:headers(account(1))});assert.equal(drained.status,200);
 assert.equal((await action(account(42),{type:'queue',mode:'deathmatch',map:0,hero:0,difficulty:2})).status,400);
 for(const client of clients)assert.equal((await action(client.id,{type:'leave',controlToken:client.controlToken})).status,200);
 assert.ok(rooms.every(id=>service.rooms.get(id).status==='cancelled'));
 const after=await metrics();assert.equal(after.rooms.running||0,0);assert.equal(after.failedRooms,0);assert.equal(after.verifiedMatches,0);
 const tapeBytes=(await Promise.all(rooms.map(id=>stat(path.join(data,'rooms',id,'tape.jsonl'))))).reduce((sum,file)=>sum+file.size,0);
 console.log(JSON.stringify({machine:{cpu:cpus()[0]?.model,cores:cpus().length,ramGb:Math.round(totalmem()/1024**3)},capacity:{rooms:4,humans:40,snapshots:clients.reduce((sum,client)=>sum+client.snapshots,0)},durationSec:Math.round(elapsed/1000),hostNodeCpuPercent:Math.round((used.user+used.system)/1000/elapsed*100),peakHostRssMb:Math.round(peakRss/1024**2),peakNativeRssMb,nativeMemorySamples:nativeSamples,tapeMb:Math.round(tapeBytes/1024**2),snapshotGapMs:{p50:percentile(gaps,.5),p95:percentile(gaps,.95)},eventLoopDelayMs:{p50:percentile(loopDelays,.5),p95:percentile(loopDelays,.95)},socketRttMs:live.publicSocketRttMs,socketJitterMs:live.publicSocketJitterMs,reconnects:live.publicReconnects,drain:true,emptyRoomsCancelled:true},null,2));
}finally{
 clearInterval(inputTimer);clearInterval(loopTimer);clearInterval(nativeTimer);
 for(const socket of sockets)socket.terminate();
 await service.close();await rm(data,{recursive:true,force:true});
}
