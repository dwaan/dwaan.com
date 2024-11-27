"use strict"

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import api from "./api.js"
import scroll from "../helpers/scroll.js"
import animate from "../helpers/animate.js"
import { _q, _qAll, plural, monthNames, reduceMotionFilter } from '../helpers/helper.js'

import friends from "./friends.js"
import loading from './loading.js'
import scrolls from './scrolls.js'
import browser from './browser.js'
import icons from './icons.js'
import statistics from "./statistics.js"

class replurk {
	constructor(next, year) {
		// Draw in which element?
		this.next = next
		// Plurks array
		this.plurks = []
		// Plurker profile object
		this.me = {}
		// Friends object
		this.friends = new friends()
		// Statistics plurker object renderer
		this.statistics = new statistics()
		// Loading object
		this.loading = new loading()
		// Scrolling animation
		this.scrolls = new scrolls(this.next)

		// Which year?
		this.year = year
		this.startDate = this.year + '-10-29T09:00:00'
		this.endDate = new Date((this.year - 1) + '-10-29T09:00:00')
		this.days = 60 * 60 * 24 * 1000
		this.fulldays = 365
	}

	// Show/hide Animations
	// Login Pages
	showLoginPage(tl) {
		var next = this.next
		var length = reduceMotionFilter(1)

		tl.fromTo(next.querySelectorAll("#permission"), {
			position: "fixed",
			display: "",
			opacity: 0,
			top: 0
		}, {
			opacity: 1,
			duration: length,
			ease: "power3.in",
			onStart: browser.set("green", length) // correct
		})
		tl.fromTo(next.querySelectorAll("#permission .bgtext *"), {
			display: "",
			y: 200,
			opacity: 0,
		}, {
			y: 0,
			opacity: 1,
			stagger: length / 5,
			duration: length,
			ease: "power3.out",
			onComplete: () => {
				gsap.set(next.querySelectorAll("#permission"), {
					position: "",
					top: ""
				})
			}
		}, ">-" + (length / 2))

		return tl
	}
	hideLoginPage(tl) {
		var next = this.next
		var length = reduceMotionFilter(1)

		tl.set(next.querySelectorAll("#permission"), {
			position: "fixed",
			top: 0,
		})
		tl.fromTo(next.querySelectorAll("#permission .bgtext *, #permission form"), {
			y: 0,
			opacity: 1,
		}, {
			y: 200,
			opacity: 0,
			stagger: {
				from: "end",
				amount: length / 5
			},
			duration: length,
			ease: "power3.in"
		})
		tl.fromTo(next.querySelectorAll("#permission"), {
			opacity: 1
		}, {
			opacity: 0,
			duration: length,
			ease: "power3.in",
			onComplete: () => {
				gsap.set(next.querySelectorAll("#permission"), {
					position: "",
					display: "none",
					top: ""
				}, ">")
			}
		}, ">-" + (length / 4))

		return tl
	}
	// Statistic Pages
	showStatisticPages() {
		return new Promise(resolve => {
			var next = this.next
			var length = reduceMotionFilter(1)
			var tl = gsap.timeline()

			browser.set("green", length)

			tl.fromTo(next.querySelectorAll("#hello"), {
				display: "",
				opacity: 0
			}, {
				opacity: 1,
				ease: "power3.in",
				duration: length
			}, length / 4)
			tl.fromTo(next.querySelectorAll("#hello .bgtext > *"), {
				display: "",
				opacity: 0,
				y: 200
			}, {
				opacity: 1,
				y: 0,
				duration: length,
				stagger: length / 5,
				ease: "power3.out"
			}, length / 2)
			tl.fromTo(next.querySelectorAll("#hello .thumbs, #hello .text > *, #hello .arrow-big"), {
				display: "",
				opacity: 0,
				y: 200
			}, {
				opacity: 1,
				y: 0,
				duration: length,
				stagger: length / 5,
				ease: "power3.out"
			}, length / 2)
			tl.fromTo(next.querySelectorAll(".grant:not(#hello), .statistics"), {
				display: "",
				opacity: 0
			}, {
				opacity: 1,
				duration: length / 2,
				onComplete: () => resolve()
			}, length / 2)
		})
	}
	hideStatisticPages() {
		return new Promise(async resolve => {
			var next = this.next
			var length = reduceMotionFilter(1)
			var tl = gsap.timeline()

			await animate.top(next)

			tl.fromTo(next.querySelectorAll(".footer > *, #hello .bgtext > *, #hello .thumbs, #hello .text > *, #hello .arrow-big"), {
				opacity: 1,
				y: 0
			}, {
				opacity: 0,
				y: 200,
				duration: length,
				stagger: {
					from: "end",
					amount: length / 5
				},
				ease: "power3.in"
			}, length / 5)
			tl.set(next.querySelectorAll(".grant:not(#hello), .statistics"), {
				opacity: 0
			}, length / 2)
			tl.fromTo(next.querySelectorAll("#hello"), {
				opacity: 1
			}, {
				opacity: 0,
				duration: length,
				ease: "power3.in",
				onStart: browser.set("yellow", length + (length / 2)), // correct
				onComplete: () => {
					gsap.set(next.querySelectorAll(".grant"), { display: "none" })
					resolve()
				}
			}, length / 2)
		})
	}

