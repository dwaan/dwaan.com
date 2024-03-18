const
	gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect-php'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass')(require('sass')),
	htmlmin = require('gulp-htmlmin'),
	webpack = require('webpack-stream'),
	webp = require('gulp-webp'),
	mode = require('gulp-mode')();

const siteUrl = 'http://localhost:8080/';

function js() {
	return gulp.src(['src/js/main.js'])
		.pipe(mode.development(webpack({
			devtool: 'source-map',
			mode: 'production',
			output: {
				filename: 'bundle.js',
				clean: true
			}
		})))
		.pipe(mode.production(webpack({
			mode: 'production',
			output: {
				filename: 'bundle.js',
				clean: true
			}
		})))
		.pipe(gulp.dest('js/'))
		.pipe(browserSync.stream());
}

function css() {
	return gulp.src(['node_modules/normalize.css/normalize.css', 'src/css/main.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(concat("bundle.css"))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/css/cache/'));
}

function css_vertical() {
	return gulp.src(['src/css/vertical-screen.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/css/cache/'));
}

function css_horizontal() {
	return gulp.src(['src/css/horizontal-screen.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/css/cache/'));
}

function print() {
	return gulp.src([
		'src/css/print.scss'
	])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(concat("print.css"))
		.pipe(mode.development(sourcemaps.write(".")))
		.pipe(gulp.dest('src/css/cache/'));
}

function css_prefix() {
	return gulp.src(['src/css/cache/*.css'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('css/'))
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

function jpg() {
	return gulp.src([
		'src/img/*.jpg',
		'src/img/*/*.jpg'
	])
		.pipe(webp())
		.pipe(gulp.dest('img/'))
		.pipe(browserSync.stream());
}

function png() {
	return gulp.src([
		'src/img/*.png',
		'src/img/*/*.png'
	])
		.pipe(webp())
		.pipe(gulp.dest('img/'))
		.pipe(browserSync.stream());
}

function svg() {
	return gulp.src(['src/img/*.svg', 'src/img/*/*.svg'])
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('img/'))
		.pipe(browserSync.stream());
}

exports.default = function () {
	connect.server({
		hostname: "0.0.0.0",
		port: 8080,
		base: "./",
		router: "../router.php",
		keepalive: true,
		stdio: "ignore",
		debug: false
	}, function () {
		browserSync.init({
			open: false,
			proxy: siteUrl
		});
	});
	gulp.watch('gulpfile.js', process.exit);

	gulp.watch(['src/js/*.js', 'src/js/*/*.js'], { ignoreInitial: false }, js);
	gulp.watch(['src/css/main.scss', 'src/css/404.scss', 'src/css/nojs.scss', 'src/css/plurk.scss', 'src/css/dark.scss'], { ignoreInitial: false }, css);
	gulp.watch(['src/css/vertical-screen.scss'], { ignoreInitial: false }, css_vertical);
	gulp.watch(['src/css/horizontal-screen.scss'], { ignoreInitial: false }, css_horizontal);
	gulp.watch(['src/css/print.scss'], { ignoreInitial: false }, print);
	gulp.watch(['src/css/cache/*.css'], { ignoreInitial: false }, css_prefix);
	gulp.watch(['src/img/*.jpg', 'src/img/*/*.jpg'], { ignoreInitial: false }, jpg);
	gulp.watch(['src/img/*.png', 'src/img/*/*.png'], { ignoreInitial: false }, png);
	gulp.watch(['src/img/*.svg', 'src/img/*/*.svg'], { ignoreInitial: false }, svg);
	gulp.watch(['src/*.php'], { ignoreInitial: false }, php);
}