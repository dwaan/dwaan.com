"use strict";

import gsap from "gsap";
import { _qAll } from "./helper";

var screenhorizontal = window.matchMedia('(min-aspect-ratio: 1/1)').matches;
var flare = {
    elements: "",
    show: function (elements) {
        if (elements) this.elements = _qAll(elements);

        gsap.killTweensOf(this.elements);
        if (elements) {
            gsap.to(this.elements, {
                opacity: 1,
                ease: "ease.out",
                duration: reduceMotionFilter(1)
            });
            gsap.to(this.elements, {
                x: "random(-100,100,10)%",
                y: "random(10,30,5)%",
                rotation: "random(-5,5,1)deg",
                scale: screenhorizontal ? "random(1,2.5,.5)" : "random(.5,1.5,.5)",
                ease: "ease.out",
                duration: reduceMotionFilter(.5)
            });
        }

        var repeatanimation = function (element) {
            gsap.to(element, {
                x: "random(-100,100,10)%",
                y: "random(10,30,5)%",
                rotation: "random(-5,5,1)deg",
                scale: screenhorizontal ? "random(1,2.5,.5)" : "random(.5,1.5,.5)",
                opacity: gsap.utils.random(5, 10, 1) / 10,
                duration: reduceMotionFilter(gsap.utils.random(5, 10, 1)),
                ease: "ease.inOut",
                onComplete: function () {
                    repeatanimation(element);
                }
            });

        }

        this.elements.forEach(function (el) {
            repeatanimation(el);
        });
    },
    hide: function () {
        gsap.killTweensOf(this.elements);
        gsap.to(this.elements, {
            opacity: 0,
            scale: 1,
            x: "random(-50,50,10)%",
            y: "random(0,20,5)%",
            scale: 1,
            ease: "ease.in"
        });
    }
};

export default flare;