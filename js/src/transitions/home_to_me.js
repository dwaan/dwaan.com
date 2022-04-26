let transition_home_to_me = {
    name: 'home-to-me',
    leave: () => true,
    before: function (data) {
        var done = this.async();
        var current = data.current.container;
        var next = data.next.container;

        // Display loading
        loader.init(true);

        // Hide current view
        animate.hide(current, function () {
            // Kill scrollbar
            gsap.set(current, {
                position: "fixed",
                top: 0,
                zIndex: 2
            })
            gsap.set(next, {
                position: "fixed",
                top: 0,
                zIndex: 1
            });

            // Image loading logic
            loader.show(next, () => done());
        }, current.querySelectorAll(".arrow"));
    },
    enter: function (data) {
        var done = this.async();
        var current = data.current.container;
        var next = data.next.container;

        // Reset current element values
        removeStyle(current.querySelectorAll(".main-text, .main-text > h1"));

        // Animate Next view
        animate.show(next, () => done(), next.querySelectorAll(".arrow"));
    },
    after: function (data) {
        var next = data.next.container;

        // Reset current element values
        removeStyle(next);
        next.style.opacity = 1;

        // Remove loading
        loader.empty();

        return true;
    },
    from: {
        namespace: ['home', "me"]
    },
    to: {
        namespace: ['home', 'me']
    }
}