"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import scroll from "../helpers/scroll.js";
import { _q, _qAll, reduceMotionFilter } from '../helpers/helper.js';

function animation(next) {
	// Style - Top and Top Auto
	next.querySelectorAll(".style-top, .style-top--auto, .style-top--left").forEach(el => {
		// Move text
		scroll.moveText({
			elements: el.querySelectorAll(".text h1, .text h4, .text h2, .text h3, .text li, .text p")
		});

		ScrollTrigger.defaults({
			start: "0 100%",
			end: "100% 0",
			scrub: reduceMotionFilter() ? true : .75
		});

		// Move thumbnails
		el.querySelectorAll(".thumbs").forEach(thumbs => {
			var screen = gsap.matchMedia();
			screen.add("(max-aspect-ratio: 1/1)", () => {
				scroll.push(tl => {
					tl.fromTo(thumbs, {
						x: 0
					}, {
						x: "-50%",
						ease: "linear"
					});

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: el,
						animation: tl
					});
				});
			});
			screen.add("(min-aspect-ratio: 1/1)", () => {
				var scrollid = 0;
				function scrolling() {
					var computedStyle = getComputedStyle(el);
					var elWidth = el.clientWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));

					scrollid = scroll.push(tl => {
						tl.fromTo(thumbs, {
							x: 0
						}, {
							x: elWidth - thumbs.offsetWidth,
							ease: "linear"
						});

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							animation: tl
						});
					});
				}
				scrolling();

				const resizeObserver = new ResizeObserver(_ => {
					scroll.kill(scrollid);
					scrolling();
				});
				resizeObserver.observe(thumbs);
			});
		});

		// Move column
		el.querySelectorAll(".style-column").forEach(cols => {
			scroll.push(tl => {
				tl.fromTo(cols.children, {
					opacity: 0,
					y: 100
				}, {
					opacity: 1,
					y: 0,
					ease: "ease.out",
					duration: .5,
					stagger: .1
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: cols,
					start: "0 95%",
					end: "100% 95%",
					toggleActions: reduceMotionFilter() ? "none none none none" : "play none none reset",
					scrub: false,
					animation: tl
				});
			});
		});
		// Reset
		ScrollTrigger.defaults({});
		// Move thumbnail again
		scroll.moveThumbs(el.querySelectorAll(".thumbs > picture"));
	});

	// Style - Top Text
	next.querySelectorAll(".style-top--text").forEach(el => {
		// Move text
		scroll.moveText({
			elements: el.querySelectorAll(".text h2, .text li")
		});
	});

	// Style - Top Coverflow
	next.querySelectorAll(".style-top--coverflow").forEach(el => {
		var screen = gsap.matchMedia();

		// Vertical screen
		screen.add("(max-aspect-ratio: 1/1)", () => {
			// Move text
			scroll.moveText({
				elements: el.querySelectorAll(".text h1, .text h4, .text h2, .text h3, .text p, .text .meta")
			});

			// Move image
			scroll.push(tl => {
				var pictures = el.querySelectorAll(".thumbs > picture");

				pictures.forEach((picture, index) => {
					tl.fromTo(picture, {
						y: "20vh",
						opacity: 0
					}, {
						y: 0,
						opacity: 1,
						ease: "ease.out",
						duration: pictures.length
					}, (pictures.length / 2) - ((index + 1) / 2));
				});

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

		// Horizontal screen
		screen.add("(min-aspect-ratio: 1/1)", () => {
			// Move text
			scroll.moveText({
				elements: el.querySelectorAll(".text h1, .text h4, .text h2, .text h3, .text .meta > *, .text p")
			});

			// Move image
			scroll.push(tl => {
				var pictures = el.querySelectorAll(".thumbs > picture");

				tl.fromTo(pictures, {
					opacity: 0,
					y: "100%"
				}, {
					opacity: 1,
					y: 0,
					ease: "ease.out",
					stagger: {
						each: .05,
						from: "center"
					},
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "50% 100%",
					end: "50% 100%",
					scrub: reduceMotionFilter(2),
					animation: tl
				});
			});
		});

		// Reset
		ScrollTrigger.defaults({});
	});

	// Style - Static
	next.querySelectorAll(".style-top--static, .style-top--static-auto, .style-top--static-auto-height").forEach(el => {
		var that = el;

		// Move text
		scroll.moveText({
			elements: el.querySelectorAll(".text h1, .text h4, .text h2, .text h3, .text li, .text p, .text small")
		});

		// Move thumbnails
		el.querySelectorAll(".thumbs").forEach(thumbs => {
			scroll.push(tl => {
				tl.fromTo(thumbs, {
					scale: .5
				}, {
					scale: 1,
					ease: "expo.out",
					duration: .75
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					animation: tl,
					start: "40% 100%",
					end: "60% 100%",
					toggleActions: reduceMotionFilter() ? "none none none none" : "play none none reverse",
					scrub: false
				});
			});
		});

		// Move the logos
		el.querySelectorAll(".logos").forEach(el => {
			scroll.push(tl => {
				var logo = el.querySelectorAll("li img");

				tl.fromTo(logo, {
					opacity: 0
				}, {
					opacity: 1,
					ease: "ease.out",
					duration: .45,
					stagger: .05
				}, 0);

				tl.fromTo(logo, {
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
		// Move the logos
		el.querySelectorAll(".ss").forEach(el => {
			scroll.push(tl => {
				var pictures = el.querySelectorAll("li img");

				tl.fromTo(pictures, {
					rotation: -5
				}, {
					rotation: 5,
					ease: "linear",
					duration: .45,
					stagger: .05
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: that,
					start: "0 100%",
					end: "100% 0",
					scrub: reduceMotionFilter() ? 1 : 3,
					animation: tl
				});
			});
		})
	});
}

export default animation;