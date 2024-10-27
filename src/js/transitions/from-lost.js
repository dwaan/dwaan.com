"use strict";

import loader from '../helpers/loader.js';
import animate from '../helpers/animate.js';

let transition_from_lost = {
    name: 'from-lost',
    leave: () => true,
    before: async function (data) {
        // Hide current view
        await animate.hide404(data.current.container);

        // Image loading logic
        await loader.init();
        await loader.show(data.next.container);

        this.async();
    },
    enter: async function (data) {
        var next = data.next.container;

        // Animate current view
        await animate.show(next, next.querySelectorAll(".main-text > *, .padding > *, .arrow"));

        this.async();
    },
    after: () => loader.empty(),
    from: {
        namespace: ['lost']
    }
}

export default transition_from_lost;