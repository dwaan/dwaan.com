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

	credits(tl) {
		var length = reduceMotionFilter(1)

		tl.fromTo(this.next.querySelectorAll("#credits .like, #credits .noaffiliation, #credits .made"), {
			y: window.innerHeight * 1 / 8
		}, {
			y: 0,
			ease: "linear",
			duration: length * 2,
		}, 0)
		tl.fromTo(this.next.querySelectorAll("#credits .like, #credits .noaffiliation"), {
			opacity: 0
		}, {
			opacity: 1,
			stagger: {
				from: 'end',
				amount: length / 10
			},
			duration: length,
			ease: "power3.in"
		}, 0)
		tl.fromTo(this.next.querySelectorAll("#credits .made"), {
			opacity: 0
		}, {
			opacity: 1,
			duration: length,
			ease: "power3.in"
		}, length * 3 / 10)

		return tl
	}

	statistics() {
		// Scroll animate statistics
		scroll.push(tl => this.credits(tl), tl => ScrollTrigger.create({
			trigger: this.next.querySelectorAll("#statistics"),
			start: "100%-=" + window.innerHeight + " 0",
			end: "100% 0",
			animation: tl,
			scrub: .5
		}))
	}

	permisions() {
		console.log("Scroll")

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

		scroll.push((tl) => {
			tl = this.credits(tl)

			return tl
		}, (tl) => {
			return ScrollTrigger.create({
				trigger: this.next.querySelectorAll("#permission"),
				start: "0 0",
				end: "100% 0",
				animation: tl,
				scrub: .5
			})
		})
	}

	menu() {
		// Scroll animation menu and logout
		scroll.push(tl => tl, tl => {
			return ScrollTrigger.create({
				trigger: 'main',
				start: "0 0",
				end: "100% 0",
				animation: tl,
				onUpdate: update => {
					var el1 = '.logo, .size, .lamp, .switch'
					var el2 = el1 + ", .footer > *"

					if (update.direction > 0) {
						gsap.killTweensOf(_qAll(el2))
						gsap.to(_qAll(el1), { y: -100, opacity: 0 })
						gsap.to(_qAll('.footer > *'), { y: 100, opacity: 0 })
					} else {
						gsap.to(_qAll(el2), { y: 0, opacity: 1 })
					}
				}
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
					onLeave: () => {
						browser.set("white")
					},
					onEnterBack: () => {
						browser.set("green")
					}
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
					onLeave: () => {
						browser.set("yellow")
					},
					onEnter: () => {
						browser.set("white")
					},
					onEnterBack: () => {
						browser.set("white")
					}
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