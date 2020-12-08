'use strict';
var REPORTSIZE = false;

var gToArray = gsap.utils.toArray;
var gRandom = gsap.utils.random;


// Logo SVG
var logosvg = _q(".logo").innerHTML;


//////////////// Dark Mode
var darkmode = false;
function toggleDarkMode() {
	if (darkmode) addClass(_q("html"), "dark");
	else removeClass(_q("html"), "dark");
}
if (window.matchMedia){
	var darkmodemedia = window.matchMedia('(prefers-color-scheme: dark)');
	var setdarkmode = function(e) {
		if (e.matches) darkmode = true;
		else darkmode = false;
	}
	setdarkmode(darkmodemedia);
	darkmodemedia.addListener(function(e) {
		setdarkmode(e);
		toggleDarkMode();
	});
}


// HTML Log
function log(params) {
	console.log(params);
	_q("#log").innerHTML = params;
}


function plural(number, word, locale) {
	if(!locale) locale = "en-US";
	if (number > 1) return number.toLocaleString(locale) + " " + word + "s";
	else return number.toLocaleString(locale) + " " + word;
}
function datediff(date) {
	var when = "";
	var today = new Date();
	date = new Date(date);

	var diff = today.getTime() - date.getTime();
	var diffday = Math.round(diff / (1000 * 3600 * 24));
	var diffmonth = Math.round(diff / (30.5 * 1000 * 3600 * 24));
	var diffyear = Math.round(diff / (12 * 30.5 * 1000 * 3600 * 24));

	if (diffyear == 1) when = "A year ago";
	else if (diffyear > 1) when = diffyear + " years ago";
	else if (diffmonth > 1) when = diffmonth + " months ago";
	else if (diffmonth == 1) when = "A month ago";
	else if (diffday >= 14) when = round(diffday / 7) + " weeks ago";
	else if (diffday >= 7) when = "A week ago";
	else if (diffday == 1) when = "Yesterday";
	else if (diffday > 1) when = diffday + " days ago";
	// else when = "Today at " + date_format(date,"H:i");
	else when = "Today";

	return when;
}

// Report size of window
if (REPORTSIZE) {
	console.info("Window:", window.innerWidth, window.innerHeight);
	console.info("Body:", _q("body").offsetWidth, _q("body").offsetHeight);
	window.addEventListener('resize', function() {
		console.info("Window:", window.innerWidth, window.innerHeight);
		console.info("Body:", _q("body").offsetWidth, _q("body").offsetHeight);
	});
}

// Clear the style
var removeStyle = function(el) {
	if (el.style) {
		el.style = {};
	} else {
		gToArray(el).forEach(function(el) {
			removeStyle(el);
		});
	}
}

// Displaying rounded corner only on fullscreen
var displayRoundedCorner = function() {
	if (window.innerWidth == screen.width && window.innerHeight == screen.height) {
		addClass(_q("html"), "rounded");
	} else {
		removeClass(_q("html"), "rounded");
	}
}
displayRoundedCorner();
window.addEventListener('resize', displayRoundedCorner);


////////// Initial

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Predefined scroll animation
var scroll = {
	l: 0,
	tl: [],
	st: [],
	// Move elements up with opacity with scrub
	moveText: function(params) {
		if (!params) return false;

		var elements = (params.elements)? params.elements: [];
		var position = (params.position)? params.position: "85%";
		var delta = (params.delta)? params.delta: 100;
		var move = (params.move === undefined)? true: params.move;
		var markers = (params.markers)? params.markers: false;
		var horizontal = (params.horizontal)? params.horizontal: false;
		var that = this;

		gToArray(elements).forEach(function(element, index) {
			var y = delta + (15 * index);
			var trigger = (params.trigger)? params.trigger: element.parentNode;
			if (!move) y = 0;

			that.l = that.tl.push(gsap.timeline()) - 1;

			if (horizontal) {
				that.tl[that.l].fromTo(element, {
					x: y,
					opacity: 0,
				}, {
					x: 0,
					opacity: 1,
					ease: "ease.out"
				}, 0);
			} else {
				that.tl[that.l].fromTo(element, {
					y: y,
					opacity: 0,
				}, {
					y: 0,
					opacity: 1,
					ease: "ease.out"
				}, 0);
			}


			that.st.push(ScrollTrigger.create({
				markers: markers,
				trigger: trigger,
				start: "0 " + position,
				end:  "+=175 " + position,
				scrub: 1,
				animation: that.tl[that.l]
			}));
		});
	},
	// Move elements up without scrub
	moveThumbs: function(elements, position) {
		var that = this;

		if (!position) position = "85%";
		gToArray(elements).forEach(function(element) {
			var y = gRandom(250, 500, 5) + "px";

			that.l = that.tl.push(gsap.timeline()) - 1;
			that.tl[that.l].fromTo(element, {
				y: y
			}, {
				y: 0,
				duration: .75,
			}, 0);

			that.st.push(ScrollTrigger.create({
				trigger: element.parentNode,
				start: "0 " + position,
				end: "0 " + position,
				toggleActions: "restart none none reverse",
				animation: that.tl[that.l]
			}));
		});
	},
	// Add custom animation
	push: function(animationFunction, scrollFunction) {
		if (!animationFunction || !scrollFunction) return false;

		this.l = this.tl.push(gsap.timeline()) - 1;

		if (typeof animationFunction === "function") {
			this.tl[this.l] = animationFunction(this.tl[this.l]);
		}

		if (typeof scrollFunction === "function") {
			this.st.push(scrollFunction(this.tl[this.l]));
		}
	},
	// Call this to remove garbage
	destroy: function() {
		// Cleaning up GSAP timeline
		for (var i = 0; i < this.tl.length; i++) {
			this.tl[i].kill();
		}
		this.tl = [];
		// Cleaning up ScrollTrigger
		for (var i = 0; i < this.st.length; i++) {
			this.st[i].kill();
		}
		this.st = [];
		//
		this.l = 0;
	}
}

// API call helper
var api = {
	url: "/dwaan/plurk-api",
	request: [],
	call: function(url, success, error, async) {
		var request = this.request[this.request.push(new XMLHttpRequest()) - 1];

		if (!async) async = true;
		request.open('GET', this.url + url, async);
		request.onload = function() {
			if (this.status == 200) {
				if(success) success(JSON.parse(this.response));
			} else if (this.status != 0) {
				if(error) error(this.response);
			}
		}
		request.send();
	},
	abort: function() {
		console.log("abort xhr")
		for (var i = 0; i < this.request.length; i++) {
			this.request[i].abort();
		}
		this.request = [];
	}
}

// Loader functions
var loader = {
	el: _q("#loader"),
	update: function(percent) {
		gsap.to(this.el.querySelectorAll(".loading"), {
			width: percent + "%"
		})
	},
	clean: function() {
		this.el.innerHTML = "";
	},
	init: function(done) {
		var that = this;

		document.body.style.cursor = "wait";
		if (done === true) {
			// Simple style
			this.el.innerHTML = '<p class="simple" style="opacity: 0;"><span><i class="loading" style="width:0%"></i></span></p>';
		} else {
			// Progress bar type
			this.el.innerHTML = '<p class="normal" style="opacity: 0;"><span>Downloading</span> <span><i class="loading" style="width:0%"></i></span></p>';
		}
		gsap.set(this.el, {
			y: 0,
			opacity: 1
		});

		if (typeof done === "function") done();
	},
	show: function (els, done) {
		if (typeof done != "function") return false;

		// Wait for all images to be loaded
		var that = this;
		var _percent = { score: 0 };

		// Animate the loading
		gsap.fromTo(that.el.children, {
			opacity: 0,
		}, {
			opacity: 1,
			ease: "expo",
			delay: .25,
			duration: .5
		});

		// Calling loading images function
		if (els) {
			waitForImg(els.querySelectorAll("img"), function(index, percent) {
				gsap.to(_percent, {
					score: percent,
					roundProps: "score",
					duration: .1,
					onUpdate: function() {
						that.update(_percent.score);
					}
				});
			}, function() {
				that.hide(function() {
					that.clean();
					done();
				});
			});
		} else {
			that.hide(function() {
				that.clean();
				done();
			});
		}
	},
	hide: function(done) {
		if (typeof done !== "function") return false;

		var that = this;

		gsap.killTweensOf(that.el.children);
		gsap.to(that.el.children, {
			opacity: 0,
			ease: "expo.in",
			duration: .25,
			onComplete: function() {
				done();
			}
		});
	},
	empty: function() {
		this.clean();
		document.body.style.cursor = "";
		gsap.set(this.el, {
			y: "-100%",
			opacity: 0
		});
	}
}

