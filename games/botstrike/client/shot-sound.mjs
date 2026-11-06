export const shotProfiles={
 0:{duration:.28,lowpass:210,pitch:140,drop:85,body:.78,bodyDecay:.085,crack:.9,crackDecay:.009,ring:690,ringLevel:.2,ringDecay:.07,tail:.38,tailDecay:.16},
 1:{duration:.15,lowpass:680,pitch:520,drop:360,body:.42,bodyDecay:.037,crack:.75,crackDecay:.004,ring:1750,ringLevel:.27,ringDecay:.035,tail:.16,tailDecay:.07},
 2:{duration:.105,lowpass:500,pitch:320,drop:140,body:.38,bodyDecay:.038,crack:.68,crackDecay:.004,ring:1020,ringLevel:.3,ringDecay:.038,tail:.18,tailDecay:.06,coil:.2,coilBase:760,coilSweep:1300,coilDecay:.028},
 3:{duration:.32,lowpass:300,pitch:135,drop:80,body:.48,bodyDecay:.11,crack:.95,crackDecay:.006,ring:1150,ringLevel:.18,ringDecay:.09,tail:.25,tailDecay:.16,coil:.5,coilBase:650,coilSweep:2100,coilDecay:.085},
 4:{duration:.38,lowpass:180,pitch:110,drop:70,body:.9,bodyDecay:.105,crack:.86,crackDecay:.012,ring:420,ringLevel:.12,ringDecay:.09,tail:.5,tailDecay:.22,blast:.65,blastDecay:.07,mechanism:.42},
 5:{duration:.09,lowpass:900,pitch:420,drop:180,body:.33,bodyDecay:.025,crack:.55,crackDecay:.003,ring:1440,ringLevel:.26,ringDecay:.025,tail:.12,tailDecay:.035,coil:.12,coilBase:580,coilSweep:900,coilDecay:.025},
 6:{duration:.12,lowpass:380,pitch:190,drop:80,body:.66,bodyDecay:.041,crack:.62,crackDecay:.004,ring:640,ringLevel:.23,ringDecay:.046,tail:.2,tailDecay:.06,coil:.1,coilBase:1700,coilSweep:500,coilDecay:.03},
 7:{duration:.17,lowpass:240,pitch:115,drop:35,body:.8,bodyDecay:.06,crack:.6,crackDecay:.006,ring:330,ringLevel:.22,ringDecay:.055,tail:.26,tailDecay:.08},
 8:{duration:.22,lowpass:1100,pitch:780,drop:520,body:.25,bodyDecay:.04,crack:.4,crackDecay:.004,ring:2100,ringLevel:.4,ringDecay:.08,tail:.12,tailDecay:.06,coil:.5,coilBase:1700,coilSweep:1400,coilDecay:.06},
 9:{duration:.24,lowpass:700,pitch:520,drop:360,body:.4,bodyDecay:.05,crack:.7,crackDecay:.005,ring:1570,ringLevel:.3,ringDecay:.07,tail:.18,tailDecay:.07,coil:.26,coilBase:380,coilSweep:2200,coilDecay:.07},
 10:{duration:.18,lowpass:500,pitch:220,drop:120,body:.5,bodyDecay:.055,crack:.5,crackDecay:.006,ring:860,ringLevel:.3,ringDecay:.08,tail:.18,tailDecay:.07,coil:.4,coilBase:280,coilSweep:600,coilDecay:.05,flutter:45},
 11:{duration:.38,lowpass:160,pitch:70,drop:30,body:.9,bodyDecay:.15,crack:.3,crackDecay:.01,ring:190,ringLevel:.2,ringDecay:.14,tail:.4,tailDecay:.14,coil:.6,coilBase:90,coilSweep:350,coilDecay:.1,blast:.4,blastDecay:.09,flutter:35},
};

function mechanismWindow(time,start,duration){
 const phase=(time-start)/duration;
 return phase>=0&&phase<=1?Math.sin(Math.PI*phase)**2:0;
}

export function makeShotSample(weapon,sampleRate=44100){
 const profile=shotProfiles[weapon];if(!profile)return null;
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
  const flutter=profile.flutter?.18*Math.sin(2*Math.PI*profile.flutter*t)*Math.exp(-t/.07):0;
  const value=(body+crack+ring+tail+blast+coil+mechanism+flutter)*fade;
  samples[i]=value;peak=Math.max(peak,Math.abs(value));
 }
 if(peak>0)for(let i=0;i<count;i++)samples[i]*=.86/peak;
 return samples;
}
