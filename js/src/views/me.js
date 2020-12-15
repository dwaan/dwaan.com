me = {
	namespace: 'me',
	beforeLeave: function(data) {
		var current = data.current.container;
		removeClass(current.querySelector(".main-text h1 strong"), "emphasis");
	},
	beforeEnter: function(data) {
		var next = data.next.container;

		snap(".me, .intro, .igstage", 2);

		next.querySelectorAll(".me, .intro").forEach(function(element, index) {
			scroll.push(function(tl) {
				tl.fromTo(element.querySelectorAll('.main-text, .text'), {
					y: 0
				}, {
					y: window.innerHeight * 1/3,
					ease: 'power1.in',
					duration: 2
				}, 0);
				tl.fromTo(element.querySelectorAll('.main-text, .text'), {
					opacity: 1
				}, {
					opacity: 0,
					ease: 'ease.in',
					duration: 1
				}, 1);

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

			scroll.push(function(tl) {
				tl.fromTo(next.querySelectorAll('.flares'), {
					className: "flares"
				}, {
					className: "flares " + element.id,
					duration: 1
				});
				tl.set(next.querySelectorAll('.flares'), {
					className: "flares"
				});
				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: element,
					start: "0 25%",
					end: "100% 25%",
					animation: tl,
					scrub: true
				});
			});
		});

		// Spinning Mr. Goat and Pinning
		next.querySelectorAll(".mrgoat").forEach(function(element, index) {
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
			// Streatching
			gsap.set(element, { height: repeat + "00vh" });
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
					trigger: element,
					start: "0 100%",
					end: "100% 0",
					animation: tl,
					snap: 1,
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
					trigger: element,
					start: "0 0",
					end: "100% 100%",
					animation: tl,
					snap: 1 / repeat,
					scrub: .5
				});
			});
			// Pinning
			scroll.push(function(tl) {
				var el = element.querySelectorAll(".thumbs, .text");

				tl.fromTo(element.querySelectorAll("#post"), {
					opacity: 0
				}, {
					opacity: 1,
					ease: "power3.out",
					duration: duration
				}, (duration * 4));
				tl.fromTo(element.querySelectorAll("#post"), {
					x: "",
					y: "100vh"
				}, {
					y: "0vh",
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

				tl.fromTo(el, {
					position: "absolute",
					top: 0
				}, {
					position: "fixed",
					duration: repeat * duration
				}, 0);
				tl.set(el, {
					position: "absolute",
					top: 'initial',
					bottom: 0
				}, ">");

				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: element,
					start: "0 0",
					end: "100% 100%",
					animation: tl,
					scrub: true
				});
			});
		});

		// Ig Stage hover
		next.querySelectorAll(".igstage .thumbs a").forEach(function(el, index) {
			// Hover
			var picture = el.querySelector("img");
			hoverEvents([el], function(el) {
				gsap.set(el, {
					zIndex: 10
				});
				gsap.killTweensOf(picture);
				gsap.to(picture, {
					rotation: "random(-10,10,2)",
					scale: 1.25,
					duration: .5,
					boxShadow: '0 40px 60px rgba(0,0,0,0.5)',
					ease: "back"
				});
			}, function(el) {
				gsap.set(el, {
					zIndex: 1
				});
				gsap.killTweensOf(picture);
				gsap.to(picture, {
					rotation: 0,
					scale: 1,
					boxShadow: '',
					duration: .5,
					ease: "expo.out"
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
				elements: el.querySelectorAll("nav > *"),
				position: "100%"
			});
			// Snap
			scroll.push(function(tl) {
				return tl;
			}, function(tl) {
				return ScrollTrigger.create({
					trigger: el,
					start: "0 100%",
					end: "100% 100%",
					animation: tl,
					snap: 1
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