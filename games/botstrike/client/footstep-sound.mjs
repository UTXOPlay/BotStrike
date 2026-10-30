const profiles={
 step0:{duration:.125,thump:105,drop:35,weight:.52,weightDecay:.045,plate:640,plateLevel:.24,plateDecay:.055,click:.62,rattleAt:.029},
 step1:{duration:.145,thump:92,drop:29,weight:.56,weightDecay:.05,plate:730,plateLevel:.2,plateDecay:.065,click:.54,rattleAt:.038},
 land:{duration:.23,thump:90,drop:45,weight:.8,weightDecay:.09,plate:420,plateLevel:.32,plateDecay:.12,click:.75,rattleAt:.062},
};

export function makeFootstepSample(kind,sampleRate=44100){
 const profile=profiles[kind];if(!profile)return null;
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
  const strike=(noise-low)*profile.click*Math.exp(-t/.006);
  const plate=Math.sin(2*Math.PI*profile.plate*t)*profile.plateLevel*Math.exp(-t/profile.plateDecay);
  const rattle=t>profile.rattleAt?(noise-low)*.18*Math.exp(-(t-profile.rattleAt)/.009):0;
  const fade=Math.min(1,(profile.duration-t)/.012);
  const value=(weight+strike+plate+rattle+low*.28*Math.exp(-t/.045))*fade;
  samples[i]=value;peak=Math.max(peak,Math.abs(value));
 }
 if(peak>0)for(let i=0;i<count;i++)samples[i]*=.8/peak;
 return samples;
}
