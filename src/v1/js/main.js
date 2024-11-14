'use strict'

import barba from '@barba/core'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js'
import { tns } from 'tiny-slider'

import { _q, _qAll, animateNumber, animateYear, waitForImg, splitText, hugeText, isTouch, parallax, konami, photoSwipe } from './helper.js'
import Menu from './menu.js'
import Loading from './loading.js'
import ImageLoading from './imageloading.js'
import Transition from './transition.js'
import DarkMode from './darkmode.js'
import worklist from './worklist.js'

gsap.config({ nullTargetWarn: false })
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// General variables
let darkmode = new DarkMode()
let menu = new Menu(darkmode)
let loading = new Loading("#loading-cover", menu, darkmode)
let imageloading = new ImageLoading(loading)
let transition = new Transition(loading, imageloading, menu)

// Barba views

var Home = {
	namespace: 'home',
	beforeEnter() {
		// Body can't be scroll while loading scroll again
		gsap.set("body", {
			overflow: "hidden"
		})
	},
	afterEnter(data) {
		let next = data.next.container
		let work = next.querySelector(".work__float")
		imageloading.barba = this

		gsap.set(".hero", {
			y: window.innerHeight
		})
		gsap.set(".work__float", { y: 500 })

		splitText(".hero__text h1, .hero__text p")

		var fruits = ["empty.webp", "apple.webp", "avocado.webp", "phone.webp", "joycon.webp"]
		var fruit = _q(".fruit")
		var index = 0
		var path = "/img/"

		// Randomize the fruits
		if (gsap.utils.random(0, 10) > 5) gsap.utils.shuffle(fruits)
		fruit.setAttribute("src", path + fruits[0])
		// Change fruit when clicked
		next.querySelectorAll(".img").forEach(el => {
			el.anim = false
			el.onmousedown = function (e) {
				do {
					index++
					if (index >= fruits.length) index = 0
				} while (fruits[index] == "empty.webp")

				if (!this.anim) {
					this.anim = gsap.timeline({
						defaults: {
							duration: .512,
							ease: "elastic"
						}
					})
					this.anim.fromTo(".poof", {
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
								this.anim.to(".poof", {
									opacity: 0,
									rotation: -180,
									scale: 1,
									ease: "power3.inOut",
									onComplete: _ => {
										this.anim = null
									}
								})
							})
						}
					})
				}

				e.preventDefault()
			}
		})

		// Auto scroll
		var duration = 512
		var delay = 128

		function runGsap(y) {
			var speed = duration / 1000

			gsap.to(window, {
				scrollTo: {
					y: y,
					autoKill: true
				},
				duration: speed,
				ease: "power2"
			})

			if (work) window._top_b = (y == 0) ? 0 : work.offsetHeight
		}
		function runAnimation(delta) {
			if (delta > 0) runGsap((delta > 50) ? "max" : 0)
			else if (delta < 0) runGsap((delta < -50) ? 0 : "max")
			else finalCheck()
		}
		function finalCheck() {
			// If the delta is zero, check if it's really on top or bottom
			if (work)
				if (window._top_b > work.offsetHeight / 2) {
					if (window._top_b != work.offsetHeight) runGsap("max")
				} else {
					if (window._top_b != 0) runGsap(0)
				}
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
		if (isTouch()) {
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

		worklist.hover(next.querySelectorAll(".work__list a img, .hero__meta .stats b"))
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

		setTimeout(_ => {
			// Body can scroll again
			gsap.set("body", {
				overflow: "initial"
			})

			// Scroll animate the hero wording
			let hero = gsap.timeline({
				scrollTrigger: {
					trigger: 'main',
					start: '0 0',
					end: '100% 0',
					scrub: true
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
					trigger: '.work__float',
					start: '0 100%',
					end: '10px 100%',
					scrub: true
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
					scrub: 3
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
					scrub: 3
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
		}, 1500)

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
		// First time need to be delayed a bit
		new animateYear("#year__living", 1984)
		new animateYear("#year__designer", 2008)
		new animateYear("#year__managerial", 2011)

		// Animate the appearing
		var anim = gsap.timeline({
			defaults: {
				duration: 2.048,
				ease: "expo.out"
			}
		})
		anim.to(".hero", {
			y: 0
		}, 0)
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
		anim.to(".work__float", {
			y: 0
		}, .768)
	},
	afterLeave() {
		clearTimeout(window._timeout)
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

		setTimeout(() => {
			// Scroll animate the works
			var y = 0
			var prevy = 0
			_qAll(".works").forEach(el => {
				el.childNodes.forEach(child => {
					var delay = 0
					var height = child.offsetHeight
					var el = child.childNodes

					y = child.offsetTop
					if (y != prevy) {
						prevy = y
						delay = 0
					} else {
						delay += .064
					}

					let tl = gsap.timeline({
						scrollTrigger: {
							trigger: child,
							start: '0 100%',
							end: '100% 100%',
							scrub: 3
						},
						defaults: {
							duration: 1.024,
							ease: "expo.out"
						}
					})
					tl.fromTo(el, { y: height / 2 }, { y: 0, delay: delay }, 0)
					tl.fromTo(el[0].childNodes[0], { y: 25 }, { y: 0 }, .128)
					tl.fromTo(el[0].childNodes[1], { y: 25 }, { y: 0 }, .256)
				})
			})

			// Scroll animate the words
			_qAll(".words").forEach(el => {
				let tl = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: '0 100%',
						end: '100% 100%',
						scrub: 3
					},
					defaults: {
						duration: 1.024,
						ease: "expo.out"
					}
				})
				tl.fromTo(el.children, {
					y: 100
				}, {
					y: 0,
					stagger: {
						from: 0,
						amount: .064
					}
				})
			})

		}, 1500);

		new animateNumber(".work__list .stats__content p:first-child b")
		new animateNumber(".work__list .stats__content p:last-child b")
	},
	onImageLoadAnimateHalfComplete() {
		let anim = gsap.timeline({
			defaults: {
				duration: 2.048,
				ease: "expo.out"
			}
		})
		anim.to(".work__list__page", {
			x: 0,
			y: 0,
			ease: "expo.out",
			duration: 2.048
		}, 0)
		anim.to(".work__list .txt0000", {
			yPercent: -20
		}, .512)
	}
}

