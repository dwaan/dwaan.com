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
	return gulp.src(['src/v2/js/main.js'])
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
	return gulp.src(['node_modules/normalize.css/normalize.css', 'src/v2/css/main.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
		.pipe(concat("bundle.css"))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/v2/css/cache/'))
}

function fofcss() {
	return gulp.src(['src/v2/css/404.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
		.pipe(concat("404.css"))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/v2/css/cache/'))
}

function replurkcss() {
	return gulp.src(['src/v2/css/replurk/main.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
		.pipe(concat("plurk.css"))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/v2/css/cache/'))
}

function css_vertical() {
	return gulp.src(['src/v2/css/vertical-screen.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/v2/css/cache/'))
}

function css_horizontal() {
	return gulp.src(['src/v2/css/horizontal-screen.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('src/v2/css/cache/'))
}

function print() {
	return gulp.src(['src/v2/css/print.scss'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
		.pipe(concat("print.css"))
		.pipe(mode.development(sourcemaps.write(".")))
		.pipe(gulp.dest('src/v2/css/cache/'))
}

function css_prefix() {
	return gulp.src(['src/v2/css/cache/*.css'])
		.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
		.pipe(mode.development(sourcemaps.write('.')))
		.pipe(gulp.dest('v2/css/'))
		.pipe(browserSync.stream())
}

function php() {
	return gulp.src(['src/v2/*.php'])
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('v2/'))
		.pipe(browserSync.stream())
}

function jpg() {
	return gulp.src(['src/v2/img/*.jpg', 'src/v2/img/*/*.jpg'], { encoding: false })
		.pipe(webp())
		.pipe(gulp.dest('v2/img/'))
		.pipe(browserSync.stream())
}

function png() {
	return gulp.src(['src/v2/img/*.png', 'src/v2/img/*/*.png'], { encoding: false })
		.pipe(webp())
		.pipe(gulp.dest('v2/img/'))
		.pipe(browserSync.stream())
}

function svg() {
	return gulp.src(['src/v2/img/*.svg', 'src/v2/img/*/*.svg'], { encoding: false })
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('v2/img/'))
		.pipe(browserSync.stream())
}

function resources() {
	return gulp.src(['src/v2/fonts/*.*', 'src/v2/*.txt', 'src/v2/*.ico', 'src/v2/*.svg', 'src/v2/*.png', 'src/v2/*.jpg', 'src/v2/*.webmanifest', 'src/v2/*.xml'], { encoding: false })
		.pipe(gulp.dest('v2/'))
}

function fonts() {
	return gulp.src(['src/v2/fonts/*.*'], { encoding: false })
		.pipe(gulp.dest('v2/fonts/'))
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

	gulp.watch(['src/v2/js/*.js', 'src/v2/js/*/*.js'], { ignoreInitial: false }, js)
	gulp.watch(['src/v2/css/main.scss', 'src/v2/css/global.scss', 'src/v2/css/nojs.scss', 'src/v2/css/dark.scss'], { ignoreInitial: false }, css)
	gulp.watch(['src/v2/css/404.scss'], { ignoreInitial: false }, fofcss)
	gulp.watch(['src/v2/css/replurk/*.scss'], { ignoreInitial: false }, replurkcss)
	gulp.watch(['src/v2/css/vertical-screen.scss'], { ignoreInitial: false }, css_vertical)
	gulp.watch(['src/v2/css/horizontal-screen.scss'], { ignoreInitial: false }, css_horizontal)
	gulp.watch(['src/v2/css/print.scss'], { ignoreInitial: false }, print)
	gulp.watch(['src/v2/css/cache/*.css'], { ignoreInitial: false }, css_prefix)
	gulp.watch(['src/v2/*.php'], { ignoreInitial: false }, php)
	gulp.watch(['src/v2/*.txt', 'src/v2/*.ico', 'src/v2/*.svg', 'src/v2/*.png', 'src/v2/*.jpg', 'src/v2/*.webmanifest', 'src/v2/*.xml'], { ignoreInitial: false }, resources)
	gulp.watch(['src/v2/fonts/*.*'], { ignoreInitial: false }, fonts)

	gulp.watch('gulpfile.js', _ => {
		connect.closeServer()
		process.exit(0)
	})
}

gulp.task('image', gulp.series(jpg, png, svg))
gulp.task('default', gulp.series(run))