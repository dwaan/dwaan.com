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
		if (typeof done != "function") return;

		// Wait for all images to be loaded
		let _percent = { score: 0 };
		let _hide = () => {
			this.hide(() => {
				this.clean();
				done();
			});
		}

		// Animate the loading
		gsap.fromTo(this.el.children, {
			opacity: 0,
		}, {
			opacity: 1,
			ease: "expo",
			delay: .25,
			duration: .5
		});

		// Calling loading images function
		if (!els) {
			_hide();
			return;
		}

		waitForImg(els.querySelectorAll("img"), (_, percent) => {
			gsap.to(_percent, {
				score: percent,
				roundProps: "score",
				duration: .1,
				onUpdate: () => {
					this.update(_percent.score);
				}
			});
		}, () => _hide());
	},
	hide: function (done) {
		if (typeof done !== "function") return false;

		gsap.killTweensOf(this.el.children);
		gsap.to(this.el.children, {
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