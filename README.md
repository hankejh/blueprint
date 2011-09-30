
blueprint
=========

```javascript
var blueprint = require("blueprint");

blueprint.get("/", function(request, response, data) {
	response.write("<h1>hello blueprint</h1>");
});

blueprint.boot(80);

/* EOF */
```