"use strict";

import { gsap, ScrollTrigger } from 'gsap/all';

// Predefined scroll animation
var scroll = {
	l: 0,
	tl: [],
	st: [],
	// Move elements up with opacity with scrub
	moveText: function (params) {
		if (!params) return false;

		var elements = (params.elements) ? params.elements : [];
		var position = (params.position) ? params.position : "85%";
		var delta = (params.delta) ? params.delta : 100;
		var move = (params.move === undefined) ? true : params.move;
		var markers = (params.markers) ? params.markers : false;
		var horizontal = (params.horizontal) ? params.horizontal : false;
		var scroller = (params.scroller) ? params.scroller : window;
		var that = this;

		gsap.utils.toArray(elements).forEach(function (element, index) {
			var y = delta + (15 * index);
			var trigger = (params.trigger) ? params.trigger : element.parentNode;
			if (!move) y = 0;

			that.l = that.tl.push(gsap.timeline()) - 1;

			if (horizontal) {
				that.tl[that.l].fromTo(element, {
					x: y,
					opacity: 0,
				}, {
					x: 0,
					opacity: 1,
					ease: "ease.out"
				}, 0);
			} else {
				that.tl[that.l].fromTo(element, {
					y: y,
					opacity: 0,
				}, {
					y: 0,
					opacity: 1,
					ease: "ease.out"
				}, 0);
			}

			that.st.push(ScrollTrigger.create({
				scroller: scroller,
				markers: markers,
				trigger: trigger,
				start: "0 " + position,
				end: "+=175 " + position,
				scrub: 2,
				animation: that.tl[that.l]
			}));
		});
	},
	// Move elements up without scrub
	moveThumbs: function (elements, position, scroller) {
		var that = this;

		scroller = (scroller) ? scroller : window;

		if (!position) position = "85%";
		gsap.utils.toArray(elements).forEach(function (element) {
			var y = gsap.utils.random(250, 500, 5) + "px";

			that.l = that.tl.push(gsap.timeline()) - 1;
			that.tl[that.l].fromTo(element, {
				y: y
			}, {
				y: 0,
				duration: reduceMotionFilter(.75),
			}, 0);

			that.st.push(ScrollTrigger.create({
				scroller: scroller,
				trigger: element.parentNode,
				start: "0 " + position,
				end: "0 " + position,
				toggleActions: "restart none none reverse",
				animation: that.tl[that.l]
			}));
		});
	},
	snap: function (el, type = "regular") {
		let start = "0 0";
		let end = "100% 0";

		type = type.toLowerCase();
		if (type == "bottom") {
			start = "0 100%";
			end = "100% 100%";
		}

		// Snap
		let duration = 1;
		let direction = false;
		this.push(tl => tl, tl => ScrollTrigger.create({
			trigger: el,
			start: start,
			end: end,
			animation: tl,
			onUpdate: self => direction = self.direction,
			snap: {
				snapTo: value => {
					let final = value <= .25 ? 0 : direction <= 0 ? 0 : 1;
					if (type == "center") final = value <= .5 ? .25 : direction <= 0 ? .25 : 1;
					duration = value / 2;
					return final;
				},
				duration: reduceMotionFilter(duration),
				delay: 0,
				ease: "expo.inOut"
			}
		}));
	},
	refresh: function () {
		for (var i = 0; i < this.st.length; i++) {
			this.st[i].refresh();
		}
	},
	// Add custom animation
	push: function (animationFunction, scrollFunction) {
		if (!animationFunction || !scrollFunction) return false;

		this.l = this.tl.push(gsap.timeline()) - 1;

		if (typeof animationFunction === "function") {
			this.tl[this.l] = animationFunction(this.tl[this.l]);
		}

		if (typeof scrollFunction === "function") {
			this.st.push(scrollFunction(this.tl[this.l]));
		}
	},
	// Call this to remove garbage
	destroy: function () {
		// Cleaning up GSAP timeline
		for (var i = 0; i < this.tl.length; i++) {
			this.tl[i].kill();
		}
		this.tl = [];
		// Cleaning up ScrollTrigger
		for (var i = 0; i < this.st.length; i++) {
			this.st[i].kill();
		}
		this.st = [];
		//
		this.l = 0;

		// Scroll to top
		window.scrollTo(0, 0);
	}
}

export default scroll;