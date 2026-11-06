export const anchors=[
 ['attack_spawn','Attack Spawn',[-940,0,1050]],['defense_spawn','Defense Spawn',[940,0,-1050]],
 ['a_pad','A Plant Pad',[-730,0,-680]],['b_pad','B Plant Pad',[760,0,650]],
 ['west_gate','West Lane',[-1100,0,250]],['east_gate','East Lane',[1100,0,-250]],
 ['mid_south','South Mid',[80,0,600]],['mid_north','North Mid',[-80,0,-700]],
 ['mid_west','West Mid',[-200,0,-200]],['mid_east','East Mid',[250,0,200]],
 ['a_entry','A Approach',[-700,0,-350]],['b_entry','B Approach',[700,0,400]],
].map(([id,name,position])=>({id,name,position}));
export function mapAuditRequest(){
 const cases=[];
 const add=(id,slot,hero,weapon,pace,prelude,via,trace=false,dash=false)=>cases.push({id,slot,hero,weapon,pace,prelude,via,trace,dash});
 for(let hero=0;hero<6;hero++)for(const weapon of [2,7,11])for(let slot=0;slot<10;slot++)for(const site of ['a_pad','b_pad'])add(`spawn-${slot}-${site}-h${hero}-w${weapon}-run`,slot,hero,weapon,'run',[],[site],hero===3&&weapon===2);
 for(let hero=0;hero<6;hero++)for(const slot of [0,5])for(const site of ['a_pad','b_pad'])for(const pace of ['walk','crouch'])add(`spawn-${slot}-${site}-h${hero}-w2-${pace}`,slot,hero,2,pace,[],[site]);
 const routes=[
  ['a-to-b-mid',0,['a_pad'],['mid_west','mid_south','b_pad']],
  ['a-to-b-outer',0,['a_pad'],['mid_north','east_gate','b_pad']],
  ['b-to-a-mid',5,['b_pad'],['mid_east','mid_north','a_pad']],
  ['b-to-a-outer',5,['b_pad'],['attack_spawn','west_gate','a_pad']],
  ['a-entry-retreat',0,['a_entry'],['west_gate','attack_spawn']],
  ['b-entry-retreat',5,['b_entry'],['east_gate','defense_spawn']],
  ['a-lurk',0,[],['west_gate','a_entry','mid_north','a_pad']],
  ['b-lurk',0,[],['mid_south','mid_east','east_gate','b_pad']],
  ['a-retake',5,[],['mid_north','a_entry','a_pad']],
  ['b-retake',5,[],['east_gate','b_entry','b_pad']],
  ['a-hold-fallback',5,['a_pad'],['a_entry','mid_north']],
  ['b-hold-fallback',5,['b_pad'],['b_entry','east_gate']],
 ];
 for(let hero=0;hero<6;hero++)for(const [id,slot,prelude,via]of routes)add(`${id}-h${hero}`,slot,hero,2,'run',prelude,via,hero===3);
 for(const slot of [0,5])for(const site of ['a_pad','b_pad'])add(`dash-${slot}-${site}`,slot,0,2,'run',[],[site],true,true);
 return {map:0,anchors,cases,tape_case:cases.findIndex(c=>c.id==='spawn-0-a_pad-h3-w2-run')};
}
