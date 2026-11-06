// Development-only recognition study. Results are neither match scores nor proof
// of usability. A balanced fractional design does not isolate every interaction.
export const visionMatrices={
 normal:[1,0,0,0,1,0,0,0,1],
 grayscale:[.2126,.7152,.0722,.2126,.7152,.0722,.2126,.7152,.0722],
 // Machado severity 1.0; apply to linear RGB, not encoded sRGB. Tritan is an
 // approximation of tritanomaly, not a claim to simulate tritanopia faithfully.
 // https://github.com/colour-science/colour/blob/develop/colour/blindness/datasets/machado2010.py
 protan:[.152286,1.052583,-.204868,.114503,.786281,.099216,-.003882,-.048116,1.051998],
 deutan:[.367322,.860646,-.227968,.280085,.672501,.047413,-.011820,.042940,.968881],
 tritan:[1.255528,-.076749,-.178779,-.078411,.930809,.147602,.004733,.691367,.303900]
};
export function trials(seed=2050,repeats=2){
 if(!Number.isInteger(seed)||seed<0||seed>0xffffffff||![2,4].includes(repeats))throw Error('Invalid recognition schedule');
 const visions=Object.keys(visionMatrices),out=[];
 for(let repeat=0;repeat<repeats;repeat++)for(let hero=0;hero<6;hero++)for(let relation=0;relation<2;relation++)for(let map=0;map<3;map++){
  const smoke=['clear','edge','hidden-control'][(hero+relation+repeat)%3];
  out.push({id:out.length,repeat,hero,relation:relation?'enemy':'ally',map,
   distance:[300,600,1200][(hero+relation+repeat+map)%3],brightness:[.7,1,1.3][(hero+2*map+repeat)%3],
   scale:[.5,.75,1][(2*hero+relation+repeat+map)%3],motion:!!((hero+map+repeat)%2),
   smoke,vision:visions[(hero*2+relation+map+repeat)%visions.length],fov:[65,80,95][(hero+repeat+2*map)%3],
   expected:smoke==='hidden-control'?'unseen':relation?'enemy':'ally'});
 }
 let random=seed>>>0;const next=()=>{random=(Math.imul(random,1664525)+1013904223)>>>0;return random/4294967296;};
 for(let i=out.length-1;i>0;i--){const j=Math.floor(next()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
 return out;
}
const percentile=(values,p)=>{if(!values.length)return null;const sorted=[...values].sort((a,b)=>a-b);return sorted[Math.ceil(sorted.length*p)-1];};
export function summarize(rows){
 const summarizeGroup=group=>{const valid=group.filter(r=>!r.invalid),correct=valid.filter(r=>r.answer===r.trial.expected),reaction=correct.filter(r=>Number.isFinite(r.ms)).map(r=>r.ms);return {attempted:group.length,n:valid.length,invalid:group.length-valid.length,correct:correct.length,accuracy:valid.length?correct.length/valid.length:null,timeouts:valid.filter(r=>r.answer==='timeout').length,correctReactionMedianMs:percentile(reaction,.5),correctReactionP95Ms:percentile(reaction,.95)};};
 const by={};
 for(const key of ['hero','relation','map','distance','brightness','scale','motion','smoke','vision','fov','input','cohort','viewport']){
  by[key]={};for(const row of rows){const value=key==='input'?row.input:key==='cohort'?row.declaredInput:key==='viewport'?row.viewport.join('x'):String(row.trial[key]);(by[key][value]??=[]).push(row);}
  for(const value of Object.keys(by[key]))by[key][value]=summarizeGroup(by[key][value]);
 }
 return {total:summarizeGroup(rows),by};
}
// Fully clear native-box sight lines keep ordinary recognition cases separate
// from accidental total occlusion. Decorative geometry is still visible and
// may reveal a presentation problem; it is not added to native collision.
export function lane(map,distance,variant=0){
 const blocked=(a,b,box)=>{let lo=0,hi=1;for(let axis=0;axis<3;axis++){const d=b[axis]-a[axis];if(Math.abs(d)<1e-8){if(a[axis]<box.min[axis]||a[axis]>box.max[axis])return false;}else{const x=(box.min[axis]-a[axis])/d,y=(box.max[axis]-a[axis])/d;lo=Math.max(lo,Math.min(x,y));hi=Math.min(hi,Math.max(x,y));if(lo>hi)return false;}}return true;};
 const free=p=>Math.abs(p[0])<map.extent-50&&Math.abs(p[2])<map.extent-50&&!map.obstacles.some(o=>p[0]>o.min[0]-35&&p[0]<o.max[0]+35&&p[2]>o.min[2]-35&&p[2]<o.max[2]+35);
 const found=[];
 for(let z=-map.extent+100;z<map.extent;z+=200)for(let x=-map.extent+100;x<map.extent;x+=200)for(const yaw of [0,Math.PI/2,Math.PI,-Math.PI/2]){
  const origin=[x,0,z],target=[x-Math.sin(yaw)*distance,0,z-Math.cos(yaw)*distance];
  if(!free(origin)||!free(target))continue;
  const eye=[x,56,z],samples=[[0,10,0],[0,70,0],[-25,40,0],[25,40,0],[0,40,25],[0,40,-25]];
  if(samples.some(offset=>map.obstacles.some(box=>blocked(eye,target.map((v,i)=>v+offset[i]),box))))continue;
  found.push({origin,target,yaw});
 }
 if(!found.length)return null;
 return found[((variant%found.length)+found.length)%found.length];
}
