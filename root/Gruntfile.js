// Generated on 2013-03-27 using generator-webapp 0.1.5
'use strict';
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};{% if(cgi) { %}
var cgi = require('gateway'); {% } %}

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            lib: {
                src: ['lib/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            }
        },
        watch: {
            gruntfile: {                                                                                     
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
        },
        connect: {
            options: {
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            server: {
                options: {
                    port: 9000,
                    middleware: function (connect, options) {
                        return [{% if(cgi) { %}
                            // cgi middleware...
                            {% } %}
                        ];
                    },
                }
            }{% if(proxy) { %}{%= ','%}
            server2: {
                options: {
                    port: 9001,
                    middleware: function(connect, options) {
                        return [
                            
                        ];   
                    }
                }
            }{% } %}
        }{% if(proxy){ %}{%= ','%}
        proxy: {
            options: {
                port: 80,
                router: {
                    //routers...
                }
            },
            start: {}
        },{% } %}
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        mocha: {
            all: {
                options: {
                    run: true
                }
            }
        },
        uglify: {
            dist: {
                files: {  }
            }
        },
        cssmin: {
            dist: {
                files: { }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('server', function (target) {
        grunt.task.run([
            'clean:server',
            'connect',{% if(proxy) { %}
            'proxy',{% } %}
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'cssmin',
        'uglify',
        'copy',
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
