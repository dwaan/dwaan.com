/*!
 * GSAP 3.2.0
 * https://greensock.com
 * 
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(e){"use strict";function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function n(t){return"string"==typeof t}function o(t){return"function"==typeof t}function p(t){return"number"==typeof t}function q(t){return void 0===t}function r(t){return"object"==typeof t}function s(t){return!1!==t}function t(){return"undefined"!=typeof window}function u(t){return o(t)||n(t)}function K(t){return(l=dt(t,at))&&ne}function L(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")}function M(t,e){return!e&&console.warn(t)}function N(t,e){return t&&(at[t]=e)&&l&&(l[t]=e)||at}function O(){return 0}function Y(t){var e,n,i=t[0];if(r(i)||o(i)||(t=[t]),!(e=(i._gsap||{}).harness)){for(n=pt.length;n--&&!pt[n].targetTest(i););e=pt[n]}for(n=t.length;n--;)t[n]&&(t[n]._gsap||(t[n]._gsap=new Rt(t[n],e)))||t.splice(n,1);return t}function Z(t){return t._gsap||Y(yt(t))[0]._gsap}function $(t,e){var r=t[e];return o(r)?t[e]():q(r)&&t.getAttribute(e)||r}function _(t,e){return(t=t.split(",")).forEach(e)||t}function aa(t){return Math.round(1e5*t)/1e5||0}function ba(t,e){for(var r=e.length,n=0;t.indexOf(e[n])<0&&++n<r;);return n<r}function ca(t,e,r){var n,i=p(t[1]),a=(i?2:1)+(e<2?0:1),o=t[a];if(i&&(o.duration=t[1]),o.parent=r,e){for(n=o;r&&!("immediateRender"in n);)n=r.vars.defaults||{},r=s(r.vars.inherit)&&r.parent;o.immediateRender=s(n.immediateRender),e<2?o.runBackwards=1:o.startAt=t[a-1]}return o}function da(){var t,e,r=ot.length,n=ot.slice(0);for(ut={},t=ot.length=0;t<r;t++)(e=n[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)}function ea(t,e,r,n){ot.length&&da(),t.render(e,r,n),ot.length&&da()}function fa(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(it).length<2?e:t}function ga(t){return t}function ha(t,e){for(var r in e)r in t||(t[r]=e[r]);return t}function ia(t,e){for(var r in e)r in t||"duration"===r||"ease"===r||(t[r]=e[r])}function ka(t,e){for(var n in e)t[n]=r(e[n])?ka(t[n]||(t[n]={}),e[n]):e[n];return t}function la(t,e){var r,n={};for(r in t)r in e||(n[r]=t[r]);return n}function pa(t,e,r,n){void 0===r&&(r="_first"),void 0===n&&(n="_last");var i=e._prev,a=e._next;i?i._next=a:t[r]===e&&(t[r]=a),a?a._prev=i:t[n]===e&&(t[n]=i),e._dp=t,e._next=e._prev=e.parent=null}function qa(t,e){!t.parent||e&&!t.parent.autoRemoveChildren||t.parent.remove(t),t._act=0}function ra(t){for(var e=t;e;)e._dirty=1,e=e.parent;return t}function ua(t){return t._repeat?_t(t._tTime,t=t.duration()+t._rDelay)*t:0}function wa(t,e){return(t-e._start)*e._ts+(0<=e._ts?0:e._dirty?e.totalDuration():e._tDur)}function xa(t){return t._end=aa(t._start+(t._tDur/Math.abs(t._ts||t._pauseTS||B)||0))}function ya(t,e,r){if(e.parent&&qa(e),e._start=aa(r+e._delay),e._end=aa(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),function _addLinkedListItem(t,e,r,n,i){void 0===r&&(r="_first"),void 0===n&&(n="_last");var a,s=t[n];if(i)for(a=e[i];s&&s[i]>a;)s=s._prev;s?(e._next=s._next,s._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[n]=e,e._prev=s,e.parent=t}(t,e,"_first","_last",t._sort?"_start":0),(t._recent=e)._time||!e._dur&&e._initted){var n=(t.rawTime()-e._start)*e._ts;(!e._dur||gt(0,e.totalDuration(),n)-e._tTime>B)&&e.render(n,!0)}if(ra(t)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(var i=t;i._dp;)0<=i.rawTime()&&i.totalTime(i._tTime,!0),i=i._dp;t._zTime=-B}return t}function za(t,e,r,n){return qt(t,e),t._initted?!r&&t._pt&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&c!==Mt.frame?(ot.push(t),t._lazy=[e,n],1):void 0:1}function Ca(t,e,r){var n=t._repeat,i=aa(e);return t._dur=i,t._tDur=n?n<0?1e12:aa(i*(n+1)+t._rDelay*n):i,r||ra(t.parent),t.parent&&xa(t),t}function Da(t){return t instanceof Bt?ra(t):Ca(t,t._dur)}function Fa(t,e){var r,i,a=t.labels,s=t._recent||mt,o=t.duration()>=z?s.endTime(!1):t._dur;return n(e)&&(isNaN(e)||e in a)?"<"===(r=e.charAt(0))||">"===r?("<"===r?s._start:s.endTime(0<=s._repeat))+(parseFloat(e.substr(1))||0):(r=e.indexOf("="))<0?(e in a||(a[e]=o),a[e]):(i=+(e.charAt(r-1)+e.substr(r+1)),1<r?Fa(t,e.substr(0,r-1))+i:o+i):null==e?o:+e}function Ga(t,e){return t||0===t?e(t):e}function Ia(t){return(t+"").substr((parseFloat(t)+"").length)}function La(t,e){return t&&r(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&r(t[0]))&&!t.nodeType&&t!==i}function Oa(t){return t.sort(function(){return.5-Math.random()})}function Pa(t){if(o(t))return t;var d=r(t)?t:{each:t},_=Dt(d.ease),m=d.from||0,g=parseFloat(d.base)||0,v={},e=0<m&&m<1,y=isNaN(m)||e,T=d.axis,b=m,w=m;return n(m)?b=w={center:.5,edges:.5,end:1}[m]||0:!e&&y&&(b=m[0],w=m[1]),function(t,e,r){var n,i,a,s,o,u,h,l,f,p=(r||d).length,c=v[p];if(!c){if(!(f="auto"===d.grid?0:(d.grid||[1,z])[1])){for(h=-z;h<(h=r[f++].getBoundingClientRect().left)&&f<p;);f--}for(c=v[p]=[],n=y?Math.min(f,p)*b-.5:m%f,i=y?p*w/f-.5:m/f|0,l=z,u=h=0;u<p;u++)a=u%f-n,s=i-(u/f|0),c[u]=o=T?Math.abs("y"===T?s:a):X(a*a+s*s),h<o&&(h=o),o<l&&(l=o);"random"===m&&Oa(c),c.max=h-l,c.min=l,c.v=p=(parseFloat(d.amount)||parseFloat(d.each)*(p<f?p-1:T?"y"===T?p/f:f:Math.max(f,p/f))||0)*("edges"===m?-1:1),c.b=p<0?g-p:g,c.u=Ia(d.amount||d.each)||0,_=_&&p<0?Ft(_):_}return p=(c[t]-c.min)/c.max||0,aa(c.b+(_?_(p):p)*c.v)+c.u}}function Qa(e){var r=e<1?Math.pow(10,(e+"").length-2):1;return function(t){return~~(Math.round(parseFloat(t)/e)*e*r)/r+(p(t)?0:Ia(t))}}function Ra(u,t){var h,l,e=W(u);return!e&&r(u)&&(h=e=u.radius||z,u.values?(u=yt(u.values),(l=!p(u[0]))&&(h*=h)):u=Qa(u.increment)),Ga(t,e?o(u)?function(t){return l=u(t),Math.abs(l-t)<=h?l:t}:function(t){for(var e,r,n=parseFloat(l?t.x:t),i=parseFloat(l?t.y:0),a=z,s=0,o=u.length;o--;)(e=l?(e=u[o].x-n)*e+(r=u[o].y-i)*r:Math.abs(u[o]-n))<a&&(a=e,s=o);return s=!h||a<=h?u[s]:t,l||s===t||p(t)?s:s+Ia(t)}:Qa(u))}function Sa(t,e,r,n){return Ga(W(t)?!e:!0===r?!!(r=0):!n,function(){return W(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(n=r<1?Math.pow(10,(r+"").length-2):1)&&~~(Math.round((t+Math.random()*(e-t))/r)*r*n)/n})}function Wa(e,r,t){return Ga(t,function(t){return e[~~r(t)]})}function Za(t){for(var e,r,n,i,a=0,s="";~(e=t.indexOf("random(",a));)n=t.indexOf(")",e),i="["===t.charAt(e+7),r=t.substr(e+7,n-e-7).match(i?it:H),s+=t.substr(a,e-a)+Sa(i?r:+r[0],+r[1],+r[2]||1e-5),a=n+1;return s+t.substr(a,t.length-a)}function ab(t,e,r){var n,i,a,s=t.labels,o=z;for(n in s)(i=s[n]-e)<0==!!r&&i&&o>(i=Math.abs(i))&&(a=n,o=i);return a}function cb(t){return qa(t),t.progress()<1&&bt(t,"onInterrupt"),t}function hb(t,e,r){return(6*(t=t<0?t+1:1<t?t-1:t)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*wt+.5|0}function ib(t,e,r){var n,i,a,s,o,u,h,l,f,c,d=t?p(t)?[t>>16,t>>8&wt,t&wt]:0:xt.black;if(!d){if(","===t.substr(-1)&&(t=t.substr(0,t.length-1)),xt[t])d=xt[t];else if("#"===t.charAt(0))4===t.length&&(t="#"+(n=t.charAt(1))+n+(i=t.charAt(2))+i+(a=t.charAt(3))+a),d=[(t=parseInt(t.substr(1),16))>>16,t>>8&wt,t&wt];else if("hsl"===t.substr(0,3))if(d=c=t.match(H),e){if(~t.indexOf("="))return d=t.match(J),r&&d.length<4&&(d[3]=1),d}else s=+d[0]%360/360,o=d[1]/100,n=2*(u=d[2]/100)-(i=u<=.5?u*(o+1):u+o-u*o),3<d.length&&(d[3]*=1),d[0]=hb(s+1/3,n,i),d[1]=hb(s,n,i),d[2]=hb(s-1/3,n,i);else d=t.match(H)||xt.transparent;d=d.map(Number)}return e&&!c&&(n=d[0]/wt,i=d[1]/wt,a=d[2]/wt,u=((h=Math.max(n,i,a))+(l=Math.min(n,i,a)))/2,h===l?s=o=0:(f=h-l,o=.5<u?f/(2-h-l):f/(h+l),s=h===n?(i-a)/f+(i<a?6:0):h===i?(a-n)/f+2:(n-i)/f+4,s*=60),d[0]=~~(s+.5),d[1]=~~(100*o+.5),d[2]=~~(100*u+.5)),r&&d.length<4&&(d[3]=1),d}function jb(t){var r=[],n=[],i=-1;return t.split(kt).forEach(function(t){var e=t.match(tt)||[];r.push.apply(r,e),n.push(i+=e.length+1)}),r.c=n,r}function kb(t,e,r){var n,i,a,s,o="",u=(t+o).match(kt),h=e?"hsla(":"rgba(",l=0;if(!u)return t;if(u=u.map(function(t){return(t=ib(t,e,1))&&h+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(a=jb(t),(n=r.c).join(o)!==a.c.join(o)))for(s=(i=t.replace(kt,"1").split(tt)).length-1;l<s;l++)o+=i[l]+(~n.indexOf(l)?u.shift()||h+"0,0,0,0)":(a.length?a:u.length?u:r).shift());if(!i)for(s=(i=t.split(kt)).length-1;l<s;l++)o+=i[l]+u[l];return o+i[s]}function nb(t){var e,r=t.join(" ");if(kt.lastIndex=0,kt.test(r))return e=Ot.test(r),t[1]=kb(t[1],e),t[0]=kb(t[0],e,jb(t[1])),!0}function vb(t){var e=(t+"").split("("),r=Ct[e[0]];return r&&1<e.length&&r.config?r.config.apply(null,~t.indexOf("{")?[function _parseObjectInString(t){for(var e,r,n,i={},a=t.substr(1,t.length-3).split(":"),s=a[0],o=1,u=a.length;o<u;o++)r=a[o],e=o!==u-1?r.lastIndexOf(","):r.length,n=r.substr(0,e),i[s]=isNaN(n)?n.replace(At,"").trim():+n,s=r.substr(e+1).trim();return i}(e[1])]:rt.exec(t)[1].split(",").map(fa)):Ct._CE&&St.test(t)?Ct._CE("",t):r}function yb(t,e,r,n){void 0===r&&(r=function easeOut(t){return 1-e(1-t)}),void 0===n&&(n=function easeInOut(t){return t<.5?e(2*t)/2:1-e(2*(1-t))/2});var i,a={easeIn:e,easeOut:r,easeInOut:n};return _(t,function(t){for(var e in Ct[t]=at[t]=a,Ct[i=t.toLowerCase()]=r,a)Ct[i+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=Ct[t+"."+e]=a[e]}),a}function zb(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}}function Ab(r,t,e){function Vk(t){return 1===t?1:n*Math.pow(2,-10*t)*Q((t-a)*i)+1}var n=1<=t?t:1,i=(e||(r?.3:.45))/(t<1?t:1),a=i/I*(Math.asin(1/n)||0),s="out"===r?Vk:"in"===r?function(t){return 1-Vk(1-t)}:zb(Vk);return i=I/i,s.config=function(t,e){return Ab(r,t,e)},s}function Bb(e,r){function bl(t){return t?--t*t*((r+1)*t+r)+1:0}void 0===r&&(r=1.70158);var t="out"===e?bl:"in"===e?function(t){return 1-bl(1-t)}:zb(bl);return t.config=function(t){return Bb(e,t)},t}var R,i,a,h,l,f,c,d,m,g,v,y,T,b,w,x,k,P,C,S,A,F,D,U={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},E={duration:.5,overwrite:!1,delay:0},z=1e8,B=1/z,I=2*Math.PI,V=I/4,j=0,X=Math.sqrt,G=Math.cos,Q=Math.sin,W=Array.isArray,H=/(?:-?\.?\d|\.)+/gi,J=/[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,tt=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,et=/[-+=.]*\d+(?:\.|e-|e)*\d*/gi,rt=/\(([^()]+)\)/i,nt=/[+-]=-?[\.\d]+/,it=/[#\-+.]*\b[a-z\d-=+%.]+/gi,at={},st={},ot=[],ut={},ht={},lt={},ft=30,pt=[],ct="onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",dt=function _merge(t,e){for(var r in e)t[r]=e[r];return t},_t=function _animationCycle(t,e){return(t/=e)&&~~t===t?~~t-1:~~t},mt={_start:0,endTime:O},gt=function _clamp(t,e,r){return r<t?t:e<r?e:r},vt=[].slice,yt=function toArray(t,e){return!n(t)||e||!a&&Pt()?W(t)?function _flatten(t,e,r){return void 0===r&&(r=[]),t.forEach(function(t){return n(t)&&!e||La(t,1)?r.push.apply(r,yt(t)):r.push(t)})||r}(t,e):La(t)?vt.call(t,0):t?[t]:[]:vt.call(h.querySelectorAll(t),0)},Tt=function mapRange(e,t,r,n,i){var a=t-e,s=n-r;return Ga(i,function(t){return r+(t-e)/a*s})},bt=function _callback(t,e,r){var n,i,a=t.vars,s=a[e];if(s)return n=a[e+"Params"],i=a.callbackScope||t,r&&ot.length&&da(),n?s.apply(i,n):s.call(i)},wt=255,xt={aqua:[0,wt,wt],lime:[0,wt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,wt],navy:[0,0,128],white:[wt,wt,wt],olive:[128,128,0],yellow:[wt,wt,0],orange:[wt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[wt,0,0],pink:[wt,192,203],cyan:[0,wt,wt],transparent:[wt,wt,wt,0]},kt=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";for(t in xt)e+="|"+t+"\\b";return new RegExp(e+")","gi")}(),Ot=/hsl[a]?\(/,Mt=(b=Date.now,w=500,x=33,k=b(),P=k,S=C=1/240,T={time:0,frame:0,tick:function tick(){_j(!0)},wake:function wake(){f&&(!a&&t()&&(i=a=window,h=i.document||{},at.gsap=ne,(i.gsapVersions||(i.gsapVersions=[])).push(ne.version),K(l||i.GreenSockGlobals||!i.gsap&&i||{}),y=i.requestAnimationFrame),g&&T.sleep(),v=y||function(t){return setTimeout(t,1e3*(S-T.time)+1|0)},m=1,_j(2))},sleep:function sleep(){(y?i.cancelAnimationFrame:clearTimeout)(g),m=0,v=O},lagSmoothing:function lagSmoothing(t,e){w=t||1e8,x=Math.min(e,w,0)},fps:function fps(t){C=1/(t||240),S=T.time+C},add:function add(t){A.indexOf(t)<0&&A.push(t),Pt()},remove:function remove(t){var e;~(e=A.indexOf(t))&&A.splice(e,1)},_listeners:A=[]}),Pt=function _wake(){return!m&&Mt.wake()},Ct={},St=/^[\d.\-M][\d.\-,\s]/,At=/["']/g,Ft=function _invertEase(e){return function(t){return 1-e(1-t)}},Dt=function _parseEase(t,e){return t&&(o(t)?t:Ct[t]||vb(t))||e};function _j(e){var t,r,n=b()-P,i=!0===e;w<n&&(k+=n-x),P+=n,T.time=(P-k)/1e3,(0<(t=T.time-S)||i)&&(T.frame++,S+=t+(C<=t?.004:C-t),r=1),i||(g=v(_j)),r&&A.forEach(function(t){return t(T.time,n,T.frame,e)})}function sl(t){return t<D?F*t*t:t<.7272727272727273?F*Math.pow(t-1.5/2.75,2)+.75:t<.9090909090909092?F*(t-=2.25/2.75)*t+.9375:F*Math.pow(t-2.625/2.75,2)+.984375}_("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;yb(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow(2*(1-t),r)/2})}),Ct.Linear.easeNone=Ct.none=Ct.Linear.easeIn,yb("Elastic",Ab("in"),Ab("out"),Ab()),F=7.5625,D=1/2.75,yb("Bounce",function(t){return 1-sl(1-t)},sl),yb("Expo",function(t){return t?Math.pow(2,10*(t-1)):0}),yb("Circ",function(t){return-(X(1-t*t)-1)}),yb("Sine",function(t){return 1-G(t*V)}),yb("Back",Bb("in"),Bb("out"),Bb()),Ct.SteppedEase=Ct.steps=at.SteppedEase={config:function config(t,e){void 0===t&&(t=1);var r=1/t,n=t+(e?0:1),i=e?1:0;return function(t){return((n*gt(0,.99999999,t)|0)+i)*r}}},E.ease=Ct["quad.out"];var zt,Rt=function GSCache(t,e){this.id=j++,(t._gsap=this).target=t,this.harness=e,this.get=e?e.get:$,this.set=e?e.getSetter:Gt},Et=((zt=Animation.prototype).delay=function delay(t){return t||0===t?(this._delay=t,this):this._delay},zt.duration=function duration(t){return arguments.length?Ca(this,t):this.totalDuration()&&this._dur},zt.totalDuration=function totalDuration(t){return arguments.length?(this._dirty=0,Ca(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},zt.totalTime=function totalTime(t,e){if(Pt(),!arguments.length)return this._tTime;var r=this.parent||this._dp;if(r&&r.smoothChildTiming&&this._ts){for(this._start=aa(r._time-(0<this._ts?t/this._ts:((this._dirty?this.totalDuration():this._tDur)-t)/-this._ts)),xa(this),r._dirty||ra(r);r.parent;)r.parent._time!==r._start+(0<=r._ts?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&ya(this._dp,this,this._start-this._delay)}return this._tTime===t&&(this._dur||e)&&Math.abs(this._zTime)!==B||(this._ts||(this._pTime=t),ea(this,t,e)),this},zt.time=function time(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+ua(this))%this._dur||(t?this._dur:0),e):this._time},zt.totalProgress=function totalProgress(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.ratio},zt.progress=function progress(t,e){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?t:1-t)+ua(this),e):this.duration()?Math.min(1,this._time/this._dur):this.ratio},zt.iteration=function iteration(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?_t(this._tTime,r)+1:1},zt.timeScale=function timeScale(t){if(!arguments.length)return this._ts||this._pauseTS||0;if(null!==this._pauseTS)return this._pauseTS=t,this;var e=this.parent&&this._ts?wa(this.parent._time,this):this._tTime;return this._ts=t,function _recacheAncestors(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t}(this.totalTime(e,!0))},zt.paused=function paused(t){var e=!this._ts;return arguments.length?(e!==t&&(t?(this._pauseTS=this._ts,this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Pt(),this._ts=this._pauseTS||1,this._pauseTS=null,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&(this._tTime-=B)&&Math.abs(this._zTime)!==B))),this):e},zt.startTime=function startTime(t){return arguments.length?(this.parent&&this.parent._sort&&ya(this.parent,this,t-this._delay),this):this._start},zt.endTime=function endTime(t){return this._start+(s(t)?this.totalDuration():this.duration())/Math.abs(this._ts)},zt.rawTime=function rawTime(t){var e=this.parent||this._dp;return e?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?wa(e.rawTime(t),this):this._tTime:this._tTime},zt.repeat=function repeat(t){return arguments.length?(this._repeat=t,Da(this)):this._repeat},zt.repeatDelay=function repeatDelay(t){return arguments.length?(this._rDelay=t,Da(this)):this._rDelay},zt.yoyo=function yoyo(t){return arguments.length?(this._yoyo=t,this):this._yoyo},zt.seek=function seek(t,e){return this.totalTime(Fa(this,t),s(e))},zt.restart=function restart(t,e){return this.play().totalTime(t?-this._delay:0,s(e))},zt.play=function play(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},zt.reverse=function reverse(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},zt.pause=function pause(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},zt.resume=function resume(){return this.paused(!1)},zt.reversed=function reversed(t){var e=this._ts||this._pauseTS||0;return arguments.length?(t!==this.reversed()&&(this[null===this._pauseTS?"_ts":"_pauseTS"]=Math.abs(e)*(t?-1:1),this.totalTime(this._tTime,!0)),this):e<0},zt.invalidate=function invalidate(){return this._initted=0,this._zTime=-B,this},zt.isActive=function isActive(t){var e,r=this.parent||this._dp,n=this._start;return!(r&&!(this._ts&&(this._initted||!t)&&r.isActive(t)&&(e=r.rawTime(!0))>=n&&e<this.endTime(!0)-B))},zt.eventCallback=function eventCallback(t,e,r){var n=this.vars;return 1<arguments.length?(e?(n[t]=e,r&&(n[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete n[t],this):n[t]},zt.then=function then(t){var n=this;return new Promise(function(e){function Hm(){var t=n.then;n.then=null,o(r)&&(r=r(n))&&(r.then||r===n)&&(n.then=t),e(r),n.then=t}var r=o(t)?t:ga;n._initted&&1===n.totalProgress()&&0<=n._ts||!n._tTime&&n._ts<0?Hm():n._prom=Hm})},zt.kill=function kill(){cb(this)},Animation);function Animation(t,e){var r=t.parent||R;this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ca(this,+t.duration,1),this.data=t.data,m||Mt.wake(),r&&ya(r,this,e||0===e?e:r._time),t.reversed&&this.reversed(!0),t.paused&&this.paused(!0)}ha(Et.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-B,_prom:0,_pauseTS:null});var Bt=function(i){function Timeline(t,e){var r;return void 0===t&&(t={}),(r=i.call(this,t,e)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=s(t.sortChildren),r}_inheritsLoose(Timeline,i);var t=Timeline.prototype;return t.to=function to(t,e,r,n){return new Vt(t,ca(arguments,0,this),Fa(this,p(e)?n:r)),this},t.from=function from(t,e,r,n){return new Vt(t,ca(arguments,1,this),Fa(this,p(e)?n:r)),this},t.fromTo=function fromTo(t,e,r,n,i){return new Vt(t,ca(arguments,2,this),Fa(this,p(e)?i:n)),this},t.set=function set(t,e,r){return e.duration=0,e.parent=this,e.repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new Vt(t,e,Fa(this,r)),this},t.call=function call(t,e,r){return ya(this,Vt.delayedCall(0,t,e),Fa(this,r))},t.staggerTo=function staggerTo(t,e,r,n,i,a,s){return r.duration=e,r.stagger=r.stagger||n,r.onComplete=a,r.onCompleteParams=s,r.parent=this,new Vt(t,r,Fa(this,i)),this},t.staggerFrom=function staggerFrom(t,e,r,n,i,a,o){return r.runBackwards=1,r.immediateRender=s(r.immediateRender),this.staggerTo(t,e,r,n,i,a,o)},t.staggerFromTo=function staggerFromTo(t,e,r,n,i,a,o,u){return n.startAt=r,n.immediateRender=s(n.immediateRender),this.staggerTo(t,e,n,i,a,o,u)},t.render=function render(t,e,r){var n,i,a,s,o,u,h,l,f,p,c,d,_=this._time,m=this._dirty?this.totalDuration():this._tDur,g=this._dur,v=this!==R&&m-B<t&&0<=t?m:t<B?0:t,y=this._zTime<0!=t<0&&(this._initted||!g);if(v!==this._tTime||r||y){if(_!==this._time&&g&&(v+=this._time-_,t+=this._time-_),n=v,f=this._start,u=!(l=this._ts),y&&(g||(_=this._zTime),!t&&e||(this._zTime=t)),this._repeat&&(c=this._yoyo,o=g+this._rDelay,(g<(n=aa(v%o))||m===v)&&(n=g),(s=~~(v/o))&&s===v/o&&(n=g,s--),c&&1&s&&(n=g-n,d=1),s!==(p=_t(this._tTime,o))&&!this._lock)){var T=c&&1&p,b=T===(c&&1&s);if(s<p&&(T=!T),_=T?0:g,this._lock=1,this.render(_,e,!g)._lock=0,!e&&this.parent&&bt(this,"onRepeat"),this.vars.repeatRefresh&&!d&&(this.invalidate()._lock=1),_!==this._time||u!=!this._ts)return this;if(b&&(this._lock=2,_=T?g+1e-4:-1e-4,this.render(_,!0),this.vars.repeatRefresh&&!d&&this.invalidate()),this._lock=0,!this._ts&&!u)return this}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=function _findNextPauseTween(t,e,r){var n;if(e<r)for(n=t._first;n&&n._start<=r;){if(!n._dur&&"isPause"===n.data&&n._start>e)return n;n=n._next}else for(n=t._last;n&&n._start>=r;){if(!n._dur&&"isPause"===n.data&&n._start<e)return n;n=n._prev}}(this,aa(_),aa(n)))&&(v-=n-(n=h._start)),this._tTime=v,this._time=n,this._act=!l,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t),_||!n||e||bt(this,"onStart"),_<=n&&0<=t)for(i=this._first;i;){if(a=i._next,(i._act||n>=i._start)&&i._ts&&h!==i){if(i.parent!==this)return this.render(t,e,r);if(i.render(0<i._ts?(n-i._start)*i._ts:(i._dirty?i.totalDuration():i._tDur)+(n-i._start)*i._ts,e,r),n!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=-B);break}}i=a}else{i=this._last;for(var w=t<0?t:n;i;){if(a=i._prev,(i._act||w<=i._end)&&i._ts&&h!==i){if(i.parent!==this)return this.render(t,e,r);if(i.render(0<i._ts?(w-i._start)*i._ts:(i._dirty?i.totalDuration():i._tDur)+(w-i._start)*i._ts,e,r),n!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=w?-B:B);break}}i=a}}if(h&&!e&&(this.pause(),h.render(_<=n?0:-B)._zTime=_<=n?1:-1,this._ts))return this._start=f,xa(this),this.render(t,e,r);this._onUpdate&&!e&&bt(this,"onUpdate",!0),(v===m&&m>=this.totalDuration()||!v&&this._ts<0)&&(f!==this._start&&Math.abs(l)===Math.abs(this._ts)||(!t&&g||!(t&&0<this._ts||!v&&this._ts<0)||qa(this,1),e||t<0&&!_||(bt(this,v===m?"onComplete":"onReverseComplete",!0),this._prom&&this._prom())))}return this},t.add=function add(t,e){var r=this;if(p(e)||(e=Fa(this,e)),!(t instanceof Et)){if(W(t))return t.forEach(function(t){return r.add(t,e)}),ra(this);if(n(t))return this.addLabel(t,e);if(!o(t))return this;t=Vt.delayedCall(0,t)}return this!==t?ya(this,t,e):this},t.getChildren=function getChildren(t,e,r,n){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===n&&(n=-z);for(var i=[],a=this._first;a;)a._start>=n&&(a instanceof Vt?e&&i.push(a):(r&&i.push(a),t&&i.push.apply(i,a.getChildren(!0,e,r)))),a=a._next;return i},t.getById=function getById(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},t.remove=function remove(t){return n(t)?this.removeLabel(t):o(t)?this.killTweensOf(t):(pa(this,t),t===this._recent&&(this._recent=this._last),ra(this))},t.totalTime=function totalTime(t,e){return arguments.length?(this._forcing=1,this.parent||this._dp||!this._ts||(this._start=aa(Mt.time-(0<this._ts?t/this._ts:(this.totalDuration()-t)/-this._ts))),i.prototype.totalTime.call(this,t,e),this._forcing=0,this):this._tTime},t.addLabel=function addLabel(t,e){return this.labels[t]=Fa(this,e),this},t.removeLabel=function removeLabel(t){return delete this.labels[t],this},t.addPause=function addPause(t,e,r){var n=Vt.delayedCall(0,e||O,r);return n.data="isPause",this._hasPause=1,ya(this,n,Fa(this,t))},t.removePause=function removePause(t){var e=this._first;for(t=Fa(this,t);e;)e._start===t&&"isPause"===e.data&&qa(e),e=e._next},t.killTweensOf=function killTweensOf(t,e,r){for(var n=this.getTweensOf(t,r),i=n.length;i--;)It!==n[i]&&n[i].kill(t,e);return this},t.getTweensOf=function getTweensOf(t,e){for(var r,n=[],i=yt(t),a=this._first;a;)a instanceof Vt?!ba(a._targets,i)||e&&!a.isActive("started"===e)||n.push(a):(r=a.getTweensOf(i,e)).length&&n.push.apply(n,r),a=a._next;return n},t.tweenTo=function tweenTo(t,e){e=e||{};var r=this,n=Fa(r,t),i=e.startAt,a=Vt.to(r,ha(e,{ease:"none",lazy:!1,time:n,duration:e.duration||Math.abs(n-(i&&"time"in i?i.time:r._time))/r.timeScale()||B,onStart:function onStart(){r.pause();var t=e.duration||Math.abs(n-r._time)/r.timeScale();a._dur!==t&&Ca(a,t).render(a._time,!0,!0),e.onStart&&e.onStart.apply(a,e.onStartParams||[])}}));return a},t.tweenFromTo=function tweenFromTo(t,e,r){return this.tweenTo(e,ha({startAt:{time:Fa(this,t)}},r))},t.recent=function recent(){return this._recent},t.nextLabel=function nextLabel(t){return void 0===t&&(t=this._time),ab(this,Fa(this,t))},t.previousLabel=function previousLabel(t){return void 0===t&&(t=this._time),ab(this,Fa(this,t),1)},t.currentLabel=function currentLabel(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+B)},t.shiftChildren=function shiftChildren(t,e,r){void 0===r&&(r=0);for(var n,i=this._first,a=this.labels;i;)i._start>=r&&(i._start+=t),i=i._next;if(e)for(n in a)a[n]>=r&&(a[n]+=t);return ra(this)},t.invalidate=function invalidate(){var t=this._first;for(this._lock=0;t;)t.invalidate(),t=t._next;return i.prototype.invalidate.call(this)},t.clear=function clear(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._time=this._tTime=0,t&&(this.labels={}),ra(this)},t.totalDuration=function totalDuration(t){var e,r,n,i,a=0,s=this,o=s._last,u=z;if(arguments.length)return s._repeat<0?s:s.timeScale(s.totalDuration()/t);if(s._dirty){for(i=s.parent;o;)e=o._prev,o._dirty&&o.totalDuration(),u<(n=o._start)&&s._sort&&o._ts&&!s._lock?(s._lock=1,ya(s,o,n-o._delay)._lock=0):u=n,n<0&&o._ts&&(a-=n,(!i&&!s._dp||i&&i.smoothChildTiming)&&(s._start+=n/s._ts,s._time-=n,s._tTime-=n),s.shiftChildren(-n,!1,-1e20),u=0),a<(r=xa(o))&&o._ts&&(a=r),o=e;Ca(s,s===R&&s._time>a?s._time:Math.min(z,a),1),s._dirty=0}return s._tDur},Timeline.updateRoot=function updateRoot(t){if(R._ts&&(ea(R,wa(t,R)),c=Mt.frame),Mt.frame>=ft){ft+=U.autoSleep||120;var e=R._first;if((!e||!e._ts)&&U.autoSleep&&Mt._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||Mt.sleep()}}},Timeline}(Et);ha(Bt.prototype,{_lock:0,_hasPause:0,_forcing:0});function Ib(t,e,i,a,s,u){var h,l,f,p;if(ht[t]&&!1!==(h=new ht[t]).init(s,h.rawVars?e[t]:function _processVars(t,e,i,a,s){if(o(t)&&(t=Yt(t,s,e,i,a)),!r(t)||t.style&&t.nodeType||W(t))return n(t)?Yt(t,s,e,i,a):t;var u,h={};for(u in t)h[u]=Yt(t[u],s,e,i,a);return h}(e[t],a,s,u,i),i,a,u)&&(i._pt=l=new ee(i._pt,s,t,0,1,h.render,h,0,h.priority),i!==d))for(f=i._ptLookup[i._targets.indexOf(s)],p=h._props.length;p--;)f[h._props[p]]=l;return h}var It,Lt=function _addPropTween(t,e,r,i,a,s,u,h,l){o(i)&&(i=i(a||0,t,s));var f,p=t[e],c="get"!==r?r:o(p)?l?t[e.indexOf("set")||!o(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():p,d=o(p)?l?Zt:Xt:jt;if(n(i)&&(~i.indexOf("random(")&&(i=Za(i)),"="===i.charAt(1)&&(i=parseFloat(c)+parseFloat(i.substr(2))*("-"===i.charAt(0)?-1:1)+(Ia(c)||0))),c!==i)return isNaN(c+i)?(p||e in t||L(e,i),function _addComplexStringPropTween(t,e,r,n,i,a,s){var o,u,h,l,f,p,c,d,_=new ee(this._pt,t,e,0,1,Ht,null,i),m=0,g=0;for(_.b=r,_.e=n,r+="",(c=~(n+="").indexOf("random("))&&(n=Za(n)),a&&(a(d=[r,n],t,e),r=d[0],n=d[1]),u=r.match(et)||[];o=et.exec(n);)l=o[0],f=n.substring(m,o.index),h?h=(h+1)%5:"rgba("===f.substr(-5)&&(h=1),l!==u[g++]&&(p=parseFloat(u[g-1])||0,_._pt={_next:_._pt,p:f||1===g?f:",",s:p,c:"="===l.charAt(1)?parseFloat(l.substr(2))*("-"===l.charAt(0)?-1:1):parseFloat(l)-p,m:h&&h<4?Math.round:0},m=et.lastIndex);return _.c=m<n.length?n.substring(m,n.length):"",_.fp=s,(nt.test(n)||c)&&(_.e=0),this._pt=_}.call(this,t,e,c,i,d,h||U.stringFilter,l)):(f=new ee(this._pt,t,e,+c||0,i-(c||0),"boolean"==typeof p?Wt:Qt,0,d),l&&(f.fp=l),u&&f.modifier(u,this,t),this._pt=f)},qt=function _initTween(t,e){var r,n,i,a,o,u,h,l,f,p,c,d,_=t.vars,m=_.ease,g=_.startAt,v=_.immediateRender,y=_.lazy,T=_.onUpdate,b=_.onUpdateParams,w=_.callbackScope,x=_.runBackwards,k=_.yoyoEase,O=_.keyframes,M=_.autoRevert,P=t._dur,C=t._startAt,S=t._targets,A=t.parent,F=A&&"nested"===A.data?A.parent._targets:S,D="auto"===t._overwrite,z=t.timeline;if(!z||O&&m||(m="none"),t._ease=Dt(m,E.ease),t._yEase=k?Ft(Dt(!0===k?m:k,E.ease)):0,k&&t._yoyo&&!t._repeat&&(k=t._yEase,t._yEase=t._ease,t._ease=k),!z){if(C&&C.render(-1,!0).kill(),g){if(qa(t._startAt=Vt.set(S,ha({data:"isStart",overwrite:!1,parent:A,immediateRender:!0,lazy:s(y),startAt:null,delay:0,onUpdate:T,onUpdateParams:b,callbackScope:w,stagger:0},g))),v)if(0<e)M||(t._startAt=0);else if(P)return}else if(x&&P)if(C)M||(t._startAt=0);else if(e&&(v=!1),qa(t._startAt=Vt.set(S,dt(la(_,st),{overwrite:!1,data:"isFromStart",lazy:v&&s(y),immediateRender:v,stagger:0,parent:A}))),v){if(!e)return}else _initTween(t._startAt,B);for(r=la(_,st),d=(l=S[t._pt=0]?Z(S[0]).harness:0)&&_[l.prop],y=P&&s(y)||y&&!P,n=0;n<S.length;n++){if(h=(o=S[n])._gsap||Y(S)[n]._gsap,t._ptLookup[n]=p={},ut[h.id]&&da(),c=F===S?n:F.indexOf(o),l&&!1!==(f=new l).init(o,d||r,t,c,F)&&(t._pt=a=new ee(t._pt,o,f.name,0,1,f.render,f,0,f.priority),f._props.forEach(function(t){p[t]=a}),f.priority&&(u=1)),!l||d)for(i in r)ht[i]&&(f=Ib(i,r,t,c,o,F))?f.priority&&(u=1):p[i]=a=Lt.call(t,o,i,"get",r[i],c,F,0,_.stringFilter);t._op&&t._op[n]&&t.kill(o,t._op[n]),D&&t._pt&&(It=t,R.killTweensOf(o,p,"started"),It=0),t._pt&&y&&(ut[h.id]=1)}u&&te(t),t._onInit&&t._onInit(t)}t._from=!z&&!!_.runBackwards,t._onUpdate=T,t._initted=1},Yt=function _parseFuncOrString(t,e,r,i,a){return o(t)?t.call(e,r,i,a):n(t)&&~t.indexOf("random(")?Za(t):t},Nt=ct+",repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",Ut=(Nt+",id,stagger,delay,duration,paused").split(","),Vt=function(P){function Tween(t,e,n){var i;"number"==typeof e&&(n.duration=e,e=n,n=null);var a,o,h,l,f,c,d,_,m=(i=P.call(this,function _inheritDefaults(t){var e=t.parent||R,r=t.keyframes?ia:ha;if(s(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent;return t}(e),n)||this).vars,g=m.duration,v=m.delay,y=m.immediateRender,T=m.stagger,b=m.overwrite,w=m.keyframes,x=m.defaults,k=(W(t)?p(t[0]):"length"in e)?[t]:yt(t);if(i._targets=k.length?Y(k):M("GSAP target "+t+" not found. https://greensock.com",!U.nullTargetWarn)||[],i._ptLookup=[],i._overwrite=b,w||T||u(g)||u(v)){if(e=i.vars,(a=i.timeline=new Bt({data:"nested",defaults:x||{}})).kill(),a.parent=_assertThisInitialized(i),w)ha(a.vars.defaults,{ease:"none"}),w.forEach(function(t){return a.to(k,t,">")});else{if(l=k.length,d=T?Pa(T):O,r(T))for(f in T)~Nt.indexOf(f)&&((_=_||{})[f]=T[f]);for(o=0;o<l;o++){for(f in h={},e)Ut.indexOf(f)<0&&(h[f]=e[f]);h.stagger=0,_&&dt(h,_),e.yoyoEase&&!e.repeat&&(h.yoyoEase=e.yoyoEase),c=k[o],h.duration=+Yt(g,_assertThisInitialized(i),o,c,k),h.delay=(+Yt(v,_assertThisInitialized(i),o,c,k)||0)-i._delay,!T&&1===l&&h.delay&&(i._delay=v=h.delay,i._start+=v,h.delay=0),a.to(c,h,d(o,c,k))}g=v=0}g||i.duration(g=a.duration())}else i.timeline=0;return!0===b&&(It=_assertThisInitialized(i),R.killTweensOf(k),It=0),(y||!g&&!w&&i._start===i.parent._time&&s(y)&&function _hasNoPausedAncestors(t){return!t||t._ts&&_hasNoPausedAncestors(t.parent)}(_assertThisInitialized(i))&&"nested"!==i.parent.data)&&(i._tTime=-B,i.render(Math.max(0,-v))),i}_inheritsLoose(Tween,P);var t=Tween.prototype;return t.render=function render(t,e,r){var n,i,a,s,o,u,h,l,f,p=this._time,c=this._tDur,d=this._dur,_=c-B<t&&0<=t?c:t<B?0:t;if(d){if(_!==this._tTime||!t||r||this._startAt&&this._zTime<0!=t<0){if(n=_,l=this.timeline,this._repeat){if(s=d+this._rDelay,(d<(n=aa(_%s))||c===_)&&(n=d),(a=~~(_/s))&&a===_/s&&(n=d,a--),(u=this._yoyo&&1&a)&&(f=this._yEase,n=d-n),o=_t(this._tTime,s),n===p&&!r&&this._initted)return this;a!==o&&(!this.vars.repeatRefresh||u||this._lock||(this._lock=r=1,this.render(s*a,!0).invalidate()._lock=0))}if(!this._initted&&za(this,n,r,e))return this._tTime=0,this;for(this._tTime=_,this._time=n,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=h=(f||this._ease)(n/d),this._from&&(this.ratio=h=1-h),p||!n||e||bt(this,"onStart"),i=this._pt;i;)i.r(h,i.d),i=i._next;l&&l.render(t<0?t:!n&&u?-B:l._dur*h,e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(t<0&&this._startAt&&this._startAt.render(t,!0,r),bt(this,"onUpdate")),this._repeat&&a!==o&&this.vars.onRepeat&&!e&&this.parent&&bt(this,"onRepeat"),_!==this._tDur&&_||this._tTime!==_||(t<0&&this._startAt&&!this._onUpdate&&this._startAt.render(t,!0,r),!t&&d||!(t&&0<this._ts||!_&&this._ts<0)||qa(this,1),e||t<0&&!p||(bt(this,_===c?"onComplete":"onReverseComplete",!0),this._prom&&this._prom()))}}else!function _renderZeroDurationTween(t,e,r,n){var i,a=t._zTime<0?0:1,s=e<0?0:1,o=t._rDelay,u=0;if(o&&t._repeat&&(u=gt(0,t._tDur,e),_t(u,o)!==_t(t._tTime,o)&&(a=1-s,t.vars.repeatRefresh&&t._initted&&t.invalidate())),(t._initted||!za(t,e,n,r))&&(s!==a||n||t._zTime===B||!e&&t._zTime)){for(t._zTime=e||(r?B:0),t.ratio=s,t._from&&(s=1-s),t._time=0,t._tTime=u,r||bt(t,"onStart"),i=t._pt;i;)i.r(s,i.d),i=i._next;!s&&t._startAt&&!t._onUpdate&&t._start&&t._startAt.render(e,!0,n),t._onUpdate&&!r&&bt(t,"onUpdate"),u&&t._repeat&&!r&&t.parent&&bt(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===s&&(t.ratio&&qa(t,1),r||(bt(t,t.ratio?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}}(this,t,e,r);return this},t.targets=function targets(){return this._targets},t.invalidate=function invalidate(){return this._pt=this._op=this._startAt=this._onUpdate=this._act=this._lazy=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(),P.prototype.invalidate.call(this)},t.kill=function kill(t,e){if(void 0===e&&(e="all"),!(t||e&&"all"!==e)&&(this._lazy=0,this.parent))return cb(this);if(this.timeline)return this.timeline.killTweensOf(t,e,It&&!0!==It.vars.overwrite),this;var r,i,a,s,o,u,h,l=this._targets,f=t?yt(t):l,p=this._ptLookup,c=this._pt;if((!e||"all"===e)&&function _arraysMatch(t,e){for(var r=t.length,n=r===e.length;n&&r--&&t[r]===e[r];);return r<0}(l,f))return cb(this);for(r=this._op=this._op||[],"all"!==e&&(n(e)&&(o={},_(e,function(t){return o[t]=1}),e=o),e=function _addAliasesToVars(t,e){var r,n,i,a,s=t[0]?Z(t[0]).harness:0,o=s&&s.aliases;if(!o)return e;for(n in r=dt({},e),o)if(n in r)for(i=(a=o[n].split(",")).length;i--;)r[a[i]]=r[n];return r}(l,e)),h=l.length;h--;)if(~f.indexOf(l[h]))for(o in i=p[h],"all"===e?(r[h]=e,s=i,a={}):(a=r[h]=r[h]||{},s=e),s)(u=i&&i[o])&&("kill"in u.d&&!0!==u.d.kill(o)||pa(this,u,"_pt"),delete i[o]),"all"!==a&&(a[o]=1);return this._initted&&!this._pt&&c&&cb(this),this},Tween.to=function to(t,e,r){return new Tween(t,e,r)},Tween.from=function from(t,e){return new Tween(t,ca(arguments,1))},Tween.delayedCall=function delayedCall(t,e,r,n){return new Tween(e,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:e,onReverseComplete:e,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:n})},Tween.fromTo=function fromTo(t,e,r){return new Tween(t,ca(arguments,2))},Tween.set=function set(t,e){return e.duration=0,e.repeatDelay||(e.repeat=0),new Tween(t,e)},Tween.killTweensOf=function killTweensOf(t,e,r){return R.killTweensOf(t,e,r)},Tween}(Et);ha(Vt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),_("staggerTo,staggerFrom,staggerFromTo",function(r){Vt[r]=function(){var t=new Bt,e=vt.call(arguments,0);return e.splice("staggerFromTo"===r?5:4,0,0),t[r].apply(t,e)}});function Tb(t,e,r){return t.setAttribute(e,r)}function _b(t,e,r,n){n.mSet(t,e,n.m.call(n.tween,r,n.mt),n)}var jt=function _setterPlain(t,e,r){return t[e]=r},Xt=function _setterFunc(t,e,r){return t[e](r)},Zt=function _setterFuncWithParam(t,e,r,n){return t[e](n.fp,r)},Gt=function _getSetter(t,e){return o(t[e])?Xt:q(t[e])&&t.setAttribute?Tb:jt},Qt=function _renderPlain(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4,e)},Wt=function _renderBoolean(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Ht=function _renderComplexString(t,e){var r=e._pt,n="";if(!t&&e.b)n=e.b;else if(1===t&&e.e)n=e.e;else{for(;r;)n=r.p+(r.m?r.m(r.s+r.c*t):Math.round(1e4*(r.s+r.c*t))/1e4)+n,r=r._next;n+=e.c}e.set(e.t,e.p,n,e)},$t=function _renderPropTweens(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},Kt=function _addPluginModifier(t,e,r,n){for(var i,a=this._pt;a;)i=a._next,a.p===n&&a.modifier(t,e,r),a=i},Jt=function _killPropTweensOf(t){for(var e,r,n=this._pt;n;)r=n._next,n.p===t&&!n.op||n.op===t?pa(this,n,"_pt"):n.dep||(e=1),n=r;return!e},te=function _sortPropTweensByPriority(t){for(var e,r,n,i,a=t._pt;a;){for(e=a._next,r=n;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:i)?a._prev._next=a:n=a,(a._next=r)?r._prev=a:i=a,a=e}t._pt=n},ee=(PropTween.prototype.modifier=function modifier(t,e,r){this.mSet=this.mSet||this.set,this.set=_b,this.m=t,this.mt=r,this.tween=e},PropTween);function PropTween(t,e,r,n,i,a,s,o,u){this.t=e,this.s=n,this.c=i,this.p=r,this.r=a||Qt,this.d=s||this,this.set=o||jt,this.pr=u||0,(this._next=t)&&(t._prev=this)}_(ct+",parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert",function(t){st[t]=1,"on"===t.substr(0,2)&&(st[t+"Params"]=1)}),at.TweenMax=at.TweenLite=Vt,at.TimelineLite=at.TimelineMax=Bt,R=new Bt({sortChildren:!1,defaults:E,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),U.stringFilter=nb;var re={registerPlugin:function registerPlugin(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return function _createPlugin(t){var e=(t=!t.name&&t.default||t).name,r=o(t),n=e&&!r&&t.init?function(){this._props=[]}:t,i={init:O,render:$t,add:Lt,kill:Jt,modifier:Kt,rawVars:0},a={targetTest:0,get:0,getSetter:Gt,aliases:{},register:0};if(Pt(),t!==n){if(ht[e])return;ha(n,ha(la(t,i),a)),dt(n.prototype,dt(i,la(t,a))),ht[n.prop=e]=n,t.targetTest&&(pt.push(n),st[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}N(e,n),t.register&&t.register(ne,n,ee)}(t)})},timeline:function timeline(t){return new Bt(t)},getTweensOf:function getTweensOf(t,e){return R.getTweensOf(t,e)},getProperty:function getProperty(i,t,e,r){n(i)&&(i=yt(i)[0]);var a=Z(i||{}).get,s=e?ga:fa;return"native"===e&&(e=""),i?t?s((ht[t]&&ht[t].get||a)(i,t,e,r)):function(t,e,r){return s((ht[t]&&ht[t].get||a)(i,t,e,r))}:i},quickSetter:function quickSetter(r,e,n){if(1<(r=yt(r)).length){var i=r.map(function(t){return ne.quickSetter(t,e,n)}),a=i.length;return function(t){for(var e=a;e--;)i[e](t)}}r=r[0]||{};var s=ht[e],o=Z(r),u=s?function(t){var e=new s;d._pt=0,e.init(r,n?t+n:t,d,0,[r]),e.render(1,e),d._pt&&$t(1,d)}:o.set(r,e);return s?u:function(t){return u(r,e,n?t+n:t,o,1)}},isTweening:function isTweening(t){return 0<R.getTweensOf(t,!0).length},defaults:function defaults(t){return t&&t.ease&&(t.ease=Dt(t.ease,E.ease)),ka(E,t||{})},config:function config(t){return ka(U,t||{})},registerEffect:function registerEffect(t){var i=t.name,n=t.effect,e=t.plugins,a=t.defaults,s=t.extendTimeline;(e||"").split(",").forEach(function(t){return t&&!ht[t]&&!at[t]&&M(i+" effect requires "+t+" plugin.")}),lt[i]=function(t,e){return n(yt(t),ha(e||{},a))},s&&(Bt.prototype[i]=function(t,e,n){return this.add(lt[i](t,r(e)?e:(n=e)&&{}),n)})},registerEase:function registerEase(t,e){Ct[t]=Dt(e)},parseEase:function parseEase(t,e){return arguments.length?Dt(t,e):Ct},getById:function getById(t){return R.getById(t)},exportRoot:function exportRoot(t,e){void 0===t&&(t={});var r,n,i=new Bt(t);for(i.smoothChildTiming=s(t.smoothChildTiming),R.remove(i),i._dp=0,i._time=i._tTime=R._time,r=R._first;r;)n=r._next,!e&&!r._dur&&r instanceof Vt&&r.vars.onComplete===r._targets[0]||ya(i,r,r._start-r._delay),r=n;return ya(R,i,0),i},utils:{wrap:function wrap(e,t,r){var n=t-e;return W(e)?Wa(e,wrap(0,e.length),t):Ga(r,function(t){return(n+(t-e)%n)%n+e})},wrapYoyo:function wrapYoyo(e,t,r){var n=t-e,i=2*n;return W(e)?Wa(e,wrapYoyo(0,e.length-1),t):Ga(r,function(t){return e+(n<(t=(i+(t-e)%i)%i)?i-t:t)})},distribute:Pa,random:Sa,snap:Ra,normalize:function normalize(t,e,r){return Tt(t,e,0,1,r)},getUnit:Ia,clamp:function clamp(e,r,t){return Ga(t,function(t){return gt(e,r,t)})},splitColor:ib,toArray:yt,mapRange:Tt,pipe:function pipe(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function unitize(e,r){return function(t){return e(parseFloat(t))+(r||Ia(t))}},interpolate:function interpolate(e,r,t,i){var a=isNaN(e+r)?0:function(t){return(1-t)*e+t*r};if(!a){var s,o,u,h,l,f=n(e),p={};if(!0===t&&(i=1)&&(t=null),f)e={p:e},r={p:r};else if(W(e)&&!W(r)){for(u=[],h=e.length,l=h-2,o=1;o<h;o++)u.push(interpolate(e[o-1],e[o]));h--,a=function func(t){t*=h;var e=Math.min(l,~~t);return u[e](t-e)},t=r}else i||(e=dt(W(e)?[]:{},e));if(!u){for(s in r)Lt.call(p,e,s,"get",r[s]);a=function func(t){return $t(t,p)||(f?e.p:e)}}}return Ga(t,a)},shuffle:Oa},install:K,effects:lt,ticker:Mt,updateRoot:Bt.updateRoot,plugins:ht,globalTimeline:R,core:{PropTween:ee,globals:N,Tween:Vt,Timeline:Bt,Animation:Et,getCache:Z}};_("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return re[t]=Vt[t]}),Mt.add(Bt.updateRoot),d=re.to({},{duration:0});function dc(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r}function fc(t,a){return{name:t,rawVars:1,init:function init(t,i,e){e._onInit=function(t){var e,r;if(n(i)&&(e={},_(i,function(t){return e[t]=1}),i=e),a){for(r in e={},i)e[r]=a(i[r]);i=e}!function _addModifiers(t,e){var r,n,i,a=t._targets;for(r in e)for(n=a.length;n--;)(i=(i=t._ptLookup[n][r])&&i.d)&&(i._pt&&(i=dc(i,r)),i&&i.modifier&&i.modifier(e[r],t,a[n],r))}(t,i)}}}}var ne=re.registerPlugin({name:"attr",init:function init(t,e,r,n,i){for(var a in e)this.add(t,"setAttribute",(t.getAttribute(a)||0)+"",e[a],n,i,0,0,a),this._props.push(a)}},{name:"endArray",init:function init(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r])}},fc("roundProps",Qa),fc("modifiers"),fc("snap",Ra))||re;Vt.version=Bt.version=ne.version="3.2.0",f=1,t()&&Pt();function Qc(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function Rc(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function Sc(t,e){return e.set(e.t,e.p,t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function Tc(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)}function Uc(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)}function Vc(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)}function Wc(t,e,r){return t.style[e]=r}function Xc(t,e,r){return t.style.setProperty(e,r)}function Yc(t,e,r){return t._gsap[e]=r}function Zc(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r}function $c(t,e,r,n,i){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(i,a)}function _c(t,e,r,n,i){var a=t._gsap;a[e]=r,a.renderTransform(i,a)}function dd(t,e){var r=ae.createElementNS?ae.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ae.createElement(t);return r.style?r:ae.createElement(t)}function ed(t,e,r){var n=getComputedStyle(t);return n[e]||n.getPropertyValue(e.replace(Re,"-$1").toLowerCase())||n.getPropertyValue(e)||!r&&ed(t,Ne(e)||e,1)||""}function hd(){!function _windowExists(){return"undefined"!=typeof window}()||(ie=window,ae=ie.document,se=ae.documentElement,ue=dd("div")||{style:{}},he=dd("div"),Le=Ne(Le),qe=Ne(qe),ue.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",fe=!!Ne("perspective"),oe=1)}function jd(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])}function kd(e){var r;try{r=e.getBBox()}catch(t){r=function _getBBoxHack(t){var e,r=dd("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,i=this.nextSibling,a=this.style.cssText;if(se.appendChild(r),r.appendChild(this),this.style.display="block",t)try{e=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=_getBBoxHack}catch(t){}else this._gsapBBox&&(e=this._gsapBBox());return i?n.insertBefore(this,i):n.appendChild(this),se.removeChild(r),this.style.cssText=a,e}.call(e,!0)}return!r||r.width||r.x||r.y?r:{x:+jd(e,["x","cx","x1"])||0,y:+jd(e,["y","cy","y1"])||0,width:0,height:0}}function ld(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!kd(t))}function md(t,e){if(e){var r=t.style;e in Ae&&(e=Le),r.removeProperty?("ms"!==e.substr(0,2)&&"webkit"!==e.substr(0,6)||(e="-"+e),r.removeProperty(e.replace(Re,"-$1").toLowerCase())):r.removeAttribute(e)}}function nd(t,e,r,n,i,a){var s=new ee(t._pt,e,r,0,1,a?Vc:Uc);return(t._pt=s).b=n,s.e=i,t._props.push(r),s}function pd(t,e,r,n){var i,a,s,o,u=parseFloat(r)||0,h=(r+"").trim().substr((u+"").length)||"px",l=ue.style,f=Ee.test(e),p="svg"===t.tagName.toLowerCase(),c=(p?"client":"offset")+(f?"Width":"Height"),d="px"===n;return n===h||!u||Ue[n]||Ue[h]?u:(o=t.getCTM&&ld(t),"%"===n&&(Ae[e]||~e.indexOf("adius"))?aa(u/(o?t.getBBox()[f?"width":"height"]:t[c])*100):(l[f?"width":"height"]=100+(d?h:n),a=~e.indexOf("adius")||"em"===n&&t.appendChild&&!p?t:t.parentNode,o&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==ae&&a.appendChild||(a=ae.body),(s=a._gsap)&&"%"===n&&s.width&&f&&s.time===Mt.time?aa(u/s.width*100):(a===t&&(l.position="static"),a.appendChild(ue),i=ue[c],a.removeChild(ue),l.position="absolute",f&&"%"===n&&((s=Z(a)).time=Mt.time,s.width=a[c]),aa(d?i*u/100:100/i*u))))}function qd(t,e,r,n){var i;return oe||hd(),e in Ie&&"transform"!==e&&~(e=Ie[e]).indexOf(",")&&(e=e.split(",")[0]),Ae[e]&&"transform"!==e?(i=Ge(t,n),i="transformOrigin"!==e?i[e]:Qe(ed(t,qe))+" "+i.zOrigin+"px"):(i=t.style[e])&&"auto"!==i&&!n&&!~(i+"").indexOf("calc(")||(i=je[e]&&je[e](t,e,r)||ed(t,e)||$(t,e)||("opacity"===e?1:0)),r&&!~(i+"").indexOf(" ")?pd(t,e,i,r)+r:i}function rd(t,e,r,n){if(!r||"none"===r){var i=Ne(e,t,1),a=i&&ed(t,i,1);a&&a!==r&&(e=i,r=a)}var s,o,u,h,l,f,p,c,d,_,m,g,v=new ee(this._pt,t.style,e,0,1,Ht),y=0,T=0;if(v.b=r,v.e=n,r+="","auto"===(n+="")&&(t.style[e]=n,n=ed(t,e)||n,t.style[e]=r),nb(s=[r,n]),n=s[1],u=(r=s[0]).match(tt)||[],(n.match(tt)||[]).length){for(;o=tt.exec(n);)p=o[0],d=n.substring(y,o.index),l?l=(l+1)%5:"rgba("!==d.substr(-5)&&"hsla("!==d.substr(-5)||(l=1),p!==(f=u[T++]||"")&&(h=parseFloat(f)||0,m=f.substr((h+"").length),(g="="===p.charAt(1)?+(p.charAt(0)+"1"):0)&&(p=p.substr(2)),c=parseFloat(p),_=p.substr((c+"").length),y=tt.lastIndex-_.length,_||(_=_||U.units[e]||m,y===n.length&&(n+=_,v.e+=_)),m!==_&&(h=pd(t,e,f,_)||0),v._pt={_next:v._pt,p:d||1===T?d:",",s:h,c:g?g*c:c-h,m:l&&l<4?Math.round:0});v.c=y<n.length?n.substring(y,n.length):""}else v.r="display"===e&&"none"===n?Vc:Uc;return nt.test(n)&&(v.e=0),this._pt=v}function td(t){var e=t.split(" "),r=e[0],n=e[1]||"50%";return"top"!==r&&"bottom"!==r&&"left"!==n&&"right"!==n||(t=r,r=n,n=t),e[0]=Ve[r]||r,e[1]=Ve[n]||n,e.join(" ")}function ud(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,n,i,a=e.t,s=a.style,o=e.u;if("all"===o||!0===o)s.cssText="",n=1;else for(i=(o=o.split(",")).length;-1<--i;)r=o[i],Ae[r]&&(n=1,r="transformOrigin"===r?qe:Le),md(a,r);n&&(md(a,Le),(n=a._gsap)&&(n.svg&&a.removeAttribute("transform"),Ge(a,1)))}}function yd(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t}function zd(t){var e=ed(t,Le);return yd(e)?Xe:e.substr(7).match(J).map(aa)}function Ad(t,e){var r,n,i,a,s=t._gsap,o=t.style,u=zd(t);return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(i=t.transform.baseVal.consolidate().matrix).a,i.b,i.c,i.d,i.e,i.f]).join(",")?Xe:u:(u!==Xe||t.offsetParent||t===se||s.svg||(i=o.display,o.display="block",(r=t.parentNode)&&t.offsetParent||(a=1,n=t.nextSibling,se.appendChild(t)),u=zd(t),i?o.display=i:md(t,"display"),a&&(n?r.insertBefore(t,n):r?r.appendChild(t):se.removeChild(t))),e&&6<u.length?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)}function Bd(t,e,r,n,i,a){var s,o,u,h=t._gsap,l=i||Ad(t,!0),f=h.xOrigin||0,p=h.yOrigin||0,c=h.xOffset||0,d=h.yOffset||0,_=l[0],m=l[1],g=l[2],v=l[3],y=l[4],T=l[5],b=e.split(" "),w=parseFloat(b[0])||0,x=parseFloat(b[1])||0;r?l!==Xe&&(o=_*v-m*g)&&(u=w*(-m/o)+x*(_/o)-(_*T-m*y)/o,w=w*(v/o)+x*(-g/o)+(g*T-v*y)/o,x=u):(w=(s=kd(t)).x+(~b[0].indexOf("%")?w/100*s.width:w),x=s.y+(~(b[1]||b[0]).indexOf("%")?x/100*s.height:x)),n||!1!==n&&h.smooth?(y=w-f,T=x-p,h.xOffset=c+(y*_+T*g)-y,h.yOffset=d+(y*m+T*v)-T):h.xOffset=h.yOffset=0,h.xOrigin=w,h.yOrigin=x,h.smooth=!!n,h.origin=e,h.originIsAbsolute=!!r,t.style[qe]="0px 0px",a&&(nd(a,h,"xOrigin",f,w),nd(a,h,"yOrigin",p,x),nd(a,h,"xOffset",c,h.xOffset),nd(a,h,"yOffset",d,h.yOffset))}function Ed(t,e,r){var n=Ia(e);return aa(parseFloat(e)+parseFloat(pd(t,"x",r+"px",n)))+n}function Ld(t,e,r,i,a,s){var o,u,h=360,l=n(a),f=parseFloat(a)*(l&&~a.indexOf("rad")?Fe:1),p=s?f*s:f-i,c=i+p+"deg";return l&&("short"===(o=a.split("_")[1])&&(p%=h)!==p%180&&(p+=p<0?h:-h),"cw"===o&&p<0?p=(p+36e9)%h-~~(p/h)*h:"ccw"===o&&0<p&&(p=(p-36e9)%h-~~(p/h)*h)),t._pt=u=new ee(t._pt,e,r,i,p,Rc),u.e=c,u.u="deg",t._props.push(r),u}function Md(t,e,r){var n,i,a,s,o,u,h,l=he.style,f=r._gsap;for(i in l.cssText=getComputedStyle(r).cssText+";position:absolute;display:block;",l[Le]=e,ae.body.appendChild(he),n=Ge(he,1),Ae)(a=f[i])!==(s=n[i])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(i)<0&&(o=Ia(a)!==(h=Ia(s))?pd(r,i,a,h):parseFloat(a),u=parseFloat(s),t._pt=new ee(t._pt,f,i,o,u-o,Qc),t._pt.u=h||0,t._props.push(i));ae.body.removeChild(he)}var ie,ae,se,oe,ue,he,le,fe,pe=Ct.Power0,ce=Ct.Power1,de=Ct.Power2,_e=Ct.Power3,me=Ct.Power4,ge=Ct.Linear,ve=Ct.Quad,ye=Ct.Cubic,Te=Ct.Quart,be=Ct.Quint,we=Ct.Strong,xe=Ct.Elastic,ke=Ct.Back,Oe=Ct.SteppedEase,Me=Ct.Bounce,Pe=Ct.Sine,Ce=Ct.Expo,Se=Ct.Circ,Ae={},Fe=180/Math.PI,De=Math.PI/180,ze=Math.atan2,Re=/([A-Z])/g,Ee=/(?:left|right|width|margin|padding|x)/i,Be=/[\s,\(]\S/,Ie={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Le="transform",qe=Le+"Origin",Ye="O,Moz,ms,Ms,Webkit".split(","),Ne=function _checkPropPrefix(t,e,r){var n=(e||ue).style,i=5;if(t in n&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);i--&&!(Ye[i]+t in n););return i<0?null:(3===i?"ms":0<=i?Ye[i]:"")+t},Ue={deg:1,rad:1,turn:1},Ve={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},je={clearProps:function clearProps(t,e,r,n,i){if("isFromStart"!==i.data){var a=t._pt=new ee(t._pt,e,r,0,0,ud);return a.u=n,a.pr=-10,a.tween=i,t._props.push(r),1}}},Xe=[1,0,0,1,0,0],Ze={},Ge=function _parseTransform(t,e){var r=t._gsap||new Rt(t);if("x"in r&&!e&&!r.uncache)return r;var n,i,a,s,o,u,h,l,f,p,c,d,_,m,g,v,y,T,b,w,x,k,O,M,P,C,S,A,F,D,z=t.style,R=r.scaleX<0,E=r.xOrigin||0,B=r.yOrigin||0,I="deg",L=ed(t,qe)||"0";return n=i=a=u=h=l=f=p=c=0,s=o=1,r.svg=!(!t.getCTM||!ld(t)),d=Ad(t,r.svg),r.svg&&Bd(t,L,r.originIsAbsolute,!1!==r.smooth,d),d!==Xe&&(v=d[0],y=d[1],T=d[2],b=d[3],n=w=d[4],i=x=d[5],6===d.length?(s=Math.sqrt(v*v+y*y),o=Math.sqrt(b*b+T*T),u=v||y?ze(y,v)*Fe:0,f=T||b?ze(T,b)*Fe+u:0,r.svg&&(n-=E-(E*v+B*T),i-=B-(E*y+B*b))):(D=d[6],A=d[7],P=d[8],C=d[9],S=d[10],F=d[11],n=d[12],i=d[13],a=d[14],h=(_=ze(D,S))*Fe,_&&(k=w*(m=Math.cos(-_))+P*(g=Math.sin(-_)),O=x*m+C*g,M=D*m+S*g,P=w*-g+P*m,C=x*-g+C*m,S=D*-g+S*m,F=A*-g+F*m,w=k,x=O,D=M),l=(_=ze(-T,S))*Fe,_&&(m=Math.cos(-_),F=b*(g=Math.sin(-_))+F*m,v=k=v*m-P*g,y=O=y*m-C*g,T=M=T*m-S*g),u=(_=ze(y,v))*Fe,_&&(k=v*(m=Math.cos(_))+y*(g=Math.sin(_)),O=w*m+x*g,y=y*m-v*g,x=x*m-w*g,v=k,w=O),h&&359.9<Math.abs(h)+Math.abs(u)&&(h=u=0,l=180-l),s=aa(Math.sqrt(v*v+y*y+T*T)),o=aa(Math.sqrt(x*x+D*D)),_=ze(w,x),f=2e-4<Math.abs(_)?_*Fe:0,c=F?1/(F<0?-F:F):0),r.svg&&(d=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!yd(ed(t,Le)),d&&t.setAttribute("transform",d))),90<Math.abs(f)&&Math.abs(f)<270&&(R?(s*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(o*=-1,f+=f<=0?180:-180)),r.x=((r.xPercent=n&&Math.round(t.offsetWidth/2)===Math.round(-n)?-50:0)?0:n)+"px",r.y=((r.yPercent=i&&Math.round(t.offsetHeight/2)===Math.round(-i)?-50:0)?0:i)+"px",r.z=a+"px",r.scaleX=aa(s),r.scaleY=aa(o),r.rotation=aa(u)+I,r.rotationX=aa(h)+I,r.rotationY=aa(l)+I,r.skewX=f+I,r.skewY=p+I,r.transformPerspective=c+"px",(r.zOrigin=parseFloat(L.split(" ")[2])||0)&&(z[qe]=Qe(L)),r.xOffset=r.yOffset=0,r.force3D=U.force3D,r.renderTransform=r.svg?tr:fe?Je:We,r.uncache=0,r},Qe=function _firstTwoOnly(t){return(t=t.split(" "))[0]+" "+t[1]},We=function _renderNon3DTransforms(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Je(t,e)},He="0deg",$e="0px",Ke=") ",Je=function _renderCSSTransforms(t,e){var r=e||this,n=r.xPercent,i=r.yPercent,a=r.x,s=r.y,o=r.z,u=r.rotation,h=r.rotationY,l=r.rotationX,f=r.skewX,p=r.skewY,c=r.scaleX,d=r.scaleY,_=r.transformPerspective,m=r.force3D,g=r.target,v=r.zOrigin,y="",T="auto"===m&&t&&1!==t||!0===m;if(v&&(l!==He||h!==He)){var b,w=parseFloat(h)*De,x=Math.sin(w),k=Math.cos(w);w=parseFloat(l)*De,b=Math.cos(w),a=Ed(g,a,x*b*-v),s=Ed(g,s,-Math.sin(w)*-v),o=Ed(g,o,k*b*-v+v)}_!==$e&&(y+="perspective("+_+Ke),(n||i)&&(y+="translate("+n+"%, "+i+"%) "),!T&&a===$e&&s===$e&&o===$e||(y+=o!==$e||T?"translate3d("+a+", "+s+", "+o+") ":"translate("+a+", "+s+Ke),u!==He&&(y+="rotate("+u+Ke),h!==He&&(y+="rotateY("+h+Ke),l!==He&&(y+="rotateX("+l+Ke),f===He&&p===He||(y+="skew("+f+", "+p+Ke),1===c&&1===d||(y+="scale("+c+", "+d+Ke),g.style[Le]=y||"translate(0, 0)"},tr=function _renderSVGTransforms(t,e){var r,n,i,a,s,o=e||this,u=o.xPercent,h=o.yPercent,l=o.x,f=o.y,p=o.rotation,c=o.skewX,d=o.skewY,_=o.scaleX,m=o.scaleY,g=o.target,v=o.xOrigin,y=o.yOrigin,T=o.xOffset,b=o.yOffset,w=o.forceCSS,x=parseFloat(l),k=parseFloat(f);p=parseFloat(p),c=parseFloat(c),(d=parseFloat(d))&&(c+=d=parseFloat(d),p+=d),p||c?(p*=De,c*=De,r=Math.cos(p)*_,n=Math.sin(p)*_,i=Math.sin(p-c)*-m,a=Math.cos(p-c)*m,c&&(d*=De,s=Math.tan(c-d),i*=s=Math.sqrt(1+s*s),a*=s,d&&(s=Math.tan(d),r*=s=Math.sqrt(1+s*s),n*=s)),r=aa(r),n=aa(n),i=aa(i),a=aa(a)):(r=_,a=m,n=i=0),(x&&!~(l+"").indexOf("px")||k&&!~(f+"").indexOf("px"))&&(x=pd(g,"x",l,"px"),k=pd(g,"y",f,"px")),(v||y||T||b)&&(x=aa(x+v-(v*r+y*i)+T),k=aa(k+y-(v*n+y*a)+b)),(u||h)&&(s=g.getBBox(),x=aa(x+u/100*s.width),k=aa(k+h/100*s.height)),s="matrix("+r+","+n+","+i+","+a+","+x+","+k+")",g.setAttribute("transform",s),w&&(g.style[Le]=s)};_("padding,margin,Width,Radius",function(e,r){var t="Right",n="Bottom",i="Left",o=(r<3?["Top",t,n,i]:["Top"+i,"Top"+t,n+t,n+i]).map(function(t){return r<2?e+t:"border"+t+e});je[1<r?"border"+e:e]=function(e,t,r,n,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return qd(e,t,r)}),5===(s=a.join(" ")).split(a[0]).length?a[0]:s;a=(n+"").split(" "),s={},o.forEach(function(t,e){return s[t]=a[e]=a[e]||a[(e-1)/2|0]}),e.init(t,s,i)}});var er,rr,nr,ir={name:"css",register:hd,targetTest:function targetTest(t){return t.style&&t.nodeType},init:function init(t,e,r,n,i){var a,s,o,u,h,l,f,p,c,d,_,m,g,v,y,T=this._props,b=t.style;for(f in oe||hd(),e)if("autoRound"!==f&&(s=e[f],!ht[f]||!Ib(f,e,r,n,t,i)))if(h=typeof s,l=je[f],"function"===h&&(h=typeof(s=s.call(r,n,t,i))),"string"===h&&~s.indexOf("random(")&&(s=Za(s)),l)l(this,t,f,s,r)&&(y=1);else if("--"===f.substr(0,2))this.add(b,"setProperty",getComputedStyle(t).getPropertyValue(f)+"",s+"",n,i,0,0,f);else{if(a=qd(t,f),u=parseFloat(a),(d="string"===h&&"="===s.charAt(1)?+(s.charAt(0)+"1"):0)&&(s=s.substr(2)),o=parseFloat(s),f in Ie&&("autoAlpha"===f&&(1===u&&"hidden"===qd(t,"visibility")&&o&&(u=0),nd(this,b,"visibility",u?"inherit":"hidden",o?"inherit":"hidden",!o)),"scale"!==f&&"transform"!==f&&~(f=Ie[f]).indexOf(",")&&(f=f.split(",")[0])),_=f in Ae)if(m||((g=t._gsap).renderTransform||Ge(t),v=!1!==e.smoothOrigin&&g.smooth,(m=this._pt=new ee(this._pt,b,Le,0,1,g.renderTransform,g,0,-1)).dep=1),"scale"===f)this._pt=new ee(this._pt,g,"scaleY",g.scaleY,d?d*o:o-g.scaleY),T.push("scaleY",f),f+="X";else{if("transformOrigin"===f){s=td(s),g.svg?Bd(t,s,0,v,0,this):((c=parseFloat(s.split(" ")[2]))!==g.zOrigin&&nd(this,g,"zOrigin",g.zOrigin,c),nd(this,b,f,Qe(a),Qe(s)));continue}if("svgOrigin"===f){Bd(t,s,1,v,0,this);continue}if(f in Ze){Ld(this,g,f,u,s,d);continue}if("smoothOrigin"===f){nd(this,g,"smooth",g.smooth,s);continue}if("force3D"===f){g[f]=s;continue}if("transform"===f){Md(this,s,t);continue}}else f in b||(f=Ne(f)||f);if(_||(o||0===o)&&(u||0===u)&&!Be.test(s)&&f in b)(p=(a+"").substr((u+"").length))!==(c=(s+"").substr((o+"").length)||(f in U.units?U.units[f]:p))&&(u=pd(t,f,a,c)),this._pt=new ee(this._pt,_?g:b,f,u,d?d*o:o-u,"px"!==c||!1===e.autoRound||_?Qc:Tc),this._pt.u=c||0,p!==c&&(this._pt.b=a,this._pt.r=Sc);else if(f in b)rd.call(this,t,f,a,s);else{if(!(f in t)){L(f,s);continue}this.add(t,f,t[f],s,n,i)}T.push(f)}y&&te(this)},get:qd,aliases:Ie,getSetter:function getSetter(t,e,r){var n=Ie[e];return n&&n.indexOf(",")<0&&(e=n),e in Ae&&e!==qe&&(t._gsap.x||qd(t,"x"))?r&&le===r?"scale"===e?Zc:Yc:(le=r||{})&&("scale"===e?$c:_c):t.style&&!q(t.style[e])?Wc:~e.indexOf("-")?Xc:Gt(t,e)}};ne.utils.checkPrefix=Ne,nr=_((er="x,y,z,scale,scaleX,scaleY,xPercent,yPercent")+","+(rr="rotation,rotationX,rotationY,skewX,skewY")+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){Ae[t]=1}),_(rr,function(t){U.units[t]="deg",Ze[t]=1}),Ie[nr[13]]=er+","+rr,_("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");Ie[e[1]]=nr[e[0]]}),_("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){U.units[t]="px"}),ne.registerPlugin(ir);var ar=ne.registerPlugin(ir)||ne,sr=ar.core.Tween;e.Back=ke,e.Bounce=Me,e.CSSPlugin=ir,e.Circ=Se,e.Cubic=ye,e.Elastic=xe,e.Expo=Ce,e.Linear=ge,e.Power0=pe,e.Power1=ce,e.Power2=de,e.Power3=_e,e.Power4=me,e.Quad=ve,e.Quart=Te,e.Quint=be,e.Sine=Pe,e.SteppedEase=Oe,e.Strong=we,e.TimelineLite=Bt,e.TimelineMax=Bt,e.TweenLite=Vt,e.TweenMax=sr,e.default=ar,e.gsap=ar;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});


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

	var els = _qAll(els);
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
	keyIndex == konami.length && (0 === _qAll("#konamicode").length && (_q("body").innerHTML += '<div id="konamicode"><iframe title="YouTube video player" class="youtube-player"' +
			' type="text/html" width="905" height="510" src="https://www.youtube.com/embed/tg' +
			'bNymZ7vqY?rel=0&autoplay=1" frameborder="0"></iframe></div>'), keyIndex = 0);
	if (_q('#konamicode') != undefined) {
		elem = _q('#konamicode');
		elem.onclick = function (e) {
			gsap.to('#konamicode', {
				duration: 1.024,
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

//////////////// Dark Mode
var dark_mode = false;
function toggleDarkMode() {
	console.log("Toggle Dark Mode")
}
if(window.matchMedia){
	var darkmode = window.matchMedia('(prefers-color-scheme: dark)');
	darkmode.addListener(function(e){
		h = _q("html");
		if(e.matches) dark_mode = false;
		else dark_mode = true;
		toggleDarkMode();
	});
}


//////////////// Loading Image
var imageloading = {
	loaded: false,
	init: function (elem, onupdate, callback) {
		var that = this,
			callback_called = 0,
			imgs = null;

		that.loaded = false;

		imgs = elem.querySelectorAll("img");
		waitForImg(imgs, function(index, percent) {
			if(onupdate) onupdate(percent);
		}, function() {
			that.loaded = true;
			if(callback) callback();
			else that.done();
		});
	},
	done: function (callback) {
		var that = this;

		if(callback) callback();
	}
}

////////// Initial

// When DOM is parsed
document.addEventListener('DOMContentLoaded', function(e) {
	// Wait for all images to be loaded
	var _percent = {
		score: 0
	};
	imageloading.init(document, function (percent){
		gsap.to(_percent, {
			score: percent,
			roundProps: "score",
			onUpdate: function() {
				_q("#loader").innerHTML = '<p>Downloading <span><i style="width:' + _percent.score + '%"></i></span></p>';
			},
			ease: "expo"
		})
	}, function () {
		var tl = gsap.timeline({ defaults: { duration: .256 }});

		tl
			.fromTo("#loader", { ease: "expo.in", borderRadius: 0 }, { borderRadius: "0 0 50vw 50vw" })
			.fromTo("#loader", { ease: "expo.out", y: "0%" }, { y: "-100%" })
			.set("#loader", { opacity: 0, onComplete: function() {
				_q("#loader").innerHTML = "";
			}})
		;
	});
});

barba.init({
	transitions: [{
		name: 'default-transition',
		before(data) {
			var tl = gsap.timeline({ defaults: { duration: .256 }});

			tl
				.set("#loader", { opacity: 1 })
				.fromTo("#loader", { ease: "expo.in", y: "100%", borderRadius: "50vw 50vw 0 0" }, { y: "0%" })
				.fromTo("#loader", { ease: "expo.out", borderRadius: "50vw 50vw 0 0" }, { borderRadius: 0 })
			;

			return tl;
		},
		leave(data) {
			return true;
		},
		enter(data) {
			return true;
		},
		after(data) {
			var tl = gsap.timeline({ defaults: { duration: .256 }});

			tl
				.fromTo("#loader", { ease: "expo.in", borderRadius: 0 }, { borderRadius: "0 0 50vw 50vw" })
				.fromTo("#loader", { ease: "expo.out", y: "0%" }, { y: "-100%" })
				.set("#loader", { opacity: 0 })
			;

			return tl;
		}
	}]
});

barba.hooks.enter(() => {
	window.scrollTo(0, 0);
});
//# sourceMappingURL=bundle.js.map
