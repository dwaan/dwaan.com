'use strict';

// General variables
var dark_mode = false,
	logo_svg = _q(".logo").innerHTML,
	// Variables for barba views
	current_barba = {
		onImageLoadComplete: function() {},
		onImageLoadAnimateComplete: function() {},
		onImageLoadAnimateHalfComplete: function() {}
	},
	controller = new ScrollMagic.Controller(),
	els = null,
	anim = null,
	tl = null,
	tinysliders = [];

// Put mandatory html stuff
_q("body").innerHTML += '<div id="sky"></div><div id="click-cover"></div><div class="support"><div class="cm__table"><div class="cm__cell"><div class="content"><h1>😭</h1><h3>Please don\'t squaze me 😱.</h3><h4>Have mercy on me 👦🏾.</h4><p>I think your screen is just to small for me to support it.</p><p>Please rotate your screen📱 or resize your browser 💻 if posible for better layout.</p></div></div></div></div><div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div> <button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"> </button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"> </button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>';
_q("header .menu__item").innerHTML = '\
	<div class="border"><div></div></div>\
	<div class="menu__pos">\
		<ul class="plain">\
			<li class="close"><span>close <i class="icn icn_close"></i></span></li>\
			<li><a href="./">home</a></li>\
			<li><a href="./me">me</a></li>\
			<li><a href="./work">work</a></li>\
			<li><hr /></li>\
			<li><a href="./say-hi">say, hi!</a></li>\
			<li><p>I decide not to use any trackig cookies, local storage and analytics scripts in my website. You`re free from tracking.</p></li>\
		</ul>\
	</div>';
// Snoop which text or url that are currently clicked
var clicked_target = null,
	clicked_text = "";
document.addEventListener('click', function (e) {
	e = e || window.event;
	clicked_target = e.target || e.srcElement;
	clicked_text = clicked_target.textContent || clicked_target.innerText;
}, false);


// Dark Mode
function toggleDarkMode() {
	var size = (window.innerHeight > window.innerWidth) ? window.innerHeight : window.innerWidth,
		pos = _q('#mode').getBoundingClientRect(),
		tl;

	gsap.set("#sky", { x: pos.x, y: pos.y, width: pos.width, height: pos.width });

	tl = gsap.timeline({ defaults: { ease: "expo", duration: 1.024 }})
	if(!dark_mode) {
		gsap.set("#sky", { x: pos.x, y: pos.y, width: pos.width, height: pos.width, opacity: 0 });
		dark_mode = true;
		tl
			.fromTo("#mode svg #moon", { opacity: 0 }, { opacity: 1, ease: "expo.out" }, 0)
			.fromTo("#mode svg #sun", { opacity: 1 }, { opacity: 0, ease: "expo.out" }, 0)
			.fromTo("#sky", { scale: 1 }, { scale: 100, onComplete: function() {
				window.dark_mode_animate = false;
			}}, 0)
			.fromTo("#sky", { opacity: 0 }, { opacity: 1, duration: .896 }, 0)
			.to("html", { duration: .128, onComplete: function() {
				addClass(_q("html"), "dark");
			}}, 0)
		;
	} else {
		dark_mode = false;
		tl
			.fromTo("#mode svg #moon", { opacity: 1 }, { opacity: 0, ease: "expo.out" }, 0)
			.fromTo("#mode svg #sun", { opacity: 0 }, { opacity: 1, ease: "expo.out" }, 0)
			.fromTo("#sky", { scale: 100 }, { scale: 1, onComplete: function() {
				window.dark_mode_animate = false;
			}}, 0)
			.fromTo("#sky", { opacity: 1 }, { opacity: 0, duration: .768 }, .256)
			.set("html", { backgroundColor: "#A4CDD6" }, 0)
			.to("html", { duration: .256, onComplete: function() {
				removeClass(_q("html"), "dark");
			}}, 0)
		;
	}
}
if(window.matchMedia){
	var darkmode = window.matchMedia('(prefers-color-scheme: dark)');
	darkmode.addListener(function(e){
		h = _q("html");
		if(e.matches) dark_mode = false;
		else dark_mode = true;
		toggleDarkMode();
	});
}

///////////////////// Menu Functionality

var menu = {
	active: false,
	el: null,
	init: function() {
		var that = this;

		gsap.set('.menu__pop .menu__item', {opacity: 0});

		// The bright/dark mode switcher
		this.el = _q('#mode');
		gsap.set(this.el.querySelector("#ray"), {transformOrigin: "center center"})
		this.el.onmousedown = function (e) {
			toggleDarkMode();
			e.preventDefault();
		}
		this.el.onmouseenter = function() {
			gsap.to(this.querySelector("#ray"), { rotation: 90, scale: 1.1, duration: .768, ease: "elastic.out" });
		}
		this.el.onmouseleave = function() {
			gsap.to(this.querySelector("#ray"), { rotation: 0, scale: 1, duration: .768, ease: "elastic.out" });
		}

		// The main menu events
		this.el = _q('.menu__pop > a');
		this.el.onclick = function (e) {
			var tl = gsap.timeline();

			addClass(this.parentNode, "active");
			that.active = true;

			tl
				.fromTo('.menu__pop .menu__item', { yPercent: 0, xPercent: 0, opacity: 0, scale: 1 }, { yPercent: 0, opacity: 1, scale: 1, duration: .256, ease: "power2" })
				.fromTo('.menu__pop .menu__item ul li, .menu__pop .menu__item .border', { transformOrigin: "0 0", xPercent: 200, opacity: 0 }, { xPercent: 0, opacity: 1, duration: .768, ease: "expo.out", stagger: {
					from: 0,
					amount: .128
				}})
			;

			e.preventDefault();
		}
		this.el.onmouseenter = function() {
			gsap.to(this.querySelector("#menu-short"), { attr: { x1: 22 }, duration: .768, ease: "elastic.out" });
		}
		this.el.onmouseleave = function() {
			gsap.to(this.querySelector("#menu-short"), { attr: { x1: 16 }, duration: .768, ease: "elastic.out" });
		}

		// The logo events
		this.el = _q('.logo');
		this.el.onmouseenter = function() {
			gsap.to(".logo .hat", { transformOrigin: "50% 75%", yPercent: -3, xPercent: -1, rotation: 4, duration: 1.024, ease: "elastic.out" })
		}
		this.el.onmouseleave = function() {
			gsap.to(".logo .hat", { transformOrigin: "50% 75%", yPercent: 0, xPercent: 0, rotation: 0, duration: 1.024, ease: "elastic.out" });
		}

		// The main menu hover item animation
		var border = ".menu__item .border",
			borderRadius,
			_hugeText = new hugeText(border + " > div ");

		for (var i = 2; i <= 6; i++) {
			if(i == 5) i = 6;

			this.el = _q('.menu__pop .menu__item li:nth-child(' + i + ') a');

			if(i == 2)
				this.el.borderRadius = "25% 2% 2% 2%";
			else if(i == 3)
				this.el.borderRadius = "2% 25% 2% 2%";
			else if(i == 4)
				this.el.borderRadius = "2% 2% 25% 2%";
			else
				this.el.borderRadius = "2% 2% 2% 25%";

			this.el.onmouseenter = function() {
				gsap.to(border, { duration: .386, ease: "expo", borderRadius: this.borderRadius });
				_hugeText.show(this.innerHTML);
			}
			this.el.onmouseleave = function() {
				gsap.to(border, { duration: .386, ease: "expo", borderRadius: "2% 2% 2% 2%" });
				_hugeText.hide();
			}
		}

		// The main menu close events
		this.el = _q('.menu__item .close span');
		this.el.onclick = function (e) {
			var tl = gsap.timeline();
			tl
				.to('.menu__pop .menu__item ul li, .menu__pop .menu__item .border', { xPercent: -200, opacity: 0, duration: .512, ease: "expo.in", stagger: {
					from: 0,
					amount: .128
				}})
				.to('.menu__pop .menu__item', { opacity: 0, duration: .256, ease: "power2" })
			;
			removeClass(this.parentNode.parentNode.parentNode.parentNode.parentNode, "active");
			that.active = false;

			e.preventDefault();
		}
		this.el.onmouseover = function() {
			gsap.to(this.querySelector(".icn_close"), {
				duration: .512,
				ease: "expo.out",
				rotation: 90
			});
		}
		this.el.onmouseout = function() {
			gsap.to(this.querySelector(".icn_close"), {
				duration: .512,
				ease: "expo.in",
				rotation: 0
			});
		}

		// Lang events
		this.el = _qAll('.lang li a');
		for (var i = this.el.length - 1; i >= 0; i--) {
			gsap.set(this.el[i].nextElementSibling || nextElementSibling(this.el[i]), {
				opacity: 0,
				marginTop: 50
			});

			this.el[i].onclick = function (e) {
				e.preventDefault();
				gsap.to(".lang .chat__bubble", { duration: .128, ease: "ease.out", opacity: 0, marginTop: 50 });
				gsap.to(this.nextElementSibling || nextElementSibling(this), { duration: .386, ease: "elastic.out", opacity: 1, marginTop: 10, onComplete: function() {
					gsap.to(".lang .chat__bubble", { duration: .128, ease: "ease.out", opacity: 0, marginTop: 50, delay: 1.024 });
				}});
			}
		}
	}
}

