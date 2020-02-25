const
	gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect-php'),
	browserSync = require('browser-sync')
;

function javascript() {
	return gulp.src([
			'node_modules/barba.js/dist/barba.min.js',
			// 'node_modules/gsap/dist/gsap.min.js',
			// 'node_modules/gsap/dist/ScrollToPlugin.min.js',
			'js/gsap-member/minified/gsap.min.js',
			'js/gsap-member/minified/ScrollToPlugin.min.js',
			'js/gsap-member/minified/CustomEase.min.js',
			// 'js/gsap-member/minified/TextPlugin.min.js',
			'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
			'node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
			// 'node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js',
			'node_modules/photoswipe/dist/photoswipe.min.js',
			'node_modules/photoswipe/dist/photoswipe-ui-default.min.js',
			'node_modules/tiny-slider/dist/min/tiny-slider.js',
			'node_modules/tiny-slider/dist/min/tiny-slider.helper.ie8.js',
			'js/helper.js',
			'js/main.js'
		])
		.pipe(sourcemaps.init())
		// .pipe(uglify())
		.pipe(concat("bundle.js"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('js/'))
		.pipe(browserSync.stream())
	;
}

function css() {
	return gulp.src([
			'node_modules/normalize.css/normalize.css',
			'node_modules/photoswipe/dist/photoswipe.css',
			'node_modules/photoswipe/dist/default-skin/default-skin.css',
			'node_modules/tiny-slider/dist/tiny-slider.css',
			'css/main.css',
			'css/404.css',
			'css/nojs.css',
			'css/print.css'
		])
		.pipe(sourcemaps.init())
		// .pipe(cleanCSS())
		.pipe(concat("bundle.css"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())
	;
}

function php() {
	return gulp.src('**/*.php')
		.pipe(browserSync.stream())
}

exports.default = function() {
	connect.server({
		hostname: "themilkyway.local",
		port: 8080,
		base: "../",
		router: "./router.php",
		keepalive: true
	}, function () {
		browserSync.init({
			server: false,
			open: false,
			proxy: "themilkyway.local:8080/dwaan/"
		});
	});
	gulp.watch('**/*.php', { ignoreInitial: false }, php);
	gulp.watch('css/main.css', { ignoreInitial: false }, css);
	gulp.watch('js/main.js', { ignoreInitial: false }, javascript);
};