	// Access logic
	// Login messages
	message(message, quick) {
		var next = this.next

		var loginmessage = next.querySelector("#login-message")

		if (quick) {
			loginmessage.innerHTML = message
		} else {
			gsap.to(loginmessage, {
				opacity: 0,
				onComplete: function () {
					loginmessage.innerHTML = message
					gsap.to(loginmessage, {
						opacity: 1
					})
				}
			})
		}
	}
	// Check login status
	async login(clear) {
		var next = this.next

		this.me = { id: 0 }
		this.plurks = []

		scroll.destroy()

		window.scrollTo(0, 0)

		// Scroll animation menu and logout
		this.scrolls.menu()

		// Check is server have open session
		var tl = gsap.timeline()
		tl.set(next.querySelector("#hello .arrow-big"), {
			opacity: 0
		})

		let data = await api.call("?")
		var interval = null
		if (data.success) {
			this.me = data.message
			this.friends = new friends()
			this.statistics = new statistics(next, this.me, this.friends, this.year)

			// Initial Plurk statistics
			await this.displayPlurkerData()

			// Display the rest of the statistics
			this.displayStatistics()

			// Scroll top top
			await animate.top(next)

			// Hide login page
			if (clear) next.querySelector("#permission").style.display = "none"
			else tl = this.hideLoginPage(tl)

			// Show statistic pages
			await this.showStatisticPages(tl)

			// Add logout event
			next.querySelector("#logout").onclick = () => this.logout()

			// Scroll animate statistics
			this.scrolls.statistics()
			// Scroll browser bar
			this.scrolls.browserBar()
		} else {
			// Hide statistic pages
			if (clear) next.querySelectorAll(".grant").forEach(function (el) { el.style.display = "none" })
			// Show login page
			this.showLoginPage(tl)
			// Request token
			this.token()

			// Scroll animation permission section
			this.scrolls.permisions()
			// Scroll browser bar
			this.scrolls.browserBar(false)

			// Automatic login
			interval = setInterval(async () => {
				var data = await api.call("?")

				if (data.success) {
					clearInterval(interval)
					this.login()
				}
			}, 1000)
		}

		scroll.refresh()

		// Snap
		next.querySelectorAll("section.snap").forEach(el => scroll.snap(el))
		next.querySelectorAll("section.snap-end").forEach(el => scroll.snap(el, "end"))
	}
	// Logout
	async logout() {
		var tl = gsap.timeline()

		api.abort()

		// Hide statistic pages
		await this.hideStatisticPages(tl)

		// Logout
		await api.call("?fetch=logout")
		this.statistics.clear()

		// Disconnect any api connection
		api.clear()

		// Display login
		this.login()

		scroll.refresh()
	}
	// Request token
	async token(text) {
		var next = this.next
		var length = reduceMotionFilter(1)
		var tokenlink = next.querySelector("#tokenurl")
		tokenlink.textContent = "Connecting Plurk..."

		var tl = gsap.timeline()
		tl.fromTo(next.querySelectorAll("#permission form"), {
			display: "",
			y: 200,
			opacity: 0,
		}, {
			y: 0,
			opacity: 1,
			duration: length,
			ease: "power3.out"
		}, length)
		tl.fromTo(next.querySelectorAll("#permission h1, #permission li"), {
			display: "",
			y: 50,
			opacity: 0,
		}, {
			y: 0,
			opacity: 1,
			stagger: length / 10,
			duration: length,
			ease: "power3.out"
		}, length)

		api.call("?request=token").then(data => {
			if (text) {
				this.message(text)
			} else {
				tokenlink.textContent = "Grant Access"
				tokenlink.setAttribute("href", api.url + "?redirect=" + data.message.url)
			}
		}, () => {
			this.message("Error when requesting verification from Plurk, please reload your browser again.")
		})

		if (!text) next.querySelector("#permission form").style.display = "none"
	}
	// Display sessionStorage stats
	info() {
		function getStorageSize() {
			var totalBytes = 0

			for (var key in sessionStorage) {
				if (sessionStorage.hasOwnProperty(key)) {
					var itemValue = sessionStorage.getItem(key)
					totalBytes += itemValue.length
				}
			}

			// Convert bytes to Megabytes
			var totalMegabytes = Math.round((totalBytes / 1024 / 1024) * 100) / 100

			return totalMegabytes
		}

		// Usage
		var storageSize = getStorageSize()
		console.info('Storage Size: ' + storageSize + ' MB')
	}

