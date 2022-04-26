var detailview = {
	namespace: 'detail',
	beforeEnter: function (data) {
		var next = data.next.container;

		// Performace hog in firefox
		// Create shadow based on content
		next.querySelectorAll("picture").forEach(function (el) {
			// el.insertAdjacentHTML('beforeend', ("<span class='shadow' style='background-image:url(" + el.querySelector("img").getAttribute("src") + ")' />"));
		});

		// Style - Spread
		next.querySelectorAll(".style-spread").forEach(function (el) {
			// Move the text
			scroll.moveText({
				// scroller: next,
				elements: el.querySelectorAll(".titles > *, p")
			});
			// Scroll animation
			ScrollTrigger.defaults({
				// scroller: next,
				trigger: el.querySelectorAll(".thumbs"),
				toggleActions: "restart none none reverse"
			});
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function () {
					scroll.push(function (tl) {
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
					}, function (tl) {
						return ScrollTrigger.create({
							start: "0 75%",
							end: "100% 75%",
							animation: tl,
							scrub: 1
						});
					});
				},
				"(min-aspect-ratio: 1/1)": function () {
					scroll.push(function (tl) {
						tl.fromTo(el.querySelectorAll(".pic-4"), {
							top: "75%",
							left: "350%",
							x: 0,
							y: 0,
							rotation: 0
						}, {
							top: "25%",
							left: "50%",
							rotation: -10,
							duration: 1,
							ease: "expo.out"
						}, 0);

						tl.fromTo(el.querySelectorAll(".pic-5"), {
							top: "75%",
							left: "350%",
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
					}, function (tl) {
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
		next.querySelectorAll(".style-spread-left").forEach(function (el) {
			// Move the text
			scroll.moveText({
				// scroller: next,
				elements: el.querySelectorAll(".titles > *, p")
			});
			// Scroll animation
			ScrollTrigger.defaults({
				// scroller: next,
				trigger: el.querySelectorAll(".thumbs")
			});
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function () {
					scroll.push(function (tl) {
						tl.fromTo(el.querySelectorAll(".thumbs picture"), {
							opacity: 0,
							y: 300,
							x: 0,
							rotation: 0
						}, {
							opacity: 1,
							y: 0,
							ease: "expo.out"
						}, 0);

						return tl;
					}, function (tl) {
						return ScrollTrigger.create({
							start: "0 100%-=100px",
							end: "100% 100%-=100px",
							animation: tl,
							scrub: 1
						});
					});
				},
				"(min-aspect-ratio: 1/1)": function () {
					// Move the pictures
					scroll.push(function (tl) {
						tl.fromTo(el.querySelectorAll(".thumbs picture"), {
							y: 0,
							x: "-325px",
							opacity: 0,
							rotation: "7.5deg"
						}, {
							x: 0,
							opacity: 1,
							rotation: -5,
							ease: "expo.out"
						}, 0);

						return tl;
					}, function (tl) {
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
		next.querySelectorAll(".style-top").forEach(function (el) {
			// Move text
			scroll.moveText({
				// scroller: next,
				elements: el.querySelectorAll(".text h2, .text li")
			});
			ScrollTrigger.defaults({
				// scroller: next,
				trigger: el
			});
			// Move thumbnails
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function () {
					scroll.push(function (tl) {
						tl.fromTo(el.querySelectorAll(".thumbs"), {
							x: 500
						}, {
							x: -500,
							ease: "linear"
						}, 0);

						return tl;
					}, function (tl) {
						return ScrollTrigger.create({
							start: "-50% 0",
							end: "100% 0",
							scrub: .75,
							animation: tl
						});
					});
				},
				"(min-aspect-ratio: 1/1)": function () {
					scroll.push(function (tl) {
						tl.fromTo(el.querySelectorAll(".thumbs"), {
							x: 500
						}, {
							x: -500,
							ease: "linear",
							duration: 5,
						}, 0);

						return tl;
					}, function (tl) {
						return ScrollTrigger.create({
							start: "-25% 0",
							end: "200% 0",
							scrub: .75,
							animation: tl
						});
					});
				}
			});
			// Reset
			ScrollTrigger.defaults({});
			// Move thumbnail again
			scroll.moveThumbs(el.querySelectorAll(".thumbs > picture"), null);
		});

		// Style - Top
		next.querySelectorAll(".style-top-text").forEach(function (el) {
			// Move text
			scroll.moveText({
				// scroller: next,
				elements: el.querySelectorAll(".text h2, .text li")
			});
		});

		// Style - Bottom
		next.querySelectorAll(".style-bottom-logo").forEach(function (el) {
			// Move text
			scroll.moveText({
				// scroller: next,
				elements: el.querySelectorAll(".text > *")
			});
			// Move logo
			scroll.push(function (tl) {
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
			}, function (tl) {
				return ScrollTrigger.create({
					// scroller: next,
					trigger: el,
					start: (window.innerHeight * 1 / 4) + " " + (window.innerHeight * 3 / 4),
					end: (window.innerHeight * 3 / 4) + " " + (window.innerHeight * 3 / 4),
					scrub: 1,
					animation: tl
				});
			});
		});

		// Style - Flex
		next.querySelectorAll(".style-flex").forEach(function (el) {
			// Move text
			scroll.moveText({
				// scroller: next,
				elements: el.querySelectorAll(".style-column > *"),
				position: "100%"
			});
		});

		// Style - Trunc
		next.querySelectorAll(".style-trunc").forEach(function (el) {
			// Move text
			ScrollTrigger.matchMedia({
				"(min-aspect-ratio: 1/1)": function () {
					gsap.set(el.querySelectorAll(".text > *, .color, .color ul > *"), {
						y: 0,
						opacity: 1
					});
					scroll.moveText({
						// scroller: next,
						elements: el.querySelectorAll(".text > *, .color ul > *"),
						position: "100%",
						horizontal: true
					});
				},
				"(max-aspect-ratio: 1/1)": function () {
					gsap.set(el.querySelectorAll(".text > *, .color, .color ul > *"), {
						x: 0,
						opacity: 1
					});
					scroll.moveText({
						// scroller: next,
						elements: el.querySelectorAll(".text > *, .color")
					});
				}
			});
		});

		// Style - Masonry
		next.querySelectorAll(".style-masonry").forEach(function (el) {
			var thumbs = el.querySelectorAll(".thumbs");
			var alltext = el.querySelectorAll(".text > *");

			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function () {
					// Rotate masonry
					gsap.set(thumbs, {
						opacity: 1,
						rotation: -5
					});

					// Scroll up
					scroll.push(function (tl) {
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
					}, function (tl) {
						return ScrollTrigger.create({
							// scroller: next,
							trigger: el,
							start: "-25% 100%",
							end: "100% 50%",
							scrub: .75,
							animation: tl
						});
					});

					// Scroll left
					scroll.push(function (tl) {
						tl.fromTo(thumbs, {
							x: 0,
						}, {
							x: -50,
							ease: "linear"
						}, 0);

						return tl;
					}, function (tl) {
						return ScrollTrigger.create({
							// scroller: next,
							trigger: el,
							start: "-25% 100%",
							end: "100% 50%",
							scrub: true,
							animation: tl
						});
					});

					// Move text
					scroll.moveText({
						// scroller: next,
						delta: 25,
						elements: alltext,
						position: "75%"
					});

					// Move masonry
					scroll.moveText({
						// scroller: next,
						elements: thumbs
					});
				},
				"(min-aspect-ratio: 1/1)": function () {
					// Rotate masonry
					gsap.set(thumbs, {
						rotation: 0
					});

					// Scroll
					scroll.push(function (tl) {
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
					}, function (tl) {
						return ScrollTrigger.create({
							// scroller: next,
							trigger: el,
							start: "-25% 100%",
							end: "100% 50%",
							scrub: gRandom(75, 125, 5) / 100,
							animation: tl
						});
					});

					// Move text
					scroll.moveText({
						// scroller: next,
						elements: alltext,
						position: "75%"
					});

					// Move masonry
					scroll.moveText({
						// scroller: next,
						elements: thumbs
					});
				}
			});
		});


		// Style - Angled
		next.querySelectorAll(".style-angled").forEach(function (el) {
			var elPicture = el.querySelectorAll(" .thumbs > picture");
			// Move pictures
			scroll.moveThumbs(elPicture, "75%");
			// Scroll pictures
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function () {
					scroll.push(function (tl) {
						gToArray(elPicture).forEach(function (picture) {
							tl.fromTo(picture, {
								rotation: -5,
								x: 650,
							}, {
								rotation: -5,
								x: -150
							}, 0);
						});

						return tl;
					}, function (tl) {
						return ScrollTrigger.create({
							// scroller: next,
							trigger: el,
							endTrigger: ".links",
							start: "0 100%",
							end: "100% 100%",
							scrub: .75,
							animation: tl
						});
					});
				},
				"(min-aspect-ratio: 1/1)": function () {
					scroll.push(function (tl) {
						elPicture.forEach(function (picture) {
							tl.fromTo(picture, {
								rotation: 0,
								x: 500,
							}, {
								rotation: 0,
								x: -500
							}, 0);
						});

						return tl;
					}, function (tl) {
						return ScrollTrigger.create({
							// scroller: next,
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
				// scroller: next,
				elements: el.querySelectorAll(" .text > *"),
				position: "85%"
			});
		});

		// Style - Slideshow
		// Full and big
		next.querySelectorAll(".style-slideshow").forEach(function (el) {
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
			that.fixedSize = function () {
				var width = 0;

				that.slideshowParent.style.removeProperty('width');

				gToArray(that.slideshowChild).forEach(function (element) {
					element.style.removeProperty('width');
					gsap.set(element, {
						width: element.offsetWidth
					});
					width += element.offsetWidth;
				});

				gsap.set(that.slideshowParent, {
					height: that.offsetHeight,
					width: width
				});
				gsap.set(that.slideshowScroll, {
					height: that.offsetHeight + 50,
					width: that.offsetWidth
				});
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
					opacity: (that.pos_start) ? .15 : 1
				});
				gsap.to(that.after, {
					duration: .25,
					opacity: (that.pos_end) ? .15 : 1
				});
			}
			that.navigationHide();
			// Scroll events
			gToArray(that.slideshowChild).forEach(function (element, index) {
				scroll.push(function (tl) {
					return tl;
				}, function (tl) {
					return ScrollTrigger.create({
						// scroller: next,
						trigger: element,
						// scroller: that.slideshowScroll,
						horizontal: true,
						start: "0 0",
						end: "100% 0",
						onUpdate: function (value) {
							this.progress = value.progress;
							this.direction = value.direction;
							that.navigationHide();
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
			that.before.addEventListener("click", function (e) {
				gsap.timeline({
					defaults: {
						ease: "expo"
					}
				}).to(this, {
					duration: .25,
					marginLeft: -25
				}).to(this, {
					duration: .25,
					marginLeft: 0
				});
				that.moveScroll(that.pos - 1);
			});
			ScrollTrigger.matchMedia({
				"(min-aspect-ratio: 1/1)": function () {
					hoverEvents([that.before], function (e) {
						gsap.to(that.slideshowScroll.querySelectorAll('li picture'), {
							x: 20
						});
					}, function (e) {
						gsap.to(that.slideshowScroll.querySelectorAll('li picture'), {
							x: 0
						});
					});
				}
			});
			//
			that.after.addEventListener("click", function (e) {
				gsap.timeline({
					defaults: {
						ease: "expo"
					}
				}).to(this, {
					duration: .25,
					marginRight: -25
				}).to(this, {
					duration: .25,
					marginRight: 0
				});
				that.moveScroll(that.pos + 1);
			});
			ScrollTrigger.matchMedia({
				"(min-aspect-ratio: 1/1)": function () {
					hoverEvents([that.after], function (e) {
						gsap.to(that.slideshowScroll.querySelectorAll('li picture'), {
							x: -20
						});
					}, function (e) {
						gsap.to(that.slideshowScroll.querySelectorAll('li picture'), {
							x: 0
						});
					});
				}
			});
			// Scroll animation
			scroll.push(function (tl) {
				tl.fromTo(that.slideshowScroll, {
					opacity: 0,
					y: 500
				}, {
					opacity: 1,
					y: 0,
					ease: "expo.out"
				}, 0);

				return tl;
			}, function (tl) {
				return ScrollTrigger.create({
					// scroller: next,
					trigger: that,
					start: "12.5% 90%",
					end: "50% 90%",
					scrub: 1,
					animation: tl
				});
			});
			//
			scroll.push(function (tl) {
				tl.fromTo(that.before, {
					x: -100
				}, {
					x: 0,
					ease: "expo.out"
				}, 0);
				tl.fromTo(that.after, {
					x: 100
				}, {
					x: 0,
					ease: "expo.out"
				}, 0);

				return tl;
			}, function (tl) {
				return ScrollTrigger.create({
					// scroller: next,
					trigger: that.before,
					start: "0 90%",
					end: (window.innerHeight / 5) + " 90%",
					scrub: 1,
					animation: tl
				});
			});
		});
		// Smaller one
		next.querySelectorAll(".style-slideshow-small").forEach(function (el) {
			scroll.push(function (tl) {
				tl.fromTo(el.children[0].querySelectorAll("picture"), {
					x: "200%"
				}, {
					x: 0,
					ease: "expo.out"
				}, 0);

				return tl;
			}, function (tl) {
				return ScrollTrigger.create({
					// scroller: next,
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
		next.querySelectorAll(".links").forEach(function (el) {
			// Move text
			scroll.moveText({
				// scroller: next,
				elements: el.querySelectorAll("nav > *"),
				position: "100%"
			});
		});
	},
	beforeLeave: function (data) {
		gToArray(".style-slideshow").forEach(function (slideshow) {
			window.removeEventListener("resize", slideshow.fixedSize);
		});
	}
}