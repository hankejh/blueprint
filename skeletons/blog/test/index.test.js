
/*!

  blueprint::tests
  node -e 'require("child_process").spawn("node", ["app.js"]).stdout.pipe(process.stdout)

*/

var http = require("http");
var vows = require("vows");
var assert = require("assert");
var should = require("should");
var request = require("request");
//var blueprint = require("blueprint");
var blueprint = require("../../../lib/blueprint.js");

vows.describe("blueprint instantiation tests").addBatch({
  "when we instantiate blueprint.createServer" : {
    topic : function () { 
      return blueprint;
    },
    "blueprint is an instance of http.Server()" : function (topic) {
      topic.should.be.an.instanceof(http.Server);
    }
  },
  "when we create a child process for /yourappname/app.js" : {
    topic : function() {
      var spawn = require("child_process").spawn;
      var child = spawn("node", ["app.js"]);
      request("http://localhost:8000/", this.callback)
    },
    "we should get back a message with the text, no error and a status code of 200" : function(error, response, body) {
      assert.isNull(error);
      assert.equal(response.statusCode, 200);
      assert.equal(typeof(body), "string");
    }
  }
}).export(module);

/* EOF */