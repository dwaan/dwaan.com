"use strict";

import loader from '../helpers/loader';
import animate from '../helpers/animate';
import { removeStyle } from '../helpers/helper';

let transition_home_to_detail = {
    name: 'home-to-detail',
    leave: () => true,
    before: function (data) {
        var done = this.async();
        var current = data.current.container;
        var next = data.next.container;

        // Display loading
        loader.init(true);

        // Hide current view
        // Image loading logic
        animate.hide(current, () => loader.show(next, () => done()), current.querySelectorAll(".arrow"), false);
    },
    enter: function (data) {
        var done = this.async();
        var current = data.current.container;
        var next = data.next.container;

        // Reset current element values
        next.style.position = "fixed";
        next.style.opacity = 1;
        current.style.position = "fixed";
        current.style.opacity = 0;

        // Animate Next view
        animate.show(next, () => done(), next.querySelectorAll(".arrow, .year"));
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
        namespace: ['home']
    },
    to: {
        namespace: ['detail']
    }
}

export default transition_home_to_detail;