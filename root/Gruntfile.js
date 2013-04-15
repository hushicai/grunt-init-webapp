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
        dist: 'release'
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
            // local server
            local: {
                options: {
                    port: 9000,
                    middleware: function (connect, options) {
                        return [
                            connect.favicon('app/favicon.icon'),
                            mountFolder(connect, 'app'){% if(cgi) { %}{%= ","%}
                            cgi('app', {
                                '.php': {
                                    'cgi': '/usr/local/php2/bin/php-cgi',
                                    'rules': {
                                        // rewrite rules for !file and !dir
                                    }
                                }
                            }){% } %}
                        ];
                    },
                }
            },
            // cdn server
            cdn: {
                options: {
                    port: 9001,
                    middleware: function(connect, options) {
                        return [
                            
                        ];   
                    }
                }
            }
        },
        proxy: {
            options: {
                port: 80,
                router: {
                    'localhost': '0.0.0.0:9000',
                    'e.sinajs.cn': '0.0.0.0:9001'
                }
            },
            start: {}
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
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

    grunt.registerTask('default', [
        'clean:server',
        'connect',
        'proxy',
        'watch'
    ]);
};
