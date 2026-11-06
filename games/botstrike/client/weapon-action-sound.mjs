// Original deterministic procedural mechanisms, not imported recordings. The
// timing of reload stages is supplied separately from native state transitions.
export const weaponActionKinds=['reload','reload_feed','reload_close','equip','empty'];
const mechanisms=[
 [430,810,.62],[1180,1730,.28],[760,1390,.42],[290,2040,.8],
 [165,480,1],[870,1510,.36],[350,960,.7],[145,390,1],
 [1680,2940,.24],[1080,2210,.46],[540,1120,.56],[95,260,1],
];
const duration={reload:.095,reload_feed:.13,reload_close:.085,equip:.105,empty:.055};
export function makeWeaponActionSample(kind,weapon,rate=44100){
 const m=mechanisms[weapon];if(!m||!weaponActionKinds.includes(kind))return null;
 const count=Math.ceil(duration[kind]*rate),out=new Float32Array(count),stage=weaponActionKinds.indexOf(kind);
 let random=(0x6a09e667+weapon*0x6d2b79f5+stage*0x9e3779b9)>>>0,low=0,peak=0;
 for(let i=0;i<count;i++){
  const t=i/rate;random=(Math.imul(random,1664525)+1013904223)>>>0;const noise=random/2147483648-1;
  low+=(noise-low)*Math.min(1,2*Math.PI*1000/rate);
  const attack=Math.min(1,t/.0015),tail=Math.max(0,Math.min(1,(count-i)/(rate*.01)));
  const timing=kind==='reload_feed'?.038:kind==='equip'?.018:0,second=t-timing;
  const clack=(noise-low)*Math.exp(-t/(kind==='empty'?.004:.012))*.38;
  const ring=Math.sin(2*Math.PI*m[0]*(1+stage*.13)*t)*Math.exp(-t/(.015+m[2]*.018))*.32;
  const follow=second>0?(Math.sin(2*Math.PI*m[1]*second)+low*.8)*Math.exp(-second/.017)*.23:0;
  const value=(clack+ring+follow)*attack*tail;out[i]=value;peak=Math.max(peak,Math.abs(value));
 }
 if(peak)for(let i=0;i<count;i++)out[i]*=(kind==='empty'?.42:.55)/peak;
 return out;
}
