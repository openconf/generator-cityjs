var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = AppGenerator;

var separator = '\n=====================================\n';

function AppGenerator() {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());

  this.sourceRoot(path.join(path.dirname(__dirname), 'templates'));
}

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.welcome = function welcome() {
  var header = separator.yellow + '\nCityJS\n'.red.bold + separator.yellow;
  console.log(header);
  console.info('Generating your awesome app. Stay tuned ;)');
};

AppGenerator.prototype.git = function git() {
  this.copy('common/gitignore', '.gitignore');
  this.copy('common/gitattributes', '.gitattributes');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('common/editorconfig', '.editorconfig');
};

AppGenerator.prototype.packageJson = function packageJson() {
  this.template('common/package.json', 'package.json');
};

AppGenerator.prototype.gruntFile = function gruntFile() {
  this.copy('common/Gruntfile.js', 'Gruntfile.js');
};

AppGenerator.prototype.app = function app() {
  this.copy('common/favicon.ico', 'app/favicon.ico');
  this.copy('common/robots.txt', 'app/robots.txt');
  this.copy('common/crossdomain.xml', 'app/crossdomain.xml');
};

AppGenerator.prototype.boilerplate = function _bootstrapCompass(cb) {
  var cb = this.async();

  this.remote('openconf', 'cityjs', function (err, remote) {
    if (err) {
      return cb(err);
    }
    remote.directory('app', '.');
    cb();
  });
};

AppGenerator.prototype.hint = function hint() {
  console.info(separator);
  console.info('\nReady.'.bold);
  console.info('\nJust run ' + 'npm install'.bold.yellow + ' to install the required dependencies.');
};
