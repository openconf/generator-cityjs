'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {},
    copy: {},
    watch: {},
    clean: {}
  });

  grunt.registerTask('build', ['clean', 'requirejs', 'copy']);
  grunt.registerTask('default', ['build', 'watch']);
};
