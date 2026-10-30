var Cf=0,Fh=1,Pf=2;var Uh=0,Is=1,If=2,Ar=3,ni=0,Gt=1,rn=2,ii=0,Rr=1,Oh=2,kh=3,Bh=4,Lf=5;var Ls=100,Df=101,Nf=102,Ff=103,Uf=104,Of=200,kf=201,Bf=202,zf=203,zh=204,Gh=205,Gf=206,Hf=207,Vf=208,Wf=209,qf=210,Xf=211,jf=212,Kf=213,Yf=214,Yo=0,Jo=1,Zo=2,lr=3,$o=4,Qo=5,ec=6,tc=7,wc=0,Jf=1,Zf=2,Gn=0,Hh=1,Vh=2,Wh=3,Xa=4,qh=5,Xh=6,jh=7,Sh="attached",$f="detached",Kh=300,is=301,Ds=302,Ac=303,Rc=304,ja=306,Zn=1e3,Tn=1001,hr=1002,Nt=1003,Cc=1004;var Ns=1005;var Ft=1006,Cr=1007;var Hn=1008;var pn=1009,Yh=1010,Jh=1011,Pr=1012,Pc=1013,Vn=1014,yn=1015,Wn=1016,Ic=1017,Lc=1018,Ir=1020,Zh=35902,$h=35899,Qh=1021,eu=1022,Mn=1023,$n=1026,ss=1027,Dc=1028,Nc=1029,rs=1030,Fc=1031;var Uc=1033,Ka=33776,Ya=33777,Ja=33778,Za=33779,Oc=35840,kc=35841,Bc=35842,zc=35843,Gc=36196,Hc=37492,Vc=37496,Wc=37488,qc=37489,$a=37490,Xc=37491,jc=37808,Kc=37809,Yc=37810,Jc=37811,Zc=37812,$c=37813,Qc=37814,el=37815,tl=37816,nl=37817,il=37818,sl=37819,rl=37820,al=37821,ol=36492,cl=36494,ll=36495,hl=36283,ul=36284,Qa=36285,dl=36286,fl=2200,pl=2201,Qf=2202,ys=2300,Ms=2301,Xo=2302,Eh=2303,xs=2400,_s=2401,ha=2402,ml=2500,ep=2501,tu=0,eo=1,Lr=2,tp=3200;var to=0,np=1,Li="",Et="srgb",hn="srgb-linear",ua="linear",mt="srgb";var jo=7680;var ip=519,sp=512,rp=513,ap=514,gl=515,op=516,cp=517,bl=518,lp=519,nu=35044;var iu="300 es",Bn=2e3,ur=2001;function gg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function bg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function dr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function hp(){let i=dr("canvas");return i.style.display="block",i}var Od={},fr=null;function da(...i){let e="THREE."+i.shift();fr?fr("log",e,...i):console.log(e,...i)}function up(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function qe(...i){i=up(i);let e="THREE."+i.shift();if(fr)fr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ye(...i){i=up(i);let e="THREE."+i.shift();if(fr)fr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function vs(...i){let e=i.join(" ");e in Od||(Od[e]=!0,qe(...i))}function dp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var fp={[Yo]:Jo,[Zo]:ec,[$o]:tc,[lr]:Qo,[Jo]:Yo,[ec]:Zo,[tc]:$o,[Qo]:lr},zn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},$t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],kd=1234567,aa=Math.PI/180,Ss=180/Math.PI;function wn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($t[i&255]+$t[i>>8&255]+$t[i>>16&255]+$t[i>>24&255]+"-"+$t[e&255]+$t[e>>8&255]+"-"+$t[e>>16&15|64]+$t[e>>24&255]+"-"+$t[t&63|128]+$t[t>>8&255]+"-"+$t[t>>16&255]+$t[t>>24&255]+$t[n&255]+$t[n>>8&255]+$t[n>>16&255]+$t[n>>24&255]).toLowerCase()}function st(i,e,t){return Math.max(e,Math.min(t,i))}function su(i,e){return(i%e+e)%e}function xg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function _g(i,e,t){return i!==e?(t-i)/(e-i):0}function oa(i,e,t){return(1-t)*i+t*e}function vg(i,e,t,n){return oa(i,e,1-Math.exp(-t*n))}function yg(i,e=1){return e-Math.abs(su(i,e*2)-e)}function Mg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Sg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Eg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Tg(i,e){return i+Math.random()*(e-i)}function wg(i){return i*(.5-Math.random())}function Ag(i){i!==void 0&&(kd=i);let e=kd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Rg(i){return i*aa}function Cg(i){return i*Ss}function Pg(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Ig(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Lg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Dg(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),d=r((e-n)/2),h=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*d,c*h,o*l);break;case"YZY":i.set(c*h,o*u,c*d,o*l);break;case"ZXZ":i.set(c*d,c*h,o*u,o*l);break;case"XZX":i.set(o*u,c*m,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*m,o*l);break;case"ZYZ":i.set(c*m,c*f,o*u,o*l);break;default:qe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function kn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function gt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var as={DEG2RAD:aa,RAD2DEG:Ss,generateUUID:wn,clamp:st,euclideanModulo:su,mapLinear:xg,inverseLerp:_g,lerp:oa,damp:vg,pingpong:yg,smoothstep:Mg,smootherstep:Sg,randInt:Eg,randFloat:Tg,randFloatSpread:wg,seededRandom:Ag,degToRad:Rg,radToDeg:Cg,isPowerOfTwo:Pg,ceilPowerOfTwo:Ig,floorPowerOfTwo:Lg,setQuaternionFromProperEuler:Dg,normalize:gt,denormalize:kn},Ee=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Dt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],h=r[a+0],f=r[a+1],m=r[a+2],_=r[a+3];if(d!==_||c!==h||l!==f||u!==m){let g=c*h+l*f+u*m+d*_;g<0&&(h=-h,f=-f,m=-m,_=-_,g=-g);let p=1-o;if(g<.9995){let S=Math.acos(g),w=Math.sin(S);p=Math.sin(p*S)/w,o=Math.sin(o*S)/w,c=c*p+h*o,l=l*p+f*o,u=u*p+m*o,d=d*p+_*o}else{c=c*p+h*o,l=l*p+f*o,u=u*p+m*o,d=d*p+_*o;let S=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=S,l*=S,u*=S,d*=S}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[a],h=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+u*d+c*f-l*h,e[t+1]=c*m+u*h+l*d-o*f,e[t+2]=l*m+u*f+o*h-c*d,e[t+3]=u*m-o*d-c*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),d=o(r/2),h=c(n/2),f=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=h*u*d+l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d+h*f*m;break;case"YZX":this._x=h*u*d+l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d-h*f*m;break;case"XZY":this._x=h*u*d-l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d+h*f*m;break;default:qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-r*d,this.z=s+c*d+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yl.copy(this).projectOnVector(e),this.sub(Yl)}reflect(e){return this.sub(Yl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Yl=new k,Bd=new Dt,Qe=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],S=s[1],w=s[4],x=s[7],E=s[2],T=s[5],P=s[8];return r[0]=a*_+o*S+c*E,r[3]=a*g+o*w+c*T,r[6]=a*p+o*x+c*P,r[1]=l*_+u*S+d*E,r[4]=l*g+u*w+d*T,r[7]=l*p+u*x+d*P,r[2]=h*_+f*S+m*E,r[5]=h*g+f*w+m*T,r[8]=h*p+f*x+m*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,h=o*c-u*r,f=l*r-a*c,m=t*d+n*h+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=d*_,e[1]=(s*l-u*n)*_,e[2]=(o*n-s*a)*_,e[3]=h*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return vs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Jl.makeScale(e,t)),this}rotate(e){return vs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Jl.makeRotation(-e)),this}translate(e,t){return vs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Jl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Jl=new Qe,zd=new Qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gd=new Qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ng(){let i={enabled:!0,workingColorSpace:hn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===mt&&(s.r=vi(s.r),s.g=vi(s.g),s.b=vi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(s.r=cr(s.r),s.g=cr(s.g),s.b=cr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Li?ua:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return vs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return vs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[hn]:{primaries:e,whitePoint:n,transfer:ua,toXYZ:zd,fromXYZ:Gd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:e,whitePoint:n,transfer:mt,toXYZ:zd,fromXYZ:Gd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}}),i}var it=Ng();function vi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function cr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ws,nc=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ws===void 0&&(Ws=dr("canvas")),Ws.width=e.width,Ws.height=e.height;let s=Ws.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ws}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=dr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=vi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(vi(t[n]/255)*255):t[n]=vi(t[n]);return{data:t,width:e.width,height:e.height}}else return qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Fg=0,pr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Fg++}),this.uuid=wn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Zl(s[a].image)):r.push(Zl(s[a]))}else r=Zl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Zl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(qe("Texture: Unable to serialize Texture."),{})}var Ug=0,$l=new k,zt=class i extends zn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Tn,s=Tn,r=Ft,a=Hn,o=Mn,c=pn,l=i.DEFAULT_ANISOTROPY,u=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ug++}),this.uuid=wn(),this.name="",this.source=new pr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($l).x}get height(){return this.source.getSize($l).y}get depth(){return this.source.getSize($l).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){qe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Zn:e.x=e.x-Math.floor(e.x);break;case Tn:e.x=e.x<0?0:1;break;case hr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Zn:e.y=e.y-Math.floor(e.y);break;case Tn:e.y=e.y<0?0:1;break;case hr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=Kh;zt.DEFAULT_ANISOTROPY=1;var bt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(l+1)/2,x=(f+1)/2,E=(p+1)/2,T=(u+h)/4,P=(d+_)/4,v=(m+g)/4;return w>x&&w>E?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=T/n,r=P/n):x>E?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=T/s,r=v/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=P/r,s=v/r),this.set(n,s,r,t),this}let S=Math.sqrt((g-m)*(g-m)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(g-m)/S,this.y=(d-_)/S,this.z=(h-u)/S,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ic=class extends zn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new zt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ft,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new pr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},un=class extends ic{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},fa=class extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var sc=class extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var et=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,c,l,u,d,h,f,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,d,h,f,m,_,g)}set(e,t,n,s,r,a,o,c,l,u,d,h,f,m,_,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/qs.setFromMatrixColumn(e,0).length(),r=1/qs.setFromMatrixColumn(e,1).length(),a=1/qs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=a*u,f=a*d,m=o*u,_=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=f+m*l,t[5]=h-_*l,t[9]=-o*c,t[2]=_-h*l,t[6]=m+f*l,t[10]=a*c}else if(e.order==="YXZ"){let h=c*u,f=c*d,m=l*u,_=l*d;t[0]=h+_*o,t[4]=m*o-f,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=_+h*o,t[10]=a*c}else if(e.order==="ZXY"){let h=c*u,f=c*d,m=l*u,_=l*d;t[0]=h-_*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=_-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let h=a*u,f=a*d,m=o*u,_=o*d;t[0]=c*u,t[4]=m*l-f,t[8]=h*l+_,t[1]=c*d,t[5]=_*l+h,t[9]=f*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let h=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*u,t[4]=_-h*d,t[8]=m*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*d+m,t[10]=h-_*d}else if(e.order==="XZY"){let h=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+_,t[5]=a*u,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Og,e,kg)}lookAt(e,t,n){let s=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),Vi.crossVectors(n,gn),Vi.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),Vi.crossVectors(n,gn)),Vi.normalize(),go.crossVectors(gn,Vi),s[0]=Vi.x,s[4]=go.x,s[8]=gn.x,s[1]=Vi.y,s[5]=go.y,s[9]=gn.y,s[2]=Vi.z,s[6]=go.z,s[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],S=n[3],w=n[7],x=n[11],E=n[15],T=s[0],P=s[4],v=s[8],L=s[12],F=s[1],C=s[5],I=s[9],W=s[13],z=s[2],G=s[6],oe=s[10],ce=s[14],xe=s[3],j=s[7],he=s[11],fe=s[15];return r[0]=a*T+o*F+c*z+l*xe,r[4]=a*P+o*C+c*G+l*j,r[8]=a*v+o*I+c*oe+l*he,r[12]=a*L+o*W+c*ce+l*fe,r[1]=u*T+d*F+h*z+f*xe,r[5]=u*P+d*C+h*G+f*j,r[9]=u*v+d*I+h*oe+f*he,r[13]=u*L+d*W+h*ce+f*fe,r[2]=m*T+_*F+g*z+p*xe,r[6]=m*P+_*C+g*G+p*j,r[10]=m*v+_*I+g*oe+p*he,r[14]=m*L+_*W+g*ce+p*fe,r[3]=S*T+w*F+x*z+E*xe,r[7]=S*P+w*C+x*G+E*j,r[11]=S*v+w*I+x*oe+E*he,r[15]=S*L+w*W+x*ce+E*fe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],f=e[14],m=e[3],_=e[7],g=e[11],p=e[15],S=c*f-l*h,w=o*f-l*d,x=o*h-c*d,E=a*f-l*u,T=a*h-c*u,P=a*d-o*u;return t*(_*S-g*w+p*x)-n*(m*S-g*E+p*T)+s*(m*w-_*E+p*P)-r*(m*x-_*T+g*P)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],f=e[11],m=e[12],_=e[13],g=e[14],p=e[15],S=t*o-n*a,w=t*c-s*a,x=t*l-r*a,E=n*c-s*o,T=n*l-r*o,P=s*l-r*c,v=u*_-d*m,L=u*g-h*m,F=u*p-f*m,C=d*g-h*_,I=d*p-f*_,W=h*p-f*g,z=S*W-w*I+x*C+E*F-T*L+P*v;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/z;return e[0]=(o*W-c*I+l*C)*G,e[1]=(s*I-n*W-r*C)*G,e[2]=(_*P-g*T+p*E)*G,e[3]=(h*T-d*P-f*E)*G,e[4]=(c*F-a*W-l*L)*G,e[5]=(t*W-s*F+r*L)*G,e[6]=(g*x-m*P-p*w)*G,e[7]=(u*P-h*x+f*w)*G,e[8]=(a*I-o*F+l*v)*G,e[9]=(n*F-t*I-r*v)*G,e[10]=(m*T-_*x+p*S)*G,e[11]=(d*x-u*T-f*S)*G,e[12]=(o*L-a*C-c*v)*G,e[13]=(t*C-n*L+s*v)*G,e[14]=(_*w-m*E-g*S)*G,e[15]=(u*E-d*w+h*S)*G,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,d=o+o,h=r*l,f=r*u,m=r*d,_=a*u,g=a*d,p=o*d,S=c*l,w=c*u,x=c*d,E=n.x,T=n.y,P=n.z;return s[0]=(1-(_+p))*E,s[1]=(f+x)*E,s[2]=(m-w)*E,s[3]=0,s[4]=(f-x)*T,s[5]=(1-(h+p))*T,s[6]=(g+S)*T,s[7]=0,s[8]=(m+w)*P,s[9]=(g-S)*P,s[10]=(1-(h+_))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=qs.set(s[0],s[1],s[2]).length(),o=qs.set(s[4],s[5],s[6]).length(),c=qs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Nn.copy(this);let l=1/a,u=1/o,d=1/c;return Nn.elements[0]*=l,Nn.elements[1]*=l,Nn.elements[2]*=l,Nn.elements[4]*=u,Nn.elements[5]*=u,Nn.elements[6]*=u,Nn.elements[8]*=d,Nn.elements[9]*=d,Nn.elements[10]*=d,t.setFromRotationMatrix(Nn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=Bn,c=!1){let l=this.elements,u=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s),m,_;if(c)m=r/(a-r),_=a*r/(a-r);else if(o===Bn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===ur)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Bn,c=!1){let l=this.elements,u=2/(t-e),d=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s),m,_;if(c)m=1/(a-r),_=a/(a-r);else if(o===Bn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===ur)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},qs=new k,Nn=new et,Og=new k(0,0,0),kg=new k(1,1,1),Vi=new k,go=new k,gn=new k,Hd=new et,Vd=new Dt,Qn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-st(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(st(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Hd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vd.setFromEuler(this),this.setFromQuaternion(Vd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qn.DEFAULT_ORDER="XYZ";var pa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Bg=0,Wd=new k,Xs=new Dt,fi=new et,bo=new k,Kr=new k,zg=new k,Gg=new Dt,qd=new k(1,0,0),Xd=new k(0,1,0),jd=new k(0,0,1),Kd={type:"added"},Hg={type:"removed"},js={type:"childadded",child:null},Ql={type:"childremoved",child:null},Tt=class i extends zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bg++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new k,t=new Qn,n=new Dt,s=new k(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new et},normalMatrix:{value:new Qe}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.multiply(Xs),this}rotateOnWorldAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.premultiply(Xs),this}rotateX(e){return this.rotateOnAxis(qd,e)}rotateY(e){return this.rotateOnAxis(Xd,e)}rotateZ(e){return this.rotateOnAxis(jd,e)}translateOnAxis(e,t){return Wd.copy(e).applyQuaternion(this.quaternion),this.position.add(Wd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qd,e)}translateY(e){return this.translateOnAxis(Xd,e)}translateZ(e){return this.translateOnAxis(jd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bo.copy(e):bo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(Kr,bo,this.up):fi.lookAt(bo,Kr,this.up),this.quaternion.setFromRotationMatrix(fi),s&&(fi.extractRotation(s.matrixWorld),Xs.setFromRotationMatrix(fi),this.quaternion.premultiply(Xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Kd),js.child=e,this.dispatchEvent(js),js.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hg),Ql.child=e,this.dispatchEvent(Ql),Ql.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Kd),js.child=e,this.dispatchEvent(js),js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,e,zg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,Gg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Tt.DEFAULT_UP=new k(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var dt=class extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Vg={type:"move"},mr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;l.inputState.pinching&&h>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vg)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new dt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},pp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},xo={h:0,s:0,l:0};function eh(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Xe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=su(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=eh(a,r,e+1/3),this.g=eh(a,r,e),this.b=eh(a,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=Et){function n(r){r!==void 0&&parseFloat(r)<1&&qe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:qe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){let n=pp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vi(e.r),this.g=vi(e.g),this.b=vi(e.b),this}copyLinearToSRGB(e){return this.r=cr(e.r),this.g=cr(e.g),this.b=cr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return it.workingToColorSpace(Qt.copy(this),e),Math.round(st(Qt.r*255,0,255))*65536+Math.round(st(Qt.g*255,0,255))*256+Math.round(st(Qt.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(Qt.copy(this),t);let n=Qt.r,s=Qt.g,r=Qt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=Et){it.workingToColorSpace(Qt.copy(this),e);let t=Qt.r,n=Qt.g,s=Qt.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+t,Wi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wi),e.getHSL(xo);let n=oa(Wi.h,xo.h,t),s=oa(Wi.s,xo.s,t),r=oa(Wi.l,xo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qt=new Xe;Xe.NAMES=pp;var ma=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xe(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Es=class extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Fn=new k,pi=new k,th=new k,mi=new k,Ks=new k,Ys=new k,Yd=new k,nh=new k,ih=new k,sh=new k,rh=new bt,ah=new bt,oh=new bt,_i=class i{constructor(e=new k,t=new k,n=new k){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Fn.subVectors(e,t),s.cross(Fn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Fn.subVectors(s,t),pi.subVectors(n,t),th.subVectors(e,t);let a=Fn.dot(Fn),o=Fn.dot(pi),c=Fn.dot(th),l=pi.dot(pi),u=pi.dot(th),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(l*c-o*u)*h,m=(a*u-o*c)*h;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,mi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,mi.x),c.addScaledVector(a,mi.y),c.addScaledVector(o,mi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return rh.setScalar(0),ah.setScalar(0),oh.setScalar(0),rh.fromBufferAttribute(e,t),ah.fromBufferAttribute(e,n),oh.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(rh,r.x),a.addScaledVector(ah,r.y),a.addScaledVector(oh,r.z),a}static isFrontFacing(e,t,n,s){return Fn.subVectors(n,t),pi.subVectors(e,t),Fn.cross(pi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),Fn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ks.subVectors(s,n),Ys.subVectors(r,n),nh.subVectors(e,n);let c=Ks.dot(nh),l=Ys.dot(nh);if(c<=0&&l<=0)return t.copy(n);ih.subVectors(e,s);let u=Ks.dot(ih),d=Ys.dot(ih);if(u>=0&&d<=u)return t.copy(s);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Ks,a);sh.subVectors(e,r);let f=Ks.dot(sh),m=Ys.dot(sh);if(m>=0&&f<=m)return t.copy(r);let _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Ys,o);let g=u*m-f*d;if(g<=0&&d-u>=0&&f-m>=0)return Yd.subVectors(r,s),o=(d-u)/(d-u+(f-m)),t.copy(s).addScaledVector(Yd,o);let p=1/(g+_+h);return a=_*p,o=h*p,t.copy(n).addScaledVector(Ks,a).addScaledVector(Ys,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},xn=class{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Un):Un.fromBufferAttribute(r,a),Un.applyMatrix4(e.matrixWorld),this.expandByPoint(Un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_o.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_o.copy(n.boundingBox)),_o.applyMatrix4(e.matrixWorld),this.union(_o)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Un),Un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yr),vo.subVectors(this.max,Yr),Js.subVectors(e.a,Yr),Zs.subVectors(e.b,Yr),$s.subVectors(e.c,Yr),qi.subVectors(Zs,Js),Xi.subVectors($s,Zs),ps.subVectors(Js,$s);let t=[0,-qi.z,qi.y,0,-Xi.z,Xi.y,0,-ps.z,ps.y,qi.z,0,-qi.x,Xi.z,0,-Xi.x,ps.z,0,-ps.x,-qi.y,qi.x,0,-Xi.y,Xi.x,0,-ps.y,ps.x,0];return!ch(t,Js,Zs,$s,vo)||(t=[1,0,0,0,1,0,0,0,1],!ch(t,Js,Zs,$s,vo))?!1:(yo.crossVectors(qi,Xi),t=[yo.x,yo.y,yo.z],ch(t,Js,Zs,$s,vo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},gi=[new k,new k,new k,new k,new k,new k,new k,new k],Un=new k,_o=new xn,Js=new k,Zs=new k,$s=new k,qi=new k,Xi=new k,ps=new k,Yr=new k,vo=new k,yo=new k,ms=new k;function ch(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ms.fromArray(i,r);let o=s.x*Math.abs(ms.x)+s.y*Math.abs(ms.y)+s.z*Math.abs(ms.z),c=e.dot(ms),l=t.dot(ms),u=n.dot(ms);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var kt=new k,Mo=new Ee,Wg=0,Rt=class extends zn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=nu,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Mo.fromBufferAttribute(this,t),Mo.applyMatrix3(e),this.setXY(t,Mo.x,Mo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array),r=gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var ga=class extends Rt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ba=class extends Rt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ht=class extends Rt{constructor(e,t,n){super(new Float32Array(e),t,n)}},qg=new xn,Jr=new k,lh=new k,en=class{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):qg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Jr.subVectors(e,this.center);let t=Jr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Jr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Jr.copy(e.center).add(lh)),this.expandByPoint(Jr.copy(e.center).sub(lh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Xg=0,En=new et,hh=new Tt,Qs=new k,bn=new xn,Zr=new xn,qt=new k,xt=class i extends zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xg++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gg(e)?ba:ga)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,t,n){return En.makeTranslation(e,t,n),this.applyMatrix4(En),this}scale(e,t,n){return En.makeScale(e,t,n),this.applyMatrix4(En),this}lookAt(e){return hh.lookAt(e),hh.updateMatrix(),this.applyMatrix4(hh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qs).negate(),this.translate(Qs.x,Qs.y,Qs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ht(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new en);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){let n=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Zr.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(bn.min,Zr.min),bn.expandByPoint(qt),qt.addVectors(bn.max,Zr.max),bn.expandByPoint(qt)):(bn.expandByPoint(Zr.min),bn.expandByPoint(Zr.max))}bn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)qt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(qt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)qt.fromBufferAttribute(o,l),c&&(Qs.fromBufferAttribute(e,l),qt.add(Qs)),s=Math.max(s,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Rt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let v=0;v<n.count;v++)o[v]=new k,c[v]=new k;let l=new k,u=new k,d=new k,h=new Ee,f=new Ee,m=new Ee,_=new k,g=new k;function p(v,L,F){l.fromBufferAttribute(n,v),u.fromBufferAttribute(n,L),d.fromBufferAttribute(n,F),h.fromBufferAttribute(r,v),f.fromBufferAttribute(r,L),m.fromBufferAttribute(r,F),u.sub(l),d.sub(l),f.sub(h),m.sub(h);let C=1/(f.x*m.y-m.x*f.y);isFinite(C)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(C),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(C),o[v].add(_),o[L].add(_),o[F].add(_),c[v].add(g),c[L].add(g),c[F].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,L=S.length;v<L;++v){let F=S[v],C=F.start,I=F.count;for(let W=C,z=C+I;W<z;W+=3)p(e.getX(W+0),e.getX(W+1),e.getX(W+2))}let w=new k,x=new k,E=new k,T=new k;function P(v){E.fromBufferAttribute(s,v),T.copy(E);let L=o[v];w.copy(L),w.sub(E.multiplyScalar(E.dot(L))).normalize(),x.crossVectors(T,L);let C=x.dot(c[v])<0?-1:1;a.setXYZW(v,w.x,w.y,w.z,C)}for(let v=0,L=S.length;v<L;++v){let F=S[v],C=F.start,I=F.count;for(let W=C,z=C+I;W<z;W+=3)P(e.getX(W+0)),P(e.getX(W+1)),P(e.getX(W+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Rt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let s=new k,r=new k,a=new k,o=new k,c=new k,l=new k,u=new k,d=new k;if(e)for(let h=0,f=e.count;h<f;h+=3){let m=e.getX(h+0),_=e.getX(h+1),g=e.getX(h+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u),f=0,m=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*u;for(let p=0;p<u;p++)h[m++]=l[f++]}return new Rt(h,u,d)}if(this.index===null)return qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,d=l.length;u<d;u++){let h=l[u],f=e(h,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let f=l[d];u.push(f.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],d=r[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ts=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=nu,this.updateRanges=[],this.version=0,this.uuid=wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},ln=new k,Yi=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix4(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.applyNormalMatrix(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.transformDirection(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=kn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=kn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=kn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=kn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array),r=gt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){da("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Rt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){da("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},uh=new k,jg=new k,Kg=new Qe,On=class{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=uh.subVectors(n,t).cross(jg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(uh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Kg.getNormalMatrix(e),s=this.coplanarPoint(uh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Yg=0,tn=class extends zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=wn(),this.name="",this.type="Material",this.blending=Rr,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zh,this.blendDst=Gh,this.blendEquation=Ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ip,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=jo,this.stencilZFail=jo,this.stencilZPass=jo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){qe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new On().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ee().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ee().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},gr=class extends tn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},er,$r=new k,tr=new k,nr=new k,ir=new Ee,Qr=new Ee,mp=new et,So=new k,ea=new k,Eo=new k,Jd=new Ee,dh=new Ee,Zd=new Ee,xa=class extends Tt{constructor(e=new gr){if(super(),this.isSprite=!0,this.type="Sprite",er===void 0){er=new xt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ts(t,5);er.setIndex([0,1,2,0,2,3]),er.setAttribute("position",new Yi(n,3,0,!1)),er.setAttribute("uv",new Yi(n,2,3,!1))}this.geometry=er,this.material=e,this.center=new Ee(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Ye('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),tr.setFromMatrixScale(this.matrixWorld),mp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),nr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&tr.multiplyScalar(-nr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;To(So.set(-.5,-.5,0),nr,a,tr,s,r),To(ea.set(.5,-.5,0),nr,a,tr,s,r),To(Eo.set(.5,.5,0),nr,a,tr,s,r),Jd.set(0,0),dh.set(1,0),Zd.set(1,1);let o=e.ray.intersectTriangle(So,ea,Eo,!1,$r);if(o===null&&(To(ea.set(-.5,.5,0),nr,a,tr,s,r),dh.set(0,1),o=e.ray.intersectTriangle(So,Eo,ea,!1,$r),o===null))return;let c=e.ray.origin.distanceTo($r);c<e.near||c>e.far||t.push({distance:c,point:$r.clone(),uv:_i.getInterpolation($r,So,ea,Eo,Jd,dh,Zd,new Ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function To(i,e,t,n,s,r){ir.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Qr.x=r*ir.x-s*ir.y,Qr.y=s*ir.x+r*ir.y):Qr.copy(ir),i.copy(e),i.x+=Qr.x,i.y+=Qr.y,i.applyMatrix4(mp)}var bi=new k,fh=new k,wo=new k,Ao=new k,ws=class{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bi.copy(this.origin).addScaledVector(this.direction,t),bi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){fh.copy(e).add(t).multiplyScalar(.5),wo.copy(t).sub(e).normalize(),Ao.copy(this.origin).sub(fh);let r=e.distanceTo(t)*.5,a=-this.direction.dot(wo),o=Ao.dot(this.direction),c=-Ao.dot(wo),l=Ao.lengthSq(),u=Math.abs(1-a*a),d,h,f,m;if(u>0)if(d=a*c-o,h=a*o-c,m=r*u,d>=0)if(h>=-m)if(h<=m){let _=1/u;d*=_,h*=_,f=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;else h<=-m?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l):h<=m?(d=0,h=Math.min(Math.max(-r,-c),r),f=h*(h+2*c)+l):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(fh).addScaledVector(wo,h),f}intersectSphere(e,t){if(e.radius<0)return null;bi.subVectors(e.center,this.origin);let n=bi.dot(this.direction),s=bi.dot(bi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,bi)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,f=e.z-a.z,m=t.x-a.x,_=t.y-a.y,g=t.z-a.z,p=n.x-a.x,S=n.y-a.y,w=n.z-a.z,x=Math.abs(c),E=Math.abs(l),T=Math.abs(u),P,v,L,F,C,I,W,z,G,oe,ce,xe;if(x>=E&&x>=T?(L=c,I=d,G=m,xe=p,c>=0?(P=l,v=u,F=h,C=f,W=_,z=g,oe=S,ce=w):(P=u,v=l,F=f,C=h,W=g,z=_,oe=w,ce=S)):E>=T?(L=l,I=h,G=_,xe=S,l>=0?(P=u,v=c,F=f,C=d,W=g,z=m,oe=w,ce=p):(P=c,v=u,F=d,C=f,W=m,z=g,oe=p,ce=w)):(L=u,I=f,G=g,xe=w,u>=0?(P=c,v=l,F=d,C=h,W=m,z=_,oe=p,ce=S):(P=l,v=c,F=h,C=d,W=_,z=m,oe=S,ce=p)),L===0)return null;let j=P/L,he=v/L,fe=1/L,Ie=F-j*I,De=C-he*I,rt=W-j*G,Ze=z-he*G,Je=oe-j*xe,le=ce-he*xe,me=Je*Ze-le*rt,we=Ie*le-De*Je,Ve=rt*De-Ze*Ie;if(s){if(me<0||we<0||Ve<0)return null}else if((me<0||we<0||Ve<0)&&(me>0||we>0||Ve>0))return null;let Re=me+we+Ve;if(Re===0)return null;let je=fe*(me*I+we*G+Ve*xe);return(Re>0?je<0:je>0)?null:this.at(je/Re,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},It=class extends tn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=wc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},$d=new et,gs=new ws,Ro=new en,Qd=new k,Co=new k,Po=new k,Io=new k,ph=new k,Lo=new k,ef=new k,Do=new k,ct=class extends Tt{constructor(e=new xt,t=new It){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Lo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],d=r[c];u!==0&&(ph.fromBufferAttribute(d,e),a?Lo.addScaledVector(ph,u):Lo.addScaledVector(ph.sub(t),u))}t.add(Lo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ro.copy(n.boundingSphere),Ro.applyMatrix4(r),gs.copy(e.ray).recast(e.near),!(Ro.containsPoint(gs.origin)===!1&&(gs.intersectSphere(Ro,Qd)===null||gs.origin.distanceToSquared(Qd)>(e.far-e.near)**2))&&($d.copy(r).invert(),gs.copy(e.ray).applyMatrix4($d),!(n.boundingBox!==null&&gs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gs)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=h.length;m<_;m++){let g=h[m],p=a[g.materialIndex],S=Math.max(g.start,f.start),w=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=S,E=w;x<E;x+=3){let T=o.getX(x),P=o.getX(x+1),v=o.getX(x+2);s=No(this,p,e,n,l,u,d,T,P,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let S=o.getX(g),w=o.getX(g+1),x=o.getX(g+2);s=No(this,a,e,n,l,u,d,S,w,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,_=h.length;m<_;m++){let g=h[m],p=a[g.materialIndex],S=Math.max(g.start,f.start),w=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let x=S,E=w;x<E;x+=3){let T=x,P=x+1,v=x+2;s=No(this,p,e,n,l,u,d,T,P,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let S=g,w=g+1,x=g+2;s=No(this,a,e,n,l,u,d,S,w,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Jg(i,e,t,n,s,r,a,o){let c;if(e.side===Gt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===ni,o),c===null)return null;Do.copy(o),Do.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Do);return l<t.near||l>t.far?null:{distance:l,point:Do.clone(),object:i}}function No(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Co),i.getVertexPosition(c,Po),i.getVertexPosition(l,Io);let u=Jg(i,e,t,n,Co,Po,Io,ef);if(u){let d=new k;_i.getBarycoord(ef,Co,Po,Io,d),s&&(u.uv=_i.getInterpolatedAttribute(s,o,c,l,d,new Ee)),r&&(u.uv1=_i.getInterpolatedAttribute(r,o,c,l,d,new Ee)),a&&(u.normal=_i.getInterpolatedAttribute(a,o,c,l,d,new k),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:c,c:l,normal:new k,materialIndex:0};_i.getNormal(Co,Po,Io,h.normal),u.face=h,u.barycoord=d}return u}var ta=new bt,tf=new bt,nf=new bt,Zg=new bt,sf=new et,Fo=new k,mh=new en,rf=new et,gh=new ws,_a=class extends ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Sh,this.bindMatrix=new et,this.bindMatrixInverse=new et,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new xn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fo),this.boundingBox.expandByPoint(Fo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new en),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fo),this.boundingSphere.expandByPoint(Fo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mh.copy(this.boundingSphere),mh.applyMatrix4(s),e.ray.intersectsSphere(mh)!==!1&&(rf.copy(s).invert(),gh.copy(e.ray).applyMatrix4(rf),!(this.boundingBox!==null&&gh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,gh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new bt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Sh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===$f?this.bindMatrixInverse.copy(this.bindMatrix).invert():qe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;tf.fromBufferAttribute(s.attributes.skinIndex,e),nf.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(ta.copy(t),t.set(0,0,0,0)):(ta.set(...t,1),t.set(0,0,0)),ta.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=nf.getComponent(r);if(a!==0){let o=tf.getComponent(r);sf.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Zg.copy(ta).applyMatrix4(sf),a)}}return t.isVector4&&(t.w=ta.w),t.applyMatrix4(this.bindMatrixInverse)}},br=class extends Tt{constructor(){super(),this.isBone=!0,this.type="Bone"}},xr=class extends zt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Nt,u=Nt,d,h){super(null,a,o,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},af=new et,$g=new et,va=class i{constructor(e=[],t=[]){this.uuid=wn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){qe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new et)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new et;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:$g;af.multiplyMatrices(o,t[r]),af.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new xr(t,e,e,Mn,yn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(qe("Skeleton: No bone found with UUID:",r),a=new br),this.bones.push(a),this.boneInverses.push(new et().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},yi=class extends Rt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},sr=new et,of=new et,Uo=[],cf=new xn,Qg=new et,na=new ct,ia=new en,As=class extends ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new yi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Qg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new xn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,sr),cf.copy(e.boundingBox).applyMatrix4(sr),this.boundingBox.union(cf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new en),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,sr),ia.copy(e.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(ia)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(na.geometry=this.geometry,na.material=this.material,na.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ia.copy(this.boundingSphere),ia.applyMatrix4(n),e.ray.intersectsSphere(ia)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,sr),of.multiplyMatrices(n,sr),na.matrixWorld=of,na.raycast(e,Uo);for(let a=0,o=Uo.length;a<o;a++){let c=Uo[a];c.instanceId=r,c.object=this,t.push(c)}Uo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new yi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new xr(new Float32Array(s*this.count),s,this.count,Dc,yn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},bs=new en,e0=new Ee(.5,.5),Oo=new k,_r=class{constructor(e=new On,t=new On,n=new On,s=new On,r=new On,a=new On){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Bn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],d=r[5],h=r[6],f=r[7],m=r[8],_=r[9],g=r[10],p=r[11],S=r[12],w=r[13],x=r[14],E=r[15];if(s[0].setComponents(l-a,f-u,p-m,E-S).normalize(),s[1].setComponents(l+a,f+u,p+m,E+S).normalize(),s[2].setComponents(l+o,f+d,p+_,E+w).normalize(),s[3].setComponents(l-o,f-d,p-_,E-w).normalize(),n)s[4].setComponents(c,h,g,x).normalize(),s[5].setComponents(l-c,f-h,p-g,E-x).normalize();else if(s[4].setComponents(l-c,f-h,p-g,E-x).normalize(),t===Bn)s[5].setComponents(l+c,f+h,p+g,E+x).normalize();else if(t===ur)s[5].setComponents(c,h,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bs)}intersectsSprite(e){bs.center.set(0,0,0);let t=e0.distanceTo(e.center);return bs.radius=.7071067811865476+t,bs.applyMatrix4(e.matrixWorld),this.intersectsSphere(bs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Oo.x=s.normal.x>0?e.max.x:e.min.x,Oo.y=s.normal.y>0?e.max.y:e.min.y,Oo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Oo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var vr=class extends tn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},rc=new k,ac=new k,lf=new et,sa=new ws,ko=new en,bh=new k,hf=new k,Rs=class extends Tt{constructor(e=new xt,t=new vr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)rc.fromBufferAttribute(t,s-1),ac.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=rc.distanceTo(ac);e.setAttribute("lineDistance",new ht(n,1))}else qe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ko.copy(n.boundingSphere),ko.applyMatrix4(s),ko.radius+=r,e.ray.intersectsSphere(ko)===!1)return;lf.copy(s).invert(),sa.copy(e.ray).applyMatrix4(lf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){let p=u.getX(_),S=u.getX(_+1),w=Bo(this,e,sa,c,p,S,_);w&&t.push(w)}if(this.isLineLoop){let _=u.getX(m-1),g=u.getX(f),p=Bo(this,e,sa,c,_,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){let p=Bo(this,e,sa,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){let _=Bo(this,e,sa,c,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Bo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(rc.fromBufferAttribute(o,s),ac.fromBufferAttribute(o,r),t.distanceSqToSegment(rc,ac,bh,hf)>n)return;bh.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(bh);if(!(l<e.near||l>e.far))return{distance:l,point:hf.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var uf=new k,df=new k,ya=class extends Rs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)uf.fromBufferAttribute(t,s),df.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+uf.distanceTo(df);e.setAttribute("lineDistance",new ht(n,1))}else qe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ma=class extends Rs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Ji=class extends tn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ff=new et,Th=new ws,zo=new en,Go=new k,Mi=class extends Tt{constructor(e=new xt,t=new Ji){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(s),zo.radius+=r,e.ray.intersectsSphere(zo)===!1)return;ff.copy(s).invert(),Th.copy(e.ray).applyMatrix4(ff);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){let h=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let m=h,_=f;m<_;m++){let g=l.getX(m);Go.fromBufferAttribute(d,g),pf(Go,g,c,s,e,t,this)}}else{let h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=h,_=f;m<_;m++)Go.fromBufferAttribute(d,m),pf(Go,m,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function pf(i,e,t,n,s,r,a){let o=Th.distanceSqToPoint(i);if(o<t){let c=new k;Th.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Sa=class extends zt{constructor(e=[],t=is,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},An=class extends zt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Zi=class extends zt{constructor(e,t,n=Vn,s,r,a,o=Nt,c=Nt,l,u=$n,d=1){if(u!==$n&&u!==ss)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},oc=class extends Zi{constructor(e,t=Vn,n=is,s,r,a=Nt,o=Nt,c,l=$n){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ea=class extends zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},nn=class i extends xt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],d=[],h=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ht(l,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(d,2));function m(_,g,p,S,w,x,E,T,P,v,L){let F=x/P,C=E/v,I=x/2,W=E/2,z=T/2,G=P+1,oe=v+1,ce=0,xe=0,j=new k;for(let he=0;he<oe;he++){let fe=he*C-W;for(let Ie=0;Ie<G;Ie++){let De=Ie*F-I;j[_]=De*S,j[g]=fe*w,j[p]=z,l.push(j.x,j.y,j.z),j[_]=0,j[g]=0,j[p]=T>0?1:-1,u.push(j.x,j.y,j.z),d.push(Ie/P),d.push(1-he/v),ce+=1}}for(let he=0;he<v;he++)for(let fe=0;fe<P;fe++){let Ie=h+fe+G*he,De=h+fe+G*(he+1),rt=h+(fe+1)+G*(he+1),Ze=h+(fe+1)+G*he;c.push(Ie,De,Ze),c.push(De,rt,Ze),xe+=6}o.addGroup(f,xe,L),f+=xe,h+=ce}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var $i=class i extends xt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],m=0,_=[],g=n/2,p=0;S(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new ht(d,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(f,2));function S(){let x=new k,E=new k,T=0,P=(t-e)/n;for(let v=0;v<=r;v++){let L=[],F=v/r,C=F*(t-e)+e;for(let I=0;I<=s;I++){let W=I/s,z=W*c+o,G=Math.sin(z),oe=Math.cos(z);E.x=C*G,E.y=-F*n+g,E.z=C*oe,d.push(E.x,E.y,E.z),x.set(G,P,oe).normalize(),h.push(x.x,x.y,x.z),f.push(W,1-F),L.push(m++)}_.push(L)}for(let v=0;v<s;v++)for(let L=0;L<r;L++){let F=_[L][v],C=_[L+1][v],I=_[L+1][v+1],W=_[L][v+1];(e>0||L!==0)&&(u.push(F,C,W),T+=3),(t>0||L!==r-1)&&(u.push(C,I,W),T+=3)}l.addGroup(p,T,0),p+=T}function w(x){let E=m,T=new Ee,P=new k,v=0,L=x===!0?e:t,F=x===!0?1:-1;for(let I=1;I<=s;I++)d.push(0,g*F,0),h.push(0,F,0),f.push(.5,.5),m++;let C=m;for(let I=0;I<=s;I++){let z=I/s*c+o,G=Math.cos(z),oe=Math.sin(z);P.x=L*oe,P.y=g*F,P.z=L*G,d.push(P.x,P.y,P.z),h.push(0,F,0),T.x=G*.5+.5,T.y=oe*.5*F+.5,f.push(T.x,T.y),m++}for(let I=0;I<s;I++){let W=E+I,z=C+I;x===!0?u.push(z,z+1,W):u.push(z+1,z,W),v+=3}l.addGroup(p,v,x===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var _n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){qe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let u=n[s],h=n[s+1]-u,f=(a-u)/h;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new Ee:new k);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new k,s=[],r=[],a=[],o=new k,c=new et;for(let f=0;f<=e;f++){let m=f/e;s[f]=this.getTangentAt(m,new k)}r[0]=new k,a[0]=new k;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),h<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(st(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(st(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},yr=class extends _n{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new Ee){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=c-this.aX,f=l-this.aY;c=h*u-f*d+this.aX,l=h*d+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},cc=class extends yr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function ru(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,d){let h=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+d)+(c-o)/d;h*=u,f*=u,s(a,o,h,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var mf=new k,gf=new k,xh=new ru,_h=new ru,vh=new ru,Mr=class extends _n{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new k){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(gf.subVectors(s[0],s[1]).add(s[0]),l=gf);let d=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(mf.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=mf),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),xh.initNonuniformCatmullRom(l.x,d.x,h.x,u.x,m,_,g),_h.initNonuniformCatmullRom(l.y,d.y,h.y,u.y,m,_,g),vh.initNonuniformCatmullRom(l.z,d.z,h.z,u.z,m,_,g)}else this.curveType==="catmullrom"&&(xh.initCatmullRom(l.x,d.x,h.x,u.x,this.tension),_h.initCatmullRom(l.y,d.y,h.y,u.y,this.tension),vh.initCatmullRom(l.z,d.z,h.z,u.z,this.tension));return n.set(xh.calc(c),_h.calc(c),vh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new k().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function bf(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function t0(i,e){let t=1-i;return t*t*e}function n0(i,e){return 2*(1-i)*i*e}function i0(i,e){return i*i*e}function ca(i,e,t,n){return t0(i,e)+n0(i,t)+i0(i,n)}function s0(i,e){let t=1-i;return t*t*t*e}function r0(i,e){let t=1-i;return 3*t*t*i*e}function a0(i,e){return 3*(1-i)*i*i*e}function o0(i,e){return i*i*i*e}function la(i,e,t,n,s){return s0(i,e)+r0(i,t)+a0(i,n)+o0(i,s)}var Ta=class extends _n{constructor(e=new Ee,t=new Ee,n=new Ee,s=new Ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Ee){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(la(e,s.x,r.x,a.x,o.x),la(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},lc=class extends _n{constructor(e=new k,t=new k,n=new k,s=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new k){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(la(e,s.x,r.x,a.x,o.x),la(e,s.y,r.y,a.y,o.y),la(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},wa=class extends _n{constructor(e=new Ee,t=new Ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ee){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},hc=class extends _n{constructor(e=new k,t=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new k){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new k){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Aa=class extends _n{constructor(e=new Ee,t=new Ee,n=new Ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Ee){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ca(e,s.x,r.x,a.x),ca(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ra=class extends _n{constructor(e=new k,t=new k,n=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new k){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ca(e,s.x,r.x,a.x),ca(e,s.y,r.y,a.y),ca(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ca=class extends _n{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ee){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(bf(o,c.x,l.x,u.x,d.x),bf(o,c.y,l.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new Ee().fromArray(s))}return this}},uc=Object.freeze({__proto__:null,ArcCurve:cc,CatmullRomCurve3:Mr,CubicBezierCurve:Ta,CubicBezierCurve3:lc,EllipseCurve:yr,LineCurve:wa,LineCurve3:hc,QuadraticBezierCurve:Aa,QuadraticBezierCurve3:Ra,SplineCurve:Ca}),dc=class extends _n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new uc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new uc[s.type]().fromJSON(s))}return this}},Pa=class extends dc{constructor(e){super(),this.type="Path",this.currentPoint=new Ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new wa(this.currentPoint.clone(),new Ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Aa(this.currentPoint.clone(),new Ee(e,t),new Ee(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new Ta(this.currentPoint.clone(),new Ee(e,t),new Ee(n,s),new Ee(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ca(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){let l=new yr(e,t,n,s,r,a,o,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Si=class extends Pa{constructor(e){super(e),this.uuid=wn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Pa().fromJSON(s))}return this}};function c0(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=gp(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=f0(i,e,r,t)),i.length>80*t){o=i[0],c=i[1];let u=o,d=c;for(let h=t;h<s;h+=t){let f=i[h],m=i[h+1];f<o&&(o=f),m<c&&(c=m),f>u&&(u=f),m>d&&(d=m)}l=Math.max(u-o,d-c),l=l!==0?32767/l:0}return Ia(r,a,t,o,c,l,0),a}function gp(i,e,t,n,s){let r;if(s===E0(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=xf(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=xf(a/n|0,i[a],i[a+1],r);return r&&Sr(r,r.next)&&(Da(r),r=r.next),r}function Cs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Sr(t,t.next)||Pt(t.prev,t,t.next)===0)){if(Da(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ia(i,e,t,n,s,r,a){if(!i)return;!a&&r&&x0(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?h0(i,n,s,r):l0(i)){e.push(c.i,i.i,l.i),Da(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=u0(Cs(i),e),Ia(i,e,t,n,s,r,2)):a===2&&d0(i,e,t,n,s,r):Ia(Cs(i),e,t,n,s,r,1);break}}}function l0(i){let e=i.prev,t=i,n=i.next;if(Pt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(s,r,a),d=Math.min(o,c,l),h=Math.max(s,r,a),f=Math.max(o,c,l),m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=h&&m.y>=d&&m.y<=f&&ra(s,o,r,c,a,l,m.x,m.y)&&Pt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function h0(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Pt(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,u=s.y,d=r.y,h=a.y,f=Math.min(o,c,l),m=Math.min(u,d,h),_=Math.max(o,c,l),g=Math.max(u,d,h),p=wh(f,m,e,t,n),S=wh(_,g,e,t,n),w=i.prevZ,x=i.nextZ;for(;w&&w.z>=p&&x&&x.z<=S;){if(w.x>=f&&w.x<=_&&w.y>=m&&w.y<=g&&w!==s&&w!==a&&ra(o,u,c,d,l,h,w.x,w.y)&&Pt(w.prev,w,w.next)>=0||(w=w.prevZ,x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&ra(o,u,c,d,l,h,x.x,x.y)&&Pt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;w&&w.z>=p;){if(w.x>=f&&w.x<=_&&w.y>=m&&w.y<=g&&w!==s&&w!==a&&ra(o,u,c,d,l,h,w.x,w.y)&&Pt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;x&&x.z<=S;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&ra(o,u,c,d,l,h,x.x,x.y)&&Pt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function u0(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Sr(n,s)&&xp(n,t,t.next,s)&&La(n,s)&&La(s,n)&&(e.push(n.i,t.i,s.i),Da(t),Da(t.next),t=i=s),t=t.next}while(t!==i);return Cs(t)}function d0(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&y0(a,o)){let c=_p(a,o);a=Cs(a,a.next),c=Cs(c,c.next),Ia(a,e,t,n,s,r,0),Ia(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function f0(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=gp(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(v0(l))}s.sort(p0);for(let r=0;r<s.length;r++)t=m0(s[r],t);return t}function p0(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function m0(i,e){let t=g0(i,e);if(!t)return e;let n=_p(t,i);return Cs(n,n.next),Cs(t,t.next)}function g0(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(Sr(i,t))return t;do{if(Sr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&bp(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);La(t,i)&&(d<u||d===u&&(t.x>a.x||t.x===a.x&&b0(a,t)))&&(a=t,u=d)}t=t.next}while(t!==o);return a}function b0(i,e){return Pt(i.prev,i,e.prev)<0&&Pt(e.next,i,i.next)<0}function x0(i,e,t,n){let s=i;do s.z===0&&(s.z=wh(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,_0(s)}function _0(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function wh(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function v0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function bp(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function ra(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&bp(i,e,t,n,s,r,a,o)}function y0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!M0(i,e)&&(La(i,e)&&La(e,i)&&S0(i,e)&&(Pt(i.prev,i,e.prev)||Pt(i,e.prev,e))||Sr(i,e)&&Pt(i.prev,i,i.next)>0&&Pt(e.prev,e,e.next)>0)}function Pt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Sr(i,e){return i.x===e.x&&i.y===e.y}function xp(i,e,t,n){let s=Vo(Pt(i,e,t)),r=Vo(Pt(i,e,n)),a=Vo(Pt(t,n,i)),o=Vo(Pt(t,n,e));return!!(s!==r&&a!==o||s===0&&Ho(i,t,e)||r===0&&Ho(i,n,e)||a===0&&Ho(t,i,n)||o===0&&Ho(t,e,n))}function Ho(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Vo(i){return i>0?1:i<0?-1:0}function M0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&xp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function La(i,e){return Pt(i.prev,i,i.next)<0?Pt(i,e,i.next)>=0&&Pt(i,i.prev,e)>=0:Pt(i,e,i.prev)<0||Pt(i,i.next,e)<0}function S0(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function _p(i,e){let t=Ah(i.i,i.x,i.y),n=Ah(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function xf(i,e,t,n){let s=Ah(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Da(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ah(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function E0(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Rh=class{static triangulate(e,t,n=2){return c0(e,t,n)}},Yn=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];_f(e),vf(n,e);let a=e.length;t.forEach(_f);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,vf(n,t[c]);let o=Rh.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function _f(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function vf(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Er=class i extends xt{constructor(e=new Si([new Ee(.5,.5),new Ee(-.5,.5),new Ee(-.5,-.5),new Ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new ht(s,3)),this.setAttribute("uv",new ht(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:T0,w,x=!1,E,T,P,v;if(p){w=p.getSpacedPoints(u),x=!0,h=!1;let D=p.isCatmullRomCurve3?p.closed:!1;E=p.computeFrenetFrames(u,D),T=new k,P=new k,v=new k}h||(g=0,f=0,m=0,_=0);let L=o.extractPoints(l),F=L.shape,C=L.holes;if(!Yn.isClockWise(F)){F=F.reverse();for(let D=0,R=C.length;D<R;D++){let N=C[D];Yn.isClockWise(N)&&(C[D]=N.reverse())}}function W(D){let N=10000000000000001e-36,H=D[0];for(let te=1;te<=D.length;te++){let _e=te%D.length,Z=D[_e],O=Z.x-H.x,K=Z.y-H.y,y=O*O+K*K,ee=Math.max(Math.abs(Z.x),Math.abs(Z.y),Math.abs(H.x),Math.abs(H.y)),re=N*ee*ee;if(y<=re){D.splice(_e,1),te--;continue}H=Z}}W(F),C.forEach(W);let z=C.length,G=F;for(let D=0;D<z;D++){let R=C[D];F=F.concat(R)}function oe(D,R,N){return R||Ye("ExtrudeGeometry: vec does not exist"),D.clone().addScaledVector(R,N)}let ce=F.length;function xe(D,R,N){let H,te,_e,Z=D.x-R.x,O=D.y-R.y,K=N.x-D.x,y=N.y-D.y,ee=Z*Z+O*O,re=Z*y-O*K;if(Math.abs(re)>Number.EPSILON){let M=Math.sqrt(ee),b=Math.sqrt(K*K+y*y),B=R.x-O/M,V=R.y+Z/M,$=N.x-y/b,be=N.y+K/b,X=(($-B)*y-(be-V)*K)/(Z*y-O*K);H=B+Z*X-D.x,te=V+O*X-D.y;let Y=H*H+te*te;if(Y<=2)return new Ee(H,te);_e=Math.sqrt(Y/2)}else{let M=!1;Z>Number.EPSILON?K>Number.EPSILON&&(M=!0):Z<-Number.EPSILON?K<-Number.EPSILON&&(M=!0):Math.sign(O)===Math.sign(y)&&(M=!0),M?(H=-O,te=Z,_e=Math.sqrt(ee)):(H=Z,te=O,_e=Math.sqrt(ee/2))}return new Ee(H/_e,te/_e)}let j=[];for(let D=0,R=G.length,N=R-1,H=D+1;D<R;D++,N++,H++)N===R&&(N=0),H===R&&(H=0),j[D]=xe(G[D],G[N],G[H]);let he=[],fe,Ie=j.concat();for(let D=0,R=z;D<R;D++){let N=C[D];fe=[];for(let H=0,te=N.length,_e=te-1,Z=H+1;H<te;H++,_e++,Z++)_e===te&&(_e=0),Z===te&&(Z=0),fe[H]=xe(N[H],N[_e],N[Z]);he.push(fe),Ie=Ie.concat(fe)}let De;if(g===0)De=Yn.triangulateShape(G,C);else{let D=[],R=[];for(let N=0;N<g;N++){let H=N/g,te=f*Math.cos(H*Math.PI/2),_e=m*Math.sin(H*Math.PI/2)+_;for(let Z=0,O=G.length;Z<O;Z++){let K=oe(G[Z],j[Z],_e);we(K.x,K.y,-te),H===0&&D.push(K)}for(let Z=0,O=z;Z<O;Z++){let K=C[Z];fe=he[Z];let y=[];for(let ee=0,re=K.length;ee<re;ee++){let M=oe(K[ee],fe[ee],_e);we(M.x,M.y,-te),H===0&&y.push(M)}H===0&&R.push(y)}}De=Yn.triangulateShape(D,R)}let rt=De.length,Ze=m+_;for(let D=0;D<ce;D++){let R=h?oe(F[D],Ie[D],Ze):F[D];x?(P.copy(E.normals[0]).multiplyScalar(R.x),T.copy(E.binormals[0]).multiplyScalar(R.y),v.copy(w[0]).add(P).add(T),we(v.x,v.y,v.z)):we(R.x,R.y,0)}for(let D=1;D<=u;D++)for(let R=0;R<ce;R++){let N=h?oe(F[R],Ie[R],Ze):F[R];x?(P.copy(E.normals[D]).multiplyScalar(N.x),T.copy(E.binormals[D]).multiplyScalar(N.y),v.copy(w[D]).add(P).add(T),we(v.x,v.y,v.z)):we(N.x,N.y,d/u*D)}for(let D=g-1;D>=0;D--){let R=D/g,N=f*Math.cos(R*Math.PI/2),H=m*Math.sin(R*Math.PI/2)+_;for(let te=0,_e=G.length;te<_e;te++){let Z=oe(G[te],j[te],H);we(Z.x,Z.y,d+N)}for(let te=0,_e=C.length;te<_e;te++){let Z=C[te];fe=he[te];for(let O=0,K=Z.length;O<K;O++){let y=oe(Z[O],fe[O],H);x?we(y.x,y.y+w[u-1].y,w[u-1].x+N):we(y.x,y.y,d+N)}}}Je(),le();function Je(){let D=s.length/3;if(h){let R=0,N=ce*R;for(let H=0;H<rt;H++){let te=De[H];Ve(te[2]+N,te[1]+N,te[0]+N)}R=u+g*2,N=ce*R;for(let H=0;H<rt;H++){let te=De[H];Ve(te[0]+N,te[1]+N,te[2]+N)}}else{for(let R=0;R<rt;R++){let N=De[R];Ve(N[2],N[1],N[0])}for(let R=0;R<rt;R++){let N=De[R];Ve(N[0]+ce*u,N[1]+ce*u,N[2]+ce*u)}}n.addGroup(D,s.length/3-D,0)}function le(){let D=s.length/3,R=0;me(G,R),R+=G.length;for(let N=0,H=C.length;N<H;N++){let te=C[N];me(te,R),R+=te.length}n.addGroup(D,s.length/3-D,1)}function me(D,R){let N=D.length;for(;--N>=0;){let H=N,te=N-1;te<0&&(te=D.length-1);for(let _e=0,Z=u+g*2;_e<Z;_e++){let O=ce*_e,K=ce*(_e+1),y=R+H+O,ee=R+te+O,re=R+te+K,M=R+H+K;Re(y,ee,re,M)}}}function we(D,R,N){c.push(D),c.push(R),c.push(N)}function Ve(D,R,N){je(D),je(R),je(N);let H=s.length/3,te=S.generateTopUV(n,s,H-3,H-2,H-1);U(te[0]),U(te[1]),U(te[2])}function Re(D,R,N,H){je(D),je(R),je(H),je(R),je(N),je(H);let te=s.length/3,_e=S.generateSideWallUV(n,s,te-6,te-3,te-2,te-1);U(_e[0]),U(_e[1]),U(_e[3]),U(_e[1]),U(_e[2]),U(_e[3])}function je(D){s.push(c[D*3+0]),s.push(c[D*3+1]),s.push(c[D*3+2])}function U(D){r.push(D.x),r.push(D.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return w0(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new uc[s.type]().fromJSON(s)),new i(n,e.options)}},T0={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new Ee(r,a),new Ee(o,c),new Ee(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],d=e[n*3+2],h=e[s*3],f=e[s*3+1],m=e[s*3+2],_=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(o-u)<Math.abs(a-l)?[new Ee(a,1-c),new Ee(l,1-d),new Ee(h,1-m),new Ee(_,1-p)]:[new Ee(o,1-c),new Ee(u,1-d),new Ee(f,1-m),new Ee(g,1-p)]}};function w0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var vn=class i extends xt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,d=e/o,h=t/c,f=[],m=[],_=[],g=[];for(let p=0;p<u;p++){let S=p*h-a;for(let w=0;w<l;w++){let x=w*d-r;m.push(x,-S,0),_.push(0,0,1),g.push(w/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<o;S++){let w=S+l*p,x=S+l*(p+1),E=S+1+l*(p+1),T=S+1+l*p;f.push(w,x,T),f.push(x,E,T)}this.setIndex(f),this.setAttribute("position",new ht(m,3)),this.setAttribute("normal",new ht(_,3)),this.setAttribute("uv",new ht(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Na=class i extends xt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],c=[],l=[],u=[],d=e,h=(t-e)/s,f=new k,m=new Ee;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){let p=r+g/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,u.push(m.x,m.y)}d+=h}for(let _=0;_<s;_++){let g=_*(n+1);for(let p=0;p<n;p++){let S=p+g,w=S,x=S+n+1,E=S+n+2,T=S+1;o.push(w,x,T),o.push(x,E,T)}}this.setIndex(o),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(l,3)),this.setAttribute("uv",new ht(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Fa=class i extends xt{constructor(e=new Si([new Ee(0,.5),new Ee(-.5,-.5),new Ee(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(o,c,u),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new ht(s,3)),this.setAttribute("normal",new ht(r,3)),this.setAttribute("uv",new ht(a,2));function l(u){let d=s.length/3,h=u.extractPoints(t),f=h.shape,m=h.holes;Yn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){let S=m[g];Yn.isClockWise(S)===!0&&(m[g]=S.reverse())}let _=Yn.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){let S=m[g];f=f.concat(S)}for(let g=0,p=f.length;g<p;g++){let S=f[g];s.push(S.x,S.y,0),r.push(0,0,1),a.push(S.x,S.y)}for(let g=0,p=_.length;g<p;g++){let S=_[g],w=S[0]+d,x=S[1]+d,E=S[2]+d;n.push(w,x,E),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return A0(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let a=t[e.shapes[s]];n.push(a)}return new i(n,e.curveSegments)}};function A0(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}var Qi=class i extends xt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],d=new k,h=new k,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){let S=[],w=p/n,x=a+w*o,E=e*Math.cos(x),T=Math.sqrt(e*e-E*E),P=0;p===0&&a===0?P=.5/t:p===n&&c===Math.PI&&(P=-.5/t);for(let v=0;v<=t;v++){let L=v/t,F=s+L*r;d.x=-T*Math.cos(F),d.y=E,d.z=T*Math.sin(F),m.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),g.push(L+P,1-w),S.push(l++)}u.push(S)}for(let p=0;p<n;p++)for(let S=0;S<t;S++){let w=u[p][S+1],x=u[p][S],E=u[p+1][S],T=u[p+1][S+1];(p!==0||a>0)&&f.push(w,x,T),(p!==n-1||c<Math.PI)&&f.push(x,E,T)}this.setIndex(f),this.setAttribute("position",new ht(m,3)),this.setAttribute("normal",new ht(_,3)),this.setAttribute("uv",new ht(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ei=class i extends xt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],u=[],d=[],h=new k,f=new k,m=new k;for(let _=0;_<=n;_++){let g=a+_/n*o;for(let p=0;p<=s;p++){let S=p/s*r;f.x=(e+t*Math.cos(g))*Math.cos(S),f.y=(e+t*Math.cos(g))*Math.sin(S),f.z=t*Math.sin(g),l.push(f.x,f.y,f.z),h.x=e*Math.cos(S),h.y=e*Math.sin(S),m.subVectors(f,h).normalize(),u.push(m.x,m.y,m.z),d.push(p/s),d.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=s;g++){let p=(s+1)*_+g-1,S=(s+1)*(_-1)+g-1,w=(s+1)*(_-1)+g,x=(s+1)*_+g;c.push(p,S,x),c.push(S,w,x)}this.setIndex(c),this.setAttribute("position",new ht(l,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Ua=class i extends xt{constructor(e=new Ra(new k(-1,-1,0),new k(-1,1,0),new k(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new k,c=new k,l=new Ee,u=new k,d=[],h=[],f=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new ht(d,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(f,2));function _(){for(let w=0;w<t;w++)g(w);g(r===!1?t:0),S(),p()}function g(w){u=e.getPointAt(w/t,u);let x=a.normals[w],E=a.binormals[w];for(let T=0;T<=s;T++){let P=T/s*Math.PI*2,v=Math.sin(P),L=-Math.cos(P);c.x=L*x.x+v*E.x,c.y=L*x.y+v*E.y,c.z=L*x.z+v*E.z,c.normalize(),h.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,d.push(o.x,o.y,o.z)}}function p(){for(let w=1;w<=t;w++)for(let x=1;x<=s;x++){let E=(s+1)*(w-1)+(x-1),T=(s+1)*w+(x-1),P=(s+1)*w+x,v=(s+1)*(w-1)+x;m.push(E,T,v),m.push(T,P,v)}}function S(){for(let w=0;w<=t;w++)for(let x=0;x<=s;x++)l.x=w/t,l.y=x/s,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new uc[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function Fs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(yf(s))s.isRenderTargetTexture?(qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(yf(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function an(i){let e={};for(let t=0;t<i.length;t++){let n=Fs(i[t]);for(let s in n)e[s]=n[s]}return e}function yf(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function R0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function au(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var vp={clone:Fs,merge:an},C0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,P0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,sn=class extends tn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=C0,this.fragmentShader=P0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fs(e.uniforms),this.uniformsGroups=R0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Xe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ee().fromArray(s.value);break;case"v3":this.uniforms[n].value=new k().fromArray(s.value);break;case"v4":this.uniforms[n].value=new bt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Qe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new et().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},fc=class extends sn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Xt=class extends tn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=to,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},dn=class extends Xt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return st(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Oa=class extends tn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=to,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=wc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},pc=class extends tn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},mc=class extends tn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ki(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ko(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function I0(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Mf(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function L0(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var ei=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},gc=class extends ei{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xs,endingEnd:xs}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case _s:r=e,o=2*t-n;break;case ha:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case _s:a=e,c=2*n-t;break;case ha:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),_=m*m,g=_*m,p=-h*g+2*h*_-h*m,S=(1+h)*g+(-1.5-2*h)*_+(-.5+h)*m+1,w=(-1-f)*g+(1.5+f)*_+.5*m,x=f*g-f*_;for(let E=0;E!==o;++E)r[E]=p*a[u+E]+S*a[l+E]+w*a[c+E]+x*a[d+E];return r}},ka=class extends ei{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),d=1-u;for(let h=0;h!==o;++h)r[h]=a[l+h]*d+a[c+h]*u;return r}},bc=class extends ei{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},xc=class extends ei{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let m=(n-t)/(s-t),_=1-m;for(let g=0;g!==o;++g)r[g]=a[l+g]*_+a[c+g]*m;return r}let h=o*2,f=e-1;for(let m=0;m!==o;++m){let _=a[l+m],g=a[c+m],p=f*h+m*2,S=d[p],w=d[p+1],x=e*h+m*2,E=u[x],T=u[x+1],P=N0(n,t,S,E,s);r[m]=yp(P,_,w,T,g)}return r}};function yp(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function D0(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function N0(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=yp(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let c=D0(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var fn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ki(t,this.TimeBufferType),this.values=Ki(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ki(e.times,Array),values:Ki(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Ko(e.settings)&&(n.settings={inTangents:Ki(e.settings.inTangents,Array),outTangents:Ki(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new bc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ka(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new gc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new xc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ys:t=this.InterpolantFactoryMethodDiscrete;break;case Ms:t=this.InterpolantFactoryMethodLinear;break;case Xo:t=this.InterpolantFactoryMethodSmooth;break;case Eh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return qe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ys;case this.InterpolantFactoryMethodLinear:return Ms;case this.InterpolantFactoryMethodSmooth:return Xo;case this.InterpolantFactoryMethodBezier:return Eh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Ko(this.settings)&&(Sf(this.settings.inTangents,e),Sf(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ye("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ye("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ye("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ye("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&bg(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ye("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Xo,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{let d=o*n,h=d-n,f=d+n;for(let m=0;m!==n;++m){let _=t[d+m];if(_!==t[h+m]||_!==t[f+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let d=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Ko(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Sf(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}fn.prototype.ValueTypeName="";fn.prototype.TimeBufferType=Float32Array;fn.prototype.ValueBufferType=Float32Array;fn.prototype.DefaultInterpolation=Ms;var Ti=class extends fn{constructor(e,t,n){super(e,t,n)}};Ti.prototype.ValueTypeName="bool";Ti.prototype.ValueBufferType=Array;Ti.prototype.DefaultInterpolation=ys;Ti.prototype.InterpolantFactoryMethodLinear=void 0;Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var Ba=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}};Ba.prototype.ValueTypeName="color";var wi=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}};wi.prototype.ValueTypeName="number";var _c=class extends ei{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let u=l+o;l!==u;l+=4)Dt.slerpFlat(r,0,a,l-o,a,l,c);return r}},Ai=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new _c(this.times,this.values,this.getValueSize(),e)}};Ai.prototype.ValueTypeName="quaternion";Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var Ri=class extends fn{constructor(e,t,n){super(e,t,n)}};Ri.prototype.ValueTypeName="string";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=ys;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var es=class extends fn{constructor(e,t,n,s){super(e,t,n,s)}};es.prototype.ValueTypeName="vector";var Ci=class{constructor(e="",t=-1,n=[],s=ml){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=wn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(U0(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(fn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let u=I0(c);c=Mf(c,1,u),l=Mf(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new wi(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],u=l.name.match(r);if(u&&u.length>1){let d=u[1],h=s[d];h||(s[d]=h=[]),h.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function F0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return wi;case"vector":case"vector2":case"vector3":case"vector4":return es;case"color":return Ba;case"quaternion":return Ai;case"bool":case"boolean":return Ti;case"string":return Ri}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function U0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=F0(i.type);if(i.times===void 0){let n=[],s=[];L0(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Ko(i.settings)&&(t.settings={inTangents:Ki(i.settings.inTangents,Float32Array),outTangents:Ki(i.settings.outTangents,Float32Array)}),t}var Jn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Ef(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Ef(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Ef(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var vc=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let f=l[d],m=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Mp=new vc,ti=class{constructor(e){this.manager=e!==void 0?e:Mp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ti.DEFAULT_MATERIAL_NAME="__DEFAULT";var xi={},Ch=class extends Error{constructor(e,t){super(e),this.response=t}},Tr=class extends ti{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Jn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(xi[e]!==void 0){xi[e].push({onLoad:t,onProgress:n,onError:s});return}xi[e]=[],xi[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&qe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=xi[e],d=l.body.getReader(),h=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=h?parseInt(h):0,m=f!==0,_=0,g=new ReadableStream({start(p){S();function S(){d.read().then(({done:w,value:x})=>{if(w)p.close();else{_+=x.byteLength;let E=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let T=0,P=u.length;T<P;T++){let v=u[T];v.onProgress&&v.onProgress(E)}p.enqueue(x),S()}},w=>{p.error(w)})}}});return new Response(g)}else throw new Ch(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{Jn.add(`file:${e}`,l);let u=xi[e];delete xi[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{let u=xi[e];if(u===void 0)throw this.manager.itemError(e),l;delete xi[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var rr=new WeakMap,yc=class extends ti{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Jn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=rr.get(a);d===void 0&&(d=[],rr.set(a,d)),d.push({onLoad:t,onError:s})}return a}let o=dr("img");function c(){u(),t&&t(this);let d=rr.get(this)||[];for(let h=0;h<d.length;h++){let f=d[h];f.onLoad&&f.onLoad(this)}rr.delete(this),r.manager.itemEnd(e)}function l(d){u(),s&&s(d),Jn.remove(`image:${e}`);let h=rr.get(this)||[];for(let f=0;f<h.length;f++){let m=h[f];m.onError&&m.onError(d)}rr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Jn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var za=class extends ti{constructor(e){super(e)}load(e,t,n,s){let r=new zt,a=new yc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Ps=class extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ga=class extends Ps{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},yh=new et,Tf=new k,wf=new k,wr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.mapType=pn,this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _r,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Tf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Tf),wf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wf),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){yh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(yh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===ur||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(yh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Wo=new k,qo=new Dt,Kn=new k,Ha=class extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=Bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Wo,qo,Kn),Kn.x===1&&Kn.y===1&&Kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wo,qo,Kn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Wo,qo,Kn),Kn.x===1&&Kn.y===1&&Kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wo,qo,Kn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ji=new k,Af=new Ee,Rf=new Ee,Bt=class extends Ha{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(aa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ss*2*Math.atan(Math.tan(aa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ji.x,ji.y).multiplyScalar(-e/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ji.x,ji.y).multiplyScalar(-e/ji.z)}getViewSize(e,t){return this.getViewBounds(e,Af,Rf),t.subVectors(Rf,Af)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(aa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ph=class extends wr{constructor(){super(new Bt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ss*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Va=class extends Ps{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Ph}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Ih=class extends wr{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0}},Pi=class extends Ps{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ih}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},ts=class extends Ha{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Lh=class extends wr{constructor(){super(new ts(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ns=class extends Ps{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new Lh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ii=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Mh=new WeakMap,Wa=class extends ti{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&qe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&qe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Jn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{Mh.has(a)===!0?(s&&s(Mh.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Jn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Mh.set(c,l),Jn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Jn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ar=-90,or=1,Mc=class extends Tt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Bt(ar,or,e,t);s.layers=this.layers,this.add(s);let r=new Bt(ar,or,e,t);r.layers=this.layers,this.add(r);let a=new Bt(ar,or,e,t);a.layers=this.layers,this.add(a);let o=new Bt(ar,or,e,t);o.layers=this.layers,this.add(o);let c=new Bt(ar,or,e,t);c.layers=this.layers,this.add(c);let l=new Bt(ar,or,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ur)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Sc=class extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Ec=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){Dt.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let a=this._workIndex*r;Dt.multiplyQuaternionsFlat(e,a,e,t,e,n),Dt.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){let a=1-s;for(let o=0;o!==r;++o){let c=t+o;e[c]=e[c]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*s}}},ou="\\[\\]\\.:\\/",O0=new RegExp("["+ou+"]","g"),cu="[^"+ou+"]",k0="[^"+ou.replace("\\.","")+"]",B0=/((?:WC+[\/:])*)/.source.replace("WC",cu),z0=/(WCOD+)?/.source.replace("WCOD",k0),G0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",cu),H0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",cu),V0=new RegExp("^"+B0+z0+G0+H0+"$"),W0=["material","materials","bones","map"],Dh=class{constructor(e,t,n){let s=n||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},yt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(O0,"")}static parseTrackName(e){let t=V0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);W0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){qe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ye("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ye("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ye("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ye("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ye("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Ye("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yt.Composite=Dh;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Tc=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,a=r.length,o=new Array(a),c={endingStart:xs,endingEnd:xs};for(let l=0;l!==a;++l){let u=r[l].createInterpolant(null);o[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=pl,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);let c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case ep:for(let u=0,d=c.length;u!==d;++u)c[u].evaluate(a),l[u].accumulateAdditive(o);break;case ml:default:for(let u=0,d=c.length;u!==d;++u)c[u].evaluate(a),l[u].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,a=n===Qf;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===fl){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){let o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=_s,s.endingEnd=_s):(e?s.endingStart=this.zeroSlopeAtStart?_s:xs:s.endingStart=ha,t?s.endingEnd=this.zeroSlopeAtEnd?_s:xs:s.endingEnd=ha)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}},q0=new Float32Array(1),qa=class extends zn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,u=l[c];u===void 0&&(u={},l[c]=u);for(let d=0;d!==r;++d){let h=s[d],f=h.name,m=u[f];if(m!==void 0)++m.referenceCount,a[d]=m;else{if(m=a[d],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,f));continue}let _=t&&t._propertyBindings[d].binding.parsedPath;m=new Ec(yt.create(n,f,_),h.ValueTypeName,h.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,f),a[d]=m}o[d].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;let d=o.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new ka(new Float32Array(2),new Float32Array(2),1,q0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,a=typeof e=="string"?Ci.findByName(s,e):e,o=a!==null?a.uuid:e,c=this._actionsByClip[o],l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=ml),c!==void 0){let d=c.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;let u=new Tc(this,a,t,n);return this._bindAction(u,l),this._addInactiveAction(u,o,r),u}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Ci.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,a);let o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){let l=a[o];this._deactivateAction(l);let u=l._cacheIndex,d=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var Nh=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};function lu(i,e,t,n){let s=X0(n);switch(t){case Qh:return i*e;case Dc:return i*e/s.components*s.byteLength;case Nc:return i*e/s.components*s.byteLength;case rs:return i*e*2/s.components*s.byteLength;case Fc:return i*e*2/s.components*s.byteLength;case eu:return i*e*3/s.components*s.byteLength;case Mn:return i*e*4/s.components*s.byteLength;case Uc:return i*e*4/s.components*s.byteLength;case Ka:case Ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ja:case Za:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case kc:case zc:return Math.max(i,16)*Math.max(e,8)/4;case Oc:case Bc:return Math.max(i,8)*Math.max(e,8)/2;case Gc:case Hc:case Wc:case qc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Vc:case $a:case Xc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case jc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Kc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Yc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Jc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Zc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case $c:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Qc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case el:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case tl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case nl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case il:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case sl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case rl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case al:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ol:case cl:case ll:return Math.ceil(i/4)*Math.ceil(e/4)*16;case hl:case ul:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Qa:case dl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function X0(i){switch(i){case pn:case Yh:return{byteLength:1,components:1};case Pr:case Jh:case Wn:return{byteLength:2,components:1};case Ic:case Lc:return{byteLength:2,components:4};case Vn:case Pc:case yn:return{byteLength:4,components:1};case Zh:case $h:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Wp(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function K0(i){let e=new WeakMap;function t(o,c){let l=o.array,u=o.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){let m=d[h],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){let _=d[f];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Y0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,J0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Z0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Q0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,eb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ib=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,sb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ab=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ob=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,cb=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lb=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ub=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,db=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,mb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,xb=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_b=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,vb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,yb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Eb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tb="gl_FragColor = linearToOutputTexel( gl_FragColor );",wb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ab=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Rb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Cb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ib=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Lb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Db=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ub=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ob=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bb=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Gb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Hb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qb=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jb=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Yb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Jb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zb=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,$b=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ex=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ix=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ax=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ox=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ux=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,px=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,xx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_x=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ex=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Tx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ax=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Px=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ix=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Lx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Dx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Nx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Fx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ux=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ox=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Kx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Yx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$x=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,n_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,i_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,s_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,r_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,c_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,l_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,h_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,p_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,g_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,b_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,x_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,__=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,v_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,E_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,T_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,A_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,R_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nt={alphahash_fragment:Y0,alphahash_pars_fragment:J0,alphamap_fragment:Z0,alphamap_pars_fragment:$0,alphatest_fragment:Q0,alphatest_pars_fragment:eb,aomap_fragment:tb,aomap_pars_fragment:nb,batching_pars_vertex:ib,batching_vertex:sb,begin_vertex:rb,beginnormal_vertex:ab,bsdfs:ob,iridescence_fragment:cb,bumpmap_pars_fragment:lb,clipping_planes_fragment:hb,clipping_planes_pars_fragment:ub,clipping_planes_pars_vertex:db,clipping_planes_vertex:fb,color_fragment:pb,color_pars_fragment:mb,color_pars_vertex:gb,color_vertex:bb,common:xb,cube_uv_reflection_fragment:_b,defaultnormal_vertex:vb,displacementmap_pars_vertex:yb,displacementmap_vertex:Mb,emissivemap_fragment:Sb,emissivemap_pars_fragment:Eb,colorspace_fragment:Tb,colorspace_pars_fragment:wb,envmap_fragment:Ab,envmap_common_pars_fragment:Rb,envmap_pars_fragment:Cb,envmap_pars_vertex:Pb,envmap_physical_pars_fragment:Gb,envmap_vertex:Ib,fog_vertex:Lb,fog_pars_vertex:Db,fog_fragment:Nb,fog_pars_fragment:Fb,gradientmap_pars_fragment:Ub,lightmap_pars_fragment:Ob,lights_lambert_fragment:kb,lights_lambert_pars_fragment:Bb,lights_pars_begin:zb,lights_toon_fragment:Hb,lights_toon_pars_fragment:Vb,lights_phong_fragment:Wb,lights_phong_pars_fragment:qb,lights_physical_fragment:Xb,lights_physical_pars_fragment:jb,lights_fragment_begin:Kb,lights_fragment_maps:Yb,lights_fragment_end:Jb,lightprobes_pars_fragment:Zb,logdepthbuf_fragment:$b,logdepthbuf_pars_fragment:Qb,logdepthbuf_pars_vertex:ex,logdepthbuf_vertex:tx,map_fragment:nx,map_pars_fragment:ix,map_particle_fragment:sx,map_particle_pars_fragment:rx,metalnessmap_fragment:ax,metalnessmap_pars_fragment:ox,morphinstance_vertex:cx,morphcolor_vertex:lx,morphnormal_vertex:hx,morphtarget_pars_vertex:ux,morphtarget_vertex:dx,normal_fragment_begin:fx,normal_fragment_maps:px,normal_pars_fragment:mx,normal_pars_vertex:gx,normal_vertex:bx,normalmap_pars_fragment:xx,clearcoat_normal_fragment_begin:_x,clearcoat_normal_fragment_maps:vx,clearcoat_pars_fragment:yx,iridescence_pars_fragment:Mx,opaque_fragment:Sx,packing:Ex,premultiplied_alpha_fragment:Tx,project_vertex:wx,dithering_fragment:Ax,dithering_pars_fragment:Rx,roughnessmap_fragment:Cx,roughnessmap_pars_fragment:Px,shadowmap_pars_fragment:Ix,shadowmap_pars_vertex:Lx,shadowmap_vertex:Dx,shadowmask_pars_fragment:Nx,skinbase_vertex:Fx,skinning_pars_vertex:Ux,skinning_vertex:Ox,skinnormal_vertex:kx,specularmap_fragment:Bx,specularmap_pars_fragment:zx,tonemapping_fragment:Gx,tonemapping_pars_fragment:Hx,transmission_fragment:Vx,transmission_pars_fragment:Wx,uv_pars_fragment:qx,uv_pars_vertex:Xx,uv_vertex:jx,worldpos_vertex:Kx,background_vert:Yx,background_frag:Jx,backgroundCube_vert:Zx,backgroundCube_frag:$x,cube_vert:Qx,cube_frag:e_,depth_vert:t_,depth_frag:n_,distance_vert:i_,distance_frag:s_,equirect_vert:r_,equirect_frag:a_,linedashed_vert:o_,linedashed_frag:c_,meshbasic_vert:l_,meshbasic_frag:h_,meshlambert_vert:u_,meshlambert_frag:d_,meshmatcap_vert:f_,meshmatcap_frag:p_,meshnormal_vert:m_,meshnormal_frag:g_,meshphong_vert:b_,meshphong_frag:x_,meshphysical_vert:__,meshphysical_frag:v_,meshtoon_vert:y_,meshtoon_frag:M_,points_vert:S_,points_frag:E_,shadow_vert:T_,shadow_frag:w_,sprite_vert:A_,sprite_frag:R_},Ne={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},ri={basic:{uniforms:an([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:an([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:an([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:an([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:an([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new Xe(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:an([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:an([Ne.points,Ne.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:an([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:an([Ne.common,Ne.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:an([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:an([Ne.sprite,Ne.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distance:{uniforms:an([Ne.common,Ne.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distance_vert,fragmentShader:nt.distance_frag},shadow:{uniforms:an([Ne.lights,Ne.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};ri.physical={uniforms:an([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};var xl={r:0,b:0,g:0},C_=new et,qp=new Qe;qp.set(-1,0,0,0,1,0,0,0,1);function P_(i,e,t,n,s,r){let a=new Xe(0),o=s===!0?0:1,c,l,u=null,d=0,h=null;function f(S){let w=S.isScene===!0?S.background:null;if(w&&w.isTexture){let x=S.backgroundBlurriness>0;w=e.get(w,x)}return w}function m(S){let w=!1,x=f(S);x===null?g(a,o):x&&x.isColor&&(g(x,1),w=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(S,w){let x=f(w);x&&(x.isCubeTexture||x.mapping===ja)?(l===void 0&&(l=new ct(new nn(1,1,1),new sn({name:"BackgroundCubeMaterial",uniforms:Fs(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(C_.makeRotationFromEuler(w.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(qp),l.material.toneMapped=it.getTransfer(x.colorSpace)!==mt,(u!==x||d!==x.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,h=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new ct(new vn(2,2),new sn({name:"BackgroundMaterial",uniforms:Fs(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=it.getTransfer(x.colorSpace)!==mt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,h=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function g(S,w){S.getRGB(xl,au(i)),t.buffers.color.setClear(xl.r,xl.g,xl.b,w,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,w=1){a.set(S),o=w,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,g(a,o)},render:m,addToRenderList:_,dispose:p}}function I_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(C,I,W,z,G){let oe=!1,ce=d(C,z,W,I);r!==ce&&(r=ce,l(r.object)),oe=f(C,z,W,G),oe&&m(C,z,W,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(oe||a)&&(a=!1,x(C,I,W,z),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function u(C){return i.deleteVertexArray(C)}function d(C,I,W,z){let G=z.wireframe===!0,oe=n[I.id];oe===void 0&&(oe={},n[I.id]=oe);let ce=C.isInstancedMesh===!0?C.id:0,xe=oe[ce];xe===void 0&&(xe={},oe[ce]=xe);let j=xe[W.id];j===void 0&&(j={},xe[W.id]=j);let he=j[G];return he===void 0&&(he=h(c()),j[G]=he),he}function h(C){let I=[],W=[],z=[];for(let G=0;G<t;G++)I[G]=0,W[G]=0,z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:W,attributeDivisors:z,object:C,attributes:{},index:null}}function f(C,I,W,z){let G=r.attributes,oe=I.attributes,ce=0,xe=W.getAttributes();for(let j in xe)if(xe[j].location>=0){let fe=G[j],Ie=oe[j];if(Ie===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(Ie=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(Ie=C.instanceColor)),fe===void 0||fe.attribute!==Ie||Ie&&fe.data!==Ie.data)return!0;ce++}return r.attributesNum!==ce||r.index!==z}function m(C,I,W,z){let G={},oe=I.attributes,ce=0,xe=W.getAttributes();for(let j in xe)if(xe[j].location>=0){let fe=oe[j];fe===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(fe=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(fe=C.instanceColor));let Ie={};Ie.attribute=fe,fe&&fe.data&&(Ie.data=fe.data),G[j]=Ie,ce++}r.attributes=G,r.attributesNum=ce,r.index=z}function _(){let C=r.newAttributes;for(let I=0,W=C.length;I<W;I++)C[I]=0}function g(C){p(C,0)}function p(C,I){let W=r.newAttributes,z=r.enabledAttributes,G=r.attributeDivisors;W[C]=1,z[C]===0&&(i.enableVertexAttribArray(C),z[C]=1),G[C]!==I&&(i.vertexAttribDivisor(C,I),G[C]=I)}function S(){let C=r.newAttributes,I=r.enabledAttributes;for(let W=0,z=I.length;W<z;W++)I[W]!==C[W]&&(i.disableVertexAttribArray(W),I[W]=0)}function w(C,I,W,z,G,oe,ce){ce===!0?i.vertexAttribIPointer(C,I,W,G,oe):i.vertexAttribPointer(C,I,W,z,G,oe)}function x(C,I,W,z){_();let G=z.attributes,oe=W.getAttributes(),ce=I.defaultAttributeValues;for(let xe in oe){let j=oe[xe];if(j.location>=0){let he=G[xe];if(he===void 0&&(xe==="instanceMatrix"&&C.instanceMatrix&&(he=C.instanceMatrix),xe==="instanceColor"&&C.instanceColor&&(he=C.instanceColor)),he!==void 0){let fe=he.normalized,Ie=he.itemSize,De=e.get(he);if(De===void 0)continue;let rt=De.buffer,Ze=De.type,Je=De.bytesPerElement,le=Ze===i.INT||Ze===i.UNSIGNED_INT||he.gpuType===Pc;if(he.isInterleavedBufferAttribute){let me=he.data,we=me.stride,Ve=he.offset;if(me.isInstancedInterleavedBuffer){for(let Re=0;Re<j.locationSize;Re++)p(j.location+Re,me.meshPerAttribute);C.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Re=0;Re<j.locationSize;Re++)g(j.location+Re);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let Re=0;Re<j.locationSize;Re++)w(j.location+Re,Ie/j.locationSize,Ze,fe,we*Je,(Ve+Ie/j.locationSize*Re)*Je,le)}else{if(he.isInstancedBufferAttribute){for(let me=0;me<j.locationSize;me++)p(j.location+me,he.meshPerAttribute);C.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let me=0;me<j.locationSize;me++)g(j.location+me);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let me=0;me<j.locationSize;me++)w(j.location+me,Ie/j.locationSize,Ze,fe,Ie*Je,Ie/j.locationSize*me*Je,le)}}else if(ce!==void 0){let fe=ce[xe];if(fe!==void 0)switch(fe.length){case 2:i.vertexAttrib2fv(j.location,fe);break;case 3:i.vertexAttrib3fv(j.location,fe);break;case 4:i.vertexAttrib4fv(j.location,fe);break;default:i.vertexAttrib1fv(j.location,fe)}}}}S()}function E(){L();for(let C in n){let I=n[C];for(let W in I){let z=I[W];for(let G in z){let oe=z[G];for(let ce in oe)u(oe[ce].object),delete oe[ce];delete z[G]}}delete n[C]}}function T(C){if(n[C.id]===void 0)return;let I=n[C.id];for(let W in I){let z=I[W];for(let G in z){let oe=z[G];for(let ce in oe)u(oe[ce].object),delete oe[ce];delete z[G]}}delete n[C.id]}function P(C){for(let I in n){let W=n[I];for(let z in W){let G=W[z];if(G[C.id]===void 0)continue;let oe=G[C.id];for(let ce in oe)u(oe[ce].object),delete oe[ce];delete G[C.id]}}}function v(C){for(let I in n){let W=n[I],z=C.isInstancedMesh===!0?C.id:0,G=W[z];if(G!==void 0){for(let oe in G){let ce=G[oe];for(let xe in ce)u(ce[xe].object),delete ce[xe];delete G[oe]}delete W[z],Object.keys(W).length===0&&delete n[I]}}}function L(){F(),a=!0,r!==s&&(r=s,l(r.object))}function F(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:F,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:S}}function L_(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let f=0;f<u;f++)h+=l[f];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function D_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Mn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let v=P===Wn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==pn&&P!==yn&&!v&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(qe("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:x,maxSamples:E,samples:T}}function N_(i){let e=this,t=null,n=0,s=!1,r=!1,a=new On,o=new Qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||s;return s=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let m=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?u(null):l();else{let S=r?0:n,w=S*4,x=p.clippingState||null;c.value=x,x=u(m,h,w,f);for(let E=0;E!==w;++E)x[E]=t[E];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,m){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=c.value,m!==!0||g===null){let p=f+_*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(g===null||g.length<p)&&(g=new Float32Array(p));for(let w=0,x=f;w!==_;++w,x+=4)a.copy(d[w]).applyMatrix4(S,o),a.normal.toArray(g,x),g[x+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var Nr=4,F_=6,U_=20,O_=256,no=new ts,Sp=new Xe,hu=null,uu=0,du=0,fu=!1,k_=new k,Us=new k,Ur=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=k_}=r;hu=this._renderer.getRenderTarget(),uu=this._renderer.getActiveCubeFace(),du=this._renderer.getActiveMipmapLevel(),fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(hu,uu,du),this._renderer.xr.enabled=fu,e.scissorTest=!1,Dr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===is||e.mapping===Ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hu=this._renderer.getRenderTarget(),uu=this._renderer.getActiveCubeFace(),du=this._renderer.getActiveMipmapLevel(),fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:Wn,format:Mn,colorSpace:hn,depthBuffer:!1},s=Ep(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ep(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=B_(r)),this._blurMaterial=G_(r,e,t),this._ggxMaterial=z_(r,e,t)}return s}_compileMaterial(e){let t=new ct(new xt,e);this._renderer.compile(t,no)}_sceneToCubeUV(e,t,n,s,r){let c=new Bt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Sp),d.toneMapping=Gn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ct(new nn,new It({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,p=!1,S=e.background;S?S.isColor&&(g.color.copy(S),e.background=null,p=!0):(g.color.copy(Sp),p=!0);for(let w=0;w<6;w++){let x=w%3;x===0?(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[w],r.y,r.z)):x===1?(c.up.set(0,0,l[w]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[w],r.z)):(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[w]));let E=this._cubeSize;Dr(s,x*E,w>2?E:0,E,E),d.setRenderTarget(s),p&&d.render(_,c),d.render(e,c)}d.toneMapping=f,d.autoClear=h,e.background=S}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===is||e.mapping===Ds;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tp());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Dr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,no)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=l*1.25,f=d*h,{_lodMax:m}=this,_=this._sizeLods[n],g=3*_*(n>m-Nr?n-m+Nr:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=m-t,Dr(r,g,p,3*_,2*_),s.setRenderTarget(r),s.render(o,no),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,Dr(e,g,p,3*_,2*_),s.setRenderTarget(e),s.render(o,no)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-Nr?s-this._lodMax+Nr:0),h=4*(this._cubeSize-u);Dr(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(c,no)}};function B_(i){let e=[],t=[],n=i,s=i-Nr+1+F_;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,h=6,f=3,m=new Float32Array(f*h*d),_=new Float32Array(f*h*d);for(let p=0;p<d;p++){let S=p%3*2/3-1,w=p>2?0:-1,x=[S,w,0,S+2/3,w,0,S+2/3,w+1,0,S,w,0,S+2/3,w+1,0,S,w+1,0];m.set(x,f*h*p);for(let E=0;E<h;E++){let T=u[E*2]*2-1,P=u[E*2+1]*2-1;p===0?Us.set(1,P,T):p===1?Us.set(-T,1,-P):p===2?Us.set(-T,P,1):p===3?Us.set(-1,P,-T):p===4?Us.set(-T,-1,P):Us.set(T,P,-1),Us.toArray(_,(p*h+E)*f)}}let g=new xt;g.setAttribute("position",new Rt(m,f)),g.setAttribute("outputDirection",new Rt(_,f)),t.push(new ct(g,null)),n>Nr&&n--}return{lodMeshes:t,sizeLods:e}}function Ep(i,e,t){let n=new un(i,e,t);return n.texture.mapping=ja,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Dr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function z_(i,e,t){return new sn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:O_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ml(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function G_(i,e,t){return new sn({name:"SphericalGaussianBlur",defines:{SAMPLES:U_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ml(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Tp(){return new sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function wp(){return new sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Ml(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var vl=class extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Sa(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new nn(5,5,5),r=new sn({name:"CubemapFromEquirect",uniforms:Fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Gt,blending:ii});r.uniforms.tEquirect.value=t;let a=new ct(s,r),o=t.minFilter;return t.minFilter===Hn&&(t.minFilter=Ft),new Mc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function H_(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,f=!1){return h==null?null:f?a(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===Ac||f===Rc)if(e.has(h)){let m=e.get(h).texture;return o(m,h.mapping)}else{let m=h.image;if(m&&m.height>0){let _=new vl(m.height);return _.fromEquirectangularTexture(i,h),e.set(h,_),h.addEventListener("dispose",l),o(_.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let f=h.mapping,m=f===Ac||f===Rc,_=f===is||f===Ds;if(m||_){let g=t.get(h),p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new Ur(i)),g=m?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{let S=h.image;return m&&S&&S.height>0||_&&S&&c(S)?(n===null&&(n=new Ur(i)),g=m?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,f){return f===Ac?h.mapping=is:f===Rc&&(h.mapping=Ds),h}function c(h){let f=0,m=6;for(let _=0;_<m;_++)h[_]!==void 0&&f++;return f===m}function l(h){let f=h.target;f.removeEventListener("dispose",l);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function V_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&vs("WebGLRenderer: "+n+" extension not supported."),s}}}function W_(i,e,t,n){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let m in h.attributes)e.remove(h.attributes[m]);h.removeEventListener("dispose",a),delete s[h.id];let f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function c(d){let h=d.attributes;for(let f in h)e.update(h[f],i.ARRAY_BUFFER)}function l(d){let h=[],f=d.index,m=d.attributes.position,_=0;if(m===void 0)return;if(f!==null){let S=f.array;_=f.version;for(let w=0,x=S.length;w<x;w+=3){let E=S[w+0],T=S[w+1],P=S[w+2];h.push(E,T,T,P,P,E)}}else{let S=m.array;_=m.version;for(let w=0,x=S.length/3-1;w<x;w+=3){let E=w+0,T=w+1,P=w+2;h.push(E,T,T,P,P,E)}}let g=new(m.count>=65535?ba:ga)(h,1);g.version=_;let p=r.get(d);p&&e.remove(p),r.set(d,g)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function q_(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,h){i.drawElements(n,h,r,d*a),t.update(h,n,1)}function l(d,h,f){f!==0&&(i.drawElementsInstanced(n,h,r,d*a,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,f);let _=0;for(let g=0;g<f;g++)_+=h[g];t.update(_,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function X_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function j_(i,e,t){let n=new WeakMap,s=new bt;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==d){let L=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",L)};h!==void 0&&h.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],w=0;f===!0&&(w=1),m===!0&&(w=2),_===!0&&(w=3);let x=o.attributes.position.count*w,E=1;x>e.maxTextureSize&&(E=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let T=new Float32Array(x*E*4*d),P=new fa(T,x,E,d);P.type=yn,P.needsUpdate=!0;let v=w*4;for(let F=0;F<d;F++){let C=g[F],I=p[F],W=S[F],z=x*E*4*F;for(let G=0;G<C.count;G++){let oe=G*v;f===!0&&(s.fromBufferAttribute(C,G),T[z+oe+0]=s.x,T[z+oe+1]=s.y,T[z+oe+2]=s.z,T[z+oe+3]=0),m===!0&&(s.fromBufferAttribute(I,G),T[z+oe+4]=s.x,T[z+oe+5]=s.y,T[z+oe+6]=s.z,T[z+oe+7]=0),_===!0&&(s.fromBufferAttribute(W,G),T[z+oe+8]=s.x,T[z+oe+9]=s.y,T[z+oe+10]=s.z,T[z+oe+11]=W.itemSize===4?s.w:1)}}h={count:d,texture:P,size:new Ee(x,E)},n.set(o,h),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let m=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function K_(i,e,t,n,s){let r=new WeakMap;function a(l){let u=s.render.frame,d=l.geometry,h=e.get(l,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var Y_={[Hh]:"LINEAR_TONE_MAPPING",[Vh]:"REINHARD_TONE_MAPPING",[Wh]:"CINEON_TONE_MAPPING",[Xa]:"ACES_FILMIC_TONE_MAPPING",[Xh]:"AGX_TONE_MAPPING",[jh]:"NEUTRAL_TONE_MAPPING",[qh]:"CUSTOM_TONE_MAPPING"};function J_(i,e,t,n,s,r){let a=new un(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new xt;l.setAttribute("position",new ht([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ht([0,2,0,0,2,0],2));let u=new fc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ct(l,u),h=new ts(-1,1,1,-1,0,1),f=null,m=null,_=!1,g,p=null,S=[],w=!1;this.setSize=function(x,E){a.setSize(x,E),o!==null&&o.setSize(x,E),c!==null&&c.setSize(x,E);for(let T=0;T<S.length;T++){let P=S[T];P.setSize&&P.setSize(x,E)}},this.setEffects=function(x){S=x,w=S.length>0&&S[0].isRenderPass===!0;let E=a.width,T=a.height;S.length>0&&o===null&&(o=new un(E,T,{type:Wn,depthBuffer:!1,stencilBuffer:!1}),c=new un(E,T,{type:Wn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<S.length;P++){let v=S[P];v.setSize&&v.setSize(E,T)}},this.begin=function(x,E){if(_||x.toneMapping===Gn&&S.length===0)return!1;if(p=E,E!==null){let T=E.width,P=E.height;(a.width!==T||a.height!==P)&&this.setSize(T,P)}return w===!1&&x.setRenderTarget(a),g=x.toneMapping,x.toneMapping=Gn,!0},this.hasRenderPass=function(){return w},this.end=function(x,E){x.toneMapping=g,_=!0;let T=a,P=o;for(let v=0;v<S.length;v++){let L=S[v];L.enabled!==!1&&(L.render(x,P,T,E),L.needsSwap!==!1&&(T=P,P=P===o?c:o))}if(f!==x.outputColorSpace||m!==x.toneMapping){f=x.outputColorSpace,m=x.toneMapping,u.defines={},it.getTransfer(f)===mt&&(u.defines.SRGB_TRANSFER="");let v=Y_[m];v&&(u.defines[v]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=T.texture,x.setRenderTarget(p),x.render(d,h),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Xp=new zt,gu=new Zi(1,1),jp=new fa,Kp=new sc,Yp=new Sa,Ap=[],Rp=[],Cp=new Float32Array(16),Pp=new Float32Array(9),Ip=new Float32Array(4);function Or(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Ap[s];if(r===void 0&&(r=new Float32Array(s),Ap[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Sl(i,e){let t=Rp[e];t===void 0&&(t=new Int32Array(e),Rp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Z_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function Q_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function ev(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function tv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;Ip.set(n),i.uniformMatrix2fv(this.addr,!1,Ip),Vt(t,n)}}function nv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;Pp.set(n),i.uniformMatrix3fv(this.addr,!1,Pp),Vt(t,n)}}function iv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;Cp.set(n),i.uniformMatrix4fv(this.addr,!1,Cp),Vt(t,n)}}function sv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function rv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function av(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function ov(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function cv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function lv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function hv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function uv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function dv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(gu.compareFunction=t.isReversedDepthBuffer()?bl:gl,r=gu):r=Xp,t.setTexture2D(e||r,s)}function fv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Kp,s)}function pv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Yp,s)}function mv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||jp,s)}function gv(i){switch(i){case 5126:return Z_;case 35664:return $_;case 35665:return Q_;case 35666:return ev;case 35674:return tv;case 35675:return nv;case 35676:return iv;case 5124:case 35670:return sv;case 35667:case 35671:return rv;case 35668:case 35672:return av;case 35669:case 35673:return ov;case 5125:return cv;case 36294:return lv;case 36295:return hv;case 36296:return uv;case 35678:case 36198:case 36298:case 36306:case 35682:return dv;case 35679:case 36299:case 36307:return fv;case 35680:case 36300:case 36308:case 36293:return pv;case 36289:case 36303:case 36311:case 36292:return mv}}function bv(i,e){i.uniform1fv(this.addr,e)}function xv(i,e){let t=Or(e,this.size,2);i.uniform2fv(this.addr,t)}function _v(i,e){let t=Or(e,this.size,3);i.uniform3fv(this.addr,t)}function vv(i,e){let t=Or(e,this.size,4);i.uniform4fv(this.addr,t)}function yv(i,e){let t=Or(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Mv(i,e){let t=Or(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Sv(i,e){let t=Or(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ev(i,e){i.uniform1iv(this.addr,e)}function Tv(i,e){i.uniform2iv(this.addr,e)}function wv(i,e){i.uniform3iv(this.addr,e)}function Av(i,e){i.uniform4iv(this.addr,e)}function Rv(i,e){i.uniform1uiv(this.addr,e)}function Cv(i,e){i.uniform2uiv(this.addr,e)}function Pv(i,e){i.uniform3uiv(this.addr,e)}function Iv(i,e){i.uniform4uiv(this.addr,e)}function Lv(i,e,t){let n=this.cache,s=e.length,r=Sl(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=gu:a=Xp;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Dv(i,e,t){let n=this.cache,s=e.length,r=Sl(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Kp,r[a])}function Nv(i,e,t){let n=this.cache,s=e.length,r=Sl(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Yp,r[a])}function Fv(i,e,t){let n=this.cache,s=e.length,r=Sl(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||jp,r[a])}function Uv(i){switch(i){case 5126:return bv;case 35664:return xv;case 35665:return _v;case 35666:return vv;case 35674:return yv;case 35675:return Mv;case 35676:return Sv;case 5124:case 35670:return Ev;case 35667:case 35671:return Tv;case 35668:case 35672:return wv;case 35669:case 35673:return Av;case 5125:return Rv;case 36294:return Cv;case 36295:return Pv;case 36296:return Iv;case 35678:case 36198:case 36298:case 36306:case 35682:return Lv;case 35679:case 36299:case 36307:return Dv;case 35680:case 36300:case 36308:case 36293:return Nv;case 36289:case 36303:case 36311:case 36292:return Fv}}var bu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=gv(t.type)}},xu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Uv(t.type)}},_u=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},pu=/(\w+)(\])?(\[|\.)?/g;function Lp(i,e){i.seq.push(e),i.map[e.id]=e}function Ov(i,e,t){let n=i.name,s=n.length;for(pu.lastIndex=0;;){let r=pu.exec(n),a=pu.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Lp(t,l===void 0?new bu(o,i,e):new xu(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new _u(o),Lp(t,d)),t=d}}}var Fr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Ov(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Dp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var kv=37297,Bv=0;function zv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Np=new Qe;function Gv(i){it._getMatrix(Np,it.workingColorSpace,i);let e=`mat3( ${Np.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case ua:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return qe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Fp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+zv(i.getShaderSource(e),o)}else return r}function Hv(i,e){let t=Gv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Vv={[Hh]:"Linear",[Vh]:"Reinhard",[Wh]:"Cineon",[Xa]:"ACESFilmic",[Xh]:"AgX",[jh]:"Neutral",[qh]:"Custom"};function Wv(i,e){let t=Vv[e];return t===void 0?(qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var _l=new k;function qv(){it.getLuminanceCoefficients(_l);let i=_l.x.toFixed(4),e=_l.y.toFixed(4),t=_l.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(so).join(`
`)}function jv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Kv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function so(i){return i!==""}function Up(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Op(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Yv=/^[ \t]*#include +<([\w\d./]+)>/gm;function vu(i){return i.replace(Yv,Zv)}var Jv=new Map;function Zv(i,e){let t=nt[e];if(t===void 0){let n=Jv.get(e);if(n!==void 0)t=nt[n],qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return vu(t)}var $v=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kp(i){return i.replace($v,Qv)}function Qv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bp(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var ey={[Is]:"SHADOWMAP_TYPE_PCF",[Ar]:"SHADOWMAP_TYPE_VSM"};function ty(i){return ey[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ny={[is]:"ENVMAP_TYPE_CUBE",[Ds]:"ENVMAP_TYPE_CUBE",[ja]:"ENVMAP_TYPE_CUBE_UV"};function iy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":ny[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var sy={[Ds]:"ENVMAP_MODE_REFRACTION"};function ry(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":sy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ay={[wc]:"ENVMAP_BLENDING_MULTIPLY",[Jf]:"ENVMAP_BLENDING_MIX",[Zf]:"ENVMAP_BLENDING_ADD"};function oy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":ay[i.combine]||"ENVMAP_BLENDING_NONE"}function cy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ly(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=ty(t),l=iy(t),u=ry(t),d=oy(t),h=cy(t),f=Xv(t),m=jv(r),_=s.createProgram(),g,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(so).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(so).join(`
`),p.length>0&&(p+=`
`)):(g=[Bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(so).join(`
`),p=[Bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?nt.tonemapping_pars_fragment:"",t.toneMapping!==Gn?Wv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,Hv("linearToOutputTexel",t.outputColorSpace),qv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(so).join(`
`)),a=vu(a),a=Up(a,t),a=Op(a,t),o=vu(o),o=Up(o,t),o=Op(o,t),a=kp(a),o=kp(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===iu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===iu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=S+g+a,x=S+p+o,E=Dp(s,s.VERTEX_SHADER,w),T=Dp(s,s.FRAGMENT_SHADER,x);s.attachShader(_,E),s.attachShader(_,T),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function P(C){if(i.debug.checkShaderErrors){let I=s.getProgramInfoLog(_)||"",W=s.getShaderInfoLog(E)||"",z=s.getShaderInfoLog(T)||"",G=I.trim(),oe=W.trim(),ce=z.trim(),xe=!0,j=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(xe=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,T);else{let he=Fp(s,E,"vertex"),fe=Fp(s,T,"fragment");Ye("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+G+`
`+he+`
`+fe)}else G!==""?qe("WebGLProgram: Program Info Log:",G):(oe===""||ce==="")&&(j=!1);j&&(C.diagnostics={runnable:xe,programLog:G,vertexShader:{log:oe,prefix:g},fragmentShader:{log:ce,prefix:p}})}s.deleteShader(E),s.deleteShader(T),v=new Fr(s,_),L=Kv(s,_)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let L;this.getAttributes=function(){return L===void 0&&P(this),L};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(_,kv)),F},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Bv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=T,this}var hy=0,yu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Mu(e),t.set(e,n)),n}},Mu=class{constructor(e){this.id=hy++,this.code=e,this.usedTimes=0}};function uy(i){return i===rs||i===$a||i===Qa}function dy(i,e,t,n,s,r){let a=new pa,o=new yu,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer,h=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(v){return c.add(v),v===0?"uv":`uv${v}`}function _(v,L,F,C,I,W){let z=C.fog,G=I.geometry,oe=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,ce=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,xe=e.get(v.envMap||oe,ce),j=xe&&xe.mapping===ja?xe.image.height:null,he=f[v.type];v.precision!==null&&(h=n.getMaxPrecision(v.precision),h!==v.precision&&qe("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));let fe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ie=fe!==void 0?fe.length:0,De=0;G.morphAttributes.position!==void 0&&(De=1),G.morphAttributes.normal!==void 0&&(De=2),G.morphAttributes.color!==void 0&&(De=3);let rt,Ze,Je,le;if(he){let _t=ri[he];rt=_t.vertexShader,Ze=_t.fragmentShader}else{rt=v.vertexShader,Ze=v.fragmentShader;let _t=o.getVertexShaderStage(v),ft=o.getFragmentShaderStage(v);o.update(v,_t,ft),Je=_t.id,le=ft.id}let me=i.getRenderTarget(),we=i.state.buffers.depth.getReversed(),Ve=I.isInstancedMesh===!0,Re=I.isBatchedMesh===!0,je=!!v.map,U=!!v.matcap,D=!!xe,R=!!v.aoMap,N=!!v.lightMap,H=!!v.bumpMap&&v.wireframe===!1,te=!!v.normalMap,_e=!!v.displacementMap,Z=!!v.emissiveMap,O=!!v.metalnessMap,K=!!v.roughnessMap,y=v.anisotropy>0,ee=v.clearcoat>0,re=v.dispersion>0,M=v.retroreflectivity>0,b=v.iridescence>0,B=v.sheen>0,V=v.transmission>0,$=y&&!!v.anisotropyMap,be=ee&&!!v.clearcoatMap,X=ee&&!!v.clearcoatNormalMap,Y=ee&&!!v.clearcoatRoughnessMap,q=b&&!!v.iridescenceMap,ge=b&&!!v.iridescenceThicknessMap,Te=B&&!!v.sheenColorMap,ve=B&&!!v.sheenRoughnessMap,Se=!!v.specularMap,Pe=!!v.specularColorMap,Le=!!v.specularIntensityMap,ze=V&&!!v.transmissionMap,Q=V&&!!v.thicknessMap,ye=!!v.gradientMap,pe=!!v.alphaMap,Me=v.alphaTest>0,Ce=!!v.alphaHash,de=!!v.extensions,Ae=Gn;v.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(Ae=i.toneMapping);let Ue={shaderID:he,shaderType:v.type,shaderName:v.name,vertexShader:rt,fragmentShader:Ze,defines:v.defines,customVertexShaderID:Je,customFragmentShaderID:le,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:Re,batchingColor:Re&&I._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&I.instanceColor!==null,instancingMorph:Ve&&I.morphTexture!==null,outputColorSpace:me===null?i.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:je,matcap:U,envMap:D,envMapMode:D&&xe.mapping,envMapCubeUVHeight:j,aoMap:R,lightMap:N,bumpMap:H,normalMap:te,displacementMap:_e,emissiveMap:Z,normalMapObjectSpace:te&&v.normalMapType===np,normalMapTangentSpace:te&&v.normalMapType===to,packedNormalMap:te&&v.normalMapType===to&&uy(v.normalMap.format),metalnessMap:O,roughnessMap:K,anisotropy:y,anisotropyMap:$,clearcoat:ee,clearcoatMap:be,clearcoatNormalMap:X,clearcoatRoughnessMap:Y,dispersion:re,retroreflection:M,iridescence:b,iridescenceMap:q,iridescenceThicknessMap:ge,sheen:B,sheenColorMap:Te,sheenRoughnessMap:ve,specularMap:Se,specularColorMap:Pe,specularIntensityMap:Le,transmission:V,transmissionMap:ze,thicknessMap:Q,gradientMap:ye,opaque:v.transparent===!1&&v.blending===Rr&&v.alphaToCoverage===!1,alphaMap:pe,alphaTest:Me,alphaHash:Ce,combine:v.combine,mapUv:je&&m(v.map.channel),aoMapUv:R&&m(v.aoMap.channel),lightMapUv:N&&m(v.lightMap.channel),bumpMapUv:H&&m(v.bumpMap.channel),normalMapUv:te&&m(v.normalMap.channel),displacementMapUv:_e&&m(v.displacementMap.channel),emissiveMapUv:Z&&m(v.emissiveMap.channel),metalnessMapUv:O&&m(v.metalnessMap.channel),roughnessMapUv:K&&m(v.roughnessMap.channel),anisotropyMapUv:$&&m(v.anisotropyMap.channel),clearcoatMapUv:be&&m(v.clearcoatMap.channel),clearcoatNormalMapUv:X&&m(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&m(v.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&m(v.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&m(v.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(v.sheenColorMap.channel),sheenRoughnessMapUv:ve&&m(v.sheenRoughnessMap.channel),specularMapUv:Se&&m(v.specularMap.channel),specularColorMapUv:Pe&&m(v.specularColorMap.channel),specularIntensityMapUv:Le&&m(v.specularIntensityMap.channel),transmissionMapUv:ze&&m(v.transmissionMap.channel),thicknessMapUv:Q&&m(v.thicknessMap.channel),alphaMapUv:pe&&m(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(te||y),vertexNormals:!!G.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!G.attributes.uv&&(je||pe),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||G.attributes.normal===void 0&&te===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:we,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:De,numSunLights:L.sun.length,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numSunLightShadows:L.sunShadowMap.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ae,decodeVideoTexture:je&&v.map.isVideoTexture===!0&&it.getTransfer(v.map.colorSpace)===mt,decodeVideoTextureEmissive:Z&&v.emissiveMap.isVideoTexture===!0&&it.getTransfer(v.emissiveMap.colorSpace)===mt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===rn,flipSided:v.side===Gt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:de&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(de&&v.extensions.multiDraw===!0||Re)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function g(v){let L=[];if(v.shaderID?L.push(v.shaderID):(L.push(v.customVertexShaderID),L.push(v.customFragmentShaderID)),v.defines!==void 0)for(let F in v.defines)L.push(F),L.push(v.defines[F]);return v.isRawShaderMaterial===!1&&(p(L,v),S(L,v),L.push(i.outputColorSpace)),L.push(v.customProgramCacheKey),L.join()}function p(v,L){v.push(L.precision),v.push(L.outputColorSpace),v.push(L.envMapMode),v.push(L.envMapCubeUVHeight),v.push(L.mapUv),v.push(L.alphaMapUv),v.push(L.lightMapUv),v.push(L.aoMapUv),v.push(L.bumpMapUv),v.push(L.normalMapUv),v.push(L.displacementMapUv),v.push(L.emissiveMapUv),v.push(L.metalnessMapUv),v.push(L.roughnessMapUv),v.push(L.anisotropyMapUv),v.push(L.clearcoatMapUv),v.push(L.clearcoatNormalMapUv),v.push(L.clearcoatRoughnessMapUv),v.push(L.iridescenceMapUv),v.push(L.iridescenceThicknessMapUv),v.push(L.sheenColorMapUv),v.push(L.sheenRoughnessMapUv),v.push(L.specularMapUv),v.push(L.specularColorMapUv),v.push(L.specularIntensityMapUv),v.push(L.transmissionMapUv),v.push(L.thicknessMapUv),v.push(L.combine),v.push(L.fogExp2),v.push(L.sizeAttenuation),v.push(L.morphTargetsCount),v.push(L.morphAttributeCount),v.push(L.numSunLights),v.push(L.numDirLights),v.push(L.numPointLights),v.push(L.numSpotLights),v.push(L.numSpotLightMaps),v.push(L.numHemiLights),v.push(L.numRectAreaLights),v.push(L.numSunLightShadows),v.push(L.numDirLightShadows),v.push(L.numPointLightShadows),v.push(L.numSpotLightShadows),v.push(L.numSpotLightShadowsWithMaps),v.push(L.numLightProbes),v.push(L.shadowMapType),v.push(L.toneMapping),v.push(L.numClippingPlanes),v.push(L.numClipIntersection),v.push(L.depthPacking)}function S(v,L){a.disableAll(),L.instancing&&a.enable(0),L.instancingColor&&a.enable(1),L.instancingMorph&&a.enable(2),L.matcap&&a.enable(3),L.envMap&&a.enable(4),L.normalMapObjectSpace&&a.enable(5),L.normalMapTangentSpace&&a.enable(6),L.clearcoat&&a.enable(7),L.iridescence&&a.enable(8),L.alphaTest&&a.enable(9),L.vertexColors&&a.enable(10),L.vertexAlphas&&a.enable(11),L.vertexUv1s&&a.enable(12),L.vertexUv2s&&a.enable(13),L.vertexUv3s&&a.enable(14),L.vertexTangents&&a.enable(15),L.anisotropy&&a.enable(16),L.alphaHash&&a.enable(17),L.batching&&a.enable(18),L.dispersion&&a.enable(19),L.retroreflection&&a.enable(24),L.batchingColor&&a.enable(20),L.gradientMap&&a.enable(21),L.packedNormalMap&&a.enable(22),L.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),L.fog&&a.enable(0),L.useFog&&a.enable(1),L.flatShading&&a.enable(2),L.logarithmicDepthBuffer&&a.enable(3),L.reversedDepthBuffer&&a.enable(4),L.skinning&&a.enable(5),L.morphTargets&&a.enable(6),L.morphNormals&&a.enable(7),L.morphColors&&a.enable(8),L.premultipliedAlpha&&a.enable(9),L.shadowMapEnabled&&a.enable(10),L.doubleSided&&a.enable(11),L.flipSided&&a.enable(12),L.useDepthPacking&&a.enable(13),L.dithering&&a.enable(14),L.transmission&&a.enable(15),L.sheen&&a.enable(16),L.opaque&&a.enable(17),L.pointsUvs&&a.enable(18),L.decodeVideoTexture&&a.enable(19),L.decodeVideoTextureEmissive&&a.enable(20),L.alphaToCoverage&&a.enable(21),L.numLightProbeGrids>0&&a.enable(22),L.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function w(v){let L=f[v.type],F;if(L){let C=ri[L];F=vp.clone(C.uniforms)}else F=v.uniforms;return F}function x(v,L){let F=u.get(L);return F!==void 0?++F.usedTimes:(F=new ly(i,L,v,s),l.push(F),u.set(L,F)),F}function E(v){if(--v.usedTimes===0){let L=l.indexOf(v);l[L]=l[l.length-1],l.pop(),u.delete(v.cacheKey),v.destroy()}}function T(v){o.remove(v)}function P(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:w,acquireProgram:x,releaseProgram:E,releaseShaderCache:T,programs:l,dispose:P}}function fy(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function py(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function zp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Gp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,m,_,g,p){let S=i[e];return S===void 0?(S={id:h.id,object:h,geometry:f,material:m,materialVariant:a(h),groupOrder:_,renderOrder:h.renderOrder,z:g,group:p},i[e]=S):(S.id=h.id,S.object=h,S.geometry=f,S.material=m,S.materialVariant=a(h),S.groupOrder=_,S.renderOrder=h.renderOrder,S.z=g,S.group=p),e++,S}function c(h,f,m,_,g,p,S){S.reversedDepth===!0&&(g=-g);let w=o(h,f,m,_,g,p);m.transmission>0?n.push(w):m.transparent===!0?s.push(w):t.push(w)}function l(h,f,m,_,g,p){let S=o(h,f,m,_,g,p);m.transmission>0?n.unshift(S):m.transparent===!0?s.unshift(S):t.unshift(S)}function u(h,f){t.length>1&&t.sort(h||py),n.length>1&&n.sort(f||zp),s.length>1&&s.sort(f||zp)}function d(){for(let h=e,f=i.length;h<f;h++){let m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:u}}function my(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Gp,i.set(n,[a])):s>=r.length?(a=new Gp,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function gy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new k,color:new Xe};break;case"SpotLight":t={position:new k,direction:new k,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new k,halfWidth:new k,halfHeight:new k};break}return i[e.id]=t,t}}}function by(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var xy=0;function _y(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function vy(i){let e=new gy,t=by(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new k);let s=new k,r=new et,a=new et;function o(l){let u=0,d=0,h=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,S=0,w=0,x=0,E=0,T=0,P=0,v=0,L=0,F=0;l.sort(_y);for(let I=0,W=l.length;I<W;I++){let z=l[I],G=z.color,oe=z.intensity,ce=z.distance,xe=null;if(z.shadow&&z.shadow.map&&(z.shadow.map.texture.format===rs?xe=z.shadow.map.texture:xe=z.shadow.map.depthTexture||z.shadow.map.texture),z.isAmbientLight)u+=G.r*oe,d+=G.g*oe,h+=G.b*oe;else if(z.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(z.sh.coefficients[j],oe);F++}else if(z.isSunLight){let j=e.get(z);if(j.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){let he=z.shadow,fe=t.get(z);fe.shadowIntensity=he.intensity,fe.shadowBias=he.bias,fe.shadowNormalBias=he.normalBias,fe.shadowRadius=he.radius,fe.shadowMapSize.copy(he.mapSize).multiply(he.getFrameExtents()),n.sunShadow[m]=fe,n.sunShadowMap[m]=xe;let Ie=he.getViewportCount();for(let De=0;De<Ie;De++)n.sunShadowMatrix[_+De]=he.getMatrix(De),n.sunShadowCascade[_+De]=he._cascadeData[De];_+=Ie,m++}n.sun[f]=j,f++}else if(z.isDirectionalLight){let j=e.get(z);if(j.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){let he=z.shadow,fe=t.get(z);fe.shadowIntensity=he.intensity,fe.shadowBias=he.bias,fe.shadowNormalBias=he.normalBias,fe.shadowRadius=he.radius,fe.shadowMapSize=he.mapSize,n.directionalShadow[g]=fe,n.directionalShadowMap[g]=xe,n.directionalShadowMatrix[g]=z.shadow.matrix,E++}n.directional[g]=j,g++}else if(z.isSpotLight){let j=e.get(z);j.position.setFromMatrixPosition(z.matrixWorld),j.color.copy(G).multiplyScalar(oe),j.distance=ce,j.coneCos=Math.cos(z.angle),j.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),j.decay=z.decay,n.spot[S]=j;let he=z.shadow;if(z.map&&(n.spotLightMap[v]=z.map,v++,he.updateMatrices(z),z.castShadow&&L++),n.spotLightMatrix[S]=he.matrix,z.castShadow){let fe=t.get(z);fe.shadowIntensity=he.intensity,fe.shadowBias=he.bias,fe.shadowNormalBias=he.normalBias,fe.shadowRadius=he.radius,fe.shadowMapSize=he.mapSize,n.spotShadow[S]=fe,n.spotShadowMap[S]=xe,P++}S++}else if(z.isRectAreaLight){let j=e.get(z);j.color.copy(G).multiplyScalar(oe),j.halfWidth.set(z.width*.5,0,0),j.halfHeight.set(0,z.height*.5,0),n.rectArea[w]=j,w++}else if(z.isPointLight){let j=e.get(z);if(j.color.copy(z.color).multiplyScalar(z.intensity),j.distance=z.distance,j.decay=z.decay,z.castShadow){let he=z.shadow,fe=t.get(z);fe.shadowIntensity=he.intensity,fe.shadowBias=he.bias,fe.shadowNormalBias=he.normalBias,fe.shadowRadius=he.radius,fe.shadowMapSize=he.mapSize,fe.shadowCameraNear=he.camera.near,fe.shadowCameraFar=he.camera.far,n.pointShadow[p]=fe,n.pointShadowMap[p]=xe,n.pointShadowMatrix[p]=z.shadow.matrix,T++}n.point[p]=j,p++}else if(z.isHemisphereLight){let j=e.get(z);j.skyColor.copy(z.color).multiplyScalar(oe),j.groundColor.copy(z.groundColor).multiplyScalar(oe),n.hemi[x]=j,x++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ne.LTC_FLOAT_1,n.rectAreaLTC2=Ne.LTC_FLOAT_2):(n.rectAreaLTC1=Ne.LTC_HALF_1,n.rectAreaLTC2=Ne.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let C=n.hash;(C.sunLength!==f||C.directionalLength!==g||C.pointLength!==p||C.spotLength!==S||C.rectAreaLength!==w||C.hemiLength!==x||C.numSunShadows!==m||C.numDirectionalShadows!==E||C.numPointShadows!==T||C.numSpotShadows!==P||C.numSpotMaps!==v||C.numLightProbes!==F)&&(n.sun.length=f,n.directional.length=g,n.spot.length=S,n.rectArea.length=w,n.point.length=p,n.hemi.length=x,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+v-L,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=F,C.sunLength=f,C.directionalLength=g,C.pointLength=p,C.spotLength=S,C.rectAreaLength=w,C.hemiLength=x,C.numSunShadows=m,C.numDirectionalShadows=E,C.numPointShadows=T,C.numSpotShadows=P,C.numSpotMaps=v,C.numLightProbes=F,n.version=xy++)}function c(l,u){let d=0,h=0,f=0,m=0,_=0,g=0,p=u.matrixWorldInverse;for(let S=0,w=l.length;S<w;S++){let x=l[S];if(x.isSunLight){let E=n.sun[d];E.direction.setFromMatrixPosition(x.matrixWorld),E.direction.transformDirection(p),d++}else if(x.isDirectionalLight){let E=n.directional[h];E.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),h++}else if(x.isSpotLight){let E=n.spot[m];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),m++}else if(x.isRectAreaLight){let E=n.rectArea[_];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),a.identity(),r.copy(x.matrixWorld),r.premultiply(p),a.extractRotation(r),E.halfWidth.set(x.width*.5,0,0),E.halfHeight.set(0,x.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){let E=n.point[f];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){let E=n.hemi[g];E.direction.setFromMatrixPosition(x.matrixWorld),E.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:n}}function Hp(i){let e=new vy(i),t=[],n=[],s=[];function r(h){d.camera=h,t.length=0,n.length=0,s.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function c(h){s.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function yy(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Hp(i),e.set(s,[o])):r>=a.length?(o=new Hp(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var My=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ey=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],Ty=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],Vp=new et,io=new k,mu=new k;function wy(i,e,t){let n=new _r,s=new Ee,r=new Ee,a=new bt,o=new pc,c=new mc,l={},u=t.maxTextureSize,d={[ni]:Gt,[Gt]:ni,[rn]:rn},h=new sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:My,fragmentShader:Sy}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let m=new xt;m.setAttribute("position",new Rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ct(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Is;let p=this.type;this.render=function(T,P,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===If&&(qe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Is);let L=i.getRenderTarget(),F=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),I=i.state;I.setBlending(ii),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let W=p!==this.type;W&&P.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(G=>G.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,G=T.length;z<G;z++){let oe=T[z],ce=oe.shadow;if(ce===void 0){qe("WebGLShadowMap:",oe,"has no shadow.");continue}if(ce.autoUpdate===!1&&ce.needsUpdate===!1)continue;s.copy(ce.mapSize);let xe=ce.getFrameExtents();s.multiply(xe),r.copy(ce.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/xe.x),s.x=r.x*xe.x,ce.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/xe.y),s.y=r.y*xe.y,ce.mapSize.y=r.y));let j=i.state.buffers.depth.getReversed();if(ce.camera._reversedDepth=j,ce.map===null||W===!0){if(ce.map!==null&&(ce.map.depthTexture!==null&&(ce.map.depthTexture.dispose(),ce.map.depthTexture=null),ce.map.dispose()),this.type===Ar){if(oe.isPointLight){qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}ce.map=new un(s.x,s.y,{format:rs,type:Wn,minFilter:Ft,magFilter:Ft,generateMipmaps:!1}),ce.map.texture.name=oe.name+".shadowMap",ce.map.depthTexture=new Zi(s.x,s.y,yn),ce.map.depthTexture.name=oe.name+".shadowMapDepth",ce.map.depthTexture.format=$n,ce.map.depthTexture.compareFunction=null,ce.map.depthTexture.minFilter=Nt,ce.map.depthTexture.magFilter=Nt}else oe.isPointLight?(ce.map=new vl(s.x),ce.map.depthTexture=new oc(s.x,Vn)):(ce.map=new un(s.x,s.y),ce.map.depthTexture=new Zi(s.x,s.y,Vn)),ce.map.depthTexture.name=oe.name+".shadowMap",ce.map.depthTexture.format=$n,this.type===Is?(ce.map.depthTexture.compareFunction=j?bl:gl,ce.map.depthTexture.minFilter=Ft,ce.map.depthTexture.magFilter=Ft):(ce.map.depthTexture.compareFunction=null,ce.map.depthTexture.minFilter=Nt,ce.map.depthTexture.magFilter=Nt);ce.camera.updateProjectionMatrix()}ce.map.isWebGLCubeRenderTarget!==!0&&(ce.map.width!==s.x||ce.map.height!==s.y)&&ce.map.setSize(s.x,s.y);let he=ce.map.isWebGLCubeRenderTarget?6:ce.getViewportCount();oe.isPointLight!==!0&&ce.updateMatrices(oe,v);for(let fe=0;fe<he;fe++){let Ie=ce.getCamera(fe);if(oe.isPointLight){let De=ce.camera,rt=ce.matrix,Ze=oe.distance||De.far;Ze!==De.far&&(De.far=Ze,De.updateProjectionMatrix()),io.setFromMatrixPosition(oe.matrixWorld),De.position.copy(io),mu.copy(De.position),mu.add(Ey[fe]),De.up.copy(Ty[fe]),De.lookAt(mu),De.updateMatrixWorld(),rt.makeTranslation(-io.x,-io.y,-io.z),Vp.multiplyMatrices(De.projectionMatrix,De.matrixWorldInverse),ce._frustum.setFromProjectionMatrix(Vp,De.coordinateSystem,De.reversedDepth)}if(ce.map.isWebGLCubeRenderTarget)i.setRenderTarget(ce.map,fe),i.clear();else{fe===0&&(i.setRenderTarget(ce.map),i.clear());let De=ce.getViewport(fe);a.set(r.x*De.x,r.y*De.y,r.x*De.z,r.y*De.w),I.viewport(a)}n=ce.getFrustum(fe),x(P,v,Ie,oe,this.type)}ce.isPointLightShadow!==!0&&this.type===Ar&&S(ce,v),ce.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(L,F,C)};function S(T,P){let v=e.update(_);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new un(s.x,s.y,{format:rs,type:Wn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value.set(T.map.width,T.map.height),h.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(P,null,v,h,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(P,null,v,f,_,null)}function w(T,P,v,L){let F=null,C=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)F=C;else if(F=v.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let I=F.uuid,W=P.uuid,z=l[I];z===void 0&&(z={},l[I]=z);let G=z[W];G===void 0&&(G=F.clone(),z[W]=G,P.addEventListener("dispose",E)),F=G}if(F.visible=P.visible,F.wireframe=P.wireframe,L===Ar?F.side=P.shadowSide!==null?P.shadowSide:P.side:F.side=P.shadowSide!==null?P.shadowSide:d[P.side],F.alphaMap=P.alphaMap,F.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,F.map=P.map,F.clipShadows=P.clipShadows,F.clippingPlanes=P.clippingPlanes,F.clipIntersection=P.clipIntersection,F.displacementMap=P.displacementMap,F.displacementScale=P.displacementScale,F.displacementBias=P.displacementBias,F.wireframeLinewidth=P.wireframeLinewidth,F.linewidth=P.linewidth,v.isPointLight===!0&&F.isMeshDistanceMaterial===!0){let I=i.properties.get(F);I.light=v}return F}function x(T,P,v,L,F){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&F===Ar)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);let W=e.update(T),z=T.material;if(Array.isArray(z)){let G=W.groups;for(let oe=0,ce=G.length;oe<ce;oe++){let xe=G[oe],j=z[xe.materialIndex];if(j&&j.visible){let he=w(T,j,L,F);T.onBeforeShadow(i,T,P,v,W,he,xe),i.renderBufferDirect(v,null,W,he,T,xe),T.onAfterShadow(i,T,P,v,W,he,xe)}}}else if(z.visible){let G=w(T,z,L,F);T.onBeforeShadow(i,T,P,v,W,G,null),i.renderBufferDirect(v,null,W,G,T,null),T.onAfterShadow(i,T,P,v,W,G,null)}}let I=T.children;for(let W=0,z=I.length;W<z;W++)x(I[W],P,v,L,F)}function E(T){T.target.removeEventListener("dispose",E);for(let v in l){let L=l[v],F=T.target.uuid;F in L&&(L[F].dispose(),delete L[F])}}}function Ay(i,e){function t(){let Q=!1,ye=new bt,pe=null,Me=new bt(0,0,0,0);return{setMask:function(Ce){pe!==Ce&&!Q&&(i.colorMask(Ce,Ce,Ce,Ce),pe=Ce)},setLocked:function(Ce){Q=Ce},setClear:function(Ce,de,Ae,Ue,_t){_t===!0&&(Ce*=Ue,de*=Ue,Ae*=Ue),ye.set(Ce,de,Ae,Ue),Me.equals(ye)===!1&&(i.clearColor(Ce,de,Ae,Ue),Me.copy(ye))},reset:function(){Q=!1,pe=null,Me.set(-1,0,0,0)}}}function n(){let Q=!1,ye=!1,pe=null,Me=null,Ce=null;return{setReversed:function(de){if(ye!==de){let Ae=e.get("EXT_clip_control");de?Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.ZERO_TO_ONE_EXT):Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.NEGATIVE_ONE_TO_ONE_EXT),ye=de;let Ue=Ce;Ce=null,this.setClear(Ue)}},getReversed:function(){return ye},setTest:function(de){de?me(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(de){pe!==de&&!Q&&(i.depthMask(de),pe=de)},setFunc:function(de){if(ye&&(de=fp[de]),Me!==de){switch(de){case Yo:i.depthFunc(i.NEVER);break;case Jo:i.depthFunc(i.ALWAYS);break;case Zo:i.depthFunc(i.LESS);break;case lr:i.depthFunc(i.LEQUAL);break;case $o:i.depthFunc(i.EQUAL);break;case Qo:i.depthFunc(i.GEQUAL);break;case ec:i.depthFunc(i.GREATER);break;case tc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Me=de}},setLocked:function(de){Q=de},setClear:function(de){Ce!==de&&(Ce=de,ye&&(de=1-de),i.clearDepth(de))},reset:function(){Q=!1,pe=null,Me=null,Ce=null,ye=!1}}}function s(){let Q=!1,ye=null,pe=null,Me=null,Ce=null,de=null,Ae=null,Ue=null,_t=null;return{setTest:function(ft){Q||(ft?me(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(ft){ye!==ft&&!Q&&(i.stencilMask(ft),ye=ft)},setFunc:function(ft,Dn,Xn){(pe!==ft||Me!==Dn||Ce!==Xn)&&(i.stencilFunc(ft,Dn,Xn),pe=ft,Me=Dn,Ce=Xn)},setOp:function(ft,Dn,Xn){(de!==ft||Ae!==Dn||Ue!==Xn)&&(i.stencilOp(ft,Dn,Xn),de=ft,Ae=Dn,Ue=Xn)},setLocked:function(ft){Q=ft},setClear:function(ft){_t!==ft&&(i.clearStencil(ft),_t=ft)},reset:function(){Q=!1,ye=null,pe=null,Me=null,Ce=null,de=null,Ae=null,Ue=null,_t=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,u={},d={},h={},f=new WeakMap,m=[],_=null,g=!1,p=null,S=null,w=null,x=null,E=null,T=null,P=null,v=new Xe(0,0,0),L=0,F=!1,C=null,I=null,W=null,z=null,G=null,oe=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ce=!1,xe=0,j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(xe=parseFloat(/^WebGL (\d)/.exec(j)[1]),ce=xe>=1):j.indexOf("OpenGL ES")!==-1&&(xe=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),ce=xe>=2);let he=null,fe={},Ie=i.getParameter(i.SCISSOR_BOX),De=i.getParameter(i.VIEWPORT),rt=new bt().fromArray(Ie),Ze=new bt().fromArray(De);function Je(Q,ye,pe,Me){let Ce=new Uint8Array(4),de=i.createTexture();i.bindTexture(Q,de),i.texParameteri(Q,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(Q,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ae=0;Ae<pe;Ae++)Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?i.texImage3D(ye,0,i.RGBA,1,1,Me,0,i.RGBA,i.UNSIGNED_BYTE,Ce):i.texImage2D(ye+Ae,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ce);return de}let le={};le[i.TEXTURE_2D]=Je(i.TEXTURE_2D,i.TEXTURE_2D,1),le[i.TEXTURE_CUBE_MAP]=Je(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[i.TEXTURE_2D_ARRAY]=Je(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),le[i.TEXTURE_3D]=Je(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),me(i.DEPTH_TEST),a.setFunc(lr),H(!1),te(Fh),me(i.CULL_FACE),R(ii);function me(Q){u[Q]!==!0&&(i.enable(Q),u[Q]=!0)}function we(Q){u[Q]!==!1&&(i.disable(Q),u[Q]=!1)}function Ve(Q,ye){return h[Q]!==ye?(i.bindFramebuffer(Q,ye),h[Q]=ye,Q===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ye),Q===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ye),!0):!1}function Re(Q,ye){let pe=m,Me=!1;if(Q){pe=f.get(ye),pe===void 0&&(pe=[],f.set(ye,pe));let Ce=Q.textures;if(pe.length!==Ce.length||pe[0]!==i.COLOR_ATTACHMENT0){for(let de=0,Ae=Ce.length;de<Ae;de++)pe[de]=i.COLOR_ATTACHMENT0+de;pe.length=Ce.length,Me=!0}}else pe[0]!==i.BACK&&(pe[0]=i.BACK,Me=!0);Me&&i.drawBuffers(pe)}function je(Q){return _!==Q?(i.useProgram(Q),_=Q,!0):!1}let U={[Ls]:i.FUNC_ADD,[Df]:i.FUNC_SUBTRACT,[Nf]:i.FUNC_REVERSE_SUBTRACT};U[Ff]=i.MIN,U[Uf]=i.MAX;let D={[Of]:i.ZERO,[kf]:i.ONE,[Bf]:i.SRC_COLOR,[zh]:i.SRC_ALPHA,[qf]:i.SRC_ALPHA_SATURATE,[Vf]:i.DST_COLOR,[Gf]:i.DST_ALPHA,[zf]:i.ONE_MINUS_SRC_COLOR,[Gh]:i.ONE_MINUS_SRC_ALPHA,[Wf]:i.ONE_MINUS_DST_COLOR,[Hf]:i.ONE_MINUS_DST_ALPHA,[Xf]:i.CONSTANT_COLOR,[jf]:i.ONE_MINUS_CONSTANT_COLOR,[Kf]:i.CONSTANT_ALPHA,[Yf]:i.ONE_MINUS_CONSTANT_ALPHA};function R(Q,ye,pe,Me,Ce,de,Ae,Ue,_t,ft){if(Q===ii){g===!0&&(we(i.BLEND),g=!1);return}if(g===!1&&(me(i.BLEND),g=!0),Q!==Lf){if(Q!==p||ft!==F){if((S!==Ls||E!==Ls)&&(i.blendEquation(i.FUNC_ADD),S=Ls,E=Ls),ft)switch(Q){case Rr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oh:i.blendFunc(i.ONE,i.ONE);break;case kh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ye("WebGLState: Invalid blending: ",Q);break}else switch(Q){case Rr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case kh:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bh:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",Q);break}w=null,x=null,T=null,P=null,v.set(0,0,0),L=0,p=Q,F=ft}return}Ce=Ce||ye,de=de||pe,Ae=Ae||Me,(ye!==S||Ce!==E)&&(i.blendEquationSeparate(U[ye],U[Ce]),S=ye,E=Ce),(pe!==w||Me!==x||de!==T||Ae!==P)&&(i.blendFuncSeparate(D[pe],D[Me],D[de],D[Ae]),w=pe,x=Me,T=de,P=Ae),(Ue.equals(v)===!1||_t!==L)&&(i.blendColor(Ue.r,Ue.g,Ue.b,_t),v.copy(Ue),L=_t),p=Q,F=!1}function N(Q,ye){Q.side===rn?we(i.CULL_FACE):me(i.CULL_FACE);let pe=Q.side===Gt;ye&&(pe=!pe),H(pe),Q.blending===Rr&&Q.transparent===!1?R(ii):R(Q.blending,Q.blendEquation,Q.blendSrc,Q.blendDst,Q.blendEquationAlpha,Q.blendSrcAlpha,Q.blendDstAlpha,Q.blendColor,Q.blendAlpha,Q.premultipliedAlpha),a.setFunc(Q.depthFunc),a.setTest(Q.depthTest),a.setMask(Q.depthWrite),r.setMask(Q.colorWrite);let Me=Q.stencilWrite;o.setTest(Me),Me&&(o.setMask(Q.stencilWriteMask),o.setFunc(Q.stencilFunc,Q.stencilRef,Q.stencilFuncMask),o.setOp(Q.stencilFail,Q.stencilZFail,Q.stencilZPass)),Z(Q.polygonOffset,Q.polygonOffsetFactor,Q.polygonOffsetUnits),Q.alphaToCoverage===!0?me(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function H(Q){C!==Q&&(Q?i.frontFace(i.CW):i.frontFace(i.CCW),C=Q)}function te(Q){Q!==Cf?(me(i.CULL_FACE),Q!==I&&(Q===Fh?i.cullFace(i.BACK):Q===Pf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),I=Q}function _e(Q){Q!==W&&(ce&&i.lineWidth(Q),W=Q)}function Z(Q,ye,pe){Q?(me(i.POLYGON_OFFSET_FILL),(z!==ye||G!==pe)&&(z=ye,G=pe,a.getReversed()&&(ye=-ye),i.polygonOffset(ye,pe))):we(i.POLYGON_OFFSET_FILL)}function O(Q){Q?me(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function K(Q){Q===void 0&&(Q=i.TEXTURE0+oe-1),he!==Q&&(i.activeTexture(Q),he=Q)}function y(Q,ye,pe){pe===void 0&&(he===null?pe=i.TEXTURE0+oe-1:pe=he);let Me=fe[pe];Me===void 0&&(Me={type:void 0,texture:void 0},fe[pe]=Me),(Me.type!==Q||Me.texture!==ye)&&(he!==pe&&(i.activeTexture(pe),he=pe),i.bindTexture(Q,ye||le[Q]),Me.type=Q,Me.texture=ye)}function ee(){let Q=fe[he];Q!==void 0&&Q.type!==void 0&&(i.bindTexture(Q.type,null),Q.type=void 0,Q.texture=void 0)}function re(){try{i.compressedTexImage2D(...arguments)}catch(Q){Ye("WebGLState:",Q)}}function M(){try{i.compressedTexImage3D(...arguments)}catch(Q){Ye("WebGLState:",Q)}}function b(){try{i.texSubImage2D(...arguments)}catch(Q){Ye("WebGLState:",Q)}}function B(){try{i.texSubImage3D(...arguments)}catch(Q){Ye("WebGLState:",Q)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(Q){Ye("WebGLState:",Q)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(Q){Ye("WebGLState:",Q)}}function be(){try{i.texStorage2D(...arguments)}catch(Q){Ye("WebGLState:",Q)}}function X(){try{i.texStorage3D(...arguments)}catch(Q){Ye("WebGLState:",Q)}}function Y(){try{i.texImage2D(...arguments)}catch(Q){Ye("WebGLState:",Q)}}function q(){try{i.texImage3D(...arguments)}catch(Q){Ye("WebGLState:",Q)}}function ge(Q){return d[Q]!==void 0?d[Q]:i.getParameter(Q)}function Te(Q,ye){d[Q]!==ye&&(i.pixelStorei(Q,ye),d[Q]=ye)}function ve(Q){rt.equals(Q)===!1&&(i.scissor(Q.x,Q.y,Q.z,Q.w),rt.copy(Q))}function Se(Q){Ze.equals(Q)===!1&&(i.viewport(Q.x,Q.y,Q.z,Q.w),Ze.copy(Q))}function Pe(Q,ye){let pe=l.get(ye);pe===void 0&&(pe=new WeakMap,l.set(ye,pe));let Me=pe.get(Q);Me===void 0&&(Me=i.getUniformBlockIndex(ye,Q.name),pe.set(Q,Me))}function Le(Q,ye){let Me=l.get(ye).get(Q);c.get(ye)!==Me&&(i.uniformBlockBinding(ye,Me,Q.__bindingPointIndex),c.set(ye,Me))}function ze(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},he=null,fe={},h={},f=new WeakMap,m=[],_=null,g=!1,p=null,S=null,w=null,x=null,E=null,T=null,P=null,v=new Xe(0,0,0),L=0,F=!1,C=null,I=null,W=null,z=null,G=null,rt.set(0,0,i.canvas.width,i.canvas.height),Ze.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:me,disable:we,bindFramebuffer:Ve,drawBuffers:Re,useProgram:je,setBlending:R,setMaterial:N,setFlipSided:H,setCullFace:te,setLineWidth:_e,setPolygonOffset:Z,setScissorTest:O,activeTexture:K,bindTexture:y,unbindTexture:ee,compressedTexImage2D:re,compressedTexImage3D:M,texImage2D:Y,texImage3D:q,pixelStorei:Te,getParameter:ge,updateUBOMapping:Pe,uniformBlockBinding:Le,texStorage2D:be,texStorage3D:X,texSubImage2D:b,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:$,scissor:ve,viewport:Se,reset:ze}}function Ry(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ee,u=new WeakMap,d=new Set,h,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(M,b){return m?new OffscreenCanvas(M,b):dr("canvas")}function g(M,b,B){let V=1,$=re(M);if(($.width>B||$.height>B)&&(V=B/Math.max($.width,$.height)),V<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){let be=Math.floor(V*$.width),X=Math.floor(V*$.height);h===void 0&&(h=_(be,X));let Y=b?_(be,X):h;return Y.width=be,Y.height=X,Y.getContext("2d").drawImage(M,0,0,be,X),qe("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+be+"x"+X+")."),Y}else return"data"in M&&qe("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),M;return M}function p(M){return M.generateMipmaps}function S(M){i.generateMipmap(M)}function w(M){return M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?i.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(M,b,B,V,$,be=!1){if(M!==null){if(i[M]!==void 0)return i[M];qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let X;V&&(X=e.get("EXT_texture_norm16"),X||qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=b;if(b===i.RED&&(B===i.FLOAT&&(Y=i.R32F),B===i.HALF_FLOAT&&(Y=i.R16F),B===i.UNSIGNED_BYTE&&(Y=i.R8),B===i.UNSIGNED_SHORT&&X&&(Y=X.R16_EXT),B===i.SHORT&&X&&(Y=X.R16_SNORM_EXT)),b===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.R8UI),B===i.UNSIGNED_SHORT&&(Y=i.R16UI),B===i.UNSIGNED_INT&&(Y=i.R32UI),B===i.BYTE&&(Y=i.R8I),B===i.SHORT&&(Y=i.R16I),B===i.INT&&(Y=i.R32I)),b===i.RG&&(B===i.FLOAT&&(Y=i.RG32F),B===i.HALF_FLOAT&&(Y=i.RG16F),B===i.UNSIGNED_BYTE&&(Y=i.RG8),B===i.UNSIGNED_SHORT&&X&&(Y=X.RG16_EXT),B===i.SHORT&&X&&(Y=X.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RG8UI),B===i.UNSIGNED_SHORT&&(Y=i.RG16UI),B===i.UNSIGNED_INT&&(Y=i.RG32UI),B===i.BYTE&&(Y=i.RG8I),B===i.SHORT&&(Y=i.RG16I),B===i.INT&&(Y=i.RG32I)),b===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),B===i.UNSIGNED_INT&&(Y=i.RGB32UI),B===i.BYTE&&(Y=i.RGB8I),B===i.SHORT&&(Y=i.RGB16I),B===i.INT&&(Y=i.RGB32I)),b===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),B===i.UNSIGNED_INT&&(Y=i.RGBA32UI),B===i.BYTE&&(Y=i.RGBA8I),B===i.SHORT&&(Y=i.RGBA16I),B===i.INT&&(Y=i.RGBA32I)),b===i.RGB&&(B===i.UNSIGNED_SHORT&&X&&(Y=X.RGB16_EXT),B===i.SHORT&&X&&(Y=X.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),b===i.RGBA){let q=be?ua:it.getTransfer($);B===i.FLOAT&&(Y=i.RGBA32F),B===i.HALF_FLOAT&&(Y=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Y=q===mt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&X&&(Y=X.RGBA16_EXT),B===i.SHORT&&X&&(Y=X.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function E(M,b){let B;return M?b===null||b===Vn||b===Ir?B=i.DEPTH24_STENCIL8:b===yn?B=i.DEPTH32F_STENCIL8:b===Pr&&(B=i.DEPTH24_STENCIL8,qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Vn||b===Ir?B=i.DEPTH_COMPONENT24:b===yn?B=i.DEPTH_COMPONENT32F:b===Pr&&(B=i.DEPTH_COMPONENT16),B}function T(M,b){return p(M)===!0||M.isFramebufferTexture&&M.minFilter!==Nt&&M.minFilter!==Ft?Math.log2(Math.max(b.width,b.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?b.mipmaps.length:1}function P(M){let b=M.target;b.removeEventListener("dispose",P),L(b),b.isVideoTexture&&u.delete(b),b.isHTMLTexture&&d.delete(b)}function v(M){let b=M.target;b.removeEventListener("dispose",v),C(b)}function L(M){let b=n.get(M);if(b.__webglInit===void 0)return;let B=M.source,V=f.get(B);if(V){let $=V[b.__cacheKey];$.usedTimes--,$.usedTimes===0&&F(M),Object.keys(V).length===0&&f.delete(B)}n.remove(M)}function F(M){let b=n.get(M);i.deleteTexture(b.__webglTexture);let B=M.source,V=f.get(B);delete V[b.__cacheKey],a.memory.textures--}function C(M){let b=n.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),n.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(b.__webglFramebuffer[V]))for(let $=0;$<b.__webglFramebuffer[V].length;$++)i.deleteFramebuffer(b.__webglFramebuffer[V][$]);else i.deleteFramebuffer(b.__webglFramebuffer[V]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[V])}else{if(Array.isArray(b.__webglFramebuffer))for(let V=0;V<b.__webglFramebuffer.length;V++)i.deleteFramebuffer(b.__webglFramebuffer[V]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let V=0;V<b.__webglColorRenderbuffer.length;V++)b.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[V]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let B=M.textures;for(let V=0,$=B.length;V<$;V++){let be=n.get(B[V]);be.__webglTexture&&(i.deleteTexture(be.__webglTexture),a.memory.textures--),n.remove(B[V])}n.remove(M)}let I=0;function W(){I=0}function z(){return I}function G(M){I=M}function oe(){let M=I;return M>=s.maxTextures&&qe("WebGLTextures: Trying to use "+(M+1)+" texture units while this GPU supports only "+s.maxTextures),I+=1,M}function ce(M){let b=[];return b.push(M.wrapS),b.push(M.wrapT),b.push(M.wrapR||0),b.push(M.magFilter),b.push(M.minFilter),b.push(M.anisotropy),b.push(M.internalFormat),b.push(M.format),b.push(M.type),b.push(M.generateMipmaps),b.push(M.premultiplyAlpha),b.push(M.flipY),b.push(M.unpackAlignment),b.push(M.colorSpace),b.join()}function xe(M,b){let B=n.get(M);if(M.isVideoTexture&&y(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&B.__version!==M.version){let V=M.image;if(V===null)qe("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)qe("WebGLRenderer: Texture marked for update but image is incomplete");else{we(B,M,b);return}}else M.isExternalTexture&&(B.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+b)}function j(M,b){let B=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&B.__version!==M.version){we(B,M,b);return}else M.isExternalTexture&&(B.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+b)}function he(M,b){let B=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&B.__version!==M.version){we(B,M,b);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+b)}function fe(M,b){let B=n.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&B.__version!==M.version){Ve(B,M,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+b)}let Ie={[Zn]:i.REPEAT,[Tn]:i.CLAMP_TO_EDGE,[hr]:i.MIRRORED_REPEAT},De={[Nt]:i.NEAREST,[Cc]:i.NEAREST_MIPMAP_NEAREST,[Ns]:i.NEAREST_MIPMAP_LINEAR,[Ft]:i.LINEAR,[Cr]:i.LINEAR_MIPMAP_NEAREST,[Hn]:i.LINEAR_MIPMAP_LINEAR},rt={[sp]:i.NEVER,[lp]:i.ALWAYS,[rp]:i.LESS,[gl]:i.LEQUAL,[ap]:i.EQUAL,[bl]:i.GEQUAL,[op]:i.GREATER,[cp]:i.NOTEQUAL};function Ze(M,b){if(b.type===yn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Ft||b.magFilter===Cr||b.magFilter===Ns||b.magFilter===Hn||b.minFilter===Ft||b.minFilter===Cr||b.minFilter===Ns||b.minFilter===Hn)&&qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(M,i.TEXTURE_WRAP_S,Ie[b.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,Ie[b.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,Ie[b.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,De[b.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,De[b.minFilter]),b.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,rt[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Nt||b.minFilter!==Ns&&b.minFilter!==Hn||b.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(M,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Je(M,b){let B=!1;M.__webglInit===void 0&&(M.__webglInit=!0,b.addEventListener("dispose",P));let V=b.source,$=f.get(V);$===void 0&&($={},f.set(V,$));let be=ce(b);if(be!==M.__cacheKey){$[be]===void 0&&($[be]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),$[be].usedTimes++;let X=$[M.__cacheKey];X!==void 0&&($[M.__cacheKey].usedTimes--,X.usedTimes===0&&F(b)),M.__cacheKey=be,M.__webglTexture=$[be].texture}return B}function le(M,b,B){return Math.floor(Math.floor(M/B)/b)}function me(M,b,B,V){let be=M.updateRanges;if(be.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,B,V,b.data);else{be.sort((Te,ve)=>Te.start-ve.start);let X=0;for(let Te=1;Te<be.length;Te++){let ve=be[X],Se=be[Te],Pe=ve.start+ve.count,Le=le(Se.start,b.width,4),ze=le(ve.start,b.width,4);Se.start<=Pe+1&&Le===ze&&le(Se.start+Se.count-1,b.width,4)===Le?ve.count=Math.max(ve.count,Se.start+Se.count-ve.start):(++X,be[X]=Se)}be.length=X+1;let Y=t.getParameter(i.UNPACK_ROW_LENGTH),q=t.getParameter(i.UNPACK_SKIP_PIXELS),ge=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let Te=0,ve=be.length;Te<ve;Te++){let Se=be[Te],Pe=Math.floor(Se.start/4),Le=Math.ceil(Se.count/4),ze=Pe%b.width,Q=Math.floor(Pe/b.width),ye=Le,pe=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ze),t.pixelStorei(i.UNPACK_SKIP_ROWS,Q),t.texSubImage2D(i.TEXTURE_2D,0,ze,Q,ye,pe,B,V,b.data)}M.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Y),t.pixelStorei(i.UNPACK_SKIP_PIXELS,q),t.pixelStorei(i.UNPACK_SKIP_ROWS,ge)}}function we(M,b,B){let V=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(V=i.TEXTURE_3D);let $=Je(M,b),be=b.source;t.bindTexture(V,M.__webglTexture,i.TEXTURE0+B);let X=n.get(be);if(be.version!==X.__version||$===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let pe=it.getPrimaries(it.workingColorSpace),Me=b.colorSpace===Li?null:it.getPrimaries(b.colorSpace),Ce=b.colorSpace===Li||pe===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce)}t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let q=g(b.image,!1,s.maxTextureSize);q=ee(b,q);let ge=r.convert(b.format,b.colorSpace),Te=r.convert(b.type),ve=x(b.internalFormat,ge,Te,b.normalized,b.colorSpace,b.isVideoTexture);Ze(V,b);let Se,Pe=b.mipmaps,Le=b.isVideoTexture!==!0,ze=X.__version===void 0||$===!0,Q=be.dataReady,ye=T(b,q);if(b.isDepthTexture)ve=E(b.format===ss,b.type),ze&&(Le?t.texStorage2D(i.TEXTURE_2D,1,ve,q.width,q.height):t.texImage2D(i.TEXTURE_2D,0,ve,q.width,q.height,0,ge,Te,null));else if(b.isDataTexture)if(Pe.length>0){Le&&ze&&t.texStorage2D(i.TEXTURE_2D,ye,ve,Pe[0].width,Pe[0].height);for(let pe=0,Me=Pe.length;pe<Me;pe++)Se=Pe[pe],Le?Q&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,Se.width,Se.height,ge,Te,Se.data):t.texImage2D(i.TEXTURE_2D,pe,ve,Se.width,Se.height,0,ge,Te,Se.data);b.generateMipmaps=!1}else Le?(ze&&t.texStorage2D(i.TEXTURE_2D,ye,ve,q.width,q.height),Q&&me(b,q,ge,Te)):t.texImage2D(i.TEXTURE_2D,0,ve,q.width,q.height,0,ge,Te,q.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Le&&ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,ve,Pe[0].width,Pe[0].height,q.depth);for(let pe=0,Me=Pe.length;pe<Me;pe++)if(Se=Pe[pe],b.format!==Mn)if(ge!==null)if(Le){if(Q)if(b.layerUpdates.size>0){let Ce=lu(Se.width,Se.height,b.format,b.type);for(let de of b.layerUpdates){let Ae=Se.data.subarray(de*Ce/Se.data.BYTES_PER_ELEMENT,(de+1)*Ce/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,de,Se.width,Se.height,1,ge,Ae)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,Se.width,Se.height,q.depth,ge,Se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,pe,ve,Se.width,Se.height,q.depth,0,Se.data,0,0);else qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?Q&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,Se.width,Se.height,q.depth,ge,Te,Se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,pe,ve,Se.width,Se.height,q.depth,0,ge,Te,Se.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{Le&&ze&&t.texStorage2D(i.TEXTURE_2D,ye,ve,Pe[0].width,Pe[0].height);for(let pe=0,Me=Pe.length;pe<Me;pe++)Se=Pe[pe],b.format!==Mn?ge!==null?Le?Q&&t.compressedTexSubImage2D(i.TEXTURE_2D,pe,0,0,Se.width,Se.height,ge,Se.data):t.compressedTexImage2D(i.TEXTURE_2D,pe,ve,Se.width,Se.height,0,Se.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?Q&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,Se.width,Se.height,ge,Te,Se.data):t.texImage2D(i.TEXTURE_2D,pe,ve,Se.width,Se.height,0,ge,Te,Se.data)}else if(b.isDataArrayTexture)if(Le){if(ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,ve,q.width,q.height,q.depth),Q)if(b.layerUpdates.size>0){let pe=lu(q.width,q.height,b.format,b.type);for(let Me of b.layerUpdates){let Ce=q.data.subarray(Me*pe/q.data.BYTES_PER_ELEMENT,(Me+1)*pe/q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Me,q.width,q.height,1,ge,Te,Ce)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,ge,Te,q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,q.width,q.height,q.depth,0,ge,Te,q.data);else if(b.isData3DTexture)Le?(ze&&t.texStorage3D(i.TEXTURE_3D,ye,ve,q.width,q.height,q.depth),Q&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,ge,Te,q.data)):t.texImage3D(i.TEXTURE_3D,0,ve,q.width,q.height,q.depth,0,ge,Te,q.data);else if(b.isFramebufferTexture){if(ze)if(Le)t.texStorage2D(i.TEXTURE_2D,ye,ve,q.width,q.height);else{let pe=q.width,Me=q.height;for(let Ce=0;Ce<ye;Ce++)t.texImage2D(i.TEXTURE_2D,Ce,ve,pe,Me,0,ge,Te,null),pe>>=1,Me>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){let pe=i.canvas;if(pe.hasAttribute("layoutsubtree")||pe.setAttribute("layoutsubtree","true"),q.parentNode!==pe){pe.appendChild(q),d.add(b),pe.onpaint=Me=>{let Ce=Me.changedElements;for(let de of d)Ce.includes(de.image)&&(de.needsUpdate=!0)},pe.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,q);else{let Ce=i.RGBA,de=i.RGBA,Ae=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ce,de,Ae,q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(Le&&ze){let pe=re(Pe[0]);t.texStorage2D(i.TEXTURE_2D,ye,ve,pe.width,pe.height)}for(let pe=0,Me=Pe.length;pe<Me;pe++)Se=Pe[pe],Le?Q&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,ge,Te,Se):t.texImage2D(i.TEXTURE_2D,pe,ve,ge,Te,Se);b.generateMipmaps=!1}else if(Le){if(ze){let pe=re(q);t.texStorage2D(i.TEXTURE_2D,ye,ve,pe.width,pe.height)}Q&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,Te,q)}else t.texImage2D(i.TEXTURE_2D,0,ve,ge,Te,q);p(b)&&S(V),X.__version=be.version,b.onUpdate&&b.onUpdate(b)}M.__version=b.version}function Ve(M,b,B){if(b.image.length!==6)return;let V=Je(M,b),$=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+B);let be=n.get($);if($.version!==be.__version||V===!0){t.activeTexture(i.TEXTURE0+B);let X=it.getPrimaries(it.workingColorSpace),Y=b.colorSpace===Li?null:it.getPrimaries(b.colorSpace),q=b.colorSpace===Li||X===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);let ge=b.isCompressedTexture||b.image[0].isCompressedTexture,Te=b.image[0]&&b.image[0].isDataTexture,ve=[];for(let de=0;de<6;de++)!ge&&!Te?ve[de]=g(b.image[de],!0,s.maxCubemapSize):ve[de]=Te?b.image[de].image:b.image[de],ve[de]=ee(b,ve[de]);let Se=ve[0],Pe=r.convert(b.format,b.colorSpace),Le=r.convert(b.type),ze=x(b.internalFormat,Pe,Le,b.normalized,b.colorSpace),Q=b.isVideoTexture!==!0,ye=be.__version===void 0||V===!0,pe=$.dataReady,Me=T(b,Se);Ze(i.TEXTURE_CUBE_MAP,b);let Ce;if(ge){Q&&ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,ze,Se.width,Se.height);for(let de=0;de<6;de++){Ce=ve[de].mipmaps;for(let Ae=0;Ae<Ce.length;Ae++){let Ue=Ce[Ae];b.format!==Mn?Pe!==null?Q?pe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ae,0,0,Ue.width,Ue.height,Pe,Ue.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ae,ze,Ue.width,Ue.height,0,Ue.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Q?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ae,0,0,Ue.width,Ue.height,Pe,Le,Ue.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ae,ze,Ue.width,Ue.height,0,Pe,Le,Ue.data)}}}else{if(Ce=b.mipmaps,Q&&ye){Ce.length>0&&Me++;let de=re(ve[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,ze,de.width,de.height)}for(let de=0;de<6;de++)if(Te){Q?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,ve[de].width,ve[de].height,Pe,Le,ve[de].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,ze,ve[de].width,ve[de].height,0,Pe,Le,ve[de].data);for(let Ae=0;Ae<Ce.length;Ae++){let _t=Ce[Ae].image[de].image;Q?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ae+1,0,0,_t.width,_t.height,Pe,Le,_t.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ae+1,ze,_t.width,_t.height,0,Pe,Le,_t.data)}}else{Q?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,Pe,Le,ve[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,ze,Pe,Le,ve[de]);for(let Ae=0;Ae<Ce.length;Ae++){let Ue=Ce[Ae];Q?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ae+1,0,0,Pe,Le,Ue.image[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ae+1,ze,Pe,Le,Ue.image[de])}}}p(b)&&S(i.TEXTURE_CUBE_MAP),be.__version=$.version,b.onUpdate&&b.onUpdate(b)}M.__version=b.version}function Re(M,b,B,V,$,be){let X=r.convert(B.format,B.colorSpace),Y=r.convert(B.type),q=x(B.internalFormat,X,Y,B.normalized,B.colorSpace),ge=n.get(b),Te=n.get(B);if(Te.__renderTarget=b,!ge.__hasExternalTextures){let ve=Math.max(1,b.width>>be),Se=Math.max(1,b.height>>be);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,be,q,ve,Se,b.depth,0,X,Y,null):t.texImage2D($,be,q,ve,Se,0,X,Y,null)}t.bindFramebuffer(i.FRAMEBUFFER,M),K(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,$,Te.__webglTexture,0,O(b)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,$,Te.__webglTexture,be),t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(M,b,B){if(i.bindRenderbuffer(i.RENDERBUFFER,M),b.depthBuffer){let V=b.depthTexture,$=V&&V.isDepthTexture?V.type:null,be=E(b.stencilBuffer,$),X=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;K(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,O(b),be,b.width,b.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,O(b),be,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,be,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,M)}else{let V=b.textures;for(let $=0;$<V.length;$++){let be=V[$],X=r.convert(be.format,be.colorSpace),Y=r.convert(be.type),q=x(be.internalFormat,X,Y,be.normalized,be.colorSpace);K(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,O(b),q,b.width,b.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,O(b),q,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,q,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function U(M,b,B){let V=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,M),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let $=n.get(b.depthTexture);if($.__renderTarget=b,(!$.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),V){if($.__webglInit===void 0&&($.__webglInit=!0,b.depthTexture.addEventListener("dispose",P)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Ze(i.TEXTURE_CUBE_MAP,b.depthTexture);let ge=r.convert(b.depthTexture.format),Te=r.convert(b.depthTexture.type),ve;b.depthTexture.format===$n?ve=i.DEPTH_COMPONENT24:b.depthTexture.format===ss&&(ve=i.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ve,b.width,b.height,0,ge,Te,null)}}else xe(b.depthTexture,0);let be=$.__webglTexture,X=O(b),Y=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,q=b.depthTexture.format===ss?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===$n)K(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Y,be,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,q,Y,be,0);else if(b.depthTexture.format===ss)K(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Y,be,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,q,Y,be,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function D(M){let b=n.get(M),B=M.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==M.depthTexture){let V=M.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),V){let $=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,V.removeEventListener("dispose",$)};V.addEventListener("dispose",$),b.__depthDisposeCallback=$}b.__boundDepthTexture=V}if(M.depthTexture&&!b.__autoAllocateDepthBuffer)if(B)for(let V=0;V<6;V++)U(b.__webglFramebuffer[V],M,V);else{let V=M.texture.mipmaps;V&&V.length>0?U(b.__webglFramebuffer[0],M,0):U(b.__webglFramebuffer,M,0)}else if(B){b.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[V]),b.__webglDepthbuffer[V]===void 0)b.__webglDepthbuffer[V]=i.createRenderbuffer(),je(b.__webglDepthbuffer[V],M,!1);else{let $=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=b.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,be),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,be)}}else{let V=M.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),je(b.__webglDepthbuffer,M,!1);else{let $=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,be),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,be)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function R(M,b,B){let V=n.get(M);b!==void 0&&Re(V.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&D(M)}function N(M){let b=M.texture,B=n.get(M),V=n.get(b);M.addEventListener("dispose",v);let $=M.textures,be=M.isWebGLCubeRenderTarget===!0,X=$.length>1;if(X||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=b.version,a.memory.textures++),be){B.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer[Y]=[];for(let q=0;q<b.mipmaps.length;q++)B.__webglFramebuffer[Y][q]=i.createFramebuffer()}else B.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer=[];for(let Y=0;Y<b.mipmaps.length;Y++)B.__webglFramebuffer[Y]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(X)for(let Y=0,q=$.length;Y<q;Y++){let ge=n.get($[Y]);ge.__webglTexture===void 0&&(ge.__webglTexture=i.createTexture(),a.memory.textures++)}if(M.samples>0&&K(M)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Y=0;Y<$.length;Y++){let q=$[Y];B.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);let ge=r.convert(q.format,q.colorSpace),Te=r.convert(q.type),ve=x(q.internalFormat,ge,Te,q.normalized,q.colorSpace,M.isXRRenderTarget===!0),Se=O(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,ve,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,B.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),je(B.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(be){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Ze(i.TEXTURE_CUBE_MAP,b);for(let Y=0;Y<6;Y++)if(b.mipmaps&&b.mipmaps.length>0)for(let q=0;q<b.mipmaps.length;q++)Re(B.__webglFramebuffer[Y][q],M,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,q);else Re(B.__webglFramebuffer[Y],M,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);p(b)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(X){for(let Y=0,q=$.length;Y<q;Y++){let ge=$[Y],Te=n.get(ge),ve=i.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(ve=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,Te.__webglTexture),Ze(ve,ge),Re(B.__webglFramebuffer,M,ge,i.COLOR_ATTACHMENT0+Y,ve,0),p(ge)&&S(ve)}t.unbindTexture()}else{let Y=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(Y=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Y,V.__webglTexture),Ze(Y,b),b.mipmaps&&b.mipmaps.length>0)for(let q=0;q<b.mipmaps.length;q++)Re(B.__webglFramebuffer[q],M,b,i.COLOR_ATTACHMENT0,Y,q);else Re(B.__webglFramebuffer,M,b,i.COLOR_ATTACHMENT0,Y,0);p(b)&&S(Y),t.unbindTexture()}M.depthBuffer&&D(M)}function H(M){let b=M.textures;for(let B=0,V=b.length;B<V;B++){let $=b[B];if(p($)){let be=w(M),X=n.get($).__webglTexture;t.bindTexture(be,X),S(be),t.unbindTexture()}}}let te=[],_e=[];function Z(M){if(M.samples>0){if(K(M)===!1){let b=M.textures,B=M.width,V=M.height,$=i.COLOR_BUFFER_BIT,be=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=n.get(M),Y=b.length>1;if(Y)for(let ge=0;ge<b.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,X.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,X.__webglMultisampledFramebuffer);let q=M.texture.mipmaps;q&&q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglFramebuffer);for(let ge=0;ge<b.length;ge++){if(M.resolveDepthBuffer&&(M.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,X.__webglColorRenderbuffer[ge]);let Te=n.get(b[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Te,0)}i.blitFramebuffer(0,0,B,V,0,0,B,V,$,i.NEAREST),c===!0&&(te.length=0,_e.length=0,te.push(i.COLOR_ATTACHMENT0+ge),M.depthBuffer&&M.storeMultisampledDepthBuffer===!1&&(te.push(be),_e.push(be),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,_e)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let ge=0;ge<b.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,X.__webglColorRenderbuffer[ge]);let Te=n.get(b[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,X.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,Te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.storeMultisampledDepthBuffer===!1&&c){let b=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function O(M){return Math.min(s.maxSamples,M.samples)}function K(M){let b=n.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function y(M){let b=a.render.frame;u.get(M)!==b&&(u.set(M,b),M.update())}function ee(M,b){let B=M.colorSpace,V=M.format,$=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||B!==hn&&B!==Li&&(it.getTransfer(B)===mt?(V!==Mn||$!==pn)&&qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",B)),b}function re(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(l.width=M.naturalWidth||M.width,l.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(l.width=M.displayWidth,l.height=M.displayHeight):(l.width=M.width,l.height=M.height),l}this.allocateTextureUnit=oe,this.resetTextureUnits=W,this.getTextureUnits=z,this.setTextureUnits=G,this.setTexture2D=xe,this.setTexture2DArray=j,this.setTexture3D=he,this.setTextureCube=fe,this.rebindTextures=R,this.setupRenderTarget=N,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=D,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=K,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Cy(i,e){function t(n,s=Li){let r,a=it.getTransfer(s);if(n===pn)return i.UNSIGNED_BYTE;if(n===Ic)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Lc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===$h)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Yh)return i.BYTE;if(n===Jh)return i.SHORT;if(n===Pr)return i.UNSIGNED_SHORT;if(n===Pc)return i.INT;if(n===Vn)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===Wn)return i.HALF_FLOAT;if(n===Qh)return i.ALPHA;if(n===eu)return i.RGB;if(n===Mn)return i.RGBA;if(n===$n)return i.DEPTH_COMPONENT;if(n===ss)return i.DEPTH_STENCIL;if(n===Dc)return i.RED;if(n===Nc)return i.RED_INTEGER;if(n===rs)return i.RG;if(n===Fc)return i.RG_INTEGER;if(n===Uc)return i.RGBA_INTEGER;if(n===Ka||n===Ya||n===Ja||n===Za)if(a===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ka)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ja)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Za)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ka)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ya)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ja)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Za)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Oc||n===kc||n===Bc||n===zc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Oc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===kc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Bc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===zc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Gc||n===Hc||n===Vc||n===Wc||n===qc||n===$a||n===Xc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Gc||n===Hc)return a===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Vc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Wc)return r.COMPRESSED_R11_EAC;if(n===qc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===$a)return r.COMPRESSED_RG11_EAC;if(n===Xc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===jc||n===Kc||n===Yc||n===Jc||n===Zc||n===$c||n===Qc||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===jc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Kc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Yc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$c)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Qc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===el)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===tl)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===nl)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===il)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===sl)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===rl)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===al)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ol||n===cl||n===ll)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ol)return a===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===cl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ll)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hl||n===ul||n===Qa||n===dl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===hl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ul)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===dl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ir?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Py=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Iy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Su=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ea(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new sn({vertexShader:Py,fragmentShader:Iy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new vn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Eu=class extends zn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,m=null,_=typeof XRWebGLBinding<"u",g=new Su,p={},S=t.getContextAttributes(),w=null,x=null,E=[],T=[],P=new Ee,v=null,L=null,F=new Bt;F.viewport=new bt;let C=new Bt;C.viewport=new bt;let I=[F,C],W=new Sc,z=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(le){let me=E[le];return me===void 0&&(me=new mr,E[le]=me),me.getTargetRaySpace()},this.getControllerGrip=function(le){let me=E[le];return me===void 0&&(me=new mr,E[le]=me),me.getGripSpace()},this.getHand=function(le){let me=E[le];return me===void 0&&(me=new mr,E[le]=me),me.getHandSpace()};function oe(le){let me=T.indexOf(le.inputSource);if(me===-1)return;let we=E[me];we!==void 0&&(we.update(le.inputSource,le.frame,l||a),we.dispatchEvent({type:le.type,data:le.inputSource}))}function ce(){s.removeEventListener("select",oe),s.removeEventListener("selectstart",oe),s.removeEventListener("selectend",oe),s.removeEventListener("squeeze",oe),s.removeEventListener("squeezestart",oe),s.removeEventListener("squeezeend",oe),s.removeEventListener("end",ce),s.removeEventListener("inputsourceschange",xe);for(let le=0;le<E.length;le++){let me=T[le];me!==null&&(T[le]=null,E[le].disconnect(me))}z=null,G=null,g.reset();for(let le in p)delete p[le];if(e.setRenderTarget(w),f=null,h=null,d=null,s=null,x=null,Je.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(P.width,P.height,!1),L!==null){let le=L.camera;le.fov=L.fov,le.zoom=L.zoom,le.updateProjectionMatrix(),L=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(le){r=le,n.isPresenting===!0&&qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(le){o=le,n.isPresenting===!0&&qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(le){l=le},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(le){if(s=le,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",oe),s.addEventListener("selectstart",oe),s.addEventListener("selectend",oe),s.addEventListener("squeeze",oe),s.addEventListener("squeezestart",oe),s.addEventListener("squeezeend",oe),s.addEventListener("end",ce),s.addEventListener("inputsourceschange",xe),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let we=null,Ve=null,Re=null;S.depth&&(Re=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,we=S.stencil?ss:$n,Ve=S.stencil?Ir:Vn);let je={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(je),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new un(h.textureWidth,h.textureHeight,{format:Mn,type:pn,depthTexture:new Zi(h.textureWidth,h.textureHeight,Ve,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let we={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,we),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new un(f.framebufferWidth,f.framebufferHeight,{format:Mn,type:pn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Je.setContext(s),Je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function xe(le){for(let me=0;me<le.removed.length;me++){let we=le.removed[me],Ve=T.indexOf(we);Ve>=0&&(T[Ve]=null,E[Ve].disconnect(we))}for(let me=0;me<le.added.length;me++){let we=le.added[me],Ve=T.indexOf(we);if(Ve===-1){for(let je=0;je<E.length;je++)if(je>=T.length){T.push(we),Ve=je;break}else if(T[je]===null){T[je]=we,Ve=je;break}if(Ve===-1)break}let Re=E[Ve];Re&&Re.connect(we)}}let j=new k,he=new k;function fe(le,me,we){j.setFromMatrixPosition(me.matrixWorld),he.setFromMatrixPosition(we.matrixWorld);let Ve=j.distanceTo(he),Re=me.projectionMatrix.elements,je=we.projectionMatrix.elements,U=Re[14]/(Re[10]-1),D=Re[14]/(Re[10]+1),R=(Re[9]+1)/Re[5],N=(Re[9]-1)/Re[5],H=(Re[8]-1)/Re[0],te=(je[8]+1)/je[0],_e=U*H,Z=U*te,O=Ve/(-H+te),K=O*-H;if(me.matrixWorld.decompose(le.position,le.quaternion,le.scale),le.translateX(K),le.translateZ(O),le.matrixWorld.compose(le.position,le.quaternion,le.scale),le.matrixWorldInverse.copy(le.matrixWorld).invert(),Re[10]===-1)le.projectionMatrix.copy(me.projectionMatrix),le.projectionMatrixInverse.copy(me.projectionMatrixInverse);else{let y=U+O,ee=D+O,re=_e-K,M=Z+(Ve-K),b=R*D/ee*y,B=N*D/ee*y;le.projectionMatrix.makePerspective(re,M,b,B,y,ee),le.projectionMatrixInverse.copy(le.projectionMatrix).invert()}}function Ie(le,me){me===null?le.matrixWorld.copy(le.matrix):le.matrixWorld.multiplyMatrices(me.matrixWorld,le.matrix),le.matrixWorldInverse.copy(le.matrixWorld).invert()}this.updateCamera=function(le){if(s===null)return;let me=le.near,we=le.far;g.texture!==null&&(g.depthNear>0&&(me=g.depthNear),g.depthFar>0&&(we=g.depthFar)),W.near=C.near=F.near=me,W.far=C.far=F.far=we,(z!==W.near||G!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),z=W.near,G=W.far),W.layers.mask=le.layers.mask|6,F.layers.mask=W.layers.mask&-5,C.layers.mask=W.layers.mask&-3;let Ve=le.parent,Re=W.cameras;Ie(W,Ve);for(let je=0;je<Re.length;je++)Ie(Re[je],Ve);Re.length===2?fe(W,F,C):W.projectionMatrix.copy(F.projectionMatrix),L===null&&le.isPerspectiveCamera&&(L={camera:le,fov:le.fov,zoom:le.zoom}),De(le,W,Ve)};function De(le,me,we){we===null?le.matrix.copy(me.matrixWorld):(le.matrix.copy(we.matrixWorld),le.matrix.invert(),le.matrix.multiply(me.matrixWorld)),le.matrix.decompose(le.position,le.quaternion,le.scale),le.updateMatrixWorld(!0),le.projectionMatrix.copy(me.projectionMatrix),le.projectionMatrixInverse.copy(me.projectionMatrixInverse),le.isPerspectiveCamera&&(le.fov=Ss*2*Math.atan(1/le.projectionMatrix.elements[5]),le.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(le){c=le,h!==null&&(h.fixedFoveation=le),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=le)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(W)},this.getCameraTexture=function(le){return p[le]};let rt=null;function Ze(le,me){if(u=me.getViewerPose(l||a),m=me,u!==null){let we=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Ve=!1;we.length!==W.cameras.length&&(W.cameras.length=0,Ve=!0);for(let D=0;D<we.length;D++){let R=we[D],N=null;if(f!==null)N=f.getViewport(R);else{let te=d.getViewSubImage(h,R);N=te.viewport,D===0&&(e.setRenderTargetTextures(x,te.colorTexture,te.depthStencilTexture),e.setRenderTarget(x))}let H=I[D];H===void 0&&(H=new Bt,H.layers.enable(D),H.viewport=new bt,I[D]=H),H.matrix.fromArray(R.transform.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale),H.projectionMatrix.fromArray(R.projectionMatrix),H.projectionMatrixInverse.copy(H.projectionMatrix).invert(),H.viewport.set(N.x,N.y,N.width,N.height),D===0&&(W.matrix.copy(H.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Ve===!0&&W.cameras.push(H)}let Re=s.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let D=d.getDepthInformation(we[0]);D&&D.isValid&&D.texture&&g.init(D,s.renderState)}if(Re&&Re.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let D=0;D<we.length;D++){let R=we[D].camera;if(R){let N=p[R];N||(N=new Ea,p[R]=N);let H=d.getCameraImage(R);N.sourceTexture=H}}}}for(let we=0;we<E.length;we++){let Ve=T[we],Re=E[we];Ve!==null&&Re!==void 0&&Re.update(Ve,me,l||a)}rt&&rt(le,me),me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:me}),m=null}let Je=new Wp;Je.setAnimationLoop(Ze),this.setAnimationLoop=function(le){rt=le},this.dispose=function(){}}},Ly=new et,Jp=new Qe;Jp.set(-1,0,0,0,1,0,0,0,1);function Dy(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,au(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,S,w,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,S,w):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Gt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Gt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let S=e.get(p),w=S.envMap,x=S.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(Ly.makeRotationFromEuler(x)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Jp),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,S,w){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*S,g.scale.value=w*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,S){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Gt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let S=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ny(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,E){let T=E.program;n.uniformBlockBinding(x,T)}function l(x,E){let T=s[x.id];T===void 0&&(g(x),T=u(x),s[x.id]=T,x.addEventListener("dispose",S));let P=E.program;n.updateUBOMapping(x,P);let v=e.render.frame;r[x.id]!==v&&(h(x),r[x.id]=v)}function u(x){let E=d();x.__bindingPointIndex=E;let T=i.createBuffer(),P=x.__size,v=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,P,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,T),T}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ye("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){let E=s[x.id],T=x.uniforms,P=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let v=0,L=T.length;v<L;v++){let F=T[v];if(Array.isArray(F))for(let C=0,I=F.length;C<I;C++)f(F[C],v,C,P);else f(F,v,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,E,T,P){if(_(x,E,T,P)===!0){let v=x.__offset,L=x.value;if(Array.isArray(L)){let F=0;for(let C=0;C<L.length;C++){let I=L[C],W=p(I);m(I,x.__data,F),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(F+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(L,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,x.__data)}}function m(x,E,T){typeof x=="number"||typeof x=="boolean"?E[0]=x:x.isMatrix3?(E[0]=x.elements[0],E[1]=x.elements[1],E[2]=x.elements[2],E[3]=0,E[4]=x.elements[3],E[5]=x.elements[4],E[6]=x.elements[5],E[7]=0,E[8]=x.elements[6],E[9]=x.elements[7],E[10]=x.elements[8],E[11]=0):ArrayBuffer.isView(x)?E.set(new x.constructor(x.buffer,x.byteOffset,E.length)):x.toArray(E,T)}function _(x,E,T,P){let v=x.value,L=E+"_"+T;if(P[L]===void 0)return typeof v=="number"||typeof v=="boolean"?P[L]=v:ArrayBuffer.isView(v)?P[L]=v.slice():P[L]=v.clone(),!0;{let F=P[L];if(typeof v=="number"||typeof v=="boolean"){if(F!==v)return P[L]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(F.equals(v)===!1)return F.copy(v),!0}}return!1}function g(x){let E=x.uniforms,T=0,P=16;for(let L=0,F=E.length;L<F;L++){let C=Array.isArray(E[L])?E[L]:[E[L]];for(let I=0,W=C.length;I<W;I++){let z=C[I],G=Array.isArray(z.value)?z.value:[z.value];for(let oe=0,ce=G.length;oe<ce;oe++){let xe=G[oe],j=p(xe),he=T%P,fe=he%j.boundary,Ie=he+fe;T+=fe,Ie!==0&&P-Ie<j.storage&&(T+=P-Ie),z.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=T,T+=j.storage}}}let v=T%P;return v>0&&(T+=P-v),x.__size=T,x.__cache={},this}function p(x){let E={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(E.boundary=4,E.storage=4):x.isVector2?(E.boundary=8,E.storage=8):x.isVector3||x.isColor?(E.boundary=16,E.storage=12):x.isVector4?(E.boundary=16,E.storage=16):x.isMatrix3?(E.boundary=48,E.storage=48):x.isMatrix4?(E.boundary=64,E.storage=64):x.isTexture?qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(E.boundary=16,E.storage=x.byteLength):qe("WebGLRenderer: Unsupported uniform value type.",x),E}function S(x){let E=x.target;E.removeEventListener("dispose",S);let T=a.indexOf(E.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function w(){for(let x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:c,update:l,dispose:w}}var Fy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),si=null;function Uy(){return si===null&&(si=new xr(Fy,16,16,rs,Wn),si.name="DFG_LUT",si.minFilter=Ft,si.magFilter=Ft,si.wrapS=Tn,si.wrapT=Tn,si.generateMipmaps=!1,si.needsUpdate=!0),si}var yl=class{constructor(e={}){let{canvas:t=hp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=pn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let _=f,g=new Set([Uc,Fc,Nc]),p=new Set([pn,Vn,Pr,Ir,Ic,Lc]),S=new Uint32Array(4),w=new Int32Array(4),x=new k,E=null,T=null,P=[],v=[],L=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let F=this,C=!1,I=null,W=null,z=null,G=null;this._outputColorSpace=Et;let oe=0,ce=0,xe=null,j=-1,he=null,fe=new bt,Ie=new bt,De=null,rt=new Xe(0),Ze=0,Je=t.width,le=t.height,me=1,we=null,Ve=null,Re=new bt(0,0,Je,le),je=new bt(0,0,Je,le),U=!1,D=new _r,R=!1,N=!1,H=new et,te=new k,_e=new bt,Z={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},O=!1;function K(){return xe===null?me:1}let y=n;function ee(A,J){return t.getContext(A,J)}let re,M,b,B,V,$,be,X,Y,q,ge,Te,ve,Se,Pe,Le,ze,Q,ye,pe,Me,Ce,de;try{let A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",_t,!1),t.addEventListener("webglcontextrestored",ft,!1),t.addEventListener("webglcontextcreationerror",Dn,!1),y===null){let J="webgl2";if(y=ee(J,A),y===null)throw ee(J)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ae()}catch(A){throw t.removeEventListener("webglcontextlost",_t,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",Dn,!1),Ye("WebGLRenderer: "+A.message),A}function Ae(){re=new V_(y),re.init(),Me=new Cy(y,re),M=new D_(y,re,e,Me),b=new Ay(y,re),M.reversedDepthBuffer&&h&&b.buffers.depth.setReversed(!0),W=y.createFramebuffer(),z=y.createFramebuffer(),G=y.createFramebuffer(),B=new X_(y),V=new fy,$=new Ry(y,re,b,V,M,Me,B),be=new H_(F),X=new K0(y),Ce=new I_(y,X),Y=new W_(y,X,B,Ce),q=new K_(y,Y,X,Ce,B),Q=new j_(y,M,$),Pe=new N_(V),ge=new dy(F,be,re,M,Ce,Pe),Te=new Dy(F,V),ve=new my,Se=new yy(re),ze=new P_(F,be,b,q,m,c),Le=new wy(F,q,M),de=new Ny(y,B,M,b),ye=new L_(y,re,B),pe=new q_(y,re,B),B.programs=ge.programs,F.capabilities=M,F.extensions=re,F.properties=V,F.renderLists=ve,F.shadowMap=Le,F.state=b,F.info=B}_!==pn&&(L=new J_(_,t.width,t.height,o,s,r));let Ue=new Eu(F,y);this.xr=Ue,this.getContext=function(){return y},this.getContextAttributes=function(){return y.getContextAttributes()},this.forceContextLoss=function(){let A=re.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=re.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(A){A!==void 0&&(me=A,this.setSize(Je,le,!1))},this.getSize=function(A){return A.set(Je,le)},this.setSize=function(A,J,ue=!0){if(Ue.isPresenting){qe("WebGLRenderer: Can't change size while VR device is presenting.");return}Je=A,le=J,t.width=Math.floor(A*me),t.height=Math.floor(J*me),ue===!0&&(t.style.width=A+"px",t.style.height=J+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,A,J)},this.getDrawingBufferSize=function(A){return A.set(Je*me,le*me).floor()},this.setDrawingBufferSize=function(A,J,ue){Je=A,le=J,me=ue,t.width=Math.floor(A*ue),t.height=Math.floor(J*ue),this.setViewport(0,0,A,J)},this.setEffects=function(A){if(_===pn){Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let J=0;J<A.length;J++)if(A[J].isOutputPass===!0){qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(fe)},this.getViewport=function(A){return A.copy(Re)},this.setViewport=function(A,J,ue,ie){A.isVector4?Re.set(A.x,A.y,A.z,A.w):Re.set(A,J,ue,ie),b.viewport(fe.copy(Re).multiplyScalar(me).round())},this.getScissor=function(A){return A.copy(je)},this.setScissor=function(A,J,ue,ie){A.isVector4?je.set(A.x,A.y,A.z,A.w):je.set(A,J,ue,ie),b.scissor(Ie.copy(je).multiplyScalar(me).round())},this.getScissorTest=function(){return U},this.setScissorTest=function(A){b.setScissorTest(U=A)},this.setOpaqueSort=function(A){we=A},this.setTransparentSort=function(A){Ve=A},this.getClearColor=function(A){return A.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(A=!0,J=!0,ue=!0){let ie=0;if(A){let se=!1;if(xe!==null){let Oe=xe.texture.format;se=g.has(Oe)}if(se){let Oe=xe.texture.type,Be=p.has(Oe),Fe=ze.getClearColor(),Ge=ze.getClearAlpha(),We=Fe.r,tt=Fe.g,ot=Fe.b;Be?(S[0]=We,S[1]=tt,S[2]=ot,S[3]=Ge,y.clearBufferuiv(y.COLOR,0,S)):(w[0]=We,w[1]=tt,w[2]=ot,w[3]=Ge,y.clearBufferiv(y.COLOR,0,w))}else ie|=y.COLOR_BUFFER_BIT}J&&(ie|=y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ue&&(ie|=y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ie!==0&&y.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),I=A},this.dispose=function(){t.removeEventListener("webglcontextlost",_t,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",Dn,!1),ze.dispose(),ve.dispose(),Se.dispose(),V.dispose(),be.dispose(),q.dispose(),Ce.dispose(),de.dispose(),ge.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",Rd),Ue.removeEventListener("sessionend",Cd),fs.stop()};function _t(A){A.preventDefault(),da("WebGLRenderer: Context Lost."),C=!0}function ft(){da("WebGLRenderer: Context Restored."),C=!1;let A=B.autoReset,J=Le.enabled,ue=Le.autoUpdate,ie=Le.needsUpdate,se=Le.type;Ae(),B.autoReset=A,Le.enabled=J,Le.autoUpdate=ue,Le.needsUpdate=ie,Le.type=se}function Dn(A){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Xn(A){let J=A.target;J.removeEventListener("dispose",Xn),lg(J)}function lg(A){hg(A),V.remove(A)}function hg(A){let J=V.get(A).programs;J!==void 0&&(J.forEach(function(ue){ge.releaseProgram(ue)}),A.isShaderMaterial&&ge.releaseShaderCache(A))}this.renderBufferDirect=function(A,J,ue,ie,se,Oe){J===null&&(J=Z);let Be=se.isMesh&&se.matrixWorld.determinantAffine()<0,Fe=fg(A,J,ue,ie,se);b.setMaterial(ie,Be);let Ge=ue.index,We=1;if(ie.wireframe===!0){if(Ge=Y.getWireframeAttribute(ue),Ge===void 0)return;We=2}let tt=ue.drawRange,ot=ue.attributes.position,He=tt.start*We,pt=(tt.start+tt.count)*We;Oe!==null&&(He=Math.max(He,Oe.start*We),pt=Math.min(pt,(Oe.start+Oe.count)*We)),Ge!==null?(He=Math.max(He,0),pt=Math.min(pt,Ge.count)):ot!=null&&(He=Math.max(He,0),pt=Math.min(pt,ot.count));let Ot=pt-He;if(Ot<0||Ot===1/0)return;Ce.setup(se,ie,Fe,ue,Ge);let At,St=ye;if(Ge!==null&&(At=X.get(Ge),St=pe,St.setIndex(At)),se.isMesh)ie.wireframe===!0?(b.setLineWidth(ie.wireframeLinewidth*K()),St.setMode(y.LINES)):St.setMode(y.TRIANGLES);else if(se.isLine){let Zt=ie.linewidth;Zt===void 0&&(Zt=1),b.setLineWidth(Zt*K()),se.isLineSegments?St.setMode(y.LINES):se.isLineLoop?St.setMode(y.LINE_LOOP):St.setMode(y.LINE_STRIP)}else se.isPoints?St.setMode(y.POINTS):se.isSprite&&St.setMode(y.TRIANGLES);if(se.isBatchedMesh)if(re.get("WEBGL_multi_draw"))St.renderMultiDraw(se._multiDrawStarts,se._multiDrawCounts,se._multiDrawCount);else{let Zt=se._multiDrawStarts,ke=se._multiDrawCounts,cn=se._multiDrawCount,ut=Ge?X.get(Ge).bytesPerElement:1,Sn=V.get(ie).currentProgram.getUniforms();for(let jn=0;jn<cn;jn++)Sn.setValue(y,"_gl_DrawID",jn),St.render(Zt[jn]/ut,ke[jn])}else if(se.isInstancedMesh)St.renderInstances(He,Ot,se.count);else if(ue.isInstancedBufferGeometry){let Zt=ue._maxInstanceCount!==void 0?ue._maxInstanceCount:1/0,ke=Math.min(ue.instanceCount,Zt);St.renderInstances(He,Ot,ke)}else St.render(He,Ot)};function Ad(A,J,ue,ie){I!==null&&A.isNodeMaterial&&I.setObject(ie,A),R===!0&&Pe.setState(A,ue,!1),A.transparent===!0&&A.side===rn&&A.forceSinglePass===!1?(A.side=Gt,A.needsUpdate=!0,mo(A,J,ie),A.side=ni,A.needsUpdate=!0,mo(A,J,ie),A.side=rn):mo(A,J,ie)}this.compile=function(A,J,ue=null){ue===null&&(ue=A),I!==null&&I.renderStart(A,J,ue),T=Se.get(ue),T.init(J),v.push(T),ue.traverseVisible(function(se){se.isLight&&se.layers.test(J.layers)&&(T.pushLight(se),se.castShadow&&T.pushShadow(se))}),A!==ue&&A.traverseVisible(function(se){se.isLight&&se.layers.test(J.layers)&&(T.pushLight(se),se.castShadow&&T.pushShadow(se))}),T.setupLights(),I!==null&&I.updateLights(T.state.lightsArray),N=this.localClippingEnabled,R=Pe.init(this.clippingPlanes,N),R===!0&&Pe.setGlobalState(this.clippingPlanes,J),I!==null&&Le.render(T.state.shadowsArray,ue,J);let ie=new Set;return A.traverse(function(se){if(!(se.isMesh||se.isPoints||se.isLine||se.isSprite))return;let Oe=se.material;if(Oe)if(Array.isArray(Oe))for(let Be=0;Be<Oe.length;Be++){let Fe=Oe[Be];Ad(Fe,ue,J,se),ie.add(Fe)}else Ad(Oe,ue,J,se),ie.add(Oe)}),T=v.pop(),I!==null&&I.renderEnd(),ie},this.compileAsync=function(A,J,ue=null){let ie=this.compile(A,J,ue);return new Promise(se=>{function Oe(){if(ie.forEach(function(Be){let Ge=V.get(Be).currentProgram;(Ge===void 0||Ge.isReady())&&ie.delete(Be)}),ie.size===0){se(A);return}setTimeout(Oe,10)}re.get("KHR_parallel_shader_compile")!==null?Oe():setTimeout(Oe,10)})};let jl=null;function ug(A){jl&&jl(A)}function Rd(){fs.stop()}function Cd(){fs.start()}let fs=new Wp;fs.setAnimationLoop(ug),typeof self<"u"&&fs.setContext(self),this.setAnimationLoop=function(A){jl=A,Ue.setAnimationLoop(A),A===null?fs.stop():fs.start()},Ue.addEventListener("sessionstart",Rd),Ue.addEventListener("sessionend",Cd),this.render=function(A,J){if(J!==void 0&&J.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;I!==null&&I.renderStart(A,J);let ue=Ue.enabled===!0&&Ue.isPresenting===!0,ie=L!==null&&(xe===null||ue)&&L.begin(F,xe);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),J.parent===null&&J.matrixWorldAutoUpdate===!0&&J.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(J),J=Ue.getCamera()),A.isScene===!0&&A.onBeforeRender(F,A,J,xe),T=Se.get(A,v.length),T.init(J),T.state.textureUnits=$.getTextureUnits(),v.push(T),H.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),D.setFromProjectionMatrix(H,Bn,J.reversedDepth),N=this.localClippingEnabled,R=Pe.init(this.clippingPlanes,N),E=ve.get(A,P.length),E.init(),P.push(E),Ue.enabled===!0&&Ue.isPresenting===!0){let Be=F.xr.getDepthSensingMesh();Be!==null&&Kl(Be,J,-1/0,F.sortObjects)}Kl(A,J,0,F.sortObjects),E.finish(),I!==null&&I.updateLights(T.state.lightsArray),F.sortObjects===!0&&E.sort(we,Ve),O=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,O&&ze.addToRenderList(E,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),R===!0&&Pe.beginShadows();let se=T.state.shadowsArray;if(Le.render(se,A,J),R===!0&&Pe.endShadows(),(ie&&L.hasRenderPass())===!1){let Be=E.opaque,Fe=E.transmissive;if(T.setupLights(),J.isArrayCamera){let Ge=J.cameras;if(Fe.length>0)for(let We=0,tt=Ge.length;We<tt;We++){let ot=Ge[We];Id(Be,Fe,A,ot)}O&&ze.render(A);for(let We=0,tt=Ge.length;We<tt;We++){let ot=Ge[We];Pd(E,A,ot,ot.viewport)}}else Fe.length>0&&Id(Be,Fe,A,J),O&&ze.render(A),Pd(E,A,J)}xe!==null&&ce===0&&($.updateMultisampleRenderTarget(xe),$.updateRenderTargetMipmap(xe)),ie&&L.end(F),A.isScene===!0&&A.onAfterRender(F,A,J),Ce.resetDefaultState(),j=-1,he=null,v.pop(),v.length>0?(T=v[v.length-1],$.setTextureUnits(T.state.textureUnits),R===!0&&Pe.setGlobalState(F.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?E=P[P.length-1]:E=null,I!==null&&I.renderEnd()};function Kl(A,J,ue,ie){if(A.visible===!1)return;if(A.layers.test(J.layers)){if(A.isGroup)ue=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(J);else if(A.isLightProbeGrid)T.pushLightProbeGrid(A);else if(A.isLight)T.pushLight(A),A.castShadow&&T.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(D)){ie&&_e.setFromMatrixPosition(A.matrixWorld).applyMatrix4(H);let Be=q.update(A),Fe=A.material;Fe.visible&&E.push(A,Be,Fe,ue,_e.z,null,J)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(D))){let Be=q.update(A),Fe=A.material;if(ie&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),_e.copy(A.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),_e.copy(Be.boundingSphere.center)),_e.applyMatrix4(A.matrixWorld).applyMatrix4(H)),Array.isArray(Fe)){let Ge=Be.groups;for(let We=0,tt=Ge.length;We<tt;We++){let ot=Ge[We],He=Fe[ot.materialIndex];He&&He.visible&&E.push(A,Be,He,ue,_e.z,ot,J)}}else Fe.visible&&E.push(A,Be,Fe,ue,_e.z,null,J)}}let Oe=A.children;for(let Be=0,Fe=Oe.length;Be<Fe;Be++)Kl(Oe[Be],J,ue,ie)}function Pd(A,J,ue,ie){let{opaque:se,transmissive:Oe,transparent:Be}=A;T.setupLightsView(ue),R===!0&&Pe.setGlobalState(F.clippingPlanes,ue),ie&&b.viewport(fe.copy(ie)),se.length>0&&po(se,J,ue),Oe.length>0&&po(Oe,J,ue),Be.length>0&&po(Be,J,ue),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Id(A,J,ue,ie){if((ue.isScene===!0?ue.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[ie.id]===void 0){let He=re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[ie.id]=new un(1,1,{generateMipmaps:!0,type:He?Wn:pn,minFilter:Hn,samples:Math.max(4,M.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:it.workingColorSpace})}let Oe=T.state.transmissionRenderTarget[ie.id],Be=ie.viewport||fe;Oe.setSize(Be.z*F.transmissionResolutionScale,Be.w*F.transmissionResolutionScale);let Fe=F.getRenderTarget(),Ge=F.getActiveCubeFace(),We=F.getActiveMipmapLevel();F.setRenderTarget(Oe),F.getClearColor(rt),Ze=F.getClearAlpha(),Ze<1&&F.setClearColor(16777215,.5),F.clear(),O&&ze.render(ue);let tt=F.toneMapping;F.toneMapping=Gn;let ot=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),T.setupLightsView(ie),R===!0&&Pe.setGlobalState(F.clippingPlanes,ie),po(A,ue,ie),$.updateMultisampleRenderTarget(Oe),$.updateRenderTargetMipmap(Oe),re.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let pt=0,Ot=J.length;pt<Ot;pt++){let At=J[pt],{object:St,geometry:Zt,material:ke,group:cn}=At;if(ke.side===rn&&St.layers.test(ie.layers)){let ut=ke.side;ke.side=Gt,ke.needsUpdate=!0,Ld(St,ue,ie,Zt,ke,cn),ke.side=ut,ke.needsUpdate=!0,He=!0}}He===!0&&($.updateMultisampleRenderTarget(Oe),$.updateRenderTargetMipmap(Oe))}F.setRenderTarget(Fe,Ge,We),F.setClearColor(rt,Ze),ot!==void 0&&(ie.viewport=ot),F.toneMapping=tt}function po(A,J,ue){let ie=J.isScene===!0?J.overrideMaterial:null;for(let se=0,Oe=A.length;se<Oe;se++){let Be=A[se],{object:Fe,geometry:Ge,group:We}=Be,tt=Be.material;tt.allowOverride===!0&&ie!==null&&(tt=ie),Fe.layers.test(ue.layers)&&Ld(Fe,J,ue,Ge,tt,We)}}function Ld(A,J,ue,ie,se,Oe){I!==null&&se.isNodeMaterial&&I.setObject(A,se),A.onBeforeRender(F,J,ue,ie,se,Oe),A.modelViewMatrix.multiplyMatrices(ue.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),se.onBeforeRender(F,J,ue,ie,A,Oe),se.transparent===!0&&se.side===rn&&se.forceSinglePass===!1?(se.side=Gt,se.needsUpdate=!0,F.renderBufferDirect(ue,J,ie,se,A,Oe),se.side=ni,se.needsUpdate=!0,F.renderBufferDirect(ue,J,ie,se,A,Oe),se.side=rn):F.renderBufferDirect(ue,J,ie,se,A,Oe),A.onAfterRender(F,J,ue,ie,se,Oe)}function mo(A,J,ue){J.isScene!==!0&&(J=Z);let ie=V.get(A),se=T.state.lights,Oe=T.state.shadowsArray,Be=se.state.version,Fe=ge.getParameters(A,se.state,Oe,J,ue,T.state.lightProbeGridArray),Ge=ge.getProgramCacheKey(Fe),We=ie.programs;ie.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?J.environment:null,ie.fog=J.fog;let tt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;ie.envMap=be.get(A.envMap||ie.environment,tt),ie.envMapRotation=ie.environment!==null&&A.envMap===null?J.environmentRotation:A.envMapRotation,We===void 0&&(A.addEventListener("dispose",Xn),We=new Map,ie.programs=We);let ot=We.get(Ge);if(ot!==void 0){if(ie.currentProgram===ot&&ie.lightsStateVersion===Be)return Nd(A,Fe),ot}else Fe.uniforms=ge.getUniforms(A),I!==null&&A.isNodeMaterial&&I.build(A,ue,Fe),A.onBeforeCompile(Fe,F),ot=ge.acquireProgram(Fe,Ge),We.set(Ge,ot),ie.uniforms=Fe.uniforms;let He=ie.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(He.clippingPlanes=Pe.uniform),Nd(A,Fe),ie.needsLights=mg(A),ie.lightsStateVersion=Be,ie.needsLights&&(He.ambientLightColor.value=se.state.ambient,He.lightProbe.value=se.state.probe,He.sunLights.value=se.state.sun,He.sunLightShadows.value=se.state.sunShadow,He.directionalLights.value=se.state.directional,He.directionalLightShadows.value=se.state.directionalShadow,He.spotLights.value=se.state.spot,He.spotLightShadows.value=se.state.spotShadow,He.rectAreaLights.value=se.state.rectArea,He.ltc_1.value=se.state.rectAreaLTC1,He.ltc_2.value=se.state.rectAreaLTC2,He.pointLights.value=se.state.point,He.pointLightShadows.value=se.state.pointShadow,He.hemisphereLights.value=se.state.hemi,He.sunShadowMatrix.value=se.state.sunShadowMatrix,He.sunShadowCascade.value=se.state.sunShadowCascade,He.directionalShadowMatrix.value=se.state.directionalShadowMatrix,He.spotLightMatrix.value=se.state.spotLightMatrix,He.spotLightMap.value=se.state.spotLightMap,He.pointShadowMatrix.value=se.state.pointShadowMatrix),ie.lightProbeGrid=T.state.lightProbeGridArray.length>0,ie.currentProgram=ot,ie.uniformsList=null,ot}function Dd(A){if(A.uniformsList===null){let J=A.currentProgram.getUniforms();A.uniformsList=Fr.seqWithValue(J.seq,A.uniforms)}return A.uniformsList}function Nd(A,J){let ue=V.get(A);ue.outputColorSpace=J.outputColorSpace,ue.batching=J.batching,ue.batchingColor=J.batchingColor,ue.instancing=J.instancing,ue.instancingColor=J.instancingColor,ue.instancingMorph=J.instancingMorph,ue.skinning=J.skinning,ue.morphTargets=J.morphTargets,ue.morphNormals=J.morphNormals,ue.morphColors=J.morphColors,ue.morphTargetsCount=J.morphTargetsCount,ue.numClippingPlanes=J.numClippingPlanes,ue.numIntersection=J.numClipIntersection,ue.vertexAlphas=J.vertexAlphas,ue.vertexTangents=J.vertexTangents,ue.toneMapping=J.toneMapping}function dg(A,J){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;x.setFromMatrixPosition(J.matrixWorld);for(let ue=0,ie=A.length;ue<ie;ue++){let se=A[ue];if(se.texture!==null&&se.boundingBox.containsPoint(x))return se}return null}function fg(A,J,ue,ie,se){J.isScene!==!0&&(J=Z),$.resetTextureUnits();let Oe=J.fog,Be=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial?J.environment:null,Fe=xe===null?F.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:it.workingColorSpace,Ge=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial&&!ie.envMap||ie.isMeshPhongMaterial&&!ie.envMap,We=be.get(ie.envMap||Be,Ge),tt=ie.vertexColors===!0&&!!ue.attributes.color&&ue.attributes.color.itemSize===4,ot=!!ue.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),He=!!ue.morphAttributes.position,pt=!!ue.morphAttributes.normal,Ot=!!ue.morphAttributes.color,At=Gn;ie.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(At=F.toneMapping);let St=ue.morphAttributes.position||ue.morphAttributes.normal||ue.morphAttributes.color,Zt=St!==void 0?St.length:0,ke=V.get(ie),cn=T.state.lights;if(R===!0&&(N===!0||A!==he)){let wt=A===he&&ie.id===j;Pe.setState(ie,A,wt)}let ut=!1;ie.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==cn.state.version||ke.outputColorSpace!==Fe||se.isBatchedMesh&&ke.batching===!1||!se.isBatchedMesh&&ke.batching===!0||se.isBatchedMesh&&ke.batchingColor===!0&&se._colorsTexture===null||se.isBatchedMesh&&ke.batchingColor===!1&&se._colorsTexture!==null||se.isInstancedMesh&&ke.instancing===!1||!se.isInstancedMesh&&ke.instancing===!0||se.isSkinnedMesh&&ke.skinning===!1||!se.isSkinnedMesh&&ke.skinning===!0||se.isInstancedMesh&&ke.instancingColor===!0&&se.instanceColor===null||se.isInstancedMesh&&ke.instancingColor===!1&&se.instanceColor!==null||se.isInstancedMesh&&ke.instancingMorph===!0&&se.morphTexture===null||se.isInstancedMesh&&ke.instancingMorph===!1&&se.morphTexture!==null||ke.envMap!==We||ie.fog===!0&&ke.fog!==Oe||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==Pe.numPlanes||ke.numIntersection!==Pe.numIntersection)||ke.vertexAlphas!==tt||ke.vertexTangents!==ot||ke.morphTargets!==He||ke.morphNormals!==pt||ke.morphColors!==Ot||ke.toneMapping!==At||ke.morphTargetsCount!==Zt||!!ke.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(ut=!0):(ut=!0,ke.__version=ie.version);let Sn=ke.currentProgram;ut===!0&&(Sn=mo(ie,J,se),I&&ie.isNodeMaterial&&I.onUpdateProgram(ie,Sn,ke));let jn=!1,zi=!1,Hs=!1,vt=Sn.getUniforms(),Lt=ke.uniforms;if(b.useProgram(Sn.program)&&(jn=!0,zi=!0,Hs=!0),ie.id!==j&&(j=ie.id,zi=!0),ke.needsLights){let wt=dg(T.state.lightProbeGridArray,se);ke.lightProbeGrid!==wt&&(ke.lightProbeGrid=wt,zi=!0)}if(jn||he!==A){b.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),vt.setValue(y,"projectionMatrix",A.projectionMatrix),vt.setValue(y,"viewMatrix",A.matrixWorldInverse);let Hi=vt.map.cameraPosition;Hi!==void 0&&Hi.setValue(y,te.setFromMatrixPosition(A.matrixWorld)),M.logarithmicDepthBuffer&&vt.setValue(y,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&vt.setValue(y,"isOrthographic",A.isOrthographicCamera===!0),he!==A&&(he=A,zi=!0,Hs=!0)}if(ke.needsLights&&(cn.state.sunShadowMap.length>0&&vt.setValue(y,"sunShadowMap",cn.state.sunShadowMap,$),cn.state.directionalShadowMap.length>0&&vt.setValue(y,"directionalShadowMap",cn.state.directionalShadowMap,$),cn.state.spotShadowMap.length>0&&vt.setValue(y,"spotShadowMap",cn.state.spotShadowMap,$),cn.state.pointShadowMap.length>0&&vt.setValue(y,"pointShadowMap",cn.state.pointShadowMap,$)),se.isSkinnedMesh){vt.setOptional(y,se,"bindMatrix"),vt.setOptional(y,se,"bindMatrixInverse");let wt=se.skeleton;wt&&(wt.boneTexture===null&&wt.computeBoneTexture(),vt.setValue(y,"boneTexture",wt.boneTexture,$))}se.isBatchedMesh&&(vt.setOptional(y,se,"batchingTexture"),vt.setValue(y,"batchingTexture",se._matricesTexture,$),vt.setOptional(y,se,"batchingIdTexture"),vt.setValue(y,"batchingIdTexture",se._indirectTexture,$),vt.setOptional(y,se,"batchingColorTexture"),se._colorsTexture!==null&&vt.setValue(y,"batchingColorTexture",se._colorsTexture,$));let Gi=ue.morphAttributes;if((Gi.position!==void 0||Gi.normal!==void 0||Gi.color!==void 0)&&Q.update(se,ue,Sn),(zi||ke.receiveShadow!==se.receiveShadow)&&(ke.receiveShadow=se.receiveShadow,vt.setValue(y,"receiveShadow",se.receiveShadow)),(ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial)&&ie.envMap===null&&J.environment!==null&&(Lt.envMapIntensity.value=J.environmentIntensity),Lt.dfgLUT!==void 0&&(Lt.dfgLUT.value=Uy()),zi){if(vt.setValue(y,"toneMappingExposure",F.toneMappingExposure),ke.needsLights&&pg(Lt,Hs),Oe&&ie.fog===!0&&Te.refreshFogUniforms(Lt,Oe),Te.refreshMaterialUniforms(Lt,ie,me,le,T.state.transmissionRenderTarget[A.id]),ke.needsLights&&ke.lightProbeGrid){let wt=ke.lightProbeGrid;Lt.probesSH.value=wt.texture,Lt.probesMin.value.copy(wt.boundingBox.min),Lt.probesMax.value.copy(wt.boundingBox.max),Lt.probesResolution.value.copy(wt.resolution)}Fr.upload(y,Dd(ke),Lt,$)}if(ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(Fr.upload(y,Dd(ke),Lt,$),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&vt.setValue(y,"center",se.center),vt.setValue(y,"modelViewMatrix",se.modelViewMatrix),vt.setValue(y,"normalMatrix",se.normalMatrix),vt.setValue(y,"modelMatrix",se.matrixWorld),ie.uniformsGroups!==void 0){let wt=ie.uniformsGroups;for(let Hi=0,Vs=wt.length;Hi<Vs;Hi++){let Ud=wt[Hi];de.update(Ud,Sn),de.bind(Ud,Sn)}}return Sn}function pg(A,J){A.ambientLightColor.needsUpdate=J,A.lightProbe.needsUpdate=J,A.sunLights.needsUpdate=J,A.sunLightShadows.needsUpdate=J,A.directionalLights.needsUpdate=J,A.directionalLightShadows.needsUpdate=J,A.pointLights.needsUpdate=J,A.pointLightShadows.needsUpdate=J,A.spotLights.needsUpdate=J,A.spotLightShadows.needsUpdate=J,A.rectAreaLights.needsUpdate=J,A.hemisphereLights.needsUpdate=J}function mg(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return ce},this.getRenderTarget=function(){return xe},this.setRenderTargetTextures=function(A,J,ue){let ie=V.get(A);ie.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ie.__autoAllocateDepthBuffer===!1&&(ie.__useRenderToTexture=!1),V.get(A.texture).__webglTexture=J,V.get(A.depthTexture).__webglTexture=ie.__autoAllocateDepthBuffer?void 0:ue,ie.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,J){let ue=V.get(A);ue.__webglFramebuffer=J,ue.__useDefaultFramebuffer=J===void 0},this.setRenderTarget=function(A,J=0,ue=0){xe=A,oe=J,ce=ue;let ie=null,se=!1,Oe=!1;if(A){let Fe=V.get(A);if(Fe.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(y.FRAMEBUFFER,Fe.__webglFramebuffer),fe.copy(A.viewport),Ie.copy(A.scissor),De=A.scissorTest,b.viewport(fe),b.scissor(Ie),b.setScissorTest(De),j=-1;return}else if(Fe.__webglFramebuffer===void 0)$.setupRenderTarget(A);else if(Fe.__hasExternalTextures)$.rebindTextures(A,V.get(A.texture).__webglTexture,V.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let tt=A.depthTexture;if(Fe.__boundDepthTexture!==tt){if(tt!==null&&V.has(tt)&&(A.width!==tt.image.width||A.height!==tt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(A)}}let Ge=A.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Oe=!0);let We=V.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(We[J])?ie=We[J][ue]:ie=We[J],se=!0):A.samples>0&&$.useMultisampledRTT(A)===!1?ie=V.get(A).__webglMultisampledFramebuffer:Array.isArray(We)?ie=We[ue]:ie=We,fe.copy(A.viewport),Ie.copy(A.scissor),De=A.scissorTest}else fe.copy(Re).multiplyScalar(me).floor(),Ie.copy(je).multiplyScalar(me).floor(),De=U;if(ue!==0&&(ie=W),b.bindFramebuffer(y.FRAMEBUFFER,ie)&&b.drawBuffers(A,ie),b.viewport(fe),b.scissor(Ie),b.setScissorTest(De),se){let Fe=V.get(A.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_CUBE_MAP_POSITIVE_X+J,Fe.__webglTexture,ue)}else if(Oe){let Fe=J;for(let Ge=0;Ge<A.textures.length;Ge++){let We=V.get(A.textures[Ge]);y.framebufferTextureLayer(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0+Ge,We.__webglTexture,ue,Fe)}}else if(A!==null&&ue!==0){let Fe=V.get(A.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,Fe.__webglTexture,ue)}j=-1};function Fd(A){let J=V.get(A);return(J.__readFormat!==A.format||J.__readType!==A.type)&&(J.__readFormat=A.format,J.__readType=A.type,J.__formatReadable=M.textureFormatReadable(A.format),J.__typeReadable=M.textureTypeReadable(A.type)),J}this.readRenderTargetPixels=function(A,J,ue,ie,se,Oe,Be,Fe=0){if(!(A&&A.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=V.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Be!==void 0&&(Ge=Ge[Be]),Ge){b.bindFramebuffer(y.FRAMEBUFFER,Ge);try{let We=A.textures[Fe],tt=We.format,ot=We.type;A.textures.length>1&&y.readBuffer(y.COLOR_ATTACHMENT0+Fe);let He=Fd(We);if(He.__formatReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(He.__typeReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}J>=0&&J<=A.width-ie&&ue>=0&&ue<=A.height-se&&y.readPixels(J,ue,ie,se,Me.convert(tt),Me.convert(ot),Oe)}finally{let We=xe!==null?V.get(xe).__webglFramebuffer:null;b.bindFramebuffer(y.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(A,J,ue,ie,se,Oe,Be,Fe=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=V.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Be!==void 0&&(Ge=Ge[Be]),Ge)if(J>=0&&J<=A.width-ie&&ue>=0&&ue<=A.height-se){b.bindFramebuffer(y.FRAMEBUFFER,Ge);let We=A.textures[Fe],tt=We.format,ot=We.type;A.textures.length>1&&y.readBuffer(y.COLOR_ATTACHMENT0+Fe);let He=Fd(We);if(He.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(He.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let pt=y.createBuffer();y.bindBuffer(y.PIXEL_PACK_BUFFER,pt),y.bufferData(y.PIXEL_PACK_BUFFER,Oe.byteLength,y.STREAM_READ),y.readPixels(J,ue,ie,se,Me.convert(tt),Me.convert(ot),0),y.bindBuffer(y.PIXEL_PACK_BUFFER,null);let Ot=xe!==null?V.get(xe).__webglFramebuffer:null;b.bindFramebuffer(y.FRAMEBUFFER,Ot);let At=y.fenceSync(y.SYNC_GPU_COMMANDS_COMPLETE,0);return y.flush(),await dp(y,At,4),y.bindBuffer(y.PIXEL_PACK_BUFFER,pt),y.getBufferSubData(y.PIXEL_PACK_BUFFER,0,Oe),y.bindBuffer(y.PIXEL_PACK_BUFFER,null),y.deleteBuffer(pt),y.deleteSync(At),Oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,J=null,ue=0){let ie=Math.pow(2,-ue),se=Math.floor(A.image.width*ie),Oe=Math.floor(A.image.height*ie),Be=J!==null?J.x:0,Fe=J!==null?J.y:0;$.setTexture2D(A,0),y.copyTexSubImage2D(y.TEXTURE_2D,ue,0,0,Be,Fe,se,Oe),b.unbindTexture()},this.copyTextureToTexture=function(A,J,ue=null,ie=null,se=0,Oe=0){let Be,Fe,Ge,We,tt,ot,He,pt,Ot,At=A.isCompressedTexture?A.mipmaps[Oe]:A.image;if(ue!==null)Be=ue.max.x-ue.min.x,Fe=ue.max.y-ue.min.y,Ge=ue.isBox3?ue.max.z-ue.min.z:1,We=ue.min.x,tt=ue.min.y,ot=ue.isBox3?ue.min.z:0;else{let Lt=Math.pow(2,-se);Be=Math.floor(At.width*Lt),Fe=Math.floor(At.height*Lt),A.isDataArrayTexture?Ge=At.depth:A.isData3DTexture?Ge=Math.floor(At.depth*Lt):Ge=1,We=0,tt=0,ot=0}ie!==null?(He=ie.x,pt=ie.y,Ot=ie.z):(He=0,pt=0,Ot=0);let St=Me.convert(J.format),Zt=Me.convert(J.type),ke;J.isData3DTexture?($.setTexture3D(J,0),ke=y.TEXTURE_3D):J.isDataArrayTexture||J.isCompressedArrayTexture?($.setTexture2DArray(J,0),ke=y.TEXTURE_2D_ARRAY):($.setTexture2D(J,0),ke=y.TEXTURE_2D),b.activeTexture(y.TEXTURE0),b.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,J.flipY),b.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),b.pixelStorei(y.UNPACK_ALIGNMENT,J.unpackAlignment);let cn=b.getParameter(y.UNPACK_ROW_LENGTH),ut=b.getParameter(y.UNPACK_IMAGE_HEIGHT),Sn=b.getParameter(y.UNPACK_SKIP_PIXELS),jn=b.getParameter(y.UNPACK_SKIP_ROWS),zi=b.getParameter(y.UNPACK_SKIP_IMAGES);b.pixelStorei(y.UNPACK_ROW_LENGTH,At.width),b.pixelStorei(y.UNPACK_IMAGE_HEIGHT,At.height),b.pixelStorei(y.UNPACK_SKIP_PIXELS,We),b.pixelStorei(y.UNPACK_SKIP_ROWS,tt),b.pixelStorei(y.UNPACK_SKIP_IMAGES,ot);let Hs=A.isDataArrayTexture||A.isData3DTexture,vt=J.isDataArrayTexture||J.isData3DTexture;if(A.isDepthTexture){let Lt=V.get(A),Gi=V.get(J),wt=V.get(Lt.__renderTarget),Hi=V.get(Gi.__renderTarget);b.bindFramebuffer(y.READ_FRAMEBUFFER,wt.__webglFramebuffer),b.bindFramebuffer(y.DRAW_FRAMEBUFFER,Hi.__webglFramebuffer);for(let Vs=0;Vs<Ge;Vs++)Hs&&(y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,V.get(A).__webglTexture,se,ot+Vs),y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,V.get(J).__webglTexture,Oe,Ot+Vs)),y.blitFramebuffer(We,tt,Be,Fe,He,pt,Be,Fe,y.DEPTH_BUFFER_BIT,y.NEAREST);b.bindFramebuffer(y.READ_FRAMEBUFFER,null),b.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else if(se!==0||A.isRenderTargetTexture||V.has(A)){let Lt=V.get(A),Gi=V.get(J);b.bindFramebuffer(y.READ_FRAMEBUFFER,z),b.bindFramebuffer(y.DRAW_FRAMEBUFFER,G);for(let wt=0;wt<Ge;wt++)Hs?y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,Lt.__webglTexture,se,ot+wt):y.framebufferTexture2D(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,Lt.__webglTexture,se),vt?y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,Gi.__webglTexture,Oe,Ot+wt):y.framebufferTexture2D(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,Gi.__webglTexture,Oe),se!==0?y.blitFramebuffer(We,tt,Be,Fe,He,pt,Be,Fe,y.COLOR_BUFFER_BIT,y.NEAREST):vt?y.copyTexSubImage3D(ke,Oe,He,pt,Ot+wt,We,tt,Be,Fe):y.copyTexSubImage2D(ke,Oe,He,pt,We,tt,Be,Fe);b.bindFramebuffer(y.READ_FRAMEBUFFER,null),b.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else vt?A.isDataTexture||A.isData3DTexture?y.texSubImage3D(ke,Oe,He,pt,Ot,Be,Fe,Ge,St,Zt,At.data):J.isCompressedArrayTexture?y.compressedTexSubImage3D(ke,Oe,He,pt,Ot,Be,Fe,Ge,St,At.data):y.texSubImage3D(ke,Oe,He,pt,Ot,Be,Fe,Ge,St,Zt,At):A.isDataTexture?y.texSubImage2D(y.TEXTURE_2D,Oe,He,pt,Be,Fe,St,Zt,At.data):A.isCompressedTexture?y.compressedTexSubImage2D(y.TEXTURE_2D,Oe,He,pt,At.width,At.height,St,At.data):y.texSubImage2D(y.TEXTURE_2D,Oe,He,pt,Be,Fe,St,Zt,At);b.pixelStorei(y.UNPACK_ROW_LENGTH,cn),b.pixelStorei(y.UNPACK_IMAGE_HEIGHT,ut),b.pixelStorei(y.UNPACK_SKIP_PIXELS,Sn),b.pixelStorei(y.UNPACK_SKIP_ROWS,jn),b.pixelStorei(y.UNPACK_SKIP_IMAGES,zi),Oe===0&&J.generateMipmaps&&y.generateMipmap(ke),b.unbindTexture()},this.initRenderTarget=function(A){V.get(A).__webglFramebuffer===void 0&&$.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?$.setTextureCube(A,0):A.isData3DTexture?$.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?$.setTexture2DArray(A,0):$.setTexture2D(A,0),b.unbindTexture()},this.resetState=function(){oe=0,ce=0,xe=null,b.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};var Oy=i=>Math.atan2(Math.sin(i),Math.cos(i));function Tu(i,e,t){let n=0,s=1;for(let r=0;r<3;r++){let a=e[r]-i[r];if(Math.abs(a)<1e-8){if(i[r]<t.min[r]||i[r]>t.max[r])return!1}else{let o=(t.min[r]-i[r])/a,c=(t.max[r]-i[r])/a;if(n=Math.max(n,Math.min(o,c)),s=Math.min(s,Math.max(o,c)),n>s)return!1}}return s>=0&&n<=1}function wu(i,e,t){if(t.kind!==2||t.fuse!==0)return!1;let n=e[0]-i[0],s=e[2]-i[2],r=Math.max(0,Math.min(1,((t.position[0]-i[0])*n+(t.position[2]-i[2])*s)/(n*n+s*s||1)));return Math.hypot(i[0]+n*r-t.position[0],i[2]+s*r-t.position[2])<175}function Au(i,e,t,n,s,{strength:r=1,scoped:a=!1,position:o=null}={}){let c=i?.players[e];if(!r||!c?.alive||c.flash>0||i.phase!=="live")return null;let l=o||c.position,u=[l[0],l[1]+(c.crouch?37:56),l[2]],d=(a?2.8:r>1?8:5)*Math.PI/180,h=null;for(let f of i.players){if(!f.alive||f.team===c.team||f.hidden||!f.position)continue;let m=[f.position[0],f.position[1]+(f.crouch?28:40),f.position[2]],_=m[0]-u[0],g=m[1]-u[1],p=m[2]-u[2],S=Math.hypot(_,g,p);if(S<30||S>(a?1800:1e3))continue;let w=Oy(Math.atan2(-_,-p)-t),x=Math.atan2(g,Math.hypot(_,p))-n,E=Math.hypot(w*Math.cos(n),x);E>d||s.obstacles.some(T=>Tu(u,m,T))||i.utilities?.some(T=>wu(u,m,T))||(!h||E<h.error)&&(h={slot:f.slot,dyaw:w,dpitch:x,error:E,cone:d})}return h}function Zp(i,e,t=1){if(!i)return[0,0];let n=(t>1?.42:.25)*(i.cone<.06?.5:1)*Math.min(Math.max(e,0),.05),s=Math.hypot(i.dyaw,i.dpitch),r=Math.min(n,s*.18);return s?[i.dyaw/s*r,i.dpitch/s*r]:[0,0]}var ro={ally:"#69efff",enemy:"#ffae67"},$p={ally:"M5 4H19V12L12 20L5 12Z M8 9L12 13L16 9 M8 13L12 17L16 13",enemy:"M9 3L3 9V15L9 21 M15 3L21 9V15L15 21 M12 7L17 12L12 17L7 12Z"};function Ru(i){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><path d="${$p[i]}"/></svg>`}function Cu(i,e,t,n,s){i.save(),i.translate(t-s/2,n-s/2),i.scale(s/24,s/24);let r=new Path2D($p[e]);i.lineJoin="miter",i.strokeStyle="#07151f",i.lineWidth=4.5,i.stroke(r),i.strokeStyle=ro[e],i.lineWidth=1.8,i.stroke(r),i.restore()}function ky(i,e,t,n,s=[]){if(!e?.alive||e.flash>0||!i?.alive||i.hidden||!i.position||i.slot===e.slot)return!1;let r=[i.position[0],i.position[1]+(i.crouch?32:52),i.position[2]];return!n.obstacles.some(a=>Tu(t,r,a))&&!s.some(a=>wu(t,r,a))}function Qp(i,e=10){let t=Object.fromEntries(Object.keys(ro).map(c=>{let l=document.createElement("canvas");l.width=l.height=128,Cu(l.getContext("2d"),c,64,64,112);let u=new An(l);return u.colorSpace=Et,[c,new gr({map:u,transparent:!0,depthTest:!0,depthWrite:!1,toneMapped:!1,fog:!1})]})),n=Array.from({length:e},(c,l)=>{let u=new xa(t.ally);return u.name=`iff-${l}`,u.visible=!1,i.add(u),u}),s=new k;function r(){for(let c of n)c.visible=!1}function a(c,l,u,d,h,f){if(r(),!h||!l)return;u.updateMatrixWorld();let m=u.position.toArray(),_=Math.max(20,Math.min(36,d*.023));for(let g of c.players){let p=n[g.slot];if(!p||!ky(g,l,m,f,c.utilities))continue;p.position.fromArray(g.position),p.position.y+=g.crouch?57:85,s.copy(p.position).applyMatrix4(u.matrixWorldInverse);let S=-s.z;if(S<=u.near)continue;let w=_*2*S*Math.tan(as.degToRad(u.fov/2))/d;p.scale.set(w,w,1),p.material=t[g.team===l.team?"ally":"enemy"],p.visible=!0}}function o(){for(let c of n)i.remove(c);for(let c of Object.values(t))c.map.dispose(),c.dispose()}return{update:a,hide:r,dispose:o}}async function em({fetcher:i=fetch,wait:e=r=>new Promise(a=>setTimeout(a,r)),onRetry:t=()=>{},attempts:n=4,timeout:s=8e3}={}){let r;for(let a=0;a<n;a++)try{let o=await i("/games/botstrike/api/state",{signal:AbortSignal.timeout(s)});if(o.status===401||o.status===403){let c=Error("Open BotStrike through UTXOPlay to start your session.");throw c.permanent=!0,c}if(!o.ok){let c=Error("The squad service is temporarily unavailable.");throw c.permanent=o.status<500&&o.status!==429,c}return await o.json()}catch(o){if(r=o,o.permanent||a===n-1)throw o;t(a+1),await e(Math.min(4e3,500*2**a))}throw r}var Tl=class extends Es{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new nn;e.deleteAttribute("uv");let t=new Xt({side:Gt}),n=new Xt,s=new Pi(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ct(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new As(e,n,6),o=new Tt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let c=new ct(e,kr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new ct(e,kr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new ct(e,kr(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new ct(e,kr(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let h=new ct(e,kr(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let f=new ct(e,kr(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function kr(i){return new Oa({color:0,emissive:16777215,emissiveIntensity:i})}var ao=new k;function Rn(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;ao.copy(e),ao[n]=0,ao.normalize();let l=.5*a/(a+o),u=1-ao.angleTo(i)/c;return Math.sign(ao[t])===1?u*l:o/(a+o)+l+l*(1-u)}var wl=class i extends nn{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new k,l=new k,u=new k(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,h=this.attributes.normal.array,f=this.attributes.uv.array,m=d.length/6,_=new k,g=.5/a;for(let p=0,S=0;p<d.length;p+=3,S+=2)switch(c.fromArray(d,p),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),d[p+0]=u.x*Math.sign(c.x)+l.x*r,d[p+1]=u.y*Math.sign(c.y)+l.y*r,d[p+2]=u.z*Math.sign(c.z)+l.z*r,h[p+0]=l.x,h[p+1]=l.y,h[p+2]=l.z,Math.floor(p/m)){case 0:_.set(1,0,0),f[S+0]=Rn(_,l,"z","y",r,n),f[S+1]=1-Rn(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),f[S+0]=1-Rn(_,l,"z","y",r,n),f[S+1]=1-Rn(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),f[S+0]=1-Rn(_,l,"x","z",r,e),f[S+1]=Rn(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),f[S+0]=1-Rn(_,l,"x","z",r,e),f[S+1]=1-Rn(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),f[S+0]=1-Rn(_,l,"x","y",r,e),f[S+1]=1-Rn(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),f[S+0]=Rn(_,l,"x","y",r,e),f[S+1]=1-Rn(_,l,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};function nm(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new xt,l=0;for(let u=0;u<i.length;++u){let d=i[u],h=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(t){let u=0,d=[];for(let h=0;h<i.length;++h){let f=i[h].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+u);u+=i[h].attributes.position.count}c.setIndex(d)}for(let u in r){let d=tm(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(let u in a){let d=a[u][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<d;++h){let f=[];for(let _=0;_<a[u].length;++_)f.push(a[u][_][h]);let m=tm(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(m)}}}return c}function tm(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){let u=i[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}let a=new e(r),o=new Rt(a,t,n),c=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute){let d=c/t;for(let h=0,f=u.count;h<f;h++)for(let m=0;m<t;m++){let _=u.getComponent(h,m);o.setComponent(h+d,m,_)}}else a.set(u.array,c);c+=u.count*t}return s!==void 0&&(o.gpuType=s),o}function Pu(i,e){if(e===tu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Lr||e===eo){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Lr)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Al(i){let e=i.map(n=>n.index?n.toNonIndexed():n),t=nm(e,!1);if(e.forEach((n,s)=>{n!==i[s]&&n.dispose()}),!t)throw new Error("Incompatible BotStrike mesh attributes");return t}function By(i,e,t,n,s,r=80){let a=s+t/2+r,o=s+n/2+r;return Math.abs(i)<a&&Math.abs(e)<o&&(Math.abs(i)>Math.abs(e)?i=Math.sign(i||1)*a:e=Math.sign(e||1)*o),[i,e]}function im(i,{mobile:e=!1}={}){let t=[],n=[],s=new Map,r=2050,a=()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/4294967296);function o(U,D=512){let R=document.createElement("canvas");R.width=R.height=D,U(R.getContext("2d"),D);let N=new An(R);return N.colorSpace=Et,N.wrapS=N.wrapT=Zn,N.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),n.push(N),N}let c=o((U,D)=>{U.fillStyle="#c4c6c8",U.fillRect(0,0,D,D);for(let R=0;R<7500;R++){let N=150+a()*95|0;U.fillStyle=`rgb(${N},${N},${N})`;let H=a()*D,te=a()*D;U.fillRect(H,te,a()*3+.4,a()*1.4+.3)}for(let R=0;R<340;R++){let N=a()*D,H=a()*D;U.strokeStyle=R%3?"#7c8185":"#242b30",U.lineWidth=.5+a()*1.6,U.beginPath(),U.moveTo(N,H),U.lineTo(N+a()*25,H+a()*3),U.stroke()}for(let R=0;R<140;R++){let N=a()*D,H=a()*D;U.fillStyle=R%4?"#39434a":"#82949e",U.beginPath(),U.moveTo(N,H),U.lineTo(N+a()*7+1,H+1),U.lineTo(N+a()*4,H+a()*6+1),U.fill()}U.strokeStyle="#45494c",U.lineWidth=3,U.strokeRect(7,7,D-14,D-14),U.strokeStyle="#fff",U.lineWidth=1,U.strokeRect(10,10,D-20,D-20)}),l=o((U,D)=>{U.fillStyle="#8899a0",U.fillRect(0,0,D,D);for(let R=0;R<16e3;R++){let N=.04+a()*.14;U.fillStyle=`rgba(180,201,211,${N})`,U.fillRect(a()*D,a()*D,1,1)}U.strokeStyle="#506773",U.lineWidth=4,U.strokeRect(2,2,D-4,D-4);for(let R=0;R<12;R++)U.fillStyle="#536b77",U.fillRect(17+R*40,23,17,4),U.fillRect(17+R*40,D-27,17,4);for(let R=0;R<16;R++)U.fillStyle="#6e767c",U.beginPath(),U.arc(R%4*128+14,(R/4|0)*128+14,2,0,Math.PI*2),U.fill()});l.repeat.set(12,12);let u=o((U,D)=>{U.fillStyle="#b7bec1",U.fillRect(0,0,D,D);for(let R=0;R<3200;R++){let N=140+a()*90|0;U.fillStyle=`rgba(${N},${N+5},${N+8},.22)`,U.fillRect(a()*D,a()*D,.4+a()*2,.4+a()*1.2)}for(let R=0;R<150;R++){U.strokeStyle=R%3?"#8f9ba0":"#d9ddda",U.lineWidth=.4+a()*.6,U.beginPath();let N=a()*D,H=a()*D;U.moveTo(N,H),U.lineTo(N+3+a()*24,H+a()*1.4),U.stroke()}},256);function d(U,D={}){let R=new Xt({color:U,roughness:.44,metalness:.72,map:c,bumpMap:c,bumpScale:.12,...D,...e?{bumpMap:null}:{}});return t.push(R),R}let h={steel:d("#747e87"),black:d("#111b24",{roughness:.66}),rubber:d("#14171d",{metalness:.1,roughness:.88}),silver:d("#acb5be",{roughness:.27}),warm:d("#bd7651"),hull:d("#607985"),container:d("#478d9b"),floor:d("#829aa3",{map:l,bumpMap:l,bumpScale:.08,roughness:.94,metalness:.1,envMapIntensity:.2}),gunmetal:d("#5b737b",{map:u,bumpMap:u,bumpScale:.03,roughness:.4,metalness:.72}),gunShell:d("#9faeac",{map:u,bumpMap:u,bumpScale:.02,roughness:.53,metalness:.42})},f=["#d4ddd5","#318f9a","#d78453","#b4a9c9","#d9b957","#5d7f9d"].map(U=>d(U,{metalness:.32,roughness:.58})),m=d("#dce6df",{metalness:.18,roughness:.64}),_=d("#234c75",{metalness:.55,roughness:.27}),g=d("#4b8e66",{metalness:0,roughness:.85}),p=d("#57483b",{metalness:0,roughness:.94}),w=["#139fb7","#d3dfd7","#c08b2b","#684e97","#aa346e","#c46122"].map(U=>d(U)),x=["#47edff","#76ffba","#ffb733","#bc70ff","#ff4dad","#ff8b2b"].map(U=>d(U,{map:null,bumpMap:null,emissive:U,emissiveIntensity:1.7,roughness:.25,metalness:.15})),E=["#33ccff","#ff7550"].map(U=>d(U,{map:null,bumpMap:null,emissive:U,emissiveIntensity:2.2})),T=x[5],P=x[0],v=o((U,D)=>{let R=U.createRadialGradient(D/2,D/2,0,D/2,D/2,D/2);R.addColorStop(0,"rgba(0,0,0,.48)"),R.addColorStop(.55,"rgba(0,0,0,.2)"),R.addColorStop(1,"rgba(0,0,0,0)"),U.fillStyle=R,U.fillRect(0,0,D,D)},64),L=new It({map:v,transparent:!0,depthWrite:!1});t.push(L);function F(U,D,R,N=0,H=0,te=0){let _e=new ct(D,R);return _e.position.set(N,H,te),_e.castShadow=!R.isMeshBasicMaterial,_e.receiveShadow=!0,U.add(_e),_e}function C(U,D,R,N,H,te,_e,Z=h.steel,O=Math.min(D,R,N)*.13){if(w.includes(Z)&&D>6&&R>6){let K=Math.min(D,R)*.18,y=new Si;y.moveTo(-D/2+K,R/2),y.lineTo(D/2-K,R/2),y.lineTo(D/2,R/2-K),y.lineTo(D*.44,-R/2+K),y.lineTo(D*.3,-R/2),y.lineTo(-D*.3,-R/2),y.lineTo(-D*.44,-R/2+K),y.lineTo(-D/2,R/2-K),y.closePath();let ee=new Er(y,{depth:N-.7,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.35,bevelThickness:.35});ee.translate(0,0,-(N-.7)/2);let re=ee.getAttribute("uv");for(let M=0;M<re.count;M++)re.setXY(M,re.getX(M)/D+.5,re.getY(M)/R+.5);return F(U,ee,Z,H,te,_e)}return F(U,new wl(D,R,N,1,Math.min(O,D/3,R/3,N/3)),Z,H,te,_e)}function I(U,D,R,N,H,te,_e,Z){return F(U,new nn(D,R,N),Z,H,te,_e)}function W(U,D,R,N,H,te,_e=h.steel,Z=10){return F(U,new $i(D,D,R,Z),_e,N,H,te)}function z(U,D,R,N,H,te){return F(U,new Qi(D,10,6),te,R,N,H)}function G(U,D,R,N,H=h.steel){let te=new k(...D),_e=new k(...R),Z=_e.clone().sub(te),O=W(U,N,Z.length(),...te.add(_e).multiplyScalar(.5).toArray(),H,8);return O.quaternion.setFromUnitVectors(new k(0,1,0),Z.normalize()),O}function oe(U,D,R=.8,N=h.rubber){return F(U,new Ua(new Mr(D.map(H=>new k(...H))),12,R,5,!1),N)}function ce(U,D,R,N,H,te){let _e=new Si;_e.moveTo(0,0),_e.lineTo(5*H,9),_e.lineTo(11*H,19),_e.lineTo(7*H,3),_e.closePath();let Z=new Er(_e,{depth:2,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.4,bevelThickness:.4});return F(U,Z,te,D,R,N)}function xe(U,D,R,N,H,te){for(let _e of[-1,1])for(let Z of[-1,1]){let O=W(U,.65,.45,N+_e*D*.37,H+Z*R*.36,te,h.silver,6);O.rotation.x=Math.PI/2}}function j(U,D,R,N,H,te){C(U,D,R,.5,N,H,te,h.black,.1);for(let _e=0;_e<4;_e++)I(U,D*.83,.35,.65,N,H-R*.3+_e*R*.2,te-.3,h.steel)}function he(U){U.updateMatrixWorld(!0);let D=U.matrixWorld.clone().invert(),R=new Map,N=[];U.traverse(H=>{if(!H.isMesh)return;let te=H.geometry.clone().applyMatrix4(D.clone().multiply(H.matrixWorld)),_e=H.material;if(e&&!_e.transparent&&(_e.map===c||!_e.map)&&_e.isMeshStandardMaterial){let Z=_e.emissiveIntensity>1&&_e.emissive?.getHex()!==0,O=Z?"glow":"metal";if(!s.has(O)){let ee=Z?new It({vertexColors:!0,toneMapped:!1}):new Xt({vertexColors:!0,map:c,roughness:.58,metalness:.4});s.set(O,ee),t.push(ee)}let K=new Float32Array(te.attributes.position.count*3),y=_e.color;for(let ee=0;ee<K.length;ee+=3)K[ee]=y.r,K[ee+1]=y.g,K[ee+2]=y.b;te.setAttribute("color",new Rt(K,3)),_e=s.get(O)}R.has(_e)||R.set(_e,[]),R.get(_e).push(te),N.push(H)});for(let H of N)H.removeFromParent(),H.geometry.dispose();for(let[H,te]of R){let _e=Al(te);F(U,_e,H),te.forEach(Z=>Z.dispose())}}function fe(U,D=2){let R=new dt;U.add(R);let N=[16,24,33,48,30,35,31,43,29,42,26,40][D],H=x[[0,1,0,3,5,2,1,5,4,3,1,4][D]],te=D===0?null:new dt;te&&(te.name="stock",R.add(te)),C(R,5,5.5,N,0,0,0,h.black,.65),C(R,6.3,5.1,N*.46,0,.35,-N*.25,h.gunmetal,.55),C(R,7.1,6.1,N*.34,0,.15,N*.17,h.gunShell,.65),C(R,5.7,1.3,N*.65,0,3.65,-N*.07,h.gunmetal,.3);for(let y of[-1,1]){I(R,.35,2.7,N*.43,y*3.18,.7,-N*.25,h.gunShell);for(let ee=0;ee<4;ee++)I(R,.45,1.3,2.7,y*3.42,.7,-N*.41+ee*N*.095,h.black);te&&(G(te,[y*2,-2,N*.31],[y*2,-2,N*.5+5],.55,h.gunmetal),G(te,[y*2,-2,N*.5+5],[y*2,2,N*.5+5],.55,h.gunmetal))}I(R,.3,2.5,5.5,3.72,.6,N*.15,h.black),I(R,.45,.45,3.5,3.96,1.8,N*.15,h.silver),te&&C(te,D===1?5.3:6.3,D===1?5.8:7.2,D===1?1.8:2.2,0,-.2,N*.5+6,h.rubber,.65);let _e=C(R,3.5,9,5.2,0,-6.3,3,h.rubber,.4);_e.rotation.x=-.22;for(let y=0;y<4;y++)I(R,3.7,.3,.6,0,-4.1-y*1.5,5.7,h.gunmetal);G(R,[-2,-3,-1],[-2,-9,-1],.42,h.steel),G(R,[-2,-9,-1],[-2,-9,3],.42,h.steel);let Z=new dt;Z.name="magazine",Z.position.set(0,-6,-5),Z.rotation.x=.12,R.add(Z),C(Z,3.6,8,5.2,0,0,0,h.gunmetal,.35),C(Z,4,1.3,5.7,0,-4,.2,h.black,.2);for(let y=0;y<3;y++)I(Z,.25,.4,3.8,1.9,2-y*1.7,0,h.silver);let O=W(R,1.2,12,0,1,-N*.5-5,h.black);O.rotation.x=Math.PI/2;let K=W(R,1.9,3,0,1,-N*.5-11,h.steel);K.rotation.x=Math.PI/2;for(let y of[-N*.5-2,-N*.5-8]){let ee=W(R,1.65,1.1,0,1,y,h.gunmetal,12);ee.rotation.x=Math.PI/2}C(R,3.2,.7,N*.49,0,4.5,-N*.12,h.black,.2);for(let y=0;y<8;y++)I(R,3.4,.38,.8,0,4.95,-N*.34+y*N*.062,h.steel);if(I(R,.28,.6,N*.36,3.66,2.5,-N*.23,H),C(R,1,2.5,4,3.8,1,N*.25,h.warm,.2),D===3||D===9){let y=W(R,2.6,15,0,9,-2,h.black,14);y.rotation.x=Math.PI/2;for(let re of[-10,6]){let M=W(R,3.2,2,0,9,re,h.steel,14);M.rotation.x=Math.PI/2}let ee=W(R,2.4,.3,0,9,7.2,x[3],16);ee.rotation.x=Math.PI/2,G(R,[0,4,-6],[0,8,-6],1.2)}else C(R,2.3,2.5,3,0,6.2,-4,h.black,.3),I(R,1.3,.6,.4,0,7,-2.3,P);if(D===5){for(let y of[-1,1])for(let ee=0;ee<3;ee++)C(R,1,2,6,y*3.2,2,-9+ee*8,ee===1?H:h.steel,.2);C(R,7,5,9,0,-2,10,h.hull,.6)}if(D===6||D===8||D===11){for(let y=0;y<4;y++){let ee=F(R,new Ei(D===11?4:3,.55,6,16),y%2?h.silver:H,0,1,-10-y*4);ee.rotation.z=y*.4}for(let y of[-1,1])C(R,2,3,22,y*4,1,-13,h.steel,.5),I(R,.4,1,16,y*5.1,1,-13,H);C(R,4,5,8,0,0,9,H,.5)}if(D===7){C(R,12,10,13,0,-4,7,h.black,1);for(let y of[-1,1]){let ee=W(R,6.5,5,y*7,-4,7,h.steel,16);ee.rotation.z=Math.PI/2}for(let y=0;y<6;y++){let ee=y*Math.PI/3,re=Math.cos(ee)*3,M=1+Math.sin(ee)*3,b=W(R,.8,24,re,M,-26,h.black,10);b.rotation.x=Math.PI/2}for(let y of[-17,-32]){let ee=W(R,4.4,2,0,1,y,h.steel,16);ee.rotation.x=Math.PI/2}I(R,1,1,12,3.5,3,7,H)}if(D===9){C(R,5,2,24,0,-3,-15,h.steel,.3);for(let y of[-1,1])G(R,[y*2,-3,-16],[y*5,-12,-23],.65,h.black)}if(D===10){for(let y of[-1,1]){W(R,2,12,y*4,0,3,H,12);for(let ee of[-6,6])W(R,2.4,1.2,y*4,ee,3,h.steel,12);oe(R,[[y*4,6,3],[y*6,8,-5],[y*3,4,-13]],.6,h.black)}C(R,6,2,14,0,5,4,h.hull,.4)}if(D===11){for(let y of[-1,1])C(R,3,7,26,y*5,0,-20,h.hull,.6),I(R,.4,4,21,y*6.6,0,-20,H);z(R,4.2,0,1,-9,H),C(R,9,9,12,0,-2,12,h.black,1)}if(D===4){let y=new dt;y.name="pump",R.add(y),C(R,8.7,3.4,19,0,2.9,-12,h.gunmetal,.65);for(let M of[-1,1]){for(let V=0;V<5;V++)I(R,.45,1.3,2,M*4.55,3,-19+V*3.4,h.black);let b=W(R,1.25,19,M*2.4,-1.35,-14,h.black,12);b.rotation.x=Math.PI/2;let B=W(R,1.55,1,M*2.4,-1.35,-23.8,h.silver,12);B.rotation.x=Math.PI/2;for(let V=0;V<5;V++)I(y,.6,2.2,.75,M*4.9,-3.4,-16+V*2.2,h.steel)}C(y,9.5,3.3,13,0,-3.4,-11,h.rubber,.7),C(R,.6,2.7,6,3.85,.4,6,h.black,.2),I(R,.65,.45,4,4.2,1.25,6,h.silver);let ee=W(R,3.4,5,0,1,-N*.5-10,h.gunmetal,16);ee.rotation.x=Math.PI/2;let re=W(R,2.8,.3,0,1,-N*.5-12.7,h.black,16);re.rotation.x=Math.PI/2,F(R,new Ei(2.85,.45,6,16),h.silver,0,1,-N*.5-13)}if(D===0){C(R,8.6,6.2,10,0,.4,-2,h.gunmetal,.8);for(let y of[-1,1]){C(R,1.2,5.6,11,y*4.8,.5,-2,h.warm,.3);let ee=W(R,1.8,7,y*5.3,2,-2,h.black,12);ee.rotation.x=Math.PI/2;for(let re of[-5,1]){let M=W(R,2.1,.75,y*5.3,2,re,H,12);M.rotation.x=Math.PI/2}I(R,.6,.7,8,y*2.8,4.8,-3,H),I(R,1,2,1.1,y*2.5,7,-2.5,h.black)}}if(D===1){C(R,4.5,4.2,19,0,1,-10,h.black,.5);for(let ee of[-1,1]){C(R,1,4.5,19,ee*4,1,-10,h.gunShell,.25),I(R,.5,.65,14,ee*4.65,3,-11,H);for(let re=0;re<4;re++)I(R,.7,1.7,.8,ee*4.65,.5,-17+re*3.8,h.black)}let y=W(R,2,10,0,1,-18,h.gunmetal,12);y.rotation.x=Math.PI/2;for(let ee of[-20,-16]){let re=W(R,2.25,.7,0,1,ee,h.silver,12);re.rotation.x=Math.PI/2}I(R,1,3,1,0,7.2,-2.5,H)}return R}function Ie(U,D,R=D===3?3:D===0?1:2){let N=new dt,H=new dt,te=new dt,_e=[],Z=[];N.name=`hero-${D}-slot-${U}`,N.add(H,te);let O=w[D],K=x[D],y=D===2?1.22:D===0?.83:D===5?1.08:1;W(H,5,24,0,34,1,h.black);for(let M=0;M<4;M++)C(H,15*y,3,13,0,27+M*4,1,h.steel,.5);C(H,26*y,20,16,0,46,1,h.black,2);for(let M of[-1,1]){let b=C(H,13*y,15,5,M*7*y,47,-9,O,1.4);b.rotation.z=M*-.12,xe(H,11*y,12,M*8*y,47,-12),C(H,5,13,12,M*15*y,43,1,O,.8),oe(H,[[M*12,52,8],[M*16,55,13],[M*18,44,14],[M*12,34,9]],1.15)}C(H,11,6,3,0,37,-10,O,.8),j(H,9,5,0,44,-12.6),I(H,8,1,1,0,53,-12,K),C(H,22*y,8,15,0,31,0,h.black,1);for(let M of[-1,1])C(H,9*y,8,4,M*6*y,31,-8,O,.7).rotation.z=M*.12;C(H,20,23,9,0,44,14,h.black,1.4),C(H,16,18,2,0,44,19,O,.7),j(H,9,8,0,44,20.3),I(H,12,2,1,0,53,20.2,E[Math.floor(U/5)]),te.position.y=64,te.scale.setScalar(D===2?.75:.65),W(te,5,7,0,-10,0,h.steel),C(te,20*y,17,18,0,0,0,O,2),C(te,19*y,8,3,0,0,-9,h.black,.7),C(te,16*y,2.3,1,0,0,-11,K,.3),C(te,12,5,6,0,-7,-7,h.black,.7);for(let M of[-1,1]){C(te,3.5,9,5,M*9*y,-4,-7,O,.6);let b=W(te,3.7,3,M*11*y,0,0,h.black,12);b.rotation.z=Math.PI/2;let B=W(te,2.3,3.3,M*11*y,0,0,h.steel,12);B.rotation.z=Math.PI/2,xe(te,17*y,14,0,0,9.2)}C(te,11,2,9,0,9,0,h.steel,.4);for(let M of[-1,1]){C(te,2,5,4,M*7,-5,-10,h.steel,.3).rotation.z=M*.25;let b=W(te,.7,.4,M*6,6,-9.7,h.silver,6);b.rotation.x=Math.PI/2}if(D===0)for(let M of[-1,1])ce(te,M*8,5,0,M,O),ce(H,M*16,49,5,M,O),C(H,4,19,15,M*14,44,13,h.black,.6),I(H,2,8,1,M*14,47,21,K);if(D===1){for(let M of[-1,1])C(H,7,24,9,M*9,43,18,O,1.2),I(H,2,13,1,M*9,44,23,K);I(H,3,10,1,0,48,-13,K),I(H,9,3,1,0,48,-13.2,K)}if(D===2){C(H,34,8,22,0,55,1,O,1.4);for(let M of[-1,1])C(H,16,16,25,M*23,52,0,O,2),C(H,15,7,22,M*23,43,0,h.steel,1),xe(H,13,12,M*23,52,-13),oe(H,[[M*14,57,2],[M*19,64,8],[M*25,59,10],[M*27,50,8]],1.4)}if(D===3){C(te,21,12,5,0,1,-10,h.black,1);let M=W(te,5,3,5,1,-13,h.steel,16);M.rotation.x=Math.PI/2;let b=W(te,3.7,3.4,5,1,-13,K,18);b.rotation.x=Math.PI/2,C(te,6,3,2,-6,0,-13,K,.5),G(H,[-9,47,17],[-9,77,17],1.2,h.black),C(H,4,18,4,-9,68,17,O,.5)}if(D===4){for(let M of[-1,1])G(te,[M*8,5,0],[M*10,25,1],.7,h.steel),I(te,1,6,1,M*10,23,1,K);C(H,9,10,2,0,45,-13,h.black,.5);for(let M=0;M<3;M++)I(H,6,.6,.5,0,42+M*2,-14.2,K)}if(D===5)for(let M of[-1,1]){W(H,4.4,29,M*10,49,17,h.black,14);for(let b of[36,45,58,63])W(H,5.2,2,M*10,b,17,b===58?K:h.steel,14);W(H,3.5,6,M*10,63,17,K,14),oe(H,[[M*10,34,17],[M*16,29,17],[M*17,35,9]],1.2)}for(let M of[-1,1]){let Y=function(ge,Te,ve,Se){let Pe=new k(...Te).sub(new k(...ge)),Le=Pe.length(),ze=new dt;return ze.position.fromArray(ge),ze.quaternion.setFromUnitVectors(new k(0,-1,0),Pe.normalize()),H.add(ze),W(ze,2,Le,0,-Le/2,0,h.silver),C(ze,ve,Math.min(13,Le*.7),Se,0,-Le*.48,-1,O,.6),G(ze,[ve*.45,-2,2],[ve*.45,-Le+2,2],.8,h.silver),j(ze,ve*.65,4,0,-Le*.4,-Se*.5-1.4),ze},b=new dt;b.position.set(M*7.5,31,0),N.add(b),z(b,4.2,0,-1,0,h.black),G(b,[0,-2,0],[0,-13,0],2,h.silver),C(b,9*y,14,10,0,-8,0,O,1);let B=W(b,3.7,12*y,0,-17,0,h.black);B.rotation.z=Math.PI/2,C(b,8*y,6,3,0,-17,-6,O,.6),C(b,7*y,13,8,0,-24,0,O,.7),G(b,[M*4,-17,2],[M*4,-29,2],.8,h.silver),C(b,10*y,5,17,0,-30,-4,h.black,.8),C(b,9*y,3,10,0,-28,-7,O,.7),I(b,5,.8,.5,0,-22,-5,K);for(let ge of[-1,1])C(b,2,11,6,ge*4.2,-8,0,h.black,.4),G(b,[ge*3.6,-19,2],[ge*3.6,-28,2],.65,h.silver);for(let ge=0;ge<3;ge++)C(b,2.2,2,5,-2.5+ge*2.5,-28.6,-11,O,.3);he(b),_e.push(b);let V=[M*(D===2?25:18)*y,49,0],$=[M*16*y,34,-15],be=M===1?[0,34,-21]:[0,35,-31];z(H,4.2,...V,h.black);let X=C(H,11*y,8,14,...V,O,1);X.rotation.z=M*-.18,Y(V,$,7*y,8),z(H,3.5,...$,h.black),Y($,be,8*y,9);let q=new dt;q.position.fromArray(be),H.add(q),C(q,6,4,6,0,0,0,h.black,.6),C(q,5,1.3,5,0,2,0,O,.3);for(let ge=0;ge<4;ge++){let Te=-2.1+ge*1.4;C(q,1.1,3,2,Te,-2,-2.5,h.steel,.2),C(q,1.1,1.3,3,Te,-3.7,-1.4,h.black,.2)}C(q,1.4,3.5,2,3,-1,0,h.steel,.3)}let ee=fe(H,R);ee.position.set(0,40,-24),ee.rotation.x=0,ee.rotation.y=0,he(H),he(te),N.traverse(M=>{M.castShadow=!1});let re=F(N,new vn(48*y,44),L,0,.24,0);return re.rotation.x=-Math.PI/2,re.castShadow=!1,{rig:N,torso:H,head:te,legs:_e,hero:D,slot:U,weapon:R}}function De(U,D=0){let R=new dt;fe(R,U).scale.setScalar(1.1);for(let H of[-1,1])C(R,6,6,15,H===1?4:-5,-9,H===1?10:-3,w[D],1),C(R,5,5,7,H===1?3:-4,-6,H===1?5:-9,h.black,.6);return he(R),R.traverse(H=>{H.castShadow=!1}),R.position.set(9,-9,-23),R.scale.setScalar(.55),R}function rt(U){let D=new dt,R=x[[2,0,3,5,4,3,1,2,0,5,1,0][U]];if(U===0){for(let N of[-1,1])C(D,11,23,4,N*5.8,0,0,w[2],1);C(D,18,8,5,0,-12,0,h.black,1);for(let N of[-1,1])xe(D,8,18,N*6,0,-2.4),I(D,6,.6,.3,N*6,6,-2.7,R)}else if(U===6||U===11){W(D,4,21,0,0,0,h.black,16),W(D,3.4,15,0,0,0,R,16);for(let N of[-11,10])W(D,4.5,3,0,N,0,h.steel,16);for(let N of[-1,1])C(D,2,17,3,N*3.6,0,0,h.hull,.4);if(U===6)W(D,.4,7,0,-16,0,h.silver,8),C(D,12,2,4,0,13,0,h.black,.3);else for(let N of[-1,1])W(D,1,5,N*2.2,13,0,h.silver,8)}else if(U===7||U===8||U===9){C(D,15,19,4,0,0,0,h.black,.8),C(D,12,16,1,0,0,-2.6,U===7?w[2]:h.hull,.3);for(let N=0;N<4;N++){I(D,8,.7,.5,0,-5+N*3,-3.3,R);for(let H of[-1,1])I(D,2,1.2,2,H*8,-6+N*4,0,h.silver)}xe(D,12,16,0,0,-3)}else if(U===5||U===10){C(D,13,6,13,0,0,0,h.hull,1),z(D,4,0,4,0,R);for(let N of[-1,1])G(D,[N*4,0,0],[N*12,-5,N*7],1.2,h.steel),C(D,7,2,8,N*12,-5,N*7,h.black,.4),G(D,[N*4,0,0],[N*12,-5,-N*7],1.2,h.steel),C(D,7,2,8,N*12,-5,-N*7,h.black,.4);G(D,[0,5,0],[0,18,0],.7,h.steel),z(D,1.2,0,18,0,R)}else{W(D,5,18,0,0,0,h.black,12);for(let N of[-9,-4,4,9])W(D,5.4,1.3,0,N,0,N===-4||N===4?R:h.steel,12);for(let N=0;N<6;N++){let H=N*Math.PI/3;C(D,2.1,12,2.1,Math.cos(H)*4.6,0,Math.sin(H)*4.6,h.hull,.4)}C(D,5,4,5,0,11,0,h.steel,.4),G(D,[2,12,0],[6,6,0],.8,h.silver)}return he(D),D}function Ze(U){let D=new dt,R=fe(D,U),N=R.getObjectByName("magazine"),H=R.getObjectByName("stock"),te=R.getObjectByName("pump");return N?.removeFromParent(),H?.removeFromParent(),te?.removeFromParent(),he(D),N&&(D.add(N),D.userData.magazineName="magazine"),H&&(he(H),D.add(H)),te&&(he(te),D.add(te)),D}let Je=new Map;function le(U,D="#8deaff",R=512,N=128){let H=JSON.stringify([U,D,R,N]);if(Je.has(H))return Je.get(H);let te=document.createElement("canvas");te.width=R,te.height=N;let _e=te.getContext("2d");_e.fillStyle="#09141c",_e.fillRect(0,0,R,N),_e.fillStyle=D,_e.font="700 54px monospace",_e.textAlign="center",_e.textBaseline="middle",_e.fillText(U,R/2,N/2),_e.globalAlpha=.6,_e.fillRect(10,10,R-20,3),_e.fillRect(10,N-13,R-20,3);let Z=new An(te);Z.colorSpace=Et,n.push(Z);let O=new Xt({map:Z,emissiveMap:Z,emissive:D,emissiveIntensity:1.3,roughness:.5,metalness:.1,side:rn});return t.push(O),Je.set(H,O),O}function me(U,D,R,N,H,te=100,_e=24,Z="#85eaff",O=0){let K=F(U,new vn(te,_e),le(D,Z),R,N,H);return K.rotation.y=O,K}for(let U of["metal","glow"])if(e&&!s.has(U)){let D=U==="glow"?new It({vertexColors:!0,toneMapped:!1}):new Xt({vertexColors:!0,map:c,roughness:.58,metalness:.4});s.set(U,D),t.push(D)}let we=t.length,Ve=n.length;function Re(U,D,R){Je.clear();for(let Z of t.splice(we))Z.dispose();for(let Z of n.splice(Ve))Z.dispose();r=2050+R;let N=D.extent,H=R===0?["#367283","#a7b9b5","#ab7655","#bd9d52","#50636b"].map(Z=>d(Z,{metalness:.48,roughness:.66})):null,te=R===0?d("#718a91",{map:l,bumpMap:l,bumpScale:.06,roughness:.86,metalness:.16,envMapIntensity:.3}):h.floor;if(I(U,N*2+40,10,N*2+40,0,-5,0,te),R===0){let Z=o((re,M)=>{re.fillStyle="#93b7bb",re.fillRect(0,0,M,M);for(let b=0;b<1500;b++){let B=a()*M,V=a()*M;re.fillStyle=b%5?"#a4c4c6":"#bfd1cd",re.fillRect(B,V,5+a()*31,.5+a()*1.4)}},256);Z.repeat.set(27,27);let O=new It({color:"#79a1a7",map:Z});t.push(O);let K=F(U,new vn(24e3,24e3),O,0,-61,0);K.rotation.x=-Math.PI/2,K.castShadow=K.receiveShadow=!1;for(let re of[-1,1])for(let M=-N+140;M<N-100;M+=130)I(U,70,.15,4,re*(N-145),.16,M,h.warm),I(U,18,.15,4,re*(N-185),.16,M,h.black);let y=d("#a89677",{map:null,bumpMap:null,metalness:0,roughness:1}),ee=new Si;ee.moveTo(-40,0),ee.lineTo(0,-16),ee.lineTo(0,-6),ee.lineTo(40,-6),ee.lineTo(40,6),ee.lineTo(0,6),ee.lineTo(0,16),ee.closePath();for(let re=0;re<2;re++){let M=re===0?-1:1,b=D.spawns[re][0],B=-Math.sign(b[2]),V=F(U,new Fa(ee),y,b[0],.22,b[2]+B*205);V.rotation.x=-Math.PI/2,V.scale.x=re===0?1:-1,V.castShadow=!1;for(let $=0;$<7;$++)I(U,4,.12,32,M*(N-65),.18,b[2]+B*(110+$*75),y).castShadow=!1}}for(let Z=-N+80;Z<N;Z+=160)for(let O of[-1,1])I(U,35,.18,5,O*(N-65),.12,Z,h.warm),I(U,35,.18,5,O*(N-65),.12,Z+16,h.warm);D.obstacles.forEach((Z,O)=>{let K=Z.max[0]-Z.min[0],y=Z.max[1],ee=Z.max[2]-Z.min[2],re=(Z.min[0]+Z.max[0])/2,M=(Z.min[2]+Z.max[2])/2,b=R===0?H[O%H.length]:f[(O+R*2)%f.length],B=Z.kind==="cover"?R===0?["cargo","cargo","service"][O%3]:["cargo","service","planter"][O%3]:Z.kind;if(B==="planter"){I(U,K,y-22,ee,re,(y-22)/2,M,b);for(let V of[-1,1])I(U,K,22,8,re,y-11,M+V*(ee/2-4),b),I(U,8,22,ee,re+V*(K/2-4),y-11,M,b)}else I(U,K,y,ee,re,y/2,M,b);for(let V of[-1,1]){let $=M+V*(ee/2+.08);for(let X=-K/2+8;X<K/2-5;X+=16)I(U,2.5,y-12,.6,re+X,y/2,$,h.steel);I(U,K-8,5,.8,re,5,$,h.black),I(U,K-8,4,.8,re,y-4,$,h.black),I(U,K-16,1.3,1,re,y-10,$,O%3?P:T);let be=me(U,`${R===0?"NDC":R===1?"SKY":"RX9"} / ${String(O+1).padStart(2,"0")}`,re,y*.59,$+V*.7,Math.min(K*.55,98),Math.min(23,y*.24),O%3?"#8be7f1":"#ffb56f",V<0?Math.PI:0);for(let X of[-1,1])I(U,4,Math.min(24,y*.3),1,re+X*(K*.5-12),y*.3,$,h.warm)}for(let V of[-1,1]){let $=re+V*(K/2+.1);for(let be=-ee/2+12;be<ee/2-5;be+=22)I(U,.6,y-12,2.5,$,y/2,M+be,h.black);I(U,1,1.3,ee-12,$,y-10,M,P)}for(let V=-K/2+12;V<K/2-4;V+=24)I(U,2,.5,ee-8,re+V,y-.3,M,h.steel);for(let V of[-1,1]){let $=M+V*(ee/2+.2);if(B==="service"){I(U,K*.65,y*.66,.5,re,y*.52,$,m),I(U,K*.38,y*.22,.7,re,y*.61,$+V*.3,_);for(let be=0;be<5;be++)I(U,K*.38,1,.8,re,y*.31+be*4,$+V*.3,h.black);me(U,O%2?"POWER / 98%":"RELAY / ONLINE",re,y*.64,$+V*.8,Math.min(110,K*.43),12,"#a6eeeb",V<0?Math.PI:0)}else if(B==="barricade"){I(U,K*.85,y*.54,.5,re,y*.48,$,m);for(let be=-K*.35;be<=K*.35;be+=28)I(U,12,5,.8,re+be,y*.7,$+V*.3,T)}else B==="cargo"&&(I(U,K*.28,y*.56,.5,re+K*.25,y*.5,$,m),me(U,"FREIGHT / "+String(O+1).padStart(2,"0"),re+K*.24,y*.54,$+V*.6,K*.25,10,"#68dae5",V<0?Math.PI:0))}if(B==="planter"){I(U,K-12,2,ee-12,re,y-23,M,p);for(let V=0;V<Math.min(14,Math.floor(K/25));V++){let $=re-K*.4+V*K*.8/Math.max(1,Math.min(14,Math.floor(K/25))-1);z(U,Math.min(12,ee*.18),$,y-13,M,g)}}else if(B==="service")for(let V=-K*.3;V<=K*.3;V+=Math.max(24,K*.3)){I(U,K*.2,1,ee*.65,re+V,y-.6,M,_);for(let $=-ee*.25;$<ee*.3;$+=16)I(U,K*.2,.2,.7,re+V,y-.05,M+$,h.silver)}});for(let Z of[-1,1]){I(U,N*2,100,20,0,50,Z*(N+10),h.hull),I(U,20,100,N*2,Z*(N+10),50,0,h.hull);for(let O=-N;O<=N;O+=100)G(U,[O,104,Z*(N+10)],[O,136,Z*(N+10)],2),G(U,[Z*(N+10),104,O],[Z*(N+10),136,O],2);G(U,[-N,137,Z*(N+10)],[N,137,Z*(N+10)],2),G(U,[Z*(N+10),137,-N],[Z*(N+10),137,N],2),I(U,N*2,2,2,0,101,Z*(N-1),P),I(U,2,2,N*2,Z*(N-1),101,0,P)}for(let Z=0;Z<(R===0?34:62);Z++){let O=Z*2.39996,K=N+330+Z%4*360,y=R===0?180+a()*170:110+a()*150,ee=R===0?150+a()*150:100+a()*130,re=R===0?145+a()*230:260+a()*1300,[M,b]=By(Math.sin(O)*K,Math.cos(O)*K,y,ee,N);if(R===0){let B=H[Z%H.length];I(U,y,re,ee,M,re/2-50,b,B),I(U,y+18,10,ee+18,M,re-45,b,h.hull);for(let V=-y/2+18;V<y/2-8;V+=28)I(U,1.4,re*.72,2,M+V,re*.38,b-ee/2-.8,h.steel),I(U,1.4,re*.72,2,M+V,re*.38,b+ee/2+.8,h.steel);if(Z%4===0)for(let V of[-55,55])W(U,24,re*.95,M+V,re*.48-45,b+ee*.35,h.silver,12),W(U,26,5,M+V,re*.95-45,b+ee*.35,h.black,12);else if(Z%3===0){I(U,y*.5,16,ee*.2,M,re-30,b,h.black);for(let V=-2;V<=2;V++)I(U,y*.32,4,2,M,re-31,b+V*ee*.035,P)}continue}I(U,y,re,ee,M,re/2-90,b,f[(Z+R)%f.length]),I(U,y*.7,50,ee*.7,M,re-70,b,h.black),G(U,[M,re-50,b],[M,re+60+a()*100,b],2,h.steel),z(U,3,M,re+65,b,Z%3?T:P);for(let B=25;B<re-110;B+=26)for(let V=-y/2+10;V<y/2-8;V+=18)a()>.35&&(F(U,new vn(7,9),a()>.77?T:P,M+V,B,b-ee/2-.4).rotation.y=Math.PI,F(U,new vn(7,9),a()>.77?T:P,M+V,B,b+ee/2+.4));for(let B=-ee/2+10;B<ee/2-8;B+=21)I(U,.5,re*.6,2,M+y/2+.3,re*.4,b+B,Z%3?h.steel:P);if(Z%7===0){let B=F(U,new Ei(y*.7,2,5,32),P,M,re*.7,b);B.rotation.x=Math.PI/2,I(U,8,re*.3,8,M+y*.5,re*.6,b,T)}}if(R===0){for(let O of[-1,1]){let K=O*(N+190);for(let ee of[-700,700]){for(let re of[-65,65])G(U,[K+re,-45,ee],[K+re,530,ee],12,h.steel),G(U,[K-65,0,ee],[K+65,260,ee],5,h.steel),G(U,[K+65,260,ee],[K-65,510,ee],5,h.steel);I(U,500,22,30,K+O*140,535,ee,h.container);for(let re=-100;re<=300;re+=55)G(U,[K+O*re,535,ee],[K+O*(re+55),585,ee],3,h.steel),G(U,[K+O*re,585,ee],[K+O*(re+55),535,ee],3,h.steel);G(U,[K-100,585,ee],[K+450,585,ee],4,h.steel),G(U,[K+O*180,535,ee],[K+O*180,200,ee],1.1,h.black),I(U,34,15,12,K+O*180,193,ee,T)}for(let ee=-1e3;ee<1100;ee+=180){I(U,150,50,130,K,-25,ee,H[(Math.abs(ee)/180|0)%H.length]);for(let re=-60;re<=60;re+=15)I(U,2,46,132,K+re,-25,ee,h.steel)}let y=O*(N+660);I(U,250,42,480,y,-35,0,h.hull),I(U,222,10,440,y,-8,0,h.black),I(U,150,90,100,y,39,150,H[1]);for(let ee of[-130,-10,110])I(U,125,42,85,y,18,ee,H[(ee+130)/120|0]);G(U,[y,85,150],[y,210,150],3,h.steel)}let Z=-N-250;for(let O of[-280,280])G(U,[O,-50,Z],[O,510,Z],10,h.steel),G(U,[O-55,0,Z],[O+55,510,Z],4,h.steel);I(U,700,20,30,0,525,Z,h.hull);for(let O=-320;O<320;O+=80)G(U,[O,540,Z],[O+80,585,Z],3,h.steel),G(U,[O+80,540,Z],[O,585,Z],3,h.steel);me(U,"NEON DOCKS  /  07",0,185,-N-14,420,44,"#ffaa67")}else if(R===1){for(let Z of[-1,1]){for(let O of[-600,300,900]){let K=Z*(N+150);W(U,70,280,K,60,O,h.steel,20);for(let y of[60,140,220]){let ee=F(U,new Ei(110,3,6,32),P,K,y,O);ee.rotation.x=Math.PI/2}G(U,[K,-70,O],[K,520,O],4,h.steel),z(U,6,K,530,O,T)}I(U,170,N*.12,N*2,Z*(N+300),-80,0,h.hull)}me(U,"SKYLINE ARRAY",0,190,-N-14,400,48,"#bba2ff")}else{for(let Z of[-1,1])for(let O of[-N-160,N+160]){W(U,100,420,O,140,Z*550,h.hull,24);for(let K of[0,120,240,350])W(U,105,8,O,K,Z*550,T,24);oe(U,[[O,340,Z*550],[O,460,Z*550],[0,460,Z*(N+160)]],15,h.steel)}me(U,"REACTOR NINE",0,200,-N-14,400,48,"#ffb060")}for(let Z=0;Z<2;Z++){let O=D.spawns[Z][2];I(U,430,.2,95,O[0],.16,O[2],Z?f[2]:f[1])}for(let Z=0;Z<2;Z++){let O=D.sites[Z];I(U,260,.2,260,O[0],.13,O[2],Z?f[2]:f[1]);let K=me(U,Z?"B":"A",O[0],.32,O[2],100,100,"#e9fff5");K.rotation.x=-Math.PI/2}let _e=f[(R+2)%6];for(let Z of[-1,1]){let O=Z*(N+220);I(U,180,210,260,O,45,0,m),I(U,200,12,300,O,155,0,_e),me(U,["ORBITAL FREIGHT","HELIOS TRANSIT","NOVA ENERGY"][R],O,220,Z*(N+80),370,65,["#6de6ef","#e8c9ff","#b0ffd8"][R],Z>0?Math.PI:0)}if(R===1){let Z=F(U,new Ei(270,12,8,48,Math.PI),m,N+330,280,0);Z.rotation.y=Math.PI/2}if(R===2)for(let Z of[-N-180,N+180])for(let O of[-200,200])W(U,55,300,Z,100,O,f[1],16),W(U,58,10,Z,200,O,P,16);for(let Z=0;Z<2;Z++){let O=D.sites[Z],K=F(U,new Na(112,115,48),Z?T:P,O[0],.35,O[2]);K.rotation.x=-Math.PI/2}he(U),U.updateMatrixWorld(!0),U.traverse(Z=>{Z.matrixAutoUpdate=!1,Z.material?.emissiveIntensity>1&&(Z.castShadow=!1)})}function je(){t.forEach(U=>U.dispose()),n.forEach(U=>U.dispose())}return{m:h,armor:w,glow:x,team:E,robot:Ie,gun:De,equipment:rt,weaponModel:Ze,sign:le,dressMap:Re,plate:C,beam:G,bake:he,dispose:je}}function sm(i,e=2400,{mobile:t=!1}={}){let n=new ct(new Qi(6e3,24,12),new sn({side:Gt,depthWrite:!1,uniforms:{horizon:{value:new Xe("#c2dedb")},zenith:{value:new Xe("#4f8bad")},sunStrength:{value:1}},vertexShader:"varying vec3 vPos;void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform vec3 horizon;uniform vec3 zenith;uniform float sunStrength;varying vec3 vPos;void main(){vec3 d=normalize(vPos);float h=max(d.y,0.);vec3 c=mix(horizon,zenith,pow(h,.55));float cloud=pow(.5+.5*sin(d.x*22.+sin(d.z*17.)*2.),8.)*smoothstep(.05,.3,h)*.08;c+=cloud;float sun=pow(max(0.,dot(d,normalize(vec3(-.5,.75,.3)))),180.);c+=sunStrength*sun*vec3(.7,.5,.25);gl_FragColor=vec4(c,1.);}"}));n.frustumCulled=!1,i.add(n);let s=99,r=()=>(s=Math.imul(s,1664525)+1013904223>>>0,s/4294967296),a=new Float32Array(1800*3);for(let u=0;u<a.length;u+=3)a[u]=(r()-.5)*e*2,a[u+1]=r()*650,a[u+2]=(r()-.5)*e*2;let o=new xt;o.setAttribute("position",new Rt(a,3));let c=new sn({transparent:!0,depthWrite:!1,uniforms:{time:{value:0}},vertexShader:"uniform float time;varying float alpha;void main(){vec3 p=position;p.y=mod(p.y-time*280.,650.);vec4 mv=modelViewMatrix*vec4(p,1.);alpha=clamp(1.-length(mv.xyz)/2800.,0.,1.)*.2;gl_PointSize=clamp(1100./-mv.z,1.,3.);gl_Position=projectionMatrix*mv;}",fragmentShader:"varying float alpha;void main(){gl_FragColor=vec4(.55,.8,.92,alpha);}"}),l=new Mi(o,c);return l.frustumCulled=!1,i.add(l),{setMap(u){let d=[["#9ebdc1","#456c84"],["#e4d6d9","#727ca8"],["#d5e8c8","#528f9f"]];n.material.uniforms.horizon.value.set(d[u][0]),n.material.uniforms.zenith.value.set(d[u][1]),n.material.uniforms.sunStrength.value=u===0?0:1},frame(u,d,h){l.visible=!1,c.uniforms.time.value=u/1e3},dispose(){i.remove(n,l),n.geometry.dispose(),n.material.dispose(),o.dispose(),c.dispose()}}}function Rl(i){let e=new Map,t=new Map,n=i.clone();return rm(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function rm(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)rm(i.children[n],e.children[n],t)}var Cl=class extends ti{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ou(t)}),this.register(function(t){return new ku(t)}),this.register(function(t){return new ju(t)}),this.register(function(t){return new Ku(t)}),this.register(function(t){return new Yu(t)}),this.register(function(t){return new zu(t)}),this.register(function(t){return new Gu(t)}),this.register(function(t){return new Hu(t)}),this.register(function(t){return new Vu(t)}),this.register(function(t){return new Uu(t)}),this.register(function(t){return new Wu(t)}),this.register(function(t){return new Bu(t)}),this.register(function(t){return new Xu(t)}),this.register(function(t){return new qu(t)}),this.register(function(t){return new Nu(t)}),this.register(function(t){return new Pl(t,at.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Pl(t,at.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ju(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Ii.extractUrlBase(e);a=Ii.resolveURL(l,this.path)}else a=Ii.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Tr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===hm){try{a[at.KHR_BINARY_GLTF]=new Zu(e)}catch(d){s&&s(d);return}r=JSON.parse(a[at.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new sd(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case at.KHR_MATERIALS_UNLIT:a[d]=new Fu;break;case at.KHR_DRACO_MESH_COMPRESSION:a[d]=new $u(r,this.dracoLoader);break;case at.KHR_TEXTURE_TRANSFORM:a[d]=new Qu;break;case at.KHR_MESH_QUANTIZATION:a[d]=new ed;break;default:h.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function zy(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Ut(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var at={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Nu=class{constructor(e){this.parser=e,this.name=at.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new Xe(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],hn);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ns(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Pi(u),l.distance=d;break;case"spot":l=new Va(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),ai(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Fu=class{constructor(){this.name=at.KHR_MATERIALS_UNLIT}getMaterialType(){return It}extendParams(e,t,n){let s=[];e.color=new Xe(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],hn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Et))}return Promise.all(s)}},Uu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Ou=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ee(r,r)}return Promise.all(s)}},ku=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Bu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},zu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SHEEN}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new Xe(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],hn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Et)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},Gu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Hu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_VOLUME}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Xe().setRGB(r[0],r[1],r[2],hn),Promise.all(s)}},Vu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IOR}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Wu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Xe().setRGB(r[0],r[1],r[2],hn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Et)),Promise.all(s)}},qu=class{constructor(e){this.parser=e,this.name=at.EXT_MATERIALS_BUMP}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},Xu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},ju=class{constructor(e){this.parser=e,this.name=at.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Ku=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Yu=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Pl=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,u=s.count,d=s.byteStride,h=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,d,h,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(u*d);return a.decodeGltfBuffer(new Uint8Array(f),u,d,h,s.mode,s.filter),f})})}else return null}},Ju=class{constructor(e){this.name=at.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==Cn.TRIANGLES&&l.mode!==Cn.TRIANGLE_STRIP&&l.mode!==Cn.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let u=l.pop(),d=u.isGroup?u.children:[u],h=l[0].count,f=[];for(let m of d){let _=new et,g=new k,p=new Dt,S=new k(1,1,1),w=new As(m.geometry,m.material,h);for(let E=0;E<h;E++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,E),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,E),c.SCALE&&S.fromBufferAttribute(c.SCALE,E),w.setMatrixAt(E,_.compose(g,p,S));let x=null;for(let E in c)if(E==="_COLOR_0"){let T=c[E];w.instanceColor=new yi(T.array,T.itemSize,T.normalized)}else if(E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"){if(x===null){let P=w.geometry;x=new xt,x.name=P.name;for(let v in P.attributes)x.setAttribute(v,P.attributes[v]);for(let v in P.morphAttributes)x.morphAttributes[v]=P.morphAttributes[v];P.index!==null&&x.setIndex(P.index),x.morphTargetsRelative=P.morphTargetsRelative;for(let v of P.groups)x.addGroup(v.start,v.count,v.materialIndex);P.boundingBox!==null&&(x.boundingBox=P.boundingBox.clone()),P.boundingSphere!==null&&(x.boundingSphere=P.boundingSphere.clone()),x.drawRange.start=P.drawRange.start,x.drawRange.count=P.drawRange.count,x.userData=Object.assign({},P.userData),w.geometry=x}let T=c[E];x.setAttribute(E,new yi(T.array,T.itemSize,T.normalized))}Tt.prototype.copy.call(w,m),this.parser.assignFinalMaterial(w),f.push(w)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},hm="glTF",oo=12,am={JSON:1313821514,BIN:5130562},Zu=class{constructor(e){this.name=at.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,oo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==hm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-oo,r=new DataView(e,oo),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===am.JSON){let l=new Uint8Array(e,oo+a,o);this.content=n.decode(l)}else if(c===am.BIN){let l=oo+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},$u=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=at.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let u in a){let d=nd[u]||u.toLowerCase();o[d]=a[u]}for(let u in e.attributes){let d=nd[u]||u.toLowerCase();if(a[u]!==void 0){let h=n.accessors[e.attributes[u]],f=Br[h.componentType];l[d]=f.name,c[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){s.decodeDracoFile(u,function(f){for(let m in f.attributes){let _=f.attributes[m],g=c[m];g!==void 0&&(_.normalized=g)}d(f)},o,l,hn,h)})})}},Qu=class{constructor(){this.name=at.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},ed=class{constructor(){this.name=at.KHR_MESH_QUANTIZATION}},Il=class extends ei{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-t,d=(n-t)/u,h=d*d,f=h*d,m=e*l,_=m-l,g=-2*f+3*h,p=f-h,S=1-g,w=p-h+d;for(let x=0;x!==o;x++){let E=a[_+x+o],T=a[_+x+c]*u,P=a[m+x+o],v=a[m+x]*u;r[x]=S*E+w*T+g*P+p*v}return r}},Gy=new Dt,td=class extends Il{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return Gy.fromArray(r).normalize().toArray(r),r}},Cn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Br={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},om={9728:Nt,9729:Ft,9984:Cc,9985:Cr,9986:Ns,9987:Hn},cm={33071:Tn,33648:hr,10497:Zn},Iu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},nd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},os={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Hy={CUBICSPLINE:void 0,LINEAR:Ms,STEP:ys},Lu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Vy(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Xt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ni})),i.DefaultMaterial}function Os(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ai(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Wy(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];if(n){let h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;a.push(h)}if(s){let h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;o.push(h)}if(r){let h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(h)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let u=l[0],d=l[1],h=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function qy(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Xy(i){let e,t=i.extensions&&i.extensions[at.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Du(t.attributes):e=i.indices+":"+Du(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Du(i.targets[n]);return e}function Du(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function id(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function jy(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Ky=new et,sd=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new zy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new za(this.options.manager):this.textureLoader=new Wa(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Tr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Os(r,o,s),ai(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[at.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(Ii.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Iu[s.type],o=Br[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Rt(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=Iu[s.type],l=Br[s.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,h=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0,_,g;if(f&&f!==d){let p=Math.floor(h/f),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,w=t.cache.get(S);w||(_=new l(o,p*f,s.count*f/u),w=new Ts(_,f/u),t.cache.add(S,w)),g=new Yi(w,c,h%f/u,m)}else o===null?_=new l(s.count*c):_=new l(o,h,s.count*c),g=new Rt(_,c,m);if(s.sparse!==void 0){let p=Iu.SCALAR,S=Br[s.sparse.indices.componentType],w=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,E=new S(a[1],w,s.sparse.count*p),T=new l(a[2],x,s.sparse.count*c);o!==null&&(g=new Rt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let P=0,v=E.length;P<v;P++){let L=E[P];if(g.setX(L,T[P*c]),c>=2&&g.setY(L,T[P*c+1]),c>=3&&g.setZ(L,T[P*c+2]),c>=4&&g.setW(L,T[P*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let h=(r.samplers||{})[a.sampler]||{};return u.magFilter=om[h.magFilter]||Ft,u.minFilter=om[h.minFilter]||Hn,u.wrapS=cm[h.wrapS]||Zn,u.wrapT=cm[h.wrapT]||Zn,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Nt&&u.minFilter!==Ft,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(d){l=!0;let h=new Blob([d],{type:a.mimeType});return c=o.createObjectURL(h),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(d){return new Promise(function(h,f){let m=h;t.isImageBitmapLoader===!0&&(m=function(_){let g=new zt(_);g.needsUpdate=!0,h(g)}),t.load(Ii.resolveURL(d,r.path),m,void 0,f)})}).then(function(d){return l===!0&&o.revokeObjectURL(c),ai(d,a),d.userData.mimeType=a.mimeType||jy(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[at.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[at.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[at.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Ji,tn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new vr,tn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Xt}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[at.KHR_MATERIALS_UNLIT]){let d=s[at.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),l.push(d.extendParams(o,r,t))}else{let d=r.pbrMetallicRoughness||{};if(o.color=new Xe(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){let h=d.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],hn),o.opacity=h[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",d.baseColorTexture,Et)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=rn);let u=r.alphaMode||Lu.OPAQUE;if(u===Lu.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Lu.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==It&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ee(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==It&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==It){let d=r.emissiveFactor;o.emissive=new Xe().setRGB(d[0],d[1],d[2],hn)}return r.emissiveTexture!==void 0&&a!==It&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Et)),Promise.all(l).then(function(){let d=new a(o);return r.name&&(d.name=r.name),ai(d,r),t.associations.set(d,{materials:e}),r.extensions&&Os(s,d,r),d})}createUniqueName(e){let t=yt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[at.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return lm(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],u=Xy(l),d=s[u];if(d)a.push(d.promise);else{let h;l.extensions&&l.extensions[at.KHR_DRACO_MESH_COMPRESSION]?h=r(l):h=lm(new xt,l,t),l.mode===Cn.TRIANGLE_STRIP?h=h.then(f=>Pu(f,eo)):l.mode===Cn.TRIANGLE_FAN&&(h=h.then(f=>Pu(f,Lr))),s[u]={primitive:l,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let u=a[c].material===void 0?Vy(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let f=0,m=u.length;f<m;f++){let _=u[f],g=a[f],p,S=l[f];if(g.mode===Cn.TRIANGLES||g.mode===Cn.TRIANGLE_STRIP||g.mode===Cn.TRIANGLE_FAN||g.mode===void 0){let w=r.isSkinnedMesh===!0,x=_.hasAttribute("skinIndex")&&_.hasAttribute("skinWeight");w&&x===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),p=w&&x?new _a(_,S):new ct(_,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights()}else if(g.mode===Cn.LINES)p=new ya(_,S);else if(g.mode===Cn.LINE_STRIP)p=new Rs(_,S);else if(g.mode===Cn.LINE_LOOP)p=new Ma(_,S);else if(g.mode===Cn.POINTS)p=new Mi(_,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&qy(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),ai(p,r),g.extensions&&Os(s,p,g),t.assignFinalMaterial(p),d.push(p)}for(let f=0,m=d.length;f<m;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&Os(s,d[0],r),d[0];let h=new dt;r.extensions&&Os(s,h,r),t.associations.set(h,{meshes:e});for(let f=0,m=d.length;f<m;f++)h.add(d[f]);return h})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Bt(as.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new ts(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ai(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){let d=a[l];if(d){o.push(d);let h=new et;r!==null&&h.fromArray(r.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new va(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let d=0,h=s.channels.length;d<h;d++){let f=s.channels[d],m=s.samplers[f.sampler],_=f.target,g=_.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,S=s.parameters!==void 0?s.parameters[m.output]:m.output;_.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",S)),l.push(m),u.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){let h=d[0],f=d[1],m=d[2],_=d[3],g=d[4],p=[];for(let w=0,x=h.length;w<x;w++){let E=h[w],T=f[w],P=m[w],v=_[w],L=g[w];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let F=n._createAnimationTracks(E,T,P,v,L);if(F)for(let C=0;C<F.length;C++)p.push(F[C])}let S=new Ci(r,void 0,p);return ai(S,s),S})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let u=l[0],d=l[1],h=l[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,Ky)});for(let f=0,m=d.length;f<m;f++)u.add(d[f]);if(u.userData.pivot!==void 0&&d.length>0){let f=u.userData.pivot,m=d[0];u.pivot=new k().fromArray(f),u.position.x-=f[0],u.position.y-=f[1],u.position.z-=f[2],m.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new br:l.length>1?u=new dt:l.length===1?u=l[0]:u=new Tt,u!==l[0])for(let d=0,h=l.length;d<h;d++)u.add(l[d]);if(r.name&&(u.userData.name=r.name,u.name=a),ai(u,r),r.extensions&&Os(n,u,r),r.matrix!==void 0){let d=new et;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new dt;n.name&&(r.name=s.createUniqueName(n.name)),ai(r,n),n.extensions&&Os(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,d=c.length;u<d;u++){let h=c[u];h.parent!==null?r.add(Rl(h)):r.add(h)}let l=u=>{let d=new Map;for(let[h,f]of s.associations)(h instanceof tn||h instanceof zt)&&d.set(h,f);return u.traverse(h=>{let f=s.associations.get(h);f!=null&&d.set(h,f)}),d};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}os[r.path]===os.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let u;switch(os[r.path]){case os.weights:u=wi;break;case os.rotation:u=Ai;break;case os.translation:case os.scale:u=es;break;default:n.itemSize===1?u=wi:u=es;break}let d=s.interpolation!==void 0?Hy[s.interpolation]:Ms,h=this._getArrayFromAccessor(n);for(let f=0,m=c.length;f<m;f++){let _=new u(c[f]+"."+os[r.path],t.array,h,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),a.push(_)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=id(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Ai?td:Il;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Yy(i,e,t){let n=e.attributes,s=new xn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new k(c[0],c[1],c[2]),new k(l[0],l[1],l[2])),o.normalized){let u=id(Br[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new k,c=new k;for(let l=0,u=r.length;l<u;l++){let d=r[l];if(d.POSITION!==void 0){let h=t.json.accessors[d.POSITION],f=h.min,m=h.max;if(f!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),h.normalized){let _=id(Br[h.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new en;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function lm(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=nd[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return it.workingColorSpace!==hn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${it.workingColorSpace}" not supported.`),ai(i,e),Yy(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Wy(i,e.targets,t):i})}var um=(function(){var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?o(e):o(i),r,a=WebAssembly.instantiate(s,{}).then(function(p){r=p.instance,r.exports.__wasm_call_ctors()});function o(p){for(var S=new Uint8Array(p.length),w=0;w<p.length;++w){var x=p.charCodeAt(w);S[w]=x>96?x-97:x>64?x-39:x+4}for(var E=0,w=0;w<p.length;++w)S[E++]=S[w]<60?n[S[w]]:(S[w]-60)*64+S[++w];return S.buffer.slice(0,E)}function c(p,S,w,x,E,T,P){var v=p.exports.sbrk,L=x+3&-4,F=v(L*E),C=v(T.length),I=new Uint8Array(p.exports.memory.buffer);I.set(T,C);var W=S(F,x,E,C,T.length);if(W==0&&P&&P(F,L,E),w.set(I.subarray(F,F+x*E)),v(F-v(0)),W!=0)throw new Error("Malformed buffer data: "+W)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},d=[],h=0;function f(p){var S={object:new Worker(p),pending:0,requests:{}};return S.object.onmessage=function(w){var x=w.data;S.pending-=x.count,S.requests[x.id][x.action](x.value),delete S.requests[x.id]},S}function m(p){for(var S="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(s)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+g.name+";"+c.toString()+g.toString(),w=new Blob([S],{type:"text/javascript"}),x=URL.createObjectURL(w),E=d.length;E<p;++E)d[E]=f(x);for(var E=p;E<d.length;++E)d[E].object.postMessage({});d.length=p,URL.revokeObjectURL(x)}function _(p,S,w,x,E){for(var T=d[0],P=1;P<d.length;++P)d[P].pending<T.pending&&(T=d[P]);return new Promise(function(v,L){var F=new Uint8Array(w),C=++h;T.pending+=p,T.requests[C]={resolve:v,reject:L},T.object.postMessage({id:C,count:p,size:S,source:F,mode:x,filter:E},[F.buffer])})}function g(p){var S=p.data;self.ready.then(function(w){if(!S.id)return self.close();try{var x=new Uint8Array(S.count*S.size);c(w,w.exports[S.mode],x,S.count,S.size,S.source,w.exports[S.filter]),self.postMessage({id:S.id,count:S.count,action:"resolve",value:x},[x.buffer])}catch(E){self.postMessage({id:S.id,count:S.count,action:"reject",value:E})}})}return{ready:a,supported:!0,useWorkers:function(p){m(p)},decodeVertexBuffer:function(p,S,w,x,E){c(r,r.exports.meshopt_decodeVertexBuffer,p,S,w,x,r.exports[l[E]])},decodeIndexBuffer:function(p,S,w,x){c(r,r.exports.meshopt_decodeIndexBuffer,p,S,w,x)},decodeIndexSequence:function(p,S,w,x){c(r,r.exports.meshopt_decodeIndexSequence,p,S,w,x)},decodeGltfBuffer:function(p,S,w,x,E,T){c(r,r.exports[u[E]],p,S,w,x,r.exports[l[T]])},decodeGltfBufferAsync:function(p,S,w,x,E){return d.length>0?_(p,S,w,u[x],l[E]):a.then(function(){var T=new Uint8Array(p*S);return c(r,r.exports[u[x]],T,p,S,w,r.exports[l[E]]),T})}}})();var Jy=["vector","patch","bastion","spectre","glitch","forge"],Zy=["idle","walk","run","backpedal","strafe_left","strafe_right","crouch","crouch_walk","jump","fall","land","fire","reload","equip","use_item","utility","skill","interact","hit","death_back","death_left","death_right","respawn","victory","defeat"],$y=/^(root|hips|thigh|shin|foot)/,Qy=i=>i.name.slice(0,i.name.lastIndexOf(".")),zr=new k,eM=new Dt;function dm(i){let e=[],t=new Map,n=[6942719,16756327].map(m=>new It({color:m,toneMapped:!1})),s=new nn(.09,.025,.035),r=document.createElement("canvas");r.width=r.height=64;let a=r.getContext("2d"),o=a.createRadialGradient(32,32,5,32,32,32);o.addColorStop(0,"rgba(0,0,0,.5)"),o.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=o,a.fillRect(0,0,64,64);let c=new An(r),l=new It({map:c,transparent:!0,depthWrite:!1}),u=new vn(43,36);async function d(m=()=>{}){let _=new Cl().setMeshoptDecoder(um);for(let g=0;g<6;g+=2)await Promise.all(Jy.slice(g,g+2).map(async(p,S)=>{let w=await fetch("./models/"+p+".glb",{signal:AbortSignal.timeout(6e4)});if(!w.ok)throw Error("Could not load "+p+" chassis. Please retry.");let x=await _.parseAsync(await w.arrayBuffer(),"./models/"),E=!1;if(x.scene.traverse(P=>{for(let v of P.material?Array.isArray(P.material)?P.material:[P.material]:[])v.map&&v.normalMap&&v.roughnessMap&&(E=!0)}),!E)throw Error("Could not load "+p+" chassis textures. Please retry.");let T=Object.fromEntries(x.animations.map(P=>[P.name.split("|").pop(),P]));for(let P of Zy)if(!T[P])throw Error(p+" is missing its "+P+" animation.");x.scene.traverse(P=>{P.isMesh&&(P.castShadow=!1,P.receiveShadow=!0,P.frustumCulled=!0,P.isSkinnedMesh&&(P.boundingSphere=new en(new k(0,1,0),2.5)))}),x.scene.traverse(P=>{for(let v of P.material?Array.isArray(P.material)?P.material:[P.material]:[])v.fog=!1,v.envMapIntensity=1.1,v.emissive?.getHex()===0&&(v.emissive.set("#30404a"),v.emissiveIntensity=.12)}),e[g+S]={model:x.scene,clips:T},m(e.filter(Boolean).length,6)}));for(let g=0;g<12;g++)t.set(g,i.weaponModel(g)),await new Promise(requestAnimationFrame)}function h(m,_,g=2,{firstPerson:p=!1}={}){let S=e[_];if(!S)throw Error("Chassis has not loaded");let w=[],x=new dt,E=Rl(S.model);x.add(E),E.scale.setScalar(70/1.94);let T={};if(E.traverse(O=>{O.isBone&&(T[O.name]=O);for(let K of["L","R"])for(let y of["upper_arm","forearm","hand","thigh","shin","foot"])O.name===y+K&&(T[y+"."+K]=O)}),p&&E.traverse(O=>{if(!O.isSkinnedMesh)return;let K=O.geometry.clone(),y=K.index.array,ee=K.attributes.skinIndex,re=K.attributes.skinWeight,M=[],b=new Set(O.skeleton.bones.map(($,be)=>/forearm|hand|weapon/.test($.name)?be:-1)),B=$=>{let be=0;for(let X=0;X<4;X++)b.has(ee.getComponent($,X))&&(be+=re.getComponent($,X));return be>.8},V=[];for(let $ of K.groups.length?K.groups:[{start:0,count:y.length,materialIndex:0}]){let be=M.length;for(let X=$.start;X<$.start+$.count;X+=3)B(y[X])&&B(y[X+1])&&B(y[X+2])&&M.push(y[X],y[X+1],y[X+2]);V.push({start:be,count:M.length-be,materialIndex:$.materialIndex})}K.setIndex(M),K.clearGroups(),V.forEach($=>K.addGroup($.start,$.count,$.materialIndex)),O.geometry=K,O.receiveShadow=!1}),!p){for(let K of["L","R"]){let y=new ct(s,n[m<5?0:1]);y.position.set(0,.04,-.13),T["upper_arm."+K].add(y),w.push(y)}let O=new ct(u,l);O.rotation.x=-Math.PI/2,O.position.y=.15,x.add(O)}let P=null,v=null;function L(O,K){let y=T["upper_arm."+O],ee=T["forearm."+O],re=T["hand."+O];P??=[],P.push(...[y,ee,re].map(Le=>({bone:Le,position:Le.position.clone(),quaternion:Le.quaternion.clone()}))),p&&O==="L"&&(y.position.x+=.15),E.updateMatrixWorld(!0);let M=y.getWorldPosition(new k),b=ee.getWorldPosition(new k),B=re.getWorldPosition(new k),V=E.localToWorld(K.clone()),$=M.distanceTo(b),be=b.distanceTo(B),X=V.clone().sub(M),Y=Math.min(X.length(),($+be)*.98),q=X.normalize(),ge=($*$-be*be+Y*Y)/(2*Y),Te=Math.sqrt(Math.max(0,$*$-ge*ge)),ve=new k(O==="L"?-.7:.7,-1,.3).transformDirection(E.matrixWorld);ve.addScaledVector(q,-ve.dot(q)).normalize();let Se=M.clone().addScaledVector(q,ge).addScaledVector(ve,Te);function Pe(Le,ze,Q){let ye=Le.getWorldPosition(new k),pe=ze.getWorldPosition(new k).sub(ye).normalize(),Me=Q.clone().sub(ye).normalize(),Ce=new Dt().setFromUnitVectors(pe,Me),de=Le.getWorldQuaternion(new Dt);Le.quaternion.copy(Le.parent.getWorldQuaternion(new Dt).invert().multiply(Ce.multiply(de))),Le.updateMatrixWorld(!0)}Pe(y,ee,Se),Pe(ee,re,M.clone().addScaledVector(q,Y))}let F=new qa(E),C=new Map;function I(O,K="full"){let y=K+":"+O;if(C.has(y))return C.get(y);let ee=S.clips[O],re=K==="full"?ee:new Ci(y,ee.duration,ee.tracks.filter(b=>$y.test(Qy(b))===(K==="lower"))),M=F.clipAction(re);return C.set(y,M),M}let W=null,z=null,G=null,oe=0,ce=0,xe=null,j=null,he=!1,fe=0,Ie=g,De=0,rt=0,Ze=null,Je=0,le=null,me=0,we=null,Ve=null,Re=null,je=-1/0,U=new dt;E.add(U);function D(O){we&&U.remove(we),we=t.get(O).clone(!0),Ve=we.getObjectByName("magazine"),Re=we.getObjectByName("pump"),je=-1/0;let K=we.getObjectByName("stock");K&&p&&(K.visible=!1),we.scale.setScalar(.016),U.add(we),Ie=O}D(g);function R(O,K,y=!0,ee=.12){return O===K?O:(K.reset().setEffectiveTimeScale(1).setEffectiveWeight(1),K.setLoop(y?pl:fl,y?1/0:1),K.clampWhenFinished=!y,K.play(),O&&O.crossFadeTo(K,ee,!1),K)}function N(O,K){F.stopAllAction(),W=z=G=null,oe=ce=0,xe=O.life,j=O.alive,he=!1,fe=0,De=0,W=R(null,I("idle","lower")),z=R(null,I("idle","upper")),rt=K}function H(O,K,y,ee){if(!S.clips[O]||j===!1)return;O==="fire"&&Re&&(je=K),["utility","use_item"].includes(O)&&Number.isInteger(ee)&&ee>=0&&ee<12&&(le&&(le.removeFromParent(),le.traverse(b=>b.geometry?.dispose())),le=i.equipment(ee),le.scale.setScalar(.012),E.add(le),me=K+900);let re=I(O,"upper");z===re?re.reset().play():z=R(z,re,!1,O==="hit"?.045:.08);let M=y||S.clips[O].duration;re.setEffectiveTimeScale(S.clips[O].duration/Math.max(.1,M)),oe=K+M*1e3}function te(O,K,y,ee,{reduced:re=!1}={}){if(xe!==O.life||j===null){let B=xe!==null&&O.alive;N(O,y),B&&(j=!1)}if(Ze!==K.phase&&K.phase!=="finished"&&K.phase!=="round_end"&&ce===1/0&&O.alive&&(ce=0),Ze=K.phase,O.weapon!==Ie&&(D(O.weapon),O.alive&&H("equip",y,.4)),O.alive){j||(N(O,y),G=R(null,I("respawn"),!1,.1),W.fadeOut(.1),z.fadeOut(.1),ce=y+850);let B=O.position[1]>1,V=O.velocity[1],$=Math.hypot(O.velocity[0],O.velocity[2]),be="idle";if(B)be=V>0?"jump":"fall";else if(O.crouch)be=$>12?"crouch_walk":"crouch";else if($>12){let X=-O.velocity[0]*Math.sin(O.yaw)-O.velocity[2]*Math.cos(O.yaw),Y=O.velocity[0]*Math.cos(O.yaw)-O.velocity[2]*Math.sin(O.yaw);be=Math.abs(Y)>Math.abs(X)*1.4?Y>0?"strafe_right":"strafe_left":X<-20?"backpedal":$>180?"run":"walk"}if(he&&!B&&H("land",y,.3),he=B,K.phase==="finished"||K.phase==="round_end"){let X=re?"idle":K.winner===O.team?"victory":"defeat";G=R(G,I(X),!0,.25),W?.fadeOut(.15),z?.fadeOut(.15),ce=1/0}else G&&y>=ce&&(G.fadeOut(.16),G=null,W?.reset().fadeIn(.16).play(),z?.reset().fadeIn(.16).play());G||(W=R(W,I(be,"lower")),W.setEffectiveTimeScale($>12&&!B?as.clamp($/(be==="run"?250:145),.6,1.6):1),O.reload>0&&!fe&&(Je=O.reload,H("reload",y,O.reload/64)),K.objective?.actor===m&&K.objective.progress>0?(z!==I("interact","upper")&&(z=R(z,I("interact","upper"))),oe=y+100):y>=oe&&(z=R(z,I("idle","upper"),!0,.16)))}else{if(j){De=y;let B=["death_back","death_left","death_right"][(m+(O.life||0))%3];G=R(G,I(B),!1,.07),W?.fadeOut(.07),z?.fadeOut(.07),ce=1/0}De||(De=y,G=R(G,I("death_back"),!1,0),G.time=S.clips.death_back.duration)}if(fe=O.reload||0,j=O.alive,rt=y,P){for(let B of P)B.bone.position.copy(B.position),B.bone.quaternion.copy(B.quaternion);P=null}if(v){for(let B of v)B.bone.quaternion.copy(B.quaternion);v=null}z&&(z.paused=re&&z===I("idle","upper")),F.update(Math.min(.1,Math.max(0,ee))),O.alive&&!re&&(v=[T.head,T.chest].map(B=>({bone:B,quaternion:B.quaternion.clone()})),T.head.rotation.x-=O.pitch*.5,T.chest.rotation.x-=O.pitch*.22),E.updateMatrixWorld(!0);let M=!!(O.alive&&O.reload>0&&Je&&z?.getClip().name==="upper:reload"&&Ve),b=0;if(M){let B=as.clamp(1-O.reload/Je,0,1);if(b=Math.min(1,B*5,(1-B)*5),b>.05){let V=T["hand.R"].getWorldPosition(new k),$=T["upper_arm.L"].getWorldPosition(new k);$.add(T["upper_arm.R"].getWorldPosition(new k)).multiplyScalar(.5);let be=E.worldToLocal($).add(new k(-.03,p?0:-.1,-.16));L("R",E.worldToLocal(V).lerp(be,b))}}if(T["hand.R"].getWorldPosition(zr),E.worldToLocal(zr),U.position.copy(zr).add(new k(0,.096,-.048)),U.quaternion.copy(eM),U.rotation.x=O.pitch||0,U.rotation.y=M?.35*b:0,U.rotation.z=M?-.55*b-.15*Math.sin(O.reload/64*4):0,Re){let B=(y-je)/320;Re.position.z=O.alive&&!re&&B>=0&&B<1?5.2*(B<.45?B/.45:(1-B)/.55):0}if(Ve&&(Ve.position.y=-6-(O.reload&&Je?Math.sin(Math.PI*(1-O.reload/Je))*8:0)),M){if(b>.05){U.updateMatrixWorld(!0);let B=T["hand.L"].getWorldPosition(new k),V=Ve.getWorldPosition(new k);B.lerp(V,b),L("L",E.worldToLocal(B))}}else p&&O.alive&&!O.reload&&y>=me&&(!oe||y>=oe||["upper:fire","upper:hit"].includes(z?.getClip().name))&&L("L",U.position.clone().add(new k(-.025,-.11,-.12+(Re?.position.z||0)*.016)));return le&&(le.visible=O.alive&&y<me,le.visible&&(T["hand.L"].getWorldPosition(zr),E.worldToLocal(zr),le.position.copy(zr),le.rotation.z=.5)),we.visible=O.alive,x.userData.motion=G?.getClip().name||W?.getClip().name,{deadAt:De,motion:x.userData.motion}}function _e(){le?.traverse(O=>O.geometry?.dispose()),F.stopAllAction(),F.uncacheRoot(E),p&&E.traverse(O=>{O.isSkinnedMesh&&O.geometry.dispose()}),x.removeFromParent()}let Z=0;return p&&E.traverse(O=>{O.isSkinnedMesh&&(Z+=(O.geometry.index?.count||0)/3)}),{rig:x,model:E,bones:T,mixer:F,hero:_,slot:m,armTriangles:Z,setAlly(O){for(let K of w)K.material=n[O?0:1]},get weapon(){return Ie},update:te,trigger:H,dispose:_e}}function f(){let m=new Set,_=new Set,g=new Set;for(let p of e)p.model.traverse(S=>{S.geometry&&m.add(S.geometry);for(let w of S.material?Array.isArray(S.material)?S.material:[S.material]:[]){_.add(w);for(let x of Object.values(w))x?.isTexture&&g.add(x)}});for(let p of t.values())p.traverse(S=>{S.geometry&&m.add(S.geometry)});s.dispose(),n.forEach(p=>p.dispose()),u.dispose(),l.dispose(),c.dispose(),m.forEach(p=>p.dispose()),_.forEach(p=>p.dispose()),g.forEach(p=>p.dispose())}return{preload:d,actor:h,dispose:f}}var tM={keyboardLayout:"qwerty",aimAssist:0,gamepadAimAssist:1,sensitivity:1,gamepadSensitivity:1,ads:.65,fov:80,volume:.6,brightness:1,crosshair:1,crosshairColor:"#68e8ff",sound:!0,motion:!0,invertY:!1,haptics:!1,touch:!1},ks={forward:"KeyW",back:"KeyS",left:"KeyA",right:"KeyD",fire:"Mouse0",scope:"Mouse2",reload:"KeyR",skill:"KeyQ",use:"KeyE",walk:"ShiftLeft",crouch:"KeyF",jump:"Space",armory:"KeyB",scoreboard:"Tab",previous:"BracketLeft",next:"BracketRight",flash:"KeyZ",smoke:"KeyX",grenade:"KeyC",utility:"KeyG",...Object.fromEntries(["Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal"].map((i,e)=>["weapon"+e,i]))},rd={forward:"Move forward",back:"Move backward",left:"Move left",right:"Move right",fire:"Fire",scope:"Aim down sights",reload:"Reload",skill:"Hero skill",use:"Plant / defuse",walk:"Walk quietly",crouch:"Crouch",jump:"Jump",armory:"Armory",scoreboard:"Scoreboard",previous:"Previous weapon",next:"Next weapon",flash:"Flash",smoke:"Smoke",grenade:"Fragment",utility:"Selected equipment"},fm=Object.fromEntries([..."QWERTYUIOPASDFGHJKL;ZXCVBNM"].map((i,e)=>[i===";"?"Semicolon":"Key"+i,[..."QWFPGJLUY;ARSTDHNEIOZXCVBKM"][e]])),nM={Semicolon:";",Quote:"'",Backquote:"`",Backslash:"\\",Comma:",",Period:".",Slash:"/",IntlBackslash:"\\"};function pm(i,e="qwerty"){return i.startsWith("Mouse")?["Mouse left","Mouse middle","Mouse right"][Number(i.slice(5))]:e==="colemak"&&fm[i]?fm[i]:nM[i]||i.replace(/^Key|^Digit/,"").replace("BracketLeft","[").replace("BracketRight","]").replace("Minus","\u2212").replace("Equal","=")}function mm(i){return/^(Key[A-Z]|Digit[0-9]|Arrow(Up|Down|Left|Right)|Shift(Left|Right)|Space|Tab|Bracket(Left|Right)|Minus|Equal|Semicolon|Quote|Backquote|Backslash|IntlBackslash|Comma|Period|Slash|Mouse[012])$/.test(i)}function gm(i={},e=!1){i=i&&typeof i=="object"?i:{};let t={...tM,touch:e,aimAssist:e?1:0,bindings:{...ks}};["qwerty","colemak"].includes(i.keyboardLayout)&&(t.keyboardLayout=i.keyboardLayout);for(let s of["sound","motion","invertY","haptics","touch"])typeof i[s]=="boolean"&&(t[s]=i[s]);for(let[s,r,a]of[["aimAssist",0,2],["gamepadAimAssist",0,2],["sensitivity",.4,2.5],["gamepadSensitivity",.4,2.5],["ads",.2,1.5],["fov",65,95],["volume",0,1],["brightness",.7,1.5],["crosshair",.7,1.8]])Number.isFinite(i[s])&&(t[s]=Math.max(r,Math.min(a,i[s])));/^#[a-fA-F0-9]{6}$/.test(i.crosshairColor)&&(t.crosshairColor=i.crosshairColor);let n=i.bindings;return n&&Object.keys(ks).every(s=>mm(n[s]))&&new Set(Object.values(n)).size===Object.keys(ks).length&&(t.bindings={...n}),t}function bm(i,e,t){if(!(e in ks)||!mm(t))throw Error("Use a letter, number, arrow, Shift, Space, Tab or mouse button. Ctrl, Alt, Meta and browser shortcuts are reserved.");let n={...i},s=Object.keys(n).find(r=>n[r]===t);return s&&(n[s]=n[e]),n[e]=t,n}var co=i=>i?.id==="rail"?20:38;function xm(i,e,t){return i.sensitivity*.0025*(e?i.ads*Math.tan(co(t)*Math.PI/360)/Math.tan(i.fov*Math.PI/360):1)}function _m(i,e){return e.spread*(i.crouch?.65:1)*(e.scoped&&!i.scoped?12:1)*(Math.hypot(i.velocity[0],i.velocity[2])>40?2.5:1)*(i.hero===5&&i.effect>0||i.overclock>0?1.5:1)+(i.recoil||0)}var cs=class{constructor(){this.seen=new Set}consume(e,t){let n=[];for(let s of e||[])this.seen.has(s.id)||(this.seen.add(s.id),t-s.tick<=128&&n.push(s));return this.seen.size>1024&&(this.seen=new Set([...this.seen].slice(-512))),n}};function vm(i,e,t,n=245){let s=n;for(let r of t){let a=0,o=s;for(let c=0;c<3;c++)if(Math.abs(e[c])<1e-9){if(i[c]<r.min[c]||i[c]>r.max[c]){o=-1;break}}else{let l=(r.min[c]-i[c])/e[c],u=(r.max[c]-i[c])/e[c];if(a=Math.max(a,Math.min(l,u)),o=Math.min(o,Math.max(l,u)),a>o)break}a<=o&&(s=a)}return s}var ls=(i,e=0)=>new Xt({color:i,roughness:.55,metalness:.55,emissive:e,emissiveIntensity:1.6});function ym(i,e){let t=matchMedia("(pointer:coarse)").matches,n=new yl({canvas:i,antialias:!1,powerPreference:"high-performance"});n.outputColorSpace=Et,n.toneMapping=Xa,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.autoUpdate=!1,n.shadowMap.type=t?Uh:Is;let s=new Es,r=new Bt(80,1,.5,9e3);r.rotation.order="YXZ",s.add(r);let a=new Ga(13232114,8094068,1.4);s.add(a);let o=new ns(16769980,2.2);o.position.set(-800,1400,500),s.add(o),o.castShadow=!0,o.shadow.mapSize.set(t?512:1024,t?512:1024),o.shadow.normalBias=1.2,o.shadow.bias=-1e-4;let c;function l(){c?.dispose();let X=new Ur(n),Y=new Tl;c=X.fromScene(Y,.05),s.environment=c.texture,s.environmentIntensity=.75,Y.dispose(),X.dispose(),n.shadowMap.needsUpdate=!0}let u=!1,d=!1;function h(){u=!0}function f(){d||(l(),u=!1,b())}i.addEventListener("webglcontextlost",h),i.addEventListener("webglcontextrestored",f),l();let m=ls("#162536"),_=ls("#121922"),g=ls("#607187"),p=ls("#253849"),S=ls("#c2ccdb"),w=e.heroes.map(X=>ls(X.color,X.color)),x=[ls("#26dfff","#26dfff"),ls("#ff7e5d","#ff7e5d")];function E(X,Y,q,ge,Te,ve,Se,Pe){let Le=new ct(new nn(Y,q,ge),Pe);return Le.position.set(Te,ve,Se),Le.castShadow=!0,Le.receiveShadow=!0,X.add(Le),Le}function T(X,Y,q,ge,Te,ve,Se){let Pe=new ct(new $i(Y,Y,q,12),Se);return Pe.position.set(ge,Te,ve),Pe.castShadow=!0,Pe.receiveShadow=!0,X.add(Pe),Pe}function P(X,Y="#8ae6ff",q=512,ge=128){let Te=document.createElement("canvas");Te.width=q,Te.height=ge;let ve=Te.getContext("2d");ve.fillStyle="#08121f",ve.fillRect(0,0,q,ge),ve.strokeStyle=Y,ve.lineWidth=5,ve.strokeRect(8,8,q-16,ge-16),ve.font="bold 56px monospace",ve.textAlign="center",ve.textBaseline="middle",ve.fillStyle=Y,ve.fillText(X,q/2,ge/2);let Se=new An(Te);return Se.colorSpace=Et,new It({map:Se,side:rn})}function v(X){let Y=new Map;for(let q of[...X.children])if(q.isMesh){q.updateMatrix();let ge=q.geometry.clone().applyMatrix4(q.matrix);Y.has(q.material)||Y.set(q.material,[]),Y.get(q.material).push(ge),X.remove(q),q.geometry.dispose()}for(let[q,ge]of Y){let Te=new ct(Al(ge),q);Te.castShadow=!0,Te.receiveShadow=!0,X.add(Te),ge.forEach(ve=>ve.dispose())}}let L=im(n,{mobile:t}),F=sm(s,2400,{mobile:t}),C=[],I=new ns(9296611,.9);I.position.set(900,700,-1100),s.add(I);let W=Qp(s),z=dm(L),G=null;function oe(X,Y,q){let ge=z.actor(X,Y,q);return ge.rig.name=`hero-${Y}-slot-${X}`,s.add(ge.rig),ge}function ce(X){return G?.hero!==X.hero&&(G?.dispose(),G=z.actor(X.slot,X.hero,X.weapon,{firstPerson:!0}),G.rig.scale.setScalar(.8),r.add(G.rig)),G}let xe=new Pi(8448767,0,160,2);xe.visible=!t,r.add(xe),xe.position.set(5,-4,-30);let j=new dt,he=-1,fe=.75,Ie=80;s.add(j);let De=[];function rt(){j.traverse(X=>X.geometry?.dispose()),s.remove(j);for(let X of De)X.map?.dispose(),X.dispose();De.length=0,j=new dt,s.add(j)}function Ze(X){if(he===X)return;he=X,rt();let Y=e.maps[X],q=Y.extent;Object.assign(o.shadow.camera,{left:-q,right:q,top:q,bottom:-q,near:1,far:5e3}),o.shadow.camera.updateProjectionMatrix(),a.intensity=X===0?1.1:1.4,o.intensity=X===0?1.55:2.2,o.color.set(X===0?"#ffe0b8":"#ffe3bc"),s.background=new Xe(X===0?"#8baeb4":Y.colors[0]),s.fog=new ma(X===0?"#8baeb4":Y.colors[0],12e-5),F.setMap(X),L.dressMap(j,Y,X),n.shadowMap.needsUpdate=!0}let Je=[];for(let X=0;X<40;X++){let Y=t?new It({color:"#b4c1d8",transparent:!0,opacity:.93,depthWrite:!1}):new Xt({color:"#b4c1d8",transparent:!0,opacity:.93,roughness:1,depthWrite:!1}),q=new ct(new Qi(1,12,8),Y);q.visible=!1,s.add(q),Je.push(q)}let le=new dt;E(le,20,10,16,0,5,0,_),E(le,14,2,10,0,11,0,w[4]),s.add(le);let me=[];for(let X=0;X<32;X++){let Y=new ct(new $i(.6,.6,1,4),new It({color:"#baf6ff",transparent:!0,opacity:.6}));Y.visible=!1,s.add(Y),me.push({mesh:Y,until:0})}let we=0,Ve=0,Re=-1/0,je=-1/0;function U(X,Y,q){let ge=new k(-Math.sin(Y.yaw)*Math.cos(Y.pitch),Math.sin(Y.pitch),-Math.cos(Y.yaw)*Math.cos(Y.pitch)),Te=me[we++%me.length],ve=new k(Y.position[0],Y.position[1]+(Y.crouch?37:56),Y.position[2]),Se=15,Pe=vm(ve.toArray(),ge.toArray(),e.maps[he]?.obstacles||[]);Te.mesh.visible=Pe>Se,Te.mesh.visible&&(Te.mesh.position.copy(ve).addScaledVector(ge,(Se+Pe)/2),Te.mesh.quaternion.setFromUnitVectors(new k(0,1,0),ge),Te.mesh.scale.y=Pe-Se,Te.until=q+55),X===D?(Ve=q+40,Re=q,G?.trigger("fire",q)):C[X]?.trigger("fire",q)}let D=0,R=null,N=new cs;function H(X){if(!X?.state)return;let Y=performance.now();X.id!==R&&(N=new cs,R=X.id);for(let q of N.consume(X.feedback,X.state.tick))if(!(X.state.tick-q.tick>32)&&q.kind==="motion"){let ge=X.state.players[q.actor];if(!ge||ge.hidden||ge.life!==q.life)continue;q.action==="fire"?q.actor!==X.slot&&U(q.actor,ge,Y):(C[q.actor]?.trigger(q.action,Y,q.action==="reload"?ge.reload/64:void 0,q.value),q.actor===X.slot&&G?.trigger(q.action,Y,q.action==="reload"?ge.reload/64:void 0,q.value)),q.action==="hit"&&(ee(ge,Y),q.actor===X.slot&&(je=Y))}}let te=new Float32Array(96),_e=new xt;_e.setAttribute("position",new Rt(te,3));let Z=new Ji({color:16766336,size:2,sizeAttenuation:!0,transparent:!0,depthWrite:!1,opacity:0}),O=new Mi(_e,Z);O.frustumCulled=!1,s.add(O);let K=null,y=0;function ee(X,Y){K=[X.position[0],X.position[1]+(X.crouch?32:46),X.position[2]],y=Y}let re=Array.from({length:10},()=>new k);function M(X,Y,q,ge,{active:Te=!1,yaw:ve=0,pitch:Se=0,local:Pe=null,spectator:Le=null,reduced:ze=!1,weapon:Q=0}={}){if(!(u||d)){if(D=Y,X){let ye=X.players[Y],pe=X.players[Le],Me=ye.alive?ye:pe?.alive&&pe.team===ye.team?pe:X.players.find(de=>de.team===ye.team&&de.alive);Ze(X.config.map);for(let de of X.players){let Ae=C[de.slot];if(!Ae)continue;!de.hidden&&Ae.hero!==de.hero&&(Ae.dispose(),Ae=C[de.slot]=oe(de.slot,de.hero,de.weapon));let Ue=!de.hidden&&!!de.position&&(!Te||de.slot!==Me?.slot);if(Ae.rig.visible=Ue,!Ue)continue;Ae.setAlly(de.team===ye.team),Ae.rig.position.copy(re[de.slot].fromArray(de.position)),Ae.rig.rotation.y=de.yaw;let _t=Ae.update(de,X,q,ge,{reduced:ze});!de.alive&&q-_t.deadAt>5e3&&(Ae.rig.visible=!1)}for(let de=0;de<Je.length;de++){let Ae=X.utilities[de],Ue=Je[de];Ue.visible=!!Ae,Ae&&(Ue.position.fromArray(Ae.position),Ue.scale.setScalar(Ae.kind===2&&Ae.fuse===0?175:6),Ue.material.opacity=Ae.kind===2&&Ae.fuse===0?Math.min(.93,Ae.life/64):Ae.fuse===0?.12:1,Ue.material.color.set(e.items[Ae.kind]?.color||"#b4c1d8"),Ae.fuse===0&&Ae.kind===5&&Ue.scale.set(450,3,450),Ae.fuse===0&&Ae.kind===10&&Ue.scale.set(220,3,220))}if(le.visible=!X.objective.hidden&&!!X.objective.position&&X.config.mode==="demolition"&&(X.objective.planted||X.objective.carrier===null),X.objective.position&&le.position.fromArray(X.objective.position),Te&&ye.alive)r.position.fromArray(Pe||ye.position),r.position.y+=ye.crouch?37:56,r.rotation.set(Se,ve,0,"YXZ");else if(Te)Me?(r.position.fromArray(Me.position),r.position.y+=Me.crouch?37:56,r.rotation.set(Me.pitch,Me.yaw,0,"YXZ")):(r.position.set(0,700,900),r.lookAt(0,0,0));else{let de=ze?.6:q*35e-6;r.position.set(Math.sin(de)*e.maps[he].extent*.8,400,Math.cos(de)*e.maps[he].extent*.8),r.lookAt(0,40,0)}if(G&&(G.rig.visible=!1),Te&&Me?.alive){let de=ce(Me);de.rig.visible=!Me.scoped;let Ae=ze?0:Math.exp(-Math.max(0,q-Re)/65),Ue=ze?0:Math.exp(-Math.max(0,q-je)/100);de.rig.position.set(0,(Me.crouch?-39:-56)*.8-5,-10+Ae*1.2),de.update({...Me,pitch:0},X,q,ge,{reduced:ze}),r.rotation.x+=Ae*.009,r.rotation.z+=Ue*.012}let Ce=Me?.scoped&&Te?co(e.weapons[Me.weapon]):Ie;r.fov!==Ce&&(r.fov=Ce,r.updateProjectionMatrix()),W.update(X,Me,r,innerHeight,Te,e.maps[he])}else{W.hide(),Ze(he<0?0:he),C.forEach(pe=>pe.rig.visible=!1),G&&(G.rig.visible=!1);let ye=ze?.6:q*4e-5;r.position.set(Math.sin(ye)*1e3,400,Math.cos(ye)*1e3),r.lookAt(0,30,0)}if(K&&!ze){let ye=(q-y)/1e3;if(Z.opacity=Math.max(0,1-ye/.25),ye<.25){for(let pe=0;pe<32;pe++){let Me=pe*2.39996,Ce=30+pe%7*11;te[pe*3]=K[0]+Math.cos(Me)*ye*Ce,te[pe*3+1]=K[1]+(20+pe%5*15)*ye-180*ye*ye,te[pe*3+2]=K[2]+Math.sin(Me)*ye*Ce}_e.attributes.position.needsUpdate=!0}}else Z.opacity=0;F.frame(q,ze,fe<1),xe.intensity=ze?0:q<Ve?150:0;for(let ye of me)ye.until<q&&(ye.mesh.visible=!1);n.render(s,r)}}function b(X=Ie){Ie=X;let Y=innerWidth,q=innerHeight;n.setPixelRatio(Math.min(fe,Math.sqrt((t?1280*720:2560*1440)/(Y*q)))),n.setSize(Y,q,!1),r.aspect=Y/q,r.fov=Ie,r.updateProjectionMatrix()}function B(X){n.toneMappingExposure=1.05*X}function V(X){fe=Math.min(X,t?1:1.5),b()}function $(){d=!0,W.dispose(),G?.dispose();for(let X of C)X.dispose();z.dispose(),i.removeEventListener("webglcontextlost",h),i.removeEventListener("webglcontextrestored",f),F.dispose(),L.dispose(),s.traverse(X=>{if(X.geometry?.dispose(),X.material)for(let Y of Array.isArray(X.material)?X.material:[X.material])Y.map?.dispose(),Y.dispose()}),c.dispose(),n.dispose()}async function be(X){await z.preload(X).catch(q=>{throw q.asset=!0,q});for(let q=0;q<10;q++)C.push(oe(q,q%6));for(let q of C)q.rig.position.fromArray(e.maps[0].spawns[Math.floor(q.slot/5)][q.slot%5]);r.position.set(0,400,900),r.lookAt(0,30,0);let Y=ce({slot:0,hero:0,weapon:2});Y.rig.position.set(0,-49,-10),await n.compileAsync(s,r),Y.rig.visible=!1,n.render(s,r),await new Promise(requestAnimationFrame)}return Ze(0),b(),{preload:be,renderer:n,scene:s,camera:r,setMap:Ze,frame:M,resize:b,resolution:V,exposure:B,dispose:$,shoot:U,accept:H,get viewModelTriangles(){return G?.armTriangles||0}}}function ad(i,e){for(let t of e.obstacles){if(i[1]>=t.max[1])continue;let n=[t.min[0]-18,t.min[2]-18],s=[t.max[0]+18,t.max[2]+18];if(i[0]>n[0]&&i[0]<s[0]&&i[2]>n[1]&&i[2]<s[1]){let r=[i[0]-n[0],s[0]-i[0],i[2]-n[1],s[1]-i[2]],a=Math.min(...r);r[0]===a?i[0]=n[0]:r[1]===a?i[0]=s[0]:r[2]===a?i[2]=n[1]:i[2]=s[1]}}return i[0]=Math.max(-e.extent+20,Math.min(e.extent-20,i[0])),i[2]=Math.max(-e.extent+20,Math.min(e.extent-20,i[2])),i}function Mm(i,e,t={mobility:1}){let n=Math.max(1,Math.hypot(i.x,i.y)),s=e.speed*(t.mobility??1)*(i.crouch?.45:i.walk||i.scope?.55:1);return[(-Math.sin(i.yaw)*i.y+Math.cos(i.yaw)*i.x)/n*s,0,(-Math.cos(i.yaw)*i.y-Math.sin(i.yaw)*i.x)/n*s]}function Sm(i,e,t,n,s,r){let a=e.scope&&r.scoped,o=Mm({...e,scope:a},s,r);e.jump&&!i.jumpHeld&&i.position[1]<=0&&(i.vy=220),i.jumpHeld=!!e.jump;for(let c=t;c>1e-8;){let l=Math.min(.015625,c);c-=l,i.vy-=600*l,i.position[0]+=o[0]*l,i.position[1]+=i.vy*l,i.position[2]+=o[2]*l,i.position[1]<0&&(i.position[1]=0,i.vy=0),ad(i.position,n)}}var Ll=class{constructor(){this.history=[],this.position=null,this.offset=[0,0,0],this.time=null,this.state=null}reset(e,t){this.history=[],this.state={position:[...e.position],vy:e.velocity?.[1]||0,jumpHeld:!1},this.position=[...e.position],this.offset=[0,0,0],this.time=t,this.lastControl=null}record(e,t){this.history.push({input:{...e},at:t}),this.history.length>128&&this.history.shift()}reconcile(e,t,n,s,r,a=!0){if(!this.state){this.reset(e,t);return}this.lastControl&&this.step(this.lastControl,t,n,s,r,a);let o=this.history.findLast(d=>d.input.seq<=e.last_seq),c=this.history.filter(d=>d.input.seq>e.last_seq),l={position:[...e.position],vy:e.velocity?.[1]||0,jumpHeld:!!o?.input.jump};if(a)for(let d=0;d<c.length;d++){let h=Math.max(t-250,c[d].at),f=Math.min(t,c[d+1]?.at??t);f>h&&Sm(l,c[d].input,(f-h)/1e3,n,s,r)}let u=this.position.map((d,h)=>d-l.position[h]);this.offset=Math.hypot(...u)>160?[0,0,0]:u,this.state=l,this.time=t,this.history=o?[o,...c]:c,this.position=l.position.map((d,h)=>d+this.offset[h])}step(e,t,n,s,r,a=!0){if(!this.state)return null;this.lastControl=e;let o=Math.max(0,Math.min(.25,(t-this.time)/1e3));this.time=t,a&&Sm(this.state,e,o,n,s,r);let c=Math.exp(-o*20);return this.offset=this.offset.map(l=>l*c),this.position=this.state.position.map((l,u)=>l+this.offset[u]),ad(this.position,n),this.position}};var Dl=class{constructor(){this.reset()}reset(){this.frames=[],this.renderTick=0}push(e,t){let n=this.frames.at(-1);if(!(n&&e.tick<=n.state.tick)){for(this.frames.push({state:e,now:t});this.frames.length>16;)this.frames.shift();n||(this.renderTick=e.tick)}}sample(e,t){let n=this.frames.at(-1);if(!n)return null;let s=Math.min(n.state.tick,n.state.tick+Math.max(0,e-n.now)*.064-4);this.renderTick=Math.max(this.renderTick,s);let r=this.frames[0],a=n;for(let l of this.frames)if(l.state.tick<=this.renderTick&&(r=l),l.state.tick>=this.renderTick){a=l;break}let o=a.state.tick===r.state.tick?1:Math.max(0,Math.min(1,(this.renderTick-r.state.tick)/(a.state.tick-r.state.tick))),c=n.state;return{...c,players:c.players.map((l,u)=>{if(u===t||l.hidden||!l.position)return l;let d=r.state.players[u],h=a.state.players[u];if(!d?.position||!h?.position||d.hidden||h.hidden||d.life!==l.life||h.life!==l.life||d.alive!==l.alive||h.alive!==l.alive||Math.hypot(...h.position.map((m,_)=>m-d.position[_]))>200)return l;let f=Math.atan2(Math.sin(h.yaw-d.yaw),Math.cos(h.yaw-d.yaw));return{...l,position:d.position.map((m,_)=>m+(h.position[_]-m)*o),yaw:d.yaw+f*o,pitch:d.pitch+(h.pitch-d.pitch)*o}})}}viewTick(){return Math.max(0,Math.floor(this.renderTick))}};function Em(){try{return localStorage.getItem("utxoplay:quality")||"auto"}catch{return"auto"}}var od=class{constructor(e=2,t=e){this.max=e,this.ratio=Math.min(e,Math.max(.75,t)),this.slow=0,this.fast=0}sample(e,t="auto"){if(t!=="auto")return this.ratio=t==="low"?Math.min(1,this.max):this.max,this.slow=this.fast=0,this.ratio;let n=Math.min(e,50);return this.slow=e>24?this.slow+n:Math.max(0,this.slow-n*2),this.fast=e<20?this.fast+n:Math.max(0,this.fast-n*4),this.slow>=350&&(this.ratio=Math.max(.75,this.ratio-.25),this.slow=this.fast=0),this.fast>=8e3&&(this.ratio=Math.min(this.max,this.ratio+.25),this.fast=0),this.ratio}};function Tm(i,{active:e=()=>!0,maxFps:t=60,maxResolution:n=2,initialResolution:s=n,onResolution:r}={}){let a=0,o=0,c=0,l=!1,u=Em(),d=0,h=0,f=0,m=new od(Math.min(globalThis.devicePixelRatio||1,n),s),_=m.ratio;r?.(_);function g(w){if(a=0,l||document.hidden)return;a=requestAnimationFrame(g);let x=e(),E=1e3/(x?t:30);if(c&&w+.25<c)return;c=c?c+E:w+E,c<w&&(c=w+E);let T=o?w-o:1e3/60,P=Math.min(T,50);o=w;let v=x||u!=="auto"?m.sample(T,u):m.ratio;v!==_&&(_=v,r?.(_));let L=performance.now();i(w,P,_),f+=performance.now()-L,h++,w-d>=1e3&&(document.documentElement.dataset.renderFps=String(Math.round(h*1e3/(w-d))),document.documentElement.dataset.renderMs=(f/h).toFixed(2),document.documentElement.dataset.renderScale=_.toFixed(2),d=w,h=f=0)}function p(){cancelAnimationFrame(a),a=0,o=c=0,d=performance.now(),h=f=0,!document.hidden&&!l&&(a=requestAnimationFrame(g))}function S(){u=Em(),m.slow=m.fast=0}return document.addEventListener("visibilitychange",p),addEventListener("storage",S),addEventListener("utxoplay:quality",S),p(),()=>{l=!0,cancelAnimationFrame(a),document.removeEventListener("visibilitychange",p),removeEventListener("storage",S),removeEventListener("utxoplay:quality",S)}}var iM={0:{duration:.28,lowpass:210,pitch:140,drop:85,body:.78,bodyDecay:.085,crack:.9,crackDecay:.009,ring:690,ringLevel:.2,ringDecay:.07,tail:.38,tailDecay:.16},1:{duration:.15,lowpass:680,pitch:520,drop:360,body:.42,bodyDecay:.037,crack:.75,crackDecay:.004,ring:1750,ringLevel:.27,ringDecay:.035,tail:.16,tailDecay:.07},4:{duration:.38,lowpass:180,pitch:110,drop:70,body:.9,bodyDecay:.105,crack:.86,crackDecay:.012,ring:420,ringLevel:.12,ringDecay:.09,tail:.5,tailDecay:.22,blast:.65,blastDecay:.07,mechanism:.42}};function wm(i,e,t){let n=(i-e)/t;return n>=0&&n<=1?Math.sin(Math.PI*n)**2:0}function Am(i,e=44100){let t=iM[i];if(!t)return null;let n=Math.ceil(t.duration*e),s=new Float32Array(n),r=Math.min(1,2*Math.PI*t.lowpass/e),a=t.blast?Math.min(1,2*Math.PI*1100/e):0,o=2654435769+i*1831565813>>>0,c=0,l=0,u=0,d=0;for(let h=0;h<n;h++){let f=h/e;o=Math.imul(o,1664525)+1013904223>>>0;let m=o/2147483648-1;c+=(m-c)*r,a&&(l+=(m-l)*a);let _=m-c;u+=2*Math.PI*(t.pitch-t.drop*Math.min(1,f/.12))/e;let g=Math.tanh(Math.sin(u)*2)*t.body*Math.exp(-f/t.bodyDecay),p=_*t.crack*Math.exp(-f/t.crackDecay),S=Math.sin(2*Math.PI*t.ring*f)*t.ringLevel*Math.exp(-f/t.ringDecay),w=c*t.tail*Math.exp(-f/t.tailDecay),x=t.blast?(l-c)*t.blast*Math.exp(-f/t.blastDecay):0,E=t.mechanism?_*t.mechanism*(wm(f,.152,.018)+.7*wm(f,.296,.022)):0,T=Math.min(1,(t.duration-f)/.012),P=(g+p+S+w+x+E)*T;s[h]=P,d=Math.max(d,Math.abs(P))}if(d>0)for(let h=0;h<n;h++)s[h]*=.86/d;return s}var Rm=[0,1,4];function Cm(i){let e,t,n=0,s=0,r=new Map;function a(){try{e??=new AudioContext,t||(t=e.createGain(),t.connect(e.destination));for(let d of Rm)if(!r.has(d)){let h=Am(d,e.sampleRate),f=e.createBuffer(1,h.length,e.sampleRate);f.copyToChannel(h,0),r.set(d,f)}return t.gain.value=i().sound?(i().volume??.6)*.3:0,e.state==="suspended"&&e.resume(),e}catch{return null}}function o(d,h=.12,f=.2,m="triangle",_=0,g=null){if(globalThis.document?.hidden)return;let p=a();if(!p||!i().sound||n>=32)return;n++;let S=p.currentTime+_,w=p.createOscillator(),x=p.createGain(),E=p.createStereoPanner();E.pan.value=g?.pan||0,w.type=m,w.frequency.setValueAtTime(d*(g?.muffled?.65:1),S),w.frequency.exponentialRampToValueAtTime(Math.max(25,d*.22),S+h),x.gain.setValueAtTime(.001,S),x.gain.exponentialRampToValueAtTime(Math.max(.001,f*(g?.level??1)),S+.004),x.gain.exponentialRampToValueAtTime(.001,S+h),w.connect(x).connect(E).connect(t),w.start(S),w.stop(S+h+.01),w.onended=()=>{n--,w.disconnect(),x.disconnect(),E.disconnect()}}function c(d,h){if(globalThis.document?.hidden||!i().sound||n>=32)return;let f=a();if(!f)return;let m=r.get(d);if(!m)return;let _=f.createBufferSource(),g=f.createBiquadFilter(),p=f.createGain(),S=f.createStereoPanner();n++,_.buffer=m,g.type="lowpass",g.frequency.value=h?.muffled?900:12e3,p.gain.value=h?.level??1,S.pan.value=h?.pan??0,_.connect(g).connect(p).connect(S).connect(t),_.onended=()=>{n--,_.disconnect(),g.disconnect(),p.disconnect(),S.disconnect()},_.start()}let l=(d=0,h)=>{if(Rm.includes(d)){c(d,h);return}o([410,870,250,1200,95,670,1500,170,1900,740,1120,65][d]||410,.08+(d===11?.2:0),.38,"sawtooth",0,h),o(75,.08,.22,"triangle",0,h)};function u(d,h){if(d==="step"||d==="land"){let f=performance.now();if(f-s<60)return;s=f,o(55,.045,d==="land"?.12:.06,"triangle",0,h)}else d==="reload"?(o(620,.04,.12,"square",0,h),o(900,.035,.1,"square",.09,h)):d==="skill"?(o(300,.25,.15,"sine",0,h),o(900,.15,.12,"sine",.08,h)):["item","utility","plasma"].includes(d)?o(d==="plasma"?50:160,.18,.2,"sawtooth",0,h):d==="planted"?(o(900,.16,.18,"square"),o(1250,.12,.14,"sine",.2)):d==="beep"?o(1100,.055,.1,"sine"):d==="win"?[440,660,880].forEach((f,m)=>o(f,.25,.16,"sine",m*.13)):d==="loss"?[440,330,220].forEach((f,m)=>o(f,.22,.13,"sine",m*.13)):d==="respawn"&&o(650,.15,.12,"sine")}return{ready:a,setVolume:()=>{t&&(t.gain.value=i().sound?(i().volume??.6)*.3:0)},shot:l,cue:u,hit:(d=!1)=>{o(d?2100:1450,d?.09:.045,.18,"sine"),d&&o(2700,.04,.1,"sine",.05)},kill:()=>{o(700,.09,.15,"sine"),o(1400,.1,.12,"sine",.07)},damage:d=>o(65,.16,Math.min(.4,.1+d/150)),dispose:()=>e?.close()}}var mn={confirm:0,back:1,reload:2,skill:3,previous:4,next:5,scope:6,fire:7,scoreboard:8,menu:9,walk:10,interact:11,armory:12,utility:13,left:14,right:15};function cd(i){return Array.from(i||[]).find(e=>e&&e.connected!==!1&&e.mapping==="standard"&&e.axes?.length>=4&&e.buttons?.length>=16)||null}function Pm(i=0,e=0,t=.18){let n=Math.hypot(i,e);if(!Number.isFinite(n)||n<=t)return{x:0,y:0};let r=(Math.min(1,n)-t)/(1-t)/n;return{x:i*r,y:e*r}}function sM(i){let e=Pm(i.axes[0],i.axes[1]),t=Pm(i.axes[2],i.axes[3]),n=Array.from({length:17},(r,a)=>!!(i.buttons[a]?.pressed||i.buttons[a]?.value>.5)),s={jump:n[0],crouch:n[1],reload:n[2],skill:n[3],scope:n[6],fire:n[7],walk:n[10],interact:n[11],utility:n[13]};return{index:i.index,move:{x:e.x,y:-e.y},look:t,held:s,buttons:n,engaged:n.some(Boolean)||Math.hypot(e.x,e.y)>.05||Math.hypot(t.x,t.y)>.05}}var Nl=class{constructor(){this.index=null,this.previous=Array(17).fill(!1),this.direction=null,this.repeatAt=0}reset(){this.index=null,this.previous.fill(!1),this.direction=null,this.repeatAt=0}update(e,t){let n=cd(e);if(!n){let d=this.index!==null;return this.reset(),{connected:!1,disconnected:d,held:{},move:{x:0,y:0},look:{x:0,y:0},pressed:[],released:[],navigation:null,engaged:!1}}this.index!==n.index&&this.reset(),this.index=n.index;let s=sM(n),r=[],a=[];for(let d=0;d<s.buttons.length;d++)s.buttons[d]&&!this.previous[d]&&r.push(d),!s.buttons[d]&&this.previous[d]&&a.push(d);this.previous=s.buttons;let{buttons:o,move:c}=s,l=o[12]?"up":o[13]?"down":o[14]?"left":o[15]?"right":Math.abs(c.y)>.7&&Math.abs(c.y)>Math.abs(c.x)?c.y>0?"up":"down":Math.abs(c.x)>.7?c.x<0?"left":"right":null,u=l&&(l!==this.direction||t>=this.repeatAt)?l:null;return u&&(this.repeatAt=t+(l===this.direction?140:280)),this.direction=l,{...s,connected:!0,disconnected:!1,pressed:r,released:a,navigation:u}}};function Im({audio:i,getPrefs:e,getRoom:t,getYaw:n,getGamepad:s,spec:r}){let a=F=>document.getElementById(F),o=new cs,c=null,l=0,u=!1,d=0,h=0,f=null,m=0,_=0,g=!1,p=-1,S=null,w=0,x=new Map,E=(F,C)=>{a(F).textContent!==C&&(a(F).textContent=C)};function T(F,C=2600){E("combat-banner",F),m=performance.now()+C}function P(F){let C=e(),I=performance.now();if(!C.haptics||!C.motion||I-w<=100)return;w=I,navigator.vibrate?.(F);let W=s?.()?.vibrationActuator;W?.effects?.includes("dual-rumble")&&W.playEffect("dual-rumble",{duration:F,strongMagnitude:.35,weakMagnitude:.6}).catch(()=>{})}function v(F){if(!F?.state)return;F.id!==c&&(c=F.id,o=new cs,S=null,_=0,g=!1,p=-1,l=d=m=0);let C=F.state,I=C.players[F.slot],W=performance.now();I.life!==S&&(S=I.life,x.clear(),E("death-detail",""),E("death-tip",""),E("killer","Your squad is still in the fight."),f=null);let z=j=>j===F.slot?"YOU":F.roster[j]?.name||"Opponent";for(let j of o.consume(F.feedback,C.tick)){let he=C.tick-j.tick<=32;if(j.kind==="shot")he&&!j.self&&i.shot(j.value,{pan:Math.sin(j.bearing+n()),level:j.level,muffled:j.muffled});else if(["step","land","reload","skill","item","utility","plasma"].includes(j.kind))he&&i.cue(j.kind,{pan:j.self?0:Math.sin(j.bearing+n()),level:j.level,muffled:j.muffled});else if(j.kind==="hit"||j.kind==="headshot"){if(j.actor===F.slot&&(l=W+170,u=j.kind==="headshot",he&&i.hit(u)),j.target===F.slot){let fe=x.get(j.actor)||{damage:0,hits:0,head:!1};fe.damage+=j.value,fe.hits++,fe.head||=j.kind==="headshot",fe.bearing=j.bearing,x.set(j.actor,fe),d=W+1100,h=Math.min(.32,.1+j.value/240),f=j.bearing,he&&(i.damage(j.value),P(15))}}else if(j.kind==="kill"){if(j.actor===F.slot&&(he&&(i.kill(),P(12)),T("ELIMINATED \xB7 "+z(j.target),1400)),j.target===F.slot){let Ie=x.get(j.actor);E("killer","Eliminated by "+z(j.actor)),E("death-detail",(r.weapons[j.value]?.name||"Combat damage")+(Ie?" \xB7 "+Ie.hits+" hits \xB7 "+Ie.damage+" HP":"")),E("death-tip",Ie?.head?"Headshot. Use cover and avoid repeat peeks.":Math.abs(Math.atan2(Math.sin((Ie?.bearing??0)+I.yaw),Math.cos((Ie?.bearing??0)+I.yaw)))>1.1?"Flanked. Check your sides before crossing.":"Strafe to cover. Stop briefly for accurate bursts.")}let fe=document.createElement("div");for(fe.textContent=z(j.actor)+" \u25B8 "+z(j.target),fe.dataset.until=String(W+4500),a("kill-feed").append(fe);a("kill-feed").children.length>3;)a("kill-feed").firstChild.remove()}else if(j.kind==="planted")T("RELAY PLANTED \xB7 SITE "+(j.value===0?"A":"B")),he&&i.cue("planted");else if(["defused","detonation","elimination","time"].includes(j.kind)){let fe=j.value===I.team;T((fe?"ROUND WON \xB7 ":"ROUND LOST \xB7 ")+{defused:"RELAY DEFUSED",detonation:"RELAY DETONATED",elimination:"SQUAD ELIMINATED",time:"TIME EXPIRED"}[j.kind],4500),he&&i.cue(fe?"win":"loss")}else j.kind==="round"?T("ROUND "+j.value+" \xB7 PREPARE YOUR LOADOUT"):j.kind==="match_end"?(T(C.winner===I.team?"MATCH WON":C.winner==null?"MATCH DRAW":"MATCH LOST",4500),he&&i.cue(C.winner===I.team?"win":"loss")):j.kind==="respawn"&&he?i.cue("respawn"):j.kind==="pickup"?T("RELAY ACQUIRED \xB7 HOLD USE AT A OR B"):j.kind==="buy"&&T("LOADOUT UPDATED",1e3)}let G=C.objective,oe=G.actor===F.slot?G.progress:0,ce=G.planted?7:3;if(a("objective-progress").hidden=!oe,a("objective-progress").max=ce*64,a("objective-progress").value=oe,_>0&&!oe&&G.planted===g&&C.phase==="live"&&I.alive&&T("INTERRUPTED \xB7 STAND STILL; DO NOT FIRE OR JUMP",2e3),_=oe,g=G.planted,G.planted&&C.phase==="live"){let j=Math.ceil(G.fuse/64);j!==p&&j<=10&&i.cue("beep"),p=j}else p=-1;let xe=[];I.disabled&&xe.push("EMP "+Math.ceil(I.disabled/64)+"s"),I.protection&&xe.push("SPAWN SHIELD "+Math.ceil(I.protection/64)+"s"),I.effect&&xe.push((I.hero===2?"SHIELD":I.hero===5?"OVERDRIVE":"SKILL")+" "+Math.ceil(I.effect/64)+"s"),I.overclock&&xe.push("REDLINE "+Math.ceil(I.overclock/64)+"s"),I.revealed&&xe.push("REVEALED "+Math.ceil(I.revealed/64)+"s"),E("buffs",xe.slice(0,2).join(" \xB7 ")),a("vitals-state").classList.toggle("low-health",I.alive&&I.health/r.heroes[I.hero].health<.3)}function L(F){let C=t(),I=C?.state?.players[C.slot],W=e();a("hit-marker").style.opacity=F<l?"1":"0",a("hit-marker").classList.toggle("headshot",u),a("damage").style.opacity=String(Math.max(0,(d-F)/1100)*h),a("damage-bearing").style.opacity=F<d&&f!=null?"1":"0",f!=null&&(a("damage-bearing").style.transform=`translate(-50%,-50%) rotate(${f+n()}rad)`),a("combat-banner").hidden=F>=m;for(let z of[...a("kill-feed").children])Number(z.dataset.until)<F&&z.remove();if(I){let z=I.scoped?co(r.weapons[I.weapon]):W.fov,G=Math.min(48,Math.max(3,Math.tan(_m(I,r.weapons[I.weapon])*Math.PI/360)*innerHeight/(2*Math.tan(z*Math.PI/360))));a("crosshair").style.setProperty("--gap",G+"px"),a("crosshair").style.opacity=I.scoped||!I.alive?"0":"1"}}return{accept:v,render:L,banner:T}}function Lm(i){let e=null,t=null,n=()=>{let a=i.map(o=>document.getElementById(o)).find(o=>!o.hidden);for(let o of["panel","hud","touch"])document.getElementById(o).inert=!!a;a&&a!==t?(e=document.activeElement,t=a,a.querySelector("button")?.focus({preventScroll:!0})):!a&&t&&(t=null,e?.isConnected&&!e.closest("[hidden]")&&e.focus({preventScroll:!0}),e=null)},s=new MutationObserver(n);for(let a of i){let o=document.getElementById(a);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),s.observe(o,{attributes:!0,attributeFilter:["hidden"]})}let r=a=>{if(!t)return;if(a.code==="Escape"){a.preventDefault(),a.stopImmediatePropagation(),t.querySelector(".close")?.click();return}if(a.code!=="Tab")return;a.preventDefault(),a.stopImmediatePropagation();let o=[...t.querySelectorAll("button:not(:disabled),input:not(:disabled),select:not(:disabled),a[href]")].filter(l=>l.checkVisibility());if(!o.length)return;let c=o.indexOf(document.activeElement);o[(c+(a.shiftKey?-1:1)+o.length)%o.length].focus()};return addEventListener("keydown",r,!0),()=>{s.disconnect(),removeEventListener("keydown",r,!0)}}var Ni=window.BotStrikeStartup;Ni?.boot();var ne=i=>document.getElementById(i),Gl="/games/botstrike/api",qn=ne("arena"),lt=await fetch("./spec.json").then(i=>{if(!i.ok)throw Error("World specification unavailable");return i.json()}),Bm={};try{Bm=JSON.parse(localStorage.getItem("botstrike:settings")||"{}")}catch{}var Ke=gm(Bm,matchMedia("(pointer:coarse)").matches),zm=-1/0,oi=i=>pm(i,Ke.keyboardLayout),lo=i=>ui==="gamepad"&&{reload:"X",skill:"Y",utility:"D-PAD DOWN",use:"R3"}[i]||oi(Ke.bindings[i]),ki=Cm(()=>Ke),Wr=new Set,vd=0,yd=0,ae=null,fd=null,Wt,Kt,Ct=!1,Ln=!1,Oi=null,hs=!1,Fi=!1,ci=!1,ld=!1,pd=!1,zs=0,Yt=0,li=0,Dm=0,md,gd=0,Fl=-1,hd=null,ho=null,rM=100,Ul=!1,kl=0;var bd=0,aM=!1,jr=!1,oM=!1,Ui={x:0,y:0},Gs={},hi={},ds=null,In=null,Gr=new Set,uo=new Dl,Hr=new Ll,Md=[],cM=[],Nm=-1/0,Di,ud=0,xd=-1,Fm=()=>!Ke.motion||matchMedia("(prefers-reduced-motion: reduce)").matches,Gm=new Nl,us={move:{x:0,y:0},look:{x:0,y:0},held:{}},ui="mouse";function Hm(){try{return navigator.getGamepads?.()||[]}catch{return[]}}var Vm=Im({audio:ki,getPrefs:()=>Ke,getRoom:()=>ae,getGamepad:()=>cd(Hm()),getYaw:()=>{let i=ae?.state,e=i?.players[ae.slot],t=i?.players[ae.spectate];return e?.alive?Yt:(t?.alive&&t.team===e?.team?t:i?.players.find(n=>n.team===e?.team&&n.alive))?.yaw??Yt},spec:lt});function $e(i,e){let t=ne(i),n=String(e);t.textContent!==n&&(t.textContent=n)}function Mt(i,e=!1){$e("status",i),ne("status").classList.toggle("error",e)}function lM(i,e){return`<img src="./art/hero-${e}.webp" width="360" height="450" alt="${i.name} in-game model" decoding="async">`}for(let[i,e]of lt.heroes.entries()){let t=document.createElement("button");t.className="hero-card",t.style.setProperty("--hero",e.color),t.innerHTML=lM(e,i)+`<b>${e.name}</b><small>${e.role.toUpperCase()}</small><span class="stats">${e.health} HP \xB7 ${e.armor} ARMOR</span>`,t.setAttribute("aria-label",e.name+", "+e.role),t.onclick=()=>Wm(i),ne("heroes").append(t)}function Wm(i){vd=i,[...ne("heroes").children].forEach((t,n)=>t.setAttribute("aria-pressed",String(i===n)));let e=lt.heroes[i];$e("hero-detail",`${e.ability.toUpperCase()} / ${e.cooldown}s cooldown \u2014 ${e.description} Speed ${e.speed}.`)}Wm(0);function qm(i,e,t,n=[],s=-1,r=null){let a=(t-16)/(e.extent*2),o=l=>[t/2+l[0]*a,t/2+l[2]*a];i.clearRect(0,0,t,t),i.fillStyle="rgba(15,32,42,.38)",i.fillRect(0,0,t,t),i.strokeStyle="rgba(210,235,242,.25)",i.strokeRect(8,8,t-16,t-16),i.fillStyle="#536678";for(let l of e.obstacles){let u=o(l.min);i.fillRect(u[0],u[1],(l.max[0]-l.min[0])*a,(l.max[2]-l.min[2])*a)}i.font=`bold ${Math.max(10,t/12)}px monospace`,i.textAlign="center";for(let[l,u]of e.sites.entries()){let d=o(u);i.fillStyle=l?"#ff9878":"#68e8ff",i.fillText(l?"B":"A",d[0],d[1]),r?.site===l&&r.planted&&(i.strokeStyle="#ffce8e",i.beginPath(),i.arc(d[0],d[1]-4,12,0,Math.PI*2),i.stroke())}let c=n[s];for(let l of n){if(!l.alive||l.hidden||!l.position||c&&l.team!==c.team&&!l.revealed)continue;let u=o(l.position);i.fillStyle=l.slot===s?"#fff":l.team===c?.team?"#68e8ff":"#ff9878",l.slot===s?(i.beginPath(),i.arc(...u,4,0,Math.PI*2),i.fill()):Cu(i,l.team===c?.team?"ally":"enemy",...u,16),l.slot===s&&(i.strokeStyle="#fff",i.beginPath(),i.moveTo(...u),i.lineTo(u[0]-Math.sin(Yt)*10,u[1]-Math.cos(Yt)*10),i.stroke())}if(r?.planted){let l=o(r.position);i.strokeStyle="#ffce8e",i.lineWidth=2,i.strokeRect(l[0]-5,l[1]-5,10,10)}}for(let[i,e]of lt.maps.entries()){let t=document.createElement("button");t.className="map-card";let n=document.createElement("canvas");n.width=180,n.height=180,qm(n.getContext("2d"),e,180);let s=document.createElement("img");s.src="./art/map-"+i+".webp",s.alt=e.name+" in-game view",s.width=720,s.height=405,s.decoding="async",t.append(s,n);let r=document.createElement("span");r.innerHTML=`<b>${e.name}</b><small>${e.description}</small>`,t.append(r),t.onclick=()=>Xm(i),ne("maps").append(t)}function Xm(i){yd=i,[...ne("maps").children].forEach((e,t)=>e.setAttribute("aria-pressed",String(i===t))),ae||Wt?.setMap(i)}Xm(0);function Bi(){for(let i of Md)i();Wr.clear(),aM=jr=oM=!1,Ui={x:0,y:0},us={move:{x:0,y:0},look:{x:0,y:0},held:{}},Gs={},hi={},ne("touch-scope").setAttribute("aria-pressed","false"),ne("move-knob").style.transform="translate(0,0)"}function jm(){let i=Ct&&!window.BotStrikeImmersive?.blocked&&ne("buy-menu").hidden&&ne("scoreboard").hidden,e=(t,n=t)=>!!(i&&(Wr.has(Ke.bindings[t])||t==="walk"&&Ke.bindings.walk==="ShiftLeft"&&Wr.has("ShiftRight")||hi[n]||us.held[n]||performance.now()<(Gs[n]||0)));return{seq:++zs,viewTick:uo.viewTick(),x:i?Math.max(-1,Math.min(1,Number(e("right"))-Number(e("left"))+Ui.x+us.move.x)):0,y:i?Math.max(-1,Math.min(1,Number(e("forward"))-Number(e("back"))-Ui.y+us.move.y)):0,yaw:Yt,pitch:li,fire:!!(i&&(e("fire")||jr)),reload:e("reload"),walk:e("walk"),crouch:e("crouch"),jump:e("jump"),ability:e("skill"),interact:e("use","interact"),scope:e("scope"),weapon:ds,item:e("flash")?1:e("smoke")?2:e("grenade")?3:e("utility")?Number(ne("utility-choice").value):0}}function Km(i,e){let t=ae?.state?.players[ae.slot];!Ct||!i.fire||!t?.alive||ae.state.phase!=="live"||t.reload||t.ammo[t.weapon]<=0||(xd!==t.weapon&&(xd=t.weapon,ud=e+t.fire_wait/64*1e3),!(e<ud)&&(ud=e+lt.weapons[t.weapon].interval/64*1e3,ki.shot(t.weapon),Wt?.shoot(ae.slot,{...t,yaw:Yt,pitch:li,position:In||t.position},e),bd=e))}function jt(){if(ae?.status!=="running"||Kt?.readyState!==WebSocket.OPEN||!Ln||ci||document.hidden)return;let i=performance.now(),e=1e3/60-(i-Nm);if(e>0){Di||(Di=setTimeout(()=>{Di=null,jt()},e));return}if(Kt.bufferedAmount>16e3){Di||(Di=setTimeout(()=>{Di=null,jt()},100));return}clearTimeout(Di),Di=null,Nm=i;let t=jm();Hr.record(t,i),Km(t,i),Kt.send(JSON.stringify({type:"input",room:ae.id,input:t})),jr=!1}function on(){Fi=!1,qr=!1,Ct=!1,Bi(),ne("panel").hidden=!1,ne("buy-menu").hidden=!0,ne("scoreboard").hidden=!0,document.documentElement.dataset.playing="false",document.pointerLockElement&&document.exitPointerLock?.(),ui==="gamepad"&&requestAnimationFrame(()=>Bl()),jt()}function Vr(){let i=Ln&&!!Oi,e=["running","waiting"].includes(ae?.status);ne("leave").disabled=e&&Kt?.readyState===WebSocket.OPEN&&!i,ne("start").disabled=ae?.status==="waiting"&&!i,ne("room-hero").disabled=!e||!i,ne("buy-open").disabled=!i,ne("spectate-next").disabled=!i||!ae?.state||ae.state.players.filter(t=>t.team===ae.state.players[ae.slot].team&&t.alive).length<2}addEventListener("botstrike:immersive",i=>{i.detail.blocked&&on()});async function Jt(){if(window.BotStrikeImmersive?.blocked){on();return}if(ae?.status!=="running"){Mt(ae?.status==="waiting"?ae.kind==="public"?"Finding players\u2026":"Waiting for the host\u2026":"Waiting for your squad connection\u2026");return}if(!ae.state||Kt?.readyState!==WebSocket.OPEN){Fi=!0,Mt("Waiting for match state\u2026");return}if(!Ln){Fi=!0,ci=!0,Mt("Taking control of your seat\u2026"),hs||(hs=!0,Kt.send(JSON.stringify({type:"claim",room:ae.id})));return}if(ci){Fi=!0,Mt("Syncing your seat\u2026");return}if(Fi=!1,ki.ready(),Ct=!0,ne("panel").hidden=!0,ne("buy-menu").hidden=!0,ne("scoreboard").hidden=!0,document.documentElement.dataset.playing="true",Bi(),qn.focus(),!Ke.touch&&ui!=="gamepad")try{await qn.requestPointerLock()}catch{Mt("Mouse capture unavailable: hold and drag to aim.")}jt()}async function di(i,e={}){if(ld)return null;if((["start","buy","spectate","hero"].includes(i)||i==="leave"&&["running","waiting"].includes(ae?.status))&&Kt?.readyState===WebSocket.OPEN&&!Oi)return Mt("Resume to take control of your seat.",!0),null;let t=i==="leave"?ae?.id:null;ld=!0;for(let n of["quick","practice","private","join","start","rematch","room-hero"])ne(n).disabled=!0;try{let n=await fetch(Gl+"/action",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:i,...e,...Oi?{controlToken:Oi}:{}}),signal:AbortSignal.timeout(15e3)}),s=await n.json();if(!n.ok)throw Error(s.error||"Request failed");return t&&(Gr.add(t),Gr.size>100&&Gr.delete(Gr.values().next().value)),["create","join","queue"].includes(i)&&s.room&&Gr.delete(s.room.id),Td(s),s}catch(n){return Mt(n.message,!0),null}finally{ld=!1;for(let n of["quick","practice","private","join","start","rematch","room-hero"])ne(n).disabled=!1;Vr()}}var Hl=()=>({mode:ne("mode").value,map:yd,hero:vd,difficulty:Number(ne("difficulty").value)});ne("quick").onclick=async()=>{await di("queue",Hl())&&Jt()};ne("practice").onclick=async()=>{await di("create",{...Hl(),kind:"practice"})&&Jt()};ne("private").onclick=()=>di("create",{...Hl(),kind:"private"});ne("start").onclick=async()=>{await di("start")&&Jt()};ne("join").onclick=async()=>{let i=ne("invite").value.trim().toLowerCase();if(!/^[a-f0-9]{24}$/.test(i)){Mt("Enter the full 24-character invite code.",!0);return}await di("join",{room:i,hero:vd})&&Jt()};ne("invite").onkeydown=i=>{i.key==="Enter"&&ne("join").click()};ne("resume").onclick=Jt;ne("menu-toggle").onclick=()=>Ct?on():Jt();ne("leave").onclick=()=>{on(),di("leave")};ne("copy").onclick=()=>navigator.clipboard.writeText(ae.id).then(()=>Mt("Invite copied.")).catch(()=>Mt("Invite: "+ae.id));ne("rematch").onclick=async()=>{let i={...Hl(),mode:ae.config.mode,map:ae.config.map,kind:ae.kind};await di("create",i)&&Jt()};ne("export").onclick=async()=>{try{let i=await fetch(Gl+"/export");if(!i.ok)throw Error("Replay export unavailable");let e=URL.createObjectURL(await i.blob()),t=document.createElement("a");t.href=e,t.download="botstrike-"+ae.id+".json",t.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)}catch(i){Mt(i.message,!0)}};for(let[i,e]of lt.heroes.entries()){let t=document.createElement("option");t.value=i,t.textContent=e.name+" \xB7 "+e.role,ne("room-hero").append(t)}ne("room-hero").onchange=()=>di("hero",{hero:Number(ne("room-hero").value)});function Sd(i=1){let e=ae?.state?.players[ae.slot];if(!e||e.alive)return;let t=ae.state.players.filter(s=>s.team===e.team&&s.alive);if(!t.length)return;let n=Math.max(0,t.findIndex(s=>s.slot===ae.spectate));di("spectate",{slot:t[(n+i+t.length)%t.length].slot})}ne("spectate-next").onclick=()=>Sd();ne("career-refresh").onclick=async()=>{let i=ne("career-refresh");i.disabled=!0;try{let e=await fetch(Gl+"/career",{signal:AbortSignal.timeout(1e4)});if(!e.ok)throw Error("History unavailable. Try again.");let t=await e.json();$e("career-summary",`${t.matches} matches \xB7 ${t.wins} wins / ${t.losses} losses / ${t.draws} draws \xB7 ${t.kills} kills / ${t.deaths} deaths \xB7 ${Math.round(t.ticks/64/60)} minutes controlled`),ne("career-history").replaceChildren(...t.history.map(n=>{let s=document.createElement("div");s.className="career-row";let r=document.createElement("span"),a=document.createElement("span");r.textContent=lt.maps[n.map].name+" \xB7 "+(n.mode==="deathmatch"?"DEATHMATCH":"DEMOLITION");let o=document.createElement("small");return o.textContent=new Date(n.finishedAt).toLocaleString()+" \xB7 "+n.kind,r.append(o),a.textContent=(n.outcome==="left"?"NO RESULT":n.outcome.toUpperCase())+" \xB7 "+n.kills+" / "+n.deaths,s.append(r,a),s})),t.history.length||$e("career-summary","No recorded matches yet. Complete a match to start your career.")}catch(e){$e("career-summary",e.message)}finally{i.disabled=!1}};function Ym(){if(!ae?.state)return;let i=document.createDocumentFragment(),e=document.createElement("div");e.className="score-row",e.innerHTML="<span>PILOT / HERO</span><span>K</span><span>D</span><span>A</span><span>DMG</span>",i.append(e);for(let t of[...ae.state.players].sort((n,s)=>n.team-s.team||s.kills-n.kills)){let n=document.createElement("div");n.className="score-row",n.dataset.team=t.team,n.dataset.relation=t.team===ae.state.players[ae.slot].team?"ally":"enemy",n.innerHTML=`<span>${Ru(n.dataset.relation)}<b>${t.slot===ae.slot?"YOU":ae.roster[t.slot].name}</b><br><small>${lt.heroes[t.hero].name}${t.alive?"":" \xB7 OFFLINE"}</small></span><span>${t.kills}</span><span>${t.deaths}</span><span>${t.assists}</span><span>${t.damage}</span>`,i.append(n)}ne("score-rows").replaceChildren(i)}var qr=!1;function Ed(i=!1){qr=i,Ym(),ne("scoreboard").hidden=!1,Bi(),document.pointerLockElement&&document.exitPointerLock?.()}ne("score-open").onclick=()=>Ed();ne("score-close").onclick=()=>{Ct?Jt():ne("scoreboard").hidden=!0};var Jm=[...lt.weapons.map((i,e)=>({...i,item:e,kind:"weapon",index:e})),...lt.items.map((i,e)=>({...i,item:lt.weapons.length+e,kind:"equipment",index:e}))];for(let i of Jm){let e=document.createElement("button");e.dataset.item=i.item,e.dataset.kind=i.kind,e.innerHTML=`<img src="./art/${i.kind}-${i.index}.webp" alt="${i.name} model" loading="lazy"><b>${i.name}</b><span class="armory-action"></span><small>${i.description}</small>`,e.onclick=async()=>{let t=ae?.state?.players[ae.slot];if(t){if(i.kind==="weapon"&&t.owned[i.index]){ds=i.index,await Jt();return}if(ae.state.phase==="buy"){await di("buy",{item:i.item}),i.kind==="weapon"&&(ds=null);return}i.kind==="equipment"&&i.index>0&&t.items[i.index]>0&&(ne("utility-choice").value=i.index,await Jt(),Gs.utility=performance.now()+100,jt())}},ne("buy-items").append(e)}for(let[i,e]of lt.items.entries()){if(i===0)continue;let t=document.createElement("option");t.value=i,t.textContent=e.name,ne("utility-choice").append(t)}ne("utility-choice").value="2";for(let i of["weapon","equipment"]){let e=document.createElement("button");e.textContent=i==="weapon"?"WEAPONS / 12":"EQUIPMENT / 12",e.setAttribute("aria-pressed",String(i==="weapon")),e.onclick=()=>{for(let t of ne("armory-tabs").children)t.setAttribute("aria-pressed",String(t===e));for(let t of ne("buy-items").children)t.hidden=t.dataset.kind!==i},ne("armory-tabs").append(e)}for(let i of ne("buy-items").children)i.hidden=i.dataset.kind!=="weapon";function Vl(){!ae?.state||ae.status!=="running"||(Bi(),ne("buy-menu").hidden=!1,document.pointerLockElement&&document.exitPointerLock?.(),Zm())}function Zm(){let i=ae?.state?.players[ae.slot];if(!i)return;let e=ae.state.phase==="buy";$e("buy-balance",e?"\u20A1 "+i.credits+" AVAILABLE \xB7 "+Math.ceil(ae.state.phase_ticks/64)+"s BUY TIME":"FIELD LOADOUT \xB7 SELECT A WEAPON OR DEPLOY EQUIPMENT"),[...ne("buy-items").children].forEach((t,n)=>{let s=Jm[n],r=s.kind==="weapon"&&i.owned[s.index],a=i.items[s.index]||0,o=s.kind==="equipment"&&(s.index===0?i.armor>=100:a>=s.capacity);t.disabled=!i.alive||!r&&(e?i.credits<s.cost||o:s.kind==="weapon"||s.index===0||a===0),t.querySelector(".armory-action").textContent=r?i.weapon===s.index?"EQUIPPED":"EQUIP":e?"\u20A1 "+s.cost+(s.kind==="equipment"&&s.index>0?" \xB7 "+a+"/"+s.capacity:""):s.index===0?"PASSIVE ARMOR":(s.activation==="throw"?"DEPLOY":"USE")+" \xB7 "+a,t.setAttribute("aria-pressed",String(r&&i.weapon===s.index))})}ne("buy-open").onclick=Vl;ne("buy-close").onclick=()=>Jt();var Wl=document.createElement("div");Wl.id="weapon-rack";Wl.innerHTML='<button id="rack-open" type="button" title="Open armory"><svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#icon-backpack"/></svg><span></span></button><button id="rack-next" type="button"><span class="rack-art"><img width="640" height="360" alt=""></span><span class="rack-next-copy"><b></b><small></small></span></button>';ne("hud").append(Wl);var fo=ne("rack-open"),Um=fo.querySelector("span"),Pn=ne("rack-next"),hM=Pn.querySelector("img"),Om=Pn.querySelector("b"),km=Pn.querySelector("small");fo.onclick=Vl;Pn.onclick=()=>{let i=ae?.state?.players[ae.slot],e=Number(Pn.dataset.weapon);!Ct||!Ln||!Oi||!i?.alive||!i.owned[e]||(ds=e,jt())};function uM(i){let e=i.owned.flatMap((l,u)=>l?[u]:[]),t=e[(e.indexOf(i.weapon)+1)%e.length],n=Ct&&Ln&&!!Oi&&i.alive;Wl.hidden=!i.alive;let s=`${e.length} OWNED`,r=`Open armory, ${e.length} weapons owned`;if(Um.textContent!==s&&(Um.textContent=s),fo.getAttribute("aria-label")!==r&&fo.setAttribute("aria-label",r),fo.disabled=!n,Pn.hidden=e.length<2,Pn.hidden)return;let a=lt.weapons[t],o=`NEXT \xB7 ${i.ammo[t]} / ${i.reserve[t]}`,c=`Equip ${a.name}, ${i.ammo[t]} rounds, ${i.reserve[t]} reserve`;Pn.dataset.weapon!==String(t)&&(Pn.dataset.weapon=String(t),hM.src=`./art/weapon-${t}.webp`),Om.textContent!==a.name&&(Om.textContent=a.name),km.textContent!==o&&(km.textContent=o),Pn.getAttribute("aria-label")!==c&&Pn.setAttribute("aria-label",c),Pn.disabled=!n}function $m(){if(ae?.kind!=="public"||ae.status!=="waiting")return;let i=ae.roster.filter(t=>!t.bot).length;if(fd===null){$e("room-status",`${i}/10 pilots \xB7 finding match`);return}let e=Math.ceil(Math.max(0,fd-performance.now())/1e3);$e("room-status",e?`${i}/10 pilots \xB7 match in ${e}s`:`${i}/10 pilots \xB7 starting match`)}function Td(i){if(!("room"in i))return;let e=i.room;if(e&&Gr.has(e.id)||e&&ae?.id===e.id&&(e.state?.tick||0)<(ae.state?.tick||0))return;let t=!ae&&!!e;if(ae=e,fd=ae?.kind==="public"&&ae.status==="waiting"&&Number.isFinite(ae.queueRemainingMs)?performance.now()+ae.queueRemainingMs:null,ne("selection").hidden=!!ae,ne("room-info").hidden=!ae,t&&(ne("panel").scrollTop=0),ne("hud").hidden=!ae?.state,ne("touch").hidden=!ae||ae.status!=="running"||!Ke.touch||ae.state?.players[ae.slot]?.alive===!1,!ae){ci=!1,hs=!1,hd=null,In=null,on(),Vr(),Mt("Choose your chassis. Find your squad.");return}ae.id!==hd?(uo.reset(),hd=ae.id,Fl=-1,ho=null,In=null,zs=0,hs=!1,ds=null,cM.length=0,Ul=!1,ci=!1,Wt?.setMap(ae.config.map)):ci&&ae.state&&(uo.reset(),Fl=-1,ho=null,In=null,Ul=!1,ci=!1),ne("start").hidden=ae.status!=="waiting"||!ae.host||ae.kind==="public",ne("resume").hidden=ae.status!=="running",ne("copy").hidden=ae.kind==="practice",ne("rematch").hidden=!["finished","failed","interrupted","cancelled","expired"].includes(ae.status),ne("export").hidden=!ae.proof?.verified,$e("room-title",`${lt.maps[ae.config.map].name} / ${ae.config.mode==="deathmatch"?"TEAM DEATHMATCH":"RELAY DEMOLITION"}`);let n=ae.roster.map((r,a)=>`${r.name}:${ae.state?.players[a]?.hero??ae.config.heroes[a]}:${r.connected}`).join("|");ne("roster").dataset.roster!==n&&(ne("roster").dataset.roster=n,ne("roster").innerHTML=ae.roster.map((r,a)=>`<div class="roster-seat" data-team="${Math.floor(a/5)}">${a===ae.slot?"YOU":r.name}<small>${lt.heroes[ae.state?.players[a]?.hero??ae.config.heroes[a]].name} \xB7 ${r.bot?"AI":r.connected?"CONNECTED":"AI COVER"}</small></div>`).join("")),ae.status==="waiting"&&($e("result-title","SQUAD ASSEMBLY"),ae.kind==="public"?$m():$e("room-status","Share the invite. The host starts when ready; bots fill every empty seat."),on());let s=ae.state?.players[ae.slot]?.hero??ae.config.heroes[ae.slot];if(document.activeElement!==ne("room-hero")&&(ne("room-hero").value=String(ae.selectedHero??s)),ne("room-hero").disabled=!["running","waiting"].includes(ae.status),$e("hero-switch-hint",ae.selectedHero!=null&&ae.selectedHero!==s?"Queued: "+lt.heroes[ae.selectedHero].name+" \xB7 applies during buy time or on reboot.":"Changes apply during buy time or on your next reboot."),Vm.accept(ae),Wt?.accept(ae),ae.state&&ae.state.tick!==Fl){let r=ae.state,a=r.players[ae.slot],o=performance.now();Fl=r.tick,uo.push(r,o),zs=Math.max(zs,a.last_seq),!In||a.alive&&!Ul?(Hr.reset(a,o),In=Hr.position,Yt=a.yaw,li=a.pitch,xd=-1):(Hr.reconcile(a,o,lt.maps[r.config.map],lt.heroes[a.hero],lt.weapons[a.weapon],a.alive&&r.phase==="live"),In=Hr.position),Ul=a.alive,ho!==null&&a.ammo[a.weapon]<ho&&o-bd>Math.min(500,kl+100)&&(ki.shot(a.weapon),Wt?.shoot(ae.slot,a,o),bd=o),ho=a.ammo[a.weapon],rM=a.health;for(let[f,m]of[[0,"a"],[1,"b"]]){let _=f===a.team?"ally":"enemy",g=ne("iff-"+m);g.dataset.relation!==_&&(g.dataset.relation=_,g.innerHTML=Ru(_)+"<span>"+_.toUpperCase()+"</span>",g.style.color=ro[_],ne("score-"+m).style.color=ro[_],ne("score-"+m).setAttribute("aria-label",_+" score"))}$e("score-a",r.score[0]),$e("score-b",r.score[1]),$e("phase",r.phase==="buy"?"BUY PHASE":r.phase==="round_end"?"ROUND COMPLETE":r.config.mode==="deathmatch"?"TEAM DEATHMATCH":"RELAY DEMOLITION");let c=Math.ceil((r.objective.planted?r.objective.fuse:r.phase_ticks)/64);$e("clock",`${Math.floor(c/60)}:${String(c%60).padStart(2,"0")}`),$e("round",r.config.mode==="deathmatch"?"FIRST TO 50":`ROUND ${r.round} \xB7 FIRST TO 13`);let l=lt.heroes[a.hero];$e("hero-label",l.name+" / "+l.role.toUpperCase()),$e("health",a.health),$e("armor",a.armor),ne("health-bar").max=l.health,ne("health-bar").value=a.health,$e("weapon-label",lt.weapons[a.weapon].name),$e("ammo",a.ammo[a.weapon]),$e("reserve","/ "+a.reserve[a.weapon]),uM(a),$e("reload-state",a.reload?"RELOADING "+(a.reload/64).toFixed(1)+"s":a.ammo[a.weapon]===0?lo("reload")+" \xB7 RELOAD":"");let u=a.disabled||a.skill_wait;if($e("touch-skill-value",u?Math.ceil(u/64):""),ne("touch-skill-value").hidden=!u,ne("touch-skill").classList.toggle("cooling",!!u),ne("touch-scope").hidden=!lt.weapons[a.weapon].scoped,ne("touch-interact").hidden=r.config.mode!=="demolition",$e("touch-utility-value",a.items[Number(ne("utility-choice").value)]),ne("touch-utility").setAttribute("aria-label","Use "+lt.items[Number(ne("utility-choice").value)].name),$e("gear-label",lt.items[Number(ne("utility-choice").value)].name+" \xD7 "+a.items[Number(ne("utility-choice").value)]+" \xB7 "+lo("utility")),!ne("buy-menu").hidden)for(let f of ne("utility-choice").options){let m=lt.items[Number(f.value)].name+" \xD7 "+a.items[Number(f.value)];f.textContent!==m&&(f.textContent=m)}$e("skill-name",l.ability.toUpperCase()),$e("skill-state",a.disabled?"EMP "+Math.ceil(a.disabled/64)+"s":a.skill_wait?Math.ceil(a.skill_wait/64)+"s":lo("skill")+" \xB7 READY"),ne("scope").hidden=!a.scoped||!a.alive,document.documentElement.dataset.scoped=String(a.scoped&&a.alive),$e("scope-label",(lt.weapons[a.weapon].id==="rail"?"4.8\xD7 RAIL OPTIC":"2.4\xD7 RECON OPTIC")+" \xB7 "+(a.ammo[a.weapon]||0));let d="";if(r.config.mode==="demolition"){let f=a.team===r.attacker;d=r.objective.planted?f?"DEFEND THE RELAY":"HOLD "+lo("use")+" TO DEFUSE":f?r.objective.carrier===ae.slot?"CARRYING RELAY \xB7 HOLD "+lo("use")+" AT A OR B":"ESCORT THE RELAY TO A OR B":"DEFEND A AND B",r.objective.actor!==null&&(d+=" \xB7 "+(r.objective.progress/64).toFixed(1)+"s")}$e("objective-hud",d),ne("buy-open").hidden=!a.alive,$e("credits",a.credits),ne("buy-menu").hidden||Zm(),ne("death").hidden=a.alive||r.phase==="buy"||r.phase==="round_end";let h=a.alive?null:r.players[ae.spectate]?.alive&&r.players[ae.spectate].team===a.team?r.players[ae.spectate]:r.players.find(f=>f.team===a.team&&f.alive);ne("spectating").hidden=!h,ne("spectate-next").disabled=r.players.filter(f=>f.team===a.team&&f.alive).length<2,h&&$e("spectator-name","WATCHING "+ae.roster[h.slot].name),$e("respawn-label",r.config.mode==="deathmatch"?"REBOOT IN "+Math.ceil(a.respawn/64)+"s":"SPECTATING \xB7 NEXT ROUND"),qm(ne("radar").getContext("2d"),lt.maps[r.config.map],240,r.players,ae.slot,r.objective),ne("scoreboard").hidden||Ym()}if(ae.status==="running"&&($e("result-title","YOUR SQUAD IS LIVE"),$e("room-status",Ln?"The match continues while you are in the menu. Disconnected seats are covered by AI.":"This tab is observing your seat. Resume to take control here."),Mt(Ln?"Connected \xB7 "+(kl?Math.round(kl)+" ms":"squad ready"):"Viewing match. Resume to play.")),["finished","sealing"].includes(ae.status)){on();let r=ae.state?.winner===ae.state?.players[ae.slot]?.team;$e("result-title",ae.state?.winner===null?"MATCH DRAW":r?"NETWORK SECURED":"RELAY LOST"),$e("room-status",ae.status==="sealing"?"Verifying the complete native match replay\u2026":ae.proof?.verified?"Native replay verified. Your signed match export is ready. Replays are kept for 30 days.":"Match ended."),ae.status==="finished"&&Mt("Match complete. Choose rematch or leave to change loadout.")}["failed","interrupted","expired","cancelled"].includes(ae.status)&&(on(),$e("result-title","MATCH INTERRUPTED"),$e("room-status",ae.error||"Start another match."),Mt(ae.error||"Room closed.",!0)),Vr(),Fi&&ae.status==="running"&&ae.state&&Kt?.readyState===WebSocket.OPEN&&Jt()}function Qm(){if(pd)return;clearTimeout(md),Ln=!1,Oi=null,hs=!1;let i=new WebSocket(location.origin.replace(/^http/,"ws")+Gl+"/socket");Kt=i,Vr();let e=setTimeout(()=>{i===Kt&&i.close()},1e4);i.onopen=()=>{i===Kt&&(gd=performance.now())},i.onmessage=t=>{if(i===Kt){gd=performance.now();try{let n=JSON.parse(t.data);if(n.type==="state")Td(n),Dm=0,clearTimeout(e),Ni?.session(),clearTimeout(zl);else if(n.type==="control"){let s=Ln;Ln=n.active,Oi=n.active?n.token:null,hs=!1,Ln?(zs=Math.max(zs,n.nextSeq||0),ci=ae?.status==="running"):s?(ci=!0,on(),Mt("Control moved to another tab. Resume to take control here.")):ae?.status==="running"&&Mt("Viewing match. Resume to play."),Vr()}else n.type==="pong"?kl=performance.now()-n.time:n.type==="error"&&(hs=!1,Fi=!1,Mt(n.error,!0))}catch(n){console.error("BotStrike state update failed",n),i.close()}}},i.onclose=()=>{if(clearTimeout(e),pd||i!==Kt)return;Ln=!1,Oi=null,hs=!1,ci=ae?.status==="running";let t=Fi;on(),Fi=t,Vr(),Mt("Connection interrupted. Reconnecting; AI covers your seat."),md=setTimeout(Qm,Math.min(1e4,500*2**Math.min(Dm++,5)))},i.onerror=()=>{}}ne("aim-assist").closest("label").insertAdjacentHTML("afterend",'<label>Controller aim assist<select id="gamepad-aim-assist"><option value="0">Off</option><option value="1">Standard</option><option value="2">Strong</option></select></label><label>Controller look speed<input id="gamepad-sensitivity" type="range" min="0.4" max="2.5" step="0.1"></label>');ne("haptics").closest("label").lastChild.textContent=" Haptics (supported devices)";var eg={aimAssist:"aim-assist",gamepadAimAssist:"gamepad-aim-assist",sensitivity:"sensitivity",gamepadSensitivity:"gamepad-sensitivity",fov:"fov",ads:"ads",volume:"volume",brightness:"brightness",crosshair:"crosshair-size",crosshairColor:"crosshair-color",sound:"sound",motion:"motion",touch:"touch-controls",invertY:"invert-y",haptics:"haptics"};function ql(){try{localStorage.setItem("botstrike:settings",JSON.stringify(Ke))}catch{}}function tg(){for(let[i,e]of Object.entries(eg))Ke[i]=typeof Ke[i]=="boolean"?ne(e).checked:i==="crosshairColor"?ne(e).value:Number(ne(e).value);ql(),document.documentElement.dataset.touch=String(Ke.touch),ne("touch").hidden=!Ke.touch||ae?.status!=="running",document.documentElement.style.setProperty("--reticle",Ke.crosshairColor),document.documentElement.style.setProperty("--reticle-size",Ke.crosshair),Wt?.resize(Ke.fov),Wt?.exposure(Ke.brightness),ki.setVolume()}for(let[i,e]of Object.entries(eg))typeof Ke[i]=="boolean"?ne(e).checked=Ke[i]:ne(e).value=Ke[i],ne(e).oninput=tg;tg();var Bs=null;function Xr(){ne("key-bindings").replaceChildren(...Object.keys(ks).map(i=>{let e=document.createElement("button");return e.dataset.action=i,e.setAttribute("aria-pressed",String(Bs===i)),e.textContent=(rd[i]||"Weapon "+(Number(i.slice(6))+1))+" \xB7 "+oi(Ke.bindings[i]),e.onclick=()=>{Bs=i,$e("binding-status","Press a key or mouse button for "+(rd[i]||i)+". Escape cancels."),Xr(),ne("key-bindings").querySelector(`[data-action="${i}"]`).focus()},e})),$e("controls-guide","Move "+["forward","left","back","right"].map(i=>oi(Ke.bindings[i])).join(" / ")+" \xB7 Crouch "+oi(Ke.bindings.crouch)+" \xB7 Reload "+oi(Ke.bindings.reload)+" \xB7 Skill "+oi(Ke.bindings.skill)+" \xB7 Use "+oi(Ke.bindings.use)+" \xB7 Armory "+oi(Ke.bindings.armory)+" \xB7 Hold "+oi(Ke.bindings.scoreboard)+" for scoreboard. Mouse wheel cycles weapons. Escape opens the menu.")}function ng(i){if(Bs){if(i.preventDefault(),i.stopImmediatePropagation(),i.code==="Escape"){Bs=null,$e("binding-status","Binding cancelled."),Xr();return}try{if(i.ctrlKey||i.metaKey||i.altKey)throw Error("Browser shortcut combinations are reserved.");Ke.bindings=bm(Ke.bindings,Bs,i.type==="mousedown"?"Mouse"+i.button:i.code),Bs=null,Bi(),ql(),Xr(),$e("binding-status","Saved. Conflicting controls were swapped.")}catch(e){$e("binding-status",e.message)}}}addEventListener("keydown",ng,!0);addEventListener("mousedown",ng,!0);ne("keyboard-layout").value=Ke.keyboardLayout;ne("keyboard-layout").onchange=()=>{Ke.keyboardLayout=ne("keyboard-layout").value,Bi(),ql(),Xr()};ne("reset-bindings").onclick=()=>{Ke.bindings={...ks},Bs=null,Bi(),ql(),Xr(),$e("binding-status","Default controls restored.")};Xr();function wd(i,e,t=!1){zm=performance.now();let n=ae?.state?.players[ae.slot],s=t?Ke.gamepadAimAssist:Ke.aimAssist,r=n&&Au(ae.state,ae.slot,Yt,li,lt.maps[ae.state.config.map],{strength:s,scoped:n.scoped,position:In}),a=xm(t?{...Ke,sensitivity:Ke.gamepadSensitivity}:Ke,!!n?.scoped,lt.weapons[n?.weapon])*(r&&r.error<r.cone*.7?.65:1);Yt-=i*a,Yt=Math.atan2(Math.sin(Yt),Math.cos(Yt)),li=Math.max(-1.5,Math.min(1.5,li-e*a*(Ke.invertY?-1:1)))}function ig(i){let e=Object.keys(Ke.bindings).find(t=>Ke.bindings[t]===i);if(!e&&i!=="ShiftRight")return!1;if(e==="scoreboard")return ne("scoreboard").hidden&&Ed(!0),!0;if(e==="armory")return ne("buy-menu").hidden?Vl():Jt(),!0;if(!ne("buy-menu").hidden||!ne("scoreboard").hidden)return!1;if(e?.startsWith("weapon")){let t=Number(e.slice(6));ae?.state?.players[ae.slot]?.owned[t]&&(ds=t)}else e==="previous"||e==="next"?Xl(e==="previous"?-1:1):(Wr.add(i),["skill","reload","jump"].includes(e)&&(Gs[e]=performance.now()+100),e==="fire"&&(jr=!0,ki.ready()));return jt(),!0}addEventListener("keydown",i=>{if(!(i.target.closest("input,select,textarea")||i.ctrlKey||i.metaKey||i.altKey)){if(ui="mouse",document.documentElement.dataset.gamepad="false",i.code==="Escape"){on();return}if(Ct){if(ae?.state?.players[ae.slot]?.alive===!1&&["ArrowLeft","ArrowRight"].includes(i.code)){i.preventDefault(),Sd(i.code==="ArrowLeft"?-1:1);return}if(i.repeat&&["armory","scoreboard","previous","next"].some(e=>Ke.bindings[e]===i.code)){i.preventDefault();return}ig(i.code)&&i.preventDefault()}}});function sg(i){Wr.delete(i),jt(),i===Ke.bindings.scoreboard&&qr&&(qr=!1,ne("scoreboard").hidden||Jt())}addEventListener("keyup",i=>sg(i.code));addEventListener("pointerdown",i=>{i.isTrusted&&(ui=i.pointerType==="touch"?"touch":"mouse",document.documentElement.dataset.gamepad="false")},!0);var dM=Lm(["buy-menu","scoreboard"]);qn.addEventListener("webglcontextlost",()=>{Bi(),Mt("Graphics interrupted. Restoring the scene\u2026",!0)});qn.addEventListener("webglcontextrestored",()=>Mt("Graphics restored."));qn.oncontextmenu=i=>i.preventDefault();qn.onmousedown=i=>{ui="mouse",document.documentElement.dataset.gamepad="false",Ct&&ig("Mouse"+i.button)&&i.preventDefault()};addEventListener("mouseup",i=>sg("Mouse"+i.button));addEventListener("mousemove",i=>{Ct&&ne("buy-menu").hidden&&ne("scoreboard").hidden&&(document.pointerLockElement===qn||i.buttons&&i.target===qn)&&(ui="mouse",document.documentElement.dataset.gamepad="false",wd(i.movementX,i.movementY),jt())});var Ol=!1;document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===qn?!Ct||!ne("buy-menu").hidden||!ne("scoreboard").hidden?(Ol=!1,document.exitPointerLock?.()):Ol=!0:Ol&&(Ol=!1,Ct&&ne("buy-menu").hidden&&ne("scoreboard").hidden&&on())});addEventListener("blur",on);document.addEventListener("visibilitychange",()=>{document.hidden&&(Gm.reset(),on())});for(let[i,e]of[["move-pad","move"],["look-pad","look"],["touch-fire","fire"]]){let t=ne(i),n=null,s=null;Md.push(()=>{let r=n;n=null,s=null,r!==null&&t.hasPointerCapture(r)&&t.releasePointerCapture(r)}),t.onpointerdown=r=>{!Ct||n!==null||(r.preventDefault(),n=r.pointerId,s=[r.clientX,r.clientY],t.setPointerCapture(n),e==="fire"&&(hi.fire=!0,jr=!0,ki.ready(),jt()))},t.onpointermove=r=>{if(n!==r.pointerId||!Ct)return;let a=r.clientX-s[0],o=r.clientY-s[1];if(e==="move"){let c=Math.max(40,Math.hypot(a,o));Ui={x:a/c,y:o/c},ne("move-knob").style.transform=`translate(${Ui.x*30}px,${Ui.y*30}px)`}else wd(a*1.5,o*1.5),s=[r.clientX,r.clientY];jt()};for(let r of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(r,a=>{a.pointerId===n&&(n=null,s=null,e==="move"&&(Ui={x:0,y:0},ne("move-knob").style.transform="translate(0,0)"),e==="fire"&&(hi.fire=!1),jt())})}for(let[i,e]of[["touch-skill","skill"],["touch-reload","reload"],["touch-jump","jump"],["touch-crouch","crouch"],["touch-interact","interact"],["touch-utility","utility"]]){let t=null,n=ne(i);Md.push(()=>{let s=t;t=null,s!==null&&n.hasPointerCapture(s)&&n.releasePointerCapture(s)}),n.onpointerdown=s=>{!Ct||t!==null||(s.preventDefault(),t=s.pointerId,n.setPointerCapture(t),hi[e]=!0,Gs[e]=performance.now()+100,jt())};for(let s of["pointerup","pointercancel","lostpointercapture"])n.addEventListener(s,r=>{r.pointerId===t&&(t=null,hi[e]=!1,s!=="pointerup"&&(Gs[e]=0),jt())})}ne("touch-scope").onclick=()=>{Ct&&(hi.scope=!hi.scope,ne("touch-scope").setAttribute("aria-pressed",String(hi.scope)),jt())};function Xl(i=1){let e=ae?.state?.players[ae.slot];if(e){let t=e.owned.map((n,s)=>n?s:-1).filter(n=>n>=0);ds=t[(t.indexOf(ds??e.weapon)+i+t.length)%t.length],jt()}}ne("touch-weapon").onclick=()=>Xl();qn.addEventListener("wheel",i=>{Ct&&ne("buy-menu").hidden&&(i.preventDefault(),Xl(Math.sign(i.deltaY)||1))},{passive:!1});function fM(){return ne("buy-menu").hidden?ne("scoreboard").hidden?ne("panel"):ne("scoreboard"):ne("buy-menu")}function Bl(i){let e=fM(),t=[...e.querySelectorAll("button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),summary")].filter(l=>l.getClientRects().length>0&&getComputedStyle(l).visibility!=="hidden"&&!l.closest("[hidden],[inert]"));if(!t.length)return null;let n=t.includes(document.activeElement)?document.activeElement:null;if(!n){let l=t[0];if(e===ne("panel")&&(l=ae?[ne("resume"),ne("start"),ne("rematch")].find(u=>!u.hidden):ne("heroes").querySelector('[aria-pressed="true"]')),n=t.includes(l)?l:t[0],n.focus(),n.scrollIntoView({block:"nearest"}),!i)return n}if(!i)return n;if((i==="left"||i==="right")&&n.matches('select,input[type="range"]')){let l=i==="right"?1:-1;return n.matches("select")?(n.selectedIndex=Math.max(0,Math.min(n.options.length-1,n.selectedIndex+l)),n.dispatchEvent(new Event("change",{bubbles:!0}))):(l>0?n.stepUp():n.stepDown(),n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0}))),n}let s=n.getBoundingClientRect(),r=s.left+s.width/2,a=s.top+s.height/2,o=null,c=1/0;for(let l of t){if(l===n)continue;let u=l.getBoundingClientRect(),d=u.left+u.width/2-r,h=u.top+u.height/2-a,f=i==="up"?-h:i==="down"?h:i==="left"?-d:d,m=i==="up"||i==="down",_=m?Math.max(0,u.left-s.right,s.left-u.right):Math.max(0,u.top-s.bottom,s.top-u.bottom);if(f<5)continue;let g=f*2+_*.5+(_>0?1e4:0);g<c&&(c=g,o=l)}return o?.focus(),o?.scrollIntoView({block:"nearest"}),o||n}function pM(i,e){let t=Gm.update(Hm(),i);if(us=t,!t.connected){t.disconnected&&ui==="gamepad"&&Ct&&(on(),Mt("Controller disconnected. Reconnect or use another input device."));return}t.engaged&&(ui="gamepad",document.documentElement.dataset.gamepad="true");let n=!Ct||!ne("buy-menu").hidden||!ne("scoreboard").hidden;if(t.pressed.includes(mn.menu)){n&&ae?.status==="running"?Jt():Ct?on():Bl();return}if(n){if(t.navigation&&Bl(t.navigation),t.pressed.includes(mn.confirm)){let s=Bl();s?.matches('button,a,summary,input[type="checkbox"]')&&s.click()}t.pressed.includes(mn.back)&&(ne("buy-menu").hidden?ne("scoreboard").hidden?ae?.status==="running"&&Jt():ne("score-close").click():ne("buy-close").click()),t.released.includes(mn.scoreboard)&&qr&&(qr=!1,Jt());return}if(Math.hypot(t.look.x,t.look.y)>.01&&wd(t.look.x*900*e,t.look.y*900*e,!0),t.pressed.includes(mn.previous)||t.pressed.includes(mn.next)){let s=t.pressed.includes(mn.previous)?-1:1;ae?.state?.players[ae.slot]?.alive===!1?Sd(s):Xl(s)}t.pressed.includes(mn.armory)&&Vl(),t.pressed.includes(mn.scoreboard)&&Ed(!0),t.pressed.includes(mn.fire)&&(jr=!0,ki.ready());for(let[s,r]of[[mn.confirm,"jump"],[mn.reload,"reload"],[mn.skill,"skill"]])t.pressed.includes(s)&&(Gs[r]=i+100);(t.pressed.length||t.released.length)&&jt()}var rg,ag,og,cg,zl,_d,dd="assets";try{Mt("Loading chassis artwork\u2026");let i=["./art/keyart.webp",...lt.heroes.map((e,t)=>"./art/hero-"+t+".webp"),...lt.maps.map((e,t)=>"./art/map-"+t+".webp")];await Promise.all(i.map(e=>new Promise((t,n)=>{let s=new Image,r=setTimeout(()=>n(Error("Artwork download timed out. Try again.")),2e4);s.src=e,s.decode().then(()=>{clearTimeout(r),t()},()=>{clearTimeout(r),n(Error("Artwork could not load. Try again."))})}))),Ni?.assets(),dd="graphics",Mt("Preparing chassis and environment\u2026"),Wt=ym(qn,lt),await Wt.preload((e,t)=>{Mt("Loading chassis "+e+" / "+t+"\u2026"),Ni?.models(e,t)}),Ni?.graphics(),Wt.setMap(yd),Wt.resize(Ke.fov),Wt.exposure(Ke.brightness),addEventListener("resize",()=>{Bi(),cancelAnimationFrame(_d),_d=requestAnimationFrame(()=>Wt.resize(Ke.fov))}),dd="session",Td(await em({onRetry:()=>Mt("Reconnecting to your session automatically\u2026")})),zl=setTimeout(()=>{Ni?.state.ready||(Ni?.fail("session"),Mt("Still reconnecting to your session\u2026",!0))},45e3),Qm(),rg=Tm((e,t)=>{let n=Math.min(.1,t/1e3),s=ae?.state,r=s?.players[ae.slot];if(pM(e,Math.min(.05,n)),r&&In){let a=ui==="gamepad"?Ke.gamepadAimAssist:Ke.aimAssist;if(Ct&&a&&(e-zm<220||hi.fire||Wr.has(Ke.bindings.fire)||us.held.fire||Math.hypot(Ui.x,Ui.y)>.1||Math.hypot(us.look.x,us.look.y)>.1)){let c=Au(s,ae.slot,Yt,li,lt.maps[s.config.map],{strength:a,scoped:r.scoped,position:In}),[l,u]=Zp(c,n,a);Yt=Math.atan2(Math.sin(Yt+l),Math.cos(Yt+l)),li=Math.max(-1.5,Math.min(1.5,li+u))}let o=jm();zs--,In=Hr.step(o,e,lt.maps[s.config.map],lt.heroes[r.hero],lt.weapons[r.weapon],r.alive&&s.phase==="live"),Km(o,e),ne("flash").style.opacity=String(r.flash?Math.min(Fm()?.45:.95,r.flash/64):0)}Ct&&ne("buy-menu").hidden&&ne("scoreboard").hidden&&Wt.frame(uo.sample(e,ae?.slot||0)||s,ae?.slot||0,e,n,{active:Ct,yaw:Yt,pitch:li,local:In,spectator:ae?.spectate,reduced:Fm()}),Vm.render(e),document.documentElement.dataset.viewModelTriangles=Wt.viewModelTriangles,document.documentElement.dataset.drawCalls=Wt.renderer.info.render.calls,document.documentElement.dataset.renderTriangles=Wt.renderer.info.render.triangles},{active:()=>Ct&&ae?.status==="running",maxFps:60,initialResolution:.75,maxResolution:matchMedia("(pointer:coarse)").matches?1:1.5,onResolution:e=>Wt?.resolution(e)}),Ni?.ready(),ag=setInterval(jt,1e3/60),cg=setInterval($m,250),og=setInterval(()=>{if(Kt?.readyState===WebSocket.OPEN){if(!document.hidden&&performance.now()-gd>3e4){Kt.close();return}Kt.send(JSON.stringify({type:"ping",time:performance.now()}))}},2e3)}catch(i){clearTimeout(zl),Ni?.fail(i.asset?"assets":dd),ne("fatal").hidden=!1,$e("fatal",i.message),Mt("Unable to initialize BotStrike.",!0),console.error(i)}addEventListener("pagehide",()=>{pd=!0,clearTimeout(zl),clearTimeout(md),clearTimeout(Di),cancelAnimationFrame(_d),clearInterval(ag),clearInterval(og),clearInterval(cg),Kt?.close(),rg?.(),Wt?.dispose(),ki.dispose(),dM()});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
