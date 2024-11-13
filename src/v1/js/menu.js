'use strict'

import { gsap } from 'gsap'
import { _q, _qAll, removeClass, addClass, nextElementSibling, hugeText } from './helper.js'
import { toggleSafariAddressBarColor, toggleDarkMode, browserBar } from "./darkmode.js"

// Menu Functionality

class Menu {
	active = false

	constructor() {
		_q("header .menu__item").innerHTML = `\
			<div class="border"><div></div></div>\
			<div class="menu__pos">\
				<ul class="plain">\
					<li class="close"><span>close <i class="icn icn_close"></i></span></li>\
					<li><a href="https://dwaan.com">new</a></li>\
					<li><hr /></li>\
					<li><a href="./">home</a></li>\
					<li><a href="./me">me</a></li>\
					<li><a href="./work">work</a></li>\
					<li><hr /></li>\
					<li><a href="./say-hi">say, hi!</a></li>\
					<li><p>I decide not to use any tracking cookies, local storage and analytics scripts in my website. You're free from tracking.</p></li>\
				</ul>\
			</div>`
	}

	run = function () {
		gsap.set('.menu__pop .menu__item', {
			opacity: 0
		})

		// The bright/dark mode switcher
		var mode = _q('#mode')
		gsap.set(mode.querySelector("#ray"), {
			transformOrigin: "center center"
		})
		mode.onmousedown = function (e) {
			toggleDarkMode()
			e.preventDefault()
		}
		mode.onmouseenter = function () {
			gsap.to(this.querySelector("#ray"), { rotation: 90, scale: 1.1, duration: .768, ease: "elastic.out" })
		}
		mode.onmouseleave = function () {
			gsap.to(this.querySelector("#ray"), { rotation: 0, scale: 1, duration: .768, ease: "elastic.out" })
		}

		// The main menu events
		var menu = _q('.menu__pop > a')
		menu.onclick = e => {
			var tl = gsap.timeline()

			addClass(e.target.parentNode, "active")
			this.active = true

			tl.fromTo('.menu__pop .menu__item', {
				yPercent: 0,
				xPercent: 0,
				opacity: 0,
				scale: 1
			}, {
				yPercent: 0,
				opacity: 1,
				scale: 1,
				duration: .256,
				ease: "power2"
			})
			tl.fromTo('.menu__pop .menu__item ul li, .menu__pop .menu__item .border', {
				transformOrigin: "0 0",
				xPercent: 200,
				opacity: 0
			}, {
				xPercent: 0,
				opacity: 1,
				duration: .768,
				ease: "expo.out",
				stagger: {
					from: 0,
					amount: .128
				}
			})

			browserBar()
			e.preventDefault()
		}
		menu.onmouseenter = function () {
			gsap.to(this.querySelector("#menu-short"), {
				attr: {
					x1: 22
				},
				duration: .768,
				ease: "elastic.out"
			})
		}
		menu.onmouseleave = function () {
			gsap.to(this.querySelector("#menu-short"), {
				attr: {
					x1: 16
				},
				duration: .768,
				ease: "elastic.out"
			})
		}

		// The logo events
		var logo = _q('.logo')
		logo.onmouseenter = function () {
			gsap.to(".logo .hat", { transformOrigin: "50% 75%", yPercent: -3, xPercent: -1, rotation: 4, duration: 1.024, ease: "elastic.out" })
		}
		logo.onmouseleave = function () {
			gsap.to(".logo .hat", { transformOrigin: "50% 75%", yPercent: 0, xPercent: 0, rotation: 0, duration: 1.024, ease: "elastic.out" })
		}

		// The main menu hover item animation
		var border = ".menu__item .border"
		var _hugeText = new hugeText(border + " > div ")
		for (var i = 1; i <= 9; i++) {
			var menu = _q('.menu__pop .menu__item li:nth-child(' + i + ') a')

			if (menu) {
				if (i == 4)
					menu.borderRadius = "25% 2% 2% 2%"
				else if (i == 5)
					menu.borderRadius = "2% 25% 2% 2%"
				else if (i == 6)
					menu.borderRadius = "2% 2% 25% 2%"
				else
					menu.borderRadius = "2% 2% 2% 25%"

				menu.onmouseenter = function () {
					gsap.to(border, { duration: .386, ease: "expo", borderRadius: this.borderRadius })
					_hugeText.show(this.innerHTML)
				}
				menu.onmouseleave = function () {
					gsap.to(border, { duration: .386, ease: "expo", borderRadius: "2% 2% 2% 2%" })
					_hugeText.hide()
				}
			}
		}

		// The main menu close events
		var close = _q('.menu__item .close span')
		close.onclick = e => {
			var tl = gsap.timeline()

			tl.to('.menu__pop .menu__item ul li, .menu__pop .menu__item .border', {
				xPercent: -200, opacity: 0, duration: .512, ease: "expo.in", stagger: {
					from: 0,
					amount: .128
				}, onComplete: function () {
					toggleSafariAddressBarColor()
				}
			})
			tl.to('.menu__pop .menu__item', { opacity: 0, duration: .256, ease: "power2" })

			removeClass(e.target.parentNode.parentNode.parentNode.parentNode.parentNode, "active")
			this.active = false

			e.preventDefault()
		}
		close.onmouseover = function () {
			gsap.to(this.querySelector(".icn_close"), {
				duration: .512,
				ease: "expo.out",
				rotation: 90
			})
		}
		close.onmouseout = function () {
			gsap.to(this.querySelector(".icn_close"), {
				duration: .512,
				ease: "expo.in",
				rotation: 0
			})
		}

		// Lang events
		var lang = _qAll('.lang li a')
		lang.forEach(el => {
			gsap.set(el.nextElementSibling || nextElementSibling(el), {
				opacity: 0,
				marginTop: 50
			})

			el.onclick = function (e) {
				e.preventDefault()
				gsap.to(".lang .chat__bubble", { duration: .128, ease: "ease.out", opacity: 0, marginTop: 50 })
				gsap.to(this.nextElementSibling || nextElementSibling(this), {
					duration: .386, ease: "elastic.out", opacity: 1, marginTop: 10, onComplete: function () {
						gsap.to(".lang .chat__bubble", { duration: .128, ease: "ease.out", opacity: 0, marginTop: 50, delay: 1.024 })
					}
				})
			}
		})

	}
}

export default Menu