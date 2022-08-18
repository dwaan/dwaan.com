"use strict";

import loader from '../helpers/loader';
import animate from '../helpers/animate';
import { removeStyle } from '../helpers/helper';

let transition_home_to_detail = {
    name: 'home-to-detail',
    leave: () => true,
    before: async function (data) {
        var current = data.current.container;
        var next = data.next.container;

        // Hide current view
        await animate.hide(current);

        // Image loading logic
        await loader.init(true);
        await loader.show(next, current.querySelectorAll(".arrow"), false);

        this.async();
    },
    enter: async function (data) {
        var current = data.current.container;
        var next = data.next.container;

        // Reset current element values
        next.style.position = "fixed";
        next.style.opacity = 1;
        current.style.position = "fixed";
        current.style.opacity = 0;

        // Animate Next view
        await animate.show(next, next.querySelectorAll(".arrow, .year"));

        this.async();
    },
    after: function (data) {
        var next = data.next.container;

        // Reset current element values
        removeStyle(next);
        next.style.opacity = 1;

        // Remove loading
        return loader.empty();
    },
    from: {
        namespace: ['home']
    },
    to: {
        namespace: ['detail']
    }
}

export default transition_home_to_detail;