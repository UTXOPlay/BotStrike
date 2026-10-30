const profiles={
 0:{duration:.28,lowpass:210,pitch:140,drop:85,body:.78,bodyDecay:.085,crack:.9,crackDecay:.009,ring:690,ringLevel:.2,ringDecay:.07,tail:.38,tailDecay:.16},
 1:{duration:.15,lowpass:680,pitch:520,drop:360,body:.42,bodyDecay:.037,crack:.75,crackDecay:.004,ring:1750,ringLevel:.27,ringDecay:.035,tail:.16,tailDecay:.07},
 2:{duration:.105,lowpass:500,pitch:320,drop:140,body:.38,bodyDecay:.038,crack:.68,crackDecay:.004,ring:1020,ringLevel:.3,ringDecay:.038,tail:.18,tailDecay:.06,coil:.2,coilBase:760,coilSweep:1300,coilDecay:.028},
 3:{duration:.32,lowpass:300,pitch:135,drop:80,body:.48,bodyDecay:.11,crack:.95,crackDecay:.006,ring:1150,ringLevel:.18,ringDecay:.09,tail:.25,tailDecay:.16,coil:.5,coilBase:650,coilSweep:2100,coilDecay:.085},
 4:{duration:.38,lowpass:180,pitch:110,drop:70,body:.9,bodyDecay:.105,crack:.86,crackDecay:.012,ring:420,ringLevel:.12,ringDecay:.09,tail:.5,tailDecay:.22,blast:.65,blastDecay:.07,mechanism:.42},
};

function mechanismWindow(time,start,duration){
 const phase=(time-start)/duration;
 return phase>=0&&phase<=1?Math.sin(Math.PI*phase)**2:0;
}

export function makeShotSample(weapon,sampleRate=44100){
 const profile=profiles[weapon];if(!profile)return null;
 const count=Math.ceil(profile.duration*sampleRate),samples=new Float32Array(count);
 const lowpassStep=Math.min(1,2*Math.PI*profile.lowpass/sampleRate),midpassStep=profile.blast?Math.min(1,2*Math.PI*1100/sampleRate):0;
 let seed=(0x9e3779b9+weapon*0x6d2b79f5)>>>0,low=0,mid=0,phase=0,coilPhase=0,peak=0;
 for(let i=0;i<count;i++){
  const t=i/sampleRate;
  seed=(Math.imul(seed,1664525)+1013904223)>>>0;
  const noise=seed/2147483648-1;
  low+=(noise-low)*lowpassStep;
  if(midpassStep)mid+=(noise-mid)*midpassStep;
  const high=noise-low;
  phase+=2*Math.PI*(profile.pitch-profile.drop*Math.min(1,t/.12))/sampleRate;
  if(profile.coil)coilPhase+=2*Math.PI*(profile.coilBase+profile.coilSweep*Math.exp(-t/.055))/sampleRate;
  const body=Math.tanh(Math.sin(phase)*2)*profile.body*Math.exp(-t/profile.bodyDecay);
  const crack=high*profile.crack*Math.exp(-t/profile.crackDecay);
  const ring=Math.sin(2*Math.PI*profile.ring*t)*profile.ringLevel*Math.exp(-t/profile.ringDecay);
  const tail=low*profile.tail*Math.exp(-t/profile.tailDecay);
  const blast=profile.blast?(mid-low)*profile.blast*Math.exp(-t/profile.blastDecay):0;
  const coil=profile.coil?Math.sin(coilPhase)*profile.coil*Math.exp(-t/profile.coilDecay):0;
  const mechanism=profile.mechanism?high*profile.mechanism*(mechanismWindow(t,.152,.018)+.7*mechanismWindow(t,.296,.022)):0;
  const fade=Math.min(1,(profile.duration-t)/.012);
  const value=(body+crack+ring+tail+blast+coil+mechanism)*fade;
  samples[i]=value;peak=Math.max(peak,Math.abs(value));
 }
 if(peak>0)for(let i=0;i<count;i++)samples[i]*=.86/peak;
 return samples;
}
