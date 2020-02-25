!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("Barba",[],e):"object"==typeof exports?exports.Barba=e():t.Barba=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="http://localhost:8080/dist",e(0)}([function(t,e,n){"function"!=typeof Promise&&(window.Promise=n(1));var r={version:"1.0.0",BaseTransition:n(4),BaseView:n(6),BaseCache:n(8),Dispatcher:n(7),HistoryManager:n(9),Pjax:n(10),Prefetch:n(13),Utils:n(5)};t.exports=r},function(t,e,n){(function(e){!function(n){function r(){}function i(t,e){return function(){t.apply(e,arguments)}}function o(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],h(t,this)}function s(t,e){for(;3===t._state;)t=t._value;return 0===t._state?void t._deferreds.push(e):(t._handled=!0,void l(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?a:c)(e.promise,t._value);var r;try{r=n(t._value)}catch(t){return void c(e.promise,t)}a(e.promise,r)}))}function a(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof o)return t._state=3,t._value=e,void u(t);if("function"==typeof n)return void h(i(n,e),t)}t._state=1,t._value=e,u(t)}catch(e){c(t,e)}}function c(t,e){t._state=2,t._value=e,u(t)}function u(t){2===t._state&&0===t._deferreds.length&&l(function(){t._handled||p(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)s(t,t._deferreds[e]);t._deferreds=null}function f(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function h(t,e){var n=!1;try{t(function(t){n||(n=!0,a(e,t))},function(t){n||(n=!0,c(e,t))})}catch(t){if(n)return;n=!0,c(e,t)}}var d=setTimeout,l="function"==typeof e&&e||function(t){d(t,0)},p=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)};o.prototype.catch=function(t){return this.then(null,t)},o.prototype.then=function(t,e){var n=new this.constructor(r);return s(this,new f(t,e,n)),n},o.all=function(t){var e=Array.prototype.slice.call(t);return new o(function(t,n){function r(o,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(t){r(o,t)},n)}e[o]=s,0===--i&&t(e)}catch(t){n(t)}}if(0===e.length)return t([]);for(var i=e.length,o=0;o<e.length;o++)r(o,e[o])})},o.resolve=function(t){return t&&"object"==typeof t&&t.constructor===o?t:new o(function(e){e(t)})},o.reject=function(t){return new o(function(e,n){n(t)})},o.race=function(t){return new o(function(e,n){for(var r=0,i=t.length;r<i;r++)t[r].then(e,n)})},o._setImmediateFn=function(t){l=t},o._setUnhandledRejectionFn=function(t){p=t},"undefined"!=typeof t&&t.exports?t.exports=o:n.Promise||(n.Promise=o)}(this)}).call(e,n(2).setImmediate)},function(t,e,n){(function(t,r){function i(t,e){this._id=t,this._clearFn=e}var o=n(3).nextTick,s=Function.prototype.apply,a=Array.prototype.slice,c={},u=0;e.setTimeout=function(){return new i(s.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new i(s.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},e.setImmediate="function"==typeof t?t:function(t){var n=u++,r=!(arguments.length<2)&&a.call(arguments,1);return c[n]=!0,o(function(){c[n]&&(r?t.apply(null,r):t.call(null),e.clearImmediate(n))}),n},e.clearImmediate="function"==typeof r?r:function(t){delete c[t]}}).call(e,n(2).setImmediate,n(2).clearImmediate)},function(t,e){function n(){h&&u&&(h=!1,u.length?f=u.concat(f):d=-1,f.length&&r())}function r(){if(!h){var t=s(n);h=!0;for(var e=f.length;e;){for(u=f,f=[];++d<e;)u&&u[d].run();d=-1,e=f.length}u=null,h=!1,a(t)}}function i(t,e){this.fun=t,this.array=e}function o(){}var s,a,c=t.exports={};!function(){try{s=setTimeout}catch(t){s=function(){throw new Error("setTimeout is not defined")}}try{a=clearTimeout}catch(t){a=function(){throw new Error("clearTimeout is not defined")}}}();var u,f=[],h=!1,d=-1;c.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];f.push(new i(t,e)),1!==f.length||h||s(r,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},c.title="browser",c.browser=!0,c.env={},c.argv=[],c.version="",c.versions={},c.on=o,c.addListener=o,c.once=o,c.off=o,c.removeListener=o,c.removeAllListeners=o,c.emit=o,c.binding=function(t){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(t){throw new Error("process.chdir is not supported")},c.umask=function(){return 0}},function(t,e,n){var r=n(5),i={oldContainer:void 0,newContainer:void 0,newContainerLoading:void 0,extend:function(t){return r.extend(this,t)},init:function(t,e){var n=this;return this.oldContainer=t,this._newContainerPromise=e,this.deferred=r.deferred(),this.newContainerReady=r.deferred(),this.newContainerLoading=this.newContainerReady.promise,this.start(),this._newContainerPromise.then(function(t){n.newContainer=t,n.newContainerReady.resolve()}),this.deferred.promise},done:function(){this.oldContainer.parentNode.removeChild(this.oldContainer),this.newContainer.style.visibility="visible",this.deferred.resolve()},start:function(){}};t.exports=i},function(t,e){var n={getCurrentUrl:function(){return window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search},cleanLink:function(t){return t.replace(/#.*/,"")},xhrTimeout:5e3,xhr:function(t){var e=this.deferred(),n=new XMLHttpRequest;return n.onreadystatechange=function(){if(4===n.readyState)return 200===n.status?e.resolve(n.responseText):e.reject(new Error("xhr: HTTP code is not 200"))},n.ontimeout=function(){return e.reject(new Error("xhr: Timeout exceeded"))},n.open("GET",t),n.timeout=this.xhrTimeout,n.setRequestHeader("x-barba","yes"),n.send(),e.promise},extend:function(t,e){var n=Object.create(t);for(var r in e)e.hasOwnProperty(r)&&(n[r]=e[r]);return n},deferred:function(){return new function(){this.resolve=null,this.reject=null,this.promise=new Promise(function(t,e){this.resolve=t,this.reject=e}.bind(this))}},getPort:function(t){var e="undefined"!=typeof t?t:window.location.port,n=window.location.protocol;return""!=e?parseInt(e):"http:"===n?80:"https:"===n?443:void 0}};t.exports=n},function(t,e,n){var r=n(7),i=n(5),o={namespace:null,extend:function(t){return i.extend(this,t)},init:function(){var t=this;r.on("initStateChange",function(e,n){n&&n.namespace===t.namespace&&t.onLeave()}),r.on("newPageReady",function(e,n,r){t.container=r,e.namespace===t.namespace&&t.onEnter()}),r.on("transitionCompleted",function(e,n){e.namespace===t.namespace&&t.onEnterCompleted(),n&&n.namespace===t.namespace&&t.onLeaveCompleted()})},onEnter:function(){},onEnterCompleted:function(){},onLeave:function(){},onLeaveCompleted:function(){}};t.exports=o},function(t,e){var n={events:{},on:function(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)},off:function(t,e){t in this.events!=!1&&this.events[t].splice(this.events[t].indexOf(e),1)},trigger:function(t){if(t in this.events!=!1)for(var e=0;e<this.events[t].length;e++)this.events[t][e].apply(this,Array.prototype.slice.call(arguments,1))}};t.exports=n},function(t,e,n){var r=n(5),i={data:{},extend:function(t){return r.extend(this,t)},set:function(t,e){this.data[t]=e},get:function(t){return this.data[t]},reset:function(){this.data={}}};t.exports=i},function(t,e){var n={history:[],add:function(t,e){e||(e=void 0),this.history.push({url:t,namespace:e})},currentStatus:function(){return this.history[this.history.length-1]},prevStatus:function(){var t=this.history;return t.length<2?null:t[t.length-2]}};t.exports=n},function(t,e,n){var r=n(5),i=n(7),o=n(11),s=n(8),a=n(9),c=n(12),u={Dom:c,History:a,Cache:s,cacheEnabled:!0,transitionProgress:!1,ignoreClassLink:"no-barba",start:function(){this.init()},init:function(){var t=this.Dom.getContainer(),e=this.Dom.getWrapper();e.setAttribute("aria-live","polite"),this.History.add(this.getCurrentUrl(),this.Dom.getNamespace(t)),i.trigger("initStateChange",this.History.currentStatus()),i.trigger("newPageReady",this.History.currentStatus(),{},t,this.Dom.currentHTML),i.trigger("transitionCompleted",this.History.currentStatus()),this.bindEvents()},bindEvents:function(){document.addEventListener("click",this.onLinkClick.bind(this)),window.addEventListener("popstate",this.onStateChange.bind(this))},getCurrentUrl:function(){return r.cleanLink(r.getCurrentUrl())},goTo:function(t){window.history.pushState(null,null,t),this.onStateChange()},forceGoTo:function(t){window.location=t},load:function(t){var e,n=r.deferred(),i=this;return e=this.Cache.get(t),e||(e=r.xhr(t),this.Cache.set(t,e)),e.then(function(t){var e=i.Dom.parseResponse(t);i.Dom.putContainer(e),i.cacheEnabled||i.Cache.reset(),n.resolve(e)},function(){i.forceGoTo(t),n.reject()}),n.promise},getHref:function(t){if(t)return t.getAttribute&&"string"==typeof t.getAttribute("xlink:href")?t.getAttribute("xlink:href"):"string"==typeof t.href?t.href:void 0},onLinkClick:function(t){for(var e=t.target;e&&!this.getHref(e);)e=e.parentNode;if(this.preventCheck(t,e)){t.stopPropagation(),t.preventDefault(),i.trigger("linkClicked",e,t);var n=this.getHref(e);this.goTo(n)}},preventCheck:function(t,e){if(!window.history.pushState)return!1;var n=this.getHref(e);return!(!e||!n)&&(!(t.which>1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey)&&((!e.target||"_blank"!==e.target)&&(window.location.protocol===e.protocol&&window.location.hostname===e.hostname&&(r.getPort()===r.getPort(e.port)&&(!(n.indexOf("#")>-1)&&((!e.getAttribute||"string"!=typeof e.getAttribute("download"))&&(r.cleanLink(n)!=r.cleanLink(location.href)&&!e.classList.contains(this.ignoreClassLink))))))))},getTransition:function(){return o},onStateChange:function(){var t=this.getCurrentUrl();if(this.transitionProgress&&this.forceGoTo(t),this.History.currentStatus().url===t)return!1;this.History.add(t);var e=this.load(t),n=Object.create(this.getTransition());this.transitionProgress=!0,i.trigger("initStateChange",this.History.currentStatus(),this.History.prevStatus());var r=n.init(this.Dom.getContainer(),e);e.then(this.onNewContainerLoaded.bind(this)),r.then(this.onTransitionEnd.bind(this))},onNewContainerLoaded:function(t){var e=this.History.currentStatus();e.namespace=this.Dom.getNamespace(t),i.trigger("newPageReady",this.History.currentStatus(),this.History.prevStatus(),t,this.Dom.currentHTML)},onTransitionEnd:function(){this.transitionProgress=!1,i.trigger("transitionCompleted",this.History.currentStatus(),this.History.prevStatus())}};t.exports=u},function(t,e,n){var r=n(4),i=r.extend({start:function(){this.newContainerLoading.then(this.finish.bind(this))},finish:function(){document.body.scrollTop=0,this.done()}});t.exports=i},function(t,e){var n={dataNamespace:"namespace",wrapperId:"barba-wrapper",containerClass:"barba-container",currentHTML:document.documentElement.innerHTML,parseResponse:function(t){this.currentHTML=t;var e=document.createElement("div");e.innerHTML=t;var n=e.querySelector("title");return n&&(document.title=n.textContent),this.getContainer(e)},getWrapper:function(){var t=document.getElementById(this.wrapperId);if(!t)throw new Error("Barba.js: wrapper not found!");return t},getContainer:function(t){if(t||(t=document.body),!t)throw new Error("Barba.js: DOM not ready!");var e=this.parseContainer(t);if(e&&e.jquery&&(e=e[0]),!e)throw new Error("Barba.js: no container found");return e},getNamespace:function(t){return t&&t.dataset?t.dataset[this.dataNamespace]:t?t.getAttribute("data-"+this.dataNamespace):null},putContainer:function(t){t.style.visibility="hidden";var e=this.getWrapper();e.appendChild(t)},parseContainer:function(t){return t.querySelector("."+this.containerClass)}};t.exports=n},function(t,e,n){var r=n(5),i=n(10),o={ignoreClassLink:"no-barba-prefetch",init:function(){return!!window.history.pushState&&(document.body.addEventListener("mouseover",this.onLinkEnter.bind(this)),void document.body.addEventListener("touchstart",this.onLinkEnter.bind(this)))},onLinkEnter:function(t){for(var e=t.target;e&&!i.getHref(e);)e=e.parentNode;if(e&&!e.classList.contains(this.ignoreClassLink)){var n=i.getHref(e);if(i.preventCheck(t,e)&&!i.Cache.get(n)){var o=r.xhr(n);i.Cache.set(n,o)}}}};t.exports=o}])});
/*!
 * GSAP 3.2.0
 * https://greensock.com
 * 
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(e){"use strict";function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function n(t){return"string"==typeof t}function o(t){return"function"==typeof t}function p(t){return"number"==typeof t}function q(t){return void 0===t}function r(t){return"object"==typeof t}function s(t){return!1!==t}function t(){return"undefined"!=typeof window}function u(t){return o(t)||n(t)}function K(t){return(l=dt(t,at))&&ne}function L(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")}function M(t,e){return!e&&console.warn(t)}function N(t,e){return t&&(at[t]=e)&&l&&(l[t]=e)||at}function O(){return 0}function Y(t){var e,n,i=t[0];if(r(i)||o(i)||(t=[t]),!(e=(i._gsap||{}).harness)){for(n=pt.length;n--&&!pt[n].targetTest(i););e=pt[n]}for(n=t.length;n--;)t[n]&&(t[n]._gsap||(t[n]._gsap=new Rt(t[n],e)))||t.splice(n,1);return t}function Z(t){return t._gsap||Y(yt(t))[0]._gsap}function $(t,e){var r=t[e];return o(r)?t[e]():q(r)&&t.getAttribute(e)||r}function _(t,e){return(t=t.split(",")).forEach(e)||t}function aa(t){return Math.round(1e5*t)/1e5||0}function ba(t,e){for(var r=e.length,n=0;t.indexOf(e[n])<0&&++n<r;);return n<r}function ca(t,e,r){var n,i=p(t[1]),a=(i?2:1)+(e<2?0:1),o=t[a];if(i&&(o.duration=t[1]),o.parent=r,e){for(n=o;r&&!("immediateRender"in n);)n=r.vars.defaults||{},r=s(r.vars.inherit)&&r.parent;o.immediateRender=s(n.immediateRender),e<2?o.runBackwards=1:o.startAt=t[a-1]}return o}function da(){var t,e,r=ot.length,n=ot.slice(0);for(ut={},t=ot.length=0;t<r;t++)(e=n[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)}function ea(t,e,r,n){ot.length&&da(),t.render(e,r,n),ot.length&&da()}function fa(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(it).length<2?e:t}function ga(t){return t}function ha(t,e){for(var r in e)r in t||(t[r]=e[r]);return t}function ia(t,e){for(var r in e)r in t||"duration"===r||"ease"===r||(t[r]=e[r])}function ka(t,e){for(var n in e)t[n]=r(e[n])?ka(t[n]||(t[n]={}),e[n]):e[n];return t}function la(t,e){var r,n={};for(r in t)r in e||(n[r]=t[r]);return n}function pa(t,e,r,n){void 0===r&&(r="_first"),void 0===n&&(n="_last");var i=e._prev,a=e._next;i?i._next=a:t[r]===e&&(t[r]=a),a?a._prev=i:t[n]===e&&(t[n]=i),e._dp=t,e._next=e._prev=e.parent=null}function qa(t,e){!t.parent||e&&!t.parent.autoRemoveChildren||t.parent.remove(t),t._act=0}function ra(t){for(var e=t;e;)e._dirty=1,e=e.parent;return t}function ua(t){return t._repeat?_t(t._tTime,t=t.duration()+t._rDelay)*t:0}function wa(t,e){return(t-e._start)*e._ts+(0<=e._ts?0:e._dirty?e.totalDuration():e._tDur)}function xa(t){return t._end=aa(t._start+(t._tDur/Math.abs(t._ts||t._pauseTS||B)||0))}function ya(t,e,r){if(e.parent&&qa(e),e._start=aa(r+e._delay),e._end=aa(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),function _addLinkedListItem(t,e,r,n,i){void 0===r&&(r="_first"),void 0===n&&(n="_last");var a,s=t[n];if(i)for(a=e[i];s&&s[i]>a;)s=s._prev;s?(e._next=s._next,s._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[n]=e,e._prev=s,e.parent=t}(t,e,"_first","_last",t._sort?"_start":0),(t._recent=e)._time||!e._dur&&e._initted){var n=(t.rawTime()-e._start)*e._ts;(!e._dur||gt(0,e.totalDuration(),n)-e._tTime>B)&&e.render(n,!0)}if(ra(t)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(var i=t;i._dp;)0<=i.rawTime()&&i.totalTime(i._tTime,!0),i=i._dp;t._zTime=-B}return t}function za(t,e,r,n){return qt(t,e),t._initted?!r&&t._pt&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&c!==Mt.frame?(ot.push(t),t._lazy=[e,n],1):void 0:1}function Ca(t,e,r){var n=t._repeat,i=aa(e);return t._dur=i,t._tDur=n?n<0?1e12:aa(i*(n+1)+t._rDelay*n):i,r||ra(t.parent),t.parent&&xa(t),t}function Da(t){return t instanceof Bt?ra(t):Ca(t,t._dur)}function Fa(t,e){var r,i,a=t.labels,s=t._recent||mt,o=t.duration()>=z?s.endTime(!1):t._dur;return n(e)&&(isNaN(e)||e in a)?"<"===(r=e.charAt(0))||">"===r?("<"===r?s._start:s.endTime(0<=s._repeat))+(parseFloat(e.substr(1))||0):(r=e.indexOf("="))<0?(e in a||(a[e]=o),a[e]):(i=+(e.charAt(r-1)+e.substr(r+1)),1<r?Fa(t,e.substr(0,r-1))+i:o+i):null==e?o:+e}function Ga(t,e){return t||0===t?e(t):e}function Ia(t){return(t+"").substr((parseFloat(t)+"").length)}function La(t,e){return t&&r(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&r(t[0]))&&!t.nodeType&&t!==i}function Oa(t){return t.sort(function(){return.5-Math.random()})}function Pa(t){if(o(t))return t;var d=r(t)?t:{each:t},_=Dt(d.ease),m=d.from||0,g=parseFloat(d.base)||0,v={},e=0<m&&m<1,y=isNaN(m)||e,T=d.axis,b=m,w=m;return n(m)?b=w={center:.5,edges:.5,end:1}[m]||0:!e&&y&&(b=m[0],w=m[1]),function(t,e,r){var n,i,a,s,o,u,h,l,f,p=(r||d).length,c=v[p];if(!c){if(!(f="auto"===d.grid?0:(d.grid||[1,z])[1])){for(h=-z;h<(h=r[f++].getBoundingClientRect().left)&&f<p;);f--}for(c=v[p]=[],n=y?Math.min(f,p)*b-.5:m%f,i=y?p*w/f-.5:m/f|0,l=z,u=h=0;u<p;u++)a=u%f-n,s=i-(u/f|0),c[u]=o=T?Math.abs("y"===T?s:a):X(a*a+s*s),h<o&&(h=o),o<l&&(l=o);"random"===m&&Oa(c),c.max=h-l,c.min=l,c.v=p=(parseFloat(d.amount)||parseFloat(d.each)*(p<f?p-1:T?"y"===T?p/f:f:Math.max(f,p/f))||0)*("edges"===m?-1:1),c.b=p<0?g-p:g,c.u=Ia(d.amount||d.each)||0,_=_&&p<0?Ft(_):_}return p=(c[t]-c.min)/c.max||0,aa(c.b+(_?_(p):p)*c.v)+c.u}}function Qa(e){var r=e<1?Math.pow(10,(e+"").length-2):1;return function(t){return~~(Math.round(parseFloat(t)/e)*e*r)/r+(p(t)?0:Ia(t))}}function Ra(u,t){var h,l,e=W(u);return!e&&r(u)&&(h=e=u.radius||z,u.values?(u=yt(u.values),(l=!p(u[0]))&&(h*=h)):u=Qa(u.increment)),Ga(t,e?o(u)?function(t){return l=u(t),Math.abs(l-t)<=h?l:t}:function(t){for(var e,r,n=parseFloat(l?t.x:t),i=parseFloat(l?t.y:0),a=z,s=0,o=u.length;o--;)(e=l?(e=u[o].x-n)*e+(r=u[o].y-i)*r:Math.abs(u[o]-n))<a&&(a=e,s=o);return s=!h||a<=h?u[s]:t,l||s===t||p(t)?s:s+Ia(t)}:Qa(u))}function Sa(t,e,r,n){return Ga(W(t)?!e:!0===r?!!(r=0):!n,function(){return W(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(n=r<1?Math.pow(10,(r+"").length-2):1)&&~~(Math.round((t+Math.random()*(e-t))/r)*r*n)/n})}function Wa(e,r,t){return Ga(t,function(t){return e[~~r(t)]})}function Za(t){for(var e,r,n,i,a=0,s="";~(e=t.indexOf("random(",a));)n=t.indexOf(")",e),i="["===t.charAt(e+7),r=t.substr(e+7,n-e-7).match(i?it:H),s+=t.substr(a,e-a)+Sa(i?r:+r[0],+r[1],+r[2]||1e-5),a=n+1;return s+t.substr(a,t.length-a)}function ab(t,e,r){var n,i,a,s=t.labels,o=z;for(n in s)(i=s[n]-e)<0==!!r&&i&&o>(i=Math.abs(i))&&(a=n,o=i);return a}function cb(t){return qa(t),t.progress()<1&&bt(t,"onInterrupt"),t}function hb(t,e,r){return(6*(t=t<0?t+1:1<t?t-1:t)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*wt+.5|0}function ib(t,e,r){var n,i,a,s,o,u,h,l,f,c,d=t?p(t)?[t>>16,t>>8&wt,t&wt]:0:xt.black;if(!d){if(","===t.substr(-1)&&(t=t.substr(0,t.length-1)),xt[t])d=xt[t];else if("#"===t.charAt(0))4===t.length&&(t="#"+(n=t.charAt(1))+n+(i=t.charAt(2))+i+(a=t.charAt(3))+a),d=[(t=parseInt(t.substr(1),16))>>16,t>>8&wt,t&wt];else if("hsl"===t.substr(0,3))if(d=c=t.match(H),e){if(~t.indexOf("="))return d=t.match(J),r&&d.length<4&&(d[3]=1),d}else s=+d[0]%360/360,o=d[1]/100,n=2*(u=d[2]/100)-(i=u<=.5?u*(o+1):u+o-u*o),3<d.length&&(d[3]*=1),d[0]=hb(s+1/3,n,i),d[1]=hb(s,n,i),d[2]=hb(s-1/3,n,i);else d=t.match(H)||xt.transparent;d=d.map(Number)}return e&&!c&&(n=d[0]/wt,i=d[1]/wt,a=d[2]/wt,u=((h=Math.max(n,i,a))+(l=Math.min(n,i,a)))/2,h===l?s=o=0:(f=h-l,o=.5<u?f/(2-h-l):f/(h+l),s=h===n?(i-a)/f+(i<a?6:0):h===i?(a-n)/f+2:(n-i)/f+4,s*=60),d[0]=~~(s+.5),d[1]=~~(100*o+.5),d[2]=~~(100*u+.5)),r&&d.length<4&&(d[3]=1),d}function jb(t){var r=[],n=[],i=-1;return t.split(kt).forEach(function(t){var e=t.match(tt)||[];r.push.apply(r,e),n.push(i+=e.length+1)}),r.c=n,r}function kb(t,e,r){var n,i,a,s,o="",u=(t+o).match(kt),h=e?"hsla(":"rgba(",l=0;if(!u)return t;if(u=u.map(function(t){return(t=ib(t,e,1))&&h+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(a=jb(t),(n=r.c).join(o)!==a.c.join(o)))for(s=(i=t.replace(kt,"1").split(tt)).length-1;l<s;l++)o+=i[l]+(~n.indexOf(l)?u.shift()||h+"0,0,0,0)":(a.length?a:u.length?u:r).shift());if(!i)for(s=(i=t.split(kt)).length-1;l<s;l++)o+=i[l]+u[l];return o+i[s]}function nb(t){var e,r=t.join(" ");if(kt.lastIndex=0,kt.test(r))return e=Ot.test(r),t[1]=kb(t[1],e),t[0]=kb(t[0],e,jb(t[1])),!0}function vb(t){var e=(t+"").split("("),r=Ct[e[0]];return r&&1<e.length&&r.config?r.config.apply(null,~t.indexOf("{")?[function _parseObjectInString(t){for(var e,r,n,i={},a=t.substr(1,t.length-3).split(":"),s=a[0],o=1,u=a.length;o<u;o++)r=a[o],e=o!==u-1?r.lastIndexOf(","):r.length,n=r.substr(0,e),i[s]=isNaN(n)?n.replace(At,"").trim():+n,s=r.substr(e+1).trim();return i}(e[1])]:rt.exec(t)[1].split(",").map(fa)):Ct._CE&&St.test(t)?Ct._CE("",t):r}function yb(t,e,r,n){void 0===r&&(r=function easeOut(t){return 1-e(1-t)}),void 0===n&&(n=function easeInOut(t){return t<.5?e(2*t)/2:1-e(2*(1-t))/2});var i,a={easeIn:e,easeOut:r,easeInOut:n};return _(t,function(t){for(var e in Ct[t]=at[t]=a,Ct[i=t.toLowerCase()]=r,a)Ct[i+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=Ct[t+"."+e]=a[e]}),a}function zb(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}}function Ab(r,t,e){function Vk(t){return 1===t?1:n*Math.pow(2,-10*t)*Q((t-a)*i)+1}var n=1<=t?t:1,i=(e||(r?.3:.45))/(t<1?t:1),a=i/I*(Math.asin(1/n)||0),s="out"===r?Vk:"in"===r?function(t){return 1-Vk(1-t)}:zb(Vk);return i=I/i,s.config=function(t,e){return Ab(r,t,e)},s}function Bb(e,r){function bl(t){return t?--t*t*((r+1)*t+r)+1:0}void 0===r&&(r=1.70158);var t="out"===e?bl:"in"===e?function(t){return 1-bl(1-t)}:zb(bl);return t.config=function(t){return Bb(e,t)},t}var R,i,a,h,l,f,c,d,m,g,v,y,T,b,w,x,k,P,C,S,A,F,D,U={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},E={duration:.5,overwrite:!1,delay:0},z=1e8,B=1/z,I=2*Math.PI,V=I/4,j=0,X=Math.sqrt,G=Math.cos,Q=Math.sin,W=Array.isArray,H=/(?:-?\.?\d|\.)+/gi,J=/[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,tt=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,et=/[-+=.]*\d+(?:\.|e-|e)*\d*/gi,rt=/\(([^()]+)\)/i,nt=/[+-]=-?[\.\d]+/,it=/[#\-+.]*\b[a-z\d-=+%.]+/gi,at={},st={},ot=[],ut={},ht={},lt={},ft=30,pt=[],ct="onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",dt=function _merge(t,e){for(var r in e)t[r]=e[r];return t},_t=function _animationCycle(t,e){return(t/=e)&&~~t===t?~~t-1:~~t},mt={_start:0,endTime:O},gt=function _clamp(t,e,r){return r<t?t:e<r?e:r},vt=[].slice,yt=function toArray(t,e){return!n(t)||e||!a&&Pt()?W(t)?function _flatten(t,e,r){return void 0===r&&(r=[]),t.forEach(function(t){return n(t)&&!e||La(t,1)?r.push.apply(r,yt(t)):r.push(t)})||r}(t,e):La(t)?vt.call(t,0):t?[t]:[]:vt.call(h.querySelectorAll(t),0)},Tt=function mapRange(e,t,r,n,i){var a=t-e,s=n-r;return Ga(i,function(t){return r+(t-e)/a*s})},bt=function _callback(t,e,r){var n,i,a=t.vars,s=a[e];if(s)return n=a[e+"Params"],i=a.callbackScope||t,r&&ot.length&&da(),n?s.apply(i,n):s.call(i)},wt=255,xt={aqua:[0,wt,wt],lime:[0,wt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,wt],navy:[0,0,128],white:[wt,wt,wt],olive:[128,128,0],yellow:[wt,wt,0],orange:[wt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[wt,0,0],pink:[wt,192,203],cyan:[0,wt,wt],transparent:[wt,wt,wt,0]},kt=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";for(t in xt)e+="|"+t+"\\b";return new RegExp(e+")","gi")}(),Ot=/hsl[a]?\(/,Mt=(b=Date.now,w=500,x=33,k=b(),P=k,S=C=1/240,T={time:0,frame:0,tick:function tick(){_j(!0)},wake:function wake(){f&&(!a&&t()&&(i=a=window,h=i.document||{},at.gsap=ne,(i.gsapVersions||(i.gsapVersions=[])).push(ne.version),K(l||i.GreenSockGlobals||!i.gsap&&i||{}),y=i.requestAnimationFrame),g&&T.sleep(),v=y||function(t){return setTimeout(t,1e3*(S-T.time)+1|0)},m=1,_j(2))},sleep:function sleep(){(y?i.cancelAnimationFrame:clearTimeout)(g),m=0,v=O},lagSmoothing:function lagSmoothing(t,e){w=t||1e8,x=Math.min(e,w,0)},fps:function fps(t){C=1/(t||240),S=T.time+C},add:function add(t){A.indexOf(t)<0&&A.push(t),Pt()},remove:function remove(t){var e;~(e=A.indexOf(t))&&A.splice(e,1)},_listeners:A=[]}),Pt=function _wake(){return!m&&Mt.wake()},Ct={},St=/^[\d.\-M][\d.\-,\s]/,At=/["']/g,Ft=function _invertEase(e){return function(t){return 1-e(1-t)}},Dt=function _parseEase(t,e){return t&&(o(t)?t:Ct[t]||vb(t))||e};function _j(e){var t,r,n=b()-P,i=!0===e;w<n&&(k+=n-x),P+=n,T.time=(P-k)/1e3,(0<(t=T.time-S)||i)&&(T.frame++,S+=t+(C<=t?.004:C-t),r=1),i||(g=v(_j)),r&&A.forEach(function(t){return t(T.time,n,T.frame,e)})}function sl(t){return t<D?F*t*t:t<.7272727272727273?F*Math.pow(t-1.5/2.75,2)+.75:t<.9090909090909092?F*(t-=2.25/2.75)*t+.9375:F*Math.pow(t-2.625/2.75,2)+.984375}_("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;yb(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow(2*(1-t),r)/2})}),Ct.Linear.easeNone=Ct.none=Ct.Linear.easeIn,yb("Elastic",Ab("in"),Ab("out"),Ab()),F=7.5625,D=1/2.75,yb("Bounce",function(t){return 1-sl(1-t)},sl),yb("Expo",function(t){return t?Math.pow(2,10*(t-1)):0}),yb("Circ",function(t){return-(X(1-t*t)-1)}),yb("Sine",function(t){return 1-G(t*V)}),yb("Back",Bb("in"),Bb("out"),Bb()),Ct.SteppedEase=Ct.steps=at.SteppedEase={config:function config(t,e){void 0===t&&(t=1);var r=1/t,n=t+(e?0:1),i=e?1:0;return function(t){return((n*gt(0,.99999999,t)|0)+i)*r}}},E.ease=Ct["quad.out"];var zt,Rt=function GSCache(t,e){this.id=j++,(t._gsap=this).target=t,this.harness=e,this.get=e?e.get:$,this.set=e?e.getSetter:Gt},Et=((zt=Animation.prototype).delay=function delay(t){return t||0===t?(this._delay=t,this):this._delay},zt.duration=function duration(t){return arguments.length?Ca(this,t):this.totalDuration()&&this._dur},zt.totalDuration=function totalDuration(t){return arguments.length?(this._dirty=0,Ca(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},zt.totalTime=function totalTime(t,e){if(Pt(),!arguments.length)return this._tTime;var r=this.parent||this._dp;if(r&&r.smoothChildTiming&&this._ts){for(this._start=aa(r._time-(0<this._ts?t/this._ts:((this._dirty?this.totalDuration():this._tDur)-t)/-this._ts)),xa(this),r._dirty||ra(r);r.parent;)r.parent._time!==r._start+(0<=r._ts?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&ya(this._dp,this,this._start-this._delay)}return this._tTime===t&&(this._dur||e)&&Math.abs(this._zTime)!==B||(this._ts||(this._pTime=t),ea(this,t,e)),this},zt.time=function time(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+ua(this))%this._dur||(t?this._dur:0),e):this._time},zt.totalProgress=function totalProgress(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.ratio},zt.progress=function progress(t,e){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?t:1-t)+ua(this),e):this.duration()?Math.min(1,this._time/this._dur):this.ratio},zt.iteration=function iteration(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?_t(this._tTime,r)+1:1},zt.timeScale=function timeScale(t){if(!arguments.length)return this._ts||this._pauseTS||0;if(null!==this._pauseTS)return this._pauseTS=t,this;var e=this.parent&&this._ts?wa(this.parent._time,this):this._tTime;return this._ts=t,function _recacheAncestors(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t}(this.totalTime(e,!0))},zt.paused=function paused(t){var e=!this._ts;return arguments.length?(e!==t&&(t?(this._pauseTS=this._ts,this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Pt(),this._ts=this._pauseTS||1,this._pauseTS=null,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&(this._tTime-=B)&&Math.abs(this._zTime)!==B))),this):e},zt.startTime=function startTime(t){return arguments.length?(this.parent&&this.parent._sort&&ya(this.parent,this,t-this._delay),this):this._start},zt.endTime=function endTime(t){return this._start+(s(t)?this.totalDuration():this.duration())/Math.abs(this._ts)},zt.rawTime=function rawTime(t){var e=this.parent||this._dp;return e?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?wa(e.rawTime(t),this):this._tTime:this._tTime},zt.repeat=function repeat(t){return arguments.length?(this._repeat=t,Da(this)):this._repeat},zt.repeatDelay=function repeatDelay(t){return arguments.length?(this._rDelay=t,Da(this)):this._rDelay},zt.yoyo=function yoyo(t){return arguments.length?(this._yoyo=t,this):this._yoyo},zt.seek=function seek(t,e){return this.totalTime(Fa(this,t),s(e))},zt.restart=function restart(t,e){return this.play().totalTime(t?-this._delay:0,s(e))},zt.play=function play(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},zt.reverse=function reverse(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},zt.pause=function pause(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},zt.resume=function resume(){return this.paused(!1)},zt.reversed=function reversed(t){var e=this._ts||this._pauseTS||0;return arguments.length?(t!==this.reversed()&&(this[null===this._pauseTS?"_ts":"_pauseTS"]=Math.abs(e)*(t?-1:1),this.totalTime(this._tTime,!0)),this):e<0},zt.invalidate=function invalidate(){return this._initted=0,this._zTime=-B,this},zt.isActive=function isActive(t){var e,r=this.parent||this._dp,n=this._start;return!(r&&!(this._ts&&(this._initted||!t)&&r.isActive(t)&&(e=r.rawTime(!0))>=n&&e<this.endTime(!0)-B))},zt.eventCallback=function eventCallback(t,e,r){var n=this.vars;return 1<arguments.length?(e?(n[t]=e,r&&(n[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete n[t],this):n[t]},zt.then=function then(t){var n=this;return new Promise(function(e){function Hm(){var t=n.then;n.then=null,o(r)&&(r=r(n))&&(r.then||r===n)&&(n.then=t),e(r),n.then=t}var r=o(t)?t:ga;n._initted&&1===n.totalProgress()&&0<=n._ts||!n._tTime&&n._ts<0?Hm():n._prom=Hm})},zt.kill=function kill(){cb(this)},Animation);function Animation(t,e){var r=t.parent||R;this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ca(this,+t.duration,1),this.data=t.data,m||Mt.wake(),r&&ya(r,this,e||0===e?e:r._time),t.reversed&&this.reversed(!0),t.paused&&this.paused(!0)}ha(Et.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-B,_prom:0,_pauseTS:null});var Bt=function(i){function Timeline(t,e){var r;return void 0===t&&(t={}),(r=i.call(this,t,e)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=s(t.sortChildren),r}_inheritsLoose(Timeline,i);var t=Timeline.prototype;return t.to=function to(t,e,r,n){return new Vt(t,ca(arguments,0,this),Fa(this,p(e)?n:r)),this},t.from=function from(t,e,r,n){return new Vt(t,ca(arguments,1,this),Fa(this,p(e)?n:r)),this},t.fromTo=function fromTo(t,e,r,n,i){return new Vt(t,ca(arguments,2,this),Fa(this,p(e)?i:n)),this},t.set=function set(t,e,r){return e.duration=0,e.parent=this,e.repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new Vt(t,e,Fa(this,r)),this},t.call=function call(t,e,r){return ya(this,Vt.delayedCall(0,t,e),Fa(this,r))},t.staggerTo=function staggerTo(t,e,r,n,i,a,s){return r.duration=e,r.stagger=r.stagger||n,r.onComplete=a,r.onCompleteParams=s,r.parent=this,new Vt(t,r,Fa(this,i)),this},t.staggerFrom=function staggerFrom(t,e,r,n,i,a,o){return r.runBackwards=1,r.immediateRender=s(r.immediateRender),this.staggerTo(t,e,r,n,i,a,o)},t.staggerFromTo=function staggerFromTo(t,e,r,n,i,a,o,u){return n.startAt=r,n.immediateRender=s(n.immediateRender),this.staggerTo(t,e,n,i,a,o,u)},t.render=function render(t,e,r){var n,i,a,s,o,u,h,l,f,p,c,d,_=this._time,m=this._dirty?this.totalDuration():this._tDur,g=this._dur,v=this!==R&&m-B<t&&0<=t?m:t<B?0:t,y=this._zTime<0!=t<0&&(this._initted||!g);if(v!==this._tTime||r||y){if(_!==this._time&&g&&(v+=this._time-_,t+=this._time-_),n=v,f=this._start,u=!(l=this._ts),y&&(g||(_=this._zTime),!t&&e||(this._zTime=t)),this._repeat&&(c=this._yoyo,o=g+this._rDelay,(g<(n=aa(v%o))||m===v)&&(n=g),(s=~~(v/o))&&s===v/o&&(n=g,s--),c&&1&s&&(n=g-n,d=1),s!==(p=_t(this._tTime,o))&&!this._lock)){var T=c&&1&p,b=T===(c&&1&s);if(s<p&&(T=!T),_=T?0:g,this._lock=1,this.render(_,e,!g)._lock=0,!e&&this.parent&&bt(this,"onRepeat"),this.vars.repeatRefresh&&!d&&(this.invalidate()._lock=1),_!==this._time||u!=!this._ts)return this;if(b&&(this._lock=2,_=T?g+1e-4:-1e-4,this.render(_,!0),this.vars.repeatRefresh&&!d&&this.invalidate()),this._lock=0,!this._ts&&!u)return this}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=function _findNextPauseTween(t,e,r){var n;if(e<r)for(n=t._first;n&&n._start<=r;){if(!n._dur&&"isPause"===n.data&&n._start>e)return n;n=n._next}else for(n=t._last;n&&n._start>=r;){if(!n._dur&&"isPause"===n.data&&n._start<e)return n;n=n._prev}}(this,aa(_),aa(n)))&&(v-=n-(n=h._start)),this._tTime=v,this._time=n,this._act=!l,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t),_||!n||e||bt(this,"onStart"),_<=n&&0<=t)for(i=this._first;i;){if(a=i._next,(i._act||n>=i._start)&&i._ts&&h!==i){if(i.parent!==this)return this.render(t,e,r);if(i.render(0<i._ts?(n-i._start)*i._ts:(i._dirty?i.totalDuration():i._tDur)+(n-i._start)*i._ts,e,r),n!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=-B);break}}i=a}else{i=this._last;for(var w=t<0?t:n;i;){if(a=i._prev,(i._act||w<=i._end)&&i._ts&&h!==i){if(i.parent!==this)return this.render(t,e,r);if(i.render(0<i._ts?(w-i._start)*i._ts:(i._dirty?i.totalDuration():i._tDur)+(w-i._start)*i._ts,e,r),n!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=w?-B:B);break}}i=a}}if(h&&!e&&(this.pause(),h.render(_<=n?0:-B)._zTime=_<=n?1:-1,this._ts))return this._start=f,xa(this),this.render(t,e,r);this._onUpdate&&!e&&bt(this,"onUpdate",!0),(v===m&&m>=this.totalDuration()||!v&&this._ts<0)&&(f!==this._start&&Math.abs(l)===Math.abs(this._ts)||(!t&&g||!(t&&0<this._ts||!v&&this._ts<0)||qa(this,1),e||t<0&&!_||(bt(this,v===m?"onComplete":"onReverseComplete",!0),this._prom&&this._prom())))}return this},t.add=function add(t,e){var r=this;if(p(e)||(e=Fa(this,e)),!(t instanceof Et)){if(W(t))return t.forEach(function(t){return r.add(t,e)}),ra(this);if(n(t))return this.addLabel(t,e);if(!o(t))return this;t=Vt.delayedCall(0,t)}return this!==t?ya(this,t,e):this},t.getChildren=function getChildren(t,e,r,n){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===n&&(n=-z);for(var i=[],a=this._first;a;)a._start>=n&&(a instanceof Vt?e&&i.push(a):(r&&i.push(a),t&&i.push.apply(i,a.getChildren(!0,e,r)))),a=a._next;return i},t.getById=function getById(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},t.remove=function remove(t){return n(t)?this.removeLabel(t):o(t)?this.killTweensOf(t):(pa(this,t),t===this._recent&&(this._recent=this._last),ra(this))},t.totalTime=function totalTime(t,e){return arguments.length?(this._forcing=1,this.parent||this._dp||!this._ts||(this._start=aa(Mt.time-(0<this._ts?t/this._ts:(this.totalDuration()-t)/-this._ts))),i.prototype.totalTime.call(this,t,e),this._forcing=0,this):this._tTime},t.addLabel=function addLabel(t,e){return this.labels[t]=Fa(this,e),this},t.removeLabel=function removeLabel(t){return delete this.labels[t],this},t.addPause=function addPause(t,e,r){var n=Vt.delayedCall(0,e||O,r);return n.data="isPause",this._hasPause=1,ya(this,n,Fa(this,t))},t.removePause=function removePause(t){var e=this._first;for(t=Fa(this,t);e;)e._start===t&&"isPause"===e.data&&qa(e),e=e._next},t.killTweensOf=function killTweensOf(t,e,r){for(var n=this.getTweensOf(t,r),i=n.length;i--;)It!==n[i]&&n[i].kill(t,e);return this},t.getTweensOf=function getTweensOf(t,e){for(var r,n=[],i=yt(t),a=this._first;a;)a instanceof Vt?!ba(a._targets,i)||e&&!a.isActive("started"===e)||n.push(a):(r=a.getTweensOf(i,e)).length&&n.push.apply(n,r),a=a._next;return n},t.tweenTo=function tweenTo(t,e){e=e||{};var r=this,n=Fa(r,t),i=e.startAt,a=Vt.to(r,ha(e,{ease:"none",lazy:!1,time:n,duration:e.duration||Math.abs(n-(i&&"time"in i?i.time:r._time))/r.timeScale()||B,onStart:function onStart(){r.pause();var t=e.duration||Math.abs(n-r._time)/r.timeScale();a._dur!==t&&Ca(a,t).render(a._time,!0,!0),e.onStart&&e.onStart.apply(a,e.onStartParams||[])}}));return a},t.tweenFromTo=function tweenFromTo(t,e,r){return this.tweenTo(e,ha({startAt:{time:Fa(this,t)}},r))},t.recent=function recent(){return this._recent},t.nextLabel=function nextLabel(t){return void 0===t&&(t=this._time),ab(this,Fa(this,t))},t.previousLabel=function previousLabel(t){return void 0===t&&(t=this._time),ab(this,Fa(this,t),1)},t.currentLabel=function currentLabel(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+B)},t.shiftChildren=function shiftChildren(t,e,r){void 0===r&&(r=0);for(var n,i=this._first,a=this.labels;i;)i._start>=r&&(i._start+=t),i=i._next;if(e)for(n in a)a[n]>=r&&(a[n]+=t);return ra(this)},t.invalidate=function invalidate(){var t=this._first;for(this._lock=0;t;)t.invalidate(),t=t._next;return i.prototype.invalidate.call(this)},t.clear=function clear(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._time=this._tTime=0,t&&(this.labels={}),ra(this)},t.totalDuration=function totalDuration(t){var e,r,n,i,a=0,s=this,o=s._last,u=z;if(arguments.length)return s._repeat<0?s:s.timeScale(s.totalDuration()/t);if(s._dirty){for(i=s.parent;o;)e=o._prev,o._dirty&&o.totalDuration(),u<(n=o._start)&&s._sort&&o._ts&&!s._lock?(s._lock=1,ya(s,o,n-o._delay)._lock=0):u=n,n<0&&o._ts&&(a-=n,(!i&&!s._dp||i&&i.smoothChildTiming)&&(s._start+=n/s._ts,s._time-=n,s._tTime-=n),s.shiftChildren(-n,!1,-1e20),u=0),a<(r=xa(o))&&o._ts&&(a=r),o=e;Ca(s,s===R&&s._time>a?s._time:Math.min(z,a),1),s._dirty=0}return s._tDur},Timeline.updateRoot=function updateRoot(t){if(R._ts&&(ea(R,wa(t,R)),c=Mt.frame),Mt.frame>=ft){ft+=U.autoSleep||120;var e=R._first;if((!e||!e._ts)&&U.autoSleep&&Mt._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||Mt.sleep()}}},Timeline}(Et);ha(Bt.prototype,{_lock:0,_hasPause:0,_forcing:0});function Ib(t,e,i,a,s,u){var h,l,f,p;if(ht[t]&&!1!==(h=new ht[t]).init(s,h.rawVars?e[t]:function _processVars(t,e,i,a,s){if(o(t)&&(t=Yt(t,s,e,i,a)),!r(t)||t.style&&t.nodeType||W(t))return n(t)?Yt(t,s,e,i,a):t;var u,h={};for(u in t)h[u]=Yt(t[u],s,e,i,a);return h}(e[t],a,s,u,i),i,a,u)&&(i._pt=l=new ee(i._pt,s,t,0,1,h.render,h,0,h.priority),i!==d))for(f=i._ptLookup[i._targets.indexOf(s)],p=h._props.length;p--;)f[h._props[p]]=l;return h}var It,Lt=function _addPropTween(t,e,r,i,a,s,u,h,l){o(i)&&(i=i(a||0,t,s));var f,p=t[e],c="get"!==r?r:o(p)?l?t[e.indexOf("set")||!o(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():p,d=o(p)?l?Zt:Xt:jt;if(n(i)&&(~i.indexOf("random(")&&(i=Za(i)),"="===i.charAt(1)&&(i=parseFloat(c)+parseFloat(i.substr(2))*("-"===i.charAt(0)?-1:1)+(Ia(c)||0))),c!==i)return isNaN(c+i)?(p||e in t||L(e,i),function _addComplexStringPropTween(t,e,r,n,i,a,s){var o,u,h,l,f,p,c,d,_=new ee(this._pt,t,e,0,1,Ht,null,i),m=0,g=0;for(_.b=r,_.e=n,r+="",(c=~(n+="").indexOf("random("))&&(n=Za(n)),a&&(a(d=[r,n],t,e),r=d[0],n=d[1]),u=r.match(et)||[];o=et.exec(n);)l=o[0],f=n.substring(m,o.index),h?h=(h+1)%5:"rgba("===f.substr(-5)&&(h=1),l!==u[g++]&&(p=parseFloat(u[g-1])||0,_._pt={_next:_._pt,p:f||1===g?f:",",s:p,c:"="===l.charAt(1)?parseFloat(l.substr(2))*("-"===l.charAt(0)?-1:1):parseFloat(l)-p,m:h&&h<4?Math.round:0},m=et.lastIndex);return _.c=m<n.length?n.substring(m,n.length):"",_.fp=s,(nt.test(n)||c)&&(_.e=0),this._pt=_}.call(this,t,e,c,i,d,h||U.stringFilter,l)):(f=new ee(this._pt,t,e,+c||0,i-(c||0),"boolean"==typeof p?Wt:Qt,0,d),l&&(f.fp=l),u&&f.modifier(u,this,t),this._pt=f)},qt=function _initTween(t,e){var r,n,i,a,o,u,h,l,f,p,c,d,_=t.vars,m=_.ease,g=_.startAt,v=_.immediateRender,y=_.lazy,T=_.onUpdate,b=_.onUpdateParams,w=_.callbackScope,x=_.runBackwards,k=_.yoyoEase,O=_.keyframes,M=_.autoRevert,P=t._dur,C=t._startAt,S=t._targets,A=t.parent,F=A&&"nested"===A.data?A.parent._targets:S,D="auto"===t._overwrite,z=t.timeline;if(!z||O&&m||(m="none"),t._ease=Dt(m,E.ease),t._yEase=k?Ft(Dt(!0===k?m:k,E.ease)):0,k&&t._yoyo&&!t._repeat&&(k=t._yEase,t._yEase=t._ease,t._ease=k),!z){if(C&&C.render(-1,!0).kill(),g){if(qa(t._startAt=Vt.set(S,ha({data:"isStart",overwrite:!1,parent:A,immediateRender:!0,lazy:s(y),startAt:null,delay:0,onUpdate:T,onUpdateParams:b,callbackScope:w,stagger:0},g))),v)if(0<e)M||(t._startAt=0);else if(P)return}else if(x&&P)if(C)M||(t._startAt=0);else if(e&&(v=!1),qa(t._startAt=Vt.set(S,dt(la(_,st),{overwrite:!1,data:"isFromStart",lazy:v&&s(y),immediateRender:v,stagger:0,parent:A}))),v){if(!e)return}else _initTween(t._startAt,B);for(r=la(_,st),d=(l=S[t._pt=0]?Z(S[0]).harness:0)&&_[l.prop],y=P&&s(y)||y&&!P,n=0;n<S.length;n++){if(h=(o=S[n])._gsap||Y(S)[n]._gsap,t._ptLookup[n]=p={},ut[h.id]&&da(),c=F===S?n:F.indexOf(o),l&&!1!==(f=new l).init(o,d||r,t,c,F)&&(t._pt=a=new ee(t._pt,o,f.name,0,1,f.render,f,0,f.priority),f._props.forEach(function(t){p[t]=a}),f.priority&&(u=1)),!l||d)for(i in r)ht[i]&&(f=Ib(i,r,t,c,o,F))?f.priority&&(u=1):p[i]=a=Lt.call(t,o,i,"get",r[i],c,F,0,_.stringFilter);t._op&&t._op[n]&&t.kill(o,t._op[n]),D&&t._pt&&(It=t,R.killTweensOf(o,p,"started"),It=0),t._pt&&y&&(ut[h.id]=1)}u&&te(t),t._onInit&&t._onInit(t)}t._from=!z&&!!_.runBackwards,t._onUpdate=T,t._initted=1},Yt=function _parseFuncOrString(t,e,r,i,a){return o(t)?t.call(e,r,i,a):n(t)&&~t.indexOf("random(")?Za(t):t},Nt=ct+",repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",Ut=(Nt+",id,stagger,delay,duration,paused").split(","),Vt=function(P){function Tween(t,e,n){var i;"number"==typeof e&&(n.duration=e,e=n,n=null);var a,o,h,l,f,c,d,_,m=(i=P.call(this,function _inheritDefaults(t){var e=t.parent||R,r=t.keyframes?ia:ha;if(s(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent;return t}(e),n)||this).vars,g=m.duration,v=m.delay,y=m.immediateRender,T=m.stagger,b=m.overwrite,w=m.keyframes,x=m.defaults,k=(W(t)?p(t[0]):"length"in e)?[t]:yt(t);if(i._targets=k.length?Y(k):M("GSAP target "+t+" not found. https://greensock.com",!U.nullTargetWarn)||[],i._ptLookup=[],i._overwrite=b,w||T||u(g)||u(v)){if(e=i.vars,(a=i.timeline=new Bt({data:"nested",defaults:x||{}})).kill(),a.parent=_assertThisInitialized(i),w)ha(a.vars.defaults,{ease:"none"}),w.forEach(function(t){return a.to(k,t,">")});else{if(l=k.length,d=T?Pa(T):O,r(T))for(f in T)~Nt.indexOf(f)&&((_=_||{})[f]=T[f]);for(o=0;o<l;o++){for(f in h={},e)Ut.indexOf(f)<0&&(h[f]=e[f]);h.stagger=0,_&&dt(h,_),e.yoyoEase&&!e.repeat&&(h.yoyoEase=e.yoyoEase),c=k[o],h.duration=+Yt(g,_assertThisInitialized(i),o,c,k),h.delay=(+Yt(v,_assertThisInitialized(i),o,c,k)||0)-i._delay,!T&&1===l&&h.delay&&(i._delay=v=h.delay,i._start+=v,h.delay=0),a.to(c,h,d(o,c,k))}g=v=0}g||i.duration(g=a.duration())}else i.timeline=0;return!0===b&&(It=_assertThisInitialized(i),R.killTweensOf(k),It=0),(y||!g&&!w&&i._start===i.parent._time&&s(y)&&function _hasNoPausedAncestors(t){return!t||t._ts&&_hasNoPausedAncestors(t.parent)}(_assertThisInitialized(i))&&"nested"!==i.parent.data)&&(i._tTime=-B,i.render(Math.max(0,-v))),i}_inheritsLoose(Tween,P);var t=Tween.prototype;return t.render=function render(t,e,r){var n,i,a,s,o,u,h,l,f,p=this._time,c=this._tDur,d=this._dur,_=c-B<t&&0<=t?c:t<B?0:t;if(d){if(_!==this._tTime||!t||r||this._startAt&&this._zTime<0!=t<0){if(n=_,l=this.timeline,this._repeat){if(s=d+this._rDelay,(d<(n=aa(_%s))||c===_)&&(n=d),(a=~~(_/s))&&a===_/s&&(n=d,a--),(u=this._yoyo&&1&a)&&(f=this._yEase,n=d-n),o=_t(this._tTime,s),n===p&&!r&&this._initted)return this;a!==o&&(!this.vars.repeatRefresh||u||this._lock||(this._lock=r=1,this.render(s*a,!0).invalidate()._lock=0))}if(!this._initted&&za(this,n,r,e))return this._tTime=0,this;for(this._tTime=_,this._time=n,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=h=(f||this._ease)(n/d),this._from&&(this.ratio=h=1-h),p||!n||e||bt(this,"onStart"),i=this._pt;i;)i.r(h,i.d),i=i._next;l&&l.render(t<0?t:!n&&u?-B:l._dur*h,e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(t<0&&this._startAt&&this._startAt.render(t,!0,r),bt(this,"onUpdate")),this._repeat&&a!==o&&this.vars.onRepeat&&!e&&this.parent&&bt(this,"onRepeat"),_!==this._tDur&&_||this._tTime!==_||(t<0&&this._startAt&&!this._onUpdate&&this._startAt.render(t,!0,r),!t&&d||!(t&&0<this._ts||!_&&this._ts<0)||qa(this,1),e||t<0&&!p||(bt(this,_===c?"onComplete":"onReverseComplete",!0),this._prom&&this._prom()))}}else!function _renderZeroDurationTween(t,e,r,n){var i,a=t._zTime<0?0:1,s=e<0?0:1,o=t._rDelay,u=0;if(o&&t._repeat&&(u=gt(0,t._tDur,e),_t(u,o)!==_t(t._tTime,o)&&(a=1-s,t.vars.repeatRefresh&&t._initted&&t.invalidate())),(t._initted||!za(t,e,n,r))&&(s!==a||n||t._zTime===B||!e&&t._zTime)){for(t._zTime=e||(r?B:0),t.ratio=s,t._from&&(s=1-s),t._time=0,t._tTime=u,r||bt(t,"onStart"),i=t._pt;i;)i.r(s,i.d),i=i._next;!s&&t._startAt&&!t._onUpdate&&t._start&&t._startAt.render(e,!0,n),t._onUpdate&&!r&&bt(t,"onUpdate"),u&&t._repeat&&!r&&t.parent&&bt(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===s&&(t.ratio&&qa(t,1),r||(bt(t,t.ratio?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}}(this,t,e,r);return this},t.targets=function targets(){return this._targets},t.invalidate=function invalidate(){return this._pt=this._op=this._startAt=this._onUpdate=this._act=this._lazy=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(),P.prototype.invalidate.call(this)},t.kill=function kill(t,e){if(void 0===e&&(e="all"),!(t||e&&"all"!==e)&&(this._lazy=0,this.parent))return cb(this);if(this.timeline)return this.timeline.killTweensOf(t,e,It&&!0!==It.vars.overwrite),this;var r,i,a,s,o,u,h,l=this._targets,f=t?yt(t):l,p=this._ptLookup,c=this._pt;if((!e||"all"===e)&&function _arraysMatch(t,e){for(var r=t.length,n=r===e.length;n&&r--&&t[r]===e[r];);return r<0}(l,f))return cb(this);for(r=this._op=this._op||[],"all"!==e&&(n(e)&&(o={},_(e,function(t){return o[t]=1}),e=o),e=function _addAliasesToVars(t,e){var r,n,i,a,s=t[0]?Z(t[0]).harness:0,o=s&&s.aliases;if(!o)return e;for(n in r=dt({},e),o)if(n in r)for(i=(a=o[n].split(",")).length;i--;)r[a[i]]=r[n];return r}(l,e)),h=l.length;h--;)if(~f.indexOf(l[h]))for(o in i=p[h],"all"===e?(r[h]=e,s=i,a={}):(a=r[h]=r[h]||{},s=e),s)(u=i&&i[o])&&("kill"in u.d&&!0!==u.d.kill(o)||pa(this,u,"_pt"),delete i[o]),"all"!==a&&(a[o]=1);return this._initted&&!this._pt&&c&&cb(this),this},Tween.to=function to(t,e,r){return new Tween(t,e,r)},Tween.from=function from(t,e){return new Tween(t,ca(arguments,1))},Tween.delayedCall=function delayedCall(t,e,r,n){return new Tween(e,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:e,onReverseComplete:e,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:n})},Tween.fromTo=function fromTo(t,e,r){return new Tween(t,ca(arguments,2))},Tween.set=function set(t,e){return e.duration=0,e.repeatDelay||(e.repeat=0),new Tween(t,e)},Tween.killTweensOf=function killTweensOf(t,e,r){return R.killTweensOf(t,e,r)},Tween}(Et);ha(Vt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),_("staggerTo,staggerFrom,staggerFromTo",function(r){Vt[r]=function(){var t=new Bt,e=vt.call(arguments,0);return e.splice("staggerFromTo"===r?5:4,0,0),t[r].apply(t,e)}});function Tb(t,e,r){return t.setAttribute(e,r)}function _b(t,e,r,n){n.mSet(t,e,n.m.call(n.tween,r,n.mt),n)}var jt=function _setterPlain(t,e,r){return t[e]=r},Xt=function _setterFunc(t,e,r){return t[e](r)},Zt=function _setterFuncWithParam(t,e,r,n){return t[e](n.fp,r)},Gt=function _getSetter(t,e){return o(t[e])?Xt:q(t[e])&&t.setAttribute?Tb:jt},Qt=function _renderPlain(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4,e)},Wt=function _renderBoolean(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Ht=function _renderComplexString(t,e){var r=e._pt,n="";if(!t&&e.b)n=e.b;else if(1===t&&e.e)n=e.e;else{for(;r;)n=r.p+(r.m?r.m(r.s+r.c*t):Math.round(1e4*(r.s+r.c*t))/1e4)+n,r=r._next;n+=e.c}e.set(e.t,e.p,n,e)},$t=function _renderPropTweens(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},Kt=function _addPluginModifier(t,e,r,n){for(var i,a=this._pt;a;)i=a._next,a.p===n&&a.modifier(t,e,r),a=i},Jt=function _killPropTweensOf(t){for(var e,r,n=this._pt;n;)r=n._next,n.p===t&&!n.op||n.op===t?pa(this,n,"_pt"):n.dep||(e=1),n=r;return!e},te=function _sortPropTweensByPriority(t){for(var e,r,n,i,a=t._pt;a;){for(e=a._next,r=n;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:i)?a._prev._next=a:n=a,(a._next=r)?r._prev=a:i=a,a=e}t._pt=n},ee=(PropTween.prototype.modifier=function modifier(t,e,r){this.mSet=this.mSet||this.set,this.set=_b,this.m=t,this.mt=r,this.tween=e},PropTween);function PropTween(t,e,r,n,i,a,s,o,u){this.t=e,this.s=n,this.c=i,this.p=r,this.r=a||Qt,this.d=s||this,this.set=o||jt,this.pr=u||0,(this._next=t)&&(t._prev=this)}_(ct+",parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert",function(t){st[t]=1,"on"===t.substr(0,2)&&(st[t+"Params"]=1)}),at.TweenMax=at.TweenLite=Vt,at.TimelineLite=at.TimelineMax=Bt,R=new Bt({sortChildren:!1,defaults:E,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),U.stringFilter=nb;var re={registerPlugin:function registerPlugin(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return function _createPlugin(t){var e=(t=!t.name&&t.default||t).name,r=o(t),n=e&&!r&&t.init?function(){this._props=[]}:t,i={init:O,render:$t,add:Lt,kill:Jt,modifier:Kt,rawVars:0},a={targetTest:0,get:0,getSetter:Gt,aliases:{},register:0};if(Pt(),t!==n){if(ht[e])return;ha(n,ha(la(t,i),a)),dt(n.prototype,dt(i,la(t,a))),ht[n.prop=e]=n,t.targetTest&&(pt.push(n),st[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}N(e,n),t.register&&t.register(ne,n,ee)}(t)})},timeline:function timeline(t){return new Bt(t)},getTweensOf:function getTweensOf(t,e){return R.getTweensOf(t,e)},getProperty:function getProperty(i,t,e,r){n(i)&&(i=yt(i)[0]);var a=Z(i||{}).get,s=e?ga:fa;return"native"===e&&(e=""),i?t?s((ht[t]&&ht[t].get||a)(i,t,e,r)):function(t,e,r){return s((ht[t]&&ht[t].get||a)(i,t,e,r))}:i},quickSetter:function quickSetter(r,e,n){if(1<(r=yt(r)).length){var i=r.map(function(t){return ne.quickSetter(t,e,n)}),a=i.length;return function(t){for(var e=a;e--;)i[e](t)}}r=r[0]||{};var s=ht[e],o=Z(r),u=s?function(t){var e=new s;d._pt=0,e.init(r,n?t+n:t,d,0,[r]),e.render(1,e),d._pt&&$t(1,d)}:o.set(r,e);return s?u:function(t){return u(r,e,n?t+n:t,o,1)}},isTweening:function isTweening(t){return 0<R.getTweensOf(t,!0).length},defaults:function defaults(t){return t&&t.ease&&(t.ease=Dt(t.ease,E.ease)),ka(E,t||{})},config:function config(t){return ka(U,t||{})},registerEffect:function registerEffect(t){var i=t.name,n=t.effect,e=t.plugins,a=t.defaults,s=t.extendTimeline;(e||"").split(",").forEach(function(t){return t&&!ht[t]&&!at[t]&&M(i+" effect requires "+t+" plugin.")}),lt[i]=function(t,e){return n(yt(t),ha(e||{},a))},s&&(Bt.prototype[i]=function(t,e,n){return this.add(lt[i](t,r(e)?e:(n=e)&&{}),n)})},registerEase:function registerEase(t,e){Ct[t]=Dt(e)},parseEase:function parseEase(t,e){return arguments.length?Dt(t,e):Ct},getById:function getById(t){return R.getById(t)},exportRoot:function exportRoot(t,e){void 0===t&&(t={});var r,n,i=new Bt(t);for(i.smoothChildTiming=s(t.smoothChildTiming),R.remove(i),i._dp=0,i._time=i._tTime=R._time,r=R._first;r;)n=r._next,!e&&!r._dur&&r instanceof Vt&&r.vars.onComplete===r._targets[0]||ya(i,r,r._start-r._delay),r=n;return ya(R,i,0),i},utils:{wrap:function wrap(e,t,r){var n=t-e;return W(e)?Wa(e,wrap(0,e.length),t):Ga(r,function(t){return(n+(t-e)%n)%n+e})},wrapYoyo:function wrapYoyo(e,t,r){var n=t-e,i=2*n;return W(e)?Wa(e,wrapYoyo(0,e.length-1),t):Ga(r,function(t){return e+(n<(t=(i+(t-e)%i)%i)?i-t:t)})},distribute:Pa,random:Sa,snap:Ra,normalize:function normalize(t,e,r){return Tt(t,e,0,1,r)},getUnit:Ia,clamp:function clamp(e,r,t){return Ga(t,function(t){return gt(e,r,t)})},splitColor:ib,toArray:yt,mapRange:Tt,pipe:function pipe(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function unitize(e,r){return function(t){return e(parseFloat(t))+(r||Ia(t))}},interpolate:function interpolate(e,r,t,i){var a=isNaN(e+r)?0:function(t){return(1-t)*e+t*r};if(!a){var s,o,u,h,l,f=n(e),p={};if(!0===t&&(i=1)&&(t=null),f)e={p:e},r={p:r};else if(W(e)&&!W(r)){for(u=[],h=e.length,l=h-2,o=1;o<h;o++)u.push(interpolate(e[o-1],e[o]));h--,a=function func(t){t*=h;var e=Math.min(l,~~t);return u[e](t-e)},t=r}else i||(e=dt(W(e)?[]:{},e));if(!u){for(s in r)Lt.call(p,e,s,"get",r[s]);a=function func(t){return $t(t,p)||(f?e.p:e)}}}return Ga(t,a)},shuffle:Oa},install:K,effects:lt,ticker:Mt,updateRoot:Bt.updateRoot,plugins:ht,globalTimeline:R,core:{PropTween:ee,globals:N,Tween:Vt,Timeline:Bt,Animation:Et,getCache:Z}};_("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return re[t]=Vt[t]}),Mt.add(Bt.updateRoot),d=re.to({},{duration:0});function dc(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r}function fc(t,a){return{name:t,rawVars:1,init:function init(t,i,e){e._onInit=function(t){var e,r;if(n(i)&&(e={},_(i,function(t){return e[t]=1}),i=e),a){for(r in e={},i)e[r]=a(i[r]);i=e}!function _addModifiers(t,e){var r,n,i,a=t._targets;for(r in e)for(n=a.length;n--;)(i=(i=t._ptLookup[n][r])&&i.d)&&(i._pt&&(i=dc(i,r)),i&&i.modifier&&i.modifier(e[r],t,a[n],r))}(t,i)}}}}var ne=re.registerPlugin({name:"attr",init:function init(t,e,r,n,i){for(var a in e)this.add(t,"setAttribute",(t.getAttribute(a)||0)+"",e[a],n,i,0,0,a),this._props.push(a)}},{name:"endArray",init:function init(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r])}},fc("roundProps",Qa),fc("modifiers"),fc("snap",Ra))||re;Vt.version=Bt.version=ne.version="3.2.0",f=1,t()&&Pt();function Qc(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function Rc(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function Sc(t,e){return e.set(e.t,e.p,t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function Tc(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)}function Uc(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)}function Vc(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)}function Wc(t,e,r){return t.style[e]=r}function Xc(t,e,r){return t.style.setProperty(e,r)}function Yc(t,e,r){return t._gsap[e]=r}function Zc(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r}function $c(t,e,r,n,i){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(i,a)}function _c(t,e,r,n,i){var a=t._gsap;a[e]=r,a.renderTransform(i,a)}function dd(t,e){var r=ae.createElementNS?ae.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ae.createElement(t);return r.style?r:ae.createElement(t)}function ed(t,e,r){var n=getComputedStyle(t);return n[e]||n.getPropertyValue(e.replace(Re,"-$1").toLowerCase())||n.getPropertyValue(e)||!r&&ed(t,Ne(e)||e,1)||""}function hd(){!function _windowExists(){return"undefined"!=typeof window}()||(ie=window,ae=ie.document,se=ae.documentElement,ue=dd("div")||{style:{}},he=dd("div"),Le=Ne(Le),qe=Ne(qe),ue.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",fe=!!Ne("perspective"),oe=1)}function jd(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])}function kd(e){var r;try{r=e.getBBox()}catch(t){r=function _getBBoxHack(t){var e,r=dd("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,i=this.nextSibling,a=this.style.cssText;if(se.appendChild(r),r.appendChild(this),this.style.display="block",t)try{e=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=_getBBoxHack}catch(t){}else this._gsapBBox&&(e=this._gsapBBox());return i?n.insertBefore(this,i):n.appendChild(this),se.removeChild(r),this.style.cssText=a,e}.call(e,!0)}return!r||r.width||r.x||r.y?r:{x:+jd(e,["x","cx","x1"])||0,y:+jd(e,["y","cy","y1"])||0,width:0,height:0}}function ld(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!kd(t))}function md(t,e){if(e){var r=t.style;e in Ae&&(e=Le),r.removeProperty?("ms"!==e.substr(0,2)&&"webkit"!==e.substr(0,6)||(e="-"+e),r.removeProperty(e.replace(Re,"-$1").toLowerCase())):r.removeAttribute(e)}}function nd(t,e,r,n,i,a){var s=new ee(t._pt,e,r,0,1,a?Vc:Uc);return(t._pt=s).b=n,s.e=i,t._props.push(r),s}function pd(t,e,r,n){var i,a,s,o,u=parseFloat(r)||0,h=(r+"").trim().substr((u+"").length)||"px",l=ue.style,f=Ee.test(e),p="svg"===t.tagName.toLowerCase(),c=(p?"client":"offset")+(f?"Width":"Height"),d="px"===n;return n===h||!u||Ue[n]||Ue[h]?u:(o=t.getCTM&&ld(t),"%"===n&&(Ae[e]||~e.indexOf("adius"))?aa(u/(o?t.getBBox()[f?"width":"height"]:t[c])*100):(l[f?"width":"height"]=100+(d?h:n),a=~e.indexOf("adius")||"em"===n&&t.appendChild&&!p?t:t.parentNode,o&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==ae&&a.appendChild||(a=ae.body),(s=a._gsap)&&"%"===n&&s.width&&f&&s.time===Mt.time?aa(u/s.width*100):(a===t&&(l.position="static"),a.appendChild(ue),i=ue[c],a.removeChild(ue),l.position="absolute",f&&"%"===n&&((s=Z(a)).time=Mt.time,s.width=a[c]),aa(d?i*u/100:100/i*u))))}function qd(t,e,r,n){var i;return oe||hd(),e in Ie&&"transform"!==e&&~(e=Ie[e]).indexOf(",")&&(e=e.split(",")[0]),Ae[e]&&"transform"!==e?(i=Ge(t,n),i="transformOrigin"!==e?i[e]:Qe(ed(t,qe))+" "+i.zOrigin+"px"):(i=t.style[e])&&"auto"!==i&&!n&&!~(i+"").indexOf("calc(")||(i=je[e]&&je[e](t,e,r)||ed(t,e)||$(t,e)||("opacity"===e?1:0)),r&&!~(i+"").indexOf(" ")?pd(t,e,i,r)+r:i}function rd(t,e,r,n){if(!r||"none"===r){var i=Ne(e,t,1),a=i&&ed(t,i,1);a&&a!==r&&(e=i,r=a)}var s,o,u,h,l,f,p,c,d,_,m,g,v=new ee(this._pt,t.style,e,0,1,Ht),y=0,T=0;if(v.b=r,v.e=n,r+="","auto"===(n+="")&&(t.style[e]=n,n=ed(t,e)||n,t.style[e]=r),nb(s=[r,n]),n=s[1],u=(r=s[0]).match(tt)||[],(n.match(tt)||[]).length){for(;o=tt.exec(n);)p=o[0],d=n.substring(y,o.index),l?l=(l+1)%5:"rgba("!==d.substr(-5)&&"hsla("!==d.substr(-5)||(l=1),p!==(f=u[T++]||"")&&(h=parseFloat(f)||0,m=f.substr((h+"").length),(g="="===p.charAt(1)?+(p.charAt(0)+"1"):0)&&(p=p.substr(2)),c=parseFloat(p),_=p.substr((c+"").length),y=tt.lastIndex-_.length,_||(_=_||U.units[e]||m,y===n.length&&(n+=_,v.e+=_)),m!==_&&(h=pd(t,e,f,_)||0),v._pt={_next:v._pt,p:d||1===T?d:",",s:h,c:g?g*c:c-h,m:l&&l<4?Math.round:0});v.c=y<n.length?n.substring(y,n.length):""}else v.r="display"===e&&"none"===n?Vc:Uc;return nt.test(n)&&(v.e=0),this._pt=v}function td(t){var e=t.split(" "),r=e[0],n=e[1]||"50%";return"top"!==r&&"bottom"!==r&&"left"!==n&&"right"!==n||(t=r,r=n,n=t),e[0]=Ve[r]||r,e[1]=Ve[n]||n,e.join(" ")}function ud(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,n,i,a=e.t,s=a.style,o=e.u;if("all"===o||!0===o)s.cssText="",n=1;else for(i=(o=o.split(",")).length;-1<--i;)r=o[i],Ae[r]&&(n=1,r="transformOrigin"===r?qe:Le),md(a,r);n&&(md(a,Le),(n=a._gsap)&&(n.svg&&a.removeAttribute("transform"),Ge(a,1)))}}function yd(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t}function zd(t){var e=ed(t,Le);return yd(e)?Xe:e.substr(7).match(J).map(aa)}function Ad(t,e){var r,n,i,a,s=t._gsap,o=t.style,u=zd(t);return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(i=t.transform.baseVal.consolidate().matrix).a,i.b,i.c,i.d,i.e,i.f]).join(",")?Xe:u:(u!==Xe||t.offsetParent||t===se||s.svg||(i=o.display,o.display="block",(r=t.parentNode)&&t.offsetParent||(a=1,n=t.nextSibling,se.appendChild(t)),u=zd(t),i?o.display=i:md(t,"display"),a&&(n?r.insertBefore(t,n):r?r.appendChild(t):se.removeChild(t))),e&&6<u.length?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)}function Bd(t,e,r,n,i,a){var s,o,u,h=t._gsap,l=i||Ad(t,!0),f=h.xOrigin||0,p=h.yOrigin||0,c=h.xOffset||0,d=h.yOffset||0,_=l[0],m=l[1],g=l[2],v=l[3],y=l[4],T=l[5],b=e.split(" "),w=parseFloat(b[0])||0,x=parseFloat(b[1])||0;r?l!==Xe&&(o=_*v-m*g)&&(u=w*(-m/o)+x*(_/o)-(_*T-m*y)/o,w=w*(v/o)+x*(-g/o)+(g*T-v*y)/o,x=u):(w=(s=kd(t)).x+(~b[0].indexOf("%")?w/100*s.width:w),x=s.y+(~(b[1]||b[0]).indexOf("%")?x/100*s.height:x)),n||!1!==n&&h.smooth?(y=w-f,T=x-p,h.xOffset=c+(y*_+T*g)-y,h.yOffset=d+(y*m+T*v)-T):h.xOffset=h.yOffset=0,h.xOrigin=w,h.yOrigin=x,h.smooth=!!n,h.origin=e,h.originIsAbsolute=!!r,t.style[qe]="0px 0px",a&&(nd(a,h,"xOrigin",f,w),nd(a,h,"yOrigin",p,x),nd(a,h,"xOffset",c,h.xOffset),nd(a,h,"yOffset",d,h.yOffset))}function Ed(t,e,r){var n=Ia(e);return aa(parseFloat(e)+parseFloat(pd(t,"x",r+"px",n)))+n}function Ld(t,e,r,i,a,s){var o,u,h=360,l=n(a),f=parseFloat(a)*(l&&~a.indexOf("rad")?Fe:1),p=s?f*s:f-i,c=i+p+"deg";return l&&("short"===(o=a.split("_")[1])&&(p%=h)!==p%180&&(p+=p<0?h:-h),"cw"===o&&p<0?p=(p+36e9)%h-~~(p/h)*h:"ccw"===o&&0<p&&(p=(p-36e9)%h-~~(p/h)*h)),t._pt=u=new ee(t._pt,e,r,i,p,Rc),u.e=c,u.u="deg",t._props.push(r),u}function Md(t,e,r){var n,i,a,s,o,u,h,l=he.style,f=r._gsap;for(i in l.cssText=getComputedStyle(r).cssText+";position:absolute;display:block;",l[Le]=e,ae.body.appendChild(he),n=Ge(he,1),Ae)(a=f[i])!==(s=n[i])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(i)<0&&(o=Ia(a)!==(h=Ia(s))?pd(r,i,a,h):parseFloat(a),u=parseFloat(s),t._pt=new ee(t._pt,f,i,o,u-o,Qc),t._pt.u=h||0,t._props.push(i));ae.body.removeChild(he)}var ie,ae,se,oe,ue,he,le,fe,pe=Ct.Power0,ce=Ct.Power1,de=Ct.Power2,_e=Ct.Power3,me=Ct.Power4,ge=Ct.Linear,ve=Ct.Quad,ye=Ct.Cubic,Te=Ct.Quart,be=Ct.Quint,we=Ct.Strong,xe=Ct.Elastic,ke=Ct.Back,Oe=Ct.SteppedEase,Me=Ct.Bounce,Pe=Ct.Sine,Ce=Ct.Expo,Se=Ct.Circ,Ae={},Fe=180/Math.PI,De=Math.PI/180,ze=Math.atan2,Re=/([A-Z])/g,Ee=/(?:left|right|width|margin|padding|x)/i,Be=/[\s,\(]\S/,Ie={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Le="transform",qe=Le+"Origin",Ye="O,Moz,ms,Ms,Webkit".split(","),Ne=function _checkPropPrefix(t,e,r){var n=(e||ue).style,i=5;if(t in n&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);i--&&!(Ye[i]+t in n););return i<0?null:(3===i?"ms":0<=i?Ye[i]:"")+t},Ue={deg:1,rad:1,turn:1},Ve={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},je={clearProps:function clearProps(t,e,r,n,i){if("isFromStart"!==i.data){var a=t._pt=new ee(t._pt,e,r,0,0,ud);return a.u=n,a.pr=-10,a.tween=i,t._props.push(r),1}}},Xe=[1,0,0,1,0,0],Ze={},Ge=function _parseTransform(t,e){var r=t._gsap||new Rt(t);if("x"in r&&!e&&!r.uncache)return r;var n,i,a,s,o,u,h,l,f,p,c,d,_,m,g,v,y,T,b,w,x,k,O,M,P,C,S,A,F,D,z=t.style,R=r.scaleX<0,E=r.xOrigin||0,B=r.yOrigin||0,I="deg",L=ed(t,qe)||"0";return n=i=a=u=h=l=f=p=c=0,s=o=1,r.svg=!(!t.getCTM||!ld(t)),d=Ad(t,r.svg),r.svg&&Bd(t,L,r.originIsAbsolute,!1!==r.smooth,d),d!==Xe&&(v=d[0],y=d[1],T=d[2],b=d[3],n=w=d[4],i=x=d[5],6===d.length?(s=Math.sqrt(v*v+y*y),o=Math.sqrt(b*b+T*T),u=v||y?ze(y,v)*Fe:0,f=T||b?ze(T,b)*Fe+u:0,r.svg&&(n-=E-(E*v+B*T),i-=B-(E*y+B*b))):(D=d[6],A=d[7],P=d[8],C=d[9],S=d[10],F=d[11],n=d[12],i=d[13],a=d[14],h=(_=ze(D,S))*Fe,_&&(k=w*(m=Math.cos(-_))+P*(g=Math.sin(-_)),O=x*m+C*g,M=D*m+S*g,P=w*-g+P*m,C=x*-g+C*m,S=D*-g+S*m,F=A*-g+F*m,w=k,x=O,D=M),l=(_=ze(-T,S))*Fe,_&&(m=Math.cos(-_),F=b*(g=Math.sin(-_))+F*m,v=k=v*m-P*g,y=O=y*m-C*g,T=M=T*m-S*g),u=(_=ze(y,v))*Fe,_&&(k=v*(m=Math.cos(_))+y*(g=Math.sin(_)),O=w*m+x*g,y=y*m-v*g,x=x*m-w*g,v=k,w=O),h&&359.9<Math.abs(h)+Math.abs(u)&&(h=u=0,l=180-l),s=aa(Math.sqrt(v*v+y*y+T*T)),o=aa(Math.sqrt(x*x+D*D)),_=ze(w,x),f=2e-4<Math.abs(_)?_*Fe:0,c=F?1/(F<0?-F:F):0),r.svg&&(d=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!yd(ed(t,Le)),d&&t.setAttribute("transform",d))),90<Math.abs(f)&&Math.abs(f)<270&&(R?(s*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(o*=-1,f+=f<=0?180:-180)),r.x=((r.xPercent=n&&Math.round(t.offsetWidth/2)===Math.round(-n)?-50:0)?0:n)+"px",r.y=((r.yPercent=i&&Math.round(t.offsetHeight/2)===Math.round(-i)?-50:0)?0:i)+"px",r.z=a+"px",r.scaleX=aa(s),r.scaleY=aa(o),r.rotation=aa(u)+I,r.rotationX=aa(h)+I,r.rotationY=aa(l)+I,r.skewX=f+I,r.skewY=p+I,r.transformPerspective=c+"px",(r.zOrigin=parseFloat(L.split(" ")[2])||0)&&(z[qe]=Qe(L)),r.xOffset=r.yOffset=0,r.force3D=U.force3D,r.renderTransform=r.svg?tr:fe?Je:We,r.uncache=0,r},Qe=function _firstTwoOnly(t){return(t=t.split(" "))[0]+" "+t[1]},We=function _renderNon3DTransforms(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Je(t,e)},He="0deg",$e="0px",Ke=") ",Je=function _renderCSSTransforms(t,e){var r=e||this,n=r.xPercent,i=r.yPercent,a=r.x,s=r.y,o=r.z,u=r.rotation,h=r.rotationY,l=r.rotationX,f=r.skewX,p=r.skewY,c=r.scaleX,d=r.scaleY,_=r.transformPerspective,m=r.force3D,g=r.target,v=r.zOrigin,y="",T="auto"===m&&t&&1!==t||!0===m;if(v&&(l!==He||h!==He)){var b,w=parseFloat(h)*De,x=Math.sin(w),k=Math.cos(w);w=parseFloat(l)*De,b=Math.cos(w),a=Ed(g,a,x*b*-v),s=Ed(g,s,-Math.sin(w)*-v),o=Ed(g,o,k*b*-v+v)}_!==$e&&(y+="perspective("+_+Ke),(n||i)&&(y+="translate("+n+"%, "+i+"%) "),!T&&a===$e&&s===$e&&o===$e||(y+=o!==$e||T?"translate3d("+a+", "+s+", "+o+") ":"translate("+a+", "+s+Ke),u!==He&&(y+="rotate("+u+Ke),h!==He&&(y+="rotateY("+h+Ke),l!==He&&(y+="rotateX("+l+Ke),f===He&&p===He||(y+="skew("+f+", "+p+Ke),1===c&&1===d||(y+="scale("+c+", "+d+Ke),g.style[Le]=y||"translate(0, 0)"},tr=function _renderSVGTransforms(t,e){var r,n,i,a,s,o=e||this,u=o.xPercent,h=o.yPercent,l=o.x,f=o.y,p=o.rotation,c=o.skewX,d=o.skewY,_=o.scaleX,m=o.scaleY,g=o.target,v=o.xOrigin,y=o.yOrigin,T=o.xOffset,b=o.yOffset,w=o.forceCSS,x=parseFloat(l),k=parseFloat(f);p=parseFloat(p),c=parseFloat(c),(d=parseFloat(d))&&(c+=d=parseFloat(d),p+=d),p||c?(p*=De,c*=De,r=Math.cos(p)*_,n=Math.sin(p)*_,i=Math.sin(p-c)*-m,a=Math.cos(p-c)*m,c&&(d*=De,s=Math.tan(c-d),i*=s=Math.sqrt(1+s*s),a*=s,d&&(s=Math.tan(d),r*=s=Math.sqrt(1+s*s),n*=s)),r=aa(r),n=aa(n),i=aa(i),a=aa(a)):(r=_,a=m,n=i=0),(x&&!~(l+"").indexOf("px")||k&&!~(f+"").indexOf("px"))&&(x=pd(g,"x",l,"px"),k=pd(g,"y",f,"px")),(v||y||T||b)&&(x=aa(x+v-(v*r+y*i)+T),k=aa(k+y-(v*n+y*a)+b)),(u||h)&&(s=g.getBBox(),x=aa(x+u/100*s.width),k=aa(k+h/100*s.height)),s="matrix("+r+","+n+","+i+","+a+","+x+","+k+")",g.setAttribute("transform",s),w&&(g.style[Le]=s)};_("padding,margin,Width,Radius",function(e,r){var t="Right",n="Bottom",i="Left",o=(r<3?["Top",t,n,i]:["Top"+i,"Top"+t,n+t,n+i]).map(function(t){return r<2?e+t:"border"+t+e});je[1<r?"border"+e:e]=function(e,t,r,n,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return qd(e,t,r)}),5===(s=a.join(" ")).split(a[0]).length?a[0]:s;a=(n+"").split(" "),s={},o.forEach(function(t,e){return s[t]=a[e]=a[e]||a[(e-1)/2|0]}),e.init(t,s,i)}});var er,rr,nr,ir={name:"css",register:hd,targetTest:function targetTest(t){return t.style&&t.nodeType},init:function init(t,e,r,n,i){var a,s,o,u,h,l,f,p,c,d,_,m,g,v,y,T=this._props,b=t.style;for(f in oe||hd(),e)if("autoRound"!==f&&(s=e[f],!ht[f]||!Ib(f,e,r,n,t,i)))if(h=typeof s,l=je[f],"function"===h&&(h=typeof(s=s.call(r,n,t,i))),"string"===h&&~s.indexOf("random(")&&(s=Za(s)),l)l(this,t,f,s,r)&&(y=1);else if("--"===f.substr(0,2))this.add(b,"setProperty",getComputedStyle(t).getPropertyValue(f)+"",s+"",n,i,0,0,f);else{if(a=qd(t,f),u=parseFloat(a),(d="string"===h&&"="===s.charAt(1)?+(s.charAt(0)+"1"):0)&&(s=s.substr(2)),o=parseFloat(s),f in Ie&&("autoAlpha"===f&&(1===u&&"hidden"===qd(t,"visibility")&&o&&(u=0),nd(this,b,"visibility",u?"inherit":"hidden",o?"inherit":"hidden",!o)),"scale"!==f&&"transform"!==f&&~(f=Ie[f]).indexOf(",")&&(f=f.split(",")[0])),_=f in Ae)if(m||((g=t._gsap).renderTransform||Ge(t),v=!1!==e.smoothOrigin&&g.smooth,(m=this._pt=new ee(this._pt,b,Le,0,1,g.renderTransform,g,0,-1)).dep=1),"scale"===f)this._pt=new ee(this._pt,g,"scaleY",g.scaleY,d?d*o:o-g.scaleY),T.push("scaleY",f),f+="X";else{if("transformOrigin"===f){s=td(s),g.svg?Bd(t,s,0,v,0,this):((c=parseFloat(s.split(" ")[2]))!==g.zOrigin&&nd(this,g,"zOrigin",g.zOrigin,c),nd(this,b,f,Qe(a),Qe(s)));continue}if("svgOrigin"===f){Bd(t,s,1,v,0,this);continue}if(f in Ze){Ld(this,g,f,u,s,d);continue}if("smoothOrigin"===f){nd(this,g,"smooth",g.smooth,s);continue}if("force3D"===f){g[f]=s;continue}if("transform"===f){Md(this,s,t);continue}}else f in b||(f=Ne(f)||f);if(_||(o||0===o)&&(u||0===u)&&!Be.test(s)&&f in b)(p=(a+"").substr((u+"").length))!==(c=(s+"").substr((o+"").length)||(f in U.units?U.units[f]:p))&&(u=pd(t,f,a,c)),this._pt=new ee(this._pt,_?g:b,f,u,d?d*o:o-u,"px"!==c||!1===e.autoRound||_?Qc:Tc),this._pt.u=c||0,p!==c&&(this._pt.b=a,this._pt.r=Sc);else if(f in b)rd.call(this,t,f,a,s);else{if(!(f in t)){L(f,s);continue}this.add(t,f,t[f],s,n,i)}T.push(f)}y&&te(this)},get:qd,aliases:Ie,getSetter:function getSetter(t,e,r){var n=Ie[e];return n&&n.indexOf(",")<0&&(e=n),e in Ae&&e!==qe&&(t._gsap.x||qd(t,"x"))?r&&le===r?"scale"===e?Zc:Yc:(le=r||{})&&("scale"===e?$c:_c):t.style&&!q(t.style[e])?Wc:~e.indexOf("-")?Xc:Gt(t,e)}};ne.utils.checkPrefix=Ne,nr=_((er="x,y,z,scale,scaleX,scaleY,xPercent,yPercent")+","+(rr="rotation,rotationX,rotationY,skewX,skewY")+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){Ae[t]=1}),_(rr,function(t){U.units[t]="deg",Ze[t]=1}),Ie[nr[13]]=er+","+rr,_("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");Ie[e[1]]=nr[e[0]]}),_("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){U.units[t]="px"}),ne.registerPlugin(ir);var ar=ne.registerPlugin(ir)||ne,sr=ar.core.Tween;e.Back=ke,e.Bounce=Me,e.CSSPlugin=ir,e.Circ=Se,e.Cubic=ye,e.Elastic=xe,e.Expo=Ce,e.Linear=ge,e.Power0=pe,e.Power1=ce,e.Power2=de,e.Power3=_e,e.Power4=me,e.Quad=ve,e.Quart=Te,e.Quint=be,e.Sine=Pe,e.SteppedEase=Oe,e.Strong=we,e.TimelineLite=Bt,e.TimelineMax=Bt,e.TweenLite=Vt,e.TweenMax=sr,e.default=ar,e.gsap=ar;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});
//# sourceMappingURL=gsap.min.js.map

/*!
 * ScrollToPlugin 3.2.0
 * https://greensock.com
 * 
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(t){"use strict";function k(){return"undefined"!=typeof window}function l(){return e||k()&&(e=window.gsap)&&e.registerPlugin&&e}function m(t){return"string"==typeof t}function n(t,e){var o="x"===e?"Width":"Height",n="scroll"+o,r="client"+o;return t===x||t===s||t===f?Math.max(s[n],f[n])-(x["inner"+o]||s[r]||f[r]):t[n]-t["offset"+o]}function o(t,e){var o="scroll"+("x"===e?"Left":"Top");return t===x&&(null!=t.pageXOffset?o="page"+e.toUpperCase()+"Offset":t=null!=s[o]?s:f),function(){return t[o]}}function p(t,e){var n=a(t)[0].getBoundingClientRect(),r=!e||e===x||e===f,i=r?{top:s.clientTop-(x.pageYOffset||s.scrollTop||f.scrollTop||0),left:s.clientLeft-(x.pageXOffset||s.scrollLeft||f.scrollLeft||0)}:e.getBoundingClientRect(),l={x:n.left-i.left,y:n.top-i.top};return!r&&e&&(l.x+=o(e,"x")(),l.y+=o(e,"y")()),l}function q(t,e,o,r){return isNaN(t)?m(t)&&"="===t.charAt(1)?parseFloat(t.substr(2))*("-"===t.charAt(0)?-1:1)+r:"max"===t?n(e,o):Math.min(n(e,o),p(t,e)[o]):parseFloat(t)}function r(){e=l(),k()&&e&&document.body&&(x=window,f=document.body,s=document.documentElement,a=e.utils.toArray,e.config({autoKillThreshold:7}),g=e.config(),u=1)}var e,u,x,s,f,a,g,i={version:"3.2.0",name:"scrollTo",rawVars:1,register:function register(t){e=t,r()},init:function init(t,e,n,i,l){u||r();var s=this;s.isWin=t===x,s.target=t,s.tween=n,"object"!=typeof e?m((e={y:e}).y)&&"max"!==e.y&&"="!==e.y.charAt(1)&&(e.x=e.y):e.nodeType&&(e={y:e,x:e}),s.vars=e,s.autoKill=!!e.autoKill,s.getX=o(t,"x"),s.getY=o(t,"y"),s.x=s.xPrev=s.getX(),s.y=s.yPrev=s.getY(),null!=e.x?(s.add(s,"x",s.x,q(e.x,t,"x",s.x)-(e.offsetX||0),i,l,Math.round),s._props.push("scrollTo_x")):s.skipX=1,null!=e.y?(s.add(s,"y",s.y,q(e.y,t,"y",s.y)-(e.offsetY||0),i,l,Math.round),s._props.push("scrollTo_y")):s.skipY=1},render:function render(t,e){for(var o,r,i,l,s,u=e._pt,f=e.target,p=e.tween,a=e.autoKill,c=e.xPrev,y=e.yPrev,d=e.isWin;u;)u.r(t,u.d),u=u._next;o=d||!e.skipX?e.getX():c,i=(r=d||!e.skipY?e.getY():y)-y,l=o-c,s=g.autoKillThreshold,e.x<0&&(e.x=0),e.y<0&&(e.y=0),a&&(!e.skipX&&(s<l||l<-s)&&o<n(f,"x")&&(e.skipX=1),!e.skipY&&(s<i||i<-s)&&r<n(f,"y")&&(e.skipY=1),e.skipX&&e.skipY&&(p.kill(),e.vars.onAutoKill&&e.vars.onAutoKill.apply(p,e.vars.onAutoKillParams||[]))),d?x.scrollTo(e.skipX?o:e.x,e.skipY?r:e.y):(e.skipY||(f.scrollTop=e.y),e.skipX||(f.scrollLeft=e.x)),e.xPrev=e.x,e.yPrev=e.y},kill:function kill(t){var e="scrollTo"===t;!e&&"scrollTo_x"!==t||(this.skipX=1),!e&&"scrollTo_y"!==t||(this.skipY=1)}};i.max=n,i.getOffset=p,i.buildGetter=o,l()&&e.registerPlugin(i),t.ScrollToPlugin=i,t.default=i;if (typeof(window)==="undefined"||window!==t){Object.defineProperty(t,"__esModule",{value:!0})} else {delete t.default}});
//# sourceMappingURL=ScrollToPlugin.min.js.map

/*!
 * CustomEase 3.2.0
 * https://greensock.com
 * 
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).window=e.window||{})}(this,function(e){"use strict";function m(e){return~~(1e5*e+(e<0?-.5:.5))/1e5}var b=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,w=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,Y=Math.PI/180,k=Math.sin,B=Math.cos,F=Math.abs,J=Math.sqrt;function arcToSegment(e,t,n,s,a,r,i,o,h){if(e!==o||t!==h){n=F(n),s=F(s);var u=a%360*Y,f=B(u),c=k(u),l=Math.PI,g=2*l,m=(e-o)/2,x=(t-h)/2,d=f*m+c*x,p=-c*m+f*x,y=d*d,M=p*p,v=y/(n*n)+M/(s*s);1<v&&(n=J(v)*n,s=J(v)*s);var C=n*n,E=s*s,b=(C*E-C*M-E*y)/(C*M+E*y);b<0&&(b=0);var w=(r===i?-1:1)*J(b),P=n*p/s*w,S=-s*d/n*w,N=f*P-c*S+(e+o)/2,D=c*P+f*S+(t+h)/2,T=(d-P)/n,V=(p-S)/s,_=(-d-P)/n,q=(-p-S)/s,A=T*T+V*V,R=(V<0?-1:1)*Math.acos(T/J(A)),G=(T*q-V*_<0?-1:1)*Math.acos((T*_+V*q)/J(A*(_*_+q*q)));isNaN(G)&&(G=l),!i&&0<G?G-=g:i&&G<0&&(G+=g),R%=g,G%=g;var L,O=Math.ceil(F(G)/(g/4)),j=[],z=G/O,I=4/3*k(z/2)/(1+B(z/2)),H=f*n,Q=c*n,Z=c*-s,U=f*s;for(L=0;L<O;L++)d=B(a=R+L*z),p=k(a),T=B(a+=z),V=k(a),j.push(d-I*p,p+I*d,T+I*V,V-I*T,T,V);for(L=0;L<j.length;L+=2)d=j[L],p=j[L+1],j[L]=d*H+p*Z+N,j[L+1]=d*Q+p*U+D;return j[L-2]=o,j[L-1]=h,j}}function stringToRawPath(e){function db(e,t,n,s){f=(n-e)/3,c=(s-t)/3,o.push(e+f,t+c,n-f,s-c,n,s)}var t,n,s,a,r,i,o,h,u,f,c,l,g,m,x,d=(e+"").replace(w,function(e){var t=+e;return t<1e-4&&-1e-4<t?0:t}).match(b)||[],p=[],y=0,M=0,v=d.length,C=0,E="ERROR: malformed path: "+e;if(!e||!isNaN(d[0])||isNaN(d[1]))return console.log(E),p;for(t=0;t<v;t++)if(g=r,isNaN(d[t])?i=(r=d[t].toUpperCase())!==d[t]:t--,s=+d[t+1],a=+d[t+2],i&&(s+=y,a+=M),t||(h=s,u=a),"M"===r)o&&(o.length<8?--p.length:C+=o.length),y=h=s,M=u=a,o=[s,a],p.push(o),t+=2,r="L";else if("C"===r)i||(y=M=0),(o=o||[0,0]).push(s,a,y+1*d[t+3],M+1*d[t+4],y+=1*d[t+5],M+=1*d[t+6]),t+=6;else if("S"===r)f=y,c=M,"C"!==g&&"S"!==g||(f+=y-o[o.length-4],c+=M-o[o.length-3]),i||(y=M=0),o.push(f,c,s,a,y+=1*d[t+3],M+=1*d[t+4]),t+=4;else if("Q"===r)f=y+2/3*(s-y),c=M+2/3*(a-M),i||(y=M=0),y+=1*d[t+3],M+=1*d[t+4],o.push(f,c,y+2/3*(s-y),M+2/3*(a-M),y,M),t+=4;else if("T"===r)f=y-o[o.length-4],c=M-o[o.length-3],o.push(y+f,M+c,s+2/3*(y+1.5*f-s),a+2/3*(M+1.5*c-a),y=s,M=a),t+=2;else if("H"===r)db(y,M,y=s,M),t+=1;else if("V"===r)db(y,M,y,M=s+(i?M-y:0)),t+=1;else if("L"===r||"Z"===r)"Z"===r&&(s=h,a=u,o.closed=!0),("L"===r||.5<F(y-s)||.5<F(M-a))&&(db(y,M,s,a),"L"===r&&(t+=2)),y=s,M=a;else if("A"===r){if(m=d[t+4],x=d[t+5],f=d[t+6],c=d[t+7],n=7,1<m.length&&(m.length<3?(c=f,f=x,n--):(c=x,f=m.substr(2),n-=2),x=m.charAt(1),m=m.charAt(0)),l=arcToSegment(y,M,+d[t+1],+d[t+2],+d[t+3],+m,+x,(i?y:0)+1*f,(i?M:0)+1*c),t+=n,l)for(n=0;n<l.length;n++)o.push(l[n]);y=o[o.length-2],M=o[o.length-1]}else console.log(E);return(t=o.length)<6?(p.pop(),t=0):o[0]===o[t-2]&&o[1]===o[t-1]&&(o.closed=!0),p.totalPoints=C+t,p}function p(){return M||"undefined"!=typeof window&&(M=window.gsap)&&M.registerPlugin&&M}function q(){(M=p())?(M.registerEase("_CE",n.create),a=1):console.warn("Please gsap.registerPlugin(CustomEase)")}function s(e){return~~(1e3*e+(e<0?-.5:.5))/1e3}function x(e,t,n,s,a,r,i,o,h,u,f){var c,l=(e+n)/2,g=(t+s)/2,m=(n+a)/2,d=(s+r)/2,p=(a+i)/2,y=(r+o)/2,M=(l+m)/2,v=(g+d)/2,C=(m+p)/2,E=(d+y)/2,b=(M+C)/2,w=(v+E)/2,P=i-e,S=o-t,N=Math.abs((n-i)*S-(s-o)*P),D=Math.abs((a-i)*S-(r-o)*P);return u||(u=[{x:e,y:t},{x:i,y:o}],f=1),u.splice(f||u.length-1,0,{x:b,y:w}),h*(P*P+S*S)<(N+D)*(N+D)&&(c=u.length,x(e,t,l,g,M,v,b,w,h,u,f),x(b,w,C,E,p,y,i,o,h,u,f+1+(u.length-c))),u}var M,a,t,y=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,v=/[cLlsSaAhHvVtTqQ]/g,n=((t=CustomEase.prototype).setData=function setData(e,t){t=t||{};var n,s,a,r,i,o,h,u,f,c=(e=e||"0,0,1,1").match(y),l=1,g=[],m=[],d=t.precision||1,p=d<=1;if(this.data=e,(v.test(e)||~e.indexOf("M")&&e.indexOf("C")<0)&&(c=stringToRawPath(e)[0]),4===(n=c.length))c.unshift(0,0),c.push(1,1),n=8;else if((n-2)%6)throw"Invalid CustomEase";for(0==+c[0]&&1==+c[n-2]||function _normalize(e,t,n){n||0===n||(n=Math.max(+e[e.length-1],+e[1]));var s,a=-1*e[0],r=-n,i=e.length,o=1/(+e[i-2]+a),h=-t||(Math.abs(e[i-1]-e[1])<.01*(e[i-2]-e[0])?function _findMinimum(e){var t,n=e.length,s=1e20;for(t=1;t<n;t+=6)+e[t]<s&&(s=+e[t]);return s}(e)+r:+e[i-1]+r);for(h=h?1/h:-o,s=0;s<i;s+=2)e[s]=(+e[s]+a)*o,e[s+1]=(+e[s+1]+r)*h}(c,t.height,t.originY),this.segment=c,r=2;r<n;r+=6)s={x:+c[r-2],y:+c[r-1]},a={x:+c[r+4],y:+c[r+5]},g.push(s,a),x(s.x,s.y,+c[r],+c[r+1],+c[r+2],+c[r+3],a.x,a.y,1/(2e5*d),g,g.length-1);for(n=g.length,r=0;r<n;r++)h=g[r],u=g[r-1]||h,h.x>u.x||u.y!==h.y&&u.x===h.x||h===u?(u.cx=h.x-u.x,u.cy=h.y-u.y,u.n=h,u.nx=h.x,p&&1<r&&2<Math.abs(u.cy/u.cx-g[r-2].cy/g[r-2].cx)&&(p=0),u.cx<l&&(u.cx?l=u.cx:(u.cx=.001,r===n-1&&(u.x-=.001,l=Math.min(l,.001),p=0)))):(g.splice(r--,1),n--);if(i=1/(n=1/l+1|0),h=g[o=0],p){for(r=0;r<n;r++)f=r*i,h.nx<f&&(h=g[++o]),s=h.y+(f-h.x)/h.cx*h.cy,m[r]={x:f,cx:i,y:s,cy:0,nx:9},r&&(m[r-1].cy=s-m[r-1].y);m[n-1].cy=g[g.length-1].y-s}else{for(r=0;r<n;r++)h.nx<r*i&&(h=g[++o]),m[r]=h;o<g.length-1&&(m[r-1]=g[g.length-2])}return this.ease=function(e){var t=m[e*n|0]||m[n-1];return t.nx<e&&(t=t.n),t.y+(e-t.x)/t.cx*t.cy},(this.ease.custom=this).id&&M.registerEase(this.id,this.ease),this},t.getSVGData=function getSVGData(e){return CustomEase.getSVGData(this,e)},CustomEase.create=function create(e,t,n){return new CustomEase(e,t,n).ease},CustomEase.register=function register(e){M=e,q()},CustomEase.get=function get(e){return M.parseEase(e)},CustomEase.getSVGData=function getSVGData(e,t){var n,a,r,i,o,h,u,f,c,l,g=(t=t||{}).width||100,x=t.height||100,d=t.x||0,p=(t.y||0)+x,y=M.utils.toArray(t.path)[0];if(t.invert&&(x=-x,p=0),"string"==typeof e&&(e=M.parseEase(e)),e.custom&&(e=e.custom),e instanceof CustomEase)n=function rawPathToString(e){!function _isNumber(e){return"number"==typeof e}(e[0])||(e=[e]);var t,n,s,a,r="",i=e.length;for(n=0;n<i;n++){for(a=e[n],r+="M"+m(a[0])+","+m(a[1])+" C",t=a.length,s=2;s<t;s++)r+=m(a[s++])+","+m(a[s++])+" "+m(a[s++])+","+m(a[s++])+" "+m(a[s++])+","+m(a[s])+" ";a.closed&&(r+="z")}return r}(function transformRawPath(e,t,n,s,a,r,i){for(var o,h,u,f,c,l=e.length;-1<--l;)for(h=(o=e[l]).length,u=0;u<h;u+=2)f=o[u],c=o[u+1],o[u]=f*t+c*s+r,o[u+1]=f*n+c*a+i;return e._dirty=1,e}([e.segment],g,0,0,-x,d,p));else{for(n=[d,p],i=1/(u=Math.max(5,200*(t.precision||1))),f=5/(u+=2),c=s(d+i*g),a=((l=s(p+e(i)*-x))-p)/(c-d),r=2;r<u;r++)o=s(d+r*i*g),h=s(p+e(r*i)*-x),(Math.abs((h-l)/(o-c)-a)>f||r===u-1)&&(n.push(c,l),a=(h-l)/(o-c)),c=o,l=h;n="M"+n.join(",")}return y&&y.setAttribute("d",n),n},CustomEase);function CustomEase(e,t,n){a||q(),this.id=e,this.setData(t,n)}p()&&M.registerPlugin(n),n.version="3.2.0",e.CustomEase=n,e.default=n;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});
//# sourceMappingURL=CustomEase.min.js.map

/*! ScrollMagic v2.0.7 | (c) 2019 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.ScrollMagic=t()}(this,function(){"use strict";var _=function(){};_.version="2.0.7",window.addEventListener("mousewheel",function(){});var P="data-scrollmagic-pin-spacer";_.Controller=function(e){var n,r,i="REVERSE",t="PAUSED",o=z.defaults,s=this,a=R.extend({},o,e),l=[],c=!1,f=0,u=t,d=!0,h=0,p=!0,g=function(){0<a.refreshInterval&&(r=window.setTimeout(E,a.refreshInterval))},v=function(){return a.vertical?R.get.scrollTop(a.container):R.get.scrollLeft(a.container)},m=function(){return a.vertical?R.get.height(a.container):R.get.width(a.container)},w=this._setScrollPos=function(e){a.vertical?d?window.scrollTo(R.get.scrollLeft(),e):a.container.scrollTop=e:d?window.scrollTo(e,R.get.scrollTop()):a.container.scrollLeft=e},y=function(){if(p&&c){var e=R.type.Array(c)?c:l.slice(0);c=!1;var t=f,n=(f=s.scrollPos())-t;0!==n&&(u=0<n?"FORWARD":i),u===i&&e.reverse(),e.forEach(function(e,t){e.update(!0)})}},S=function(){n=R.rAF(y)},b=function(e){"resize"==e.type&&(h=m(),u=t),!0!==c&&(c=!0,S())},E=function(){if(!d&&h!=m()){var t;try{t=new Event("resize",{bubbles:!1,cancelable:!1})}catch(e){(t=document.createEvent("Event")).initEvent("resize",!1,!1)}a.container.dispatchEvent(t)}l.forEach(function(e,t){e.refresh()}),g()};this._options=a;var x=function(e){if(e.length<=1)return e;var t=e.slice(0);return t.sort(function(e,t){return e.scrollOffset()>t.scrollOffset()?1:-1}),t};return this.addScene=function(e){if(R.type.Array(e))e.forEach(function(e,t){s.addScene(e)});else if(e instanceof _.Scene)if(e.controller()!==s)e.addTo(s);else if(l.indexOf(e)<0)for(var t in l.push(e),l=x(l),e.on("shift.controller_sort",function(){l=x(l)}),a.globalSceneOptions)e[t]&&e[t].call(e,a.globalSceneOptions[t]);return s},this.removeScene=function(e){if(R.type.Array(e))e.forEach(function(e,t){s.removeScene(e)});else{var t=l.indexOf(e);-1<t&&(e.off("shift.controller_sort"),l.splice(t,1),e.remove())}return s},this.updateScene=function(e,n){return R.type.Array(e)?e.forEach(function(e,t){s.updateScene(e,n)}):n?e.update(!0):!0!==c&&e instanceof _.Scene&&(-1==(c=c||[]).indexOf(e)&&c.push(e),c=x(c),S()),s},this.update=function(e){return b({type:"resize"}),e&&y(),s},this.scrollTo=function(e,t){if(R.type.Number(e))w.call(a.container,e,t);else if(e instanceof _.Scene)e.controller()===s&&s.scrollTo(e.scrollOffset(),t);else if(R.type.Function(e))w=e;else{var n=R.get.elements(e)[0];if(n){for(;n.parentNode.hasAttribute(P);)n=n.parentNode;var r=a.vertical?"top":"left",i=R.get.offset(a.container),o=R.get.offset(n);d||(i[r]-=s.scrollPos()),s.scrollTo(o[r]-i[r],t)}}return s},this.scrollPos=function(e){return arguments.length?(R.type.Function(e)&&(v=e),s):v.call(s)},this.info=function(e){var t={size:h,vertical:a.vertical,scrollPos:f,scrollDirection:u,container:a.container,isDocument:d};return arguments.length?void 0!==t[e]?t[e]:void 0:t},this.loglevel=function(e){return s},this.enabled=function(e){return arguments.length?(p!=e&&(p=!!e,s.updateScene(l,!0)),s):p},this.destroy=function(e){window.clearTimeout(r);for(var t=l.length;t--;)l[t].destroy(e);return a.container.removeEventListener("resize",b),a.container.removeEventListener("scroll",b),R.cAF(n),null},function(){for(var e in a)o.hasOwnProperty(e)||delete a[e];if(a.container=R.get.elements(a.container)[0],!a.container)throw"ScrollMagic.Controller init failed.";(d=a.container===window||a.container===document.body||!document.body.contains(a.container))&&(a.container=window),h=m(),a.container.addEventListener("resize",b),a.container.addEventListener("scroll",b);var t=parseInt(a.refreshInterval,10);a.refreshInterval=R.type.Number(t)?t:o.refreshInterval,g()}(),s};var z={defaults:{container:window,vertical:!0,globalSceneOptions:{},loglevel:2,refreshInterval:100}};_.Controller.addOption=function(e,t){z.defaults[e]=t},_.Controller.extend=function(e){var t=this;_.Controller=function(){return t.apply(this,arguments),this.$super=R.extend({},this),e.apply(this,arguments)||this},R.extend(_.Controller,t),_.Controller.prototype=t.prototype,_.Controller.prototype.constructor=_.Controller},_.Scene=function(e){var n,l,c="BEFORE",f="DURING",u="AFTER",r=D.defaults,d=this,h=R.extend({},r,e),p=c,g=0,a={start:0,end:0},v=0,i=!0,s={};this.on=function(e,i){return R.type.Function(i)&&(e=e.trim().split(" ")).forEach(function(e){var t=e.split("."),n=t[0],r=t[1];"*"!=n&&(s[n]||(s[n]=[]),s[n].push({namespace:r||"",callback:i}))}),d},this.off=function(e,o){return e&&(e=e.trim().split(" ")).forEach(function(e,t){var n=e.split("."),r=n[0],i=n[1]||"";("*"===r?Object.keys(s):[r]).forEach(function(e){for(var t=s[e]||[],n=t.length;n--;){var r=t[n];!r||i!==r.namespace&&"*"!==i||o&&o!=r.callback||t.splice(n,1)}t.length||delete s[e]})}),d},this.trigger=function(e,n){if(e){var t=e.trim().split("."),r=t[0],i=t[1],o=s[r];o&&o.forEach(function(e,t){i&&i!==e.namespace||e.callback.call(d,new _.Event(r,e.namespace,d,n))})}return d},d.on("change.internal",function(e){"loglevel"!==e.what&&"tweenChanges"!==e.what&&("triggerElement"===e.what?y():"reverse"===e.what&&d.update())}).on("shift.internal",function(e){t(),d.update()}),this.addTo=function(e){return e instanceof _.Controller&&l!=e&&(l&&l.removeScene(d),l=e,E(),o(!0),y(!0),t(),l.info("container").addEventListener("resize",S),e.addScene(d),d.trigger("add",{controller:l}),d.update()),d},this.enabled=function(e){return arguments.length?(i!=e&&(i=!!e,d.update(!0)),d):i},this.remove=function(){if(l){l.info("container").removeEventListener("resize",S);var e=l;l=void 0,e.removeScene(d),d.trigger("remove")}return d},this.destroy=function(e){return d.trigger("destroy",{reset:e}),d.remove(),d.off("*.*"),null},this.update=function(e){if(l)if(e)if(l.enabled()&&i){var t,n=l.info("scrollPos");t=0<h.duration?(n-a.start)/(a.end-a.start):n>=a.start?1:0,d.trigger("update",{startPos:a.start,endPos:a.end,scrollPos:n}),d.progress(t)}else m&&p===f&&C(!0);else l.updateScene(d,!1);return d},this.refresh=function(){return o(),y(),d},this.progress=function(e){if(arguments.length){var t=!1,n=p,r=l?l.info("scrollDirection"):"PAUSED",i=h.reverse||g<=e;if(0===h.duration?(t=g!=e,p=0===(g=e<1&&i?0:1)?c:f):e<0&&p!==c&&i?(p=c,t=!(g=0)):0<=e&&e<1&&i?(g=e,p=f,t=!0):1<=e&&p!==u?(g=1,p=u,t=!0):p!==f||i||C(),t){var o={progress:g,state:p,scrollDirection:r},s=p!=n,a=function(e){d.trigger(e,o)};s&&n!==f&&(a("enter"),a(n===c?"start":"end")),a("progress"),s&&p!==f&&(a(p===c?"start":"end"),a("leave"))}return d}return g};var m,w,t=function(){a={start:v+h.offset},l&&h.triggerElement&&(a.start-=l.info("size")*h.triggerHook),a.end=a.start+h.duration},o=function(e){if(n){var t="duration";x(t,n.call(d))&&!e&&(d.trigger("change",{what:t,newval:h[t]}),d.trigger("shift",{reason:t}))}},y=function(e){var t=0,n=h.triggerElement;if(l&&(n||0<v)){if(n)if(n.parentNode){for(var r=l.info(),i=R.get.offset(r.container),o=r.vertical?"top":"left";n.parentNode.hasAttribute(P);)n=n.parentNode;var s=R.get.offset(n);r.isDocument||(i[o]-=l.scrollPos()),t=s[o]-i[o]}else d.triggerElement(void 0);var a=t!=v;v=t,a&&!e&&d.trigger("shift",{reason:"triggerElementPosition"})}},S=function(e){0<h.triggerHook&&d.trigger("shift",{reason:"containerResize"})},b=R.extend(D.validate,{duration:function(t){if(R.type.String(t)&&t.match(/^(\.|\d)*\d+%$/)){var e=parseFloat(t)/100;t=function(){return l?l.info("size")*e:0}}if(R.type.Function(t)){n=t;try{t=parseFloat(n.call(d))}catch(e){t=-1}}if(t=parseFloat(t),!R.type.Number(t)||t<0)throw n&&(n=void 0),0;return t}}),E=function(e){(e=arguments.length?[e]:Object.keys(b)).forEach(function(t,e){var n;if(b[t])try{n=b[t](h[t])}catch(e){n=r[t]}finally{h[t]=n}})},x=function(e,t){var n=!1,r=h[e];return h[e]!=t&&(h[e]=t,E(e),n=r!=h[e]),n},z=function(t){d[t]||(d[t]=function(e){return arguments.length?("duration"===t&&(n=void 0),x(t,e)&&(d.trigger("change",{what:t,newval:h[t]}),-1<D.shifts.indexOf(t)&&d.trigger("shift",{reason:t})),d):h[t]})};this.controller=function(){return l},this.state=function(){return p},this.scrollOffset=function(){return a.start},this.triggerPosition=function(){var e=h.offset;return l&&(h.triggerElement?e+=v:e+=l.info("size")*d.triggerHook()),e},d.on("shift.internal",function(e){var t="duration"===e.reason;(p===u&&t||p===f&&0===h.duration)&&C(),t&&F()}).on("progress.internal",function(e){C()}).on("add.internal",function(e){F()}).on("destroy.internal",function(e){d.removePin(e.reset)});var C=function(e){if(m&&l){var t=l.info(),n=w.spacer.firstChild;if(e||p!==f){var r={position:w.inFlow?"relative":"absolute",top:0,left:0},i=R.css(n,"position")!=r.position;w.pushFollowers?0<h.duration&&(p===u&&0===parseFloat(R.css(w.spacer,"padding-top"))?i=!0:p===c&&0===parseFloat(R.css(w.spacer,"padding-bottom"))&&(i=!0)):r[t.vertical?"top":"left"]=h.duration*g,R.css(n,r),i&&F()}else{"fixed"!=R.css(n,"position")&&(R.css(n,{position:"fixed"}),F());var o=R.get.offset(w.spacer,!0),s=h.reverse||0===h.duration?t.scrollPos-a.start:Math.round(g*h.duration*10)/10;o[t.vertical?"top":"left"]+=s,R.css(w.spacer.firstChild,{top:o.top,left:o.left})}}},F=function(){if(m&&l&&w.inFlow){var e=p===f,t=l.info("vertical"),n=w.spacer.firstChild,r=R.isMarginCollapseType(R.css(w.spacer,"display")),i={};w.relSize.width||w.relSize.autoFullWidth?e?R.css(m,{width:R.get.width(w.spacer)}):R.css(m,{width:"100%"}):(i["min-width"]=R.get.width(t?m:n,!0,!0),i.width=e?i["min-width"]:"auto"),w.relSize.height?e?R.css(m,{height:R.get.height(w.spacer)-(w.pushFollowers?h.duration:0)}):R.css(m,{height:"100%"}):(i["min-height"]=R.get.height(t?n:m,!0,!r),i.height=e?i["min-height"]:"auto"),w.pushFollowers&&(i["padding"+(t?"Top":"Left")]=h.duration*g,i["padding"+(t?"Bottom":"Right")]=h.duration*(1-g)),R.css(w.spacer,i)}},L=function(){l&&m&&p===f&&!l.info("isDocument")&&C()},T=function(){l&&m&&p===f&&((w.relSize.width||w.relSize.autoFullWidth)&&R.get.width(window)!=R.get.width(w.spacer.parentNode)||w.relSize.height&&R.get.height(window)!=R.get.height(w.spacer.parentNode))&&F()},A=function(e){l&&m&&p===f&&!l.info("isDocument")&&(e.preventDefault(),l._setScrollPos(l.info("scrollPos")-((e.wheelDelta||e[l.info("vertical")?"wheelDeltaY":"wheelDeltaX"])/3||30*-e.detail)))};this.setPin=function(e,t){if(t=R.extend({},{pushFollowers:!0,spacerClass:"scrollmagic-pin-spacer"},t),!(e=R.get.elements(e)[0]))return d;if("fixed"===R.css(e,"position"))return d;if(m){if(m===e)return d;d.removePin()}var n=(m=e).parentNode.style.display,r=["top","left","bottom","right","margin","marginLeft","marginRight","marginTop","marginBottom"];m.parentNode.style.display="none";var i="absolute"!=R.css(m,"position"),o=R.css(m,r.concat(["display"])),s=R.css(m,["width","height"]);m.parentNode.style.display=n,!i&&t.pushFollowers&&(t.pushFollowers=!1);var a=m.parentNode.insertBefore(document.createElement("div"),m),l=R.extend(o,{position:i?"relative":"absolute",boxSizing:"content-box",mozBoxSizing:"content-box",webkitBoxSizing:"content-box"});if(i||R.extend(l,R.css(m,["width","height"])),R.css(a,l),a.setAttribute(P,""),R.addClass(a,t.spacerClass),w={spacer:a,relSize:{width:"%"===s.width.slice(-1),height:"%"===s.height.slice(-1),autoFullWidth:"auto"===s.width&&i&&R.isMarginCollapseType(o.display)},pushFollowers:t.pushFollowers,inFlow:i},!m.___origStyle){m.___origStyle={};var c=m.style;r.concat(["width","height","position","boxSizing","mozBoxSizing","webkitBoxSizing"]).forEach(function(e){m.___origStyle[e]=c[e]||""})}return w.relSize.width&&R.css(a,{width:s.width}),w.relSize.height&&R.css(a,{height:s.height}),a.appendChild(m),R.css(m,{position:i?"relative":"absolute",margin:"auto",top:"auto",left:"auto",bottom:"auto",right:"auto"}),(w.relSize.width||w.relSize.autoFullWidth)&&R.css(m,{boxSizing:"border-box",mozBoxSizing:"border-box",webkitBoxSizing:"border-box"}),window.addEventListener("scroll",L),window.addEventListener("resize",L),window.addEventListener("resize",T),m.addEventListener("mousewheel",A),m.addEventListener("DOMMouseScroll",A),C(),d},this.removePin=function(e){if(m){if(p===f&&C(!0),e||!l){var t=w.spacer.firstChild;if(t.hasAttribute(P)){var n=w.spacer.style,r={};["margin","marginLeft","marginRight","marginTop","marginBottom"].forEach(function(e){r[e]=n[e]||""}),R.css(t,r)}w.spacer.parentNode.insertBefore(t,w.spacer),w.spacer.parentNode.removeChild(w.spacer),m.parentNode.hasAttribute(P)||(R.css(m,m.___origStyle),delete m.___origStyle)}window.removeEventListener("scroll",L),window.removeEventListener("resize",L),window.removeEventListener("resize",T),m.removeEventListener("mousewheel",A),m.removeEventListener("DOMMouseScroll",A),m=void 0}return d};var N,O=[];return d.on("destroy.internal",function(e){d.removeClassToggle(e.reset)}),this.setClassToggle=function(e,t){var n=R.get.elements(e);return 0!==n.length&&R.type.String(t)&&(0<O.length&&d.removeClassToggle(),N=t,O=n,d.on("enter.internal_class leave.internal_class",function(e){var n="enter"===e.type?R.addClass:R.removeClass;O.forEach(function(e,t){n(e,N)})})),d},this.removeClassToggle=function(e){return e&&O.forEach(function(e,t){R.removeClass(e,N)}),d.off("start.internal_class end.internal_class"),N=void 0,O=[],d},function(){for(var e in h)r.hasOwnProperty(e)||delete h[e];for(var t in r)z(t);E()}(),d};var D={defaults:{duration:0,offset:0,triggerElement:void 0,triggerHook:.5,reverse:!0,loglevel:2},validate:{offset:function(e){if(e=parseFloat(e),!R.type.Number(e))throw 0;return e},triggerElement:function(e){if(e=e||void 0){var t=R.get.elements(e)[0];if(!t||!t.parentNode)throw 0;e=t}return e},triggerHook:function(e){var t={onCenter:.5,onEnter:1,onLeave:0};if(R.type.Number(e))e=Math.max(0,Math.min(parseFloat(e),1));else{if(!(e in t))throw 0;e=t[e]}return e},reverse:function(e){return!!e}},shifts:["duration","offset","triggerHook"]};_.Scene.addOption=function(e,t,n,r){e in D.defaults||(D.defaults[e]=t,D.validate[e]=n,r&&D.shifts.push(e))},_.Scene.extend=function(e){var t=this;_.Scene=function(){return t.apply(this,arguments),this.$super=R.extend({},this),e.apply(this,arguments)||this},R.extend(_.Scene,t),_.Scene.prototype=t.prototype,_.Scene.prototype.constructor=_.Scene},_.Event=function(e,t,n,r){for(var i in r=r||{})this[i]=r[i];return this.type=e,this.target=this.currentTarget=n,this.namespace=t||"",this.timeStamp=this.timestamp=Date.now(),this};var R=_._util=function(s){var n,e={},a=function(e){return parseFloat(e)||0},l=function(e){return e.currentStyle?e.currentStyle:s.getComputedStyle(e)},r=function(e,t,n,r){if((t=t===document?s:t)===s)r=!1;else if(!u.DomElement(t))return 0;e=e.charAt(0).toUpperCase()+e.substr(1).toLowerCase();var i=(n?t["offset"+e]||t["outer"+e]:t["client"+e]||t["inner"+e])||0;if(n&&r){var o=l(t);i+="Height"===e?a(o.marginTop)+a(o.marginBottom):a(o.marginLeft)+a(o.marginRight)}return i},c=function(e){return e.replace(/^[^a-z]+([a-z])/g,"$1").replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})};e.extend=function(e){for(e=e||{},n=1;n<arguments.length;n++)if(arguments[n])for(var t in arguments[n])arguments[n].hasOwnProperty(t)&&(e[t]=arguments[n][t]);return e},e.isMarginCollapseType=function(e){return-1<["block","flex","list-item","table","-webkit-box"].indexOf(e)};var i=0,t=["ms","moz","webkit","o"],o=s.requestAnimationFrame,f=s.cancelAnimationFrame;for(n=0;!o&&n<4;++n)o=s[t[n]+"RequestAnimationFrame"],f=s[t[n]+"CancelAnimationFrame"]||s[t[n]+"CancelRequestAnimationFrame"];o||(o=function(e){var t=(new Date).getTime(),n=Math.max(0,16-(t-i)),r=s.setTimeout(function(){e(t+n)},n);return i=t+n,r}),f||(f=function(e){s.clearTimeout(e)}),e.rAF=o.bind(s),e.cAF=f.bind(s);var u=e.type=function(e){return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1").toLowerCase()};u.String=function(e){return"string"===u(e)},u.Function=function(e){return"function"===u(e)},u.Array=function(e){return Array.isArray(e)},u.Number=function(e){return!u.Array(e)&&0<=e-parseFloat(e)+1},u.DomElement=function(e){return"object"==typeof HTMLElement||"function"==typeof HTMLElement?e instanceof HTMLElement||e instanceof SVGElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName};var d=e.get={};return d.elements=function(e){var t=[];if(u.String(e))try{e=document.querySelectorAll(e)}catch(e){return t}if("nodelist"===u(e)||u.Array(e)||e instanceof NodeList)for(var n=0,r=t.length=e.length;n<r;n++){var i=e[n];t[n]=u.DomElement(i)?i:d.elements(i)}else(u.DomElement(e)||e===document||e===s)&&(t=[e]);return t},d.scrollTop=function(e){return e&&"number"==typeof e.scrollTop?e.scrollTop:s.pageYOffset||0},d.scrollLeft=function(e){return e&&"number"==typeof e.scrollLeft?e.scrollLeft:s.pageXOffset||0},d.width=function(e,t,n){return r("width",e,t,n)},d.height=function(e,t,n){return r("height",e,t,n)},d.offset=function(e,t){var n={top:0,left:0};if(e&&e.getBoundingClientRect){var r=e.getBoundingClientRect();n.top=r.top,n.left=r.left,t||(n.top+=d.scrollTop(),n.left+=d.scrollLeft())}return n},e.addClass=function(e,t){t&&(e.classList?e.classList.add(t):e.className+=" "+t)},e.removeClass=function(e,t){t&&(e.classList?e.classList.remove(t):e.className=e.className.replace(RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," "))},e.css=function(e,t){if(u.String(t))return l(e)[c(t)];if(u.Array(t)){var n={},r=l(e);return t.forEach(function(e,t){n[e]=r[c(e)]}),n}for(var i in t){var o=t[i];o==parseFloat(o)&&(o+="px"),e.style[c(i)]=o}},e}(window||{});return _});
/*! ScrollMagic v2.0.7 | (c) 2019 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!function(e,n){"function"==typeof define&&define.amd?define(["ScrollMagic","TweenMax","TimelineMax"],n):"object"==typeof exports?(require("gsap"),n(require("scrollmagic"),TweenMax,TimelineMax)):n(e.ScrollMagic||e.jQuery&&e.jQuery.ScrollMagic,e.TweenMax||e.TweenLite,e.TimelineMax||e.TimelineLite)}(this,function(e,s,u){"use strict";e.Scene.addOption("tweenChanges",!1,function(e){return!!e}),e.Scene.extend(function(){var i,o=this;o.on("progress.plugin_gsap",function(){a()}),o.on("destroy.plugin_gsap",function(e){o.removeTween(e.reset)});var a=function(){if(i){var e=o.progress(),n=o.state();i.repeat&&-1===i.repeat()?"DURING"===n&&i.paused()?i.play():"DURING"===n||i.paused()||i.pause():e!=i.progress()&&(0===o.duration()?0<e?i.play():i.reverse():o.tweenChanges()&&i.tweenTo?i.tweenTo(e*i.duration()):i.progress(e).pause())}};o.setTween=function(e,n,r){var t;1<arguments.length&&(arguments.length<3&&(r=n,n=1),e=s.to(e,n,r));try{(t=u?new u({smoothChildTiming:!0}).add(e):e).pause()}catch(e){return o}return i&&o.removeTween(),i=t,e.repeat&&-1===e.repeat()&&(i.repeat(-1),i.yoyo(e.yoyo())),a(),o},o.removeTween=function(e){return i&&(e&&i.progress(0).pause(),i.kill(),i=void 0),o}})});
/*! PhotoSwipe - v4.1.3 - 2019-01-08
* http://photoswipe.com
* Copyright (c) 2019 Dmitry Semenov; */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipe=b()}(this,function(){"use strict";var a=function(a,b,c,d){var e={features:null,bind:function(a,b,c,d){var e=(d?"remove":"add")+"EventListener";b=b.split(" ");for(var f=0;f<b.length;f++)b[f]&&a[e](b[f],c,!1)},isArray:function(a){return a instanceof Array},createEl:function(a,b){var c=document.createElement(b||"div");return a&&(c.className=a),c},getScrollY:function(){var a=window.pageYOffset;return void 0!==a?a:document.documentElement.scrollTop},unbind:function(a,b,c){e.bind(a,b,c,!0)},removeClass:function(a,b){var c=new RegExp("(\\s|^)"+b+"(\\s|$)");a.className=a.className.replace(c," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")},addClass:function(a,b){e.hasClass(a,b)||(a.className+=(a.className?" ":"")+b)},hasClass:function(a,b){return a.className&&new RegExp("(^|\\s)"+b+"(\\s|$)").test(a.className)},getChildByClass:function(a,b){for(var c=a.firstChild;c;){if(e.hasClass(c,b))return c;c=c.nextSibling}},arraySearch:function(a,b,c){for(var d=a.length;d--;)if(a[d][c]===b)return d;return-1},extend:function(a,b,c){for(var d in b)if(b.hasOwnProperty(d)){if(c&&a.hasOwnProperty(d))continue;a[d]=b[d]}},easing:{sine:{out:function(a){return Math.sin(a*(Math.PI/2))},inOut:function(a){return-(Math.cos(Math.PI*a)-1)/2}},cubic:{out:function(a){return--a*a*a+1}}},detectFeatures:function(){if(e.features)return e.features;var a=e.createEl(),b=a.style,c="",d={};if(d.oldIE=document.all&&!document.addEventListener,d.touch="ontouchstart"in window,window.requestAnimationFrame&&(d.raf=window.requestAnimationFrame,d.caf=window.cancelAnimationFrame),d.pointerEvent=!!window.PointerEvent||navigator.msPointerEnabled,!d.pointerEvent){var f=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var g=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);g&&g.length>0&&(g=parseInt(g[1],10),g>=1&&g<8&&(d.isOldIOSPhone=!0))}var h=f.match(/Android\s([0-9\.]*)/),i=h?h[1]:0;i=parseFloat(i),i>=1&&(i<4.4&&(d.isOldAndroid=!0),d.androidVersion=i),d.isMobileOpera=/opera mini|opera mobi/i.test(f)}for(var j,k,l=["transform","perspective","animationName"],m=["","webkit","Moz","ms","O"],n=0;n<4;n++){c=m[n];for(var o=0;o<3;o++)j=l[o],k=c+(c?j.charAt(0).toUpperCase()+j.slice(1):j),!d[j]&&k in b&&(d[j]=k);c&&!d.raf&&(c=c.toLowerCase(),d.raf=window[c+"RequestAnimationFrame"],d.raf&&(d.caf=window[c+"CancelAnimationFrame"]||window[c+"CancelRequestAnimationFrame"]))}if(!d.raf){var p=0;d.raf=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-p)),d=window.setTimeout(function(){a(b+c)},c);return p=b+c,d},d.caf=function(a){clearTimeout(a)}}return d.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,e.features=d,d}};e.detectFeatures(),e.features.oldIE&&(e.bind=function(a,b,c,d){b=b.split(" ");for(var e,f=(d?"detach":"attach")+"Event",g=function(){c.handleEvent.call(c)},h=0;h<b.length;h++)if(e=b[h])if("object"==typeof c&&c.handleEvent){if(d){if(!c["oldIE"+e])return!1}else c["oldIE"+e]=g;a[f]("on"+e,c["oldIE"+e])}else a[f]("on"+e,c)});var f=this,g=25,h=3,i={allowPanToNext:!0,spacing:.12,bgOpacity:1,mouseUsed:!1,loop:!0,pinchToClose:!0,closeOnScroll:!0,closeOnVerticalDrag:!0,verticalDragRange:.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:!1,focus:!0,escKey:!0,arrowKeys:!0,mainScrollEndFriction:.35,panEndFriction:.35,isClickableElement:function(a){return"A"===a.tagName},getDoubleTapZoom:function(a,b){return a?1:b.initialZoomLevel<.7?1:1.33},maxSpreadZoom:1.33,modal:!0,scaleMode:"fit"};e.extend(i,d);var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la,ma=function(){return{x:0,y:0}},na=ma(),oa=ma(),pa=ma(),qa={},ra=0,sa={},ta=ma(),ua=0,va=!0,wa=[],xa={},ya=!1,za=function(a,b){e.extend(f,b.publicMethods),wa.push(a)},Aa=function(a){var b=ac();return a>b-1?a-b:a<0?b+a:a},Ba={},Ca=function(a,b){return Ba[a]||(Ba[a]=[]),Ba[a].push(b)},Da=function(a){var b=Ba[a];if(b){var c=Array.prototype.slice.call(arguments);c.shift();for(var d=0;d<b.length;d++)b[d].apply(f,c)}},Ea=function(){return(new Date).getTime()},Fa=function(a){ja=a,f.bg.style.opacity=a*i.bgOpacity},Ga=function(a,b,c,d,e){(!ya||e&&e!==f.currItem)&&(d/=e?e.fitRatio:f.currItem.fitRatio),a[E]=u+b+"px, "+c+"px"+v+" scale("+d+")"},Ha=function(a){ea&&(a&&(s>f.currItem.fitRatio?ya||(mc(f.currItem,!1,!0),ya=!0):ya&&(mc(f.currItem),ya=!1)),Ga(ea,pa.x,pa.y,s))},Ia=function(a){a.container&&Ga(a.container.style,a.initialPosition.x,a.initialPosition.y,a.initialZoomLevel,a)},Ja=function(a,b){b[E]=u+a+"px, 0px"+v},Ka=function(a,b){if(!i.loop&&b){var c=m+(ta.x*ra-a)/ta.x,d=Math.round(a-tb.x);(c<0&&d>0||c>=ac()-1&&d<0)&&(a=tb.x+d*i.mainScrollEndFriction)}tb.x=a,Ja(a,n)},La=function(a,b){var c=ub[a]-sa[a];return oa[a]+na[a]+c-c*(b/t)},Ma=function(a,b){a.x=b.x,a.y=b.y,b.id&&(a.id=b.id)},Na=function(a){a.x=Math.round(a.x),a.y=Math.round(a.y)},Oa=null,Pa=function(){Oa&&(e.unbind(document,"mousemove",Pa),e.addClass(a,"pswp--has_mouse"),i.mouseUsed=!0,Da("mouseUsed")),Oa=setTimeout(function(){Oa=null},100)},Qa=function(){e.bind(document,"keydown",f),N.transform&&e.bind(f.scrollWrap,"click",f),i.mouseUsed||e.bind(document,"mousemove",Pa),e.bind(window,"resize scroll orientationchange",f),Da("bindEvents")},Ra=function(){e.unbind(window,"resize scroll orientationchange",f),e.unbind(window,"scroll",r.scroll),e.unbind(document,"keydown",f),e.unbind(document,"mousemove",Pa),N.transform&&e.unbind(f.scrollWrap,"click",f),V&&e.unbind(window,p,f),clearTimeout(O),Da("unbindEvents")},Sa=function(a,b){var c=ic(f.currItem,qa,a);return b&&(da=c),c},Ta=function(a){return a||(a=f.currItem),a.initialZoomLevel},Ua=function(a){return a||(a=f.currItem),a.w>0?i.maxSpreadZoom:1},Va=function(a,b,c,d){return d===f.currItem.initialZoomLevel?(c[a]=f.currItem.initialPosition[a],!0):(c[a]=La(a,d),c[a]>b.min[a]?(c[a]=b.min[a],!0):c[a]<b.max[a]&&(c[a]=b.max[a],!0))},Wa=function(){if(E){var b=N.perspective&&!G;return u="translate"+(b?"3d(":"("),void(v=N.perspective?", 0px)":")")}E="left",e.addClass(a,"pswp--ie"),Ja=function(a,b){b.left=a+"px"},Ia=function(a){var b=a.fitRatio>1?1:a.fitRatio,c=a.container.style,d=b*a.w,e=b*a.h;c.width=d+"px",c.height=e+"px",c.left=a.initialPosition.x+"px",c.top=a.initialPosition.y+"px"},Ha=function(){if(ea){var a=ea,b=f.currItem,c=b.fitRatio>1?1:b.fitRatio,d=c*b.w,e=c*b.h;a.width=d+"px",a.height=e+"px",a.left=pa.x+"px",a.top=pa.y+"px"}}},Xa=function(a){var b="";i.escKey&&27===a.keyCode?b="close":i.arrowKeys&&(37===a.keyCode?b="prev":39===a.keyCode&&(b="next")),b&&(a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||(a.preventDefault?a.preventDefault():a.returnValue=!1,f[b]()))},Ya=function(a){a&&(Y||X||fa||T)&&(a.preventDefault(),a.stopPropagation())},Za=function(){f.setScrollOffset(0,e.getScrollY())},$a={},_a=0,ab=function(a){$a[a]&&($a[a].raf&&I($a[a].raf),_a--,delete $a[a])},bb=function(a){$a[a]&&ab(a),$a[a]||(_a++,$a[a]={})},cb=function(){for(var a in $a)$a.hasOwnProperty(a)&&ab(a)},db=function(a,b,c,d,e,f,g){var h,i=Ea();bb(a);var j=function(){if($a[a]){if(h=Ea()-i,h>=d)return ab(a),f(c),void(g&&g());f((c-b)*e(h/d)+b),$a[a].raf=H(j)}};j()},eb={shout:Da,listen:Ca,viewportSize:qa,options:i,isMainScrollAnimating:function(){return fa},getZoomLevel:function(){return s},getCurrentIndex:function(){return m},isDragging:function(){return V},isZooming:function(){return aa},setScrollOffset:function(a,b){sa.x=a,M=sa.y=b,Da("updateScrollOffset",sa)},applyZoomPan:function(a,b,c,d){pa.x=b,pa.y=c,s=a,Ha(d)},init:function(){if(!j&&!k){var c;f.framework=e,f.template=a,f.bg=e.getChildByClass(a,"pswp__bg"),J=a.className,j=!0,N=e.detectFeatures(),H=N.raf,I=N.caf,E=N.transform,L=N.oldIE,f.scrollWrap=e.getChildByClass(a,"pswp__scroll-wrap"),f.container=e.getChildByClass(f.scrollWrap,"pswp__container"),n=f.container.style,f.itemHolders=y=[{el:f.container.children[0],wrap:0,index:-1},{el:f.container.children[1],wrap:0,index:-1},{el:f.container.children[2],wrap:0,index:-1}],y[0].el.style.display=y[2].el.style.display="none",Wa(),r={resize:f.updateSize,orientationchange:function(){clearTimeout(O),O=setTimeout(function(){qa.x!==f.scrollWrap.clientWidth&&f.updateSize()},500)},scroll:Za,keydown:Xa,click:Ya};var d=N.isOldIOSPhone||N.isOldAndroid||N.isMobileOpera;for(N.animationName&&N.transform&&!d||(i.showAnimationDuration=i.hideAnimationDuration=0),c=0;c<wa.length;c++)f["init"+wa[c]]();if(b){var g=f.ui=new b(f,e);g.init()}Da("firstUpdate"),m=m||i.index||0,(isNaN(m)||m<0||m>=ac())&&(m=0),f.currItem=_b(m),(N.isOldIOSPhone||N.isOldAndroid)&&(va=!1),a.setAttribute("aria-hidden","false"),i.modal&&(va?a.style.position="fixed":(a.style.position="absolute",a.style.top=e.getScrollY()+"px")),void 0===M&&(Da("initialLayout"),M=K=e.getScrollY());var l="pswp--open ";for(i.mainClass&&(l+=i.mainClass+" "),i.showHideOpacity&&(l+="pswp--animate_opacity "),l+=G?"pswp--touch":"pswp--notouch",l+=N.animationName?" pswp--css_animation":"",l+=N.svg?" pswp--svg":"",e.addClass(a,l),f.updateSize(),o=-1,ua=null,c=0;c<h;c++)Ja((c+o)*ta.x,y[c].el.style);L||e.bind(f.scrollWrap,q,f),Ca("initialZoomInEnd",function(){f.setContent(y[0],m-1),f.setContent(y[2],m+1),y[0].el.style.display=y[2].el.style.display="block",i.focus&&a.focus(),Qa()}),f.setContent(y[1],m),f.updateCurrItem(),Da("afterInit"),va||(w=setInterval(function(){_a||V||aa||s!==f.currItem.initialZoomLevel||f.updateSize()},1e3)),e.addClass(a,"pswp--visible")}},close:function(){j&&(j=!1,k=!0,Da("close"),Ra(),cc(f.currItem,null,!0,f.destroy))},destroy:function(){Da("destroy"),Xb&&clearTimeout(Xb),a.setAttribute("aria-hidden","true"),a.className=J,w&&clearInterval(w),e.unbind(f.scrollWrap,q,f),e.unbind(window,"scroll",f),zb(),cb(),Ba=null},panTo:function(a,b,c){c||(a>da.min.x?a=da.min.x:a<da.max.x&&(a=da.max.x),b>da.min.y?b=da.min.y:b<da.max.y&&(b=da.max.y)),pa.x=a,pa.y=b,Ha()},handleEvent:function(a){a=a||window.event,r[a.type]&&r[a.type](a)},goTo:function(a){a=Aa(a);var b=a-m;ua=b,m=a,f.currItem=_b(m),ra-=b,Ka(ta.x*ra),cb(),fa=!1,f.updateCurrItem()},next:function(){f.goTo(m+1)},prev:function(){f.goTo(m-1)},updateCurrZoomItem:function(a){if(a&&Da("beforeChange",0),y[1].el.children.length){var b=y[1].el.children[0];ea=e.hasClass(b,"pswp__zoom-wrap")?b.style:null}else ea=null;da=f.currItem.bounds,t=s=f.currItem.initialZoomLevel,pa.x=da.center.x,pa.y=da.center.y,a&&Da("afterChange")},invalidateCurrItems:function(){x=!0;for(var a=0;a<h;a++)y[a].item&&(y[a].item.needsUpdate=!0)},updateCurrItem:function(a){if(0!==ua){var b,c=Math.abs(ua);if(!(a&&c<2)){f.currItem=_b(m),ya=!1,Da("beforeChange",ua),c>=h&&(o+=ua+(ua>0?-h:h),c=h);for(var d=0;d<c;d++)ua>0?(b=y.shift(),y[h-1]=b,o++,Ja((o+2)*ta.x,b.el.style),f.setContent(b,m-c+d+1+1)):(b=y.pop(),y.unshift(b),o--,Ja(o*ta.x,b.el.style),f.setContent(b,m+c-d-1-1));if(ea&&1===Math.abs(ua)){var e=_b(z);e.initialZoomLevel!==s&&(ic(e,qa),mc(e),Ia(e))}ua=0,f.updateCurrZoomItem(),z=m,Da("afterChange")}}},updateSize:function(b){if(!va&&i.modal){var c=e.getScrollY();if(M!==c&&(a.style.top=c+"px",M=c),!b&&xa.x===window.innerWidth&&xa.y===window.innerHeight)return;xa.x=window.innerWidth,xa.y=window.innerHeight,a.style.height=xa.y+"px"}if(qa.x=f.scrollWrap.clientWidth,qa.y=f.scrollWrap.clientHeight,Za(),ta.x=qa.x+Math.round(qa.x*i.spacing),ta.y=qa.y,Ka(ta.x*ra),Da("beforeResize"),void 0!==o){for(var d,g,j,k=0;k<h;k++)d=y[k],Ja((k+o)*ta.x,d.el.style),j=m+k-1,i.loop&&ac()>2&&(j=Aa(j)),g=_b(j),g&&(x||g.needsUpdate||!g.bounds)?(f.cleanSlide(g),f.setContent(d,j),1===k&&(f.currItem=g,f.updateCurrZoomItem(!0)),g.needsUpdate=!1):d.index===-1&&j>=0&&f.setContent(d,j),g&&g.container&&(ic(g,qa),mc(g),Ia(g));x=!1}t=s=f.currItem.initialZoomLevel,da=f.currItem.bounds,da&&(pa.x=da.center.x,pa.y=da.center.y,Ha(!0)),Da("resize")},zoomTo:function(a,b,c,d,f){b&&(t=s,ub.x=Math.abs(b.x)-pa.x,ub.y=Math.abs(b.y)-pa.y,Ma(oa,pa));var g=Sa(a,!1),h={};Va("x",g,h,a),Va("y",g,h,a);var i=s,j={x:pa.x,y:pa.y};Na(h);var k=function(b){1===b?(s=a,pa.x=h.x,pa.y=h.y):(s=(a-i)*b+i,pa.x=(h.x-j.x)*b+j.x,pa.y=(h.y-j.y)*b+j.y),f&&f(b),Ha(1===b)};c?db("customZoomTo",0,1,c,d||e.easing.sine.inOut,k):k(1)}},fb=30,gb=10,hb={},ib={},jb={},kb={},lb={},mb=[],nb={},ob=[],pb={},qb=0,rb=ma(),sb=0,tb=ma(),ub=ma(),vb=ma(),wb=function(a,b){return a.x===b.x&&a.y===b.y},xb=function(a,b){return Math.abs(a.x-b.x)<g&&Math.abs(a.y-b.y)<g},yb=function(a,b){return pb.x=Math.abs(a.x-b.x),pb.y=Math.abs(a.y-b.y),Math.sqrt(pb.x*pb.x+pb.y*pb.y)},zb=function(){Z&&(I(Z),Z=null)},Ab=function(){V&&(Z=H(Ab),Qb())},Bb=function(){return!("fit"===i.scaleMode&&s===f.currItem.initialZoomLevel)},Cb=function(a,b){return!(!a||a===document)&&(!(a.getAttribute("class")&&a.getAttribute("class").indexOf("pswp__scroll-wrap")>-1)&&(b(a)?a:Cb(a.parentNode,b)))},Db={},Eb=function(a,b){return Db.prevent=!Cb(a.target,i.isClickableElement),Da("preventDragEvent",a,b,Db),Db.prevent},Fb=function(a,b){return b.x=a.pageX,b.y=a.pageY,b.id=a.identifier,b},Gb=function(a,b,c){c.x=.5*(a.x+b.x),c.y=.5*(a.y+b.y)},Hb=function(a,b,c){if(a-Q>50){var d=ob.length>2?ob.shift():{};d.x=b,d.y=c,ob.push(d),Q=a}},Ib=function(){var a=pa.y-f.currItem.initialPosition.y;return 1-Math.abs(a/(qa.y/2))},Jb={},Kb={},Lb=[],Mb=function(a){for(;Lb.length>0;)Lb.pop();return F?(la=0,mb.forEach(function(a){0===la?Lb[0]=a:1===la&&(Lb[1]=a),la++})):a.type.indexOf("touch")>-1?a.touches&&a.touches.length>0&&(Lb[0]=Fb(a.touches[0],Jb),a.touches.length>1&&(Lb[1]=Fb(a.touches[1],Kb))):(Jb.x=a.pageX,Jb.y=a.pageY,Jb.id="",Lb[0]=Jb),Lb},Nb=function(a,b){var c,d,e,g,h=0,j=pa[a]+b[a],k=b[a]>0,l=tb.x+b.x,m=tb.x-nb.x;return c=j>da.min[a]||j<da.max[a]?i.panEndFriction:1,j=pa[a]+b[a]*c,!i.allowPanToNext&&s!==f.currItem.initialZoomLevel||(ea?"h"!==ga||"x"!==a||X||(k?(j>da.min[a]&&(c=i.panEndFriction,h=da.min[a]-j,d=da.min[a]-oa[a]),(d<=0||m<0)&&ac()>1?(g=l,m<0&&l>nb.x&&(g=nb.x)):da.min.x!==da.max.x&&(e=j)):(j<da.max[a]&&(c=i.panEndFriction,h=j-da.max[a],d=oa[a]-da.max[a]),(d<=0||m>0)&&ac()>1?(g=l,m>0&&l<nb.x&&(g=nb.x)):da.min.x!==da.max.x&&(e=j))):g=l,"x"!==a)?void(fa||$||s>f.currItem.fitRatio&&(pa[a]+=b[a]*c)):(void 0!==g&&(Ka(g,!0),$=g!==nb.x),da.min.x!==da.max.x&&(void 0!==e?pa.x=e:$||(pa.x+=b.x*c)),void 0!==g)},Ob=function(a){if(!("mousedown"===a.type&&a.button>0)){if($b)return void a.preventDefault();if(!U||"mousedown"!==a.type){if(Eb(a,!0)&&a.preventDefault(),Da("pointerDown"),F){var b=e.arraySearch(mb,a.pointerId,"id");b<0&&(b=mb.length),mb[b]={x:a.pageX,y:a.pageY,id:a.pointerId}}var c=Mb(a),d=c.length;_=null,cb(),V&&1!==d||(V=ha=!0,e.bind(window,p,f),S=ka=ia=T=$=Y=W=X=!1,ga=null,Da("firstTouchStart",c),Ma(oa,pa),na.x=na.y=0,Ma(kb,c[0]),Ma(lb,kb),nb.x=ta.x*ra,ob=[{x:kb.x,y:kb.y}],Q=P=Ea(),Sa(s,!0),zb(),Ab()),!aa&&d>1&&!fa&&!$&&(t=s,X=!1,aa=W=!0,na.y=na.x=0,Ma(oa,pa),Ma(hb,c[0]),Ma(ib,c[1]),Gb(hb,ib,vb),ub.x=Math.abs(vb.x)-pa.x,ub.y=Math.abs(vb.y)-pa.y,ba=ca=yb(hb,ib))}}},Pb=function(a){if(a.preventDefault(),F){var b=e.arraySearch(mb,a.pointerId,"id");if(b>-1){var c=mb[b];c.x=a.pageX,c.y=a.pageY}}if(V){var d=Mb(a);if(ga||Y||aa)_=d;else if(tb.x!==ta.x*ra)ga="h";else{var f=Math.abs(d[0].x-kb.x)-Math.abs(d[0].y-kb.y);Math.abs(f)>=gb&&(ga=f>0?"h":"v",_=d)}}},Qb=function(){if(_){var a=_.length;if(0!==a)if(Ma(hb,_[0]),jb.x=hb.x-kb.x,jb.y=hb.y-kb.y,aa&&a>1){if(kb.x=hb.x,kb.y=hb.y,!jb.x&&!jb.y&&wb(_[1],ib))return;Ma(ib,_[1]),X||(X=!0,Da("zoomGestureStarted"));var b=yb(hb,ib),c=Vb(b);c>f.currItem.initialZoomLevel+f.currItem.initialZoomLevel/15&&(ka=!0);var d=1,e=Ta(),g=Ua();if(c<e)if(i.pinchToClose&&!ka&&t<=f.currItem.initialZoomLevel){var h=e-c,j=1-h/(e/1.2);Fa(j),Da("onPinchClose",j),ia=!0}else d=(e-c)/e,d>1&&(d=1),c=e-d*(e/3);else c>g&&(d=(c-g)/(6*e),d>1&&(d=1),c=g+d*e);d<0&&(d=0),ba=b,Gb(hb,ib,rb),na.x+=rb.x-vb.x,na.y+=rb.y-vb.y,Ma(vb,rb),pa.x=La("x",c),pa.y=La("y",c),S=c>s,s=c,Ha()}else{if(!ga)return;if(ha&&(ha=!1,Math.abs(jb.x)>=gb&&(jb.x-=_[0].x-lb.x),Math.abs(jb.y)>=gb&&(jb.y-=_[0].y-lb.y)),kb.x=hb.x,kb.y=hb.y,0===jb.x&&0===jb.y)return;if("v"===ga&&i.closeOnVerticalDrag&&!Bb()){na.y+=jb.y,pa.y+=jb.y;var k=Ib();return T=!0,Da("onVerticalDrag",k),Fa(k),void Ha()}Hb(Ea(),hb.x,hb.y),Y=!0,da=f.currItem.bounds;var l=Nb("x",jb);l||(Nb("y",jb),Na(pa),Ha())}}},Rb=function(a){if(N.isOldAndroid){if(U&&"mouseup"===a.type)return;a.type.indexOf("touch")>-1&&(clearTimeout(U),U=setTimeout(function(){U=0},600))}Da("pointerUp"),Eb(a,!1)&&a.preventDefault();var b;if(F){var c=e.arraySearch(mb,a.pointerId,"id");if(c>-1)if(b=mb.splice(c,1)[0],navigator.msPointerEnabled){var d={4:"mouse",2:"touch",3:"pen"};b.type=d[a.pointerType],b.type||(b.type=a.pointerType||"mouse")}else b.type=a.pointerType||"mouse"}var g,h=Mb(a),j=h.length;if("mouseup"===a.type&&(j=0),2===j)return _=null,!0;1===j&&Ma(lb,h[0]),0!==j||ga||fa||(b||("mouseup"===a.type?b={x:a.pageX,y:a.pageY,type:"mouse"}:a.changedTouches&&a.changedTouches[0]&&(b={x:a.changedTouches[0].pageX,y:a.changedTouches[0].pageY,type:"touch"})),Da("touchRelease",a,b));var k=-1;if(0===j&&(V=!1,e.unbind(window,p,f),zb(),aa?k=0:sb!==-1&&(k=Ea()-sb)),sb=1===j?Ea():-1,g=k!==-1&&k<150?"zoom":"swipe",aa&&j<2&&(aa=!1,1===j&&(g="zoomPointerUp"),Da("zoomGestureEnded")),_=null,Y||X||fa||T)if(cb(),R||(R=Sb()),R.calculateSwipeSpeed("x"),T){var l=Ib();if(l<i.verticalDragRange)f.close();else{var m=pa.y,n=ja;db("verticalDrag",0,1,300,e.easing.cubic.out,function(a){pa.y=(f.currItem.initialPosition.y-m)*a+m,Fa((1-n)*a+n),Ha()}),Da("onVerticalDrag",1)}}else{if(($||fa)&&0===j){var o=Ub(g,R);if(o)return;g="zoomPointerUp"}if(!fa)return"swipe"!==g?void Wb():void(!$&&s>f.currItem.fitRatio&&Tb(R))}},Sb=function(){var a,b,c={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function(d){ob.length>1?(a=Ea()-Q+50,b=ob[ob.length-2][d]):(a=Ea()-P,b=lb[d]),c.lastFlickOffset[d]=kb[d]-b,c.lastFlickDist[d]=Math.abs(c.lastFlickOffset[d]),c.lastFlickDist[d]>20?c.lastFlickSpeed[d]=c.lastFlickOffset[d]/a:c.lastFlickSpeed[d]=0,Math.abs(c.lastFlickSpeed[d])<.1&&(c.lastFlickSpeed[d]=0),c.slowDownRatio[d]=.95,c.slowDownRatioReverse[d]=1-c.slowDownRatio[d],c.speedDecelerationRatio[d]=1},calculateOverBoundsAnimOffset:function(a,b){c.backAnimStarted[a]||(pa[a]>da.min[a]?c.backAnimDestination[a]=da.min[a]:pa[a]<da.max[a]&&(c.backAnimDestination[a]=da.max[a]),void 0!==c.backAnimDestination[a]&&(c.slowDownRatio[a]=.7,c.slowDownRatioReverse[a]=1-c.slowDownRatio[a],c.speedDecelerationRatioAbs[a]<.05&&(c.lastFlickSpeed[a]=0,c.backAnimStarted[a]=!0,db("bounceZoomPan"+a,pa[a],c.backAnimDestination[a],b||300,e.easing.sine.out,function(b){pa[a]=b,Ha()}))))},calculateAnimOffset:function(a){c.backAnimStarted[a]||(c.speedDecelerationRatio[a]=c.speedDecelerationRatio[a]*(c.slowDownRatio[a]+c.slowDownRatioReverse[a]-c.slowDownRatioReverse[a]*c.timeDiff/10),c.speedDecelerationRatioAbs[a]=Math.abs(c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]),c.distanceOffset[a]=c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]*c.timeDiff,pa[a]+=c.distanceOffset[a])},panAnimLoop:function(){if($a.zoomPan&&($a.zoomPan.raf=H(c.panAnimLoop),c.now=Ea(),c.timeDiff=c.now-c.lastNow,c.lastNow=c.now,c.calculateAnimOffset("x"),c.calculateAnimOffset("y"),Ha(),c.calculateOverBoundsAnimOffset("x"),c.calculateOverBoundsAnimOffset("y"),c.speedDecelerationRatioAbs.x<.05&&c.speedDecelerationRatioAbs.y<.05))return pa.x=Math.round(pa.x),pa.y=Math.round(pa.y),Ha(),void ab("zoomPan")}};return c},Tb=function(a){return a.calculateSwipeSpeed("y"),da=f.currItem.bounds,a.backAnimDestination={},a.backAnimStarted={},Math.abs(a.lastFlickSpeed.x)<=.05&&Math.abs(a.lastFlickSpeed.y)<=.05?(a.speedDecelerationRatioAbs.x=a.speedDecelerationRatioAbs.y=0,a.calculateOverBoundsAnimOffset("x"),a.calculateOverBoundsAnimOffset("y"),!0):(bb("zoomPan"),a.lastNow=Ea(),void a.panAnimLoop())},Ub=function(a,b){var c;fa||(qb=m);var d;if("swipe"===a){var g=kb.x-lb.x,h=b.lastFlickDist.x<10;g>fb&&(h||b.lastFlickOffset.x>20)?d=-1:g<-fb&&(h||b.lastFlickOffset.x<-20)&&(d=1)}var j;d&&(m+=d,m<0?(m=i.loop?ac()-1:0,j=!0):m>=ac()&&(m=i.loop?0:ac()-1,j=!0),j&&!i.loop||(ua+=d,ra-=d,c=!0));var k,l=ta.x*ra,n=Math.abs(l-tb.x);return c||l>tb.x==b.lastFlickSpeed.x>0?(k=Math.abs(b.lastFlickSpeed.x)>0?n/Math.abs(b.lastFlickSpeed.x):333,k=Math.min(k,400),k=Math.max(k,250)):k=333,qb===m&&(c=!1),fa=!0,Da("mainScrollAnimStart"),db("mainScroll",tb.x,l,k,e.easing.cubic.out,Ka,function(){cb(),fa=!1,qb=-1,(c||qb!==m)&&f.updateCurrItem(),Da("mainScrollAnimComplete")}),c&&f.updateCurrItem(!0),c},Vb=function(a){return 1/ca*a*t},Wb=function(){var a=s,b=Ta(),c=Ua();s<b?a=b:s>c&&(a=c);var d,g=1,h=ja;return ia&&!S&&!ka&&s<b?(f.close(),!0):(ia&&(d=function(a){Fa((g-h)*a+h)}),f.zoomTo(a,0,200,e.easing.cubic.out,d),!0)};za("Gestures",{publicMethods:{initGestures:function(){var a=function(a,b,c,d,e){A=a+b,B=a+c,C=a+d,D=e?a+e:""};F=N.pointerEvent,F&&N.touch&&(N.touch=!1),F?navigator.msPointerEnabled?a("MSPointer","Down","Move","Up","Cancel"):a("pointer","down","move","up","cancel"):N.touch?(a("touch","start","move","end","cancel"),G=!0):a("mouse","down","move","up"),p=B+" "+C+" "+D,q=A,F&&!G&&(G=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1),f.likelyTouchDevice=G,r[A]=Ob,r[B]=Pb,r[C]=Rb,D&&(r[D]=r[C]),N.touch&&(q+=" mousedown",p+=" mousemove mouseup",r.mousedown=r[A],r.mousemove=r[B],r.mouseup=r[C]),G||(i.allowPanToNext=!1)}}});var Xb,Yb,Zb,$b,_b,ac,bc,cc=function(b,c,d,g){Xb&&clearTimeout(Xb),$b=!0,Zb=!0;var h;b.initialLayout?(h=b.initialLayout,b.initialLayout=null):h=i.getThumbBoundsFn&&i.getThumbBoundsFn(m);var j=d?i.hideAnimationDuration:i.showAnimationDuration,k=function(){ab("initialZoom"),d?(f.template.removeAttribute("style"),f.bg.removeAttribute("style")):(Fa(1),c&&(c.style.display="block"),e.addClass(a,"pswp--animated-in"),Da("initialZoom"+(d?"OutEnd":"InEnd"))),g&&g(),$b=!1};if(!j||!h||void 0===h.x)return Da("initialZoom"+(d?"Out":"In")),s=b.initialZoomLevel,Ma(pa,b.initialPosition),Ha(),a.style.opacity=d?0:1,Fa(1),void(j?setTimeout(function(){k()},j):k());var n=function(){var c=l,g=!f.currItem.src||f.currItem.loadError||i.showHideOpacity;b.miniImg&&(b.miniImg.style.webkitBackfaceVisibility="hidden"),d||(s=h.w/b.w,pa.x=h.x,pa.y=h.y-K,f[g?"template":"bg"].style.opacity=.001,Ha()),bb("initialZoom"),d&&!c&&e.removeClass(a,"pswp--animated-in"),g&&(d?e[(c?"remove":"add")+"Class"](a,"pswp--animate_opacity"):setTimeout(function(){e.addClass(a,"pswp--animate_opacity")},30)),Xb=setTimeout(function(){if(Da("initialZoom"+(d?"Out":"In")),d){var f=h.w/b.w,i={x:pa.x,y:pa.y},l=s,m=ja,n=function(b){1===b?(s=f,pa.x=h.x,pa.y=h.y-M):(s=(f-l)*b+l,pa.x=(h.x-i.x)*b+i.x,pa.y=(h.y-M-i.y)*b+i.y),Ha(),g?a.style.opacity=1-b:Fa(m-b*m)};c?db("initialZoom",0,1,j,e.easing.cubic.out,n,k):(n(1),Xb=setTimeout(k,j+20))}else s=b.initialZoomLevel,Ma(pa,b.initialPosition),Ha(),Fa(1),g?a.style.opacity=1:Fa(1),Xb=setTimeout(k,j+20)},d?25:90)};n()},dc={},ec=[],fc={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:!1,preload:[1,1],getNumItemsFn:function(){return Yb.length}},gc=function(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},hc=function(a,b,c){var d=a.bounds;d.center.x=Math.round((dc.x-b)/2),d.center.y=Math.round((dc.y-c)/2)+a.vGap.top,d.max.x=b>dc.x?Math.round(dc.x-b):d.center.x,d.max.y=c>dc.y?Math.round(dc.y-c)+a.vGap.top:d.center.y,d.min.x=b>dc.x?0:d.center.x,d.min.y=c>dc.y?a.vGap.top:d.center.y},ic=function(a,b,c){if(a.src&&!a.loadError){var d=!c;if(d&&(a.vGap||(a.vGap={top:0,bottom:0}),Da("parseVerticalMargin",a)),dc.x=b.x,dc.y=b.y-a.vGap.top-a.vGap.bottom,d){var e=dc.x/a.w,f=dc.y/a.h;a.fitRatio=e<f?e:f;var g=i.scaleMode;"orig"===g?c=1:"fit"===g&&(c=a.fitRatio),c>1&&(c=1),a.initialZoomLevel=c,a.bounds||(a.bounds=gc())}if(!c)return;return hc(a,a.w*c,a.h*c),d&&c===a.initialZoomLevel&&(a.initialPosition=a.bounds.center),a.bounds}return a.w=a.h=0,a.initialZoomLevel=a.fitRatio=1,a.bounds=gc(),a.initialPosition=a.bounds.center,a.bounds},jc=function(a,b,c,d,e,g){b.loadError||d&&(b.imageAppended=!0,mc(b,d,b===f.currItem&&ya),c.appendChild(d),g&&setTimeout(function(){b&&b.loaded&&b.placeholder&&(b.placeholder.style.display="none",b.placeholder=null)},500))},kc=function(a){a.loading=!0,a.loaded=!1;var b=a.img=e.createEl("pswp__img","img"),c=function(){a.loading=!1,a.loaded=!0,a.loadComplete?a.loadComplete(a):a.img=null,b.onload=b.onerror=null,b=null};return b.onload=c,b.onerror=function(){a.loadError=!0,c()},b.src=a.src,b},lc=function(a,b){if(a.src&&a.loadError&&a.container)return b&&(a.container.innerHTML=""),a.container.innerHTML=i.errorMsg.replace("%url%",a.src),!0},mc=function(a,b,c){if(a.src){b||(b=a.container.lastChild);var d=c?a.w:Math.round(a.w*a.fitRatio),e=c?a.h:Math.round(a.h*a.fitRatio);a.placeholder&&!a.loaded&&(a.placeholder.style.width=d+"px",a.placeholder.style.height=e+"px"),b.style.width=d+"px",b.style.height=e+"px"}},nc=function(){if(ec.length){for(var a,b=0;b<ec.length;b++)a=ec[b],a.holder.index===a.index&&jc(a.index,a.item,a.baseDiv,a.img,!1,a.clearPlaceholder);ec=[]}};za("Controller",{publicMethods:{lazyLoadItem:function(a){a=Aa(a);var b=_b(a);b&&(!b.loaded&&!b.loading||x)&&(Da("gettingData",a,b),b.src&&kc(b))},initController:function(){e.extend(i,fc,!0),f.items=Yb=c,_b=f.getItemAt,ac=i.getNumItemsFn,bc=i.loop,ac()<3&&(i.loop=!1),Ca("beforeChange",function(a){var b,c=i.preload,d=null===a||a>=0,e=Math.min(c[0],ac()),g=Math.min(c[1],ac());for(b=1;b<=(d?g:e);b++)f.lazyLoadItem(m+b);for(b=1;b<=(d?e:g);b++)f.lazyLoadItem(m-b)}),Ca("initialLayout",function(){f.currItem.initialLayout=i.getThumbBoundsFn&&i.getThumbBoundsFn(m)}),Ca("mainScrollAnimComplete",nc),Ca("initialZoomInEnd",nc),Ca("destroy",function(){for(var a,b=0;b<Yb.length;b++)a=Yb[b],a.container&&(a.container=null),a.placeholder&&(a.placeholder=null),a.img&&(a.img=null),a.preloader&&(a.preloader=null),a.loadError&&(a.loaded=a.loadError=!1);ec=null})},getItemAt:function(a){return a>=0&&(void 0!==Yb[a]&&Yb[a])},allowProgressiveImg:function(){return i.forceProgressiveLoading||!G||i.mouseUsed||screen.width>1200},setContent:function(a,b){i.loop&&(b=Aa(b));var c=f.getItemAt(a.index);c&&(c.container=null);var d,g=f.getItemAt(b);if(!g)return void(a.el.innerHTML="");Da("gettingData",b,g),a.index=b,a.item=g;var h=g.container=e.createEl("pswp__zoom-wrap");if(!g.src&&g.html&&(g.html.tagName?h.appendChild(g.html):h.innerHTML=g.html),lc(g),ic(g,qa),!g.src||g.loadError||g.loaded)g.src&&!g.loadError&&(d=e.createEl("pswp__img","img"),d.style.opacity=1,d.src=g.src,mc(g,d),jc(b,g,h,d,!0));else{if(g.loadComplete=function(c){if(j){if(a&&a.index===b){if(lc(c,!0))return c.loadComplete=c.img=null,ic(c,qa),Ia(c),void(a.index===m&&f.updateCurrZoomItem());c.imageAppended?!$b&&c.placeholder&&(c.placeholder.style.display="none",c.placeholder=null):N.transform&&(fa||$b)?ec.push({item:c,baseDiv:h,img:c.img,index:b,holder:a,clearPlaceholder:!0}):jc(b,c,h,c.img,fa||$b,!0)}c.loadComplete=null,c.img=null,Da("imageLoadComplete",b,c)}},e.features.transform){var k="pswp__img pswp__img--placeholder";k+=g.msrc?"":" pswp__img--placeholder--blank";var l=e.createEl(k,g.msrc?"img":"");g.msrc&&(l.src=g.msrc),mc(g,l),h.appendChild(l),g.placeholder=l}g.loading||kc(g),f.allowProgressiveImg()&&(!Zb&&N.transform?ec.push({item:g,baseDiv:h,img:g.img,index:b,holder:a}):jc(b,g,h,g.img,!0,!0))}Zb||b!==m?Ia(g):(ea=h.style,cc(g,d||g.img)),a.el.innerHTML="",a.el.appendChild(h)},cleanSlide:function(a){a.img&&(a.img.onload=a.img.onerror=null),a.loaded=a.loading=a.img=a.imageAppended=!1}}});var oc,pc={},qc=function(a,b,c){var d=document.createEvent("CustomEvent"),e={origEvent:a,target:a.target,releasePoint:b,pointerType:c||"touch"};d.initCustomEvent("pswpTap",!0,!0,e),a.target.dispatchEvent(d)};za("Tap",{publicMethods:{initTap:function(){Ca("firstTouchStart",f.onTapStart),Ca("touchRelease",f.onTapRelease),Ca("destroy",function(){pc={},oc=null})},onTapStart:function(a){a.length>1&&(clearTimeout(oc),oc=null)},onTapRelease:function(a,b){if(b&&!Y&&!W&&!_a){var c=b;if(oc&&(clearTimeout(oc),oc=null,xb(c,pc)))return void Da("doubleTap",c);if("mouse"===b.type)return void qc(a,b,"mouse");var d=a.target.tagName.toUpperCase();if("BUTTON"===d||e.hasClass(a.target,"pswp__single-tap"))return void qc(a,b);Ma(pc,c),oc=setTimeout(function(){qc(a,b),oc=null},300)}}}});var rc;za("DesktopZoom",{publicMethods:{initDesktopZoom:function(){L||(G?Ca("mouseUsed",function(){f.setupDesktopZoom()}):f.setupDesktopZoom(!0))},setupDesktopZoom:function(b){rc={};var c="wheel mousewheel DOMMouseScroll";Ca("bindEvents",function(){e.bind(a,c,f.handleMouseWheel)}),Ca("unbindEvents",function(){rc&&e.unbind(a,c,f.handleMouseWheel)}),f.mouseZoomedIn=!1;var d,g=function(){f.mouseZoomedIn&&(e.removeClass(a,"pswp--zoomed-in"),f.mouseZoomedIn=!1),s<1?e.addClass(a,"pswp--zoom-allowed"):e.removeClass(a,"pswp--zoom-allowed"),h()},h=function(){d&&(e.removeClass(a,"pswp--dragging"),d=!1)};Ca("resize",g),Ca("afterChange",g),Ca("pointerDown",function(){f.mouseZoomedIn&&(d=!0,e.addClass(a,"pswp--dragging"))}),Ca("pointerUp",h),b||g()},handleMouseWheel:function(a){if(s<=f.currItem.fitRatio)return i.modal&&(!i.closeOnScroll||_a||V?a.preventDefault():E&&Math.abs(a.deltaY)>2&&(l=!0,f.close())),!0;if(a.stopPropagation(),rc.x=0,"deltaX"in a)1===a.deltaMode?(rc.x=18*a.deltaX,rc.y=18*a.deltaY):(rc.x=a.deltaX,rc.y=a.deltaY);else if("wheelDelta"in a)a.wheelDeltaX&&(rc.x=-.16*a.wheelDeltaX),a.wheelDeltaY?rc.y=-.16*a.wheelDeltaY:rc.y=-.16*a.wheelDelta;else{if(!("detail"in a))return;rc.y=a.detail}Sa(s,!0);var b=pa.x-rc.x,c=pa.y-rc.y;(i.modal||b<=da.min.x&&b>=da.max.x&&c<=da.min.y&&c>=da.max.y)&&a.preventDefault(),f.panTo(b,c)},toggleDesktopZoom:function(b){b=b||{x:qa.x/2+sa.x,y:qa.y/2+sa.y};var c=i.getDoubleTapZoom(!0,f.currItem),d=s===c;f.mouseZoomedIn=!d,f.zoomTo(d?f.currItem.initialZoomLevel:c,b,333),e[(d?"remove":"add")+"Class"](a,"pswp--zoomed-in")}}});var sc,tc,uc,vc,wc,xc,yc,zc,Ac,Bc,Cc,Dc,Ec={history:!0,galleryUID:1},Fc=function(){return Cc.hash.substring(1)},Gc=function(){sc&&clearTimeout(sc),uc&&clearTimeout(uc)},Hc=function(){var a=Fc(),b={};if(a.length<5)return b;var c,d=a.split("&");for(c=0;c<d.length;c++)if(d[c]){var e=d[c].split("=");e.length<2||(b[e[0]]=e[1])}if(i.galleryPIDs){var f=b.pid;for(b.pid=0,c=0;c<Yb.length;c++)if(Yb[c].pid===f){b.pid=c;break}}else b.pid=parseInt(b.pid,10)-1;return b.pid<0&&(b.pid=0),b},Ic=function(){if(uc&&clearTimeout(uc),_a||V)return void(uc=setTimeout(Ic,500));vc?clearTimeout(tc):vc=!0;var a=m+1,b=_b(m);b.hasOwnProperty("pid")&&(a=b.pid);var c=yc+"&gid="+i.galleryUID+"&pid="+a;zc||Cc.hash.indexOf(c)===-1&&(Bc=!0);var d=Cc.href.split("#")[0]+"#"+c;Dc?"#"+c!==window.location.hash&&history[zc?"replaceState":"pushState"]("",document.title,d):zc?Cc.replace(d):Cc.hash=c,zc=!0,tc=setTimeout(function(){vc=!1},60)};za("History",{publicMethods:{initHistory:function(){if(e.extend(i,Ec,!0),i.history){Cc=window.location,Bc=!1,Ac=!1,zc=!1,yc=Fc(),Dc="pushState"in history,yc.indexOf("gid=")>-1&&(yc=yc.split("&gid=")[0],yc=yc.split("?gid=")[0]),Ca("afterChange",f.updateURL),Ca("unbindEvents",function(){e.unbind(window,"hashchange",f.onHashChange)});var a=function(){xc=!0,Ac||(Bc?history.back():yc?Cc.hash=yc:Dc?history.pushState("",document.title,Cc.pathname+Cc.search):Cc.hash=""),Gc()};Ca("unbindEvents",function(){l&&a()}),Ca("destroy",function(){xc||a()}),Ca("firstUpdate",function(){m=Hc().pid});var b=yc.indexOf("pid=");b>-1&&(yc=yc.substring(0,b),"&"===yc.slice(-1)&&(yc=yc.slice(0,-1))),setTimeout(function(){j&&e.bind(window,"hashchange",f.onHashChange)},40)}},onHashChange:function(){return Fc()===yc?(Ac=!0,void f.close()):void(vc||(wc=!0,f.goTo(Hc().pid),wc=!1))},updateURL:function(){Gc(),wc||(zc?sc=setTimeout(Ic,800):Ic())}}}),e.extend(f,eb)};return a});
/*! PhotoSwipe Default UI - 4.1.3 - 2019-01-08
* http://photoswipe.com
* Copyright (c) 2019 Dmitry Semenov; */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipeUI_Default=b()}(this,function(){"use strict";var a=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v=this,w=!1,x=!0,y=!0,z={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4e3,timeToIdleOutside:1e3,loadingIndicatorDelay:1e3,addCaptionHTMLFn:function(a,b){return a.title?(b.children[0].innerHTML=a.title,!0):(b.children[0].innerHTML="",!1)},closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,shareEl:!0,counterEl:!0,arrowEl:!0,preloaderEl:!0,tapToClose:!1,tapToToggleControls:!0,clickToCloseNonZoomable:!0,shareButtons:[{id:"facebook",label:"Share on Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"},{id:"download",label:"Download image",url:"{{raw_image_url}}",download:!0}],getImageURLForShare:function(){return a.currItem.src||""},getPageURLForShare:function(){return window.location.href},getTextForShare:function(){return a.currItem.title||""},indexIndicatorSep:" / ",fitControlsWidth:1200},A=function(a){if(r)return!0;a=a||window.event,q.timeToIdle&&q.mouseUsed&&!k&&K();for(var c,d,e=a.target||a.srcElement,f=e.getAttribute("class")||"",g=0;g<S.length;g++)c=S[g],c.onTap&&f.indexOf("pswp__"+c.name)>-1&&(c.onTap(),d=!0);if(d){a.stopPropagation&&a.stopPropagation(),r=!0;var h=b.features.isOldAndroid?600:30;s=setTimeout(function(){r=!1},h)}},B=function(){return!a.likelyTouchDevice||q.mouseUsed||screen.width>q.fitControlsWidth},C=function(a,c,d){b[(d?"add":"remove")+"Class"](a,"pswp__"+c)},D=function(){var a=1===q.getNumItemsFn();a!==p&&(C(d,"ui--one-slide",a),p=a)},E=function(){C(i,"share-modal--hidden",y)},F=function(){return y=!y,y?(b.removeClass(i,"pswp__share-modal--fade-in"),setTimeout(function(){y&&E()},300)):(E(),setTimeout(function(){y||b.addClass(i,"pswp__share-modal--fade-in")},30)),y||H(),!1},G=function(b){b=b||window.event;var c=b.target||b.srcElement;return a.shout("shareLinkClick",b,c),!!c.href&&(!!c.hasAttribute("download")||(window.open(c.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100)),y||F(),!1))},H=function(){for(var a,b,c,d,e,f="",g=0;g<q.shareButtons.length;g++)a=q.shareButtons[g],c=q.getImageURLForShare(a),d=q.getPageURLForShare(a),e=q.getTextForShare(a),b=a.url.replace("{{url}}",encodeURIComponent(d)).replace("{{image_url}}",encodeURIComponent(c)).replace("{{raw_image_url}}",c).replace("{{text}}",encodeURIComponent(e)),f+='<a href="'+b+'" target="_blank" class="pswp__share--'+a.id+'"'+(a.download?"download":"")+">"+a.label+"</a>",q.parseShareButtonOut&&(f=q.parseShareButtonOut(a,f));i.children[0].innerHTML=f,i.children[0].onclick=G},I=function(a){for(var c=0;c<q.closeElClasses.length;c++)if(b.hasClass(a,"pswp__"+q.closeElClasses[c]))return!0},J=0,K=function(){clearTimeout(u),J=0,k&&v.setIdle(!1)},L=function(a){a=a?a:window.event;var b=a.relatedTarget||a.toElement;b&&"HTML"!==b.nodeName||(clearTimeout(u),u=setTimeout(function(){v.setIdle(!0)},q.timeToIdleOutside))},M=function(){q.fullscreenEl&&!b.features.isOldAndroid&&(c||(c=v.getFullscreenAPI()),c?(b.bind(document,c.eventK,v.updateFullscreen),v.updateFullscreen(),b.addClass(a.template,"pswp--supports-fs")):b.removeClass(a.template,"pswp--supports-fs"))},N=function(){q.preloaderEl&&(O(!0),l("beforeChange",function(){clearTimeout(o),o=setTimeout(function(){a.currItem&&a.currItem.loading?(!a.allowProgressiveImg()||a.currItem.img&&!a.currItem.img.naturalWidth)&&O(!1):O(!0)},q.loadingIndicatorDelay)}),l("imageLoadComplete",function(b,c){a.currItem===c&&O(!0)}))},O=function(a){n!==a&&(C(m,"preloader--active",!a),n=a)},P=function(a){var c=a.vGap;if(B()){var g=q.barsSize;if(q.captionEl&&"auto"===g.bottom)if(f||(f=b.createEl("pswp__caption pswp__caption--fake"),f.appendChild(b.createEl("pswp__caption__center")),d.insertBefore(f,e),b.addClass(d,"pswp__ui--fit")),q.addCaptionHTMLFn(a,f,!0)){var h=f.clientHeight;c.bottom=parseInt(h,10)||44}else c.bottom=g.top;else c.bottom="auto"===g.bottom?0:g.bottom;c.top=g.top}else c.top=c.bottom=0},Q=function(){q.timeToIdle&&l("mouseUsed",function(){b.bind(document,"mousemove",K),b.bind(document,"mouseout",L),t=setInterval(function(){J++,2===J&&v.setIdle(!0)},q.timeToIdle/2)})},R=function(){l("onVerticalDrag",function(a){x&&a<.95?v.hideControls():!x&&a>=.95&&v.showControls()});var a;l("onPinchClose",function(b){x&&b<.9?(v.hideControls(),a=!0):a&&!x&&b>.9&&v.showControls()}),l("zoomGestureEnded",function(){a=!1,a&&!x&&v.showControls()})},S=[{name:"caption",option:"captionEl",onInit:function(a){e=a}},{name:"share-modal",option:"shareEl",onInit:function(a){i=a},onTap:function(){F()}},{name:"button--share",option:"shareEl",onInit:function(a){h=a},onTap:function(){F()}},{name:"button--zoom",option:"zoomEl",onTap:a.toggleDesktopZoom},{name:"counter",option:"counterEl",onInit:function(a){g=a}},{name:"button--close",option:"closeEl",onTap:a.close},{name:"button--arrow--left",option:"arrowEl",onTap:a.prev},{name:"button--arrow--right",option:"arrowEl",onTap:a.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){c.isFullscreen()?c.exit():c.enter()}},{name:"preloader",option:"preloaderEl",onInit:function(a){m=a}}],T=function(){var a,c,e,f=function(d){if(d)for(var f=d.length,g=0;g<f;g++){a=d[g],c=a.className;for(var h=0;h<S.length;h++)e=S[h],c.indexOf("pswp__"+e.name)>-1&&(q[e.option]?(b.removeClass(a,"pswp__element--disabled"),e.onInit&&e.onInit(a)):b.addClass(a,"pswp__element--disabled"))}};f(d.children);var g=b.getChildByClass(d,"pswp__top-bar");g&&f(g.children)};v.init=function(){b.extend(a.options,z,!0),q=a.options,d=b.getChildByClass(a.scrollWrap,"pswp__ui"),l=a.listen,R(),l("beforeChange",v.update),l("doubleTap",function(b){var c=a.currItem.initialZoomLevel;a.getZoomLevel()!==c?a.zoomTo(c,b,333):a.zoomTo(q.getDoubleTapZoom(!1,a.currItem),b,333)}),l("preventDragEvent",function(a,b,c){var d=a.target||a.srcElement;d&&d.getAttribute("class")&&a.type.indexOf("mouse")>-1&&(d.getAttribute("class").indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(d.tagName))&&(c.prevent=!1)}),l("bindEvents",function(){b.bind(d,"pswpTap click",A),b.bind(a.scrollWrap,"pswpTap",v.onGlobalTap),a.likelyTouchDevice||b.bind(a.scrollWrap,"mouseover",v.onMouseOver)}),l("unbindEvents",function(){y||F(),t&&clearInterval(t),b.unbind(document,"mouseout",L),b.unbind(document,"mousemove",K),b.unbind(d,"pswpTap click",A),b.unbind(a.scrollWrap,"pswpTap",v.onGlobalTap),b.unbind(a.scrollWrap,"mouseover",v.onMouseOver),c&&(b.unbind(document,c.eventK,v.updateFullscreen),c.isFullscreen()&&(q.hideAnimationDuration=0,c.exit()),c=null)}),l("destroy",function(){q.captionEl&&(f&&d.removeChild(f),b.removeClass(e,"pswp__caption--empty")),i&&(i.children[0].onclick=null),b.removeClass(d,"pswp__ui--over-close"),b.addClass(d,"pswp__ui--hidden"),v.setIdle(!1)}),q.showAnimationDuration||b.removeClass(d,"pswp__ui--hidden"),l("initialZoomIn",function(){q.showAnimationDuration&&b.removeClass(d,"pswp__ui--hidden")}),l("initialZoomOut",function(){b.addClass(d,"pswp__ui--hidden")}),l("parseVerticalMargin",P),T(),q.shareEl&&h&&i&&(y=!0),D(),Q(),M(),N()},v.setIdle=function(a){k=a,C(d,"ui--idle",a)},v.update=function(){x&&a.currItem?(v.updateIndexIndicator(),q.captionEl&&(q.addCaptionHTMLFn(a.currItem,e),C(e,"caption--empty",!a.currItem.title)),w=!0):w=!1,y||F(),D()},v.updateFullscreen=function(d){d&&setTimeout(function(){a.setScrollOffset(0,b.getScrollY())},50),b[(c.isFullscreen()?"add":"remove")+"Class"](a.template,"pswp--fs")},v.updateIndexIndicator=function(){q.counterEl&&(g.innerHTML=a.getCurrentIndex()+1+q.indexIndicatorSep+q.getNumItemsFn())},v.onGlobalTap=function(c){c=c||window.event;var d=c.target||c.srcElement;if(!r)if(c.detail&&"mouse"===c.detail.pointerType){if(I(d))return void a.close();b.hasClass(d,"pswp__img")&&(1===a.getZoomLevel()&&a.getZoomLevel()<=a.currItem.fitRatio?q.clickToCloseNonZoomable&&a.close():a.toggleDesktopZoom(c.detail.releasePoint))}else if(q.tapToToggleControls&&(x?v.hideControls():v.showControls()),q.tapToClose&&(b.hasClass(d,"pswp__img")||I(d)))return void a.close()},v.onMouseOver=function(a){a=a||window.event;var b=a.target||a.srcElement;C(d,"ui--over-close",I(b))},v.hideControls=function(){b.addClass(d,"pswp__ui--hidden"),x=!1},v.showControls=function(){x=!0,w||v.update(),b.removeClass(d,"pswp__ui--hidden")},v.supportsFullscreen=function(){var a=document;return!!(a.exitFullscreen||a.mozCancelFullScreen||a.webkitExitFullscreen||a.msExitFullscreen)},v.getFullscreenAPI=function(){var b,c=document.documentElement,d="fullscreenchange";return c.requestFullscreen?b={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:d}:c.mozRequestFullScreen?b={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+d}:c.webkitRequestFullscreen?b={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+d}:c.msRequestFullscreen&&(b={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}),b&&(b.enter=function(){return j=q.closeOnScroll,q.closeOnScroll=!1,"webkitRequestFullscreen"!==this.enterK?a.template[this.enterK]():void a.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)},b.exit=function(){return q.closeOnScroll=j,document[this.exitK]()},b.isFullscreen=function(){return document[this.elementK]}),b}};return a});
var tns=function(){Object.keys||(Object.keys=function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e}),"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)});var t=window,Oi=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(t){return setTimeout(t,16)},e=window,Di=e.cancelAnimationFrame||e.mozCancelAnimationFrame||function(t){clearTimeout(t)};function Hi(){for(var t,e,n,i=arguments[0]||{},a=1,r=arguments.length;a<r;a++)if(null!==(t=arguments[a]))for(e in t)i!==(n=t[e])&&void 0!==n&&(i[e]=n);return i}function ki(t){return 0<=["true","false"].indexOf(t)?JSON.parse(t):t}function Ri(t,e,n,i){if(i)try{t.setItem(e,n)}catch(t){}return n}function Ii(){var t=document,e=t.body;return e||((e=t.createElement("body")).fake=!0),e}var n=document.documentElement;function Pi(t){var e="";return t.fake&&(e=n.style.overflow,t.style.background="",t.style.overflow=n.style.overflow="hidden",n.appendChild(t)),e}function zi(t,e){t.fake&&(t.remove(),n.style.overflow=e,n.offsetHeight)}function Wi(t,e,n,i){"insertRule"in t?t.insertRule(e+"{"+n+"}",i):t.addRule(e,n,i)}function Fi(t){return("insertRule"in t?t.cssRules:t.rules).length}function qi(t,e,n){for(var i=0,a=t.length;i<a;i++)e.call(n,t[i],i)}var i="classList"in document.createElement("_"),ji=i?function(t,e){return t.classList.contains(e)}:function(t,e){return 0<=t.className.indexOf(e)},Vi=i?function(t,e){ji(t,e)||t.classList.add(e)}:function(t,e){ji(t,e)||(t.className+=" "+e)},Gi=i?function(t,e){ji(t,e)&&t.classList.remove(e)}:function(t,e){ji(t,e)&&(t.className=t.className.replace(e,""))};function Qi(t,e){return t.hasAttribute(e)}function Xi(t,e){return t.getAttribute(e)}function r(t){return void 0!==t.item}function Yi(t,e){if(t=r(t)||t instanceof Array?t:[t],"[object Object]"===Object.prototype.toString.call(e))for(var n=t.length;n--;)for(var i in e)t[n].setAttribute(i,e[i])}function Ki(t,e){t=r(t)||t instanceof Array?t:[t];for(var n=(e=e instanceof Array?e:[e]).length,i=t.length;i--;)for(var a=n;a--;)t[i].removeAttribute(e[a])}function Ji(t){for(var e=[],n=0,i=t.length;n<i;n++)e.push(t[n]);return e}function Ui(t,e){"none"!==t.style.display&&(t.style.display="none")}function _i(t,e){"none"===t.style.display&&(t.style.display="")}function Zi(t){return"none"!==window.getComputedStyle(t).display}function $i(e){if("string"==typeof e){var n=[e],i=e.charAt(0).toUpperCase()+e.substr(1);["Webkit","Moz","ms","O"].forEach(function(t){"ms"===t&&"transform"!==e||n.push(t+i)}),e=n}for(var t=document.createElement("fakeelement"),a=(e.length,0);a<e.length;a++){var r=e[a];if(void 0!==t.style[r])return r}return!1}function ta(t,e){var n=!1;return/^Webkit/.test(t)?n="webkit"+e+"End":/^O/.test(t)?n="o"+e+"End":t&&(n=e.toLowerCase()+"end"),n}var a=!1;try{var o=Object.defineProperty({},"passive",{get:function(){a=!0}});window.addEventListener("test",null,o)}catch(t){}var u=!!a&&{passive:!0};function ea(t,e,n){for(var i in e){var a=0<=["touchstart","touchmove"].indexOf(i)&&!n&&u;t.addEventListener(i,e[i],a)}}function na(t,e){for(var n in e){var i=0<=["touchstart","touchmove"].indexOf(n)&&u;t.removeEventListener(n,e[n],i)}}function ia(){return{topics:{},on:function(t,e){this.topics[t]=this.topics[t]||[],this.topics[t].push(e)},off:function(t,e){if(this.topics[t])for(var n=0;n<this.topics[t].length;n++)if(this.topics[t][n]===e){this.topics[t].splice(n,1);break}},emit:function(e,n){n.type=e,this.topics[e]&&this.topics[e].forEach(function(t){t(n,e)})}}}var aa=function(O){O=Hi({container:".slider",mode:"carousel",axis:"horizontal",items:1,gutter:0,edgePadding:0,fixedWidth:!1,autoWidth:!1,viewportMax:!1,slideBy:1,center:!1,controls:!0,controlsPosition:"top",controlsText:["prev","next"],controlsContainer:!1,prevButton:!1,nextButton:!1,nav:!0,navPosition:"top",navContainer:!1,navAsThumbnails:!1,arrowKeys:!1,speed:300,autoplay:!1,autoplayPosition:"top",autoplayTimeout:5e3,autoplayDirection:"forward",autoplayText:["start","stop"],autoplayHoverPause:!1,autoplayButton:!1,autoplayButtonOutput:!0,autoplayResetOnVisibility:!0,animateIn:"tns-fadeIn",animateOut:"tns-fadeOut",animateNormal:"tns-normal",animateDelay:!1,loop:!0,rewind:!1,autoHeight:!1,responsive:!1,lazyload:!1,lazyloadSelector:".tns-lazy-img",touch:!0,mouseDrag:!1,swipeAngle:15,nested:!1,preventActionWhenRunning:!1,preventScrollOnTouch:!1,freezable:!0,onInit:!1,useLocalStorage:!0},O||{});var D=document,h=window,a={ENTER:13,SPACE:32,LEFT:37,RIGHT:39},e={},n=O.useLocalStorage;if(n){var t=navigator.userAgent,i=new Date;try{(e=h.localStorage)?(e.setItem(i,i),n=e.getItem(i)==i,e.removeItem(i)):n=!1,n||(e={})}catch(t){n=!1}n&&(e.tnsApp&&e.tnsApp!==t&&["tC","tPL","tMQ","tTf","t3D","tTDu","tTDe","tADu","tADe","tTE","tAE"].forEach(function(t){e.removeItem(t)}),localStorage.tnsApp=t)}var r,o,u,l,s,c,f,y=e.tC?ki(e.tC):Ri(e,"tC",function(){var t=document,e=Ii(),n=Pi(e),i=t.createElement("div"),a=!1;e.appendChild(i);try{for(var r,o="(10px * 10)",u=["calc"+o,"-moz-calc"+o,"-webkit-calc"+o],l=0;l<3;l++)if(r=u[l],i.style.width=r,100===i.offsetWidth){a=r.replace(o,"");break}}catch(t){}return e.fake?zi(e,n):i.remove(),a}(),n),g=e.tPL?ki(e.tPL):Ri(e,"tPL",function(){var t,e=document,n=Ii(),i=Pi(n),a=e.createElement("div"),r=e.createElement("div"),o="";a.className="tns-t-subp2",r.className="tns-t-ct";for(var u=0;u<70;u++)o+="<div></div>";return r.innerHTML=o,a.appendChild(r),n.appendChild(a),t=Math.abs(a.getBoundingClientRect().left-r.children[67].getBoundingClientRect().left)<2,n.fake?zi(n,i):a.remove(),t}(),n),H=e.tMQ?ki(e.tMQ):Ri(e,"tMQ",(o=document,u=Ii(),l=Pi(u),s=o.createElement("div"),c=o.createElement("style"),f="@media all and (min-width:1px){.tns-mq-test{position:absolute}}",c.type="text/css",s.className="tns-mq-test",u.appendChild(c),u.appendChild(s),c.styleSheet?c.styleSheet.cssText=f:c.appendChild(o.createTextNode(f)),r=window.getComputedStyle?window.getComputedStyle(s).position:s.currentStyle.position,u.fake?zi(u,l):s.remove(),"absolute"===r),n),d=e.tTf?ki(e.tTf):Ri(e,"tTf",$i("transform"),n),v=e.t3D?ki(e.t3D):Ri(e,"t3D",function(t){if(!t)return!1;if(!window.getComputedStyle)return!1;var e,n=document,i=Ii(),a=Pi(i),r=n.createElement("p"),o=9<t.length?"-"+t.slice(0,-9).toLowerCase()+"-":"";return o+="transform",i.insertBefore(r,null),r.style[t]="translate3d(1px,1px,1px)",e=window.getComputedStyle(r).getPropertyValue(o),i.fake?zi(i,a):r.remove(),void 0!==e&&0<e.length&&"none"!==e}(d),n),x=e.tTDu?ki(e.tTDu):Ri(e,"tTDu",$i("transitionDuration"),n),p=e.tTDe?ki(e.tTDe):Ri(e,"tTDe",$i("transitionDelay"),n),b=e.tADu?ki(e.tADu):Ri(e,"tADu",$i("animationDuration"),n),m=e.tADe?ki(e.tADe):Ri(e,"tADe",$i("animationDelay"),n),C=e.tTE?ki(e.tTE):Ri(e,"tTE",ta(x,"Transition"),n),w=e.tAE?ki(e.tAE):Ri(e,"tAE",ta(b,"Animation"),n),M=h.console&&"function"==typeof h.console.warn,T=["container","controlsContainer","prevButton","nextButton","navContainer","autoplayButton"],E={};if(T.forEach(function(t){if("string"==typeof O[t]){var e=O[t],n=D.querySelector(e);if(E[t]=e,!n||!n.nodeName)return void(M&&console.warn("Can't find",O[t]));O[t]=n}}),!(O.container.children.length<1)){var k=O.responsive,R=O.nested,I="carousel"===O.mode;if(k){0 in k&&(O=Hi(O,k[0]),delete k[0]);var A={};for(var N in k){var L=k[N];L="number"==typeof L?{items:L}:L,A[N]=L}k=A,A=null}if(I||function t(e){for(var n in e)I||("slideBy"===n&&(e[n]="page"),"edgePadding"===n&&(e[n]=!1),"autoHeight"===n&&(e[n]=!1)),"responsive"===n&&t(e[n])}(O),!I){O.axis="horizontal",O.slideBy="page",O.edgePadding=!1;var P=O.animateIn,z=O.animateOut,B=O.animateDelay,W=O.animateNormal}var S,F,q="horizontal"===O.axis,j=D.createElement("div"),V=D.createElement("div"),G=O.container,Q=G.parentNode,X=G.outerHTML,Y=G.children,K=Y.length,J=sn(),U=!1;k&&Bn(),I&&(G.className+=" tns-vpfix");var _,Z,$,tt,et,nt,it,at,rt=O.autoWidth,ot=vn("fixedWidth"),ut=vn("edgePadding"),lt=vn("gutter"),st=fn(),ct=vn("center"),ft=rt?1:Math.floor(vn("items")),dt=vn("slideBy"),vt=O.viewportMax||O.fixedWidthViewportWidth,pt=vn("arrowKeys"),mt=vn("speed"),ht=O.rewind,yt=!ht&&O.loop,gt=vn("autoHeight"),xt=vn("controls"),bt=vn("controlsText"),Ct=vn("nav"),wt=vn("touch"),Mt=vn("mouseDrag"),Tt=vn("autoplay"),Et=vn("autoplayTimeout"),At=vn("autoplayText"),Nt=vn("autoplayHoverPause"),Lt=vn("autoplayResetOnVisibility"),Bt=(at=document.createElement("style"),it&&at.setAttribute("media",it),document.querySelector("head").appendChild(at),at.sheet?at.sheet:at.styleSheet),St=O.lazyload,Ot=(O.lazyloadSelector,[]),Dt=yt?(et=function(){{if(rt||ot&&!vt)return K-1;var t=ot?"fixedWidth":"items",e=[];if((ot||O[t]<K)&&e.push(O[t]),k)for(var n in k){var i=k[n][t];i&&(ot||i<K)&&e.push(i)}return e.length||e.push(0),Math.ceil(ot?vt/Math.min.apply(null,e):Math.max.apply(null,e))}}(),nt=I?Math.ceil((5*et-K)/2):4*et-K,nt=Math.max(et,nt),dn("edgePadding")?nt+1:nt):0,Ht=I?K+2*Dt:K+Dt,kt=!(!ot&&!rt||yt),Rt=ot?ni():null,It=!I||!yt,Pt=q?"left":"top",zt="",Wt="",Ft=ot?function(){return ct&&!yt?K-1:Math.ceil(-Rt/(ot+lt))}:rt?function(){for(var t=Ht;t--;)if(_[t]>=-Rt)return t}:function(){return ct&&I&&!yt?K-1:yt||I?Math.max(0,Ht-Math.ceil(ft)):Ht-1},qt=on(vn("startIndex")),jt=qt,Vt=(rn(),0),Gt=rt?null:Ft(),Qt=O.preventActionWhenRunning,Xt=O.swipeAngle,Yt=!Xt||"?",Kt=!1,Jt=O.onInit,Ut=new ia,_t=" tns-slider tns-"+O.mode,Zt=G.id||(tt=window.tnsId,window.tnsId=tt?tt+1:1,"tns"+window.tnsId),$t=vn("disable"),te=!1,ee=O.freezable,ne=!(!ee||rt)&&Ln(),ie=!1,ae={click:fi,keydown:function(t){t=xi(t);var e=[a.LEFT,a.RIGHT].indexOf(t.keyCode);0<=e&&(0===e?Ee.disabled||fi(t,-1):Ae.disabled||fi(t,1))}},re={click:function(t){if(Kt){if(Qt)return;si()}var e=bi(t=xi(t));for(;e!==Se&&!Qi(e,"data-nav");)e=e.parentNode;if(Qi(e,"data-nav")){var n=ke=Number(Xi(e,"data-nav")),i=ot||rt?n*K/De:n*ft,a=ve?n:Math.min(Math.ceil(i),K-1);ci(a,t),Re===n&&(qe&&hi(),ke=-1)}},keydown:function(t){t=xi(t);var e=D.activeElement;if(!Qi(e,"data-nav"))return;var n=[a.LEFT,a.RIGHT,a.ENTER,a.SPACE].indexOf(t.keyCode),i=Number(Xi(e,"data-nav"));0<=n&&(0===n?0<i&&gi(Be[i-1]):1===n?i<De-1&&gi(Be[i+1]):ci(ke=i,t))}},oe={mouseover:function(){qe&&(vi(),je=!0)},mouseout:function(){je&&(di(),je=!1)}},ue={visibilitychange:function(){D.hidden?qe&&(vi(),Ge=!0):Ge&&(di(),Ge=!1)}},le={keydown:function(t){t=xi(t);var e=[a.LEFT,a.RIGHT].indexOf(t.keyCode);0<=e&&fi(t,0===e?-1:1)}},se={touchstart:Ti,touchmove:Ei,touchend:Ai,touchcancel:Ai},ce={mousedown:Ti,mousemove:Ei,mouseup:Ai,mouseleave:Ai},fe=dn("controls"),de=dn("nav"),ve=!!rt||O.navAsThumbnails,pe=dn("autoplay"),me=dn("touch"),he=dn("mouseDrag"),ye="tns-slide-active",ge="tns-complete",xe={load:function(t){zn(bi(t))},error:function(t){e=bi(t),Vi(e,"failed"),Wn(e);var e}},be="force"===O.preventScrollOnTouch;if(fe)var Ce,we,Me=O.controlsContainer,Te=O.controlsContainer?O.controlsContainer.outerHTML:"",Ee=O.prevButton,Ae=O.nextButton,Ne=O.prevButton?O.prevButton.outerHTML:"",Le=O.nextButton?O.nextButton.outerHTML:"";if(de)var Be,Se=O.navContainer,Oe=O.navContainer?O.navContainer.outerHTML:"",De=rt?K:Li(),He=0,ke=-1,Re=ln(),Ie=Re,Pe="tns-nav-active",ze="Carousel Page ",We=" (Current Slide)";if(pe)var Fe,qe,je,Ve,Ge,Qe="forward"===O.autoplayDirection?1:-1,Xe=O.autoplayButton,Ye=O.autoplayButton?O.autoplayButton.outerHTML:"",Ke=["<span class='tns-visually-hidden'>"," animation</span>"];if(me||he)var Je,Ue,_e={},Ze={},$e=!1,tn=q?function(t,e){return t.x-e.x}:function(t,e){return t.y-e.y};rt||an($t||ne),d&&(Pt=d,zt="translate",v?(zt+=q?"3d(":"3d(0px, ",Wt=q?", 0px, 0px)":", 0px)"):(zt+=q?"X(":"Y(",Wt=")")),I&&(G.className=G.className.replace("tns-vpfix","")),function(){dn("gutter");j.className="tns-outer",V.className="tns-inner",j.id=Zt+"-ow",V.id=Zt+"-iw",""===G.id&&(G.id=Zt);_t+=g||rt?" tns-subpixel":" tns-no-subpixel",_t+=y?" tns-calc":" tns-no-calc",rt&&(_t+=" tns-autowidth");_t+=" tns-"+O.axis,G.className+=_t,I?((S=D.createElement("div")).id=Zt+"-mw",S.className="tns-ovh",j.appendChild(S),S.appendChild(V)):j.appendChild(V);if(gt){var t=S||V;t.className+=" tns-ah"}if(Q.insertBefore(j,G),V.appendChild(G),qi(Y,function(t,e){Vi(t,"tns-item"),t.id||(t.id=Zt+"-item"+e),!I&&W&&Vi(t,W),Yi(t,{"aria-hidden":"true",tabindex:"-1"})}),Dt){for(var e=D.createDocumentFragment(),n=D.createDocumentFragment(),i=Dt;i--;){var a=i%K,r=Y[a].cloneNode(!0);if(Ki(r,"id"),n.insertBefore(r,n.firstChild),I){var o=Y[K-1-a].cloneNode(!0);Ki(o,"id"),e.appendChild(o)}}G.insertBefore(e,G.firstChild),G.appendChild(n),Y=G.children}}(),function(){if(!I)for(var t=qt,e=qt+Math.min(K,ft);t<e;t++){var n=Y[t];n.style.left=100*(t-qt)/ft+"%",Vi(n,P),Gi(n,W)}q&&(g||rt?(Wi(Bt,"#"+Zt+" > .tns-item","font-size:"+h.getComputedStyle(Y[0]).fontSize+";",Fi(Bt)),Wi(Bt,"#"+Zt,"font-size:0;",Fi(Bt))):I&&qi(Y,function(t,e){var n;t.style.marginLeft=(n=e,y?y+"("+100*n+"% / "+Ht+")":100*n/Ht+"%")}));if(H){if(x){var i=S&&O.autoHeight?xn(O.speed):"";Wi(Bt,"#"+Zt+"-mw",i,Fi(Bt))}i=pn(O.edgePadding,O.gutter,O.fixedWidth,O.speed,O.autoHeight),Wi(Bt,"#"+Zt+"-iw",i,Fi(Bt)),I&&(i=q&&!rt?"width:"+mn(O.fixedWidth,O.gutter,O.items)+";":"",x&&(i+=xn(mt)),Wi(Bt,"#"+Zt,i,Fi(Bt))),i=q&&!rt?hn(O.fixedWidth,O.gutter,O.items):"",O.gutter&&(i+=yn(O.gutter)),I||(x&&(i+=xn(mt)),b&&(i+=bn(mt))),i&&Wi(Bt,"#"+Zt+" > .tns-item",i,Fi(Bt))}else{Gn(),V.style.cssText=pn(ut,lt,ot,gt),I&&q&&!rt&&(G.style.width=mn(ot,lt,ft));var i=q&&!rt?hn(ot,lt,ft):"";lt&&(i+=yn(lt)),i&&Wi(Bt,"#"+Zt+" > .tns-item",i,Fi(Bt))}if(k&&H)for(var a in k){a=parseInt(a);var r=k[a],i="",o="",u="",l="",s="",c=rt?null:vn("items",a),f=vn("fixedWidth",a),d=vn("speed",a),v=vn("edgePadding",a),p=vn("autoHeight",a),m=vn("gutter",a);x&&S&&vn("autoHeight",a)&&"speed"in r&&(o="#"+Zt+"-mw{"+xn(d)+"}"),("edgePadding"in r||"gutter"in r)&&(u="#"+Zt+"-iw{"+pn(v,m,f,d,p)+"}"),I&&q&&!rt&&("fixedWidth"in r||"items"in r||ot&&"gutter"in r)&&(l="width:"+mn(f,m,c)+";"),x&&"speed"in r&&(l+=xn(d)),l&&(l="#"+Zt+"{"+l+"}"),("fixedWidth"in r||ot&&"gutter"in r||!I&&"items"in r)&&(s+=hn(f,m,c)),"gutter"in r&&(s+=yn(m)),!I&&"speed"in r&&(x&&(s+=xn(d)),b&&(s+=bn(d))),s&&(s="#"+Zt+" > .tns-item{"+s+"}"),(i=o+u+l+s)&&Bt.insertRule("@media (min-width: "+a/16+"em) {"+i+"}",Bt.cssRules.length)}}(),Cn();var en=yt?I?function(){var t=Vt,e=Gt;t+=dt,e-=dt,ut?(t+=1,e-=1):ot&&(st+lt)%(ot+lt)&&(e-=1),Dt&&(e<qt?qt-=K:qt<t&&(qt+=K))}:function(){if(Gt<qt)for(;Vt+K<=qt;)qt-=K;else if(qt<Vt)for(;qt<=Gt-K;)qt+=K}:function(){qt=Math.max(Vt,Math.min(Gt,qt))},nn=I?function(){var e,n,i,a,t,r,o,u,l,s,c;ti(G,""),x||!mt?(ri(),mt&&Zi(G)||si()):(e=G,n=Pt,i=zt,a=Wt,t=ii(),r=mt,o=si,u=Math.min(r,10),l=0<=t.indexOf("%")?"%":"px",t=t.replace(l,""),s=Number(e.style[n].replace(i,"").replace(a,"").replace(l,"")),c=(t-s)/r*u,setTimeout(function t(){r-=u,s+=c,e.style[n]=i+s+l+a,0<r?setTimeout(t,u):o()},u)),q||Ni()}:function(){Ot=[];var t={};t[C]=t[w]=si,na(Y[jt],t),ea(Y[qt],t),oi(jt,P,z,!0),oi(qt,W,P),C&&w&&mt&&Zi(G)||si()};return{version:"2.9.2",getInfo:Si,events:Ut,goTo:ci,play:function(){Tt&&!qe&&(mi(),Ve=!1)},pause:function(){qe&&(hi(),Ve=!0)},isOn:U,updateSliderHeight:Xn,refresh:Cn,destroy:function(){if(Bt.disabled=!0,Bt.ownerNode&&Bt.ownerNode.remove(),na(h,{resize:An}),pt&&na(D,le),Me&&na(Me,ae),Se&&na(Se,re),na(G,oe),na(G,ue),Xe&&na(Xe,{click:yi}),Tt&&clearInterval(Fe),I&&C){var t={};t[C]=si,na(G,t)}wt&&na(G,se),Mt&&na(G,ce);var r=[X,Te,Ne,Le,Oe,Ye];for(var e in T.forEach(function(t,e){var n="container"===t?j:O[t];if("object"==typeof n){var i=!!n.previousElementSibling&&n.previousElementSibling,a=n.parentNode;n.outerHTML=r[e],O[t]=i?i.nextElementSibling:a.firstElementChild}}),T=P=z=B=W=q=j=V=G=Q=X=Y=K=F=J=rt=ot=ut=lt=st=ft=dt=vt=pt=mt=ht=yt=gt=Bt=St=_=Ot=Dt=Ht=kt=Rt=It=Pt=zt=Wt=Ft=qt=jt=Vt=Gt=Xt=Yt=Kt=Jt=Ut=_t=Zt=$t=te=ee=ne=ie=ae=re=oe=ue=le=se=ce=fe=de=ve=pe=me=he=ye=ge=xe=Z=xt=bt=Me=Te=Ee=Ae=Ce=we=Ct=Se=Oe=Be=De=He=ke=Re=Ie=Pe=ze=We=Tt=Et=Qe=At=Nt=Xe=Ye=Lt=Ke=Fe=qe=je=Ve=Ge=_e=Ze=Je=$e=Ue=tn=wt=Mt=null,this)"rebuild"!==e&&(this[e]=null);U=!1},rebuild:function(){return aa(Hi(O,E))}}}function an(t){t&&(xt=Ct=wt=Mt=pt=Tt=Nt=Lt=!1)}function rn(){for(var t=I?qt-Dt:qt;t<0;)t+=K;return t%K+1}function on(t){return t=t?Math.max(0,Math.min(yt?K-1:K-ft,t)):0,I?t+Dt:t}function un(t){for(null==t&&(t=qt),I&&(t-=Dt);t<0;)t+=K;return Math.floor(t%K)}function ln(){var t,e=un();return t=ve?e:ot||rt?Math.ceil((e+1)*De/K-1):Math.floor(e/ft),!yt&&I&&qt===Gt&&(t=De-1),t}function sn(){return h.innerWidth||D.documentElement.clientWidth||D.body.clientWidth}function cn(t){return"top"===t?"afterbegin":"beforeend"}function fn(){var t=ut?2*ut-lt:0;return function t(e){var n,i,a=D.createElement("div");return e.appendChild(a),i=(n=a.getBoundingClientRect()).right-n.left,a.remove(),i||t(e.parentNode)}(Q)-t}function dn(t){if(O[t])return!0;if(k)for(var e in k)if(k[e][t])return!0;return!1}function vn(t,e){if(null==e&&(e=J),"items"===t&&ot)return Math.floor((st+lt)/(ot+lt))||1;var n=O[t];if(k)for(var i in k)e>=parseInt(i)&&t in k[i]&&(n=k[i][t]);return"slideBy"===t&&"page"===n&&(n=vn("items")),I||"slideBy"!==t&&"items"!==t||(n=Math.floor(n)),n}function pn(t,e,n,i,a){var r="";if(void 0!==t){var o=t;e&&(o-=e),r=q?"margin: 0 "+o+"px 0 "+t+"px;":"margin: "+t+"px 0 "+o+"px 0;"}else if(e&&!n){var u="-"+e+"px";r="margin: 0 "+(q?u+" 0 0":"0 "+u+" 0")+";"}return!I&&a&&x&&i&&(r+=xn(i)),r}function mn(t,e,n){return t?(t+e)*Ht+"px":y?y+"("+100*Ht+"% / "+n+")":100*Ht/n+"%"}function hn(t,e,n){var i;if(t)i=t+e+"px";else{I||(n=Math.floor(n));var a=I?Ht:n;i=y?y+"(100% / "+a+")":100/a+"%"}return i="width:"+i,"inner"!==R?i+";":i+" !important;"}function yn(t){var e="";!1!==t&&(e=(q?"padding-":"margin-")+(q?"right":"bottom")+": "+t+"px;");return e}function gn(t,e){var n=t.substring(0,t.length-e).toLowerCase();return n&&(n="-"+n+"-"),n}function xn(t){return gn(x,18)+"transition-duration:"+t/1e3+"s;"}function bn(t){return gn(b,17)+"animation-duration:"+t/1e3+"s;"}function Cn(){if(dn("autoHeight")||rt||!q){var t=G.querySelectorAll("img");qi(t,function(t){var e=t.src;e&&e.indexOf("data:image")<0?(ea(t,xe),t.src="",t.src=e,Vi(t,"loading")):St||zn(t)}),Oi(function(){jn(Ji(t),function(){Z=!0})}),!rt&&q&&(t=Fn(qt,Math.min(qt+ft-1,Ht-1))),St?wn():Oi(function(){jn(Ji(t),wn)})}else I&&ai(),Tn(),En()}function wn(){if(rt){var e=yt?qt:K-1;!function t(){Y[e-1].getBoundingClientRect().right.toFixed(2)===Y[e].getBoundingClientRect().left.toFixed(2)?Mn():setTimeout(function(){t()},16)}()}else Mn()}function Mn(){q&&!rt||(Yn(),rt?(Rt=ni(),ee&&(ne=Ln()),Gt=Ft(),an($t||ne)):Ni()),I&&ai(),Tn(),En()}function Tn(){if(Kn(),j.insertAdjacentHTML("afterbegin",'<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">'+Rn()+"</span>  of "+K+"</div>"),$=j.querySelector(".tns-liveregion .current"),pe){var t=Tt?"stop":"start";Xe?Yi(Xe,{"data-action":t}):O.autoplayButtonOutput&&(j.insertAdjacentHTML(cn(O.autoplayPosition),'<button data-action="'+t+'">'+Ke[0]+t+Ke[1]+At[0]+"</button>"),Xe=j.querySelector("[data-action]")),Xe&&ea(Xe,{click:yi}),Tt&&(mi(),Nt&&ea(G,oe),Lt&&ea(G,ue))}if(de){if(Se)Yi(Se,{"aria-label":"Carousel Pagination"}),qi(Be=Se.children,function(t,e){Yi(t,{"data-nav":e,tabindex:"-1","aria-label":ze+(e+1),"aria-controls":Zt})});else{for(var e="",n=ve?"":'style="display:none"',i=0;i<K;i++)e+='<button data-nav="'+i+'" tabindex="-1" aria-controls="'+Zt+'" '+n+' aria-label="'+ze+(i+1)+'"></button>';e='<div class="tns-nav" aria-label="Carousel Pagination">'+e+"</div>",j.insertAdjacentHTML(cn(O.navPosition),e),Se=j.querySelector(".tns-nav"),Be=Se.children}if(Bi(),x){var a=x.substring(0,x.length-18).toLowerCase(),r="transition: all "+mt/1e3+"s";a&&(r="-"+a+"-"+r),Wi(Bt,"[aria-controls^="+Zt+"-item]",r,Fi(Bt))}Yi(Be[Re],{"aria-label":ze+(Re+1)+We}),Ki(Be[Re],"tabindex"),Vi(Be[Re],Pe),ea(Se,re)}fe&&(Me||Ee&&Ae||(j.insertAdjacentHTML(cn(O.controlsPosition),'<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="'+Zt+'">'+bt[0]+'</button><button data-controls="next" tabindex="-1" aria-controls="'+Zt+'">'+bt[1]+"</button></div>"),Me=j.querySelector(".tns-controls")),Ee&&Ae||(Ee=Me.children[0],Ae=Me.children[1]),O.controlsContainer&&Yi(Me,{"aria-label":"Carousel Navigation",tabindex:"0"}),(O.controlsContainer||O.prevButton&&O.nextButton)&&Yi([Ee,Ae],{"aria-controls":Zt,tabindex:"-1"}),(O.controlsContainer||O.prevButton&&O.nextButton)&&(Yi(Ee,{"data-controls":"prev"}),Yi(Ae,{"data-controls":"next"})),Ce=Un(Ee),we=Un(Ae),$n(),Me?ea(Me,ae):(ea(Ee,ae),ea(Ae,ae))),Sn()}function En(){if(I&&C){var t={};t[C]=si,ea(G,t)}wt&&ea(G,se,O.preventScrollOnTouch),Mt&&ea(G,ce),pt&&ea(D,le),"inner"===R?Ut.on("outerResized",function(){Nn(),Ut.emit("innerLoaded",Si())}):(k||ot||rt||gt||!q)&&ea(h,{resize:An}),gt&&("outer"===R?Ut.on("innerLoaded",qn):$t||qn()),Pn(),$t?Hn():ne&&Dn(),Ut.on("indexChanged",Vn),"inner"===R&&Ut.emit("innerLoaded",Si()),"function"==typeof Jt&&Jt(Si()),U=!0}function An(t){Oi(function(){Nn(xi(t))})}function Nn(t){if(U){"outer"===R&&Ut.emit("outerResized",Si(t)),J=sn();var e,n=F,i=!1;k&&(Bn(),(e=n!==F)&&Ut.emit("newBreakpointStart",Si(t)));var a,r,o,u,l=ft,s=$t,c=ne,f=pt,d=xt,v=Ct,p=wt,m=Mt,h=Tt,y=Nt,g=Lt,x=qt;if(e){var b=ot,C=gt,w=bt,M=ct,T=At;if(!H)var E=lt,A=ut}if(pt=vn("arrowKeys"),xt=vn("controls"),Ct=vn("nav"),wt=vn("touch"),ct=vn("center"),Mt=vn("mouseDrag"),Tt=vn("autoplay"),Nt=vn("autoplayHoverPause"),Lt=vn("autoplayResetOnVisibility"),e&&($t=vn("disable"),ot=vn("fixedWidth"),mt=vn("speed"),gt=vn("autoHeight"),bt=vn("controlsText"),At=vn("autoplayText"),Et=vn("autoplayTimeout"),H||(ut=vn("edgePadding"),lt=vn("gutter"))),an($t),st=fn(),q&&!rt||$t||(Yn(),q||(Ni(),i=!0)),(ot||rt)&&(Rt=ni(),Gt=Ft()),(e||ot)&&(ft=vn("items"),dt=vn("slideBy"),(r=ft!==l)&&(ot||rt||(Gt=Ft()),en())),e&&$t!==s&&($t?Hn():function(){if(!te)return;if(Bt.disabled=!1,G.className+=_t,ai(),yt)for(var t=Dt;t--;)I&&_i(Y[t]),_i(Y[Ht-t-1]);if(!I)for(var e=qt,n=qt+K;e<n;e++){var i=Y[e],a=e<qt+ft?P:W;i.style.left=100*(e-qt)/ft+"%",Vi(i,a)}On(),te=!1}()),ee&&(e||ot||rt)&&(ne=Ln())!==c&&(ne?(ri(ii(on(0))),Dn()):(!function(){if(!ie)return;ut&&H&&(V.style.margin="");if(Dt)for(var t="tns-transparent",e=Dt;e--;)I&&Gi(Y[e],t),Gi(Y[Ht-e-1],t);On(),ie=!1}(),i=!0)),an($t||ne),Tt||(Nt=Lt=!1),pt!==f&&(pt?ea(D,le):na(D,le)),xt!==d&&(xt?Me?_i(Me):(Ee&&_i(Ee),Ae&&_i(Ae)):Me?Ui(Me):(Ee&&Ui(Ee),Ae&&Ui(Ae))),Ct!==v&&(Ct?_i(Se):Ui(Se)),wt!==p&&(wt?ea(G,se,O.preventScrollOnTouch):na(G,se)),Mt!==m&&(Mt?ea(G,ce):na(G,ce)),Tt!==h&&(Tt?(Xe&&_i(Xe),qe||Ve||mi()):(Xe&&Ui(Xe),qe&&hi())),Nt!==y&&(Nt?ea(G,oe):na(G,oe)),Lt!==g&&(Lt?ea(D,ue):na(D,ue)),e){if(ot===b&&ct===M||(i=!0),gt!==C&&(gt||(V.style.height="")),xt&&bt!==w&&(Ee.innerHTML=bt[0],Ae.innerHTML=bt[1]),Xe&&At!==T){var N=Tt?1:0,L=Xe.innerHTML,B=L.length-T[N].length;L.substring(B)===T[N]&&(Xe.innerHTML=L.substring(0,B)+At[N])}}else ct&&(ot||rt)&&(i=!0);if((r||ot&&!rt)&&(De=Li(),Bi()),(a=qt!==x)?(Ut.emit("indexChanged",Si()),i=!0):r?a||Vn():(ot||rt)&&(Pn(),Kn(),kn()),r&&!I&&function(){for(var t=qt+Math.min(K,ft),e=Ht;e--;){var n=Y[e];qt<=e&&e<t?(Vi(n,"tns-moving"),n.style.left=100*(e-qt)/ft+"%",Vi(n,P),Gi(n,W)):n.style.left&&(n.style.left="",Vi(n,W),Gi(n,P)),Gi(n,z)}setTimeout(function(){qi(Y,function(t){Gi(t,"tns-moving")})},300)}(),!$t&&!ne){if(e&&!H&&(gt===autoheightTem&&mt===speedTem||Gn(),ut===A&&lt===E||(V.style.cssText=pn(ut,lt,ot,mt,gt)),q)){I&&(G.style.width=mn(ot,lt,ft));var S=hn(ot,lt,ft)+yn(lt);u=Fi(o=Bt)-1,"deleteRule"in o?o.deleteRule(u):o.removeRule(u),Wi(Bt,"#"+Zt+" > .tns-item",S,Fi(Bt))}gt&&qn(),i&&(ai(),jt=qt)}e&&Ut.emit("newBreakpointEnd",Si(t))}}function Ln(){if(!ot&&!rt)return K<=(ct?ft-(ft-1)/2:ft);var t=ot?(ot+lt)*K:_[K],e=ut?st+2*ut:st+lt;return ct&&(e-=ot?(st-ot)/2:(st-(_[qt+1]-_[qt]-lt))/2),t<=e}function Bn(){for(var t in F=0,k)(t=parseInt(t))<=J&&(F=t)}function Sn(){!Tt&&Xe&&Ui(Xe),!Ct&&Se&&Ui(Se),xt||(Me?Ui(Me):(Ee&&Ui(Ee),Ae&&Ui(Ae)))}function On(){Tt&&Xe&&_i(Xe),Ct&&Se&&_i(Se),xt&&(Me?_i(Me):(Ee&&_i(Ee),Ae&&_i(Ae)))}function Dn(){if(!ie){if(ut&&(V.style.margin="0px"),Dt)for(var t="tns-transparent",e=Dt;e--;)I&&Vi(Y[e],t),Vi(Y[Ht-e-1],t);Sn(),ie=!0}}function Hn(){if(!te){if(Bt.disabled=!0,G.className=G.className.replace(_t.substring(1),""),Ki(G,["style"]),yt)for(var t=Dt;t--;)I&&Ui(Y[t]),Ui(Y[Ht-t-1]);if(q&&I||Ki(V,["style"]),!I)for(var e=qt,n=qt+K;e<n;e++){var i=Y[e];Ki(i,["style"]),Gi(i,P),Gi(i,W)}Sn(),te=!0}}function kn(){var t=Rn();$.innerHTML!==t&&($.innerHTML=t)}function Rn(){var t=In(),e=t[0]+1,n=t[1]+1;return e===n?e+"":e+" to "+n}function In(t){null==t&&(t=ii());var n,i,a,r=qt;if(ct||ut?(rt||ot)&&(i=-(parseFloat(t)+ut),a=i+st+2*ut):rt&&(i=_[qt],a=i+st),rt)_.forEach(function(t,e){e<Ht&&((ct||ut)&&t<=i+.5&&(r=e),.5<=a-t&&(n=e))});else{if(ot){var e=ot+lt;ct||ut?(r=Math.floor(i/e),n=Math.ceil(a/e-1)):n=r+Math.ceil(st/e)-1}else if(ct||ut){var o=ft-1;if(ct?(r-=o/2,n=qt+o/2):n=qt+o,ut){var u=ut*ft/st;r-=u,n+=u}r=Math.floor(r),n=Math.ceil(n)}else n=r+ft-1;r=Math.max(r,0),n=Math.min(n,Ht-1)}return[r,n]}function Pn(){St&&!$t&&Fn.apply(null,In()).forEach(function(t){if(!ji(t,ge)){var e={};e[C]=function(t){t.stopPropagation()},ea(t,e),ea(t,xe),t.src=Xi(t,"data-src");var n=Xi(t,"data-srcset");n&&(t.srcset=n),Vi(t,"loading")}})}function zn(t){Vi(t,"loaded"),Wn(t)}function Wn(t){Vi(t,"tns-complete"),Gi(t,"loading"),na(t,xe)}function Fn(t,e){for(var n=[];t<=e;)qi(Y[t].querySelectorAll("img"),function(t){n.push(t)}),t++;return n}function qn(){var t=Fn.apply(null,In());Oi(function(){jn(t,Xn)})}function jn(n,t){return Z?t():(n.forEach(function(t,e){ji(t,ge)&&n.splice(e,1)}),n.length?void Oi(function(){jn(n,t)}):t())}function Vn(){Pn(),Kn(),kn(),$n(),function(){if(Ct&&(Re=0<=ke?ke:ln(),ke=-1,Re!==Ie)){var t=Be[Ie],e=Be[Re];Yi(t,{tabindex:"-1","aria-label":ze+(Ie+1)}),Gi(t,Pe),Yi(e,{"aria-label":ze+(Re+1)+We}),Ki(e,"tabindex"),Vi(e,Pe),Ie=Re}}()}function Gn(){I&&gt&&(S.style[x]=mt/1e3+"s")}function Qn(t,e){for(var n=[],i=t,a=Math.min(t+e,Ht);i<a;i++)n.push(Y[i].offsetHeight);return Math.max.apply(null,n)}function Xn(){var t=gt?Qn(qt,ft):Qn(Dt,K),e=S||V;e.style.height!==t&&(e.style.height=t+"px")}function Yn(){_=[0];var n=q?"left":"top",i=q?"right":"bottom",a=Y[0].getBoundingClientRect()[n];qi(Y,function(t,e){e&&_.push(t.getBoundingClientRect()[n]-a),e===Ht-1&&_.push(t.getBoundingClientRect()[i]-a)})}function Kn(){var t=In(),n=t[0],i=t[1];qi(Y,function(t,e){n<=e&&e<=i?Qi(t,"aria-hidden")&&(Ki(t,["aria-hidden","tabindex"]),Vi(t,ye)):Qi(t,"aria-hidden")||(Yi(t,{"aria-hidden":"true",tabindex:"-1"}),Gi(t,ye))})}function Jn(t){return t.nodeName.toLowerCase()}function Un(t){return"button"===Jn(t)}function _n(t){return"true"===t.getAttribute("aria-disabled")}function Zn(t,e,n){t?e.disabled=n:e.setAttribute("aria-disabled",n.toString())}function $n(){if(xt&&!ht&&!yt){var t=Ce?Ee.disabled:_n(Ee),e=we?Ae.disabled:_n(Ae),n=qt<=Vt,i=!ht&&Gt<=qt;n&&!t&&Zn(Ce,Ee,!0),!n&&t&&Zn(Ce,Ee,!1),i&&!e&&Zn(we,Ae,!0),!i&&e&&Zn(we,Ae,!1)}}function ti(t,e){x&&(t.style[x]=e)}function ei(t){return null==t&&(t=qt),rt?(st-(ut?lt:0)-(_[t+1]-_[t]-lt))/2:ot?(st-ot)/2:(ft-1)/2}function ni(){var t=st+(ut?lt:0)-(ot?(ot+lt)*Ht:_[Ht]);return ct&&!yt&&(t=ot?-(ot+lt)*(Ht-1)-ei():ei(Ht-1)-_[Ht-1]),0<t&&(t=0),t}function ii(t){var e;if(null==t&&(t=qt),q&&!rt)if(ot)e=-(ot+lt)*t,ct&&(e+=ei());else{var n=d?Ht:ft;ct&&(t-=ei()),e=100*-t/n}else e=-_[t],ct&&rt&&(e+=ei());return kt&&(e=Math.max(e,Rt)),e+=!q||rt||ot?"px":"%"}function ai(t){ti(G,"0s"),ri(t)}function ri(t){null==t&&(t=ii()),G.style[Pt]=zt+t+Wt}function oi(t,e,n,i){var a=t+ft;yt||(a=Math.min(a,Ht));for(var r=t;r<a;r++){var o=Y[r];i||(o.style.left=100*(r-qt)/ft+"%"),B&&p&&(o.style[p]=o.style[m]=B*(r-t)/1e3+"s"),Gi(o,e),Vi(o,n),i&&Ot.push(o)}}function ui(t,e){It&&en(),(qt!==jt||e)&&(Ut.emit("indexChanged",Si()),Ut.emit("transitionStart",Si()),gt&&qn(),qe&&t&&0<=["click","keydown"].indexOf(t.type)&&hi(),Kt=!0,nn())}function li(t){return t.toLowerCase().replace(/-/g,"")}function si(t){if(I||Kt){if(Ut.emit("transitionEnd",Si(t)),!I&&0<Ot.length)for(var e=0;e<Ot.length;e++){var n=Ot[e];n.style.left="",m&&p&&(n.style[m]="",n.style[p]=""),Gi(n,z),Vi(n,W)}if(!t||!I&&t.target.parentNode===G||t.target===G&&li(t.propertyName)===li(Pt)){if(!It){var i=qt;en(),qt!==i&&(Ut.emit("indexChanged",Si()),ai())}"inner"===R&&Ut.emit("innerLoaded",Si()),Kt=!1,jt=qt}}}function ci(t,e){if(!ne)if("prev"===t)fi(e,-1);else if("next"===t)fi(e,1);else{if(Kt){if(Qt)return;si()}var n=un(),i=0;if("first"===t?i=-n:"last"===t?i=I?K-ft-n:K-1-n:("number"!=typeof t&&(t=parseInt(t)),isNaN(t)||(e||(t=Math.max(0,Math.min(K-1,t))),i=t-n)),!I&&i&&Math.abs(i)<ft){var a=0<i?1:-1;i+=Vt<=qt+i-K?K*a:2*K*a*-1}qt+=i,I&&yt&&(qt<Vt&&(qt+=K),Gt<qt&&(qt-=K)),un(qt)!==un(jt)&&ui(e)}}function fi(t,e){if(Kt){if(Qt)return;si()}var n;if(!e){for(var i=bi(t=xi(t));i!==Me&&[Ee,Ae].indexOf(i)<0;)i=i.parentNode;var a=[Ee,Ae].indexOf(i);0<=a&&(n=!0,e=0===a?-1:1)}if(ht){if(qt===Vt&&-1===e)return void ci("last",t);if(qt===Gt&&1===e)return void ci("first",t)}e&&(qt+=dt*e,rt&&(qt=Math.floor(qt)),ui(n||t&&"keydown"===t.type?t:null))}function di(){Fe=setInterval(function(){fi(null,Qe)},Et),qe=!0}function vi(){clearInterval(Fe),qe=!1}function pi(t,e){Yi(Xe,{"data-action":t}),Xe.innerHTML=Ke[0]+t+Ke[1]+e}function mi(){di(),Xe&&pi("stop",At[1])}function hi(){vi(),Xe&&pi("start",At[0])}function yi(){qe?(hi(),Ve=!0):(mi(),Ve=!1)}function gi(t){t.focus()}function xi(t){return Ci(t=t||h.event)?t.changedTouches[0]:t}function bi(t){return t.target||h.event.srcElement}function Ci(t){return 0<=t.type.indexOf("touch")}function wi(t){t.preventDefault?t.preventDefault():t.returnValue=!1}function Mi(){return a=Ze.y-_e.y,r=Ze.x-_e.x,t=Math.atan2(a,r)*(180/Math.PI),e=Xt,n=!1,i=Math.abs(90-Math.abs(t)),90-e<=i?n="horizontal":i<=e&&(n="vertical"),n===O.axis;var t,e,n,i,a,r}function Ti(t){if(Kt){if(Qt)return;si()}Tt&&qe&&vi(),$e=!0,Ue&&(Di(Ue),Ue=null);var e=xi(t);Ut.emit(Ci(t)?"touchStart":"dragStart",Si(t)),!Ci(t)&&0<=["img","a"].indexOf(Jn(bi(t)))&&wi(t),Ze.x=_e.x=e.clientX,Ze.y=_e.y=e.clientY,I&&(Je=parseFloat(G.style[Pt].replace(zt,"")),ti(G,"0s"))}function Ei(t){if($e){var e=xi(t);Ze.x=e.clientX,Ze.y=e.clientY,I?Ue||(Ue=Oi(function(){!function t(e){if(!Yt)return void($e=!1);Di(Ue);$e&&(Ue=Oi(function(){t(e)}));"?"===Yt&&(Yt=Mi());if(Yt){!be&&Ci(e)&&(be=!0);try{e.type&&Ut.emit(Ci(e)?"touchMove":"dragMove",Si(e))}catch(t){}var n=Je,i=tn(Ze,_e);if(!q||ot||rt)n+=i,n+="px";else{var a=d?i*ft*100/((st+lt)*Ht):100*i/(st+lt);n+=a,n+="%"}G.style[Pt]=zt+n+Wt}}(t)})):("?"===Yt&&(Yt=Mi()),Yt&&(be=!0)),be&&t.preventDefault()}}function Ai(i){if($e){Ue&&(Di(Ue),Ue=null),I&&ti(G,""),$e=!1;var t=xi(i);Ze.x=t.clientX,Ze.y=t.clientY;var a=tn(Ze,_e);if(Math.abs(a)){if(!Ci(i)){var n=bi(i);ea(n,{click:function t(e){wi(e),na(n,{click:t})}})}I?Ue=Oi(function(){if(q&&!rt){var t=-a*ft/(st+lt);t=0<a?Math.floor(t):Math.ceil(t),qt+=t}else{var e=-(Je+a);if(e<=0)qt=Vt;else if(e>=_[Ht-1])qt=Gt;else for(var n=0;n<Ht&&e>=_[n];)e>_[qt=n]&&a<0&&(qt+=1),n++}ui(i,a),Ut.emit(Ci(i)?"touchEnd":"dragEnd",Si(i))}):Yt&&fi(i,0<a?-1:1)}}"auto"===O.preventScrollOnTouch&&(be=!1),Xt&&(Yt="?"),Tt&&!qe&&di()}function Ni(){(S||V).style.height=_[qt+ft]-_[qt]+"px"}function Li(){var t=ot?(ot+lt)*K/st:K/ft;return Math.min(Math.ceil(t),K)}function Bi(){if(Ct&&!ve&&De!==He){var t=He,e=De,n=_i;for(De<He&&(t=De,e=He,n=Ui);t<e;)n(Be[t]),t++;He=De}}function Si(t){return{container:G,slideItems:Y,navContainer:Se,navItems:Be,controlsContainer:Me,hasControls:fe,prevButton:Ee,nextButton:Ae,items:ft,slideBy:dt,cloneCount:Dt,slideCount:K,slideCountNew:Ht,index:qt,indexCached:jt,displayIndex:rn(),navCurrentIndex:Re,navCurrentIndexCached:Ie,pages:De,pagesCached:He,sheet:Bt,isOn:U,event:t||{}}}M&&console.warn("No slides found in",O.container)};return aa}();
//# sourceMappingURL=../sourcemaps/tiny-slider.js.map

