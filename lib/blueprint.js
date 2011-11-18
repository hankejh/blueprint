
/*!

  blueprint::main
  https://github.com/ingklabs/blueprint/
  Blueprint for an App. Middleware, & MVC routing over Node.js & Mongoose 

*/

// core
require("./response");
var fs  = require("fs");
var url = require("url");
var http = require("http");
var parse = require("url").parse;
var buffer = require("buffer").Buffer;
var path = require("path");
var models = require("./models");
var controllers = require("./controllers");
var mongoose = require("mongoose");

// blueprint(){}
module.exports = blueprint = function(){};

// create HTTP.Server
blueprint.createServer = function() {
  blueprint.server = http.createServer();
  blueprint.server.on("request", function handle(request, response) {
    blueprint.handle(request, response);
  });
};

// middleware setup
blueprint.routes = {};
blueprint.middleware = [];

// ordered
blueprint.bundled = [
  "logger",
  "router",
  "error"
];

blueprint.bundled.forEach(function(name) {
  blueprint.middleware[counter++] = require("./middleware/" + name);
});

// handle all middleware
blueprint.handle = function(request, response) {
  var index = 0;
  function next(request, response) {
    var current = blueprint.middleware[index++];
    // nothing on chain
    if (current === undefined) {
      return;
    } else {
      current(request, response, next);
    };
  };
  next(request, response);
};

// add a route
function addRoute(path, method, callback) {
  if (!blueprint.routes[path]) {
    blueprint.routes[path] = {};
  };
  blueprint.routes[path][method] = callback;
};

// GET
blueprint.get = function(path, callback) {
  addRoute(path, "GET", callback);
};

// PUT
blueprint.put = function(path, callback) {
   addRoute(path, "PUT", callback);
};

// POST
blueprint.post = function(path, callback) {
  addRoute(path, "POST", callback);
};

// DELETE
blueprint["delete"] = function(path, callback) {
  addRoute(path, "DELETE", callback);
};

// DRY
blueprint.dry = function(app) {
  models();
  controllers(app);
};

// listen (boot for framework?!)
blueprint.boot = function(port) {
  port = port || 8000;
  blueprint.dry(blueprint);
  blueprint.server.listen(port);
};

/* EOF */