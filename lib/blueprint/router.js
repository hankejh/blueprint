
/*

  blueprint.Router

  http.ServerResponse.send(json/test);
  http.ServerResponse.prototype.writeVersionHeader();
  http.ServerResponse.redirect(route, statusCode)

*/

var http = require("http");
var parse = require("url").parse;

http.ServerResponse.prototype.writeVersionHeader = function() {
  this.setHeader("X-Powered-By", "blueprint/0.3.3");
};

http.ServerResponse.prototype.send = function(message, code, type) {
  type = type || "text/html";
  code = code || 200;
  if (typeof(message) === "object") {
    message = JSON.stringify(message);
    type = "application/json";
  };
  this.writeVersionHeader();
  this.writeHead(code, { "Content-Type": type });
  this.end(message);
};

http.ServerResponse.prototype.redirect = function(url, code) {
  code = code || 302;
  this.writeHead(code, { "Location" : url });
  this.end();
};

/*
  
  blueprint.Router
  blueprint.Router.params
  blueprint.Router.routes

  addRoute
  - GET
  - PUT
  - POST
  - DELETE

*/

var routes = {};

function addRoute(path, method, fn) {
  routes[path] = {};
  routes[path][method] = fn;
};

/*
  
  create an http.Server
  server uses Router by default
  - handle

*/

var handle = function(request, response) {
  var path = parse(request.url).pathname;
  if (routes[path] && routes[path][request.method]) {
    var handle = routes[path][request.method];
    handle.apply(this, arguments);  
  };
};

http.Server.prototype.get = function(path, callback) {
  addRoute(path, "GET", callback);
};

http.Server.prototype.put = function(path, callback) {
  addRoute(path, "PUT", callback);
};

http.Server.prototype.post = function(path, callback) {
  addRoute(path, "POST", callback);
};

http.Server.prototype.delete = function(path, callback) {
  addRoute(path, "DELETE", callback);
};

var createServer = exports.createServer = function() {
  var Server = http.createServer();
  Server.on("request", function theHandler(request, response) {
    handle(request, response);
  });
  return Server;
};

/* EOF */