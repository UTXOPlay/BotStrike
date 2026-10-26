var Sh=0,Nl=1,bh=2;var Pi=1,Eh=2,_s=3,hi=0,Re=1,Je=2,Un=0,xs=1,Ul=2,Fl=3,Ol=4,Th=5;var Li=100,wh=101,Ah=102,Rh=103,Ch=104,Ih=200,Ph=201,Lh=202,Dh=203,Bl=204,zl=205,Nh=206,Uh=207,Fh=208,Oh=209,Bh=210,zh=211,kh=212,Vh=213,Gh=214,la=0,ca=1,ha=2,ns=3,ua=4,da=5,fa=6,pa=7,Ha=0,Hh=1,Wh=2,vn=0,kl=1,Vl=2,Gl=3,gr=4,Hl=5,Wl=6,Xl=7;var ql=300,ui=301,Di=302,Wa=303,Xa=304,_r=306,is=1e3,wn=1001,ma=1002,De=1003,Xh=1004;var xr=1005;var Oe=1006,qa=1007;var di=1008;var Ke=1009,Yl=1010,Zl=1011,vs=1012,Ya=1013,yn=1014,cn=1015,Mn=1016,Za=1017,$a=1018,ys=1020,$l=35902,Jl=35899,Kl=1021,jl=1022,hn=1023,An=1026,fi=1027,Ja=1028,Ka=1029,pi=1030,ja=1031;var Qa=1033,vr=33776,yr=33777,Mr=33778,Sr=33779,to=35840,eo=35841,no=35842,io=35843,so=36196,ro=37492,ao=37496,oo=37488,lo=37489,br=37490,co=37491,ho=37808,uo=37809,fo=37810,po=37811,mo=37812,go=37813,_o=37814,xo=37815,vo=37816,yo=37817,Mo=37818,So=37819,bo=37820,Eo=37821,To=36492,wo=36494,Ao=36495,Ro=36283,Co=36284,Er=36285,Io=36286;var zs=2300,ga=2301,aa=2302,Sl=2303,bl=2400,El=2401,Tl=2402;var qh=3200;var Tr=0,Yh=1,Xn="",Le="srgb",ks="srgb-linear",Vs="linear",ce="srgb";var oa=7680;var Zh=519,$h=512,Jh=513,Kh=514,Po=515,jh=516,Qh=517,Lo=518,tu=519,eu=35044;var Ql="300 es",xn=2e3,ss=2001;function Td(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function wd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Gs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function nu(){let i=Gs("canvas");return i.style.display="block",i}var Xc={},rs=null;function tc(...i){let t="THREE."+i.shift();rs?rs("log",t,...i):console.log(t,...i)}function iu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Xt(...i){i=iu(i);let t="THREE."+i.shift();if(rs)rs("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Yt(...i){i=iu(i);let t="THREE."+i.shift();if(rs)rs("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Ti(...i){let t=i.join(" ");t in Xc||(Xc[t]=!0,Xt(...i))}function su(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var ru={[la]:ca,[ha]:fa,[ua]:pa,[ns]:da,[ca]:la,[fa]:ha,[pa]:ua,[da]:ns},Rn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Jo=Math.PI/180,_a=180/Math.PI;function Ms(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ze[i&255]+ze[i>>8&255]+ze[i>>16&255]+ze[i>>24&255]+"-"+ze[t&255]+ze[t>>8&255]+"-"+ze[t>>16&15|64]+ze[t>>24&255]+"-"+ze[e&63|128]+ze[e>>8&255]+"-"+ze[e>>16&255]+ze[e>>24&255]+ze[n&255]+ze[n>>8&255]+ze[n>>16&255]+ze[n>>24&255]).toLowerCase()}function ee(i,t,e){return Math.max(t,Math.min(e,i))}function Ad(i,t){return(i%t+t)%t}function Ko(i,t,e){return(1-e)*i+e*t}function Cs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ye(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Mt=class i{static{i.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Cn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3],u=r[a+0],d=r[a+1],_=r[a+2],M=r[a+3];if(f!==M||c!==u||l!==d||h!==_){let m=c*u+l*d+h*_+f*M;m<0&&(u=-u,d=-d,_=-_,M=-M,m=-m);let p=1-o;if(m<.9995){let w=Math.acos(m),R=Math.sin(w);p=Math.sin(p*w)/R,o=Math.sin(o*w)/R,c=c*p+u*o,l=l*p+d*o,h=h*p+_*o,f=f*p+M*o}else{c=c*p+u*o,l=l*p+d*o,h=h*p+_*o,f=f*p+M*o;let w=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=w,l*=w,h*=w,f*=w}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[a],u=r[a+1],d=r[a+2],_=r[a+3];return t[e]=o*_+h*f+c*d-l*u,t[e+1]=c*_+h*u+l*f-o*d,t[e+2]=l*_+h*d+o*u-c*f,t[e+3]=h*_-o*f-c*u-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),f=o(r/2),u=c(n/2),d=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=u*h*f+l*d*_,this._y=l*d*f-u*h*_,this._z=l*h*_+u*d*f,this._w=l*h*f-u*d*_;break;case"YXZ":this._x=u*h*f+l*d*_,this._y=l*d*f-u*h*_,this._z=l*h*_-u*d*f,this._w=l*h*f+u*d*_;break;case"ZXY":this._x=u*h*f-l*d*_,this._y=l*d*f+u*h*_,this._z=l*h*_+u*d*f,this._w=l*h*f-u*d*_;break;case"ZYX":this._x=u*h*f-l*d*_,this._y=l*d*f+u*h*_,this._z=l*h*_-u*d*f,this._w=l*h*f+u*d*_;break;case"YZX":this._x=u*h*f+l*d*_,this._y=l*d*f+u*h*_,this._z=l*h*_-u*d*f,this._w=l*h*f-u*d*_;break;case"XZY":this._x=u*h*f-l*d*_,this._y=l*d*f-u*h*_,this._z=l*h*_+u*d*f,this._w=l*h*f+u*d*_;break;default:Xt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],f=e[10],u=n+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(h-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ee(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class i{static{i.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+c*l+a*f-o*h,this.y=n+c*h+o*l-r*f,this.z=s+c*f+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return jo.copy(this).projectOnVector(t),this.sub(jo)}reflect(t){return this.sub(jo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},jo=new N,qc=new Cn,Zt=class i{static{i.prototype.isMatrix3=!0}constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],d=n[5],_=n[8],M=s[0],m=s[3],p=s[6],w=s[1],R=s[4],x=s[7],S=s[2],b=s[5],P=s[8];return r[0]=a*M+o*w+c*S,r[3]=a*m+o*R+c*b,r[6]=a*p+o*x+c*P,r[1]=l*M+h*w+f*S,r[4]=l*m+h*R+f*b,r[7]=l*p+h*x+f*P,r[2]=u*M+d*w+_*S,r[5]=u*m+d*R+_*b,r[8]=u*p+d*x+_*P,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],f=h*a-o*l,u=o*c-h*r,d=l*r-a*c,_=e*f+n*u+s*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/_;return t[0]=f*M,t[1]=(s*l-h*n)*M,t[2]=(o*n-s*a)*M,t[3]=u*M,t[4]=(h*e-s*c)*M,t[5]=(s*r-o*e)*M,t[6]=d*M,t[7]=(n*c-l*e)*M,t[8]=(a*e-n*r)*M,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return Ti("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Qo.makeScale(t,e)),this}rotate(t){return Ti("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Qo.makeRotation(-t)),this}translate(t,e){return Ti("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Qo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Qo=new Zt,Yc=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zc=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rd(){let i={enabled:!0,workingColorSpace:ks,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ce&&(s.r=Hn(s.r),s.g=Hn(s.g),s.b=Hn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ce&&(s.r=es(s.r),s.g=es(s.g),s.b=es(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xn?Vs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ti("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ti("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ks]:{primaries:t,whitePoint:n,transfer:Vs,toXYZ:Yc,fromXYZ:Zc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:t,whitePoint:n,transfer:ce,toXYZ:Yc,fromXYZ:Zc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}}),i}var ie=Rd();function Hn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function es(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Vi,xa=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Vi===void 0&&(Vi=Gs("canvas")),Vi.width=t.width,Vi.height=t.height;let s=Vi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Vi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Gs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Hn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Hn(e[n]/255)*255):e[n]=Hn(e[n]);return{data:e,width:t.width,height:t.height}}else return Xt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Cd=0,as=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=Ms(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(tl(s[a].image)):r.push(tl(s[a]))}else r=tl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function tl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?xa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Xt("Texture: Unable to serialize Texture."),{})}var Id=0,el=new N,We=class i extends Rn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=wn,s=wn,r=Oe,a=di,o=hn,c=Ke,l=i.DEFAULT_ANISOTROPY,h=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Id++}),this.uuid=Ms(),this.name="",this.source=new as(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Mt(0,0),this.repeat=new Mt(1,1),this.center=new Mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(el).x}get height(){return this.source.getSize(el).y}get depth(){return this.source.getSize(el).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Xt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ql)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case is:t.x=t.x-Math.floor(t.x);break;case wn:t.x=t.x<0?0:1;break;case ma:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case is:t.y=t.y-Math.floor(t.y);break;case wn:t.y=t.y<0?0:1;break;case ma:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};We.DEFAULT_IMAGE=null;We.DEFAULT_MAPPING=ql;We.DEFAULT_ANISOTROPY=1;var xe=class i{static{i.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],f=c[8],u=c[1],d=c[5],_=c[9],M=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-M)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+M)<.1&&Math.abs(_+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let R=(l+1)/2,x=(d+1)/2,S=(p+1)/2,b=(h+u)/4,P=(f+M)/4,v=(_+m)/4;return R>x&&R>S?R<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(R),s=b/n,r=P/n):x>S?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=b/s,r=v/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=P/r,s=v/r),this.set(n,s,r,e),this}let w=Math.sqrt((m-_)*(m-_)+(f-M)*(f-M)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(m-_)/w,this.y=(f-M)/w,this.z=(u-h)/w,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this.w=ee(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this.w=ee(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},va=class extends Rn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Oe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new We(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Oe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new as(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ze=class extends va{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Hs=class extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=De,this.minFilter=De,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ya=class extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=De,this.minFilter=De,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var de=class i{static{i.prototype.isMatrix4=!0}constructor(t,e,n,s,r,a,o,c,l,h,f,u,d,_,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,f,u,d,_,M,m)}set(t,e,n,s,r,a,o,c,l,h,f,u,d,_,M,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=_,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Gi.setFromMatrixColumn(t,0).length(),r=1/Gi.setFromMatrixColumn(t,1).length(),a=1/Gi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=a*h,d=a*f,_=o*h,M=o*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=d+_*l,e[5]=u-M*l,e[9]=-o*c,e[2]=M-u*l,e[6]=_+d*l,e[10]=a*c}else if(t.order==="YXZ"){let u=c*h,d=c*f,_=l*h,M=l*f;e[0]=u+M*o,e[4]=_*o-d,e[8]=a*l,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=d*o-_,e[6]=M+u*o,e[10]=a*c}else if(t.order==="ZXY"){let u=c*h,d=c*f,_=l*h,M=l*f;e[0]=u-M*o,e[4]=-a*f,e[8]=_+d*o,e[1]=d+_*o,e[5]=a*h,e[9]=M-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let u=a*h,d=a*f,_=o*h,M=o*f;e[0]=c*h,e[4]=_*l-d,e[8]=u*l+M,e[1]=c*f,e[5]=M*l+u,e[9]=d*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let u=a*c,d=a*l,_=o*c,M=o*l;e[0]=c*h,e[4]=M-u*f,e[8]=_*f+d,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=d*f+_,e[10]=u-M*f}else if(t.order==="XZY"){let u=a*c,d=a*l,_=o*c,M=o*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=u*f+M,e[5]=a*h,e[9]=d*f-_,e[2]=_*f-d,e[6]=o*h,e[10]=M*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Pd,t,Ld)}lookAt(t,e,n){let s=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),Kn.crossVectors(n,je),Kn.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),Kn.crossVectors(n,je)),Kn.normalize(),Fr.crossVectors(je,Kn),s[0]=Kn.x,s[4]=Fr.x,s[8]=je.x,s[1]=Kn.y,s[5]=Fr.y,s[9]=je.y,s[2]=Kn.z,s[6]=Fr.z,s[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],d=n[13],_=n[2],M=n[6],m=n[10],p=n[14],w=n[3],R=n[7],x=n[11],S=n[15],b=s[0],P=s[4],v=s[8],A=s[12],D=s[1],z=s[5],X=s[9],Z=s[13],B=s[2],$=s[6],ot=s[10],st=s[14],pt=s[3],rt=s[7],ct=s[11],ht=s[15];return r[0]=a*b+o*D+c*B+l*pt,r[4]=a*P+o*z+c*$+l*rt,r[8]=a*v+o*X+c*ot+l*ct,r[12]=a*A+o*Z+c*st+l*ht,r[1]=h*b+f*D+u*B+d*pt,r[5]=h*P+f*z+u*$+d*rt,r[9]=h*v+f*X+u*ot+d*ct,r[13]=h*A+f*Z+u*st+d*ht,r[2]=_*b+M*D+m*B+p*pt,r[6]=_*P+M*z+m*$+p*rt,r[10]=_*v+M*X+m*ot+p*ct,r[14]=_*A+M*Z+m*st+p*ht,r[3]=w*b+R*D+x*B+S*pt,r[7]=w*P+R*z+x*$+S*rt,r[11]=w*v+R*X+x*ot+S*ct,r[15]=w*A+R*Z+x*st+S*ht,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],f=t[6],u=t[10],d=t[14],_=t[3],M=t[7],m=t[11],p=t[15],w=c*d-l*u,R=o*d-l*f,x=o*u-c*f,S=a*d-l*h,b=a*u-c*h,P=a*f-o*h;return e*(M*w-m*R+p*x)-n*(_*w-m*S+p*b)+s*(_*R-M*S+p*P)-r*(_*x-M*b+m*P)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],f=t[9],u=t[10],d=t[11],_=t[12],M=t[13],m=t[14],p=t[15],w=e*o-n*a,R=e*c-s*a,x=e*l-r*a,S=n*c-s*o,b=n*l-r*o,P=s*l-r*c,v=h*M-f*_,A=h*m-u*_,D=h*p-d*_,z=f*m-u*M,X=f*p-d*M,Z=u*p-d*m,B=w*Z-R*X+x*z+S*D-b*A+P*v;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let $=1/B;return t[0]=(o*Z-c*X+l*z)*$,t[1]=(s*X-n*Z-r*z)*$,t[2]=(M*P-m*b+p*S)*$,t[3]=(u*b-f*P-d*S)*$,t[4]=(c*D-a*Z-l*A)*$,t[5]=(e*Z-s*D+r*A)*$,t[6]=(m*x-_*P-p*R)*$,t[7]=(h*P-u*x+d*R)*$,t[8]=(a*X-o*D+l*v)*$,t[9]=(n*D-e*X-r*v)*$,t[10]=(_*b-M*x+p*w)*$,t[11]=(f*x-h*b-d*w)*$,t[12]=(o*A-a*z-c*v)*$,t[13]=(e*z-n*A+s*v)*$,t[14]=(M*R-_*S-m*w)*$,t[15]=(h*S-f*R+u*w)*$,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,f=o+o,u=r*l,d=r*h,_=r*f,M=a*h,m=a*f,p=o*f,w=c*l,R=c*h,x=c*f,S=n.x,b=n.y,P=n.z;return s[0]=(1-(M+p))*S,s[1]=(d+x)*S,s[2]=(_-R)*S,s[3]=0,s[4]=(d-x)*b,s[5]=(1-(u+p))*b,s[6]=(m+w)*b,s[7]=0,s[8]=(_+R)*P,s[9]=(m-w)*P,s[10]=(1-(u+M))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Gi.set(s[0],s[1],s[2]).length(),o=Gi.set(s[4],s[5],s[6]).length(),c=Gi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),pn.copy(this);let l=1/a,h=1/o,f=1/c;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=f,pn.elements[9]*=f,pn.elements[10]*=f,e.setFromRotationMatrix(pn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=xn,c=!1){let l=this.elements,h=2*r/(e-t),f=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),_,M;if(c)_=r/(a-r),M=a*r/(a-r);else if(o===xn)_=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===ss)_=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=xn,c=!1){let l=this.elements,h=2/(e-t),f=2/(n-s),u=-(e+t)/(e-t),d=-(n+s)/(n-s),_,M;if(c)_=1/(a-r),M=a/(a-r);else if(o===xn)_=-2/(a-r),M=-(a+r)/(a-r);else if(o===ss)_=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=_,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Gi=new N,pn=new de,Pd=new N(0,0,0),Ld=new N(1,1,1),Kn=new N,Fr=new N,je=new N,$c=new de,Jc=new Cn,In=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ee(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ee(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Xt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return $c.makeRotationFromQuaternion(t),this.setFromRotationMatrix($c,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Jc.setFromEuler(this),this.setFromQuaternion(Jc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};In.DEFAULT_ORDER="XYZ";var Ws=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Dd=0,Kc=new N,Hi=new Cn,Bn=new de,Or=new N,Is=new N,Nd=new N,Ud=new Cn,jc=new N(1,0,0),Qc=new N(0,1,0),th=new N(0,0,1),eh={type:"added"},Fd={type:"removed"},Wi={type:"childadded",child:null},nl={type:"childremoved",child:null},Ae=class i extends Rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dd++}),this.uuid=Ms(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new N,e=new In,n=new Cn,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new Zt}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.premultiply(Hi),this}rotateX(t){return this.rotateOnAxis(jc,t)}rotateY(t){return this.rotateOnAxis(Qc,t)}rotateZ(t){return this.rotateOnAxis(th,t)}translateOnAxis(t,e){return Kc.copy(t).applyQuaternion(this.quaternion),this.position.add(Kc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(jc,t)}translateY(t){return this.translateOnAxis(Qc,t)}translateZ(t){return this.translateOnAxis(th,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Or.copy(t):Or.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(Is,Or,this.up):Bn.lookAt(Or,Is,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),Hi.setFromRotationMatrix(Bn),this.quaternion.premultiply(Hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Yt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(eh),Wi.child=t,this.dispatchEvent(Wi),Wi.child=null):Yt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Fd),nl.child=t,this.dispatchEvent(nl),nl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(eh),Wi.child=t,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,t,Nd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,Ud,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),d=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ae.DEFAULT_UP=new N(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Me=class extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}},Od={type:"move"},os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Me,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Me,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Me,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let M of t.hand.values()){let m=e.getJointPose(M,n),p=this._getHandJoint(l,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,_=.005;l.inputState.pinching&&u>d+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=d-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Od)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Me;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},au={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Br={h:0,s:0,l:0};function il(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var $t=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ie.workingColorSpace){return this.r=t,this.g=e,this.b=n,ie.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ie.workingColorSpace){if(t=Ad(t,1),e=ee(e,0,1),n=ee(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=il(a,r,t+1/3),this.g=il(a,r,t),this.b=il(a,r,t-1/3)}return ie.colorSpaceToWorking(this,s),this}setStyle(t,e=Le){function n(r){r!==void 0&&parseFloat(r)<1&&Xt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Xt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Xt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){let n=au[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Xt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hn(t.r),this.g=Hn(t.g),this.b=Hn(t.b),this}copyLinearToSRGB(t){return this.r=es(t.r),this.g=es(t.g),this.b=es(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return ie.workingToColorSpace(ke.copy(this),t),Math.round(ee(ke.r*255,0,255))*65536+Math.round(ee(ke.g*255,0,255))*256+Math.round(ee(ke.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.workingToColorSpace(ke.copy(this),e);let n=ke.r,s=ke.g,r=ke.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ie.workingColorSpace){return ie.workingToColorSpace(ke.copy(this),e),t.r=ke.r,t.g=ke.g,t.b=ke.b,t}getStyle(t=Le){ie.workingToColorSpace(ke.copy(this),t);let e=ke.r,n=ke.g,s=ke.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(jn),this.setHSL(jn.h+t,jn.s+e,jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(jn),t.getHSL(Br);let n=Ko(jn.h,Br.h,e),s=Ko(jn.s,Br.s,e),r=Ko(jn.l,Br.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ke=new $t;$t.NAMES=au;var Xs=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new $t(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var wi=class extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},mn=new N,zn=new N,sl=new N,kn=new N,Xi=new N,qi=new N,nh=new N,rl=new N,al=new N,ol=new N,ll=new xe,cl=new xe,hl=new xe,ni=class i{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),mn.subVectors(t,e),s.cross(mn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){mn.subVectors(s,e),zn.subVectors(n,e),sl.subVectors(t,e);let a=mn.dot(mn),o=mn.dot(zn),c=mn.dot(sl),l=zn.dot(zn),h=zn.dot(sl),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(l*c-o*h)*u,_=(a*h-o*c)*u;return r.set(1-d-_,_,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,kn.x),c.addScaledVector(a,kn.y),c.addScaledVector(o,kn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return ll.setScalar(0),cl.setScalar(0),hl.setScalar(0),ll.fromBufferAttribute(t,e),cl.fromBufferAttribute(t,n),hl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ll,r.x),a.addScaledVector(cl,r.y),a.addScaledVector(hl,r.z),a}static isFrontFacing(t,e,n,s){return mn.subVectors(n,e),zn.subVectors(t,e),mn.cross(zn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),mn.cross(zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Xi.subVectors(s,n),qi.subVectors(r,n),rl.subVectors(t,n);let c=Xi.dot(rl),l=qi.dot(rl);if(c<=0&&l<=0)return e.copy(n);al.subVectors(t,s);let h=Xi.dot(al),f=qi.dot(al);if(h>=0&&f<=h)return e.copy(s);let u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Xi,a);ol.subVectors(t,r);let d=Xi.dot(ol),_=qi.dot(ol);if(_>=0&&d<=_)return e.copy(r);let M=d*l-c*_;if(M<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector(qi,o);let m=h*_-d*f;if(m<=0&&f-h>=0&&d-_>=0)return nh.subVectors(r,s),o=(f-h)/(f-h+(d-_)),e.copy(s).addScaledVector(nh,o);let p=1/(m+M+u);return a=M*p,o=u*p,e.copy(n).addScaledVector(Xi,a).addScaledVector(qi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Pn=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,gn):gn.fromBufferAttribute(r,a),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zr.copy(n.boundingBox)),zr.applyMatrix4(t.matrixWorld),this.union(zr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ps),kr.subVectors(this.max,Ps),Yi.subVectors(t.a,Ps),Zi.subVectors(t.b,Ps),$i.subVectors(t.c,Ps),Qn.subVectors(Zi,Yi),ti.subVectors($i,Zi),yi.subVectors(Yi,$i);let e=[0,-Qn.z,Qn.y,0,-ti.z,ti.y,0,-yi.z,yi.y,Qn.z,0,-Qn.x,ti.z,0,-ti.x,yi.z,0,-yi.x,-Qn.y,Qn.x,0,-ti.y,ti.x,0,-yi.y,yi.x,0];return!ul(e,Yi,Zi,$i,kr)||(e=[1,0,0,0,1,0,0,0,1],!ul(e,Yi,Zi,$i,kr))?!1:(Vr.crossVectors(Qn,ti),e=[Vr.x,Vr.y,Vr.z],ul(e,Yi,Zi,$i,kr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Vn=[new N,new N,new N,new N,new N,new N,new N,new N],gn=new N,zr=new Pn,Yi=new N,Zi=new N,$i=new N,Qn=new N,ti=new N,yi=new N,Ps=new N,kr=new N,Vr=new N,Mi=new N;function ul(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Mi.fromArray(i,r);let o=s.x*Math.abs(Mi.x)+s.y*Math.abs(Mi.y)+s.z*Math.abs(Mi.z),c=t.dot(Mi),l=e.dot(Mi),h=n.dot(Mi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var we=new N,Gr=new Mt,Bd=0,Fe=class extends Rn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=eu,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Gr.fromBufferAttribute(this,e),Gr.applyMatrix3(t),this.setXY(e,Gr.x,Gr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Cs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ye(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Cs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Cs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Cs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Cs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),n=Ye(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),n=Ye(n,this.array),s=Ye(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),n=Ye(n,this.array),s=Ye(s,this.array),r=Ye(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var qs=class extends Fe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ys=class extends Fe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var he=class extends Fe{constructor(t,e,n){super(new Float32Array(t),e,n)}},zd=new Pn,Ls=new N,dl=new N,Wn=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):zd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ls.subVectors(t,this.center);let e=Ls.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ls,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(dl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ls.copy(t.center).add(dl)),this.expandByPoint(Ls.copy(t.center).sub(dl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},kd=0,on=new de,fl=new Ae,Ji=new N,Qe=new Pn,Ds=new Pn,Pe=new N,be=class i extends Rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kd++}),this.uuid=Ms(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Td(t)?Ys:qs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,n){return on.makeTranslation(t,e,n),this.applyMatrix4(on),this}scale(t,e,n){return on.makeScale(t,e,n),this.applyMatrix4(on),this}lookAt(t){return fl.lookAt(t),fl.updateMatrix(),this.applyMatrix4(fl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new he(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Xt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Ds.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(Qe.min,Ds.min),Qe.expandByPoint(Pe),Pe.addVectors(Qe.max,Ds.max),Qe.expandByPoint(Pe)):(Qe.expandByPoint(Ds.min),Qe.expandByPoint(Ds.max))}Qe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Pe));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Pe.fromBufferAttribute(o,l),c&&(Ji.fromBufferAttribute(t,l),Pe.add(Ji)),s=Math.max(s,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Fe(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let v=0;v<n.count;v++)o[v]=new N,c[v]=new N;let l=new N,h=new N,f=new N,u=new Mt,d=new Mt,_=new Mt,M=new N,m=new N;function p(v,A,D){l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,A),f.fromBufferAttribute(n,D),u.fromBufferAttribute(r,v),d.fromBufferAttribute(r,A),_.fromBufferAttribute(r,D),h.sub(l),f.sub(l),d.sub(u),_.sub(u);let z=1/(d.x*_.y-_.x*d.y);isFinite(z)&&(M.copy(h).multiplyScalar(_.y).addScaledVector(f,-d.y).multiplyScalar(z),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-_.x).multiplyScalar(z),o[v].add(M),o[A].add(M),o[D].add(M),c[v].add(m),c[A].add(m),c[D].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let v=0,A=w.length;v<A;++v){let D=w[v],z=D.start,X=D.count;for(let Z=z,B=z+X;Z<B;Z+=3)p(t.getX(Z+0),t.getX(Z+1),t.getX(Z+2))}let R=new N,x=new N,S=new N,b=new N;function P(v){S.fromBufferAttribute(s,v),b.copy(S);let A=o[v];R.copy(A),R.sub(S.multiplyScalar(S.dot(A))).normalize(),x.crossVectors(b,A);let z=x.dot(c[v])<0?-1:1;a.setXYZW(v,R.x,R.y,R.z,z)}for(let v=0,A=w.length;v<A;++v){let D=w[v],z=D.start,X=D.count;for(let Z=z,B=z+X;Z<B;Z+=3)P(t.getX(Z+0)),P(t.getX(Z+1)),P(t.getX(Z+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Fe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let s=new N,r=new N,a=new N,o=new N,c=new N,l=new N,h=new N,f=new N;if(t)for(let u=0,d=t.count;u<d;u+=3){let _=t.getX(u+0),M=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,M),a.fromBufferAttribute(e,m),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,d=e.count;u<d;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h),d=0,_=0;for(let M=0,m=c.length;M<m;M++){o.isInterleavedBufferAttribute?d=c[M]*o.data.stride+o.offset:d=c[M]*h;for(let p=0;p<h;p++)u[_++]=l[d++]}return new Fe(u,h,f)}if(this.index===null)return Xt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,f=l.length;h<f;h++){let u=l[h],d=t(u,n);c.push(d)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){let d=l[f];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],f=r[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var pl=new N,Vd=new N,Gd=new Zt,_n=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=pl.subVectors(n,e).cross(Vd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(pl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Gd.getNormalMatrix(t),s=this.coplanarPoint(pl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Hd=0,Ln=class extends Rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=Ms(),this.name="",this.type="Material",this.blending=xs,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bl,this.blendDst=zl,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=oa,this.stencilZFail=oa,this.stencilZPass=oa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Xt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new $t().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new _n().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Mt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Mt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Gn=new N,ml=new N,Hr=new N,Wr=new N,Zs=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ml.copy(t).add(e).multiplyScalar(.5),Hr.copy(e).sub(t).normalize(),Wr.copy(this.origin).sub(ml);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Hr),o=Wr.dot(this.direction),c=-Wr.dot(Hr),l=Wr.lengthSq(),h=Math.abs(1-a*a),f,u,d,_;if(h>0)if(f=a*c-o,u=a*o-c,_=r*h,f>=0)if(u>=-_)if(u<=_){let M=1/h;f*=M,u*=M,d=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u<=-_?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l):u<=_?(f=0,u=Math.min(Math.max(-r,-c),r),d=u*(u+2*c)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ml).addScaledVector(Hr,u),d}intersectSphere(t,e){if(t.radius<0)return null;Gn.subVectors(t.center,this.origin);let n=Gn.dot(this.direction),s=Gn.dot(Gn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-u.z)*f,c=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,c=(t.min.z-u.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=t.x-a.x,u=t.y-a.y,d=t.z-a.z,_=e.x-a.x,M=e.y-a.y,m=e.z-a.z,p=n.x-a.x,w=n.y-a.y,R=n.z-a.z,x=Math.abs(c),S=Math.abs(l),b=Math.abs(h),P,v,A,D,z,X,Z,B,$,ot,st,pt;if(x>=S&&x>=b?(A=c,X=f,$=_,pt=p,c>=0?(P=l,v=h,D=u,z=d,Z=M,B=m,ot=w,st=R):(P=h,v=l,D=d,z=u,Z=m,B=M,ot=R,st=w)):S>=b?(A=l,X=u,$=M,pt=w,l>=0?(P=h,v=c,D=d,z=f,Z=m,B=_,ot=R,st=p):(P=c,v=h,D=f,z=d,Z=_,B=m,ot=p,st=R)):(A=h,X=d,$=m,pt=R,h>=0?(P=c,v=l,D=f,z=u,Z=_,B=M,ot=p,st=w):(P=l,v=c,D=u,z=f,Z=M,B=_,ot=w,st=p)),A===0)return null;let rt=P/A,ct=v/A,ht=1/A,Ft=D-rt*X,Pt=z-ct*X,ne=Z-rt*$,U=B-ct*$,V=ot-rt*pt,T=st-ct*pt,C=V*U-T*ne,I=Ft*T-Pt*V,Y=ne*Pt-U*Ft;if(s){if(C<0||I<0||Y<0)return null}else if((C<0||I<0||Y<0)&&(C>0||I>0||Y>0))return null;let q=C+I+Y;if(q===0)return null;let tt=ht*(C*X+I*$+Y*pt);return(q>0?tt<0:tt>0)?null:this.at(tt/q,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Dn=class extends Ln{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Ha,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ih=new de,Si=new Zs,Xr=new Wn,sh=new N,qr=new N,Yr=new N,Zr=new N,gl=new N,$r=new N,rh=new N,Jr=new N,ae=class extends Ae{constructor(t=new be,e=new Dn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){$r.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],f=r[c];h!==0&&(gl.fromBufferAttribute(f,t),a?$r.addScaledVector(gl,h):$r.addScaledVector(gl.sub(e),h))}e.add($r)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(r),Si.copy(t.ray).recast(t.near),!(Xr.containsPoint(Si.origin)===!1&&(Si.intersectSphere(Xr,sh)===null||Si.origin.distanceToSquared(sh)>(t.far-t.near)**2))&&(ih.copy(r).invert(),Si.copy(t.ray).applyMatrix4(ih),!(n.boundingBox!==null&&Si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Si)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,M=u.length;_<M;_++){let m=u[_],p=a[m.materialIndex],w=Math.max(m.start,d.start),R=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let x=w,S=R;x<S;x+=3){let b=o.getX(x),P=o.getX(x+1),v=o.getX(x+2);s=Kr(this,p,t,n,l,h,f,b,P,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,d.start),M=Math.min(o.count,d.start+d.count);for(let m=_,p=M;m<p;m+=3){let w=o.getX(m),R=o.getX(m+1),x=o.getX(m+2);s=Kr(this,a,t,n,l,h,f,w,R,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,M=u.length;_<M;_++){let m=u[_],p=a[m.materialIndex],w=Math.max(m.start,d.start),R=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=w,S=R;x<S;x+=3){let b=x,P=x+1,v=x+2;s=Kr(this,p,t,n,l,h,f,b,P,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,d.start),M=Math.min(c.count,d.start+d.count);for(let m=_,p=M;m<p;m+=3){let w=m,R=m+1,x=m+2;s=Kr(this,a,t,n,l,h,f,w,R,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Wd(i,t,e,n,s,r,a,o){let c;if(t.side===Re?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===hi,o),c===null)return null;Jr.copy(o),Jr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Jr);return l<e.near||l>e.far?null:{distance:l,point:Jr.clone(),object:i}}function Kr(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,qr),i.getVertexPosition(c,Yr),i.getVertexPosition(l,Zr);let h=Wd(i,t,e,n,qr,Yr,Zr,rh);if(h){let f=new N;ni.getBarycoord(rh,qr,Yr,Zr,f),s&&(h.uv=ni.getInterpolatedAttribute(s,o,c,l,f,new Mt)),r&&(h.uv1=ni.getInterpolatedAttribute(r,o,c,l,f,new Mt)),a&&(h.normal=ni.getInterpolatedAttribute(a,o,c,l,f,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new N,materialIndex:0};ni.getNormal(qr,Yr,Zr,u.normal),h.face=u,h.barycoord=f}return h}var $s=class extends We{constructor(t=null,e=1,n=1,s,r,a,o,c,l=De,h=De,f,u){super(null,a,o,c,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ls=class extends Fe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ki=new de,ah=new de,jr=[],oh=new Pn,Xd=new de,Ns=new ae,Us=new Wn,Js=class extends ae{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ls(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Xd)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Pn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ki),oh.copy(t.boundingBox).applyMatrix4(Ki),this.boundingBox.union(oh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ki),Us.copy(t.boundingSphere).applyMatrix4(Ki),this.boundingSphere.union(Us)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Ns.geometry=this.geometry,Ns.material=this.material,Ns.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Us.copy(this.boundingSphere),Us.applyMatrix4(n),t.ray.intersectsSphere(Us)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ki),ah.multiplyMatrices(n,Ki),Ns.matrixWorld=ah,Ns.raycast(t,jr);for(let a=0,o=jr.length;a<o;a++){let c=jr[a];c.instanceId=r,c.object=this,e.push(c)}jr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new ls(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new $s(new Float32Array(s*this.count),s,this.count,Ja,cn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},bi=new Wn,qd=new Mt(.5,.5),Qr=new N,cs=class{constructor(t=new _n,e=new _n,n=new _n,s=new _n,r=new _n,a=new _n){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],f=r[5],u=r[6],d=r[7],_=r[8],M=r[9],m=r[10],p=r[11],w=r[12],R=r[13],x=r[14],S=r[15];if(s[0].setComponents(l-a,d-h,p-_,S-w).normalize(),s[1].setComponents(l+a,d+h,p+_,S+w).normalize(),s[2].setComponents(l+o,d+f,p+M,S+R).normalize(),s[3].setComponents(l-o,d-f,p-M,S-R).normalize(),n)s[4].setComponents(c,u,m,x).normalize(),s[5].setComponents(l-c,d-u,p-m,S-x).normalize();else if(s[4].setComponents(l-c,d-u,p-m,S-x).normalize(),e===xn)s[5].setComponents(l+c,d+u,p+m,S+x).normalize();else if(e===ss)s[5].setComponents(c,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(t){bi.center.set(0,0,0);let e=qd.distanceTo(t.center);return bi.radius=.7071067811865476+e,bi.applyMatrix4(t.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Qr.x=s.normal.x>0?t.max.x:t.min.x,Qr.y=s.normal.y>0?t.max.y:t.min.y,Qr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Qr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ma=class extends Ln{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},lh=new de,wl=new Zs,ta=new Wn,ea=new N,Ks=class extends Ae{constructor(t=new be,e=new Ma){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ta.copy(n.boundingSphere),ta.applyMatrix4(s),ta.radius+=r,t.ray.intersectsSphere(ta)===!1)return;lh.copy(s).invert(),wl.copy(t.ray).applyMatrix4(lh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,f=n.attributes.position;if(l!==null){let u=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let _=u,M=d;_<M;_++){let m=l.getX(_);ea.fromBufferAttribute(f,m),ch(ea,m,c,s,t,e,this)}}else{let u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let _=u,M=d;_<M;_++)ea.fromBufferAttribute(f,_),ch(ea,_,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ch(i,t,e,n,s,r,a){let o=wl.distanceSqToPoint(i);if(o<e){let c=new N;wl.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var js=class extends We{constructor(t=[],e=ui,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ii=class extends We{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var si=class extends We{constructor(t,e,n=yn,s,r,a,o=De,c=De,l,h=An,f=1){if(h!==An&&h!==fi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new as(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Sa=class extends si{constructor(t,e=yn,n=ui,s,r,a=De,o=De,c,l=An){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Qs=class extends We{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},$e=class i extends be{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],f=[],u=0,d=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(f,2));function _(M,m,p,w,R,x,S,b,P,v,A){let D=x/P,z=S/v,X=x/2,Z=S/2,B=b/2,$=P+1,ot=v+1,st=0,pt=0,rt=new N;for(let ct=0;ct<ot;ct++){let ht=ct*z-Z;for(let Ft=0;Ft<$;Ft++){let Pt=Ft*D-X;rt[M]=Pt*w,rt[m]=ht*R,rt[p]=B,l.push(rt.x,rt.y,rt.z),rt[M]=0,rt[m]=0,rt[p]=b>0?1:-1,h.push(rt.x,rt.y,rt.z),f.push(Ft/P),f.push(1-ct/v),st+=1}}for(let ct=0;ct<v;ct++)for(let ht=0;ht<P;ht++){let Ft=u+ht+$*ct,Pt=u+ht+$*(ct+1),ne=u+(ht+1)+$*(ct+1),U=u+(ht+1)+$*ct;c.push(Ft,Pt,U),c.push(Pt,ne,U),pt+=6}o.addGroup(d,pt,A),d+=pt,u+=st}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var ri=class i extends be{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],u=[],d=[],_=0,M=[],m=n/2,p=0;w(),a===!1&&(t>0&&R(!0),e>0&&R(!1)),this.setIndex(h),this.setAttribute("position",new he(f,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(d,2));function w(){let x=new N,S=new N,b=0,P=(e-t)/n;for(let v=0;v<=r;v++){let A=[],D=v/r,z=D*(e-t)+t;for(let X=0;X<=s;X++){let Z=X/s,B=Z*c+o,$=Math.sin(B),ot=Math.cos(B);S.x=z*$,S.y=-D*n+m,S.z=z*ot,f.push(S.x,S.y,S.z),x.set($,P,ot).normalize(),u.push(x.x,x.y,x.z),d.push(Z,1-D),A.push(_++)}M.push(A)}for(let v=0;v<s;v++)for(let A=0;A<r;A++){let D=M[A][v],z=M[A+1][v],X=M[A+1][v+1],Z=M[A][v+1];(t>0||A!==0)&&(h.push(D,z,Z),b+=3),(e>0||A!==r-1)&&(h.push(z,X,Z),b+=3)}l.addGroup(p,b,0),p+=b}function R(x){let S=_,b=new Mt,P=new N,v=0,A=x===!0?t:e,D=x===!0?1:-1;for(let X=1;X<=s;X++)f.push(0,m*D,0),u.push(0,D,0),d.push(.5,.5),_++;let z=_;for(let X=0;X<=s;X++){let B=X/s*c+o,$=Math.cos(B),ot=Math.sin(B);P.x=A*ot,P.y=m*D,P.z=A*$,f.push(P.x,P.y,P.z),u.push(0,D,0),b.x=$*.5+.5,b.y=ot*.5*D+.5,d.push(b.x,b.y),_++}for(let X=0;X<s;X++){let Z=S+X,B=z+X;x===!0?h.push(B,B+1,Z):h.push(B+1,B,Z),v+=3}l.addGroup(p,v,x===!0?1:2),p+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var tn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,d=(a-h)/u;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new Mt:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new N,s=[],r=[],a=[],o=new N,c=new de;for(let d=0;d<=t;d++){let _=d/t;s[d]=this.getTangentAt(_,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let _=Math.acos(ee(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,_))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(ee(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let _=1;_<=t;_++)r[_].applyMatrix4(c.makeRotationAxis(s[_],d*_)),a[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},hs=class extends tn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new Mt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=c-this.aX,d=l-this.aY;c=u*h-d*f+this.aX,l=u*f+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ba=class extends hs{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function ec(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,f){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,d=(o-a)/h-(c-a)/(h+f)+(c-o)/f;u*=h,d*=h,s(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var hh=new N,uh=new N,_l=new ec,xl=new ec,vl=new ec,us=class extends tn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new N){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(uh.subVectors(s[0],s[1]).add(s[0]),l=uh);let f=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(hh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=hh),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,_=Math.pow(l.distanceToSquared(f),d),M=Math.pow(f.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(h),d);M<1e-4&&(M=1),_<1e-4&&(_=M),m<1e-4&&(m=M),_l.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,_,M,m),xl.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,_,M,m),vl.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,_,M,m)}else this.curveType==="catmullrom"&&(_l.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),xl.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),vl.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return n.set(_l.calc(c),xl.calc(c),vl.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function dh(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function Yd(i,t){let e=1-i;return e*e*t}function Zd(i,t){return 2*(1-i)*i*t}function $d(i,t){return i*i*t}function Os(i,t,e,n){return Yd(i,t)+Zd(i,e)+$d(i,n)}function Jd(i,t){let e=1-i;return e*e*e*t}function Kd(i,t){let e=1-i;return 3*e*e*i*t}function jd(i,t){return 3*(1-i)*i*i*t}function Qd(i,t){return i*i*i*t}function Bs(i,t,e,n,s){return Jd(i,t)+Kd(i,e)+jd(i,n)+Qd(i,s)}var tr=class extends tn{constructor(t=new Mt,e=new Mt,n=new Mt,s=new Mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Mt){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Bs(t,s.x,r.x,a.x,o.x),Bs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ea=class extends tn{constructor(t=new N,e=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new N){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Bs(t,s.x,r.x,a.x,o.x),Bs(t,s.y,r.y,a.y,o.y),Bs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},er=class extends tn{constructor(t=new Mt,e=new Mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Mt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ta=class extends tn{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},nr=class extends tn{constructor(t=new Mt,e=new Mt,n=new Mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Mt){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Os(t,s.x,r.x,a.x),Os(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ir=class extends tn{constructor(t=new N,e=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new N){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Os(t,s.x,r.x,a.x),Os(t,s.y,r.y,a.y),Os(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},sr=class extends tn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Mt){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(dh(o,c.x,l.x,h.x,f.x),dh(o,c.y,l.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new Mt().fromArray(s))}return this}},wa=Object.freeze({__proto__:null,ArcCurve:ba,CatmullRomCurve3:us,CubicBezierCurve:tr,CubicBezierCurve3:Ea,EllipseCurve:hs,LineCurve:er,LineCurve3:Ta,QuadraticBezierCurve:nr,QuadraticBezierCurve3:ir,SplineCurve:sr}),Aa=class extends tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wa[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new wa[s.type]().fromJSON(s))}return this}},rr=class extends Aa{constructor(t){super(),this.type="Path",this.currentPoint=new Mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new er(this.currentPoint.clone(),new Mt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new nr(this.currentPoint.clone(),new Mt(t,e),new Mt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new tr(this.currentPoint.clone(),new Mt(t,e),new Mt(n,s),new Mt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new sr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){let l=new hs(t,e,n,s,r,a,o,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Ai=class extends rr{constructor(t){super(t),this.uuid=Ms(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new rr().fromJSON(s))}return this}};function tf(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=ou(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=af(i,t,r,e)),i.length>80*e){o=i[0],c=i[1];let h=o,f=c;for(let u=e;u<s;u+=e){let d=i[u],_=i[u+1];d<o&&(o=d),_<c&&(c=_),d>h&&(h=d),_>f&&(f=_)}l=Math.max(h-o,f-c),l=l!==0?32767/l:0}return ar(r,a,e,o,c,l,0),a}function ou(i,t,e,n,s){let r;if(s===_f(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=fh(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=fh(a/n|0,i[a],i[a+1],r);return r&&ds(r,r.next)&&(lr(r),r=r.next),r}function Ri(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(ds(e,e.next)||ve(e.prev,e,e.next)===0)){if(lr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ar(i,t,e,n,s,r,a){if(!i)return;!a&&r&&uf(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?nf(i,n,s,r):ef(i)){t.push(c.i,i.i,l.i),lr(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=sf(Ri(i),t),ar(i,t,e,n,s,r,2)):a===2&&rf(i,t,e,n,s,r):ar(Ri(i),t,e,n,s,r,1);break}}}function ef(i){let t=i.prev,e=i,n=i.next;if(ve(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,c=e.y,l=n.y,h=Math.min(s,r,a),f=Math.min(o,c,l),u=Math.max(s,r,a),d=Math.max(o,c,l),_=n.next;for(;_!==t;){if(_.x>=h&&_.x<=u&&_.y>=f&&_.y<=d&&Fs(s,o,r,c,a,l,_.x,_.y)&&ve(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function nf(i,t,e,n){let s=i.prev,r=i,a=i.next;if(ve(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,f=r.y,u=a.y,d=Math.min(o,c,l),_=Math.min(h,f,u),M=Math.max(o,c,l),m=Math.max(h,f,u),p=Al(d,_,t,e,n),w=Al(M,m,t,e,n),R=i.prevZ,x=i.nextZ;for(;R&&R.z>=p&&x&&x.z<=w;){if(R.x>=d&&R.x<=M&&R.y>=_&&R.y<=m&&R!==s&&R!==a&&Fs(o,h,c,f,l,u,R.x,R.y)&&ve(R.prev,R,R.next)>=0||(R=R.prevZ,x.x>=d&&x.x<=M&&x.y>=_&&x.y<=m&&x!==s&&x!==a&&Fs(o,h,c,f,l,u,x.x,x.y)&&ve(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;R&&R.z>=p;){if(R.x>=d&&R.x<=M&&R.y>=_&&R.y<=m&&R!==s&&R!==a&&Fs(o,h,c,f,l,u,R.x,R.y)&&ve(R.prev,R,R.next)>=0)return!1;R=R.prevZ}for(;x&&x.z<=w;){if(x.x>=d&&x.x<=M&&x.y>=_&&x.y<=m&&x!==s&&x!==a&&Fs(o,h,c,f,l,u,x.x,x.y)&&ve(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function sf(i,t){let e=i;do{let n=e.prev,s=e.next.next;!ds(n,s)&&cu(n,e,e.next,s)&&or(n,s)&&or(s,n)&&(t.push(n.i,e.i,s.i),lr(e),lr(e.next),e=i=s),e=e.next}while(e!==i);return Ri(e)}function rf(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&pf(a,o)){let c=hu(a,o);a=Ri(a,a.next),c=Ri(c,c.next),ar(a,t,e,n,s,r,0),ar(c,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function af(i,t,e,n){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,c=r<a-1?t[r+1]*n:i.length,l=ou(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(ff(l))}s.sort(of);for(let r=0;r<s.length;r++)e=lf(s[r],e);return e}function of(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function lf(i,t){let e=cf(i,t);if(!e)return t;let n=hu(e,i);return Ri(n,n.next),Ri(e,e.next)}function cf(i,t){let e=t,n=i.x,s=i.y,r=-1/0,a;if(ds(i,e))return e;do{if(ds(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=c&&n!==e.x&&lu(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let f=Math.abs(s-e.y)/(n-e.x);or(e,i)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&hf(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function hf(i,t){return ve(i.prev,i,t.prev)<0&&ve(t.next,i,i.next)<0}function uf(i,t,e,n){let s=i;do s.z===0&&(s.z=Al(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,df(s)}function df(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let l=0;l<e&&(o++,a=a.nextZ,!!a);l++);let c=e;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Al(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function ff(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function lu(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function Fs(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&lu(i,t,e,n,s,r,a,o)}function pf(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!mf(i,t)&&(or(i,t)&&or(t,i)&&gf(i,t)&&(ve(i.prev,i,t.prev)||ve(i,t.prev,t))||ds(i,t)&&ve(i.prev,i,i.next)>0&&ve(t.prev,t,t.next)>0)}function ve(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function ds(i,t){return i.x===t.x&&i.y===t.y}function cu(i,t,e,n){let s=ia(ve(i,t,e)),r=ia(ve(i,t,n)),a=ia(ve(e,n,i)),o=ia(ve(e,n,t));return!!(s!==r&&a!==o||s===0&&na(i,e,t)||r===0&&na(i,n,t)||a===0&&na(e,i,n)||o===0&&na(e,t,n))}function na(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function ia(i){return i>0?1:i<0?-1:0}function mf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&cu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function or(i,t){return ve(i.prev,i,i.next)<0?ve(i,t,i.next)>=0&&ve(i,i.prev,t)>=0:ve(i,t,i.prev)<0||ve(i,i.next,t)<0}function gf(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function hu(i,t){let e=Rl(i.i,i.x,i.y),n=Rl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function fh(i,t,e,n){let s=Rl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function lr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Rl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function _f(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Cl=class{static triangulate(t,e,n=2){return tf(t,e,n)}},Ei=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];ph(t),mh(n,t);let a=t.length;e.forEach(ph);for(let c=0;c<e.length;c++)s.push(a),a+=e[c].length,mh(n,e[c]);let o=Cl.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function ph(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function mh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var fs=class i extends be{constructor(t=new Ai([new Mt(.5,.5),new Mt(-.5,.5),new Mt(-.5,-.5),new Mt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,c=t.length;o<c;o++){let l=t[o];a(l)}this.setAttribute("position",new he(s,3)),this.setAttribute("uv",new he(r,2)),this.computeVertexNormals();function a(o){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,_=e.bevelSize!==void 0?e.bevelSize:d-.1,M=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:xf,R,x=!1,S,b,P,v;if(p){R=p.getSpacedPoints(h),x=!0,u=!1;let O=p.isCatmullRomCurve3?p.closed:!1;S=p.computeFrenetFrames(h,O),b=new N,P=new N,v=new N}u||(m=0,d=0,_=0,M=0);let A=o.extractPoints(l),D=A.shape,z=A.holes;if(!Ei.isClockWise(D)){D=D.reverse();for(let O=0,F=z.length;O<F;O++){let et=z[O];Ei.isClockWise(et)&&(z[O]=et.reverse())}}function Z(O){let et=10000000000000001e-36,it=O[0];for(let H=1;H<=O.length;H++){let gt=H%O.length,Lt=O[gt],Ut=Lt.x-it.x,qt=Lt.y-it.y,L=Ut*Ut+qt*qt,Qt=Math.max(Math.abs(Lt.x),Math.abs(Lt.y),Math.abs(it.x),Math.abs(it.y)),vt=et*Qt*Qt;if(L<=vt){O.splice(gt,1),H--;continue}it=Lt}}Z(D),z.forEach(Z);let B=z.length,$=D;for(let O=0;O<B;O++){let F=z[O];D=D.concat(F)}function ot(O,F,et){return F||Yt("ExtrudeGeometry: vec does not exist"),O.clone().addScaledVector(F,et)}let st=D.length;function pt(O,F,et){let it,H,gt,Lt=O.x-F.x,Ut=O.y-F.y,qt=et.x-O.x,L=et.y-O.y,Qt=Lt*Lt+Ut*Ut,vt=Lt*L-Ut*qt;if(Math.abs(vt)>Number.EPSILON){let E=Math.sqrt(Qt),g=Math.sqrt(qt*qt+L*L),W=F.x-Ut/E,K=F.y+Lt/E,lt=et.x-L/g,_t=et.y+qt/g,xt=((lt-W)*L-(_t-K)*qt)/(Lt*L-Ut*qt);it=W+Lt*xt-O.x,H=K+Ut*xt-O.y;let at=it*it+H*H;if(at<=2)return new Mt(it,H);gt=Math.sqrt(at/2)}else{let E=!1;Lt>Number.EPSILON?qt>Number.EPSILON&&(E=!0):Lt<-Number.EPSILON?qt<-Number.EPSILON&&(E=!0):Math.sign(Ut)===Math.sign(L)&&(E=!0),E?(it=-Ut,H=Lt,gt=Math.sqrt(Qt)):(it=Lt,H=Ut,gt=Math.sqrt(Qt/2))}return new Mt(it/gt,H/gt)}let rt=[];for(let O=0,F=$.length,et=F-1,it=O+1;O<F;O++,et++,it++)et===F&&(et=0),it===F&&(it=0),rt[O]=pt($[O],$[et],$[it]);let ct=[],ht,Ft=rt.concat();for(let O=0,F=B;O<F;O++){let et=z[O];ht=[];for(let it=0,H=et.length,gt=H-1,Lt=it+1;it<H;it++,gt++,Lt++)gt===H&&(gt=0),Lt===H&&(Lt=0),ht[it]=pt(et[it],et[gt],et[Lt]);ct.push(ht),Ft=Ft.concat(ht)}let Pt;if(m===0)Pt=Ei.triangulateShape($,z);else{let O=[],F=[];for(let et=0;et<m;et++){let it=et/m,H=d*Math.cos(it*Math.PI/2),gt=_*Math.sin(it*Math.PI/2)+M;for(let Lt=0,Ut=$.length;Lt<Ut;Lt++){let qt=ot($[Lt],rt[Lt],gt);I(qt.x,qt.y,-H),it===0&&O.push(qt)}for(let Lt=0,Ut=B;Lt<Ut;Lt++){let qt=z[Lt];ht=ct[Lt];let L=[];for(let Qt=0,vt=qt.length;Qt<vt;Qt++){let E=ot(qt[Qt],ht[Qt],gt);I(E.x,E.y,-H),it===0&&L.push(E)}it===0&&F.push(L)}}Pt=Ei.triangulateShape(O,F)}let ne=Pt.length,U=_+M;for(let O=0;O<st;O++){let F=u?ot(D[O],Ft[O],U):D[O];x?(P.copy(S.normals[0]).multiplyScalar(F.x),b.copy(S.binormals[0]).multiplyScalar(F.y),v.copy(R[0]).add(P).add(b),I(v.x,v.y,v.z)):I(F.x,F.y,0)}for(let O=1;O<=h;O++)for(let F=0;F<st;F++){let et=u?ot(D[F],Ft[F],U):D[F];x?(P.copy(S.normals[O]).multiplyScalar(et.x),b.copy(S.binormals[O]).multiplyScalar(et.y),v.copy(R[O]).add(P).add(b),I(v.x,v.y,v.z)):I(et.x,et.y,f/h*O)}for(let O=m-1;O>=0;O--){let F=O/m,et=d*Math.cos(F*Math.PI/2),it=_*Math.sin(F*Math.PI/2)+M;for(let H=0,gt=$.length;H<gt;H++){let Lt=ot($[H],rt[H],it);I(Lt.x,Lt.y,f+et)}for(let H=0,gt=z.length;H<gt;H++){let Lt=z[H];ht=ct[H];for(let Ut=0,qt=Lt.length;Ut<qt;Ut++){let L=ot(Lt[Ut],ht[Ut],it);x?I(L.x,L.y+R[h-1].y,R[h-1].x+et):I(L.x,L.y,f+et)}}}V(),T();function V(){let O=s.length/3;if(u){let F=0,et=st*F;for(let it=0;it<ne;it++){let H=Pt[it];Y(H[2]+et,H[1]+et,H[0]+et)}F=h+m*2,et=st*F;for(let it=0;it<ne;it++){let H=Pt[it];Y(H[0]+et,H[1]+et,H[2]+et)}}else{for(let F=0;F<ne;F++){let et=Pt[F];Y(et[2],et[1],et[0])}for(let F=0;F<ne;F++){let et=Pt[F];Y(et[0]+st*h,et[1]+st*h,et[2]+st*h)}}n.addGroup(O,s.length/3-O,0)}function T(){let O=s.length/3,F=0;C($,F),F+=$.length;for(let et=0,it=z.length;et<it;et++){let H=z[et];C(H,F),F+=H.length}n.addGroup(O,s.length/3-O,1)}function C(O,F){let et=O.length;for(;--et>=0;){let it=et,H=et-1;H<0&&(H=O.length-1);for(let gt=0,Lt=h+m*2;gt<Lt;gt++){let Ut=st*gt,qt=st*(gt+1),L=F+it+Ut,Qt=F+H+Ut,vt=F+H+qt,E=F+it+qt;q(L,Qt,vt,E)}}}function I(O,F,et){c.push(O),c.push(F),c.push(et)}function Y(O,F,et){tt(O),tt(F),tt(et);let it=s.length/3,H=w.generateTopUV(n,s,it-3,it-2,it-1);J(H[0]),J(H[1]),J(H[2])}function q(O,F,et,it){tt(O),tt(F),tt(it),tt(F),tt(et),tt(it);let H=s.length/3,gt=w.generateSideWallUV(n,s,H-6,H-3,H-2,H-1);J(gt[0]),J(gt[1]),J(gt[3]),J(gt[1]),J(gt[2]),J(gt[3])}function tt(O){s.push(c[O*3+0]),s.push(c[O*3+1]),s.push(c[O*3+2])}function J(O){r.push(O.x),r.push(O.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return vf(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new wa[s.type]().fromJSON(s)),new i(n,t.options)}},xf={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new Mt(r,a),new Mt(o,c),new Mt(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],f=t[n*3+2],u=t[s*3],d=t[s*3+1],_=t[s*3+2],M=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new Mt(a,1-c),new Mt(l,1-f),new Mt(u,1-_),new Mt(M,1-p)]:[new Mt(o,1-c),new Mt(h,1-f),new Mt(d,1-_),new Mt(m,1-p)]}};function vf(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Nn=class i extends be{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,f=t/o,u=e/c,d=[],_=[],M=[],m=[];for(let p=0;p<h;p++){let w=p*u-a;for(let R=0;R<l;R++){let x=R*f-r;_.push(x,-w,0),M.push(0,0,1),m.push(R/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let w=0;w<o;w++){let R=w+l*p,x=w+l*(p+1),S=w+1+l*(p+1),b=w+1+l*p;d.push(R,x,b),d.push(x,S,b)}this.setIndex(d),this.setAttribute("position",new he(_,3)),this.setAttribute("normal",new he(M,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},cr=class i extends be{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],c=[],l=[],h=[],f=t,u=(e-t)/s,d=new N,_=new Mt;for(let M=0;M<=s;M++){for(let m=0;m<=n;m++){let p=r+m/n*a;d.x=f*Math.cos(p),d.y=f*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),_.x=(d.x/e+1)/2,_.y=(d.y/e+1)/2,h.push(_.x,_.y)}f+=u}for(let M=0;M<s;M++){let m=M*(n+1);for(let p=0;p<n;p++){let w=p+m,R=w,x=w+n+1,S=w+n+2,b=w+1;o.push(R,x,b),o.push(x,S,b)}}this.setIndex(o),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(l,3)),this.setAttribute("uv",new he(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var ai=class i extends be{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],f=new N,u=new N,d=[],_=[],M=[],m=[];for(let p=0;p<=n;p++){let w=[],R=p/n,x=a+R*o,S=t*Math.cos(x),b=Math.sqrt(t*t-S*S),P=0;p===0&&a===0?P=.5/e:p===n&&c===Math.PI&&(P=-.5/e);for(let v=0;v<=e;v++){let A=v/e,D=s+A*r;f.x=-b*Math.cos(D),f.y=S,f.z=b*Math.sin(D),_.push(f.x,f.y,f.z),u.copy(f).normalize(),M.push(u.x,u.y,u.z),m.push(A+P,1-R),w.push(l++)}h.push(w)}for(let p=0;p<n;p++)for(let w=0;w<e;w++){let R=h[p][w+1],x=h[p][w],S=h[p+1][w],b=h[p+1][w+1];(p!==0||a>0)&&d.push(R,x,b),(p!==n-1||c<Math.PI)&&d.push(x,S,b)}this.setIndex(d),this.setAttribute("position",new he(_,3)),this.setAttribute("normal",new he(M,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ci=class i extends be{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],h=[],f=[],u=new N,d=new N,_=new N;for(let M=0;M<=n;M++){let m=a+M/n*o;for(let p=0;p<=s;p++){let w=p/s*r;d.x=(t+e*Math.cos(m))*Math.cos(w),d.y=(t+e*Math.cos(m))*Math.sin(w),d.z=e*Math.sin(m),l.push(d.x,d.y,d.z),u.x=t*Math.cos(w),u.y=t*Math.sin(w),_.subVectors(d,u).normalize(),h.push(_.x,_.y,_.z),f.push(p/s),f.push(M/n)}}for(let M=1;M<=n;M++)for(let m=1;m<=s;m++){let p=(s+1)*M+m-1,w=(s+1)*(M-1)+m-1,R=(s+1)*(M-1)+m,x=(s+1)*M+m;c.push(p,w,x),c.push(w,R,x)}this.setIndex(c),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};var hr=class i extends be{constructor(t=new ir(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new N,c=new N,l=new Mt,h=new N,f=[],u=[],d=[],_=[];M(),this.setIndex(_),this.setAttribute("position",new he(f,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(d,2));function M(){for(let R=0;R<e;R++)m(R);m(r===!1?e:0),w(),p()}function m(R){h=t.getPointAt(R/e,h);let x=a.normals[R],S=a.binormals[R];for(let b=0;b<=s;b++){let P=b/s*Math.PI*2,v=Math.sin(P),A=-Math.cos(P);c.x=A*x.x+v*S.x,c.y=A*x.y+v*S.y,c.z=A*x.z+v*S.z,c.normalize(),u.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,f.push(o.x,o.y,o.z)}}function p(){for(let R=1;R<=e;R++)for(let x=1;x<=s;x++){let S=(s+1)*(R-1)+(x-1),b=(s+1)*R+(x-1),P=(s+1)*R+x,v=(s+1)*(R-1)+x;_.push(S,b,v),_.push(b,P,v)}}function w(){for(let R=0;R<=e;R++)for(let x=0;x<=s;x++)l.x=R/e,l.y=x/s,d.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new wa[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Ni(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(gh(s))s.isRenderTargetTexture?(Xt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(gh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ge(i){let t={};for(let e=0;e<i.length;e++){let n=Ni(i[e]);for(let s in n)t[s]=n[s]}return t}function gh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function yf(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function nc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}var uu={clone:Ni,merge:Ge},Mf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ve=class extends Ln{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mf,this.fragmentShader=Sf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ni(t.uniforms),this.uniformsGroups=yf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new $t().setHex(s.value);break;case"v2":this.uniforms[n].value=new Mt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new xe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Zt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new de().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ra=class extends Ve{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ln=class extends Ln{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tr,this.normalScale=new Mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var ur=class extends Ln{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tr,this.normalScale=new Mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Ha,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ca=class extends Ln{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ia=class extends Ln{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ji(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function yl(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var oi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Pa=class extends oi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:bl,endingEnd:bl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case El:r=t,o=2*e-n;break;case Tl:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case El:a=t,c=2*n-e;break;case Tl:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,_=(n-e)/(s-e),M=_*_,m=M*_,p=-u*m+2*u*M-u*_,w=(1+u)*m+(-1.5-2*u)*M+(-.5+u)*_+1,R=(-1-d)*m+(1.5+d)*M+.5*_,x=d*m-d*M;for(let S=0;S!==o;++S)r[S]=p*a[h+S]+w*a[l+S]+R*a[c+S]+x*a[f+S];return r}},La=class extends oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(n-e)/(s-e),f=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*f+a[c+u]*h;return r}},Da=class extends oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Na=class extends oi{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let _=(n-e)/(s-e),M=1-_;for(let m=0;m!==o;++m)r[m]=a[l+m]*M+a[c+m]*_;return r}let u=o*2,d=t-1;for(let _=0;_!==o;++_){let M=a[l+_],m=a[c+_],p=d*u+_*2,w=f[p],R=f[p+1],x=t*u+_*2,S=h[x],b=h[x+1],P=Ef(n,e,w,S,s);r[_]=du(P,M,R,b,m)}return r}};function du(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function bf(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Ef(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=du(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let c=bf(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var en=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ji(e,this.TimeBufferType),this.values=ji(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ji(t.times,Array),values:ji(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),yl(t.settings)&&(n.settings={inTangents:ji(t.settings.inTangents,Array),outTangents:ji(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Da(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new La(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Pa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Na(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case zs:e=this.InterpolantFactoryMethodDiscrete;break;case ga:e=this.InterpolantFactoryMethodLinear;break;case aa:e=this.InterpolantFactoryMethodSmooth;break;case Sl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Xt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return zs;case this.InterpolantFactoryMethodLinear:return ga;case this.InterpolantFactoryMethodSmooth:return aa;case this.InterpolantFactoryMethodBezier:return Sl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;yl(this.settings)&&(_h(this.settings.inTangents,t),_h(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Yt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Yt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Yt("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Yt("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&wd(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Yt("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===aa,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(s)c=!0;else{let f=o*n,u=f-n,d=f+n;for(let _=0;_!==n;++_){let M=e[f+_];if(M!==e[u+_]||M!==e[d+_]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let f=o*n,u=a*n;for(let d=0;d!==n;++d)e[u+d]=e[f+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,yl(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function _h(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}en.prototype.ValueTypeName="";en.prototype.TimeBufferType=Float32Array;en.prototype.ValueBufferType=Float32Array;en.prototype.DefaultInterpolation=ga;var li=class extends en{constructor(t,e,n){super(t,e,n)}};li.prototype.ValueTypeName="bool";li.prototype.ValueBufferType=Array;li.prototype.DefaultInterpolation=zs;li.prototype.InterpolantFactoryMethodLinear=void 0;li.prototype.InterpolantFactoryMethodSmooth=void 0;var Ua=class extends en{constructor(t,e,n,s){super(t,e,n,s)}};Ua.prototype.ValueTypeName="color";var Fa=class extends en{constructor(t,e,n,s){super(t,e,n,s)}};Fa.prototype.ValueTypeName="number";var Oa=class extends oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let h=l+o;l!==h;l+=4)Cn.slerpFlat(r,0,a,l-o,a,l,c);return r}},dr=class extends en{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Oa(this.times,this.values,this.getValueSize(),t)}};dr.prototype.ValueTypeName="quaternion";dr.prototype.InterpolantFactoryMethodSmooth=void 0;var ci=class extends en{constructor(t,e,n){super(t,e,n)}};ci.prototype.ValueTypeName="string";ci.prototype.ValueBufferType=Array;ci.prototype.DefaultInterpolation=zs;ci.prototype.InterpolantFactoryMethodLinear=void 0;ci.prototype.InterpolantFactoryMethodSmooth=void 0;var Ba=class extends en{constructor(t,e,n,s){super(t,e,n,s)}};Ba.prototype.ValueTypeName="vector";var za=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=l.length;f<u;f+=2){let d=l[f],_=l[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},fu=new za,ka=class{constructor(t){this.manager=t!==void 0?t:fu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};ka.DEFAULT_MATERIAL_NAME="__DEFAULT";var ps=class extends Ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new $t(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},fr=class extends ps{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $t(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Ml=new de,xh=new N,vh=new N,pr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Mt(512,512),this.mapType=Ke,this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cs,this._frameExtents=new Mt(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;xh.setFromMatrixPosition(t.matrixWorld),e.position.copy(xh),vh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(vh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Ml.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Ml,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===ss||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(Ml)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},sa=new N,ra=new Cn,Tn=new N,mr=class extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(sa,ra,Tn),Tn.x===1&&Tn.y===1&&Tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sa,ra,Tn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(sa,ra,Tn),Tn.x===1&&Tn.y===1&&Tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sa,ra,Tn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ei=new N,yh=new Mt,Mh=new Mt,Ue=class extends mr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=_a*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Jo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _a*2*Math.atan(Math.tan(Jo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ei.x,ei.y).multiplyScalar(-t/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ei.x,ei.y).multiplyScalar(-t/ei.z)}getViewSize(t,e){return this.getViewBounds(t,yh,Mh),e.subVectors(Mh,yh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Jo*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Il=class extends pr{constructor(){super(new Ue(90,1,.5,500)),this.isPointLightShadow=!0}},Ii=class extends ps{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Il}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},ms=class extends mr{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Pl=class extends pr{constructor(){super(new ms(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},gs=class extends ps{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.target=new Ae,this.shadow=new Pl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Qi=-90,ts=1,Va=class extends Ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ue(Qi,ts,t,e);s.layers=this.layers,this.add(s);let r=new Ue(Qi,ts,t,e);r.layers=this.layers,this.add(r);let a=new Ue(Qi,ts,t,e);a.layers=this.layers,this.add(a);let o=new Ue(Qi,ts,t,e);o.layers=this.layers,this.add(o);let c=new Ue(Qi,ts,t,e);c.layers=this.layers,this.add(c);let l=new Ue(Qi,ts,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ss)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=M,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},Ga=class extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var ic="\\[\\]\\.:\\/",Tf=new RegExp("["+ic+"]","g"),sc="[^"+ic+"]",wf="[^"+ic.replace("\\.","")+"]",Af=/((?:WC+[\/:])*)/.source.replace("WC",sc),Rf=/(WCOD+)?/.source.replace("WCOD",wf),Cf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",sc),If=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",sc),Pf=new RegExp("^"+Af+Rf+Cf+If+"$"),Lf=["material","materials","bones","map"],Ll=class{constructor(t,e,n){let s=n||_e.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},_e=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Tf,"")}static parseTrackName(t){let e=Pf.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Lf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Xt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Yt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Yt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Yt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Yt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Yt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;Yt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_e.Composite=Ll;_e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_e.prototype.GetterByBindingType=[_e.prototype._getValue_direct,_e.prototype._getValue_array,_e.prototype._getValue_arrayElement,_e.prototype._getValue_toArray];_e.prototype.SetterByBindingTypeAndVersioning=[[_e.prototype._setValue_direct,_e.prototype._setValue_direct_setNeedsUpdate,_e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_array,_e.prototype._setValue_array_setNeedsUpdate,_e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_arrayElement,_e.prototype._setValue_arrayElement_setNeedsUpdate,_e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_fromArray,_e.prototype._setValue_fromArray_setNeedsUpdate,_e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var P_=new Float32Array(1);var Dl=class i{static{i.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};function rc(i,t,e,n){let s=Df(n);switch(e){case Kl:return i*t;case Ja:return i*t/s.components*s.byteLength;case Ka:return i*t/s.components*s.byteLength;case pi:return i*t*2/s.components*s.byteLength;case ja:return i*t*2/s.components*s.byteLength;case jl:return i*t*3/s.components*s.byteLength;case hn:return i*t*4/s.components*s.byteLength;case Qa:return i*t*4/s.components*s.byteLength;case vr:case yr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Mr:case Sr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case eo:case io:return Math.max(i,16)*Math.max(t,8)/4;case to:case no:return Math.max(i,8)*Math.max(t,8)/2;case so:case ro:case oo:case lo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ao:case br:case co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case uo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case fo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case po:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case mo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case go:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case _o:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case xo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case vo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case yo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case So:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case bo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Eo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case To:case wo:case Ao:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ro:case Co:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Er:case Io:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Df(i){switch(i){case Ke:case Yl:return{byteLength:1,components:1};case vs:case Zl:case Mn:return{byteLength:2,components:1};case Za:case $a:return{byteLength:2,components:4};case yn:case Ya:case cn:return{byteLength:4,components:1};case $l:case Jl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Xt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Uu(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function kf(i){let t=new WeakMap;function e(o,c){let l=o.array,h=o.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){let h=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,h);else{f.sort((d,_)=>d.start-_.start);let u=0;for(let d=1;d<f.length;d++){let _=f[u],M=f[d];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++u,f[u]=M)}f.length=u+1;for(let d=0,_=f.length;d<_;d++){let M=f[d];i.bufferSubData(l,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Vf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gf=`#ifdef USE_ALPHAHASH
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
#endif`,Hf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yf=`#ifdef USE_AOMAP
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
#endif`,Zf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$f=`#ifdef USE_BATCHING
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
#endif`,Jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Kf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tp=`#ifdef USE_IRIDESCENCE
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
#endif`,ep=`#ifdef USE_BUMPMAP
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
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,op=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,lp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,hp=`#define PI 3.141592653589793
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
} // validated`,up=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dp=`vec3 transformedNormal = objectNormal;
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
#endif`,fp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_p="gl_FragColor = linearToOutputTexel( gl_FragColor );",xp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vp=`#ifdef USE_ENVMAP
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
#endif`,yp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Mp=`#ifdef USE_ENVMAP
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
#endif`,Sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bp=`#ifdef USE_ENVMAP
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
#endif`,Ep=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rp=`#ifdef USE_GRADIENTMAP
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
}`,Cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ip=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Dp=`#ifdef USE_ENVMAP
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
#endif`,Np=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Op=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bp=`PhysicalMaterial material;
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
#endif`,zp=`uniform sampler2D dfgLUT;
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
}`,kp=`
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
#endif`,Vp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Wp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$p=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Kp=`#if defined( USE_POINTS_UV )
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
#endif`,jp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,em=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,im=`#ifdef USE_MORPHTARGETS
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
#endif`,sm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,am=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,hm=`#ifdef USE_NORMALMAP
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
#endif`,um=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,_m=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ym=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Em=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wm=`float getShadowMask() {
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
}`,Am=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rm=`#ifdef USE_SKINNING
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
#endif`,Cm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Im=`#ifdef USE_SKINNING
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
#endif`,Pm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Um=`#ifdef USE_TRANSMISSION
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
#endif`,Fm=`#ifdef USE_TRANSMISSION
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
#endif`,Om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,km=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Vm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gm=`uniform sampler2D t2D;
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
}`,Hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`#include <common>
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
}`,Zm=`#if DEPTH_PACKING == 3200
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
}`,$m=`#define DISTANCE
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
}`,Jm=`#define DISTANCE
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
}`,Km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qm=`uniform float scale;
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
}`,tg=`uniform vec3 diffuse;
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
}`,eg=`#include <common>
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
}`,ng=`uniform vec3 diffuse;
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
}`,ig=`#define LAMBERT
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
}`,sg=`#define LAMBERT
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
}`,rg=`#define MATCAP
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
}`,ag=`#define MATCAP
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
}`,og=`#define NORMAL
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
}`,lg=`#define NORMAL
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
}`,cg=`#define PHONG
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
}`,hg=`#define PHONG
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
}`,ug=`#define STANDARD
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
}`,dg=`#define STANDARD
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
}`,fg=`#define TOON
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
}`,pg=`#define TOON
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
}`,mg=`uniform float size;
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
}`,gg=`uniform vec3 diffuse;
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
}`,_g=`#include <common>
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
}`,xg=`uniform vec3 color;
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
}`,vg=`uniform float rotation;
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
}`,yg=`uniform vec3 diffuse;
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
}`,jt={alphahash_fragment:Vf,alphahash_pars_fragment:Gf,alphamap_fragment:Hf,alphamap_pars_fragment:Wf,alphatest_fragment:Xf,alphatest_pars_fragment:qf,aomap_fragment:Yf,aomap_pars_fragment:Zf,batching_pars_vertex:$f,batching_vertex:Jf,begin_vertex:Kf,beginnormal_vertex:jf,bsdfs:Qf,iridescence_fragment:tp,bumpmap_pars_fragment:ep,clipping_planes_fragment:np,clipping_planes_pars_fragment:ip,clipping_planes_pars_vertex:sp,clipping_planes_vertex:rp,color_fragment:ap,color_pars_fragment:op,color_pars_vertex:lp,color_vertex:cp,common:hp,cube_uv_reflection_fragment:up,defaultnormal_vertex:dp,displacementmap_pars_vertex:fp,displacementmap_vertex:pp,emissivemap_fragment:mp,emissivemap_pars_fragment:gp,colorspace_fragment:_p,colorspace_pars_fragment:xp,envmap_fragment:vp,envmap_common_pars_fragment:yp,envmap_pars_fragment:Mp,envmap_pars_vertex:Sp,envmap_physical_pars_fragment:Dp,envmap_vertex:bp,fog_vertex:Ep,fog_pars_vertex:Tp,fog_fragment:wp,fog_pars_fragment:Ap,gradientmap_pars_fragment:Rp,lightmap_pars_fragment:Cp,lights_lambert_fragment:Ip,lights_lambert_pars_fragment:Pp,lights_pars_begin:Lp,lights_toon_fragment:Np,lights_toon_pars_fragment:Up,lights_phong_fragment:Fp,lights_phong_pars_fragment:Op,lights_physical_fragment:Bp,lights_physical_pars_fragment:zp,lights_fragment_begin:kp,lights_fragment_maps:Vp,lights_fragment_end:Gp,lightprobes_pars_fragment:Hp,logdepthbuf_fragment:Wp,logdepthbuf_pars_fragment:Xp,logdepthbuf_pars_vertex:qp,logdepthbuf_vertex:Yp,map_fragment:Zp,map_pars_fragment:$p,map_particle_fragment:Jp,map_particle_pars_fragment:Kp,metalnessmap_fragment:jp,metalnessmap_pars_fragment:Qp,morphinstance_vertex:tm,morphcolor_vertex:em,morphnormal_vertex:nm,morphtarget_pars_vertex:im,morphtarget_vertex:sm,normal_fragment_begin:rm,normal_fragment_maps:am,normal_pars_fragment:om,normal_pars_vertex:lm,normal_vertex:cm,normalmap_pars_fragment:hm,clearcoat_normal_fragment_begin:um,clearcoat_normal_fragment_maps:dm,clearcoat_pars_fragment:fm,iridescence_pars_fragment:pm,opaque_fragment:mm,packing:gm,premultiplied_alpha_fragment:_m,project_vertex:xm,dithering_fragment:vm,dithering_pars_fragment:ym,roughnessmap_fragment:Mm,roughnessmap_pars_fragment:Sm,shadowmap_pars_fragment:bm,shadowmap_pars_vertex:Em,shadowmap_vertex:Tm,shadowmask_pars_fragment:wm,skinbase_vertex:Am,skinning_pars_vertex:Rm,skinning_vertex:Cm,skinnormal_vertex:Im,specularmap_fragment:Pm,specularmap_pars_fragment:Lm,tonemapping_fragment:Dm,tonemapping_pars_fragment:Nm,transmission_fragment:Um,transmission_pars_fragment:Fm,uv_pars_fragment:Om,uv_pars_vertex:Bm,uv_vertex:zm,worldpos_vertex:km,background_vert:Vm,background_frag:Gm,backgroundCube_vert:Hm,backgroundCube_frag:Wm,cube_vert:Xm,cube_frag:qm,depth_vert:Ym,depth_frag:Zm,distance_vert:$m,distance_frag:Jm,equirect_vert:Km,equirect_frag:jm,linedashed_vert:Qm,linedashed_frag:tg,meshbasic_vert:eg,meshbasic_frag:ng,meshlambert_vert:ig,meshlambert_frag:sg,meshmatcap_vert:rg,meshmatcap_frag:ag,meshnormal_vert:og,meshnormal_frag:lg,meshphong_vert:cg,meshphong_frag:hg,meshphysical_vert:ug,meshphysical_frag:dg,meshtoon_vert:fg,meshtoon_frag:pg,points_vert:mg,points_frag:gg,shadow_vert:_g,shadow_frag:xg,sprite_vert:vg,sprite_frag:yg},At={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new Mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new Mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},On={basic:{uniforms:Ge([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:Ge([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new $t(0)},envMapIntensity:{value:1}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:Ge([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:Ge([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:Ge([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new $t(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:Ge([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:Ge([At.points,At.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:Ge([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:Ge([At.common,At.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:Ge([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:Ge([At.sprite,At.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distance:{uniforms:Ge([At.common,At.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distance_vert,fragmentShader:jt.distance_frag},shadow:{uniforms:Ge([At.lights,At.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};On.physical={uniforms:Ge([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new Mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new Mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new Mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};var Do={r:0,b:0,g:0},Mg=new de,Fu=new Zt;Fu.set(-1,0,0,0,1,0,0,0,1);function Sg(i,t,e,n,s,r){let a=new $t(0),o=s===!0?0:1,c,l,h=null,f=0,u=null;function d(w){let R=w.isScene===!0?w.background:null;if(R&&R.isTexture){let x=w.backgroundBlurriness>0;R=t.get(R,x)}return R}function _(w){let R=!1,x=d(w);x===null?m(a,o):x&&x.isColor&&(m(x,1),R=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||R)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(w,R){let x=d(R);x&&(x.isCubeTexture||x.mapping===_r)?(l===void 0&&(l=new ae(new $e(1,1,1),new Ve({name:"BackgroundCubeMaterial",uniforms:Ni(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:Re,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,b,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Mg.makeRotationFromEuler(R.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Fu),l.material.toneMapped=ie.getTransfer(x.colorSpace)!==ce,(h!==x||f!==x.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,f=x.version,u=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new ae(new Nn(2,2),new Ve({name:"BackgroundMaterial",uniforms:Ni(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.toneMapped=ie.getTransfer(x.colorSpace)!==ce,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,u=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function m(w,R){w.getRGB(Do,nc(i)),e.buffers.color.setClear(Do.r,Do.g,Do.b,R,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,R=1){a.set(w),o=R,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,m(a,o)},render:_,addToRenderList:M,dispose:p}}function bg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(z,X,Z,B,$){let ot=!1,st=f(z,B,Z,X);r!==st&&(r=st,l(r.object)),ot=d(z,B,Z,$),ot&&_(z,B,Z,$),$!==null&&t.update($,i.ELEMENT_ARRAY_BUFFER),(ot||a)&&(a=!1,x(z,X,Z,B),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function c(){return i.createVertexArray()}function l(z){return i.bindVertexArray(z)}function h(z){return i.deleteVertexArray(z)}function f(z,X,Z,B){let $=B.wireframe===!0,ot=n[X.id];ot===void 0&&(ot={},n[X.id]=ot);let st=z.isInstancedMesh===!0?z.id:0,pt=ot[st];pt===void 0&&(pt={},ot[st]=pt);let rt=pt[Z.id];rt===void 0&&(rt={},pt[Z.id]=rt);let ct=rt[$];return ct===void 0&&(ct=u(c()),rt[$]=ct),ct}function u(z){let X=[],Z=[],B=[];for(let $=0;$<e;$++)X[$]=0,Z[$]=0,B[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:Z,attributeDivisors:B,object:z,attributes:{},index:null}}function d(z,X,Z,B){let $=r.attributes,ot=X.attributes,st=0,pt=Z.getAttributes();for(let rt in pt)if(pt[rt].location>=0){let ht=$[rt],Ft=ot[rt];if(Ft===void 0&&(rt==="instanceMatrix"&&z.instanceMatrix&&(Ft=z.instanceMatrix),rt==="instanceColor"&&z.instanceColor&&(Ft=z.instanceColor)),ht===void 0||ht.attribute!==Ft||Ft&&ht.data!==Ft.data)return!0;st++}return r.attributesNum!==st||r.index!==B}function _(z,X,Z,B){let $={},ot=X.attributes,st=0,pt=Z.getAttributes();for(let rt in pt)if(pt[rt].location>=0){let ht=ot[rt];ht===void 0&&(rt==="instanceMatrix"&&z.instanceMatrix&&(ht=z.instanceMatrix),rt==="instanceColor"&&z.instanceColor&&(ht=z.instanceColor));let Ft={};Ft.attribute=ht,ht&&ht.data&&(Ft.data=ht.data),$[rt]=Ft,st++}r.attributes=$,r.attributesNum=st,r.index=B}function M(){let z=r.newAttributes;for(let X=0,Z=z.length;X<Z;X++)z[X]=0}function m(z){p(z,0)}function p(z,X){let Z=r.newAttributes,B=r.enabledAttributes,$=r.attributeDivisors;Z[z]=1,B[z]===0&&(i.enableVertexAttribArray(z),B[z]=1),$[z]!==X&&(i.vertexAttribDivisor(z,X),$[z]=X)}function w(){let z=r.newAttributes,X=r.enabledAttributes;for(let Z=0,B=X.length;Z<B;Z++)X[Z]!==z[Z]&&(i.disableVertexAttribArray(Z),X[Z]=0)}function R(z,X,Z,B,$,ot,st){st===!0?i.vertexAttribIPointer(z,X,Z,$,ot):i.vertexAttribPointer(z,X,Z,B,$,ot)}function x(z,X,Z,B){M();let $=B.attributes,ot=Z.getAttributes(),st=X.defaultAttributeValues;for(let pt in ot){let rt=ot[pt];if(rt.location>=0){let ct=$[pt];if(ct===void 0&&(pt==="instanceMatrix"&&z.instanceMatrix&&(ct=z.instanceMatrix),pt==="instanceColor"&&z.instanceColor&&(ct=z.instanceColor)),ct!==void 0){let ht=ct.normalized,Ft=ct.itemSize,Pt=t.get(ct);if(Pt===void 0)continue;let ne=Pt.buffer,U=Pt.type,V=Pt.bytesPerElement,T=U===i.INT||U===i.UNSIGNED_INT||ct.gpuType===Ya;if(ct.isInterleavedBufferAttribute){let C=ct.data,I=C.stride,Y=ct.offset;if(C.isInstancedInterleavedBuffer){for(let q=0;q<rt.locationSize;q++)p(rt.location+q,C.meshPerAttribute);z.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=C.meshPerAttribute*C.count)}else for(let q=0;q<rt.locationSize;q++)m(rt.location+q);i.bindBuffer(i.ARRAY_BUFFER,ne);for(let q=0;q<rt.locationSize;q++)R(rt.location+q,Ft/rt.locationSize,U,ht,I*V,(Y+Ft/rt.locationSize*q)*V,T)}else{if(ct.isInstancedBufferAttribute){for(let C=0;C<rt.locationSize;C++)p(rt.location+C,ct.meshPerAttribute);z.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let C=0;C<rt.locationSize;C++)m(rt.location+C);i.bindBuffer(i.ARRAY_BUFFER,ne);for(let C=0;C<rt.locationSize;C++)R(rt.location+C,Ft/rt.locationSize,U,ht,Ft*V,Ft/rt.locationSize*C*V,T)}}else if(st!==void 0){let ht=st[pt];if(ht!==void 0)switch(ht.length){case 2:i.vertexAttrib2fv(rt.location,ht);break;case 3:i.vertexAttrib3fv(rt.location,ht);break;case 4:i.vertexAttrib4fv(rt.location,ht);break;default:i.vertexAttrib1fv(rt.location,ht)}}}}w()}function S(){A();for(let z in n){let X=n[z];for(let Z in X){let B=X[Z];for(let $ in B){let ot=B[$];for(let st in ot)h(ot[st].object),delete ot[st];delete B[$]}}delete n[z]}}function b(z){if(n[z.id]===void 0)return;let X=n[z.id];for(let Z in X){let B=X[Z];for(let $ in B){let ot=B[$];for(let st in ot)h(ot[st].object),delete ot[st];delete B[$]}}delete n[z.id]}function P(z){for(let X in n){let Z=n[X];for(let B in Z){let $=Z[B];if($[z.id]===void 0)continue;let ot=$[z.id];for(let st in ot)h(ot[st].object),delete ot[st];delete $[z.id]}}}function v(z){for(let X in n){let Z=n[X],B=z.isInstancedMesh===!0?z.id:0,$=Z[B];if($!==void 0){for(let ot in $){let st=$[ot];for(let pt in st)h(st[pt].object),delete st[pt];delete $[ot]}delete Z[B],Object.keys(Z).length===0&&delete n[X]}}}function A(){D(),a=!0,r!==s&&(r=s,l(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:D,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:M,enableAttribute:m,disableUnusedAttributes:w}}function Eg(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Tg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==hn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let v=P===Mn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Ke&&P!==cn&&!v&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(Xt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Xt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:R,maxFragmentUniforms:x,maxSamples:S,samples:b}}function wg(i){let t=this,e=null,n=0,s=!1,r=!1,a=new _n,o=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||n!==0||s;return s=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){let _=f.clippingPlanes,M=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!s||_===null||_.length===0||r&&!m)r?h(null):l();else{let w=r?0:n,R=w*4,x=p.clippingState||null;c.value=x,x=h(_,u,R,d);for(let S=0;S!==R;++S)x[S]=e[S];p.clippingState=x,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,d,_){let M=f!==null?f.length:0,m=null;if(M!==0){if(m=c.value,_!==!0||m===null){let p=d+M*4,w=u.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let R=0,x=d;R!==M;++R,x+=4)a.copy(f[R]).applyMatrix4(w,o),a.normal.toArray(m,x),m[x+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,m}}var bs=4,Ag=6,Rg=20,Cg=256,wr=new ms,pu=new $t,ac=null,oc=0,lc=0,cc=!1,Ig=new N,Ui=new N,Ts=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Ig}=r;ac=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),lc=this._renderer.getActiveMipmapLevel(),cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_u(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(ac,oc,lc),this._renderer.xr.enabled=cc,t.scissorTest=!1,Ss(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ui||t.mapping===Di?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ac=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),lc=this._renderer.getActiveMipmapLevel(),cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Oe,minFilter:Oe,generateMipmaps:!1,type:Mn,format:hn,colorSpace:ks,depthBuffer:!1},s=mu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mu(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Pg(r)),this._blurMaterial=Dg(r,t,e),this._ggxMaterial=Lg(r,t,e)}return s}_compileMaterial(t){let e=new ae(new be,t);this._renderer.compile(e,wr)}_sceneToCubeUV(t,e,n,s,r){let c=new Ue(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(pu),f.toneMapping=vn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ae(new $e,new Dn({name:"PMREM.Background",side:Re,depthWrite:!1,depthTest:!1})));let M=this._backgroundBox,m=M.material,p=!1,w=t.background;w?w.isColor&&(m.color.copy(w),t.background=null,p=!0):(m.color.copy(pu),p=!0);for(let R=0;R<6;R++){let x=R%3;x===0?(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[R],r.y,r.z)):x===1?(c.up.set(0,0,l[R]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[R],r.z)):(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[R]));let S=this._cubeSize;Ss(s,x*S,R>2?S:0,S,S),f.setRenderTarget(s),p&&f.render(M,c),f.render(t,c)}f.toneMapping=d,f.autoClear=u,t.background=w}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ui||t.mapping===Di;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_u()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;Ss(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,wr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=l*1.25,d=f*u,{_lodMax:_}=this,M=this._sizeLods[n],m=3*M*(n>_-bs?n-_+bs:0),p=4*(this._cubeSize-M);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=_-e,Ss(r,m,p,3*M,2*M),s.setRenderTarget(r),s.render(o,wr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=_-n,Ss(t,m,p,3*M,2*M),s.setRenderTarget(t),s.render(o,wr)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],f=3*h*(s>this._lodMax-bs?s-this._lodMax+bs:0),u=4*(this._cubeSize-h);Ss(e,f,u,3*h,2*h),a.setRenderTarget(e),a.render(c,wr)}};function Pg(i){let t=[],e=[],n=i,s=i-bs+1+Ag;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,u=6,d=3,_=new Float32Array(d*u*f),M=new Float32Array(d*u*f);for(let p=0;p<f;p++){let w=p%3*2/3-1,R=p>2?0:-1,x=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];_.set(x,d*u*p);for(let S=0;S<u;S++){let b=h[S*2]*2-1,P=h[S*2+1]*2-1;p===0?Ui.set(1,P,b):p===1?Ui.set(-b,1,-P):p===2?Ui.set(-b,P,1):p===3?Ui.set(-1,P,-b):p===4?Ui.set(-b,-1,P):Ui.set(b,P,-1),Ui.toArray(M,(p*u+S)*d)}}let m=new be;m.setAttribute("position",new Fe(_,d)),m.setAttribute("outputDirection",new Fe(M,d)),e.push(new ae(m,null)),n>bs&&n--}return{lodMeshes:e,sizeLods:t}}function mu(i,t,e){let n=new Ze(i,t,e);return n.texture.mapping=_r,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ss(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Lg(i,t,e){return new Ve({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Cg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Oo(),fragmentShader:`

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
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Dg(i,t,e){return new Ve({name:"SphericalGaussianBlur",defines:{SAMPLES:Rg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Oo(),fragmentShader:`

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
		`,blending:Un,depthTest:!1,depthWrite:!1})}function gu(){return new Ve({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oo(),fragmentShader:`

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
		`,blending:Un,depthTest:!1,depthWrite:!1})}function _u(){return new Ve({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Oo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Uo=class extends Ze{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new js(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new $e(5,5,5),r=new Ve({name:"CubemapFromEquirect",uniforms:Ni(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Re,blending:Un});r.uniforms.tEquirect.value=e;let a=new ae(s,r),o=e.minFilter;return e.minFilter===di&&(e.minFilter=Oe),new Va(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function Ng(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===Wa||d===Xa)if(t.has(u)){let _=t.get(u).texture;return o(_,u.mapping)}else{let _=u.image;if(_&&_.height>0){let M=new Uo(_.height);return M.fromEquirectangularTexture(i,u),t.set(u,M),u.addEventListener("dispose",l),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let d=u.mapping,_=d===Wa||d===Xa,M=d===ui||d===Di;if(_||M){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Ts(i)),m=_?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let w=u.image;return _&&w&&w.height>0||M&&w&&c(w)?(n===null&&(n=new Ts(i)),m=_?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,d){return d===Wa?u.mapping=ui:d===Xa&&(u.mapping=Di),u}function c(u){let d=0,_=6;for(let M=0;M<_;M++)u[M]!==void 0&&d++;return d===_}function l(u){let d=u.target;d.removeEventListener("dispose",l);let _=t.get(d);_!==void 0&&(t.delete(d),_.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let _=e.get(d);_!==void 0&&(e.delete(d),_.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Ug(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ti("WebGLRenderer: "+n+" extension not supported."),s}}}function Fg(i,t,e,n){let s={},r=new WeakMap;function a(f){let u=f.target;u.index!==null&&t.remove(u.index);for(let _ in u.attributes)t.remove(u.attributes[_]);u.removeEventListener("dispose",a),delete s[u.id];let d=r.get(u);d&&(t.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function c(f){let u=f.attributes;for(let d in u)t.update(u[d],i.ARRAY_BUFFER)}function l(f){let u=[],d=f.index,_=f.attributes.position,M=0;if(_===void 0)return;if(d!==null){let w=d.array;M=d.version;for(let R=0,x=w.length;R<x;R+=3){let S=w[R+0],b=w[R+1],P=w[R+2];u.push(S,b,b,P,P,S)}}else{let w=_.array;M=_.version;for(let R=0,x=w.length/3-1;R<x;R+=3){let S=R+0,b=R+1,P=R+2;u.push(S,b,b,P,P,S)}}let m=new(_.count>=65535?Ys:qs)(u,1);m.version=M;let p=r.get(f);p&&t.remove(p),r.set(f,m)}function h(f){let u=r.get(f);if(u){let d=f.index;d!==null&&u.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function Og(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,u){i.drawElements(n,u,r,f*a),e.update(u,n,1)}function l(f,u,d){d!==0&&(i.drawElementsInstanced(n,u,r,f*a,d),e.update(u,n,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let M=0;for(let m=0;m<d;m++)M+=u[m];e.update(M,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Bg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Yt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function zg(i,t,e){let n=new WeakMap,s=new xe;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==f){let A=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],R=0;d===!0&&(R=1),_===!0&&(R=2),M===!0&&(R=3);let x=o.attributes.position.count*R,S=1;x>t.maxTextureSize&&(S=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let b=new Float32Array(x*S*4*f),P=new Hs(b,x,S,f);P.type=cn,P.needsUpdate=!0;let v=R*4;for(let D=0;D<f;D++){let z=m[D],X=p[D],Z=w[D],B=x*S*4*D;for(let $=0;$<z.count;$++){let ot=$*v;d===!0&&(s.fromBufferAttribute(z,$),b[B+ot+0]=s.x,b[B+ot+1]=s.y,b[B+ot+2]=s.z,b[B+ot+3]=0),_===!0&&(s.fromBufferAttribute(X,$),b[B+ot+4]=s.x,b[B+ot+5]=s.y,b[B+ot+6]=s.z,b[B+ot+7]=0),M===!0&&(s.fromBufferAttribute(Z,$),b[B+ot+8]=s.x,b[B+ot+9]=s.y,b[B+ot+10]=s.z,b[B+ot+11]=Z.itemSize===4?s.w:1)}}u={count:f,texture:P,size:new Mt(x,S)},n.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let d=0;for(let M=0;M<l.length;M++)d+=l[M];let _=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function kg(i,t,e,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,f=l.geometry,u=t.get(l,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Vg={[kl]:"LINEAR_TONE_MAPPING",[Vl]:"REINHARD_TONE_MAPPING",[Gl]:"CINEON_TONE_MAPPING",[gr]:"ACES_FILMIC_TONE_MAPPING",[Wl]:"AGX_TONE_MAPPING",[Xl]:"NEUTRAL_TONE_MAPPING",[Hl]:"CUSTOM_TONE_MAPPING"};function Gg(i,t,e,n,s,r){let a=new Ze(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new be;l.setAttribute("position",new he([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new he([0,2,0,0,2,0],2));let h=new Ra({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new ae(l,h),u=new ms(-1,1,1,-1,0,1),d=null,_=null,M=!1,m,p=null,w=[],R=!1;this.setSize=function(x,S){a.setSize(x,S),o!==null&&o.setSize(x,S),c!==null&&c.setSize(x,S);for(let b=0;b<w.length;b++){let P=w[b];P.setSize&&P.setSize(x,S)}},this.setEffects=function(x){w=x,R=w.length>0&&w[0].isRenderPass===!0;let S=a.width,b=a.height;w.length>0&&o===null&&(o=new Ze(S,b,{type:Mn,depthBuffer:!1,stencilBuffer:!1}),c=new Ze(S,b,{type:Mn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<w.length;P++){let v=w[P];v.setSize&&v.setSize(S,b)}},this.begin=function(x,S){if(M||x.toneMapping===vn&&w.length===0)return!1;if(p=S,S!==null){let b=S.width,P=S.height;(a.width!==b||a.height!==P)&&this.setSize(b,P)}return R===!1&&x.setRenderTarget(a),m=x.toneMapping,x.toneMapping=vn,!0},this.hasRenderPass=function(){return R},this.end=function(x,S){x.toneMapping=m,M=!0;let b=a,P=o;for(let v=0;v<w.length;v++){let A=w[v];A.enabled!==!1&&(A.render(x,P,b,S),A.needsSwap!==!1&&(b=P,P=P===o?c:o))}if(d!==x.outputColorSpace||_!==x.toneMapping){d=x.outputColorSpace,_=x.toneMapping,h.defines={},ie.getTransfer(d)===ce&&(h.defines.SRGB_TRANSFER="");let v=Vg[_];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,x.setRenderTarget(p),x.render(f,u),p=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Ou=new We,dc=new si(1,1),Bu=new Hs,zu=new ya,ku=new js,xu=[],vu=[],yu=new Float32Array(16),Mu=new Float32Array(9),Su=new Float32Array(4);function ws(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=xu[s];if(r===void 0&&(r=new Float32Array(s),xu[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ce(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ie(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Bo(i,t){let e=vu[t];e===void 0&&(e=new Int32Array(t),vu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Hg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Wg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2fv(this.addr,t),Ie(e,t)}}function Xg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;i.uniform3fv(this.addr,t),Ie(e,t)}}function qg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4fv(this.addr,t),Ie(e,t)}}function Yg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(Ce(e,n))return;Su.set(n),i.uniformMatrix2fv(this.addr,!1,Su),Ie(e,n)}}function Zg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(Ce(e,n))return;Mu.set(n),i.uniformMatrix3fv(this.addr,!1,Mu),Ie(e,n)}}function $g(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(Ce(e,n))return;yu.set(n),i.uniformMatrix4fv(this.addr,!1,yu),Ie(e,n)}}function Jg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Kg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2iv(this.addr,t),Ie(e,t)}}function jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3iv(this.addr,t),Ie(e,t)}}function Qg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4iv(this.addr,t),Ie(e,t)}}function t0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function e0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2uiv(this.addr,t),Ie(e,t)}}function n0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3uiv(this.addr,t),Ie(e,t)}}function i0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4uiv(this.addr,t),Ie(e,t)}}function s0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(dc.compareFunction=e.isReversedDepthBuffer()?Lo:Po,r=dc):r=Ou,e.setTexture2D(t||r,s)}function r0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||zu,s)}function a0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ku,s)}function o0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Bu,s)}function l0(i){switch(i){case 5126:return Hg;case 35664:return Wg;case 35665:return Xg;case 35666:return qg;case 35674:return Yg;case 35675:return Zg;case 35676:return $g;case 5124:case 35670:return Jg;case 35667:case 35671:return Kg;case 35668:case 35672:return jg;case 35669:case 35673:return Qg;case 5125:return t0;case 36294:return e0;case 36295:return n0;case 36296:return i0;case 35678:case 36198:case 36298:case 36306:case 35682:return s0;case 35679:case 36299:case 36307:return r0;case 35680:case 36300:case 36308:case 36293:return a0;case 36289:case 36303:case 36311:case 36292:return o0}}function c0(i,t){i.uniform1fv(this.addr,t)}function h0(i,t){let e=ws(t,this.size,2);i.uniform2fv(this.addr,e)}function u0(i,t){let e=ws(t,this.size,3);i.uniform3fv(this.addr,e)}function d0(i,t){let e=ws(t,this.size,4);i.uniform4fv(this.addr,e)}function f0(i,t){let e=ws(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function p0(i,t){let e=ws(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function m0(i,t){let e=ws(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function g0(i,t){i.uniform1iv(this.addr,t)}function _0(i,t){i.uniform2iv(this.addr,t)}function x0(i,t){i.uniform3iv(this.addr,t)}function v0(i,t){i.uniform4iv(this.addr,t)}function y0(i,t){i.uniform1uiv(this.addr,t)}function M0(i,t){i.uniform2uiv(this.addr,t)}function S0(i,t){i.uniform3uiv(this.addr,t)}function b0(i,t){i.uniform4uiv(this.addr,t)}function E0(i,t,e){let n=this.cache,s=t.length,r=Bo(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=dc:a=Ou;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function T0(i,t,e){let n=this.cache,s=t.length,r=Bo(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||zu,r[a])}function w0(i,t,e){let n=this.cache,s=t.length,r=Bo(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||ku,r[a])}function A0(i,t,e){let n=this.cache,s=t.length,r=Bo(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Bu,r[a])}function R0(i){switch(i){case 5126:return c0;case 35664:return h0;case 35665:return u0;case 35666:return d0;case 35674:return f0;case 35675:return p0;case 35676:return m0;case 5124:case 35670:return g0;case 35667:case 35671:return _0;case 35668:case 35672:return x0;case 35669:case 35673:return v0;case 5125:return y0;case 36294:return M0;case 36295:return S0;case 36296:return b0;case 35678:case 36198:case 36298:case 36306:case 35682:return E0;case 35679:case 36299:case 36307:return T0;case 35680:case 36300:case 36308:case 36293:return w0;case 36289:case 36303:case 36311:case 36292:return A0}}var fc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=l0(e.type)}},pc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=R0(e.type)}},mc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},hc=/(\w+)(\])?(\[|\.)?/g;function bu(i,t){i.seq.push(t),i.map[t.id]=t}function C0(i,t,e){let n=i.name,s=n.length;for(hc.lastIndex=0;;){let r=hc.exec(n),a=hc.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){bu(e,l===void 0?new fc(o,i,t):new pc(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new mc(o),bu(e,f)),e=f}}}var Es=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);C0(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Eu(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var I0=37297,P0=0;function L0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Tu=new Zt;function D0(i){ie._getMatrix(Tu,ie.workingColorSpace,i);let t=`mat3( ${Tu.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(i)){case Vs:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return Xt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function wu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+L0(i.getShaderSource(t),o)}else return r}function N0(i,t){let e=D0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var U0={[kl]:"Linear",[Vl]:"Reinhard",[Gl]:"Cineon",[gr]:"ACESFilmic",[Wl]:"AgX",[Xl]:"Neutral",[Hl]:"Custom"};function F0(i,t){let e=U0[t];return e===void 0?(Xt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var No=new N;function O0(){ie.getLuminanceCoefficients(No);let i=No.x.toFixed(4),t=No.y.toFixed(4),e=No.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function B0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rr).join(`
`)}function z0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function k0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Rr(i){return i!==""}function Au(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ru(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var V0=/^[ \t]*#include +<([\w\d./]+)>/gm;function gc(i){return i.replace(V0,H0)}var G0=new Map;function H0(i,t){let e=jt[t];if(e===void 0){let n=G0.get(t);if(n!==void 0)e=jt[n],Xt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return gc(e)}var W0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cu(i){return i.replace(W0,X0)}function X0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Iu(i){let t=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var q0={[Pi]:"SHADOWMAP_TYPE_PCF",[_s]:"SHADOWMAP_TYPE_VSM"};function Y0(i){return q0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Z0={[ui]:"ENVMAP_TYPE_CUBE",[Di]:"ENVMAP_TYPE_CUBE",[_r]:"ENVMAP_TYPE_CUBE_UV"};function $0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Z0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var J0={[Di]:"ENVMAP_MODE_REFRACTION"};function K0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":J0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var j0={[Ha]:"ENVMAP_BLENDING_MULTIPLY",[Hh]:"ENVMAP_BLENDING_MIX",[Wh]:"ENVMAP_BLENDING_ADD"};function Q0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":j0[i.combine]||"ENVMAP_BLENDING_NONE"}function t_(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function e_(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=Y0(e),l=$0(e),h=K0(e),f=Q0(e),u=t_(e),d=B0(e),_=z0(r),M=s.createProgram(),m,p,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Rr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Rr).join(`
`),p.length>0&&(p+=`
`)):(m=[Iu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rr).join(`
`),p=[Iu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==vn?"#define TONE_MAPPING":"",e.toneMapping!==vn?jt.tonemapping_pars_fragment:"",e.toneMapping!==vn?F0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,N0("linearToOutputTexel",e.outputColorSpace),O0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Rr).join(`
`)),a=gc(a),a=Au(a,e),a=Ru(a,e),o=gc(o),o=Au(o,e),o=Ru(o,e),a=Cu(a),o=Cu(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let R=w+m+a,x=w+p+o,S=Eu(s,s.VERTEX_SHADER,R),b=Eu(s,s.FRAGMENT_SHADER,x);s.attachShader(M,S),s.attachShader(M,b),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function P(z){if(i.debug.checkShaderErrors){let X=s.getProgramInfoLog(M)||"",Z=s.getShaderInfoLog(S)||"",B=s.getShaderInfoLog(b)||"",$=X.trim(),ot=Z.trim(),st=B.trim(),pt=!0,rt=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(pt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,S,b);else{let ct=wu(s,S,"vertex"),ht=wu(s,b,"fragment");Yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+$+`
`+ct+`
`+ht)}else $!==""?Xt("WebGLProgram: Program Info Log:",$):(ot===""||st==="")&&(rt=!1);rt&&(z.diagnostics={runnable:pt,programLog:$,vertexShader:{log:ot,prefix:m},fragmentShader:{log:st,prefix:p}})}s.deleteShader(S),s.deleteShader(b),v=new Es(s,M),A=k0(s,M)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let A;this.getAttributes=function(){return A===void 0&&P(this),A};let D=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(M,I0)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=P0++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=S,this.fragmentShader=b,this}var n_=0,_c=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new xc(t),e.set(t,n)),n}},xc=class{constructor(t){this.id=n_++,this.code=t,this.usedTimes=0}};function i_(i){return i===pi||i===br||i===Er}function s_(i,t,e,n,s,r){let a=new Ws,o=new _c,c=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer,u=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function M(v,A,D,z,X,Z){let B=z.fog,$=X.geometry,ot=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?z.environment:null,st=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,pt=t.get(v.envMap||ot,st),rt=pt&&pt.mapping===_r?pt.image.height:null,ct=d[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Xt("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));let ht=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Ft=ht!==void 0?ht.length:0,Pt=0;$.morphAttributes.position!==void 0&&(Pt=1),$.morphAttributes.normal!==void 0&&(Pt=2),$.morphAttributes.color!==void 0&&(Pt=3);let ne,U,V,T;if(ct){let pe=On[ct];ne=pe.vertexShader,U=pe.fragmentShader}else{ne=v.vertexShader,U=v.fragmentShader;let pe=o.getVertexShaderStage(v),oe=o.getFragmentShaderStage(v);o.update(v,pe,oe),V=pe.id,T=oe.id}let C=i.getRenderTarget(),I=i.state.buffers.depth.getReversed(),Y=X.isInstancedMesh===!0,q=X.isBatchedMesh===!0,tt=!!v.map,J=!!v.matcap,O=!!pt,F=!!v.aoMap,et=!!v.lightMap,it=!!v.bumpMap&&v.wireframe===!1,H=!!v.normalMap,gt=!!v.displacementMap,Lt=!!v.emissiveMap,Ut=!!v.metalnessMap,qt=!!v.roughnessMap,L=v.anisotropy>0,Qt=v.clearcoat>0,vt=v.dispersion>0,E=v.retroreflectivity>0,g=v.iridescence>0,W=v.sheen>0,K=v.transmission>0,lt=L&&!!v.anisotropyMap,_t=Qt&&!!v.clearcoatMap,xt=Qt&&!!v.clearcoatNormalMap,at=Qt&&!!v.clearcoatRoughnessMap,dt=g&&!!v.iridescenceMap,St=g&&!!v.iridescenceThicknessMap,Vt=W&&!!v.sheenColorMap,wt=W&&!!v.sheenRoughnessMap,bt=!!v.specularMap,Gt=!!v.specularColorMap,Wt=!!v.specularIntensityMap,Jt=K&&!!v.transmissionMap,G=K&&!!v.thicknessMap,Et=!!v.gradientMap,ut=!!v.alphaMap,Tt=v.alphaTest>0,It=!!v.alphaHash,mt=!!v.extensions,Ht=vn;v.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Ht=i.toneMapping);let zt={shaderID:ct,shaderType:v.type,shaderName:v.name,vertexShader:ne,fragmentShader:U,defines:v.defines,customVertexShaderID:V,customFragmentShaderID:T,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:q,batchingColor:q&&X._colorsTexture!==null,instancing:Y,instancingColor:Y&&X.instanceColor!==null,instancingMorph:Y&&X.morphTexture!==null,outputColorSpace:C===null?i.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:ie.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:tt,matcap:J,envMap:O,envMapMode:O&&pt.mapping,envMapCubeUVHeight:rt,aoMap:F,lightMap:et,bumpMap:it,normalMap:H,displacementMap:gt,emissiveMap:Lt,normalMapObjectSpace:H&&v.normalMapType===Yh,normalMapTangentSpace:H&&v.normalMapType===Tr,packedNormalMap:H&&v.normalMapType===Tr&&i_(v.normalMap.format),metalnessMap:Ut,roughnessMap:qt,anisotropy:L,anisotropyMap:lt,clearcoat:Qt,clearcoatMap:_t,clearcoatNormalMap:xt,clearcoatRoughnessMap:at,dispersion:vt,retroreflection:E,iridescence:g,iridescenceMap:dt,iridescenceThicknessMap:St,sheen:W,sheenColorMap:Vt,sheenRoughnessMap:wt,specularMap:bt,specularColorMap:Gt,specularIntensityMap:Wt,transmission:K,transmissionMap:Jt,thicknessMap:G,gradientMap:Et,opaque:v.transparent===!1&&v.blending===xs&&v.alphaToCoverage===!1,alphaMap:ut,alphaTest:Tt,alphaHash:It,combine:v.combine,mapUv:tt&&_(v.map.channel),aoMapUv:F&&_(v.aoMap.channel),lightMapUv:et&&_(v.lightMap.channel),bumpMapUv:it&&_(v.bumpMap.channel),normalMapUv:H&&_(v.normalMap.channel),displacementMapUv:gt&&_(v.displacementMap.channel),emissiveMapUv:Lt&&_(v.emissiveMap.channel),metalnessMapUv:Ut&&_(v.metalnessMap.channel),roughnessMapUv:qt&&_(v.roughnessMap.channel),anisotropyMapUv:lt&&_(v.anisotropyMap.channel),clearcoatMapUv:_t&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:xt&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:dt&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:St&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Vt&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:wt&&_(v.sheenRoughnessMap.channel),specularMapUv:bt&&_(v.specularMap.channel),specularColorMapUv:Gt&&_(v.specularColorMap.channel),specularIntensityMapUv:Wt&&_(v.specularIntensityMap.channel),transmissionMapUv:Jt&&_(v.transmissionMap.channel),thicknessMapUv:G&&_(v.thicknessMap.channel),alphaMapUv:ut&&_(v.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(H||L),vertexNormals:!!$.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!$.attributes.uv&&(tt||ut),fog:!!B,useFog:v.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||$.attributes.normal===void 0&&H===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:I,skinning:X.isSkinnedMesh===!0,hasPositionAttribute:$.attributes.position!==void 0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Ft,morphTextureStride:Pt,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ht,decodeVideoTexture:tt&&v.map.isVideoTexture===!0&&ie.getTransfer(v.map.colorSpace)===ce,decodeVideoTextureEmissive:Lt&&v.emissiveMap.isVideoTexture===!0&&ie.getTransfer(v.emissiveMap.colorSpace)===ce,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Je,flipSided:v.side===Re,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:mt&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(mt&&v.extensions.multiDraw===!0||q)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return zt.vertexUv1s=c.has(1),zt.vertexUv2s=c.has(2),zt.vertexUv3s=c.has(3),c.clear(),zt}function m(v){let A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(let D in v.defines)A.push(D),A.push(v.defines[D]);return v.isRawShaderMaterial===!1&&(p(A,v),w(A,v),A.push(i.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function p(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numSunLights),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numSunLightShadows),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function w(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function R(v){let A=d[v.type],D;if(A){let z=On[A];D=uu.clone(z.uniforms)}else D=v.uniforms;return D}function x(v,A){let D=h.get(A);return D!==void 0?++D.usedTimes:(D=new e_(i,A,v,s),l.push(D),h.set(A,D)),D}function S(v){if(--v.usedTimes===0){let A=l.indexOf(v);l[A]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function b(v){o.remove(v)}function P(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:R,acquireProgram:x,releaseProgram:S,releaseShaderCache:b,programs:l,dispose:P}}function r_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function a_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Pu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Lu(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,_,M,m,p){let w=i[t];return w===void 0?(w={id:u.id,object:u,geometry:d,material:_,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:m,group:p},i[t]=w):(w.id=u.id,w.object=u,w.geometry=d,w.material=_,w.materialVariant=a(u),w.groupOrder=M,w.renderOrder=u.renderOrder,w.z=m,w.group=p),t++,w}function c(u,d,_,M,m,p,w){w.reversedDepth===!0&&(m=-m);let R=o(u,d,_,M,m,p);_.transmission>0?n.push(R):_.transparent===!0?s.push(R):e.push(R)}function l(u,d,_,M,m,p){let w=o(u,d,_,M,m,p);_.transmission>0?n.unshift(w):_.transparent===!0?s.unshift(w):e.unshift(w)}function h(u,d){e.length>1&&e.sort(u||a_),n.length>1&&n.sort(d||Pu),s.length>1&&s.sort(d||Pu)}function f(){for(let u=t,d=i.length;u<d;u++){let _=i[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:h}}function o_(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Lu,i.set(n,[a])):s>=r.length?(a=new Lu,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function l_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new N,color:new $t};break;case"SpotLight":e={position:new N,direction:new N,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new $t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":e={color:new $t,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function c_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var h_=0;function u_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function d_(i){let t=new l_,e=c_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);let s=new N,r=new de,a=new de;function o(l){let h=0,f=0,u=0;for(let X=0;X<9;X++)n.probe[X].set(0,0,0);let d=0,_=0,M=0,m=0,p=0,w=0,R=0,x=0,S=0,b=0,P=0,v=0,A=0,D=0;l.sort(u_);for(let X=0,Z=l.length;X<Z;X++){let B=l[X],$=B.color,ot=B.intensity,st=B.distance,pt=null;if(B.shadow&&B.shadow.map&&(B.shadow.map.texture.format===pi?pt=B.shadow.map.texture:pt=B.shadow.map.depthTexture||B.shadow.map.texture),B.isAmbientLight)h+=$.r*ot,f+=$.g*ot,u+=$.b*ot;else if(B.isLightProbe){for(let rt=0;rt<9;rt++)n.probe[rt].addScaledVector(B.sh.coefficients[rt],ot);D++}else if(B.isSunLight){let rt=t.get(B);if(rt.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let ct=B.shadow,ht=e.get(B);ht.shadowIntensity=ct.intensity,ht.shadowBias=ct.bias,ht.shadowNormalBias=ct.normalBias,ht.shadowRadius=ct.radius,ht.shadowMapSize.copy(ct.mapSize).multiply(ct.getFrameExtents()),n.sunShadow[_]=ht,n.sunShadowMap[_]=pt;let Ft=ct.getViewportCount();for(let Pt=0;Pt<Ft;Pt++)n.sunShadowMatrix[M+Pt]=ct.getMatrix(Pt),n.sunShadowCascade[M+Pt]=ct._cascadeData[Pt];M+=Ft,_++}n.sun[d]=rt,d++}else if(B.isDirectionalLight){let rt=t.get(B);if(rt.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let ct=B.shadow,ht=e.get(B);ht.shadowIntensity=ct.intensity,ht.shadowBias=ct.bias,ht.shadowNormalBias=ct.normalBias,ht.shadowRadius=ct.radius,ht.shadowMapSize=ct.mapSize,n.directionalShadow[m]=ht,n.directionalShadowMap[m]=pt,n.directionalShadowMatrix[m]=B.shadow.matrix,S++}n.directional[m]=rt,m++}else if(B.isSpotLight){let rt=t.get(B);rt.position.setFromMatrixPosition(B.matrixWorld),rt.color.copy($).multiplyScalar(ot),rt.distance=st,rt.coneCos=Math.cos(B.angle),rt.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),rt.decay=B.decay,n.spot[w]=rt;let ct=B.shadow;if(B.map&&(n.spotLightMap[v]=B.map,v++,ct.updateMatrices(B),B.castShadow&&A++),n.spotLightMatrix[w]=ct.matrix,B.castShadow){let ht=e.get(B);ht.shadowIntensity=ct.intensity,ht.shadowBias=ct.bias,ht.shadowNormalBias=ct.normalBias,ht.shadowRadius=ct.radius,ht.shadowMapSize=ct.mapSize,n.spotShadow[w]=ht,n.spotShadowMap[w]=pt,P++}w++}else if(B.isRectAreaLight){let rt=t.get(B);rt.color.copy($).multiplyScalar(ot),rt.halfWidth.set(B.width*.5,0,0),rt.halfHeight.set(0,B.height*.5,0),n.rectArea[R]=rt,R++}else if(B.isPointLight){let rt=t.get(B);if(rt.color.copy(B.color).multiplyScalar(B.intensity),rt.distance=B.distance,rt.decay=B.decay,B.castShadow){let ct=B.shadow,ht=e.get(B);ht.shadowIntensity=ct.intensity,ht.shadowBias=ct.bias,ht.shadowNormalBias=ct.normalBias,ht.shadowRadius=ct.radius,ht.shadowMapSize=ct.mapSize,ht.shadowCameraNear=ct.camera.near,ht.shadowCameraFar=ct.camera.far,n.pointShadow[p]=ht,n.pointShadowMap[p]=pt,n.pointShadowMatrix[p]=B.shadow.matrix,b++}n.point[p]=rt,p++}else if(B.isHemisphereLight){let rt=t.get(B);rt.skyColor.copy(B.color).multiplyScalar(ot),rt.groundColor.copy(B.groundColor).multiplyScalar(ot),n.hemi[x]=rt,x++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=At.LTC_FLOAT_1,n.rectAreaLTC2=At.LTC_FLOAT_2):(n.rectAreaLTC1=At.LTC_HALF_1,n.rectAreaLTC2=At.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let z=n.hash;(z.sunLength!==d||z.directionalLength!==m||z.pointLength!==p||z.spotLength!==w||z.rectAreaLength!==R||z.hemiLength!==x||z.numSunShadows!==_||z.numDirectionalShadows!==S||z.numPointShadows!==b||z.numSpotShadows!==P||z.numSpotMaps!==v||z.numLightProbes!==D)&&(n.sun.length=d,n.directional.length=m,n.spot.length=w,n.rectArea.length=R,n.point.length=p,n.hemi.length=x,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+v-A,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=D,z.sunLength=d,z.directionalLength=m,z.pointLength=p,z.spotLength=w,z.rectAreaLength=R,z.hemiLength=x,z.numSunShadows=_,z.numDirectionalShadows=S,z.numPointShadows=b,z.numSpotShadows=P,z.numSpotMaps=v,z.numLightProbes=D,n.version=h_++)}function c(l,h){let f=0,u=0,d=0,_=0,M=0,m=0,p=h.matrixWorldInverse;for(let w=0,R=l.length;w<R;w++){let x=l[w];if(x.isSunLight){let S=n.sun[f];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(p),f++}else if(x.isDirectionalLight){let S=n.directional[u];S.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),u++}else if(x.isSpotLight){let S=n.spot[_];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),_++}else if(x.isRectAreaLight){let S=n.rectArea[M];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),a.identity(),r.copy(x.matrixWorld),r.premultiply(p),a.extractRotation(r),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),M++}else if(x.isPointLight){let S=n.point[d];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){let S=n.hemi[m];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:n}}function Du(i){let t=new d_(i),e=[],n=[],s=[];function r(u){f.camera=u,e.length=0,n.length=0,s.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function c(u){s.push(u)}function l(){t.setup(e)}function h(u){t.setupView(e,u)}let f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function f_(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Du(i),t.set(s,[o])):r>=a.length?(o=new Du(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var p_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,m_=`uniform sampler2D shadow_pass;
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
}`,g_=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],__=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Nu=new de,Ar=new N,uc=new N;function x_(i,t,e){let n=new cs,s=new Mt,r=new Mt,a=new xe,o=new Ca,c=new Ia,l={},h=e.maxTextureSize,f={[hi]:Re,[Re]:hi,[Je]:Je},u=new Ve({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Mt},radius:{value:4}},vertexShader:p_,fragmentShader:m_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let _=new be;_.setAttribute("position",new Fe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new ae(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pi;let p=this.type;this.render=function(b,P,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===Eh&&(Xt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Pi);let A=i.getRenderTarget(),D=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),X=i.state;X.setBlending(Un),X.buffers.depth.getReversed()===!0?X.buffers.color.setClear(0,0,0,0):X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);let Z=p!==this.type;Z&&P.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach($=>$.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,$=b.length;B<$;B++){let ot=b[B],st=ot.shadow;if(st===void 0){Xt("WebGLShadowMap:",ot,"has no shadow.");continue}if(st.autoUpdate===!1&&st.needsUpdate===!1)continue;s.copy(st.mapSize);let pt=st.getFrameExtents();s.multiply(pt),r.copy(st.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/pt.x),s.x=r.x*pt.x,st.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/pt.y),s.y=r.y*pt.y,st.mapSize.y=r.y));let rt=i.state.buffers.depth.getReversed();if(st.camera._reversedDepth=rt,st.map===null||Z===!0){if(st.map!==null&&(st.map.depthTexture!==null&&(st.map.depthTexture.dispose(),st.map.depthTexture=null),st.map.dispose()),this.type===_s){if(ot.isPointLight){Xt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}st.map=new Ze(s.x,s.y,{format:pi,type:Mn,minFilter:Oe,magFilter:Oe,generateMipmaps:!1}),st.map.texture.name=ot.name+".shadowMap",st.map.depthTexture=new si(s.x,s.y,cn),st.map.depthTexture.name=ot.name+".shadowMapDepth",st.map.depthTexture.format=An,st.map.depthTexture.compareFunction=null,st.map.depthTexture.minFilter=De,st.map.depthTexture.magFilter=De}else ot.isPointLight?(st.map=new Uo(s.x),st.map.depthTexture=new Sa(s.x,yn)):(st.map=new Ze(s.x,s.y),st.map.depthTexture=new si(s.x,s.y,yn)),st.map.depthTexture.name=ot.name+".shadowMap",st.map.depthTexture.format=An,this.type===Pi?(st.map.depthTexture.compareFunction=rt?Lo:Po,st.map.depthTexture.minFilter=Oe,st.map.depthTexture.magFilter=Oe):(st.map.depthTexture.compareFunction=null,st.map.depthTexture.minFilter=De,st.map.depthTexture.magFilter=De);st.camera.updateProjectionMatrix()}st.map.isWebGLCubeRenderTarget!==!0&&(st.map.width!==s.x||st.map.height!==s.y)&&st.map.setSize(s.x,s.y);let ct=st.map.isWebGLCubeRenderTarget?6:st.getViewportCount();ot.isPointLight!==!0&&st.updateMatrices(ot,v);for(let ht=0;ht<ct;ht++){let Ft=st.getCamera(ht);if(ot.isPointLight){let Pt=st.camera,ne=st.matrix,U=ot.distance||Pt.far;U!==Pt.far&&(Pt.far=U,Pt.updateProjectionMatrix()),Ar.setFromMatrixPosition(ot.matrixWorld),Pt.position.copy(Ar),uc.copy(Pt.position),uc.add(g_[ht]),Pt.up.copy(__[ht]),Pt.lookAt(uc),Pt.updateMatrixWorld(),ne.makeTranslation(-Ar.x,-Ar.y,-Ar.z),Nu.multiplyMatrices(Pt.projectionMatrix,Pt.matrixWorldInverse),st._frustum.setFromProjectionMatrix(Nu,Pt.coordinateSystem,Pt.reversedDepth)}if(st.map.isWebGLCubeRenderTarget)i.setRenderTarget(st.map,ht),i.clear();else{ht===0&&(i.setRenderTarget(st.map),i.clear());let Pt=st.getViewport(ht);a.set(r.x*Pt.x,r.y*Pt.y,r.x*Pt.z,r.y*Pt.w),X.viewport(a)}n=st.getFrustum(ht),x(P,v,Ft,ot,this.type)}st.isPointLightShadow!==!0&&this.type===_s&&w(st,v),st.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(A,D,z)};function w(b,P){let v=t.update(M);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new Ze(s.x,s.y,{format:pi,type:Mn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(P,null,v,u,M,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(P,null,v,d,M,null)}function R(b,P,v,A){let D=null,z=v.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(z!==void 0)D=z;else if(D=v.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let X=D.uuid,Z=P.uuid,B=l[X];B===void 0&&(B={},l[X]=B);let $=B[Z];$===void 0&&($=D.clone(),B[Z]=$,P.addEventListener("dispose",S)),D=$}if(D.visible=P.visible,D.wireframe=P.wireframe,A===_s?D.side=P.shadowSide!==null?P.shadowSide:P.side:D.side=P.shadowSide!==null?P.shadowSide:f[P.side],D.alphaMap=P.alphaMap,D.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,D.map=P.map,D.clipShadows=P.clipShadows,D.clippingPlanes=P.clippingPlanes,D.clipIntersection=P.clipIntersection,D.displacementMap=P.displacementMap,D.displacementScale=P.displacementScale,D.displacementBias=P.displacementBias,D.wireframeLinewidth=P.wireframeLinewidth,D.linewidth=P.linewidth,v.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let X=i.properties.get(D);X.light=v}return D}function x(b,P,v,A,D){if(b.visible===!1)return;if(b.layers.test(P.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&D===_s)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,b.matrixWorld);let Z=t.update(b),B=b.material;if(Array.isArray(B)){let $=Z.groups;for(let ot=0,st=$.length;ot<st;ot++){let pt=$[ot],rt=B[pt.materialIndex];if(rt&&rt.visible){let ct=R(b,rt,A,D);b.onBeforeShadow(i,b,P,v,Z,ct,pt),i.renderBufferDirect(v,null,Z,ct,b,pt),b.onAfterShadow(i,b,P,v,Z,ct,pt)}}}else if(B.visible){let $=R(b,B,A,D);b.onBeforeShadow(i,b,P,v,Z,$,null),i.renderBufferDirect(v,null,Z,$,b,null),b.onAfterShadow(i,b,P,v,Z,$,null)}}let X=b.children;for(let Z=0,B=X.length;Z<B;Z++)x(X[Z],P,v,A,D)}function S(b){b.target.removeEventListener("dispose",S);for(let v in l){let A=l[v],D=b.target.uuid;D in A&&(A[D].dispose(),delete A[D])}}}function v_(i,t){function e(){let G=!1,Et=new xe,ut=null,Tt=new xe(0,0,0,0);return{setMask:function(It){ut!==It&&!G&&(i.colorMask(It,It,It,It),ut=It)},setLocked:function(It){G=It},setClear:function(It,mt,Ht,zt,pe){pe===!0&&(It*=zt,mt*=zt,Ht*=zt),Et.set(It,mt,Ht,zt),Tt.equals(Et)===!1&&(i.clearColor(It,mt,Ht,zt),Tt.copy(Et))},reset:function(){G=!1,ut=null,Tt.set(-1,0,0,0)}}}function n(){let G=!1,Et=!1,ut=null,Tt=null,It=null;return{setReversed:function(mt){if(Et!==mt){let Ht=t.get("EXT_clip_control");mt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT),Et=mt;let zt=It;It=null,this.setClear(zt)}},getReversed:function(){return Et},setTest:function(mt){mt?C(i.DEPTH_TEST):I(i.DEPTH_TEST)},setMask:function(mt){ut!==mt&&!G&&(i.depthMask(mt),ut=mt)},setFunc:function(mt){if(Et&&(mt=ru[mt]),Tt!==mt){switch(mt){case la:i.depthFunc(i.NEVER);break;case ca:i.depthFunc(i.ALWAYS);break;case ha:i.depthFunc(i.LESS);break;case ns:i.depthFunc(i.LEQUAL);break;case ua:i.depthFunc(i.EQUAL);break;case da:i.depthFunc(i.GEQUAL);break;case fa:i.depthFunc(i.GREATER);break;case pa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Tt=mt}},setLocked:function(mt){G=mt},setClear:function(mt){It!==mt&&(It=mt,Et&&(mt=1-mt),i.clearDepth(mt))},reset:function(){G=!1,ut=null,Tt=null,It=null,Et=!1}}}function s(){let G=!1,Et=null,ut=null,Tt=null,It=null,mt=null,Ht=null,zt=null,pe=null;return{setTest:function(oe){G||(oe?C(i.STENCIL_TEST):I(i.STENCIL_TEST))},setMask:function(oe){Et!==oe&&!G&&(i.stencilMask(oe),Et=oe)},setFunc:function(oe,fn,bn){(ut!==oe||Tt!==fn||It!==bn)&&(i.stencilFunc(oe,fn,bn),ut=oe,Tt=fn,It=bn)},setOp:function(oe,fn,bn){(mt!==oe||Ht!==fn||zt!==bn)&&(i.stencilOp(oe,fn,bn),mt=oe,Ht=fn,zt=bn)},setLocked:function(oe){G=oe},setClear:function(oe){pe!==oe&&(i.clearStencil(oe),pe=oe)},reset:function(){G=!1,Et=null,ut=null,Tt=null,It=null,mt=null,Ht=null,zt=null,pe=null}}}let r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},f={},u={},d=new WeakMap,_=[],M=null,m=!1,p=null,w=null,R=null,x=null,S=null,b=null,P=null,v=new $t(0,0,0),A=0,D=!1,z=null,X=null,Z=null,B=null,$=null,ot=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),st=!1,pt=0,rt=i.getParameter(i.VERSION);rt.indexOf("WebGL")!==-1?(pt=parseFloat(/^WebGL (\d)/.exec(rt)[1]),st=pt>=1):rt.indexOf("OpenGL ES")!==-1&&(pt=parseFloat(/^OpenGL ES (\d)/.exec(rt)[1]),st=pt>=2);let ct=null,ht={},Ft=i.getParameter(i.SCISSOR_BOX),Pt=i.getParameter(i.VIEWPORT),ne=new xe().fromArray(Ft),U=new xe().fromArray(Pt);function V(G,Et,ut,Tt){let It=new Uint8Array(4),mt=i.createTexture();i.bindTexture(G,mt),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<ut;Ht++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(Et,0,i.RGBA,1,1,Tt,0,i.RGBA,i.UNSIGNED_BYTE,It):i.texImage2D(Et+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,It);return mt}let T={};T[i.TEXTURE_2D]=V(i.TEXTURE_2D,i.TEXTURE_2D,1),T[i.TEXTURE_CUBE_MAP]=V(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),T[i.TEXTURE_2D_ARRAY]=V(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),T[i.TEXTURE_3D]=V(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),C(i.DEPTH_TEST),a.setFunc(ns),it(!1),H(Nl),C(i.CULL_FACE),F(Un);function C(G){h[G]!==!0&&(i.enable(G),h[G]=!0)}function I(G){h[G]!==!1&&(i.disable(G),h[G]=!1)}function Y(G,Et){return u[G]!==Et?(i.bindFramebuffer(G,Et),u[G]=Et,G===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Et),G===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Et),!0):!1}function q(G,Et){let ut=_,Tt=!1;if(G){ut=d.get(Et),ut===void 0&&(ut=[],d.set(Et,ut));let It=G.textures;if(ut.length!==It.length||ut[0]!==i.COLOR_ATTACHMENT0){for(let mt=0,Ht=It.length;mt<Ht;mt++)ut[mt]=i.COLOR_ATTACHMENT0+mt;ut.length=It.length,Tt=!0}}else ut[0]!==i.BACK&&(ut[0]=i.BACK,Tt=!0);Tt&&i.drawBuffers(ut)}function tt(G){return M!==G?(i.useProgram(G),M=G,!0):!1}let J={[Li]:i.FUNC_ADD,[wh]:i.FUNC_SUBTRACT,[Ah]:i.FUNC_REVERSE_SUBTRACT};J[Rh]=i.MIN,J[Ch]=i.MAX;let O={[Ih]:i.ZERO,[Ph]:i.ONE,[Lh]:i.SRC_COLOR,[Bl]:i.SRC_ALPHA,[Bh]:i.SRC_ALPHA_SATURATE,[Fh]:i.DST_COLOR,[Nh]:i.DST_ALPHA,[Dh]:i.ONE_MINUS_SRC_COLOR,[zl]:i.ONE_MINUS_SRC_ALPHA,[Oh]:i.ONE_MINUS_DST_COLOR,[Uh]:i.ONE_MINUS_DST_ALPHA,[zh]:i.CONSTANT_COLOR,[kh]:i.ONE_MINUS_CONSTANT_COLOR,[Vh]:i.CONSTANT_ALPHA,[Gh]:i.ONE_MINUS_CONSTANT_ALPHA};function F(G,Et,ut,Tt,It,mt,Ht,zt,pe,oe){if(G===Un){m===!0&&(I(i.BLEND),m=!1);return}if(m===!1&&(C(i.BLEND),m=!0),G!==Th){if(G!==p||oe!==D){if((w!==Li||S!==Li)&&(i.blendEquation(i.FUNC_ADD),w=Li,S=Li),oe)switch(G){case xs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ul:i.blendFunc(i.ONE,i.ONE);break;case Fl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ol:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Yt("WebGLState: Invalid blending: ",G);break}else switch(G){case xs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ul:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Fl:Yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ol:Yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Yt("WebGLState: Invalid blending: ",G);break}R=null,x=null,b=null,P=null,v.set(0,0,0),A=0,p=G,D=oe}return}It=It||Et,mt=mt||ut,Ht=Ht||Tt,(Et!==w||It!==S)&&(i.blendEquationSeparate(J[Et],J[It]),w=Et,S=It),(ut!==R||Tt!==x||mt!==b||Ht!==P)&&(i.blendFuncSeparate(O[ut],O[Tt],O[mt],O[Ht]),R=ut,x=Tt,b=mt,P=Ht),(zt.equals(v)===!1||pe!==A)&&(i.blendColor(zt.r,zt.g,zt.b,pe),v.copy(zt),A=pe),p=G,D=!1}function et(G,Et){G.side===Je?I(i.CULL_FACE):C(i.CULL_FACE);let ut=G.side===Re;Et&&(ut=!ut),it(ut),G.blending===xs&&G.transparent===!1?F(Un):F(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);let Tt=G.stencilWrite;o.setTest(Tt),Tt&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Lt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?C(i.SAMPLE_ALPHA_TO_COVERAGE):I(i.SAMPLE_ALPHA_TO_COVERAGE)}function it(G){z!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),z=G)}function H(G){G!==Sh?(C(i.CULL_FACE),G!==X&&(G===Nl?i.cullFace(i.BACK):G===bh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):I(i.CULL_FACE),X=G}function gt(G){G!==Z&&(st&&i.lineWidth(G),Z=G)}function Lt(G,Et,ut){G?(C(i.POLYGON_OFFSET_FILL),(B!==Et||$!==ut)&&(B=Et,$=ut,a.getReversed()&&(Et=-Et),i.polygonOffset(Et,ut))):I(i.POLYGON_OFFSET_FILL)}function Ut(G){G?C(i.SCISSOR_TEST):I(i.SCISSOR_TEST)}function qt(G){G===void 0&&(G=i.TEXTURE0+ot-1),ct!==G&&(i.activeTexture(G),ct=G)}function L(G,Et,ut){ut===void 0&&(ct===null?ut=i.TEXTURE0+ot-1:ut=ct);let Tt=ht[ut];Tt===void 0&&(Tt={type:void 0,texture:void 0},ht[ut]=Tt),(Tt.type!==G||Tt.texture!==Et)&&(ct!==ut&&(i.activeTexture(ut),ct=ut),i.bindTexture(G,Et||T[G]),Tt.type=G,Tt.texture=Et)}function Qt(){let G=ht[ct];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function vt(){try{i.compressedTexImage2D(...arguments)}catch(G){Yt("WebGLState:",G)}}function E(){try{i.compressedTexImage3D(...arguments)}catch(G){Yt("WebGLState:",G)}}function g(){try{i.texSubImage2D(...arguments)}catch(G){Yt("WebGLState:",G)}}function W(){try{i.texSubImage3D(...arguments)}catch(G){Yt("WebGLState:",G)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(G){Yt("WebGLState:",G)}}function lt(){try{i.compressedTexSubImage3D(...arguments)}catch(G){Yt("WebGLState:",G)}}function _t(){try{i.texStorage2D(...arguments)}catch(G){Yt("WebGLState:",G)}}function xt(){try{i.texStorage3D(...arguments)}catch(G){Yt("WebGLState:",G)}}function at(){try{i.texImage2D(...arguments)}catch(G){Yt("WebGLState:",G)}}function dt(){try{i.texImage3D(...arguments)}catch(G){Yt("WebGLState:",G)}}function St(G){return f[G]!==void 0?f[G]:i.getParameter(G)}function Vt(G,Et){f[G]!==Et&&(i.pixelStorei(G,Et),f[G]=Et)}function wt(G){ne.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),ne.copy(G))}function bt(G){U.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),U.copy(G))}function Gt(G,Et){let ut=l.get(Et);ut===void 0&&(ut=new WeakMap,l.set(Et,ut));let Tt=ut.get(G);Tt===void 0&&(Tt=i.getUniformBlockIndex(Et,G.name),ut.set(G,Tt))}function Wt(G,Et){let Tt=l.get(Et).get(G);c.get(Et)!==Tt&&(i.uniformBlockBinding(Et,Tt,G.__bindingPointIndex),c.set(Et,Tt))}function Jt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},ct=null,ht={},u={},d=new WeakMap,_=[],M=null,m=!1,p=null,w=null,R=null,x=null,S=null,b=null,P=null,v=new $t(0,0,0),A=0,D=!1,z=null,X=null,Z=null,B=null,$=null,ne.set(0,0,i.canvas.width,i.canvas.height),U.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:C,disable:I,bindFramebuffer:Y,drawBuffers:q,useProgram:tt,setBlending:F,setMaterial:et,setFlipSided:it,setCullFace:H,setLineWidth:gt,setPolygonOffset:Lt,setScissorTest:Ut,activeTexture:qt,bindTexture:L,unbindTexture:Qt,compressedTexImage2D:vt,compressedTexImage3D:E,texImage2D:at,texImage3D:dt,pixelStorei:Vt,getParameter:St,updateUBOMapping:Gt,uniformBlockBinding:Wt,texStorage2D:_t,texStorage3D:xt,texSubImage2D:g,texSubImage3D:W,compressedTexSubImage2D:K,compressedTexSubImage3D:lt,scissor:wt,viewport:bt,reset:Jt}}function y_(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Mt,h=new WeakMap,f=new Set,u,d=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(E,g){return _?new OffscreenCanvas(E,g):Gs("canvas")}function m(E,g,W){let K=1,lt=vt(E);if((lt.width>W||lt.height>W)&&(K=W/Math.max(lt.width,lt.height)),K<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let _t=Math.floor(K*lt.width),xt=Math.floor(K*lt.height);u===void 0&&(u=M(_t,xt));let at=g?M(_t,xt):u;return at.width=_t,at.height=xt,at.getContext("2d").drawImage(E,0,0,_t,xt),Xt("WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+_t+"x"+xt+")."),at}else return"data"in E&&Xt("WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),E;return E}function p(E){return E.generateMipmaps}function w(E){i.generateMipmap(E)}function R(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(E,g,W,K,lt,_t=!1){if(E!==null){if(i[E]!==void 0)return i[E];Xt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let xt;K&&(xt=t.get("EXT_texture_norm16"),xt||Xt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let at=g;if(g===i.RED&&(W===i.FLOAT&&(at=i.R32F),W===i.HALF_FLOAT&&(at=i.R16F),W===i.UNSIGNED_BYTE&&(at=i.R8),W===i.UNSIGNED_SHORT&&xt&&(at=xt.R16_EXT),W===i.SHORT&&xt&&(at=xt.R16_SNORM_EXT)),g===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(at=i.R8UI),W===i.UNSIGNED_SHORT&&(at=i.R16UI),W===i.UNSIGNED_INT&&(at=i.R32UI),W===i.BYTE&&(at=i.R8I),W===i.SHORT&&(at=i.R16I),W===i.INT&&(at=i.R32I)),g===i.RG&&(W===i.FLOAT&&(at=i.RG32F),W===i.HALF_FLOAT&&(at=i.RG16F),W===i.UNSIGNED_BYTE&&(at=i.RG8),W===i.UNSIGNED_SHORT&&xt&&(at=xt.RG16_EXT),W===i.SHORT&&xt&&(at=xt.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(at=i.RG8UI),W===i.UNSIGNED_SHORT&&(at=i.RG16UI),W===i.UNSIGNED_INT&&(at=i.RG32UI),W===i.BYTE&&(at=i.RG8I),W===i.SHORT&&(at=i.RG16I),W===i.INT&&(at=i.RG32I)),g===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(at=i.RGB8UI),W===i.UNSIGNED_SHORT&&(at=i.RGB16UI),W===i.UNSIGNED_INT&&(at=i.RGB32UI),W===i.BYTE&&(at=i.RGB8I),W===i.SHORT&&(at=i.RGB16I),W===i.INT&&(at=i.RGB32I)),g===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(at=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(at=i.RGBA16UI),W===i.UNSIGNED_INT&&(at=i.RGBA32UI),W===i.BYTE&&(at=i.RGBA8I),W===i.SHORT&&(at=i.RGBA16I),W===i.INT&&(at=i.RGBA32I)),g===i.RGB&&(W===i.UNSIGNED_SHORT&&xt&&(at=xt.RGB16_EXT),W===i.SHORT&&xt&&(at=xt.RGB16_SNORM_EXT),W===i.UNSIGNED_INT_5_9_9_9_REV&&(at=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(at=i.R11F_G11F_B10F)),g===i.RGBA){let dt=_t?Vs:ie.getTransfer(lt);W===i.FLOAT&&(at=i.RGBA32F),W===i.HALF_FLOAT&&(at=i.RGBA16F),W===i.UNSIGNED_BYTE&&(at=dt===ce?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT&&xt&&(at=xt.RGBA16_EXT),W===i.SHORT&&xt&&(at=xt.RGBA16_SNORM_EXT),W===i.UNSIGNED_SHORT_4_4_4_4&&(at=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(at=i.RGB5_A1)}return(at===i.R16F||at===i.R32F||at===i.RG16F||at===i.RG32F||at===i.RGBA16F||at===i.RGBA32F)&&t.get("EXT_color_buffer_float"),at}function S(E,g){let W;return E?g===null||g===yn||g===ys?W=i.DEPTH24_STENCIL8:g===cn?W=i.DEPTH32F_STENCIL8:g===vs&&(W=i.DEPTH24_STENCIL8,Xt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===yn||g===ys?W=i.DEPTH_COMPONENT24:g===cn?W=i.DEPTH_COMPONENT32F:g===vs&&(W=i.DEPTH_COMPONENT16),W}function b(E,g){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==De&&E.minFilter!==Oe?Math.log2(Math.max(g.width,g.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?g.mipmaps.length:1}function P(E){let g=E.target;g.removeEventListener("dispose",P),A(g),g.isVideoTexture&&h.delete(g),g.isHTMLTexture&&f.delete(g)}function v(E){let g=E.target;g.removeEventListener("dispose",v),z(g)}function A(E){let g=n.get(E);if(g.__webglInit===void 0)return;let W=E.source,K=d.get(W);if(K){let lt=K[g.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&D(E),Object.keys(K).length===0&&d.delete(W)}n.remove(E)}function D(E){let g=n.get(E);i.deleteTexture(g.__webglTexture);let W=E.source,K=d.get(W);delete K[g.__cacheKey],a.memory.textures--}function z(E){let g=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(g.__webglFramebuffer[K]))for(let lt=0;lt<g.__webglFramebuffer[K].length;lt++)i.deleteFramebuffer(g.__webglFramebuffer[K][lt]);else i.deleteFramebuffer(g.__webglFramebuffer[K]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[K])}else{if(Array.isArray(g.__webglFramebuffer))for(let K=0;K<g.__webglFramebuffer.length;K++)i.deleteFramebuffer(g.__webglFramebuffer[K]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let K=0;K<g.__webglColorRenderbuffer.length;K++)g.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[K]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let W=E.textures;for(let K=0,lt=W.length;K<lt;K++){let _t=n.get(W[K]);_t.__webglTexture&&(i.deleteTexture(_t.__webglTexture),a.memory.textures--),n.remove(W[K])}n.remove(E)}let X=0;function Z(){X=0}function B(){return X}function $(E){X=E}function ot(){let E=X;return E>=s.maxTextures&&Xt("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+s.maxTextures),X+=1,E}function st(E){let g=[];return g.push(E.wrapS),g.push(E.wrapT),g.push(E.wrapR||0),g.push(E.magFilter),g.push(E.minFilter),g.push(E.anisotropy),g.push(E.internalFormat),g.push(E.format),g.push(E.type),g.push(E.generateMipmaps),g.push(E.premultiplyAlpha),g.push(E.flipY),g.push(E.unpackAlignment),g.push(E.colorSpace),g.join()}function pt(E,g){let W=n.get(E);if(E.isVideoTexture&&L(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&W.__version!==E.version){let K=E.image;if(K===null)Xt("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Xt("WebGLRenderer: Texture marked for update but image is incomplete");else{I(W,E,g);return}}else E.isExternalTexture&&(W.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+g)}function rt(E,g){let W=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&W.__version!==E.version){I(W,E,g);return}else E.isExternalTexture&&(W.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+g)}function ct(E,g){let W=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&W.__version!==E.version){I(W,E,g);return}e.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+g)}function ht(E,g){let W=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&W.__version!==E.version){Y(W,E,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+g)}let Ft={[is]:i.REPEAT,[wn]:i.CLAMP_TO_EDGE,[ma]:i.MIRRORED_REPEAT},Pt={[De]:i.NEAREST,[Xh]:i.NEAREST_MIPMAP_NEAREST,[xr]:i.NEAREST_MIPMAP_LINEAR,[Oe]:i.LINEAR,[qa]:i.LINEAR_MIPMAP_NEAREST,[di]:i.LINEAR_MIPMAP_LINEAR},ne={[$h]:i.NEVER,[tu]:i.ALWAYS,[Jh]:i.LESS,[Po]:i.LEQUAL,[Kh]:i.EQUAL,[Lo]:i.GEQUAL,[jh]:i.GREATER,[Qh]:i.NOTEQUAL};function U(E,g){if(g.type===cn&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Oe||g.magFilter===qa||g.magFilter===xr||g.magFilter===di||g.minFilter===Oe||g.minFilter===qa||g.minFilter===xr||g.minFilter===di)&&Xt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,Ft[g.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Ft[g.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Ft[g.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,Pt[g.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,Pt[g.minFilter]),g.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ne[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===De||g.minFilter!==xr&&g.minFilter!==di||g.type===cn&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let W=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function V(E,g){let W=!1;E.__webglInit===void 0&&(E.__webglInit=!0,g.addEventListener("dispose",P));let K=g.source,lt=d.get(K);lt===void 0&&(lt={},d.set(K,lt));let _t=st(g);if(_t!==E.__cacheKey){lt[_t]===void 0&&(lt[_t]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),lt[_t].usedTimes++;let xt=lt[E.__cacheKey];xt!==void 0&&(lt[E.__cacheKey].usedTimes--,xt.usedTimes===0&&D(g)),E.__cacheKey=_t,E.__webglTexture=lt[_t].texture}return W}function T(E,g,W){return Math.floor(Math.floor(E/W)/g)}function C(E,g,W,K){let _t=E.updateRanges;if(_t.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,W,K,g.data);else{_t.sort((Vt,wt)=>Vt.start-wt.start);let xt=0;for(let Vt=1;Vt<_t.length;Vt++){let wt=_t[xt],bt=_t[Vt],Gt=wt.start+wt.count,Wt=T(bt.start,g.width,4),Jt=T(wt.start,g.width,4);bt.start<=Gt+1&&Wt===Jt&&T(bt.start+bt.count-1,g.width,4)===Wt?wt.count=Math.max(wt.count,bt.start+bt.count-wt.start):(++xt,_t[xt]=bt)}_t.length=xt+1;let at=e.getParameter(i.UNPACK_ROW_LENGTH),dt=e.getParameter(i.UNPACK_SKIP_PIXELS),St=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let Vt=0,wt=_t.length;Vt<wt;Vt++){let bt=_t[Vt],Gt=Math.floor(bt.start/4),Wt=Math.ceil(bt.count/4),Jt=Gt%g.width,G=Math.floor(Gt/g.width),Et=Wt,ut=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Jt),e.pixelStorei(i.UNPACK_SKIP_ROWS,G),e.texSubImage2D(i.TEXTURE_2D,0,Jt,G,Et,ut,W,K,g.data)}E.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,at),e.pixelStorei(i.UNPACK_SKIP_PIXELS,dt),e.pixelStorei(i.UNPACK_SKIP_ROWS,St)}}function I(E,g,W){let K=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(K=i.TEXTURE_3D);let lt=V(E,g),_t=g.source;e.bindTexture(K,E.__webglTexture,i.TEXTURE0+W);let xt=n.get(_t);if(_t.version!==xt.__version||lt===!0){if(e.activeTexture(i.TEXTURE0+W),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){let ut=ie.getPrimaries(ie.workingColorSpace),Tt=g.colorSpace===Xn?null:ie.getPrimaries(g.colorSpace),It=g.colorSpace===Xn||ut===Tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It)}e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let dt=m(g.image,!1,s.maxTextureSize);dt=Qt(g,dt);let St=r.convert(g.format,g.colorSpace),Vt=r.convert(g.type),wt=x(g.internalFormat,St,Vt,g.normalized,g.colorSpace,g.isVideoTexture);U(K,g);let bt,Gt=g.mipmaps,Wt=g.isVideoTexture!==!0,Jt=xt.__version===void 0||lt===!0,G=_t.dataReady,Et=b(g,dt);if(g.isDepthTexture)wt=S(g.format===fi,g.type),Jt&&(Wt?e.texStorage2D(i.TEXTURE_2D,1,wt,dt.width,dt.height):e.texImage2D(i.TEXTURE_2D,0,wt,dt.width,dt.height,0,St,Vt,null));else if(g.isDataTexture)if(Gt.length>0){Wt&&Jt&&e.texStorage2D(i.TEXTURE_2D,Et,wt,Gt[0].width,Gt[0].height);for(let ut=0,Tt=Gt.length;ut<Tt;ut++)bt=Gt[ut],Wt?G&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,bt.width,bt.height,St,Vt,bt.data):e.texImage2D(i.TEXTURE_2D,ut,wt,bt.width,bt.height,0,St,Vt,bt.data);g.generateMipmaps=!1}else Wt?(Jt&&e.texStorage2D(i.TEXTURE_2D,Et,wt,dt.width,dt.height),G&&C(g,dt,St,Vt)):e.texImage2D(i.TEXTURE_2D,0,wt,dt.width,dt.height,0,St,Vt,dt.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Wt&&Jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Et,wt,Gt[0].width,Gt[0].height,dt.depth);for(let ut=0,Tt=Gt.length;ut<Tt;ut++)if(bt=Gt[ut],g.format!==hn)if(St!==null)if(Wt){if(G)if(g.layerUpdates.size>0){let It=rc(bt.width,bt.height,g.format,g.type);for(let mt of g.layerUpdates){let Ht=bt.data.subarray(mt*It/bt.data.BYTES_PER_ELEMENT,(mt+1)*It/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,mt,bt.width,bt.height,1,St,Ht)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,0,bt.width,bt.height,dt.depth,St,bt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ut,wt,bt.width,bt.height,dt.depth,0,bt.data,0,0);else Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?G&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,0,bt.width,bt.height,dt.depth,St,Vt,bt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ut,wt,bt.width,bt.height,dt.depth,0,St,Vt,bt.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{Wt&&Jt&&e.texStorage2D(i.TEXTURE_2D,Et,wt,Gt[0].width,Gt[0].height);for(let ut=0,Tt=Gt.length;ut<Tt;ut++)bt=Gt[ut],g.format!==hn?St!==null?Wt?G&&e.compressedTexSubImage2D(i.TEXTURE_2D,ut,0,0,bt.width,bt.height,St,bt.data):e.compressedTexImage2D(i.TEXTURE_2D,ut,wt,bt.width,bt.height,0,bt.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?G&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,bt.width,bt.height,St,Vt,bt.data):e.texImage2D(i.TEXTURE_2D,ut,wt,bt.width,bt.height,0,St,Vt,bt.data)}else if(g.isDataArrayTexture)if(Wt){if(Jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Et,wt,dt.width,dt.height,dt.depth),G)if(g.layerUpdates.size>0){let ut=rc(dt.width,dt.height,g.format,g.type);for(let Tt of g.layerUpdates){let It=dt.data.subarray(Tt*ut/dt.data.BYTES_PER_ELEMENT,(Tt+1)*ut/dt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Tt,dt.width,dt.height,1,St,Vt,It)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,dt.width,dt.height,dt.depth,St,Vt,dt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,wt,dt.width,dt.height,dt.depth,0,St,Vt,dt.data);else if(g.isData3DTexture)Wt?(Jt&&e.texStorage3D(i.TEXTURE_3D,Et,wt,dt.width,dt.height,dt.depth),G&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,dt.width,dt.height,dt.depth,St,Vt,dt.data)):e.texImage3D(i.TEXTURE_3D,0,wt,dt.width,dt.height,dt.depth,0,St,Vt,dt.data);else if(g.isFramebufferTexture){if(Jt)if(Wt)e.texStorage2D(i.TEXTURE_2D,Et,wt,dt.width,dt.height);else{let ut=dt.width,Tt=dt.height;for(let It=0;It<Et;It++)e.texImage2D(i.TEXTURE_2D,It,wt,ut,Tt,0,St,Vt,null),ut>>=1,Tt>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let ut=i.canvas;if(ut.hasAttribute("layoutsubtree")||ut.setAttribute("layoutsubtree","true"),dt.parentNode!==ut){ut.appendChild(dt),f.add(g),ut.onpaint=Tt=>{let It=Tt.changedElements;for(let mt of f)It.includes(mt.image)&&(mt.needsUpdate=!0)},ut.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,dt);else{let It=i.RGBA,mt=i.RGBA,Ht=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,It,mt,Ht,dt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Gt.length>0){if(Wt&&Jt){let ut=vt(Gt[0]);e.texStorage2D(i.TEXTURE_2D,Et,wt,ut.width,ut.height)}for(let ut=0,Tt=Gt.length;ut<Tt;ut++)bt=Gt[ut],Wt?G&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,St,Vt,bt):e.texImage2D(i.TEXTURE_2D,ut,wt,St,Vt,bt);g.generateMipmaps=!1}else if(Wt){if(Jt){let ut=vt(dt);e.texStorage2D(i.TEXTURE_2D,Et,wt,ut.width,ut.height)}G&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,Vt,dt)}else e.texImage2D(i.TEXTURE_2D,0,wt,St,Vt,dt);p(g)&&w(K),xt.__version=_t.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function Y(E,g,W){if(g.image.length!==6)return;let K=V(E,g),lt=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+W);let _t=n.get(lt);if(lt.version!==_t.__version||K===!0){e.activeTexture(i.TEXTURE0+W);let xt=ie.getPrimaries(ie.workingColorSpace),at=g.colorSpace===Xn?null:ie.getPrimaries(g.colorSpace),dt=g.colorSpace===Xn||xt===at?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);let St=g.isCompressedTexture||g.image[0].isCompressedTexture,Vt=g.image[0]&&g.image[0].isDataTexture,wt=[];for(let mt=0;mt<6;mt++)!St&&!Vt?wt[mt]=m(g.image[mt],!0,s.maxCubemapSize):wt[mt]=Vt?g.image[mt].image:g.image[mt],wt[mt]=Qt(g,wt[mt]);let bt=wt[0],Gt=r.convert(g.format,g.colorSpace),Wt=r.convert(g.type),Jt=x(g.internalFormat,Gt,Wt,g.normalized,g.colorSpace),G=g.isVideoTexture!==!0,Et=_t.__version===void 0||K===!0,ut=lt.dataReady,Tt=b(g,bt);U(i.TEXTURE_CUBE_MAP,g);let It;if(St){G&&Et&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Tt,Jt,bt.width,bt.height);for(let mt=0;mt<6;mt++){It=wt[mt].mipmaps;for(let Ht=0;Ht<It.length;Ht++){let zt=It[Ht];g.format!==hn?Gt!==null?G?ut&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ht,0,0,zt.width,zt.height,Gt,zt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ht,Jt,zt.width,zt.height,0,zt.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ht,0,0,zt.width,zt.height,Gt,Wt,zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ht,Jt,zt.width,zt.height,0,Gt,Wt,zt.data)}}}else{if(It=g.mipmaps,G&&Et){It.length>0&&Tt++;let mt=vt(wt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Tt,Jt,mt.width,mt.height)}for(let mt=0;mt<6;mt++)if(Vt){G?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,wt[mt].width,wt[mt].height,Gt,Wt,wt[mt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,Jt,wt[mt].width,wt[mt].height,0,Gt,Wt,wt[mt].data);for(let Ht=0;Ht<It.length;Ht++){let pe=It[Ht].image[mt].image;G?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ht+1,0,0,pe.width,pe.height,Gt,Wt,pe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ht+1,Jt,pe.width,pe.height,0,Gt,Wt,pe.data)}}else{G?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,Gt,Wt,wt[mt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,Jt,Gt,Wt,wt[mt]);for(let Ht=0;Ht<It.length;Ht++){let zt=It[Ht];G?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ht+1,0,0,Gt,Wt,zt.image[mt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ht+1,Jt,Gt,Wt,zt.image[mt])}}}p(g)&&w(i.TEXTURE_CUBE_MAP),_t.__version=lt.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function q(E,g,W,K,lt,_t){let xt=r.convert(W.format,W.colorSpace),at=r.convert(W.type),dt=x(W.internalFormat,xt,at,W.normalized,W.colorSpace),St=n.get(g),Vt=n.get(W);if(Vt.__renderTarget=g,!St.__hasExternalTextures){let wt=Math.max(1,g.width>>_t),bt=Math.max(1,g.height>>_t);lt===i.TEXTURE_3D||lt===i.TEXTURE_2D_ARRAY?e.texImage3D(lt,_t,dt,wt,bt,g.depth,0,xt,at,null):e.texImage2D(lt,_t,dt,wt,bt,0,xt,at,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),qt(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,lt,Vt.__webglTexture,0,Ut(g)):(lt===i.TEXTURE_2D||lt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,lt,Vt.__webglTexture,_t),e.bindFramebuffer(i.FRAMEBUFFER,null)}function tt(E,g,W){if(i.bindRenderbuffer(i.RENDERBUFFER,E),g.depthBuffer){let K=g.depthTexture,lt=K&&K.isDepthTexture?K.type:null,_t=S(g.stencilBuffer,lt),xt=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;qt(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ut(g),_t,g.width,g.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut(g),_t,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,_t,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xt,i.RENDERBUFFER,E)}else{let K=g.textures;for(let lt=0;lt<K.length;lt++){let _t=K[lt],xt=r.convert(_t.format,_t.colorSpace),at=r.convert(_t.type),dt=x(_t.internalFormat,xt,at,_t.normalized,_t.colorSpace);qt(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ut(g),dt,g.width,g.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut(g),dt,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,dt,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function J(E,g,W){let K=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let lt=n.get(g.depthTexture);if(lt.__renderTarget=g,(!lt.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),K){if(lt.__webglInit===void 0&&(lt.__webglInit=!0,g.depthTexture.addEventListener("dispose",P)),lt.__webglTexture===void 0){lt.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,lt.__webglTexture),U(i.TEXTURE_CUBE_MAP,g.depthTexture);let St=r.convert(g.depthTexture.format),Vt=r.convert(g.depthTexture.type),wt;g.depthTexture.format===An?wt=i.DEPTH_COMPONENT24:g.depthTexture.format===fi&&(wt=i.DEPTH24_STENCIL8);for(let bt=0;bt<6;bt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,wt,g.width,g.height,0,St,Vt,null)}}else pt(g.depthTexture,0);let _t=lt.__webglTexture,xt=Ut(g),at=K?i.TEXTURE_CUBE_MAP_POSITIVE_X+W:i.TEXTURE_2D,dt=g.depthTexture.format===fi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===An)qt(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,dt,at,_t,0,xt):i.framebufferTexture2D(i.FRAMEBUFFER,dt,at,_t,0);else if(g.depthTexture.format===fi)qt(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,dt,at,_t,0,xt):i.framebufferTexture2D(i.FRAMEBUFFER,dt,at,_t,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function O(E){let g=n.get(E),W=E.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==E.depthTexture){let K=E.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),K){let lt=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,K.removeEventListener("dispose",lt)};K.addEventListener("dispose",lt),g.__depthDisposeCallback=lt}g.__boundDepthTexture=K}if(E.depthTexture&&!g.__autoAllocateDepthBuffer)if(W)for(let K=0;K<6;K++)J(g.__webglFramebuffer[K],E,K);else{let K=E.texture.mipmaps;K&&K.length>0?J(g.__webglFramebuffer[0],E,0):J(g.__webglFramebuffer,E,0)}else if(W){g.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[K]),g.__webglDepthbuffer[K]===void 0)g.__webglDepthbuffer[K]=i.createRenderbuffer(),tt(g.__webglDepthbuffer[K],E,!1);else{let lt=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_t=g.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,_t),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,_t)}}else{let K=E.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),tt(g.__webglDepthbuffer,E,!1);else{let lt=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_t=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,_t),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,_t)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function F(E,g,W){let K=n.get(E);g!==void 0&&q(K.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&O(E)}function et(E){let g=E.texture,W=n.get(E),K=n.get(g);E.addEventListener("dispose",v);let lt=E.textures,_t=E.isWebGLCubeRenderTarget===!0,xt=lt.length>1;if(xt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=g.version,a.memory.textures++),_t){W.__webglFramebuffer=[];for(let at=0;at<6;at++)if(g.mipmaps&&g.mipmaps.length>0){W.__webglFramebuffer[at]=[];for(let dt=0;dt<g.mipmaps.length;dt++)W.__webglFramebuffer[at][dt]=i.createFramebuffer()}else W.__webglFramebuffer[at]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){W.__webglFramebuffer=[];for(let at=0;at<g.mipmaps.length;at++)W.__webglFramebuffer[at]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(xt)for(let at=0,dt=lt.length;at<dt;at++){let St=n.get(lt[at]);St.__webglTexture===void 0&&(St.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&qt(E)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let at=0;at<lt.length;at++){let dt=lt[at];W.__webglColorRenderbuffer[at]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[at]);let St=r.convert(dt.format,dt.colorSpace),Vt=r.convert(dt.type),wt=x(dt.internalFormat,St,Vt,dt.normalized,dt.colorSpace,E.isXRRenderTarget===!0),bt=Ut(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,wt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,W.__webglColorRenderbuffer[at])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),tt(W.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(_t){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),U(i.TEXTURE_CUBE_MAP,g);for(let at=0;at<6;at++)if(g.mipmaps&&g.mipmaps.length>0)for(let dt=0;dt<g.mipmaps.length;dt++)q(W.__webglFramebuffer[at][dt],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,dt);else q(W.__webglFramebuffer[at],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);p(g)&&w(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let at=0,dt=lt.length;at<dt;at++){let St=lt[at],Vt=n.get(St),wt=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(wt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(wt,Vt.__webglTexture),U(wt,St),q(W.__webglFramebuffer,E,St,i.COLOR_ATTACHMENT0+at,wt,0),p(St)&&w(wt)}e.unbindTexture()}else{let at=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(at=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(at,K.__webglTexture),U(at,g),g.mipmaps&&g.mipmaps.length>0)for(let dt=0;dt<g.mipmaps.length;dt++)q(W.__webglFramebuffer[dt],E,g,i.COLOR_ATTACHMENT0,at,dt);else q(W.__webglFramebuffer,E,g,i.COLOR_ATTACHMENT0,at,0);p(g)&&w(at),e.unbindTexture()}E.depthBuffer&&O(E)}function it(E){let g=E.textures;for(let W=0,K=g.length;W<K;W++){let lt=g[W];if(p(lt)){let _t=R(E),xt=n.get(lt).__webglTexture;e.bindTexture(_t,xt),w(_t),e.unbindTexture()}}}let H=[],gt=[];function Lt(E){if(E.samples>0){if(qt(E)===!1){let g=E.textures,W=E.width,K=E.height,lt=i.COLOR_BUFFER_BIT,_t=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=n.get(E),at=g.length>1;if(at)for(let St=0;St<g.length;St++)e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer);let dt=E.texture.mipmaps;dt&&dt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let St=0;St<g.length;St++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(lt|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(lt|=i.STENCIL_BUFFER_BIT)),at){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xt.__webglColorRenderbuffer[St]);let Vt=n.get(g[St]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Vt,0)}i.blitFramebuffer(0,0,W,K,0,0,W,K,lt,i.NEAREST),c===!0&&(H.length=0,gt.length=0,H.push(i.COLOR_ATTACHMENT0+St),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&(H.push(_t),gt.push(_t),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,gt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,H))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),at)for(let St=0;St<g.length;St++){e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,xt.__webglColorRenderbuffer[St]);let Vt=n.get(g[St]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,Vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&c){let g=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function Ut(E){return Math.min(s.maxSamples,E.samples)}function qt(E){let g=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function L(E){let g=a.render.frame;h.get(E)!==g&&(h.set(E,g),E.update())}function Qt(E,g){let W=E.colorSpace,K=E.format,lt=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||W!==ks&&W!==Xn&&(ie.getTransfer(W)===ce?(K!==hn||lt!==Ke)&&Xt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Yt("WebGLTextures: Unsupported texture color space:",W)),g}function vt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=ot,this.resetTextureUnits=Z,this.getTextureUnits=B,this.setTextureUnits=$,this.setTexture2D=pt,this.setTexture2DArray=rt,this.setTexture3D=ct,this.setTextureCube=ht,this.rebindTextures=F,this.setupRenderTarget=et,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=O,this.setupFrameBufferTexture=q,this.useMultisampledRTT=qt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function M_(i,t){function e(n,s=Xn){let r,a=ie.getTransfer(s);if(n===Ke)return i.UNSIGNED_BYTE;if(n===Za)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$a)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$l)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Jl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Yl)return i.BYTE;if(n===Zl)return i.SHORT;if(n===vs)return i.UNSIGNED_SHORT;if(n===Ya)return i.INT;if(n===yn)return i.UNSIGNED_INT;if(n===cn)return i.FLOAT;if(n===Mn)return i.HALF_FLOAT;if(n===Kl)return i.ALPHA;if(n===jl)return i.RGB;if(n===hn)return i.RGBA;if(n===An)return i.DEPTH_COMPONENT;if(n===fi)return i.DEPTH_STENCIL;if(n===Ja)return i.RED;if(n===Ka)return i.RED_INTEGER;if(n===pi)return i.RG;if(n===ja)return i.RG_INTEGER;if(n===Qa)return i.RGBA_INTEGER;if(n===vr||n===yr||n===Mr||n===Sr)if(a===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===to||n===eo||n===no||n===io)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===to)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===eo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===no)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===io)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===so||n===ro||n===ao||n===oo||n===lo||n===br||n===co)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===so||n===ro)return a===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ao)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===oo)return r.COMPRESSED_R11_EAC;if(n===lo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===br)return r.COMPRESSED_RG11_EAC;if(n===co)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===_o||n===xo||n===vo||n===yo||n===Mo||n===So||n===bo||n===Eo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ho)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===po)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===go)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_o)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===So)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===bo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Eo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===To||n===wo||n===Ao)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===To)return a===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ao)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ro||n===Co||n===Er||n===Io)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ro)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Co)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Er)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Io)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ys?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var S_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,b_=`
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

}`,vc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Qs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ve({vertexShader:S_,fragmentShader:b_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ae(new Nn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yc=class extends Rn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,d=null,_=null,M=typeof XRWebGLBinding<"u",m=new vc,p={},w=e.getContextAttributes(),R=null,x=null,S=[],b=[],P=new Mt,v=null,A=null,D=new Ue;D.viewport=new xe;let z=new Ue;z.viewport=new xe;let X=[D,z],Z=new Ga,B=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(T){let C=S[T];return C===void 0&&(C=new os,S[T]=C),C.getTargetRaySpace()},this.getControllerGrip=function(T){let C=S[T];return C===void 0&&(C=new os,S[T]=C),C.getGripSpace()},this.getHand=function(T){let C=S[T];return C===void 0&&(C=new os,S[T]=C),C.getHandSpace()};function ot(T){let C=b.indexOf(T.inputSource);if(C===-1)return;let I=S[C];I!==void 0&&(I.update(T.inputSource,T.frame,l||a),I.dispatchEvent({type:T.type,data:T.inputSource}))}function st(){s.removeEventListener("select",ot),s.removeEventListener("selectstart",ot),s.removeEventListener("selectend",ot),s.removeEventListener("squeeze",ot),s.removeEventListener("squeezestart",ot),s.removeEventListener("squeezeend",ot),s.removeEventListener("end",st),s.removeEventListener("inputsourceschange",pt);for(let T=0;T<S.length;T++){let C=b[T];C!==null&&(b[T]=null,S[T].disconnect(C))}B=null,$=null,m.reset();for(let T in p)delete p[T];if(t.setRenderTarget(R),d=null,u=null,f=null,s=null,x=null,V.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(P.width,P.height,!1),A!==null){let T=A.camera;T.fov=A.fov,T.zoom=A.zoom,T.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(T){r=T,n.isPresenting===!0&&Xt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(T){o=T,n.isPresenting===!0&&Xt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(T){l=T},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(T){if(s=T,s!==null){if(R=t.getRenderTarget(),s.addEventListener("select",ot),s.addEventListener("selectstart",ot),s.addEventListener("selectend",ot),s.addEventListener("squeeze",ot),s.addEventListener("squeezestart",ot),s.addEventListener("squeezeend",ot),s.addEventListener("end",st),s.addEventListener("inputsourceschange",pt),w.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(P),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let I=null,Y=null,q=null;w.depth&&(q=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,I=w.stencil?fi:An,Y=w.stencil?ys:yn);let tt={colorFormat:e.RGBA8,depthFormat:q,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(tt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new Ze(u.textureWidth,u.textureHeight,{format:hn,type:Ke,depthTexture:new si(u.textureWidth,u.textureHeight,Y,void 0,void 0,void 0,void 0,void 0,void 0,I),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let I={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,I),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Ze(d.framebufferWidth,d.framebufferHeight,{format:hn,type:Ke,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),V.setContext(s),V.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function pt(T){for(let C=0;C<T.removed.length;C++){let I=T.removed[C],Y=b.indexOf(I);Y>=0&&(b[Y]=null,S[Y].disconnect(I))}for(let C=0;C<T.added.length;C++){let I=T.added[C],Y=b.indexOf(I);if(Y===-1){for(let tt=0;tt<S.length;tt++)if(tt>=b.length){b.push(I),Y=tt;break}else if(b[tt]===null){b[tt]=I,Y=tt;break}if(Y===-1)break}let q=S[Y];q&&q.connect(I)}}let rt=new N,ct=new N;function ht(T,C,I){rt.setFromMatrixPosition(C.matrixWorld),ct.setFromMatrixPosition(I.matrixWorld);let Y=rt.distanceTo(ct),q=C.projectionMatrix.elements,tt=I.projectionMatrix.elements,J=q[14]/(q[10]-1),O=q[14]/(q[10]+1),F=(q[9]+1)/q[5],et=(q[9]-1)/q[5],it=(q[8]-1)/q[0],H=(tt[8]+1)/tt[0],gt=J*it,Lt=J*H,Ut=Y/(-it+H),qt=Ut*-it;if(C.matrixWorld.decompose(T.position,T.quaternion,T.scale),T.translateX(qt),T.translateZ(Ut),T.matrixWorld.compose(T.position,T.quaternion,T.scale),T.matrixWorldInverse.copy(T.matrixWorld).invert(),q[10]===-1)T.projectionMatrix.copy(C.projectionMatrix),T.projectionMatrixInverse.copy(C.projectionMatrixInverse);else{let L=J+Ut,Qt=O+Ut,vt=gt-qt,E=Lt+(Y-qt),g=F*O/Qt*L,W=et*O/Qt*L;T.projectionMatrix.makePerspective(vt,E,g,W,L,Qt),T.projectionMatrixInverse.copy(T.projectionMatrix).invert()}}function Ft(T,C){C===null?T.matrixWorld.copy(T.matrix):T.matrixWorld.multiplyMatrices(C.matrixWorld,T.matrix),T.matrixWorldInverse.copy(T.matrixWorld).invert()}this.updateCamera=function(T){if(s===null)return;let C=T.near,I=T.far;m.texture!==null&&(m.depthNear>0&&(C=m.depthNear),m.depthFar>0&&(I=m.depthFar)),Z.near=z.near=D.near=C,Z.far=z.far=D.far=I,(B!==Z.near||$!==Z.far)&&(s.updateRenderState({depthNear:Z.near,depthFar:Z.far}),B=Z.near,$=Z.far),Z.layers.mask=T.layers.mask|6,D.layers.mask=Z.layers.mask&-5,z.layers.mask=Z.layers.mask&-3;let Y=T.parent,q=Z.cameras;Ft(Z,Y);for(let tt=0;tt<q.length;tt++)Ft(q[tt],Y);q.length===2?ht(Z,D,z):Z.projectionMatrix.copy(D.projectionMatrix),A===null&&T.isPerspectiveCamera&&(A={camera:T,fov:T.fov,zoom:T.zoom}),Pt(T,Z,Y)};function Pt(T,C,I){I===null?T.matrix.copy(C.matrixWorld):(T.matrix.copy(I.matrixWorld),T.matrix.invert(),T.matrix.multiply(C.matrixWorld)),T.matrix.decompose(T.position,T.quaternion,T.scale),T.updateMatrixWorld(!0),T.projectionMatrix.copy(C.projectionMatrix),T.projectionMatrixInverse.copy(C.projectionMatrixInverse),T.isPerspectiveCamera&&(T.fov=_a*2*Math.atan(1/T.projectionMatrix.elements[5]),T.zoom=1)}this.getCamera=function(){return Z},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function(T){c=T,u!==null&&(u.fixedFoveation=T),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=T)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(Z)},this.getCameraTexture=function(T){return p[T]};let ne=null;function U(T,C){if(h=C.getViewerPose(l||a),_=C,h!==null){let I=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let Y=!1;I.length!==Z.cameras.length&&(Z.cameras.length=0,Y=!0);for(let O=0;O<I.length;O++){let F=I[O],et=null;if(d!==null)et=d.getViewport(F);else{let H=f.getViewSubImage(u,F);et=H.viewport,O===0&&(t.setRenderTargetTextures(x,H.colorTexture,H.depthStencilTexture),t.setRenderTarget(x))}let it=X[O];it===void 0&&(it=new Ue,it.layers.enable(O),it.viewport=new xe,X[O]=it),it.matrix.fromArray(F.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(F.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(et.x,et.y,et.width,et.height),O===0&&(Z.matrix.copy(it.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),Y===!0&&Z.cameras.push(it)}let q=s.enabledFeatures;if(q&&q.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){f=n.getBinding();let O=f.getDepthInformation(I[0]);O&&O.isValid&&O.texture&&m.init(O,s.renderState)}if(q&&q.includes("camera-access")&&M){t.state.unbindTexture(),f=n.getBinding();for(let O=0;O<I.length;O++){let F=I[O].camera;if(F){let et=p[F];et||(et=new Qs,p[F]=et);let it=f.getCameraImage(F);et.sourceTexture=it}}}}for(let I=0;I<S.length;I++){let Y=b[I],q=S[I];Y!==null&&q!==void 0&&q.update(Y,C,l||a)}ne&&ne(T,C),C.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:C}),_=null}let V=new Uu;V.setAnimationLoop(U),this.setAnimationLoop=function(T){ne=T},this.dispose=function(){}}},E_=new de,Vu=new Zt;Vu.set(-1,0,0,0,1,0,0,0,1);function T_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,nc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,w,R,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),M(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,w,R):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Re&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Re&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let w=t.get(p),R=w.envMap,x=w.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(E_.makeRotationFromEuler(x)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Vu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,w,R){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=R*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Re&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){let w=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function w_(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,S){let b=S.program;n.uniformBlockBinding(x,b)}function l(x,S){let b=s[x.id];b===void 0&&(m(x),b=h(x),s[x.id]=b,x.addEventListener("dispose",w));let P=S.program;n.updateUBOMapping(x,P);let v=t.render.frame;r[x.id]!==v&&(u(x),r[x.id]=v)}function h(x){let S=f();x.__bindingPointIndex=S;let b=i.createBuffer(),P=x.__size,v=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,P,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,b),b}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Yt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let S=s[x.id],b=x.uniforms,P=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let v=0,A=b.length;v<A;v++){let D=b[v];if(Array.isArray(D))for(let z=0,X=D.length;z<X;z++)d(D[z],v,z,P);else d(D,v,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,S,b,P){if(M(x,S,b,P)===!0){let v=x.__offset,A=x.value;if(Array.isArray(A)){let D=0;for(let z=0;z<A.length;z++){let X=A[z],Z=p(X);_(X,x.__data,D),typeof X!="number"&&typeof X!="boolean"&&!X.isMatrix3&&!ArrayBuffer.isView(X)&&(D+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(A,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,x.__data)}}function _(x,S,b){typeof x=="number"||typeof x=="boolean"?S[0]=x:x.isMatrix3?(S[0]=x.elements[0],S[1]=x.elements[1],S[2]=x.elements[2],S[3]=0,S[4]=x.elements[3],S[5]=x.elements[4],S[6]=x.elements[5],S[7]=0,S[8]=x.elements[6],S[9]=x.elements[7],S[10]=x.elements[8],S[11]=0):ArrayBuffer.isView(x)?S.set(new x.constructor(x.buffer,x.byteOffset,S.length)):x.toArray(S,b)}function M(x,S,b,P){let v=x.value,A=S+"_"+b;if(P[A]===void 0)return typeof v=="number"||typeof v=="boolean"?P[A]=v:ArrayBuffer.isView(v)?P[A]=v.slice():P[A]=v.clone(),!0;{let D=P[A];if(typeof v=="number"||typeof v=="boolean"){if(D!==v)return P[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(D.equals(v)===!1)return D.copy(v),!0}}return!1}function m(x){let S=x.uniforms,b=0,P=16;for(let A=0,D=S.length;A<D;A++){let z=Array.isArray(S[A])?S[A]:[S[A]];for(let X=0,Z=z.length;X<Z;X++){let B=z[X],$=Array.isArray(B.value)?B.value:[B.value];for(let ot=0,st=$.length;ot<st;ot++){let pt=$[ot],rt=p(pt),ct=b%P,ht=ct%rt.boundary,Ft=ct+ht;b+=ht,Ft!==0&&P-Ft<rt.storage&&(b+=P-Ft),B.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=b,b+=rt.storage}}}let v=b%P;return v>0&&(b+=P-v),x.__size=b,x.__cache={},this}function p(x){let S={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(S.boundary=4,S.storage=4):x.isVector2?(S.boundary=8,S.storage=8):x.isVector3||x.isColor?(S.boundary=16,S.storage=12):x.isVector4?(S.boundary=16,S.storage=16):x.isMatrix3?(S.boundary=48,S.storage=48):x.isMatrix4?(S.boundary=64,S.storage=64):x.isTexture?Xt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(S.boundary=16,S.storage=x.byteLength):Xt("WebGLRenderer: Unsupported uniform value type.",x),S}function w(x){let S=x.target;S.removeEventListener("dispose",w);let b=a.indexOf(S.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function R(){for(let x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:c,update:l,dispose:R}}var A_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Fn=null;function R_(){return Fn===null&&(Fn=new $s(A_,16,16,pi,Mn),Fn.name="DFG_LUT",Fn.minFilter=Oe,Fn.magFilter=Oe,Fn.wrapS=wn,Fn.wrapT=wn,Fn.generateMipmaps=!1,Fn.needsUpdate=!0),Fn}var Fo=class{constructor(t={}){let{canvas:e=nu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Ke}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;let M=d,m=new Set([Qa,ja,Ka]),p=new Set([Ke,yn,vs,ys,Za,$a]),w=new Uint32Array(4),R=new Int32Array(4),x=new N,S=null,b=null,P=[],v=[],A=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,z=!1,X=null,Z=null,B=null,$=null;this._outputColorSpace=Le;let ot=0,st=0,pt=null,rt=-1,ct=null,ht=new xe,Ft=new xe,Pt=null,ne=new $t(0),U=0,V=e.width,T=e.height,C=1,I=null,Y=null,q=new xe(0,0,V,T),tt=new xe(0,0,V,T),J=!1,O=new cs,F=!1,et=!1,it=new de,H=new N,gt=new xe,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ut=!1;function qt(){return pt===null?C:1}let L=n;function Qt(y,k){return e.getContext(y,k)}let vt,E,g,W,K,lt,_t,xt,at,dt,St,Vt,wt,bt,Gt,Wt,Jt,G,Et,ut,Tt,It,mt;try{let y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",pe,!1),e.addEventListener("webglcontextrestored",oe,!1),e.addEventListener("webglcontextcreationerror",fn,!1),L===null){let k="webgl2";if(L=Qt(k,y),L===null)throw Qt(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ht()}catch(y){throw e.removeEventListener("webglcontextlost",pe,!1),e.removeEventListener("webglcontextrestored",oe,!1),e.removeEventListener("webglcontextcreationerror",fn,!1),Yt("WebGLRenderer: "+y.message),y}function Ht(){vt=new Ug(L),vt.init(),Tt=new M_(L,vt),E=new Tg(L,vt,t,Tt),g=new v_(L,vt),E.reversedDepthBuffer&&u&&g.buffers.depth.setReversed(!0),Z=L.createFramebuffer(),B=L.createFramebuffer(),$=L.createFramebuffer(),W=new Bg(L),K=new r_,lt=new y_(L,vt,g,K,E,Tt,W),_t=new Ng(D),xt=new kf(L),It=new bg(L,xt),at=new Fg(L,xt,W,It),dt=new kg(L,at,xt,It,W),G=new zg(L,E,lt),Gt=new wg(K),St=new s_(D,_t,vt,E,It,Gt),Vt=new T_(D,K),wt=new o_,bt=new f_(vt),Jt=new Sg(D,_t,g,dt,_,c),Wt=new x_(D,dt,E),mt=new w_(L,W,E,g),Et=new Eg(L,vt,W),ut=new Og(L,vt,W),W.programs=St.programs,D.capabilities=E,D.extensions=vt,D.properties=K,D.renderLists=wt,D.shadowMap=Wt,D.state=g,D.info=W}M!==Ke&&(A=new Gg(M,e.width,e.height,o,s,r));let zt=new yc(D,L);this.xr=zt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let y=vt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=vt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return C},this.setPixelRatio=function(y){y!==void 0&&(C=y,this.setSize(V,T,!1))},this.getSize=function(y){return y.set(V,T)},this.setSize=function(y,k,nt=!0){if(zt.isPresenting){Xt("WebGLRenderer: Can't change size while VR device is presenting.");return}V=y,T=k,e.width=Math.floor(y*C),e.height=Math.floor(k*C),nt===!0&&(e.style.width=y+"px",e.style.height=k+"px"),A!==null&&A.setSize(e.width,e.height),this.setViewport(0,0,y,k)},this.getDrawingBufferSize=function(y){return y.set(V*C,T*C).floor()},this.setDrawingBufferSize=function(y,k,nt){V=y,T=k,C=nt,e.width=Math.floor(y*nt),e.height=Math.floor(k*nt),this.setViewport(0,0,y,k)},this.setEffects=function(y){if(M===Ke){Yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let k=0;k<y.length;k++)if(y[k].isOutputPass===!0){Xt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(ht)},this.getViewport=function(y){return y.copy(q)},this.setViewport=function(y,k,nt,j){y.isVector4?q.set(y.x,y.y,y.z,y.w):q.set(y,k,nt,j),g.viewport(ht.copy(q).multiplyScalar(C).round())},this.getScissor=function(y){return y.copy(tt)},this.setScissor=function(y,k,nt,j){y.isVector4?tt.set(y.x,y.y,y.z,y.w):tt.set(y,k,nt,j),g.scissor(Ft.copy(tt).multiplyScalar(C).round())},this.getScissorTest=function(){return J},this.setScissorTest=function(y){g.setScissorTest(J=y)},this.setOpaqueSort=function(y){I=y},this.setTransparentSort=function(y){Y=y},this.getClearColor=function(y){return y.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor(...arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha(...arguments)},this.clear=function(y=!0,k=!0,nt=!0){let j=0;if(y){let Q=!1;if(pt!==null){let Ct=pt.texture.format;Q=m.has(Ct)}if(Q){let Ct=pt.texture.type,Nt=p.has(Ct),Rt=Jt.getClearColor(),Ot=Jt.getClearAlpha(),kt=Rt.r,Kt=Rt.g,te=Rt.b;Nt?(w[0]=kt,w[1]=Kt,w[2]=te,w[3]=Ot,L.clearBufferuiv(L.COLOR,0,w)):(R[0]=kt,R[1]=Kt,R[2]=te,R[3]=Ot,L.clearBufferiv(L.COLOR,0,R))}else j|=L.COLOR_BUFFER_BIT}k&&(j|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),nt&&(j|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j!==0&&L.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),X=y},this.dispose=function(){e.removeEventListener("webglcontextlost",pe,!1),e.removeEventListener("webglcontextrestored",oe,!1),e.removeEventListener("webglcontextcreationerror",fn,!1),Jt.dispose(),wt.dispose(),bt.dispose(),K.dispose(),_t.dispose(),dt.dispose(),It.dispose(),mt.dispose(),St.dispose(),zt.dispose(),zt.removeEventListener("sessionstart",Fc),zt.removeEventListener("sessionend",Oc),vi.stop()};function pe(y){y.preventDefault(),tc("WebGLRenderer: Context Lost."),z=!0}function oe(){tc("WebGLRenderer: Context Restored."),z=!1;let y=W.autoReset,k=Wt.enabled,nt=Wt.autoUpdate,j=Wt.needsUpdate,Q=Wt.type;Ht(),W.autoReset=y,Wt.enabled=k,Wt.autoUpdate=nt,Wt.needsUpdate=j,Wt.type=Q}function fn(y){Yt("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function bn(y){let k=y.target;k.removeEventListener("dispose",bn),xd(k)}function xd(y){vd(y),K.remove(y)}function vd(y){let k=K.get(y).programs;k!==void 0&&(k.forEach(function(nt){St.releaseProgram(nt)}),y.isShaderMaterial&&St.releaseShaderCache(y))}this.renderBufferDirect=function(y,k,nt,j,Q,Ct){k===null&&(k=Lt);let Nt=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,Rt=Sd(y,k,nt,j,Q);g.setMaterial(j,Nt);let Ot=nt.index,kt=1;if(j.wireframe===!0){if(Ot=at.getWireframeAttribute(nt),Ot===void 0)return;kt=2}let Kt=nt.drawRange,te=nt.attributes.position,Bt=Kt.start*kt,le=(Kt.start+Kt.count)*kt;Ct!==null&&(Bt=Math.max(Bt,Ct.start*kt),le=Math.min(le,(Ct.start+Ct.count)*kt)),Ot!==null?(Bt=Math.max(Bt,0),le=Math.min(le,Ot.count)):te!=null&&(Bt=Math.max(Bt,0),le=Math.min(le,te.count));let Te=le-Bt;if(Te<0||Te===1/0)return;It.setup(Q,j,Rt,nt,Ot);let ge,fe=Et;if(Ot!==null&&(ge=xt.get(Ot),fe=ut,fe.setIndex(ge)),Q.isMesh)j.wireframe===!0?(g.setLineWidth(j.wireframeLinewidth*qt()),fe.setMode(L.LINES)):fe.setMode(L.TRIANGLES);else if(Q.isLine){let Be=j.linewidth;Be===void 0&&(Be=1),g.setLineWidth(Be*qt()),Q.isLineSegments?fe.setMode(L.LINES):Q.isLineLoop?fe.setMode(L.LINE_LOOP):fe.setMode(L.LINE_STRIP)}else Q.isPoints?fe.setMode(L.POINTS):Q.isSprite&&fe.setMode(L.TRIANGLES);if(Q.isBatchedMesh)if(vt.get("WEBGL_multi_draw"))fe.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{let Be=Q._multiDrawStarts,Dt=Q._multiDrawCounts,He=Q._multiDrawCount,se=Ot?xt.get(Ot).bytesPerElement:1,an=K.get(j).currentProgram.getUniforms();for(let En=0;En<He;En++)an.setValue(L,"_gl_DrawID",En),fe.render(Be[En]/se,Dt[En])}else if(Q.isInstancedMesh)fe.renderInstances(Bt,Te,Q.count);else if(nt.isInstancedBufferGeometry){let Be=nt._maxInstanceCount!==void 0?nt._maxInstanceCount:1/0,Dt=Math.min(nt.instanceCount,Be);fe.renderInstances(Bt,Te,Dt)}else fe.render(Bt,Te)};function Uc(y,k,nt,j){X!==null&&y.isNodeMaterial&&X.setObject(j,y),F===!0&&Gt.setState(y,nt,!1),y.transparent===!0&&y.side===Je&&y.forceSinglePass===!1?(y.side=Re,y.needsUpdate=!0,Ur(y,k,j),y.side=hi,y.needsUpdate=!0,Ur(y,k,j),y.side=Je):Ur(y,k,j)}this.compile=function(y,k,nt=null){nt===null&&(nt=y),X!==null&&X.renderStart(y,k,nt),b=bt.get(nt),b.init(k),v.push(b),nt.traverseVisible(function(Q){Q.isLight&&Q.layers.test(k.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),y!==nt&&y.traverseVisible(function(Q){Q.isLight&&Q.layers.test(k.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),b.setupLights(),X!==null&&X.updateLights(b.state.lightsArray),et=this.localClippingEnabled,F=Gt.init(this.clippingPlanes,et),F===!0&&Gt.setGlobalState(this.clippingPlanes,k),X!==null&&Wt.render(b.state.shadowsArray,nt,k);let j=new Set;return y.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;let Ct=Q.material;if(Ct)if(Array.isArray(Ct))for(let Nt=0;Nt<Ct.length;Nt++){let Rt=Ct[Nt];Uc(Rt,nt,k,Q),j.add(Rt)}else Uc(Ct,nt,k,Q),j.add(Ct)}),b=v.pop(),X!==null&&X.renderEnd(),j},this.compileAsync=function(y,k,nt=null){let j=this.compile(y,k,nt);return new Promise(Q=>{function Ct(){if(j.forEach(function(Nt){let Ot=K.get(Nt).currentProgram;(Ot===void 0||Ot.isReady())&&j.delete(Nt)}),j.size===0){Q(y);return}setTimeout(Ct,10)}vt.get("KHR_parallel_shader_compile")!==null?Ct():setTimeout(Ct,10)})};let Zo=null;function yd(y){Zo&&Zo(y)}function Fc(){vi.stop()}function Oc(){vi.start()}let vi=new Uu;vi.setAnimationLoop(yd),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(y){Zo=y,zt.setAnimationLoop(y),y===null?vi.stop():vi.start()},zt.addEventListener("sessionstart",Fc),zt.addEventListener("sessionend",Oc),this.render=function(y,k){if(k!==void 0&&k.isCamera!==!0){Yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;X!==null&&X.renderStart(y,k);let nt=zt.enabled===!0&&zt.isPresenting===!0,j=A!==null&&(pt===null||nt)&&A.begin(D,pt);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),zt.enabled===!0&&zt.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(zt.cameraAutoUpdate===!0&&zt.updateCamera(k),k=zt.getCamera()),y.isScene===!0&&y.onBeforeRender(D,y,k,pt),b=bt.get(y,v.length),b.init(k),b.state.textureUnits=lt.getTextureUnits(),v.push(b),it.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),O.setFromProjectionMatrix(it,xn,k.reversedDepth),et=this.localClippingEnabled,F=Gt.init(this.clippingPlanes,et),S=wt.get(y,P.length),S.init(),P.push(S),zt.enabled===!0&&zt.isPresenting===!0){let Nt=D.xr.getDepthSensingMesh();Nt!==null&&$o(Nt,k,-1/0,D.sortObjects)}$o(y,k,0,D.sortObjects),S.finish(),X!==null&&X.updateLights(b.state.lightsArray),D.sortObjects===!0&&S.sort(I,Y),Ut=zt.enabled===!1||zt.isPresenting===!1||zt.hasDepthSensing()===!1,Ut&&Jt.addToRenderList(S,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),F===!0&&Gt.beginShadows();let Q=b.state.shadowsArray;if(Wt.render(Q,y,k),F===!0&&Gt.endShadows(),(j&&A.hasRenderPass())===!1){let Nt=S.opaque,Rt=S.transmissive;if(b.setupLights(),k.isArrayCamera){let Ot=k.cameras;if(Rt.length>0)for(let kt=0,Kt=Ot.length;kt<Kt;kt++){let te=Ot[kt];zc(Nt,Rt,y,te)}Ut&&Jt.render(y);for(let kt=0,Kt=Ot.length;kt<Kt;kt++){let te=Ot[kt];Bc(S,y,te,te.viewport)}}else Rt.length>0&&zc(Nt,Rt,y,k),Ut&&Jt.render(y),Bc(S,y,k)}pt!==null&&st===0&&(lt.updateMultisampleRenderTarget(pt),lt.updateRenderTargetMipmap(pt)),j&&A.end(D),y.isScene===!0&&y.onAfterRender(D,y,k),It.resetDefaultState(),rt=-1,ct=null,v.pop(),v.length>0?(b=v[v.length-1],lt.setTextureUnits(b.state.textureUnits),F===!0&&Gt.setGlobalState(D.clippingPlanes,b.state.camera)):b=null,P.pop(),P.length>0?S=P[P.length-1]:S=null,X!==null&&X.renderEnd()};function $o(y,k,nt,j){if(y.visible===!1)return;if(y.layers.test(k.layers)){if(y.isGroup)nt=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(k);else if(y.isLightProbeGrid)b.pushLightProbeGrid(y);else if(y.isLight)b.pushLight(y),y.castShadow&&b.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(O)){j&&gt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(it);let Nt=dt.update(y),Rt=y.material;Rt.visible&&S.push(y,Nt,Rt,nt,gt.z,null,k)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(O))){let Nt=dt.update(y),Rt=y.material;if(j&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),gt.copy(y.boundingSphere.center)):(Nt.boundingSphere===null&&Nt.computeBoundingSphere(),gt.copy(Nt.boundingSphere.center)),gt.applyMatrix4(y.matrixWorld).applyMatrix4(it)),Array.isArray(Rt)){let Ot=Nt.groups;for(let kt=0,Kt=Ot.length;kt<Kt;kt++){let te=Ot[kt],Bt=Rt[te.materialIndex];Bt&&Bt.visible&&S.push(y,Nt,Bt,nt,gt.z,te,k)}}else Rt.visible&&S.push(y,Nt,Rt,nt,gt.z,null,k)}}let Ct=y.children;for(let Nt=0,Rt=Ct.length;Nt<Rt;Nt++)$o(Ct[Nt],k,nt,j)}function Bc(y,k,nt,j){let{opaque:Q,transmissive:Ct,transparent:Nt}=y;b.setupLightsView(nt),F===!0&&Gt.setGlobalState(D.clippingPlanes,nt),j&&g.viewport(ht.copy(j)),Q.length>0&&Nr(Q,k,nt),Ct.length>0&&Nr(Ct,k,nt),Nt.length>0&&Nr(Nt,k,nt),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function zc(y,k,nt,j){if((nt.isScene===!0?nt.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[j.id]===void 0){let Bt=vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[j.id]=new Ze(1,1,{generateMipmaps:!0,type:Bt?Mn:Ke,minFilter:di,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ie.workingColorSpace})}let Ct=b.state.transmissionRenderTarget[j.id],Nt=j.viewport||ht;Ct.setSize(Nt.z*D.transmissionResolutionScale,Nt.w*D.transmissionResolutionScale);let Rt=D.getRenderTarget(),Ot=D.getActiveCubeFace(),kt=D.getActiveMipmapLevel();D.setRenderTarget(Ct),D.getClearColor(ne),U=D.getClearAlpha(),U<1&&D.setClearColor(16777215,.5),D.clear(),Ut&&Jt.render(nt);let Kt=D.toneMapping;D.toneMapping=vn;let te=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),b.setupLightsView(j),F===!0&&Gt.setGlobalState(D.clippingPlanes,j),Nr(y,nt,j),lt.updateMultisampleRenderTarget(Ct),lt.updateRenderTargetMipmap(Ct),vt.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let le=0,Te=k.length;le<Te;le++){let ge=k[le],{object:fe,geometry:Be,material:Dt,group:He}=ge;if(Dt.side===Je&&fe.layers.test(j.layers)){let se=Dt.side;Dt.side=Re,Dt.needsUpdate=!0,kc(fe,nt,j,Be,Dt,He),Dt.side=se,Dt.needsUpdate=!0,Bt=!0}}Bt===!0&&(lt.updateMultisampleRenderTarget(Ct),lt.updateRenderTargetMipmap(Ct))}D.setRenderTarget(Rt,Ot,kt),D.setClearColor(ne,U),te!==void 0&&(j.viewport=te),D.toneMapping=Kt}function Nr(y,k,nt){let j=k.isScene===!0?k.overrideMaterial:null;for(let Q=0,Ct=y.length;Q<Ct;Q++){let Nt=y[Q],{object:Rt,geometry:Ot,group:kt}=Nt,Kt=Nt.material;Kt.allowOverride===!0&&j!==null&&(Kt=j),Rt.layers.test(nt.layers)&&kc(Rt,k,nt,Ot,Kt,kt)}}function kc(y,k,nt,j,Q,Ct){X!==null&&Q.isNodeMaterial&&X.setObject(y,Q),y.onBeforeRender(D,k,nt,j,Q,Ct),y.modelViewMatrix.multiplyMatrices(nt.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),Q.onBeforeRender(D,k,nt,j,y,Ct),Q.transparent===!0&&Q.side===Je&&Q.forceSinglePass===!1?(Q.side=Re,Q.needsUpdate=!0,D.renderBufferDirect(nt,k,j,Q,y,Ct),Q.side=hi,Q.needsUpdate=!0,D.renderBufferDirect(nt,k,j,Q,y,Ct),Q.side=Je):D.renderBufferDirect(nt,k,j,Q,y,Ct),y.onAfterRender(D,k,nt,j,Q,Ct)}function Ur(y,k,nt){k.isScene!==!0&&(k=Lt);let j=K.get(y),Q=b.state.lights,Ct=b.state.shadowsArray,Nt=Q.state.version,Rt=St.getParameters(y,Q.state,Ct,k,nt,b.state.lightProbeGridArray),Ot=St.getProgramCacheKey(Rt),kt=j.programs;j.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?k.environment:null,j.fog=k.fog;let Kt=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;j.envMap=_t.get(y.envMap||j.environment,Kt),j.envMapRotation=j.environment!==null&&y.envMap===null?k.environmentRotation:y.envMapRotation,kt===void 0&&(y.addEventListener("dispose",bn),kt=new Map,j.programs=kt);let te=kt.get(Ot);if(te!==void 0){if(j.currentProgram===te&&j.lightsStateVersion===Nt)return Gc(y,Rt),te}else Rt.uniforms=St.getUniforms(y),X!==null&&y.isNodeMaterial&&X.build(y,nt,Rt),y.onBeforeCompile(Rt,D),te=St.acquireProgram(Rt,Ot),kt.set(Ot,te),j.uniforms=Rt.uniforms;let Bt=j.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Bt.clippingPlanes=Gt.uniform),Gc(y,Rt),j.needsLights=Ed(y),j.lightsStateVersion=Nt,j.needsLights&&(Bt.ambientLightColor.value=Q.state.ambient,Bt.lightProbe.value=Q.state.probe,Bt.sunLights.value=Q.state.sun,Bt.sunLightShadows.value=Q.state.sunShadow,Bt.directionalLights.value=Q.state.directional,Bt.directionalLightShadows.value=Q.state.directionalShadow,Bt.spotLights.value=Q.state.spot,Bt.spotLightShadows.value=Q.state.spotShadow,Bt.rectAreaLights.value=Q.state.rectArea,Bt.ltc_1.value=Q.state.rectAreaLTC1,Bt.ltc_2.value=Q.state.rectAreaLTC2,Bt.pointLights.value=Q.state.point,Bt.pointLightShadows.value=Q.state.pointShadow,Bt.hemisphereLights.value=Q.state.hemi,Bt.sunShadowMatrix.value=Q.state.sunShadowMatrix,Bt.sunShadowCascade.value=Q.state.sunShadowCascade,Bt.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Bt.spotLightMatrix.value=Q.state.spotLightMatrix,Bt.spotLightMap.value=Q.state.spotLightMap,Bt.pointShadowMatrix.value=Q.state.pointShadowMatrix),j.lightProbeGrid=b.state.lightProbeGridArray.length>0,j.currentProgram=te,j.uniformsList=null,te}function Vc(y){if(y.uniformsList===null){let k=y.currentProgram.getUniforms();y.uniformsList=Es.seqWithValue(k.seq,y.uniforms)}return y.uniformsList}function Gc(y,k){let nt=K.get(y);nt.outputColorSpace=k.outputColorSpace,nt.batching=k.batching,nt.batchingColor=k.batchingColor,nt.instancing=k.instancing,nt.instancingColor=k.instancingColor,nt.instancingMorph=k.instancingMorph,nt.skinning=k.skinning,nt.morphTargets=k.morphTargets,nt.morphNormals=k.morphNormals,nt.morphColors=k.morphColors,nt.morphTargetsCount=k.morphTargetsCount,nt.numClippingPlanes=k.numClippingPlanes,nt.numIntersection=k.numClipIntersection,nt.vertexAlphas=k.vertexAlphas,nt.vertexTangents=k.vertexTangents,nt.toneMapping=k.toneMapping}function Md(y,k){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;x.setFromMatrixPosition(k.matrixWorld);for(let nt=0,j=y.length;nt<j;nt++){let Q=y[nt];if(Q.texture!==null&&Q.boundingBox.containsPoint(x))return Q}return null}function Sd(y,k,nt,j,Q){k.isScene!==!0&&(k=Lt),lt.resetTextureUnits();let Ct=k.fog,Nt=j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial?k.environment:null,Rt=pt===null?D.outputColorSpace:pt.isXRRenderTarget===!0?pt.texture.colorSpace:ie.workingColorSpace,Ot=j.isMeshStandardMaterial||j.isMeshLambertMaterial&&!j.envMap||j.isMeshPhongMaterial&&!j.envMap,kt=_t.get(j.envMap||Nt,Ot),Kt=j.vertexColors===!0&&!!nt.attributes.color&&nt.attributes.color.itemSize===4,te=!!nt.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Bt=!!nt.morphAttributes.position,le=!!nt.morphAttributes.normal,Te=!!nt.morphAttributes.color,ge=vn;j.toneMapped&&(pt===null||pt.isXRRenderTarget===!0)&&(ge=D.toneMapping);let fe=nt.morphAttributes.position||nt.morphAttributes.normal||nt.morphAttributes.color,Be=fe!==void 0?fe.length:0,Dt=K.get(j),He=b.state.lights;if(F===!0&&(et===!0||y!==ct)){let me=y===ct&&j.id===rt;Gt.setState(j,y,me)}let se=!1;j.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==He.state.version||Dt.outputColorSpace!==Rt||Q.isBatchedMesh&&Dt.batching===!1||!Q.isBatchedMesh&&Dt.batching===!0||Q.isBatchedMesh&&Dt.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&Dt.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&Dt.instancing===!1||!Q.isInstancedMesh&&Dt.instancing===!0||Q.isSkinnedMesh&&Dt.skinning===!1||!Q.isSkinnedMesh&&Dt.skinning===!0||Q.isInstancedMesh&&Dt.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Dt.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Dt.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Dt.instancingMorph===!1&&Q.morphTexture!==null||Dt.envMap!==kt||j.fog===!0&&Dt.fog!==Ct||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==Gt.numPlanes||Dt.numIntersection!==Gt.numIntersection)||Dt.vertexAlphas!==Kt||Dt.vertexTangents!==te||Dt.morphTargets!==Bt||Dt.morphNormals!==le||Dt.morphColors!==Te||Dt.toneMapping!==ge||Dt.morphTargetsCount!==Be||!!Dt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(se=!0):(se=!0,Dt.__version=j.version);let an=Dt.currentProgram;se===!0&&(an=Ur(j,k,Q),X&&j.isNodeMaterial&&X.onUpdateProgram(j,an,Dt));let En=!1,Zn=!1,zi=!1,ue=an.getUniforms(),Se=Dt.uniforms;if(g.useProgram(an.program)&&(En=!0,Zn=!0,zi=!0),j.id!==rt&&(rt=j.id,Zn=!0),Dt.needsLights){let me=Md(b.state.lightProbeGridArray,Q);Dt.lightProbeGrid!==me&&(Dt.lightProbeGrid=me,Zn=!0)}if(En||ct!==y){g.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ue.setValue(L,"projectionMatrix",y.projectionMatrix),ue.setValue(L,"viewMatrix",y.matrixWorldInverse);let Jn=ue.map.cameraPosition;Jn!==void 0&&Jn.setValue(L,H.setFromMatrixPosition(y.matrixWorld)),E.logarithmicDepthBuffer&&ue.setValue(L,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&ue.setValue(L,"isOrthographic",y.isOrthographicCamera===!0),ct!==y&&(ct=y,Zn=!0,zi=!0)}if(Dt.needsLights&&(He.state.sunShadowMap.length>0&&ue.setValue(L,"sunShadowMap",He.state.sunShadowMap,lt),He.state.directionalShadowMap.length>0&&ue.setValue(L,"directionalShadowMap",He.state.directionalShadowMap,lt),He.state.spotShadowMap.length>0&&ue.setValue(L,"spotShadowMap",He.state.spotShadowMap,lt),He.state.pointShadowMap.length>0&&ue.setValue(L,"pointShadowMap",He.state.pointShadowMap,lt)),Q.isSkinnedMesh){ue.setOptional(L,Q,"bindMatrix"),ue.setOptional(L,Q,"bindMatrixInverse");let me=Q.skeleton;me&&(me.boneTexture===null&&me.computeBoneTexture(),ue.setValue(L,"boneTexture",me.boneTexture,lt))}Q.isBatchedMesh&&(ue.setOptional(L,Q,"batchingTexture"),ue.setValue(L,"batchingTexture",Q._matricesTexture,lt),ue.setOptional(L,Q,"batchingIdTexture"),ue.setValue(L,"batchingIdTexture",Q._indirectTexture,lt),ue.setOptional(L,Q,"batchingColorTexture"),Q._colorsTexture!==null&&ue.setValue(L,"batchingColorTexture",Q._colorsTexture,lt));let $n=nt.morphAttributes;if(($n.position!==void 0||$n.normal!==void 0||$n.color!==void 0)&&G.update(Q,nt,an),(Zn||Dt.receiveShadow!==Q.receiveShadow)&&(Dt.receiveShadow=Q.receiveShadow,ue.setValue(L,"receiveShadow",Q.receiveShadow)),(j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial)&&j.envMap===null&&k.environment!==null&&(Se.envMapIntensity.value=k.environmentIntensity),Se.dfgLUT!==void 0&&(Se.dfgLUT.value=R_()),Zn){if(ue.setValue(L,"toneMappingExposure",D.toneMappingExposure),Dt.needsLights&&bd(Se,zi),Ct&&j.fog===!0&&Vt.refreshFogUniforms(Se,Ct),Vt.refreshMaterialUniforms(Se,j,C,T,b.state.transmissionRenderTarget[y.id]),Dt.needsLights&&Dt.lightProbeGrid){let me=Dt.lightProbeGrid;Se.probesSH.value=me.texture,Se.probesMin.value.copy(me.boundingBox.min),Se.probesMax.value.copy(me.boundingBox.max),Se.probesResolution.value.copy(me.resolution)}Es.upload(L,Vc(Dt),Se,lt)}if(j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Es.upload(L,Vc(Dt),Se,lt),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&ue.setValue(L,"center",Q.center),ue.setValue(L,"modelViewMatrix",Q.modelViewMatrix),ue.setValue(L,"normalMatrix",Q.normalMatrix),ue.setValue(L,"modelMatrix",Q.matrixWorld),j.uniformsGroups!==void 0){let me=j.uniformsGroups;for(let Jn=0,ki=me.length;Jn<ki;Jn++){let Wc=me[Jn];mt.update(Wc,an),mt.bind(Wc,an)}}return an}function bd(y,k){y.ambientLightColor.needsUpdate=k,y.lightProbe.needsUpdate=k,y.sunLights.needsUpdate=k,y.sunLightShadows.needsUpdate=k,y.directionalLights.needsUpdate=k,y.directionalLightShadows.needsUpdate=k,y.pointLights.needsUpdate=k,y.pointLightShadows.needsUpdate=k,y.spotLights.needsUpdate=k,y.spotLightShadows.needsUpdate=k,y.rectAreaLights.needsUpdate=k,y.hemisphereLights.needsUpdate=k}function Ed(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return ot},this.getActiveMipmapLevel=function(){return st},this.getRenderTarget=function(){return pt},this.setRenderTargetTextures=function(y,k,nt){let j=K.get(y);j.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),K.get(y.texture).__webglTexture=k,K.get(y.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:nt,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,k){let nt=K.get(y);nt.__webglFramebuffer=k,nt.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(y,k=0,nt=0){pt=y,ot=k,st=nt;let j=null,Q=!1,Ct=!1;if(y){let Rt=K.get(y);if(Rt.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(L.FRAMEBUFFER,Rt.__webglFramebuffer),ht.copy(y.viewport),Ft.copy(y.scissor),Pt=y.scissorTest,g.viewport(ht),g.scissor(Ft),g.setScissorTest(Pt),rt=-1;return}else if(Rt.__webglFramebuffer===void 0)lt.setupRenderTarget(y);else if(Rt.__hasExternalTextures)lt.rebindTextures(y,K.get(y.texture).__webglTexture,K.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let Kt=y.depthTexture;if(Rt.__boundDepthTexture!==Kt){if(Kt!==null&&K.has(Kt)&&(y.width!==Kt.image.width||y.height!==Kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");lt.setupDepthRenderbuffer(y)}}let Ot=y.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(Ct=!0);let kt=K.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(kt[k])?j=kt[k][nt]:j=kt[k],Q=!0):y.samples>0&&lt.useMultisampledRTT(y)===!1?j=K.get(y).__webglMultisampledFramebuffer:Array.isArray(kt)?j=kt[nt]:j=kt,ht.copy(y.viewport),Ft.copy(y.scissor),Pt=y.scissorTest}else ht.copy(q).multiplyScalar(C).floor(),Ft.copy(tt).multiplyScalar(C).floor(),Pt=J;if(nt!==0&&(j=Z),g.bindFramebuffer(L.FRAMEBUFFER,j)&&g.drawBuffers(y,j),g.viewport(ht),g.scissor(Ft),g.setScissorTest(Pt),Q){let Rt=K.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+k,Rt.__webglTexture,nt)}else if(Ct){let Rt=k;for(let Ot=0;Ot<y.textures.length;Ot++){let kt=K.get(y.textures[Ot]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Ot,kt.__webglTexture,nt,Rt)}}else if(y!==null&&nt!==0){let Rt=K.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Rt.__webglTexture,nt)}rt=-1};function Hc(y){let k=K.get(y);return(k.__readFormat!==y.format||k.__readType!==y.type)&&(k.__readFormat=y.format,k.__readType=y.type,k.__formatReadable=E.textureFormatReadable(y.format),k.__typeReadable=E.textureTypeReadable(y.type)),k}this.readRenderTargetPixels=function(y,k,nt,j,Q,Ct,Nt,Rt=0){if(!(y&&y.isWebGLRenderTarget)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=K.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Nt!==void 0&&(Ot=Ot[Nt]),Ot){g.bindFramebuffer(L.FRAMEBUFFER,Ot);try{let kt=y.textures[Rt],Kt=kt.format,te=kt.type;y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Rt);let Bt=Hc(kt);if(Bt.__formatReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Bt.__typeReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=y.width-j&&nt>=0&&nt<=y.height-Q&&L.readPixels(k,nt,j,Q,Tt.convert(Kt),Tt.convert(te),Ct)}finally{let kt=pt!==null?K.get(pt).__webglFramebuffer:null;g.bindFramebuffer(L.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(y,k,nt,j,Q,Ct,Nt,Rt=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ot=K.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Nt!==void 0&&(Ot=Ot[Nt]),Ot)if(k>=0&&k<=y.width-j&&nt>=0&&nt<=y.height-Q){g.bindFramebuffer(L.FRAMEBUFFER,Ot);let kt=y.textures[Rt],Kt=kt.format,te=kt.type;y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Rt);let Bt=Hc(kt);if(Bt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Bt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let le=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,le),L.bufferData(L.PIXEL_PACK_BUFFER,Ct.byteLength,L.STREAM_READ),L.readPixels(k,nt,j,Q,Tt.convert(Kt),Tt.convert(te),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let Te=pt!==null?K.get(pt).__webglFramebuffer:null;g.bindFramebuffer(L.FRAMEBUFFER,Te);let ge=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await su(L,ge,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,le),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Ct),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(le),L.deleteSync(ge),Ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,k=null,nt=0){let j=Math.pow(2,-nt),Q=Math.floor(y.image.width*j),Ct=Math.floor(y.image.height*j),Nt=k!==null?k.x:0,Rt=k!==null?k.y:0;lt.setTexture2D(y,0),L.copyTexSubImage2D(L.TEXTURE_2D,nt,0,0,Nt,Rt,Q,Ct),g.unbindTexture()},this.copyTextureToTexture=function(y,k,nt=null,j=null,Q=0,Ct=0){let Nt,Rt,Ot,kt,Kt,te,Bt,le,Te,ge=y.isCompressedTexture?y.mipmaps[Ct]:y.image;if(nt!==null)Nt=nt.max.x-nt.min.x,Rt=nt.max.y-nt.min.y,Ot=nt.isBox3?nt.max.z-nt.min.z:1,kt=nt.min.x,Kt=nt.min.y,te=nt.isBox3?nt.min.z:0;else{let Se=Math.pow(2,-Q);Nt=Math.floor(ge.width*Se),Rt=Math.floor(ge.height*Se),y.isDataArrayTexture?Ot=ge.depth:y.isData3DTexture?Ot=Math.floor(ge.depth*Se):Ot=1,kt=0,Kt=0,te=0}j!==null?(Bt=j.x,le=j.y,Te=j.z):(Bt=0,le=0,Te=0);let fe=Tt.convert(k.format),Be=Tt.convert(k.type),Dt;k.isData3DTexture?(lt.setTexture3D(k,0),Dt=L.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(lt.setTexture2DArray(k,0),Dt=L.TEXTURE_2D_ARRAY):(lt.setTexture2D(k,0),Dt=L.TEXTURE_2D),g.activeTexture(L.TEXTURE0),g.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,k.flipY),g.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),g.pixelStorei(L.UNPACK_ALIGNMENT,k.unpackAlignment);let He=g.getParameter(L.UNPACK_ROW_LENGTH),se=g.getParameter(L.UNPACK_IMAGE_HEIGHT),an=g.getParameter(L.UNPACK_SKIP_PIXELS),En=g.getParameter(L.UNPACK_SKIP_ROWS),Zn=g.getParameter(L.UNPACK_SKIP_IMAGES);g.pixelStorei(L.UNPACK_ROW_LENGTH,ge.width),g.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ge.height),g.pixelStorei(L.UNPACK_SKIP_PIXELS,kt),g.pixelStorei(L.UNPACK_SKIP_ROWS,Kt),g.pixelStorei(L.UNPACK_SKIP_IMAGES,te);let zi=y.isDataArrayTexture||y.isData3DTexture,ue=k.isDataArrayTexture||k.isData3DTexture;if(y.isDepthTexture){let Se=K.get(y),$n=K.get(k),me=K.get(Se.__renderTarget),Jn=K.get($n.__renderTarget);g.bindFramebuffer(L.READ_FRAMEBUFFER,me.__webglFramebuffer),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,Jn.__webglFramebuffer);for(let ki=0;ki<Ot;ki++)zi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,K.get(y).__webglTexture,Q,te+ki),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,K.get(k).__webglTexture,Ct,Te+ki)),L.blitFramebuffer(kt,Kt,Nt,Rt,Bt,le,Nt,Rt,L.DEPTH_BUFFER_BIT,L.NEAREST);g.bindFramebuffer(L.READ_FRAMEBUFFER,null),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(Q!==0||y.isRenderTargetTexture||K.has(y)){let Se=K.get(y),$n=K.get(k);g.bindFramebuffer(L.READ_FRAMEBUFFER,B),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,$);for(let me=0;me<Ot;me++)zi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Se.__webglTexture,Q,te+me):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Se.__webglTexture,Q),ue?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,$n.__webglTexture,Ct,Te+me):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,$n.__webglTexture,Ct),Q!==0?L.blitFramebuffer(kt,Kt,Nt,Rt,Bt,le,Nt,Rt,L.COLOR_BUFFER_BIT,L.NEAREST):ue?L.copyTexSubImage3D(Dt,Ct,Bt,le,Te+me,kt,Kt,Nt,Rt):L.copyTexSubImage2D(Dt,Ct,Bt,le,kt,Kt,Nt,Rt);g.bindFramebuffer(L.READ_FRAMEBUFFER,null),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ue?y.isDataTexture||y.isData3DTexture?L.texSubImage3D(Dt,Ct,Bt,le,Te,Nt,Rt,Ot,fe,Be,ge.data):k.isCompressedArrayTexture?L.compressedTexSubImage3D(Dt,Ct,Bt,le,Te,Nt,Rt,Ot,fe,ge.data):L.texSubImage3D(Dt,Ct,Bt,le,Te,Nt,Rt,Ot,fe,Be,ge):y.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Ct,Bt,le,Nt,Rt,fe,Be,ge.data):y.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Ct,Bt,le,ge.width,ge.height,fe,ge.data):L.texSubImage2D(L.TEXTURE_2D,Ct,Bt,le,Nt,Rt,fe,Be,ge);g.pixelStorei(L.UNPACK_ROW_LENGTH,He),g.pixelStorei(L.UNPACK_IMAGE_HEIGHT,se),g.pixelStorei(L.UNPACK_SKIP_PIXELS,an),g.pixelStorei(L.UNPACK_SKIP_ROWS,En),g.pixelStorei(L.UNPACK_SKIP_IMAGES,Zn),Ct===0&&k.generateMipmaps&&L.generateMipmap(Dt),g.unbindTexture()},this.initRenderTarget=function(y){K.get(y).__webglFramebuffer===void 0&&lt.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?lt.setTextureCube(y,0):y.isData3DTexture?lt.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?lt.setTexture2DArray(y,0):lt.setTexture2D(y,0),g.unbindTexture()},this.resetState=function(){ot=0,st=0,pt=null,g.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}};var zo=class extends wi{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new $e;t.deleteAttribute("uv");let e=new ln({side:Re}),n=new ln,s=new Ii(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ae(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new Js(t,n,6),o=new Ae;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let c=new ae(t,As(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new ae(t,As(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let h=new ae(t,As(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let f=new ae(t,As(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let u=new ae(t,As(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let d=new ae(t,As(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function As(i){return new ur({color:0,emissive:16777215,emissiveIntensity:i})}var Cr=new N;function un(i,t,e,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;Cr.copy(t),Cr[n]=0,Cr.normalize();let l=.5*a/(a+o),h=1-Cr.angleTo(i)/c;return Math.sign(Cr[e])===1?h*l:o/(a+o)+l+l*(1-h)}var ko=class i extends $e{constructor(t=1,e=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new N,l=new N,h=new N(t,e,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,_=f.length/6,M=new N,m=.5/a;for(let p=0,w=0;p<f.length;p+=3,w+=2)switch(c.fromArray(f,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),f[p+0]=h.x*Math.sign(c.x)+l.x*r,f[p+1]=h.y*Math.sign(c.y)+l.y*r,f[p+2]=h.z*Math.sign(c.z)+l.z*r,u[p+0]=l.x,u[p+1]=l.y,u[p+2]=l.z,Math.floor(p/_)){case 0:M.set(1,0,0),d[w+0]=un(M,l,"z","y",r,n),d[w+1]=1-un(M,l,"y","z",r,e);break;case 1:M.set(-1,0,0),d[w+0]=1-un(M,l,"z","y",r,n),d[w+1]=1-un(M,l,"y","z",r,e);break;case 2:M.set(0,1,0),d[w+0]=1-un(M,l,"x","z",r,t),d[w+1]=un(M,l,"z","x",r,n);break;case 3:M.set(0,-1,0),d[w+0]=1-un(M,l,"x","z",r,t),d[w+1]=1-un(M,l,"z","x",r,n);break;case 4:M.set(0,0,1),d[w+0]=1-un(M,l,"x","y",r,t),d[w+1]=1-un(M,l,"y","x",r,e);break;case 5:M.set(0,0,-1),d[w+0]=un(M,l,"x","y",r,t),d[w+1]=1-un(M,l,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};function Wu(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new be,l=0;for(let h=0;h<i.length;++h){let f=i[h],u=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in f.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0,f=[];for(let u=0;u<i.length;++u){let d=i[u].index;for(let _=0;_<d.count;++_)f.push(d.getX(_)+h);h+=i[u].attributes.position.count}c.setIndex(f)}for(let h in r){let f=Hu(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,f)}for(let h in a){let f=a[h][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<f;++u){let d=[];for(let M=0;M<a[h].length;++M)d.push(a[h][M][u]);let _=Hu(d);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(_)}}}return c}function Hu(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new Fe(a,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let f=c/e;for(let u=0,d=h.count;u<d;u++)for(let _=0;_<e;_++){let M=h.getComponent(u,_);o.setComponent(u+f,_,M)}}else a.set(h.array,c);c+=h.count*e}return s!==void 0&&(o.gpuType=s),o}function Vo(i){let t=i.map(n=>n.index?n.toNonIndexed():n),e=Wu(t,!1);if(t.forEach((n,s)=>{n!==i[s]&&n.dispose()}),!e)throw new Error("Incompatible BotStrike mesh attributes");return e}function Xu(i){let t=[],e=[],n=2050,s=()=>(n=Math.imul(n,1664525)+1013904223>>>0,n/4294967296);function r(U,V=512){let T=document.createElement("canvas");T.width=T.height=V,U(T.getContext("2d"),V);let C=new ii(T);return C.wrapS=C.wrapT=is,C.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),e.push(C),C}let a=r((U,V)=>{U.fillStyle="#c4c6c8",U.fillRect(0,0,V,V);for(let T=0;T<7500;T++){let C=150+s()*95|0;U.fillStyle=`rgb(${C},${C},${C})`;let I=s()*V,Y=s()*V;U.fillRect(I,Y,s()*3+.4,s()*1.4+.3)}for(let T=0;T<340;T++){let C=s()*V,I=s()*V;U.strokeStyle=T%3?"#7c8185":"#242b30",U.lineWidth=.5+s()*1.6,U.beginPath(),U.moveTo(C,I),U.lineTo(C+s()*25,I+s()*3),U.stroke()}for(let T=0;T<140;T++){let C=s()*V,I=s()*V;U.fillStyle=T%4?"#39434a":"#82949e",U.beginPath(),U.moveTo(C,I),U.lineTo(C+s()*7+1,I+1),U.lineTo(C+s()*4,I+s()*6+1),U.fill()}U.strokeStyle="#45494c",U.lineWidth=3,U.strokeRect(7,7,V-14,V-14),U.strokeStyle="#fff",U.lineWidth=1,U.strokeRect(10,10,V-20,V-20)}),o=r((U,V)=>{U.fillStyle="#27333c",U.fillRect(0,0,V,V);for(let T=0;T<16e3;T++){let C=.04+s()*.14;U.fillStyle=`rgba(180,201,211,${C})`,U.fillRect(s()*V,s()*V,1,1)}U.strokeStyle="#1b242b",U.lineWidth=4,U.strokeRect(2,2,V-4,V-4);for(let T=0;T<12;T++)U.fillStyle="#17232c",U.fillRect(17+T*40,23,17,4),U.fillRect(17+T*40,V-27,17,4);for(let T=0;T<16;T++)U.fillStyle="#6e767c",U.beginPath(),U.arc(T%4*128+14,(T/4|0)*128+14,2,0,Math.PI*2),U.fill()});o.repeat.set(12,12);let c=r((U,V)=>{let T=U.createImageData(V,V);for(let C=0;C<V;C++)for(let I=0;I<V;I++){let Y=Math.max(65,Math.min(235,157+28*Math.sin(I*.027+Math.sin(C*.039)*2)+23*Math.cos(C*.035+Math.sin(I*.021)*3)+12*Math.sin(I*.11+C*.15))),q=(C*V+I)*4;T.data[q]=T.data[q+1]=T.data[q+2]=Y,T.data[q+3]=255}U.putImageData(T,0,0)});c.repeat.set(5,5);function l(U,V={}){let T=new ln({color:U,roughness:.44,metalness:.72,map:a,bumpMap:a,bumpScale:.12,...V});return t.push(T),T}let h={steel:l("#747e87"),black:l("#111b24",{roughness:.66}),rubber:l("#14171d",{metalness:.1,roughness:.88}),silver:l("#acb5be",{roughness:.27}),warm:l("#bd7651"),hull:l("#1d333f"),container:l("#34464e"),floor:l("#657983",{map:o,bumpMap:o,bumpScale:.12,roughnessMap:c,roughness:.85,metalness:.3,envMapIntensity:.2})},u=["#139fb7","#d3dfd7","#c08b2b","#684e97","#aa346e","#c46122"].map(U=>l(U)),d=["#47edff","#76ffba","#ffb733","#bc70ff","#ff4dad","#ff8b2b"].map(U=>l(U,{map:null,bumpMap:null,emissive:U,emissiveIntensity:1.7,roughness:.25,metalness:.15})),_=["#33ccff","#ff7550"].map(U=>l(U,{map:null,bumpMap:null,emissive:U,emissiveIntensity:2.2})),M=d[5],m=d[0],p=r((U,V)=>{let T=U.createRadialGradient(V/2,V/2,0,V/2,V/2,V/2);T.addColorStop(0,"rgba(0,0,0,.48)"),T.addColorStop(.55,"rgba(0,0,0,.2)"),T.addColorStop(1,"rgba(0,0,0,0)"),U.fillStyle=T,U.fillRect(0,0,V,V)},64),w=new Dn({map:p,transparent:!0,depthWrite:!1});t.push(w);function R(U,V,T,C=0,I=0,Y=0){let q=new ae(V,T);return q.position.set(C,I,Y),q.castShadow=!0,q.receiveShadow=!0,U.add(q),q}function x(U,V,T,C,I,Y,q,tt=h.steel,J=Math.min(V,T,C)*.13){if(u.includes(tt)&&V>6&&T>6){let O=Math.min(V,T)*.18,F=new Ai;F.moveTo(-V/2+O,T/2),F.lineTo(V/2-O,T/2),F.lineTo(V/2,T/2-O),F.lineTo(V*.44,-T/2+O),F.lineTo(V*.3,-T/2),F.lineTo(-V*.3,-T/2),F.lineTo(-V*.44,-T/2+O),F.lineTo(-V/2,T/2-O),F.closePath();let et=new fs(F,{depth:C-.7,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.35,bevelThickness:.35});et.translate(0,0,-(C-.7)/2);let it=et.getAttribute("uv");for(let H=0;H<it.count;H++)it.setXY(H,it.getX(H)/V+.5,it.getY(H)/T+.5);return R(U,et,tt,I,Y,q)}return R(U,new ko(V,T,C,1,Math.min(J,V/3,T/3,C/3)),tt,I,Y,q)}function S(U,V,T,C,I,Y,q,tt){return R(U,new $e(V,T,C),tt,I,Y,q)}function b(U,V,T,C,I,Y,q=h.steel,tt=10){return R(U,new ri(V,V,T,tt),q,C,I,Y)}function P(U,V,T,C,I,Y){return R(U,new ai(V,10,6),Y,T,C,I)}function v(U,V,T,C,I=h.steel){let Y=new N(...V),q=new N(...T),tt=q.clone().sub(Y),J=b(U,C,tt.length(),...Y.add(q).multiplyScalar(.5).toArray(),I,8);return J.quaternion.setFromUnitVectors(new N(0,1,0),tt.normalize()),J}function A(U,V,T=.8,C=h.rubber){return R(U,new hr(new us(V.map(I=>new N(...I))),12,T,5,!1),C)}function D(U,V,T,C,I,Y){let q=new Ai;q.moveTo(0,0),q.lineTo(5*I,9),q.lineTo(11*I,19),q.lineTo(7*I,3),q.closePath();let tt=new fs(q,{depth:2,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.4,bevelThickness:.4});return R(U,tt,Y,V,T,C)}function z(U,V,T,C,I,Y){for(let q of[-1,1])for(let tt of[-1,1]){let J=b(U,.65,.45,C+q*V*.37,I+tt*T*.36,Y,h.silver,6);J.rotation.x=Math.PI/2}}function X(U,V,T,C,I,Y){x(U,V,T,.5,C,I,Y,h.black,.1);for(let q=0;q<4;q++)S(U,V*.83,.35,.65,C,I-T*.3+q*T*.2,Y-.3,h.steel)}function Z(U){U.updateMatrixWorld(!0);let V=U.matrixWorld.clone().invert(),T=new Map,C=[];U.traverse(I=>{if(!I.isMesh)return;let Y=I.geometry.clone().applyMatrix4(V.clone().multiply(I.matrixWorld));T.has(I.material)||T.set(I.material,[]),T.get(I.material).push(Y),C.push(I)});for(let I of C)I.removeFromParent(),I.geometry.dispose();for(let[I,Y]of T){let q=Vo(Y);R(U,q,I),Y.forEach(tt=>tt.dispose())}}function B(U,V=2){let T=new Me;U.add(T);let C=[16,24,33,48,30,35,31,43,29,42,26,40][V];x(T,5,6,C,0,0,0,h.black,.7),x(T,5.5,2.8,C*.65,0,3.1,2,h.hull,.5),x(T,4.5,4,7,0,0,C*.5+3,h.rubber),x(T,3,9,5,0,-6,3,h.black,.4).rotation.x=-.22,x(T,3.3,8,5,0,-6,-5,h.steel,.4).rotation.x=.12;let I=b(T,1.2,12,0,1,-C*.5-5,h.black);I.rotation.x=Math.PI/2;let Y=b(T,1.9,3,0,1,-C*.5-11,h.steel);Y.rotation.x=Math.PI/2;for(let tt=0;tt<7;tt++)S(T,4.9,.6,1,0,5,-C*.3+tt*2,h.steel),S(T,.3,1.2,1.3,2.6,0,-C*.3+tt*2,h.silver);if(S(T,.2,.5,9,2.85,2,0,m),x(T,1,2.5,4,3.1,1,7,h.warm,.2),z(T,3,4,0,0,C*.5+.2),V===3||V===9){let tt=b(T,2.6,15,0,9,-2,h.black,14);tt.rotation.x=Math.PI/2;for(let O of[-10,6]){let F=b(T,3.2,2,0,9,O,h.steel,14);F.rotation.x=Math.PI/2}let J=b(T,2.4,.3,0,9,7.2,d[3],16);J.rotation.x=Math.PI/2,v(T,[0,4,-6],[0,8,-6],1.2)}else x(T,2.3,2.5,3,0,6.2,-4,h.black,.3),S(T,1.3,.6,.4,0,7,-2.3,m);let q=d[[0,0,0,3,5,2,1,5,4,3,1,4][V]];if(V===5){for(let tt of[-1,1])for(let J=0;J<3;J++)x(T,1,2,6,tt*3.2,2,-9+J*8,J===1?q:h.steel,.2);x(T,7,5,9,0,-2,10,h.hull,.6)}if(V===6||V===8||V===11){for(let tt=0;tt<4;tt++){let J=R(T,new Ci(V===11?4:3,.55,6,16),tt%2?h.silver:q,0,1,-10-tt*4);J.rotation.z=tt*.4}for(let tt of[-1,1])x(T,2,3,22,tt*4,1,-13,h.steel,.5),S(T,.4,1,16,tt*5.1,1,-13,q);x(T,4,5,8,0,0,9,q,.5)}if(V===7){x(T,12,10,13,0,-4,7,h.black,1);for(let tt of[-1,1]){let J=b(T,6.5,5,tt*7,-4,7,h.steel,16);J.rotation.z=Math.PI/2}for(let tt=0;tt<6;tt++){let J=tt*Math.PI/3,O=Math.cos(J)*3,F=1+Math.sin(J)*3,et=b(T,.8,24,O,F,-26,h.black,10);et.rotation.x=Math.PI/2}for(let tt of[-17,-32]){let J=b(T,4.4,2,0,1,tt,h.steel,16);J.rotation.x=Math.PI/2}S(T,1,1,12,3.5,3,7,q)}if(V===9){x(T,5,2,24,0,-3,-15,h.steel,.3);for(let tt of[-1,1])v(T,[tt*2,-3,-16],[tt*5,-12,-23],.65,h.black)}if(V===10){for(let tt of[-1,1]){b(T,2,12,tt*4,0,3,q,12);for(let J of[-6,6])b(T,2.4,1.2,tt*4,J,3,h.steel,12);A(T,[[tt*4,6,3],[tt*6,8,-5],[tt*3,4,-13]],.6,h.black)}x(T,6,2,14,0,5,4,h.hull,.4)}if(V===11){for(let tt of[-1,1])x(T,3,7,26,tt*5,0,-20,h.hull,.6),S(T,.4,4,21,tt*6.6,0,-20,q);P(T,4.2,0,1,-9,q),x(T,9,9,12,0,-2,12,h.black,1)}if(V===4){let tt=b(T,2.3,13,0,-3,-12,h.rubber);tt.rotation.x=Math.PI/2;for(let J=0;J<6;J++)S(T,4.2,.6,.5,0,-5,-17+J*2,h.steel)}return T}function $(U,V,T=V===3?3:V===0?1:2){let C=new Me,I=new Me,Y=new Me,q=[],tt=[];C.name=`hero-${V}-slot-${U}`,C.add(I,Y);let J=u[V],O=d[V],F=V===2?1.22:V===0?.83:V===5?1.08:1;b(I,5,24,0,34,1,h.black);for(let H=0;H<4;H++)x(I,15*F,3,13,0,27+H*4,1,h.steel,.5);x(I,26*F,20,16,0,46,1,h.black,2);for(let H of[-1,1]){let gt=x(I,13*F,15,5,H*7*F,47,-9,J,1.4);gt.rotation.z=H*-.12,z(I,11*F,12,H*8*F,47,-12),x(I,5,13,12,H*15*F,43,1,J,.8),A(I,[[H*12,52,8],[H*16,55,13],[H*18,44,14],[H*12,34,9]],1.15)}x(I,11,6,3,0,37,-10,J,.8),X(I,9,5,0,44,-12.6),S(I,8,1,1,0,53,-12,O),x(I,22*F,8,15,0,31,0,h.black,1);for(let H of[-1,1])x(I,9*F,8,4,H*6*F,31,-8,J,.7).rotation.z=H*.12;x(I,20,23,9,0,44,14,h.black,1.4),x(I,16,18,2,0,44,19,J,.7),X(I,9,8,0,44,20.3),S(I,12,2,1,0,53,20.2,_[Math.floor(U/5)]),Y.position.y=64,Y.scale.setScalar(V===2?.75:.65),b(Y,5,7,0,-10,0,h.steel),x(Y,20*F,17,18,0,0,0,J,2),x(Y,19*F,8,3,0,0,-9,h.black,.7),x(Y,16*F,2.3,1,0,0,-11,O,.3),x(Y,12,5,6,0,-7,-7,h.black,.7);for(let H of[-1,1]){x(Y,3.5,9,5,H*9*F,-4,-7,J,.6);let gt=b(Y,3.7,3,H*11*F,0,0,h.black,12);gt.rotation.z=Math.PI/2;let Lt=b(Y,2.3,3.3,H*11*F,0,0,h.steel,12);Lt.rotation.z=Math.PI/2,z(Y,17*F,14,0,0,9.2)}x(Y,11,2,9,0,9,0,h.steel,.4);for(let H of[-1,1]){x(Y,2,5,4,H*7,-5,-10,h.steel,.3).rotation.z=H*.25;let gt=b(Y,.7,.4,H*6,6,-9.7,h.silver,6);gt.rotation.x=Math.PI/2}if(V===0)for(let H of[-1,1])D(Y,H*8,5,0,H,J),D(I,H*16,49,5,H,J),x(I,4,19,15,H*14,44,13,h.black,.6),S(I,2,8,1,H*14,47,21,O);if(V===1){for(let H of[-1,1])x(I,7,24,9,H*9,43,18,J,1.2),S(I,2,13,1,H*9,44,23,O);S(I,3,10,1,0,48,-13,O),S(I,9,3,1,0,48,-13.2,O)}if(V===2){x(I,34,8,22,0,55,1,J,1.4);for(let H of[-1,1])x(I,16,16,25,H*23,52,0,J,2),x(I,15,7,22,H*23,43,0,h.steel,1),z(I,13,12,H*23,52,-13),A(I,[[H*14,57,2],[H*19,64,8],[H*25,59,10],[H*27,50,8]],1.4)}if(V===3){x(Y,21,12,5,0,1,-10,h.black,1);let H=b(Y,5,3,5,1,-13,h.steel,16);H.rotation.x=Math.PI/2;let gt=b(Y,3.7,3.4,5,1,-13,O,18);gt.rotation.x=Math.PI/2,x(Y,6,3,2,-6,0,-13,O,.5),v(I,[-9,47,17],[-9,77,17],1.2,h.black),x(I,4,18,4,-9,68,17,J,.5)}if(V===4){for(let H of[-1,1])v(Y,[H*8,5,0],[H*10,25,1],.7,h.steel),S(Y,1,6,1,H*10,23,1,O);x(I,9,10,2,0,45,-13,h.black,.5);for(let H=0;H<3;H++)S(I,6,.6,.5,0,42+H*2,-14.2,O)}if(V===5)for(let H of[-1,1]){b(I,4.4,29,H*10,49,17,h.black,14);for(let gt of[36,45,58,63])b(I,5.2,2,H*10,gt,17,gt===58?O:h.steel,14);b(I,3.5,6,H*10,63,17,O,14),A(I,[[H*10,34,17],[H*16,29,17],[H*17,35,9]],1.2)}for(let H of[-1,1]){let vt=function(g,W,K,lt){let _t=new N(...W).sub(new N(...g)),xt=_t.length(),at=new Me;return at.position.fromArray(g),at.quaternion.setFromUnitVectors(new N(0,-1,0),_t.normalize()),I.add(at),b(at,2,xt,0,-xt/2,0,h.silver),x(at,K,Math.min(13,xt*.7),lt,0,-xt*.48,-1,J,.6),v(at,[K*.45,-2,2],[K*.45,-xt+2,2],.8,h.silver),X(at,K*.65,4,0,-xt*.4,-lt*.5-1.4),at},gt=new Me;gt.position.set(H*7.5,31,0),C.add(gt),P(gt,4.2,0,-1,0,h.black),v(gt,[0,-2,0],[0,-13,0],2,h.silver),x(gt,9*F,14,10,0,-8,0,J,1);let Lt=b(gt,3.7,12*F,0,-17,0,h.black);Lt.rotation.z=Math.PI/2,x(gt,8*F,6,3,0,-17,-6,J,.6),x(gt,7*F,13,8,0,-24,0,J,.7),v(gt,[H*4,-17,2],[H*4,-29,2],.8,h.silver),x(gt,10*F,5,17,0,-30,-4,h.black,.8),x(gt,9*F,3,10,0,-28,-7,J,.7),S(gt,5,.8,.5,0,-22,-5,O);for(let g of[-1,1])x(gt,2,11,6,g*4.2,-8,0,h.black,.4),v(gt,[g*3.6,-19,2],[g*3.6,-28,2],.65,h.silver);for(let g=0;g<3;g++)x(gt,2.2,2,5,-2.5+g*2.5,-28.6,-11,J,.3);Z(gt),q.push(gt);let Ut=[H*(V===2?25:18)*F,49,0],qt=[H*16*F,34,-15],L=H===1?[0,34,-21]:[0,35,-31];P(I,4.2,...Ut,h.black);let Qt=x(I,11*F,8,14,...Ut,J,1);Qt.rotation.z=H*-.18,vt(Ut,qt,7*F,8),P(I,3.5,...qt,h.black),vt(qt,L,8*F,9);let E=new Me;E.position.fromArray(L),I.add(E),x(E,6,4,6,0,0,0,h.black,.6),x(E,5,1.3,5,0,2,0,J,.3);for(let g=0;g<4;g++){let W=-2.1+g*1.4;x(E,1.1,3,2,W,-2,-2.5,h.steel,.2),x(E,1.1,1.3,3,W,-3.7,-1.4,h.black,.2)}x(E,1.4,3.5,2,3,-1,0,h.steel,.3)}let et=B(I,T);et.position.set(0,40,-24),et.rotation.x=0,et.rotation.y=0,Z(I),Z(Y),C.traverse(H=>{H.castShadow=!1});let it=R(C,new Nn(48*F,44),w,0,.24,0);return it.rotation.x=-Math.PI/2,it.castShadow=!1,{rig:C,torso:I,head:Y,legs:q,hero:V,slot:U,weapon:T}}function ot(U,V=0){let T=new Me;B(T,U).scale.setScalar(1.1);for(let I of[-1,1])x(T,6,6,15,I===1?4:-5,-9,I===1?10:-3,u[V],1),x(T,5,5,7,I===1?3:-4,-6,I===1?5:-9,h.black,.6);return Z(T),T.traverse(I=>{I.castShadow=!1}),T.position.set(9,-9,-23),T.scale.setScalar(.55),T}function st(U){let V=new Me,T=d[[2,0,3,5,4,3,1,2,0,5,1,0][U]];if(U===0){for(let C of[-1,1])x(V,11,23,4,C*5.8,0,0,u[2],1);x(V,18,8,5,0,-12,0,h.black,1);for(let C of[-1,1])z(V,8,18,C*6,0,-2.4),S(V,6,.6,.3,C*6,6,-2.7,T)}else if(U===6||U===11){b(V,4,21,0,0,0,h.black,16),b(V,3.4,15,0,0,0,T,16);for(let C of[-11,10])b(V,4.5,3,0,C,0,h.steel,16);for(let C of[-1,1])x(V,2,17,3,C*3.6,0,0,h.hull,.4);if(U===6)b(V,.4,7,0,-16,0,h.silver,8),x(V,12,2,4,0,13,0,h.black,.3);else for(let C of[-1,1])b(V,1,5,C*2.2,13,0,h.silver,8)}else if(U===7||U===8||U===9){x(V,15,19,4,0,0,0,h.black,.8),x(V,12,16,1,0,0,-2.6,U===7?u[2]:h.hull,.3);for(let C=0;C<4;C++){S(V,8,.7,.5,0,-5+C*3,-3.3,T);for(let I of[-1,1])S(V,2,1.2,2,I*8,-6+C*4,0,h.silver)}z(V,12,16,0,0,-3)}else if(U===5||U===10){x(V,13,6,13,0,0,0,h.hull,1),P(V,4,0,4,0,T);for(let C of[-1,1])v(V,[C*4,0,0],[C*12,-5,C*7],1.2,h.steel),x(V,7,2,8,C*12,-5,C*7,h.black,.4),v(V,[C*4,0,0],[C*12,-5,-C*7],1.2,h.steel),x(V,7,2,8,C*12,-5,-C*7,h.black,.4);v(V,[0,5,0],[0,18,0],.7,h.steel),P(V,1.2,0,18,0,T)}else{b(V,5,18,0,0,0,h.black,12);for(let C of[-9,-4,4,9])b(V,5.4,1.3,0,C,0,C===-4||C===4?T:h.steel,12);for(let C=0;C<6;C++){let I=C*Math.PI/3;x(V,2.1,12,2.1,Math.cos(I)*4.6,0,Math.sin(I)*4.6,h.hull,.4)}x(V,5,4,5,0,11,0,h.steel,.4),v(V,[2,12,0],[6,6,0],.8,h.silver)}return Z(V),V}function pt(U){let V=new Me;return B(V,U),Z(V),V}function rt(U,V="#8deaff",T=512,C=128){let I=document.createElement("canvas");I.width=T,I.height=C;let Y=I.getContext("2d");Y.fillStyle="#09141c",Y.fillRect(0,0,T,C),Y.fillStyle=V,Y.font="700 54px monospace",Y.textAlign="center",Y.textBaseline="middle",Y.fillText(U,T/2,C/2),Y.globalAlpha=.6,Y.fillRect(10,10,T-20,3),Y.fillRect(10,C-13,T-20,3);let q=new ii(I);q.colorSpace=Le,e.push(q);let tt=new ln({map:q,emissiveMap:q,emissive:V,emissiveIntensity:1.3,roughness:.5,metalness:.1,side:Je});return t.push(tt),tt}function ct(U,V,T,C,I,Y=100,q=24,tt="#85eaff",J=0){let O=R(U,new Nn(Y,q),rt(V,tt),T,C,I);return O.rotation.y=J,O}let ht=t.length,Ft=e.length;function Pt(U,V,T){for(let I of t.splice(ht))I.dispose();for(let I of e.splice(Ft))I.dispose();n=2050+T;let C=V.extent;S(U,C*2+40,10,C*2+40,0,-5,0,h.floor);for(let I=-C+80;I<C;I+=160)for(let Y of[-1,1])S(U,35,.18,5,Y*(C-65),.12,I,h.warm),S(U,35,.18,5,Y*(C-65),.12,I+16,h.warm);V.obstacles.forEach((I,Y)=>{let q=I.max[0]-I.min[0],tt=I.max[1],J=I.max[2]-I.min[2],O=(I.min[0]+I.max[0])/2,F=(I.min[2]+I.max[2])/2;S(U,q,tt,J,O,tt/2,F,T===2?h.hull:h.container);for(let et of[-1,1]){let it=F+et*(J/2+.08);for(let gt=-q/2+8;gt<q/2-5;gt+=16)S(U,2.5,tt-12,.6,O+gt,tt/2,it,h.steel);S(U,q-8,5,.8,O,5,it,h.black),S(U,q-8,4,.8,O,tt-4,it,h.black),S(U,q-16,1.3,1,O,tt-10,it,Y%3?m:M);let H=ct(U,`${T===0?"NDC":T===1?"SKY":"RX9"} / ${String(Y+1).padStart(2,"0")}`,O,tt*.59,it+et*.7,Math.min(q*.55,98),Math.min(23,tt*.24),Y%3?"#8be7f1":"#ffb56f",et<0?Math.PI:0);for(let gt of[-1,1])S(U,4,Math.min(24,tt*.3),1,O+gt*(q*.5-12),tt*.3,it,h.warm)}for(let et of[-1,1]){let it=O+et*(q/2+.1);for(let H=-J/2+12;H<J/2-5;H+=22)S(U,.6,tt-12,2.5,it,tt/2,F+H,h.black);S(U,1,1.3,J-12,it,tt-10,F,m)}for(let et=-q/2+12;et<q/2-4;et+=24)S(U,2,.5,J-8,O+et,tt+.1,F,h.black)});for(let I of[-1,1]){S(U,C*2,100,20,0,50,I*(C+10),h.hull),S(U,20,100,C*2,I*(C+10),50,0,h.hull);for(let Y=-C;Y<=C;Y+=100)v(U,[Y,104,I*(C+10)],[Y,136,I*(C+10)],2),v(U,[I*(C+10),104,Y],[I*(C+10),136,Y],2);v(U,[-C,137,I*(C+10)],[C,137,I*(C+10)],2),v(U,[I*(C+10),137,-C],[I*(C+10),137,C],2),S(U,C*2,2,2,0,101,I*(C-1),m),S(U,2,2,C*2,I*(C-1),101,0,m)}for(let I=0;I<62;I++){let Y=I*2.39996,q=C+330+I%4*360,tt=Math.sin(Y)*q,J=Math.cos(Y)*q,O=110+s()*150,F=100+s()*130,et=260+s()*1300;S(U,O,et,F,tt,et/2-90,J,h.hull),S(U,O*.7,50,F*.7,tt,et-70,J,h.black),v(U,[tt,et-50,J],[tt,et+60+s()*100,J],2,h.steel),P(U,3,tt,et+65,J,I%3?M:m);for(let it=25;it<et-110;it+=26)for(let H=-O/2+10;H<O/2-8;H+=18)s()>.35&&(R(U,new Nn(7,9),s()>.77?M:m,tt+H,it,J-F/2-.4).rotation.y=Math.PI,R(U,new Nn(7,9),s()>.77?M:m,tt+H,it,J+F/2+.4));for(let it=-F/2+10;it<F/2-8;it+=21)S(U,.5,et*.6,2,tt+O/2+.3,et*.4,J+it,I%3?h.steel:m);if(I%7===0){let it=R(U,new Ci(O*.7,2,5,32),m,tt,et*.7,J);it.rotation.x=Math.PI/2,S(U,8,et*.3,8,tt+O*.5,et*.6,J,M)}}if(T===0){for(let I of[-1,1]){let Y=I*(C+190);for(let q of[-700,700]){for(let tt of[-65,65])v(U,[Y+tt,-45,q],[Y+tt,530,q],12,h.steel),v(U,[Y-65,0,q],[Y+65,260,q],5,h.steel),v(U,[Y+65,260,q],[Y-65,510,q],5,h.steel);S(U,500,22,30,Y+I*140,535,q,h.container);for(let tt=-100;tt<=300;tt+=55)v(U,[Y+I*tt,535,q],[Y+I*(tt+55),585,q],3,h.steel),v(U,[Y+I*tt,585,q],[Y+I*(tt+55),535,q],3,h.steel);v(U,[Y-100,585,q],[Y+450,585,q],4,h.steel),v(U,[Y+I*180,535,q],[Y+I*180,200,q],1.1,h.black),S(U,34,15,12,Y+I*180,193,q,M)}for(let q=-1e3;q<1100;q+=180){S(U,150,50,130,Y,-25,q,h.container);for(let tt=-60;tt<=60;tt+=15)S(U,2,46,132,Y+tt,-25,q,h.steel)}}ct(U,"NEON DOCKS  /  07",0,185,-C-14,420,44,"#ffaa67")}else if(T===1){for(let I of[-1,1]){for(let Y of[-600,300,900]){let q=I*(C+150);b(U,70,280,q,60,Y,h.steel,20);for(let tt of[60,140,220]){let J=R(U,new Ci(110,3,6,32),m,q,tt,Y);J.rotation.x=Math.PI/2}v(U,[q,-70,Y],[q,520,Y],4,h.steel),P(U,6,q,530,Y,M)}S(U,170,C*.12,C*2,I*(C+300),-80,0,h.hull)}ct(U,"SKYLINE ARRAY",0,190,-C-14,400,48,"#bba2ff")}else{for(let I of[-1,1])for(let Y of[-C-160,C+160]){b(U,100,420,Y,140,I*550,h.hull,24);for(let q of[0,120,240,350])b(U,105,8,Y,q,I*550,M,24);A(U,[[Y,340,I*550],[Y,460,I*550],[0,460,I*(C+160)]],15,h.steel)}ct(U,"REACTOR NINE",0,200,-C-14,400,48,"#ffb060")}for(let I=0;I<2;I++){let Y=V.sites[I],q=R(U,new cr(112,115,48),I?M:m,Y[0],.35,Y[2]);q.rotation.x=-Math.PI/2}Z(U),U.updateMatrixWorld(!0),U.traverse(I=>{I.matrixAutoUpdate=!1,I.material?.emissiveIntensity>1&&(I.castShadow=!1)})}function ne(){t.forEach(U=>U.dispose()),e.forEach(U=>U.dispose())}return{m:h,armor:u,glow:d,team:_,robot:$,gun:ot,equipment:st,weaponModel:pt,sign:rt,dressMap:Pt,plate:x,beam:v,bake:Z,dispose:ne}}function qu(i,t=2400){let e=new ae(new ai(8e3,24,12),new Ve({side:Re,depthWrite:!1,uniforms:{},vertexShader:"varying vec3 vPos;void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec3 vPos;float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}void main(){vec3 d=normalize(vPos);float h=max(d.y,0.);vec2 p=d.xz/(.4+h)*4.;float n=noise(p)*.5+noise(p*2.)*.25+noise(p*4.)*.125;vec3 c=mix(vec3(.055,.12,.17),vec3(.006,.014,.029),pow(h,.5));c+=n*vec3(.045,.065,.075)*smoothstep(.0,.2,h);c+=pow(max(0.,1.-abs(d.x+.6)*1.1),7.)*.025*vec3(1.,.45,.2);gl_FragColor=vec4(c,1.);}"}));e.frustumCulled=!1,i.add(e);let n=99,s=()=>(n=Math.imul(n,1664525)+1013904223>>>0,n/4294967296),r=new Float32Array(1800*3);for(let l=0;l<r.length;l+=3)r[l]=(s()-.5)*t*2,r[l+1]=s()*650,r[l+2]=(s()-.5)*t*2;let a=new be;a.setAttribute("position",new Fe(r,3));let o=new Ve({transparent:!0,depthWrite:!1,uniforms:{time:{value:0}},vertexShader:"uniform float time;varying float alpha;void main(){vec3 p=position;p.y=mod(p.y-time*280.,650.);vec4 mv=modelViewMatrix*vec4(p,1.);alpha=clamp(1.-length(mv.xyz)/2800.,0.,1.)*.2;gl_PointSize=clamp(1100./-mv.z,1.,3.);gl_Position=projectionMatrix*mv;}",fragmentShader:"varying float alpha;void main(){gl_FragColor=vec4(.55,.8,.92,alpha);}"}),c=new Ks(a,o);return c.frustumCulled=!1,i.add(c),{frame(l,h,f){c.visible=!h&&!f,o.uniforms.time.value=l/1e3},dispose(){i.remove(e,c),e.geometry.dispose(),e.material.dispose(),a.dispose(),o.dispose()}}}var mi=(i,t=0)=>new ln({color:i,roughness:.55,metalness:.55,emissive:t,emissiveIntensity:1.6});function Yu(i,t){let e=new Fo({canvas:i,antialias:!1,powerPreference:"high-performance"});e.outputColorSpace=Le,e.toneMapping=gr,e.toneMappingExposure=1.05,e.shadowMap.enabled=!0,e.shadowMap.autoUpdate=!1,e.shadowMap.type=Pi;let n=new wi,s=new Ue(80,1,.5,9e3);s.rotation.order="YXZ",n.add(s),n.add(new fr(9420254,1183771,.85));let r=new gs(11655153,2);r.position.set(-800,1400,500),n.add(r),r.castShadow=!0,r.shadow.mapSize.set(1024,1024),r.shadow.normalBias=1.2,r.shadow.bias=-1e-4;let a=new Ts(e),o=new zo,c=a.fromScene(o,.05);n.environment=c.texture,n.environmentIntensity=.5,o.dispose(),a.dispose();let l=mi("#162536"),h=mi("#121922"),f=mi("#607187"),u=mi("#253849"),d=mi("#c2ccdb"),_=t.heroes.map(J=>mi(J.color,J.color)),M=[mi("#26dfff","#26dfff"),mi("#ff7e5d","#ff7e5d")];function m(J,O,F,et,it,H,gt,Lt){let Ut=new ae(new $e(O,F,et),Lt);return Ut.position.set(it,H,gt),Ut.castShadow=!0,Ut.receiveShadow=!0,J.add(Ut),Ut}function p(J,O,F,et,it,H,gt){let Lt=new ae(new ri(O,O,F,12),gt);return Lt.position.set(et,it,H),Lt.castShadow=!0,Lt.receiveShadow=!0,J.add(Lt),Lt}function w(J,O="#8ae6ff",F=512,et=128){let it=document.createElement("canvas");it.width=F,it.height=et;let H=it.getContext("2d");H.fillStyle="#08121f",H.fillRect(0,0,F,et),H.strokeStyle=O,H.lineWidth=5,H.strokeRect(8,8,F-16,et-16),H.font="bold 56px monospace",H.textAlign="center",H.textBaseline="middle",H.fillStyle=O,H.fillText(J,F/2,et/2);let gt=new ii(it);return gt.colorSpace=Le,new Dn({map:gt,side:Je})}function R(J){let O=new Map;for(let F of[...J.children])if(F.isMesh){F.updateMatrix();let et=F.geometry.clone().applyMatrix4(F.matrix);O.has(F.material)||O.set(F.material,[]),O.get(F.material).push(et),J.remove(F),F.geometry.dispose()}for(let[F,et]of O){let it=new ae(Vo(et),F);it.castShadow=!0,it.receiveShadow=!0,J.add(it),et.forEach(H=>H.dispose())}}let x=Xu(e),S=qu(n),b=[],P=new gs(16746564,1.5);P.position.set(900,700,-1100),n.add(P);function v(J,O,F){let et=x.robot(J,O,F);return n.add(et.rig),et}for(let J=0;J<10;J++)b.push(v(J,J%6));let A=0,D=t.weapons.map((J,O)=>{let F=x.gun(O);return s.add(F),F.visible=!1,F}),z=new Ii(8448767,0,160,2);s.add(z),z.position.set(5,-4,-30);let X=new Me,Z=-1,B=Math.min(devicePixelRatio||1,1.5),$=80;n.add(X);let ot=[];function st(){X.traverse(J=>J.geometry?.dispose()),n.remove(X);for(let J of ot)J.map?.dispose(),J.dispose();ot.length=0,X=new Me,n.add(X)}function pt(J){if(Z===J)return;Z=J,st();let O=t.maps[J],F=O.extent;Object.assign(r.shadow.camera,{left:-F,right:F,top:F,bottom:-F,near:1,far:5e3}),r.shadow.camera.updateProjectionMatrix(),n.background=new $t(O.colors[0]),n.fog=new Xs(1452859,28e-5),x.dressMap(X,O,J),e.shadowMap.needsUpdate=!0}let rt=[];for(let J=0;J<40;J++){let O=new ln({color:"#b4c1d8",transparent:!0,opacity:.93,roughness:1,depthWrite:!1}),F=new ae(new ai(1,12,8),O);F.visible=!1,n.add(F),rt.push(F)}let ct=new Me;m(ct,20,10,16,0,5,0,h),m(ct,14,2,10,0,11,0,_[4]),n.add(ct);let ht=[];for(let J=0;J<32;J++){let O=new ae(new ri(.6,.6,1,4),new Dn({color:"#baf6ff",transparent:!0,opacity:.6}));O.visible=!1,n.add(O),ht.push({mesh:O,until:0})}let Ft=0,Pt=0;function ne(J,O,F){let et=new N(-Math.sin(O.yaw)*Math.cos(O.pitch),Math.sin(O.pitch),-Math.cos(O.yaw)*Math.cos(O.pitch)),it=ht[Ft++%ht.length];it.mesh.position.set(O.position[0],O.position[1]+50,O.position[2]).addScaledVector(et,130),it.mesh.quaternion.setFromUnitVectors(new N(0,1,0),et),it.mesh.scale.y=230,it.until=F+55,it.mesh.visible=!0,J===U&&(Pt=F+40)}let U=0,V=-1,T=Array.from({length:10},()=>new N);function C(J,O,F,et,{active:it=!1,yaw:H=0,pitch:gt=0,local:Lt=null,reduced:Ut=!1,weapon:qt=0}={}){if(U=O,J){pt(J.config.map);for(let vt of J.players){let E=b[vt.slot];(E.hero!==vt.hero||E.weapon!==vt.weapon)&&(n.remove(E.rig),E.rig.traverse(K=>K.geometry?.dispose()),b[vt.slot]=E=v(vt.slot,vt.hero,vt.weapon)),E.rig.visible=vt.alive&&(vt.slot!==O||!it);let g=T[vt.slot].fromArray(vt.position);E.rig.position.distanceTo(g)>200?E.rig.position.copy(g):E.rig.position.lerp(g,1-Math.exp(-et*20)),E.rig.rotation.y=vt.yaw,E.head.rotation.x=vt.pitch*.65,E.rig.scale.y=vt.crouch?.7:1;let W=Ut?0:Math.sin(F*.012)*Math.min(.6,Math.hypot(vt.velocity[0],vt.velocity[2])/400);E.legs[0].rotation.x=W,E.legs[1].rotation.x=-W}for(let vt=0;vt<rt.length;vt++){let E=J.utilities[vt],g=rt[vt];g.visible=!!E,E&&(g.position.fromArray(E.position),g.scale.setScalar(E.kind===2&&E.fuse===0?175:6),g.material.opacity=E.kind===2&&E.fuse===0?Math.min(.93,E.life/64):E.fuse===0?.12:1,g.material.color.set(t.items[E.kind]?.color||"#b4c1d8"),E.fuse===0&&E.kind===5&&g.scale.set(450,3,450),E.fuse===0&&E.kind===10&&g.scale.set(220,3,220))}if(ct.visible=J.config.mode==="demolition"&&(J.objective.planted||J.objective.carrier===null),ct.position.fromArray(J.objective.position),J.tick!==V){V=J.tick;for(let vt of J.events)vt.kind==="shot"&&ne(vt.actor,J.players[vt.actor],F)}let L=J.players[O];if(A!==L.hero){A=L.hero;for(let vt=0;vt<D.length;vt++)s.remove(D[vt]),D[vt].traverse(E=>E.geometry?.dispose()),D[vt]=x.gun(vt,A),s.add(D[vt])}if(it&&L.alive)s.position.fromArray(Lt||L.position),s.position.y+=L.crouch?37:56,s.rotation.set(gt,H,0,"YXZ");else if(it){let vt=J.players.find(E=>E.team===L.team&&E.alive);vt?(s.position.fromArray(vt.position),s.position.y+=63,s.rotation.set(vt.pitch,vt.yaw,0,"YXZ")):(s.position.set(0,700,900),s.lookAt(0,0,0))}else{let vt=Ut?.6:F*35e-6;s.position.set(Math.sin(vt)*t.maps[Z].extent*.8,400,Math.cos(vt)*t.maps[Z].extent*.8),s.lookAt(0,40,0)}for(let vt=0;vt<D.length;vt++){let E=D[vt];E.visible=it&&L.alive&&vt===L.weapon&&!L.scoped;let g=Ut?0:Math.sin(F*.012)*Math.min(.3,Math.hypot(L.velocity[0],L.velocity[2])/900);E.position.set(9*Math.min(1,s.aspect),-9+g,-23+(F<Pt?1:0)),E.rotation.z=L.reload?-.35:0}let Qt=L.scoped&&it?38:$;s.fov!==Qt&&(s.fov=Qt,s.updateProjectionMatrix())}else{pt(Z<0?0:Z),b.forEach(Qt=>Qt.rig.visible=!1),D.forEach(Qt=>Qt.visible=!1);let L=Ut?.6:F*4e-5;s.position.set(Math.sin(L)*1e3,400,Math.cos(L)*1e3),s.lookAt(0,30,0)}S.frame(F,Ut,B<1),z.intensity=Ut?0:F<Pt?150:0;for(let L of ht)L.until<F&&(L.mesh.visible=!1);e.render(n,s)}function I(J=$){$=J;let O=innerWidth,F=innerHeight;e.setPixelRatio(Math.min(B,Math.sqrt(3840*2160/(O*F)))),e.setSize(O,F,!1),s.aspect=O/F,s.fov=$,s.updateProjectionMatrix()}function Y(J){B=Math.min(J,1.5),I()}function q(){S.dispose(),x.dispose(),n.traverse(J=>{if(J.geometry?.dispose(),J.material)for(let O of Array.isArray(J.material)?J.material:[J.material])O.map?.dispose(),O.dispose()}),c.dispose(),e.dispose()}async function tt(){for(let J of b)J.rig.position.fromArray(t.maps[0].spawns[Math.floor(J.slot/5)][J.slot%5]);s.position.set(0,400,900),s.lookAt(0,30,0),await e.compileAsync(n,s),e.render(n,s),await new Promise(requestAnimationFrame)}return pt(0),I(),{preload:tt,renderer:e,scene:n,camera:s,setMap:pt,frame:C,resize:I,resolution:Y,dispose:q,shoot:ne}}function Mc(i,t){for(let e of t.obstacles){if(i[1]>=e.max[1])continue;let n=[e.min[0]-18,e.min[2]-18],s=[e.max[0]+18,e.max[2]+18];if(i[0]>n[0]&&i[0]<s[0]&&i[2]>n[1]&&i[2]<s[1]){let r=[i[0]-n[0],s[0]-i[0],i[2]-n[1],s[1]-i[2]],a=Math.min(...r);r[0]===a?i[0]=n[0]:r[1]===a?i[0]=s[0]:r[2]===a?i[2]=n[1]:i[2]=s[1]}}return i[0]=Math.max(-t.extent+20,Math.min(t.extent-20,i[0])),i[2]=Math.max(-t.extent+20,Math.min(t.extent-20,i[2])),i}function Zu(i,t,e={mobility:1}){let n=Math.max(1,Math.hypot(i.x,i.y)),s=t.speed*(e.mobility??1)*(i.crouch?.45:i.walk||i.scope?.55:1);return[(-Math.sin(i.yaw)*i.y+Math.cos(i.yaw)*i.x)/n*s,0,(-Math.cos(i.yaw)*i.y-Math.sin(i.yaw)*i.x)/n*s]}function $u(){try{return localStorage.getItem("utxoplay:quality")||"auto"}catch{return"auto"}}var Sc=class{constructor(t=2){this.max=t,this.ratio=t,this.slow=0,this.fast=0}sample(t,e="auto"){return e!=="auto"?(this.ratio=e==="low"?Math.min(1,this.max):this.max,this.slow=this.fast=0,this.ratio):(this.slow=t>24?this.slow+1:Math.max(0,this.slow-2),this.fast=t<18?this.fast+1:0,this.slow>=90&&(this.ratio=Math.max(.75,this.ratio-.25),this.slow=this.fast=0),this.fast>=600&&(this.ratio=Math.min(this.max,this.ratio+.25),this.fast=0),this.ratio)}};function Ju(i,{active:t=()=>!0,maxFps:e=60,onResolution:n}={}){let s=0,r=0,a=0,o=!1,c=$u(),l=0,h=0,f=0,u=new Sc(Math.min(globalThis.devicePixelRatio||1,2)),d=u.ratio;function _(p){if(s=0,o||document.hidden)return;s=requestAnimationFrame(_);let w=t(),R=1e3/(w?e:30);if(a&&p+.25<a)return;a=a?a+R:p+R,a<p&&(a=p+R);let x=r?Math.min(p-r,50):1e3/60;r=p;let S=w||c!=="auto"?u.sample(x,c):u.ratio;S!==d&&(d=S,n?.(d));let b=performance.now();i(p,x,d),f+=performance.now()-b,h++,p-l>=1e3&&(document.documentElement.dataset.renderFps=String(Math.round(h*1e3/(p-l))),document.documentElement.dataset.renderMs=(f/h).toFixed(2),document.documentElement.dataset.renderScale=d.toFixed(2),l=p,h=f=0)}function M(){cancelAnimationFrame(s),s=0,r=a=0,l=performance.now(),h=f=0,!document.hidden&&!o&&(s=requestAnimationFrame(_))}function m(){c=$u(),u.slow=u.fast=0}return document.addEventListener("visibilitychange",M),addEventListener("storage",m),addEventListener("utxoplay:quality",m),M(),()=>{o=!0,cancelAnimationFrame(s),document.removeEventListener("visibilitychange",M),removeEventListener("storage",m),removeEventListener("utxoplay:quality",m)}}function Ku(i){let t,e;function n(){try{return t??=new AudioContext,e||(e=t.createGain(),e.connect(t.destination)),e.gain.value=i().sound?(i().volume??.6)*.3:0,t.state==="suspended"&&t.resume(),t}catch{return null}}function s(r,a=.12,o=.2,c="triangle",l=0){let h=n();if(!h||!i().sound)return;let f=h.currentTime+l,u=h.createOscillator(),d=h.createGain();u.type=c,u.frequency.setValueAtTime(r,f),u.frequency.exponentialRampToValueAtTime(Math.max(25,r*.22),f+a),d.gain.setValueAtTime(.001,f),d.gain.exponentialRampToValueAtTime(o,f+.004),d.gain.exponentialRampToValueAtTime(.001,f+a),u.connect(d).connect(e),u.start(f),u.stop(f+a+.01),u.onended=()=>{u.disconnect(),d.disconnect()}}return{ready:n,shot:(r=0)=>{s([410,870,250,1200,95,670,1500,170,1900,740,1120,65][r]||410,.08+(r===11?.2:0),.38,"sawtooth"),s(75,.08,.22)},hit:()=>s(1450,.045,.18,"sine"),damage:()=>s(65,.2,.3),reload:()=>{s(620,.04,.12,"square"),s(900,.035,.1,"square",.09)},step:()=>s(55,.028,.04),win:()=>[440,660,880].forEach((r,a)=>s(r,.28,.16,"sine",a*.13)),dispose:()=>t?.close()}}var ft=i=>document.getElementById(i),Wo="/games/botstrike/api",Yn=ft("arena"),ye=await fetch("./spec.json").then(i=>{if(!i.ok)throw Error("World specification unavailable");return i.json()}),Ee={sensitivity:1,fov:80,sound:!0,volume:.6,motion:!0,touch:matchMedia("(pointer:coarse)").matches};try{let i=JSON.parse(localStorage.getItem("botstrike:settings")||"{}");for(let t of["sound","motion","touch"])typeof i[t]=="boolean"&&(Ee[t]=i[t]);for(let[t,e,n]of[["sensitivity",.4,2.5],["fov",65,95]])Number.isFinite(i[t])&&(Ee[t]=Math.max(e,Math.min(n,i[t])))}catch{}var Oi=Ku(()=>Ee),gi=new Set,Pc=0,Lc=0,yt=null,nn,sn,Ne=!1,bc=!1,Ac=!1,Ir=0,qn=0,Pr=0,ju=0,Rc,Cc=0,Ec=-1,Tc=null,Go=null,Qu=100,wc=!1,Ic=0,ed=0,nd=0;var C_=0,Xo=!1,qo=!1,Fi={x:0,y:0},Lr={},_i={},Bi=null,Xe=null,Rs=[],td=()=>!Ee.motion||matchMedia("(prefers-reduced-motion: reduce)").matches;function re(i,t){let e=ft(i),n=String(t);e.textContent!==n&&(e.textContent=n)}function qe(i,t=!1){re("status",i),ft("status").classList.toggle("error",t)}function I_(i,t){return`<img src="./art/hero-${t}.webp" width="360" height="450" alt="${i.name} in-game model" decoding="async">`}for(let[i,t]of ye.heroes.entries()){let e=document.createElement("button");e.className="hero-card",e.style.setProperty("--hero",t.color),e.innerHTML=I_(t,i)+`<b>${t.name}</b><small>${t.role.toUpperCase()}</small><span class="stats">${t.health} HP \xB7 ${t.armor} ARMOR</span>`,e.setAttribute("aria-label",t.name+", "+t.role),e.onclick=()=>id(i),ft("heroes").append(e)}function id(i){Pc=i,[...ft("heroes").children].forEach((e,n)=>e.setAttribute("aria-pressed",String(i===n)));let t=ye.heroes[i];re("hero-detail",`${t.ability.toUpperCase()} / ${t.cooldown}s cooldown \u2014 ${t.description} Speed ${t.speed}.`)}id(0);function sd(i,t,e,n=[],s=-1,r=null){let a=(e-16)/(t.extent*2),o=l=>[e/2+l[0]*a,e/2+l[2]*a];i.clearRect(0,0,e,e),i.fillStyle="#101e2b",i.fillRect(0,0,e,e),i.strokeStyle="#507388",i.strokeRect(8,8,e-16,e-16),i.fillStyle="#536678";for(let l of t.obstacles){let h=o(l.min);i.fillRect(h[0],h[1],(l.max[0]-l.min[0])*a,(l.max[2]-l.min[2])*a)}i.font=`bold ${Math.max(10,e/12)}px monospace`,i.textAlign="center";for(let[l,h]of t.sites.entries()){let f=o(h);i.fillStyle=l?"#ff9878":"#68e8ff",i.fillText(l?"B":"A",f[0],f[1])}let c=n[s];for(let l of n){if(!l.alive||c&&l.team!==c.team&&!l.revealed)continue;let h=o(l.position);i.fillStyle=l.slot===s?"#fff":l.team===c?.team?"#68e8ff":"#ff9878",i.beginPath(),i.arc(...h,l.slot===s?4:3,0,Math.PI*2),i.fill(),l.slot===s&&(i.strokeStyle="#fff",i.beginPath(),i.moveTo(...h),i.lineTo(h[0]-Math.sin(qn)*10,h[1]-Math.cos(qn)*10),i.stroke())}if(r?.planted){let l=o(r.position);i.strokeStyle="#ffce8e",i.lineWidth=2,i.strokeRect(l[0]-5,l[1]-5,10,10)}}for(let[i,t]of ye.maps.entries()){let e=document.createElement("button");e.className="map-card";let n=document.createElement("canvas");n.width=180,n.height=180,sd(n.getContext("2d"),t,180);let s=document.createElement("img");s.src="./art/map-"+i+".webp",s.alt=t.name+" in-game view",s.width=720,s.height=405,s.decoding="async",e.append(s,n);let r=document.createElement("span");r.innerHTML=`<b>${t.name}</b><small>${t.description}</small>`,e.append(r),e.onclick=()=>rd(i),ft("maps").append(e)}function rd(i){Lc=i,[...ft("maps").children].forEach((t,e)=>t.setAttribute("aria-pressed",String(i===e))),yt||nn?.setMap(i)}rd(0);function Dr(){gi.clear(),Xo=qo=!1,Fi={x:0,y:0},Lr={},_i={},ft("move-knob").style.transform="translate(0,0)"}function ad(){let i=Ne&&ft("buy-menu").hidden&&ft("scoreboard").hidden,t=(e,n)=>i&&(gi.has(e)||_i[n]||performance.now()<(Lr[n]||0));return{seq:++Ir,x:i?Math.max(-1,Math.min(1,(gi.has("KeyD")?1:0)-(gi.has("KeyA")?1:0)+Fi.x)):0,y:i?Math.max(-1,Math.min(1,(gi.has("KeyW")?1:0)-(gi.has("KeyS")?1:0)-Fi.y)):0,yaw:qn,pitch:Pr,fire:!!(i&&(Xo||_i.fire)),reload:t("KeyR","reload"),walk:t("ShiftLeft","walk")||t("ShiftRight","walk"),crouch:t("ControlLeft","crouch"),jump:t("Space","jump"),ability:t("KeyQ","skill"),interact:t("KeyE","interact"),scope:!!(i&&(qo||_i.scope)),weapon:Bi,item:t("KeyZ","flash")?1:t("KeyX","smoke")?2:t("KeyC","grenade")?3:t("KeyG","utility")?Number(ft("utility-choice").value):0}}function dn(){if(!(yt?.status!=="running"||sn?.readyState!==WebSocket.OPEN||document.hidden)){if(sn.bufferedAmount>16e3){sn.close();return}sn.send(JSON.stringify({type:"input",room:yt.id,input:ad()}))}}function Sn(){Ne=!1,Dr(),ft("panel").hidden=!1,ft("buy-menu").hidden=!0,ft("scoreboard").hidden=!0,document.documentElement.dataset.playing="false",document.pointerLockElement&&document.exitPointerLock?.(),dn()}async function rn(){if(yt?.status!=="running"||sn?.readyState!==WebSocket.OPEN){qe("Waiting for your squad connection\u2026");return}if(Oi.ready(),Ne=!0,ft("panel").hidden=!0,ft("buy-menu").hidden=!0,ft("scoreboard").hidden=!0,document.documentElement.dataset.playing="true",Dr(),Yn.focus(),!Ee.touch)try{await Yn.requestPointerLock()}catch{qe("Mouse capture unavailable: hold and drag to aim.")}dn()}async function xi(i,t={}){if(bc)return null;bc=!0;for(let e of["quick","practice","private","join","start","rematch"])ft(e).disabled=!0;try{let e=await fetch(Wo+"/action",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:i,...t}),signal:AbortSignal.timeout(15e3)}),n=await e.json();if(!e.ok)throw Error(n.error||"Request failed");return Dc(n),n}catch(e){return qe(e.message,!0),null}finally{bc=!1;for(let e of["quick","practice","private","join","start","rematch"])ft(e).disabled=!1}}var Yo=()=>({mode:ft("mode").value,map:Lc,hero:Pc,difficulty:Number(ft("difficulty").value)});ft("quick").onclick=async()=>{await xi("queue",Yo())&&rn()};ft("practice").onclick=async()=>{await xi("create",{...Yo(),kind:"practice"})&&rn()};ft("private").onclick=()=>xi("create",{...Yo(),kind:"private"});ft("start").onclick=async()=>{await xi("start")&&rn()};ft("join").onclick=async()=>{let i=ft("invite").value.trim().toLowerCase();if(!/^[a-f0-9]{24}$/.test(i)){qe("Enter the full 24-character invite code.",!0);return}await xi("join",{room:i,hero:Pc})&&rn()};ft("invite").onkeydown=i=>{i.key==="Enter"&&ft("join").click()};ft("resume").onclick=rn;ft("menu-toggle").onclick=()=>Ne?Sn():rn();ft("leave").onclick=()=>{Sn(),xi("leave")};ft("copy").onclick=()=>navigator.clipboard.writeText(yt.id).then(()=>qe("Invite copied.")).catch(()=>qe("Invite: "+yt.id));ft("rematch").onclick=async()=>{let i={...Yo(),mode:yt.config.mode,map:yt.config.map,kind:yt.kind};await xi("create",i)&&rn()};ft("export").onclick=async()=>{try{let i=await fetch(Wo+"/export");if(!i.ok)throw Error("Replay export unavailable");let t=URL.createObjectURL(await i.blob()),e=document.createElement("a");e.href=t,e.download="botstrike-"+yt.id+".json",e.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}catch(i){qe(i.message,!0)}};function od(){if(!yt?.state)return;let i=document.createDocumentFragment(),t=document.createElement("div");t.className="score-row",t.innerHTML="<span>PILOT / HERO</span><span>K</span><span>D</span><span>A</span><span>DMG</span>",i.append(t);for(let e of[...yt.state.players].sort((n,s)=>n.team-s.team||s.kills-n.kills)){let n=document.createElement("div");n.className="score-row",n.dataset.team=e.team,n.innerHTML=`<span><b>${e.slot===yt.slot?"YOU":yt.roster[e.slot].name}</b><br><small>${ye.heroes[e.hero].name}${e.alive?"":" \xB7 OFFLINE"}</small></span><span>${e.kills}</span><span>${e.deaths}</span><span>${e.assists}</span><span>${e.damage}</span>`,i.append(n)}ft("score-rows").replaceChildren(i)}function ld(){od(),ft("scoreboard").hidden=!1,Dr(),document.pointerLockElement&&document.exitPointerLock?.()}ft("score-open").onclick=ld;ft("score-close").onclick=()=>{Ne?rn():ft("scoreboard").hidden=!0};var cd=[...ye.weapons.map((i,t)=>({...i,item:t,kind:"weapon",index:t})),...ye.items.map((i,t)=>({...i,item:ye.weapons.length+t,kind:"equipment",index:t}))];for(let i of cd){let t=document.createElement("button");t.dataset.item=i.item,t.dataset.kind=i.kind,t.innerHTML=`<img src="./art/${i.kind}-${i.index}.webp" alt="${i.name} model" loading="lazy"><b>${i.name}</b><span class="armory-action"></span><small>${i.description}</small>`,t.onclick=async()=>{let e=yt?.state?.players[yt.slot];if(e){if(i.kind==="weapon"&&e.owned[i.index]){Bi=i.index,await rn();return}if(yt.state.phase==="buy"){await xi("buy",{item:i.item}),i.kind==="weapon"&&(Bi=null);return}i.kind==="equipment"&&i.index>0&&e.items[i.index]>0&&(ft("utility-choice").value=i.index,await rn(),Lr.utility=performance.now()+100,dn())}},ft("buy-items").append(t)}for(let[i,t]of ye.items.entries()){if(i===0)continue;let e=document.createElement("option");e.value=i,e.textContent=t.name,ft("utility-choice").append(e)}ft("utility-choice").value="2";for(let i of["weapon","equipment"]){let t=document.createElement("button");t.textContent=i==="weapon"?"WEAPONS / 12":"EQUIPMENT / 12",t.setAttribute("aria-pressed",String(i==="weapon")),t.onclick=()=>{for(let e of ft("armory-tabs").children)e.setAttribute("aria-pressed",String(e===t));for(let e of ft("buy-items").children)e.hidden=e.dataset.kind!==i},ft("armory-tabs").append(t)}for(let i of ft("buy-items").children)i.hidden=i.dataset.kind!=="weapon";function hd(){!yt?.state||yt.status!=="running"||(Dr(),ft("buy-menu").hidden=!1,document.pointerLockElement&&document.exitPointerLock?.(),ud())}function ud(){let i=yt?.state?.players[yt.slot];if(!i)return;let t=yt.state.phase==="buy";re("buy-balance",t?"\u20A1 "+i.credits+" AVAILABLE \xB7 "+Math.ceil(yt.state.phase_ticks/64)+"s BUY TIME":"FIELD LOADOUT \xB7 SELECT A WEAPON OR DEPLOY EQUIPMENT"),[...ft("buy-items").children].forEach((e,n)=>{let s=cd[n],r=s.kind==="weapon"&&i.owned[s.index],a=i.items[s.index]||0,o=s.kind==="equipment"&&(s.index===0?i.armor>=100:a>=s.capacity);e.disabled=!i.alive||!r&&(t?i.credits<s.cost||o:s.kind==="weapon"||s.index===0||a===0),e.querySelector(".armory-action").textContent=r?i.weapon===s.index?"EQUIPPED":"EQUIP":t?"\u20A1 "+s.cost+(s.kind==="equipment"&&s.index>0?" \xB7 "+a+"/"+s.capacity:""):s.index===0?"PASSIVE ARMOR":(s.activation==="throw"?"DEPLOY":"USE")+" \xB7 "+a,e.setAttribute("aria-pressed",String(r&&i.weapon===s.index))})}ft("buy-open").onclick=hd;ft("buy-close").onclick=()=>rn();function Dc(i){if(!("room"in i))return;let t=i.room;if(t&&yt?.id===t.id&&(t.state?.tick||0)<(yt.state?.tick||0))return;if(yt=t,ft("selection").hidden=!!yt,ft("room-info").hidden=!yt,ft("hud").hidden=!yt?.state,ft("touch").hidden=!yt||yt.status!=="running"||!Ee.touch,!yt){Tc=null,Xe=null,Sn(),qe("Choose your chassis. Find your squad.");return}yt.id!==Tc&&(Tc=yt.id,Ec=-1,Go=null,Xe=null,Ir=0,Bi=null,Rs.length=0,wc=!1,nn?.setMap(yt.config.map)),ft("start").hidden=yt.status!=="waiting"||!yt.host,ft("resume").hidden=yt.status!=="running",ft("copy").hidden=yt.kind==="practice",ft("rematch").hidden=!["finished","failed","interrupted","cancelled","expired"].includes(yt.status),ft("export").hidden=!yt.proof?.verified,re("room-title",`${ye.maps[yt.config.map].name} / ${yt.config.mode==="deathmatch"?"TEAM DEATHMATCH":"RELAY DEMOLITION"}`);let e=yt.roster.map((n,s)=>`${n.name}:${yt.state?.players[s]?.hero??yt.config.heroes[s]}:${n.connected}`).join("|");if(ft("roster").dataset.roster!==e&&(ft("roster").dataset.roster=e,ft("roster").innerHTML=yt.roster.map((n,s)=>`<div class="roster-seat" data-team="${Math.floor(s/5)}">${s===yt.slot?"YOU":n.name}<small>${ye.heroes[yt.state?.players[s]?.hero??yt.config.heroes[s]].name} \xB7 ${n.bot?"AI":n.connected?"CONNECTED":"AI COVER"}</small></div>`).join("")),yt.status==="waiting"&&(re("result-title","SQUAD ASSEMBLY"),re("room-status","Share the invite. The host starts when ready; bots fill every empty seat."),Sn()),yt.state&&yt.state.tick!==Ec){let n=yt.state,s=n.players[yt.slot],r=performance.now();Ec=n.tick,Ir=Math.max(Ir,s.last_seq),(!Xe||s.alive&&!wc)&&(Xe=[...s.position],qn=s.yaw,Pr=s.pitch),wc=s.alive,Go!==null&&s.ammo[s.weapon]<Go&&(Oi.shot(s.weapon),nn?.shoot(yt.slot,s,r),C_=r),Go=s.ammo[s.weapon],s.health<Qu&&s.alive&&(nd=r+500,Oi.damage()),Qu=s.health;for(let l of n.events)if((l.kind==="hit"||l.kind==="headshot")&&l.actor===yt.slot&&(ed=r+150,Oi.hit()),l.kind==="kill")for(Rs.push({text:`${l.actor===yt.slot?"YOU":yt.roster[l.actor].name} \u25B8 ${l.target===yt.slot?"YOU":yt.roster[l.target].name}`,until:r+5e3});Rs.length>4;)Rs.shift();re("score-a",n.score[0]),re("score-b",n.score[1]),re("phase",n.phase==="buy"?"BUY PHASE":n.phase==="round_end"?"ROUND COMPLETE":n.config.mode==="deathmatch"?"TEAM DEATHMATCH":"RELAY DEMOLITION");let a=Math.ceil((n.objective.planted?n.objective.fuse:n.phase_ticks)/64);re("clock",`${Math.floor(a/60)}:${String(a%60).padStart(2,"0")}`),re("round",n.config.mode==="deathmatch"?"FIRST TO 50":`ROUND ${n.round} \xB7 FIRST TO 13`);let o=ye.heroes[s.hero];re("hero-label",o.name+" / "+o.role.toUpperCase()),re("health",s.health),re("armor",s.armor),ft("health-bar").max=o.health,ft("health-bar").value=s.health,re("weapon-label",ye.weapons[s.weapon].name),re("ammo",s.ammo[s.weapon]),re("reserve","/ "+s.reserve[s.weapon]),re("reload-state",s.reload?"RELOADING "+(s.reload/64).toFixed(1)+"s":s.ammo[s.weapon]===0?"R \xB7 RELOAD":""),re("touch-skill",s.disabled?"EMP":s.skill_wait?Math.ceil(s.skill_wait/64)+"s":"SKILL"),ft("touch-scope").hidden=!ye.weapons[s.weapon].scoped,ft("touch-interact").hidden=n.config.mode!=="demolition",re("touch-utility",(ye.items[Number(ft("utility-choice").value)].activation==="throw"?"THROW ":"USE ")+s.items[Number(ft("utility-choice").value)]),re("gear-label",ye.items[Number(ft("utility-choice").value)].name+" \xD7 "+s.items[Number(ft("utility-choice").value)]+" \xB7 G");for(let l of ft("utility-choice").options)l.textContent=ye.items[Number(l.value)].name+" \xD7 "+s.items[Number(l.value)];re("skill-name",o.ability.toUpperCase()),re("skill-state",s.disabled?"EMP "+Math.ceil(s.disabled/64)+"s":s.skill_wait?Math.ceil(s.skill_wait/64)+"s":"Q \xB7 READY"),ft("scope").hidden=!s.scoped||!s.alive;let c="";if(n.config.mode==="demolition"){let l=s.team===n.attacker;c=n.objective.planted?l?"DEFEND THE RELAY":"HOLD E / USE TO DEFUSE":l?n.objective.carrier===yt.slot?"CARRYING RELAY \xB7 HOLD E / USE AT A OR B":"ESCORT THE RELAY TO A OR B":"DEFEND A AND B",n.objective.actor!==null&&(c+=" \xB7 "+(n.objective.progress/64).toFixed(1)+"s")}re("objective-hud",c),ft("buy-open").hidden=!s.alive,re("credits","\u20A1 "+s.credits),ft("buy-menu").hidden||ud(),ft("death").hidden=s.alive||n.phase==="buy"||n.phase==="round_end",re("respawn-label",n.config.mode==="deathmatch"?"REBOOT IN "+Math.ceil(s.respawn/64)+"s":"SPECTATING \xB7 NEXT ROUND"),sd(ft("radar").getContext("2d"),ye.maps[n.config.map],240,n.players,yt.slot,n.objective),ft("scoreboard").hidden||od()}if(yt.status==="running"&&(re("result-title","YOUR SQUAD IS LIVE"),re("room-status","The match continues while you are in the menu. Disconnected seats are covered by AI."),qe("Connected \xB7 "+(Ic?Math.round(Ic)+" ms":"squad ready"))),["finished","sealing"].includes(yt.status)){Sn();let n=yt.state?.winner===yt.state?.players[yt.slot]?.team;re("result-title",yt.state?.winner===null?"MATCH DRAW":n?"NETWORK SECURED":"RELAY LOST"),re("room-status",yt.status==="sealing"?"Verifying the complete native match replay\u2026":yt.proof?.verified?"Native replay verified. Your signed match export is ready.":"Match ended."),yt.status==="finished"&&qe("Match complete. Choose rematch or leave to change loadout.")}["failed","interrupted","expired","cancelled"].includes(yt.status)&&(Sn(),re("result-title","MATCH INTERRUPTED"),re("room-status",yt.error||"Start another match."),qe(yt.error||"Room closed.",!0))}function dd(){if(Ac)return;clearTimeout(Rc);let i=new WebSocket(location.origin.replace(/^http/,"ws")+Wo+"/socket");sn=i,i.onopen=()=>{i===sn&&(ju=0,Cc=performance.now())},i.onmessage=t=>{if(i===sn){Cc=performance.now();try{let e=JSON.parse(t.data);e.type==="state"?Dc(e):e.type==="pong"?Ic=performance.now()-e.time:e.type==="error"&&qe(e.error,!0)}catch{i.close()}}},i.onclose=()=>{Ac||i!==sn||(Sn(),qe("Connection interrupted. Reconnecting; AI covers your seat."),Rc=setTimeout(dd,Math.min(1e4,500*2**Math.min(ju++,5))))},i.onerror=()=>{}}function fd(){for(let i of["sensitivity","fov"])Ee[i]=Number(ft(i).value);Ee.sound=ft("sound").checked,Ee.motion=ft("motion").checked,Ee.touch=ft("touch-controls").checked,document.documentElement.dataset.touch=String(Ee.touch),ft("touch").hidden=!Ee.touch||yt?.status!=="running";try{localStorage.setItem("botstrike:settings",JSON.stringify(Ee))}catch{}nn?.resize(Ee.fov)}for(let i of["sensitivity","fov","sound","motion","touch-controls"]){let t=i==="touch-controls"?"touch":i;typeof Ee[t]=="boolean"?ft(i).checked=Ee[t]:ft(i).value=Ee[t],ft(i).oninput=fd}fd();function pd(i,t){qn-=i*Ee.sensitivity*.0025,qn=Math.atan2(Math.sin(qn),Math.cos(qn)),Pr=Math.max(-1.5,Math.min(1.5,Pr-t*Ee.sensitivity*.0025))}addEventListener("keydown",i=>{if(i.target.closest("input,select,textarea"))return;if(i.code==="Escape"){Sn();return}if(!Ne)return;if(i.code==="Tab"){if(i.preventDefault(),!ft("scoreboard").hidden)return;ld();return}if(i.code==="KeyB"){i.preventDefault(),ft("buy-menu").hidden?hd():rn();return}let t=["Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal"].indexOf(i.code);t>=0&&(yt?.state?.players[yt.slot]?.owned[t]&&(Bi=t),i.preventDefault()),(i.code==="BracketLeft"||i.code==="BracketRight")&&(Nc(i.code==="BracketLeft"?-1:1),i.preventDefault()),["KeyW","KeyA","KeyS","KeyD","KeyR","KeyQ","KeyE","KeyZ","KeyX","KeyC","KeyG","ShiftLeft","ShiftRight","ControlLeft","Space"].includes(i.code)&&(i.preventDefault(),gi.add(i.code),dn())});addEventListener("keyup",i=>{gi.delete(i.code),dn(),i.code==="Tab"&&!ft("scoreboard").hidden&&rn()});Yn.oncontextmenu=i=>i.preventDefault();Yn.onmousedown=i=>{Ne&&(i.button===0&&(Xo=!0),i.button===2&&(qo=!0),Oi.ready(),dn())};addEventListener("mouseup",i=>{i.button===0&&(Xo=!1),i.button===2&&(qo=!1),dn()});addEventListener("mousemove",i=>{Ne&&ft("buy-menu").hidden&&ft("scoreboard").hidden&&(document.pointerLockElement===Yn||i.buttons&&i.target===Yn)&&pd(i.movementX,i.movementY)});var Ho=!1;document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===Yn?!Ne||!ft("buy-menu").hidden||!ft("scoreboard").hidden?(Ho=!1,document.exitPointerLock?.()):Ho=!0:Ho&&(Ho=!1,Ne&&ft("buy-menu").hidden&&ft("scoreboard").hidden&&Sn())});addEventListener("blur",Sn);document.addEventListener("visibilitychange",()=>{document.hidden&&Sn()});for(let[i,t]of[["move-pad","move"],["look-pad","look"],["touch-fire","fire"]]){let e=ft(i),n=null,s=null;e.onpointerdown=r=>{!Ne||n!==null||(r.preventDefault(),n=r.pointerId,s=[r.clientX,r.clientY],e.setPointerCapture(n),t==="fire"&&(_i.fire=!0,Oi.ready()))},e.onpointermove=r=>{if(n!==r.pointerId||!Ne)return;let a=r.clientX-s[0],o=r.clientY-s[1];if(t==="move"){let c=Math.max(40,Math.hypot(a,o));Fi={x:a/c,y:o/c},ft("move-knob").style.transform=`translate(${Fi.x*30}px,${Fi.y*30}px)`}else pd(a*1.5,o*1.5),s=[r.clientX,r.clientY]};for(let r of["pointerup","pointercancel","lostpointercapture"])e.addEventListener(r,a=>{a.pointerId===n&&(n=null,s=null,t==="move"&&(Fi={x:0,y:0},ft("move-knob").style.transform="translate(0,0)"),t==="fire"&&(_i.fire=!1),dn())})}for(let[i,t]of[["touch-skill","skill"],["touch-reload","reload"],["touch-scope","scope"],["touch-jump","jump"],["touch-crouch","crouch"],["touch-interact","interact"],["touch-utility","utility"]]){let e=null,n=ft(i);n.onpointerdown=s=>{!Ne||e!==null||(s.preventDefault(),e=s.pointerId,n.setPointerCapture(e),_i[t]=!0,Lr[t]=performance.now()+100,dn())};for(let s of["pointerup","pointercancel","lostpointercapture"])n.addEventListener(s,r=>{r.pointerId===e&&(e=null,_i[t]=!1,s!=="pointerup"&&(Lr[t]=0),dn())})}function Nc(i=1){let t=yt?.state?.players[yt.slot];if(t){let e=t.owned.map((n,s)=>n?s:-1).filter(n=>n>=0);Bi=e[(e.indexOf(Bi??t.weapon)+i+e.length)%e.length],dn()}}ft("touch-weapon").onclick=()=>Nc();Yn.addEventListener("wheel",i=>{Ne&&ft("buy-menu").hidden&&(i.preventDefault(),Nc(Math.sign(i.deltaY)||1))},{passive:!1});var md,gd,_d;try{qe("Preparing chassis and environment\u2026"),nn=Yu(Yn,ye),await nn.preload(),nn.setMap(Lc),nn.resize(Ee.fov),addEventListener("resize",()=>{Dr(),Xe=null,nn.resize(Ee.fov)});let i=await fetch(Wo+"/state",{signal:AbortSignal.timeout(15e3)});if(!i.ok)throw Error("Open BotStrike through UTXOPlay to start your session.");Dc(await i.json()),dd(),md=Ju((t,e)=>{let n=Math.min(.04,e/1e3),s=yt?.state,r=s?.players[yt.slot];if(r&&Xe){let o=ad();if(Ir--,Ne&&r.alive&&s.phase==="live"){o.scope=o.scope&&ye.weapons[r.weapon].scoped;let h=Zu(o,ye.heroes[r.hero],ye.weapons[r.weapon]);Xe[0]+=h[0]*n,Xe[2]+=h[2]*n,Mc(Xe,ye.maps[s.config.map])}let l=Math.hypot(Xe[0]-r.position[0],Xe[2]-r.position[2])>160?1:1-Math.exp(-n*14);for(let h=0;h<3;h++)Xe[h]+=(r.position[h]-Xe[h])*l;Mc(Xe,ye.maps[s.config.map]),ft("flash").style.opacity=String(r.flash?Math.min(td()?.45:.95,r.flash/64):0)}Ne&&ft("buy-menu").hidden&&ft("scoreboard").hidden&&nn.frame(s,yt?.slot||0,t,n,{active:Ne,yaw:qn,pitch:Pr,local:Xe,reduced:td()}),ft("hit-marker").style.opacity=t<ed?"1":"0",ft("damage").style.opacity=String(Math.max(0,(nd-t)/500)*.6);let a=Rs.filter(o=>o.until>t).map(o=>o.text).join("|");ft("kill-feed").dataset.feed!==a&&(ft("kill-feed").dataset.feed=a,ft("kill-feed").replaceChildren(...Rs.filter(o=>o.until>t).map(o=>{let c=document.createElement("div");return c.textContent=o.text,c}))),document.documentElement.dataset.drawCalls=nn.renderer.info.render.calls},{active:()=>Ne&&yt?.status==="running",maxFps:60,onResolution:t=>nn?.resolution(t)}),gd=setInterval(dn,1e3/32),_d=setInterval(()=>{if(sn?.readyState===WebSocket.OPEN){if(!document.hidden&&performance.now()-Cc>3e4){sn.close();return}sn.send(JSON.stringify({type:"ping",time:performance.now()}))}},2e3)}catch(i){ft("fatal").hidden=!1,re("fatal",i.message),qe("Unable to initialize BotStrike.",!0),console.error(i)}addEventListener("pagehide",()=>{Ac=!0,clearTimeout(Rc),clearInterval(gd),clearInterval(_d),sn?.close(),md?.(),nn?.dispose(),Oi.dispose()});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
