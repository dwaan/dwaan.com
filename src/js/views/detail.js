"use strict";

import gsap from "gsap";
import scroll from "../helpers/scroll";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { _q, _qAll, hoverEvents } from '../helpers/helper';

var detailview = {
	namespace: 'detail',
	beforeEnter: data => {
		var next = data.next.container;

		// Style - Plain
		next.querySelectorAll(".style-plain").forEach(el => {
			// Move the text
			scroll.moveText({
				elements: el.querySelectorAll(".titles > *, h3, p"),
				position: "80%"
			});
		});

		next.querySelectorAll(".style-plain-single").forEach(el => {
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						tl.fromTo(el.querySelectorAll(".thumbs > picture"), {
							y: "50%",
							opacity: 0
						}, {
							y: "0%",
							opacity: 1,
							ease: "expo"
						});

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el.querySelectorAll(".thumbs"),
							start: "0 100%",
							end: "50% 100%",
							scrub: 5,
							animation: tl
						});
					});
				},
				"(min-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						tl.fromTo(el.querySelectorAll(".thumbs > picture"), {
							opacity: 1,
							y: "25%"
						}, {
							y: "-25%",
							ease: "linear"
						});

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							start: "0 100%",
							end: "100% 0",
							scrub: 1,
							animation: tl
						});
					});
				}
			});
		});

		next.querySelectorAll(".style-plain-sticky").forEach(el => {
			var pictures = el.querySelectorAll("picture");

			// Scroll animation
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						pictures.forEach((picture, index) => {
							tl.fromTo(picture, {
								rotation: 0,
								x: (index + 1) * 50 + "%",
								y: (index + 1) * 30 + "%",
								zIndex: pictures.length - index
							}, {
								x: index * 20 + "%",
								y: index * 20 + "%",
								ease: "power1.out",
								duration: 1
							}, 0);

							tl.to(picture, {
								rotation: 0,
								x: (index + 1) * -30 + "%",
								y: (index + 1) * 7.5 + "%",
								ease: "power1.in",
								duration: 1
							}, 1);

							tl.fromTo(picture, {
								opacity: 0,
								ease: "expo.in"
							}, {
								opacity: 1,
								duration: .1
							}, .05);
						});

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							start: "0 100%",
							end: "100% 0",
							scrub: 1,
							animation: tl
						});
					});
				},
				"(min-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						pictures.forEach((picture, index) => {
							tl.fromTo(picture, {
								rotation: (pictures.length - index - 1) * 5,
								x: ((pictures.length - index - 1) * 7.5) + "%",
								y: ((pictures.length - index - 1) * 40) + "%",
								zIndex: pictures.length - index
							}, {
								rotation: index * -5,
								x: index * -10 + "%",
								y: index * -80 + "%",
								ease: "power1.inOut",
								duration: 1
							}, 0);

							tl.fromTo(picture, {
								opacity: 0,
								ease: "expo.in"
							}, {
								opacity: 1,
								duration: .1
							}, .05);
						});

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							start: "0 100%",
							end: "100% 0",
							scrub: 1,
							animation: tl
						});
					});
				}
			});
		});

		next.querySelectorAll(".style-plain-scroll").forEach(el => {
			// Move thumbnail again
			scroll.moveThumbs(el.querySelectorAll(".thumbs > picture"), null);

			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						tl.fromTo(el.querySelector(".thumbs"), {
							x: 0
						}, {
							x: (el.querySelector(".thumbs").offsetWidth - el.querySelector(".scroll").offsetWidth) * -1,
							ease: "ease.in"
						});

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el.querySelector(".thumbs"),
							start: "0 80%",
							end: "100% 80%",
							scrub: 3,
							animation: tl
						});
					});
				},
				"(min-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						tl.fromTo(el.querySelector(".thumbs"), {
							x: (el.querySelector(".thumbs").offsetWidth - el.querySelector(".scroll").offsetWidth) * -1
						}, {
							x: 0,
							ease: "ease.in"
						});

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							start: "50% 100%",
							end: "100% 100%",
							scrub: 3,
							animation: tl
						});
					});
				}
			});
		});


		// Style - Spread
		next.querySelectorAll(".style-spread:not(.style-spread-big)").forEach(el => {
			// Move the text
			scroll.moveText({
				elements: el.querySelectorAll(".titles > *, p")
			});
			// Scroll animation
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						tl.fromTo(el.querySelectorAll(".pic-4"), {
							top: "random(250, 500, 5)px",
							left: "50%",
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
							rotation: 0
						}, {
							top: 0,
							right: "50%",
							rotation: -7.5,
							ease: "expo.out"
						}, 0);

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							start: "50% 75%",
							end: "100% 75%",
							animation: tl,
							scrub: 1
						});
					});
				},
				"(min-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						tl.fromTo(el.querySelectorAll(".pic-5"), {
							top: "75%",
							left: "350%",
							right: "initial",
							rotation: 0
						}, {
							top: "40%",
							left: "10%",
							rotation: -30,
							duration: 1,
							ease: "expo.out"
						}, 0);

						tl.fromTo(el.querySelectorAll(".pic-4"), {
							top: "75%",
							left: "350%",
							rotation: 0
						}, {
							top: "25%",
							left: "50%",
							rotation: -10,
							duration: 1,
							ease: "expo.out"
						}, .064);

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							start: "-25% 50%",
							end: "50% 50%",
							scrub: 1,
							animation: tl
						});
					});
				}
			});
		});
		next.querySelectorAll(".style-spread-big").forEach(el => {
			// Scroll animation
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						for (let idx = 1; idx <= 3; idx++) {
							tl.fromTo(el.querySelectorAll(".pic-" + idx), {
								y: "30%",
								x: -100,
								rotation: 0
							}, {
								y: idx == 1 ? 0 : "10%",
								x: idx == 1 ? "-50%" : idx == 2 ? "-55%" : "-45%",
								rotation: idx == 1 ? 0 : idx == 2 ? -12.5 : 12.5,
								duration: 1
							}, (idx - 1) * .064);
						}

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el.querySelectorAll(".thumbs"),
							start: "50% 100%",
							end: "100% 100%",
							animation: tl,
							scrub: 1.25
						});
					});
				},
				"(min-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						for (let idx = 1; idx <= 3; idx++) {
							tl.fromTo(el.querySelectorAll(".pic-" + idx), {
								top: (9.5 - (idx * 5 / 6)) * 10 + "%",
								left: (12.25 + (idx * 5 / 4)) * 10 + "%",
								rotation: (idx + 2) * 5
							}, {
								top: (4.5 - (idx * 5 / 6)) * 10 + "%",
								left: (2.25 + (idx * 5 / 4)) * 10 + "%",
								rotation: (idx - 2) * 5,
								duration: 1,
								ease: "expo"
							}, (idx - 1) * .064);
						}

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el.querySelectorAll(".thumbs"),
							start: "-25% 50%",
							end: "50% 50%",
							scrub: 2,
							animation: tl
						});
					});
				}
			});
		});

		// Style - Spread Left
		next.querySelectorAll(".style-spread-left").forEach(el => {
			// Move the text
			scroll.moveText({
				elements: el.querySelectorAll(".titles > *, p")
			});
			// Scroll animation
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
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
					}, tl => {
						return ScrollTrigger.create({
							trigger: el.querySelectorAll(".thumbs"),
							start: "0 100%-=100px",
							end: "100% 100%-=100px",
							animation: tl,
							scrub: 1
						});
					});
				},
				"(min-aspect-ratio: 1/1)": () => {
					// Move the pictures
					scroll.push(tl => {
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
					}, tl => {
						return ScrollTrigger.create({
							trigger: el.querySelectorAll(".thumbs"),
							start: "-50% 50%",
							end: "50% 50%",
							scrub: 1,
							animation: tl
						});
					});
				}
			});
		});

		// Style - Top
		next.querySelectorAll(".style-top").forEach(el => {
			var thumbs = el.querySelector(".thumbs");
			// Move text
			scroll.moveText({
				elements: el.querySelectorAll(".text h2, .text li")
			});
			ScrollTrigger.defaults({
				start: "0 100%",
				end: "100% 0",
				scrub: .75
			});
			// Move thumbnails
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						tl.fromTo(thumbs, {
							x: 0
						}, {
							x: (el.offsetWidth - thumbs.offsetWidth),
							ease: "linear"
						}, 0);

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							animation: tl
						});
					});
				},
				"(min-aspect-ratio: 1/1)": () => {
					scroll.push(tl => {
						tl.fromTo(thumbs, {
							x: 0
						}, {
							x: (el.offsetWidth - thumbs.offsetWidth),
							ease: "linear",
							duration: 5,
						}, 0);

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							animation: tl
						});
					});
				}
			});
			// Reset
			ScrollTrigger.defaults({});
			// Move thumbnail again
			scroll.moveThumbs(el.querySelectorAll(".thumbs > picture"));
		});

		// Style - Top
		next.querySelectorAll(".style-top-text").forEach(el => {
			// Move text
			scroll.moveText({
				elements: el.querySelectorAll(".text h2, .text li")
			});
		});

		// Style - Bottom
		next.querySelectorAll(".style-bottom-logo").forEach(el => {
			// Move text
			scroll.moveText({
				elements: el.querySelectorAll(".text > *")
			});
			// Move logo
			scroll.push(tl => {
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
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: (window.innerHeight * 1 / 4) + " " + (window.innerHeight * 3 / 4),
					end: (window.innerHeight * 3 / 4) + " " + (window.innerHeight * 3 / 4),
					scrub: 1,
					animation: tl
				});
			});
		});

		// Style - Flex
		next.querySelectorAll(".style-flex").forEach(el => {
			// Move text
			scroll.moveText({
				elements: el.querySelectorAll(".style-column .text, .style-column .meta > *"),
				position: "90%"
			});
		});

		// Style - Trunc
		next.querySelectorAll(".style-trunc").forEach(el => {
			// Move text
			ScrollTrigger.matchMedia({
				"(min-aspect-ratio: 1/1)": () => {
					gsap.set(el.querySelectorAll(".text > *, .color, .color ul > *"), {
						y: 0,
						opacity: 1
					});
					scroll.moveText({
						elements: el.querySelectorAll(".text > *, .color ul > *"),
						position: "100%",
						horizontal: true
					});
				},
				"(max-aspect-ratio: 1/1)": () => {
					gsap.set(el.querySelectorAll(".text > *, .color, .color ul > *"), {
						x: 0,
						opacity: 1
					});
					scroll.moveText({
						elements: el.querySelectorAll(".text > *, .color")
					});
				}
			});
		});

		// Style - Masonry
		next.querySelectorAll(".style-masonry").forEach(el => {
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
					scroll.push(tl => {
						for (var index = 1; index <= 4; index++) {
							var yplus = gsap.utils.random(250, 750, 25),
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
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							start: "-25% 100%",
							end: "100% 50%",
							scrub: .75,
							animation: tl
						});
					});

					// Scroll left
					scroll.push(tl => {
						tl.fromTo(thumbs, {
							x: 0,
						}, {
							x: -50,
							ease: "linear"
						}, 0);

						return tl;
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							start: "-25% 100%",
							end: "100% 50%",
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
				"(min-aspect-ratio: 1/1)": function () {
					// Rotate masonry
					gsap.set(thumbs, {
						rotation: 0
					});

					// Scroll
					scroll.push(tl => {
						for (var index = 1; index <= 4; index++) {
							var yplus = gsap.utils.random(250, 1000, 25),
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
					}, tl => {
						return ScrollTrigger.create({
							trigger: el,
							start: "-25% 100%",
							end: "100% 50%",
							scrub: gsap.utils.random(75, 125, 5) / 100,
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
		next.querySelectorAll(".style-angled:not(.style-angled-individual)").forEach(el => {
			var elPicture = el.querySelectorAll(" .thumbs > picture");
			// Move pictures
			scroll.moveThumbs(elPicture, "75%");
			// Scroll pictures
			ScrollTrigger.matchMedia({
				"(max-aspect-ratio: 1/1)": function () {
					scroll.push(tl => {
						gsap.utils.toArray(elPicture).forEach(function (picture) {
							tl.fromTo(picture, {
								rotation: -5,
								x: 650,
							}, {
								rotation: -5,
								x: -150
							}, 0);
						});

						return tl;
					}, tl => {
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
				"(min-aspect-ratio: 1/1)": function () {
					scroll.push(tl => {
						elPicture.forEach(function (picture) {
							tl.fromTo(picture, {
								rotation: 0,
								x: 500,
							}, {
								rotation: 0,
								x: -500,
								ease: "linear"
							}, 0);
						});

						return tl;
					}, tl => {
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
		next.querySelectorAll(".style-angled-individual").forEach(el => {
			var elPicture = el.querySelectorAll(" .thumbs > picture");
			// Move pictures
			scroll.moveThumbs(elPicture, "100%");
			// Scroll pictures
			scroll.push(tl => {
				elPicture.forEach(function (picture) {
					tl.fromTo(picture, {
						rotation: -5,
						x: 500,
					}, {
						rotation: -5,
						x: -500
					}, 0);
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 0",
					scrub: .75,
					animation: tl
				});
			});
			// Move text
			scroll.moveText({
				elements: el.querySelectorAll(" .text > *"),
				position: "85%"
			});
		});

		// Style - Background
		next.querySelectorAll(".style-background").forEach(el => {
			var elPicture = el.querySelectorAll(".thumbs");
			// Scroll pictures
			scroll.push(tl => {
				elPicture.forEach(function (picture) {
					tl.fromTo(picture, {
						x: "1%",
						y: "-50%"
					}, {
						x: "-1%",
						y: "50%",
						ease: "linear"
					}, 0);
				});

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 0",
					scrub: true,
					animation: tl
				});
			});
			// Scroll text
			el.querySelectorAll(".text").forEach(text => {
				scroll.push(tl => {
					tl.fromTo(text, {
						y: "100%"
					}, {
						y: "-100%",
						ease: "linear"
					}, 0);

					return tl;
				}, tl => {
					return ScrollTrigger.create({
						trigger: el,
						start: "0 100%",
						end: "100% 0",
						scrub: .5,
						animation: tl
					});
				});
			});
		});

		// Style - Slideshow
		// Full and big
		next.querySelectorAll(".style-slideshow").forEach(el => {
			// Add navigation
			el.insertAdjacentHTML('beforeend', "<div class='before'></div><div class='after'></div>");
			// Variables
			var that = el;
			that.slideshowScroll = that.children[0];
			that.slideshowParent = that.querySelector("ul");
			that.slideshowChild = that.slideshowScroll.querySelectorAll("li");
			that.l = gsap.utils.toArray(that.slideshowChild).length;
			that.pos = 0;
			that.pos_start = true;
			that.pos_end = false;
			that.before = that.children[1];
			that.after = that.children[2];
			// Fixed size
			that.fixedSize = function () {
				var width = 0;

				that.slideshowParent.style.removeProperty('width');

				gsap.utils.toArray(that.slideshowChild).forEach(function (element) {
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
			gsap.utils.toArray(that.slideshowChild).forEach(function (element, index) {
				scroll.push(tl => {
					return tl;
				}, tl => {
					return ScrollTrigger.create({
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
			scroll.push(tl => {
				tl.fromTo(that.slideshowScroll, {
					opacity: 0,
					y: 500
				}, {
					opacity: 1,
					y: 0,
					ease: "expo.out"
				}, 0);

				return tl;
			}, tl => {
				return ScrollTrigger.create({
					trigger: that,
					start: "12.5% 90%",
					end: "50% 90%",
					scrub: 1,
					animation: tl
				});
			});
			//
			scroll.push(tl => {
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
			}, tl => {
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
		next.querySelectorAll(".style-slideshow-small").forEach(el => {
			scroll.push(tl => {
				tl.fromTo(el.children[0].querySelectorAll("picture"), {
					x: "200%"
				}, {
					x: 0,
					ease: "expo.out"
				}, 0);

				return tl;
			}, tl => {
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
		next.querySelectorAll(".links").forEach(el => {
			// Move text
			scroll.moveText({
				elements: el.querySelectorAll("nav > *"),
				position: "100%"
			});
		});


		// Snap
		next.querySelectorAll("section.snap").forEach(el => {
			scroll.snap(el);
		});
		next.querySelectorAll("section.snap-bottom").forEach(el => {
			scroll.snap(el, "bottom");
		});
		next.querySelectorAll("section.snap-center").forEach(el => {
			scroll.snap(el, "center");
		});
	},
	beforeLeave: () => {
		gsap.utils.toArray(".style-slideshow").forEach(slideshow => {
			window.removeEventListener("resize", slideshow.fixedSize);
		});
	},
	afterEnter: () => console.info("Right now, you're reading one of my portfolio. Enjoy!")
}

export default detailview;