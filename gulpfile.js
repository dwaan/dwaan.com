const
	gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect-php'),
	browserSync = require('browser-sync'),
	autoprefixer = require('autoprefixer'),
	postcss = require('gulp-postcss'),
	cssnano = require('cssnano'),
	htmlmin = require('gulp-htmlmin')
;

function javascript() {
	return gulp.src([
			'js/src/gsap-member/minified/gsap.min.js',
			// 'js/src/gsap-member/minified/ScrollToPlugin.min.js',
			// 'js/src/gsap-member/minified/CustomEase.min.js',
			'node_modules/@barba/core/dist/barba.umd.js',
			// 'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
			// 'node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
			// 'node_modules/photoswipe/dist/photoswipe.min.js',
			// 'node_modules/photoswipe/dist/photoswipe-ui-default.min.js',
			// 'node_modules/tiny-slider/dist/min/tiny-slider.js',
			// 'node_modules/tiny-slider/dist/min/tiny-slider.helper.ie8.js',
			'js/src/helper.js',
			'js/src/main.js'
		])
		.pipe(sourcemaps.init({
			largeFile: true,
			loadMaps: true
		}))
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
			// 'node_modules/photoswipe/dist/photoswipe.css',
			// 'node_modules/photoswipe/dist/default-skin/default-skin.css',
			// 'node_modules/tiny-slider/dist/tiny-slider.css',
			'css/src/main.css',
			'css/src/404.css',
			'css/src/nojs.css',
			'css/src/print.css'
		])
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		// .pipe(postcss([
		// 	autoprefixer(),
		// 	cssnano()
		// ]))
		.pipe(concat("bundle.css"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())
	;
}

function css_vertical() {
	return gulp.src([
			'css/src/vertical-screen.css'
		])
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		// .pipe(postcss([
		// 	autoprefixer(),
		// 	cssnano()
		// ]))
		.pipe(concat("vertical-screen.css"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())
	;
}

function css_horizontal() {
	return gulp.src([
			'css/src/horizontal-screen.css'
		])
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		// .pipe(postcss([
		// 	autoprefixer(),
		// 	cssnano()
		// ]))
		.pipe(concat("horizontal-screen.css"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())
	;
}

function php() {
	return gulp.src(['src/*.php'])
		// .pipe(htmlmin({
		// 	collapseWhitespace: true
		// }))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream())
}

exports.default = function() {
	connect.server({
		hostname: "0.0.0.0",
		port: 8080,
		base: "../",
		router: "../router.php",
		keepalive: true
	}, function () {
		browserSync.init({
			open: false,
			proxy: "localhost:8080/dwaan/"
		});
	});
	gulp.watch('js/src/*.js', { ignoreInitial: false }, javascript);
	gulp.watch(['css/src/main.css', 'css/src/404.css', 'css/src/nojs.css', 'css/src/print.css'], { ignoreInitial: false }, css);
	gulp.watch('css/src/vertical-screen.css', { ignoreInitial: false }, css_vertical);
	gulp.watch('css/src/horizontal-screen.css', { ignoreInitial: false }, css_horizontal);
	gulp.watch('src/*.php', { ignoreInitial: false }, php);
};