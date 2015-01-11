module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist'
          ]
        }]
      },
      server: '.tmp'
    },
    concurrent: {
      dist: [
        'sass:dist',
        'imagemin'
      ],
      server: [
        'sass:server'
      ],
      test: [
        'sass'
      ]
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      dist: {
        options: {
          open: true,
          base: 'dist'
        }
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/assets/fonts',
                connect.static('./bower_components/bootstrap-sass-official/assets/fonts/bootstrap')
              ),
              connect().use(
                '/assets',
                connect.static('app/common/assets')
              ),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/node_modules',
                connect.static('./node_modules')
              ),
              connect.static('app')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/assets/fonts',
                connect.static('./bower_components/bootstrap-sass-official/assets/fonts/bootstrap')
              ),
              connect().use(
                '/assets',
                connect.static('app/common/assets')
              ),
              connect.static('app')
            ];
          }
        }
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app',
            dest: 'dist',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '**/*.html'
            ]
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap',
            dest: 'dist/assets/fonts',
            src: ['**']
          },
          {
            expand: true,
            cwd: 'app/common/assets/fonts',
            dest: 'dist/assets/fonts',
            src: ['**']
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**/*.html'],
          dest: 'dist'
        }]
      }
    },
    htmlrefs: {
      dist: {
        src: 'dist/index.html',
        dest: 'dist/index.html'
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/common/assets/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: 'dist/assets/images'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'app/**/*.js'
        ]
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['**/*.scss'],
          dest: './.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        options: {
          debugInfo: true
        },
        files: [{
          expand: true,
          cwd: 'app',
          src: ['**/*.scss'],
          dest: './.tmp/styles',
          ext: '.css'
        }],
      }
    },
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      html: ['dist/**/*.html'],
      css: ['dist/styles/*.css'],
      options: {
        assetDirs: ['dist', 'dist/assets']
      }
    },
    watch: {
      js: {
        files: ['app/**/*.js'],
        tasks: ['newer:jshint:all', 'karma'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      sass: {
        files: ['app/app.scss'],
        tasks: ['sass:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'app/**/*.html',
          'app/**/*.scss',
          '.tmp/styles/**/*.css'
        ]
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      grunt.task.run(['build', 'connect:dist:keepalive']);
    } else {
      grunt.task.run([
        'clean:server',
        'concurrent:server',
        'connect:livereload',
        'watch'
      ]);
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'copy:dist',
    'htmlrefs',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'karma'
  ]);
};
