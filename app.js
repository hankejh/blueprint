
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

// wait for mongodb state to be ready, then boot
mongoose.connection.on("open", function() {
  blueprint.boot();
});

/* EOF */