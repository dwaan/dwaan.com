"use strict";

import { gsap } from 'gsap';
import { _q, addClass, removeClass, reduceMotionFilter } from "./helper";

/**
 * A script to scroll to hash address from element href attribute
 * @param {element} el Object element of HTML DOM
 */
function scrollto(el) {
    el.addEventListener("click", function (e) {
        var length = reduceMotionFilter(1);

        e.preventDefault();
        removeClass(_q("html"), "snap");

        gsap.to(window, {
            duration: length * 3 / 4,
            ease: "expo.inOut",
            scrollTo: e.target.getAttribute("href"),
            onComplete: function () {
                addClass(_q("html"), "snap");
            }
        });
    });
}

export default scrollto;