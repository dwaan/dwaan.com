me = {
	namespace: 'me',
	beforeLeave: function(data) {
		var current = data.current.container;
		removeClass(current.querySelector(".main-text h1 strong"), "emphasis");
	},
	beforeEnter: function(data) {
		var next = data.next.container;

		/*
		var about = next.querySelector("#about");
		var usedto = next.querySelector("#usedto");
		about.querySelector('.scrollto').setAttribute('href', '#now');
		scroll.push(function(tl) {
			tl.fromTo(about.querySelectorAll('.main-text'), {
				scale: 1
			}, {
				scale: 25,
				rotation: -180,
				ease: 'power1.inOut',
				duration: 1
			}, 0);
			tl.fromTo(about.querySelectorAll('.main-text'), {
				opacity: 1
			}, {
				opacity: 0,
				duration: .25
			}, .5);

			tl.set(usedto, {
				position: "fixed",
				top: 0,
				left: 0
			}, 0);
			tl.fromTo(usedto.querySelectorAll(".anim"), {
				opacity: 0
			}, {
				opacity: 1,
				duration: .25
			}, 0);
			tl.fromTo(usedto.querySelectorAll(".anim"), {
				scale: 1/25,
				rotation: 180
			}, {
				scale: 1,
				rotation: 0,
				ease: 'power1.inOut',
				duration: 1
			}, 0);
			tl.fromTo(usedto.querySelectorAll(".text"), {
				opacity: 0
			}, {
				opacity: 1,
				duration: .25
			}, .25);

			return tl;
		}, function(tl) {
			return ScrollTrigger.create({
				scroller: next,
				trigger: about,
				start: "0 0",
				end: "100% 0",
				animation: tl,
				pin: true,
				pinSpacing: true,
				scrub: true
			});
		});
		*/

		gsap.set(next.querySelectorAll("#webdesigner"), {
			marginTop: window.innerHeight * -1/2
		});
		gsap.set(next.querySelectorAll("#webdesigner .thumbs"), {
			display: "none"
		});
		next.querySelectorAll("#now").forEach(function(element, index) {
			scroll.push(function(tl) {
				tl.fromTo(element.querySelectorAll('.thumbs'), {
					opacity: 0,
					x: -40,
					y: (window.innerHeight * -2/3),
				}, {
					opacity: 1,
					x: -10,
					y: 0,
					ease: 'linear'
				});

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					scroller: next,
					trigger: element,
					start: "0 50%",
					end: "50% 50%",
					animation: tl,
					scrub: true
				});
			});

			scroll.push(function(tl) {
				tl.fromTo(element.querySelectorAll('.thumbs'), {
					x: -10,
					y: 0,
				}, {
					x: 0,
					y: (window.innerHeight * 1/2) + 25,
					ease: 'linear'
				}, 0);

				tl.fromTo(element.querySelectorAll('.text'), {
					opacity: 1
				}, {
					opacity: 0,
					ease: 'expo.out'
				}, 0);

				tl.fromTo(next.querySelectorAll("#webdesigner .text"), {
					opacity: 0
				}, {
					opacity: 1,
					ease: 'expo.in'
				}, 0);

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					scroller: next,
					trigger: element,
					start: "50% 50%",
					end: "100% 50%",
					animation: tl,
					scrub: true
				});
			});

			scroll.push(function(tl) {
				tl.fromTo(element.querySelectorAll('.thumbs'), {
					opacity: 1,
					x: 0,
					y: (window.innerHeight * 1/2) + 25
				}, {
					opacity: 0,
					x: 20,
					y: (window.innerHeight * 9/8) + 25,
					ease: 'linear'
				});

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					scroller: next,
					trigger: element,
					start: "100% 50%",
					end: "150% 50%",
					animation: tl,
					scrub: true
				});
			});
		});

		/*
		next.querySelectorAll("#sayhi").forEach(function(element, index) {
			scroll.push(function(tl) {
				tl.fromTo(element.querySelectorAll('.text'), {
					y: 0
				}, {
					y: window.innerHeight * 1/4,
					ease: 'linear'
				});

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					scroller: next,
					trigger: element,
					start: "0 100%",
					end: "100% 0",
					animation: tl,
					scrub: true
				});
			});
		});
		*/

		// Spinning Mr. Goat and Pinning
		next.querySelectorAll("#mrgoat").forEach(function(element, index) {
			// Statics
			var duration = 1;
			var thumbs = element.querySelectorAll(".thumbs");
			var imgs = element.querySelectorAll(".thumbs > img");
			var mrgoat = {
				frame: 1
			};
			var prev = false;
			// Defining
			var repeat = 5;
			// hide
			scroll.push(function(tl) {
				tl.fromTo(element, {
					y: "0%"
				}, {
					y: "-100%",
					ease: "linear"
				});

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					scroller: next,
					trigger: "#endmrgoat",
					start: "0 0",
					end: "100% 0",
					animation: tl,
					scrub: true
				});
			});
			// Show
			scroll.push(function(tl) {
				tl.fromTo(element, {
					y: "100%"
				}, {
					y: "0%",
					ease: "linear"
				});

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					scroller: next,
					trigger: "#startmrgoat",
					start: "0 100%",
					end: "100% 100%",
					animation: tl,
					scrub: true
				});
			});
			// Spinning
			gsap.set(imgs, { opacity: 0 });
			scroll.push(function(tl) {
				tl.to(mrgoat, {
					frame: imgs.length,
					snap: "frame",
					repeat: repeat + 2,
					ease: "linear",
					duration: (repeat + 2) * duration,
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

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					scroller: next,
					trigger: "#startmrgoat",
					endTrigger: "#endmrgoat",
					start: "0 100%",
					end: "100% 0",
					animation: tl,
					scrub: .5
				});
			});
			// Facts
			scroll.push(function(tl) {
				var el = element.querySelectorAll(".thumbs, .text");
				var facts = function(els) {
					var dur = duration / 7.5;
					var tl = gsap.timeline();

					tl.fromTo(els, {
						opacity: 0
					}, {
						opacity: 1,
						ease: "power3.in",
						duration: dur
					});
					els.forEach(function(el) {
						tl.fromTo(el.querySelectorAll(".dot hr"), {
							width: "0%"
						}, {
							width: "100%",
							duration: dur
						});
					});
					els.forEach(function(el) {
						tl.fromTo(el.querySelectorAll(".line hr"), {
							width: "0%"
						}, {
							width: "100%",
							duration: dur
						});
					});
					els.forEach(function(el) {
						tl.fromTo(el.querySelectorAll("p"), {
							opacity: 0
						}, {
							opacity: 1,
							duration: dur
						});
					});
					tl.fromTo(els, {
						y: 100
					}, {
						y: -100,
						ease: "linear",
						duration: (dur * 10)
					}, 0);
					tl.to(els, {
						opacity: 0,
						ease: "power3.out",
						duration: dur
					}, (dur * 9));

					return tl;
				}

				var array = [0, 1, 2, 3];
				gsap.utils.shuffle(array);
				tl.add(facts(element.querySelectorAll("#viet")), (duration * array[0]));
				tl.add(facts(element.querySelectorAll("#food")), (duration * array[2]));
				tl.add(facts(element.querySelectorAll("#nyc")), (duration * array[1]));
				tl.add(facts(element.querySelectorAll("#travel")), (duration * array[3]));

				tl.to(el, {
					duration: repeat * duration
				}, 0);

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					scroller: next,
					trigger: "#startmrgoat",
					endTrigger: "#endmrgoat",
					start: "0 0",
					end: "100% 100%",
					animation: tl,
					scrub: .5
				});
			});
			// Pinning
			scroll.push(function(tl) {
				var el = element.querySelectorAll(".thumbs, .text");

				tl.fromTo(element.querySelectorAll("#post > *"), {
					opacity: 0
				}, {
					opacity: 1,
					ease: "power3.out",
					duration: duration
				}, (duration * 4));
				tl.fromTo(element.querySelectorAll("#post > *"), {
					y: window.innerHeight
				}, {
					y: 0,
					ease: "linear",
					duration: duration
				}, (duration * 4));
				tl.fromTo(element.querySelectorAll(".text .h2"), {
					opacity: 1
				}, {
					opacity: 0,
					ease: "power3.in",
					duration: duration
				}, (duration * 4));

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					scroller: next,
					trigger: "#startmrgoat",
					endTrigger: "#endmrgoat",
					start: "0 0",
					end: "100% 100%",
					animation: tl,
					scrub: true
				});
			});
		});

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
			var eltext = el.querySelectorAll(".text");
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
					scroller: next,
					trigger: el,
					start: "0 100%",
					end: "100% 0",
					animation: tl,
					scrub: true
				});
			});
		});

		// Links
		next.querySelectorAll(".links").forEach(function(el) {
			scroll.moveText({
				scroller: next,
				elements: el.querySelectorAll("nav > *"),
				position: "100%"
			});
			// Snap
			scroll.push(function(tl) {
				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					scroller: next,
					trigger: el,
					start: "0 100%",
					end: "100% 100%",
					animation: tl
				});
			});
		});

		// Refresh
		ScrollTrigger.refresh();
	},
	afterEnter: function(data) {
		var next = data.next.container;

		addClass(next.querySelector(".main-text h1 strong"), "emphasis");
	}
}