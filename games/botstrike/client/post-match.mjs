const combatOrder=(a,b)=>b.kills-a.kills||b.assists-a.assists||b.damage-a.damage||a.deaths-b.deaths||a.slot-b.slot;

export function matchResults(room){
 const state=room?.state;
 if(!state||state.config.mode==='practice'||state.phase!=='finished'||!['sealing','finished'].includes(room.status))return null;
 const self=state.players[room.slot];
 if(!self)return null;
 const ranked=[...state.players].sort(combatOrder);
 const mvp=ranked[0];
 return{
  self,
  mvp:mvp&&(mvp.kills||mvp.assists||mvp.damage)?mvp:null,
  teams:[self.team,1-self.team].map(team=>({team,score:state.score[team],players:ranked.filter(player=>player.team===team)})),
  winner:state.winner,
  mode:state.config.mode
 };
}
