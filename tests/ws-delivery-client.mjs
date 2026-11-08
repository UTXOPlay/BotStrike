// Test/tool client protocol adapter. Receipts come only from that WebSocket's
// actual state messages; this never reads service internals or mints a nonce.
export function trackSocketDelivery(socket){
 let active=false,current=null;
 socket.on('message',raw=>{
  let message;try{message=JSON.parse(raw);}catch{return;}
  if(message.type==='control'){active=message.active===true;current=null;}
  else if(message.type==='input_resync')current=null;
  else if(message.type==='state'){
   const room=message.room,delivery=message.delivery,life=room?.state?.players[room.slot]?.life;
   current=active&&room?.id&&Number.isSafeInteger(life)&&delivery?.version===1&&typeof delivery.nonce==='string'?{room:room.id,life,tick:room.state.tick,delivery:Object.freeze({...delivery})}:null;
  }
 });
 socket.on('close',()=>{active=false;current=null;});
 const get=(room,life)=>current?.room===room&&(life===undefined||current.life===life)?current.delivery:undefined;
 return{
  get,snapshot:()=>current?{...current}:null,
  async ready(room,{life,timeout=5000}={}){const end=performance.now()+timeout;while(performance.now()<end){const delivery=get(room,life);if(delivery)return delivery;await new Promise(resolve=>setTimeout(resolve,5));}throw Error('A current delivery receipt did not arrive on this client WebSocket');},
  envelope(room,input){const delivery=get(room);if(!delivery)throw Error('Input requires an actual current-context WebSocket state receipt');return{type:'input',room,input,delivery};},
 };
}
