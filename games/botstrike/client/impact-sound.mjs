const profiles={
 body:{duration:.12,lowpass:850,crack:.85,crackDecay:.005,body:170,bodyLevel:.3,bodyDecay:.055,ring:620,ringLevel:.22,ringDecay:.06},
 head:{duration:.17,lowpass:1600,crack:1,crackDecay:.007,body:230,bodyLevel:.2,bodyDecay:.05,ring:2100,ringLevel:.36,ringDecay:.095},
 damage:{duration:.19,lowpass:260,crack:.45,crackDecay:.009,body:95,bodyLevel:.7,bodyDecay:.085,ring:260,ringLevel:.12,ringDecay:.07},
};

export function makeImpactSample(kind,sampleRate=44100){
 const profile=profiles[kind];if(!profile)return null;
 const count=Math.ceil(profile.duration*sampleRate),samples=new Float32Array(count);
 const lowStep=Math.min(1,2*Math.PI*profile.lowpass/sampleRate);
 let seed=({body:0x7e61b819,head:0x1dd70a72,damage:0x5f11dbed})[kind],low=0,peak=0;
 for(let i=0;i<count;i++){
  const t=i/sampleRate;
  seed=(Math.imul(seed,1664525)+1013904223)>>>0;
  const noise=seed/2147483648-1;
  low+=(noise-low)*lowStep;
  const crack=(noise-low)*profile.crack*Math.exp(-t/profile.crackDecay);
  const texture=low*.4*Math.exp(-t/.035);
  const body=Math.sin(2*Math.PI*profile.body*t)*profile.bodyLevel*Math.exp(-t/profile.bodyDecay);
  const ring=Math.sin(2*Math.PI*profile.ring*t)*profile.ringLevel*Math.exp(-t/profile.ringDecay);
  const fade=Math.min(1,(profile.duration-t)/.012);
  const value=(crack+texture+body+ring)*fade;
  samples[i]=value;peak=Math.max(peak,Math.abs(value));
 }
 if(peak>0)for(let i=0;i<count;i++)samples[i]*=.82/peak;
 return samples;
}
