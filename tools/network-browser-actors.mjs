import {mkdirSync,lstatSync,openSync,writeSync,closeSync,fsyncSync,renameSync,readFileSync,existsSync,constants} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash,randomBytes} from 'node:crypto';
import {performance} from 'node:perf_hooks';

export const NETWORK_GAME_ORIGIN='http://botstrike.localhost:8080';
export const NETWORK_GAME_URL=NETWORK_GAME_ORIGIN+'/games/botstrike/';
const installedPlaywright='/opt/codex-desktop/resources/cua_node/lib/node_modules/playwright/index.mjs';
const installedChromium='/opt/google/chrome/chrome';
const installedShell='/home/arthur/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';

// Resolve once before a matrix run, then pass these exact paths explicitly to
// each actor and bind their file/package versions to the run's provenance.
// Reading the resolver never imports Playwright or launches a browser.
export function browserRuntimePaths(){return {playwrightEntry:process.env.PLAYWRIGHT_ENTRY||(existsSync(installedPlaywright)?installedPlaywright:'playwright'),executablePath:process.env.CHROMIUM_PATH||(existsSync(installedChromium)?installedChromium:existsSync(installedShell)?installedShell:undefined)};}

const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const clone=value=>value===undefined?undefined:structuredClone(value);
const safeText=value=>String(value).replace(/[a-zA-Z0-9_-]{24,}/g,'[redacted]').slice(0,500);
const finite=value=>typeof value==='number'&&Number.isFinite(value);
export function publicInputAck(value){return value?.version===1&&Object.keys(value).sort().join(',')==='life,neutral,seq,tick,version'&&Number.isSafeInteger(value.seq)&&value.seq>0&&Number.isSafeInteger(value.tick)&&value.tick>0&&Number.isSafeInteger(value.life)&&value.life>0&&typeof value.neutral==='boolean'?{version:1,seq:value.seq,tick:value.tick,life:value.life,neutral:value.neutral}:null;}
export function classifyWebGLRenderer(graphics){const renderer=graphics?.unmaskedRenderer;if(typeof renderer!=='string'||!renderer.trim())return'unknown';if(/swiftshader|llvmpipe|softpipe|software/i.test(renderer))return'software';return /intel|iris|nvidia|amd|radeon|apple|adreno|mali|powervr|qualcomm/i.test(renderer)?'hardware':'unknown';}
const vector=value=>Array.isArray(value)&&value.length===3&&value.every(finite)?[...value]:null;
const inputKeys=['action_life','drop','preview_item','throw_mode','practice','seq','viewTick','x','y','yaw','pitch','fire','reload','walk','crouch','jump','ability','interact','scope','weapon','item'];
const poseKeys=['slot','life','team','alive','hero','weapon','health','armor','yaw','pitch','crouch','stance','scoped','landing','last_seq','shots','kills','deaths','assists','damage','reload','recoil'];
function fields(source,keys){return Object.fromEntries(keys.filter(key=>source?.[key]!==undefined&&(typeof source[key]==='boolean'||typeof source[key]==='string'||finite(source[key])||source[key]===null)).map(key=>[key,source[key]]));}
export function publicSnapshot(room){
 if(!room?.state)return {status:room?.status??null,slot:room?.slot??null,tick:null};
 const state=room.state,players=state.players.filter(player=>player&&(player.slot===room.slot||!player.hidden&&player.optical!==false)&&vector(player.position)).map(player=>({...fields(player,poseKeys),position:vector(player.position),velocity:vector(player.velocity),aimPunch:Array.isArray(player.aim_punch)?player.aim_punch.slice(0,2):null}));
 const events=(room.feedback||[]).slice(-64).map(event=>fields(event,['id','tick','kind','actor','target','weapon','item','value','headshot']));
 return {status:room.status,slot:room.slot,tick:state.tick,phase:state.phase,round:state.round,score:state.score,mode:state.config?.mode,map:state.config?.map,players,events};
}
function privateDirectory(directory){
 mkdirSync(directory,{recursive:true,mode:0o700});const stat=lstatSync(directory);
 if(!stat.isDirectory()||stat.isSymbolicLink()||(stat.mode&0o077)!==0||typeof process.getuid==='function'&&stat.uid!==process.getuid())throw Error('Actor artifacts require an owned private directory (mode 0700).');
}
function atomicPrivateJson(file,value){
 const temporary=file+'.'+randomBytes(6).toString('hex')+'.tmp',fd=openSync(temporary,'wx',0o600);
 try{const body=Buffer.from(JSON.stringify(value,null,2)+'\n');let written=0;while(written<body.length)written+=writeSync(fd,body,written,body.length-written);fsyncSync(fd);}finally{closeSync(fd);}renameSync(temporary,file);
}

