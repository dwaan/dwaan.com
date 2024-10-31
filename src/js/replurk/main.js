"use strict";

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
import statistics from "./statistics.js"

class replurk {
	constructor(year) {
		// Draw in which element?
		this.next = document.createElement('div');
		// Plurks array
		this.plurks = [];
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
		this.year = year;
		this.startDate = this.year + '-10-29T09:00:00';
		this.endDate = new Date((this.year - 1) + '-10-29T09:00:00');
		this.days = 60 * 60 * 24 * 1000;
		this.fulldays = 365;
	}

	// Show/hide Animations
	// Login Pages
	showLoginPage(tl) {
		var next = this.next;
		var length = reduceMotionFilter(1);

		browser.set("green", 1);
		tl.fromTo(next.querySelectorAll("#permission"), {
			position: "fixed",
			display: "",
			opacity: 0,
			top: 0
		}, {
			opacity: 1,
			duration: length,
			ease: "power3.in"
		});
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
				});
			}
		}, ">-" + (length / 2));

		return tl;
	}
	hideLoginPage(tl) {
		var next = this.next;
		var length = reduceMotionFilter(1);

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
				amount: length / 5
			},
			duration: length,
			ease: "power3.in",
			onComplete: () => {
				browser.set("yellow");
			}
		});
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
				}, ">");
			}
		}, ">-" + (length / 4));

		return tl;
	}
	// Statistic Pages
	showStatisticPages() {
		return new Promise(resolve => {
			var next = this.next;
			var length = reduceMotionFilter(1);
			var tl = gsap.timeline();

			tl.fromTo(next.querySelectorAll("#hello"), {
				display: "",
				opacity: 0
			}, {
				opacity: 1,
				ease: "power3.in",
				duration: length,
				onStart: () => browser.set("green", .5)
			}, length / 4);
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
			}, length / 2);
			tl.fromTo(next.querySelectorAll(" #hello .thumbs, #hello .text > *, #hello .arrow-big"), {
				display: "",
				opacity: 0,
				y: 200
			}, {
				opacity: 1,
				y: 0,
				duration: length,
				stagger: length / 5,
				ease: "power3.out"
			}, length / 2);
			tl.fromTo(next.querySelectorAll(".grant:not(#hello), .statistics"), {
				display: "",
				opacity: 0
			}, {
				opacity: 1,
				duration: length / 2,
				onComplete: () => resolve()
			}, length / 2);
		});
	}
	hideStatisticPages() {
		return new Promise(async resolve => {
			var next = this.next;
			var length = reduceMotionFilter(1);
			var tl = gsap.timeline();

			await animate.top(next);

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
			}, length / 5);
			tl.set(next.querySelectorAll(".grant:not(#hello), .statistics"), {
				opacity: 0
			}, length / 2);
			tl.fromTo(next.querySelectorAll("#hello"), {
				opacity: 1
			}, {
				opacity: 0,
				duration: length,
				ease: "power3.in",
				onComplete: () => {
					gsap.set(next.querySelectorAll(".grant"), { display: "none" });
					resolve();
				}
			}, length / 2);
		});
	}

	// Access logic
	// Login messages
	message(message, quick) {
		var next = this.next;

		var loginmessage = next.querySelector("#login-message");

		if (quick) {
			loginmessage.innerHTML = message;
		} else {
			gsap.to(loginmessage, {
				opacity: 0,
				onComplete: function () {
					loginmessage.innerHTML = message;
					gsap.to(loginmessage, {
						opacity: 1
					});
				}
			});
		}
	}
	// Check login status
	async login(clear) {
		var next = this.next;

		this.me = { id: 0 }
		this.plurks = [];

		scroll.destroy();

		window.scrollTo(0, 0);
		browser.set("yellow");

		// Scroll animation menu and logout
		this.scrolls.menu();

		// Check is server have open session
		var tl = gsap.timeline();
		tl.set(next.querySelector("#hello .arrow-big"), {
			opacity: 0
		});

		let data = await api.call("?");
		var interval = null;
		if (data.success) {
			this.me = data.message
			this.friends = new friends()
			this.statistics = new statistics(next, this.me, this.friends, this.year)

			// Initial Plurk statistics
			await this.displayPlurkerData();

			// Display the rest of the statistics
			this.displayStatistics();

			// Scroll top top
			await animate.top(next);

			// Hide login page
			if (clear) next.querySelector("#permission").style.display = "none";
			else tl = this.hideLoginPage(tl);

			// Show statistic pages
			await this.showStatisticPages(tl);

			// Add logout event
			next.querySelector("#logout").onclick = () => this.logout();

			// Scroll animate statistics
			this.scrolls.statistics();
			// Scroll browser bar
			this.scrolls.browserBar();
		} else {
			// Hide statistic pages
			if (clear) next.querySelectorAll(".grant").forEach(function (el) { el.style.display = "none"; });
			// Show login page
			this.showLoginPage(tl);
			// Request token
			this.token();

			// Scroll animation permission section
			this.scrolls.permisions();
			// Scroll browser bar
			this.scrolls.browserBar(false);

			// Automatic login
			interval = setInterval(async () => {
				var data = await api.call("?");

				if (data.success) {
					clearInterval(interval);
					this.login();
				}
			}, 3000);
		}

		scroll.refresh();

		// Snap
		next.querySelectorAll("section.snap").forEach(el => scroll.snap(el));
		next.querySelectorAll("section.snap-bottom").forEach(el => scroll.snap(el, "bottom"));
	}
	// Logout
	async logout() {
		var tl = gsap.timeline();

		api.abort();

		// Hide statistic pages
		await this.hideStatisticPages(tl);

		// Logout
		await api.call("?fetch=logout");
		this.statistics.clear();

		// Disconnect any api connection
		api.clear();

		// Display login
		this.login();

		scroll.refresh();
	}
	// Request token
	async token(text) {
		var next = this.next;
		var length = reduceMotionFilter(1);
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
			duration: length,
			ease: "power3.out"
		}, length);
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
		}, length);

		api.call("?request=token").then(data => {
			if (text) {
				this.message(text);
			} else {
				tokenlink.textContent = "Grant Access";
				tokenlink.setAttribute("href", api.url + "?redirect=" + data.message.url);
			}
		}, () => {
			this.message("Error when requesting verification from Plurk, please reload your browser again.");
		});

		if (!text) next.querySelector("#permission form").style.display = "none";
	}
	// Display LocalStorage stats
	info() {
		function getStorageSize() {
			var totalBytes = 0;

			for (var key in localStorage) {
				if (localStorage.hasOwnProperty(key)) {
					var itemValue = localStorage.getItem(key);
					totalBytes += itemValue.length;
				}
			}

			// Convert bytes to Megabytes
			var totalMegabytes = Math.round((totalBytes / 1024 / 1024) * 100) / 100;

			return totalMegabytes;
		}

		// Usage
		var storageSize = getStorageSize();
		console.info('Storage Size: ' + storageSize + ' MB');
	}

	// Rendering statistics
	// Display current Plurker data
	async displayPlurkerData() {
		var plurker = this.me;
		var next = this.next;
		var extra = "";
		var length = reduceMotionFilter(1);

		// plurks_count
		var days = (plurker.anniversary.years * 365) + plurker.anniversary.days;
		var responses = Math.round(plurker.response_count / days);

		next.querySelector("#hello .thumbs").innerHTML = "<img src='" + plurker.avatar_big + "' />";
		if (this.year == 2021) next.querySelector("#hello .text").innerHTML = "<h1>Hello " + plurker.display_name + "</h1><p style='max-width: 500px; margin: 0 auto'>If " + this.year + " have been a rough year you, hopefully RePlurk will cheer you by bringing some good memories</p>";
		else if (this.year == 2022) next.querySelector("#hello .text").innerHTML = "<h1>Hello " + plurker.display_name + "</h1><p style='max-width: 500px; margin: 0 auto'>It's 2020 v2, and this is your year end RePlurk recap. Hopefully it will bring lots of good memories.</p>";
		else next.querySelector("#hello .text").innerHTML = "<h1>Hello " + plurker.display_name + "</h1><p style='max-width: 500px; margin: 0 auto'>This is your year end RePlurk recap. Hopefully it will bring lots of good memories.</p>";

		// Draw statistic
		this.statistics.title('All Time', 'alltime');
		if (plurker.anniversary.years && plurker.anniversary.days) {
			this.statistics.draw('spansmall center posted', Math.round(plurker.plurks_count / days), 'I posted around <i><img src="https://api.iconify.design/fluent-emoji:left-speech-bubble.svg" /> ' + plural(Math.round(plurker.plurks_count / days), "plurk") + " per day</i>");

			// Responses
			var oneday = 16;
			if (responses <= oneday) extra = "That's almost 1 response every <i>" + plural(Math.round(oneday / responses), "hour") + '</i>';
			else extra = "That's almost 1 response every <i>" + plural(Math.round(oneday * 60 / responses), "minute") + '</i>';
			this.statistics.draw('span2 center responded', responses, 'I responded around <i><img src="https://api.iconify.design/fluent-emoji:left-speech-bubble.svg" /> ' + plural(responses, "time") + "</i> per day. " + extra + " when I'm not sleeping");

			var join = new Date(plurker.join_date)
			this.statistics.draw('spansmall center anniversary', "<strong><i>" + monthNames[join.getMonth()] + "</i> <i>" + join.getFullYear() + "</i></strong> <em>" + join.getDate() + "</em>", "I joined Plurk <i>" + plural(plurker.anniversary.years, "year") + "</i> and <i>" + plural(plurker.anniversary.days, "day") + "</i> ago");
			this.statistics.draw('spansmall center badges', plurker.badges.length, "I have <i><img src='https://api.iconify.design/fluent-emoji:shield.svg' /> " + plural(plurker.badges.length, "badge") + "</i> right now");
		} else {
			this.statistics.draw('', '-', "There is no data in my timeline");
			this.statistics.draw('', plurker.badges.length, "But at least I have <i>" + plural(plurker.badges.length, "badge") + "</i> right now");
		}

		// Scroll animation hello section
		scroll.push(tl => {
			tl.fromTo(next.querySelectorAll("#hello .text, #hello .thumbs"), {
				y: 0
			}, {
				y: window.innerHeight * -3 / 4,
				ease: "linear",
				duration: length,
			}, 0);
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
			}, 0);
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
			}, 0);
			tl.fromTo(next.querySelectorAll("#hello .arrow-big"), {
				y: 0,
				opacity: 1
			}, {
				y: window.innerHeight * 1 / 4,
				opacity: 0,
				ease: "linear",
				duration: length / 4,
			}, 0);
			return tl;
		}, tl => ScrollTrigger.create({
			trigger: next.querySelectorAll("#hello"),
			start: "0 0",
			end: "100% 0",
			animation: tl,
			scrub: true
		}));

		scroll.refresh();
	}
	// Display statistics
	async displayStatistics() {
		this.statistics.title('This Year', 'thisyear');
		this.statistics.draw("statistics-loading thisyearloading", "", "<i class='month'>Data from December</i>1 of 2. Loading " + this.year + " timeline. It can take up to 1 minute.");

		this.loading = new loading(this.next);
		this.loading.loop(this.fulldays);

		// Load loop timeline
		var getTimeline = async (offset) => {
			offset = (!offset) ? "" : "&offset=" + offset;

			var data = await api.call("?fetch=plurk&filter=my" + offset, 1);
			if (data.success) {
				this.friends.add(data.message.plurk_users);
				this.plurks = this.plurks.concat(data.message.plurks);

				if (data.message.plurks.length > 0) {
					var lastposted = new Date(this.plurks[this.plurks.length - 1].posted);

					if (lastposted >= this.endDate) {
						this.loading.update("Data from " + monthNames[lastposted.getMonth()] + " " + lastposted.getFullYear(), this.fulldays - Math.floor((lastposted - this.endDate) / this.days));

						// Load next plurks
						await getTimeline(data.message.offset);
					} else {
						while (lastposted < this.endDate && this.plurks.length > 1) {
							this.plurks.pop();
							lastposted = new Date(this.plurks[this.plurks.length - 1].posted);
						}
						await this.loading.forcedone();
					}
				} else {
					await this.loading.forcedone();
				}
			} else {
				this.logout();
			}
		}
		await getTimeline(this.startDate);

		// When loading done
		var largest_poll_result = 0;
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

					if (plurk.content_raw.includes("instagram.com")) this.statistics.instagrammer_count++;
					if (plurk.content_raw.includes("facebook.com")) this.statistics.facebooker_count++;
					else if (plurk.content_raw.includes("fb.watch")) this.statistics.facebooker_count++;
					if (plurk.content_raw.includes("twitter.com")) this.statistics.twitterer_count++;
					if (plurk.content_raw.includes("reddit.com")) this.statistics.redditor_count++;
					if (plurk.content_raw.includes("tiktok.com")) this.statistics.tiktoker_count++;
					if (plurk.content_raw.includes("imgur.com")) this.statistics.imgurer_count++;
					if (plurk.content_raw.includes("youtube.com")) this.statistics.youtuber_count++;

					// Calculate polls
					if (plurk.with_poll) {
						var response_count = plurk.poll.response.response_count;
						this.statistics.poll_count++;
						this.statistics.poll_responder_count += response_count;

						if (largest_poll_result < response_count) {
							largest_poll_result = response_count;
							this.statistics.poll_popular_plurk = plurk;
						}
					}
				} else if (plurk.responded) this.statistics.responded_other_count++;
			});

			// Sort based on date
			this.plurks.sort((a, b) => new Date(b.posted) - new Date(a.posted));

			// Draw statistics
			try {
				await this.statistics.drawAll(this.plurks);
			} catch (error) {
				console.info("Error while counting statistics", error);
			}

			// Display extended statistics
			this.displayExtendedStatistics();
		} else {
			if (this.plurks[0]) {
				var date = new Date(plurk[0].posted);
				this.statistics.inactive.draw(plurk[0], date.getFullYear());
			}
			else this.statistics.inactive.empty();
		}

		scroll.refresh();
	}
	// Display extended statistics
	async displayExtendedStatistics() {
		// Deeper user statistics
		this.statistics.title('Dig Deeper', 'digdeeper');
		this.statistics.draw("statistics-loading digdeeperloading", "", "<i class='month'>Data from " + this.year + "</i> 2 of 2. Loading all responses. <small>If the loading seems to stop, refresh your browser tab to resume your download. Closing your browser tab will clear all downloaded data.</small>");

		// Load each post responses and calculate statistics
		this.loading = new loading(this.next);
		this.loading.loop(this.plurks.length);

		// Get the responses for each plurks in parallel
		this.plurks.sort((a, b) => new Date(a.posted) < new Date(b.posted));
		for (var plurk of this.plurks) {
			var date = new Date(plurk.posted);
			this.loading.update("Data from " + monthNames[date.getMonth()] + " " + date.getFullYear());

			// Count all
			await this.statistics.most.countAll(plurk);

			// Count responses
			if (plurk.response_count > 0 && (plurk.responded || plurk.owner_id == this.me.id)) {
				var result = await api.call("?fetch=response&plurk_ids=" + plurk.plurk_id);
				if (result.success) for (var message of result.message) {
					// Add friends from response lists
					this.friends.add(message.friends);

					// Count the rest of statistics
					for (var response of message.responses) {
						// Find and count all responders
						await this.statistics.most.responders.count(response);
						this.statistics.most.interaction.count(response);
						this.statistics.most.mvp.count(response, "response");
						// Count all
						await this.statistics.most.countAll(response);
					}
				} else {
					this.logout();
					break;
				}
			}
		}

		// Display How Many Links
		this.statistics.most.links.drawLinks();
		// Display How Many Pictures
		this.statistics.most.links.drawPics();

		// Draw Results
		// Display Most Responder
		// this.statistics.most.responders.draw();

		// Display Most Interaction
		this.statistics.most.interaction.draw();

		// Display Most Mentioned by me
		// this.statistics.most.mentions.draw();

		// Display How Many Words-Characters
		this.statistics.most.types.draw();

		// Display Most hashtags by me
		this.statistics.most.hashtags.draw();

		// Display Most My Emoticons
		this.statistics.most.myemoticons.draw();

		// Display MVP
		this.statistics.replurker_list.forEach(value => {
			this.statistics.most.mvp.count({ user_id: value.id, count: value.count }, "replurk");
		});
		this.statistics.favorite_list.forEach(value => {
			this.statistics.most.mvp.count({ user_id: value.id, count: value.count }, "favorite");
		});
		this.statistics.most.mvp.draw();

		// Replurk Badges
		var gender = "<img src='https://api.iconify.design/fluent-emoji:crown.svg' /> Leader";
		if (this.me.gender == 1) gender = "<img src='https://api.iconify.design/fluent-emoji:crown.svg' /> King";
		if (this.me.gender == 0) gender = "<img src='https://api.iconify.design/fluent-emoji:crown.svg' /> Queen";

		var tiktok = "<img src='https://api.iconify.design/fluent-emoji:mirror-ball.svg' />";
		if (this.me.gender == 1) tiktok = "<img src='https://api.iconify.design/fluent-emoji:man-dancing-medium-dark-skin-tone.svg' />";
		if (this.me.gender == 0) tiktok = "<img src='https://api.iconify.design/fluent-emoji:woman-dancing-medium-dark-skin-tone.svg' />";

		var facebook = "<img src='https://api.iconify.design/fluent-emoji:older-person.svg' />";
		if (this.me.gender == 1) facebook = "<img src='https://api.iconify.design/fluent-emoji:old-man.svg' />";
		if (this.me.gender == 0) facebook = "<img src='https://api.iconify.design/fluent-emoji:old-woman.svg' />";

		var plurker = "<img src='https://api.iconify.design/fluent-emoji:person-bowing.svg' />";
		if (this.me.gender == 1) plurker = "<img src='https://api.iconify.design/fluent-emoji:man-bowing.svg' />";
		if (this.me.gender == 0) plurker = "<img src='https://api.iconify.design/fluent-emoji:woman-bowing.svg' />";

		this.statistics.title('RePlurk Badges', 'replurkbadges');
		this.statistics.body(`\
			<h4>What are RePlurk Badges consist of?</h4>\
			<p>They are badges based on your activities in Plurk. Currently there are 16 badges in total, for activities such as:</p>\
			<ol>\
				<li>Creating lots of polls (Polling ${gender})</li>\
				<li>Receiving lots of coins (Plurk Coins Billionaire)</li>\
				<li>Writing lots of posts (Novelist and Keyboard Warrior)</li>\
				<li>Sharing lots of pictures and links (Meme Lord & Missing Link)</li>\
				<li>Sharing social medias urls (there are 7 badges)</li>\
				<li>Posting lots of adult posts (Adult-er)</li>\
				<li>Getting lots of replurks (Trendsetter)</li>\
				<li>and, Constantly posting in Plurk almost everyday (Active Plurker)</li>\
			</ol>\
			`, `replurkbadges description`);
		if (this.statistics.poll_count >= 5) this.statistics.draw('span1 badges pollbadges', "<img src='https://api.iconify.design/fluent-emoji:ballot-box-with-ballot.svg' />", "<strong>Polling " + gender + "</strong>");
		if (this.statistics.coins_count >= 5) this.statistics.draw('span1 badges coinbadges', "<img src='https://api.iconify.design/fluent-emoji:coin.svg' />", "<strong>Plurk Coins Billionaire</strong>");
		if (this.statistics.most.types.words >= 50000) this.statistics.draw('span1 badges novelistbadges', "<img src='https://api.iconify.design/fluent-emoji:orange-book.svg' />", "<strong>Novelist</strong>");
		if (this.statistics.most.types.chars >= 1000000) this.statistics.draw('span1 badges keyboardbadges', "<img src='https://api.iconify.design/fluent-emoji:keyboard.svg' />", "<strong>Keyboard Warrior</strong>");
		if (this.statistics.most.links.pics.length >= 356) this.statistics.draw('span1 badges memebadges', "<img src='https://api.iconify.design/fluent-emoji:cat.svg' />", "<strong>Meme Lord</strong>");
		if (this.statistics.most.links.links.length >= 356 / 2) this.statistics.draw('span1 badges missingbadges', "<img src='https://api.iconify.design/fluent-emoji:orangutan.svg' />", "<strong>The Missing Link</strong>");
		if (this.statistics.instagrammer_count >= 10) this.statistics.draw('span1 badges socmedbadges', "<img src='https://api.iconify.design/fluent-emoji:camera.svg' />", "<strong>Instagrammer</strong>");
		if (this.statistics.facebooker_count >= 10) this.statistics.draw('span1 badges socmedbadges', facebook, "<strong>Facebooker</strong>");
		if (this.statistics.twitterer_count >= 10) this.statistics.draw('span1 badges socmedbadges', "<img src='https://api.iconify.design/fluent-emoji:hatching-chick.svg' />", "<strong>The Real Chief Twit</strong>");
		if (this.statistics.redditor_count >= 10) this.statistics.draw('span1 badges socmedbadges', "<img src='https://api.iconify.design/fluent-emoji:robot.svg' />", "<strong>/r</strong>");
		if (this.statistics.tiktoker_count >= 10) this.statistics.draw('span1 badges socmedbadges', tiktok, "<strong>Tiktoker</strong>");
		if (this.statistics.imgurer_count >= 10) this.statistics.draw('span1 badges socmedbadges', "<img src='https://api.iconify.design/fluent-emoji:framed-picture.svg' />", "<strong>Imgur-er</strong>");
		if (this.statistics.youtuber_count >= 10) this.statistics.draw('span1 badges socmedbadges', "<img src='https://api.iconify.design/fluent-emoji:movie-camera.svg' />", "<strong>Youtuber <img src='https://api.iconify.design/fluent-emoji:sleepy-face.svg' /></strong>");
		if (this.statistics.porn_count >= 10) this.statistics.draw('span1 badges adultbadges', "<img src='https://api.iconify.design/fluent-emoji:face-with-peeking-eye.svg' />", "<strong>Adult-er</strong>");
		if (this.statistics.replurker_count >= 50) this.statistics.draw('span1 badges plurkerbadges', "<img src='https://api.iconify.design/fluent-emoji:trophy.svg' />", "<strong>Trendsetter</strong>");
		if (this.statistics.plurks_count >= 356 * 1.5) this.statistics.draw('span1 badges plurkerbadges', "<img src='https://api.iconify.design/fluent-emoji:military-medal.svg' />", "<strong>Active Plurker " + plurker + "</strong>");

		this.info();

		scroll.refresh();
	}

	// Main entry
	// Run this to start the API
	run(el) {
		return new Promise(resolve => {
			var length = reduceMotionFilter(1);
			this.next = el;
			browser.set("yellow");

			// Run the login
			gsap.fromTo(this.next.querySelectorAll('#credits'), {
				opacity: 0
			}, {
				opacity: 1,
				duration: length,
				ease: "power3.in",
				onComplete: async () => {
					// Change color
					browser.set("yellow", 0);

					// Display login
					await this.login(true);

					resolve();
				}
			});
		});
	}
}

export default replurk;