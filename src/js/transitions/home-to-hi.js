"use strict";

import gsap from 'gsap';
import loader from '../helpers/loader';

let transition_home_to_hi = {
    name: 'home-to-hi',
    leave: () => true,
    before: function (data) {
        var done = this.async();
        var current = data.current.container;
        var next = data.next.container;

        // Display loading
        loader.init(true);

        // Image loading logic
        loader.show(next, function () {
            var tl = gsap.timeline({
                defaults: {
                    duration: .75,
                    stagger: .1,
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
                fontWeight: 400,
                letterSpacing: "0.1em"
            },
                to = {
                    left: window.innerWidth / 2,
                    bottom: window.innerHeight / 2,
                    x: "-50%",
                    y: "50%",
                    lineHeight: "80%",
                    fontSize: "6rem",
                    fontWeight: 500,
                    letterSpacing: "-0.06em",
                    duration: 1,
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
        });
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
                duration: .5,
                ease: "power3.out",
                stagger: {
                    from: "start",
                    amount: .1
                },
                onComplete: () => done()
            });
        } else {
            done();
        }
    },
    after: function () {
        // Remove loading
        loader.empty();

        return true;
    },
    from: {
        namespace: ['home']
    },
    to: {
        namespace: ['hi']
    }
}

export default transition_home_to_hi;