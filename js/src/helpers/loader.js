// Loader functions
var loader = {
	el: _q("#loader"),
	update: function (percent) {
		gsap.to(this.el.querySelectorAll(".loading"), {
			width: percent + "%"
		})
	},
	clean: function () {
		this.el.innerHTML = "";
	},
	init: function (done) {
		var that = this;

		document.body.style.cursor = "wait";
		if (done === true) {
			// Simple style
			this.el.innerHTML = '<p class="simple" style="opacity: 0;"><span><i class="loading" style="width:0%"></i></span></p>';
		} else {
			// Progress bar type
			this.el.innerHTML = '<p class="normal" style="opacity: 0;"><span>Downloading</span> <span><i class="loading" style="width:0%"></i></span></p>';
		}
		gsap.set(this.el, {
			y: 0,
			opacity: 1
		});

		if (typeof done === "function") done();
	},
	show: function (els, done) {
		if (typeof done != "function") return false;

		// Wait for all images to be loaded
		var that = this;
		var _percent = { score: 0 };

		// Animate the loading
		gsap.fromTo(that.el.children, {
			opacity: 0,
		}, {
			opacity: 1,
			ease: "expo",
			delay: .25,
			duration: .5
		});

		// Calling loading images function
		if (els) {
			waitForImg(els.querySelectorAll("img"), function (index, percent) {
				gsap.to(_percent, {
					score: percent,
					roundProps: "score",
					duration: .1,
					onUpdate: function () {
						that.update(_percent.score);
					}
				});
			}, function () {
				that.hide(function () {
					that.clean();
					done();
				});
			});
		} else {
			that.hide(function () {
				that.clean();
				done();
			});
		}
	},
	hide: function (done) {
		if (typeof done !== "function") return false;

		var that = this;

		gsap.killTweensOf(that.el.children);
		gsap.to(that.el.children, {
			opacity: 0,
			ease: "expo.in",
			duration: .25,
			onComplete: function () {
				done();
			}
		});
	},
	empty: function () {
		this.clean();
		document.body.style.cursor = "";
		gsap.set(this.el, {
			y: "-100%",
			opacity: 0
		});
	}
}