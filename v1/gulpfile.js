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
	htmlmin = require('gulp-htmlmin'),
	webp = require('gulp-webp'),
	svgmin = require('gulp-svgmin');

function javascript() {
	return gulp.src([
		'node_modules/barba.js/dist/barba.min.js',
		'js/src/gsap-member/minified/gsap.min.js',
		'js/src/gsap-member/minified/ScrollToPlugin.min.js',
		'js/src/gsap-member/minified/CustomEase.min.js',
		'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
		'node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
		'node_modules/photoswipe/dist/photoswipe.min.js',
		'node_modules/photoswipe/dist/photoswipe-ui-default.min.js',
		'node_modules/tiny-slider/dist/min/tiny-slider.js',
		'node_modules/tiny-slider/dist/min/tiny-slider.helper.ie8.js',
		'js/src/helper.js',
		'js/src/main.js'
	])
		.pipe(sourcemaps.init({
			largeFile: true,
			loadMaps: true
		}))
		.pipe(uglify())
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
		'css/src/main.css',
		'css/src/404.css',
		'css/src/nojs.css',
		'css/src/print.css'
	])
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(postcss([
			autoprefixer(),
			cssnano()
		]))
		.pipe(concat("bundle.css"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())
		;
}

function php() {
	return gulp.src(['src/*.php'])
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream())
}

function img() {
	return gulp.src([
		'src/img/*.jpg',
		'src/img/*.png',
		'src/img/*/*.jpg',
		'src/img/*/*.png',
		'src/img/*/*/*.jpg',
		'src/img/*/*/*.png',
		'src/img/*/*/*/*.jpg',
		'src/img/*/*/*/*.png'
	])
		.pipe(webp())
		.pipe(gulp.dest('img/'))
		.pipe(browserSync.stream());
}

function svg() {
	return gulp.src(['src/img/*.svg', 'src/img/*/*.svg'])
		.pipe(svgmin())
		.pipe(gulp.dest('img/'))
		.pipe(browserSync.stream());
}

exports.default = function () {
	connect.server({
		hostname: "0.0.0.0",
		port: 8081,
		base: "./",
		router: "../../router.php",
		keepalive: true
	}, function () {
		browserSync.init({
			open: true,
			proxy: "localhost:8081/"
		});
	});
	gulp.watch('js/src/*.js', { ignoreInitial: false }, javascript);
	gulp.watch('css/src/*.css', { ignoreInitial: false }, css);
	gulp.watch(['src/img/*.jpg', 'src/img/*.png', 'src/img/*/*.jpg', 'src/img/*/*.png', 'src/img/*/*/*.jpg', 'src/img/*/*/*.png', , 'src/img/*/*/*/*.jpg', 'src/img/*/*/*/*.png'], { ignoreInitial: false }, img);
	gulp.watch(['src/img/*.svg', 'src/img/*/*.svg'], { ignoreInitial: false }, svg);
	gulp.watch('src/*.php', { ignoreInitial: false }, php);
};