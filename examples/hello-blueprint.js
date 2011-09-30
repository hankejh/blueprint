
var blueprint = require("../");

blueprint.get("/", function(request, response) {
	response.writeHead(200, { "Content-Type" : "text/html" });
	response.end("<h1>hello blueprint</h1>");
});

blueprint.boot(80);

/* EOF */