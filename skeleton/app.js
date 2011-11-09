
/*!

  yourappname

*/

var mongoose = require("mongoose");
var blueprint = require("blueprint");

// CONFIG
var conf = [
  "domain":"yourdomain.com",
  "mongodb":"mongodb://localhost/test"
];

// CONNECT TO MONGO
mongo.connect(conf["mongodb"]);

// WAIT FOR MONGO.READY
mongo.connection.on("open", function() {
  blueprint.boot();
});

/* EOF */