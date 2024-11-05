"use strict"

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import html2canvas from "html2canvas"

import api from "./api.js"
import scroll from "../helpers/scroll.js"
import { hasClass, plural, reduceMotionFilter } from '../helpers/helper.js'

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

		// Most statistics object renderer
		this.most = new most(this)

		// Inactive timeline
		this.inactive = new inactive(this)

		this.el = this.next.querySelector("#statistics")

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
		this.el.innerHTML = ""
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

	title(text, style = "", loading = false) {
		let span = loading ? `<span class="loading"><i/>` : `<span class="line"><i></i></span>`
		this.el.insertAdjacentHTML('beforeend', `\
			<div class="statistics statistics-title ${style}">\
				<h3><span>${text}</span>${span}</h3>\
			</div>`)
	}

	body(text, style = "") {
		this.el.insertAdjacentHTML('beforeend', `\
			<div class="statistics statistics-title ${style}">\
				<div class="body">${text}</div>\
			</div>`)
	}

	wrapper(style, text, background) {
		return `<div class="statistics statistics-wrap ${style}">\
			<div class="content" ${background ? `style="background-images:url(${background})"` : ``}>${text}</div>\
		</div>`
	}

	// Drawing functions

	draw(style, number, text, background) {
		if (typeof number == "string" || (typeof number == "number" && number > 0)) {
			this.el.insertAdjacentHTML('beforeend', this.wrapper(style, `\
				<p>\
					<span class="big">${number}</span>\
					<span class="text">${text}</span>\
				</p>\
			`), background)
		}
	}

	drawBadge(condition, style, icon, text, textempty) {
		style = `span1 badges badgesmall ${style}`

		if (condition) {
			this.draw(style, icons.draw(icon), text)
			return 1
		} else {
			this.draw(`${style} nobackground`, icons.draw(icon, true), textempty ? textempty : "")
			return 0
		}
	}

	drawDiv(style, text) {
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '<div class="box">' + text + '</div>'))
	}

	drawGraph(style, number, text) {
		if (typeof number == "string" || (typeof number == "number" && number > 0)) {
			this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawgraph", '\
				<p>\
					<span class="graph"><i data-number="' + number + '"></i></span>\
					<span class="info">' + text + '</span>\
				</p>\
			'))
		}
	}

	drawImage(style, image, link, title, text, badge) {
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawimage", '\
			<a href="' + link + '" target="_BLANK">\
				<span class="big">' + badge + '</span>\
				<span class="avatar"><img src="' + image + '" /></span>\
				<span class="text">' + text + '</span>\
				<span class="title">' + title + '</span>\
			</a>\
		'))
	}

	drawHTML(style, title, html) {
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawhtml", '\
			<div>\
				<div class="html">' + html + '</div>\
				<div class="title">' + title + '</div>\
			</div>\
		'))
	}

	drawLink(style, link, title, text, badge) {
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawlink", '\
			<a href="' + link + '" target="_BLANK">\
				<span class="big">' + badge + '</span>\
				<span>' + text + '</span>\
				<span class="title">' + title + '</span>\
			</a>\
		'))
	}

	drawPost(style, id, title, text, badge) {
		var url = ""
		if (id) url = 'https://plurk.com/p/' + id.toString(36)
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawpost", `\
			<div>\
				<a href="${url}" class="link" target="_BLANK">${icons.link}</a>\
				<span class="big">${badge}</span>\
				<p class="post">${text}</p>\
				<span class="title">${title}</span>\
			</div>\
		`))
	}

	async drawUserList(style, id, title, users) {
		var html = ""
		var max = users.length >= 5 ? 5 : users.length
		var length = reduceMotionFilter(1)

		this.drawHTML(`${style} userlist ${id}`, title, "<span class='info'>Downloading user data</span>")
		for (var index = 0; index < max; index++) {
			let user = users[index]
			let friend = await this.friends.find(user.id)
			if (friend) {
				var plurker = new element(user.id, friend, "", plurker => {
					plurker.avatar = new span()
						.class("avatar")
						.html(`<img src="${this.friends.getAvatar(plurker.user.id)}" />`)
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
			} else {
				max++
			}
		}
		this.el.querySelector(`.${id} .html`).innerHTML = html

		// Stagger animation
		if (id == 'mostinteraction' || id == 'mvp') {
			scroll.push(tl => {
				tl.fromTo(this.el.querySelectorAll("." + id + " .plurkers"), {
					scale: .3,
					opacity: 0
				}, {
					scale: 1,
					opacity: 1,
					duration: length,
					ease: "elastic(1.2, 0.5)",
					stagger: {
						amount: length / 3,
						from: "end"
					}
				}, 0)

				return tl
			}, tl => {
				return ScrollTrigger.create({
					trigger: this.el.querySelector("." + id),
					start: "0% 75%",
					end: "100% 75%",
					scrub: 2,
					animation: tl
				})
			})
		} else {
			scroll.push(tl => {
				tl.fromTo(this.el.querySelectorAll("." + id + " .plurkers"), {
					y: 50,
					opacity: 0
				}, {
					y: 0,
					opacity: 1,
					duration: length,
					stagger: length / 3
				}, 0)
				return tl
			}, tl => {
				return ScrollTrigger.create({
					trigger: this.el.querySelector("." + id),
					start: "0% 100%",
					end: "100% 100%",
					scrub: 1,
					animation: tl
				})
			})
		}
	}

	async drawAll(plurks) {
		var response_percentage = Math.round((this.plurks_count - this.noresponse_count) / this.plurks_count * 100)

		this.most.responses.draw(plurks)
		this.drawGraph('center graph percentage', response_percentage, 'Around <i>' + response_percentage + '%</i> of my plurks got <img src="https://api.iconify.design/fluent-emoji:left-speech-bubble.svg" /> responses ' + ((response_percentage <= 50) ? '<img src="https://api.iconify.design/fluent-emoji:crying-face.svg" />' : '<img src="https://api.iconify.design/fluent-emoji:star-struck.svg" />'))

		this.draw('recievereplurk', this.replurker_count, 'I received <i><img src="https://api.iconify.design/fluent-emoji:megaphone.svg" /> ' + plural(this.replurker_count, 'replurk') + '</i>')
		this.most.replurk.draw(plurks)

		this.most.favorite.draw(plurks)
		this.draw('recievelove', this.favourite_count, 'I recieved <i><img src="https://api.iconify.design/fluent-emoji:red-heart.svg" /> ' + plural(this.favourite_count, 'love') + '</i>')

		this.draw('privateplurk', this.private_count, 'I posted <i><img src="https://api.iconify.design/fluent-emoji:lip.svg" /> ' + plural(this.private_count, 'private plurk') + '</i>')
		this.draw('whisper', this.whispers_count, 'I posted <i><img src="https://api.iconify.design/fluent-emoji:face-in-clouds.svg" /> ' + plural(this.whispers_count, 'whisper') + '</i>')
		this.draw('porn', this.porn_count, 'I posted <i><img src="https://api.iconify.design/fluent-emoji:face-with-peeking-eye.svg" /> ' + plural(this.porn_count, 'adult plurk') + '</i>')

		this.draw('span2 responsecount', `${this.plurks_count} &rarr; ${this.response_count}`, 'I received <i><img src="https://api.iconify.design/fluent-emoji:left-speech-bubble.svg" /> ' + plural(this.response_count, 'response') + '</i> from <i>' + plural(this.plurks_count, 'plurk') + '</i>')
		this.draw('center coins', this.coins_count, 'I recieved <i><img src="https://api.iconify.design/fluent-emoji:coin.svg" /> ' + plural(this.coins_count, 'coin') + '</i>')

		if (this.favorite_list.length > 0) this.drawUserList("users", "loved", 'These Plurkers <i><img src="https://api.iconify.design/fluent-emoji:red-heart.svg" /> Loved</i> My Posts', this.favorite_list.sort(this.most.sort))
		if (this.replurker_list.length > 0) this.drawUserList("users", "replurked", 'These Plurkers likes to <i><img src="https://api.iconify.design/fluent-emoji:megaphone.svg" /> Replurked</i> My Posts', this.replurker_list.sort(this.most.sort))
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
			wrapper.classList.add("statistics", "statistics-wrap", "attach", id)
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
		var length = reduceMotionFilter(1)

		if (hasClass(el, 'statistics-wrap')) {
			var color = new colors()
			var randomcolors = [color.getRandomColor(), color.getRandomColor()]
			var content = el.querySelector(".content")

			gsap.set(content, {
				background: 'radial-gradient(at 10% 10%, ' + randomcolors[0] + ' 0%, ' + randomcolors[1] + ' 100%)'
			})

			gsap.to(content, {
				opacity: 1,
				duration: length / 2,
				ease: "power3.out"
			}, 0)

			// Animate number
			scroll.push(function (tl) {
				if (el.querySelector(".big")) {
					var number = Number(el.querySelector(".big").textContent)
					if (number > 0) {
						var load = { progress: 0 }
						var duration = 1
						if (number >= 500 && number < 1000) duration = 2
						else if (number >= 1000 && number < 99999) duration = 3
						else if (number >= 99999) duration = 4
						tl.to(load, {
							progress: number,
							snap: "progress",
							ease: "power3.out",
							duration: duration,
							onUpdate: () => {
								el.querySelector(".big").textContent = plural(load.progress)
							}
						}, 0)
					}
				}

				return tl
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%-=100px",
					end: "100px 100%-=100px",
					animation: tl,
					toggleActions: "play none none none"
				})
			})
		} else {
			// Scroll animation header line section
			scroll.push(tl => {
				tl.fromTo(el.querySelectorAll("i"), {
					x: "-100%"
				}, {
					x: "0%",
					ease: "ease.out"
				}, 0)
				return tl
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "100% 100%",
					end: "100% 0",
					animation: tl,
					scrub: 1
				})
			})
		}

		if (hasClass(el, 'drawgraph')) {
			scroll.push(tl => {
				tl.fromTo(el.querySelector(".graph"), {
					y: 100
				}, {
					y: 0
				}, 0)

				tl.fromTo(el.querySelector(".graph i"), {
					height: "0%"
				}, {
					height: el.querySelector(".graph i").getAttribute("data-number") + "%"
				}, 0)

				return tl
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "50% 100%",
					end: "100% 100%",
					animation: tl,
					scrub: 1
				})
			})
		}

		if (hasClass(el, 'coins')) {
			scroll.push(tl => {
				tl.fromTo(el.querySelector(".big"), {
					y: "50%"
				}, {
					y: 0,
					ease: "power3.out"
				}, 0)
				return tl
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "50% 100%",
					end: "100% 100%",
					animation: tl,
					scrub: 2
				})
			})
		}

		// Capture function
		this.capture(el)
	}

	capture(el) {
		var capture = el.querySelector(".content")
		if (!capture) return

		capture.onclick = async () => {
			if (capture.generating) return

			// Informing user the process is starting
			capture.generating = true
			document.body.style.cursor = "wait"

			// HTML to Canvas magic
			var canvas = await html2canvas(capture, {
				backgroundColor: null,
				logging: false,
				proxy: `${api.url}?img=`,
				useCORS: true
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
			setTimeout(() => {
				capture.generating = false
			}, 3000)
		}
	}
}

export default statistics