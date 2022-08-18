"use strict";

import gsap from 'gsap';
import loader from '../helpers/loader';
import { reduceMotionFilter } from '../helpers/helper';

let transition_home_to_hi = {
    name: 'home-to-hi',
    leave: () => true,
    before: async function (data) {
        var done = this.async();
        var current = data.current.container;
        var next = data.next.container;
        var length = reduceMotionFilter(1);

        // Display loading
        await loader.init(true);
        await loader.show(next);

        var tl = gsap.timeline({
            defaults: {
                duration: length * 3 / 4,
                stagger: length / 10,
                ease: "power3.out"
            }
        });
        var from = {
            position: "fixed",
            display: "flex",
            height: "auto",
            top: "initial",
            left: window.getComputedStyle(current.querySelector(".footer"))['padding-left'],
            bottom: window.getComputedStyle(current.querySelector(".footer"))['padding-bottom'],
            x: "0%",
            y: "0%",
            lineHeight: "15px",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.1em"
        };
        var to = {
            left: window.innerWidth / 2,
            bottom: window.innerHeight / 2,
            x: "-50%",
            y: "50%",
            lineHeight: "80%",
            fontSize: "5.75rem",
            fontWeight: 700,
            letterSpacing: "-0.06em",
            duration: length,
            ease: "expo.inOut",
            onComplete: function () {
                // Show next container
                gsap.set(next, { opacity: 1 });
                // Show next elements
                gsap.set(next.querySelector(".footer"), { opacity: 1 });

                done();
            }
        };

        tl.to(current.querySelectorAll(".flares > img"), {
            x: "-=200",
            opacity: 0
        }, 0).to(current.querySelectorAll(".middle > *"), {
            opacity: 0,
            stagger: false
        }, .25);

        if (window.matchMedia('(min-aspect-ratio: 1/1)').matches) {
            tl.fromTo(current.querySelector(".footer .email"), from, to, 0);
        } else {
            tl.set(next, {
                onComplete: () => done()
            });
        }
    },
    enter: function (data) {
        var done = this.async();
        var next = data.next.container;

        // Animate current view if needed
        if (window.matchMedia('(max-aspect-ratio: 1/1)').matches) {
            // Show next container
            next.style.opacity = 1;

            gsap.set(next, {
                position: "fixed",
                top: 0
            });
            // Show next elements
            next.querySelector(".footer").style.opacity = 1;
            gsap.fromTo(next.querySelectorAll(".main-text h1 > *"), {
                x: -100,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: length / 2,
                ease: "power3.out",
                stagger: {
                    from: "start",
                    amount: length / 10
                },
                onComplete: () => done()
            });
        } else done();
    },
    after: () => loader.empty(),
    from: {
        namespace: ['home']
    },
    to: {
        namespace: ['hi']
    }
}

export default transition_home_to_hi;