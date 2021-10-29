var gulp = require('gulp');
var args = require('get-gulp-args')();

var tasks = [
  'site:fonts', 
  'site:img',
  'site:styles', 
  'site:js', 
  'site:html'
];

gulp.task('site', tasks, function() {});