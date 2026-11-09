import http from 'node:http';
import net from 'node:net';
import {writeFileSync,renameSync} from 'node:fs';

// Fixed-destination lab transport: optional HTTP/CONNECT adapter plus a raw TCP
// listener. Kernel IFB/netem handles all delay/loss; no WebSocket frames or
// credentials are inspected, retained or synthesized.
const upstream=process.env.NETEM_UPSTREAM,port=Number(process.env.NETEM_UPSTREAM_PORT||8080),authority=process.env.NETEM_AUTHORITY||'botstrike.localhost:8080';
const proxyPort=Number(process.env.NETEM_PROXY_PORT||8080),rawPort=Number(process.env.NETEM_RAW_PORT||8081),maxClients=64,maxSockets=128,maxRequests=64;
if(!upstream||![port,proxyPort,rawPort].every(n=>Number.isInteger(n)&&n>0&&n<=65535)||proxyPort===rawPort)throw Error('Explicit valid lab upstream/listeners required');
const sockets=new Set(),clients=new Set(),requests=new Set(),stats={accepted:0,rawAccepted:0,rejected:0,upstreamErrors:0,closed:0,active:0,clients:0,pendingRequests:0,rawUpBytes:0,rawDownBytes:0};
function allowed(value){try{const u=new URL(value.startsWith('/')?'http://'+authority+value:value);return ['http:','ws:'].includes(u.protocol)&&u.host===authority?u:null;}catch{return null;}}
function track(socket,client=false){
 if(sockets.has(socket))return true;
 if(sockets.size>=maxSockets||client&&clients.size>=maxClients){stats.rejected++;socket.destroy();return false;}
 // The extra forwarding hop must not add Nagle buffering to small control
 // writes. Kernel netem and TCP loss/retransmission still apply normally.
 socket.setNoDelay(true);
 sockets.add(socket);if(client)clients.add(socket);stats.active=sockets.size;stats.clients=clients.size;
 socket.on('error',()=>{});socket.once('close',()=>{sockets.delete(socket);clients.delete(socket);stats.closed++;stats.active=sockets.size;stats.clients=clients.size;});return true;
}
function tunnel(client,head,prefix=''){
 if(sockets.size>=maxSockets){stats.rejected++;client.destroy();return;}
 client.pause();const remote=net.connect({host:upstream,port});track(remote);
 remote.once('connect',()=>{if(prefix)remote.write(prefix);if(head?.length)remote.write(head);client.on('data',bytes=>stats.rawUpBytes+=bytes.length);remote.on('data',bytes=>stats.rawDownBytes+=bytes.length);client.pipe(remote).pipe(client);});
 remote.on('error',()=>{stats.upstreamErrors++;client.destroy();});remote.once('close',()=>client.destroy());client.once('close',()=>remote.destroy());
 return remote;
}
const agent=new http.Agent({keepAlive:true,maxSockets:64,maxTotalSockets:64,maxFreeSockets:8});
const server=http.createServer((request,response)=>{
 const url=allowed(request.url);if(!url||requests.size>=maxRequests){stats.rejected++;response.writeHead(url?503:403);response.end('Lab destination or capacity rejected');return;}
 stats.accepted++;const headers={...request.headers,host:authority};delete headers['proxy-connection'];delete headers['proxy-authorization'];
 const remote=http.request({host:upstream,port,agent,path:url.pathname+url.search,method:request.method,headers},result=>{response.writeHead(result.statusCode,result.headers);result.pipe(response);});requests.add(remote);stats.pendingRequests=requests.size;
 const finish=()=>{requests.delete(remote);stats.pendingRequests=requests.size;};remote.once('close',finish);remote.on('socket',socket=>track(socket));
 remote.on('error',()=>{stats.upstreamErrors++;if(!response.headersSent)response.writeHead(502);response.end('Lab upstream unavailable');});request.on('aborted',()=>remote.destroy());response.on('close',()=>{if(!response.writableEnded)remote.destroy();});request.pipe(remote);
});
server.on('connection',socket=>track(socket,true));
server.on('connect',(request,client,head)=>{
 if(request.url!==authority){stats.rejected++;client.end('HTTP/1.1 403 Forbidden\r\n\r\n');return;}
 stats.accepted++;const remote=tunnel(client,head);remote?.once('connect',()=>client.write('HTTP/1.1 200 Connection Established\r\n\r\n'));
});
server.on('upgrade',(request,client,head)=>{
 const url=allowed(request.url);if(!url||request.headers.host!==authority){stats.rejected++;client.destroy();return;}
 stats.accepted++;const headers=[];for(let i=0;i<request.rawHeaders.length;i+=2){const name=request.rawHeaders[i];if(!/^proxy-(authorization|connection)$/i.test(name))headers.push(name+': '+request.rawHeaders[i+1]);}
 tunnel(client,head,request.method+' '+url.pathname+url.search+' HTTP/1.1\r\n'+headers.join('\r\n')+'\r\n\r\n');
});
const rawServer=net.createServer(client=>{if(!track(client,true))return;stats.rawAccepted++;tunnel(client);});
server.requestTimeout=30000;server.headersTimeout=30000;server.keepAliveTimeout=5000;
function persist(){try{const file=process.env.NETEM_STATS_FILE||'/tmp/netem-proxy.json';writeFileSync(file+'.tmp',JSON.stringify({...stats,limits:{maxClients,maxSockets,maxRequests},transport:'fixed_raw_tcp_plus_http_connect_adapter'}));renameSync(file+'.tmp',file);}catch{}}
const timer=setInterval(persist,250);timer.unref();persist();
await Promise.all([new Promise(resolve=>server.listen(proxyPort,'0.0.0.0',resolve)),new Promise(resolve=>rawServer.listen(rawPort,'0.0.0.0',resolve))]);
console.log(JSON.stringify({proxyReady:true,authority,proxyPort,rawPort,packetShaping:'external_kernel_tc_receiver_ingress_ifb'}));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>{clearInterval(timer);persist();for(const request of requests)request.destroy();agent.destroy();for(const socket of sockets)socket.destroy();server.close(()=>rawServer.close(()=>process.exit(0)));});
