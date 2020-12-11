var hi = {
	namespace: 'hi',
	beforeEnter: function(data) {
		var next = data.next.container;

		var screenvertical = window.matchMedia('(max-aspect-ratio: 1/1)').matches;
		var screenhorizontal = window.matchMedia('(min-aspect-ratio: 1/1)').matches;

		var flare = {
			elements: "",
			show: function(elements) {
				var that = this;

				if (elements) this.elements = next.querySelectorAll(elements);

				gsap.killTweensOf(this.elements);
				if (elements) {
					gsap.to(this.elements, {
						opacity: 1,
						ease: "ease.out",
						duration: 1
					});
					gsap.to(this.elements, {
						x: "random(-100,100,10)%",
						y: "random(10,30,5)%",
						rotation: "random(-5,5,1)deg",
						scale: screenhorizontal ? "random(1,2.5,.5)" : "random(.5,1.5,.5)",
						ease: "ease.out",
						duration: .5
					});
				}

				var repeatanimation = function(element) {
					gsap.to(element, {
						x: "random(-100,100,10)%",
						y: "random(10,30,5)%",
						rotation: "random(-5,5,1)deg",
						scale: screenhorizontal ? "random(1,2.5,.5)" : "random(.5,1.5,.5)",
						opacity: gRandom(5,10,1) / 10,
						duration: gRandom(5,10,1),
						ease: "ease.inOut",
						onComplete: function() {
							repeatanimation(element);
						}
					});

				}

				this.elements.forEach(function(el) {
					repeatanimation(el);
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
			show: function(el, hint, positive) {
				var split = -50;

				this.el = el;
				this.hint = hint;

				if (positive) split = 50;

				if (el.length == 2) {
					gsap.killTweensOf(next.querySelectorAll(this.el.toString()));
					gsap.to(next.querySelectorAll(this.el[0]), {
						x: split * -1,
						ease: "power3.out",
						duration: .5
					});
					gsap.to(next.querySelectorAll(this.el[1]), {
						x: split,
						ease: "power3.out",
						duration: .5
					});
				} else {
					gsap.killTweensOf(next.querySelectorAll(this.el));
					gsap.to(next.querySelectorAll(this.el), {
						x: split,
						ease: "power3.out",
						duration: .5
					});
				}

				gsap.fromTo(next.querySelectorAll(this.hint), {
					y: 50
				}, {
					y: 0,
					opacity: 1,
					ease: "power3.out",
					duration: .5
				});
			},
			hide: function() {
				gsap.to(next.querySelectorAll(this.el), {
					x: 0,
					ease: "power3.out",
					delay: .1,
					duration: .5
				});
				gsap.to(next.querySelectorAll(this.hint), {
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

		hoverEvents(next.querySelectorAll(".email"), function(el) {
			if(screenhorizontal) textanim.show(".email span", ".email small");
			flare.show("img.yellow, img.red");
		}, function(el) {
			if(screenhorizontal) textanim.hide();
			flare.hide();
		});
		hoverEvents(next.querySelectorAll(".social"), function(el) {
			if(screenhorizontal) textanim.show([".website span", ".email span"], ".social span:first-child small");
			flare.show("img.blue, img.red");
		}, function(el) {
			if(screenhorizontal) textanim.hide();
			flare.hide();
		});
		hoverEvents(next.querySelectorAll(".website"), function(el) {
			if(screenhorizontal) textanim.show(".social span:nth-child(2), .website span", ".social span:nth-child(2) small", true);
			flare.show("img.blue, img.green");
		}, function(el) {
			if(screenhorizontal) textanim.hide();
			flare.hide();
		});
	}
}