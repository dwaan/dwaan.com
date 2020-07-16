'use strict';

//////////////// Dark Mode
var dark_mode = false;
function toggleDarkMode() {
	console.log("Toggle Dark Mode")
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


//////////////// Loading Image
var imageloading = {
	loaded: false,
	init: function (elem, onupdate, callback) {
		var that = this,
			callback_called = 0,
			imgs = null;

		that.loaded = false;

		imgs = elem.querySelectorAll("img");
		waitForImg(imgs, function(index, percent) {
			if(onupdate) onupdate(percent);
		}, function() {
			that.loaded = true;
			if(callback) callback();
			else that.done();
		});
	},
	done: function (callback) {
		var that = this;

		if(callback) callback();
	}
}

////////// Initial

// When DOM is parsed
document.addEventListener('DOMContentLoaded', function(e) {
	// Wait for all images to be loaded
	var _percent = {
		score: 0
	};
	imageloading.init(document, function (percent){
		gsap.to(_percent, {
			score: percent,
			roundProps: "score",
			onUpdate: function() {
				_q("#loader").innerHTML = '<p>Downloading <span><i style="width:' + _percent.score + '%"></i></span></p>';
			},
			ease: "expo"
		})
	}, function () {
		var tl = gsap.timeline({ defaults: { duration: .256 }});

		tl
			.fromTo("#loader", { ease: "expo.in", borderRadius: 0 }, { borderRadius: "0 0 50vw 50vw" })
			.fromTo("#loader", { ease: "expo.out", y: "0%" }, { y: "-100%" })
			.set("#loader", { opacity: 0, onComplete: function() {
				_q("#loader").innerHTML = "";
			}})
		;
	});
});

barba.init({
	transitions: [{
		name: 'default-transition',
		before(data) {
			var tl = gsap.timeline({ defaults: { duration: .256 }});

			tl
				.set("#loader", { opacity: 1 })
				.fromTo("#loader", { ease: "expo.in", y: "100%", borderRadius: "50vw 50vw 0 0" }, { y: "0%" })
				.fromTo("#loader", { ease: "expo.out", borderRadius: "50vw 50vw 0 0" }, { borderRadius: 0 })
			;

			return tl;
		},
		leave(data) {
			return true;
		},
		enter(data) {
			return true;
		},
		after(data) {
			var tl = gsap.timeline({ defaults: { duration: .256 }});

			tl
				.fromTo("#loader", { ease: "expo.in", borderRadius: 0 }, { borderRadius: "0 0 50vw 50vw" })
				.fromTo("#loader", { ease: "expo.out", y: "0%" }, { y: "-100%" })
				.set("#loader", { opacity: 0 })
			;

			return tl;
		}
	}]
});

barba.hooks.enter(() => {
	window.scrollTo(0, 0);
});