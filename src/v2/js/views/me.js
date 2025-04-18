"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import scroll from "../helpers/scroll.js";
import { addClass, removeClass, reduceMotionFilter } from "../helpers/helper.js";

var meview = {
	namespace: 'me',
	beforeLeave: data => {
		var current = data.current.container;
		removeClass(current.querySelector(".main-text h1 strong"), "emphasis");
	},
	beforeEnter: data => {
		var next = data.next.container;

		// Main text
		next.querySelectorAll("#about").forEach(element => {
			var text = element.querySelectorAll(".main-text");
			var screen = gsap.matchMedia();

			screen.add("(max-aspect-ratio: 1/1)", () => {
				gsap.set(text, {
					position: "relative",
					pointerEvents: "auto",
					opacity: 1,
					top: 0,
					y: 0
				});
			});
			screen.add("(min-aspect-ratio: 1/1)", () => {
				// Stick on pos y
				gsap.set(text, {
					position: "fixed",
					top: "50%",
					y: "-50%"
				}, 0);

				scroll.push(tl => {
					tl.fromTo(text, {
						pointerEvents: "auto"
					}, {
						pointerEvents: "none",
						duration: reduceMotionFilter(1)
					}, 0);

					tl.fromTo(text, {
						opacity: 1
					}, {
						opacity: 0,
						ease: 'expo.out',
						duration: reduceMotionFilter(.5)
					}, 0);

					tl.set(text, {
						position: "relative"
					}, 1);

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: "100% 0",
						animation: tl,
						scrub: true
					});
				});
			});
		});

		// Big red dot
		next.querySelectorAll("#usedto").forEach(element => {
			var middle = element.querySelectorAll(".middle");
			var screen = gsap.matchMedia();

			screen.add("(min-aspect-ratio: 1/1)", () => {
				// Stick on pos y when showing and hiding
				scroll.push(tl => {
					tl.set(middle, {
						position: "fixed",
						top: "50%",
						y: "-50%",
						pointerEvents: "none"
					}, 0);

					tl.set(middle, {
						pointerEvents: "auto"
					}, 1);

					tl.set(middle, {
						position: "absolute",
						pointerEvents: "none"
					}, 4);

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 100%",
						end: "400% 100%",
						animation: tl,
						scrub: true
					});
				});

				gsap.set(middle, {
					display: "none",
					opacity: 0,
					x: 0,
					scale: 3
				});
				// Fade in and scale down
				scroll.push(tl => {
					// Red dot - fade in
					tl.to(middle, {
						display: "flex",
						opacity: 1,
						ease: 'expo.in',
						duration: reduceMotionFilter(.25)
					}, 0);

					// Red dot - scale down in
					tl.to(middle, {
						x: 0,
						scale: 1,
						duration: reduceMotionFilter(.75)
					}, 0);

					// Text - move in, fade in, and fade out
					middle.forEach(function (el) {
						// Move in
						tl.fromTo(el.querySelectorAll(".text > *"), {
							y: 200,
						}, {
							y: 0,
							ease: 'expo.out',
							duration: reduceMotionFilter(1)
						}, 0);

						// Fade in
						tl.fromTo(el.querySelectorAll(".text > *"), {
							opacity: 0,
						}, {
							opacity: 1,
							ease: 'expo.out',
							duration: reduceMotionFilter(.5)
						}, .125);
					});

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 100%",
						end: "75% 100%",
						animation: tl,
						scrub: 1
					});
				});

				// Move to left and scale down
				scroll.push(tl => {
					// Red dot - Move left
					tl.fromTo(middle, {
						x: 0,
						scale: 1,
					}, {
						x: window.innerWidth * -1 / 2,
						scale: .15,
						duration: reduceMotionFilter(1)
					}, 0);

					// Text - fade out
					middle.forEach(function (el) {
						// Fade out
						tl.fromTo(el.querySelectorAll(".text > *"), {
							opacity: 1,
						}, {
							opacity: 0,
							ease: 'expo.out',
							duration: reduceMotionFilter(.5)
						}, .5);
					});

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: element,
						start: "100% 100%",
						end: "175% 100%",
						animation: tl,
						scrub: 1
					});
				});

				// Fade out dot
				scroll.push(tl => {
					// Red dot - fade out
					tl.fromTo(middle, {
						opacity: 1,
					}, {
						opacity: 0,
						ease: 'expo.out',
					});

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: element,
						start: "300% 100%",
						end: "375% 100%",
						animation: tl,
						scrub: true
					});
				});

				// Reset
				return () => {
					middle.forEach(els => {
						els.style = "";
						els.querySelectorAll(".text > *").forEach(el => {
							el.style = "";
						});
					});
				}
			});
		});

		// Photo of me on a canoe
		next.querySelectorAll("#now").forEach(element => {
			let thumbs = element.querySelectorAll('.thumbs');

			scroll.push(tl => {
				// Appearing
				tl.fromTo(thumbs, {
					position: "fixed",
					opacity: 0,
					x: -40,
					y: (window.innerHeight * - 1 / 4),
				}, {
					opacity: 1,
					x: -10,
					y: 0,
					ease: 'linear',
					duration: 1
				}, 0);

				// Staying in the view
				tl.fromTo(thumbs, {
					x: -10,
					y: 0,
				}, {
					x: 0,
					y: 25,
					ease: 'linear',
					duration: 2
				});

				// Disappearing
				tl.fromTo(thumbs, {
					opacity: 1,
					x: 0,
					y: 25
				}, {
					opacity: 0,
					x: 20,
					y: (window.innerHeight * 1 / 4) + 25,
					ease: 'linear',
					duration: 1
				});

				// Set to normal
				tl.set(thumbs, {
					position: ""
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: element,
					start: "0% 50%",
					end: "200% 50%",
					animation: tl,
					scrub: true
				});
			});
		});

		// Now, Webdesigner, and Sayhi sections
		next.querySelectorAll("#now, #webdesigner, #sayhi").forEach(element => {
			var isSayHi = element.getAttribute('id') == "sayhi";
			var el = isSayHi ? element.querySelectorAll('.text > div > *, .text > p') : element.querySelectorAll('.text > *');
			var animation = function (horizontal = true) {
				isSayHi = horizontal ? isSayHi : false;

				// Fade in and fade out
				scroll.push(tl => {
					el.forEach(function (el, idx) {
						tl.fromTo(el, {
							opacity: 1
						}, {
							opacity: 0,
							ease: 'linear',
							duration: reduceMotionFilter(.25)
						}, idx / 5);
					});

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: element,
						start: "50% 50%",
						end: "50% -50%",
						animation: tl,
						scrub: .5
					});
				});

				// Slide in
				scroll.push(tl => {
					el.forEach(function (el, idx) {
						tl.fromTo(el, {
							x: isSayHi && idx < 2 ? idx * -50 : 0,
							y: isSayHi && idx < 2 ? 0 : idx * 50
						}, {
							x: 0,
							y: 0,
							ease: 'linear'
						}, 0);
					});

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: element,
						start: "50% 150%",
						end: "50% 50%",
						animation: tl,
						scrub: .5
					});
				});

				// Slide out
				scroll.push(tl => {
					el.forEach(function (el, idx) {
						tl.fromTo(el, {
							x: 0,
							y: 0
						}, {
							x: isSayHi && idx < 2 ? idx * -25 : 0,
							y: isSayHi && idx < 2 ? 0 : idx * -25,
							ease: 'linear'
						}, 0);
					});

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: element,
						start: "50% 50%",
						end: "50% -50%",
						animation: tl,
						scrub: .5
					});
				});
			}
			var screen = gsap.matchMedia();

			screen.add("(max-aspect-ratio: 1/1)", () => {
				animation(false);
			});
			screen.add("(min-aspect-ratio: 1/1)", () => {
				animation();
			});
		});

		// Webdesigner section
		gsap.set(next.querySelectorAll("#webdesigner .thumbs"), {
			display: "none"
		});

		// Spinning Mr. Goat and Pinning
		next.querySelectorAll("#mrgoat").forEach(element => {
			// Statics
			var duration = 1;
			var imgs = element.querySelectorAll(".thumbs > picture");
			var mrgoat = {
				frame: 1
			};
			var prev = false;
			// Defining
			var repeat = 8;
			// Spinning
			gsap.set(imgs, { opacity: 0 });
			scroll.push(tl => {
				tl.to(mrgoat, {
					frame: imgs.length,
					snap: "frame",
					repeat: repeat,
					ease: "linear",
					onUpdate: () => {
						var frame = mrgoat.frame + 4;
						var el;

						if (frame > imgs.length) frame -= imgs.length;
						el = element.querySelector(".mrgoat" + frame);

						if (prev) prev.style.opacity = 0;
						el.style.opacity = 1;

						prev = el;
					},
					duration: reduceMotionFilter(repeat * duration)
				}, 0);

				return tl;
			}, tl => ScrollTrigger.create({
				trigger: "#mrgoat",
				start: "0 100%",
				end: "100% 0",
				animation: tl,
				scrub: .5
			}));
			// Facts text
			var facts = function (els) {
				var tl = gsap.timeline();

				// Fade in
				tl.fromTo(els, {
					opacity: 0
				}, {
					opacity: 1,
					ease: "power3.in",
					duration: reduceMotionFilter(duration)
				});
				// Diagonal line animation
				els.forEach(el => {
					tl.fromTo(el.querySelectorAll(".dot hr"), {
						width: "0%"
					}, {
						width: "100%",
						duration: reduceMotionFilter(duration)
					});
				});
				// Horizontal line animation
				els.forEach(el => {
					tl.fromTo(el.querySelectorAll(".line hr"), {
						width: "0%"
					}, {
						width: "100%",
						duration: reduceMotionFilter(duration)
					});
				});
				// Show text
				els.forEach(el => {
					tl.fromTo(el.querySelectorAll("p"), {
						opacity: 0
					}, {
						opacity: 1,
						duration: reduceMotionFilter(duration)
					});
				});

				// Do nothing
				els.forEach(el => {
					tl.to(el.querySelectorAll("p"), {
						duration: reduceMotionFilter(2 * duration)
					});
				});

				// Middle of animation

				// hide text
				els.forEach(el => {
					tl.to(el.querySelectorAll("p"), {
						opacity: 0,
						duration: reduceMotionFilter(duration)
					});
				});
				// Horizontal line animation
				els.forEach(el => {
					tl.to(el.querySelectorAll(".line hr"), {
						width: "0%",
						duration: reduceMotionFilter(duration)
					});
				});
				// Diagonal line animation
				els.forEach(el => {
					tl.to(el.querySelectorAll(".dot hr"), {
						width: "0%",
						duration: reduceMotionFilter(duration)
					});
				});
				// Fade out
				tl.to(els, {
					opacity: 0,
					ease: "power3.out",
					duration: reduceMotionFilter(duration)
				});

				return tl;
			}
			element.querySelectorAll(".facts").forEach(fact => {
				scroll.push(tl => {
					tl.add(facts([fact]), 0);

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: fact,
						start: "25% 50%",
						end: "75% 50%",
						animation: tl,
						scrub: .5
					});
				});
			});
		});

		// Animate cofounder
		next.querySelectorAll(".cofound").forEach(el => {
			// Animate
			var eltext = el.querySelectorAll(".text");
			scroll.push(tl => {
				tl.fromTo(eltext, {
					y: window.innerHeight * 1 / 10
				}, {
					y: window.innerHeight * -1 / 10,
					ease: "linear",
					duration: reduceMotionFilter(4)
				}, 0);
				tl.fromTo(eltext, {
					opacity: 0
				}, {
					opacity: 1,
					ease: "linear",
					duration: reduceMotionFilter(1)
				}, 0);
				tl.fromTo(eltext, {
					opacity: 1
				}, {
					opacity: 0,
					ease: "linear",
					duration: reduceMotionFilter(1)
				}, 3);

				tl.fromTo(el.querySelectorAll(".thumbs"), {
					y: window.innerHeight * -1 / 4
				}, {
					y: window.innerHeight * 1 / 4,
					ease: "linear",
					duration: reduceMotionFilter(4)
				}, 0);
				return tl;
			}, tl => ScrollTrigger.create({
				trigger: el,
				start: "0 100%",
				end: "100% 0",
				animation: tl,
				scrub: true
			}));
		});

		// Links
		next.querySelectorAll(".links").forEach(el => {
			scroll.moveText({
				elements: el.querySelectorAll("nav > *"),
				position: "100%"
			});
		});

		// Refresh
		ScrollTrigger.refresh();
	},
	afterEnter: data => {
		var next = data.next.container;

		addClass(next.querySelector(".main-text h1 strong"), "emphasis");

		console.info("Hello, my name is Dwan! I'm a UI/UX Designer and Strategist a.k.a. Web Designer in Steroid")
	}
}

export default meview;