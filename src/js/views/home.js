"use strict";

import { gsap, ScrollTrigger } from 'gsap/all';
import scroll from "../helpers/scroll.js";
import flare from "../helpers/flares.js";
import { hoverEvents, _q, _qAll, reduceMotionFilter } from '../helpers/helper.js';
import animate from '../helpers/animate.js';
import header from '../helpers/header.js';

let homeview = {
	namespace: 'home',
	beforeEnter: data => {
		var next = data.next.container;

		document.body.style.overflow = "hidden";

		// Insert flares
		for (var i = 1; i <= 5; i++) {
			data.next.container.querySelector("#flares").innerHTML += '<img src="/dwaan/img/flares/flare' + i + '.webp" width="auto" height="auto" alt="Dwan\'s flare number' + i + '" class="flare flare' + i + '" />';
		}
		// Hover "Dwan" in main text
		hoverEvents(next.querySelectorAll("#to-about"), () => flare.show(".flares .flare"), () => flare.hide());

		// Scroll text
		var els = next.querySelectorAll("section.middle");
		els.forEach((el, idx) => {
			var maintext = el.querySelectorAll(".main-text, .padding");
			var maintextchild = el.querySelectorAll(".main-text > *, .padding > *");
			var screen = gsap.matchMedia();

			screen.add("(max-aspect-ratio: 1/1)", () => {
				gsap.set(maintext, {
					position: "relative",
					pointerEvents: "auto",
					opacity: 1,
					top: "0%",
					y: "0%"
				});
			});
			screen.add("(min-aspect-ratio: 1/1)", () => {
				// Background slide version
				gsap.set(el, {
					zIndex: els.length - idx - 1
				});

				scroll.push(tl => {
					var length = reduceMotionFilter(1);
					var content = el.querySelectorAll(".main-text, .padding");
					var cover = el.querySelectorAll(".cover");

					tl.fromTo(content, {
						y: idx == 0 ? 0 : window.innerHeight * -5 / 6
					}, {
						y: 0,
						ease: "linear",
						duration: length
					}, 0);

					tl.fromTo(cover, {
						opacity: idx == 0 ? 0 : 1,
					}, {
						opacity: 0,
						ease: "expo.in",
						duration: length
					}, 0);

					tl.to([content, cover], {
						y: idx == els.length ? 0 : window.innerHeight * 1 / 6,
						ease: "linear",
						duration: length
					}, length);

					return tl;
				}, tl => ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 0",
					scrub: true,
					animation: tl
				}));

				// Slot version
				/*
				scroll.push(tl => {
					var length = reduceMotionFilter(3);

					tl.to(maintext, {
						duration: length,
					}, 0)

					tl.set(maintext, {
						position: "relative",
						pointerEvents: "none",
						top: "0%",
						y: "0%",
					}, 0);

					tl.set(maintext, {
						position: "fixed",
						top: "50%",
						y: "-50%",
					}, length / 3);

					tl.fromTo(maintextchild, {
						y: idx == 0 || reduceMotionFilter() ? 0 : window.innerHeight * 1 / 6
					}, {
						y: 0,
						duration: length / 3,
						ease: "linear",
					}, length / 3);

					tl.fromTo(maintext, {
						opacity: idx == 0 ? 1 : 0
					}, {
						opacity: 1,
						ease: "expo.out",
						duration: length / 6,
					}, (length / 3) + (length / 6));

					tl.set(maintext, {
						pointerEvents: "auto",
					}, length * 2 / 3);

					tl.fromTo(maintextchild, {
						opacity: 1
					}, {
						opacity: 0,
						duration: length / 6,
						ease: "expo.out",
					}, (length * 2 / 3) + (length / 6));

					tl.fromTo(maintextchild, {
						y: 0
					}, {
						y: reduceMotionFilter() ? 0 : window.innerHeight * -1 / 6,
						duration: length / 3,
						ease: "linear",
					}, length * 2 / 3);

					tl.set(maintext, {
						position: "relative",
						pointerEvents: "none",
						top: "0%",
						y: "0%"
					}, length);

					return tl;
				}, tl => ScrollTrigger.create({
					trigger: el,
					start: "-100% 100%",
					end: "200% 100%",
					scrub: true,
					animation: tl
				}));
				*/
			});

			// Snap
			scroll.snap(el);
		});

		// Disable for now
		var links = next.querySelectorAll(".home-older a");
		links.forEach(el => {
			el.addEventListener("click", async e => {
				e.preventDefault();

				header.hide()
				await animate.hide(next, next.querySelectorAll(".home-old .dwantitle, .arrow"), false);
				gsap.to(_q("body"), {
					backgroundColor: "#2a3233",
					duration: .5,
					onComplete: () => {
						window.location = el.href;
					}
				});
			});
		});
	},
	afterEnter: () => {
		document.body.style.overflow = "";
		console.info("Hello, my name is Dwan!");
	}
}

export default homeview;