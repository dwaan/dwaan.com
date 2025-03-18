"use strict";

import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import scroll from "../helpers/scroll.js";
import { _q, _qAll, reduceMotionFilter } from '../helpers/helper.js';

function animation(next) {
	// Style - Bottom
	next.querySelectorAll(".style-logo").forEach(el => {
		// Move text
		scroll.moveText({
			elements: el.querySelectorAll(".text > *")
		});
		// Move logo
		scroll.push(tl => {
			tl.fromTo(el.querySelectorAll(".thumbs"), {
				x: -100,
				y: 300,
				rotation: 20,
			}, {
				x: 0,
				y: 0,
				rotation: 0,
				duration: 1,
				ease: "expo.out"
			}, 0);

			tl.fromTo(el.querySelectorAll(".thumbs li"), {
				y: 100
			}, {
				y: 0,
				stagger: {
					from: "start",
					amount: .2
				},
				duration: .5,
				ease: "expo.out"
			}, 0);

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: el,
				start: (window.innerHeight * 1 / 4) + " " + (window.innerHeight * 3 / 4),
				end: (window.innerHeight * 3 / 4) + " " + (window.innerHeight * 3 / 4),
				scrub: reduceMotionFilter() ? true : 1,
				animation: tl
			});
		});
	});
}

export default animation;