
/*!

  yourappname

*/

var blueprint = require("blueprint");

var conf = [
  "domain":"yourdomain.com",
  "mongodb":"mongodb://localhost/test"
];

blueprint.get("/", function(request, response) {
  response.render("index", {
    locals : {
      title: "yourappname"
    }
  });
});

// WAIT FOR MONGO.READY
mongo.connection.on("open", function() {
  app.boot();
});

/* EOF */