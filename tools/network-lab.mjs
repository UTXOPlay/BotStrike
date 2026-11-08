// Disposable receiver-ingress/IFB topology. Never queries/removes foreign labs.
import * as fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import {tmpdir} from 'node:os';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {randomUUID,randomBytes,createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {isIP,createServer} from 'node:net';
import {labQualityProvenance} from './network-lab-provenance.mjs';
const run=promisify(execFile),repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const LAB_ORIGIN='http://botstrike.localhost:8080';
const AUTHORITY='botstrike.localhost:8080',OWNER='io.utxoplay.network-lab.run',ACTORS=['A','B','C'];
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function reserveLoopbackPorts(count){
 const sockets=[];try{for(let i=0;i<count;i++){const socket=createServer();await new Promise((resolve,reject)=>{socket.once('error',reject);socket.listen(0,'127.0.0.1',resolve);});sockets.push(socket);}return{ports:sockets.map(socket=>socket.address().port),release:()=>Promise.all(sockets.map(socket=>new Promise(resolve=>socket.close(resolve))))};}catch(error){for(const socket of sockets)socket.close();throw error;}
}
const writeJSON=(file,value)=>fs.writeFile(file,JSON.stringify(value,null,2)+'\n',{mode:0o600});
const finite=(n,min,max)=>typeof n==='number'&&Number.isFinite(n)&&n>=min&&n<=max;
export function normalizeDirection(value={}){
 assert.ok(value&&typeof value==='object'&&!Array.isArray(value),'Direction must be an object');
 const allowed=['delayMs','jitterMs','lossPct','burstLoss','bandwidthKbit','seed','limitPackets'];assert.ok(Object.keys(value).every(k=>allowed.includes(k)),'Unknown shaping key');
 const result={delayMs:value.delayMs??0,jitterMs:value.jitterMs??0,lossPct:value.lossPct??0,bandwidthKbit:value.bandwidthKbit??null,seed:value.seed??2050,limitPackets:value.limitPackets??1000};
 assert.ok(finite(result.delayMs,0,60000)&&finite(result.jitterMs,0,60000)&&finite(result.lossPct,0,100),'Invalid delay/jitter/loss');
 assert.ok(result.jitterMs===0||result.delayMs>0,'Jitter needs a base delay');
 assert.ok(Number.isInteger(result.seed)&&result.seed>=1&&result.seed<=0xffffffff,'Invalid netem seed');assert.ok(Number.isInteger(result.limitPackets)&&result.limitPackets>=1&&result.limitPackets<=100000,'Invalid queue bound');
 assert.ok(result.bandwidthKbit===null||finite(result.bandwidthKbit,1,10000000),'Invalid bandwidth');
 if(value.burstLoss!==undefined){const burst=value.burstLoss;assert.ok(burst&&typeof burst==='object'&&!Array.isArray(burst)&&Object.keys(burst).length===4&&['p','r','badLoss','goodLoss'].every(k=>Object.hasOwn(burst,k)&&finite(burst[k],0,100)),'Invalid Gilbert-Elliott loss');assert.equal(result.lossPct,0,'Choose random loss or burst loss');result.burstLoss={...burst};}
 return result;
}
export function netemArguments(value){
 const p=normalizeDirection(value),args=['limit',String(p.limitPackets)];
 if(p.delayMs){args.push('delay',p.delayMs+'ms');if(p.jitterMs)args.push(p.jitterMs+'ms','distribution','normal');}
 if(p.burstLoss)args.push('loss','gemodel',p.burstLoss.p+'%',p.burstLoss.r+'%',p.burstLoss.badLoss+'%',p.burstLoss.goodLoss+'%');else if(p.lossPct)args.push('loss','random',p.lossPct+'%');
 if(p.bandwidthKbit!==null)args.push('rate',p.bandwidthKbit+'kbit');args.push('seed',String(p.seed));return args;
}
function normalizeProfile(profile={}){assert.ok(profile&&typeof profile==='object'&&Object.keys(profile).every(k=>['upstream','downstream'].includes(k)),'Unknown profile field');return{upstream:normalizeDirection(profile.upstream),downstream:normalizeDirection(profile.downstream)};}
export function networkInterfaceFor(addresses,ip){
 assert.equal(isIP(ip),4,'An actual IPv4 address is required');assert.ok(Array.isArray(addresses));
 const row=addresses.find(row=>row.addr_info?.some(value=>value.local===ip));assert.ok(row&&/^[A-Za-z0-9_.:-]{1,15}$/.test(row.ifname)&&Number.isInteger(row.ifindex)&&row.ifindex>0,'Owned bridge interface not found');return{name:row.ifname,index:row.ifindex};
}
export function networkChangeFilterPlan({actor,actorIp,serverIp,actorDevice}){
 assert.ok(ACTORS.includes(actor));assert.equal(isIP(actorIp),4);assert.equal(isIP(serverIp),4);assert.match(actorDevice,/^[A-Za-z0-9_.:-]{1,15}$/);const preference=String(10+ACTORS.indexOf(actor));
 return[
  {target:'actor',args:['tc','qdisc','replace','dev',actorDevice,'handle','ffff:','ingress']},
  {target:'actor',args:['tc','filter','replace','dev',actorDevice,'ingress','protocol','ip','pref','10','handle','1','flower','src_ip',serverIp,'dst_ip',actorIp,'ip_proto','tcp','src_port','8080','action','mirred','egress','redirect','dev','ifbd'+actor]},
  {target:'server',args:['tc','filter','del','dev','eth0','ingress','protocol','ip','pref',preference]},
  {target:'server',args:['tc','filter','add','dev','eth0','ingress','protocol','ip','pref',preference,'flower','src_ip',actorIp,'dst_ip',serverIp,'ip_proto','tcp','dst_port','8080','action','mirred','egress','redirect','dev','ifbu'+actor]},
 ];
}
export async function createNetworkLab({applicationImage='botstrike:interface-v5-20261107-v3',toolImage='botstrike:netem-tools-20261108',devSource,runtimeConfig={},runtimeEnv={},artifactsRoot,labRootBase,minFreeBytes=0}={}){
 assert.ok(!artifactsRoot||!labRootBase||path.resolve(artifactsRoot)===path.resolve(labRootBase),'Choose one lab artifact base');assert.ok(Number.isSafeInteger(minFreeBytes)&&minFreeBytes>=0);
 const base=path.resolve(artifactsRoot||labRootBase||process.env.BOTSTRIKE_NETWORK_LAB_ROOT||tmpdir());await fs.mkdir(base,{recursive:true,mode:0o700});const available=await fs.statfs(base);assert.ok(available.bavail*available.bsize>=minFreeBytes,'Lab artifact filesystem reserve unavailable');
 const root=await fs.mkdtemp(path.join(base,'botstrike-network-lab-'));await fs.chmod(root,0o700);const runId=randomUUID(),name='botstrike-lab-'+runId.slice(0,12),owned=[],actors={},profiles={},outages=new Map(),outageSides=new Map(),commands=[];let network,server,labImageBindings,closed=false,cleanupComplete=false,captureExpected=false,qdiscSerial=0;const transitions=[],networkChanges=[];
 const dataDir=path.join(root,'data'),evidence=path.join(root,'evidence');await fs.mkdir(dataDir,{mode:0o700});await fs.mkdir(evidence,{mode:0o700});const diagnostics=path.join(dataDir,'network-diagnostics');await fs.mkdir(diagnostics,{mode:0o700});await fs.writeFile(path.join(diagnostics,'.network-lab-owner'),runId,{mode:0o600});await fs.writeFile(path.join(root,'.network-lab-owner'),runId,{mode:0o600});
 if(process.getuid?.()!==1000){await fs.chown(dataDir,1000,1000);await fs.chown(diagnostics,1000,1000);await fs.chown(path.join(diagnostics,'.network-lab-owner'),1000,1000);}
 const docker=async args=>{commands.push({at:Date.now(),command:args.map((v,i)=>args[i-1]==='--env-file'?'[private-env-file]':v)});const result=await run('docker',args,{encoding:'utf8',timeout:30000,maxBuffer:8*1024*1024});return result.stdout.trim();};
 const exec=(id,args)=>docker(['exec',id,...args]);
 const save=()=>writeJSON(path.join(root,'ownership.json'),{runId,network:network||null,containers:owned,root,dataDir,origin:LAB_ORIGIN});
 async function inspect(id,type='container'){return JSON.parse(await docker([type==='network'?'network':'container','inspect',id]))[0];}
 async function create(role,args,{beforeStart}={}){const id=await docker(['create','--label',OWNER+'='+runId,'--label','io.utxoplay.network-lab.role='+role,...args]);owned.push({id,role});await save();await beforeStart?.();await docker(['start',id]);return id;}
 async function safeRemove(id,type){let item;try{item=await inspect(id,type);}catch(error){if(/No such (container|network|object)/i.test(error.stderr||error.message))return;throw error;}const labels=type==='network'?item.Labels:item.Config.Labels;assert.equal(labels?.[OWNER],runId,'Refuse to remove an unowned Docker object');if(type==='container'&&labels['io.utxoplay.network-lab.role']==='application')await docker(['stop','--time','5',id]);await docker(type==='network'?['network','rm',id]:['rm','-f',id]);}
 async function close(){if(cleanupComplete)return;closed=true;const failures=[];for(const {id}of [...owned].reverse())try{await safeRemove(id,'container');}catch(error){failures.push({id,message:error.message});}if(network)try{await safeRemove(network,'network');}catch(error){failures.push({id:network,message:error.message});}let capture;try{const manifest=JSON.parse(await fs.readFile(path.join(diagnostics,'capture.json'),'utf8'));capture={required:captureExpected,valid:manifest.status==='complete'&&!manifest.dropped&&!manifest.errorCode&&!manifest.latestErrorCode,status:manifest.status==='complete'&&!manifest.dropped&&!manifest.errorCode&&!manifest.latestErrorCode?'complete':'invalid',manifestStatus:manifest.status,dropped:manifest.dropped,errorCode:manifest.errorCode,latestErrorCode:manifest.latestErrorCode};}catch(error){capture={required:captureExpected,valid:captureExpected?false:null,status:error.code==='ENOENT'?'not_present':'invalid'};}await writeJSON(path.join(evidence,'cleanup.json'),{runId,failures,capture});await writeJSON(path.join(evidence,'commands.json'),commands);cleanupComplete=failures.length===0;if(failures.length)throw Error('Owned lab cleanup incomplete: '+JSON.stringify(failures));}
 async function setDirection(actor,direction,profile){assert.ok(qdiscSerial<4096,'Lab shaping transition bound reached');const target=direction==='upstream'?server.namespaceId:actors[actor].containerId,device=direction==='upstream'?'ifbu'+actor:'ifbd'+actor,handle=(++qdiscSerial).toString(16)+':';await exec(target,['tc','qdisc','replace','dev',device,'root','handle',handle,'netem',...netemArguments(profile)]);transitions.push({at:Date.now(),actor,direction,device,handle,profile:structuredClone(profile),queueReset:true,countersRestarted:true});await writeJSON(path.join(evidence,'shaping-transitions.json'),transitions);}
 async function shape(actor,profile){assert.ok(ACTORS.includes(actor),'Unknown actor');assert.ok(!closed,'Lab is closed');const normalized=normalizeProfile(profile);await setDirection(actor,'upstream',normalized.upstream);await setDirection(actor,'downstream',normalized.downstream);profiles[actor]=normalized;outages.delete(actor);outageSides.delete(actor);await writeJSON(path.join(evidence,'profiles.json'),profiles);return structuredClone(normalized);}
 async function outage(actor,{direction='both'}={}){assert.ok(!closed,'Lab is closed');assert.ok(ACTORS.includes(actor)&&['both','upstream','downstream'].includes(direction),'Invalid outage');if(!outages.has(actor))outages.set(actor,structuredClone(profiles[actor]));const sides=outageSides.get(actor)||new Set();for(const side of ['upstream','downstream'])if(direction==='both'||direction===side){const changed={...profiles[actor][side],lossPct:100};delete changed.burstLoss;await setDirection(actor,side,changed);sides.add(side);}outageSides.set(actor,sides);return{actor,direction,lossPct:100};}
 async function restore(actor){assert.ok(ACTORS.includes(actor),'Unknown actor');const previous=outages.get(actor)||profiles[actor];return shape(actor,previous);}
 async function changeNetwork(actor,{holdMs=1000}={}){
  assert.ok(ACTORS.includes(actor)&&!closed,'Invalid owned network-change actor');assert.ok(Number.isInteger(holdMs)&&holdMs>=100&&holdMs<=30000);assert.ok(networkChanges.length<8,'Network-change bound reached');
  const id=actors[actor].containerId,ownedActor=await inspect(id),ownedNetwork=await inspect(network,'network');assert.equal(ownedActor.Config.Labels?.[OWNER],runId);assert.equal(ownedNetwork.Labels?.[OWNER],runId);
  const oldIp=actors[actor].ip,oldPorts=structuredClone(ownedActor.NetworkSettings.Ports),before=await stats(),oldAddresses=JSON.parse(await exec(id,['ip','-j','-4','addr','show']));
  const row={actor,startedAt:Date.now(),holdMs,oldIp,oldInterface:networkInterfaceFor(oldAddresses,oldIp),beforeShapingGeneration:qdiscSerial,manualWebSocketClose:false,status:'running'};networkChanges.push(row);await writeJSON(path.join(evidence,'network-changes.json'),networkChanges);let reservation;
  try{
   await docker(['network','disconnect',network,id]);row.disconnectedAt=Date.now();await wait(holdMs);
   // Reserve only this run's old bridge address, forcing a real new endpoint.
   reservation=await create('network-address-reservation-'+actor+'-'+networkChanges.length,['--network',network,'--ip',oldIp,'--read-only','--security-opt','no-new-privileges','--cap-drop','ALL','--cpus','0.1','--memory','64m','--pids-limit','16','--entrypoint','node',labImageBindings.tools.id,'-e','setInterval(()=>{},1000)']);row.reservationId=reservation;
   await docker(['network','connect',network,id]);const afterActor=await inspect(id),endpoint=Object.values(afterActor.NetworkSettings.Networks).find(value=>value.NetworkID===network);assert.ok(endpoint?.IPAddress,'Reconnected owned bridge address missing');assert.notEqual(endpoint.IPAddress,oldIp,'Network change must actually allocate a new IP');assert.deepEqual(afterActor.NetworkSettings.Ports,oldPorts,'Network change must preserve published client endpoints');
   const addresses=JSON.parse(await exec(id,['ip','-j','-4','addr','show'])),iface=networkInterfaceFor(addresses,endpoint.IPAddress);actors[actor].ip=endpoint.IPAddress;actors[actor].ingressDevice=iface.name;
   row.newIp=endpoint.IPAddress;row.newInterface=iface;row.reconnectedAt=Date.now();row.publishedPortsPreserved=true;
   for(const operation of networkChangeFilterPlan({actor,actorIp:row.newIp,serverIp:server.ip,actorDevice:iface.name}))await exec(operation.target==='server'?server.namespaceId:id,operation.args);
   await shape(actor,profiles[actor]);row.after=await stats();row.before=before;row.status='passed';row.finishedAt=Date.now();await writeJSON(path.join(root,'topology.json'),{runId,origin:LAB_ORIGIN,networkId:network,imageBindings:labImageBindings,server,actors,dataDir});return structuredClone(row);
  }catch(error){row.status='failed';row.error=String(error.message).slice(0,500);throw error;}
  finally{if(reservation)await safeRemove(reservation,'container');await writeJSON(path.join(evidence,'network-changes.json'),networkChanges);}
 }
 async function imageProvenance(applicationIdentity,imageConfig){
  const recordedBinding=JSON.parse(await fs.readFile(path.join(repo,'docs/acceptance/arsenal-audio/bound-application.json'),'utf8'));
  const script="const f=require('node:fs'),c=require('node:crypto');const sha=b=>c.createHash('sha256').update(b).digest('hex'),files=['release/botstrike-engine','release/myelin-botstrike','botstrike/spec.json'];let guard=null,guardSha256=null;try{const b=f.readFileSync('/app/build-validation/network-quality/binding.json');if(b.length>1048576)throw Error('Guard bound');guard=JSON.parse(b);guardSha256=sha(b)}catch(e){if(e.code!=='ENOENT')throw e}console.log(JSON.stringify({imageArtifacts:Object.fromEntries(files.map(p=>[p,sha(f.readFileSync('/app/'+p))])),guard:guard&&{baseProtectedFiles:guard.baseProtectedFiles,protectedFileCount:Object.keys(guard.protectedFiles||{}).length,intentionalFileCount:Object.keys(guard.intentionalChanges||{}).length,retainedPairCount:guard.retainedArtifacts?.length,sourceRevision:guard.sourceRevision,sourceKind:guard.sourceKind,nativeRulesChanged:guard.nativeRulesChanged,nativeModelSha256:guard.nativeModelSha256,portableProfileSha256:guard.portableProfileSha256,protectedFiles:Object.fromEntries(files.map(p=>[p,guard.protectedFiles?.[p]]))},guardSha256}))";
  const id=await create('image-provenance',['--network','none','--read-only','--security-opt','no-new-privileges','--cap-drop','ALL','--cpus','0.25','--memory','128m','--pids-limit','32','--entrypoint','node',applicationIdentity,'-e',script]);
  try{assert.equal(await docker(['wait',id]),'0','Application image provenance inspection failed');const actual=JSON.parse(await docker(['logs',id]));if(devSource)assert.equal(createHash('sha256').update(await fs.readFile(path.join(await fs.realpath(devSource),'botstrike/spec.json'))).digest('hex'),actual.imageArtifacts['botstrike/spec.json'],'Development spec must retain the recorded exact Native profile');return labQualityProvenance({applicationIdentity,imageConfig,recordedBinding,...actual,devSource:!!devSource,runtimeEnv});}finally{await safeRemove(id,'container');}
 }
 async function artifactInventory(){
  const script="const fs=require('node:fs'),c=require('node:crypto'),p=require('node:path');const names=['release/botstrike-engine','release/myelin-botstrike','botstrike/spec.json'];for(const dir of ['botstrike-service','host','shared'])for(const n of fs.readdirSync('/app/'+dir).filter(n=>n.endsWith('.mjs')).sort())names.push(dir+'/'+n);names.push('dist/botstrike/app.js','tools/start-network-runtime.mjs');console.log(JSON.stringify(names.map(file=>{const s=fs.lstatSync('/app/'+file);if(!s.isFile()||s.isSymbolicLink()||s.size>30000000)throw Error('Artifact bound');return{file,bytes:s.size,sha256:c.createHash('sha256').update(fs.readFileSync('/app/'+file)).digest('hex')}})))";
  return JSON.parse(await exec(server.appId,['node','-e',script]));
 }
 async function stats(){assert.ok(!closed,'Lab is closed');const result={runId,at:Date.now(),origin:LAB_ORIGIN,profiles:structuredClone(profiles),shapingGeneration:qdiscSerial,transitionSemantics:'fresh qdisc per direction; queues discarded and counters restarted at each profile boundary',outages:Object.fromEntries([...outageSides].map(([actor,sides])=>[actor,[...sides]])),server:{},actors:{}};for(const [label,id]of [['server',server.namespaceId],...ACTORS.map(a=>[a,actors[a].containerId])]){const [qdisc,filters,ss,nstat]=await Promise.all([exec(id,['tc','-s','-j','qdisc','show']),exec(id,['tc','-s','-j','filter','show','dev',label==='server'?'eth0':actors[label].ingressDevice||'eth0','ingress']),exec(id,['ss','-tin']),exec(id,['nstat','-az'])]);const row={qdisc:JSON.parse(qdisc),ingressFilters:JSON.parse(filters),ss,nstat};if(label==='server')result.server=row;else{row.proxy=JSON.parse(await exec(id,['cat','/tmp/netem-proxy.json']));result.actors[label]=row;}}await writeJSON(path.join(evidence,'stats-'+result.at+'.json'),result);return result;}
 try{
  const inspectedApplication=JSON.parse(await docker(['image','inspect',applicationImage]))[0],applicationIdentity=inspectedApplication.Id,toolIdentity=JSON.parse(await docker(['image','inspect',toolImage]))[0].Id,qualityProvenance=await imageProvenance(applicationIdentity,inspectedApplication.Config),imageBindings={application:{reference:applicationImage,id:applicationIdentity},tools:{reference:toolImage,id:toolIdentity},developmentBind:!!devSource,qualityProvenance};labImageBindings=imageBindings;network=await docker(['network','create','--driver','bridge','--label',OWNER+'='+runId,name]);await save();
  const common=['--read-only','--security-opt','no-new-privileges','--cap-drop','ALL','--tmpfs','/tmp:rw,noexec,nosuid,nodev,size=32m'];
  const helper=await create('server-namespace',[...common,'--network',network,'--cap-add','NET_ADMIN','--cpus','0.25','--memory','96m','--pids-limit','32','--entrypoint','node',labImageBindings.tools.id,'-e','setInterval(()=>{},1000)']);const helperInfo=await inspect(helper),serverIp=Object.values(helperInfo.NetworkSettings.Networks)[0].IPAddress;server={namespaceId:helper,ip:serverIp};
  await exec(helper,['tc','qdisc','add','dev','eth0','handle','ffff:','ingress']);
  for(const [index,actor]of ACTORS.entries()){
   // Docker reassigns auto-published host ports when its last bridge is reattached.
   // Reserve explicit loopback ports through create, then release before start;
   // a conflicting foreign bind makes start fail instead of changing the URL.
   const reservation=await reserveLoopbackPorts(2);let id;
   try{id=await create('proxy-'+actor,[...common,'--network',network,'--cap-add','NET_ADMIN','--cpus','0.5','--memory','128m','--pids-limit','64','--publish','127.0.0.1:'+reservation.ports[0]+':8080','--publish','127.0.0.1:'+reservation.ports[1]+':8081','--mount','type=bind,src='+path.join(repo,'tools/network-proxy.mjs')+',dst=/opt/network-proxy.mjs,readonly','--env','NETEM_UPSTREAM='+serverIp,'--env','NETEM_UPSTREAM_PORT=8080','--env','NETEM_AUTHORITY='+AUTHORITY,toolIdentity],{beforeStart:reservation.release});}finally{await reservation.release();}
   const info=await inspect(id),ip=Object.values(info.NetworkSettings.Networks)[0].IPAddress,proxyPort=info.NetworkSettings.Ports['8080/tcp'][0].HostPort,tcpPort=info.NetworkSettings.Ports['8081/tcp'][0].HostPort;actors[actor]={containerId:id,ip,proxyUrl:'http://127.0.0.1:'+proxyPort,tcpUrl:'http://127.0.0.1:'+tcpPort};
   const up='ifbu'+actor,down='ifbd'+actor;await exec(helper,['ip','link','add',up,'type','ifb']);await exec(helper,['ip','link','set',up,'up']);await exec(id,['ip','link','add',down,'type','ifb']);await exec(id,['ip','link','set',down,'up']);await exec(id,['tc','qdisc','add','dev','eth0','handle','ffff:','ingress']);
   await exec(helper,['tc','filter','add','dev','eth0','ingress','protocol','ip','pref',String(10+index),'flower','src_ip',ip,'dst_ip',serverIp,'ip_proto','tcp','dst_port','8080','action','mirred','egress','redirect','dev',up]);
   await exec(id,['tc','filter','add','dev','eth0','ingress','protocol','ip','pref','10','flower','src_ip',serverIp,'dst_ip',ip,'ip_proto','tcp','src_port','8080','action','mirred','egress','redirect','dev',down]);await shape(actor,{});
  }
  const config={...JSON.parse(await fs.readFile(path.join(repo,'game-host.json'),'utf8')),...runtimeConfig,port:8080};captureExpected=Array.isArray(config.runtimeCommand)&&config.runtimeCommand.some(arg=>String(arg).endsWith('start-network-runtime.mjs'));await writeJSON(path.join(root,'game-host.json'),config);if(process.getuid?.()!==1000)await fs.chown(path.join(root,'game-host.json'),1000,1000);
  assert.ok(runtimeEnv&&typeof runtimeEnv==='object'&&!Array.isArray(runtimeEnv));for(const [key,value]of Object.entries(runtimeEnv))assert.ok(/^[A-Z][A-Z0-9_]*$/.test(key)&&typeof value==='string'&&!/[\r\n\0]/.test(value),'Invalid runtime env');
  const env={...runtimeEnv,BOTSTRIKE_IMAGE_ID:qualityProvenance.imageId,BOTSTRIKE_SOURCE_REVISION:qualityProvenance.sourceRevision,BOTSTRIKE_NATIVE_PROFILE:qualityProvenance.nativeProfile,NODE_ENV:'production',BIND:'0.0.0.0',WEB_PORT:'8080',DATA_DIR:'/app/data',GAME_ORIGIN:LAB_ORIGIN,RUNTIME_TOKEN:randomBytes(32).toString('hex'),SESSION_SECRET:randomBytes(32).toString('hex'),BOTSTRIKE_NETWORK_LAB_DIR:'/app/data/network-diagnostics'};delete env.RUNTIME_URL;delete env.BOTSTRIKE_GATEWAY_PID;
  const envFile=path.join(root,'runtime.env');await fs.writeFile(envFile,Object.entries(env).map(([k,v])=>k+'='+v).join('\n')+'\n',{mode:0o600});
  const mounts=['--mount','type=bind,src='+dataDir+',dst=/app/data','--mount','type=bind,src='+path.join(root,'game-host.json')+',dst=/app/game-host.json,readonly'];
  if(devSource){const source=await fs.realpath(devSource);for(const entry of ['host','botstrike-service','dist','shared','tools','botstrike/spec.json']){const target=path.join(source,entry);await fs.access(target);mounts.push('--mount','type=bind,src='+target+',dst=/app/'+entry+',readonly');}}
  server.appId=await create('application',['--network','container:'+helper,'--read-only','--security-opt','no-new-privileges','--cap-drop','ALL','--user','1000:1000','--cpus','2','--memory','4g','--pids-limit','256','--tmpfs','/tmp:rw,noexec,nosuid,nodev,size=256m',...mounts,'--env-file',envFile,'--entrypoint','node',applicationIdentity,'host/start.mjs']);
  const redact=item=>{const result=structuredClone(item);if(result.Config?.Env)result.Config.Env=result.Config.Env.map(value=>/^[^=]*(?:TOKEN|SECRET|PASSWORD|PRIVATE_KEY)[^=]*=/i.test(value)?value.slice(0,value.indexOf('=')+1)+'[redacted]':value);return result;};
  const lab={runId,root,dataDir,origin:LAB_ORIGIN,networkId:network,imageBindings:structuredClone(imageBindings),server:structuredClone(server),get actors(){return structuredClone(actors);},shape,outage,restore,changeNetwork,artifactInventory,stats,close,inspect:async()=>({network:await inspect(network,'network'),server:redact(await inspect(server.appId)),namespace:redact(await inspect(server.namespaceId)),actors:Object.fromEntries(await Promise.all(ACTORS.map(async a=>[a,redact(await inspect(actors[a].containerId))])))})};Object.defineProperty(lab,'runtimeToken',{value:env.RUNTIME_TOKEN,enumerable:false});await writeJSON(path.join(root,'topology.json'),{runId,origin:LAB_ORIGIN,networkId:network,imageBindings,server,actors,dataDir});
  let ready=false;for(let i=0;i<60;i++){try{if((await labRequest(actors.C.tcpUrl,{timeout:1000})).status===200){ready=true;break;}}catch{}await wait(250);}assert.ok(ready,'Lab application health readiness failed');return lab;
 }catch(error){try{await close();}catch(cleanup){error.cleanupError=cleanup.message;}throw Object.assign(error,{labRoot:root});}
}
export async function labRequest(endpoint,{requestPath='/health',timeout=10000}={}){
 const url=new URL(endpoint);return new Promise((resolve,reject)=>{const request=http.request({hostname:url.hostname,port:url.port,path:requestPath,method:'GET',headers:{Host:AUTHORITY,Origin:LAB_ORIGIN},agent:false},response=>{let text='';response.on('data',bytes=>text+=bytes);response.on('end',()=>resolve({status:response.statusCode,body:text}));});request.setTimeout(timeout,()=>request.destroy(Error('Lab request timeout')));request.on('error',reject);request.end();});
}
export async function smokeNetworkLab(options={}){
 const lab=await createNetworkLab(options),report={runId:lab.runId,root:lab.root,classification:'local_kernel_IFB_transport_smoke_no_game_match',origin:lab.origin,status:'running',checks:[]};
 try{
  let healthy=false;for(let i=0;i<60;i++){try{if((await labRequest(lab.actors.C.tcpUrl,{timeout:1000})).status===200){healthy=true;break;}}catch{}await wait(250);}assert.ok(healthy,'isolated host/runtime health did not become ready');report.checks.push('normal_host_start_and_child_runtime_health');
  for(const a of ACTORS)assert.equal((await labRequest(lab.actors[a].tcpUrl)).status,200);
  await lab.shape('A',{upstream:{delayMs:15,jitterMs:2,bandwidthKbit:512,seed:41},downstream:{delayMs:20,jitterMs:3,bandwidthKbit:1024,seed:42}});assert.equal((await labRequest(lab.actors.A.tcpUrl)).status,200);report.checks.push('asymmetric_receiver_ingress_IFB_delay_jitter_rate_seed');
  await lab.shape('B',{upstream:{lossPct:2,seed:43},downstream:{burstLoss:{p:1,r:30,badLoss:100,goodLoss:0},seed:44}});report.checks.push('random_and_Gilbert_Elliott_loss_profiles_accepted');await lab.shape('B',{});await lab.shape('A',{});const cleared=await lab.stats();for(const q of [...cleared.server.qdisc,...cleared.actors.A.qdisc,...cleared.actors.B.qdisc].filter(q=>q.kind==='netem'))for(const option of ['rate','delay','loss-random','loss-gemodel'])assert.equal(q.options[option],undefined,'A cleared profile must remove previous '+option);report.checks.push('fresh_qdisc_removes_rate_jitter_and_burst_loss_options');
  const before=await lab.stats();for(const a of ACTORS)assert.ok(before.actors[a].qdisc.some(q=>q.kind==='netem'&&q.dev==='ifbd'+a));assert.equal(before.server.qdisc.filter(q=>q.kind==='netem'&&/^ifbu[ABC]$/.test(q.dev)).length,3);report.checks.push('independent_actor_receiver_filters_and_qdiscs');
  await lab.outage('A');let failed=false;try{await labRequest(lab.actors.A.tcpUrl,{timeout:1200});}catch{failed=true;}assert.equal(failed,true);assert.equal((await labRequest(lab.actors.C.tcpUrl)).status,200);await lab.restore('A');assert.equal((await labRequest(lab.actors.A.tcpUrl)).status,200);report.checks.push('outage_100_percent_restore_and_control_actor_unaffected');
  await lab.stats();report.status='passed';
 }catch(error){report.status='failed';report.error=error.message;throw Object.assign(error,{labRoot:lab.root});}
 finally{try{await lab.close();report.cleanup='owned_IDs_only_complete';}finally{await writeJSON(path.join(lab.root,'smoke.json'),report);}}
 return report;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{assert.equal(process.argv[2],'--smoke','Usage: node tools/network-lab.mjs --smoke');const report=await smokeNetworkLab();console.log(JSON.stringify({status:report.status,root:report.root}));}catch(error){console.error(JSON.stringify({status:'failed',message:error.message,root:error.labRoot||null}));process.exitCode=1;}
}
