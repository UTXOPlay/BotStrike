import test from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {mkdtemp,writeFile,readFile,rm,chmod} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const proxyFile=fileURLToPath(new URL('../tools/network-proxy.mjs',import.meta.url));
const authority='botstrike.contract:8080',sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(predicate,label,timeout=4000){const end=Date.now()+timeout;while(Date.now()<end){const value=await predicate();if(value)return value;await sleep(10);}throw Error('Timed out: '+label);}
async function listen(server){server.listen(0,'127.0.0.1');await once(server,'listening');return server.address().port;}
async function unusedPort(){const server=net.createServer(),port=await listen(server);await new Promise(resolve=>server.close(resolve));return port;}
function deadline(promise,socket,label,timeout=4000){let timer;return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>{socket?.destroy();reject(Error('Timed out: '+label));},timeout);})]).finally(()=>clearTimeout(timer));}

// The child runs the real proxy. This private preload observes real Node socket
// calls and identities; byte assertions below are independent of this observer.
const preload=`import net from 'node:net';
import {appendFileSync} from 'node:fs';
const ids=new WeakMap();let next=0,serial=0;
function log(op,socket,extra={}){if(socket===process.stdout||socket===process.stderr)return;let id=ids.get(socket);if(!id){id=++next;ids.set(socket,id);}appendFileSync(process.env.PROXY_SOCKET_AUDIT,JSON.stringify({serial:++serial,op,id,localPort:socket.localPort??null,remotePort:socket.remotePort??null,...extra})+'\\n');}
const noDelay=net.Socket.prototype.setNoDelay,write=net.Socket.prototype.write,connect=net.Socket.prototype.connect;
net.Socket.prototype.setNoDelay=function(value){const result=noDelay.apply(this,arguments);log('setNoDelay',this,{enabled:value!==false,explicitTrue:value===true});return result;};
net.Socket.prototype.write=function(value){log('write',this,{bytes:typeof value==='string'?Buffer.byteLength(value,typeof arguments[1]==='string'?arguments[1]:'utf8'):value?.byteLength??null});return write.apply(this,arguments);};
net.Socket.prototype.connect=function(){this.once('connect',()=>log('connected',this));return connect.apply(this,arguments);};
`;

