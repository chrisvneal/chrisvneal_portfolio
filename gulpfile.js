'use strict';

// Variables
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const sass_folder = './src/scss/**/*.scss';


// convert sass to css 

gulp.task('scss', function() {
  return gulp.src(sass_folder)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
});

// copy html files to dist    

// convert images and copy to img folder 

// refresh the browser 









// watch sass, javascript, and html changes

gulp.task('watch', function() {
  gulp.watch(sass_folder, gulp.series('scss'));
});





