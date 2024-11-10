"use strict";

import gsap from 'gsap';
import loader from '../helpers/loader.js';
import animate from '../helpers/animate.js';
import darkmode from '../helpers/darkmode.js';
import browser from '../replurk/browser.js';
import { _qAll, reduceMotionFilter } from '../helpers/helper.js';

let transition_from_plurk = {
    name: 'from-plurk',
    leave: () => browser.reset(),
    before: async function (data) {
        var done = this.async();
        var current = data.current.container;
        var length = reduceMotionFilter(1);

        gsap.killTweensOf(_qAll("header, .footer"));

        // Display loading
        await loader.init();

        // Scroll top
        await animate.top(window);

        // Hide current view
        var tl = gsap.timeline();
        tl.set(current.querySelectorAll("#credits, #statistics"), {
            opacity: 0
        }, 0);
        tl.to(current.querySelectorAll("#hello .bgtext sub, #permission .bgtext sub"), {
            y: 100,
            opacity: 0,
            duration: length,
            ease: "power3.in"
        }, 0);
        tl.to(current.querySelectorAll("#hello .bgtext sup, #permission .bgtext sup"), {
            y: -100,
            opacity: 0,
            duration: length,
            ease: "power3.in"
        }, 0);
        tl.to(current.querySelectorAll("#hello .text, #hello .thumbs, #hello .arrow-big, .footer,  #permission form"), {
            y: 500,
            opacity: 0,
            duration: length,
            ease: "power3.in"
        }, length / 5);
        tl.to(current.querySelectorAll("#hello, #permission"), {
            opacity: 0,
            duration: length,
            ease: "power3.in",
            onStart: () => {
                darkmode.browserColorLight = "";
                darkmode.browserColorDark = "";
                darkmode.setDarkMode(1);
            }
        }, length * 2 / 5);
        tl.set(current, {
            onComplete: () => {
                done();
                gsap.set(current.querySelectorAll("#credits"), {
                    opacity: 1
                });
            }
        });
    },
    enter: async function (data) {
        var current = data.current.container;
        var next = data.next.container;

        // Reset current element values
        current.style.position = "fixed";
        current.style.opacity = 0;
        if (current.querySelector(".arrow-big")) current.querySelector(".arrow-big").style.opacity = 0;

        // Animate current view
        await animate.show(next);

        this.async();
    },
    after: () => loader.empty(),
    from: {
        namespace: ['replurk']
    }
}

export default transition_from_plurk;