async function harness(t){
 const directory=await mkdtemp(path.join(tmpdir(),'botstrike-proxy-contract-'));await chmod(directory,0o700);
 const sockets=new Set(),connections=[],clients=new Set();let child,closing=false,stderr='',stdout='';
 const upstream=net.createServer(socket=>{
  sockets.add(socket);connections.push(socket);socket.on('error',()=>{});socket.once('close',()=>sockets.delete(socket));let buffered=Buffer.alloc(0),upgraded=false;
  socket.on('data',chunk=>{
   if(upgraded){socket.write(chunk);return;}buffered=Buffer.concat([buffered,chunk]);
   if(buffered.length<4&&Buffer.from('GET ').subarray(0,buffered.length).equals(buffered))return;
   if(buffered.subarray(0,4).toString()==='GET '){
    const end=buffered.indexOf('\r\n\r\n');if(end<0)return;
    const header=buffered.subarray(0,end+4).toString();socket.upgradeHeader=header;upgraded=true;
    socket.write('HTTP/1.1 101 Switching Protocols\r\nConnection: Upgrade\r\nUpgrade: websocket\r\n\r\n');
    const head=buffered.subarray(end+4);if(head.length)socket.write(head);buffered=Buffer.alloc(0);
   }else{upgraded=true;socket.write(buffered);buffered=Buffer.alloc(0);}
  });
 });
 upstream.on('error',()=>{});
 t.after(async()=>{
  closing=true;for(const socket of clients)socket.destroy();for(const socket of sockets)socket.destroy();
  if(child&&child.exitCode===null&&child.signalCode===null){child.kill('SIGTERM');await deadline(once(child,'exit'),null,'owned proxy shutdown',2000).catch(()=>{child.kill('SIGKILL');});if(child.exitCode===null&&child.signalCode===null)await once(child,'exit');}
  if(upstream.listening)await new Promise(resolve=>upstream.close(resolve));await rm(directory,{recursive:true,force:true});
 });
 const upstreamPort=await listen(upstream),proxyPort=await unusedPort();let rawPort=await unusedPort();while(rawPort===proxyPort)rawPort=await unusedPort();
 const audit=path.join(directory,'sockets.jsonl'),fixture=path.join(directory,'observe-sockets.mjs'),statsFile=path.join(directory,'stats.json');
 await writeFile(audit,'',{mode:0o600});await writeFile(fixture,preload,{mode:0o600});
 child=spawn(process.execPath,['--import',fixture,proxyFile],{env:{...process.env,NODE_OPTIONS:'',NETEM_UPSTREAM:'127.0.0.1',NETEM_UPSTREAM_PORT:String(upstreamPort),NETEM_AUTHORITY:authority,NETEM_PROXY_PORT:String(proxyPort),NETEM_RAW_PORT:String(rawPort),NETEM_STATS_FILE:statsFile,PROXY_SOCKET_AUDIT:audit},stdio:['ignore','pipe','pipe']});
 child.stdout.on('data',chunk=>stdout+=chunk);child.stderr.on('data',chunk=>stderr+=chunk);child.on('error',()=>{});
 await until(()=>{if(child.exitCode!==null||child.signalCode!==null)throw Error('Owned proxy exited before ready: '+stderr);return stdout.includes('"proxyReady":true');},'real proxy ready');
 async function open(port){if(closing)throw Error('Harness is closing');const socket=net.connect({host:'127.0.0.1',port});clients.add(socket);socket.on('error',()=>{});socket.once('close',()=>clients.delete(socket));await deadline(once(socket,'connect'),socket,'owned client connect');return socket;}
 async function readExact(socket,expected,{prefix=Buffer.alloc(0)}={}){
  const chunks=[prefix];let bytes=prefix.length;const promise=new Promise((resolve,reject)=>{
   const cleanup=()=>{socket.off('data',data);socket.off('close',closed);socket.off('error',failed);};
   const data=chunk=>{chunks.push(chunk);bytes+=chunk.length;if(bytes>=expected.length){cleanup();resolve(Buffer.concat(chunks));}};
   const closed=()=>{cleanup();reject(Error('Socket closed before all expected bytes'));},failed=error=>{cleanup();reject(error);};
   socket.on('data',data);socket.once('close',closed);socket.once('error',failed);if(bytes>=expected.length){cleanup();resolve(Buffer.concat(chunks));}socket.resume();
  });const actual=await deadline(promise,socket,'byte-exact forwarding');assert.deepEqual(actual,expected);return actual;
 }
 async function header(socket){let chunks=Buffer.alloc(0);return deadline(new Promise((resolve,reject)=>{
  const cleanup=()=>{socket.off('data',data);socket.off('close',closed);socket.off('error',failed);};
  const data=chunk=>{chunks=Buffer.concat([chunks,chunk]);const at=chunks.indexOf('\r\n\r\n');if(at>=0){socket.pause();cleanup();resolve({header:chunks.subarray(0,at+4).toString(),head:chunks.subarray(at+4)});}};
  const closed=()=>{cleanup();reject(Error('Closed before response header'));},failed=error=>{cleanup();reject(error);};socket.on('data',data);socket.once('close',closed);socket.once('error',failed);
 }),socket,'HTTP tunnel header');}
 async function policy(client,remote){
  const events=(await readFile(audit,'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
  const legs=[events.find(row=>row.localPort===client.remotePort&&row.remotePort===client.localPort)?.id,events.find(row=>row.localPort===remote.remotePort&&row.remotePort===upstreamPort)?.id];
  assert.ok(legs.every(Number.isSafeInteger),'Both real proxy-emitted socket identities must be observed');assert.notEqual(legs[0],legs[1]);
  for(const id of legs){const rows=events.filter(row=>row.id===id),first=rows.find(row=>row.op==='write');assert.ok(first,'Both legs forwarded real bytes');const prior=rows.filter(row=>row.op==='setNoDelay'&&row.serial<first.serial).at(-1);assert.ok(prior?.enabled&&prior.explicitTrue,'Explicit setNoDelay(true) must precede the first forwarded write on each leg');}
  return legs;
 }
 return{open,readExact,header,policy,connections,proxyPort,rawPort,upstreamPort,stats:async()=>JSON.parse(await readFile(statsFile,'utf8')),stderr:()=>stderr};
}

test('real proxy preserves raw, Upgrade and CONNECT bytes and enables NODELAY before both emitted legs',{timeout:15000},async t=>{
 const h=await harness(t),payload=Buffer.from([82,65,87,0,255,128,13,10,1,2,3,4]);
 let client=await h.open(h.rawPort),remote=await until(()=>h.connections.at(-1),'raw upstream connection');
 let received=h.readExact(client,payload);client.write(payload.subarray(0,5));client.write(payload.subarray(5));await received;await h.policy(client,remote);client.destroy();

 const beforeUpgrade=h.connections.length;client=await h.open(h.proxyPort);let response=h.header(client);
 client.write(Buffer.concat([Buffer.from('GET http://'+authority+'/upgrade?exact=1 HTTP/1.1\r\nHost: '+authority+'\r\nConnection: Upgrade\r\nUpgrade: websocket\r\nProxy-Authorization: discarded-test-value\r\n\r\n'),payload]));
 const upgraded=await response;assert.match(upgraded.header,/^HTTP\/1\.1 101 /);await h.readExact(client,payload,{prefix:upgraded.head});
 remote=await until(()=>h.connections[beforeUpgrade],'Upgrade upstream connection');assert.match(remote.upgradeHeader,/^GET \/upgrade\?exact=1 HTTP\/1\.1\r\n/);assert.ok(!/proxy-authorization/i.test(remote.upgradeHeader));await h.policy(client,remote);client.destroy();

 const beforeConnect=h.connections.length;client=await h.open(h.proxyPort);response=h.header(client);client.write('CONNECT '+authority+' HTTP/1.1\r\nHost: '+authority+'\r\n\r\n');
 const connected=await response;assert.equal(connected.header,'HTTP/1.1 200 Connection Established\r\n\r\n');assert.equal(connected.head.length,0);
 received=h.readExact(client,payload);client.write(payload);await received;remote=await until(()=>h.connections[beforeConnect],'CONNECT upstream connection');await h.policy(client,remote);client.destroy();

 const beforeRejected=h.connections.length;
 for(const request of ['GET http://elsewhere.invalid:8080/no HTTP/1.1\r\nHost: elsewhere.invalid:8080\r\n\r\n','CONNECT elsewhere.invalid:8080 HTTP/1.1\r\nHost: elsewhere.invalid:8080\r\n\r\n']){
  client=await h.open(h.proxyPort);response=h.header(client);client.write(request);assert.match((await response).header,/^HTTP\/1\.1 403 /);client.destroy();
 }
 client=await h.open(h.proxyPort);const closed=deadline(once(client,'close'),client,'wrong-host Upgrade rejection');client.write('GET http://'+authority+'/upgrade HTTP/1.1\r\nHost: elsewhere.invalid:8080\r\nConnection: Upgrade\r\nUpgrade: websocket\r\n\r\n');await closed;
 assert.equal(h.connections.length,beforeRejected,'Rejected authorities must not create any upstream connection');assert.equal(h.stderr(),'');
 t.diagnostic('Three real forwarding flows checked byte-for-byte; six emitted legs require explicit NODELAY before first write; three invalid authorities refused. No latency inference.');
});

test('real proxy bounds live raw clients/sockets, refuses the next client and restores capacity',{timeout:20000},async t=>{
 const h=await harness(t),held=[];
 for(let index=0;index<64;index++){
  const client=await h.open(h.rawPort),echo=h.readExact(client,Buffer.from([index]));client.write(Buffer.from([index]));await echo;held.push(client);
 }
 const full=await until(async()=>{const stats=await h.stats();return stats.clients===64&&stats.active===128&&stats;},'bounded proxy capacity');assert.deepEqual(full.limits,{maxClients:64,maxSockets:128,maxRequests:64});
 const remoteCount=h.connections.length,extra=await h.open(h.rawPort);await deadline(once(extra,'close'),extra,'over-capacity rejection');
 const rejected=await until(async()=>{const stats=await h.stats();return stats.rejected>=1&&stats;},'rejection counter');assert.equal(h.connections.length,remoteCount);assert.ok(rejected.clients<=64&&rejected.active<=128);
 held.pop().destroy();await until(async()=>{const stats=await h.stats();return stats.clients===63&&stats.active===126;},'owned slot released');
 const replacement=await h.open(h.rawPort),echo=h.readExact(replacement,Buffer.from('replacement\0bytes'));replacement.write(Buffer.from('replacement\0bytes'));await echo;
 const remote=await until(()=>h.connections[remoteCount],'replacement upstream connection');await h.policy(replacement,remote);replacement.destroy();for(const client of held)client.destroy();
 await until(async()=>{const stats=await h.stats();return stats.clients===0&&stats.active===0;},'all owned clients and proxy legs closed');assert.equal(h.stderr(),'');
 t.diagnostic('64 clients/128 proxy sockets held open; client65 rejected without upstream expansion; released capacity reused, then all owned proxy sockets closed.');
});
