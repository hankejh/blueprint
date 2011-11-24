
/*!

  blog
  https://github.com/ingklabs/blueprinted/

*/

// load dependencies
var mongoose = require("mongoose");
var blueprint = require("blueprint");

// http.createServer()
var app = blueprint.createServer();

// load package.json
blueprint.conf.use();

// load|require /models and /controllers
blueprint.load("models");
blueprint.load("controllers");

// connect to mongodb via mongoose
mongoose.connect(blueprint.conf.get("mongodb"));

// listen for a mongodb error
mongoose.connection.on("error", function(error) {
  throw new Error(error);
});

// wait for mongodb state to be ready, then boot
mongoose.connection.on("open", function() {
  app.listen(8000);
});

/* EOF */