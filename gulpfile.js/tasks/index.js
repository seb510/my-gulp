var gulp = require('gulp');
var browserSync = require('browser-sync').create();

global.browserSync = browserSync;

gulp.task('browser-sync', function () {
  global.browserSync.init({
    server: {
      baseDir: "build"
    }
  });
});