Array.prototype.forEach||(Array.prototype.forEach=function(e,t){for(var n=this.length>>>0,r=0;r<n;r++)r in this&&e.call(t,this[r],r,this)}),Array.prototype.map||(Array.prototype.map=function(e){var t=this.length>>>0;if("function"!=typeof e)throw new TypeError;for(var n=new Array(t),r=arguments[1],o=0;o<t;o++)o in this&&(n[o]=e.call(r,this[o],o,this));return n}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){var t=this.length;if(!t)return-1;var n=arguments[1]||0;if(t<=n)return-1;for(n<0&&(n+=t);n<t;n++)if(Object.prototype.hasOwnProperty.call(this,n)&&e===this[n])return n;return-1}),function(){if(!Element.prototype.addEventListener){var p=[],e=function(e,t){var n=this,r=function(e){e.target=e.srcElement,e.currentTarget=n,void 0!==t.handleEvent?t.handleEvent(e):t.call(n,e)};if("DOMContentLoaded"==e){var o=function(e){"complete"==document.readyState&&r(e)};if(document.attachEvent("onreadystatechange",o),p.push({object:this,type:e,listener:t,wrapper:o}),"complete"==document.readyState){var i=new Event;i.srcElement=window,o(i)}}else this.attachEvent("on"+e,r),p.push({object:this,type:e,listener:t,wrapper:r})},t=function(e,t){for(var n=0;n<p.length;){var r=p[n];if(r.object==this&&r.type==e&&r.listener==t){"DOMContentLoaded"==e?this.detachEvent("onreadystatechange",r.wrapper):this.detachEvent("on"+e,r.wrapper),p.splice(n,1);break}++n}};Element.prototype.addEventListener=e,Element.prototype.removeEventListener=t,HTMLDocument&&(HTMLDocument.prototype.addEventListener=e,HTMLDocument.prototype.removeEventListener=t),Window&&(Window.prototype.addEventListener=e,Window.prototype.removeEventListener=t)}}(),"firstElementChild"in document.documentElement||Object.defineProperty(Element.prototype,"firstElementChild",{get:function(){for(var e,t=this.children,n=0,r=t.length;n<r;++n)if(1===(e=t[n]).nodeType)return e;return null}}),"previousElementSibling"in document.documentElement||Object.defineProperty(Element.prototype,"previousElementSibling",{get:function(){for(var e=this.previousSibling;e&&1!==e.nodeType;)e=e.previousSibling;return e}}),"nextElementSibling"in document.documentElement||Object.defineProperty(Element.prototype,"nextElementSibling",{get:function(){for(var e=this.nextSibling;e&&1!==e.nodeType;)e=e.nextSibling;return e}}),window.getComputedStyle||(window.getComputedStyle=function(e){if(!e)return null;var t=e.currentStyle,n=e.getBoundingClientRect(),r=document.createElement("div").style;for(var o in t)r[o]=t[o];return r.cssFloat=r.styleFloat,"auto"===r.width&&(r.width=n.right-n.left+"px"),"auto"===r.height&&(r.height=n.bottom-n.top+"px"),r});
//# sourceMappingURL=../sourcemaps/tiny-slider.helper.ie8.js.map

