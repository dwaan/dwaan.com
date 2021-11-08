var lostview = {
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
}