	// Rendering statistics
	// Display current Plurker data
	async displayPlurkerData() {
		var plurker = this.me
		var next = this.next
		var extra = ""
		var length = reduceMotionFilter(1)

		// gsap.set(next.querySelector("#background"), {
		// 	backgroundImage: `url(https://images.plurk.com/bg/${plurker.id}-${plurker.background_id}.jpg)`
		// })
		// gsap.set(next.querySelector("#statistics"), {
		// 	backgroundColor: `#${plurker.name_color}`
		// })

		// plurks_count
		var days = (plurker.anniversary.years * 365) + plurker.anniversary.days
		var responses = Math.round(plurker.response_count / days)

		next.querySelector("#hello .thumbs").innerHTML = `<img src="${plurker.avatar_big}" />`
		var text = `This is your year end RePlurk recap. Hopefully it will bring lots of good memories.`
		if (this.year == 2021) text = `If ${this.year} have been a rough year you, hopefully RePlurk will cheer you by bringing some good memories.`
		else if (this.year == 2022) text = `It's 2020 v2, and this is your year end RePlurk recap. Hopefully it will bring lots of good memories.`
		else if (this.year == 2024) text = `With crazy things happening around the world right now, hopefully RePlurk will bring back the good memories.`
		next.querySelector("#hello .text").innerHTML = `<h1>Hello ${plurker.display_name}</h1><p style="max-width: 500px; margin: 0 auto">${text}</p>`

		// Draw statistic
		this.statistics.title('All Time', 'alltime')
		if (plurker.anniversary.years && plurker.anniversary.days) {
			this.statistics.draw('center posted', Math.round(plurker.plurks_count / days), `I posted around <i>${icons.draw("left-speech-bubble")} ${plural(Math.round(plurker.plurks_count / days), "plurk")} per day</i>`)

			// Responses
			var oneday = 16
			if (responses <= oneday) extra = "That's almost 1 response every <i>" + plural(Math.round(oneday / responses), "hour") + '</i>'
			else extra = "That's almost 1 response every <i>" + plural(Math.round(oneday * 60 / responses), "minute") + '</i>'
			this.statistics.draw('span2 center responded', responses, `I responded around <i>${icons.draw("left-speech-bubble")} ${plural(responses, "time")}</i> per day. ${extra} when I'm not sleeping`)

			var join = new Date(plurker.join_date)
			this.statistics.draw('center anniversary', `<strong><i>${monthNames[join.getMonth()]}</i> <i>${join.getFullYear()}</i></strong> <em>${join.getDate()}</em>`, `I joined Plurk <i>${plural(plurker.anniversary.years, "year")}</i> and <i>${plural(plurker.anniversary.days, "day")}</i> ago`)
			this.statistics.draw('center badges', plurker.badges.length, `I have <i>${icons.draw("shield")} ${plural(plurker.badges.length, "badge")}</i> right now`)
		} else {
			this.statistics.draw('', '-', "There is no data in my timeline")
			this.statistics.draw('', plurker.badges.length, "But at least I have <i>" + plural(plurker.badges.length, "badge") + "</i> right now")
		}

		// Scroll animation hello section
		scroll.push(tl => {
			tl.fromTo(next.querySelectorAll("#hello .text, #hello .thumbs"), {
				y: 0
			}, {
				y: window.innerHeight * -3 / 4,
				ease: "linear",
				duration: length,
			}, 0)
			tl.fromTo(next.querySelectorAll("#hello .bgtext sup"), {
				y: 0,
				x: 0,
				rotation: 0
			}, {
				y: window.innerHeight * -1 / 4,
				x: window.innerHeight * -1 / 10,
				rotation: -10,
				ease: "linear",
				duration: length,
			}, 0)
			tl.fromTo(next.querySelectorAll("#hello .bgtext sub"), {
				y: 0,
				x: 0,
				rotation: 0
			}, {
				y: window.innerHeight * -1 / 4,
				x: window.innerHeight * 1 / 10,
				rotation: 10,
				ease: "linear",
				duration: length,
			}, 0)
			tl.fromTo(next.querySelectorAll("#hello .arrow-big"), {
				y: 0,
				opacity: 1
			}, {
				y: window.innerHeight * 1 / 4,
				opacity: 0,
				ease: "linear",
				duration: length / 4,
			}, 0)
			return tl
		}, tl => ScrollTrigger.create({
			trigger: next.querySelectorAll("#hello"),
			start: "0 0",
			end: "100% 0",
			animation: tl,
			scrub: true
		}))
	}
	// Display statistics
	async displayStatistics() {
		this.statistics.title('This Year', 'thisyear')
		this.statistics.draw("statistics-loading thisyearloading", "", "<i class='month'>Data from December</i>1 of 2. Loading " + this.year + " timeline. It can take up to 1 minute.")

		this.loading = new loading(this.next)
		this.loading.loop(this.fulldays)

		// Load loop timeline
		var getTimeline = async (offset) => {
			offset = (!offset) ? "" : "&offset=" + offset

			var data = await api.call("?fetch=plurk&filter=my" + offset, 1)
			if (data.success) {
				this.friends.add(data.message.plurk_users)
				this.plurks = this.plurks.concat(data.message.plurks)

				if (data.message.plurks.length > 0) {
					var lastposted = new Date(this.plurks[this.plurks.length - 1].posted)

					if (lastposted >= this.endDate) {
						this.loading.update("Data from " + monthNames[lastposted.getMonth()] + " " + lastposted.getFullYear(), this.fulldays - Math.floor((lastposted - this.endDate) / this.days))

						// Load next plurks
						await getTimeline(data.message.offset)
					} else {
						while (lastposted < this.endDate && this.plurks.length > 1) {
							this.plurks.pop()
							lastposted = new Date(this.plurks[this.plurks.length - 1].posted)
						}
						await this.loading.forcedone()
					}
				} else {
					await this.loading.forcedone()
				}
			} else {
				this.logout()
			}
		}
		await getTimeline(this.startDate)

		// When loading done
		var largest_poll_result = 0
		if (this.plurks.length > 1) {
			// Count user statistics
			this.statistics.plurks_count = 0
			this.plurks.forEach(plurk => {
				// Calculate the statistics
				if (plurk.responded) this.statistics.responded_count++
				if (plurk.owner_id == this.me.id) {
					this.statistics.plurks_count++
					this.statistics.replurker_count += plurk.replurkers.length
					this.statistics.replurker_list = this.statistics.listCount(this.statistics.replurker_list, plurk.replurkers)
					this.statistics.favourite_count += plurk.favorers.length
					this.statistics.favorite_list = this.statistics.listCount(this.statistics.favorite_list, plurk.favorers)
					if (plurk.anonymous) this.statistics.whispers_count++
					if (plurk.coins) this.statistics.coins_count += plurk.coins
					if (plurk.porn) this.statistics.porn_count++
					if (!plurk.response_count) this.statistics.noresponse_count++
					if (plurk.plurk_type == 3) this.statistics.private_count++
					this.statistics.response_count += plurk.response_count

					if (plurk.content_raw.includes("instagram.com")) this.statistics.instagrammer_count++
					if (plurk.content_raw.includes("facebook.com")) this.statistics.facebooker_count++
					else if (plurk.content_raw.includes("fb.watch")) this.statistics.facebooker_count++
					if (plurk.content_raw.includes("twitter.com")) this.statistics.twitterer_count++
					if (plurk.content_raw.includes("reddit.com")) this.statistics.redditor_count++
					if (plurk.content_raw.includes("tiktok.com")) this.statistics.tiktoker_count++
					if (plurk.content_raw.includes("imgur.com")) this.statistics.imgurer_count++
					if (plurk.content_raw.includes("youtube.com")) this.statistics.youtuber_count++

					// Calculate polls
					if (plurk.with_poll) {
						var response_count = plurk.poll.response.response_count
						this.statistics.poll_count++
						this.statistics.poll_responder_count += response_count

						if (largest_poll_result < response_count) {
							largest_poll_result = response_count
							this.statistics.poll_popular_plurk = plurk
						}
					}
				} else if (plurk.responded) this.statistics.responded_other_count++
			})

			// Sort based on date
			this.plurks.sort((a, b) => new Date(b.posted) - new Date(a.posted))

			// Draw statistics
			try {
				await this.statistics.drawAll(this.plurks)
			} catch (error) {
				console.info("Error while counting statistics", error)
			}

			// Display extended statistics
			this.displayExtendedStatistics()
		} else {
			if (this.plurks[0]) {
				var date = new Date(plurk[0].posted)
				this.statistics.inactive.draw(plurk[0], date.getFullYear())
			}
			else this.statistics.inactive.empty()
		}
	}
	// Display extended statistics
	async displayExtendedStatistics() {
		// Deeper user statistics
		this.statistics.title('Dig Deeper', 'digdeeper')
		this.statistics.draw("statistics-loading digdeeperloading", "", "<i class='month'>Data from " + this.year + "</i> 2 of 2. Loading all responses. <small>If the loading seems to stop, refresh your browser tab to resume your download. Closing your browser tab will clear all downloaded data.</small>")

		// Load each post responses and calculate statistics
		this.loading = new loading(this.next)
		this.loading.loop(this.plurks.length)

		// Get the responses for each plurks in parallel
		this.plurks.sort((a, b) => new Date(a.posted) < new Date(b.posted))
		for (var plurk of this.plurks) {
			var date = new Date(plurk.posted)
			this.loading.update("Data from " + monthNames[date.getMonth()] + " " + date.getFullYear())

			// Count all
			await this.statistics.most.countAll(plurk)

			// Count responses
			if (plurk.response_count > 0 && (plurk.responded || plurk.owner_id == this.me.id)) {
				var result = await api.call("?fetch=response&plurk_ids=" + plurk.plurk_id)
				if (result.success) for (var message of result.message) {
					// Add friends from response lists
					this.friends.add(message.friends)

					// Count the rest of statistics
					for (var response of message.responses) {
						// Find and count all responders
						await this.statistics.most.responders.count(response)
						this.statistics.most.interaction.count(response)
						this.statistics.most.mvp.count(response, "response")
						// Count all
						await this.statistics.most.countAll(response)
					}
				} else {
					this.logout()
					break
				}
			}
		}

		// Display How Many Links
		this.statistics.most.links.drawLinks()
		// Display How Many Pictures
		this.statistics.most.links.drawPics()

		// Draw Results
		// Display Most Responder
		// this.statistics.most.responders.draw()

		// Display Most Interaction
		this.statistics.most.interaction.draw()

		// Display Most Mentioned by me
		// this.statistics.most.mentions.draw()

		// Display How Many Words-Characters
		this.statistics.most.types.draw()

		// Display Most hashtags by me
		this.statistics.most.hashtags.draw()

		// Display Most My Emoticons
		this.statistics.most.myemoticons.draw()

		// Display MVP
		this.statistics.replurker_list.forEach(value => {
			this.statistics.most.mvp.count({ user_id: value.id, count: value.count }, "replurk")
		})
		this.statistics.favorite_list.forEach(value => {
			this.statistics.most.mvp.count({ user_id: value.id, count: value.count }, "favorite")
		})
		this.statistics.most.mvp.draw()

		// Replurk Badges
		var gender = `${icons.draw("crown")} Leader`
		if (this.me.gender == 1) gender = `${icons.draw("crown")} King`
		if (this.me.gender == 0) gender = `${icons.draw("crown")} Queen`

		var tiktok = "mirror-ball"
		if (this.me.gender == 1) tiktok = "man-dancing"
		if (this.me.gender == 0) tiktok = "woman-dancing"

		var facebook = "older-person"
		if (this.me.gender == 1) facebook = "old-man"
		if (this.me.gender == 0) facebook = "old-woman"

		var superhero = "person-superhero"
		if (this.me.gender == 1) facebook = "man-superhero"
		if (this.me.gender == 0) facebook = "woman-superhero"

		var plurker = icons.draw("person-bowing")
		if (this.me.gender == 1) plurker = icons.draw("man-bowing")
		if (this.me.gender == 0) plurker = icons.draw("woman-bowing")

		this.statistics.title('RePlurk Badges', 'replurkbadges')
		this.statistics.body(`\
			<h4>What are RePlurk Badges?</h4>\
			<p>They’re badges based on your daily activities on Plurk. There are currently 18 badges in total, for things like:</p>\
			<ol>\
				<li>Creating a ton of polls (Polling ${gender})</li>\
				<li>Getting a bunch of coins (Plurk Coins Billionaire)</li>\
				<li>Writing a kilo of plurks (Novelist and Keyboard Warrior)</li>\
				<li>Posting a ton of \"adult\" posts (Adult-er)</li>\
				<li>Sharing social media URLs other than Plurk (there are 7 badges)</li>\
				<li>Sharing an olympic size of pictures and links (Meme Lord & Missing Link)</li>\
				<li>Getting a bunch of Replurk (Trendsetter)</li>\
				<li>and, posting almost every day on Plurk (2 badges for Active Plurker)</li>\
			</ol>\
			`, `replurkbadges description`)

		var count = 0
		count += this.statistics.drawBadge(this.statistics.poll_count >= 5, 'pollbadges', "ballot-box-with-ballot", "<strong>Polling " + gender + "</strong>", "Create more pollings")
		count += this.statistics.drawBadge(this.statistics.coins_count >= 5, 'coinbadges', "coin", "<strong>Plurk Coins Billionaire</strong>", "Receive lots of coins")
		count += this.statistics.drawBadge(this.statistics.most.types.words >= 50000, 'novelistbadges', "orange-book", "<strong>Novelist</strong>", "Post more plurk")
		count += this.statistics.drawBadge(this.statistics.most.types.chars >= 1000000, 'keyboardbadges', "keyboard", "<strong>Keyboard Warrior</strong>", "Response more plurk")
		count += this.statistics.drawBadge(this.statistics.most.links.pics.length >= 356, 'memebadges', "cat", "<strong>Meme Lord</strong>", "Share more images")
		count += this.statistics.drawBadge(this.statistics.most.links.links.length >= 356 / 2, 'missingbadges', "orangutan", "<strong>The Missing Link</strong>", "Share more links")
		count += this.statistics.drawBadge(this.statistics.instagrammer_count >= 10, 'socmedbadges', "camera", "<strong>Instagrammer</strong>", "Share more Instagram")
		count += this.statistics.drawBadge(this.statistics.facebooker_count >= 10, 'socmedbadges', facebook, "<strong>Facebooker</strong>", "Share more Facebook")
		count += this.statistics.drawBadge(this.statistics.twitterer_count >= 10, 'socmedbadges', "hatching-chick", "<strong>The Real Chief Twit</strong>", "Share more Twitter")
		count += this.statistics.drawBadge(this.statistics.redditor_count >= 10, 'socmedbadges', "robot", "<strong>/r</strong>", "Share more Reddit")
		count += this.statistics.drawBadge(this.statistics.tiktoker_count >= 10, 'socmedbadges', tiktok, "<strong>Tiktoker</strong>", "Share more TikTok")
		count += this.statistics.drawBadge(this.statistics.imgurer_count >= 10, 'socmedbadges', "framed-picture", "<strong>Imgur-er</strong>", "Share more Imgur")
		count += this.statistics.drawBadge(this.statistics.youtuber_count >= 10, 'socmedbadges', "movie-camera", `<strong>Youtuber ${icons.draw("sleepy-face")}`, "Share more YouTube")
		count += this.statistics.drawBadge(this.statistics.porn_count >= 10, 'adultbadges', "face-with-peeking-eye", "<strong>Adult-er</strong>", "Plurk more \"adult\" content")
		count += this.statistics.drawBadge(this.statistics.replurker_count >= 50, 'plurkerbadges', "trophy", "<strong>Trendsetter</strong>", "Replurk more Plurk")
		count += this.statistics.drawBadge(this.statistics.plurks_count >= 356 * 1.5, 'plurkerbadges', "military-medal", `<strong>Active Plurker ${plurker}</strong>`, "Plurk more daily")
		count += this.statistics.drawBadge(this.statistics.plurks_count >= 356 * 2, 'plurkerbadges', superhero, `<strong>Super Active Plurker ${plurker}${plurker}</strong>`, "Plurk even more daily")
		this.statistics.drawBadge(count >= 17, 'plurkerbadges', "glowing-star", `<strong>Super Star</strong>`, "Catch them all")
		this.info()
	}

	// Main entry
	// Run this to start the API
	run(el) {
		return new Promise(resolve => {
			var length = reduceMotionFilter(1)
			this.next = el

			// Run the login
			gsap.fromTo(this.next.querySelectorAll('#credits'), {
				opacity: 0
			}, {
				opacity: 1,
				duration: length,
				ease: "power3.in",
				onStart: browser.set("yellow", length), // correct
				onComplete: async () => {
					// Display login
					await this.login(true)

					resolve()
				}
			})
		})
	}
}

export default replurk