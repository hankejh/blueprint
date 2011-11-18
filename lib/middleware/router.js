
/*!

  ROUTER

 */

var path = require("path");
var parse = require("url").parse;

module.exports = router = function(request, response, next) {
  var path = parse(request.url).pathname;
  if (blueprint.routes[path] && blueprint.routes[path][request.method]) {
    var handle = blueprint.routes[path][request.method];
    handle.apply(this, arguments);  
    next(request, response);
  } else {
    next(request, response);
  }
};

/* EOF */