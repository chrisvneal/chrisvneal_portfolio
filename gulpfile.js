'use strict';

// plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

// directories
const scss_src = 'src/scss/**/*.scss';
const html_src = 'src/*.html';
const js_src = 'src/js/**/*.js';
const images_src = 'src/img/**/*.+(png|jpg|gif)';

const dist = 'dist';
const css_dist = 'dist/css';
const js_dist = 'dist/js';
const images_dist = 'dist/img';

/*********** Tasks ***********/
/****************************/

// spin up a web server via browser-sync
function browser_sync() {
  browserSync.init({
    server: {
      baseDir: dist
    }
  })
}

// copy html files to dist folder
function html() {
  return gulp.src(html_src)
    .pipe(changed(dist))
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({
      stream: true
    }))
}

// convert scss to css (dist)
function scss() {
  return gulp.src(scss_src)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(css_dist))
    .pipe(browserSync.reload({
      stream: true
    }))
}

// copy js files
function js() {
  return gulp.src(js_src)
    .pipe(changed(js_dist))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(js_dist))
    .pipe(browserSync.reload({
      stream: true
    }))
}

// convert images and copy to img folder 
function images() {
  return gulp.src(images_src)
    .pipe(changed(images_dist))
    .pipe(imagemin())
    .pipe(gulp.dest(images_dist));
}

// watch sass, javascript, and html changes
gulp.task('watch', gulp.parallel(html, scss, js, images, browser_sync, function() {

  // watch scss files for changes
  gulp.watch(scss_src, scss);

  // watch html files for changes
  gulp.watch(html_src, html);

  // watch html files for changes
  gulp.watch(js_src, js);
}));