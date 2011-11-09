
/*!

  blueprint::tests

*/

var http = require("http");
var vows = require("vows");
var assert = require("assert");
var should = require("should");
var request = require("request");
var blueprint = new require("blueprint");

vows.describe("Blueprint Instantiation Tests").addBatch({
  "When we instantiate blueprint.createServer" : {
    topic : function () { 
      return blueprint;
    },
    "blueprint is an instance of http.Server()" : function (topic) {
      topic.should.be.an.instanceof(http.Server);
    }
  },
  "When we .boot blueprint and request '/'" : {
    topic : function() {
      blueprint.boot();
      request("http://localhost:8000/", this.callback);
    },
    "we should get back a message with the text, no error and a status code of 200" : function(error, response, body) {
      assert.isNull(error);
      assert.equal(response.statusCode, 200);
      assert.equal(typeof(body), "string");
    }
  }
}).export(module);

/* EOF */