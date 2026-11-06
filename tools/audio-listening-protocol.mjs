export const directions=['FRONT','FRONT RIGHT','RIGHT','BACK RIGHT','BACK','BACK LEFT','LEFT','FRONT LEFT'];
export const distances=['NEAR','MID','FAR'];
export const frontBack=sector=>Math.cos(sector*Math.PI/4)>.38?'front':Math.cos(sector*Math.PI/4)<-.38?'back':'side';
export function listeningPlan(seed=2050,{comparisons=false}={}){
 let state=seed>>>0;const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
 const modes=['baseline',...(comparisons?(seed%2?['candidate','hrtf']:['hrtf','candidate']):[])],trials=[];
 for(const [block,mode]of modes.entries()){
  const rows=[];for(let sector=0;sector<8;sector++)for(let range=0;range<3;range++)for(const muffled of [false,true])rows.push({sector,range,muffled,dense:(sector+range+Number(muffled))%2===0});
  for(let i=rows.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[rows[i],rows[j]]=[rows[j],rows[i]];}
  for(const [order,row]of rows.entries())trials.push({id:`${block}:${order}`,block,mode,...row,bearing:row.sector*Math.PI/4,level:[1,.6,.3][row.range]*(row.muffled?.35:1)});
 }
 return trials;
}
export function listeningSummary(report){
 const groups=Object.create(null);
 for(const row of report.rows||[]){
  if(!row.valid||!row.answer)continue;
  const g=groups[row.effectiveMode||row.trial.mode]??={n:0,unknown:0,direction:Array.from({length:8},()=>Array(9).fill(0)),distance:Array.from({length:3},()=>Array(4).fill(0)),frontBack:{front:{},back:{},side:{}},timedOut:0,reactionMs:[]};
  const a=row.answer;g.n++;g.direction[row.trial.sector][Number.isInteger(a.sector)?a.sector:8]++;g.distance[row.trial.range][Number.isInteger(a.range)?a.range:3]++;
  const fb=frontBack(row.trial.sector);g.frontBack[fb][a.frontBack]=(g.frontBack[fb][a.frontBack]||0)+1;
  if(a.sector===null)g.unknown++;if(a.timeout)g.timedOut++;if(Number.isFinite(row.reactionMs))g.reactionMs.push(row.reactionMs);
 }
 return {evidence:report.automated?'AUTOMATED QA — zero human observations':'SELF-REPORTED — physical cohort and reviewer confirmation still required',output:report.metadata?.output,invalid:(report.rows||[]).filter(r=>!r.valid).length,groups};
}
