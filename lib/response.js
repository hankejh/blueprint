
/*!
 *
 *
 * RESPONSE
 *
 *
 */

var http = require("http");

// response.send()
http.ServerResponse.prototype.send = function(message, code, type) {
    type = type || "text/html";
    code = code || 200;
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

// 404 | static provider
function notFound(request, response, next) {
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
  next();
};

/* EOF */