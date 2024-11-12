'use strict'

import barba from '@barba/core'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js'
import { tns } from 'tiny-slider'

import { _q, _qAll, removeClass, addClass, animateNumber, animateYear, waitForImg, splitText, hugeText, isTouchSupported, parallax, konami, initPhotoSwipeFromDOM } from './helper.js'
import Loading from './loading.js'
import ImageLoading from './imageloading.js'
import Menu from './menu.js'

gsap.config({ nullTargetWarn: false })
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// General variables
var logo_svg = _q(".logo").innerHTML
var els = null
var anim = null
var tl = null
var tinysliders = []

let menu = new Menu()
let loading = new Loading("#loading-cover", menu)
let imageloading = new ImageLoading(loading)

// Menu Functionality

var worklist = {
	hover: function (el) {
		el = _qAll(el)
		for (var i = el.length - 1; i >= 0; i--) {
			var scale = 1.05
			if (el[i].offsetWidth < 100) scale = 1.15

			el[i].gsap = gsap.timeline({
				repeat: -1,
				ease: "expo"
			})
			el[i].gsap.to(el[i], {
				transformOrigin: "50%",
				scale: scale,
				duration: 1.7
			})
			el[i].gsap.to(el[i], {
				scale: scale,
				duration: .6
			})
			el[i].gsap.to(el[i], {
				scale: 1,
				duration: 1.7
			})
			el[i].gsap.to(el[i], {
				scale: 1,
				duration: .9
			})

			el[i].gsap.pause()

			el[i].onmouseenter = function () {
				this.gsap.restart()
			}

			el[i].onmouseleave = function () {
				this.gsap.pause()
				gsap.to(this, {
					transformOrigin: "50%",
					scale: 1,
					duration: .512
				})
			}
		}
	}
}

// Loading animation

