'use strict'

import { gsap } from 'gsap'
import { _q, _qAll, waitForImg } from './helper.js'

// Loading Image

class ImageLoading {
	el = null
	barba = null
	loading = null
	loaded = false
	first = {
		loading: true,
		animation: false
	}

	constructor(loading) {
		this.loading = loading
	}

	run(el, callback) {
		if (el.next) {
			this.el = el.next
			this.barba = el
		} else {
			this.el = el
			this.barba = null
		}

		this.loaded = false

		var imgs = this.el.querySelectorAll("img")
		waitForImg(imgs, (_, percent) => {
			this.loading.update({
				duration: .256,
				height: percent + "%"
			})
		}, _ => {
			// No image, just unhide the loading
			this.loading.update({ duration: .256, height: "100%" })
			this.loaded = true

			if (callback) callback(this)
			else this.done()
		})
	}

	done(callback) {
		if (this.first.animation) {
			// Add delay before hiding loading
			gsap.to(window, {
				duration: .256,
				onComplete: _ => {
					this.complete(callback)
				}
			})
		} else {
			if (typeof callback === "function") callback(this)
		}
	}

	complete(callback) {
		if (this.barba != null) {
			if (this.el.style) this.el.style.visibility = "visible"
			this.barba.async()
		}

		if (!this.loaded) return

		// Run custom onLoadedComplete method in barba
		if (this.barba) if (this.barba.onImageLoadComplete) this.barba.onImageLoadComplete()

		// Scroll up instantly
		gsap.to(window, {
			duration: 0,
			scrollTo: 0,
			onComplete: _ => {
				// Hide loading
				this.loading.hide(_ => {
					if (this.first.loading) {
						this.first.loading = false
						this.loading.clear()
					}

					this.loaded = false

					// Run custom onLoadedComplete method in barba
					if (this.barba) if (this.barba.onImageLoadAnimateComplete) this.barba.onImageLoadAnimateComplete()
					if (callback) callback(this)
				}, _ => {
					if (this.barba) if (this.barba.onImageLoadAnimateHalfComplete) this.barba.onImageLoadAnimateHalfComplete()
				})
			}
		})
	}
}

export default ImageLoading