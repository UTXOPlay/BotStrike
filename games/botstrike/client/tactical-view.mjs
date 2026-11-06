// Presentation forecasts only; native rules remain authoritative.
export const tactical=room=>room?.config?.ruleset==='tactical';
export function replacement(owned,weapon){return owned.findIndex((yes,index)=>yes&&index!==weapon&&(index===0)===(weapon===0));}
export function replacementText(spec,owned,weapon){const old=replacement(owned,weapon);return `${weapon===0?'SIDEARM':'PRIMARY'}${old<0?' · EMPTY SLOT':` · REPLACES ${spec.weapons[old].name}`}`;}
export function teamForecast(state,slot,spec){
 const self=state.players[slot],e=spec.economy,loss=e.loss[Math.min(e.loss.length-1,state.loss_streak?.[self.team]||0)];
 return state.players.filter(p=>p.team===self.team).map(p=>{
  const owned=p.owned||[],primary=owned.findIndex((yes,i)=>yes&&i>0),loadout=primary<0?'NO PRIMARY':spec.weapons[primary].name;
  const next=state.round===12?'HALF RESET '+e.start:`NEXT WIN ${Math.min(e.cap,p.credits+e.win)} / LOSS ${Math.min(e.cap,p.credits+loss)}`;
  return `PILOT ${p.slot+1} · ₡ ${p.credits} · ${loadout} · ${p.armor} ARMOR · ${next}`;
 }).join('\n')+'\nNext-round estimate assumes no further spending or actor/kill rewards; planted-loss bonus excluded. Survivors keep gear; deaths reset to ARC. Owned ammunition is resupplied.';
}
