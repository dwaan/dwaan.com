'use strict'

import { gsap } from 'gsap'
import { _q, _qAll, removeClass, addClass } from './helper.js'

var darkMode = false

// Dark Mode
if (window.matchMedia) {
	var darkmode = window.matchMedia('(prefers-color-scheme: dark)')
	darkmode.addEventListener("change", function (e) {
		darkMode = e.matches ? false : true
		toggleDarkMode()
	})
}

function isDarkMode() {
	return window.matchMedia('(prefers-color-scheme: dark)')
}

function toggleSafariAddressBarColor() {
	_q("meta[name=theme-color]").setAttribute("content", darkMode ? "#202526" : "#a4cdd6")
}

function toggleDarkMode() {
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

	if (!darkMode) {
		gsap.set("#sky", {
			x: pos.x,
			y: pos.y,
			width: pos.width,
			height: pos.width,
			opacity: 0
		})

		darkMode = true
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
			scale: 100, onComplete: function () {
				window.darkMode_animate = false
			}
		}, 0)
		tl.fromTo("#sky", {
			opacity: 0
		}, {
			opacity: 1,
			duration: .896
		}, 0)

		tl.to("html", {
			duration: .128,
			onComplete: function () {
				addClass(_q("html"), "dark")
			}
		}, 0)

		toggleSafariAddressBarColor()
	} else {
		darkMode = false

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

		tl.fromTo("#sky", { scale: 100 }, {
			scale: 1, onComplete: function () {
				window.darkMode_animate = false
			}
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
			duration: .256, onComplete: function () {
				removeClass(_q("html"), "dark")
				toggleSafariAddressBarColor()
			}
		}, 0)

	}
}

export { isDarkMode, toggleSafariAddressBarColor, toggleDarkMode }