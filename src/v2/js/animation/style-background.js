"use strict";

import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import scroll from "../helpers/scroll.js";
import { _q, _qAll, reduceMotionFilter } from '../helpers/helper.js';

function animation(next) {
	// Style - Background
	next.querySelectorAll(".style-background:not(.style-background--basic)").forEach(el => {
		var elPicture = el.querySelectorAll(".thumbs");
		// Scroll pictures
		scroll.push(tl => {
			elPicture.forEach(function (picture) {
				tl.fromTo(picture, {
					x: "1%",
					y: "-50%",
				}, {
					x: "-1%",
					y: "50%",
					ease: "linear"
				}, 0);
			});

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: el,
				start: "0 100%",
				end: "100% 0",
				scrub: reduceMotionFilter() ? true : true,
				animation: tl
			});
		});
		// Scroll text
		el.querySelectorAll(".text").forEach(text => {
			scroll.push(tl => {
				tl.fromTo(text, {
					y: "100%"
				}, {
					y: "-100%",
					ease: "linear"
				}, 0);

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 0",
					scrub: reduceMotionFilter() ? true : .5,
					animation: tl
				});
			});
		});
	});
	next.querySelectorAll(".style-background--basic").forEach(el => {
		var elPicture = el.querySelectorAll(".thumbs");
		// Scroll pictures
		scroll.push(tl => {
			elPicture.forEach(function (picture) {
				tl.fromTo(picture, {
					x: "0",
					y: "-50%"
				}, {
					x: "0",
					y: "50%",
					ease: "linear"
				}, 0);
			});

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: el,
				start: "0 100%",
				end: "100% 0",
				scrub: reduceMotionFilter() ? true : true,
				animation: tl
			});
		});
		// Scroll text
		el.querySelectorAll(".text").forEach(text => {
			scroll.push(tl => {
				tl.fromTo(text, {
					y: "50%"
				}, {
					y: "-50%",
					ease: "linear"
				}, 0);

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 0",
					scrub: reduceMotionFilter() ? true : .5,
					animation: tl
				});
			});
		});
	});
	next.querySelectorAll(".style-background--parallax").forEach(el => {
		// Scroll pictures
		scroll.push(tl => {
			el.querySelectorAll(".thumbs").forEach(picture => {
				tl.fromTo(picture, {
					y: "-50%"
				}, {
					y: "50%",
					ease: "linear"
				});
			});

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: el,
				start: "0 100%",
				end: "100% 0",
				scrub: reduceMotionFilter() ? true : true,
				animation: tl
			});
		});
		scroll.push(tl => {
			el.querySelectorAll(".thumbs").forEach(picture => {
				tl.fromTo(picture, {
					scale: "1"
				}, {
					scale: "2",
					ease: "linear",
					duration: reduceMotionFilter() ? 10000 : 120,
					yoyo: true
				});
			});

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: el,
				start: "0% 100%",
				end: "105% 100%",
				toggleActions: reduceMotionFilter() ? "none none none none" : "play pause resume reset",
				scrub: false,
				animation: tl
			});
		});
		// Scroll text and logo
		el.querySelectorAll(".text, .logos").forEach(els => {
			scroll.push(tl => {
				tl.fromTo(els.querySelectorAll("img"), {
					y: "50%",
					scale: .75,
					opacity: 0,
				}, {
					y: "0%",
					scale: 1,
					opacity: 1,
					ease: "expo.out",
					duration: 1
				}, 1);
				tl.fromTo(els.querySelectorAll("small"), {
					opacity: 0,
					y: "50%"
				}, {
					opacity: 1,
					y: "-50%",
					ease: "expo.out",
					duration: 1
				}, .25);

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "95% 100%",
					end: "105% 100%",
					toggleActions: reduceMotionFilter() ? "none none none none" : "play none none reverse",
					scrub: false,
					animation: tl
				});
			});
		});
	});
}

export default animation;