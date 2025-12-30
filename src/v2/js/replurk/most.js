"use strict"

import api from "./api.js"
import { plural, datediff } from '../helpers/helper.js'

import span from "./span.js"
import icons from "./icons.js"
import element from "./element.js"

class most {
	constructor(statistics) {
		if (!statistics) return

		this.me = statistics.me
		this.friends = statistics.friends
		this.year = statistics.year
		this.statistics = statistics

		this.responders = {
			data: [],
			parent: this,
			count: async function (response) {
				var index = this.data.findIndex(function (el) {
					return el.user_id == response.user_id
				})

				if (index < 0) {
					var user = await this.parent.friends.find(response.user_id)
					this.data.push(new element('mostresponders', user, this.parent.friends.getAvatar(user.id)))
				} else {
					this.data[index].count++
				}
				this.data.sort(this.parent.sort)

				// Update top 5
				var index = 1
				for (var i = 0; i < this.data.length; i++) {
					this.data[i].position = this.data.length
					if (this.data[i].user_id != this.parent.me.id && this.data[i].user_id != 99999) {
						this.data[i].position = index++
						this.parent.statistics.attach(`\
							<small>${this.parent.me.display_name}'s Next</small><h2>\
							<em>top</em> models</h2>\
							<h3>responders</h3>\
							<span>cycle ${this.parent.year}</span>\
							<p>all other plurkers please immediately return to the house.. pack your belongings.. and go home.</p>\
						`, this.data[i], 5)
					}
				}
			}
		}

		this.mentions = {
			data: [],
			dataAll: [],
			parent: this,
			count: async function (content) {
				var result = this.parent.findregex(/\@(\w{1,30})[\ |\:]/g, value => value.replace(/\@|\ |\:/g, ''), content, this.data)
				var max = 5
				var index = 1

				if (result) {
					// Update top 5
					this.data.sort(this.parent.sort)
					for (var idx = 0; idx < this.data.length; idx++) {
						this.data[idx].position = this.data.length

						if (index <= max) {
							var user = await this.parent.friends.findByUsername(this.data[idx].value)

							if (this.data[idx].el == undefined) {
								this.data[idx] = new element('mostmentioned', user, "", plurker => {
									plurker.avatar = new span().class("avatar").html(`<img src="${this.parent.friends.getAvatar(plurker.user_id)}" />`)
									plurker.name = new span().class("name").html(`@${plurker.nick_name}`)
									plurker.counts = new span().class("count").html(plurker.count)
									plurker.el.appendChild(plurker.avatar.el)
									plurker.el.appendChild(plurker.name.el)
									plurker.el.appendChild(plurker.counts.el)
									plurker.el.setAttribute("href", 'https://plurk.com/' + plurker.nick_name)
								})
							}

							if (user.id != this.parent.me.id && user.id != 99999) {
								this.data[idx].position = index++
								this.parent.statistics.attach(`\
									<h2>Mo<br/>st<br/><br/>Me<br/>nt<br/>io<br/>ne<br/>d</h2>
									<h3>Mo<br/>st<br/><br/>Me<br/>nt<br/>io<br/>ne<br/>d</h3>
									<p>by @${this.parent.me.nick_name} in ${this.parent.year}</p>\
								`, this.data[idx], max)
							}
						}

						if (this.data[idx].el) this.parent.statistics.attach(`<i>Most ${icons.draw("person-raising-hand-light")} Mentioned</i> <strong>in My Timeline</strong>`, this.data[idx], max)
					}
				}
			}
		}

		this.myemoticons = {
			data: [],
			parent: this,
			count: function (content) {
				this.parent.findregex(/emoticon_my\" src=\"(.*?)\"/g, function (value) {
					return value.replace(/emoticon_my\" src=\"|\"/gi, '')
				}, content, this.data)
			},
			draw: function () {
				var html = ""
				var max = 9
				this.data.sort(this.parent.sort)
				for (var i = 0; i < (this.data.length < max ? this.data.length : max) && this.data[i]; i++)
					if (this.data[i].count > 1) html += '\
						<div><img src="' + this.data[i].value + '" />\
						<span class="count">' + this.data[i].count + '</span>\
						</div>\
					'

				this.parent.statistics.newdraw({
					class: "emoticons inter",
					html: [{
						class: `list`,
						html: html
					}, {
						class: `title`,
						html: `${this.parent.year} Vibes`
					}],
					show: html != ""
				})
			}
		}

		this.hashtags = {
			data: [],
			parent: this,
			count: function (content) {
				this.parent.findregex(/hashtag\"\>(.*?)\</g, function (value) {
					return value.replace(/hashtag\"\>\#|\.\<|\</g, '')
				}, content, this.data)
			},
			draw: function () {
				var html = ""
				var max = 5
				this.data.sort(this.parent.sort)
				for (var i = 0; i < (this.data.length < max ? this.data.length : max) && this.data[i]; i++)
					if (this.data[i].count >= 0) html += `<a href="https://plurk.com/search?q=${this.data[i].value}" target="_BLANK" /><span class="count">${this.data[i].count}</span> #${this.data[i].value}</a>`

				this.parent.statistics.newdraw({
					class: "hashtags meme lexend",
					html: [{
						class: `title big`,
						html: `#${this.parent.year}<br/>`,
						repeat: 20
					}, {
						class: `image`,
						html: `<img src="/img/replurk/toy.webp" />`
					}, {
						class: `title`,
						html: `Hashtags`
					}, {
						class: `text`,
						html: html
					}, {
						class: `title`,
						html: `Hashtags everywhere`
					}],
					show: html != ""
				})
			}
		}

		this.links = {
			data: [],
			links: [],
			pics: [],
			parent: this,
			count: function (content, id, response, replurk, loved) {
				var result = content.match(/href\=\"(.*?)\"\ class=\"(.*?)\"\ rel/g)
				var count = 0
				var pics = []
				var links = []

				if (result) for (var data of result) {
					if (!this.data[id]) {
						count = response + (replurk * 250) + (loved * 50)
					}

					if (data.includes("pictureservices")) {
						this.pics.push(data)
						if (count > 0) {
							var pic = data.split('\"')
							pics.push({
								url: pic[1],
								response: response,
								replurk: replurk,
								loved: loved
							})
						}
					}
					else {
						this.links.push(data)
						if (count > 0) {
							var link = data.split('\"')
							links.push({
								url: link[1],
								response: response,
								replurk: replurk,
								loved: loved
							})
						}

					}
				}

				if (count) this.data.push({
					id: id,
					pics: pics,
					links: links,
					count: count,
					content: content
				})
			},
			drawMeta: function (link, id) {
				return `
					<span class="response">${icons.draw("left-speech-bubble")} ${link.response}</span>\
					<span class="replurk">${icons.draw("megaphone")} ${link.replurk}</span>\
					<span class="loved">${icons.draw("red-heart")} ${link.loved}</span>\
					<a href="https://plurk.com/p/${id.toString(36)}" class="link" target="_BLANK">${icons.link}</a>\
				`
			},
			drawLinks: function () {
				var max = 1
				var index = 0
				var result = ""
				this.data.sort(this.parent.sort)
				while (index < this.data.length && max > 0) {
					if (this.data[index].links.length > 0) {
						var link = this.data[index].links[0]
						result += `<p>${this.data[index].content}</p>`
						max--
					}
					index++
				}
				this.parent.statistics.newdraw({
					class: `sharedlinks meme lexend`,
					html: [{
						class: `big`,
						html: `wat<br/>`,
						repeat: 20
					}, {
						class: `image`,
						html: `<img src="/img/replurk/huh.webp" >`
					}, {
						class: `text`,
						html: `You shared ${plural(this.links.length, 'link')} links in ${this.parent.year} and this was the popular one?`
					}, {
						class: `post`,
						html: result
					}, {
						class: `text`,
						html: `and it got ${link.response} comments, ${link.replurk} replurks, and ${link.loved} loves? Well here's the <a href="https://plurk.com/p/${this.data[0].id.toString(36)}" target="_BLANK">link</a>.`
					}],
					show: this.links.length > 0
				})
			},
			drawPics: function () {
				var max = 1
				var index = 0
				var result = ``

				this.data.sort(this.parent.sort)
				while (index < this.data.length && max > 0) {
					if (this.data[index].pics.length > 0) {
						var pics = this.data[index].pics[0]
						result += `<img src="${api.url}?img=${pics.url}" />`
						max--
					}
					index++
				}

				this.parent.statistics.newdraw({
					class: `sharedpictures meme inter`,
					html: [{
						class: `image`,
						html: `<img src="/img/replurk/daddychill.webp" >`
					}, {
						class: `avatar`,
						html: `<img src="${this.parent.friends.getAvatar(this.parent.me.id)}" >`
					}, {
						class: `title`,
						html: `<p>${this.parent.year}</p>`,
						repeat: 2
					}, {
						class: `text`,
						html: `Daddy chill!</br>I only share <strong>${plural(this.pics.length, 'image')}</strong> this year`
					}],
					show: this.pics.length > 0
				})

				this.parent.statistics.newdraw({
					class: `previewpics meme outfit`,
					html: [{
						class: `image`,
						html: `<img src="/img/replurk/painting.webp" >`
					}, {
						class: `meta`,
						html: this.drawMeta(pics, this.data[0].id)
					}, {
						class: `text`,
						html: `Your most popular image in ${this.parent.year}`
					}, {
						class: `picture`,
						html: result
					}, {
						class: `text`,
						html: `should be Hang among this popular painting`
					}],
					show: result != ""
				})
			}
		}

		this.types = {
			words: 0,
			chars: 0,
			parent: this,
			count: function (content) {
				var words = content.split(" ")

				this.chars += content.length
				this.words += words.length
			},
			draw: function () {
				this.parent.statistics.newdraw({
					class: `typed meme`,
					html: [{
						class: `title`,
						html: `${this.chars}<br />`,
						repeat: 20
					}, {
						class: `image`,
						html: `<img src="/img/replurk/stephenking.webp" />`
					}, {
						class: `text`,
						html: `\
							<p>Dear Stephen king,</p>\
							<p>In 2025 I typed around <strong>${this.chars} characters</strong> in Plurk, approx. <strong>${Math.floor(this.chars / 250000)} horror novels</strong>.</p>\
							<p>Now you can retired from writing, you’re welcome\
						`
					}],
					show: this.chars > 0
				})
			}
		}

		this.responses = {
			parent: this,
			sort: (a, b) => b.response_count - a.response_count,
			draw: function (posts) {
				var post
				posts.sort(this.sort)
				if (post = posts[0], post.owner_id == this.parent.me.id && post.plurk_type != 3 && post.response_count > 0) {
					this.parent.statistics.drawPost('mostresponded', post.plurk_id, `Remember this Plurk from <strong>${datediff(post.posted)}</strong>? It got lots of reponses, ${post.response_count} of them.`, post.content, `${post.response_count} responses<br />Most Responded<br/>${post.response_count} responses<br />Most Responded<br/>${post.response_count} responses<br />Most Responded<br/>${post.response_count} responses<br />Most Responded<br/>${post.response_count} responses<br />Most Responded<br/>${post.response_count} responses<br />Most Responded<br/>`)
				}
			}
		}

		this.replurk = {
			parent: this,
			sort: (a, b) => b.replurkers_count - a.replurkers_count,
			draw: function (posts) {
				var post
				posts.sort(this.sort)
				if (post = posts[0], post.owner_id == this.parent.me.id && post.plurk_type != 3 && post.replurkers_count > 0) {
					var replurk = `<span class="replurk">This plurk got ${post.replurkers_count} ${post.replurkers_count > 1 ? "replurks" : "replurk"}</span>`
					var famous = `<span class="famous">You're famous</span>`
					var warning = `<span class="warning">Achtung! Achtung! Achtung! Achtung! Achtung! Achtung!</span>`
					this.parent.statistics.drawPost('mostreplurked outfit', post.plurk_id, `<span>This famous plurk is from ${datediff(post.posted)}</span>`, post.content, replurk + replurk + warning + famous + famous)
				}
			}
		}

		this.favorite = {
			parent: this,
			sort: (a, b) => b.favorite_count - a.favorite_count,
			draw: function (posts) {
				var post
				posts.sort(this.sort)
				if (post = posts[0], post.owner_id == this.parent.me.id && post.plurk_type != 3 && post.favorite_count > 0) {
					this.parent.statistics.drawPostAdvanced(
						'mostfavorited',
						post.plurk_id,
						`<p class="love">Everybody loves this Plurk</p><br/><p class="date">From ${datediff(post.posted)}</p>`,
						`<img src="/img/replurk/love.webp" class="loveshadow" /><img src="/img/replurk/love.webp" class="loveshadow two" /><img src="/img/replurk/love.webp" class="love" /><p>${post.content}</p>`,
						post.favorite_count
					)
				}
			}
		}

		this.interaction = {
			data: [],
			parent: this,
			count: function (response) {
				var index = this.data.findIndex(function (el) {
					return el.id == response.user_id
				})

				if (index < 0) {
					this.data.push({
						id: response.user_id,
						count: 1,
						multiplier: 1,
						plurk_id: response.plurk_id
					})
				} else {
					if (this.data[index].plurk_id == response.plurk_id) this.data[index].multiplier++
					else this.data[index].multiplier = 1
					this.data[index].count += (this.data[index].multiplier * response.content_raw.length)
				}
				this.data.sort(this.parent.sort)
			},
			draw: function () {
				var result = []
				var length = 0
				var index = 0
				while (this.data[index] && length <= 5) {
					if (this.data[index].id != this.parent.me.id) {
						result.push(this.data[index])
						length++
					}
					index++
				}

				try {
					if (result.length > 0) this.parent.statistics.drawUserList(
						``,
						`mostinteraction`,
						`These plurkers like to interact with you`,
						result
					)
				} catch {
					console.info("Error while counting most interacted plurker")
				}
			}
		}

		this.mvp = {
			data: [],
			parent: this,
			count: function (response, type) {
				var index = this.data.findIndex(function (el) {
					return el.id == response.user_id
				})

				if (index < 0) {
					this.data.push({
						id: response.user_id,
						count: 1,
						multiplier: 1,
						plurk_id: response.plurk_id
					})
				} else {
					if (type == "replurk") {
						this.data[index].count += (response.count * 250)
					} else if (type == "favorite") {
						this.data[index].count += (response.count * 50)
					} else if (response.content_raw.length > 16) {
						if (this.data[index].plurk_id == response.plurk_id) this.data[index].multiplier += .5
						else this.data[index].multiplier = .5
						this.data[index].count += (this.data[index].multiplier * response.content_raw.length)
					}
				}
				this.data.sort(this.parent.sort)
			},
			draw: async function () {
				var result = []
				var length = 0
				var index = 0
				while (this.data[index] && length < 10) {
					if (this.data[index].id != this.parent.me.id) {
						result.push(this.data[index])
						length++
					}
					index++
				}

				try {
					if (result.length > 0) this.parent.statistics.drawUserList(
						`meme lexend`,
						`mvp`,
						`<h2>Your Most Vibing Plurker in ${this.parent.year}</h2>\
						<p>vibing<br/>vibing<br/>vibing<br/>vibing<br/>vibing<br/>vibing<br/>vibing<br/>vibing<br/>vibing<br/>vibing</p>\
						<h3>MVP</h3>`,
						result,
						true
					)
				} catch (error) {
					console.info("Error while counting my mvp", error)
				}
			}
		}
	}

	sort(a, b) {
		return b.count - a.count
	}

	// Find and count all based on regex
	findregex(regex, replace, content, storage) {
		var result = content.match(regex)

		for (var index in result) {
			var value = replace(result[index])
			var idx = storage.findIndex(el => el.value == value)

			if (idx < 0) {
				storage.push({
					id: value,
					value: value,
					count: 1
				})
			} else {
				storage[idx].count++
			}
		}

		return result
	}

	async countAll(data) {
		// Find and count all my emoticons from my post
		if (data.user_id == this.me.id) this.myemoticons.count(data.content)
		// Find and count all mentions from my post
		await this.mentions.count(data.content_raw)
		// Find and count all hashtags from my post
		if (data.user_id == this.me.id) this.hashtags.count(data.content)
		// Find and count all links and pictures post from my post
		if (data.user_id == this.me.id) this.links.count(data.content, data.plurk_id, data.response_count, data.replurkers_count, data.favorite_count)
		// Find and count characther and words from my post
		if (data.user_id == this.me.id) this.types.count(data.content_raw)
	}
}

export default most