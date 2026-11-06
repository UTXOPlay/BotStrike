// Conditional budget trajectories, not a model of player performance or wins.
// Native scenario/protocol tests remain the authority for actual transactions.
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const raw=readFileSync(new URL('../botstrike/spec.json',import.meta.url)),spec=JSON.parse(raw),e=spec.economy;
const policies={
 'save-two-then-rifle-kit':{minimumSave:2,weapon:2,gear:[0,2,1]},
 'force-smg':{minimumSave:0,weapon:1,gear:[]},
 'rifle-armor':{minimumSave:0,weapon:2,gear:[0]},
 'rifle-only':{minimumSave:0,weapon:2,gear:[]},
};
const blocks={
 'six-losses':{wins:[false,false,false,false,false,false],survive:[false,false,false,false,false,false],planted:false},
 'recover-after-two':{wins:[false,false,true,false,true,true],survive:[false,false,true,false,true,true],planted:false},
 'planted-losses':{wins:[false,false,false,true,false,true],survive:[false,false,false,true,false,true],planted:true},
 'survive-and-save':{wins:[false,false,true,false,true,true],survive:[true,true,true,true,true,true],planted:false},
};
const trajectories=[];
for(const [block,b]of Object.entries(blocks))for(const [policy,p]of Object.entries(policies)){
 let balance=e.start,streak=0,weapon=null,armor=0,items=Array(12).fill(0);const rounds=[];
 for(let i=0;i<b.wins.length;i++){
  const before=balance,buys=[];let price=0;
  if(i>=p.minimumSave){
   const desired=(weapon===p.weapon?0:spec.weapons[p.weapon].cost)+p.gear.reduce((n,item)=>n+(item===0?armor===100?0:spec.items[0].cost:items[item]<spec.items[item].capacity?spec.items[item].cost:0),0);
   if(balance>=desired){
    if(weapon!==p.weapon){weapon=p.weapon;buys.push(spec.weapons[weapon].id);price+=spec.weapons[weapon].cost;}
    for(const item of p.gear){if(item===0&&armor<100){armor=100;price+=spec.items[0].cost;buys.push('armor');}else if(item>0&&items[item]<spec.items[item].capacity){items[item]++;price+=spec.items[item].cost;buys.push(spec.items[item].id);}}
   }
  }
  balance-=price;const retained=balance;streak=b.wins[i]?0:Math.min(streak+1,e.loss.length);
  const income=b.wins[i]?e.win:e.loss[streak-1]+(b.planted?e.planted_loss:0);balance=Math.min(e.cap,balance+income);
  rounds.push({round:i+1,creditsBefore:before,buys,spent:price,creditsRetained:retained,primary:weapon===null?null:spec.weapons[weapon].id,armor,win:b.wins[i],survive:b.survive[i],lossTier:streak,roundIncome:income,nextCredits:balance});
  if(!b.survive[i]){weapon=null;armor=0;items=Array(12).fill(0);}
 }
 trajectories.push({block,policy,rounds});
}
const result={version:spec.version,specSha256:createHash('sha256').update(raw).digest('hex'),status:'conditional proposal; not reviewed, not a human outcome distribution',humanParticipants:0,assumptions:['Inputs fix wins, survival and planted outcomes; purchases do not predict wins.','No kills or actor rewards; utility is held rather than used. Armor stays full only in the declared survival block.','No halftime within these six-round blocks; native tests cover half reset.','Policies purchase their entire requested bundle only when affordable; failed affordability keeps the current gear.','No per-ammunition purchases; native round resupply applies to owned weapons.'],trajectories};
const output=process.argv[2];if(output)writeFileSync(output,JSON.stringify(result,null,2)+'\n');else console.log(JSON.stringify(result,null,2));
