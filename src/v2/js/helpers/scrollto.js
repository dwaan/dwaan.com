"use strict";

import { gsap } from 'gsap';
import { _q, addClass, removeClass, reduceMotionFilter } from "./helper.js";

/**
 * A script to scroll to hash address from element href attribute
 * @param {element} el Object element of HTML DOM
 */
function scrollto(el) {
    el.addEventListener("click", function (e) {
        var length = reduceMotionFilter(1);

        e.preventDefault();

        gsap.to(window, {
            duration: length * 3 / 4,
            ease: "expo.inOut",
            scrollTo: e.target.getAttribute("href"),
            onStart: _ => {
                removeClass(_q("html"), "scroll-snap");
            },
            onComplete: _ => {
                addClass(_q("html"), "scroll-snap");
            }
        });
    });
}

export default scrollto;