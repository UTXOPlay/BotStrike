// Remote footsteps follow the same delayed render tick as entitled meshes. The
// queue never receives an actor/pose and cannot turn anonymous audio into one.
export class ContactCues{
 constructor(){this.key=null;this.queue=[];}
 scope(key){if(key!==this.key){this.key=key;this.queue=[];}}
 push(event,now){this.queue.push({event,at:now});if(this.queue.length>48)this.queue.shift();}
 drain(tick,viewTick,now,enabled=true){
  const ready=[],pending=[];
  if(enabled)for(const row of this.queue){if(tick-row.event.tick>8||now-row.at>500)continue;if(row.event.tick<=viewTick)ready.push(row.event);else pending.push(row);}
  this.queue=pending;return ready;
 }
}
