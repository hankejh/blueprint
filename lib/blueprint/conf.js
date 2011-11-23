
/*

  use package.json to expose
  app config info

*/

var fs = require("fs");

var conf = exports.conf = {
  use : function(confFile) {
    confFile = confFile || process.cwd() + "/package.json";
    var data = fs.readFileSync(confFile).toString();
    conf.pkg = JSON.parse(data).blueprint;
  },
  get : function(item) {
    return conf.pkg[item];
  }
};

/* EOF */