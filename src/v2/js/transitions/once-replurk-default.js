"use strict";

let transition_once_replurk_default = {
    name: 'default-transition',
    once: async function (data) {
        // Define async and next container
        var done = this.async();
        var next = data.next.container;

        next.style.opacity = 1;

        done();
    },
    before: async function (data) {
        var done = this.async();

        done();
    },
    enter: async function (data) {
        var done = this.async();
        var current = data.current.container;
        // var next = data.next.container;

        // Reset current element values
        current.style.position = "fixed";
        current.style.opacity = 0;

        done();
    }
}

export default transition_once_replurk_default;