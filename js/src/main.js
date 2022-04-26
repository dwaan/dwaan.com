var debug = false;

var gToArray = gsap.utils.toArray;
var gRandom = gsap.utils.random;


// Logo SVG
var logosvg = _q(".logo").innerHTML;
addClass(_q("html"), "snap");


//////////////// Dark Mode
var darkmode = false;
var browserColorLight = "";
var browserColorDark = "";
function toggleDarkMode(duration = 0.24, ease = "power3.in") {
	var color = "";

	if (darkmode) {
		color = browserColorDark == "" ? "#000000" : browserColorDark;
		addClass(_q("html"), "dark");
	} else {
		color = browserColorLight == "" ? "#FFFFFF" : browserColorLight;
		removeClass(_q("html"), "dark");
	}

	gsap.to(document.querySelector("meta[name=theme-color]"), {
		attr: { "content": color },
		duration: duration,
		ease: ease
	});
	gsap.to(document.querySelector("html"), {
		backgroundColor: color,
		duration: duration,
		ease: ease
	});
}
if (window.matchMedia) {
	var darkmodemedia = window.matchMedia('(prefers-color-scheme: dark)');
	var setdarkmode = function (e) {
		if (e.matches) darkmode = true;
		else darkmode = false;
		toggleDarkMode();
	}
	setdarkmode(darkmodemedia);
	darkmodemedia.addListener(function (e) {
		setdarkmode(e);
	});
}

// Report size of window
if (debug) {
	console.info("Window:", window.innerWidth, window.innerHeight);
	console.info("Body:", _q("body").offsetWidth, _q("body").offsetHeight);
	window.addEventListener('resize', function () {
		console.info("Window:", window.innerWidth, window.innerHeight);
		console.info("Body:", _q("body").offsetWidth, _q("body").offsetHeight);
	});
}


