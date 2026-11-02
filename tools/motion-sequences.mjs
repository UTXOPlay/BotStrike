// Deterministic visual fixtures, not simulation inputs or signed replay rules.
export const scenarios=['walk','walk_run','stop_reverse','circle','turn_fire','jump_crouch','reload','combat','correction'];
export function motionFrame(scenario,t){
 let forward=250,side=0,yaw=0,y=0,vertical=0,crouch=false,alive=true,life=1,reload=0,map=0,offset=0;
 const events=[];
 if(scenario==='walk'){forward=t<.5?0:t<2.5?100:t<3.5?70:t<5?-90:0;side=t>=2.5&&t<3.5?70:0;}
 // The lab scales this reference speed to each selected hero/weapon range.
 if(scenario==='walk_run'){const phase=t%6;forward=phase<.5||phase>=5?0:250*(phase>=2&&phase<3.5?1:.55);}
 if(scenario==='stop_reverse')forward=t<.75?0:t<2?Math.min(250,(t-.75)*1000):t<3?0:t<5?-200:200;
 if(scenario==='circle'||scenario==='reload'){forward=220*Math.cos(t*1.8);side=220*Math.sin(t*1.8);}
 if(scenario==='turn_fire'){yaw=t<2?0:t<4?Math.PI/2:Math.PI;forward=250*Math.cos(yaw);side=250*Math.sin(yaw);events.push([2,'fire'],[4,'fire']);}
 if(scenario==='jump_crouch'){
  const air=t-2;if(air>0&&air<1){y=280*air*(1-air);vertical=280*(1-2*air);}
  crouch=t>=3.5;forward=crouch?100:250;events.push([4,'fire']);
 }
 if(scenario==='reload'){reload=t>=2&&t<4?128-(t-2)*64:0;events.push([2,'reload',2]);}
 if(scenario==='combat'){events.push([1,'hit',undefined,35],[1.05,'fire'],[2,'utility',undefined,6],[2.5,'use_item',undefined,6]);alive=t<3||t>=5;life=t>=5?2:1;}
 if(scenario==='correction'){offset=t>=2?600:0;map=t>=4?1:0;events.push([1,'fire']);}
 return {velocity:[side*Math.cos(yaw)-forward*Math.sin(yaw),vertical,-side*Math.sin(yaw)-forward*Math.cos(yaw)],yaw,y,crouch,alive,life,reload,map,offset,events};
}
