import {presentationGait} from './presentation-gait.mjs';
// Render remote players on a bounded server-tick timeline. Local prediction stays
// immediate; hidden/new-life actors never interpolate from stale positions.
export class SnapshotBuffer {
 constructor(){this.reset();}
 reset(){this.frames=[];this.renderTick=0;}
 push(state,now){
  const previous=this.frames.at(-1);if(previous&&state.tick<=previous.state.tick)return;
  this.frames.push({state,now});while(this.frames.length>16)this.frames.shift();
  if(!previous)this.renderTick=state.tick;
 }
 sample(now,slot){
  const latest=this.frames.at(-1);if(!latest)return null;
  const target=Math.min(latest.state.tick,latest.state.tick+Math.max(0,now-latest.now)*.064-4);
  this.renderTick=Math.max(this.renderTick,target);
  let before=this.frames[0],after=latest;
  for(const frame of this.frames){if(frame.state.tick<=this.renderTick)before=frame;if(frame.state.tick>=this.renderTick){after=frame;break;}}
  const fraction=after.state.tick===before.state.tick?1:Math.max(0,Math.min(1,(this.renderTick-before.state.tick)/(after.state.tick-before.state.tick)));
  const current=latest.state;
  return {...current,players:current.players.map((p,i)=>{
   if(i===slot){const gait=presentationGait(p,current.tick),elapsed=current.phase==='live'&&p.alive&&p.position?.[1]<=.001&&p.velocity?.[1]<=0&&Math.hypot(p.velocity[0],p.velocity[2])>1?Math.min(4,Math.max(0,now-latest.now)*.064):0;return gait?{...p,gait:{...gait,phase:gait.phase+elapsed/(64*gait.cycleDuration)}}:p;}
   if(p.hidden||p.optical===false||!p.position)return p;
   const a=before.state.players[i],b=after.state.players[i];
   if(!a?.position||!b?.position||a.hidden||b.hidden||a.optical===false||b.optical===false||a.life!==p.life||b.life!==p.life||a.alive!==p.alive||b.alive!==p.alive||Math.hypot(...b.position.map((v,j)=>v-a.position[j]))>200)return p;
   const angle=Math.atan2(Math.sin(b.yaw-a.yaw),Math.cos(b.yaw-a.yaw));
   const ga=presentationGait(a,before.state.tick),gb=presentationGait(b,after.state.tick),gait=ga&&gb&&gb.phase>=ga.phase?{phase:ga.phase+(gb.phase-ga.phase)*fraction,cycleDuration:ga.cycleDuration+(gb.cycleDuration-ga.cycleDuration)*fraction,duty:ga.duty+(gb.duty-ga.duty)*fraction,tick:ga.tick+(gb.tick-ga.tick)*fraction,life:p.life}:null;
   return {...p,...(gait?{gait}:{}),...(Number.isFinite(a.stance)&&Number.isFinite(b.stance)?{stance:a.stance+(b.stance-a.stance)*fraction}:{}),position:a.position.map((v,j)=>v+(b.position[j]-v)*fraction),yaw:a.yaw+angle*fraction,pitch:a.pitch+(b.pitch-a.pitch)*fraction};
  })};
 }
 viewTick(){return Math.max(0,Math.floor(this.renderTick));}
}