////////////// Helper functions
//
// _q(element) _qAll(elements) removeClass(element, className) addClass(element,
// className) nextElementSibling(element) getRandomInt(min, max)
// roundToPrecision(x, precision) parseStrToFloat(string_to_convert)
var _q = function (argument) {
	return document.querySelector(argument)
};
var _qAll = function (argument) {
	return document.querySelectorAll(argument)
};
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
function nextElementSibling(el) {
	do {
		el = el.nextSibling
	} while (el && el.nodeType !== 1);
	return el
}
function getRandomInt(min, max) {
	var temp;
	if (min > max) {
		temp = min;
		min = max;
		max = temp
	}
	temp = (max + 1) - min;
	return Math.floor(Math.random() * Math.floor(temp)) + min
}
function roundToPrecision(x, precision) {
	var y = +x + (precision === undefined
		? 0.5
		: precision / 2);
	return y - (y % (precision === undefined
		? 1
		: + precision))
}
function parseStrToFloat(string_to_convert) {
	if (typeof string_to_convert === 'string' || string_to_convert instanceof String) {
		string_to_convert = string_to_convert.trim()
	}
	return parseFloat(string_to_convert)
}(function () {
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
// Add new function for image
// Todo: Convert into regular function
var ajaxImage = Image.prototype.load = function (index, url, callback, bytes) {
	var thisImg = this;
	var xmlHTTP = new XMLHttpRequest();

	// If index is img element
	if(isNaN(index)) {
		thisImg.completedPercentage = 0;
		thisImg = index;
	}

	thisImg.src = "";
	xmlHTTP.open('GET', url, true);
	xmlHTTP.responseType = 'arraybuffer';
	xmlHTTP.onload = function (e) {
		var blob = new Blob([this.response]);
		thisImg.src = window
			.URL
			.createObjectURL(blob)
	};
	xmlHTTP.onprogress = function (e) {
		thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
		if (thisImg.completedPercentage >= 100) {
			thisImg.src = url
		}
		callback(index, url, thisImg.completedPercentage, e.total)
	};
	xmlHTTP.onloadstart = function () {
		thisImg.completedPercentage = 0
	};
	xmlHTTP.send()
};
Image.prototype.completedPercentage = 0;
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
// General variables
var dark_mode = false,
	logo_svg = _q(".logo").innerHTML,
	// Variables for barba views
	current_barba = null,
	controller = new ScrollMagic.Controller(),
	els = null,
	anim = null,
	tl = null,
	tinysliders = [];

// Put mandatory html stuff
_q("body").innerHTML += '<div id="click-cover"></div><div class="support"><div class="cm__table"><div class="cm__cell"><div class="content"><h1>😭</h1><h3>Please don\'t squaze me 😱.</h3><h4>Have mercy on me 👦🏾.</h4><p>I think your screen is just to small for me to support it.</p><p>Please rotate your screen📱 or resize your browser 💻 if posible for better layout.</p></div></div></div></div><div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div> <button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"> </button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"> </button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div><div id="conlog"></div>';
function htmllog(param) {
	_q("#conlog").innerHTML += (param + "<br/>");
}

// Splitting text

var splitText = function (el) {
	var split;
	split = el.innerText.split(" ");
	el.innerHTML = "";
	for (var i = 0; i < split.length; i++) {
		split[i] = "<div class='text" + i + "'>" + split[i] + "</div> ";
		el.innerHTML += split[i];
	}
}

// Snoop which text or url that are currently clicked
var clicked_target = null,
	clicked_text = "";
document.addEventListener('click', function (e) {
	e = e || window.event;
	clicked_target = e.target || e.srcElement;
	clicked_text = clicked_target.textContent || clicked_target.innerText;
}, false);

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

///////////////////// Menu Functionality

var menu = {
	active: false,
	el: null,
	init: function () {
		var that = this;

		gsap.set('.menu__pop .menu__item', {opacity: 0});

		// The bright/dark mode switcher
		this.el = _q('#mode');
		gsap.set(this.el.querySelector("#ray"), {transformOrigin: "center center"})
		this.el.onclick = function (e) {
			if (!dark_mode) {
				dark_mode = true;
				addClass(_q("html"), "dark");
			} else {
				dark_mode = false;
				removeClass(_q("html"), "dark");
			}

			e.preventDefault();
		}
		this.el.onmouseenter = function () {
			gsap.to(this.querySelector("#ray"), {
				duration: .512,
				ease: "expo",
				rotation: 180,
				scale: 1.1
			});
		}
		this.el.onmouseleave = function () {
			gsap.to(this.querySelector("#ray"), {
				duration: .512,
				ease: "expo",
				rotation: 0,
				scale: 1
			});
		}

		// The main menu events
		this.el = _q('.menu__pop > a');
		gsap.set(this.el.querySelector("#menu-short"), {x: -7.5});
		this.el.onclick = function (e) {
			var tl = gsap.timeline({
				defaults: {
					duration: .768,
					ease: "expo.out"
				}
			});

			addClass(this.parentNode, "active");
			that.active = true;

			tl.fromTo('.menu__pop .menu__item', {
				yPercent: 0,
				xPercent: 0,
				opacity: 0
			}, {
				yPercent: 0,
				opacity: 1,
				scaleY: 1
			}).fromTo('.menu__pop .menu__item ul li, .menu__pop .menu__item .border', {
				transformOrigin: "0 0",
				xPercent: 200,
				opacity: 0
			}, {
				xPercent: 0,
				opacity: 1,
				stagger: {
					from: 0,
					amount: .128
				}
			}, .128);

			e.preventDefault();
		}
		this.el.onmouseenter = function () {
			gsap.to(this.querySelector("#menu-short"), {
				duration: .512,
				ease: "expo",
				x: 0
			});
		}
		this.el.onmouseleave = function () {
			gsap.to(this.querySelector("#menu-short"), {
				duration: .512,
				ease: "expo",
				x: -7.5
			});
		}

		// The logo events
		this.el = _q('.logo');
		this.el.onmouseenter = function () {
			gsap.to(".logo .hat", {
				transformOrigin: "50% 75%",
				yPercent: -3,
				xPercent: -1,
				rotation: 4,
				duration: 1.024,
				ease: "elastic.out"
			})
		}
		this.el.onmouseleave = function () {
			gsap.to(".logo .hat", {
				transformOrigin: "50% 75%",
				yPercent: 0,
				xPercent: 0,
				rotation: 0,
				duration: 1.024,
				ease: "elastic.out"
			});
		}

		// The main menu hover item animation
		var border = ".menu__item .border",
			borderRadius,
			_hugeText = new hugeText(border + " > div ");
		for (var i = 2; i <= 6; i++) {
			if (i == 5)
				i = 6;

			this.el = _q('.menu__pop .menu__item li:nth-child(' + i + ') a');

			if (i == 2)
				this.el.borderRadius = "25% 2% 2% 2%";
			else if (i == 3)
				this.el.borderRadius = "2% 25% 2% 2%";
			else if (i == 4)
				this.el.borderRadius = "2% 2% 25% 2%";
			else
				this.el.borderRadius = "2% 2% 2% 25%";

			this.el.onmouseenter = function () {
				gsap.to(border, {
					duration: .386,
					ease: "expo",
					borderRadius: this.borderRadius
				});
				_hugeText.show(this.innerHTML);
			}
			this.el.onmouseleave = function () {
				gsap.to(border, {
					duration: .386,
					ease: "expo",
					borderRadius: "2% 2% 2% 2%"
				});
				_hugeText.hide();
			}
		}

		// The main menu close events
		this.el = _q('.menu__item .close span');
		this.el.onclick = function (e) {
			var tl = gsap.timeline({
				defaults: {
					duration: .512,
					ease: "expo.in"
				}
			});
			tl.fromTo('.menu__pop .menu__item ul li, .menu__pop .menu__item .border', {
				xPercent: 0,
				opacity: 1
			}, {
				xPercent: -200,
				opacity: 0,
				stagger: {
					from: 0,
					amount: .128
				}
			}).fromTo('.menu__pop .menu__item', {
				yPercent: 0,
				xPercent: 0,
				opacity: 1
			}, {
				opacity: 0
			}, .128);
			removeClass(this.parentNode.parentNode.parentNode.parentNode.parentNode, "active");
			that.active = false;

			e.preventDefault();
		}
		this.el.onmouseover = function () {
			gsap.to(this.querySelector(".icn_close"), {
				duration: .512,
				ease: "expo.out",
				rotation: 90
			});
		}
		this.el.onmouseout = function () {
			gsap.to(this.querySelector(".icn_close"), {
				duration: .512,
				ease: "expo.in",
				rotation: 0
			});
		}

		// Lang events
		this.el = _qAll('.lang li a');
		for (var i = this.el.length - 1; i >= 0; i--) {
			gsap.set(this.el[i].nextElementSibling || nextElementSibling(this.el[i]), {
				opacity: 0,
				marginTop: 50
			});

			this.el[i].onclick = function (e) {
				e.preventDefault();
			}
			this.el[i].onmouseenter = function () {
				gsap.to(this.nextElementSibling || nextElementSibling(this), { duration: .386, ease: "elastic.out", opacity: 1, marginTop: 10, onComplete: function() {
					gsap.to(".lang .chat__bubble", { duration: .128, ease: "ease.out", opacity: 0, marginTop: 50, delay: 1.024 });
				}});
			}
			this.el[i].onmouseleave = function () {
				gsap.to(".lang .chat__bubble", { duration: .128, ease: "ease.out", opacity: 0, marginTop: 50 });
			}
		}
	}
}

//////////////////// Loading animation

var loading = {
	selector: _q("#loading-cover"),
	breath: gsap.timeline({repeat: -1, ease: "linear"}),
	float: gsap.timeline({repeat: -1, ease: "ease", duration: .512}),
	init: function () {
		var el = "";

		gsap.set(this.selector, { top: 0, bottom: 0, left: 0, right: 0 });

		// Some floating animation for loading-cover
		el = "#loading-cover";
		this.breath
			.to(el, {transformOrigin: "50%",scale: 1, duration: .9})
			.to(el, {scale: 1.15,duration: 1.7})
			.to(el, {scale: 1.15,duration: .6})
			.to(el, {scale: 1,duration: 1.7});
		this.breath.pause();

		// Some floating animation for hero image
		el = ".loading > div";
		this.float
			.fromTo(el, { yPercent: -10 }, { yPercent: 10, duration: 1.024 })
			.fromTo(el, { yPercent: 10 }, { yPercent: -10, duration: 1.024 })
			.fromTo(el, { yPercent: -10 }, {yPercent: 5})
			.fromTo(el, { yPercent: 5 }, {yPercent: -5})
			.fromTo(el, { yPercent: -5 }, { yPercent: 10, duration: .768 })
			.fromTo(el, { yPercent: 10 }, { yPercent: -10, duration: 1.024 });
	},
	show: function (callback) {
		var that = this,
			var_from = { xPercent: 0, yPercent: 100 },
			var_to = { xPercent: 0, yPercent: 0, duration: .768, ease: "expo.inOut", onComplete: function () {
					if (callback != undefined)
						callback();
					}
				};

		_q("#click-cover").style.display = "block";

		if (menu.active) {
			var_from.xPercent = 100;
			var_from.yPercent = 0;
			var_to.xPercent = 0;
			var_to.yPercent = 0;
			var_to.ease = "expo.inOut";
		}

		removeClass(_q('.menu__pop'), 'active');
		menu.active = false;

		// Hide loading
		if (clicked_text == "See All") {
			var_from = {
				xPercent: -100,
				yPercent: 0
			};
		} else if (clicked_text == "Back") {
			var_from = {
				xPercent: 100,
				yPercent: 0
			};
		}

		if (_q("[data-namespace]").getAttribute("data-namespace") == "call") {
			var tl = gsap.timeline({ defaults: { duration: .386, ease: "expo" }}),
				sl = that.selector;

			window.aspectRatio.onchange = null;

			removeClass(sl, "bubble");
			tl
				.set(sl, {zIndex: 666})
				.set(sl.querySelector(".light"), { height: 0 })
				.to(sl.querySelector(".text"), { opacity: 0 })
				.fromTo(sl.querySelector(".loading"), { opacity: 0, yPercent: 100 }, { opacity: 1, y: 0, yPercent: -50 }, 0)
				.to(sl, { position: "fixed", top: 0, right: 0, width: window.innerWidth, height: window.innerHeight, borderRadius: 0, duration: .768, ease: "expo.inOut", onComplete: function () {
					gsap.set(sl, { top: 0, bottom: 0, left: 0, right: 0, width: "auto", height: "auto" });
					if (callback != undefined) callback();
				}}, "-=.512");
		} else {
			gsap.fromTo(this.selector, var_from, var_to);
		}
	},
	hide: function (callback, callback__half) {
		var that = this,
			var_from = { xPercent: 0, yPercent: 0 },
			var_to = { xPercent: 0, yPercent: -100, duration: 1.024, ease: "expo.inOut", onComplete: function () {
					// Move loading
					gsap.set(that.selector, { yPercent: -200 });
					// Set progress bar back to zero
					that.update({duration: 0, height: 0});
					// Unhide loading
					gsap.set(that.selector.querySelector(".loading"), {opacity: 1});
					// Run callback
					if (callback != undefined)
						callback();
					}
				};

		// Hide loading
		if (clicked_text == "See All") {
			var_to.xPercent = -100;
			var_to.yPercent = 0;
		} else if (clicked_text == "Back") {
			var_to.xPercent = 100;
			var_to.yPercent = 0;
		}

		if (_q("[data-namespace]").getAttribute("data-namespace") == "call") {
			var tl = gsap.timeline({ defaults: { duration: .386, ease: "expo.inOut" }}),
				sl = that.selector,
				size = 0;

			window.aspectRatio = window.matchMedia("(max-aspect-ratio: 1/1)");
			window.aspectRatio.size = function(set) {
				var size = sl.querySelector(".loading").offsetWidth + (sl.querySelector(".loading").offsetWidth / 2);
				if (this.matches) size = sl.querySelector(".loading").offsetHeight + (sl.querySelector(".loading").offsetHeight / 2);
				if (set) gsap.to(sl, { width: size, height: size, duration: .512 });
				return size;
			}
			size = window.aspectRatio.size();
			window.aspectRatio.onchange = function() {
				size = window.aspectRatio.size(true);
			}

			tl
				.to(sl.querySelector(".loading"), { opacity: 0 }, 0)
				.to(sl.querySelector(".text"), { margin: 0, onComplete: function () {
						addClass(sl, "bubble");
						gsap.set(sl.querySelector(".text"), { opacity: 1 })
						sl.querySelector(".text").innerHTML = "<p class='hi'>hi!</p>";
					}}, 0)
				.to(sl, { width: size, height: size, top: "17.5vh", left: "initial", right: "11.5vw", borderRadius: "1000px", duration: .768 }, 0)
				.set(sl, { zIndex: 1 });

			if (callback != undefined) callback();
		} else {
			gsap.fromTo(that.selector, var_from, var_to);
			gsap.fromTo(that.selector, { scale: 1 }, { scale: 1, duration: var_to.duration / 3, onComplete: function() {
				if (callback__half != undefined) callback__half();
			}});
		}

		_q("#click-cover").style.display = "none";
	},
	update: function (percent) {
		gsap.to("#loading-cover .loading .light", percent);
	},
	animate: function (view, callback) {
		var animate = false;

		switch (view) {
			case "first-time":
				this.selector.querySelector(".text").innerHTML = "<div class='hi'><h1>hello!</h1></div><div class='dwan'><h2>this is dwan</h2></div>";
				animate = true;
				break;
			case "404":
				this.selector.querySelector(".text").innerHTML = "<div class='hi'><h1>oh 🦀,</h1></div><div class='dwan'><h2>you lost! 😢</h2></div>";
				animate = true;
				break;
			default:
				animate = false;
				break;
		}

		if (animate) {
			if (callback == undefined) {
				callback = function () {}
			}
			var lv = "#loading-cover",
				tl = gsap.timeline({
					defaults: {
						duration: .768,
						ease: "expo.out"
					}
				});
			tl
				.set(lv + " .text", {opacity: 1})
				.to(lv + " .left-hand", { transformOrigin: "99% 0", duration: .256, ease: "expo", yPercent: 35, rotation: 65 })
				.to(lv + " .right-hand", { transformOrigin: "1% 0", duration: .256, ease: "expo", yPercent: 35, rotation: -65 }, "-=.256")
				.fromTo(lv + " .loading", { opacity: 1 }, { opacity: 0 }, "+=.512")
				.fromTo(lv + " .hi h1", { yPercent: 120 }, { yPercent: 0 }, "-=.512")
				.fromTo(lv + " .dwan h2", { yPercent: 120 }, { yPercent: 0 }, "-=.512")
				.set(lv + " .left-hand", { transformOrigin: "99% 0", yPercent: 0, rotation: 0 })
				.set(lv + " .right-hand", { transformOrigin: "1% 0", yPercent: 0, rotation: 0 })
				.call(callback);
		}
	},
	clear: function () {
		this
			.selector
			.querySelector(".text")
			.innerHTML = "";
	}
}

//////////////// Loading Image

var imageloading = {
	loaded: false,
	elem: null,
	barba_object: null,
	first_loading: true,
	first_animation_done: false,
	callback: null,
	init: function (elem, callback) {
		var that = this,
			imgs = null,
			imgs_count = 0,
			imgs_loaded = [],
			callback_called = 0;

		that.callback = callback;

		if (elem.newContainer != undefined) {
			this.elem = elem.newContainer;
			this.barba_object = elem;
		} else {
			this.elem = elem;
			this.barba_object = null;
		}
		imgs = this
			.elem
			.querySelectorAll("img");
		imgs_count = imgs.length * 100;


		function checkProgress(index, url, percent) {
			function totalValue(array_item) {
				var total = 0;
				for (var i = 0; i < array_item.length; i++) {
					total += array_item[i];
				}
				return total;
			}

			if(isNaN(index))
				imgs_loaded[index.ajaxImageIndex] = percent;
			else
				imgs_loaded[index] = percent;
			return Math.ceil(totalValue(imgs_loaded) / imgs_count * 100);
		}

		this.loaded = false;
		if (imgs.length <= 0) {
			// No image, just unhide the loading
			loading.update({duration: .256, height: "100%"});
			that.loaded = true;
			if(that.callback) that.callback(that);
			else that.done();
		} else {
			// Found image, load them with ajax
			var progress = function(index, url, percent, bytes) {
				var loaded = checkProgress(index, url, percent);

				loading.update({
					duration: .256,
					height: loaded + "%"
				});

				if (loaded >= 100 && !that.loaded) {
					that.loaded = true;
					if(callback_called == 0) {
						callback_called++;

						if(that.callback) that.callback(that);
						else that.done();
					}
				}
			}
			for (var i = 0; i < imgs.length; i++) {
				imgs_loaded[i] = 0;
				if (imgs[i].load != undefined) {
					imgs[i].load(i, imgs[i].getAttribute('src'), progress);
				} else {
					imgs[i].ajaxImageIndex = i;
					ajaxImage(imgs[i], imgs[i].getAttribute('src'), progress);
				}
			}
		}
	},
	done: function (callback) {
		var that = this;

		if (that.first_animation_done) {
			// Add delay before hiding loading
			gsap.to(window, {
				duration: .256,
				onComplete: function () {
					if (that.barba_object != null) {
						that.elem.style.visibility = "visible";
						that
							.barba_object
							.done();
					}

					if (that.loaded) {
						// Run custom onLoadedComplete method in barba
						if (current_barba.onImageLoadComplete != undefined)
							current_barba.onImageLoadComplete();

						// Scroll up instantly
						gsap.to(window, {
							duration: 0,
							scrollTo: 0,
							onComplete: function () {
								// Hide loading
								loading
									.hide(function () {
										if (that.first_loading) {
											that.first_loading = false;
											loading.clear();
										}

										that.loaded = false;

										// Run custom onLoadedComplete method in barba
										if (current_barba.onImageLoadAnimateComplete != undefined)
											current_barba.onImageLoadAnimateComplete();
										if (callback != undefined)
											callback(that);
									},
									function () {
										if (current_barba.onImageLoadAnimateHalfComplete != undefined)
											current_barba.onImageLoadAnimateHalfComplete();
									});
							}
						});

						that.elem = null;
						that.barba_object = null;
					}
				}
			});
		} else {
			if (callback != undefined)
				callback(that);
		}
	}
}

///////////////////// Menu Functionality

var worklist = {
	hover: function (el) {
		el = _qAll(el);
		for (var i = el.length - 1; i >= 0; i--) {
			el[i].gsap = gsap.timeline({repeat: -1, ease: "expo"});
			el[i]
				.gsap
				.to(el[i], {
					transformOrigin: "50%",
					scale: 1.05,
					duration: 1.7
				})
				.to(el[i], {
					scale: 1.05,
					duration: .6
				})
				.to(el[i], {
					scale: 1,
					duration: 1.7
				})
				.to(el[i], {
					scale: 1,
					duration: .9
				});
			el[i]
				.gsap
				.pause();
			el[i].onmouseenter = function () {
				this
					.gsap
					.restart();
			}
			el[i].onmouseleave = function () {
				this
					.gsap
					.pause();
				gsap.to(this, {
					transformOrigin: "50%",
					scale: 1,
					duration: .512
				})
			}
		}
	}
}

//////////////////// Loading animation

var FadeTransition = Barba
	.BaseTransition
	.extend({
		start: function () {
			var that = this;

			function animate() {
				// Make the barba wrapper fix so it won't have jaggy animation
				_q("#barba-wrapper").style.height = _q("#barba-wrapper").offsetHeight + "px";

				// Show loading then load the new container
				loading.show(function () {
					gsap.set('.menu__pop .menu__item', {
						opacity: 0,
						yPercent: 100
					}, .768)
					that
						.newContainerLoading
						.then(that.finish.bind(that));
				});
			}

			if (menu.active) {
				var tl = gsap.timeline({
					defaults: {
						duration: 1.024,
						ease: "expo.out"
					}
				});

				removeClass(_q('.menu__pop'), "active");

				animate();
				tl.fromTo('.menu__pop .menu__item ul li, .menu__pop .menu__item .border', {
					xPercent: 0,
					opacity: 1
				}, {
					xPercent: -200,
					opacity: 0,
					stagger: {
						from: 0,
						amount: .128
					}
				});
			} else {
				animate();
			}
		},
		finish: function () {
			var that = this;

			// Hide newContainer for a bit
			that.newContainer.style.display = "block";
			that.newContainer.style.visibility = "hidden";

			// Remove previous height setting
			_q("#barba-wrapper").style.height = "";

			// Wait for all image to be loaded
			imageloading.init(that);
		}
	});
Barba.Pjax.getTransition = function () {
	return FadeTransition;
};

////////////// Barba views

var Home = Barba
	.BaseView
	.extend({
		namespace: 'home',
		onEnter: function () {
			var fruit = [
					"empty.png", "apple.png", "orange.png", "phone.png"
				],
				index = 0;

			current_barba = this;

			index = getRandomInt(1, 10);
			if (index > 5) {
				index = getRandomInt(1, fruit.length);
			} else {
				index = 0;
			}

			if (fruit[index] == undefined) index = 0;

			_q(".fruit").setAttribute("src", "/dwaan/img/" + fruit[index]);

			gsap.set(".hero", { y: window.innerHeight });
			gsap.set(".work_float", { y: 500 });
		},
		onImageLoadComplete: function () {
			// Fixing size
			function resizeHeroMeta() {
				_q("#trigger__padder").style.paddingTop = (_q("body").offsetHeight - _q(".work__list").offsetHeight) + "px";
				_q("#trigger__mover").style.height = (_q(".work__list").offsetHeight) + "px";
				_q(".hero__meta").style.height = (_q("body").offsetHeight - _q(".hero__meta").offsetTop - _q(".scroll").offsetHeight) + "px";
			}
			resizeHeroMeta();
			window.onresize = function() {
				resizeHeroMeta();
			}

			worklist.hover(".work__list a img");

			controller.destroy();
			controller = new ScrollMagic.Controller();
			els = null;
			anim = null;

			// Scroll animate the hero wording
			anim = gsap.timeline({
				defaults: {
					duration: 1.024,
					ease: "linear"
				}
			});
			anim
				.fromTo(".hero__text h1", { y: 0 }, { y: -20 }, 0)
				.fromTo(".hero__text p", { y: 0 }, { y: -25 }, 0)
				.fromTo(".hero .stats", { y: 0 }, { y: -30 }, 0)
				.fromTo(".hero img", { y: 0 }, { y: 10 }, 0);
			new ScrollMagic
				.Scene({triggerElement: "main", duration: "100%", triggerHook: 0})
				.setTween(anim)
				.addTo(controller);

			// Scroll animate the scroll
			anim = gsap.timeline({
				defaults: {
					duration: .128,
					ease: "expo"
				}
			});
			anim.fromTo(".scroll__up", { opacity: 1 }, { opacity: 0 }, 0).fromTo(".scroll__down", { opacity: 0 }, { opacity: 1 }, 0)
			new ScrollMagic
				.Scene({triggerElement: ".work_float", offset: 10, triggerHook: 1})
				.setTween(anim)
				.addTo(controller);

			// Scroll animate the stats
			gsap.set(".work__list .stats p", { transformOrigin: "center", scale: 1.5, opacity: 0 });
			anim = gsap.fromTo(".work__list .stats__content p", { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, duration: .768, ease: "elastic.out", stagger: {
					from: "end",
					amount: .256
				}});
			new ScrollMagic
				.Scene({triggerElement: ".work__list .stats__content", triggerHook: .9})
				.setTween(anim)
				.addTo(controller);

			// Scroll animate the wording float
			anim = gsap.fromTo(".work__list .block__left > *", { transformOrigin: "center", y: 125 }, { y: 1, ease: "expo.out", stagger: {
					from: 0,
					amount: .128
				}})
			new ScrollMagic
				.Scene({triggerElement: ".work__list .block__left", triggerHook: .9})
				.setTween(anim)
				.addTo(controller);

			// Scroll animate the work list
			anim = gsap.fromTo(".gallery a:not(:last-child)", { x: 150, opacity: 0 }, { x: 0, opacity: 1, duration: .768, ease: "expo", stagger: {
					from: 0,
					amount: .368
				}});
			new ScrollMagic
				.Scene({triggerElement: ".work__list", triggerHook: .9})
				.setTween(anim)
				.addTo(controller);

			// Some breathe in and breathe out animation for hero image
			var loop = gsap.timeline({repeat: -1, ease: "expo"});
			loop
				.to(".hero .box", { transformOrigin: "50% 75%", scale: 1, duration: .9 })
				.to(".hero .box", { scale: 1.015, duration: 1.7 })
				.to(".hero .box", { scale: 1.015, duration: .6 })
				.to(".hero .box", { scale: 1, duration: 1.7 });

			// Swipe event for gallery
			function detectswipe(el,func) {
				swipe_det = new Object();
				swipe_det.sX = 0;
				swipe_det.pX = 0;
				swipe_det.sY = 0;
				swipe_det.pY = 0;
				swipe_det.eX = 0;
				swipe_det.eY = 0;
				var min_x = 20;  //min x swipe for horizontal swipe
				var max_x = 40;  //max x difference for vertical swipe
				var min_y = 40;  //min y swipe for vertical swipe
				var max_y = 50;  //max y difference for horizontal swipe
				var direc = "";
				ele = _q(el);
				ele.addEventListener('touchstart',function(e){
					var t = e.touches[0];
					swipe_det.sX = t.screenX;
					swipe_det.sY = t.screenY;
					swipe_det.pX = t.screenX;
					swipe_det.pY = t.screenY;
					if(ele.x == undefined) ele.x = 0;
				},false);
				ele.addEventListener('touchmove',function(e){
					e.preventDefault();
					var t = e.touches[0];

					swipe_det.eX = t.screenX;
					swipe_det.eY = t.screenY;

					ele.x -= (swipe_det.pX - swipe_det.eX);

					gsap.set(el, {x: ele.x});

					swipe_det.pX = t.screenX;
					swipe_det.pY = t.screenY;
				},false);
				ele.addEventListener('touchend',function(e){
					//horizontal detection
					if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
						if(swipe_det.eX > swipe_det.sX) direc = "r";
						else direc = "l";
					}
					//vertical detection
					if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
						if(swipe_det.eY > swipe_det.sY) direc = "d";
						else direc = "u";
					}

					var delta_x = ele.offsetWidth - ele.parentNode.offsetWidth,
						ease = "expo.out";

					if(ele.x > 0 || direc == "r") ele.x = 0;
					else if(ele.x < -delta_x || direc == "l") ele.x = -delta_x;

					gsap.to(ele, { x: ele.x, duration: .768, ease: ease });

					if (direc != "") if(typeof func == 'function') func(el,direc);
					direc = "";
				},false);
			}
			detectswipe('.gallery');
		},
		onImageLoadAnimateHalfComplete: function () {
			// Animate the appearing
			splitText(_q(".hero__text h1"));
			anim = gsap.timeline({ defaults: { duration: 2.048, ease: "expo.out" }});
			anim
				.to(".hero", { y: 0 })
				// .fromTo(".hero", { opacity: 0 }, { opacity: 1 }, 0)
				.fromTo(".hero__image", { transformOrigin: "0 0", y: 500 }, { y: 0 }, 0)
				.fromTo(".hero__text h1 div", { y: 500 }, { y: -0, stagger: {
					from: 0,
					amount: .064
				}}, .128)
				.fromTo(".hero__text p, .hero .stats", { transformOrigin: "0 0", y: 500 }, { y: 0, stagger: {
					from: 0,
					amount: .256
				}}, .256)
				.fromTo(".hero .stats p", { y: 500 }, { y: 0, stagger: {
					from: "end",
					amount: .386
				}}, .368)
				.to(".work_float", { y: 0 }, .512)
			;

			// First time need to be delayed a bit
			new animateYear("#year__living", 1984);
			new animateYear("#year__designer", 2008);
			new animateYear("#year__managerial", 2011);
		},
		onLeave: function () {
			window.onresize = null;
		}
	});

