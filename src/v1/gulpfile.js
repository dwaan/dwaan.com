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

var v1 = {
	javascript() {
		return gulp.src(['../src/v1/js/main.js'])
			.pipe(webpack({
				devtool: 'source-map',
				mode: 'production',
				output: {
					filename: 'bundle.js',
					clean: true
				}
			}))
			.pipe(gulp.dest('js/'))
			.pipe(browserSync.stream())
	},

	css() {
		return gulp.src([
			'node_modules/normalize.css/normalize.css',
			'node_modules/photoswipe/dist/photoswipe.css',
			'node_modules/tiny-slider/dist/tiny-slider.css',
			'../src/v1/css/main.scss'
		])
			.pipe(mode.development(sourcemaps.init({ loadMaps: true })))
			.pipe(sass.sync({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
			.pipe(concat("bundle.css"))
			.pipe(mode.development(sourcemaps.write('.')))
			.pipe(gulp.dest('css'))
	},

	php() {
		return gulp.src(['../src/v1/*.php'])
			.pipe(htmlmin({
				collapseWhitespace: true
			}))
			.pipe(gulp.dest('./'))
			.pipe(browserSync.stream())
	},

	img() {
		return gulp.src([
			'../src/v1/img/*.jpg',
			'../src/v1/img/*.png',
			'../src/v1/img/**/*.jpg',
			'../src/v1/img/**/*.png'
		])
			.pipe(webp())
			.pipe(gulp.dest('img/'))
			.pipe(browserSync.stream())
	},

	svg() {
		return gulp.src(['../src/v1/img/*.svg', '../src/v1/img/**/*.svg'])
			.pipe(svgmin())
			.pipe(gulp.dest('img/'))
			.pipe(browserSync.stream())
	},

	fonts() {
		return gulp.src(['../src/v1/fonts/*'])
			.pipe(gulp.dest('fonts/'))
			.pipe(browserSync.stream())
	},

	resources() {
		return gulp.src(['../src/v1/*.webmanifest', '../src/v1/manifest.json', '../src/v1/*.txt', '../src/v1/*.xml', '../src/v1/*.png', '../src/v1/*.jpg', '../src/v1/*.ico', '../src/v1/*.htaccess'])
			.pipe(gulp.dest('./'))
			.pipe(browserSync.stream())
	},

	run() {
		connect.server({
			hostname: "0.0.0.0",
			port: 8080,
			base: "./",
			router: "../../router.php",
			keepalive: true
		}, function () {
			browserSync.init({
				open: false,
				proxy: "localhost:8080/"
			})
		})
		gulp.watch(['../src/v1/js/*.js'], { ignoreInitial: false }, this.javascript)
		gulp.watch(['../src/v1/css/*.scss'], { ignoreInitial: false }, this.css)
		gulp.watch(['../src/v1/img/*.jpg', '../src/v1/img/*.png', '../src/v1/img/**/*.jpg', '../src/v1/img/**/*.png'], { ignoreInitial: false }, this.img)
		gulp.watch(['../src/v1/img/*.svg', '../src/v1/img/**/*.svg'], { ignoreInitial: false }, this.svg)
		gulp.watch(['../src/v1/fonts/*'], { ignoreInitial: false }, this.fonts)
		gulp.watch(['../src/v1/*.webmanifest', '../src/v1/manifest.json', '../src/v1/*.txt', '../src/v1/*.xml', '../src/v1/*.png', '../src/v1/*.jpg', '../src/v1/*.ico', '../src/v1/.htaccess'], { ignoreInitial: false }, this.resources)
		gulp.watch(['../src/v1/*.php'], { ignoreInitial: false }, this.php)
	}
}

gulp.task('default', gulp.series(v1.run))