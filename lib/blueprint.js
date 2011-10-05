
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

module.exports = blueprint = http.createServer(function(request, response) {
  blueprint.handle(request, response);
});

// middleware setup
blueprint.routes = {};
blueprint.middleware = [];

var bundledMiddleware = [
  "router"
];

bundledMiddleware.forEach(function(item) {
  blueprint.middleware[item] = require("./middleware/" + item);
});

// handle all middleware
blueprint.handle = function(request, response, nextMiddleware) {
  var router = blueprint.middleware["router"];
  router(request, response, function(request, response) {
    console.log("done.");
  });
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