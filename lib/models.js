
/*!

  blueprint::models
  
*/

var fs = require("fs");
var loadedModels = 0;
var totalModels = 0;

global.autoModels = new Array();
global.projectModels = new Array();

function model(file) {
  if (file === ".DS_Store") { 
    loadedModels++;
    return;
  }
  var modelName = file.replace(".js", "");
  global[modelName] = new require(__ROOT + "/models/"+modelName);
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
  fs.readdir(__ROOT + "/models", function(error, files) {
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