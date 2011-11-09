
/*!

  blueprint::main
  https://github.com/ingklabs/blueprint/
  Blueprint for an App. Middleware, & MVC routing over Node.js & Mongoose 

*/

var path = require("path");
var mongoose = require("mongoose");
var express = require("express");
var models = require("./models");
var controllers = require("./controllers");

module.exports = blueprint = express.createServer();

blueprint.configure(function() {
  var parent = __dirname + "/../../../";
  blueprint.use(express.logger({ format: ":method :url :status" }));
  blueprint.use(express.static(path.normalize(parent + "public")));
  blueprint.set("views", path.normalize(parent + "views"));
  blueprint.set("view engine", "ejs");
  blueprint.set("view options", {
    layout: "layout.ejs"
  });
  blueprint.use(express.bodyParser());
  blueprint.use(express.cookieParser());
  blueprint.use(express.session({
    secret: "changeMe"
  }));
});

blueprint.configure("production", function () {
  app.use(express.errorHandler());
});

blueprint.configure("development", function () {
    blueprint.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
});

blueprint.dynamicHelpers({
  session: function (request, response) {
    return request.session;
  }
});

blueprint.dry = function() {
  models();
  controllers(blueprint);
};

blueprint.boot = function(port) {
  port = port || 8000;
  blueprint.dry();
  blueprint.listen(port);
};

/* EOF */