var WorkDetail = {
	tinysliders: [],
	namespace: 'work-detail',
	afterEnter() {
		imageloading.barba = this

		gsap.set(".work__detail", { y: window.innerHeight })

		splitText(".work__list h1")

		worklist.hover("a img")
	},
	onImageLoadComplete() {
		var globalparam = {
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
		this.tinysliders = []

		_qAll(".gallery-normal").forEach(el => {
			var param = globalparam
			param.container = el
			this.tinysliders.push(new tns(param))
		})

		_qAll(".gallery-auto-height").forEach(el => {
			var param = globalparam
			param.container = el
			param.autoHeight = true
			this.tinysliders.push(new tns(param))
		})

		_qAll(".work__timeline .wheel").forEach(el => {
			var param = globalparam
			param.container = el
			param.autoHeight = true
			param.responsive = {
				0: { items: 2 },
				600: { items: 3 }
			}
			this.tinysliders.push(new tns(param))
		})

		_qAll(".gallery__mobile").forEach(el => {
			var param = globalparam
			param.container = el
			param.autoHeight = true
			param.responsive = {
				0: { items: 1 },
				600: { items: 2 },
				1200: { items: 3 }
			}
			this.tinysliders.push(new tns(param))
		})

		setTimeout(() => {
			// Scroll animate staggering from right of child
			_qAll(".gallery, .wheel, .tns-nav, .tns-controls, .work__spec > p").forEach(el => {
				let anim = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: '0 100%',
						end: '30px 100%',
						scrub: 3
					}
				})
				anim.fromTo(el.children, {
					opacity: 0,
					xPercent: 100
				}, {
					opacity: 1,
					xPercent: 0,
					ease: "expo.out",
					duration: 1.024,
					stagger: {
						from: 0,
						amount: .256
					}
				})
			})
			// Scroll animate staggering from right
			_qAll(".work__detail > hr, .work__detail > h5, .work__detail .work__spec > *").forEach(el => {
				let anim = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: '0 100%',
						end: '30px 100%',
						scrub: 3
					}
				})
				anim.fromTo(el, {
					opacity: 0,
					x: 250
				}, {
					opacity: 1,
					x: 0,
					ease: "expo.out",
					duration: 1.024,
					stagger: {
						from: 0,
						amount: .256
					}
				})
			})
			// Scroll animate immidiete from bottom
			_qAll(".work__detail > blockquote").forEach(el => {
				let anim = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: '0 100%',
						end: '30px 100%',
						scrub: 3
					}
				})
				anim.fromTo(el, {
					x: 250
				}, {
					x: 0,
					ease: "expo.out",
					duration: 1.024
				})
			})
			// Scroll animate from bottom
			_qAll(".work__detail .block__left, .work__detail .stats__content, .work__timeline").forEach(el => {
				let anim = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: '0 100%',
						end: '30px 100%',
						scrub: 3
					}
				})
				anim.fromTo(el.children, {
					y: 250
				}, {
					y: 0,
					ease: "expo.out",
					duration: 1.024,
					stagger: {
						from: 0,
						amount: .128
					}
				})
			})
		}, 1500)

		new animateNumber(".work__detail .stats__content p:first-child b")
		new animateNumber(".work__detail .stats__content p:last-child b")

		// execute above function
		photoSwipe('.gallery')
	},
	onImageLoadAnimateHalfComplete() {
		let anim = gsap.timeline({ defaults: { duration: 2.048, ease: "expo.out" } })
		anim.to(".work__detail", { y: 0 })
		anim.fromTo(".work .back", { transformOrigin: "0 0", y: -100 }, { y: 0, delay: .256 }, 0)
		anim.to(".work__detail .txt0000", { yPercent: -20 }, .512)
	},
	onLeaveCompleted() {
		// Destroying tinyslider to prevent error
		this.tinysliders.forEach(tinyslider => {
			tinyslider.destroy()
		})
		this.tinysliders = []
	}
}