var Work = Barba
	.BaseView
	.extend({
		namespace: 'work',
		onEnter: function () {
			current_barba = this;

			gsap.set(".work__list__page", { y: window.innerHeight });
		},
		onImageLoadComplete: function () {
			worklist.hover(".work__list a img");

			controller.destroy();
			controller = new ScrollMagic.Controller({
				globalSceneOptions: {
					triggerHook: .95,
				}
			});
			els = null;
			anim = null;

			// Scroll animate the works
			var delay = 0,
				_y = 0,
				_p_y = 0;
			els = _qAll(".works");
			for (var j = els.length - 1; j >= 0; j--) {
				var _el = els[j].children;
				for (var i = 0; i < _el.length; i++) {
					var _height = _el[i].offsetHeight,
						_c_el = _el[i].children;

					_y =_el[i].offsetTop;
					if (_y != _p_y) {
						_p_y = _y;
						delay = 0;
					} else {
						delay += .128;
					}

					tl = gsap.timeline({
						defaults: {
							duration: 1.024,
							ease: "expo.out"
						}
					});
					tl
						.fromTo(_c_el, { y: _height/5, opacity: 0 }, { y: 0, opacity: 1, delay: delay })
						.fromTo(_c_el[0].children[1], { y: 25, opacity: 0 }, { y: 0, opacity: 1 }, "-=.768");
					new ScrollMagic
						.Scene({ triggerElement: _el[i] })
						.setTween(tl)
						.addTo(controller);
				}
			}

			// Scroll animate the words
			els = _qAll(".words");
			for (var i = 0; i < els.length; i++) {
				anim = gsap.fromTo(els[i].children, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1.024, ease: "expo", stagger: {
						from: 0,
						amount: .256
					}});
				new ScrollMagic
					.Scene({ triggerElement: els[i] })
					.setTween(anim)
					.addTo(controller);
			}

			new animateNumber(".work__list .stats__content p:first-child b");
			new animateNumber(".work__list .stats__content p:last-child b");
		},
		onImageLoadAnimateHalfComplete: function () {
			gsap.to(".work__list__page", { x: 0, y: 0, ease: "expo.out", duration: 2.048 })
		}
	});

