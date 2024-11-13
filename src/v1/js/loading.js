'use strict'

import { gsap } from 'gsap'
import { _q, _qAll, removeClass, addClass } from './helper.js'
import { browserBar, toggleSafariAddressBarColor } from "./darkmode.js"

// Loading animation

class Loading {
	el = ""
	menu = null

	constructor(el, menu) {
		document.querySelector("body").insertAdjacentHTML("beforeend", `
			<div id="sky"></div>\
			<div id="click-cover"></div>\
			<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\
				<div class="pswp__bg"></div>\
				<div class="pswp__scroll-wrap">\
					<div class="pswp__container">\
						<div class="pswp__item"></div>\
						<div class="pswp__item"></div>\
						<div class="pswp__item"></div>\
					</div>\
					<div class="pswp__ui pswp__ui--hidden">\
						<div class="pswp__top-bar">\
							<div class="pswp__counter"></div>\
							<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\
							<button class="pswp__button pswp__button--share" title="Share"></button>\
							<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>\
							<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\
							<div class="pswp__preloader">\
								<div class="pswp__preloader__icn">\
									<div class="pswp__preloader__cut">\
										<div class="pswp__preloader__donut"></div>\
									</div>\
								</div>\
							</div>\
						</div>\
						<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\
							<div class="pswp__share-tooltip"></div>\
						</div>\
						<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\
						<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\
						<div class="pswp__caption">\
							<div class="pswp__caption__center"></div>\
						</div>\
					</div>\
				</div>\
			</div>\
		`)

		this.menu = menu

		this.el = el
		this.breath = gsap.timeline({
			repeat: -1,
			ease: "linear"
		})

		gsap.set(this.el, {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		})

		// Some floating animation for loading-cover
		this.breath.to(this.el, {
			transformOrigin: "50%",
			scale: 1,
			duration: .9
		})
		this.breath.to(this.el, {
			scale: 1.15,
			duration: 1.7
		})
		this.breath.to(this.el, {
			scale: 1.15,
			duration: .6
		})
		this.breath.to(this.el, {
			scale: 1,
			duration: 1.7
		})
		this.breath.pause()

		// Snoop which text or url that are currently clicked
		this.clicked = {
			target: null,
			text: ""
		}
		document.addEventListener('click', e => {
			e = e || window.event
			this.clicked.target = e.target || e.srcElement
			this.clicked.text = this.clicked.target.textContent || this.clicked.target.innerText
		}, false)
	}

	show(callback) {
		if (callback == undefined) callback = _ => { }

		var var_from = {
			x: 0,
			y: "100%",
			display: "block"
		}
		var var_to = {
			x: 0,
			y: 0,
			duration: .768,
			ease: "expo.inOut",
			onComplete: function () {
				browserBar()
				callback()
			}
		}

		_q("#click-cover").style.display = "block"

		if (this.menu.active) {
			var_from.x = "100%"
			var_from.y = 0
			var_to.x = 0
			var_to.y = 0
			var_to.ease = "expo.inOut"
		}

		removeClass(_q('.menu__pop'), 'active')
		this.menu.active = false

		// Show loading
		if (this.clicked.text == "See All") {
			var_from.x = "-100%"
			var_from.y = 0
		} else if (this.clicked.text == "Back") {
			var_from.x = "100%"
			var_from.y = 0
		}

		if (_q("[data-barba-namespace]").getAttribute("data-barba-namespace") == "call") {
			var tl = gsap.timeline({ defaults: { duration: .386, ease: "expo" } })

			window.aspectRatio.onchange = null

			_qAll(this.el).forEach(el => {
				removeClass(el, "bubble")

				tl.set(this.el, {
					zIndex: 666
				})
				tl.set(el.querySelector(".light"), {
					height: 0
				})
				tl.to(el.querySelector(".text"), {
					opacity: 0
				})
				tl.fromTo(el.querySelector(".loading"), {
					opacity: 0,
					y: "100%"
				}, {
					opacity: 1,
					y: "-50%"
				}, 0)
				tl.to(el, {
					position: "fixed",
					top: 0,
					right: 0,
					width: window.innerWidth,
					height: window.innerHeight,
					borderRadius: 0,
					duration: .768,
					ease: "expo.inOut",
					onComplete: function () {
						gsap.set(el, {
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							width: "auto",
							height: "auto"
						})
						if (callback != undefined) callback()
					}
				}, "-=.512")
			})
		} else {
			gsap.fromTo(this.el, var_from, var_to)
		}
	}

