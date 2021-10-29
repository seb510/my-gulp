var gulp = require('gulp');
var Config = require('../../../config.js');

var BASE_PATH = Config.site.base_path;
var DEST_PATH = Config.site.dest_path;

gulp.task('site:fonts', function() {
  var settings = Config.getTaskSettings('site:fonts');
  
  return gulp.src(BASE_PATH + settings.source)
    .pipe(
      gulp.dest(DEST_PATH + settings.dist)
    );
});