var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var replaceString = require('gulp-replace');
var svgSprite = require('gulp-svg-sprite');
var Config = require('../../../config.js');

var BASE_PATH = Config.site.base_path;
var DEST_PATH = Config.site.dest_path;

gulp.task('site:svg:sprite', function() {
  var settings = Config.getTaskSettings('site:svg:sprite');

  return gulp.src(BASE_PATH + settings.source)
    // minify svg
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    // remove attr
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
            $('[xmlns]').removeAttr('xmlns');
        },
        parserOptions: {
          xmlMode: true
        }
    }))
    .pipe(replaceString('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: 'sprite.svg',//DEST_PATH + settings.dist,
                render: {
                    scss: {
                        template: settings.scss.source,
                        dest: settings.scss.dist
                    }
                }
            }
        }
    }))
    .pipe(gulp.dest(DEST_PATH + settings.dist));
});

gulp.task('site:svg:img', function() {
    var settings = Config.getTaskSettings('site:svg:img');
    
    return gulp.src(BASE_PATH + settings.source)
      .pipe(
        gulp.dest(DEST_PATH + settings.dist)
      );
});

gulp.task('site:svg', ['site:svg:sprite', 'site:svg:img'], function() {});