var WorkDetail = Barba
	.BaseView
	.extend({
		namespace: 'work-detail',
		onEnter: function () {
			current_barba = this;

			gsap.set(".work__list.work__detail", { y: window.innerHeight });
		},
		onEnterCompleted: function () {
			worklist.hover("a img");
		},
		onImageLoadComplete: function () {
			controller.destroy();
			controller = new ScrollMagic.Controller({
				globalSceneOptions: {
					triggerHook: .95
				}
			});
			els = null;
			anim = null;

			var tnsparam = {
				mouseDrag: true,
				swipeAngle: false,
				speed: 400,
				loop: false,
				navPosition: "bottom",
				controlsPosition: "bottom",
				responsive: {
					0: {
						items: 1
					},
					600: {
						items: 2
					}
				}
			};
			tinysliders = [];

			els = _qAll(".gallery-normal");
			for (var i = els.length - 1; i >= 0; i--) {
				var _tnsparam = tnsparam;
				_tnsparam.container = els[i];
				tinysliders.push(new tns(_tnsparam));
			}

			els = _qAll(".gallery-auto-height");
			for (var i = els.length - 1; i >= 0; i--) {
				var _tnsparam = tnsparam;
				_tnsparam.container = els[i];
				_tnsparam.autoHeight = true;
				tinysliders.push(new tns(_tnsparam));
			}

			els = _qAll(".work__timeline .wheel");
			for (var i = els.length - 1; i >= 0; i--) {
				var _tnsparam = tnsparam;
				_tnsparam.container = els[i];
				_tnsparam.autoHeight = true;
				_tnsparam.responsive = {
					0: {
						items: 2
					},
					600: {
						items: 3
					}
				};
				tinysliders.push(new tns(_tnsparam));
			}

			els = _qAll(".gallery__mobile");
			for (var i = els.length - 1; i >= 0; i--) {
				var _tnsparam = tnsparam;
				_tnsparam.container = els[i];
				_tnsparam.autoHeight = true;
				_tnsparam.responsive = {
					0: {
						items: 1
					},
					600: {
						items: 2
					},
					1200: {
						items: 3
					}
				};
				tinysliders.push(new tns(_tnsparam));
			}

			// Scroll animate staggering from right of child
			els = _qAll(".gallery, .wheel, .tns-nav, .tns-controls, .work__spec > p");
			for (var j = els.length - 1; j >= 0; j--) {
				if (els[j].children.length > 0) {
					anim = gsap.fromTo(els[j].children, {
						opacity: 0,
						xPercent: 100
					}, {
						opacity: 1,
						xPercent: 0,
						ease: "expo.out",
						duration: 1.024,
						stagger: {
							from: 0,
							amount: .256
						}
					});
					new ScrollMagic
						.Scene({triggerElement: els[j]})
						.setTween(anim)
						.addTo(controller);
				}
			}
			// Scroll animate staggering from right
			els = _qAll(".work__detail > hr, .work__detail > h5, .work__detail .work__spec > " +
					"*");
			for (var j = els.length - 1; j >= 0; j--) {
				anim = gsap.fromTo(els[j], {
					opacity: 0,
					x: 100
				}, {
					opacity: 1,
					x: 0,
					ease: "expo.out",
					duration: 1.024,
					stagger: {
						from: 0,
						amount: .256
					}
				});
				new ScrollMagic
					.Scene({triggerElement: els[j]})
					.setTween(anim)
					.addTo(controller);
			}
			// Scroll animate immidiete from bottom
			els = _qAll(".work__detail > blockquote");
			for (var j = els.length - 1; j >= 0; j--) {
				anim = gsap.fromTo(els[j], {
					x: 100
				}, {
					x: 0,
					ease: "expo.out",
					duration: 1.024
				});
				new ScrollMagic
					.Scene({triggerElement: els[j]})
					.setTween(anim)
					.addTo(controller);
			}
			// Scroll animate from bottom
			els = _qAll(".work__detail .block__left, .work__detail .stats__content, .work__ti" +
					"meline");
			for (var j = els.length - 1; j >= 0; j--) {
				for (var i = 0; i < els[j].children.length; i++) {
					anim = gsap.fromTo(els[j].children[i], {
						y: 100 + (i * 50)
					}, {
						y: 0,
						ease: "expo.out",
						duration: 1.024
					});
					new ScrollMagic
						.Scene({triggerElement: els[j]})
						.setTween(anim)
						.addTo(controller);
				}
			}

			new animateNumber(".work__detail .stats__content p:first-child b");
			new animateNumber(".work__detail .stats__content p:last-child b");

			// Gallery
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
			};
			// execute above function
			initPhotoSwipeFromDOM('.gallery');
		},
		onImageLoadAnimateHalfComplete: function () {
			gsap.fromTo(".work .back", { transformOrigin: "0 0", y: -100 }, { y: 0, delay: .256 });
			gsap.to(".work__list.work__detail", { y: 0, ease: "expo.out", duration: 2.048 })
		},
		onLeaveCompleted: function () {
			// Destroying tinyslider to prevent error
			for (var i = tinysliders.length - 1; i >= 0; i--) {
				tinysliders[i].destroy();
			}
			tinysliders = [];
		}
	});

