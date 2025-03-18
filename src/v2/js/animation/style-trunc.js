"use strict";

import { gsap } from 'gsap';
import scroll from "../helpers/scroll.js";
import { _q, _qAll } from '../helpers/helper.js';

function animation(next) {
	// Style - Trunc
	next.querySelectorAll(".style-trunc").forEach(el => {
		// Move text
		var screen = gsap.matchMedia();

		screen.add("(min-aspect-ratio: 1/1)", () => {
			gsap.set(el.querySelectorAll(".text > *, .color, .color ul > *"), {
				y: 0,
				opacity: 1
			});
			scroll.moveText({
				elements: el.querySelectorAll(".text > *, .color ul > *"),
				position: "100%",
				horizontal: true
			});
		});
		screen.add("(max-aspect-ratio: 1/1)", () => {
			gsap.set(el.querySelectorAll(".text > *, .color, .color ul > *"), {
				x: 0,
				opacity: 1
			});
			scroll.moveText({
				elements: el.querySelectorAll(".text > *, .color")
			});
		});
	});
}

export default animation;