var Call = {
	namespace: 'call',
	afterEnter() {
		imageloading.barba = this

		gsap.set(".call", { y: window.innerHeight })

		// The menu item animation
		let border = ".bigtext"
		let text = new hugeText(border + " > div ")

		let email = _q('.call .email')
		email.onmouseenter = function () {
			gsap.to(border, {
				duration: .386,
				ease: "expo",
				borderRadius: this.borderRadius
			})
			text.show("email me")
		}
		email.onmouseleave = function () {
			gsap.to(border, {
				duration: .386,
				ease: "expo",
				borderRadius: "2% 2% 2% 2%"
			})
			text.hide()
		}

		let search = _q('.call .search')
		search.onmouseenter = function () {
			gsap.to(border, {
				duration: .386,
				ease: "expo",
				borderRadius: this.borderRadius
			})
			text.show("search me")
		}
		search.onmouseleave = function () {
			gsap.to(border, {
				duration: .386,
				ease: "expo",
				borderRadius: "2% 2% 2% 2%"
			})
			text.hide()
		}

		// 3D effect
		parallax(function (x, y) {
			gsap.to(".call .threed", { transform: "perspective(50px) rotate3d(" + -y + ", " + x + ", 0, .1deg)" })
			gsap.to(".call h1", { x: x * 300, y: y * 300 })
			gsap.to(".call h2", { x: x * 200, y: y * 200 })
			gsap.to(".call a:nth-child(2)", { x: x * 100, y: y * 100 })
		})
	},
	onImageLoadAnimateHalfComplete() {
		loading.breath.play()

		// Scroll animate the works
		gsap.fromTo(".call > div > div > *", {
			y: 250
		}, {
			y: 0,
			ease: "expo",
			duration: 1.024,
			stagger: {
				from: 0,
				amount: .386
			}
		})
		gsap.to(".call", {
			y: 0,
			ease: "expo.out",
			duration: 2.048
		})
	},
	leave() {
		loading.breath.pause(0)
		window.onmousemove = null
	}
}

