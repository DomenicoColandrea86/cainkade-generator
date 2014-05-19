// strict mode is your friend :)
'use strict';

// cache some vars like a boss
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

// cainkade generator oh yea
var CainkadeGenerator = module.exports = function CainkadeGenerator(args, options, config) {

  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function() {
      this.log.write('\n\n\nCongrats! You\'r all set to start working on your project. \n\n\n');
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};

util.inherits(CainkadeGenerator, yeoman.generators.Base);

// generate questions for user to be asked on init
CainkadeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // Have Yeoman greet the user.
  this.log(yosay('Welcome to the marvelous Cainkade generator!'));


  // questions
  var prompts = [{
    name: 'appName',
    message: 'What is your project\'s name?'
  },{
    name: 'appAuthor',
    message: 'What is your name?'
  },{
    name: 'foundation',
    message: 'Would you like to use Zurb Foundation?',
    default: true
  }];

  // map answers to variables
  this.prompt(prompts, function(props) {
    this.appName = props.appName;
    this.appAuthor = props.appAuthor;
    this.foundation = props.foundation;

    if (this.foundation === 'no') {
      this.foundation = false;
    }

    cb();
  }.bind(this));
};

// scaffold out project structure
CainkadeGenerator.prototype.app = function app() {

  // assets root
  this.mkdir('assets');
  // js
  this.mkdir('assets/js');
  // js/vendor
  this.mkdir('assets/js/vendor');
  // js/ie
  this.mkdir('assets/js/ie');
  // css
  this.mkdir('assets/css');
  // scss
  this.mkdir('assets/scss');
  // img
  this.mkdir('assets/img');
  // fonts
  this.mkdir('assets/fonts');

  // Npm and Bower config
  this.copy('_package.json', 'package.json');
  this.copy('_.bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');

};

// bring in project files
CainkadeGenerator.prototype.projectfiles = function projectfiles() {
  // project files
  this.copy('_.editorconfig', '.editorconfig');
  this.copy('_.jshintrc', '.jshintrc');
  this.copy('_.htaccess', '.htaccess');
  this.copy('_config.rb', 'config.rb');

  // favicon.ico
  this.copy('favicon.ico', 'favicon.ico');

  // index.html
  this.copy('_index.html', 'index.html');

  // js files
  this.copy('js/_main.js', 'assets/js/main.js');
  this.copy('js/_jquery-1.10.2.min.js', 'assets/js/vendor/jquery-1.10.2.min.js');
  this.copy('js/_modernizr-2.6.2.min.js', 'assets/js/vendor/modernizr-2.6.2.min.js');
  this.copy('js/_respond.js', 'assets/js/ie/respond.js');

  // scss files
  this.copy('scss/_normalize.scss', 'assets/scss/_normalize.scss');
  this.copy('scss/_variables.scss', 'assets/scss/_variables.scss');
  this.copy('scss/_mixins.scss', 'assets/scss/_mixins.scss');
  this.copy('scss/_main.scss', 'assets/scss/_main.scss');

};

// if user opts for foundation during prompt
CainkadeGenerator.prototype.useFoundation = function useFoundation() {
  if (this.foundation) {
    this.copy('scss/_foundation.scss', 'assets/scss/_foundation.scss');
    this.copy('scss/_style-foundation.scss', 'assets/scss/style.scss');
    this.copy('_Gruntfile-f.js', 'Gruntfile.js');
  } else {
    this.copy('scss/_style.scss', 'assets/scss/style.scss');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
  }

};

// pull in project dependencies
CainkadeGenerator.prototype.getDependencies = function getDependencies() {
  var cb = this.async();

  this.installDependencies({
    bower: true,
    npm: true,
    skipInstall: false,
    callback: function() {
      cb();
    }
  });

};
