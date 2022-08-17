"use strict";

import animate from '../helpers/animate';
import loader from '../helpers/loader';
import header from '../helpers/header';

let transition_once_default = {
    name: 'default-transition',
    once: function (data) {
        // Define async and next container
        var done = this.async();
        var next = data.next.container;

        // Display loading
        loader.init();
        // Loading logic
        loader.show(next, () => {
            // Animate current view and header
            if (data.next.namespace == "lost") {
                animate.show404(next, () => {
                    loader.empty();
                    done();
                });
            } else if (data.next.namespace == "replurk2020" || data.next.namespace == "replurk2021") {
                animate.showinstant(next, () => {
                    loader.empty();
                    done();
                });
            } else {
                animate.show(next, () => {
                    loader.empty();
                    done();
                });
            }
        });

        header.init();
    },
    // leave: () => true,
    before: function (data) {
        var done = this.async();

        // Display loading
        loader.init();

        // Hide current view
        // Image loading logic
        animate.hide(data.current.container, () => loader.show(data.next.container, () => done()));
    },
    enter: function (data) {
        var done = this.async();
        var current = data.current.container;

        // Reset current element values
        current.style.position = "fixed";
        current.style.opacity = 0;
        if (current.querySelector(".arrow-big")) current.querySelector(".arrow-big").style.opacity = 0;

        // Animate current view
        animate.show(data.next.container, () => done());
    },
    after: () => {
        loader.empty();
    },
}

export default transition_once_default;