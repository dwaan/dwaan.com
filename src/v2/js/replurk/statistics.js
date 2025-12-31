"use strict"

import { gsap } from 'gsap'
import html2canvas from "html2canvas"

import api from "./api.js"
import scroll from "../helpers/scroll.js"
import { _q, addClass, hasClass, plural, reduceMotionFilter, removeClass, waitForImg } from '../helpers/helper.js'
import Swiper from 'swiper'
import { Autoplay, EffectCoverflow, Keyboard, Mousewheel, Pagination } from 'swiper/modules'

import span from "./span.js"
import colors from "./colors.js"
import icons from "./icons.js"
import element from "./element.js"
import most from "./most.js"
import inactive from "./inactive.js"

class statistics {
	constructor(next, me, friends, year) {
		if (!next || !me || !friends || !year) return

		this.whispers_count = 0
		this.poll_count = 0
		this.poll_responder_count = 0
		this.coins_count = 0
		this.porn_count = 0
		this.noresponse_count = 0
		this.private_count = 0
		this.replurker_count = 0
		this.replurker_list = []
		this.favourite_count = 0
		this.favorite_list = []
		this.response_count = 0
		this.responded_count = 0
		this.responded_other_count = 0
		this.responded_other_list = []
		this.plurks_count = 0
		this.id = 0
		this.randomcolors = []

		this.next = next
		this.me = me
		this.friends = friends
		this.year = year

		// Swiper
		this.swiper = new Swiper("#swiper", {
			modules: [Mousewheel, Keyboard, EffectCoverflow, Pagination, Autoplay],
			speed: 500,
			effect: "coverflow",
			coverflowEffect: {
				rotate: 35,
				scale: .9
			},
			grabCursor: true,
			mousewheel: true,
			centeredSlides: true,
			autoplay: {
				delay: 10000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			pagination: {
				el: "#pagination .pages",
				clickable: true,
				// bulletClass: "page",
				// bulletActiveClass: "active",
				dynamicBullets: true,
				dynamicMainBullets: 10
			},
			keyboard: {
				enabled: true,
			},
			on: {
				autoplayTimeLeft(swiper, time, progress) {
					_q("#progress svg").style.setProperty("--progress", 1 - progress)
					_q("#progress span").textContent = `${Math.ceil(time / 1000)}s`
				}
			}
		})
		const playpause = this.next.querySelector("#playpause")
		var play = true
		if (playpause) playpause.onclick = () => {
			if (play) {
				play = false
				removeClass(playpause, "play")
				addClass(playpause, "pause")
				this.swiper.autoplay.stop()
			} else {
				play = true
				removeClass(playpause, "pause")
				addClass(playpause, "play")
				this.swiper.autoplay.start()
			}
		}

		// Capture function
		const capture = this.next.querySelector("#capture")
		if (capture) capture.onclick = async () => {
			var activecapture = this.next.querySelector(".swiper-slide-active")
			if (activecapture) this.capture(activecapture)
		}

		// Most statistics object renderer
		this.most = new most(this)

		// Inactive timeline
		this.inactive = new inactive(this)

		this.el = this.next.querySelector("#statistics .swiper-wrapper")

		// Obverse when element is added to DOM
		var observer = new MutationObserver((mutationsList) => {
			mutationsList.forEach(mutation => {
				mutation.addedNodes.forEach(el => {
					if (hasClass(el, "statistics")) this.afterDraw(el)
				})
			})
		})
		observer.observe(this.el, {
			attributes: true,
			childList: true,
			subtree: false
		})
	}

	clear() {
		this.el.querySelectorAll(".statistics").forEach(el => {
			if (el.id != "hello") el.remove()
		})

		// refresh swiper
		this.swiper.update()
	}

	listCount(list, collection) {
		if (collection.length > 0) {
			collection.forEach(value => {
				var index = list.findIndex(el => el.id == value)

				if (index < 0) list.push({ id: value, count: 1 })
				else list[index].count++
			})
		}

		return list
	}

	//
	// Helper
	// 

	wrapper(style, html, background) {
		return `<div class="statistics statistics-wrap swiper-slide ${style}">\
			<div class="content" ${background ? `style="background-images:url(${background})"` : ``}>${html}</div>\
		</div>`
	}

	draw(classes, big, text, background) {
		if (typeof big == "string" || (typeof big == "number" && big > 0)) {
			this.el.insertAdjacentHTML('beforeend', this.wrapper(classes, `\
				<p>\
					<span class="big">${big}</span>\
					<span class="text">${text}</span>\
				</p>\
			`, background))
		}
	}

	newdraw() {
		if (arguments.length === 0) return

		for (let index = 0; index < arguments.length; index++) {
			const argument = arguments[index]

			if (argument.show !== false) {
				var content = ""
				const classes = argument.class ? argument.class : ""
				const background = argument.background ? argument.background : ""

				if (typeof argument.html == "object") {
					argument.html.forEach((html, index) => {
						if (typeof html == "object") {
							var repeatedhtml = ``
							const length = typeof html.repeat == "number" && html.repeat > 0 ? html.repeat : 1
							for (let index = 0; index < length; index++) repeatedhtml += `${html.html}`
							content += `<div class="content${index} ${html.class}">${repeatedhtml}</div>`
						} else content += `<div class="content${index}">${html}</div>`
					})
				}

				this.el.insertAdjacentHTML('beforeend', this.wrapper(classes, content, background))
			}
		}
	}

	drawBadge(id, show, style, icon, text, textempty) {
		style = `badges ${style}`

		if (show) {
			if (this.el.querySelector(`${id} .content .list`)) {
				this.el.querySelector(`${id} .content .list`).insertAdjacentHTML('beforeend', `\
					<div class="${style}">\
						<span class="badge">${icons.draw(icon, false)}</span>\
						<span class="title">${text}</span>\
					</div>\
				`)

				return 1
			}
		} else {
			if (this.el.querySelector(`${id} .content .list`)) this.el.querySelector(`${id} .content .list`).insertAdjacentHTML('beforeend', `\
				<div class="${style} inactive">\
					<span class="badge">${icons.draw(icon, true)}</span>\
					<span class="title">${textempty ? textempty : ""}</span>\
				</div>\
			`)
		}
		return 0
	}

	drawPost(style, id, title, text, badge) {
		var url = ""
		if (id) url = 'https://plurk.com/p/' + id.toString(36)
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawpost", `\
			<div>\
				<a href="${url}" class="link" target="_BLANK">${icons.link}</a>\
				<div class="big">${badge}</div>\
				<div class="post"><p>${text}</p></div>\
				<div class="title">${title}</div>\
			</div>\
		`))
	}

	drawPostAdvanced(style, id, title, text, badge) {
		var url = ""
		if (id) url = 'https://plurk.com/p/' + id.toString(36)
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawpost", `\
			<div>\
				<a href="${url}" class="link" target="_BLANK">${icons.link}</a>\
				<div class="big">${badge}</div>\
				<div class="post">${text}</div>\
				<div class="title">${title}</div>\
			</div>\
		`))
	}

	async drawUserList(style, id, title, users, number = false) {
		var html = ""
		var max = users.length >= 5 ? 5 : users.length
		var userToDraw = []
		var index = 0

		this.newdraw({
			class: `${id} ${style} userlist`,
			html: [{
				class: `title`,
				html: `${title}`
			}, {
				class: `list`,
				html: `<span class='loading'>Downloading user data</span>`
			}]
		})

		while (userToDraw.length < max && users[index]) {
			let user = users[index]
			let friend = await this.friends.find(user.id)

			if (friend && !api.ignoreduser(friend.nick_name)) {
				friend.count = user.count
				userToDraw.push(friend)
			}
			index++
		}

		userToDraw.forEach((user, index) => {
			var plurker = new element(user.id, user, "", plurker => {
				plurker.avatar = new span()
					.class("avatar")
					.html(`<img src="${this.friends.getAvatar(plurker.user.id)}" />`)
				if (number) {
					var medal = `sports-medal`
					if (index == 0) medal = `1st-place-medal`
					else if (index == 1) medal = `2nd-place-medal`
					else if (index == 2) medal = `3rd-place-medal`

					plurker.badge = new span()
						.class("medal")
						.html(icons.draw(medal))
					plurker.avatar.el.appendChild(plurker.badge.el)
				}
				plurker.name = new span()
					.class("name")
					.html(`${plurker.user.display_name}`)
				plurker.counts = new span()
					.class("count")
					.html(`${user.count}`)

				plurker.el.appendChild(plurker.avatar.el)
				plurker.el.appendChild(plurker.name.el)
				plurker.el.appendChild(plurker.counts.el)
				plurker.el.setAttribute("href", `https://plurk.com/${plurker.user.nick_name}`)
			})
			plurker.create()
			html += plurker.el.outerHTML
		})
		this.el.querySelector(`.${id} .list`).innerHTML = html
	}

	// Draw statistics
	async drawAll(plurks) {
		// Percentage responses
		var response_percentage = Math.round((this.plurks_count - this.noresponse_count) / this.plurks_count * 100)
		var half = response_percentage > 50 ? "Your glass is half full" : "Your glass is half empty"
		this.newdraw({
			class: `meme percentage`,
			html: [{
				class: `big`,
				html: half
			}, {
				class: `graph`,
				html: `<i style="height: ${response_percentage}%"></i>`
			}, {
				class: `text`,
				html: `${response_percentage}% of your plurks in ${this.year} recieved ${icons.draw("left-speech-bubble")} responses ${(response_percentage <= 50) ? `${icons.draw("crying-face")}` : `${icons.draw("star-struck")}`}`
			}, {
				class: `image`,
				html: `<img src="/img/replurk/glass.webp">`
			}]
		})

		// Private, whisper, and "porn" count
		var privatewhisper = `<span>In ${this.year},</span><span>I didn't post<br />any private and<br />whisper plurk</i></span>`
		if (this.private_count > 0) {
			privatewhisper += `<span>In ${this.year},<br/>I posted <i>${plural(this.private_count, 'private plurk')}</i></span>`
			if (this.whispers_count > 0) privatewhisper += `<span>I also posted <i>${plural(this.whispers_count, 'whisper')}</i></span>`
		} else {
			if (this.whispers_count > 0) privatewhisper += `<span>In ${this.year},<br/>I posted <i>${plural(this.whispers_count, 'whisper')}</i></span>`
		}
		this.newdraw({
			class: `meme privatewhisper outfit`,
			html: [{
				class: `image`,
				html: `<img src="/img/replurk/theydidntknow.webp">`
			}, {
				class: `big`,
				html: `They<br/>dind't<br/>know`
			}, {
				class: `text`,
				html: privatewhisper
			}]
		})

		// Porn count
		var posted = `I'm old enough to not post adult plurk this year`
		if (this.porn_count > 0) {
			posted = `I posted <i>${plural(this.porn_count, 'adult plurk')}</i> this year`
		}
		this.newdraw({
			class: `porn meme inter`,
			html: [{
				class: `year big`,
				html: `${this.year},<br/>`,
				repeat: 20
			}, {
				class: `ninetyfive big`,
				html: `1995 is 5 years ago</br>`,
				repeat: 20
			}, {
				class: `image`,
				html: `<img src="/img/replurk/grandma.webp">`
			}, {
				class: `avatar`,
				html: `<img src="${this.friends.getAvatar(this.me.id)}" >`
			}, {
				class: `text`,
				html: posted
			}]
		})

		// Coin count
		this.newdraw({
			class: `coins meme outfit`,
			html: [{
				class: `text`,
				html: `${plural(this.coins_count, 'plurk coin')}<br/>`,
				repeat: 20
			}, {
				class: `image`,
				html: `<img src="/img/replurk/confuse.webp">`
			}, {
				class: `big`,
				html: `Wait, you guys got <i>${plural(this.coins_count, 'plurk coin')}</i> in ${this.year}?`
			}],
			show: this.coins_count > 0
		})

		// Response, Love, and Replurk
		this.newdraw({
			class: `count meme`,
			html: [{
				class: `image`,
				html: `<img src="/img/replurk/liveloughlove.webp">`
			}, {
				class: `big`,
				html: `More like: Response, Resback, Replurk!`
			}, {
				class: `text`,
				html: `PS: This year you received <i>${this.response_count} responses</i>, <i>${this.replurker_count} replurks</i>, and <i>${this.favourite_count} loves</i> from Plurkers.`
			}]
		})

		// Most response, replurked, love post
		this.most.responses.draw(plurks)
		this.most.replurk.draw(plurks)
		this.most.favorite.draw(plurks)

		if (this.favorite_list.length > 0) this.drawUserList(
			`inter`,
			`lovers`,
			`\
			<img class="meme" src="/img/replurk/notsure.webp" />\
			<small>is this the real love? is this just fantasy?</small>\
			<h2>Top <strong>Lovers</strong></h2>\
			<p>Not sure if this plurkers like your plurk, or if they accidentaly like your plurk. Or maybe they really likes your plurk, you should asked them for sure.</p>\
			`,
			this.favorite_list.sort(this.most.sort)
		)
		if (this.replurker_list.length > 0) this.drawUserList(
			`lexend`,
			`replurkers`,
			`\
			<h2>RE<br/>PLURK<br/>ERS</h2>\
			<img src="${this.friends.getAvatar(this.me.id)}" >\
			<p>the one who made your plurk</p>\
			<p>famous in the year of ${this.year}</p>\
			<img class="meme" src="/img/replurk/distracted.webp" />\
			<p class="also">also starring</p>\
			<p class="rick">Never gonna give you up, Never gonna let you down, Never gonna run around and desert you. Never gonna make you cry, Never gonna say goodbye, Never gonna tell a lie, and hurt you.</p>\
			`,
			this.replurker_list.sort(this.most.sort)
		)
	}

	// For animating user chart
	attach(charttitle, node, max) {
		var id = node.id
		var chart
		var title
		var text
		var content
		var wrapper
		var opacity = 0
		var position = max
		var zIndex = 0
		var hidden = true

		if (node.position <= max) {
			hidden = false
			zIndex = position = (node.position - 1)
			opacity = 1
		}

		// Create the box
		if (!this.next.querySelector(`.${id}`)) {
			chart = document.createElement('div')
			chart.setAttribute('class', 'chart')

			title = document.createElement('div')
			title.classList.add('title')
			title.innerHTML = charttitle

			text = document.createElement('div')
			text.classList.add('text')
			text.appendChild(chart)
			text.appendChild(title)

			content = document.createElement('div')
			content.classList.add('content')
			content.appendChild(text)

			wrapper = document.createElement('div')
			wrapper.classList.add("statistics", "statistics-wrap", "swiper-slide", "attach", id)
			wrapper.appendChild(content)

			this.el.insertAdjacentElement("beforeend", wrapper)
		}

		// Add  element
		if (!hidden && !node.attached) {
			var maxTop = max / (max - 1) * 100

			node.insertTo(this.el.querySelector(`.${id} .chart`))

			gsap.set(node.el, {
				top: maxTop + "%",
				opacity: 0,
				zIndex: 0,
			})
		}

		// Update position
		if (!hidden || !node.hidden) {
			var currentTop = position / (max - 1) * 100
			var length = reduceMotionFilter(1)

			gsap.killTweensOf(node.el)
			gsap.to(node.el, {
				top: currentTop + "%",
				opacity: opacity,
				zIndex: zIndex,
				duration: length / 2,
				ease: "power3.out",
				onComplete: function () {
					if (hidden) {
						node.destroy()
					}
				}
			})
			node.hidden = hidden
		}

		node.update()
	}

	// Events after html is attach to DOM
	afterDraw(el) {
		var length = reduceMotionFilter(.25)

		// Content
		var color = new colors()
		var randomcolors = [color.getRandomColor(), color.getRandomColor()]
		var content = el.querySelector(".content")

		// Make colorful background
		if (randomcolors.length >= 2) {
			gsap.set(content, {
				background: `radial-gradient(at 10% 10%, ${randomcolors[0]} 0%, ${randomcolors[1]} 100%)`
			})
			gsap.set(el.querySelector(".content .big, .content .title, .content .color1"), {
				color: `${randomcolors[1]}`
			})
			gsap.set(el.querySelector(".content .color2"), {
				color: `${randomcolors[2]}`
			})
		} else {
			gsap.set(content, {
				background: `${randomcolors[0]}`
			})
		}

		// Make element appears
		gsap.fromTo(content, {
			y: 200,
			opacity: 0
		}, {
			y: 0,
			opacity: 1,
			duration: length,
			ease: "expo.out"
		})

		// Refresh scroll
		scroll.refresh()

		// refresh swiper
		this.swiper.update()
	}

	async capture(el) {
		if (el.generating) return

		console.log("Caputring", el)

		// Informing user the process is starting
		el.generating = true
		addClass(el, "wait")
		document.body.style.cursor = "wait"

		el.querySelectorAll("img").forEach(img => {
			if (!img.src.includes("plurk-api")) {
				img.dataset.src = img.src
				img.src = `${api.url}?img=${img.dataset.src}?width=${img.clientWidth}&height=${img.clientHeight}&box=1`
			} else if (img.dataset.src) {
				img.src = `${api.url}?img=${img.dataset.src}?width=${img.clientWidth}&height=${img.clientHeight}&box=1`
			}
		})
		await waitForImg(el)

		// HTML to Canvas magic
		var canvas = await html2canvas(el, {
			backgroundColor: null,
			logging: false
		})

		// Download the output
		var link = document.createElement("a")
		link.style.display = "none"
		link.download = "replurk" + this.year + "-" + Date.now() + ".png"
		link.href = canvas.toDataURL()
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		link.remove()

		// Reset button after 3s
		document.body.style.cursor = ""
		removeClass(el, "wait")
		setTimeout(() => {
			el.generating = false
		}, 3000)
	}
}

export default statistics