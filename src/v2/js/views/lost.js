"use strict";

import { gsap } from 'gsap';
import { hoverEvents, splitText, reduceMotionFilter } from "../helpers/helper.js";

var lostview = {
	namespace: 'lost',
	beforeEnter: function (data) {
		var next = data.next.container;
		var speed = reduceMotionFilter() ? 60 : 10,
			tween = [];

		// Background text
		for (var i = 0; i < 5; i++) {
			if (i % 2 == 0) {
				tween[i] = gsap.fromTo("#lost h2:nth-child(" + (i + 1) + ") span", {
					xPercent: -50
				}, {
					xPercent: 0,
					duration: speed + (i * 2),
					ease: "linear",
					repeat: -1,
				})
			} else {
				tween[i] = gsap.fromTo("#lost h2:nth-child(" + (i + 1) + ") span", {
					xPercent: 0
				}, {
					xPercent: -50,
					duration: speed + (i * 2),
					ease: "linear",
					repeat: -1,
				})
			}
		}

		next.querySelectorAll("#nomokeybusiness p").forEach(function (el) {
			var screen = gsap.matchMedia();

			splitText(el);

			screen.add("(min-aspect-ratio: 1/1)", () => {
				var text = {
					speed: 1
				};

				gsap.set(el.querySelectorAll(".splext"), {
					y: 0,
					rotation: "random(-180,180,180)"
				});

				hoverEvents([el], () => {
					gsap.killTweensOf(text);

					gsap.to(el.querySelectorAll(".splext"), {
						rotation: 0,
						duration: .5,
						ease: "expo",
						stagger: .005
					});

					if (reduceMotionFilter()) return;

					gsap.to(text, {
						speed: 5,
						duration: 10,
						ease: "linear",
						onUpdate: () => {
							for (var i = 0; i < 5; i++) {
								tween[i].timeScale(text.speed);
							}
						}
					});
				}, () => {
					gsap.killTweensOf(text);

					gsap.to(el.querySelectorAll(".splext"), {
						rotation: "random(-180,180,180)",
						duration: .5,
						ease: "expo",
						stagger: .005
					});

					if (reduceMotionFilter()) return;

					gsap.to(text, {
						speed: 1,
						duration: 2,
						ease: "back.out",
						onUpdate: () => {
							for (var i = 0; i < 5; i++) {
								tween[i].timeScale(text.speed);
							}
						}
					});
				});
			});

			screen.add("(max-aspect-ratio: 1/1)", () => {
				gsap.set(el.querySelectorAll(".splext"), {
					y: "random(-1,1,1)",
					rotation: "random(-5,5,1)"
				});
			});
		});
	}
}

export default lostview;