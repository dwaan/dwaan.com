const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');

function javascript() {
	return gulp.src([
			'node_modules/barba.js/dist/barba.min.js',
			'node_modules/gsap/dist/gsap.min.js',
			'node_modules/gsap/dist/ScrollToPlugin.min.js',
			'js/gsap-member/minified/CustomEase.min.js',
			'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
			'node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
			'node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js',
			'node_modules/photoswipe/dist/photoswipe.min.js',
			'node_modules/photoswipe/dist/photoswipe-ui-default.min.js',
			'node_modules/tiny-slider/dist/min/tiny-slider.js',
			'node_modules/tiny-slider/dist/min/tiny-slider.helper.ie8.js',
			'js/helper.js',
			'js/main.js'
		])
		// .pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat("bundle.js"))
		// .pipe(sourcemaps.write("."))
		.pipe(gulp.dest('js/'))
	    .pipe(livereload())
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
		// .pipe(sourcemaps.init())
		.pipe(cleanCSS())
		.pipe(concat("bundle.css"))
		// .pipe(sourcemaps.write("."))
		.pipe(gulp.dest('css'))
	    .pipe(livereload())
	;
}

function php() {
	return gulp.src('*.php')
	    .pipe(livereload())
}

exports.default = function() {
	livereload.listen({ port: 35729 });
	gulp.watch('*.php', { ignoreInitial: false }, php);
	gulp.watch('css/main.css', { ignoreInitial: false }, css);
	gulp.watch('js/main.js', { ignoreInitial: false }, javascript);
};