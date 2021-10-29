var gulp = require('gulp');
var order = require('gulp-order');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var args = require('get-gulp-args')();
var Config = require('../../../config.js');

var BASE_PATH = Config.site.base_path;
var DEST_PATH = Config.site.dest_path;
var tasks = ['site:js:libs', 'site:js:custom'];

gulp.task('site:js:libs', function() {
  var settings = Config.getTaskSettings('site:js:libs');
  var dest = gulp.src(BASE_PATH + settings.source)
    .pipe(order(settings.order));
  
  if (args.production != undefined) {
    dest = dest.pipe(uglify());
  }

  return dest
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(DEST_PATH + settings.dist))
    .pipe(global.browserSync.stream());
});

gulp.task('site:js:custom', function() {
  var settings = Config.getTaskSettings('site:js:custom');
  var dest = gulp.src(BASE_PATH + settings.source)
    .pipe(order(settings.order));

  if (args.production != undefined) {
    dest = dest.pipe(uglify());
  }

  return dest.pipe(concat('scripts.js'))
    .pipe(gulp.dest(DEST_PATH + settings.dist))
    .pipe(global.browserSync.stream());
});


gulp.task('site:js', tasks, function() {});