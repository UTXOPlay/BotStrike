import {constrain,velocity} from './motion.mjs';
// Visual prediction only: replay controls not yet acknowledged by the native host.
// The browser never submits positions, damage, hits or simulation results.
export function advanceMotion(state,input,seconds,map,hero,weapon){
 const scoped=input.scope&&weapon.scoped,v=velocity({...input,scope:scoped},hero,weapon);
 if(input.jump&&!state.jumpHeld&&state.position[1]<=0)state.vy=220;
 state.jumpHeld=!!input.jump;
 for(let remaining=seconds;remaining>1e-8;){const dt=Math.min(1/64,remaining);remaining-=dt;state.vy-=600*dt;state.position[0]+=v[0]*dt;state.position[1]+=state.vy*dt;state.position[2]+=v[2]*dt;if(state.position[1]<0){state.position[1]=0;state.vy=0}constrain(state.position,map)}
}
export class LocalPrediction{
 constructor(){this.history=[];this.position=null;this.offset=[0,0,0];this.time=null;this.state=null;}
 reset(player,now){this.history=[];this.state={position:[...player.position],vy:player.velocity?.[1]||0,jumpHeld:false};this.position=[...player.position];this.offset=[0,0,0];this.time=now;this.lastControl=null;}
 record(input,now){this.history.push({input:{...input},at:now});if(this.history.length>128)this.history.shift();}
 reconcile(player,now,map,hero,weapon,live=true){
  if(!this.state){this.reset(player,now);return}if(this.lastControl)this.step(this.lastControl,now,map,hero,weapon,live);
  const acknowledged=this.history.findLast(s=>s.input.seq<=player.last_seq),pending=this.history.filter(s=>s.input.seq>player.last_seq);
  const next={position:[...player.position],vy:player.velocity?.[1]||0,jumpHeld:!!acknowledged?.input.jump};
  if(live)for(let i=0;i<pending.length;i++){const start=Math.max(now-250,pending[i].at),end=Math.min(now,pending[i+1]?.at??now);if(end>start)advanceMotion(next,pending[i].input,(end-start)/1000,map,hero,weapon)}
  const error=this.position.map((v,i)=>v-next.position[i]);this.offset=Math.hypot(...error)>160?[0,0,0]:error;this.state=next;this.time=now;
  // Keep the acknowledged command to preserve jump-edge state, plus unacked controls.
  this.history=acknowledged?[acknowledged,...pending]:pending;
  this.position=next.position.map((v,i)=>v+this.offset[i]);
 }
 step(input,now,map,hero,weapon,live=true){if(!this.state)return null;this.lastControl=input;const dt=Math.max(0,Math.min(.25,(now-this.time)/1000));this.time=now;if(live)advanceMotion(this.state,input,dt,map,hero,weapon);const decay=Math.exp(-dt*20);this.offset=this.offset.map(v=>v*decay);this.position=this.state.position.map((v,i)=>v+this.offset[i]);constrain(this.position,map);return this.position;}
}
