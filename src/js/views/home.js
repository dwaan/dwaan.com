"use strict";

import ScrollTrigger from 'gsap/ScrollTrigger';
import scroll from "../helpers/scroll.js";
import flare from "../helpers/flares.js";
import { hoverEvents } from '../helpers/helper.js';

let homeview = {
	namespace: 'home',
	beforeEnter: data => {
		var next = data.next.container;

		// Scroll text
		var els = next.querySelectorAll("section.middle");
		els.forEach((el, idx) => {
			var maintext = el.querySelectorAll(".main-text > *, .padding > *");

			ScrollTrigger.matchMedia({
				"(min-aspect-ratio: 1/1)": () => {
					// Fade out
					scroll.push(tl => {
						tl.fromTo(maintext, {
							y: 0
						}, {
							y: window.innerHeight * 1 / 3,
							ease: "power1.out",
							duration: 3
						}, 0);

						tl.fromTo(maintext, {
							opacity: 1
						}, {
							opacity: 0,
							ease: "expo.in",
							duration: 1
						}, 2);

						return tl;
					}, tl => ScrollTrigger.create({
						trigger: el,
						start: "50% 50%",
						end: "100% 50%",
						scrub: true,
						animation: tl
					}));

					// Fade in
					scroll.push(tl => {
						tl.fromTo(maintext, {
							opacity: 0
						}, {
							opacity: 1,
							ease: "expo.out",
							duration: 1
						}, 0);

						tl.fromTo(maintext, {
							y: window.innerHeight * -1 / 3
						}, {
							y: 0,
							ease: "power1.in",
							duration: 3
						}, 0);

						return tl;
					}, tl => ScrollTrigger.create({
						trigger: el,
						start: "0% 50%",
						end: "50% 50%",
						scrub: true,
						animation: tl
					}));
				}
			});

			// Hover
			hoverEvents(next.querySelectorAll("#to-about"), () => {
				flare.show(".flares .flare");
			}, () => {
				flare.hide();
			});

			// Snap
			scroll.snap(el);
		});
	},
	afterEnter: () => console.info("Hello, my name is Dwan!")
}

export default homeview;