//////////////////// Loading animation

var loading = {
	selector: _q("#loading-cover"),
	breath: gsap.timeline({repeat: -1, ease: "linear"}),
	// float: gsap.timeline({repeat: -1, repeatRefresh: true, yoyo: true, ease: "expo", duration: .768}),
	init: function() {
		var el = "";

		gsap.set(this.selector, { top: 0, bottom: 0, left: 0, right: 0 });

		// Some floating animation for loading-cover
		el = "#loading-cover";
		this.breath
			.to(el, {transformOrigin: "50%", scale: 1, duration: .9})
			.to(el, {scale: 1.15, duration: 1.7})
			.to(el, {scale: 1.15, duration: .6})
			.to(el, {scale: 1, duration: 1.7});
		this.breath.pause();

		// Some floating animation for hero image
		// Disable, too exessive
		// el = ".loading > div";
		// this.float
		// 	.to(el, { yPercent: "random(5, 10)" })
		// 	.to(el, { yPercent: "random(-10, -5)" })
		// ;
	},
	show: function (callback) {
		var that = this,
			var_from = { xPercent: 0, yPercent: 100 },
			var_to = { xPercent: 0, yPercent: 0, duration: .768, ease: "expo.inOut", onComplete: function() {
					if(callback != undefined)
						callback();
					}
				};

		_q("#click-cover").style.display = "block";

		if(menu.active) {
			var_from.xPercent = 100;
			var_from.yPercent = 0;
			var_to.xPercent = 0;
			var_to.yPercent = 0;
			var_to.ease = "expo.inOut";
		}

		removeClass(_q('.menu__pop'), 'active');
		menu.active = false;

		// Hide loading
		if(clicked_text == "See All") {
			var_from = {
				xPercent: -100,
				yPercent: 0
			};
		} else if(clicked_text == "Back") {
			var_from = {
				xPercent: 100,
				yPercent: 0
			};
		}

		if(_q("[data-namespace]").getAttribute("data-namespace") == "call") {
			var tl = gsap.timeline({ defaults: { duration: .386, ease: "expo" }}),
				sl = that.selector;

			window.aspectRatio.onchange = null;

			removeClass(sl, "bubble");
			tl
				.set(sl, {zIndex: 666})
				.set(sl.querySelector(".light"), { height: 0 })
				.to(sl.querySelector(".text"), { opacity: 0 })
				.fromTo(sl.querySelector(".loading"), { opacity: 0, yPercent: 100 }, { opacity: 1, y: 0, yPercent: -50 }, 0)
				.to(sl, { position: "fixed", top: 0, right: 0, width: window.innerWidth, height: window.innerHeight, borderRadius: 0, duration: .768, ease: "expo.inOut", onComplete: function() {
					gsap.set(sl, { top: 0, bottom: 0, left: 0, right: 0, width: "auto", height: "auto" });
					if(callback != undefined) callback();
				}}, "-=.512");
		} else {
			gsap.fromTo(this.selector, var_from, var_to);
		}
	},
	hide: function (callback, callback__half) {
		var that = this,
			var_from = { xPercent: 0, yPercent: 0 },
			var_to = { xPercent: 0, yPercent: -100, duration: 1.024, ease: "expo.inOut", onComplete: function() {
					// Move loading
					gsap.set(that.selector, { yPercent: -200 });
					// Set progress bar back to zero
					that.update({duration: 0, height: 0});
					// Unhide loading
					gsap.set(that.selector.querySelector(".loading"), {opacity: 1});
					// Run callback
					if(callback != undefined)
						callback();
					}
				};

		// Hide loading
		if(clicked_text == "See All") {
			var_to.xPercent = -100;
			var_to.yPercent = 0;
		} else if(clicked_text == "Back") {
			var_to.xPercent = 100;
			var_to.yPercent = 0;
		}

		if(_q("[data-namespace]").getAttribute("data-namespace") == "call") {
			var tl = gsap.timeline({ defaults: { duration: .386, ease: "expo.inOut" }}),
				sl = that.selector,
				size = [];

			window.aspectRatio = window.matchMedia("(max-aspect-ratio: 1/1)");
			window.aspectRatio.size = function(set) {
				var size = [];
				size[0] = sl.querySelector(".loading").offsetWidth + (sl.querySelector(".loading").offsetWidth / 2);
				size[1] = "17.5vh";

				if(this.matches) {
					size[0] = sl.querySelector(".loading").offsetHeight + (sl.querySelector(".loading").offsetHeight / 2);
					size[1] = "15vh";
				}

				if(set) gsap.to(sl, { width: size[0], height: size[0], duration: .512 });

				return size;
			}
			size = window.aspectRatio.size();
			window.aspectRatio.onchange = function() {
				size = window.aspectRatio.size(true);
			}

			tl
				.to(sl.querySelector(".loading"), { opacity: 0 }, 0)
				.to(sl.querySelector(".text"), { margin: 0, onComplete: function() {
						addClass(sl, "bubble");
						gsap.set(sl.querySelector(".text"), { opacity: 1 })
						sl.querySelector(".text").innerHTML = "<p class='hi'>hi!</p>";
					}}, 0)
				.to(sl, { width: size[0], height: size[0], top: size[1], left: "initial", right: "11.5vw", borderRadius: "1000px", duration: .768 }, 0)
				.set(sl, { zIndex: 1 });

			if(callback != undefined) callback();
		} else {
			gsap.fromTo(that.selector, var_from, var_to);
			gsap.fromTo(that.selector, { scale: 1 }, { scale: 1, duration: var_to.duration / 3, onComplete: function() {
				if(callback__half != undefined) callback__half();
			}});
		}

		_q("#click-cover").style.display = "none";
	},
	update: function (percent) {
		gsap.to("#loading-cover .loading .light", percent);
	},
	animate: function (view, callback) {
		var animate = false;

		switch (view) {
			case "first-time":
				this.selector.querySelector(".text").innerHTML = "<div class='hi'><h1>hello!</h1></div><div class='dwan'><h2>this is dwan</h2></div>";
				animate = true;
				break;
			case "404":
				this.selector.querySelector(".text").innerHTML = "<div class='hi'><h1>oh 🦀,</h1></div><div class='dwan'><h2>you lost! 😢</h2></div>";
				animate = true;
				break;
			default:
				animate = false;
				break;
		}

		if(animate) {
			if(callback == undefined) {
				callback = function() {}
			}
			var lv = "#loading-cover",
				tl = gsap.timeline({ defaults: { duration: .768, ease: "expo.out" }});
			tl
				.set(lv + " .text", {opacity: 1})
				.to(lv + " .left-hand", { transformOrigin: "99% 0", duration: .256, ease: "expo", yPercent: 35, rotation: 65 })
				.to(lv + " .right-hand", { transformOrigin: "1% 0", duration: .256, ease: "expo", yPercent: 35, rotation: -65 }, "-=.256")
				.fromTo(lv + " .loading", { opacity: 1 }, { opacity: 0 }, "+=.512")
				.fromTo(lv + " .hi h1", { yPercent: 120 }, { yPercent: 0 }, "-=.512")
				.fromTo(lv + " .dwan h2", { yPercent: 120 }, { yPercent: 0 }, "-=.512")
				.set(lv + " .left-hand", { transformOrigin: "99% 0", yPercent: 0, rotation: 0 })
				.set(lv + " .right-hand", { transformOrigin: "1% 0", yPercent: 0, rotation: 0 })
				.call(callback);
		}
	},
	clear: function() {
		this.selector.querySelector(".text").innerHTML = "";
	}
}

