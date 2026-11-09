import {mkdtemp,rm} from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {WebSocket} from 'ws';
import {createBotStrike} from '../botstrike-service/server.mjs';
import {trackSocketDelivery} from './ws-delivery-client.mjs';
export const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
export async function until(predicate,timeout=5000){const end=performance.now()+timeout;while(performance.now()<end){const value=await predicate();if(value)return value;await delay(2);}throw Error('Observer fixture timed out');}
export async function observerFixture(options={}){
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-observer-')),secret='isolated-native-observer-fixture-2050',account='1'.padStart(64,'0'),events=[],messages=[];
 const service=createBotStrike({data,secret,sampleResources:false,qualityOptions:{flushIntervalMs:0},observe:event=>events.push(event),...options});let ws,room,stopped=false;
 await new Promise(resolve=>service.server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+service.server.address().port,headers={'Content-Type':'application/json','X-Runtime-Token':secret,'X-UTXOPlay-Account':account};
 const response=await fetch(base+'/api/action',{method:'POST',headers,body:JSON.stringify({type:'create',kind:'practice',mode:'deathmatch',map:0,hero:0,difficulty:0,drill:0})});if(response.status!==200)throw Error('Fixture room creation failed');const made=await response.json();room=service.rooms.get(made.room.id);
 ws=new WebSocket(base.replace('http','ws')+'/api/socket',{headers});const delivery=trackSocketDelivery(ws);ws.on('message',raw=>messages.push(JSON.parse(raw)));await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject);});await delivery.ready(room.id);
 async function stop(){if(stopped)return;stopped=true;ws.terminate();const child=room.child,exited=child&&child.exitCode===null&&child.signalCode===null?new Promise(resolve=>child.once('exit',resolve)):Promise.resolve();await service.close();await exited;await until(()=>!room.recordingPending);}
 return{data,room,service,events,messages,delivery,send:(input,receipt=delivery.get(room.id))=>ws.send(JSON.stringify({type:'input',room:room.id,input,delivery:receipt})),claim:()=>ws.send(JSON.stringify({type:'claim',room:room.id})),stop,cleanup:async()=>{await stop();await rm(data,{recursive:true,force:true});}};
}
