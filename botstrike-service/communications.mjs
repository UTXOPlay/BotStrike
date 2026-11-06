import {canSee} from './visibility.mjs';
import {commsKinds,calloutAt} from '../shared/tactical-callouts.mjs';
import {onTerrain} from '../shared/ping-geometry.mjs';
export const commsPolicy={version:'quick-comms-v1',lifetimeMs:5000,lifetimeTicks:320,burst:3,refillMs:1500,maximumEvents:30};
// In-memory service policy. No signed configuration, recorded input or replay
// state is changed. Account/session ownership remains in the socket boundary.
export class Communications{
 constructor({now=()=>performance.now()}={}){this.now=now;this.events=[];this.quotas=new Map();this.mutes=new Map();this.views=new Map();this.serial=[0,0];this.revision=0;}
 disconnect(account){const count=this.events.length;this.events=this.events.filter(e=>e.account!==account);if(this.events.length!==count)this.revision++;}
 mute(room,recipient,sender,muted){
  const a=room.members.indexOf(recipient),b=room.members.indexOf(sender),s=room.state;
  if(a<0||b<0||a===b||s.players[a].team!==s.players[b].team||sender.startsWith('bot-')||typeof muted!=='boolean')throw Error('Choose a squad pilot to mute');
  const set=this.mutes.get(recipient)||new Set();if(set.has(sender)!==muted)this.revision++;if(muted)set.add(sender);else set.delete(sender);this.mutes.set(recipient,set);
 }
 send(room,account,message,spec){
  const s=room.state,slot=room.members.indexOf(account),self=s?.players[slot];
  if(room.status!=='running'||!s||slot<0||message.room!==room.id||!['buy','live'].includes(s.phase)||!commsKinds.includes(message.kind)||message.life!==self.life||message.map!==s.config.map)throw Error('Refresh the current match before sending a ping');
  // Disallow client identity/expiry/label claims rather than silently accepting
  // spoofed fields; sender, context, target snapshot and TTL come from service.
  if(Object.keys(message).some(k=>!['type','room','controlToken','kind','life','map','position','target'].includes(k)))throw Error('Invalid communication fields');
  const chosen=s.players[room.spectating?.[account]],viewer=self.alive?self:chosen?.alive&&chosen.team===self.team?chosen:s.players.find(p=>p.alive&&p.team===self.team);
  if(!viewer)throw Error('No living squad viewpoint');
  const map=spec.maps[s.config.map];let position,target;
  if(message.target!==undefined){
   const p=Number.isInteger(message.target)&&s.players[message.target];
   if(message.kind!=='enemy'||message.position!==undefined||!p?.alive||p.team===self.team||!canSee(s,viewer,p,map,spec.hit_regions))throw Error('Enemy attachment requires current authorized sight or reveal');
   position=[...p.position];target={slot:p.slot,life:p.life,seenTick:s.tick};
  }else{if(!onTerrain(map,message.position))throw Error('Choose a point on public map terrain');position=[...message.position];}
  const now=this.now();for(const [id,q]of this.quotas)if(!room.members.includes(id)&&now-q.at>commsPolicy.refillMs*commsPolicy.burst)this.quotas.delete(id);
  if(!this.quotas.has(account)&&[...this.quotas.values()].filter(q=>q.team===self.team).length>=32)throw Error('Communication capacity reached');
  const old=this.quotas.get(account)||{tokens:commsPolicy.burst,at:now},tokens=Math.min(commsPolicy.burst,old.tokens+Math.max(0,now-old.at)/commsPolicy.refillMs);
  if(tokens<1)throw Error('Ping limit: wait a moment');this.quotas.set(account,{tokens:tokens-1,at:now,team:self.team});
  const entry={id:room.id+':'+self.team+':'+ ++this.serial[self.team],account,sender:slot,team:self.team,kind:message.kind,position,target,callout:calloutAt(map,s.config.map,position).id,tick:s.tick,life:self.life,createdAt:now};
  const recent=this.events.filter(e=>now-e.createdAt<commsPolicy.lifetimeMs),own=new Set(recent.filter(e=>e.account===account).slice(-2).map(e=>e.id));
  this.events=recent.filter(e=>e.account!==account||own.has(e.id)).slice(-(commsPolicy.maximumEvents-1));this.events.push(entry);this.revision++;return entry.id;
 }
 view(room,recipient,connected){
  const s=room.state,slot=room.members.indexOf(recipient),self=s?.players[slot];if(!self||room.status!=='running'||!connected(recipient))return {events:[],muted:[],revision:this.views.get(recipient)?.revision??0};
  for(const [account,set]of this.mutes){if(!room.members.includes(account)){this.mutes.delete(account);continue;}for(const id of set)if(!room.members.includes(id))set.delete(id);}
  const count=this.events.length,now=this.now();this.events=this.events.filter(e=>now-e.createdAt<commsPolicy.lifetimeMs&&s.tick-e.tick<commsPolicy.lifetimeTicks&&s.tick>=e.tick&&room.members[e.sender]===e.account&&s.players[e.sender]?.life===e.life&&connected(e.account));if(count!==this.events.length)this.revision++;
  const muted=this.mutes.get(recipient)||new Set();
  const events=this.events.filter(e=>e.team===self.team&&!muted.has(e.account)).map(e=>({id:e.id,sender:e.sender,kind:e.kind,position:[...e.position],...(e.target?{target:{...e.target}}:{}),callout:e.callout,tick:e.tick,remainingMs:Math.min(commsPolicy.lifetimeMs-(now-e.createdAt),(commsPolicy.lifetimeTicks-(s.tick-e.tick))*1000/64)})),mutedSlots=room.members.flatMap((a,i)=>muted.has(a)?[i]:[]);
  // A global revision/serial would disclose enemy communication activity. Wire
  // epochs advance only when this recipient's entitled projection changes.
  const fingerprint=JSON.stringify([events.map(e=>e.id),mutedSlots]),old=this.views.get(recipient)||{fingerprint:'[[],[]]',revision:0};
  const revision=old.revision+Number(old.fingerprint!==fingerprint);this.views.set(recipient,{fingerprint,revision});for(const id of this.views.keys())if(!room.members.includes(id))this.views.delete(id);
  return {revision,events,muted:mutedSlots};
 }
}
export function communicationCommand(room,account,socket,owner,message,spec,connected){
 if(!room||owner!==socket||!socket||typeof message.controlToken!=='string'||message.controlToken!==socket.controlToken||message.room!==room.id||!connected(account))throw Error('Resume this session to send squad communication');
 room.comms??=new Communications();
 if(message.type==='comms')return room.comms.send(room,account,message,spec);
 if(message.type!=='comms_mute'||room.status!=='running'||!room.state||!Number.isInteger(message.slot)||message.slot<0||message.slot>=room.members.length||Object.keys(message).some(k=>!['type','room','controlToken','slot','muted'].includes(k)))throw Error('Invalid squad mute');
 room.comms.mute(room,account,room.members[message.slot],message.muted);
}
