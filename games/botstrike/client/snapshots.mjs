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
   if(i===slot||p.hidden||!p.position)return p;
   const a=before.state.players[i],b=after.state.players[i];
   if(!a?.position||!b?.position||a.hidden||b.hidden||a.life!==p.life||b.life!==p.life||a.alive!==p.alive||b.alive!==p.alive||Math.hypot(...b.position.map((v,j)=>v-a.position[j]))>200)return p;
   const angle=Math.atan2(Math.sin(b.yaw-a.yaw),Math.cos(b.yaw-a.yaw));
   return {...p,position:a.position.map((v,j)=>v+(b.position[j]-v)*fraction),yaw:a.yaw+angle*fraction,pitch:a.pitch+(b.pitch-a.pitch)*fraction};
  })};
 }
 viewTick(){return Math.max(0,Math.floor(this.renderTick));}
}
