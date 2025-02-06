"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { _q, _qAll, hoverEvents, reduceMotionFilter } from './helper.js';
import scroll from "./scroll.js";
import darkmode from "./darkmode.js";

let header = {
    init: function () {
        this.show();
        this.moonsun();
        this.darkmodeswitch();
        this.textswitch();
    },

    // Animate header showing
    show: () => {
        return new Promise(resolve => {
            var length = reduceMotionFilter(1.28);

            gsap.set("header", {
                opacity: 1,
                pointerEvents: "none"
            });

            gsap.fromTo("header .logo, header .size, header .lamp, header .switch", {
                y: -200,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: length,
                ease: "expo.out",
                delay: length / 5,
                stagger: length / 5,
                onComplete: () => {
                    gsap.set("header", {
                        pointerEvents: ""
                    });
                    resolve();
                }
            });
        });
    },

    // Animate header hiding
    hide: () => {
        return new Promise(resolve => {
            var length = reduceMotionFilter(1.28);

            gsap.fromTo("header .logo, header .size, header .lamp, header .switch", {
                y: 0,
                opacity: 1,
            }, {
                y: -200,
                opacity: 0,
                duration: length,
                ease: "expo.out",
                delay: length / 5,
                stagger: length / 5,
                onComplete: () => resolve()
            });
        });
    },

    moonsun: () => {
        var el = _q('.lamp');
        var length = 1;

        gsap.set(el.querySelector("#ray"), { transformOrigin: "center center" })
        hoverEvents([el],
            () => gsap.to(el.querySelector("#ray"), { rotation: 90, scale: 1.1, duration: length, ease: "elastic.out" }),
            () => gsap.to(el.querySelector("#ray"), { rotation: 0, scale: 1, duration: length, ease: "elastic.out" })
        );
    },

    // Dark mode switcher event
    darkmodeswitch: () => {
        gsap.utils.toArray("header .lamp").forEach(el => {
            el.addEventListener("click", e => {
                e.preventDefault();
                darkmode.toggleDarkMode();
            });
        });
    },

    // Text switcher event
    textswitch: () => {
        var length = 1;

        gsap.utils.toArray("header .size").forEach(el => {
            var tl = gsap.timeline();
            tl.to(el, {
                scale: 1.25,
                ease: "elastic.out",
                duration: length / 2
            });
            tl.to(el, {
                scale: 1.5,
                ease: "elastic.out",
                duration: length / 2
            });
            tl.to(el, {
                scale: 1,
                duration: length
            });
            tl.to(el, {
                duration: length * 5
            });
            tl.pause();
            hoverEvents([el], () => tl.repeat(-1).restart(), () => tl.repeat(0));
            if (!window.resizefontevent) {
                window.resizefontevent = true;
                window.addEventListener("resize", () => {
                    window.fontSize = false;
                    _q("html").style.fontSize = "";
                });
            }
            el.addEventListener("click", () => {
                var delta = 1;
                var howmany = 3;
                var fontSize = Number(window.getComputedStyle(_q("html"))['font-size'].replace('px', ''))
                if (!window.fontSize) window.fontSize = fontSize;

                fontSize += delta;
                if (fontSize - (delta * howmany) > window.fontSize) fontSize = window.fontSize;

                _q("html").style.fontSize = fontSize + "px";
            });
        });
    }
}

export default header;