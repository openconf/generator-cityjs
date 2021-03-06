var util = require('util');
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = PackageGenerator;

function PackageGenerator() {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('packageType', { type: String, required: true });
  this.option('silent', { type: Boolean, required: false });
}

util.inherits(PackageGenerator, yeoman.generators.Base);

PackageGenerator.prototype.main = function main(cb) {
  var self = this;
  var cb = this.async();

  if(fs.existsSync('packages/' + self.packageType)) {
    if(!this.options.silent){
      console.log('Package \''.green + self.packageType.red + '\' already installed'.green);
    }
    return cb();
  }

  this.remote('openconf', 'packages', function (err, remote) {
    if (err) {
      return cb(err);
    }
    var cachedPackagePath = path.join(remote.cachePath, self.packageType);
    if(fs.existsSync(cachedPackagePath)){
      remote.directory(self.packageType, 'packages/' + self.packageType);
      self.installComplete = true;
      return cb();
    }
    var errorMessage = self.packageType + ' package not found.';
    console.log(errorMessage.red.bold);
    console.log('Available packages listed at https://github.com/openconf/packages');
    console.log('Or try to clean cache by deleting: ' + remote.cachePath.blue);
    cb();
  });
};

PackageGenerator.prototype.package = function package() {
  if(!this.installComplete){
    return;
  }
  var configFile = 'package.json';
  if(!fs.existsSync(configFile)){
    console.log('Warning: package.json not found.'.yellow.bold);
    return;
  }
  var config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  config.cityjsPackages = config.cityjsPackages || [];
  if(config.cityjsPackages.indexOf(this.packageType) == -1){
    config.cityjsPackages.push(this.packageType);
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
  }
};
