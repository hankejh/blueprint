
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

var zone = require("./zone");

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

function addRoute(path, method, auth, fn) {
  routes[path] = {};
  routes[path]["auth"] = auth;
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
      response.redirect("/404.html", 404);
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
    if (routes[pathname["auth"]] === true) {
      zone(request, response);
    };
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

["get", "put", "post", "delete"].forEach(function(protocol) {
  http.Server.prototype[protocol] = function(path, auth, callback) {
    addRoute(path, protocol.toString().toUpperCase(), auth, callback);
  };
});

var createServer = exports.createServer = function() {
  var Server = http.createServer();
  Server.on("request", function theHandler(request, response) {
    handle(request, response);
  });
  return Server;
};

/* EOF */