//////////////// Loading Image

var imageloading = {
	loaded: false,
	elem: null,
	barba_object: null,
	first_loading: true,
	first_animation_done: false,
	callback: null,
	init: function (elem, callback) {
		var that = this,
			imgs = null,
			imgs_count = 0,
			imgs_loaded = [],
			callback_called = 0;

		that.callback = callback;

		if(elem.newContainer) {
			this.elem = elem.newContainer;
			this.barba_object = elem;
		} else {
			this.elem = elem;
			this.barba_object = null;
		}
		imgs = this.elem.querySelectorAll("img");
		imgs_count = imgs.length;

		this.loaded = false;
		if(imgs.length <= 0) {
			// No image, just unhide the loading
			loading.update({duration: .256, height: "100%"});
			that.loaded = true;
			if(that.callback) that.callback(that);
			else that.done();
		} else {
			// Found image, load them with ajax
			var progress = function(index, percent) {
				loading.update({
					duration: .256,
					height: percent + "%"
				});

				if(percent >= 100 && !that.loaded) {
					that.loaded = true;
					if(callback_called == 0) {
						callback_called++;

						if(that.callback) that.callback(that);
						else that.done();
					} else {
						that.done();
					}
				}
			}

			for (var i = 0; i < imgs.length; i++) {
				imgs_loaded[i] = 0;
				// When loaded report it as a progress
				if(imgs[i].complete) {
					progress(imgs_count--, 100-(imgs_count/imgs.length*100));
				} else {
					imgs[i].addEventListener("load", function(e) {
						progress(imgs_count--, 100-(imgs_count/imgs.length*100));
					});
				}
			}
		}
	},
	done: function (callback) {
		var that = this;

		if(that.first_animation_done) {
			// Add delay before hiding loading
			gsap.to(window, {
				duration: .256,
				onComplete: function() {
					if(that.barba_object != null) {
						that.elem.style.visibility = "visible";
						that.barba_object.done();
					}

					if(that.loaded) {
						// Run custom onLoadedComplete method in barba
						if(current_barba.onImageLoadComplete) current_barba.onImageLoadComplete();

						// Scroll up instantly
						gsap.to(window, { duration: 0, scrollTo: 0, onComplete: function() {
							// Hide loading
							loading.hide(
								function() {
									if(that.first_loading) {
										that.first_loading = false;
										loading.clear();
									}

									that.loaded = false;

									// Run custom onLoadedComplete method in barba
									if(current_barba.onImageLoadAnimateComplete) current_barba.onImageLoadAnimateComplete();
									if(callback) callback(that);
								},
								function() {
									if(current_barba.onImageLoadAnimateHalfComplete) current_barba.onImageLoadAnimateHalfComplete();
								}
							);
						}});

						that.elem = null;
						that.barba_object = null;
					}
				}
			});
		} else {
			if(callback) callback(that);
		}
	}
}

///////////////////// Menu Functionality

var worklist = {
	hover: function (el) {
		el = _qAll(el);
		for (var i = el.length - 1; i >= 0; i--) {
			var scale = 1.05
			if(el[i].offsetWidth < 100) scale = 1.15;

			el[i].gsap = gsap.timeline({repeat: -1, ease: "expo"});
			el[i].gsap
				.to(el[i], { transformOrigin: "50%", scale: scale, duration: 1.7 })
				.to(el[i], { scale: scale, duration: .6 })
				.to(el[i], { scale: 1, duration: 1.7 })
				.to(el[i], { scale: 1, duration: .9 });
			el[i].gsap.pause();
			el[i].onmouseenter = function() {
				this.gsap.restart();
			}
			el[i].onmouseleave = function() {
				this.gsap.pause();
				gsap.to(this, { transformOrigin: "50%", scale: 1, duration: .512 })
			}
		}
	}
}

//////////////////// Loading animation

