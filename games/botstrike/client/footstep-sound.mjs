const profiles={
 step0:{duration:.11,thump:86,drop:25,weight:.68,weightDecay:.042,plate:340,plateLevel:.09,plateDecay:.024,click:.2},
 step1:{duration:.125,thump:78,drop:22,weight:.72,weightDecay:.047,plate:300,plateLevel:.08,plateDecay:.027,click:.17},
 land:{duration:.19,thump:82,drop:32,weight:.86,weightDecay:.09,plate:270,plateLevel:.13,plateDecay:.055,click:.25},
};

export function makeFootstepSample(kind,sampleRate=44100,surface=0){
 const original=profiles[kind];if(!original||!Number.isInteger(surface)||surface<0||surface>2)return null;
 // Original steel remains byte-identical. Concrete has a short gritty scuff;
 // tile a brighter, compact heel click. All are authored here, no external audio.
 const profile=surface===0?original:surface===1?{...original,plateLevel:.015,click:.29,weightDecay:original.weightDecay*.7,plateDecay:.012}:{...original,thump:original.thump*1.35,plate:original.plate*2.3,plateLevel:.17,plateDecay:.018,click:.38};
 const count=Math.ceil(profile.duration*sampleRate),samples=new Float32Array(count);
 const lowStep=Math.min(1,2*Math.PI*500/sampleRate);
 let seed=({step0:0xc9f47362,step1:0x8e697c91,land:0x4d829e05})[kind],low=0,phase=0,peak=0;
 for(let i=0;i<count;i++){
  const t=i/sampleRate;
  seed=(Math.imul(seed,1664525)+1013904223)>>>0;
  const noise=seed/2147483648-1;
  low+=(noise-low)*lowStep;
  phase+=2*Math.PI*(profile.thump-profile.drop*Math.min(1,t/.08))/sampleRate;
  const weight=Math.sin(phase)*profile.weight*Math.exp(-t/profile.weightDecay);
  const strike=(noise-low)*profile.click*Math.exp(-t/.004);
  const plate=Math.sin(2*Math.PI*profile.plate*t)*profile.plateLevel*Math.exp(-t/profile.plateDecay);
  const fade=Math.min(1,(profile.duration-t)/.012);
  const value=(weight+strike+plate+low*.24*Math.exp(-t/.04))*fade;
  samples[i]=value;peak=Math.max(peak,Math.abs(value));
 }
 if(peak>0)for(let i=0;i<count;i++)samples[i]*=.8/peak;
 return samples;
}
