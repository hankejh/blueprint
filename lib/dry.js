
var models = require("./models");
var controllers = require("./controllers");
var blueprint = require("./blueprint");

blueprint.dry = function(app) {
  models();
  controllers(app);
};