'use strict'

import { gsap } from 'gsap'
import { _q, _qAll } from './helper.js'

// Menu Functionality

var worklist = {
	hover: function (el) {
		_qAll(el).forEach(el => {
			var scale = 1.05
			if (el.offsetWidth < 100) scale = 1.15

			el.gsap = gsap.timeline({
				repeat: -1,
				ease: "expo"
			})
			el.gsap.to(el, {
				transformOrigin: "50%",
				scale: scale,
				duration: 1.7
			})
			el.gsap.to(el, {
				scale: scale,
				duration: .6
			})
			el.gsap.to(el, {
				scale: 1,
				duration: 1.7
			})
			el.gsap.to(el, {
				scale: 1,
				duration: .9
			})

			el.gsap.pause()

			el.onmouseenter = function () {
				this.gsap.restart()
			}

			el.onmouseleave = function () {
				this.gsap.pause()
				gsap.to(this, {
					transformOrigin: "50%",
					scale: 1,
					duration: .512
				})
			}
		})
	}
}

export default worklist