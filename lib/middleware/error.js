

/*!

  ERROR

 */

var fs  = require("fs");
var path = require("path");

module.exports = error = function(request, response, next) {
  var errorPageFile = path.normalize(__dirname + "/../public/404.html");
  fs.createReadStream(errorPageFile, {"bufferSize" : 32 * 1024 }).pipe(response);
  next(request, response);
};

/* EOF */