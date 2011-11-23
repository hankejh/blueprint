

/*!

  ERROR

 */

var fs  = require("fs");
var path = require("path");
var mime = require("mime");
var parse = require("url").parse;

module.exports = static = function(request, response, next) {
  var pathname = parse(request.url).pathname;
  if (blueprint.routes[pathname] === undefined || blueprint.routes[pathname][request.method] === undefined) {
    var staticFile = path.normalize(__dirname + "/../../../../public" + request.url);
    fs.stat(staticFile, function(error, results) {
      if (error) {
        var errorPageFile = path.normalize(__dirname + "/../public/404.html");
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
  next(request, response);
};

/* EOF */