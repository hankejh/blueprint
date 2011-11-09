
/*!

  blueprint::tests

*/

var vows = require("vows");
var assert = require("assert");
var should = require("should");
var request = require("request");
var http = require("http");

var blueprint = new require("../");

vows.describe("Blueprint Instantiation Tests").addBatch({
  "When we instantiate blueprint.createServer" : {
    topic : function () { 
      return blueprint;
    },
    "blueprint is an instance of http.Server()" : function (topic) {
      topic.should.be.an.instanceof(http.Server);
    }
  },
  "When we .boot blueprint and request /data" : {
    topic : function() {
      blueprint.get("/", function(request, response) {
        response.send("<h1>hello blueprint</h1>");
      });
      blueprint.boot();
      request("http://localhost:8000/", this.callback);
    },
    "we should get JSON back with a message of 'hello' and no error"  : function(error, response, body) {
      assert.isNull(error);
    }
  }
}).export(module);

/* EOF */