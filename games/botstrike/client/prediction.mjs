import {constrain,velocity,horizontal,movement,stanceAmount} from './motion.mjs';
// Visual prediction only: replay controls not yet acknowledged by the native host.
// The browser never submits positions, damage, hits or simulation results.
export function advanceMotion(state,input,seconds,map,hero,weapon){
 const scoped=input.scope&&weapon.scoped,wish=velocity({...input,scope:scoped},hero,weapon);
 state.velocity ||= [0,0,0];state.fraction=(state.fraction||0)+Math.max(0,seconds)*64;
 state.jumpQueued ||= input.jump&&!state.jumpHeld;
 while(state.fraction>=1-1e-10){
  state.fraction=Math.max(0,state.fraction-1);
  const grounded=state.position[1]<=0,v=horizontal([state.velocity[0],state.velocity[2]],[wish[0],wish[2]],grounded);
  state.stance=stanceAmount(state.stance||0,input.crouch);
  state.velocity[0]=v[0];state.velocity[2]=v[1];state.landing=Math.max(0,(state.landing||0)-1);
  const jump=!!input.jump||!!state.jumpQueued;
  if(jump&&!state.jumpHeld&&grounded)state.vy=220;
  state.jumpHeld=jump;state.jumpQueued=false;state.vy-=600/64;
  state.position[0]+=state.velocity[0]/64;state.position[1]+=state.vy/64;state.position[2]+=state.velocity[2]/64;
  if(state.position[1]<0){state.position[1]=0;state.vy=0;}
  if(!grounded&&state.position[1]<=0)state.landing=movement.landing_ticks;
  const before=[...state.position];constrain(state.position,map);
  for(const a of [0,2])if(before[a]!==state.position[a])state.velocity[a]=0;
 }

}
export class LocalPrediction{
 constructor(){this.history=[];this.position=null;this.offset=[0,0,0];this.time=null;this.state=null;}
 reset(player,now){this.history=[];this.state={position:[...player.position],vy:player.velocity?.[1]||0,velocity:[...(player.velocity||[0,0,0])],landing:player.landing||0,stance:player.stance||0,jumpHeld:false};this.position=[...player.position];this.offset=[0,0,0];this.time=now;this.lastControl=null;}
 record(input,now){this.history.push({input:{...input},at:now});if(this.history.length>128)this.history.shift();}
 reconcile(player,now,map,hero,weapon,live=true){
  if(!this.state){this.reset(player,now);return}if(this.lastControl)this.step(this.lastControl,now,map,hero,weapon,live);
  const acknowledged=this.history.findLast(s=>s.input.seq<=player.last_seq),pending=this.history.filter(s=>s.input.seq>player.last_seq);
  const next={position:[...player.position],vy:player.velocity?.[1]||0,velocity:[...(player.velocity||[0,0,0])],landing:player.landing||0,stance:player.stance||0,jumpHeld:!!acknowledged?.input.jump};
  if(live)for(let i=0;i<pending.length;i++){const start=Math.max(now-250,pending[i].at),end=Math.min(now,pending[i+1]?.at??now);if(end>start)advanceMotion(next,pending[i].input,(end-start)/1000,map,hero,weapon)}
  const error=this.position.map((v,i)=>v-next.position[i]);this.offset=Math.hypot(...error)>160?[0,0,0]:error;this.state=next;this.time=now;
  // Keep the acknowledged command to preserve jump-edge state, plus unacked controls.
  this.history=acknowledged?[acknowledged,...pending]:pending;
  this.position=next.position.map((v,i)=>v+this.offset[i]);
 }
 step(input,now,map,hero,weapon,live=true){if(!this.state)return null;this.lastControl=input;const dt=Math.max(0,Math.min(.25,(now-this.time)/1000));this.time=now;if(live)advanceMotion(this.state,input,dt,map,hero,weapon);const decay=Math.exp(-dt*20);this.offset=this.offset.map(v=>v*decay);this.position=this.state.position.map((v,i)=>v+this.offset[i]);constrain(this.position,map);return this.position;}
}
