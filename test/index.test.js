
// core
var vows = require("vows");
var assert = require("assert");
var should = require("should");
var request = require("request");
var http = require("http");

// our blueprint current
var blueprint = new require("../");

// basic tests
vows.describe("Blueprint Instantiation Tests").addBatch({
  "When we instantiate blueprint.createServer" : {
    topic : function () { 
      blueprint.createServer();
      return blueprint.server;
    },
    "blueprint.server is an instance of http.Server()" : function (topic) {
      topic.should.be.an.instanceof(http.Server);
    }
  },
  "When we .boot blueprint and request /data" : {
    topic : function() {
      // setup
      blueprint.createServer();
      blueprint.get("/", function(request, response) {
        response.send("<h1>hello blueprint</h1>");
      });
      blueprint.boot(8080);
      // request
      request("http://localhost/", this.callback);
    },
    "we should get JSON back with a message of 'hello' and no error"  : function(error, response, body) {
      assert.isNull(error);
    }
  }
}).export(module);

/* EOF */