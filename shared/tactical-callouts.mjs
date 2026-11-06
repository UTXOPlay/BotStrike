// Stable localization IDs. These retain the #14 proposed flagship study anchors;
// agreement and team comprehension still require the human map/comms exercise.
export const flagshipCallouts=[
 ['attack_spawn','Attack Spawn',[-940,0,1050]],['defense_spawn','Defense Spawn',[940,0,-1050]],
 ['a_pad','A Plant Pad',[-730,0,-680]],['b_pad','B Plant Pad',[760,0,650]],
 ['west_gate','West Lane',[-1100,0,250]],['east_gate','East Lane',[1100,0,-250]],
 ['mid_south','South Mid',[80,0,600]],['mid_north','North Mid',[-80,0,-700]],
 ['mid_west','West Mid',[-200,0,-200]],['mid_east','East Mid',[250,0,200]],
 ['a_entry','A Approach',[-700,0,-350]],['b_entry','B Approach',[700,0,400]],
].map(([id,name,position])=>({id,name,position}));
export const commsKinds=['enemy','rotate','hold','utility','objective','help','mark'];
export const commsEnglish={enemy:'Enemy seen',rotate:'Rotate',hold:'Hold',utility:'Utility ready',objective:'Objective',help:'Help',mark:'Marked location'};
export function mapCallouts(map,id){
 if(id===0)return flagshipCallouts;
 if(map.practice_only)return [['firing_line','Firing Line',0],['near_lane','Near Lane',-100],['mid_lane','Mid Lane',-600],['far_lane','Far Lane',-1500],['long_lane','Long Lane',1500]].map(([id,name,z])=>({id,name,position:[0,0,z]}));
 return flagshipCallouts.map(c=>({...c,position:c.position.map((v,i)=>i===1?0:v*map.extent/1200)}));
}
export function calloutAt(map,id,position){
 const all=mapCallouts(map,id);return all.reduce((a,b)=>Math.hypot(a.position[0]-position[0],a.position[2]-position[2])<=Math.hypot(b.position[0]-position[0],b.position[2]-position[2])?a:b);
}
