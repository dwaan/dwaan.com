'use strict';
const REPORTSIZE = false;

const gToArray = gsap.utils.toArray;
const gRandom = gsap.utils.random;


//////////////// Dark Mode
var dark_mode = false;
function toggleDarkMode() {
	console.info("Toggle Dark Mode")
}
if (window.matchMedia){
	var darkmode = window.matchMedia('(prefers-color-scheme: dark)');
	darkmode.addListener(function(e){
		h = _q("html");
		if(e.matches) dark_mode = false;
		else dark_mode = true;
		toggleDarkMode();
	});
}


function log(params) {
	console.log(params);
	_q("#log").innerHTML = params;
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

//
// var displayRoundedCorner = function() {
// 	if (window.innerWidth == screen.width && window.innerHeight == screen.height) {
// 		addClass(_q("body"), "rounded");
// 	} else {
// 		removeClass(_q("body"), "rounded");
// 	}
// }
// displayRoundedCorner();
// window.addEventListener('resize', displayRoundedCorner);
addClass(_q("body"), "rounded");


////////// Initial

// Predefined scroll animation
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
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

		gToArray(elements).forEach((element, index) => {
			var y = delta + (15 * index);
			var trigger = (params.trigger)? params.trigger: element.parentNode;
			if (!move) y = 0;

			this.l = this.tl.push(gsap.timeline()) - 1;
			if (horizontal) {
					this.tl[this.l].fromTo(element, {
						x: y,
						opacity: 0,
					}, {
						x: 0,
						opacity: 1,
						ease: "ease.out"
					}, 0);
			} else {
				this.tl[this.l].fromTo(element, {
					y: y,
					opacity: 0,
				}, {
					y: 0,
					opacity: 1,
					ease: "ease.out"
				}, 0);
			}

			this.st.push(ScrollTrigger.create({
				markers: markers,
				trigger: trigger,
				start: "0 " + position,
				end:  "+=175 " + position,
				scrub: 1,
				animation: this.tl[this.l]
			}));
		});
	},
	// Move elements up without scrub
	moveThumbs: function(elements, position = "85%") {
		gToArray(elements).forEach(element => {
			var y = gRandom(250, 500, 5) + "px";

			this.l = this.tl.push(gsap.timeline()) - 1;
			this.tl[this.l].fromTo(element, {
				y: y
			}, {
				y: 0,
				duration: .75,
			}, 0);

			this.st.push(ScrollTrigger.create({
				trigger: element.parentNode,
				start: "0 " + position,
				end: "0 " + position,
				toggleActions: "restart none none reverse",
				animation: this.tl[this.l]
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
			this.el.innerHTML = '<p style="opacity: 0"><span style="margin-top: 200px"><i class="loading" style="width:0%"></i></span></p>';
		} else {
			// Progress bar type
			this.el.innerHTML = '<p style="opacity: 0;">Downloading <span><i class="loading" style="width:0%"></i></span></p>';
		}
		gsap.set(this.el, {
			y: 0,
			opacity: 1
		});

		if (typeof done === "function") done();
	},
	show: function (els, done) {
		if (typeof done !== "function") return false;

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
			duration: .25
		});

		// Calling loading images function
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
	show: function (next, done, nonsticky = false, footer = true){
		if (!next) return false;

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
		var els = next.querySelectorAll(".bland > li, .flare:not(.side)")
		if (footer) els = next.querySelectorAll(".bland > li, .flare:not(.side), .footer, .footer > *");
		if (!nonsticky) nonsticky = next.querySelector(".middle").children;
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
			opacity: 4
		}, 0);
		// Run done after all all animation complete
		tl.set(next, {
			onComplete: function() {
				done();
			}
		});
	},
	hide: function (current, done, nonsticky = false) {
		if (!current) return false;
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

		// Scroll to top
		tl = this.top(tl);

		// Hide current view
		tl.to(current.querySelectorAll(".flares:not(.side), .menu-page ol > li, .footer, .footer > *"), {
			y: "+=200",
			opacity: 0
		}, ">");
		tl.to(current.querySelectorAll(".flares.side > img"), {
			x: "-=300",
			opacity: 0,
			delay: .1
		}, "<");
		if (!nonsticky) nonsticky = current.querySelector(".middle").children;
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
	}
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
var snap = function(elements, snapPosition = 1, markers = false) {
	// Snap scroll to block
	gToArray(elements).forEach((element, index) => {
		scroll.push(function(tl) {
			return tl;
		}, function (tl) {
			return ScrollTrigger.create({
				markers: markers,
				id: "snap",
				trigger: element,
				start: "0 0",
				end: "100% 0",
				onUpdate: function({progress, direction, isActive}){
					this.progress = progress;
					this.direction = direction;
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

// Default barba hooks
barba.hooks.before((data) => {
	return true;
});
barba.hooks.beforeEnter((data) => {
	// Destroy prev scroll
	scroll.destroy();

	window.scrollTo(0, 0);

	return true;
});
barba.hooks.afterEnter((data) => {
	// Read more
	gToArray("a.scrollto").forEach(function(a) {
		a.addEventListener("click", function(e) {
			gsap.to(window, {
				duration: 1,
				ease: "expo.inOut",
				scrollTo: e.target.getAttribute("href")
			});
			e.preventDefault();
		});
	});

	return true;
});

// Initialized barba.js
barba.init({
	transitions: [{
		name: 'default-transition',
		once(data) {
			// Define async and next container
			const done = this.async();
			const next = data.next.container;

			// Animate header
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
				delay: 1,
				stagger: .1
			});

			gToArray("header .menu").forEach(function(element) {
				var overlay = element.querySelector(".overlay");
				var items = element.querySelector(".items");

				// Show menu animation
				element.querySelector(".switch").addEventListener("click", function(e) {
					e.preventDefault();

					if (!gsap.isTweening(items)) {
						// Animate main element
						gsap.to("main .middle", {
							x: -100,
							duration: .75,
							ease:"power3.out"
						});
						gsap.to("main .middle > .text", {
							x: -50,
							duration: .75,
							ease:"power3.out"
						});
						gsap.to("main .links", {
							x: -25,
							duration: .75,
							ease:"power3.out"
						});
						gsap.to("main .flares", {
							x: -25,
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
				element.querySelectorAll(".overlay, li a, .close").forEach(function(link) {
					link.addEventListener("click", function(e) {
						e.preventDefault();
						if (this != e.target) return false;

						if (!gsap.isTweening(items)) {
							// Animate main element
							gsap.to("main .middle, main .middle > .text, main .links, main .flares", {
								x: 0,
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

			// Display loading
			loader.init();
			// Loading logic
			loader.show(next, function() {
				// Animate current view and header
				animate.show(next, function() {
					loader.empty();
					done();
				});
			});
		},
		leave(data) {
			const done = this.async();
			done();
		},
		before(data) {
			const done = this.async();
			const current = data.current.container;
			const next = data.next.container;

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
		enter(data) {
			const done = this.async();
			done();
		},
		after(data) {
			const done = this.async();
			const next = data.next.container;

			// Animate current view
			animate.show(next, function() {
				loader.empty();
				done();
			});
		},
	}, {
		name: 'home-to-detail',
		leave(data) {
			return true;
		},
		before(data) {
			var tl = gsap.timeline({ defaults: {
				duration: .5,
				ease: "expo.in"
			}});

			tl.set(loader.el, { y: 0 });

			tl.to(".home .flares > img", {
				x: "-=random(100, 250, 10)",
				opacity: 0,
				duration: 1,
				stagger: .1
			}, 0);

			tl.to(".home .arrow-small a, .home .footer", {
				y: "+=100",
				opacity: 0,
				stagger: .1
			}, 0);

			animate.show(data.next.container);

			return tl;
		},
		enter(data) {
			return true;
		},
		after(data) {
			var tl = gsap.timeline({ defaults: { duration: .5, ease: "expo.out" }});

			tl.fromTo(".detail .arrow, .detail .footer, .detail .year", {
				y: "+=100",
				opacity: 0
			}, {
				y: "-=100",
				opacity: 1,
				stagger: .1
			}, 0);

			tl.set(loader.el, {
				y: "-100%"
			}, 0);

			return tl;
		},
		from: {
			namespace: ['home']
		},
		to: {
			namespace: ['detail']
		}
	}, {
		name: 'home-to-me',
		leave(data) {
			return true;
		},
		before(data) {
			const done = this.async();
			const current = data.current.container;
			const next = data.next.container;
			const elements = ".arrow-small a, .arrow";

			// Display loading
			loader.init();

			// Hide current view
			animate.hide(current, function() {
				// Image loading logic
				loader.show(next, function(){
					// Show next container
					gsap.set(next, { opacity: 1 });
					// Hide next elements
					gsap.set(next.querySelectorAll(elements), { opacity: 0 });

					done();
				});
			}, current.querySelectorAll(elements));
		},
		enter(data) {
			return true;
		},
		after(data) {
			const done = this.async();
			const current = data.current.container;
			const next = data.next.container;
			const elements = ".arrow-small a, .arrow";

			// Animate current view
			animate.show(next, function() {
				loader.empty();
				done();
			}, next.querySelectorAll(elements));
		},
		from: {
			namespace: ['home', "me"]
		},
		to: {
			namespace: ['home', 'me']
		}
	}, {
		name: 'home-to-hi',
		leave(data) {
			return true;
		},
		before(data) {
			const done = this.async();
			const current = data.current.container;
			const next = data.next.container;
			const elements = ".arrow-small a, .arrow";

			// Display loading
			loader.init(true);

			// Image loading logic
			loader.show(next, function(){
				var tl = gsap.timeline({ default: {
					duration: .75,
					stagger: .1,
					ease: "power3.out"
				}});
				tl.to(current.querySelectorAll(".flares > img"), {
					x: "-=200",
					opacity: 0
				}, 0);
				tl.to(current.querySelectorAll(".middle > *"), {
					opacity: 0
				}, .25);
				tl.fromTo(current.querySelector(".footer .email"), {
					position: "fixed",
					display: "block",
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
				}, {
					left: window.innerWidth / 2,
					bottom: window.innerHeight / 2,
					x: "-50%",
					y: "50%",
					lineHeight: "80%",
					fontSize: "5rem",
					fontWeight: 500,
					letterSpacing: "-0.06em",
					duration: 1,
					ease: "expo.inOut",
					onComplete: function() {
						// Show next container
						gsap.set(next, { opacity: 1 });
						// Show next elements
						gsap.set(next.querySelectorAll(".footer"), { opacity: 1 });

						done();
					}
				}, 0);
			});
		},
		enter(data) {
			return true;
		},
		after(data) {
			const done = this.async();

			// Animate current view
			loader.empty();
			done();
		},
		from: {
			namespace: ['home']
		},
		to: {
			namespace: ['hi']
		}
	}, {
		name: 'hi-to-home',
		leave(data) {
			return true;
		},
		before(data) {
			const done = this.async();
			const current = data.current.container;
			const next = data.next.container;

			// Display loading
			loader.init();

			var tl = gsap.timeline({ default: {
				duration: .75,
				stagger: .1,
				ease: "power3.out"
			}});

			current.querySelector(".main-text").style = {};

			tl.fromTo(current.querySelector(".main-text h1"), {
				position: "fixed",
				height: "auto",
				top: "initial",
				left: window.innerWidth / 2,
				bottom: window.innerHeight / 2,
				x: "-50%",
				y: "50%",
				lineHeight: "80%",
				fontSize: "5rem",
				fontWeight: 500,
				letterSpacing: "-0.06em"
			}, {
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
				onUpdate: function(el) {
					console.log(el);
				},
				onComplete: function() {
					// Selectively show next elements
					gsap.set(next.querySelectorAll(".footer .email"), { opacity: 1 });
				}
			}, 0);
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
		enter(data) {
			const done = this.async();
			const current = data.current.container;
			const next = data.next.container;
			const elements = ".main-text, .arrow-small a, .arrow";

			// Animate current view
			animate.show(next, function() {
				loader.empty();
				done();
			}, next.querySelectorAll(elements), false);
		},
		after(data) {
			return true;
		},
		from: {
			namespace: ['hi']
		},
		to: {
			namespace: ['home']
		}
	}],
	views: [{
		namespace: 'home',
		beforeEnter(data) {
			const done = this.async();
			const next = data.next.container;

			// Get body size
			const wh = _q("body").offsetHeight;

			// Count how many blocks
			const l = gToArray(".home > .middle").length - 1;

			// gRandomize plus or minus
			function plusminus() {
				return (gRandom(1, 2, 1) == 1)? "+" : "-";
			}

			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					// Scroll animate Main Text
					gsap.set(".middle:first-child .arrow", {
						rotation: 0
					});
				},
				"(min-aspect-ratio: 1/1)": function() {
					// Scroll animate Main Text
					gsap.set(".middle:first-child .arrow", {
						rotation: 90
					});
				}
			});

			// Snap scroll to block
			snap(".middle", 2);

			// Scroll animate flares
			scroll.push(function(tl) {
				gToArray(".flares > img").forEach(flare => {
					tl.to(flare, {
						x: gRandom(40, 60, 5) + "%",
						ease: "linear"
					}, 0);
				});

				return tl;
			}, function (tl) {
				return ScrollTrigger.create({
					trigger: "#scrollestart",
					start: "0 0",
					endTrigger: "#scrollend",
					end: "100% 100%",
					scrub: true,
					animation: tl
				});
			});

			done();
		}
	}, {
		namespace: 'detail',
		beforeEnter(data) {
			// Read more
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					gsap.set("a.scrollto", { rotation: 0 });
				}, "(min-aspect-ratio: 1/1)": function() {
					gsap.set("a.scrollto", { rotation: 90 });
				}
			});

			// Style - Spread
			var classSpreadName = ".style-spread";
			// Move the text
			scroll.moveText({
				elements: classSpreadName + " .titles > *, " + classSpreadName + " p"
			});
			// Scroll animation
			ScrollTrigger.defaults({
				trigger: classSpreadName + " .thumbs",
				toggleActions: "restart none none reverse"
			});
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					scroll.push(function(tl) {
						tl.fromTo(".style-spread .pic-4", {
							top: gRandom(250, 500, 5) + "px",
							left: "50%",
							x: "-20%",
							rotation: 0
						}, {
							top: 0,
							left: "50%",
							rotation: 7.5,
							ease: "expo.out"
						}, 0);

						tl.fromTo(".style-spread .pic-5", {
							top: gRandom(250, 500, 5) + "px",
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
						tl.fromTo(".style-spread .pic-4", {
							top: gRandom(50, 100, 5) + "%",
							left: 100 + gRandom(200, 300, 5) + "%",
							x: 0,
							y: 0,
							rotation: gRandom(15, 25, 1)
						}, {
							top: "25%",
							left: "50%",
							rotation: -10,
							duration: 1,
							ease: "expo.out"
						}, .1);

						tl.fromTo(".style-spread .pic-5", {
							top: gRandom(50, 100, 5) + "%",
							left: 100 + gRandom(200, 300, 5) + "%",
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

			// Style - Spread Left
			var classSpreadLeftName = ".style-spread-left";
			// Move the text
			scroll.moveText({
				elements: classSpreadLeftName + " .titles > *, " + classSpreadLeftName + " p"
			});
			// Scroll animation
			ScrollTrigger.defaults({
				trigger: classSpreadLeftName + " .thumbs"
			});
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					scroll.push(function(tl) {
						tl.fromTo(classSpreadLeftName + " .thumbs picture", {
							opacity: 0,
							y: gRandom(250, 500, 5) + "px",
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
						tl.fromTo(classSpreadLeftName + " .thumbs picture", {
							x: -gRandom(250, 500, 5) + "px",
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

			// Style - Top
			var classTopName = ".style-top";
			// Move text
			scroll.moveText({
				elements: classTopName + " .text h2, " + classTopName + " .text li"
			});
			// Move thumbnails
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					scroll.push(function(tl) {
						tl.fromTo(classTopName + " .thumbs", {
							x: 500
						}, {
							x: -500,
							ease: "linear"
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classTopName,
							start: "-50% 0",
							end:  "100% 0",
							scrub: .75,
							animation: tl
						});
					});
				},
				"(min-aspect-ratio: 1/1)": function() {
					scroll.push(function(tl) {
						tl.fromTo(classTopName + " .thumbs", {
							x: 500
						}, {
							x: -500,
							ease: "linear",
							duration: 5,
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classTopName,
							start: "-25% 0",
							end:  "200% 0",
							scrub: .75,
							animation: tl
						});
					});
				}
			});
			// Move thumbnail again
			scroll.moveThumbs(classTopName + " .thumbs > picture");

			// Style - Top
			var classTopTextName = ".style-top-text";
			// Move text
			scroll.moveText({
				elements: classTopTextName + " .text h2, " + classTopTextName + " .text li"
			});

			// Style - Top
			var classBottomLogoName = ".style-bottom-logo";
			// Move text
			scroll.moveText({
				elements: classBottomLogoName + " .text > *"
			});
			// Move logo
			scroll.push(function(tl) {
				tl.fromTo(classBottomLogoName + " .thumbs", {
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

				tl.fromTo(classBottomLogoName + " .thumbs li", {
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
					trigger: classBottomLogoName,
					start: (window.innerHeight * 1/4) + " " + (window.innerHeight * 3/4),
					end: (window.innerHeight * 3/4) + " " + (window.innerHeight * 3/4),
					scrub: 1,
					animation: tl
				});
			});

			// Style - Flex
			var classFlexName = ".style-flex";
			// Move text
			scroll.moveText({
				elements: classFlexName + " .style-column > *",
				position: "100%"
			});

			// Style - Trunc
			var classTruncName = ".style-trunc";
			// Move text
			scroll.moveText({
				elements: classTruncName + " .text > *, " + classTruncName + " .color ul > *",
				position: "100%",
				horizontal: true
			});

			// Style - Masonry
			var classMasonryName = ".style-masonry";
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					// Rotate masonry
					gsap.set(classMasonryName + " .thumbs", {
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

							tl.fromTo(classMasonryName + " .thumbs > *:nth-child(4n+" + index + ")", {
								y: y + yplus,
							}, {
								y: y,
								ease: "ease"
							}, 0);
						}

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classMasonryName,
							start: "-25% 100%",
							end:  "100% 50%",
							scrub: .75,
							animation: tl
						});
					});

					// Scroll left
					scroll.push(function(tl) {
						tl.fromTo(classMasonryName + " .thumbs", {
							x: 0,
						}, {
							x: -50,
							ease: "linear"
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classMasonryName,
							start: "-25% 100%",
							end:  "100% 50%",
							scrub: true,
							animation: tl
						});
					});

					// Move text
					scroll.moveText({
						delta: 25,
						elements: classMasonryName + " .text > *",
						position: "75%"
					});

					// Move masonry
					scroll.moveText({
						elements: classMasonryName + " .thumbs"
					});
				},
				"(min-aspect-ratio: 1/1)": function() {
					// Rotate masonry
					gsap.set(classMasonryName + " .thumbs", {
						rotation: 0
					});

					// Scroll
					scroll.push(function(tl) {
						for (var index = 1; index <= 4; index++) {
							var yplus = gRandom(250, 1000, 25),
									y = 50;

							if (index == 3) yplus = 0;
							if (index % 2 == 0) y = -50;

							tl.fromTo(classMasonryName + " .thumbs > *:nth-child(4n+" + index + ")", {
								y: y + yplus,
							}, {
								y: y,
								ease: "ease"
							}, 0);
						}

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: classMasonryName,
							start: "-25% 100%",
							end:  "100% 50%",
							scrub: gRandom(75, 125, 5) / 100,
							animation: tl
						});
					});

					// Move text
					scroll.moveText({
						elements: classMasonryName + " .text > *",
						position: "75%"
					});

					// Move masonry
					scroll.moveText({
						elements: classMasonryName + " .thumbs"
					});
				}
			});

			// Style - Angled
			var classAngledName = ".style-angled",
				classAngledNamePicture = classAngledName + " .thumbs > picture";
			// Move pictures
			scroll.moveThumbs(classAngledNamePicture, "75%");
			// Scroll pictures
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function() {
					scroll.push(function(tl) {
						gToArray(classAngledNamePicture).forEach(picture => {
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
							trigger: classAngledName,
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
						gToArray(classAngledNamePicture).forEach(picture => {
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
							trigger: classAngledName,
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
				elements: classAngledName + " .text > *",
				position: "85%"
			});

			// Style - Slideshow
			var classSlideshow = ".style-slideshow";
			// All the functions
			gToArray(classSlideshow).forEach(function(slideshow) {
				// Add navigation
				slideshow.innerHTML += "<div class='before'></div><div class='after'></div>";
				// Variables
				var that = slideshow;
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
							onUpdate: function({progress, direction, isActive}){
								this.progress = progress;
								this.direction = direction;
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
					gsap.timeline({ default: {
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
					gsap.timeline({ default: {
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
			var classSlideshowSmall = ".style-slideshow-small";
			// All the functions
			gToArray(classSlideshowSmall).forEach(function(slideshow, index) {
				scroll.push(function(tl) {
					tl.fromTo(slideshow.children[0].querySelectorAll("picture"), {
						x: "200%"
					}, {
						x: 0,
						ease: "expo.out"
					}, 0);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: slideshow,
						start: "0 90%",
						end: "50% 90%",
						scrub: .75,
						animation: tl
					});
				});
				//
			});
			// Links
			// Move text
			gToArray(".links").forEach(function(element) {
				scroll.moveText({
					elements: element.querySelectorAll("nav > *"),
					position: "100%"
				});
			});

			// Snap to element
			snap(".middle, .links", .15);
		}
	}, {
		namespace: 'me',
		beforeEnter(data) {
			// I'm UI/UX and us sections
			// Snap to element
			snap(".imuiux, .us", .5);
			// Scroll events
			gToArray(".imuiux, .us").forEach(function(element, index) {
				// Scroll and fade
				scroll.push(function(tl) {
					var el = element.querySelectorAll(".text > *");

					if (index > 0) {
						tl.fromTo(el, {
							y: 50,
							opacity: 0
						}, {
							y: 0,
							opacity: 1,
							duration: 1,
							ease: "power2.out"
						}, 0);
					}

					tl.fromTo(el, {
						y: 0
					}, {
						y: -50,
						duration: 2,
						ease: "power2.inOut"
					}, 1);

					tl.fromTo(el, {
						opacity: 1
					}, {
						opacity: 0,
						duration: 1,
						ease: "power2.out"
					}, 2);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						pin: true,
						pinSpacing: false,
						start: "0 0",
						end: "100%+=50% 0",
						animation: tl,
						scrub: true
					});
				});
			});

			// Spinning Mr. Goat and Pinning
			function resizemrgoat() {
				var size = window.innerWidth * 2/3;
				var boxSet = gsap.quickSetter(".mrgoat img", "css");

				if (window.innerWidth > window.innerHeight) size = window.innerHeight * 2/3;

				boxSet({
					width: "auto",
					maxHeight: size
				});
			}
			window.addEventListener("resize", resizemrgoat);
			resizemrgoat();
			gToArray(".mrgoat").forEach(function(element, index) {
				const imgs = gToArray(element.querySelectorAll(".thumbs > img"));
				const h2s = gToArray(element.querySelectorAll(".h2"));
				const ig = element.querySelectorAll(".ig");
				const thumbs = element.querySelectorAll(".thumbs");
				const mrgoat = {
					frame: 0
				};
				// Initial value
				gsap.set(thumbs, {
					opacity: 0
				});
				gsap.set(ig, {
					opacity: 0,
					x: 100
				});
				gsap.set(element.querySelectorAll(".h2 > *"), {
					opacity: 0,
					y: 50
				});
				// Animate appearing
				scroll.push(function(tl) {
					// Show Mr. Goat
					tl.to(thumbs, {
						opacity: 1,
						duration: 3,
						ease: "expo.out"
					}, 0);
					// Show IG link
					tl.to(ig, {
						opacity: 1,
						x: 0,
						duration: 1,
						ease: "expo.out"
					}, 0);
					// Animate H2
					h2s.forEach(function(h2, index) {
						// Show H2
						tl.to(h2.children, {
							y: 0,
							opacity: 1,
							duration: 1,
							ease: "power2.in"
						}, (index * 2) + 1);
						// Hide H2
						tl.to(h2.children, {
							y: -50,
							opacity: 0,
							duration: 1,
							ease: "power2.out"
						}, (index * 2) + 2.5);
					});
					// Show Mr. Goat before disapearing
					tl.set(thumbs, {
						opacity: 1
					});
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: (h2s.length + 1) + "00% 0",
						animation: tl,
						scrub: true
					});
				});
				// Animate Disappearing
				scroll.push(function(tl) {
					// Hide Mr. Goat
					tl.to(thumbs, {
						opacity: 0,
						duration: 1,
						ease: "expo.out"
					}, .1);
					// Hide IG link
					tl.to(ig, {
						opacity: 0,
						x: 100,
						duration: 1,
						ease: "expo.in"
					}, 3);
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: (h2s.length + 1) + "00% 0",
						end: (h2s.length + 3) + "00% 0",
						animation: tl,
						scrub: true
					});
				});
				// Pinning
				scroll.push(function(tl) {
					return tl
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: (h2s.length + 3) + "00% 0",
						animation: tl,
						pin: true,
					});
				});
				// Spin Mr. Goat
				var prev = null;
				gsap.set(imgs, {
					opacity: 0
				});
				scroll.push(function(tl) {
					tl.to(mrgoat, {
						frame: imgs.length - 1,
						snap: "frame",
						duration: 1,
						repeat: 4,
						ease: "linear",
						onUpdate: function () {
							var el = element.querySelector(".mrgoat" + (mrgoat.frame + 1));
							if (prev) prev.style.opacity = 0;
							el.style.opacity = 1;
							prev = el;
						}
					}, 0);
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "-100% 0",
						end: (h2s.length + 4) + "00% 0",
						animation: tl,
						scrub: true
					});
				});
			});

			// Animate IG posts and Pinning
			// Resize picture
			function resizeig() {
				var size = window.innerWidth * 2/3;
				if (window.innerWidth > window.innerHeight) size = window.innerHeight * 1/2;

 				gsap.set(".igstage .thumbs a", {
					width: size,
					height: size
				});

				gsap.set(".igstage", {
					marginTop: -3 * window.innerHeight,
					display: "block"
				});
			}
			window.addEventListener("resize", resizeig);
			resizeig();
			//
			gsap.set(".igstage .thumbs", {
				position: "relative",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			})
			//
			gToArray(".igstage").forEach(function(element, index) {
				var a = element.querySelectorAll(".thumbs a");
				var delta = 50;
				// Set default values
				gsap.set(a, {
					position: "absolute",
					zIndex: function(index) {
						return a.length - index;
					},
					transformOrigin: "center",
					opacity: 0,
					scale: .8
				});
				// Animate Post
				a.forEach(function(pic, index) {
					// Show
					scroll.push(function(tl) {
						tl.to(pic, {
							opacity: 1,
							duration: .25,
							ease: "power3.out"
						}, 0);

						tl.to(pic, {
							scale: 1,
							duration: 1,
							ease: "power3.out"
						}, 0);

						return tl;
					}, function(tl) {
						return ScrollTrigger.create({
							trigger: element,
							start: (index * delta) + "% 0",
							end: ((index + 1) * delta) + "% 0",
							animation: tl,
							toggleActions: "restart none none reverse"
						});
					});
					// Swipe
					if(index < (a.length - 1)) {
						scroll.push(function(tl) {
							var random = gRandom([true, false]);
							var x = random ? (pic.offsetWidth * -3) : window.innerWidth + (pic.offsetWidth * 3);
							var rotation = random ? -20 : 20;

							tl.to(pic, {
								x: x,
								y: window.innerHeight * -2/3,
								rotation: rotation + "deg",
								duration: .75,
								ease: "expo.in"
							}, 0);

							tl.to(pic, {
								opacity: 0,
								duration: .15,
								ease: "expo.in"
							}, .6);

							return tl;
						}, function(tl) {
							return ScrollTrigger.create({
								trigger: element,
								start: ((index + 1) * delta) + "% 0",
								end: ((index + 2) * delta) + "% 0",
								animation: tl,
								toggleActions: "restart none none reverse"
							});
						});
					}
				});
				// Show igstage
				scroll.push(function(tl) {
					tl.fromTo(element.querySelector(".thumbs"), {
						y: window.innerHeight/4,
						opacity: 0
					}, {
						y: 0,
						opacity: 1,
						ease: "expo.out"
					}, 0);

					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: "100% 0",
						animation: tl,
						scrub: true
					});
				});
				// Show skip button
				scroll.push(function(tl) {
					tl.fromTo(element, {
						backgroundColor: ""
					}, {
						backgroundColor: "var(--white)"
					});
					tl.fromTo(element.querySelector(".scrollto"), {
						y: -100,
						opacity: 0
					}, {
						y: 0,
						opacity: 1,
						ease: "expo.in",
						duration: .5
					});
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: ((a.length + 1) * delta * 1/3) + "% 0",
						end: ((a.length + 1) * delta * 1/3) + "% 0",
						animation: tl,
						toggleActions: "restart none none reverse"
					});
				});
				// Pinning
				scroll.push(function(tl) {
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: ((a.length + 1) * delta) + "% 0",
						animation: tl,
						pin: true,
						scrub: true,
						anticipatePin: 2
					});
				});
			});

			// Animate cofounder
			// Resize position
			function resizecofound() {
				gsap.set(".cofound", {
					marginTop: -1 * window.innerHeight
				});
			}
			window.addEventListener("resize", resizecofound);
			resizecofound();
			gToArray(".cofound").forEach(function(element, index) {
				var picture = element.querySelector("picture");
				// Hover
				hoverEvents(element.querySelectorAll("a"), function() {
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
				})
				// Pin
				scroll.push(function(tl) {
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: "100% 0",
						animation: tl,
						scrub: true,
						pin: true,
						anticipatePin: 1
					});
				});
				// Animate
				scroll.push(function(tl) {
					tl.fromTo(element.querySelectorAll(".text > *"), {
						y: window.innerHeight/10
					}, {
						y: window.innerHeight/-10,
						ease: "linear",
						duration: 2
					}, 0);
					tl.fromTo(element.querySelectorAll(".thumbs"), {
						y: 0
					}, {
						y: window.innerHeight/5,
						ease: "linear",
						duration: 1
					}, 1);
					return tl;
				}, function(tl) {
					return ScrollTrigger.create({
						trigger: element,
						start: "0 0",
						end: "200% 0",
						animation: tl,
						scrub: true
					});
				});
			});

			// Move Flare
			var flare = [];
			var animation = function(el, idx) {
				var y = ["150%", "-300%"];
				if (gRandom(1, 2, 1) == 1) y = ["-300%", "200%"];

				return gsap.fromTo(el, {
					left: gRandom(20, 80, 10) + "%",
					y: y[0],
					rotation: gRandom(75, 135, 5)
				}, {
					y: y[1],
					rotation: gRandom(75, 135, 5),
					duration: gRandom(15, 30, 4),
					ease: "linear",
					onCompleteParams: [el, idx],
					onComplete: function(el, idx) {
						animation(el, idx);
					}
				});
			}
			gToArray(".flares").forEach(function(el1, idx1) {
				flare[idx1] = [];
				gToArray(el1.children).forEach(function(el2, idx2) {
					gsap.set(el2, {
						height: "100vw",
						width: "auto",
						opacity: 1,
						top: 0
					});
					// flare[idx1][idx2] = animation(el2, idx2);
				});
			});

			// Links
			// Move text
			gToArray(".links").forEach(function(element) {
				scroll.moveText({
					elements: element.querySelectorAll("nav > *"),
					position: "100%"
				});
			});

			// Snap to element
			snap(".igstage, .cofound, .links", .25);
		}
	}, {
		namespace: 'hi',
		beforeEnter(data) {
			var flare = {
				elements: "",
				show: function(elements, repeat = false) {
					var that = this;

					this.elements = elements;

					gsap.killTweensOf(this.elements);
					if (!repeat) gsap.to(this.elements, {
						opacity: 1,
						ease: "ease.out",
						duration: 1
					});
					if (!repeat) {
						gsap.to(this.elements, {
							x: "random(-100,100,10)%",
							y: "random(10,30,5)%",
							rotation: "random(-5,5,1)deg",
							scale: "random(1,2.5,.5)",
							ease: "ease.out",
							duration: .5
						});
					}
					gsap.to(this.elements, {
						x: "random(-100,100,10)%",
						y: "random(10,30,5)%",
						rotation: "random(-5,5,1)deg",
						scale: "random(1,2.5,.5)",
						duration: 5,
						ease: "ease.inOut",
						onComplete: function() {
							that.show(that.elements, true);
						}
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
				show: function(el, hint, positive = false) {
					var split = -50;

					this.el = el;
					this.hint = hint;

					if (positive) split = 50;

					if (el.length == 2) {
						gsap.killTweensOf(this.el.toString());
						gsap.to(this.el[0], {
							x: split * -1,
							ease: "power3.out",
							duration: .5
						});
						gsap.to(this.el[1], {
							x: split,
							ease: "power3.out",
							duration: .5
						});
					} else {
						gsap.killTweensOf(this.el);
						gsap.to(this.el, {
							x: split,
							ease: "power3.out",
							duration: .5
						});
					}

					gsap.fromTo(this.hint, {
						y: 50
					}, {
						y: 0,
						opacity: 1,
						ease: "power3.out",
						duration: .5
					});
				}, hide() {
					gsap.to(this.el, {
						x: 0,
						ease: "power3.out",
						delay: .1,
						duration: .5
					});
					gsap.to(this.hint, {
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

			hoverEvents(_qAll(".hi .email"), function(el) {
				textanim.show(el.querySelector("span"), el.querySelector("small"));
				flare.show(".hi img.yellow, .hi img.red");
			}, function(el) {
				textanim.hide();
				flare.hide();
			});
			hoverEvents(_qAll(".hi .social"), function(el) {
				textanim.show([".hi .website span", ".hi .email span"], ".hi .social span:first-child small");
				flare.show(".hi img.blue, .hi img.red");
			}, function(el) {
				textanim.hide();
				flare.hide();
			});
			hoverEvents(_qAll(".hi .website"), function(el) {
				textanim.show(".hi .social span:nth-child(2), .hi .website span", ".hi .social span:nth-child(2) small", true);
				flare.show(".hi img.blue, .hi img.green");
			}, function(el) {
				textanim.hide();
				flare.hide();
			});
		}
	}]
});