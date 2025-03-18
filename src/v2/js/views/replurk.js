"use strict"

import { gsap } from 'gsap'
import { _q, _qAll, addClass, reduceMotionFilter } from '../helpers/helper.js'

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

			if (year < 2008) {
				year = currentyear
			}
			if (year <= 2008) {
				next.querySelectorAll(".nav-prev").forEach(el => {
					el.remove()
				})
			}
			if (year >= currentyear) {
				year = currentyear
				next.querySelectorAll(".nav-next").forEach(el => {
					el.remove()
				})
			}

			next.querySelectorAll(".nav-prev").forEach(el => {
				el.setAttribute("href", "/replurk/?year=" + (year - 1))
			})
			next.querySelectorAll(".nowyear").forEach(el => {
				el.setAttribute("href", "/replurk/?year=" + year)
				el.innerText = year
			})
			next.querySelectorAll(".nav-next").forEach(el => {
				el.setAttribute("href", "/replurk/?year=" + (year + 1))
			})

			next.querySelectorAll(".shortyear").forEach(el => {
				let shortyear = year - 2000
				el.innerText = (shortyear < 10 ? "0" : "") + shortyear
			})

			replurk.replurk = new events.default(next, year)

			next.querySelector("#backtotop").onclick = () => gsap.to(window, {
				duration: reduceMotionFilter(2),
				ease: "expo.inOut",
				scrollTo: "#statistics",
				onStart: _ => {
					removeClass(_q("html"), "scroll-snap");
				},
				onComplete: _ => {
					addClass(_q("html"), "scroll-snap");
				}
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