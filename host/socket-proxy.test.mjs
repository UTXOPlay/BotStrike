import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {mkdtempSync,writeFileSync,rmSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {WebSocket,WebSocketServer} from 'ws';
import {createGameHost} from './server.mjs';

const token='proxy-test-server-only-secret-'.repeat(3),origin='http://game.example';
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(predicate,{timeout=15000}={}){const end=Date.now()+timeout;while(Date.now()<end){const value=predicate();if(value)return value;await pause(5);}throw Error('Proxy fixture condition timed out');}
async function fixture(t,{configEnabled,optionEnabled}={}){
 const directory=mkdtempSync(path.join(tmpdir(),'botstrike-proxy-test-'));writeFileSync(path.join(directory,'index.html'),'<p>Game-only proxy fixture</p>');
 const runtimeServer=createServer((_req,res)=>{res.setHeader('Content-Type','application/json');res.end('{"ok":true}');}),runtimeSockets=new WebSocketServer({server:runtimeServer}),records=[],clients=new Set();
 runtimeSockets.on('connection',(ws,req)=>{const record={ws,headers:req.headers,path:req.url,raw:[],closed:false};records.push(record);ws.on('error',()=>{});ws.on('close',()=>record.closed=true);ws.on('message',(raw,binary)=>{record.raw.push(raw.toString());let value;try{value=JSON.parse(raw.toString());}catch{}if(value?.type!=='host_quality')ws.send(raw,{binary});});ws.send('runtime-ready');});
 runtimeServer.listen(0,'127.0.0.1');await once(runtimeServer,'listening');
 const config={name:'proxy-fixture',...(configEnabled===undefined?{}:{transportQuality:configEnabled}),games:['botstrike','old-game'].map(id=>({id,webRoot:directory,runtimePath:'/'+id,socket:true}))};
 const service=createGameHost({config,origin,runtimeUrl:'http://127.0.0.1:'+runtimeServer.address().port,runtimeToken:token,...(optionEnabled===undefined?{}:{transportQuality:optionEnabled})});
 const server=service.app.listen(0,'127.0.0.1');service.attachSockets(server);await once(server,'listening');const base='http://127.0.0.1:'+server.address().port;
 const guest=await fetch(base+'/api/guest',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:'{}'});assert.equal(guest.status,200);const cookie=guest.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ');
 t.after(async()=>{for(const client of clients)client.terminate();service.close();for(const ws of runtimeSockets.clients)ws.terminate();await Promise.all([new Promise(resolve=>server.close(resolve)),new Promise(resolve=>runtimeSockets.close(()=>runtimeServer.close(resolve)))]);rmSync(directory,{recursive:true,force:true});});
 const url=game=>base.replace(/^http/,'ws')+'/games/'+game+'/api/socket';
 return {records,service,async connect(game='botstrike',{extraHeaders={},autoPong=true}={}){
  const client=new WebSocket(url(game),{headers:{Origin:origin,Cookie:cookie,...extraHeaders},autoPong});clients.add(client);client.on('error',()=>{});client.messages=[];client.pings=[];client.on('message',raw=>client.messages.push(raw.toString()));client.on('ping',raw=>client.pings.push(Buffer.from(raw)));await until(()=>client.messages.includes('runtime-ready'));const record=records.at(-1);return {client,record};
 },async rejection(game='botstrike',extraHeaders={}){
  const ws=new WebSocket(url(game),{headers:{Origin:origin,Cookie:cookie,...extraHeaders}});clients.add(ws);ws.on('error',()=>{});return new Promise((resolve,reject)=>{ws.once('open',()=>{ws.terminate();reject(Error('Expected rejected upgrade'));});ws.once('unexpected-response',(_req,response)=>{const status=response.statusCode;response.resume();ws.terminate();resolve(status);});});
 }};
}
const reports=record=>record.raw.map(raw=>{try{return JSON.parse(raw);}catch{return null;}}).filter(value=>value?.type==='host_quality');

test('outer heartbeat matches the complete current nonce once and separates RTT, jitter and proxy queue gauges',async t=>{
 const f=await fixture(t,{configEnabled:true}),{client,record}=await f.connect('botstrike',{autoPong:false,extraHeaders:{'X-BotStrike-Transport':'browser-spoof'}}),legacy=await f.connect('old-game',{autoPong:false,extraHeaders:{'X-BotStrike-Transport':'host-proxy-v1'}});
 assert.equal(record.headers['x-botstrike-transport'],'host-proxy-v1');assert.equal(record.headers['x-runtime-token'],token);assert.equal(legacy.record.headers['x-botstrike-transport'],undefined,'other games never receive the BotStrike opt-in header');
 const first=await until(()=>client.pings[0]);assert.equal(first.length,16);await until(()=>legacy.client.pings[0]);assert.equal(legacy.client.pings[0].length,0,'legacy heartbeat payload is unchanged');legacy.client.pong(legacy.client.pings[0]);
 client.pong(first.subarray(0,8));client.pong(Buffer.concat([first,Buffer.from('suffix')]));await pause(25);assert.equal(reports(record).length,0,'prefix/concatenated nonces cannot create samples');client.pong(first);await until(()=>reports(record).length===1);const a=reports(record)[0];assert.deepEqual(Object.keys(a),['type','version','rttMs','jitterMs','upstreamQueueBytes','downstreamQueueBytes']);assert.equal(a.version,1);assert.equal(a.jitterMs,null);assert.ok(a.rttMs>=10&&a.rttMs<10000);assert.ok(Number.isSafeInteger(a.upstreamQueueBytes)&&a.upstreamQueueBytes>=0);assert.ok(Number.isSafeInteger(a.downstreamQueueBytes)&&a.downstreamQueueBytes>=0);
 const second=await until(()=>client.pings[1]);assert.equal(second.length,16);assert.notDeepEqual(second,first);client.pong(first);await pause(25);assert.equal(reports(record).length,1,'an old heartbeat response does not measure the new heartbeat');client.pong(second);await until(()=>reports(record).length===2);const b=reports(record)[1];assert.equal(b.jitterMs,Math.abs(b.rttMs-a.rttMs));client.pong(second);await pause(25);assert.equal(reports(record).length,2,'a matched nonce is consumed exactly once');assert.equal(reports(legacy.record).length,0,'a non-BotStrike runtime receives no new metadata');assert.equal(client.messages.some(raw=>{try{return JSON.parse(raw).type==='host_quality';}catch{return false;}}),false,'metadata travels upstream only');
 for(const value of [a,b])for(const forbidden of ['account','room','token','nonce','position','ip'])assert.equal(JSON.stringify(value).includes(forbidden),false);
});

