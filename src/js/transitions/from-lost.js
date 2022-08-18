"use strict";

import loader from '../helpers/loader';
import animate from '../helpers/animate';

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
    // Animate current view
    enter: async function (data) {
        await animate.show(data.next.container);
        this.async();
    },
    after: () => loader.empty(),
    from: {
        namespace: ['lost']
    }
}

export default transition_from_lost;