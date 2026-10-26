// Small procedural cues; bounded voices and one master gain for all feedback.
export function createAudio(settings){
 let context,bus,voices=0,lastStep=0;
 function ready(){try{context??=new AudioContext();if(!bus){bus=context.createGain();bus.connect(context.destination)}bus.gain.value=settings().sound?(settings().volume??.6)*.3:0;if(context.state==='suspended')void context.resume();return context}catch{return null}}
 function pulse(frequency,duration=.12,level=.2,type='triangle',delay=0,spatial=null){
  if(globalThis.document?.hidden)return;const c=ready();if(!c||!settings().sound||voices>=32)return;voices++;
  const start=c.currentTime+delay,osc=c.createOscillator(),envelope=c.createGain(),pan=c.createStereoPanner();pan.pan.value=spatial?.pan||0;
  osc.type=type;osc.frequency.setValueAtTime(frequency*(spatial?.muffled?.65:1),start);osc.frequency.exponentialRampToValueAtTime(Math.max(25,frequency*.22),start+duration);
  envelope.gain.setValueAtTime(.001,start);envelope.gain.exponentialRampToValueAtTime(Math.max(.001,level*(spatial?.level??1)),start+.004);envelope.gain.exponentialRampToValueAtTime(.001,start+duration);
  osc.connect(envelope).connect(pan).connect(bus);osc.start(start);osc.stop(start+duration+.01);osc.onended=()=>{voices--;osc.disconnect();envelope.disconnect();pan.disconnect()};
 }
 const shot=(weapon=0,spatial)=>{pulse([410,870,250,1200,95,670,1500,170,1900,740,1120,65][weapon]||410,.08+(weapon===11?.2:0),.38,'sawtooth',0,spatial);pulse(75,.08,.22,'triangle',0,spatial)};
 function cue(kind,spatial){
  if(kind==='step'||kind==='land'){const now=performance.now();if(now-lastStep<60)return;lastStep=now;pulse(55,.045,kind==='land'?.12:.06,'triangle',0,spatial);}
  else if(kind==='reload'){pulse(620,.04,.12,'square',0,spatial);pulse(900,.035,.1,'square',.09,spatial);}
  else if(kind==='skill'){pulse(300,.25,.15,'sine',0,spatial);pulse(900,.15,.12,'sine',.08,spatial);}
  else if(['item','utility','plasma'].includes(kind))pulse(kind==='plasma'?50:160,.18,.2,'sawtooth',0,spatial);
  else if(kind==='planted'){pulse(900,.16,.18,'square');pulse(1250,.12,.14,'sine',.2);}
  else if(kind==='beep')pulse(1100,.055,.1,'sine');
  else if(kind==='win')[440,660,880].forEach((hz,i)=>pulse(hz,.25,.16,'sine',i*.13));
  else if(kind==='loss')[440,330,220].forEach((hz,i)=>pulse(hz,.22,.13,'sine',i*.13));
  else if(kind==='respawn')pulse(650,.15,.12,'sine');
 }
 return {ready,setVolume:()=>{if(bus)bus.gain.value=settings().sound?(settings().volume??.6)*.3:0;},shot,cue,hit:(head=false)=>{pulse(head?2100:1450,head?.09:.045,.18,'sine');if(head)pulse(2700,.04,.1,'sine',.05)},kill:()=>{pulse(700,.09,.15,'sine');pulse(1400,.1,.12,'sine',.07)},damage:amount=>pulse(65,.16,Math.min(.4,.1+amount/150)),dispose:()=>context?.close()};
}
