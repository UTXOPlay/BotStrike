import test from 'node:test';
import assert from 'node:assert/strict';
import {DeliveryReceipts,DELIVERY_RECEIPT_VERSION,appliedInputAcknowledgement} from '../botstrike-service/delivery-receipts.mjs';
function fixture(options={}){let now=1000;const receipts=new DeliveryReceipts({...options,now:()=>now});const context={owner:Symbol('owner'),room:'a'.repeat(24),life:1};const generation=receipts.prepare(context);return{receipts,context,generation,set:value=>now=value,advance:ms=>now+=ms,issue:(tick=80)=>receipts.issue(tick,generation)};}
function written(f,tick){const delivery=f.issue(tick);assert.equal(f.receipts.written(delivery.nonce,f.generation),true);return delivery;}

test('random 16-byte nonce is not itself receipt authority; only an actual write plus exact current ACK admits input',()=>{
 const f=fixture(),d=f.issue();assert.equal(d.version,DELIVERY_RECEIPT_VERSION);assert.match(d.nonce,/^[a-f0-9]{32}$/);assert.notEqual(d.nonce,f.issue().nonce);
 assert.deepEqual(f.receipts.admit(d,80,80),{ok:false,reason:'unwritten'});assert.equal(f.receipts.written(d.nonce,f.generation),true);
 const result=f.receipts.admit(d,80,80);assert.equal(result.ok,true);assert.equal(result.reason,'received_interval');assert.equal(result.acceptedViewTick,80);assert.equal(result.issuedAt,1000);assert.equal(result.deadlineAt,1400);assert.equal(f.receipts.isFresh(result.deadlineAt,result.generation),true);assert.equal(f.receipts.isFresh(result.deadlineAt),false,'application must retain the admitted generation too');
 assert.equal(f.receipts.snapshot().authority,'state_byte_receipt_only_not_render_or_human');assert.equal(JSON.stringify(f.receipts.snapshot()).includes(d.nonce),false);
});

test('reusing nonce and ACKing other nonces never extends the original absolute 400ms deadline',()=>{
 const f=fixture(),first=written(f,80),a=f.receipts.admit(first,80,80);f.advance(300);
 const later=written(f,84),b=f.receipts.admit(later,82,84);assert.equal(b.deadlineAt,1700);assert.equal(b.acceptedViewTick,82);
 const repeated=f.receipts.admit(first,82,84);assert.equal(repeated.deadlineAt,a.deadlineAt);assert.equal(repeated.issuedAt,1000);
 f.advance(100);assert.equal(f.receipts.isFresh(a.deadlineAt,a.generation),false);assert.equal(f.receipts.isFresh(b.deadlineAt,b.generation),true);
 assert.deepEqual(f.receipts.admit(first,82,84),{ok:false,reason:'expired'});f.set(1700);assert.equal(f.receipts.isFresh(b.deadlineAt,b.generation),false);
});

test('view interval uses explicit same-generation ACK endpoints, never unacknowledged inner writes',()=>{
 const f=fixture(),old=written(f,80),middle=written(f,84),future=written(f,88);
 let a=f.receipts.admit(old,86,90);assert.equal(a.acceptedViewTick,80);assert.equal(a.low,80);assert.equal(a.high,80);
 a=f.receipts.admit(middle,82,90);assert.equal(a.acceptedViewTick,82);assert.equal(a.low,80);assert.equal(a.high,84);
 assert.equal(f.receipts.admit(old,88,90).acceptedViewTick,84,'inner write of tick88 alone cannot authorize it');
 assert.equal(f.receipts.admit(future,86,90).acceptedViewTick,86);assert.equal(f.receipts.admit(old,0,93).acceptedViewTick,81,'current minus12 caps ACK history');
 assert.equal(f.receipts.admit(old,undefined,93).acceptedViewTick,null);assert.equal(f.receipts.admit(old,80,110).reason,'no_current_history');assert.equal(f.receipts.admit(old,80,110).acceptedViewTick,110);
});

for(const [key,next,reason]of [['owner',Symbol('replacement'),'old_owner'],['room','b'.repeat(24),'old_room'],['life',2,'old_life']])test(`${key} generation changes revoke delayed callbacks, ACKs and existing application deadline`,()=>{
 const f=fixture(),d=written(f,80),a=f.receipts.admit(d,80,80),pending=f.issue(84);const generation=f.receipts.prepare({...f.context,[key]:next});assert.notEqual(generation,f.generation);
 assert.equal(f.receipts.written(pending.nonce,f.generation),false);assert.deepEqual(f.receipts.admit(d,80,84),{ok:false,reason});assert.equal(f.receipts.isFresh(a.deadlineAt,a.generation),false);
 const current=f.receipts.issue(84,generation);assert.equal(f.receipts.written(current.nonce,generation),true);assert.equal(f.receipts.admit(current,80,84,generation).acceptedViewTick,84);
});

