"use strict"

import { gsap } from 'gsap'

import { addClass, delay, reduceMotionFilter, removeClass } from '../helpers/helper.js'

class loading {
	constructor(next) {
		this.count = 0
		this.prev_count = 0
		this.counts = -1
		this.clean = false
		this.next = next
		this.parent = this
		this.isComplete = function () { return this.count == this.counts }
	}

	draw(item) {
		return new Promise(resolve => {
			var length = reduceMotionFilter(1)
			this.prev_count = item

			// Animate loading
			var load = { progress: this.prev_count }
			gsap.to(load, {
				progress: Math.round(item),
				snap: "progress",
				ease: "linear",
				duration: length / 4,
				onUpdate: () => {
					var el = this.next.querySelector(".statistics.loading .big")
					if (el) el.innerHTML = load.progress + "%"
				},
				onComplete: async () => {
					if (this.clean) await this.done()
					resolve()
				}
			})
		})
	}

	async hidemainloading() {
		var length = reduceMotionFilter(.25)
		gsap.to("#loading", {
			opacity: 0,
			duration: length,
			ease: "power3.out"
		}, 0)
	}

	async loop(length) {
		this.clean = true
		this.counts = length
		await this.draw(0)
	}

	async update(month, value) {
		var el = this.next.querySelector(".statistics.loading .month")
		if (month && el) el.innerHTML = month

		removeClass(this.next.querySelector(".statistics.loading .content"), "done")

		if (this.counts >= 0) {
			this.count = value ? value : this.count + 1
			await this.draw(Math.round(100 * (this.count / this.counts)))
		}
	}

	async fakeupdate() {
		if (this.counts >= 0) {
			this.count++
			if (this.count >= (this.counts - 10)) this.count = (this.counts - 10)
			await this.draw(100 * (this.count / this.counts))
		}
	}

	async forcedone() {
		this.count = this.counts
		await this.draw(100)
	}

	async done() {
		if (this.isComplete()) {
			var el = this.next.querySelector(".statistics.loading .content")
			this.clean = false

			await delay(250)

			if (el) {
				addClass(el, "done")
				el.querySelector(".big").innerHTML = `Done`
				el.querySelector(".month").innerHTML = `All loaded,<br/><strong>enjoy!</strong`
			}
		}
	}
}

export default loading