var FadeTransition = Barba
	.BaseTransition
	.extend({
		start: function () {
			var that = this;

			function animate() {
				// Make the barba wrapper fix so it won't have jaggy animation
				_q("#barba-wrapper").style.height = _q("#barba-wrapper").offsetHeight + "px";

				// Show loading then load the new container
				loading.show (function() {
					gsap.set('.menu__pop .menu__item', { opacity: 0, yPercent: 100 }, .768);
					that.newContainerLoading.then(that.finish.bind(that));
				});
			}

			if(menu.active) {
				var tl = gsap.timeline({ defaults: { duration: 1.024, ease: "expo.out" }});

				removeClass(_q('.menu__pop'), "active");

				animate();
				tl.fromTo('.menu__pop .menu__item ul li, .menu__pop .menu__item .border', { xPercent: 0, opacity: 1 }, { xPercent: -200, opacity: 0, stagger: {
					from: 0,
					amount: .128
				}});
			} else {
				animate();
			}
		},
		finish: function() {
			var that = this;

			// Hide newContainer for a bit
			that.newContainer.style.display = "block";
			that.newContainer.style.visibility = "hidden";

			// Remove previous height setting
			_q("#barba-wrapper").style.height = "";

			// Wait for all image to be loaded
			imageloading.init(that);
		}
	});
Barba.Pjax.getTransition = function() {
	return FadeTransition;
};

////////////// Barba views

