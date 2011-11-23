
/*

  blueprint.Router

  http.ServerResponse.send(json/test);
  http.ServerResponse.prototype.writeVersionHeader();
  http.ServerResponse.redirect(route, statusCode)

*/

var fs  = require("fs");
var http = require("http");
var path = require("path");
var mime = require("mime");
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

  middleware
    - logger
    - static file serving
    - 404

*/

var logger = function(request, response) {
  var host = request.headers.host;
  var path = parse(request.url).pathname;
  var method = request.method;
  var currentTime = new Date();
  var month = currentTime.getMonth() + 1;
  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var date = month + "/" + day + "/" + year + ":";
  var time = hours + ":" + minutes;
  var fullPath = "http://" + host + path;
  var msg = date + time +  ' "' + method.toUpperCase() + '" ' + fullPath;
  console.log("> blueprint: " + msg);
};

var staticHandler = function(request, response) {
  var staticFile = path.normalize(process.cwd() + "/public" + request.url);
  fs.stat(staticFile, function(error, results) {
    if (error) {
      var errorPageFile = path.normalize(__dirname + "/public/404.html");
      response.writeHead(404, {
        "Content-Type": "text/html"
      });
      fs.createReadStream(errorPageFile, {"bufferSize" : 32 * 1024 }).pipe(response);
    } else {
      var type = mime.lookup(staticFile);
      response.writeHead(200, {
        "Content-Type": type,
        "Content-Length": results.size
      });
      fs.createReadStream(staticFile, {"bufferSize" : 32 * 1024 }).pipe(response);
    };
  });
};

var handle = function(request, response) {
  var pathname = parse(request.url).pathname;
  if (routes[pathname] && routes[pathname][request.method]) {
    logger(request, response);
    var handle = routes[pathname][request.method];
    handle.apply(this, arguments);  
  } else {
    staticHandler(request, response);
  }
};

/*
  
  create an http.Server
  server uses Router by default
  - handle

*/

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