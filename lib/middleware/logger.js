
/*!
 *
 *
 * LOGGER
 *
 *
 */

// core
require("colors");
var parse = require("url").parse;
var path = require("path");

module.exports = logger = function(request, response, next) {
  var path = parse(request.url).pathname;
  var method = request.method;
  var currentTime = new Date();
  var month = currentTime.getMonth() + 1;
  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var date = month + "." + day + "." + year + " @ ";
  var time = hours + ":" + minutes;
  var msg = date + time + " " + method.toUpperCase() + ' "' + path + '"';
  console.log("[BLUEPRINT] ".green + msg);
  next(request, response);
};

/* EOF */