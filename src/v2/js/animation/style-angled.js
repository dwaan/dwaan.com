"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import scroll from "../helpers/scroll.js";
import { _q, _qAll, reduceMotionFilter } from '../helpers/helper.js';

function animation(next) {
	// Style - Angled
	next.querySelectorAll(".style-angled:not(.style-angled--individual), .style-angled--auto").forEach(el => {
		var elPicture = el.querySelectorAll(" .thumbs > picture");
		// Move pictures
		scroll.moveThumbs(elPicture, "75%");
		// Scroll pictures
		var screen = gsap.matchMedia();

		screen.add("(max-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				gsap.utils.toArray(elPicture).forEach(function (picture) {
					tl.fromTo(picture, {
						rotation: -5,
						x: 650,
					}, {
						rotation: -5,
						x: -150
					}, 0);
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					endTrigger: ".links",
					start: "0 100%",
					end: "100% 100%",
					scrub: reduceMotionFilter() ? true : .75,
					animation: tl
				});
			});
		});
		screen.add("(min-aspect-ratio: 1/1)", () => {
			scroll.push(tl => {
				elPicture.forEach(function (picture) {
					tl.fromTo(picture, {
						rotation: 0,
						x: 500,
					}, {
						rotation: 0,
						x: -500,
						ease: "linear"
					}, 0);
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					endTrigger: ".links",
					start: "0 100%",
					end: "100% 100%",
					scrub: reduceMotionFilter() ? true : .75,
					animation: tl
				});
			});
		});
		// Move text
		scroll.moveText({
			elements: el.querySelectorAll(" .text > *, .zero > *"),
			position: "85%"
		});
	});
	next.querySelectorAll(".style-angled--individual").forEach(el => {
		var elPicture = el.querySelectorAll(" .thumbs > picture");
		// Move pictures
		scroll.moveThumbs(elPicture, "100%");
		// Scroll pictures
		scroll.push(tl => {
			elPicture.forEach(function (picture) {
				tl.fromTo(picture, {
					rotation: -5,
					x: 500,
				}, {
					rotation: -5,
					x: -500
				}, 0);
			});

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: el,
				start: "0 100%",
				end: "100% 0",
				scrub: reduceMotionFilter() ? true : .75,
				animation: tl
			});
		});
		// Move text
		scroll.moveText({
			elements: el.querySelectorAll(" .text > *"),
			position: "85%"
		});
	});
}

export default animation;