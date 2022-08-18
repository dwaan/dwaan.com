"use strict";

import gsap from 'gsap';
import loader from '../helpers/loader';
import animate from '../helpers/animate';
import darkmode from '../helpers/darkmode';

let transition_from_plurk = {
    name: 'from-plurk',
    leave: () => true,
    before: async function (data) {
        var done = this.async();
        var current = data.current.container;
        var tl = gsap.timeline();

        // Display loading
        await loader.init();

        // Hide current view
        tl = animate.top(window, tl);
        tl.set(current.querySelectorAll("#credits, #statistics"), {
            opacity: 0
        }, "hide");
        tl.to(current.querySelectorAll("#hello .bgtext sub, #permission .bgtext sub"), {
            y: 100,
            opacity: 0,
            duration: reduceMotionFilter(1),
            ease: "power3.in"
        }, "hide");
        tl.to(current.querySelectorAll("#hello .bgtext sup, #permission .bgtext sup"), {
            y: -100,
            opacity: 0,
            duration: reduceMotionFilter(1),
            ease: "power3.in"
        }, "hide");
        tl.to(current.querySelectorAll("#hello .text, #hello .thumbs, #hello .arrow-big, .footer,  #permission form"), {
            y: 500,
            opacity: 0,
            duration: reduceMotionFilter(1),
            ease: "power3.in"
        }, "hide+=.2");
        tl.to(current.querySelectorAll("#hello, #permission"), {
            opacity: 0,
            duration: reduceMotionFilter(1),
            ease: "power3.in",
            onStart: () => {
                darkmode.browserColorLight = "";
                darkmode.browserColorDark = "";
                darkmode.setDarkMode(1);
            }
        }, "hide+=.4");
        tl.set(current, {
            onComplete: function () {
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
        namespace: ['replurk2020', 'replurk2021']
    }
}

export default transition_from_plurk;