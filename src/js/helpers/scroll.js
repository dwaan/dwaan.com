"use strict";

import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

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
				scrub: 1,
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
				duration: .75,
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
		let start = "0 100%";
		let end = "100% 100%";

		type = type.toLowerCase();

		if (type == "top") {
			start = "0 0";
			end = "100% 100%";
		} else if (type == "center") {
			start = "0 50%";
			end = "100% 50%";
		}

		// Snap
		let duration = 1;
		this.push(tl => tl, tl => ScrollTrigger.create({
			trigger: el,
			start: start,
			end: end,
			animation: tl,
			markers: type == "top" ? true : false,
			snap: {
				snapTo: value => {
					let final = value <= 0.5 ? 0 : 1;
					if (type == "center") {
						final = .5;
					}

					duration = value;
					console.log(value, final);

					return final;
				},
				duration: duration,
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
	}
}

export default scroll;