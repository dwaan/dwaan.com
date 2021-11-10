/*
	Simple span element object:

	1. update(text): update the content with text value, and animate it if it's number
	2. updateHTML(text): update the content with html value
*/
class span {
	constructor(classname, text) {
		this.el = document.createElement('span');
		this.el.setAttribute("class", classname);
		this.el.innerHTML = text;
	}

	update(text) {
		animateNumber(this.el.textContent, text, (text) => {
			this.el.textContent = text;
		});
	}

	updateHTML(text) {
		this.el.innerHTML = text;
	}
}

/*
	Color randomizer

	1. colors: array of colors value
	2. getRandomColor(): get the randomized color from colors list
*/
class colors {
	constructor() {
		this.oldcolor = "";
		this.randomcolors = [];
		this.colors = ['rgb(63,94,251)', 'rgb(252,70,107)', 'rgb(34,193,195)', 'rgb(253,187,45)', 'rgb(195,34,190)', 'rgb(219,158,0)', 'rgb(75,231,152)','rgb(195,34,103)', 'rgb(45,182,253)'];
	}

	getRandomColor() {
		var color;
		do {
			this.randomcolors = gsap.utils.shuffle(this.colors).slice();
		} while(this.oldcolor == (color = this.randomcolors.pop()));
		this.oldcolor = color;
		return color;
	}
}

/*
	Plurk element object spesification:

	1. id: contain the id name
	2. user: contain user object
	3. attached: status of element is attached in DOM or not
	4. create(): create the DOM element
	4. destroy(): remove the DOM element
	4. update(): update the DOM element based on it's current value
	5. insertTo(element): insert DOM element to spesific element, also will check if it's already created or not

*/
class plurkerElement {
	constructor(id, data, customcreate) {
		this.id = id;
		this.user = data;
		this.user_id = data.id;
		this.value = data.nick_name;
		this.nick_name = data.nick_name;
		this.attached = false;
		this.hidden = true;
		this.count = 1;
		this.position = 0;
		this.customcreate = customcreate;
		this.el = false;
		this.counts = new span('count', this.count);
	}

	create() {
		this.el = document.createElement('a');
		this.el.setAttribute("id", this.id + this.user_id);
		this.el.setAttribute("class", 'plurkers');
		this.el.setAttribute("href", 'https://plurk.com/' + this.user.nick_name);
		this.el.setAttribute("target", '_BLANK');

		if (!this.customcreate) {
			this.avatar = new span('avatar', '<img src="' + friends.getAvatar(this.user_id) + '" />');
			this.name = new span('name', this.user.display_name);
			this.counts = new span('count', this.count);
			this.el.appendChild(this.avatar.el);
			this.el.appendChild(this.name.el);
			this.el.appendChild(this.counts.el);
		} else {
			this.customcreate(this);
		}
	}

	insertTo(element) {
		if (!this.el) this.create();

		this.attached = true;
		element.insertAdjacentElement("beforeend", this.el);
	}

	destroy() {
		this.attached = false;

		if (this.el) {
			this.el.parentNode.removeChild(this.el);
			return true;
		} else {
			return false;
		}
	}

	update() {
		// Only update when it's attached
		if (this.attached) {
			this.counts.update(this.count);
		}
	}
}



/*
	Plurker profile object
*/
var me = { id: 0 };

/*
	Friends object spesification:

	1. data: contains all the friends collection data
	2. add(data): add friend to friends collection data
	3. find(user_id): return friend data based on their id
	4. findByUsername(nick_name): return friend data based on their nick name
	5. getAvatar(user_id): return avatar url based on their id for from friends collection data
	6. getAvatarByUsername(user_id): return avatar url based on their nick name for from friends collection data
	7. getName(user_id): return friend name
*/
var friends = {
	data: {},
	unavailable: [],
	init: function() {
		this.data = {};
	},
	add: function(new_friends) {
		Object.assign(this.data, new_friends);
	},
	find: async function(user_id) {
		if(this.unavailable.findIndex(el => el == user_id) >= 0) return false;

		if(this.data && this.data[user_id]) {
			return this.data[user_id];
		} else {
			var result = await api.call("?fetch=APP&url=/Profile/getPublicProfile&user_id=" + user_id);
		
			if(result) {
				var temp = {};
				temp[result.message.user_info.id] = result.message.user_info;
				friends.add(temp);
				return result.message.user_info;
			} else {
				this.unavailable.push(user_id);
				return false;
			}
		}
	},
	findByUsername: async function(nick_name) {
		var user_id = false;

		if(this.unavailable.findIndex(el => el == nick_name) >= 0) return false;
		
		for(var index in this.data) {
			if(this.data[index].nick_name.toLowerCase() == nick_name.toLowerCase()) {
				user_id = index;
				break;
			}
		}

		if(user_id) {
			return this.data[user_id];
		} else {
			var result = await api.call("?fetch=APP&url=/Profile/getPublicProfile&nick_name=" + nick_name);
		
			if(result) {
				var temp = {};
				temp[result.message.user_info.id] = result.message.user_info;
				friends.add(temp);
				return result.message.user_info;
			} else {
				this.unavailable.push(nick_name);
				return false;
			}
		}
	},
	getAvatar: function(user_id) {
		if(user_id && this.data && this.data[user_id]) {
			if(this.data[user_id].has_profile_image) {
				var avatar = "";
				if (this.data[user_id].avatar) avatar = this.data[user_id].avatar;
				return 'https://avatars.plurk.com/' + user_id + '-big' + avatar + '.jpg';
			}
		}
		return 'https://plurk.com/static/default_big.jpg';
	},
	getAvatarByUsername: function(user_name) {
		var user_id = false;

		if(user_name) { 
			for(var index in this.data) {
				if(this.data[index].nick_name.toLowerCase() == user_name.toLowerCase()) {
					user_id = index;
					break;
				}
			}
		}

		return this.getAvatar(user_id);
	},
	getName: function(user_id) {
		if(this.data && this.data[user_id]) {
			return this.data[user_id];
		}
		return false;
	},
}

