"use strict"

import { gsap } from 'gsap'

import scroll from "../helpers/scroll.js"
import { reduceMotionFilter } from '../helpers/helper.js'

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

			if (!this.next.querySelector(".statistics.statistics-loading")) {
				this.parent.statistics.draw("statistics-loading", item + "%", "<i class='month'>Data from " + this.year + "</i>. Loading. <small>As long as you didn't close this browser tab, You can resume later by refreshing this page.</small>")
			}

			// Animate loading
			var load = { progress: this.prev_count }
			gsap.to(load, {
				progress: Math.round(item),
				snap: "progress",
				ease: "linear",
				duration: length / 4,
				onUpdate: () => {
					var el = this.next.querySelector(".statistics-loading .big")
					if (el) el.innerHTML = load.progress + "%"
				},
				onComplete: async () => {
					if (this.clean) await this.done()
					resolve()
				}
			})
		})
	}

	async loop(length) {
		this.clean = true
		this.counts = length
		await this.draw(0)
	}

	async update(month, value) {
		var el = this.next.querySelector(".statistics-loading .month")
		if (month && el) el.innerHTML = month

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

	done() {
		return new Promise(resolve => {
			var length = reduceMotionFilter(1)

			if (this.isComplete()) {
				var el = this.next.querySelector(".statistics.statistics-loading")
				this.clean = false
				if (el) {
					gsap.to(el, {
						opacity: 0,
						width: 0,
						height: 0,
						padding: 0,
						margin: 0,
						overflow: "hidden",
						duration: length / 2,
						ease: "power3.out",
						onComplete: () => {
							el.remove()
							scroll.refresh()
							resolve()
						}
					})
				}
			} else resolve()
		})
	}
}

export default loading