import {readdir,readFile,stat,rm} from 'node:fs/promises';
import path from 'node:path';
const active=new Set(['running','waiting','sealing']);
// Run only against the private service data directory. No active records or
// arbitrary paths/symlinks are followed. The user selected a 30-day retention.
export async function pruneReplays(data,{days=30,now=Date.now(),protectedRooms=new Set()}={}){
 if(!Number.isFinite(days)||days<1)throw Error('Retention must be at least one day');
 const cutoff=now-days*86400000,removed=[];
 for(const entry of await readdir(path.join(data,'rooms'),{withFileTypes:true})){
  if(!entry.isDirectory()||!(/^[a-f0-9]{24}$/).test(entry.name)||protectedRooms.has(entry.name))continue;
  const dir=path.join(data,'rooms',entry.name);
  try {
   const room=JSON.parse(await readFile(path.join(dir,'room.json'),'utf8'));
   const modified=(await stat(path.join(dir,'room.json'))).mtimeMs;
   // Interrupted on-disk rooms after a crash are safe to expire only when no
   // live room protects them and both their creation and last write are old.
   if(Math.max(room.finishedAt||room.created||now,modified)>=cutoff)continue;
   if(active.has(room.status)&&protectedRooms.has(entry.name))continue;
   await rm(dir,{recursive:true});removed.push(entry.name);
  } catch(error){if(error.code!=='ENOENT')console.error('Replay retention skipped',entry.name,error.message);}
 }
 for(const entry of await readdir(path.join(data,'accounts'),{withFileTypes:true})){
  if(!entry.isFile()||!(/^[a-f0-9]{64}\.json$/).test(entry.name))continue;
  const file=path.join(data,'accounts',entry.name);
  try{const item=JSON.parse(await readFile(file,'utf8'));if(protectedRooms.has(item.room))continue;
   if((await stat(file)).mtimeMs<cutoff){let exists=true;try{await stat(path.join(data,'rooms',String(item.room)));}catch{exists=false;}if(!item.room||!exists)await rm(file);}
  }catch(error){if(error.code!=='ENOENT')console.error('Account retention skipped',error.message);}
 }
 return removed;
}
