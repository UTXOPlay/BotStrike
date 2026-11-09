import test from 'node:test';import assert from 'node:assert/strict';
import {networkInterfaceFor,networkChangeFilterPlan} from '../tools/network-lab.mjs';
test('network change binds actual reconnected IPv4 interface and each side of only the selected owned actor',()=>{
 assert.deepEqual(networkInterfaceFor([{ifname:'lo',ifindex:1,addr_info:[{local:'127.0.0.1'}]},{ifname:'eth1',ifindex:7,addr_info:[{local:'172.22.0.9'}]}],'172.22.0.9'),{name:'eth1',index:7});
 const plan=networkChangeFilterPlan({actor:'B',actorIp:'172.22.0.9',serverIp:'172.22.0.2',actorDevice:'eth1'});assert.equal(plan.length,4);assert.ok(plan[0].args.includes('eth1'));assert.equal(plan[1].target,'actor');assert.ok(plan[1].args.includes('ifbdB'));assert.ok(plan[2].args.includes('11'));assert.ok(plan[3].args.includes('172.22.0.9'));assert.ok(plan[3].args.includes('ifbuB'));assert.equal(JSON.stringify(plan).includes('ifbuA'),false);
});
test('unsafe IP/device/actor values fail before constructing Docker/tc operations',()=>{
 assert.throws(()=>networkInterfaceFor([],'172.22.0.9'));assert.throws(()=>networkInterfaceFor([{ifname:'eth0; rm',ifindex:2,addr_info:[{local:'172.22.0.9'}]}],'172.22.0.9'));
 for(const override of [{actor:'foreign'},{actorIp:'x'},{serverIp:'1.2.3.4; x'},{actorDevice:'../eth0'}])assert.throws(()=>networkChangeFilterPlan({actor:'A',actorIp:'172.22.0.9',serverIp:'172.22.0.2',actorDevice:'eth0',...override}));
});
