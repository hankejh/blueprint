
/*!
 *
 *
 * RESPONSE
 *
 *
 */

var http = require("http");

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

/* EOF */