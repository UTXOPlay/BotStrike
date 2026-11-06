export const identityLabels={
 weapon:['ARC-9','NEEDLE','ION-5','RAIL-LANCE','SCATTER','HELIX-3','AURORA','KRAKEN-90','NULLIFIER','ECHO-MK2','SIPHON','QUASAR'],
 action:['Reload start','Reload feed','Reload close','Equip','Empty pull'],
 surface:['Metal','Concrete','Tile'],
};
export const identityActions=['reload','reload_feed','reload_close','equip','empty'];
export function participantSeed(code){let h=2166136261;for(const c of code)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;}
const families=Object.keys(identityLabels);
export function identityPlan(seed=2050,{paired=false,output='headphones'}={}){
 if(!['headphones','speakers','mono'].includes(output))throw Error('Unknown output');
 let state=seed>>>0;const random=()=>((state=(Math.imul(state,1664525)+1013904223)>>>0)/4294967296);
 const shuffle=rows=>{for(let i=rows.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[rows[i],rows[j]]=[rows[j],rows[i]];}return rows;};
 const outputs=paired?(seed%2?['headphones','speakers']:['speakers','headphones']):[output],trials=[];
 // Rotate the family order across participants; each output repeats the same
 // conditions, with a fresh within-family shuffle. Nuisance weapon/contact
 // variants are fractional, not a full interaction study of all 60 mechanisms.
 const order=families.map((_,i)=>families[(i+(seed>>>0)%3)%3]);
 for(const [block,physicalOutput]of outputs.entries())for(const family of order){
  const rows=[];
  for(let target=0;target<identityLabels[family].length;target++)for(let context=0;context<8;context++){
   rows.push({block,output:physicalOutput,family,target,range:context&1?'far':'near',muffled:!!(context&2),dense:!!(context&4),
    weapon:family==='weapon'?target:((seed>>>0)%12+context)%12,
    contact:((seed>>>0)%3+context)%3===0?'land':'step',context});
  }
  for(const row of shuffle(rows))trials.push({id:String(trials.length),...row});
 }
 return trials;
}
export function identityCues(trial){
 const spatial={bearing:0,pan:0,level:(trial.range==='far'?.3:1)*(trial.muffled?.35:1),muffled:trial.muffled,self:false};
 const target=trial.family==='weapon'?{kind:'shot',weapon:trial.target}:trial.family==='action'?{kind:identityActions[trial.target],weapon:trial.weapon}:{kind:trial.contact,surface:trial.target};
 // Repeated isolated examples deliberately remove cadence as a weapon clue.
 // These are recognition stimuli, not a native firing/reload timing replay.
 const rows=(trial.family==='action'?[180,630]:[150,450,750]).map(ms=>({ms,target:true,...target,spatial:{...spatial,...(trial.family==='surface'?{surface:trial.target}:{})}}));
 if(trial.dense){
  const side=(kind,ms,bearing,extra={})=>({kind,ms,target:false,...extra,spatial:{bearing,pan:Math.sin(bearing),level:.6,muffled:false,self:false,...extra}});
  if(trial.family==='weapon')rows.push(side('step',280,-1.1,{surface:1}),side('equip',550,1.1,{weapon:0}));
  else if(trial.family==='action')rows.push(side('shot',360,-1.1,{weapon:2}),side('step',510,1.1,{surface:0}));
  else rows.push(side('shot',300,-1.1,{weapon:2}),side('equip',600,1.1,{weapon:0}));
 }
 return rows.sort((a,b)=>a.ms-b.ms);
}
export function identitySummary(report){
 const groups={};let invalid=0;
 for(const row of report.rows||[]){
  if(!row.valid){invalid++;continue;}
  const t=row.trial,n=identityLabels[t?.family]?.length;
  if(!n||!Number.isInteger(t.target)||t.target<0||t.target>=n)continue;
  const key=[t.output,t.family,t.range,t.muffled?'muffled':'clear',t.dense?'dense':'sparse'].join('/');
  const g=groups[key]??={n:0,correct:0,unsure:0,timeouts:0,confusion:Array.from({length:n},()=>Array(n+1).fill(0)),reactionMs:[]};
  const a=Number.isInteger(row.answer)&&row.answer>=0&&row.answer<n?row.answer:n;
  g.n++;g.confusion[t.target][a]++;if(a===t.target)g.correct++;if(a===n)g.unsure++;if(row.timeout)g.timeouts++;
  if(Number.isFinite(row.reactionMs)&&row.reactionMs>=0)g.reactionMs.push(row.reactionMs);
 }
 return {evidence:report.automated?'AUTOMATED QA — zero human observations':'SELF-REPORTED — reviewer confirmation and physical output review still required',invalid,groups,
  limitations:['Isolated repeated stimuli use fixed lab timing, not native weapon cadence.','Action weapons and step/landing variants are fractional nuisance factors.','No inference about network latency, gait synchrony, HRTF, elevation or hardware CPU.']};
}
