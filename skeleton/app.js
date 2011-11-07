
/*!

  yourappname

*/

var blueprint = require("blueprint");

var conf = [
  "domain":"yourdomain.com"
];

blueprint.get("/", function(request, response) {
  response.render("index", {
    locals : {
      title: "yourappname"
    }
  });
});

blueprint.boot();

/* EOF */