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

        // Hide current view but don't scroll up
        await animate.hide(current, current.querySelectorAll(".arrow"), false);

        // Image loading logic
        await loader.init(true);
        await loader.show(next);

        this.async();
    },
    enter: async function (data) {
        var current = data.current.container;
        var next = data.next.container;

        // Reset current element values
        next.style.position = "fixed";
        next.style.opacity = 1;
        // Hide current only after next view appear
        current.style.display = "none";

        // Animate Next view
        await animate.show(next, next.querySelectorAll(".arrow, .year"));

        // Reset current element values
        removeStyle(next);
        next.style.opacity = 1;

        this.async();
    },
    after: () => loader.empty(),
    from: {
        namespace: ['home']
    },
    to: {
        namespace: ['detail']
    }
}

export default transition_home_to_detail;