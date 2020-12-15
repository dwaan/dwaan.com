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

// Report size of window
if (REPORTSIZE) {
	console.info("Window:", window.innerWidth, window.innerHeight);
	console.info("Body:", _q("body").offsetWidth, _q("body").offsetHeight);
	window.addEventListener('resize', function() {
		console.info("Window:", window.innerWidth, window.innerHeight);
		console.info("Body:", _q("body").offsetWidth, _q("body").offsetHeight);
	});
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
					var arrow = el.querySelectorAll(".arrow-big, .arrow-small");
					var year = el.querySelectorAll(".year");

					scroll.push(function(tl) {
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
							y: (idx == 0) ? window.innerHeight *  -1/10 : 0,
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
				"(min-aspect-ratio: 1/1)": function() {
					var arrow = el.querySelectorAll(".year, .arrow-big, .arrow-small");

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
		});
	}

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
							left: "-=100",
							duration: .75,
							ease:"power3.out"
						});
						gsap.to("main .middle > .text", {
							left: "-=50",
							duration: .75,
							ease:"power3.out"
						});
						gsap.to("main .links, main .flares", {
							left: "-=25",
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
								left: 0,
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

				// tl = animate.top(tl);
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
				onComplete: function() {
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
	views: [home, detail, me, hi, lost, plurk]
});