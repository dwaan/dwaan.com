"use strict";

import gsap from 'gsap';
import { _q, removeStyle, addClass, removeClass } from './helper';

// Animate functions
var animate = {
	top: function (el, tl) {
		var top = el == window ? el.pageYOffset : el.scrollTop;
		if (tl == null) tl = gsap;

		// Scroll to top
		var scroll = top / (window.outerHeight * 2);
		if (scroll > 0) {
			removeClass(_q("html"), "snap");
			tl.to(el, {
				scrollTo: 0,
				duration: reduceMotionFilter((scroll > 2) ? 2 : scroll),
				ease: "expo.inOut",
				onComplete: function () {
					addClass(_q("html"), "snap");
				}
			}, 0);
		}

		return tl;
	},
	show: function (next, nonsticky = false, footer = true) {
		return new Promise(resolve => {
			if (next == undefined) resolve(false);
			else {
				// Default gsap timeline value
				var tl = gsap.timeline({
					defaults: {
						duration: reduceMotionFilter(1.28),
						stagger: .16,
						ease: "expo.out"
					}
				});

				// Unhide main element
				tl.to(next, { opacity: 1 }, 0);

				// Show current view
				var els = next.querySelectorAll(".flares:not(.side)")
				if (footer) els = next.querySelectorAll(".flares:not(.side), .footer > *");
				if (!nonsticky) nonsticky = next.querySelector("section.middle > *:not(.arrow-big, .year)");

				// Animate text
				tl.fromTo([nonsticky, els], {
					y: "+=200px",
					opacity: 0
				}, {
					y: "-=200px",
					opacity: 1,
					onComplete: () => {
						if (nonsticky) { removeStyle(nonsticky) }
					}
				}, 0);
				// Animate flare
				tl.fromTo(next.querySelectorAll(".flares.side > img"), {
					x: "+=" + (window.innerWidth * 1 / 2) + "px",
					opacity: 0
				}, {
					x: "-=" + (window.innerWidth * 1 / 2) + "px",
					opacity: 1
				}, 0);
				// Run done after all all animation complete
				tl.set(next, {
					onComplete: () => resolve(true)
				});
			}
		});
	},
	showinstant: function (next) {
		return new Promise(resolve => {
			if (next == undefined) resolve(false);

			// Unhide main element
			gsap.set(next, { opacity: 1 }, 0);

			// Run done after all all animation complete
			resolve();
		});
	},
	show404: function (next) {
		return new Promise(resolve => {
			if (next == undefined) resolve(false);
			else {
				// Default gsap timeline value
				var tl = gsap.timeline({
					defaults: {
						duration: reduceMotionFilter(1),
						stagger: .1,
						ease: "expo.out"
					}
				});

				// Unhide main element
				tl.set(next, {
					opacity: 1
				}, 0);


				// Show current view

				// Animate text
				tl.fromTo(next.querySelectorAll(".text > *"), {
					y: "+=200px",
					opacity: 0
				}, {
					y: "-=200px",
					opacity: 1,
					onCompleteParams: [[next.querySelectorAll(".text > *")]],
					onComplete: function (els) {
						removeStyle(els);
						resolve();
					}
				}, 0);
				tl.fromTo(next.querySelectorAll("#lost h2"), {
					x: "-=300",
					opacity: 0
				}, {
					x: 0,
					opacity: 1,
					stagger: .1
				}, 0);

				// Animate Mr. Monkey
				var mrmonkey = next.querySelectorAll("#mrmonkey");
				tl.fromTo(mrmonkey, {
					y: "-100%"
				}, {
					y: "-50%",
					rotation: 5,
					duration: reduceMotionFilter(4),
					ease: "elastic"
				}, .5);
				tl.to(mrmonkey, {
					y: "-32.5%",
					rotation: -2.5,
					duration: reduceMotionFilter(5),
					ease: "expo"
				});
				tl.to(mrmonkey, {
					y: "-10%",
					rotation: 0,
					duration: reduceMotionFilter(5),
					ease: "elastic.out"
				});
				tl.to(mrmonkey, {
					y: "-5%",
					rotation: 0,
					duration: reduceMotionFilter(5),
					ease: "expo"
				});
				tl.to(mrmonkey, {
					y: "0%",
					duration: reduceMotionFilter(5),
					repeat: -1,
					yoyo: true,
					ease: "back.out"
				});
			}
		});
	},
	hide: function (current, nonsticky, scrolltop) {
		return new Promise(resolve => {
			if (current == undefined) resolve(false);
			else {
				if (nonsticky == undefined) nonsticky = false;
				if (scrolltop == undefined) scrolltop = true;

				// Default gsap timeline value
				var tl = gsap.timeline({
					defaults: {
						duration: reduceMotionFilter(.75),
						ease: "power3.in",
						stagger: {
							from: "end",
							amount: .1
						}
					}
				});

				// Scroll to top
				// if (scrolltop) tl = this.top(current, tl);
				if (scrolltop) tl = this.top(window, tl);

				// Hide current view
				tl.to(current.querySelectorAll(".flares:not(.side), .menu-page ol > li, .footer > *"), {
					y: "+=200",
					opacity: 0
				}, ">");
				tl.to(current.querySelectorAll(".flares.side img"), {
					x: "+=300",
					opacity: 0,
					delay: .1
				}, "<");
				if (!nonsticky) nonsticky = current.querySelector("section.middle").children;
				tl.to(nonsticky, {
					y: "+=200",
					opacity: 0,
					delay: .2
				}, "<");

				// Run loading after all animation
				tl.set(current, {
					onComplete: () => resolve(true)
				});
			}
		});
	},
	hide404: function (current) {
		return new Promise(resolve => {
			if (current == undefined) resolve(false);
			else {
				// Default gsap timeline value
				var tl = gsap.timeline({
					defaults: {
						duration: reduceMotionFilter(.75),
						ease: "power3.in",
						stagger: {
							from: "end",
							amount: .1
						}
					}
				});

				// Hide current view
				tl.to(current.querySelectorAll(".thumbs"), {
					y: "-80%",
					opacity: 0
				}, ">");
				tl.to(current.querySelectorAll("#lost h2"), {
					x: 0,
					opacity: 0,
					stagger: .1
				}, "<");
				tl.to(current.querySelectorAll(".text"), {
					y: "+=300",
					opacity: 0
				}, "<");

				// Run loading after all animation
				tl.set(current, {
					onComplete: () => resolve(true)
				});
			}
		});
	},
}

export default animate;