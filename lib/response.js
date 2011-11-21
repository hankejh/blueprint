
/*!

  RESPONSE

 */

var fs = require("fs");
var ejs = require("ejs");
var http = require("http");
var path = require("path");

// header version
http.ServerResponse.prototype.writeVersionHeader = function() {
  this.setHeader("X-Powered-By", "blueprint/0.3.2");
};

// response.send()
http.ServerResponse.prototype.send = function(message, code, type) {
  type = type || "text/html";
  code = code || 200;
  if (typeof(message) === "object") {
    message = JSON.stringify(message);
    type = "application/json";
  };
  this.writeVersionHeader();
  this.writeHead(code, {
    "Content-Type": type,
  });
  this.end(message);
};

// redirect
http.ServerResponse.prototype.redirect = function(url, code) {
  code = code || 302;
  this.writeHead(code, {
    "Location" : url
  });
  this.end();
};

// render ejs
http.ServerResponse.prototype.render = function(template, options) {
  var view = path.normalize(__dirname + "/../../../app/views/" + template + ".ejs");
  var template = fs.readFileSync(view, "utf8");
  var message = ejs.render(template, options);
  this.writeVersionHeader();
  this.writeHead(200, {
    "Content-Type": "text/html",
  });
  this.end(message);
};

/* EOF */