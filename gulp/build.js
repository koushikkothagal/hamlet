'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
  gulp.task('clean', function (done) {
    $.del([options.dist + '/', options.tmp + '/'], done);
  });

  gulp.task('build', function() {
  return gulp.src('src/components/hamlet/*.js')
    .pipe($.uglifyjs('hamlet.js'))
    .pipe(gulp.dest('dist'));
});
};