// Animate functions
var animate = {
	top: function(tl) {
		if (tl == null) tl = gsap;

		// Scroll to top
		var scroll = (document.body.scrollTop || document.documentElement.scrollTop) / (window.outerHeight * 2);
		if (scroll > 0) {
			tl.to(window, {
				scrollTo: 0,
				duration: (scroll > 2)? 2 : scroll,
				ease: "expo.inOut"
			}, 0);
		}

		return tl
	},
	show: function (next, done, nonsticky, footer){
		if (next == undefined) return false;
		if (nonsticky == undefined) nonsticky = false;
		if (footer == undefined) footer = true;

		// Default gsap timeline value
		var tl = gsap.timeline({ defaults: {
			duration: 1,
			stagger: .1,
			ease: "expo.out"
		}});

		// Unhide main element
		tl.set(next, {
			opacity: 1
		}, 0);

		if (typeof done !== "function") return false;

		// Show current view
		var els = next.querySelectorAll(".flares:not(.side)")
		if (footer) els = next.querySelectorAll(".flares:not(.side), .footer > *");
		if (!nonsticky) nonsticky = next.querySelector("section.middle").children;
		// Animate text
		tl.fromTo([nonsticky, els], {
			y: "+=200px",
			opacity: 0
		}, {
			y: "-=200px",
			opacity: 1
		}, 0);
		// Animate flare
		tl.fromTo(next.querySelectorAll(".flares.side > img"), {
			x: "+=300px",
			opacity: 0
		}, {
			x: "-=300px",
			opacity: 1
		}, 0);
		// Run done after all all animation complete
		tl.set(next, {
			onComplete: function() {
				done();
			}
		});
	},
	showinstant: function (next, done){
		if (next == undefined) return false;

		// Unhide main element
		gsap.set(next, { opacity: 1 }, 0);

		// Run done after all all animation complete
		done();
	},
	show404: function (next, done){
		if (next == undefined) return false;

		// Default gsap timeline value
		var tl = gsap.timeline({ defaults: {
			duration: 1,
			stagger: .1,
			ease: "expo.out"
		}});

		// Unhide main element
		tl.set(next, {
			opacity: 1
		}, 0);

		if (typeof done !== "function") return false;

		// Show current view
		// Animate text
		tl.fromTo(next.querySelectorAll(".text > *"), {
			y: "+=200px",
			opacity: 0
		}, {
			y: "-=200px",
			opacity: 1,
			onCompleteParams: [[next.querySelectorAll(".text > *")]],
			onComplete: function(els) {
				removeStyle(els);
				done();
			}
		}, 0);
		tl.fromTo(next.querySelectorAll("#lost h2"), {
			x: "-=300",
			opacity: 0
		}, {
			x: 0,
			opacity: 1,
			stagger: .1
		}, 0);
		// Animate Mr. Monkey
		var mrmonkey = next.querySelectorAll("#mrmonkey");
		tl.fromTo(mrmonkey, {
			y: "-100%"
		}, {
			y: "-50%",
			rotation: 5,
			duration: 4,
			ease: "elastic"
		}, .5);
		tl.to(mrmonkey, {
			y: "-32.5%",
			rotation: -2.5,
			duration: 5,
			ease: "expo"
		});
		tl.to(mrmonkey, {
			y: "-10%",
			rotation: 0,
			duration: 5,
			ease: "elastic.out"
		});
		tl.to(mrmonkey, {
			y: "-5%",
			rotation: 0,
			duration: 5,
			ease: "expo"
		});
		tl.to(mrmonkey, {
			y: "0%",
			duration: 5,
			repeat: -1,
			yoyo: true,
			ease: "back.out"
		});
	},
	hide: function (current, done, nonsticky, scrolltop) {
		if (current == undefined) return false;
		if (typeof done !== "function") return false;
		if (nonsticky == undefined) nonsticky = false;
		if (scrolltop == undefined) scrolltop = true;

		// Default gsap timeline value
		var tl = gsap.timeline({ defaults: {
			duration: .75,
			ease: "power3.in",
			stagger: {
				from: "end",
				amount: .1
			}
		}});

		// Scroll to top
		if (scrolltop) tl = this.top(tl);

		// Hide current view
		tl.to(current.querySelectorAll(".flares:not(.side), .menu-page ol > li, .footer > *"), {
			y: "+=200",
			opacity: 0
		}, ">");
		tl.to(current.querySelectorAll(".flares.side img"), {
			x: "+=300",
			opacity: 0,
			delay: .1
		}, "<");
		if (!nonsticky) nonsticky = current.querySelector("section.middle").children;
		tl.to(nonsticky, {
			y: "+=200",
			opacity: 0,
			delay: .2
		}, "<");

		// Run loading after all animation
		tl.set(current, {
			onComplete: function() {
				done();
			}
		});
	},
	hide404: function (current, done){
		if (current == undefined) return false;
		if (typeof done !== "function") return false;

		// Default gsap timeline value
		var tl = gsap.timeline({ defaults: {
			duration: .75,
			ease: "power3.in",
			stagger: {
				from: "end",
				amount: .1
			}
		}});

		// Hide current view
		tl.to(current.querySelectorAll(".thumbs"), {
			y: "-80%",
			opacity: 0
		}, ">");
		tl.to(current.querySelectorAll("#lost h2"), {
			x: 0,
			opacity: 0,
			stagger: .1
		}, "<");
		tl.to(current.querySelectorAll(".text"), {
			y: "+=300",
			opacity: 0
		}, "<");

		// Run loading after all animation
		tl.set(current, {
			onComplete: function() {
				done();
			}
		});
	},
}

// Helper distributeByPosition
function distributeByPosition(vars) {
	var ease = vars.ease,
		from = vars.from || 0,
		base = vars.base || 0,
		axis = vars.axis,
		ratio = {center: 0.5, end: 1, edges:0.5}[from] || 0,
		distances;
	return function(i, target, a) {
		var l = a.length,
			originX, originY, x, y, d, j, minX, maxX, minY, maxY, positions;
		if (!distances) {
			distances = [];
			minX = minY = Infinity;
			maxX = maxY = -minX;
			positions = [];
			for (j = 0; j < l; j++) {
				d = a[j].getBoundingClientRect();
				x = (d.left + d.right) / 2; //based on the center of each element
				y = (d.top + d.bottom) / 2;
				if (x < minX) {
					minX = x;
				}
				if (x > maxX) {
					maxX = x;
				}
				if (y < minY) {
					minY = y;
				}
				if (y > maxY) {
					maxY = y;
				}
				positions[j] = {x:x, y:y};
			}
			originX = isNaN(from) ? minX + (maxX - minX) * ratio : positions[from].x || 0;
			originY = isNaN(from) ? minY + (maxY - minY) * ratio : positions[from].y || 0;
			maxX = 0;
			minX = Infinity;
			for (j = 0; j < l; j++) {
				x = positions[j].x - originX;
				y = originY - positions[j].y;
				distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs((axis === "y") ? y : x);
				if (d > maxX) {
					maxX = d;
				}
				if (d < minX) {
					minX = d;
				}
			}
			distances.max = maxX - minX;
			distances.min = minX;
			distances.v = l = (vars.amount || (vars.each * l) || 0) * (from === "edges" ? -1 : 1);
			distances.b = (l < 0) ? base - l : base;
		}
		l = (distances[i] - distances.min) / distances.max;
		return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
	};
}

// Snap functions
var snap = function(elements, snapPosition, markers) {
	if (snapPosition == undefined) snapPosition = 1;
	if (markers == undefined) markers = false;
	if (typeof elements === "string") elements = gToArray(elements);
	// Snap scroll to block
	elements.forEach(function(element, index) {
		scroll.push(function(tl) {
			return tl;
		}, function (tl) {
			return ScrollTrigger.create({
				markers: markers,
				id: "snap",
				trigger: element,
				start: "0 0",
				end: "100% 0",
				onUpdate: function(value){
					this.progress = value.progress;
					this.direction = value.direction;
				},
				snap: {
					snapTo: function(value) {
						var snap = this.progress;

						if (snapPosition == 1) {
							if (this.progress < .2 && this.direction > 0) snap = 0;
							else if (this.progress > .8 && this.direction < 0) snap = 1;
							else if (this.direction > 0) snap = 1;
						} else if (snapPosition == 2) {
							if (this.progress < .2 && this.direction > 0) snap = 0;
							else if (this.progress > .8 && this.direction < 0) snap = 1;
							else if (this.direction > 0) snap = 1;
							else snap = 0;
						} else if (snapPosition < .5 && this.progress > (1 - snapPosition)) {
							snap = 1;
						} else if (snapPosition < .5 && this.progress < snapPosition) {
							snap = 0;
						}

						return snap;
					},
					delay: 0,
					duration: {
						min: .5,
						max: 2
					},
					ease: "expo.out"
				},
				animation: tl
			});
		});
	});
}

// Some browser have flexible toolbar size, like in safari mobile
var deltatoolbar = (_q("#loader").offsetHeight - window.innerHeight) / 2;
// Add padding to browser with variable toolbar size
function addpadding() {
	_qAll("section.middle").forEach(function (el, idx) {
		el.style.paddingBottom = "";
		gsap.set(el, {
			paddingBottom: "+=" + deltatoolbar
		});
	});
}
addpadding();
window.addEventListener("resize", addpadding);

// Default barba hooks
barba.hooks.before(function(data) {
	api.abort();
	return true;
});
barba.hooks.beforeEnter(function(data) {
	var done = this.async();
	var next = data.next.container;

	// Destroy prev scroll
	scroll.destroy();

	window.scrollTo(0, 0);

	if (data.next.namespace != "plurk") {
		// Scroll animate arrow
		var middle = next.querySelectorAll("section.middle");
		middle.forEach(function (el, idx) {
			var arrow = el.querySelectorAll(".year, .arrow-big, .arrow-small");
			if (arrow.length > 0) {
				var scrollfunc = function(tl) {
					return ScrollTrigger.create({
						trigger: el,
						start: "0 50%",
						end: "100% 50%",
						scrub: true,
						animation: tl
					})
				};

				// Animate arrow
				ScrollTrigger.matchMedia({
					"(max-aspect-ratio: 1/1)": function() {
						scroll.push(function(tl) {
							// Show
							tl.fromTo(arrow, {
								position: "relative",
								y: (idx > 0) ? "-100%" : 0,
								opacity: 0
							}, {
								y: "0%",
								opacity: 1,
								ease: "linear"
							});
							// Hide
							tl.fromTo(arrow, {
								y: "0%",
								opacity: 1
							}, {
								y: (idx < middle.length - 1) ? "100%" : 0,
								opacity: 0,
								ease: "linear"
							});

							return tl;
						}, scrollfunc);
					},
					"(min-aspect-ratio: 1/1)": function() {
						scroll.push(function(tl) {
							// Show
							tl.fromTo(arrow, {
								position: "absolute",
								x: (idx > 0) ? -50 : 0,
								y: 0,
								opacity: (idx > 0) ? 0 : 1
							}, {
								position: "fixed",
								x: 0,
								y: 0,
								opacity: 1,
								duration: 3,
								ease: "power3.out"
							});
							// Delay
							tl.to(arrow, {
								duration: 2
							});
							// Hide
							tl.fromTo(arrow, {
								position: "fixed",
								x: 0,
								y: 0,
								opacity: 1
							}, {
								x: (idx > 0 && idx < middle.length - 1) ? 50 : 0,
								y: (idx == 0) ? window.innerHeight *  -1/5 : 0,
								opacity: (idx < middle.length - 1) ? 0 : 1,
								ease: "power3.in",
								duration: 3
							});
							tl.set(arrow, {
								position: "absolute"
							});

							return tl;
						}, scrollfunc);
					}
				});
			}
		});
	}

	// Add additional padding
	addpadding();

	done();
});
barba.hooks.afterEnter(function(data) {
	var done = this.async();
	var next = data.next.container;

	// Read more
	next.querySelectorAll("a.scrollto").forEach(function(a) {
		a.addEventListener("click", function(e) {
			gsap.to(window, {
				duration: 1,
				ease: "expo.inOut",
				scrollTo: e.target.getAttribute("href")
			});
			e.preventDefault();
		});
	});

	done();
});

