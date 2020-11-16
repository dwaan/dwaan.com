'use strict';
var st = [];
barba.init({
	views: [{
		namespace: 'del1',
		beforeLeave() {
			// tl.kill();
		},
		beforeEnter(data) {
			console.log("After enter del 1");
		}
	}, {
		namespace: 'del2',
		beforeLeave() {
			for (var i = 0; i < st.length; i++) {
				st[i].kill();
			}
			st = [];
		},
		beforeEnter(data) {
			console.log("After enter del 2");

			// var anim = gsap.fromTo("h1", {
			// 	x: 0,
			// }, {
			// 	x: 500,
			// });

			st.push(ScrollTrigger.create({
				markers: true,
				trigger: "h1",
				start: "0 50%",
				end: "100% 50%",
				scrub: .5,
				animation: gsap.fromTo("h1", {
					x: 0,
				}, {
					x: 500,
				}),
				onUpdate: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
			}));
		}
	}]
});

barba.hooks.enter(() => {
	window.scrollTo(0, 0);
});