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
const cleanCSS = require('gulp-clean-css');
const autoprefix = require('gulp-autoprefixer');

// directories
const dir = {
  // sources
  scss_src: 'src/scss/**/*.scss',
  html_src: 'src/*.html',
  js_src: 'src/js/**/*.js',
  images_src: 'src/img/**/*.+(png|jpg|gif)',

  // destinations
  dist: 'dist',
  css_dist: 'dist/css',
  js_dist: 'dist/js',
  images_dist: 'dist/img'
}

/*********** Tasks ***********/
/****************************/

// spin up a web server via browser-sync
function browser_sync() {
  browserSync.init({
    server: {
      baseDir: dir.dist
    }
  })
}

// copy html files to dist folder
function html() {
  return gulp.src(dir.html_src)
    .pipe(changed(dir.dist))
    .pipe(gulp.dest(dir.dist))
    .pipe(browserSync.reload({
      stream: true
    }))
}

// convert scss to css (dist)
function scss() {
  return gulp.src(dir.scss_src)
    
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefix({
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dir.css_dist))
    .pipe(browserSync.reload({
      stream: true
    }))
}

// copy js files
function js() {
  return gulp.src(dir.js_src)
    .pipe(changed(dir.js_dist))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(dir.js_dist))
    .pipe(browserSync.reload({
      stream: true
    }))
}

// convert images and copy to img folder 
function images() {
  return gulp.src(dir.images_src)
    .pipe(changed(dir.images_dist))
    .pipe(imagemin())
    .pipe(gulp.dest(dir.images_dist));
}

// watch sass, javascript, and html changes
gulp.task('watch', gulp.parallel(html, scss, js, images, browser_sync, function() {

  // watch scss files for changes
  gulp.watch(dir.scss_src, scss);

  // watch html files for changes
  gulp.watch(dir.html_src, html);

  // watch javascript files for changes
  gulp.watch(dir.js_src, js);
}));

gulp.task('default', gulp.series('watch'));