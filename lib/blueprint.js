
/*!

  blueprint::main
  https://github.com/ingklabs/blueprint/
  Blueprint for a Startup. Middleware, & MVC routing over Node.js 

*/

var path = require("path");
var mongoose = require("mongoose");
var models = require("./models");
var controllers = require("./controllers");


blueprint.dry = function() {
  models();
  controllers(blueprint);
};

blueprint.boot = function(port) {
  port = port || 8000;
  blueprint.dry();
  blueprint.listen(port);
};

/* EOF */