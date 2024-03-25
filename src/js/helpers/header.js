"use strict";

import { gsap, ScrollTrigger } from 'gsap/all';
import { _q, _qAll, hoverEvents, reduceMotionFilter } from './helper';
import scroll from "./scroll";
import darkmode from "./darkmode";

let header = {
    init: function () {
        this.show();
        this.waving();
        this.slide();
        this.hamburger();
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

    // Logo events animations - waving
    waving: (logo = 'header .logo') => {
        var length = 1;


        gsap.utils.toArray(logo).forEach(el => {
            // Waving animation
            var svg = el.querySelector('.dwan-logo').contentDocument;
            var lefthand = svg.querySelector(".left-hand");
            var waving = gsap.timeline({ repeat: -1, defaults: { transformOrigin: "99% 0", duration: length / 4, ease: "linear", yPercent: 20 } });

            waving
                .set(lefthand, { yPercent: 0, rotation: 0 })
                .to(lefthand, { duration: length / 4, rotation: 70 })
                .fromTo(lefthand, { rotation: 70 }, { rotation: 60, repeat: 2, yoyo: true })
                .to(lefthand, { duration: length / 4, yPercent: 0, rotation: 0 })
                .to(lefthand, { yPercent: 0, duration: length * 10 });

            // Hat move on hover
            var hat = svg.querySelector(".hat");
            hoverEvents([el], () => {
                gsap.to(hat, {
                    transformOrigin: "50% 75%",
                    yPercent: -3,
                    xPercent: -1,
                    rotation: 5,
                    duration: length,
                    ease: "elastic.out"
                });
                waving.restart();
            }, () => {
                gsap.to(hat, {
                    transformOrigin: "50% 75%",
                    yPercent: 0,
                    xPercent: 0,
                    rotation: 0,
                    duration: length,
                    ease: "elastic.out"
                });
            });
        });
    },

    // Menu menu - hamburger slide
    slide: () => {
        var length = 1;

        gsap.utils.toArray('header .switch').forEach(el => {
            // Menu icon move on hover
            var menu = el.querySelectorAll("svg line");
            var tl = gsap.timeline();
            tl.set(menu, {
                x: 0
            });
            tl.to(menu, {
                x: -32,
                duration: length / 4,
                ease: "expo.in",
                stagger: length / 10
            });
            tl.fromTo(menu, {
                x: 32
            }, {
                x: 0,
                duration: length / 4,
                ease: "expo.out",
                stagger: length / 10
            });
            tl.to(menu, {
                duration: length,
            });
            tl.pause(length / 10);
            hoverEvents([el], () => tl.repeat(-1).restart(), () => tl.repeat(0));
        });
    },

    // Main menu - menu actions
    hamburger: () => {
        gsap.utils.toArray("header .menu").forEach(el => {
            var overlay = el.querySelector(".overlay");
            var items = el.querySelector(".items");
            var length = reduceMotionFilter(1);

            // Show menu animation
            el.querySelector(".switch").addEventListener("click", e => {
                e.preventDefault();

                // Don't animate when it still animating
                if (gsap.isTweening(items)) return;

                // Animate main element
                gsap.to("main > .middle", {
                    left: "-=100",
                    ease: "power3.out",
                    duration: length * 3 / 4
                });
                gsap.to("main .middle > .text", {
                    left: "-=50",
                    ease: "power3.out",
                    duration: length * 3 / 4
                });
                gsap.to("main .links, main .flares", {
                    left: "-=25",
                    ease: "power3.out",
                    duration: length * 3 / 4
                });
                // Animate overlay background
                gsap.to(overlay, {
                    backgroundColor: "rgba(0,0,0,.5)",
                    ease: "power3.out",
                    duration: length
                });
                // Animate menu showing
                gsap.set(overlay, {
                    display: "flex",
                    onComplete: () => {
                        gsap.fromTo(items.querySelectorAll("li"), {
                            x: 50,
                            opacity: 0
                        }, {
                            x: 0,
                            opacity: 1,
                            ease: "expo.out",
                            delay: length / 4,
                            stagger: length / 10,
                            duration: length * 13 / 20
                        });

                        gsap.fromTo(items, {
                            x: "100%"
                        }, {
                            x: 0,
                            ease: "power3.out",
                            duration: length * 3 / 4
                        });
                    }
                });
            });

            // Hide menu animation
            el.querySelectorAll(".overlay, li a, .close").forEach(link => {
                link.addEventListener("click", function (e) {
                    e.preventDefault();

                    // Don't animate when it still animating or not target
                    if (this != e.target || gsap.isTweening(items)) return;

                    // Animate main element
                    gsap.to("main > .middle, main .middle > .text, main .links, main .flares", {
                        left: 0,
                        duration: length * 3 / 4,
                        ease: "power3.out"
                    });
                    // Animate overlay background
                    gsap.to(overlay, {
                        backgroundColor: "rgba(0,0,0,0)",
                        duration: length,
                        ease: "power3.out"
                    });
                    // Animate menu
                    gsap.fromTo(items, {
                        x: 0
                    }, {
                        x: "100%",
                        ease: "power3.out",
                        duration: length * 3 / 4,
                        onComplete: () => gsap.set(overlay, {
                            display: "none"
                        })
                    });
                });
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
    },

    arrow: next => {
        // Scroll animate arrow
        var middle = next.querySelectorAll("section.middle, div.middle");
        if (!middle) return;
        middle.forEach((el, idx) => {
            // Animate arrow
            var screen = gsap.matchMedia();
            // Vertical Screen
            screen.add("(max-aspect-ratio: 1/1)", () => {
                var arrow = el.querySelectorAll(".arrow-big, .arrow-small");
                var year = el.querySelectorAll(".year");

                // Animate arrow
                // Middle, disappear
                scroll.push(tl => {
                    tl.fromTo(arrow, {
                        opacity: 1
                    }, {
                        opacity: 0,
                        ease: "power3.out"
                    });

                    return tl;
                }, tl => ScrollTrigger.create({
                    trigger: el,
                    start: "75% 50%",
                    end: "100% 50%",
                    scrub: 1,
                    animation: tl
                }));

                // Animate year in detail page
                // Slide down an disappear with fix position
                scroll.push(tl => {
                    tl.fromTo(year, {
                        position: "fixed",
                        x: 0,
                        y: 0,
                        opacity: 1
                    }, {
                        x: (idx > 0 && idx < middle.length - 1) ? 50 : 0,
                        y: (idx == 0) ? window.innerHeight * -1 / 10 : 0,
                        opacity: (idx < middle.length - 1) ? 0 : 1,
                        ease: "power3.in",
                        duration: reduceMotionFilter(3)
                    }, "<");
                    tl.set(year, {
                        position: "absolute"
                    });

                    return tl;
                }, tl => ScrollTrigger.create({
                    trigger: el,
                    start: "0 50%",
                    end: "100% 50%",
                    scrub: true,
                    animation: tl
                }));

                // Clean up
                return () => {
                    arrow.forEach(el => {
                        el.style = "";
                    });
                    year.forEach(el => {
                        el.style = "";
                    });
                }
            });
            // Horizontal Screen
            screen.add("(min-aspect-ratio: 1/1)", () => {
                var arrow = el.querySelectorAll(".year, .arrow-big, .arrow-small");

                scroll.push(tl => {
                    // Show
                    tl.fromTo(arrow, {
                        position: "absolute",
                        x: (idx > 0) ? -50 : 0,
                        y: 0,
                        opacity: 0
                    }, {
                        position: "fixed",
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: reduceMotionFilter(3),
                        ease: "power3.out"
                    });
                    // Delay
                    tl.to(arrow, {
                        duration: reduceMotionFilter(2)
                    });
                    // Hide
                    tl.fromTo(arrow, {
                        position: "fixed",
                        x: 0,
                        y: 0,
                        opacity: 1
                    }, {
                        x: (idx > 0 && idx < middle.length - 1) ? 50 : 0,
                        y: (idx == 0) ? window.innerHeight * -1 / 5 : 0,
                        opacity: (idx < middle.length - 1) ? 0 : 1,
                        ease: "power3.in",
                        duration: reduceMotionFilter(3)
                    });
                    tl.set(arrow, {
                        position: "absolute"
                    });

                    return tl;
                }, tl => ScrollTrigger.create({
                    trigger: el,
                    start: "0% 50%",
                    end: "100% 50%",
                    scrub: true,
                    animation: tl
                }));

                // Clean up
                return () => {
                    arrow.forEach(el => {
                        el.style = "";
                        el.querySelectorAll(".arrow").forEach(child => {
                            child.style = "";
                        })
                    });
                }
            });
        });
    }
}

export default header;