
/*!

  blueprint::main
  https://github.com/ingklabs/blueprint/
  Blueprint for an App. Middleware, & MVC routing over Node.js & Mongoose 

*/

// core
var express = require("express");

// blueprint(){}
module.exports = blueprint = function(){ return new express; }

// listen (boot for framework?!)
blueprint.boot = function(port) {
  port = port || 8080;
  blueprint.server.listen(port);
};

/* EOF */