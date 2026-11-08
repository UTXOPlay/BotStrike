// Authorization for a controller's written snapshot history, not a claim that
// the browser received or rendered it. Native life/cover/rewind rules still apply.
export class ViewHistory{
 constructor({capacity=24,rewindTicks=12}={}){this.capacity=capacity;this.rewindTicks=rewindTicks;this.generation=0;this.reset();}
 reset(room=null,life=null){this.room=room;this.life=life;this.ticks=[];return ++this.generation;}
 prepare(room,life){if(room!==this.room||life!==this.life)this.reset(room,life);return this.generation;}
 written(tick,generation){
  if(generation!==this.generation||!this.room||!Number.isSafeInteger(tick)||tick<0)return false;
  if(this.ticks.length&&tick<this.ticks.at(-1))return false;
  if(tick!==this.ticks.at(-1))this.ticks.push(tick);while(this.ticks.length>this.capacity)this.ticks.shift();return true;
 }
 admit(requested,current){
  if(!Number.isSafeInteger(current)||current<0)throw Error('Invalid native tick');
  const oldest=Math.max(0,current-this.rewindTicks),first=this.ticks[0],last=this.ticks.at(-1),low=Math.max(oldest,first??current),high=Math.min(current,last??current);
  if(requested===undefined)return{requested:null,accepted:null,reason:'not_requested',oldest,low:null,high:null};
  if(!Number.isSafeInteger(requested)||requested<0)throw Error('Invalid requested view tick');
  // With no fresh written interval, allow no historical advantage. In-flight
  // old snapshots cannot acquire new authority by completing after reset.
  if(!this.ticks.length||low>high)return{requested,accepted:current,reason:'no_current_history',oldest,low:null,high:null};
  const accepted=Math.max(low,Math.min(high,requested));
  return{requested,accepted,reason:requested<low?'before_written_history':requested>high?'after_written_history':'written_interval',oldest,low,high};
 }
}
