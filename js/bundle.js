/*!
 * GSAP 3.5.1
 * https://greensock.com
 * 
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(e){"use strict";function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function n(t){return"string"==typeof t}function o(t){return"function"==typeof t}function p(t){return"number"==typeof t}function q(t){return void 0===t}function r(t){return"object"==typeof t}function s(t){return!1!==t}function t(){return"undefined"!=typeof window}function u(t){return o(t)||n(t)}function K(t){return(l=mt(t,ot))&&ae}function L(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")}function M(t,e){return!e&&console.warn(t)}function N(t,e){return t&&(ot[t]=e)&&l&&(l[t]=e)||ot}function O(){return 0}function Y(t){var e,i,n=t[0];if(r(n)||o(n)||(t=[t]),!(e=(n._gsap||{}).harness)){for(i=_t.length;i--&&!_t[i].targetTest(n););e=_t[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new It(t[i],e)))||t.splice(i,1);return t}function Z(t){return t._gsap||Y(bt(t))[0]._gsap}function $(t,e,r){return(r=t[e])&&o(r)?t[e]():q(r)&&t.getAttribute&&t.getAttribute(e)||r}function _(t,e){return(t=t.split(",")).forEach(e)||t}function aa(t){return Math.round(1e5*t)/1e5||0}function ba(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r}function ca(t,e,r){var i,n=p(t[1]),a=(n?2:1)+(e<2?0:1),o=t[a];if(n&&(o.duration=t[1]),o.parent=r,e){for(i=o;r&&!("immediateRender"in i);)i=r.vars.defaults||{},r=s(r.vars.inherit)&&r.parent;o.immediateRender=s(i.immediateRender),e<2?o.runBackwards=1:o.startAt=t[a-1]}return o}function da(){var t,e,r=ht.length,i=ht.slice(0);for(lt={},t=ht.length=0;t<r;t++)(e=i[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)}function ea(t,e,r,i){ht.length&&da(),t.render(e,r,i),ht.length&&da()}function fa(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(st).length<2?e:n(t)?t.trim():t}function ga(t){return t}function ha(t,e){for(var r in e)r in t||(t[r]=e[r]);return t}function ia(t,e){for(var r in e)r in t||"duration"===r||"ease"===r||(t[r]=e[r])}function ka(t,e){for(var i in e)t[i]=r(e[i])?ka(t[i]||(t[i]={}),e[i]):e[i];return t}function la(t,e){var r,i={};for(r in t)r in e||(i[r]=t[r]);return i}function ma(t){var e=t.parent||E,r=t.keyframes?ia:ha;if(s(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t}function pa(t,e,r,i){void 0===r&&(r="_first"),void 0===i&&(i="_last");var n=e._prev,a=e._next;n?n._next=a:t[r]===e&&(t[r]=a),a?a._prev=n:t[i]===e&&(t[i]=n),e._next=e._prev=e.parent=null}function qa(t,e){!t.parent||e&&!t.parent.autoRemoveChildren||t.parent.remove(t),t._act=0}function ra(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t}function ua(t){return t._repeat?gt(t._tTime,t=t.duration()+t._rDelay)*t:0}function wa(t,e){return(t-e._start)*e._ts+(0<=e._ts?0:e._dirty?e.totalDuration():e._tDur)}function xa(t){return t._end=aa(t._start+(t._tDur/Math.abs(t._ts||t._rts||U)||0))}function ya(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=aa(t._dp._time-(0<t._ts?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),xa(t),r._dirty||ra(r,t)),t}function za(t,e){var r;if((e._time||e._initted&&!e._dur)&&(r=wa(t.rawTime(),e),(!e._dur||yt(0,e.totalDuration(),r)-e._tTime>U)&&e.render(r,!0)),ra(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)0<=r.rawTime()&&r.totalTime(r._tTime),r=r._dp;t._zTime=-U}}function Aa(t,e,r,i){return e.parent&&qa(e),e._start=aa(r+e._delay),e._end=aa(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),function _addLinkedListItem(t,e,r,i,n){void 0===r&&(r="_first"),void 0===i&&(i="_last");var a,s=t[i];if(n)for(a=e[n];s&&s[n]>a;)s=s._prev;s?(e._next=s._next,s._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=s,e.parent=e._dp=t}(t,e,"_first","_last",t._sort?"_start":0),t._recent=e,i||za(t,e),t}function Ba(t,e){return(ot.ScrollTrigger||L("scrollTrigger",e))&&ot.ScrollTrigger.create(e,t)}function Ca(t,e,r,i){return Nt(t,e),t._initted?!r&&t._pt&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&d!==At.frame?(ht.push(t),t._lazy=[e,i],1):void 0:1}function Fa(t,e,r,i){var n=t._repeat,a=aa(e)||0,s=t._tTime/t._tDur;return s&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=n?n<0?1e10:aa(a*(n+1)+t._rDelay*n):a,s&&!i?ya(t,t._tTime=t._tDur*s):t.parent&&xa(t),r||ra(t.parent,t),t}function Ga(t){return t instanceof Bt?ra(t):Fa(t,t._dur)}function Ia(t,e){var r,i,a=t.labels,s=t._recent||vt,o=t.duration()>=B?s.endTime(!1):t._dur;return n(e)&&(isNaN(e)||e in a)?"<"===(r=e.charAt(0))||">"===r?("<"===r?s._start:s.endTime(0<=s._repeat))+(parseFloat(e.substr(1))||0):(r=e.indexOf("="))<0?(e in a||(a[e]=o),a[e]):(i=+(e.charAt(r-1)+e.substr(r+1)),1<r?Ia(t,e.substr(0,r-1))+i:o+i):null==e?o:+e}function Ja(t,e){return t||0===t?e(t):e}function La(t){return(t=(t+"").substr((parseFloat(t)+"").length))&&isNaN(t)?t:""}function Oa(t,e){return t&&r(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&r(t[0]))&&!t.nodeType&&t!==i}function Ra(t){return t.sort(function(){return.5-Math.random()})}function Sa(t){if(o(t))return t;var _=r(t)?t:{each:t},c=Rt(_.ease),m=_.from||0,g=parseFloat(_.base)||0,v={},e=0<m&&m<1,y=isNaN(m)||e,T=_.axis,b=m,w=m;return n(m)?b=w={center:.5,edges:.5,end:1}[m]||0:!e&&y&&(b=m[0],w=m[1]),function(t,e,r){var i,n,a,s,o,u,h,l,f,d=(r||_).length,p=v[d];if(!p){if(!(f="auto"===_.grid?0:(_.grid||[1,B])[1])){for(h=-B;h<(h=r[f++].getBoundingClientRect().left)&&f<d;);f--}for(p=v[d]=[],i=y?Math.min(f,d)*b-.5:m%f,n=y?d*w/f-.5:m/f|0,l=B,u=h=0;u<d;u++)a=u%f-i,s=n-(u/f|0),p[u]=o=T?Math.abs("y"===T?s:a):J(a*a+s*s),h<o&&(h=o),o<l&&(l=o);"random"===m&&Ra(p),p.max=h-l,p.min=l,p.v=d=(parseFloat(_.amount)||parseFloat(_.each)*(d<f?d-1:T?"y"===T?d/f:f:Math.max(f,d/f))||0)*("edges"===m?-1:1),p.b=d<0?g-d:g,p.u=La(_.amount||_.each)||0,c=c&&d<0?Ft(c):c}return d=(p[t]-p.min)/p.max||0,aa(p.b+(c?c(d):d)*p.v)+p.u}}function Ta(e){var r=e<1?Math.pow(10,(e+"").length-2):1;return function(t){return Math.floor(Math.round(parseFloat(t)/e)*e*r)/r+(p(t)?0:La(t))}}function Ua(u,t){var h,l,e=tt(u);return!e&&r(u)&&(h=e=u.radius||B,u.values?(u=bt(u.values),(l=!p(u[0]))&&(h*=h)):u=Ta(u.increment)),Ja(t,e?o(u)?function(t){return l=u(t),Math.abs(l-t)<=h?l:t}:function(t){for(var e,r,i=parseFloat(l?t.x:t),n=parseFloat(l?t.y:0),a=B,s=0,o=u.length;o--;)(e=l?(e=u[o].x-i)*e+(r=u[o].y-n)*r:Math.abs(u[o]-i))<a&&(a=e,s=o);return s=!h||a<=h?u[s]:t,l||s===t||p(t)?s:s+La(t)}:Ta(u))}function Va(t,e,r,i){return Ja(tt(t)?!e:!0===r?!!(r=0):!i,function(){return tt(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t+Math.random()*(e-t))/r)*r*i)/i})}function Za(e,r,t){return Ja(t,function(t){return e[~~r(t)]})}function ab(t){for(var e,r,i,n,a=0,s="";~(e=t.indexOf("random(",a));)i=t.indexOf(")",e),n="["===t.charAt(e+7),r=t.substr(e+7,i-e-7).match(n?st:et),s+=t.substr(a,e-a)+Va(n?r:+r[0],n?0:+r[1],+r[2]||1e-5),a=i+1;return s+t.substr(a,t.length-a)}function db(t,e,r){var i,n,a,s=t.labels,o=B;for(i in s)(n=s[i]-e)<0==!!r&&n&&o>(n=Math.abs(n))&&(a=i,o=n);return a}function fb(t){return qa(t),t.progress()<1&&xt(t,"onInterrupt"),t}function kb(t,e,r){return(6*(t=t<0?t+1:1<t?t-1:t)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*kt+.5|0}function lb(t,e,r){var i,n,a,s,o,u,h,l,f,d,_=t?p(t)?[t>>16,t>>8&kt,t&kt]:0:Ot.black;if(!_){if(","===t.substr(-1)&&(t=t.substr(0,t.length-1)),Ot[t])_=Ot[t];else if("#"===t.charAt(0))4===t.length&&(t="#"+(i=t.charAt(1))+i+(n=t.charAt(2))+n+(a=t.charAt(3))+a),_=[(t=parseInt(t.substr(1),16))>>16,t>>8&kt,t&kt];else if("hsl"===t.substr(0,3))if(_=d=t.match(et),e){if(~t.indexOf("="))return _=t.match(rt),r&&_.length<4&&(_[3]=1),_}else s=+_[0]%360/360,o=_[1]/100,i=2*(u=_[2]/100)-(n=u<=.5?u*(o+1):u+o-u*o),3<_.length&&(_[3]*=1),_[0]=kb(s+1/3,i,n),_[1]=kb(s,i,n),_[2]=kb(s-1/3,i,n);else _=t.match(et)||Ot.transparent;_=_.map(Number)}return e&&!d&&(i=_[0]/kt,n=_[1]/kt,a=_[2]/kt,u=((h=Math.max(i,n,a))+(l=Math.min(i,n,a)))/2,h===l?s=o=0:(f=h-l,o=.5<u?f/(2-h-l):f/(h+l),s=h===i?(n-a)/f+(n<a?6:0):h===n?(a-i)/f+2:(i-n)/f+4,s*=60),_[0]=~~(s+.5),_[1]=~~(100*o+.5),_[2]=~~(100*u+.5)),r&&_.length<4&&(_[3]=1),_}function mb(t){var r=[],i=[],n=-1;return t.split(Mt).forEach(function(t){var e=t.match(it)||[];r.push.apply(r,e),i.push(n+=e.length+1)}),r.c=i,r}function nb(t,e,r){var i,n,a,s,o="",u=(t+o).match(Mt),h=e?"hsla(":"rgba(",l=0;if(!u)return t;if(u=u.map(function(t){return(t=lb(t,e,1))&&h+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(a=mb(t),(i=r.c).join(o)!==a.c.join(o)))for(s=(n=t.replace(Mt,"1").split(it)).length-1;l<s;l++)o+=n[l]+(~i.indexOf(l)?u.shift()||h+"0,0,0,0)":(a.length?a:u.length?u:r).shift());if(!n)for(s=(n=t.split(Mt)).length-1;l<s;l++)o+=n[l]+u[l];return o+n[s]}function qb(t){var e,r=t.join(" ");if(Mt.lastIndex=0,Mt.test(r))return e=Ct.test(r),t[1]=nb(t[1],e),t[0]=nb(t[0],e,mb(t[1])),!0}function zb(t){var e=(t+"").split("("),r=Dt[e[0]];return r&&1<e.length&&r.config?r.config.apply(null,~t.indexOf("{")?[function _parseObjectInString(t){for(var e,r,i,n={},a=t.substr(1,t.length-3).split(":"),s=a[0],o=1,u=a.length;o<u;o++)r=a[o],e=o!==u-1?r.lastIndexOf(","):r.length,i=r.substr(0,e),n[s]=isNaN(i)?i.replace(zt,"").trim():+i,s=r.substr(e+1).trim();return n}(e[1])]:function _valueInParentheses(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)}(t).split(",").map(fa)):Dt._CE&&St.test(t)?Dt._CE("",t):r}function Bb(t,e){for(var r,i=t._first;i;)i instanceof Bt?Bb(i,e):!i.vars.yoyoEase||i._yoyo&&i._repeat||i._yoyo===e||(i.timeline?Bb(i.timeline,e):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=e)),i=i._next}function Db(t,e,r,i){void 0===r&&(r=function easeOut(t){return 1-e(1-t)}),void 0===i&&(i=function easeInOut(t){return t<.5?e(2*t)/2:1-e(2*(1-t))/2});var n,a={easeIn:e,easeOut:r,easeInOut:i};return _(t,function(t){for(var e in Dt[t]=ot[t]=a,Dt[n=t.toLowerCase()]=r,a)Dt[n+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=Dt[t+"."+e]=a[e]}),a}function Eb(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}}function Fb(r,t,e){function ul(t){return 1===t?1:i*Math.pow(2,-10*t)*W((t-a)*n)+1}var i=1<=t?t:1,n=(e||(r?.3:.45))/(t<1?t:1),a=n/V*(Math.asin(1/i)||0),s="out"===r?ul:"in"===r?function(t){return 1-ul(1-t)}:Eb(ul);return n=V/n,s.config=function(t,e){return Fb(r,t,e)},s}function Gb(e,r){function Cl(t){return t?--t*t*((r+1)*t+r)+1:0}void 0===r&&(r=1.70158);var t="out"===e?Cl:"in"===e?function(t){return 1-Cl(1-t)}:Eb(Cl);return t.config=function(t){return Gb(e,t)},t}var E,i,a,h,l,f,d,c,m,g,v,y,T,b,w,x,k,C,A,P,D,S,z,F,R,j={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},I={duration:.5,overwrite:!1,delay:0},B=1e8,U=1/B,V=2*Math.PI,X=V/4,G=0,J=Math.sqrt,Q=Math.cos,W=Math.sin,H="function"==typeof ArrayBuffer&&ArrayBuffer.isView||function(){},tt=Array.isArray,et=/(?:-?\.?\d|\.)+/gi,rt=/[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,it=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,nt=/[-+=.]*\d+(?:\.|e-|e)*\d*/gi,at=/[+-]=-?[\.\d]+/,st=/[#\-+.]*\b[a-z\d-=+%.]+/gi,ot={},ut={},ht=[],lt={},ft={},dt={},pt=30,_t=[],ct="",mt=function _merge(t,e){for(var r in e)t[r]=e[r];return t},gt=function _animationCycle(t,e){return(t/=e)&&~~t===t?~~t-1:~~t},vt={_start:0,endTime:O},yt=function _clamp(t,e,r){return r<t?t:e<r?e:r},Tt=[].slice,bt=function toArray(t,e){return!n(t)||e||!a&&Pt()?tt(t)?function _flatten(t,e,r){return void 0===r&&(r=[]),t.forEach(function(t){return n(t)&&!e||Oa(t,1)?r.push.apply(r,bt(t)):r.push(t)})||r}(t,e):Oa(t)?Tt.call(t,0):t?[t]:[]:Tt.call(h.querySelectorAll(t),0)},wt=function mapRange(e,t,r,i,n){var a=t-e,s=i-r;return Ja(n,function(t){return r+((t-e)/a*s||0)})},xt=function _callback(t,e,r){var i,n,a=t.vars,s=a[e];if(s)return i=a[e+"Params"],n=a.callbackScope||t,r&&ht.length&&da(),i?s.apply(n,i):s.call(n)},kt=255,Ot={aqua:[0,kt,kt],lime:[0,kt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,kt],navy:[0,0,128],white:[kt,kt,kt],olive:[128,128,0],yellow:[kt,kt,0],orange:[kt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[kt,0,0],pink:[kt,192,203],cyan:[0,kt,kt],transparent:[kt,kt,kt,0]},Mt=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";for(t in Ot)e+="|"+t+"\\b";return new RegExp(e+")","gi")}(),Ct=/hsl[a]?\(/,At=(x=Date.now,k=500,C=33,A=x(),P=A,S=D=1e3/240,T={time:0,frame:0,tick:function tick(){qk(!0)},deltaRatio:function deltaRatio(t){return b/(1e3/(t||60))},wake:function wake(){f&&(!a&&t()&&(i=a=window,h=i.document||{},ot.gsap=ae,(i.gsapVersions||(i.gsapVersions=[])).push(ae.version),K(l||i.GreenSockGlobals||!i.gsap&&i||{}),y=i.requestAnimationFrame),g&&T.sleep(),v=y||function(t){return setTimeout(t,S-1e3*T.time+1|0)},m=1,qk(2))},sleep:function sleep(){(y?i.cancelAnimationFrame:clearTimeout)(g),m=0,v=O},lagSmoothing:function lagSmoothing(t,e){k=t||1e8,C=Math.min(e,k,0)},fps:function fps(t){D=1e3/(t||240),S=1e3*T.time+D},add:function add(t){z.indexOf(t)<0&&z.push(t),Pt()},remove:function remove(t){var e;~(e=z.indexOf(t))&&z.splice(e,1)&&e<=w&&w--},_listeners:z=[]}),Pt=function _wake(){return!m&&At.wake()},Dt={},St=/^[\d.\-M][\d.\-,\s]/,zt=/["']/g,Ft=function _invertEase(e){return function(t){return 1-e(1-t)}},Rt=function _parseEase(t,e){return t&&(o(t)?t:Dt[t]||zb(t))||e};function qk(t){var e,r,i,n,a=x()-P,s=!0===t;if(k<a&&(A+=a-C),(0<(e=(i=(P+=a)-A)-S)||s)&&(n=++T.frame,b=i-1e3*T.time,T.time=i/=1e3,S+=e+(D<=e?4:D-e),r=1),s||(g=v(qk)),r)for(w=0;w<z.length;w++)z[w](i,b,n,t)}function Tl(t){return t<R?F*t*t:t<.7272727272727273?F*Math.pow(t-1.5/2.75,2)+.75:t<.9090909090909092?F*(t-=2.25/2.75)*t+.9375:F*Math.pow(t-2.625/2.75,2)+.984375}_("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;Db(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow(2*(1-t),r)/2})}),Dt.Linear.easeNone=Dt.none=Dt.Linear.easeIn,Db("Elastic",Fb("in"),Fb("out"),Fb()),F=7.5625,R=1/2.75,Db("Bounce",function(t){return 1-Tl(1-t)},Tl),Db("Expo",function(t){return t?Math.pow(2,10*(t-1)):0}),Db("Circ",function(t){return-(J(1-t*t)-1)}),Db("Sine",function(t){return 1===t?1:1-Q(t*X)}),Db("Back",Gb("in"),Gb("out"),Gb()),Dt.SteppedEase=Dt.steps=ot.SteppedEase={config:function config(t,e){void 0===t&&(t=1);var r=1/t,i=t+(e?0:1),n=e?1:0;return function(t){return((i*yt(0,.99999999,t)|0)+n)*r}}},I.ease=Dt["quad.out"],_("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return ct+=t+","+t+"Params,"});var Et,It=function GSCache(t,e){this.id=G++,(t._gsap=this).target=t,this.harness=e,this.get=e?e.get:$,this.set=e?e.getSetter:Qt},Lt=((Et=Animation.prototype).delay=function delay(t){return t||0===t?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},Et.duration=function duration(t){return arguments.length?this.totalDuration(0<this._repeat?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},Et.totalDuration=function totalDuration(t){return arguments.length?(this._dirty=0,Fa(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},Et.totalTime=function totalTime(t,e){if(Pt(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(ya(this,t);r.parent;)r.parent._time!==r._start+(0<=r._ts?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(0<this._ts&&t<this._tDur||this._ts<0&&0<t||!this._tDur&&!t)&&Aa(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!e||this._initted&&Math.abs(this._zTime)===U||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),ea(this,t,e)),this},Et.time=function time(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+ua(this))%this._dur||(t?this._dur:0),e):this._time},Et.totalProgress=function totalProgress(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.ratio},Et.progress=function progress(t,e){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?t:1-t)+ua(this),e):this.duration()?Math.min(1,this._time/this._dur):this.ratio},Et.iteration=function iteration(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?gt(this._tTime,r)+1:1},Et.timeScale=function timeScale(t){if(!arguments.length)return this._rts===-U?0:this._rts;if(this._rts===t)return this;var e=this.parent&&this._ts?wa(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-U?0:this._rts,function _recacheAncestors(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t}(this.totalTime(yt(-this._delay,this._tDur,e),!0))},Et.paused=function paused(t){return arguments.length?(this._ps!==t&&((this._ps=t)?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Pt(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&(this._tTime-=U)&&Math.abs(this._zTime)!==U))),this):this._ps},Et.startTime=function startTime(t){if(arguments.length){this._start=t;var e=this.parent||this._dp;return!e||!e._sort&&this.parent||Aa(e,this,t-this._delay),this}return this._start},Et.endTime=function endTime(t){return this._start+(s(t)?this.totalDuration():this.duration())/Math.abs(this._ts)},Et.rawTime=function rawTime(t){var e=this.parent||this._dp;return e?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?wa(e.rawTime(t),this):this._tTime:this._tTime},Et.globalTime=function globalTime(t){for(var e=this,r=arguments.length?t:e.rawTime();e;)r=e._start+r/(e._ts||1),e=e._dp;return r},Et.repeat=function repeat(t){return arguments.length?(this._repeat=t,Ga(this)):this._repeat},Et.repeatDelay=function repeatDelay(t){return arguments.length?(this._rDelay=t,Ga(this)):this._rDelay},Et.yoyo=function yoyo(t){return arguments.length?(this._yoyo=t,this):this._yoyo},Et.seek=function seek(t,e){return this.totalTime(Ia(this,t),s(e))},Et.restart=function restart(t,e){return this.play().totalTime(t?-this._delay:0,s(e))},Et.play=function play(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},Et.reverse=function reverse(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},Et.pause=function pause(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},Et.resume=function resume(){return this.paused(!1)},Et.reversed=function reversed(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-U:0)),this):this._rts<0},Et.invalidate=function invalidate(){return this._initted=0,this._zTime=-U,this},Et.isActive=function isActive(){var t,e=this.parent||this._dp,r=this._start;return!(e&&!(this._ts&&this._initted&&e.isActive()&&(t=e.rawTime(!0))>=r&&t<this.endTime(!0)-U))},Et.eventCallback=function eventCallback(t,e,r){var i=this.vars;return 1<arguments.length?(e?(i[t]=e,r&&(i[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete i[t],this):i[t]},Et.then=function then(t){var i=this;return new Promise(function(e){function jn(){var t=i.then;i.then=null,o(r)&&(r=r(i))&&(r.then||r===i)&&(i.then=t),e(r),i.then=t}var r=o(t)?t:ga;i._initted&&1===i.totalProgress()&&0<=i._ts||!i._tTime&&i._ts<0?jn():i._prom=jn})},Et.kill=function kill(){fb(this)},Animation);function Animation(t,e){var r=t.parent||E;this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Fa(this,+t.duration,1,1),this.data=t.data,m||At.wake(),r&&Aa(r,this,e||0===e?e:r._time,1),t.reversed&&this.reverse(),t.paused&&this.paused(!0)}ha(Lt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-U,_prom:0,_ps:!1,_rts:1});var Bt=function(i){function Timeline(t,e){var r;return void 0===t&&(t={}),(r=i.call(this,t,e)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=s(t.sortChildren),r.parent&&za(r.parent,_assertThisInitialized(r)),t.scrollTrigger&&Ba(_assertThisInitialized(r),t.scrollTrigger),r}_inheritsLoose(Timeline,i);var t=Timeline.prototype;return t.to=function to(t,e,r,i){return new Xt(t,ca(arguments,0,this),Ia(this,p(e)?i:r)),this},t.from=function from(t,e,r,i){return new Xt(t,ca(arguments,1,this),Ia(this,p(e)?i:r)),this},t.fromTo=function fromTo(t,e,r,i,n){return new Xt(t,ca(arguments,2,this),Ia(this,p(e)?n:i)),this},t.set=function set(t,e,r){return e.duration=0,e.parent=this,ma(e).repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new Xt(t,e,Ia(this,r),1),this},t.call=function call(t,e,r){return Aa(this,Xt.delayedCall(0,t,e),Ia(this,r))},t.staggerTo=function staggerTo(t,e,r,i,n,a,s){return r.duration=e,r.stagger=r.stagger||i,r.onComplete=a,r.onCompleteParams=s,r.parent=this,new Xt(t,r,Ia(this,n)),this},t.staggerFrom=function staggerFrom(t,e,r,i,n,a,o){return r.runBackwards=1,ma(r).immediateRender=s(r.immediateRender),this.staggerTo(t,e,r,i,n,a,o)},t.staggerFromTo=function staggerFromTo(t,e,r,i,n,a,o,u){return i.startAt=r,ma(i).immediateRender=s(i.immediateRender),this.staggerTo(t,e,i,n,a,o,u)},t.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d,p,_,c=this._time,m=this._dirty?this.totalDuration():this._tDur,g=this._dur,v=this!==E&&m-U<t&&0<=t?m:t<U?0:t,y=this._zTime<0!=t<0&&(this._initted||!g);if(v!==this._tTime||r||y){if(c!==this._time&&g&&(v+=this._time-c,t+=this._time-c),i=v,f=this._start,u=!(l=this._ts),y&&(g||(c=this._zTime),!t&&e||(this._zTime=t)),this._repeat&&(p=this._yoyo,o=g+this._rDelay,i=aa(v%o),v===m?(s=this._repeat,i=g):((s=~~(v/o))&&s===v/o&&(i=g,s--),g<i&&(i=g)),d=gt(this._tTime,o),!c&&this._tTime&&d!==s&&(d=s),p&&1&s&&(i=g-i,_=1),s!==d&&!this._lock)){var T=p&&1&d,b=T===(p&&1&s);if(s<d&&(T=!T),c=T?0:g,this._lock=1,this.render(c||(_?0:aa(s*o)),e,!g)._lock=0,!e&&this.parent&&xt(this,"onRepeat"),this.vars.repeatRefresh&&!_&&(this.invalidate()._lock=1),c!==this._time||u!=!this._ts)return this;if(g=this._dur,m=this._tDur,b&&(this._lock=2,c=T?g:-1e-4,this.render(c,!0),this.vars.repeatRefresh&&!_&&this.invalidate()),this._lock=0,!this._ts&&!u)return this;Bb(this,_)}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=function _findNextPauseTween(t,e,r){var i;if(e<r)for(i=t._first;i&&i._start<=r;){if(!i._dur&&"isPause"===i.data&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if(!i._dur&&"isPause"===i.data&&i._start<e)return i;i=i._prev}}(this,aa(c),aa(i)))&&(v-=i-(i=h._start)),this._tTime=v,this._time=i,this._act=!l,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t),c||!i||e||xt(this,"onStart"),c<=i&&0<=t)for(n=this._first;n;){if(a=n._next,(n._act||i>=n._start)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(i-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(i-n._start)*n._ts,e,r),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=-U);break}}n=a}else{n=this._last;for(var w=t<0?t:i;n;){if(a=n._prev,(n._act||w<=n._end)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(w-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(w-n._start)*n._ts,e,r),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=w?-U:U);break}}n=a}}if(h&&!e&&(this.pause(),h.render(c<=i?0:-U)._zTime=c<=i?1:-1,this._ts))return this._start=f,xa(this),this.render(t,e,r);this._onUpdate&&!e&&xt(this,"onUpdate",!0),(v===m&&m>=this.totalDuration()||!v&&c)&&(f!==this._start&&Math.abs(l)===Math.abs(this._ts)||this._lock||(!t&&g||!(v===m&&0<this._ts||!v&&this._ts<0)||qa(this,1),e||t<0&&!c||!v&&!c||(xt(this,v===m?"onComplete":"onReverseComplete",!0),!this._prom||v<m&&0<this.timeScale()||this._prom())))}return this},t.add=function add(t,e){var r=this;if(p(e)||(e=Ia(this,e)),!(t instanceof Lt)){if(tt(t))return t.forEach(function(t){return r.add(t,e)}),this;if(n(t))return this.addLabel(t,e);if(!o(t))return this;t=Xt.delayedCall(0,t)}return this!==t?Aa(this,t,e):this},t.getChildren=function getChildren(t,e,r,i){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===i&&(i=-B);for(var n=[],a=this._first;a;)a._start>=i&&(a instanceof Xt?e&&n.push(a):(r&&n.push(a),t&&n.push.apply(n,a.getChildren(!0,e,r)))),a=a._next;return n},t.getById=function getById(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},t.remove=function remove(t){return n(t)?this.removeLabel(t):o(t)?this.killTweensOf(t):(pa(this,t),t===this._recent&&(this._recent=this._last),ra(this))},t.totalTime=function totalTime(t,e){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=aa(At.time-(0<this._ts?t/this._ts:(this.totalDuration()-t)/-this._ts))),i.prototype.totalTime.call(this,t,e),this._forcing=0,this):this._tTime},t.addLabel=function addLabel(t,e){return this.labels[t]=Ia(this,e),this},t.removeLabel=function removeLabel(t){return delete this.labels[t],this},t.addPause=function addPause(t,e,r){var i=Xt.delayedCall(0,e||O,r);return i.data="isPause",this._hasPause=1,Aa(this,i,Ia(this,t))},t.removePause=function removePause(t){var e=this._first;for(t=Ia(this,t);e;)e._start===t&&"isPause"===e.data&&qa(e),e=e._next},t.killTweensOf=function killTweensOf(t,e,r){for(var i=this.getTweensOf(t,r),n=i.length;n--;)qt!==i[n]&&i[n].kill(t,e);return this},t.getTweensOf=function getTweensOf(t,e){for(var r,i=[],n=bt(t),a=this._first,s=p(e);a;)a instanceof Xt?ba(a._targets,n)&&(s?(!qt||a._initted&&a._ts)&&a.globalTime(0)<=e&&a.globalTime(a.totalDuration())>e:!e||a.isActive())&&i.push(a):(r=a.getTweensOf(n,e)).length&&i.push.apply(i,r),a=a._next;return i},t.tweenTo=function tweenTo(t,e){e=e||{};var r=this,i=Ia(r,t),n=e.startAt,a=e.onStart,s=e.onStartParams,o=Xt.to(r,ha(e,{ease:"none",lazy:!1,time:i,overwrite:"auto",duration:e.duration||Math.abs((i-(n&&"time"in n?n.time:r._time))/r.timeScale())||U,onStart:function onStart(){r.pause();var t=e.duration||Math.abs((i-r._time)/r.timeScale());o._dur!==t&&Fa(o,t,0,1).render(o._time,!0,!0),a&&a.apply(o,s||[])}}));return o},t.tweenFromTo=function tweenFromTo(t,e,r){return this.tweenTo(e,ha({startAt:{time:Ia(this,t)}},r))},t.recent=function recent(){return this._recent},t.nextLabel=function nextLabel(t){return void 0===t&&(t=this._time),db(this,Ia(this,t))},t.previousLabel=function previousLabel(t){return void 0===t&&(t=this._time),db(this,Ia(this,t),1)},t.currentLabel=function currentLabel(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+U)},t.shiftChildren=function shiftChildren(t,e,r){void 0===r&&(r=0);for(var i,n=this._first,a=this.labels;n;)n._start>=r&&(n._start+=t,n._end+=t),n=n._next;if(e)for(i in a)a[i]>=r&&(a[i]+=t);return ra(this)},t.invalidate=function invalidate(){var t=this._first;for(this._lock=0;t;)t.invalidate(),t=t._next;return i.prototype.invalidate.call(this)},t.clear=function clear(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._time=this._tTime=this._pTime=0,t&&(this.labels={}),ra(this)},t.totalDuration=function totalDuration(t){var e,r,i,n=0,a=this,s=a._last,o=B;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-t:t));if(a._dirty){for(i=a.parent;s;)e=s._prev,s._dirty&&s.totalDuration(),o<(r=s._start)&&a._sort&&s._ts&&!a._lock?(a._lock=1,Aa(a,s,r-s._delay,1)._lock=0):o=r,r<0&&s._ts&&(n-=r,(!i&&!a._dp||i&&i.smoothChildTiming)&&(a._start+=r/a._ts,a._time-=r,a._tTime-=r),a.shiftChildren(-r,!1,-Infinity),o=0),s._end>n&&s._ts&&(n=s._end),s=e;Fa(a,a===E&&a._time>n?a._time:n,1,1),a._dirty=0}return a._tDur},Timeline.updateRoot=function updateRoot(t){if(E._ts&&(ea(E,wa(t,E)),d=At.frame),At.frame>=pt){pt+=j.autoSleep||120;var e=E._first;if((!e||!e._ts)&&j.autoSleep&&At._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||At.sleep()}}},Timeline}(Lt);ha(Bt.prototype,{_lock:0,_hasPause:0,_forcing:0});function Nb(t,e,i,a,s,u){var h,l,f,d;if(ft[t]&&!1!==(h=new ft[t]).init(s,h.rawVars?e[t]:function _processVars(t,e,i,a,s){if(o(t)&&(t=jt(t,s,e,i,a)),!r(t)||t.style&&t.nodeType||tt(t)||H(t))return n(t)?jt(t,s,e,i,a):t;var u,h={};for(u in t)h[u]=jt(t[u],s,e,i,a);return h}(e[t],a,s,u,i),i,a,u)&&(i._pt=l=new ie(i._pt,s,t,0,1,h.render,h,0,h.priority),i!==c))for(f=i._ptLookup[i._targets.indexOf(s)],d=h._props.length;d--;)f[h._props[d]]=l;return h}var qt,Yt=function _addPropTween(t,e,r,i,a,s,u,h,l){o(i)&&(i=i(a||0,t,s));var f,d=t[e],p="get"!==r?r:o(d)?l?t[e.indexOf("set")||!o(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():d,_=o(d)?l?Jt:Zt:Gt;if(n(i)&&(~i.indexOf("random(")&&(i=ab(i)),"="===i.charAt(1)&&(i=parseFloat(p)+parseFloat(i.substr(2))*("-"===i.charAt(0)?-1:1)+(La(p)||0))),p!==i)return isNaN(p*i)?(d||e in t||L(e,i),function _addComplexStringPropTween(t,e,r,i,n,a,s){var o,u,h,l,f,d,p,_,c=new ie(this._pt,t,e,0,1,Ht,null,n),m=0,g=0;for(c.b=r,c.e=i,r+="",(p=~(i+="").indexOf("random("))&&(i=ab(i)),a&&(a(_=[r,i],t,e),r=_[0],i=_[1]),u=r.match(nt)||[];o=nt.exec(i);)l=o[0],f=i.substring(m,o.index),h?h=(h+1)%5:"rgba("===f.substr(-5)&&(h=1),l!==u[g++]&&(d=parseFloat(u[g-1])||0,c._pt={_next:c._pt,p:f||1===g?f:",",s:d,c:"="===l.charAt(1)?parseFloat(l.substr(2))*("-"===l.charAt(0)?-1:1):parseFloat(l)-d,m:h&&h<4?Math.round:0},m=nt.lastIndex);return c.c=m<i.length?i.substring(m,i.length):"",c.fp=s,(at.test(i)||p)&&(c.e=0),this._pt=c}.call(this,t,e,p,i,_,h||j.stringFilter,l)):(f=new ie(this._pt,t,e,+p||0,i-(p||0),"boolean"==typeof d?$t:Wt,0,_),l&&(f.fp=l),u&&f.modifier(u,this,t),this._pt=f)},Nt=function _initTween(t,e){var r,i,n,a,o,u,h,l,f,d,p,_,c,m=t.vars,g=m.ease,v=m.startAt,y=m.immediateRender,T=m.lazy,b=m.onUpdate,w=m.onUpdateParams,x=m.callbackScope,k=m.runBackwards,O=m.yoyoEase,M=m.keyframes,C=m.autoRevert,A=t._dur,P=t._startAt,D=t._targets,S=t.parent,z=S&&"nested"===S.data?S.parent._targets:D,F="auto"===t._overwrite,R=t.timeline;if(!R||M&&g||(g="none"),t._ease=Rt(g,I.ease),t._yEase=O?Ft(Rt(!0===O?g:O,I.ease)):0,O&&t._yoyo&&!t._repeat&&(O=t._yEase,t._yEase=t._ease,t._ease=O),!R){if(_=(l=D[0]?Z(D[0]).harness:0)&&m[l.prop],r=la(m,ut),P&&P.render(-1,!0).kill(),v){if(qa(t._startAt=Xt.set(D,ha({data:"isStart",overwrite:!1,parent:S,immediateRender:!0,lazy:s(T),startAt:null,delay:0,onUpdate:b,onUpdateParams:w,callbackScope:x,stagger:0},v))),y)if(0<e)C||(t._startAt=0);else if(A&&!(e<0&&P))return void(e&&(t._zTime=e))}else if(k&&A)if(P)C||(t._startAt=0);else if(e&&(y=!1),n=ha({overwrite:!1,data:"isFromStart",lazy:y&&s(T),immediateRender:y,stagger:0,parent:S},r),_&&(n[l.prop]=_),qa(t._startAt=Xt.set(D,n)),y){if(!e)return}else _initTween(t._startAt,U);for(t._pt=0,T=A&&s(T)||T&&!A,i=0;i<D.length;i++){if(h=(o=D[i])._gsap||Y(D)[i]._gsap,t._ptLookup[i]=d={},lt[h.id]&&ht.length&&da(),p=z===D?i:z.indexOf(o),l&&!1!==(f=new l).init(o,_||r,t,p,z)&&(t._pt=a=new ie(t._pt,o,f.name,0,1,f.render,f,0,f.priority),f._props.forEach(function(t){d[t]=a}),f.priority&&(u=1)),!l||_)for(n in r)ft[n]&&(f=Nb(n,r,t,p,o,z))?f.priority&&(u=1):d[n]=a=Yt.call(t,o,n,"get",r[n],p,z,0,m.stringFilter);t._op&&t._op[i]&&t.kill(o,t._op[i]),F&&t._pt&&(qt=t,E.killTweensOf(o,d,t.globalTime(0)),c=!t.parent,qt=0),t._pt&&T&&(lt[h.id]=1)}u&&re(t),t._onInit&&t._onInit(t)}t._from=!R&&!!m.runBackwards,t._onUpdate=b,t._initted=(!t._op||t._pt)&&!c},jt=function _parseFuncOrString(t,e,r,i,a){return o(t)?t.call(e,r,i,a):n(t)&&~t.indexOf("random(")?ab(t):t},Ut=ct+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",Vt=(Ut+",id,stagger,delay,duration,paused,scrollTrigger").split(","),Xt=function(S){function Tween(t,e,i,n){var a;"number"==typeof e&&(i.duration=e,e=i,i=null);var o,h,l,f,d,_,c,m,g=(a=S.call(this,n?e:ma(e),i)||this).vars,v=g.duration,y=g.delay,T=g.immediateRender,b=g.stagger,w=g.overwrite,x=g.keyframes,k=g.defaults,C=g.scrollTrigger,A=g.yoyoEase,P=a.parent,D=(tt(t)||H(t)?p(t[0]):"length"in e)?[t]:bt(t);if(a._targets=D.length?Y(D):M("GSAP target "+t+" not found. https://greensock.com",!j.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=w,x||b||u(v)||u(y)){if(e=a.vars,(o=a.timeline=new Bt({data:"nested",defaults:k||{}})).kill(),o.parent=_assertThisInitialized(a),x)ha(o.vars.defaults,{ease:"none"}),x.forEach(function(t){return o.to(D,t,">")});else{if(f=D.length,c=b?Sa(b):O,r(b))for(d in b)~Ut.indexOf(d)&&((m=m||{})[d]=b[d]);for(h=0;h<f;h++){for(d in l={},e)Vt.indexOf(d)<0&&(l[d]=e[d]);l.stagger=0,A&&(l.yoyoEase=A),m&&mt(l,m),_=D[h],l.duration=+jt(v,_assertThisInitialized(a),h,_,D),l.delay=(+jt(y,_assertThisInitialized(a),h,_,D)||0)-a._delay,!b&&1===f&&l.delay&&(a._delay=y=l.delay,a._start+=y,l.delay=0),o.to(_,l,c(h,_,D))}o.duration()?v=y=0:a.timeline=0}v||a.duration(v=o.duration())}else a.timeline=0;return!0===w&&(qt=_assertThisInitialized(a),E.killTweensOf(D),qt=0),P&&za(P,_assertThisInitialized(a)),(T||!v&&!x&&a._start===aa(P._time)&&s(T)&&function _hasNoPausedAncestors(t){return!t||t._ts&&_hasNoPausedAncestors(t.parent)}(_assertThisInitialized(a))&&"nested"!==P.data)&&(a._tTime=-U,a.render(Math.max(0,-y))),C&&Ba(_assertThisInitialized(a),C),a}_inheritsLoose(Tween,S);var t=Tween.prototype;return t.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d=this._time,p=this._tDur,_=this._dur,c=p-U<t&&0<=t?p:t<U?0:t;if(_){if(c!==this._tTime||!t||r||this._startAt&&this._zTime<0!=t<0){if(i=c,l=this.timeline,this._repeat){if(s=_+this._rDelay,i=aa(c%s),c===p?(a=this._repeat,i=_):((a=~~(c/s))&&a===c/s&&(i=_,a--),_<i&&(i=_)),(u=this._yoyo&&1&a)&&(f=this._yEase,i=_-i),o=gt(this._tTime,s),i===d&&!r&&this._initted)return this;a!==o&&(l&&this._yEase&&Bb(l,u),!this.vars.repeatRefresh||u||this._lock||(this._lock=r=1,this.render(aa(s*a),!0).invalidate()._lock=0))}if(!this._initted){if(Ca(this,t<0?t:i,r,e))return this._tTime=0,this;if(_!==this._dur)return this.render(t,e,r)}for(this._tTime=c,this._time=i,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=h=(f||this._ease)(i/_),this._from&&(this.ratio=h=1-h),!i||d||e||xt(this,"onStart"),n=this._pt;n;)n.r(h,n.d),n=n._next;l&&l.render(t<0?t:!i&&u?-U:l._dur*h,e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(t<0&&this._startAt&&this._startAt.render(t,!0,r),xt(this,"onUpdate")),this._repeat&&a!==o&&this.vars.onRepeat&&!e&&this.parent&&xt(this,"onRepeat"),c!==this._tDur&&c||this._tTime!==c||(t<0&&this._startAt&&!this._onUpdate&&this._startAt.render(t,!0,!0),!t&&_||!(c===this._tDur&&0<this._ts||!c&&this._ts<0)||qa(this,1),e||t<0&&!d||!c&&!d||(xt(this,c===p?"onComplete":"onReverseComplete",!0),!this._prom||c<p&&0<this.timeScale()||this._prom()))}}else!function _renderZeroDurationTween(t,e,r,i){var n,a,s=t.ratio,o=e<0||!e&&s&&!t._start&&t._zTime>U&&!t._dp._lock||(t._ts<0||t._dp._ts<0)&&"isFromStart"!==t.data&&"isStart"!==t.data?0:1,u=t._rDelay,h=0;if(u&&t._repeat&&(h=yt(0,t._tDur,e),gt(h,u)!==(a=gt(t._tTime,u))&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||i||t._zTime===U||!e&&t._zTime){if(!t._initted&&Ca(t,e,i,r))return;for(a=t._zTime,t._zTime=e||(r?U:0),r=r||e&&!a,t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=h,r||xt(t,"onStart"),n=t._pt;n;)n.r(o,n.d),n=n._next;t._startAt&&e<0&&t._startAt.render(e,!0,!0),t._onUpdate&&!r&&xt(t,"onUpdate"),h&&t._repeat&&!r&&t.parent&&xt(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&qa(t,1),r||(xt(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)}(this,t,e,r);return this},t.targets=function targets(){return this._targets},t.invalidate=function invalidate(){return this._pt=this._op=this._startAt=this._onUpdate=this._act=this._lazy=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(),S.prototype.invalidate.call(this)},t.kill=function kill(t,e){if(void 0===e&&(e="all"),!(t||e&&"all"!==e)&&(this._lazy=0,this.parent))return fb(this);if(this.timeline){var r=this.timeline.totalDuration();return this.timeline.killTweensOf(t,e,qt&&!0!==qt.vars.overwrite)._first||fb(this),this.parent&&r!==this.timeline.totalDuration()&&Fa(this,this._dur*this.timeline._tDur/r,0,1),this}var i,a,s,o,u,h,l,f=this._targets,d=t?bt(t):f,p=this._ptLookup,c=this._pt;if((!e||"all"===e)&&function _arraysMatch(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0}(f,d))return"all"===e&&(this._pt=0),fb(this);for(i=this._op=this._op||[],"all"!==e&&(n(e)&&(u={},_(e,function(t){return u[t]=1}),e=u),e=function _addAliasesToVars(t,e){var r,i,n,a,s=t[0]?Z(t[0]).harness:0,o=s&&s.aliases;if(!o)return e;for(i in r=mt({},e),o)if(i in r)for(n=(a=o[i].split(",")).length;n--;)r[a[n]]=r[i];return r}(f,e)),l=f.length;l--;)if(~d.indexOf(f[l]))for(u in a=p[l],"all"===e?(i[l]=e,o=a,s={}):(s=i[l]=i[l]||{},o=e),o)(h=a&&a[u])&&("kill"in h.d&&!0!==h.d.kill(u)||pa(this,h,"_pt"),delete a[u]),"all"!==s&&(s[u]=1);return this._initted&&!this._pt&&c&&fb(this),this},Tween.to=function to(t,e,r){return new Tween(t,e,r)},Tween.from=function from(t,e){return new Tween(t,ca(arguments,1))},Tween.delayedCall=function delayedCall(t,e,r,i){return new Tween(e,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:e,onReverseComplete:e,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},Tween.fromTo=function fromTo(t,e,r){return new Tween(t,ca(arguments,2))},Tween.set=function set(t,e){return e.duration=0,e.repeatDelay||(e.repeat=0),new Tween(t,e)},Tween.killTweensOf=function killTweensOf(t,e,r){return E.killTweensOf(t,e,r)},Tween}(Lt);ha(Xt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),_("staggerTo,staggerFrom,staggerFromTo",function(r){Xt[r]=function(){var t=new Bt,e=Tt.call(arguments,0);return e.splice("staggerFromTo"===r?5:4,0,0),t[r].apply(t,e)}});function Yb(t,e,r){return t.setAttribute(e,r)}function ec(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)}var Gt=function _setterPlain(t,e,r){return t[e]=r},Zt=function _setterFunc(t,e,r){return t[e](r)},Jt=function _setterFuncWithParam(t,e,r,i){return t[e](i.fp,r)},Qt=function _getSetter(t,e){return o(t[e])?Zt:q(t[e])&&t.setAttribute?Yb:Gt},Wt=function _renderPlain(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4,e)},$t=function _renderBoolean(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Ht=function _renderComplexString(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(1===t&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round(1e4*(r.s+r.c*t))/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},Kt=function _renderPropTweens(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},te=function _addPluginModifier(t,e,r,i){for(var n,a=this._pt;a;)n=a._next,a.p===i&&a.modifier(t,e,r),a=n},ee=function _killPropTweensOf(t){for(var e,r,i=this._pt;i;)r=i._next,i.p===t&&!i.op||i.op===t?pa(this,i,"_pt"):i.dep||(e=1),i=r;return!e},re=function _sortPropTweensByPriority(t){for(var e,r,i,n,a=t._pt;a;){for(e=a._next,r=i;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:n)?a._prev._next=a:i=a,(a._next=r)?r._prev=a:n=a,a=e}t._pt=i},ie=(PropTween.prototype.modifier=function modifier(t,e,r){this.mSet=this.mSet||this.set,this.set=ec,this.m=t,this.mt=r,this.tween=e},PropTween);function PropTween(t,e,r,i,n,a,s,o,u){this.t=e,this.s=i,this.c=n,this.p=r,this.r=a||Wt,this.d=s||this,this.set=o||Gt,this.pr=u||0,(this._next=t)&&(t._prev=this)}_(ct+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(t){return ut[t]=1}),ot.TweenMax=ot.TweenLite=Xt,ot.TimelineLite=ot.TimelineMax=Bt,E=new Bt({sortChildren:!1,defaults:I,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),j.stringFilter=qb;var ne={registerPlugin:function registerPlugin(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return function _createPlugin(t){var e=(t=!t.name&&t.default||t).name,r=o(t),i=e&&!r&&t.init?function(){this._props=[]}:t,n={init:O,render:Kt,add:Yt,kill:ee,modifier:te,rawVars:0},a={targetTest:0,get:0,getSetter:Qt,aliases:{},register:0};if(Pt(),t!==i){if(ft[e])return;ha(i,ha(la(t,n),a)),mt(i.prototype,mt(n,la(t,a))),ft[i.prop=e]=i,t.targetTest&&(_t.push(i),ut[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}N(e,i),t.register&&t.register(ae,i,ie)}(t)})},timeline:function timeline(t){return new Bt(t)},getTweensOf:function getTweensOf(t,e){return E.getTweensOf(t,e)},getProperty:function getProperty(i,t,e,r){n(i)&&(i=bt(i)[0]);var a=Z(i||{}).get,s=e?ga:fa;return"native"===e&&(e=""),i?t?s((ft[t]&&ft[t].get||a)(i,t,e,r)):function(t,e,r){return s((ft[t]&&ft[t].get||a)(i,t,e,r))}:i},quickSetter:function quickSetter(r,e,i){if(1<(r=bt(r)).length){var n=r.map(function(t){return ae.quickSetter(t,e,i)}),a=n.length;return function(t){for(var e=a;e--;)n[e](t)}}r=r[0]||{};var s=ft[e],o=Z(r),u=o.harness&&(o.harness.aliases||{})[e]||e,h=s?function(t){var e=new s;c._pt=0,e.init(r,i?t+i:t,c,0,[r]),e.render(1,e),c._pt&&Kt(1,c)}:o.set(r,u);return s?h:function(t){return h(r,u,i?t+i:t,o,1)}},isTweening:function isTweening(t){return 0<E.getTweensOf(t,!0).length},defaults:function defaults(t){return t&&t.ease&&(t.ease=Rt(t.ease,I.ease)),ka(I,t||{})},config:function config(t){return ka(j,t||{})},registerEffect:function registerEffect(t){var n=t.name,i=t.effect,e=t.plugins,a=t.defaults,s=t.extendTimeline;(e||"").split(",").forEach(function(t){return t&&!ft[t]&&!ot[t]&&M(n+" effect requires "+t+" plugin.")}),dt[n]=function(t,e,r){return i(bt(t),ha(e||{},a),r)},s&&(Bt.prototype[n]=function(t,e,i){return this.add(dt[n](t,r(e)?e:(i=e)&&{},this),i)})},registerEase:function registerEase(t,e){Dt[t]=Rt(e)},parseEase:function parseEase(t,e){return arguments.length?Rt(t,e):Dt},getById:function getById(t){return E.getById(t)},exportRoot:function exportRoot(t,e){void 0===t&&(t={});var r,i,n=new Bt(t);for(n.smoothChildTiming=s(t.smoothChildTiming),E.remove(n),n._dp=0,n._time=n._tTime=E._time,r=E._first;r;)i=r._next,!e&&!r._dur&&r instanceof Xt&&r.vars.onComplete===r._targets[0]||Aa(n,r,r._start-r._delay),r=i;return Aa(E,n,0),n},utils:{wrap:function wrap(e,t,r){var i=t-e;return tt(e)?Za(e,wrap(0,e.length),t):Ja(r,function(t){return(i+(t-e)%i)%i+e})},wrapYoyo:function wrapYoyo(e,t,r){var i=t-e,n=2*i;return tt(e)?Za(e,wrapYoyo(0,e.length-1),t):Ja(r,function(t){return e+(i<(t=(n+(t-e)%n)%n||0)?n-t:t)})},distribute:Sa,random:Va,snap:Ua,normalize:function normalize(t,e,r){return wt(t,e,0,1,r)},getUnit:La,clamp:function clamp(e,r,t){return Ja(t,function(t){return yt(e,r,t)})},splitColor:lb,toArray:bt,mapRange:wt,pipe:function pipe(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function unitize(e,r){return function(t){return e(parseFloat(t))+(r||La(t))}},interpolate:function interpolate(e,r,t,i){var a=isNaN(e+r)?0:function(t){return(1-t)*e+t*r};if(!a){var s,o,u,h,l,f=n(e),d={};if(!0===t&&(i=1)&&(t=null),f)e={p:e},r={p:r};else if(tt(e)&&!tt(r)){for(u=[],h=e.length,l=h-2,o=1;o<h;o++)u.push(interpolate(e[o-1],e[o]));h--,a=function func(t){t*=h;var e=Math.min(l,~~t);return u[e](t-e)},t=r}else i||(e=mt(tt(e)?[]:{},e));if(!u){for(s in r)Yt.call(d,e,s,"get",r[s]);a=function func(t){return Kt(t,d)||(f?e.p:e)}}}return Ja(t,a)},shuffle:Ra},install:K,effects:dt,ticker:At,updateRoot:Bt.updateRoot,plugins:ft,globalTimeline:E,core:{PropTween:ie,globals:N,Tween:Xt,Timeline:Bt,Animation:Lt,getCache:Z,_removeLinkedListItem:pa}};_("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return ne[t]=Xt[t]}),At.add(Bt.updateRoot),c=ne.to({},{duration:0});function ic(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r}function kc(t,a){return{name:t,rawVars:1,init:function init(t,i,e){e._onInit=function(t){var e,r;if(n(i)&&(e={},_(i,function(t){return e[t]=1}),i=e),a){for(r in e={},i)e[r]=a(i[r]);i=e}!function _addModifiers(t,e){var r,i,n,a=t._targets;for(r in e)for(i=a.length;i--;)(n=(n=t._ptLookup[i][r])&&n.d)&&(n._pt&&(n=ic(n,r)),n&&n.modifier&&n.modifier(e[r],t,a[i],r))}(t,i)}}}}var ae=ne.registerPlugin({name:"attr",init:function init(t,e,r,i,n){var a,s;for(a in e)(s=this.add(t,"setAttribute",(t.getAttribute(a)||0)+"",e[a],i,n,0,0,a))&&(s.op=a),this._props.push(a)}},{name:"endArray",init:function init(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r])}},kc("roundProps",Ta),kc("modifiers"),kc("snap",Ua))||ne;Xt.version=Bt.version=ae.version="3.5.1",f=1,t()&&Pt();function Vc(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function Wc(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function Xc(t,e){return e.set(e.t,e.p,t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function Yc(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)}function Zc(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)}function $c(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)}function _c(t,e,r){return t.style[e]=r}function ad(t,e,r){return t.style.setProperty(e,r)}function bd(t,e,r){return t._gsap[e]=r}function cd(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r}function dd(t,e,r,i,n){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(n,a)}function ed(t,e,r,i,n){var a=t._gsap;a[e]=r,a.renderTransform(n,a)}function id(t,e){var r=oe.createElementNS?oe.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):oe.createElement(t);return r.style?r:oe.createElement(t)}function jd(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Ie,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&jd(t,Ue(e)||e,1)||""}function md(){(function _windowExists(){return"undefined"!=typeof window})()&&window.document&&(se=window,oe=se.document,ue=oe.documentElement,le=id("div")||{style:{}},fe=id("div"),Ye=Ue(Ye),Ne=Ye+"Origin",le.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",pe=!!Ue("perspective"),he=1)}function nd(t){var e,r=id("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,n=this.nextSibling,a=this.style.cssText;if(ue.appendChild(r),r.appendChild(this),this.style.display="block",t)try{e=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=nd}catch(t){}else this._gsapBBox&&(e=this._gsapBBox());return i&&(n?i.insertBefore(this,n):i.appendChild(this)),ue.removeChild(r),this.style.cssText=a,e}function od(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])}function pd(e){var r;try{r=e.getBBox()}catch(t){r=nd.call(e,!0)}return r&&(r.width||r.height)||e.getBBox===nd||(r=nd.call(e,!0)),!r||r.width||r.x||r.y?r:{x:+od(e,["x","cx","x1"])||0,y:+od(e,["y","cy","y1"])||0,width:0,height:0}}function qd(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!pd(t))}function rd(t,e){if(e){var r=t.style;e in ze&&e!==Ne&&(e=Ye),r.removeProperty?("ms"!==e.substr(0,2)&&"webkit"!==e.substr(0,6)||(e="-"+e),r.removeProperty(e.replace(Ie,"-$1").toLowerCase())):r.removeAttribute(e)}}function sd(t,e,r,i,n,a){var s=new ie(t._pt,e,r,0,1,a?$c:Zc);return(t._pt=s).b=i,s.e=n,t._props.push(r),s}function ud(t,e,r,i){var n,a,s,o,u=parseFloat(r)||0,h=(r+"").trim().substr((u+"").length)||"px",l=le.style,f=Le.test(e),d="svg"===t.tagName.toLowerCase(),p=(d?"client":"offset")+(f?"Width":"Height"),_="px"===i,c="%"===i;return i===h||!u||Ve[i]||Ve[h]?u:("px"===h||_||(u=ud(t,e,r,"px")),o=t.getCTM&&qd(t),c&&(ze[e]||~e.indexOf("adius"))?aa(u/(o?t.getBBox()[f?"width":"height"]:t[p])*100):(l[f?"width":"height"]=100+(_?h:i),a=~e.indexOf("adius")||"em"===i&&t.appendChild&&!d?t:t.parentNode,o&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==oe&&a.appendChild||(a=oe.body),(s=a._gsap)&&c&&s.width&&f&&s.time===At.time?aa(u/s.width*100):(!c&&"%"!==h||(l.position=jd(t,"position")),a===t&&(l.position="static"),a.appendChild(le),n=le[p],a.removeChild(le),l.position="absolute",f&&c&&((s=Z(a)).time=At.time,s.width=a[p]),aa(_?n*u/100:n&&u?100/n*u:0))))}function vd(t,e,r,i){var n;return he||md(),e in qe&&"transform"!==e&&~(e=qe[e]).indexOf(",")&&(e=e.split(",")[0]),ze[e]&&"transform"!==e?(n=Qe(t,i),n="transformOrigin"!==e?n[e]:We(jd(t,Ne))+" "+n.zOrigin+"px"):(n=t.style[e])&&"auto"!==n&&!i&&!~(n+"").indexOf("calc(")||(n=Ge[e]&&Ge[e](t,e,r)||jd(t,e)||$(t,e)||("opacity"===e?1:0)),r&&!~(n+"").indexOf(" ")?ud(t,e,n,r)+r:n}function wd(t,e,r,i){if(!r||"none"===r){var n=Ue(e,t,1),a=n&&jd(t,n,1);a&&a!==r?(e=n,r=a):"borderColor"===e&&(r=jd(t,"borderTopColor"))}var s,o,u,h,l,f,d,p,_,c,m,g,v=new ie(this._pt,t.style,e,0,1,Ht),y=0,T=0;if(v.b=r,v.e=i,r+="","auto"===(i+="")&&(t.style[e]=i,i=jd(t,e)||i,t.style[e]=r),qb(s=[r,i]),i=s[1],u=(r=s[0]).match(it)||[],(i.match(it)||[]).length){for(;o=it.exec(i);)d=o[0],_=i.substring(y,o.index),l?l=(l+1)%5:"rgba("!==_.substr(-5)&&"hsla("!==_.substr(-5)||(l=1),d!==(f=u[T++]||"")&&(h=parseFloat(f)||0,m=f.substr((h+"").length),(g="="===d.charAt(1)?+(d.charAt(0)+"1"):0)&&(d=d.substr(2)),p=parseFloat(d),c=d.substr((p+"").length),y=it.lastIndex-c.length,c||(c=c||j.units[e]||m,y===i.length&&(i+=c,v.e+=c)),m!==c&&(h=ud(t,e,f,c)||0),v._pt={_next:v._pt,p:_||1===T?_:",",s:h,c:g?g*p:p-h,m:l&&l<4?Math.round:0});v.c=y<i.length?i.substring(y,i.length):""}else v.r="display"===e&&"none"===i?$c:Zc;return at.test(i)&&(v.e=0),this._pt=v}function yd(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return"top"!==r&&"bottom"!==r&&"left"!==i&&"right"!==i||(t=r,r=i,i=t),e[0]=Xe[r]||r,e[1]=Xe[i]||i,e.join(" ")}function zd(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,i,n,a=e.t,s=a.style,o=e.u,u=a._gsap;if("all"===o||!0===o)s.cssText="",i=1;else for(n=(o=o.split(",")).length;-1<--n;)r=o[n],ze[r]&&(i=1,r="transformOrigin"===r?Ne:Ye),rd(a,r);i&&(rd(a,Ye),u&&(u.svg&&a.removeAttribute("transform"),Qe(a,1),u.uncache=1))}}function Dd(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t}function Ed(t){var e=jd(t,Ye);return Dd(e)?Ze:e.substr(7).match(rt).map(aa)}function Fd(t,e){var r,i,n,a,s=t._gsap||Z(t),o=t.style,u=Ed(t);return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(n=t.transform.baseVal.consolidate().matrix).a,n.b,n.c,n.d,n.e,n.f]).join(",")?Ze:u:(u!==Ze||t.offsetParent||t===ue||s.svg||(n=o.display,o.display="block",(r=t.parentNode)&&t.offsetParent||(a=1,i=t.nextSibling,ue.appendChild(t)),u=Ed(t),n?o.display=n:rd(t,"display"),a&&(i?r.insertBefore(t,i):r?r.appendChild(t):ue.removeChild(t))),e&&6<u.length?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)}function Gd(t,e,r,i,n,a){var s,o,u,h=t._gsap,l=n||Fd(t,!0),f=h.xOrigin||0,d=h.yOrigin||0,p=h.xOffset||0,_=h.yOffset||0,c=l[0],m=l[1],g=l[2],v=l[3],y=l[4],T=l[5],b=e.split(" "),w=parseFloat(b[0])||0,x=parseFloat(b[1])||0;r?l!==Ze&&(o=c*v-m*g)&&(u=w*(-m/o)+x*(c/o)-(c*T-m*y)/o,w=w*(v/o)+x*(-g/o)+(g*T-v*y)/o,x=u):(w=(s=pd(t)).x+(~b[0].indexOf("%")?w/100*s.width:w),x=s.y+(~(b[1]||b[0]).indexOf("%")?x/100*s.height:x)),i||!1!==i&&h.smooth?(y=w-f,T=x-d,h.xOffset=p+(y*c+T*g)-y,h.yOffset=_+(y*m+T*v)-T):h.xOffset=h.yOffset=0,h.xOrigin=w,h.yOrigin=x,h.smooth=!!i,h.origin=e,h.originIsAbsolute=!!r,t.style[Ne]="0px 0px",a&&(sd(a,h,"xOrigin",f,w),sd(a,h,"yOrigin",d,x),sd(a,h,"xOffset",p,h.xOffset),sd(a,h,"yOffset",_,h.yOffset)),t.setAttribute("data-svg-origin",w+" "+x)}function Jd(t,e,r){var i=La(e);return aa(parseFloat(e)+parseFloat(ud(t,"x",r+"px",i)))+i}function Qd(t,e,r,i,a,s){var o,u,h=360,l=n(a),f=parseFloat(a)*(l&&~a.indexOf("rad")?Fe:1),d=s?f*s:f-i,p=i+d+"deg";return l&&("short"===(o=a.split("_")[1])&&(d%=h)!==d%180&&(d+=d<0?h:-h),"cw"===o&&d<0?d=(d+36e9)%h-~~(d/h)*h:"ccw"===o&&0<d&&(d=(d-36e9)%h-~~(d/h)*h)),t._pt=u=new ie(t._pt,e,r,i,d,Wc),u.e=p,u.u="deg",t._props.push(r),u}function Rd(t,e,r){var i,n,a,s,o,u,h,l=fe.style,f=r._gsap;for(n in l.cssText=getComputedStyle(r).cssText+";position:absolute;display:block;",l[Ye]=e,oe.body.appendChild(fe),i=Qe(fe,1),ze)(a=f[n])!==(s=i[n])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(n)<0&&(o=La(a)!==(h=La(s))?ud(r,n,a,h):parseFloat(a),u=parseFloat(s),t._pt=new ie(t._pt,f,n,o,u-o,Vc),t._pt.u=h||0,t._props.push(n));oe.body.removeChild(fe)}var se,oe,ue,he,le,fe,de,pe,_e=Dt.Power0,ce=Dt.Power1,me=Dt.Power2,ge=Dt.Power3,ve=Dt.Power4,ye=Dt.Linear,Te=Dt.Quad,be=Dt.Cubic,we=Dt.Quart,xe=Dt.Quint,ke=Dt.Strong,Oe=Dt.Elastic,Me=Dt.Back,Ce=Dt.SteppedEase,Ae=Dt.Bounce,Pe=Dt.Sine,De=Dt.Expo,Se=Dt.Circ,ze={},Fe=180/Math.PI,Re=Math.PI/180,Ee=Math.atan2,Ie=/([A-Z])/g,Le=/(?:left|right|width|margin|padding|x)/i,Be=/[\s,\(]\S/,qe={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ye="transform",Ne=Ye+"Origin",je="O,Moz,ms,Ms,Webkit".split(","),Ue=function _checkPropPrefix(t,e,r){var i=(e||le).style,n=5;if(t in i&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);n--&&!(je[n]+t in i););return n<0?null:(3===n?"ms":0<=n?je[n]:"")+t},Ve={deg:1,rad:1,turn:1},Xe={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Ge={clearProps:function clearProps(t,e,r,i,n){if("isFromStart"!==n.data){var a=t._pt=new ie(t._pt,e,r,0,0,zd);return a.u=i,a.pr=-10,a.tween=n,t._props.push(r),1}}},Ze=[1,0,0,1,0,0],Je={},Qe=function _parseTransform(t,e){var r=t._gsap||new It(t);if("x"in r&&!e&&!r.uncache)return r;var i,n,a,s,o,u,h,l,f,d,p,_,c,m,g,v,y,T,b,w,x,k,O,M,C,A,P,D,S,z,F,R,E=t.style,I=r.scaleX<0,L="deg",B=jd(t,Ne)||"0";return i=n=a=u=h=l=f=d=p=0,s=o=1,r.svg=!(!t.getCTM||!qd(t)),m=Fd(t,r.svg),r.svg&&(M=!r.uncache&&t.getAttribute("data-svg-origin"),Gd(t,M||B,!!M||r.originIsAbsolute,!1!==r.smooth,m)),_=r.xOrigin||0,c=r.yOrigin||0,m!==Ze&&(T=m[0],b=m[1],w=m[2],x=m[3],i=k=m[4],n=O=m[5],6===m.length?(s=Math.sqrt(T*T+b*b),o=Math.sqrt(x*x+w*w),u=T||b?Ee(b,T)*Fe:0,(f=w||x?Ee(w,x)*Fe+u:0)&&(o*=Math.cos(f*Re)),r.svg&&(i-=_-(_*T+c*w),n-=c-(_*b+c*x))):(R=m[6],z=m[7],P=m[8],D=m[9],S=m[10],F=m[11],i=m[12],n=m[13],a=m[14],h=(g=Ee(R,S))*Fe,g&&(M=k*(v=Math.cos(-g))+P*(y=Math.sin(-g)),C=O*v+D*y,A=R*v+S*y,P=k*-y+P*v,D=O*-y+D*v,S=R*-y+S*v,F=z*-y+F*v,k=M,O=C,R=A),l=(g=Ee(-w,S))*Fe,g&&(v=Math.cos(-g),F=x*(y=Math.sin(-g))+F*v,T=M=T*v-P*y,b=C=b*v-D*y,w=A=w*v-S*y),u=(g=Ee(b,T))*Fe,g&&(M=T*(v=Math.cos(g))+b*(y=Math.sin(g)),C=k*v+O*y,b=b*v-T*y,O=O*v-k*y,T=M,k=C),h&&359.9<Math.abs(h)+Math.abs(u)&&(h=u=0,l=180-l),s=aa(Math.sqrt(T*T+b*b+w*w)),o=aa(Math.sqrt(O*O+R*R)),g=Ee(k,O),f=2e-4<Math.abs(g)?g*Fe:0,p=F?1/(F<0?-F:F):0),r.svg&&(M=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!Dd(jd(t,Ye)),M&&t.setAttribute("transform",M))),90<Math.abs(f)&&Math.abs(f)<270&&(I?(s*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(o*=-1,f+=f<=0?180:-180)),r.x=((r.xPercent=i&&Math.round(t.offsetWidth/2)===Math.round(-i)?-50:0)?0:i)+"px",r.y=((r.yPercent=n&&Math.round(t.offsetHeight/2)===Math.round(-n)?-50:0)?0:n)+"px",r.z=a+"px",r.scaleX=aa(s),r.scaleY=aa(o),r.rotation=aa(u)+L,r.rotationX=aa(h)+L,r.rotationY=aa(l)+L,r.skewX=f+L,r.skewY=d+L,r.transformPerspective=p+"px",(r.zOrigin=parseFloat(B.split(" ")[2])||0)&&(E[Ne]=We(B)),r.xOffset=r.yOffset=0,r.force3D=j.force3D,r.renderTransform=r.svg?rr:pe?er:$e,r.uncache=0,r},We=function _firstTwoOnly(t){return(t=t.split(" "))[0]+" "+t[1]},$e=function _renderNon3DTransforms(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,er(t,e)},He="0deg",Ke="0px",tr=") ",er=function _renderCSSTransforms(t,e){var r=e||this,i=r.xPercent,n=r.yPercent,a=r.x,s=r.y,o=r.z,u=r.rotation,h=r.rotationY,l=r.rotationX,f=r.skewX,d=r.skewY,p=r.scaleX,_=r.scaleY,c=r.transformPerspective,m=r.force3D,g=r.target,v=r.zOrigin,y="",T="auto"===m&&t&&1!==t||!0===m;if(v&&(l!==He||h!==He)){var b,w=parseFloat(h)*Re,x=Math.sin(w),k=Math.cos(w);w=parseFloat(l)*Re,b=Math.cos(w),a=Jd(g,a,x*b*-v),s=Jd(g,s,-Math.sin(w)*-v),o=Jd(g,o,k*b*-v+v)}c!==Ke&&(y+="perspective("+c+tr),(i||n)&&(y+="translate("+i+"%, "+n+"%) "),!T&&a===Ke&&s===Ke&&o===Ke||(y+=o!==Ke||T?"translate3d("+a+", "+s+", "+o+") ":"translate("+a+", "+s+tr),u!==He&&(y+="rotate("+u+tr),h!==He&&(y+="rotateY("+h+tr),l!==He&&(y+="rotateX("+l+tr),f===He&&d===He||(y+="skew("+f+", "+d+tr),1===p&&1===_||(y+="scale("+p+", "+_+tr),g.style[Ye]=y||"translate(0, 0)"},rr=function _renderSVGTransforms(t,e){var r,i,n,a,s,o=e||this,u=o.xPercent,h=o.yPercent,l=o.x,f=o.y,d=o.rotation,p=o.skewX,_=o.skewY,c=o.scaleX,m=o.scaleY,g=o.target,v=o.xOrigin,y=o.yOrigin,T=o.xOffset,b=o.yOffset,w=o.forceCSS,x=parseFloat(l),k=parseFloat(f);d=parseFloat(d),p=parseFloat(p),(_=parseFloat(_))&&(p+=_=parseFloat(_),d+=_),d||p?(d*=Re,p*=Re,r=Math.cos(d)*c,i=Math.sin(d)*c,n=Math.sin(d-p)*-m,a=Math.cos(d-p)*m,p&&(_*=Re,s=Math.tan(p-_),n*=s=Math.sqrt(1+s*s),a*=s,_&&(s=Math.tan(_),r*=s=Math.sqrt(1+s*s),i*=s)),r=aa(r),i=aa(i),n=aa(n),a=aa(a)):(r=c,a=m,i=n=0),(x&&!~(l+"").indexOf("px")||k&&!~(f+"").indexOf("px"))&&(x=ud(g,"x",l,"px"),k=ud(g,"y",f,"px")),(v||y||T||b)&&(x=aa(x+v-(v*r+y*n)+T),k=aa(k+y-(v*i+y*a)+b)),(u||h)&&(s=g.getBBox(),x=aa(x+u/100*s.width),k=aa(k+h/100*s.height)),s="matrix("+r+","+i+","+n+","+a+","+x+","+k+")",g.setAttribute("transform",s),w&&(g.style[Ye]=s)};_("padding,margin,Width,Radius",function(e,r){var t="Right",i="Bottom",n="Left",o=(r<3?["Top",t,i,n]:["Top"+n,"Top"+t,i+t,i+n]).map(function(t){return r<2?e+t:"border"+t+e});Ge[1<r?"border"+e:e]=function(e,t,r,i,n){var a,s;if(arguments.length<4)return a=o.map(function(t){return vd(e,t,r)}),5===(s=a.join(" ")).split(a[0]).length?a[0]:s;a=(i+"").split(" "),s={},o.forEach(function(t,e){return s[t]=a[e]=a[e]||a[(e-1)/2|0]}),e.init(t,s,n)}});var ir,nr,ar,sr={name:"css",register:md,targetTest:function targetTest(t){return t.style&&t.nodeType},init:function init(t,e,r,i,n){var a,s,o,u,h,l,f,d,p,_,c,m,g,v,y,T=this._props,b=t.style;for(f in he||md(),e)if("autoRound"!==f&&(s=e[f],!ft[f]||!Nb(f,e,r,i,t,n)))if(h=typeof s,l=Ge[f],"function"===h&&(h=typeof(s=s.call(r,i,t,n))),"string"===h&&~s.indexOf("random(")&&(s=ab(s)),l)l(this,t,f,s,r)&&(y=1);else if("--"===f.substr(0,2))this.add(b,"setProperty",getComputedStyle(t).getPropertyValue(f)+"",s+"",i,n,0,0,f);else if("undefined"!==h){if(a=vd(t,f),u=parseFloat(a),(_="string"===h&&"="===s.charAt(1)?+(s.charAt(0)+"1"):0)&&(s=s.substr(2)),o=parseFloat(s),f in qe&&("autoAlpha"===f&&(1===u&&"hidden"===vd(t,"visibility")&&o&&(u=0),sd(this,b,"visibility",u?"inherit":"hidden",o?"inherit":"hidden",!o)),"scale"!==f&&"transform"!==f&&~(f=qe[f]).indexOf(",")&&(f=f.split(",")[0])),c=f in ze)if(m||((g=t._gsap).renderTransform||Qe(t),v=!1!==e.smoothOrigin&&g.smooth,(m=this._pt=new ie(this._pt,b,Ye,0,1,g.renderTransform,g,0,-1)).dep=1),"scale"===f)this._pt=new ie(this._pt,g,"scaleY",g.scaleY,_?_*o:o-g.scaleY),T.push("scaleY",f),f+="X";else{if("transformOrigin"===f){s=yd(s),g.svg?Gd(t,s,0,v,0,this):((p=parseFloat(s.split(" ")[2])||0)!==g.zOrigin&&sd(this,g,"zOrigin",g.zOrigin,p),sd(this,b,f,We(a),We(s)));continue}if("svgOrigin"===f){Gd(t,s,1,v,0,this);continue}if(f in Je){Qd(this,g,f,u,s,_);continue}if("smoothOrigin"===f){sd(this,g,"smooth",g.smooth,s);continue}if("force3D"===f){g[f]=s;continue}if("transform"===f){Rd(this,s,t);continue}}else f in b||(f=Ue(f)||f);if(c||(o||0===o)&&(u||0===u)&&!Be.test(s)&&f in b)o=o||0,(d=(a+"").substr((u+"").length))!==(p=La(s)||(f in j.units?j.units[f]:d))&&(u=ud(t,f,a,p)),this._pt=new ie(this._pt,c?g:b,f,u,_?_*o:o-u,"px"!==p||!1===e.autoRound||c?Vc:Yc),this._pt.u=p||0,d!==p&&(this._pt.b=a,this._pt.r=Xc);else if(f in b)wd.call(this,t,f,a,s);else{if(!(f in t)){L(f,s);continue}this.add(t,f,t[f],s,i,n)}T.push(f)}y&&re(this)},get:vd,aliases:qe,getSetter:function getSetter(t,e,r){var i=qe[e];return i&&i.indexOf(",")<0&&(e=i),e in ze&&e!==Ne&&(t._gsap.x||vd(t,"x"))?r&&de===r?"scale"===e?cd:bd:(de=r||{})&&("scale"===e?dd:ed):t.style&&!q(t.style[e])?_c:~e.indexOf("-")?ad:Qt(t,e)},core:{_removeProperty:rd,_getMatrix:Fd}};ae.utils.checkPrefix=Ue,ar=_((ir="x,y,z,scale,scaleX,scaleY,xPercent,yPercent")+","+(nr="rotation,rotationX,rotationY,skewX,skewY")+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){ze[t]=1}),_(nr,function(t){j.units[t]="deg",Je[t]=1}),qe[ar[13]]=ir+","+nr,_("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");qe[e[1]]=ar[e[0]]}),_("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){j.units[t]="px"}),ae.registerPlugin(sr);var or=ae.registerPlugin(sr)||ae,ur=or.core.Tween;e.Back=Me,e.Bounce=Ae,e.CSSPlugin=sr,e.Circ=Se,e.Cubic=be,e.Elastic=Oe,e.Expo=De,e.Linear=ye,e.Power0=_e,e.Power1=ce,e.Power2=me,e.Power3=ge,e.Power4=ve,e.Quad=Te,e.Quart=we,e.Quint=xe,e.Sine=Pe,e.SteppedEase=Ce,e.Strong=ke,e.TimelineLite=Bt,e.TimelineMax=Bt,e.TweenLite=Xt,e.TweenMax=ur,e.default=or,e.gsap=or;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});


/*!
 * ScrollTrigger 3.5.1
 * https://greensock.com
 * 
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).window=e.window||{})}(this,function(e){"use strict";function H(e){return e}function I(){return"undefined"!=typeof window}function J(){return Me||I()&&(Me=window.gsap)&&Me.registerPlugin&&Me}function K(e){return!!~i.indexOf(e)}function L(e,t){return~Fe.indexOf(e)&&Fe[Fe.indexOf(e)+1][t]}function M(t,e){var r=e.s,n=e.sc,o=h.indexOf(t),i=n===rt.sc?1:2;return~o||(o=h.push(t)-1),h[o+i]||(h[o+i]=L(t,r)||(K(t)?n:function(e){return arguments.length?t[r]=e:t[r]}))}function N(e){return L(e,"getBoundingClientRect")||(K(e)?function(){return ut.width=ke.innerWidth,ut.height=ke.innerHeight,ut}:function(){return nt(e)})}function Q(e,t){var r=t.s,n=t.d2,o=t.d,i=t.a;return(r="scroll"+n)&&(i=L(e,r))?i()-N(e)()[o]:K(e)?Math.max(_e[r],Oe[r])-(ke["inner"+n]||_e["client"+n]||Oe["client"+n]):e[r]-e["offset"+n]}function R(e,t){for(var r=0;r<p.length;r+=3)t&&!~t.indexOf(p[r+1])||e(p[r],p[r+1],p[r+2])}function S(e){return"string"==typeof e}function T(e){return"function"==typeof e}function U(e){return"number"==typeof e}function V(e){return"object"==typeof e}function W(e){return T(e)&&e()}function X(r,n){return function(){var e=W(r),t=W(n);return function(){W(e),W(t)}}}function qa(e){return ke.getComputedStyle(e)}function sa(e,t){for(var r in t)r in e||(e[r]=t[r]);return e}function ua(e,t){var r=t.d2;return e["offset"+r]||e["client"+r]||0}function wa(t,r,e,n){return e.split(",").forEach(function(e){return t(r,e,n)})}function xa(e,t,r){return e.addEventListener(t,r,{passive:!0})}function ya(e,t,r){return e.removeEventListener(t,r)}function Ca(e,t){if(S(e)){var r=e.indexOf("="),n=~r?(e.charAt(r-1)+1)*parseFloat(e.substr(r+1)):0;n&&(e.indexOf("%")>r&&(n*=t/100),e=e.substr(0,r-1)),e=n+(e in m?m[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e}function Da(e,t,r,n,o,i,a){var s=o.startColor,l=o.endColor,c=o.fontSize,u=o.indent,f=o.fontWeight,d=Pe.createElement("div"),p=K(r)||"fixed"===L(r,"pinType"),g=-1!==e.indexOf("scroller"),h=p?Oe:r,v=-1!==e.indexOf("start"),b=v?s:l,m="border-color:"+b+";font-size:"+c+";color:"+b+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return m+="position:"+(g&&p?"fixed;":"absolute;"),!g&&p||(m+=(n===rt?x:y)+":"+(i+parseFloat(u))+"px;"),a&&(m+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),d._isStart=v,d.setAttribute("class","gsap-marker-"+e),d.style.cssText=m,d.innerText=t||0===t?e+"-"+t:e,h.insertBefore(d,h.children[0]),d._offset=d["offset"+n.op.d2],w(d,0,n,v),d}function Ha(){return l=l||s(B)}function Ia(){l||(l=s(B),De||_("scrollStart"),De=He())}function Ja(){return!Re&&a.restart(!0)}function Pa(e){var t,r=Me.ticker.frame,n=[],o=0;if(g!==r||Be){for(A();o<P.length;o+=4)(t=ke.matchMedia(P[o]).matches)!==P[o+3]&&((P[o+3]=t)?n.push(o):A(1,P[o])||T(P[o+2])&&P[o+2]());for(E(),o=0;o<n.length;o++)t=n[o],We=P[t],P[t+2]=P[t+1](e);z(We=0,1),g=r,_("matchMedia")}}function Qa(){return ya(Z,"scrollEnd",Qa)||z(!0)}function ab(e,t,r,n){if(e.parentNode!==t){for(var o,i=F.length,a=t.style,s=e.style;i--;)a[o=F[i]]=r[o];a.position="absolute"===r.position?"absolute":"relative","inline"===r.display&&(a.display="inline-block"),s[y]=s[x]="auto",a.overflow="visible",a.boxSizing="border-box",a[Ke]=ua(e,tt)+et,a[je]=ua(e,rt)+et,a[Ze]=s[$e]=s.top=s[b]="0",ct(n),s[Ke]=s.maxWidth=r[Ke],s[je]=s.maxHeight=r[je],s[Ze]=r[Ze],e.parentNode.insertBefore(t,e),t.appendChild(e)}}function db(e){for(var t=D.length,r=e.style,n=[],o=0;o<t;o++)n.push(D[o],r[D[o]]);return n.t=e,n}function gb(e,t,r,n,o,i,a,s,l,c,u,f){if(T(e)&&(e=e(s)),S(e)&&"max"===e.substr(0,3)&&(e=f+("="===e.charAt(4)?Ca("0"+e.substr(3),r):0)),U(e))a&&w(a,r,n,!0);else{T(t)&&(t=t(s));var d,p,g,h=Ee(t)[0]||Oe,v=nt(h)||{},b=e.split(" ");v&&(v.left||v.top)||"none"!==qa(h).display||(g=h.style.display,h.style.display="block",v=nt(h),g?h.style.display=g:h.style.removeProperty("display")),d=Ca(b[0],v[n.d]),p=Ca(b[1]||"0",r),e=v[n.p]-l[n.p]-c+d+o-p,a&&w(a,p,n,r-p<20||a._isStart&&20<p),r-=r-p}if(i){var m=e+r,x=i._isStart;f="scroll"+n.d2,w(i,m,n,x&&20<m||!x&&(u?Math.max(Oe[f],_e[f]):i.parentNode[f])<=m+1),u&&(l=nt(a),u&&(i.style[n.op.p]=l[n.op.p]-n.op.m-i._offset+et))}return Math.round(e)}function ib(e,t,r,n){if(e.parentNode!==t){var o,i,a=e.style;if(t===Oe){for(o in e._stOrig=a.cssText,i=qa(e))+o||Y.test(o)||!i[o]||"string"!=typeof a[o]||"0"===o||(a[o]=i[o]);a.top=r,a.left=n}else a.cssText=e._stOrig;Me.core.getCache(e).uncache=1,t.appendChild(e)}}function jb(l,e){var c,u,f=M(l,e),d="_scroll"+e.p2;return l[d]=f,function getTween(e,t,r,n,o){var i=getTween.tween,a=t.onComplete,s={};return i&&i.kill(),c=Math.round(r),t[d]=e,(t.modifiers=s)[d]=function(e){return(e=Math.round(f()))!==c&&e!==u?(i.kill(),getTween.tween=0):e=r+n*i.ratio+o*i.ratio*i.ratio,u=c,c=Math.round(e)},t.onComplete=function(){getTween.tween=0,a&&a.call(i)},i=getTween.tween=Me.to(l,t)}}var Me,o,ke,Pe,_e,Oe,i,a,s,l,Ee,Le,Ie,c,Re,Ae,u,ze,f,d,p,Ne,qe,We,g,Be=1,Fe=[],h=[],He=Date.now,v=He(),De=0,Je=1,Qe=Math.abs,t="scrollLeft",r="scrollTop",b="left",x="right",y="bottom",Ke="width",je="height",Ve="Right",Xe="Left",Ue="Top",Ye="Bottom",Ze="padding",$e="margin",Ge="Width",n="Height",et="px",tt={s:t,p:b,p2:Xe,os:x,os2:Ve,d:Ke,d2:Ge,a:"x",sc:function sc(e){return arguments.length?ke.scrollTo(e,rt.sc()):ke.pageXOffset||Pe[t]||_e[t]||Oe[t]||0}},rt={s:r,p:"top",p2:Ue,os:y,os2:Ye,d:je,d2:n,a:"y",op:tt,sc:function sc(e){return arguments.length?ke.scrollTo(tt.sc(),e):ke.pageYOffset||Pe[r]||_e[r]||Oe[r]||0}},nt=function _getBounds(e,t){var r=t&&"matrix(1, 0, 0, 1, 0, 0)"!==qa(e)[u]&&Me.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),n=e.getBoundingClientRect();return r&&r.progress(0).kill(),n},ot={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},it={toggleActions:"play",anticipatePin:0},m={top:0,left:0,center:.5,bottom:1,right:1},w=function _positionMarker(e,t,r,n){var o={display:"block"},i=r[n?"os2":"p2"],a=r[n?"p2":"os2"];e._isFlipped=n,o[r.a+"Percent"]=n?-100:0,o[r.a]=n?1:0,o["border"+i+Ge]=1,o["border"+a+Ge]=0,o[r.p]=t,Me.set(e,o)},at=[],st={},C={},k=[],P=[],_=function _dispatch(e){return C[e]&&C[e].map(function(e){return e()})||k},O=[],E=function _revertRecorded(e){for(var t=0;t<O.length;t+=4)e&&O[t+3]!==e||(O[t].style.cssText=O[t+1],O[t+2].uncache=1)},A=function _revertAll(e,t){var r;for(ze=0;ze<at.length;ze++)r=at[ze],t&&r.media!==t||(e?r.kill(1):(r.scroll.rec||(r.scroll.rec=r.scroll()),r.revert()));E(t),t||_("revert")},z=function _refreshAll(e,t){if(!De||e){var r=_("refreshInit");for(Ne&&Z.sort(),t||A(),ze=0;ze<at.length;ze++)at[ze].refresh();for(r.forEach(function(e){return e&&e.render&&e.render(-1)}),ze=at.length;ze--;)at[ze].scroll.rec=0;a.pause(),_("refresh")}else xa(Z,"scrollEnd",Qa)},q=0,lt=1,B=function _updateAll(){var e=at.length,t=He(),r=50<=t-v,n=e&&at[0].scroll();if(lt=n<q?-1:1,q=n,r&&(De&&!Ae&&200<t-De&&(De=0,_("scrollEnd")),Ie=v,v=t),lt<0){for(ze=e;ze--;)at[ze]&&at[ze].update(0,r);lt=1}else for(ze=0;ze<e;ze++)at[ze]&&at[ze].update(0,r);l=0},F=[b,"top",y,x,$e+Ye,$e+Ve,$e+Ue,$e+Xe,"display","flexShrink","float"],D=F.concat([Ke,je,"boxSizing","max"+Ge,"max"+n,"position",$e,Ze,Ze+Ue,Ze+Ve,Ze+Ye,Ze+Xe]),j=/([A-Z])/g,ct=function _setState(e){if(e)for(var t,r,n=e.t.style,o=e.length,i=0;i<o;i+=2)r=e[i+1],t=e[i],r?n[t]=r:n[t]&&n.removeProperty(t.replace(j,"-$1").toLowerCase())},ut={left:0,top:0},Y=/(?:webkit|moz|length|cssText)/i;tt.op=rt;var Z=(ScrollTrigger.prototype.init=function init(x,y){if(this.progress=0,this.vars&&this.kill(1),Je){var p,n,l,w,C,k,P,_,O,E,I,R,e,A,z,q,W,B,t,F,g,D,J,h,j,v,b,r,m,X,Y,o,c,Z,$,G,ee,te=(x=sa(S(x)||U(x)||x.nodeType?{trigger:x}:x,it)).horizontal?tt:rt,re=x.onUpdate,ne=x.toggleClass,i=x.id,oe=x.onToggle,ie=x.onRefresh,a=x.scrub,ae=x.trigger,se=x.pin,le=x.pinSpacing,ce=x.invalidateOnRefresh,ue=x.anticipatePin,s=x.onScrubComplete,u=x.onSnapComplete,fe=x.once,de=x.snap,pe=x.pinReparent,ge=!a&&0!==a,he=Ee(x.scroller||ke)[0],f=Me.core.getCache(he),ve=K(he),be="pinType"in x?"fixed"===x.pinType:ve||"fixed"===L(he,"pinType"),me=[x.onEnter,x.onLeave,x.onEnterBack,x.onLeaveBack],xe=ge&&x.toggleActions.split(" "),d="markers"in x?x.markers:it.markers,ye=ve?0:parseFloat(qa(he)["border"+te.p2+Ge])||0,Te=this,we=x.onRefreshInit&&function(){return x.onRefreshInit(Te)},Se=function _getSizeFunc(e,t,r){var n=r.d,o=r.d2,i=r.a;return(i=L(e,"getBoundingClientRect"))?function(){return i()[n]}:function(){return(t?ke["inner"+o]:e["client"+o])||0}}(he,ve,te),Ce=function _getOffsetsFunc(e,t){return!t||~Fe.indexOf(e)?N(e):function(){return ut}}(he,ve);Te.media=We,ue*=45,at.push(Te),Te.scroller=he,Te.scroll=M(he,te),C=Te.scroll(),Te.vars=x,y=y||x.animation,"refreshPriority"in x&&(Ne=1),f.tweenScroll=f.tweenScroll||{top:jb(he,rt),left:jb(he,tt)},Te.tweenTo=p=f.tweenScroll[te.p],y&&(y.vars.lazy=!1,y._initted||!1!==y.vars.immediateRender&&!1!==x.immediateRender&&y.render(0,!0,!0),Te.animation=y.pause(),y.scrollTrigger=Te,(o=U(a)&&a)&&(Y=Me.to(y,{ease:"power3",duration:o,onComplete:function onComplete(){return s&&s(Te)}})),m=0,i=i||y.vars.id),de&&(V(de)||(de={snapTo:de}),Me.set(ve?[Oe,_e]:he,{scrollBehavior:"auto"}),l=T(de.snapTo)?de.snapTo:"labels"===de.snapTo?function _getLabels(i){return function(e){var t,r=[],n=i.labels,o=i.duration();for(t in n)r.push(n[t]/o);return Me.utils.snap(r,e)}}(y):Me.utils.snap(de.snapTo),c=de.duration||{min:.1,max:2},c=V(c)?Le(c.min,c.max):Le(c,c),Z=Me.delayedCall(de.delay||o/2||.1,function(){if(Math.abs(Te.getVelocity())<10&&!Ae){var e=y&&!ge?y.totalProgress():Te.progress,t=(e-X)/(He()-Ie)*1e3||0,r=Qe(t/2)*t/.185,n=e+r,o=Le(0,1,l(n,Te)),i=Te.scroll(),a=Math.round(P+o*A),s=p.tween;if(i<=_&&P<=i&&a!==i){if(s&&!s._initted&&s.data<=Math.abs(a-i))return;p(a,{duration:c(Qe(.185*Math.max(Qe(n-e),Qe(o-e))/t/.05||0)),ease:de.ease||"power3",data:Math.abs(a-i),onComplete:function onComplete(){m=X=y&&!ge?y.totalProgress():Te.progress,u&&u(Te)}},i,r*A,a-i-r*A)}}else Te.isActive&&Z.restart(!0)}).pause()),i&&(st[i]=Te),ae=Te.trigger=Ee(ae||se)[0],se=!0===se?ae:Ee(se)[0],S(ne)&&(ne={targets:ae,className:ne}),se&&(!1===le||le===$e||(le=!(!le&&"flex"===qa(se.parentNode).display)&&Ze),Te.pin=se,!1!==x.force3D&&Me.set(se,{force3D:!0}),(n=Me.core.getCache(se)).spacer?z=n.pinState:(n.spacer=B=Pe.createElement("div"),B.setAttribute("class","pin-spacer"+(i?" pin-spacer-"+i:"")),n.pinState=z=db(se)),Te.spacer=B=n.spacer,r=qa(se),h=r[le+te.os2],F=Me.getProperty(se),g=Me.quickSetter(se,te.a,et),ab(se,B,r),W=db(se)),d&&(e=V(d)?sa(d,ot):ot,I=Da("scroller-start",i,he,te,e,0),R=Da("scroller-end",i,he,te,e,0,I),t=I["offset"+te.op.d2],O=Da("start",i,he,te,e,t),E=Da("end",i,he,te,e,t),be||(function _makePositionable(e){e.style.position="absolute"===qa(e).position?"absolute":"relative"}(he),Me.set([I,R],{force3D:!0}),v=Me.quickSetter(I,te.a,et),b=Me.quickSetter(R,te.a,et))),Te.revert=function(e){var t=!1!==e||!Te.enabled,r=Re;t!==w&&(t&&(G=Math.max(Te.scroll(),Te.scroll.rec||0),$=Te.progress,ee=y&&y.progress()),O&&[O,E,I,R].forEach(function(e){return e.style.display=t?"none":"block"}),t&&(Re=1),Te.update(t),Re=r,se&&(t?function _swapPinOut(e,t,r){if(ct(r),e.parentNode===t){var n=t.parentNode;n&&(n.insertBefore(e,t),n.removeChild(t))}}(se,B,z):pe&&Te.isActive||ab(se,B,qa(se),j)),w=t)},Te.refresh=function(e){if(!Re&&Te.enabled)if(se&&e&&De)xa(ScrollTrigger,"scrollEnd",Qa);else{Re=1,Y&&Y.kill(),ce&&y&&y.progress(0).invalidate(),w||Te.revert();for(var t,r,n,o,i,a,s,l,c=Se(),u=Ce(),f=Q(he,te),d=0,p=0,g=x.end,h=x.endTrigger||ae,v=x.start||(0===x.start?0:se||!ae?"0 0":"0 100%"),b=ae&&Math.max(0,at.indexOf(Te))||0,m=b;m--;)!(s=at[m].pin)||s!==ae&&s!==se||at[m].revert();for(P=gb(v,ae,c,te,Te.scroll(),O,I,Te,u,ye,be,f)||(se?-.001:0),T(g)&&(g=g(Te)),S(g)&&!g.indexOf("+=")&&(~g.indexOf(" ")?g=(S(v)?v.split(" ")[0]:"")+g:(d=Ca(g.substr(2),c),g=S(v)?v:P+d,h=ae)),_=Math.max(P,gb(g||(h?"100% 0":f),h,c,te,Te.scroll()+d,E,R,Te,u,ye,be,f))||-.001,A=_-P||(P-=.01)&&.001,d=0,m=b;m--;)(s=(a=at[m]).pin)&&a.start-a._pinPush<P&&(t=a.end-a.start,s===ae&&(d+=t),s===se&&(p+=t));if(P+=d,_+=d,Te._pinPush=p,O&&d&&((t={})[te.a]="+="+d,Me.set([O,E],t)),se)t=qa(se),o=te===rt,n=Te.scroll(),D=parseFloat(F(te.a))+p,!f&&1<_&&((ve?Oe:he).style["overflow-"+te.a]="scroll"),ab(se,B,t),W=db(se),r=nt(se,!0),l=be&&M(he,o?tt:rt)(),le&&((j=[le+te.os2,A+p+et]).t=B,(m=le===Ze?ua(se,te)+A+p:0)&&j.push(te.d,m+et),ct(j),be&&Te.scroll(G)),be&&((i={top:r.top+(o?n-P:l)+et,left:r.left+(o?l:n-P)+et,boxSizing:"border-box",position:"fixed"})[Ke]=i.maxWidth=Math.ceil(r.width)+et,i[je]=i.maxHeight=Math.ceil(r.height)+et,i[$e]=i[$e+Ue]=i[$e+Ve]=i[$e+Ye]=i[$e+Xe]="0",i[Ze]=t[Ze],i[Ze+Ue]=t[Ze+Ue],i[Ze+Ve]=t[Ze+Ve],i[Ze+Ye]=t[Ze+Ye],i[Ze+Xe]=t[Ze+Xe],q=function _copyState(e,t,r){for(var n,o=[],i=e.length,a=r?8:0;a<i;a+=2)n=e[a],o.push(n,n in t?t[n]:e[a+1]);return o.t=e.t,o}(z,i,pe)),y?(y.progress(1,!0),J=F(te.a)-D+A+p,A!==J&&q.splice(q.length-2,2),y.progress(0,!0)):J=A;else if(ae&&Te.scroll())for(r=ae.parentNode;r&&r!==Oe;)r._pinOffset&&(P-=r._pinOffset,_-=r._pinOffset),r=r.parentNode;for(m=0;m<b;m++)!(a=at[m].pin)||a!==ae&&a!==se||at[m].revert(!1);Te.start=P,Te.end=_,(C=k=Te.scroll())<G&&Te.scroll(G),Te.revert(!1),Re=0,ee&&ge&&y.progress(ee,!0),$!==Te.progress&&(Y&&y.totalProgress($,!0),Te.progress=$,Te.update()),se&&le&&(B._pinOffset=Math.round(Te.progress*J)),ie&&ie(Te)}},Te.getVelocity=function(){return(Te.scroll()-k)/(He()-Ie)*1e3||0},Te.update=function(e,t){var r,n,o,i,a,s=Te.scroll(),l=e?0:(s-P)/A,c=l<0?0:1<l?1:l||0,u=Te.progress;if(t&&(k=C,C=s,de&&(X=m,m=y&&!ge?y.totalProgress():c)),ue&&!c&&se&&!Re&&!Be&&De&&P<s+(s-k)/(He()-Ie)*ue&&(c=1e-4),c!==u&&Te.enabled){if(i=(a=(r=Te.isActive=!!c&&c<1)!=(!!u&&u<1))||!!c!=!!u,Te.direction=u<c?1:-1,Te.progress=c,ge||(!Y||Re||Be?y&&y.totalProgress(c,!!Re):(Y.vars.totalProgress=c,Y.invalidate().restart())),se)if(e&&le&&(B.style[le+te.os2]=h),be){if(i){if(o=!e&&u<c&&s<_+1&&s+1>=Q(he,te),pe)if(e||!r&&!o)ib(se,B);else{var f=nt(se,!0),d=s-P;ib(se,Oe,f.top+(te===rt?d:0)+et,f.left+(te===rt?0:d)+et)}ct(r||o?q:W),J!==A&&c<1&&r||g(D+(1!==c||o?0:J))}}else g(D+J*c);!de||p.tween||Re||Be||Z.restart(!0),ne&&(a||fe&&c&&(c<1||!qe))&&Ee(ne.targets).forEach(function(e){return e.classList[r||fe?"add":"remove"](ne.className)}),!re||ge||e||re(Te),i&&!Re?(n=c&&!u?0:1===c?1:1===u?2:3,ge&&(o=!a&&"none"!==xe[n+1]&&xe[n+1]||xe[n],y&&("complete"===o||"reset"===o||o in y)&&("complete"===o?y.pause().totalProgress(1):"reset"===o?y.restart(!0).pause():y[o]()),re&&re(Te)),!a&&qe||(oe&&a&&oe(Te),me[n]&&me[n](Te),fe&&(1===c?Te.kill(!1,1):me[n]=0),a||me[n=1===c?1:3]&&me[n](Te))):ge&&re&&!Re&&re(Te)}b&&(v(s+(I._isFlipped?1:0)),b(s))},Te.enable=function(){Te.enabled||(Te.enabled=!0,xa(he,"resize",Ja),xa(he,"scroll",Ia),we&&xa(ScrollTrigger,"refreshInit",we),y&&y.add?Me.delayedCall(.01,function(){return P||_||Te.refresh()})&&(A=.01)&&(P=_=0):Te.refresh())},Te.disable=function(e,t){if(Te.enabled&&(!1!==e&&Te.revert(),Te.enabled=Te.isActive=!1,t||Y&&Y.pause(),G=0,n&&(n.uncache=1),we&&ya(ScrollTrigger,"refreshInit",we),Z&&(Z.pause(),p.tween&&p.tween.kill()&&(p.tween=0)),!ve)){for(var r=at.length;r--;)if(at[r].scroller===he&&at[r]!==Te)return;ya(he,"resize",Ja),ya(he,"scroll",Ia)}},Te.kill=function(e,t){Te.disable(e,t),i&&delete st[i];var r=at.indexOf(Te);at.splice(r,1),r===ze&&0<lt&&ze--,y&&(y.scrollTrigger=null,e&&y.render(-1),t||y.kill()),O&&[O,E,I,R].forEach(function(e){return e.parentNode.removeChild(e)}),n&&(n.uncache=1)},Te.enable()}else this.update=this.refresh=this.kill=H},ScrollTrigger.register=function register(e){if(!o&&(Me=e||J(),I()&&window.document&&(ke=window,Pe=document,_e=Pe.documentElement,Oe=Pe.body),Me&&(Ee=Me.utils.toArray,Le=Me.utils.clamp,Me.core.globals("ScrollTrigger",ScrollTrigger),Oe))){s=ke.requestAnimationFrame||function(e){return setTimeout(e,16)},xa(ke,"mousewheel",Ia),i=[ke,Pe,_e,Oe],xa(Pe,"scroll",Ia);var t,r=Oe.style,n=r.borderTop;r.borderTop="1px solid #000",t=nt(Oe),rt.m=Math.round(t.top+rt.sc())||0,tt.m=Math.round(t.left+tt.sc())||0,n?r.borderTop=n:r.removeProperty("border-top"),c=setInterval(Ha,200),Me.delayedCall(.5,function(){return Be=0}),xa(Pe,"touchcancel",H),xa(Oe,"touchstart",H),wa(xa,Pe,"pointerdown,touchstart,mousedown",function(){return Ae=1}),wa(xa,Pe,"pointerup,touchend,mouseup",function(){return Ae=0}),u=Me.utils.checkPrefix("transform"),D.push(u),o=He(),a=Me.delayedCall(.2,z).pause(),p=[Pe,"visibilitychange",function(){var e=ke.innerWidth,t=ke.innerHeight;Pe.hidden?(f=e,d=t):f===e&&d===t||Ja()},Pe,"DOMContentLoaded",z,ke,"load",function(){return De||z()},ke,"resize",Ja],R(xa)}return o},ScrollTrigger.defaults=function defaults(e){for(var t in e)it[t]=e[t]},ScrollTrigger.kill=function kill(){Je=0,at.slice(0).forEach(function(e){return e.kill(1)})},ScrollTrigger.config=function config(e){"limitCallbacks"in e&&(qe=!!e.limitCallbacks);var t=e.syncInterval;t&&clearInterval(c)||(c=t)&&setInterval(Ha,t),"autoRefreshEvents"in e&&(R(ya)||R(xa,e.autoRefreshEvents||"none"))},ScrollTrigger.scrollerProxy=function scrollerProxy(e,t){var r=Ee(e)[0];K(r)?Fe.unshift(ke,t,Oe,t,_e,t):Fe.unshift(r,t)},ScrollTrigger.matchMedia=function matchMedia(e){var t,r,n,o,i;for(r in e)n=P.indexOf(r),o=e[r],"all"===(We=r)?o():(t=ke.matchMedia(r))&&(t.matches&&(i=o()),~n?(P[n+1]=X(P[n+1],o),P[n+2]=X(P[n+2],i)):(n=P.length,P.push(r,o,i),t.addListener?t.addListener(Pa):t.addEventListener("change",Pa)),P[n+3]=t.matches),We=0;return P},ScrollTrigger.clearMatchMedia=function clearMatchMedia(e){e||(P.length=0),0<=(e=P.indexOf(e))&&P.splice(e,4)},ScrollTrigger);function ScrollTrigger(e,t){o||ScrollTrigger.register(Me)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),this.init(e,t)}Z.version="3.5.1",Z.saveStyles=function(e){return e?Ee(e).forEach(function(e){var t=O.indexOf(e);0<=t&&O.splice(t,4),O.push(e,e.style.cssText,Me.core.getCache(e),We)}):O},Z.revert=function(e,t){return A(!e,t)},Z.create=function(e,t){return new Z(e,t)},Z.refresh=function(e){return e?Ja():z(!0)},Z.update=B,Z.maxScroll=function(e,t){return Q(e,t?tt:rt)},Z.getScrollFunc=function(e,t){return M(Ee(e)[0],t?tt:rt)},Z.getById=function(e){return st[e]},Z.getAll=function(){return at.slice(0)},Z.isScrolling=function(){return!!De},Z.addEventListener=function(e,t){var r=C[e]||(C[e]=[]);~r.indexOf(t)||r.push(t)},Z.removeEventListener=function(e,t){var r=C[e],n=r&&r.indexOf(t);0<=n&&r.splice(n,1)},Z.batch=function(e,t){function bi(e,t){var r=[],n=[],o=Me.delayedCall(i,function(){t(r,n),r=[],n=[]}).pause();return function(e){r.length||o.restart(!0),r.push(e.trigger),n.push(e),a<=r.length&&o.progress(1)}}var r,n=[],o={},i=t.interval||.016,a=t.batchMax||1e9;for(r in t)o[r]="on"===r.substr(0,2)&&T(t[r])&&"onRefreshInit"!==r?bi(0,t[r]):t[r];return T(a)&&(a=a(),xa(Z,"refresh",function(){return a=t.batchMax()})),Ee(e).forEach(function(e){var t={};for(r in o)t[r]=o[r];t.trigger=e,n.push(Z.create(t))}),n},Z.sort=function(e){return at.sort(e||function(e,t){return-1e6*(e.vars.refreshPriority||0)+e.start-(t.start+-1e6*(t.vars.refreshPriority||0))})},J()&&Me.registerPlugin(Z),e.ScrollTrigger=Z,e.default=Z;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});


/*!
 * ScrollToPlugin 3.5.1
 * https://greensock.com
 * 
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(t){"use strict";function k(){return"undefined"!=typeof window}function l(){return e||k()&&(e=window.gsap)&&e.registerPlugin&&e}function m(t){return"string"==typeof t}function n(t,e){var o="x"===e?"Width":"Height",n="scroll"+o,r="client"+o;return t===x||t===s||t===f?Math.max(s[n],f[n])-(x["inner"+o]||s[r]||f[r]):t[n]-t["offset"+o]}function o(t,e){var o="scroll"+("x"===e?"Left":"Top");return t===x&&(null!=t.pageXOffset?o="page"+e.toUpperCase()+"Offset":t=null!=s[o]?s:f),function(){return t[o]}}function p(t,e){var n=a(t)[0].getBoundingClientRect(),r=!e||e===x||e===f,i=r?{top:s.clientTop-(x.pageYOffset||s.scrollTop||f.scrollTop||0),left:s.clientLeft-(x.pageXOffset||s.scrollLeft||f.scrollLeft||0)}:e.getBoundingClientRect(),l={x:n.left-i.left,y:n.top-i.top};return!r&&e&&(l.x+=o(e,"x")(),l.y+=o(e,"y")()),l}function q(t,e,o,r,i){return isNaN(t)||"object"==typeof t?m(t)&&"="===t.charAt(1)?parseFloat(t.substr(2))*("-"===t.charAt(0)?-1:1)+r-i:"max"===t?n(e,o)-i:Math.min(n(e,o),p(t,e)[o]-i):parseFloat(t)-i}function r(){e=l(),k()&&e&&document.body&&(x=window,f=document.body,s=document.documentElement,a=e.utils.toArray,e.config({autoKillThreshold:7}),g=e.config(),u=1)}var e,u,x,s,f,a,g,i={version:"3.5.1",name:"scrollTo",rawVars:1,register:function register(t){e=t,r()},init:function init(t,e,n,i,l){u||r();var s=this;s.isWin=t===x,s.target=t,s.tween=n,"object"!=typeof e?m((e={y:e}).y)&&"max"!==e.y&&"="!==e.y.charAt(1)&&(e.x=e.y):e.nodeType&&(e={y:e,x:e}),s.vars=e,s.autoKill=!!e.autoKill,s.getX=o(t,"x"),s.getY=o(t,"y"),s.x=s.xPrev=s.getX(),s.y=s.yPrev=s.getY(),null!=e.x?(s.add(s,"x",s.x,q(e.x,t,"x",s.x,e.offsetX||0),i,l,Math.round),s._props.push("scrollTo_x")):s.skipX=1,null!=e.y?(s.add(s,"y",s.y,q(e.y,t,"y",s.y,e.offsetY||0),i,l,Math.round),s._props.push("scrollTo_y")):s.skipY=1},render:function render(t,e){for(var o,r,i,l,s,u=e._pt,f=e.target,p=e.tween,a=e.autoKill,c=e.xPrev,y=e.yPrev,d=e.isWin;u;)u.r(t,u.d),u=u._next;o=d||!e.skipX?e.getX():c,i=(r=d||!e.skipY?e.getY():y)-y,l=o-c,s=g.autoKillThreshold,e.x<0&&(e.x=0),e.y<0&&(e.y=0),a&&(!e.skipX&&(s<l||l<-s)&&o<n(f,"x")&&(e.skipX=1),!e.skipY&&(s<i||i<-s)&&r<n(f,"y")&&(e.skipY=1),e.skipX&&e.skipY&&(p.kill(),e.vars.onAutoKill&&e.vars.onAutoKill.apply(p,e.vars.onAutoKillParams||[]))),d?x.scrollTo(e.skipX?o:e.x,e.skipY?r:e.y):(e.skipY||(f.scrollTop=e.y),e.skipX||(f.scrollLeft=e.x)),e.xPrev=e.x,e.yPrev=e.y},kill:function kill(t){var e="scrollTo"===t;!e&&"scrollTo_x"!==t||(this.skipX=1),!e&&"scrollTo_y"!==t||(this.skipY=1)}};i.max=n,i.getOffset=p,i.buildGetter=o,l()&&e.registerPlugin(i),t.ScrollToPlugin=i,t.default=i;if (typeof(window)==="undefined"||window!==t){Object.defineProperty(t,"__esModule",{value:!0})} else {delete t.default}});


!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t=t||self).barba=n()}(this,(function(){function t(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function n(n,r,e){return r&&t(n.prototype,r),e&&t(n,e),n}function r(){return(r=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t}).apply(this,arguments)}function e(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,n){return(o=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function u(t,n,r){return(u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,n,r){var e=[null];e.push.apply(e,n);var i=new(Function.bind.apply(t,e));return r&&o(i,r.prototype),i}).apply(null,arguments)}function f(t){var n="function"==typeof Map?new Map:void 0;return(f=function(t){if(null===t||-1===Function.toString.call(t).indexOf("[native code]"))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,r)}function r(){return u(t,arguments,i(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),o(r,t)})(t)}function s(t,n){try{var r=t()}catch(t){return n(t)}return r&&r.then?r.then(void 0,n):r}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var c,a="2.9.7",h=function(){};!function(t){t[t.off=0]="off",t[t.error=1]="error",t[t.warning=2]="warning",t[t.info=3]="info",t[t.debug=4]="debug"}(c||(c={}));var v=c.off,l=function(){function t(t){this.t=t}t.getLevel=function(){return v},t.setLevel=function(t){return v=c[t]};var n=t.prototype;return n.error=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.error,c.error,n)},n.warn=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.warn,c.warning,n)},n.info=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.info,c.info,n)},n.debug=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.log,c.debug,n)},n.i=function(n,r,e){r<=t.getLevel()&&n.apply(console,["["+this.t+"] "].concat(e))},t}(),d=O,m=E,p=g,w=x,b=T,y="/",P=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function g(t,n){for(var r,e=[],i=0,o=0,u="",f=n&&n.delimiter||y,s=n&&n.whitelist||void 0,c=!1;null!==(r=P.exec(t));){var a=r[0],h=r[1],v=r.index;if(u+=t.slice(o,v),o=v+a.length,h)u+=h[1],c=!0;else{var l="",d=r[2],m=r[3],p=r[4],w=r[5];if(!c&&u.length){var b=u.length-1,g=u[b];(!s||s.indexOf(g)>-1)&&(l=g,u=u.slice(0,b))}u&&(e.push(u),u="",c=!1);var E=m||p,x=l||f;e.push({name:d||i++,prefix:l,delimiter:x,optional:"?"===w||"*"===w,repeat:"+"===w||"*"===w,pattern:E?A(E):"[^"+k(x===f?x:x+f)+"]+?"})}}return(u||o<t.length)&&e.push(u+t.substr(o)),e}function E(t,n){return function(r,e){var i=t.exec(r);if(!i)return!1;for(var o=i[0],u=i.index,f={},s=e&&e.decode||decodeURIComponent,c=1;c<i.length;c++)if(void 0!==i[c]){var a=n[c-1];f[a.name]=a.repeat?i[c].split(a.delimiter).map((function(t){return s(t,a)})):s(i[c],a)}return{path:o,index:u,params:f}}}function x(t,n){for(var r=new Array(t.length),e=0;e<t.length;e++)"object"==typeof t[e]&&(r[e]=new RegExp("^(?:"+t[e].pattern+")$",R(n)));return function(n,e){for(var i="",o=e&&e.encode||encodeURIComponent,u=!e||!1!==e.validate,f=0;f<t.length;f++){var s=t[f];if("string"!=typeof s){var c,a=n?n[s.name]:void 0;if(Array.isArray(a)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but got array');if(0===a.length){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var h=0;h<a.length;h++){if(c=o(a[h],s),u&&!r[f].test(c))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'"');i+=(0===h?s.prefix:s.delimiter)+c}}else if("string"!=typeof a&&"number"!=typeof a&&"boolean"!=typeof a){if(!s.optional)throw new TypeError('Expected "'+s.name+'" to be '+(s.repeat?"an array":"a string"))}else{if(c=o(String(a),s),u&&!r[f].test(c))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but got "'+c+'"');i+=s.prefix+c}}else i+=s}return i}}function k(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function A(t){return t.replace(/([=!:$/()])/g,"\\$1")}function R(t){return t&&t.sensitive?"":"i"}function T(t,n,r){for(var e=(r=r||{}).strict,i=!1!==r.start,o=!1!==r.end,u=r.delimiter||y,f=[].concat(r.endsWith||[]).map(k).concat("$").join("|"),s=i?"^":"",c=0;c<t.length;c++){var a=t[c];if("string"==typeof a)s+=k(a);else{var h=a.repeat?"(?:"+a.pattern+")(?:"+k(a.delimiter)+"(?:"+a.pattern+"))*":a.pattern;n&&n.push(a),s+=a.optional?a.prefix?"(?:"+k(a.prefix)+"("+h+"))?":"("+h+")?":k(a.prefix)+"("+h+")"}}if(o)e||(s+="(?:"+k(u)+")?"),s+="$"===f?"$":"(?="+f+")";else{var v=t[t.length-1],l="string"==typeof v?v[v.length-1]===u:void 0===v;e||(s+="(?:"+k(u)+"(?="+f+"))?"),l||(s+="(?="+k(u)+"|"+f+")")}return new RegExp(s,R(r))}function O(t,n,r){return t instanceof RegExp?function(t,n){if(!n)return t;var r=t.source.match(/\((?!\?)/g);if(r)for(var e=0;e<r.length;e++)n.push({name:e,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return t}(t,n):Array.isArray(t)?function(t,n,r){for(var e=[],i=0;i<t.length;i++)e.push(O(t[i],n,r).source);return new RegExp("(?:"+e.join("|")+")",R(r))}(t,n,r):function(t,n,r){return T(g(t,r),n,r)}(t,n,r)}d.match=function(t,n){var r=[];return E(O(t,r,n),r)},d.regexpToFunction=m,d.parse=p,d.compile=function(t,n){return x(g(t,n),n)},d.tokensToFunction=w,d.tokensToRegExp=b;var S={container:"container",history:"history",namespace:"namespace",prefix:"data-barba",prevent:"prevent",wrapper:"wrapper"},j=new(function(){function t(){this.o=S,this.u=new DOMParser}var n=t.prototype;return n.toString=function(t){return t.outerHTML},n.toDocument=function(t){return this.u.parseFromString(t,"text/html")},n.toElement=function(t){var n=document.createElement("div");return n.innerHTML=t,n},n.getHtml=function(t){return void 0===t&&(t=document),this.toString(t.documentElement)},n.getWrapper=function(t){return void 0===t&&(t=document),t.querySelector("["+this.o.prefix+'="'+this.o.wrapper+'"]')},n.getContainer=function(t){return void 0===t&&(t=document),t.querySelector("["+this.o.prefix+'="'+this.o.container+'"]')},n.removeContainer=function(t){document.body.contains(t)&&t.parentNode.removeChild(t)},n.addContainer=function(t,n){var r=this.getContainer();r?this.s(t,r):n.appendChild(t)},n.getNamespace=function(t){void 0===t&&(t=document);var n=t.querySelector("["+this.o.prefix+"-"+this.o.namespace+"]");return n?n.getAttribute(this.o.prefix+"-"+this.o.namespace):null},n.getHref=function(t){if(t.tagName&&"a"===t.tagName.toLowerCase()){if("string"==typeof t.href)return t.href;var n=t.getAttribute("href")||t.getAttribute("xlink:href");if(n)return this.resolveUrl(n.baseVal||n)}return null},n.resolveUrl=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var e=n.length;if(0===e)throw new Error("resolveUrl requires at least one argument; got none.");var i=document.createElement("base");if(i.href=arguments[0],1===e)return i.href;var o=document.getElementsByTagName("head")[0];o.insertBefore(i,o.firstChild);for(var u,f=document.createElement("a"),s=1;s<e;s++)f.href=arguments[s],i.href=u=f.href;return o.removeChild(i),u},n.s=function(t,n){n.parentNode.insertBefore(t,n.nextSibling)},t}()),M=new(function(){function t(){this.h=[],this.v=-1}var e=t.prototype;return e.init=function(t,n){this.l="barba";var r={ns:n,scroll:{x:window.scrollX,y:window.scrollY},url:t};this.h.push(r),this.v=0;var e={from:this.l,index:0,states:[].concat(this.h)};window.history&&window.history.replaceState(e,"",t)},e.change=function(t,n,r){if(r&&r.state){var e=r.state,i=e.index;n=this.m(this.v-i),this.replace(e.states),this.v=i}else this.add(t,n);return n},e.add=function(t,n){var r=this.size,e=this.p(n),i={ns:"tmp",scroll:{x:window.scrollX,y:window.scrollY},url:t};this.h.push(i),this.v=r;var o={from:this.l,index:r,states:[].concat(this.h)};switch(e){case"push":window.history&&window.history.pushState(o,"",t);break;case"replace":window.history&&window.history.replaceState(o,"",t)}},e.update=function(t,n){var e=n||this.v,i=r({},this.get(e),{},t);this.set(e,i)},e.remove=function(t){t?this.h.splice(t,1):this.h.pop(),this.v--},e.clear=function(){this.h=[],this.v=-1},e.replace=function(t){this.h=t},e.get=function(t){return this.h[t]},e.set=function(t,n){return this.h[t]=n},e.p=function(t){var n="push",r=t,e=S.prefix+"-"+S.history;return r.hasAttribute&&r.hasAttribute(e)&&(n=r.getAttribute(e)),n},e.m=function(t){return Math.abs(t)>1?t>0?"forward":"back":0===t?"popstate":t>0?"back":"forward"},n(t,[{key:"current",get:function(){return this.h[this.v]}},{key:"state",get:function(){return this.h[this.h.length-1]}},{key:"previous",get:function(){return this.v<1?null:this.h[this.v-1]}},{key:"size",get:function(){return this.h.length}}]),t}()),L=function(t,n){try{var r=function(){if(!n.next.html)return Promise.resolve(t).then((function(t){var r=n.next;if(t){var e=j.toElement(t);r.namespace=j.getNamespace(e),r.container=j.getContainer(e),r.html=t,M.update({ns:r.namespace});var i=j.toDocument(t);document.title=i.title}}))}();return Promise.resolve(r&&r.then?r.then((function(){})):void 0)}catch(t){return Promise.reject(t)}},$=d,_={__proto__:null,update:L,nextTick:function(){return new Promise((function(t){window.requestAnimationFrame(t)}))},pathToRegexp:$},q=function(){return window.location.origin},B=function(t){return void 0===t&&(t=window.location.href),U(t).port},U=function(t){var n,r=t.match(/:\d+/);if(null===r)/^http/.test(t)&&(n=80),/^https/.test(t)&&(n=443);else{var e=r[0].substring(1);n=parseInt(e,10)}var i,o=t.replace(q(),""),u={},f=o.indexOf("#");f>=0&&(i=o.slice(f+1),o=o.slice(0,f));var s=o.indexOf("?");return s>=0&&(u=D(o.slice(s+1)),o=o.slice(0,s)),{hash:i,path:o,port:n,query:u}},D=function(t){return t.split("&").reduce((function(t,n){var r=n.split("=");return t[r[0]]=r[1],t}),{})},F=function(t){return void 0===t&&(t=window.location.href),t.replace(/(\/#.*|\/|#.*)$/,"")},H={__proto__:null,getHref:function(){return window.location.href},getOrigin:q,getPort:B,getPath:function(t){return void 0===t&&(t=window.location.href),U(t).path},parse:U,parseQuery:D,clean:F};function I(t,n,r){return void 0===n&&(n=2e3),new Promise((function(e,i){var o=new XMLHttpRequest;o.onreadystatechange=function(){if(o.readyState===XMLHttpRequest.DONE)if(200===o.status)e(o.responseText);else if(o.status){var n={status:o.status,statusText:o.statusText};r(t,n),i(n)}},o.ontimeout=function(){var e=new Error("Timeout error ["+n+"]");r(t,e),i(e)},o.onerror=function(){var n=new Error("Fetch error");r(t,n),i(n)},o.open("GET",t),o.timeout=n,o.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml"),o.setRequestHeader("x-barba","yes"),o.send()}))}var C=function(t){return!!t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then};function N(t,n){return void 0===n&&(n={}),function(){for(var r=arguments.length,e=new Array(r),i=0;i<r;i++)e[i]=arguments[i];var o=!1,u=new Promise((function(r,i){n.async=function(){return o=!0,function(t,n){t?i(t):r(n)}};var u=t.apply(n,e);o||(C(u)?u.then(r,i):r(u))}));return u}}var X=new(function(t){function n(){var n;return(n=t.call(this)||this).logger=new l("@barba/core"),n.all=["ready","page","reset","currentAdded","currentRemoved","nextAdded","nextRemoved","beforeOnce","once","afterOnce","before","beforeLeave","leave","afterLeave","beforeEnter","enter","afterEnter","after"],n.registered=new Map,n.init(),n}e(n,t);var r=n.prototype;return r.init=function(){var t=this;this.registered.clear(),this.all.forEach((function(n){t[n]||(t[n]=function(r,e){t.registered.has(n)||t.registered.set(n,new Set),t.registered.get(n).add({ctx:e||{},fn:r})})}))},r.do=function(t){for(var n=this,r=arguments.length,e=new Array(r>1?r-1:0),i=1;i<r;i++)e[i-1]=arguments[i];if(this.registered.has(t)){var o=Promise.resolve();return this.registered.get(t).forEach((function(t){o=o.then((function(){return N(t.fn,t.ctx).apply(void 0,e)}))})),o.catch((function(r){n.logger.debug("Hook error ["+t+"]"),n.logger.error(r)}))}return Promise.resolve()},r.clear=function(){var t=this;this.all.forEach((function(n){delete t[n]})),this.init()},r.help=function(){this.logger.info("Available hooks: "+this.all.join(","));var t=[];this.registered.forEach((function(n,r){return t.push(r)})),this.logger.info("Registered hooks: "+t.join(","))},n}(h)),z=function(){function t(t){if(this.P=[],"boolean"==typeof t)this.g=t;else{var n=Array.isArray(t)?t:[t];this.P=n.map((function(t){return $(t)}))}}return t.prototype.checkHref=function(t){if("boolean"==typeof this.g)return this.g;var n=U(t).path;return this.P.some((function(t){return null!==t.exec(n)}))},t}(),G=function(t){function n(n){var r;return(r=t.call(this,n)||this).k=new Map,r}e(n,t);var i=n.prototype;return i.set=function(t,n,r){return this.k.set(t,{action:r,request:n}),{action:r,request:n}},i.get=function(t){return this.k.get(t)},i.getRequest=function(t){return this.k.get(t).request},i.getAction=function(t){return this.k.get(t).action},i.has=function(t){return!this.checkHref(t)&&this.k.has(t)},i.delete=function(t){return this.k.delete(t)},i.update=function(t,n){var e=r({},this.k.get(t),{},n);return this.k.set(t,e),e},n}(z),Q=function(){return!window.history.pushState},W=function(t){return!t.el||!t.href},J=function(t){var n=t.event;return n.which>1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey},K=function(t){var n=t.el;return n.hasAttribute("target")&&"_blank"===n.target},V=function(t){var n=t.el;return void 0!==n.protocol&&window.location.protocol!==n.protocol||void 0!==n.hostname&&window.location.hostname!==n.hostname},Y=function(t){var n=t.el;return void 0!==n.port&&B()!==B(n.href)},Z=function(t){var n=t.el;return n.getAttribute&&"string"==typeof n.getAttribute("download")},tt=function(t){return t.el.hasAttribute(S.prefix+"-"+S.prevent)},nt=function(t){return Boolean(t.el.closest("["+S.prefix+"-"+S.prevent+'="all"]'))},rt=function(t){var n=t.href;return F(n)===F()&&B(n)===B()},et=function(t){function n(n){var r;return(r=t.call(this,n)||this).suite=[],r.tests=new Map,r.init(),r}e(n,t);var r=n.prototype;return r.init=function(){this.add("pushState",Q),this.add("exists",W),this.add("newTab",J),this.add("blank",K),this.add("corsDomain",V),this.add("corsPort",Y),this.add("download",Z),this.add("preventSelf",tt),this.add("preventAll",nt),this.add("sameUrl",rt,!1)},r.add=function(t,n,r){void 0===r&&(r=!0),this.tests.set(t,n),r&&this.suite.push(t)},r.run=function(t,n,r,e){return this.tests.get(t)({el:n,event:r,href:e})},r.checkLink=function(t,n,r){var e=this;return this.suite.some((function(i){return e.run(i,t,n,r)}))},n}(z),it=function(t){function n(r,e){var i;void 0===e&&(e="Barba error");for(var o=arguments.length,u=new Array(o>2?o-2:0),f=2;f<o;f++)u[f-2]=arguments[f];return(i=t.call.apply(t,[this].concat(u))||this).error=r,i.label=e,Error.captureStackTrace&&Error.captureStackTrace(function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(i),n),i.name="BarbaError",i}return e(n,t),n}(f(Error)),ot=function(){function t(t){void 0===t&&(t=[]),this.logger=new l("@barba/core"),this.all=[],this.page=[],this.once=[],this.A=[{name:"namespace",type:"strings"},{name:"custom",type:"function"}],t&&(this.all=this.all.concat(t)),this.update()}var n=t.prototype;return n.add=function(t,n){switch(t){case"rule":this.A.splice(n.position||0,0,n.value);break;case"transition":default:this.all.push(n)}this.update()},n.resolve=function(t,n){var r=this;void 0===n&&(n={});var e=n.once?this.once:this.page;e=e.filter(n.self?function(t){return t.name&&"self"===t.name}:function(t){return!t.name||"self"!==t.name});var i=new Map,o=e.find((function(e){var o=!0,u={};return!(!n.self||"self"!==e.name)||(r.A.reverse().forEach((function(n){o&&(o=r.R(e,n,t,u),e.from&&e.to&&(o=r.R(e,n,t,u,"from")&&r.R(e,n,t,u,"to")),e.from&&!e.to&&(o=r.R(e,n,t,u,"from")),!e.from&&e.to&&(o=r.R(e,n,t,u,"to")))})),i.set(e,u),o)})),u=i.get(o),f=[];if(f.push(n.once?"once":"page"),n.self&&f.push("self"),u){var s,c=[o];Object.keys(u).length>0&&c.push(u),(s=this.logger).info.apply(s,["Transition found ["+f.join(",")+"]"].concat(c))}else this.logger.info("No transition found ["+f.join(",")+"]");return o},n.update=function(){var t=this;this.all=this.all.map((function(n){return t.T(n)})).sort((function(t,n){return t.priority-n.priority})).reverse().map((function(t){return delete t.priority,t})),this.page=this.all.filter((function(t){return void 0!==t.leave||void 0!==t.enter})),this.once=this.all.filter((function(t){return void 0!==t.once}))},n.R=function(t,n,r,e,i){var o=!0,u=!1,f=t,s=n.name,c=s,a=s,h=s,v=i?f[i]:f,l="to"===i?r.next:r.current;if(i?v&&v[s]:v[s]){switch(n.type){case"strings":default:var d=Array.isArray(v[c])?v[c]:[v[c]];l[c]&&-1!==d.indexOf(l[c])&&(u=!0),-1===d.indexOf(l[c])&&(o=!1);break;case"object":var m=Array.isArray(v[a])?v[a]:[v[a]];l[a]?(l[a].name&&-1!==m.indexOf(l[a].name)&&(u=!0),-1===m.indexOf(l[a].name)&&(o=!1)):o=!1;break;case"function":v[h](r)?u=!0:o=!1}u&&(i?(e[i]=e[i]||{},e[i][s]=f[i][s]):e[s]=f[s])}return o},n.O=function(t,n,r){var e=0;return(t[n]||t.from&&t.from[n]||t.to&&t.to[n])&&(e+=Math.pow(10,r),t.from&&t.from[n]&&(e+=1),t.to&&t.to[n]&&(e+=2)),e},n.T=function(t){var n=this;t.priority=0;var r=0;return this.A.forEach((function(e,i){r+=n.O(t,e.name,i+1)})),t.priority=r,t},t}(),ut=function(){function t(t){void 0===t&&(t=[]),this.logger=new l("@barba/core"),this.S=!1,this.store=new ot(t)}var r=t.prototype;return r.get=function(t,n){return this.store.resolve(t,n)},r.doOnce=function(t){var n=t.data,r=t.transition;try{var e=function(){i.S=!1},i=this,o=r||{};i.S=!0;var u=s((function(){return Promise.resolve(i.j("beforeOnce",n,o)).then((function(){return Promise.resolve(i.once(n,o)).then((function(){return Promise.resolve(i.j("afterOnce",n,o)).then((function(){}))}))}))}),(function(t){i.S=!1,i.logger.debug("Transition error [before/after/once]"),i.logger.error(t)}));return Promise.resolve(u&&u.then?u.then(e):e())}catch(t){return Promise.reject(t)}},r.doPage=function(t){var n=t.data,r=t.transition,e=t.page,i=t.wrapper;try{var o=function(t){if(u)return t;f.S=!1},u=!1,f=this,c=r||{},a=!0===c.sync||!1;f.S=!0;var h=s((function(){function t(){return Promise.resolve(f.j("before",n,c)).then((function(){var t=!1;function r(r){return t?r:Promise.resolve(f.remove(n)).then((function(){return Promise.resolve(f.j("after",n,c)).then((function(){}))}))}var o=function(){if(a)return s((function(){return Promise.resolve(f.add(n,i)).then((function(){return Promise.resolve(f.j("beforeLeave",n,c)).then((function(){return Promise.resolve(f.j("beforeEnter",n,c)).then((function(){return Promise.resolve(Promise.all([f.leave(n,c),f.enter(n,c)])).then((function(){return Promise.resolve(f.j("afterLeave",n,c)).then((function(){return Promise.resolve(f.j("afterEnter",n,c)).then((function(){}))}))}))}))}))}))}),(function(t){if(f.M(t))throw new it(t,"Transition error [sync]")}));var r=function(r){return t?r:s((function(){var t=function(){if(!1!==o)return Promise.resolve(f.add(n,i)).then((function(){return Promise.resolve(f.j("beforeEnter",n,c)).then((function(){return Promise.resolve(f.enter(n,c,o)).then((function(){return Promise.resolve(f.j("afterEnter",n,c)).then((function(){}))}))}))}))}();if(t&&t.then)return t.then((function(){}))}),(function(t){if(f.M(t))throw new it(t,"Transition error [before/after/enter]")}))},o=!1,u=s((function(){return Promise.resolve(f.j("beforeLeave",n,c)).then((function(){return Promise.resolve(Promise.all([f.leave(n,c),L(e,n)]).then((function(t){return t[0]}))).then((function(t){return o=t,Promise.resolve(f.j("afterLeave",n,c)).then((function(){}))}))}))}),(function(t){if(f.M(t))throw new it(t,"Transition error [before/after/leave]")}));return u&&u.then?u.then(r):r(u)}();return o&&o.then?o.then(r):r(o)}))}var r=function(){if(a)return Promise.resolve(L(e,n)).then((function(){}))}();return r&&r.then?r.then(t):t()}),(function(t){if(f.S=!1,t.name&&"BarbaError"===t.name)throw f.logger.debug(t.label),f.logger.error(t.error),t;throw f.logger.debug("Transition error [page]"),f.logger.error(t),t}));return Promise.resolve(h&&h.then?h.then(o):o(h))}catch(t){return Promise.reject(t)}},r.once=function(t,n){try{return Promise.resolve(X.do("once",t,n)).then((function(){return n.once?N(n.once,n)(t):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.leave=function(t,n){try{return Promise.resolve(X.do("leave",t,n)).then((function(){return n.leave?N(n.leave,n)(t):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.enter=function(t,n,r){try{return Promise.resolve(X.do("enter",t,n)).then((function(){return n.enter?N(n.enter,n)(t,r):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.add=function(t,n){try{return j.addContainer(t.next.container,n),X.do("nextAdded",t),Promise.resolve()}catch(t){return Promise.reject(t)}},r.remove=function(t){try{return j.removeContainer(t.current.container),X.do("currentRemoved",t),Promise.resolve()}catch(t){return Promise.reject(t)}},r.M=function(t){return t.message?!/Timeout error|Fetch error/.test(t.message):!t.status},r.j=function(t,n,r){try{return Promise.resolve(X.do(t,n,r)).then((function(){return r[t]?N(r[t],r)(n):Promise.resolve()}))}catch(t){return Promise.reject(t)}},n(t,[{key:"isRunning",get:function(){return this.S},set:function(t){this.S=t}},{key:"hasOnce",get:function(){return this.store.once.length>0}},{key:"hasSelf",get:function(){return this.store.all.some((function(t){return"self"===t.name}))}},{key:"shouldWait",get:function(){return this.store.all.some((function(t){return t.to&&!t.to.route||t.sync}))}}]),t}(),ft=function(){function t(t){var n=this;this.names=["beforeLeave","afterLeave","beforeEnter","afterEnter"],this.byNamespace=new Map,0!==t.length&&(t.forEach((function(t){n.byNamespace.set(t.namespace,t)})),this.names.forEach((function(t){X[t](n.L(t))})))}return t.prototype.L=function(t){var n=this;return function(r){var e=t.match(/enter/i)?r.next:r.current,i=n.byNamespace.get(e.namespace);return i&&i[t]?N(i[t],i)(r):Promise.resolve()}},t}();Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(t){var n=this;do{if(n.matches(t))return n;n=n.parentElement||n.parentNode}while(null!==n&&1===n.nodeType);return null});var st={container:null,html:"",namespace:"",url:{hash:"",href:"",path:"",port:null,query:{}}};return new(function(){function t(){this.version=a,this.schemaPage=st,this.Logger=l,this.logger=new l("@barba/core"),this.plugins=[],this.hooks=X,this.dom=j,this.helpers=_,this.history=M,this.request=I,this.url=H}var e=t.prototype;return e.use=function(t,n){var r=this.plugins;r.indexOf(t)>-1?this.logger.warn("Plugin ["+t.name+"] already installed."):"function"==typeof t.install?(t.install(this,n),r.push(t)):this.logger.warn("Plugin ["+t.name+'] has no "install" method.')},e.init=function(t){var n=void 0===t?{}:t,e=n.transitions,i=void 0===e?[]:e,o=n.views,u=void 0===o?[]:o,f=n.schema,s=void 0===f?S:f,c=n.requestError,a=n.timeout,h=void 0===a?2e3:a,v=n.cacheIgnore,d=void 0!==v&&v,m=n.prefetchIgnore,p=void 0!==m&&m,w=n.preventRunning,b=void 0!==w&&w,y=n.prevent,P=void 0===y?null:y,g=n.debug,E=n.logLevel;if(l.setLevel(!0===(void 0!==g&&g)?"debug":void 0===E?"off":E),this.logger.info(this.version),Object.keys(s).forEach((function(t){S[t]&&(S[t]=s[t])})),this.$=c,this.timeout=h,this.cacheIgnore=d,this.prefetchIgnore=p,this.preventRunning=b,this._=this.dom.getWrapper(),!this._)throw new Error("[@barba/core] No Barba wrapper found");this._.setAttribute("aria-live","polite"),this.q();var x=this.data.current;if(!x.container)throw new Error("[@barba/core] No Barba container found");if(this.cache=new G(d),this.prevent=new et(p),this.transitions=new ut(i),this.views=new ft(u),null!==P){if("function"!=typeof P)throw new Error("[@barba/core] Prevent should be a function");this.prevent.add("preventCustom",P)}this.history.init(x.url.href,x.namespace),this.B=this.B.bind(this),this.U=this.U.bind(this),this.D=this.D.bind(this),this.F(),this.plugins.forEach((function(t){return t.init()}));var k=this.data;k.trigger="barba",k.next=k.current,k.current=r({},this.schemaPage),this.hooks.do("ready",k),this.once(k),this.q()},e.destroy=function(){this.q(),this.H(),this.history.clear(),this.hooks.clear(),this.plugins=[]},e.force=function(t){window.location.assign(t)},e.go=function(t,n,r){var e;if(void 0===n&&(n="barba"),this.transitions.isRunning)this.force(t);else if(!(e="popstate"===n?this.history.current&&this.url.getPath(this.history.current.url)===this.url.getPath(t):this.prevent.run("sameUrl",null,null,t))||this.transitions.hasSelf)return n=this.history.change(t,n,r),r&&(r.stopPropagation(),r.preventDefault()),this.page(t,n,e)},e.once=function(t){try{var n=this;return Promise.resolve(n.hooks.do("beforeEnter",t)).then((function(){function r(){return Promise.resolve(n.hooks.do("afterEnter",t)).then((function(){}))}var e=function(){if(n.transitions.hasOnce){var r=n.transitions.get(t,{once:!0});return Promise.resolve(n.transitions.doOnce({transition:r,data:t})).then((function(){}))}}();return e&&e.then?e.then(r):r()}))}catch(t){return Promise.reject(t)}},e.page=function(t,n,e){try{var i=function(){var t=o.data;return Promise.resolve(o.hooks.do("page",t)).then((function(){var n=s((function(){var n=o.transitions.get(t,{once:!1,self:e});return Promise.resolve(o.transitions.doPage({data:t,page:u,transition:n,wrapper:o._})).then((function(){o.q()}))}),(function(){0===l.getLevel()&&o.force(t.current.url.href)}));if(n&&n.then)return n.then((function(){}))}))},o=this;o.data.next.url=r({href:t},o.url.parse(t)),o.data.trigger=n;var u=o.cache.has(t)?o.cache.update(t,{action:"click"}).request:o.cache.set(t,o.request(t,o.timeout,o.onRequestError.bind(o,n)),"click").request,f=function(){if(o.transitions.shouldWait)return Promise.resolve(L(u,o.data)).then((function(){}))}();return Promise.resolve(f&&f.then?f.then(i):i())}catch(t){return Promise.reject(t)}},e.onRequestError=function(t){this.transitions.isRunning=!1;for(var n=arguments.length,r=new Array(n>1?n-1:0),e=1;e<n;e++)r[e-1]=arguments[e];var i=r[0],o=r[1],u=this.cache.getAction(i);return this.cache.delete(i),!(this.$&&!1===this.$(t,u,i,o)||("click"===u&&this.force(i),1))},e.prefetch=function(t){var n=this;this.cache.has(t)||this.cache.set(t,this.request(t,this.timeout,this.onRequestError.bind(this,"barba")).catch((function(t){n.logger.error(t)})),"prefetch")},e.F=function(){!0!==this.prefetchIgnore&&(document.addEventListener("mouseover",this.B),document.addEventListener("touchstart",this.B)),document.addEventListener("click",this.U),window.addEventListener("popstate",this.D)},e.H=function(){!0!==this.prefetchIgnore&&(document.removeEventListener("mouseover",this.B),document.removeEventListener("touchstart",this.B)),document.removeEventListener("click",this.U),window.removeEventListener("popstate",this.D)},e.B=function(t){var n=this,r=this.I(t);if(r){var e=this.dom.getHref(r);this.prevent.checkHref(e)||this.cache.has(e)||this.cache.set(e,this.request(e,this.timeout,this.onRequestError.bind(this,r)).catch((function(t){n.logger.error(t)})),"enter")}},e.U=function(t){var n=this.I(t);if(n)return this.transitions.isRunning&&this.preventRunning?(t.preventDefault(),void t.stopPropagation()):void this.go(this.dom.getHref(n),n,t)},e.D=function(t){this.go(this.url.getHref(),"popstate",t)},e.I=function(t){for(var n=t.target;n&&!this.dom.getHref(n);)n=n.parentNode;if(n&&!this.prevent.checkLink(n,t,this.dom.getHref(n)))return n},e.q=function(){var t=this.url.getHref(),n={container:this.dom.getContainer(),html:this.dom.getHtml(),namespace:this.dom.getNamespace(),url:r({href:t},this.url.parse(t))};this.C={current:n,next:r({},this.schemaPage),trigger:void 0},this.hooks.do("reset",this.data)},n(t,[{key:"data",get:function(){return this.C}},{key:"wrapper",get:function(){return this._}}]),t}())}));


////////////// Helper functions
//
// _q(element)
// _qAll(elements)
// removeClass(element, className)
// addClass(element, className)
// nextElementSibling(element)
function _q(argument) {
	return document.querySelector(argument);
}
function _qAll(argument) {
	return document.querySelectorAll(argument);
}
function removeClass(el, className) {
	if (el.classList) {
		el
			.classList
			.remove(className)
	} else {
		el.className = el
			.className
			.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
	}
}
function addClass(el, className) {
	if (el.classList) {
		el
			.classList
			.add(className)
	} else {
		var current = el.className,
			found = false;
		var all = current.split(' ');
		for (var i = 0; i < all.length, !found; i += 1) {
			found = all[i] === className
		}
		if (!found) {
			if (current === '') {
				el.className = className
			} else {
				el.className += ' ' + className
			}
		}
	}
}
function hasClass(el, className) {
	if (el.classList)
		return el.classList.contains(className);
	else
		return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
function nextElementSibling(el) {
	do {
		el = el.nextSibling
	} while (el && el.nodeType !== 1);
	return el
}
function hoverEvents(els, over = function() {}, out = function() {}) {
	els.forEach(function(el) {
		el.addEventListener("mouseover", function(e) {
			over(el, e);
		});
		el.addEventListener("mouseout", function(e){
			out(el, e);
		});
	});
}
// Wait for image to load
// Parameter:
// 1. IMG Elements Object or String
// 2. On progress callback, or on done callback if there's only 2 parameter
// 3. On done callback
function waitForImg() {
	var els,
		progress,
		done,
		els_count;

	if(arguments.length <= 0) {
		return false;
	} else {
		if(typeof arguments[0] != "object") els = document.querySelectorAll(els);
		else els = arguments[0];
		els_count = els.length + 1;

		if (arguments[2]) {
			progress = arguments[1];
			done = arguments[2];
		} else {
			progress = false;
			done = arguments[1];
		}

		// At the beginning animate the progress a bit
		els_count--;
		if(progress) progress(els_count, 100-(els_count/els.length*100));

		if(els_count > 0) {
			for (var i = 0; i < els.length; i++) {
				// When loaded report it as a progress
				if(els[i].complete) {
					if(progress) progress(els_count--, 100-(els_count/els.length*100));

					if(els_count == 0) done();
				} else {
					els[i].addEventListener("load", function(e) {
						if(progress) progress(els_count--, 100-(els_count/els.length*100));

						if(els_count == 0) done();
					});
				}

			}
		} else {
			if(progress) progress(0, 100);
			done();
		}

		return true;
	}
}
// Prevent error in older browser for console
(function () {
	var method;
	var noop = function () {};
	var methods = [
		'assert',
		'clear',
		'count',
		'debug',
		'dir',
		'dirxml',
		'error',
		'exception',
		'group',
		'groupCollapsed',
		'groupEnd',
		'info',
		'log',
		'markTimeline',
		'profile',
		'profileEnd',
		'table',
		'time',
		'timeEnd',
		'timeline',
		'timelineEnd',
		'timeStamp',
		'trace',
		'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});
	while (length--) {
		method = methods[length];
		if (!console[method]) {
			console[method] = noop
		}
	}
}());
// Splitting text
var splitText = function (els) {
	var addTags = function (el, idx) {
		var splord, splext;
		var split = "";

		splord = el.textContent.split(" ");
		for (var i = 0; i < splord.length; i++) {
			splext = splord[i].split("");
			splord[i] = "<dl class='splord wrd" + idx + i + "'>";
			for (var j = 0; j < splext.length; j++) {
				if (splext[j] == " ") splext[j] = "&nbsp;";
				splord[i] += "<dt class='splext txt" + idx + i + j + "'>" + splext[j] + "</dt>";
			}
			splord[i] += "</dl>";
			if (i < splord.length - 1) splord[i] += " ";
			split += splord[i];
		}

		return split;
	}

	var travelTags = function(nodes, idx) {
		var split = [],
			childNodes = nodes.childNodes;

		for (var i = 0; i < childNodes.length; i++) {
			if (childNodes[i].childNodes.length == 0) {
				// The child that doesn't have child
				if (childNodes[i].textContent.trim() == "") {
					split.push([" ", " "]);
				} else {
					split.push([childNodes[i].textContent, addTags(childNodes[i], idx + "" + i)]);
				}
			} else {
				// Replace the inner text with split text
				var str = childNodes[i].outerHTML,
					tags = travelTags(childNodes[i], idx + "" +i);
				str = str.replace(tags[0][0], tags[0][1]);
				split.push([childNodes[i].textContent, str]);
			}
		}

		return split;
	}

	if (typeof els == "string") els = _qAll(els);
	for (var i = 0; i < els.length; i++) {
		var result = travelTags(els[i], i);
		els[i].innerHTML = "";
		for (var j = 0; j < result.length; j++) {
			els[i].innerHTML += result[j][1];
		}
	}
}
////////////////////// Huge text animation
var hugeText = function (el) {
	this.element = _q(el);
	this.element.innerHTML = "<span></span>";
	this.cancelhide = false;
	this.onshow = false;
	this.tween = null;

	gsap.set(this.element.children, {yPercent: 100});
	gsap.fromTo(this.element.children, {
		xPercent: -25
	}, {
		duration: 10,
		repeat: -1,
		ease: "linear",
		xPercent: -75
	});

	this.show = function (text) {
		this.cancelhide = true;
		this
			.element
			.querySelector("span")
			.innerHTML = "<i>" + text + "</i><i>" + text + "</i><i>" + text + "</i><i>" + text + "</i>";
		if (this.tween != null)
			this.tween.kill();
		this.tween = gsap.to(this.element.children, {
			duration: .512,
			ease: "expo",
			yPercent: 0
		});
	}

	this.hide = function () {
		var that = this;
		this.tween = gsap.to(this.element.children, {
			duration: .512,
			ease: "expo",
			yPercent: 100,
			onComplete: function () {
				if (that.cancelhide) {
					that.cancelhide = false;
				} else {
					that
						.element
						.querySelector("span")
						.innerHTML = "";
				}
			}
		});
	}

	return this;
}
///////////////// Animate Number
function animateNumber(selector) {
	var that = this;
	this.game = {
		score: 0
	};
	this.selector = _q(selector);
	this.value = this.selector.textContent || this.selector.innerText;
	this.plus = "+";
	this.value = this
		.value
		.split("+");
	if (this.value.length <= 1) {
		this.plus = ""
	}
	this.value = this.value[0];
	this.selector.innerHTML = "0" + this.plus;
	this.animate = function () {
		gsap.to(that.game, 5, {
			score: "+=" + that.value,
			roundProps: "score",
			onUpdate: that.updateHandler,
			ease: "expo.out"
		})
	};
	this.updateHandler = function () {
		that.selector.innerHTML = that.game.score + that.plus
	};
	this.animate()
}
function animateYear(selector, year) {
	var that = this;
	this.game = {
		score: 0
	};
	this.selector = _q(selector);
	this.year__now = (new Date()).getFullYear(),
	this.year__animate = (this.year__now - year);
	this.animate = function () {
		gsap.to(that.game, 5, {
			score: "+=" + that.year__animate,
			roundProps: "score",
			onUpdate: that.updateHandler,
			ease: "expo.out"
		})
	};
	this.updateHandler = function () {
		that.selector.innerHTML = that.game.score + "+"
	};
	this.animate()
}
// Check touchevents
function isTouchSupported() {
    var msTouchEnabled = window.navigator.msMaxTouchPoints;
    var generalTouchEnabled = "ontouchstart" in document.createElement("div");

    return (msTouchEnabled || generalTouchEnabled) ? true : false;
}
// Parallax on mouse move
function parallax(callback) {
	if(isTouchSupported()) {
		// Do something with gyroscpe
	} else {
		window.onmousemove = function(event) {
			var eventDoc, doc, body;

			event = event || window.event; // IE-ism

			// If pageX/Y aren't available and clientX/Y are,
			// calculate pageX/Y - logic taken from jQuery.
			// (This is to support old IE)
			if (event.pageX == null && event.clientX != null) {
				eventDoc = (event.target && event.target.ownerDocument) || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = event.clientX +
				  (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
				  (doc && doc.clientLeft || body && body.clientLeft || 0);
				event.pageY = event.clientY +
				  (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
				  (doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			if (event.screenX != null) {
				var x = (event.screenX - (window.innerWidth / 2)) / (window.innerWidth / 2) / 10,
					y = (event.screenY - (window.innerHeight / 2)) / (window.innerHeight / 2) / 10;

				callback(x, y);
			}
		}
	}
}
// Photoswipe helper
var initPhotoSwipeFromDOM = function (gallerySelector) {
	// parse slide data (url, title, size ...) from DOM elements (children of
	// gallerySelector)
	var parseThumbnailElements = function (el) {
		var thumbElements = el.childNodes,
			numNodes = thumbElements.length,
			items = [],
			figureEl,
			linkEl,
			size,
			item;

		for (var i = 0; i < numNodes; i++) {

			figureEl = thumbElements[i]; // <figure> element

			// include only element nodes
			if (figureEl.nodeType !== 1) {
				continue;
			}

			// linkEl = figureEl.children[0]; // <a> element
			linkEl = figureEl; // <a> element

			size = linkEl
				.getAttribute('data-size')
				.split('x');

			// create slide object
			item = {
				src: linkEl.getAttribute('href'),
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10)
			};

			if (figureEl.children.length > 1) {
				// <figcaption> content
				item.title = figureEl.children[1].innerHTML;
			}

			if (linkEl.children.length > 0) {
				// <img> thumbnail element, retrieving thumbnail url
				item.msrc = linkEl
					.children[0]
					.getAttribute('src');
			}

			item.el = figureEl; // save link to element for getThumbBoundsFn
			items.push(item);
		}

		return items;
	};

	// find nearest parent element
	var closest = function closest(el, fn) {
		return el && (fn(el)
			? el
			: closest(el.parentNode, fn));
	};

	// triggers when user clicks on thumbnail
	var onThumbnailsClick = function (e) {
		e = e || window.event;
		e.preventDefault
			? e.preventDefault()
			: e.returnValue = false;

		var eTarget = e.target || e.srcElement;

		// find root element of slide
		var clickedListItem = closest(eTarget, function (el) {
			return (el.tagName && el.tagName.toUpperCase() === 'A');
		});

		if (!clickedListItem) {
			return;
		}

		// find index of clicked item by looping through all child nodes alternatively,
		// you may define index via data- attribute
		var clickedGallery = clickedListItem.parentNode,
			childNodes = clickedListItem.parentNode.childNodes,
			numChildNodes = childNodes.length,
			nodeIndex = 0,
			index;

		for (var i = 0; i < numChildNodes; i++) {
			if (childNodes[i].nodeType !== 1) {
				continue;
			}

			if (childNodes[i] === clickedListItem) {
				index = nodeIndex;
				break;
			}
			nodeIndex++;
		}

		if (index >= 0) {
			// open PhotoSwipe if valid index found
			openPhotoSwipe(index, clickedGallery);
		}
		return false;
	};

	// parse picture index and gallery index from URL (#&pid=1&gid=2)
	var photoswipeParseHash = function () {
		var hash = window
				.location
				.hash
				.substring(1),
			params = {};

		if (hash.length < 5) {
			return params;
		}

		var vars = hash.split('&');
		for (var i = 0; i < vars.length; i++) {
			if (!vars[i]) {
				continue;
			}
			var pair = vars[i].split('=');
			if (pair.length < 2) {
				continue;
			}
			params[pair[0]] = pair[1];
		}

		if (params.gid) {
			params.gid = parseInt(params.gid, 10);
		}

		return params;
	};

	var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
		var pswpElement = _qAll('.pswp')[0],
			gallery,
			options,
			items;

		items = parseThumbnailElements(galleryElement);

		// define options (if needed)
		options = {

			// define gallery index (for URL)
			galleryUID: galleryElement.getAttribute('data-pswp-uid'),
			bgOpacity: 1,
			preload: [
				1, 3
			],

			getThumbBoundsFn: function (index) {
				// See Options -> getThumbBoundsFn section of documentation for more info
				var thumbnail = items[index]
						.el
						.getElementsByTagName('img')[0], // find thumbnail
					pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
					rect = thumbnail.getBoundingClientRect();

				return {
					x: rect.left,
					y: rect.top + pageYScroll,
					w: rect.width
				};
			}

		};

		// PhotoSwipe opened from URL
		if (fromURL) {
			if (options.galleryPIDs) {
				// parse real index when custom PIDs are used
				// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
				for (var j = 0; j < items.length; j++) {
					if (items[j].pid == index) {
						options.index = j;
						break;
					}
				}
			} else {
				// in URL indexes start from 1
				options.index = parseInt(index, 10) - 1;
			}
		} else {
			options.index = parseInt(index, 10);
		}

		// exit if index not found
		if (isNaN(options.index)) return;

		if (disableAnimation) options.showAnimationDuration = 0;

		// Pass data to PhotoSwipe and initialize it
		gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	};

	// loop through all gallery elements and bind events
	var galleryElements = _qAll(gallerySelector);

	for (var i = 0, l = galleryElements.length; i < l; i++) {
		galleryElements[i].setAttribute('data-pswp-uid', i + 1);
		galleryElements[i].onclick = onThumbnailsClick;
	}

	// Parse URL and open gallery if it contains #&pid=3&gid=1
	var hashData = photoswipeParseHash();
	if (hashData.pid && hashData.gid) {
		openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
	}
}
////////////// Konami Code
var konami = "38,38,40,40,37,39,37,39,66,65".split(","),
	keyIndex = 0;
document.onkeydown = function (t) {
	konami[keyIndex] == t.keyCode
		? keyIndex++
		: keyIndex = 0,
	keyIndex == konami.length && (0 === _qAll("#konamicode").length && (_q("body").innerHTML += '<div id="konamicode"><iframe width="905" height="510" src="https://www.youtube-nocookie.com/embed/tgbNymZ7vqY?controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'), keyIndex = 0);
	if (_q('#konamicode') != undefined) {
		elem = _q('#konamicode');
		elem.onclick = function (e) {
			gsap.to('#konamicode', {
				duration: 1,
				ease: "expo.in",
				opacity: 0,
				onComplete: function () {
					elem
						.parentNode
						.removeChild(elem)
				}
			})
		}
	}
};
'use strict';
const REPORTSIZE = false;

const gToArray = gsap.utils.toArray;
const gRandom = gsap.utils.random;


//////////////// Dark Mode
var dark_mode = false;
function toggleDarkMode() {
	console.info("Toggle Dark Mode")
}
if (window.matchMedia){
	var darkmode = window.matchMedia('(prefers-color-scheme: dark)');
	darkmode.addListener(function(e){
		h = _q("html");
		if(e.matches) dark_mode = false;
		else dark_mode = true;
		toggleDarkMode();
	});
}


function log(params) {
	console.log(params);
	_q("#log").innerHTML = params;
}


// Report size of window
if (REPORTSIZE) {
	console.info("Window:", window.innerWidth, window.innerHeight);
	console.info("Body:", _q("body").offsetWidth, _q("body").offsetHeight);
	window.addEventListener('resize', function() {
		console.info("Window:", window.innerWidth, window.innerHeight);
		console.info("Body:", _q("body").offsetWidth, _q("body").offsetHeight);
	});
}


////////// Initial

// Predefined scroll animation
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
var scroll = {
	l: 0,
	tl: [],
	st: [],
	// Move elements up with opacity with scrub
	moveText: function(params) {
		if (!params) return false;

		var elements = (params.elements)? params.elements: [];
		var position = (params.position)? params.position: "85%";
		var delta = (params.delta)? params.delta: 100;
		var move = (params.move === undefined)? true: params.move;
		var markers = (params.markers)? params.markers: false;
		var horizontal = (params.horizontal)? params.horizontal: false;

		gToArray(elements).forEach((element, index) => {
			var y = delta + (15 * index);
			var trigger = (params.trigger)? params.trigger: element.parentNode;
			if (!move) y = 0;

			this.l = this.tl.push(gsap.timeline()) - 1;
			if (horizontal) {
					this.tl[this.l].fromTo(element, {
						x: y,
						opacity: 0,
					}, {
						x: 0,
						opacity: 1,
						ease: "ease.out"
					}, 0);
			} else {
				this.tl[this.l].fromTo(element, {
					y: y,
					opacity: 0,
				}, {
					y: 0,
					opacity: 1,
					ease: "ease.out"
				}, 0);
			}

			this.st.push(ScrollTrigger.create({
				markers: markers,
				trigger: trigger,
				start: "0 " + position,
				end:  "+=175 " + position,
				scrub: 1,
				animation: this.tl[this.l]
			}));
		});
	},
	// Move elements up without scrub
	moveThumbs: function(elements, position = "85%") {
		gToArray(elements).forEach(element => {
			var y = gRandom(250, 500, 5) + "px";

			this.l = this.tl.push(gsap.timeline()) - 1;
			this.tl[this.l].fromTo(element, {
				y: y
			}, {
				y: 0,
				duration: .75,
			}, 0);

			this.st.push(ScrollTrigger.create({
				trigger: element.parentNode,
				start: "0 " + position,
				end: "0 " + position,
				toggleActions: "restart none none reverse",
				animation: this.tl[this.l]
			}));
		});
	},
	// Add custom animation
	push: function(animationFunction, scrollFunction) {
		if (!animationFunction || !scrollFunction) return false;

		this.l = this.tl.push(gsap.timeline()) - 1;

		if (typeof animationFunction === "function") {
			this.tl[this.l] = animationFunction(this.tl[this.l]);
		}

		if (typeof scrollFunction === "function") {
			this.st.push(scrollFunction(this.tl[this.l]));
		}
	},
	// Call this to remove garbage
	destroy: function() {
		// Cleaning up GSAP timeline
		for (var i = 0; i < this.tl.length; i++) {
			this.tl[i].kill();
		}
		this.tl = [];
		// Cleaning up ScrollTrigger
		for (var i = 0; i < this.st.length; i++) {
			this.st[i].kill();
		}
		this.st = [];
		//
		this.l = 0;
	}
}

// Loader functions
var loader = {
	el: _q("#loader"),
	update: function(percent) {
		gsap.to(this.el.querySelectorAll(".loading"), {
			width: percent + "%"
		})
	},
	clean: function() {
		this.el.innerHTML = "";
	},
	init: function(done) {
		var that = this;

		document.body.style.cursor = "wait";
		this.el.innerHTML = '<p style="opacity: 0;">Downloading <span><i class="loading" style="width:0%"></i></span></p>';
		gsap.set(this.el, {
			y: 0,
			opacity: 1
		});

		if (typeof done === "function") done();
	},
	show: function (els, done) {
		if (typeof done !== "function") return false;

		// Wait for all images to be loaded
		var that = this;
		var _percent = { score: 0 };

		// Animate the loading
		gsap.fromTo(that.el.children, {
			opacity: 0,
		}, {
			opacity: 1,
			ease: "expo",
			duration: .5
		});

		// Calling loading images function
		waitForImg(els.querySelectorAll("img"), function(index, percent) {
			gsap.to(_percent, {
				score: percent,
				roundProps: "score",
				duration: .1,
				onUpdate: function() {
					that.update(_percent.score);
				}
			});
		}, function() {
			that.hide(function() {
				that.clean();
				done();
			});
		});
	},
	hide: function(done) {
		if (typeof done !== "function") return false;

		var that = this;

		gsap.killTweensOf(that.el.children);
		gsap.to(that.el.children, {
			opacity: 0,
			ease: "expo.in",
			duration: .5,
			onComplete: function() {
				done();
			}
		});
	},
	empty: function() {
		this.clean();
		document.body.style.cursor = "";
		gsap.set(this.el, {
			y: "-100%",
			opacity: 0
		});
	}
}

// Animate functions
var animate = {
	top: function(tl) {
		if (tl == null) tl = gsap;

		// Scroll to top
		var scroll = (document.body.scrollTop || document.documentElement.scrollTop) / (window.outerHeight * 2);
		if (scroll > 0) {
			tl.to(window, {
				scrollTo: 0,
				duration: (scroll > 2)? 2 : scroll,
				ease: "expo.inOut"
			}, 0);
		}

		return tl
	},
	show: function (next, done, nonsticky = false){
		if (!next) return false;

		// Default gsap timeline value
		var tl = gsap.timeline({ defaults: {
			duration: 1,
			stagger: .1,
			ease: "expo.out"
		}});

		// Unhide main element
		tl.set(next, {
			opacity: 1
		}, 0);

		if (typeof done !== "function") return false;

		// Show current view
		// Animate text
		if (!nonsticky) nonsticky = next.querySelector(".middle").children;
		tl.fromTo(nonsticky, {
			y: "+=200px",
			opacity: 0
		}, {
			y: "-=200px",
			opacity: 1
		}, 0);
		tl.fromTo(next.querySelectorAll(".bland > li, .flare:not(.side), .footer, .footer > *"), {
			y: "+=200px",
			opacity: 0
		}, {
			y: "-=200px",
			opacity: 1
		}, 0);
		// Animate flare
		tl.fromTo(next.querySelectorAll(".flares.side > img"), {
			x: "+=300px",
			opacity: 0
		}, {
			x: "-=300px",
			opacity: 4
		}, 0);
		// Run done after all all animation complete
		tl.set(next, {
			onComplete: function() {
				done();
			}
		});
	},
	hide: function (current, done, nonsticky = false) {
		if (!current) return false;
		if (typeof done !== "function") return false;

		// Default gsap timeline value
		var tl = gsap.timeline({ defaults: {
			duration: .75,
			ease: "power3.in",
			stagger: {
				from: "end",
				amount: .1
			}
		}});

		// Scroll to top
		tl = this.top(tl);

		// Hide current view
		tl.to(current.querySelectorAll(".flares:not(.side), .menu-page ol > li, .footer, .footer > *"), {
			y: "+=200",
			opacity: 0
		}, ">");
		tl.to(current.querySelectorAll(".flares.side > img"), {
			x: "-=300",
			opacity: 0,
			delay: .1
		}, "<");
		if (!nonsticky) nonsticky = current.querySelector(".middle").children;
		tl.to(nonsticky, {
			y: "+=200",
			opacity: 0,
			delay: .2
		}, "<");

		// Run loading after all animation
		tl.set(current, {
			onComplete: function() {
				done();
			}
		});
	}
}

// Helper distributeByPosition
function distributeByPosition(vars) {
	var ease = vars.ease,
		from = vars.from || 0,
		base = vars.base || 0,
		axis = vars.axis,
		ratio = {center: 0.5, end: 1, edges:0.5}[from] || 0,
		distances;
	return function(i, target, a) {
		var l = a.length,
			originX, originY, x, y, d, j, minX, maxX, minY, maxY, positions;
		if (!distances) {
			distances = [];
			minX = minY = Infinity;
			maxX = maxY = -minX;
			positions = [];
			for (j = 0; j < l; j++) {
				d = a[j].getBoundingClientRect();
				x = (d.left + d.right) / 2; //based on the center of each element
				y = (d.top + d.bottom) / 2;
				if (x < minX) {
					minX = x;
				}
				if (x > maxX) {
					maxX = x;
				}
				if (y < minY) {
					minY = y;
				}
				if (y > maxY) {
					maxY = y;
				}
				positions[j] = {x:x, y:y};
			}
			originX = isNaN(from) ? minX + (maxX - minX) * ratio : positions[from].x || 0;
			originY = isNaN(from) ? minY + (maxY - minY) * ratio : positions[from].y || 0;
			maxX = 0;
			minX = Infinity;
			for (j = 0; j < l; j++) {
				x = positions[j].x - originX;
				y = originY - positions[j].y;
				distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs((axis === "y") ? y : x);
				if (d > maxX) {
					maxX = d;
				}
				if (d < minX) {
					minX = d;
				}
			}
			distances.max = maxX - minX;
			distances.min = minX;
			distances.v = l = (vars.amount || (vars.each * l) || 0) * (from === "edges" ? -1 : 1);
			distances.b = (l < 0) ? base - l : base;
		}
		l = (distances[i] - distances.min) / distances.max;
		return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
	};
}



// Snap functions
var snap = function(elements, snapPosition = 1, markers = false) {
	// Snap scroll to block
	gToArray(elements).forEach((element, index) => {
		scroll.push(function(tl) {
			return tl;
		}, function (tl) {
			return ScrollTrigger.create({
				markers: markers,
				id: "snap",
				trigger: element,
				start: "0 0",
				end: "100% 0",
				onUpdate: function({progress, direction, isActive}){
					this.progress = progress;
					this.direction = direction;
				},
				snap: {
					snapTo: function(value) {
						var snap = this.progress;

						if (snapPosition == 1) {
							if (this.progress < .2 && this.direction > 0) snap = 0;
							else if (this.progress > .8 && this.direction < 0) snap = 1;
							else if (this.direction > 0) snap = 1;
						} else if (snapPosition == 2) {
							if (this.progress < .2 && this.direction > 0) snap = 0;
							else if (this.progress > .8 && this.direction < 0) snap = 1;
							else if (this.direction > 0) snap = 1;
							else snap = 0;
						} else if (snapPosition < .5 && this.progress > (1 - snapPosition)) {
							snap = 1;
						} else if (snapPosition < .5 && this.progress < snapPosition) {
							snap = 0;
						}

						return snap;
					},
					delay: 0,
					duration: {
						min: .5,
						max: 2
					},
					ease: "expo.out"
				},
				animation: tl
			});
		});
	});
}

// Default barba hooks
barba.hooks.before((data) => {
	return true;
});
barba.hooks.beforeEnter((data) => {
	// Destroy prev scroll
	scroll.destroy();

	window.scrollTo(0, 0);

	return true;
});
barba.hooks.afterEnter((data) => {
	// Read more
	gToArray("a.scrollto").forEach(function(a) {
		a.addEventListener("click", function(e) {
			gsap.to(window, {
				duration: 1,
				ease: "expo.inOut",
				scrollTo: e.target.getAttribute("href")
			});
			e.preventDefault();
		});
	});

	return true;
});

// Initialized barba.js
barba.init({
	transitions: [{
		name: 'default-transition',
		once(data) {
			// Define async and next container
			const done = this.async();
			const next = data.next.container;

			// Animate header
			gsap.set("header", {
				opacity: 1
			});
			gsap.fromTo("header .logo, header .size, header .lamp, header .switch", {
				y: -200,
				opacity: 0
			}, {
				y: 0,
				opacity: 1,
				duration: 1,
				ease: "expo.out",
				delay: 1,
				stagger: .1
			});

			gToArray(".menu").forEach(function(element) {
				var overlay = element.querySelector(".overlay");
				var items = element.querySelector(".items");

				// Show menu animation
				element.querySelector(".switch").addEventListener("click", function(e) {
					e.preventDefault();

					if (!gsap.isTweening(items)) {
						// Animate main element
						gsap.to("main .middle", {
							x: -100,
							duration: .75,
							ease:"power3.out"
						});
						gsap.to("main .middle > .text", {
							x: -50,
							duration: .75,
							ease:"power3.out"
						});
						gsap.to("main .links", {
							x: -25,
							duration: .75,
							ease:"power3.out"
						});
						gsap.to("main .flares", {
							x: -25,
							duration: .75,
							ease:"power3.out"
						});
						// Animate overlay background
						gsap.to(overlay, {
							backgroundColor: "rgba(0,0,0,.5)",
							duration: 1,
							ease:"power3.out"
						});
						// Animate menu showing
						gsap.set(overlay, {
							display: "flex",
							onComplete: function() {
								gsap.fromTo(items.querySelectorAll("li"), {
									x: 50,
									opacity: 0
								}, {
									x: 0,
									opacity: 1,
									ease: "expo.out",
									delay: .25,
									stagger: .1,
									duration: .65
								});

								gsap.fromTo(items, {
									x: "100%"
								}, {
									x: 0,
									ease: "power3.out",
									duration: .75
								});
							}
						});
					}
				});
				// Hide menu animation
				element.querySelectorAll(".overlay, li a, .close").forEach(function(link) {
					link.addEventListener("click", function(e) {
						e.preventDefault();
						if (this != e.target) return false;

						if (!gsap.isTweening(items)) {
							// Animate main element
							gsap.to("main .middle, main .middle > .text, main .links, main .flares", {
								x: 0,
								duration: .75,
								ease:"power3.out"
							});
							// Animate overlay background
							gsap.to(overlay, {
								backgroundColor: "rgba(0,0,0,0)",
								duration: 1,
								ease:"power3.out"
							});
							// Animate menu
							gsap.fromTo(items, {
								x: 0
							}, {
								x: "100%",
								ease: "power3.out",
								duration: .75,
								onComplete: function() {
									gsap.set(overlay, {
										display: "none"
									});
								}
							});
						}
					});
				});
			});

			// Display loading
			loader.init();
			// Loading logic
			loader.show(next, function() {
				// Animate current view and header
				animate.show(next, function() {
					loader.empty();
					done();
				});
			});
		},
		before(data) {
			const done = this.async();
			const current = data.current.container;
			const next = data.next.container;

			// Display loading
			loader.init();

			// Hide current view
			animate.hide(current, function() {
				// Image loading logic
				loader.show(next, function(){
					done();
				});
			});
		},
		leave(data) {
			const done = this.async();
			done();
		},
		enter(data) {
			const done = this.async();
			done();
		},
		after(data) {
			const done = this.async();
			const next = data.next.container;

			// Animate current view
			animate.show(next, function() {
				loader.empty();
				done();
			});
		},
	}, {
		name: 'home-to-detail',
		leave(data) {
			return true;
		},
		enter(data) {
			return true;
		},
		before(data) {
			var tl = gsap.timeline({ defaults: {
				duration: .5,
				ease: "expo.in"
			}});

			tl.set(loader.el, { y: 0 });

			tl.to(".home .flares > img", {
				x: "-=random(100, 250, 10)",
				opacity: 0,
				duration: 1,
				stagger: .1
			}, 0);

			tl.to(".home .arrow-small a, .home .footer", {
				y: "+=100",
				opacity: 0,
				stagger: .1
			}, 0);

			animate.show(data.next.container);

			return tl;
		},
		after(data) {
			var tl = gsap.timeline({ defaults: { duration: .5, ease: "expo.out" }});

			tl.fromTo(".detail .arrow, .detail .footer, .detail .year", {
				y: "+=100",
				opacity: 0
			}, {
				y: "-=100",
				opacity: 1,
				stagger: .1
			}, 0);

			tl.set(loader.el, {
				y: "-100%"
			}, 0);

			return tl;
		},
		from: {
			namespace: ['home']
		},
		to: {
			namespace: ['detail']
		}
	}, {
		name: 'home-to-me',
		leave(data) {
			return true;
		},
		enter(data) {
			return true;
		},
		before(data) {
			const done = this.async();
			const current = data.current.container;
			const next = data.next.container;
			const elements = ".arrow-small a, .arrow";

			// Display loading
			loader.init();

			// Hide current view
			animate.hide(current, function() {
				// Image loading logic
				loader.show(next, function(){
					// Show next container
					gsap.set(next, { opacity: 1 });
					// Hide next elements
					gsap.set(next.querySelectorAll(elements), { opacity: 0 });

					done();
				});
			}, current.querySelectorAll(elements));
		},
		after(data) {
			const done = this.async();
			const current = data.current.container;
			const next = data.next.container;
			const elements = ".arrow-small a, .arrow";

			// Animate current view
			animate.show(next, function() {
				loader.empty();
				done();
			}, next.querySelectorAll(elements));
		},
		from: {
			namespace: ['home', "me"]
		},
		to: {
			namespace: ['home', 'me']
		}
	}, {
		name: 'home-to-hi',
		leave(data) {
			return true;
		},
		enter(data) {
			return true;
		},
		before(data) {
			const done = this.async();
			const current = data.current.container;
			const next = data.next.container;
			const elements = ".arrow-small a, .arrow";

			// Display loading
			loader.init();

			var tl = gsap.timeline({ default: {
				duration: .75,
				stagger: .1,
				ease: "power3.out"
			}});
			tl.to(current.querySelectorAll(".middle > *, .footer .location"), {
				opacity: 0
			}, 0);
			tl.to(current.querySelectorAll(".flares > img"), {
				opacity: 0,
			}, .25);
			tl.fromTo(current.querySelector(".footer .email"), {
				position: "fixed",
				display: "block",
				height: "auto",
				top: "initial",
				left: "var(--padx)",
				bottom: "var(--pady)",
				x: 0,
				y: 0,
				lineHeight: "15px",
				fontSize: "13px",
				fontWeight: 400,
				letterSpacing: "0.1em"
			}, {
				left: window.innerWidth / 2,
				bottom: window.innerHeight / 2,
				x: "-50%",
				y: "50%",
				lineHeight: "80%",
				fontSize: "96px",
				fontWeight: 500,
				letterSpacing: "-0.06em",
				duration: 1,
				ease: "power3.out",
				onComplete: function() {
					// Image loading logic
					loader.show(next, function(){
						// Show next container
						gsap.set(next, { opacity: 1 });
						// Hide next elements
						gsap.set(next.querySelectorAll(elements), { opacity: 0 });

						done();
					});
				}
			}, 0);
		},
		after(data) {
			const done = this.async();

			// Animate current view
			loader.empty();
			done();
		},
		from: {
			namespace: ['home']
		},
		to: {
			namespace: ['hi']
		}
	}],
	views: [{
		namespace: 'home',
		beforeEnter(data) {
			const done = this.async();
			const next = data.next.container;

			// Get body size
			const wh = _q("body").offsetHeight;

			// Count how many blocks
			const l = gToArray(".home > .middle").length - 1;

			// gRandomize plus or minus
			function plusminus() {
				return (gRandom(1, 2, 1) == 1)? "+" : "-";
			}

			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					// Scroll animate Main Text
					gsap.set(".middle:first-child .arrow", {
						rotation: 0
					});
				},
				"(min-aspect-ratio: 1/1)": function() {
					// Scroll animate Main Text
					gsap.set(".middle:first-child .arrow", {
						rotation: 90
					});
				}
			});

			// Snap scroll to block
			snap(".middle", 2);

			// Scroll animate flares
			scroll.push(function(tl) {
				gToArray(".flares > img").forEach(flare => {
					tl.to(flare, {
						x: gRandom(40, 60, 5) + "%",
						ease: "linear"
					}, 0);
				});

				return tl;
			}, function (tl) {
				return ScrollTrigger.create({
					trigger: "#scrollestart",
					start: "0 0",
					endTrigger: "#scrollend",
					end: "100% 100%",
					scrub: true,
					animation: tl
				});
			});

			done();
		}
	}, {
		namespace: 'detail',
		beforeEnter(data) {
			const done = this.async();

			// Read more
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					gsap.set("a.scrollto", { rotation: 0 });
				}, "(min-aspect-ratio: 1/1)": function() {
					gsap.set("a.scrollto", { rotation: 90 });
				}
			});

			// Style - Spread
			var classSpreadName = ".style-spread";
			// Move the text
			scroll.moveText({
				elements: classSpreadName + " .titles > *, " + classSpreadName + " p"
			});
			// Scroll animation
			ScrollTrigger.defaults({
				trigger: classSpreadName + " .thumbs",
				toggleActions: "restart none none reverse"
			});
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					scroll.push(function(tl) {
						tl.fromTo(".style-spread .pic-4", {
							top: gRandom(250, 500, 5) + "px",
							left: "50%",
							x: "-20%",
							rotation: 0
						}, {
							top: 0,
							left: "50%",
							rotation: 7.5,
							ease: "expo.out"
						}, 0);

						tl.fromTo(".style-spread .pic-5", {
							top: gRandom(250, 500, 5) + "px",
							left: "initial",
							right: "50%",
							x: "20%",
							rotation: 0
						}, {
							top: 0,
							right: "50%",
							rotation: -7.5,
							ease: "expo.out"
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							start: "0 75%",
							end: "100% 75%",
							animation: tl,
							scrub: 1
						});
					});
				},
				"(min-aspect-ratio: 1/1)": function() {
					// Move the pictures
					scroll.push(function(tl) {
						tl.fromTo(".style-spread .pic-4", {
							top: gRandom(50, 100, 5) + "%",
							left: 100 + gRandom(200, 300, 5) + "%",
							x: 0,
							y: 0,
							rotation: gRandom(15, 25, 1)
						}, {
							top: "25%",
							left: "50%",
							rotation: -10,
							duration: 1,
							ease: "expo.out"
						}, .1);

						tl.fromTo(".style-spread .pic-5", {
							top: gRandom(50, 100, 5) + "%",
							left: 100 + gRandom(200, 300, 5) + "%",
							x: 0,
							y: 0,
							rotation: 0
						}, {
							top: "40%",
							left: "10%",
							rotation: -30,
							duration: 1,
							ease: "expo.out"
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							start: "-25% 50%",
							end: "50% 50%",
							scrub: 1,
							animation: tl
						});
					});
				}
			});
			// Reset
			ScrollTrigger.defaults({});

			// Style - Spread Left
			var classSpreadLeftName = ".style-spread-left";
			// Move the text
			scroll.moveText({
				elements: classSpreadLeftName + " .titles > *, " + classSpreadLeftName + " p"
			});
			// Scroll animation
			ScrollTrigger.defaults({
				trigger: classSpreadLeftName + " .thumbs"
			});
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					scroll.push(function(tl) {
						tl.fromTo(classSpreadLeftName + " .thumbs picture", {
							opacity: 0,
							y: gRandom(250, 500, 5) + "px",
						}, {
							opacity: 1,
							y: 0,
							ease: "expo.out"
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							start: "0 75%",
							end: "100% 75%",
							animation: tl,
							scrub: 1
						});
					});
				},
				"(min-aspect-ratio: 1/1)": function() {
					// Move the pictures
					scroll.push(function(tl) {
						tl.fromTo(classSpreadLeftName + " .thumbs picture", {
							x: -gRandom(250, 500, 5) + "px",
							rotation: gRandom(5, 10, 1)
						}, {
							x: 0,
							rotation: -5,
							ease: "expo.out"
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							start: "-50% 50%",
							end: "50% 50%",
							scrub: 1,
							animation: tl
						});
					});
				}
			});
			// Reset
			ScrollTrigger.defaults({});

			// Style - Top
			var classTopName = ".style-top";
			// Move text
			scroll.moveText({
				elements: classTopName + " .text h2, " + classTopName + " .text li"
			});
			// Move thumbnails
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					scroll.push(function(tl) {
						tl.fromTo(classTopName + " .thumbs", {
							x: 500
						}, {
							x: -500,
							ease: "linear"
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classTopName,
							start: "-50% 0",
							end:  "100% 0",
							scrub: .75,
							animation: tl
						});
					});
				},
				"(min-aspect-ratio: 1/1)": function() {
					scroll.push(function(tl) {
						tl.fromTo(classTopName + " .thumbs", {
							x: 500
						}, {
							x: -500,
							ease: "linear",
							duration: 5,
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classTopName,
							start: "-25% 0",
							end:  "200% 0",
							scrub: .75,
							animation: tl
						});
					});
				}
			});
			// Move thumbnail again
			scroll.moveThumbs(classTopName + " .thumbs > picture");

			// Style - Top
			var classTopTextName = ".style-top-text";
			// Move text
			scroll.moveText({
				elements: classTopTextName + " .text h2, " + classTopTextName + " .text li"
			});

			// Style - Top
			var classBottomLogoName = ".style-bottom-logo";
			// Move text
			scroll.moveText({
				elements: classBottomLogoName + " .text > *"
			});
			// Move logo
			scroll.push(function(tl) {
				tl.fromTo(classBottomLogoName + " .thumbs", {
					x: -100,
					y: 300,
					rotation: 20,
				}, {
					x: 0,
					y: 0,
					rotation: 0,
					duration: 1,
					ease: "expo.out"
				}, 0);

				tl.fromTo(classBottomLogoName + " .thumbs li", {
					y: 100
				}, {
					y: 0,
					stagger: {
						from: "start",
						amount: .2
					},
					duration: .5,
					ease: "expo.out"
				}, 0);

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: classBottomLogoName,
					start: (window.innerHeight * 1/4) + " " + (window.innerHeight * 3/4),
					end: (window.innerHeight * 3/4) + " " + (window.innerHeight * 3/4),
					scrub: 1,
					animation: tl
				});
			});

			// Style - Flex
			var classFlexName = ".style-flex";
			// Move text
			scroll.moveText({
				elements: classFlexName + " .style-column > *",
				position: "100%"
			});

			// Style - Trunc
			var classTruncName = ".style-trunc";
			// Move text
			scroll.moveText({
				elements: classTruncName + " .text > *, " + classTruncName + " .color ul > *",
				position: "100%",
				horizontal: true
			});

			// Style - Masonry
			var classMasonryName = ".style-masonry";
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					// Rotate masonry
					gsap.set(classMasonryName + " .thumbs", {
						opacity: 1,
						rotation: -5
					});

					// Scroll up
					scroll.push(function(tl) {
						for (var index = 1; index <= 4; index++) {
							var yplus = gRandom(250, 750, 25),
									y = 25;

							if (index == 3) yplus = 0;
							if (index % 2 == 0) y = -25;

							tl.fromTo(classMasonryName + " .thumbs > *:nth-child(4n+" + index + ")", {
								y: y + yplus,
							}, {
								y: y,
								ease: "ease"
							}, 0);
						}

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classMasonryName,
							start: "-25% 100%",
							end:  "100% 50%",
							scrub: .75,
							animation: tl
						});
					});

					// Scroll left
					scroll.push(function(tl) {
						tl.fromTo(classMasonryName + " .thumbs", {
							x: 0,
						}, {
							x: -50,
							ease: "linear"
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classMasonryName,
							start: "-25% 100%",
							end:  "100% 50%",
							scrub: true,
							animation: tl
						});
					});

					// Move text
					scroll.moveText({
						delta: 25,
						elements: classMasonryName + " .text > *",
						position: "75%"
					});

					// Move masonry
					scroll.moveText({
						elements: classMasonryName + " .thumbs"
					});
				},
				"(min-aspect-ratio: 1/1)": function() {
					// Rotate masonry
					gsap.set(classMasonryName + " .thumbs", {
						rotation: 0
					});

					// Scroll
					scroll.push(function(tl) {
						for (var index = 1; index <= 4; index++) {
							var yplus = gRandom(250, 1000, 25),
									y = 50;

							if (index == 3) yplus = 0;
							if (index % 2 == 0) y = -50;

							tl.fromTo(classMasonryName + " .thumbs > *:nth-child(4n+" + index + ")", {
								y: y + yplus,
							}, {
								y: y,
								ease: "ease"
							}, 0);
						}

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classMasonryName,
							start: "-25% 100%",
							end:  "100% 50%",
							scrub: gRandom(75, 125, 5) / 100,
							animation: tl
						});
					});

					// Move text
					scroll.moveText({
						elements: classMasonryName + " .text > *",
						position: "75%"
					});

					// Move masonry
					scroll.moveText({
						elements: classMasonryName + " .thumbs"
					});
				}
			});

			// Style - Angled
			var classAngledName = ".style-angled",
				classAngledNamePicture = classAngledName + " .thumbs > picture";
			// Move pictures
			scroll.moveThumbs(classAngledNamePicture, "75%");
			// Scroll pictures
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					scroll.push(function(tl) {
						gToArray(classAngledNamePicture).forEach(picture => {
							tl.fromTo(picture, {
								rotation: -5,
								x: 650,
							}, {
								rotation: -5,
								x: -150
							}, 0);
						});

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classAngledName,
							endTrigger: ".links",
							start: "0 100%",
							end: "100% 100%",
							scrub: .75,
							animation: tl
						});
					});
				},
				"(min-aspect-ratio: 1/1)": function() {
					scroll.push(function(tl) {
						gToArray(classAngledNamePicture).forEach(picture => {
							tl.fromTo(picture, {
								rotation: 0,
								x: 500,
							}, {
								rotation: 0,
								x: -500
							}, 0);
						});

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classAngledName,
							endTrigger: ".links",
							start: "0 100%",
							end: "100% 100%",
							scrub: .75,
							animation: tl
						});
					});
				}
			});
			// Move text
			scroll.moveText({
				elements: classAngledName + " .text > *",
				position: "85%"
			});

			// Style - Slideshow
			var classSlideshow = ".style-slideshow";
			// All the functions
			gToArray(classSlideshow).forEach(function(slideshow) {
				// Add navigation
				slideshow.innerHTML += "<div class='before'></div><div class='after'></div>";
				// Variables
				var that = slideshow;
				that.slideshowScroll = that.children[0];
				that.slideshowParent = that.querySelector("ul");
				that.slideshowChild = that.slideshowScroll.querySelectorAll("li");
				that.l = gToArray(that.slideshowChild).length;
				that.pos = 0;
				that.pos_start = true;
				that.pos_end = false;
				that.before = that.children[1];
				that.after = that.children[2];
				// Fixed size
				that.fixedSize = function() {
					var width = 0;
					var height = 0;

					gToArray(that.slideshowChild).forEach(function(element) {
						element.style.removeProperty('width');
						gsap.set(element, {
							width: element.offsetWidth
						});
						width += element.offsetWidth;
					});

					gsap.set(that.slideshowParent, {
						width: width
					})

					return width;
				}
				that.fixedSize();
				window.addEventListener("resize", that.fixedSize);
				// Check position
				that.checkPos = function () {
					var rect = this.slideshowParent.getBoundingClientRect();

					this.pos_start = this.pos_end = false;
					this.pos = Math.round((rect.left * -1) / this.slideshowChild[this.pos].offsetWidth);

					if (this.pos == 0) this.pos_start = true;
					if ((Math.round(rect.width) + rect.left - this.slideshowScroll.offsetWidth) <= 10) this.pos_end = true;

					return this.pos;
				}
				// Show / hide navigation
				that.navigationHide = function () {
					that.checkPos();
					gsap.to(that.before, {
						duration: .25,
						opacity: (that.pos_start)? .15 : 1
					});
					gsap.to(that.after, {
						duration: .25,
						opacity: (that.pos_end)? .15 : 1
					});
				}
				that.navigationHide();
				// Scroll events
				gToArray(that.slideshowChild).forEach(function(element, index) {
					scroll.push(function(tl) {
						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: element,
							scroller: that.slideshowScroll,
							horizontal: true,
							start: "0 0",
							end: "100% 0",
							onUpdate: function({progress, direction, isActive}){
								this.progress = progress;
								this.direction = direction;
								that.navigationHide();
							},
							snap: {
								snapTo: function(value) {
									var snap = 0;

									if (this.progress < .1 && this.direction > 0) snap = 0;
									else if (this.progress > .9 && this.direction < 0) snap = 1;
									else if (this.direction > 0) snap = 1;

									return snap;
								},
								delay: 0,
								duration: {
									min: .5,
									max: 2
								},
								ease: "expo"
							},
							animation: tl
						});
					});
				});
				// Click events
				that.moveScroll = function (_pos) {
					if (_pos < 0) this.pos = 0;
					else if (_pos > this.l - 1) this.pos = this.l - 1;
					else this.pos = _pos;

					gsap.to(this.slideshowScroll, {
						duration: 2,
						scrollTo: {
							x: this.pos * this.slideshowChild[this.pos].offsetWidth
						},
						ease: "expo.out",
						onComplete: this.navigationHide
					});
				}
				that.before.addEventListener("click", function(e) {
					gsap.timeline({ default: {
						ease: "expo"
					}}).to(this, {
						duration: .25,
						marginLeft: -25
					}).to(this, {
						duration: .25,
						marginLeft: 0
					});
					that.moveScroll(that.pos-1);
				});
				ScrollTrigger.matchMedia({
					"(min-aspect-ratio: 1/1)": function() {
						hoverEvents([that.before], function(e) {
							gsap.to(that.slideshowChild, {
								x: 20
							});
						}, function(e) {
							gsap.to(that.slideshowChild, {
								x: 0
							});
						});
					}
				});
				//
				that.after.addEventListener("click", function(e) {
					gsap.timeline({ default: {
						ease: "expo"
					}}).to(this, {
						duration: .25,
						marginRight: -25
					}).to(this, {
						duration: .25,
						marginRight: 0
					});
					that.moveScroll(that.pos + 1);
				});
				ScrollTrigger.matchMedia({
					"(min-aspect-ratio: 1/1)": function() {
						hoverEvents([that.after], function(e) {
							gsap.to(that.slideshowChild, {
								x: -20
							});
						}, function(e) {
							gsap.to(that.slideshowChild, {
								x: 0
							});
						});
					}
				});
				// Scroll animation
				scroll.push(function(tl) {
					tl.fromTo(that.slideshowScroll, {
						opacity: 0,
						y: 500
					}, {
						opacity: 1,
						y: 0,
						ease: "expo.out"
					}, 0);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: that,
						start: "12.5% 90%",
						end: "50% 90%",
						scrub: 1,
						animation: tl
					});
				});
				//
				scroll.push(function(tl) {
					tl.fromTo(that.before, {
						opacity: 0,
						x: -100
					}, {
						opacity: 1,
						x: 0,
						ease: "expo.out"
					}, 0);
					tl.fromTo(that.after, {
						opacity: 0,
						x: 100
					}, {
						opacity: 1,
						x: 0,
						ease: "expo.out"
					}, 0);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: that.before,
						start: "0 90%",
						end: (window.innerHeight / 5) + " 90%",
						scrub: 1,
						animation: tl
					});
				});
			});
			var classSlideshowSmall = ".style-slideshow-small";
			// All the functions
			gToArray(classSlideshowSmall).forEach(function(slideshow, index) {
				scroll.push(function(tl) {
					tl.fromTo(slideshow.children[0].querySelectorAll("picture"), {
						x: "200%"
					}, {
						x: 0,
						ease: "expo.out"
					}, 0);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: slideshow,
						start: "0 90%",
						end: "50% 90%",
						scrub: .75,
						animation: tl
					});
				});
				//
			});
			// Links
			// Move text
			gToArray(".links").forEach(function(element) {
				scroll.moveText({
					elements: element.querySelectorAll("nav > *"),
					position: "100%"
				});
			});

			// Snap to element
			snap(".middle, .links", .15);

			done();
		}
	}, {
		namespace: 'me',
		beforeEnter(data) {
			const done = this.async();

			// I'm UI/UX and us sections
			// Snap to element
			snap(".imuiux, .us", .5);
			// Scroll events
			gToArray(".imuiux, .us").forEach(function(element, index) {
				// Scroll and fade
				scroll.push(function(tl) {
					var el = element.querySelectorAll(".text > *");

					if (index > 0) {
						tl.fromTo(el, {
							y: 50,
							opacity: 0
						}, {
							y: 0,
							opacity: 1,
							duration: 1,
							ease: "power2.out"
						}, 0);
					}

					tl.fromTo(el, {
						y: 0
					}, {
						y: -50,
						duration: 2,
						ease: "power2.inOut"
					}, 1);

					tl.fromTo(el, {
						opacity: 1
					}, {
						opacity: 0,
						duration: 1,
						ease: "power2.out"
					}, 2);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						pin: true,
						pinSpacing: false,
						start: "0 0",
						end: "100%+=50% 0",
						animation: tl,
						scrub: true
					});
				});
			});

			// Spinning Mr. Goat and Pinning
			function resizemrgoat() {
				var size = window.innerWidth * 2/3;
				var boxSet = gsap.quickSetter(".mrgoat img", "css");

				if (window.innerWidth > window.innerHeight) size = window.innerHeight * 2/3;

				boxSet({
					width: "auto",
					maxHeight: size
				});
			}
			window.addEventListener("resize", resizemrgoat);
			resizemrgoat();
			gToArray(".mrgoat").forEach(function(element, index) {
				const imgs = gToArray(element.querySelectorAll(".thumbs > img"));
				const h2s = gToArray(element.querySelectorAll(".h2"));
				const ig = element.querySelectorAll(".ig");
				const thumbs = element.querySelectorAll(".thumbs");
				const mrgoat = {
					frame: 0
				};
				// Initial value
				gsap.set(thumbs, {
					opacity: 0
				});
				gsap.set(ig, {
					opacity: 0,
					x: 100
				});
				gsap.set(element.querySelectorAll(".h2 > *"), {
					opacity: 0,
					y: 50
				});
				// Animate appearing
				scroll.push(function(tl) {
					// Show Mr. Goat
					tl.to(thumbs, {
						opacity: 1,
						duration: 3,
						ease: "expo.out"
					}, 0);
					// Show IG link
					tl.to(ig, {
						opacity: 1,
						x: 0,
						duration: 1,
						ease: "expo.out"
					}, 0);
					// Animate H2
					h2s.forEach(function(h2, index) {
						// Show H2
						tl.to(h2.children, {
							y: 0,
							opacity: 1,
							duration: 1,
							ease: "power2.in"
						}, (index * 2) + 1);
						// Hide H2
						tl.to(h2.children, {
							y: -50,
							opacity: 0,
							duration: 1,
							ease: "power2.out"
						}, (index * 2) + 2.5);
					});
					// Show Mr. Goat before disapearing
					tl.set(thumbs, {
						opacity: 1
					});
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: (h2s.length + 1) + "00% 0",
						animation: tl,
						scrub: true
					});
				});
				// Animate Disappearing
				scroll.push(function(tl) {
					// Hide Mr. Goat
					tl.to(thumbs, {
						opacity: 0,
						duration: 1,
						ease: "expo.out"
					}, .1);
					// Hide IG link
					tl.to(ig, {
						opacity: 0,
						x: 100,
						duration: 1,
						ease: "expo.in"
					}, 3);
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: (h2s.length + 1) + "00% 0",
						end: (h2s.length + 3) + "00% 0",
						animation: tl,
						scrub: true
					});
				});
				// Pinning
				scroll.push(function(tl) {
					return tl
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: (h2s.length + 3) + "00% 0",
						animation: tl,
						pin: true,
					});
				});
				// Spin Mr. Goat
				var prev = null;
				gsap.set(imgs, {
					opacity: 0
				});
				scroll.push(function(tl) {
					tl.to(mrgoat, {
						frame: imgs.length - 1,
						snap: "frame",
						duration: 1,
						repeat: 4,
						ease: "linear",
						onUpdate: function () {
							var el = element.querySelector(".mrgoat" + (mrgoat.frame + 1));
							if (prev) prev.style.opacity = 0;
							el.style.opacity = 1;
							prev = el;
						}
					}, 0);
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "-100% 0",
						end: (h2s.length + 4) + "00% 0",
						animation: tl,
						scrub: true
					});
				});
			});

			// Animate IG posts and Pinning
			// Resize picture
			function resizeig() {
				var size = window.innerWidth * 2/3;
				if (window.innerWidth > window.innerHeight) size = window.innerHeight * 1/2;

 				gsap.set(".igstage .thumbs a", {
					width: size,
					height: size
				});

				gsap.set(".igstage", {
					marginTop: -3 * window.innerHeight,
					display: "block"
				});
			}
			window.addEventListener("resize", resizeig);
			resizeig();
			//
			gsap.set(".igstage .thumbs", {
				position: "relative",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			})
			//
			gToArray(".igstage").forEach(function(element, index) {
				var a = element.querySelectorAll(".thumbs a");
				var delta = 50;
				// Set default values
				gsap.set(a, {
					position: "absolute",
					zIndex: function(index) {
						return a.length - index;
					},
					transformOrigin: "center",
					opacity: 0,
					scale: .8
				});
				// Animate Post
				a.forEach(function(pic, index) {
					// Show
					scroll.push(function(tl) {
						tl.to(pic, {
							opacity: 1,
							duration: .25,
							ease: "power3.out"
						}, 0);

						tl.to(pic, {
							scale: 1,
							duration: 1,
							ease: "power3.out"
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: element,
							start: (index * delta) + "% 0",
							end: ((index + 1) * delta) + "% 0",
							animation: tl,
							toggleActions: "restart none none reverse"
						});
					});
					// Swipe
					if(index < (a.length - 1)) {
						scroll.push(function(tl) {
							var random = gRandom([true, false]);
							var x = random ? (pic.offsetWidth * -3) : window.innerWidth + (pic.offsetWidth * 3);
							var rotation = random ? -20 : 20;

							tl.to(pic, {
								x: x,
								y: window.innerHeight * -2/3,
								rotation: rotation + "deg",
								duration: .75,
								ease: "expo.in"
							}, 0);

							tl.to(pic, {
								opacity: 0,
								duration: .15,
								ease: "expo.in"
							}, .6);

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								trigger: element,
								start: ((index + 1) * delta) + "% 0",
								end: ((index + 2) * delta) + "% 0",
								animation: tl,
								toggleActions: "restart none none reverse"
							});
						});
					}
				});
				// Show igstage
				scroll.push(function(tl) {
					tl.fromTo(element.querySelector(".thumbs"), {
						y: window.innerHeight/4,
						opacity: 0
					}, {
						y: 0,
						opacity: 1,
						ease: "expo.out"
					}, 0);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: "100% 0",
						animation: tl,
						scrub: true
					});
				});
				// Show skip button
				scroll.push(function(tl) {
					tl.fromTo(element, {
						backgroundColor: ""
					}, {
						backgroundColor: "var(--white)"
					});
					tl.fromTo(element.querySelector(".scrollto"), {
						y: -100,
						opacity: 0
					}, {
						y: 0,
						opacity: 1,
						ease: "expo.in",
						duration: .5
					});
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: ((a.length + 1) * delta * 1/3) + "% 0",
						end: ((a.length + 1) * delta * 1/3) + "% 0",
						animation: tl,
						toggleActions: "restart none none reverse"
					});
				});
				// Pinning
				scroll.push(function(tl) {
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: ((a.length + 1) * delta) + "% 0",
						animation: tl,
						pin: true,
						scrub: true,
						anticipatePin: 2
					});
				});
			});

			// Animate cofounder
			// Resize position
			function resizecofound() {
				gsap.set(".cofound", {
					marginTop: -1 * window.innerHeight
				});
			}
			window.addEventListener("resize", resizecofound);
			resizecofound();
			gToArray(".cofound").forEach(function(element, index) {
				var picture = element.querySelector("picture");
				// Hover
				hoverEvents(element.querySelectorAll("a"), function() {
					gsap.killTweensOf(picture);
					gsap.to(picture, {
						scale: 2,
						duration: 120,
						ease: "linear"
					});
				}, function() {
					gsap.killTweensOf(picture);
					gsap.to(picture, {
						scale: 1,
						duration: 1,
						ease: "expo.out"
					});
				})
				// Pin
				scroll.push(function(tl) {
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: "100% 0",
						animation: tl,
						scrub: true,
						pin: true,
						anticipatePin: 1
					});
				});
				// Animate
				scroll.push(function(tl) {
					tl.fromTo(element.querySelectorAll(".text > *"), {
						y: window.innerHeight/10
					}, {
						y: window.innerHeight/-10,
						ease: "linear",
						duration: 2
					}, 0);
					tl.fromTo(element.querySelectorAll(".thumbs"), {
						y: 0
					}, {
						y: window.innerHeight/5,
						ease: "linear",
						duration: 1
					}, 1);
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: "200% 0",
						animation: tl,
						scrub: true
					});
				});
			});

			// Move Flare
			var flare = [];
			var animation = function(el, idx) {
				var y = ["150%", "-300%"];
				if (gRandom(1, 2, 1) == 1) y = ["-300%", "200%"];

				return gsap.fromTo(el, {
					left: gRandom(20, 80, 10) + "%",
					y: y[0],
					rotation: gRandom(75, 135, 5)
				}, {
					y: y[1],
					rotation: gRandom(75, 135, 5),
					duration: gRandom(15, 30, 4),
					ease: "linear",
					onCompleteParams: [el, idx],
					onComplete: function(el, idx) {
						animation(el, idx);
					}
				});
			}
			gToArray(".flares").forEach(function(el1, idx1) {
				flare[idx1] = [];
				gToArray(el1.children).forEach(function(el2, idx2) {
					gsap.set(el2, {
						height: "100vw",
						width: "auto",
						opacity: 1,
						top: 0
					});
					// flare[idx1][idx2] = animation(el2, idx2);
				});
			});

			// Links
			// Move text
			gToArray(".links").forEach(function(element) {
				scroll.moveText({
					elements: element.querySelectorAll("nav > *"),
					position: "100%"
				});
			});

			// Snap to element
			snap(".igstage, .cofound, .links", .25);

			done();
		}
	}, {
		namespace: 'hi',
		beforeEnter(data) {
			const done = this.async();
			var flare = {
				elements: "",
				show: function(elements, repeat = false) {
					var that = this;

					this.elements = elements;

					gsap.killTweensOf(this.elements);
					if (!repeat) gsap.to(this.elements, {
						opacity: 1,
						ease: "ease.out"
					});
					if (!repeat) gsap.to(this.elements, {
						x: "random(-75,75,10)%",
						y: "random(10,30,5)%",
						ease: "ease.out"
					});
					gsap.to(this.elements, {
						x: "random(-100,100,10)%",
						y: "random(10,30,5)%",
						rotation: "random(-5,5,1)deg",
						scale: "random(1,2,1)",
						duration: 5,
						ease: "ease.inOut",
						onComplete: function() {
							that.show(that.elements, true);
						}
					});
				},
				hide: function() {
					gsap.killTweensOf(this.elements);
					gsap.to(this.elements, {
						opacity: 0,
						scale: 1,
						x: "random(-75,75,10)%",
						y: "random(0,20,5)%",
						ease: "ease.in"
					});
				}
			}

			hoverEvents(_qAll(".hi .email"), function() {
				flare.show(".hi .flares > img.yellow, .hi .flares > img.red");
			}, function() {
				flare.hide();
			});

			hoverEvents(_qAll(".hi .social"), function() {
				flare.show(".hi .flares > img.red, .hi .flares > img.blue");
			}, function() {
				flare.hide();
			});

			hoverEvents(_qAll(".hi .website"), function() {
				flare.show(".hi .flares > img.blue, .hi .flares > img.green");
			}, function() {
				flare.hide();
			});

			done();
		}
	}]
});
//# sourceMappingURL=bundle.js.map
