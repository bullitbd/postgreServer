'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            dev: {
                src: ['Gruntfile.js', 'test/**/*.js', 'server.js', 'models/**/*.js', 'routes/**/*.js']
            }
        },
        jscs: {
            src: ['test/**/*.js', 'server.js', 'models/**/*.js', 'routes/**/*.js'],
            options: {
                config: '.jscsrc'
            }
        },
        simplemocha: {
            all: {
                src: ['test/entries_tests.js']
            }
        },
        watch: {
            scripts: {
                files: ['*.js', 'test/*.js'],
                tasks: ['jshint']
            }
        }
    });
    grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
    grunt.registerTask('default', ['test']);
};