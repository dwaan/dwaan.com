'use strict'

import { gsap } from 'gsap'
import { _q, _qAll, removeClass, addClass } from './helper.js'

class DarkMode {
	darkMode = false
	darkModeListerner = false

	constructor() {
		// Dark Mode
		if (window.matchMedia) {
			this.darkModeListerner = window.matchMedia('(prefers-color-scheme: dark)')
			this.darkModeListerner.addEventListener("change", this.onChange)
		}
	}

	onChange(e) {
		this.darkMode = e.matches ? false : true
		this.toggle()
	}

	destroy() {
		this.darkModeListerner.removeEventListener("change", this.onChange)
	}

	toggleColor(dark = false) {
		let color = dark ? (this.darkMode ? "#111111" : "#202526") : (this.darkMode ? "#202526" : "#a4cdd6")
		gsap.to("meta[name=theme-color]", {
			attr: {
				content: color
			},
			ease: "power3.out",
			duration: .128
		})
	}

	toggle() {
		var pos = _q('#mode').getBoundingClientRect()
		var tl = gsap.timeline({
			defaults: {
				ease: "expo",
				duration: 1.024
			}
		})

		gsap.set("#sky", {
			x: pos.x,
			y: pos.y,
			width: pos.width,
			height: pos.width
		})

		if (!this.darkMode) {
			gsap.set("#sky", {
				x: pos.x,
				y: pos.y,
				width: pos.width,
				height: pos.width,
				opacity: 0
			})

			this.darkMode = true
			tl.fromTo("#mode svg #moon", {
				opacity: 0
			}, {
				opacity: 1,
				ease: "expo.out"
			}, 0)
			tl.fromTo("#mode svg #sun", {
				opacity: 1
			}, {
				opacity: 0,
				ease: "expo.out"
			}, 0)

			tl.fromTo("#sky", {
				scale: 1
			}, {
				scale: 128
			}, 0)
			tl.fromTo("#sky", {
				opacity: 0
			}, {
				opacity: 1,
				duration: .896
			}, 0)

			tl.to("html", {
				duration: .128,
				onComplete: _ => {
					addClass(_q("html"), "dark")
				}
			}, 0)

			this.toggleColor()
		} else {
			this.darkMode = false

			tl.fromTo("#mode svg #moon", {
				opacity: 1
			}, {
				opacity: 0,
				ease: "expo.out"
			}, 0)

			tl.fromTo("#mode svg #sun", {
				opacity: 0
			}, {
				opacity: 1,
				ease: "expo.out"
			}, 0)

			tl.fromTo("#sky", {
				scale: 128
			}, {
				scale: 1
			}, 0)
			tl.fromTo("#sky", {
				opacity: 1
			}, {
				opacity: 0,
				duration: .768
			}, .256)

			tl.set("html", {
				backgroundColor: "#A4CDD6"
			}, 0)
			tl.to("html", {
				duration: .256, onComplete: _ => {
					removeClass(_q("html"), "dark")
					this.toggleColor()
				}
			}, 0)
		}
	}
}

export default DarkMode