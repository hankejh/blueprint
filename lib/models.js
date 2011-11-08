
/*!

  blueprint::models
  
*/

var fs = require("fs");

module.exports = models = function() {
  fs.readdir(__dirname + "/models", function(error, files) {
    if (error) {
      throw error
    } else {
      files.forEach(function(file) {
        var modelName = file.replace(".js", "");
      });
    }    
  });
};

/* EOF */