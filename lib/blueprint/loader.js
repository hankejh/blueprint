
/*

  Automatically load|require
  /models and /controllers

  - blueprint.load("models", "/models");
  - blueprint.load("controllers", "/controllers");

*/

var fs = require("fs");
var path = require("path");

function models(directory) {
  directory = process.cwd() + (directory || "/app/models");
  fs.readdir(path.normalize(directory), function(error, files) {
    if (error) {
      throw new Error(error);
    } else {
      files.forEach(function(file) {
        if (file.search(new RegExp(/.DS_Store/)) === -1) {
          return;
        };
        var model = file.replace(".js", "");
        global[model] = new require(directory+"/"+model);
      });
    }    
  });  
};

function controllers(directory) {
  directory = process.cwd() + (directory || "/app/controllers");
  fs.readdir(path.normalize(directory), function(error, files) {
    if (error) {
      throw new Error(error);
    } else {
      files.forEach(function(file) {
        if (file.search(new RegExp(/.DS_Store/)) === -1) {
          return;
        };
        var controller = file.replace(".js", "");
        require(directory+"/"+controller);
      });
    };
  });
};

var load = exports.load = function(which, directory) {
  if (which === "models") {
    models(directory);
  } else if (which === "controllers") {
    controllers(directory);
  } else {
    throw new Error("usage: blueprint --help");
  };
};

/* EOF */