let transition_hi_to_home = {
    name: 'hi-to-home',
    leave: () => true,
    before: function (data) {
        var done = this.async();
        var current = data.current.container;
        var next = data.next.container;

        // Display loading
        loader.init();

        var tl = gsap.timeline({
            defaults: {
                duration: .75,
                stagger: .1,
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
            fontSize: "6rem",
            fontWeight: 500,
            letterSpacing: "-0.06em"
        };
        var to = {
            left: gsap.getProperty(current.querySelector(".footer"), "padding-left"),
            bottom: gsap.getProperty(current.querySelector(".footer"), "padding-bottom"),
            x: "0%",
            y: "0%",
            lineHeight: "15px",
            fontSize: "0.8rem",
            fontWeight: 400,
            letterSpacing: "0.1em",
            duration: 1,
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
                duration: .25,
                stagger: .1,
                ease: "power3.in"
            }, 0);
        } else {
            tl.fromTo(current.querySelector(".main-text h1"), from, to, 0);
        }
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
            onComplete: function () {
                // Image loading logic
                loader.show(next, () => done());
            }
        }, .25);
    },
    enter: function (data) {
        var done = this.async();
        var next = data.next.container;
        var elements = ".main-text, .arrow";

        // Animate current view
        animate.show(next, () => done(), next.querySelectorAll(elements), false);
    },
    after: function () {
        // Remove loading
        loader.empty();

        return true;
    },
    from: {
        namespace: ['hi']
    },
    to: {
        namespace: ['home']
    }
}