var Call = Barba
	.BaseView
	.extend({
		namespace: 'call',
		onEnter: function () {
			current_barba = this;

			gsap.set(".call", { y: window.innerHeight });
		},
		onEnterCompleted: function () {
			// The menu item animation
			var border = ".bigtext",
				borderRadius
			_hugeText = new hugeText(border + " > div ");

			elem = _q('.call .email');
			elem.onmouseenter = function () {
				gsap.to(border, {
					duration: .386,
					ease: "expo",
					borderRadius: this.borderRadius
				});
				_hugeText.show("email me");
			};
			elem.onmouseleave = function () {
				gsap.to(border, {
					duration: .386,
					ease: "expo",
					borderRadius: "2% 2% 2% 2%"
				});
				_hugeText.hide();
			};

			elem = _q('.call .search');
			elem.onmouseenter = function () {
				gsap.to(border, {
					duration: .386,
					ease: "expo",
					borderRadius: this.borderRadius
				});
				_hugeText.show("search me");
			};
			elem.onmouseleave = function () {
				gsap.to(border, {
					duration: .386,
					ease: "expo",
					borderRadius: "2% 2% 2% 2%"
				});
				_hugeText.hide();
			};
		},
		onImageLoadAnimateComplete: function () {
			loading.breath.play();

			// Scroll animate the works
			gsap.fromTo(".call > div > *", 1.024, {
				y: 250
			}, {
				y: 0,
				ease: "expo",
				stagger: {
					from: 0,
					amount: .386
				}
			});

			gsap.to(".call", { y: 0, ease: "expo.out", duration: 2.048 });
		},
		onLeave: function () {
			loading.breath.pause(0);
		}
	});

