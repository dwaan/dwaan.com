////////////// Helper functions
//
// _q(element
// _qAll(elements
// removeClass(element, className
// addClass(element,
// className
// nextElementSibling(element
// getRandomInt(min, max)
// roundToPrecision(x, precision
// parseStrToFloat(string_to_convert)
function _q (argument) {
	return document.querySelector(argument)
}
function _qAll (argument) {
	return document.querySelectorAll(argument)
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
}
// Prevent error in older browser for console
(function () {
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
var ajaxImage = Image.prototype.load = function (index, url, callback, bytes) {
	var thisImg = this;
	var xmlHTTP = new XMLHttpRequest();

	// If index is img element
	if(isNaN(index)) {
		thisImg.completedPercentage = 0;
		thisImg = index;
	}

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
// Splitting text
var splitText = function (el) {
	var split;
	split = el.innerText.split(" ");
	el.innerHTML = "";
	for (var i = 0; i < split.length; i++) {
		split[i] = "<div class='text" + i + "'>" + split[i] + "</div> ";
		el.innerHTML += split[i];
	}
}
////////////////////// Huge text animation
var hugeText = function (el) {
	this.element = _q(el);
	this.element.innerHTML = "<span></span>";
	this.cancelhide = false;
	this.onshow = false;
	this.tween = null;

	gsap.set(this.element.children, {yPercent: 100});
	gsap.fromTo(this.element.children, {
		xPercent: -25
	}, {
		duration: 10,
		repeat: -1,
		ease: "linear",
		xPercent: -75
	});

	this.show = function (text) {
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
	}

	this.hide = function () {
		var that = this;
		this.tween = gsap.to(this.element.children, {
			duration: .512,
			ease: "expo",
			yPercent: 100,
			onComplete: function () {
				if (that.cancelhide) {
					that.cancelhide = false;
				} else {
					that
						.element
						.querySelector("span")
						.innerHTML = "";
				}
			}
		});
	}

	return this;
}
///////////////// Animate Number
function animateNumber(selector) {
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
		this.plus = ""
	}
	this.value = this.value[0];
	this.selector.innerHTML = "0" + this.plus;
	this.animate = function () {
		gsap.to(that.game, 5, {
			score: "+=" + that.value,
			roundProps: "score",
			onUpdate: that.updateHandler,
			ease: "expo.out"
		})
	};
	this.updateHandler = function () {
		that.selector.innerHTML = that.game.score + that.plus
	};
	this.animate()
}
function animateYear(selector, year) {
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
		})
	};
	this.updateHandler = function () {
		that.selector.innerHTML = that.game.score + "+"
	};
	this.animate()
}
// Photoswipe helper
var initPhotoSwipeFromDOM = function (gallerySelector) {
	// parse slide data (url, title, size ...) from DOM elements (children of
	// gallerySelector)
	var parseThumbnailElements = function (el) {
		var thumbElements = el.childNodes,
			numNodes = thumbElements.length,
			items = [],
			figureEl,
			linkEl,
			size,
			item;

		for (var i = 0; i < numNodes; i++) {

			figureEl = thumbElements[i]; // <figure> element

			// include only element nodes
			if (figureEl.nodeType !== 1) {
				continue;
			}

			// linkEl = figureEl.children[0]; // <a> element
			linkEl = figureEl; // <a> element

			size = linkEl
				.getAttribute('data-size')
				.split('x');

			// create slide object
			item = {
				src: linkEl.getAttribute('href'),
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10)
			};

			if (figureEl.children.length > 1) {
				// <figcaption> content
				item.title = figureEl.children[1].innerHTML;
			}

			if (linkEl.children.length > 0) {
				// <img> thumbnail element, retrieving thumbnail url
				item.msrc = linkEl
					.children[0]
					.getAttribute('src');
			}

			item.el = figureEl; // save link to element for getThumbBoundsFn
			items.push(item);
		}

		return items;
	};

	// find nearest parent element
	var closest = function closest(el, fn) {
		return el && (fn(el)
			? el
			: closest(el.parentNode, fn));
	};

	// triggers when user clicks on thumbnail
	var onThumbnailsClick = function (e) {
		e = e || window.event;
		e.preventDefault
			? e.preventDefault()
			: e.returnValue = false;

		var eTarget = e.target || e.srcElement;

		// find root element of slide
		var clickedListItem = closest(eTarget, function (el) {
			return (el.tagName && el.tagName.toUpperCase() === 'A');
		});

		if (!clickedListItem) {
			return;
		}

		// find index of clicked item by looping through all child nodes alternatively,
		// you may define index via data- attribute
		var clickedGallery = clickedListItem.parentNode,
			childNodes = clickedListItem.parentNode.childNodes,
			numChildNodes = childNodes.length,
			nodeIndex = 0,
			index;

		for (var i = 0; i < numChildNodes; i++) {
			if (childNodes[i].nodeType !== 1) {
				continue;
			}

			if (childNodes[i] === clickedListItem) {
				index = nodeIndex;
				break;
			}
			nodeIndex++;
		}

		if (index >= 0) {
			// open PhotoSwipe if valid index found
			openPhotoSwipe(index, clickedGallery);
		}
		return false;
	};

	// parse picture index and gallery index from URL (#&pid=1&gid=2)
	var photoswipeParseHash = function () {
		var hash = window
				.location
				.hash
				.substring(1),
			params = {};

		if (hash.length < 5) {
			return params;
		}

		var vars = hash.split('&');
		for (var i = 0; i < vars.length; i++) {
			if (!vars[i]) {
				continue;
			}
			var pair = vars[i].split('=');
			if (pair.length < 2) {
				continue;
			}
			params[pair[0]] = pair[1];
		}

		if (params.gid) {
			params.gid = parseInt(params.gid, 10);
		}

		return params;
	};

	var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
		var pswpElement = _qAll('.pswp')[0],
			gallery,
			options,
			items;

		items = parseThumbnailElements(galleryElement);

		// define options (if needed)
		options = {

			// define gallery index (for URL)
			galleryUID: galleryElement.getAttribute('data-pswp-uid'),
			bgOpacity: 1,
			preload: [
				1, 3
			],

			getThumbBoundsFn: function (index) {
				// See Options -> getThumbBoundsFn section of documentation for more info
				var thumbnail = items[index]
						.el
						.getElementsByTagName('img')[0], // find thumbnail
					pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
					rect = thumbnail.getBoundingClientRect();

				return {
					x: rect.left,
					y: rect.top + pageYScroll,
					w: rect.width
				};
			}

		};

		// PhotoSwipe opened from URL
		if (fromURL) {
			if (options.galleryPIDs) {
				// parse real index when custom PIDs are used
				// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
				for (var j = 0; j < items.length; j++) {
					if (items[j].pid == index) {
						options.index = j;
						break;
					}
				}
			} else {
				// in URL indexes start from 1
				options.index = parseInt(index, 10) - 1;
			}
		} else {
			options.index = parseInt(index, 10);
		}

		// exit if index not found
		if (isNaN(options.index)) return;

		if (disableAnimation) options.showAnimationDuration = 0;

		// Pass data to PhotoSwipe and initialize it
		gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	};

	// loop through all gallery elements and bind events
	var galleryElements = _qAll(gallerySelector);

	for (var i = 0, l = galleryElements.length; i < l; i++) {
		galleryElements[i].setAttribute('data-pswp-uid', i + 1);
		galleryElements[i].onclick = onThumbnailsClick;
	}

	// Parse URL and open gallery if it contains #&pid=3&gid=1
	var hashData = photoswipeParseHash();
	if (hashData.pid && hashData.gid) {
		openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
	}
}
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