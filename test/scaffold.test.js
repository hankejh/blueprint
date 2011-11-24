
var vows = require("vows");
var assert = require("assert");
var should = require("should");
var request = require("request");

var blueprint = require("../lib/blueprint");

vows.describe("Scaffold Tests").addBatch({
  "when requiring blueprint.scaffold":{
    topic:function(){ 
      return blueprint.scaffold;
    },
    "blueprint.scaffold should be a function":function(topic){
      topic.should.be.a("function");
    }
  }
}).export(module);

/* EOF */