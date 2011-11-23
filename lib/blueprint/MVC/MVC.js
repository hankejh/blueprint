
var models = require("./models");
var controllers = require("./controllers");

var MVC = exports.MVC = function(app) {
  models();
  controllers(app);
};