// Mirrors the service's permitted first-person viewpoint. This selects only
// already-authorized data; it never creates a spectator camera on an enemy.
export function perceptionViewer(state,slot,spectate){
 const self=state?.players[slot];if(!self)return null;
 const chosen=state.players[spectate];
 return self.alive?self:chosen?.alive&&chosen.team===self.team?chosen:state.players.find(p=>p.alive&&p.team===self.team)||null;
}
export function flashPresentation(state,slot,spectate,reduced){
 const ticks=perceptionViewer(state,slot,spectate)?.flash||0;
 return {opacity:ticks>0?'1':'0',gentle:!!reduced,text:ticks>0?'OPTICS JAMMED · '+(ticks/64).toFixed(1)+'s':''};
}
