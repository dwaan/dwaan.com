
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import connect from 'gulp-connect-php'
import browserSync from 'browser-sync'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import htmlmin from 'gulp-htmlmin'
import webp from 'gulp-webp'
import svgmin from 'gulp-svgmin'
import webpack from 'webpack-stream'

function javascript() {
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
		.pipe(browserSync.stream())
}

function css() {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/photoswipe/dist/photoswipe.css',
		'node_modules/tiny-slider/dist/tiny-slider.css',
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
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())

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
		'src/img/**/*.jpg',
		'src/img/**/*.png'
	])
		.pipe(webp())
		.pipe(gulp.dest('img/'))
		.pipe(browserSync.stream())
}

function svg() {
	return gulp.src(['src/img/*.svg', 'src/img/**/*.svg'])
		.pipe(svgmin())
		.pipe(gulp.dest('img/'))
		.pipe(browserSync.stream())
}

function fonts() {
	return gulp.src(['src/fonts/*'])
		.pipe(gulp.dest('fonts/'))
		.pipe(browserSync.stream())
}

function resources() {
	return gulp.src(['src/*.webmanifest', 'src/manifest.json', 'src/*.txt', 'src/*.xml', 'src/*.png', 'src/*.jpg', 'src/*.ico', 'src/*.htaccess'])
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream())
}

function run() {
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
	gulp.watch('src/js/*.js', { ignoreInitial: false }, javascript)
	gulp.watch('src/css/*.css', { ignoreInitial: false }, css)
	gulp.watch(['src/img/*.jpg', 'src/img/*.png', 'src/img/**/*.jpg', 'src/img/**/*.png'], { ignoreInitial: false }, img)
	gulp.watch(['src/img/*.svg', 'src/img/**/*.svg'], { ignoreInitial: false }, svg)
	gulp.watch(['src/fonts/*'], { ignoreInitial: false }, fonts)
	gulp.watch(['src/*.webmanifest', 'src/manifest.json', 'src/*.txt', 'src/*.xml', 'src/*.png', 'src/*.jpg', 'src/*.ico', 'src/.htaccess'], { ignoreInitial: false }, resources)
	gulp.watch('src/*.php', { ignoreInitial: false }, php)
}

gulp.task('default', gulp.series(run))