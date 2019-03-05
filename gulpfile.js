'use strict';

// Variables
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const scss_folder = './src/scss/**/*.scss';
const src_html = './src/*.html';

const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');




const images_src = './src/img/**/*.+(png|jpg|gif)';
const images_dist = './dist/img';
const src_js = './src/js/**/*.js';


// spin up a web server via browserSync
function browser_sync() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
}



// convert scss to css (dist)
function scss() {
  return gulp.src(scss_folder)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
  }

  // copy js files
  function js() {
    return gulp.src(src_js)
    .pipe(changed('./dist/js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.reload({
        stream: true
      }))
  }



// copy html files to dist folder
function html() {
  return gulp.src(src_html)
  .pipe(changed('dist'))
    .pipe(gulp.dest('dist'))
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
  gulp.watch(scss_folder, scss);

  // watch html files for changes
  gulp.watch(src_html, html);

  // watch html files for changes
  gulp.watch(src_js, js);
}));

exports.js = js;