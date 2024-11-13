'use strict'

import { gsap } from 'gsap'
import { _q, _qAll, removeClass, addClass } from './helper.js'

class Transition {
	loading = null
	imageloading = null
	menu = null

	constructor(loading, imageloading, menu) {
		this.loading = loading
		this.imageloading = imageloading
		this.menu = menu
	}

	default = {
		parent: this,
		name: 'default-transition',
		once() {
			let logo_svg = _q(".logo").innerHTML

			removeClass(_q('.menu__pop'), "active")

			// Adding logo to loading and do some hover event
			var el = _q(this.parent.loading.el).querySelector(".loading")
			el.querySelector(".light").innerHTML = logo_svg
			el.querySelector(".light").style.height = 0
			el.querySelector(".dark").innerHTML = logo_svg

			// Logo waving animation
			var logo_wave = gsap.timeline({
				repeat: -1,
				defaults: {
					transformOrigin: "99% 0",
					duration: .256,
					ease: "linear",
					yPercent: 20
				}
			})
			logo_wave.from(".logo .left-hand", {
				yPercent: 0,
				rotation: 0,
				duration: 10
			})
			logo_wave.to(".logo .left-hand", {
				duration: .256,
				rotation: 70
			})
			logo_wave.fromTo(".logo .left-hand", {
				rotation: 70
			}, {
				rotation: 60,
				repeat: 2,
				yoyo: true
			})
			logo_wave.to(".logo .left-hand", {
				duration: .256,
				yPercent: 0,
				rotation: 0
			})

			// Safari Mobile: 177
			// Safari: 38/63
			// Firefox: 74
			// Chrome: 79
			// Safari Tablet: 107
			// Chrome Tablet: 113
			if (window.outerHeight - window.innerHeight < 80) {
				addClass(_q("html"), "desktop")
			}

			// Run menu
			this.parent.menu.run()

			// Wait for all images to be loaded
			this.parent.imageloading.run(document, load => {
				// Check if it's first time or 404 to do some text animation
				this.parent.loading.animate((_q(".barba-container").getAttribute("data-barba-namespace") == "404" ? "404" : "first-time"), _ => {
					if (load != undefined) {
						load.first.animation = true
						load.done()
					}

					// Animate header
					gsap.fromTo(".logo, .menu > a, #mode, .lang > li", {
						marginTop: -250
					}, {
						marginTop: 0,
						delay: .512,
						duration: 2.048,
						ease: "expo.out",
						stagger: {
							from: 0,
							amount: 1.024
						}
					})
				})
			})
		},
		async before(data) {
			let done = this.async()
			let animate = _ => {
				// Make the barba wrapper fix so it won't have jaggy animation
				_q("#barba-wrapper").style.height = _q("#barba-wrapper").offsetHeight + "px"

				if (data.trigger.innerText == "See All") this.parent.loading.clicked.text = "See All"
				else if (data.trigger.innerText == "Back") this.parent.loading.clicked.text = "Back"
				else this.parent.loading.clicked.text = ""

				// Show loading then load the new container
				this.parent.loading.show(_ => {
					gsap.set('.menu__pop .menu__item', {
						opacity: 0,
						yPercent: 100
					}, .768)

					done()
				})
			}

			if (this.parent.menu.active) {
				removeClass(_q('.menu__pop'), "active")

				animate()

				let tl = gsap.timeline({
					defaults: {
						duration: 1.024,
						ease: "expo.out"
					}
				})
				tl.fromTo('.menu__pop .menu__item ul li, .menu__pop .menu__item .border', {
					xPercent: 0,
					opacity: 1
				}, {
					xPercent: -200,
					opacity: 0,
					stagger: {
						from: 0,
						amount: .128
					}
				})
			} else {
				animate()
			}
		},
		enter(data) {
			let next = data.next.container
			this.next = next

			// Hide newContainer for a bit
			next.style.display = "block"
			next.style.visibility = "hidden"

			// Remove previous height setting
			_q("#barba-wrapper").style.height = ""

			// Wait for all image to be loaded
			this.parent.imageloading.run(this)
		}
	}
}

export default Transition