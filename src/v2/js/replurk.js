"use strict";

// Plugins
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
import barba from '@barba/core';
// Helper
import { _q, _qAll, konami, removeClass } from './helpers/helper.js';
import scrollto from './helpers/scrollto.js';

import api from './replurk/api.js';

// Transitions
import replurk from './views/replurk.js';
import transition_once_replurk_default from './transitions/once-replurk-default.js';

////////// Initial

removeClass(_q("html"), "no-js");

// Configure to remove scroll-smooth CSS before running
gsap.config({ nullTargetWarn: false });
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global default barba hooks, abort any plurk api calls
barba.hooks.before(_ => api.abort());
// Destroy prev scroll
barba.hooks.beforeEnter(_ => {
    document.body.style.overflow = "hidden";

    // Scroll to top
    window.scrollTo(0, 0);
});
barba.hooks.afterEnter(data => {
    var next = data.next;

    // Read more
    next.container.querySelectorAll("a.scrollto").forEach(el => scrollto(el));

    ScrollTrigger.refresh();
    gsap.matchMediaRefresh();

    document.body.style.overflow = "";
});

// Initialized barba.js
barba.init({
    debug: true,
    transitions: [transition_once_replurk_default],
    views: [replurk.view]
});

konami();