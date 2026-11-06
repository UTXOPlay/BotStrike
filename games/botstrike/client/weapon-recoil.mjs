// Native recoil contract: degrees in the spec, radians in aim_punch, fixed 64 Hz.
// This module predicts presentation only. No hit, ammo or score claims are sent.
const HZ=64,rad=Math.PI/180;
export const freshRecoil=()=>({recoil:0,aim_punch:[0,0],recoil_index:0,recoil_idle:0});
export function recoverRecoil(s,p){
 s.recoil_idle=Math.min(0xffffffff,s.recoil_idle+1);
 if(s.recoil_idle<=p.recovery_delay)return;
 const speed=s.recoil_index>=p.long_burst?p.recovery_long:p.recovery_short;
 const length=Math.hypot(...s.aim_punch),step=speed*rad/HZ,scale=length>step?(length-step)/length:0;
 s.aim_punch=s.aim_punch.map(v=>v*scale);
 s.recoil=Math.max(0,s.recoil-p.spread_recovery/HZ);
 if(s.aim_punch.every(v=>v===0)&&s.recoil===0)s.recoil_index=0;
}
export function applyRecoil(s,p){
 const delta=p.pattern[Math.min(s.recoil_index,p.pattern.length-1)];
 s.aim_punch=s.aim_punch.map((v,a)=>Math.max(-p.cap[a]*rad,Math.min(p.cap[a]*rad,v+delta[a]*rad)));
 s.recoil=Math.min(p.spread_cap,s.recoil+p.spread_per_shot);
 s.recoil_index=Math.min(0xffffffff,s.recoil_index+1);s.recoil_idle=0;
}
export function weaponAim(yaw,pitch,punch=[0,0]){return[yaw+punch[0],Math.max(-1.5,Math.min(1.5,pitch+punch[1]))];}

// One native weapon tick. Replays do not emit effects; callers choose whether
// to present the returned shot. Native snapshots replace every predicted field.
export function advanceWeaponTick(p,input,weapons){
 if(!p.alive)return null;
 for(const key of ['fire_wait','overclock','effect'])p[key]=Math.max(0,p[key]-1);
 recoverRecoil(p,weapons[p.weapon].recoil);
 if(p.reload>0&&--p.reload===0){const n=Math.min(weapons[p.weapon].magazine-p.ammo[p.weapon],p.reserve[p.weapon]);p.ammo[p.weapon]+=n;p.reserve[p.weapon]-=n;}
 if(input.weapon!=null&&p.owned[input.weapon]&&input.weapon!==p.weapon){p.weapon=input.weapon;p.reload=0;p.burst_remaining=0;p.fire_wait=10;Object.assign(p,freshRecoil());}
 const w=weapons[p.weapon];
 if(input.reload&&!p.reload&&p.ammo[p.weapon]<w.magazine&&p.reserve[p.weapon]>0){p.reload=w.reload;p.burst_remaining=0;}
 if(!(input.fire||p.burst_remaining>0)||p.fire_wait>0||p.reload>0||p.ammo[p.weapon]===0)return null;
 const [yaw,pitch]=weaponAim(input.yaw,input.pitch,p.aim_punch),shot={weapon:p.weapon,yaw,pitch,number:p.shots+1,life:p.life};
 p.ammo[p.weapon]--;p.shots++;p.burst_remaining=p.burst_remaining===0?w.burst-1:p.burst_remaining-1;
 const interval=p.burst_remaining>0?w.burst_interval:w.interval;
 p.fire_wait=(p.hero===5&&p.effect>0)||p.overclock>0?Math.max(1,Math.floor(interval*2/3)):interval;
 applyRecoil(p,w.recoil);return shot;
}

export class WeaponPrediction{
 constructor(weapons){this.weapons=weapons;this.history=[];this.state=null;this.time=0;this.fraction=0;this.latched=false;}
 reset(player,now){this.state=structuredClone(player);this.time=now;this.fraction=0;this.history=[];this.latched=false;this.presented=player.shots||0;}
 record(input,now){this.history.push({input:{...input},at:now});if(this.history.length>128)this.history.shift();this.latched ||= input.fire;}
 advance(input,seconds,emit,firstFire=false){
  this.fraction+=Math.max(0,Math.min(.25,seconds))*64;
  while(this.fraction>=1){this.fraction--;const shot=advanceWeaponTick(this.state,{...input,fire:input.fire||firstFire},this.weapons);firstFire=false;if(shot&&emit&&shot.number>this.presented){this.presented=shot.number;emit(shot);}}
 }
 reconcile(player,now,live=true){
  if(!this.state||player.life!==this.state.life||player.hero!==this.state.hero){this.reset(player,now);return;}
  const acknowledged=this.history.findLast(s=>s.input.seq<=player.last_seq),pending=this.history.filter(s=>s.input.seq>player.last_seq);
  this.state=structuredClone(player);this.fraction=0;
  if(live)for(let i=0;i<pending.length;i++){const start=Math.max(now-250,pending[i].at),end=Math.min(now,pending[i+1]?.at??now);if(end>start)this.advance(pending[i].input,(end-start)/1000);}
  this.history=acknowledged?[acknowledged,...pending]:pending;this.time=now;this.latched=false;
 }
 step(input,now,live=true,emit){
  if(!this.state)return null;
  const seconds=(now-this.time)/1000;this.time=now;
  if(live){const before=this.fraction;this.advance(input,seconds,emit,this.latched);if(before+Math.max(0,Math.min(.25,seconds))*64>=1)this.latched=false;}
  return this.state;
 }
}
