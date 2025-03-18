"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { _q, _qAll } from '../helpers/helper.js';
import scroll from "../helpers/scroll.js";

function animation(next) {
	// Style - Reveal
	next.querySelectorAll(".style-reveal").forEach(el => {
		var screen = gsap.matchMedia();

		screen.add("(min-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				var thumb = el.querySelector(".thumbs");

				tl.fromTo(thumb, {
					y: thumb.offsetHeight * -1
				}, {
					y: 0,
					ease: "linear"
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 100%",
					scrub: true,
					animation: tl
				});
			});
		});
	});
}

export default animation;