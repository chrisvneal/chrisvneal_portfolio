'use strict';

// Variables
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const scss_folder = './src/scss/**/*.scss';
const src_html = './src/*.html';

// spin up a web server via browserSync
function browser_sync() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

// convert scss to css (dist)
function scss() {
  return gulp.src(scss_folder)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
  }



// copy html files to dist folder
function html() {
  return gulp.src(src_html)
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
}

// convert images and copy to img folder 






// watch sass, javascript, and html changes

gulp.task('watch', gulp.parallel(html, scss, browser_sync, function() {
  
  // watch scss files for changes
  gulp.watch(scss_folder, scss);

  // watch html files for changes
  gulp.watch(src_html, html);
}));