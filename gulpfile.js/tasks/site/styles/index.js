var gulp = require('gulp');
var sass = require('gulp-sass');
var args = require('get-gulp-args')();
var cleanCSS = require('gulp-clean-css');
var concatCSS = require('gulp-concat-css');
var Config = require('../../../config.js');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var BASE_PATH = Config.site.base_path;
var DEST_PATH = Config.site.dest_path;
var tasks = ['site:styles:libs', 'site:styles:custom'];

gulp.task('site:styles:libs', function () {
    var settings = Config.getTaskSettings('site:styles:libs');
    var dest = gulp.src(BASE_PATH + settings.source)
        .pipe(concatCSS('libs.css'));

    if(args.production != undefined) {
        dest = dest.pipe(
            cleanCSS({
                compatibility: 'ie8',
                specialComments: 0,
                keepSpecialComments: false
            })
        );
    }

    return dest.pipe(gulp.dest(DEST_PATH + settings.dist))
    .pipe(global.browserSync.stream());
});

gulp.task('site:styles:custom', ['site:svg'], function() {
    var settings = Config.getTaskSettings('site:styles:custom');
    var dest = gulp.src(BASE_PATH + settings.source + 'style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer('last 3 versions'));

    if(args.production != undefined) {
        dest = dest.pipe(
            cleanCSS({
                compatibility: 'ie8',
                specialComments: 0,
                keepSpecialComments: false
            })
        );
    }

    return dest.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DEST_PATH + settings.dist))
        .pipe(global.browserSync.stream());
});

gulp.task('site:styles:custom:watch', function() {
  var settings = Config.getTaskSettings('site:styles:custom');
  var dest = gulp.src(BASE_PATH + settings.source + 'style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer('last 3 versions'));

  if(args.production != undefined) {
    dest = dest.pipe(
      cleanCSS({
        compatibility: 'ie8',
        specialComments: 0,
        keepSpecialComments: false
      })
    );
  }

  return dest.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEST_PATH + settings.dist))
    .pipe(global.browserSync.stream());
});

gulp.task('site:styles', tasks, function() {});
