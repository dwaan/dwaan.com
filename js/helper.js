////////////// Helper functions
//
// _q(element) _qAll(elements) removeClass(element, className) addClass(element,
// className) nextElementSibling(element) getRandomInt(min, max)
// roundToPrecision(x, precision) parseStrToFloat(string_to_convert)
var _q = function (argument) {
	return document.querySelector(argument)
};
var _qAll = function (argument) {
	return document.querySelectorAll(argument)
};
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
	if (el.classList) {
		el
			.classList
			.add(className)
	} else {
		var current = el.className,
			found = false;
		var all = current.split(' ');
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
function nextElementSibling(el) {
	do {
		el = el.nextSibling
	} while (el && el.nodeType !== 1);
	return el
}
function getRandomInt(min, max) {
	var temp;
	if (min > max) {
		temp = min;
		min = max;
		max = temp
	}
	temp = (max + 1) - min;
	return Math.floor(Math.random() * Math.floor(temp)) + min
}
function roundToPrecision(x, precision) {
	var y = +x + (precision === undefined
		? 0.5
		: precision / 2);
	return y - (y % (precision === undefined
		? 1
		: + precision))
}
function parseStrToFloat(string_to_convert) {
	if (typeof string_to_convert === 'string' || string_to_convert instanceof String) {
		string_to_convert = string_to_convert.trim()
	}
	return parseFloat(string_to_convert)
}(function () {
	var method;
	var noop = function () {};
	var methods = [
		'assert',
		'clear',
		'count',
		'debug',
		'dir',
		'dirxml',
		'error',
		'exception',
		'group',
		'groupCollapsed',
		'groupEnd',
		'info',
		'log',
		'markTimeline',
		'profile',
		'profileEnd',
		'table',
		'time',
		'timeEnd',
		'timeline',
		'timelineEnd',
		'timeStamp',
		'trace',
		'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});
	while (length--) {
		method = methods[length];
		if (!console[method]) {
			console[method] = noop
		}
	}
}());
// Add new function for image
Image.prototype.load = function (index, url, callback, bytes) {
	var thisImg = this;
	var xmlHTTP = new XMLHttpRequest();
	thisImg.src = "";
	xmlHTTP.open('GET', url, true);
	xmlHTTP.responseType = 'arraybuffer';
	xmlHTTP.onload = function (e) {
		var blob = new Blob([this.response]);
		thisImg.src = window
			.URL
			.createObjectURL(blob)
	};
	xmlHTTP.onprogress = function (e) {
		thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
		if (thisImg.completedPercentage >= 100) {
			thisImg.src = url
		}
		callback(index, url, thisImg.completedPercentage, e.total)
	};
	xmlHTTP.onloadstart = function () {
		thisImg.completedPercentage = 0
	};
	xmlHTTP.send()
};
Image.prototype.completedPercentage = 0;
////////////// Konami Code
var konami = "38,38,40,40,37,39,37,39,66,65".split(","),
	keyIndex = 0;
document.onkeydown = function (t) {
	konami[keyIndex] == t.keyCode
		? keyIndex++
		: keyIndex = 0,
	keyIndex == konami.length && (0 === _qAll("#konamicode").length && (_q("body").innerHTML += '<div id="konamicode"><iframe title="YouTube video player" class="youtube-player"' +
			' type="text/html" width="905" height="510" src="https://www.youtube.com/embed/tg' +
			'bNymZ7vqY?rel=0&autoplay=1" frameborder="0"></iframe></div>'), keyIndex = 0);
	if (_q('#konamicode') != undefined) {
		elem = _q('#konamicode');
		elem.onclick = function (e) {
			gsap.to('#konamicode', {
				duration: 1.024,
				ease: "expo.in",
				opacity: 0,
				onComplete: function () {
					elem
						.parentNode
						.removeChild(elem)
				}
			})
		}
	}
};