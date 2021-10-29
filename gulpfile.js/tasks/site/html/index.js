var gulp = require('gulp');
var Config = require('../../../config.js');
var include = require('gulp-html-tag-include');
var htmlclean = require('gulp-htmlclean');

var BASE_PATH = Config.site.base_path;
var DEST_PATH = Config.site.dest_path;

gulp.task('site:html', function() {
  var settings = Config.getTaskSettings('site:html');

  return gulp.src(BASE_PATH + settings.source)
    .pipe(include())
    // .pipe(htmlclean({
    //     protect: /<\!--%fooTemplate\b.*?%-->/g,
    //     edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
    // }))
    .pipe(gulp.dest(DEST_PATH + settings.dist))
    .pipe(global.browserSync.stream());
});