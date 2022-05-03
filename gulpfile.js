const
	gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	named = require('vinyl-named'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect-php'),
	browserSync = require('browser-sync'),
	autoprefixer = require('autoprefixer'),
	postcss = require('gulp-postcss'),
	cssnano = require('cssnano'),
	htmlmin = require('gulp-htmlmin'),
	through = require('through2'),
	webpack = require('webpack-stream'),
	webp = require('gulp-webp'),
	svgmin = require('gulp-svgmin');

function javascript() {
	return gulp.src(['src/js/main.js'])
		.pipe(named())
		.pipe(webpack({
			devtool: 'source-map',
			mode: 'development'
		}))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(through.obj(function (file, _, cb) {
			const isSourceMap = /\.map$/.test(file.path);
			if (!isSourceMap) this.push(file);
			cb();
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./js/'))
		.pipe(browserSync.stream());
}

function css() {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		'src/css/main.css',
		'src/css/404.css',
		'src/css/nojs.css',
		'src/css/print.css'
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
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.stream());
}

function css_vertical() {
	return gulp.src([
		'src/css/vertical-screen.css'
	])
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(postcss([
			autoprefixer(),
			cssnano()
		]))
		.pipe(concat("vertical-screen.css"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.stream());
}

function css_horizontal() {
	return gulp.src([
		'src/css/horizontal-screen.css'
	])
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(postcss([
			autoprefixer(),
			cssnano()
		]))
		.pipe(concat("horizontal-screen.css"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.stream());
}

function php() {
	return gulp.src(['src/*.php'])
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream());
}

function img() {
	return gulp.src([
		'src/img/*.jpg',
		'src/img/*.png',
		'src/img/*/*.jpg',
		'src/img/*/*.png'
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
		port: 8080,
		base: "../",
		router: "../router.php",
		keepalive: true
	}, function () {
		browserSync.init({
			open: true,
			proxy: "localhost:8080/dwaan/"
		});
	});
	gulp.watch(['src/js/*.js', 'src/js/*/*.js'], { ignoreInitial: false }, javascript);
	gulp.watch(['src/css/*.css', 'src/css/404.css', 'src/css/nojs.css', 'src/css/print.css'], { ignoreInitial: false }, css);
	gulp.watch('src/css/vertical-screen.css', { ignoreInitial: false }, css_vertical);
	gulp.watch('src/css/horizontal-screen.css', { ignoreInitial: false }, css_horizontal);
	gulp.watch(['src/img/*.jpg', 'src/img/*.png', 'src/img/*/*.jpg', 'src/img/*/*.png'], { ignoreInitial: false }, img);
	gulp.watch(['src/img/*.svg', 'src/img/*/*.svg'], { ignoreInitial: false }, svg);
	gulp.watch('src/*.php', { ignoreInitial: false }, php);
};