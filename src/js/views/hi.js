"use strict";

import gsap from "gsap";
import flare from "../helpers/flares.js";
import { hoverEvents, reduceMotionFilter } from "../helpers/helper";

var hiview = {
	namespace: 'hi',
	beforeEnter: function (data) {
		var next = data.next.container;
		var screenhorizontal = window.matchMedia('(min-aspect-ratio: 1/1)').matches;

		var textanim = {
			el: "",
			hint: "",
			show: function (el, hint, positive) {
				var split = -50;

				this.el = el;
				this.hint = hint;

				if (positive) split = 50;

				if (el.length == 2) {
					gsap.killTweensOf(next.querySelectorAll(this.el.toString()));
					gsap.to(next.querySelectorAll(this.el[0]), {
						x: split * -1,
						ease: "power3.out",
						duration: reduceMotionFilter(.5)
					});
					gsap.to(next.querySelectorAll(this.el[1]), {
						x: split,
						ease: "power3.out",
						duration: reduceMotionFilter(.5)
					});
				} else {
					gsap.killTweensOf(next.querySelectorAll(this.el));
					gsap.to(next.querySelectorAll(this.el), {
						x: split,
						ease: "power3.out",
						duration: reduceMotionFilter(.5)
					});
				}

				gsap.fromTo(next.querySelectorAll(this.hint), {
					y: 50
				}, {
					y: 0,
					opacity: 1,
					ease: "power3.out",
					duration: reduceMotionFilter(.5)
				});
			},
			hide: function () {
				gsap.to(next.querySelectorAll(this.el), {
					x: 0,
					ease: "power3.out",
					delay: .1,
					duration: reduceMotionFilter(.5)
				});
				gsap.to(next.querySelectorAll(this.hint), {
					y: 50,
					opacity: 0,
					ease: "power3.out",
					duration: reduceMotionFilter(.5)
				});
			}
		}

		gsap.set(".hi img", {
			x: "random(-100,100,10)%",
			y: "random(10,30,5)%",
			rotation: "random(-5,5,1)deg",
			scale: "random(1,2,.5)"
		});

		hoverEvents(next.querySelectorAll(".email"), () => {
			if (screenhorizontal) textanim.show(".email span", ".email small");
			flare.show("img.yellow, img.red");
		}, () => {
			if (screenhorizontal) textanim.hide();
			flare.hide();
		});
		hoverEvents(next.querySelectorAll(".social"), () => {
			if (screenhorizontal) textanim.show([".website span", ".email span"], ".social span:first-child small");
			flare.show("img.blue, img.red");
		}, () => {
			if (screenhorizontal) textanim.hide();
			flare.hide();
		});
		hoverEvents(next.querySelectorAll(".website"), () => {
			if (screenhorizontal) textanim.show(".social span:nth-child(2), .website span", ".social span:nth-child(2) small", true);
			flare.show("img.blue, img.green");
		}, () => {
			if (screenhorizontal) textanim.hide();
			flare.hide();
		});
	},
	afterEnter: () => console.info("Say hi at me@dwaan.com")
}

export default hiview;