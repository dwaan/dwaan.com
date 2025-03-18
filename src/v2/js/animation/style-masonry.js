"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import scroll from "../helpers/scroll.js";
import { _q, _qAll, reduceMotionFilter } from '../helpers/helper.js';

function animation(next) {
	// Style - Masonry
	next.querySelectorAll(".style-masonry").forEach(el => {
		var thumbs = el.querySelectorAll(".thumbs");
		var alltext = el.querySelectorAll(".text > *");

		var screen = gsap.matchMedia();

		screen.add("(max-aspect-ratio: 1/1)", () => {
			// Rotate masonry
			gsap.set(thumbs, {
				opacity: 1,
				rotation: -5
			});

			// Scroll up
			scroll.push(tl => {
				for (var index = 1; index <= 4; index++) {
					var yplus = gsap.utils.random(250, 750, 25),
						y = 25;

					if (index % 2 == 0) y = -25;

					tl.fromTo(el.querySelectorAll(".thumbs > *:nth-child(4n+" + index + ")"), {
						y: y + yplus,
					}, {
						y: y,
						ease: "ease"
					}, 0);
				}

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "-25% 100%",
					end: "100% 50%",
					scrub: reduceMotionFilter() ? true : .75,
					animation: tl
				});
			});
		});
		screen.add("(min-aspect-ratio: 1/1)", () => {
			// Rotate masonry
			gsap.set(thumbs, {
				rotation: -2.5
			});

			// Scroll
			scroll.push(tl => {
				for (var index = 1; index <= 4; index++) {
					var yplus = gsap.utils.random(250, 1000, 25),
						y = 50;

					if (index == 3) yplus = 0;
					if (index % 2 == 0) y = -50;

					tl.fromTo(el.querySelectorAll(".thumbs > *:nth-child(4n+" + index + ")"), {
						y: y + yplus,
					}, {
						y: y,
						ease: "ease"
					}, 0);
				}

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "-25% 100%",
					end: "100% 0",
					scrub: reduceMotionFilter() ? true : gsap.utils.random(75, 125, 5) / 100,
					animation: tl
				});
			});

			// Move text
			scroll.moveText({
				elements: alltext,
				position: "75%"
			});

			// Move masonry
			scroll.moveText({
				elements: thumbs
			});
		});
	});
}

export default animation;