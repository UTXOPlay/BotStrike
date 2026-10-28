const profiles=[
 {duration:.28,lowpass:210,pitch:140,drop:85,body:.78,bodyDecay:.085,crack:.9,crackDecay:.009,ring:690,ringLevel:.2,ringDecay:.07,tail:.38,tailDecay:.16},
 {duration:.15,lowpass:680,pitch:520,drop:360,body:.42,bodyDecay:.037,crack:.75,crackDecay:.004,ring:1750,ringLevel:.27,ringDecay:.035,tail:.16,tailDecay:.07},
];

export function makeShotSample(weapon,sampleRate=44100){
 const profile=profiles[weapon];if(!profile)return null;
 const count=Math.ceil(profile.duration*sampleRate),samples=new Float32Array(count);
 const lowpassStep=Math.min(1,2*Math.PI*profile.lowpass/sampleRate);
 let seed=(0x9e3779b9+weapon*0x6d2b79f5)>>>0,low=0,phase=0,peak=0;
 for(let i=0;i<count;i++){
  const t=i/sampleRate;
  seed=(Math.imul(seed,1664525)+1013904223)>>>0;
  const noise=seed/2147483648-1;
  low+=(noise-low)*lowpassStep;
  const high=noise-low;
  phase+=2*Math.PI*(profile.pitch-profile.drop*Math.min(1,t/.12))/sampleRate;
  const body=Math.tanh(Math.sin(phase)*2)*profile.body*Math.exp(-t/profile.bodyDecay);
  const crack=high*profile.crack*Math.exp(-t/profile.crackDecay);
  const ring=Math.sin(2*Math.PI*profile.ring*t)*profile.ringLevel*Math.exp(-t/profile.ringDecay);
  const tail=low*profile.tail*Math.exp(-t/profile.tailDecay);
  const fade=Math.min(1,(profile.duration-t)/.012);
  const value=(body+crack+ring+tail)*fade;
  samples[i]=value;peak=Math.max(peak,Math.abs(value));
 }
 if(peak>0)for(let i=0;i<count;i++)samples[i]*=.86/peak;
 return samples;
}
