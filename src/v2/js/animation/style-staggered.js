"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { _q, _qAll, reduceMotionFilter } from '../helpers/helper.js';
import scroll from "../helpers/scroll.js";

function animation(next) {
	// Style - Staggered
	next.querySelectorAll(".style-staggered").forEach(el => {
		var pictures = el.querySelectorAll(".thumbs > picture");

		// Move the text
		scroll.moveText({
			elements: el.querySelectorAll(".titles > *, p")
		});

		// Move image
		var screen = gsap.matchMedia();
		// Vertical screen
		screen.add("(max-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				tl.fromTo(pictures, {
					y: "20vh",
					opacity: 0
				}, {
					y: 0,
					opacity: 1,
					ease: "ease.out",
					stagger: .2
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el.querySelector(".thumbs"),
					start: "-25% 100%-=50px",
					end: "50% 100%-=50px",
					scrub: reduceMotionFilter(2),
					animation: tl
				});
			});
		});
		// Horizontal Screen
		screen.add("(min-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				pictures.forEach(picture => {
					tl.fromTo(picture, {
						y: "50%"
					}, {
						y: 0,
						ease: "linear",
						duration: 1
					}, 0);
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 100%",
					scrub: reduceMotionFilter(1),
					animation: tl
				});
			});
		});
	});
}

export default animation;