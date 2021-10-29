var Config = {
    site: {
      base_path: __dirname + '/../src/site',
      dest_path: __dirname + '/../build'
    },
    getTaskSettings: function(task_name) {
      return task_name.split(':').reduce(function(result, key) {
        return result[key];
      }, this.tasks);
    },
    tasks: {
      site: {}
    },
    watch: {}
  };
  
  Config.tasks.site = {
    fonts: {
      source: '/assets/fonts/**/*.{ttf,woff,woff2,eof,svg}',
      dist: '/assets/fonts/'
    },
    img: {
      source: '/assets/img/**/*',
      dist: '/assets/img/'
    },
    svg: {
      sprite: {
        source: '/assets/svg/icons/*.svg',
        dist: '/assets/img/',
        scss: {
          source: 'src/site/assets/styles/custom/standards/icon_template.scss',
          dist: '../../../../src/site/assets/styles/custom/standards/icon_default.scss'
        }
      },
      img: {
        source: '/assets/svg/*.svg',
        dist: '/assets/img/svg/'
      }
    },
    styles: {
      libs: {
        source: '/assets/styles/libs/**/*.css',
        dist: '/assets/css/'
      },
      custom: {
        source: '/assets/styles/custom/',
        dist: '/assets/css/'
      }
    },
    js: {
      libs: {
        source: '/assets/js/libs/**/*.js',
        dist: '/assets/js/',
        order: [
            'jquery.min.js',
            'popper.min.js',
            'bootstrap.min.js',
            '/**/*.js'
        ]
      },
      custom: {
        source: '/assets/js/custom/**/*.js',
        dist: '/assets/js/',
        order: [
          'assets/js/common/**/*',
          'assets/js/**/*'
        ]
      }
    },
    html: {
      source: '/html/pages/**/*.html',
      dist: '/'
    }
  };
  
  Config.watch = {
    // Format - 'path': 'task'
    'src/site/assets/fonts/**/*.{ttf,woff,woff2,eof,svg}': 'site:fonts',
    'src/site/assets/img/**/*.{jpg,jpeg,png,gif}': 'site:img',
    'src/site/assets/svg/icons/**/*.svg': 'site:styles:custom',
    'src/site/assets/styles/libs/**/*.css': 'site:styles:libs',
    'src/site/assets/styles/custom/**/*': 'site:styles:custom:watch',
    'src/site/assets/js/libs/**/*.js': 'site:js:libs',
    'src/site/assets/js/custom/**/*.js': 'site:js:custom',
    'src/site/html/**/*.html': 'site:html'
  };
  
  module.exports = Config;