"use strict";

// Plugins
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
import barba from '@barba/core';
// Helper
import { _q, _qAll, konami, removeClass } from './helpers/helper.js';
import displayRoundedCorner from './helpers/roundedcorner.js';
import header from './helpers/header.js';
import scroll from './helpers/scroll.js';
import scrollto from './helpers/scrollto.js';

import api from './replurk/api.js';

// Transitions
import transitions from './transitions/transitions.js';

// Views
import views from "./views/views.js";

////////// Initial

removeClass(_q("html"), "no-js");

gsap.config({ nullTargetWarn: false });
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global default barba hooks, abort any plurk api calls
barba.hooks.before(_ => api.abort());
// Destroy prev scroll
barba.hooks.beforeEnter(() => {
	document.body.style.overflow = "hidden";

	scroll.destroy();

	// Scroll to top
	window.scrollTo(0, 0);
});
barba.hooks.afterEnter(data => {
	var next = data.next;

	// Read more
	next.container.querySelectorAll("a.scrollto").forEach(el => scrollto(el));

	// Scroll animation for arrows
	if (!next.namespace.includes("replurk")) header.arrow(next.container);

	ScrollTrigger.refresh();
	gsap.matchMediaRefresh();

	document.body.style.overflow = "";
});

// Initialized barba.js
barba.init({
	debug: false,
	transitions: transitions,
	views: views
});

displayRoundedCorner();
konami();

// Prevent error in older browser for console
(function () {
	var method;
	var noop = function () { };
	var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'];
	var length = methods.length;
	var console = (window.console = window.console || {});
	while (length--) {
		method = methods[length];
		if (!console[method]) console[method] = noop
	}
}());
