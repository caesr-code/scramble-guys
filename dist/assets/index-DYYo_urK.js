import{joinRoom as ql}from"https://esm.sh/trystero@0.20.1/torrent";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();const Xl="scramble-royale-v1";class kc{constructor(){this.room=null,this.roomCode=null,this.isHost=!1,this.peerId=Math.random().toString(36).slice(2,10),this.myName="Blob",this.peers=new Map,this.sendInput=null,this.getInput=null,this.sendState=null,this.getState=null,this.sendEvent=null,this.getEvent=null,this.sendLobby=null,this.getLobby=null,this.onPeerJoin=null,this.onPeerLeave=null,this.onLobbyUpdate=null,this.onStateReceived=null,this.onInputReceived=null,this.onEventReceived=null}_makeRoomCode(){const t="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let e="";for(let n=0;n<5;n++)e+=t[Math.floor(Math.random()*t.length)];return e}async host(t){return this.myName=t||"Blob",this.isHost=!0,this.roomCode=this._makeRoomCode(),this._joinRoom(this.roomCode),this.roomCode}async join(t,e){return this.myName=t||"Blob",this.isHost=!1,this.roomCode=e.toUpperCase(),this._joinRoom(this.roomCode),this.roomCode}_joinRoom(t){this.room=ql({appId:Xl},t);const[e,n]=this.room.makeAction("input"),[i,s]=this.room.makeAction("state"),[o,a]=this.room.makeAction("event"),[c,l]=this.room.makeAction("lobby");this.sendInput=e,this.sendState=i,this.sendEvent=o,this.sendLobby=c,n((h,d)=>this.onInputReceived&&this.onInputReceived(h,d)),s(h=>this.onStateReceived&&this.onStateReceived(h)),a((h,d)=>this.onEventReceived&&this.onEventReceived(h,d)),l((h,d)=>{this.peers.set(d,h),this.onLobbyUpdate&&this.onLobbyUpdate()}),this.room.onPeerJoin(h=>{this.sendLobby({name:this.myName,isHost:this.isHost}),this.onPeerJoin&&this.onPeerJoin(h)}),this.room.onPeerLeave(h=>{this.peers.delete(h),this.onPeerLeave&&this.onPeerLeave(h),this.onLobbyUpdate&&this.onLobbyUpdate()})}broadcastLobby(){this.sendLobby&&this.sendLobby({name:this.myName,isHost:this.isHost})}allPeerIds(){return Array.from(this.peers.keys())}leave(){this.room&&this.room.leave(),this.room=null,this.peers.clear()}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _o="165",Yl=0,ko=1,jl=2,Vc=1,Gc=2,yn=3,zn=0,Ne=1,Mn=2,On=0,Ii=1,Vo=2,Go=3,Wo=4,Kl=5,ti=100,Zl=101,$l=102,Jl=103,Ql=104,th=200,eh=201,nh=202,ih=203,so=204,ro=205,sh=206,rh=207,oh=208,ah=209,ch=210,lh=211,hh=212,uh=213,dh=214,fh=0,ph=1,mh=2,js=3,gh=4,vh=5,_h=6,xh=7,Wc=0,yh=1,Mh=2,Bn=0,Sh=1,Eh=2,wh=3,bh=4,Th=5,Ah=6,Ch=7,qc=300,Fi=301,Oi=302,oo=303,ao=304,sr=306,co=1e3,ii=1001,lo=1002,Ge=1003,Rh=1004,gs=1005,Ke=1006,mr=1007,si=1008,Hn=1009,Ph=1010,Lh=1011,Ks=1012,Xc=1013,Bi=1014,Nn=1015,rr=1016,Yc=1017,jc=1018,zi=1020,Ih=35902,Nh=1021,Dh=1022,rn=1023,Uh=1024,Fh=1025,Ni=1026,Hi=1027,Oh=1028,Kc=1029,Bh=1030,Zc=1031,$c=1033,gr=33776,vr=33777,_r=33778,xr=33779,qo=35840,Xo=35841,Yo=35842,jo=35843,Ko=36196,Zo=37492,$o=37496,Jo=37808,Qo=37809,ta=37810,ea=37811,na=37812,ia=37813,sa=37814,ra=37815,oa=37816,aa=37817,ca=37818,la=37819,ha=37820,ua=37821,yr=36492,da=36494,fa=36495,zh=36283,pa=36284,ma=36285,ga=36286,Hh=3200,kh=3201,Jc=0,Vh=1,In="",je="srgb",Vn="srgb-linear",xo="display-p3",or="display-p3-linear",Zs="linear",ne="srgb",$s="rec709",Js="p3",li=7680,va=519,Gh=512,Wh=513,qh=514,Qc=515,Xh=516,Yh=517,jh=518,Kh=519,_a=35044,xa="300 es",Sn=2e3,Qs=2001;class Gi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ya=1234567;const ss=Math.PI/180,ls=180/Math.PI;function Wi(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(be[r&255]+be[r>>8&255]+be[r>>16&255]+be[r>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]).toLowerCase()}function Me(r,t,e){return Math.max(t,Math.min(e,r))}function yo(r,t){return(r%t+t)%t}function Zh(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function $h(r,t,e){return r!==t?(e-r)/(t-r):0}function rs(r,t,e){return(1-e)*r+e*t}function Jh(r,t,e,n){return rs(r,t,1-Math.exp(-e*n))}function Qh(r,t=1){return t-Math.abs(yo(r,t*2)-t)}function tu(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function eu(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function nu(r,t){return r+Math.floor(Math.random()*(t-r+1))}function iu(r,t){return r+Math.random()*(t-r)}function su(r){return r*(.5-Math.random())}function ru(r){r!==void 0&&(ya=r);let t=ya+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ou(r){return r*ss}function au(r){return r*ls}function cu(r){return(r&r-1)===0&&r!==0}function lu(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function hu(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function uu(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),c=o(e/2),l=s((t+n)/2),h=o((t+n)/2),d=s((t-n)/2),u=o((t-n)/2),f=s((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":r.set(a*h,c*d,c*u,a*l);break;case"YZY":r.set(c*u,a*h,c*d,a*l);break;case"ZXZ":r.set(c*d,c*u,a*h,a*l);break;case"XZX":r.set(a*h,c*g,c*f,a*l);break;case"YXY":r.set(c*f,a*h,c*g,a*l);break;case"ZYZ":r.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ci(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Pe(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const ye={DEG2RAD:ss,RAD2DEG:ls,generateUUID:Wi,clamp:Me,euclideanModulo:yo,mapLinear:Zh,inverseLerp:$h,lerp:rs,damp:Jh,pingpong:Qh,smoothstep:tu,smootherstep:eu,randInt:nu,randFloat:iu,randFloatSpread:su,seededRandom:ru,degToRad:ou,radToDeg:au,isPowerOfTwo:cu,ceilPowerOfTwo:lu,floorPowerOfTwo:hu,setQuaternionFromProperEuler:uu,normalize:Pe,denormalize:Ci};class _t{constructor(t=0,e=0){_t.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Lt{constructor(t,e,n,i,s,o,a,c,l){Lt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l)}set(t,e,n,i,s,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=i[0],p=i[3],m=i[6],_=i[1],x=i[4],S=i[7],C=i[2],T=i[5],A=i[8];return s[0]=o*v+a*_+c*C,s[3]=o*p+a*x+c*T,s[6]=o*m+a*S+c*A,s[1]=l*v+h*_+d*C,s[4]=l*p+h*x+d*T,s[7]=l*m+h*S+d*A,s[2]=u*v+f*_+g*C,s[5]=u*p+f*x+g*T,s[8]=u*m+f*S+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*s*h+n*a*c+i*s*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*o-a*l,u=a*c-h*s,f=l*s-o*c,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=d*v,t[1]=(i*l-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=u*v,t[4]=(h*e-i*c)*v,t[5]=(i*s-a*e)*v,t[6]=f*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Mr.makeScale(t,e)),this}rotate(t){return this.premultiply(Mr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Mr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Mr=new Lt;function tl(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function tr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function du(){const r=tr("canvas");return r.style.display="block",r}const Ma={};function el(r){r in Ma||(Ma[r]=!0,console.warn(r))}function fu(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const Sa=new Lt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ea=new Lt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),vs={[Vn]:{transfer:Zs,primaries:$s,toReference:r=>r,fromReference:r=>r},[je]:{transfer:ne,primaries:$s,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[or]:{transfer:Zs,primaries:Js,toReference:r=>r.applyMatrix3(Ea),fromReference:r=>r.applyMatrix3(Sa)},[xo]:{transfer:ne,primaries:Js,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Ea),fromReference:r=>r.applyMatrix3(Sa).convertLinearToSRGB()}},pu=new Set([Vn,or]),Zt={enabled:!0,_workingColorSpace:Vn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!pu.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=vs[t].toReference,i=vs[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return vs[r].primaries},getTransfer:function(r){return r===In?Zs:vs[r].transfer}};function Di(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Sr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let hi;class mu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{hi===void 0&&(hi=tr("canvas")),hi.width=t.width,hi.height=t.height;const n=hi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=hi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=tr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Di(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Di(e[n]/255)*255):e[n]=Di(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let gu=0;class nl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=Wi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Er(i[o].image)):s.push(Er(i[o]))}else s=Er(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Er(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?mu.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vu=0;class De extends Gi{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,n=ii,i=ii,s=Ke,o=si,a=rn,c=Hn,l=De.DEFAULT_ANISOTROPY,h=In){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=Wi(),this.name="",this.source=new nl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==qc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case co:t.x=t.x-Math.floor(t.x);break;case ii:t.x=t.x<0?0:1;break;case lo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case co:t.y=t.y-Math.floor(t.y);break;case ii:t.y=t.y<0?0:1;break;case lo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null;De.DEFAULT_MAPPING=qc;De.DEFAULT_ANISOTROPY=1;class Se{constructor(t=0,e=0,n=0,i=1){Se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(l+1)/2,S=(f+1)/2,C=(m+1)/2,T=(h+u)/4,A=(d+v)/4,N=(g+p)/4;return x>S&&x>C?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=T/n,s=A/n):S>C?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=T/i,s=N/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=A/s,i=N/s),this.set(n,i,s,e),this}let _=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(p-g)/_,this.y=(d-v)/_,this.z=(u-h)/_,this.w=Math.acos((l+f+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _u extends Gi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ke,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new De(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new nl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends _u{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class il extends De{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class xu extends De{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let hs=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3];const u=s[o+0],f=s[o+1],g=s[o+2],v=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(d!==v||c!==u||l!==f||h!==g){let p=1-a;const m=c*u+l*f+h*g+d*v,_=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const C=Math.sqrt(x),T=Math.atan2(C,m*_);p=Math.sin(p*T)/C,a=Math.sin(a*T)/C}const S=a*_;if(c=c*p+u*S,l=l*p+f*S,h=h*p+g*S,d=d*p+v*S,p===1-a){const C=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=C,l*=C,h*=C,d*=C}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=s[o],u=s[o+1],f=s[o+2],g=s[o+3];return t[e]=a*g+h*d+c*f-l*u,t[e+1]=c*g+h*u+l*d-a*f,t[e+2]=l*g+h*f+a*u-c*d,t[e+3]=h*g-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),d=a(s/2),u=c(n/2),f=c(i/2),g=c(s/2);switch(o){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(s-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-s*c,this._y=i*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class F{constructor(t=0,e=0,n=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(wa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(wa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-s*i),d=2*(s*n-o*e);return this.x=e+c*l+o*d-a*h,this.y=n+c*h+a*l-s*d,this.z=i+c*d+s*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return wr.copy(this).projectOnVector(t),this.sub(wr)}reflect(t){return this.sub(wr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wr=new F,wa=new hs;class us{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(We.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(We.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=We.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,We):We.fromBufferAttribute(s,o),We.applyMatrix4(t.matrixWorld),this.expandByPoint(We);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_s.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_s.copy(n.boundingBox)),_s.applyMatrix4(t.matrixWorld),this.union(_s)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,We),We.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xi),xs.subVectors(this.max,Xi),ui.subVectors(t.a,Xi),di.subVectors(t.b,Xi),fi.subVectors(t.c,Xi),bn.subVectors(di,ui),Tn.subVectors(fi,di),qn.subVectors(ui,fi);let e=[0,-bn.z,bn.y,0,-Tn.z,Tn.y,0,-qn.z,qn.y,bn.z,0,-bn.x,Tn.z,0,-Tn.x,qn.z,0,-qn.x,-bn.y,bn.x,0,-Tn.y,Tn.x,0,-qn.y,qn.x,0];return!br(e,ui,di,fi,xs)||(e=[1,0,0,0,1,0,0,0,1],!br(e,ui,di,fi,xs))?!1:(ys.crossVectors(bn,Tn),e=[ys.x,ys.y,ys.z],br(e,ui,di,fi,xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,We).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(We).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const un=[new F,new F,new F,new F,new F,new F,new F,new F],We=new F,_s=new us,ui=new F,di=new F,fi=new F,bn=new F,Tn=new F,qn=new F,Xi=new F,xs=new F,ys=new F,Xn=new F;function br(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Xn.fromArray(r,s);const a=i.x*Math.abs(Xn.x)+i.y*Math.abs(Xn.y)+i.z*Math.abs(Xn.z),c=t.dot(Xn),l=e.dot(Xn),h=n.dot(Xn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const yu=new us,Yi=new F,Tr=new F;let Mo=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):yu.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Yi.subVectors(t,this.center);const e=Yi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Yi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Tr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Yi.copy(t.center).add(Tr)),this.expandByPoint(Yi.copy(t.center).sub(Tr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}};const dn=new F,Ar=new F,Ms=new F,An=new F,Cr=new F,Ss=new F,Rr=new F;let Mu=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(dn.copy(this.origin).addScaledVector(this.direction,e),dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ar.copy(t).add(e).multiplyScalar(.5),Ms.copy(e).sub(t).normalize(),An.copy(this.origin).sub(Ar);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Ms),a=An.dot(this.direction),c=-An.dot(Ms),l=An.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*c-a,u=o*a-c,g=s*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ar).addScaledVector(Ms,u),f}intersectSphere(t,e){dn.subVectors(t.center,this.origin);const n=dn.dot(this.direction),i=dn.dot(dn)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),h>=0?(s=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,dn)!==null}intersectTriangle(t,e,n,i,s){Cr.subVectors(e,t),Ss.subVectors(n,t),Rr.crossVectors(Cr,Ss);let o=this.direction.dot(Rr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;An.subVectors(this.origin,t);const c=a*this.direction.dot(Ss.crossVectors(An,Ss));if(c<0)return null;const l=a*this.direction.dot(Cr.cross(An));if(l<0||c+l>o)return null;const h=-a*An.dot(Rr);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class ae{constructor(t,e,n,i,s,o,a,c,l,h,d,u,f,g,v,p){ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l,h,d,u,f,g,v,p)}set(t,e,n,i,s,o,a,c,l,h,d,u,f,g,v,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/pi.setFromMatrixColumn(t,0).length(),s=1/pi.setFromMatrixColumn(t,1).length(),o=1/pi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=o*h,f=o*d,g=a*h,v=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=u-v*l,e[9]=-a*c,e[2]=v-u*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,g=l*h,v=l*d;e[0]=u+v*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+u*a,e[10]=o*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,g=l*h,v=l*d;e[0]=u-v*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const u=o*h,f=o*d,g=a*h,v=a*d;e[0]=c*h,e[4]=g*l-f,e[8]=u*l+v,e[1]=c*d,e[5]=v*l+u,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,f=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=v-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+g,e[10]=u-v*d}else if(t.order==="XZY"){const u=o*c,f=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+v,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Su,t,Eu)}lookAt(t,e,n){const i=this.elements;return Fe.subVectors(t,e),Fe.lengthSq()===0&&(Fe.z=1),Fe.normalize(),Cn.crossVectors(n,Fe),Cn.lengthSq()===0&&(Math.abs(n.z)===1?Fe.x+=1e-4:Fe.z+=1e-4,Fe.normalize(),Cn.crossVectors(n,Fe)),Cn.normalize(),Es.crossVectors(Fe,Cn),i[0]=Cn.x,i[4]=Es.x,i[8]=Fe.x,i[1]=Cn.y,i[5]=Es.y,i[9]=Fe.y,i[2]=Cn.z,i[6]=Es.z,i[10]=Fe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],p=n[10],m=n[14],_=n[3],x=n[7],S=n[11],C=n[15],T=i[0],A=i[4],N=i[8],w=i[12],M=i[1],R=i[5],H=i[9],P=i[13],U=i[2],B=i[6],I=i[10],j=i[14],V=i[3],Z=i[7],ot=i[11],at=i[15];return s[0]=o*T+a*M+c*U+l*V,s[4]=o*A+a*R+c*B+l*Z,s[8]=o*N+a*H+c*I+l*ot,s[12]=o*w+a*P+c*j+l*at,s[1]=h*T+d*M+u*U+f*V,s[5]=h*A+d*R+u*B+f*Z,s[9]=h*N+d*H+u*I+f*ot,s[13]=h*w+d*P+u*j+f*at,s[2]=g*T+v*M+p*U+m*V,s[6]=g*A+v*R+p*B+m*Z,s[10]=g*N+v*H+p*I+m*ot,s[14]=g*w+v*P+p*j+m*at,s[3]=_*T+x*M+S*U+C*V,s[7]=_*A+x*R+S*B+C*Z,s[11]=_*N+x*H+S*I+C*ot,s[15]=_*w+x*P+S*j+C*at,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],v=t[7],p=t[11],m=t[15];return g*(+s*c*d-i*l*d-s*a*u+n*l*u+i*a*f-n*c*f)+v*(+e*c*f-e*l*u+s*o*u-i*o*f+i*l*h-s*c*h)+p*(+e*l*d-e*a*f-s*o*d+n*o*f+s*a*h-n*l*h)+m*(-i*a*h-e*c*d+e*a*u+i*o*d-n*o*u+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],v=t[13],p=t[14],m=t[15],_=d*p*l-v*u*l+v*c*f-a*p*f-d*c*m+a*u*m,x=g*u*l-h*p*l-g*c*f+o*p*f+h*c*m-o*u*m,S=h*v*l-g*d*l+g*a*f-o*v*f-h*a*m+o*d*m,C=g*d*c-h*v*c-g*a*u+o*v*u+h*a*p-o*d*p,T=e*_+n*x+i*S+s*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return t[0]=_*A,t[1]=(v*u*s-d*p*s-v*i*f+n*p*f+d*i*m-n*u*m)*A,t[2]=(a*p*s-v*c*s+v*i*l-n*p*l-a*i*m+n*c*m)*A,t[3]=(d*c*s-a*u*s-d*i*l+n*u*l+a*i*f-n*c*f)*A,t[4]=x*A,t[5]=(h*p*s-g*u*s+g*i*f-e*p*f-h*i*m+e*u*m)*A,t[6]=(g*c*s-o*p*s-g*i*l+e*p*l+o*i*m-e*c*m)*A,t[7]=(o*u*s-h*c*s+h*i*l-e*u*l-o*i*f+e*c*f)*A,t[8]=S*A,t[9]=(g*d*s-h*v*s-g*n*f+e*v*f+h*n*m-e*d*m)*A,t[10]=(o*v*s-g*a*s+g*n*l-e*v*l-o*n*m+e*a*m)*A,t[11]=(h*a*s-o*d*s-h*n*l+e*d*l+o*n*f-e*a*f)*A,t[12]=C*A,t[13]=(h*v*i-g*d*i+g*n*u-e*v*u-h*n*p+e*d*p)*A,t[14]=(g*a*i-o*v*i-g*n*c+e*v*c+o*n*p-e*a*p)*A,t[15]=(o*d*i-h*a*i+h*n*c-e*d*c-o*n*u+e*a*u)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,h=o+o,d=a+a,u=s*l,f=s*h,g=s*d,v=o*h,p=o*d,m=a*d,_=c*l,x=c*h,S=c*d,C=n.x,T=n.y,A=n.z;return i[0]=(1-(v+m))*C,i[1]=(f+S)*C,i[2]=(g-x)*C,i[3]=0,i[4]=(f-S)*T,i[5]=(1-(u+m))*T,i[6]=(p+_)*T,i[7]=0,i[8]=(g+x)*A,i[9]=(p-_)*A,i[10]=(1-(u+v))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=pi.set(i[0],i[1],i[2]).length();const o=pi.set(i[4],i[5],i[6]).length(),a=pi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],qe.copy(this);const l=1/s,h=1/o,d=1/a;return qe.elements[0]*=l,qe.elements[1]*=l,qe.elements[2]*=l,qe.elements[4]*=h,qe.elements[5]*=h,qe.elements[6]*=h,qe.elements[8]*=d,qe.elements[9]*=d,qe.elements[10]*=d,e.setFromRotationMatrix(qe),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Sn){const c=this.elements,l=2*s/(e-t),h=2*s/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,g;if(a===Sn)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Qs)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Sn){const c=this.elements,l=1/(e-t),h=1/(n-i),d=1/(o-s),u=(e+t)*l,f=(n+i)*h;let g,v;if(a===Sn)g=(o+s)*d,v=-2*d;else if(a===Qs)g=s*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const pi=new F,qe=new ae,Su=new F(0,0,0),Eu=new F(1,1,1),Cn=new F,Es=new F,Fe=new F,ba=new ae,Ta=new hs;class En{constructor(t=0,e=0,n=0,i=En.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Me(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Me(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Me(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Me(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ba.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ba,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ta.setFromEuler(this),this.setFromQuaternion(Ta,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}En.DEFAULT_ORDER="XYZ";class sl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let wu=0;const Aa=new F,mi=new hs,fn=new ae,ws=new F,ji=new F,bu=new F,Tu=new hs,Ca=new F(1,0,0),Ra=new F(0,1,0),Pa=new F(0,0,1),La={type:"added"},Au={type:"removed"},gi={type:"childadded",child:null},Pr={type:"childremoved",child:null};class we extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=Wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new F,e=new En,n=new hs,i=new F(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ae},normalMatrix:{value:new Lt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return mi.setFromAxisAngle(t,e),this.quaternion.multiply(mi),this}rotateOnWorldAxis(t,e){return mi.setFromAxisAngle(t,e),this.quaternion.premultiply(mi),this}rotateX(t){return this.rotateOnAxis(Ca,t)}rotateY(t){return this.rotateOnAxis(Ra,t)}rotateZ(t){return this.rotateOnAxis(Pa,t)}translateOnAxis(t,e){return Aa.copy(t).applyQuaternion(this.quaternion),this.position.add(Aa.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ca,t)}translateY(t){return this.translateOnAxis(Ra,t)}translateZ(t){return this.translateOnAxis(Pa,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ws.copy(t):ws.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ji.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(ji,ws,this.up):fn.lookAt(ws,ji,this.up),this.quaternion.setFromRotationMatrix(fn),i&&(fn.extractRotation(i.matrixWorld),mi.setFromRotationMatrix(fn),this.quaternion.premultiply(mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(La),gi.child=t,this.dispatchEvent(gi),gi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Au),Pr.child=t,this.dispatchEvent(Pr),Pr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(La),gi.child=t,this.dispatchEvent(gi),gi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,t,bu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,Tu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];s(t.shapes,d)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}we.DEFAULT_UP=new F(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xe=new F,pn=new F,Lr=new F,mn=new F,vi=new F,_i=new F,Ia=new F,Ir=new F,Nr=new F,Dr=new F;class sn{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Xe.subVectors(t,e),i.cross(Xe);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Xe.subVectors(i,e),pn.subVectors(n,e),Lr.subVectors(t,e);const o=Xe.dot(Xe),a=Xe.dot(pn),c=Xe.dot(Lr),l=pn.dot(pn),h=pn.dot(Lr),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(l*c-a*h)*u,g=(o*h-a*c)*u;return s.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(t,e,n,i,s,o,a,c){return this.getBarycoord(t,e,n,i,mn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,mn.x),c.addScaledVector(o,mn.y),c.addScaledVector(a,mn.z),c)}static isFrontFacing(t,e,n,i){return Xe.subVectors(n,e),pn.subVectors(t,e),Xe.cross(pn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xe.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),Xe.cross(pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return sn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;vi.subVectors(i,n),_i.subVectors(s,n),Ir.subVectors(t,n);const c=vi.dot(Ir),l=_i.dot(Ir);if(c<=0&&l<=0)return e.copy(n);Nr.subVectors(t,i);const h=vi.dot(Nr),d=_i.dot(Nr);if(h>=0&&d<=h)return e.copy(i);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(vi,o);Dr.subVectors(t,s);const f=vi.dot(Dr),g=_i.dot(Dr);if(g>=0&&f<=g)return e.copy(s);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(_i,a);const p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return Ia.subVectors(s,i),a=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(Ia,a);const m=1/(p+v+u);return o=v*m,a=u*m,e.copy(n).addScaledVector(vi,o).addScaledVector(_i,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const rl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},bs={h:0,s:0,l:0};function Ur(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Vt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Zt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Zt.workingColorSpace){if(t=yo(t,1),e=Me(e,0,1),n=Me(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Ur(o,s,t+1/3),this.g=Ur(o,s,t),this.b=Ur(o,s,t-1/3)}return Zt.toWorkingColorSpace(this,i),this}setStyle(t,e=je){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=je){const n=rl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Di(t.r),this.g=Di(t.g),this.b=Di(t.b),this}copyLinearToSRGB(t){return this.r=Sr(t.r),this.g=Sr(t.g),this.b=Sr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=je){return Zt.fromWorkingColorSpace(Te.copy(this),t),Math.round(Me(Te.r*255,0,255))*65536+Math.round(Me(Te.g*255,0,255))*256+Math.round(Me(Te.b*255,0,255))}getHexString(t=je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.fromWorkingColorSpace(Te.copy(this),e);const n=Te.r,i=Te.g,s=Te.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(i-s)/d+(i<s?6:0);break;case i:c=(s-n)/d+2;break;case s:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Zt.workingColorSpace){return Zt.fromWorkingColorSpace(Te.copy(this),e),t.r=Te.r,t.g=Te.g,t.b=Te.b,t}getStyle(t=je){Zt.fromWorkingColorSpace(Te.copy(this),t);const e=Te.r,n=Te.g,i=Te.b;return t!==je?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Rn),this.setHSL(Rn.h+t,Rn.s+e,Rn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Rn),t.getHSL(bs);const n=rs(Rn.h,bs.h,e),i=rs(Rn.s,bs.s,e),s=rs(Rn.l,bs.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Te=new Vt;Vt.NAMES=rl;let Cu=0,ds=class extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=Wi(),this.name="",this.type="Material",this.blending=Ii,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=so,this.blendDst=ro,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=va,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=li,this.stencilZFail=li,this.stencilZPass=li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(n.blending=this.blending),this.side!==zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==so&&(n.blendSrc=this.blendSrc),this.blendDst!==ro&&(n.blendDst=this.blendDst),this.blendEquation!==ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==js&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==va&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};class So extends ds{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Wc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ue=new F,Ts=new _t;class on{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=_a,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return el("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ts.fromBufferAttribute(this,e),Ts.applyMatrix3(t),this.setXY(e,Ts.x,Ts.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix3(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix4(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyNormalMatrix(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.transformDirection(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ci(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Pe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ci(e,this.array)),e}setX(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ci(e,this.array)),e}setY(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ci(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ci(e,this.array)),e}setW(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),i=Pe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),i=Pe(i,this.array),s=Pe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==_a&&(t.usage=this.usage),t}}class ol extends on{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class al extends on{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ce extends on{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ru=0;const He=new ae,Fr=new we,xi=new F,Oe=new us,Ki=new us,xe=new F;class cn extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=Wi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(tl(t)?al:ol)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Lt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return He.makeRotationFromQuaternion(t),this.applyMatrix4(He),this}rotateX(t){return He.makeRotationX(t),this.applyMatrix4(He),this}rotateY(t){return He.makeRotationY(t),this.applyMatrix4(He),this}rotateZ(t){return He.makeRotationZ(t),this.applyMatrix4(He),this}translate(t,e,n){return He.makeTranslation(t,e,n),this.applyMatrix4(He),this}scale(t,e,n){return He.makeScale(t,e,n),this.applyMatrix4(He),this}lookAt(t){return Fr.lookAt(t),Fr.updateMatrix(),this.applyMatrix4(Fr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xi).negate(),this.translate(xi.x,xi.y,xi.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ce(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new us);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Oe.setFromBufferAttribute(s),this.morphTargetsRelative?(xe.addVectors(this.boundingBox.min,Oe.min),this.boundingBox.expandByPoint(xe),xe.addVectors(this.boundingBox.max,Oe.max),this.boundingBox.expandByPoint(xe)):(this.boundingBox.expandByPoint(Oe.min),this.boundingBox.expandByPoint(Oe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const n=this.boundingSphere.center;if(Oe.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Ki.setFromBufferAttribute(a),this.morphTargetsRelative?(xe.addVectors(Oe.min,Ki.min),Oe.expandByPoint(xe),xe.addVectors(Oe.max,Ki.max),Oe.expandByPoint(xe)):(Oe.expandByPoint(Ki.min),Oe.expandByPoint(Ki.max))}Oe.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)xe.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(xe));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)xe.fromBufferAttribute(a,l),c&&(xi.fromBufferAttribute(t,l),xe.add(xi)),i=Math.max(i,n.distanceToSquared(xe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new on(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let N=0;N<n.count;N++)a[N]=new F,c[N]=new F;const l=new F,h=new F,d=new F,u=new _t,f=new _t,g=new _t,v=new F,p=new F;function m(N,w,M){l.fromBufferAttribute(n,N),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,M),u.fromBufferAttribute(s,N),f.fromBufferAttribute(s,w),g.fromBufferAttribute(s,M),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(R),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(R),a[N].add(v),a[w].add(v),a[M].add(v),c[N].add(p),c[w].add(p),c[M].add(p))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let N=0,w=_.length;N<w;++N){const M=_[N],R=M.start,H=M.count;for(let P=R,U=R+H;P<U;P+=3)m(t.getX(P+0),t.getX(P+1),t.getX(P+2))}const x=new F,S=new F,C=new F,T=new F;function A(N){C.fromBufferAttribute(i,N),T.copy(C);const w=a[N];x.copy(w),x.sub(C.multiplyScalar(C.dot(w))).normalize(),S.crossVectors(T,w);const R=S.dot(c[N])<0?-1:1;o.setXYZW(N,x.x,x.y,x.z,R)}for(let N=0,w=_.length;N<w;++N){const M=_[N],R=M.start,H=M.count;for(let P=R,U=R+H;P<U;P+=3)A(t.getX(P+0)),A(t.getX(P+1)),A(t.getX(P+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new on(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new F,s=new F,o=new F,a=new F,c=new F,l=new F,h=new F,d=new F;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),v=t.getX(u+1),p=t.getX(u+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,v),o.fromBufferAttribute(e,p),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,p),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)xe.fromBufferAttribute(t,e),xe.normalize(),t.setXYZ(e,xe.x,xe.y,xe.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let v=0,p=c.length;v<p;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let m=0;m<h;m++)u[g++]=l[f++]}return new on(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new cn,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Na=new ae,Yn=new Mu,As=new Mo,Da=new F,yi=new F,Mi=new F,Si=new F,Or=new F,Cs=new F,Rs=new _t,Ps=new _t,Ls=new _t,Ua=new F,Fa=new F,Oa=new F,Is=new F,Ns=new F;class te extends we{constructor(t=new cn,e=new So){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Cs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],d=s[c];h!==0&&(Or.fromBufferAttribute(d,t),o?Cs.addScaledVector(Or,h):Cs.addScaledVector(Or.sub(e),h))}e.add(Cs)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),As.copy(n.boundingSphere),As.applyMatrix4(s),Yn.copy(t.ray).recast(t.near),!(As.containsPoint(Yn.origin)===!1&&(Yn.intersectSphere(As,Da)===null||Yn.origin.distanceToSquared(Da)>(t.far-t.near)**2))&&(Na.copy(s).invert(),Yn.copy(t.ray).applyMatrix4(Na),!(n.boundingBox!==null&&Yn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Yn)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=o[p.materialIndex],_=Math.max(p.start,f.start),x=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let S=_,C=x;S<C;S+=3){const T=a.getX(S),A=a.getX(S+1),N=a.getX(S+2);i=Ds(this,m,t,n,l,h,d,T,A,N),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const _=a.getX(p),x=a.getX(p+1),S=a.getX(p+2);i=Ds(this,o,t,n,l,h,d,_,x,S),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=o[p.materialIndex],_=Math.max(p.start,f.start),x=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let S=_,C=x;S<C;S+=3){const T=S,A=S+1,N=S+2;i=Ds(this,m,t,n,l,h,d,T,A,N),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const _=p,x=p+1,S=p+2;i=Ds(this,o,t,n,l,h,d,_,x,S),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function Pu(r,t,e,n,i,s,o,a){let c;if(t.side===Ne?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,t.side===zn,a),c===null)return null;Ns.copy(a),Ns.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(Ns);return l<e.near||l>e.far?null:{distance:l,point:Ns.clone(),object:r}}function Ds(r,t,e,n,i,s,o,a,c,l){r.getVertexPosition(a,yi),r.getVertexPosition(c,Mi),r.getVertexPosition(l,Si);const h=Pu(r,t,e,n,yi,Mi,Si,Is);if(h){i&&(Rs.fromBufferAttribute(i,a),Ps.fromBufferAttribute(i,c),Ls.fromBufferAttribute(i,l),h.uv=sn.getInterpolation(Is,yi,Mi,Si,Rs,Ps,Ls,new _t)),s&&(Rs.fromBufferAttribute(s,a),Ps.fromBufferAttribute(s,c),Ls.fromBufferAttribute(s,l),h.uv1=sn.getInterpolation(Is,yi,Mi,Si,Rs,Ps,Ls,new _t)),o&&(Ua.fromBufferAttribute(o,a),Fa.fromBufferAttribute(o,c),Oa.fromBufferAttribute(o,l),h.normal=sn.getInterpolation(Is,yi,Mi,Si,Ua,Fa,Oa,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new F,materialIndex:0};sn.getNormal(yi,Mi,Si,d.normal),h.face=d}return h}class an extends cn{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ce(l,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(d,2));function g(v,p,m,_,x,S,C,T,A,N,w){const M=S/A,R=C/N,H=S/2,P=C/2,U=T/2,B=A+1,I=N+1;let j=0,V=0;const Z=new F;for(let ot=0;ot<I;ot++){const at=ot*R-P;for(let st=0;st<B;st++){const Bt=st*M-H;Z[v]=Bt*_,Z[p]=at*x,Z[m]=U,l.push(Z.x,Z.y,Z.z),Z[v]=0,Z[p]=0,Z[m]=T>0?1:-1,h.push(Z.x,Z.y,Z.z),d.push(st/A),d.push(1-ot/N),j+=1}}for(let ot=0;ot<N;ot++)for(let at=0;at<A;at++){const st=u+at+B*ot,Bt=u+at+B*(ot+1),X=u+(at+1)+B*(ot+1),tt=u+(at+1)+B*ot;c.push(st,Bt,tt),c.push(Bt,X,tt),V+=6}a.addGroup(f,V,w),f+=V,u+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new an(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ki(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Le(r){const t={};for(let e=0;e<r.length;e++){const n=ki(r[e]);for(const i in n)t[i]=n[i]}return t}function Lu(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function cl(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const Iu={clone:ki,merge:Le};var Nu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Du=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class kn extends ds{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nu,this.fragmentShader=Du,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ki(t.uniforms),this.uniformsGroups=Lu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class ll extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=Sn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pn=new F,Ba=new _t,za=new _t;class ke extends ll{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ls*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ss*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ls*2*Math.atan(Math.tan(ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Pn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Pn.x,Pn.y).multiplyScalar(-t/Pn.z),Pn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pn.x,Pn.y).multiplyScalar(-t/Pn.z)}getViewSize(t,e){return this.getViewBounds(t,Ba,za),e.subVectors(za,Ba)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ss*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ei=-90,wi=1;class Uu extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ke(Ei,wi,t,e);i.layers=this.layers,this.add(i);const s=new ke(Ei,wi,t,e);s.layers=this.layers,this.add(s);const o=new ke(Ei,wi,t,e);o.layers=this.layers,this.add(o);const a=new ke(Ei,wi,t,e);a.layers=this.layers,this.add(a);const c=new ke(Ei,wi,t,e);c.layers=this.layers,this.add(c);const l=new ke(Ei,wi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class hl extends De{constructor(t,e,n,i,s,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Fi,super(t,e,n,i,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Fu extends oi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new hl(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ke}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new an(5,5,5),s=new kn({name:"CubemapFromEquirect",uniforms:ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:On});s.uniforms.tEquirect.value=e;const o=new te(i,s),a=e.minFilter;return e.minFilter===si&&(e.minFilter=Ke),new Uu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const Br=new F,Ou=new F,Bu=new Lt;class Jn{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Br.subVectors(n,e).cross(Ou.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Br),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Bu.getNormalMatrix(t),i=this.coplanarPoint(Br).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new Mo,Us=new F;class Eo{constructor(t=new Jn,e=new Jn,n=new Jn,i=new Jn,s=new Jn,o=new Jn){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Sn){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],v=i[10],p=i[11],m=i[12],_=i[13],x=i[14],S=i[15];if(n[0].setComponents(c-s,u-l,p-f,S-m).normalize(),n[1].setComponents(c+s,u+l,p+f,S+m).normalize(),n[2].setComponents(c+o,u+h,p+g,S+_).normalize(),n[3].setComponents(c-o,u-h,p-g,S-_).normalize(),n[4].setComponents(c-a,u-d,p-v,S-x).normalize(),e===Sn)n[5].setComponents(c+a,u+d,p+v,S+x).normalize();else if(e===Qs)n[5].setComponents(a,d,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(t){return jn.center.set(0,0,0),jn.radius=.7071067811865476,jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Us.x=i.normal.x>0?t.max.x:t.min.x,Us.y=i.normal.y>0?t.max.y:t.min.y,Us.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Us)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ul(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function zu(r){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,d=l.byteLength,u=r.createBuffer();r.bindBuffer(c,u),r.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=r.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=r.SHORT;else if(l instanceof Uint32Array)f=r.UNSIGNED_INT;else if(l instanceof Int32Array)f=r.INT;else if(l instanceof Int8Array)f=r.BYTE;else if(l instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){const h=c.array,d=c._updateRange,u=c.updateRanges;if(r.bindBuffer(l,a),d.count===-1&&u.length===0&&r.bufferSubData(l,0,h),u.length!==0){for(let f=0,g=u.length;f<g;f++){const v=u[f];r.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}d.count!==-1&&(r.bufferSubData(l,d.offset*h.BYTES_PER_ELEMENT,h,d.offset,d.count),d.count=-1),c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(r.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}class ar extends cn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,d=t/a,u=e/c,f=[],g=[],v=[],p=[];for(let m=0;m<h;m++){const _=m*u-o;for(let x=0;x<l;x++){const S=x*d-s;g.push(S,-_,0),v.push(0,0,1),p.push(x/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let _=0;_<a;_++){const x=_+l*m,S=_+l*(m+1),C=_+1+l*(m+1),T=_+1+l*m;f.push(x,S,T),f.push(S,C,T)}this.setIndex(f),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(v,3)),this.setAttribute("uv",new Ce(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ar(t.width,t.height,t.widthSegments,t.heightSegments)}}var Hu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ku=`#ifdef USE_ALPHAHASH
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
#endif`,Vu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xu=`#ifdef USE_AOMAP
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
#endif`,Yu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ju=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ku=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Zu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$u=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ju=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qu=`#ifdef USE_IRIDESCENCE
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
#endif`,td=`#ifdef USE_BUMPMAP
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
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,od=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,cd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,ld=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,hd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ud=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,dd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,md=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gd="gl_FragColor = linearToOutputTexel( gl_FragColor );",vd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,_d=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,xd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yd=`#ifdef USE_ENVMAP
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
#endif`,Md=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ed=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Td=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ad=`#ifdef USE_GRADIENTMAP
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
}`,Cd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ld=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#endif`,Id=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,Nd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ud=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Od=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Bd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zd=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Hd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,kd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Kd=`#if defined( USE_POINTS_UV )
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
#endif`,Zd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$d=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ef=`#ifdef USE_MORPHTARGETS
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
#endif`,nf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,af=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lf=`#ifdef USE_NORMALMAP
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
#endif`,hf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,df=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ff=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,gf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_f=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,Ef=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,bf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Af=`#ifdef USE_SKINNING
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
#endif`,Cf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rf=`#ifdef USE_SKINNING
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
#endif`,Pf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,If=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nf=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Df=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Uf=`#ifdef USE_TRANSMISSION
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
#endif`,Ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Hf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kf=`uniform sampler2D t2D;
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
}`,Vf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xf=`#include <common>
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
}`,Yf=`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,jf=`#define DISTANCE
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
}`,Kf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$f=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jf=`uniform float scale;
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
}`,Qf=`uniform vec3 diffuse;
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
}`,tp=`#include <common>
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
}`,ep=`uniform vec3 diffuse;
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
}`,np=`#define LAMBERT
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
}`,ip=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,sp=`#define MATCAP
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
}`,rp=`#define MATCAP
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
}`,op=`#define NORMAL
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
}`,ap=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cp=`#define PHONG
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
}`,lp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,hp=`#define STANDARD
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
}`,up=`#define STANDARD
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
#include <packing>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,dp=`#define TOON
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
}`,fp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,pp=`uniform float size;
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
}`,mp=`uniform vec3 diffuse;
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
}`,gp=`#include <common>
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
}`,vp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,_p=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,xp=`uniform vec3 diffuse;
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
}`,Pt={alphahash_fragment:Hu,alphahash_pars_fragment:ku,alphamap_fragment:Vu,alphamap_pars_fragment:Gu,alphatest_fragment:Wu,alphatest_pars_fragment:qu,aomap_fragment:Xu,aomap_pars_fragment:Yu,batching_pars_vertex:ju,batching_vertex:Ku,begin_vertex:Zu,beginnormal_vertex:$u,bsdfs:Ju,iridescence_fragment:Qu,bumpmap_pars_fragment:td,clipping_planes_fragment:ed,clipping_planes_pars_fragment:nd,clipping_planes_pars_vertex:id,clipping_planes_vertex:sd,color_fragment:rd,color_pars_fragment:od,color_pars_vertex:ad,color_vertex:cd,common:ld,cube_uv_reflection_fragment:hd,defaultnormal_vertex:ud,displacementmap_pars_vertex:dd,displacementmap_vertex:fd,emissivemap_fragment:pd,emissivemap_pars_fragment:md,colorspace_fragment:gd,colorspace_pars_fragment:vd,envmap_fragment:_d,envmap_common_pars_fragment:xd,envmap_pars_fragment:yd,envmap_pars_vertex:Md,envmap_physical_pars_fragment:Id,envmap_vertex:Sd,fog_vertex:Ed,fog_pars_vertex:wd,fog_fragment:bd,fog_pars_fragment:Td,gradientmap_pars_fragment:Ad,lightmap_pars_fragment:Cd,lights_lambert_fragment:Rd,lights_lambert_pars_fragment:Pd,lights_pars_begin:Ld,lights_toon_fragment:Nd,lights_toon_pars_fragment:Dd,lights_phong_fragment:Ud,lights_phong_pars_fragment:Fd,lights_physical_fragment:Od,lights_physical_pars_fragment:Bd,lights_fragment_begin:zd,lights_fragment_maps:Hd,lights_fragment_end:kd,logdepthbuf_fragment:Vd,logdepthbuf_pars_fragment:Gd,logdepthbuf_pars_vertex:Wd,logdepthbuf_vertex:qd,map_fragment:Xd,map_pars_fragment:Yd,map_particle_fragment:jd,map_particle_pars_fragment:Kd,metalnessmap_fragment:Zd,metalnessmap_pars_fragment:$d,morphinstance_vertex:Jd,morphcolor_vertex:Qd,morphnormal_vertex:tf,morphtarget_pars_vertex:ef,morphtarget_vertex:nf,normal_fragment_begin:sf,normal_fragment_maps:rf,normal_pars_fragment:of,normal_pars_vertex:af,normal_vertex:cf,normalmap_pars_fragment:lf,clearcoat_normal_fragment_begin:hf,clearcoat_normal_fragment_maps:uf,clearcoat_pars_fragment:df,iridescence_pars_fragment:ff,opaque_fragment:pf,packing:mf,premultiplied_alpha_fragment:gf,project_vertex:vf,dithering_fragment:_f,dithering_pars_fragment:xf,roughnessmap_fragment:yf,roughnessmap_pars_fragment:Mf,shadowmap_pars_fragment:Sf,shadowmap_pars_vertex:Ef,shadowmap_vertex:wf,shadowmask_pars_fragment:bf,skinbase_vertex:Tf,skinning_pars_vertex:Af,skinning_vertex:Cf,skinnormal_vertex:Rf,specularmap_fragment:Pf,specularmap_pars_fragment:Lf,tonemapping_fragment:If,tonemapping_pars_fragment:Nf,transmission_fragment:Df,transmission_pars_fragment:Uf,uv_pars_fragment:Ff,uv_pars_vertex:Of,uv_vertex:Bf,worldpos_vertex:zf,background_vert:Hf,background_frag:kf,backgroundCube_vert:Vf,backgroundCube_frag:Gf,cube_vert:Wf,cube_frag:qf,depth_vert:Xf,depth_frag:Yf,distanceRGBA_vert:jf,distanceRGBA_frag:Kf,equirect_vert:Zf,equirect_frag:$f,linedashed_vert:Jf,linedashed_frag:Qf,meshbasic_vert:tp,meshbasic_frag:ep,meshlambert_vert:np,meshlambert_frag:ip,meshmatcap_vert:sp,meshmatcap_frag:rp,meshnormal_vert:op,meshnormal_frag:ap,meshphong_vert:cp,meshphong_frag:lp,meshphysical_vert:hp,meshphysical_frag:up,meshtoon_vert:dp,meshtoon_frag:fp,points_vert:pp,points_frag:mp,shadow_vert:gp,shadow_frag:vp,sprite_vert:_p,sprite_frag:xp},rt={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},nn={basic:{uniforms:Le([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Pt.meshbasic_vert,fragmentShader:Pt.meshbasic_frag},lambert:{uniforms:Le([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Pt.meshlambert_vert,fragmentShader:Pt.meshlambert_frag},phong:{uniforms:Le([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:Pt.meshphong_vert,fragmentShader:Pt.meshphong_frag},standard:{uniforms:Le([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag},toon:{uniforms:Le([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Pt.meshtoon_vert,fragmentShader:Pt.meshtoon_frag},matcap:{uniforms:Le([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Pt.meshmatcap_vert,fragmentShader:Pt.meshmatcap_frag},points:{uniforms:Le([rt.points,rt.fog]),vertexShader:Pt.points_vert,fragmentShader:Pt.points_frag},dashed:{uniforms:Le([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Pt.linedashed_vert,fragmentShader:Pt.linedashed_frag},depth:{uniforms:Le([rt.common,rt.displacementmap]),vertexShader:Pt.depth_vert,fragmentShader:Pt.depth_frag},normal:{uniforms:Le([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Pt.meshnormal_vert,fragmentShader:Pt.meshnormal_frag},sprite:{uniforms:Le([rt.sprite,rt.fog]),vertexShader:Pt.sprite_vert,fragmentShader:Pt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Pt.background_vert,fragmentShader:Pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:Pt.backgroundCube_vert,fragmentShader:Pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Pt.cube_vert,fragmentShader:Pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Pt.equirect_vert,fragmentShader:Pt.equirect_frag},distanceRGBA:{uniforms:Le([rt.common,rt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Pt.distanceRGBA_vert,fragmentShader:Pt.distanceRGBA_frag},shadow:{uniforms:Le([rt.lights,rt.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:Pt.shadow_vert,fragmentShader:Pt.shadow_frag}};nn.physical={uniforms:Le([nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag};const Fs={r:0,b:0,g:0},Kn=new En,yp=new ae;function Mp(r,t,e,n,i,s,o){const a=new Vt(0);let c=s===!0?0:1,l,h,d=null,u=0,f=null;function g(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?e:t).get(x)),x}function v(_){let x=!1;const S=g(_);S===null?m(a,c):S&&S.isColor&&(m(S,1),x=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(_,x){const S=g(x);S&&(S.isCubeTexture||S.mapping===sr)?(h===void 0&&(h=new te(new an(1,1,1),new kn({name:"BackgroundCubeMaterial",uniforms:ki(nn.backgroundCube.uniforms),vertexShader:nn.backgroundCube.vertexShader,fragmentShader:nn.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Kn.copy(x.backgroundRotation),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(yp.makeRotationFromEuler(Kn)),h.material.toneMapped=Zt.getTransfer(S.colorSpace)!==ne,(d!==S||u!==S.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,d=S,u=S.version,f=r.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new te(new ar(2,2),new kn({name:"BackgroundMaterial",uniforms:ki(nn.background.uniforms),vertexShader:nn.background.vertexShader,fragmentShader:nn.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Zt.getTransfer(S.colorSpace)!==ne,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||u!==S.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,d=S,u=S.version,f=r.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,x){_.getRGB(Fs,cl(r)),n.buffers.color.setClear(Fs.r,Fs.g,Fs.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(_,x=1){a.set(_),c=x,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,m(a,c)},render:v,addToRenderList:p}}function Sp(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,o=!1;function a(M,R,H,P,U){let B=!1;const I=d(P,H,R);s!==I&&(s=I,l(s.object)),B=f(M,P,H,U),B&&g(M,P,H,U),U!==null&&t.update(U,r.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,S(M,R,H,P),U!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return r.createVertexArray()}function l(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function d(M,R,H){const P=H.wireframe===!0;let U=n[M.id];U===void 0&&(U={},n[M.id]=U);let B=U[R.id];B===void 0&&(B={},U[R.id]=B);let I=B[P];return I===void 0&&(I=u(c()),B[P]=I),I}function u(M){const R=[],H=[],P=[];for(let U=0;U<e;U++)R[U]=0,H[U]=0,P[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:H,attributeDivisors:P,object:M,attributes:{},index:null}}function f(M,R,H,P){const U=s.attributes,B=R.attributes;let I=0;const j=H.getAttributes();for(const V in j)if(j[V].location>=0){const ot=U[V];let at=B[V];if(at===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(at=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(at=M.instanceColor)),ot===void 0||ot.attribute!==at||at&&ot.data!==at.data)return!0;I++}return s.attributesNum!==I||s.index!==P}function g(M,R,H,P){const U={},B=R.attributes;let I=0;const j=H.getAttributes();for(const V in j)if(j[V].location>=0){let ot=B[V];ot===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(ot=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(ot=M.instanceColor));const at={};at.attribute=ot,ot&&ot.data&&(at.data=ot.data),U[V]=at,I++}s.attributes=U,s.attributesNum=I,s.index=P}function v(){const M=s.newAttributes;for(let R=0,H=M.length;R<H;R++)M[R]=0}function p(M){m(M,0)}function m(M,R){const H=s.newAttributes,P=s.enabledAttributes,U=s.attributeDivisors;H[M]=1,P[M]===0&&(r.enableVertexAttribArray(M),P[M]=1),U[M]!==R&&(r.vertexAttribDivisor(M,R),U[M]=R)}function _(){const M=s.newAttributes,R=s.enabledAttributes;for(let H=0,P=R.length;H<P;H++)R[H]!==M[H]&&(r.disableVertexAttribArray(H),R[H]=0)}function x(M,R,H,P,U,B,I){I===!0?r.vertexAttribIPointer(M,R,H,U,B):r.vertexAttribPointer(M,R,H,P,U,B)}function S(M,R,H,P){v();const U=P.attributes,B=H.getAttributes(),I=R.defaultAttributeValues;for(const j in B){const V=B[j];if(V.location>=0){let Z=U[j];if(Z===void 0&&(j==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),j==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor)),Z!==void 0){const ot=Z.normalized,at=Z.itemSize,st=t.get(Z);if(st===void 0)continue;const Bt=st.buffer,X=st.type,tt=st.bytesPerElement,mt=X===r.INT||X===r.UNSIGNED_INT||Z.gpuType===Xc;if(Z.isInterleavedBufferAttribute){const ct=Z.data,Ut=ct.stride,It=Z.offset;if(ct.isInstancedInterleavedBuffer){for(let Gt=0;Gt<V.locationSize;Gt++)m(V.location+Gt,ct.meshPerAttribute);M.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let Gt=0;Gt<V.locationSize;Gt++)p(V.location+Gt);r.bindBuffer(r.ARRAY_BUFFER,Bt);for(let Gt=0;Gt<V.locationSize;Gt++)x(V.location+Gt,at/V.locationSize,X,ot,Ut*tt,(It+at/V.locationSize*Gt)*tt,mt)}else{if(Z.isInstancedBufferAttribute){for(let ct=0;ct<V.locationSize;ct++)m(V.location+ct,Z.meshPerAttribute);M.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ct=0;ct<V.locationSize;ct++)p(V.location+ct);r.bindBuffer(r.ARRAY_BUFFER,Bt);for(let ct=0;ct<V.locationSize;ct++)x(V.location+ct,at/V.locationSize,X,ot,at*tt,at/V.locationSize*ct*tt,mt)}}else if(I!==void 0){const ot=I[j];if(ot!==void 0)switch(ot.length){case 2:r.vertexAttrib2fv(V.location,ot);break;case 3:r.vertexAttrib3fv(V.location,ot);break;case 4:r.vertexAttrib4fv(V.location,ot);break;default:r.vertexAttrib1fv(V.location,ot)}}}}_()}function C(){N();for(const M in n){const R=n[M];for(const H in R){const P=R[H];for(const U in P)h(P[U].object),delete P[U];delete R[H]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const R=n[M.id];for(const H in R){const P=R[H];for(const U in P)h(P[U].object),delete P[U];delete R[H]}delete n[M.id]}function A(M){for(const R in n){const H=n[R];if(H[M.id]===void 0)continue;const P=H[M.id];for(const U in P)h(P[U].object),delete P[U];delete H[M.id]}}function N(){w(),o=!0,s!==i&&(s=i,l(s.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:N,resetDefaultState:w,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:p,disableUnusedAttributes:_}}function Ep(r,t,e){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,d){d!==0&&(r.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function a(l,h,d){if(d===0)return;const u=t.get("WEBGL_multi_draw");if(u===null)for(let f=0;f<d;f++)this.render(l[f],h[f]);else{u.multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}}function c(l,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v];for(let v=0;v<u.length;v++)e.update(g,n,u[v])}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function wp(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==rn&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const A=T===rr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Hn&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Nn&&!A)}function c(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),v=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),_=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,C=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,maxTextures:u,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:v,maxAttributes:p,maxVertexUniforms:m,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:S,maxSamples:C}}function bp(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new Jn,a=new Lt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,m=r.get(d);if(!i||g===null||g.length===0||s&&!p)s?h(null):l();else{const _=s?0:n,x=_*4;let S=m.clippingState||null;c.value=S,S=h(g,u,x,f);for(let C=0;C!==x;++C)S[C]=e[C];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=c.value,g!==!0||p===null){const m=f+v*4,_=u.matrixWorldInverse;a.getNormalMatrix(_),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,S=f;x!==v;++x,S+=4)o.copy(d[x]).applyMatrix4(_,a),o.normal.toArray(p,S),p[S+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function Tp(r){let t=new WeakMap;function e(o,a){return a===oo?o.mapping=Fi:a===ao&&(o.mapping=Oi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===oo||a===ao)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Fu(c.height);return l.fromEquirectangularTexture(r,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class dl extends ll{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ri=4,Ha=[.125,.215,.35,.446,.526,.582],ei=20,zr=new dl,ka=new Vt;let Hr=null,kr=0,Vr=0,Gr=!1;const Qn=(1+Math.sqrt(5))/2,bi=1/Qn,Va=[new F(-Qn,bi,0),new F(Qn,bi,0),new F(-bi,0,Qn),new F(bi,0,Qn),new F(0,Qn,-bi),new F(0,Qn,bi),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Ga{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Hr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Vr=this._renderer.getActiveMipmapLevel(),Gr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Hr,kr,Vr),this._renderer.xr.enabled=Gr,t.scissorTest=!1,Os(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Fi||t.mapping===Oi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Hr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Vr=this._renderer.getActiveMipmapLevel(),Gr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ke,minFilter:Ke,generateMipmaps:!1,type:rr,format:rn,colorSpace:Vn,depthBuffer:!1},i=Wa(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wa(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ap(s)),this._blurMaterial=Cp(s,t,e)}return i}_compileMaterial(t){const e=new te(this._lodPlanes[0],t);this._renderer.compile(e,zr)}_sceneToCubeUV(t,e,n,i){const a=new ke(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(ka),h.toneMapping=Bn,h.autoClear=!1;const f=new So({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1}),g=new te(new an,f);let v=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,v=!0):(f.color.copy(ka),v=!0);for(let m=0;m<6;m++){const _=m%3;_===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):_===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const x=this._cubeSize;Os(i,_*x,m>2?x:0,x,x),h.setRenderTarget(i),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Fi||t.mapping===Oi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xa()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qa());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new te(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Os(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,zr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Va[(i-s-1)%Va.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new te(this._lodPlanes[i],l),u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ei-1),v=s/g,p=isFinite(s)?1+Math.floor(h*v):ei;p>ei&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ei}`);const m=[];let _=0;for(let A=0;A<ei;++A){const N=A/v,w=Math.exp(-N*N/2);m.push(w),A===0?_+=w:A<p&&(_+=2*w)}for(let A=0;A<m.length;A++)m[A]=m[A]/_;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-n;const S=this._sizeLods[i],C=3*S*(i>x-Ri?i-x+Ri:0),T=4*(this._cubeSize-S);Os(e,C,T,3*S,2*S),c.setRenderTarget(e),c.render(d,zr)}}function Ap(r){const t=[],e=[],n=[];let i=r;const s=r-Ri+1+Ha.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>r-Ri?c=Ha[o-r+Ri-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,p=2,m=1,_=new Float32Array(v*g*f),x=new Float32Array(p*g*f),S=new Float32Array(m*g*f);for(let T=0;T<f;T++){const A=T%3*2/3-1,N=T>2?0:-1,w=[A,N,0,A+2/3,N,0,A+2/3,N+1,0,A,N,0,A+2/3,N+1,0,A,N+1,0];_.set(w,v*g*T),x.set(u,p*g*T);const M=[T,T,T,T,T,T];S.set(M,m*g*T)}const C=new cn;C.setAttribute("position",new on(_,v)),C.setAttribute("uv",new on(x,p)),C.setAttribute("faceIndex",new on(S,m)),t.push(C),i>Ri&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Wa(r,t,e){const n=new oi(r,t,e);return n.texture.mapping=sr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Os(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Cp(r,t,e){const n=new Float32Array(ei),i=new F(0,1,0);return new kn({name:"SphericalGaussianBlur",defines:{n:ei,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function qa(){return new kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wo(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function Xa(){return new kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function wo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Rp(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===oo||c===ao,h=c===Fi||c===Oi;if(l||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Ga(r)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Ga(r)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Pp(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&el("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Lp(r,t,e,n){const i={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let p=0,m=v.length;p<m;p++)t.remove(v[p])}u.removeEventListener("dispose",o),delete i[u.id];const f=s.get(u);f&&(t.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const g in u)t.update(u[g],r.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const v=f[g];for(let p=0,m=v.length;p<m;p++)t.update(v[p],r.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const _=f.array;v=f.version;for(let x=0,S=_.length;x<S;x+=3){const C=_[x+0],T=_[x+1],A=_[x+2];u.push(C,T,T,A,A,C)}}else if(g!==void 0){const _=g.array;v=g.version;for(let x=0,S=_.length/3-1;x<S;x+=3){const C=x+0,T=x+1,A=x+2;u.push(C,T,T,A,A,C)}}else return;const p=new(tl(u)?al:ol)(u,1);p.version=v;const m=s.get(d);m&&t.remove(m),s.set(d,p)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function Ip(r,t,e){let n;function i(u){n=u}let s,o;function a(u){s=u.type,o=u.bytesPerElement}function c(u,f){r.drawElements(n,f,s,u*o),e.update(f,n,1)}function l(u,f,g){g!==0&&(r.drawElementsInstanced(n,f,s,u*o,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;const v=t.get("WEBGL_multi_draw");if(v===null)for(let p=0;p<g;p++)this.render(u[p]/o,f[p]);else{v.multiDrawElementsWEBGL(n,f,0,s,u,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];e.update(p,n,1)}}function d(u,f,g,v){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)l(u[m]/o,f[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,u,0,v,0,g);let m=0;for(let _=0;_<g;_++)m+=f[_];for(let _=0;_<v.length;_++)e.update(m,n,v[_])}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Np(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Dp(r,t,e){const n=new WeakMap,i=new Se;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let w=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let x=0;f===!0&&(x=1),g===!0&&(x=2),v===!0&&(x=3);let S=a.attributes.position.count*x,C=1;S>t.maxTextureSize&&(C=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const T=new Float32Array(S*C*4*d),A=new il(T,S,C,d);A.type=Nn,A.needsUpdate=!0;const N=x*4;for(let M=0;M<d;M++){const R=p[M],H=m[M],P=_[M],U=S*C*4*M;for(let B=0;B<R.count;B++){const I=B*N;f===!0&&(i.fromBufferAttribute(R,B),T[U+I+0]=i.x,T[U+I+1]=i.y,T[U+I+2]=i.z,T[U+I+3]=0),g===!0&&(i.fromBufferAttribute(H,B),T[U+I+4]=i.x,T[U+I+5]=i.y,T[U+I+6]=i.z,T[U+I+7]=0),v===!0&&(i.fromBufferAttribute(P,B),T[U+I+8]=i.x,T[U+I+9]=i.y,T[U+I+10]=i.z,T[U+I+11]=P.itemSize===4?i.w:1)}}u={count:d,texture:A,size:new _t(S,C)},n.set(a,u),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let f=0;for(let v=0;v<l.length;v++)f+=l[v];const g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(r,"morphTargetBaseInfluence",g),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function Up(r,t,e,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,d=t.get(c,h);if(i.get(d)!==l&&(t.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;i.get(u)!==l&&(u.update(),i.set(u,l))}return d}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}class fl extends De{constructor(t,e,n,i,s,o,a,c,l,h=Ni){if(h!==Ni&&h!==Hi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ni&&(n=Bi),n===void 0&&h===Hi&&(n=zi),super(null,i,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ge,this.minFilter=c!==void 0?c:Ge,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const pl=new De,ml=new fl(1,1);ml.compareFunction=Qc;const gl=new il,vl=new xu,_l=new hl,Ya=[],ja=[],Ka=new Float32Array(16),Za=new Float32Array(9),$a=new Float32Array(4);function qi(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Ya[i];if(s===void 0&&(s=new Float32Array(i),Ya[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function me(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function ge(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function cr(r,t){let e=ja[t];e===void 0&&(e=new Int32Array(t),ja[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Fp(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Op(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;r.uniform2fv(this.addr,t),ge(e,t)}}function Bp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(me(e,t))return;r.uniform3fv(this.addr,t),ge(e,t)}}function zp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;r.uniform4fv(this.addr,t),ge(e,t)}}function Hp(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;$a.set(n),r.uniformMatrix2fv(this.addr,!1,$a),ge(e,n)}}function kp(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;Za.set(n),r.uniformMatrix3fv(this.addr,!1,Za),ge(e,n)}}function Vp(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;Ka.set(n),r.uniformMatrix4fv(this.addr,!1,Ka),ge(e,n)}}function Gp(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Wp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;r.uniform2iv(this.addr,t),ge(e,t)}}function qp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;r.uniform3iv(this.addr,t),ge(e,t)}}function Xp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;r.uniform4iv(this.addr,t),ge(e,t)}}function Yp(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function jp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;r.uniform2uiv(this.addr,t),ge(e,t)}}function Kp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;r.uniform3uiv(this.addr,t),ge(e,t)}}function Zp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;r.uniform4uiv(this.addr,t),ge(e,t)}}function $p(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?ml:pl;e.setTexture2D(t||s,i)}function Jp(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||vl,i)}function Qp(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||_l,i)}function tm(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||gl,i)}function em(r){switch(r){case 5126:return Fp;case 35664:return Op;case 35665:return Bp;case 35666:return zp;case 35674:return Hp;case 35675:return kp;case 35676:return Vp;case 5124:case 35670:return Gp;case 35667:case 35671:return Wp;case 35668:case 35672:return qp;case 35669:case 35673:return Xp;case 5125:return Yp;case 36294:return jp;case 36295:return Kp;case 36296:return Zp;case 35678:case 36198:case 36298:case 36306:case 35682:return $p;case 35679:case 36299:case 36307:return Jp;case 35680:case 36300:case 36308:case 36293:return Qp;case 36289:case 36303:case 36311:case 36292:return tm}}function nm(r,t){r.uniform1fv(this.addr,t)}function im(r,t){const e=qi(t,this.size,2);r.uniform2fv(this.addr,e)}function sm(r,t){const e=qi(t,this.size,3);r.uniform3fv(this.addr,e)}function rm(r,t){const e=qi(t,this.size,4);r.uniform4fv(this.addr,e)}function om(r,t){const e=qi(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function am(r,t){const e=qi(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function cm(r,t){const e=qi(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function lm(r,t){r.uniform1iv(this.addr,t)}function hm(r,t){r.uniform2iv(this.addr,t)}function um(r,t){r.uniform3iv(this.addr,t)}function dm(r,t){r.uniform4iv(this.addr,t)}function fm(r,t){r.uniform1uiv(this.addr,t)}function pm(r,t){r.uniform2uiv(this.addr,t)}function mm(r,t){r.uniform3uiv(this.addr,t)}function gm(r,t){r.uniform4uiv(this.addr,t)}function vm(r,t,e){const n=this.cache,i=t.length,s=cr(e,i);me(n,s)||(r.uniform1iv(this.addr,s),ge(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||pl,s[o])}function _m(r,t,e){const n=this.cache,i=t.length,s=cr(e,i);me(n,s)||(r.uniform1iv(this.addr,s),ge(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||vl,s[o])}function xm(r,t,e){const n=this.cache,i=t.length,s=cr(e,i);me(n,s)||(r.uniform1iv(this.addr,s),ge(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||_l,s[o])}function ym(r,t,e){const n=this.cache,i=t.length,s=cr(e,i);me(n,s)||(r.uniform1iv(this.addr,s),ge(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||gl,s[o])}function Mm(r){switch(r){case 5126:return nm;case 35664:return im;case 35665:return sm;case 35666:return rm;case 35674:return om;case 35675:return am;case 35676:return cm;case 5124:case 35670:return lm;case 35667:case 35671:return hm;case 35668:case 35672:return um;case 35669:case 35673:return dm;case 5125:return fm;case 36294:return pm;case 36295:return mm;case 36296:return gm;case 35678:case 36198:case 36298:case 36306:case 35682:return vm;case 35679:case 36299:case 36307:return _m;case 35680:case 36300:case 36308:case 36293:return xm;case 36289:case 36303:case 36311:case 36292:return ym}}class Sm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=em(e.type)}}class Em{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Mm(e.type)}}class wm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const Wr=/(\w+)(\])?(\[|\.)?/g;function Ja(r,t){r.seq.push(t),r.map[t.id]=t}function bm(r,t,e){const n=r.name,i=n.length;for(Wr.lastIndex=0;;){const s=Wr.exec(n),o=Wr.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Ja(e,l===void 0?new Sm(a,r,t):new Em(a,r,t));break}else{let d=e.map[a];d===void 0&&(d=new wm(a),Ja(e,d)),e=d}}}class Xs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);bm(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Qa(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const Tm=37297;let Am=0;function Cm(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Rm(r){const t=Zt.getPrimaries(Zt.workingColorSpace),e=Zt.getPrimaries(r);let n;switch(t===e?n="":t===Js&&e===$s?n="LinearDisplayP3ToLinearSRGB":t===$s&&e===Js&&(n="LinearSRGBToLinearDisplayP3"),r){case Vn:case or:return[n,"LinearTransferOETF"];case je:case xo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function tc(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Cm(r.getShaderSource(t),o)}else return i}function Pm(r,t){const e=Rm(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Lm(r,t){let e;switch(t){case Sh:e="Linear";break;case Eh:e="Reinhard";break;case wh:e="OptimizedCineon";break;case bh:e="ACESFilmic";break;case Ah:e="AgX";break;case Ch:e="Neutral";break;case Th:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Im(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(is).join(`
`)}function Nm(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Dm(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function is(r){return r!==""}function ec(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nc(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Um=/^[ \t]*#include +<([\w\d./]+)>/gm;function ho(r){return r.replace(Um,Om)}const Fm=new Map;function Om(r,t){let e=Pt[t];if(e===void 0){const n=Fm.get(t);if(n!==void 0)e=Pt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ho(e)}const Bm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ic(r){return r.replace(Bm,zm)}function zm(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function sc(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Hm(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Vc?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Gc?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===yn&&(t="SHADOWMAP_TYPE_VSM"),t}function km(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Fi:case Oi:t="ENVMAP_TYPE_CUBE";break;case sr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Vm(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Oi:t="ENVMAP_MODE_REFRACTION";break}return t}function Gm(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Wc:t="ENVMAP_BLENDING_MULTIPLY";break;case yh:t="ENVMAP_BLENDING_MIX";break;case Mh:t="ENVMAP_BLENDING_ADD";break}return t}function Wm(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function qm(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Hm(e),l=km(e),h=Vm(e),d=Gm(e),u=Wm(e),f=Im(e),g=Nm(s),v=i.createProgram();let p,m,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(is).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(is).join(`
`),m.length>0&&(m+=`
`)):(p=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(is).join(`
`),m=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bn?"#define TONE_MAPPING":"",e.toneMapping!==Bn?Pt.tonemapping_pars_fragment:"",e.toneMapping!==Bn?Lm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Pt.colorspace_pars_fragment,Pm("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(is).join(`
`)),o=ho(o),o=ec(o,e),o=nc(o,e),a=ho(a),a=ec(a,e),a=nc(a,e),o=ic(o),a=ic(a),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===xa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=_+p+o,S=_+m+a,C=Qa(i,i.VERTEX_SHADER,x),T=Qa(i,i.FRAGMENT_SHADER,S);i.attachShader(v,C),i.attachShader(v,T),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function A(R){if(r.debug.checkShaderErrors){const H=i.getProgramInfoLog(v).trim(),P=i.getShaderInfoLog(C).trim(),U=i.getShaderInfoLog(T).trim();let B=!0,I=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(B=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,C,T);else{const j=tc(i,C,"vertex"),V=tc(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+H+`
`+j+`
`+V)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(P===""||U==="")&&(I=!1);I&&(R.diagnostics={runnable:B,programLog:H,vertexShader:{log:P,prefix:p},fragmentShader:{log:U,prefix:m}})}i.deleteShader(C),i.deleteShader(T),N=new Xs(i,v),w=Dm(i,v)}let N;this.getUniforms=function(){return N===void 0&&A(this),N};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,Tm)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Am++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=T,this}let Xm=0;class Ym{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new jm(t),e.set(t,n)),n}}class jm{constructor(t){this.id=Xm++,this.code=t,this.usedTimes=0}}function Km(r,t,e,n,i,s,o){const a=new sl,c=new Ym,l=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return l.add(w),w===0?"uv":`uv${w}`}function p(w,M,R,H,P){const U=H.fog,B=P.geometry,I=w.isMeshStandardMaterial?H.environment:null,j=(w.isMeshStandardMaterial?e:t).get(w.envMap||I),V=j&&j.mapping===sr?j.image.height:null,Z=g[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const ot=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,at=ot!==void 0?ot.length:0;let st=0;B.morphAttributes.position!==void 0&&(st=1),B.morphAttributes.normal!==void 0&&(st=2),B.morphAttributes.color!==void 0&&(st=3);let Bt,X,tt,mt;if(Z){const $t=nn[Z];Bt=$t.vertexShader,X=$t.fragmentShader}else Bt=w.vertexShader,X=w.fragmentShader,c.update(w),tt=c.getVertexShaderID(w),mt=c.getFragmentShaderID(w);const ct=r.getRenderTarget(),Ut=P.isInstancedMesh===!0,It=P.isBatchedMesh===!0,Gt=!!w.map,O=!!w.matcap,kt=!!j,zt=!!w.aoMap,ie=!!w.lightMap,wt=!!w.bumpMap,Wt=!!w.normalMap,Ft=!!w.displacementMap,Rt=!!w.emissiveMap,he=!!w.metalnessMap,L=!!w.roughnessMap,E=w.anisotropy>0,q=w.clearcoat>0,$=w.dispersion>0,J=w.iridescence>0,Q=w.sheen>0,St=w.transmission>0,ht=E&&!!w.anisotropyMap,ut=q&&!!w.clearcoatMap,Nt=q&&!!w.clearcoatNormalMap,et=q&&!!w.clearcoatRoughnessMap,yt=J&&!!w.iridescenceMap,Ot=J&&!!w.iridescenceThicknessMap,At=Q&&!!w.sheenColorMap,dt=Q&&!!w.sheenRoughnessMap,Dt=!!w.specularMap,Ht=!!w.specularColorMap,ce=!!w.specularIntensityMap,D=St&&!!w.transmissionMap,ft=St&&!!w.thicknessMap,Y=!!w.gradientMap,K=!!w.alphaMap,it=w.alphaTest>0,Ct=!!w.alphaHash,qt=!!w.extensions;let le=Bn;w.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(le=r.toneMapping);const ve={shaderID:Z,shaderType:w.type,shaderName:w.name,vertexShader:Bt,fragmentShader:X,defines:w.defines,customVertexShaderID:tt,customFragmentShaderID:mt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:It,batchingColor:It&&P._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&P.instanceColor!==null,instancingMorph:Ut&&P.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ct===null?r.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:Vn,alphaToCoverage:!!w.alphaToCoverage,map:Gt,matcap:O,envMap:kt,envMapMode:kt&&j.mapping,envMapCubeUVHeight:V,aoMap:zt,lightMap:ie,bumpMap:wt,normalMap:Wt,displacementMap:u&&Ft,emissiveMap:Rt,normalMapObjectSpace:Wt&&w.normalMapType===Vh,normalMapTangentSpace:Wt&&w.normalMapType===Jc,metalnessMap:he,roughnessMap:L,anisotropy:E,anisotropyMap:ht,clearcoat:q,clearcoatMap:ut,clearcoatNormalMap:Nt,clearcoatRoughnessMap:et,dispersion:$,iridescence:J,iridescenceMap:yt,iridescenceThicknessMap:Ot,sheen:Q,sheenColorMap:At,sheenRoughnessMap:dt,specularMap:Dt,specularColorMap:Ht,specularIntensityMap:ce,transmission:St,transmissionMap:D,thicknessMap:ft,gradientMap:Y,opaque:w.transparent===!1&&w.blending===Ii&&w.alphaToCoverage===!1,alphaMap:K,alphaTest:it,alphaHash:Ct,combine:w.combine,mapUv:Gt&&v(w.map.channel),aoMapUv:zt&&v(w.aoMap.channel),lightMapUv:ie&&v(w.lightMap.channel),bumpMapUv:wt&&v(w.bumpMap.channel),normalMapUv:Wt&&v(w.normalMap.channel),displacementMapUv:Ft&&v(w.displacementMap.channel),emissiveMapUv:Rt&&v(w.emissiveMap.channel),metalnessMapUv:he&&v(w.metalnessMap.channel),roughnessMapUv:L&&v(w.roughnessMap.channel),anisotropyMapUv:ht&&v(w.anisotropyMap.channel),clearcoatMapUv:ut&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:Nt&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ot&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:At&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:dt&&v(w.sheenRoughnessMap.channel),specularMapUv:Dt&&v(w.specularMap.channel),specularColorMapUv:Ht&&v(w.specularColorMap.channel),specularIntensityMapUv:ce&&v(w.specularIntensityMap.channel),transmissionMapUv:D&&v(w.transmissionMap.channel),thicknessMapUv:ft&&v(w.thicknessMap.channel),alphaMapUv:K&&v(w.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Wt||E),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!B.attributes.uv&&(Gt||K),fog:!!U,useFog:w.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:P.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:st,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&R.length>0,shadowMapType:r.shadowMap.type,toneMapping:le,decodeVideoTexture:Gt&&w.map.isVideoTexture===!0&&Zt.getTransfer(w.map.colorSpace)===ne,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Mn,flipSided:w.side===Ne,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:qt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:qt&&w.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return ve.vertexUv1s=l.has(1),ve.vertexUv2s=l.has(2),ve.vertexUv3s=l.has(3),l.clear(),ve}function m(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const R in w.defines)M.push(R),M.push(w.defines[R]);return w.isRawShaderMaterial===!1&&(_(M,w),x(M,w),M.push(r.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function _(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function x(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.doubleSided&&a.enable(10),M.flipSided&&a.enable(11),M.useDepthPacking&&a.enable(12),M.dithering&&a.enable(13),M.transmission&&a.enable(14),M.sheen&&a.enable(15),M.opaque&&a.enable(16),M.pointsUvs&&a.enable(17),M.decodeVideoTexture&&a.enable(18),M.alphaToCoverage&&a.enable(19),w.push(a.mask)}function S(w){const M=g[w.type];let R;if(M){const H=nn[M];R=Iu.clone(H.uniforms)}else R=w.uniforms;return R}function C(w,M){let R;for(let H=0,P=h.length;H<P;H++){const U=h[H];if(U.cacheKey===M){R=U,++R.usedTimes;break}}return R===void 0&&(R=new qm(r,M,w,s),h.push(R)),R}function T(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function A(w){c.remove(w)}function N(){c.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:S,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:N}}function Zm(){let r=new WeakMap;function t(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function e(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function $m(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function rc(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function oc(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,f,g,v,p){let m=r[t];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:p},r[t]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=v,m.group=p),t++,m}function a(d,u,f,g,v,p){const m=o(d,u,f,g,v,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function c(d,u,f,g,v,p){const m=o(d,u,f,g,v,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function l(d,u){e.length>1&&e.sort(d||$m),n.length>1&&n.sort(u||rc),i.length>1&&i.sort(u||rc)}function h(){for(let d=t,u=r.length;d<u;d++){const f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function Jm(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new oc,r.set(n,[o])):i>=s.length?(o=new oc,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function Qm(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Vt};break;case"SpotLight":e={position:new F,direction:new F,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new F,halfWidth:new F,halfHeight:new F};break}return r[t.id]=e,e}}}function tg(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let eg=0;function ng(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function ig(r){const t=new Qm,e=tg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const i=new F,s=new ae,o=new ae;function a(l){let h=0,d=0,u=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,g=0,v=0,p=0,m=0,_=0,x=0,S=0,C=0,T=0,A=0;l.sort(ng);for(let w=0,M=l.length;w<M;w++){const R=l[w],H=R.color,P=R.intensity,U=R.distance,B=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=H.r*P,d+=H.g*P,u+=H.b*P;else if(R.isLightProbe){for(let I=0;I<9;I++)n.probe[I].addScaledVector(R.sh.coefficients[I],P);A++}else if(R.isDirectionalLight){const I=t.get(R);if(I.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const j=R.shadow,V=e.get(R);V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=R.shadow.matrix,_++}n.directional[f]=I,f++}else if(R.isSpotLight){const I=t.get(R);I.position.setFromMatrixPosition(R.matrixWorld),I.color.copy(H).multiplyScalar(P),I.distance=U,I.coneCos=Math.cos(R.angle),I.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),I.decay=R.decay,n.spot[v]=I;const j=R.shadow;if(R.map&&(n.spotLightMap[C]=R.map,C++,j.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[v]=j.matrix,R.castShadow){const V=e.get(R);V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=B,S++}v++}else if(R.isRectAreaLight){const I=t.get(R);I.color.copy(H).multiplyScalar(P),I.halfWidth.set(R.width*.5,0,0),I.halfHeight.set(0,R.height*.5,0),n.rectArea[p]=I,p++}else if(R.isPointLight){const I=t.get(R);if(I.color.copy(R.color).multiplyScalar(R.intensity),I.distance=R.distance,I.decay=R.decay,R.castShadow){const j=R.shadow,V=e.get(R);V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,V.shadowCameraNear=j.camera.near,V.shadowCameraFar=j.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=R.shadow.matrix,x++}n.point[g]=I,g++}else if(R.isHemisphereLight){const I=t.get(R);I.skyColor.copy(R.color).multiplyScalar(P),I.groundColor.copy(R.groundColor).multiplyScalar(P),n.hemi[m]=I,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const N=n.hash;(N.directionalLength!==f||N.pointLength!==g||N.spotLength!==v||N.rectAreaLength!==p||N.hemiLength!==m||N.numDirectionalShadows!==_||N.numPointShadows!==x||N.numSpotShadows!==S||N.numSpotMaps!==C||N.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=S+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,N.directionalLength=f,N.pointLength=g,N.spotLength=v,N.rectAreaLength=p,N.hemiLength=m,N.numDirectionalShadows=_,N.numPointShadows=x,N.numSpotShadows=S,N.numSpotMaps=C,N.numLightProbes=A,n.version=eg++)}function c(l,h){let d=0,u=0,f=0,g=0,v=0;const p=h.matrixWorldInverse;for(let m=0,_=l.length;m<_;m++){const x=l[m];if(x.isDirectionalLight){const S=n.directional[d];S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),d++}else if(x.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),f++}else if(x.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),o.identity(),s.copy(x.matrixWorld),s.premultiply(p),o.extractRotation(s),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const S=n.point[u];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),u++}else if(x.isHemisphereLight){const S=n.hemi[v];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(p),v++}}}return{setup:a,setupView:c,state:n}}function ac(r){const t=new ig(r),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function sg(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new ac(r),t.set(i,[a])):s>=o.length?(a=new ac(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class rg extends ds{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class og extends ds{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const ag=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function lg(r,t,e){let n=new Eo;const i=new _t,s=new _t,o=new Se,a=new rg({depthPacking:kh}),c=new og,l={},h=e.maxTextureSize,d={[zn]:Ne,[Ne]:zn,[Mn]:Mn},u=new kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:ag,fragmentShader:cg}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new cn;g.setAttribute("position",new on(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new te(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vc;let m=this.type;this.render=function(T,A,N){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const w=r.getRenderTarget(),M=r.getActiveCubeFace(),R=r.getActiveMipmapLevel(),H=r.state;H.setBlending(On),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const P=m!==yn&&this.type===yn,U=m===yn&&this.type!==yn;for(let B=0,I=T.length;B<I;B++){const j=T[B],V=j.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const Z=V.getFrameExtents();if(i.multiply(Z),s.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Z.x),i.x=s.x*Z.x,V.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Z.y),i.y=s.y*Z.y,V.mapSize.y=s.y)),V.map===null||P===!0||U===!0){const at=this.type!==yn?{minFilter:Ge,magFilter:Ge}:{};V.map!==null&&V.map.dispose(),V.map=new oi(i.x,i.y,at),V.map.texture.name=j.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const ot=V.getViewportCount();for(let at=0;at<ot;at++){const st=V.getViewport(at);o.set(s.x*st.x,s.y*st.y,s.x*st.z,s.y*st.w),H.viewport(o),V.updateMatrices(j,at),n=V.getFrustum(),S(A,N,V.camera,j,this.type)}V.isPointLightShadow!==!0&&this.type===yn&&_(V,N),V.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(w,M,R)};function _(T,A){const N=t.update(v);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new oi(i.x,i.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(A,null,N,u,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(A,null,N,f,v,null)}function x(T,A,N,w){let M=null;const R=N.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)M=R;else if(M=N.isPointLight===!0?c:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=M.uuid,P=A.uuid;let U=l[H];U===void 0&&(U={},l[H]=U);let B=U[P];B===void 0&&(B=M.clone(),U[P]=B,A.addEventListener("dispose",C)),M=B}if(M.visible=A.visible,M.wireframe=A.wireframe,w===yn?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:d[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,N.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=r.properties.get(M);H.light=N}return M}function S(T,A,N,w,M){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===yn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,T.matrixWorld);const P=t.update(T),U=T.material;if(Array.isArray(U)){const B=P.groups;for(let I=0,j=B.length;I<j;I++){const V=B[I],Z=U[V.materialIndex];if(Z&&Z.visible){const ot=x(T,Z,w,M);T.onBeforeShadow(r,T,A,N,P,ot,V),r.renderBufferDirect(N,null,P,ot,T,V),T.onAfterShadow(r,T,A,N,P,ot,V)}}}else if(U.visible){const B=x(T,U,w,M);T.onBeforeShadow(r,T,A,N,P,B,null),r.renderBufferDirect(N,null,P,B,T,null),T.onAfterShadow(r,T,A,N,P,B,null)}}const H=T.children;for(let P=0,U=H.length;P<U;P++)S(H[P],A,N,w,M)}function C(T){T.target.removeEventListener("dispose",C);for(const N in l){const w=l[N],M=T.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}function hg(r){function t(){let D=!1;const ft=new Se;let Y=null;const K=new Se(0,0,0,0);return{setMask:function(it){Y!==it&&!D&&(r.colorMask(it,it,it,it),Y=it)},setLocked:function(it){D=it},setClear:function(it,Ct,qt,le,ve){ve===!0&&(it*=le,Ct*=le,qt*=le),ft.set(it,Ct,qt,le),K.equals(ft)===!1&&(r.clearColor(it,Ct,qt,le),K.copy(ft))},reset:function(){D=!1,Y=null,K.set(-1,0,0,0)}}}function e(){let D=!1,ft=null,Y=null,K=null;return{setTest:function(it){it?mt(r.DEPTH_TEST):ct(r.DEPTH_TEST)},setMask:function(it){ft!==it&&!D&&(r.depthMask(it),ft=it)},setFunc:function(it){if(Y!==it){switch(it){case fh:r.depthFunc(r.NEVER);break;case ph:r.depthFunc(r.ALWAYS);break;case mh:r.depthFunc(r.LESS);break;case js:r.depthFunc(r.LEQUAL);break;case gh:r.depthFunc(r.EQUAL);break;case vh:r.depthFunc(r.GEQUAL);break;case _h:r.depthFunc(r.GREATER);break;case xh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Y=it}},setLocked:function(it){D=it},setClear:function(it){K!==it&&(r.clearDepth(it),K=it)},reset:function(){D=!1,ft=null,Y=null,K=null}}}function n(){let D=!1,ft=null,Y=null,K=null,it=null,Ct=null,qt=null,le=null,ve=null;return{setTest:function($t){D||($t?mt(r.STENCIL_TEST):ct(r.STENCIL_TEST))},setMask:function($t){ft!==$t&&!D&&(r.stencilMask($t),ft=$t)},setFunc:function($t,$e,Je){(Y!==$t||K!==$e||it!==Je)&&(r.stencilFunc($t,$e,Je),Y=$t,K=$e,it=Je)},setOp:function($t,$e,Je){(Ct!==$t||qt!==$e||le!==Je)&&(r.stencilOp($t,$e,Je),Ct=$t,qt=$e,le=Je)},setLocked:function($t){D=$t},setClear:function($t){ve!==$t&&(r.clearStencil($t),ve=$t)},reset:function(){D=!1,ft=null,Y=null,K=null,it=null,Ct=null,qt=null,le=null,ve=null}}}const i=new t,s=new e,o=new n,a=new WeakMap,c=new WeakMap;let l={},h={},d=new WeakMap,u=[],f=null,g=!1,v=null,p=null,m=null,_=null,x=null,S=null,C=null,T=new Vt(0,0,0),A=0,N=!1,w=null,M=null,R=null,H=null,P=null;const U=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,I=0;const j=r.getParameter(r.VERSION);j.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(j)[1]),B=I>=1):j.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),B=I>=2);let V=null,Z={};const ot=r.getParameter(r.SCISSOR_BOX),at=r.getParameter(r.VIEWPORT),st=new Se().fromArray(ot),Bt=new Se().fromArray(at);function X(D,ft,Y,K){const it=new Uint8Array(4),Ct=r.createTexture();r.bindTexture(D,Ct),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let qt=0;qt<Y;qt++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(ft,0,r.RGBA,1,1,K,0,r.RGBA,r.UNSIGNED_BYTE,it):r.texImage2D(ft+qt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,it);return Ct}const tt={};tt[r.TEXTURE_2D]=X(r.TEXTURE_2D,r.TEXTURE_2D,1),tt[r.TEXTURE_CUBE_MAP]=X(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[r.TEXTURE_2D_ARRAY]=X(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),tt[r.TEXTURE_3D]=X(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),o.setClear(0),mt(r.DEPTH_TEST),s.setFunc(js),wt(!1),Wt(ko),mt(r.CULL_FACE),zt(On);function mt(D){l[D]!==!0&&(r.enable(D),l[D]=!0)}function ct(D){l[D]!==!1&&(r.disable(D),l[D]=!1)}function Ut(D,ft){return h[D]!==ft?(r.bindFramebuffer(D,ft),h[D]=ft,D===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=ft),D===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=ft),!0):!1}function It(D,ft){let Y=u,K=!1;if(D){Y=d.get(ft),Y===void 0&&(Y=[],d.set(ft,Y));const it=D.textures;if(Y.length!==it.length||Y[0]!==r.COLOR_ATTACHMENT0){for(let Ct=0,qt=it.length;Ct<qt;Ct++)Y[Ct]=r.COLOR_ATTACHMENT0+Ct;Y.length=it.length,K=!0}}else Y[0]!==r.BACK&&(Y[0]=r.BACK,K=!0);K&&r.drawBuffers(Y)}function Gt(D){return f!==D?(r.useProgram(D),f=D,!0):!1}const O={[ti]:r.FUNC_ADD,[Zl]:r.FUNC_SUBTRACT,[$l]:r.FUNC_REVERSE_SUBTRACT};O[Jl]=r.MIN,O[Ql]=r.MAX;const kt={[th]:r.ZERO,[eh]:r.ONE,[nh]:r.SRC_COLOR,[so]:r.SRC_ALPHA,[ch]:r.SRC_ALPHA_SATURATE,[oh]:r.DST_COLOR,[sh]:r.DST_ALPHA,[ih]:r.ONE_MINUS_SRC_COLOR,[ro]:r.ONE_MINUS_SRC_ALPHA,[ah]:r.ONE_MINUS_DST_COLOR,[rh]:r.ONE_MINUS_DST_ALPHA,[lh]:r.CONSTANT_COLOR,[hh]:r.ONE_MINUS_CONSTANT_COLOR,[uh]:r.CONSTANT_ALPHA,[dh]:r.ONE_MINUS_CONSTANT_ALPHA};function zt(D,ft,Y,K,it,Ct,qt,le,ve,$t){if(D===On){g===!0&&(ct(r.BLEND),g=!1);return}if(g===!1&&(mt(r.BLEND),g=!0),D!==Kl){if(D!==v||$t!==N){if((p!==ti||x!==ti)&&(r.blendEquation(r.FUNC_ADD),p=ti,x=ti),$t)switch(D){case Ii:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Vo:r.blendFunc(r.ONE,r.ONE);break;case Go:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Wo:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ii:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Vo:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Go:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Wo:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}m=null,_=null,S=null,C=null,T.set(0,0,0),A=0,v=D,N=$t}return}it=it||ft,Ct=Ct||Y,qt=qt||K,(ft!==p||it!==x)&&(r.blendEquationSeparate(O[ft],O[it]),p=ft,x=it),(Y!==m||K!==_||Ct!==S||qt!==C)&&(r.blendFuncSeparate(kt[Y],kt[K],kt[Ct],kt[qt]),m=Y,_=K,S=Ct,C=qt),(le.equals(T)===!1||ve!==A)&&(r.blendColor(le.r,le.g,le.b,ve),T.copy(le),A=ve),v=D,N=!1}function ie(D,ft){D.side===Mn?ct(r.CULL_FACE):mt(r.CULL_FACE);let Y=D.side===Ne;ft&&(Y=!Y),wt(Y),D.blending===Ii&&D.transparent===!1?zt(On):zt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),s.setFunc(D.depthFunc),s.setTest(D.depthTest),s.setMask(D.depthWrite),i.setMask(D.colorWrite);const K=D.stencilWrite;o.setTest(K),K&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Rt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?mt(r.SAMPLE_ALPHA_TO_COVERAGE):ct(r.SAMPLE_ALPHA_TO_COVERAGE)}function wt(D){w!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),w=D)}function Wt(D){D!==Yl?(mt(r.CULL_FACE),D!==M&&(D===ko?r.cullFace(r.BACK):D===jl?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ct(r.CULL_FACE),M=D}function Ft(D){D!==R&&(B&&r.lineWidth(D),R=D)}function Rt(D,ft,Y){D?(mt(r.POLYGON_OFFSET_FILL),(H!==ft||P!==Y)&&(r.polygonOffset(ft,Y),H=ft,P=Y)):ct(r.POLYGON_OFFSET_FILL)}function he(D){D?mt(r.SCISSOR_TEST):ct(r.SCISSOR_TEST)}function L(D){D===void 0&&(D=r.TEXTURE0+U-1),V!==D&&(r.activeTexture(D),V=D)}function E(D,ft,Y){Y===void 0&&(V===null?Y=r.TEXTURE0+U-1:Y=V);let K=Z[Y];K===void 0&&(K={type:void 0,texture:void 0},Z[Y]=K),(K.type!==D||K.texture!==ft)&&(V!==Y&&(r.activeTexture(Y),V=Y),r.bindTexture(D,ft||tt[D]),K.type=D,K.texture=ft)}function q(){const D=Z[V];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function $(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ht(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ut(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Nt(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ot(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(D){st.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),st.copy(D))}function dt(D){Bt.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),Bt.copy(D))}function Dt(D,ft){let Y=c.get(ft);Y===void 0&&(Y=new WeakMap,c.set(ft,Y));let K=Y.get(D);K===void 0&&(K=r.getUniformBlockIndex(ft,D.name),Y.set(D,K))}function Ht(D,ft){const K=c.get(ft).get(D);a.get(ft)!==K&&(r.uniformBlockBinding(ft,K,D.__bindingPointIndex),a.set(ft,K))}function ce(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),l={},V=null,Z={},h={},d=new WeakMap,u=[],f=null,g=!1,v=null,p=null,m=null,_=null,x=null,S=null,C=null,T=new Vt(0,0,0),A=0,N=!1,w=null,M=null,R=null,H=null,P=null,st.set(0,0,r.canvas.width,r.canvas.height),Bt.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),o.reset()}return{buffers:{color:i,depth:s,stencil:o},enable:mt,disable:ct,bindFramebuffer:Ut,drawBuffers:It,useProgram:Gt,setBlending:zt,setMaterial:ie,setFlipSided:wt,setCullFace:Wt,setLineWidth:Ft,setPolygonOffset:Rt,setScissorTest:he,activeTexture:L,bindTexture:E,unbindTexture:q,compressedTexImage2D:$,compressedTexImage3D:J,texImage2D:yt,texImage3D:Ot,updateUBOMapping:Dt,uniformBlockBinding:Ht,texStorage2D:Nt,texStorage3D:et,texSubImage2D:Q,texSubImage3D:St,compressedTexSubImage2D:ht,compressedTexSubImage3D:ut,scissor:At,viewport:dt,reset:ce}}function ug(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new _t,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,E){return f?new OffscreenCanvas(L,E):tr("canvas")}function v(L,E,q){let $=1;const J=he(L);if((J.width>q||J.height>q)&&($=q/Math.max(J.width,J.height)),$<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const Q=Math.floor($*J.width),St=Math.floor($*J.height);d===void 0&&(d=g(Q,St));const ht=E?g(Q,St):d;return ht.width=Q,ht.height=St,ht.getContext("2d").drawImage(L,0,0,Q,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Q+"x"+St+")."),ht}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),L;return L}function p(L){return L.generateMipmaps&&L.minFilter!==Ge&&L.minFilter!==Ke}function m(L){r.generateMipmap(L)}function _(L,E,q,$,J=!1){if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Q=E;if(E===r.RED&&(q===r.FLOAT&&(Q=r.R32F),q===r.HALF_FLOAT&&(Q=r.R16F),q===r.UNSIGNED_BYTE&&(Q=r.R8)),E===r.RED_INTEGER&&(q===r.UNSIGNED_BYTE&&(Q=r.R8UI),q===r.UNSIGNED_SHORT&&(Q=r.R16UI),q===r.UNSIGNED_INT&&(Q=r.R32UI),q===r.BYTE&&(Q=r.R8I),q===r.SHORT&&(Q=r.R16I),q===r.INT&&(Q=r.R32I)),E===r.RG&&(q===r.FLOAT&&(Q=r.RG32F),q===r.HALF_FLOAT&&(Q=r.RG16F),q===r.UNSIGNED_BYTE&&(Q=r.RG8)),E===r.RG_INTEGER&&(q===r.UNSIGNED_BYTE&&(Q=r.RG8UI),q===r.UNSIGNED_SHORT&&(Q=r.RG16UI),q===r.UNSIGNED_INT&&(Q=r.RG32UI),q===r.BYTE&&(Q=r.RG8I),q===r.SHORT&&(Q=r.RG16I),q===r.INT&&(Q=r.RG32I)),E===r.RGB&&q===r.UNSIGNED_INT_5_9_9_9_REV&&(Q=r.RGB9_E5),E===r.RGBA){const St=J?Zs:Zt.getTransfer($);q===r.FLOAT&&(Q=r.RGBA32F),q===r.HALF_FLOAT&&(Q=r.RGBA16F),q===r.UNSIGNED_BYTE&&(Q=St===ne?r.SRGB8_ALPHA8:r.RGBA8),q===r.UNSIGNED_SHORT_4_4_4_4&&(Q=r.RGBA4),q===r.UNSIGNED_SHORT_5_5_5_1&&(Q=r.RGB5_A1)}return(Q===r.R16F||Q===r.R32F||Q===r.RG16F||Q===r.RG32F||Q===r.RGBA16F||Q===r.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function x(L,E){let q;return L?E===null||E===Bi||E===zi?q=r.DEPTH24_STENCIL8:E===Nn?q=r.DEPTH32F_STENCIL8:E===Ks&&(q=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Bi||E===zi?q=r.DEPTH_COMPONENT24:E===Nn?q=r.DEPTH_COMPONENT32F:E===Ks&&(q=r.DEPTH_COMPONENT16),q}function S(L,E){return p(L)===!0||L.isFramebufferTexture&&L.minFilter!==Ge&&L.minFilter!==Ke?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function C(L){const E=L.target;E.removeEventListener("dispose",C),A(E),E.isVideoTexture&&h.delete(E)}function T(L){const E=L.target;E.removeEventListener("dispose",T),w(E)}function A(L){const E=n.get(L);if(E.__webglInit===void 0)return;const q=L.source,$=u.get(q);if($){const J=$[E.__cacheKey];J.usedTimes--,J.usedTimes===0&&N(L),Object.keys($).length===0&&u.delete(q)}n.remove(L)}function N(L){const E=n.get(L);r.deleteTexture(E.__webglTexture);const q=L.source,$=u.get(q);delete $[E.__cacheKey],o.memory.textures--}function w(L){const E=n.get(L);if(L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(E.__webglFramebuffer[$]))for(let J=0;J<E.__webglFramebuffer[$].length;J++)r.deleteFramebuffer(E.__webglFramebuffer[$][J]);else r.deleteFramebuffer(E.__webglFramebuffer[$]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[$])}else{if(Array.isArray(E.__webglFramebuffer))for(let $=0;$<E.__webglFramebuffer.length;$++)r.deleteFramebuffer(E.__webglFramebuffer[$]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let $=0;$<E.__webglColorRenderbuffer.length;$++)E.__webglColorRenderbuffer[$]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[$]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const q=L.textures;for(let $=0,J=q.length;$<J;$++){const Q=n.get(q[$]);Q.__webglTexture&&(r.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(q[$])}n.remove(L)}let M=0;function R(){M=0}function H(){const L=M;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),M+=1,L}function P(L){const E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.colorSpace),E.join()}function U(L,E){const q=n.get(L);if(L.isVideoTexture&&Ft(L),L.isRenderTargetTexture===!1&&L.version>0&&q.__version!==L.version){const $=L.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Bt(q,L,E);return}}e.bindTexture(r.TEXTURE_2D,q.__webglTexture,r.TEXTURE0+E)}function B(L,E){const q=n.get(L);if(L.version>0&&q.__version!==L.version){Bt(q,L,E);return}e.bindTexture(r.TEXTURE_2D_ARRAY,q.__webglTexture,r.TEXTURE0+E)}function I(L,E){const q=n.get(L);if(L.version>0&&q.__version!==L.version){Bt(q,L,E);return}e.bindTexture(r.TEXTURE_3D,q.__webglTexture,r.TEXTURE0+E)}function j(L,E){const q=n.get(L);if(L.version>0&&q.__version!==L.version){X(q,L,E);return}e.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture,r.TEXTURE0+E)}const V={[co]:r.REPEAT,[ii]:r.CLAMP_TO_EDGE,[lo]:r.MIRRORED_REPEAT},Z={[Ge]:r.NEAREST,[Rh]:r.NEAREST_MIPMAP_NEAREST,[gs]:r.NEAREST_MIPMAP_LINEAR,[Ke]:r.LINEAR,[mr]:r.LINEAR_MIPMAP_NEAREST,[si]:r.LINEAR_MIPMAP_LINEAR},ot={[Gh]:r.NEVER,[Kh]:r.ALWAYS,[Wh]:r.LESS,[Qc]:r.LEQUAL,[qh]:r.EQUAL,[jh]:r.GEQUAL,[Xh]:r.GREATER,[Yh]:r.NOTEQUAL};function at(L,E){if(E.type===Nn&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Ke||E.magFilter===mr||E.magFilter===gs||E.magFilter===si||E.minFilter===Ke||E.minFilter===mr||E.minFilter===gs||E.minFilter===si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,V[E.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,V[E.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,V[E.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,Z[E.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,Z[E.minFilter]),E.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,ot[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ge||E.minFilter!==gs&&E.minFilter!==si||E.type===Nn&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");r.texParameterf(L,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function st(L,E){let q=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",C));const $=E.source;let J=u.get($);J===void 0&&(J={},u.set($,J));const Q=P(E);if(Q!==L.__cacheKey){J[Q]===void 0&&(J[Q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,q=!0),J[Q].usedTimes++;const St=J[L.__cacheKey];St!==void 0&&(J[L.__cacheKey].usedTimes--,St.usedTimes===0&&N(E)),L.__cacheKey=Q,L.__webglTexture=J[Q].texture}return q}function Bt(L,E,q){let $=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&($=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&($=r.TEXTURE_3D);const J=st(L,E),Q=E.source;e.bindTexture($,L.__webglTexture,r.TEXTURE0+q);const St=n.get(Q);if(Q.version!==St.__version||J===!0){e.activeTexture(r.TEXTURE0+q);const ht=Zt.getPrimaries(Zt.workingColorSpace),ut=E.colorSpace===In?null:Zt.getPrimaries(E.colorSpace),Nt=E.colorSpace===In||ht===ut?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let et=v(E.image,!1,i.maxTextureSize);et=Rt(E,et);const yt=s.convert(E.format,E.colorSpace),Ot=s.convert(E.type);let At=_(E.internalFormat,yt,Ot,E.colorSpace,E.isVideoTexture);at($,E);let dt;const Dt=E.mipmaps,Ht=E.isVideoTexture!==!0,ce=St.__version===void 0||J===!0,D=Q.dataReady,ft=S(E,et);if(E.isDepthTexture)At=x(E.format===Hi,E.type),ce&&(Ht?e.texStorage2D(r.TEXTURE_2D,1,At,et.width,et.height):e.texImage2D(r.TEXTURE_2D,0,At,et.width,et.height,0,yt,Ot,null));else if(E.isDataTexture)if(Dt.length>0){Ht&&ce&&e.texStorage2D(r.TEXTURE_2D,ft,At,Dt[0].width,Dt[0].height);for(let Y=0,K=Dt.length;Y<K;Y++)dt=Dt[Y],Ht?D&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,dt.width,dt.height,yt,Ot,dt.data):e.texImage2D(r.TEXTURE_2D,Y,At,dt.width,dt.height,0,yt,Ot,dt.data);E.generateMipmaps=!1}else Ht?(ce&&e.texStorage2D(r.TEXTURE_2D,ft,At,et.width,et.height),D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,et.width,et.height,yt,Ot,et.data)):e.texImage2D(r.TEXTURE_2D,0,At,et.width,et.height,0,yt,Ot,et.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ht&&ce&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ft,At,Dt[0].width,Dt[0].height,et.depth);for(let Y=0,K=Dt.length;Y<K;Y++)if(dt=Dt[Y],E.format!==rn)if(yt!==null)if(Ht){if(D)if(E.layerUpdates.size>0){for(const it of E.layerUpdates){const Ct=dt.width*dt.height;e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,it,dt.width,dt.height,1,yt,dt.data.slice(Ct*it,Ct*(it+1)),0,0)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,dt.width,dt.height,et.depth,yt,dt.data,0,0)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Y,At,dt.width,dt.height,et.depth,0,dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?D&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,dt.width,dt.height,et.depth,yt,Ot,dt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Y,At,dt.width,dt.height,et.depth,0,yt,Ot,dt.data)}else{Ht&&ce&&e.texStorage2D(r.TEXTURE_2D,ft,At,Dt[0].width,Dt[0].height);for(let Y=0,K=Dt.length;Y<K;Y++)dt=Dt[Y],E.format!==rn?yt!==null?Ht?D&&e.compressedTexSubImage2D(r.TEXTURE_2D,Y,0,0,dt.width,dt.height,yt,dt.data):e.compressedTexImage2D(r.TEXTURE_2D,Y,At,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?D&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,dt.width,dt.height,yt,Ot,dt.data):e.texImage2D(r.TEXTURE_2D,Y,At,dt.width,dt.height,0,yt,Ot,dt.data)}else if(E.isDataArrayTexture)if(Ht){if(ce&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ft,At,et.width,et.height,et.depth),D)if(E.layerUpdates.size>0){let Y;switch(Ot){case r.UNSIGNED_BYTE:switch(yt){case r.ALPHA:Y=1;break;case r.LUMINANCE:Y=1;break;case r.LUMINANCE_ALPHA:Y=2;break;case r.RGB:Y=3;break;case r.RGBA:Y=4;break;default:throw new Error(`Unknown texel size for format ${yt}.`)}break;case r.UNSIGNED_SHORT_4_4_4_4:case r.UNSIGNED_SHORT_5_5_5_1:case r.UNSIGNED_SHORT_5_6_5:Y=1;break;default:throw new Error(`Unknown texel size for type ${Ot}.`)}const K=et.width*et.height*Y;for(const it of E.layerUpdates)e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,it,et.width,et.height,1,yt,Ot,et.data.slice(K*it,K*(it+1)));E.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,yt,Ot,et.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,At,et.width,et.height,et.depth,0,yt,Ot,et.data);else if(E.isData3DTexture)Ht?(ce&&e.texStorage3D(r.TEXTURE_3D,ft,At,et.width,et.height,et.depth),D&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,yt,Ot,et.data)):e.texImage3D(r.TEXTURE_3D,0,At,et.width,et.height,et.depth,0,yt,Ot,et.data);else if(E.isFramebufferTexture){if(ce)if(Ht)e.texStorage2D(r.TEXTURE_2D,ft,At,et.width,et.height);else{let Y=et.width,K=et.height;for(let it=0;it<ft;it++)e.texImage2D(r.TEXTURE_2D,it,At,Y,K,0,yt,Ot,null),Y>>=1,K>>=1}}else if(Dt.length>0){if(Ht&&ce){const Y=he(Dt[0]);e.texStorage2D(r.TEXTURE_2D,ft,At,Y.width,Y.height)}for(let Y=0,K=Dt.length;Y<K;Y++)dt=Dt[Y],Ht?D&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,yt,Ot,dt):e.texImage2D(r.TEXTURE_2D,Y,At,yt,Ot,dt);E.generateMipmaps=!1}else if(Ht){if(ce){const Y=he(et);e.texStorage2D(r.TEXTURE_2D,ft,At,Y.width,Y.height)}D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,yt,Ot,et)}else e.texImage2D(r.TEXTURE_2D,0,At,yt,Ot,et);p(E)&&m($),St.__version=Q.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function X(L,E,q){if(E.image.length!==6)return;const $=st(L,E),J=E.source;e.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+q);const Q=n.get(J);if(J.version!==Q.__version||$===!0){e.activeTexture(r.TEXTURE0+q);const St=Zt.getPrimaries(Zt.workingColorSpace),ht=E.colorSpace===In?null:Zt.getPrimaries(E.colorSpace),ut=E.colorSpace===In||St===ht?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);const Nt=E.isCompressedTexture||E.image[0].isCompressedTexture,et=E.image[0]&&E.image[0].isDataTexture,yt=[];for(let K=0;K<6;K++)!Nt&&!et?yt[K]=v(E.image[K],!0,i.maxCubemapSize):yt[K]=et?E.image[K].image:E.image[K],yt[K]=Rt(E,yt[K]);const Ot=yt[0],At=s.convert(E.format,E.colorSpace),dt=s.convert(E.type),Dt=_(E.internalFormat,At,dt,E.colorSpace),Ht=E.isVideoTexture!==!0,ce=Q.__version===void 0||$===!0,D=J.dataReady;let ft=S(E,Ot);at(r.TEXTURE_CUBE_MAP,E);let Y;if(Nt){Ht&&ce&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ft,Dt,Ot.width,Ot.height);for(let K=0;K<6;K++){Y=yt[K].mipmaps;for(let it=0;it<Y.length;it++){const Ct=Y[it];E.format!==rn?At!==null?Ht?D&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,it,0,0,Ct.width,Ct.height,At,Ct.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,it,Dt,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,it,0,0,Ct.width,Ct.height,At,dt,Ct.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,it,Dt,Ct.width,Ct.height,0,At,dt,Ct.data)}}}else{if(Y=E.mipmaps,Ht&&ce){Y.length>0&&ft++;const K=he(yt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,ft,Dt,K.width,K.height)}for(let K=0;K<6;K++)if(et){Ht?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,yt[K].width,yt[K].height,At,dt,yt[K].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Dt,yt[K].width,yt[K].height,0,At,dt,yt[K].data);for(let it=0;it<Y.length;it++){const qt=Y[it].image[K].image;Ht?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,it+1,0,0,qt.width,qt.height,At,dt,qt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,it+1,Dt,qt.width,qt.height,0,At,dt,qt.data)}}else{Ht?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,At,dt,yt[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Dt,At,dt,yt[K]);for(let it=0;it<Y.length;it++){const Ct=Y[it];Ht?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,it+1,0,0,At,dt,Ct.image[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,it+1,Dt,At,dt,Ct.image[K])}}}p(E)&&m(r.TEXTURE_CUBE_MAP),Q.__version=J.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function tt(L,E,q,$,J,Q){const St=s.convert(q.format,q.colorSpace),ht=s.convert(q.type),ut=_(q.internalFormat,St,ht,q.colorSpace);if(!n.get(E).__hasExternalTextures){const et=Math.max(1,E.width>>Q),yt=Math.max(1,E.height>>Q);J===r.TEXTURE_3D||J===r.TEXTURE_2D_ARRAY?e.texImage3D(J,Q,ut,et,yt,E.depth,0,St,ht,null):e.texImage2D(J,Q,ut,et,yt,0,St,ht,null)}e.bindFramebuffer(r.FRAMEBUFFER,L),Wt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,$,J,n.get(q).__webglTexture,0,wt(E)):(J===r.TEXTURE_2D||J>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,$,J,n.get(q).__webglTexture,Q),e.bindFramebuffer(r.FRAMEBUFFER,null)}function mt(L,E,q){if(r.bindRenderbuffer(r.RENDERBUFFER,L),E.depthBuffer){const $=E.depthTexture,J=$&&$.isDepthTexture?$.type:null,Q=x(E.stencilBuffer,J),St=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ht=wt(E);Wt(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ht,Q,E.width,E.height):q?r.renderbufferStorageMultisample(r.RENDERBUFFER,ht,Q,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,Q,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,St,r.RENDERBUFFER,L)}else{const $=E.textures;for(let J=0;J<$.length;J++){const Q=$[J],St=s.convert(Q.format,Q.colorSpace),ht=s.convert(Q.type),ut=_(Q.internalFormat,St,ht,Q.colorSpace),Nt=wt(E);q&&Wt(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Nt,ut,E.width,E.height):Wt(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Nt,ut,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ut,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ct(L,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),U(E.depthTexture,0);const $=n.get(E.depthTexture).__webglTexture,J=wt(E);if(E.depthTexture.format===Ni)Wt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,$,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,$,0);else if(E.depthTexture.format===Hi)Wt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,$,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Ut(L){const E=n.get(L),q=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!E.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");ct(E.__webglFramebuffer,L)}else if(q){E.__webglDepthbuffer=[];for(let $=0;$<6;$++)e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[$]),E.__webglDepthbuffer[$]=r.createRenderbuffer(),mt(E.__webglDepthbuffer[$],L,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=r.createRenderbuffer(),mt(E.__webglDepthbuffer,L,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function It(L,E,q){const $=n.get(L);E!==void 0&&tt($.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),q!==void 0&&Ut(L)}function Gt(L){const E=L.texture,q=n.get(L),$=n.get(E);L.addEventListener("dispose",T);const J=L.textures,Q=L.isWebGLCubeRenderTarget===!0,St=J.length>1;if(St||($.__webglTexture===void 0&&($.__webglTexture=r.createTexture()),$.__version=E.version,o.memory.textures++),Q){q.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer[ht]=[];for(let ut=0;ut<E.mipmaps.length;ut++)q.__webglFramebuffer[ht][ut]=r.createFramebuffer()}else q.__webglFramebuffer[ht]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer=[];for(let ht=0;ht<E.mipmaps.length;ht++)q.__webglFramebuffer[ht]=r.createFramebuffer()}else q.__webglFramebuffer=r.createFramebuffer();if(St)for(let ht=0,ut=J.length;ht<ut;ht++){const Nt=n.get(J[ht]);Nt.__webglTexture===void 0&&(Nt.__webglTexture=r.createTexture(),o.memory.textures++)}if(L.samples>0&&Wt(L)===!1){q.__webglMultisampledFramebuffer=r.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ht=0;ht<J.length;ht++){const ut=J[ht];q.__webglColorRenderbuffer[ht]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,q.__webglColorRenderbuffer[ht]);const Nt=s.convert(ut.format,ut.colorSpace),et=s.convert(ut.type),yt=_(ut.internalFormat,Nt,et,ut.colorSpace,L.isXRRenderTarget===!0),Ot=wt(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ot,yt,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ht,r.RENDERBUFFER,q.__webglColorRenderbuffer[ht])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(q.__webglDepthRenderbuffer=r.createRenderbuffer(),mt(q.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Q){e.bindTexture(r.TEXTURE_CUBE_MAP,$.__webglTexture),at(r.TEXTURE_CUBE_MAP,E);for(let ht=0;ht<6;ht++)if(E.mipmaps&&E.mipmaps.length>0)for(let ut=0;ut<E.mipmaps.length;ut++)tt(q.__webglFramebuffer[ht][ut],L,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ht,ut);else tt(q.__webglFramebuffer[ht],L,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);p(E)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ht=0,ut=J.length;ht<ut;ht++){const Nt=J[ht],et=n.get(Nt);e.bindTexture(r.TEXTURE_2D,et.__webglTexture),at(r.TEXTURE_2D,Nt),tt(q.__webglFramebuffer,L,Nt,r.COLOR_ATTACHMENT0+ht,r.TEXTURE_2D,0),p(Nt)&&m(r.TEXTURE_2D)}e.unbindTexture()}else{let ht=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ht=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ht,$.__webglTexture),at(ht,E),E.mipmaps&&E.mipmaps.length>0)for(let ut=0;ut<E.mipmaps.length;ut++)tt(q.__webglFramebuffer[ut],L,E,r.COLOR_ATTACHMENT0,ht,ut);else tt(q.__webglFramebuffer,L,E,r.COLOR_ATTACHMENT0,ht,0);p(E)&&m(ht),e.unbindTexture()}L.depthBuffer&&Ut(L)}function O(L){const E=L.textures;for(let q=0,$=E.length;q<$;q++){const J=E[q];if(p(J)){const Q=L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,St=n.get(J).__webglTexture;e.bindTexture(Q,St),m(Q),e.unbindTexture()}}}const kt=[],zt=[];function ie(L){if(L.samples>0){if(Wt(L)===!1){const E=L.textures,q=L.width,$=L.height;let J=r.COLOR_BUFFER_BIT;const Q=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,St=n.get(L),ht=E.length>1;if(ht)for(let ut=0;ut<E.length;ut++)e.bindFramebuffer(r.FRAMEBUFFER,St.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ut,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,St.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ut,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let ut=0;ut<E.length;ut++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(J|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(J|=r.STENCIL_BUFFER_BIT)),ht){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,St.__webglColorRenderbuffer[ut]);const Nt=n.get(E[ut]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Nt,0)}r.blitFramebuffer(0,0,q,$,0,0,q,$,J,r.NEAREST),c===!0&&(kt.length=0,zt.length=0,kt.push(r.COLOR_ATTACHMENT0+ut),L.depthBuffer&&L.resolveDepthBuffer===!1&&(kt.push(Q),zt.push(Q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,zt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,kt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ht)for(let ut=0;ut<E.length;ut++){e.bindFramebuffer(r.FRAMEBUFFER,St.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ut,r.RENDERBUFFER,St.__webglColorRenderbuffer[ut]);const Nt=n.get(E[ut]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,St.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ut,r.TEXTURE_2D,Nt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&c){const E=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function wt(L){return Math.min(i.maxSamples,L.samples)}function Wt(L){const E=n.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ft(L){const E=o.render.frame;h.get(L)!==E&&(h.set(L,E),L.update())}function Rt(L,E){const q=L.colorSpace,$=L.format,J=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||q!==Vn&&q!==In&&(Zt.getTransfer(q)===ne?($!==rn||J!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),E}function he(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=R,this.setTexture2D=U,this.setTexture2DArray=B,this.setTexture3D=I,this.setTextureCube=j,this.rebindTextures=It,this.setupRenderTarget=Gt,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=Wt}function dg(r,t){function e(n,i=In){let s;const o=Zt.getTransfer(i);if(n===Hn)return r.UNSIGNED_BYTE;if(n===Yc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===jc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Ih)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Ph)return r.BYTE;if(n===Lh)return r.SHORT;if(n===Ks)return r.UNSIGNED_SHORT;if(n===Xc)return r.INT;if(n===Bi)return r.UNSIGNED_INT;if(n===Nn)return r.FLOAT;if(n===rr)return r.HALF_FLOAT;if(n===Nh)return r.ALPHA;if(n===Dh)return r.RGB;if(n===rn)return r.RGBA;if(n===Uh)return r.LUMINANCE;if(n===Fh)return r.LUMINANCE_ALPHA;if(n===Ni)return r.DEPTH_COMPONENT;if(n===Hi)return r.DEPTH_STENCIL;if(n===Oh)return r.RED;if(n===Kc)return r.RED_INTEGER;if(n===Bh)return r.RG;if(n===Zc)return r.RG_INTEGER;if(n===$c)return r.RGBA_INTEGER;if(n===gr||n===vr||n===_r||n===xr)if(o===ne)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===gr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===vr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===_r)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===gr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===vr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===_r)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===qo||n===Xo||n===Yo||n===jo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===qo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Xo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Yo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===jo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ko||n===Zo||n===$o)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ko||n===Zo)return o===ne?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===$o)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Jo||n===Qo||n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===oa||n===aa||n===ca||n===la||n===ha||n===ua)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Jo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ta)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ea)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===na)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ia)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===sa)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ra)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===oa)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===aa)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ca)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===la)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ha)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ua)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yr||n===da||n===fa)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===yr)return o===ne?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===da)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zh||n===pa||n===ma||n===ga)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===yr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===pa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ma)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ga)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class fg extends ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Pi extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pg={type:"move"};class qr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const p=e.getJointPose(v,n),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(pg)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Pi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const mg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gg=`
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

}`;class vg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new De,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new kn({vertexShader:mg,fragmentShader:gg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new te(new ar(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class _g extends Gi{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const v=new vg,p=e.getContextAttributes();let m=null,_=null;const x=[],S=[],C=new _t;let T=null;const A=new ke;A.layers.enable(1),A.viewport=new Se;const N=new ke;N.layers.enable(2),N.viewport=new Se;const w=[A,N],M=new fg;M.layers.enable(1),M.layers.enable(2);let R=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let tt=x[X];return tt===void 0&&(tt=new qr,x[X]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(X){let tt=x[X];return tt===void 0&&(tt=new qr,x[X]=tt),tt.getGripSpace()},this.getHand=function(X){let tt=x[X];return tt===void 0&&(tt=new qr,x[X]=tt),tt.getHandSpace()};function P(X){const tt=S.indexOf(X.inputSource);if(tt===-1)return;const mt=x[tt];mt!==void 0&&(mt.update(X.inputSource,X.frame,l||o),mt.dispatchEvent({type:X.type,data:X.inputSource}))}function U(){i.removeEventListener("select",P),i.removeEventListener("selectstart",P),i.removeEventListener("selectend",P),i.removeEventListener("squeeze",P),i.removeEventListener("squeezestart",P),i.removeEventListener("squeezeend",P),i.removeEventListener("end",U),i.removeEventListener("inputsourceschange",B);for(let X=0;X<x.length;X++){const tt=S[X];tt!==null&&(S[X]=null,x[X].disconnect(tt))}R=null,H=null,v.reset(),t.setRenderTarget(m),f=null,u=null,d=null,i=null,_=null,Bt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",P),i.addEventListener("selectstart",P),i.addEventListener("selectend",P),i.addEventListener("squeeze",P),i.addEventListener("squeezestart",P),i.addEventListener("squeezeend",P),i.addEventListener("end",U),i.addEventListener("inputsourceschange",B),p.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(C),i.renderState.layers===void 0){const tt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,tt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new oi(f.framebufferWidth,f.framebufferHeight,{format:rn,type:Hn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let tt=null,mt=null,ct=null;p.depth&&(ct=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=p.stencil?Hi:Ni,mt=p.stencil?zi:Bi);const Ut={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:s};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(Ut),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new oi(u.textureWidth,u.textureHeight,{format:rn,type:Hn,depthTexture:new fl(u.textureWidth,u.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),Bt.setContext(i),Bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function B(X){for(let tt=0;tt<X.removed.length;tt++){const mt=X.removed[tt],ct=S.indexOf(mt);ct>=0&&(S[ct]=null,x[ct].disconnect(mt))}for(let tt=0;tt<X.added.length;tt++){const mt=X.added[tt];let ct=S.indexOf(mt);if(ct===-1){for(let It=0;It<x.length;It++)if(It>=S.length){S.push(mt),ct=It;break}else if(S[It]===null){S[It]=mt,ct=It;break}if(ct===-1)break}const Ut=x[ct];Ut&&Ut.connect(mt)}}const I=new F,j=new F;function V(X,tt,mt){I.setFromMatrixPosition(tt.matrixWorld),j.setFromMatrixPosition(mt.matrixWorld);const ct=I.distanceTo(j),Ut=tt.projectionMatrix.elements,It=mt.projectionMatrix.elements,Gt=Ut[14]/(Ut[10]-1),O=Ut[14]/(Ut[10]+1),kt=(Ut[9]+1)/Ut[5],zt=(Ut[9]-1)/Ut[5],ie=(Ut[8]-1)/Ut[0],wt=(It[8]+1)/It[0],Wt=Gt*ie,Ft=Gt*wt,Rt=ct/(-ie+wt),he=Rt*-ie;tt.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(he),X.translateZ(Rt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const L=Gt+Rt,E=O+Rt,q=Wt-he,$=Ft+(ct-he),J=kt*O/E*L,Q=zt*O/E*L;X.projectionMatrix.makePerspective(q,$,J,Q,L,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function Z(X,tt){tt===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(tt.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;v.texture!==null&&(X.near=v.depthNear,X.far=v.depthFar),M.near=N.near=A.near=X.near,M.far=N.far=A.far=X.far,(R!==M.near||H!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,H=M.far,A.near=R,A.far=H,N.near=R,N.far=H,A.updateProjectionMatrix(),N.updateProjectionMatrix(),X.updateProjectionMatrix());const tt=X.parent,mt=M.cameras;Z(M,tt);for(let ct=0;ct<mt.length;ct++)Z(mt[ct],tt);mt.length===2?V(M,A,N):M.projectionMatrix.copy(A.projectionMatrix),ot(X,M,tt)};function ot(X,tt,mt){mt===null?X.matrix.copy(tt.matrixWorld):(X.matrix.copy(mt.matrixWorld),X.matrix.invert(),X.matrix.multiply(tt.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(tt.projectionMatrix),X.projectionMatrixInverse.copy(tt.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=ls*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(X){c=X,u!==null&&(u.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let at=null;function st(X,tt){if(h=tt.getViewerPose(l||o),g=tt,h!==null){const mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let ct=!1;mt.length!==M.cameras.length&&(M.cameras.length=0,ct=!0);for(let It=0;It<mt.length;It++){const Gt=mt[It];let O=null;if(f!==null)O=f.getViewport(Gt);else{const zt=d.getViewSubImage(u,Gt);O=zt.viewport,It===0&&(t.setRenderTargetTextures(_,zt.colorTexture,u.ignoreDepthValues?void 0:zt.depthStencilTexture),t.setRenderTarget(_))}let kt=w[It];kt===void 0&&(kt=new ke,kt.layers.enable(It),kt.viewport=new Se,w[It]=kt),kt.matrix.fromArray(Gt.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(Gt.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(O.x,O.y,O.width,O.height),It===0&&(M.matrix.copy(kt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ct===!0&&M.cameras.push(kt)}const Ut=i.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const It=d.getDepthInformation(mt[0]);It&&It.isValid&&It.texture&&v.init(t,It,i.renderState)}}for(let mt=0;mt<x.length;mt++){const ct=S[mt],Ut=x[mt];ct!==null&&Ut!==void 0&&Ut.update(ct,tt,l||o)}at&&at(X,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const Bt=new ul;Bt.setAnimationLoop(st),this.setAnimationLoop=function(X){at=X},this.dispose=function(){}}}const Zn=new En,xg=new ae;function yg(r,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,cl(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,_,x,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,S)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),v(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,_,x):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ne&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ne&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const _=t.get(m),x=_.envMap,S=_.envMapRotation;x&&(p.envMap.value=x,Zn.copy(S),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),p.envMapRotation.value.setFromMatrix4(xg.makeRotationFromEuler(Zn)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,_,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*_,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,_){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ne&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const _=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Mg(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,x){const S=x.program;n.uniformBlockBinding(_,S)}function l(_,x){let S=i[_.id];S===void 0&&(g(_),S=h(_),i[_.id]=S,_.addEventListener("dispose",p));const C=x.program;n.updateUBOMapping(_,C);const T=t.render.frame;s[_.id]!==T&&(u(_),s[_.id]=T)}function h(_){const x=d();_.__bindingPointIndex=x;const S=r.createBuffer(),C=_.__size,T=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,S),r.bufferData(r.UNIFORM_BUFFER,C,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,S),S}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const x=i[_.id],S=_.uniforms,C=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let T=0,A=S.length;T<A;T++){const N=Array.isArray(S[T])?S[T]:[S[T]];for(let w=0,M=N.length;w<M;w++){const R=N[w];if(f(R,T,w,C)===!0){const H=R.__offset,P=Array.isArray(R.value)?R.value:[R.value];let U=0;for(let B=0;B<P.length;B++){const I=P[B],j=v(I);typeof I=="number"||typeof I=="boolean"?(R.__data[0]=I,r.bufferSubData(r.UNIFORM_BUFFER,H+U,R.__data)):I.isMatrix3?(R.__data[0]=I.elements[0],R.__data[1]=I.elements[1],R.__data[2]=I.elements[2],R.__data[3]=0,R.__data[4]=I.elements[3],R.__data[5]=I.elements[4],R.__data[6]=I.elements[5],R.__data[7]=0,R.__data[8]=I.elements[6],R.__data[9]=I.elements[7],R.__data[10]=I.elements[8],R.__data[11]=0):(I.toArray(R.__data,U),U+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,H,R.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(_,x,S,C){const T=_.value,A=x+"_"+S;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{const N=C[A];if(typeof T=="number"||typeof T=="boolean"){if(N!==T)return C[A]=T,!0}else if(N.equals(T)===!1)return N.copy(T),!0}return!1}function g(_){const x=_.uniforms;let S=0;const C=16;for(let A=0,N=x.length;A<N;A++){const w=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,R=w.length;M<R;M++){const H=w[M],P=Array.isArray(H.value)?H.value:[H.value];for(let U=0,B=P.length;U<B;U++){const I=P[U],j=v(I),V=S%C;V!==0&&C-V<j.boundary&&(S+=C-V),H.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=S,S+=j.storage}}}const T=S%C;return T>0&&(S+=C-T),_.__size=S,_.__cache={},this}function v(_){const x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function p(_){const x=_.target;x.removeEventListener("dispose",p);const S=o.indexOf(x.__bindingPointIndex);o.splice(S,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const _ in i)r.deleteBuffer(i[_]);o=[],i={},s={}}return{bind:c,update:l,dispose:m}}class Sg{constructor(t={}){const{canvas:e=du(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=o;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,p=null;const m=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=je,this.toneMapping=Bn,this.toneMappingExposure=1;const x=this;let S=!1,C=0,T=0,A=null,N=-1,w=null;const M=new Se,R=new Se;let H=null;const P=new Vt(0);let U=0,B=e.width,I=e.height,j=1,V=null,Z=null;const ot=new Se(0,0,B,I),at=new Se(0,0,B,I);let st=!1;const Bt=new Eo;let X=!1,tt=!1;const mt=new ae,ct=new F,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let It=!1;function Gt(){return A===null?j:1}let O=n;function kt(b,z){return e.getContext(b,z)}try{const b={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${_o}`),e.addEventListener("webglcontextlost",ft,!1),e.addEventListener("webglcontextrestored",Y,!1),e.addEventListener("webglcontextcreationerror",K,!1),O===null){const z="webgl2";if(O=kt(z,b),O===null)throw kt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let zt,ie,wt,Wt,Ft,Rt,he,L,E,q,$,J,Q,St,ht,ut,Nt,et,yt,Ot,At,dt,Dt,Ht;function ce(){zt=new Pp(O),zt.init(),dt=new dg(O,zt),ie=new wp(O,zt,t,dt),wt=new hg(O),Wt=new Np(O),Ft=new Zm,Rt=new ug(O,zt,wt,Ft,ie,dt,Wt),he=new Tp(x),L=new Rp(x),E=new zu(O),Dt=new Sp(O,E),q=new Lp(O,E,Wt,Dt),$=new Up(O,q,E,Wt),yt=new Dp(O,ie,Rt),ut=new bp(Ft),J=new Km(x,he,L,zt,ie,Dt,ut),Q=new yg(x,Ft),St=new Jm,ht=new sg(zt),et=new Mp(x,he,L,wt,$,u,c),Nt=new lg(x,$,ie),Ht=new Mg(O,Wt,ie,wt),Ot=new Ep(O,zt,Wt),At=new Ip(O,zt,Wt),Wt.programs=J.programs,x.capabilities=ie,x.extensions=zt,x.properties=Ft,x.renderLists=St,x.shadowMap=Nt,x.state=wt,x.info=Wt}ce();const D=new _g(x,O);this.xr=D,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const b=zt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=zt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(b){b!==void 0&&(j=b,this.setSize(B,I,!1))},this.getSize=function(b){return b.set(B,I)},this.setSize=function(b,z,G=!0){if(D.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=b,I=z,e.width=Math.floor(b*j),e.height=Math.floor(z*j),G===!0&&(e.style.width=b+"px",e.style.height=z+"px"),this.setViewport(0,0,b,z)},this.getDrawingBufferSize=function(b){return b.set(B*j,I*j).floor()},this.setDrawingBufferSize=function(b,z,G){B=b,I=z,j=G,e.width=Math.floor(b*G),e.height=Math.floor(z*G),this.setViewport(0,0,b,z)},this.getCurrentViewport=function(b){return b.copy(M)},this.getViewport=function(b){return b.copy(ot)},this.setViewport=function(b,z,G,W){b.isVector4?ot.set(b.x,b.y,b.z,b.w):ot.set(b,z,G,W),wt.viewport(M.copy(ot).multiplyScalar(j).round())},this.getScissor=function(b){return b.copy(at)},this.setScissor=function(b,z,G,W){b.isVector4?at.set(b.x,b.y,b.z,b.w):at.set(b,z,G,W),wt.scissor(R.copy(at).multiplyScalar(j).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(b){wt.setScissorTest(st=b)},this.setOpaqueSort=function(b){V=b},this.setTransparentSort=function(b){Z=b},this.getClearColor=function(b){return b.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor.apply(et,arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha.apply(et,arguments)},this.clear=function(b=!0,z=!0,G=!0){let W=0;if(b){let k=!1;if(A!==null){const nt=A.texture.format;k=nt===$c||nt===Zc||nt===Kc}if(k){const nt=A.texture.type,pt=nt===Hn||nt===Bi||nt===Ks||nt===zi||nt===Yc||nt===jc,vt=et.getClearColor(),xt=et.getClearAlpha(),bt=vt.r,Tt=vt.g,Et=vt.b;pt?(f[0]=bt,f[1]=Tt,f[2]=Et,f[3]=xt,O.clearBufferuiv(O.COLOR,0,f)):(g[0]=bt,g[1]=Tt,g[2]=Et,g[3]=xt,O.clearBufferiv(O.COLOR,0,g))}else W|=O.COLOR_BUFFER_BIT}z&&(W|=O.DEPTH_BUFFER_BIT),G&&(W|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ft,!1),e.removeEventListener("webglcontextrestored",Y,!1),e.removeEventListener("webglcontextcreationerror",K,!1),St.dispose(),ht.dispose(),Ft.dispose(),he.dispose(),L.dispose(),$.dispose(),Dt.dispose(),Ht.dispose(),J.dispose(),D.dispose(),D.removeEventListener("sessionstart",$e),D.removeEventListener("sessionend",Je),Gn.stop()};function ft(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function Y(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const b=Wt.autoReset,z=Nt.enabled,G=Nt.autoUpdate,W=Nt.needsUpdate,k=Nt.type;ce(),Wt.autoReset=b,Nt.enabled=z,Nt.autoUpdate=G,Nt.needsUpdate=W,Nt.type=k}function K(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function it(b){const z=b.target;z.removeEventListener("dispose",it),Ct(z)}function Ct(b){qt(b),Ft.remove(b)}function qt(b){const z=Ft.get(b).programs;z!==void 0&&(z.forEach(function(G){J.releaseProgram(G)}),b.isShaderMaterial&&J.releaseShaderCache(b))}this.renderBufferDirect=function(b,z,G,W,k,nt){z===null&&(z=Ut);const pt=k.isMesh&&k.matrixWorld.determinant()<0,vt=kl(b,z,G,W,k);wt.setMaterial(W,pt);let xt=G.index,bt=1;if(W.wireframe===!0){if(xt=q.getWireframeAttribute(G),xt===void 0)return;bt=2}const Tt=G.drawRange,Et=G.attributes.position;let jt=Tt.start*bt,se=(Tt.start+Tt.count)*bt;nt!==null&&(jt=Math.max(jt,nt.start*bt),se=Math.min(se,(nt.start+nt.count)*bt)),xt!==null?(jt=Math.max(jt,0),se=Math.min(se,xt.count)):Et!=null&&(jt=Math.max(jt,0),se=Math.min(se,Et.count));const re=se-jt;if(re<0||re===1/0)return;Dt.setup(k,W,vt,G,xt);let Ue,Kt=Ot;if(xt!==null&&(Ue=E.get(xt),Kt=At,Kt.setIndex(Ue)),k.isMesh)W.wireframe===!0?(wt.setLineWidth(W.wireframeLinewidth*Gt()),Kt.setMode(O.LINES)):Kt.setMode(O.TRIANGLES);else if(k.isLine){let Mt=W.linewidth;Mt===void 0&&(Mt=1),wt.setLineWidth(Mt*Gt()),k.isLineSegments?Kt.setMode(O.LINES):k.isLineLoop?Kt.setMode(O.LINE_LOOP):Kt.setMode(O.LINE_STRIP)}else k.isPoints?Kt.setMode(O.POINTS):k.isSprite&&Kt.setMode(O.TRIANGLES);if(k.isBatchedMesh)k._multiDrawInstances!==null?Kt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances):Kt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else if(k.isInstancedMesh)Kt.renderInstances(jt,re,k.count);else if(G.isInstancedBufferGeometry){const Mt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Re=Math.min(G.instanceCount,Mt);Kt.renderInstances(jt,re,Re)}else Kt.render(jt,re)};function le(b,z,G){b.transparent===!0&&b.side===Mn&&b.forceSinglePass===!1?(b.side=Ne,b.needsUpdate=!0,ps(b,z,G),b.side=zn,b.needsUpdate=!0,ps(b,z,G),b.side=Mn):ps(b,z,G)}this.compile=function(b,z,G=null){G===null&&(G=b),p=ht.get(G),p.init(z),_.push(p),G.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),b!==G&&b.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const W=new Set;return b.traverse(function(k){const nt=k.material;if(nt)if(Array.isArray(nt))for(let pt=0;pt<nt.length;pt++){const vt=nt[pt];le(vt,G,k),W.add(vt)}else le(nt,G,k),W.add(nt)}),_.pop(),p=null,W},this.compileAsync=function(b,z,G=null){const W=this.compile(b,z,G);return new Promise(k=>{function nt(){if(W.forEach(function(pt){Ft.get(pt).currentProgram.isReady()&&W.delete(pt)}),W.size===0){k(b);return}setTimeout(nt,10)}zt.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let ve=null;function $t(b){ve&&ve(b)}function $e(){Gn.stop()}function Je(){Gn.start()}const Gn=new ul;Gn.setAnimationLoop($t),typeof self<"u"&&Gn.setContext(self),this.setAnimationLoop=function(b){ve=b,D.setAnimationLoop(b),b===null?Gn.stop():Gn.start()},D.addEventListener("sessionstart",$e),D.addEventListener("sessionend",Je),this.render=function(b,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),D.enabled===!0&&D.isPresenting===!0&&(D.cameraAutoUpdate===!0&&D.updateCamera(z),z=D.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,z,A),p=ht.get(b,_.length),p.init(z),_.push(p),mt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Bt.setFromProjectionMatrix(mt),tt=this.localClippingEnabled,X=ut.init(this.clippingPlanes,tt),v=St.get(b,m.length),v.init(),m.push(v),D.enabled===!0&&D.isPresenting===!0){const nt=x.xr.getDepthSensingMesh();nt!==null&&ur(nt,z,-1/0,x.sortObjects)}ur(b,z,0,x.sortObjects),v.finish(),x.sortObjects===!0&&v.sort(V,Z),It=D.enabled===!1||D.isPresenting===!1||D.hasDepthSensing()===!1,It&&et.addToRenderList(v,b),this.info.render.frame++,X===!0&&ut.beginShadows();const G=p.state.shadowsArray;Nt.render(G,b,z),X===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=v.opaque,k=v.transmissive;if(p.setupLights(),z.isArrayCamera){const nt=z.cameras;if(k.length>0)for(let pt=0,vt=nt.length;pt<vt;pt++){const xt=nt[pt];Fo(W,k,b,xt)}It&&et.render(b);for(let pt=0,vt=nt.length;pt<vt;pt++){const xt=nt[pt];Uo(v,b,xt,xt.viewport)}}else k.length>0&&Fo(W,k,b,z),It&&et.render(b),Uo(v,b,z);A!==null&&(Rt.updateMultisampleRenderTarget(A),Rt.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(x,b,z),Dt.resetDefaultState(),N=-1,w=null,_.pop(),_.length>0?(p=_[_.length-1],X===!0&&ut.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function ur(b,z,G,W){if(b.visible===!1)return;if(b.layers.test(z.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(z);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Bt.intersectsSprite(b)){W&&ct.setFromMatrixPosition(b.matrixWorld).applyMatrix4(mt);const pt=$.update(b),vt=b.material;vt.visible&&v.push(b,pt,vt,G,ct.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Bt.intersectsObject(b))){const pt=$.update(b),vt=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ct.copy(b.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),ct.copy(pt.boundingSphere.center)),ct.applyMatrix4(b.matrixWorld).applyMatrix4(mt)),Array.isArray(vt)){const xt=pt.groups;for(let bt=0,Tt=xt.length;bt<Tt;bt++){const Et=xt[bt],jt=vt[Et.materialIndex];jt&&jt.visible&&v.push(b,pt,jt,G,ct.z,Et)}}else vt.visible&&v.push(b,pt,vt,G,ct.z,null)}}const nt=b.children;for(let pt=0,vt=nt.length;pt<vt;pt++)ur(nt[pt],z,G,W)}function Uo(b,z,G,W){const k=b.opaque,nt=b.transmissive,pt=b.transparent;p.setupLightsView(G),X===!0&&ut.setGlobalState(x.clippingPlanes,G),W&&wt.viewport(M.copy(W)),k.length>0&&fs(k,z,G),nt.length>0&&fs(nt,z,G),pt.length>0&&fs(pt,z,G),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function Fo(b,z,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new oi(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?rr:Hn,minFilter:si,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace}));const nt=p.state.transmissionRenderTarget[W.id],pt=W.viewport||M;nt.setSize(pt.z,pt.w);const vt=x.getRenderTarget();x.setRenderTarget(nt),x.getClearColor(P),U=x.getClearAlpha(),U<1&&x.setClearColor(16777215,.5),It?et.render(G):x.clear();const xt=x.toneMapping;x.toneMapping=Bn;const bt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),X===!0&&ut.setGlobalState(x.clippingPlanes,W),fs(b,G,W),Rt.updateMultisampleRenderTarget(nt),Rt.updateRenderTargetMipmap(nt),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let Et=0,jt=z.length;Et<jt;Et++){const se=z[Et],re=se.object,Ue=se.geometry,Kt=se.material,Mt=se.group;if(Kt.side===Mn&&re.layers.test(W.layers)){const Re=Kt.side;Kt.side=Ne,Kt.needsUpdate=!0,Oo(re,G,W,Ue,Kt,Mt),Kt.side=Re,Kt.needsUpdate=!0,Tt=!0}}Tt===!0&&(Rt.updateMultisampleRenderTarget(nt),Rt.updateRenderTargetMipmap(nt))}x.setRenderTarget(vt),x.setClearColor(P,U),bt!==void 0&&(W.viewport=bt),x.toneMapping=xt}function fs(b,z,G){const W=z.isScene===!0?z.overrideMaterial:null;for(let k=0,nt=b.length;k<nt;k++){const pt=b[k],vt=pt.object,xt=pt.geometry,bt=W===null?pt.material:W,Tt=pt.group;vt.layers.test(G.layers)&&Oo(vt,z,G,xt,bt,Tt)}}function Oo(b,z,G,W,k,nt){b.onBeforeRender(x,z,G,W,k,nt),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),k.onBeforeRender(x,z,G,W,b,nt),k.transparent===!0&&k.side===Mn&&k.forceSinglePass===!1?(k.side=Ne,k.needsUpdate=!0,x.renderBufferDirect(G,z,W,k,b,nt),k.side=zn,k.needsUpdate=!0,x.renderBufferDirect(G,z,W,k,b,nt),k.side=Mn):x.renderBufferDirect(G,z,W,k,b,nt),b.onAfterRender(x,z,G,W,k,nt)}function ps(b,z,G){z.isScene!==!0&&(z=Ut);const W=Ft.get(b),k=p.state.lights,nt=p.state.shadowsArray,pt=k.state.version,vt=J.getParameters(b,k.state,nt,z,G),xt=J.getProgramCacheKey(vt);let bt=W.programs;W.environment=b.isMeshStandardMaterial?z.environment:null,W.fog=z.fog,W.envMap=(b.isMeshStandardMaterial?L:he).get(b.envMap||W.environment),W.envMapRotation=W.environment!==null&&b.envMap===null?z.environmentRotation:b.envMapRotation,bt===void 0&&(b.addEventListener("dispose",it),bt=new Map,W.programs=bt);let Tt=bt.get(xt);if(Tt!==void 0){if(W.currentProgram===Tt&&W.lightsStateVersion===pt)return zo(b,vt),Tt}else vt.uniforms=J.getUniforms(b),b.onBuild(G,vt,x),b.onBeforeCompile(vt,x),Tt=J.acquireProgram(vt,xt),bt.set(xt,Tt),W.uniforms=vt.uniforms;const Et=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Et.clippingPlanes=ut.uniform),zo(b,vt),W.needsLights=Gl(b),W.lightsStateVersion=pt,W.needsLights&&(Et.ambientLightColor.value=k.state.ambient,Et.lightProbe.value=k.state.probe,Et.directionalLights.value=k.state.directional,Et.directionalLightShadows.value=k.state.directionalShadow,Et.spotLights.value=k.state.spot,Et.spotLightShadows.value=k.state.spotShadow,Et.rectAreaLights.value=k.state.rectArea,Et.ltc_1.value=k.state.rectAreaLTC1,Et.ltc_2.value=k.state.rectAreaLTC2,Et.pointLights.value=k.state.point,Et.pointLightShadows.value=k.state.pointShadow,Et.hemisphereLights.value=k.state.hemi,Et.directionalShadowMap.value=k.state.directionalShadowMap,Et.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Et.spotShadowMap.value=k.state.spotShadowMap,Et.spotLightMatrix.value=k.state.spotLightMatrix,Et.spotLightMap.value=k.state.spotLightMap,Et.pointShadowMap.value=k.state.pointShadowMap,Et.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=Tt,W.uniformsList=null,Tt}function Bo(b){if(b.uniformsList===null){const z=b.currentProgram.getUniforms();b.uniformsList=Xs.seqWithValue(z.seq,b.uniforms)}return b.uniformsList}function zo(b,z){const G=Ft.get(b);G.outputColorSpace=z.outputColorSpace,G.batching=z.batching,G.batchingColor=z.batchingColor,G.instancing=z.instancing,G.instancingColor=z.instancingColor,G.instancingMorph=z.instancingMorph,G.skinning=z.skinning,G.morphTargets=z.morphTargets,G.morphNormals=z.morphNormals,G.morphColors=z.morphColors,G.morphTargetsCount=z.morphTargetsCount,G.numClippingPlanes=z.numClippingPlanes,G.numIntersection=z.numClipIntersection,G.vertexAlphas=z.vertexAlphas,G.vertexTangents=z.vertexTangents,G.toneMapping=z.toneMapping}function kl(b,z,G,W,k){z.isScene!==!0&&(z=Ut),Rt.resetTextureUnits();const nt=z.fog,pt=W.isMeshStandardMaterial?z.environment:null,vt=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Vn,xt=(W.isMeshStandardMaterial?L:he).get(W.envMap||pt),bt=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Tt=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Et=!!G.morphAttributes.position,jt=!!G.morphAttributes.normal,se=!!G.morphAttributes.color;let re=Bn;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(re=x.toneMapping);const Ue=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Kt=Ue!==void 0?Ue.length:0,Mt=Ft.get(W),Re=p.state.lights;if(X===!0&&(tt===!0||b!==w)){const ze=b===w&&W.id===N;ut.setState(W,b,ze)}let Jt=!1;W.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==Re.state.version||Mt.outputColorSpace!==vt||k.isBatchedMesh&&Mt.batching===!1||!k.isBatchedMesh&&Mt.batching===!0||k.isBatchedMesh&&Mt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Mt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Mt.instancing===!1||!k.isInstancedMesh&&Mt.instancing===!0||k.isSkinnedMesh&&Mt.skinning===!1||!k.isSkinnedMesh&&Mt.skinning===!0||k.isInstancedMesh&&Mt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Mt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Mt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Mt.instancingMorph===!1&&k.morphTexture!==null||Mt.envMap!==xt||W.fog===!0&&Mt.fog!==nt||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==ut.numPlanes||Mt.numIntersection!==ut.numIntersection)||Mt.vertexAlphas!==bt||Mt.vertexTangents!==Tt||Mt.morphTargets!==Et||Mt.morphNormals!==jt||Mt.morphColors!==se||Mt.toneMapping!==re||Mt.morphTargetsCount!==Kt)&&(Jt=!0):(Jt=!0,Mt.__version=W.version);let hn=Mt.currentProgram;Jt===!0&&(hn=ps(W,z,k));let ms=!1,Wn=!1,dr=!1;const _e=hn.getUniforms(),wn=Mt.uniforms;if(wt.useProgram(hn.program)&&(ms=!0,Wn=!0,dr=!0),W.id!==N&&(N=W.id,Wn=!0),ms||w!==b){_e.setValue(O,"projectionMatrix",b.projectionMatrix),_e.setValue(O,"viewMatrix",b.matrixWorldInverse);const ze=_e.map.cameraPosition;ze!==void 0&&ze.setValue(O,ct.setFromMatrixPosition(b.matrixWorld)),ie.logarithmicDepthBuffer&&_e.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&_e.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),w!==b&&(w=b,Wn=!0,dr=!0)}if(k.isSkinnedMesh){_e.setOptional(O,k,"bindMatrix"),_e.setOptional(O,k,"bindMatrixInverse");const ze=k.skeleton;ze&&(ze.boneTexture===null&&ze.computeBoneTexture(),_e.setValue(O,"boneTexture",ze.boneTexture,Rt))}k.isBatchedMesh&&(_e.setOptional(O,k,"batchingTexture"),_e.setValue(O,"batchingTexture",k._matricesTexture,Rt),_e.setOptional(O,k,"batchingColorTexture"),k._colorsTexture!==null&&_e.setValue(O,"batchingColorTexture",k._colorsTexture,Rt));const fr=G.morphAttributes;if((fr.position!==void 0||fr.normal!==void 0||fr.color!==void 0)&&yt.update(k,G,hn),(Wn||Mt.receiveShadow!==k.receiveShadow)&&(Mt.receiveShadow=k.receiveShadow,_e.setValue(O,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(wn.envMap.value=xt,wn.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&z.environment!==null&&(wn.envMapIntensity.value=z.environmentIntensity),Wn&&(_e.setValue(O,"toneMappingExposure",x.toneMappingExposure),Mt.needsLights&&Vl(wn,dr),nt&&W.fog===!0&&Q.refreshFogUniforms(wn,nt),Q.refreshMaterialUniforms(wn,W,j,I,p.state.transmissionRenderTarget[b.id]),Xs.upload(O,Bo(Mt),wn,Rt)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Xs.upload(O,Bo(Mt),wn,Rt),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&_e.setValue(O,"center",k.center),_e.setValue(O,"modelViewMatrix",k.modelViewMatrix),_e.setValue(O,"normalMatrix",k.normalMatrix),_e.setValue(O,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const ze=W.uniformsGroups;for(let pr=0,Wl=ze.length;pr<Wl;pr++){const Ho=ze[pr];Ht.update(Ho,hn),Ht.bind(Ho,hn)}}return hn}function Vl(b,z){b.ambientLightColor.needsUpdate=z,b.lightProbe.needsUpdate=z,b.directionalLights.needsUpdate=z,b.directionalLightShadows.needsUpdate=z,b.pointLights.needsUpdate=z,b.pointLightShadows.needsUpdate=z,b.spotLights.needsUpdate=z,b.spotLightShadows.needsUpdate=z,b.rectAreaLights.needsUpdate=z,b.hemisphereLights.needsUpdate=z}function Gl(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,z,G){Ft.get(b.texture).__webglTexture=z,Ft.get(b.depthTexture).__webglTexture=G;const W=Ft.get(b);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,z){const G=Ft.get(b);G.__webglFramebuffer=z,G.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(b,z=0,G=0){A=b,C=z,T=G;let W=!0,k=null,nt=!1,pt=!1;if(b){const xt=Ft.get(b);xt.__useDefaultFramebuffer!==void 0?(wt.bindFramebuffer(O.FRAMEBUFFER,null),W=!1):xt.__webglFramebuffer===void 0?Rt.setupRenderTarget(b):xt.__hasExternalTextures&&Rt.rebindTextures(b,Ft.get(b.texture).__webglTexture,Ft.get(b.depthTexture).__webglTexture);const bt=b.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(pt=!0);const Tt=Ft.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Tt[z])?k=Tt[z][G]:k=Tt[z],nt=!0):b.samples>0&&Rt.useMultisampledRTT(b)===!1?k=Ft.get(b).__webglMultisampledFramebuffer:Array.isArray(Tt)?k=Tt[G]:k=Tt,M.copy(b.viewport),R.copy(b.scissor),H=b.scissorTest}else M.copy(ot).multiplyScalar(j).floor(),R.copy(at).multiplyScalar(j).floor(),H=st;if(wt.bindFramebuffer(O.FRAMEBUFFER,k)&&W&&wt.drawBuffers(b,k),wt.viewport(M),wt.scissor(R),wt.setScissorTest(H),nt){const xt=Ft.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+z,xt.__webglTexture,G)}else if(pt){const xt=Ft.get(b.texture),bt=z||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,xt.__webglTexture,G||0,bt)}N=-1},this.readRenderTargetPixels=function(b,z,G,W,k,nt,pt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Ft.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&pt!==void 0&&(vt=vt[pt]),vt){wt.bindFramebuffer(O.FRAMEBUFFER,vt);try{const xt=b.texture,bt=xt.format,Tt=xt.type;if(!ie.textureFormatReadable(bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ie.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=b.width-W&&G>=0&&G<=b.height-k&&O.readPixels(z,G,W,k,dt.convert(bt),dt.convert(Tt),nt)}finally{const xt=A!==null?Ft.get(A).__webglFramebuffer:null;wt.bindFramebuffer(O.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(b,z,G,W,k,nt,pt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Ft.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&pt!==void 0&&(vt=vt[pt]),vt){wt.bindFramebuffer(O.FRAMEBUFFER,vt);try{const xt=b.texture,bt=xt.format,Tt=xt.type;if(!ie.textureFormatReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ie.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=b.width-W&&G>=0&&G<=b.height-k){const Et=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Et),O.bufferData(O.PIXEL_PACK_BUFFER,nt.byteLength,O.STREAM_READ),O.readPixels(z,G,W,k,dt.convert(bt),dt.convert(Tt),0),O.flush();const jt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);await fu(O,jt,4);try{O.bindBuffer(O.PIXEL_PACK_BUFFER,Et),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,nt)}finally{O.deleteBuffer(Et),O.deleteSync(jt)}return nt}}finally{const xt=A!==null?Ft.get(A).__webglFramebuffer:null;wt.bindFramebuffer(O.FRAMEBUFFER,xt)}}},this.copyFramebufferToTexture=function(b,z=null,G=0){b.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,b=arguments[1]);const W=Math.pow(2,-G),k=Math.floor(b.image.width*W),nt=Math.floor(b.image.height*W),pt=z!==null?z.x:0,vt=z!==null?z.y:0;Rt.setTexture2D(b,0),O.copyTexSubImage2D(O.TEXTURE_2D,G,0,0,pt,vt,k,nt),wt.unbindTexture()},this.copyTextureToTexture=function(b,z,G=null,W=null,k=0){b.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,b=arguments[1],z=arguments[2],k=arguments[3]||0,G=null);let nt,pt,vt,xt,bt,Tt;G!==null?(nt=G.max.x-G.min.x,pt=G.max.y-G.min.y,vt=G.min.x,xt=G.min.y):(nt=b.image.width,pt=b.image.height,vt=0,xt=0),W!==null?(bt=W.x,Tt=W.y):(bt=0,Tt=0);const Et=dt.convert(z.format),jt=dt.convert(z.type);Rt.setTexture2D(z,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,z.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,z.unpackAlignment);const se=O.getParameter(O.UNPACK_ROW_LENGTH),re=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ue=O.getParameter(O.UNPACK_SKIP_PIXELS),Kt=O.getParameter(O.UNPACK_SKIP_ROWS),Mt=O.getParameter(O.UNPACK_SKIP_IMAGES),Re=b.isCompressedTexture?b.mipmaps[k]:b.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,Re.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Re.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,vt),O.pixelStorei(O.UNPACK_SKIP_ROWS,xt),b.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,k,bt,Tt,nt,pt,Et,jt,Re.data):b.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,k,bt,Tt,Re.width,Re.height,Et,Re.data):O.texSubImage2D(O.TEXTURE_2D,k,bt,Tt,Et,jt,Re),O.pixelStorei(O.UNPACK_ROW_LENGTH,se),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,re),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ue),O.pixelStorei(O.UNPACK_SKIP_ROWS,Kt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Mt),k===0&&z.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),wt.unbindTexture()},this.copyTextureToTexture3D=function(b,z,G=null,W=null,k=0){b.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,b=arguments[2],z=arguments[3],k=arguments[4]||0);let nt,pt,vt,xt,bt,Tt,Et,jt,se;const re=b.isCompressedTexture?b.mipmaps[k]:b.image;G!==null?(nt=G.max.x-G.min.x,pt=G.max.y-G.min.y,vt=G.max.z-G.min.z,xt=G.min.x,bt=G.min.y,Tt=G.min.z):(nt=re.width,pt=re.height,vt=re.depth,xt=0,bt=0,Tt=0),W!==null?(Et=W.x,jt=W.y,se=W.z):(Et=0,jt=0,se=0);const Ue=dt.convert(z.format),Kt=dt.convert(z.type);let Mt;if(z.isData3DTexture)Rt.setTexture3D(z,0),Mt=O.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)Rt.setTexture2DArray(z,0),Mt=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,z.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,z.unpackAlignment);const Re=O.getParameter(O.UNPACK_ROW_LENGTH),Jt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),hn=O.getParameter(O.UNPACK_SKIP_PIXELS),ms=O.getParameter(O.UNPACK_SKIP_ROWS),Wn=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,re.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,re.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,xt),O.pixelStorei(O.UNPACK_SKIP_ROWS,bt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Tt),b.isDataTexture||b.isData3DTexture?O.texSubImage3D(Mt,k,Et,jt,se,nt,pt,vt,Ue,Kt,re.data):z.isCompressedArrayTexture?O.compressedTexSubImage3D(Mt,k,Et,jt,se,nt,pt,vt,Ue,re.data):O.texSubImage3D(Mt,k,Et,jt,se,nt,pt,vt,Ue,Kt,re),O.pixelStorei(O.UNPACK_ROW_LENGTH,Re),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Jt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,hn),O.pixelStorei(O.UNPACK_SKIP_ROWS,ms),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Wn),k===0&&z.generateMipmaps&&O.generateMipmap(Mt),wt.unbindTexture()},this.initRenderTarget=function(b){Ft.get(b).__webglFramebuffer===void 0&&Rt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Rt.setTextureCube(b,0):b.isData3DTexture?Rt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Rt.setTexture2DArray(b,0):Rt.setTexture2D(b,0),wt.unbindTexture()},this.resetState=function(){C=0,T=0,A=null,wt.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===xo?"display-p3":"srgb",e.unpackColorSpace=Zt.workingColorSpace===or?"display-p3":"srgb"}}class bo{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Vt(t),this.near=e,this.far=n}clone(){return new bo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Eg extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ln{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(s-1);const h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),c=e||(o.isVector2?new _t:new F);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new F,i=[],s=[],o=[],a=new F,c=new ae;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new F)}s[0]=new F,o[0]=new F;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Me(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(Me(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let g=1;g<=t;g++)s[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class To extends ln{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new _t){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class wg extends To{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ao(){let r=0,t=0,e=0,n=0;function i(s,o,a,c){r=s,t=a,e=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){i(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,d){let u=(o-s)/l-(a-s)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const Bs=new F,Xr=new Ao,Yr=new Ao,jr=new Ao;class bg extends ln{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new F){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%s]:(Bs.subVectors(i[0],i[1]).add(i[0]),l=Bs);const d=i[a%s],u=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Bs.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Bs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),p=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),p<1e-4&&(p=v),Xr.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,g,v,p),Yr.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,g,v,p),jr.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,g,v,p)}else this.curveType==="catmullrom"&&(Xr.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),Yr.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),jr.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(Xr.calc(c),Yr.calc(c),jr.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new F().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function cc(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,c=r*a;return(2*e-2*n+s+o)*c+(-3*e+3*n-2*s-o)*a+s*r+e}function Tg(r,t){const e=1-r;return e*e*t}function Ag(r,t){return 2*(1-r)*r*t}function Cg(r,t){return r*r*t}function os(r,t,e,n){return Tg(r,t)+Ag(r,e)+Cg(r,n)}function Rg(r,t){const e=1-r;return e*e*e*t}function Pg(r,t){const e=1-r;return 3*e*e*r*t}function Lg(r,t){return 3*(1-r)*r*r*t}function Ig(r,t){return r*r*r*t}function as(r,t,e,n,i){return Rg(r,t)+Pg(r,e)+Lg(r,n)+Ig(r,i)}class xl extends ln{constructor(t=new _t,e=new _t,n=new _t,i=new _t){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new _t){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(as(t,i.x,s.x,o.x,a.x),as(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ng extends ln{constructor(t=new F,e=new F,n=new F,i=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new F){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(as(t,i.x,s.x,o.x,a.x),as(t,i.y,s.y,o.y,a.y),as(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class yl extends ln{constructor(t=new _t,e=new _t){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new _t){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new _t){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dg extends ln{constructor(t=new F,e=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new F){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new F){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ml extends ln{constructor(t=new _t,e=new _t,n=new _t){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new _t){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(os(t,i.x,s.x,o.x),os(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ug extends ln{constructor(t=new F,e=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new F){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(os(t,i.x,s.x,o.x),os(t,i.y,s.y,o.y),os(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sl extends ln{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new _t){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(cc(a,c.x,l.x,h.x,d.x),cc(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new _t().fromArray(i))}return this}}var lc=Object.freeze({__proto__:null,ArcCurve:wg,CatmullRomCurve3:bg,CubicBezierCurve:xl,CubicBezierCurve3:Ng,EllipseCurve:To,LineCurve:yl,LineCurve3:Dg,QuadraticBezierCurve:Ml,QuadraticBezierCurve3:Ug,SplineCurve:Sl});class Fg extends ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new lc[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new lc[i.type]().fromJSON(i))}return this}}class Og extends Fg{constructor(t){super(),this.type="Path",this.currentPoint=new _t,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new yl(this.currentPoint.clone(),new _t(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new Ml(this.currentPoint.clone(),new _t(t,e),new _t(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new xl(this.currentPoint.clone(),new _t(t,e),new _t(n,i),new _t(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Sl(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,s,o,a,c),this}absellipse(t,e,n,i,s,o,a,c){const l=new To(t,e,n,i,s,o,a,c);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Co extends cn{constructor(t=[new _t(0,-.5),new _t(.5,0),new _t(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Me(i,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],h=1/e,d=new F,u=new _t,f=new F,g=new F,v=new F;let p=0,m=0;for(let _=0;_<=t.length-1;_++)switch(_){case 0:p=t[_+1].x-t[_].x,m=t[_+1].y-t[_].y,f.x=m*1,f.y=-p,f.z=m*0,v.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:p=t[_+1].x-t[_].x,m=t[_+1].y-t[_].y,f.x=m*1,f.y=-p,f.z=m*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),c.push(f.x,f.y,f.z),v.copy(g)}for(let _=0;_<=e;_++){const x=n+_*h*i,S=Math.sin(x),C=Math.cos(x);for(let T=0;T<=t.length-1;T++){d.x=t[T].x*S,d.y=t[T].y,d.z=t[T].x*C,o.push(d.x,d.y,d.z),u.x=_/e,u.y=T/(t.length-1),a.push(u.x,u.y);const A=c[3*T+0]*S,N=c[3*T+1],w=c[3*T+0]*C;l.push(A,N,w)}}for(let _=0;_<e;_++)for(let x=0;x<t.length-1;x++){const S=x+_*t.length,C=S,T=S+t.length,A=S+t.length+1,N=S+1;s.push(C,T,N),s.push(A,N,T)}this.setIndex(s),this.setAttribute("position",new Ce(o,3)),this.setAttribute("uv",new Ce(a,2)),this.setAttribute("normal",new Ce(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Co(t.points,t.segments,t.phiStart,t.phiLength)}}class er extends Co{constructor(t=1,e=1,n=4,i=8){const s=new Og;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new er(t.radius,t.length,t.capSegments,t.radialSegments)}}class ai extends cn{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],d=[],u=[],f=[];let g=0;const v=[],p=n/2;let m=0;_(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Ce(d,3)),this.setAttribute("normal",new Ce(u,3)),this.setAttribute("uv",new Ce(f,2));function _(){const S=new F,C=new F;let T=0;const A=(e-t)/n;for(let N=0;N<=s;N++){const w=[],M=N/s,R=M*(e-t)+t;for(let H=0;H<=i;H++){const P=H/i,U=P*c+a,B=Math.sin(U),I=Math.cos(U);C.x=R*B,C.y=-M*n+p,C.z=R*I,d.push(C.x,C.y,C.z),S.set(B,A,I).normalize(),u.push(S.x,S.y,S.z),f.push(P,1-M),w.push(g++)}v.push(w)}for(let N=0;N<i;N++)for(let w=0;w<s;w++){const M=v[w][N],R=v[w+1][N],H=v[w+1][N+1],P=v[w][N+1];h.push(M,R,P),h.push(R,H,P),T+=6}l.addGroup(m,T,0),m+=T}function x(S){const C=g,T=new _t,A=new F;let N=0;const w=S===!0?t:e,M=S===!0?1:-1;for(let H=1;H<=i;H++)d.push(0,p*M,0),u.push(0,M,0),f.push(.5,.5),g++;const R=g;for(let H=0;H<=i;H++){const U=H/i*c+a,B=Math.cos(U),I=Math.sin(U);A.x=w*I,A.y=p*M,A.z=w*B,d.push(A.x,A.y,A.z),u.push(0,M,0),T.x=B*.5+.5,T.y=I*.5*M+.5,f.push(T.x,T.y),g++}for(let H=0;H<i;H++){const P=C+H,U=R+H;S===!0?h.push(U,U+1,P):h.push(U+1,U,P),N+=3}l.addGroup(m,N,S===!0?1:2),m+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ri extends cn{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],d=new F,u=new F,f=[],g=[],v=[],p=[];for(let m=0;m<=n;m++){const _=[],x=m/n;let S=0;m===0&&o===0?S=.5/e:m===n&&c===Math.PI&&(S=-.5/e);for(let C=0;C<=e;C++){const T=C/e;d.x=-t*Math.cos(i+T*s)*Math.sin(o+x*a),d.y=t*Math.cos(o+x*a),d.z=t*Math.sin(i+T*s)*Math.sin(o+x*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),p.push(T+S,1-x),_.push(l++)}h.push(_)}for(let m=0;m<n;m++)for(let _=0;_<e;_++){const x=h[m][_+1],S=h[m][_],C=h[m+1][_],T=h[m+1][_+1];(m!==0||o>0)&&f.push(x,S,T),(m!==n-1||c<Math.PI)&&f.push(S,C,T)}this.setIndex(f),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(v,3)),this.setAttribute("uv",new Ce(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ri(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ae extends ds{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Vt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jc,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class El extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class Bg extends El{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Vt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Kr=new ae,hc=new F,uc=new F;class zg{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Eo,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;hc.setFromMatrixPosition(t.matrixWorld),e.position.copy(hc),uc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(uc),e.updateMatrixWorld(),Kr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Kr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Hg extends zg{constructor(){super(new dl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dc extends El{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new Hg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class kg{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=fc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=fc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function fc(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_o}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_o);class Ze{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new y);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new y);const n=this.elements,i=t.x,s=t.y,o=t.z;return e.x=n[0]*i+n[1]*s+n[2]*o,e.y=n[3]*i+n[4]*s+n[5]*o,e.z=n[6]*i+n[7]*s+n[8]*o,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new Ze);const n=this.elements,i=t.elements,s=e.elements,o=n[0],a=n[1],c=n[2],l=n[3],h=n[4],d=n[5],u=n[6],f=n[7],g=n[8],v=i[0],p=i[1],m=i[2],_=i[3],x=i[4],S=i[5],C=i[6],T=i[7],A=i[8];return s[0]=o*v+a*_+c*C,s[1]=o*p+a*x+c*T,s[2]=o*m+a*S+c*A,s[3]=l*v+h*_+d*C,s[4]=l*p+h*x+d*T,s[5]=l*m+h*S+d*A,s[6]=u*v+f*_+g*C,s[7]=u*p+f*x+g*T,s[8]=u*m+f*S+g*A,e}scale(t,e){e===void 0&&(e=new Ze);const n=this.elements,i=e.elements;for(let s=0;s!==3;s++)i[3*s+0]=t.x*n[3*s+0],i[3*s+1]=t.y*n[3*s+1],i[3*s+2]=t.z*n[3*s+2];return e}solve(t,e){e===void 0&&(e=new y);const n=3,i=4,s=[];let o,a;for(o=0;o<n*i;o++)s.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)s[o+i*a]=this.elements[o+3*a];s[3+4*0]=t.x,s[3+4*1]=t.y,s[3+4*2]=t.z;let c=3;const l=c;let h;const d=4;let u;do{if(o=l-c,s[o+i*o]===0){for(a=o+1;a<l;a++)if(s[o+i*a]!==0){h=d;do u=d-h,s[u+i*o]+=s[u+i*a];while(--h);break}}if(s[o+i*o]!==0)for(a=o+1;a<l;a++){const f=s[o+i*a]/s[o+i*o];h=d;do u=d-h,s[u+i*a]=u<=o?0:s[u+i*a]-s[u+i*o]*f;while(--h)}}while(--c);if(e.z=s[2*i+3]/s[2*i+2],e.y=(s[1*i+3]-s[1*i+2]*e.z)/s[1*i+1],e.x=(s[0*i+3]-s[0*i+2]*e.z-s[0*i+1]*e.y)/s[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";const e=",";for(let n=0;n<9;n++)t+=this.elements[n]+e;return t}reverse(t){t===void 0&&(t=new Ze);const e=3,n=6,i=Vg;let s,o;for(s=0;s<3;s++)for(o=0;o<3;o++)i[s+n*o]=this.elements[s+3*o];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let a=3;const c=a;let l;const h=n;let d;do{if(s=c-a,i[s+n*s]===0){for(o=s+1;o<c;o++)if(i[s+n*o]!==0){l=h;do d=h-l,i[d+n*s]+=i[d+n*o];while(--l);break}}if(i[s+n*s]!==0)for(o=s+1;o<c;o++){const u=i[s+n*o]/i[s+n*s];l=h;do d=h-l,i[d+n*o]=d<=s?0:i[d+n*o]-i[d+n*s]*u;while(--l)}}while(--a);s=2;do{o=s-1;do{const u=i[s+n*o]/i[s+n*s];l=n;do d=n-l,i[d+n*o]=i[d+n*o]-i[d+n*s]*u;while(--l)}while(o--)}while(--s);s=2;do{const u=1/i[s+n*s];l=n;do d=n-l,i[d+n*s]=i[d+n*s]*u;while(--l)}while(s--);s=2;do{o=2;do{if(d=i[e+o+n*s],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(s,o,d)}while(o--)}while(s--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,s=t.w,o=e+e,a=n+n,c=i+i,l=e*o,h=e*a,d=e*c,u=n*a,f=n*c,g=i*c,v=s*o,p=s*a,m=s*c,_=this.elements;return _[3*0+0]=1-(u+g),_[3*0+1]=h-m,_[3*0+2]=d+p,_[3*1+0]=h+m,_[3*1+1]=1-(l+g),_[3*1+2]=f-v,_[3*2+0]=d-p,_[3*2+1]=f+v,_[3*2+2]=1-(l+u),this}transpose(t){t===void 0&&(t=new Ze);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const Vg=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class y{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new y);const n=t.x,i=t.y,s=t.z,o=this.x,a=this.y,c=this.z;return e.x=a*s-c*i,e.y=c*n-o*s,e.z=o*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new y(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new y(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new Ze([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const s=1/i;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new y);const e=this.x,n=this.y,i=this.z;let s=Math.sqrt(e*e+n*n+i*i);return s>0?(s=1/s,t.x=e*s,t.y=n*s,t.z=i*s):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z;return Math.sqrt((s-e)*(s-e)+(o-n)*(o-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z;return(s-e)*(s-e)+(o-n)*(o-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new y);const n=this.x,i=this.y,s=this.z;return e.x=t*n,e.y=t*i,e.z=t*s,e}vmul(t,e){return e===void 0&&(e=new y),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new y),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new y),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=Gg,s=1/n;i.set(this.x*s,this.y*s,this.z*s);const o=Wg;Math.abs(i.x)<.9?(o.set(1,0,0),i.cross(o,t)):(o.set(0,1,0),i.cross(o,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,s=this.y,o=this.z;n.x=i+(t.x-i)*e,n.y=s+(t.y-s)*e,n.z=o+(t.z-o)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(pc),pc.almostEquals(t,e)}clone(){return new y(this.x,this.y,this.z)}}y.ZERO=new y(0,0,0);y.UNIT_X=new y(1,0,0);y.UNIT_Y=new y(0,1,0);y.UNIT_Z=new y(0,0,1);const Gg=new y,Wg=new y,pc=new y;class Be{constructor(t){t===void 0&&(t={}),this.lowerBound=new y,this.upperBound=new y,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const s=this.lowerBound,o=this.upperBound,a=n;s.copy(t[0]),a&&a.vmult(s,s),o.copy(s);for(let c=1;c<t.length;c++){let l=t[c];a&&(a.vmult(l,mc),l=mc),l.x>o.x&&(o.x=l.x),l.x<s.x&&(s.x=l.x),l.y>o.y&&(o.y=l.y),l.y<s.y&&(s.y=l.y),l.z>o.z&&(o.z=l.z),l.z<s.z&&(s.z=l.z)}return e&&(e.vadd(s,s),e.vadd(o,o)),i&&(s.x-=i,s.y-=i,s.z-=i,o.x+=i,o.y+=i,o.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new Be().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound,o=i.x<=n.x&&n.x<=s.x||e.x<=s.x&&s.x<=n.x,a=i.y<=n.y&&n.y<=s.y||e.y<=s.y&&s.y<=n.y,c=i.z<=n.z&&n.z<=s.z||e.z<=s.z&&s.z<=n.z;return o&&a&&c}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound;return e.x<=i.x&&n.x>=s.x&&e.y<=i.y&&n.y>=s.y&&e.z<=i.z&&n.z>=s.z}getCorners(t,e,n,i,s,o,a,c){const l=this.lowerBound,h=this.upperBound;t.copy(l),e.set(h.x,l.y,l.z),n.set(h.x,h.y,l.z),i.set(l.x,h.y,h.z),s.set(h.x,l.y,h.z),o.set(l.x,h.y,l.z),a.set(l.x,l.y,h.z),c.copy(h)}toLocalFrame(t,e){const n=gc,i=n[0],s=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],d=n[7];this.getCorners(i,s,o,a,c,l,h,d);for(let u=0;u!==8;u++){const f=n[u];t.pointToLocal(f,f)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=gc,i=n[0],s=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],d=n[7];this.getCorners(i,s,o,a,c,l,h,d);for(let u=0;u!==8;u++){const f=n[u];t.pointToWorld(f,f)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,s=1/e.y,o=1/e.z,a=(this.lowerBound.x-n.x)*i,c=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*s,h=(this.upperBound.y-n.y)*s,d=(this.lowerBound.z-n.z)*o,u=(this.upperBound.z-n.z)*o,f=Math.max(Math.max(Math.min(a,c),Math.min(l,h)),Math.min(d,u)),g=Math.min(Math.min(Math.max(a,c),Math.max(l,h)),Math.max(d,u));return!(g<0||f>g)}}const mc=new y,gc=[new y,new y,new y,new y,new y,new y,new y,new y];class vc{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const s=i;i=n,n=s}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:s}=e;if(s>i){const o=s;s=i,i=o}this.matrix[(i*(i+1)>>1)+s-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class wl{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,s=n.length;i<s;i++)n[i].call(this,t)}return this}}class oe{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new y),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=qg,i=Xg;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new oe);const n=this.x,i=this.y,s=this.z,o=this.w,a=t.x,c=t.y,l=t.z,h=t.w;return e.x=n*h+o*a+i*l-s*c,e.y=i*h+o*c+s*a-n*l,e.z=s*h+o*l+n*c-i*a,e.w=o*h-n*a-i*c-s*l,e}inverse(t){t===void 0&&(t=new oe);const e=this.x,n=this.y,i=this.z,s=this.w;this.conjugate(t);const o=1/(e*e+n*n+i*i+s*s);return t.x*=o,t.y*=o,t.z*=o,t.w*=o,t}conjugate(t){return t===void 0&&(t=new oe),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new y);const n=t.x,i=t.y,s=t.z,o=this.x,a=this.y,c=this.z,l=this.w,h=l*n+a*s-c*i,d=l*i+c*n-o*s,u=l*s+o*i-a*n,f=-o*n-a*i-c*s;return e.x=h*l+f*-o+d*-c-u*-a,e.y=d*l+f*-a+u*-o-h*-c,e.z=u*l+f*-c+h*-a-d*-o,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,s;const o=this.x,a=this.y,c=this.z,l=this.w;switch(e){case"YZX":const h=o*a+c*l;if(h>.499&&(n=2*Math.atan2(o,l),i=Math.PI/2,s=0),h<-.499&&(n=-2*Math.atan2(o,l),i=-Math.PI/2,s=0),n===void 0){const d=o*o,u=a*a,f=c*c;n=Math.atan2(2*a*l-2*o*c,1-2*u-2*f),i=Math.asin(2*h),s=Math.atan2(2*o*l-2*a*c,1-2*d-2*f)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=s}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const s=Math.cos(t/2),o=Math.cos(e/2),a=Math.cos(n/2),c=Math.sin(t/2),l=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=c*o*a+s*l*h,this.y=s*l*a-c*o*h,this.z=s*o*h+c*l*a,this.w=s*o*a-c*l*h):i==="YXZ"?(this.x=c*o*a+s*l*h,this.y=s*l*a-c*o*h,this.z=s*o*h-c*l*a,this.w=s*o*a+c*l*h):i==="ZXY"?(this.x=c*o*a-s*l*h,this.y=s*l*a+c*o*h,this.z=s*o*h+c*l*a,this.w=s*o*a-c*l*h):i==="ZYX"?(this.x=c*o*a-s*l*h,this.y=s*l*a+c*o*h,this.z=s*o*h-c*l*a,this.w=s*o*a+c*l*h):i==="YZX"?(this.x=c*o*a+s*l*h,this.y=s*l*a+c*o*h,this.z=s*o*h-c*l*a,this.w=s*o*a-c*l*h):i==="XZY"&&(this.x=c*o*a-s*l*h,this.y=s*l*a-c*o*h,this.z=s*o*h+c*l*a,this.w=s*o*a+c*l*h),this}clone(){return new oe(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new oe);const i=this.x,s=this.y,o=this.z,a=this.w;let c=t.x,l=t.y,h=t.z,d=t.w,u,f,g,v,p;return f=i*c+s*l+o*h+a*d,f<0&&(f=-f,c=-c,l=-l,h=-h,d=-d),1-f>1e-6?(u=Math.acos(f),g=Math.sin(u),v=Math.sin((1-e)*u)/g,p=Math.sin(e*u)/g):(v=1-e,p=e),n.x=v*i+p*c,n.y=v*s+p*l,n.z=v*o+p*h,n.w=v*a+p*d,n}integrate(t,e,n,i){i===void 0&&(i=new oe);const s=t.x*n.x,o=t.y*n.y,a=t.z*n.z,c=this.x,l=this.y,h=this.z,d=this.w,u=e*.5;return i.x+=u*(s*d+o*h-a*l),i.y+=u*(o*d+a*c-s*h),i.z+=u*(a*d+s*l-o*c),i.w+=u*(-s*c-o*l-a*h),i}}const qg=new y,Xg=new y,Yg={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class gt{constructor(t){t===void 0&&(t={}),this.id=gt.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}gt.idCounter=0;gt.types=Yg;class Xt{constructor(t){t===void 0&&(t={}),this.position=new y,this.quaternion=new oe,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return Xt.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return Xt.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new y),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new y),n.vsub(t,i),e.conjugate(_c),_c.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new y),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new y),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new y),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const _c=new oe;class Ui extends gt{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:s,boundingSphereRadius:o}=t;super({type:gt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new y;for(let s=0;s!==t.length;s++){const o=t[s],a=o.length;for(let c=0;c!==a;c++){const l=(c+1)%a;e[o[c]].vsub(e[o[l]],i),i.normalize();let h=!1;for(let d=0;d!==n.length;d++)if(n[d].almostEquals(i)||n[d].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new y;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],s=this.vertices[n[1]],o=this.vertices[n[2]];Ui.computeNormal(i,s,o,e)}static computeNormal(t,e,n,i){const s=new y,o=new y;e.vsub(t,o),n.vsub(e,s),s.cross(o,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,s,o,a,c,l){const h=new y;let d=-1,u=-Number.MAX_VALUE;for(let g=0;g<n.faces.length;g++){h.copy(n.faceNormals[g]),s.vmult(h,h);const v=h.dot(o);v>u&&(u=v,d=g)}const f=[];for(let g=0;g<n.faces[d].length;g++){const v=n.vertices[n.faces[d][g]],p=new y;p.copy(v),s.vmult(p,p),i.vadd(p,p),f.push(p)}d>=0&&this.clipFaceAgainstHull(o,t,e,f,a,c,l)}findSeparatingAxis(t,e,n,i,s,o,a,c){const l=new y,h=new y,d=new y,u=new y,f=new y,g=new y;let v=Number.MAX_VALUE;const p=this;if(p.uniqueAxes)for(let m=0;m!==p.uniqueAxes.length;m++){n.vmult(p.uniqueAxes[m],l);const _=p.testSepAxis(l,t,e,n,i,s);if(_===!1)return!1;_<v&&(v=_,o.copy(l))}else{const m=a?a.length:p.faces.length;for(let _=0;_<m;_++){const x=a?a[_]:_;l.copy(p.faceNormals[x]),n.vmult(l,l);const S=p.testSepAxis(l,t,e,n,i,s);if(S===!1)return!1;S<v&&(v=S,o.copy(l))}}if(t.uniqueAxes)for(let m=0;m!==t.uniqueAxes.length;m++){s.vmult(t.uniqueAxes[m],h);const _=p.testSepAxis(h,t,e,n,i,s);if(_===!1)return!1;_<v&&(v=_,o.copy(h))}else{const m=c?c.length:t.faces.length;for(let _=0;_<m;_++){const x=c?c[_]:_;h.copy(t.faceNormals[x]),s.vmult(h,h);const S=p.testSepAxis(h,t,e,n,i,s);if(S===!1)return!1;S<v&&(v=S,o.copy(h))}}for(let m=0;m!==p.uniqueEdges.length;m++){n.vmult(p.uniqueEdges[m],u);for(let _=0;_!==t.uniqueEdges.length;_++)if(s.vmult(t.uniqueEdges[_],f),u.cross(f,g),!g.almostZero()){g.normalize();const x=p.testSepAxis(g,t,e,n,i,s);if(x===!1)return!1;x<v&&(v=x,o.copy(g))}}return i.vsub(e,d),d.dot(o)>0&&o.negate(o),!0}testSepAxis(t,e,n,i,s,o){const a=this;Ui.project(a,t,n,i,Zr),Ui.project(e,t,s,o,$r);const c=Zr[0],l=Zr[1],h=$r[0],d=$r[1];if(c<d||h<l)return!1;const u=c-d,f=h-l;return u<f?u:f}calculateLocalInertia(t,e){const n=new y,i=new y;this.computeLocalAABB(i,n);const s=n.x-i.x,o=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*o*2*o+2*a*2*a),e.y=1/12*t*(2*s*2*s+2*a*2*a),e.z=1/12*t*(2*o*2*o+2*s*2*s)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,s,o,a){const c=new y,l=new y,h=new y,d=new y,u=new y,f=new y,g=new y,v=new y,p=this,m=[],_=i,x=m;let S=-1,C=Number.MAX_VALUE;for(let M=0;M<p.faces.length;M++){c.copy(p.faceNormals[M]),n.vmult(c,c);const R=c.dot(t);R<C&&(C=R,S=M)}if(S<0)return;const T=p.faces[S];T.connectedFaces=[];for(let M=0;M<p.faces.length;M++)for(let R=0;R<p.faces[M].length;R++)T.indexOf(p.faces[M][R])!==-1&&M!==S&&T.connectedFaces.indexOf(M)===-1&&T.connectedFaces.push(M);const A=T.length;for(let M=0;M<A;M++){const R=p.vertices[T[M]],H=p.vertices[T[(M+1)%A]];R.vsub(H,l),h.copy(l),n.vmult(h,h),e.vadd(h,h),d.copy(this.faceNormals[S]),n.vmult(d,d),e.vadd(d,d),h.cross(d,u),u.negate(u),f.copy(R),n.vmult(f,f),e.vadd(f,f);const P=T.connectedFaces[M];g.copy(this.faceNormals[P]);const U=this.getPlaneConstantOfFace(P);v.copy(g),n.vmult(v,v);const B=U-v.dot(e);for(this.clipFaceAgainstPlane(_,x,v,B);_.length;)_.shift();for(;x.length;)_.push(x.shift())}g.copy(this.faceNormals[S]);const N=this.getPlaneConstantOfFace(S);v.copy(g),n.vmult(v,v);const w=N-v.dot(e);for(let M=0;M<_.length;M++){let R=v.dot(_[M])+w;if(R<=s&&(console.log(`clamped: depth=${R} to minDist=${s}`),R=s),R<=o){const H=_[M];if(R<=1e-6){const P={point:H,normal:v,depth:R};a.push(P)}}}}clipFaceAgainstPlane(t,e,n,i){let s,o;const a=t.length;if(a<2)return e;let c=t[t.length-1],l=t[0];s=n.dot(c)+i;for(let h=0;h<a;h++){if(l=t[h],o=n.dot(l)+i,s<0)if(o<0){const d=new y;d.copy(l),e.push(d)}else{const d=new y;c.lerp(l,s/(s-o),d),e.push(d)}else if(o<0){const d=new y;c.lerp(l,s/(s-o),d),e.push(d),e.push(l)}c=l,s=o}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new y);const n=this.vertices,i=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)e.vmult(n[s],i[s]),t.vadd(i[s],i[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const s=n[i];s.x<t.x?t.x=s.x:s.x>e.x&&(e.x=s.x),s.y<t.y?t.y=s.y:s.y>e.y&&(e.y=s.y),s.z<t.z?t.z=s.z:s.z>e.z&&(e.z=s.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new y);const n=this.faceNormals,i=this.worldFaceNormals;for(let s=0;s!==e;s++)t.vmult(n[s],i[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const s=this.vertices;let o,a,c,l,h,d,u=new y;for(let f=0;f<s.length;f++){u.copy(s[f]),e.vmult(u,u),t.vadd(u,u);const g=u;(o===void 0||g.x<o)&&(o=g.x),(l===void 0||g.x>l)&&(l=g.x),(a===void 0||g.y<a)&&(a=g.y),(h===void 0||g.y>h)&&(h=g.y),(c===void 0||g.z<c)&&(c=g.z),(d===void 0||g.z>d)&&(d=g.z)}n.set(o,a,c),i.set(l,h,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new y);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let s=0;s<n;s++){const o=i[s];e.vmult(o,o)}for(let s=0;s<this.faceNormals.length;s++){const o=this.faceNormals[s];e.vmult(o,o)}}if(t)for(let s=0;s<n;s++){const o=i[s];o.vadd(t,o)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,s=new y;this.getAveragePointLocal(s);for(let o=0;o<this.faces.length;o++){let a=i[o];const c=e[n[o][0]],l=new y;t.vsub(c,l);const h=a.dot(l),d=new y;s.vsub(c,d);const u=a.dot(d);if(h<0&&u>0||h>0&&u<0)return!1}return-1}static project(t,e,n,i,s){const o=t.vertices.length,a=jg;let c=0,l=0;const h=Kg,d=t.vertices;h.setZero(),Xt.vectorToLocalFrame(n,i,e,a),Xt.pointToLocalFrame(n,i,h,h);const u=h.dot(a);l=c=d[0].dot(a);for(let f=1;f<o;f++){const g=d[f].dot(a);g>c&&(c=g),g<l&&(l=g)}if(l-=u,c-=u,l>c){const f=l;l=c,c=f}s[0]=c,s[1]=l}}const Zr=[],$r=[];new y;const jg=new y,Kg=new y;class Vi extends gt{constructor(t){super({type:gt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=y,s=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],c=new Ui({vertices:s,faces:o,axes:a});this.convexPolyhedronRepresentation=c,c.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new y),Vi.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let s=0;s!==n.length;s++)e.vmult(n[s],n[s]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,s=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let o=0;o<s.length;o++)Ln.set(s[o][0],s[o][1],s[o][2]),e.vmult(Ln,Ln),t.vadd(Ln,Ln),n(Ln.x,Ln.y,Ln.z)}calculateWorldAABB(t,e,n,i){const s=this.halfExtents;Qe[0].set(s.x,s.y,s.z),Qe[1].set(-s.x,s.y,s.z),Qe[2].set(-s.x,-s.y,s.z),Qe[3].set(-s.x,-s.y,-s.z),Qe[4].set(s.x,-s.y,-s.z),Qe[5].set(s.x,s.y,-s.z),Qe[6].set(-s.x,s.y,-s.z),Qe[7].set(s.x,-s.y,s.z);const o=Qe[0];e.vmult(o,o),t.vadd(o,o),i.copy(o),n.copy(o);for(let a=1;a<8;a++){const c=Qe[a];e.vmult(c,c),t.vadd(c,c);const l=c.x,h=c.y,d=c.z;l>i.x&&(i.x=l),h>i.y&&(i.y=h),d>i.z&&(i.z=d),l<n.x&&(n.x=l),h<n.y&&(n.y=h),d<n.z&&(n.z=d)}}}const Ln=new y,Qe=[new y,new y,new y,new y,new y,new y,new y,new y],Ro={DYNAMIC:1,STATIC:2,KINEMATIC:4},Po={AWAKE:0,SLEEPY:1,SLEEPING:2};class lt extends wl{constructor(t){t===void 0&&(t={}),super(),this.id=lt.idCounter++,this.index=-1,this.world=null,this.vlambda=new y,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new y,this.previousPosition=new y,this.interpolatedPosition=new y,this.initPosition=new y,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new y,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new y,this.force=new y;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?lt.STATIC:lt.DYNAMIC,typeof t.type==typeof lt.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=lt.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new y,this.quaternion=new oe,this.initQuaternion=new oe,this.previousQuaternion=new oe,this.interpolatedQuaternion=new oe,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new y,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new y,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new y,this.invInertia=new y,this.invInertiaWorld=new Ze,this.invMassSolve=0,this.invInertiaSolve=new y,this.invInertiaWorldSolve=new Ze,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new y(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new y(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new Be,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new y,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=lt.AWAKE,this.wakeUpAfterNarrowphase=!1,t===lt.SLEEPING&&this.dispatchEvent(lt.wakeupEvent)}sleep(){this.sleepState=lt.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===lt.AWAKE&&n<i?(this.sleepState=lt.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(lt.sleepyEvent)):e===lt.SLEEPY&&n>i?this.wakeUp():e===lt.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(lt.sleepEvent))}}updateSolveMassProperties(){this.sleepState===lt.SLEEPING||this.type===lt.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new y),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new y),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new y),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new y),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new y,s=new oe;return e&&i.copy(e),n&&s.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let s=0;s!==n;s++){const o=t[s];o.updateBoundingSphereRadius();const a=e[s].length(),c=o.boundingSphereRadius;a+c>i&&(i=a+c)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,s=Zg,o=$g,a=this.quaternion,c=this.aabb,l=Jg;for(let h=0;h!==i;h++){const d=t[h];a.vmult(e[h],s),s.vadd(this.position,s),a.mult(n[h],o),d.calculateWorldAABB(s,o,l.lowerBound,l.upperBound),h===0?c.copy(l):c.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=Qg,i=tv;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new y),this.type!==lt.DYNAMIC)return;this.sleepState===lt.SLEEPING&&this.wakeUp();const n=ev;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new y),this.type!==lt.DYNAMIC)return;const n=nv,i=iv;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===lt.DYNAMIC&&(this.sleepState===lt.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new y),this.type!==lt.DYNAMIC)return;this.sleepState===lt.SLEEPING&&this.wakeUp();const n=e,i=sv;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const s=rv;n.cross(t,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new y),this.type!==lt.DYNAMIC)return;const n=ov,i=av;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=cv;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),Vi.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new y;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===lt.DYNAMIC||this.type===lt.KINEMATIC)||this.sleepState===lt.SLEEPING)return;const i=this.velocity,s=this.angularVelocity,o=this.position,a=this.force,c=this.torque,l=this.quaternion,h=this.invMass,d=this.invInertiaWorld,u=this.linearFactor,f=h*t;i.x+=a.x*f*u.x,i.y+=a.y*f*u.y,i.z+=a.z*f*u.z;const g=d.elements,v=this.angularFactor,p=c.x*v.x,m=c.y*v.y,_=c.z*v.z;s.x+=t*(g[0]*p+g[1]*m+g[2]*_),s.y+=t*(g[3]*p+g[4]*m+g[5]*_),s.z+=t*(g[6]*p+g[7]*m+g[8]*_),o.x+=i.x*t,o.y+=i.y*t,o.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}lt.idCounter=0;lt.COLLIDE_EVENT_NAME="collide";lt.DYNAMIC=Ro.DYNAMIC;lt.STATIC=Ro.STATIC;lt.KINEMATIC=Ro.KINEMATIC;lt.AWAKE=Po.AWAKE;lt.SLEEPY=Po.SLEEPY;lt.SLEEPING=Po.SLEEPING;lt.wakeupEvent={type:"wakeup"};lt.sleepyEvent={type:"sleepy"};lt.sleepEvent={type:"sleep"};const Zg=new y,$g=new oe,Jg=new Be,Qg=new Ze,tv=new Ze;new Ze;const ev=new y,nv=new y,iv=new y,sv=new y,rv=new y,ov=new y,av=new y,cv=new y;class bl{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!(!(t.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&t.collisionFilterMask)||(t.type&lt.STATIC||t.sleepState===lt.SLEEPING)&&(e.type&lt.STATIC||e.sleepState===lt.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const s=lv;e.position.vsub(t.position,s);const o=(t.boundingRadius+e.boundingRadius)**2;s.lengthSquared()<o&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=hv,i=uv,s=dv,o=t.length;for(let a=0;a!==o;a++)i[a]=t[a],s[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==o;a++){const c=i[a].id,l=s[a].id,h=c<l?`${c},${l}`:`${l},${c}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){const c=n.keys.pop(),l=n[c];t.push(i[l]),e.push(s[l]),delete n[c]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new y;t.position.vsub(e.position,n);const i=t.shapes[0],s=e.shapes[0];return Math.pow(i.boundingSphereRadius+s.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const lv=new y;new y;new oe;new y;const hv={keys:[]},uv=[],dv=[];new y;new y;new y;class fv extends bl{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,s=i.length;let o,a;for(let c=0;c!==s;c++)for(let l=0;l!==c;l++)o=i[c],a=i[l],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const s=t.bodies[i];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(e)&&n.push(s)}return n}}class nr{constructor(){this.rayFromWorld=new y,this.rayToWorld=new y,this.hitNormalWorld=new y,this.hitPointWorld=new y,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,s,o,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=s,this.body=o,this.distance=a}}let Tl,Al,Cl,Rl,Pl,Ll,Il;const Lo={CLOSEST:1,ANY:2,ALL:4};Tl=gt.types.SPHERE;Al=gt.types.PLANE;Cl=gt.types.BOX;Rl=gt.types.CYLINDER;Pl=gt.types.CONVEXPOLYHEDRON;Ll=gt.types.HEIGHTFIELD;Il=gt.types.TRIMESH;class de{get[Tl](){return this._intersectSphere}get[Al](){return this._intersectPlane}get[Cl](){return this._intersectBox}get[Rl](){return this._intersectConvex}get[Pl](){return this._intersectConvex}get[Ll](){return this._intersectHeightfield}get[Il](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new y),e===void 0&&(e=new y),this.from=t.clone(),this.to=e.clone(),this.direction=new y,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=de.ANY,this.result=new nr,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||de.ANY,this.result=e.result||new nr,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(xc),Jr.length=0,t.broadphase.aabbQuery(t,xc,Jr),this.intersectBodies(Jr),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||!(this.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&this.collisionFilterMask))return;const i=pv,s=mv;for(let o=0,a=t.shapes.length;o<a;o++){const c=t.shapes[o];if(!(n&&!c.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[o],s),t.quaternion.vmult(t.shapeOffsets[o],i),i.vadd(t.position,i),this.intersectShape(c,s,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const s=this.from;if(Rv(s,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,s){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,s)}_intersectPlane(t,e,n,i,s){const o=this.from,a=this.to,c=this.direction,l=new y(0,0,1);e.vmult(l,l);const h=new y;o.vsub(n,h);const d=h.dot(l);a.vsub(n,h);const u=h.dot(l);if(d*u>0||o.distanceTo(a)<d)return;const f=l.dot(c);if(Math.abs(f)<this.precision)return;const g=new y,v=new y,p=new y;o.vsub(n,g);const m=-l.dot(g)/f;c.scale(m,v),o.vadd(v,p),this.reportIntersection(l,p,s,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,s=this.from;e.x=Math.min(i.x,s.x),e.y=Math.min(i.y,s.y),e.z=Math.min(i.z,s.z),n.x=Math.max(i.x,s.x),n.y=Math.max(i.y,s.y),n.z=Math.max(i.z,s.z)}_intersectHeightfield(t,e,n,i,s){t.data,t.elementSize;const o=gv;o.from.copy(this.from),o.to.copy(this.to),Xt.pointToLocalFrame(n,e,o.from,o.from),Xt.pointToLocalFrame(n,e,o.to,o.to),o.updateDirection();const a=vv;let c,l,h,d;c=l=0,h=d=t.data.length-1;const u=new Be;o.getAABB(u),t.getIndexOfPosition(u.lowerBound.x,u.lowerBound.y,a,!0),c=Math.max(c,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(u.upperBound.x,u.upperBound.y,a,!0),h=Math.min(h,a[0]+1),d=Math.min(d,a[1]+1);for(let f=c;f<h;f++)for(let g=l;g<d;g++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(f,g,u),!!u.overlapsRay(o)){if(t.getConvexTrianglePillar(f,g,!1),Xt.pointToWorldFrame(n,e,t.pillarOffset,zs),this._intersectConvex(t.pillarConvex,e,zs,i,s,yc),this.result.shouldStop)return;t.getConvexTrianglePillar(f,g,!0),Xt.pointToWorldFrame(n,e,t.pillarOffset,zs),this._intersectConvex(t.pillarConvex,e,zs,i,s,yc)}}}_intersectSphere(t,e,n,i,s){const o=this.from,a=this.to,c=t.radius,l=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,h=2*((a.x-o.x)*(o.x-n.x)+(a.y-o.y)*(o.y-n.y)+(a.z-o.z)*(o.z-n.z)),d=(o.x-n.x)**2+(o.y-n.y)**2+(o.z-n.z)**2-c**2,u=h**2-4*l*d,f=_v,g=xv;if(!(u<0))if(u===0)o.lerp(a,u,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,s,i,-1);else{const v=(-h-Math.sqrt(u))/(2*l),p=(-h+Math.sqrt(u))/(2*l);if(v>=0&&v<=1&&(o.lerp(a,v,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,s,i,-1)),this.result.shouldStop)return;p>=0&&p<=1&&(o.lerp(a,p,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,s,i,-1))}}_intersectConvex(t,e,n,i,s,o){const a=yv,c=Mc,l=o&&o.faceList||null,h=t.faces,d=t.vertices,u=t.faceNormals,f=this.direction,g=this.from,v=this.to,p=g.distanceTo(v),m=l?l.length:h.length,_=this.result;for(let x=0;!_.shouldStop&&x<m;x++){const S=l?l[x]:x,C=h[S],T=u[S],A=e,N=n;c.copy(d[C[0]]),A.vmult(c,c),c.vadd(N,c),c.vsub(g,c),A.vmult(T,a);const w=f.dot(a);if(Math.abs(w)<this.precision)continue;const M=a.dot(c)/w;if(!(M<0)){f.scale(M,Ie),Ie.vadd(g,Ie),Ye.copy(d[C[0]]),A.vmult(Ye,Ye),N.vadd(Ye,Ye);for(let R=1;!_.shouldStop&&R<C.length-1;R++){tn.copy(d[C[R]]),en.copy(d[C[R+1]]),A.vmult(tn,tn),A.vmult(en,en),N.vadd(tn,tn),N.vadd(en,en);const H=Ie.distanceTo(g);!(de.pointInTriangle(Ie,Ye,tn,en)||de.pointInTriangle(Ie,tn,Ye,en))||H>p||this.reportIntersection(a,Ie,s,i,S)}}}}_intersectTrimesh(t,e,n,i,s,o){const a=Mv,c=Av,l=Cv,h=Mc,d=Sv,u=Ev,f=wv,g=Tv,v=bv,p=t.indices;t.vertices;const m=this.from,_=this.to,x=this.direction;l.position.copy(n),l.quaternion.copy(e),Xt.vectorToLocalFrame(n,e,x,d),Xt.pointToLocalFrame(n,e,m,u),Xt.pointToLocalFrame(n,e,_,f),f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,u.x*=t.scale.x,u.y*=t.scale.y,u.z*=t.scale.z,f.vsub(u,d),d.normalize();const S=u.distanceSquared(f);t.tree.rayQuery(this,l,c);for(let C=0,T=c.length;!this.result.shouldStop&&C!==T;C++){const A=c[C];t.getNormal(A,a),t.getVertex(p[A*3],Ye),Ye.vsub(u,h);const N=d.dot(a),w=a.dot(h)/N;if(w<0)continue;d.scale(w,Ie),Ie.vadd(u,Ie),t.getVertex(p[A*3+1],tn),t.getVertex(p[A*3+2],en);const M=Ie.distanceSquared(u);!(de.pointInTriangle(Ie,tn,Ye,en)||de.pointInTriangle(Ie,Ye,tn,en))||M>S||(Xt.vectorToWorldFrame(e,a,v),Xt.pointToWorldFrame(n,e,Ie,g),this.reportIntersection(v,g,s,i,A))}c.length=0}reportIntersection(t,e,n,i,s){const o=this.from,a=this.to,c=o.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case de.ALL:this.hasHit=!0,l.set(o,a,t,e,n,i,c),l.hasHit=!0,this.callback(l);break;case de.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c));break;case de.ANY:this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,ni),n.vsub(e,Zi),t.vsub(e,Qr);const s=ni.dot(ni),o=ni.dot(Zi),a=ni.dot(Qr),c=Zi.dot(Zi),l=Zi.dot(Qr);let h,d;return(h=c*a-o*l)>=0&&(d=s*l-o*a)>=0&&h+d<s*c-o*o}}de.CLOSEST=Lo.CLOSEST;de.ANY=Lo.ANY;de.ALL=Lo.ALL;const xc=new Be,Jr=[],Zi=new y,Qr=new y,pv=new y,mv=new oe,Ie=new y,Ye=new y,tn=new y,en=new y;new y;new nr;const yc={faceList:[0]},zs=new y,gv=new de,vv=[],_v=new y,xv=new y,yv=new y;new y;new y;const Mc=new y,Mv=new y,Sv=new y,Ev=new y,wv=new y,bv=new y,Tv=new y;new Be;const Av=[],Cv=new Xt,ni=new y,Hs=new y;function Rv(r,t,e){e.vsub(r,ni);const n=ni.dot(t);return t.scale(n,Hs),Hs.vadd(r,Hs),e.distanceTo(Hs)}class Li extends bl{static checkBounds(t,e,n){let i,s;n===0?(i=t.position.x,s=e.position.x):n===1?(i=t.position.y,s=e.position.y):n===2&&(i=t.position.z,s=e.position.z);const o=t.boundingRadius,a=e.boundingRadius,c=i+o;return s-a<c}static insertionSortX(t){for(let e=1,n=t.length;e<n;e++){const i=t[e];let s;for(s=e-1;s>=0&&!(t[s].aabb.lowerBound.x<=i.aabb.lowerBound.x);s--)t[s+1]=t[s];t[s+1]=i}return t}static insertionSortY(t){for(let e=1,n=t.length;e<n;e++){const i=t[e];let s;for(s=e-1;s>=0&&!(t[s].aabb.lowerBound.y<=i.aabb.lowerBound.y);s--)t[s+1]=t[s];t[s+1]=i}return t}static insertionSortZ(t){for(let e=1,n=t.length;e<n;e++){const i=t[e];let s;for(s=e-1;s>=0&&!(t[s].aabb.lowerBound.z<=i.aabb.lowerBound.z);s--)t[s+1]=t[s];t[s+1]=i}return t}constructor(t){super(),this.axisList=[],this.world=null,this.axisIndex=0;const e=this.axisList;this._addBodyHandler=n=>{e.push(n.body)},this._removeBodyHandler=n=>{const i=e.indexOf(n.body);i!==-1&&e.splice(i,1)},t&&this.setWorld(t)}setWorld(t){this.axisList.length=0;for(let e=0;e<t.bodies.length;e++)this.axisList.push(t.bodies[e]);t.removeEventListener("addBody",this._addBodyHandler),t.removeEventListener("removeBody",this._removeBodyHandler),t.addEventListener("addBody",this._addBodyHandler),t.addEventListener("removeBody",this._removeBodyHandler),this.world=t,this.dirty=!0}collisionPairs(t,e,n){const i=this.axisList,s=i.length,o=this.axisIndex;let a,c;for(this.dirty&&(this.sortList(),this.dirty=!1),a=0;a!==s;a++){const l=i[a];for(c=a+1;c<s;c++){const h=i[c];if(this.needBroadphaseCollision(l,h)){if(!Li.checkBounds(l,h,o))break;this.intersectionTest(l,h,e,n)}}}}sortList(){const t=this.axisList,e=this.axisIndex,n=t.length;for(let i=0;i!==n;i++){const s=t[i];s.aabbNeedsUpdate&&s.updateAABB()}e===0?Li.insertionSortX(t):e===1?Li.insertionSortY(t):e===2&&Li.insertionSortZ(t)}autoDetectAxis(){let t=0,e=0,n=0,i=0,s=0,o=0;const a=this.axisList,c=a.length,l=1/c;for(let f=0;f!==c;f++){const g=a[f],v=g.position.x;t+=v,e+=v*v;const p=g.position.y;n+=p,i+=p*p;const m=g.position.z;s+=m,o+=m*m}const h=e-t*t*l,d=i-n*n*l,u=o-s*s*l;h>d?h>u?this.axisIndex=0:this.axisIndex=2:d>u?this.axisIndex=1:this.axisIndex=2}aabbQuery(t,e,n){n===void 0&&(n=[]),this.dirty&&(this.sortList(),this.dirty=!1);const i=this.axisIndex;let s="x";i===1&&(s="y"),i===2&&(s="z");const o=this.axisList;e.lowerBound[s],e.upperBound[s];for(let a=0;a<o.length;a++){const c=o[a];c.aabbNeedsUpdate&&c.updateAABB(),c.aabb.overlaps(e)&&n.push(c)}return n}}class Nl{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class lr{constructor(t,e,n){n===void 0&&(n={}),n=Nl.defaults(n,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=t,this.bodyB=e,this.id=lr.idCounter++,this.collideConnected=n.collideConnected,n.wakeUpBodies&&(t&&t.wakeUp(),e&&e.wakeUp())}update(){throw new Error("method update() not implmemented in this Constraint subclass!")}enable(){const t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!0}disable(){const t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!1}}lr.idCounter=0;class Sc{constructor(){this.spatial=new y,this.rotational=new y}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class ci{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=ci.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new Sc,this.jacobianElementB=new Sc,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,s=t,o=n;this.a=4/(o*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(o*o*s*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),s=this.computeGq(),o=this.computeGiMf();return-s*t-i*e-o*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.position,o=i.position;return t.spatial.dot(s)+e.spatial.dot(o)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.velocity,o=i.velocity,a=n.angularVelocity,c=i.angularVelocity;return t.multiplyVectors(s,a)+e.multiplyVectors(o,c)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.vlambda,o=i.vlambda,a=n.wlambda,c=i.wlambda;return t.multiplyVectors(s,a)+e.multiplyVectors(o,c)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.force,o=n.torque,a=i.force,c=i.torque,l=n.invMassSolve,h=i.invMassSolve;return s.scale(l,Ec),a.scale(h,wc),n.invInertiaWorldSolve.vmult(o,bc),i.invInertiaWorldSolve.vmult(c,Tc),t.multiplyVectors(Ec,bc)+e.multiplyVectors(wc,Tc)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.invMassSolve,o=i.invMassSolve,a=n.invInertiaWorldSolve,c=i.invInertiaWorldSolve;let l=s+o;return a.vmult(t.rotational,ks),l+=ks.dot(t.rotational),c.vmult(e.rotational,ks),l+=ks.dot(e.rotational),l}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,s=this.bj,o=Pv;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),s.vlambda.addScaledVector(s.invMassSolve*t,n.spatial,s.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,o),i.wlambda.addScaledVector(t,o,i.wlambda),s.invInertiaWorldSolve.vmult(n.rotational,o),s.wlambda.addScaledVector(t,o,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}ci.idCounter=0;const Ec=new y,wc=new y,bc=new y,Tc=new y,ks=new y,Pv=new y;class Ys extends ci{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new y,this.rj=new y,this.ni=new y}computeB(t){const e=this.a,n=this.b,i=this.bi,s=this.bj,o=this.ri,a=this.rj,c=Lv,l=Iv,h=i.velocity,d=i.angularVelocity;i.force,i.torque;const u=s.velocity,f=s.angularVelocity;s.force,s.torque;const g=Nv,v=this.jacobianElementA,p=this.jacobianElementB,m=this.ni;o.cross(m,c),a.cross(m,l),m.negate(v.spatial),c.negate(v.rotational),p.spatial.copy(m),p.rotational.copy(l),g.copy(s.position),g.vadd(a,g),g.vsub(i.position,g),g.vsub(o,g);const _=m.dot(g),x=this.restitution+1,S=x*u.dot(m)-x*h.dot(m)+f.dot(l)-d.dot(c),C=this.computeGiMf();return-_*e-S*n-t*C}getImpactVelocityAlongNormal(){const t=Dv,e=Uv,n=Fv,i=Ov,s=Bv;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,s),this.ni.dot(s)}}const Lv=new y,Iv=new y,Nv=new y,Dv=new y,Uv=new y,Fv=new y,Ov=new y,Bv=new y;class zv extends lr{constructor(t,e,n,i,s){e===void 0&&(e=new y),i===void 0&&(i=new y),s===void 0&&(s=1e6),super(t,n),this.pivotA=e.clone(),this.pivotB=i.clone();const o=this.equationX=new Ys(t,n),a=this.equationY=new Ys(t,n),c=this.equationZ=new Ys(t,n);this.equations.push(o,a,c),o.minForce=a.minForce=c.minForce=-s,o.maxForce=a.maxForce=c.maxForce=s,o.ni.set(1,0,0),a.ni.set(0,1,0),c.ni.set(0,0,1)}update(){const t=this.bodyA,e=this.bodyB,n=this.equationX,i=this.equationY,s=this.equationZ;t.quaternion.vmult(this.pivotA,n.ri),e.quaternion.vmult(this.pivotB,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),s.ri.copy(n.ri),s.rj.copy(n.rj)}}new y;new y;class Ac extends ci{constructor(t,e,n){n===void 0&&(n={});const i=typeof n.maxForce<"u"?n.maxForce:1e6;super(t,e,-i,i),this.axisA=n.axisA?n.axisA.clone():new y(1,0,0),this.axisB=n.axisB?n.axisB.clone():new y(0,1,0),this.maxAngle=Math.PI/2}computeB(t){const e=this.a,n=this.b,i=this.axisA,s=this.axisB,o=Hv,a=kv,c=this.jacobianElementA,l=this.jacobianElementB;i.cross(s,o),s.cross(i,a),c.rotational.copy(a),l.rotational.copy(o);const h=Math.cos(this.maxAngle)-i.dot(s),d=this.computeGW(),u=this.computeGiMf();return-h*e-d*n-t*u}}const Hv=new y,kv=new y;new y;new y;new y;new y;class Vv extends ci{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,-n,n),this.axisA=new y,this.axisB=new y,this.targetVelocity=0}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.axisA,i=this.axisB,s=this.jacobianElementA,o=this.jacobianElementB;s.rotational.copy(n),i.negate(o.rotational);const a=this.computeGW()-this.targetVelocity,c=this.computeGiMf();return-a*e-t*c}}class Gv extends zv{constructor(t,e,n){n===void 0&&(n={});const i=typeof n.maxForce<"u"?n.maxForce:1e6,s=n.pivotA?n.pivotA.clone():new y,o=n.pivotB?n.pivotB.clone():new y;super(t,s,e,o,i),(this.axisA=n.axisA?n.axisA.clone():new y(1,0,0)).normalize(),(this.axisB=n.axisB?n.axisB.clone():new y(1,0,0)).normalize(),this.collideConnected=!!n.collideConnected;const l=this.rotationalEquation1=new Ac(t,e,n),h=this.rotationalEquation2=new Ac(t,e,n),d=this.motorEquation=new Vv(t,e,i);d.enabled=!1,this.equations.push(l,h,d)}enableMotor(){this.motorEquation.enabled=!0}disableMotor(){this.motorEquation.enabled=!1}setMotorSpeed(t){this.motorEquation.targetVelocity=t}setMotorMaxForce(t){this.motorEquation.maxForce=t,this.motorEquation.minForce=-t}update(){const t=this.bodyA,e=this.bodyB,n=this.motorEquation,i=this.rotationalEquation1,s=this.rotationalEquation2,o=Wv,a=qv,c=this.axisA,l=this.axisB;super.update(),t.quaternion.vmult(c,o),e.quaternion.vmult(l,a),o.tangents(i.axisA,s.axisA),i.axisB.copy(a),s.axisB.copy(a),this.motorEquation.enabled&&(t.quaternion.vmult(this.axisA,n.axisA),e.quaternion.vmult(this.axisB,n.axisB))}}const Wv=new y,qv=new y;class Cc extends ci{constructor(t,e,n){super(t,e,-n,n),this.ri=new y,this.rj=new y,this.t=new y}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,s=Xv,o=Yv,a=this.t;n.cross(a,s),i.cross(a,o);const c=this.jacobianElementA,l=this.jacobianElementB;a.negate(c.spatial),s.negate(c.rotational),l.spatial.copy(a),l.rotational.copy(o);const h=this.computeGW(),d=this.computeGiMf();return-h*e-t*d}}const Xv=new y,Yv=new y;class Dn{constructor(t,e,n){n=Nl.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=Dn.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}Dn.idCounter=0;class Un{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=Un.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}Un.idCounter=0;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new de;new y;new y;new y;new y(1,0,0),new y(0,1,0),new y(0,0,1);new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;class uo extends gt{constructor(t){if(super({type:gt.types.SPHERE}),this.radius=t!==void 0?t:1,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}calculateLocalInertia(t,e){e===void 0&&(e=new y);const n=2*t*this.radius*this.radius/5;return e.x=n,e.y=n,e.z=n,e}volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(t,e,n,i){const s=this.radius,o=["x","y","z"];for(let a=0;a<o.length;a++){const c=o[a];n[c]=t[c]-s,i[c]=t[c]+s}}}new y;new y;new y;new y;new y;new y;new y;new y;new y;class fo extends Ui{constructor(t,e,n,i){if(t===void 0&&(t=1),e===void 0&&(e=1),n===void 0&&(n=1),i===void 0&&(i=8),t<0)throw new Error("The cylinder radiusTop cannot be negative.");if(e<0)throw new Error("The cylinder radiusBottom cannot be negative.");const s=i,o=[],a=[],c=[],l=[],h=[],d=Math.cos,u=Math.sin;o.push(new y(-e*u(0),-n*.5,e*d(0))),l.push(0),o.push(new y(-t*u(0),n*.5,t*d(0))),h.push(1);for(let g=0;g<s;g++){const v=2*Math.PI/s*(g+1),p=2*Math.PI/s*(g+.5);g<s-1?(o.push(new y(-e*u(v),-n*.5,e*d(v))),l.push(2*g+2),o.push(new y(-t*u(v),n*.5,t*d(v))),h.push(2*g+3),c.push([2*g,2*g+1,2*g+3,2*g+2])):c.push([2*g,2*g+1,1,0]),(s%2===1||g<s/2)&&a.push(new y(-u(p),0,d(p)))}c.push(l),a.push(new y(0,1,0));const f=[];for(let g=0;g<h.length;g++)f.push(h[h.length-g-1]);c.push(f),super({vertices:o,faces:c,axes:a}),this.type=gt.types.CYLINDER,this.radiusTop=t,this.radiusBottom=e,this.height=n,this.numSegments=i}}new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new Be;new y;new Be;new y;new y;new y;new y;new y;new y;new y;new Be;new y;new Xt;new Be;class jv{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class Kv extends jv{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,s=this.tolerance*this.tolerance,o=this.equations,a=o.length,c=e.bodies,l=c.length,h=t;let d,u,f,g,v,p;if(a!==0)for(let S=0;S!==l;S++)c[S].updateSolveMassProperties();const m=$v,_=Jv,x=Zv;m.length=a,_.length=a,x.length=a;for(let S=0;S!==a;S++){const C=o[S];x[S]=0,_[S]=C.computeB(h),m[S]=1/C.computeC()}if(a!==0){for(let T=0;T!==l;T++){const A=c[T],N=A.vlambda,w=A.wlambda;N.set(0,0,0),w.set(0,0,0)}for(n=0;n!==i;n++){g=0;for(let T=0;T!==a;T++){const A=o[T];d=_[T],u=m[T],p=x[T],v=A.computeGWlambda(),f=u*(d-v-A.eps*p),p+f<A.minForce?f=A.minForce-p:p+f>A.maxForce&&(f=A.maxForce-p),x[T]+=f,g+=f>0?f:-f,A.addToWlambda(f)}if(g*g<s)break}for(let T=0;T!==l;T++){const A=c[T],N=A.velocity,w=A.angularVelocity;A.vlambda.vmul(A.linearFactor,A.vlambda),N.vadd(A.vlambda,N),A.wlambda.vmul(A.angularFactor,A.wlambda),w.vadd(A.wlambda,w)}let S=o.length;const C=1/h;for(;S--;)o[S].multiplier=x[S]*C}return n}}const Zv=[],$v=[],Jv=[];class Qv{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class t0 extends Qv{constructor(){super(...arguments),this.type=y}constructObject(){return new y}}const ee={sphereSphere:gt.types.SPHERE,spherePlane:gt.types.SPHERE|gt.types.PLANE,boxBox:gt.types.BOX|gt.types.BOX,sphereBox:gt.types.SPHERE|gt.types.BOX,planeBox:gt.types.PLANE|gt.types.BOX,convexConvex:gt.types.CONVEXPOLYHEDRON,sphereConvex:gt.types.SPHERE|gt.types.CONVEXPOLYHEDRON,planeConvex:gt.types.PLANE|gt.types.CONVEXPOLYHEDRON,boxConvex:gt.types.BOX|gt.types.CONVEXPOLYHEDRON,sphereHeightfield:gt.types.SPHERE|gt.types.HEIGHTFIELD,boxHeightfield:gt.types.BOX|gt.types.HEIGHTFIELD,convexHeightfield:gt.types.CONVEXPOLYHEDRON|gt.types.HEIGHTFIELD,sphereParticle:gt.types.PARTICLE|gt.types.SPHERE,planeParticle:gt.types.PLANE|gt.types.PARTICLE,boxParticle:gt.types.BOX|gt.types.PARTICLE,convexParticle:gt.types.PARTICLE|gt.types.CONVEXPOLYHEDRON,cylinderCylinder:gt.types.CYLINDER,sphereCylinder:gt.types.SPHERE|gt.types.CYLINDER,planeCylinder:gt.types.PLANE|gt.types.CYLINDER,boxCylinder:gt.types.BOX|gt.types.CYLINDER,convexCylinder:gt.types.CONVEXPOLYHEDRON|gt.types.CYLINDER,heightfieldCylinder:gt.types.HEIGHTFIELD|gt.types.CYLINDER,particleCylinder:gt.types.PARTICLE|gt.types.CYLINDER,sphereTrimesh:gt.types.SPHERE|gt.types.TRIMESH,planeTrimesh:gt.types.PLANE|gt.types.TRIMESH};class e0{get[ee.sphereSphere](){return this.sphereSphere}get[ee.spherePlane](){return this.spherePlane}get[ee.boxBox](){return this.boxBox}get[ee.sphereBox](){return this.sphereBox}get[ee.planeBox](){return this.planeBox}get[ee.convexConvex](){return this.convexConvex}get[ee.sphereConvex](){return this.sphereConvex}get[ee.planeConvex](){return this.planeConvex}get[ee.boxConvex](){return this.boxConvex}get[ee.sphereHeightfield](){return this.sphereHeightfield}get[ee.boxHeightfield](){return this.boxHeightfield}get[ee.convexHeightfield](){return this.convexHeightfield}get[ee.sphereParticle](){return this.sphereParticle}get[ee.planeParticle](){return this.planeParticle}get[ee.boxParticle](){return this.boxParticle}get[ee.convexParticle](){return this.convexParticle}get[ee.cylinderCylinder](){return this.convexConvex}get[ee.sphereCylinder](){return this.sphereConvex}get[ee.planeCylinder](){return this.planeConvex}get[ee.boxCylinder](){return this.boxConvex}get[ee.convexCylinder](){return this.convexConvex}get[ee.heightfieldCylinder](){return this.heightfieldCylinder}get[ee.particleCylinder](){return this.particleCylinder}get[ee.sphereTrimesh](){return this.sphereTrimesh}get[ee.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new t0,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,s,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new Ys(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const c=this.currentContactMaterial;a.restitution=c.restitution,a.setSpookParams(c.contactEquationStiffness,c.contactEquationRelaxation,this.world.dt);const l=n.material||t.material,h=i.material||e.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(a.restitution=l.restitution*h.restitution),a.si=s||n,a.sj=o||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,s=t.si,o=t.sj,a=this.world,c=this.currentContactMaterial;let l=c.friction;const h=s.material||n.material,d=o.material||i.material;if(h&&d&&h.friction>=0&&d.friction>=0&&(l=h.friction*d.friction),l>0){const u=l*(a.frictionGravity||a.gravity).length();let f=n.invMass+i.invMass;f>0&&(f=1/f);const g=this.frictionEquationPool,v=g.length?g.pop():new Cc(n,i,u*f),p=g.length?g.pop():new Cc(n,i,u*f);return v.bi=p.bi=n,v.bj=p.bj=i,v.minForce=p.minForce=-u*f,v.maxForce=p.maxForce=u*f,v.ri.copy(t.ri),v.rj.copy(t.rj),p.ri.copy(t.ri),p.rj.copy(t.rj),t.ni.tangents(v.t,p.t),v.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),p.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),v.enabled=p.enabled=t.enabled,e.push(v,p),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];$n.setZero(),Ti.setZero(),Ai.setZero();const s=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==s?($n.vadd(e.ni,$n),Ti.vadd(e.ri,Ti),Ai.vadd(e.rj,Ai)):($n.vsub(e.ni,$n),Ti.vadd(e.rj,Ti),Ai.vadd(e.ri,Ai));const o=1/t;Ti.scale(o,n.ri),Ai.scale(o,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),$n.normalize(),$n.tangents(n.t,i.t)}getContacts(t,e,n,i,s,o,a){this.contactPointPool=s,this.frictionEquationPool=a,this.result=i,this.frictionResult=o;const c=s0,l=r0,h=n0,d=i0;for(let u=0,f=t.length;u!==f;u++){const g=t[u],v=e[u];let p=null;g.material&&v.material&&(p=n.getContactMaterial(g.material,v.material)||null);const m=g.type&lt.KINEMATIC&&v.type&lt.STATIC||g.type&lt.STATIC&&v.type&lt.KINEMATIC||g.type&lt.KINEMATIC&&v.type&lt.KINEMATIC;for(let _=0;_<g.shapes.length;_++){g.quaternion.mult(g.shapeOrientations[_],c),g.quaternion.vmult(g.shapeOffsets[_],h),h.vadd(g.position,h);const x=g.shapes[_];for(let S=0;S<v.shapes.length;S++){v.quaternion.mult(v.shapeOrientations[S],l),v.quaternion.vmult(v.shapeOffsets[S],d),d.vadd(v.position,d);const C=v.shapes[S];if(!(x.collisionFilterMask&C.collisionFilterGroup&&C.collisionFilterMask&x.collisionFilterGroup)||h.distanceTo(d)>x.boundingSphereRadius+C.boundingSphereRadius)continue;let T=null;x.material&&C.material&&(T=n.getContactMaterial(x.material,C.material)||null),this.currentContactMaterial=T||p||n.defaultContactMaterial;const A=x.type|C.type,N=this[A];if(N){let w=!1;x.type<C.type?w=N.call(this,x,C,h,d,c,l,g,v,x,C,m):w=N.call(this,C,x,d,h,l,c,v,g,x,C,m),w&&m&&(n.shapeOverlapKeeper.set(x.id,C.id),n.bodyOverlapKeeper.set(g.id,v.id))}}}}}sphereSphere(t,e,n,i,s,o,a,c,l,h,d){if(d)return n.distanceSquared(i)<(t.radius+e.radius)**2;const u=this.createContactEquation(a,c,t,e,l,h);i.vsub(n,u.ni),u.ni.normalize(),u.ri.copy(u.ni),u.rj.copy(u.ni),u.ri.scale(t.radius,u.ri),u.rj.scale(-e.radius,u.rj),u.ri.vadd(n,u.ri),u.ri.vsub(a.position,u.ri),u.rj.vadd(i,u.rj),u.rj.vsub(c.position,u.rj),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}spherePlane(t,e,n,i,s,o,a,c,l,h,d){const u=this.createContactEquation(a,c,t,e,l,h);if(u.ni.set(0,0,1),o.vmult(u.ni,u.ni),u.ni.negate(u.ni),u.ni.normalize(),u.ni.scale(t.radius,u.ri),n.vsub(i,Vs),u.ni.scale(u.ni.dot(Vs),Rc),Vs.vsub(Rc,u.rj),-Vs.dot(u.ni)<=t.radius){if(d)return!0;const f=u.ri,g=u.rj;f.vadd(n,f),f.vsub(a.position,f),g.vadd(i,g),g.vsub(c.position,g),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}}boxBox(t,e,n,i,s,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,s,o,a,c,t,e,d)}sphereBox(t,e,n,i,s,o,a,c,l,h,d){const u=this.v3pool,f=L0;n.vsub(i,Gs),e.getSideNormals(f,o);const g=t.radius;let v=!1;const p=N0,m=D0,_=U0;let x=null,S=0,C=0,T=0,A=null;for(let I=0,j=f.length;I!==j&&v===!1;I++){const V=C0;V.copy(f[I]);const Z=V.length();V.normalize();const ot=Gs.dot(V);if(ot<Z+g&&ot>0){const at=R0,st=P0;at.copy(f[(I+1)%3]),st.copy(f[(I+2)%3]);const Bt=at.length(),X=st.length();at.normalize(),st.normalize();const tt=Gs.dot(at),mt=Gs.dot(st);if(tt<Bt&&tt>-Bt&&mt<X&&mt>-X){const ct=Math.abs(ot-Z-g);if((A===null||ct<A)&&(A=ct,C=tt,T=mt,x=Z,p.copy(V),m.copy(at),_.copy(st),S++,d))return!0}}}if(S){v=!0;const I=this.createContactEquation(a,c,t,e,l,h);p.scale(-g,I.ri),I.ni.copy(p),I.ni.negate(I.ni),p.scale(x,p),m.scale(C,m),p.vadd(m,p),_.scale(T,_),p.vadd(_,I.rj),I.ri.vadd(n,I.ri),I.ri.vsub(a.position,I.ri),I.rj.vadd(i,I.rj),I.rj.vsub(c.position,I.rj),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}let N=u.get();const w=I0;for(let I=0;I!==2&&!v;I++)for(let j=0;j!==2&&!v;j++)for(let V=0;V!==2&&!v;V++)if(N.set(0,0,0),I?N.vadd(f[0],N):N.vsub(f[0],N),j?N.vadd(f[1],N):N.vsub(f[1],N),V?N.vadd(f[2],N):N.vsub(f[2],N),i.vadd(N,w),w.vsub(n,w),w.lengthSquared()<g*g){if(d)return!0;v=!0;const Z=this.createContactEquation(a,c,t,e,l,h);Z.ri.copy(w),Z.ri.normalize(),Z.ni.copy(Z.ri),Z.ri.scale(g,Z.ri),Z.rj.copy(N),Z.ri.vadd(n,Z.ri),Z.ri.vsub(a.position,Z.ri),Z.rj.vadd(i,Z.rj),Z.rj.vsub(c.position,Z.rj),this.result.push(Z),this.createFrictionEquationsFromContact(Z,this.frictionResult)}u.release(N),N=null;const M=u.get(),R=u.get(),H=u.get(),P=u.get(),U=u.get(),B=f.length;for(let I=0;I!==B&&!v;I++)for(let j=0;j!==B&&!v;j++)if(I%3!==j%3){f[j].cross(f[I],M),M.normalize(),f[I].vadd(f[j],R),H.copy(n),H.vsub(R,H),H.vsub(i,H);const V=H.dot(M);M.scale(V,P);let Z=0;for(;Z===I%3||Z===j%3;)Z++;U.copy(n),U.vsub(P,U),U.vsub(R,U),U.vsub(i,U);const ot=Math.abs(V),at=U.length();if(ot<f[Z].length()&&at<g){if(d)return!0;v=!0;const st=this.createContactEquation(a,c,t,e,l,h);R.vadd(P,st.rj),st.rj.copy(st.rj),U.negate(st.ni),st.ni.normalize(),st.ri.copy(st.rj),st.ri.vadd(i,st.ri),st.ri.vsub(n,st.ri),st.ri.normalize(),st.ri.scale(g,st.ri),st.ri.vadd(n,st.ri),st.ri.vsub(a.position,st.ri),st.rj.vadd(i,st.rj),st.rj.vsub(c.position,st.rj),this.result.push(st),this.createFrictionEquationsFromContact(st,this.frictionResult)}}u.release(M,R,H,P,U)}planeBox(t,e,n,i,s,o,a,c,l,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,s,o,a,c,t,e,d)}convexConvex(t,e,n,i,s,o,a,c,l,h,d,u,f){const g=Z0;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,s,i,o,g,u,f)){const v=[],p=$0;t.clipAgainstHull(n,s,e,i,o,g,-100,100,v);let m=0;for(let _=0;_!==v.length;_++){if(d)return!0;const x=this.createContactEquation(a,c,t,e,l,h),S=x.ri,C=x.rj;g.negate(x.ni),v[_].normal.negate(p),p.scale(v[_].depth,p),v[_].point.vadd(p,S),C.copy(v[_].point),S.vsub(n,S),C.vsub(i,C),S.vadd(n,S),S.vsub(a.position,S),C.vadd(i,C),C.vsub(c.position,C),this.result.push(x),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}}sphereConvex(t,e,n,i,s,o,a,c,l,h,d){const u=this.v3pool;n.vsub(i,F0);const f=e.faceNormals,g=e.faces,v=e.vertices,p=t.radius;let m=!1;for(let _=0;_!==v.length;_++){const x=v[_],S=H0;o.vmult(x,S),i.vadd(S,S);const C=z0;if(S.vsub(n,C),C.lengthSquared()<p*p){if(d)return!0;m=!0;const T=this.createContactEquation(a,c,t,e,l,h);T.ri.copy(C),T.ri.normalize(),T.ni.copy(T.ri),T.ri.scale(p,T.ri),S.vsub(i,T.rj),T.ri.vadd(n,T.ri),T.ri.vsub(a.position,T.ri),T.rj.vadd(i,T.rj),T.rj.vsub(c.position,T.rj),this.result.push(T),this.createFrictionEquationsFromContact(T,this.frictionResult);return}}for(let _=0,x=g.length;_!==x&&m===!1;_++){const S=f[_],C=g[_],T=k0;o.vmult(S,T);const A=V0;o.vmult(v[C[0]],A),A.vadd(i,A);const N=G0;T.scale(-p,N),n.vadd(N,N);const w=W0;N.vsub(A,w);const M=w.dot(T),R=q0;if(n.vsub(A,R),M<0&&R.dot(T)>0){const H=[];for(let P=0,U=C.length;P!==U;P++){const B=u.get();o.vmult(v[C[P]],B),i.vadd(B,B),H.push(B)}if(A0(H,T,n)){if(d)return!0;m=!0;const P=this.createContactEquation(a,c,t,e,l,h);T.scale(-p,P.ri),T.negate(P.ni);const U=u.get();T.scale(-M,U);const B=u.get();T.scale(-p,B),n.vsub(i,P.rj),P.rj.vadd(B,P.rj),P.rj.vadd(U,P.rj),P.rj.vadd(i,P.rj),P.rj.vsub(c.position,P.rj),P.ri.vadd(n,P.ri),P.ri.vsub(a.position,P.ri),u.release(U),u.release(B),this.result.push(P),this.createFrictionEquationsFromContact(P,this.frictionResult);for(let I=0,j=H.length;I!==j;I++)u.release(H[I]);return}else for(let P=0;P!==C.length;P++){const U=u.get(),B=u.get();o.vmult(v[C[(P+1)%C.length]],U),o.vmult(v[C[(P+2)%C.length]],B),i.vadd(U,U),i.vadd(B,B);const I=O0;B.vsub(U,I);const j=B0;I.unit(j);const V=u.get(),Z=u.get();n.vsub(U,Z);const ot=Z.dot(j);j.scale(ot,V),V.vadd(U,V);const at=u.get();if(V.vsub(n,at),ot>0&&ot*ot<I.lengthSquared()&&at.lengthSquared()<p*p){if(d)return!0;const st=this.createContactEquation(a,c,t,e,l,h);V.vsub(i,st.rj),V.vsub(n,st.ni),st.ni.normalize(),st.ni.scale(p,st.ri),st.rj.vadd(i,st.rj),st.rj.vsub(c.position,st.rj),st.ri.vadd(n,st.ri),st.ri.vsub(a.position,st.ri),this.result.push(st),this.createFrictionEquationsFromContact(st,this.frictionResult);for(let Bt=0,X=H.length;Bt!==X;Bt++)u.release(H[Bt]);u.release(U),u.release(B),u.release(V),u.release(at),u.release(Z);return}u.release(U),u.release(B),u.release(V),u.release(at),u.release(Z)}for(let P=0,U=H.length;P!==U;P++)u.release(H[P])}}}planeConvex(t,e,n,i,s,o,a,c,l,h,d){const u=X0,f=Y0;f.set(0,0,1),s.vmult(f,f);let g=0;const v=j0;for(let p=0;p!==e.vertices.length;p++)if(u.copy(e.vertices[p]),o.vmult(u,u),i.vadd(u,u),u.vsub(n,v),f.dot(v)<=0){if(d)return!0;const _=this.createContactEquation(a,c,t,e,l,h),x=K0;f.scale(f.dot(v),x),u.vsub(x,x),x.vsub(n,_.ri),_.ni.copy(f),u.vsub(i,_.rj),_.ri.vadd(n,_.ri),_.ri.vsub(a.position,_.ri),_.rj.vadd(i,_.rj),_.rj.vsub(c.position,_.rj),this.result.push(_),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(_,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}boxConvex(t,e,n,i,s,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,s,o,a,c,t,e,d)}sphereHeightfield(t,e,n,i,s,o,a,c,l,h,d){const u=e.data,f=t.radius,g=e.elementSize,v=l_,p=c_;Xt.pointToLocalFrame(i,o,n,p);let m=Math.floor((p.x-f)/g)-1,_=Math.ceil((p.x+f)/g)+1,x=Math.floor((p.y-f)/g)-1,S=Math.ceil((p.y+f)/g)+1;if(_<0||S<0||m>u.length||x>u[0].length)return;m<0&&(m=0),_<0&&(_=0),x<0&&(x=0),S<0&&(S=0),m>=u.length&&(m=u.length-1),_>=u.length&&(_=u.length-1),S>=u[0].length&&(S=u[0].length-1),x>=u[0].length&&(x=u[0].length-1);const C=[];e.getRectMinMax(m,x,_,S,C);const T=C[0],A=C[1];if(p.z-f>A||p.z+f<T)return;const N=this.result;for(let w=m;w<_;w++)for(let M=x;M<S;M++){const R=N.length;let H=!1;if(e.getConvexTrianglePillar(w,M,!1),Xt.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(H=this.sphereConvex(t,e.pillarConvex,n,v,s,o,a,c,t,e,d)),d&&H||(e.getConvexTrianglePillar(w,M,!0),Xt.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(H=this.sphereConvex(t,e.pillarConvex,n,v,s,o,a,c,t,e,d)),d&&H))return!0;if(N.length-R>2)return}}boxHeightfield(t,e,n,i,s,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,s,o,a,c,t,e,d)}convexHeightfield(t,e,n,i,s,o,a,c,l,h,d){const u=e.data,f=e.elementSize,g=t.boundingSphereRadius,v=o_,p=a_,m=r_;Xt.pointToLocalFrame(i,o,n,m);let _=Math.floor((m.x-g)/f)-1,x=Math.ceil((m.x+g)/f)+1,S=Math.floor((m.y-g)/f)-1,C=Math.ceil((m.y+g)/f)+1;if(x<0||C<0||_>u.length||S>u[0].length)return;_<0&&(_=0),x<0&&(x=0),S<0&&(S=0),C<0&&(C=0),_>=u.length&&(_=u.length-1),x>=u.length&&(x=u.length-1),C>=u[0].length&&(C=u[0].length-1),S>=u[0].length&&(S=u[0].length-1);const T=[];e.getRectMinMax(_,S,x,C,T);const A=T[0],N=T[1];if(!(m.z-g>N||m.z+g<A))for(let w=_;w<x;w++)for(let M=S;M<C;M++){let R=!1;if(e.getConvexTrianglePillar(w,M,!1),Xt.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(R=this.convexConvex(t,e.pillarConvex,n,v,s,o,a,c,null,null,d,p,null)),d&&R||(e.getConvexTrianglePillar(w,M,!0),Xt.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(R=this.convexConvex(t,e.pillarConvex,n,v,s,o,a,c,null,null,d,p,null)),d&&R))return!0}}sphereParticle(t,e,n,i,s,o,a,c,l,h,d){const u=e_;if(u.set(0,0,1),i.vsub(n,u),u.lengthSquared()<=t.radius*t.radius){if(d)return!0;const g=this.createContactEquation(c,a,e,t,l,h);u.normalize(),g.rj.copy(u),g.rj.scale(t.radius,g.rj),g.ni.copy(u),g.ni.negate(g.ni),g.ri.set(0,0,0),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}planeParticle(t,e,n,i,s,o,a,c,l,h,d){const u=J0;u.set(0,0,1),a.quaternion.vmult(u,u);const f=Q0;if(i.vsub(a.position,f),u.dot(f)<=0){if(d)return!0;const v=this.createContactEquation(c,a,e,t,l,h);v.ni.copy(u),v.ni.negate(v.ni),v.ri.set(0,0,0);const p=t_;u.scale(u.dot(i),p),i.vsub(p,p),v.rj.copy(p),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}boxParticle(t,e,n,i,s,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,s,o,a,c,t,e,d)}convexParticle(t,e,n,i,s,o,a,c,l,h,d){let u=-1;const f=i_,g=s_;let v=null;const p=n_;if(p.copy(i),p.vsub(n,p),s.conjugate(Pc),Pc.vmult(p,p),t.pointIsInside(p)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,s),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(s);for(let m=0,_=t.faces.length;m!==_;m++){const x=[t.worldVertices[t.faces[m][0]]],S=t.worldFaceNormals[m];i.vsub(x[0],Lc);const C=-S.dot(Lc);if(v===null||Math.abs(C)<Math.abs(v)){if(d)return!0;v=C,u=m,f.copy(S)}}if(u!==-1){const m=this.createContactEquation(c,a,e,t,l,h);f.scale(v,g),g.vadd(i,g),g.vsub(n,g),m.rj.copy(g),f.negate(m.ni),m.ri.set(0,0,0);const _=m.ri,x=m.rj;_.vadd(i,_),_.vsub(c.position,_),x.vadd(n,x),x.vsub(a.position,x),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,s,o,a,c,l,h,d){return this.convexHeightfield(e,t,i,n,o,s,c,a,l,h,d)}particleCylinder(t,e,n,i,s,o,a,c,l,h,d){return this.convexParticle(e,t,i,n,o,s,c,a,l,h,d)}sphereTrimesh(t,e,n,i,s,o,a,c,l,h,d){const u=f0,f=p0,g=m0,v=g0,p=v0,m=_0,_=S0,x=d0,S=h0,C=E0;Xt.pointToLocalFrame(i,o,n,p);const T=t.radius;_.lowerBound.set(p.x-T,p.y-T,p.z-T),_.upperBound.set(p.x+T,p.y+T,p.z+T),e.getTrianglesInAABB(_,C);const A=u0,N=t.radius*t.radius;for(let P=0;P<C.length;P++)for(let U=0;U<3;U++)if(e.getVertex(e.indices[C[P]*3+U],A),A.vsub(p,S),S.lengthSquared()<=N){if(x.copy(A),Xt.pointToWorldFrame(i,o,x,A),A.vsub(n,S),d)return!0;let B=this.createContactEquation(a,c,t,e,l,h);B.ni.copy(S),B.ni.normalize(),B.ri.copy(B.ni),B.ri.scale(t.radius,B.ri),B.ri.vadd(n,B.ri),B.ri.vsub(a.position,B.ri),B.rj.copy(A),B.rj.vsub(c.position,B.rj),this.result.push(B),this.createFrictionEquationsFromContact(B,this.frictionResult)}for(let P=0;P<C.length;P++)for(let U=0;U<3;U++){e.getVertex(e.indices[C[P]*3+U],u),e.getVertex(e.indices[C[P]*3+(U+1)%3],f),f.vsub(u,g),p.vsub(f,m);const B=m.dot(g);p.vsub(u,m);let I=m.dot(g);if(I>0&&B<0&&(p.vsub(u,m),v.copy(g),v.normalize(),I=m.dot(v),v.scale(I,m),m.vadd(u,m),m.distanceTo(p)<t.radius)){if(d)return!0;const V=this.createContactEquation(a,c,t,e,l,h);m.vsub(p,V.ni),V.ni.normalize(),V.ni.scale(t.radius,V.ri),V.ri.vadd(n,V.ri),V.ri.vsub(a.position,V.ri),Xt.pointToWorldFrame(i,o,m,m),m.vsub(c.position,V.rj),Xt.vectorToWorldFrame(o,V.ni,V.ni),Xt.vectorToWorldFrame(o,V.ri,V.ri),this.result.push(V),this.createFrictionEquationsFromContact(V,this.frictionResult)}}const w=x0,M=y0,R=M0,H=l0;for(let P=0,U=C.length;P!==U;P++){e.getTriangleVertices(C[P],w,M,R),e.getNormal(C[P],H),p.vsub(w,m);let B=m.dot(H);if(H.scale(B,m),p.vsub(m,m),B=m.distanceTo(p),de.pointInTriangle(m,w,M,R)&&B<t.radius){if(d)return!0;let I=this.createContactEquation(a,c,t,e,l,h);m.vsub(p,I.ni),I.ni.normalize(),I.ni.scale(t.radius,I.ri),I.ri.vadd(n,I.ri),I.ri.vsub(a.position,I.ri),Xt.pointToWorldFrame(i,o,m,m),m.vsub(c.position,I.rj),Xt.vectorToWorldFrame(o,I.ni,I.ni),Xt.vectorToWorldFrame(o,I.ri,I.ri),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}}C.length=0}planeTrimesh(t,e,n,i,s,o,a,c,l,h,d){const u=new y,f=o0;f.set(0,0,1),s.vmult(f,f);for(let g=0;g<e.vertices.length/3;g++){e.getVertex(g,u);const v=new y;v.copy(u),Xt.pointToWorldFrame(i,o,v,u);const p=a0;if(u.vsub(n,p),f.dot(p)<=0){if(d)return!0;const _=this.createContactEquation(a,c,t,e,l,h);_.ni.copy(f);const x=c0;f.scale(p.dot(f),x),u.vsub(x,x),_.ri.copy(x),_.ri.vsub(a.position,_.ri),_.rj.copy(u),_.rj.vsub(c.position,_.rj),this.result.push(_),this.createFrictionEquationsFromContact(_,this.frictionResult)}}}}const $n=new y,Ti=new y,Ai=new y,n0=new y,i0=new y,s0=new oe,r0=new oe,o0=new y,a0=new y,c0=new y,l0=new y,h0=new y;new y;const u0=new y,d0=new y,f0=new y,p0=new y,m0=new y,g0=new y,v0=new y,_0=new y,x0=new y,y0=new y,M0=new y,S0=new Be,E0=[],Vs=new y,Rc=new y,w0=new y,b0=new y,T0=new y;function A0(r,t,e){let n=null;const i=r.length;for(let s=0;s!==i;s++){const o=r[s],a=w0;r[(s+1)%i].vsub(o,a);const c=b0;a.cross(t,c);const l=T0;e.vsub(o,l);const h=c.dot(l);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}const Gs=new y,C0=new y,R0=new y,P0=new y,L0=[new y,new y,new y,new y,new y,new y],I0=new y,N0=new y,D0=new y,U0=new y,F0=new y,O0=new y,B0=new y,z0=new y,H0=new y,k0=new y,V0=new y,G0=new y,W0=new y,q0=new y;new y;new y;const X0=new y,Y0=new y,j0=new y,K0=new y,Z0=new y,$0=new y,J0=new y,Q0=new y,t_=new y,e_=new y,Pc=new oe,n_=new y;new y;const i_=new y,Lc=new y,s_=new y,r_=new y,o_=new y,a_=[0],c_=new y,l_=new y;class Ic{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let s=0;for(;n>i[s];)s++;if(n!==i[s]){for(let o=i.length-1;o>=s;o--)i[o+1]=i[o];i[s]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,s=n.length,o=i.length;let a=0;for(let c=0;c<s;c++){let l=!1;const h=n[c];for(;h>i[a];)a++;l=h===i[a],l||Nc(t,h)}a=0;for(let c=0;c<o;c++){let l=!1;const h=i[c];for(;h>n[a];)a++;l=n[a]===h,l||Nc(e,h)}}}function Nc(r,t){r.push((t&4294901760)>>16,t&65535)}const to=(r,t)=>r<t?`${r}-${t}`:`${t}-${r}`;class h_{constructor(){this.data={keys:[]}}get(t,e){const n=to(t,e);return this.data[n]}set(t,e,n){const i=to(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=to(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class u_ extends wl{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new y,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new y,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new fv,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new Kv,this.constraints=[],this.narrowphase=new e0(this),this.collisionMatrix=new vc,this.collisionMatrixPrevious=new vc,this.bodyOverlapKeeper=new Ic,this.shapeOverlapKeeper=new Ic,this.contactmaterials=[],this.contactMaterialTable=new h_,this.defaultMaterial=new Un("default"),this.defaultContactMaterial=new Dn(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof nr?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=de.ALL,n.from=t,n.to=e,n.callback=i,eo.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=de.ANY,n.from=t,n.to=e,n.result=i,eo.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=de.CLOSEST,n.from=t,n.to=e,n.result=i,eo.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof lt&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let s=0;s!==n.length;s++)n[s].index=s;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let s=0;s<i.length;s++){const o=i[s];if(o.id===t)return o}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=pe.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=pe.now();let s=0;for(;this.accumulator>=t&&s<n&&(this.internalStep(t),this.accumulator-=t,s++,!(pe.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const o=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const c=this.bodies[a];c.previousPosition.lerp(c.position,o,c.interpolatedPosition),c.previousQuaternion.slerp(c.quaternion,o,c.interpolatedQuaternion),c.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=g_,i=v_,s=this.bodies.length,o=this.bodies,a=this.solver,c=this.gravity,l=this.doProfiling,h=this.profile,d=lt.DYNAMIC;let u=-1/0;const f=this.constraints,g=m_;c.length();const v=c.x,p=c.y,m=c.z;let _=0;for(l&&(u=pe.now()),_=0;_!==s;_++){const P=o[_];if(P.type===d){const U=P.force,B=P.mass;U.x+=B*v,U.y+=B*p,U.z+=B*m}}for(let P=0,U=this.subsystems.length;P!==U;P++)this.subsystems[P].update();l&&(u=pe.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(h.broadphase=pe.now()-u);let x=f.length;for(_=0;_!==x;_++){const P=f[_];if(!P.collideConnected)for(let U=n.length-1;U>=0;U-=1)(P.bodyA===n[U]&&P.bodyB===i[U]||P.bodyB===n[U]&&P.bodyA===i[U])&&(n.splice(U,1),i.splice(U,1))}this.collisionMatrixTick(),l&&(u=pe.now());const S=p_,C=e.length;for(_=0;_!==C;_++)S.push(e[_]);e.length=0;const T=this.frictionEquations.length;for(_=0;_!==T;_++)g.push(this.frictionEquations[_]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,S,this.frictionEquations,g),l&&(h.narrowphase=pe.now()-u),l&&(u=pe.now()),_=0;_<this.frictionEquations.length;_++)a.addEquation(this.frictionEquations[_]);const A=e.length;for(let P=0;P!==A;P++){const U=e[P],B=U.bi,I=U.bj,j=U.si,V=U.sj;let Z;if(B.material&&I.material?Z=this.getContactMaterial(B.material,I.material)||this.defaultContactMaterial:Z=this.defaultContactMaterial,Z.friction,B.material&&I.material&&(B.material.friction>=0&&I.material.friction>=0&&B.material.friction*I.material.friction,B.material.restitution>=0&&I.material.restitution>=0&&(U.restitution=B.material.restitution*I.material.restitution)),a.addEquation(U),B.allowSleep&&B.type===lt.DYNAMIC&&B.sleepState===lt.SLEEPING&&I.sleepState===lt.AWAKE&&I.type!==lt.STATIC){const ot=I.velocity.lengthSquared()+I.angularVelocity.lengthSquared(),at=I.sleepSpeedLimit**2;ot>=at*2&&(B.wakeUpAfterNarrowphase=!0)}if(I.allowSleep&&I.type===lt.DYNAMIC&&I.sleepState===lt.SLEEPING&&B.sleepState===lt.AWAKE&&B.type!==lt.STATIC){const ot=B.velocity.lengthSquared()+B.angularVelocity.lengthSquared(),at=B.sleepSpeedLimit**2;ot>=at*2&&(I.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(B,I,!0),this.collisionMatrixPrevious.get(B,I)||($i.body=I,$i.contact=U,B.dispatchEvent($i),$i.body=B,I.dispatchEvent($i)),this.bodyOverlapKeeper.set(B.id,I.id),this.shapeOverlapKeeper.set(j.id,V.id)}for(this.emitContactEvents(),l&&(h.makeContactConstraints=pe.now()-u,u=pe.now()),_=0;_!==s;_++){const P=o[_];P.wakeUpAfterNarrowphase&&(P.wakeUp(),P.wakeUpAfterNarrowphase=!1)}for(x=f.length,_=0;_!==x;_++){const P=f[_];P.update();for(let U=0,B=P.equations.length;U!==B;U++){const I=P.equations[U];a.addEquation(I)}}a.solve(t,this),l&&(h.solve=pe.now()-u),a.removeAllEquations();const N=Math.pow;for(_=0;_!==s;_++){const P=o[_];if(P.type&d){const U=N(1-P.linearDamping,t),B=P.velocity;B.scale(U,B);const I=P.angularVelocity;if(I){const j=N(1-P.angularDamping,t);I.scale(j,I)}}}this.dispatchEvent(f_),l&&(u=pe.now());const M=this.stepnumber%(this.quatNormalizeSkip+1)===0,R=this.quatNormalizeFast;for(_=0;_!==s;_++)o[_].integrate(t,M,R);this.clearForces(),this.broadphase.dirty=!0,l&&(h.integrate=pe.now()-u),this.stepnumber+=1,this.dispatchEvent(d_);let H=!0;if(this.allowSleep)for(H=!1,_=0;_!==s;_++){const P=o[_];P.sleepTick(this.time),P.sleepState!==lt.SLEEPING&&(H=!0)}this.hasActiveBodies=H}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(gn,vn),t){for(let s=0,o=gn.length;s<o;s+=2)Ji.bodyA=this.getBodyById(gn[s]),Ji.bodyB=this.getBodyById(gn[s+1]),this.dispatchEvent(Ji);Ji.bodyA=Ji.bodyB=null}if(e){for(let s=0,o=vn.length;s<o;s+=2)Qi.bodyA=this.getBodyById(vn[s]),Qi.bodyB=this.getBodyById(vn[s+1]),this.dispatchEvent(Qi);Qi.bodyA=Qi.bodyB=null}gn.length=vn.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(gn,vn),n){for(let s=0,o=gn.length;s<o;s+=2){const a=this.getShapeById(gn[s]),c=this.getShapeById(gn[s+1]);_n.shapeA=a,_n.shapeB=c,a&&(_n.bodyA=a.body),c&&(_n.bodyB=c.body),this.dispatchEvent(_n)}_n.bodyA=_n.bodyB=_n.shapeA=_n.shapeB=null}if(i){for(let s=0,o=vn.length;s<o;s+=2){const a=this.getShapeById(vn[s]),c=this.getShapeById(vn[s+1]);xn.shapeA=a,xn.shapeB=c,a&&(xn.bodyA=a.body),c&&(xn.bodyB=c.body),this.dispatchEvent(xn)}xn.bodyA=xn.bodyB=xn.shapeA=xn.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new Be;const eo=new de,pe=globalThis.performance||{};if(!pe.now){let r=Date.now();pe.timing&&pe.timing.navigationStart&&(r=pe.timing.navigationStart),pe.now=()=>Date.now()-r}new y;const d_={type:"postStep"},f_={type:"preStep"},$i={type:lt.COLLIDE_EVENT_NAME,body:null,contact:null},p_=[],m_=[],g_=[],v_=[],gn=[],vn=[],Ji={type:"beginContact",bodyA:null,bodyB:null},Qi={type:"endContact",bodyA:null,bodyB:null},_n={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},xn={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};function __(){const r=new u_({gravity:new y(0,-28,0)});r.broadphase=new Li(r),r.allowSleep=!1,r.defaultContactMaterial.friction=.08,r.defaultContactMaterial.restitution=0;const t=new Un("ground"),e=new Un("player"),n=new Un("slide"),i=new Un("bounce");return r.addContactMaterial(new Dn(t,e,{friction:.04,restitution:.02})),r.addContactMaterial(new Dn(n,e,{friction:.02,restitution:0})),r.addContactMaterial(new Dn(i,e,{friction:.3,restitution:1.6})),r.addContactMaterial(new Dn(e,e,{friction:.02,restitution:.15})),{world:r,groundMaterial:t,playerMaterial:e,slideMaterial:n,bounceMaterial:i}}function x_(r){const t=new Pi,e=new Ae({color:r}),n=new ri(.5,24,18),i=new te(n,e);i.scale.set(.92,1.2,.92),i.position.y=.62,i.castShadow=!0,t.add(i);const s=new Ae({color:16773375}),o=new ri(.34,18,14),a=new te(o,s);a.scale.set(1.02,.82,.5),a.position.set(0,.72,.38),t.add(a);const c=new So({color:1253432}),l=new ri(.065,10,10),h=new te(l,c);h.scale.set(.72,1.65,.55),h.position.set(-.13,.72,.63);const d=h.clone();d.position.x=.13,t.add(h,d);const u=new Ae({color:r}),f=new er(.12,.34,4,10),g=new te(f,u);g.position.set(-.5,.52,0),g.rotation.z=.28;const v=g.clone();v.position.x=.5,v.rotation.z=-.28,t.add(g,v);const p=new Ae({color:r}),m=new er(.15,.12,4,10),_=new te(m,p);_.rotation.x=Math.PI/2,_.scale.set(1.15,.75,1),_.position.set(-.2,.1,.08);const x=_.clone();return x.position.x=.2,t.add(_,x),t.traverse(S=>{S.isMesh&&(S.castShadow=!0,S.receiveShadow=!1)}),{group:t,body:i,mask:a,armL:g,armR:v,footL:_,footR:x}}const y_=9.8,Dc=130,M_=.38,Ws=13.8,Uc=12,Fc=.16,S_=.16,Oc=.58,ts=.43,es=.46,E_=.22,w_=.1,b_=.42,T_=.78,Bc=8.6,Ee={RUN:"run",DIVE:"dive",TUMBLE:"tumble",RECOVER:"recover"};class zc{constructor(t,e,n,i,s=!1){this.world=t,this.isLocal=s,this.color=n,this.state=Ee.RUN,this.grounded=!1,this.coyoteTimer=0,this.jumpBufferTimer=0,this.diving=!1,this.diveTimer=0,this.diveCooldown=0,this.tumbleTimer=0,this.recoveryTimer=0,this.eliminated=!1,this.qualified=!1,this.groundNormal=new y(0,1,0),this.contactNormals=[],this.impactSpeed=0,this.lastSafePos=new y(i.x,i.y,i.z),this.body=new lt({mass:5,material:e,linearDamping:.025,angularDamping:.9,fixedRotation:!0,position:new y(i.x,i.y,i.z)}),this.body.addShape(new uo(ts),new y(0,es,0)),this.body.addShape(new uo(ts),new y(0,-es,0)),this.body.updateMassProperties(),this.body.allowSleep=!1,t.addBody(this.body),this.body.addEventListener("collide",a=>{const c=a.contact;let l=c.ni;c.bi.id===this.body.id&&(l=l.scale(-1)),this.contactNormals.push(l.clone());const h=a.body&&a.body.velocity?this.body.velocity.vsub(a.body.velocity).length():this.body.velocity.length();this.impactSpeed=Math.max(this.impactSpeed,h),l.y>Oc&&(this.grounded=!0,this.groundNormal.copy(l),this.coyoteTimer=Fc)});const o=x_(n);this.mesh=o.group,this.parts=o,this.velocitySmooth=new F,this.facingAngle=0,this.bobTime=Math.random()*10,this.visualRoll=0}_groundProbe(){const t=this.body.position.clone();t.y+=.1;const e=this.body.position.clone();e.y-=ts+es+E_;const n=ts+es;let i=null;return this.world.raycastAll(t,e,{skipBackfaces:!0},o=>{!o.body||o.body.id===this.body.id||o.hitNormalWorld.y<=Oc||(!i||o.distance<i.distance)&&(i=o)}),i&&i.distance<=n+w_?(this.grounded=!0,this.groundNormal.copy(i.hitNormalWorld),this.coyoteTimer=Fc,this.body.velocity.y<0&&i.distance<=n+.035&&(this.body.velocity.y=Math.max(this.body.velocity.y,-.8)),this.lastSafePos.copy(this.body.position),!0):!1}_enterDive(t,e,n){this.state=Ee.DIVE,this.diving=!0,this.diveTimer=.42,this.diveCooldown=.68;const i=t?e:Math.sin(this.facingAngle),s=t?n:Math.cos(this.facingAngle);this.body.velocity.x=i*Math.max(Uc,Math.abs(this.body.velocity.x)),this.body.velocity.z=s*Math.max(Uc,Math.abs(this.body.velocity.z)),this.body.velocity.y=Math.max(this.body.velocity.y,this.grounded||this.coyoteTimer>0?3.6:1.5),this.grounded=!1,this.coyoteTimer=0}_enterTumble(t="impact"){this.state!==Ee.TUMBLE&&(this.state=Ee.TUMBLE,this.diving=!1,this.tumbleTimer=t==="dive"?b_:T_,this.recoveryTimer=0,this.body.linearDamping=.32)}_recoverToRun(){this.state=Ee.RUN,this.diving=!1,this.tumbleTimer=0,this.recoveryTimer=0,this.body.linearDamping=.025,this.visualRoll=0}applyInput(t,e,n){if(this.eliminated)return;this._groundProbe(),this.coyoteTimer=Math.max(0,this.coyoteTimer-n),this.jumpBufferTimer=t.jump?S_:Math.max(0,this.jumpBufferTimer-n),this.diveCooldown=Math.max(0,this.diveCooldown-n);const i=t.x||0,s=t.z||0,o=Math.abs(i)>.01||Math.abs(s)>.01;this.facingAngle=e;let a=0,c=0;if(o){const _=Math.sin(e),x=Math.cos(e);a=i*x+-s*_,c=-i*_+-s*x;const S=Math.hypot(a,c)||1;a/=S,c/=S}const l=this.grounded||this.coyoteTimer>0;if(this.state===Ee.TUMBLE){this.tumbleTimer-=n;const _=this.grounded?Math.max(0,1-n*3.2):1;this.body.velocity.x*=_,this.body.velocity.z*=_,this.tumbleTimer<=0&&l&&(this.state=Ee.RECOVER,this.recoveryTimer=.22),this._endFrameContactReset();return}if(this.state===Ee.RECOVER){this.recoveryTimer-=n;const _=Math.max(0,1-n*9);this.body.velocity.x*=_,this.body.velocity.z*=_,this.recoveryTimer<=0&&this._recoverToRun(),this._endFrameContactReset();return}const h=this.state===Ee.DIVE,d=l?Dc:Dc*M_,u=h?Ws*1.45:Ws,f=o?a*u:0,g=o?c*u:0,v=Math.min(1,d*n/Math.max(1,u));if(this.body.velocity.x+=(f-this.body.velocity.x)*v,this.body.velocity.z+=(g-this.body.velocity.z)*v,o&&l&&!h&&(this.body.velocity.x=ye.lerp(this.body.velocity.x,f,Math.min(1,n*18)),this.body.velocity.z=ye.lerp(this.body.velocity.z,g,Math.min(1,n*18))),!o&&l&&!h){const _=Math.max(0,1-n*10);this.body.velocity.x*=_,this.body.velocity.z*=_}this.jumpBufferTimer>0&&l&&!h&&(this.body.velocity.y=y_,this.jumpBufferTimer=0,this.coyoteTimer=0,this.grounded=!1),t.dive&&!h&&this.diveCooldown<=0&&this._enterDive(o,a,c),this.state===Ee.DIVE&&(this.diveTimer-=n,this.diveTimer<=0&&l&&this._enterTumble("dive"),this.diveTimer<=-.65&&this._enterTumble("dive"));const p=Math.hypot(this.body.velocity.x,this.body.velocity.z),m=this.state===Ee.DIVE?Ws*1.75:Ws;if(p>m){const _=m/p;this.body.velocity.x*=_,this.body.velocity.z*=_}this._endFrameContactReset()}_endFrameContactReset(){this.contactNormals.length=0,this.impactSpeed=0,this.grounded=!1}postPhysicsUpdate(t){this._groundProbe();for(const n of this.contactNormals)if(n.y<.25){const i=this.body.velocity.x*n.x+this.body.velocity.z*n.z;i<0&&(this.body.velocity.x-=n.x*i*.78,this.body.velocity.z-=n.z*i*.78)}const e=Math.hypot(this.body.velocity.x,this.body.velocity.z);this.state!==Ee.TUMBLE&&this.impactSpeed>Bc&&!this.grounded&&this._enterTumble("impact"),this.state!==Ee.TUMBLE&&this.impactSpeed>Bc+2&&e>5.5&&this._enterTumble("impact"),this.syncMesh(t)}syncMesh(t){const e=this.body.position;this.mesh.position.set(e.x,e.y-ts-es+.05,e.z);let n=this.facingAngle;const i=this.mesh.rotation.y;let s=n-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;this.mesh.rotation.y=i+s*Math.min(1,t*10);const o=this.body.velocity.y,a=Math.hypot(this.body.velocity.x,this.body.velocity.z);if(this.state===Ee.TUMBLE){this.visualRoll+=t*(7+a*1.2),this.mesh.rotation.x=ye.lerp(this.mesh.rotation.x,Math.PI*.62+Math.sin(this.visualRoll)*.3,t*10),this.mesh.rotation.z=ye.lerp(this.mesh.rotation.z,Math.sin(this.visualRoll*.75)*.55,t*10),this.mesh.scale.set(1.16,.72,1.24),this.parts.armL.rotation.x=1.15,this.parts.armR.rotation.x=-1.15;return}if(this.state===Ee.RECOVER){this.mesh.rotation.x=ye.lerp(this.mesh.rotation.x,.25,t*8),this.mesh.rotation.z=ye.lerp(this.mesh.rotation.z,0,t*8),this.mesh.scale.set(1.06,.9,1.12);return}if(this.mesh.rotation.z=ye.lerp(this.mesh.rotation.z,0,t*12),this.state===Ee.DIVE)this.mesh.rotation.x=ye.lerp(this.mesh.rotation.x,Math.PI*.42,t*12),this.mesh.scale.set(1.08,.82,1.18);else if(!this.grounded&&this.coyoteTimer<=0){this.mesh.rotation.x=ye.lerp(this.mesh.rotation.x,ye.clamp(-o*.03,-.3,.5),t*8);const c=ye.clamp(1-o*.015,.85,1.25);this.mesh.scale.set(2-c,c,2-c)}else{this.mesh.rotation.x=ye.lerp(this.mesh.rotation.x,0,t*10),this.bobTime+=t*(1+a*.6);const c=a>.5?Math.abs(Math.sin(this.bobTime*6))*.08:0,l=a>.5?1-c*.5:1;this.mesh.scale.set(ye.lerp(this.mesh.scale.x,2-l,t*12),ye.lerp(this.mesh.scale.y,l,t*12),ye.lerp(this.mesh.scale.z,2-l,t*12)),this.mesh.position.y+=c;const h=a>.5?Math.sin(this.bobTime*6)*.5:0;this.parts.armL.rotation.x=h,this.parts.armR.rotation.x=-h}}respawn(t){this.body.position.set(t.x,t.y,t.z),this.body.velocity.set(0,0,0),this.body.angularVelocity.set(0,0,0),this.state=Ee.RUN,this.diving=!1,this.diveTimer=0,this.diveCooldown=0,this.tumbleTimer=0,this.recoveryTimer=0,this.eliminated=!1,this.grounded=!1,this.coyoteTimer=0,this.jumpBufferTimer=0,this.body.linearDamping=.025,this.lastSafePos.copy(this.body.position)}eliminate(){this.eliminated=!0,this.mesh.visible=!1,this.body.position.set(0,-100,0),this.body.velocity.set(0,0,0)}}class A_{constructor(t){this.camera=t,this.yaw=0,this.pitch=.28,this.distance=7.5,this.height=2.4,this.targetPos=new F,this.currentPos=new F,this.initialized=!1}handleDrag(t,e){this.yaw-=t*.0042,this.pitch=ye.clamp(this.pitch-e*.0025,-.08,.72)}update(t,e){const n=t.position,i=Math.sin(this.yaw),s=Math.cos(this.yaw),o=-i,a=-s,c=this.distance*Math.cos(this.pitch),l=this.height+this.distance*Math.sin(this.pitch);this.targetPos.set(n.x+o*c,n.y+l,n.z+a*c),this.initialized?this.currentPos.lerp(this.targetPos,Math.min(1,e*14)):(this.currentPos.copy(this.targetPos),this.initialized=!0),this.camera.position.copy(this.currentPos),this.camera.lookAt(n.x+i*1.8,n.y+1.15,n.z+s*1.8)}}class C_{constructor(t){this.camera=t,this.keys={},this.jumpPressed=!1,this.divePressed=!1,this.dragging=!1,this.lastX=0,this.lastY=0,window.addEventListener("keydown",n=>{["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","ShiftLeft","ShiftRight"].includes(n.code)&&n.preventDefault(),this.keys[n.code]=!0,n.code==="Space"&&(this.jumpPressed=!0),(n.code==="ShiftLeft"||n.code==="ShiftRight")&&(this.divePressed=!0)}),window.addEventListener("keyup",n=>{this.keys[n.code]=!1});const e=document.getElementById("scene");e.addEventListener("pointerdown",n=>{e.requestPointerLock&&document.pointerLockElement!==e&&e.requestPointerLock(),this.dragging=!0,this.lastX=n.clientX,this.lastY=n.clientY}),window.addEventListener("pointerup",()=>{this.dragging=!1}),window.addEventListener("mousemove",n=>{document.pointerLockElement===e&&this.camera.handleDrag(n.movementX||0,n.movementY||0)}),window.addEventListener("pointermove",n=>{if(this.dragging&&document.pointerLockElement!==e){const i=n.clientX-this.lastX,s=n.clientY-this.lastY;this.lastX=n.clientX,this.lastY=n.clientY,this.camera.handleDrag(i,s)}}),this.touchMoveX=0,this.touchMoveZ=0,this._setupJoystick(),document.getElementById("jump-btn").addEventListener("touchstart",n=>{n.preventDefault(),this.jumpPressed=!0}),document.getElementById("dive-btn").addEventListener("touchstart",n=>{n.preventDefault(),this.divePressed=!0}),this._isMobile()&&document.getElementById("mobile-controls").classList.remove("hidden")}_isMobile(){return/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)}_setupJoystick(){const t=document.getElementById("joystick-zone");let e=!1,n=0,i=0;const s=document.createElement("div");s.style.position="absolute",s.style.width="54px",s.style.height="54px",s.style.borderRadius="50%",s.style.background="rgba(255,255,255,0.7)",s.style.left="38px",s.style.top="38px",s.style.pointerEvents="none",t.style.position="absolute",t.appendChild(s);const o=()=>{e=!1,this.touchMoveX=0,this.touchMoveZ=0,s.style.left="38px",s.style.top="38px"};t.addEventListener("touchstart",a=>{a.preventDefault(),a.touches[0];const c=t.getBoundingClientRect();n=c.left+c.width/2,i=c.top+c.height/2,e=!0}),t.addEventListener("touchmove",a=>{if(a.preventDefault(),!e)return;const c=a.touches[0];let l=c.clientX-n,h=c.clientY-i;const d=45,u=Math.sqrt(l*l+h*h);u>d&&(l=l/u*d,h=h/u*d),s.style.left=`${38+l}px`,s.style.top=`${38+h}px`,this.touchMoveX=l/d,this.touchMoveZ=h/d}),t.addEventListener("touchend",a=>{a.preventDefault(),o()})}getMoveInput(){let t=0,e=0;if((this.keys.KeyW||this.keys.ArrowUp)&&(e-=1),(this.keys.KeyS||this.keys.ArrowDown)&&(e+=1),(this.keys.KeyA||this.keys.ArrowLeft)&&(t-=1),(this.keys.KeyD||this.keys.ArrowRight)&&(t+=1),this.touchMoveX||this.touchMoveZ)t=this.touchMoveX,e=this.touchMoveZ;else{const s=Math.sqrt(t*t+e*e);s>1&&(t/=s,e/=s)}const n=this.jumpPressed,i=this.divePressed;return this.jumpPressed=!1,this.divePressed=!1,{x:t,z:e,jump:n,dive:i}}}function R_(){const r=new Eg;r.background=new Vt(8377599),r.fog=new bo(10477823,60,160);const t=document.getElementById("scene"),e=new Sg({canvas:t,antialias:!0});e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.setSize(window.innerWidth,window.innerHeight),e.shadowMap.enabled=!0,e.shadowMap.type=Gc,e.outputColorSpace=je;const n=new ke(62,window.innerWidth/window.innerHeight,.1,300),i=new Bg(16777215,4877194,.9);r.add(i);const s=new dc(16774368,1.6);s.position.set(30,45,20),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.left=-60,s.shadow.camera.right=60,s.shadow.camera.top=60,s.shadow.camera.bottom=-60,s.shadow.camera.near=1,s.shadow.camera.far=200,s.shadow.bias=-.001,r.add(s);const o=new dc(12574975,.4);return o.position.set(-20,20,-20),r.add(o),window.addEventListener("resize",()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight)}),{scene:r,renderer:e,camera:n}}function P_(r){const t=new Ae({color:16777215});for(let e=0;e<14;e++){const n=new Pi,i=3+Math.floor(Math.random()*3);for(let a=0;a<i;a++){const c=new ri(2+Math.random()*1.5,8,8),l=new te(c,t);l.position.set((Math.random()-.5)*4,(Math.random()-.5)*1,(Math.random()-.5)*4),n.add(l)}const s=Math.random()*Math.PI*2,o=80+Math.random()*60;n.position.set(Math.cos(s)*o,20+Math.random()*25,Math.sin(s)*o),r.add(n)}}class L_{constructor(t,e,n){this.scene=t,this.world=e,this.materials=n,this.dynamicBodies=[],this.disposables=[]}box(t,e,n,i,s={}){const{color:o=16777215,mass:a=0,material:c=this.materials.groundMaterial,rotation:l=null,castShadow:h=!0,receiveShadow:d=!0,visible:u=!0,emissive:f=null,grid:g=!1}=s,v=new an(t,e,n),p={color:o};f&&(p.emissive=f,p.emissiveIntensity=.4);const m=new Ae(p),_=new te(v,m);if(_.position.copy(i),_.visible=u,l&&_.rotation.copy(l),_.castShadow=h,_.receiveShadow=d,this.scene.add(_),g){const C=new Ae({color:0,transparent:!0,opacity:.08}),T=Math.floor(n/3);for(let A=0;A<T;A++){const N=new an(t+.02,.05,.25),w=new te(N,C);w.position.set(i.x,i.y+e/2+.03,i.z-n/2+A*3+1.5),this.scene.add(w)}}const x=new Vi(new y(t/2,e/2,n/2)),S=new lt({mass:a,shape:x,material:c});return S.position.set(i.x,i.y,i.z),l&&S.quaternion.setFromEuler(l.x,l.y,l.z),this.world.addBody(S),{mesh:_,body:S}}cylinder(t,e,n,i,s={}){const{color:o=16777215,mass:a=0,material:c=this.materials.groundMaterial,radialSegments:l=16,rotation:h=null}=s,d=new ai(t,e,n,l),u=new te(d,new Ae({color:o}));u.position.copy(i),h&&u.rotation.copy(h),u.castShadow=!0,u.receiveShadow=!0,this.scene.add(u);const f=new fo(t,e,n,l),g=new lt({mass:a,shape:f,material:c});return g.position.set(i.x,i.y,i.z),h&&g.quaternion.setFromEuler(h.x,h.y,h.z),this.world.addBody(g),{mesh:u,body:g}}hexPrism(t,e,n,i={}){const{color:s=16777215,mass:o=0,material:a=this.materials.groundMaterial}=i,c=new ai(t,t,e,6);c.rotateY(Math.PI/6);const l=new te(c,new Ae({color:s}));l.position.copy(n),l.castShadow=!0,l.receiveShadow=!0,this.scene.add(l);const h=new fo(t,t,e,6),d=new oe;d.setFromAxisAngle(new y(0,1,0),Math.PI/6);const u=new lt({mass:o,shape:h,material:a});return u.position.set(n.x,n.y,n.z),u.quaternion.copy(d),this.world.addBody(u),{mesh:l,body:u}}killzoneAt(t){return t}}class hr{constructor(t,e,n){this.scene=t,this.world=e,this.materials=n,this.builder=new L_(t,e,n),this.spawnPoints=[],this.killY=-20,this.name="LEVEL",this.timeLimit=90,this.decor=[]}build(){}update(t,e){}getSpawnPoint(t){return this.spawnPoints[t%this.spawnPoints.length]}checkFinish(t){return!1}dispose(){this.builder.dynamicBodies.forEach(({body:t})=>this.world.removeBody(t))}}class I_ extends hr{constructor(t,e,n){super(t,e,n),this.name="DOOR DASH",this.timeLimit=75,this.killY=-15,this.gateWalls=[],this.finishZ=-95}build(){const t=this.builder,e=16,n=110;t.box(e,1,n,new F(0,-.5,-n/2+5),{color:15911033,grid:!0});for(const s of[-1,1])t.box(1,4,n,new F(s*(e/2+.5),1.5,-n/2+5),{color:15242844});t.box(e,1,10,new F(0,-.5,10),{color:16765503});const i=[-15,-45,-75];this.gateWalls=[],i.forEach((s,o)=>{const c=e/5,l=new Set;for(;l.size<2;)l.add(Math.floor(Math.random()*5));const h={z:s,doors:[]};for(let d=0;d<5;d++){const u=-e/2+c*d+c/2,f=l.has(d),g=f?16736162:9203711,{mesh:v,body:p}=t.box(c-.3,3.6,.4,new F(u,1.8,s),{color:g,mass:0,material:this.materials.groundMaterial}),m=new an(c-.5,.4,.5),_=new te(m,new Ae({color:16777215}));_.position.set(u,3,s),this.scene.add(_),h.doors.push({mesh:v,body:p,isReal:f,broken:!1,stripe:_,x:u,z:s})}this.gateWalls.push(h)}),t.box(e,1,14,new F(0,-.5,this.finishZ-7),{color:4054167}),t.cylinder(.3,.3,6,new F(-e/2,2.5,this.finishZ),{color:16777215,mass:0}),t.cylinder(.3,.3,6,new F(e/2,2.5,this.finishZ),{color:16777215,mass:0}),this.spawnPoints=[];for(let s=0;s<20;s++){const o=s%5,a=Math.floor(s/5);this.spawnPoints.push(new F(-6+o*3,1.5,14+a*2))}}tryBreakDoorsNear(t){for(let e=0;e<this.gateWalls.length;e++){const n=this.gateWalls[e];for(let i=0;i<n.doors.length;i++){const s=n.doors[i];if(s.broken)continue;const o=t.x-s.x,a=t.z-s.z;if(Math.abs(a)<1.2&&Math.abs(o)<1.3&&s.isReal)return this.breakDoor(s),{gateIdx:e,doorIdx:i}}}return null}breakDoor(t){t.broken=!0,this.world.removeBody(t.body),t.mesh.visible=!1,t.stripe.visible=!1}update(t,e){for(const n of this.gateWalls)for(const i of n.doors)i.broken||(i.stripe.position.y=3+Math.sin(e*2+i.x)*.05)}checkFinish(t){return t.z<this.finishZ+4}}class N_ extends hr{constructor(t,e,n){super(t,e,n),this.name="SPIN CYCLE",this.timeLimit=90,this.killY=-15,this.spinners=[],this.finishZ=-100}build(){const t=this.builder,e=10,n=120;t.box(e,1,n,new F(0,-.5,-n/2+5),{color:7259903,grid:!0}),t.box(e,1,10,new F(0,-.5,10),{color:16765503}),[-15,-30,-45,-60,-75].forEach((u,f)=>{const g=1.6+f*.35,v=f%2===0?1:-1,p=7.5,m=new an(p*2,1.4,1.1),_=new Ae({color:16736162}),x=new te(m,_);x.position.set(0,1.2,u),x.castShadow=!0,this.scene.add(x);const S=new ai(.25,.25,3,10),C=new te(S,new Ae({color:16777215}));C.position.set(0,.5,u),this.scene.add(C);const T=new Vi(new y(p,.7,.55)),A=new lt({mass:0,shape:T,material:this.materials.groundMaterial});A.position.set(0,1.2,u),A.type=lt.KINEMATIC,this.world.addBody(A),this.spinners.push({mesh:x,body:A,angle:Math.random()*Math.PI*2,speed:g,dir:v})});const s=-90,o=new an(e-1,.6,12),a=new te(o,new Ae({color:4054167}));a.position.set(0,.8,s),a.castShadow=!0,this.scene.add(a);const c=new Vi(new y((e-1)/2,.3,6)),l=new lt({mass:40,shape:c,material:this.materials.groundMaterial,angularDamping:.6,linearDamping:.8});l.position.set(0,.8,s);const h=new lt({mass:0});h.position.set(0,.8,s),this.world.addBody(l),this.world.addBody(h);const d=new Gv(h,l,{pivotA:new y(0,0,0),pivotB:new y(0,0,0),axisA:new y(1,0,0),axisB:new y(1,0,0)});this.world.addConstraint(d),this.seesaw={mesh:a,body:l},t.box(e,1,12,new F(0,-.5,this.finishZ-6),{color:4054167}),this.spawnPoints=[];for(let u=0;u<20;u++){const f=u%5,g=Math.floor(u/5);this.spawnPoints.push(new F(-4+f*2,1.5,14+g*2))}}update(t,e){for(const n of this.spinners){n.angle+=n.speed*n.dir*t,n.mesh.rotation.y=n.angle;const i=new oe;i.setFromAxisAngle(new y(0,1,0),n.angle),n.body.quaternion.copy(i)}this.seesaw&&(this.seesaw.mesh.position.copy(this.seesaw.body.position),this.seesaw.mesh.quaternion.copy(this.seesaw.body.quaternion))}checkFinish(t){return t.z<this.finishZ+4}}class D_ extends hr{constructor(t,e,n){super(t,e,n),this.name="FRUIT FRENZY",this.timeLimit=90,this.killY=-10,this.platformRadius=22,this.shrinkStart=20,this.minRadius=6,this.elapsed=0,this.goo=null}build(){this.builder;const t=new ai(this.platformRadius,this.platformRadius,1,48);this.platformMesh=new te(t,new Ae({color:16765503})),this.platformMesh.position.set(0,-.5,0),this.platformMesh.receiveShadow=!0,this.scene.add(this.platformMesh);const e=new fo(this.platformRadius,this.platformRadius,1,48);this.platformBody=new lt({mass:0,shape:e,material:this.materials.groundMaterial}),this.platformBody.position.set(0,-.5,0),this.world.addBody(this.platformBody);const n=new ai(this.platformRadius+15,this.platformRadius+15,2,48),i=new Ae({color:9203711,transparent:!0,opacity:.85});this.goo=new te(n,i),this.goo.position.set(0,-8,0),this.scene.add(this.goo),this.balls=[];const s=[16736162,4054167,7259903];for(let o=0;o<10;o++){const a=1.1+Math.random()*.5,c=Math.random()*Math.PI*2,l=Math.random()*(this.platformRadius-3),h=new F(Math.cos(c)*l,3+Math.random()*3,Math.sin(c)*l),d=new ri(a,16,16),u=new te(d,new Ae({color:s[o%s.length]}));u.castShadow=!0,this.scene.add(u);const f=new uo(a),g=new lt({mass:3,shape:f,material:this.materials.bounceMaterial,linearDamping:.3});g.position.set(h.x,h.y,h.z),this.world.addBody(g),this.balls.push({mesh:u,body:g})}this.spawnPoints=[];for(let o=0;o<20;o++){const a=o/20*Math.PI*2,c=this.platformRadius-4;this.spawnPoints.push(new F(Math.cos(a)*c,2,Math.sin(a)*c))}}update(t,e){this.elapsed+=t;for(const i of this.balls)i.mesh.position.copy(i.body.position),i.mesh.quaternion.copy(i.body.quaternion);if(this.elapsed>this.shrinkStart){const i=Math.min(1,(this.elapsed-this.shrinkStart)/60),s=ye.lerp(this.platformRadius,this.minRadius,i);this.platformMesh.scale.set(s/this.platformRadius,1,s/this.platformRadius),this._currentRadius=s}else this._currentRadius=this.platformRadius;const n=ye.lerp(-8,-1.5,Math.min(1,this.elapsed/80));this.goo.position.y=n,this._gooY=n}isOutOfBounds(t){return Math.sqrt(t.x*t.x+t.z*t.z)>(this._currentRadius||this.platformRadius)+1.5&&t.y<1||t.y<(this._gooY||-8)-2}}class po extends hr{constructor(t,e,n){super(t,e,n),this.name="HEX HAVOC",this.timeLimit=120,this.killY=-12,this.tiles=[],this.dropTimer=0,this.dropInterval=2.2,this.elapsed=0}build(){const t=this.builder,e=1.65,n=5,i=0,s=[16736162,16765503,4054167,9203711,7259903],o=(a,c)=>{const l=e*1.5*a,h=e*Math.sqrt(3)*(c+a/2),d=s[Math.floor(Math.random()*s.length)],{mesh:u,body:f}=t.hexPrism(e*.97,.6,new F(l,i,h),{color:d,mass:0});this.tiles.push({mesh:u,body:f,x:l,z:h,dropped:!1,dropTime:0,baseY:i,color:d,respawnAt:null})};for(let a=-n;a<=n;a++)for(let c=-n;c<=n;c++)Math.abs(a+c)<=n&&o(a,c);if(this.spawnPoints=this.tiles.filter(a=>Math.abs(a.x)<5&&Math.abs(a.z)<5).slice(0,20).map(a=>new F(a.x,2,a.z)),this.spawnPoints.length<20)for(;this.spawnPoints.length<20;)this.spawnPoints.push(new F(0,2,0))}dropRandomTiles(t){const e=this.tiles.filter(n=>!n.dropped);for(let n=0;n<t&&e.length>0;n++){const i=Math.floor(Math.random()*e.length),s=e.splice(i,1)[0];this.dropTile(s)}}dropTile(t){t.dropped=!0,t.dropTime=0,this.world.removeBody(t.body);const e=new lt({mass:8,shape:t.body.shapes[0],material:this.materials.groundMaterial,position:t.body.position.clone()});e.quaternion.copy(t.body.quaternion),e.angularVelocity.set((Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2),this.world.addBody(e),t.body=e,t.fadeTimer=3}update(t,e){this.elapsed+=t,this.dropTimer+=t;const n=Math.min(1,this.elapsed/90),i=this.dropInterval*(1-n*.6);if(this.dropTimer>i){this.dropTimer=0;const s=1+Math.floor(n*3);this.dropRandomTiles(s)}for(const s of this.tiles)s.dropped&&(s.mesh.position.copy(s.body.position),s.mesh.quaternion.copy(s.body.quaternion),s.fadeTimer!==void 0&&(s.fadeTimer-=t,s.fadeTimer<=0&&(s.mesh.visible=!1)))}checkFinish(){return!1}}const ns=[I_,N_,D_,po],U_=1/20,F_=1/30;class O_{constructor(t){this.network=t,this.isHost=t.isHost;const{scene:e,renderer:n,camera:i}=R_();this.scene=e,this.renderer=n,this.camera=i,P_(e);const{world:s,groundMaterial:o,playerMaterial:a,slideMaterial:c,bounceMaterial:l}=__();this.world=s,this.materials={groundMaterial:o,playerMaterial:a,slideMaterial:c,bounceMaterial:l},this.chaseCamera=new A_(i),this.input=new C_(this.chaseCamera),this.characters=new Map,this.localId=t.peerId,this.remoteInputs=new Map,this.currentLevelIndex=0,this.level=null,this.matchOrder=[],this.roundActive=!1,this.roundTimer=0,this.countdownTimer=0,this.countdownLastValue=null,this.countdownHidePending=!1,this.controlsLocked=!1,this.qualifiedThisRound=new Set,this.eliminatedThisRound=new Set,this.clock=new kg,this.netAccum=0,this.lastFinished=!1,this.pendingNetJump=!1,this.pendingNetDive=!1,this.onRoundEnd=null,this.onMatchEnd=null,this.onStatusUpdate=null,this.onCountdownUpdate=null,this.sound=null,this._bindNetwork()}_bindNetwork(){const t=this.network;t.onInputReceived=(e,n)=>{this.isHost&&this.remoteInputs.set(n,e)},t.onStateReceived=e=>{this.isHost||this._applyHostState(e)},t.onEventReceived=e=>{if(e.type==="roundStart"&&this._clientStartRound(e),e.type==="roundEnd"&&this._clientRoundEnd(e),e.type==="matchEnd"&&this.onMatchEnd&&this.onMatchEnd(e),e.type==="doorBreak"&&this.level&&this.level.breakDoor){const n=this.level.gateWalls[e.gateIdx];if(n){const i=n.doors[e.doorIdx];i&&!i.broken&&this.level.breakDoor(i)}}}}addLocalPlayer(t,e){const n=new F(0,5,0),i=new zc(this.world,this.materials.playerMaterial,e,n,!0);return i.name=t,this.characters.set(this.localId,i),this.scene.add(i.mesh),this.localColor=e,this.localName=t,i}getLocalCharacter(){return this.characters.get(this.localId)}addRemotePlayer(t,e,n){if(this.characters.has(t))return this.characters.get(t);const i=new F(0,5,0),s=new zc(this.world,this.materials.playerMaterial,n,i,!1);return s.name=e,this.characters.set(t,s),this.scene.add(s.mesh),s}removePlayer(t){const e=this.characters.get(t);e&&(this.scene.add(),this.scene.remove(e.mesh),this.world.removeBody(e.body),this.characters.delete(t))}hostStartMatch(t){this.roster=t,this.matchOrder=this._pickLevels(),this.currentLevelIndex=-1,setTimeout(()=>this._hostAdvanceLevel(),500)}_pickLevels(){const t=ns.filter(e=>e!==po);for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return[...t,po]}_hostAdvanceLevel(){if(this.currentLevelIndex++,this.currentLevelIndex>=this.matchOrder.length){this.network.sendEvent({type:"matchEnd",winnerId:this._lastWinnerId}),this.onMatchEnd&&this.onMatchEnd({winnerId:this._lastWinnerId});return}const t=this.matchOrder[this.currentLevelIndex];this._loadLevel(t);const e=this.roster.filter(n=>!this.eliminatedSet||!this.eliminatedSet.has(n.id)).map(n=>n.id);this.network.sendEvent({type:"roundStart",levelName:this.level.name,levelIdx:this.currentLevelIndex,timeLimit:this.level.timeLimit,activeIds:e}),this._startRoundLocal(this.level.name,this.level.timeLimit,e)}_loadLevel(t){this.level&&this._clearLevel(),this.level=new t(this.scene,this.world,this.materials),this.level.build()}_clearLevel(){const t=new Set;this.characters.forEach(s=>t.add(s.mesh));const e=[];this.scene.traverse(s=>{s.isMesh&&!t.has(s)&&s.parent===this.scene&&e.push(s)}),e.forEach(s=>this.scene.remove(s));const n=new Set;this.characters.forEach(s=>n.add(s.body)),this.world.bodies.filter(s=>!n.has(s)).forEach(s=>this.world.removeBody(s)),this.world.constraints.slice().forEach(s=>this.world.removeConstraint(s)),this.level&&this.level.dispose()}_startRoundLocal(t,e,n){this.roundActive=!0,this.roundTimer=e,this.countdownTimer=3.15,this.countdownLastValue=null,this.countdownHidePending=!1,this.controlsLocked=!0,this.qualifiedThisRound=new Set,this.finishedOrder=[],this.activeIds=new Set(n);let i=0;this.characters.forEach((s,o)=>{if(this.activeIds.has(o)){const a=this.level.getSpawnPoint(i++);s.respawn(a),s.eliminated=!1,s.mesh.visible=!0}else s.eliminate()}),this.onStatusUpdate&&this.onStatusUpdate({levelName:t,activeCount:this.activeIds.size}),this._emitCountdown()}_clientStartRound(t){this.matchOrder&&this.matchOrder[t.levelIdx]?this.matchOrder[t.levelIdx]:ns[t.levelIdx%ns.length];const e=ns.find(n=>new n(this.scene,this.world,this.materials).name===t.levelName)||ns[0];this._loadLevel(e),this._startRoundLocal(t.levelName,t.timeLimit,t.activeIds)}_clientRoundEnd(t){this.roundActive=!1,this.onRoundEnd&&this.onRoundEnd(t)}_hostCheckRoundProgress(t){if(!this.roundActive||this.countdownTimer>0)return;this.roundTimer-=t,this.characters.forEach((o,a)=>{if(!this.activeIds.has(a)||o.eliminated)return;const c=o.body.position;let l=c.y<this.level.killY;if(this.level.isOutOfBounds&&(l=l||this.level.isOutOfBounds(c)),l){o.eliminate(),this.eliminatedThisRound.add(a);return}if(this.level.checkFinish&&this.level.checkFinish(c)&&!this.qualifiedThisRound.has(a)&&(this.qualifiedThisRound.add(a),this.finishedOrder.push(a)),this.level.tryBreakDoorsNear){const h=this.level.tryBreakDoorsNear(c);h&&this.network.sendEvent({type:"doorBreak",...h})}o.eliminated});const e=typeof this.level.checkFinish=="function"&&this.level.name!=="HEX HAVOC"&&this.level.name!=="FRUIT FRENZY",n=this.level.name==="HEX HAVOC"||this.level.name==="FRUIT FRENZY";let i=!1,s=[];if(this.roundTimer<=0)i=!0,e?s=this.finishedOrder.slice(0,Math.max(1,Math.ceil(this.activeIds.size*.6))):s=Array.from(this.activeIds).filter(o=>{const a=this.characters.get(o);return a&&!a.eliminated});else if(e&&this.finishedOrder.length>=Math.ceil(this.activeIds.size*.6))i=!0,s=this.finishedOrder.slice();else if(n){const o=Array.from(this.activeIds).filter(c=>{const l=this.characters.get(c);return l&&!l.eliminated}),a=this.currentLevelIndex===this.matchOrder.length-1?1:Math.max(1,Math.ceil(this.activeIds.size*.5));o.length<=a&&(i=!0,s=o)}if(i){this.roundActive=!1,s.length===0&&(s=Array.from(this.activeIds).slice(0,1)),this.eliminatedSet=this.eliminatedSet||new Set,Array.from(this.activeIds).forEach(c=>{s.includes(c)||this.eliminatedSet.add(c)}),this._lastWinnerId=s[0];const o={type:"roundEnd",qualifiedIds:s,levelName:this.level.name};this.network.sendEvent(o),this.onRoundEnd&&this.onRoundEnd(o);const a=this.currentLevelIndex>=this.matchOrder.length-1||s.length<=1;setTimeout(()=>{if(a||s.length<=1){const c=s[0];this.network.sendEvent({type:"matchEnd",winnerId:c}),this.onMatchEnd&&this.onMatchEnd({winnerId:c})}else this._hostAdvanceLevel()},4e3)}}_emitCountdown(){if(!this.onCountdownUpdate||!this.level||this.countdownTimer<=0)return;const t=Math.max(1,Math.ceil(this.countdownTimer)),e=String(t);this.countdownLastValue!==t&&(this.countdownLastValue=t,this.onCountdownUpdate({value:t,label:e,levelName:this.level.name}))}_emitGoAndHideCountdown(){!this.onCountdownUpdate||!this.level||this.countdownHidePending||(this.countdownHidePending=!0,this.onCountdownUpdate({value:0,label:"GO!",levelName:this.level.name}),setTimeout(()=>{this.onCountdownUpdate&&this.onCountdownUpdate({value:null,label:null,levelName:this.level?this.level.name:"ROUND"})},650))}update(){const t=Math.min(this.clock.getDelta(),.05),e=this.clock.elapsedTime;if(this.countdownTimer>0){const i=this.countdownTimer;this.countdownTimer=Math.max(0,this.countdownTimer-t),this.controlsLocked=this.countdownTimer>0,this.countdownTimer>0&&this._emitCountdown(),i>0&&this.countdownTimer===0&&this._emitGoAndHideCountdown()}const n=this.characters.get(this.localId);if(n){const i=this.input.getMoveInput(),s=this.controlsLocked?{x:0,z:0,jump:!1,dive:!1}:i;this.controlsLocked||(i.jump&&this.sound&&this.sound.jump(),i.dive&&this.sound&&this.sound.dive()),n.applyInput(s,this.chaseCamera.yaw,t),this.pendingNetJump=this.pendingNetJump||s.jump,this.pendingNetDive=this.pendingNetDive||s.dive,this.netAccum+=t,!this.isHost&&this.netAccum>=F_&&(this.netAccum=0,this.network.sendInput({x:s.x,z:s.z,jump:this.pendingNetJump,dive:this.pendingNetDive,yaw:this.chaseCamera.yaw}),this.pendingNetJump=!1,this.pendingNetDive=!1)}if(this.isHost&&this.remoteInputs.forEach((i,s)=>{const o=this.characters.get(s);if(!o)return;const a=this.controlsLocked?{x:0,z:0,jump:!1,dive:!1,yaw:i.yaw||0}:i;o.applyInput(a,a.yaw||0,t)}),this.world.step(1/60,t,3),this.characters.forEach(i=>i.postPhysicsUpdate(t)),this.level&&this.level.update&&this.level.update(t,e),this.isHost&&(this._hostCheckRoundProgress(t),this.netAccum2=(this.netAccum2||0)+t,this.netAccum2>=U_)){this.netAccum2=0;const i={};this.characters.forEach((s,o)=>{i[o]={p:[s.body.position.x,s.body.position.y,s.body.position.z],v:[s.body.velocity.x,s.body.velocity.y,s.body.velocity.z],f:s.facingAngle,e:s.eliminated,d:s.diving}}),this.network.sendState({snap:i,t:this.roundTimer})}n&&this.chaseCamera.update(n.mesh,t),this.renderer.render(this.scene,this.camera)}_applyHostState(t){this.roundTimer=t.t,Object.entries(t.snap).forEach(([e,n])=>{if(e===this.localId)return;const i=this.characters.get(e);i&&(i.body.position.set(...n.p),i.body.velocity.set(...n.v),i.facingAngle=n.f,i.diving=n.d,n.e&&!i.eliminated&&i.eliminate(),!n.e&&i.eliminated&&(i.eliminated=!1,i.mesh.visible=!0))})}dispose(){this.renderer.dispose()}}class B_{constructor(){this.ctx=null,this.enabled=!0}unlock(){if(this.enabled){if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;if(!t){this.enabled=!1;return}this.ctx=new t}this.ctx.state==="suspended"&&this.ctx.resume()}}tone(t=440,e=.12,n="sine",i=.08,s=null){if(!this.enabled||(this.unlock(),!this.ctx))return;const o=this.ctx.currentTime,a=this.ctx.createOscillator(),c=this.ctx.createGain();a.type=n,a.frequency.setValueAtTime(t,o),s&&a.frequency.exponentialRampToValueAtTime(Math.max(20,s),o+e),c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(i,o+.015),c.gain.exponentialRampToValueAtTime(1e-4,o+e),a.connect(c).connect(this.ctx.destination),a.start(o),a.stop(o+e+.02)}noise(t=.12,e=.08){if(!this.enabled||(this.unlock(),!this.ctx))return;const n=this.ctx.currentTime,i=Math.max(1,Math.floor(this.ctx.sampleRate*t)),s=this.ctx.createBuffer(1,i,this.ctx.sampleRate),o=s.getChannelData(0);for(let l=0;l<i;l++)o[l]=(Math.random()*2-1)*(1-l/i);const a=this.ctx.createBufferSource(),c=this.ctx.createGain();c.gain.setValueAtTime(e,n),c.gain.exponentialRampToValueAtTime(1e-4,n+t),a.buffer=s,a.connect(c).connect(this.ctx.destination),a.start(n)}countdown(t){this.tone(t===1?660:520,.16,"square",.07,t===1?760:560)}go(){this.tone(880,.22,"triangle",.09,1320),setTimeout(()=>this.tone(1320,.16,"triangle",.07),70)}jump(){this.tone(360,.12,"triangle",.055,620)}dive(){this.noise(.09,.06),this.tone(180,.12,"sawtooth",.035,110)}qualify(){this.tone(660,.13,"triangle",.07),setTimeout(()=>this.tone(880,.16,"triangle",.07),120)}eliminate(){this.tone(260,.18,"sawtooth",.055,120)}win(){[0,110,220,360].forEach((t,e)=>setTimeout(()=>this.tone([660,880,990,1320][e],.16,"triangle",.075),t))}}const ir=[16736162,4054167,16765503,9203711,7259903,16747100,13201407,6094768],Qt=r=>document.getElementById(r),Io=Qt("name-input"),z_=Qt("single-btn"),H_=Qt("host-btn"),k_=Qt("join-btn"),Dl=Qt("join-field"),V_=Qt("room-input"),G_=Qt("join-confirm-btn"),Ul=Qt("room-display"),W_=Qt("room-code-text"),no=Qt("lobby-list"),mo=Qt("start-btn"),q_=Qt("player-count"),X_=Qt("status-text"),Fl=Qt("menu-screen"),No=Qt("hud"),go=Qt("result-banner"),Y_=Qt("result-title"),j_=Qt("result-sub"),Ol=Qt("final-screen"),K_=Qt("final-winner-text"),Z_=Qt("play-again-btn"),$_=Qt("players-remaining"),J_=Qt("level-name"),Q_=Qt("hud-timer"),io=Qt("round-intro"),Hc=Qt("round-intro-title"),qs=Qt("countdown-number"),tx=Qt("countdown-help");let Yt=null,fe=null,Do=ir[Math.floor(Math.random()*ir.length)];const Ve=new B_;function cs(r){X_.textContent=r}function Fn(){no.innerHTML="";const r=document.createElement("div");r.className="lobby-chip",r.textContent=`${Yt.myName} (you)`,no.appendChild(r),Yt.peers.forEach(e=>{const n=document.createElement("div");n.className="lobby-chip",n.textContent=e.name+(e.isHost?" (host)":""),no.appendChild(n)});const t=Yt.peers.size+1;q_.textContent=t,Yt.isHost&&mo.classList.remove("hidden")}z_.addEventListener("click",()=>{Ve.unlock(),Yt={isHost:!0,peerId:"solo-player",myName:Io.value.trim()||"Blob",peers:new Map,sendEvent(){},sendInput(){},sendState(){},leave(){}},zl()});H_.addEventListener("click",async()=>{Ve.unlock();const r=Io.value.trim()||"Blob";Yt=new kc,cs("Setting up room...");const t=await Yt.host(r);W_.textContent=t,Ul.classList.remove("hidden"),Dl.classList.add("hidden"),cs("Waiting for other blobs to join..."),Yt.onLobbyUpdate=Fn,Yt.onPeerJoin=()=>Fn(),Yt.onPeerLeave=()=>Fn(),Fn()});k_.addEventListener("click",()=>{Ve.unlock(),Dl.classList.remove("hidden"),Ul.classList.add("hidden")});G_.addEventListener("click",async()=>{Ve.unlock();const r=Io.value.trim()||"Blob",t=V_.value.trim();if(!t){cs("Enter a room code first.");return}Yt=new kc,cs("Connecting..."),await Yt.join(r,t),Yt.onLobbyUpdate=Fn,Yt.onPeerJoin=()=>Fn(),Yt.onPeerLeave=()=>Fn(),Yt.onEventReceived=e=>{e.type==="matchStart"&&sx(e)},cs("Connected! Waiting for host to start..."),Fn()});mo.addEventListener("click",()=>{Ve.unlock(),Yt.isHost&&(mo.blur(),zl())});function ex(){document.activeElement&&document.activeElement.blur(),Fl.classList.add("hidden"),No.classList.remove("hidden")}function nx(){Fl.classList.remove("hidden"),No.classList.add("hidden"),Ol.classList.add("hidden"),go.classList.add("hidden")}function ix(){const r=[{id:Yt.peerId,name:Yt.myName,color:Do}];let t=1;return Yt.peers.forEach((e,n)=>{r.push({id:n,name:e.name,color:ir[t%ir.length]}),t++}),r}function Bl(){fe=new O_(Yt),fe.onStatusUpdate=({levelName:r})=>{J_.textContent=r,Hc.textContent=r},fe.onCountdownUpdate=({value:r,label:t,levelName:e})=>{if(io){if(r===null){io.classList.add("hidden");return}io.classList.remove("hidden"),Hc.textContent=e||"ROUND",qs.textContent=t,qs.style.animation="none",qs.offsetHeight,qs.style.animation="",tx.textContent=t==="GO!"?"Go go go!":"Get ready...",t==="GO!"?Ve.go():Ve.countdown(r)}},fe.onRoundEnd=r=>{const t=r.qualifiedIds.includes(Yt.peerId);Y_.textContent=t?"QUALIFIED!":"ELIMINATED",j_.textContent=r.levelName,go.classList.remove("hidden"),t?Ve.qualify():Ve.eliminate(),setTimeout(()=>go.classList.add("hidden"),3200)},fe.onMatchEnd=r=>{No.classList.add("hidden"),Ol.classList.remove("hidden");const t=r.winnerId===Yt.peerId;K_.textContent=t?"YOU WIN!":"BETTER LUCK NEXT TIME",t&&Ve.win()},ex(),Hl()}function zl(){const r=ix();Yt.sendEvent({type:"matchStart",roster:r}),Bl(),fe.addLocalPlayer(Yt.myName,Do),fe.sound=Ve,r.slice(1).forEach(t=>fe.addRemotePlayer(t.id,t.name,t.color)),fe.hostStartMatch(r)}function sx(r){const t=r.roster,e=t.find(n=>n.id===Yt.peerId);Bl(),fe.addLocalPlayer(Yt.myName,e?e.color:Do),fe.sound=Ve,t.forEach(n=>{n.id!==Yt.peerId&&fe.addRemotePlayer(n.id,n.name,n.color)}),fe.roster=t}let vo=null;function Hl(){if(vo=requestAnimationFrame(Hl),fe.update(),fe.roundActive){const r=Math.max(0,Math.ceil(fe.roundTimer)),t=Math.floor(r/60),e=r%60;Q_.textContent=`${t}:${e.toString().padStart(2,"0")}`;const n=fe.activeIds?Array.from(fe.activeIds).filter(i=>{const s=fe.characters.get(i);return s&&!s.eliminated}).length:0;$_.textContent=n}}Z_.addEventListener("click",()=>{vo&&cancelAnimationFrame(vo),Yt&&Yt.leave(),Yt=null,fe=null,nx()});