/*
	Statistics plurker object renderer
*/
var statistics = {
	// Storage
	el: false,
	whispers_count: 0,
	coins_count: 0,
	porn_count: 0,
	noresponse_count: 0,
	private_count: 0,
	replurker_count: 0,
	replurker_list: [],
	favourite_count: 0,
	favourite_list: [],
	response_count: 0,
	responded_count: 0,
	responded_other_count: 0,
	responded_other_list: [],
	plurks_count: 0,
	id: 0,
	// Other
	next: document.createElement('div'),
	randomcolors: [],
	init: function(next) {
		this.el = false;
		this.whispers_count = 0;
		this.coins_count = 0;
		this.porn_count = 0;
		this.noresponse_count = 0;
		this.private_count = 0;
		this.replurker_count = 0;
		this.replurker_list = [];
		this.favourite_count = 0;
		this.favourite_list = [];
		this.response_count = 0;
		this.responded_count = 0;
		this.responded_other_count = 0;
		this.responded_other_list = [];
		this.plurks_count = 0;
		this.id = 0;
		this.next = next;
		this.randomcolors = [];

		this.next.querySelector("#statistics").innerHTML = '<div class="stats"></div>';
		this.el = this.next.querySelector("#statistics .stats");

		// Obverse when element is added to DOM
		var observer = new MutationObserver((mutationsList) => {
			mutationsList.forEach(mutation => {
				mutation.addedNodes.forEach(el => {
					this.afterDraw(el, this.next);
				});
			});
		});
		observer.observe(this.el, {
			attributes: true,
			childList: true,
			subtree: false
		});
	},
	listCount: function(list, collection) {
		if(collection.length > 0) {
			collection.forEach(value => {
				var index = list.findIndex(el => el.id == value)

				if(index < 0) list.push({ id: value, count: 1});
				else list[index].count++;
			});
		}

		return list;
	},
	title: function(text) {
		this.el.insertAdjacentHTML('beforeend', '<h3><span>'+ text + '</span><span class="line"><i/></span</h3>');
	},
	afterDraw: function(el, next) {
		if(hasClass(el, 'wrap')) {
			var color = new colors();
			var anim = el.children;

			gsap.set(anim, {
				background: 'linear-gradient(5deg, ' + color.getRandomColor() + ' 0%, ' + color.getRandomColor() + ' 100%)'
			});

			gsap.fromTo(anim, {
				opacity: 0
			}, {
				opacity: 1,
				duration: 1,
				ease: "power3.out"
			}, 0);

			// Scroll animation wrap section
			scroll.push(function(tl) {
				tl.fromTo(anim, {
					y: window.innerHeight * 1/5,
				}, {
					y: 0,
					ease: "ease.out"
				}, 0);
				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: el,
					scroller: next,
					start: "0 100%-=100px",
					end: "100px 100%-=100px",
					animation: tl,
					scrub: 1
				});
			});
			scroll.push(function(tl) {
				if (el.querySelector(".big")) {
					var number = Number(el.querySelector(".big").textContent);
					if(number > 0) {
						var load = { progress: 0 };
						var duration = 1;
						if(number >= 500 && number < 1000) duration = 2;
						else if(number >= 1000 && number < 99999) duration = 3;
						else if(number >= 99999) duration = 4;
						tl.to(load, {
							progress: number,
							snap: "progress",
							ease: "power3.out",
							duration: duration,
							onUpdate: function() {
								el.querySelector(".big").textContent = plural(load.progress);
							}
						}, 0);
					}
				}

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: el,
					scroller: next,
					start: "0 100%-=100px",
					end: "100px 100%-=100px",
					animation: tl,
					toggleActions: "play none none none"
				});
			});
		} else {
			// Scroll animation title section
			scroll.push(function(tl) {
				tl.fromTo(el.children, {
					opacity: 0
				}, {
					opacity: 1,
					ease: "ease.out"
				}, 0);
				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: el,
					scroller: next,
					start: "50% 100%-=100px",
					end: "50% 100%-=100px",
					animation: tl,
					toggleActions: "play none none none"
				});
			});
			scroll.push(function(tl) {
				tl.fromTo(el.children, {
					y: window.innerHeight * 1/6
				}, {
					y: 0,
					ease: "ease.out"
				}, 0);
				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: el,
					scroller: next,
					start: "50% 100%-=100px",
					end: "50% 100%-=100px",
					animation: tl,
					scrub: 1
				});
			});
			// Scroll animation line section
			scroll.push(function(tl) {
				tl.fromTo(el.querySelectorAll("i"), {
					x: "-100%"
				}, {
					x: "0%",
					ease: "ease.out"
				}, 0);
				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: el,
					scroller: next,
					start: "100% 100%",
					end: "100% 0",
					animation: tl,
					scrub: 1
				});
			});
		}

		scroll.refresh();
	},
	wrapper: function(style, text, background = "") {
		return '<div class="wrap ' + style + '"><div class="anim" style="background-images:url(' + background + ')">' + text + '</div></div>';
	},
	draw: function(style, number, text, background) {
		if(typeof number == "string" || (typeof number == "number" && number > 0)) {
			this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '\
				<p>\
					<span class="big">' + number + '</span>\
					<span class="text">' + text + '</span>\
				</p>\
			'), background);
		}
	},
	drawDiv: function(style, text) {
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '\
			<div class="text">' + text + '</div>\
		'));
	},
	drawGraph: function(style, number, text) {
		if (typeof number == "string" || (typeof number == "number" && number > 0)) {
			this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '\
				<p>\
					<span class="graph"><i style="height:' + number + '%;"></i></span>\
					<span>' + text + '</span>\
				</p>\
			'));
		}
	},
	drawImage: function(style, image, link, title, text, badge) {
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '\
			<a href="' + link + '" target="_BLANK">\
				<span class="big">' + badge + '</span>\
				<span><img src="' + image + '" /></span>\
				<span>' + text + '</span>\
				<span class="title">' + title + '</span>\
			</a>\
		'));
	},
	drawHTML: function(style, title, html) {
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '\
			<div>\
				<div class="htmlcontent">' + html + '</div>\
				<div class="title">' + title + '</div>\
			</div>\
		'));
	},
	drawLink: function(style, link, title, text, badge) {
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '\
			<a href="' + link + '" target="_BLANK">\
				<span class="big">' + badge + '</span>\
				<span>' + text + '</span>\
				<span class="title">' + title + '</span>\
			</a>\
		'));
	},
	drawPost: function(style, id, title, text, badge) {
		var url = ""
		if(id) url = 'https://plurk.com/p/' + id.toString(36);
		this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '\
			<div>\
				<a href="' + url + '" class="link" target="_BLANK">\
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">\
						<path id="right" d="M19.188,12.001c0,1.1-0.891,2.015-1.988,2.015l-4.195-0.015C13.543,15.089,13.968,16,15.002,16h3C19.658,16,21,13.657,21,12s-1.342-4-2.998-4h-3c-1.034,0-1.459,0.911-1.998,1.999l4.195-0.015C18.297,9.984,19.188,10.901,19.188,12.001z"/>\
						<path id="center" d="M8,12c0,0.535,0.42,1,0.938,1h6.109c0.518,0,0.938-0.465,0.938-1c0-0.534-0.42-1-0.938-1H8.938C8.42,11,8,11.466,8,12z"/>\
						<path id="left" d="M4.816,11.999c0-1.1,0.891-2.015,1.988-2.015L11,9.999C10.461,8.911,10.036,8,9.002,8h-3c-1.656,0-2.998,2.343-2.998,4s1.342,4,2.998,4h3c1.034,0,1.459-0.911,1.998-1.999l-4.195,0.015C5.707,14.016,4.816,13.099,4.816,11.999z"/>\
					</svg>\
				</a>\
				<span class="big">' + badge + '</span>\
				<p class="post">' + text + '</p>\
				<span class="title">' + title + '</span>\
			</div>\
		'));
	},
	drawUserList: async function(style, title, list) {
		var html = "";
		var max = 5;
		
		for(var index = 0; index < max; index++) {
			var value = list[index];
			if(value) {
				var friend = await friends.find(value.id);
				if (friend) {
					var plurker = new plurkerElement(value.id, friend, plurker => {
						plurker.avatar = new span('avatar', '<img src="' + friends.getAvatar(plurker.user_id) + '" />');
						plurker.name = new span('name', "@" + plurker.user.nick_name);
						plurker.counts = new span('count', value.count);
						plurker.el.appendChild(plurker.avatar.el);
						plurker.el.appendChild(plurker.name.el);
						plurker.el.appendChild(plurker.counts.el);
						plurker.el.setAttribute("href", 'https://plurk.com/' + plurker.user.nick_name);
					});
					plurker.create();
					html += plurker.el.outerHTML;
				} else {
					max++;
				}
			}
		}
		this.drawHTML(style, title, html);
	},
	attach: function(charttitle, node, max) {
		var that = this;
		var id = node.id;
		var chart;
		var title;
		var text;
		var anim;
		var wrapper;

		var opacity = 0;
		var position = max;
		var zIndex = 0;
		var hidden = true;

		if(node.position <= max){
			hidden = false;
			zIndex = position = (node.position - 1);
			opacity = 1;
		}

		// Create the box
		if(!that.next.querySelector("." + id)) {
			chart = document.createElement('div');
			chart.setAttribute('class', 'chart');

			title = document.createElement('div');
			title.setAttribute('class', 'title');
			title.innerHTML = charttitle;

			text = document.createElement('div');
			text.setAttribute('class', 'text');
			text.appendChild(chart);
			text.appendChild(title);

			anim = document.createElement('div');
			anim.setAttribute('class', 'anim');
			anim.appendChild(text);

			wrapper = document.createElement('div');
			wrapper.setAttribute('class', 'wrap ' + id);
			wrapper.appendChild(anim);

			that.el.insertAdjacentElement("beforeend", wrapper);
		}

		// Add  element
		if(!hidden && !node.attached) {
			var maxTop = max / (max - 1) * 100;

			node.insertTo(that.el.querySelector("." + id + ' .chart'));

			gsap.set(node.el, {
				top: maxTop + "%",
				opacity: 0,
				zIndex: 0,
			});
		}
		// Update position
		if(!hidden || !node.hidden) {
			var currentTop = position / (max - 1) * 100;

			gsap.killTweensOf(node.el);
			gsap.to(node.el, {
				top: currentTop + "%",
				opacity: opacity,
				zIndex: zIndex,
				duration: .5,
				ease: "power3.out",
				onComplete: function() {
					if(hidden) {
						node.destroy();
					}
				}
			});
			node.hidden = hidden;
		}

		node.update();
	},
	drawAll: async function() {
		var response_percentage = Math.round((this.plurks_count - this.noresponse_count) / this.plurks_count * 100);

		this.drawGraph('center', response_percentage, 'Around <i>' + response_percentage + '%</i> of your plurks got responses ' + ((response_percentage <= 50)? '😢' : '🤩'));
		this.draw('spansmall', this.plurks_count + " &rarr; " + this.response_count, 'You got <i>' + plural(this.response_count, 'response') + '</i> from <i>' + plural(this.plurks_count, 'plurk') + '</i>');

		if(this.favourite_count > 0) this.draw('spansmall', this.favourite_count, 'Your recieved <i>' + plural(this.favourite_count, 'love') + '</i>');
		if(this.replurker_count > 0) this.draw('spansmall', this.replurker_count, 'You got <i>' + plural(this.replurker_count, 'replurk') + '</i>');
		if(this.private_count > 0) this.draw('spansmall', this.private_count, 'You posted <i>' + plural(this.private_count, 'private plurk') + '</i>');
		if(this.whispers_count > 0) this.draw('spansmall', this.whispers_count, 'You posted <i>' + plural(this.whispers_count, 'whisper') + '</i>');
		if(this.porn_count > 0) this.draw('spansmall', this.porn_count, 'You posted <i>' + plural(this.porn_count, 'adult plurk') + '</i>');
		if(this.coins_count > 0) this.draw('spansmall', this.coins_count, 'You recieved <i>' + plural(this.coins_count, 'coin') + '</i>');

		if(this.favourite_list.length > 0) await this.drawUserList("avatar", "These Plurkers <i>Loved</i> Your Posts", this.favourite_list.sort(most.sort));
		if(this.replurker_list.length > 0) await this.drawUserList("avatar", "These Plurkers likes to <i>Replurked</i> Your Posts", this.replurker_list.sort(most.sort));
	}
};

