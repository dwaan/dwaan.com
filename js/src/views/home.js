var homeview = {
	namespace: 'home',
	beforeEnter: function (data) {
		var next = data.next.container;

		// Scroll animate arrow
		var els = next.querySelectorAll("section.middle");
		els.forEach(function (el, idx) {
			var maintext = el.querySelectorAll(".main-text > h1, .padding > a");

			// Animate text
			scroll.push(function (tl) {
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
			}, function (tl) {
				return ScrollTrigger.create({
					// scroller: next,
					trigger: el,
					start: "0 50%",
					end: "100% 50%",
					scrub: true,
					animation: tl
				})
			});
		});

		// Scroll animate flares
		scroll.push(function (tl) {
			tl.to(next.querySelectorAll(".flares > img"), {
				x: "random(-500, 500, 50)px",
				ease: "linear"
			}, 0);

			return tl;
		}, function (tl) {
			return ScrollTrigger.create({
				// scroller: next,
				trigger: "#flarestart",
				start: "0 0",
				endTrigger: "#flareend",
				end: "0 0",
				scrub: true,
				animation: tl
			});
		});
	}
}