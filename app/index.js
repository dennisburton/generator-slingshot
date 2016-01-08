'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');


module.exports = generators.Base.extend({
  constructor: function(){
    generators.Base.apply(this, arguments);
  },

  initializing: function(){},

  prompting: function(){
    var done = this.async();
    this.prompt([
      {type: 'input',
       name: 'appName',
       message: 'Application Name',
       default: this.config.get('appName') || 'react-slingshot-app'
      },
      {type: 'input',
        name: 'appDescription',
        message: 'Application Description',
        default: this.config.get('appDescription') || "Starter kit for creating apps with React and Redux"
      },
      {
        type: 'checkbox',
        name: 'includeOptions',
        message: 'Include These Options?',
        choices: [
          {name: 'Option 1', value: 'option1', checked: true},
          {name: 'Option 2', value: 'option2', checked: true}
        ]
      }
    ], function promptsCompleted(answers){
      this.config.set('appName',answers.appName);
      this.config.set('appDescription', answers.appDescription);

      this.config.set('includeOption1', _(answers.includeOptions).includes('option1'));
      this.config.set('includeOption2', _(answers.includeOptions).includes('option2'));

      this.config.save();
      done();
    }.bind(this));
  },

  configuring: function(){
  },

  writing: {
    writeConfiguration: function(){
      console.log('write configuration');
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { "appName": this.config.get('appName'),
          "appDescription": this.config.get('appDescription')
        });
      this.copy('webpack.config.js','webpack.config.js');
    },
    writeApplication: function() {
      console.log('writeApplication');
      console.log('templatePath: ', this.templatePath('src'));
      this.directory( this.templatePath('src'), this.destinationPath('src'))
    },
    writeTools: function(){
      console.log('writeTools');
      this.directory( this.templatePath('tools'), this.destinationPath('tools'))
    }
  },

  conflicts: function(){},

  install: function(){
    this.npmInstall();
  },

  end: function(){
    this.log(yosay('try running npm -s start'));
  }

});
