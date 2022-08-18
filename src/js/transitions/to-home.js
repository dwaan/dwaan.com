"use strict";

import animate from '../helpers/animate';
import loader from '../helpers/loader';

let transition_to_home = {
    name: 'to-home',
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
        await animate.show(data.next.container, next.querySelectorAll(".main-text, .padding, .arrow"));

        this.async();
    },
    after: () => loader.empty(),
    to: {
        namespace: ['home']
    }
}

export default transition_to_home;