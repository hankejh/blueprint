
/*!
 *
 *
 * BLUEPRINT
 *
 *
 */

// core
require("colors");
require("./response");
var parse = require("url").parse;
var http = require("http");
var path = require("path");
var sys = require("sys");
var fs  = require("fs");

// routes
var routes = {};

// blueprint(){}
module.exports = blueprint = http.createServer(function(request, response) {
  blueprint.handle(request, response);
});

// load bundled middleware
blueprint.loadBundledMiddleware = function() {
  var middleware = [
    "router"
  ];
  middleware.forEach(function(item) {
    // write the router :P
    //require("./middleware/"+item);
  });
};

// handle all middleware
blueprint.handle = function(request, response, nextMiddleware) {
  function next(request, response) {
    if (nextMiddleware) {
      nextMiddleware(request, response);
      return;
    } else {
      var path = parse(request.url).pathname;
      if (routes[path] && routes[path][request.method]) {
        var router = routes[path][request.method];
        router.apply(this, arguments);
      };
    };
  };
  next(request, response);
};

// add a route, generic
function addRoute(path, method, callback) {
  if (!routes[path]) {
    routes[path] = {};
  };
  routes[path][method] = callback;
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
  var port = port || 3000;
  blueprint.listen(port);
};

// load bundled middleware by default
blueprint.loadBundledMiddleware();

/* EOF */