	hide(callback, callback__half) {
		if (typeof callback != "function") callback = () => { }
		if (typeof callback__half != "function") callback__half = () => { }

		var var_from = {
			x: 0,
			y: 0
		}
		var var_to = {
			x: 0,
			y: "-100%",
			duration: 1.024,
			ease: "expo.inOut",
			onComplete: _ => {
				// Move loading
				gsap.set(this.el, {
					y: "-200%",
					display: "none"
				})

				// Set progress bar back to zero
				this.update({
					duration: 0,
					height: 0
				})

				// Unhide loading
				gsap.set(_q(this.el).querySelector(".loading"), {
					opacity: 1
				})

				// Restore safari address bar color
				toggleSafariAddressBarColor()

				// Run callback
				callback()
			}
		}

		// Hide loading
		if (this.clicked.text == "See All") {
			var_to.x = "-100%"
			var_to.y = 0
		} else if (this.clicked.text == "Back") {
			var_to.x = 100
			var_to.y = 0
		}

		if (_q("[data-barba-namespace]").getAttribute("data-barba-namespace") == "call") {
			var tl = gsap.timeline({
				defaults: {
					duration: .386,
					ease: "expo.inOut"
				}
			})
			var size = []

			window.aspectRatio = window.matchMedia("(max-aspect-ratio: 1/1)")
			window.aspectRatio.size = set => {
				var size = []
				size[0] = _q(this.el).querySelector(".loading").offsetWidth + (_q(this.el).querySelector(".loading").offsetWidth / 2)
				size[1] = "17.5vh"

				if (this.matches) {
					size[0] = _q(this.el).querySelector(".loading").offsetHeight + (_q(this.el).querySelector(".loading").offsetHeight / 2)
					size[1] = "15vh"
				}

				if (set) gsap.to(this.el, { width: size[0], height: size[0], duration: .512 })

				return size
			}
			size = window.aspectRatio.size()
			window.aspectRatio.onchange = function () {
				size = window.aspectRatio.size(true)
			}

			tl.to(_q(this.el).querySelector(".loading"), {
				opacity: 0
			}, 0)
			tl.to(_q(this.el).querySelector(".text"), {
				margin: 0,
				onComplete: _ => {
					addClass(this.el, "bubble")
					gsap.set(_q(this.el).querySelector(".text"), {
						opacity: 1
					})
					_q(this.el).querySelector(".text").innerHTML = "<p class='hi'>hi!</p>"
				}
			}, 0)
			tl.to(this.el, {
				width: size[0],
				height: size[0],
				top: size[1],
				left: "initial",
				right: "11.5vw",
				borderRadius: "1000px",
				duration: .768
			},
				0)
			tl.set(this.el, {
				zIndex: 1
			})

			if (callback != undefined) callback()
		} else {
			gsap.fromTo(this.el, {
				scale: 1
			}, {
				scale: 1,
				duration: var_to.duration / 3,
				onComplete: _ => {
					callback__half()
				}
			})
			gsap.fromTo(this.el, var_from, var_to)
		}

		_q("#click-cover").style.display = "none"
	}

	forcehide() {
		gsap.set("#click-cover, #loading-cover", {
			display: "none"
		})
	}

	update(percent) {
		gsap.to(_q(this.el).querySelectorAll(".loading .light"), percent)
	}

	animate(view, callback) {
		var animate = false

		if (callback == undefined) callback = () => { }

		switch (view) {
			case "first-time":
				_q(this.el).querySelector(".text").innerHTML = "<div class='hi'><h1>hello!</h1></div><div class='dwan'><h2>this is dwan</h2></div>"
				animate = true
				break
			case "404":
				_q(this.el).querySelector(".text").innerHTML = "<div class='hi'><h1>oh 🦀,</h1></div><div class='dwan'><h2>you lost! 😢</h2></div>"
				animate = true
				break
			default:
				animate = false
				break
		}

		if (animate) {
			var tl = gsap.timeline({
				defaults: {
					duration: .768,
					ease: "expo.out"
				}
			})
			var el = _q(this.el)

			tl.set(el.querySelectorAll(".text"), {
				opacity: 0
			})
			tl.fromTo(el.querySelectorAll(".left-hand"), {
				yPercent: 0,
				rotation: 0
			}, {
				yPercent: 26,
				rotation: 65,
				transformOrigin: "99% 0",
				duration: .256,
				ease: "expo"
			})
			tl.fromTo(el.querySelectorAll(".right-hand"), {
				yPercent: 0,
				rotation: 0
			}, {
				yPercent: 26,
				rotation: -65,
				transformOrigin: "1% 0",
				duration: .256,
				ease: "expo"
			}, "-=.256")
			tl.set(el.querySelectorAll(".text"), {
				opacity: 1
			})
			tl.fromTo(el.querySelectorAll(".loading"), {
				opacity: 1
			}, {
				opacity: 0
			}, "+=.512")
			tl.fromTo(el.querySelectorAll(".hi h1"), {
				y: 120
			}, {
				y: 0
			}, "-=.512")
			tl.fromTo(el.querySelectorAll(".dwan h2"), {
				y: 120
			}, {
				y: 0
			}, "-=.512")
			tl.set(el.querySelectorAll(".left-hand"), {
				yPercent: 0,
				rotation: 0
			})
			tl.set(el.querySelectorAll(".right-hand"), {
				yPercent: 0,
				rotation: 0
			})
			tl.call(callback)
		} else {
			callback()
		}
	}

	clear() {
		_q(this.el).querySelector(".text").innerHTML = ""
	}
}

export default Loading