'use strict';

// Variables
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const scss_folder = './src/scss/**/*.scss';
const src_html = './src/**/*.html';



// convert scss to css (dist)

gulp.task('scss', function() {
  return gulp.src(scss_folder)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
});

// copy html files to dist folder

gulp.task('html', function() {
  return gulp.src(src_html)
    .pipe(gulp.dest('dist'))
});   

// convert images and copy to img folder 

// refresh the browser 




// watch sass, javascript, and html changes

gulp.task('watch', function() {
  
  // watch scss files for changes
  gulp.watch(scss_folder, gulp.series('scss'));

  // watch html files for changes
  gulp.watch(src_html, gulp.series('html'));
});





