'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');


module.exports = generators.Base.extend({
  constructor: function(){
    generators.Base.apply(this, arguments);
    this.argument('appName',{type: String, required: true});
  },

  initializing: function(){},

  prompting: function(){},

  configuring: function(){},

  writing: {
    writeEverything: function(){
      this.directory(
        this.templatePath(),
        this.destinationPath()
      )
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
