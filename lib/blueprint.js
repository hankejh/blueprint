
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
var buffer = require("buffer").Buffer;
var path = require("path");
var fs	= require("fs");

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
    var length;
    var encoding;
    var type =  type || "text/html";
    if (typeof(message) === "object" && !(message instanceof buffer)) {
        message = JSON.stringify(message);
        type = "application/json";
    }
    code = code || 200;
    length = message.length;
    if (typeof message === "string") {
        length = buffer.byteLength(message);
        encoding = "utf8";
    }
    this.writeHead(code, {
        "Content-Type": type,
        "Content-Length": length
    });
    this.end(message, encoding);
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
  var fileType = {
    ".json"	: "application/json",
    ".css"	: "text/css",
    ".png"	: "image/png",
    ".ico"	: "image/x-icon",
    ".html"	: "text/html",
  };
  // check for mime types
  var getMime = function(extension) {
    extension = extension.toLowerCase();
    return fileType[extension] ? fileType[extension] : "application/octet-stream";
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

// listen (boot for framework?!)
blueprint.boot = function(port) {
  var port = port || 8080;
  blueprint.listen(port);
  console.log("[BLUEPRINT] ".green + "> listening on port " + port);
};

/* EOF */