// Optional service metadata is scoped to the same entitled player pose/life.
// Old snapshots/labs retain their existing local gait. Never affects prediction.
export function presentationGait(player,tick){
 const g=player.gait;
 return g&&g.life===player.life&&Number.isFinite(g.tick)&&Math.abs(tick-g.tick)<=8&&Number.isFinite(g.phase)&&g.phase>=0&&g.phase<1e6&&Number.isFinite(g.cycleDuration)&&g.cycleDuration>=.18&&g.cycleDuration<=1.25&&Number.isFinite(g.duty)&&g.duty>0&&g.duty<=.54?g:null;
}
