"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import scroll from "../helpers/scroll.js";
import { _q, _qAll, reduceMotionFilter, hoverEvents } from '../helpers/helper.js';

function animation(next) {
	// Style - Slideshow
	// Full and big
	next.querySelectorAll(".style-slideshow, .style-slideshow--small").forEach(el => {
		var screen = gsap.matchMedia();

		// Add navigation
		el.insertAdjacentHTML('beforeend', "<div class='before'></div><div class='after'></div>");
		// Variables
		var that = el;
		that.slideshowScroll = that.querySelector("div");
		that.slideshowParent = that.querySelector("ol");
		that.slideshowChild = that.slideshowScroll.querySelectorAll("li");

		that.l = gsap.utils.toArray(that.slideshowChild).length;
		that.pos = 0;
		that.pos_start = true;
		that.pos_end = false;
		that.before = that.querySelector(".before");
		that.after = that.querySelector(".after");
		// Fixed size
		that.fixedSize = function () {
			var width = 0;

			that.slideshowParent.style.removeProperty('width');

			gsap.utils.toArray(that.slideshowChild).forEach(function (element) {
				element.style.removeProperty('width');
				gsap.set(element, {
					width: element.offsetWidth
				});
				width += element.offsetWidth;
			});

			gsap.set(that.slideshowParent, {
				// height: that.offsetHeight,
				width: width
			});
			gsap.set(that.slideshowScroll, {
				// height: that.offsetHeight + 50,
				width: that.offsetWidth
			});
		}
		that.fixedSize();
		window.addEventListener("resize", that.fixedSize);
		screen.add("(max-aspect-ratio: 1/1)", () => {
			gsap.set(that, {
				marginBottom: "calc(2 * var(--padxl))"
			});
		});
		// Check position
		that.checkPos = function () {
			var rect = this.slideshowParent.getBoundingClientRect();

			this.pos_start = this.pos_end = false;
			this.pos = Math.round((rect.left * -1) / this.slideshowChild[this.pos].offsetWidth);

			if (this.pos == 0) this.pos_start = true;
			if ((Math.round(rect.width) + rect.left - this.slideshowScroll.offsetWidth) <= 10) this.pos_end = true;

			return this.pos;
		}
		// Show / hide navigation
		that.navigationHide = function () {
			that.checkPos();
			gsap.to(that.before, {
				duration: .25,
				opacity: (that.pos_start) ? .15 : 1
			});
			gsap.to(that.after, {
				duration: .25,
				opacity: (that.pos_end) ? .15 : 1
			});
		}
		that.navigationHide();
		// Scroll events
		gsap.utils.toArray(that.slideshowChild).forEach((element, _) => {
			scroll.push(tl => {
				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: element,
					horizontal: true,
					start: "0 0",
					end: "100% 0",
					onUpdate: function () {
						that.navigationHide();
					},
					animation: tl
				});
			});
		});
		// Click events
		that.moveScroll = function (_pos) {
			if (_pos < 0) this.pos = 0;
			else if (_pos > this.l - 1) this.pos = this.l - 1;
			else this.pos = _pos;

			gsap.to(this.slideshowScroll, {
				duration: 2,
				scrollTo: {
					x: this.pos * this.slideshowChild[this.pos].offsetWidth
				},
				ease: "expo.out",
				onStart: _ => {
					removeClass(this.slideshowScroll, "scroll-snap");
				},
				onComplete: _ => {
					addClass(this.slideshowScroll, "scroll-snap");
					this.navigationHide();
				}
			});
		}
		that.before.addEventListener("click", _ => {
			gsap.timeline({
				defaults: {
					ease: "expo"
				}
			}).to(this, {
				duration: .25,
				marginLeft: -25
			}).to(this, {
				duration: .25,
				marginLeft: 0
			});
			that.moveScroll(that.pos - 1);
		});

		screen.add("(min-aspect-ratio: 1/1)", () => {
			hoverEvents([that.before], _ => {
				gsap.to(that.slideshowScroll.querySelectorAll('li picture'), {
					x: 20
				});
			}, _ => {
				gsap.to(that.slideshowScroll.querySelectorAll('li picture'), {
					x: 0
				});
			});
		});
		//
		that.after.addEventListener("click", _ => {
			gsap.timeline({
				defaults: {
					ease: "expo"
				}
			}).to(this, {
				duration: .25,
				marginRight: -25
			}).to(this, {
				duration: .25,
				marginRight: 0
			});
			that.moveScroll(that.pos + 1);
		});
		var screen = gsap.matchMedia();

		screen.add("(min-aspect-ratio: 1/1)", () => {
			hoverEvents([that.after], function (e) {
				gsap.to(that.slideshowScroll.querySelectorAll('li picture'), {
					x: -20
				});
			}, function (e) {
				gsap.to(that.slideshowScroll.querySelectorAll('li picture'), {
					x: 0
				});
			});
		});
		// Scroll animation
		// Appear animation for pictures
		scroll.push(tl => {
			tl.fromTo(that.slideshowScroll, {
				opacity: 0,
				y: 500
			}, {
				opacity: 1,
				y: 0,
				ease: "expo.out"
			}, 0);

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: that,
				start: "12.5% 90%",
				end: "50% 90%",
				scrub: reduceMotionFilter(2),
				animation: tl
			});
		});
		// Appear animation for arrow
		scroll.push(tl => {
			tl.fromTo(that.before, {
				x: -100
			}, {
				x: 0,
				ease: "expo.out"
			}, 0);
			tl.fromTo(that.after, {
				x: 100
			}, {
				x: 0,
				ease: "expo.out"
			}, 0);

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: that.before,
				start: "0 90%",
				end: (window.innerHeight / 5) + " 90%",
				scrub: reduceMotionFilter(2),
				animation: tl
			});
		});
	});
	// Smaller one
	next.querySelectorAll(".style-slideshow--small").forEach(el => {
		scroll.push(tl => {
			tl.fromTo(el.querySelectorAll("picture"), {
				x: "200%"
			}, {
				x: 0,
				ease: "ease.out"
			}, 0);

			tl.fromTo(el.querySelectorAll("picture"), {
				opacity: 0,
				y: "50%",
			}, {
				opacity: 1,
				y: "0%",
				ease: "ease.out",
				stagger: .1
			}, 0);

			return tl;
		}, tl => {
			return ScrollTrigger.create({
				trigger: el,
				start: "0 90%",
				end: "50% 90%",
				scrub: reduceMotionFilter(2),
				animation: tl
			});
		});
	});
}

function clear() {
	// Remove event listener from slideshow
	gsap.utils.toArray(".style-slideshow").forEach(slideshow => {
		window.removeEventListener("resize", slideshow.fixedSize);
	});
}

export default { animation, clear };