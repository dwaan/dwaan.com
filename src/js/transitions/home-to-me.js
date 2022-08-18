"use strict";

import gsap from 'gsap';
import animate from '../helpers/animate';
import loader from '../helpers/loader';
import { removeStyle } from '../helpers/helper';

let transition_home_to_me = {
    name: 'home-to-me',
    leave: () => true,
    before: async function (data) {
        var current = data.current.container;
        var next = data.next.container;

        // Hide current view
        await animate.hide(current, current.querySelectorAll(".arrow"));

        // Kill scrollbar
        gsap.set(current, {
            position: "fixed",
            top: 0,
            zIndex: 2
        })
        gsap.set(next, {
            position: "fixed",
            top: 0,
            zIndex: 1
        });

        // Image loading logic
        await loader.init(true);
        await loader.show(next);

        this.async();
    },
    enter: async function (data) {
        var current = data.current.container;
        var next = data.next.container;

        // Reset current element values
        removeStyle(current.querySelectorAll(".main-text, .main-text > h1"));

        // Animate Next view
        await animate.show(next, next.querySelectorAll(".arrow"));

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
        namespace: ['home', "me"]
    },
    to: {
        namespace: ['home', 'me']
    }
}

export default transition_home_to_me;