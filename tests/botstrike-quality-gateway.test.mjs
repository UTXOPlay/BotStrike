import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {once} from 'node:events';
import {WebSocket} from 'ws';
import {createBotStrike,gatewayProcessId} from '../botstrike-service/server.mjs';
import {takeGatewayReport} from '../botstrike-service/quality-report.mjs';
const summary=()=>({type:'host_quality',version:1,rttMs:10,jitterMs:null,upstreamQueueBytes:0,downstreamQueueBytes:0});
const count=(store,metric)=>store.snapshot().series.find(row=>row.metric===metric&&row.cohort==='all')?.count||0;
async function until(predicate){const end=Date.now()+5000;while(Date.now()<end){if(predicate())return;await new Promise(resolve=>setTimeout(resolve,5));}throw Error('Gateway fixture timeout');}
async function fixture(t,options={}){
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-gateway-admission-')),secret='gateway-admission-fixture-'.repeat(2),service=createBotStrike({data,secret,sampleResources:false,qualityOptions:{flushIntervalMs:0},...options}),clients=[];
 await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));await service.quality.ready;
 t.after(async()=>{for(const ws of clients)ws.terminate();await service.close();await rm(data,{recursive:true,force:true});});
 async function connect(trusted){const messages=[],ws=new WebSocket('ws://127.0.0.1:'+service.server.address().port+'/api/socket',{headers:{'X-Runtime-Token':secret,'X-UTXOPlay-Account':'a'.repeat(64),...(trusted?{'X-BotStrike-Transport':'host-proxy-v1'}:{})}});clients.push(ws);ws.on('error',()=>{});ws.on('message',raw=>messages.push(JSON.parse(raw)));await once(ws,'open');await until(()=>messages.some(m=>m.type==='control'));return{ws,messages,send:value=>ws.send(JSON.stringify(value))};}
 return{service,connect};
}
test('gateway PID accepts only complete positive integer values and is registered only after validation',async t=>{
 for(const value of [undefined,null,'',' 12','12 ','+12','01','1e3','1.0','-1','0','2147483648',NaN,Infinity,1.5,{}])assert.equal(gatewayProcessId(value),null);
 assert.equal(gatewayProcessId('1'),1);assert.equal(gatewayProcessId(123),123);assert.equal(gatewayProcessId('2147483647'),2147483647);
 const f=await fixture(t,{sampleResources:true,gatewayPid:'2147483000'});assert.ok(f.service.resourceSampler.roots.has('gateway/2147483000'));
 const invalid=await fixture(t,{sampleResources:true,gatewayPid:'12garbage'});assert.equal([...invalid.service.resourceSampler.roots.values()].some(root=>root.role==='gateway'),false);assert.equal(invalid.service.resourceSampler.snapshot().gateway.reason,'gateway_not_supplied');
});
test('gateway diagnostic bucket has bounded burst/refill independent of ordinary command state',()=>{
 const socket={};assert.equal(takeGatewayReport(socket,0),true);assert.equal(takeGatewayReport(socket,0),true);assert.equal(takeGatewayReport(socket,0),false);assert.equal(takeGatewayReport(socket,4999),false);assert.equal(takeGatewayReport(socket,5000),true);assert.equal(takeGatewayReport(socket,5000),false);assert.equal(takeGatewayReport(socket,20000),true);assert.equal(takeGatewayReport(socket,20000),true);assert.equal(takeGatewayReport(socket,20000),false);
});
test('trusted bounded metadata cannot consume the 100 ordinary commands, and excess diagnostics leave input budget usable',async t=>{
 const f=await fixture(t),peer=await f.connect(true);
 for(let i=0;i<100;i++){if(i===0||i===30||i===60)peer.send(summary());peer.send({type:'ping',time:i});}
 await until(()=>peer.messages.filter(m=>m.type==='pong').length===100);assert.equal(peer.ws.readyState,WebSocket.OPEN);assert.equal(count(f.service.quality,'gatewayReports'),2);assert.equal(count(f.service.quality,'gatewayReportsRejected'),1);
 const closed=once(peer.ws,'close');peer.send({type:'ping',time:101});assert.equal((await closed)[0],1008,'the ordinary 101st command still enforces its original limit');
});
test('unmarked peers cannot use the trusted diagnostic bypass and invalid gateway schema cannot partially ingest',async t=>{
 const f=await fixture(t),untrusted=await f.connect(false);
 for(let i=0;i<5;i++)untrusted.send(summary());for(let i=0;i<95;i++)untrusted.send({type:'ping',time:i});await until(()=>untrusted.messages.filter(m=>m.type==='pong').length===95);assert.equal(count(f.service.quality,'gatewayReports'),0);assert.equal(count(f.service.quality,'gatewayReportsRejected'),5);
 const closed=once(untrusted.ws,'close');untrusted.send({type:'ping',time:100});assert.equal((await closed)[0],1008);
 const trusted=await f.connect(true),before=count(f.service.quality,'gatewayReportsRejected');trusted.send({...summary(),account:'not-allowed'});trusted.send(summary());trusted.send(summary());await until(()=>count(f.service.quality,'gatewayReportsRejected')===before+2);assert.equal(count(f.service.quality,'gatewayReports'),1);assert.equal(trusted.ws.readyState,WebSocket.OPEN);trusted.send({type:'ping',time:999});await until(()=>trusted.messages.some(m=>m.type==='pong'&&m.time===999));
});