var Home = Barba
	.BaseView
	.extend({
		namespace: 'home',
		onEnter: function() {
			current_barba = this;

			gsap.set(".hero", { y: window.innerHeight });
			gsap.set(".work_float", { y: 500 });

			splitText(".hero__text h1, .hero__text p");
		},
		onEnterCompleted: function() {
			var fruits = ["empty.png", "apple.png", "avocado.png", "phone.png", "joycon.png"],
				fruit = _q(".fruit"),
				index = 0,
				path = "/dwaan/img/";

			// Randomize the fruits
			if(gsap.utils.random(0, 10) > 5) gsap.utils.shuffle(fruits);
			fruit.setAttribute("src", path + fruits[0]);
			// Change fruit when clicked
			_q(".img").onmousedown = function(e) {
				do {
					index++;
					if(index >= fruits.length) index = 0;
				} while(fruits[index] == "empty.png");

				if(!anim.isActive()) {
					anim = gsap.timeline({ defaults: { duration: .512, ease: "elastic" }});
					anim
						.fromTo(".poof", { transformOrigin: "40%", opacity: 1, rotation: 15, scale: 1, xPercent: -50, yPercent: 50 }, { rotation: 0, scale: 1.75, xPercent: 0, yPercent: 0, onComplete: function() {
							fruit.setAttribute("src", path + fruits[index]);
							gsap.set(fruit, { opacity: 0 });

							// Ajax load the image
							var progress = function (index, percent) {
								if(percent >= 100) {
									gsap.set(fruit, { opacity: 1 });
									anim.to(".poof", { opacity: 0, rotation: -180, scale: 1, ease: "power3.inOut" });
								}
							}

							// When loaded report it as a progress
							if(fruit.complete) {
								progress(0, 100);
							} else {
								fruit.addEventListener("load", function(e) {
									progress(0, 100);
								});
							}
						}})
					;
				}

				e.preventDefault();
			}

			// Auto scroll
			var cur_top = 0,
				duration = 512,
				delay = 128,
				run_gsap = function(y) {
					speed = duration / 1000;

					gsap.to(window, { scrollTo: { y: y, autoKill: true }, duration: speed, ease: "power2" });

					window._top_b = (y == 0) ? 0 : _q(".work_float").offsetHeight;
				},
				final_check = function() {
					// If the delta is zero, check if it's really on top or bottom
					if(window._top_b > _q(".work_float").offsetHeight / 2) {
						if(window._top_b != _q(".work_float").offsetHeight) run_gsap("max");
					} else {
						if(window._top_b != 0) run_gsap(0);
					}
				},
				runanimation = function(delta) {
					if(delta > 0) run_gsap((delta > 50) ? "max" : 0);
					else if(delta < 0) run_gsap((delta < -50) ? 0 : "max");
					else final_check();
				},
				onScroll = function(e){
					clearTimeout(window._timeout);
					window._timeout = setTimeout(function () {
						var cur_top = window.pageYOffset || document.documentElement.scrollTop;

						gsap.killTweensOf(window);
						runanimation(cur_top - window._top_b);

						// Wait for another gsap to run final check
						clearTimeout(window.__timeout);
						window.__timeout = setTimeout(final_check, duration + delay); // Following gsap duration
					}, delay);
				};

			window._top_b = 0;
			if(isTouchSupported()) {
				/* Still not properly working
				window.ontouchstart = function(e) {
					clearTimeout(window._timeout);
					window._top_b = window.pageYOffset || document.documentElement.scrollTop;
					window.onscroll = null;
				}
				window.ontouchend = function(e) {
					var cur_top = window.pageYOffset || document.documentElement.scrollTop;

					window.onscroll = onScroll;

					window._timeout = setTimeout(function () {
						window.onscroll = null;
						runanimation(cur_top - window._top_b);
					}, delay);
				}
				*/
			} else {
				window.onscroll = onScroll;
			}

			// 3D effect
			parallax(function(x, y){
				gsap.to(".threed", { transform: "perspective(50px) rotate3d(" + -y + ", " + x + ", 0, .1deg)" });
				gsap.to(".par_h1", { x: x*100, y: y*100 });
				gsap.to(".par_p", { x: x*75, y: y*75 });
				gsap.to(".hero__meta", { x: x*50, y: y*50 });
				gsap.to(".hero .stats p, .hero .stats b", { x: x*25, y: y*25 });
				gsap.to(".hero__image .parallax", { x: x*-25, y: y*-25 });
			});

			worklist.hover(".work__list a img, .hero__meta .stats b");
		},
		onImageLoadComplete: function() {
			// Fixing size
			function resizeHeroMeta() {
				_q("#trigger__padder").style.paddingTop = (_q("body").offsetHeight - _q(".work__list").offsetHeight) + "px";
				_q("#trigger__mover").style.height = (_q(".work__list").offsetHeight) + "px";
				_q(".hero__meta").style.height = (_q("body").offsetHeight - _q(".hero__meta").offsetTop - _q(".scroll").offsetHeight) + "px";
			}
			window.onresize = resizeHeroMeta;
			resizeHeroMeta();

			controller.destroy();
			controller = new ScrollMagic.Controller();
			els = null;
			anim = null;

			// Scroll animate the hero wording
			anim = gsap.timeline({ defaults: { duration: 1.024, ease: "linear" }});
			anim
				.fromTo(".hero__text h1", { y: 0 }, { y: -20 }, 0)
				.fromTo(".hero__text p", { y: 0 }, { y: -25 }, 0)
				.fromTo(".hero .stats", { y: 0 }, { y: -30 }, 0)
				.fromTo(".hero img", { y: 0 }, { y: 10 }, 0)
				.fromTo(".shade", { opacity: 0 }, { opacity: .75 }, 0);
			new ScrollMagic
				.Scene({triggerElement: "main", duration: "100%", triggerHook: 0})
				.setTween(anim)
				.addTo(controller);

			// Scroll animate the scroll sign
			anim = gsap.timeline({ defaults: { duration: .256, ease: "power2.inOut" }});
			anim
				.fromTo(".scroll__up", { opacity: 1 }, { opacity: 0 }, 0)
				.fromTo(".scroll__down", { opacity: 0 }, { opacity: 1 }, 0)
			;
			new ScrollMagic
				.Scene({triggerElement: ".work_float", offset: 10, triggerHook: 1})
				.setTween(anim)
				.addTo(controller);

			// Scroll animate stuff in floating box
			// Wording and stats
			anim = gsap.timeline({ defaults: { duration: .768, ease: "expo.out" }});
			anim
				.fromTo(".work__list > .block", { y: 200 }, { y: 0, stagger: {
					from: 0,
					amount: .128
				}}, 0)
				.fromTo(".work__list .stats__content p", { y: 200 }, { y: 0, stagger: {
					from: "end",
					amount: .128
				}}, 0)
			;
			new ScrollMagic
				.Scene({triggerElement: ".wording__trigger", triggerHook: 1})
				.setTween(anim)
				.addTo(controller);
			// Work list
			anim = gsap.fromTo(".work__list .scroller, .gallery a:not(:last-child)", { y: 200 }, { y: 0, duration: .768, ease: "expo.out", stagger: {
				from: 0,
				amount: .128
			}});
			new ScrollMagic
				.Scene({triggerElement: ".scroller__trigger", triggerHook: 1})
				.setTween(anim)
				.addTo(controller);

			// Some breathe in and breathe out animation for hero image
			var loop = gsap.timeline({repeat: -1, ease: "expo"});
			loop
				.to(".hero .box", { transformOrigin: "50% 75%", scale: 1, duration: .9 })
				.to(".hero .box", { scale: 1.015, duration: 1.7 })
				.to(".hero .box", { scale: 1.015, duration: .6 })
				.to(".hero .box", { scale: 1, duration: 1.7 });

			// Swipe event for gallery
			var detectswipe = function (el, func) {
				swipe_det = new Object(); swipe_det.sX = 0; swipe_det.pX = 0; swipe_det.sY = 0; swipe_det.pY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
				var min_x = 20, max_x = 40, min_y = 40, max_y = 50, direc = "";
				ele = _q(el);
				ele.addEventListener('touchstart',function(e){
					var t = e.touches[0];
					swipe_det.sX = t.screenX; swipe_det.sY = t.screenY;
					swipe_det.pX = t.screenX; swipe_det.pY = t.screenY;
					if(ele.x == undefined) ele.x = 0;
				},false);
				ele.addEventListener('touchmove',function(e){
					e.preventDefault();
					var t = e.touches[0];

					swipe_det.eX = t.screenX; swipe_det.eY = t.screenY;

					ele.x -= (swipe_det.pX - swipe_det.eX);

					gsap.set(el, {x: ele.x});

					swipe_det.pX = t.screenX; swipe_det.pY = t.screenY;
				},false);
				ele.addEventListener('touchend',function(e){
					//horizontal detection
					if((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
						if(swipe_det.eX > swipe_det.sX) direc = "r";
						else direc = "l";
					}
					//vertical detection
					if((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
						if(swipe_det.eY > swipe_det.sY) direc = "d";
						else direc = "u";
					}

					var delta_x = ele.offsetWidth - ele.parentNode.offsetWidth,
						ease = "expo.out";

					if(ele.x > 0 || direc == "r") ele.x = 0;
					else if(ele.x < -delta_x || direc == "l") ele.x = -delta_x;

					gsap.to(ele, { x: ele.x, duration: .768, ease: ease });

					if(direc != "") if(typeof func == 'function') func(el,direc);
					direc = "";
				},false);
			}
			detectswipe('.gallery');
		},
		onImageLoadAnimateHalfComplete: function() {
			// Animate the appearing
			anim = gsap.timeline({ defaults: { duration: 2.048, ease: "expo.out" }});
			anim
				.to(".hero", { y: 0 })
				.fromTo(".hero__image", { transformOrigin: "0 0", y: 500 }, { y: 0 }, .256)
				.fromTo(".hero__text h1 .splext", { y: 300 }, { y: 0, stagger: {
					from: 0,
					amount: .064
				}}, .128)
				.to(".hero__text .txt0000", { yPercent: -20 }, .512)
				.fromTo(".hero__text p .splext", { y: 300 }, { y: 0, stagger: {
					from: 0,
					amount: .128
				}}, .128)
				.fromTo(".hero__text p, .hero .stats", { transformOrigin: "0 0", y: 500 }, { y: 0, stagger: {
					from: 0,
					amount: .256
				}}, .256)
				.fromTo(".hero .stats p", { y: 250 }, { y: 0, stagger: {
					from: "end",
					amount: .256
				}}, .368)
				.to(".work_float", { y: 0 }, 1.024)
			;

			// First time need to be delayed a bit
			new animateYear("#year__living", 1984);
			new animateYear("#year__designer", 2008);
			new animateYear("#year__managerial", 2011);
		},
		onLeave: function() {
			window.onresize = null;
			window.onscroll = null;
			window.ontouchstart = null;
			window.ontouchend = null;
			window.onmousemove = null;
		}
	});

var Work = Barba
	.BaseView
	.extend({
		namespace: 'work',
		onEnter: function() {
			current_barba = this;

			gsap.set(".work__list__page", { y: window.innerHeight });

			splitText(".work__list h2");
		},
		onImageLoadComplete: function() {
			worklist.hover(".work__list a img");

			controller.destroy();
			controller = new ScrollMagic.Controller({
				globalSceneOptions: {
					triggerHook: .95,
				}
			});
			els = null;
			anim = null;

			// Scroll animate the works
			var delay = 0,
				_y = 0,
				_p_y = 0;
			els = _qAll(".works");
			for (var j = els.length - 1; j >= 0; j--) {
				var _el = els[j].children;
				for (var i = 0; i < _el.length; i++) {
					var _height = _el[i].offsetHeight,
						_c_el = _el[i].children;

					_y =_el[i].offsetTop;
					if(_y != _p_y) { _p_y = _y; delay = 0; } else { delay += .064; }

					tl = gsap.timeline({
						defaults: { duration: 1.024, ease: "expo.out" }});
					tl
						.fromTo(_c_el, { y: _height/2 }, { y: 0, delay: delay }, 0)
						.fromTo(_c_el[0].children[0], { y: 25 }, { y: 0 }, .128)
						.fromTo(_c_el[0].children[1], { y: 25 }, { y: 0 }, .256);
					new ScrollMagic
						.Scene({ triggerElement: _el[i] })
						.setTween(tl)
						.addTo(controller);
				}
			}

			// Scroll animate the words
			els = _qAll(".words");
			for (var i = 0; i < els.length; i++) {
				tl = gsap.timeline({
					defaults: { duration: 1.024, ease: "expo.out" }});
				tl.fromTo(els[i].children, { y: 100 }, { y: 0, stagger: {
						from: 0,
						amount: .064
					}});
				new ScrollMagic
					.Scene({ triggerElement: els[i] })
					.setTween(tl)
					.addTo(controller);
			}

			new animateNumber(".work__list .stats__content p:first-child b");
			new animateNumber(".work__list .stats__content p:last-child b");
		},
		onImageLoadAnimateHalfComplete: function() {
			anim = gsap.timeline({ defaults: { duration: 2.048, ease: "expo.out" }});
			anim
				.to(".work__list__page", { x: 0, y: 0, ease: "expo.out", duration: 2.048 }, 0)
				.to(".work__list .txt0000", { yPercent: -20 }, .512)
			;
		}
	});

var WorkDetail = Barba
	.BaseView
	.extend({
		namespace: 'work-detail',
		onEnter: function() {
			current_barba = this;

			gsap.set(".work__detail", { y: window.innerHeight });

			splitText(".work__list h1");
		},
		onEnterCompleted: function() {
			worklist.hover("a img");
		},
		onImageLoadComplete: function() {
			controller.destroy();
			controller = new ScrollMagic.Controller({
				globalSceneOptions: {
					triggerHook: 1
				}
			});
			els = null;
			anim = null;

			var tnsparam = {
				mouseDrag: true,
				swipeAngle: false,
				speed: 400,
				loop: false,
				navPosition: "bottom",
				controlsPosition: "bottom",
				responsive: {
					0: {
						items: 1
					},
					600: {
						items: 2
					}
				}
			};
			tinysliders = [];

			els = _qAll(".gallery-normal");
			for (var i = els.length - 1; i >= 0; i--) {
				var _tnsparam = tnsparam;
				_tnsparam.container = els[i];
				tinysliders.push(new tns(_tnsparam));
			}

			els = _qAll(".gallery-auto-height");
			for (var i = els.length - 1; i >= 0; i--) {
				var _tnsparam = tnsparam;
				_tnsparam.container = els[i];
				_tnsparam.autoHeight = true;
				tinysliders.push(new tns(_tnsparam));
			}

			els = _qAll(".work__timeline .wheel");
			for (var i = els.length - 1; i >= 0; i--) {
				var _tnsparam = tnsparam;
				_tnsparam.container = els[i];
				_tnsparam.autoHeight = true;
				_tnsparam.responsive = {
					0: { items: 2 },
					600: { items: 3 }
				};
				tinysliders.push(new tns(_tnsparam));
			}

			els = _qAll(".gallery__mobile");
			for (var i = els.length - 1; i >= 0; i--) {
				var _tnsparam = tnsparam;
				_tnsparam.container = els[i];
				_tnsparam.autoHeight = true;
				_tnsparam.responsive = {
					0: { items: 1 },
					600: { items: 2 },
					1200: { items: 3 }
				};
				tinysliders.push(new tns(_tnsparam));
			}

			// Scroll animate staggering from right of child
			els = _qAll(".gallery, .wheel, .tns-nav, .tns-controls, .work__spec > p");
			for (var j = els.length - 1; j >= 0; j--) {
				if(els[j].children.length > 0) {
					anim = gsap.fromTo(els[j].children, { opacity: 0, xPercent: 100 }, { opacity: 1, xPercent: 0, ease: "expo.out", duration: 1.024, stagger: {
						from: 0,
						amount: .256
					}});
					new ScrollMagic
						.Scene({triggerElement: els[j]})
						.setTween(anim)
						.addTo(controller);
				}
			}
			// Scroll animate staggering from right
			els = _qAll(".work__detail > hr, .work__detail > h5, .work__detail .work__spec > *");
			for (var j = els.length - 1; j >= 0; j--) {
				anim = gsap.fromTo(els[j], { opacity: 0, x: 250 }, { opacity: 1, x: 0, ease: "expo.out", duration: 1.024, stagger: {
					from: 0,
					amount: .256
				}});
				new ScrollMagic
					.Scene({triggerElement: els[j]})
					.setTween(anim)
					.addTo(controller);
			}
			// Scroll animate immidiete from bottom
			els = _qAll(".work__detail > blockquote");
			for (var j = els.length - 1; j >= 0; j--) {
				anim = gsap.fromTo(els[j], { x: 250 }, { x: 0, ease: "expo.out", duration: 1.024 });
				new ScrollMagic
					.Scene({triggerElement: els[j]})
					.setTween(anim)
					.addTo(controller);
			}
			// Scroll animate from bottom
			els = _qAll(".work__detail .block__left, .work__detail .stats__content, .work__timeline");
			for (var j = els.length - 1; j >= 0; j--) {
				anim = gsap.fromTo(els[j].children, { y: 250 }, { y: 0, ease: "expo.out", duration: 1.024, stagger: {
					from: 0,
					amount: .128
				}});
				new ScrollMagic
					.Scene({triggerElement: els[j]})
					.setTween(anim)
					.addTo(controller);
			}

			new animateNumber(".work__detail .stats__content p:first-child b");
			new animateNumber(".work__detail .stats__content p:last-child b");

			// execute above function
			initPhotoSwipeFromDOM('.gallery');
		},
		onImageLoadAnimateHalfComplete: function() {
			anim = gsap.timeline({ defaults: { duration: 2.048, ease: "expo.out" }});
			anim
				.to(".work__detail", { y: 0 })
				.fromTo(".work .back", { transformOrigin: "0 0", y: -100 }, { y: 0, delay: .256 }, 0)
				.to(".work__detail .txt0000", { yPercent: -20 }, .512)
			;
		},
		onLeaveCompleted: function() {
			// Destroying tinyslider to prevent error
			for (var i = tinysliders.length - 1; i >= 0; i--) {
				tinysliders[i].destroy();
			}
			tinysliders = [];
		}
	});

var Call = Barba
	.BaseView
	.extend({
		namespace: 'call',
		onEnter: function() {
			current_barba = this;

			gsap.set(".call", { y: window.innerHeight });
		},
		onEnterCompleted: function() {
			// The menu item animation
			var border = ".bigtext",
				borderRadius
			_hugeText = new hugeText(border + " > div ");

			elem = _q('.call .email');
			elem.onmouseenter = function() {
				gsap.to(border, {
					duration: .386,
					ease: "expo",
					borderRadius: this.borderRadius
				});
				_hugeText.show("email me");
			};
			elem.onmouseleave = function() {
				gsap.to(border, {
					duration: .386,
					ease: "expo",
					borderRadius: "2% 2% 2% 2%"
				});
				_hugeText.hide();
			};

			elem = _q('.call .search');
			elem.onmouseenter = function() {
				gsap.to(border, {
					duration: .386,
					ease: "expo",
					borderRadius: this.borderRadius
				});
				_hugeText.show("search me");
			};
			elem.onmouseleave = function() {
				gsap.to(border, {
					duration: .386,
					ease: "expo",
					borderRadius: "2% 2% 2% 2%"
				});
				_hugeText.hide();
			};

			// 3D effect
			parallax(function(x, y){
				gsap.to(".call .threed", { transform: "perspective(50px) rotate3d(" + -y + ", " + x + ", 0, .1deg)" });
				gsap.to(".call h1", { x: x*300, y: y*300 });
				gsap.to(".call h2", { x: x*200, y: y*200 });
				gsap.to(".call a:nth-child(2)", { x: x*100, y: y*100 });
			});
		},
		onImageLoadAnimateComplete: function() {
			loading.breath.play();

			// Scroll animate the works
			gsap.fromTo(".call > div > div > *", 1.024, {
				y: 250
			}, {
				y: 0,
				ease: "expo",
				stagger: {
					from: 0,
					amount: .386
				}
			});

			gsap.to(".call", { y: 0, ease: "expo.out", duration: 2.048 });
		},
		onLeave: function() {
			loading.breath.pause(0);
			window.onmousemove = null;
		}
	});

var Lost = Barba
	.BaseView
	.extend({
		namespace: '404',
		onEnter: function() {
			current_barba = this;
		},
		onImageLoadComplete: function() {
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

			_q("#nomokeybusiness a").onmouseover = function() {
				for (var i = 0; i < 5; i++) {
					tween[i].timeScale(4);
					_q("#nomokeybusiness a").className = "hover";
				}

				gsap.to("#nomokeybusiness p", {
					duration: .256,
					ease: "expo.inOut",
					rotation: 0
				})
				gsap.to("#nomokeybusiness a", {
					duration: .386,
					ease: "expo.inOut",
					opacity: 1
				})
			};
			_q("#nomokeybusiness a").onmouseout = function() {
				for (var i = 0; i < 5; i++) {
					tween[i].timeScale(1);
					_q("#nomokeybusiness a").className = "";
				}

				gsap.to("#nomokeybusiness p", {
					duration: .256,
					ease: "expo.inOut",
					rotation: 180
				})
				gsap.to("#nomokeybusiness a", {
					duration: .386,
					ease: "expo.inOut",
					opacity: .8
				})
			};
		}
	});

var Me = Barba
	.BaseView
	.extend({
		namespace: 'me',
		onEnter: function() {
			current_barba = this;

			gsap.set(".imuiux", { y: window.innerHeight });

			splitText(".imuiux h1, .imuiux p, .cofound h3, .cofound h5, .cofound h4, .cofound p");
		},
		onEnterCompleted: function() {
			worklist.hover("#ig .item a");
			worklist.hover(".work__list img");
		},
		onImageLoadComplete: function() {
			controller.destroy();
			controller = new ScrollMagic.Controller();
			els = null;
			anim = null;

			// First text animation
			tl = gsap.timeline({ defaults: { duration: .5, ease: "linear" }});

			el = ".imuiux";
			tl
				.set(el, { pointerEvents: "none" }, .5)
				.fromTo(el + " h1", { y: 0 }, { y: -60, duration: .75 }, 0)
					.fromTo(el + " h1", { opacity: 1 }, { opacity: 0, duration: .25 }, .5)
				.fromTo(el + " p", { y: 0 }, { y: -50, duration: .75 }, 0)
					.fromTo(el + " p", { opacity: 1 }, { opacity: 0, duration: .25 }, .5)
			;

			el = ".about";
			tl
				.set(el, { pointerEvents: "auto" }, .5)
					.set(el, { pointerEvents: "none" }, 2.25)
				.fromTo(el + " h2", { y: 60 }, { y: -60, duration: 2 }, .5)
					.fromTo(el + " h2", { opacity: 0 },  { opacity: 1, duration: .25 }, .5)
					.fromTo(el + " h2", { opacity: 1 },  { opacity: 0, duration: .25 }, 2.25)
				.fromTo(el + " p", { y: 50 }, { y: -50, duration: 2 }, .5)
					.fromTo(el + " p", { opacity: 0 },  { opacity: 1, duration: .25 }, .5)
					.fromTo(el + " p", { opacity: 1 },  { opacity: 0, duration: .25 }, 2.25)
			;

			el = ".know";
			tl
				.set(el, { pointerEvents: "auto" }, 2.25)
					.set(el, { pointerEvents: "none" }, 2.25)
				.fromTo(el + " h2", { y: 60 }, { y: -60, duration: 2 }, 2.25)
					.fromTo(el + " h2", { opacity: 0 },  { opacity: 1, duration: .25 }, 2.25)
					.fromTo(el + " h2", { opacity: 1 },  { opacity: 0, duration: .5 }, 3.75)
				.fromTo(el + " p", { y: 50 }, { y: -50, duration: 2 }, 2.25)
					.fromTo(el + " p", { opacity: 0 },  { opacity: 1, duration: .25 }, 2.25)
					.fromTo(el + " p", { opacity: 1 },  { opacity: 0, duration: .25 }, 4)
			;

			el = ".who";
			tl
				.set(el, { pointerEvents: "auto" }, 4)
				.fromTo(el + " h2", { y: 40 }, { y: -70, duration: 2.25 }, 4)
					.fromTo(el + " h2", { opacity: 0 },  { opacity: 1, duration: .25 }, 4)
					.fromTo(el + " h2", { opacity: 1 },  { opacity: 0, duration: .5 }, 5.75)
			;

			el = ".imuiux img";
			tl
				.fromTo(el, { yPercent: 0 }, { yPercent: -7.5, duration: 1 }, 0)
					.to(el, { scale: .95, duration: 1 }, 0)
					.to(el, { yPercent: 0, duration: 1.25 }, 1)
					.to(el, { yPercent: -12.5, duration: 4 }, 2.25)
					.to(el, { scale: .75, duration: 2 }, 4.25)
					.to(el, { opacity: 0, duration: .5 }, 5.75)
			;

			new ScrollMagic
				.Scene({triggerElement: "#firstscene", triggerHook: 0, duration: _q("body").offsetHeight*4})
				.setPin("#firstscene", { pushFollowers: false })
				.setTween(tl)
				.addTo(controller);
			gsap.set("#firstscene", { height: _q("body").offsetHeight*4 });
			gsap.set(".us h2, .us p, .us img", { opacity: 0 });
			gsap.set(".imuiux img", { transformOrigin: "50% 0" });

			// Scroll animate Mr. Goat text
			tl = gsap.timeline({ defaults: { duration: .25, ease: "linear" }});
			tl
				.to(".mrgoat", { y: 0, opacity: 1 }, 0)
				.fromTo(".mrgoat .h21", { y: 0 }, { y: -20 }, .25)
					.to(".mrgoat .h21", { y: -60, opacity: 0 }, .5)
				.fromTo(".mrgoat .h22", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, .5)
					.to(".mrgoat .h22", { y: -20 }, .75)
					.to(".mrgoat .h22", { y: -60, opacity: 0 }, 1)
				.fromTo(".mrgoat .h23", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, 1)
					.to(".mrgoat .h23", { y: 0 }, 1.25)
					.to(".mrgoat .h23", { y: -50, opacity: 0 }, 1.5)
				;
			new ScrollMagic
				.Scene({triggerElement: ".mrgoat", triggerHook: 0, duration: _q("body").offsetHeight*2})
				.setPin(".mrgoat")
				.setTween(tl)
				.addTo(controller);

			// Make Mr. Goat spinning
			var obj = {
					curImg: 1,
					length: _qAll(".mrgoat .img > img").length
				},
				rotatinggoat = {
					curImg: obj.length,
					roundProps: "curImg",
					repeat: 10,
					immediateRender: true,
					ease: "linear",
					duration: .75,
					onUpdate: function() {
						gsap.set(".mrgoat .img > img", { opacity: 0 });
						gsap.set(".mrgoat" + obj.curImg, {opacity: 1});
					}
				};
			anim = gsap.to(obj, rotatinggoat)
			new ScrollMagic
				.Scene({triggerElement: ".me", triggerHook: 1, duration: _q(".me").offsetHeight})
				.setTween(anim)
				.addTo(controller);

			gsap.set(".mrgoat", { y: 0, opacity: 0 });

			// Scroll IG items
			els = _qAll("#ig .item");
			for (var i = 0; i < els.length; i++) {
				anim = gsap.fromTo(els[i].children, 1.024, { y: 25 + (i * 25), opacity: 0 }, { y: 0, opacity: 1, ease: "expo.out" });
				new ScrollMagic.Scene({triggerElement: els[i], triggerHook: .75 })
					.setTween(anim)
					.addTo(controller);
			}

			// Scroll capabilities item
			els = _qAll(".anyway h3, .anyway p, .anyway h4, .anyway ul li");
			for (var i = 0; i < els.length; i++) {
				anim = gsap.timeline({ defaults: { duration: 1.024, ease: "expo.out" }});
				anim
					.fromTo(els[i], { x: 25 + (i * 25) }, { x: 0 }, 0)
					.fromTo(els[i], { opacity: 0 }, { opacity: 1, duration: .128 }, 0)
				;
				new ScrollMagic.Scene({triggerElement: els[i], triggerHook: .85 })
					.setTween(anim)
					.addTo(controller);
			}

			// Scroll latest works
			anim = gsap.timeline({ defaults: { duration: 1.024, ease: "expo", stagger: {
					from: 0, amount: .256
				}}});
			anim
				.fromTo(".work__list, .work__list ul li", { y: 250 }, { y: 0 }, 0)
				.fromTo(".work__list, .work__list ul li", { opacity: 0 }, { opacity: 1, duration: .128 }, 0)
			;
			new ScrollMagic.Scene({triggerElement: ".work__list, .work__list ul", triggerHook: .85 })
				.setTween(anim)
				.addTo(controller);

			// Scroll cofound
			el = _qAll(".cofound > div > *");
			for (var i = 0; i < el.length; i++) {
				if(el[i].children.length > 0) {
					anim = gsap.timeline({ defaults: { duration: 1.024, ease: "power4.out" }});
					anim
						.fromTo(el[i].querySelectorAll(".splext"), { y: 200, }, { y: 0, stagger: {
							from: 0, amount: .128
						}}, 0)
					;
					new ScrollMagic
						.Scene({triggerElement: el[i], triggerHook: .9 })
						.setTween(anim)
						.addTo(controller);
				}
			}

			// Adding class to ig images
			var els = _qAll("#ig img");
			for (var i = els.length - 1; i >= 0; i--) {
				if(els[i].offsetWidth > els[i].offsetHeight) {
					addClass(els[i], "hor");
				} else if(els[i].offsetWidth < els[i].offsetHeight) {
					addClass(els[i], "ver");
				} else {
					addClass(els[i], "squ");
				}
			}
		},
		onImageLoadAnimateHalfComplete: function() {
			// Animate the appearing
			anim = gsap.timeline({ defaults: { duration: 2.048, ease: "expo.out" }});
			anim
				.fromTo(".imuiux h1 .splext", { y: 150 }, { y: 0, stagger: {
					from: 0,
					amount: .256
				}}, 0)
				.fromTo(".imuiux p .splord", { y: 200 }, { y: 0, stagger: {
					from: 0,
					amount: .256
				}}, 0)
			;

			gsap.to(".imuiux", { y: 0, ease: "expo.out", duration: 2.048 });
			gsap.fromTo(".imuiux img", { y: 200 }, { y: 0, duration: 2.048, ease: "expo.out", stagger: {
				from: 0,
				amount: .386
			}});
		}
	});

var Menu = Barba
	.BaseView
	.extend({
		namespace: 'menu',
		onEnter: function() {
			current_barba = this;
		}
	});

////////// Initial

// When DOM is parsed
document.addEventListener('DOMContentLoaded', function(e) {
	// Initialize loading
	loading.init();

	// Wait for all images to be loaded
	imageloading.init(document, function (imgload) {
		// Check if it's first time or 404 to do some text animation
		loading.animate((_q(".barba-container").getAttribute("data-namespace") == "404" ? "404" : "first-time"), function() {
			if(imgload != undefined) {
				imgload.first_animation_done = true;
				imgload.done()
			}

			// Animate header
			gsap.fromTo(".logo, .menu > a, #mode, .lang > li", { marginTop: -250 }, { marginTop: 0, delay: .512, duration: 2.048, ease: "expo.out", stagger: {
				from: 0,
				amount: 1.024
			}});
		});
	});

	removeClass(_q('.menu__pop'), "active");

	// Adding logo to loading and do some hover event
	var el = _q("#loading-cover .loading");
	el.querySelector(".light").innerHTML = logo_svg;
	el.querySelector(".light").style.height = 0;
	el.querySelector(".dark").innerHTML = logo_svg;

	// Logo waving animation
	var logo_wave = gsap.timeline({ repeat: -1, defaults: { transformOrigin: "99% 0", duration: .256, ease: "linear", yPercent: 20 }});
	logo_wave
		.from(".logo .left-hand", { yPercent: 0, rotation: 0, duration: 10 })
		.to(".logo .left-hand", { duration: .256, rotation: 70 })
		.fromTo(".logo .left-hand", { rotation: 70 }, { rotation: 60, repeat: 2, yoyo: true })
		.to(".logo .left-hand", { duration: .256, yPercent: 0, rotation: 0 });

	// Safari Mobile: 177
	// Safari: 38/63
	// Firefox: 74
	// Chrome: 79
	// Safari Tablet: 107
	// Chrome Tablet: 113
	if(window.outerHeight - window.innerHeight < 80) {
		addClass(_q("html"), "desktop");
	}

	// Run menu
	menu.init();

	// Initialize script
	Home.init();
	Work.init();
	WorkDetail.init();
	Call.init();
	Lost.init();
	Me.init();
	Menu.init();

	// Run Barbara
	Barba.Pjax.start();
});