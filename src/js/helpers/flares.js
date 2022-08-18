"use strict";

import gsap from "gsap";
import { reduceMotionFilter, _qAll } from "./helper";

var screenhorizontal = window.matchMedia('(min-aspect-ratio: 1/1)').matches;
var flare = {
    elements: "",
    show: function (elements) {
        if (elements) this.elements = _qAll(elements);

        gsap.killTweensOf(this.elements);
        if (elements) {
            gsap.to(this.elements, {
                opacity: 1,
                duration: 1,
                ease: "ease.out",
            });
            gsap.to(this.elements, {
                x: "random(-100,100,10)%",
                y: "random(10,30,5)%",
                rotation: "random(-5,5,1)deg",
                scale: screenhorizontal ? "random(1,2.5,.5)" : "random(.5,1.5,.5)",
                duration: .5,
                ease: "ease.out",
            });
        }

        var repeatanimation = element => {
            gsap.to(element, {
                x: "random(-100,100,10)%",
                y: "random(10,30,5)%",
                rotation: "random(-5,5,1)deg",
                scale: screenhorizontal ? "random(1,2.5,.5)" : "random(.5,1.5,.5)",
                opacity: gsap.utils.random(5, 10, 1) / 10,
                duration: gsap.utils.random(5, 10, 1),
                ease: "ease.inOut",
                onComplete: () => repeatanimation(element)
            });
        }

        this.elements.forEach(el => repeatanimation(el));
    },
    hide: function () {
        gsap.killTweensOf(this.elements);
        gsap.to(this.elements, {
            opacity: 0,
            x: reduceMotionFilter() ? 0 : "random(-50,50,10)%",
            y: reduceMotionFilter() ? 0 : "random(0,20,5)%",
            scale: .5,
            duration: reduceMotionFilter() ? 1 : 2,
            ease: "ease.in"
        });
    }
};

export default flare;