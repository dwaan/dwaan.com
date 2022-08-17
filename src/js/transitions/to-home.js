"use strict";

import animate from '../helpers/animate';
import loader from '../helpers/loader';

let transition_to_home = {
    name: 'to-home',
    leave: () => true,
    before: function (data) {
        let done = this.async();

        // Display loading
        loader.init();

        // Hide current view
        animate.hide(data.current.container, () => loader.show(data.next.container, () => done()));
    },
    enter: function (data) {
        let done = this.async();

        // Animate current view
        animate.show(data.next.container, () => done(), next.querySelectorAll(".main-text, .padding, .arrow"));
    },
    after: function () {
        // Remove loading
        loader.empty();

        return true;
    },
    to: {
        namespace: ['home']
    }
}

export default transition_to_home;