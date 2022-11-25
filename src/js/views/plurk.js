"use strict";

import { gsap } from "gsap/all";
import { _q, _qAll, reduceMotionFilter } from '../helpers/helper';

var replurkview = {
	// Replurk page 2020
	replurk2020: false,
	replurk2020view: {
		namespace: 'replurk2020',
		beforeEnter: async data => {
			const replurk = await import('../helpers/replurk');
			replurkview.replurk2020 = new replurk.default(2020);

			var next = data.next.container;
			next.querySelectorAll("#permission, .grant").forEach(el => el.style.display = "none");
		},
		afterEnter: async function (data) {
			await replurkview.replurk2020.run(data.next.container);
			this.async();
		}
	},

	// Replurk page 2021
	replurk2021: false,
	replurk2021view: {
		namespace: 'replurk2021',
		beforeEnter: async data => {
			const replurk = await import('../helpers/replurk');
			replurkview.replurk2021 = new replurk.default(2021);

			var next = data.next.container;
			next.querySelector("#backtotop").onclick = () => gsap.to(window, {
				duration: reduceMotionFilter(2),
				ease: "expo.inOut",
				scrollTo: "#statistics"
			});
			next.querySelectorAll("#permission, .grant").forEach(el => el.style.display = "none");
		},
		afterEnter: async function (data) {
			await replurkview.replurk2021.run(data.next.container);
			this.async();
		}
	},

	// Replurk page 2022
	replurk2022: false,
	replurk2022view: {
		namespace: 'replurk2022',
		beforeEnter: async data => {
			const replurk = await import('../helpers/replurk');
			replurkview.replurk2022 = new replurk.default(2022);

			var next = data.next.container;
			next.querySelector("#backtotop").onclick = () => gsap.to(window, {
				duration: reduceMotionFilter(2),
				ease: "expo.inOut",
				scrollTo: "#statistics"
			});
			next.querySelectorAll("#permission, .grant").forEach(el => el.style.display = "none");
		},
		afterEnter: async function (data) {
			await replurkview.replurk2022.run(data.next.container);
			this.async();
		}
	}
}

export default replurkview;