var Lost = {
	namespace: '404',
	afterEnter() {
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
	afterEnter() {
		imageloading.barba = this

		gsap.set(".imuiux", { y: window.innerHeight })

		splitText(".imuiux h1, .imuiux p, .cofound h3, .cofound h5, .cofound h4, .cofound p")

		worklist.hover("#ig .item a")
		worklist.hover(".work__list img")

		setTimeout(() => {
			// First text animation
			_qAll("#firstscene").forEach(el => {
				gsap.set(el, { height: _q("body").offsetHeight * 4 })
				gsap.set(".us h2, .us p, .us img", { opacity: 0 })
				gsap.set(".imuiux img", { transformOrigin: "50% 0" })

				let text = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: '0 0',
						end: '100% 0',
						scrub: true,
						pin: "#firstscene .pin"
					},
					defaults: {
						duration: 1,
						ease: "linear"
					}
				})

				var child = ".imuiux"
				text
					.set(child, { pointerEvents: "none" }, .5)
					.fromTo(child + " h1", { y: 0 }, { y: -60, duration: .75 }, 0)
					.fromTo(child + " h1", { opacity: 1 }, { opacity: 0, duration: .25 }, .5)
					.fromTo(child + " p", { y: 0 }, { y: -50, duration: .75 }, 0)
					.fromTo(child + " p", { opacity: 1 }, { opacity: 0, duration: .25 }, .5)

				child = ".about"
				text
					.set(child, { pointerEvents: "auto" }, .5)
					.set(child, { pointerEvents: "none" }, 2.25)
					.fromTo(child + " h2", { y: 60 }, { y: -60, duration: 2 }, .5)
					.fromTo(child + " h2", { opacity: 0 }, { opacity: 1, duration: .25 }, .5)
					.fromTo(child + " h2", { opacity: 1 }, { opacity: 0, duration: .25 }, 2.25)
					.fromTo(child + " p", { y: 50 }, { y: -50, duration: 2 }, .5)
					.fromTo(child + " p", { opacity: 0 }, { opacity: 1, duration: .25 }, .5)
					.fromTo(child + " p", { opacity: 1 }, { opacity: 0, duration: .25 }, 2.25)

				child = ".know"
				text
					.set(child, { pointerEvents: "auto" }, 2.25)
					.set(child, { pointerEvents: "none" }, 2.25)
					.fromTo(child + " h2", { y: 60 }, { y: -60, duration: 2 }, 2.25)
					.fromTo(child + " h2", { opacity: 0 }, { opacity: 1, duration: .25 }, 2.25)
					.fromTo(child + " h2", { opacity: 1 }, { opacity: 0, duration: .5 }, 3.75)
					.fromTo(child + " p", { y: 50 }, { y: -50, duration: 2 }, 2.25)
					.fromTo(child + " p", { opacity: 0 }, { opacity: 1, duration: .25 }, 2.25)
					.fromTo(child + " p", { opacity: 1 }, { opacity: 0, duration: .25 }, 4)

				child = ".who"
				text
					.set(child, { pointerEvents: "auto" }, 4)
					.fromTo(child + " h2", { y: 40 }, { y: -70, duration: 2.25 }, 4)
					.fromTo(child + " h2", { opacity: 0 }, { opacity: 1, duration: .25 }, 4)
					.fromTo(child + " h2", { opacity: 1 }, { opacity: 0, duration: .5 }, 5.75)

				child = ".imuiux img"
				text
					.fromTo(child, { yPercent: 0 }, { yPercent: -7.5, duration: 1 }, 0)
					.to(child, { scale: .95, duration: 1 }, 0)
					.to(child, { yPercent: 0, duration: 1.25 }, 1)
					.to(child, { yPercent: -12.5, duration: 4 }, 2.25)
					.to(child, { scale: .75, duration: 2 }, 4.25)
					.to(child, { opacity: 0, duration: .5 }, 5.75)
			})

			// Scroll animate Mr. Goat text
			_qAll(".mrgoat").forEach(el => {
				gsap.set(el, { height: _q("body").offsetHeight * 4 })
				let textgoat = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: '0 0',
						end: '100% 100%',
						scrub: true,
						pin: ".mrgoat .pin"
					},
					defaults: {
						duration: .25,
						ease: "linear"
					}
				})
				textgoat.fromTo(el, {
					opacity: 0
				}, {
					opacity: 1
				}, 0)
				textgoat.fromTo(el.querySelectorAll(".h21"), {
					y: 0
				}, {
					y: -20
				}, .25)
				textgoat.to(el.querySelectorAll(".h21"), {
					y: -60,
					opacity: 0
				}, .5)
				textgoat.fromTo(el.querySelectorAll(".h22"), {
					y: 50,
					opacity: 0
				}, {
					y: 0,
					opacity: 1
				}, .5)
				textgoat.to(el.querySelectorAll(".h22"), {
					y: -20
				}, .75)
				textgoat.to(el.querySelectorAll(".h22"), {
					y: -60,
					opacity: 0
				}, 1)
				textgoat.fromTo(el.querySelectorAll(".h23"), {
					y: 50,
					opacity: 0
				}, {
					y: 0,
					opacity: 1
				}, 1)
				textgoat.to(el.querySelectorAll(".h23"), {
					y: 0
				}, 1.25)
				textgoat.to(el.querySelectorAll(".h23"), {
					y: -50,
					opacity: 0
				}, 1.5)
				textgoat.fromTo(el.querySelectorAll(".h24"), {
					y: 50,
					opacity: 0
				}, {
					y: 0,
					opacity: 1
				}, 1.75)
				textgoat.to(el.querySelectorAll(".h24"), {
					y: -50,
					opacity: 0
				}, 2)
			})

			// Make Mr. Goat spinning
			_qAll(".mrgoat").forEach(el => {
				var goatObject = {
					curImg: 1,
					length: el.querySelectorAll(".img > img").length
				}
				var goatConfig = {
					curImg: goatObject.length,
					roundProps: "curImg",
					repeat: 10,
					immediateRender: true,
					ease: "linear",
					onUpdate() {
						gsap.set(".mrgoat .img > img", { opacity: 0 })
						gsap.set(".mrgoat" + goatObject.curImg, { opacity: 1 })
					}
				}
				let goat = gsap.timeline({
					scrollTrigger: {
						trigger: ".me",
						start: '0 0',
						end: '100% 0',
						scrub: true
					}
				})
				goat.to(goatObject, goatConfig)
			})

			// Scroll capabilities item
			_qAll(".anyway").forEach(el => {
				let capabilities = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: '0% 100%',
						end: '50% 100%',
						scrub: 3
					},
					defaults: {
						duration: 1.024,
						ease: "expo.out",
						stagger: {
							from: 0,
							amount: .512
						}
					}
				})
				capabilities.fromTo(el.querySelectorAll("h3, p, h4, ul li"), {
					x: 250
				}, {
					x: 0
				}, 0)
				capabilities.fromTo(el.querySelectorAll("h3, p, h4, ul li"), {
					opacity: 0
				}, {
					opacity: 1,
					duration: .128
				}, 0)
			})

			// Scroll latest works
			_qAll(".work__list").forEach(el => {
				let works = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: '25% 100%',
						end: '75% 100%',
						scrub: 3
					},
					defaults: {
						duration: 1.024,
						ease: "expo",
						stagger: {
							from: 0,
							amount: .256
						}
					}
				})
				works.fromTo(el.querySelectorAll("h5, ul > li"), {
					y: 250
				}, {
					y: 0
				}, 0)
				works.fromTo(el.querySelectorAll("h5, ul > li"), {
					opacity: 0
				}, {
					opacity: 1,
					duration: .128
				}, 0)
			})

			// Scroll cofound
			_qAll(".cofound > div > *").forEach(el => {
				let cofound = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: '0 100%',
						end: '100% 100%',
						scrub: 3
					},
					defaults: {
						duration: 1.024,
						ease: "power4.out"
					}
				})
				cofound.fromTo(el.querySelectorAll(".splext"), {
					y: 200
				}, {
					y: 0,
					stagger: {
						from: 0,
						amount: .128
					}
				}, 0)
			})
		}, 1500)
	},
	onImageLoadAnimateHalfComplete() {
		// Animate the appearing
		let anim = gsap.timeline({
			defaults: {
				duration: 2.048,
				ease: "expo.out",
				stagger: {
					from: 0,
					amount: .256
				}
			}
		})
		anim.to(".imuiux", {
			y: 0
		}, 0)
		anim.fromTo(".imuiux h1 .splext", {
			y: 150
		}, {
			y: 0
		}, 0)
		anim.fromTo(".imuiux p .splord", {
			y: 200
		}, {
			y: 0
		}, 0)
		anim.fromTo(".imuiux img", {
			y: 200
		}, {
			y: 0,
			stagger: {
				from: 0,
				amount: .386
			}
		}, 0)
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
	// debug: true,
	// logLevel: 'debug',
	transitions: [transition.default],
	views: [Home, Work, WorkDetail, Call, Lost, Me, Links],
	prevent: ({ el }) => el.classList && el.classList.contains('no-barba')
})

// Konami
konami()