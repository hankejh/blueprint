
/*!
 *
 *
 * MODELS
 *
 *
 */

var fs = require("fs");
var path = require("path");

module.exports = models = function(blueprint) {
  var modelPath = path.normalize(__dirname + "/../models");
  fs.readdirSync(modelPath, function(error, files) {
    if (error) {
      throw new Error(error);
    } else {
      files.forEach(function(filename) {
        if (!/\.js$/.test(filename)) {
          return;
        }
        var modelName = file.replace(".js", "");
        blueprint[modelName] = new require(__ROOT + "/models/"+modelName);
      });
    }    
  });
};

/* EOF */