var Lost = Barba
	.BaseView
	.extend({
		namespace: '404',
		onEnter: function () {
			current_barba = this;
		},
		onEnterCompleted: function () {
			var speed = 10,
				tween = [];

			for (var i = 0; i < 5; i++) {
				if (i % 2 == 0) {
					tween[i] = gsap.fromTo("#lost h2:nth-child(" + (i + 1) + ") span", {
						xPercent: -50
					}, {
						duration: speed + (i * 2),
						repeat: -1,
						ease: "linear",
						xPercent: 0
					})
				} else {
					tween[i] = gsap.fromTo("#lost h2:nth-child(" + (i + 1) + ") span", {
						xPercent: 0
					}, {
						duration: speed + (i * 2),
						repeat: -1,
						ease: "linear",
						xPercent: -50
					})
				}
			}

			_q("#nomokeybusiness a").onmouseover = function () {
				for (var i = 0; i < 5; i++) {
					tween[i].timeScale(4);
					_q("#nomokeybusiness a").className = "hover";
				}

				gsap.to("#nomokeybusiness p", {
					duration: .256,
					ease: "expo.inOut",
					rotation: 0
				})
				gsap.to("#nomokeybusiness a", {
					duration: .386,
					ease: "expo.inOut",
					opacity: 1
				})
			};
			_q("#nomokeybusiness a").onmouseout = function () {
				for (var i = 0; i < 5; i++) {
					tween[i].timeScale(1);
					_q("#nomokeybusiness a").className = "";
				}

				gsap.to("#nomokeybusiness p", {
					duration: .256,
					ease: "expo.inOut",
					rotation: 180
				})
				gsap.to("#nomokeybusiness a", {
					duration: .386,
					ease: "expo.inOut",
					opacity: .8
				})
			};
		}
	});

