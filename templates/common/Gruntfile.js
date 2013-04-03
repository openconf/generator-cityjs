'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
	return connect.static(path.resolve(point));
};

var folderDir = function folderDir(connect, point){
	return connect.directory(path.resolve(point));
}

module.exports = function(grunt) {
	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: 8080,
					base: './',
					hostname: null,
					// livereload awesomeness
					middleware: function(connect, options){
						return [
						lrSnippet,
						folderMount(connect, './'),
						folderDir(connect, './')];
					}
				}
			}
		},

		coffee: {
			options: {
				bare: true
			},
			glob_to_multiple: {
				expand: true,
				cwd: '.',
				src: [
					'./*.coffee',
					'./**/*.coffee',
					'./tests/**/*.coffee',
					'./tests/*.coffee'
				],
				dest: '.',
				ext: '.js'
			}
		},

		sass: {
			options: {
				noCache: true
			},
			glob_to_multiple: {
				expand: true,
				cwd: './assets/scss',
				src: ['*.scss', '*/**/*.scss'],
				dest: './assets/css',
				ext: '.css'
			}
		},

		regarde: {
			coffee: {
				files: [
					'./*.coffee',
					'./**/*.coffee',
					'./tests/**/*.coffee',
				],
				tasks: ['coffee', 'livereload']
			},
			scss: {
				files: [
					'./assets/scss/*.scss'
				],
				tasks: ['sass', 'livereload']
			},
			html: {
				files: [
					'./**/*.html'
				],
				tasks: ['livereload']
			}
		},

		testacular: {
			unit: {
				options: {
					configFile: 'tests/testacular-config.js'
				}
			}
		}

	});
/*
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {},
    copy: {},
    watch: {},
    clean: {}
  });
*/

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-testacular');
	grunt.loadNpmTasks('grunt-contrib-livereload');

	//TODO: put testacular back
	grunt.registerTask('run', [ 'coffee', 'connect', 'livereload-start', 'regarde']);
  grunt.registerTask('build', ['coffee']);
	grunt.registerTask('default', ['run']);
};