test('enabled BotStrike proxy rejects reserved client metadata including escaped JSON keys and values',async t=>{
 const f=await fixture(t,{configEnabled:true});
 for(const raw of ['{"type":"host_quality","version":1}',String.raw`{"\u0074ype":"host_quality","version":1}`,String.raw`{"type":"host_\u0071uality","version":1}`,'{"type":"input","type":"host_quality"}']){
  const {client,record}=await f.connect('botstrike',{extraHeaders:{'X-BotStrike-Transport':'host-proxy-v1'}}),closed=once(client,'close');client.send(raw);const [code]=await closed;assert.equal(code,1008);assert.equal(record.raw.includes(raw),false,'spoofed metadata never reaches the runtime');await until(()=>record.closed);
 }
});

test('missing, non-boolean and explicitly disabled configuration keep legacy raw forwarding',async t=>{
 for(const settings of [{},{configEnabled:'true'},{configEnabled:true,optionEnabled:false}]){
  await t.test(JSON.stringify(settings),async t=>{const f=await fixture(t,settings),{client,record}=await f.connect('botstrike',{extraHeaders:{'X-BotStrike-Transport':'host-proxy-v1'}});assert.equal(record.headers['x-botstrike-transport'],undefined);const raw=String.raw`{ "\u0074ype": "host_quality", "legacy": true }`;client.send(raw);await until(()=>record.raw.includes(raw));assert.equal(reports(record).length,1,'legacy unknown-command forwarding remains unchanged');});
 }
 const config=JSON.parse(readFileSync(new URL('../game-host.json',import.meta.url)));assert.equal(config.transportQuality,true,'this standalone BotStrike host explicitly opts in');
});

test('native input, client quality and malformed text preserve exact raw forwarding; binary and rate bounds still close peers',async t=>{
 const f=await fixture(t,{configEnabled:true});let {client,record}=await f.connect();
 for(const raw of [String.raw`{ "type":"input", "input": {"seq":7,"yaw":1.20,"fire":false}, "tag":"\u0041" }`,'{ "type" : "quality", "version": 1, "metrics": {} }','{malformed']){client.send(raw);await until(()=>record.raw.includes(raw));await until(()=>client.messages.includes(raw));}
 let closed=once(client,'close');client.send(Buffer.from('{"type":"input"}'),{binary:true});await closed;await until(()=>record.closed);assert.equal(record.raw.length,3,'binary input is not forwarded');
 ({client,record}=await f.connect());closed=once(client,'close');for(let i=0;i<121;i++)client.send(JSON.stringify({type:'input',seq:i}));await closed;await until(()=>record.closed);assert.ok(record.raw.length<=120,'the existing per-second client message bound is unchanged');
 ({client,record}=await f.connect());closed=once(client,'close');client.send('x'.repeat(4097));await closed;await until(()=>record.closed);assert.equal(record.raw.length,0,'the 4096-byte upgrade payload limit still rejects oversized messages');
});

test('existing authentication, three-peer capacity and close cleanup remain effective',async t=>{
 const f=await fixture(t,{configEnabled:true});assert.equal(await f.rejection('botstrike',{Origin:'http://evil.example'}),403);assert.equal(await f.rejection('botstrike',{Cookie:''}),401);const peers=[];for(let i=0;i<3;i++)peers.push(await f.connect());assert.equal(await f.rejection(),429);const closed=once(peers[0].client,'close');peers[0].client.close();await closed;await until(()=>peers[0].record.closed);const replacement=await f.connect();assert.equal(replacement.client.readyState,WebSocket.OPEN,'a closed peer releases its existing per-account slot');
});

test('an unanswered outer heartbeat still reclaims the client and upstream on the existing second interval',async t=>{
 const f=await fixture(t,{configEnabled:true}),{client,record}=await f.connect('botstrike',{autoPong:false}),closed=once(client,'close');await until(()=>client.pings.length===1);await closed;await until(()=>record.closed);assert.equal(client.readyState,WebSocket.CLOSED);assert.equal(reports(record).length,0);assert.equal(client.pings.length,1,'no extra heartbeat interval is granted');
});