/*
	Most statistics object renderer
*/
var most = {
	sort: function(a, b) {
		return b.count - a.count;
	},
	// Find and count all based on regex
	findregex: function(regex, replace, content, storage) {
		var result = content.match(regex);

		for(index in result) {
			var value = replace(result[index]);
			var idx = storage.findIndex(el => el.value == value);

			if (idx < 0) {
				storage.push({
					id: value,
					value: value,
					count: 1
				});
			} else {
				storage[idx].count++;
			}
		}

		return result;
	},
	init: function() {
		this.responders.data = [];
		this.mentions.data = [];
		this.mentions.dataAll = [];
		this.myemoticons.data = [];
		this.hashtags.data = [];
		this.links.links = [];
		this.links.pics = [];
		this.types.words = 0;
		this.types.chars = 0;
	},
	countAll: async function(data) {
		// Find and count all my emoticons from my post
		if(data.user_id == me.id) this.myemoticons.count(data.content);
		// Find and count all mentions from my post
		await this.mentions.count(data.content_raw);
		// Find and count all hashtags from my post
		if(data.user_id == me.id) this.hashtags.count(data.content);
		// Find and count all links and pictures post from my post
		if(data.user_id == me.id) this.links.count(data.content);
		// Find and count characther and words from my post
		if(data.user_id == me.id) this.types.count(data.content_raw);
	},
	responders: {
		data: [],
		count: async function(response) {
			var index = this.data.findIndex(function(el) {
				return el.user_id == response.user_id;
			});

			if (index < 0) {
				var user = await friends.find(response.user_id);
				this.data.push(new plurkerElement('mostresponders', user));
			} else {
				this.data[index].count++;
			}
			this.data.sort(most.sort);

			// Update top 5
			var index = 1;
			for (var i = 0; i < this.data.length; i++) {
				this.data[i].position = this.data.length;
				if(this.data[i].user_id != me.id && this.data[i].user_id != 99999) {
					this.data[i].position = index++;
					statistics.attach('<i>Top Responders</i><strong>of Your Timeline</strong>', this.data[i], 5);
				}
			}
		},
		draw: function() {;
			var index = 0;
			if(this.data.length > 0) {
				while((this.data[index].user_id == me.id || this.data[index].user_id == 99999) && index < this.data.length) index++;
				if(this.data[index]) statistics.drawImage("avatar", friends.getAvatar(this.data[index].user_id), 'https://plurk.com/' + this.data[index].user.nick_name, '<i>Most Responder</i>', this.data[index].user.display_name, this.data[index].count);
			}
		}
	},
	mentions: {
		data: [],
		dataAll: [],
		count: async function(content) {
			var result = most.findregex(/\@(\w{1,30})[\ |\:]/g, value => value.replace(/\@|\ |\:/g, ''), content, this.data);
			var max = 5;
			var index = 1;

			if(result) {
				// Update top 5
				this.data.sort(most.sort);
				for(var idx = 0; idx < this.data.length; idx++) {					
					this.data[idx].position = this.data.length;

					if(index <= max) {
						var user = await friends.findByUsername(this.data[idx].value);

						if(this.data[idx].el == undefined) {
							this.data[idx] = new plurkerElement('mostmentionedbyme', user, plurker => {
								plurker.avatar = new span('avatar', '<img src="' + friends.getAvatar(plurker.user_id) + '" />');		
								plurker.name = new span('name', "@" + plurker.nick_name);
								plurker.counts = new span('count', plurker.count);
								plurker.el.appendChild(plurker.avatar.el);
								plurker.el.appendChild(plurker.name.el);
								plurker.el.appendChild(plurker.counts.el);
								plurker.el.setAttribute("href", 'https://plurk.com/' + plurker.nick_name);
							});
						}

						if(user.id != me.id && user.id != 99999) {
							this.data[idx].position = index++;
							statistics.attach('<i>Most Mentioned</i><strong>in Your Timeline</strong>', this.data[idx], max);
						}
					}

					if(this.data[idx].el) statistics.attach('<i>Most Mentioned</i><strong>in Your Timeline</strong>', this.data[idx], max);
				}
			}
		},
		draw: function() {			
			var index = 0;
			if(this.data.length > 0) {
				while((this.data[index].user_id == me.id || this.data[index].user_id == 99999) && index < this.data.length) index++;
				if(this.data[index]) statistics.drawImage("avatar", friends.getAvatarByUsername(this.data[index].value), 'https://plurk.com/' + this.data[index].value, '<i>Most Mentioned</i> by You', "@" + this.data[index].value, this.data[index].count);
			}
		}
	},
	myemoticons: {
		data: [],
		count: function(content) {
			most.findregex(/emoticon_my\" src=\"(.*?)\"/g, function(value) {
				return value.replace(/emoticon_my\" src=\"|\"/gi,'');
			}, content, this.data);
		},
		draw: function() {
			var html = "";
			this.data.sort(most.sort);
			for(var i = 0; i < 10; i++) {
				if(this.data[i])
					html += '<div><img src="' + this.data[i].value + '" /> <span class="count">' + this.data[i].count + '</span></div>';
			}
			if(html != "") statistics.drawHTML("span2 grid emoticons", '<i>Most Used My Emoticons</i>', html);
		}
	},
	hashtags: {
		data: [],
		count: function(content) {
			most.findregex(/hashtag\"\>(.*?)\</g, function(value) {
				return value.replace(/hashtag\"\>\#|\.\<|\</g, '');
			}, content, this.data);
		},
		draw: function() {
			var html = "";
			this.data.sort(most.sort);
			for (var i = 0; i < 10; i++) {
				if(this.data[i])
					html += '<div><a href="https://plurk.com/search?q=' + this.data[i].value + '" target="_BLANK" />#' + this.data[i].value + '</a> <span class="count">' + this.data[i].count + '</span></div>';
			}
			if(html != "") statistics.drawHTML("span2 grid hashtags", '<i>Most Used Hashtags</i>', html);
		}
	},
	links: {
		links: [],
		pics:[],
		count: function(content) {
			var result = content.match(/href\=\"(.*?)\"\ class=\"(.*?)\"\ rel/g);
			if(result) for(var data of result) {
				if(data.includes("pictureservices")) this.pics.push(data);
				else this.links.push(data);
			}
		},
		draw: function() {
			if(this.links.length > 0) statistics.draw('spansmall', this.links.length, 'You shared <i>' + plural(this.links.length, 'link') + '</i>');
			if(this.pics.length > 0) statistics.draw('spansmall', this.pics.length, 'You shared <i>' + plural(this.pics.length, 'picture') + '</i>');
		}
	},
	types: {
		words: 0,
		chars: 0,
		count: function(content) {
			var words = content.split(" ");

			this.chars += content.length;
			this.words += words.length;
		},
		draw: function() {
			if(this.chars > 0) statistics.draw('span2 mediumnumber', this.chars, 'You typed more than  <i>' + pluralinwords(this.chars, 'character') + '</i>, more than <i>' + pluralinwords(this.words, 'word') + '</i> 🥺');
		}
	},
	responses: {
		sort: function(a, b) {
			return b.response_count - a.response_count;
		},
		draw: function(data) {
			data.sort(this.sort);
			for(index in data){
				var value = data[index];
				if(value.owner_id == me.id && value.plurk_type != 3 && value.response_count > 0) {
					statistics.drawPost('postcontent span2', value.plurk_id, '<i>Your Most Responded</i> ' + datediff(value.posted), value.content, value.response_count);						
					return;
				}
			}
		}
	},
	replurk: {
		sort: function(a, b) {
			return b.replurkers_count - a.replurkers_count;
		},
		draw: function(data) {
			data.sort(this.sort);
			for(index in data){
				var value = data[index];
				if(value.owner_id == me.id && value.plurk_type != 3 && value.replurkers_count > 0) {
					statistics.drawPost('postcontent span2', value.plurk_id, '<i>Your Most Replurked</i> ' + datediff(value.posted), value.content, value.replurkers_count);
					return;
				}
			}
		}
	},
	favorite: {
		sort: function(a, b) {
			return b.favorite_count - a.favorite_count;
		},
		draw: function(data) {
			data.sort(this.sort);
			for(index in data){
				var value = data[index];
				if(value.owner_id == me.id && value.plurk_type != 3 && value.favorite_count > 0) {
					statistics.drawPost('postcontent span2', value.plurk_id, '<i>Your Most Favorited</i> ' + datediff(value.posted), value.content, value.favorite_count);
					return;
				}
			}
		}
	}
};

/*
	Inactive plurker object
*/
var inactive = {
	draw: function(data, year) {
		statistics.draw('inactive', year + " &#8617;", 'You\'ve been inactive since ' + year + ' <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
		statistics.drawPost('postcontent span2', data.plurk_id, '<i>Your last Plurk</i> ' + datediff(data.posted), data.content, data.response_count);
	},
	empty: function() {
		statistics.draw('inactive', '-', 'You didn\'t post anything at this year <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
	}
}

/*
	Loading object
*/
var loading = {
	count: 0,
	prev_count: 0,
	counts: -1,
	clean: false,
	next: document.createElement('div'),
	isComplete: function() { return this.count == this.counts }, 
	init: function(next) {
		this.count = 0;
		this.prev_count = 0;
		this.counts = -1;
		this.clean = false;
		this.next = next;
	},
	draw: function(item) {
		return new Promise(resolve => {
			this.prev_count = item;

			if(!this.next.querySelector("#statistics .loading")) {
				statistics.draw("loading", item + "%", "<i class='month'>Data from " + this.year + "</i> 2 of 2. Loading all responses. <small>You can resume later by refreshing the page, as long as you didn't close your browser tab.</small>");
			}

			// Animate loading
			var load = { progress: this.prev_count };
			gsap.to(load, {
				progress: Math.round(item),
				snap: "progress",
				ease: "linear",
				duration: .5,
				onUpdate: () => {
					var el = this.next.querySelector("#statistics .loading .big");
					if(el) el.innerHTML = load.progress + "%";
				},
				onComplete: async () => {
					if(this.clean) await this.done();
					resolve();
				}
			});
		});
	},
	loop: async function(length) {
		this.clean = true;
		this.counts = length;
		await this.draw(0);
	},
	update: async function(month, value) {
		var el = this.next.querySelector("#statistics .loading .month");
		if(month && el) el.innerHTML = month;

		if (this.counts >= 0) {
			this.count = value ? value : this.count + 1;
			await this.draw(Math.round(100 * (this.count / this.counts)));
		}
	},
	fakeupdate: async function() {
		if(this.counts >= 0) {
			this.count++;
			if (this.count >= (this.counts - 10)) this.count = (this.counts - 10);
			await this.draw(100 * (this.count / this.counts));
		}
	},
	forcedone: async function() {
		this.count = this.counts;
		await this.draw(100);
	},
	done: function() {
		return new Promise(resolve => {
			if(this.isComplete()) {
				var el = this.next.querySelector("#statistics .loading");

				this.clean = false;
				gsap.to(el, {
					opacity: 0,
					duration: .5,
					ease: "expo.in",
					onComplete: () => {
						el.remove();
						scroll.refresh();
						resolve();
					}
				})
			}
		});
	}
}


class replurk {
	constructor(year) {
		// Which year?
		this.year = year;
		this.startDate = this.year + '-10-29T09:00:00';
		this.endDate = new Date((this.year - 1) + '-10-29T09:00:00');
		this.days = 60*60*24*1000;
		this.fulldays = 365;

		// Draw in which element?
		this.next = document.createElement('div');

		// Plurks array
		this.plurks = [];
	}

	// Browser color
	browserColor(state, duration, ease) {
		if(state == "green") {
			browserColorDark = "#0d4f03";
			browserColorLight = "#60e670";
		} else if (state == "yellow") {
			browserColorDark =  "#705f02";
			browserColorLight = "#FFD700";
		} else {
			browserColorDark =  "#000000";
			browserColorLight = "#FFFFFF";
		}
		toggleDarkMode(duration, ease);
	}

	// Show/hide Animations
	// Login Pages
	showLoginPage(tl) {
		var next = this.next;

		this.browserColor("green", 1);
		tl.fromTo(next.querySelectorAll("#permission"), {
			position: "fixed",
			display: "",
			opacity: 0,
			top: 0
		}, {
			opacity: 1,
			duration: 1,
			ease: "power3.in"
		});
		tl.fromTo(next.querySelectorAll("#permission .bgtext *"), {
			display: "",
			y: 200,
			opacity: 0,
		}, {
			y: 0,
			opacity: 1,
			stagger: .2,
			duration: 1,
			ease: "power3.out",
			onComplete: () => {
				gsap.set(next.querySelectorAll("#permission"), {
					position: "",
					top: ""
				});
			}
		}, ">-.5");

		return tl;
	}
	hideLoginPage(tl) {
		var next = this.next;

		tl.set(next.querySelectorAll("#permission"), {
			position: "fixed",
			top: 0,
		});
		tl.fromTo(next.querySelectorAll("#permission .bgtext *, #permission form"), {
			y: 0,
			opacity: 1,
		}, {
			y: 200,
			opacity: 0,
			stagger: {
				from: "end",
				amount: .2
			},
			duration: 1,
			ease: "power3.in",
			onComplete: () => {
				this.browserColor("yellow");
			}
		});
		tl.fromTo(next.querySelectorAll("#permission"), {
			opacity: 1
		}, {
			opacity: 0,
			duration: 1,
			ease: "power3.in",
			onComplete: () => {
				gsap.set(next.querySelectorAll("#permission"), {
					position: "",
					display: "none",
					top: ""
				}, ">");
			}
		}, ">-.2");

		return tl;
	}
	// Statistic Pages
	showStatisticPages(tl) {
		var next = this.next;

		tl.fromTo(next.querySelectorAll("#hello"), {
			display: "",
			opacity: 0
		}, {
			opacity: 1,
			ease: "power3.in",
			duration: 1,
			onStart: () => {
				this.browserColor("green", .5);
			}
		}, ">-.25");
		tl.fromTo(next.querySelectorAll("#hello .bgtext > *"), {
			display: "",
			opacity: 0,
			y: 200
		}, {
			opacity: 1,
			y: 0,
			duration: 1,
			stagger: .2,
			ease: "power3.out"
		}, ">-.5");
		tl.fromTo(next.querySelectorAll(" #hello .thumbs, #hello .text > *, #hello .arrow-big"), {
			display: "",
			opacity: 0,
			y: 200
		}, {
			opacity: 1,
			y: 0,
			duration: 1,
			stagger: .2,
			ease: "power3.out"
		}, ">-.5");
		tl.fromTo(next.querySelectorAll(".grant:not(#hello)"), {
			display: "",
			opacity: 0
		}, {
			opacity: 1,
			duration: .5
		}, ">-.5");

		return tl;
	}
	hideStatisticPages(tl) {
		var next = this.next;

		tl = animate.top(tl);
		tl.fromTo(next.querySelectorAll("#logout, #hello .bgtext > *, #hello .thumbs, #hello .text > *, #hello .arrow-big"), {
			opacity: 1,
			y: 0
		}, {
			opacity: 0,
			y: 200,
			duration: 1,
			stagger: {
				from: "end",
				amount: .2
			},
			ease: "power3.in"
		}, ">-.2");
		tl.set(next.querySelectorAll(".grant:not(#hello)"), {
			opacity: 0
		}, ">-.5");
		tl.fromTo(next.querySelectorAll("#hello"), {
			opacity: 1
		}, {
			opacity: 0,
			duration: 1,
			ease: "power3.in",
			onComplete: () => {
				gsap.set(next.querySelectorAll(".grant"), { display: "none" });
			}
		}, ">-.5");

		return tl;
	}

	// Login messages
	message(message, quick) {
		var next = this.next;

		var loginmessage = next.querySelector("#login-message");

		if(quick) {
			loginmessage.innerHTML = message;
		} else {
			gsap.to(loginmessage, {
				opacity: 0,
				onComplete: function() {
					loginmessage.innerHTML = message;
					gsap.to(loginmessage, {
						opacity: 1
					});
				}
			});
		}
	}

	// Logout
	requestLogout() {
		var tl = gsap.timeline();

		api.abort();

		// Hide statistic pages
		tl = this.hideStatisticPages(tl);
		tl.set(this.next, {
			onComplete: async() => {
				await api.call("?fetch=logout");
				api.clear();
				this.login();
			}
		});
	}

	// Request token
	async requestToken(text) {
		var next = this.next;
		var tokenlink = next.querySelector("#tokenurl");
		tokenlink.textContent = "Connecting Plurk...";

		var tl = gsap.timeline();
		tl.fromTo(next.querySelectorAll("#permission form"), {
			display: "",
			y: 200,
			opacity: 0,
		}, {
			y: 0,
			opacity: 1,
			duration: 1,
			ease: "power3.out"
		}, 1);
		tl.fromTo(next.querySelectorAll("#permission h1, #permission li"), {
			display: "",
			y: 50,
			opacity: 0,
		}, {
			y: 0,
			opacity: 1,
			stagger: .1,
			duration: 1,
			ease: "power3.out"
		}, 1);

		var data = await api.call("?request=token");
		if(data) {
			if(text) {
				message(text);
			} else  {
				tokenlink.textContent = "Open Authorization Page";
				tokenlink.setAttribute("href", data.message.url);
			}
		} else {
			message("Error when requesting verification from Plurk, please reload your browser again.");
		}

		if(!text) next.querySelector("#permission form").style.display = "none";
	}

	// Display current Plurker data
	displayPlurkerData(plurker, callback) {
		var next = this.next;
		var extra = "";

		// plurks_count
		var days = (plurker.anniversary.years * 365) + plurker.anniversary.days;
		var responses = Math.round(plurker.response_count / days);

		next.querySelector("#hello .thumbs").innerHTML = "<img src='" + plurker.avatar_big + "' />";
		next.querySelector("#hello .text").innerHTML = "<h1>Hello " + plurker.display_name + "</h1><p style='max-width: 500px; margin: 0 auto'>" + this.year + " have been a rough year for some of us, but hopefully RePlurk will cheer you up a bit</p>";

		// Draw statistic
		statistics.title('All Time');
		if(plurker.anniversary.years && plurker.anniversary.days) {
			statistics.draw('spansmall', plurker.anniversary.years, "You joined Plurk " + plural(plurker.anniversary.years, "year") + " and " + plural(plurker.anniversary.days, "day") + " ago 👏");
			statistics.draw('spansmall badges', plurker.badges.length, "You have <i>" + plural(plurker.badges.length, "badge") + "</i> right now");
			statistics.draw('spansmall', Math.round(plurker.plurks_count / days), "You posted around <i>" + plural(Math.round(plurker.plurks_count / days), "plurk") + " per day</i>");
			if (responses <= 24) extra = "That's almost 1 response every <i>" + plural(Math.round(24 / responses), "hour") + '</i>';
			else extra = "That's almost 1 response every <i>" + plural(Math.round(24 * 60 / responses), "minute") + '</i>';
			statistics.draw('', responses, "You responded around <i>" + plural(responses, "time") + "</i> per day. " + extra);
		} else {
			statistics.draw('', '-', "There is no data of you joining Plurk");
			statistics.draw('', plurker.badges.length, "But at least you have <i>" + plural(plurker.badges.length, "badge") + "</i> right now");
		}

		// Scroll animation hello section
		scroll.push(function(tl) {
			tl.fromTo(next.querySelectorAll("#hello .text, #hello .thumbs"), {
				y: 0
			}, {
				y: window.innerHeight * -3/4,
				ease: "linear",
				duration: 1
			}, 0);
			tl.fromTo(next.querySelectorAll("#hello .bgtext sup"), {
				y: 0,
				x: 0,
				rotation: 0
			}, {
				y: window.innerHeight * -1/4,
				x: window.innerHeight * -1/10,
				rotation: -10,
				ease: "linear",
				duration: 1
			}, 0);
			tl.fromTo(next.querySelectorAll("#hello .bgtext sub"), {
				y: 0,
				x: 0,
				rotation: 0
			}, {
				y: window.innerHeight * -1/4,
				x: window.innerHeight * 1/10,
				rotation: 10,
				ease: "linear",
				duration: 1
			}, 0);
			tl.fromTo(next.querySelectorAll("#hello .arrow-big"), {
				y: 0,
				opacity: 1
			}, {
				y: window.innerHeight * 1/4,
				opacity: 0,
				ease: "linear",
				duration: .25
			}, 0);
			tl.fromTo(next.querySelectorAll("#hello .animate"), {
				y: 0
			}, {
				y: window.innerHeight * -1/2,
				ease: "power1.out",
				duration: 1
			}, 0);
			return tl;
		}, function(tl) {
			return ScrollTrigger.create({
				trigger: next.querySelectorAll("#hello"),
				scroller: next,
				start: "0 0",
				end: "100% 0",
				animation: tl,
				scrub: true
			});
		});
		scroll.refresh();

		if(callback) callback();
	}
	// Display statistics
	async displayStatistics() {
		statistics.title('This Year');
		statistics.draw("loading", "", "<i class='month'>Data from December</i>1 of 2. Loading your " + this.year + " plurks. It can take up to 1 minute.");

		loading.init(this.next);
		loading.loop(this.fulldays);

		// Load loop timeline
		var getTimeline = async(offset) => {
			offset = (!offset) ? "" : "&offset=" + offset;

			var data = await api.call("?fetch=plurk" + offset)
			if(data) {
				friends.add(data.message.plurk_users);
				this.plurks = this.plurks.concat(data.message.plurks);

				if(data.message.plurks.length > 0) {
					var lastposted = new Date(this.plurks[this.plurks.length - 1].posted);

					if(lastposted >= this.endDate) {
						loading.update("Data from " + monthNames[lastposted.getMonth()] + " " + lastposted.getFullYear(), this.fulldays - Math.floor((lastposted - this.endDate) / this.days));

						// Load next plurks
						await getTimeline(data.message.offset);
					} else {
						while(lastposted < this.endDate && this.plurks.length > 1) {
							this.plurks.pop();
							lastposted = new Date(this.plurks[this.plurks.length - 1].posted);
						}
						await loading.forcedone();
					}
				} else {
					await loading.forcedone();
				}
			}
		}
		await getTimeline(this.startDate);

		// When loading done
		if (this.plurks.length > 1) {			
			// Draw some of the most plurk
			most.responses.draw(this.plurks);
			most.replurk.draw(this.plurks);
			most.favorite.draw(this.plurks);

			// Count user statistics
			statistics.plurks_count = 0;
			this.plurks.forEach(plurk => {
				// Calculate the statistics
				if (plurk.responded) statistics.responded_count++;
				if (plurk.owner_id == me.id) {
					statistics.plurks_count++;
					statistics.replurker_count += plurk.replurkers.length;
					statistics.replurker_list = statistics.listCount(statistics.replurker_list, plurk.replurkers);
					statistics.favourite_count += plurk.favorers.length;
					statistics.favourite_list = statistics.listCount(statistics.favourite_list, plurk.favorers);
					if (plurk.anonymous) statistics.whispers_count++;
					if (plurk.coins) statistics.coins_count += plurk.coins;
					if (plurk.porn) statistics.porn_count++;
					if (!plurk.response_count) statistics.noresponse_count++;
					if (plurk.plurk_type == 3) statistics.private_count++;
					statistics.response_count += plurk.response_count;
				} else if (plurk.responded) statistics.responded_other_count++;
			});

			// Sort based on date
			this.plurks.sort((a, b) => new Date(b.posted) - new Date(a.posted));

			// Draw statistics
			await statistics.drawAll();

			// Display extended statistics
			this.displayExtendedStatistics();
		} else {
			if(this.plurks[0]) {
				var date = new Date(plurk[0].posted);
				inactive.draw(plurk[0], date.getFullYear());
			}
			else inactive.empty();
		}
	}
	// Display extended statistics
	async displayExtendedStatistics() {
		// Deeper user statistics
		statistics.title('Dig Deeper');
		// Load each post responses and calculate statistics
		loading.init(this.next);
		// Start loading
		loading.loop(this.plurks.length);

		// Get the responses for each plurks in parallel
		for(var plurk of this.plurks) {
			var date = new Date(plurk.posted);
			loading.update("Data from " + monthNames[date.getMonth()] + " " + date.getFullYear());

			// Count all
			await most.countAll(plurk);

			// Count responses
			if(plurk.response_count > 0) {
				var result = await api.call("?fetch=response&plurk_ids=" + plurk.plurk_id);
				if(result) for(var message of result.message) {
					// Attach responses to the post
					var index = this.plurks.findIndex(el => el.plurk_id == plurk.plurk_id);
					if(index) this.plurks[index].response = plurk;

					// Add friends from response lists
					friends.add(message.friends);

					// Count the rest of statistics
					for(var response of message.responses) {
						// Find and count all responders
						await most.responders.count(response);
						// Count all
						await most.countAll(response);
					}
				}
			}
		}

		// Draw Results
		// Display How Many Words-Characters
		most.types.draw();
		// Display How Many Links and Pictures
		most.links.draw();
		// Display Most Responder
		most.responders.draw();
		// Display Most Mentioned by me
		most.mentions.draw();
		// Display Most hashtags by me
		most.hashtags.draw();
		// Display Most My Emoticons
		most.myemoticons.draw();
	}

	// Scroll Animation
	scrollAnimate = {
		credits: (tl) => {
			var next = this.next;

			tl.fromTo(next.querySelectorAll("#credits .like, #credits .noaffiliation, #credits .made"), {
				y: window.innerHeight * 1/8
			}, {
				y: 0,
				ease: "linear",
				duration: 2
			}, 0);
			tl.fromTo(next.querySelectorAll("#credits .like, #credits .noaffiliation"), {
				opacity: 0
			}, {
				opacity: 1,
				stagger: {
					from: 'end',
					amount: .1
				},
				duration: 1,
				ease: "power3.in"
			}, 0);
			tl.fromTo(next.querySelectorAll("#credits .made"), {
				opacity: 0
			}, {
				opacity: 1,
				duration: 1,
				ease: "power3.in"
			}, .3);

			return tl;
		},
		statistics: () => {
			var next = this.next;

			// Scroll animate statistics
			scroll.push((tl) => {
				tl = this.scrollAnimate.credits(tl);
				return tl;
			}, (tl) => {
				return ScrollTrigger.create({
					trigger: next.querySelectorAll("#statistics"),
					scroller: next,
					start: "100%-=" + window.innerHeight + " 0",
					end: "100% 0",
					animation: tl,
					scrub: .5
				});
			});
		},
		permisions: () => {
			var next = this.next;

			// Scroll animation permission section
			scroll.push((tl) => {
				tl.fromTo(next.querySelectorAll("#permission form"), {
					y: 0
				}, {
					y: window.innerHeight * -3/4,
					ease: "linear"
				}, 0);
				tl.fromTo(next.querySelectorAll("#permission .bgtext sup"), {
					y: 0,
					x: 0,
					rotation: 0
				}, {
					y: window.innerHeight * -1/4,
					x: window.innerHeight * -1/10,
					rotation: -10,
					ease: "linear"
				}, 0);
				tl.fromTo(next.querySelectorAll("#permission .bgtext sub"), {
					y: 0,
					x: 0,
					rotation: 0
				}, {
					y: window.innerHeight * -1/4,
					x: window.innerHeight * 1/10,
					rotation: 10,
					ease: "linear"
				}, 0);
				return tl;
			}, (tl) => {
				return ScrollTrigger.create({
					trigger: next.querySelectorAll("#permission"),
					scroller: next,
					start: "0 0",
					end: "100% 0",
					animation: tl,
					scrub: .5
				});
			});
			scroll.push((tl) => {
				tl = this.scrollAnimate.credits(tl);
				return tl;
			}, (tl) => {
				return ScrollTrigger.create({
					trigger: next.querySelectorAll("#permission"),
					scroller: next,
					start: "0 0",
					end: "100% 0",
					animation: tl,
					scrub: .5
				});
			});
		},
		browserBar: (type) => {
			var next = this.next;

			// Scroll animate browser bar
			scroll.push((tl) => {
				tl.call(this.browserColor, ["green", .16, "linear"]);
				tl.to(next.querySelectorAll("#statistics"), {
					duration: type == "type1" ? 20 : 1,
					onUpdate: () => {
						this.browserColor(type == "type1" ? "" : "green", .16, "linear");
					}
				});
				tl.call(this.browserColor, ["yellow", .16, "linear"]);
				return tl;
			}, (tl) => {
				return ScrollTrigger.create({
					trigger: next.querySelectorAll("#statistics"),
					scroller: next,
					start: "0 0",
					end: "100% 0",
					animation: tl,
					scrub: true
				});
			});
		},
		menu: () => {
			var next = this.next;

			// Scroll animation menu and logout
			scroll.push((tl) => {
				return tl;
			}, (tl) => {
				return ScrollTrigger.create({
					trigger: 'main',
					scroller: next,
					start: "0 0",
					end: "100% 0",
					animation: tl,
					onUpdate: (update) => {
						var el1 = '.logo, .size, .lamp, .switch';
						var el2 = el1 + ", .logout";

						if (update.direction > 0) {
							gsap.killTweensOf(_qAll(el2));
							gsap.to(_qAll(el1), { y: -100, opacity: 0 });
							gsap.to(_qAll('.logout'), { y: 100, opacity: 0 });
						} else {
							gsap.to(_qAll(el2), { y: 0, opacity: 1 });
						}
					}
				});
			});
		}
	}

	// Check login status
	async login(callback) {
		var next = this.next;
		var scrollAnimate = this.scrollAnimate;

		me = { id: 0 };
		friends.init();
		statistics.init(next);
		most.init();
		this.plurks = [];

		scroll.destroy();

		window.scrollTo(0, 0);
		this.browserColor("yellow");

		// Scroll animation menu and logout
		this.scrollAnimate.menu();

		// Check is server have open session 
		var tl = gsap.timeline();
		var data = await api.call("?");
		if(data){
			me = data.message;

			this.displayPlurkerData(me, () => {
				tl = animate.top(tl);

				// Hide login page
				if (callback) next.querySelector("#permission").style.display = "none";
				else tl = this.hideLoginPage(tl);

				// Show statistic pages
				this.showStatisticPages(tl);

				// Add logout event
				next.querySelector("#logout").onclick = () => {
					this.requestLogout();
				}

				if(callback) callback();
			});

			// Scroll animate statistics
			scrollAnimate.statistics();
			// Scroll animate browser bar
			scrollAnimate.browserBar("type1");

			this.displayStatistics();
		} else {
			// Hide statistic pages
			if(callback) next.querySelectorAll(".grant").forEach(function(el) { el.style.display = "none"; });
			// Show login page
			this.showLoginPage(tl);
			// Request token
			this.requestToken();

			// Scroll animation permission section
			scrollAnimate.permisions();
			// Scroll animate browser bar
			scrollAnimate.browserBar("type2");

			ScrollTrigger.refresh();

			if(callback) callback();
		}
	}

	// Run the API call
	run(callback) {
		this.browserColor("yellow");

		// Run the login
		gsap.fromTo(this.next.querySelectorAll('#credits'), {
			opacity: 0
		}, {
			opacity: 1,
			duration: .5,
			ease: "power3.in",
			onComplete: async () => {
				this.browserColor("yellow", 0);
				this.login(callback);
			}
		});
	}
}

// Replurk page 2020
var replurk2020 = new replurk(2020);
var replurk2020view = {
	namespace: 'replurk2020',
	beforeEnter: function(data) {
		var next = data.next.container;

		next.querySelectorAll("#permission, .grant").forEach(function(el) {
			el.style.display = "none";
		});
	},
	afterEnter: function(data) {
		replurk2020.next = data.next.container;
		replurk2020.run(() => {
			this.async();
		});
	},
	beforeLeave: function(data) {
		gsap.killTweensOf(_qAll("header, .footer"));
	}
}

// Replurk page 2021
var replurk2021 = new replurk(2021);
var replurk2021view = {
	namespace: 'replurk2021',
	beforeEnter: function(data) {
		var next = data.next.container;

		next.querySelectorAll("#permission, .grant").forEach(function(el) {
			el.style.display = "none";
		});
	},
	afterEnter: function(data) {
		replurk2021.next = data.next.container;
		replurk2021.run(() => {
			this.async();
		});
	},
	beforeLeave: function(data) {
		gsap.killTweensOf(_qAll("header, .footer"));
	}
}
