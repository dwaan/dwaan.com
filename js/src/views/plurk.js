var plurk = {
	namespace: 'plurk',
	beforeEnter: function(data) {
		var next = data.next.container;

		next.querySelectorAll("#permission, .grant").forEach(function(el) {
			el.style.display = "none";
		});
	},
	afterEnter: function(data) {
		var done = this.async();
		var next = data.next.container;
		var observer;
		var interval;

		// Me object
		var me = {};
		// Friends object
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

				if(user_id) return this.data[user_id];
				return false;
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
		};
		// Statistics objects
		var span = function(classname, text) {
			var that = this;

			this.el = document.createElement('span');
			this.el.setAttribute("class", classname);
			this.el.innerHTML = text;
			this.update = function(text) {
				animateNumber(that.el.textContent, text, function(text) {
					that.el.textContent = text;
				});
			}
			this.updateHTML = function(text) {
				that.el.innerHTML = text;
			}
		}
		var plurkerelement = function(id, data, customcreate) {
			var that = this;

			this.id = id;
			this.user = data;
			this.user_id = data.id;
			this.attached = false;
			this.hidden = true;
			this.count = 1;
			this.position = 0;
			this.reload = false;

			this.create = function() {
				that.el = document.createElement('a');
				that.el.setAttribute("id", that.id + that.user_id);
				that.el.setAttribute("class", 'plurkers');
				that.el.setAttribute("href", 'https://plurk.com/' + that.user.nick_name);
				that.el.setAttribute("target", '_BLANK');

				if (!customcreate) {
					that.avatar = new span('avatar', '<img src="' + friends.getAvatar(that.user_id) + '" />');
					that.name = new span('name', that.user.display_name);
					that.counts = new span('count', that.count);
					that.el.appendChild(that.avatar.el);
					that.el.appendChild(that.name.el);
					that.el.appendChild(that.counts.el);
				} else {
					customcreate(that);
				}
			}
			this.create();

			this.update = function() {
				that.counts.update(that.count);
				if(that.reload) {
					var plurker = friends.findByUsername(this.user.nick_name);
					if(plurker) {
						that.reload = false;
						that.user = plurker;
						that.user_id = plurker.id;
						that.avatar.el.innerHTML = '<img src="' + friends.getAvatar(that.user_id) + '" />';
						that.el.setAttribute("id", that.id + that.user_id);
					}
				}
			}
		}
		var colors = function() {
			this.oldcolor = "";
			this.randomcolors = [];
			this.colors = ['rgb(63,94,251)', 'rgb(252,70,107)', 'rgb(34,193,195)', 'rgb(253,187,45)', 'rgb(195,34,190)', 'rgb(219,158,0)', 'rgb(75,231,152)','rgb(195,34,103)', 'rgb(45,182,253)'];
			this.getRandomColor = function() {
				var color;
				do {
					this.randomcolors = gsap.utils.shuffle(this.colors).slice();
				} while(this.oldcolor == (color = this.randomcolors.pop()));
				this.oldcolor = color;
				return color;
			}
		}
		var statistics = {
			el: false,
			whispers_count: 0,
			has_gift_count: 0,
			porn_count: 0,
			noresponse_count: 0,
			private_count: 0,
			response_count: 0,
			post_count: 0,
			plurk_count: 0,
			delay: 0,
			id: 0,
			style: 0,
			randomcolors: [],
			init: function() {
				var that = this;

				this.el = false;
				this.whispers_count = 0;
				this.has_gift_count = 0;
				this.porn_count = 0;
				this.noresponse_count = 0;
				this.private_count = 0;
				this.response_count = 0;
				this.post_count = 0;
				this.plurk_count = 0;
				this.delay = 0;
				this.id = 0;
				this.style = 0;
				this.randomcolors = [];

				next.querySelector("#statistics").innerHTML = '<div class="stats"></div>';
				this.el = next.querySelector("#statistics .stats");

				// Obverse when element is added to DOM
				observer = new MutationObserver(function (mutationsList, observer) {
				    mutationsList.forEach(function(mutation) {
					    mutation.addedNodes.forEach(function(el) {
					    	that.afterDraw(el);
						});
				    });
				});
				observer.observe(this.el, {
					attributes: true,
					childList: true,
					subtree: false
				});
			},
			title: function(text) {
				this.el.insertAdjacentHTML('beforeend', '<h3><span>'+ text + '</span><span class="line"><i/></span</h3>');
			},
			afterDraw: function(el) {
				var that = this;

				if(hasClass(el, 'wrap')) {
					var color = new colors();

					gsap.set(el.children, {
						background: 'linear-gradient(5deg, ' + color.getRandomColor() + ' 0%, ' + color.getRandomColor() + ' 100%)'
					});

					// Scroll animation wrap section
					scroll.push(function(tl) {
						tl.fromTo(el.children, {
							x: -20,
							y: "50%",
							opacity: 0,
							rotation: 5
						}, {
							x: 0,
							y: "0%",
							opacity: 1,
							rotation: 0,
							ease: "ease.out"
						}, 0);
						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: el,
							start: "0 100%-=100px",
							end: "100px 100%-=100px",
							animation: tl,
							scrub: .5
						});
					});
				} else {
					// Scroll animation title section
					scroll.push(function(tl) {
						tl.fromTo(el.children, {
							y: 50,
							opacity: 0
						}, {
							y: 0,
							opacity: 1,
							ease: "ease.out"
						}, 0);
						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: el,
							start: "0 100%-=100px",
							end: "100px 100%-=100px",
							animation: tl,
							scrub: .5
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
							start: "0 100%",
							end: "0 0",
							animation: tl,
							scrub: .5
						});
					});
				}
			},
			wrapper: function(style, text) {
				return '<div class="wrap ' + style + '"><div class="anim">' + text + '</div></div>';
			},
			draw: function(style, number, text) {
				if (typeof number == "string" || (typeof number == "number" && number > 0)) {
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
			drawLink: function(style, link, title, text, badge) {
				this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '\
					<a href="' + link + '" target="_BLANK">\
						<span class="big">' + badge + '</span>\
						<span>' + text + '</span>\
						<span class="title">' + title + '</span>\
					</a>\
				'));
			},
			drawPost: function(style, link, title, text, badge) {
				this.el.insertAdjacentHTML('beforeend', this.wrapper(style, '\
					<div>\
						<span class="big">' + badge + '</span>\
						<p class="post">' + text + '</p>\
						<span class="title">' + title + '</span>\
					</div>\
				'));
			},
			attach: function(charttitle, node, max) {
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
					opacity = 1
				}

				// Create the box
				if(!next.querySelector("." + id)) {
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

					this.el.insertAdjacentElement("beforeend", wrapper);
				}

				var percentageNodeHeight = 0;
				// Add  element
				if(!node.attached) {
					var maxTop = max / (max - 1) * 100;

					this.el.querySelector("." + id + ' .chart').insertAdjacentElement("beforeend", node.el);
					gsap.from(node.el, {
						top: maxTop + "%",
						opacity: 0,
						zIndex: 0,
					});
					node.attached = true;
				}
				// Update position
				if(!hidden || !node.el.hidden) {
					var currentTop = position / (max - 1) * 100;

					gsap.to(node.el, {
						display: "",
						top: currentTop + "%",
						opacity: opacity,
						zIndex: zIndex,
						duration: .5,
						ease: "power3.out",
						onComplete: function() {
							if(hidden) {
								gsap.set(node.el, {
									display: "none"
								});
							}
						}
					});
					node.el.hidden = hidden;
				}
				node.update();
			},
			drawAll: function() {
				this.draw('', this.plurk_count, 'You posted <i>' + plural(this.plurk_count, 'plurk') + '</i>');
				this.drawGraph('center', Math.round(this.noresponse_count/this.plurk_count*100), this.noresponse_count + ' of ' + plural(this.plurk_count, 'plurk') + ' you posted have no response. That\'s around ' + Math.round(this.noresponse_count/this.plurk_count*100) + '% of your plurk <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
				this.draw('', this.response_count, 'You posted <i>' + plural(this.response_count, 'response') + '</i>');
				this.draw('', this.post_count, 'In total, you posted <i>' + plural(this.post_count, 'post') + '</i>, that\'s quite a lot <img src="https://s.plurk.com/emoticons/platinum/8073c1716e75d32eb79f97a9f521fa01.gif" /></span>');
				this.draw('', this.whispers_count, 'You posted <i>' + plural(this.whispers_count, 'whisper') + '</i>');
				this.draw('', this.porn_count, 'You posted <i>' + plural(this.porn_count, 'adult plurk') + '</i>');
				this.draw('', this.has_gift_count, 'You recieved <i>' + plural(this.has_gift_count, 'gift') + '</i>');
			}
		};
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
				this.responses.data = [];
				this.replurk.data = [];
				this.favorite.data = [];
			},
			responders: {
				data: [],
				elements: [],
				count: function(content, value) {
					var index = this.data.findIndex(function(el) {
						return el.user_id == value.user_id;
					});
					if (index < 0) {
						this.data.push(new plurkerelement('mostresponders', content.friends[value.user_id]));
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
						statistics.drawImage("avatar", friends.getAvatar(this.data[index].user_id), 'https://plurk.com/' + this.data[index].user.nick_name, '<i>Your Most Responder</i>', this.data[index].user.display_name, this.data[index].count);
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
					this.data.sort(most.sort);
					if(this.data[0]) statistics.drawImage("emoticons", this.data[0].value, '#', '<i>Most Used My Emoticon</i>', '', this.data[0].count);
				}
			},
			mentions: {
				data: [],
				count: function(content) {
					most.findregex(/\@(\w{1,30})[\ |\:]/g, function(value) {
						return value.replace(/\@|\ |\:/g, '');
					}, content, this.data, function(nick_name, result) {
						plurker =  new plurkerelement('mostmentionedbyme', friends.findByUsername(nick_name), function(plurker) {
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
				count: function(content) {
					most.findregex(/\#(.*?)\ /g, function(value) {
						return value.replace(/\#|\ |\:/g, '');
					}, content, this.data);
				},
				draw: function() {
					this.data.sort(most.sort);
					if(this.data[0]) statistics.drawLink('', 'https://plurk.com/search?q=' + this.data[0].value, '<i>Most Hashtags by You</i>', '#' + this.data[0].value, this.data[0].count);
				}
			},
			responses: {
				sort: function(a, b) {
					return b.response_count - a.response_count;
				},
				draw: function(data) {
					data.sort(this.sort);
					if(data) statistics.drawPost('postcontent span2', '', '<i>Most Responded</i> ' + datediff(data[0].posted), data[0].content, data[0].response_count);
				}
			},
			replurk: {
				sort: function(a, b) {
					return b.replurkers_count - a.replurkers_count;
				},
				draw: function(data) {
					data.sort(this.sort);
					if(data) statistics.drawPost('postcontent span2', '', '<i>Most Replurked</i> ' + datediff(data[0].posted), data[0].content, data[0].replurkers_count);
				}
			},
			favorite: {
				sort: function(a, b) {
					return b.favorite_count - a.favorite_count;
				},
				draw: function(data) {
					data.sort(this.sort);
					if(data) statistics.drawPost('postcontent span2', '', '<i>Most Favorited</i> ' + datediff(data[0].posted), data[0].content, data[0].favorite_count);
				}
			}
		};
		var inactive = {
			year: 2020,
			draw: function(data, year) {
				this.year = year;
				statistics.draw('inactive', year, 'You\'ve been inactive since ' + year + ' <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
				statistics.drawPost('postcontent span2', '', '<i>Your last Plurk</i> ' + datediff(data[0].posted), data[0].content, data[0].response_count);
			},
			empty: function() {
				statistics.draw('inactive', '-', 'You haven\t posted anything at all <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
			}
		}

		// Loading
		var loading = {
			count: 0,
			prev_count: 0,
			counts: -1,
			onDone: function(){},
			clean: false,
			init: function() {
				this.count = 0;
				this.prev_count = 0;
				this.counts = -1;
				this.clean = false;
				this.onDone = function(){};
			},
			draw: function(item) {
				var that = this;
				var load = {
					progress: this.prev_count
				};
				this.prev_count = item;

				if(!next.querySelector("#statistics .loading")) {
					statistics.draw("loading", item + "%", "<i class='month'>Data from December</i> 3 of 3. Loading all responses, it can take up to 10 minutes");
				}

				gsap.to(load, {
					progress: Math.round(item),
					snap: "progress",
					ease: "linear",
					duration: .5,
					onUpdate: function () {
						next.querySelector("#statistics .loading .big").innerHTML = load.progress + "%";
					},
					onComplete: function() {
						if(that.clean) that.done();
					}
				});
			},
			loop: function(length) {
				this.clean = true;
				this.counts = length;
				this.draw(0);
			},
			update: function(month) {
				if(month) next.querySelector("#statistics .loading .month").innerHTML = month;
				if (this.counts >= 0) {
					this.count++;
					this.draw(100 * (this.count / this.counts));
				}
			},
			fakeupdate: function() {
				if (this.counts >= 0) {
					this.count++;
					if (this.count >= (this.counts - 10)) this.count = (this.counts - 10);
					this.draw(100 * (this.count / this.counts));
				}
			},
			forcedone: function() {
				this.count = this.counts;
				this.draw(100);
			},
			done: function() {
				var that = this;
				var el = next.querySelector("#statistics .loading");

				if (this.count == this.counts) {
					this.clean = false;
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

		// Show/hide Animations
		// Login Pages
		function showLoginPage(tl) {
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
			}, ">-.2");
			tl.set(next.querySelectorAll("#permission"), {
				position: "",
				top: ""
			});

			return tl;
		}
		function hideLoginPage(tl) {
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
					amount: .4
				},
				duration: 1,
				ease: "power3.out"
			});
			tl.fromTo(next.querySelectorAll("#permission"), {
				opacity: 1
			}, {
				opacity: 0,
				duration: 1,
				ease: "power3.out"
			}, ">-.2");
			tl.set(next.querySelectorAll("#permission"), {
				position: "",
				display: "none",
				top: ""
			});

			return tl;
		}
		// Statistic Pages
		function showStatisticPages(tl) {
			tl.fromTo(next.querySelectorAll(".grant"), {
				display: "",
				opacity: 0
			}, {
				opacity: 1,
				duration: 1
			}, ">-.25");
			tl.fromTo(next.querySelectorAll(".grant .bgtext > *"), {
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
			tl.fromTo(next.querySelectorAll(".grant #logout, .grant .thumbs, .grant .text > *, .grant .arrow-big"), {
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

			return tl;
		}
		function hideStatisticPages(tl) {
			tl.fromTo(next.querySelectorAll(".grant .bgtext > *, .grant .email, .grant .thumbs, .grant .text > *, .grant .arrow-big"), {
				opacity: 1,
				y: 0
			}, {
				opacity: 0,
				y: 200,
				duration: 1,
				stagger: {
					from: "end",
					amount: .4
				},
				ease: "power3.out"
			}, ">-.2");
			tl.fromTo(next.querySelectorAll(".grant"), {
				opacity: 1
			}, {
				opacity: 0,
				duration: 1,
				ease: "power3.out"
			}, ">-.5");
			tl.set(next.querySelectorAll(".grant"), { display: "none" });

			return tl;
		}

		// Login messages
		function message(message, quick) {
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

		// Request permanent token
		function requestPermanentToken(token) {
			var input = next.querySelector("#oauth_token");
			var submit = next.querySelector("#submit");

			submit.innerHTML = "...";
			message("Fetching your data, please wait.");

			api.call("?request=permanenttoken&token=" + token, function(data) {
				login();
			}, function() {
				submit.innerHTML = "Verify";
				input.value = "";
				input.focus();
				requestToken("Your verification code is invalid, please request the code again.");
			});
		}
		// Request token
		function requestToken(text) {
			api.call("?request=token", function(data) {
				var input = next.querySelector("#oauth_token");
				var submit = next.querySelector("#submit");

				next.querySelector("#tokenurl").setAttribute("href", data.message.url);

				if(text) {
					message(text);
				} else  {
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
					});
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
					}, "<");
				}

				input.onkeyup = function(event) {
					if (input.value != "") addClass(submit, "validated");
					else removeClass(submit, "validated");
				}
				submit.onclick = function(event) {
					if(input.value == "") input.focus();
					else {
						input.onkeyup = function() {};
						submit.onclick = function() {};
						requestPermanentToken(encodeURI(input.value));
					}
				};
			}, function(data) {
				message("Error when requesting verification from Plurk, please reload your browser again.");
			});

			if(!text) next.querySelector("#permission form").style.display = "none";
		}
		// Logout
		function requestLogout() {
			var tl = gsap.timeline();

			api.abort();
			clearInterval(interval);

			// Hide statistic pages
			tl = animate.top(tl);
			tl = hideStatisticPages(tl);
			tl.to(next.querySelectorAll("#credits .loading"), {
				opacity: 1,
			});
			tl.set(next, {
				onComplete: function() {
					api.call("?request=logout", function(data) {
						next.querySelector("#oauth_token").value = "";
						next.querySelector("#submit").innerHTML = "Verify";
						message("Click the Verify button to continue.", true);

						login();
					}, function() {
						console.warn("can't logout, but login anyway");

						next.querySelector("#oauth_token").value = "";
						next.querySelector("#submit").innerHTML = "Verify";
						message("Click the Verify button to continue.", true);

						login();
					});
				}
			});
		}
		// Get user avatar
		function getUserAvatar(user_id, target) {
			var avatar = "";
			return avatar;
		}

		// Check login status
		function login(callback) {
			me = {};
			friends.init();
			statistics.init();
			most.init();
			clearInterval(interval);

			api.call("", function(data) {
				me = data.message;

				displayPlurkerData(me, function() {
					var tl = gsap.timeline();

					tl = animate.top(tl);
					// Hide login page
					if (callback) next.querySelector("#permission").style.display = "none";
					else tl = hideLoginPage(tl);
					// Show statistic pages
					tl = showStatisticPages(tl);

					next.querySelector("#logout").onclick = function() {
						requestLogout();
					}

					if(callback) callback();
				});

				displayStatistics();
			}, function() {
				var tl = gsap.timeline();

				// Hide statistic pages
				if (callback) next.querySelectorAll(".grant").forEach(function(el) { el.style.display = "none"; });
				// Show login page
				tl = showLoginPage(tl);

				// Request token
				requestToken();

				if(callback) callback();
			});
		}

		// Display current Plurker data
		function displayPlurkerData(plurker, callback) {
			var join = next.querySelector("#join");
			var extra = "";

			// plurks_count
			var days = (plurker.anniversary.years * 365) + plurker.anniversary.days;
			var responses = Math.round(plurker.response_count / days);

			next.querySelector("#hello .thumbs").innerHTML = "<img src='" + plurker.avatar_big + "' />";
			next.querySelector("#hello .text").innerHTML = "<h1>Hello " + plurker.display_name + "!</h1><p>This is your 2020 Plurks</p>";

			// Draw statistic
			statistics.title('All Time');
			if(plurker.anniversary.years && plurker.anniversary.days) {
				statistics.draw('', plurker.anniversary.years, "You joined Plurk " + plural(plurker.anniversary.years, "year") + " and " + plural(plurker.anniversary.days, "day") + " ago");
				statistics.draw('badges', plurker.badges.length, "You have <i>" + plural(plurker.badges.length, "badge") + "</i> right now");
				statistics.draw('', Math.round(plurker.plurks_count / days), "You posted around <i>" + plural(Math.round(plurker.plurks_count / days), "plurk") + " per day</i>");
				if (responses <= 24) extra = "That's almost 1 response every <i>" + plural(Math.round(24 / responses), "hour") + '</i>';
				else extra = "That's almost 1 response every <i>" + plural(Math.round(24 * 60 / responses), "minute") + '</i>';
				statistics.draw('', responses, "You responded around <i>" + plural(responses, "time") + "</i> per day. " + extra);
			} else {
				statistics.draw('', '-', "There is no data of you joining Plurk");
				statistics.draw('', plurker.badges.length, "But at least you have <i>" + plural(plurker.badges.length, "badge") + "</i> right now");
			}

			// Scroll animation hello section
			scroll.push(function(tl) {
				tl.fromTo(next.querySelectorAll("#hello .text, #hello .thumbs, #hello .arrow-big"), {
					y: 0
				}, {
					y: window.innerHeight * 1/2,
					duration: 1,
					ease: "linear"
				}, 0);
				tl.fromTo(next.querySelectorAll("#hello .bgtext sup, #hello .bgtext sub"), {
					y: 0
				}, {
					y: window.innerHeight * 3/4,
					duration: 1,
					ease: "linear"
				}, 0);
				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: next.querySelectorAll("#hello"),
					start: "0 0",
					end: "100% 0",
					animation: tl,
					scrub: true
				});
			});

			if(callback) callback();
		}
		// Display statistics
		function displayStatistics() {
			var plurk;

			statistics.title('This Year');
			statistics.draw("loading", "", "2 of 3. Loading your 2020 plurks. It can take up to 1 minutes.");

			loading.init();
			loading.loop(100);
			interval = setInterval(function() {
				loading.fakeupdate();
			}, 500);

			// Load 2020 Plurk
			// api.call("?fetch=plurks&filter=my", function(data) {
			api.call("?fetch=plurks&filter=my&loop=5", function(data) {
				plurk = data.message;
				clearInterval(interval);

				loading.forcedone();
			});

			// When loading done
			loading.onDone = function() {
				var date = new Date(plurk[0].posted);

				if (date.getFullYear() == 2020) {
					most.responses.draw(plurk);
					most.replurk.draw(plurk);
					most.favorite.draw(plurk);

					// Draw user statistics
					statistics.plurk_count = plurk.length;
					plurk.forEach(function(value, index) {
						// Calculate the statistics
						if (value.anonymous) statistics.whispers_count++;
						if (value.has_gift) statistics.has_gift_count++;
						if (value.porn) statistics.porn_count++;
						if (!value.response_count) statistics.noresponse_count++;
						if (value.plurk_type == 3) statistics.private_count++;
						statistics.response_count += value.response_count;
					});
					statistics.post_count = statistics.plurk_count + statistics.response_count;
					statistics.drawAll();

					// Display extended statistics
					displayExtendedStatistics(plurk);
				} else {
					if(plurk[0]) inactive.draw(plurk, date.getFullYear());
					else inactive.empty();
				}
			}
		}
		// Display extended statistics
		function displayExtendedStatistics(plurk) {
			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			// Deeper user statistics
			statistics.title('Dig Deeper');
			// Load each post responses and calculate statistics
			loading.init();
			// Start loading
			loading.loop(plurk.length);
			// When loading done
			loading.onDone = function() {
				// Display Most Responder
				most.responders.draw();
				// Display Most Mentioned by me
				most.mentions.draw();
				// Display Most hashtags by me
				most.hashtags.draw();
				// Display Most My Emoticons
				most.myemoticons.draw();
			}

			// Get the data
			plurk.forEach(function(value, index) {
				if(value.responded > 0) {
					// Find and count all my emoticons from my post
					most.myemoticons.count(value.content);
					// Find and count all mentions from my post
					most.mentions.count(value.content_raw);
					// Find and count all hashtags from my post
					most.hashtags.count(value.content_raw);

					// Get the responses for each plurks
					api.call("?fetch=response&plurk_id=" + value.plurk_id, function(data) {
						if(value) {
							var date = new Date(value.posted);
							loading.update("Data from " + monthNames[date.getMonth()]);
						} else {
							loading.update();
						}

						// Attach responses to the post
						var index = plurk.findIndex(function(el) {
							return el.plurk_id == data.message.plurk_id;
						});
						if(index) plurk[index].response = data.message;

						// Add friends from response lists
						friends.add(data.message.friends);

						// Count the rest of statistics
						data.message.responses.forEach(function(value, index) {
							// Find and count all responders
							most.responders.count(data.message, value);

							if (value.user_id == me.id) {
								// Find and count all my emoticons from responses
								most.myemoticons.count(value.content);
								// Find and count all my mentions from responses
								most.mentions.count(value.content_raw);
								// Find and count all my hashtags from responses
								most.hashtags.count(value.content_raw);
							}
						});
					}, function(data) {
						console.log("Fail", data);
					}, false);
				}
			});
		}

		// Run the login
		gsap.fromTo(next.querySelectorAll('#credits'), {
			opacity: 0
		}, {
			opacity: 1,
			onComplete: function() {
				login(function () {
					gsap.to(next.querySelectorAll('#credits .text .loading'), {
						opacity: 0
					});

					done();
				});
			}
		});
	},
	beforeLeave: function(data) {
		var next = data.next.container;
		next.querySelector("#oauth_token").onkeyup = function() {};
		next.querySelector("#submit").onclick = function() {};
	}
}