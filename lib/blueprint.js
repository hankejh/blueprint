
/*!

  blueprint::main
  https://github.com/ingklabs/blueprint/
  Blueprint for an App. Middleware, & MVC routing over Node.js & Mongoose 

*/

// CORE
var express = require("express");

// BLUEPRINT(){}
module.exports = blueprint = function() { 
  return new express();
};

// LISTEN()
blueprint.boot = function(port) {
  port = port || 8080;
  blueprint.server.listen(port);
};

/* EOF */