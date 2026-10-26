import {mkdir,readFile,writeFile,rename,readdir,stat,utimes} from 'node:fs/promises';
import path from 'node:path';
const valid=id=>/^[a-f0-9]{64}$/.test(id||'');
export function trackHumanFrame(room,state){
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
 constructor(data){this.data=data;this.directory=path.join(data,'careers');this.chain=Promise.resolve();}
 async read(id){if(!valid(id))throw Error('Invalid career account');try{return JSON.parse(await readFile(path.join(this.directory,id+'.json'),'utf8'));}catch(e){if(e.code==='ENOENT')return empty();throw e;}}
 async view(id){await this.chain;const {applied,...view}=await this.read(id);return view;}
 commit(room){const job=async()=>{
  if(room.status!=='finished'||!room.proof?.verified)return;
  await mkdir(this.directory,{recursive:true,mode:0o700});
  for(const [id,p]of Object.entries(room.participants||{})){
   if(!valid(id)||!p.ticks)continue;
   const s=await this.read(id);if(s.applied[room.id])continue;
   const finished=room.members.includes(id)&&room.state.tick-p.lastTick<=64*30;
   const outcome=!finished?'left':room.state.winner==null?'draw':room.state.winner===p.team?'win':'loss';
   s.matches++;if(outcome==='win')s.wins++;if(outcome==='loss')s.losses++;if(outcome==='draw')s.draws++;
   for(const key of ['kills','deaths','damage','ticks'])s[key]+=p[key];
   s.history.unshift({id:room.id,finishedAt:room.finishedAt,map:room.config.map,mode:room.config.mode,difficulty:room.config.difficulty,kind:room.kind,outcome,kills:p.kills,deaths:p.deaths,damage:p.damage,seconds:Math.round(p.ticks/64),score:room.state.score});
   s.history=s.history.sort((a,b)=>b.finishedAt-a.finishedAt).slice(0,50);s.applied[room.id]=true;
   const file=path.join(this.directory,id+'.json');await writeFile(file+'.tmp',JSON.stringify(s),{mode:0o600});await rename(file+'.tmp',file);
  }
 };const result=this.chain.then(job);this.chain=result.catch(()=>{});return result;}
 async recover(){
  for(const entry of await readdir(path.join(this.data,'rooms'),{withFileTypes:true})){
   if(!entry.isDirectory()||!/^[a-f0-9]{24}$/.test(entry.name))continue;
   try{const file=path.join(this.data,'rooms',entry.name,'room.json'),room=JSON.parse(await readFile(file,'utf8'));if(room.status!=='finished'||!room.proof?.verified||room.careerCommitted||!Object.keys(room.participants||{}).length)continue;const metadata=await stat(file);await this.commit(room);room.careerCommitted=true;await writeFile(file+'.tmp',JSON.stringify(room),{mode:0o600});await rename(file+'.tmp',file);await utimes(file,metadata.atime,metadata.mtime);}catch(e){if(e.code!=='ENOENT')console.error('Career recovery',entry.name,e.message);}
  }
 }
}
