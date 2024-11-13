"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { hoverEvents, _q, _qAll, reduceMotionFilter } from '../helpers/helper.js';
import scroll from "../helpers/scroll.js";
import flare from "../helpers/flares.js";

let homeview = {
	namespace: 'home',
	beforeEnter: data => {
		var next = data.next.container;

		// Hover "Dwan" to show flare in main text
		hoverEvents(next.querySelectorAll("#to-about"), () => flare.show(".flares .flare"), () => flare.hide());

		// Scroll text
		var screen = gsap.matchMedia();
		var els = next.querySelectorAll("section.middle");
		// Vertical screen
		var contentHeroText = next.querySelectorAll("section.middle .main-text, .padding");
		screen.add("(max-aspect-ratio: 1/1)", () => {
			gsap.set(contentHeroText, {
				position: "relative",
				pointerEvents: "auto",
				opacity: 1,
				top: "0%",
				y: "0%"
			});
		});
		// Horizontal screen
		els.forEach((el, idx) => {
			screen.add("(min-aspect-ratio: 1/1)", () => {
				// Background slide version
				gsap.set(el, {
					zIndex: els.length - idx - 1
				});

				scroll.push(tl => {
					var length = reduceMotionFilter(1);
					var contentLogos = el.querySelectorAll(".padding");
					var contentShade = el.querySelectorAll(".cover");

					tl.fromTo(contentLogos, {
						position: "relative",
						top: 0,
						y: window.innerHeight * 1 / 3
					}, {
						position: "fixed",
						y: 0,
						ease: "linear",
						duration: length
					}, 0);

					tl.fromTo(contentShade, {
						opacity: 1,
					}, {
						opacity: 0,
						ease: "expo.in",
						duration: length
					}, 0);

					tl.set(contentLogos, {
						position: "relative"
					}, length);

					tl.to(contentShade, {
						y: idx == els.length ? 0 : window.innerHeight * 1 / 6,
						ease: "linear",
						duration: length
					}, length);

					return tl;
				}, tl => ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 0",
					scrub: true,
					animation: tl
				}));
			});
			// Snap
			scroll.snap(el);
		});
	},
	afterEnter: () => {
		console.info("Hello, my name is Dwan!");
	}
}

export default homeview;