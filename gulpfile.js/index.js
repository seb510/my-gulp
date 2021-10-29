var path = require('path');
var gulp = require('gulp');
var Config = require('./config.js');
var args = require('get-gulp-args')();
var requireDir = require('./helpers/requireDir');

var tasks = ['site'];

// Register tasks
requireDir( path.join(__dirname, 'tasks') );
//////////////////////////////////////////////////////

// Run web server
if(args.production === undefined) {
  tasks.push('browser-sync');
}
//////////////////////////////////////////////////////

// Run default task
gulp.task('default', tasks, function() {
  if (args.production === undefined) {
    // Register watchers
    var watch = Config.watch;
    
    if(Object.keys(watch).length > 0) {
      for(var key in watch) {
        if(Array.isArray(watch[key])) {
          gulp.watch(key, watch[key]);
        } else if(typeof watch[key] === 'string') {
          gulp.watch(key, [watch[key]]);
        }
      }
    }
  }
});
///////////////////////////////////////////////////// 