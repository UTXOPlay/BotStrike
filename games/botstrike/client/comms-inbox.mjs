import {commsKinds} from '../../../shared/tactical-callouts.mjs';
export class CommsInbox{
 constructor(){this.reset();}
 reset(){this.room=null;this.revision=-1;this.tick=-1;this.after=Infinity;this.rows=new Map();this.ended=new Set();this.muted=[];}
 accept(room,now){
  if(!room?.state||room.status!=='running'){this.reset();return;}
  const s=room.state,newSession=room.id!==this.room;if(newSession){this.reset();this.room=room.id;this.after=s.tick;}
  const packet=room.comms;if(!packet||!Number.isSafeInteger(packet.revision)||packet.revision<0||packet.revision<this.revision||s.tick<this.tick)return;
  this.tick=s.tick;this.revision=packet.revision;
  if(newSession)for(const row of Array.isArray(packet.events)?packet.events.slice(-30):[])if(typeof row.id==='string')this.ended.add(row.id);
  if(!['buy','live'].includes(s.phase)){for(const id of this.rows.keys())this.ended.add(id);this.rows.clear();this.after=s.tick;return;}
  const next=new Map();
  for(const row of Array.isArray(packet.events)?packet.events.slice(-30):[]){
   if(typeof row.id!=='string'||row.id.length>96||this.ended.has(row.id)||!commsKinds.includes(row.kind)||!Number.isInteger(row.sender)||row.sender<0||row.sender>=10||!Number.isInteger(row.tick)||row.tick<this.after||row.tick>s.tick||s.tick-row.tick>=320||!Array.isArray(row.position)||row.position.length!==3||!row.position.every(Number.isFinite)||!Number.isFinite(row.remainingMs)||row.remainingMs<=0)continue;
   const expiry=Math.min(this.rows.get(row.id)?.expiry??Infinity,now+Math.min(5000,row.remainingMs));
   if(expiry>now)next.set(row.id,{...row,position:[...row.position],expiry});else this.ended.add(row.id);
  }
  for(const id of this.rows.keys())if(!next.has(id))this.ended.add(id);this.rows=next;
  this.muted=(Array.isArray(packet.muted)?packet.muted:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<10).slice(0,9);
  if(this.ended.size>256)this.ended=new Set([...this.ended].slice(-128));
 }
 active(now){for(const [id,row]of this.rows)if(row.expiry<=now){this.rows.delete(id);this.ended.add(id);}return [...this.rows.values()];}
}
