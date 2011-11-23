
/*!

  blueprint::main
  https://github.com/ingklabs/blueprint/
  Blueprint for an App. Middleware, & MVC routing over Node.js & Mongoose 

*/

require("./response");
var fs  = require("fs");
var url = require("url");
var http = require("http");
var parse = require("url").parse;
var buffer = require("buffer").Buffer;
var path = require("path");
var mongoose = require("mongoose");

module.exports = blueprint = function(){};

require("./conf");
var dry = require("./dry");

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

var counter = 0;

// ordered
blueprint.bundled = [
  "logger",
  "router",
  "static"
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

// http.Server.listen(port)
blueprint.boot = function(port) {
  port = port || 8000;
  blueprint.dry(blueprint);
  blueprint.server.listen(port);
};

/* EOF */