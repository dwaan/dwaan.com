"use strict";

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'

import scroll from "../helpers/scroll.js"
import { _qAll, reduceMotionFilter } from '../helpers/helper.js'

import browser from './browser.js'

// Scroll Animation
class scrolls {
	constructor(next) {
		this.next = next
	}

	statistics() {
		// Scroll animate statistics
		// scroll.push(tl => {
		// 	tl.fromTo(this.next.querySelector("#hello .animate"), {
		// 		x: 0,
		// 		y: 0,
		// 		rotation: 0
		// 	}, {
		// 		x: "-100vw",
		// 		y: "150vh",
		// 		rotation: -45,
		// 		ease: "linear",
		// 	}, 0)

		// 	return tl
		// }, tl => ScrollTrigger.create({
		// 	trigger: this.next.querySelector("#hello"),
		// 	start: "100% 100%",
		// 	end: "100% 50%",
		// 	scrub: true,
		// 	animation: tl
		// }))
	}

	permisions() {
		// Scroll animation permission section
		scroll.push((tl) => {
			tl.fromTo(this.next.querySelectorAll("#permission form"), {
				y: 0
			}, {
				y: window.innerHeight * -3 / 4,
				ease: "linear"
			}, 0)

			tl.fromTo(this.next.querySelectorAll("#permission .bgtext sup"), {
				y: 0,
				x: 0,
				rotation: 0
			}, {
				y: window.innerHeight * -1 / 4,
				x: window.innerHeight * -1 / 10,
				rotation: -10,
				ease: "linear"
			}, 0)

			tl.fromTo(this.next.querySelectorAll("#permission .bgtext sub"), {
				y: 0,
				x: 0,
				rotation: 0
			}, {
				y: window.innerHeight * -1 / 4,
				x: window.innerHeight * 1 / 10,
				rotation: 10,
				ease: "linear"
			}, 0)

			return tl
		}, (tl) => {
			return ScrollTrigger.create({
				trigger: this.next.querySelectorAll("#permission"),
				start: "0 0",
				end: "0 -100%",
				animation: tl,
				scrub: .5
			})
		})
	}

	browserBar(login = true) {
		if (login) {
			scroll.push((tl) => {
				return tl
			}, (tl) => {
				return ScrollTrigger.create({
					trigger: '#hello',
					start: "0 0",
					end: "100% 10px",
					animation: tl,
					scrub: true,
					// onLeave: () => {
					// 	browser.set()
					// },
					// onEnterBack: () => {
					// 	browser.set("green")
					// }
				})
			})

			scroll.push((tl) => {
				return tl
			}, (tl) => {
				return ScrollTrigger.create({
					trigger: '#statistics',
					start: "0 0",
					end: "100% 10px",
					animation: tl,
					scrub: true,
					// onLeave: () => {
					// 	browser.set("yellow")
					// },
					// onEnter: () => {
					// 	browser.set()
					// },
					// onEnterBack: () => {
					// 	browser.set()
					// }
				})
			})
		} else {
			scroll.push((tl) => {
				return tl
			}, (tl) => {
				return ScrollTrigger.create({
					trigger: '#permission',
					start: "0 0",
					end: "100% 10px",
					animation: tl,
					scrub: true,
					onLeave: () => {
						browser.set("yellow")
					},
					onEnterBack: () => {
						browser.set("green")
					}
				})
			})
		}
	}
}

export default scrolls