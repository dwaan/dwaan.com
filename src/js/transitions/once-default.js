"use strict";

import animate from '../helpers/animate.js';
import loader from '../helpers/loader.js';
import header from '../helpers/header.js';
import { delay } from '../helpers/helper.js';

let transition_once_default = {
    name: 'default-transition',
    once: async function (data) {
        // Define async and next container
        var done = this.async();
        var next = data.next.container;

        // Display loading
        loader.disableLoading = true;
        loader.init();

        // Loading logic
        await loader.show(next);

        // Delay so firefox will re
        await delay(250);

        // Initialized header
        header.init();

        // Animate current view and header
        if (data.next.namespace == "lost") await animate.show404(next);
        else if (data.next.namespace.includes("replurk")) await animate.showinstant(next);
        else if (data.next.namespace.includes("detail")) animate.show(next, next.querySelector("#nothing"));
        else await animate.show(next);

        // Empty loading
        loader.empty();
        done();
    },
    before: async function (data) {
        var done = this.async();

        // Hide current view
        await animate.hide(data.current.container);

        // Image loading logic
        loader.init();
        await loader.show(data.next.container);

        done();
    },
    enter: async function (data) {
        var done = this.async();
        var current = data.current.container;
        var next = data.next.container;

        // Reset current element values
        current.style.position = "fixed";
        current.style.opacity = 0;
        if (current.querySelector(".arrow-big")) current.querySelector(".arrow-big").style.opacity = 0;

        // Animate current view
        await animate.show(next);

        done();
    },
    after: () => loader.empty()
}

export default transition_once_default;