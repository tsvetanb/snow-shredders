'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var	browserSync = require('browser-sync').create();
var	cp = require("child_process");
var	autoprefixer = require("gulp-autoprefixer");
var	size = require("gulp-size");
 
gulp.task("sass", function () {
  return gulp.src('./_assets/src/scss/**/*.scss')
    .pipe(size({ showFiles: true }))
    .pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('./_site/css'))
    .pipe(browserSync.stream());
});

gulp.task("jekyll", function() {
	return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit", shell: true });
});

gulp.task("serve", function() {

    browserSync.init({
        server: {
            baseDir: "./_site/"
        }
    });

	gulp.watch('./_assets/src/scss/**/*.scss', gulp.series('sass') );

	gulp.watch( [
		"./*.html",
		"./_includes/*.html",
		"./_layouts/*.html",
	]).on('change', gulp.series('jekyll', 'sass') );
	
});
 
gulp.task("default", gulp.series('jekyll', 'sass', 'serve') );