// Stop at the byte bound rather than rotating away earlier evidence. Callers
// must reject acceptance when dropped>0 or persistenceError is non-null.
export class ActorTrace{
 constructor(directory,id,{maxBytes=64*1024*1024}={}){
  if(!/^[A-Za-z][A-Za-z0-9_-]{0,15}$/.test(id))throw Error('Use a short actor ID, not an identity or path.');
  if(!Number.isSafeInteger(maxBytes)||maxBytes<4096||maxBytes>256*1024*1024)throw Error('Actor trace bound must be 4 KiB to 256 MiB.');
  privateDirectory(directory);this.file=path.join(directory,id+'.jsonl');this.receiptFile=path.join(directory,id+'-receipt.json');this.fd=openSync(this.file,constants.O_CREAT|constants.O_EXCL|constants.O_WRONLY,0o600);this.maxBytes=maxBytes;this.bytes=0;this.events=0;this.dropped=0;this.persistenceError=null;this.hash=createHash('sha256');this.closed=false;
 }
 append(value){
  if(this.closed)throw Error('Actor trace is closed.');
  const line=Buffer.from(JSON.stringify(value)+'\n');if(this.persistenceError||line.length>65536||this.bytes+line.length>this.maxBytes){this.dropped++;return false;}
  try{let written=0;while(written<line.length)written+=writeSync(this.fd,line,written,line.length-written);this.bytes+=line.length;this.events++;this.hash.update(line);return true;}catch(error){this.persistenceError=safeText(error.code||'WRITE_FAILED');this.dropped++;return false;}
 }
 receipt(){return {format:'botstrike-network-browser-trace-1',private:true,maxBytes:this.maxBytes,maxLineBytes:65536,bytes:this.bytes,events:this.events,dropped:this.dropped,persistenceError:this.persistenceError,sha256:this.hash.copy().digest('hex')};}
 flush(extra={}){if(!this.closed)fsyncSync(this.fd);const result={...extra,...this.receipt()};atomicPrivateJson(this.receiptFile,result);if(this.persistenceError)throw Error('Actor trace persistence failed: '+this.persistenceError);return result;}
 close(extra={}){if(this.closed)return this.receipt();try{return this.flush(extra);}finally{closeSync(this.fd);this.closed=true;}}
}

