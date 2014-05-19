'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var CainkadeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Cainkade generator!'));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name?'
    },{
      name: 'appVersion',
      message: 'What is your app\'s version number?'
    },{
      name: 'appGOT',
      message: 'What Game of Thrones character best describes this app?'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appName = props.appVersion;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('assets');
    this.mkdir('assets/js');
    this.mkdir('assets/css');
    this.mkdir('assets/scss');
    this.mkdir('assets/img');
    this.mkdir('assets/fonts');
    this.mkdir('assets/js/vendor');
    this.mkdir('assets/js/ie');

    this.copy('_package.json', 'package.json');
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('htaccess', '.htaccess');
    this.copy('_index.html', 'index.html');
    this.copy('js/_main.js', 'assets/js/main.js');
    this.copy('js/_jquery-1.10.2.min.js', 'assets/js/vendor/jquery-1.10.2.min.js');
    this.copy('js/_modernizr-2.6.2.min.js', 'assets/js/vendor/modernizr-2.6.2.min.js');
    this.copy('js/_respond.js', 'assets/js/ie/respond.js');
    this.copy('scss/_style.scss', 'assets/scss/style.scss');
    this.copy('scss/_normalize.scss', 'assets/scss/_normalize.scss');
    this.copy('scss/_grid.scss', 'assets/scss/_grid.scss');
    this.copy('scss/_variables.scss', 'assets/scss/_variables.scss');
    this.copy('scss/_mixins.scss', 'assets/scss/_mixins.scss');
    this.copy('scss/_main.scss', 'assets/scss/_main.scss');
    this.copy('_config.rb', 'config.rb');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
  }
});

module.exports = CainkadeGenerator;
