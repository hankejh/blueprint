
/*!

  yourappname

*/

// LOAD CONFIGURATION
var nconf = require("nconf");
nconf.use("file", { file: "./config/main.json" });

// SETUP BLUEPRINT W/ MONGOOSE
var mongoose = require("mongoose");
var blueprint = require("blueprint");

// CONNECT TO MONGO
mongoose.connect(nconf.get("mongodb"));

// WAIT FOR MONGO.READY
mongoose.connection.on("open", function() {
  blueprint.boot();
});

/* EOF */