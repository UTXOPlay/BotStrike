import * as filesystem from 'node:fs/promises';
import path from 'node:path';
import {careerRecoveryRequired} from './career.mjs';
const validRoom=id=>typeof id==='string'&&/^[a-f0-9]{24}$/.test(id);
const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
function invalid(message){return Object.assign(Error(message),{code:'INVALID_DATA'});}
function parse(bytes){try{return JSON.parse(bytes);}catch{throw invalid('Invalid storage JSON');}}
const defaultAlert=alert=>console.error('Replay retention',alert.stage,alert.roomId||'',alert.code);
// Run only against the private service data directory. No active records or
// arbitrary paths/symlinks are followed. The user selected a 30-day retention.
export async function pruneReplays(data,{days=30,now=Date.now(),protectedRooms=new Set(),onAlert=defaultAlert,io={}}={}){
 if(!Number.isFinite(days)||days<1)throw Error('Retention must be at least one day');
 if(!Number.isFinite(now))throw Error('Invalid retention clock');
 const fs={...filesystem,...io};
 const alert=(error,stage,roomId)=>{const value={source:'retention',stage,code:typeof error?.code==='string'&&/^[A-Z0-9_]+$/.test(error.code)?error.code:'IO_ERROR',...(roomId?{roomId}:{})};try{onAlert(value);}catch{console.error('Replay retention alert observer failed');}};
 const entries=async(directory,stage)=>{try{return await fs.readdir(directory,{withFileTypes:true});}catch(error){if(error.code==='ENOENT')return[];alert(error,stage);throw error;}};
 const cutoff=now-days*86400000,removed=[];
 for(const entry of await entries(path.join(data,'rooms'),'room-scan')){
  if(!entry.isDirectory()||!(/^[a-f0-9]{24}$/).test(entry.name)||protectedRooms.has(entry.name))continue;
  const dir=path.join(data,'rooms',entry.name);
  try {
   const file=path.join(dir,'room.json'),metadata=await fs.lstat(file);
   if(!metadata.isFile()||metadata.isSymbolicLink())throw invalid('Room metadata is not a regular file');
   const room=parse(await fs.readFile(file,'utf8'));
   if(!object(room)||!['running','waiting','sealing','finished','failed','cancelled','interrupted','expired'].includes(room.status)||room.id!==undefined&&room.id!==entry.name||!Number.isFinite(room.finishedAt??room.created))throw invalid('Invalid retention room metadata');
   // Recovery is not a best-effort precondition. Keep the only attribution
   // source even if a caller forgets to merge the recovery protection set.
   if(careerRecoveryRequired(room)){
    alert(Object.assign(Error('Career recovery pending'),{code:'CAREER_PENDING'}),'career-pending',entry.name);continue;
   }
   const modified=metadata.mtimeMs;
   // Interrupted on-disk rooms after a crash are safe to expire only when no
   // live room protects them and both their creation and last write are old.
   if(Math.max(room.finishedAt||room.created||now,modified)>=cutoff)continue;
   await fs.rm(dir,{recursive:true});removed.push(entry.name);
  } catch(error){alert(error,'room',entry.name);}
 }
 for(const entry of await entries(path.join(data,'accounts'),'account-scan')){
  if(!entry.isFile()||!(/^[a-f0-9]{64}\.json$/).test(entry.name))continue;
  const file=path.join(data,'accounts',entry.name);
  try{const metadata=await fs.lstat(file);if(!metadata.isFile()||metadata.isSymbolicLink())throw invalid('Account reference is not a regular file');
   const item=parse(await fs.readFile(file,'utf8'));if(!object(item)||!Object.hasOwn(item,'room')||item.room!==null&&!validRoom(item.room))throw invalid('Invalid account room reference');if(protectedRooms.has(item.room))continue;
   if(metadata.mtimeMs<cutoff){let exists=item.room!==null;if(exists)try{const room=await fs.lstat(path.join(data,'rooms',item.room));if(!room.isDirectory()||room.isSymbolicLink())throw invalid('Referenced room is not a regular directory');}catch(error){if(error.code!=='ENOENT')throw error;exists=false;}if(!exists)await fs.rm(file);}
  }catch(error){alert(error,'account');}
 }
 return removed;
}
