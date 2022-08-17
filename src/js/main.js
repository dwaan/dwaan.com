"use strict";

// Plugins
import { gsap, ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import barba from '@barba/core';
// Helper
import { _q, _qAll, konami, removeClass } from './helpers/helper';
import displayRoundedCorner from './helpers/roundedcorner';
import header from './helpers/header';
import api from './helpers/api';
import scroll from './helpers/scroll';
import scrollto from './helpers/scrollto';

// Transitions
import transitions from './transitions/transitions';

// Views
import views from "./views/views";

////////// Initial

removeClass(_q("html"), "no-js");

gsap.config({ nullTargetWarn: false });
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global default barba hooks
barba.hooks.before(() => {
	api.abort();
	return true;
});
barba.hooks.beforeEnter(_ => {
	// Destroy prev scroll
	scroll.destroy();
	window.scrollTo(0, 0);
});
barba.hooks.afterEnter(data => {
	// Read more
	data.next.container.querySelectorAll("a.scrollto").forEach(function (el) {
		scrollto(el);
	});

	var namespace = data.next.namespace;
	if (namespace != "replurk2020" && namespace != "replurk2021") header.arrow(data.next.container);

	ScrollTrigger.refresh();
	gsap.matchMediaRefresh();
});

// Initialized barba.js
barba.init({
	// debug: false,
	// logLevel: 0,
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
