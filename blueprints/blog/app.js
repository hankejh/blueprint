
/*!

  blog
  https://github.com/ingklabs/blueprint/tree/blog

*/

// load dependencies
var nconf = require("nconf");
var mongoose = require("mongoose");
var blueprint = require("../../lib/blueprint");

blueprint.createServer();

// load and use config file
nconf.use("file", { file: "./config/main.json" });

// connect to mongodb via mongoose
mongoose.connect(nconf.get("mongodb"));

// listen for a mongodb error
mongoose.connection.on("error", function(error) {
  throw new Error(error);
});

// wait for mongodb state to be ready, then boot
mongoose.connection.on("open", function() {
  blueprint.boot();
});

/* EOF */