var FadeTransition = {
	name: 'default-transition',
	once(data) {
		removeClass(_q('.menu__pop'), "active")

		// Adding logo to loading and do some hover event
		var el = _q(loading.el).querySelector(".loading")
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
		menu.run()

		// Wait for all images to be loaded
		imageloading.run(document, load => {
			// Check if it's first time or 404 to do some text animation
			loading.animate((_q(".barba-container").getAttribute("data-barba-namespace") == "404" ? "404" : "first-time"), _ => {
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

		function animate() {
			// Make the barba wrapper fix so it won't have jaggy animation
			_q("#barba-wrapper").style.height = _q("#barba-wrapper").offsetHeight + "px"

			// Show loading then load the new container
			loading.show(_ => {
				gsap.set('.menu__pop .menu__item', {
					opacity: 0,
					yPercent: 100
				}, .768)

				done()
			})
		}

		if (menu.active) {
			var tl = gsap.timeline({
				defaults: {
					duration: 1.024,
					ease: "expo.out"
				}
			})

			removeClass(_q('.menu__pop'), "active")

			animate()

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
		console.log("Enter")
		let next = data.next.container
		this.next = next

		// Hide newContainer for a bit
		next.style.display = "block"
		next.style.visibility = "hidden"

		// Remove previous height setting
		_q("#barba-wrapper").style.height = ""

		// Wait for all image to be loaded
		imageloading.run(this)
	}
}

// Barba views

var Home = {
	namespace: 'home',
	afterEnter() {
		imageloading.barba = this

		gsap.set(".hero", {
			y: window.innerHeight
		})
		gsap.set(".work_float", { y: 500 })

		splitText(".hero__text h1, .hero__text p")
	},
	after() {
		var fruits = ["empty.webp", "apple.webp", "avocado.webp", "phone.webp", "joycon.webp"]
		var fruit = _q(".fruit")
		var index = 0
		var path = "/img/"

		// Randomize the fruits
		if (gsap.utils.random(0, 10) > 5) gsap.utils.shuffle(fruits)
		fruit.setAttribute("src", path + fruits[0])
		// Change fruit when clicked
		_q(".img").onmousedown = function (e) {
			do {
				index++
				if (index >= fruits.length) index = 0
			} while (fruits[index] == "empty.webp")

			if (!anim.isActive()) {
				anim = gsap.timeline({ defaults: { duration: .512, ease: "elastic" } })
				anim.fromTo(".poof", {
					transformOrigin: "40%",
					opacity: 1,
					rotation: 15,
					scale: 1,
					xPercent: -50,
					yPercent: 50
				}, {
					rotation: 0,
					scale: 1.75,
					xPercent: 0,
					yPercent: 0,
					onComplete: _ => {
						fruit.setAttribute("src", path + fruits[index])
						gsap.set(fruit, { opacity: 0 })

						// When fruit is loaded, show it
						waitForImg(fruit, _ => {
							gsap.set(fruit, { opacity: 1 })
							anim.to(".poof", { opacity: 0, rotation: -180, scale: 1, ease: "power3.inOut" })
						})
					}
				})

			}

			e.preventDefault()
		}

		// Auto scroll
		var duration = 512
		var delay = 128

		function runGsap(y) {
			speed = duration / 1000

			gsap.to(window, { scrollTo: { y: y, autoKill: true }, duration: speed, ease: "power2" })

			window._top_b = (y == 0) ? 0 : _q(".work_float").offsetHeight
		}
		function finalCheck() {
			// If the delta is zero, check if it's really on top or bottom
			if (window._top_b > _q(".work_float").offsetHeight / 2) {
				if (window._top_b != _q(".work_float").offsetHeight) runGsap("max")
			} else {
				if (window._top_b != 0) runGsap(0)
			}
		}
		function runAnimation(delta) {
			if (delta > 0) runGsap((delta > 50) ? "max" : 0)
			else if (delta < 0) runGsap((delta < -50) ? 0 : "max")
			else finalCheck()
		}
		function onScroll() {
			clearTimeout(window._timeout)
			window._timeout = setTimeout(function () {
				var cur_top = window.scrollY || document.documentElement.scrollTop

				gsap.killTweensOf(window)
				runAnimation(cur_top - window._top_b)

				// Wait for another gsap to run final check
				clearTimeout(window.__timeout)
				window.__timeout = setTimeout(finalCheck, duration + delay) // Following gsap duration
			}, delay)
		}

		window._top_b = 0
		if (isTouchSupported()) {
			/* Still not properly working
			window.ontouchstart = function(e) {
				clearTimeout(window._timeout)
				window._top_b = window.pageYOffset || document.documentElement.scrollTop
				window.onscroll = null
			}
			window.ontouchend = function(e) {
				var cur_top = window.pageYOffset || document.documentElement.scrollTop

				window.onscroll = onScroll

				window._timeout = setTimeout(function () {
					window.onscroll = null
					runAnimation(cur_top - window._top_b)
				}, delay)
			}
			*/
		} else {
			window.onscroll = onScroll
		}

		// 3D effect
		parallax((x, y) => {
			gsap.to(".threed", { transform: "perspective(50px) rotate3d(" + -y + ", " + x + ", 0, .1deg)" })
			gsap.to(".par_h1", { x: x * 100, y: y * 100 })
			gsap.to(".par_p", { x: x * 75, y: y * 75 })
			gsap.to(".hero__meta", { x: x * 50, y: y * 50 })
			gsap.to(".hero .stats p, .hero .stats b", { x: x * 25, y: y * 25 })
			gsap.to(".hero__image .parallax", { x: x * -25, y: y * -25 })
		})

		worklist.hover(".work__list a img, .hero__meta .stats b")
	},
	onImageLoadComplete() {
		// Fixing size
		function resizeHeroMeta() {
			_q("#trigger__padder").style.paddingTop = (_q("body").offsetHeight - _q(".work__list").offsetHeight) + "px"
			_q("#trigger__mover").style.height = (_q(".work__list").offsetHeight) + "px"
			_q(".hero__meta").style.height = (_q("body").offsetHeight - _q(".hero__meta").offsetTop - _q(".scroll").offsetHeight) + "px"
		}
		window.onresize = resizeHeroMeta
		resizeHeroMeta()

		function scroll() {
			els = null
			anim = null

			// Scroll animate the hero wording
			let hero = gsap.timeline({
				scrollTrigger: {
					trigger: 'main',
					start: '0 0',
					end: '100% 0',
					scrub: 1
				},
				defaults: {
					duration: 1.024,
					ease: "linear"
				}
			})
			hero.fromTo(".hero__text h1", {
				y: 0
			}, {
				y: -20
			}, 0)
			hero.fromTo(".hero__text p", {
				y: 0
			}, {
				y: -25
			}, 0)
			hero.fromTo(".hero .stats", {
				y: 0
			}, {
				y: -30
			}, 0)
			hero.fromTo(".hero img", {
				y: 0
			}, {
				y: 10
			}, 0)
			hero.fromTo(".shade", {
				opacity: 0
			}, {
				opacity: .75
			}, 0)

			// Scroll animate the scroll sign
			let scroll = gsap.timeline({
				scrollTrigger: {
					trigger: '.work_float',
					start: '0 100%',
					end: '10px 100%',
					scrub: 1
				},
				defaults: {
					duration: .256,
					ease: "power2.inOut"
				}
			})
			scroll.fromTo(".scroll__up", {
				opacity: 1
			}, {
				opacity: 0
			}, 0)
			scroll.fromTo(".scroll__down", {
				opacity: 0
			}, {
				opacity: 1
			}, 0)

			// Scroll animate stuff in floating box
			// Wording and stats
			var stat = gsap.timeline({
				scrollTrigger: {
					trigger: '.wording__trigger',
					start: '0 100%',
					end: '0 50%',
					scrub: 2
				},
				defaults: {
					duration: .768,
					ease: "expo.out"
				}
			})
			stat.fromTo(".work__list > .block", {
				y: 200
			}, {
				y: 0,
				stagger: {
					from: 0,
					amount: .128
				}
			}, 0)
			stat.fromTo(".work__list .stats__content p", {
				y: 200
			}, {
				y: 0,
				stagger: {
					from: "end",
					amount: .128
				}
			}, 0)

			// Work list
			var work = gsap.timeline({
				scrollTrigger: {
					trigger: ".scroller__trigger",
					start: '0 100%',
					end: '0 75%',
					scrub: 2
				}
			})
			work.fromTo(".work__list .scroller, .gallery a:not(:last-child)", {
				y: 200
			}, {
				y: 0,
				duration: .768,
				ease: "expo.out",
				stagger: {
					from: 0,
					amount: .128
				}
			})
		}
		setTimeout(_ => {
			scroll()
		}, 2000)

		// Some breathe in and breathe out animation for hero image
		var loop = gsap.timeline({ repeat: -1, ease: "expo" })
		loop.to(".hero .box", {
			transformOrigin: "50% 75%",
			scale: 1,
			duration: .9
		})
		loop.to(".hero .box", {
			scale: 1.015,
			duration: 1.7
		})
		loop.to(".hero .box", {
			scale: 1.015,
			duration: .6
		})
		loop.to(".hero .box", {
			scale: 1,
			duration: 1.7
		})

		// Swipe event for gallery
		var detectSwipe = function (el, func) {
			var swipe_det = new Object()
			swipe_det.sX = 0
			swipe_det.pX = 0
			swipe_det.sY = 0
			swipe_det.pY = 0
			swipe_det.eX = 0
			swipe_det.eY = 0
			var min_x = 20, max_x = 40, min_y = 40, max_y = 50, direc = ""
			var ele = _q(el)
			ele.addEventListener('touchstart', function (e) {
				var t = e.touches[0]
				swipe_det.sX = t.screenX
				swipe_det.sY = t.screenY
				swipe_det.pX = t.screenX
				swipe_det.pY = t.screenY
				if (ele.x == undefined) ele.x = 0
			}, false)
			ele.addEventListener('touchmove', function (e) {
				e.preventDefault()
				var t = e.touches[0]

				swipe_det.eX = t.screenX
				swipe_det.eY = t.screenY

				ele.x -= (swipe_det.pX - swipe_det.eX)

				gsap.set(el, { x: ele.x })

				swipe_det.pX = t.screenX
				swipe_det.pY = t.screenY
			}, false)
			ele.addEventListener('touchend', function (e) {
				//horizontal detection
				if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
					if (swipe_det.eX > swipe_det.sX) direc = "r"
					else direc = "l"
				}
				//vertical detection
				if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
					if (swipe_det.eY > swipe_det.sY) direc = "d"
					else direc = "u"
				}

				var delta_x = ele.offsetWidth - ele.parentNode.offsetWidth,
					ease = "expo.out"

				if (ele.x > 0 || direc == "r") ele.x = 0
				else if (ele.x < -delta_x || direc == "l") ele.x = -delta_x

				gsap.to(ele, { x: ele.x, duration: .768, ease: ease })

				if (direc != "") if (typeof func == 'function') func(el, direc)
				direc = ""
			}, false)
		}
		detectSwipe('.gallery')
	},
	onImageLoadAnimateHalfComplete() {
		// Animate the appearing
		var anim = gsap.timeline({
			defaults: {
				duration: 2.048,
				ease: "expo.out"
			}
		})
		anim.to(".hero", { y: 0 }, 0)
		anim.fromTo(".hero__image", {
			transformOrigin: "0 0",
			y: 500
		}, {
			y:
				0
		}, .256)
		anim.fromTo(".hero__text h1 .splext", {
			y: 300
		}, {
			y: 0, stagger: {
				from: 0,
				amount: .064
			}
		}, .128)
		anim.to(".hero__text .txt0000", {
			yPercent: -20
		}, .512)
		anim.fromTo(".hero__text p .splext", {
			y: 300
		}, {
			y: 0, stagger: {
				from: 0,
				amount: .128
			}
		}, .128)
		anim.fromTo(".hero__text p, .hero .stats", {
			transformOrigin: "0 0",
			y: 500
		}, {
			y: 0, stagger: {
				from: 0,
				amount: .256
			}
		}, .256)
		anim.fromTo(".hero .stats p", {
			y: 250
		}, {
			y: 0, stagger: {
				from: "end",
				amount: .256
			}
		}, .368)
		anim.to(".work_float", {
			y: 0
		}, .768)

		// First time need to be delayed a bit
		new animateYear("#year__living", 1984)
		new animateYear("#year__designer", 2008)
		new animateYear("#year__managerial", 2011)
	},
	onLeave() {
		window.onresize = null
		window.onscroll = null
		window.ontouchstart = null
		window.ontouchend = null
		window.onmousemove = null
	}
}

var Work = {
	namespace: 'work',
	afterEnter() {
		imageloading.barba = this

		gsap.set(".work__list__page", { y: window.innerHeight })

		splitText(".work__list h2")
	},
	onImageLoadComplete() {
		worklist.hover(".work__list a img")

		// controller.destroy()
		// controller = new ScrollMagic.Controller({
		// 	globalSceneOptions: {
		// 		triggerHook: .95,
		// 	}
		// })
		els = null
		anim = null

		// Scroll animate the works
		var delay = 0,
			_y = 0,
			_p_y = 0
		els = _qAll(".works")
		for (var j = els.length - 1; j >= 0; j--) {
			var _el = els[j].children
			for (var i = 0; i < _el.length; i++) {
				var _height = _el[i].offsetHeight,
					_c_el = _el[i].children

				_y = _el[i].offsetTop
				if (_y != _p_y) {
					_p_y = _y
					delay = 0
				} else {
					delay += .064
				}

				tl = gsap.timeline({
					defaults: { duration: 1.024, ease: "expo.out" }
				})
				tl
					.fromTo(_c_el, { y: _height / 2 }, { y: 0, delay: delay }, 0)
					.fromTo(_c_el[0].children[0], { y: 25 }, { y: 0 }, .128)
					.fromTo(_c_el[0].children[1], { y: 25 }, { y: 0 }, .256)
				// new ScrollMagic
				// 	.Scene({ triggerElement: _el[i] })
				// 	.setTween(tl)
				// 	.addTo(controller)
			}
		}

		// Scroll animate the words
		els = _qAll(".words")
		for (var i = 0; i < els.length; i++) {
			tl = gsap.timeline({
				defaults: { duration: 1.024, ease: "expo.out" }
			})
			tl.fromTo(els[i].children, { y: 100 }, {
				y: 0, stagger: {
					from: 0,
					amount: .064
				}
			})
			// new ScrollMagic
			// 	.Scene({ triggerElement: els[i] })
			// 	.setTween(tl)
			// 	.addTo(controller)
		}

		new animateNumber(".work__list .stats__content p:first-child b")
		new animateNumber(".work__list .stats__content p:last-child b")
	},
	onImageLoadAnimateHalfComplete() {
		anim = gsap.timeline({ defaults: { duration: 2.048, ease: "expo.out" } })
		anim
			.to(".work__list__page", { x: 0, y: 0, ease: "expo.out", duration: 2.048 }, 0)
			.to(".work__list .txt0000", { yPercent: -20 }, .512)

	}
}

var WorkDetail = {
	namespace: 'work-detail',
	afterEnter() {
		imageloading.barba = this

		gsap.set(".work__detail", { y: window.innerHeight })

		splitText(".work__list h1")
	},
	after() {
		worklist.hover("a img")
	},
	onImageLoadComplete() {
		// controller.destroy()
		// controller = new ScrollMagic.Controller({
		// 	globalSceneOptions: {
		// 		triggerHook: 1
		// 	}
		// })
		els = null
		anim = null

		var tnsparam = {
			mouseDrag: true,
			swipeAngle: false,
			speed: 400,
			loop: false,
			navPosition: "bottom",
			controlsPosition: "bottom",
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				}
			}
		}
		tinysliders = []

		els = _qAll(".gallery-normal")
		for (var i = els.length - 1; i >= 0; i--) {
			var _tnsparam = tnsparam
			_tnsparam.container = els[i]
			tinysliders.push(new tns(_tnsparam))
		}

		els = _qAll(".gallery-auto-height")
		for (var i = els.length - 1; i >= 0; i--) {
			var _tnsparam = tnsparam
			_tnsparam.container = els[i]
			_tnsparam.autoHeight = true
			tinysliders.push(new tns(_tnsparam))
		}

		els = _qAll(".work__timeline .wheel")
		for (var i = els.length - 1; i >= 0; i--) {
			var _tnsparam = tnsparam
			_tnsparam.container = els[i]
			_tnsparam.autoHeight = true
			_tnsparam.responsive = {
				0: { items: 2 },
				600: { items: 3 }
			}
			tinysliders.push(new tns(_tnsparam))
		}

		els = _qAll(".gallery__mobile")
		for (var i = els.length - 1; i >= 0; i--) {
			var _tnsparam = tnsparam
			_tnsparam.container = els[i]
			_tnsparam.autoHeight = true
			_tnsparam.responsive = {
				0: { items: 1 },
				600: { items: 2 },
				1200: { items: 3 }
			}
			tinysliders.push(new tns(_tnsparam))
		}

		// Scroll animate staggering from right of child
		els = _qAll(".gallery, .wheel, .tns-nav, .tns-controls, .work__spec > p")
		for (var j = els.length - 1; j >= 0; j--) {
			if (els[j].children.length > 0) {
				anim = gsap.fromTo(els[j].children, { opacity: 0, xPercent: 100 }, {
					opacity: 1, xPercent: 0, ease: "expo.out", duration: 1.024, stagger: {
						from: 0,
						amount: .256
					}
				})
				// new ScrollMagic
				// 	.Scene({ triggerElement: els[j] })
				// 	.setTween(anim)
				// 	.addTo(controller)
			}
		}
		// Scroll animate staggering from right
		els = _qAll(".work__detail > hr, .work__detail > h5, .work__detail .work__spec > *")
		for (var j = els.length - 1; j >= 0; j--) {
			anim = gsap.fromTo(els[j], { opacity: 0, x: 250 }, {
				opacity: 1, x: 0, ease: "expo.out", duration: 1.024, stagger: {
					from: 0,
					amount: .256
				}
			})
			// new ScrollMagic
			// 	.Scene({ triggerElement: els[j] })
			// 	.setTween(anim)
			// 	.addTo(controller)
		}
		// Scroll animate immidiete from bottom
		els = _qAll(".work__detail > blockquote")
		for (var j = els.length - 1; j >= 0; j--) {
			anim = gsap.fromTo(els[j], { x: 250 }, { x: 0, ease: "expo.out", duration: 1.024 })
			// new ScrollMagic
			// 	.Scene({ triggerElement: els[j] })
			// 	.setTween(anim)
			// 	.addTo(controller)
		}
		// Scroll animate from bottom
		els = _qAll(".work__detail .block__left, .work__detail .stats__content, .work__timeline")
		for (var j = els.length - 1; j >= 0; j--) {
			anim = gsap.fromTo(els[j].children, { y: 250 }, {
				y: 0, ease: "expo.out", duration: 1.024, stagger: {
					from: 0,
					amount: .128
				}
			})
			// new ScrollMagic
			// 	.Scene({ triggerElement: els[j] })
			// 	.setTween(anim)
			// 	.addTo(controller)
		}

		new animateNumber(".work__detail .stats__content p:first-child b")
		new animateNumber(".work__detail .stats__content p:last-child b")

		// execute above function
		initPhotoSwipeFromDOM('.gallery')
	},
	onImageLoadAnimateHalfComplete() {
		anim = gsap.timeline({ defaults: { duration: 2.048, ease: "expo.out" } })
		anim
			.to(".work__detail", { y: 0 })
			.fromTo(".work .back", { transformOrigin: "0 0", y: -100 }, { y: 0, delay: .256 }, 0)
			.to(".work__detail .txt0000", { yPercent: -20 }, .512)

	},
	onLeaveCompleted() {
		// Destroying tinyslider to prevent error
		for (var i = tinysliders.length - 1; i >= 0; i--) {
			tinysliders[i].destroy()
		}
		tinysliders = []
	}
}

var Call = {
	namespace: 'call',
	afterEnter() {
		imageloading.barba = this

		gsap.set(".call", { y: window.innerHeight })
	},
	after() {
		// The menu item animation
		var border = ".bigtext",
			borderRadius
		_hugeText = new hugeText(border + " > div ")

		elem = _q('.call .email')
		elem.onmouseenter = function () {
			gsap.to(border, {
				duration: .386,
				ease: "expo",
				borderRadius: this.borderRadius
			})
			_hugeText.show("email me")
		}
		elem.onmouseleave = function () {
			gsap.to(border, {
				duration: .386,
				ease: "expo",
				borderRadius: "2% 2% 2% 2%"
			})
			_hugeText.hide()
		}

		elem = _q('.call .search')
		elem.onmouseenter = function () {
			gsap.to(border, {
				duration: .386,
				ease: "expo",
				borderRadius: this.borderRadius
			})
			_hugeText.show("search me")
		}
		elem.onmouseleave = function () {
			gsap.to(border, {
				duration: .386,
				ease: "expo",
				borderRadius: "2% 2% 2% 2%"
			})
			_hugeText.hide()
		}

		// 3D effect
		parallax(function (x, y) {
			gsap.to(".call .threed", { transform: "perspective(50px) rotate3d(" + -y + ", " + x + ", 0, .1deg)" })
			gsap.to(".call h1", { x: x * 300, y: y * 300 })
			gsap.to(".call h2", { x: x * 200, y: y * 200 })
			gsap.to(".call a:nth-child(2)", { x: x * 100, y: y * 100 })
		})
	},
	onImageLoadAnimateComplete() {
		loading.breath.play()

		// Scroll animate the works
		gsap.fromTo(".call > div > div > *", 1.024, {
			y: 250
		}, {
			y: 0,
			ease: "expo",
			stagger: {
				from: 0,
				amount: .386
			}
		})

		gsap.to(".call", { y: 0, ease: "expo.out", duration: 2.048 })
	},
	onLeave() {
		loading.breath.pause(0)
		window.onmousemove = null
	}
}

var Lost = {
	namespace: '404',
	after() {
		imageloading.barba = this
	},
	onImageLoadComplete() {
		var speed = 10,
			tween = []

		for (var i = 0; i < 5; i++) {
			if (i % 2 == 0) {
				tween[i] = gsap.fromTo("#lost h2:nth-child(" + (i + 1) + ") span", {
					xPercent: -50
				}, {
					duration: speed + (i * 2),
					repeat: -1,
					ease: "linear",
					xPercent: 0
				})
			} else {
				tween[i] = gsap.fromTo("#lost h2:nth-child(" + (i + 1) + ") span", {
					xPercent: 0
				}, {
					duration: speed + (i * 2),
					repeat: -1,
					ease: "linear",
					xPercent: -50
				})
			}
		}

		_q("#nomokeybusiness a").onmouseover = function () {
			for (var i = 0; i < 5; i++) {
				tween[i].timeScale(4)
				_q("#nomokeybusiness a").className = "hover"
			}

			gsap.to("#nomokeybusiness p", {
				duration: .256,
				ease: "expo.inOut",
				rotation: 0
			})
			gsap.to("#nomokeybusiness a", {
				duration: .386,
				ease: "expo.inOut",
				opacity: 1
			})
		}
		_q("#nomokeybusiness a").onmouseout = function () {
			for (var i = 0; i < 5; i++) {
				tween[i].timeScale(1)
				_q("#nomokeybusiness a").className = ""
			}

			gsap.to("#nomokeybusiness p", {
				duration: .256,
				ease: "expo.inOut",
				rotation: 180
			})
			gsap.to("#nomokeybusiness a", {
				duration: .386,
				ease: "expo.inOut",
				opacity: .8
			})
		}
	}
}

var Me = {
	namespace: 'me',
	after() {
		imageloading.barba = this

		gsap.set(".imuiux", { y: window.innerHeight })

		splitText(".imuiux h1, .imuiux p, .cofound h3, .cofound h5, .cofound h4, .cofound p")
	},
	onEnterCompleted() {
		worklist.hover("#ig .item a")
		worklist.hover(".work__list img")

		// controller.destroy()
		// controller = new ScrollMagic.Controller()
		els = null
		anim = null

		// First text animation
		tl = gsap.timeline({ defaults: { duration: .5, ease: "linear" } })

		el = ".imuiux"
		tl
			.set(el, { pointerEvents: "none" }, .5)
			.fromTo(el + " h1", { y: 0 }, { y: -60, duration: .75 }, 0)
			.fromTo(el + " h1", { opacity: 1 }, { opacity: 0, duration: .25 }, .5)
			.fromTo(el + " p", { y: 0 }, { y: -50, duration: .75 }, 0)
			.fromTo(el + " p", { opacity: 1 }, { opacity: 0, duration: .25 }, .5)


		el = ".about"
		tl
			.set(el, { pointerEvents: "auto" }, .5)
			.set(el, { pointerEvents: "none" }, 2.25)
			.fromTo(el + " h2", { y: 60 }, { y: -60, duration: 2 }, .5)
			.fromTo(el + " h2", { opacity: 0 }, { opacity: 1, duration: .25 }, .5)
			.fromTo(el + " h2", { opacity: 1 }, { opacity: 0, duration: .25 }, 2.25)
			.fromTo(el + " p", { y: 50 }, { y: -50, duration: 2 }, .5)
			.fromTo(el + " p", { opacity: 0 }, { opacity: 1, duration: .25 }, .5)
			.fromTo(el + " p", { opacity: 1 }, { opacity: 0, duration: .25 }, 2.25)


		el = ".know"
		tl
			.set(el, { pointerEvents: "auto" }, 2.25)
			.set(el, { pointerEvents: "none" }, 2.25)
			.fromTo(el + " h2", { y: 60 }, { y: -60, duration: 2 }, 2.25)
			.fromTo(el + " h2", { opacity: 0 }, { opacity: 1, duration: .25 }, 2.25)
			.fromTo(el + " h2", { opacity: 1 }, { opacity: 0, duration: .5 }, 3.75)
			.fromTo(el + " p", { y: 50 }, { y: -50, duration: 2 }, 2.25)
			.fromTo(el + " p", { opacity: 0 }, { opacity: 1, duration: .25 }, 2.25)
			.fromTo(el + " p", { opacity: 1 }, { opacity: 0, duration: .25 }, 4)


		el = ".who"
		tl
			.set(el, { pointerEvents: "auto" }, 4)
			.fromTo(el + " h2", { y: 40 }, { y: -70, duration: 2.25 }, 4)
			.fromTo(el + " h2", { opacity: 0 }, { opacity: 1, duration: .25 }, 4)
			.fromTo(el + " h2", { opacity: 1 }, { opacity: 0, duration: .5 }, 5.75)


		el = ".imuiux img"
		tl
			.fromTo(el, { yPercent: 0 }, { yPercent: -7.5, duration: 1 }, 0)
			.to(el, { scale: .95, duration: 1 }, 0)
			.to(el, { yPercent: 0, duration: 1.25 }, 1)
			.to(el, { yPercent: -12.5, duration: 4 }, 2.25)
			.to(el, { scale: .75, duration: 2 }, 4.25)
			.to(el, { opacity: 0, duration: .5 }, 5.75)


		// new ScrollMagic
		// 	.Scene({ triggerElement: "#firstscene", triggerHook: 0, duration: _q("body").offsetHeight * 4 })
		// 	.setPin("#firstscene", { pushFollowers: false })
		// 	.setTween(tl)
		// 	.addTo(controller)
		gsap.set("#firstscene", { height: _q("body").offsetHeight * 4 })
		gsap.set(".us h2, .us p, .us img", { opacity: 0 })
		gsap.set(".imuiux img", { transformOrigin: "50% 0" })

		// Scroll animate Mr. Goat text
		tl = gsap.timeline({ defaults: { duration: .25, ease: "linear" } })
		tl
			.to(".mrgoat", { y: 0, opacity: 1 }, 0)
			.fromTo(".mrgoat .h21", { y: 0 }, { y: -20 }, .25)
			.to(".mrgoat .h21", { y: -60, opacity: 0 }, .5)
			.fromTo(".mrgoat .h22", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, .5)
			.to(".mrgoat .h22", { y: -20 }, .75)
			.to(".mrgoat .h22", { y: -60, opacity: 0 }, 1)
			.fromTo(".mrgoat .h23", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, 1)
			.to(".mrgoat .h23", { y: 0 }, 1.25)
			.to(".mrgoat .h23", { y: -50, opacity: 0 }, 1.5)
			.fromTo(".mrgoat .h24", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, 1.75)
			.to(".mrgoat .h24", { y: 0 }, 2)

		// new ScrollMagic
		// 	.Scene({ triggerElement: ".mrgoat", triggerHook: 0, duration: _q("body").offsetHeight * 4 })
		// 	.setPin(".mrgoat")
		// 	.setTween(tl)
		// 	.addTo(controller)

		// Make Mr. Goat spinning
		var obj = {
			curImg: 1,
			length: _qAll(".mrgoat .img > img").length
		},
			rotatinggoat = {
				curImg: obj.length,
				roundProps: "curImg",
				repeat: 10,
				immediateRender: true,
				ease: "linear",
				duration: .75,
				onUpdate() {
					gsap.set(".mrgoat .img > img", { opacity: 0 })
					gsap.set(".mrgoat" + obj.curImg, { opacity: 1 })
				}
			}
		anim = gsap.to(obj, rotatinggoat)
		// new ScrollMagic
		// 	.Scene({ triggerElement: ".me", triggerHook: 1, duration: _q(".me").offsetHeight })
		// 	.setTween(anim)
		// 	.addTo(controller)

		gsap.set(".mrgoat", { y: 0, opacity: 0 })

		// Scroll IG items
		els = _qAll("#ig .item")
		for (var i = 0; i < els.length; i++) {
			anim = gsap.fromTo(els[i].children, 1.024, { y: 25 + (i * 25), opacity: 0 }, { y: 0, opacity: 1, ease: "expo.out" })
			// new ScrollMagic.Scene({ triggerElement: els[i], triggerHook: .75 })
			// 	.setTween(anim)
			// 	.addTo(controller)
		}

		// Scroll capabilities item
		els = _qAll(".anyway h3, .anyway p, .anyway h4, .anyway ul li")
		for (var i = 0; i < els.length; i++) {
			anim = gsap.timeline({ defaults: { duration: 1.024, ease: "expo.out" } })
			anim
				.fromTo(els[i], { x: 25 + (i * 25) }, { x: 0 }, 0)
				.fromTo(els[i], { opacity: 0 }, { opacity: 1, duration: .128 }, 0)

			// new ScrollMagic.Scene({ triggerElement: els[i], triggerHook: .85 })
			// 	.setTween(anim)
			// 	.addTo(controller)
		}

		// Scroll latest works
		anim = gsap.timeline({
			defaults: {
				duration: 1.024, ease: "expo", stagger: {
					from: 0, amount: .256
				}
			}
		})
		anim
			.fromTo(".work__list, .work__list ul li", { y: 250 }, { y: 0 }, 0)
			.fromTo(".work__list, .work__list ul li", { opacity: 0 }, { opacity: 1, duration: .128 }, 0)

		// new ScrollMagic.Scene({ triggerElement: ".work__list, .work__list ul", triggerHook: .85 })
		// 	.setTween(anim)
		// 	.addTo(controller)

		// Scroll cofound
		el = _qAll(".cofound > div > *")
		for (var i = 0; i < el.length; i++) {
			if (el[i].children.length > 0) {
				anim = gsap.timeline({ defaults: { duration: 1.024, ease: "power4.out" } })
				anim
					.fromTo(el[i].querySelectorAll(".splext"), { y: 200, }, {
						y: 0, stagger: {
							from: 0, amount: .128
						}
					}, 0)

				// new ScrollMagic
				// 	.Scene({ triggerElement: el[i], triggerHook: .9 })
				// 	.setTween(anim)
				// 	.addTo(controller)
			}
		}

		// Adding class to ig images
		var els = _qAll("#ig img")
		for (var i = els.length - 1; i >= 0; i--) {
			if (els[i].offsetWidth > els[i].offsetHeight) {
				addClass(els[i], "hor")
			} else if (els[i].offsetWidth < els[i].offsetHeight) {
				addClass(els[i], "ver")
			} else {
				addClass(els[i], "squ")
			}
		}
	},
	onImageLoadAnimateHalfComplete() {
		// Animate the appearing
		anim = gsap.timeline({ defaults: { duration: 2.048, ease: "expo.out" } })
		anim
			.fromTo(".imuiux h1 .splext", { y: 150 }, {
				y: 0, stagger: {
					from: 0,
					amount: .256
				}
			}, 0)
			.fromTo(".imuiux p .splord", { y: 200 }, {
				y: 0, stagger: {
					from: 0,
					amount: .256
				}
			}, 0)


		gsap.to(".imuiux", { y: 0, ease: "expo.out", duration: 2.048 })
		gsap.fromTo(".imuiux img", { y: 200 }, {
			y: 0, duration: 2.048, ease: "expo.out", stagger: {
				from: 0,
				amount: .386
			}
		})
	}
}

var Links = {
	namespace: 'menu',
	afterEnter() {
		imageloading.barba = this
	}
}

// Initialized barba.js
barba.init({
	debug: true,
	logLevel: 'debug',
	transitions: [FadeTransition],
	views: [Home, Work, WorkDetail, Call, Lost, Me, Links],
	prevent: ({ el }) => el.classList && el.classList.contains('no-barba')
})

// Konami
konami()