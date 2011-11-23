
var models = require("./models");
var controllers = require("./controllers");

var MVC = exports.MVC = function(app) {
  models();
  controllers(app);
};


function controller(app, file) {
  if (file.substr(-3) != ".js" || file[0] == ".") {
    return;
  };
  var controllerName = file.replace(".js", "");
  var actions = require(path.normalize(parent + "/controllers/" + controllerName));
  var mapping = actions["mapping"];
  Object.keys(actions).map(function(action) {
    var fn = actions[action];
    if (typeof(fn) === "function") {
      if (MA = mapping[action]) {
        switch(MA.method) {
          case "GET":
            if (MA.auth === true) {
              app.get(MA.URL, zone, fn);
            } else {
              app.get(MA.URL, fn);
            }
            break;
          case "POST":
            if (MA.auth === true) {
              app.post(MA.URL, zone, fn);
            } else {
              app.post(MA.URL, fn);
            }
            break;
          case "PUT":
            if (MA.auth === true) {
              app.put(MA.URL, zone, fn);
            } else {
              app.put(MA.URL, fn);
            }
            break;
          case "DELETE":
            if (MA.auth === true) {
              app.del(MA.URL, zone, fn);
            } else {
              app.del(MA.URL, fn);
            }
            break;
        };
      };
    };
  });
};

module.exports = controllers = function(app) {
  var controllerDir = path.normalize(parent + "/controllers");
  fs.readdir(controllerDir, function(error, files) {
    if (error) {
      throw error;
    }
    files.forEach(function(file) {
      controller(app, file);
    });
  });
};


var fs = require("fs");
var path = require("path");

var loadedModels = 0;
var totalModels = 0;

global.autoModels = new Array();
global.projectModels = new Array();

var modelDirectory = path.normalize(process.cwd() + "/app/models");

function model(file) {
  if (file === ".DS_Store") { 
    loadedModels++;
    return;
  }
  var modelName = file.replace(".js", "");
  global[modelName] = new require(modelDirectory+"/"+modelName);
  var myModel = {
    name : modelName,
    model : global[modelName]
  }
  global.autoModels.push(myModel);
  loadedModels++;
  if (loadedModels === totalModels) {
    process.emit("modelsLoaded", true);
  }
};

module.exports = models = function() {
  fs.readdir(path.normalize(modelDirectory), function(error, files) {
    if (error) {
      throw error
    } else {
      totalModels = files.length;
      files.forEach(function(file) {
        model(file);
      });
    }    
  });
};