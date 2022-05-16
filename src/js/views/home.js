"use strict";

import scroll from "../helpers/scroll.js";
import ScrollTrigger from 'gsap/ScrollTrigger';

let homeview = {
	namespace: 'home',
	beforeEnter: data => {
		var next = data.next.container;

		// Scroll text
		var els = next.querySelectorAll("section.middle");
		els.forEach((el, idx) => {
			var maintext = el.querySelectorAll(".main-text > h1, .padding > a");

			// Animate text
			scroll.push(tl => {
				//Show
				tl.fromTo(maintext, {
					y: idx == 0 ? 0 : window.innerHeight * 1 / 3
				}, {
					y: 0,
					ease: "power3.out"
				});

				return tl;
			}, tl => ScrollTrigger.create({
				trigger: el,
				start: "0 50%",
				end: "50% 50%",
				scrub: 3,
				animation: tl
			}));

			// Snap
			scroll.snap(el);
		});
	},
	afterEnter: () => console.info("Hello, my name is Dwan!")
}

export default homeview;