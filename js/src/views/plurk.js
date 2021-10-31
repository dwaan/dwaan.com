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
	init: function() {
		this.data = {};
	},
	add: function(new_friends) {
		Object.assign(this.data, new_friends);
	},
	find: function(user_id) {
		if(this.data && this.data[user_id]) {
			return this.data[user_id];
		}
		return false;
	},
	findByUsername: function(nick_name) {
		var user_id = false;

		for(var items in this.data) {
			if(this.data[items].nick_name.toLowerCase() == nick_name.toLowerCase()) {
				user_id = items;
				break;
			}
		}

		return user_id ? this.data[user_id] : false;
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

		for(var items in this.data) {
			if(this.data[items].nick_name.toLowerCase() == user_name.toLowerCase()) {
				user_id = items;
				break;
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
	Statistics plurker object
*/
var statistics = {
	el: false,
	whispers_count: 0,
	coins_count: 0,
	porn_count: 0,
	noresponse_count: 0,
	private_count: 0,
	response_count: 0,
	post_count: 0,
	plurk_count: 0,
	delay: 0,
	id: 0,
	style: 0,
	next: document.createElement('div'),
	randomcolors: [],
	init: function(next) {
		var that = this;

		that.el = false;
		that.whispers_count = 0;
		that.coins_count = 0;
		that.porn_count = 0;
		that.noresponse_count = 0;
		that.private_count = 0;
		that.response_count = 0;
		that.post_count = 0;
		that.plurk_count = 0;
		that.delay = 0;
		that.id = 0;
		that.style = 0;
		that.next = next;
		that.randomcolors = [];

		that.next.querySelector("#statistics").innerHTML = '<div class="stats"></div>';
		that.el = that.next.querySelector("#statistics .stats");

		// Obverse when element is added to DOM
		var observer = new MutationObserver(function (mutationsList) {
			mutationsList.forEach(function(mutation) {
				mutation.addedNodes.forEach(function(el) {
					that.afterDraw(el, that.next);
				});
			});
		});
		observer.observe(that.el, {
			attributes: true,
			childList: true,
			subtree: false
		});
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
		ScrollTrigger.refresh();
	},
	wrapper: function(style, text) {
		return '<div class="wrap ' + style + '"><div class="anim">' + text + '</div></div>';
	},
	draw: function(style, number, text) {
		if(typeof number == "string" || (typeof number == "number" && number > 0)) {
			this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '\
				<p>\
					<span class="big">' + number + '</span>\
					<span class="text">' + text + '</span>\
				</p>\
			'));
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
						<path id="right" d="M19.188,12.001c0,1.1-0.891,2.015-1.988,2.015l-4.195-0.015C13.543,15.089,13.968,16,15.002,16h3    C19.658,16,21,13.657,21,12s-1.342-4-2.998-4h-3c-1.034,0-1.459,0.911-1.998,1.999l4.195-0.015    C18.297,9.984,19.188,10.901,19.188,12.001z"/>\
						<path id="center" d="M8,12c0,0.535,0.42,1,0.938,1h6.109c0.518,0,0.938-0.465,0.938-1c0-0.534-0.42-1-0.938-1H8.938    C8.42,11,8,11.466,8,12z"/>\
						<path id="left" d="M4.816,11.999c0-1.1,0.891-2.015,1.988-2.015L11,9.999C10.461,8.911,10.036,8,9.002,8h-3    c-1.656,0-2.998,2.343-2.998,4s1.342,4,2.998,4h3c1.034,0,1.459-0.911,1.998-1.999l-4.195,0.015    C5.707,14.016,4.816,13.099,4.816,11.999z"/>\
					</svg>\
				</a>\
				<span class="big">' + badge + '</span>\
				<p class="post">' + text + '</p>\
				<span class="title">' + title + '</span>\
			</div>\
		'));
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
				ease: "power3.inOut",
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
	drawAll: function() {
		var noresponse_percentage = Math.round(this.noresponse_count / this.plurk_count * 100);
		this.draw('spansmall', this.plurk_count, 'You posted <i>' + plural(this.plurk_count, 'plurk') + '</i>');
		this.drawGraph('center', noresponse_percentage, plural(this.noresponse_count) + ' of ' + plural(this.plurk_count, 'plurk') + ' you posted have no response. That\'s around ' + noresponse_percentage + '% of your plurk ' + ((noresponse_percentage >= 50)? '😢' : '🤩'));
		this.draw('spansmall', this.response_count, 'You posted <i>' + plural(this.response_count, 'response') + '</i>');
		this.draw('spansmall', this.post_count, 'In total, you posted <i>' + plural(this.post_count, 'post') + '</i>, that\'s quite a lot 😮</span>');
		if(this.private_count > 0) this.draw('spansmall', this.private_count, 'You posted <i>' + plural(this.private_count, 'private plurk') + '</i>');
		if(this.whispers_count > 0) this.draw('spansmall', this.whispers_count, 'You posted <i>' + plural(this.whispers_count, 'whisper') + '</i>');
		if(this.porn_count > 0) this.draw('spansmall', this.porn_count, 'You posted <i>' + plural(this.porn_count, 'adult plurk') + '</i>');
		if(this.coins_count > 0) this.draw('spansmall', this.coins_count, 'You recieved <i>' + plural(this.coins_count, 'coin') + '</i>');
	}
};

/*
	Most statistics object
*/
var most = {
	sort: function(a, b) {
		return b.count - a.count;
	},
	// Find and count all based on regex
	findregex: function(regex, replace_function, content, thearray, custompush) {
		var result = content.match(regex);
		if(result) {
			result.forEach(function(value, index) {
				value = replace_function(value);
				index = thearray.findIndex(function(el) {
					return el.value == value;
				});
				if (index < 0) {
					if (custompush) {
						thearray.push(custompush(value, result));
					} else {
						thearray.push({
							id: value,
							value: value,
							count: 1
						});
					}
				} else {
					thearray[index].count++;
				}
			});
		}
	},
	init: function() {
		this.responders.data = [];
		this.myemoticons.data = [];
		this.mentions.data = [];
		this.hashtags.data = [];
	},
	responders: {
		data: [],
		elements: [],
		count: function(response) {
			var index = this.data.findIndex(function(el) {
				return el.user_id == response.user_id;
			});

			if (index < 0) {
				var user = friends.find(response.user_id);
				this.data.push(new plurkerelement('mostresponders', user));
			} else {
				this.data[index].count++;
			}
			this.data.sort(most.sort);

			// Update top 5
			var max = 5;
			var index = 1;
			for (var i = 0; i < this.data.length; i++) {
				var user_id = this.data[i].user_id;

				if(user_id != me.id && user_id != 99999) {
					this.data[i].position = index++;
					statistics.attach('<i>Top Responders</i>', this.data[i], max);
				} {
					this.data[i].position = this.data.length;
				}
			}
		},
		draw: function() {;
			var index = 0;
			if(this.data[0]) {
				while(this.data[index].user_id == me.id || this.data[index].user_id == 99999) index++;
				statistics.drawImage("avatar", friends.getAvatar(this.data[index].user_id), 'https://plurk.com/' + this.data[index].user.nick_name, '<i>Most Responder</i>', this.data[index].user.display_name, this.data[index].count);
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
			for (var i = 0; i < 10; i++) {
				if(this.data[i])
					html += '<div><img src="' + this.data[i].value + '" /> <span class="count">' + this.data[i].count + '</span></div>';
			}
			if(html != "") statistics.drawHTML("span2 grid emoticons", '<i>Most Used My Emoticons</i>', html);
		}
	},
	mentions: {
		data: [],
		count: function(content) {
			most.findregex(/\@(\w{1,30})[\ |\:]/g, function(value) {
				return value.replace(/\@|\ |\:/g, '');
			}, content, this.data, function(nick_name, result) {
				var user = friends.find(result.user_id);
				var plurker = new plurkerelement('mostmentionedbyme', user, function(plurker) {
					if(!plurker.user) {
						api.call("?fetch=APP&url=/Profile/getPublicProfile&nick_name=" + nick_name, function(data) {
							var temp = {};
							temp[data.message.user_info.id] = data.message.user_info;
							friends.add(temp);
						}, function() {});
						plurker.el.setAttribute("id", plurker.id + nick_name);
						plurker.reload = true;
						plurker.user = {
							nick_name: nick_name,
							user_id: nick_name,
						};
					}
					plurker.avatar = new span('avatar', '<img src="' + friends.getAvatar(plurker.user_id) + '" />');
					plurker.name = new span('name', "@" + plurker.user.nick_name);
					plurker.counts = new span('count', plurker.count);
					plurker.el.appendChild(plurker.avatar.el);
					plurker.el.appendChild(plurker.name.el);
					plurker.el.appendChild(plurker.counts.el);
					plurker.el.setAttribute("href", 'https://plurk.com/' + plurker.user.nick_name);
				});

				if (!plurker) {
					plurker.el = "";
					plurker.id = nick_name;
					plurker.count = 1;
				}
				plurker.value = nick_name;

				return plurker;
			});
			this.data.sort(most.sort);

			// Update top 5
			var max = 5;
			var index = 1;
			for (var i = 0; i < this.data.length; i++) {
				var user_id = this.data[i].user_id;

				if(user_id != me.id && user_id != 99999) {
					this.data[i].position = index++;
					statistics.attach('<i>Top Mentioned by You</i>', this.data[i], max);
				} {
					this.data[i].position = this.data.length;
				}
			}
		},
		draw: function() {
			if(this.data[0]) statistics.drawImage("avatar", friends.getAvatarByUsername(this.data[0].value), 'https://plurk.com/' + this.data[0].value, '<i>Most Mentioned by You</i>', "@" + this.data[0].value, this.data[0].count);
		}
	},
	hashtags: {
		data: [],
		// count: function(content) {
		// 	most.findregex(/\#(.*?)[\ |\.]/g, function(value) {
		// 		return value.replace(/\#|\ |\./g, '');
		// 	}, content, this.data);
		// },
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
			if(html != "") statistics.drawHTML("span2 grid hashtags", '<i>Most Hashtags by You</i>', html);
		}
	},
	links: {
		counts: 0,
		count: function(content) {
			var result =  content.match(/href\=\"(.*?)\"\ class=\"ex_link\ meta\"/g);
			if(result) this.counts += result.length;
		},
		draw: function() {
			if(this.counts > 0) statistics.draw('spansmall', this.counts, 'You shared <i>' + plural(this.counts, 'link') + '</i>');
		}
	},
	pictures: {
		counts: 0,
		count: function(content) {
			var result =  content.match(/href\=\"(.*?)\"\ class=\"ex_link\ pictureservices\"/g);
			if(result) this.counts += result.length;
		},
		draw: function() {
			if(this.counts > 0) statistics.draw('spansmall', this.counts, 'You shared <i>' + plural(this.counts, 'picture') + '</i>');
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
			var index = 0;
			data.sort(this.sort);
			if(data) {
				while(data[index].plurk_type == 3 && index <= data.length - 1) {
					index++;
				}
				statistics.drawPost('postcontent span2', data[index].plurk_id, '<i>Most Responded</i> ' + datediff(data[index].posted), data[index].content, data[index].response_count);
			}
		}
	},
	replurk: {
		sort: function(a, b) {
			return b.replurkers_count - a.replurkers_count;
		},
		draw: function(data) {
			data.sort(this.sort);
			if(data) if(data[0].replurkers_count > 0) statistics.drawPost('postcontent span2', data[0].plurk_id, '<i>Most Replurked</i> ' + datediff(data[0].posted), data[0].content, data[0].replurkers_count);
		}
	},
	favorite: {
		sort: function(a, b) {
			return b.favorite_count - a.favorite_count;
		},
		draw: function(data) {
			var index = 0;
			data.sort(this.sort);
			if(data) {
				while(data[index].plurk_type == 3 && index <= data.length - 1) {
					index++;
				}
				if(data[index].favorite_count > 0) statistics.drawPost('postcontent span2', data[index].plurk_id, '<i>Most Favorited</i> ' + datediff(data[index].posted), data[index].content, data[index].favorite_count);
			}
		}
	}
};

/*
	Inactive plurker object
*/
var inactive = {
	year: this.year,
	draw: function(data, year) {
		this.year = year;
		statistics.draw('inactive', year, 'You\'ve been inactive since ' + year + ' <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
		statistics.drawPost('postcontent span2', data[0].plurk_id, '<i>Your last Plurk</i> ' + datediff(data[0].posted), data[0].content, data[0].response_count);
	},
	empty: function() {
		statistics.draw('inactive', '-', 'You haven\t posted anything at all <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
	}
}

/*
	Loading object
*/
var loading = {
	count: 0,
	prev_count: 0,
	counts: -1,
	onDone: function(){},
	clean: false,
	next: document.createElement('div'),
	init: (next) => {
		var that = loading;
		that.count = 0;
		that.prev_count = 0;
		that.counts = -1;
		that.clean = false;
		that.next = next;
		that.onDone = function(){};
	},
	draw: (item) => {
		var that = loading;
		var next = that.next;
		var load = {
			progress: that.prev_count
		};
		that.prev_count = item;

		if(!next.querySelector("#statistics .loading")) {
			statistics.draw("loading", item + "%", "<i class='month'>Data from December</i> 2 of 2. Loading all responses, it can take up to 10 minutes");
		}

		gsap.to(load, {
			progress: Math.round(item),
			snap: "progress",
			ease: "linear",
			duration: .5,
			onUpdate: function () {
				if (next.querySelector("#statistics .loading .big")) {
					next.querySelector("#statistics .loading .big").innerHTML = load.progress + "%";
				}
			},
			onComplete: function() {
				if(that.clean) that.done();
			}
		});
	},
	loop: (length) => {
		var that = loading;

		that.clean = true;
		that.counts = length;
		that.draw(0);
	},
	update: (month, value) => {
		var that = loading;
		var next = that.next;
		if(month) next.querySelector("#statistics .loading .month").innerHTML = month;

		if (that.counts >= 0) {
			if(value) {
				that.count = value;
			} else {
				that.count++;
			}
			that.draw(Math.round(100 * (that.count / that.counts)));
		}
	},
	fakeupdate: () => {
		var that = loading;

		if (that.counts >= 0) {
			that.count++;
			if (that.count >= (that.counts - 10)) that.count = (that.counts - 10);
			that.draw(100 * (that.count / that.counts));
		}
	},
	forcedone: () => {
		var that = loading;
		that.count = that.counts;
		that.draw(100);
	},
	done: () => {
		var that = loading;
		var next = that.next;
		var el = next.querySelector("#statistics .loading");

		if (that.count == that.counts) {
			that.clean = false;
			gsap.to(el, {
				opacity: 0,
				duration: .5,
				ease: "expo.in",
				onComplete: function() {
					el.remove();
					that.onDone();
				}
			})
		}
	}
}


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
class plurkerelement {
	constructor(id, data, customcreate) {
		this.id = id;
		this.user = data;
		this.user_id = data.id;
		this.attached = false;
		this.hidden = true;
		this.count = 1;
		this.position = 0;
		this.reload = false;
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
			if (this.reload) {
				var plurker = friends.findByUsername(this.user.nick_name);
				if (plurker) {
					this.reload = false;
					this.user = plurker;
					this.user_id = plurker.id;
					this.avatar.el.innerHTML = '<img src="' + friends.getAvatar(this.user_id) + '" />';
					this.el.setAttribute("id", this.id + this.user_id);
				}
			}
		}
	}
}

class replurk {
	constructor(year) {
		// Which year?
		this.year = year;

		// Draw in which element?
		this.next = document.createElement('div');

		// Plurks array
		this.plurks = [];
	}

	// Show/hide Animations
	// Login Pages
	showLoginPage(tl) {
		var next = this.next;

		tl.fromTo(next.querySelectorAll("#permission"), {
			position: "fixed",
			display: "",
			opacity: 0,
			top: 0
		}, {
			opacity: 1,
			duration: 1
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
			ease: "power3.out"
		}, ">-.5");
		tl.set(next.querySelectorAll("#permission"), {
			position: "",
			top: ""
		});

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
			ease: "power3.in"
		});
		tl.fromTo(next.querySelectorAll("#permission"), {
			opacity: 1
		}, {
			opacity: 0,
			duration: 1,
			ease: "power3.in"
		}, ">-.2");
		tl.set(next.querySelectorAll("#permission"), {
			position: "",
			display: "none",
			top: ""
		});

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
			duration: 1
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
			ease: "power3.in"
		}, ">-.5");
		tl.set(next.querySelectorAll(".grant"), { display: "none" });

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
		var that = this;
		var tl = gsap.timeline();

		api.abort();

		// Hide statistic pages
		tl = this.hideStatisticPages(tl);
		tl.set(this.next, {
			onComplete: function() {
				api.call("?request=logout", function(data) {
					that.login();
				}, function() {
					console.warn("Can't logout, but login anyway");
					that.login();
				});
			}
		});
	}

	// Request permanent token
	requestPermanentToken(next, token) {
		var next = this.next;
		var input = next.querySelector("#oauth_token");
		var submit = next.querySelector("#submit");

		submit.innerHTML = "...";
		message("Checking your code, please wait.");

		api.call("?request=permanenttoken&token=" + token, function(data) {
			login();
		}, function() {
			submit.innerHTML = "Verify";
			input.value = "";
			input.focus();
			requestToken("Your verification number is invalid, please request the code again.");
		});
	}
	// Request token
	requestToken(next, text) {
		var next = this.next;
		var tokenlink = next.querySelector("#tokenurl");
		tokenlink.textContent = "Contacting Plurk...";

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

		api.call("?request=token", function(data) {
			if(text) {
				message(text);
			} else  {
				tokenlink.textContent = "Open Authorization Page";
				tokenlink.setAttribute("href", data.message.url);
			}
		}, function(data) {
			message("Error when requesting verification from Plurk, please reload your browser again.");
		});

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
		next.querySelector("#hello .text").innerHTML = "<h1>👋 " + plurker.display_name + "!</h1><p style='max-width: 500px; margin: 0 auto'>I know " + this.year + " have been a rough year for everybody, hopefully this will cheer you up.</p>";

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
		ScrollTrigger.refresh();

		if(callback) callback();
	}
	// Display statistics
	displayStatistics() {
		var that = this
		var plurk = [];
		var oneyear = new Date("31 October " + (this.year - 1));
		var days = 60*60*24*1000;
		var fulldays = 365;

		statistics.title('This Year');
		statistics.draw("loading", "", "<i class='month'>Data from December</i>1 of 2. Loading your " + this.year + " plurks. It can take up to 1 minute.");

		loading.init(this.next);
		loading.loop(fulldays);

		// Load Plurk
		var getPlurk = function(offset) {
			if (!offset) offset = "";
			else offset = "&offset=" + offset;

			api.call("?fetch=plurk&filter=my" + offset, function(data) {
				friends.add(data.message.plurk_users);
				plurk = plurk.concat(data.message.plurks);

				// Debug
				// data.message.plurks = [];
				if(data.message.plurks.length > 0) {
					var lastposted = new Date(plurk[plurk.length - 1].posted);

					if(lastposted >= oneyear) {
						loading.update("Data from " + monthNames[lastposted.getMonth()], fulldays - Math.floor((lastposted - oneyear) / days));

						// Load next plurks
						getPlurk(data.message.offset);
					} else {
						while(lastposted < oneyear && plurk.length > 0) {
							plurk.pop();
							lastposted = new Date(plurk[plurk.length - 1].posted);
						}
						loading.forcedone();
					}
				} else {
					loading.forcedone();
				}
			});
		}
		// From october to previous year october
		getPlurk((this.year) + '-10-31T23:59:59');

		// When loading done
		loading.onDone = function() {
			var date = new Date(plurk[0].posted);

			console.log(plurk.length);

			if (plurk.length > 0) {
				plurk.sort(function(a, b) {
					return b.coins > a.coins;
				});
				most.responses.draw(plurk);
				most.replurk.draw(plurk);
				most.favorite.draw(plurk);

				// Draw user statistics
				statistics.plurk_count = plurk.length;
				plurk.forEach(function(value, index) {
					// Calculate the statistics
					if (value.anonymous) statistics.whispers_count++;
					if (value.coins) statistics.coins_count += value.coins;
					if (value.porn) statistics.porn_count++;
					if (!value.response_count) statistics.noresponse_count++;
					if (value.plurk_type == 3) statistics.private_count++;
					statistics.response_count += value.response_count;
				});
				statistics.post_count = statistics.plurk_count + statistics.response_count;
				statistics.drawAll();

				// Display extended statistics
				that.displayExtendedStatistics(plurk);
			} else {
				if(plurk[0]) inactive.draw(plurk, date.getFullYear());
				else inactive.empty();
			}
		}
	}
	// Display extended statistics
	displayExtendedStatistics(plurk) {
		// Sort based on date
		plurk.sort(function(a, b) {
			var c = new Date(a.posted);
			var d = new Date(b.posted);
			return d - c;
		});
		// Get the responses for each plurks in serial
		var loop = plurk.length;
		var getResponses = function() {
			var date;
			var index = --loop;

			if(index >= 0) {
				date = new Date(plurk[index].posted);
				loading.update("Data from " + monthNames[date.getMonth()]);

				// Find and count all my emoticons from my post
				most.myemoticons.count(plurk[index].content);
				// Find and count all mentions from my post
				most.mentions.count(plurk[index].content_raw);
				// Find and count all hashtags from my post
				// Debug
				most.hashtags.count(plurk[index].content);
				// most.hashtags.count('# #עִבְרִיתעִבְרִיתעִבְרִיתעִבְרִיתעִבְרִיתעִבְרִיתעִבְרִיתעִבְרִית #dsfdsfds #dwan #ภาษาไทย #官話 #官話 #dwan. #dwan_ds #dwan/ #dwan=dsaiu3 #עִבְרִית #עִבְרִית dfsafdsa');
				// Find and count all links post
				most.links.count(plurk[index].content);
				// Find and count all pictures post
				most.pictures.count(plurk[index].content);
				// Find and count characther and words
				most.types.count(plurk[index].content_raw);

				if(plurk[index].response_count > 0) {
					api.call("?fetch=response&plurk_ids=" + plurk[index].plurk_id, function(result) {
						result.message.forEach(function(data, index){
							// Attach responses to the post
							var index = plurk.findIndex(function(el) {
								return el.plurk_id == data.plurk_id;
							});
							if(index) plurk[index].response = data;

							// Add friends from response lists
							friends.add(data.friends);

							// Count the rest of statistics
							data.responses.forEach(function(response, index) {
								// Find and count all responders
								most.responders.count(response);

								if (response.user_id == me.id) {
									// Find and count all my emoticons from responses
									most.myemoticons.count(response.content);
									// Find and count all my mentions from responses
									most.mentions.count(response.content_raw);
									// Find and count all my hashtags from responses
									most.hashtags.count(response.content);
									// Find and count all links post
									most.links.count(response.content);
									// Find and count all pictures post
									most.pictures.count(response.content);
									// Find and count characther and words
									most.types.count(response.content_raw);
								}
							});
						});

						// Get next response
						getResponses();
					}, function(data) {
						loading.update();

						// Get next response
						getResponses();
						console.info("Failed to this plurks", data);
					});
				} else {
					getResponses();
				}
			}
		}

		// Deeper user statistics
		statistics.title('Dig Deeper');
		// Load each post responses and calculate statistics
		loading.init(this.next);
		// Start loading
		loading.loop(loop);
		// Start loading 5 data in parallel
		for (let index = 1; index < 5; index++) {
			getResponses();
		}
		// When loading done
		loading.onDone = function() {
			// Display How Many Links
			most.types.draw();
			// Display How Many Links
			most.links.draw();
			// Display How Many Pictures
			most.pictures.draw();
			// Display Most Responder
			most.responders.draw();
			// Display Most Mentioned by me
			most.mentions.draw();
			// Display Most hashtags by me
			most.hashtags.draw();
			// Display Most My Emoticons
			most.myemoticons.draw();
		}
	}

	// Check login status
	login(callback) {
		var next = this.next;
		var that = this;

		console.log(next);

		me = { id: 0 };
		friends.init();
		statistics.init(next);
		most.init();
		
		function creditsAnimation(tl) {
			tl.fromTo(next.querySelectorAll("#credits .like, #credits .noaffiliation, #credits .made"), {
				y: window.innerHeight * 1/8
			}, {
				y: 0,
				ease: "linear",
				duration: 2
			}, 0);
			tl.fromTo(next.querySelectorAll("#credits .like, #credits .noaffiliation"), {
				opacity: .15
			}, {
				opacity: .5,
				stagger: {
					from: 'end',
					amount: .1
				},
				duration: 1,
				ease: "power3.in"
			}, 0);
			tl.fromTo(next.querySelectorAll("#credits .made"), {
				opacity: .15
			}, {
				opacity: 1,
				duration: 1,
				ease: "power3.in"
			}, .3);

			return tl;
		}

		// Check is server have open session 
		api.call("", function(data) {
			me = data.message;

			that.displayPlurkerData(me, function() {
				var tl = gsap.timeline();

				tl = animate.top(tl);
				// Hide login page
				if (callback) next.querySelector("#permission").style.display = "none";
				else tl = that.hideLoginPage(tl);
				// Show statistic pages
				tl = that.showStatisticPages(tl);

				next.querySelector("#logout").onclick = function() {
					that.requestLogout();
				}

				if(callback) callback();
			});

			scroll.push(function(tl) {
				tl = creditsAnimation(tl);
				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: next.querySelectorAll("#statistics"),
					scroller: next,
					start: "100%-=" + window.innerHeight + " 0",
					end: "100% 0",
					animation: tl,
					scrub: .5
				});
			});

			that.displayStatistics();
		}, function() {
			var tl = gsap.timeline();

			// Hide statistic pages
			if (callback) next.querySelectorAll(".grant").forEach(function(el) { el.style.display = "none"; });
			// Show login page
			tl = that.showLoginPage(tl);

			// Request token
			that.requestToken(next);

			// Scroll animation permission section
			scroll.push(function(tl) {
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
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: next.querySelectorAll("#permission"),
					scroller: next,
					start: "0 0",
					end: "100% 0",
					animation: tl,
					scrub: .5
				});
			});
			scroll.push(function(tl) {
				tl = creditsAnimation(tl);
				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: next.querySelectorAll("#permission"),
					scroller: next,
					start: "0 0",
					end: "100% 0",
					animation: tl,
					scrub: .5
				});
			});
			ScrollTrigger.refresh();

			if(callback) callback();
		});
	}

	// Run the API call
	run(callback) {
		// Run the login
		gsap.fromTo(this.next.querySelectorAll('#credits'), {
			opacity: 0
		}, {
			opacity: 1,
			onComplete: this.login(callback)
		});

		// Scroll animation wrap section
		scroll.push((tl) => {
			return tl;
		}, (tl) => {
			return ScrollTrigger.create({
				trigger: 'main',
				scroller: this.next,
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

// Replurk page 2020
var replurk2020 = new replurk(2020);
var plurk2020 = {
	namespace: 'plurk2020',
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
		var next = data.next.container;
		gsap.killTweensOf(_qAll("header, .footer"));
		next.querySelector("#oauth_token").onkeyup = function() {};
		next.querySelector("#submit").onclick = function() {};
	}
}

// Replurk page 2021
var replurk2021 = new replurk(2021);
var plurk2021 = {
	namespace: 'plurk2021',
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
		var next = data.next.container;
		gsap.killTweensOf(_qAll("header, .footer"));
		next.querySelector("#oauth_token").onkeyup = function() {};
		next.querySelector("#submit").onclick = function() {};
	}
}
