
/*!

  blueprint::main
  https://github.com/ingklabs/blueprint/
  Blueprint for an App. Middleware, & MVC routing over Node.js & Mongoose 

*/

var colors = require("colors");
var mongoose = require("mongoose");
var express = require("express");

/*

  blueprint(){}
  blueprint.boot(port)

*/

module.exports = blueprint = express.createServer();

blueprint.boot = function(port) {
  port = port || 8000;
  blueprint.listen(port);
};

/* EOF */