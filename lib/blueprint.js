
/*!
 *
 *
 * BLUEPRINT
 *
 *
 */

// core
require("colors");
var parse = require("url").parse;
var http = require("http");

// routes
var routes = {};

// main
module.exports = blueprint = http.createServer(function(request, response) {
  var path = parse(request.url).pathname;
  if (routes[path] && routes[path][request.method]) {
    handler = routes[path][request.method];
    response.write = function(data, contentType) {
    	return blueprint.write(response, data, contentType);
    };
   	handler(request, response);
	} else {
    // 404!
    notFound.apply(this, arguments);
  };
});

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

// remap response.write();
blueprint.write = function(response, string, contentType) {
	response.writeHead(200, { "Content-Type" : "text/html" });
	response.end(string);
};

// 404
function notFound(request, response) {
  response.writeHead(404, { "Content-Type" : "text/html" });
  response.end("<h1>error 404</h1>");
};

// listen (boot for framework?!)
blueprint.boot = function(port) {
  var port = port || 8080;
  blueprint.listen(port);
  console.log("[BLUEPRINT] ".green + "> listening on port " + port);
};

/* EOF */