
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
      if (new RegExp(/ENOENT/).test(error.message)) {
        throw new Error("blueprint looks in /app/models/ by default, try 'blueprint --help'");
      } else {
        throw new Error(error);
      }
    } else {
      files.forEach(function(file) {
        if (file.search(new RegExp(/DS_Store/)) !== -1) {
          return;
        };
        var model = file.replace(".js", "");
        global[model] = new require(directory+"/"+model);
      });
    }    
  });  
};

function controllers(directory, app) {
  directory = process.cwd() + directory || "/app/controllers";
  fs.readdir(path.normalize(directory), function(error, files) {
    if (error) {
      if (new RegExp(/ENOENT/).test(error.message)) {
        throw new Error("blueprint looks in /app/controllers/ by default, try 'blueprint --help'");
      } else {
        throw new Error(error);
      }
    } else {
      files.forEach(function(file) {
        if (file.search(new RegExp(/DS_Store/)) !== -1) {
          return;
        };
        var controller = file.replace(".js", "");
        require(directory+"/"+controller)(app);
      });
    };
  });
};

var load = exports.load = function(which, directory, app) {
  if (which === "models") {
    models(directory);
  } else if (which === "controllers") {
    controllers(directory, app);
  } else {
    throw new Error("usage: blueprint --help");
  };
};

/* EOF */