/*
 * grunt-list-em
 * https://github.com/Feathr/grunt-list-em
 *
 * Copyright (c) 2014 Marlon Landaverde
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');
  var defaults = {
    template: {
      html: {
        js: '<script type="text/javascript" src="{filePath}"></script>'
      }
    }
  };
  var matchRes = {
    "html": function(id){
      return new RegExp("<!---?\\s*list_em:\\s*(" + id + ")\\s*-?-->");
    }
  };

  grunt.registerMultiTask('list_em', 'Writes an array of files to src (i.e. index.html)', function(){
    var options = this.options(defaults);
    var files = this.data.files || [];

    files.forEach(function(destObj){
      var id = destObj.id || "";
      var dest = destObj.dest || "";
      var src = destObj.src || "";

      if (grunt.file.exists(dest)){
        var contents = grunt.file.read(dest);
        var targetFileExtension = path.extname(dest).substr(1);

        var matchingRegex = matchRes[targetFileExtension](id);
        var stringToMatch = matchingRegex.test(contents) ? matchingRegex.exec(contents)[0] : "";

        if (!stringToMatch) {
          return;
        }

        var templateFile = function(fileName){
          var srcFileExtension= path.extname(fileName).substr(1);
          var template = options.template[targetFileExtension][srcFileExtension];
          return template.replace("{filePath}", fileName);
        };

        var listOfFiles = [];

        src.forEach(function(file){
          if(grunt.file.exists(file)){
            listOfFiles.push(templateFile(file));
          } else {
            // might be a matching case
            var matchSrc = grunt.file.expand(file);
            if (matchSrc.length) {
              matchSrc.forEach(function(fileName){
                listOfFiles.push(templateFile(fileName));
              });
            } else {
              grunt.log.writeln("\"" + file + "\" does not exist");
            }
          }
        });

        var newContents = contents.replace(new RegExp(stringToMatch, "g"), listOfFiles.join("\n"));

        if (newContents){
          grunt.file.write(dest, newContents);
        }
      } else {
        grunt.log.writeln("\"" + dest + "\" does not exist");
      }
    });
  });
};