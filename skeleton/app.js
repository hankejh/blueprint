
/*!

  yourappname

*/

var nconf = require("nconf");
var mongoose = require("mongoose");
var blueprint = require("blueprint");

// LOAD CONFIGURATION
nconf.use("file", { file: "./config/main.json" });

// CONNECT TO MONGO
mongo.connect(conf["mongodb"]);

// WAIT FOR MONGO.READY
mongo.connection.on("open", function() {
  blueprint.boot();
});

/* EOF */