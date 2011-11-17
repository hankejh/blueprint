
/*!

  blog
  https://github.com/ingklabs/blueprint/tree/blog

*/

// load dependencies
require.paths = require.paths.unshift(__dirname + "/../node_modules");

// load and use config file
nconf.use("file", { file: "./config/main.json" });

// connect to mongodb via mongoose
mongoose.connect(nconf.get("mongodb"));

// listen for a mongodb error
mongo.connection.on("error", function(error) {
  throw new Error(error);
});

// wait for mongodb state to be ready, then boot
mongoose.connection.on("open", function() {
  blueprint.boot();
});

/* EOF */