header = {
    // Animate header showing
    show: function () {
        gsap.set("header", {
            opacity: 1
        });
        gsap.fromTo("header .logo, header .size, header .lamp, header .switch", {
            y: -200,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1.6,
            ease: "expo.out",
            delay: .5,
            stagger: .2
        });
    },

    // Logo events animations - waving
    waving: function () {
        gToArray('header .logo').forEach(function (el) {
            // Waving animation
            var lefthand = el.querySelector(".left-hand");
            var waving = gsap.timeline({ repeat: -1, defaults: { transformOrigin: "99% 0", duration: .25, ease: "linear", yPercent: 20 } });
            waving
                .set(lefthand, { yPercent: 0, rotation: 0 })
                .to(lefthand, { duration: .25, rotation: 70 })
                .fromTo(lefthand, { rotation: 70 }, { rotation: 60, repeat: 2, yoyo: true })
                .to(lefthand, { duration: .25, yPercent: 0, rotation: 0 })
                .to(lefthand, { yPercent: 0, duration: 10 });
            // Hat move on hover
            var hat = el.querySelector(".hat");
            hoverEvents([el], function () {
                gsap.to(hat, {
                    transformOrigin: "50% 75%",
                    yPercent: -3,
                    xPercent: -1,
                    rotation: 5,
                    duration: 1,
                    ease: "elastic.out"
                });
                waving.restart();
            },
                function () {
                    gsap.to(hat, {
                        transformOrigin: "50% 75%",
                        yPercent: 0,
                        xPercent: 0,
                        rotation: 0,
                        duration: 1,
                        ease: "elastic.out"
                    });
                });
        });
    },

    // Menu events - slide
    slide: function () {
        gToArray('header .switch').forEach(function (el) {
            // Hat move on hover
            var menu = el.querySelectorAll("svg line");
            var tl = gsap.timeline();
            tl.set(menu, {
                x: 0
            });
            tl.to(menu, {
                x: -32,
                duration: .25,
                ease: "expo.in",
                stagger: .1
            });
            tl.fromTo(menu, {
                x: 32
            }, {
                x: 0,
                duration: .25,
                ease: "expo.out",
                stagger: .1
            });
            tl.to(menu, {
                duration: 1
            });
            tl.pause(.1);
            hoverEvents([el], function () {
                tl.repeat(-1).restart();
            }, function () {
                tl.repeat(0);
            });
        });

    },

    // Main menu - hamburger slide
    hamburger: function () {
        gToArray("header .menu").forEach(function (el) {
            var overlay = el.querySelector(".overlay");
            var items = el.querySelector(".items");

            // Show menu animation
            el.querySelector(".switch").addEventListener("click", function (e) {
                e.preventDefault();

                if (!gsap.isTweening(items)) {
                    // Animate main element
                    gsap.to("main .middle", {
                        left: "-=100",
                        duration: .75,
                        ease: "power3.out"
                    });
                    gsap.to("main .middle > .text", {
                        left: "-=50",
                        duration: .75,
                        ease: "power3.out"
                    });
                    gsap.to("main .links, main .flares", {
                        left: "-=25",
                        duration: .75,
                        ease: "power3.out"
                    });
                    // Animate overlay background
                    gsap.to(overlay, {
                        backgroundColor: "rgba(0,0,0,.5)",
                        duration: 1,
                        ease: "power3.out"
                    });
                    // Animate menu showing
                    gsap.set(overlay, {
                        display: "flex",
                        onComplete: function () {
                            gsap.fromTo(items.querySelectorAll("li"), {
                                x: 50,
                                opacity: 0
                            }, {
                                x: 0,
                                opacity: 1,
                                ease: "expo.out",
                                delay: .25,
                                stagger: .1,
                                duration: .65
                            });

                            gsap.fromTo(items, {
                                x: "100%"
                            }, {
                                x: 0,
                                ease: "power3.out",
                                duration: .75
                            });
                        }
                    });
                }
            });
            // Hide menu animation
            el.querySelectorAll(".overlay, li a, .close").forEach(function (link) {
                link.addEventListener("click", function (e) {
                    e.preventDefault();
                    if (this != e.target) return false;

                    if (!gsap.isTweening(items)) {
                        // Animate main element
                        gsap.to("main .middle, main .middle > .text, main .links, main .flares", {
                            left: 0,
                            duration: .75,
                            ease: "power3.out"
                        });
                        // Animate overlay background
                        gsap.to(overlay, {
                            backgroundColor: "rgba(0,0,0,0)",
                            duration: 1,
                            ease: "power3.out"
                        });
                        // Animate menu
                        gsap.fromTo(items, {
                            x: 0
                        }, {
                            x: "100%",
                            ease: "power3.out",
                            duration: .75,
                            onComplete: function () {
                                gsap.set(overlay, {
                                    display: "none"
                                });
                            }
                        });
                    }
                });
            });
        });
    },

    // Dark mode switcher event
    darkmodeswitch: function () {
        gToArray("header .lamp").forEach(function (el) {
            el.addEventListener("click", function (e) {
                e.preventDefault();
                darkmode = !darkmode;
                toggleDarkMode();
            });
        });
    },

    // Text switcher event
    textswitch: function () {
        gToArray("header .size").forEach(function (el) {
            var tl = gsap.timeline();
            tl.to(el, {
                scale: 1.25,
                duration: .5,
                ease: "elastic.out"
            });
            tl.to(el, {
                scale: 1.5,
                duration: .5,
                ease: "elastic.out"
            });
            tl.to(el, {
                scale: 1,
                duration: 1
            });
            tl.to(el, {
                duration: 5
            });
            tl.pause();
            hoverEvents([el], function () {
                tl.repeat(-1).restart();
            },
                function () {
                    tl.repeat(0);
                });
            if (!window.resizefontevent) {
                window.resizefontevent = true;
                window.addEventListener("resize", function () {
                    window.fontSize = false;
                    _q("html").style.fontSize = "";
                });
            }
            el.addEventListener("click", function (e) {
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