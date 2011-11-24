
var vows = require("vows");
var assert = require("assert");
var should = require("should");
var request = require("request");

var blueprint = require("../lib/blueprint");

vows.describe("Template Tests").addBatch({
  "when requiring blueprint.scaffold":{
    topic:function(){ 
      return blueprint.scaffold;
    },
    "blueprint.scaffold should be a function":function(topic){
      topic.should.be.a("function");
    }
  },
  "when setting up models and controllers":{
    topic:function(){
      blueprint.load("models", "../templates/models/");
      blueprint.load("controllers", "../templates/controllers/");
      // return something?
      return true;
    },
    "we should no errors":function(topic){
      assert.equal(topic, true);
    }
  }
}).export(module);

/* EOF */