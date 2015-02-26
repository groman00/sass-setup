var pkg = require('./package.json'),
	gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserify = require('gulp-browserify'),
	rename = require('gulp-rename'),
	minifycss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass');




// JavaScript
gulp.task('js', function () {
	gulp.src('./src/js/main.js')
		.pipe(browserify({ debug: true }))
		.pipe(uglify())
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('./dist/js/'));
});


//Global SASS
gulp.task('globalSass', function () {
    return gulp
    	.src('./src/scss/main.scss')
    	.pipe(sass())
    	.pipe(rename('style.css'))
        .pipe(gulp.dest('./dist/css'));
});


//Page specific SASS
gulp.task('pageSass', function () {
    return gulp
        .src('./src/scss/pages/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/pages'));
});


//Compile CSS
gulp.task('css', ['globalSass', 'pageSass'], function() {

	gulp
		.src('./dist/css/style.css')
		.pipe(minifycss({keepBreaks:true}))
		.pipe(gulp.dest('./dist/css/'));

	gulp
		.src('./dist/css/pages/*.css')
		.pipe(minifycss({keepBreaks:true}))
		.pipe(gulp.dest('./dist/css/pages'));		

});


gulp.task('default', ['css', 'js']);

gulp.task('watch', function(){
	gulp.watch('src/css/*.css', ['css']);
	gulp.watch('src/js/*.js', ['js']);
});


