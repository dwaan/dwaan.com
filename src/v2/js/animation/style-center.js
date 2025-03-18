"use strict";

import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { _q, _qAll, reduceMotionFilter } from '../helpers/helper.js';
import scroll from "../helpers/scroll.js";

function animation(next) {
	// Style - Center
	next.querySelectorAll(".style-center:not(.style-picture-parallax), .style-center--small").forEach(el => {
		// Move the text
		scroll.moveText({
			elements: el.querySelectorAll(".text > h2, .text > .meta, .text .zero > li")
		});

		// Move the thumbnials
		scroll.push(tl => {
			var pictures = el.querySelectorAll(".thumbs > picture");

			tl.fromTo(pictures, {
				y: "20vh",
				opacity: 0
			}, {
				y: 0,
				opacity: 1,
				ease: "ease.out",
				duration: 2,
				stagger: {
					position: "end",
					amount: .5
				}
			});

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: el.querySelector(".thumbs"),
				start: "-25% 100%-=50px",
				end: "100% 100%-=50px",
				scrub: reduceMotionFilter() ? true : 2,
				animation: tl
			});
		});
	});
	next.querySelectorAll(".style-picture-parallax").forEach(el => {
		// Move the text
		scroll.moveText({
			elements: el.querySelectorAll(".text > h3, .text > p")
		});

		// Move the thumbnials
		scroll.push(tl => {
			var pictures = el.querySelectorAll(".thumbs > picture");

			tl.fromTo(pictures, {
				opacity: 0
			}, {
				opacity: 1,
				ease: "ease.out",
				stagger: .2,
				duration: .5
			}, 0);

			tl.fromTo(pictures, {
				y: "25vh"
			}, {
				y: 0,
				ease: "ease.out",
				stagger: .2,
				duration: 1
			}, 0);

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: el.querySelector(".thumbs"),
				start: "-25% 100%-=50px",
				end: "100% 100%-=50px",
				scrub: reduceMotionFilter(2),
				animation: tl
			});
		});
	});
	next.querySelectorAll(".style-center--condensed").forEach(el => {
		// Move the text
		scroll.moveText({
			elements: el.querySelectorAll(".text.anim h4, .text.anim h1, .text.anim p")
		});

		// Move the logos
		el.querySelectorAll(".logos").forEach(el => {
			scroll.push(tl => {
				var pictures = el.querySelectorAll("li");

				tl.fromTo(pictures, {
					opacity: 0
				}, {
					opacity: 1,
					ease: "ease.out",
					duration: .45,
					stagger: .05
				}, 0);

				tl.fromTo(pictures, {
					scale: .75
				}, {
					scale: 1,
					ease: "elastic.out",
					duration: 1,
					stagger: .05
				}, 0);

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "0 100%",
					toggleActions: reduceMotionFilter() ? "none none none none" : "play none none reset",
					scrub: false,
					animation: tl
				});
			});
		})
	});
}

export default animation;