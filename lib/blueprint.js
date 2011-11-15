
/*!

  blueprint::main
  https://github.com/ingklabs/blueprint/
  Blueprint for an App. Middleware, & MVC routing over Node.js & Mongoose 

*/

// core
var fs  = require("fs");
var url = require("url");
var http = require("http");
var parse = require("url").parse;
var buffer = require("buffer").Buffer;
var path = require("path");

var mongoose = require("mongoose");
var models = require("./models");
var controllers = require("./controllers");

// DRY
blueprint.dry = function() {
  models();
  controllers(blueprint);
};

// routes
var routes = {};

// blueprint(){}
module.exports = blueprint = http.createServer(function(request, response) {
  var path = parse(request.url).pathname;
  if (routes[path] && routes[path][request.method]) {
    handler = routes[path][request.method];
     handler.apply(this, arguments);
  } else {
    // 404!
    notFound.apply(this, arguments);
  };
});

// response.send()
http.ServerResponse.prototype.send = function(message, code, type) {
    var type = type || "text/html";
    if (typeof(message) === "object") {
        message = JSON.stringify(message);
        type = "application/json";
    };
    this.writeHead(code, {
        "Content-Type": type,
    });
    this.end(message);
};

// redirect
http.ServerResponse.prototype.redirect = function(url, code) {
  code = code || 302;
  this.writeHead(code, {
    "Location" : url
  });
  this.end();
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

// 404
function notFound(request, response) {
  var no = function() {
    response.redirect("/404.html", 302);
  };
  // mime types
  var fileTypes = {
    ".json" : "application/json",
    ".css"  : "text/css",
    ".png"  : "image/png",
    ".ico"  : "image/x-icon",
    ".html" : "text/html",
  };
  // check for mime types
  var getMime = function(extension) {
    extension = extension.toLowerCase();
    return fileTypes[extension] ? fileTypes[extension] : "application/octet-stream";
  };
  // static file to check for
   var staticFile = path.normalize(__dirname + "/../public" + request.url);
  fs.stat(staticFile, function(error, results) {
    if (error) {
      no();
    } else {
      var mime = getMime(path.extname(staticFile));
      response.writeHead(200, {
        "Content-Type": mime,
         "Content-Length": results.size
      });
      fs.createReadStream(staticFile, {"bufferSize" : 32 * 1024 }).pipe(response);
    };
  });
};

// boot/listen
blueprint.boot = function(port) {
  port = port || 8000;
  blueprint.dry();
  blueprint.listen(port);
};

/* EOF */