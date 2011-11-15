
/*!

  blog

*/

// load configuration and use
var nconf = require("nconf");
nconf.use("file", { file: "./config/main.json" });

// setup blueprint & mongoose
var mongoose = require("mongoose");
var blueprint = require("blueprint");

// connect to mongodb via mongoose
mongoose.connect(nconf.get("mongodb"));

// wait for mongodb state to be ready, then boot
mongoose.connection.on("open", function() {
  blueprint.boot();
});

/* EOF */