// Initialized barba.js
barba.init({
	debug: false,
	transitions: [{
		name: 'default-transition',
		once: function(data) {
			// Define async and next container
			var done = this.async();
			var next = data.next.container;

			// Display loading
			loader.init();
			// Loading logic
			loader.show(next, function() {
				// Animate current view and header
				if (data.next.namespace == "lost") {
					animate.show404(next, function() {
						loader.empty();
						done();
					});
				} else if (data.next.namespace == "plurk") {
					animate.showinstant(next, function() {
						loader.empty();
						done();
					});
				} else {
					animate.show(next, function() {
						loader.empty();
						done();
					});
				}
			});

			// Animate header showing
			gsap.set("header", {
				opacity: 1
			});
			gsap.fromTo("header .logo, header .size, header .lamp, header .switch", {
				y: -200,
				opacity: 0
			}, {
				y: 0,
				opacity: 1,
				duration: 1,
				ease: "expo.out",
				delay: .5,
				stagger: .1
			});

			// Logo events
			gToArray('header .logo').forEach(function(el, id) {
				// Waving animation
				var lefthand = el.querySelector(".left-hand");
				var waving = gsap.timeline({ repeat: -1, defaults: { transformOrigin: "99% 0", duration: .25, ease: "linear", yPercent: 20 }});
				waving
					.set(lefthand, { yPercent: 0, rotation: 0 })
					.to(lefthand, { duration: .25, rotation: 70 })
					.fromTo(lefthand, { rotation: 70 }, { rotation: 60, repeat: 2, yoyo: true })
					.to(lefthand, { duration: .25, yPercent: 0, rotation: 0 })
					.to(lefthand, { yPercent: 0, duration: 10 });
				// Hat move on hover
				var hat = el.querySelector(".hat");
				hoverEvents([el], function() {
					gsap.to(hat, {
						transformOrigin: "50% 75%",
						yPercent: -3,
						xPercent: -1,
						rotation: 5,
						duration: 1,
						ease: "elastic.out"
					});
					waving.restart();
				},
				function() {
					gsap.to(hat,{
						transformOrigin: "50% 75%",
						yPercent: 0,
						xPercent: 0,
						rotation: 0,
						duration: 1,
						ease: "elastic.out"
					});
				});
			});

			// Menu events
			gToArray('header .switch').forEach(function(el, id) {
				// Hat move on hover
				var menu = el.querySelectorAll("svg line");
				var tl = gsap.timeline();
				tl.set(menu, {
					x: 0
				});
				tl.to(menu, {
					x: -32,
					duration: .25,
					ease: "expo.in",
					stagger: .1
				});
				tl.fromTo(menu, {
					x: 32
				}, {
					x: 0,
					duration: .25,
					ease: "expo.out",
					stagger: .1
				});
				tl.to(menu, {
					duration: 1
				});
				tl.pause(.1);
				hoverEvents([el], function() {
					tl.repeat(-1).restart();
				}, function() {
					tl.repeat(0);
				});
			});

			// Main menu
			gToArray("header .menu").forEach(function(el, id) {
				var overlay = el.querySelector(".overlay");
				var items = el.querySelector(".items");

				// Show menu animation
				el.querySelector(".switch").addEventListener("click", function(e) {
					e.preventDefault();

					if (!gsap.isTweening(items)) {
						// Animate main element
						gsap.to("main .middle", {
							marginLeft: "-=100",
							duration: .75,
							ease:"power3.out"
						});
						gsap.to("main .middle > .text", {
							marginLeft: "-=50",
							duration: .75,
							ease:"power3.out"
						});
						gsap.to("main .links, main .flares", {
							marginLeft: "-=25",
							duration: .75,
							ease:"power3.out"
						});
						// Animate overlay background
						gsap.to(overlay, {
							backgroundColor: "rgba(0,0,0,.5)",
							duration: 1,
							ease:"power3.out"
						});
						// Animate menu showing
						gsap.set(overlay, {
							display: "flex",
							onComplete: function() {
								gsap.fromTo(items.querySelectorAll("li"), {
									x: 50,
									opacity: 0
								}, {
									x: 0,
									opacity: 1,
									ease: "expo.out",
									delay: .25,
									stagger: .1,
									duration: .65
								});

								gsap.fromTo(items, {
									x: "100%"
								}, {
									x: 0,
									ease: "power3.out",
									duration: .75
								});
							}
						});
					}
				});
				// Hide menu animation
				el.querySelectorAll(".overlay, li a, .close").forEach(function(link) {
					link.addEventListener("click", function(e) {
						e.preventDefault();
						if (this != e.target) return false;

						if (!gsap.isTweening(items)) {
							// Animate main element
							gsap.to("main .middle, main .middle > .text, main .links, main .flares", {
								marginLeft: 0,
								duration: .75,
								ease:"power3.out"
							});
							// Animate overlay background
							gsap.to(overlay, {
								backgroundColor: "rgba(0,0,0,0)",
								duration: 1,
								ease:"power3.out"
							});
							// Animate menu
							gsap.fromTo(items, {
								x: 0
							}, {
								x: "100%",
								ease: "power3.out",
								duration: .75,
								onComplete: function() {
									gsap.set(overlay, {
										display: "none"
									});
								}
							});
						}
					});
				});
			});

			// Dark mode switcher
			gToArray("header .lamp").forEach(function(el, id) {
				el.addEventListener("click", function(e) {
					e.preventDefault();
					darkmode = !darkmode;
					toggleDarkMode();
				});
			});

			// Text switcher
			gToArray("header .size").forEach(function(el, id) {
				var tl = gsap.timeline();
				tl.to(el, {
					scale: 1.25,
					duration: .5,
					ease: "elastic.out"
				});
				tl.to(el, {
					scale: 1.5,
					duration: .5,
					ease: "elastic.out"
				});
				tl.to(el, {
					scale: 1,
					duration: 1
				});
				tl.to(el, {
					duration: 5
				});
				tl.pause();
				hoverEvents([el], function() {
					tl.repeat(-1).restart();
				},
				function() {
					tl.repeat(0);
				});
				if (!window.resizefontevent) {
					window.resizefontevent = true;
					window.addEventListener("resize", function() {
						window.fontSize = false;
						_q("html").style.fontSize = "";
					});
				}
				el.addEventListener("click", function(e) {
					var delta = 1;
					var howmany = 3;
					var fontSize = Number(window.getComputedStyle(_q("html"))['font-size'].replace('px',''))
					if (!window.fontSize) window.fontSize = fontSize;

					fontSize += delta;
					if (fontSize - (delta * howmany) > window.fontSize) fontSize = window.fontSize;

					_q("html").style.fontSize = fontSize + "px";
				});
			});
		},
		leave: function(data) {
			return true;
		},
		before: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init();

			// Hide current view
			animate.hide(current, function() {
				// Image loading logic
				loader.show(next, function(){
					done();
				});
			});
		},
		enter: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Reset current element values
			current.style.position = "fixed";
			current.style.opacity = 0;
			if (current.querySelector(".arrow-big")) current.querySelector(".arrow-big").style.opacity = 0;

			// Animate current view
			animate.show(next, function() {
				done();
			});
		},
		after: function(data) {
			loader.empty();

			return true;
		},
	}, {
		name: 'home-to-detail',
		leave: function(data) {
			return true;
		},
		before: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init(true);

			// Hide current view
			animate.hide(current, function() {
				// Image loading logic
				loader.show(next, function(){
					done();
				});
			}, current.querySelectorAll(".arrow"), false);
		},
		enter: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Reset current element values
			current.style.position = "fixed";
			current.style.opacity = 0;
			next.style.position = "fixed";
			next.style.opacity = 1;

			// Animate Next view
			animate.show(next, function() {
				done();
			}, next.querySelectorAll(".arrow, .year"));
		},
		after: function(data) {
			var next = data.next.container;

			// Reset current element values
			removeStyle(next);
			next.style.opacity = 1;

			// Remove loading
			loader.empty();

			return true;
		},
		from: {
			namespace: ['home']
		},
		to: {
			namespace: ['detail']
		}
	}, {
		name: 'home-to-me',
		leave: function(data) {
			return true;
		},
		before: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init(true);

			// Hide current view
			animate.hide(current, function() {
				// Kill scrollbar
				gsap.set(current, {
					position: "fixed",
					top: 0,
					zIndex: 2
				});
				gsap.set(next, {
					position: "fixed",
					top: 0,
					zIndex: 1
				});

				// Image loading logic
				loader.show(next, function(){
					done();
				});
			}, current.querySelectorAll(".arrow"));
		},
		enter: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Reset current element values
			removeStyle(current.querySelectorAll(".main-text, .main-text > h1"));

			// Animate Next view
			animate.show(next, function() {
				done();
			}, next.querySelectorAll(".arrow"));
		},
		after: function(data) {
			var next = data.next.container;

			// Reset current element values
			removeStyle(next);
			next.style.opacity = 1;

			// Remove loading
			loader.empty();

			return true;
		},
		from: {
			namespace: ['home', "me"]
		},
		to: {
			namespace: ['home', 'me']
		}
	}, {
		name: 'home-to-hi',
		leave: function(data) {
			return true;
		},
		before: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;
			var elements = ".arrow-small a, .arrow";

			// Display loading
			loader.init(true);

			// Image loading logic
			loader.show(next, function(){
				var tl = gsap.timeline({ defaults: {
					duration: .75,
					stagger: .1,
					ease: "power3.out"
				}});
				var from = {
						position: "fixed",
						display: "flex",
						height: "auto",
						top: "initial",
						left: window.getComputedStyle(current.querySelector(".footer"))['padding-left'],
						bottom: window.getComputedStyle(current.querySelector(".footer"))['padding-bottom'],
						x: "0%",
						y: "0%",
						lineHeight: "15px",
						fontSize: "0.8rem",
						fontWeight: 400,
						letterSpacing: "0.1em"
					},
					to = {
						left: window.innerWidth / 2,
						bottom: window.innerHeight / 2,
						x: "-50%",
						y: "50%",
						lineHeight: "80%",
						fontSize: "6rem",
						fontWeight: 500,
						letterSpacing: "-0.06em",
						duration: 1,
						ease: "expo.inOut",
						onComplete: function() {
							// Show next container
							gsap.set(next, { opacity: 1 });
							// Show next elements
							gsap.set(next.querySelector(".footer"), { opacity: 1 });

							done();
						}
					};

				tl.to(current.querySelectorAll(".flares > img"), {
					x: "-=200",
					opacity: 0
				}, 0);
				tl.to(current.querySelectorAll(".middle > *"), {
					opacity: 0
				}, .25);
				if (window.matchMedia('(min-aspect-ratio: 1/1)').matches) {
					tl.fromTo(current.querySelector(".footer .email"), from, to, 0);
				} else {
					tl.set(next, {
						onComplete: function() {
							done();
						}
					});
				}
			});
		},
		enter: function(data) {
			var done = this.async();
			var next = data.next.container;

			// Animate current view if needed
			if (window.matchMedia('(max-aspect-ratio: 1/1)').matches) {
				// Show next container
				next.style.opacity = 1;

				// Show next elements
				next.querySelector(".footer").stlye.opacity = 1;
				gsap.fromTo(next.querySelector(".main-text"), {
					opacity: 0,
					y: "100%"
				}, {
					opacity: 1,
					y: "0%",
					duration: .5,
					ease: "expo.out",
					onComplete: function() {
						done();
					}
				});
			} else {
				done();
			}
		},
		after: function(data) {
			// Remove loading
			loader.empty();

			return true;
		},
		from: {
			namespace: ['home']
		},
		to: {
			namespace: ['hi']
		}
	}, {
		name: 'hi-to-home',
		leave: function(data) {
			return true;
		},
		before: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init();

			var tl = gsap.timeline({ defaults: {
				duration: .75,
				stagger: .1,
				ease: "power3.out"
			}});

			var from = {
					position: "fixed",
					height: "auto",
					top: "initial",
					left: window.innerWidth / 2,
					bottom: window.innerHeight / 2,
					x: "-50%",
					y: "50%",
					lineHeight: "80%",
					fontSize: "6rem",
					fontWeight: 500,
					letterSpacing: "-0.06em"
				},
				to = {
					left: gsap.getProperty(current.querySelector(".footer"), "padding-left"),
					bottom: gsap.getProperty(current.querySelector(".footer"), "padding-bottom"),
					x: "0%",
					y: "0%",
					lineHeight: "15px",
					fontSize: "0.8rem",
					fontWeight: 400,
					letterSpacing: "0.1em",
					duration: 1,
					ease: "expo.inOut",
					onComplete: function() {
						// Selectively show next elements
						gsap.set(next.querySelectorAll(".footer .email"), { opacity: 1 });
					}
				};

			current.querySelector(".main-text").style = {};

			// For vertical screen, just fade in.
			if (window.matchMedia('(max-aspect-ratio: 1/1)').matches) {
				from.opacity = 1;
				to.left = from.left;
				to.bottom = from.bottom;
				to.x = from.x;
				to.y = from.y;
				to.lineHeight = from.lineHeight = "90%";
				to.fontSize = from.fontSize;
				to.fontWeight = from.fontWeight;
				to.letterSpacing = from.letterSpacing;
				to.opacity = 0;
			}

			tl.fromTo(current.querySelector(".main-text h1"), from, to, 0);
			// Show next container
			tl.set(current, {
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: 2,
			}, 0);
			tl.set(next, {
				zIndex: 1,
				opacity: 1
			}, 0);
			tl.set(next.querySelectorAll(".footer"), { opacity: 1 }, 0);
			tl.set(next.querySelectorAll(".footer .email"), { opacity: 0 }, 0);
			tl.set(next, {
				onComplete: function() {
					// Image loading logic
					loader.show(next, function(){
						done();
					});
				}
			}, .25);
		},
		enter: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;
			var elements = ".main-text, .arrow";

			// Animate current view
			animate.show(next, function() {
				done();
			}, next.querySelectorAll(elements), false);
		},
		after: function(data) {
			// Remove loading
			loader.empty();

			return true;
		},
		from: {
			namespace: ['hi']
		},
		to: {
			namespace: ['home']
		}
	}, {
		name: 'from-lost',
		leave: function(data) {
			return true;
		},
		before: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init();

			// Hide current view
			animate.hide404(current, function() {
				// Image loading logic
				loader.show(next, function(){
					done();
				});
			});
		},
		enter: function(data) {
			var done = this.async();
			var next = data.next.container;

			// Animate current view
			animate.show(next, function() {
				done();
			});
		},
		after: function(data) {
			// Remove loading
			loader.empty();

			return true;
		},
		from: {
			namespace: ['lost']
		}
	}, {
		name: 'to-lost',
		leave: function(data) {
			return true;
		},
		before: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init();

			// Hide current view
			animate.hide(current, function() {
				// Image loading logic
				loader.show(next, function(){
					done();
				});
			});
		},
		enter: function(data) {
			var done = this.async();
			var next = data.next.container;

			// Animate current view
			animate.show404(next, function() {
				done();
			});
		},
		after: function(data) {
			// Remove loading
			loader.empty();

			return true;
		},
		to: {
			namespace: ['lost']
		}
	}, {
		name: 'from-plurk',
		leave: function(data) {
			return true;
		},
		before: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;
			var tl = gsap.timeline();

			// Display loading
			loader.init();

			// Hide current view
			tl = animate.top(tl);
			tl.set(current.querySelectorAll("#credits"),  {
				opacity: 0
			}, "hide");
			tl.to(current.querySelectorAll("#hello .bgtext sub, #permission .bgtext sub"),  {
				y: 100,
				opacity: 0,
				duration: 1,
				ease: "power3.in"
			}, "hide");
			tl.to(current.querySelectorAll("#hello .bgtext sup, #permission .bgtext sup"),  {
				y: -100,
				opacity: 0,
				duration: 1,
				ease: "power3.in"
			}, "hide");
			tl.to(current.querySelectorAll("#hello .text, #hello .thumbs, #hello .arrow-big, .footer,  #permission form"),  {
				y: 500,
				opacity: 0,
				duration: 1,
				ease: "power3.in"
			}, "hide+=.2");
			tl.to(current.querySelectorAll("#hello, #permission"),  {
				opacity: 0,
				duration: 1,
				ease: "power3.in"
			}, "hide+=.4");
			tl.set(current, {
				onComplete: function() {
					done();
					gsap.set(current.querySelectorAll("#credits"),  {
						opacity: 1
					});
				}
			});
		},
		enter: function(data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Reset current element values
			current.style.position = "fixed";
			current.style.opacity = 0;
			if (current.querySelector(".arrow-big")) current.querySelector(".arrow-big").style.opacity = 0;

			// Animate current view
			animate.show(next, function() {
				done();
			});
		},
		after: function(data) {
			// Remove loading
			loader.empty();

			return true;
		},
		from: {
			namespace: ['plurk']
		}
	}],
	views: [{
		namespace: 'home',
		beforeEnter: function(data) {
			var next = data.next.container;

			// Aggresive Snap
			snap(next.querySelectorAll("section.middle"), 2);

			// Scroll animate arrow
			var els = next.querySelectorAll("section.middle");
			els.forEach(function (el, idx) {
				var maintext = el.querySelectorAll(".main-text > h1, .padding > a");

				// Animate text
				scroll.push(function(tl) {
					//Show
					tl.fromTo(maintext, {
						y: (idx > 0) ? window.innerHeight / -8 : 0
					}, {
						y: 0,
						ease: "linear",
						duration: 3
					}, 0);
					tl.fromTo(maintext, {
						opacity: 0
					}, {
						opacity: 1,
						ease: "power3.out",
						duration: 2
					}, 0);
					// Hide
					tl.fromTo(maintext, {
						y: 0
					}, {
						y: (idx < els.length - 1) ? window.innerHeight / 8 : 0,
						ease: "linear",
						duration: 3
					}, 3);
					tl.fromTo(maintext, {
						opacity: 1
					}, {
						opacity: 0,
						ease: "power3.in",
						duration: 2
					}, 4);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: el,
						start: "0 50%",
						end: "100% 50%",
						scrub: true,
						animation: tl
					})
				});
			});

			// Scroll animate flares
			scroll.push(function(tl) {
				tl.to(next.querySelectorAll(".flares > img"), {
					x: "random(10, 50, 5)%",
					ease: "linear"
				}, 0);

				return tl;
			}, function (tl) {
				return ScrollTrigger.create({
					trigger: next,
					start: "0 0",
					end: "100% 100%",
					scrub: true,
					animation: tl
				});
			});
		}
	}, {
		namespace: 'detail',
		beforeEnter: function(data) {
			var next = data.next.container;

			// Performace hog in firefox
			// Create shadow based on content
			next.querySelectorAll("picture").forEach(function(el) {
				// el.insertAdjacentHTML('beforeend', ("<span class='shadow' style='background-image:url(" + el.querySelector("img").getAttribute("src") + ")' />"));
			});

			// Style - Spread
			next.querySelectorAll(".style-spread").forEach(function(el) {
				// Move the text
				scroll.moveText({
					elements: el.querySelectorAll(".titles > *, p")
				});
				// Scroll animation
				ScrollTrigger.defaults({
					trigger: el.querySelectorAll(".thumbs"),
					toggleActions: "restart none none reverse"
				});
				ScrollTrigger.matchMedia({
					"(max-aspect-ratio: 1/1)": function() {
						scroll.push(function(tl) {
							tl.fromTo(el.querySelectorAll(".pic-4"), {
								top: "random(250, 500, 5)px",
								left: "50%",
								x: "-20%",
								rotation: 0
							}, {
								top: 0,
								left: "50%",
								rotation: 7.5,
								ease: "expo.out"
							}, 0);

							tl.fromTo(el.querySelectorAll(".pic-5"), {
								top: "random(250, 500, 5)px",
								left: "initial",
								right: "50%",
								x: "20%",
								rotation: 0
							}, {
								top: 0,
								right: "50%",
								rotation: -7.5,
								ease: "expo.out"
							}, 0);

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								start: "0 75%",
								end: "100% 75%",
								animation: tl,
								scrub: 1
							});
						});
					},
					"(min-aspect-ratio: 1/1)": function() {
						// Move the pictures
						scroll.push(function(tl) {
							tl.fromTo(el.querySelectorAll(".pic-4"), {
								top: "random(50, 100, 5)%",
								left: "random(300, 400, 5)%",
								x: 0,
								y: 0,
								rotation: "random(15, 25, 1)"
							}, {
								top: "25%",
								left: "50%",
								rotation: -10,
								duration: 1,
								ease: "expo.out"
							}, .1);

							tl.fromTo(el.querySelectorAll(".pic-5"), {
								top: "random(50, 100, 5)%",
								left: "random(300, 400, 5)%",
								x: 0,
								y: 0,
								rotation: 0
							}, {
								top: "40%",
								left: "10%",
								rotation: -30,
								duration: 1,
								ease: "expo.out"
							}, 0);

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								start: "-25% 50%",
								end: "50% 50%",
								scrub: 1,
								animation: tl
							});
						});
					}
				});
				// Reset
				ScrollTrigger.defaults({});
			});

			// Style - Spread Left
			next.querySelectorAll(".style-spread-left").forEach(function(el) {
				// Move the text
				scroll.moveText({
					elements: el.querySelectorAll(".titles > *, p")
				});
				// Scroll animation
				ScrollTrigger.defaults({
					trigger: el.querySelectorAll(".thumbs")
				});
				ScrollTrigger.matchMedia({
					"(max-aspect-ratio: 1/1)": function() {
						scroll.push(function(tl) {
							tl.fromTo(el.querySelectorAll(".thumbs picture"), {
								opacity: 0,
								y: "random(250, 500, 5)px",
							}, {
								opacity: 1,
								y: 0,
								ease: "expo.out"
							}, 0);

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								start: "0 75%",
								end: "100% 75%",
								animation: tl,
								scrub: 1
							});
						});
					},
					"(min-aspect-ratio: 1/1)": function() {
						// Move the pictures
						scroll.push(function(tl) {
							tl.fromTo(el.querySelectorAll(".thumbs picture"), {
								x: "random(-250, -500, 5)px",
								rotation: gRandom(5, 10, 1)
							}, {
								x: 0,
								rotation: -5,
								ease: "expo.out"
							}, 0);

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								start: "-50% 50%",
								end: "50% 50%",
								scrub: 1,
								animation: tl
							});
						});
					}
				});
				// Reset
				ScrollTrigger.defaults({});
			});

			// Style - Top
			next.querySelectorAll(".style-top").forEach(function(el) {
				// Move text
				scroll.moveText({
					elements: el.querySelectorAll(".text h2, .text li")
				});
				// Move thumbnails
				ScrollTrigger.matchMedia({
					"(max-aspect-ratio: 1/1)": function() {
						scroll.push(function(tl) {
							tl.fromTo(el.querySelectorAll(".thumbs"), {
								x: 500
							}, {
								x: -500,
								ease: "linear"
							}, 0);

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								trigger: el,
								start: "-50% 0",
								end:  "100% 0",
								scrub: .75,
								animation: tl
							});
						});
					},
					"(min-aspect-ratio: 1/1)": function() {
						scroll.push(function(tl) {
							tl.fromTo(el.querySelectorAll(".thumbs"), {
								x: 500
							}, {
								x: -500,
								ease: "linear",
								duration: 5,
							}, 0);

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								trigger: el,
								start: "-25% 0",
								end:  "200% 0",
								scrub: .75,
								animation: tl
							});
						});
					}
				});
				// Move thumbnail again
				scroll.moveThumbs(el.querySelectorAll(".thumbs > picture"));
			});

			// Style - Top
			next.querySelectorAll(".style-top-text").forEach(function(el) {
				// Move text
				scroll.moveText({
					elements: el.querySelectorAll(".text h2, .text li")
				});
			});

			// Style - Bottom
			next.querySelectorAll(".style-bottom-logo").forEach(function(el) {
				// Move text
				scroll.moveText({
					elements: el.querySelectorAll(".text > *")
				});
				// Move logo
				scroll.push(function(tl) {
					tl.fromTo(el.querySelectorAll(".thumbs"), {
						x: -100,
						y: 300,
						rotation: 20,
					}, {
						x: 0,
						y: 0,
						rotation: 0,
						duration: 1,
						ease: "expo.out"
					}, 0);

					tl.fromTo(el.querySelectorAll(".thumbs li"), {
						y: 100
					}, {
						y: 0,
						stagger: {
							from: "start",
							amount: .2
						},
						duration: .5,
						ease: "expo.out"
					}, 0);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: el,
						start: (window.innerHeight * 1/4) + " " + (window.innerHeight * 3/4),
						end: (window.innerHeight * 3/4) + " " + (window.innerHeight * 3/4),
						scrub: 1,
						animation: tl
					});
				});
			});

			// Style - Flex
			next.querySelectorAll(".style-flex").forEach(function(el) {
				// Move text
				scroll.moveText({
					elements: el.querySelectorAll(".style-column > *"),
					position: "100%"
				});
			});

			// Style - Trunc
			next.querySelectorAll(".style-trunc").forEach(function(el) {
				// Move text
				scroll.moveText({
					elements: el.querySelectorAll(".text > *, .color ul > *"),
					position: "100%",
					horizontal: true
				});
			});

			// Style - Masonry
			next.querySelectorAll(".style-masonry").forEach(function(el) {
				var thumbs = el.querySelectorAll(".thumbs");
				var alltext = el.querySelectorAll(".text > *");

				ScrollTrigger.matchMedia({
					"(max-aspect-ratio: 1/1)": function() {
						// Rotate masonry
						gsap.set(thumbs, {
							opacity: 1,
							rotation: -5
						});

						// Scroll up
						scroll.push(function(tl) {
							for (var index = 1; index <= 4; index++) {
								var yplus = gRandom(250, 750, 25),
										y = 25;

								if (index == 3) yplus = 0;
								if (index % 2 == 0) y = -25;

								tl.fromTo(el.querySelectorAll(".thumbs > *:nth-child(4n+" + index + ")"), {
									y: y + yplus,
								}, {
									y: y,
									ease: "ease"
								}, 0);
							}

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								trigger: el,
								start: "-25% 100%",
								end:  "100% 50%",
								scrub: .75,
								animation: tl
							});
						});

						// Scroll left
						scroll.push(function(tl) {
							tl.fromTo(thumbs, {
								x: 0,
							}, {
								x: -50,
								ease: "linear"
							}, 0);

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								trigger: el,
								start: "-25% 100%",
								end:  "100% 50%",
								scrub: true,
								animation: tl
							});
						});

						// Move text
						scroll.moveText({
							delta: 25,
							elements: alltext,
							position: "75%"
						});

						// Move masonry
						scroll.moveText({
							elements: thumbs
						});
					},
					"(min-aspect-ratio: 1/1)": function() {
						// Rotate masonry
						gsap.set(thumbs, {
							rotation: 0
						});

						// Scroll
						scroll.push(function(tl) {
							for (var index = 1; index <= 4; index++) {
								var yplus = gRandom(250, 1000, 25),
										y = 50;

								if (index == 3) yplus = 0;
								if (index % 2 == 0) y = -50;

								tl.fromTo(el.querySelectorAll(".thumbs > *:nth-child(4n+" + index + ")"), {
									y: y + yplus,
								}, {
									y: y,
									ease: "ease"
								}, 0);
							}

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								trigger: el,
								start: "-25% 100%",
								end:  "100% 50%",
								scrub: gRandom(75, 125, 5) / 100,
								animation: tl
							});
						});

						// Move text
						scroll.moveText({
							elements: alltext,
							position: "75%"
						});

						// Move masonry
						scroll.moveText({
							elements: thumbs
						});
					}
				});
			});


			// Style - Angled
			next.querySelectorAll(".style-angled").forEach(function(el) {
				var elPicture = el.querySelectorAll(" .thumbs > picture");
				// Move pictures
				scroll.moveThumbs(elPicture, "75%");
				// Scroll pictures
				ScrollTrigger.matchMedia({
					"(max-aspect-ratio: 1/1)": function() {
						scroll.push(function(tl) {
							gToArray(elPicture).forEach(function(picture) {
								tl.fromTo(picture, {
									rotation: -5,
									x: 650,
								}, {
									rotation: -5,
									x: -150
								}, 0);
							});

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								trigger: el,
								endTrigger: ".links",
								start: "0 100%",
								end: "100% 100%",
								scrub: .75,
								animation: tl
							});
						});
					},
					"(min-aspect-ratio: 1/1)": function() {
						scroll.push(function(tl) {
							elPicture.forEach(function(picture) {
								tl.fromTo(picture, {
									rotation: 0,
									x: 500,
								}, {
									rotation: 0,
									x: -500
								}, 0);
							});

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								trigger: el,
								endTrigger: ".links",
								start: "0 100%",
								end: "100% 100%",
								scrub: .75,
								animation: tl
							});
						});
					}
				});
				// Move text
				scroll.moveText({
					elements: el.querySelectorAll(" .text > *"),
					position: "85%"
				});
			});

			// Style - Slideshow
			// Full and big
			next.querySelectorAll(".style-slideshow").forEach(function(el) {
				// Add navigation
				el.insertAdjacentHTML('beforeend', "<div class='before'></div><div class='after'></div>");
				// Variables
				var that = el;
				that.slideshowScroll = that.children[0];
				that.slideshowParent = that.querySelector("ul");
				that.slideshowChild = that.slideshowScroll.querySelectorAll("li");
				that.l = gToArray(that.slideshowChild).length;
				that.pos = 0;
				that.pos_start = true;
				that.pos_end = false;
				that.before = that.children[1];
				that.after = that.children[2];
				// Fixed size
				that.fixedSize = function() {
					var width = 0;
					var height = 0;

					gToArray(that.slideshowChild).forEach(function(element) {
						element.style.removeProperty('width');
						gsap.set(element, {
							width: element.offsetWidth
						});
						width += element.offsetWidth;
					});

					gsap.set(that.slideshowParent, {
						width: width
					})

					return width;
				}
				that.fixedSize();
				window.addEventListener("resize", that.fixedSize);
				// Check position
				that.checkPos = function () {
					var rect = this.slideshowParent.getBoundingClientRect();

					this.pos_start = this.pos_end = false;
					this.pos = Math.round((rect.left * -1) / this.slideshowChild[this.pos].offsetWidth);

					if (this.pos == 0) this.pos_start = true;
					if ((Math.round(rect.width) + rect.left - this.slideshowScroll.offsetWidth) <= 10) this.pos_end = true;

					return this.pos;
				}
				// Show / hide navigation
				that.navigationHide = function () {
					that.checkPos();
					gsap.to(that.before, {
						duration: .25,
						opacity: (that.pos_start)? .15 : 1
					});
					gsap.to(that.after, {
						duration: .25,
						opacity: (that.pos_end)? .15 : 1
					});
				}
				that.navigationHide();
				// Scroll events
				gToArray(that.slideshowChild).forEach(function(element, index) {
					scroll.push(function(tl) {
						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: element,
							scroller: that.slideshowScroll,
							horizontal: true,
							start: "0 0",
							end: "100% 0",
							onUpdate: function(value){
								this.progress = value.progress;
								this.direction = value.direction;
								that.navigationHide();
							},
							snap: {
								snapTo: function(value) {
									var snap = 0;

									if (this.progress < .1 && this.direction > 0) snap = 0;
									else if (this.progress > .9 && this.direction < 0) snap = 1;
									else if (this.direction > 0) snap = 1;

									return snap;
								},
								delay: 0,
								duration: {
									min: .5,
									max: 2
								},
								ease: "expo"
							},
							animation: tl
						});
					});
				});
				// Click events
				that.moveScroll = function (_pos) {
					if (_pos < 0) this.pos = 0;
					else if (_pos > this.l - 1) this.pos = this.l - 1;
					else this.pos = _pos;

					gsap.to(this.slideshowScroll, {
						duration: 2,
						scrollTo: {
							x: this.pos * this.slideshowChild[this.pos].offsetWidth
						},
						ease: "expo.out",
						onComplete: this.navigationHide
					});
				}
				that.before.addEventListener("click", function(e) {
					gsap.timeline({ defaults: {
						ease: "expo"
					}}).to(this, {
						duration: .25,
						marginLeft: -25
					}).to(this, {
						duration: .25,
						marginLeft: 0
					});
					that.moveScroll(that.pos-1);
				});
				ScrollTrigger.matchMedia({
					"(min-aspect-ratio: 1/1)": function() {
						hoverEvents([that.before], function(e) {
							gsap.to(that.slideshowChild, {
								x: 20
							});
						}, function(e) {
							gsap.to(that.slideshowChild, {
								x: 0
							});
						});
					}
				});
				//
				that.after.addEventListener("click", function(e) {
					gsap.timeline({ defaults: {
						ease: "expo"
					}}).to(this, {
						duration: .25,
						marginRight: -25
					}).to(this, {
						duration: .25,
						marginRight: 0
					});
					that.moveScroll(that.pos + 1);
				});
				ScrollTrigger.matchMedia({
					"(min-aspect-ratio: 1/1)": function() {
						hoverEvents([that.after], function(e) {
							gsap.to(that.slideshowChild, {
								x: -20
							});
						}, function(e) {
							gsap.to(that.slideshowChild, {
								x: 0
							});
						});
					}
				});
				// Scroll animation
				scroll.push(function(tl) {
					tl.fromTo(that.slideshowScroll, {
						opacity: 0,
						y: 500
					}, {
						opacity: 1,
						y: 0,
						ease: "expo.out"
					}, 0);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: that,
						start: "12.5% 90%",
						end: "50% 90%",
						scrub: 1,
						animation: tl
					});
				});
				//
				scroll.push(function(tl) {
					tl.fromTo(that.before, {
						opacity: 0,
						x: -100
					}, {
						opacity: 1,
						x: 0,
						ease: "expo.out"
					}, 0);
					tl.fromTo(that.after, {
						opacity: 0,
						x: 100
					}, {
						opacity: 1,
						x: 0,
						ease: "expo.out"
					}, 0);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: that.before,
						start: "0 90%",
						end: (window.innerHeight / 5) + " 90%",
						scrub: 1,
						animation: tl
					});
				});
			});
			// Smaller one
			next.querySelectorAll(".style-slideshow-small").forEach(function(el) {
				scroll.push(function(tl) {
					tl.fromTo(el.children[0].querySelectorAll("picture"), {
						x: "200%"
					}, {
						x: 0,
						ease: "expo.out"
					}, 0);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: el,
						start: "0 90%",
						end: "50% 90%",
						scrub: .75,
						animation: tl
					});
				});
				//
			});

			// Links
			next.querySelectorAll(".links").forEach(function(el) {
				// Move text
				scroll.moveText({
					elements: el.querySelectorAll("nav > *"),
					position: "100%"
				});
			});

			// Snap to element
			snap(next.querySelectorAll("section.middle, .links"), .15);
		},
		beforeLeave: function(data) {
			gToArray(".style-slideshow").forEach(function(slideshow) {
				window.removeEventListener("resize", slideshow.fixedSize);
			});
		}
	}, {
		namespace: 'me',
		beforeEnter: function(data) {
			var next = data.next.container;

			// Snap to element
			snap(next.querySelectorAll(".imuiux, .us"), 2);

			// I'm UI/UX and us sections
			// Scroll events
			var els = next.querySelectorAll(".imuiux, .us");
			els.forEach(function(el, idx) {
				// Scroll and fade
				var height = window.innerHeight;
				var txt = el.querySelectorAll(".main-text > *, .text > *");
				var parttxt = el.querySelectorAll(".main-text, .text");
				var paging = el.querySelectorAll(".paging");

				if (txt.length > 0) {
					scroll.push(function(tl) {
						// Show paging
						tl.fromTo(paging, {
							position: "absolute",
							opacity: (idx > 0)? 1 : 0
						}, {
							position: "fixed",
							opacity: 1,
							ease: "linear",
							duration: 3
						}, 0);
						// Hide
						tl.fromTo(paging, {
							position: "fixed",
							opacity: 1,
						}, {
							opacity: (idx < els.length - 1)? 1 : 0,
							ease: "linear",
							duration: 3
						}, 3);
						tl.set(paging, {
							position: "absolute",
							opacity: 0
						});
						// Animate text inside paging
						paging.forEach(function(span) {
							// Show
							tl.fromTo(span.children[0], {
								y: (idx > 0) ? "100%" : "0%",
								opacity: (idx > 0) ? 1 : 0
							}, {
								y: "0%",
								opacity: 1,
								ease: "power3.out",
								duration: 2
							}, 0);
							// Hide
							tl.to(span.children[0], {
								y: (idx < paging.length - 1) ? "-100%" : "0%",
								opacity: (idx < paging.length - 1) ? 0 : 1,
								ease: "power3.in",
								duration: 2
							}, 4);
						});

						// Show text
						tl.fromTo(txt, {
							y: height * 1/8
						}, {
							y: 0,
							ease: "power3.out",
							duration: 3
						}, 0);
						tl.fromTo(txt, {
							opacity: 0
						}, {
							opacity: 1,
							ease: "power3.out",
							duration: 2
						}, 0);
						// Hide text
						tl.fromTo(txt, {
							y: 0
						}, {
							y: (idx > 0) ? height * -1/8 : height * 3/8,
							ease: "linear",
							duration: 3
						}, 3);
						tl.fromTo(txt, {
							opacity: 1
						}, {
							opacity: 0,
							ease: "power3.in",
							duration: 2
						}, 4);

						// Pinning
						if (idx > 0) {
							tl.fromTo(parttxt, {
								position: "relative",
								top: "50%",
								left: "50%",
								x: "-50%",
								y: "-50%",
								marginTop: -1 * deltatoolbar
							}, {
								position: "fixed",
								duration: 6
							}, 0);
							tl.set(parttxt, {
								position: "relative"
							}, 6);
						}

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							id: "text" + idx,
							trigger: el,
							start: "0 50%",
							end: "100% 50%",
							scrub: true,
							animation: tl
						})
					});
				}
			});

			// Spinning Mr. Goat and Pinning
			var h2s = next.querySelectorAll(".mrgoat:not(.spin)").length;
			gsap.set(next.querySelectorAll(".mrgoat .thumbs"), { display: "none" });
			next.querySelectorAll(".mrgoat.spin").forEach(function(element, index) {
				var imgs = element.querySelectorAll(".thumbs > img");
				var ig = element.querySelectorAll(".ig");
				var thumbs = element.querySelectorAll(".thumbs");
				var mrgoat = {
					frame: 1
				};
				var duration = 1;
				// Spin Mr. Goat
				var prev = null;
				gsap.set(imgs, { opacity: 0 });
				gsap.set(thumbs, { display: "" });
				scroll.push(function(tl) {
					tl.fromTo(element, {
						opacity: 0
					}, {
						opacity: 1,
						duration: duration,
						ease: "power.in"
					}, 0);
					tl.to(mrgoat, {
						frame: imgs.length,
						snap: "frame",
						repeat: h2s,
						ease: "linear",
						duration: duration,
						onUpdate: function () {
							var frame = mrgoat.frame + 4;
							var el;

							if (frame > imgs.length) frame -= imgs.length;
							el = element.querySelector(".mrgoat" + frame);

							if (prev) prev.style.opacity = 0;
							el.style.opacity = 1;

							prev = el;
						}
					}, 0);
					tl.to(element, {
						opacity: 0,
						duration: duration,
						ease: "power.out"
					}, ">-" + duration);
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: next.querySelectorAll("#startmrgoat"),
						start: "-100% 0",
						endTrigger: next.querySelectorAll("#stopmrgoat"),
						end: "100% 0%",
						animation: tl,
						scrub: true
					});
				});
			});

			// Animate IG posts and Pinning
			// // Resize picture
			// next.resizeig = function() {
			// 	var size = window.innerWidth * 2/3;
			// 	if (window.innerWidth > window.innerHeight) size = window.innerHeight * 1/2;

			// gsap.set(next.querySelectorAll(".igstage .thumbs a"), {
			// 	width: size,
			// 	height: size
			// });

			// gsap.set(next.querySelectorAll(".igstage"), {
			// 		marginTop: -3 * window.innerHeight,
			// 		display: "block"
			// 	});
			// }
			// window.addEventListener("resize", next.resizeig);
			// next.resizeig();
			// //
			// gsap.set(next.querySelectorAll(".igstage .thumbs"), {
			// 	position: "relative",
			// 	width: "100%",
			// 	height: "100%",
			// 	display: "flex",
			// 	alignItems: "center",
			// 	justifyContent: "center",
			// })
			// //
			// next.querySelectorAll(".igstage").forEach(function(element, index) {
			// 	var a = element.querySelectorAll(".thumbs a");
			// 	var delta = 50;
			// 	// Set default values
			// 	gsap.set(a, {
			// 		position: "absolute",
			// 		zIndex: function(index) {
			// 			return a.length - index;
			// 		},
			// 		transformOrigin: "center",
			// 		opacity: 0,
			// 		scale: .8
			// 	});
			// 	// Animate Post
			// 	a.forEach(function(pic, index) {
			// 		// Show
			// 		scroll.push(function(tl) {
			// 			tl.to(pic, {
			// 				opacity: 1,
			// 				duration: .25,
			// 				ease: "power3.out"
			// 			}, 0);

			// 			tl.to(pic, {
			// 				scale: 1,
			// 				duration: 1,
			// 				ease: "power3.out"
			// 			}, 0);

			// 			return tl;
			// 		}, function(tl) {
			// 			return ScrollTrigger.create({
			// 				trigger: element,
			// 				start: (index * delta) + "% 0",
			// 				end: ((index + 1) * delta) + "% 0",
			// 				animation: tl,
			// 				toggleActions: "restart none none reverse"
			// 			});
			// 		});
			// 		// Swipe
			// 		if(index < (a.length - 1)) {
			// 			scroll.push(function(tl) {
			// 				var random = gRandom([true, false]);
			// 				var x = random ? (pic.offsetWidth * -3) : window.innerWidth + (pic.offsetWidth * 3);
			// 				var rotation = random ? -20 : 20;

			// 				tl.to(pic, {
			// 					x: x,
			// 					y: window.innerHeight * -2/3,
			// 					rotation: rotation + "deg",
			// 					duration: .75,
			// 					ease: "expo.in"
			// 				}, 0);

			// 				tl.to(pic, {
			// 					opacity: 0,
			// 					duration: .15,
			// 					ease: "expo.in"
			// 				}, .6);

			// 				return tl;
			// 			}, function(tl) {
			// 				return ScrollTrigger.create({
			// 					trigger: element,
			// 					start: ((index + 1) * delta) + "% 0",
			// 					end: ((index + 2) * delta) + "% 0",
			// 					animation: tl,
			// 					toggleActions: "restart none none reverse"
			// 				});
			// 			});
			// 		}
			// 	});
			// 	// Show igstage
			// 	scroll.push(function(tl) {
			// 		tl.fromTo(element.querySelector(".thumbs"), {
			// 			y: window.innerHeight/4,
			// 			opacity: 0
			// 		}, {
			// 			y: 0,
			// 			opacity: 1,
			// 			ease: "expo.out"
			// 		}, 0);

			// 		return tl;
			// 	}, function(tl) {
			// 		return ScrollTrigger.create({
			// 			trigger: element,
			// 			start: "0 0",
			// 			end: "100% 0",
			// 			animation: tl,
			// 			scrub: true
			// 		});
			// 	});
			// 	// Show skip button
			// 	scroll.push(function(tl) {
			// 		tl.fromTo(element, {
			// 			backgroundColor: ""
			// 		}, {
			// 			backgroundColor: "var(--white)"
			// 		});
			// 		tl.fromTo(element.querySelector(".scrollto"), {
			// 			y: -100,
			// 			opacity: 0
			// 		}, {
			// 			y: 0,
			// 			opacity: 1,
			// 			ease: "expo.in",
			// 			duration: .5
			// 		});
			// 		return tl;
			// 	}, function(tl) {
			// 		return ScrollTrigger.create({
			// 			trigger: element,
			// 			start: ((a.length + 1) * delta * 1/3) + "% 0",
			// 			end: ((a.length + 1) * delta * 1/3) + "% 0",
			// 			animation: tl,
			// 			toggleActions: "restart none none reverse"
			// 		});
			// 	});
			// 	// Pinning
			// 	scroll.push(function(tl) {
			// 		return tl;
			// 	}, function(tl) {
			// 		return ScrollTrigger.create({
			// 			trigger: element,
			// 			start: "0 0",
			// 			end: ((a.length + 1) * delta) + "% 0",
			// 			animation: tl,
			// 			pin: true,
			// 			scrub: true,
			// 			anticipatePin: 2
			// 		});
			// 	});
			// });

			// Animate cofounder
			next.querySelectorAll(".cofound").forEach(function(el, index) {
				// Hover
				var picture = el.querySelector("picture");
				hoverEvents(el.querySelectorAll("a"), function() {
					gsap.killTweensOf(picture);
					gsap.to(picture, {
						scale: 2,
						duration: 120,
						ease: "linear"
					});
				}, function() {
					gsap.killTweensOf(picture);
					gsap.to(picture, {
						scale: 1,
						duration: 1,
						ease: "expo.out"
					});
				});
				// Animate
				var eltext = el.querySelectorAll(".text > *");
				scroll.push(function(tl) {
					tl.fromTo(eltext, {
						y: window.innerHeight * 1/10
					}, {
						y: window.innerHeight * -1/10,
						ease: "linear",
						duration: 4
					}, 0);
					tl.fromTo(eltext, {
						opacity: 0
					}, {
						opacity: 1,
						ease: "linear",
						duration: 1
					}, 0);
					tl.fromTo(eltext, {
						opacity: 1
					}, {
						opacity: 0,
						ease: "linear",
						duration: 1
					}, 3);

					tl.fromTo(el.querySelectorAll(".thumbs"), {
						y: window.innerHeight * -1/4
					}, {
						y: window.innerHeight * 1/4,
						ease: "linear",
						duration: 4
					}, 0);
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: el,
						start: "0 100%",
						end: "100% 0",
						animation: tl,
						scrub: true
					});
				});
			});

			// Links
			next.querySelectorAll(".links").forEach(function(element) {
				scroll.moveText({
					elements: element.querySelectorAll("nav > *"),
					position: "100%"
				});
			});

			// Snap to element
			snap(next.querySelectorAll(".igstage, .cofound, .links"), .25);
		}
	}, {
		namespace: 'hi',
		beforeEnter: function(data) {
			var next = data.next.container;

			var screenvertical = window.matchMedia('(max-aspect-ratio: 1/1)').matches;
			var screenhorizontal = window.matchMedia('(min-aspect-ratio: 1/1)').matches;

			var flare = {
				elements: "",
				show: function(elements) {
					var that = this;

					if (elements) this.elements = next.querySelectorAll(elements);

					gsap.killTweensOf(this.elements);
					if (elements) {
						gsap.to(this.elements, {
							opacity: 1,
							ease: "ease.out",
							duration: 1
						});
						gsap.to(this.elements, {
							x: "random(-100,100,10)%",
							y: "random(10,30,5)%",
							rotation: "random(-5,5,1)deg",
							scale: screenhorizontal ? "random(1,2.5,.5)" : "random(.5,1.5,.5)",
							ease: "ease.out",
							duration: .5
						});
					}

					var repeatanimation = function(element) {
						gsap.to(element, {
							x: "random(-100,100,10)%",
							y: "random(10,30,5)%",
							rotation: "random(-5,5,1)deg",
							scale: screenhorizontal ? "random(1,2.5,.5)" : "random(.5,1.5,.5)",
							opacity: gRandom(5,10,1) / 10,
							duration: gRandom(5,10,1),
							ease: "ease.inOut",
							onComplete: function() {
								repeatanimation(element);
							}
						});

					}

					this.elements.forEach(function(el) {
						repeatanimation(el);
					});
				},
				hide: function() {
					gsap.killTweensOf(this.elements);
					gsap.to(this.elements, {
						opacity: 0,
						scale: 1,
						x: "random(-50,50,10)%",
						y: "random(0,20,5)%",
						scale: 1,
						ease: "ease.in"
					});
				}
			};

			var textanim = {
				el: "",
				hint: "",
				show: function(el, hint, positive) {
					var split = -50;

					this.el = el;
					this.hint = hint;

					if (positive) split = 50;

					if (el.length == 2) {
						gsap.killTweensOf(next.querySelectorAll(this.el.toString()));
						gsap.to(next.querySelectorAll(this.el[0]), {
							x: split * -1,
							ease: "power3.out",
							duration: .5
						});
						gsap.to(next.querySelectorAll(this.el[1]), {
							x: split,
							ease: "power3.out",
							duration: .5
						});
					} else {
						gsap.killTweensOf(next.querySelectorAll(this.el));
						gsap.to(next.querySelectorAll(this.el), {
							x: split,
							ease: "power3.out",
							duration: .5
						});
					}

					gsap.fromTo(next.querySelectorAll(this.hint), {
						y: 50
					}, {
						y: 0,
						opacity: 1,
						ease: "power3.out",
						duration: .5
					});
				},
				hide: function() {
					gsap.to(next.querySelectorAll(this.el), {
						x: 0,
						ease: "power3.out",
						delay: .1,
						duration: .5
					});
					gsap.to(next.querySelectorAll(this.hint), {
						y: 50,
						opacity: 0,
						ease: "power3.out",
						duration: .5
					});
				}
			}

			gsap.set(".hi img", {
				x: "random(-100,100,10)%",
				y: "random(10,30,5)%",
				rotation: "random(-5,5,1)deg",
				scale: "random(1,2,.5)"
			});

			hoverEvents(next.querySelectorAll(".email"), function(el) {
				if(screenhorizontal) textanim.show(".email span", ".email small");
				flare.show("img.yellow, img.red");
			}, function(el) {
				if(screenhorizontal) textanim.hide();
				flare.hide();
			});
			hoverEvents(next.querySelectorAll(".social"), function(el) {
				if(screenhorizontal) textanim.show([".website span", ".email span"], ".social span:first-child small");
				flare.show("img.blue, img.red");
			}, function(el) {
				if(screenhorizontal) textanim.hide();
				flare.hide();
			});
			hoverEvents(next.querySelectorAll(".website"), function(el) {
				if(screenhorizontal) textanim.show(".social span:nth-child(2), .website span", ".social span:nth-child(2) small", true);
				flare.show("img.blue, img.green");
			}, function(el) {
				if(screenhorizontal) textanim.hide();
				flare.hide();
			});
		}
	}, {
		namespace: 'lost',
		beforeEnter: function(data) {
			var next = data.next.container;
			var speed = 10,
				tween = [];

			for (var i = 0; i < 5; i++) {
				if(i % 2 == 0) {
					tween[i] = gsap.fromTo("#lost h2:nth-child(" + (i + 1) + ") span", {
						xPercent: -50
					}, {
						duration: speed + (i * 2),
						repeat: -1,
						ease: "linear",
						xPercent: 0
					})
				} else {
					tween[i] = gsap.fromTo("#lost h2:nth-child(" + (i + 1) + ") span", {
						xPercent: 0
					}, {
						duration: speed + (i * 2),
						repeat: -1,
						ease: "linear",
						xPercent: -50
					})
				}
			}

			next.querySelectorAll("#nomokeybusiness p").forEach(function(el) {
				splitText(el);
				ScrollTrigger.matchMedia({
					"(min-aspect-ratio: 1/1)": function() {
						var text = {
							speed: 1
						};

						gsap.set(el.querySelectorAll(".splext"), {
							y: 0,
							rotation: "random(-180,180,180)"
						});

						hoverEvents([el], function() {
							gsap.killTweensOf(text);
							gsap.to(text, {
								speed: 5,
								duration: 10,
								ease: "linear",
								onUpdate: function () {
									for (var i = 0; i < 5; i++) {
										tween[i].timeScale(text.speed);
									}
								}
							});

							gsap.to(el.querySelectorAll(".splext"), {
								rotation: 0,
								duration: .5,
								ease: "expo",
								stagger: .005
							});
						}, function() {
							gsap.killTweensOf(text);
							gsap.to(text, {
								speed: 1,
								duration: 2,
								ease: "back.out",
								onUpdate: function () {
									for (var i = 0; i < 5; i++) {
										tween[i].timeScale(text.speed);
									}
								}
							});

							gsap.to(el.querySelectorAll(".splext"), {
								rotation: "random(-180,180,180)",
								duration: .5,
								ease: "expo",
								stagger: .005
							});
						});
					}, "(max-aspect-ratio: 1/1)": function() {
						gsap.set(el.querySelectorAll(".splext"), {
							y: "random(-1,1,1)",
							rotation: "random(-5,5,1)"
						});
					}
				});
			});
		}
	}, {
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

			// Me object
			var me = {};
			// Friends object
			var friends = {
				data: {},
				add: function(new_friends) {
					Object.assign(this.data, new_friends);
				},
				find: function(user_id) {
					if(this.data && this.data[user_id]) {
						return this.data[user_id];
					}
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
						if(this.data[items].nick_name == user_name) {
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
				updateDraw: function(style, text) {

					if(!next.querySelector("." + style)) {
						this.drawDiv(style, text)
					} else {
						next.querySelector('.' + style + ' .text').innerHTML = text;
					}
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
				drawAll: function() {
					this.draw('', this.plurk_count, 'You posted <i>' + plural(this.plurk_count, 'plurk') + '</i>');
					this.drawGraph('center', Math.round(this.noresponse_count/this.plurk_count*100), this.noresponse_count + ' of ' + plural(this.plurk_count, 'plurk') + ' you posted have no response. That\'s around ' + Math.round(this.noresponse_count/this.plurk_count*100) + '% of your plurk <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
					this.draw('', this.response_count, 'You <i>responded ' + this.response_count + ' times</i>');
					this.draw('', this.post_count, 'In total, you posted <i>' + this.post_count + ' times</i>, that\'s quite a lot <img src="https://s.plurk.com/emoticons/platinum/8073c1716e75d32eb79f97a9f521fa01.gif" /></span>');
					this.draw('', this.whispers_count, 'You posted <i>' + plural(this.whispers_count, 'whisper') + '</i>');
					this.draw('', this.porn_count, 'You posted <i>' + plural(this.porn_count, 'adult plurk') + '</i>');
					this.draw('', this.has_gift_count, 'You recieved <i>' + plural(this.has_gift_count, 'gift') + '</i>');
				}
			};
			var most = {
				sort: function(a, b) {
					return b.count - a.count;
				},
				responders: {
					data: [],
					count: function(content, value) {
						var index = this.data.findIndex(function(el) {
							return el.user_id == value.user_id;
						});
						if (index < 0) {
							this.data.push({
								user_id: value.user_id,
								user: content.friends[value.user_id],
								count: 1
							});
						} else {
							this.data[index].count++;
						}
						this.data.sort(most.sort);

						var index = 0;
						var top = "";
						var length = (this.data.length < 7)? this.data.length : 7;
						for (var i = 0; i < length; i++) {
							if(this.data[i].user_id != me.id && this.data[i].user_id != 99999) {
								top += '\
									<a id="mostresponders' + this.data[i].user.user_id + '" href="https://plurk.com/' + this.data[i].user.nick_name +'" target="_BLANK">\
										<span class="avatar"><img src="' + friends.getAvatar(this.data[i].user_id) + '" /></span>\
										<span class="name">' + this.data[i].user.nick_name + '</span>\
										<span class="count">' + this.data[i].count + '</span>\
									</a>\
								';
								 + ", ";
								index++;
								if(index >= 5) break;
							}
						}

						statistics.updateDraw("mostresponders", top);
					},
					draw: function() {
						this.data.sort(most.sort);
						if(this.data[0]) {
							index = 0;
							while(this.data[index].user_id == me.id || this.data[index].user_id == 99999) index++;
							statistics.drawImage("avatar", friends.getAvatar(this.data[index].user_id), 'https://plurk.com/' + this.data[index].user.nick_name, '<i>Your Most Responder</i>', this.data[index].user.display_name, this.data[index].count);
						}
					}
				},
				myemoticons: {
					data: [],
					count: function(content) {
						findandcountregex(/emoticon_my\" src=\"(.*?)\"/g, function(value) {
							return value.replace(/emoticon_my\" src=\"|\"/gi,'');
						}, content, this.data);
					},
					draw: function() {
						this.data.sort(most.sort);
						if(this.data[0]) statistics.drawImage("emoticons", this.data[0].id, '#', '<i>Most Used My Emoticon</i>', '', this.data[0].count);
					}
				},
				mentions: {
					data: [],
					count: function(content) {
						findandcountregex(/\@(.*?)[\ |\:]/g, function(value) {
							return value.replace(/\@|\ |\:/g, '');
						}, content, this.data);
					},
					draw: function() {
						this.data.sort(most.sort);
						if(this.data[0]) statistics.drawImage("avatar", friends.getAvatarByUsername(this.data[0].id), 'https://plurk.com/' + this.data[0].id, '<i>Most Mentioned by You</i>', this.data[0].id, this.data[0].count);
					}
				},
				mentionsby: {
					data: [],
					count: function(content) {
						findandcountregex(/\@(.*?)[\ |\:]/g, function(value) {
							return value.replace(/\@|\ |\:/g, '');
						}, content, this.data);
					},
					draw: function() {
						this.data.sort(most.sort);
						if(this.data[0]) statistics.drawImage("avatar", friends.getAvatarByUsername(this.data[0].id), 'https://plurk.com/' + this.data[0].id, '<i>Most Mentioned by You</i>', this.data[0].id, this.data[0].count);
					}
				},
				hashtags: {
					data: [],
					count: function(content) {
						findandcountregex(/\#(.*?)\ /g, function(value) {
							return value.replace(/\#|\ |\:/g, '');
						}, content, this.data);
					},
					draw: function() {
						this.data.sort(most.sort);
						if(this.data[0]) statistics.drawLink('', 'https://plurk.com/search?q=' + this.data[0].id, '<i>Most Hashtags by You</i>', '#' + this.data[0].id, this.data[0].count);
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

					gsap.to(load, {
						progress: Math.ceil(item),
						snap: "progress",
						ease: "linear",
						duration: .5,
						onUpdate: function () {
							if(!next.querySelector("#statistics .loading")) {
								statistics.draw("loading", load.progress + "%", "3 of 3. Loading all responses, it can take up to 10 minutes");
							}
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
				update: function() {
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

			// Find and count all based on regex
			function findandcountregex(regex, replace_function, content, thearray) {
				var result = content.match(regex);
				if(result) {
					result.forEach(function(value, index) {
						value = replace_function(value);
						index = thearray.findIndex(function(el) {
							return el.id == value;
						});
						if (index < 0) {
							thearray.push({
								id: value,
								count: 1
							});
						} else {
							thearray[index].count++;
						}
					});
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

				// Hide statistic pages
				api.abort();
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
				statistics.init();

				api.call("", function(data) {
					me = data.message;

					displayPlurkerData(me, function() {
						var tl = gsap.timeline();

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

					// Request token
					requestToken();

					// Hide statistic pages
					if (callback) next.querySelectorAll(".grant").forEach(function(el) { el.style.display = "none"; });
					// Show login page
					tl = showLoginPage(tl);

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
						y: "0vh"
					}, {
						y: "50vh",
						duration: 1,
						ease: "linear"
					}, 0);
					tl.fromTo(next.querySelectorAll("#hello .bgtext sup, #hello .bgtext sub"), {
						y: "0vh"
					}, {
						y: "75vh",
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
				var interval;
				var plurk

				statistics.title('This Year');
				statistics.draw("loading", "", "2 of 3. Loading your 2020 plurks. It can take up to 1 minutes.");

				loading.init();
				loading.loop(100);
				interval = setInterval(function() {
					loading.fakeupdate();
				}, 500);

				// Load 2020 Plurk
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

						displayExtendedStatistics(plurk);
					} else {
						if(plurk[0]) inactive.draw(plurk, date.getFullYear());
						else inactive.empty();
					}
				}
			}
			// Display extended statistics
			function displayExtendedStatistics(plurk) {
				statistics.plurk_count = plurk.length;
				plurk.forEach(function(value, index) {
					// Calculate the statistics
					if (value.anonymous) statistics.whispers_count++;
					if (value.has_gift) statistics.has_gift_count++;
					if (value.porn) statistics.porn_count++;
					if (!value.response_count) statistics.noresponse_count++;
					if (value.plurk_type == 3) statistics.private_count++;
					statistics.response_count += value.response_count;

					// Find and count all my emoticons from my post
					most.myemoticons.count(value.content);
					// Find and count all mentions from my post
					most.mentions.count(value.content_raw);
					// Find and count all hashtags from my post
					most.hashtags.count(value.content_raw);

					// Get the responses for each plurks
					api.call("?fetch=response&plurk_id=" + value.plurk_id, function(data) {
						loading.update();

						// Attach responses to the post
						var index = plurk.findIndex(function(el) {
							return el.plurk_id == data.message.plurk_id;
						});
						if(index) plurk[index].response = data.message;

						// Add friends from response lists
						friends.add(data.message.friends);

						// Count the rest of statistics
						data.message.responses.forEach(function(value, index) {
							if (value.user_id == me.id) {
								// Find and count all my emoticons from responses
								most.myemoticons.count(value.content);
								// Find and count all my emoticons from responses
								most.mentions.count(value.content_raw);
								// Find and count all my hashtags from responses
								most.hashtags.count(value.content_raw);
							}
							// Find and count all responders
							most.responders.count(data.message, value);
						});
					}, function(data) {
						console.log("Fail", data);
					}, false);
				});
				statistics.post_count = statistics.plurk_count + statistics.response_count;

				// Draw user statistics
				statistics.drawAll();

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

						// Scroll animation wrap section
						// scroll.push(function(tl) {
						// 	tl.fromTo(next.querySelectorAll("#credits .text"), {
						// 		y: "50vh",
						// 		opacity: 0
						// 	}, {
						// 		y: "0vh",
						// 		opacity: 1,
						// 		ease: "linear",
						// 		stagger: {
						// 			from: "end",
						// 			amount: .2
						// 		}
						// 	}, 0);
						// 	return tl;
						// }, function(tl) {
						// 	return ScrollTrigger.create({
						// 		markers: true,
						// 		trigger: next.querySelectorAll("#scrollercredits"),
						// 		start: "0 100%",
						// 		end: "0 0",
						// 		animation: tl,
						// 		scrub: true
						// 	});
						// });

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
	}]
});