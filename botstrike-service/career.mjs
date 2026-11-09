import * as filesystem from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import path from 'node:path';
const valid=id=>/^[a-f0-9]{64}$/.test(id||'');
const validRoom=id=>/^[a-f0-9]{24}$/.test(id||'');
const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const counter=value=>Number.isSafeInteger(value)&&value>=0;
const counters=['matches','wins','losses','draws','kills','deaths','damage','ticks'];
function invalid(message){return Object.assign(Error(message),{code:'INVALID_DATA'});}
function parse(bytes){try{return JSON.parse(bytes);}catch{throw invalid('Invalid storage JSON');}}
function requireValue(condition,message){if(!condition)throw invalid(message);}
function validateCareer(value){
 requireValue(object(value)&&value.version===1,'Unsupported or damaged career record');
 requireValue(counters.every(key=>counter(value[key])),'Invalid career counters');
 requireValue(object(value.applied)&&Object.entries(value.applied).every(([id,applied])=>validRoom(id)&&applied===true),'Invalid career application ledger');
 requireValue(Object.keys(value.applied).length===value.matches&&value.wins+value.losses+value.draws<=value.matches,'Career counters disagree with application ledger');
 requireValue(Array.isArray(value.history)&&value.history.length<=50&&value.history.length<=value.matches,'Invalid career history');
 requireValue(value.history.every(item=>object(item)&&validRoom(item.id)&&value.applied[item.id]===true&&Number.isFinite(item.finishedAt)&&['left','draw','win','loss'].includes(item.outcome)&&['kills','deaths','damage','seconds'].every(key=>counter(item[key]))&&Array.isArray(item.score)&&item.score.length===2&&item.score.every(counter)),'Damaged career history entry');
 return value;
}
// Old recordings without participant attribution are deliberately not backfilled.
// This shared check also lets retention fail closed when recovery was not called.
function careerSource(room){
 requireValue(object(room),'Invalid room record');
 if(room.config?.mode==='practice'||room.config?.ruleset==='tactical'||room.status!=='finished'||room.proof?.verified!==true)return null;
 if(room.participants==null)return null;
 requireValue(object(room.participants),'Invalid participant attribution');
 if(!Object.keys(room.participants).length)return null;
 requireValue(validRoom(room.id),'Invalid career source room');
 requireValue(room.careerCommitted===undefined||typeof room.careerCommitted==='boolean','Invalid career commit marker');
 requireValue(Array.isArray(room.members)&&room.members.every(id=>typeof id==='string'),'Invalid source membership');
 requireValue(object(room.config)&&['deathmatch','demolition'].includes(room.config.mode)&&Number.isInteger(room.config.map)&&room.config.map>=0&&room.config.map<3&&Number.isInteger(room.config.difficulty)&&room.config.difficulty>=0&&room.config.difficulty<3,'Invalid source configuration');
 requireValue(object(room.state)&&counter(room.state.tick)&&(room.state.winner===null||room.state.winner===0||room.state.winner===1)&&Array.isArray(room.state.score)&&room.state.score.length===2&&room.state.score.every(counter)&&Number.isFinite(room.finishedAt),'Invalid completed source result');
 for(const [id,p]of Object.entries(room.participants))requireValue(valid(id)&&object(p)&&['ticks','lastTick','kills','deaths','damage'].every(key=>counter(p[key]))&&p.lastTick<=room.state.tick&&(p.team===0||p.team===1),'Invalid human attribution');
 return Object.entries(room.participants).filter(([,p])=>p.ticks>0);
}
export function careerRecoveryRequired(room){return careerSource(room)!==null&&room.careerCommitted!==true;}
const errorCode=error=>typeof error?.code==='string'&&/^[A-Z0-9_]+$/.test(error.code)?error.code:'IO_ERROR';
const defaultAlert=alert=>console.error('Career storage',alert.stage,alert.roomId||'',alert.code);
async function operation(stage,job){try{return await job();}catch(error){if(!(error instanceof Error))error=Error(String(error));error.careerStage??=stage;throw error;}}
export function trackHumanFrame(room,state){
 if((room.config?.mode==='practice'||room.config?.ruleset==='tactical'))return;
 room.participants??={};
 for(const [slot,id]of (room.controlled||[]).entries())if(valid(id)){
  const p=room.participants[id]??={kills:0,deaths:0,damage:0,ticks:0,lastTick:0,team:Math.floor(slot/5)};
  p.ticks++;p.lastTick=state.tick;p.team=Math.floor(slot/5);
 }
 for(const e of state.events){const actor=room.participants[room.controlled?.[e.actor]],target=room.participants[room.controlled?.[e.target]];
  if(e.kind==='kill'){if(actor)actor.kills++;if(target)target.deaths++;}
  if((e.kind==='hit'||e.kind==='headshot')&&actor)actor.damage+=e.value;
 }
}
const empty=()=>({version:1,matches:0,wins:0,losses:0,draws:0,kills:0,deaths:0,damage:0,ticks:0,history:[],applied:{}});
export class CareerStore{
 constructor(data,{io={},onAlert=defaultAlert}={}){this.data=data;this.directory=path.join(data,'careers');this.chain=Promise.resolve();this.io={...filesystem,...io};this.onAlert=onAlert;}
 enqueue(job){const result=this.chain.then(job);this.chain=result.catch(()=>{});return result;}
 alert(error,roomId,report){
  for(const failure of error.failures||[error]){
   const alert={source:'career',stage:failure.careerStage||'source',code:errorCode(failure),...(validRoom(roomId)?{roomId}:{})};
   report?.alerts.push(alert);
   try{this.onAlert(alert);}catch{console.error('Career storage alert observer failed');}
  }
 }
 async read(id,{allowMissing=true}={}){
  if(!valid(id))throw invalid('Invalid career account');
  return operation('account-read',async()=>{
   const file=path.join(this.directory,id+'.json');
   let metadata;try{metadata=await this.io.lstat(file);}catch(error){if(error.code==='ENOENT'&&allowMissing)return empty();throw error;}
   requireValue(metadata.isFile()&&!metadata.isSymbolicLink(),'Career record is not a regular file');return validateCareer(parse(await this.io.readFile(file,'utf8')));
  });
 }
 async view(id){await this.chain;const {applied,...view}=await this.read(id);return view;}
 async syncDirectory(directory){const handle=await this.io.open(directory,'r');try{await handle.sync();}finally{await handle.close();}}
 async syncExisting(file){const handle=await this.io.open(file,'r');try{await handle.sync();}finally{await handle.close();}await this.syncDirectory(path.dirname(file));}
 async atomic(file,value,metadata){
  const temporary=file+'.tmp-'+randomUUID();let handle;
  try{
   handle=await this.io.open(temporary,'wx',0o600);await handle.writeFile(JSON.stringify(value));
   // Apply the old retention timestamp before rename; a failed utimes must not
   // publish a successful marker or extend a recording's lifetime.
   if(metadata)await handle.utimes(metadata.atime,metadata.mtime);
   await handle.sync();await handle.close();handle=null;
   await this.io.rename(temporary,file);await this.syncDirectory(path.dirname(file));
  }finally{if(handle)await handle.close().catch(()=>{});await this.io.unlink(temporary).catch(()=>{});}
 }
 async apply(room){
  const participants=careerSource(room);if(participants===null)return{status:'skipped',applied:0,alreadyApplied:0};
  await operation('account-directory',async()=>{await this.io.mkdir(this.directory,{recursive:true,mode:0o700});await this.syncDirectory(this.data);});
  const result={status:'committed',applied:0,alreadyApplied:0},failures=[];
  for(const [id,p]of participants)try{
   const s=await this.read(id);const file=path.join(this.directory,id+'.json');
   if(s.applied[room.id]){await operation('account-sync',()=>this.syncExisting(file));result.alreadyApplied++;continue;}
   const finished=room.members.includes(id)&&room.state.tick-p.lastTick<=64*30;
   const outcome=!finished?'left':room.state.winner==null?'draw':room.state.winner===p.team?'win':'loss';
   s.matches++;if(outcome==='win')s.wins++;if(outcome==='loss')s.losses++;if(outcome==='draw')s.draws++;
   for(const key of ['kills','deaths','damage','ticks'])s[key]+=p[key];
   s.history.unshift({id:room.id,finishedAt:room.finishedAt,map:room.config.map,mode:room.config.mode,difficulty:room.config.difficulty,kind:room.kind,outcome,kills:p.kills,deaths:p.deaths,damage:p.damage,seconds:Math.round(p.ticks/64),score:room.state.score});
   s.history=s.history.sort((a,b)=>b.finishedAt-a.finishedAt).slice(0,50);s.applied[room.id]=true;
   validateCareer(s);await operation('account-write',()=>this.atomic(file,s));result.applied++;
  }catch(error){failures.push(error);}
  if(failures.length)throw Object.assign(new AggregateError(failures,'Career commit incomplete'),{code:'CAREER_INCOMPLETE',failures,partial:result});
  return result;
 }
 commit(room){return this.enqueue(async()=>{try{return await this.apply(room);}catch(error){this.alert(error,room?.id);throw error;}});}
 recover(){return this.enqueue(async()=>{
  const report={scanComplete:true,complete:true,scanned:0,recovered:0,pending:0,protectedRooms:new Set(),alerts:[]};let entries;
  try{entries=await operation('scan',()=>this.io.readdir(path.join(this.data,'rooms'),{withFileTypes:true}));}
  catch(error){if(error.code==='ENOENT')return report;report.scanComplete=report.complete=false;this.alert(error,undefined,report);return report;}
  for(const entry of entries){
   if(!entry.isDirectory()||!validRoom(entry.name))continue;
   report.scanned++;
   try{
    const file=path.join(this.data,'rooms',entry.name,'room.json');
    const {room,metadata}=await operation('room-read',async()=>{const metadata=await this.io.lstat(file);requireValue(metadata.isFile()&&!metadata.isSymbolicLink(),'Room metadata is not a regular file');return{metadata,room:parse(await this.io.readFile(file,'utf8'))};});
    const participants=careerSource(room);if(participants===null)continue;
    requireValue(room.id===entry.name,'Room identity differs from recovery directory');
    if(room.careerCommitted===true){
     // A committed marker with a missing/corrupt aggregate is ambiguous. Never
     // silently reset/reapply it: retain the source for operator repair.
     for(const [id]of participants){const account=await this.read(id,{allowMissing:false});requireValue(account.applied[room.id]===true,'Committed room is missing from career ledger');}
     continue;
    }
    await this.apply(room);room.careerCommitted=true;
    await operation('room-mark',()=>this.atomic(file,room,metadata));report.recovered++;
   }catch(error){report.complete=false;report.protectedRooms.add(entry.name);this.alert(error,entry.name,report);}
  }
  report.pending=report.protectedRooms.size;return report;
 });
 }
}
