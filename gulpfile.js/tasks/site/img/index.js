var gulp = require('gulp');
var tiny = require('gulp-tinypng-nokey');
var Config = require('../../../config.js');

var BASE_PATH = Config.site.base_path;
var DEST_PATH = Config.site.dest_path;

gulp.task('site:img', function() {
  var settings = Config.getTaskSettings('site:img');
  
  return gulp.src(BASE_PATH + settings.source)
    .pipe(tiny())
    .pipe(
      gulp.dest(DEST_PATH + settings.dist)
    );
});