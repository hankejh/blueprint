
/*!

  blog
  https://github.com/ingklabs/blueprint/

*/

// load dependencies
var mongoose = require("mongoose");
var blueprint = require("../lib/blueprint");

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

// setup a base route aside from /controllers
app.get("/", false, function(request, response) {
  response.send("don't taze me bro!");
});

// wait for mongodb state to be ready, then boot
mongoose.connection.on("open", function() {
  app.listen(8000);
});

/* EOF */