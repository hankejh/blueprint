
/*!

  blueprint::tests

*/

var http = require("http");
var vows = require("vows");
var assert = require("assert");
var should = require("should");
var request = require("request");
var blueprint = require("blueprint");

vows.describe("Blueprint Instantiation Tests").addBatch({
  "When we instantiate blueprint.createServer" : {
    topic : function () { 
      return blueprint;
    },
    "blueprint is an instance of http.Server()" : function (topic) {
      topic.should.be.an.instanceof(http.Server);
    }
  }
}).export(module);

/* EOF */