const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

function javascript() {
	return gulp.src([
			'js/plugins.js',
			'js/main.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat("bundle.js"))
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('js/'))
	;
}

function css() {
	return gulp.src([
			'css/normalize.css',
			'css/main.css'
		])
		.pipe(sourcemaps.init())
		.pipe(concat("bundle.css"))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('css'))
	;
}

exports.default = function() {
	gulp.watch('css/main.css', { ignoreInitial: false }, css);
	gulp.watch('js/main.js', { ignoreInitial: false }, javascript);
};