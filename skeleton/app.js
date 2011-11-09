/*!

  yourappname

*/

var mongoose = require("mongoose");
var blueprint = require("blueprint");

// CONFIG
var conf = {
  "domain":"yourdomain.com",
  "mongodb":"mongodb://admin:aPugIsSm^l1@boone.mongohq.com:10033/clientq"
};

// CONNECT TO MONGO
mongoose.connect(conf["mongodb"]);

// WAIT FOR MONGO.READY
mongoose.connection.on("open", function() {
  blueprint.boot();
});

/* EOF */