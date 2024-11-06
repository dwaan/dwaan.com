"use strict"

import api from "./api.js"
import { plural, datediff, pluralinwords } from '../helpers/helper.js'

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
						this.parent.statistics.attach(`<i>Top ${icons.draw("left-speech-bubble")} Responders</i> <strong>of My Timeline</strong>`, this.data[i], 5)
					}
				}
			},
			draw: function () {
				var index = 0
				if (this.data.length > 0) {
					while ((this.data[index].user_id == this.parent.me.id || this.data[index].user_id == 99999) && index < this.data.length) index++
					if (this.data[index]) this.parent.statistics.drawImage("avatar", this.parent.friends.getAvatar(this.data[index].user_id), 'https://plurk.com/' + this.data[index].user.nick_name, '<i>Most Responder</i>', this.data[index].user.display_name, this.data[index].count)
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
								this.data[idx] = new element('mostmentionedbyme', user, "", plurker => {
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
								this.parent.statistics.attach(`<i>Most ${icons.draw("person-raising-hand-light")} Mentioned</i> <strong>in My Timeline</strong>`, this.data[idx], max)
							}
						}

						if (this.data[idx].el) this.parent.statistics.attach(`<i>Most ${icons.draw("person-raising-hand-light")} Mentioned</i> <strong>in My Timeline</strong>`, this.data[idx], max)
					}
				}
			},
			draw: function () {
				var index = 0
				if (this.data.length > 0) {
					while ((this.data[index].user_id == this.parent.me.id || this.data[index].user_id == 99999) && index < this.data.length) index++
					if (this.data[index]) this.parent.statistics.drawImage("avatar", this.parent.friends.getAvatarByUsername(this.data[index].value), 'https://plurk.com/' + this.data[index].value, '<i>Most Mentioned</i> by me', "@" + this.data[index].value, this.data[index].count)
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
					if (this.data[i].count > 1) html += '<div><img src="' + this.data[i].value + '" /> <span class="count">' + this.data[i].count + '</span></div>'
				if (html != "") this.parent.statistics.drawHTML("grid emoticons", `Most Used <i>${icons.draw("beaming-face-with-smiling-eyes")} My Emoticons</i>`, html)
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
					if (this.data[i].count > 1) html += '<div><a href="https://plurk.com/search?q=' + this.data[i].value + '" target="_BLANK" /><span class="count">' + this.data[i].count + '</span> #' + this.data[i].value + '</a></div>'
				if (html != "") {
					html = "<strong>#</strong>" + html
					this.parent.statistics.drawHTML("hashtags", `Most Used <i>${icons.draw("keycap-hashtag")} Hashtags</i>`, html)
				}
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
				return `<div class="meta">\
					<span class="response">${icons.draw("left-speech-bubble")} ${link.response}</span>\
					<span class="replurk">${icons.draw("megaphone")} ${link.replurk}</span>\
					<span class="loved">${icons.draw("red-heart")} ${link.loved}</span>\
					<a href="https://plurk.com/p/${id.toString(36)}" class="link" target="_BLANK">${icons.link}</a>\
				</div>`
			},
			drawLinks: function () {
				var max = 1
				var index = 0
				var result = ""
				this.data.sort(this.parent.sort)
				while (index < this.data.length && max > 0) {
					if (this.data[index].links.length > 0) {
						var link = this.data[index].links[0]
						result += `<div class="post">\
							<div class="info">${this.data[index].content}</div>
							${this.drawMeta(link, this.data[index].id)}
						</div>`
						max--
					}
					index++
				}
				if (this.links.length > 0) this.parent.statistics.drawDiv('sharedlinks', "<div class='title'>I shared <i>🔗 " + plural(this.links.length, 'link') + '</i> and this is the most popular one</div>' + result)
			},
			drawPics: function () {
				var max = 1
				var index = 0
				var result = ""
				this.data.sort(this.parent.sort)
				while (index < this.data.length && max > 0) {
					if (this.data[index].pics.length > 0) {
						var pics = this.data[index].pics[0]
						result += `<div class="box">\
							<div class="image" style="background-image: url(${api.url}?img=${pics.url})"></div>\
							<div class="post">\
								<div class="text">${this.data[index].content}</div>\
								${this.drawMeta(pics, this.data[index].id)}
							</div>\
						</div>`
						max--
					}
					index++
				}

				if (this.pics.length > 0) this.parent.statistics.draw('sharedpictures', this.pics.length, `I shared <i>${icons.draw("framed-picture")} ${plural(this.pics.length, 'image')}</i>`)
				if (result != "") this.parent.statistics.drawHTML('span2 previewpics', `<i>${icons.draw("framed-picture")} Most Popular Image</i>`, result)
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
				if (this.chars > 0) this.parent.statistics.draw('span2 typed mediumnumber', this.chars, 'I typed more than  <i>' + pluralinwords(this.chars, 'character') + '</i>, around <i>' + pluralinwords(this.words, 'word') + '</i> this year')
			}
		}

		this.responses = {
			parent: this,
			sort: (a, b) => b.response_count - a.response_count,
			draw: function (posts) {
				var post
				posts.sort(this.sort)
				if (post = posts[0], post.owner_id == this.parent.me.id && post.plurk_type != 3 && post.response_count > 0) {
					this.parent.statistics.drawPost('postcontent span2 mostresponded', post.plurk_id, `<i>${icons.draw("left-speech-bubble")} Most Responded</i> ${datediff(post.posted)}`, post.content, post.response_count)
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
					this.parent.statistics.drawPost('postcontent span2 mostreplurked', post.plurk_id, `<i>${icons.draw("megaphone")} Most Replurked</i> ${datediff(post.posted)}`, post.content, post.replurkers_count)
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
					this.parent.statistics.drawPost('postcontent span2 mostfavorited', post.plurk_id, `<i>${icons.draw("red-heart")} Most Loved</i> ${datediff(post.posted)}`, post.content, post.favorite_count)
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
					if (result.length > 0) this.parent.statistics.drawUserList("bubble span2", "mostinteraction", `Plurkers who really like to <i>${icons.draw("handshake")} interact</i> with me`, result)
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
					if (result.length > 0) this.parent.statistics.drawUserList("bubble span3", "mvp", `My ${this.parent.year} <i>${icons.draw("biting-lip")} MVP</i>, Most Valuable Plurker!`, result, true)
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