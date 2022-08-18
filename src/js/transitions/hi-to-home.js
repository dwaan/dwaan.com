"use strict";

import gsap from 'gsap';
import loader from '../helpers/loader';
import animate from '../helpers/animate';
import { reduceMotionFilter } from '../helpers/helper';

let transition_hi_to_home = {
    name: 'hi-to-home',
    leave: () => true,
    before: function (data) {
        var done = this.async();
        var current = data.current.container;
        var next = data.next.container;
        var length = reduceMotionFilter(1);

        var tl = gsap.timeline({
            defaults: {
                duration: length * 3 / 4,
                stagger: length / 10,
                ease: "power3.out"
            }
        });

        var from = {
            position: "fixed",
            height: "auto",
            top: "initial",
            left: window.innerWidth / 2,
            bottom: window.innerHeight / 2,
            x: "-50%",
            y: "50%",
            lineHeight: "80%",
            fontSize: "5.75rem",
            fontWeight: 700,
            letterSpacing: "-0.06em"
        };
        var to = {
            left: gsap.getProperty(current.querySelector(".footer"), "padding-left"),
            bottom: gsap.getProperty(current.querySelector(".footer"), "padding-bottom"),
            x: "0%",
            y: "0%",
            lineHeight: "15px",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            duration: length,
            ease: "expo.inOut",
            onComplete: function () {
                // Selectively show next elements
                gsap.set(next.querySelectorAll(".footer .email"), { opacity: 1 });
            }
        };

        current.querySelector(".main-text").style = {};

        // For vertical screen, just fade in.
        if (window.matchMedia('(max-aspect-ratio: 1/1)').matches) {
            tl.fromTo(current.querySelectorAll(".main-text h1 > *"), {
                x: 0,
                opacity: 1
            }, {
                x: -100,
                opacity: 0,
                duration: length / 4,
                stagger: length / 10,
                ease: "power3.in"
            }, 0);
        } else tl.fromTo(current.querySelector(".main-text h1"), from, to, 0);

        // Show next container
        tl.set(current, {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2,
        }, 0);
        tl.set(next, {
            zIndex: 1,
            opacity: 1
        }, 0);
        tl.set(next.querySelectorAll(".footer"), { opacity: 1 }, 0);
        tl.set(next.querySelectorAll(".footer .email"), { opacity: 0 }, 0);
        tl.set(next, {
            onComplete: async () => {
                // Image loading logic
                await loader.init();
                await loader.show(next);

                done();
            }
        }, .25);
    },
    enter: async function (data) {
        var next = data.next.container;

        // Animate current view
        await animate.show(next, false, false);

        this.async();
    },
    after: () => loader.empty(),
    from: {
        namespace: ['hi']
    },
    to: {
        namespace: ['home']
    }
}

export default transition_hi_to_home;