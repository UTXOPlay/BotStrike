export function audioView(room){
 const s=room?.state,self=s?.players[room.slot];if(!self)return null;
 const selected=s.players[room.spectate],listener=self.alive?self:selected?.alive&&selected.team===self.team?selected:s.players.find(p=>p.team===self.team&&p.alive);
 return listener?{key:`${room.id}:${listener.slot}:${listener.life}`,slot:listener.slot,life:listener.life}:null;
}
// The existing wire does not tag cues with a listener. Discard its boundary tick
// when switching viewpoint so a queued old-listener bearing cannot be replayed
// from the new viewpoint. No extra enemy state or position is requested.
export class AudioViewBoundary{
 constructor(){this.key=null;this.after=-Infinity;}
 update(room){const view=audioView(room),key=view?.key||`${room?.id||'none'}:silent`;if(key!==this.key){this.key=key;this.after=room?.state?.tick??Infinity;}return view;}
 accepts(event){return event.tick>this.after;}
}
