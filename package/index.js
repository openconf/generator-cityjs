var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = PackageGenerator;

function PackageGenerator() {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('packageType', { type: String, required: true });
  this.sourceRoot(path.join(path.dirname(__dirname), 'templates'));
}

util.inherits(PackageGenerator, yeoman.generators.Base);

PackageGenerator.prototype.main = function main(cb) {
  var self = this;
  var cb = this.async();

  this.remote('openconf', 'cityjs', function (err, remote) {
    if (err) {
      return cb(err);
    }
    var path = 'packages/' + self.packageType;
    remote.directory('app/' + path, path);
    // TODO: update config.coffee after installing
    cb();
  });
};
