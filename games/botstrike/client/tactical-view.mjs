// Presentation forecasts only; native rules remain authoritative.
export const tactical=room=>room?.config?.ruleset==='tactical';
export function replacement(owned,weapon){return owned.findIndex((yes,index)=>yes&&index!==weapon&&(index===0)===(weapon===0));}
export function replacementText(spec,owned,weapon){const old=replacement(owned,weapon);return `${weapon===0?'SIDEARM':'PRIMARY'}${old<0?' · EMPTY SLOT':` · REPLACES ${spec.weapons[old].name}`}`;}
export function teamForecast(state,slot,spec){
 return teamForecastRows(state,slot,spec).map(p=>{
  const loadout=p.primary<0?'NO PRIMARY':spec.weapons[p.primary].name;
  const next=p.halfReset?'HALF RESET '+p.nextWin:`NEXT WIN ${p.nextWin} / LOSS ${p.nextLoss}`;
  return `PILOT ${p.slot+1} · ₡ ${p.credits} · ${loadout} · ${p.armor} ARMOR · ${next}`;
 }).join('\n')+'\nNext-round estimate assumes no further spending or actor/kill rewards; planted-loss bonus excluded. Survivors keep gear; deaths reset to ARC. Owned ammunition is resupplied.';
}

export function teamForecastRows(state,slot,spec){
 const self=state.players[slot],e=spec.economy,loss=e.loss[Math.min(e.loss.length-1,state.loss_streak?.[self.team]||0)];
 return state.players.filter(p=>p.team===self.team).map(p=>({slot:p.slot,credits:p.credits,armor:p.armor,
  primary:p.owned?.findIndex((yes,i)=>yes&&i>0)??-1,
  halfReset:state.round===12,nextWin:state.round===12?e.start:Math.min(e.cap,p.credits+e.win),nextLoss:state.round===12?e.start:Math.min(e.cap,p.credits+loss)}));
}