export class NetworkBrowserActor{
 constructor(id,browser,context,page,trace,{timeout=60000,drainMs=100,touch=false,launchProfile={},requireHardware=false}={}){
  this.id=id;this.browser=browser;this.context=context;this.page=page;this.trace=trace;this.timeout=timeout;this.drainMs=drainMs;this.touchEnabled=touch;this.index=0;this.socketGeneration=0;this.roomGeneration=0;this.nextRoomGeneration=0;this.roomGenerations=new Map();this.currentRoom=null;this.control={active:false,nextSeq:null};this.recent=new Map();this.errors=[];this.capture=null;this.drainTimer=null;this.drainInFlight=null;this.captureDropped=0;this.closed=false;this.closing=false;this.heldKeys=new Set();this.heldMouse=new Set();this.mouseAt={x:0,y:0};this.gamepadHandle=null;this.cpuRate=1;this.departed=new Set();
  page.setDefaultTimeout(timeout);page.on('pageerror',error=>{const message=safeText(error.message);this.errors.push(message);if(this.errors.length>32)this.errors.shift();this.record('page_error',{message});});
  this.launchProfile=launchProfile;this.requireHardware=requireHardware;this.browserVersion=null;this.graphics=null;this.ownerGeneration=0;this.proofGeneration=1;this.proofRoom=null;this.proofLife=null;
  page.on('websocket',socket=>this.watchSocket(socket));
 }
 record(kind,data){if(this.trace.closed)return null;const row={index:++this.index,kind,nodeAtMs:performance.now(),nodeUnixMs:Date.now(),data};let recent=this.recent.get(kind);if(!recent){recent=[];this.recent.set(kind,recent);}recent.push(row);if(recent.length>512)recent.shift();this.trace.append(row);return this.unwrap(row);}
 unwrap(row){return row?{index:row.index,nodeAtMs:row.nodeAtMs,nodeUnixMs:row.nodeUnixMs,...clone(row.data)}:null;}
 events(kind,{afterIndex=0,limit=512}={}){return (this.recent.get(kind)||[]).filter(row=>row.index>afterIndex).slice(-Math.min(512,limit)).map(row=>this.unwrap(row));}
 get lastPresentation(){return this.unwrap(this.recent.get('presentation')?.at(-1));}
 get lastInput(){return this.unwrap(this.recent.get('input')?.at(-1));}
 get lastSnapshot(){return this.unwrap(this.recent.get('snapshot')?.at(-1));}
 generationFor(room){const id=typeof room==='string'?room:room?.id;if(!id)return 0;if(!this.roomGenerations.has(id)){this.roomGenerations.set(id,++this.nextRoomGeneration);if(this.roomGenerations.size>32)this.roomGenerations.delete(this.roomGenerations.keys().next().value);}return this.roomGenerations.get(id);}
 trackRoom(room){
  if(room&&this.departed.has(room.id))return;
  if(room&&this.currentRoom?.id===room.id&&(room.state?.tick??0)<(this.currentRoom.state?.tick??0))return;
  this.roomGeneration=this.generationFor(room);this.currentRoom=room;
 }
 watchSocket(socket){
  const url=new URL(socket.url());if(url.origin!==NETWORK_GAME_ORIGIN.replace(/^http/,'ws')||url.pathname!=='/games/botstrike/api/socket')return;
  const generation=++this.socketGeneration;let ownerToken=null;this.record('socket_opening',{generation});
  socket.on('framesent',({payload})=>{let value;try{value=JSON.parse(String(payload));}catch{return;}
   if(value.type==='input')this.record('input',{socketGeneration:generation,ownerGeneration:this.ownerGeneration,proofGeneration:this.proofGeneration,roomGeneration:this.generationFor(value.room),life:this.currentRoom?.state?.players[this.currentRoom.slot]?.life??null,minTick:this.currentRoom?.state?.tick??null,deliveryAttached:!!value.delivery,protocolVersion:value.delivery?.version??null,input:fields(value.input,inputKeys)});
   else if(value.type==='quality')this.record('shared_summary',{socketGeneration:generation,summary:{version:value.version,windowMs:value.windowMs,metrics:value.metrics,counts:value.counts}});
  });
  socket.on('framereceived',({payload})=>{let value;try{value=JSON.parse(String(payload));}catch{return;}
   if(value.type==='state'){const current=generation===this.socketGeneration,stale=current&&value.room&&this.currentRoom?.id===value.room.id&&(value.room.state?.tick??0)<(this.currentRoom.state?.tick??0);if(current&&!stale){const room=value.room?.id??null,life=value.room?.state?.players[value.room.slot]?.life??null;if(room!==this.proofRoom||life!==this.proofLife){this.proofGeneration++;this.proofRoom=room;this.proofLife=life;}this.trackRoom(value.room);}this.record('snapshot',{socketGeneration:generation,currentSocket:current,currentContext:current&&!stale,ownerGeneration:this.ownerGeneration,proofGeneration:this.proofGeneration,controllerActive:this.control.active,roomGeneration:this.generationFor(value.room),...publicSnapshot(value.room),inputAck:publicInputAck(value.inputAck)});}
   else if(value.type==='control'){const token=value.active?value.token:null;if(generation===this.socketGeneration&&token!==ownerToken){this.ownerGeneration++;this.proofGeneration++;}ownerToken=token;const control={active:value.active===true,nextSeq:Number.isSafeInteger(value.nextSeq)?value.nextSeq:null,protocolVersion:value.inputProtocol?.version??null,ownerGeneration:this.ownerGeneration};if(generation===this.socketGeneration)this.control=control;this.record('control',{socketGeneration:generation,currentSocket:generation===this.socketGeneration,proofGeneration:this.proofGeneration,...control});}
   else if(['error','quality_error','input_resync'].includes(value.type)){if(value.type==='input_resync'&&generation===this.socketGeneration)this.proofGeneration++;this.record('socket_error',{socketGeneration:generation,proofGeneration:this.proofGeneration,type:value.type,message:safeText(value.error||value.code||'Rejected')});}
  });
  socket.on('close',()=>{if(generation===this.socketGeneration){this.control={...this.control,active:false};this.proofGeneration++;}this.record('socket_close',{generation,proofGeneration:this.proofGeneration});});
 }
 async boot(){
  const response=await this.page.goto(NETWORK_GAME_URL);if(response?.status()!==200)throw Error('Actor game entry is unavailable.');
  await this.page.waitForFunction(()=>window.BotStrikeQuality&&(document.querySelector('#status')?.textContent.includes('Choose your chassis')||!document.querySelector('#room-info')?.hidden||document.querySelector('#fatal')?.hidden===false));
  if(await this.page.locator('#fatal').isVisible())throw Error('Actor game startup failed: '+safeText(await this.page.locator('#fatal').textContent()));
  await this.installCapture();if(this.touchEnabled&&await this.page.locator('#immersive-gate').isVisible()&&await this.page.locator('#immersive-enter').isVisible()){await this.page.locator('#immersive-enter').click();if(await this.page.evaluate(()=>innerWidth>innerHeight))await this.page.locator('#immersive-gate').waitFor({state:'hidden'});}const cookies=await this.context.cookies(NETWORK_GAME_ORIGIN),initial=await this.capture.evaluate(capture=>capture.sample());this.browserVersion=this.browser.version();this.graphics=initial.graphics;
  this.graphics={...(this.graphics||{}),classification:classifyWebGLRenderer(this.graphics)};
  if(this.requireHardware&&this.graphics.classification!=='hardware')throw Error('Requested hardware cohort has no verified hardware WebGL renderer: '+String(this.graphics?.unmaskedRenderer));
  if(this.launchProfile.gpuMode==='software'&&this.graphics.classification!=='software')throw Error('Requested software cohort did not produce a known software WebGL renderer: '+String(this.graphics?.unmaskedRenderer));
  this.record('boot',{origin:NETWORK_GAME_ORIGIN,guestCookiePresent:cookies.some(cookie=>cookie.name.startsWith('game_')),humanParticipants:0,browserVersion:this.browserVersion,graphics:this.graphics,launchProfile:this.launchProfile,initialWindow:initial.window,controllerApi:'real browser events; optional simulated standard Gamepad API',clockDefinitions:{atMs:'browser performance.now at actual render callback entry',animationAtMs:'RAF animation timestamp used by the unchanged game renderer',nodeAtMs:'driver performance.now at CDP event/drain observation; not network arrival',unix:'wall-clock anchors are correlation estimates, not one-way latency'}});return this;
 }
 async installCapture(){
  this.capture=await this.page.evaluateHandle(()=>{
   const api=window.BotStrikeQuality,queue=[],limit=512,listeners=[];let dropped=0,windowInfo;const mouse={serial:0,x:0,y:0,untrusted:0};
   const canvas=document.querySelector('#arena'),gl=canvas.getContext('webgl2')||canvas.getContext('webgl'),debug=gl?.getExtension('WEBGL_debug_renderer_info'),graphics=gl?{measuredAtMs:performance.now(),version:gl.getParameter(gl.VERSION),renderer:gl.getParameter(gl.RENDERER),vendor:gl.getParameter(gl.VENDOR),unmaskedRenderer:debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):null,unmaskedVendor:debug?gl.getParameter(debug.UNMASKED_VENDOR_WEBGL):null,method:'read-only actual canvas WebGL parameters; no renderer override'}:null;
   const initialCoarse=matchMedia('(pointer: coarse)').matches,sourceConfiguredShadow={width:initialCoarse?512:1024,height:initialCoarse?512:1024,basis:'scene.mjs fixed mapSize branch and observed initial coarse media; not a GPU texture readback'};
   function geometry(){const canvas=document.querySelector('#arena'),rect=canvas.getBoundingClientRect(),v=visualViewport;windowInfo={measuredAtMs:performance.now(),innerWidth,innerHeight,devicePixelRatio,pointerCoarse:matchMedia('(pointer: coarse)').matches,pointerFine:matchMedia('(pointer: fine)').matches,maxTouchPoints:navigator.maxTouchPoints,sourceConfiguredShadow,canvasCss:{x:rect.x,y:rect.y,width:rect.width,height:rect.height},visualViewport:v?{width:v.width,height:v.height,offsetLeft:v.offsetLeft,offsetTop:v.offsetTop,scale:v.scale}:null};}
   function view(){const canvas=document.querySelector('#arena');return {...windowInfo,mobilePresentation:document.documentElement.dataset.mobile==='true',touchControlsPreference:document.querySelector('#touch-controls')?.checked??null,canvasBacking:{width:canvas.width,height:canvas.height},visibility:document.visibilityState,hasFocus:document.hasFocus(),pointerLocked:document.pointerLockElement===canvas,fullscreen:!!document.fullscreenElement,playing:document.documentElement.dataset.playing==='true'};}
   function push(kind,data){if(queue.length>=limit){queue.shift();dropped++;}queue.push({kind,data});}
   function listen(target,name,fn){target.addEventListener(name,fn);listeners.push(()=>target.removeEventListener(name,fn));}
   geometry();for(const name of ['resize','orientationchange'])listen(window,name,()=>{geometry();push('lifecycle',{event:name,atMs:performance.now(),window:view()});});
   for(const name of ['visibilitychange','fullscreenchange','pointerlockchange'])listen(document,name,()=>{geometry();push('lifecycle',{event:name,atMs:performance.now(),window:view()});});
   for(const name of ['blur','focus'])listen(window,name,()=>push('lifecycle',{event:name,atMs:performance.now(),window:view()}));
   listen(window,'mousemove',event=>{if(event.target!==canvas)return;mouse.serial++;mouse.x+=event.movementX;mouse.y+=event.movementY;if(!event.isTrusted)mouse.untrusted++;push('pointer_mouse',{serial:mouse.serial,atMs:performance.now(),trusted:event.isTrusted,movementX:event.movementX,movementY:event.movementY,clientX:event.clientX,clientY:event.clientY,buttons:event.buttons,pointerLocked:document.pointerLockElement===canvas});});
   const offScalar=api.subscribe(sample=>push('scalar',{atMs:sample.atMs,metric:sample.kind,value:sample.value})),offPresentation=api.subscribePresentation(frame=>push('presentation',{...frame,window:view()}));
   return {mouse(){return {...mouse};},drain(){const events=queue.splice(0);const lost=dropped;dropped=0;return {events,dropped:lost};},sample(){return {browserNowMs:performance.now(),browserTimeOriginMs:performance.timeOrigin,browserUnixMs:Date.now(),graphics,window:view(),quality:api.read(),status:document.querySelector('#status')?.textContent??''};},stop(){offScalar();offPresentation();for(const remove of listeners)remove();}};
  });
  this.drainTimer=setInterval(()=>{void this.drain().catch(error=>{this.record('capture_error',{message:safeText(error.message)});});},this.drainMs);this.drainTimer.unref();
 }
 async drain(){
  if(!this.capture||this.closed)return;if(this.drainInFlight)return this.drainInFlight;
  this.drainInFlight=(async()=>{const batch=await this.capture.evaluate(capture=>capture.drain());this.captureDropped+=batch.dropped;if(batch.dropped)this.record('capture_drop',{count:batch.dropped});for(const event of batch.events)this.record(event.kind,event.data);})();
  try{await this.drainInFlight;}finally{this.drainInFlight=null;}
 }
 async clock(){const before={nodeAtMs:performance.now(),unixMs:Date.now()},browser=await this.page.evaluate(()=>({nowMs:performance.now(),timeOriginMs:performance.timeOrigin,unixMs:Date.now()})),after={nodeAtMs:performance.now(),unixMs:Date.now()};return {before,browser,after,meaning:'CDP evaluation bracket; no synchronized-clock or one-way-network assertion'};}
 async sample(){await this.drain();const snapshot=await this.capture.evaluate(capture=>capture.sample());return {id:this.id,index:this.index,clock:await this.clock(),...snapshot,graphics:{...(snapshot.graphics||{}),classification:classifyWebGLRenderer(snapshot.graphics)},browserVersion:this.browserVersion,launchProfile:clone(this.launchProfile),control:clone(this.control),roomGeneration:this.roomGeneration,lastPresentation:this.lastPresentation,lastInput:this.lastInput,lastSnapshot:this.lastSnapshot,captureDropped:this.captureDropped,trace:this.trace.receipt(),errors:[...this.errors],cpuThrottleRate:this.cpuRate};}
 async room({refresh=false}={}){if(refresh){const value=await this.page.evaluate(async()=>{const response=await fetch('/games/botstrike/api/state',{signal:AbortSignal.timeout(15000)});if(!response.ok)throw Error('Public state request failed');return response.json();});this.trackRoom(value.room);}return clone(this.currentRoom);}
 async wait(kind,predicate,{afterIndex,timeout=this.timeout}={}){
  if(typeof predicate!=='function')throw Error('A read-only predicate is required.');const start=afterIndex??this.recent.get(kind)?.at(-1)?.index??0,end=performance.now()+timeout;
  while(performance.now()<end){if(this.closed||this.closing)throw Error(this.id+' actor is closed');await this.drain();for(const row of this.events(kind,{afterIndex:start}))if(await predicate(row))return row;await sleep(20);}throw Error(`${this.id} ${kind} wait timed out after ${timeout} ms`);
 }
 waitPresentation(predicate=()=>true,options={}){return this.wait('presentation',predicate,options);}
 waitInput(predicate=()=>true,options={}){return this.wait('input',predicate,options);}
 async waitRoom(predicate,{timeout=this.timeout}={}){const end=performance.now()+timeout;while(performance.now()<end){if(this.closed||this.closing)throw Error(this.id+' actor is closed');const room=await this.room();if(await predicate(room))return room;await sleep(25);}throw Error(this.id+' public room wait timed out');}
 async mark(label){if(typeof label!=='string'||! /^[a-z0-9_-]{1,64}$/.test(label)||/^[a-f0-9]{24,}$/i.test(label))throw Error('Use a short scenario label, not a credential or identity.');return this.record('marker',{label,clock:await this.clock()});}
 async key(code,state='press'){if(!['down','up','press'].includes(state)||typeof code!=='string'||code.length>40)throw Error('Use a Playwright keyboard code and down/up/press.');this.record('driver_input',{device:'keyboard',code,state});await this.page.keyboard[state](code);if(state==='down')this.heldKeys.add(code);if(state==='up')this.heldKeys.delete(code);}
 async mouse(button='left',state='press'){
  if(!['left','middle','right'].includes(button)||!['down','up','press'].includes(state))throw Error('Use a standard mouse button and down/up/press.');this.record('driver_input',{device:'mouse',button,state});if(state==='press'){await this.page.mouse.down({button});await this.page.mouse.up({button});}else{await this.page.mouse[state]({button});if(state==='down')this.heldMouse.add(button);else this.heldMouse.delete(button);}
 }
 async aim(dx,dy,{steps=1,scopeDrag=false}={}){
  if(!finite(dx)||!finite(dy)||Math.abs(dx)>10000||Math.abs(dy)>10000||!Number.isSafeInteger(steps)||steps<1||steps>100)throw Error('Aim uses bounded real mouse deltas and 1–100 steps.');
  const locked=await this.page.evaluate(()=>document.pointerLockElement===document.querySelector('#arena'));if(!locked&&!scopeDrag)throw Error('Aim needs real pointer lock; use capturePointer() between scenarios. Explicit scopeDrag uses the real right/scope button.');
  this.record('driver_input',{device:'aim',dx,dy,steps,pointerLocked:locked,scopeDrag:!locked&&scopeDrag});
  if(!locked){const box=await this.page.locator('#arena').boundingBox();this.mouseAt={x:box.x+box.width/2,y:box.y+box.height/2};await this.page.mouse.move(this.mouseAt.x,this.mouseAt.y);await this.mouse('right','down');}
  // Chrome full headless preserves CDP's accumulated viewport position under
  // pointer lock. Verify actual trusted DOM movement: some headless-shell builds
  // emit an inverse warp immediately after each CDP move, cancelling the intent.
  const before=await this.capture.evaluate(capture=>capture.mouse());
  const dispatched={dx:Math.round(dx),dy:Math.round(dy)};
  try{this.mouseAt={x:this.mouseAt.x+dispatched.dx,y:this.mouseAt.y+dispatched.dy};await this.page.mouse.move(this.mouseAt.x,this.mouseAt.y,{steps});await sleep(40);const after=await this.capture.evaluate(capture=>capture.mouse()),observed={dx:after.x-before.x,dy:after.y-before.y,events:after.serial-before.serial,untrusted:after.untrusted-before.untrusted,toleranceCssPixels:1.01};await this.drain();this.record('driver_aim_result',{requested:{dx,dy},dispatched,observed,pointerLocked:locked});if(observed.untrusted||Math.abs(observed.dx-dispatched.dx)>observed.toleranceCssPixels||Math.abs(observed.dy-dispatched.dy)>observed.toleranceCssPixels||((dispatched.dx||dispatched.dy)&&observed.events===0))throw Error(this.id+' browser pointer movement is unsupported: '+JSON.stringify({requested:{dx,dy},dispatched,observed}));return observed;}finally{if(!locked)await this.mouse('right','up');}
 }
 async capturePointer(){if((await this.sample()).window.playing)await this.action('menu');await this.action('resume');await this.page.waitForFunction(()=>document.pointerLockElement===document.querySelector('#arena'));return this.sample();}
 async touch(type,points=[]){if(!this.touchEnabled)throw Error('Enable touch on the actor context before using CDP touch.');if(!['touchStart','touchMove','touchEnd','touchCancel'].includes(type)||!Array.isArray(points)||points.length>5||points.some(point=>!finite(point.x)||!finite(point.y)||!Number.isSafeInteger(point.id)))throw Error('Use bounded CDP touch points.');points=points.map(({id,x,y})=>({id,x,y}));this.cdp??=await this.context.newCDPSession(this.page);this.record('driver_input',{device:'touch',type,points});await this.cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points});}
 async rotate(width,height){if(!this.touchEnabled||!Number.isSafeInteger(width)||!Number.isSafeInteger(height)||width<200||height<200||width>4096||height>4096)throw Error('Rotate requires an emulated touch context and bounded dimensions.');this.cdp??=await this.context.newCDPSession(this.page);await this.cdp.send('Emulation.setDeviceMetricsOverride',{width,height,screenWidth:width,screenHeight:height,mobile:true,deviceScaleFactor:await this.page.evaluate(()=>devicePixelRatio),screenOrientation:{type:width>height?'landscapePrimary':'portraitPrimary',angle:width>height?90:0}});this.record('device_rotation',{width,height});}
 async gamepad({axes=[0,0,0,0],buttons=[],connected=true}={}){
  if(axes.length!==4||axes.some(value=>!finite(value)||Math.abs(value)>1)||buttons.some(value=>!Number.isSafeInteger(value)||value<0||value>16))throw Error('Use four standard axes and button indices 0–16.');
  if(!this.gamepadHandle)this.gamepadHandle=await this.page.evaluateHandle(()=>{const original=Object.getOwnPropertyDescriptor(navigator,'getGamepads'),held=Array(17).fill(false),reads=Array(17).fill(0),pad={index:0,connected:true,mapping:'standard',axes:[0,0,0,0],buttons:Array.from({length:17},(_,index)=>({get pressed(){reads[index]++;return held[index];},get value(){return held[index]?1:0;}}))};Object.defineProperty(navigator,'getGamepads',{configurable:true,value:()=>pad.connected?[pad]:[]});return {set(value){pad.axes=value.axes;pad.connected=value.connected;held.fill(false);for(const index of value.buttons)held[index]=true;},restore(){if(original)Object.defineProperty(navigator,'getGamepads',original);else delete navigator.getGamepads;},reads};});
  this.record('driver_input',{device:'simulated_standard_gamepad',axes,buttons,connected});await this.gamepadHandle.evaluate((handle,value)=>handle.set(value),{axes,buttons,connected});
 }
 async gamepadTap(index){if(!Number.isSafeInteger(index)||index<0||index>16)throw Error('Use a standard button index.');if(!this.gamepadHandle)await this.gamepad();const before=await this.gamepadHandle.evaluate((handle,index)=>handle.reads[index],index);await this.gamepad({buttons:[index]});const deadline=performance.now()+this.timeout;try{while(await this.gamepadHandle.evaluate((handle,index)=>handle.reads[index],index)<=before){if(performance.now()>=deadline)throw Error('Gamepad was not sampled by the game.');await sleep(10);}}finally{await this.gamepad();}const released=await this.gamepadHandle.evaluate((handle,index)=>handle.reads[index],index);while(await this.gamepadHandle.evaluate((handle,index)=>handle.reads[index],index)<=released){if(performance.now()>=deadline)throw Error('Gamepad release was not sampled by the game.');await sleep(10);}}
 async cpuThrottle(rate=1){if(!finite(rate)||rate<1||rate>100)throw Error('CDP CPU throttle must be 1–100.');this.cdp??=await this.context.newCDPSession(this.page);await this.cdp.send('Emulation.setCPUThrottlingRate',{rate});this.cpuRate=rate;this.record('cpu_throttle',{rate,classification:'browser CPU slowdown; not network shaping or physical FPS'});}
 async action(name,args={}){
  this.record('action',{name,args:fields(args,['mode','ruleset','map','hero','difficulty','item','ready'])});
  const click=async(selector,type)=>{await this.page.locator(selector).scrollIntoViewIfNeeded();const box=await this.page.locator(selector).boundingBox();this.mouseAt={x:box.x+box.width/2,y:box.y+box.height/2};const [response]=await Promise.all([this.page.waitForResponse(response=>{if(!response.url().endsWith('/games/botstrike/api/action')||response.request().method()!=='POST')return false;try{return response.request().postDataJSON()?.type===type;}catch{return false;}}),this.page.locator(selector).click({position:{x:box.width/2,y:box.height/2}})]);const value=await response.json();if(!response.ok())throw Error('Game action rejected: '+safeText(value.error||response.status()));this.trackRoom(value.room);return clone(value.room);};
  if(name==='private'){
   if(args.hero!==undefined)await this.page.locator('.hero-card').nth(args.hero).click();if(args.mode)await this.page.locator('#mode').selectOption(args.mode);if(args.ruleset)await this.page.locator('#private-ruleset').selectOption(args.ruleset);if(args.difficulty!==undefined)await this.page.locator('#difficulty').selectOption(String(args.difficulty));if(args.map!==undefined)await this.page.locator('.map-card').nth(args.map).click();return click('#private','create');
  }
  if(name==='join'){if(!/^[a-f0-9]{24}$/.test(args.room||''))throw Error('A complete private invite code is required.');this.departed.delete(args.room);if(args.hero!==undefined)await this.page.locator('.hero-card').nth(args.hero).click();await this.page.locator('#invite').fill(args.room);return click('#join','join');}
  if(name==='start'){const room=await click('#start','start');await this.page.waitForFunction(()=>document.documentElement.dataset.playing==='true');return room;}
  if(name==='ready'){const room=await this.room();if(args.ready!==undefined&&room?.roster[room.slot]?.ready===args.ready)return room;return click('#tactical-ready','ready');}
  if(name==='resume'){if(await this.page.evaluate(()=>document.documentElement.dataset.playing==='true'))return this.room();await this.page.locator('#resume').scrollIntoViewIfNeeded();const box=await this.page.locator('#resume').boundingBox();this.mouseAt={x:Math.round(box.x+box.width/2),y:Math.round(box.y+box.height/2)};await this.page.mouse.click(this.mouseAt.x,this.mouseAt.y);await this.page.waitForFunction(()=>document.documentElement.dataset.playing==='true');return this.room();}
  if(name==='menu'){for(let attempt=0;attempt<3&&await this.page.evaluate(()=>document.documentElement.dataset.playing==='true');attempt++)await this.key('Escape','press');return this.room();}
  if(name==='leave'){const previous=await this.room();if(!previous)return null;await this.action('menu');const room=await click('#leave','leave');this.departed.add(previous.id);if(this.departed.size>32)this.departed.delete(this.departed.values().next().value);this.currentRoom=null;return room;}
  if(name==='buy'){if(!Number.isSafeInteger(args.item)||args.item<0||args.item>112)throw Error('Use a native catalog item number.');await this.page.locator('#buy-open').click();const category=args.item>=100?'equipment':'weapon';await this.page.locator('#armory-tabs button').nth(category==='equipment'?1:0).click();const card=this.page.locator(`#buy-items>button[data-item="${args.item}"]`);if(['owned','equipped'].includes(await card.getAttribute('data-availability')))throw Error('Item is already owned; use its existing weapon hotkey to equip.');const room=await click(`#buy-items>button[data-item="${args.item}"]`,'buy');await this.page.locator('#buy-close').click();return room;}
  throw Error('Supported UI actions: private, join, start, ready, resume, menu, leave, buy.');
 }
 async setRenderFps(fps){
  if(![30,60,120].includes(fps))throw Error('Use an existing 30/60/120 render preference.');const playing=(await this.sample()).window.playing;if(playing)await this.action('menu');const summary=this.page.locator('details.settings>summary');if(!await this.page.locator('details.settings').evaluate(node=>node.open))await summary.click();await this.page.locator('#render-fps').selectOption(String(fps));this.record('render_preference',{fps,classification:'requested game cap; actual callback intervals are measured separately'});if(playing)await this.action('resume');return this.sample();
 }
 async saveSession(file){privateDirectory(path.dirname(path.resolve(file)));const account=await this.page.evaluate(()=>fetch('/games/botstrike/api/me').then(response=>response.json()));atomicPrivateJson(path.resolve(file),{classification:'private credentials; never attach to quality traces',origin:NETWORK_GAME_ORIGIN,cookies:await this.context.cookies(NETWORK_GAME_ORIGIN),account});return path.resolve(file);}
 async neutral(){for(const code of this.heldKeys)await this.page.keyboard.up(code);this.heldKeys.clear();for(const button of this.heldMouse)await this.page.mouse.up({button});this.heldMouse.clear();if(this.touchEnabled)await this.touch('touchCancel',[]);if(this.gamepadHandle)await this.gamepad({});}
 async flush(){await this.drain();return this.trace.flush({id:this.id,humanParticipants:0,captureDropped:this.captureDropped,errors:this.errors,browserVersion:this.browserVersion,graphics:this.graphics,launchProfile:this.launchProfile,limitations:['automated browser actors','no physical-input or real-internet acceptance','CDP receive/drain times are not browser packet arrivals']});}
 async close({leave=true}={}){
  if(this.closed)return;this.closing=true;let cleanupError=null;try{await this.neutral();if(leave&&this.currentRoom){await this.action('menu');if(await this.page.locator('#leave').isEnabled())await this.action('leave');else cleanupError='Observer was not allowed to leave; ownership was not stolen.';}}catch(error){cleanupError=safeText(error.message);}
  clearInterval(this.drainTimer);try{await this.drain();await this.capture?.evaluate(capture=>capture.stop());await this.gamepadHandle?.evaluate(handle=>handle.restore());}catch(error){cleanupError??=safeText(error.message);}this.record('cleanup',{left:!this.currentRoom,error:cleanupError});this.closed=true;try{await this.browser.close();}finally{this.trace.close({id:this.id,humanParticipants:0,captureDropped:this.captureDropped,errors:this.errors,cleanupError,browserVersion:this.browserVersion,graphics:this.graphics,launchProfile:this.launchProfile});}
 }
}

