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
import svgmin from 'gulp-svgmin'
import gulpMode from 'gulp-mode'

const sass = gulpSass(dartSass)
const mode = gulpMode()
const sitePort = 8080
const siteUrl = `http://localhost:${sitePort}/`

var v1 = {
	javascript() {
		return gulp.src(['src/v1/js/main.js'])
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
			.pipe(gulp.dest('v1/js/'))
			.pipe(browserSync.stream())
	},

	css() {
		return gulp.src([
			'node_modules/normalize.css/normalize.css',
			'node_modules/photoswipe/dist/photoswipe.css',
			'node_modules/tiny-slider/dist/tiny-slider.css',
			'src/v1/css/main.scss'
		])
			.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
			.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
			.pipe(concat("bundle.css"))
			.pipe(mode.development(sourcemaps.write('.')))
			.pipe(gulp.dest('v1/css/'))
			.pipe(browserSync.stream())
	},

	php() {
		return gulp.src(['src/v1/*.php'])
			.pipe(htmlmin({
				collapseWhitespace: true
			}))
			.pipe(gulp.dest('v1/'))
			.pipe(browserSync.stream())
	},

	img() {
		return gulp.src(['src/v1/img/*.jpg', 'src/v1/img/*.png', 'src/v1/img/**/*.jpg', 'src/v1/img/**/*.png'], { encoding: false })
			.pipe(webp())
			.pipe(gulp.dest('v1/img/'))
			.pipe(browserSync.stream())
	},

	svg() {
		return gulp.src(['src/v1/img/*.svg', 'src/v1/img/**/*.svg'], { encoding: false })
			.pipe(svgmin())
			.pipe(gulp.dest('v1/img/'))
			.pipe(browserSync.stream())
	},

	fonts() {
		return gulp.src(['src/v1/fonts/*'], { encoding: false })
			.pipe(gulp.dest('v1/fonts/'))
			.pipe(browserSync.stream())
	},

	resources() {
		return gulp.src(['src/v1/*.webmanifest', 'src/v1/manifest.json', 'src/v1/*.txt', 'src/v1/*.xml', 'src/v1/*.png', 'src/v1/*.jpg', 'src/v1/*.ico', 'src/v1/*.htaccess'], { encoding: false })
			.pipe(gulp.dest('v1/'))
			.pipe(browserSync.stream())
	},

	run() {
		connect.server({
			hostname: "0.0.0.0",
			port: sitePort,
			base: "v1/",
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
		gulp.watch(['src/v1/js/*.js'], { ignoreInitial: false }, v1.javascript)
		gulp.watch(['src/v1/css/*.scss'], { ignoreInitial: false }, v1.css)
		gulp.watch(['src/v1/img/*.jpg', 'src/v1/img/*.png', 'src/v1/img/**/*.jpg', 'src/v1/img/**/*.png'], { ignoreInitial: false }, v1.img)
		gulp.watch(['src/v1/img/*.svg', 'src/v1/img/**/*.svg'], { ignoreInitial: false }, v1.svg)
		gulp.watch(['src/v1/fonts/*'], { ignoreInitial: false }, v1.fonts)
		gulp.watch(['src/v1/*.webmanifest', 'src/v1/manifest.json', 'src/v1/*.txt', 'src/v1/*.xml', 'src/v1/*.png', 'src/v1/*.jpg', 'src/v1/*.ico', 'src/v1/.htaccess'], { ignoreInitial: false }, v1.resources)
		gulp.watch(['src/v1/*.php'], { ignoreInitial: false }, v1.php)

		gulp.watch('gulpfile.js', _ => {
			connect.closeServer()
			process.exit(0)
		})
	}
}

var v2 = {
	js() {
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
			.pipe(gulp.dest('v1/v2/js/'))
			.pipe(browserSync.stream())
	},

	css() {
		return gulp.src(['node_modules/normalize.css/normalize.css', 'src/v2/css/main.scss'])
			.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
			.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
			.pipe(concat("bundle.css"))
			.pipe(mode.development(sourcemaps.write('.')))
			.pipe(gulp.dest('v1/src/v2/css/cache/'))
	},

	fofcss() {
		return gulp.src(['src/v2/css/404.scss'])
			.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
			.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
			.pipe(concat("404.css"))
			.pipe(mode.development(sourcemaps.write('.')))
			.pipe(gulp.dest('v1/src/v2/css/cache/'))
	},

	replurkcss() {
		return gulp.src(['src/v2/css/replurk/main.scss'])
			.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
			.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
			.pipe(concat("plurk.css"))
			.pipe(mode.development(sourcemaps.write('.')))
			.pipe(gulp.dest('v1/src/v2/css/cache/'))
	},

	css_vertical() {
		return gulp.src(['src/v2/css/vertical-screen.scss'])
			.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
			.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
			.pipe(mode.development(sourcemaps.write('.')))
			.pipe(gulp.dest('v1/src/v2/css/cache/'))
	},

	css_horizontal() {
		return gulp.src(['src/v2/css/horizontal-screen.scss'])
			.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
			.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
			.pipe(mode.development(sourcemaps.write('.')))
			.pipe(gulp.dest('v1/src/v2/css/cache/'))
	},

	print() {
		return gulp.src(['src/v2/css/print.scss'])
			.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
			.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
			.pipe(concat("print.css"))
			.pipe(mode.development(sourcemaps.write(".")))
			.pipe(gulp.dest('v1/src/v2/css/cache/'))
	},

	css_prefix() {
		return gulp.src(['src/v2/css/cache/*.css'])
			.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
			.pipe(mode.development(sourcemaps.write('.')))
			.pipe(gulp.dest('v1/v2/css/'))
			.pipe(browserSync.stream())
	},

	php() {
		return gulp.src(['src/v2/*.php'])
			.pipe(htmlmin({
				collapseWhitespace: true
			}))
			.pipe(gulp.dest('v1/v2/'))
			.pipe(browserSync.stream())
	},

	jpg() {
		return gulp.src(['src/v2/img/*.jpg', 'src/v2/img/*/*.jpg'], { encoding: false })
			.pipe(webp())
			.pipe(gulp.dest('v1/v2/img/'))
			.pipe(browserSync.stream())
	},

	png() {
		return gulp.src(['src/v2/img/*.png', 'src/v2/img/*/*.png'], { encoding: false })
			.pipe(webp())
			.pipe(gulp.dest('v1/v2/img/'))
			.pipe(browserSync.stream())
	},

	svg() {
		return gulp.src(['src/v2/img/*.svg', 'src/v2/img/*/*.svg'], { encoding: false })
			.pipe(htmlmin({
				collapseWhitespace: true
			}))
			.pipe(gulp.dest('v1/v2/img/'))
			.pipe(browserSync.stream())
	},

	resources() {
		return gulp.src(['src/v2/fonts/*.*', 'src/v2/*.txt', 'src/v2/*.ico', 'src/v2/*.svg', 'src/v2/*.png', 'src/v2/*.jpg', 'src/v2/*.webmanifest', 'src/v2/*.xml'], { encoding: false })
			.pipe(gulp.dest('v1/v2/'))
	},

	fonts() {
		return gulp.src(['src/v2/fonts/*.*'], { encoding: false })
			.pipe(gulp.dest('v1/v2/fonts/'))
	},

	run() {
		connect.server({
			hostname: "0.0.0.0",
			port: sitePort,
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

		gulp.watch(['src/v2/js/*.js', 'src/v2/js/*/*.js'], { ignoreInitial: false }, v2.js)
		gulp.watch(['src/v2/css/main.scss', 'src/v2/css/global.scss', 'src/v2/css/nojs.scss', 'src/v2/css/dark.scss'], { ignoreInitial: false }, v2.css)
		gulp.watch(['src/v2/css/404.scss'], { ignoreInitial: false }, v2.fofcss)
		gulp.watch(['src/v2/css/replurk/*.scss'], { ignoreInitial: false }, v2.replurkcss)
		gulp.watch(['src/v2/css/vertical-screen.scss'], { ignoreInitial: false }, v2.css_vertical)
		gulp.watch(['src/v2/css/horizontal-screen.scss'], { ignoreInitial: false }, v2.css_horizontal)
		gulp.watch(['src/v2/css/print.scss'], { ignoreInitial: false }, v2.print)
		gulp.watch(['src/v2/css/cache/*.css'], { ignoreInitial: false }, v2.css_prefix)
		gulp.watch(['src/v2/*.php'], { ignoreInitial: false }, v2.php)
		gulp.watch(['src/v2/*.txt', 'src/v2/*.ico', 'src/v2/*.svg', 'src/v2/*.png', 'src/v2/*.jpg', 'src/v2/*.webmanifest', 'src/v2/*.xml'], { ignoreInitial: false }, v2.resources)
		gulp.watch(['src/v2/fonts/*.*'], { ignoreInitial: false }, v2.fonts)

		gulp.watch('gulpfile.js', _ => {
			connect.closeServer()
			process.exit(0)
		})
	}
}

// Version 1
gulp.task('v1image', gulp.series(v1.img, v1.svg))
gulp.task('v1', gulp.series(v1.run))

// Version 2
gulp.task('v2image', gulp.series(v2.jpg, v2.png, v2.svg))
gulp.task('v2', gulp.series(v2.run))

// Default run version 2
gulp.task('default', gulp.series(v2.run))