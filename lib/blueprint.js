/*!
 *
 *
 * BLUEPRINT
 *
 *
 */

// core
require("./response");
var http = require("http");
var sys = require("sys");
var path = require("path");
var fs = require("fs");

module.exports = blueprint = http.createServer(function(request, response) {
  blueprint.handle(request, response);
});

// middleware setup
blueprint.routes = {};
blueprint.middleware = [];

// setup bundled middleware
var counter = 0;
fs.readdirSync(__dirname + "/middleware").forEach(function(filename) {
  if (filename.substr(-3) !== ".js" || filename[0] === ".") {
    return;
  };
  var name = path.basename(filename, ".js");
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

// add a route, generic
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
  blueprint.listen(port);
};

// go
module.exports = blueprint;

/* EOF */