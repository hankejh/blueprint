
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

/*
  totally optional
  load|require /models
  load|require /controllers
*/

blueprint.load("models", "/app/models/");
blueprint.load("controllers", "/app/controllers/", app);

// connect to mongodb via mongoose
mongoose.connect(blueprint.conf.get("mongodb"));

// mongoose listeners
mongoose.connection.on("error", function(error) {
  throw new Error(error);
});

// http.Server.listen()
app.listen(8000);

/* EOF */