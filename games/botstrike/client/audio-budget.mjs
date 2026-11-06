// Count all allocated voices, including the short retiring tail. Reserve eight
// slots against remote overload; essential local cues can evict lower priority
// voices, but their replacement waits for onended rather than exceeding the cap.
export class AudioBudget {
 constructor({limit=32,remoteLimit=24,pendingLimit=8,ttl=80,now=()=>performance.now()}={}) {
  this.limit=limit;this.remoteLimit=remoteLimit;this.pendingLimit=pendingLimit;this.ttl=ttl;this.now=now;
  this.voices=new Set();this.pending=[];this.resetting=false;
  this.stats={admitted:0,dropped:0,expired:0,stolen:0,peakVoices:0,peakPending:0};
 }
 request({priority=1,remote=false,start}) {
  this.drain();
  const job={priority,remote,start,at:this.now()};
  if(this.available(job)){this.start(job);return true;}
  if(remote){this.stats.dropped++;return false;}
  if(this.pending.length>=this.pendingLimit){
   let lowest=0;for(let i=1;i<this.pending.length;i++)if(this.pending[i].priority<this.pending[lowest].priority)lowest=i;
   if(priority<=this.pending[lowest].priority){this.stats.dropped++;return false;}
   this.pending.splice(lowest,1);this.stats.dropped++;
  }
  const victim=[...this.voices].filter(v=>!v.retiring&&v.priority<priority).sort((a,b)=>a.priority-b.priority||a.at-b.at)[0];
  // Never defer behind equally important local cues; this bounds latency and
  // avoids replaying a stale shot once a dense burst has already passed.
  if(!victim&&!([...this.voices].some(v=>v.retiring))){this.stats.dropped++;return false;}
  this.pending.push(job);this.stats.peakPending=Math.max(this.stats.peakPending,this.pending.length);
  if(victim){victim.retiring=true;this.stats.stolen++;victim.stop();}
  return true;
 }
 available(job){return this.voices.size<this.limit&&(!job.remote||[...this.voices].filter(v=>v.remote).length<this.remoteLimit);}
 start(job){
  const voice={...job,retiring:false,stop:()=>{}};this.voices.add(voice);
  this.stats.admitted++;this.stats.peakVoices=Math.max(this.stats.peakVoices,this.voices.size);
  const ended=()=>{if(this.voices.delete(voice)&&!this.resetting)this.drain();};
  try{voice.stop=job.start(ended)||(()=>{});}catch{this.stats.dropped++;ended();}
 }
 drain(){
  if(this.resetting)return;
  const now=this.now();this.pending=this.pending.filter(job=>{if(now-job.at>this.ttl){this.stats.expired++;return false;}return true;});
  this.pending.sort((a,b)=>b.priority-a.priority||a.at-b.at);
  while(this.pending.length&&this.available(this.pending[0]))this.start(this.pending.shift());
 }
 reset(){this.resetting=true;this.pending=[];for(const voice of [...this.voices])voice.stop(true);this.voices.clear();this.resetting=false;}
 snapshot(){return {...this.stats,voices:this.voices.size,remote:[...this.voices].filter(v=>v.remote).length,pending:this.pending.length};}
}
