
/*!

  blueprint::main
  https://github.com/ingklabs/blueprint/
  Blueprint for an App. Middleware, & MVC routing over Node.js & Mongoose 

*/

var colors = require("colors");
var mongoose = require("mongoose");
var express = require("express");

module.exports = blueprint = express.createServer();

// Configuration
blueprint.configure(function() {
  blueprint.use(express.logger({ format: ":method :url :status" }));
  blueprint.use(express.static(__dirname + "/public"));
  blueprint.set("views", __dirname + "/views");
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

blueprint.boot = function(port) {
  port = port || 8000;
  blueprint.listen(port);
};

/* EOF */