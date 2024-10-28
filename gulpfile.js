import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import connect from 'gulp-connect-php'
import browserSync from 'browser-sync'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import htmlmin from 'gulp-htmlmin'
import webpack from 'webpack-stream'
import webp from 'gulp-webp'
import gulpMode from 'gulp-mode'

const sass = gulpSass(dartSass)
const mode = gulpMode()
const siteUrl = 'http://localhost:8080/'

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
		.pipe(gulp.dest('v2/js/'))
		.pipe(browserSync.stream())
}

function css() {
	return gulp.src(['node_modules/normalize.css/normalize.css', 'src/css/main.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(concat("bundle.css"))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/css/cache/'))
}

function fofcss() {
	return gulp.src(['src/css/404.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(concat("404.css"))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/css/cache/'))
}

function plurkcss() {
	return gulp.src(['src/css/plurk.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(concat("plurk.css"))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/css/cache/'))
}

function css_vertical() {
	return gulp.src(['src/css/vertical-screen.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/css/cache/'))
}

function css_horizontal() {
	return gulp.src(['src/css/horizontal-screen.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/css/cache/'))
}

function print() {
	return gulp.src(['src/css/print.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(concat("print.css"))
		.pipe(mode.development(sourcemaps.write(".")))
		.pipe(gulp.dest('src/css/cache/'))
}

function css_prefix() {
	return gulp.src(['src/css/cache/*.css'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('v2/css/'))
		.pipe(browserSync.stream())
}

function php() {
	return gulp.src(['src/*.php'])
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('v2/'))
		.pipe(browserSync.stream())
}

function jpg() {
	return gulp.src(['src/img/*.jpg', 'src/img/*/*.jpg'], { encoding: false })
		.pipe(webp())
		.pipe(gulp.dest('v2/img/'))
		.pipe(browserSync.stream())
}

function png() {
	return gulp.src(['src/img/*.png', 'src/img/*/*.png'], { encoding: false })
		.pipe(webp())
		.pipe(gulp.dest('v2/img/'))
		.pipe(browserSync.stream())
}

function svg() {
	return gulp.src(['src/img/*.svg', 'src/img/*/*.svg'], { encoding: false })
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('v2/img/'))
		.pipe(browserSync.stream())
}

function resources() {
	return gulp.src(['src/*.ico', 'src/*.svg', 'src/*.png', 'src/*.jpg', 'src/*.webmanifest', 'src/*.xml'], { encoding: false })
		.pipe(gulp.dest('v2/'))
}

function run() {
	connect.server({
		port: 8080,
		base: "v2/",
		router: "../router.php",
		keepalive: true,
		stdio: "ignore",
		debug: false
	}, function () {
		browserSync.init({
			open: false,
			proxy: siteUrl
		})
	})

	gulp.watch(['src/js/*.js', 'src/js/*/*.js'], { ignoreInitial: false }, js)
	gulp.watch(['src/css/main.scss', 'src/css/global.scss', 'src/css/nojs.scss', 'src/css/dark.scss'], { ignoreInitial: false }, css)
	gulp.watch(['src/css/404.scss'], { ignoreInitial: false }, fofcss)
	gulp.watch(['src/css/plurk.scss'], { ignoreInitial: false }, plurkcss)
	gulp.watch(['src/css/vertical-screen.scss'], { ignoreInitial: false }, css_vertical)
	gulp.watch(['src/css/horizontal-screen.scss'], { ignoreInitial: false }, css_horizontal)
	gulp.watch(['src/css/print.scss'], { ignoreInitial: false }, print)
	gulp.watch(['src/css/cache/*.css'], { ignoreInitial: false }, css_prefix)
	gulp.watch(['src/*.php'], { ignoreInitial: false }, php)
	gulp.watch(['src/*.ico', 'src/*.svg', 'src/*.png', 'src/*.jpg', 'src/*.webmanifest', 'src/*.xml'], { ignoreInitial: false }, resources)

	gulp.watch('gulpfile.js', _ => {
		connect.closeServer()
		process.exit(0)
	})
}

gulp.task('image', gulp.series(jpg, png, svg))
gulp.task('default', gulp.series(run))