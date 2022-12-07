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
	svgmin = require('gulp-svgmin'),
	autoprefixer = require('gulp-autoprefixer');


function js() {
	return gulp.src(['src/js/main.js'])
		.pipe(webpack({
			devtool: 'source-map',
			mode: 'production',
			output: {
				filename: 'bundle.js',
				clean: true
			}
		}))
		.pipe(gulp.dest('js/'))
		.pipe(browserSync.stream());
}

function css() {
	return gulp.src(['node_modules/normalize.css/normalize.css', 'src/css/main.scss'])
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(concat("bundle.css"))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('src/css/cache/'));
}

function css_vertical() {
	return gulp.src(['src/css/vertical-screen.scss'])
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('src/css/cache/'));
}

function css_horizontal() {
	return gulp.src(['src/css/horizontal-screen.scss'])
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('src/css/cache/'));
}

function print() {
	return gulp.src([
		'src/css/print.scss'
	])
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(concat("print.css"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('src/css/cache/'));
}

function css_prefix() {
	return gulp.src(['src/css/cache/*.css'])
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
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
		router: "router.php",
		keepalive: true,
		stdio: "ignore",
		debug: false
	}, function () {
		browserSync.init({
			open: false,
			proxy: "localhost:8080/dwaan/"
		});
	});
	gulp.watch('gulpfile.js', process.exit);
	gulp.watch(['src/js/*.js', 'src/js/*/*.js'], { ignoreInitial: false }, js);
	gulp.watch(['src/css/main.scss', 'src/css/404.scss', 'src/css/nojs.scss', 'src/css/plurk.scss', 'src/css/dark.scss'], { ignoreInitial: false }, css);
	gulp.watch(['src/css/vertical-screen.scss'], { ignoreInitial: false }, css_vertical);
	gulp.watch(['src/css/horizontal-screen.scss'], { ignoreInitial: false }, css_horizontal);
	gulp.watch(['src/css/print.scss'], { ignoreInitial: false }, print);
	gulp.watch(['src/css/cache/*.css'], { ignoreInitial: false }, css_prefix);
	gulp.watch(['src/img/*.jpg', 'src/img/*.png', 'src/img/*/*.jpg', 'src/img/*/*.png'], { ignoreInitial: false }, img);
	gulp.watch(['src/img/*.svg', 'src/img/*/*.svg'], { ignoreInitial: false }, svg);
	gulp.watch(['src/*.php'], { ignoreInitial: false }, php);
}