"use strict"

import { gsap } from 'gsap'
import { _q, _qAll, reduceMotionFilter } from '../helpers/helper.js'

var replurk = {
	replurk: false,
	view: {
		namespace: 'replurk',
		beforeEnter: async data => {
			const events = await import('../replurk/main.js')
			const next = data.next.container
			const url = new URLSearchParams(window.location.search)
			const date = new Date()
			const currentmonth = date.getMonth() + 1

			var currentyear = date.getFullYear()
			var year = Number(url.get('year'))

			if (currentmonth >= 1 && currentmonth <= 10) currentyear--
			if (year < 2008) year = 2008
			if (year > currentyear) year = currentyear

			replurk.replurk = new events.default(next, year)

			next.querySelector("#backtotop").onclick = () => gsap.to(window, {
				duration: reduceMotionFilter(2),
				ease: "expo.inOut",
				scrollTo: "#statistics"
			})
			next.querySelectorAll("#permission, .grant").forEach(el => el.style.display = "none")
		},
		afterEnter: async function (data) {
			await replurk.replurk.run(data.next.container)
			this.async()
		}
	}
}

export default replurk