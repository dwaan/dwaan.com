"use strict";

import animate from '../helpers/animate.js';
import loader from '../helpers/loader.js';

let transition_to_lost = {
    name: 'to-lost',
    leave: () => true,
    before: async function (data) {
        // Hide current view
        await animate.hide(data.current.container);

        // Display loading
        await loader.init();
        await loader.show(data.next.container);

        this.async();
    },
    enter: async function (data) {
        // Animate current view
        await animate.show404(data.next.container);
        this.async();
    },
    after: () => loader.empty(),
    to: {
        namespace: ['lost']
    }
}

export default transition_to_lost;