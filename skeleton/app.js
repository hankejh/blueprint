
/*!

  yourappname

*/

var nconf = require("nconf");
var mongoose = require("mongoose");
var blueprint = require("blueprint");

// LOAD CONFIGURATION
nconf.use("file", { file: "./config/main.json" });

// CONNECT TO MONGO
mongoose.connect(nconf.get("mongodb"));

// WAIT FOR MONGO.READY
mongoose.connection.on("open", function() {
  blueprint.boot();
});

/* EOF */