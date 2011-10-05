
/*!
 *
 *
 * ROUTER
 *
 *
 */

// core
var parse = require("url").parse;
var path = require("path");
var fs	= require("fs");

module.exports = router = function(request, response, next) {
  var path = parse(request.url).pathname;
  if (blueprint.routes[path] && blueprint.routes[path][request.method]) {
    var handle = blueprint.routes[path][request.method];
    handle.apply(this, arguments);  
  };
  next(request, response);
};

// 404
function notFound(request, response) {
  var no = function() {
    response.redirect("/404.html", 302);
  };
  // mime types
  var fileTypes = {
    ".json"	: "application/json",
    ".css"	: "text/css",
    ".png"	: "image/png",
    ".ico"	: "image/x-icon",
    ".html"	: "text/html",
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

/* EOF */