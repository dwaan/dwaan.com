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
			var maintext = el.querySelectorAll(".main-text > *, .padding > *");

			// Animate text
			scroll.push(tl => {
				//Show
				tl.fromTo(maintext, {
					y: idx == 0 ? 0 : window.innerHeight * 1 / 5
				}, {
					y: 0,
					ease: "linear"
				});

				tl.to(maintext, {
					y: window.innerHeight * -1 / 5,
					ease: "linear"
				});

				return tl;
			}, tl => ScrollTrigger.create({
				trigger: el,
				start: "15% 50%",
				end: "85% 50%",
				scrub: 1,
				animation: tl
			}));

			// Snap
			scroll.snap(el);
		});
	},
	afterEnter: () => console.info("Hello, my name is Dwan!")
}

export default homeview;