export async function createBrowserActors({actors,directory,viewport={width:1280,height:720},deviceScaleFactor=.5,renderFps=30,presentationCohort='desktop',gpuMode='hardware',headless=true,chromiumArgs=[],launchEnv={},requireHardware=false,timeout=60000,maxBytes=64*1024*1024,playwrightEntry,executablePath}={}){
 const runtime=browserRuntimePaths();if(playwrightEntry===undefined)playwrightEntry=runtime.playwrightEntry;if(executablePath===undefined)executablePath=runtime.executablePath;
 if(!Array.isArray(actors)||actors.length<1||actors.length>2||new Set(actors.map(actor=>actor.id)).size!==actors.length)throw Error('Use one or two uniquely named actors.');if(![30,60,120].includes(renderFps))throw Error('Unsupported initial render cap.');directory=path.resolve(directory);privateDirectory(directory);
 if(!['desktop','mobile-keyboard'].includes(presentationCohort)||!['hardware','software'].includes(gpuMode)||!Array.isArray(chromiumArgs)||chromiumArgs.length>32||chromiumArgs.some(arg=>typeof arg!=='string'||arg.length>1000||/[\0\r\n]/.test(arg)))throw Error('Use an explicit bounded browser launch profile.');
 requireHardware=gpuMode==='hardware'||requireHardware===true;
 const launchProfile={presentationCohort,gpuMode,headless,executablePath:executablePath??'playwright-default',args:[...new Set(['--no-sandbox','--enable-unsafe-swiftshader','--mute-audio',...(gpuMode==='hardware'?['--enable-gpu']:[]),...chromiumArgs])],environmentKeys:Object.keys(launchEnv),requireHardware};
 const {chromium}=await import(playwrightEntry),created={},list=[];
 try{
  for(const definition of actors){
   if(!Number.isInteger(definition.proxyPort)||definition.proxyPort<1||definition.proxyPort>65535)throw Error('Each actor needs an explicit local lab proxy port.');
   const trace=new ActorTrace(directory,definition.id,{maxBytes});let browser;
   try{browser=await chromium.launch({headless,...(executablePath?{executablePath}:{}),args:launchProfile.args,env:{...process.env,...launchEnv}});const mobile=definition.touch===true||presentationCohort==='mobile-keyboard',context=await browser.newContext({viewport,deviceScaleFactor,reducedMotion:'reduce',isMobile:mobile,hasTouch:mobile,proxy:{server:'http://127.0.0.1:'+definition.proxyPort,bypass:'<-loopback>'}});await context.addInitScript(({fps,keyboardMobile})=>localStorage.setItem('botstrike:settings',JSON.stringify({renderFps:fps,sound:false,motion:false,aimAssist:0,gamepadAimAssist:0,sensitivity:1,ads:.65,fov:80,invertY:false,keyboardLayout:'qwerty',...(keyboardMobile?{touch:false}:{})})),{fps:renderFps,keyboardMobile:presentationCohort==='mobile-keyboard'});const page=await context.newPage(),actor=new NetworkBrowserActor(definition.id,browser,context,page,trace,{timeout,touch:mobile,launchProfile,requireHardware});created[definition.id]=actor;list.push(actor);await actor.boot();}catch(error){if(!list.some(actor=>actor.trace===trace)){await browser?.close();trace.close({startupFailed:true,error:safeText(error.message)});}throw error;}
  }
  return {actors:created,origin:NETWORK_GAME_ORIGIN,directory,async flush(){return Promise.all(list.map(actor=>actor.flush()));},async close(options){const results=await Promise.allSettled(list.map(actor=>actor.close(options)));const failure=results.find(result=>result.status==='rejected');if(failure)throw failure.reason;}};
 }catch(error){await Promise.allSettled(list.map(actor=>actor.close({leave:false})));throw error;}
}

