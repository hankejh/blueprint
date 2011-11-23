
/*

  blueprint.Router

  http.ServerResponse.send(json/test);
  http.ServerResponse.prototype.writeVersionHeader();
  http.ServerResponse.redirect(route, statusCode)

*/

var http = require("http");

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
  
  create an http.Server
  server uses Router by default
  - handle

*/

var handle = exports.handle = function(request, response) {
  var fn = Router
};

var Server = exports.Server;

var createServer = exports.createServer = function() {
  Server = http.createServer();
  Server.on("request", function handler(request, response) {
    handle(request, response);
  });
  return Server;
};

var listen = function(port) {
  port = port || 8000;
  Server.listen(port);
};

/*
  
  blueprint.Router
  blueprint.Router.params
  blueprint.Router.routes

*/

var Routes = exports.Routes = {};

Server.get = function(route, fn) {
  routes[route] = fn;
};

/* EOF */