"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import scroll from "../helpers/scroll.js";
import { _q, _qAll, reduceMotionFilter, hasClass } from '../helpers/helper.js';

function animation(next) {
	// Style - Spread
	next.querySelectorAll(".style-spread").forEach(el => {
		// Move the text
		scroll.moveText({
			elements: el.querySelectorAll(".titles > *, p")
		});

		// Scroll animation
		var screen = gsap.matchMedia();

		screen.add("(max-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				tl.fromTo(el.querySelectorAll(".pic-4"), {
					top: "random(250, 500, 5)px",
					left: "50%",
					rotation: 0
				}, {
					top: 0,
					left: "50%",
					rotation: 7.5,
					ease: "expo.out"
				}, 0);

				tl.fromTo(el.querySelectorAll(".pic-5"), {
					top: "random(250, 500, 5)px",
					left: "initial",
					right: "50%",
					rotation: 0
				}, {
					top: 0,
					right: "50%",
					rotation: -7.5,
					ease: "expo.out"
				}, 0);

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "50% 75%",
					end: "100% 75%",
					animation: tl,
					scrub: reduceMotionFilter() ? true : 1
				});
			});
		});
		screen.add("(min-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				tl.fromTo(el.querySelectorAll(".pic-5"), {
					top: "75%",
					left: "350%",
					right: "initial",
					rotation: 0
				}, {
					top: "40%",
					left: "10%",
					rotation: -30,
					duration: 1,
					ease: "expo.out"
				}, 0);

				tl.fromTo(el.querySelectorAll(".pic-4"), {
					top: "75%",
					left: "350%",
					rotation: 0
				}, {
					top: "25%",
					left: "50%",
					rotation: -10,
					duration: 1,
					ease: "expo.out"
				}, .064);

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "-25% 50%",
					end: "50% 50%",
					scrub: reduceMotionFilter() ? true : 1,
					animation: tl
				});
			});
		});
	});
	next.querySelectorAll(".style-spread--big").forEach(el => {
		// Move the text
		scroll.moveText({
			elements: el.querySelectorAll(".titles > *, p")
		});
		// Scroll animation
		var screen = gsap.matchMedia();

		screen.add("(max-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				for (let idx = 1; idx <= 3; idx++) {
					tl.fromTo(el.querySelectorAll(".pic-" + idx), {
						y: "30%",
						x: -100,
						rotation: 0
					}, {
						y: idx == 1 ? 0 : "10%",
						x: idx == 1 ? "-50%" : idx == 2 ? "-55%" : "-45%",
						rotation: idx == 1 ? 0 : idx == 2 ? -12.5 : 12.5,
						duration: 1
					}, (idx - 1) * .064);
				}

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el.querySelectorAll(".thumbs"),
					start: "50% 100%",
					end: "100% 100%",
					animation: tl,
					scrub: reduceMotionFilter() ? true : 1.25
				});
			});
		});
		screen.add("(min-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				for (let idx = 1; idx <= 3; idx++) {
					var pic = el.querySelector(".pic-" + idx);

					if (pic) {
						tl.fromTo(pic, {
							top: (9.5 - (idx * 5 / 6)) * 10 + "%",
							left: (12.25 + (idx * 5 / 4)) * 10 + "%",
							rotation: (idx + 2) * 5
						}, {
							top: hasClass(pic, "top") ? "5%" : (4.5 - (idx * 5 / 6)) * 10 + "%",
							left: hasClass(pic, "top") ? "15%" : (2.25 + (idx * 5 / 4)) * 10 + "%",
							rotation: (idx - 2) * 5,
							duration: 1,
							ease: "expo"
						}, (idx - 1) * .064);
					}
				}

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el.querySelectorAll(".thumbs"),
					start: "-25% 50%",
					end: "50% 50%",
					scrub: reduceMotionFilter() ? true : 2,
					animation: tl
				});
			});
		});
	});
	// Style - Spread Left
	next.querySelectorAll(".style-spread--left").forEach(el => {
		// Move the text
		scroll.moveText({
			elements: el.querySelectorAll(".titles > *, p")
		});
		// Scroll animation
		var screen = gsap.matchMedia();

		screen.add("(max-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				tl.fromTo(el.querySelectorAll(".thumbs picture"), {
					opacity: 0,
					y: 300,
					x: 0,
					rotation: 0
				}, {
					opacity: 1,
					y: 0,
					ease: "expo.out"
				}, 0);

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el.querySelectorAll(".thumbs"),
					start: "0 100%-=100px",
					end: "100% 100%-=100px",
					animation: tl,
					scrub: reduceMotionFilter() ? true : 1
				});
			});
		});
		screen.add("(min-aspect-ratio: 1/1)", () => {
			// Move the pictures
			scroll.push(tl => {
				tl.fromTo(el.querySelectorAll(".thumbs picture"), {
					y: 0,
					x: "-325px",
					opacity: 0,
					rotation: "7.5deg"
				}, {
					x: 0,
					opacity: 1,
					rotation: -5,
					ease: "expo.out"
				}, 0);

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el.querySelectorAll(".thumbs"),
					start: "-50% 50%",
					end: "50% 50%",
					scrub: reduceMotionFilter() ? true : 1,
					animation: tl
				});
			});
		});
	});
}

export default animation;