// Service/metadata timing only. These transitions never modify native state.
export const weaponAudioPolicy={version:'weapon-audio-v1',feedProgress:.82};
export function weaponAudioEvents(state,previous,spec){
 const out=[];if(state.phase!=='live')return out;
 for(const p of state.players){const old=previous?.players[p.slot];if(!old||!p.alive||!old.alive||p.life!==old.life)continue;
  const w=spec.weapons[p.weapon];if(!w)continue;
  if(p.weapon!==old.weapon){if(p.owned?.[p.weapon]!==false)out.push({kind:'equip',actor:p.slot,value:p.weapon});continue;}
  if(p.reload>0&&old.reload===0)out.push({kind:'reload',actor:p.slot,value:p.weapon});
  else if(old.reload>0&&p.reload>0){const mark=Math.floor(w.reload*(1-weaponAudioPolicy.feedProgress));if(old.reload>mark&&p.reload<=mark)out.push({kind:'reload_feed',actor:p.slot,value:p.weapon});}
  else if(old.reload>0&&p.reload===0&&p.ammo?.[p.weapon]+Math.max(0,(p.shots||0)-(old.shots||0))>old.ammo?.[p.weapon])out.push({kind:'reload_close',actor:p.slot,value:p.weapon});
 }
 return out;
}
export class EmptyPull {
 constructor(){this.life=null;this.held=false;}
 update(player,input,live=true){const life=player?.life;if(this.life!==null&&life!==this.life)this.held=!!input.fire;this.life=life;const pressed=live&&!!input.fire&&!this.held;this.held=live&&!!input.fire;
  return pressed&&(input.weapon==null||input.weapon===player?.weapon)&&player?.alive&&player.owned?.[player.weapon]&&player.ammo?.[player.weapon]===0&&!player.reload&&!input.reload?player.weapon:null;
 }
 reset(){this.life=null;this.held=false;}
}