async function smoke(){
 const aPort=Number(process.env.ACTOR_A_PROXY_PORT),bPort=Number(process.env.ACTOR_B_PROXY_PORT),directory=process.env.NETWORK_ACTOR_ARTIFACTS;if(!directory)throw Error('Set private NETWORK_ACTOR_ARTIFACTS and ACTOR_A_PROXY_PORT/ACTOR_B_PROXY_PORT.');
 const lab=await createBrowserActors({directory,actors:[{id:'A',proxyPort:aPort},{id:'B',proxyPort:bPort}]});
 try{const {A,B}=lab.actors,room=await A.action('private',{mode:'deathmatch',ruleset:'casual',map:0,hero:0});await B.action('join',{room:room.id,hero:0});await A.action('start');await B.action('resume');await Promise.all([A.capturePointer(),B.capturePointer()]);await Promise.all([A.key('KeyW','down'),B.key('KeyD','down')]);await sleep(250);await Promise.all([A.key('KeyW','up'),B.key('KeyD','up')]);await Promise.all([A.aim(12,-2),B.aim(-10,1)]);const samples=await Promise.all([A.sample(),B.sample()]);if(samples.some(sample=>sample.window.visibility!=='visible'||!sample.window.hasFocus||!sample.window.playing))throw Error('Independent-browser focus/visibility limitation observed; do not claim simultaneous active actors.');await Promise.all([A.waitInput(row=>row.input.y>0,{afterIndex:0}),B.waitInput(row=>row.input.x>0,{afterIndex:0}),A.waitPresentation(()=>true),B.waitPresentation(()=>true)]);await lab.flush();console.log(JSON.stringify({softwareSmoke:true,humanParticipants:0,networkAcceptance:false,simultaneouslyVisibleFocused:samples.every(sample=>sample.window.visibility==='visible'&&sample.window.hasFocus),directory}));}finally{await lab.close();}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){if(process.argv[2]==='--smoke')await smoke();else console.log('Import createBrowserActors(), or set ACTOR_A_PROXY_PORT/ACTOR_B_PROXY_PORT/NETWORK_ACTOR_ARTIFACTS and pass --smoke. No network acceptance is implied.');}
