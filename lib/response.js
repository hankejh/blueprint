
/*!

  RESPONSE

 */

var ejs = require("ejs");
var http = require("http");
var path = require("path");

// view directory
var views = path.normalize(__dirname + "/../../../views");

// response.send()
http.ServerResponse.prototype.send = function(message, code, type) {
  type = type || "text/html";
  code = code || 200;
  if (typeof(message) === "object") {
    message = JSON.stringify(message);
    type = "application/json";
  };
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
  var message = ejs.render(views + template, options);
  this.writeHead(200, {
    "Content-Type": type,
  });
  this.end(message);
};

/* EOF */