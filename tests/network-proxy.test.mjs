import test from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import http from 'node:http';
import {once} from 'node:events';
import {spawn} from 'node:child_process';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {WebSocket,WebSocketServer} from 'ws';
const proxyScript=fileURLToPath(new URL('../tools/network-proxy.mjs',import.meta.url));
async function freePort(){const s=net.createServer();s.listen(0,'127.0.0.1');await once(s,'listening');const port=s.address().port;await new Promise(resolve=>s.close(resolve));return port;}
async function fixture(t){
 const root=await mkdtemp(path.join(tmpdir(),'botstrike-proxy-raw-')),requests=[],server=http.createServer((req,res)=>{requests.push({url:req.url,headers:req.headers});res.end('fixed upstream');}),wss=new WebSocketServer({server}),sockets=new Set();
 server.on('connection',s=>{sockets.add(s);s.on('close',()=>sockets.delete(s));});wss.on('connection',(ws,req)=>{requests.push({url:req.url,headers:req.headers});ws.on('message',(data,binary)=>ws.send(data,{binary}));});server.listen(0,'127.0.0.1');await once(server,'listening');
 const proxyPort=await freePort(),rawPort=await freePort(),statsFile=path.join(root,'stats.json'),child=spawn(process.execPath,[proxyScript],{env:{...process.env,NETEM_UPSTREAM:'127.0.0.1',NETEM_UPSTREAM_PORT:String(server.address().port),NETEM_PROXY_PORT:String(proxyPort),NETEM_RAW_PORT:String(rawPort),NETEM_STATS_FILE:statsFile},stdio:['ignore','pipe','pipe']});let stderr='';child.stderr.on('data',b=>stderr+=b);await new Promise((resolve,reject)=>{child.stdout.once('data',resolve);child.once('error',reject);child.once('exit',()=>reject(Error(stderr)));});
 t.after(async()=>{if(child.exitCode===null&&child.signalCode===null){const done=once(child,'exit');child.kill();await done;}for(const socket of sockets)socket.destroy();for(const ws of wss.clients)ws.terminate();await new Promise(resolve=>wss.close(()=>server.close(resolve)));await rm(root,{recursive:true,force:true});});
 return{proxyPort,rawPort,requests,stats:async()=>JSON.parse(await readFile(statsFile,'utf8'))};
}
async function response(port,requestPath,headers={}){return new Promise((resolve,reject)=>{const r=http.get({host:'127.0.0.1',port,path:requestPath,headers,agent:false},res=>{let body='';res.on('data',b=>body+=b);res.on('end',()=>resolve({status:res.statusCode,body}));});r.on('error',reject);});}
test('raw transport preserves initial HTTP bytes, Origin and binary WebSocket payloads',async t=>{
 const f=await fixture(t),headers={Host:'botstrike.localhost:8080',Origin:'http://botstrike.localhost:8080'};
 assert.equal((await response(f.rawPort,'/raw?fixture=1',headers)).body,'fixed upstream');assert.equal(f.requests[0].headers.host,headers.Host);assert.equal(f.requests[0].headers.origin,headers.Origin);assert.equal(f.requests[0].url,'/raw?fixture=1');
 const ws=new WebSocket('ws://127.0.0.1:'+f.rawPort+'/socket',{headers,perMessageDeflate:false});await once(ws,'open');const payload=Buffer.from([0,255,128,34,13,10,0,17]),got=once(ws,'message');ws.send(payload,{binary:true});const [bytes,binary]=await got;assert.equal(binary,true);assert.deepEqual(bytes,payload);const closed=once(ws,'close');ws.close();await closed;
});
test('HTTP/CONNECT adapter admits only the fixed authority and tunnels arbitrary bytes without WS parsing',async t=>{
 const f=await fixture(t);assert.equal((await response(f.proxyPort,'http://botstrike.localhost:8080/from-proxy')).status,200);assert.equal((await response(f.proxyPort,'http://elsewhere.invalid/')).status,403);
 const socket=net.connect(f.proxyPort,'127.0.0.1');await once(socket,'connect');let received='';socket.setEncoding('utf8');socket.on('data',b=>received+=b);socket.write('CONNECT botstrike.localhost:8080 HTTP/1.1\r\nHost: botstrike.localhost:8080\r\n\r\n');
 const deadline=Date.now()+3000;while(!received.includes('200 Connection Established')){assert.ok(Date.now()<deadline);await new Promise(resolve=>setTimeout(resolve,5));}socket.write('GET /connect HTTP/1.1\r\nHost: botstrike.localhost:8080\r\nConnection: close\r\n\r\n');await once(socket,'close');assert.match(received,/fixed upstream/);
});
