
var blueprint = require("../");

blueprint.get("/", function(request, response) {
	response.write("<h1>hello blueprint</h1>");
});

blueprint.boot(80);

/* EOF */