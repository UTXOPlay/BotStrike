var kd=0,Ql=1,Bd=2;var eh=0,ps=1,zd=2,cr=3,$n=0,zt=1,Qt=2,Qn=0,lr=1,th=2,nh=3,ih=4,Gd=5;var ms=100,Hd=101,Vd=102,Wd=103,qd=104,Xd=200,jd=201,Kd=202,Yd=203,sh=204,rh=205,Jd=206,Zd=207,$d=208,Qd=209,ef=210,tf=211,nf=212,sf=213,rf=214,vo=0,yo=1,Mo=2,Vs=3,So=4,Eo=5,To=6,wo=7,Zo=0,af=1,of=2,On=0,ah=1,oh=2,ch=3,ya=4,lh=5,hh=6,uh=7,Gl="attached",cf="detached",dh=300,Gi=301,gs=302,$o=303,Qo=304,Ma=306,Xn=1e3,Mn=1001,Ws=1002,Lt=1003,ec=1004;var bs=1005;var Dt=1006,hr=1007;var kn=1008;var hn=1009,fh=1010,ph=1011,ur=1012,tc=1013,Bn=1014,mn=1015,zn=1016,nc=1017,ic=1018,dr=1020,mh=35902,gh=35899,bh=1021,xh=1022,gn=1023,jn=1026,Hi=1027,sc=1028,rc=1029,Vi=1030,ac=1031;var oc=1033,Sa=33776,Ea=33777,Ta=33778,wa=33779,cc=35840,lc=35841,hc=35842,uc=35843,dc=36196,fc=37492,pc=37496,mc=37488,gc=37489,Aa=37490,bc=37491,xc=37808,_c=37809,vc=37810,yc=37811,Mc=37812,Sc=37813,Ec=37814,Tc=37815,wc=37816,Ac=37817,Rc=37818,Cc=37819,Pc=37820,Ic=37821,Lc=36492,Dc=36494,Nc=36495,Fc=36283,Uc=36284,Ra=36285,Oc=36286,kc=2200,Bc=2201,lf=2202,is=2300,ss=2301,bo=2302,Hl=2303,Qi=2400,es=2401,Gr=2402,zc=2500,hf=2501,_h=0,Ca=1,fr=2,uf=3200;var Pa=0,df=1,vi="",At="srgb",sn="srgb-linear",Hr="linear",pt="srgb";var xo=7680;var ff=519,pf=512,mf=513,gf=514,Gc=515,bf=516,xf=517,Hc=518,_f=519,vh=35044;var yh="300 es",Fn=2e3,qs=2001;function dm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function fm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Xs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function vf(){let i=Xs("canvas");return i.style.display="block",i}var Yu={},js=null;function Vr(...i){let e="THREE."+i.shift();js?js("log",e,...i):console.log(e,...i)}function yf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function He(...i){i=yf(i);let e="THREE."+i.shift();if(js)js("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ye(...i){i=yf(i);let e="THREE."+i.shift();if(js)js("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ns(...i){let e=i.join(" ");e in Yu||(Yu[e]=!0,He(...i))}function Mf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Sf={[vo]:yo,[Mo]:To,[So]:wo,[Vs]:Eo,[yo]:vo,[To]:Mo,[wo]:So,[Eo]:Vs},Un=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ju=1234567,Or=Math.PI/180,rs=180/Math.PI;function Sn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toLowerCase()}function rt(i,e,t){return Math.max(e,Math.min(t,i))}function Mh(i,e){return(i%e+e)%e}function pm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function mm(i,e,t){return i!==e?(t-i)/(e-i):0}function kr(i,e,t){return(1-t)*i+t*e}function gm(i,e,t,n){return kr(i,e,1-Math.exp(-t*n))}function bm(i,e=1){return e-Math.abs(Mh(i,e*2)-e)}function xm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function _m(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function vm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function ym(i,e){return i+Math.random()*(e-i)}function Mm(i){return i*(.5-Math.random())}function Sm(i){i!==void 0&&(Ju=i);let e=Ju+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Em(i){return i*Or}function Tm(i){return i*rs}function wm(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Am(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Rm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Cm(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),d=r((e-n)/2),h=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*d,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*m,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*m,o*c);break;case"ZYZ":i.set(l*m,l*f,o*u,o*c);break;default:He("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Nn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function mt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ia={DEG2RAD:Or,RAD2DEG:rs,generateUUID:Sn,clamp:rt,euclideanModulo:Mh,mapLinear:pm,inverseLerp:mm,lerp:kr,damp:gm,pingpong:bm,smoothstep:xm,smootherstep:_m,randInt:vm,randFloat:ym,randFloatSpread:Mm,seededRandom:Sm,degToRad:Em,radToDeg:Tm,isPowerOfTwo:wm,ceilPowerOfTwo:Am,floorPowerOfTwo:Rm,setQuaternionFromProperEuler:Cm,normalize:mt,denormalize:Nn},we=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},It=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3],h=r[a+0],f=r[a+1],m=r[a+2],v=r[a+3];if(d!==v||l!==h||c!==f||u!==m){let g=l*h+c*f+u*m+d*v;g<0&&(h=-h,f=-f,m=-m,v=-v,g=-g);let p=1-o;if(g<.9995){let M=Math.acos(g),T=Math.sin(M);p=Math.sin(p*M)/T,o=Math.sin(o*M)/T,l=l*p+h*o,c=c*p+f*o,u=u*p+m*o,d=d*p+v*o}else{l=l*p+h*o,c=c*p+f*o,u=u*p+m*o,d=d*p+v*o;let M=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=M,c*=M,u*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[a],h=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+u*d+l*f-c*h,e[t+1]=l*m+u*h+c*d-o*f,e[t+2]=c*m+u*f+o*h-l*d,e[t+3]=u*m-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),d=o(r/2),h=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"YZX":this._x=h*u*d+c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d-h*f*m;break;case"XZY":this._x=h*u*d-c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d+h*f*m;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return pl.copy(this).projectOnVector(e),this.sub(pl)}reflect(e){return this.sub(pl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},pl=new F,Zu=new It,$e=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],m=n[8],v=s[0],g=s[3],p=s[6],M=s[1],T=s[4],x=s[7],S=s[2],y=s[5],w=s[8];return r[0]=a*v+o*M+l*S,r[3]=a*g+o*T+l*y,r[6]=a*p+o*x+l*w,r[1]=c*v+u*M+d*S,r[4]=c*g+u*T+d*y,r[7]=c*p+u*x+d*w,r[2]=h*v+f*M+m*S,r[5]=h*g+f*T+m*y,r[8]=h*p+f*x+m*w,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*r,f=c*r-a*l,m=t*d+n*h+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/m;return e[0]=d*v,e[1]=(s*c-u*n)*v,e[2]=(o*n-s*a)*v,e[3]=h*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return ns("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ml.makeScale(e,t)),this}rotate(e){return ns("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ml.makeRotation(-e)),this}translate(e,t){return ns("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ml.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ml=new $e,$u=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qu=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Pm(){let i={enabled:!0,workingColorSpace:sn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===pt&&(s.r=hi(s.r),s.g=hi(s.g),s.b=hi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pt&&(s.r=Hs(s.r),s.g=Hs(s.g),s.b=Hs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===vi?Hr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ns("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ns("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[sn]:{primaries:e,whitePoint:n,transfer:Hr,toXYZ:$u,fromXYZ:Qu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:At},outputColorSpaceConfig:{drawingBufferColorSpace:At}},[At]:{primaries:e,whitePoint:n,transfer:pt,toXYZ:$u,fromXYZ:Qu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:At}}}),i}var st=Pm();function hi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Hs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Rs,Ao=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Rs===void 0&&(Rs=Xs("canvas")),Rs.width=e.width,Rs.height=e.height;let s=Rs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Rs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Xs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=hi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(hi(t[n]/255)*255):t[n]=hi(t[n]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Im=0,Ks=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Im++}),this.uuid=Sn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(gl(s[a].image)):r.push(gl(s[a]))}else r=gl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function gl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ao.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}var Lm=0,bl=new F,Bt=class i extends Un{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Mn,s=Mn,r=Dt,a=kn,o=gn,l=hn,c=i.DEFAULT_ANISOTROPY,u=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lm++}),this.uuid=Sn(),this.name="",this.source=new Ks(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(bl).x}get height(){return this.source.getSize(bl).y}get depth(){return this.source.getSize(bl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==dh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xn:e.x=e.x-Math.floor(e.x);break;case Mn:e.x=e.x<0?0:1;break;case Ws:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xn:e.y=e.y-Math.floor(e.y);break;case Mn:e.y=e.y<0?0:1;break;case Ws:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=dh;Bt.DEFAULT_ANISOTROPY=1;var bt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(c+1)/2,x=(f+1)/2,S=(p+1)/2,y=(u+h)/4,w=(d+v)/4,b=(m+g)/4;return T>x&&T>S?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=y/n,r=w/n):x>S?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=y/s,r=b/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=w/r,s=b/r),this.set(n,s,r,t),this}let M=Math.sqrt((g-m)*(g-m)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(d-v)/M,this.z=(h-u)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ro=class extends Un{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Bt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ks(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},on=class extends Ro{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Wr=class extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Co=class extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var et=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,u,d,h,f,m,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,d,h,f,m,v,g)}set(e,t,n,s,r,a,o,l,c,u,d,h,f,m,v,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Cs.setFromMatrixColumn(e,0).length(),r=1/Cs.setFromMatrixColumn(e,1).length(),a=1/Cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=a*u,f=a*d,m=o*u,v=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,f=l*d,m=c*u,v=c*d;t[0]=h+v*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,f=l*d,m=c*u,v=c*d;t[0]=h-v*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,f=a*d,m=o*u,v=o*d;t[0]=l*u,t[4]=m*c-f,t[8]=h*c+v,t[1]=l*d,t[5]=v*c+h,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*u,t[4]=v-h*d,t[8]=m*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+m,t[10]=h-v*d}else if(e.order==="XZY"){let h=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+v,t[5]=a*u,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dm,e,Nm)}lookAt(e,t,n){let s=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),Ai.crossVectors(n,un),Ai.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),Ai.crossVectors(n,un)),Ai.normalize(),Va.crossVectors(un,Ai),s[0]=Ai.x,s[4]=Va.x,s[8]=un.x,s[1]=Ai.y,s[5]=Va.y,s[9]=un.y,s[2]=Ai.z,s[6]=Va.z,s[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],M=n[3],T=n[7],x=n[11],S=n[15],y=s[0],w=s[4],b=s[8],A=s[12],P=s[1],O=s[5],V=s[9],H=s[13],k=s[2],$=s[6],ae=s[10],K=s[14],de=s[3],ce=s[7],pe=s[11],ge=s[15];return r[0]=a*y+o*P+l*k+c*de,r[4]=a*w+o*O+l*$+c*ce,r[8]=a*b+o*V+l*ae+c*pe,r[12]=a*A+o*H+l*K+c*ge,r[1]=u*y+d*P+h*k+f*de,r[5]=u*w+d*O+h*$+f*ce,r[9]=u*b+d*V+h*ae+f*pe,r[13]=u*A+d*H+h*K+f*ge,r[2]=m*y+v*P+g*k+p*de,r[6]=m*w+v*O+g*$+p*ce,r[10]=m*b+v*V+g*ae+p*pe,r[14]=m*A+v*H+g*K+p*ge,r[3]=M*y+T*P+x*k+S*de,r[7]=M*w+T*O+x*$+S*ce,r[11]=M*b+T*V+x*ae+S*pe,r[15]=M*A+T*H+x*K+S*ge,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],m=e[3],v=e[7],g=e[11],p=e[15],M=l*f-c*h,T=o*f-c*d,x=o*h-l*d,S=a*f-c*u,y=a*h-l*u,w=a*d-o*u;return t*(v*M-g*T+p*x)-n*(m*M-g*S+p*y)+s*(m*T-v*S+p*w)-r*(m*x-v*y+g*w)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],m=e[12],v=e[13],g=e[14],p=e[15],M=t*o-n*a,T=t*l-s*a,x=t*c-r*a,S=n*l-s*o,y=n*c-r*o,w=s*c-r*l,b=u*v-d*m,A=u*g-h*m,P=u*p-f*m,O=d*g-h*v,V=d*p-f*v,H=h*p-f*g,k=M*H-T*V+x*O+S*P-y*A+w*b;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let $=1/k;return e[0]=(o*H-l*V+c*O)*$,e[1]=(s*V-n*H-r*O)*$,e[2]=(v*w-g*y+p*S)*$,e[3]=(h*y-d*w-f*S)*$,e[4]=(l*P-a*H-c*A)*$,e[5]=(t*H-s*P+r*A)*$,e[6]=(g*x-m*w-p*T)*$,e[7]=(u*w-h*x+f*T)*$,e[8]=(a*V-o*P+c*b)*$,e[9]=(n*P-t*V-r*b)*$,e[10]=(m*y-v*x+p*M)*$,e[11]=(d*x-u*y-f*M)*$,e[12]=(o*A-a*O-l*b)*$,e[13]=(t*O-n*A+s*b)*$,e[14]=(v*T-m*S-g*M)*$,e[15]=(u*S-d*T+h*M)*$,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,h=r*c,f=r*u,m=r*d,v=a*u,g=a*d,p=o*d,M=l*c,T=l*u,x=l*d,S=n.x,y=n.y,w=n.z;return s[0]=(1-(v+p))*S,s[1]=(f+x)*S,s[2]=(m-T)*S,s[3]=0,s[4]=(f-x)*y,s[5]=(1-(h+p))*y,s[6]=(g+M)*y,s[7]=0,s[8]=(m+T)*w,s[9]=(g-M)*w,s[10]=(1-(h+v))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Cs.set(s[0],s[1],s[2]).length(),o=Cs.set(s[4],s[5],s[6]).length(),l=Cs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Pn.copy(this);let c=1/a,u=1/o,d=1/l;return Pn.elements[0]*=c,Pn.elements[1]*=c,Pn.elements[2]*=c,Pn.elements[4]*=u,Pn.elements[5]*=u,Pn.elements[6]*=u,Pn.elements[8]*=d,Pn.elements[9]*=d,Pn.elements[10]*=d,t.setFromRotationMatrix(Pn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Fn,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s),m,v;if(l)m=r/(a-r),v=a*r/(a-r);else if(o===Fn)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===qs)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Fn,l=!1){let c=this.elements,u=2/(t-e),d=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s),m,v;if(l)m=1/(a-r),v=a/(a-r);else if(o===Fn)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===qs)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Cs=new F,Pn=new et,Dm=new F(0,0,0),Nm=new F(1,1,1),Ai=new F,Va=new F,un=new F,ed=new et,td=new It,Kn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-rt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ed.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ed,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return td.setFromEuler(this),this.setFromQuaternion(td,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Kn.DEFAULT_ORDER="XYZ";var qr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Fm=0,nd=new F,Ps=new It,si=new et,Wa=new F,Rr=new F,Um=new F,Om=new It,id=new F(1,0,0),sd=new F(0,1,0),rd=new F(0,0,1),ad={type:"added"},km={type:"removed"},Is={type:"childadded",child:null},xl={type:"childremoved",child:null},Et=class i extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fm++}),this.uuid=Sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new F,t=new Kn,n=new It,s=new F(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new et},normalMatrix:{value:new $e}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.premultiply(Ps),this}rotateX(e){return this.rotateOnAxis(id,e)}rotateY(e){return this.rotateOnAxis(sd,e)}rotateZ(e){return this.rotateOnAxis(rd,e)}translateOnAxis(e,t){return nd.copy(e).applyQuaternion(this.quaternion),this.position.add(nd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(id,e)}translateY(e){return this.translateOnAxis(sd,e)}translateZ(e){return this.translateOnAxis(rd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Wa.copy(e):Wa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(Rr,Wa,this.up):si.lookAt(Wa,Rr,this.up),this.quaternion.setFromRotationMatrix(si),s&&(si.extractRotation(s.matrixWorld),Ps.setFromRotationMatrix(si),this.quaternion.premultiply(Ps.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ad),Is.child=e,this.dispatchEvent(Is),Is.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(km),xl.child=e,this.dispatchEvent(xl),xl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),si.multiply(e.parent.matrixWorld)),e.applyMatrix4(si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ad),Is.child=e,this.dispatchEvent(Is),Is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,e,Um),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,Om,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Et.DEFAULT_UP=new F(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gt=class extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}},Bm={type:"move"},Ys=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&h>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new gt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ef={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},qa={h:0,s:0,l:0};function _l(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=At){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=n,st.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=st.workingColorSpace){if(e=Mh(e,1),t=rt(t,0,1),n=rt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=_l(a,r,e+1/3),this.g=_l(a,r,e),this.b=_l(a,r,e-1/3)}return st.colorSpaceToWorking(this,s),this}setStyle(e,t=At){function n(r){r!==void 0&&parseFloat(r)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=At){let n=Ef[e.toLowerCase()];return n!==void 0?this.setHex(n,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=hi(e.r),this.g=hi(e.g),this.b=hi(e.b),this}copyLinearToSRGB(e){return this.r=Hs(e.r),this.g=Hs(e.g),this.b=Hs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=At){return st.workingToColorSpace(Yt.copy(this),e),Math.round(rt(Yt.r*255,0,255))*65536+Math.round(rt(Yt.g*255,0,255))*256+Math.round(rt(Yt.b*255,0,255))}getHexString(e=At){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(Yt.copy(this),t);let n=Yt.r,s=Yt.g,r=Yt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=At){st.workingToColorSpace(Yt.copy(this),e);let t=Yt.r,n=Yt.g,s=Yt.b;return e!==At?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ri),this.setHSL(Ri.h+e,Ri.s+t,Ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ri),e.getHSL(qa);let n=kr(Ri.h,qa.h,t),s=kr(Ri.s,qa.s,t),r=kr(Ri.l,qa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new qe;qe.NAMES=Ef;var Xr=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new qe(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var as=class extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kn,this.environmentIntensity=1,this.environmentRotation=new Kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},In=new F,ri=new F,vl=new F,ai=new F,Ls=new F,Ds=new F,od=new F,yl=new F,Ml=new F,Sl=new F,El=new bt,Tl=new bt,wl=new bt,Di=class i{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),In.subVectors(e,t),s.cross(In);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){In.subVectors(s,t),ri.subVectors(n,t),vl.subVectors(e,t);let a=In.dot(In),o=In.dot(ri),l=In.dot(vl),c=ri.dot(ri),u=ri.dot(vl),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-o*u)*h,m=(a*u-o*l)*h;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,ai)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ai.x),l.addScaledVector(a,ai.y),l.addScaledVector(o,ai.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return El.setScalar(0),Tl.setScalar(0),wl.setScalar(0),El.fromBufferAttribute(e,t),Tl.fromBufferAttribute(e,n),wl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(El,r.x),a.addScaledVector(Tl,r.y),a.addScaledVector(wl,r.z),a}static isFrontFacing(e,t,n,s){return In.subVectors(n,t),ri.subVectors(e,t),In.cross(ri).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return In.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),In.cross(ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ls.subVectors(s,n),Ds.subVectors(r,n),yl.subVectors(e,n);let l=Ls.dot(yl),c=Ds.dot(yl);if(l<=0&&c<=0)return t.copy(n);Ml.subVectors(e,s);let u=Ls.dot(Ml),d=Ds.dot(Ml);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ls,a);Sl.subVectors(e,r);let f=Ls.dot(Sl),m=Ds.dot(Sl);if(m>=0&&f<=m)return t.copy(r);let v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Ds,o);let g=u*m-f*d;if(g<=0&&d-u>=0&&f-m>=0)return od.subVectors(r,s),o=(d-u)/(d-u+(f-m)),t.copy(s).addScaledVector(od,o);let p=1/(g+v+h);return a=v*p,o=h*p,t.copy(n).addScaledVector(Ls,a).addScaledVector(Ds,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},fn=class{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ln):Ln.fromBufferAttribute(r,a),Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xa.copy(n.boundingBox)),Xa.applyMatrix4(e.matrixWorld),this.union(Xa)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cr),ja.subVectors(this.max,Cr),Ns.subVectors(e.a,Cr),Fs.subVectors(e.b,Cr),Us.subVectors(e.c,Cr),Ci.subVectors(Fs,Ns),Pi.subVectors(Us,Fs),Yi.subVectors(Ns,Us);let t=[0,-Ci.z,Ci.y,0,-Pi.z,Pi.y,0,-Yi.z,Yi.y,Ci.z,0,-Ci.x,Pi.z,0,-Pi.x,Yi.z,0,-Yi.x,-Ci.y,Ci.x,0,-Pi.y,Pi.x,0,-Yi.y,Yi.x,0];return!Al(t,Ns,Fs,Us,ja)||(t=[1,0,0,0,1,0,0,0,1],!Al(t,Ns,Fs,Us,ja))?!1:(Ka.crossVectors(Ci,Pi),t=[Ka.x,Ka.y,Ka.z],Al(t,Ns,Fs,Us,ja))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},oi=[new F,new F,new F,new F,new F,new F,new F,new F],Ln=new F,Xa=new fn,Ns=new F,Fs=new F,Us=new F,Ci=new F,Pi=new F,Yi=new F,Cr=new F,ja=new F,Ka=new F,Ji=new F;function Al(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ji.fromArray(i,r);let o=s.x*Math.abs(Ji.x)+s.y*Math.abs(Ji.y)+s.z*Math.abs(Ji.z),l=e.dot(Ji),c=t.dot(Ji),u=n.dot(Ji);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Ut=new F,Ya=new we,zm=0,wt=class extends Un{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=vh,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ya.fromBufferAttribute(this,t),Ya.applyMatrix3(e),this.setXY(t,Ya.x,Ya.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),s=mt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),s=mt(s,this.array),r=mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var jr=class extends wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Kr=class extends wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ht=class extends wt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Gm=new fn,Pr=new F,Rl=new F,Jt=class{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Gm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Pr.subVectors(e,this.center);let t=Pr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Pr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Pr.copy(e.center).add(Rl)),this.expandByPoint(Pr.copy(e.center).sub(Rl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Hm=0,yn=new et,Cl=new Et,Os=new F,dn=new fn,Ir=new fn,Wt=new F,yt=class i extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hm++}),this.uuid=Sn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dm(e)?Kr:jr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new $e().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,n){return yn.makeTranslation(e,t,n),this.applyMatrix4(yn),this}scale(e,t,n){return yn.makeScale(e,t,n),this.applyMatrix4(yn),this}lookAt(e){return Cl.lookAt(e),Cl.updateMatrix(),this.applyMatrix4(Cl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ht(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){let n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ir.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(dn.min,Ir.min),dn.expandByPoint(Wt),Wt.addVectors(dn.max,Ir.max),dn.expandByPoint(Wt)):(dn.expandByPoint(Ir.min),dn.expandByPoint(Ir.max))}dn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Wt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Wt.fromBufferAttribute(o,c),l&&(Os.fromBufferAttribute(e,c),Wt.add(Os)),s=Math.max(s,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new wt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let b=0;b<n.count;b++)o[b]=new F,l[b]=new F;let c=new F,u=new F,d=new F,h=new we,f=new we,m=new we,v=new F,g=new F;function p(b,A,P){c.fromBufferAttribute(n,b),u.fromBufferAttribute(n,A),d.fromBufferAttribute(n,P),h.fromBufferAttribute(r,b),f.fromBufferAttribute(r,A),m.fromBufferAttribute(r,P),u.sub(c),d.sub(c),f.sub(h),m.sub(h);let O=1/(f.x*m.y-m.x*f.y);isFinite(O)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(O),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(O),o[b].add(v),o[A].add(v),o[P].add(v),l[b].add(g),l[A].add(g),l[P].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let b=0,A=M.length;b<A;++b){let P=M[b],O=P.start,V=P.count;for(let H=O,k=O+V;H<k;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}let T=new F,x=new F,S=new F,y=new F;function w(b){S.fromBufferAttribute(s,b),y.copy(S);let A=o[b];T.copy(A),T.sub(S.multiplyScalar(S.dot(A))).normalize(),x.crossVectors(y,A);let O=x.dot(l[b])<0?-1:1;a.setXYZW(b,T.x,T.y,T.z,O)}for(let b=0,A=M.length;b<A;++b){let P=M[b],O=P.start,V=P.count;for(let H=O,k=O+V;H<k;H+=3)w(e.getX(H+0)),w(e.getX(H+1)),w(e.getX(H+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let s=new F,r=new F,a=new F,o=new F,l=new F,c=new F,u=new F,d=new F;if(e)for(let h=0,f=e.count;h<f;h+=3){let m=e.getX(h+0),v=e.getX(h+1),g=e.getX(h+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),f=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let p=0;p<u;p++)h[m++]=c[f++]}return new wt(h,u,d)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Js=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=vh,this.updateRanges=[],this.version=0,this.uuid=Sn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},nn=new F,Zs=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Nn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),s=mt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),s=mt(s,this.array),r=mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Vr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new wt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Vr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Pl=new F,Vm=new F,Wm=new $e,Dn=class{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Pl.subVectors(n,t).cross(Vm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Pl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Wm.getNormalMatrix(e),s=this.coplanarPoint(Pl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},qm=0,rn=class extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qm++}),this.uuid=Sn(),this.name="",this.type="Material",this.blending=lr,this.side=$n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sh,this.blendDst=rh,this.blendEquation=ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ff,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xo,this.stencilZFail=xo,this.stencilZPass=xo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Dn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new we().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new we().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ci=new F,Il=new F,Ja=new F,Za=new F,os=class{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ci.copy(this.origin).addScaledVector(this.direction,t),ci.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Il.copy(e).add(t).multiplyScalar(.5),Ja.copy(t).sub(e).normalize(),Za.copy(this.origin).sub(Il);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ja),o=Za.dot(this.direction),l=-Za.dot(Ja),c=Za.lengthSq(),u=Math.abs(1-a*a),d,h,f,m;if(u>0)if(d=a*l-o,h=a*o-l,m=r*u,d>=0)if(h>=-m)if(h<=m){let v=1/u;d*=v,h*=v,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-m?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=m?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Il).addScaledVector(Ja,h),f}intersectSphere(e,t){if(e.radius<0)return null;ci.subVectors(e.center,this.origin);let n=ci.dot(this.direction),s=ci.dot(ci)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ci)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,f=e.z-a.z,m=t.x-a.x,v=t.y-a.y,g=t.z-a.z,p=n.x-a.x,M=n.y-a.y,T=n.z-a.z,x=Math.abs(l),S=Math.abs(c),y=Math.abs(u),w,b,A,P,O,V,H,k,$,ae,K,de;if(x>=S&&x>=y?(A=l,V=d,$=m,de=p,l>=0?(w=c,b=u,P=h,O=f,H=v,k=g,ae=M,K=T):(w=u,b=c,P=f,O=h,H=g,k=v,ae=T,K=M)):S>=y?(A=c,V=h,$=v,de=M,c>=0?(w=u,b=l,P=f,O=d,H=g,k=m,ae=T,K=p):(w=l,b=u,P=d,O=f,H=m,k=g,ae=p,K=T)):(A=u,V=f,$=g,de=T,u>=0?(w=l,b=c,P=d,O=h,H=m,k=v,ae=p,K=M):(w=c,b=l,P=h,O=d,H=v,k=m,ae=M,K=p)),A===0)return null;let ce=w/A,pe=b/A,ge=1/A,Le=P-ce*V,Ce=O-pe*V,tt=H-ce*$,Ke=k-pe*$,je=ae-ce*de,R=K-pe*de,I=je*Ke-R*tt,N=Le*R-Ce*je,B=tt*Ce-Ke*Le;if(s){if(I<0||N<0||B<0)return null}else if((I<0||N<0||B<0)&&(I>0||N>0||B>0))return null;let L=I+N+B;if(L===0)return null;let Z=ge*(I*V+N*$+B*de);return(L>0?Z<0:Z>0)?null:this.at(Z/L,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ct=class extends rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=Zo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},cd=new et,Zi=new os,$a=new Jt,ld=new F,Qa=new F,eo=new F,to=new F,Ll=new F,no=new F,hd=new F,io=new F,ct=class extends Et{constructor(e=new yt,t=new Ct){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){no.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(Ll.fromBufferAttribute(d,e),a?no.addScaledVector(Ll,u):no.addScaledVector(Ll.sub(t),u))}t.add(no)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(r),Zi.copy(e.ray).recast(e.near),!($a.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere($a,ld)===null||Zi.origin.distanceToSquared(ld)>(e.far-e.near)**2))&&(cd.copy(r).invert(),Zi.copy(e.ray).applyMatrix4(cd),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=h.length;m<v;m++){let g=h[m],p=a[g.materialIndex],M=Math.max(g.start,f.start),T=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=M,S=T;x<S;x+=3){let y=o.getX(x),w=o.getX(x+1),b=o.getX(x+2);s=so(this,p,e,n,c,u,d,y,w,b),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){let M=o.getX(g),T=o.getX(g+1),x=o.getX(g+2);s=so(this,a,e,n,c,u,d,M,T,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=h.length;m<v;m++){let g=h[m],p=a[g.materialIndex],M=Math.max(g.start,f.start),T=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=M,S=T;x<S;x+=3){let y=x,w=x+1,b=x+2;s=so(this,p,e,n,c,u,d,y,w,b),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){let M=g,T=g+1,x=g+2;s=so(this,a,e,n,c,u,d,M,T,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Xm(i,e,t,n,s,r,a,o){let l;if(e.side===zt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===$n,o),l===null)return null;io.copy(o),io.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(io);return c<t.near||c>t.far?null:{distance:c,point:io.clone(),object:i}}function so(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Qa),i.getVertexPosition(l,eo),i.getVertexPosition(c,to);let u=Xm(i,e,t,n,Qa,eo,to,hd);if(u){let d=new F;Di.getBarycoord(hd,Qa,eo,to,d),s&&(u.uv=Di.getInterpolatedAttribute(s,o,l,c,d,new we)),r&&(u.uv1=Di.getInterpolatedAttribute(r,o,l,c,d,new we)),a&&(u.normal=Di.getInterpolatedAttribute(a,o,l,c,d,new F),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new F,materialIndex:0};Di.getNormal(Qa,eo,to,h.normal),u.face=h,u.barycoord=d}return u}var Lr=new bt,ud=new bt,dd=new bt,jm=new bt,fd=new et,ro=new F,Dl=new Jt,pd=new et,Nl=new os,Yr=class extends ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Gl,this.bindMatrix=new et,this.bindMatrixInverse=new et,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new fn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingBox.expandByPoint(ro)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Jt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingSphere.expandByPoint(ro)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Dl.copy(this.boundingSphere),Dl.applyMatrix4(s),e.ray.intersectsSphere(Dl)!==!1&&(pd.copy(s).invert(),Nl.copy(e.ray).applyMatrix4(pd),!(this.boundingBox!==null&&Nl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Nl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new bt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Gl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===cf?this.bindMatrixInverse.copy(this.bindMatrix).invert():He("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;ud.fromBufferAttribute(s.attributes.skinIndex,e),dd.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(Lr.copy(t),t.set(0,0,0,0)):(Lr.set(...t,1),t.set(0,0,0)),Lr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=dd.getComponent(r);if(a!==0){let o=ud.getComponent(r);fd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(jm.copy(Lr).applyMatrix4(fd),a)}}return t.isVector4&&(t.w=Lr.w),t.applyMatrix4(this.bindMatrixInverse)}},$s=class extends Et{constructor(){super(),this.isBone=!0,this.type="Bone"}},Qs=class extends Bt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Lt,u=Lt,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},md=new et,Km=new et,Jr=class i{constructor(e=[],t=[]){this.uuid=Sn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){He("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new et)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new et;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Km;md.multiplyMatrices(o,t[r]),md.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Qs(t,e,e,gn,mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(He("Skeleton: No bone found with UUID:",r),a=new $s),this.bones.push(a),this.boneInverses.push(new et().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},ui=class extends wt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ks=new et,gd=new et,ao=[],bd=new fn,Ym=new et,Dr=new ct,Nr=new Jt,cs=class extends ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ui(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ym)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new fn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ks),bd.copy(e.boundingBox).applyMatrix4(ks),this.boundingBox.union(bd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Jt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ks),Nr.copy(e.boundingSphere).applyMatrix4(ks),this.boundingSphere.union(Nr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Dr.geometry=this.geometry,Dr.material=this.material,Dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Nr.copy(this.boundingSphere),Nr.applyMatrix4(n),e.ray.intersectsSphere(Nr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ks),gd.multiplyMatrices(n,ks),Dr.matrixWorld=gd,Dr.raycast(e,ao);for(let a=0,o=ao.length;a<o;a++){let l=ao[a];l.instanceId=r,l.object=this,t.push(l)}ao.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ui(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qs(new Float32Array(s*this.count),s,this.count,sc,mn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},$i=new Jt,Jm=new we(.5,.5),oo=new F,er=class{constructor(e=new Dn,t=new Dn,n=new Dn,s=new Dn,r=new Dn,a=new Dn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],m=r[8],v=r[9],g=r[10],p=r[11],M=r[12],T=r[13],x=r[14],S=r[15];if(s[0].setComponents(c-a,f-u,p-m,S-M).normalize(),s[1].setComponents(c+a,f+u,p+m,S+M).normalize(),s[2].setComponents(c+o,f+d,p+v,S+T).normalize(),s[3].setComponents(c-o,f-d,p-v,S-T).normalize(),n)s[4].setComponents(l,h,g,x).normalize(),s[5].setComponents(c-l,f-h,p-g,S-x).normalize();else if(s[4].setComponents(c-l,f-h,p-g,S-x).normalize(),t===Fn)s[5].setComponents(c+l,f+h,p+g,S+x).normalize();else if(t===qs)s[5].setComponents(l,h,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(e){$i.center.set(0,0,0);let t=Jm.distanceTo(e.center);return $i.radius=.7071067811865476+t,$i.applyMatrix4(e.matrixWorld),this.intersectsSphere($i)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(oo.x=s.normal.x>0?e.max.x:e.min.x,oo.y=s.normal.y>0?e.max.y:e.min.y,oo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(oo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var tr=class extends rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Po=new F,Io=new F,xd=new et,Fr=new os,co=new Jt,Fl=new F,_d=new F,ls=class extends Et{constructor(e=new yt,t=new tr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Po.fromBufferAttribute(t,s-1),Io.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Po.distanceTo(Io);e.setAttribute("lineDistance",new ht(n,1))}else He("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),co.copy(n.boundingSphere),co.applyMatrix4(s),co.radius+=r,e.ray.intersectsSphere(co)===!1)return;xd.copy(s).invert(),Fr.copy(e.ray).applyMatrix4(xd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let v=f,g=m-1;v<g;v+=c){let p=u.getX(v),M=u.getX(v+1),T=lo(this,e,Fr,l,p,M,v);T&&t.push(T)}if(this.isLineLoop){let v=u.getX(m-1),g=u.getX(f),p=lo(this,e,Fr,l,v,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let v=f,g=m-1;v<g;v+=c){let p=lo(this,e,Fr,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){let v=lo(this,e,Fr,l,m-1,f,m-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function lo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Po.fromBufferAttribute(o,s),Io.fromBufferAttribute(o,r),t.distanceSqToSegment(Po,Io,Fl,_d)>n)return;Fl.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Fl);if(!(c<e.near||c>e.far))return{distance:c,point:_d.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var vd=new F,yd=new F,Zr=class extends ls{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)vd.fromBufferAttribute(t,s),yd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+vd.distanceTo(yd);e.setAttribute("lineDistance",new ht(n,1))}else He("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},$r=class extends ls{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Ni=class extends rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Md=new et,Vl=new os,ho=new Jt,uo=new F,di=class extends Et{constructor(e=new yt,t=new Ni){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere),ho.applyMatrix4(s),ho.radius+=r,e.ray.intersectsSphere(ho)===!1)return;Md.copy(s).invert(),Vl.copy(e.ray).applyMatrix4(Md);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=h,v=f;m<v;m++){let g=c.getX(m);uo.fromBufferAttribute(d,g),Sd(uo,g,l,s,e,t,this)}}else{let h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=h,v=f;m<v;m++)uo.fromBufferAttribute(d,m),Sd(uo,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Sd(i,e,t,n,s,r,a){let o=Vl.distanceSqToPoint(i);if(o<t){let l=new F;Vl.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Qr=class extends Bt{constructor(e=[],t=Gi,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Yn=class extends Bt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Fi=class extends Bt{constructor(e,t,n=Bn,s,r,a,o=Lt,l=Lt,c,u=jn,d=1){if(u!==jn&&u!==Hi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ks(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Lo=class extends Fi{constructor(e,t=Bn,n=Gi,s,r,a=Lt,o=Lt,l,c=jn){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ea=class extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Zt=class i extends yt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(d,2));function m(v,g,p,M,T,x,S,y,w,b,A){let P=x/w,O=S/b,V=x/2,H=S/2,k=y/2,$=w+1,ae=b+1,K=0,de=0,ce=new F;for(let pe=0;pe<ae;pe++){let ge=pe*O-H;for(let Le=0;Le<$;Le++){let Ce=Le*P-V;ce[v]=Ce*M,ce[g]=ge*T,ce[p]=k,c.push(ce.x,ce.y,ce.z),ce[v]=0,ce[g]=0,ce[p]=y>0?1:-1,u.push(ce.x,ce.y,ce.z),d.push(Le/w),d.push(1-pe/b),K+=1}}for(let pe=0;pe<b;pe++)for(let ge=0;ge<w;ge++){let Le=h+ge+$*pe,Ce=h+ge+$*(pe+1),tt=h+(ge+1)+$*(pe+1),Ke=h+(ge+1)+$*pe;l.push(Le,Ce,Ke),l.push(Ce,tt,Ke),de+=6}o.addGroup(f,de,A),f+=de,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ui=class i extends yt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],m=0,v=[],g=n/2,p=0;M(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new ht(d,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(f,2));function M(){let x=new F,S=new F,y=0,w=(t-e)/n;for(let b=0;b<=r;b++){let A=[],P=b/r,O=P*(t-e)+e;for(let V=0;V<=s;V++){let H=V/s,k=H*l+o,$=Math.sin(k),ae=Math.cos(k);S.x=O*$,S.y=-P*n+g,S.z=O*ae,d.push(S.x,S.y,S.z),x.set($,w,ae).normalize(),h.push(x.x,x.y,x.z),f.push(H,1-P),A.push(m++)}v.push(A)}for(let b=0;b<s;b++)for(let A=0;A<r;A++){let P=v[A][b],O=v[A+1][b],V=v[A+1][b+1],H=v[A][b+1];(e>0||A!==0)&&(u.push(P,O,H),y+=3),(t>0||A!==r-1)&&(u.push(O,V,H),y+=3)}c.addGroup(p,y,0),p+=y}function T(x){let S=m,y=new we,w=new F,b=0,A=x===!0?e:t,P=x===!0?1:-1;for(let V=1;V<=s;V++)d.push(0,g*P,0),h.push(0,P,0),f.push(.5,.5),m++;let O=m;for(let V=0;V<=s;V++){let k=V/s*l+o,$=Math.cos(k),ae=Math.sin(k);w.x=A*ae,w.y=g*P,w.z=A*$,d.push(w.x,w.y,w.z),h.push(0,P,0),y.x=$*.5+.5,y.y=ae*.5*P+.5,f.push(y.x,y.y),m++}for(let V=0;V<s;V++){let H=S+V,k=O+V;x===!0?u.push(k,k+1,H):u.push(k+1,k,H),b+=3}c.addGroup(p,b,x===!0?1:2),p+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var pn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){He("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let u=n[s],h=n[s+1]-u,f=(a-u)/h;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new we:new F);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new F,s=[],r=[],a=[],o=new F,l=new et;for(let f=0;f<=e;f++){let m=f/e;s[f]=this.getTangentAt(m,new F)}r[0]=new F,a[0]=new F;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(rt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(rt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},nr=class extends pn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new we){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Do=class extends nr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Sh(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,d){let h=(a-r)/c-(o-r)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,f*=u,s(a,o,h,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var Ed=new F,Td=new F,Ul=new Sh,Ol=new Sh,kl=new Sh,ir=class extends pn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new F){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(Td.subVectors(s[0],s[1]).add(s[0]),c=Td);let d=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Ed.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Ed),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),Ul.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,m,v,g),Ol.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,m,v,g),kl.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,m,v,g)}else this.curveType==="catmullrom"&&(Ul.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Ol.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),kl.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(Ul.calc(l),Ol.calc(l),kl.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new F().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function wd(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Zm(i,e){let t=1-i;return t*t*e}function $m(i,e){return 2*(1-i)*i*e}function Qm(i,e){return i*i*e}function Br(i,e,t,n){return Zm(i,e)+$m(i,t)+Qm(i,n)}function eg(i,e){let t=1-i;return t*t*t*e}function tg(i,e){let t=1-i;return 3*t*t*i*e}function ng(i,e){return 3*(1-i)*i*i*e}function ig(i,e){return i*i*i*e}function zr(i,e,t,n,s){return eg(i,e)+tg(i,t)+ng(i,n)+ig(i,s)}var ta=class extends pn{constructor(e=new we,t=new we,n=new we,s=new we){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new we){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(zr(e,s.x,r.x,a.x,o.x),zr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},No=class extends pn{constructor(e=new F,t=new F,n=new F,s=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new F){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(zr(e,s.x,r.x,a.x,o.x),zr(e,s.y,r.y,a.y,o.y),zr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},na=class extends pn{constructor(e=new we,t=new we){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new we){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new we){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fo=class extends pn{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ia=class extends pn{constructor(e=new we,t=new we,n=new we){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new we){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Br(e,s.x,r.x,a.x),Br(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},sa=class extends pn{constructor(e=new F,t=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new F){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Br(e,s.x,r.x,a.x),Br(e,s.y,r.y,a.y),Br(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ra=class extends pn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new we){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(wd(o,l.x,c.x,u.x,d.x),wd(o,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new we().fromArray(s))}return this}},Uo=Object.freeze({__proto__:null,ArcCurve:Do,CatmullRomCurve3:ir,CubicBezierCurve:ta,CubicBezierCurve3:No,EllipseCurve:nr,LineCurve:na,LineCurve3:Fo,QuadraticBezierCurve:ia,QuadraticBezierCurve3:sa,SplineCurve:ra}),Oo=class extends pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Uo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Uo[s.type]().fromJSON(s))}return this}},aa=class extends Oo{constructor(e){super(),this.type="Path",this.currentPoint=new we,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new na(this.currentPoint.clone(),new we(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new ia(this.currentPoint.clone(),new we(e,t),new we(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new ta(this.currentPoint.clone(),new we(e,t),new we(n,s),new we(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ra(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new nr(e,t,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},hs=class extends aa{constructor(e){super(e),this.uuid=Sn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new aa().fromJSON(s))}return this}};function sg(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Tf(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=lg(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let u=o,d=l;for(let h=t;h<s;h+=t){let f=i[h],m=i[h+1];f<o&&(o=f),m<l&&(l=m),f>u&&(u=f),m>d&&(d=m)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return oa(r,a,t,o,l,c,0),a}function Tf(i,e,t,n,s){let r;if(s===vg(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Ad(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Ad(a/n|0,i[a],i[a+1],r);return r&&sr(r,r.next)&&(la(r),r=r.next),r}function us(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(sr(t,t.next)||Rt(t.prev,t,t.next)===0)){if(la(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function oa(i,e,t,n,s,r,a){if(!i)return;!a&&r&&pg(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?ag(i,n,s,r):rg(i)){e.push(l.i,i.i,c.i),la(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=og(us(i),e),oa(i,e,t,n,s,r,2)):a===2&&cg(i,e,t,n,s,r):oa(us(i),e,t,n,s,r,1);break}}}function rg(i){let e=i.prev,t=i,n=i.next;if(Rt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(s,r,a),d=Math.min(o,l,c),h=Math.max(s,r,a),f=Math.max(o,l,c),m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=h&&m.y>=d&&m.y<=f&&Ur(s,o,r,l,a,c,m.x,m.y)&&Rt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function ag(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Rt(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,d=r.y,h=a.y,f=Math.min(o,l,c),m=Math.min(u,d,h),v=Math.max(o,l,c),g=Math.max(u,d,h),p=Wl(f,m,e,t,n),M=Wl(v,g,e,t,n),T=i.prevZ,x=i.nextZ;for(;T&&T.z>=p&&x&&x.z<=M;){if(T.x>=f&&T.x<=v&&T.y>=m&&T.y<=g&&T!==s&&T!==a&&Ur(o,u,l,d,c,h,T.x,T.y)&&Rt(T.prev,T,T.next)>=0||(T=T.prevZ,x.x>=f&&x.x<=v&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&Ur(o,u,l,d,c,h,x.x,x.y)&&Rt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;T&&T.z>=p;){if(T.x>=f&&T.x<=v&&T.y>=m&&T.y<=g&&T!==s&&T!==a&&Ur(o,u,l,d,c,h,T.x,T.y)&&Rt(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;x&&x.z<=M;){if(x.x>=f&&x.x<=v&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&Ur(o,u,l,d,c,h,x.x,x.y)&&Rt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function og(i,e){let t=i;do{let n=t.prev,s=t.next.next;!sr(n,s)&&Af(n,t,t.next,s)&&ca(n,s)&&ca(s,n)&&(e.push(n.i,t.i,s.i),la(t),la(t.next),t=i=s),t=t.next}while(t!==i);return us(t)}function cg(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&bg(a,o)){let l=Rf(a,o);a=us(a,a.next),l=us(l,l.next),oa(a,e,t,n,s,r,0),oa(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function lg(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Tf(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(gg(c))}s.sort(hg);for(let r=0;r<s.length;r++)t=ug(s[r],t);return t}function hg(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function ug(i,e){let t=dg(i,e);if(!t)return e;let n=Rf(t,i);return us(n,n.next),us(t,t.next)}function dg(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(sr(i,t))return t;do{if(sr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&wf(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);ca(t,i)&&(d<u||d===u&&(t.x>a.x||t.x===a.x&&fg(a,t)))&&(a=t,u=d)}t=t.next}while(t!==o);return a}function fg(i,e){return Rt(i.prev,i,e.prev)<0&&Rt(e.next,i,i.next)<0}function pg(i,e,t,n){let s=i;do s.z===0&&(s.z=Wl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,mg(s)}function mg(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Wl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function gg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function wf(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Ur(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&wf(i,e,t,n,s,r,a,o)}function bg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!xg(i,e)&&(ca(i,e)&&ca(e,i)&&_g(i,e)&&(Rt(i.prev,i,e.prev)||Rt(i,e.prev,e))||sr(i,e)&&Rt(i.prev,i,i.next)>0&&Rt(e.prev,e,e.next)>0)}function Rt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function sr(i,e){return i.x===e.x&&i.y===e.y}function Af(i,e,t,n){let s=po(Rt(i,e,t)),r=po(Rt(i,e,n)),a=po(Rt(t,n,i)),o=po(Rt(t,n,e));return!!(s!==r&&a!==o||s===0&&fo(i,t,e)||r===0&&fo(i,n,e)||a===0&&fo(t,i,n)||o===0&&fo(t,e,n))}function fo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function po(i){return i>0?1:i<0?-1:0}function xg(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Af(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function ca(i,e){return Rt(i.prev,i,i.next)<0?Rt(i,e,i.next)>=0&&Rt(i,i.prev,e)>=0:Rt(i,e,i.prev)<0||Rt(i,i.next,e)<0}function _g(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Rf(i,e){let t=ql(i.i,i.x,i.y),n=ql(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Ad(i,e,t,n){let s=ql(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function la(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ql(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function vg(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Xl=class{static triangulate(e,t,n=2){return sg(e,t,n)}},ts=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Rd(e),Cd(n,e);let a=e.length;t.forEach(Rd);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,Cd(n,t[l]);let o=Xl.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Rd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Cd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var rr=class i extends yt{constructor(e=new hs([new we(.5,.5),new we(-.5,.5),new we(-.5,-.5),new we(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new ht(s,3)),this.setAttribute("uv",new ht(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:yg,T,x=!1,S,y,w,b;if(p){T=p.getSpacedPoints(u),x=!0,h=!1;let W=p.isCatmullRomCurve3?p.closed:!1;S=p.computeFrenetFrames(u,W),y=new F,w=new F,b=new F}h||(g=0,f=0,m=0,v=0);let A=o.extractPoints(c),P=A.shape,O=A.holes;if(!ts.isClockWise(P)){P=P.reverse();for(let W=0,j=O.length;W<j;W++){let ee=O[W];ts.isClockWise(ee)&&(O[W]=ee.reverse())}}function H(W){let ee=10000000000000001e-36,se=W[0];for(let z=1;z<=W.length;z++){let ue=z%W.length,Y=W[ue],ye=Y.x-se.x,Ne=Y.y-se.y,D=ye*ye+Ne*Ne,Ze=Math.max(Math.abs(Y.x),Math.abs(Y.y),Math.abs(se.x),Math.abs(se.y)),We=ee*Ze*Ze;if(D<=We){W.splice(ue,1),z--;continue}se=Y}}H(P),O.forEach(H);let k=O.length,$=P;for(let W=0;W<k;W++){let j=O[W];P=P.concat(j)}function ae(W,j,ee){return j||Ye("ExtrudeGeometry: vec does not exist"),W.clone().addScaledVector(j,ee)}let K=P.length;function de(W,j,ee){let se,z,ue,Y=W.x-j.x,ye=W.y-j.y,Ne=ee.x-W.x,D=ee.y-W.y,Ze=Y*Y+ye*ye,We=Y*D-ye*Ne;if(Math.abs(We)>Number.EPSILON){let C=Math.sqrt(Ze),_=Math.sqrt(Ne*Ne+D*D),q=j.x-ye/C,J=j.y+Y/C,U=ee.x-D/_,te=ee.y+Ne/_,re=((U-q)*D-(te-J)*Ne)/(Y*D-ye*Ne);se=q+Y*re-W.x,z=J+ye*re-W.y;let Q=se*se+z*z;if(Q<=2)return new we(se,z);ue=Math.sqrt(Q/2)}else{let C=!1;Y>Number.EPSILON?Ne>Number.EPSILON&&(C=!0):Y<-Number.EPSILON?Ne<-Number.EPSILON&&(C=!0):Math.sign(ye)===Math.sign(D)&&(C=!0),C?(se=-ye,z=Y,ue=Math.sqrt(Ze)):(se=Y,z=ye,ue=Math.sqrt(Ze/2))}return new we(se/ue,z/ue)}let ce=[];for(let W=0,j=$.length,ee=j-1,se=W+1;W<j;W++,ee++,se++)ee===j&&(ee=0),se===j&&(se=0),ce[W]=de($[W],$[ee],$[se]);let pe=[],ge,Le=ce.concat();for(let W=0,j=k;W<j;W++){let ee=O[W];ge=[];for(let se=0,z=ee.length,ue=z-1,Y=se+1;se<z;se++,ue++,Y++)ue===z&&(ue=0),Y===z&&(Y=0),ge[se]=de(ee[se],ee[ue],ee[Y]);pe.push(ge),Le=Le.concat(ge)}let Ce;if(g===0)Ce=ts.triangulateShape($,O);else{let W=[],j=[];for(let ee=0;ee<g;ee++){let se=ee/g,z=f*Math.cos(se*Math.PI/2),ue=m*Math.sin(se*Math.PI/2)+v;for(let Y=0,ye=$.length;Y<ye;Y++){let Ne=ae($[Y],ce[Y],ue);N(Ne.x,Ne.y,-z),se===0&&W.push(Ne)}for(let Y=0,ye=k;Y<ye;Y++){let Ne=O[Y];ge=pe[Y];let D=[];for(let Ze=0,We=Ne.length;Ze<We;Ze++){let C=ae(Ne[Ze],ge[Ze],ue);N(C.x,C.y,-z),se===0&&D.push(C)}se===0&&j.push(D)}}Ce=ts.triangulateShape(W,j)}let tt=Ce.length,Ke=m+v;for(let W=0;W<K;W++){let j=h?ae(P[W],Le[W],Ke):P[W];x?(w.copy(S.normals[0]).multiplyScalar(j.x),y.copy(S.binormals[0]).multiplyScalar(j.y),b.copy(T[0]).add(w).add(y),N(b.x,b.y,b.z)):N(j.x,j.y,0)}for(let W=1;W<=u;W++)for(let j=0;j<K;j++){let ee=h?ae(P[j],Le[j],Ke):P[j];x?(w.copy(S.normals[W]).multiplyScalar(ee.x),y.copy(S.binormals[W]).multiplyScalar(ee.y),b.copy(T[W]).add(w).add(y),N(b.x,b.y,b.z)):N(ee.x,ee.y,d/u*W)}for(let W=g-1;W>=0;W--){let j=W/g,ee=f*Math.cos(j*Math.PI/2),se=m*Math.sin(j*Math.PI/2)+v;for(let z=0,ue=$.length;z<ue;z++){let Y=ae($[z],ce[z],se);N(Y.x,Y.y,d+ee)}for(let z=0,ue=O.length;z<ue;z++){let Y=O[z];ge=pe[z];for(let ye=0,Ne=Y.length;ye<Ne;ye++){let D=ae(Y[ye],ge[ye],se);x?N(D.x,D.y+T[u-1].y,T[u-1].x+ee):N(D.x,D.y,d+ee)}}}je(),R();function je(){let W=s.length/3;if(h){let j=0,ee=K*j;for(let se=0;se<tt;se++){let z=Ce[se];B(z[2]+ee,z[1]+ee,z[0]+ee)}j=u+g*2,ee=K*j;for(let se=0;se<tt;se++){let z=Ce[se];B(z[0]+ee,z[1]+ee,z[2]+ee)}}else{for(let j=0;j<tt;j++){let ee=Ce[j];B(ee[2],ee[1],ee[0])}for(let j=0;j<tt;j++){let ee=Ce[j];B(ee[0]+K*u,ee[1]+K*u,ee[2]+K*u)}}n.addGroup(W,s.length/3-W,0)}function R(){let W=s.length/3,j=0;I($,j),j+=$.length;for(let ee=0,se=O.length;ee<se;ee++){let z=O[ee];I(z,j),j+=z.length}n.addGroup(W,s.length/3-W,1)}function I(W,j){let ee=W.length;for(;--ee>=0;){let se=ee,z=ee-1;z<0&&(z=W.length-1);for(let ue=0,Y=u+g*2;ue<Y;ue++){let ye=K*ue,Ne=K*(ue+1),D=j+se+ye,Ze=j+z+ye,We=j+z+Ne,C=j+se+Ne;L(D,Ze,We,C)}}}function N(W,j,ee){l.push(W),l.push(j),l.push(ee)}function B(W,j,ee){Z(W),Z(j),Z(ee);let se=s.length/3,z=M.generateTopUV(n,s,se-3,se-2,se-1);he(z[0]),he(z[1]),he(z[2])}function L(W,j,ee,se){Z(W),Z(j),Z(se),Z(j),Z(ee),Z(se);let z=s.length/3,ue=M.generateSideWallUV(n,s,z-6,z-3,z-2,z-1);he(ue[0]),he(ue[1]),he(ue[3]),he(ue[1]),he(ue[2]),he(ue[3])}function Z(W){s.push(l[W*3+0]),s.push(l[W*3+1]),s.push(l[W*3+2])}function he(W){r.push(W.x),r.push(W.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Mg(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Uo[s.type]().fromJSON(s)),new i(n,e.options)}},yg={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new we(r,a),new we(o,l),new we(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],d=e[n*3+2],h=e[s*3],f=e[s*3+1],m=e[s*3+2],v=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new we(a,1-l),new we(c,1-d),new we(h,1-m),new we(v,1-p)]:[new we(o,1-l),new we(u,1-d),new we(f,1-m),new we(g,1-p)]}};function Mg(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var En=class i extends yt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,f=[],m=[],v=[],g=[];for(let p=0;p<u;p++){let M=p*h-a;for(let T=0;T<c;T++){let x=T*d-r;m.push(x,-M,0),v.push(0,0,1),g.push(T/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){let T=M+c*p,x=M+c*(p+1),S=M+1+c*(p+1),y=M+1+c*p;f.push(T,x,y),f.push(x,S,y)}this.setIndex(f),this.setAttribute("position",new ht(m,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},ha=class i extends yt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],u=[],d=e,h=(t-e)/s,f=new F,m=new we;for(let v=0;v<=s;v++){for(let g=0;g<=n;g++){let p=r+g/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,u.push(m.x,m.y)}d+=h}for(let v=0;v<s;v++){let g=v*(n+1);for(let p=0;p<n;p++){let M=p+g,T=M,x=M+n+1,S=M+n+2,y=M+1;o.push(T,x,y),o.push(x,S,y)}}this.setIndex(o),this.setAttribute("position",new ht(l,3)),this.setAttribute("normal",new ht(c,3)),this.setAttribute("uv",new ht(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Oi=class i extends yt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new F,h=new F,f=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){let M=[],T=p/n,x=a+T*o,S=e*Math.cos(x),y=Math.sqrt(e*e-S*S),w=0;p===0&&a===0?w=.5/t:p===n&&l===Math.PI&&(w=-.5/t);for(let b=0;b<=t;b++){let A=b/t,P=s+A*r;d.x=-y*Math.cos(P),d.y=S,d.z=y*Math.sin(P),m.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),g.push(A+w,1-T),M.push(c++)}u.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){let T=u[p][M+1],x=u[p][M],S=u[p+1][M],y=u[p+1][M+1];(p!==0||a>0)&&f.push(T,x,y),(p!==n-1||l<Math.PI)&&f.push(x,S,y)}this.setIndex(f),this.setAttribute("position",new ht(m,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ds=class i extends yt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],u=[],d=[],h=new F,f=new F,m=new F;for(let v=0;v<=n;v++){let g=a+v/n*o;for(let p=0;p<=s;p++){let M=p/s*r;f.x=(e+t*Math.cos(g))*Math.cos(M),f.y=(e+t*Math.cos(g))*Math.sin(M),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),h.x=e*Math.cos(M),h.y=e*Math.sin(M),m.subVectors(f,h).normalize(),u.push(m.x,m.y,m.z),d.push(p/s),d.push(v/n)}}for(let v=1;v<=n;v++)for(let g=1;g<=s;g++){let p=(s+1)*v+g-1,M=(s+1)*(v-1)+g-1,T=(s+1)*(v-1)+g,x=(s+1)*v+g;l.push(p,M,x),l.push(M,T,x)}this.setIndex(l),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var ua=class i extends yt{constructor(e=new sa(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new F,l=new F,c=new we,u=new F,d=[],h=[],f=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new ht(d,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(f,2));function v(){for(let T=0;T<t;T++)g(T);g(r===!1?t:0),M(),p()}function g(T){u=e.getPointAt(T/t,u);let x=a.normals[T],S=a.binormals[T];for(let y=0;y<=s;y++){let w=y/s*Math.PI*2,b=Math.sin(w),A=-Math.cos(w);l.x=A*x.x+b*S.x,l.y=A*x.y+b*S.y,l.z=A*x.z+b*S.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let T=1;T<=t;T++)for(let x=1;x<=s;x++){let S=(s+1)*(T-1)+(x-1),y=(s+1)*T+(x-1),w=(s+1)*T+x,b=(s+1)*(T-1)+x;m.push(S,y,b),m.push(y,w,b)}}function M(){for(let T=0;T<=t;T++)for(let x=0;x<=s;x++)c.x=T/t,c.y=x/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Uo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function xs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Pd(s))s.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Pd(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function en(i){let e={};for(let t=0;t<i.length;t++){let n=xs(i[t]);for(let s in n)e[s]=n[s]}return e}function Pd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Sg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Eh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}var Cf={clone:xs,merge:en},Eg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$t=class extends rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Eg,this.fragmentShader=Tg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xs(e.uniforms),this.uniformsGroups=Sg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new qe().setHex(s.value);break;case"v2":this.uniforms[n].value=new we().fromArray(s.value);break;case"v3":this.uniforms[n].value=new F().fromArray(s.value);break;case"v4":this.uniforms[n].value=new bt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new $e().fromArray(s.value);break;case"m4":this.uniforms[n].value=new et().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ko=class extends $t{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},qt=class extends rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pa,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},cn=class extends qt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new we(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return rt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var da=class extends rn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pa,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=Zo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Bo=class extends rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},zo=class extends rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Li(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function _o(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function wg(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Id(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function Ag(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var Jn=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Go=class extends Jn{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Qi,endingEnd:Qi}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case es:r=e,o=2*t-n;break;case Gr:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case es:a=e,l=2*n-t;break;case Gr:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),v=m*m,g=v*m,p=-h*g+2*h*v-h*m,M=(1+h)*g+(-1.5-2*h)*v+(-.5+h)*m+1,T=(-1-f)*g+(1.5+f)*v+.5*m,x=f*g-f*v;for(let S=0;S!==o;++S)r[S]=p*a[u+S]+M*a[c+S]+T*a[l+S]+x*a[d+S];return r}},fa=class extends Jn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},Ho=class extends Jn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Vo=class extends Jn{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let m=(n-t)/(s-t),v=1-m;for(let g=0;g!==o;++g)r[g]=a[c+g]*v+a[l+g]*m;return r}let h=o*2,f=e-1;for(let m=0;m!==o;++m){let v=a[c+m],g=a[l+m],p=f*h+m*2,M=d[p],T=d[p+1],x=e*h+m*2,S=u[x],y=u[x+1],w=Cg(n,t,M,S,s);r[m]=Pf(w,v,T,y,g)}return r}};function Pf(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Rg(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Cg(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=Pf(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Rg(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var ln=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Li(t,this.TimeBufferType),this.values=Li(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Li(e.times,Array),values:Li(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),_o(e.settings)&&(n.settings={inTangents:Li(e.settings.inTangents,Array),outTangents:Li(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ho(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new fa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Go(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Vo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case is:t=this.InterpolantFactoryMethodDiscrete;break;case ss:t=this.InterpolantFactoryMethodLinear;break;case bo:t=this.InterpolantFactoryMethodSmooth;break;case Hl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return He("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return is;case this.InterpolantFactoryMethodLinear:return ss;case this.InterpolantFactoryMethodSmooth:return bo;case this.InterpolantFactoryMethodBezier:return Hl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;_o(this.settings)&&(Ld(this.settings.inTangents,e),Ld(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ye("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ye("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ye("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ye("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&fm(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ye("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===bo,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,h=d-n,f=d+n;for(let m=0;m!==n;++m){let v=t[d+m];if(v!==t[h+m]||v!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,_o(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Ld(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}ln.prototype.ValueTypeName="";ln.prototype.TimeBufferType=Float32Array;ln.prototype.ValueBufferType=Float32Array;ln.prototype.DefaultInterpolation=ss;var fi=class extends ln{constructor(e,t,n){super(e,t,n)}};fi.prototype.ValueTypeName="bool";fi.prototype.ValueBufferType=Array;fi.prototype.DefaultInterpolation=is;fi.prototype.InterpolantFactoryMethodLinear=void 0;fi.prototype.InterpolantFactoryMethodSmooth=void 0;var pa=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}};pa.prototype.ValueTypeName="color";var pi=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}};pi.prototype.ValueTypeName="number";var Wo=class extends Jn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)It.slerpFlat(r,0,a,c-o,a,c,l);return r}},mi=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Wo(this.times,this.values,this.getValueSize(),e)}};mi.prototype.ValueTypeName="quaternion";mi.prototype.InterpolantFactoryMethodSmooth=void 0;var gi=class extends ln{constructor(e,t,n){super(e,t,n)}};gi.prototype.ValueTypeName="string";gi.prototype.ValueBufferType=Array;gi.prototype.DefaultInterpolation=is;gi.prototype.InterpolantFactoryMethodLinear=void 0;gi.prototype.InterpolantFactoryMethodSmooth=void 0;var ki=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}};ki.prototype.ValueTypeName="vector";var bi=class{constructor(e="",t=-1,n=[],s=zc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Sn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Ig(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(ln.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let u=wg(l);l=Id(l,1,u),c=Id(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new pi(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],u=c.name.match(r);if(u&&u.length>1){let d=u[1],h=s[d];h||(s[d]=h=[]),h.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Pg(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return pi;case"vector":case"vector2":case"vector3":case"vector4":return ki;case"color":return pa;case"quaternion":return mi;case"bool":case"boolean":return fi;case"string":return gi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Ig(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Pg(i.type);if(i.times===void 0){let n=[],s=[];Ag(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),_o(i.settings)&&(t.settings={inTangents:Li(i.settings.inTangents,Float32Array),outTangents:Li(i.settings.outTangents,Float32Array)}),t}var qn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Dd(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Dd(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Dd(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var qo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},If=new qo,Zn=class{constructor(e){this.manager=e!==void 0?e:If,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Zn.DEFAULT_MATERIAL_NAME="__DEFAULT";var li={},jl=class extends Error{constructor(e,t){super(e),this.response=t}},ar=class extends Zn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=qn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(li[e]!==void 0){li[e].push({onLoad:t,onProgress:n,onError:s});return}li[e]=[],li[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&He("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=li[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,m=f!==0,v=0,g=new ReadableStream({start(p){M();function M(){d.read().then(({done:T,value:x})=>{if(T)p.close();else{v+=x.byteLength;let S=new ProgressEvent("progress",{lengthComputable:m,loaded:v,total:f});for(let y=0,w=u.length;y<w;y++){let b=u[y];b.onProgress&&b.onProgress(S)}p.enqueue(x),M()}},T=>{p.error(T)})}}});return new Response(g)}else throw new jl(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{qn.add(`file:${e}`,c);let u=li[e];delete li[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=li[e];if(u===void 0)throw this.manager.itemError(e),c;delete li[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Bs=new WeakMap,Xo=class extends Zn{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=qn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=Bs.get(a);d===void 0&&(d=[],Bs.set(a,d)),d.push({onLoad:t,onError:s})}return a}let o=Xs("img");function l(){u(),t&&t(this);let d=Bs.get(this)||[];for(let h=0;h<d.length;h++){let f=d[h];f.onLoad&&f.onLoad(this)}Bs.delete(this),r.manager.itemEnd(e)}function c(d){u(),s&&s(d),qn.remove(`image:${e}`);let h=Bs.get(this)||[];for(let f=0;f<h.length;f++){let m=h[f];m.onError&&m.onError(d)}Bs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),qn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var ma=class extends Zn{constructor(e){super(e)}load(e,t,n,s){let r=new Bt,a=new Xo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},fs=class extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},ga=class extends fs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Bl=new et,Nd=new F,Fd=new F,or=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new er,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Nd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Nd),Fd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Fd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Bl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Bl,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===qs||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Bl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},mo=new F,go=new It,Wn=new F,ba=class extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=Fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(mo,go,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(mo,go,Wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(mo,go,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(mo,go,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ii=new F,Ud=new we,Od=new we,Ot=class extends ba{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rs*2*Math.atan(Math.tan(Or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z)}getViewSize(e,t){return this.getViewBounds(e,Ud,Od),t.subVectors(Od,Ud)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Or*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Kl=class extends or{constructor(){super(new Ot(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=rs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},xa=class extends fs{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Kl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Yl=class extends or{constructor(){super(new Ot(90,1,.5,500)),this.isPointLightShadow=!0}},xi=class extends fs{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Yl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Bi=class extends ba{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Jl=class extends or{constructor(){super(new Bi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},zi=class extends fs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new Jl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var _i=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var zl=new WeakMap,_a=class extends Zn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&He("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&He("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=qn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{zl.has(a)===!0?(s&&s(zl.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return qn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),zl.set(l,c),qn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});qn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var zs=-90,Gs=1,jo=class extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ot(zs,Gs,e,t);s.layers=this.layers,this.add(s);let r=new Ot(zs,Gs,e,t);r.layers=this.layers,this.add(r);let a=new Ot(zs,Gs,e,t);a.layers=this.layers,this.add(a);let o=new Ot(zs,Gs,e,t);o.layers=this.layers,this.add(o);let l=new Ot(zs,Gs,e,t);l.layers=this.layers,this.add(l);let c=new Ot(zs,Gs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Ko=class extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Yo=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){It.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let a=this._workIndex*r;It.multiplyQuaternionsFlat(e,a,e,t,e,n),It.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){let a=1-s;for(let o=0;o!==r;++o){let l=t+o;e[l]=e[l]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*s}}},Th="\\[\\]\\.:\\/",Lg=new RegExp("["+Th+"]","g"),wh="[^"+Th+"]",Dg="[^"+Th.replace("\\.","")+"]",Ng=/((?:WC+[\/:])*)/.source.replace("WC",wh),Fg=/(WCOD+)?/.source.replace("WCOD",Dg),Ug=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wh),Og=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wh),kg=new RegExp("^"+Ng+Fg+Ug+Og+"$"),Bg=["material","materials","bones","map"],Zl=class{constructor(e,t,n){let s=n||_t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},_t=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Lg,"")}static parseTrackName(e){let t=kg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Bg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){He("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ye("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ye("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ye("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ye("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ye("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Ye("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_t.Composite=Zl;_t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_t.prototype.GetterByBindingType=[_t.prototype._getValue_direct,_t.prototype._getValue_array,_t.prototype._getValue_arrayElement,_t.prototype._getValue_toArray];_t.prototype.SetterByBindingTypeAndVersioning=[[_t.prototype._setValue_direct,_t.prototype._setValue_direct_setNeedsUpdate,_t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_array,_t.prototype._setValue_array_setNeedsUpdate,_t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_arrayElement,_t.prototype._setValue_arrayElement_setNeedsUpdate,_t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_fromArray,_t.prototype._setValue_fromArray_setNeedsUpdate,_t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Jo=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,a=r.length,o=new Array(a),l={endingStart:Qi,endingEnd:Qi};for(let c=0;c!==a;++c){let u=r[c].createInterpolant(null);o[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Bc,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case hf:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case zc:default:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,a=n===lf;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===kc){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){let o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=es,s.endingEnd=es):(e?s.endingStart=this.zeroSlopeAtStart?es:Qi:s.endingStart=Gr,t?s.endingEnd=this.zeroSlopeAtEnd?es:Qi:s.endingEnd=Gr)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}},zg=new Float32Array(1),va=class extends Un{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let d=0;d!==r;++d){let h=s[d],f=h.name,m=u[f];if(m!==void 0)++m.referenceCount,a[d]=m;else{if(m=a[d],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}let v=t&&t._propertyBindings[d].binding.parsedPath;m=new Yo(_t.create(n,f,v),h.ValueTypeName,h.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),a[d]=m}o[d].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let d=o.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new fa(new Float32Array(2),new Float32Array(2),1,zg),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,a=typeof e=="string"?bi.findByName(s,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=zc),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let u=new Jo(this,a,t,n);return this._bindAction(u,c),this._addInactiveAction(u,o,r),u}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?bi.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let u=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var $l=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};function Ah(i,e,t,n){let s=Gg(n);switch(t){case bh:return i*e;case sc:return i*e/s.components*s.byteLength;case rc:return i*e/s.components*s.byteLength;case Vi:return i*e*2/s.components*s.byteLength;case ac:return i*e*2/s.components*s.byteLength;case xh:return i*e*3/s.components*s.byteLength;case gn:return i*e*4/s.components*s.byteLength;case oc:return i*e*4/s.components*s.byteLength;case Sa:case Ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ta:case wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case lc:case uc:return Math.max(i,16)*Math.max(e,8)/4;case cc:case hc:return Math.max(i,8)*Math.max(e,8)/2;case dc:case fc:case mc:case gc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case pc:case Aa:case bc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _c:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case vc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case yc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Mc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Sc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ec:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Tc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case wc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ac:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Rc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Cc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Pc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ic:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Lc:case Dc:case Nc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Fc:case Uc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ra:case Oc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Gg(i){switch(i){case hn:case fh:return{byteLength:1,components:1};case ur:case ph:case zn:return{byteLength:2,components:1};case nc:case ic:return{byteLength:2,components:4};case Bn:case tc:case mn:return{byteLength:4,components:1};case mh:case gh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Qf(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Vg(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){let m=d[h],v=d[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++h,d[h]=v)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){let v=d[f];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Wg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qg=`#ifdef USE_ALPHAHASH
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
#endif`,Xg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jg=`#ifdef USE_AOMAP
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
#endif`,Zg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$g=`#ifdef USE_BATCHING
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
#endif`,Qg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,e0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,t0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,n0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,i0=`#ifdef USE_IRIDESCENCE
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
#endif`,s0=`#ifdef USE_BUMPMAP
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
#endif`,r0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,a0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,o0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,l0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,h0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,u0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,d0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,f0=`#define PI 3.141592653589793
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
} // validated`,p0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,m0=`vec3 transformedNormal = objectNormal;
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
#endif`,g0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,b0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,x0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,v0="gl_FragColor = linearToOutputTexel( gl_FragColor );",y0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,M0=`#ifdef USE_ENVMAP
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
#endif`,S0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,E0=`#ifdef USE_ENVMAP
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
#endif`,T0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,w0=`#ifdef USE_ENVMAP
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
#endif`,A0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,R0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,C0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,P0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,I0=`#ifdef USE_GRADIENTMAP
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
}`,L0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,D0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,N0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,F0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,U0=`#ifdef USE_ENVMAP
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
#endif`,O0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,k0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,B0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,z0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,G0=`PhysicalMaterial material;
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
#endif`,H0=`uniform sampler2D dfgLUT;
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
}`,V0=`
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
#endif`,W0=`#if defined( RE_IndirectDiffuse )
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
#endif`,q0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,X0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,j0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,K0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Y0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,J0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Z0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Q0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,eb=`#if defined( USE_POINTS_UV )
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
#endif`,tb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ib=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ab=`#ifdef USE_MORPHTARGETS
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
#endif`,ob=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,lb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,hb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ub=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,db=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,fb=`#ifdef USE_NORMALMAP
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
#endif`,pb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_b=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Eb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ab=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cb=`float getShadowMask() {
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
}`,Pb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ib=`#ifdef USE_SKINNING
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
#endif`,Lb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Db=`#ifdef USE_SKINNING
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
#endif`,Nb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ub=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ob=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,kb=`#ifdef USE_TRANSMISSION
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
#endif`,Bb=`#ifdef USE_TRANSMISSION
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
#endif`,zb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Wb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qb=`uniform sampler2D t2D;
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
}`,Xb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Kb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jb=`#include <common>
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
}`,Zb=`#if DEPTH_PACKING == 3200
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
}`,$b=`#define DISTANCE
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
}`,Qb=`#define DISTANCE
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
}`,ex=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nx=`uniform float scale;
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
}`,ix=`uniform vec3 diffuse;
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
}`,sx=`#include <common>
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
}`,rx=`uniform vec3 diffuse;
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
}`,ax=`#define LAMBERT
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
}`,ox=`#define LAMBERT
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
}`,cx=`#define MATCAP
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
}`,lx=`#define MATCAP
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
}`,hx=`#define NORMAL
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
}`,ux=`#define NORMAL
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
}`,dx=`#define PHONG
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
}`,fx=`#define PHONG
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
}`,px=`#define STANDARD
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
}`,mx=`#define STANDARD
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
}`,gx=`#define TOON
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
}`,bx=`#define TOON
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
}`,xx=`uniform float size;
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
}`,_x=`uniform vec3 diffuse;
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
}`,vx=`#include <common>
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
}`,yx=`uniform vec3 color;
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
}`,Mx=`uniform float rotation;
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
}`,Sx=`uniform vec3 diffuse;
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
}`,it={alphahash_fragment:Wg,alphahash_pars_fragment:qg,alphamap_fragment:Xg,alphamap_pars_fragment:jg,alphatest_fragment:Kg,alphatest_pars_fragment:Yg,aomap_fragment:Jg,aomap_pars_fragment:Zg,batching_pars_vertex:$g,batching_vertex:Qg,begin_vertex:e0,beginnormal_vertex:t0,bsdfs:n0,iridescence_fragment:i0,bumpmap_pars_fragment:s0,clipping_planes_fragment:r0,clipping_planes_pars_fragment:a0,clipping_planes_pars_vertex:o0,clipping_planes_vertex:c0,color_fragment:l0,color_pars_fragment:h0,color_pars_vertex:u0,color_vertex:d0,common:f0,cube_uv_reflection_fragment:p0,defaultnormal_vertex:m0,displacementmap_pars_vertex:g0,displacementmap_vertex:b0,emissivemap_fragment:x0,emissivemap_pars_fragment:_0,colorspace_fragment:v0,colorspace_pars_fragment:y0,envmap_fragment:M0,envmap_common_pars_fragment:S0,envmap_pars_fragment:E0,envmap_pars_vertex:T0,envmap_physical_pars_fragment:U0,envmap_vertex:w0,fog_vertex:A0,fog_pars_vertex:R0,fog_fragment:C0,fog_pars_fragment:P0,gradientmap_pars_fragment:I0,lightmap_pars_fragment:L0,lights_lambert_fragment:D0,lights_lambert_pars_fragment:N0,lights_pars_begin:F0,lights_toon_fragment:O0,lights_toon_pars_fragment:k0,lights_phong_fragment:B0,lights_phong_pars_fragment:z0,lights_physical_fragment:G0,lights_physical_pars_fragment:H0,lights_fragment_begin:V0,lights_fragment_maps:W0,lights_fragment_end:q0,lightprobes_pars_fragment:X0,logdepthbuf_fragment:j0,logdepthbuf_pars_fragment:K0,logdepthbuf_pars_vertex:Y0,logdepthbuf_vertex:J0,map_fragment:Z0,map_pars_fragment:$0,map_particle_fragment:Q0,map_particle_pars_fragment:eb,metalnessmap_fragment:tb,metalnessmap_pars_fragment:nb,morphinstance_vertex:ib,morphcolor_vertex:sb,morphnormal_vertex:rb,morphtarget_pars_vertex:ab,morphtarget_vertex:ob,normal_fragment_begin:cb,normal_fragment_maps:lb,normal_pars_fragment:hb,normal_pars_vertex:ub,normal_vertex:db,normalmap_pars_fragment:fb,clearcoat_normal_fragment_begin:pb,clearcoat_normal_fragment_maps:mb,clearcoat_pars_fragment:gb,iridescence_pars_fragment:bb,opaque_fragment:xb,packing:_b,premultiplied_alpha_fragment:vb,project_vertex:yb,dithering_fragment:Mb,dithering_pars_fragment:Sb,roughnessmap_fragment:Eb,roughnessmap_pars_fragment:Tb,shadowmap_pars_fragment:wb,shadowmap_pars_vertex:Ab,shadowmap_vertex:Rb,shadowmask_pars_fragment:Cb,skinbase_vertex:Pb,skinning_pars_vertex:Ib,skinning_vertex:Lb,skinnormal_vertex:Db,specularmap_fragment:Nb,specularmap_pars_fragment:Fb,tonemapping_fragment:Ub,tonemapping_pars_fragment:Ob,transmission_fragment:kb,transmission_pars_fragment:Bb,uv_pars_fragment:zb,uv_pars_vertex:Gb,uv_vertex:Hb,worldpos_vertex:Vb,background_vert:Wb,background_frag:qb,backgroundCube_vert:Xb,backgroundCube_frag:jb,cube_vert:Kb,cube_frag:Yb,depth_vert:Jb,depth_frag:Zb,distance_vert:$b,distance_frag:Qb,equirect_vert:ex,equirect_frag:tx,linedashed_vert:nx,linedashed_frag:ix,meshbasic_vert:sx,meshbasic_frag:rx,meshlambert_vert:ax,meshlambert_frag:ox,meshmatcap_vert:cx,meshmatcap_frag:lx,meshnormal_vert:hx,meshnormal_frag:ux,meshphong_vert:dx,meshphong_frag:fx,meshphysical_vert:px,meshphysical_frag:mx,meshtoon_vert:gx,meshtoon_frag:bx,points_vert:xx,points_frag:_x,shadow_vert:vx,shadow_frag:yx,sprite_vert:Mx,sprite_frag:Sx},Re={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},ti={basic:{uniforms:en([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:en([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:en([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:en([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:en([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new qe(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:en([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:en([Re.points,Re.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:en([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:en([Re.common,Re.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:en([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:en([Re.sprite,Re.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distance:{uniforms:en([Re.common,Re.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distance_vert,fragmentShader:it.distance_frag},shadow:{uniforms:en([Re.lights,Re.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};ti.physical={uniforms:en([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};var Vc={r:0,b:0,g:0},Ex=new et,ep=new $e;ep.set(-1,0,0,0,1,0,0,0,1);function Tx(i,e,t,n,s,r){let a=new qe(0),o=s===!0?0:1,l,c,u=null,d=0,h=null;function f(M){let T=M.isScene===!0?M.background:null;if(T&&T.isTexture){let x=M.backgroundBlurriness>0;T=e.get(T,x)}return T}function m(M){let T=!1,x=f(M);x===null?g(a,o):x&&x.isColor&&(g(x,1),T=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(M,T){let x=f(T);x&&(x.isCubeTexture||x.mapping===Ma)?(c===void 0&&(c=new ct(new Zt(1,1,1),new $t({name:"BackgroundCubeMaterial",uniforms:xs(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,y,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ex.makeRotationFromEuler(T.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ep),c.material.toneMapped=st.getTransfer(x.colorSpace)!==pt,(u!==x||d!==x.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,h=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ct(new En(2,2),new $t({name:"BackgroundMaterial",uniforms:xs(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=st.getTransfer(x.colorSpace)!==pt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,h=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,T){M.getRGB(Vc,Eh(i)),t.buffers.color.setClear(Vc.r,Vc.g,Vc.b,T,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,T=1){a.set(M),o=T,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,g(a,o)},render:m,addToRenderList:v,dispose:p}}function wx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(O,V,H,k,$){let ae=!1,K=d(O,k,H,V);r!==K&&(r=K,c(r.object)),ae=f(O,k,H,$),ae&&m(O,k,H,$),$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(ae||a)&&(a=!1,x(O,V,H,k),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return i.createVertexArray()}function c(O){return i.bindVertexArray(O)}function u(O){return i.deleteVertexArray(O)}function d(O,V,H,k){let $=k.wireframe===!0,ae=n[V.id];ae===void 0&&(ae={},n[V.id]=ae);let K=O.isInstancedMesh===!0?O.id:0,de=ae[K];de===void 0&&(de={},ae[K]=de);let ce=de[H.id];ce===void 0&&(ce={},de[H.id]=ce);let pe=ce[$];return pe===void 0&&(pe=h(l()),ce[$]=pe),pe}function h(O){let V=[],H=[],k=[];for(let $=0;$<t;$++)V[$]=0,H[$]=0,k[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:H,attributeDivisors:k,object:O,attributes:{},index:null}}function f(O,V,H,k){let $=r.attributes,ae=V.attributes,K=0,de=H.getAttributes();for(let ce in de)if(de[ce].location>=0){let ge=$[ce],Le=ae[ce];if(Le===void 0&&(ce==="instanceMatrix"&&O.instanceMatrix&&(Le=O.instanceMatrix),ce==="instanceColor"&&O.instanceColor&&(Le=O.instanceColor)),ge===void 0||ge.attribute!==Le||Le&&ge.data!==Le.data)return!0;K++}return r.attributesNum!==K||r.index!==k}function m(O,V,H,k){let $={},ae=V.attributes,K=0,de=H.getAttributes();for(let ce in de)if(de[ce].location>=0){let ge=ae[ce];ge===void 0&&(ce==="instanceMatrix"&&O.instanceMatrix&&(ge=O.instanceMatrix),ce==="instanceColor"&&O.instanceColor&&(ge=O.instanceColor));let Le={};Le.attribute=ge,ge&&ge.data&&(Le.data=ge.data),$[ce]=Le,K++}r.attributes=$,r.attributesNum=K,r.index=k}function v(){let O=r.newAttributes;for(let V=0,H=O.length;V<H;V++)O[V]=0}function g(O){p(O,0)}function p(O,V){let H=r.newAttributes,k=r.enabledAttributes,$=r.attributeDivisors;H[O]=1,k[O]===0&&(i.enableVertexAttribArray(O),k[O]=1),$[O]!==V&&(i.vertexAttribDivisor(O,V),$[O]=V)}function M(){let O=r.newAttributes,V=r.enabledAttributes;for(let H=0,k=V.length;H<k;H++)V[H]!==O[H]&&(i.disableVertexAttribArray(H),V[H]=0)}function T(O,V,H,k,$,ae,K){K===!0?i.vertexAttribIPointer(O,V,H,$,ae):i.vertexAttribPointer(O,V,H,k,$,ae)}function x(O,V,H,k){v();let $=k.attributes,ae=H.getAttributes(),K=V.defaultAttributeValues;for(let de in ae){let ce=ae[de];if(ce.location>=0){let pe=$[de];if(pe===void 0&&(de==="instanceMatrix"&&O.instanceMatrix&&(pe=O.instanceMatrix),de==="instanceColor"&&O.instanceColor&&(pe=O.instanceColor)),pe!==void 0){let ge=pe.normalized,Le=pe.itemSize,Ce=e.get(pe);if(Ce===void 0)continue;let tt=Ce.buffer,Ke=Ce.type,je=Ce.bytesPerElement,R=Ke===i.INT||Ke===i.UNSIGNED_INT||pe.gpuType===tc;if(pe.isInterleavedBufferAttribute){let I=pe.data,N=I.stride,B=pe.offset;if(I.isInstancedInterleavedBuffer){for(let L=0;L<ce.locationSize;L++)p(ce.location+L,I.meshPerAttribute);O.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=I.meshPerAttribute*I.count)}else for(let L=0;L<ce.locationSize;L++)g(ce.location+L);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let L=0;L<ce.locationSize;L++)T(ce.location+L,Le/ce.locationSize,Ke,ge,N*je,(B+Le/ce.locationSize*L)*je,R)}else{if(pe.isInstancedBufferAttribute){for(let I=0;I<ce.locationSize;I++)p(ce.location+I,pe.meshPerAttribute);O.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let I=0;I<ce.locationSize;I++)g(ce.location+I);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let I=0;I<ce.locationSize;I++)T(ce.location+I,Le/ce.locationSize,Ke,ge,Le*je,Le/ce.locationSize*I*je,R)}}else if(K!==void 0){let ge=K[de];if(ge!==void 0)switch(ge.length){case 2:i.vertexAttrib2fv(ce.location,ge);break;case 3:i.vertexAttrib3fv(ce.location,ge);break;case 4:i.vertexAttrib4fv(ce.location,ge);break;default:i.vertexAttrib1fv(ce.location,ge)}}}}M()}function S(){A();for(let O in n){let V=n[O];for(let H in V){let k=V[H];for(let $ in k){let ae=k[$];for(let K in ae)u(ae[K].object),delete ae[K];delete k[$]}}delete n[O]}}function y(O){if(n[O.id]===void 0)return;let V=n[O.id];for(let H in V){let k=V[H];for(let $ in k){let ae=k[$];for(let K in ae)u(ae[K].object),delete ae[K];delete k[$]}}delete n[O.id]}function w(O){for(let V in n){let H=n[V];for(let k in H){let $=H[k];if($[O.id]===void 0)continue;let ae=$[O.id];for(let K in ae)u(ae[K].object),delete ae[K];delete $[O.id]}}}function b(O){for(let V in n){let H=n[V],k=O.isInstancedMesh===!0?O.id:0,$=H[k];if($!==void 0){for(let ae in $){let K=$[ae];for(let de in K)u(K[de].object),delete K[de];delete $[ae]}delete H[k],Object.keys(H).length===0&&delete n[V]}}}function A(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:P,dispose:S,releaseStatesOfGeometry:y,releaseStatesOfObject:b,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:g,disableUnusedAttributes:M}}function Ax(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Rx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==gn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let b=w===zn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==hn&&w!==mn&&!b&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(He("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),y=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:T,maxFragmentUniforms:x,maxSamples:S,samples:y}}function Cx(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Dn,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||s;return s=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let m=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?u(null):c();else{let M=r?0:n,T=M*4,x=p.clippingState||null;l.value=x,x=u(m,h,T,f);for(let S=0;S!==T;++S)x[S]=t[S];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,m){let v=d!==null?d.length:0,g=null;if(v!==0){if(g=l.value,m!==!0||g===null){let p=f+v*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let T=0,x=f;T!==v;++T,x+=4)a.copy(d[T]).applyMatrix4(M,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}var mr=4,Px=6,Ix=20,Lx=256,La=new Bi,Lf=new qe,Rh=null,Ch=0,Ph=0,Ih=!1,Dx=new F,_s=new F,br=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Dx}=r;Rh=this._renderer.getRenderTarget(),Ch=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),Ih=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ff(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Rh,Ch,Ph),this._renderer.xr.enabled=Ih,e.scissorTest=!1,pr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gi||e.mapping===gs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rh=this._renderer.getRenderTarget(),Ch=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),Ih=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:zn,format:gn,colorSpace:sn,depthBuffer:!1},s=Df(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Df(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Nx(r)),this._blurMaterial=Ux(r,e,t),this._ggxMaterial=Fx(r,e,t)}return s}_compileMaterial(e){let t=new ct(new yt,e);this._renderer.compile(t,La)}_sceneToCubeUV(e,t,n,s,r){let l=new Ot(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Lf),d.toneMapping=On,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ct(new Zt,new Ct({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,g=v.material,p=!1,M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,p=!0):(g.color.copy(Lf),p=!0);for(let T=0;T<6;T++){let x=T%3;x===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[T],r.y,r.z)):x===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[T]));let S=this._cubeSize;pr(s,x*S,T>2?S:0,S,S),d.setRenderTarget(s),p&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Gi||e.mapping===gs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ff()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;pr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,La)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,f=d*h,{_lodMax:m}=this,v=this._sizeLods[n],g=3*v*(n>m-mr?n-m+mr:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,pr(r,g,p,3*v,2*v),s.setRenderTarget(r),s.render(o,La),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-n,pr(e,g,p,3*v,2*v),s.setRenderTarget(e),s.render(o,La)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-mr?s-this._lodMax+mr:0),h=4*(this._cubeSize-u);pr(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(l,La)}};function Nx(i){let e=[],t=[],n=i,s=i-mr+1+Px;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,f=3,m=new Float32Array(f*h*d),v=new Float32Array(f*h*d);for(let p=0;p<d;p++){let M=p%3*2/3-1,T=p>2?0:-1,x=[M,T,0,M+2/3,T,0,M+2/3,T+1,0,M,T,0,M+2/3,T+1,0,M,T+1,0];m.set(x,f*h*p);for(let S=0;S<h;S++){let y=u[S*2]*2-1,w=u[S*2+1]*2-1;p===0?_s.set(1,w,y):p===1?_s.set(-y,1,-w):p===2?_s.set(-y,w,1):p===3?_s.set(-1,w,-y):p===4?_s.set(-y,-1,w):_s.set(y,w,-1),_s.toArray(v,(p*h+S)*f)}}let g=new yt;g.setAttribute("position",new wt(m,f)),g.setAttribute("outputDirection",new wt(v,f)),t.push(new ct(g,null)),n>mr&&n--}return{lodMeshes:t,sizeLods:e}}function Df(i,e,t){let n=new on(i,e,t);return n.texture.mapping=Ma,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function pr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Fx(i,e,t){return new $t({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Lx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:jc(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Ux(i,e,t){return new $t({name:"SphericalGaussianBlur",defines:{SAMPLES:Ix,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:jc(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Nf(){return new $t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jc(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Ff(){return new $t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function jc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var qc=class extends on{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Qr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Zt(5,5,5),r=new $t({name:"CubemapFromEquirect",uniforms:xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zt,blending:Qn});r.uniforms.tEquirect.value=t;let a=new ct(s,r),o=t.minFilter;return t.minFilter===kn&&(t.minFilter=Dt),new jo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function Ox(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,f=!1){return h==null?null:f?a(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===$o||f===Qo)if(e.has(h)){let m=e.get(h).texture;return o(m,h.mapping)}else{let m=h.image;if(m&&m.height>0){let v=new qc(m.height);return v.fromEquirectangularTexture(i,h),e.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let f=h.mapping,m=f===$o||f===Qo,v=f===Gi||f===gs;if(m||v){let g=t.get(h),p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new br(i)),g=m?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{let M=h.image;return m&&M&&M.height>0||v&&M&&l(M)?(n===null&&(n=new br(i)),g=m?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,f){return f===$o?h.mapping=Gi:f===Qo&&(h.mapping=gs),h}function l(h){let f=0,m=6;for(let v=0;v<m;v++)h[v]!==void 0&&f++;return f===m}function c(h){let f=h.target;f.removeEventListener("dispose",c);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function kx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ns("WebGLRenderer: "+n+" extension not supported."),s}}}function Bx(i,e,t,n){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let m in h.attributes)e.remove(h.attributes[m]);h.removeEventListener("dispose",a),delete s[h.id];let f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(d){let h=[],f=d.index,m=d.attributes.position,v=0;if(m===void 0)return;if(f!==null){let M=f.array;v=f.version;for(let T=0,x=M.length;T<x;T+=3){let S=M[T+0],y=M[T+1],w=M[T+2];h.push(S,y,y,w,w,S)}}else{let M=m.array;v=m.version;for(let T=0,x=M.length/3-1;T<x;T+=3){let S=T+0,y=T+1,w=T+2;h.push(S,y,y,w,w,S)}}let g=new(m.count>=65535?Kr:jr)(h,1);g.version=v;let p=r.get(d);p&&e.remove(p),r.set(d,g)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function zx(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,h){i.drawElements(n,h,r,d*a),t.update(h,n,1)}function c(d,h,f){f!==0&&(i.drawElementsInstanced(n,h,r,d*a,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,f);let v=0;for(let g=0;g<f;g++)v+=h[g];t.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Gx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Hx(i,e,t){let n=new WeakMap,s=new bt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==d){let A=function(){w.dispose(),n.delete(o),o.removeEventListener("dispose",A)};h!==void 0&&h.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],T=0;f===!0&&(T=1),m===!0&&(T=2),v===!0&&(T=3);let x=o.attributes.position.count*T,S=1;x>e.maxTextureSize&&(S=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let y=new Float32Array(x*S*4*d),w=new Wr(y,x,S,d);w.type=mn,w.needsUpdate=!0;let b=T*4;for(let P=0;P<d;P++){let O=g[P],V=p[P],H=M[P],k=x*S*4*P;for(let $=0;$<O.count;$++){let ae=$*b;f===!0&&(s.fromBufferAttribute(O,$),y[k+ae+0]=s.x,y[k+ae+1]=s.y,y[k+ae+2]=s.z,y[k+ae+3]=0),m===!0&&(s.fromBufferAttribute(V,$),y[k+ae+4]=s.x,y[k+ae+5]=s.y,y[k+ae+6]=s.z,y[k+ae+7]=0),v===!0&&(s.fromBufferAttribute(H,$),y[k+ae+8]=s.x,y[k+ae+9]=s.y,y[k+ae+10]=s.z,y[k+ae+11]=H.itemSize===4?s.w:1)}}h={count:d,texture:w,size:new we(x,S)},n.set(o,h),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Vx(i,e,t,n,s){let r=new WeakMap;function a(c){let u=s.render.frame,d=c.geometry,h=e.get(c,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var Wx={[ah]:"LINEAR_TONE_MAPPING",[oh]:"REINHARD_TONE_MAPPING",[ch]:"CINEON_TONE_MAPPING",[ya]:"ACES_FILMIC_TONE_MAPPING",[hh]:"AGX_TONE_MAPPING",[uh]:"NEUTRAL_TONE_MAPPING",[lh]:"CUSTOM_TONE_MAPPING"};function qx(i,e,t,n,s,r){let a=new on(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new yt;c.setAttribute("position",new ht([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ht([0,2,0,0,2,0],2));let u=new ko({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ct(c,u),h=new Bi(-1,1,1,-1,0,1),f=null,m=null,v=!1,g,p=null,M=[],T=!1;this.setSize=function(x,S){a.setSize(x,S),o!==null&&o.setSize(x,S),l!==null&&l.setSize(x,S);for(let y=0;y<M.length;y++){let w=M[y];w.setSize&&w.setSize(x,S)}},this.setEffects=function(x){M=x,T=M.length>0&&M[0].isRenderPass===!0;let S=a.width,y=a.height;M.length>0&&o===null&&(o=new on(S,y,{type:zn,depthBuffer:!1,stencilBuffer:!1}),l=new on(S,y,{type:zn,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<M.length;w++){let b=M[w];b.setSize&&b.setSize(S,y)}},this.begin=function(x,S){if(v||x.toneMapping===On&&M.length===0)return!1;if(p=S,S!==null){let y=S.width,w=S.height;(a.width!==y||a.height!==w)&&this.setSize(y,w)}return T===!1&&x.setRenderTarget(a),g=x.toneMapping,x.toneMapping=On,!0},this.hasRenderPass=function(){return T},this.end=function(x,S){x.toneMapping=g,v=!0;let y=a,w=o;for(let b=0;b<M.length;b++){let A=M[b];A.enabled!==!1&&(A.render(x,w,y,S),A.needsSwap!==!1&&(y=w,w=w===o?l:o))}if(f!==x.outputColorSpace||m!==x.toneMapping){f=x.outputColorSpace,m=x.toneMapping,u.defines={},st.getTransfer(f)===pt&&(u.defines.SRGB_TRANSFER="");let b=Wx[m];b&&(u.defines[b]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(p),x.render(d,h),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var tp=new Bt,Nh=new Fi(1,1),np=new Wr,ip=new Co,sp=new Qr,Uf=[],Of=[],kf=new Float32Array(16),Bf=new Float32Array(9),zf=new Float32Array(4);function xr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Uf[s];if(r===void 0&&(r=new Float32Array(s),Uf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ht(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Kc(i,e){let t=Of[e];t===void 0&&(t=new Int32Array(e),Of[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Xx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function jx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2fv(this.addr,e),Ht(t,e)}}function Kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;i.uniform3fv(this.addr,e),Ht(t,e)}}function Yx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4fv(this.addr,e),Ht(t,e)}}function Jx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(Gt(t,n))return;zf.set(n),i.uniformMatrix2fv(this.addr,!1,zf),Ht(t,n)}}function Zx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(Gt(t,n))return;Bf.set(n),i.uniformMatrix3fv(this.addr,!1,Bf),Ht(t,n)}}function $x(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(Gt(t,n))return;kf.set(n),i.uniformMatrix4fv(this.addr,!1,kf),Ht(t,n)}}function Qx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function e_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2iv(this.addr,e),Ht(t,e)}}function t_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3iv(this.addr,e),Ht(t,e)}}function n_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4iv(this.addr,e),Ht(t,e)}}function i_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function s_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2uiv(this.addr,e),Ht(t,e)}}function r_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3uiv(this.addr,e),Ht(t,e)}}function a_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4uiv(this.addr,e),Ht(t,e)}}function o_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Nh.compareFunction=t.isReversedDepthBuffer()?Hc:Gc,r=Nh):r=tp,t.setTexture2D(e||r,s)}function c_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ip,s)}function l_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||sp,s)}function h_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||np,s)}function u_(i){switch(i){case 5126:return Xx;case 35664:return jx;case 35665:return Kx;case 35666:return Yx;case 35674:return Jx;case 35675:return Zx;case 35676:return $x;case 5124:case 35670:return Qx;case 35667:case 35671:return e_;case 35668:case 35672:return t_;case 35669:case 35673:return n_;case 5125:return i_;case 36294:return s_;case 36295:return r_;case 36296:return a_;case 35678:case 36198:case 36298:case 36306:case 35682:return o_;case 35679:case 36299:case 36307:return c_;case 35680:case 36300:case 36308:case 36293:return l_;case 36289:case 36303:case 36311:case 36292:return h_}}function d_(i,e){i.uniform1fv(this.addr,e)}function f_(i,e){let t=xr(e,this.size,2);i.uniform2fv(this.addr,t)}function p_(i,e){let t=xr(e,this.size,3);i.uniform3fv(this.addr,t)}function m_(i,e){let t=xr(e,this.size,4);i.uniform4fv(this.addr,t)}function g_(i,e){let t=xr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function b_(i,e){let t=xr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function x_(i,e){let t=xr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function __(i,e){i.uniform1iv(this.addr,e)}function v_(i,e){i.uniform2iv(this.addr,e)}function y_(i,e){i.uniform3iv(this.addr,e)}function M_(i,e){i.uniform4iv(this.addr,e)}function S_(i,e){i.uniform1uiv(this.addr,e)}function E_(i,e){i.uniform2uiv(this.addr,e)}function T_(i,e){i.uniform3uiv(this.addr,e)}function w_(i,e){i.uniform4uiv(this.addr,e)}function A_(i,e,t){let n=this.cache,s=e.length,r=Kc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Nh:a=tp;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function R_(i,e,t){let n=this.cache,s=e.length,r=Kc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ip,r[a])}function C_(i,e,t){let n=this.cache,s=e.length,r=Kc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||sp,r[a])}function P_(i,e,t){let n=this.cache,s=e.length,r=Kc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||np,r[a])}function I_(i){switch(i){case 5126:return d_;case 35664:return f_;case 35665:return p_;case 35666:return m_;case 35674:return g_;case 35675:return b_;case 35676:return x_;case 5124:case 35670:return __;case 35667:case 35671:return v_;case 35668:case 35672:return y_;case 35669:case 35673:return M_;case 5125:return S_;case 36294:return E_;case 36295:return T_;case 36296:return w_;case 35678:case 36198:case 36298:case 36306:case 35682:return A_;case 35679:case 36299:case 36307:return R_;case 35680:case 36300:case 36308:case 36293:return C_;case 36289:case 36303:case 36311:case 36292:return P_}}var Fh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=u_(t.type)}},Uh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=I_(t.type)}},Oh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Lh=/(\w+)(\])?(\[|\.)?/g;function Gf(i,e){i.seq.push(e),i.map[e.id]=e}function L_(i,e,t){let n=i.name,s=n.length;for(Lh.lastIndex=0;;){let r=Lh.exec(n),a=Lh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Gf(t,c===void 0?new Fh(o,i,e):new Uh(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Oh(o),Gf(t,d)),t=d}}}var gr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);L_(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Hf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var D_=37297,N_=0;function F_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Vf=new $e;function U_(i){st._getMatrix(Vf,st.workingColorSpace,i);let e=`mat3( ${Vf.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(i)){case Hr:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Wf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+F_(i.getShaderSource(e),o)}else return r}function O_(i,e){let t=U_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var k_={[ah]:"Linear",[oh]:"Reinhard",[ch]:"Cineon",[ya]:"ACESFilmic",[hh]:"AgX",[uh]:"Neutral",[lh]:"Custom"};function B_(i,e){let t=k_[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Wc=new F;function z_(){st.getLuminanceCoefficients(Wc);let i=Wc.x.toFixed(4),e=Wc.y.toFixed(4),t=Wc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function G_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Na).join(`
`)}function H_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function V_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Na(i){return i!==""}function qf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var W_=/^[ \t]*#include +<([\w\d./]+)>/gm;function kh(i){return i.replace(W_,X_)}var q_=new Map;function X_(i,e){let t=it[e];if(t===void 0){let n=q_.get(e);if(n!==void 0)t=it[n],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return kh(t)}var j_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jf(i){return i.replace(j_,K_)}function K_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Kf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Y_={[ps]:"SHADOWMAP_TYPE_PCF",[cr]:"SHADOWMAP_TYPE_VSM"};function J_(i){return Y_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Z_={[Gi]:"ENVMAP_TYPE_CUBE",[gs]:"ENVMAP_TYPE_CUBE",[Ma]:"ENVMAP_TYPE_CUBE_UV"};function $_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Z_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Q_={[gs]:"ENVMAP_MODE_REFRACTION"};function ev(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Q_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var tv={[Zo]:"ENVMAP_BLENDING_MULTIPLY",[af]:"ENVMAP_BLENDING_MIX",[of]:"ENVMAP_BLENDING_ADD"};function nv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":tv[i.combine]||"ENVMAP_BLENDING_NONE"}function iv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function sv(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=J_(t),c=$_(t),u=ev(t),d=nv(t),h=iv(t),f=G_(t),m=H_(r),v=s.createProgram(),g,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Na).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Na).join(`
`),p.length>0&&(p+=`
`)):(g=[Kf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Na).join(`
`),p=[Kf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?it.tonemapping_pars_fragment:"",t.toneMapping!==On?B_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,O_("linearToOutputTexel",t.outputColorSpace),z_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Na).join(`
`)),a=kh(a),a=qf(a,t),a=Xf(a,t),o=kh(o),o=qf(o,t),o=Xf(o,t),a=jf(a),o=jf(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let T=M+g+a,x=M+p+o,S=Hf(s,s.VERTEX_SHADER,T),y=Hf(s,s.FRAGMENT_SHADER,x);s.attachShader(v,S),s.attachShader(v,y),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(O){if(i.debug.checkShaderErrors){let V=s.getProgramInfoLog(v)||"",H=s.getShaderInfoLog(S)||"",k=s.getShaderInfoLog(y)||"",$=V.trim(),ae=H.trim(),K=k.trim(),de=!0,ce=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(de=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,S,y);else{let pe=Wf(s,S,"vertex"),ge=Wf(s,y,"fragment");Ye("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+$+`
`+pe+`
`+ge)}else $!==""?He("WebGLProgram: Program Info Log:",$):(ae===""||K==="")&&(ce=!1);ce&&(O.diagnostics={runnable:de,programLog:$,vertexShader:{log:ae,prefix:g},fragmentShader:{log:K,prefix:p}})}s.deleteShader(S),s.deleteShader(y),b=new gr(s,v),A=V_(s,v)}let b;this.getUniforms=function(){return b===void 0&&w(this),b};let A;this.getAttributes=function(){return A===void 0&&w(this),A};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,D_)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=N_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=y,this}var rv=0,Bh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new zh(e),t.set(e,n)),n}},zh=class{constructor(e){this.id=rv++,this.code=e,this.usedTimes=0}};function av(i){return i===Vi||i===Aa||i===Ra}function ov(i,e,t,n,s,r){let a=new qr,o=new Bh,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer,h=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(b){return l.add(b),b===0?"uv":`uv${b}`}function v(b,A,P,O,V,H){let k=O.fog,$=V.geometry,ae=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?O.environment:null,K=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,de=e.get(b.envMap||ae,K),ce=de&&de.mapping===Ma?de.image.height:null,pe=f[b.type];b.precision!==null&&(h=n.getMaxPrecision(b.precision),h!==b.precision&&He("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));let ge=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Le=ge!==void 0?ge.length:0,Ce=0;$.morphAttributes.position!==void 0&&(Ce=1),$.morphAttributes.normal!==void 0&&(Ce=2),$.morphAttributes.color!==void 0&&(Ce=3);let tt,Ke,je,R;if(pe){let Mt=ti[pe];tt=Mt.vertexShader,Ke=Mt.fragmentShader}else{tt=b.vertexShader,Ke=b.fragmentShader;let Mt=o.getVertexShaderStage(b),dt=o.getFragmentShaderStage(b);o.update(b,Mt,dt),je=Mt.id,R=dt.id}let I=i.getRenderTarget(),N=i.state.buffers.depth.getReversed(),B=V.isInstancedMesh===!0,L=V.isBatchedMesh===!0,Z=!!b.map,he=!!b.matcap,W=!!de,j=!!b.aoMap,ee=!!b.lightMap,se=!!b.bumpMap&&b.wireframe===!1,z=!!b.normalMap,ue=!!b.displacementMap,Y=!!b.emissiveMap,ye=!!b.metalnessMap,Ne=!!b.roughnessMap,D=b.anisotropy>0,Ze=b.clearcoat>0,We=b.dispersion>0,C=b.retroreflectivity>0,_=b.iridescence>0,q=b.sheen>0,J=b.transmission>0,U=D&&!!b.anisotropyMap,te=Ze&&!!b.clearcoatMap,re=Ze&&!!b.clearcoatNormalMap,Q=Ze&&!!b.clearcoatRoughnessMap,oe=_&&!!b.iridescenceMap,_e=_&&!!b.iridescenceThicknessMap,Ae=q&&!!b.sheenColorMap,Ee=q&&!!b.sheenRoughnessMap,Te=!!b.specularMap,De=!!b.specularColorMap,Xe=!!b.specularIntensityMap,Ue=J&&!!b.transmissionMap,G=J&&!!b.thicknessMap,Se=!!b.gradientMap,me=!!b.alphaMap,ve=b.alphaTest>0,Me=!!b.alphaHash,be=!!b.extensions,Ve=On;b.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Ve=i.toneMapping);let ze={shaderID:pe,shaderType:b.type,shaderName:b.name,vertexShader:tt,fragmentShader:Ke,defines:b.defines,customVertexShaderID:je,customFragmentShaderID:R,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:L,batchingColor:L&&V._colorsTexture!==null,instancing:B,instancingColor:B&&V.instanceColor!==null,instancingMorph:B&&V.morphTexture!==null,outputColorSpace:I===null?i.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:st.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Z,matcap:he,envMap:W,envMapMode:W&&de.mapping,envMapCubeUVHeight:ce,aoMap:j,lightMap:ee,bumpMap:se,normalMap:z,displacementMap:ue,emissiveMap:Y,normalMapObjectSpace:z&&b.normalMapType===df,normalMapTangentSpace:z&&b.normalMapType===Pa,packedNormalMap:z&&b.normalMapType===Pa&&av(b.normalMap.format),metalnessMap:ye,roughnessMap:Ne,anisotropy:D,anisotropyMap:U,clearcoat:Ze,clearcoatMap:te,clearcoatNormalMap:re,clearcoatRoughnessMap:Q,dispersion:We,retroreflection:C,iridescence:_,iridescenceMap:oe,iridescenceThicknessMap:_e,sheen:q,sheenColorMap:Ae,sheenRoughnessMap:Ee,specularMap:Te,specularColorMap:De,specularIntensityMap:Xe,transmission:J,transmissionMap:Ue,thicknessMap:G,gradientMap:Se,opaque:b.transparent===!1&&b.blending===lr&&b.alphaToCoverage===!1,alphaMap:me,alphaTest:ve,alphaHash:Me,combine:b.combine,mapUv:Z&&m(b.map.channel),aoMapUv:j&&m(b.aoMap.channel),lightMapUv:ee&&m(b.lightMap.channel),bumpMapUv:se&&m(b.bumpMap.channel),normalMapUv:z&&m(b.normalMap.channel),displacementMapUv:ue&&m(b.displacementMap.channel),emissiveMapUv:Y&&m(b.emissiveMap.channel),metalnessMapUv:ye&&m(b.metalnessMap.channel),roughnessMapUv:Ne&&m(b.roughnessMap.channel),anisotropyMapUv:U&&m(b.anisotropyMap.channel),clearcoatMapUv:te&&m(b.clearcoatMap.channel),clearcoatNormalMapUv:re&&m(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&m(b.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&m(b.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&m(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&m(b.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(b.sheenRoughnessMap.channel),specularMapUv:Te&&m(b.specularMap.channel),specularColorMapUv:De&&m(b.specularColorMap.channel),specularIntensityMapUv:Xe&&m(b.specularIntensityMap.channel),transmissionMapUv:Ue&&m(b.transmissionMap.channel),thicknessMapUv:G&&m(b.thicknessMap.channel),alphaMapUv:me&&m(b.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(z||D),vertexNormals:!!$.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!$.attributes.uv&&(Z||me),fog:!!k,useFog:b.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||$.attributes.normal===void 0&&z===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:N,skinning:V.isSkinnedMesh===!0,hasPositionAttribute:$.attributes.position!==void 0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Le,morphTextureStride:Ce,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ve,decodeVideoTexture:Z&&b.map.isVideoTexture===!0&&st.getTransfer(b.map.colorSpace)===pt,decodeVideoTextureEmissive:Y&&b.emissiveMap.isVideoTexture===!0&&st.getTransfer(b.emissiveMap.colorSpace)===pt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Qt,flipSided:b.side===zt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:be&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&b.extensions.multiDraw===!0||L)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ze.vertexUv1s=l.has(1),ze.vertexUv2s=l.has(2),ze.vertexUv3s=l.has(3),l.clear(),ze}function g(b){let A=[];if(b.shaderID?A.push(b.shaderID):(A.push(b.customVertexShaderID),A.push(b.customFragmentShaderID)),b.defines!==void 0)for(let P in b.defines)A.push(P),A.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(p(A,b),M(A,b),A.push(i.outputColorSpace)),A.push(b.customProgramCacheKey),A.join()}function p(b,A){b.push(A.precision),b.push(A.outputColorSpace),b.push(A.envMapMode),b.push(A.envMapCubeUVHeight),b.push(A.mapUv),b.push(A.alphaMapUv),b.push(A.lightMapUv),b.push(A.aoMapUv),b.push(A.bumpMapUv),b.push(A.normalMapUv),b.push(A.displacementMapUv),b.push(A.emissiveMapUv),b.push(A.metalnessMapUv),b.push(A.roughnessMapUv),b.push(A.anisotropyMapUv),b.push(A.clearcoatMapUv),b.push(A.clearcoatNormalMapUv),b.push(A.clearcoatRoughnessMapUv),b.push(A.iridescenceMapUv),b.push(A.iridescenceThicknessMapUv),b.push(A.sheenColorMapUv),b.push(A.sheenRoughnessMapUv),b.push(A.specularMapUv),b.push(A.specularColorMapUv),b.push(A.specularIntensityMapUv),b.push(A.transmissionMapUv),b.push(A.thicknessMapUv),b.push(A.combine),b.push(A.fogExp2),b.push(A.sizeAttenuation),b.push(A.morphTargetsCount),b.push(A.morphAttributeCount),b.push(A.numSunLights),b.push(A.numDirLights),b.push(A.numPointLights),b.push(A.numSpotLights),b.push(A.numSpotLightMaps),b.push(A.numHemiLights),b.push(A.numRectAreaLights),b.push(A.numSunLightShadows),b.push(A.numDirLightShadows),b.push(A.numPointLightShadows),b.push(A.numSpotLightShadows),b.push(A.numSpotLightShadowsWithMaps),b.push(A.numLightProbes),b.push(A.shadowMapType),b.push(A.toneMapping),b.push(A.numClippingPlanes),b.push(A.numClipIntersection),b.push(A.depthPacking)}function M(b,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function T(b){let A=f[b.type],P;if(A){let O=ti[A];P=Cf.clone(O.uniforms)}else P=b.uniforms;return P}function x(b,A){let P=u.get(A);return P!==void 0?++P.usedTimes:(P=new sv(i,A,b,s),c.push(P),u.set(A,P)),P}function S(b){if(--b.usedTimes===0){let A=c.indexOf(b);c[A]=c[c.length-1],c.pop(),u.delete(b.cacheKey),b.destroy()}}function y(b){o.remove(b)}function w(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:T,acquireProgram:x,releaseProgram:S,releaseShaderCache:y,programs:c,dispose:w}}function cv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function lv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Yf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Jf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,m,v,g,p){let M=i[e];return M===void 0?(M={id:h.id,object:h,geometry:f,material:m,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:g,group:p},i[e]=M):(M.id=h.id,M.object=h,M.geometry=f,M.material=m,M.materialVariant=a(h),M.groupOrder=v,M.renderOrder=h.renderOrder,M.z=g,M.group=p),e++,M}function l(h,f,m,v,g,p,M){M.reversedDepth===!0&&(g=-g);let T=o(h,f,m,v,g,p);m.transmission>0?n.push(T):m.transparent===!0?s.push(T):t.push(T)}function c(h,f,m,v,g,p){let M=o(h,f,m,v,g,p);m.transmission>0?n.unshift(M):m.transparent===!0?s.unshift(M):t.unshift(M)}function u(h,f){t.length>1&&t.sort(h||lv),n.length>1&&n.sort(f||Yf),s.length>1&&s.sort(f||Yf)}function d(){for(let h=e,f=i.length;h<f;h++){let m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function hv(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Jf,i.set(n,[a])):s>=r.length?(a=new Jf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function uv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new F,color:new qe};break;case"SpotLight":t={position:new F,direction:new F,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new F,halfWidth:new F,halfHeight:new F};break}return i[e.id]=t,t}}}function dv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var fv=0;function pv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function mv(i){let e=new uv,t=dv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);let s=new F,r=new et,a=new et;function o(c){let u=0,d=0,h=0;for(let V=0;V<9;V++)n.probe[V].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,M=0,T=0,x=0,S=0,y=0,w=0,b=0,A=0,P=0;c.sort(pv);for(let V=0,H=c.length;V<H;V++){let k=c[V],$=k.color,ae=k.intensity,K=k.distance,de=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===Vi?de=k.shadow.map.texture:de=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)u+=$.r*ae,d+=$.g*ae,h+=$.b*ae;else if(k.isLightProbe){for(let ce=0;ce<9;ce++)n.probe[ce].addScaledVector(k.sh.coefficients[ce],ae);P++}else if(k.isSunLight){let ce=e.get(k);if(ce.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){let pe=k.shadow,ge=t.get(k);ge.shadowIntensity=pe.intensity,ge.shadowBias=pe.bias,ge.shadowNormalBias=pe.normalBias,ge.shadowRadius=pe.radius,ge.shadowMapSize.copy(pe.mapSize).multiply(pe.getFrameExtents()),n.sunShadow[m]=ge,n.sunShadowMap[m]=de;let Le=pe.getViewportCount();for(let Ce=0;Ce<Le;Ce++)n.sunShadowMatrix[v+Ce]=pe.getMatrix(Ce),n.sunShadowCascade[v+Ce]=pe._cascadeData[Ce];v+=Le,m++}n.sun[f]=ce,f++}else if(k.isDirectionalLight){let ce=e.get(k);if(ce.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){let pe=k.shadow,ge=t.get(k);ge.shadowIntensity=pe.intensity,ge.shadowBias=pe.bias,ge.shadowNormalBias=pe.normalBias,ge.shadowRadius=pe.radius,ge.shadowMapSize=pe.mapSize,n.directionalShadow[g]=ge,n.directionalShadowMap[g]=de,n.directionalShadowMatrix[g]=k.shadow.matrix,S++}n.directional[g]=ce,g++}else if(k.isSpotLight){let ce=e.get(k);ce.position.setFromMatrixPosition(k.matrixWorld),ce.color.copy($).multiplyScalar(ae),ce.distance=K,ce.coneCos=Math.cos(k.angle),ce.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),ce.decay=k.decay,n.spot[M]=ce;let pe=k.shadow;if(k.map&&(n.spotLightMap[b]=k.map,b++,pe.updateMatrices(k),k.castShadow&&A++),n.spotLightMatrix[M]=pe.matrix,k.castShadow){let ge=t.get(k);ge.shadowIntensity=pe.intensity,ge.shadowBias=pe.bias,ge.shadowNormalBias=pe.normalBias,ge.shadowRadius=pe.radius,ge.shadowMapSize=pe.mapSize,n.spotShadow[M]=ge,n.spotShadowMap[M]=de,w++}M++}else if(k.isRectAreaLight){let ce=e.get(k);ce.color.copy($).multiplyScalar(ae),ce.halfWidth.set(k.width*.5,0,0),ce.halfHeight.set(0,k.height*.5,0),n.rectArea[T]=ce,T++}else if(k.isPointLight){let ce=e.get(k);if(ce.color.copy(k.color).multiplyScalar(k.intensity),ce.distance=k.distance,ce.decay=k.decay,k.castShadow){let pe=k.shadow,ge=t.get(k);ge.shadowIntensity=pe.intensity,ge.shadowBias=pe.bias,ge.shadowNormalBias=pe.normalBias,ge.shadowRadius=pe.radius,ge.shadowMapSize=pe.mapSize,ge.shadowCameraNear=pe.camera.near,ge.shadowCameraFar=pe.camera.far,n.pointShadow[p]=ge,n.pointShadowMap[p]=de,n.pointShadowMatrix[p]=k.shadow.matrix,y++}n.point[p]=ce,p++}else if(k.isHemisphereLight){let ce=e.get(k);ce.skyColor.copy(k.color).multiplyScalar(ae),ce.groundColor.copy(k.groundColor).multiplyScalar(ae),n.hemi[x]=ce,x++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let O=n.hash;(O.sunLength!==f||O.directionalLength!==g||O.pointLength!==p||O.spotLength!==M||O.rectAreaLength!==T||O.hemiLength!==x||O.numSunShadows!==m||O.numDirectionalShadows!==S||O.numPointShadows!==y||O.numSpotShadows!==w||O.numSpotMaps!==b||O.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=g,n.spot.length=M,n.rectArea.length=T,n.point.length=p,n.hemi.length=x,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=y,n.pointShadowMap.length=y,n.pointShadowMatrix.length=y,n.spotShadow.length=w,n.spotShadowMap.length=w,n.spotLightMatrix.length=w+b-A,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=P,O.sunLength=f,O.directionalLength=g,O.pointLength=p,O.spotLength=M,O.rectAreaLength=T,O.hemiLength=x,O.numSunShadows=m,O.numDirectionalShadows=S,O.numPointShadows=y,O.numSpotShadows=w,O.numSpotMaps=b,O.numLightProbes=P,n.version=fv++)}function l(c,u){let d=0,h=0,f=0,m=0,v=0,g=0,p=u.matrixWorldInverse;for(let M=0,T=c.length;M<T;M++){let x=c[M];if(x.isSunLight){let S=n.sun[d];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(p),d++}else if(x.isDirectionalLight){let S=n.directional[h];S.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),h++}else if(x.isSpotLight){let S=n.spot[m];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),m++}else if(x.isRectAreaLight){let S=n.rectArea[v];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),a.identity(),r.copy(x.matrixWorld),r.premultiply(p),a.extractRotation(r),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),v++}else if(x.isPointLight){let S=n.point[f];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){let S=n.hemi[g];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(p),g++}}}return{setup:o,setupView:l,state:n}}function Zf(i){let e=new mv(i),t=[],n=[],s=[];function r(h){d.camera=h,t.length=0,n.length=0,s.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function gv(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Zf(i),e.set(s,[o])):r>=a.length?(o=new Zf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var bv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xv=`uniform sampler2D shadow_pass;
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
}`,_v=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],vv=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],$f=new et,Da=new F,Dh=new F;function yv(i,e,t){let n=new er,s=new we,r=new we,a=new bt,o=new Bo,l=new zo,c={},u=t.maxTextureSize,d={[$n]:zt,[zt]:$n,[Qt]:Qt},h=new $t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:bv,fragmentShader:xv}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let m=new yt;m.setAttribute("position",new wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ct(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ps;let p=this.type;this.render=function(y,w,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||y.length===0)return;this.type===zd&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ps);let A=i.getRenderTarget(),P=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Qn),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let H=p!==this.type;H&&w.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach($=>$.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,$=y.length;k<$;k++){let ae=y[k],K=ae.shadow;if(K===void 0){He("WebGLShadowMap:",ae,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);let de=K.getFrameExtents();s.multiply(de),r.copy(K.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/de.x),s.x=r.x*de.x,K.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/de.y),s.y=r.y*de.y,K.mapSize.y=r.y));let ce=i.state.buffers.depth.getReversed();if(K.camera._reversedDepth=ce,K.map===null||H===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===cr){if(ae.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new on(s.x,s.y,{format:Vi,type:zn,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),K.map.texture.name=ae.name+".shadowMap",K.map.depthTexture=new Fi(s.x,s.y,mn),K.map.depthTexture.name=ae.name+".shadowMapDepth",K.map.depthTexture.format=jn,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Lt,K.map.depthTexture.magFilter=Lt}else ae.isPointLight?(K.map=new qc(s.x),K.map.depthTexture=new Lo(s.x,Bn)):(K.map=new on(s.x,s.y),K.map.depthTexture=new Fi(s.x,s.y,Bn)),K.map.depthTexture.name=ae.name+".shadowMap",K.map.depthTexture.format=jn,this.type===ps?(K.map.depthTexture.compareFunction=ce?Hc:Gc,K.map.depthTexture.minFilter=Dt,K.map.depthTexture.magFilter=Dt):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Lt,K.map.depthTexture.magFilter=Lt);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==s.x||K.map.height!==s.y)&&K.map.setSize(s.x,s.y);let pe=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();ae.isPointLight!==!0&&K.updateMatrices(ae,b);for(let ge=0;ge<pe;ge++){let Le=K.getCamera(ge);if(ae.isPointLight){let Ce=K.camera,tt=K.matrix,Ke=ae.distance||Ce.far;Ke!==Ce.far&&(Ce.far=Ke,Ce.updateProjectionMatrix()),Da.setFromMatrixPosition(ae.matrixWorld),Ce.position.copy(Da),Dh.copy(Ce.position),Dh.add(_v[ge]),Ce.up.copy(vv[ge]),Ce.lookAt(Dh),Ce.updateMatrixWorld(),tt.makeTranslation(-Da.x,-Da.y,-Da.z),$f.multiplyMatrices(Ce.projectionMatrix,Ce.matrixWorldInverse),K._frustum.setFromProjectionMatrix($f,Ce.coordinateSystem,Ce.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)i.setRenderTarget(K.map,ge),i.clear();else{ge===0&&(i.setRenderTarget(K.map),i.clear());let Ce=K.getViewport(ge);a.set(r.x*Ce.x,r.y*Ce.y,r.x*Ce.z,r.y*Ce.w),V.viewport(a)}n=K.getFrustum(ge),x(w,b,Le,ae,this.type)}K.isPointLightShadow!==!0&&this.type===cr&&M(K,b),K.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(A,P,O)};function M(y,w){let b=e.update(v);h.defines.VSM_SAMPLES!==y.blurSamples&&(h.defines.VSM_SAMPLES=y.blurSamples,f.defines.VSM_SAMPLES=y.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),y.mapPass===null?y.mapPass=new on(s.x,s.y,{format:Vi,type:zn}):(y.mapPass.width!==y.map.width||y.mapPass.height!==y.map.height)&&y.mapPass.setSize(y.map.width,y.map.height),h.uniforms.shadow_pass.value=y.map.depthTexture,h.uniforms.resolution.value.set(y.map.width,y.map.height),h.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(w,null,b,h,v,null),f.uniforms.shadow_pass.value=y.mapPass.texture,f.uniforms.resolution.value.set(y.map.width,y.map.height),f.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(w,null,b,f,v,null)}function T(y,w,b,A){let P=null,O=b.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(O!==void 0)P=O;else if(P=b.isPointLight===!0?l:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let V=P.uuid,H=w.uuid,k=c[V];k===void 0&&(k={},c[V]=k);let $=k[H];$===void 0&&($=P.clone(),k[H]=$,w.addEventListener("dispose",S)),P=$}if(P.visible=w.visible,P.wireframe=w.wireframe,A===cr?P.side=w.shadowSide!==null?w.shadowSide:w.side:P.side=w.shadowSide!==null?w.shadowSide:d[w.side],P.alphaMap=w.alphaMap,P.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,P.map=w.map,P.clipShadows=w.clipShadows,P.clippingPlanes=w.clippingPlanes,P.clipIntersection=w.clipIntersection,P.displacementMap=w.displacementMap,P.displacementScale=w.displacementScale,P.displacementBias=w.displacementBias,P.wireframeLinewidth=w.wireframeLinewidth,P.linewidth=w.linewidth,b.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let V=i.properties.get(P);V.light=b}return P}function x(y,w,b,A,P){if(y.visible===!1)return;if(y.layers.test(w.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&P===cr)&&(!y.frustumCulled||y.intersectsFrustum(n))){y.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,y.matrixWorld);let H=e.update(y),k=y.material;if(Array.isArray(k)){let $=H.groups;for(let ae=0,K=$.length;ae<K;ae++){let de=$[ae],ce=k[de.materialIndex];if(ce&&ce.visible){let pe=T(y,ce,A,P);y.onBeforeShadow(i,y,w,b,H,pe,de),i.renderBufferDirect(b,null,H,pe,y,de),y.onAfterShadow(i,y,w,b,H,pe,de)}}}else if(k.visible){let $=T(y,k,A,P);y.onBeforeShadow(i,y,w,b,H,$,null),i.renderBufferDirect(b,null,H,$,y,null),y.onAfterShadow(i,y,w,b,H,$,null)}}let V=y.children;for(let H=0,k=V.length;H<k;H++)x(V[H],w,b,A,P)}function S(y){y.target.removeEventListener("dispose",S);for(let b in c){let A=c[b],P=y.target.uuid;P in A&&(A[P].dispose(),delete A[P])}}}function Mv(i,e){function t(){let G=!1,Se=new bt,me=null,ve=new bt(0,0,0,0);return{setMask:function(Me){me!==Me&&!G&&(i.colorMask(Me,Me,Me,Me),me=Me)},setLocked:function(Me){G=Me},setClear:function(Me,be,Ve,ze,Mt){Mt===!0&&(Me*=ze,be*=ze,Ve*=ze),Se.set(Me,be,Ve,ze),ve.equals(Se)===!1&&(i.clearColor(Me,be,Ve,ze),ve.copy(Se))},reset:function(){G=!1,me=null,ve.set(-1,0,0,0)}}}function n(){let G=!1,Se=!1,me=null,ve=null,Me=null;return{setReversed:function(be){if(Se!==be){let Ve=e.get("EXT_clip_control");be?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),Se=be;let ze=Me;Me=null,this.setClear(ze)}},getReversed:function(){return Se},setTest:function(be){be?I(i.DEPTH_TEST):N(i.DEPTH_TEST)},setMask:function(be){me!==be&&!G&&(i.depthMask(be),me=be)},setFunc:function(be){if(Se&&(be=Sf[be]),ve!==be){switch(be){case vo:i.depthFunc(i.NEVER);break;case yo:i.depthFunc(i.ALWAYS);break;case Mo:i.depthFunc(i.LESS);break;case Vs:i.depthFunc(i.LEQUAL);break;case So:i.depthFunc(i.EQUAL);break;case Eo:i.depthFunc(i.GEQUAL);break;case To:i.depthFunc(i.GREATER);break;case wo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=be}},setLocked:function(be){G=be},setClear:function(be){Me!==be&&(Me=be,Se&&(be=1-be),i.clearDepth(be))},reset:function(){G=!1,me=null,ve=null,Me=null,Se=!1}}}function s(){let G=!1,Se=null,me=null,ve=null,Me=null,be=null,Ve=null,ze=null,Mt=null;return{setTest:function(dt){G||(dt?I(i.STENCIL_TEST):N(i.STENCIL_TEST))},setMask:function(dt){Se!==dt&&!G&&(i.stencilMask(dt),Se=dt)},setFunc:function(dt,Cn,Hn){(me!==dt||ve!==Cn||Me!==Hn)&&(i.stencilFunc(dt,Cn,Hn),me=dt,ve=Cn,Me=Hn)},setOp:function(dt,Cn,Hn){(be!==dt||Ve!==Cn||ze!==Hn)&&(i.stencilOp(dt,Cn,Hn),be=dt,Ve=Cn,ze=Hn)},setLocked:function(dt){G=dt},setClear:function(dt){Mt!==dt&&(i.clearStencil(dt),Mt=dt)},reset:function(){G=!1,Se=null,me=null,ve=null,Me=null,be=null,Ve=null,ze=null,Mt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},h={},f=new WeakMap,m=[],v=null,g=!1,p=null,M=null,T=null,x=null,S=null,y=null,w=null,b=new qe(0,0,0),A=0,P=!1,O=null,V=null,H=null,k=null,$=null,ae=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,de=0,ce=i.getParameter(i.VERSION);ce.indexOf("WebGL")!==-1?(de=parseFloat(/^WebGL (\d)/.exec(ce)[1]),K=de>=1):ce.indexOf("OpenGL ES")!==-1&&(de=parseFloat(/^OpenGL ES (\d)/.exec(ce)[1]),K=de>=2);let pe=null,ge={},Le=i.getParameter(i.SCISSOR_BOX),Ce=i.getParameter(i.VIEWPORT),tt=new bt().fromArray(Le),Ke=new bt().fromArray(Ce);function je(G,Se,me,ve){let Me=new Uint8Array(4),be=i.createTexture();i.bindTexture(G,be),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ve=0;Ve<me;Ve++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(Se,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(Se+Ve,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return be}let R={};R[i.TEXTURE_2D]=je(i.TEXTURE_2D,i.TEXTURE_2D,1),R[i.TEXTURE_CUBE_MAP]=je(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),R[i.TEXTURE_2D_ARRAY]=je(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),R[i.TEXTURE_3D]=je(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),I(i.DEPTH_TEST),a.setFunc(Vs),se(!1),z(Ql),I(i.CULL_FACE),j(Qn);function I(G){u[G]!==!0&&(i.enable(G),u[G]=!0)}function N(G){u[G]!==!1&&(i.disable(G),u[G]=!1)}function B(G,Se){return h[G]!==Se?(i.bindFramebuffer(G,Se),h[G]=Se,G===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Se),G===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Se),!0):!1}function L(G,Se){let me=m,ve=!1;if(G){me=f.get(Se),me===void 0&&(me=[],f.set(Se,me));let Me=G.textures;if(me.length!==Me.length||me[0]!==i.COLOR_ATTACHMENT0){for(let be=0,Ve=Me.length;be<Ve;be++)me[be]=i.COLOR_ATTACHMENT0+be;me.length=Me.length,ve=!0}}else me[0]!==i.BACK&&(me[0]=i.BACK,ve=!0);ve&&i.drawBuffers(me)}function Z(G){return v!==G?(i.useProgram(G),v=G,!0):!1}let he={[ms]:i.FUNC_ADD,[Hd]:i.FUNC_SUBTRACT,[Vd]:i.FUNC_REVERSE_SUBTRACT};he[Wd]=i.MIN,he[qd]=i.MAX;let W={[Xd]:i.ZERO,[jd]:i.ONE,[Kd]:i.SRC_COLOR,[sh]:i.SRC_ALPHA,[ef]:i.SRC_ALPHA_SATURATE,[$d]:i.DST_COLOR,[Jd]:i.DST_ALPHA,[Yd]:i.ONE_MINUS_SRC_COLOR,[rh]:i.ONE_MINUS_SRC_ALPHA,[Qd]:i.ONE_MINUS_DST_COLOR,[Zd]:i.ONE_MINUS_DST_ALPHA,[tf]:i.CONSTANT_COLOR,[nf]:i.ONE_MINUS_CONSTANT_COLOR,[sf]:i.CONSTANT_ALPHA,[rf]:i.ONE_MINUS_CONSTANT_ALPHA};function j(G,Se,me,ve,Me,be,Ve,ze,Mt,dt){if(G===Qn){g===!0&&(N(i.BLEND),g=!1);return}if(g===!1&&(I(i.BLEND),g=!0),G!==Gd){if(G!==p||dt!==P){if((M!==ms||S!==ms)&&(i.blendEquation(i.FUNC_ADD),M=ms,S=ms),dt)switch(G){case lr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case th:i.blendFunc(i.ONE,i.ONE);break;case nh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ih:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ye("WebGLState: Invalid blending: ",G);break}else switch(G){case lr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case th:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case nh:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ih:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",G);break}T=null,x=null,y=null,w=null,b.set(0,0,0),A=0,p=G,P=dt}return}Me=Me||Se,be=be||me,Ve=Ve||ve,(Se!==M||Me!==S)&&(i.blendEquationSeparate(he[Se],he[Me]),M=Se,S=Me),(me!==T||ve!==x||be!==y||Ve!==w)&&(i.blendFuncSeparate(W[me],W[ve],W[be],W[Ve]),T=me,x=ve,y=be,w=Ve),(ze.equals(b)===!1||Mt!==A)&&(i.blendColor(ze.r,ze.g,ze.b,Mt),b.copy(ze),A=Mt),p=G,P=!1}function ee(G,Se){G.side===Qt?N(i.CULL_FACE):I(i.CULL_FACE);let me=G.side===zt;Se&&(me=!me),se(me),G.blending===lr&&G.transparent===!1?j(Qn):j(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);let ve=G.stencilWrite;o.setTest(ve),ve&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Y(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?I(i.SAMPLE_ALPHA_TO_COVERAGE):N(i.SAMPLE_ALPHA_TO_COVERAGE)}function se(G){O!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),O=G)}function z(G){G!==kd?(I(i.CULL_FACE),G!==V&&(G===Ql?i.cullFace(i.BACK):G===Bd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):N(i.CULL_FACE),V=G}function ue(G){G!==H&&(K&&i.lineWidth(G),H=G)}function Y(G,Se,me){G?(I(i.POLYGON_OFFSET_FILL),(k!==Se||$!==me)&&(k=Se,$=me,a.getReversed()&&(Se=-Se),i.polygonOffset(Se,me))):N(i.POLYGON_OFFSET_FILL)}function ye(G){G?I(i.SCISSOR_TEST):N(i.SCISSOR_TEST)}function Ne(G){G===void 0&&(G=i.TEXTURE0+ae-1),pe!==G&&(i.activeTexture(G),pe=G)}function D(G,Se,me){me===void 0&&(pe===null?me=i.TEXTURE0+ae-1:me=pe);let ve=ge[me];ve===void 0&&(ve={type:void 0,texture:void 0},ge[me]=ve),(ve.type!==G||ve.texture!==Se)&&(pe!==me&&(i.activeTexture(me),pe=me),i.bindTexture(G,Se||R[G]),ve.type=G,ve.texture=Se)}function Ze(){let G=ge[pe];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function We(){try{i.compressedTexImage2D(...arguments)}catch(G){Ye("WebGLState:",G)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(G){Ye("WebGLState:",G)}}function _(){try{i.texSubImage2D(...arguments)}catch(G){Ye("WebGLState:",G)}}function q(){try{i.texSubImage3D(...arguments)}catch(G){Ye("WebGLState:",G)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(G){Ye("WebGLState:",G)}}function U(){try{i.compressedTexSubImage3D(...arguments)}catch(G){Ye("WebGLState:",G)}}function te(){try{i.texStorage2D(...arguments)}catch(G){Ye("WebGLState:",G)}}function re(){try{i.texStorage3D(...arguments)}catch(G){Ye("WebGLState:",G)}}function Q(){try{i.texImage2D(...arguments)}catch(G){Ye("WebGLState:",G)}}function oe(){try{i.texImage3D(...arguments)}catch(G){Ye("WebGLState:",G)}}function _e(G){return d[G]!==void 0?d[G]:i.getParameter(G)}function Ae(G,Se){d[G]!==Se&&(i.pixelStorei(G,Se),d[G]=Se)}function Ee(G){tt.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),tt.copy(G))}function Te(G){Ke.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),Ke.copy(G))}function De(G,Se){let me=c.get(Se);me===void 0&&(me=new WeakMap,c.set(Se,me));let ve=me.get(G);ve===void 0&&(ve=i.getUniformBlockIndex(Se,G.name),me.set(G,ve))}function Xe(G,Se){let ve=c.get(Se).get(G);l.get(Se)!==ve&&(i.uniformBlockBinding(Se,ve,G.__bindingPointIndex),l.set(Se,ve))}function Ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},pe=null,ge={},h={},f=new WeakMap,m=[],v=null,g=!1,p=null,M=null,T=null,x=null,S=null,y=null,w=null,b=new qe(0,0,0),A=0,P=!1,O=null,V=null,H=null,k=null,$=null,tt.set(0,0,i.canvas.width,i.canvas.height),Ke.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:I,disable:N,bindFramebuffer:B,drawBuffers:L,useProgram:Z,setBlending:j,setMaterial:ee,setFlipSided:se,setCullFace:z,setLineWidth:ue,setPolygonOffset:Y,setScissorTest:ye,activeTexture:Ne,bindTexture:D,unbindTexture:Ze,compressedTexImage2D:We,compressedTexImage3D:C,texImage2D:Q,texImage3D:oe,pixelStorei:Ae,getParameter:_e,updateUBOMapping:De,uniformBlockBinding:Xe,texStorage2D:te,texStorage3D:re,texSubImage2D:_,texSubImage3D:q,compressedTexSubImage2D:J,compressedTexSubImage3D:U,scissor:Ee,viewport:Te,reset:Ue}}function Sv(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new we,u=new WeakMap,d=new Set,h,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,_){return m?new OffscreenCanvas(C,_):Xs("canvas")}function g(C,_,q){let J=1,U=We(C);if((U.width>q||U.height>q)&&(J=q/Math.max(U.width,U.height)),J<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let te=Math.floor(J*U.width),re=Math.floor(J*U.height);h===void 0&&(h=v(te,re));let Q=_?v(te,re):h;return Q.width=te,Q.height=re,Q.getContext("2d").drawImage(C,0,0,te,re),He("WebGLRenderer: Texture has been resized from ("+U.width+"x"+U.height+") to ("+te+"x"+re+")."),Q}else return"data"in C&&He("WebGLRenderer: Image in DataTexture is too big ("+U.width+"x"+U.height+")."),C;return C}function p(C){return C.generateMipmaps}function M(C){i.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(C,_,q,J,U,te=!1){if(C!==null){if(i[C]!==void 0)return i[C];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let re;J&&(re=e.get("EXT_texture_norm16"),re||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=_;if(_===i.RED&&(q===i.FLOAT&&(Q=i.R32F),q===i.HALF_FLOAT&&(Q=i.R16F),q===i.UNSIGNED_BYTE&&(Q=i.R8),q===i.UNSIGNED_SHORT&&re&&(Q=re.R16_EXT),q===i.SHORT&&re&&(Q=re.R16_SNORM_EXT)),_===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(Q=i.R8UI),q===i.UNSIGNED_SHORT&&(Q=i.R16UI),q===i.UNSIGNED_INT&&(Q=i.R32UI),q===i.BYTE&&(Q=i.R8I),q===i.SHORT&&(Q=i.R16I),q===i.INT&&(Q=i.R32I)),_===i.RG&&(q===i.FLOAT&&(Q=i.RG32F),q===i.HALF_FLOAT&&(Q=i.RG16F),q===i.UNSIGNED_BYTE&&(Q=i.RG8),q===i.UNSIGNED_SHORT&&re&&(Q=re.RG16_EXT),q===i.SHORT&&re&&(Q=re.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(Q=i.RG8UI),q===i.UNSIGNED_SHORT&&(Q=i.RG16UI),q===i.UNSIGNED_INT&&(Q=i.RG32UI),q===i.BYTE&&(Q=i.RG8I),q===i.SHORT&&(Q=i.RG16I),q===i.INT&&(Q=i.RG32I)),_===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),q===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),q===i.UNSIGNED_INT&&(Q=i.RGB32UI),q===i.BYTE&&(Q=i.RGB8I),q===i.SHORT&&(Q=i.RGB16I),q===i.INT&&(Q=i.RGB32I)),_===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),q===i.UNSIGNED_INT&&(Q=i.RGBA32UI),q===i.BYTE&&(Q=i.RGBA8I),q===i.SHORT&&(Q=i.RGBA16I),q===i.INT&&(Q=i.RGBA32I)),_===i.RGB&&(q===i.UNSIGNED_SHORT&&re&&(Q=re.RGB16_EXT),q===i.SHORT&&re&&(Q=re.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),_===i.RGBA){let oe=te?Hr:st.getTransfer(U);q===i.FLOAT&&(Q=i.RGBA32F),q===i.HALF_FLOAT&&(Q=i.RGBA16F),q===i.UNSIGNED_BYTE&&(Q=oe===pt?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&re&&(Q=re.RGBA16_EXT),q===i.SHORT&&re&&(Q=re.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function S(C,_){let q;return C?_===null||_===Bn||_===dr?q=i.DEPTH24_STENCIL8:_===mn?q=i.DEPTH32F_STENCIL8:_===ur&&(q=i.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Bn||_===dr?q=i.DEPTH_COMPONENT24:_===mn?q=i.DEPTH_COMPONENT32F:_===ur&&(q=i.DEPTH_COMPONENT16),q}function y(C,_){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Lt&&C.minFilter!==Dt?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function w(C){let _=C.target;_.removeEventListener("dispose",w),A(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&d.delete(_)}function b(C){let _=C.target;_.removeEventListener("dispose",b),O(_)}function A(C){let _=n.get(C);if(_.__webglInit===void 0)return;let q=C.source,J=f.get(q);if(J){let U=J[_.__cacheKey];U.usedTimes--,U.usedTimes===0&&P(C),Object.keys(J).length===0&&f.delete(q)}n.remove(C)}function P(C){let _=n.get(C);i.deleteTexture(_.__webglTexture);let q=C.source,J=f.get(q);delete J[_.__cacheKey],a.memory.textures--}function O(C){let _=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(_.__webglFramebuffer[J]))for(let U=0;U<_.__webglFramebuffer[J].length;U++)i.deleteFramebuffer(_.__webglFramebuffer[J][U]);else i.deleteFramebuffer(_.__webglFramebuffer[J]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[J])}else{if(Array.isArray(_.__webglFramebuffer))for(let J=0;J<_.__webglFramebuffer.length;J++)i.deleteFramebuffer(_.__webglFramebuffer[J]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let J=0;J<_.__webglColorRenderbuffer.length;J++)_.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[J]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let q=C.textures;for(let J=0,U=q.length;J<U;J++){let te=n.get(q[J]);te.__webglTexture&&(i.deleteTexture(te.__webglTexture),a.memory.textures--),n.remove(q[J])}n.remove(C)}let V=0;function H(){V=0}function k(){return V}function $(C){V=C}function ae(){let C=V;return C>=s.maxTextures&&He("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),V+=1,C}function K(C){let _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function de(C,_){let q=n.get(C);if(C.isVideoTexture&&D(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&q.__version!==C.version){let J=C.image;if(J===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{N(q,C,_);return}}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+_)}function ce(C,_){let q=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){N(q,C,_);return}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+_)}function pe(C,_){let q=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){N(q,C,_);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+_)}function ge(C,_){let q=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&q.__version!==C.version){B(q,C,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+_)}let Le={[Xn]:i.REPEAT,[Mn]:i.CLAMP_TO_EDGE,[Ws]:i.MIRRORED_REPEAT},Ce={[Lt]:i.NEAREST,[ec]:i.NEAREST_MIPMAP_NEAREST,[bs]:i.NEAREST_MIPMAP_LINEAR,[Dt]:i.LINEAR,[hr]:i.LINEAR_MIPMAP_NEAREST,[kn]:i.LINEAR_MIPMAP_LINEAR},tt={[pf]:i.NEVER,[_f]:i.ALWAYS,[mf]:i.LESS,[Gc]:i.LEQUAL,[gf]:i.EQUAL,[Hc]:i.GEQUAL,[bf]:i.GREATER,[xf]:i.NOTEQUAL};function Ke(C,_){if(_.type===mn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Dt||_.magFilter===hr||_.magFilter===bs||_.magFilter===kn||_.minFilter===Dt||_.minFilter===hr||_.minFilter===bs||_.minFilter===kn)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,Le[_.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,Le[_.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,Le[_.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Ce[_.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Ce[_.minFilter]),_.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,tt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Lt||_.minFilter!==bs&&_.minFilter!==kn||_.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function je(C,_){let q=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",w));let J=_.source,U=f.get(J);U===void 0&&(U={},f.set(J,U));let te=K(_);if(te!==C.__cacheKey){U[te]===void 0&&(U[te]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),U[te].usedTimes++;let re=U[C.__cacheKey];re!==void 0&&(U[C.__cacheKey].usedTimes--,re.usedTimes===0&&P(_)),C.__cacheKey=te,C.__webglTexture=U[te].texture}return q}function R(C,_,q){return Math.floor(Math.floor(C/q)/_)}function I(C,_,q,J){let te=C.updateRanges;if(te.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,q,J,_.data);else{te.sort((Ae,Ee)=>Ae.start-Ee.start);let re=0;for(let Ae=1;Ae<te.length;Ae++){let Ee=te[re],Te=te[Ae],De=Ee.start+Ee.count,Xe=R(Te.start,_.width,4),Ue=R(Ee.start,_.width,4);Te.start<=De+1&&Xe===Ue&&R(Te.start+Te.count-1,_.width,4)===Xe?Ee.count=Math.max(Ee.count,Te.start+Te.count-Ee.start):(++re,te[re]=Te)}te.length=re+1;let Q=t.getParameter(i.UNPACK_ROW_LENGTH),oe=t.getParameter(i.UNPACK_SKIP_PIXELS),_e=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Ae=0,Ee=te.length;Ae<Ee;Ae++){let Te=te[Ae],De=Math.floor(Te.start/4),Xe=Math.ceil(Te.count/4),Ue=De%_.width,G=Math.floor(De/_.width),Se=Xe,me=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),t.pixelStorei(i.UNPACK_SKIP_ROWS,G),t.texSubImage2D(i.TEXTURE_2D,0,Ue,G,Se,me,q,J,_.data)}C.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,oe),t.pixelStorei(i.UNPACK_SKIP_ROWS,_e)}}function N(C,_,q){let J=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(J=i.TEXTURE_3D);let U=je(C,_),te=_.source;t.bindTexture(J,C.__webglTexture,i.TEXTURE0+q);let re=n.get(te);if(te.version!==re.__version||U===!0){if(t.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let me=st.getPrimaries(st.workingColorSpace),ve=_.colorSpace===vi?null:st.getPrimaries(_.colorSpace),Me=_.colorSpace===vi||me===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let oe=g(_.image,!1,s.maxTextureSize);oe=Ze(_,oe);let _e=r.convert(_.format,_.colorSpace),Ae=r.convert(_.type),Ee=x(_.internalFormat,_e,Ae,_.normalized,_.colorSpace,_.isVideoTexture);Ke(J,_);let Te,De=_.mipmaps,Xe=_.isVideoTexture!==!0,Ue=re.__version===void 0||U===!0,G=te.dataReady,Se=y(_,oe);if(_.isDepthTexture)Ee=S(_.format===Hi,_.type),Ue&&(Xe?t.texStorage2D(i.TEXTURE_2D,1,Ee,oe.width,oe.height):t.texImage2D(i.TEXTURE_2D,0,Ee,oe.width,oe.height,0,_e,Ae,null));else if(_.isDataTexture)if(De.length>0){Xe&&Ue&&t.texStorage2D(i.TEXTURE_2D,Se,Ee,De[0].width,De[0].height);for(let me=0,ve=De.length;me<ve;me++)Te=De[me],Xe?G&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,Te.width,Te.height,_e,Ae,Te.data):t.texImage2D(i.TEXTURE_2D,me,Ee,Te.width,Te.height,0,_e,Ae,Te.data);_.generateMipmaps=!1}else Xe?(Ue&&t.texStorage2D(i.TEXTURE_2D,Se,Ee,oe.width,oe.height),G&&I(_,oe,_e,Ae)):t.texImage2D(i.TEXTURE_2D,0,Ee,oe.width,oe.height,0,_e,Ae,oe.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Xe&&Ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ee,De[0].width,De[0].height,oe.depth);for(let me=0,ve=De.length;me<ve;me++)if(Te=De[me],_.format!==gn)if(_e!==null)if(Xe){if(G)if(_.layerUpdates.size>0){let Me=Ah(Te.width,Te.height,_.format,_.type);for(let be of _.layerUpdates){let Ve=Te.data.subarray(be*Me/Te.data.BYTES_PER_ELEMENT,(be+1)*Me/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,be,Te.width,Te.height,1,_e,Ve)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,0,Te.width,Te.height,oe.depth,_e,Te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,me,Ee,Te.width,Te.height,oe.depth,0,Te.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xe?G&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,0,Te.width,Te.height,oe.depth,_e,Ae,Te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,me,Ee,Te.width,Te.height,oe.depth,0,_e,Ae,Te.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Xe&&Ue&&t.texStorage2D(i.TEXTURE_2D,Se,Ee,De[0].width,De[0].height);for(let me=0,ve=De.length;me<ve;me++)Te=De[me],_.format!==gn?_e!==null?Xe?G&&t.compressedTexSubImage2D(i.TEXTURE_2D,me,0,0,Te.width,Te.height,_e,Te.data):t.compressedTexImage2D(i.TEXTURE_2D,me,Ee,Te.width,Te.height,0,Te.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?G&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,Te.width,Te.height,_e,Ae,Te.data):t.texImage2D(i.TEXTURE_2D,me,Ee,Te.width,Te.height,0,_e,Ae,Te.data)}else if(_.isDataArrayTexture)if(Xe){if(Ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ee,oe.width,oe.height,oe.depth),G)if(_.layerUpdates.size>0){let me=Ah(oe.width,oe.height,_.format,_.type);for(let ve of _.layerUpdates){let Me=oe.data.subarray(ve*me/oe.data.BYTES_PER_ELEMENT,(ve+1)*me/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ve,oe.width,oe.height,1,_e,Ae,Me)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,_e,Ae,oe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,oe.width,oe.height,oe.depth,0,_e,Ae,oe.data);else if(_.isData3DTexture)Xe?(Ue&&t.texStorage3D(i.TEXTURE_3D,Se,Ee,oe.width,oe.height,oe.depth),G&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,_e,Ae,oe.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,oe.width,oe.height,oe.depth,0,_e,Ae,oe.data);else if(_.isFramebufferTexture){if(Ue)if(Xe)t.texStorage2D(i.TEXTURE_2D,Se,Ee,oe.width,oe.height);else{let me=oe.width,ve=oe.height;for(let Me=0;Me<Se;Me++)t.texImage2D(i.TEXTURE_2D,Me,Ee,me,ve,0,_e,Ae,null),me>>=1,ve>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let me=i.canvas;if(me.hasAttribute("layoutsubtree")||me.setAttribute("layoutsubtree","true"),oe.parentNode!==me){me.appendChild(oe),d.add(_),me.onpaint=ve=>{let Me=ve.changedElements;for(let be of d)Me.includes(be.image)&&(be.needsUpdate=!0)},me.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,oe);else{let Me=i.RGBA,be=i.RGBA,Ve=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Me,be,Ve,oe)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(De.length>0){if(Xe&&Ue){let me=We(De[0]);t.texStorage2D(i.TEXTURE_2D,Se,Ee,me.width,me.height)}for(let me=0,ve=De.length;me<ve;me++)Te=De[me],Xe?G&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,_e,Ae,Te):t.texImage2D(i.TEXTURE_2D,me,Ee,_e,Ae,Te);_.generateMipmaps=!1}else if(Xe){if(Ue){let me=We(oe);t.texStorage2D(i.TEXTURE_2D,Se,Ee,me.width,me.height)}G&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e,Ae,oe)}else t.texImage2D(i.TEXTURE_2D,0,Ee,_e,Ae,oe);p(_)&&M(J),re.__version=te.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function B(C,_,q){if(_.image.length!==6)return;let J=je(C,_),U=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+q);let te=n.get(U);if(U.version!==te.__version||J===!0){t.activeTexture(i.TEXTURE0+q);let re=st.getPrimaries(st.workingColorSpace),Q=_.colorSpace===vi?null:st.getPrimaries(_.colorSpace),oe=_.colorSpace===vi||re===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let _e=_.isCompressedTexture||_.image[0].isCompressedTexture,Ae=_.image[0]&&_.image[0].isDataTexture,Ee=[];for(let be=0;be<6;be++)!_e&&!Ae?Ee[be]=g(_.image[be],!0,s.maxCubemapSize):Ee[be]=Ae?_.image[be].image:_.image[be],Ee[be]=Ze(_,Ee[be]);let Te=Ee[0],De=r.convert(_.format,_.colorSpace),Xe=r.convert(_.type),Ue=x(_.internalFormat,De,Xe,_.normalized,_.colorSpace),G=_.isVideoTexture!==!0,Se=te.__version===void 0||J===!0,me=U.dataReady,ve=y(_,Te);Ke(i.TEXTURE_CUBE_MAP,_);let Me;if(_e){G&&Se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ue,Te.width,Te.height);for(let be=0;be<6;be++){Me=Ee[be].mipmaps;for(let Ve=0;Ve<Me.length;Ve++){let ze=Me[Ve];_.format!==gn?De!==null?G?me&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ve,0,0,ze.width,ze.height,De,ze.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ve,Ue,ze.width,ze.height,0,ze.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ve,0,0,ze.width,ze.height,De,Xe,ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ve,Ue,ze.width,ze.height,0,De,Xe,ze.data)}}}else{if(Me=_.mipmaps,G&&Se){Me.length>0&&ve++;let be=We(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ue,be.width,be.height)}for(let be=0;be<6;be++)if(Ae){G?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,Ee[be].width,Ee[be].height,De,Xe,Ee[be].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Ue,Ee[be].width,Ee[be].height,0,De,Xe,Ee[be].data);for(let Ve=0;Ve<Me.length;Ve++){let Mt=Me[Ve].image[be].image;G?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ve+1,0,0,Mt.width,Mt.height,De,Xe,Mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ve+1,Ue,Mt.width,Mt.height,0,De,Xe,Mt.data)}}else{G?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,De,Xe,Ee[be]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Ue,De,Xe,Ee[be]);for(let Ve=0;Ve<Me.length;Ve++){let ze=Me[Ve];G?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ve+1,0,0,De,Xe,ze.image[be]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Ve+1,Ue,De,Xe,ze.image[be])}}}p(_)&&M(i.TEXTURE_CUBE_MAP),te.__version=U.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function L(C,_,q,J,U,te){let re=r.convert(q.format,q.colorSpace),Q=r.convert(q.type),oe=x(q.internalFormat,re,Q,q.normalized,q.colorSpace),_e=n.get(_),Ae=n.get(q);if(Ae.__renderTarget=_,!_e.__hasExternalTextures){let Ee=Math.max(1,_.width>>te),Te=Math.max(1,_.height>>te);U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?t.texImage3D(U,te,oe,Ee,Te,_.depth,0,re,Q,null):t.texImage2D(U,te,oe,Ee,Te,0,re,Q,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Ne(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,U,Ae.__webglTexture,0,ye(_)):(U===i.TEXTURE_2D||U>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&U<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,U,Ae.__webglTexture,te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Z(C,_,q){if(i.bindRenderbuffer(i.RENDERBUFFER,C),_.depthBuffer){let J=_.depthTexture,U=J&&J.isDepthTexture?J.type:null,te=S(_.stencilBuffer,U),re=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ne(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye(_),te,_.width,_.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye(_),te,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,te,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,C)}else{let J=_.textures;for(let U=0;U<J.length;U++){let te=J[U],re=r.convert(te.format,te.colorSpace),Q=r.convert(te.type),oe=x(te.internalFormat,re,Q,te.normalized,te.colorSpace);Ne(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye(_),oe,_.width,_.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye(_),oe,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,oe,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function he(C,_,q){let J=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let U=n.get(_.depthTexture);if(U.__renderTarget=_,(!U.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),J){if(U.__webglInit===void 0&&(U.__webglInit=!0,_.depthTexture.addEventListener("dispose",w)),U.__webglTexture===void 0){U.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture),Ke(i.TEXTURE_CUBE_MAP,_.depthTexture);let _e=r.convert(_.depthTexture.format),Ae=r.convert(_.depthTexture.type),Ee;_.depthTexture.format===jn?Ee=i.DEPTH_COMPONENT24:_.depthTexture.format===Hi&&(Ee=i.DEPTH24_STENCIL8);for(let Te=0;Te<6;Te++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Ee,_.width,_.height,0,_e,Ae,null)}}else de(_.depthTexture,0);let te=U.__webglTexture,re=ye(_),Q=J?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,oe=_.depthTexture.format===Hi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===jn)Ne(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,oe,Q,te,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,oe,Q,te,0);else if(_.depthTexture.format===Hi)Ne(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,oe,Q,te,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,oe,Q,te,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function W(C){let _=n.get(C),q=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){let J=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),J){let U=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,J.removeEventListener("dispose",U)};J.addEventListener("dispose",U),_.__depthDisposeCallback=U}_.__boundDepthTexture=J}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(q)for(let J=0;J<6;J++)he(_.__webglFramebuffer[J],C,J);else{let J=C.texture.mipmaps;J&&J.length>0?he(_.__webglFramebuffer[0],C,0):he(_.__webglFramebuffer,C,0)}else if(q){_.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[J]),_.__webglDepthbuffer[J]===void 0)_.__webglDepthbuffer[J]=i.createRenderbuffer(),Z(_.__webglDepthbuffer[J],C,!1);else{let U=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=_.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,U,i.RENDERBUFFER,te)}}else{let J=C.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Z(_.__webglDepthbuffer,C,!1);else{let U=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,U,i.RENDERBUFFER,te)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function j(C,_,q){let J=n.get(C);_!==void 0&&L(J.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&W(C)}function ee(C){let _=C.texture,q=n.get(C),J=n.get(_);C.addEventListener("dispose",b);let U=C.textures,te=C.isWebGLCubeRenderTarget===!0,re=U.length>1;if(re||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=_.version,a.memory.textures++),te){q.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0){q.__webglFramebuffer[Q]=[];for(let oe=0;oe<_.mipmaps.length;oe++)q.__webglFramebuffer[Q][oe]=i.createFramebuffer()}else q.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){q.__webglFramebuffer=[];for(let Q=0;Q<_.mipmaps.length;Q++)q.__webglFramebuffer[Q]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(re)for(let Q=0,oe=U.length;Q<oe;Q++){let _e=n.get(U[Q]);_e.__webglTexture===void 0&&(_e.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Ne(C)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let Q=0;Q<U.length;Q++){let oe=U[Q];q.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[Q]);let _e=r.convert(oe.format,oe.colorSpace),Ae=r.convert(oe.type),Ee=x(oe.internalFormat,_e,Ae,oe.normalized,oe.colorSpace,C.isXRRenderTarget===!0),Te=ye(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,Ee,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,q.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),Z(q.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(te){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Ke(i.TEXTURE_CUBE_MAP,_);for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0)for(let oe=0;oe<_.mipmaps.length;oe++)L(q.__webglFramebuffer[Q][oe],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,oe);else L(q.__webglFramebuffer[Q],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(_)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){for(let Q=0,oe=U.length;Q<oe;Q++){let _e=U[Q],Ae=n.get(_e),Ee=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Ee=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ee,Ae.__webglTexture),Ke(Ee,_e),L(q.__webglFramebuffer,C,_e,i.COLOR_ATTACHMENT0+Q,Ee,0),p(_e)&&M(Ee)}t.unbindTexture()}else{let Q=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Q=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,J.__webglTexture),Ke(Q,_),_.mipmaps&&_.mipmaps.length>0)for(let oe=0;oe<_.mipmaps.length;oe++)L(q.__webglFramebuffer[oe],C,_,i.COLOR_ATTACHMENT0,Q,oe);else L(q.__webglFramebuffer,C,_,i.COLOR_ATTACHMENT0,Q,0);p(_)&&M(Q),t.unbindTexture()}C.depthBuffer&&W(C)}function se(C){let _=C.textures;for(let q=0,J=_.length;q<J;q++){let U=_[q];if(p(U)){let te=T(C),re=n.get(U).__webglTexture;t.bindTexture(te,re),M(te),t.unbindTexture()}}}let z=[],ue=[];function Y(C){if(C.samples>0){if(Ne(C)===!1){let _=C.textures,q=C.width,J=C.height,U=i.COLOR_BUFFER_BIT,te=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=n.get(C),Q=_.length>1;if(Q)for(let _e=0;_e<_.length;_e++)t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);let oe=C.texture.mipmaps;oe&&oe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let _e=0;_e<_.length;_e++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(U|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(U|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,re.__webglColorRenderbuffer[_e]);let Ae=n.get(_[_e]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ae,0)}i.blitFramebuffer(0,0,q,J,0,0,q,J,U,i.NEAREST),l===!0&&(z.length=0,ue.length=0,z.push(i.COLOR_ATTACHMENT0+_e),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(z.push(te),ue.push(te),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ue)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,z))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let _e=0;_e<_.length;_e++){t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,re.__webglColorRenderbuffer[_e]);let Ae=n.get(_[_e]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,Ae,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let _=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ye(C){return Math.min(s.maxSamples,C.samples)}function Ne(C){let _=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function D(C){let _=a.render.frame;u.get(C)!==_&&(u.set(C,_),C.update())}function Ze(C,_){let q=C.colorSpace,J=C.format,U=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||q!==sn&&q!==vi&&(st.getTransfer(q)===pt?(J!==gn||U!==hn)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",q)),_}function We(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=ae,this.resetTextureUnits=H,this.getTextureUnits=k,this.setTextureUnits=$,this.setTexture2D=de,this.setTexture2DArray=ce,this.setTexture3D=pe,this.setTextureCube=ge,this.rebindTextures=j,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=W,this.setupFrameBufferTexture=L,this.useMultisampledRTT=Ne,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Ev(i,e){function t(n,s=vi){let r,a=st.getTransfer(s);if(n===hn)return i.UNSIGNED_BYTE;if(n===nc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ic)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===fh)return i.BYTE;if(n===ph)return i.SHORT;if(n===ur)return i.UNSIGNED_SHORT;if(n===tc)return i.INT;if(n===Bn)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===zn)return i.HALF_FLOAT;if(n===bh)return i.ALPHA;if(n===xh)return i.RGB;if(n===gn)return i.RGBA;if(n===jn)return i.DEPTH_COMPONENT;if(n===Hi)return i.DEPTH_STENCIL;if(n===sc)return i.RED;if(n===rc)return i.RED_INTEGER;if(n===Vi)return i.RG;if(n===ac)return i.RG_INTEGER;if(n===oc)return i.RGBA_INTEGER;if(n===Sa||n===Ea||n===Ta||n===wa)if(a===pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===cc||n===lc||n===hc||n===uc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===cc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===lc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===hc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===uc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===dc||n===fc||n===pc||n===mc||n===gc||n===Aa||n===bc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===dc||n===fc)return a===pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===pc)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===mc)return r.COMPRESSED_R11_EAC;if(n===gc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Aa)return r.COMPRESSED_RG11_EAC;if(n===bc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===xc||n===_c||n===vc||n===yc||n===Mc||n===Sc||n===Ec||n===Tc||n===wc||n===Ac||n===Rc||n===Cc||n===Pc||n===Ic)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===xc)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_c)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===vc)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yc)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Mc)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Sc)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ec)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Tc)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wc)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ac)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Rc)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Cc)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pc)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ic)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Lc||n===Dc||n===Nc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Lc)return a===pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Dc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Nc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fc||n===Uc||n===Ra||n===Oc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Uc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ra)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===dr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Tv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wv=`
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

}`,Gh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ea(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new $t({vertexShader:Tv,fragmentShader:wv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new En(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Hh=class extends Un{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,m=null,v=typeof XRWebGLBinding<"u",g=new Gh,p={},M=t.getContextAttributes(),T=null,x=null,S=[],y=[],w=new we,b=null,A=null,P=new Ot;P.viewport=new bt;let O=new Ot;O.viewport=new bt;let V=[P,O],H=new Ko,k=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(R){let I=S[R];return I===void 0&&(I=new Ys,S[R]=I),I.getTargetRaySpace()},this.getControllerGrip=function(R){let I=S[R];return I===void 0&&(I=new Ys,S[R]=I),I.getGripSpace()},this.getHand=function(R){let I=S[R];return I===void 0&&(I=new Ys,S[R]=I),I.getHandSpace()};function ae(R){let I=y.indexOf(R.inputSource);if(I===-1)return;let N=S[I];N!==void 0&&(N.update(R.inputSource,R.frame,c||a),N.dispatchEvent({type:R.type,data:R.inputSource}))}function K(){s.removeEventListener("select",ae),s.removeEventListener("selectstart",ae),s.removeEventListener("selectend",ae),s.removeEventListener("squeeze",ae),s.removeEventListener("squeezestart",ae),s.removeEventListener("squeezeend",ae),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",de);for(let R=0;R<S.length;R++){let I=y[R];I!==null&&(y[R]=null,S[R].disconnect(I))}k=null,$=null,g.reset();for(let R in p)delete p[R];if(e.setRenderTarget(T),f=null,h=null,d=null,s=null,x=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(w.width,w.height,!1),A!==null){let R=A.camera;R.fov=A.fov,R.zoom=A.zoom,R.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(R){r=R,n.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(R){o=R,n.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(R){c=R},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(R){if(s=R,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",ae),s.addEventListener("selectstart",ae),s.addEventListener("selectend",ae),s.addEventListener("squeeze",ae),s.addEventListener("squeezestart",ae),s.addEventListener("squeezeend",ae),s.addEventListener("end",K),s.addEventListener("inputsourceschange",de),M.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(w),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let N=null,B=null,L=null;M.depth&&(L=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,N=M.stencil?Hi:jn,B=M.stencil?dr:Bn);let Z={colorFormat:t.RGBA8,depthFormat:L,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Z),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new on(h.textureWidth,h.textureHeight,{format:gn,type:hn,depthTexture:new Fi(h.textureWidth,h.textureHeight,B,void 0,void 0,void 0,void 0,void 0,void 0,N),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let N={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,N),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new on(f.framebufferWidth,f.framebufferHeight,{format:gn,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),je.setContext(s),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function de(R){for(let I=0;I<R.removed.length;I++){let N=R.removed[I],B=y.indexOf(N);B>=0&&(y[B]=null,S[B].disconnect(N))}for(let I=0;I<R.added.length;I++){let N=R.added[I],B=y.indexOf(N);if(B===-1){for(let Z=0;Z<S.length;Z++)if(Z>=y.length){y.push(N),B=Z;break}else if(y[Z]===null){y[Z]=N,B=Z;break}if(B===-1)break}let L=S[B];L&&L.connect(N)}}let ce=new F,pe=new F;function ge(R,I,N){ce.setFromMatrixPosition(I.matrixWorld),pe.setFromMatrixPosition(N.matrixWorld);let B=ce.distanceTo(pe),L=I.projectionMatrix.elements,Z=N.projectionMatrix.elements,he=L[14]/(L[10]-1),W=L[14]/(L[10]+1),j=(L[9]+1)/L[5],ee=(L[9]-1)/L[5],se=(L[8]-1)/L[0],z=(Z[8]+1)/Z[0],ue=he*se,Y=he*z,ye=B/(-se+z),Ne=ye*-se;if(I.matrixWorld.decompose(R.position,R.quaternion,R.scale),R.translateX(Ne),R.translateZ(ye),R.matrixWorld.compose(R.position,R.quaternion,R.scale),R.matrixWorldInverse.copy(R.matrixWorld).invert(),L[10]===-1)R.projectionMatrix.copy(I.projectionMatrix),R.projectionMatrixInverse.copy(I.projectionMatrixInverse);else{let D=he+ye,Ze=W+ye,We=ue-Ne,C=Y+(B-Ne),_=j*W/Ze*D,q=ee*W/Ze*D;R.projectionMatrix.makePerspective(We,C,_,q,D,Ze),R.projectionMatrixInverse.copy(R.projectionMatrix).invert()}}function Le(R,I){I===null?R.matrixWorld.copy(R.matrix):R.matrixWorld.multiplyMatrices(I.matrixWorld,R.matrix),R.matrixWorldInverse.copy(R.matrixWorld).invert()}this.updateCamera=function(R){if(s===null)return;let I=R.near,N=R.far;g.texture!==null&&(g.depthNear>0&&(I=g.depthNear),g.depthFar>0&&(N=g.depthFar)),H.near=O.near=P.near=I,H.far=O.far=P.far=N,(k!==H.near||$!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),k=H.near,$=H.far),H.layers.mask=R.layers.mask|6,P.layers.mask=H.layers.mask&-5,O.layers.mask=H.layers.mask&-3;let B=R.parent,L=H.cameras;Le(H,B);for(let Z=0;Z<L.length;Z++)Le(L[Z],B);L.length===2?ge(H,P,O):H.projectionMatrix.copy(P.projectionMatrix),A===null&&R.isPerspectiveCamera&&(A={camera:R,fov:R.fov,zoom:R.zoom}),Ce(R,H,B)};function Ce(R,I,N){N===null?R.matrix.copy(I.matrixWorld):(R.matrix.copy(N.matrixWorld),R.matrix.invert(),R.matrix.multiply(I.matrixWorld)),R.matrix.decompose(R.position,R.quaternion,R.scale),R.updateMatrixWorld(!0),R.projectionMatrix.copy(I.projectionMatrix),R.projectionMatrixInverse.copy(I.projectionMatrixInverse),R.isPerspectiveCamera&&(R.fov=rs*2*Math.atan(1/R.projectionMatrix.elements[5]),R.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(R){l=R,h!==null&&(h.fixedFoveation=R),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=R)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(H)},this.getCameraTexture=function(R){return p[R]};let tt=null;function Ke(R,I){if(u=I.getViewerPose(c||a),m=I,u!==null){let N=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let B=!1;N.length!==H.cameras.length&&(H.cameras.length=0,B=!0);for(let W=0;W<N.length;W++){let j=N[W],ee=null;if(f!==null)ee=f.getViewport(j);else{let z=d.getViewSubImage(h,j);ee=z.viewport,W===0&&(e.setRenderTargetTextures(x,z.colorTexture,z.depthStencilTexture),e.setRenderTarget(x))}let se=V[W];se===void 0&&(se=new Ot,se.layers.enable(W),se.viewport=new bt,V[W]=se),se.matrix.fromArray(j.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(j.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(ee.x,ee.y,ee.width,ee.height),W===0&&(H.matrix.copy(se.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),B===!0&&H.cameras.push(se)}let L=s.enabledFeatures;if(L&&L.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();let W=d.getDepthInformation(N[0]);W&&W.isValid&&W.texture&&g.init(W,s.renderState)}if(L&&L.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let W=0;W<N.length;W++){let j=N[W].camera;if(j){let ee=p[j];ee||(ee=new ea,p[j]=ee);let se=d.getCameraImage(j);ee.sourceTexture=se}}}}for(let N=0;N<S.length;N++){let B=y[N],L=S[N];B!==null&&L!==void 0&&L.update(B,I,c||a)}tt&&tt(R,I),I.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:I}),m=null}let je=new Qf;je.setAnimationLoop(Ke),this.setAnimationLoop=function(R){tt=R},this.dispose=function(){}}},Av=new et,rp=new $e;rp.set(-1,0,0,0,1,0,0,0,1);function Rv(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Eh(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,T,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,M,T):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===zt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===zt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let M=e.get(p),T=M.envMap,x=M.envMapRotation;T&&(g.envMap.value=T,g.envMapRotation.value.setFromMatrix4(Av.makeRotationFromEuler(x)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(rp),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,M,T){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=T*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===zt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){let M=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Cv(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,S){let y=S.program;n.uniformBlockBinding(x,y)}function c(x,S){let y=s[x.id];y===void 0&&(g(x),y=u(x),s[x.id]=y,x.addEventListener("dispose",M));let w=S.program;n.updateUBOMapping(x,w);let b=e.render.frame;r[x.id]!==b&&(h(x),r[x.id]=b)}function u(x){let S=d();x.__bindingPointIndex=S;let y=i.createBuffer(),w=x.__size,b=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,w,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,y),y}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ye("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){let S=s[x.id],y=x.uniforms,w=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let b=0,A=y.length;b<A;b++){let P=y[b];if(Array.isArray(P))for(let O=0,V=P.length;O<V;O++)f(P[O],b,O,w);else f(P,b,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,S,y,w){if(v(x,S,y,w)===!0){let b=x.__offset,A=x.value;if(Array.isArray(A)){let P=0;for(let O=0;O<A.length;O++){let V=A[O],H=p(V);m(V,x.__data,P),typeof V!="number"&&typeof V!="boolean"&&!V.isMatrix3&&!ArrayBuffer.isView(V)&&(P+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(A,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,b,x.__data)}}function m(x,S,y){typeof x=="number"||typeof x=="boolean"?S[0]=x:x.isMatrix3?(S[0]=x.elements[0],S[1]=x.elements[1],S[2]=x.elements[2],S[3]=0,S[4]=x.elements[3],S[5]=x.elements[4],S[6]=x.elements[5],S[7]=0,S[8]=x.elements[6],S[9]=x.elements[7],S[10]=x.elements[8],S[11]=0):ArrayBuffer.isView(x)?S.set(new x.constructor(x.buffer,x.byteOffset,S.length)):x.toArray(S,y)}function v(x,S,y,w){let b=x.value,A=S+"_"+y;if(w[A]===void 0)return typeof b=="number"||typeof b=="boolean"?w[A]=b:ArrayBuffer.isView(b)?w[A]=b.slice():w[A]=b.clone(),!0;{let P=w[A];if(typeof b=="number"||typeof b=="boolean"){if(P!==b)return w[A]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(P.equals(b)===!1)return P.copy(b),!0}}return!1}function g(x){let S=x.uniforms,y=0,w=16;for(let A=0,P=S.length;A<P;A++){let O=Array.isArray(S[A])?S[A]:[S[A]];for(let V=0,H=O.length;V<H;V++){let k=O[V],$=Array.isArray(k.value)?k.value:[k.value];for(let ae=0,K=$.length;ae<K;ae++){let de=$[ae],ce=p(de),pe=y%w,ge=pe%ce.boundary,Le=pe+ge;y+=ge,Le!==0&&w-Le<ce.storage&&(y+=w-Le),k.__data=new Float32Array(ce.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=ce.storage}}}let b=y%w;return b>0&&(y+=w-b),x.__size=y,x.__cache={},this}function p(x){let S={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(S.boundary=4,S.storage=4):x.isVector2?(S.boundary=8,S.storage=8):x.isVector3||x.isColor?(S.boundary=16,S.storage=12):x.isVector4?(S.boundary=16,S.storage=16):x.isMatrix3?(S.boundary=48,S.storage=48):x.isMatrix4?(S.boundary=64,S.storage=64):x.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(S.boundary=16,S.storage=x.byteLength):He("WebGLRenderer: Unsupported uniform value type.",x),S}function M(x){let S=x.target;S.removeEventListener("dispose",M);let y=a.indexOf(S.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function T(){for(let x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:T}}var Pv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ei=null;function Iv(){return ei===null&&(ei=new Qs(Pv,16,16,Vi,zn),ei.name="DFG_LUT",ei.minFilter=Dt,ei.magFilter=Dt,ei.wrapS=Mn,ei.wrapT=Mn,ei.generateMipmaps=!1,ei.needsUpdate=!0),ei}var Xc=class{constructor(e={}){let{canvas:t=vf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=hn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let v=f,g=new Set([oc,ac,rc]),p=new Set([hn,Bn,ur,dr,nc,ic]),M=new Uint32Array(4),T=new Int32Array(4),x=new F,S=null,y=null,w=[],b=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,O=!1,V=null,H=null,k=null,$=null;this._outputColorSpace=At;let ae=0,K=0,de=null,ce=-1,pe=null,ge=new bt,Le=new bt,Ce=null,tt=new qe(0),Ke=0,je=t.width,R=t.height,I=1,N=null,B=null,L=new bt(0,0,je,R),Z=new bt(0,0,je,R),he=!1,W=new er,j=!1,ee=!1,se=new et,z=new F,ue=new bt,Y={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ye=!1;function Ne(){return de===null?I:1}let D=n;function Ze(E,X){return t.getContext(E,X)}let We,C,_,q,J,U,te,re,Q,oe,_e,Ae,Ee,Te,De,Xe,Ue,G,Se,me,ve,Me,be;try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Mt,!1),t.addEventListener("webglcontextrestored",dt,!1),t.addEventListener("webglcontextcreationerror",Cn,!1),D===null){let X="webgl2";if(D=Ze(X,E),D===null)throw Ze(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ve()}catch(E){throw t.removeEventListener("webglcontextlost",Mt,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",Cn,!1),Ye("WebGLRenderer: "+E.message),E}function Ve(){We=new kx(D),We.init(),ve=new Ev(D,We),C=new Rx(D,We,e,ve),_=new Mv(D,We),C.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),H=D.createFramebuffer(),k=D.createFramebuffer(),$=D.createFramebuffer(),q=new Gx(D),J=new cv,U=new Sv(D,We,_,J,C,ve,q),te=new Ox(P),re=new Vg(D),Me=new wx(D,re),Q=new Bx(D,re,q,Me),oe=new Vx(D,Q,re,Me,q),G=new Hx(D,C,U),De=new Cx(J),_e=new ov(P,te,We,C,Me,De),Ae=new Rv(P,J),Ee=new hv,Te=new gv(We),Ue=new Tx(P,te,_,oe,m,l),Xe=new yv(P,oe,C),be=new Cv(D,q,C,_),Se=new Ax(D,We,q),me=new zx(D,We,q),q.programs=_e.programs,P.capabilities=C,P.extensions=We,P.properties=J,P.renderLists=Ee,P.shadowMap=Xe,P.state=_,P.info=q}v!==hn&&(A=new qx(v,t.width,t.height,o,s,r));let ze=new Hh(P,D);this.xr=ze,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let E=We.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=We.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(E){E!==void 0&&(I=E,this.setSize(je,R,!1))},this.getSize=function(E){return E.set(je,R)},this.setSize=function(E,X,le=!0){if(ze.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}je=E,R=X,t.width=Math.floor(E*I),t.height=Math.floor(X*I),le===!0&&(t.style.width=E+"px",t.style.height=X+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,E,X)},this.getDrawingBufferSize=function(E){return E.set(je*I,R*I).floor()},this.setDrawingBufferSize=function(E,X,le){je=E,R=X,I=le,t.width=Math.floor(E*le),t.height=Math.floor(X*le),this.setViewport(0,0,E,X)},this.setEffects=function(E){if(v===hn){Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let X=0;X<E.length;X++)if(E[X].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(ge)},this.getViewport=function(E){return E.copy(L)},this.setViewport=function(E,X,le,ne){E.isVector4?L.set(E.x,E.y,E.z,E.w):L.set(E,X,le,ne),_.viewport(ge.copy(L).multiplyScalar(I).round())},this.getScissor=function(E){return E.copy(Z)},this.setScissor=function(E,X,le,ne){E.isVector4?Z.set(E.x,E.y,E.z,E.w):Z.set(E,X,le,ne),_.scissor(Le.copy(Z).multiplyScalar(I).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(E){_.setScissorTest(he=E)},this.setOpaqueSort=function(E){N=E},this.setTransparentSort=function(E){B=E},this.getClearColor=function(E){return E.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(E=!0,X=!0,le=!0){let ne=0;if(E){let ie=!1;if(de!==null){let Ie=de.texture.format;ie=g.has(Ie)}if(ie){let Ie=de.texture.type,Oe=p.has(Ie),Pe=Ue.getClearColor(),ke=Ue.getClearAlpha(),Ge=Pe.r,nt=Pe.g,ot=Pe.b;Oe?(M[0]=Ge,M[1]=nt,M[2]=ot,M[3]=ke,D.clearBufferuiv(D.COLOR,0,M)):(T[0]=Ge,T[1]=nt,T[2]=ot,T[3]=ke,D.clearBufferiv(D.COLOR,0,T))}else ne|=D.COLOR_BUFFER_BIT}X&&(ne|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),le&&(ne|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&D.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),V=E},this.dispose=function(){t.removeEventListener("webglcontextlost",Mt,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",Cn,!1),Ue.dispose(),Ee.dispose(),Te.dispose(),J.dispose(),te.dispose(),oe.dispose(),Me.dispose(),be.dispose(),_e.dispose(),ze.dispose(),ze.removeEventListener("sessionstart",zu),ze.removeEventListener("sessionend",Gu),Ki.stop()};function Mt(E){E.preventDefault(),Vr("WebGLRenderer: Context Lost."),O=!0}function dt(){Vr("WebGLRenderer: Context Restored."),O=!1;let E=q.autoReset,X=Xe.enabled,le=Xe.autoUpdate,ne=Xe.needsUpdate,ie=Xe.type;Ve(),q.autoReset=E,Xe.enabled=X,Xe.autoUpdate=le,Xe.needsUpdate=ne,Xe.type=ie}function Cn(E){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Hn(E){let X=E.target;X.removeEventListener("dispose",Hn),rm(X)}function rm(E){am(E),J.remove(E)}function am(E){let X=J.get(E).programs;X!==void 0&&(X.forEach(function(le){_e.releaseProgram(le)}),E.isShaderMaterial&&_e.releaseShaderCache(E))}this.renderBufferDirect=function(E,X,le,ne,ie,Ie){X===null&&(X=Y);let Oe=ie.isMesh&&ie.matrixWorld.determinantAffine()<0,Pe=lm(E,X,le,ne,ie);_.setMaterial(ne,Oe);let ke=le.index,Ge=1;if(ne.wireframe===!0){if(ke=Q.getWireframeAttribute(le),ke===void 0)return;Ge=2}let nt=le.drawRange,ot=le.attributes.position,Be=nt.start*Ge,ft=(nt.start+nt.count)*Ge;Ie!==null&&(Be=Math.max(Be,Ie.start*Ge),ft=Math.min(ft,(Ie.start+Ie.count)*Ge)),ke!==null?(Be=Math.max(Be,0),ft=Math.min(ft,ke.count)):ot!=null&&(Be=Math.max(Be,0),ft=Math.min(ft,ot.count));let Ft=ft-Be;if(Ft<0||Ft===1/0)return;Me.setup(ie,ne,Pe,le,ke);let Tt,vt=Se;if(ke!==null&&(Tt=re.get(ke),vt=me,vt.setIndex(Tt)),ie.isMesh)ne.wireframe===!0?(_.setLineWidth(ne.wireframeLinewidth*Ne()),vt.setMode(D.LINES)):vt.setMode(D.TRIANGLES);else if(ie.isLine){let jt=ne.linewidth;jt===void 0&&(jt=1),_.setLineWidth(jt*Ne()),ie.isLineSegments?vt.setMode(D.LINES):ie.isLineLoop?vt.setMode(D.LINE_LOOP):vt.setMode(D.LINE_STRIP)}else ie.isPoints?vt.setMode(D.POINTS):ie.isSprite&&vt.setMode(D.TRIANGLES);if(ie.isBatchedMesh)if(We.get("WEBGL_multi_draw"))vt.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{let jt=ie._multiDrawStarts,Fe=ie._multiDrawCounts,tn=ie._multiDrawCount,lt=ke?re.get(ke).bytesPerElement:1,vn=J.get(ne).currentProgram.getUniforms();for(let Vn=0;Vn<tn;Vn++)vn.setValue(D,"_gl_DrawID",Vn),vt.render(jt[Vn]/lt,Fe[Vn])}else if(ie.isInstancedMesh)vt.renderInstances(Be,Ft,ie.count);else if(le.isInstancedBufferGeometry){let jt=le._maxInstanceCount!==void 0?le._maxInstanceCount:1/0,Fe=Math.min(le.instanceCount,jt);vt.renderInstances(Be,Ft,Fe)}else vt.render(Be,Ft)};function Bu(E,X,le,ne){V!==null&&E.isNodeMaterial&&V.setObject(ne,E),j===!0&&De.setState(E,le,!1),E.transparent===!0&&E.side===Qt&&E.forceSinglePass===!1?(E.side=zt,E.needsUpdate=!0,Ha(E,X,ne),E.side=$n,E.needsUpdate=!0,Ha(E,X,ne),E.side=Qt):Ha(E,X,ne)}this.compile=function(E,X,le=null){le===null&&(le=E),V!==null&&V.renderStart(E,X,le),y=Te.get(le),y.init(X),b.push(y),le.traverseVisible(function(ie){ie.isLight&&ie.layers.test(X.layers)&&(y.pushLight(ie),ie.castShadow&&y.pushShadow(ie))}),E!==le&&E.traverseVisible(function(ie){ie.isLight&&ie.layers.test(X.layers)&&(y.pushLight(ie),ie.castShadow&&y.pushShadow(ie))}),y.setupLights(),V!==null&&V.updateLights(y.state.lightsArray),ee=this.localClippingEnabled,j=De.init(this.clippingPlanes,ee),j===!0&&De.setGlobalState(this.clippingPlanes,X),V!==null&&Xe.render(y.state.shadowsArray,le,X);let ne=new Set;return E.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;let Ie=ie.material;if(Ie)if(Array.isArray(Ie))for(let Oe=0;Oe<Ie.length;Oe++){let Pe=Ie[Oe];Bu(Pe,le,X,ie),ne.add(Pe)}else Bu(Ie,le,X,ie),ne.add(Ie)}),y=b.pop(),V!==null&&V.renderEnd(),ne},this.compileAsync=function(E,X,le=null){let ne=this.compile(E,X,le);return new Promise(ie=>{function Ie(){if(ne.forEach(function(Oe){let ke=J.get(Oe).currentProgram;(ke===void 0||ke.isReady())&&ne.delete(Oe)}),ne.size===0){ie(E);return}setTimeout(Ie,10)}We.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let dl=null;function om(E){dl&&dl(E)}function zu(){Ki.stop()}function Gu(){Ki.start()}let Ki=new Qf;Ki.setAnimationLoop(om),typeof self<"u"&&Ki.setContext(self),this.setAnimationLoop=function(E){dl=E,ze.setAnimationLoop(E),E===null?Ki.stop():Ki.start()},ze.addEventListener("sessionstart",zu),ze.addEventListener("sessionend",Gu),this.render=function(E,X){if(X!==void 0&&X.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;V!==null&&V.renderStart(E,X);let le=ze.enabled===!0&&ze.isPresenting===!0,ne=A!==null&&(de===null||le)&&A.begin(P,de);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(X),X=ze.getCamera()),E.isScene===!0&&E.onBeforeRender(P,E,X,de),y=Te.get(E,b.length),y.init(X),y.state.textureUnits=U.getTextureUnits(),b.push(y),se.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),W.setFromProjectionMatrix(se,Fn,X.reversedDepth),ee=this.localClippingEnabled,j=De.init(this.clippingPlanes,ee),S=Ee.get(E,w.length),S.init(),w.push(S),ze.enabled===!0&&ze.isPresenting===!0){let Oe=P.xr.getDepthSensingMesh();Oe!==null&&fl(Oe,X,-1/0,P.sortObjects)}fl(E,X,0,P.sortObjects),S.finish(),V!==null&&V.updateLights(y.state.lightsArray),P.sortObjects===!0&&S.sort(N,B),ye=ze.enabled===!1||ze.isPresenting===!1||ze.hasDepthSensing()===!1,ye&&Ue.addToRenderList(S,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),j===!0&&De.beginShadows();let ie=y.state.shadowsArray;if(Xe.render(ie,E,X),j===!0&&De.endShadows(),(ne&&A.hasRenderPass())===!1){let Oe=S.opaque,Pe=S.transmissive;if(y.setupLights(),X.isArrayCamera){let ke=X.cameras;if(Pe.length>0)for(let Ge=0,nt=ke.length;Ge<nt;Ge++){let ot=ke[Ge];Vu(Oe,Pe,E,ot)}ye&&Ue.render(E);for(let Ge=0,nt=ke.length;Ge<nt;Ge++){let ot=ke[Ge];Hu(S,E,ot,ot.viewport)}}else Pe.length>0&&Vu(Oe,Pe,E,X),ye&&Ue.render(E),Hu(S,E,X)}de!==null&&K===0&&(U.updateMultisampleRenderTarget(de),U.updateRenderTargetMipmap(de)),ne&&A.end(P),E.isScene===!0&&E.onAfterRender(P,E,X),Me.resetDefaultState(),ce=-1,pe=null,b.pop(),b.length>0?(y=b[b.length-1],U.setTextureUnits(y.state.textureUnits),j===!0&&De.setGlobalState(P.clippingPlanes,y.state.camera)):y=null,w.pop(),w.length>0?S=w[w.length-1]:S=null,V!==null&&V.renderEnd()};function fl(E,X,le,ne){if(E.visible===!1)return;if(E.layers.test(X.layers)){if(E.isGroup)le=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(X);else if(E.isLightProbeGrid)y.pushLightProbeGrid(E);else if(E.isLight)y.pushLight(E),E.castShadow&&y.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(W)){ne&&ue.setFromMatrixPosition(E.matrixWorld).applyMatrix4(se);let Oe=oe.update(E),Pe=E.material;Pe.visible&&S.push(E,Oe,Pe,le,ue.z,null,X)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(W))){let Oe=oe.update(E),Pe=E.material;if(ne&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ue.copy(E.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),ue.copy(Oe.boundingSphere.center)),ue.applyMatrix4(E.matrixWorld).applyMatrix4(se)),Array.isArray(Pe)){let ke=Oe.groups;for(let Ge=0,nt=ke.length;Ge<nt;Ge++){let ot=ke[Ge],Be=Pe[ot.materialIndex];Be&&Be.visible&&S.push(E,Oe,Be,le,ue.z,ot,X)}}else Pe.visible&&S.push(E,Oe,Pe,le,ue.z,null,X)}}let Ie=E.children;for(let Oe=0,Pe=Ie.length;Oe<Pe;Oe++)fl(Ie[Oe],X,le,ne)}function Hu(E,X,le,ne){let{opaque:ie,transmissive:Ie,transparent:Oe}=E;y.setupLightsView(le),j===!0&&De.setGlobalState(P.clippingPlanes,le),ne&&_.viewport(ge.copy(ne)),ie.length>0&&Ga(ie,X,le),Ie.length>0&&Ga(Ie,X,le),Oe.length>0&&Ga(Oe,X,le),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Vu(E,X,le,ne){if((le.isScene===!0?le.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[ne.id]===void 0){let Be=We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[ne.id]=new on(1,1,{generateMipmaps:!0,type:Be?zn:hn,minFilter:kn,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:st.workingColorSpace})}let Ie=y.state.transmissionRenderTarget[ne.id],Oe=ne.viewport||ge;Ie.setSize(Oe.z*P.transmissionResolutionScale,Oe.w*P.transmissionResolutionScale);let Pe=P.getRenderTarget(),ke=P.getActiveCubeFace(),Ge=P.getActiveMipmapLevel();P.setRenderTarget(Ie),P.getClearColor(tt),Ke=P.getClearAlpha(),Ke<1&&P.setClearColor(16777215,.5),P.clear(),ye&&Ue.render(le);let nt=P.toneMapping;P.toneMapping=On;let ot=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),y.setupLightsView(ne),j===!0&&De.setGlobalState(P.clippingPlanes,ne),Ga(E,le,ne),U.updateMultisampleRenderTarget(Ie),U.updateRenderTargetMipmap(Ie),We.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let ft=0,Ft=X.length;ft<Ft;ft++){let Tt=X[ft],{object:vt,geometry:jt,material:Fe,group:tn}=Tt;if(Fe.side===Qt&&vt.layers.test(ne.layers)){let lt=Fe.side;Fe.side=zt,Fe.needsUpdate=!0,Wu(vt,le,ne,jt,Fe,tn),Fe.side=lt,Fe.needsUpdate=!0,Be=!0}}Be===!0&&(U.updateMultisampleRenderTarget(Ie),U.updateRenderTargetMipmap(Ie))}P.setRenderTarget(Pe,ke,Ge),P.setClearColor(tt,Ke),ot!==void 0&&(ne.viewport=ot),P.toneMapping=nt}function Ga(E,X,le){let ne=X.isScene===!0?X.overrideMaterial:null;for(let ie=0,Ie=E.length;ie<Ie;ie++){let Oe=E[ie],{object:Pe,geometry:ke,group:Ge}=Oe,nt=Oe.material;nt.allowOverride===!0&&ne!==null&&(nt=ne),Pe.layers.test(le.layers)&&Wu(Pe,X,le,ke,nt,Ge)}}function Wu(E,X,le,ne,ie,Ie){V!==null&&ie.isNodeMaterial&&V.setObject(E,ie),E.onBeforeRender(P,X,le,ne,ie,Ie),E.modelViewMatrix.multiplyMatrices(le.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),ie.onBeforeRender(P,X,le,ne,E,Ie),ie.transparent===!0&&ie.side===Qt&&ie.forceSinglePass===!1?(ie.side=zt,ie.needsUpdate=!0,P.renderBufferDirect(le,X,ne,ie,E,Ie),ie.side=$n,ie.needsUpdate=!0,P.renderBufferDirect(le,X,ne,ie,E,Ie),ie.side=Qt):P.renderBufferDirect(le,X,ne,ie,E,Ie),E.onAfterRender(P,X,le,ne,ie,Ie)}function Ha(E,X,le){X.isScene!==!0&&(X=Y);let ne=J.get(E),ie=y.state.lights,Ie=y.state.shadowsArray,Oe=ie.state.version,Pe=_e.getParameters(E,ie.state,Ie,X,le,y.state.lightProbeGridArray),ke=_e.getProgramCacheKey(Pe),Ge=ne.programs;ne.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?X.environment:null,ne.fog=X.fog;let nt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;ne.envMap=te.get(E.envMap||ne.environment,nt),ne.envMapRotation=ne.environment!==null&&E.envMap===null?X.environmentRotation:E.envMapRotation,Ge===void 0&&(E.addEventListener("dispose",Hn),Ge=new Map,ne.programs=Ge);let ot=Ge.get(ke);if(ot!==void 0){if(ne.currentProgram===ot&&ne.lightsStateVersion===Oe)return Xu(E,Pe),ot}else Pe.uniforms=_e.getUniforms(E),V!==null&&E.isNodeMaterial&&V.build(E,le,Pe),E.onBeforeCompile(Pe,P),ot=_e.acquireProgram(Pe,ke),Ge.set(ke,ot),ne.uniforms=Pe.uniforms;let Be=ne.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Be.clippingPlanes=De.uniform),Xu(E,Pe),ne.needsLights=um(E),ne.lightsStateVersion=Oe,ne.needsLights&&(Be.ambientLightColor.value=ie.state.ambient,Be.lightProbe.value=ie.state.probe,Be.sunLights.value=ie.state.sun,Be.sunLightShadows.value=ie.state.sunShadow,Be.directionalLights.value=ie.state.directional,Be.directionalLightShadows.value=ie.state.directionalShadow,Be.spotLights.value=ie.state.spot,Be.spotLightShadows.value=ie.state.spotShadow,Be.rectAreaLights.value=ie.state.rectArea,Be.ltc_1.value=ie.state.rectAreaLTC1,Be.ltc_2.value=ie.state.rectAreaLTC2,Be.pointLights.value=ie.state.point,Be.pointLightShadows.value=ie.state.pointShadow,Be.hemisphereLights.value=ie.state.hemi,Be.sunShadowMatrix.value=ie.state.sunShadowMatrix,Be.sunShadowCascade.value=ie.state.sunShadowCascade,Be.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,Be.spotLightMatrix.value=ie.state.spotLightMatrix,Be.spotLightMap.value=ie.state.spotLightMap,Be.pointShadowMatrix.value=ie.state.pointShadowMatrix),ne.lightProbeGrid=y.state.lightProbeGridArray.length>0,ne.currentProgram=ot,ne.uniformsList=null,ot}function qu(E){if(E.uniformsList===null){let X=E.currentProgram.getUniforms();E.uniformsList=gr.seqWithValue(X.seq,E.uniforms)}return E.uniformsList}function Xu(E,X){let le=J.get(E);le.outputColorSpace=X.outputColorSpace,le.batching=X.batching,le.batchingColor=X.batchingColor,le.instancing=X.instancing,le.instancingColor=X.instancingColor,le.instancingMorph=X.instancingMorph,le.skinning=X.skinning,le.morphTargets=X.morphTargets,le.morphNormals=X.morphNormals,le.morphColors=X.morphColors,le.morphTargetsCount=X.morphTargetsCount,le.numClippingPlanes=X.numClippingPlanes,le.numIntersection=X.numClipIntersection,le.vertexAlphas=X.vertexAlphas,le.vertexTangents=X.vertexTangents,le.toneMapping=X.toneMapping}function cm(E,X){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;x.setFromMatrixPosition(X.matrixWorld);for(let le=0,ne=E.length;le<ne;le++){let ie=E[le];if(ie.texture!==null&&ie.boundingBox.containsPoint(x))return ie}return null}function lm(E,X,le,ne,ie){X.isScene!==!0&&(X=Y),U.resetTextureUnits();let Ie=X.fog,Oe=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?X.environment:null,Pe=de===null?P.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:st.workingColorSpace,ke=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,Ge=te.get(ne.envMap||Oe,ke),nt=ne.vertexColors===!0&&!!le.attributes.color&&le.attributes.color.itemSize===4,ot=!!le.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),Be=!!le.morphAttributes.position,ft=!!le.morphAttributes.normal,Ft=!!le.morphAttributes.color,Tt=On;ne.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(Tt=P.toneMapping);let vt=le.morphAttributes.position||le.morphAttributes.normal||le.morphAttributes.color,jt=vt!==void 0?vt.length:0,Fe=J.get(ne),tn=y.state.lights;if(j===!0&&(ee===!0||E!==pe)){let St=E===pe&&ne.id===ce;De.setState(ne,E,St)}let lt=!1;ne.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==tn.state.version||Fe.outputColorSpace!==Pe||ie.isBatchedMesh&&Fe.batching===!1||!ie.isBatchedMesh&&Fe.batching===!0||ie.isBatchedMesh&&Fe.batchingColor===!0&&ie._colorsTexture===null||ie.isBatchedMesh&&Fe.batchingColor===!1&&ie._colorsTexture!==null||ie.isInstancedMesh&&Fe.instancing===!1||!ie.isInstancedMesh&&Fe.instancing===!0||ie.isSkinnedMesh&&Fe.skinning===!1||!ie.isSkinnedMesh&&Fe.skinning===!0||ie.isInstancedMesh&&Fe.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&Fe.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&Fe.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&Fe.instancingMorph===!1&&ie.morphTexture!==null||Fe.envMap!==Ge||ne.fog===!0&&Fe.fog!==Ie||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==De.numPlanes||Fe.numIntersection!==De.numIntersection)||Fe.vertexAlphas!==nt||Fe.vertexTangents!==ot||Fe.morphTargets!==Be||Fe.morphNormals!==ft||Fe.morphColors!==Ft||Fe.toneMapping!==Tt||Fe.morphTargetsCount!==jt||!!Fe.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(lt=!0):(lt=!0,Fe.__version=ne.version);let vn=Fe.currentProgram;lt===!0&&(vn=Ha(ne,X,ie),V&&ne.isNodeMaterial&&V.onUpdateProgram(ne,vn,Fe));let Vn=!1,Ei=!1,ws=!1,xt=vn.getUniforms(),Pt=Fe.uniforms;if(_.useProgram(vn.program)&&(Vn=!0,Ei=!0,ws=!0),ne.id!==ce&&(ce=ne.id,Ei=!0),Fe.needsLights){let St=cm(y.state.lightProbeGridArray,ie);Fe.lightProbeGrid!==St&&(Fe.lightProbeGrid=St,Ei=!0)}if(Vn||pe!==E){_.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),xt.setValue(D,"projectionMatrix",E.projectionMatrix),xt.setValue(D,"viewMatrix",E.matrixWorldInverse);let wi=xt.map.cameraPosition;wi!==void 0&&wi.setValue(D,z.setFromMatrixPosition(E.matrixWorld)),C.logarithmicDepthBuffer&&xt.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&xt.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),pe!==E&&(pe=E,Ei=!0,ws=!0)}if(Fe.needsLights&&(tn.state.sunShadowMap.length>0&&xt.setValue(D,"sunShadowMap",tn.state.sunShadowMap,U),tn.state.directionalShadowMap.length>0&&xt.setValue(D,"directionalShadowMap",tn.state.directionalShadowMap,U),tn.state.spotShadowMap.length>0&&xt.setValue(D,"spotShadowMap",tn.state.spotShadowMap,U),tn.state.pointShadowMap.length>0&&xt.setValue(D,"pointShadowMap",tn.state.pointShadowMap,U)),ie.isSkinnedMesh){xt.setOptional(D,ie,"bindMatrix"),xt.setOptional(D,ie,"bindMatrixInverse");let St=ie.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),xt.setValue(D,"boneTexture",St.boneTexture,U))}ie.isBatchedMesh&&(xt.setOptional(D,ie,"batchingTexture"),xt.setValue(D,"batchingTexture",ie._matricesTexture,U),xt.setOptional(D,ie,"batchingIdTexture"),xt.setValue(D,"batchingIdTexture",ie._indirectTexture,U),xt.setOptional(D,ie,"batchingColorTexture"),ie._colorsTexture!==null&&xt.setValue(D,"batchingColorTexture",ie._colorsTexture,U));let Ti=le.morphAttributes;if((Ti.position!==void 0||Ti.normal!==void 0||Ti.color!==void 0)&&G.update(ie,le,vn),(Ei||Fe.receiveShadow!==ie.receiveShadow)&&(Fe.receiveShadow=ie.receiveShadow,xt.setValue(D,"receiveShadow",ie.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&X.environment!==null&&(Pt.envMapIntensity.value=X.environmentIntensity),Pt.dfgLUT!==void 0&&(Pt.dfgLUT.value=Iv()),Ei){if(xt.setValue(D,"toneMappingExposure",P.toneMappingExposure),Fe.needsLights&&hm(Pt,ws),Ie&&ne.fog===!0&&Ae.refreshFogUniforms(Pt,Ie),Ae.refreshMaterialUniforms(Pt,ne,I,R,y.state.transmissionRenderTarget[E.id]),Fe.needsLights&&Fe.lightProbeGrid){let St=Fe.lightProbeGrid;Pt.probesSH.value=St.texture,Pt.probesMin.value.copy(St.boundingBox.min),Pt.probesMax.value.copy(St.boundingBox.max),Pt.probesResolution.value.copy(St.resolution)}gr.upload(D,qu(Fe),Pt,U)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(gr.upload(D,qu(Fe),Pt,U),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&xt.setValue(D,"center",ie.center),xt.setValue(D,"modelViewMatrix",ie.modelViewMatrix),xt.setValue(D,"normalMatrix",ie.normalMatrix),xt.setValue(D,"modelMatrix",ie.matrixWorld),ne.uniformsGroups!==void 0){let St=ne.uniformsGroups;for(let wi=0,As=St.length;wi<As;wi++){let Ku=St[wi];be.update(Ku,vn),be.bind(Ku,vn)}}return vn}function hm(E,X){E.ambientLightColor.needsUpdate=X,E.lightProbe.needsUpdate=X,E.sunLights.needsUpdate=X,E.sunLightShadows.needsUpdate=X,E.directionalLights.needsUpdate=X,E.directionalLightShadows.needsUpdate=X,E.pointLights.needsUpdate=X,E.pointLightShadows.needsUpdate=X,E.spotLights.needsUpdate=X,E.spotLightShadows.needsUpdate=X,E.rectAreaLights.needsUpdate=X,E.hemisphereLights.needsUpdate=X}function um(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return ae},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return de},this.setRenderTargetTextures=function(E,X,le){let ne=J.get(E);ne.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),J.get(E.texture).__webglTexture=X,J.get(E.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:le,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,X){let le=J.get(E);le.__webglFramebuffer=X,le.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(E,X=0,le=0){de=E,ae=X,K=le;let ne=null,ie=!1,Ie=!1;if(E){let Pe=J.get(E);if(Pe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(D.FRAMEBUFFER,Pe.__webglFramebuffer),ge.copy(E.viewport),Le.copy(E.scissor),Ce=E.scissorTest,_.viewport(ge),_.scissor(Le),_.setScissorTest(Ce),ce=-1;return}else if(Pe.__webglFramebuffer===void 0)U.setupRenderTarget(E);else if(Pe.__hasExternalTextures)U.rebindTextures(E,J.get(E.texture).__webglTexture,J.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let nt=E.depthTexture;if(Pe.__boundDepthTexture!==nt){if(nt!==null&&J.has(nt)&&(E.width!==nt.image.width||E.height!==nt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(E)}}let ke=E.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Ie=!0);let Ge=J.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ge[X])?ne=Ge[X][le]:ne=Ge[X],ie=!0):E.samples>0&&U.useMultisampledRTT(E)===!1?ne=J.get(E).__webglMultisampledFramebuffer:Array.isArray(Ge)?ne=Ge[le]:ne=Ge,ge.copy(E.viewport),Le.copy(E.scissor),Ce=E.scissorTest}else ge.copy(L).multiplyScalar(I).floor(),Le.copy(Z).multiplyScalar(I).floor(),Ce=he;if(le!==0&&(ne=H),_.bindFramebuffer(D.FRAMEBUFFER,ne)&&_.drawBuffers(E,ne),_.viewport(ge),_.scissor(Le),_.setScissorTest(Ce),ie){let Pe=J.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+X,Pe.__webglTexture,le)}else if(Ie){let Pe=X;for(let ke=0;ke<E.textures.length;ke++){let Ge=J.get(E.textures[ke]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+ke,Ge.__webglTexture,le,Pe)}}else if(E!==null&&le!==0){let Pe=J.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Pe.__webglTexture,le)}ce=-1};function ju(E){let X=J.get(E);return(X.__readFormat!==E.format||X.__readType!==E.type)&&(X.__readFormat=E.format,X.__readType=E.type,X.__formatReadable=C.textureFormatReadable(E.format),X.__typeReadable=C.textureTypeReadable(E.type)),X}this.readRenderTargetPixels=function(E,X,le,ne,ie,Ie,Oe,Pe=0){if(!(E&&E.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=J.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Oe!==void 0&&(ke=ke[Oe]),ke){_.bindFramebuffer(D.FRAMEBUFFER,ke);try{let Ge=E.textures[Pe],nt=Ge.format,ot=Ge.type;E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Pe);let Be=ju(Ge);if(Be.__formatReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Be.__typeReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=E.width-ne&&le>=0&&le<=E.height-ie&&D.readPixels(X,le,ne,ie,ve.convert(nt),ve.convert(ot),Ie)}finally{let Ge=de!==null?J.get(de).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(E,X,le,ne,ie,Ie,Oe,Pe=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=J.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Oe!==void 0&&(ke=ke[Oe]),ke)if(X>=0&&X<=E.width-ne&&le>=0&&le<=E.height-ie){_.bindFramebuffer(D.FRAMEBUFFER,ke);let Ge=E.textures[Pe],nt=Ge.format,ot=Ge.type;E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Pe);let Be=ju(Ge);if(Be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ft=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,ft),D.bufferData(D.PIXEL_PACK_BUFFER,Ie.byteLength,D.STREAM_READ),D.readPixels(X,le,ne,ie,ve.convert(nt),ve.convert(ot),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let Ft=de!==null?J.get(de).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,Ft);let Tt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Mf(D,Tt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,ft),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Ie),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(ft),D.deleteSync(Tt),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,X=null,le=0){let ne=Math.pow(2,-le),ie=Math.floor(E.image.width*ne),Ie=Math.floor(E.image.height*ne),Oe=X!==null?X.x:0,Pe=X!==null?X.y:0;U.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,le,0,0,Oe,Pe,ie,Ie),_.unbindTexture()},this.copyTextureToTexture=function(E,X,le=null,ne=null,ie=0,Ie=0){let Oe,Pe,ke,Ge,nt,ot,Be,ft,Ft,Tt=E.isCompressedTexture?E.mipmaps[Ie]:E.image;if(le!==null)Oe=le.max.x-le.min.x,Pe=le.max.y-le.min.y,ke=le.isBox3?le.max.z-le.min.z:1,Ge=le.min.x,nt=le.min.y,ot=le.isBox3?le.min.z:0;else{let Pt=Math.pow(2,-ie);Oe=Math.floor(Tt.width*Pt),Pe=Math.floor(Tt.height*Pt),E.isDataArrayTexture?ke=Tt.depth:E.isData3DTexture?ke=Math.floor(Tt.depth*Pt):ke=1,Ge=0,nt=0,ot=0}ne!==null?(Be=ne.x,ft=ne.y,Ft=ne.z):(Be=0,ft=0,Ft=0);let vt=ve.convert(X.format),jt=ve.convert(X.type),Fe;X.isData3DTexture?(U.setTexture3D(X,0),Fe=D.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(U.setTexture2DArray(X,0),Fe=D.TEXTURE_2D_ARRAY):(U.setTexture2D(X,0),Fe=D.TEXTURE_2D),_.activeTexture(D.TEXTURE0),_.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,X.flipY),_.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),_.pixelStorei(D.UNPACK_ALIGNMENT,X.unpackAlignment);let tn=_.getParameter(D.UNPACK_ROW_LENGTH),lt=_.getParameter(D.UNPACK_IMAGE_HEIGHT),vn=_.getParameter(D.UNPACK_SKIP_PIXELS),Vn=_.getParameter(D.UNPACK_SKIP_ROWS),Ei=_.getParameter(D.UNPACK_SKIP_IMAGES);_.pixelStorei(D.UNPACK_ROW_LENGTH,Tt.width),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Tt.height),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Ge),_.pixelStorei(D.UNPACK_SKIP_ROWS,nt),_.pixelStorei(D.UNPACK_SKIP_IMAGES,ot);let ws=E.isDataArrayTexture||E.isData3DTexture,xt=X.isDataArrayTexture||X.isData3DTexture;if(E.isDepthTexture){let Pt=J.get(E),Ti=J.get(X),St=J.get(Pt.__renderTarget),wi=J.get(Ti.__renderTarget);_.bindFramebuffer(D.READ_FRAMEBUFFER,St.__webglFramebuffer),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,wi.__webglFramebuffer);for(let As=0;As<ke;As++)ws&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,J.get(E).__webglTexture,ie,ot+As),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,J.get(X).__webglTexture,Ie,Ft+As)),D.blitFramebuffer(Ge,nt,Oe,Pe,Be,ft,Oe,Pe,D.DEPTH_BUFFER_BIT,D.NEAREST);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(ie!==0||E.isRenderTargetTexture||J.has(E)){let Pt=J.get(E),Ti=J.get(X);_.bindFramebuffer(D.READ_FRAMEBUFFER,k),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,$);for(let St=0;St<ke;St++)ws?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Pt.__webglTexture,ie,ot+St):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Pt.__webglTexture,ie),xt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ti.__webglTexture,Ie,Ft+St):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ti.__webglTexture,Ie),ie!==0?D.blitFramebuffer(Ge,nt,Oe,Pe,Be,ft,Oe,Pe,D.COLOR_BUFFER_BIT,D.NEAREST):xt?D.copyTexSubImage3D(Fe,Ie,Be,ft,Ft+St,Ge,nt,Oe,Pe):D.copyTexSubImage2D(Fe,Ie,Be,ft,Ge,nt,Oe,Pe);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else xt?E.isDataTexture||E.isData3DTexture?D.texSubImage3D(Fe,Ie,Be,ft,Ft,Oe,Pe,ke,vt,jt,Tt.data):X.isCompressedArrayTexture?D.compressedTexSubImage3D(Fe,Ie,Be,ft,Ft,Oe,Pe,ke,vt,Tt.data):D.texSubImage3D(Fe,Ie,Be,ft,Ft,Oe,Pe,ke,vt,jt,Tt):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,Ie,Be,ft,Oe,Pe,vt,jt,Tt.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,Ie,Be,ft,Tt.width,Tt.height,vt,Tt.data):D.texSubImage2D(D.TEXTURE_2D,Ie,Be,ft,Oe,Pe,vt,jt,Tt);_.pixelStorei(D.UNPACK_ROW_LENGTH,tn),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,lt),_.pixelStorei(D.UNPACK_SKIP_PIXELS,vn),_.pixelStorei(D.UNPACK_SKIP_ROWS,Vn),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Ei),Ie===0&&X.generateMipmaps&&D.generateMipmap(Fe),_.unbindTexture()},this.initRenderTarget=function(E){J.get(E).__webglFramebuffer===void 0&&U.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?U.setTextureCube(E,0):E.isData3DTexture?U.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?U.setTexture2DArray(E,0):U.setTexture2D(E,0),_.unbindTexture()},this.resetState=function(){ae=0,K=0,de=null,_.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}};var Yc=class extends as{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new Zt;e.deleteAttribute("uv");let t=new qt({side:zt}),n=new qt,s=new xi(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ct(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new cs(e,n,6),o=new Et;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new ct(e,_r(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new ct(e,_r(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let u=new ct(e,_r(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new ct(e,_r(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let h=new ct(e,_r(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let f=new ct(e,_r(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function _r(i){return new da({color:0,emissive:16777215,emissiveIntensity:i})}var Fa=new F;function Tn(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;Fa.copy(e),Fa[n]=0,Fa.normalize();let c=.5*a/(a+o),u=1-Fa.angleTo(i)/l;return Math.sign(Fa[t])===1?u*c:o/(a+o)+c+c*(1-u)}var Jc=class i extends Zt{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new F,c=new F,u=new F(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,h=this.attributes.normal.array,f=this.attributes.uv.array,m=d.length/6,v=new F,g=.5/a;for(let p=0,M=0;p<d.length;p+=3,M+=2)switch(l.fromArray(d,p),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),d[p+0]=u.x*Math.sign(l.x)+c.x*r,d[p+1]=u.y*Math.sign(l.y)+c.y*r,d[p+2]=u.z*Math.sign(l.z)+c.z*r,h[p+0]=c.x,h[p+1]=c.y,h[p+2]=c.z,Math.floor(p/m)){case 0:v.set(1,0,0),f[M+0]=Tn(v,c,"z","y",r,n),f[M+1]=1-Tn(v,c,"y","z",r,t);break;case 1:v.set(-1,0,0),f[M+0]=1-Tn(v,c,"z","y",r,n),f[M+1]=1-Tn(v,c,"y","z",r,t);break;case 2:v.set(0,1,0),f[M+0]=1-Tn(v,c,"x","z",r,e),f[M+1]=Tn(v,c,"z","x",r,n);break;case 3:v.set(0,-1,0),f[M+0]=1-Tn(v,c,"x","z",r,e),f[M+1]=1-Tn(v,c,"z","x",r,n);break;case 4:v.set(0,0,1),f[M+0]=1-Tn(v,c,"x","y",r,e),f[M+1]=1-Tn(v,c,"y","x",r,t);break;case 5:v.set(0,0,-1),f[M+0]=Tn(v,c,"x","y",r,e),f[M+1]=1-Tn(v,c,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};function op(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new yt,c=0;for(let u=0;u<i.length;++u){let d=i[u],h=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,u),c+=f}}if(t){let u=0,d=[];for(let h=0;h<i.length;++h){let f=i[h].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+u);u+=i[h].attributes.position.count}l.setIndex(d)}for(let u in r){let d=ap(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,d)}for(let u in a){let d=a[u][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let h=0;h<d;++h){let f=[];for(let v=0;v<a[u].length;++v)f.push(a[u][v][h]);let m=ap(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(m)}}}return l}function ap(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){let u=i[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}let a=new e(r),o=new wt(a,t,n),l=0;for(let c=0;c<i.length;++c){let u=i[c];if(u.isInterleavedBufferAttribute){let d=l/t;for(let h=0,f=u.count;h<f;h++)for(let m=0;m<t;m++){let v=u.getComponent(h,m);o.setComponent(h+d,m,v)}}else a.set(u.array,l);l+=u.count*t}return s!==void 0&&(o.gpuType=s),o}function Wh(i,e){if(e===_h)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===fr||e===Ca){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===fr)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Zc(i){let e=i.map(n=>n.index?n.toNonIndexed():n),t=op(e,!1);if(e.forEach((n,s)=>{n!==i[s]&&n.dispose()}),!t)throw new Error("Incompatible BotStrike mesh attributes");return t}function cp(i,{mobile:e=!1}={}){let t=[],n=[],s=new Map,r=2050,a=()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/4294967296);function o(R,I=512){let N=document.createElement("canvas");N.width=N.height=I,R(N.getContext("2d"),I);let B=new Yn(N);return B.wrapS=B.wrapT=Xn,B.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),n.push(B),B}let l=o((R,I)=>{R.fillStyle="#c4c6c8",R.fillRect(0,0,I,I);for(let N=0;N<7500;N++){let B=150+a()*95|0;R.fillStyle=`rgb(${B},${B},${B})`;let L=a()*I,Z=a()*I;R.fillRect(L,Z,a()*3+.4,a()*1.4+.3)}for(let N=0;N<340;N++){let B=a()*I,L=a()*I;R.strokeStyle=N%3?"#7c8185":"#242b30",R.lineWidth=.5+a()*1.6,R.beginPath(),R.moveTo(B,L),R.lineTo(B+a()*25,L+a()*3),R.stroke()}for(let N=0;N<140;N++){let B=a()*I,L=a()*I;R.fillStyle=N%4?"#39434a":"#82949e",R.beginPath(),R.moveTo(B,L),R.lineTo(B+a()*7+1,L+1),R.lineTo(B+a()*4,L+a()*6+1),R.fill()}R.strokeStyle="#45494c",R.lineWidth=3,R.strokeRect(7,7,I-14,I-14),R.strokeStyle="#fff",R.lineWidth=1,R.strokeRect(10,10,I-20,I-20)}),c=o((R,I)=>{R.fillStyle="#27333c",R.fillRect(0,0,I,I);for(let N=0;N<16e3;N++){let B=.04+a()*.14;R.fillStyle=`rgba(180,201,211,${B})`,R.fillRect(a()*I,a()*I,1,1)}R.strokeStyle="#1b242b",R.lineWidth=4,R.strokeRect(2,2,I-4,I-4);for(let N=0;N<12;N++)R.fillStyle="#17232c",R.fillRect(17+N*40,23,17,4),R.fillRect(17+N*40,I-27,17,4);for(let N=0;N<16;N++)R.fillStyle="#6e767c",R.beginPath(),R.arc(N%4*128+14,(N/4|0)*128+14,2,0,Math.PI*2),R.fill()});c.repeat.set(12,12);let u=o((R,I)=>{let N=R.createImageData(I,I);for(let B=0;B<I;B++)for(let L=0;L<I;L++){let Z=Math.max(65,Math.min(235,157+28*Math.sin(L*.027+Math.sin(B*.039)*2)+23*Math.cos(B*.035+Math.sin(L*.021)*3)+12*Math.sin(L*.11+B*.15))),he=(B*I+L)*4;N.data[he]=N.data[he+1]=N.data[he+2]=Z,N.data[he+3]=255}R.putImageData(N,0,0)});u.repeat.set(5,5);function d(R,I={}){let N=new qt({color:R,roughness:.44,metalness:.72,map:l,bumpMap:l,bumpScale:.12,...I,...e?{bumpMap:null}:{}});return t.push(N),N}let h={steel:d("#747e87"),black:d("#111b24",{roughness:.66}),rubber:d("#14171d",{metalness:.1,roughness:.88}),silver:d("#acb5be",{roughness:.27}),warm:d("#bd7651"),hull:d("#1d333f"),container:d("#34464e"),floor:d("#657983",{map:c,bumpMap:c,bumpScale:.12,roughnessMap:u,roughness:.85,metalness:.3,envMapIntensity:.2})},m=["#139fb7","#d3dfd7","#c08b2b","#684e97","#aa346e","#c46122"].map(R=>d(R)),v=["#47edff","#76ffba","#ffb733","#bc70ff","#ff4dad","#ff8b2b"].map(R=>d(R,{map:null,bumpMap:null,emissive:R,emissiveIntensity:1.7,roughness:.25,metalness:.15})),g=["#33ccff","#ff7550"].map(R=>d(R,{map:null,bumpMap:null,emissive:R,emissiveIntensity:2.2})),p=v[5],M=v[0],T=o((R,I)=>{let N=R.createRadialGradient(I/2,I/2,0,I/2,I/2,I/2);N.addColorStop(0,"rgba(0,0,0,.48)"),N.addColorStop(.55,"rgba(0,0,0,.2)"),N.addColorStop(1,"rgba(0,0,0,0)"),R.fillStyle=N,R.fillRect(0,0,I,I)},64),x=new Ct({map:T,transparent:!0,depthWrite:!1});t.push(x);function S(R,I,N,B=0,L=0,Z=0){let he=new ct(I,N);return he.position.set(B,L,Z),he.castShadow=!N.isMeshBasicMaterial,he.receiveShadow=!0,R.add(he),he}function y(R,I,N,B,L,Z,he,W=h.steel,j=Math.min(I,N,B)*.13){if(m.includes(W)&&I>6&&N>6){let ee=Math.min(I,N)*.18,se=new hs;se.moveTo(-I/2+ee,N/2),se.lineTo(I/2-ee,N/2),se.lineTo(I/2,N/2-ee),se.lineTo(I*.44,-N/2+ee),se.lineTo(I*.3,-N/2),se.lineTo(-I*.3,-N/2),se.lineTo(-I*.44,-N/2+ee),se.lineTo(-I/2,N/2-ee),se.closePath();let z=new rr(se,{depth:B-.7,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.35,bevelThickness:.35});z.translate(0,0,-(B-.7)/2);let ue=z.getAttribute("uv");for(let Y=0;Y<ue.count;Y++)ue.setXY(Y,ue.getX(Y)/I+.5,ue.getY(Y)/N+.5);return S(R,z,W,L,Z,he)}return S(R,new Jc(I,N,B,1,Math.min(j,I/3,N/3,B/3)),W,L,Z,he)}function w(R,I,N,B,L,Z,he,W){return S(R,new Zt(I,N,B),W,L,Z,he)}function b(R,I,N,B,L,Z,he=h.steel,W=10){return S(R,new Ui(I,I,N,W),he,B,L,Z)}function A(R,I,N,B,L,Z){return S(R,new Oi(I,10,6),Z,N,B,L)}function P(R,I,N,B,L=h.steel){let Z=new F(...I),he=new F(...N),W=he.clone().sub(Z),j=b(R,B,W.length(),...Z.add(he).multiplyScalar(.5).toArray(),L,8);return j.quaternion.setFromUnitVectors(new F(0,1,0),W.normalize()),j}function O(R,I,N=.8,B=h.rubber){return S(R,new ua(new ir(I.map(L=>new F(...L))),12,N,5,!1),B)}function V(R,I,N,B,L,Z){let he=new hs;he.moveTo(0,0),he.lineTo(5*L,9),he.lineTo(11*L,19),he.lineTo(7*L,3),he.closePath();let W=new rr(he,{depth:2,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.4,bevelThickness:.4});return S(R,W,Z,I,N,B)}function H(R,I,N,B,L,Z){for(let he of[-1,1])for(let W of[-1,1]){let j=b(R,.65,.45,B+he*I*.37,L+W*N*.36,Z,h.silver,6);j.rotation.x=Math.PI/2}}function k(R,I,N,B,L,Z){y(R,I,N,.5,B,L,Z,h.black,.1);for(let he=0;he<4;he++)w(R,I*.83,.35,.65,B,L-N*.3+he*N*.2,Z-.3,h.steel)}function $(R){R.updateMatrixWorld(!0);let I=R.matrixWorld.clone().invert(),N=new Map,B=[];R.traverse(L=>{if(!L.isMesh)return;let Z=L.geometry.clone().applyMatrix4(I.clone().multiply(L.matrixWorld)),he=L.material;if(e&&!he.transparent&&(he.map===l||!he.map)&&he.isMeshStandardMaterial){let W=he.emissiveIntensity>1&&he.emissive?.getHex()!==0,j=W?"glow":"metal";if(!s.has(j)){let z=W?new Ct({vertexColors:!0,toneMapped:!1}):new qt({vertexColors:!0,map:l,roughness:.58,metalness:.4});s.set(j,z),t.push(z)}let ee=new Float32Array(Z.attributes.position.count*3),se=he.color;for(let z=0;z<ee.length;z+=3)ee[z]=se.r,ee[z+1]=se.g,ee[z+2]=se.b;Z.setAttribute("color",new wt(ee,3)),he=s.get(j)}N.has(he)||N.set(he,[]),N.get(he).push(Z),B.push(L)});for(let L of B)L.removeFromParent(),L.geometry.dispose();for(let[L,Z]of N){let he=Zc(Z);S(R,he,L),Z.forEach(W=>W.dispose())}}function ae(R,I=2){let N=new gt;R.add(N);let B=[16,24,33,48,30,35,31,43,29,42,26,40][I];y(N,5,6,B,0,0,0,h.black,.7),y(N,5.5,2.8,B*.65,0,3.1,2,h.hull,.5),y(N,4.5,4,7,0,0,B*.5+3,h.rubber),y(N,3,9,5,0,-6,3,h.black,.4).rotation.x=-.22;let L=y(N,3.3,8,5,0,-6,-5,h.steel,.4);L.rotation.x=.12,L.name="magazine";let Z=b(N,1.2,12,0,1,-B*.5-5,h.black);Z.rotation.x=Math.PI/2;let he=b(N,1.9,3,0,1,-B*.5-11,h.steel);he.rotation.x=Math.PI/2;for(let j=0;j<7;j++)w(N,4.9,.6,1,0,5,-B*.3+j*2,h.steel),w(N,.3,1.2,1.3,2.6,0,-B*.3+j*2,h.silver);if(w(N,.2,.5,9,2.85,2,0,M),y(N,1,2.5,4,3.1,1,7,h.warm,.2),H(N,3,4,0,0,B*.5+.2),I===3||I===9){let j=b(N,2.6,15,0,9,-2,h.black,14);j.rotation.x=Math.PI/2;for(let se of[-10,6]){let z=b(N,3.2,2,0,9,se,h.steel,14);z.rotation.x=Math.PI/2}let ee=b(N,2.4,.3,0,9,7.2,v[3],16);ee.rotation.x=Math.PI/2,P(N,[0,4,-6],[0,8,-6],1.2)}else y(N,2.3,2.5,3,0,6.2,-4,h.black,.3),w(N,1.3,.6,.4,0,7,-2.3,M);let W=v[[0,0,0,3,5,2,1,5,4,3,1,4][I]];if(I===5){for(let j of[-1,1])for(let ee=0;ee<3;ee++)y(N,1,2,6,j*3.2,2,-9+ee*8,ee===1?W:h.steel,.2);y(N,7,5,9,0,-2,10,h.hull,.6)}if(I===6||I===8||I===11){for(let j=0;j<4;j++){let ee=S(N,new ds(I===11?4:3,.55,6,16),j%2?h.silver:W,0,1,-10-j*4);ee.rotation.z=j*.4}for(let j of[-1,1])y(N,2,3,22,j*4,1,-13,h.steel,.5),w(N,.4,1,16,j*5.1,1,-13,W);y(N,4,5,8,0,0,9,W,.5)}if(I===7){y(N,12,10,13,0,-4,7,h.black,1);for(let j of[-1,1]){let ee=b(N,6.5,5,j*7,-4,7,h.steel,16);ee.rotation.z=Math.PI/2}for(let j=0;j<6;j++){let ee=j*Math.PI/3,se=Math.cos(ee)*3,z=1+Math.sin(ee)*3,ue=b(N,.8,24,se,z,-26,h.black,10);ue.rotation.x=Math.PI/2}for(let j of[-17,-32]){let ee=b(N,4.4,2,0,1,j,h.steel,16);ee.rotation.x=Math.PI/2}w(N,1,1,12,3.5,3,7,W)}if(I===9){y(N,5,2,24,0,-3,-15,h.steel,.3);for(let j of[-1,1])P(N,[j*2,-3,-16],[j*5,-12,-23],.65,h.black)}if(I===10){for(let j of[-1,1]){b(N,2,12,j*4,0,3,W,12);for(let ee of[-6,6])b(N,2.4,1.2,j*4,ee,3,h.steel,12);O(N,[[j*4,6,3],[j*6,8,-5],[j*3,4,-13]],.6,h.black)}y(N,6,2,14,0,5,4,h.hull,.4)}if(I===11){for(let j of[-1,1])y(N,3,7,26,j*5,0,-20,h.hull,.6),w(N,.4,4,21,j*6.6,0,-20,W);A(N,4.2,0,1,-9,W),y(N,9,9,12,0,-2,12,h.black,1)}if(I===4){let j=b(N,2.3,13,0,-3,-12,h.rubber);j.rotation.x=Math.PI/2;for(let ee=0;ee<6;ee++)w(N,4.2,.6,.5,0,-5,-17+ee*2,h.steel)}return N}function K(R,I,N=I===3?3:I===0?1:2){let B=new gt,L=new gt,Z=new gt,he=[],W=[];B.name=`hero-${I}-slot-${R}`,B.add(L,Z);let j=m[I],ee=v[I],se=I===2?1.22:I===0?.83:I===5?1.08:1;b(L,5,24,0,34,1,h.black);for(let Y=0;Y<4;Y++)y(L,15*se,3,13,0,27+Y*4,1,h.steel,.5);y(L,26*se,20,16,0,46,1,h.black,2);for(let Y of[-1,1]){let ye=y(L,13*se,15,5,Y*7*se,47,-9,j,1.4);ye.rotation.z=Y*-.12,H(L,11*se,12,Y*8*se,47,-12),y(L,5,13,12,Y*15*se,43,1,j,.8),O(L,[[Y*12,52,8],[Y*16,55,13],[Y*18,44,14],[Y*12,34,9]],1.15)}y(L,11,6,3,0,37,-10,j,.8),k(L,9,5,0,44,-12.6),w(L,8,1,1,0,53,-12,ee),y(L,22*se,8,15,0,31,0,h.black,1);for(let Y of[-1,1])y(L,9*se,8,4,Y*6*se,31,-8,j,.7).rotation.z=Y*.12;y(L,20,23,9,0,44,14,h.black,1.4),y(L,16,18,2,0,44,19,j,.7),k(L,9,8,0,44,20.3),w(L,12,2,1,0,53,20.2,g[Math.floor(R/5)]),Z.position.y=64,Z.scale.setScalar(I===2?.75:.65),b(Z,5,7,0,-10,0,h.steel),y(Z,20*se,17,18,0,0,0,j,2),y(Z,19*se,8,3,0,0,-9,h.black,.7),y(Z,16*se,2.3,1,0,0,-11,ee,.3),y(Z,12,5,6,0,-7,-7,h.black,.7);for(let Y of[-1,1]){y(Z,3.5,9,5,Y*9*se,-4,-7,j,.6);let ye=b(Z,3.7,3,Y*11*se,0,0,h.black,12);ye.rotation.z=Math.PI/2;let Ne=b(Z,2.3,3.3,Y*11*se,0,0,h.steel,12);Ne.rotation.z=Math.PI/2,H(Z,17*se,14,0,0,9.2)}y(Z,11,2,9,0,9,0,h.steel,.4);for(let Y of[-1,1]){y(Z,2,5,4,Y*7,-5,-10,h.steel,.3).rotation.z=Y*.25;let ye=b(Z,.7,.4,Y*6,6,-9.7,h.silver,6);ye.rotation.x=Math.PI/2}if(I===0)for(let Y of[-1,1])V(Z,Y*8,5,0,Y,j),V(L,Y*16,49,5,Y,j),y(L,4,19,15,Y*14,44,13,h.black,.6),w(L,2,8,1,Y*14,47,21,ee);if(I===1){for(let Y of[-1,1])y(L,7,24,9,Y*9,43,18,j,1.2),w(L,2,13,1,Y*9,44,23,ee);w(L,3,10,1,0,48,-13,ee),w(L,9,3,1,0,48,-13.2,ee)}if(I===2){y(L,34,8,22,0,55,1,j,1.4);for(let Y of[-1,1])y(L,16,16,25,Y*23,52,0,j,2),y(L,15,7,22,Y*23,43,0,h.steel,1),H(L,13,12,Y*23,52,-13),O(L,[[Y*14,57,2],[Y*19,64,8],[Y*25,59,10],[Y*27,50,8]],1.4)}if(I===3){y(Z,21,12,5,0,1,-10,h.black,1);let Y=b(Z,5,3,5,1,-13,h.steel,16);Y.rotation.x=Math.PI/2;let ye=b(Z,3.7,3.4,5,1,-13,ee,18);ye.rotation.x=Math.PI/2,y(Z,6,3,2,-6,0,-13,ee,.5),P(L,[-9,47,17],[-9,77,17],1.2,h.black),y(L,4,18,4,-9,68,17,j,.5)}if(I===4){for(let Y of[-1,1])P(Z,[Y*8,5,0],[Y*10,25,1],.7,h.steel),w(Z,1,6,1,Y*10,23,1,ee);y(L,9,10,2,0,45,-13,h.black,.5);for(let Y=0;Y<3;Y++)w(L,6,.6,.5,0,42+Y*2,-14.2,ee)}if(I===5)for(let Y of[-1,1]){b(L,4.4,29,Y*10,49,17,h.black,14);for(let ye of[36,45,58,63])b(L,5.2,2,Y*10,ye,17,ye===58?ee:h.steel,14);b(L,3.5,6,Y*10,63,17,ee,14),O(L,[[Y*10,34,17],[Y*16,29,17],[Y*17,35,9]],1.2)}for(let Y of[-1,1]){let _=function(J,U,te,re){let Q=new F(...U).sub(new F(...J)),oe=Q.length(),_e=new gt;return _e.position.fromArray(J),_e.quaternion.setFromUnitVectors(new F(0,-1,0),Q.normalize()),L.add(_e),b(_e,2,oe,0,-oe/2,0,h.silver),y(_e,te,Math.min(13,oe*.7),re,0,-oe*.48,-1,j,.6),P(_e,[te*.45,-2,2],[te*.45,-oe+2,2],.8,h.silver),k(_e,te*.65,4,0,-oe*.4,-re*.5-1.4),_e},ye=new gt;ye.position.set(Y*7.5,31,0),B.add(ye),A(ye,4.2,0,-1,0,h.black),P(ye,[0,-2,0],[0,-13,0],2,h.silver),y(ye,9*se,14,10,0,-8,0,j,1);let Ne=b(ye,3.7,12*se,0,-17,0,h.black);Ne.rotation.z=Math.PI/2,y(ye,8*se,6,3,0,-17,-6,j,.6),y(ye,7*se,13,8,0,-24,0,j,.7),P(ye,[Y*4,-17,2],[Y*4,-29,2],.8,h.silver),y(ye,10*se,5,17,0,-30,-4,h.black,.8),y(ye,9*se,3,10,0,-28,-7,j,.7),w(ye,5,.8,.5,0,-22,-5,ee);for(let J of[-1,1])y(ye,2,11,6,J*4.2,-8,0,h.black,.4),P(ye,[J*3.6,-19,2],[J*3.6,-28,2],.65,h.silver);for(let J=0;J<3;J++)y(ye,2.2,2,5,-2.5+J*2.5,-28.6,-11,j,.3);$(ye),he.push(ye);let D=[Y*(I===2?25:18)*se,49,0],Ze=[Y*16*se,34,-15],We=Y===1?[0,34,-21]:[0,35,-31];A(L,4.2,...D,h.black);let C=y(L,11*se,8,14,...D,j,1);C.rotation.z=Y*-.18,_(D,Ze,7*se,8),A(L,3.5,...Ze,h.black),_(Ze,We,8*se,9);let q=new gt;q.position.fromArray(We),L.add(q),y(q,6,4,6,0,0,0,h.black,.6),y(q,5,1.3,5,0,2,0,j,.3);for(let J=0;J<4;J++){let U=-2.1+J*1.4;y(q,1.1,3,2,U,-2,-2.5,h.steel,.2),y(q,1.1,1.3,3,U,-3.7,-1.4,h.black,.2)}y(q,1.4,3.5,2,3,-1,0,h.steel,.3)}let z=ae(L,N);z.position.set(0,40,-24),z.rotation.x=0,z.rotation.y=0,$(L),$(Z),B.traverse(Y=>{Y.castShadow=!1});let ue=S(B,new En(48*se,44),x,0,.24,0);return ue.rotation.x=-Math.PI/2,ue.castShadow=!1,{rig:B,torso:L,head:Z,legs:he,hero:I,slot:R,weapon:N}}function de(R,I=0){let N=new gt;ae(N,R).scale.setScalar(1.1);for(let L of[-1,1])y(N,6,6,15,L===1?4:-5,-9,L===1?10:-3,m[I],1),y(N,5,5,7,L===1?3:-4,-6,L===1?5:-9,h.black,.6);return $(N),N.traverse(L=>{L.castShadow=!1}),N.position.set(9,-9,-23),N.scale.setScalar(.55),N}function ce(R){let I=new gt,N=v[[2,0,3,5,4,3,1,2,0,5,1,0][R]];if(R===0){for(let B of[-1,1])y(I,11,23,4,B*5.8,0,0,m[2],1);y(I,18,8,5,0,-12,0,h.black,1);for(let B of[-1,1])H(I,8,18,B*6,0,-2.4),w(I,6,.6,.3,B*6,6,-2.7,N)}else if(R===6||R===11){b(I,4,21,0,0,0,h.black,16),b(I,3.4,15,0,0,0,N,16);for(let B of[-11,10])b(I,4.5,3,0,B,0,h.steel,16);for(let B of[-1,1])y(I,2,17,3,B*3.6,0,0,h.hull,.4);if(R===6)b(I,.4,7,0,-16,0,h.silver,8),y(I,12,2,4,0,13,0,h.black,.3);else for(let B of[-1,1])b(I,1,5,B*2.2,13,0,h.silver,8)}else if(R===7||R===8||R===9){y(I,15,19,4,0,0,0,h.black,.8),y(I,12,16,1,0,0,-2.6,R===7?m[2]:h.hull,.3);for(let B=0;B<4;B++){w(I,8,.7,.5,0,-5+B*3,-3.3,N);for(let L of[-1,1])w(I,2,1.2,2,L*8,-6+B*4,0,h.silver)}H(I,12,16,0,0,-3)}else if(R===5||R===10){y(I,13,6,13,0,0,0,h.hull,1),A(I,4,0,4,0,N);for(let B of[-1,1])P(I,[B*4,0,0],[B*12,-5,B*7],1.2,h.steel),y(I,7,2,8,B*12,-5,B*7,h.black,.4),P(I,[B*4,0,0],[B*12,-5,-B*7],1.2,h.steel),y(I,7,2,8,B*12,-5,-B*7,h.black,.4);P(I,[0,5,0],[0,18,0],.7,h.steel),A(I,1.2,0,18,0,N)}else{b(I,5,18,0,0,0,h.black,12);for(let B of[-9,-4,4,9])b(I,5.4,1.3,0,B,0,B===-4||B===4?N:h.steel,12);for(let B=0;B<6;B++){let L=B*Math.PI/3;y(I,2.1,12,2.1,Math.cos(L)*4.6,0,Math.sin(L)*4.6,h.hull,.4)}y(I,5,4,5,0,11,0,h.steel,.4),P(I,[2,12,0],[6,6,0],.8,h.silver)}return $(I),I}function pe(R){let I=new gt,N=ae(I,R),B=N.getObjectByName("magazine");return B?.removeFromParent(),$(I),B&&(I.add(B),I.userData.magazineName="magazine"),I}function ge(R,I="#8deaff",N=512,B=128){let L=document.createElement("canvas");L.width=N,L.height=B;let Z=L.getContext("2d");Z.fillStyle="#09141c",Z.fillRect(0,0,N,B),Z.fillStyle=I,Z.font="700 54px monospace",Z.textAlign="center",Z.textBaseline="middle",Z.fillText(R,N/2,B/2),Z.globalAlpha=.6,Z.fillRect(10,10,N-20,3),Z.fillRect(10,B-13,N-20,3);let he=new Yn(L);he.colorSpace=At,n.push(he);let W=new qt({map:he,emissiveMap:he,emissive:I,emissiveIntensity:1.3,roughness:.5,metalness:.1,side:Qt});return t.push(W),W}function Le(R,I,N,B,L,Z=100,he=24,W="#85eaff",j=0){let ee=S(R,new En(Z,he),ge(I,W),N,B,L);return ee.rotation.y=j,ee}for(let R of["metal","glow"])if(e&&!s.has(R)){let I=R==="glow"?new Ct({vertexColors:!0,toneMapped:!1}):new qt({vertexColors:!0,map:l,roughness:.58,metalness:.4});s.set(R,I),t.push(I)}let Ce=t.length,tt=n.length;function Ke(R,I,N){for(let L of t.splice(Ce))L.dispose();for(let L of n.splice(tt))L.dispose();r=2050+N;let B=I.extent;w(R,B*2+40,10,B*2+40,0,-5,0,h.floor);for(let L=-B+80;L<B;L+=160)for(let Z of[-1,1])w(R,35,.18,5,Z*(B-65),.12,L,h.warm),w(R,35,.18,5,Z*(B-65),.12,L+16,h.warm);I.obstacles.forEach((L,Z)=>{let he=L.max[0]-L.min[0],W=L.max[1],j=L.max[2]-L.min[2],ee=(L.min[0]+L.max[0])/2,se=(L.min[2]+L.max[2])/2;w(R,he,W,j,ee,W/2,se,N===2?h.hull:h.container);for(let z of[-1,1]){let ue=se+z*(j/2+.08);for(let ye=-he/2+8;ye<he/2-5;ye+=16)w(R,2.5,W-12,.6,ee+ye,W/2,ue,h.steel);w(R,he-8,5,.8,ee,5,ue,h.black),w(R,he-8,4,.8,ee,W-4,ue,h.black),w(R,he-16,1.3,1,ee,W-10,ue,Z%3?M:p);let Y=Le(R,`${N===0?"NDC":N===1?"SKY":"RX9"} / ${String(Z+1).padStart(2,"0")}`,ee,W*.59,ue+z*.7,Math.min(he*.55,98),Math.min(23,W*.24),Z%3?"#8be7f1":"#ffb56f",z<0?Math.PI:0);for(let ye of[-1,1])w(R,4,Math.min(24,W*.3),1,ee+ye*(he*.5-12),W*.3,ue,h.warm)}for(let z of[-1,1]){let ue=ee+z*(he/2+.1);for(let Y=-j/2+12;Y<j/2-5;Y+=22)w(R,.6,W-12,2.5,ue,W/2,se+Y,h.black);w(R,1,1.3,j-12,ue,W-10,se,M)}for(let z=-he/2+12;z<he/2-4;z+=24)w(R,2,.5,j-8,ee+z,W+.1,se,h.black)});for(let L of[-1,1]){w(R,B*2,100,20,0,50,L*(B+10),h.hull),w(R,20,100,B*2,L*(B+10),50,0,h.hull);for(let Z=-B;Z<=B;Z+=100)P(R,[Z,104,L*(B+10)],[Z,136,L*(B+10)],2),P(R,[L*(B+10),104,Z],[L*(B+10),136,Z],2);P(R,[-B,137,L*(B+10)],[B,137,L*(B+10)],2),P(R,[L*(B+10),137,-B],[L*(B+10),137,B],2),w(R,B*2,2,2,0,101,L*(B-1),M),w(R,2,2,B*2,L*(B-1),101,0,M)}for(let L=0;L<62;L++){let Z=L*2.39996,he=B+330+L%4*360,W=Math.sin(Z)*he,j=Math.cos(Z)*he,ee=110+a()*150,se=100+a()*130,z=260+a()*1300;w(R,ee,z,se,W,z/2-90,j,h.hull),w(R,ee*.7,50,se*.7,W,z-70,j,h.black),P(R,[W,z-50,j],[W,z+60+a()*100,j],2,h.steel),A(R,3,W,z+65,j,L%3?p:M);for(let ue=25;ue<z-110;ue+=26)for(let Y=-ee/2+10;Y<ee/2-8;Y+=18)a()>.35&&(S(R,new En(7,9),a()>.77?p:M,W+Y,ue,j-se/2-.4).rotation.y=Math.PI,S(R,new En(7,9),a()>.77?p:M,W+Y,ue,j+se/2+.4));for(let ue=-se/2+10;ue<se/2-8;ue+=21)w(R,.5,z*.6,2,W+ee/2+.3,z*.4,j+ue,L%3?h.steel:M);if(L%7===0){let ue=S(R,new ds(ee*.7,2,5,32),M,W,z*.7,j);ue.rotation.x=Math.PI/2,w(R,8,z*.3,8,W+ee*.5,z*.6,j,p)}}if(N===0){for(let L of[-1,1]){let Z=L*(B+190);for(let he of[-700,700]){for(let W of[-65,65])P(R,[Z+W,-45,he],[Z+W,530,he],12,h.steel),P(R,[Z-65,0,he],[Z+65,260,he],5,h.steel),P(R,[Z+65,260,he],[Z-65,510,he],5,h.steel);w(R,500,22,30,Z+L*140,535,he,h.container);for(let W=-100;W<=300;W+=55)P(R,[Z+L*W,535,he],[Z+L*(W+55),585,he],3,h.steel),P(R,[Z+L*W,585,he],[Z+L*(W+55),535,he],3,h.steel);P(R,[Z-100,585,he],[Z+450,585,he],4,h.steel),P(R,[Z+L*180,535,he],[Z+L*180,200,he],1.1,h.black),w(R,34,15,12,Z+L*180,193,he,p)}for(let he=-1e3;he<1100;he+=180){w(R,150,50,130,Z,-25,he,h.container);for(let W=-60;W<=60;W+=15)w(R,2,46,132,Z+W,-25,he,h.steel)}}Le(R,"NEON DOCKS  /  07",0,185,-B-14,420,44,"#ffaa67")}else if(N===1){for(let L of[-1,1]){for(let Z of[-600,300,900]){let he=L*(B+150);b(R,70,280,he,60,Z,h.steel,20);for(let W of[60,140,220]){let j=S(R,new ds(110,3,6,32),M,he,W,Z);j.rotation.x=Math.PI/2}P(R,[he,-70,Z],[he,520,Z],4,h.steel),A(R,6,he,530,Z,p)}w(R,170,B*.12,B*2,L*(B+300),-80,0,h.hull)}Le(R,"SKYLINE ARRAY",0,190,-B-14,400,48,"#bba2ff")}else{for(let L of[-1,1])for(let Z of[-B-160,B+160]){b(R,100,420,Z,140,L*550,h.hull,24);for(let he of[0,120,240,350])b(R,105,8,Z,he,L*550,p,24);O(R,[[Z,340,L*550],[Z,460,L*550],[0,460,L*(B+160)]],15,h.steel)}Le(R,"REACTOR NINE",0,200,-B-14,400,48,"#ffb060")}for(let L=0;L<2;L++){let Z=I.sites[L],he=S(R,new ha(112,115,48),L?p:M,Z[0],.35,Z[2]);he.rotation.x=-Math.PI/2}$(R),R.updateMatrixWorld(!0),R.traverse(L=>{L.matrixAutoUpdate=!1,L.material?.emissiveIntensity>1&&(L.castShadow=!1)})}function je(){t.forEach(R=>R.dispose()),n.forEach(R=>R.dispose())}return{m:h,armor:m,glow:v,team:g,robot:K,gun:de,equipment:ce,weaponModel:pe,sign:ge,dressMap:Ke,plate:y,beam:P,bake:$,dispose:je}}function lp(i,e=2400,{mobile:t=!1}={}){let n=new ct(new Oi(8e3,24,12),new $t({side:zt,depthWrite:!1,uniforms:{},vertexShader:"varying vec3 vPos;void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec3 vPos;float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}void main(){vec3 d=normalize(vPos);float h=max(d.y,0.);vec2 p=d.xz/(.4+h)*4.;float n=noise(p)*.5+noise(p*2.)*.25+noise(p*4.)*.125;vec3 c=mix(vec3(.055,.12,.17),vec3(.006,.014,.029),pow(h,.5));c+=n*vec3(.045,.065,.075)*smoothstep(.0,.2,h);c+=pow(max(0.,1.-abs(d.x+.6)*1.1),7.)*.025*vec3(1.,.45,.2);gl_FragColor=vec4(c,1.);}"}));t&&(n.material.fragmentShader="varying vec3 vPos;void main(){float h=max(normalize(vPos).y,0.);gl_FragColor=vec4(mix(vec3(.055,.12,.17),vec3(.006,.014,.029),sqrt(h)),1.); }"),n.frustumCulled=!1,i.add(n);let s=99,r=()=>(s=Math.imul(s,1664525)+1013904223>>>0,s/4294967296),a=new Float32Array(1800*3);for(let u=0;u<a.length;u+=3)a[u]=(r()-.5)*e*2,a[u+1]=r()*650,a[u+2]=(r()-.5)*e*2;let o=new yt;o.setAttribute("position",new wt(a,3));let l=new $t({transparent:!0,depthWrite:!1,uniforms:{time:{value:0}},vertexShader:"uniform float time;varying float alpha;void main(){vec3 p=position;p.y=mod(p.y-time*280.,650.);vec4 mv=modelViewMatrix*vec4(p,1.);alpha=clamp(1.-length(mv.xyz)/2800.,0.,1.)*.2;gl_PointSize=clamp(1100./-mv.z,1.,3.);gl_Position=projectionMatrix*mv;}",fragmentShader:"varying float alpha;void main(){gl_FragColor=vec4(.55,.8,.92,alpha);}"}),c=new di(o,l);return c.frustumCulled=!1,i.add(c),{frame(u,d,h){c.visible=!t&&!d&&!h,l.uniforms.time.value=u/1e3},dispose(){i.remove(n,c),n.geometry.dispose(),n.material.dispose(),o.dispose(),l.dispose()}}}function $c(i){let e=new Map,t=new Map,n=i.clone();return hp(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function hp(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)hp(i.children[n],e.children[n],t)}var Qc=class extends Zn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Zh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new ou(t)}),this.register(function(t){return new cu(t)}),this.register(function(t){return new lu(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new iu(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new su(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new au(t)}),this.register(function(t){return new ru(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new el(t,at.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new el(t,at.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new hu(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=_i.extractUrlBase(e);a=_i.resolveURL(c,this.path)}else a=_i.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new ar(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===mp){try{a[at.KHR_BINARY_GLTF]=new uu(e)}catch(d){s&&s(d);return}r=JSON.parse(a[at.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new xu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case at.KHR_MATERIALS_UNLIT:a[d]=new Yh;break;case at.KHR_DRACO_MESH_COMPRESSION:a[d]=new du(r,this.dracoLoader);break;case at.KHR_TEXTURE_TRANSFORM:a[d]=new fu;break;case at.KHR_MESH_QUANTIZATION:a[d]=new pu;break;default:h.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function Lv(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Nt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var at={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Kh=class{constructor(e){this.parser=e,this.name=at.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new qe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],sn);let d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new zi(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new xi(u),c.distance=d;break;case"spot":c=new xa(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),ni(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Yh=class{constructor(){this.name=at.KHR_MATERIALS_UNLIT}getMaterialType(){return Ct}extendParams(e,t,n){let s=[];e.color=new qe(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],sn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,At))}return Promise.all(s)}},Jh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Zh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new we(r,r)}return Promise.all(s)}},$h=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Qh=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},eu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SHEEN}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new qe(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],sn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,At)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},tu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},nu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_VOLUME}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new qe().setRGB(r[0],r[1],r[2],sn),Promise.all(s)}},iu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IOR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},su=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new qe().setRGB(r[0],r[1],r[2],sn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,At)),Promise.all(s)}},ru=class{constructor(e){this.parser=e,this.name=at.EXT_MATERIALS_BUMP}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},au=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?cn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},ou=class{constructor(e){this.parser=e,this.name=at.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},cu=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},lu=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},el=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=s.byteOffset||0,c=s.byteLength||0,u=s.count,d=s.byteStride,h=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,d,h,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(u*d);return a.decodeGltfBuffer(new Uint8Array(f),u,d,h,s.mode,s.filter),f})})}else return null}},hu=class{constructor(e){this.name=at.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==wn.TRIANGLES&&c.mode!==wn.TRIANGLE_STRIP&&c.mode!==wn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,f=[];for(let m of d){let v=new et,g=new F,p=new It,M=new F(1,1,1),T=new cs(m.geometry,m.material,h);for(let S=0;S<h;S++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,S),l.SCALE&&M.fromBufferAttribute(l.SCALE,S),T.setMatrixAt(S,v.compose(g,p,M));let x=null;for(let S in l)if(S==="_COLOR_0"){let y=l[S];T.instanceColor=new ui(y.array,y.itemSize,y.normalized)}else if(S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"){if(x===null){let w=T.geometry;x=new yt,x.name=w.name;for(let b in w.attributes)x.setAttribute(b,w.attributes[b]);for(let b in w.morphAttributes)x.morphAttributes[b]=w.morphAttributes[b];w.index!==null&&x.setIndex(w.index),x.morphTargetsRelative=w.morphTargetsRelative;for(let b of w.groups)x.addGroup(b.start,b.count,b.materialIndex);w.boundingBox!==null&&(x.boundingBox=w.boundingBox.clone()),w.boundingSphere!==null&&(x.boundingSphere=w.boundingSphere.clone()),x.drawRange.start=w.drawRange.start,x.drawRange.count=w.drawRange.count,x.userData=Object.assign({},w.userData),T.geometry=x}let y=l[S];x.setAttribute(S,new ui(y.array,y.itemSize,y.normalized))}Et.prototype.copy.call(T,m),this.parser.assignFinalMaterial(T),f.push(T)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},mp="glTF",Ua=12,up={JSON:1313821514,BIN:5130562},uu=class{constructor(e){this.name=at.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Ua),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==mp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Ua,r=new DataView(e,Ua),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===up.JSON){let c=new Uint8Array(e,Ua+a,o);this.content=n.decode(c)}else if(l===up.BIN){let c=Ua+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},du=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=at.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let u in a){let d=gu[u]||u.toLowerCase();o[d]=a[u]}for(let u in e.attributes){let d=gu[u]||u.toLowerCase();if(a[u]!==void 0){let h=n.accessors[e.attributes[u]],f=vr[h.componentType];c[d]=f.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){s.decodeDracoFile(u,function(f){for(let m in f.attributes){let v=f.attributes[m],g=l[m];g!==void 0&&(v.normalized=g)}d(f)},o,c,sn,h)})})}},fu=class{constructor(){this.name=at.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},pu=class{constructor(){this.name=at.KHR_MESH_QUANTIZATION}},tl=class extends Jn{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=s-t,d=(n-t)/u,h=d*d,f=h*d,m=e*c,v=m-c,g=-2*f+3*h,p=f-h,M=1-g,T=p-h+d;for(let x=0;x!==o;x++){let S=a[v+x+o],y=a[v+x+l]*u,w=a[m+x+o],b=a[m+x]*u;r[x]=M*S+T*y+g*w+p*b}return r}},Dv=new It,mu=class extends tl{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return Dv.fromArray(r).normalize().toArray(r),r}},wn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},vr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},dp={9728:Lt,9729:Dt,9984:ec,9985:hr,9986:bs,9987:kn},fp={33071:Mn,33648:Ws,10497:Xn},qh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},gu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Wi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Nv={CUBICSPLINE:void 0,LINEAR:ss,STEP:is},Xh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Fv(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new qt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:$n})),i.DefaultMaterial}function vs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ni(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Uv(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){let d=e[c];if(n){let h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;a.push(h)}if(s){let h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;o.push(h)}if(r){let h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;l.push(h)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let u=c[0],d=c[1],h=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function Ov(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function kv(i){let e,t=i.extensions&&i.extensions[at.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+jh(t.attributes):e=i.indices+":"+jh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+jh(i.targets[n]);return e}function jh(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function bu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Bv(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var zv=new et,xu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Lv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new ma(this.options.manager):this.textureLoader=new _a(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ar(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return vs(r,o,s),ni(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,u]of a.children.entries())r(u,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[at.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(_i.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=qh[s.type],o=vr[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new wt(c,a,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=qh[s.type],c=vr[s.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0,v,g;if(f&&f!==d){let p=Math.floor(h/f),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,T=t.cache.get(M);T||(v=new c(o,p*f,s.count*f/u),T=new Js(v,f/u),t.cache.add(M,T)),g=new Zs(T,l,h%f/u,m)}else o===null?v=new c(s.count*l):v=new c(o,h,s.count*l),g=new wt(v,l,m);if(s.sparse!==void 0){let p=qh.SCALAR,M=vr[s.sparse.indices.componentType],T=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,S=new M(a[1],T,s.sparse.count*p),y=new c(a[2],x,s.sparse.count*l);o!==null&&(g=new wt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let w=0,b=S.length;w<b;w++){let A=S[w];if(g.setX(A,y[w*l]),l>=2&&g.setY(A,y[w*l+1]),l>=3&&g.setZ(A,y[w*l+2]),l>=4&&g.setW(A,y[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let h=(r.samplers||{})[a.sampler]||{};return u.magFilter=dp[h.magFilter]||Dt,u.minFilter=dp[h.minFilter]||kn,u.wrapS=fp[h.wrapS]||Xn,u.wrapT=fp[h.wrapT]||Xn,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Lt&&u.minFilter!==Dt,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let a=s.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(d){c=!0;let h=new Blob([d],{type:a.mimeType});return l=o.createObjectURL(h),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(d){return new Promise(function(h,f){let m=h;t.isImageBitmapLoader===!0&&(m=function(v){let g=new Bt(v);g.needsUpdate=!0,h(g)}),t.load(_i.resolveURL(d,r.path),m,void 0,f)})}).then(function(d){return c===!0&&o.revokeObjectURL(l),ni(d,a),d.userData.mimeType=a.mimeType||Bv(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[at.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[at.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[at.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Ni,rn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new tr,rn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return qt}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},l=r.extensions||{},c=[];if(l[at.KHR_MATERIALS_UNLIT]){let d=s[at.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),c.push(d.extendParams(o,r,t))}else{let d=r.pbrMetallicRoughness||{};if(o.color=new qe(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){let h=d.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],sn),o.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",d.baseColorTexture,At)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Qt);let u=r.alphaMode||Xh.OPAQUE;if(u===Xh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Xh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Ct&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new we(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==Ct&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Ct){let d=r.emissiveFactor;o.emissive=new qe().setRGB(d[0],d[1],d[2],sn)}return r.emissiveTexture!==void 0&&a!==Ct&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,At)),Promise.all(c).then(function(){let d=new a(o);return r.name&&(d.name=r.name),ni(d,r),t.associations.set(d,{materials:e}),r.extensions&&vs(s,d,r),d})}createUniqueName(e){let t=_t.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[at.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return pp(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],u=kv(c),d=s[u];if(d)a.push(d.promise);else{let h;c.extensions&&c.extensions[at.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=pp(new yt,c,t),c.mode===wn.TRIANGLE_STRIP?h=h.then(f=>Wh(f,Ca)):c.mode===wn.TRIANGLE_FAN&&(h=h.then(f=>Wh(f,fr))),s[u]={primitive:c,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let u=a[l].material===void 0?Fv(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let f=0,m=u.length;f<m;f++){let v=u[f],g=a[f],p,M=c[f];if(g.mode===wn.TRIANGLES||g.mode===wn.TRIANGLE_STRIP||g.mode===wn.TRIANGLE_FAN||g.mode===void 0){let T=r.isSkinnedMesh===!0,x=v.hasAttribute("skinIndex")&&v.hasAttribute("skinWeight");T&&x===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),p=T&&x?new Yr(v,M):new ct(v,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights()}else if(g.mode===wn.LINES)p=new Zr(v,M);else if(g.mode===wn.LINE_STRIP)p=new ls(v,M);else if(g.mode===wn.LINE_LOOP)p=new $r(v,M);else if(g.mode===wn.POINTS)p=new di(v,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&Ov(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),ni(p,r),g.extensions&&vs(s,p,g),t.assignFinalMaterial(p),d.push(p)}for(let f=0,m=d.length;f<m;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&vs(s,d[0],r),d[0];let h=new gt;r.extensions&&vs(s,h,r),t.associations.set(h,{meshes:e});for(let f=0,m=d.length;f<m;f++)h.add(d[f]);return h})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ot(Ia.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Bi(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ni(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],l=[];for(let c=0,u=a.length;c<u;c++){let d=a[c];if(d){o.push(d);let h=new et;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Jr(o,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],u=[];for(let d=0,h=s.channels.length;d<h;d++){let f=s.channels[d],m=s.samplers[f.sampler],v=f.target,g=v.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,M=s.parameters!==void 0?s.parameters[m.output]:m.output;v.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",M)),c.push(m),u.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){let h=d[0],f=d[1],m=d[2],v=d[3],g=d[4],p=[];for(let T=0,x=h.length;T<x;T++){let S=h[T],y=f[T],w=m[T],b=v[T],A=g[T];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();let P=n._createAnimationTracks(S,y,w,b,A);if(P)for(let O=0;O<P.length;O++)p.push(P[O])}let M=new bi(r,void 0,p);return ni(M,s),M})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,u=o.length;c<u;c++)a.push(n.getDependency("node",o[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,zv)});for(let f=0,m=d.length;f<m;f++)u.add(d[f]);if(u.userData.pivot!==void 0&&d.length>0){let f=u.userData.pivot,m=d[0];u.pivot=new F().fromArray(f),u.position.x-=f[0],u.position.y-=f[1],u.position.z-=f[2],m.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(r.isBone===!0?u=new $s:c.length>1?u=new gt:c.length===1?u=c[0]:u=new Et,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(r.name&&(u.userData.name=r.name,u.name=a),ni(u,r),r.extensions&&vs(n,u,r),r.matrix!==void 0){let d=new et;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new gt;n.name&&(r.name=s.createUniqueName(n.name)),ni(r,n),n.extensions&&vs(t,r,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,d=l.length;u<d;u++){let h=l[u];h.parent!==null?r.add($c(h)):r.add(h)}let c=u=>{let d=new Map;for(let[h,f]of s.associations)(h instanceof rn||h instanceof Bt)&&d.set(h,f);return u.traverse(h=>{let f=s.associations.get(h);f!=null&&d.set(h,f)}),d};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}Wi[r.path]===Wi.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let u;switch(Wi[r.path]){case Wi.weights:u=pi;break;case Wi.rotation:u=mi;break;case Wi.translation:case Wi.scale:u=ki;break;default:n.itemSize===1?u=pi:u=ki;break}let d=s.interpolation!==void 0?Nv[s.interpolation]:ss,h=this._getArrayFromAccessor(n);for(let f=0,m=l.length;f<m;f++){let v=new u(l[f]+"."+Wi[r.path],t.array,h,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),a.push(v)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=bu(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof mi?mu:tl;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Gv(i,e,t){let n=e.attributes,s=new fn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new F(l[0],l[1],l[2]),new F(c[0],c[1],c[2])),o.normalized){let u=bu(vr[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new F,l=new F;for(let c=0,u=r.length;c<u;c++){let d=r[c];if(d.POSITION!==void 0){let h=t.json.accessors[d.POSITION],f=h.min,m=h.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),h.normalized){let v=bu(vr[h.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new Jt;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function pp(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(let a in n){let o=gu[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return st.workingColorSpace!==sn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${st.workingColorSpace}" not supported.`),ni(i,e),Gv(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Uv(i,e.targets,t):i})}var gp=(function(){var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?o(e):o(i),r,a=WebAssembly.instantiate(s,{}).then(function(p){r=p.instance,r.exports.__wasm_call_ctors()});function o(p){for(var M=new Uint8Array(p.length),T=0;T<p.length;++T){var x=p.charCodeAt(T);M[T]=x>96?x-97:x>64?x-39:x+4}for(var S=0,T=0;T<p.length;++T)M[S++]=M[T]<60?n[M[T]]:(M[T]-60)*64+M[++T];return M.buffer.slice(0,S)}function l(p,M,T,x,S,y,w){var b=p.exports.sbrk,A=x+3&-4,P=b(A*S),O=b(y.length),V=new Uint8Array(p.exports.memory.buffer);V.set(y,O);var H=M(P,x,S,O,y.length);if(H==0&&w&&w(P,A,S),T.set(V.subarray(P,P+x*S)),b(P-b(0)),H!=0)throw new Error("Malformed buffer data: "+H)}var c={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},d=[],h=0;function f(p){var M={object:new Worker(p),pending:0,requests:{}};return M.object.onmessage=function(T){var x=T.data;M.pending-=x.count,M.requests[x.id][x.action](x.value),delete M.requests[x.id]},M}function m(p){for(var M="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(s)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+g.name+";"+l.toString()+g.toString(),T=new Blob([M],{type:"text/javascript"}),x=URL.createObjectURL(T),S=d.length;S<p;++S)d[S]=f(x);for(var S=p;S<d.length;++S)d[S].object.postMessage({});d.length=p,URL.revokeObjectURL(x)}function v(p,M,T,x,S){for(var y=d[0],w=1;w<d.length;++w)d[w].pending<y.pending&&(y=d[w]);return new Promise(function(b,A){var P=new Uint8Array(T),O=++h;y.pending+=p,y.requests[O]={resolve:b,reject:A},y.object.postMessage({id:O,count:p,size:M,source:P,mode:x,filter:S},[P.buffer])})}function g(p){var M=p.data;self.ready.then(function(T){if(!M.id)return self.close();try{var x=new Uint8Array(M.count*M.size);l(T,T.exports[M.mode],x,M.count,M.size,M.source,T.exports[M.filter]),self.postMessage({id:M.id,count:M.count,action:"resolve",value:x},[x.buffer])}catch(S){self.postMessage({id:M.id,count:M.count,action:"reject",value:S})}})}return{ready:a,supported:!0,useWorkers:function(p){m(p)},decodeVertexBuffer:function(p,M,T,x,S){l(r,r.exports.meshopt_decodeVertexBuffer,p,M,T,x,r.exports[c[S]])},decodeIndexBuffer:function(p,M,T,x){l(r,r.exports.meshopt_decodeIndexBuffer,p,M,T,x)},decodeIndexSequence:function(p,M,T,x){l(r,r.exports.meshopt_decodeIndexSequence,p,M,T,x)},decodeGltfBuffer:function(p,M,T,x,S,y){l(r,r.exports[u[S]],p,M,T,x,r.exports[c[y]])},decodeGltfBufferAsync:function(p,M,T,x,S){return d.length>0?v(p,M,T,u[x],c[S]):a.then(function(){var y=new Uint8Array(p*M);return l(r,r.exports[u[x]],y,p,M,T,r.exports[c[S]]),y})}}})();var Hv=["vector","patch","bastion","spectre","glitch","forge"],Vv=["idle","walk","run","backpedal","strafe_left","strafe_right","crouch","crouch_walk","jump","fall","land","fire","reload","equip","use_item","utility","skill","interact","hit","death_back","death_left","death_right","respawn","victory","defeat"],Wv=/^(root|hips|thigh|shin|foot)/,qv=i=>i.name.slice(0,i.name.lastIndexOf(".")),yr=new F,Xv=new It;function bp(i){let e=[],t=new Map,n=[3596287,16745311].map(m=>new Ct({color:m,toneMapped:!1})),s=new Zt(.09,.025,.035),r=document.createElement("canvas");r.width=r.height=64;let a=r.getContext("2d"),o=a.createRadialGradient(32,32,5,32,32,32);o.addColorStop(0,"rgba(0,0,0,.5)"),o.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=o,a.fillRect(0,0,64,64);let l=new Yn(r),c=new Ct({map:l,transparent:!0,depthWrite:!1}),u=new En(43,36);async function d(m=()=>{}){let v=new Qc().setMeshoptDecoder(gp);for(let g=0;g<6;g+=2)await Promise.all(Hv.slice(g,g+2).map(async(p,M)=>{let T=await fetch("./models/"+p+".glb",{signal:AbortSignal.timeout(6e4)});if(!T.ok)throw Error("Could not load "+p+" chassis. Please retry.");let x=await v.parseAsync(await T.arrayBuffer(),"./models/"),S=!1;if(x.scene.traverse(w=>{for(let b of w.material?Array.isArray(w.material)?w.material:[w.material]:[])b.map&&b.normalMap&&b.roughnessMap&&(S=!0)}),!S)throw Error("Could not load "+p+" chassis textures. Please retry.");let y=Object.fromEntries(x.animations.map(w=>[w.name.split("|").pop(),w]));for(let w of Vv)if(!y[w])throw Error(p+" is missing its "+w+" animation.");x.scene.traverse(w=>{w.isMesh&&(w.castShadow=!1,w.receiveShadow=!0,w.frustumCulled=!0,w.isSkinnedMesh&&(w.boundingSphere=new Jt(new F(0,1,0),2.5)))}),e[g+M]={model:x.scene,clips:y},m(e.filter(Boolean).length,6)}));for(let g=0;g<12;g++)t.set(g,i.weaponModel(g)),await new Promise(requestAnimationFrame)}function h(m,v,g=2,{firstPerson:p=!1}={}){let M=e[v];if(!M)throw Error("Chassis has not loaded");let T=new gt,x=$c(M.model);T.add(x),x.scale.setScalar(70/1.94);let S={};if(x.traverse(z=>{z.isBone&&(S[z.name]=z);for(let ue of["L","R"])for(let Y of["upper_arm","forearm","hand","thigh","shin","foot"])z.name===Y+ue&&(S[Y+"."+ue]=z)}),p&&x.traverse(z=>{if(!z.isSkinnedMesh)return;let ue=z.geometry.clone(),Y=ue.index.array,ye=ue.attributes.skinIndex,Ne=ue.attributes.skinWeight,D=[],Ze=new Set(z.skeleton.bones.map((_,q)=>/forearm|hand|weapon/.test(_.name)?q:-1)),We=_=>{let q=0;for(let J=0;J<4;J++)Ze.has(ye.getComponent(_,J))&&(q+=Ne.getComponent(_,J));return q>.8},C=[];for(let _ of ue.groups.length?ue.groups:[{start:0,count:Y.length,materialIndex:0}]){let q=D.length;for(let J=_.start;J<_.start+_.count;J+=3)We(Y[J])&&We(Y[J+1])&&We(Y[J+2])&&D.push(Y[J],Y[J+1],Y[J+2]);C.push({start:q,count:D.length-q,materialIndex:_.materialIndex})}ue.setIndex(D),ue.clearGroups(),C.forEach(_=>ue.addGroup(_.start,_.count,_.materialIndex)),z.geometry=ue,z.receiveShadow=!1}),!p){for(let ue of["L","R"]){let Y=new ct(s,n[m<5?0:1]);Y.position.set(0,.04,-.13),S["upper_arm."+ue].add(Y)}let z=new ct(u,c);z.rotation.x=-Math.PI/2,z.position.y=.15,T.add(z)}let y=null,w=null;function b(z){let ue=S["upper_arm.L"],Y=S["forearm.L"],ye=S["hand.L"];y=[ue,Y,ye].map(Ae=>({bone:Ae,position:Ae.position.clone(),quaternion:Ae.quaternion.clone()})),ue.position.x+=.15,x.updateMatrixWorld(!0);let Ne=ue.getWorldPosition(new F),D=Y.getWorldPosition(new F),Ze=ye.getWorldPosition(new F),We=x.localToWorld(z.clone()),C=Ne.distanceTo(D),_=D.distanceTo(Ze),q=We.clone().sub(Ne),J=Math.min(q.length(),(C+_)*.98),U=q.normalize(),te=(C*C-_*_+J*J)/(2*J),re=Math.sqrt(Math.max(0,C*C-te*te)),Q=new F(-.7,-1,.3).transformDirection(x.matrixWorld);Q.addScaledVector(U,-Q.dot(U)).normalize();let oe=Ne.clone().addScaledVector(U,te).addScaledVector(Q,re);function _e(Ae,Ee,Te){let De=Ae.getWorldPosition(new F),Xe=Ee.getWorldPosition(new F).sub(De).normalize(),Ue=Te.clone().sub(De).normalize(),G=new It().setFromUnitVectors(Xe,Ue),Se=Ae.getWorldQuaternion(new It);Ae.quaternion.copy(Ae.parent.getWorldQuaternion(new It).invert().multiply(G.multiply(Se))),Ae.updateMatrixWorld(!0)}_e(ue,Y,oe),_e(Y,ye,Ne.clone().addScaledVector(U,J))}let A=new va(x),P=new Map;function O(z,ue="full"){let Y=ue+":"+z;if(P.has(Y))return P.get(Y);let ye=M.clips[z],Ne=ue==="full"?ye:new bi(Y,ye.duration,ye.tracks.filter(Ze=>Wv.test(qv(Ze))===(ue==="lower"))),D=A.clipAction(Ne);return P.set(Y,D),D}let V=null,H=null,k=null,$=0,ae=0,K=null,de=null,ce=!1,pe=0,ge=g,Le=0,Ce=0,tt=null,Ke=0,je=null,R=0,I=null,N=null,B=new gt;x.add(B);function L(z){I&&B.remove(I),I=t.get(z).clone(!0),N=I.getObjectByName("magazine"),I.scale.setScalar(.016),B.add(I),ge=z}L(g);function Z(z,ue,Y=!0,ye=.12){return z===ue?z:(ue.reset().setEffectiveTimeScale(1).setEffectiveWeight(1),ue.setLoop(Y?Bc:kc,Y?1/0:1),ue.clampWhenFinished=!Y,ue.play(),z&&z.crossFadeTo(ue,ye,!1),ue)}function he(z,ue){A.stopAllAction(),V=H=k=null,$=ae=0,K=z.life,de=z.alive,ce=!1,pe=0,Le=0,V=Z(null,O("idle","lower")),H=Z(null,O("idle","upper")),Ce=ue}function W(z,ue,Y,ye){if(!M.clips[z]||de===!1)return;["utility","use_item"].includes(z)&&Number.isInteger(ye)&&ye>=0&&ye<12&&(je&&(je.removeFromParent(),je.traverse(Ze=>Ze.geometry?.dispose())),je=i.equipment(ye),je.scale.setScalar(.012),x.add(je),R=ue+900);let Ne=O(z,"upper");H===Ne?Ne.reset().play():H=Z(H,Ne,!1,z==="hit"?.045:.08);let D=Y||M.clips[z].duration;Ne.setEffectiveTimeScale(M.clips[z].duration/Math.max(.1,D)),$=ue+D*1e3}function j(z,ue,Y,ye,{reduced:Ne=!1}={}){if(K!==z.life||de===null){let D=K!==null&&z.alive;he(z,Y),D&&(de=!1)}if(tt!==ue.phase&&ue.phase!=="finished"&&ue.phase!=="round_end"&&ae===1/0&&z.alive&&(ae=0),tt=ue.phase,z.weapon!==ge&&(L(z.weapon),z.alive&&W("equip",Y,.4)),z.alive){de||(he(z,Y),k=Z(null,O("respawn"),!1,.1),V.fadeOut(.1),H.fadeOut(.1),ae=Y+850);let D=z.position[1]>1,Ze=z.velocity[1],We=Math.hypot(z.velocity[0],z.velocity[2]),C="idle";if(D)C=Ze>0?"jump":"fall";else if(z.crouch)C=We>12?"crouch_walk":"crouch";else if(We>12){let _=-z.velocity[0]*Math.sin(z.yaw)-z.velocity[2]*Math.cos(z.yaw),q=z.velocity[0]*Math.cos(z.yaw)-z.velocity[2]*Math.sin(z.yaw);C=Math.abs(q)>Math.abs(_)*1.4?q>0?"strafe_right":"strafe_left":_<-20?"backpedal":We>180?"run":"walk"}if(ce&&!D&&W("land",Y,.3),ce=D,ue.phase==="finished"||ue.phase==="round_end"){let _=Ne?"idle":ue.winner===z.team?"victory":"defeat";k=Z(k,O(_),!0,.25),V?.fadeOut(.15),H?.fadeOut(.15),ae=1/0}else k&&Y>=ae&&(k.fadeOut(.16),k=null,V?.reset().fadeIn(.16).play(),H?.reset().fadeIn(.16).play());k||(V=Z(V,O(C,"lower")),V.setEffectiveTimeScale(We>12&&!D?Ia.clamp(We/(C==="run"?250:145),.6,1.6):1),z.reload>0&&!pe&&(Ke=z.reload,W("reload",Y,z.reload/64)),ue.objective?.actor===m&&ue.objective.progress>0?(H!==O("interact","upper")&&(H=Z(H,O("interact","upper"))),$=Y+100):Y>=$&&(H=Z(H,O("idle","upper"),!0,.16)))}else{if(de){Le=Y;let D=["death_back","death_left","death_right"][(m+(z.life||0))%3];k=Z(k,O(D),!1,.07),V?.fadeOut(.07),H?.fadeOut(.07),ae=1/0}Le||(Le=Y,k=Z(k,O("death_back"),!1,0),k.time=M.clips.death_back.duration)}if(pe=z.reload||0,de=z.alive,Ce=Y,y){for(let D of y)D.bone.position.copy(D.position),D.bone.quaternion.copy(D.quaternion);y=null}if(w){for(let D of w)D.bone.quaternion.copy(D.quaternion);w=null}return H&&(H.paused=Ne&&H===O("idle","upper")),A.update(Math.min(.1,Math.max(0,ye))),z.alive&&!Ne&&(w=[S.head,S.chest].map(D=>({bone:D,quaternion:D.quaternion.clone()})),S.head.rotation.x-=z.pitch*.5,S.chest.rotation.x-=z.pitch*.22),x.updateMatrixWorld(!0),S["hand.R"].getWorldPosition(yr),x.worldToLocal(yr),B.position.copy(yr).add(new F(0,.096,-.048)),p&&z.alive&&!z.reload&&Y>=R&&(!$||Y>=$||["upper:fire","upper:hit"].includes(H?.getClip().name))&&b(B.position.clone().add(new F(-.025,-.11,-.12))),B.quaternion.copy(Xv),B.rotation.x=z.pitch||0,B.rotation.z=z.reload?-.15*Math.sin(z.reload/64*4):0,N&&(N.position.y=-6-(z.reload&&Ke?Math.sin(Math.PI*(1-z.reload/Ke))*8:0)),je&&(je.visible=z.alive&&Y<R,je.visible&&(S["hand.L"].getWorldPosition(yr),x.worldToLocal(yr),je.position.copy(yr),je.rotation.z=.5)),I.visible=z.alive,T.userData.motion=k?.getClip().name||V?.getClip().name,{deadAt:Le,motion:T.userData.motion}}function ee(){je?.traverse(z=>z.geometry?.dispose()),A.stopAllAction(),A.uncacheRoot(x),p&&x.traverse(z=>{z.isSkinnedMesh&&z.geometry.dispose()}),T.removeFromParent()}let se=0;return p&&x.traverse(z=>{z.isSkinnedMesh&&(se+=(z.geometry.index?.count||0)/3)}),{rig:T,model:x,bones:S,mixer:A,hero:v,slot:m,armTriangles:se,get weapon(){return ge},update:j,trigger:W,dispose:ee}}function f(){let m=new Set,v=new Set,g=new Set;for(let p of e)p.model.traverse(M=>{M.geometry&&m.add(M.geometry);for(let T of M.material?Array.isArray(M.material)?M.material:[M.material]:[]){v.add(T);for(let x of Object.values(T))x?.isTexture&&g.add(x)}});for(let p of t.values())p.traverse(M=>{M.geometry&&m.add(M.geometry)});s.dispose(),n.forEach(p=>p.dispose()),u.dispose(),c.dispose(),l.dispose(),m.forEach(p=>p.dispose()),v.forEach(p=>p.dispose()),g.forEach(p=>p.dispose())}return{preload:d,actor:h,dispose:f}}var jv={keyboardLayout:"qwerty",sensitivity:1,ads:.65,fov:80,volume:.6,brightness:1,crosshair:1,crosshairColor:"#68e8ff",sound:!0,motion:!0,invertY:!1,haptics:!1,touch:!1},ys={forward:"KeyW",back:"KeyS",left:"KeyA",right:"KeyD",fire:"Mouse0",scope:"Mouse2",reload:"KeyR",skill:"KeyQ",use:"KeyE",walk:"ShiftLeft",crouch:"KeyF",jump:"Space",armory:"KeyB",scoreboard:"Tab",previous:"BracketLeft",next:"BracketRight",flash:"KeyZ",smoke:"KeyX",grenade:"KeyC",utility:"KeyG",...Object.fromEntries(["Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal"].map((i,e)=>["weapon"+e,i]))},_u={forward:"Move forward",back:"Move backward",left:"Move left",right:"Move right",fire:"Fire",scope:"Aim down sights",reload:"Reload",skill:"Hero skill",use:"Plant / defuse",walk:"Walk quietly",crouch:"Crouch",jump:"Jump",armory:"Armory",scoreboard:"Scoreboard",previous:"Previous weapon",next:"Next weapon",flash:"Flash",smoke:"Smoke",grenade:"Fragment",utility:"Selected equipment"},xp=Object.fromEntries([..."QWERTYUIOPASDFGHJKL;ZXCVBNM"].map((i,e)=>[i===";"?"Semicolon":"Key"+i,[..."QWFPGJLUY;ARSTDHNEIOZXCVBKM"][e]])),Kv={Semicolon:";",Quote:"'",Backquote:"`",Backslash:"\\",Comma:",",Period:".",Slash:"/",IntlBackslash:"\\"};function _p(i,e="qwerty"){return i.startsWith("Mouse")?["Mouse left","Mouse middle","Mouse right"][Number(i.slice(5))]:e==="colemak"&&xp[i]?xp[i]:Kv[i]||i.replace(/^Key|^Digit/,"").replace("BracketLeft","[").replace("BracketRight","]").replace("Minus","\u2212").replace("Equal","=")}function vp(i){return/^(Key[A-Z]|Digit[0-9]|Arrow(Up|Down|Left|Right)|Shift(Left|Right)|Space|Tab|Bracket(Left|Right)|Minus|Equal|Semicolon|Quote|Backquote|Backslash|IntlBackslash|Comma|Period|Slash|Mouse[012])$/.test(i)}function yp(i={},e=!1){i=i&&typeof i=="object"?i:{};let t={...jv,touch:e,bindings:{...ys}};["qwerty","colemak"].includes(i.keyboardLayout)&&(t.keyboardLayout=i.keyboardLayout);for(let s of["sound","motion","invertY","haptics","touch"])typeof i[s]=="boolean"&&(t[s]=i[s]);for(let[s,r,a]of[["sensitivity",.4,2.5],["ads",.2,1.5],["fov",65,95],["volume",0,1],["brightness",.7,1.5],["crosshair",.7,1.8]])Number.isFinite(i[s])&&(t[s]=Math.max(r,Math.min(a,i[s])));/^#[a-fA-F0-9]{6}$/.test(i.crosshairColor)&&(t.crosshairColor=i.crosshairColor);let n=i.bindings;return n&&Object.keys(ys).every(s=>vp(n[s]))&&new Set(Object.values(n)).size===Object.keys(ys).length&&(t.bindings={...n}),t}function Mp(i,e,t){if(!(e in ys)||!vp(t))throw Error("Use a letter, number, arrow, Shift, Space, Tab or mouse button. Ctrl, Alt, Meta and browser shortcuts are reserved.");let n={...i},s=Object.keys(n).find(r=>n[r]===t);return s&&(n[s]=n[e]),n[e]=t,n}function Sp(i,e){return i.sensitivity*.0025*(e?i.ads*Math.tan(38*Math.PI/360)/Math.tan(i.fov*Math.PI/360):1)}function Ep(i,e){return e.spread*(i.crouch?.65:1)*(e.scoped&&!i.scoped?12:1)*(Math.hypot(i.velocity[0],i.velocity[2])>40?2.5:1)*(i.hero===5&&i.effect>0||i.overclock>0?1.5:1)+(i.recoil||0)}var qi=class{constructor(){this.seen=new Set}consume(e,t){let n=[];for(let s of e||[])this.seen.has(s.id)||(this.seen.add(s.id),t-s.tick<=128&&n.push(s));return this.seen.size>1024&&(this.seen=new Set([...this.seen].slice(-512))),n}};var Xi=(i,e=0)=>new qt({color:i,roughness:.55,metalness:.55,emissive:e,emissiveIntensity:1.6});function Tp(i,e){let t=matchMedia("(pointer:coarse)").matches,n=new Xc({canvas:i,antialias:!1,powerPreference:"high-performance"});n.outputColorSpace=At,n.toneMapping=ya,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.autoUpdate=!1,n.shadowMap.type=t?eh:ps;let s=new as,r=new Ot(80,1,.5,9e3);r.rotation.order="YXZ",s.add(r),s.add(new ga(9420254,1183771,.85));let a=new zi(11655153,2);a.position.set(-800,1400,500),s.add(a),a.castShadow=!0,a.shadow.mapSize.set(t?512:1024,t?512:1024),a.shadow.normalBias=1.2,a.shadow.bias=-1e-4;let o;function l(){o?.dispose();let U=new br(n),te=new Yc;o=U.fromScene(te,.05),s.environment=o.texture,s.environmentIntensity=.5,te.dispose(),U.dispose(),n.shadowMap.needsUpdate=!0}let c=!1,u=!1;function d(){c=!0}function h(){u||(l(),c=!1,We())}i.addEventListener("webglcontextlost",d),i.addEventListener("webglcontextrestored",h),l();let f=Xi("#162536"),m=Xi("#121922"),v=Xi("#607187"),g=Xi("#253849"),p=Xi("#c2ccdb"),M=e.heroes.map(U=>Xi(U.color,U.color)),T=[Xi("#26dfff","#26dfff"),Xi("#ff7e5d","#ff7e5d")];function x(U,te,re,Q,oe,_e,Ae,Ee){let Te=new ct(new Zt(te,re,Q),Ee);return Te.position.set(oe,_e,Ae),Te.castShadow=!0,Te.receiveShadow=!0,U.add(Te),Te}function S(U,te,re,Q,oe,_e,Ae){let Ee=new ct(new Ui(te,te,re,12),Ae);return Ee.position.set(Q,oe,_e),Ee.castShadow=!0,Ee.receiveShadow=!0,U.add(Ee),Ee}function y(U,te="#8ae6ff",re=512,Q=128){let oe=document.createElement("canvas");oe.width=re,oe.height=Q;let _e=oe.getContext("2d");_e.fillStyle="#08121f",_e.fillRect(0,0,re,Q),_e.strokeStyle=te,_e.lineWidth=5,_e.strokeRect(8,8,re-16,Q-16),_e.font="bold 56px monospace",_e.textAlign="center",_e.textBaseline="middle",_e.fillStyle=te,_e.fillText(U,re/2,Q/2);let Ae=new Yn(oe);return Ae.colorSpace=At,new Ct({map:Ae,side:Qt})}function w(U){let te=new Map;for(let re of[...U.children])if(re.isMesh){re.updateMatrix();let Q=re.geometry.clone().applyMatrix4(re.matrix);te.has(re.material)||te.set(re.material,[]),te.get(re.material).push(Q),U.remove(re),re.geometry.dispose()}for(let[re,Q]of te){let oe=new ct(Zc(Q),re);oe.castShadow=!0,oe.receiveShadow=!0,U.add(oe),Q.forEach(_e=>_e.dispose())}}let b=cp(n,{mobile:t}),A=lp(s,2400,{mobile:t}),P=[],O=new zi(16746564,1.5);O.position.set(900,700,-1100),s.add(O);let V=bp(b),H=null;function k(U,te,re){let Q=V.actor(U,te,re);return Q.rig.name=`hero-${te}-slot-${U}`,s.add(Q.rig),Q}function $(U){return H?.hero!==U.hero&&(H?.dispose(),H=V.actor(U.slot,U.hero,U.weapon,{firstPerson:!0}),H.rig.scale.setScalar(.8),r.add(H.rig)),H}let ae=new xi(8448767,0,160,2);ae.visible=!t,r.add(ae),ae.position.set(5,-4,-30);let K=new gt,de=-1,ce=Math.min(devicePixelRatio||1,t?1:1.5),pe=80;s.add(K);let ge=[];function Le(){K.traverse(U=>U.geometry?.dispose()),s.remove(K);for(let U of ge)U.map?.dispose(),U.dispose();ge.length=0,K=new gt,s.add(K)}function Ce(U){if(de===U)return;de=U,Le();let te=e.maps[U],re=te.extent;Object.assign(a.shadow.camera,{left:-re,right:re,top:re,bottom:-re,near:1,far:5e3}),a.shadow.camera.updateProjectionMatrix(),s.background=new qe(te.colors[0]),s.fog=new Xr(1452859,28e-5),b.dressMap(K,te,U),n.shadowMap.needsUpdate=!0}let tt=[];for(let U=0;U<40;U++){let te=t?new Ct({color:"#b4c1d8",transparent:!0,opacity:.93,depthWrite:!1}):new qt({color:"#b4c1d8",transparent:!0,opacity:.93,roughness:1,depthWrite:!1}),re=new ct(new Oi(1,12,8),te);re.visible=!1,s.add(re),tt.push(re)}let Ke=new gt;x(Ke,20,10,16,0,5,0,m),x(Ke,14,2,10,0,11,0,M[4]),s.add(Ke);let je=[];for(let U=0;U<32;U++){let te=new ct(new Ui(.6,.6,1,4),new Ct({color:"#baf6ff",transparent:!0,opacity:.6}));te.visible=!1,s.add(te),je.push({mesh:te,until:0})}let R=0,I=0,N=-1/0,B=-1/0;function L(U,te,re){let Q=new F(-Math.sin(te.yaw)*Math.cos(te.pitch),Math.sin(te.pitch),-Math.cos(te.yaw)*Math.cos(te.pitch)),oe=je[R++%je.length];oe.mesh.position.set(te.position[0],te.position[1]+50,te.position[2]).addScaledVector(Q,130),oe.mesh.quaternion.setFromUnitVectors(new F(0,1,0),Q),oe.mesh.scale.y=230,oe.until=re+55,oe.mesh.visible=!0,U===Z?(I=re+40,N=re,H?.trigger("fire",re)):P[U]?.trigger("fire",re)}let Z=0,he=null,W=new qi;function j(U){if(!U?.state)return;let te=performance.now();U.id!==he&&(W=new qi,he=U.id);for(let re of W.consume(U.feedback,U.state.tick))if(!(U.state.tick-re.tick>32)&&re.kind==="motion"){let Q=U.state.players[re.actor];if(!Q||Q.hidden||Q.life!==re.life)continue;re.action==="fire"?re.actor!==U.slot&&L(re.actor,Q,te):(P[re.actor]?.trigger(re.action,te,re.action==="reload"?Q.reload/64:void 0,re.value),re.actor===U.slot&&H?.trigger(re.action,te,re.action==="reload"?Q.reload/64:void 0,re.value)),re.action==="hit"&&(Ne(Q,te),re.actor===U.slot&&(B=te))}}let ee=new Float32Array(96),se=new yt;se.setAttribute("position",new wt(ee,3));let z=new Ni({color:16766336,size:2,sizeAttenuation:!0,transparent:!0,depthWrite:!1,opacity:0}),ue=new di(se,z);ue.frustumCulled=!1,s.add(ue);let Y=null,ye=0;function Ne(U,te){Y=[U.position[0],U.position[1]+(U.crouch?32:46),U.position[2]],ye=te}let D=Array.from({length:10},()=>new F);function Ze(U,te,re,Q,{active:oe=!1,yaw:_e=0,pitch:Ae=0,local:Ee=null,spectator:Te=null,reduced:De=!1,weapon:Xe=0}={}){if(!(c||u)){if(Z=te,U){let Ue=U.players[te],G=U.players[Te],Se=Ue.alive?Ue:G?.alive&&G.team===Ue.team?G:U.players.find(ve=>ve.team===Ue.team&&ve.alive);Ce(U.config.map);for(let ve of U.players){let Me=P[ve.slot];if(!Me)continue;!ve.hidden&&Me.hero!==ve.hero&&(Me.dispose(),Me=P[ve.slot]=k(ve.slot,ve.hero,ve.weapon));let be=!ve.hidden&&!!ve.position&&(!oe||ve.slot!==Se?.slot);if(Me.rig.visible=be,!be)continue;Me.rig.position.copy(D[ve.slot].fromArray(ve.position)),Me.rig.rotation.y=ve.yaw;let Ve=Me.update(ve,U,re,Q,{reduced:De});!ve.alive&&re-Ve.deadAt>5e3&&(Me.rig.visible=!1)}for(let ve=0;ve<tt.length;ve++){let Me=U.utilities[ve],be=tt[ve];be.visible=!!Me,Me&&(be.position.fromArray(Me.position),be.scale.setScalar(Me.kind===2&&Me.fuse===0?175:6),be.material.opacity=Me.kind===2&&Me.fuse===0?Math.min(.93,Me.life/64):Me.fuse===0?.12:1,be.material.color.set(e.items[Me.kind]?.color||"#b4c1d8"),Me.fuse===0&&Me.kind===5&&be.scale.set(450,3,450),Me.fuse===0&&Me.kind===10&&be.scale.set(220,3,220))}if(Ke.visible=!U.objective.hidden&&!!U.objective.position&&U.config.mode==="demolition"&&(U.objective.planted||U.objective.carrier===null),U.objective.position&&Ke.position.fromArray(U.objective.position),oe&&Ue.alive)r.position.fromArray(Ee||Ue.position),r.position.y+=Ue.crouch?37:56,r.rotation.set(Ae,_e,0,"YXZ");else if(oe)Se?(r.position.fromArray(Se.position),r.position.y+=Se.crouch?37:56,r.rotation.set(Se.pitch,Se.yaw,0,"YXZ")):(r.position.set(0,700,900),r.lookAt(0,0,0));else{let ve=De?.6:re*35e-6;r.position.set(Math.sin(ve)*e.maps[de].extent*.8,400,Math.cos(ve)*e.maps[de].extent*.8),r.lookAt(0,40,0)}if(H&&(H.rig.visible=!1),oe&&Se?.alive){let ve=$(Se);ve.rig.visible=!Se.scoped;let Me=De?0:Math.exp(-Math.max(0,re-N)/65),be=De?0:Math.exp(-Math.max(0,re-B)/100);ve.rig.position.set(0,(Se.crouch?-39:-56)*.8-5,-10+Me*1.2),ve.update({...Se,pitch:0},U,re,Q,{reduced:De}),r.rotation.x+=Me*.009,r.rotation.z+=be*.012}let me=Se?.scoped&&oe?38:pe;r.fov!==me&&(r.fov=me,r.updateProjectionMatrix())}else{Ce(de<0?0:de),P.forEach(G=>G.rig.visible=!1),H&&(H.rig.visible=!1);let Ue=De?.6:re*4e-5;r.position.set(Math.sin(Ue)*1e3,400,Math.cos(Ue)*1e3),r.lookAt(0,30,0)}if(Y&&!De){let Ue=(re-ye)/1e3;if(z.opacity=Math.max(0,1-Ue/.25),Ue<.25){for(let G=0;G<32;G++){let Se=G*2.39996,me=30+G%7*11;ee[G*3]=Y[0]+Math.cos(Se)*Ue*me,ee[G*3+1]=Y[1]+(20+G%5*15)*Ue-180*Ue*Ue,ee[G*3+2]=Y[2]+Math.sin(Se)*Ue*me}se.attributes.position.needsUpdate=!0}}else z.opacity=0;A.frame(re,De,ce<1),ae.intensity=De?0:re<I?150:0;for(let Ue of je)Ue.until<re&&(Ue.mesh.visible=!1);n.render(s,r)}}function We(U=pe){pe=U;let te=innerWidth,re=innerHeight;n.setPixelRatio(Math.min(ce,Math.sqrt((t?1280*720:3840*2160)/(te*re)))),n.setSize(te,re,!1),r.aspect=te/re,r.fov=pe,r.updateProjectionMatrix()}function C(U){n.toneMappingExposure=1.05*U}function _(U){ce=Math.min(U,t?1:1.5),We()}function q(){u=!0,H?.dispose();for(let U of P)U.dispose();V.dispose(),i.removeEventListener("webglcontextlost",d),i.removeEventListener("webglcontextrestored",h),A.dispose(),b.dispose(),s.traverse(U=>{if(U.geometry?.dispose(),U.material)for(let te of Array.isArray(U.material)?U.material:[U.material])te.map?.dispose(),te.dispose()}),o.dispose(),n.dispose()}async function J(U){await V.preload(U).catch(te=>{throw te.asset=!0,te});for(let te=0;te<10;te++)P.push(k(te,te%6));for(let te of P)te.rig.position.fromArray(e.maps[0].spawns[Math.floor(te.slot/5)][te.slot%5]);r.position.set(0,400,900),r.lookAt(0,30,0),await n.compileAsync(s,r),n.render(s,r),await new Promise(requestAnimationFrame)}return Ce(0),We(),{preload:J,renderer:n,scene:s,camera:r,setMap:Ce,frame:Ze,resize:We,resolution:_,exposure:C,dispose:q,shoot:L,accept:j,get viewModelTriangles(){return H?.armTriangles||0}}}function vu(i,e){for(let t of e.obstacles){if(i[1]>=t.max[1])continue;let n=[t.min[0]-18,t.min[2]-18],s=[t.max[0]+18,t.max[2]+18];if(i[0]>n[0]&&i[0]<s[0]&&i[2]>n[1]&&i[2]<s[1]){let r=[i[0]-n[0],s[0]-i[0],i[2]-n[1],s[1]-i[2]],a=Math.min(...r);r[0]===a?i[0]=n[0]:r[1]===a?i[0]=s[0]:r[2]===a?i[2]=n[1]:i[2]=s[1]}}return i[0]=Math.max(-e.extent+20,Math.min(e.extent-20,i[0])),i[2]=Math.max(-e.extent+20,Math.min(e.extent-20,i[2])),i}function wp(i,e,t={mobility:1}){let n=Math.max(1,Math.hypot(i.x,i.y)),s=e.speed*(t.mobility??1)*(i.crouch?.45:i.walk||i.scope?.55:1);return[(-Math.sin(i.yaw)*i.y+Math.cos(i.yaw)*i.x)/n*s,0,(-Math.cos(i.yaw)*i.y-Math.sin(i.yaw)*i.x)/n*s]}function Ap(i,e,t,n,s,r){let a=e.scope&&r.scoped,o=wp({...e,scope:a},s,r);e.jump&&!i.jumpHeld&&i.position[1]<=0&&(i.vy=220),i.jumpHeld=!!e.jump;for(let l=t;l>1e-8;){let c=Math.min(.015625,l);l-=c,i.vy-=600*c,i.position[0]+=o[0]*c,i.position[1]+=i.vy*c,i.position[2]+=o[2]*c,i.position[1]<0&&(i.position[1]=0,i.vy=0),vu(i.position,n)}}var nl=class{constructor(){this.history=[],this.position=null,this.offset=[0,0,0],this.time=null,this.state=null}reset(e,t){this.history=[],this.state={position:[...e.position],vy:e.velocity?.[1]||0,jumpHeld:!1},this.position=[...e.position],this.offset=[0,0,0],this.time=t,this.lastControl=null}record(e,t){this.history.push({input:{...e},at:t}),this.history.length>128&&this.history.shift()}reconcile(e,t,n,s,r,a=!0){if(!this.state){this.reset(e,t);return}this.lastControl&&this.step(this.lastControl,t,n,s,r,a);let o=this.history.findLast(d=>d.input.seq<=e.last_seq),l=this.history.filter(d=>d.input.seq>e.last_seq),c={position:[...e.position],vy:e.velocity?.[1]||0,jumpHeld:!!o?.input.jump};if(a)for(let d=0;d<l.length;d++){let h=Math.max(t-250,l[d].at),f=Math.min(t,l[d+1]?.at??t);f>h&&Ap(c,l[d].input,(f-h)/1e3,n,s,r)}let u=this.position.map((d,h)=>d-c.position[h]);this.offset=Math.hypot(...u)>160?[0,0,0]:u,this.state=c,this.time=t,this.history=o?[o,...l]:l,this.position=c.position.map((d,h)=>d+this.offset[h])}step(e,t,n,s,r,a=!0){if(!this.state)return null;this.lastControl=e;let o=Math.max(0,Math.min(.25,(t-this.time)/1e3));this.time=t,a&&Ap(this.state,e,o,n,s,r);let l=Math.exp(-o*20);return this.offset=this.offset.map(c=>c*l),this.position=this.state.position.map((c,u)=>c+this.offset[u]),vu(this.position,n),this.position}};var il=class{constructor(){this.reset()}reset(){this.frames=[],this.renderTick=0}push(e,t){let n=this.frames.at(-1);if(!(n&&e.tick<=n.state.tick)){for(this.frames.push({state:e,now:t});this.frames.length>16;)this.frames.shift();n||(this.renderTick=e.tick)}}sample(e,t){let n=this.frames.at(-1);if(!n)return null;let s=Math.min(n.state.tick,n.state.tick+Math.max(0,e-n.now)*.064-4);this.renderTick=Math.max(this.renderTick,s);let r=this.frames[0],a=n;for(let c of this.frames)if(c.state.tick<=this.renderTick&&(r=c),c.state.tick>=this.renderTick){a=c;break}let o=a.state.tick===r.state.tick?1:Math.max(0,Math.min(1,(this.renderTick-r.state.tick)/(a.state.tick-r.state.tick))),l=n.state;return{...l,players:l.players.map((c,u)=>{if(u===t||c.hidden||!c.position)return c;let d=r.state.players[u],h=a.state.players[u];if(!d?.position||!h?.position||d.hidden||h.hidden||d.life!==c.life||h.life!==c.life||d.alive!==c.alive||h.alive!==c.alive||Math.hypot(...h.position.map((m,v)=>m-d.position[v]))>200)return c;let f=Math.atan2(Math.sin(h.yaw-d.yaw),Math.cos(h.yaw-d.yaw));return{...c,position:d.position.map((m,v)=>m+(h.position[v]-m)*o),yaw:d.yaw+f*o,pitch:d.pitch+(h.pitch-d.pitch)*o}})}}viewTick(){return Math.max(0,Math.floor(this.renderTick))}};function Rp(){try{return localStorage.getItem("utxoplay:quality")||"auto"}catch{return"auto"}}var yu=class{constructor(e=2){this.max=e,this.ratio=e,this.slow=0,this.fast=0}sample(e,t="auto"){if(t!=="auto")return this.ratio=t==="low"?Math.min(1,this.max):this.max,this.slow=this.fast=0,this.ratio;let n=Math.min(e,50);return this.slow=e>24?this.slow+n:Math.max(0,this.slow-n*2),this.fast=e<20?this.fast+n:Math.max(0,this.fast-n*4),this.slow>=350&&(this.ratio=Math.max(.75,this.ratio-.25),this.slow=this.fast=0),this.fast>=8e3&&(this.ratio=Math.min(this.max,this.ratio+.25),this.fast=0),this.ratio}};function Cp(i,{active:e=()=>!0,maxFps:t=60,maxResolution:n=2,onResolution:s}={}){let r=0,a=0,o=0,l=!1,c=Rp(),u=0,d=0,h=0,f=new yu(Math.min(globalThis.devicePixelRatio||1,n)),m=f.ratio;function v(M){if(r=0,l||document.hidden)return;r=requestAnimationFrame(v);let T=e(),x=1e3/(T?t:30);if(o&&M+.25<o)return;o=o?o+x:M+x,o<M&&(o=M+x);let S=a?M-a:1e3/60,y=Math.min(S,50);a=M;let w=T||c!=="auto"?f.sample(S,c):f.ratio;w!==m&&(m=w,s?.(m));let b=performance.now();i(M,y,m),h+=performance.now()-b,d++,M-u>=1e3&&(document.documentElement.dataset.renderFps=String(Math.round(d*1e3/(M-u))),document.documentElement.dataset.renderMs=(h/d).toFixed(2),document.documentElement.dataset.renderScale=m.toFixed(2),u=M,d=h=0)}function g(){cancelAnimationFrame(r),r=0,a=o=0,u=performance.now(),d=h=0,!document.hidden&&!l&&(r=requestAnimationFrame(v))}function p(){c=Rp(),f.slow=f.fast=0}return document.addEventListener("visibilitychange",g),addEventListener("storage",p),addEventListener("utxoplay:quality",p),g(),()=>{l=!0,cancelAnimationFrame(r),document.removeEventListener("visibilitychange",g),removeEventListener("storage",p),removeEventListener("utxoplay:quality",p)}}function Pp(i){let e,t,n=0,s=0;function r(){try{return e??=new AudioContext,t||(t=e.createGain(),t.connect(e.destination)),t.gain.value=i().sound?(i().volume??.6)*.3:0,e.state==="suspended"&&e.resume(),e}catch{return null}}function a(c,u=.12,d=.2,h="triangle",f=0,m=null){if(globalThis.document?.hidden)return;let v=r();if(!v||!i().sound||n>=32)return;n++;let g=v.currentTime+f,p=v.createOscillator(),M=v.createGain(),T=v.createStereoPanner();T.pan.value=m?.pan||0,p.type=h,p.frequency.setValueAtTime(c*(m?.muffled?.65:1),g),p.frequency.exponentialRampToValueAtTime(Math.max(25,c*.22),g+u),M.gain.setValueAtTime(.001,g),M.gain.exponentialRampToValueAtTime(Math.max(.001,d*(m?.level??1)),g+.004),M.gain.exponentialRampToValueAtTime(.001,g+u),p.connect(M).connect(T).connect(t),p.start(g),p.stop(g+u+.01),p.onended=()=>{n--,p.disconnect(),M.disconnect(),T.disconnect()}}let o=(c=0,u)=>{a([410,870,250,1200,95,670,1500,170,1900,740,1120,65][c]||410,.08+(c===11?.2:0),.38,"sawtooth",0,u),a(75,.08,.22,"triangle",0,u)};function l(c,u){if(c==="step"||c==="land"){let d=performance.now();if(d-s<60)return;s=d,a(55,.045,c==="land"?.12:.06,"triangle",0,u)}else c==="reload"?(a(620,.04,.12,"square",0,u),a(900,.035,.1,"square",.09,u)):c==="skill"?(a(300,.25,.15,"sine",0,u),a(900,.15,.12,"sine",.08,u)):["item","utility","plasma"].includes(c)?a(c==="plasma"?50:160,.18,.2,"sawtooth",0,u):c==="planted"?(a(900,.16,.18,"square"),a(1250,.12,.14,"sine",.2)):c==="beep"?a(1100,.055,.1,"sine"):c==="win"?[440,660,880].forEach((d,h)=>a(d,.25,.16,"sine",h*.13)):c==="loss"?[440,330,220].forEach((d,h)=>a(d,.22,.13,"sine",h*.13)):c==="respawn"&&a(650,.15,.12,"sine")}return{ready:r,setVolume:()=>{t&&(t.gain.value=i().sound?(i().volume??.6)*.3:0)},shot:o,cue:l,hit:(c=!1)=>{a(c?2100:1450,c?.09:.045,.18,"sine"),c&&a(2700,.04,.1,"sine",.05)},kill:()=>{a(700,.09,.15,"sine"),a(1400,.1,.12,"sine",.07)},damage:c=>a(65,.16,Math.min(.4,.1+c/150)),dispose:()=>e?.close()}}function Ip({audio:i,getPrefs:e,getRoom:t,getYaw:n,spec:s}){let r=b=>document.getElementById(b),a=new qi,o=null,l=0,c=!1,u=0,d=0,h=null,f=0,m=0,v=!1,g=-1,p=null,M=0,T=(b,A)=>{r(b).textContent!==A&&(r(b).textContent=A)};function x(b,A=2600){T("combat-banner",b),f=performance.now()+A}function S(b){let A=e(),P=performance.now();A.haptics&&A.motion&&navigator.vibrate&&P-M>100&&(M=P,navigator.vibrate(b))}function y(b){if(!b?.state)return;b.id!==o&&(o=b.id,a=new qi,p=null,m=0,v=!1,g=-1,l=u=f=0);let A=b.state,P=A.players[b.slot],O=performance.now();P.life!==p&&(p=P.life,T("killer","Your squad is still in the fight."),h=null);let V=K=>K===b.slot?"YOU":b.roster[K]?.name||"Opponent";for(let K of a.consume(b.feedback,A.tick)){let de=A.tick-K.tick<=32;if(K.kind==="shot")de&&!K.self&&i.shot(K.value,{pan:Math.sin(K.bearing+n()),level:K.level,muffled:K.muffled});else if(["step","land","reload","skill","item","utility","plasma"].includes(K.kind))de&&i.cue(K.kind,{pan:K.self?0:Math.sin(K.bearing+n()),level:K.level,muffled:K.muffled});else if(K.kind==="hit"||K.kind==="headshot")K.actor===b.slot&&(l=O+170,c=K.kind==="headshot",de&&i.hit(c)),K.target===b.slot&&(u=O+550,d=Math.min(.8,.2+K.value/100),h=K.bearing,de&&(i.damage(K.value),S(15)));else if(K.kind==="kill"){K.actor===b.slot&&(de&&(i.kill(),S(12)),x("ELIMINATED \xB7 "+V(K.target),1400)),K.target===b.slot&&T("killer","Eliminated by "+V(K.actor));let ce=document.createElement("div");for(ce.textContent=V(K.actor)+" \u25B8 "+V(K.target),ce.dataset.until=String(O+4500),r("kill-feed").append(ce);r("kill-feed").children.length>3;)r("kill-feed").firstChild.remove()}else if(K.kind==="planted")x("RELAY PLANTED \xB7 SITE "+(K.value===0?"A":"B")),de&&i.cue("planted");else if(["defused","detonation","elimination","time"].includes(K.kind)){let ce=K.value===P.team;x((ce?"ROUND WON \xB7 ":"ROUND LOST \xB7 ")+{defused:"RELAY DEFUSED",detonation:"RELAY DETONATED",elimination:"SQUAD ELIMINATED",time:"TIME EXPIRED"}[K.kind],4500),de&&i.cue(ce?"win":"loss")}else K.kind==="round"?x("ROUND "+K.value+" \xB7 PREPARE YOUR LOADOUT"):K.kind==="match_end"?(x(A.winner===P.team?"MATCH WON":A.winner==null?"MATCH DRAW":"MATCH LOST",4500),de&&i.cue(A.winner===P.team?"win":"loss")):K.kind==="respawn"&&de?i.cue("respawn"):K.kind==="pickup"?x("RELAY ACQUIRED \xB7 HOLD USE AT A OR B"):K.kind==="buy"&&x("LOADOUT UPDATED",1e3)}let H=A.objective,k=H.actor===b.slot?H.progress:0,$=H.planted?7:3;if(r("objective-progress").hidden=!k,r("objective-progress").max=$*64,r("objective-progress").value=k,m>0&&!k&&H.planted===v&&A.phase==="live"&&P.alive&&x("INTERRUPTED \xB7 STAND STILL; DO NOT FIRE OR JUMP",2e3),m=k,v=H.planted,H.planted&&A.phase==="live"){let K=Math.ceil(H.fuse/64);K!==g&&K<=10&&i.cue("beep"),g=K}else g=-1;let ae=[];P.disabled&&ae.push("EMP "+Math.ceil(P.disabled/64)+"s"),P.protection&&ae.push("SPAWN SHIELD "+Math.ceil(P.protection/64)+"s"),P.effect&&ae.push((P.hero===2?"SHIELD":P.hero===5?"OVERDRIVE":"SKILL")+" "+Math.ceil(P.effect/64)+"s"),P.overclock&&ae.push("REDLINE "+Math.ceil(P.overclock/64)+"s"),P.revealed&&ae.push("REVEALED "+Math.ceil(P.revealed/64)+"s"),T("buffs",ae.slice(0,2).join(" \xB7 ")),r("vitals-state").classList.toggle("low-health",P.alive&&P.health/s.heroes[P.hero].health<.3)}function w(b){let A=t(),P=A?.state?.players[A.slot],O=e();r("hit-marker").style.opacity=b<l?"1":"0",r("hit-marker").classList.toggle("headshot",c),r("damage").style.opacity=String(Math.max(0,(u-b)/550)*d),r("damage-bearing").style.opacity=b<u&&h!=null?"1":"0",h!=null&&(r("damage-bearing").style.transform=`translate(-50%,-50%) rotate(${h+n()}rad)`),r("combat-banner").hidden=b>=f;for(let V of[...r("kill-feed").children])Number(V.dataset.until)<b&&V.remove();if(P){let V=P.scoped?38:O.fov,H=Math.min(48,Math.max(3,Math.tan(Ep(P,s.weapons[P.weapon])*Math.PI/360)*innerHeight/(2*Math.tan(V*Math.PI/360))));r("crosshair").style.setProperty("--gap",H+"px"),r("crosshair").style.opacity=P.scoped||!P.alive?"0":"1"}}return{accept:y,render:w,banner:x}}function Lp(i){let e=null,t=null,n=()=>{let a=i.map(o=>document.getElementById(o)).find(o=>!o.hidden);for(let o of["panel","hud","touch"])document.getElementById(o).inert=!!a;a&&a!==t?(e=document.activeElement,t=a,a.querySelector("button")?.focus({preventScroll:!0})):!a&&t&&(t=null,e?.isConnected&&!e.closest("[hidden]")&&e.focus({preventScroll:!0}),e=null)},s=new MutationObserver(n);for(let a of i){let o=document.getElementById(a);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),s.observe(o,{attributes:!0,attributeFilter:["hidden"]})}let r=a=>{if(!t)return;if(a.code==="Escape"){a.preventDefault(),a.stopImmediatePropagation(),t.querySelector(".close")?.click();return}if(a.code!=="Tab")return;a.preventDefault(),a.stopImmediatePropagation();let o=[...t.querySelectorAll("button:not(:disabled),input:not(:disabled),select:not(:disabled),a[href]")].filter(c=>c.checkVisibility());if(!o.length)return;let l=o.indexOf(document.activeElement);o[(l+(a.shiftKey?-1:1)+o.length)%o.length].focus()};return addEventListener("keydown",r,!0),()=>{s.disconnect(),removeEventListener("keydown",r,!0)}}var Ms=window.BotStrikeStartup;Ms?.boot();var fe=i=>document.getElementById(i),Ba="/games/botstrike/api",Gn=fe("arena"),ut=await fetch("./spec.json").then(i=>{if(!i.ok)throw Error("World specification unavailable");return i.json()}),Up={};try{Up=JSON.parse(localStorage.getItem("botstrike:settings")||"{}")}catch{}var Je=yp(Up,matchMedia("(pointer:coarse)").matches),bn=i=>_p(i,Je.keyboardLayout),ji=Pp(()=>Je),ka=new Set,Nu=0,Fu=0,xe=null,Vt,An,Xt=!1,Mu=!1,Ru=!1,Oa=0,Rn=0,Er=0,Dp=0,Cu,Pu=0,Su=-1,Eu=null,sl=null,Yv=100,Tu=!1,al=0;var Iu=0,Jv=!1,za=!1,Zv=!1,Ss={x:0,y:0},Tr={},wr={},Ts=null,Mi=null,Mr=new Set,ol=new il,Sr=new nl,Uu=[],$v=[],Np=-1/0,yi,wu=0,Lu=-1,Fp=()=>!Je.motion||matchMedia("(prefers-reduced-motion: reduce)").matches,Op=Ip({audio:ji,getPrefs:()=>Je,getRoom:()=>xe,getYaw:()=>{let i=xe?.state,e=i?.players[xe.slot],t=i?.players[xe.spectate];return e?.alive?Rn:(t?.alive&&t.team===e?.team?t:i?.players.find(n=>n.team===e?.team&&n.alive))?.yaw??Rn},spec:ut});function Qe(i,e){let t=fe(i),n=String(e);t.textContent!==n&&(t.textContent=n)}function kt(i,e=!1){Qe("status",i),fe("status").classList.toggle("error",e)}function Qv(i,e){return`<img src="./art/hero-${e}.webp" width="360" height="450" alt="${i.name} in-game model" decoding="async">`}for(let[i,e]of ut.heroes.entries()){let t=document.createElement("button");t.className="hero-card",t.style.setProperty("--hero",e.color),t.innerHTML=Qv(e,i)+`<b>${e.name}</b><small>${e.role.toUpperCase()}</small><span class="stats">${e.health} HP \xB7 ${e.armor} ARMOR</span>`,t.setAttribute("aria-label",e.name+", "+e.role),t.onclick=()=>kp(i),fe("heroes").append(t)}function kp(i){Nu=i,[...fe("heroes").children].forEach((t,n)=>t.setAttribute("aria-pressed",String(i===n)));let e=ut.heroes[i];Qe("hero-detail",`${e.ability.toUpperCase()} / ${e.cooldown}s cooldown \u2014 ${e.description} Speed ${e.speed}.`)}kp(0);function Bp(i,e,t,n=[],s=-1,r=null){let a=(t-16)/(e.extent*2),o=c=>[t/2+c[0]*a,t/2+c[2]*a];i.clearRect(0,0,t,t),i.fillStyle="#101e2b",i.fillRect(0,0,t,t),i.strokeStyle="#507388",i.strokeRect(8,8,t-16,t-16),i.fillStyle="#536678";for(let c of e.obstacles){let u=o(c.min);i.fillRect(u[0],u[1],(c.max[0]-c.min[0])*a,(c.max[2]-c.min[2])*a)}i.font=`bold ${Math.max(10,t/12)}px monospace`,i.textAlign="center";for(let[c,u]of e.sites.entries()){let d=o(u);i.fillStyle=c?"#ff9878":"#68e8ff",i.fillText(c?"B":"A",d[0],d[1]),r?.site===c&&r.planted&&(i.strokeStyle="#ffce8e",i.beginPath(),i.arc(d[0],d[1]-4,12,0,Math.PI*2),i.stroke())}let l=n[s];for(let c of n){if(!c.alive||c.hidden||!c.position||l&&c.team!==l.team&&!c.revealed)continue;let u=o(c.position);i.fillStyle=c.slot===s?"#fff":c.team===l?.team?"#68e8ff":"#ff9878",i.beginPath(),i.arc(...u,c.slot===s?4:3,0,Math.PI*2),i.fill(),c.slot===s&&(i.strokeStyle="#fff",i.beginPath(),i.moveTo(...u),i.lineTo(u[0]-Math.sin(Rn)*10,u[1]-Math.cos(Rn)*10),i.stroke())}if(r?.planted){let c=o(r.position);i.strokeStyle="#ffce8e",i.lineWidth=2,i.strokeRect(c[0]-5,c[1]-5,10,10)}}for(let[i,e]of ut.maps.entries()){let t=document.createElement("button");t.className="map-card";let n=document.createElement("canvas");n.width=180,n.height=180,Bp(n.getContext("2d"),e,180);let s=document.createElement("img");s.src="./art/map-"+i+".webp",s.alt=e.name+" in-game view",s.width=720,s.height=405,s.decoding="async",t.append(s,n);let r=document.createElement("span");r.innerHTML=`<b>${e.name}</b><small>${e.description}</small>`,t.append(r),t.onclick=()=>zp(i),fe("maps").append(t)}function zp(i){Fu=i,[...fe("maps").children].forEach((e,t)=>e.setAttribute("aria-pressed",String(i===t))),xe||Vt?.setMap(i)}zp(0);function Si(){for(let i of Uu)i();ka.clear(),Jv=za=Zv=!1,Ss={x:0,y:0},Tr={},wr={},fe("move-knob").style.transform="translate(0,0)"}function Gp(){let i=Xt&&!window.BotStrikeImmersive?.blocked&&fe("buy-menu").hidden&&fe("scoreboard").hidden,e=(t,n=t)=>!!(i&&(ka.has(Je.bindings[t])||t==="walk"&&Je.bindings.walk==="ShiftLeft"&&ka.has("ShiftRight")||wr[n]||performance.now()<(Tr[n]||0)));return{seq:++Oa,viewTick:ol.viewTick(),x:i?Math.max(-1,Math.min(1,Number(e("right"))-Number(e("left"))+Ss.x)):0,y:i?Math.max(-1,Math.min(1,Number(e("forward"))-Number(e("back"))-Ss.y)):0,yaw:Rn,pitch:Er,fire:!!(i&&(e("fire")||za)),reload:e("reload"),walk:e("walk"),crouch:e("crouch"),jump:e("jump"),ability:e("skill"),interact:e("use","interact"),scope:e("scope"),weapon:Ts,item:e("flash")?1:e("smoke")?2:e("grenade")?3:e("utility")?Number(fe("utility-choice").value):0}}function Hp(i,e){let t=xe?.state?.players[xe.slot];!Xt||!i.fire||!t?.alive||xe.state.phase!=="live"||t.reload||t.ammo[t.weapon]<=0||(Lu!==t.weapon&&(Lu=t.weapon,wu=e+t.fire_wait/64*1e3),!(e<wu)&&(wu=e+ut.weapons[t.weapon].interval/64*1e3,ji.shot(t.weapon),Vt?.shoot(xe.slot,{...t,yaw:Rn,pitch:Er,position:Mi||t.position},e),Iu=e))}function an(){if(xe?.status!=="running"||An?.readyState!==WebSocket.OPEN||document.hidden)return;let i=performance.now(),e=1e3/60-(i-Np);if(e>0){yi||(yi=setTimeout(()=>{yi=null,an()},e));return}if(An.bufferedAmount>16e3){yi||(yi=setTimeout(()=>{yi=null,an()},100));return}clearTimeout(yi),yi=null,Np=i;let t=Gp();Sr.record(t,i),Hp(t,i),An.send(JSON.stringify({type:"input",room:xe.id,input:t})),za=!1}function xn(){cl=!1,Xt=!1,Si(),fe("panel").hidden=!1,fe("buy-menu").hidden=!0,fe("scoreboard").hidden=!0,document.documentElement.dataset.playing="false",document.pointerLockElement&&document.exitPointerLock?.(),an()}addEventListener("botstrike:immersive",i=>{i.detail.blocked&&xn()});async function _n(){if(window.BotStrikeImmersive?.blocked){xn();return}if(xe?.status!=="running"||An?.readyState!==WebSocket.OPEN){kt("Waiting for your squad connection\u2026");return}if(ji.ready(),Xt=!0,fe("panel").hidden=!0,fe("buy-menu").hidden=!0,fe("scoreboard").hidden=!0,document.documentElement.dataset.playing="true",Si(),Gn.focus(),!Je.touch)try{await Gn.requestPointerLock()}catch{kt("Mouse capture unavailable: hold and drag to aim.")}an()}async function ii(i,e={}){if(Mu)return null;let t=i==="leave"?xe?.id:null;Mu=!0;for(let n of["quick","practice","private","join","start","rematch","room-hero"])fe(n).disabled=!0;try{let n=await fetch(Ba+"/action",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:i,...e}),signal:AbortSignal.timeout(15e3)}),s=await n.json();if(!n.ok)throw Error(s.error||"Request failed");return t&&(Mr.add(t),Mr.size>100&&Mr.delete(Mr.values().next().value)),["create","join","queue"].includes(i)&&s.room&&Mr.delete(s.room.id),Ou(s),s}catch(n){return kt(n.message,!0),null}finally{Mu=!1;for(let n of["quick","practice","private","join","start","rematch","room-hero"])fe(n).disabled=!1}}var hl=()=>({mode:fe("mode").value,map:Fu,hero:Nu,difficulty:Number(fe("difficulty").value)});fe("quick").onclick=async()=>{await ii("queue",hl())&&_n()};fe("practice").onclick=async()=>{await ii("create",{...hl(),kind:"practice"})&&_n()};fe("private").onclick=()=>ii("create",{...hl(),kind:"private"});fe("start").onclick=async()=>{await ii("start")&&_n()};fe("join").onclick=async()=>{let i=fe("invite").value.trim().toLowerCase();if(!/^[a-f0-9]{24}$/.test(i)){kt("Enter the full 24-character invite code.",!0);return}await ii("join",{room:i,hero:Nu})&&_n()};fe("invite").onkeydown=i=>{i.key==="Enter"&&fe("join").click()};fe("resume").onclick=_n;fe("menu-toggle").onclick=()=>Xt?xn():_n();fe("leave").onclick=()=>{xn(),ii("leave")};fe("copy").onclick=()=>navigator.clipboard.writeText(xe.id).then(()=>kt("Invite copied.")).catch(()=>kt("Invite: "+xe.id));fe("rematch").onclick=async()=>{let i={...hl(),mode:xe.config.mode,map:xe.config.map,kind:xe.kind};await ii("create",i)&&_n()};fe("export").onclick=async()=>{try{let i=await fetch(Ba+"/export");if(!i.ok)throw Error("Replay export unavailable");let e=URL.createObjectURL(await i.blob()),t=document.createElement("a");t.href=e,t.download="botstrike-"+xe.id+".json",t.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)}catch(i){kt(i.message,!0)}};for(let[i,e]of ut.heroes.entries()){let t=document.createElement("option");t.value=i,t.textContent=e.name+" \xB7 "+e.role,fe("room-hero").append(t)}fe("room-hero").onchange=()=>ii("hero",{hero:Number(fe("room-hero").value)});function Vp(i=1){let e=xe?.state?.players[xe.slot];if(!e||e.alive)return;let t=xe.state.players.filter(s=>s.team===e.team&&s.alive);if(!t.length)return;let n=Math.max(0,t.findIndex(s=>s.slot===xe.spectate));ii("spectate",{slot:t[(n+i+t.length)%t.length].slot})}fe("spectate-next").onclick=()=>Vp();fe("career-refresh").onclick=async()=>{let i=fe("career-refresh");i.disabled=!0;try{let e=await fetch(Ba+"/career",{signal:AbortSignal.timeout(1e4)});if(!e.ok)throw Error("History unavailable. Try again.");let t=await e.json();Qe("career-summary",`${t.matches} matches \xB7 ${t.wins} wins / ${t.losses} losses / ${t.draws} draws \xB7 ${t.kills} kills / ${t.deaths} deaths \xB7 ${Math.round(t.ticks/64/60)} minutes controlled`),fe("career-history").replaceChildren(...t.history.map(n=>{let s=document.createElement("div");s.className="career-row";let r=document.createElement("span"),a=document.createElement("span");r.textContent=ut.maps[n.map].name+" \xB7 "+(n.mode==="deathmatch"?"DEATHMATCH":"DEMOLITION");let o=document.createElement("small");return o.textContent=new Date(n.finishedAt).toLocaleString()+" \xB7 "+n.kind,r.append(o),a.textContent=(n.outcome==="left"?"NO RESULT":n.outcome.toUpperCase())+" \xB7 "+n.kills+" / "+n.deaths,s.append(r,a),s})),t.history.length||Qe("career-summary","No recorded matches yet. Complete a match to start your career.")}catch(e){Qe("career-summary",e.message)}finally{i.disabled=!1}};function Wp(){if(!xe?.state)return;let i=document.createDocumentFragment(),e=document.createElement("div");e.className="score-row",e.innerHTML="<span>PILOT / HERO</span><span>K</span><span>D</span><span>A</span><span>DMG</span>",i.append(e);for(let t of[...xe.state.players].sort((n,s)=>n.team-s.team||s.kills-n.kills)){let n=document.createElement("div");n.className="score-row",n.dataset.team=t.team,n.innerHTML=`<span><b>${t.slot===xe.slot?"YOU":xe.roster[t.slot].name}</b><br><small>${ut.heroes[t.hero].name}${t.alive?"":" \xB7 OFFLINE"}</small></span><span>${t.kills}</span><span>${t.deaths}</span><span>${t.assists}</span><span>${t.damage}</span>`,i.append(n)}fe("score-rows").replaceChildren(i)}var cl=!1;function qp(i=!1){cl=i,Wp(),fe("scoreboard").hidden=!1,Si(),document.pointerLockElement&&document.exitPointerLock?.()}fe("score-open").onclick=()=>qp();fe("score-close").onclick=()=>{Xt?_n():fe("scoreboard").hidden=!0};var Xp=[...ut.weapons.map((i,e)=>({...i,item:e,kind:"weapon",index:e})),...ut.items.map((i,e)=>({...i,item:ut.weapons.length+e,kind:"equipment",index:e}))];for(let i of Xp){let e=document.createElement("button");e.dataset.item=i.item,e.dataset.kind=i.kind,e.innerHTML=`<img src="./art/${i.kind}-${i.index}.webp" alt="${i.name} model" loading="lazy"><b>${i.name}</b><span class="armory-action"></span><small>${i.description}</small>`,e.onclick=async()=>{let t=xe?.state?.players[xe.slot];if(t){if(i.kind==="weapon"&&t.owned[i.index]){Ts=i.index,await _n();return}if(xe.state.phase==="buy"){await ii("buy",{item:i.item}),i.kind==="weapon"&&(Ts=null);return}i.kind==="equipment"&&i.index>0&&t.items[i.index]>0&&(fe("utility-choice").value=i.index,await _n(),Tr.utility=performance.now()+100,an())}},fe("buy-items").append(e)}for(let[i,e]of ut.items.entries()){if(i===0)continue;let t=document.createElement("option");t.value=i,t.textContent=e.name,fe("utility-choice").append(t)}fe("utility-choice").value="2";for(let i of["weapon","equipment"]){let e=document.createElement("button");e.textContent=i==="weapon"?"WEAPONS / 12":"EQUIPMENT / 12",e.setAttribute("aria-pressed",String(i==="weapon")),e.onclick=()=>{for(let t of fe("armory-tabs").children)t.setAttribute("aria-pressed",String(t===e));for(let t of fe("buy-items").children)t.hidden=t.dataset.kind!==i},fe("armory-tabs").append(e)}for(let i of fe("buy-items").children)i.hidden=i.dataset.kind!=="weapon";function jp(){!xe?.state||xe.status!=="running"||(Si(),fe("buy-menu").hidden=!1,document.pointerLockElement&&document.exitPointerLock?.(),Kp())}function Kp(){let i=xe?.state?.players[xe.slot];if(!i)return;let e=xe.state.phase==="buy";Qe("buy-balance",e?"\u20A1 "+i.credits+" AVAILABLE \xB7 "+Math.ceil(xe.state.phase_ticks/64)+"s BUY TIME":"FIELD LOADOUT \xB7 SELECT A WEAPON OR DEPLOY EQUIPMENT"),[...fe("buy-items").children].forEach((t,n)=>{let s=Xp[n],r=s.kind==="weapon"&&i.owned[s.index],a=i.items[s.index]||0,o=s.kind==="equipment"&&(s.index===0?i.armor>=100:a>=s.capacity);t.disabled=!i.alive||!r&&(e?i.credits<s.cost||o:s.kind==="weapon"||s.index===0||a===0),t.querySelector(".armory-action").textContent=r?i.weapon===s.index?"EQUIPPED":"EQUIP":e?"\u20A1 "+s.cost+(s.kind==="equipment"&&s.index>0?" \xB7 "+a+"/"+s.capacity:""):s.index===0?"PASSIVE ARMOR":(s.activation==="throw"?"DEPLOY":"USE")+" \xB7 "+a,t.setAttribute("aria-pressed",String(r&&i.weapon===s.index))})}fe("buy-open").onclick=jp;fe("buy-close").onclick=()=>_n();function Ou(i){if(!("room"in i))return;let e=i.room;if(e&&Mr.has(e.id)||e&&xe?.id===e.id&&(e.state?.tick||0)<(xe.state?.tick||0))return;if(xe=e,fe("selection").hidden=!!xe,fe("room-info").hidden=!xe,fe("hud").hidden=!xe?.state,fe("touch").hidden=!xe||xe.status!=="running"||!Je.touch||xe.state?.players[xe.slot]?.alive===!1,!xe){Eu=null,Mi=null,xn(),kt("Choose your chassis. Find your squad.");return}xe.id!==Eu&&(ol.reset(),Eu=xe.id,Su=-1,sl=null,Mi=null,Oa=0,Ts=null,$v.length=0,Tu=!1,Vt?.setMap(xe.config.map)),fe("start").hidden=xe.status!=="waiting"||!xe.host||xe.kind==="public",fe("resume").hidden=xe.status!=="running",fe("copy").hidden=xe.kind==="practice",fe("rematch").hidden=!["finished","failed","interrupted","cancelled","expired"].includes(xe.status),fe("export").hidden=!xe.proof?.verified,Qe("room-title",`${ut.maps[xe.config.map].name} / ${xe.config.mode==="deathmatch"?"TEAM DEATHMATCH":"RELAY DEMOLITION"}`);let t=xe.roster.map((s,r)=>`${s.name}:${xe.state?.players[r]?.hero??xe.config.heroes[r]}:${s.connected}`).join("|");fe("roster").dataset.roster!==t&&(fe("roster").dataset.roster=t,fe("roster").innerHTML=xe.roster.map((s,r)=>`<div class="roster-seat" data-team="${Math.floor(r/5)}">${r===xe.slot?"YOU":s.name}<small>${ut.heroes[xe.state?.players[r]?.hero??xe.config.heroes[r]].name} \xB7 ${s.bot?"AI":s.connected?"CONNECTED":"AI COVER"}</small></div>`).join("")),xe.status==="waiting"&&(Qe("result-title","SQUAD ASSEMBLY"),Qe("room-status",xe.kind==="public"?"Finding players for a fresh match. Empty seats are filled by AI after 10 seconds.":"Share the invite. The host starts when ready; bots fill every empty seat."),xn());let n=xe.state?.players[xe.slot]?.hero??xe.config.heroes[xe.slot];if(document.activeElement!==fe("room-hero")&&(fe("room-hero").value=String(xe.selectedHero??n)),fe("room-hero").disabled=!["running","waiting"].includes(xe.status),Qe("hero-switch-hint",xe.selectedHero!=null&&xe.selectedHero!==n?"Queued: "+ut.heroes[xe.selectedHero].name+" \xB7 applies during buy time or on reboot.":"Changes apply during buy time or on your next reboot."),Op.accept(xe),Vt?.accept(xe),xe.state&&xe.state.tick!==Su){let s=xe.state,r=s.players[xe.slot],a=performance.now();Su=s.tick,ol.push(s,a),Oa=Math.max(Oa,r.last_seq),!Mi||r.alive&&!Tu?(Sr.reset(r,a),Mi=Sr.position,Rn=r.yaw,Er=r.pitch,Lu=-1):(Sr.reconcile(r,a,ut.maps[s.config.map],ut.heroes[r.hero],ut.weapons[r.weapon],r.alive&&s.phase==="live"),Mi=Sr.position),Tu=r.alive,sl!==null&&r.ammo[r.weapon]<sl&&a-Iu>Math.min(500,al+100)&&(ji.shot(r.weapon),Vt?.shoot(xe.slot,r,a),Iu=a),sl=r.ammo[r.weapon],Yv=r.health,Qe("score-a",s.score[0]),Qe("score-b",s.score[1]),Qe("phase",s.phase==="buy"?"BUY PHASE":s.phase==="round_end"?"ROUND COMPLETE":s.config.mode==="deathmatch"?"TEAM DEATHMATCH":"RELAY DEMOLITION");let o=Math.ceil((s.objective.planted?s.objective.fuse:s.phase_ticks)/64);Qe("clock",`${Math.floor(o/60)}:${String(o%60).padStart(2,"0")}`),Qe("round",s.config.mode==="deathmatch"?"FIRST TO 50":`ROUND ${s.round} \xB7 FIRST TO 13`);let l=ut.heroes[r.hero];Qe("hero-label",l.name+" / "+l.role.toUpperCase()),Qe("health",r.health),Qe("armor",r.armor),fe("health-bar").max=l.health,fe("health-bar").value=r.health,Qe("weapon-label",ut.weapons[r.weapon].name),Qe("ammo",r.ammo[r.weapon]),Qe("reserve","/ "+r.reserve[r.weapon]),Qe("reload-state",r.reload?"RELOADING "+(r.reload/64).toFixed(1)+"s":r.ammo[r.weapon]===0?bn(Je.bindings.reload)+" \xB7 RELOAD":"");let c=r.disabled||r.skill_wait;if(Qe("touch-skill-value",c?Math.ceil(c/64):""),fe("touch-skill-value").hidden=!c,fe("touch-skill").classList.toggle("cooling",!!c),fe("touch-scope").hidden=!ut.weapons[r.weapon].scoped,fe("touch-interact").hidden=s.config.mode!=="demolition",Qe("touch-utility-value",r.items[Number(fe("utility-choice").value)]),fe("touch-utility").setAttribute("aria-label","Use "+ut.items[Number(fe("utility-choice").value)].name),Qe("gear-label",ut.items[Number(fe("utility-choice").value)].name+" \xD7 "+r.items[Number(fe("utility-choice").value)]+" \xB7 "+bn(Je.bindings.utility)),!fe("buy-menu").hidden)for(let h of fe("utility-choice").options){let f=ut.items[Number(h.value)].name+" \xD7 "+r.items[Number(h.value)];h.textContent!==f&&(h.textContent=f)}Qe("skill-name",l.ability.toUpperCase()),Qe("skill-state",r.disabled?"EMP "+Math.ceil(r.disabled/64)+"s":r.skill_wait?Math.ceil(r.skill_wait/64)+"s":bn(Je.bindings.skill)+" \xB7 READY"),fe("scope").hidden=!r.scoped||!r.alive;let u="";if(s.config.mode==="demolition"){let h=r.team===s.attacker;u=s.objective.planted?h?"DEFEND THE RELAY":"HOLD "+bn(Je.bindings.use)+" / USE TO DEFUSE":h?s.objective.carrier===xe.slot?"CARRYING RELAY \xB7 HOLD "+bn(Je.bindings.use)+" / USE AT A OR B":"ESCORT THE RELAY TO A OR B":"DEFEND A AND B",s.objective.actor!==null&&(u+=" \xB7 "+(s.objective.progress/64).toFixed(1)+"s")}Qe("objective-hud",u),fe("buy-open").hidden=!r.alive,Qe("credits",r.credits),fe("buy-menu").hidden||Kp(),fe("death").hidden=r.alive||s.phase==="buy"||s.phase==="round_end";let d=r.alive?null:s.players[xe.spectate]?.alive&&s.players[xe.spectate].team===r.team?s.players[xe.spectate]:s.players.find(h=>h.team===r.team&&h.alive);fe("spectating").hidden=!d,fe("spectate-next").disabled=s.players.filter(h=>h.team===r.team&&h.alive).length<2,d&&Qe("spectator-name","WATCHING "+xe.roster[d.slot].name),Qe("respawn-label",s.config.mode==="deathmatch"?"REBOOT IN "+Math.ceil(r.respawn/64)+"s":"SPECTATING \xB7 NEXT ROUND"),Bp(fe("radar").getContext("2d"),ut.maps[s.config.map],240,s.players,xe.slot,s.objective),fe("scoreboard").hidden||Wp()}if(xe.status==="running"&&(Qe("result-title","YOUR SQUAD IS LIVE"),Qe("room-status","The match continues while you are in the menu. Disconnected seats are covered by AI."),kt("Connected \xB7 "+(al?Math.round(al)+" ms":"squad ready"))),["finished","sealing"].includes(xe.status)){xn();let s=xe.state?.winner===xe.state?.players[xe.slot]?.team;Qe("result-title",xe.state?.winner===null?"MATCH DRAW":s?"NETWORK SECURED":"RELAY LOST"),Qe("room-status",xe.status==="sealing"?"Verifying the complete native match replay\u2026":xe.proof?.verified?"Native replay verified. Your signed match export is ready. Replays are kept for 30 days.":"Match ended."),xe.status==="finished"&&kt("Match complete. Choose rematch or leave to change loadout.")}["failed","interrupted","expired","cancelled"].includes(xe.status)&&(xn(),Qe("result-title","MATCH INTERRUPTED"),Qe("room-status",xe.error||"Start another match."),kt(xe.error||"Room closed.",!0))}function Yp(){if(Ru)return;clearTimeout(Cu);let i=new WebSocket(location.origin.replace(/^http/,"ws")+Ba+"/socket");An=i,i.onopen=()=>{i===An&&(Dp=0,Pu=performance.now())},i.onmessage=e=>{if(i===An){Pu=performance.now();try{let t=JSON.parse(e.data);t.type==="state"?(Ou(t),Ms?.session(),clearTimeout(ll)):t.type==="pong"?al=performance.now()-t.time:t.type==="error"&&kt(t.error,!0)}catch(t){console.error("BotStrike state update failed",t),i.close()}}},i.onclose=()=>{Ru||i!==An||(xn(),kt("Connection interrupted. Reconnecting; AI covers your seat."),Cu=setTimeout(Yp,Math.min(1e4,500*2**Math.min(Dp++,5))))},i.onerror=()=>{}}var Jp={sensitivity:"sensitivity",fov:"fov",ads:"ads",volume:"volume",brightness:"brightness",crosshair:"crosshair-size",crosshairColor:"crosshair-color",sound:"sound",motion:"motion",touch:"touch-controls",invertY:"invert-y",haptics:"haptics"};function ul(){try{localStorage.setItem("botstrike:settings",JSON.stringify(Je))}catch{}}function Zp(){for(let[i,e]of Object.entries(Jp))Je[i]=typeof Je[i]=="boolean"?fe(e).checked:i==="crosshairColor"?fe(e).value:Number(fe(e).value);ul(),document.documentElement.dataset.touch=String(Je.touch),fe("touch").hidden=!Je.touch||xe?.status!=="running",document.documentElement.style.setProperty("--reticle",Je.crosshairColor),document.documentElement.style.setProperty("--reticle-size",Je.crosshair),Vt?.resize(Je.fov),Vt?.exposure(Je.brightness),ji.setVolume()}for(let[i,e]of Object.entries(Jp))typeof Je[i]=="boolean"?fe(e).checked=Je[i]:fe(e).value=Je[i],fe(e).oninput=Zp;Zp();var Es=null;function Ar(){fe("key-bindings").replaceChildren(...Object.keys(ys).map(i=>{let e=document.createElement("button");return e.dataset.action=i,e.setAttribute("aria-pressed",String(Es===i)),e.textContent=(_u[i]||"Weapon "+(Number(i.slice(6))+1))+" \xB7 "+bn(Je.bindings[i]),e.onclick=()=>{Es=i,Qe("binding-status","Press a key or mouse button for "+(_u[i]||i)+". Escape cancels."),Ar(),fe("key-bindings").querySelector(`[data-action="${i}"]`).focus()},e})),Qe("controls-guide","Move "+["forward","left","back","right"].map(i=>bn(Je.bindings[i])).join(" / ")+" \xB7 Crouch "+bn(Je.bindings.crouch)+" \xB7 Reload "+bn(Je.bindings.reload)+" \xB7 Skill "+bn(Je.bindings.skill)+" \xB7 Use "+bn(Je.bindings.use)+" \xB7 Armory "+bn(Je.bindings.armory)+" \xB7 Hold "+bn(Je.bindings.scoreboard)+" for scoreboard. Mouse wheel cycles weapons. Escape opens the menu.")}function $p(i){if(Es){if(i.preventDefault(),i.stopImmediatePropagation(),i.code==="Escape"){Es=null,Qe("binding-status","Binding cancelled."),Ar();return}try{if(i.ctrlKey||i.metaKey||i.altKey)throw Error("Browser shortcut combinations are reserved.");Je.bindings=Mp(Je.bindings,Es,i.type==="mousedown"?"Mouse"+i.button:i.code),Es=null,Si(),ul(),Ar(),Qe("binding-status","Saved. Conflicting controls were swapped.")}catch(e){Qe("binding-status",e.message)}}}addEventListener("keydown",$p,!0);addEventListener("mousedown",$p,!0);fe("keyboard-layout").value=Je.keyboardLayout;fe("keyboard-layout").onchange=()=>{Je.keyboardLayout=fe("keyboard-layout").value,Si(),ul(),Ar()};fe("reset-bindings").onclick=()=>{Je.bindings={...ys},Es=null,Si(),ul(),Ar(),Qe("binding-status","Default controls restored.")};Ar();function Qp(i,e){let t=Sp(Je,!!xe?.state?.players[xe.slot]?.scoped);Rn-=i*t,Rn=Math.atan2(Math.sin(Rn),Math.cos(Rn)),Er=Math.max(-1.5,Math.min(1.5,Er-e*t*(Je.invertY?-1:1)))}function em(i){let e=Object.keys(Je.bindings).find(t=>Je.bindings[t]===i);if(!e&&i!=="ShiftRight")return!1;if(e==="scoreboard")return fe("scoreboard").hidden&&qp(!0),!0;if(e==="armory")return fe("buy-menu").hidden?jp():_n(),!0;if(!fe("buy-menu").hidden||!fe("scoreboard").hidden)return!1;if(e?.startsWith("weapon")){let t=Number(e.slice(6));xe?.state?.players[xe.slot]?.owned[t]&&(Ts=t)}else e==="previous"||e==="next"?ku(e==="previous"?-1:1):(ka.add(i),["skill","reload","jump"].includes(e)&&(Tr[e]=performance.now()+100),e==="fire"&&(za=!0,ji.ready()));return an(),!0}addEventListener("keydown",i=>{if(!(i.target.closest("input,select,textarea")||i.ctrlKey||i.metaKey||i.altKey)){if(i.code==="Escape"){xn();return}if(Xt){if(xe?.state?.players[xe.slot]?.alive===!1&&["ArrowLeft","ArrowRight"].includes(i.code)){i.preventDefault(),Vp(i.code==="ArrowLeft"?-1:1);return}if(i.repeat&&["armory","scoreboard","previous","next"].some(e=>Je.bindings[e]===i.code)){i.preventDefault();return}em(i.code)&&i.preventDefault()}}});function tm(i){ka.delete(i),an(),i===Je.bindings.scoreboard&&cl&&(cl=!1,fe("scoreboard").hidden||_n())}addEventListener("keyup",i=>tm(i.code));var ey=Lp(["buy-menu","scoreboard"]);Gn.addEventListener("webglcontextlost",()=>{Si(),kt("Graphics interrupted. Restoring the scene\u2026",!0)});Gn.addEventListener("webglcontextrestored",()=>kt("Graphics restored."));Gn.oncontextmenu=i=>i.preventDefault();Gn.onmousedown=i=>{Xt&&em("Mouse"+i.button)&&i.preventDefault()};addEventListener("mouseup",i=>tm("Mouse"+i.button));addEventListener("mousemove",i=>{Xt&&fe("buy-menu").hidden&&fe("scoreboard").hidden&&(document.pointerLockElement===Gn||i.buttons&&i.target===Gn)&&(Qp(i.movementX,i.movementY),an())});var rl=!1;document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===Gn?!Xt||!fe("buy-menu").hidden||!fe("scoreboard").hidden?(rl=!1,document.exitPointerLock?.()):rl=!0:rl&&(rl=!1,Xt&&fe("buy-menu").hidden&&fe("scoreboard").hidden&&xn())});addEventListener("blur",xn);document.addEventListener("visibilitychange",()=>{document.hidden&&xn()});for(let[i,e]of[["move-pad","move"],["look-pad","look"],["touch-fire","fire"]]){let t=fe(i),n=null,s=null;Uu.push(()=>{let r=n;n=null,s=null,r!==null&&t.hasPointerCapture(r)&&t.releasePointerCapture(r)}),t.onpointerdown=r=>{!Xt||n!==null||(r.preventDefault(),n=r.pointerId,s=[r.clientX,r.clientY],t.setPointerCapture(n),e==="fire"&&(wr.fire=!0,za=!0,ji.ready(),an()))},t.onpointermove=r=>{if(n!==r.pointerId||!Xt)return;let a=r.clientX-s[0],o=r.clientY-s[1];if(e==="move"){let l=Math.max(40,Math.hypot(a,o));Ss={x:a/l,y:o/l},fe("move-knob").style.transform=`translate(${Ss.x*30}px,${Ss.y*30}px)`}else Qp(a*1.5,o*1.5),s=[r.clientX,r.clientY];an()};for(let r of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(r,a=>{a.pointerId===n&&(n=null,s=null,e==="move"&&(Ss={x:0,y:0},fe("move-knob").style.transform="translate(0,0)"),e==="fire"&&(wr.fire=!1),an())})}for(let[i,e]of[["touch-skill","skill"],["touch-reload","reload"],["touch-scope","scope"],["touch-jump","jump"],["touch-crouch","crouch"],["touch-interact","interact"],["touch-utility","utility"]]){let t=null,n=fe(i);Uu.push(()=>{let s=t;t=null,s!==null&&n.hasPointerCapture(s)&&n.releasePointerCapture(s)}),n.onpointerdown=s=>{!Xt||t!==null||(s.preventDefault(),t=s.pointerId,n.setPointerCapture(t),wr[e]=!0,Tr[e]=performance.now()+100,an())};for(let s of["pointerup","pointercancel","lostpointercapture"])n.addEventListener(s,r=>{r.pointerId===t&&(t=null,wr[e]=!1,s!=="pointerup"&&(Tr[e]=0),an())})}function ku(i=1){let e=xe?.state?.players[xe.slot];if(e){let t=e.owned.map((n,s)=>n?s:-1).filter(n=>n>=0);Ts=t[(t.indexOf(Ts??e.weapon)+i+t.length)%t.length],an()}}fe("touch-weapon").onclick=()=>ku();Gn.addEventListener("wheel",i=>{Xt&&fe("buy-menu").hidden&&(i.preventDefault(),ku(Math.sign(i.deltaY)||1))},{passive:!1});var nm,im,sm,ll,Du,Au="assets";try{kt("Loading chassis artwork\u2026");let i=["./art/keyart.webp",...ut.heroes.map((t,n)=>"./art/hero-"+n+".webp"),...ut.maps.map((t,n)=>"./art/map-"+n+".webp")];await Promise.all(i.map(t=>new Promise((n,s)=>{let r=new Image,a=setTimeout(()=>s(Error("Artwork download timed out. Try again.")),2e4);r.src=t,r.decode().then(()=>{clearTimeout(a),n()},()=>{clearTimeout(a),s(Error("Artwork could not load. Try again."))})}))),Ms?.assets(),Au="graphics",kt("Preparing chassis and environment\u2026"),Vt=Tp(Gn,ut),await Vt.preload((t,n)=>kt("Loading chassis "+t+" / "+n+"\u2026")),Vt.setMap(Fu),Vt.resize(Je.fov),Vt.exposure(Je.brightness),addEventListener("resize",()=>{Si(),cancelAnimationFrame(Du),Du=requestAnimationFrame(()=>Vt.resize(Je.fov))}),Au="session";let e=await fetch(Ba+"/state",{signal:AbortSignal.timeout(15e3)});if(!e.ok)throw Error("Open BotStrike through UTXOPlay to start your session.");Ou(await e.json()),ll=setTimeout(()=>{Ms?.state.ready||(Ms?.fail("session"),kt("Connection timed out. Please reload to try again.",!0))},2e4),Yp(),nm=Cp((t,n)=>{let s=Math.min(.1,n/1e3),r=xe?.state,a=r?.players[xe.slot];if(a&&Mi){let o=Gp();Oa--,Mi=Sr.step(o,t,ut.maps[r.config.map],ut.heroes[a.hero],ut.weapons[a.weapon],a.alive&&r.phase==="live"),Hp(o,t),fe("flash").style.opacity=String(a.flash?Math.min(Fp()?.45:.95,a.flash/64):0)}Xt&&fe("buy-menu").hidden&&fe("scoreboard").hidden&&Vt.frame(ol.sample(t,xe?.slot||0)||r,xe?.slot||0,t,s,{active:Xt,yaw:Rn,pitch:Er,local:Mi,spectator:xe?.spectate,reduced:Fp()}),Op.render(t),document.documentElement.dataset.viewModelTriangles=Vt.viewModelTriangles,document.documentElement.dataset.drawCalls=Vt.renderer.info.render.calls,document.documentElement.dataset.renderTriangles=Vt.renderer.info.render.triangles},{active:()=>Xt&&xe?.status==="running",maxFps:60,maxResolution:matchMedia("(pointer:coarse)").matches?1:1.5,onResolution:t=>Vt?.resolution(t)}),Ms?.ready(),im=setInterval(an,1e3/60),sm=setInterval(()=>{if(An?.readyState===WebSocket.OPEN){if(!document.hidden&&performance.now()-Pu>3e4){An.close();return}An.send(JSON.stringify({type:"ping",time:performance.now()}))}},2e3)}catch(i){clearTimeout(ll),Ms?.fail(i.asset?"assets":Au),fe("fatal").hidden=!1,Qe("fatal",i.message),kt("Unable to initialize BotStrike.",!0),console.error(i)}addEventListener("pagehide",()=>{Ru=!0,clearTimeout(ll),clearTimeout(Cu),clearTimeout(yi),cancelAnimationFrame(Du),clearInterval(im),clearInterval(sm),An?.close(),nm?.(),Vt?.dispose(),ji.dispose(),ey()});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
