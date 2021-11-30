/*
	Simple span element object:

	1. update(text): update the content with text value, and animate it if it's number
	2. updateHTML(text): update the content with html value
*/

var iconLink = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path id="right" d="M19.188,12.001c0,1.1-0.891,2.015-1.988,2.015l-4.195-0.015C13.543,15.089,13.968,16,15.002,16h3C19.658,16,21,13.657,21,12s-1.342-4-2.998-4h-3c-1.034,0-1.459,0.911-1.998,1.999l4.195-0.015C18.297,9.984,19.188,10.901,19.188,12.001z"/><path id="center" d="M8,12c0,0.535,0.42,1,0.938,1h6.109c0.518,0,0.938-0.465,0.938-1c0-0.534-0.42-1-0.938-1H8.938C8.42,11,8,11.466,8,12z"/><path id="left" d="M4.816,11.999c0-1.1,0.891-2.015,1.988-2.015L11,9.999C10.461,8.911,10.036,8,9.002,8h-3c-1.656,0-2.998,2.343-2.998,4s1.342,4,2.998,4h3c1.034,0,1.459-0.911,1.998-1.999l-4.195,0.015C5.707,14.016,4.816,13.099,4.816,11.999z"/></svg>';
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
	constructor(id, data, avatarurl, customcreate) {
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
		this.el = document.createElement('a');
		this.created = false;
		this.avatarurl = avatarurl;
		this.counts = new span('count', this.count);
	}

	create() {
		this.created = true;

		this.el.setAttribute("id", this.id + this.user_id);
		this.el.setAttribute("class", 'plurkers');
		this.el.setAttribute("href", 'https://plurk.com/' + this.user.nick_name);
		this.el.setAttribute("target", '_BLANK');

		if (!this.customcreate) {
			this.avatar = new span('avatar', '<img src="' + this.avatarurl + '" />');
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
		if (!this.created) this.create();

		this.attached = true;
		element.insertAdjacentElement("beforeend", this.el);
	}

	destroy() {
		this.attached = false;

		if (this.el) {
			this.el.remove();
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


class replurk {
	// Draw in which element?
	next = document.createElement('div');	
	// Plurks array
	plurks = [];
	// Plurker profile object
	me = {"id": 3203568, "has_profile_image": 1, "timeline_privacy": 0, "nick_name": "dwan", "display_name": "Dwan", "date_of_birth": "Sat, 29 Oct 1983 00:01:00 GMT", "avatar": 41917598, "gender": 1, "karma": 199.24, "premium": true, "verified_account": false, "dateformat": 3, "default_lang": "en", "friend_list_privacy": "public", "name_color": "FFA59A", "full_name": "Dwan B.", "location": "Tel Aviv-Yafo, Dan, Israel", "timezone": "Asia/Jerusalem", "phone_verified": 0, "bday_privacy": 1, "plurks_count": 14598, "response_count": 79484, "pinned_plurk_id": 0, "background_id": 0, "show_ads": false, "show_location": 0, "profile_views": 36112, "avatar_small": "https://avatars.plurk.com/3203568-small41917598.gif", "avatar_medium": "https://avatars.plurk.com/3203568-medium41917598.gif", "avatar_big": "https://avatars.plurk.com/3203568-big41917598.jpg", "about": "Mr. Goat\u2019s dad and full-time husband", "about_renderred": "Mr. Goat\u2019s dad and full-time husband", "page_title": "The world revolve around me", "recruited": 14, "relationship": "married", "friends_count": 571, "fans_count": 498, "join_date": "Wed, 15 Oct 2008 07:48:05 GMT", "privacy": "world", "accept_private_plurk_from": "all", "post_anonymous_plurk": false, "badges": ["10_invites", "14", "9", "10000_views", "10000_plurks", "50000_comments", "upload_profile_image", "50_fans", "coin"], "link_facebook": false, "setup_facebook_sync": false, "setup_twitter_sync": false, "setup_weibo_sync": false, "filter": {"porn": 2, "anonymous": 0, "keywords": null}, "anniversary": {"years": 13, "days": 27}, "phone_number": null, "creature": 0, "creature_url": null, "creature_special": 1, "creature_special_url": null};
	
	/*
		Friends object spesification:
	
		1. data: contains all the friends collection data
		2. add(data): add friend to friends collection data
		3. find(user_id): return friend data based on their id
		4. findByUsername(nick_name): return friend data based on their nick name
		5. getAvatar(user_id): return avatar url based on their id for from friends collection data
		6. getAvatarByUsername(user_id): return avatar url based on their nick name for from friends collection data
	*/
	friends = {
		data: {},
		unavailable: [],
		parent: this,
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
		}
	}
	
	// Statistics plurker object renderer
	statistics = {
		// Storage
		whispers_count: 0,
		coins_count: 0,
		porn_count: 0,
		noresponse_count: 0,
		private_count: 0,
		replurker_count: 0,
		replurker_list: [],
		favourite_count: 0,
		favorite_list: [],
		response_count: 0,
		responded_count: 0,
		responded_other_count: 0,
		responded_other_list: [],
		plurks_count: 0,
		id: 0,
		// Other
		next: document.createElement('div'),
		el: document.createElement('div'),
		randomcolors: [],
		parent: this,
		init: function(next) {
			this.whispers_count = 0;
			this.coins_count = 0;
			this.porn_count = 0;
			this.noresponse_count = 0;
			this.private_count = 0;
			this.replurker_count = 0;
			this.replurker_list = [];
			this.favourite_count = 0;
			this.favorite_list = [];
			this.response_count = 0;
			this.responded_count = 0;
			this.responded_other_count = 0;
			this.responded_other_list = [];
			this.plurks_count = 0;
			this.id = 0;
			this.next = next;
			this.randomcolors = [];
	
			this.el = this.next.querySelector("#statistics");
	
			// Obverse when element is added to DOM
			var observer = new MutationObserver((mutationsList) => {
				mutationsList.forEach(mutation => {
					mutation.addedNodes.forEach(el => {
						this.afterDraw(el);
					});
				});
			});
			observer.observe(this.el, {
				attributes: true,
				childList: true,
				subtree: false
			});
		},
		clear: function() {
			this.el.innerHTML = "";
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
		title: function(text, style = "", loading = false) {
			if(loading) this.el.insertAdjacentHTML('beforeend', '<div class="statistics middle title ' + style + '"><h3><span>' + text + '</span><span class="loading"><i/></span></h3></div>');
			else this.el.insertAdjacentHTML('beforeend', '<div class="statistics middle title ' + style + '"><h3><span>' + text + '</span><span class="line"><i/></span></h3></div>');
		},
		afterDraw: function(el) {
			if(hasClass(el, 'wrap')) {
				var color = new colors();
				var randomcolors = [color.getRandomColor(), color.getRandomColor()]
				var anim = el.querySelector(".anim");

				gsap.set(anim, {
					background: 'radial-gradient(at 10% 10%, ' + randomcolors[0] + ' 0%, ' + randomcolors[1] + ' 100%)'
				});
					
				gsap.fromTo(anim, {
					opacity: 0
				}, {
					opacity: 1,
					duration: 0.5,
					ease: "power3.out"
				}, 0);	

				// Scroll animation wrap section
				ScrollTrigger.matchMedia({
					"(min-aspect-ratio: 1/1)": () => {
						scroll.push(tl => {
							tl.fromTo(el.children, {
								y: window.innerHeight * 1/5
							}, {
								y: 0,
								ease: "ease.out"
							}, 0);
							return tl;
						}, tl => {
							return ScrollTrigger.create({
								trigger: el,
								scroller: this.next,
								start: "0 100%-=100px",
								end: "0 100%-=100px",
								animation: tl,
								scrub: 2
							});
						});
					},
					"(max-aspect-ratio: 1/1)": () => {
						scroll.push(tl => {
							tl.fromTo(el.children, {
								y: 0
							}, {
								y: 0
							}, 0);
							return tl;
						}, tl => {
							return ScrollTrigger.create({
								trigger: el,
								scroller: this.next,
								start: "0 100%-=100px",
								end: "100px 100%-=100px",
								animation: tl,
								scrub: 1
							});
						});
					}
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
								onUpdate: () => {
									el.querySelector(".big").textContent = plural(load.progress);
								}
							}, 0);
						}
					}
	
					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: el,
						scroller: this.next,
						start: "0 100%-=100px",
						end: "100px 100%-=100px",
						animation: tl,
						toggleActions: "play none none none"
					});
				});
			} else {
				// Scroll animation line section
				scroll.push(tl => {
					tl.fromTo(el.querySelectorAll("i"), {
						x: "-100%"
					}, {
						x: "0%",
						ease: "ease.out"
					}, 0);
					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: el,
						scroller: this.next,
						start: "100% 100%",
						end: "100% 0",
						animation: tl,
						scrub: 1
					});
				});
			}

			if(hasClass(el, 'drawgraph')) {
				scroll.push(tl => {
					tl.fromTo(el.querySelector(".graph"), {
						y: 100
					}, {
						y: 0
					}, 0);

					tl.fromTo(el.querySelector(".graph i"), {
						height: "0%"
					}, {
						height: el.querySelector(".graph i").getAttribute("data-number") + "%"
					}, 0);

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: el,
						scroller: this.next,
						start: "50% 100%",
						end: "100% 100%",
						animation: tl,
						scrub: 1
					});
				});
			}

			if(hasClass(el, 'coins')) {
				scroll.push(tl => {
					tl.fromTo(el.querySelector(".big"), {
						y: "50%"
					}, {
						y: 0,
						ease: "power3.out"
					}, 0);
					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: el,
						scroller: this.next,
						start: "50% 100%",
						end: "100% 100%",
						animation: tl,
						scrub: 2
					});
				});
			}

			// Capture function
			var capture = el.querySelector(".capture small");
			if(capture) {
				capture.onclick = () => {
					if(!capture.generating) {
						capture.innerHTML = "Generating image...";
						capture.generating = true;
						document.body.style.cursor = "wait";

						el.querySelectorAll("img").forEach(img => {
							if(!img.localUrl) {
								img.localUrl = true;
								img.setAttribute("src", api.url + "?img=" + img.getAttribute("src"));
							}
						});

						setTimeout(() => {
							html2canvas(el.querySelector(".anim"), {
								backgroundColor: null,
								logging: false
							}).then(canvas => {
								var link = document.createElement("a");
								link.style.display = "none";
								link.download = "replurk" + this.parent.year + "-" + Date.now() + ".png";
								link.href = canvas.toDataURL();
								document.body.appendChild(link);
								link.click();
								document.body.removeChild(link);
								link.remove();

								capture.innerHTML = "Done";
								document.body.style.cursor = "default";
								setTimeout(() => {
									capture.innerHTML = "Redownload";
									capture.generating = false;
								}, 1500);
							});
						}, 1500);
					}
				}
			}

			scroll.refresh();
		},
		wrapper: function(style, text, background) {
			if(!background) {
				return '<div class="statistics middle wrap ' + style + '"><div class="anim" style="background-images:url(' + background + ')">' + text + '</div><div class="capture"><small>Download</small></div></div>';
			} else {
				return '<div class="statistics middle wrap ' + style + '"><div class="anim">' + text + '</div><div class="capture"><small>Capture</small></div></div>';
			}
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
			this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '<div class="box">' + text + '</div>'));
		},
		drawGraph: function(style, number, text) {
			if (typeof number == "string" || (typeof number == "number" && number > 0)) {
				this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawgraph movetitle", '\
					<p>\
						<span class="graph"><i data-number="' + number + '"></i></span>\
						<span class="info">' + text + '</span>\
					</p>\
				'));
			}
		},
		drawImage: function(style, image, link, title, text, badge) {
			this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawimage", '\
				<a href="' + link + '" target="_BLANK">\
					<span class="big">' + badge + '</span>\
					<span class="avatar"><img src="' + image + '" /></span>\
					<span class="text">' + text + '</span>\
					<span class="title">' + title + '</span>\
				</a>\
			'));
		},
		drawHTML: function(style, title, html) {
			this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawhtml", '\
				<div>\
					<div class="htmlcontent">' + html + '</div>\
					<div class="title">' + title + '</div>\
				</div>\
			'));
		},
		drawLink: function(style, link, title, text, badge) {
			this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawlink", '\
				<a href="' + link + '" target="_BLANK">\
					<span class="big">' + badge + '</span>\
					<span>' + text + '</span>\
					<span class="title">' + title + '</span>\
				</a>\
			'));
		},
		drawPost: function(style, id, title, text, badge) {
			var url = "";
			if(id) url = 'https://plurk.com/p/' + id.toString(36);
			this.el.insertAdjacentHTML('beforeend', this.wrapper(style + " drawpost", '\
				<div>\
					<a href="' + url + '" class="link" target="_BLANK">' + iconLink + '</a>\
					<span class="big">' + badge + '</span>\
					<p class="post">' + text + '</p>\
					<span class="title">' + title + '</span>\
				</div>\
			'));
		},
		drawUserList: async function(style, id, title, list) {
			var html = "";
			var max = list.length >= 5 ? 5 : list.length;

			this.drawHTML(style + " drawuserlist movetitle " + id, title, "<span class='info'>Downloading user data</span>");
			for(var index = 0; index < max; index++) {
				var value = list[index];
				if(value) {
					try {
						var friends = this.parent.friends;
						var friend = await friends.find(value.id);
						if (friend) {
							var plurker = new plurkerElement(value.id, friend, "", plurker => {
								plurker.avatar = new span('avatar', '<img src="' + friends.getAvatar(plurker.user.id) + '" />');
								plurker.name = new span('name', plurker.user.display_name);
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
					} catch {
						max++;
					}
				}
			}
			this.el.querySelector("." + id + " .htmlcontent").innerHTML = html;

			// Stagger animation
			if(id == 'mostinteraction' || id == 'mvp') {
				scroll.push(tl => {
					tl.fromTo(this.el.querySelectorAll("." + id +" .plurkers"), {
						scale: .3,
						opacity: 0
					}, {
						scale: 1,
						opacity: 1,
						ease: "elastic.out(1.2, 0.5)",
						duration: .75,
						stagger: {
							amount: .3,
							from: "end"
						}
					}, 0);

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: this.el.querySelector("." + id),
						scroller: this.parent.next,
						start: "50% 100%",
						end: "50% 100%",
						animation: tl,
						toggleActions: "play none none reverse"
					});
				});
			} else {
				scroll.push(tl => {
					tl.fromTo(this.el.querySelectorAll("." + id +" .plurkers"), {
						y: 50,
						opacity: 0
					}, {
						y: 0,
						opacity: 1,
						duration: 1,
						ease: "power3.out",
						stagger: .3
					}, 0);

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: this.el.querySelector("." + id),
						scroller: this.parent.next,
						start: "0% 100%",
						end: "0% 100%",
						animation: tl,
						toggleActions: "play none none reverse"
					});
				});
			}
		},
		attach: function(charttitle, node, max) {
			var that = this;
			var id = node.id;
			var chart;
			var title;
			var text;
			var anim;
			var wrapper;
			var capture;
	
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
	
				text = document.createElement('small');
				text.innerHTML = "Download";
				capture = document.createElement('div');
				capture.setAttribute('class', 'capture');
				capture.appendChild(text);
	
				wrapper = document.createElement('div');
				wrapper.setAttribute('class', 'statistics middle wrap attach ' + id);
				wrapper.appendChild(anim);
				wrapper.appendChild(capture);

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
		drawAll: async function(plurks) {
			var response_percentage = Math.round((this.plurks_count - this.noresponse_count) / this.plurks_count * 100);

			this.parent.most.responses.draw(plurks);
			this.drawGraph('center graph percentage', response_percentage, 'Around <i>' + response_percentage + '%</i> of my plurks got 💬 responses ' + ((response_percentage <= 50)? '😢' : '🤩'));

			this.draw('spansmall recievereplurk', this.replurker_count, 'I received <i>📢 ' + plural(this.replurker_count, 'replurk') + '</i>');
			this.parent.most.replurk.draw(plurks);

			this.parent.most.favorite.draw(plurks);	
			this.draw('spansmall recievelove', this.favourite_count, 'I recieved <i>❤️ ' + plural(this.favourite_count, 'love') + '</i>');

			this.draw('spansmall privateplurk', this.private_count, 'I posted <i>💋 ' + plural(this.private_count, 'private plurk') + '</i>');
			this.draw('spansmall whisper', this.whispers_count, 'I posted <i>🤫 ' + plural(this.whispers_count, 'whisper') + '</i>');
			this.draw('spansmall porn', this.porn_count, 'I posted <i>🤤 ' + plural(this.porn_count, 'adult plurk') + '</i>');

			this.draw('span2 responsecount', this.plurks_count + " &rarr; " + this.response_count, 'I received <i>💬 ' + plural(this.response_count, 'response') + '</i> from <i>' + plural(this.plurks_count, 'plurk') + '</i>');
			this.draw('spansmall center coins', this.coins_count, 'I recieved <i>🪙 ' + plural(this.coins_count, 'coin') + '</i>');
	
			try {
				if(this.favorite_list.length > 0) this.drawUserList("avatar", "loved", "These Plurkers <i>❤️ Loved</i> My Posts", this.favorite_list.sort(this.parent.most.sort));
				if(this.replurker_list.length > 0) this.drawUserList("avatar", "replurked", "These Plurkers likes to <i>📢 Replurked</i> My Posts", this.replurker_list.sort(this.parent.most.sort));
			} catch {
				console.info("Error while displaying most favourite and or replurker list");
			}
		}
	};
	
	// Most statistics object renderer
	most = {
		parent: this,
		sort: function(a, b) {
			return b.count - a.count;
		},
		// Find and count all based on regex
		findregex: function(regex, replace, content, storage) {
			var result = content.match(regex);
	
			for(var index in result) {
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
		caches: function(id, key, callback) {
			var storage = sessionStorage.getItem(id);
			var data = storage == undefined ? {} : JSON.parse(storage);
			
			if(data) {
				if(!data[key]) {
					data[key] = callback();
					try {
						sessionStorage.setItem(id, JSON.stringify(data));
					} catch {
						console.info("Exceeding maximum session storage");
					}
				} 
			} else {
				data[key] = callback();
				try {
					sessionStorage.setItem(id, JSON.stringify(data));
				} catch {
					console.info("Exceeding maximum session storage");
				}
			}
					
			return data[key];
		},
		countAll: async function(data) {
			// Find and count all my emoticons from my post
			if(data.user_id == this.parent.me.id) this.myemoticons.count(data.content);
			// Find and count all mentions from my post
			try {
				await this.mentions.count(data.content_raw);
			} catch {
				console.info("There were some errors while counting mentions");
			}
			// Find and count all hashtags from my post
			if(data.user_id == this.parent.me.id) this.hashtags.count(data.content);
			// Find and count all links and pictures post from my post
			if(data.user_id == this.parent.me.id) this.links.count(data.content, data.plurk_id, data.response_count, data.replurkers_count, data.favorite_count);
			// Find and count characther and words from my post
			if(data.user_id == this.parent.me.id) this.types.count(data.content_raw);
		},
		responders: {
			data: [],
			parent: this,
			count: async function(response) {
				var index = this.data.findIndex(function(el) {
					return el.user_id == response.user_id;
				});
	
				if(index < 0) {
					var friends = this.parent.friends;
					var user = await friends.find(response.user_id);
					this.data.push(new plurkerElement('mostresponders', user, friends.getAvatar(user.id)));
				} else {
					this.data[index].count++;
				}
				this.data.sort(this.parent.most.sort);
	
				// Update top 5
				var index = 1;
				for (var i = 0; i < this.data.length; i++) {
					this.data[i].position = this.data.length;
					if(this.data[i].user_id != this.parent.me.id && this.data[i].user_id != 99999) {
						this.data[i].position = index++;
						this.parent.statistics.attach('<i>Top 💬 Responders</i> <strong>of My Timeline</strong>', this.data[i], 5);
					}
				}
			},
			draw: function() {
				var index = 0;
				if(this.data.length > 0) {
					while((this.data[index].user_id == this.parent.me.id || this.data[index].user_id == 99999) && index < this.data.length) index++;
					if(this.data[index]) this.parent.statistics.drawImage("avatar", this.parent.friends.getAvatar(this.data[index].user_id), 'https://plurk.com/' + this.data[index].user.nick_name, '<i>Most Responder</i>', this.data[index].user.display_name, this.data[index].count);
				}
			}
		},
		mentions: {
			data: [],
			dataAll: [],
			parent: this,
			count: async function(content) {
				var result = this.parent.most.findregex(/\@(\w{1,30})[\ |\:]/g, value => value.replace(/\@|\ |\:/g, ''), content, this.data);
				var max = 5;
				var index = 1;
				
				if(result) {
					// Update top 5
					this.data.sort(this.parent.most.sort);
					for(var idx = 0; idx < this.data.length; idx++) {					
						this.data[idx].position = this.data.length;
						
						if(index <= max) {
							var user = await this.parent.friends.findByUsername(this.data[idx].value);
	
							if(this.data[idx].el == undefined) {
								this.data[idx] = new plurkerElement('mostmentionedbyme', user, "", plurker => {
									plurker.avatar = new span('avatar', '<img src="' + this.parent.friends.getAvatar(plurker.user_id) + '" />');		
									plurker.name = new span('name', "@" + plurker.nick_name);
									plurker.counts = new span('count', plurker.count);
									plurker.el.appendChild(plurker.avatar.el);
									plurker.el.appendChild(plurker.name.el);
									plurker.el.appendChild(plurker.counts.el);
									plurker.el.setAttribute("href", 'https://plurk.com/' + plurker.nick_name);
								});
							}
	
							if(user.id != this.parent.me.id && user.id != 99999) {
								this.data[idx].position = index++;
								this.parent.statistics.attach('<i>Most 🙋 Mentioned</i> <strong>in My Timeline</strong>', this.data[idx], max);
							}
						}
	
						if(this.data[idx].el) this.parent.statistics.attach('<i>Most 🙋 Mentioned</i> <strong>in My Timeline</strong>', this.data[idx], max);
					}
				}
			},
			draw: function() {			
				var index = 0;
				if(this.data.length > 0) {
					while((this.data[index].user_id == this.parent.me.id || this.data[index].user_id == 99999) && index < this.data.length) index++;
					if(this.data[index]) this.parent.statistics.drawImage("avatar", this.parent.friends.getAvatarByUsername(this.data[index].value), 'https://plurk.com/' + this.data[index].value, '<i>Most Mentioned</i> by me', "@" + this.data[index].value, this.data[index].count);
				}
			}
		},
		myemoticons: {
			data: [],
			parent: this,
			count: function(content) {
				this.parent.most.findregex(/emoticon_my\" src=\"(.*?)\"/g, function(value) {
					return value.replace(/emoticon_my\" src=\"|\"/gi,'');
				}, content, this.data);
			},
			draw: function() {
				var html = "";
				var max = 7;
				this.data.sort(this.parent.most.sort);
				for(var i = 0; i < (this.data.length < max ? this.data.length : max) && this.data[i]; i++) 
					if(this.data[i].count > 1) html += '<div><img src="' + this.data[i].value + '" /> <span class="count">' + this.data[i].count + '</span></div>';
				if(html != "") this.parent.statistics.drawHTML("smallspan grid emoticons", 'Most Used <i>My Emoticons</i>', html);
			}
		},
		hashtags: {
			data: [],
			parent: this,
			count: function(content) {
				this.parent.most.findregex(/hashtag\"\>(.*?)\</g, function(value) {
					return value.replace(/hashtag\"\>\#|\.\<|\</g, '');
				}, content, this.data);
			},
			draw: function() {
				var html = "";
				var max = 5;
				this.data.sort(this.parent.most.sort);
				for(var i = 0; i < (this.data.length < max ? this.data.length : max) && this.data[i]; i++) 
					if(this.data[i].count > 1) html += '<div><a href="https://plurk.com/search?q=' + this.data[i].value + '" target="_BLANK" /><span class="count">' + this.data[i].count + '</span> #' + this.data[i].value + '</a></div>';
				if(html != "") { 
					html = "<strong>#</strong>" + html;
					this.parent.statistics.drawHTML("hashtags", 'Most Used <i>Hashtags</i>', html);
				}
			}
		},
		links: {
			data: [],
			links: [],
			pics:[],
			parent: this,
			count: function(content, id, response, replurk, loved) {
				var result = content.match(/href\=\"(.*?)\"\ class=\"(.*?)\"\ rel/g);
				var count = 0;
				var pics = [];
				var links = [];

				if(result) for(var data of result) {
					if(!this.data[id]) {
						count = response + (replurk * 250) + (loved * 50);
					}

					if(data.includes("pictureservices")) {
						this.pics.push(data);
						if(count > 0) {
							var pic = data.split('\"')
							pics.push({
								url: pic[1],
								response: response,
								replurk: replurk,
								loved: loved
							});
						}
					}
					else {
						this.links.push(data);
						if(count > 0) {
							var link = data.split('\"')
							links.push({
								url: link[1],
								response: response,
								replurk: replurk,
								loved: loved
							});
						}

					}
				}

				if(count) this.data.push({
					id: id,
					pics: pics,
					links: links,
					count: count,
					content: content
				});
			},
			drawLinks: function() {
				var max = 1;
				var index = 0;
				var result = "";
				this.data.sort(this.parent.most.sort);
				while(index < this.data.length && max > 0) {
					if(this.data[index].links.length > 0) {
						var link = this.data[index].links[0];
						var url = '<a href="https://plurk.com/p/' + this.data[index].toString(36) + '" class="link" target="_BLANK">' + iconLink + '</a>';
						result += '<div class="post"><div class="info">' + this.data[index].content + '</div><div class="meta"><span class="response">💬 ' + link.response + '</span><span class="replurk">📢 ' + link.replurk + '</span><span class="loved">❤️ ' + link.loved + '</span>' + url + '</div></div>';
						max--;
					}
					index++;
				}
				if(this.links.length > 0) this.parent.statistics.drawDiv('spansmall sharedlinks', "<div class='title'>I shared <i>🔗 " + plural(this.links.length, 'link') + '</i> and this is the most popular one</div>' + result);
			},
			drawPics: function() {
				var max = 1;
				var index = 0;
				var result = "";
				this.data.sort(this.parent.most.sort);
				while(index < this.data.length && max > 0) {
					if(this.data[index].pics.length > 0) {
						var pics = this.data[index].pics[0];
						var url = '<a href="https://plurk.com/p/' + this.data[index].toString(36) + '" class="link" target="_BLANK">' + iconLink + '</a>';
						result += '<div class="box"><div class="image" style="background-image: url(' + api.url + "?img=" + pics.url + ')"></div><div class="post">' + this.data[index].content + '<div class="meta"><span class="response">💬 ' + pics.response + '</span><span class="replurk">📢 ' + pics.replurk + '</span><span class="loved">❤️ ' + pics.loved + '</span>' + url + '</div></div></div>';
						max--;
					}
					index++;
				}

				if(this.pics.length > 0) this.parent.statistics.draw('spansmall sharedpictures', this.pics.length, 'I shared <i>🖼 ' + plural(this.pics.length, 'image') + '</i>');
				if(result != "") this.parent.statistics.drawHTML('span2 previewpics', '<i>🖼 Most Popular Image</i>', result);
			}
		},
		types: {
			words: 0,
			chars: 0,
			parent: this,
			count: function(content) {
				var words = content.split(" ");
	
				this.chars += content.length;
				this.words += words.length;
			},
			draw: function() {
				if(this.chars > 0) this.parent.statistics.draw('span2 mediumnumber', this.chars, 'I typed more than  <i>' + pluralinwords(this.chars, 'character') + '</i>, around <i>' + pluralinwords(this.words, 'word') + '</i> this year');
			}
		},
		responses: {
			parent: this,
			sort: function(a, b) {
				return b.response_count - a.response_count;
			},
			draw: function(data) {
				data.sort(this.sort);
				for(var index in data){
					var value = data[index];
					if(value.owner_id == this.parent.me.id && value.plurk_type != 3 && value.response_count > 0) {
						this.parent.statistics.drawPost('postcontent span2 mostresponded', value.plurk_id, '<i>💬 Most Responded</i> ' + datediff(value.posted), value.content, value.response_count);						
						return;
					}
				}
			}
		},
		replurk: {
			parent: this,
			sort: function(a, b) {
				return b.replurkers_count - a.replurkers_count;
			},
			draw: function(data) {
				data.sort(this.sort);
				for(var index in data){
					var value = data[index];
					if(value.owner_id == this.parent.me.id && value.plurk_type != 3 && value.replurkers_count > 0) {
						this.parent.statistics.drawPost('postcontent span2 mostreplurked', value.plurk_id, '<i>📢 Most Replurked</i> ' + datediff(value.posted), value.content, value.replurkers_count);
						return;
					}
				}
			}
		},
		favorite: {
			parent: this,
			sort: function(a, b) {
				return b.favorite_count - a.favorite_count;
			},
			draw: function(data) {
				data.sort(this.sort);
				for(var index in data){
					var value = data[index];
					if(value.owner_id == this.parent.me.id && value.plurk_type != 3 && value.favorite_count > 0) {
						this.parent.statistics.drawPost('postcontent span2 mostfavorited', value.plurk_id, '<i>❤️ Most Loved</i> ' + datediff(value.posted), value.content, value.favorite_count);
						return;
					}
				}
			}
		},
		interaction: {
			data: [],
			parent: this,
			count: function(response) {
				var index = this.data.findIndex(function(el) {
					return el.id == response.user_id;
				});
	
				if(index < 0) {
					this.data.push({
						id: response.user_id,
						count: 1,
						multiplier: 1,
						plurk_id: response.plurk_id
					});
				} else {
					if(this.data[index].plurk_id == response.plurk_id) this.data[index].multiplier++;
					else this.data[index].multiplier = 1;
					this.data[index].count += (this.data[index].multiplier * response.content_raw.length);
				}
				this.data.sort(this.parent.most.sort);
			},
			draw: function() {
				var result= [];
				var length = 0;
				var index = 0;
				while(this.data[index] && length <= 5) {
					if(this.data[index].id != this.parent.me.id) {
						result.push(this.data[index]);
						length++;
					}
					index++;
				}

				try {
					if(result.length > 0) this.parent.statistics.drawUserList("bubble span2", "mostinteraction", "Plurkers who really like to <i>🗣 interact</i> with me", result);
				} catch {
					console.info("Error while counting most interacted plurker");
				}
			}
		},
		mvp: {
			data: [],
			parent: this,
			count: function(response, type) {
				var index = this.data.findIndex(function(el) {
					return el.id == response.user_id;
				});
	
				if(index < 0) {
					this.data.push({
						id: response.user_id,
						count: 1,
						multiplier: 1,
						plurk_id: response.plurk_id
					});
				} else {
					if(type == "replurk") {
						this.data[index].count += (response.count * 250);
					} else if(type == "favorite") {
						this.data[index].count += (response.count * 50);
					} else if(response.content_raw.length > 16){
						if(this.data[index].plurk_id == response.plurk_id) this.data[index].multiplier += .5;
						else this.data[index].multiplier = .5;
						this.data[index].count += (this.data[index].multiplier * response.content_raw.length);
					}
				}
				this.data.sort(this.parent.most.sort);
			},
			draw: function() {
				var result= [];
				var length = 0;
				var index = 0;
				while(this.data[index] && length <= 5) {
					if(this.data[index].id != this.parent.me.id) {
						result.push(this.data[index]);
						length++;
					}
					index++;
				}

				try {
					if(result.length > 0) this.parent.statistics.drawUserList("bubble span3", "mvp", "My " + this.parent.year + " <i>👄 MVP</i>", result);
				} catch {
					console.info("Error while counting my mvp");
				}
			}
		}
	};
	
	// Inactive plurker object
	inactive = {
		draw: (data, year) => {
			this.statistics.draw('inactive', year + " &#8617;", 'I\'ve been inactive since ' + year + ' <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
			this.statistics.drawPost('postcontent span2 inactivemore', data.plurk_id, '<i>My last Plurk</i> ' + datediff(data.posted), data.content, data.response_count);
		},
		empty: () => {
			this.statistics.draw('inactive', '-', 'I didn\'t post anything at this year <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
		}
	}
	
	// Loading object
	loading = {
		count: 0,
		prev_count: 0,
		counts: -1,
		clean: false,
		next: document.createElement('div'),
		parent: this,
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
	
				if(!this.next.querySelector(".statistics.loading")) {
					this.parent.statistics.draw("loading", item + "%", "<i class='month'>Data from " + this.year + "</i>. Loading. <small>As long as you didn't close this browser tab, You can resume later by refreshing this page.</small>");
				}
	
				// Animate loading
				var load = { progress: this.prev_count };
				gsap.to(load, {
					progress: Math.round(item),
					snap: "progress",
					ease: "linear",
					duration: .24,
					onUpdate: () => {
						var el = this.next.querySelector(".loading .big");
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
			var el = this.next.querySelector(".loading .month");
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
					var el = this.next.querySelector(".statistics.loading");
										
					this.clean = false;
					gsap.to(el, {
						opacity: 0,
						width: 0,
						height: 0,
						padding: 0,
						margin: 0,
						overflow: "hidden",
						duration: .5,
						ease: "power3.out",
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
						var el2 = el1 + ", .footer > *";

						if (update.direction > 0) {
							gsap.killTweensOf(_qAll(el2));
							gsap.to(_qAll(el1), { y: -100, opacity: 0 });
							gsap.to(_qAll('.footer > *'), { y: 100, opacity: 0 });
						} else {
							gsap.to(_qAll(el2), { y: 0, opacity: 1 });
						}
					}
				});
			});
		},
		browserBar: (login = true) => {
			if(login) {
				scroll.push((tl) => {
					return tl;
				}, (tl) => {
					return ScrollTrigger.create({
						trigger: '#hello',
						scroller: this.next,
						start: "0 0",
						end: "100% 10px",
						animation: tl,
						scrub: true,
						onLeave: () => {
							this.browserColor("white");
						}, 
						onEnterBack: () => {
							this.browserColor("green");
						}
					});
				});
				scroll.push((tl) => {
					return tl;
				}, (tl) => {
					return ScrollTrigger.create({
						trigger: '#statistics',
						scroller: this.next,
						start: "0 0",
						end: "100% 10px",
						animation: tl,
						scrub: true,
						onLeave: () => {
							this.browserColor("yellow");
						},
						onEnter: () => {
							this.browserColor("white");
						},
						onEnterBack: () => {
							this.browserColor("white");
						}
					});
				});
			} else {
				scroll.push((tl) => {
					return tl;
				}, (tl) => {
					return ScrollTrigger.create({
						trigger: '#permission',
						scroller: this.next,
						start: "0 0",
						end: "100% 10px",
						animation: tl,
						scrub: true,
						onLeave: () => {
							this.browserColor("yellow");
						},
						onEnterBack: () => {
							this.browserColor("green");
						}
					});
				});
			}
		}
	}

	constructor(year) {
		// Which year?
		this.year = year;
		this.startDate = this.year + '-10-29T09:00:00';
		this.endDate = new Date((this.year - 1) + '-10-29T09:00:00');
		this.days = 60*60*24*1000;
		this.fulldays = 365;
	}

	// Browser color
	getSetStateColor(state) {
		if(typeof(state) == "object" && state.length >= 1) {
			if(state.length == 1) {
				browserColorDark =  state[0];
				browserColorLight = state[0];
			} else {
				browserColorDark =  state[1];
				browserColorLight = state[0];
			}
		} else if(state == "green") {
			browserColorDark = "#0d4f03";
			browserColorLight = "#60e670";
		} else if (state == "yellow") {
			browserColorDark =  "#705f02";
			browserColorLight = "#FFD700";
		} else {
			browserColorDark =  "#000000";
			browserColorLight = "#FFFFFF";
		}

		return [browserColorLight, browserColorDark];
	}
	browserColor(state, duration, ease) {
		this.getSetStateColor(state);
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
		tl.fromTo(next.querySelectorAll(".grant:not(#hello), .statistics"), {
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

		tl = animate.top(next, tl);
		tl.fromTo(next.querySelectorAll(".footer > *, #hello .bgtext > *, #hello .thumbs, #hello .text > *, #hello .arrow-big"), {
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
		tl.set(next.querySelectorAll(".grant:not(#hello), .statistics"), {
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
				try {
					await api.call("?fetch=logout");
				} catch {
					console.info("Error while loging out");
				}
				this.statistics.clear();
				api.clear();
				this.login();
				scroll.refresh();
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

		api.call("?request=token").then(data => {
			if(text) {
				message(text);
			} else  {
				tokenlink.textContent = "Grant Access";
				tokenlink.setAttribute("href", api.url + "?redirect=" + data.message.url);
			}
		}, () => {
			message("Error when requesting verification from Plurk, please reload your browser again.");
		});

		if(!text) next.querySelector("#permission form").style.display = "none";
	}

	// Display current Plurker data
	async displayPlurkerData(callback) {
		var plurker = this.me;
		var next = this.next;
		var extra = "";

		// plurks_count
		var days = (plurker.anniversary.years * 365) + plurker.anniversary.days;
		var responses = Math.round(plurker.response_count / days);

		next.querySelector("#hello .thumbs").innerHTML = "<img src='" + plurker.avatar_big + "' />";
		if(this.year == 2021) next.querySelector("#hello .text").innerHTML = "<h1>Hello " + plurker.display_name + "</h1><p style='max-width: 500px; margin: 0 auto'>If " + this.year + " have been a rough year you, hopefully RePlurk will cheer you by bringing some good memories</p>";
		else next.querySelector("#hello .text").innerHTML = "<h1>Hello " + plurker.display_name + "</h1><p style='max-width: 500px; margin: 0 auto'>This is your year end RePlurk recap. Hopefully it will bring lots of good memories.</p>";

		// Draw statistic
		this.statistics.title('All Time', 'alltime');
		if(plurker.anniversary.years && plurker.anniversary.days) {
			this.statistics.draw('spansmall center posted', Math.round(plurker.plurks_count / days), "I posted around <i>💬 " + plural(Math.round(plurker.plurks_count / days), "plurk") + " per day</i>");
			
			// Responses
			var oneday = 16;
			if (responses <= oneday) extra = "That's almost 1 response every <i>" + plural(Math.round(oneday / responses), "hour") + '</i>';
			else extra = "That's almost 1 response every <i>" + plural(Math.round(oneday * 60 / responses), "minute") + '</i>';
			this.statistics.draw('span2 center responded', responses, "I responded around <i>💬 " + plural(responses, "time") + "</i> per day. " + extra + " when I'm not asleep");

			var join = new Date (plurker.join_date)
			this.statistics.draw('spansmall center anniversary', "<strong><i>" + monthNames[join.getMonth()] + "</i> <i>" + join.getFullYear() + "</i></strong> <em>" + join.getDate() + "</em>", "I joined Plurk <i>" + plural(plurker.anniversary.years, "year") + "</i> and <i>" + plural(plurker.anniversary.days, "day") + "</i> ago");
			this.statistics.draw('spansmall center badges', "9", "I have <i>🛡 " + plural(plurker.badges.length, "badge") + "</i> right now");
		} else {
			this.statistics.draw('', '-', "There is no data in my timeline");
			this.statistics.draw('', plurker.badges.length, "But at least I have <i>" + plural(plurker.badges.length, "badge") + "</i> right now");
		}

		// Scroll animation hello section
		scroll.push(tl => {
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
		this.statistics.title('This Year', 'thisyear');
		this.statistics.draw("loading thisyearloading", "", "<i class='month'>Data from December</i>1 of 2. Loading " + this.year + " timeline. It can take up to 1 minute.");

		this.loading.init(this.next);
		this.loading.loop(this.fulldays);

		// Load loop timeline
		var getTimeline = async(offset) => {
			offset = (!offset) ? "" : "&offset=" + offset;

			var data = await api.call("?fetch=plurk" + offset, 1);
			if(data) {
				this.friends.add(data.message.plurk_users);
				this.plurks = this.plurks.concat(data.message.plurks);

				if(data.message.plurks.length > 0) {
					var lastposted = new Date(this.plurks[this.plurks.length - 1].posted);

					if(lastposted >= this.endDate) {
						this.loading.update("Data from " + monthNames[lastposted.getMonth()] + " " + lastposted.getFullYear(), this.fulldays - Math.floor((lastposted - this.endDate) / this.days));

						// Load next plurks
						await getTimeline(data.message.offset);
					} else {
						while(lastposted < this.endDate && this.plurks.length > 1) {
							this.plurks.pop();
							lastposted = new Date(this.plurks[this.plurks.length - 1].posted);
						}
						await this.loading.forcedone();
					}
				} else {
					await this.loading.forcedone();
				}
			}
		}
		await getTimeline(this.startDate);

		// When loading done
		if (this.plurks.length > 1) {			
			// Count user statistics
			this.statistics.plurks_count = 0;
			this.plurks.forEach(plurk => {
				// Calculate the statistics
				if (plurk.responded) this.statistics.responded_count++;
				if (plurk.owner_id == this.me.id) {
					this.statistics.plurks_count++;
					this.statistics.replurker_count += plurk.replurkers.length;
					this.statistics.replurker_list = this.statistics.listCount(this.statistics.replurker_list, plurk.replurkers);
					this.statistics.favourite_count += plurk.favorers.length;
					this.statistics.favorite_list = this.statistics.listCount(this.statistics.favorite_list, plurk.favorers);					
					if (plurk.anonymous) this.statistics.whispers_count++;
					if (plurk.coins) this.statistics.coins_count += plurk.coins;
					if (plurk.porn) this.statistics.porn_count++;
					if (!plurk.response_count) this.statistics.noresponse_count++;
					if (plurk.plurk_type == 3) this.statistics.private_count++;
					this.statistics.response_count += plurk.response_count;
				} else if (plurk.responded) this.statistics.responded_other_count++;
			});

			// Sort based on date
			this.plurks.sort((a, b) => new Date(b.posted) - new Date(a.posted));

			// Draw statistics
			try {
				await this.statistics.drawAll(this.plurks);
			} catch {
				console.info("Error while counting statistics");
			}

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
		this.statistics.title('Dig Deeper', 'digdeeper');
		this.statistics.draw("loading digdeeperloading", "", "<i class='month'>Data from " + this.year + "</i> 2 of 2. Loading all responses. <small>If the loading seems to stop, refresh your browser tab to resume your download. Closing your browser tab will clear all downloaded data.</small>");

		// Load each post responses and calculate statistics
		this.loading.init(this.next);
		this.loading.loop(this.plurks.length);

		// Get the responses for each plurks in parallel
		var index = 0;
		this.plurks.sort((a, b) => new Date(a.posted) < new Date(b.posted));
		for(var plurk of this.plurks) {
			var date = new Date(plurk.posted);
			this.loading.update("Data from " + monthNames[date.getMonth()] + " " + date.getFullYear());

			// Count all
			await this.most.countAll(plurk);

			// Count responses
			if(plurk.response_count > 0 && (plurk.responded || plurk.owner_id == this.me.id)) {
				try {
					var result = await api.call("?fetch=response&plurk_ids=" + plurk.plurk_id);
					if(result) for(var message of result.message) {
						// Add friends from response lists
						this.friends.add(message.friends);

						// Count the rest of statistics
						for(var response of message.responses) {
							// Find and count all responders
							await this.most.responders.count(response);
							this.most.interaction.count(response);
							this.most.mvp.count(response, "response");
							// Count all
							await this.most.countAll(response);
						}
					}
				} catch {
					console.info("Error loading response: " + plurk.plurk_id);
				}
			}
		}

		// Display How Many Links
		this.most.links.drawLinks();
		// Display How Many Pictures
		this.most.links.drawPics();

		// Draw Results
		// Display Most Responder
		// this.most.responders.draw();
		
		// Display Most Interaction
		this.most.interaction.draw();

		// Display Most Mentioned by me
		// this.most.mentions.draw();

		// Display How Many Words-Characters
		this.most.types.draw();

		// Display Most hashtags by me
		this.most.hashtags.draw();
		
		// Display Most My Emoticons
		this.most.myemoticons.draw();

		// Display MVP
		this.statistics.replurker_list.forEach(value => {
			this.most.mvp.count({ user_id: value.id, count: value.count }, "replurk");
		});
		this.statistics.favorite_list.forEach(value => {
			this.most.mvp.count({ user_id: value.id, count: value.count }, "favorite");
		});
		this.most.mvp.draw();

	}

	// Check login status
	async login(callback) {
		var next = this.next;

		this.me = { id: 0 };
		this.friends.init();
		this.statistics.init(next);
		this.most.init();
		this.plurks = [];

		scroll.destroy();

		window.scrollTo(0, 0);
		this.browserColor("yellow");

		// Scroll animation menu and logout
		this.scrollAnimate.menu();

		// Check is server have open session 
		var tl = gsap.timeline();
		tl.set(next.querySelector("#hello .arrow-big"), {
			opacity: 0
		});
		api.call("?").then(data => {
			this.me = data.message;

			this.displayPlurkerData(() => {
				tl = animate.top(next, tl);

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
			this.scrollAnimate.statistics();
			// Scroll browser bar
			this.scrollAnimate.browserBar();
			
			scroll.refresh();
			
			this.displayStatistics();
		}, () => {
			// Hide statistic pages
			if(callback) next.querySelectorAll(".grant").forEach(function(el) { el.style.display = "none"; });
			// Show login page
			this.showLoginPage(tl);
			// Request token
			this.requestToken();

			// Scroll animation permission section
			this.scrollAnimate.permisions();
			// Scroll browser bar
			this.scrollAnimate.browserBar(false);

			scroll.refresh();

			if(callback) callback();
		});
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
			onComplete: () => {
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

		next.querySelector("#backtotop").onclick = () => {
			gsap.to(next, {
				duration: 2, 
				ease: "expo.inOut",
				scrollTo: "#statistics"
			});
		}
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
		gsap.killTweensOf(_qAll("header, .footer, #backtotop"));
	}
}
