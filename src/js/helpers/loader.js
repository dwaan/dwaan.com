"use strict";

import gsap from 'gsap';
import { _q, _qAll, waitForImg } from './helper.js';

// Loader functions
var loader = {
	el: _q("#loader"),
	update: function (percent) {
		gsap.to(this.el.querySelectorAll(".loading"), {
			width: percent + "%"
		})
	},
	clean: function () {
		this.el.innerHTML = "";
	},
	init: function (simplestyle) {
		return new Promise(resolve => {
			document.body.style.cursor = "wait";

			// Simple or progress bar style
			if (simplestyle) this.el.innerHTML = '<p class="simple" style="opacity: 0;"><span><i class="loading" style="width:0%"></i></span></p>';
			else this.el.innerHTML = '<p class="normal" style="opacity: 0;"><span>Downloading</span> <span><i class="loading" style="width:0%"></i></span></p>';

			gsap.set(this.el, {
				y: 0,
				opacity: 1
			});

			resolve();
		});
	},
	show: async function (els) {
		// Wait for all images to be loaded
		let _percent = { score: 0 };

		// Animate the loading
		gsap.fromTo(this.el.children, {
			opacity: 0,
		}, {
			opacity: 1,
			ease: "expo",
			delay: .25,
			duration: reduceMotionFilter(.5),
		});

		// Calling loading images function
		if (els) {
			await waitForImg(els.querySelectorAll("img"), (_, percent) => {
				gsap.to(_percent, {
					score: percent,
					roundProps: "score",
					duration: reduceMotionFilter(.1),
					onUpdate: () => {
						this.update(_percent.score);
					}
				});
			});
		}
		await this.hide();
		this.clean();
	},
	hide: function () {
		return new Promise(resolve => {
			gsap.killTweensOf(this.el.children);
			gsap.to(this.el.children, {
				opacity: 0,
				ease: "expo.in",
				duration: reduceMotionFilter(.25),
				onComplete: function () {
					resolve();
				}
			});
		});
	},
	empty: function () {
		this.clean();
		document.body.style.cursor = "";
		gsap.set(this.el, {
			y: "-100%",
			opacity: 0
		});

		return true;
	}
}

export default loader;