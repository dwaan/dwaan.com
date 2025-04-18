"use strict"

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { reduceMotionFilter } from './helper.js'

// Predefined scroll animation
var scroll = {
	l: 0,
	tl: [],
	st: [],
	// Move elements up with opacity with scrub
	moveText: function (params) {
		if (!params) return false

		var elements = (params.elements) ? params.elements : []
		var position = (params.position) ? params.position : "85%"
		var delta = (params.delta) ? params.delta : 100
		var move = (params.move === undefined) ? true : params.move
		var markers = (params.markers) ? params.markers : false
		var horizontal = (params.horizontal) ? params.horizontal : false
		var scroller = (params.scroller) ? params.scroller : window

		gsap.utils.toArray(elements).forEach((element, index) => {
			var y = reduceMotionFilter() ? 0 : delta + (15 * index)
			var trigger = (params.trigger) ? params.trigger : element.parentNode
			if (!move) y = 0

			this.l = this.tl.push(gsap.timeline()) - 1

			// Don't remove, fixing bug in beforeEnter
			gsap.set(element, {
				x: horizontal ? y : 0,
				y: horizontal ? 0 : y,
				opacity: 0,
			})

			this.tl[this.l].fromTo(element, {
				x: horizontal ? y : 0,
				y: horizontal ? 0 : y,
				opacity: 0,
			}, {
				x: 0,
				y: 0,
				opacity: 1,
				ease: "ease.out"
			}, 0)

			this.st.push(ScrollTrigger.create({
				scroller: scroller,
				markers: markers,
				trigger: trigger,
				start: "0 " + position,
				end: "0 " + position,
				toggleActions: reduceMotionFilter() ? "none none none none" : "play none none reverse",
				scrub: false,
				animation: this.tl[this.l]
			}))
		})
	},
    // Scroll animate arrow
    // Parameter:
    // 1. el: main element
    arrowAndYear: next => {
        var middle = next.querySelectorAll("section.middle, div.middle");
        middle.forEach((el, idx) => {
            // Animate arrow
            var screen = gsap.matchMedia();
            // Vertical Screen
            screen.add("(max-aspect-ratio: 1/1)", () => {
                var arrow = el.querySelectorAll(".arrow-big, .arrow-small");
                var year = el.querySelectorAll(".year");

                // Animate arrow
                // Middle, disappear
                scroll.push(tl => {
                    tl.fromTo(arrow, {
                        opacity: 1
                    }, {
                        opacity: 0,
                        ease: "power3.out"
                    });

                    return tl;
                }, tl => ScrollTrigger.create({
                    trigger: el,
                    start: "75% 50%",
                    end: "100% 50%",
                    scrub: 1,
                    animation: tl
                }));

                // Animate year in detail page
                // Slide down an disappear with fix position
                scroll.push(tl => {
                    tl.fromTo(year, {
                        position: "fixed",
                        x: 0,
                        y: 0,
                        opacity: 1
                    }, {
                        x: (idx > 0 && idx < middle.length - 1) ? 50 : 0,
                        y: (idx == 0) ? window.innerHeight * -1 / 10 : 0,
                        opacity: (idx < middle.length - 1) ? 0 : 1,
                        ease: "power3.in",
                        duration: reduceMotionFilter(3)
                    }, "<");
                    tl.set(year, {
                        position: "absolute"
                    });

                    return tl;
                }, tl => ScrollTrigger.create({
                    trigger: el,
                    start: "0 50%",
                    end: "100% 50%",
                    scrub: true,
                    animation: tl
                }));

                // Clean up
                return () => {
                    arrow.forEach(el => {
                        el.style = "";
                    });
                    year.forEach(el => {
                        el.style = "";
                    });
                }
            });
            // Horizontal Screen
            screen.add("(min-aspect-ratio: 1/1)", () => {
                var arrow = el.querySelectorAll(".year, .arrow-big, .arrow-small");

                scroll.push(tl => {
                    // Show
                    tl.fromTo(arrow, {
                        position: "",
                        x: (idx > 0) ? -50 : 0,
                        opacity: 0
                    }, {
                        position: "fixed",
                        x: 0,
                        opacity: 1,
                        duration: reduceMotionFilter(3),
                        ease: "power3.out"
                    });
                    // Delay
                    tl.to(arrow, {
                        duration: reduceMotionFilter(2)
                    });
                    // Hide
                    tl.fromTo(arrow, {
                        position: "fixed",
                        x: 0,
                        y: 0,
                        opacity: 1
                    }, {
                        x: (idx > 0 && idx < middle.length - 1) ? 50 : 0,
                        y: (idx == 0) ? window.innerHeight * -1 / 5 : 0,
                        opacity: (idx < middle.length - 1) ? 0 : 1,
                        ease: "power3.in",
                        duration: reduceMotionFilter(3)
                    });
                    tl.set(arrow, {
                        position: ""
                    });

                    return tl;
                }, tl => ScrollTrigger.create({
                    trigger: el,
                    start: "0% 50%",
                    end: "100% 50%",
                    scrub: true,
                    animation: tl
                }));

                // Clean up
                return () => {
                    arrow.forEach(el => {
                        el.style = "";
                        el.querySelectorAll(".arrow").forEach(child => {
                            child.style = "";
                        })
                    });
                }
            });
        });
    },
	// Move elements up without scrub
	moveThumbs: function (elements, position, scroller) {
		var that = this

		scroller = (scroller) ? scroller : window

		if (!position) position = "85%"
		gsap.utils.toArray(elements).forEach(function (element) {
			var y = reduceMotionFilter() ? 0 : gsap.utils.random(250, 500, 5) + "px"

			// Don't remove, fixing bug in beforeEnter
			gsap.set(element, {
				y: y
			})

			that.l = that.tl.push(gsap.timeline()) - 1
			that.tl[that.l].fromTo(element, {
				y: y
			}, {
				y: 0
			}, 0)

			that.st.push(ScrollTrigger.create({
				scroller: scroller,
				trigger: element.parentNode,
				start: "0 " + position,
				end: "0 " + position,
				toggleActions: "restart none none reverse",
				animation: that.tl[that.l]
			}))
		})
	},
	snap: function (el, type = "start") {
		let start = "0 0"
		let end = "100% 0"

		type = type.toLowerCase()
		if (type == "end") {
			start = "0 100%"
			end = "100% 100%"
		}

		// Snap
		let duration = 1
		let direction = false
		this.push(tl => tl, tl => ScrollTrigger.create({
			trigger: el,
			start: start,
			end: end,
			animation: tl,
			onUpdate: self => direction = self.direction,
			// id: el.className,
			// markers: true,
			snap: {
				snapTo: value => {
					console.log(type, direction < 0 ? "up" : "down", value)
					let final = value <= .25 ? 0 : direction < 0 ? 1 : 0
					if (type == "center") final = direction < 0 ? (value < .95 ? 0 : 1) : (value > .05 ? 1 : 0)
					duration = value / 2
					return final
				},
				duration: duration,
				delay: 0,
				ease: "expo.inOut"
			}
		}))
	},
	// Add custom animation
	push: function (animationFunction, scrollFunction) {
		if (!animationFunction || !scrollFunction) return false

		this.l = this.tl.push(gsap.timeline()) - 1

		if (typeof animationFunction === "function") {
			this.tl[this.l] = animationFunction(this.tl[this.l])
		}

		if (typeof scrollFunction === "function") {
			this.st.push(scrollFunction(this.tl[this.l]))
		}

		return this.tl.length - 1
	},
	// Refresh the whole scrolltrigger, or
	// Call this to refresh one scroll
	refresh: function (id) {
		if (id == undefined) ScrollTrigger.refresh()
		if (this.st[id]) this.st[id].refresh()
	},
	// Call this to kill one scroll
	kill: function (id) {
		if (this.tl[id]) this.tl[id].kill()
		if (this.st[id]) this.st[id].kill()
	},
	// Call this to remove garbage
	destroy: function () {
		// Cleaning up GSAP and ScrollTrigger timeline
		for (var i = 0; i < this.tl.length; i++) {
			if (this.tl[i]) this.tl[i].kill()
			if (this.st[i]) this.st[i].kill()
		}
		this.tl = []
		this.st = []
		//
		this.l = 0
	}
}

export default scroll