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
		var htmls = "";
		for (var i = 1; i <= 5; i++) {
			htmls += '<img src="/img/flares/flare' + i + '.webp" width="auto" height="auto" alt="Dwan\'s flare number' + i + '" class="flare flare' + i + '" />';
		}
		data.next.container.querySelector("#flares").innerHTML = htmls;
		// Hover "Dwan" in main text
		hoverEvents(next.querySelectorAll("#to-about"), () => flare.show(".flares .flare"), () => flare.hide());

		// Scroll text
		var screen = gsap.matchMedia();
		var els = next.querySelectorAll("section.middle");
		var elsMainText = next.querySelectorAll("section.middle .main-text, .padding");
		// Vertical screen
		screen.add("(max-aspect-ratio: 1/1)", () => {
			gsap.set(elsMainText, {
				position: "relative",
				pointerEvents: "auto",
				opacity: 1,
				top: "0%",
				y: "0%"
			});
		});
		els.forEach((el, idx) => {
			// Horizontal screen
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
			});
			// Snap
			scroll.snap(el);
		});

		// Disable for now
		var links = next.querySelectorAll(".home-disable a");
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