test('explicit ownership reset clears authority even when the next room/life values match',()=>{
 const f=fixture(),d=written(f,80),a=f.receipts.admit(d,80,80);f.receipts.reset();const g=f.receipts.prepare(f.context);assert.notEqual(g,f.generation);assert.deepEqual(f.receipts.admit(d,80,80),{ok:false,reason:'old_owner'});assert.equal(f.receipts.isFresh(a.deadlineAt,a.generation),false);
});

test('missing, malformed, unknown, expired and future receipts have fixed reasons without echoing raw nonce',()=>{
 const f=fixture();assert.equal(DELIVERY_RECEIPT_VERSION,2);assert.deepEqual(f.receipts.admit(undefined,80,80),{ok:false,reason:'missing'});assert.deepEqual(f.receipts.admit({version:1,nonce:'private-value'},80,80),{ok:false,reason:'unsupported_version'});
 for(const delivery of [{version:2,nonce:'private-value'},{version:2,nonce:'f'.repeat(32)},{version:2,nonce:'f'.repeat(32),account:'private-value'}]){const rejected=f.receipts.admit(delivery,80,80);assert.deepEqual(rejected,{ok:false,reason:'unknown'});assert.equal(JSON.stringify(rejected).includes('private-value'),false);}
 const d=written(f,88);assert.deepEqual(f.receipts.admit(d,88,87),{ok:false,reason:'future_receipt'});assert.deepEqual(f.receipts.admit(d,-1,88),{ok:false,reason:'invalid_tick'});f.advance(400);assert.equal(f.receipts.written(d.nonce,f.generation),false);assert.deepEqual(f.receipts.admit(d,88,88),{ok:false,reason:'expired'});
});

test('receipt storage, including retired generations, stays bounded and evicted tickets fail closed',()=>{
 const f=fixture({capacity:24}),old=written(f,80),a=f.receipts.admit(old,80,80);for(let i=0;i<1000;i++)written(f,80+i);
 assert.equal(f.receipts.snapshot().entries,24);assert.deepEqual(f.receipts.admit(old,80,1080),{ok:false,reason:'unknown'});
 // Same-time issue has the same deadline, so a deadline alone is intentionally
 // a bounded current-generation lease, not a unique message identifier.
 assert.equal(f.receipts.isFresh(a.deadlineAt,a.generation),false,'only ACKed entries can keep a deadline authoritative');
 for(let i=0;i<100;i++){const g=f.receipts.prepare({...f.context,life:i+2});const d=f.receipts.issue(2000+i,g);f.receipts.written(d.nonce,g);}
 assert.equal(f.receipts.snapshot().entries,24);assert.throws(()=>new DeliveryReceipts({capacity:33}));assert.throws(()=>new DeliveryReceipts({maxAgeMs:500}));
});

test('wall-clock changes cannot affect monotonic lease, and injected clock regression fails explicitly',()=>{
 const f=fixture(),d=written(f,80),a=f.receipts.admit(d,80,80);f.advance(399);assert.equal(f.receipts.isFresh(a.deadlineAt,a.generation),true);f.advance(1);assert.equal(f.receipts.isFresh(a.deadlineAt,a.generation),false);
 f.set(10);assert.throws(()=>f.receipts.admit(d,80,80),/monotonic/);assert.equal(f.receipts.issue(80,999),null);
});

test('service can require the exact acknowledged nonce when two receipts share a deadline',()=>{
 const f=fixture({capacity:2}),old=written(f,80),first=f.receipts.admit(old,80,80),other=written(f,84);f.receipts.admit(other,84,84);written(f,88);
 assert.equal(f.receipts.isFresh(first.deadlineAt,first.generation),true,'another acknowledged same-time entry can share the deadline');assert.equal(f.receipts.isFresh(first.deadlineAt,first.generation,old.nonce),false,'evicted original nonce must not inherit it');assert.equal(f.receipts.isFresh(first.deadlineAt,first.generation,other.nonce),true);
});

test('an applied input ACK requires a fresh final candidate and an exact changed-sequence same-life Native frame',()=>{
 const candidate={seq:83,tick:84,life:1,neutral:true,freshAtWrite:true},before={last_seq:82,life:1},after={last_seq:83,life:1};
 assert.deepEqual(appliedInputAcknowledgement(candidate,before,after,84),{version:1,seq:83,tick:84,life:1,neutral:true});
 assert.equal(appliedInputAcknowledgement({...candidate,freshAtWrite:false},before,after,84),null);
 assert.equal(appliedInputAcknowledgement(candidate,{...before,last_seq:83},after,84),null,'AI coincidence and early-return unchanged seq cannot be an ACK');
 assert.equal(appliedInputAcknowledgement(candidate,before,{...after,last_seq:84},84),null,'a greater seq is not an exact ACK');
 assert.equal(appliedInputAcknowledgement(candidate,before,after,85),null);
 assert.equal(appliedInputAcknowledgement(candidate,before,{...after,life:2},84),null);
 assert.equal(appliedInputAcknowledgement({...candidate,seq:0},before,{...after,last_seq:0},84),null);
});
