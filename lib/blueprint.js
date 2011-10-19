
/*!
 *
 *
 * BLUEPRINT
 *
 *
 */

// core
require("./response");
var models = new require("./models");
var http = require("http");
var sys = require("sys");
var path = require("path");
var fs = require("fs");

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

// setup bundled middleware
var counter = 0;
// ordered
blueprint.bundled = [
  "logger",
  "router"
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

// listen (boot for framework?!)
blueprint.boot = function(port) {
  port = port || 8080;
  blueprint.server.listen(port);
};

/* EOF */