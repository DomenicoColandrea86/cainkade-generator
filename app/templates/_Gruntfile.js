
// Cainkade Grunt Tasks
module.exports = function(grunt) {

    // always use strict mode
    'use strict';

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // compass and scss preprocessor for all the awesome mixins
        compass: {
            dist: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        // autoprefixer css postprocessor for healthy css
        autoprefixer: {
            dist: {
                files: {
                    'assets/css/style.css': 'assets/css/style.css'
                }
            }
        },


        // minify css after autoprefixer does its thing
        cssmin: {
            build: {
                files: {
                    'assets/css/style.css': [ 'assets/css/style.css' ]
                }
            }
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'assets/js/main.js',
                '!assets/js/vendor/**/*',
                '!assets/js/ie/**/*'
            ]
        },

        // uglify to concat and minify
        uglify: {
            dist: {
                files: {
                    'assets/js/scripts.min.js': [
                        'assets/js/vendor/fastclick/lib/fastclick.js',
                        'assets/js/main.js',
                        '!assets/js/ie/**/*.js',
                        '!assets/js/vendor/jquery-1.10.2.min.js',
                        '!assets/js/vendor/modernizr-2.6.2.min.js',
                        '!assets/js/scripts.min.js'
                    ]
                }
            }
        },

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    cache: false,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: ['**/*.{png, jpg}'],
                    dest: 'assets/img/'
                }]
            }
        },

        // fire up a local dev server
        connect: {
            options: {
                port: 2000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            dev: {
                options: {
                    open: true,
                    base: ['./']
                }
            }
        },

        // create .tmp directory
        mkdir: {
            all: {
                options: {
                    create: ['tmp']
                },
            },
        },

        // clean build directory
        clean: {
            options: {
                force: true,
            },
            tmp: {
                expand: true,
                cwd: './',
                src: [ 'tmp' ]
            },
            build: {
                expand: true,
                cwd: './',
                src: [ '../build/**/*' ]
            }
        },

        // copy files from src directory into build directory
        copy: {
            tmp: {
                flatten: true,
                cwd: './',
                src: ['.htaccess', '*.{ico, png}', 'assets/css/**/*', 'assets/img/**/*', 'assets/js/scripts.min.js', 'assets/js/vendor/modernizr-2.6.2.min.js', 'assets/js/vendor/jquery-1.10.2.min.js', 'assets/js/ie/**/*', '*.html'],
                dest: 'tmp/',
            },
            build: {
                expand: true,
                cwd: './tmp/',
                src: ['.htaccess', '*.{ico, png}', 'assets/css/**/*', 'assets/img/**/*', 'assets/js/*.js', 'assets/js/ie/**/*', 'assets/js/vendor/modernizr-2.6.2.min.js', 'assets/js/vendor/jquery-1.10.2.min.js', '*.html'],
                dest: '../build/',
            }
        },

         // cache busting
        'cache-busting': {
            js: {
                replace: ['tmp/**/*.html'],
                replacement: 'scripts.min.js',
                file: 'tmp/assets/js/scripts.min.js',
                cleanup: true
            },
            css: {
                replace: ['tmp/**/*.html'],
                replacement: 'style.css',
                file: 'tmp/assets/css/style.css',
                cleanup: true
            }
        },

        // watch for changes and trigger compass, autoprefixer, jshint, uglify and livereload
        watch: {
            options: {
                livereload: true,
            },
            compass: {
                files: ['assets/scss/**/*.{scss,sass}'],
                tasks: ['compass', 'autoprefixer', 'cssmin']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            },
            livereload: {
                files: ['*.html', '*.php', 'assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}']
            }
        }

    });

    // default task "watch task"
    grunt.registerTask('default', ['compass', 'uglify', 'connect:dev', 'watch']);

    // minify images
    grunt.registerTask('images', ['imagemin']);

    // build task
    grunt.registerTask('build', ['compass', 'autoprefixer', 'cssmin', 'jshint', 'uglify', 'imagemin', 'mkdir', 'copy:tmp', 'cache-busting:js', 'cache-busting:css', 'clean:build', 'copy:build', 'clean:tmp']);

};
