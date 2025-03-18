"use strict";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { _q, _qAll, reduceMotionFilter } from '../helpers/helper.js';
import scroll from "../helpers/scroll.js";

function animation(next) {
	// Style - 3D
	next.querySelectorAll(".style-3d").forEach(el => {
		var length = reduceMotionFilter(1);
		var screen = gsap.matchMedia();
		var pictures = el.querySelectorAll(".thumbs picture");

		screen.add("(min-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				pictures.forEach((picture, index) => {
					tl.fromTo(picture, {
						x: "-" + (index + 1) + "0%",
						y: (index + 1) + "0%"
					}, {
						x: (index + 1) + "0%",
						y: "-" + (index + 1) + "0%",
						ease: "linear",
						duration: length
					}, 0);
				})

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 0",
					scrub: .5,
					animation: tl
				});
			});
		});

		screen.add("(max-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				pictures.forEach((picture, index) => {
					tl.fromTo(picture, {
						x: 0,
						y: (index + 1) + "0%"
					}, {
						x: 0,
						y: "-" + (index + 1) + "0%",
						ease: "linear",
						duration: length
					}, 0);
				})

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 0",
					scrub: .5,
					animation: tl
				});
			});
		});
	});
}

export default animation;