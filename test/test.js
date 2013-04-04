'use strict';

var assert = require('assert');
var path = require('path');
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('CityJS generator', function() {

  var cityjsGeneraor;

  beforeEach(function(done) {
    process.chdir(__dirname);
    var deps = [
      '../../app'
    ];
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        done(err);
      }
      cityjsGeneraor = helpers.createGenerator('cityjs:app', deps);
      done();
    });
  });

  it ('should generate git files', function (done) {
    cityjsGeneraor.run({}, function() {
      helpers.assertFiles(['.gitignore', '.gitattributes']);
      done();
    });
  });

  it ('should generate package file', function (done) {
    cityjsGeneraor.run({}, function() {
      helpers.assertFiles(['package.json']);
      done();
    });
  });

  it ('should generate grunt file', function (done) {
    cityjsGeneraor.run({}, function() {
      helpers.assertFiles(['Gruntfile.js']);
      done();
    });
  });

  it ('should generate app files', function (done) {
    cityjsGeneraor.run({}, function() {
      helpers.assertFiles([
        'app/favicon.ico',
        'app/robots.txt',
        'app/crossdomain.xml'
      ]);
      done();
    });
  });

  it ('should create directory layout', function (done) {
    cityjsGeneraor.run({}, function() {
      helpers.assertFiles([
        'app',
        'data',
        'docs',
        'events',
        'packages',
        'shared'
      ]);
      done();
    });
  });
});
