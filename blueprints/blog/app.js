
/*!

  blog
  https://github.com/ingklabs/blueprint/tree/blog

*/

// load dependencies
var mongoose = require("mongoose");
var blueprint = require("blueprint");

// http.createServer()
blueprint.createServer();

// load package.json
blueprint.conf.use();

// connect to mongodb via mongoose
mongoose.connect(blueprint.conf.get("mongodb"));

// listen for a mongodb error
mongoose.connection.on("error", function(error) {
  throw new Error(error);
});

// wait for mongodb state to be ready, then boot
mongoose.connection.on("open", function() {
  blueprint.boot();
});

/* EOF */