// Large JSON parsing/stringification and replay I/O never occupy the match loop.
import {parentPort,workerData} from 'node:worker_threads';
import {readFileSync,writeFileSync,renameSync} from 'node:fs';
import {spawn} from 'node:child_process';
import path from 'node:path';
const {directory,assets,room,players,result}=workerData;
const save=(file,value)=>{writeFileSync(file+'.tmp',JSON.stringify(value),{mode:0o600});renameSync(file+'.tmp',file);};
try {
 save(path.join(directory,'match.json'),{type:'match',room,players,tape:readFileSync(path.join(directory,'tape.jsonl'),'utf8'),result});
 const output=await new Promise((resolve,reject)=>{
  const child=spawn(path.join(assets,'myelin-botstrike'),['record',path.join(directory,'myelin'),path.join(directory,'match.json')],{env:{...process.env,BOTSTRIKE_ASSETS:assets,TMPDIR:directory},stdio:['ignore','pipe','pipe']});
  let bytes=0,error='',chunks=[];const timeout=setTimeout(()=>child.kill('SIGKILL'),300000);
  child.stdout.on('data',b=>{bytes+=b.length;if(bytes>400_000_000)child.kill('SIGKILL');else chunks.push(b);});
  child.stderr.on('data',b=>{if(error.length<2000)error+=b;});
  child.on('error',e=>{clearTimeout(timeout);reject(e);});
  child.on('exit',code=>{clearTimeout(timeout);code===0?resolve(Buffer.concat(chunks).toString()):reject(Error(error||'Replay worker failed'));});
 });
 const out=JSON.parse(output);save(path.join(directory,'export.json'),out.export);
 parentPort.postMessage({proof:{...out.session,verified:out.replay.verified,frames:out.replay.frames,tapeHash:out.game.tape_hash}});
} catch(error){parentPort.postMessage({error:error.message});}