// Displaying rounded corner only on fullscreen
var displayRoundedCorner = function () {
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

// Default barba hooks
barba.hooks.before(function (data) {
	api.abort();
	return true;
});
barba.hooks.beforeEnter(function (data) {
	var done = this.async();
	var next = data.next.container;

	// Destroy prev scroll
	scroll.destroy();

	window.scrollTo(0, 0);

	if (data.next.namespace != "replurk2020" && data.next.namespace != "replurk2021") {
		// Scroll animate arrow
		var middle = next.querySelectorAll("section.middle:not(.hidearrow)");
		middle.forEach(function (el, idx) {
			var scrollfunc = function (tl) {
				return ScrollTrigger.create({
					// scroller: next,
					trigger: el,
					start: "0 50%",
					end: "100% 50%",
					scrub: true,
					animation: tl
				})
			};

			// Animate arrow
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function () {
					var arrow = el.querySelectorAll(".arrow-big, .arrow-small");
					var year = el.querySelectorAll(".year");

					scroll.push(function (tl) {
						// Show Arrow
						tl.fromTo(arrow, {
							position: "relative",
							x: 0,
							y: 0,
							opacity: 0
						}, {
							opacity: 1,
							ease: "linear",
							duration: 3
						});
						// Hide Arrow
						tl.fromTo(arrow, {
							x: 0,
							y: 0,
							opacity: 1
						}, {
							y: (idx < middle.length - 1) ? window.innerHeight / 4 : 0,
							opacity: 0,
							ease: "linear",
							duration: 3
						});
						// Hide Year
						tl.fromTo(year, {
							position: "fixed",
							x: 0,
							y: 0,
							opacity: 1
						}, {
							x: (idx > 0 && idx < middle.length - 1) ? 50 : 0,
							y: (idx == 0) ? window.innerHeight * -1 / 10 : 0,
							opacity: (idx < middle.length - 1) ? 0 : 1,
							ease: "power3.in",
							duration: 3
						}, "<");
						tl.set(year, {
							position: "absolute"
						});

						return tl;
					}, scrollfunc);
				},
				"(min-aspect-ratio: 1/1)": function () {
					var arrow = el.querySelectorAll(".year, .arrow-big, .arrow-small");

					scroll.push(function (tl) {
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
							y: (idx == 0) ? window.innerHeight * -1 / 5 : 0,
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
		});
		var middle = next.querySelectorAll("section.middle.hidearrow");
		middle.forEach(function (el, idx) {
			var arrow = el.querySelectorAll(".arrow-big, .arrow-small");
			gsap.set(arrow, {
				display: 'none',
				opacity: 0,
				pointerEvents: 'none'
			})
		});
	}

	done();
});
barba.hooks.afterEnter(function (data) {
	var done = this.async();
	var next = data.next.container;

	// Read more
	next.querySelectorAll("a.scrollto").forEach(function (a) {
		a.addEventListener("click", function (e) {
			e.preventDefault();
			removeClass(_q("html"), "snap");
			gsap.to(window, {
				duration: .75,
				ease: "expo.inOut",
				scrollTo: e.target.getAttribute("href"),
				onComplete: function () {
					addClass(_q("html"), "snap");
				}
			});
		});
	});

	done();
});

// Initialized barba.js
barba.init({
	debug: false,
	transitions: [{
		name: 'default-transition',
		once: function (data) {
			// Define async and next container
			var done = this.async();
			var next = data.next.container;

			// Display loading
			loader.init();
			// Loading logic
			loader.show(next, function () {
				// Animate current view and header
				if (data.next.namespace == "lost") {
					animate.show404(next, function () {
						loader.empty();
						done();
					});
				} else if (data.next.namespace == "replurk2020" || data.next.namespace == "replurk2021") {
					animate.showinstant(next, function () {
						loader.empty();
						done();
					});
				} else {
					animate.show(next, function () {
						loader.empty();
						done();
					});
				}
			});

			header.show();
			header.waving();
			header.slide();
			header.hamburger();
			header.darkmodeswitch();
			header.textswitch();
		},
		leave: function () {
			return true;
		},
		before: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init();

			// Hide current view
			animate.hide(current, function () {
				// Image loading logic
				loader.show(next, function () {
					done();
				});
			});
		},
		enter: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Reset current element values
			current.style.position = "fixed";
			current.style.opacity = 0;
			if (current.querySelector(".arrow-big")) current.querySelector(".arrow-big").style.opacity = 0;

			// Animate current view
			animate.show(next, function () {
				done();
			});
		},
		after: function (data) {
			loader.empty();

			return true;
		},
	}, {
		name: 'home-to-detail',
		leave: function (data) {
			return true;
		},
		before: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init(true);

			// Hide current view
			animate.hide(current, function () {
				// Image loading logic
				loader.show(next, function () {
					done();
				});
			}, current.querySelectorAll(".arrow"), false);
		},
		enter: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Reset current element values
			current.style.position = "fixed";
			current.style.opacity = 0;
			next.style.position = "fixed";
			next.style.opacity = 1;

			// Animate Next view
			animate.show(next, function () {
				done();
			}, next.querySelectorAll(".arrow, .year"));
		},
		after: function (data) {
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
		leave: function (data) {
			return true;
		},
		before: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init(true);

			// Hide current view
			animate.hide(current, function () {
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
				loader.show(next, function () {
					done();
				});
			}, current.querySelectorAll(".arrow"));
		},
		enter: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Reset current element values
			removeStyle(current.querySelectorAll(".main-text, .main-text > h1"));

			// Animate Next view
			animate.show(next, function () {
				done();
			}, next.querySelectorAll(".arrow"));
		},
		after: function (data) {
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
		leave: function (data) {
			return true;
		},
		before: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init(true);

			// Image loading logic
			loader.show(next, function () {
				var tl = gsap.timeline({
					defaults: {
						duration: .75,
						stagger: .1,
						ease: "power3.out"
					}
				});
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
						onComplete: function () {
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
					opacity: 0,
					stagger: false
				}, .25);

				if (window.matchMedia('(min-aspect-ratio: 1/1)').matches) {
					tl.fromTo(current.querySelector(".footer .email"), from, to, 0);
				} else {
					tl.set(next, {
						onComplete: function () {
							done();
						}
					});
				}
			});
		},
		enter: function (data) {
			var done = this.async();
			var next = data.next.container;

			// Animate current view if needed
			if (window.matchMedia('(max-aspect-ratio: 1/1)').matches) {
				// Show next container
				next.style.opacity = 1;

				gsap.set(next, {
					position: "fixed",
					top: 0
				});
				// Show next elements
				next.querySelector(".footer").style.opacity = 1;
				gsap.fromTo(next.querySelectorAll(".main-text h1 > *"), {
					x: -100,
					opacity: 0
				}, {
					x: 0,
					opacity: 1,
					duration: .5,
					ease: "power3.out",
					stagger: {
						from: "start",
						amount: .1
					},
					onComplete: function () {
						done();
					}
				});
			} else {
				done();
			}
		},
		after: function (data) {
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
		leave: function (data) {
			return true;
		},
		before: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init();

			var tl = gsap.timeline({
				defaults: {
					duration: .75,
					stagger: .1,
					ease: "power3.out"
				}
			});

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
			};
			var to = {
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
				onComplete: function () {
					// Selectively show next elements
					gsap.set(next.querySelectorAll(".footer .email"), { opacity: 1 });
				}
			};

			current.querySelector(".main-text").style = {};

			// For vertical screen, just fade in.
			if (window.matchMedia('(max-aspect-ratio: 1/1)').matches) {
				tl.fromTo(current.querySelectorAll(".main-text h1 > *"), {
					x: 0,
					opacity: 1
				}, {
					x: -100,
					opacity: 0,
					duration: .25,
					stagger: .1,
					ease: "power3.in"
				}, 0);
			} else {
				tl.fromTo(current.querySelector(".main-text h1"), from, to, 0);
			}
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
				onComplete: function () {
					// Image loading logic
					loader.show(next, function () {
						done();
					});
				}
			}, .25);
		},
		enter: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;
			var elements = ".main-text, .arrow";

			// Animate current view
			animate.show(next, function () {
				done();
			}, next.querySelectorAll(elements), false);
		},
		after: function (data) {
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
		leave: function (data) {
			return true;
		},
		before: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init();

			// Hide current view
			animate.hide404(current, function () {
				// Image loading logic
				loader.show(next, function () {
					done();
				});
			});
		},
		enter: function (data) {
			var done = this.async();
			var next = data.next.container;

			// Animate current view
			animate.show(next, function () {
				done();
			});
		},
		after: function (data) {
			// Remove loading
			loader.empty();

			return true;
		},
		from: {
			namespace: ['lost']
		}
	}, {
		name: 'to-lost',
		leave: function (data) {
			return true;
		},
		before: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Display loading
			loader.init();

			// Hide current view
			animate.hide(current, function () {
				// Image loading logic
				loader.show(next, function () {
					done();
				});
			});
		},
		enter: function (data) {
			var done = this.async();
			var next = data.next.container;

			// Animate current view
			animate.show404(next, function () {
				done();
			});
		},
		after: function (data) {
			// Remove loading
			loader.empty();

			return true;
		},
		to: {
			namespace: ['lost']
		}
	}, {
		name: 'from-plurk',
		leave: function (data) {
			return true;
		},
		before: function (data) {
			var done = this.async();
			var current = data.current.container;
			var tl = gsap.timeline();

			// Display loading
			loader.init();

			// Hide current view
			tl = animate.top(window, tl);
			tl.set(current.querySelectorAll("#credits, #statistics"), {
				opacity: 0
			}, "hide");
			tl.to(current.querySelectorAll("#hello .bgtext sub, #permission .bgtext sub"), {
				y: 100,
				opacity: 0,
				duration: 1,
				ease: "power3.in"
			}, "hide");
			tl.to(current.querySelectorAll("#hello .bgtext sup, #permission .bgtext sup"), {
				y: -100,
				opacity: 0,
				duration: 1,
				ease: "power3.in"
			}, "hide");
			tl.to(current.querySelectorAll("#hello .text, #hello .thumbs, #hello .arrow-big, .footer,  #permission form"), {
				y: 500,
				opacity: 0,
				duration: 1,
				ease: "power3.in"
			}, "hide+=.2");
			tl.to(current.querySelectorAll("#hello, #permission"), {
				opacity: 0,
				duration: 1,
				ease: "power3.in",
				onStart: () => {
					browserColorLight = "";
					browserColorDark = "";
					toggleDarkMode(1);
				}
			}, "hide+=.4");
			tl.set(current, {
				onComplete: function () {
					done();
					gsap.set(current.querySelectorAll("#credits"), {
						opacity: 1
					});
				}
			});
		},
		enter: function (data) {
			var done = this.async();
			var current = data.current.container;
			var next = data.next.container;

			// Reset current element values
			current.style.position = "fixed";
			current.style.opacity = 0;
			if (current.querySelector(".arrow-big")) current.querySelector(".arrow-big").style.opacity = 0;

			// Animate current view
			animate.show(next, function () {
				done();
			});
		},
		after: function (data) {
			// Remove loading
			loader.empty();

			return true;
		},
		from: {
			namespace: ['replurk2020', 'replurk2021']
		}
	}],
	views: [homeview, detailview, meview, hiview, lostview, replurk2020view, replurk2021view]
});