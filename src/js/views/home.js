"use strict";

import { gsap, ScrollTrigger } from 'gsap/all';
import scroll from "../helpers/scroll.js";
import flare from "../helpers/flares.js";
import { hoverEvents, _qAll } from '../helpers/helper.js';

let homeview = {
	namespace: 'home',
	beforeEnter: () => {
		document.body.style.overflow = "hidden";
	},
	afterEnter: data => {
		var next = data.next.container;

		// Insert flares
		for (var i = 1; i <= 5; i++) {
			data.next.container.querySelector("#flares").innerHTML += '<img src="/dwaan/img/flares/flare' + i + '.webp" width="auto" height="auto" alt="Dwan\'s flare number' + i + '" class="flare flare' + i + '" />';
		}

		// Scroll text
		var els = next.querySelectorAll("section.middle");
		els.forEach((el, idx) => {
			var maintext = el.querySelectorAll(".main-text, .padding");
			var maintextchild = el.querySelectorAll(".main-text > *, .padding > *");
			var screen = gsap.matchMedia();

			screen.add("(max-aspect-ratio: 1/1)", () => {
				console.log("Scroll");
				gsap.set(maintext, {
					position: "relative",
					pointerEvents: "auto",
					opacity: 1,
					top: "0%",
					y: "0%"
				});
			});

			screen.add("(min-aspect-ratio: 1/1)", () => {
				scroll.push(tl => {
					tl.to(maintext, {
						duration: reduceMotionFilter(3)
					}, 0)

					tl.set(maintext, {
						position: "relative",
						pointerEvents: "none",
						top: "0%",
						y: "0%"
					}, 0);

					tl.set(maintext, {
						position: "fixed",
						top: "50%",
						y: "-50%",
					}, 1);

					tl.fromTo(maintextchild, {
						y: window.innerHeight * 1 / 6
					}, {
						y: 0,
						ease: "linear",
						duration: reduceMotionFilter(1)
					}, 1);

					tl.fromTo(maintext, {
						opacity: idx == 0 ? 1 : 0
					}, {
						opacity: 1,
						ease: "expo.out",
						duration: reduceMotionFilter(.5)
					}, 1.5);

					tl.set(maintext, {
						pointerEvents: "auto",
					}, 2);

					tl.fromTo(maintextchild, {
						opacity: 1
					}, {
						opacity: 0,
						ease: "expo.out",
						duration: reduceMotionFilter(.5)
					}, 2.5);

					tl.fromTo(maintextchild, {
						y: 0
					}, {
						y: window.innerHeight * -1 / 6,
						ease: "linear",
						duration: reduceMotionFilter(1)
					}, 2);

					tl.set(maintext, {
						position: "relative",
						pointerEvents: "none",
						top: "0%",
						y: "0%"
					}, 3);

					return tl;
				}, tl => ScrollTrigger.create({
					trigger: el,
					start: "-100% 100%",
					end: "200% 100%",
					scrub: true,
					animation: tl
				}));
			});

			// Snap
			scroll.snap(el);
		});

		// Hover
		hoverEvents(next.querySelectorAll("#to-about"), () => {
			flare.show(".flares .flare");
		}, () => {
			flare.hide();
		});

		document.body.style.overflow = "";

		console.info("Hello, my name is Dwan!");
	}
}

export default homeview;