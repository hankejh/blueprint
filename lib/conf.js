
/*
  use package.json to expose
  app config info
*/

var fs  = require("fs");
var blueprint = require("./blueprint");

blueprint.conf = {
  use : function(confFile) {
    confFile = confFile || process.cwd() + "/package.json";
    var data = fs.readFileSync(confFile).toString();
    blueprint.conf.pkg = JSON.parse(data).blueprint;
  },
  get : function(item) {
    return blueprint.conf.pkg[item];
  }
};

/* EOF */