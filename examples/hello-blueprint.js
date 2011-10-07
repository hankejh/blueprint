
var blueprint = require("../");

blueprint.createServer();

blueprint.get("/", function(request, response) {
  response.send("<h1>hello blueprint</h1>");
});

blueprint.get("/data", function(request, response) {
  var data = { message : "success" };
  response.send(data, 200);
});

blueprint.boot(8080);

/* EOF*/