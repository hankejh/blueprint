
/*!

  blueprint::models
  
*/

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

/* EOF */