var Me = Barba
	.BaseView
	.extend({
		namespace: 'me',
		onEnter: function () {
			current_barba = this;

			gsap.set(".imuiux", { y: window.innerHeight });
		},
		onEnterCompleted: function () {
			worklist.hover("#ig .item a");
			worklist.hover(".work__list img");

			controller.destroy();
			controller = new ScrollMagic.Controller();
			els = null;
			anim = null;

			// First text animation
			tl = gsap.timeline({ defaults: { duration: .5, ease: "linear" }});
			tl
				.fromTo(".imuiux h1", { y: 0 }, { y: -60, duration: .75 }, 0)
					.fromTo(".imuiux h1", { opacity: 1 }, { opacity: 0, duration: .25 }, .5)
				.fromTo(".imuiux p", { y: 0 }, { y: -50, duration: .75 }, 0)
					.fromTo(".imuiux p", { opacity: 1 }, { opacity: 0, duration: .25 }, .5)
				.fromTo(".imuiux img", { yPercent: 0 }, { yPercent: -7.5, duration: 1 }, 0)
					.fromTo(".imuiux img", { scale: 1 }, { scale: .95, duration: 1 }, 0)
					.to(".imuiux img", { yPercent: 5, ease: "expo.in", duration: 1.5 }, 1)
					.to(".imuiux img", { opacity: 0, duration: .25 }, 2.25)
				.fromTo(".us h2", { y: 60 }, { y: -60, duration: 2 }, .5)
					.fromTo(".us h2", { opacity: 0 },  { opacity: 1, duration: .25 }, .5)
					.fromTo(".us h2", { opacity: 1 },  { opacity: 0, duration: .25 }, 2.25)
				.fromTo(".us p", { y: 50 }, { y: -50, duration: 2 }, .5)
					.fromTo(".us p", { opacity: 0 },  { opacity: 1, duration: .25 }, .5)
					.fromTo(".us p", { opacity: 1 },  { opacity: 0, duration: .25 }, 2.25)
			;
			new ScrollMagic
				.Scene({triggerElement: "#firstscene", triggerHook: 0, duration: _q("body").offsetHeight*2})
				.setPin("#firstscene", { pushFollowers: false })
				.setTween(tl)
				.addTo(controller);
			gsap.set("#firstscene", { height: _q("body").offsetHeight*2 });
			gsap.set(".us h2, .us p, .us img", { opacity: 0 });
			gsap.set(".imuiux img", { transformOrigin: "50% 0" });

			// Scroll animate Mr. Goat text
			tl = gsap.timeline({ defaults: { duration: .25, ease: "linear" }});
			tl
				.to(".mrgoat", { y: 0, opacity: 1 }, 0)
				.fromTo(".mrgoat .h21", { y: 0 }, { y: -20 }, .25)
					.to(".mrgoat .h21", { y: -60, opacity: 0 }, .5)
				.fromTo(".mrgoat .h22", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, .5)
					.to(".mrgoat .h22", { y: -20 }, .75)
					.to(".mrgoat .h22", { y: -60, opacity: 0 }, 1)
				.fromTo(".mrgoat .h23", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, 1)
					.to(".mrgoat .h23", { y: 0 }, 1.25);
			new ScrollMagic
				.Scene({triggerElement: ".mrgoat", triggerHook: 0, duration: _q("body").offsetHeight*2})
				.setPin(".mrgoat")
				.setTween(tl)
				.addTo(controller);

			// Make Mr. Goat spinning
			var obj = {
					curImg: 1,
					length: _qAll(".mrgoat .img > img").length
				},
				rotatinggoat = {
					curImg: obj.length,
					roundProps: "curImg",
					repeat: 5,
					immediateRender: true,
					ease: "linear",
					duration: .75,
					onUpdate: function () {
						gsap.set(".mrgoat .img > img", { opacity: 0 });
						gsap.set(".mrgoat" + obj.curImg, {opacity: 1});
					}
				};
			anim = gsap.to(obj, rotatinggoat)
			new ScrollMagic
				.Scene({triggerElement: ".me", triggerHook: 1, duration: _q(".me").offsetHeight})
				.setTween(anim)
				.addTo(controller);

			gsap.set(".mrgoat", { y: 0, opacity: 0 });

			// Scroll IG items
			els = _qAll("#ig .item");
			for (var i = 0; i < els.length; i++) {
				anim = gsap.fromTo(els[i].children, 1.024, { y: 25 + (i * 25), opacity: 0 }, { y: 0, opacity: 1, ease: "expo" });
				new ScrollMagic.Scene({triggerElement: els[i], triggerHook: .75 })
					.setTween(anim)
					.addTo(controller);
			}

			// Scroll capabilities item
			els = _qAll(".anyway h3, .anyway p, .anyway h4, .anyway ul li");
			for (var i = 0; i < els.length; i++) {
				anim = gsap.fromTo(els[i], { x: 25 + (i * 25), opacity: 0 }, { x: 0, opacity: 1, duration: 1.024, ease: "expo.out" });
				new ScrollMagic.Scene({triggerElement: els[i], triggerHook: .85 })
					.setTween(anim)
					.addTo(controller);
			}

			// Scroll latest works
			els = _qAll(".work__list, .work__list ul li");
			for (var i = 0; i < els.length; i++) {
				anim = gsap.fromTo(els[i].children, { y: 25 + (i * 25), opacity: 0 }, { y: 0, opacity: 1, duration: 1.024, ease: "expo" });
				new ScrollMagic.Scene({triggerElement: els[i], triggerHook: .85 })
					.setTween(anim)
					.addTo(controller);
			}

			// Scroll cofound
			anim = gsap.fromTo(".cofound > div > *", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.024, ease: "expo", stagger: { from: 0, amount: .512 }});
			new ScrollMagic
				.Scene({triggerElement: ".cofound > div", triggerHook: .5 })
				.setTween(anim)
				.addTo(controller);
		},
		onImageLoadComplete: function () {
			gsap.fromTo(".imuiux > div > *", { y: 200, opacity: 0 }, { y: 0, opacity: 1, delay: .256, duration: 1.024, ease: "expo.out", stagger: { from: 0, amount: .128 }});

			var els = _qAll("#ig img");
			for (var i = els.length - 1; i >= 0; i--) {
				if (els[i].offsetWidth > els[i].offsetHeight) {
					addClass(els[i], "hor");
				} else if (els[i].offsetWidth < els[i].offsetHeight) {
					addClass(els[i], "ver");
				} else {
					addClass(els[i], "squ");
				}
			}
		},
		onImageLoadAnimateHalfComplete: function () {
			gsap.to(".imuiux", { y: 0, ease: "expo.out", duration: 2.048 });
			gsap.fromTo(".imuiux h1, .imuiux p, .imuiux img", { y: 200 }, { y: 0, duration: 2.048, ease: "expo.out", stagger: {
				from: 0,
				amount: .386
			}});
		}
	});

var Menu = Barba
	.BaseView
	.extend({
		namespace: 'menu',
		onEnter: function () {
			current_barba = this;
		}
	});

////////// Initial

document.addEventListener('DOMContentLoaded', function () {
	// Initialize script
	Home.init();
	Work.init();
	WorkDetail.init();
	Call.init();
	Lost.init();
	Me.init();
	Menu.init();

	// Run Barbara
	Barba.Pjax.start();

	// Initialize loading
	loading.init();

	// Wait for all images to be loaded
	imageloading.init(document, function (imgload) {
		// Check if it's first time or 404 to do some text animation
		loading.animate((_q(".barba-container").getAttribute("data-namespace") == "404" ? "404" : "first-time"), function () {
			if (imgload != undefined) {
				imgload.first_animation_done = true;
				imgload.done()
			}

			// Animate header
			gsap.fromTo(".logo, #mode, .lang > li, .menu > a", { marginTop: -50, opacity: 0 }, { marginTop: 0, opacity: 1, delay: .768, duration: .768, ease: "expo.out", stagger: {
				from: 0,
				amount: .386
			}});
		});
	});

	removeClass(_q('.menu__pop'), "active");

	// Adding logo to loading and do some hover event
	var el = _q("#loading-cover .loading");
	el.querySelector(".light").innerHTML = logo_svg;
	el.querySelector(".light").style.height = 0;
	el.querySelector(".dark").innerHTML = logo_svg;

	// Logo waving animation
	var logo_wave = gsap.timeline({ repeat: -1, defaults: { transformOrigin: "99% 0", duration: .256, ease: "linear", yPercent: 20 }});
	logo_wave
		.from(".logo .left-hand", { yPercent: 0, rotation: 0, duration: 10 })
		.to(".logo .left-hand", { duration: .256, rotation: 70 })
		.fromTo(".logo .left-hand", { rotation: 70 }, { rotation: 60, repeat: 2, yoyo: true })
		.to(".logo .left-hand", { duration: .256, yPercent: 0, rotation: 0 });

	// Safari Mobile: 177
	// Safari: 38/63
	// Firefox: 74
	// Chrome: 79
	// Safari Tablet: 107
	// Chrome Tablet: 113
	if (window.outerHeight - window.innerHeight < 80) {
		addClass(_q("html"), "desktop");
	}

	// Run menu
	menu.init();
});
//# sourceMappingURL=bundle.js.map
