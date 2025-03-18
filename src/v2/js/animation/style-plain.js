"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import scroll from "../helpers/scroll.js";
import { _q, _qAll, reduceMotionFilter } from '../helpers/helper.js';

function animation(next) {
	// Style - Plain
	next.querySelectorAll(".style-plain").forEach(el => {
		// Move the text
		scroll.moveText({
			elements: el.querySelectorAll(".titles > *, h3, p"),
			position: "80%"
		});
	});

	next.querySelectorAll(".style-plain--single").forEach(el => {
		scroll.push(tl => {
			tl.fromTo(el.querySelectorAll(".thumbs > picture"), {
				opacity: 1,
				x: "25vw"
			}, {
				x: "0",
				ease: "power4.out"
			});

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: el,
				start: "0 100%",
				end: "100% 100%",
				scrub: reduceMotionFilter() ? true : 3,
				animation: tl
			});
		});
	});

	next.querySelectorAll(".style-plain--sticky").forEach(el => {
		var pictures = el.querySelectorAll("picture");

		// Scroll animation
		var screen = gsap.matchMedia();

		screen.add("(max-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				pictures.forEach((picture, index) => {
					tl.fromTo(picture, {
						rotation: 0,
						x: (index + 1) * 50 + "%",
						y: (index + 1) * 30 + "%",
						zIndex: pictures.length - index
					}, {
						x: index * 20 + "%",
						y: index * 20 + "%",
						ease: "power1.out",
						duration: 1
					}, 0);

					tl.to(picture, {
						rotation: 0,
						x: (index + 1) * -30 + "%",
						y: (index + 1) * 7.5 + "%",
						ease: "power1.in",
						duration: 1
					}, 1);

					tl.fromTo(picture, {
						opacity: 0,
						ease: "expo.in"
					}, {
						opacity: 1,
						duration: .1
					}, .05);
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 0",
					scrub: reduceMotionFilter() ? true : 1,
					animation: tl
				});
			});
		});
		screen.add("(min-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				pictures.forEach((picture, index) => {
					tl.fromTo(picture, {
						rotation: (pictures.length - index - 1) * 5,
						x: ((pictures.length - index - 1) * 7.5) + "%",
						y: ((pictures.length - index - 1) * 40) + "%",
						zIndex: pictures.length - index
					}, {
						rotation: index * -5,
						x: index * -10 + "%",
						y: index * -80 + "%",
						ease: "power1.inOut",
						duration: 1
					}, 0);

					tl.fromTo(picture, {
						opacity: 0,
						ease: "expo.in"
					}, {
						opacity: 1,
						duration: .1
					}, .05);
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 0",
					scrub: reduceMotionFilter() ? true : 1,
					animation: tl
				});
			});
		});
	});

	next.querySelectorAll(".style-plain--scroll").forEach(el => {
		// Move thumbnail again
		scroll.moveThumbs(el.querySelectorAll(".thumbs > picture"), null);

		var screen = gsap.matchMedia();

		screen.add("(max-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				tl.fromTo(el.querySelector(".thumbs"), {
					x: 0
				}, {
					x: (el.querySelector(".thumbs").offsetWidth - el.querySelector(".scroll").offsetWidth) * -1,
					ease: "ease.in"
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el.querySelector(".thumbs"),
					start: "0 80%",
					end: "100% 80%",
					scrub: reduceMotionFilter() ? true : 3,
					animation: tl
				});
			});
		});
		screen.add("(min-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				tl.fromTo(el.querySelector(".thumbs"), {
					x: (el.querySelector(".thumbs").offsetWidth - el.querySelector(".scroll").offsetWidth) * -1
				}, {
					x: 0,
					ease: "ease.in"
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "50% 100%",
					end: "100% 100%",
					scrub: reduceMotionFilter() ? true : 5,
					animation: tl
				});
			});
		});
	});
}

export default animation;