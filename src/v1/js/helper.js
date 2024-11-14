'use strict'

import { gsap } from 'gsap'
import PhotoSwipeLightbox from 'photoswipe/lightbox';

// Helper functions
function _q(argument) {
	return document.querySelector(argument);
}
function _qAll(argument) {
	return document.querySelectorAll(argument);
}
function removeClass(el, className) {
	if (el.classList) {
		el
			.classList
			.remove(className)
	} else {
		el.className = el
			.className
			.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
	}
}
function addClass(el, className) {
	if (typeof el === "string") el = document.querySelector(el)

	if (el.classList) {
		el.classList.add(className)
	} else {
		var current = el.className
		var found = false
		var all = current.split(' ')
		for (var i = 0; i < all.length, !found; i += 1) {
			found = all[i] === className
		}
		if (!found) {
			if (current === '') {
				el.className = className
			} else {
				el.className += ' ' + className
			}
		}
	}
}
function hasClass(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
function nextElementSibling(el) {
	do {
		el = el.nextSibling
	} while (el && el.nodeType !== 1);
	return el
}
// Wait for image to load
// Parameter:
// 1. IMG Elements Object or String
// 2. On progress callback, or on done callback if there's only 2 parameter
// 3. On done callback
function waitForImg() {
	var els = document
	var progress = () => { }
	var done = () => { }
	var count = 0

	if (arguments.length <= 0) {
		return false
	} else {
		if (typeof arguments[0] != "object") els = _qAll(els)
		else els = arguments[0]
		count = els.length + 1

		if (arguments[2]) {
			progress = arguments[1]
			done = arguments[2]
		} else {
			done = arguments[1]
		}

		// At the beginning animate the progress a bit
		count--;
		if (progress) progress(count, 100 - (count / els.length * 100));

		if (count > 0) {
			els.forEach(el => {
				// When loaded report it as a progress
				if (el.complete) {
					progress(count--, 100 - (count / els.length * 100));
					if (count == 0) done();
				} else {
					el.addEventListener("load", _ => {
						progress(count--, 100 - (count / els.length * 100));
						if (count == 0) done();
					});
				}
			})
		} else {
			progress(0, 100);
			done();
		}

		return true;
	}
}

// Splitting text
function splitText(els) {
	var addTags = function (el, idx) {
		var splord, splext;
		var split = "";

		splord = el.textContent.split(" ");
		for (var i = 0; i < splord.length; i++) {
			splext = splord[i].split("");
			splord[i] = "<dl class='splord wrd" + idx + i + "'>";
			for (var j = 0; j < splext.length; j++) {
				if (splext[j] == " ") splext[j] = "&nbsp;";
				splord[i] += "<dt class='splext txt" + idx + i + j + "'>" + splext[j] + "</dt>";
			}
			splord[i] += "</dl>";
			if (i < splord.length - 1) splord[i] += " ";
			split += splord[i];
		}

		return split;
	}

	var travelTags = function (nodes, idx) {
		var split = [],
			childNodes = nodes.childNodes;

		for (var i = 0; i < childNodes.length; i++) {
			if (childNodes[i].childNodes.length == 0) {
				// The child that doesn't have child
				if (childNodes[i].textContent.trim() == "") {
					split.push([" ", " "]);
				} else {
					split.push([childNodes[i].textContent, addTags(childNodes[i], idx + "" + i)]);
				}
			} else {
				// Replace the inner text with split text
				var str = childNodes[i].outerHTML,
					tags = travelTags(childNodes[i], idx + "" + i);
				str = str.replace(tags[0][0], tags[0][1]);
				split.push([childNodes[i].textContent, str]);
			}
		}

		return split;
	}

	var els = _qAll(els);
	for (var i = 0; i < els.length; i++) {
		var result = travelTags(els[i], i);
		els[i].innerHTML = "";
		for (var j = 0; j < result.length; j++) {
			els[i].innerHTML += result[j][1];
		}
	}
}
// Huge text animation
class hugeText {
	element = null
	tween = null
	cancelhide = false
	onshow = false

	constructor(el) {
		this.element = _q(el);
		this.element.innerHTML = "<span></span>";

		gsap.set(this.element.children, { yPercent: 100 });
		gsap.fromTo(this.element.children, {
			xPercent: -25
		}, {
			duration: 10,
			repeat: -1,
			ease: "linear",
			xPercent: -75
		});

		return this;
	}

	show(text) {
		this.cancelhide = true;
		this
			.element
			.querySelector("span")
			.innerHTML = "<i>" + text + "</i><i>" + text + "</i><i>" + text + "</i><i>" + text + "</i>";
		if (this.tween != null)
			this.tween.kill();
		this.tween = gsap.to(this.element.children, {
			duration: .512,
			ease: "expo",
			yPercent: 0
		});
	};

	hide() {
		this.tween = gsap.to(this.element.children, {
			duration: .512,
			ease: "expo",
			yPercent: 100,
			onComplete: _ => {
				if (this.cancelhide) {
					this.cancelhide = false;
				} else {
					this
						.element
						.querySelector("span")
						.innerHTML = "";
				}
			}
		});
	};
}
// Animate Number
class animateNumber {
	constructor(selector) {
		var that = this;
		this.game = {
			score: 0
		};
		this.selector = _q(selector);
		this.value = this.selector.textContent || this.selector.innerText;
		this.plus = "+";
		this.value = this
			.value
			.split("+");
		if (this.value.length <= 1) {
			this.plus = "";
		}
		this.value = this.value[0];
		this.selector.innerHTML = "0" + this.plus;
		this.animate = function () {
			gsap.to(that.game, 5, {
				score: "+=" + that.value,
				roundProps: "score",
				onUpdate: that.updateHandler,
				ease: "expo.out"
			});
		};
		this.updateHandler = function () {
			that.selector.innerHTML = that.game.score + that.plus;
		};
		this.animate();
	}
}
class animateYear {
	constructor(selector, year) {
		var that = this;
		this.game = {
			score: 0
		};
		this.selector = _q(selector);
		this.year__now = (new Date()).getFullYear(),
			this.year__animate = (this.year__now - year);
		this.animate = function () {
			gsap.to(that.game, 5, {
				score: "+=" + that.year__animate,
				roundProps: "score",
				onUpdate: that.updateHandler,
				ease: "expo.out"
			});
		};
		this.updateHandler = function () {
			that.selector.innerHTML = that.game.score + "+";
		};
		this.animate();
	}
}
// Check touchevents
function isTouch() {
	var msTouchEnabled = window.navigator.msMaxTouchPoints;
	var generalTouchEnabled = "ontouchstart" in document.createElement("div");

	return (msTouchEnabled || generalTouchEnabled) ? true : false;
}
// Parallax on mouse move
function parallax(callback) {
	if (isTouch()) {
		// Do something with gyroscpe
	} else {
		window.onmousemove = function (event) {
			var eventDoc, doc, body;

			event = event || window.event; // IE-ism

			// If pageX/Y aren't available and clientX/Y are,
			// calculate pageX/Y - logic taken from jQuery.
			// (This is to support old IE)
			if (event.pageX == null && event.clientX != null) {
				eventDoc = (event.target && event.target.ownerDocument) || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = event.clientX +
					(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
					(doc && doc.clientLeft || body && body.clientLeft || 0);
				event.pageY = event.clientY +
					(doc && doc.scrollTop || body && body.scrollTop || 0) -
					(doc && doc.clientTop || body && body.clientTop || 0);
			}

			if (event.screenX != null) {
				var x = (event.screenX - (window.innerWidth / 2)) / (window.innerWidth / 2) / 10,
					y = (event.screenY - (window.innerHeight / 2)) / (window.innerHeight / 2) / 10;

				callback(x, y);
			}
		}
	}
}
// Photoswipe helper
function photoSwipe(gallerySelector) {
	_qAll(`${gallerySelector} > a`).forEach(el => {
		let size = el.dataset.size.split("x")
		el.dataset.pswpWidth = size[0]
		el.dataset.pswpHeight = size[1]
	})
	const lightbox = new PhotoSwipeLightbox({
		gallery: gallerySelector,
		children: 'a',
		pswpModule: () => import('photoswipe')
	});
	lightbox.init();
}
// Konami Code
function konami() {
	var konami = "38,38,40,40,37,39,37,39,66,65".split(",")
	var keyIndex = 0

	document.onkeydown = function (t) {
		if (konami[keyIndex] == t.keyCode) keyIndex++
		else keyIndex = 0

		if (keyIndex == konami.length && _qAll("#konamicode").length === 0) {
			_q("body").innerHTML += `<div id="konamicode">\
				<iframe title="YouTube video player" class="youtube-player" type="text/html" width="905" height="510" src="https://www.youtube.com/embed/tgbNymZ7vqY?rel=0&autoplay=1" frameborder="0"></iframe>\
			</div>`
			keyIndex = 0
		}

		var el = _q('#konamicode');
		if (el) el.onclick = e => {
			e.preventDefault()
			gsap.to('#konamicode', {
				duration: 1.024,
				ease: "expo.in",
				opacity: 0,
				onComplete: _ => {
					el.parentNode.removeChild(el)
				}
			})
		}
	};
}

export {
	_q,
	_qAll,
	removeClass,
	addClass,
	hasClass,
	nextElementSibling,
	hugeText,
	animateNumber,
	animateYear,
	waitForImg,
	splitText,
	isTouch,
	parallax,
	konami,
	photoSwipe
}