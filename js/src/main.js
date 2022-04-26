var debug = false;

var gToArray = gsap.utils.toArray;
var gRandom = gsap.utils.random;


// Logo SVG
var logosvg = _q(".logo").innerHTML;
addClass(_q("html"), "snap");


////////// Initial

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Default barba hooks
barba.hooks.before(function () {
	api.abort();
	return true;
});
barba.hooks.beforeEnter(function (data) {
	var namespace = data.next.namespace;

	// Destroy prev scroll
	scroll.destroy();
	window.scrollTo(0, 0);

	if (namespace != "replurk2020" && namespace != "replurk2021") header.arrow(data.next.container);

});
barba.hooks.afterEnter(function (data) {
	// Read more
	data.next.container.querySelectorAll("a.scrollto").forEach(function (el) {
		scrollto(el);
	});
});

// Initialized barba.js
barba.init({
	debug: false,
	transitions: [transition_once, transition_home_to_detail, transition_home_to_me, transition_home_to_hi, transition_hi_to_home, transition_from_lost, transition_to_lost, transition_from_plurk],
	views: [homeview, detailview, meview, hiview, lostview, replurk2020view, replurk2021view]
});