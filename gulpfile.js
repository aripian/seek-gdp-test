'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const cleanDest = require('gulp-clean-dest');

const sourcePath = ['src/**/*.js'];
const destPath = 'dist';


gulp.task('default', ['build-then-watch']);

gulp.task('build', ['compile']);
gulp.task('build-then-watch', ['compile', 'watch']);

gulp.task('compile', function() {
  gulp.src(sourcePath)
    .pipe(sourcemaps.init())
    .pipe(cleanDest(destPath))
    .pipe(eslint())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(eslint.format('stylish'))
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest(destPath))
});


gulp.task('watch', function() {
  gulp.watch(sourcePath, ['compile']);
});