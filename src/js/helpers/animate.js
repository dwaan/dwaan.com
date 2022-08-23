"use strict";

import gsap from 'gsap';
import { _q, removeStyle, addClass, removeClass, reduceMotionFilter } from './helper';

// Animate functions
var animate = {
	top: function (el) {
		return new Promise(resolve => {
			var top = el == window ? el.pageYOffset : el.scrollTop;

			// Scroll to top
			var scroll = top / (window.outerHeight * 2);
			var speed = reduceMotionFilter() ? .5 : 2;
			if (scroll > 0) {
				removeClass(_q("html"), "snap");
				gsap.to(el, {
					scrollTo: 0,
					duration: (scroll > speed) ? speed : scroll,
					ease: "expo.inOut",
					onComplete: function () {
						addClass(_q("html"), "snap");
						resolve();
					}
				});
			} else {
				resolve();
			}
		});
	},
	show: function (next, nonsticky, footer) {
		return new Promise(resolve => {
			if (next == undefined) resolve();
			else {
				var length = reduceMotionFilter(1);

				if (footer === undefined) footer = true;
				if (nonsticky === undefined) nonsticky = false;

				// Default gsap timeline value
				var tl = gsap.timeline({
					defaults: {
						duration: length * 5 / 4,
						stagger: length / 8,
						ease: "expo.out"
					}
				});

				// Unhide main element
				tl.to(next, { opacity: 1 }, 0);

				// Show current view
				var els = next.querySelectorAll(".flares:not(.side)")
				if (footer) els = next.querySelectorAll(".flares:not(.side), .footer > *");
				if (!nonsticky) nonsticky = next.querySelectorAll(".main-text > *:not(.hidden), .arrow-big .arrow");

				// Animate text
				tl.fromTo(nonsticky, {
					y: "+=200px",
					opacity: 0
				}, {
					y: "-=200px",
					opacity: 1,
					onComplete: () => {
						if (nonsticky) { removeStyle(nonsticky) }
					}
				}, 0);
				// Animate footer or flares
				tl.fromTo(els, {
					y: "+=200px",
					opacity: 0
				}, {
					y: "-=200px",
					opacity: 1
				}, "<+=" + length / 8);
				// Animate flares
				tl.fromTo(next.querySelectorAll(".flares.side > img"), {
					x: "+=" + (window.innerWidth * 1 / 2) + "px",
					opacity: 0
				}, {
					x: "-=" + (window.innerWidth * 1 / 2) + "px",
					opacity: 1
				}, 0);
				// Run done after all all animation complete
				tl.set(next, {
					onComplete: () => resolve()
				}, ">-" + length / 8);
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
						duration: 1,
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
					x: reduceMotionFilter() ? 0 : "-=300",
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
					duration: 4,
					ease: "elastic"
				}, .5);
				tl.to(mrmonkey, {
					y: "-32.5%",
					rotation: -2.5,
					duration: 5,
					ease: "expo"
				});
				tl.to(mrmonkey, {
					y: "-10%",
					rotation: 0,
					duration: 5,
					ease: "elastic.out"
				});
				tl.to(mrmonkey, {
					y: "-5%",
					rotation: 0,
					duration: 5,
					ease: "expo"
				});
				tl.to(mrmonkey, {
					y: "0%",
					duration: 5,
					repeat: -1,
					yoyo: true,
					ease: "back.out"
				});
			}
		});
	},
	hide: function (current, nonsticky, scrolltop) {
		return new Promise(async resolve => {
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
				if (scrolltop) await this.top(window);

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
			let length = reduceMotionFilter(1);

			if (current == undefined) resolve(false);
			else {
				// Default gsap timeline value
				var tl = gsap.timeline({
					defaults: {
						duration: length * 3 / 4,
						ease: "power3.in",
						stagger: {
							from: "end",
							amount: length / 10
						}
					}
				});

				// Hide current view
				tl.to(current.querySelectorAll(".thumbs"), {
					y: "-80%",
					opacity: 0,
					duration: length,
				}, ">");
				tl.to(current.querySelectorAll("#lost h2"), {
					x: 0,
					opacity: 0,
					stagger: length / 10,
					duration: length,
				}, "<");
				tl.to(current.querySelectorAll(".text"), {
					y: "+=300",
					opacity: 0,
					duration: length,
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