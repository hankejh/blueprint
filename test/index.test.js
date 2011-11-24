
var vows = require("vows");
var assert = require("assert");
var should = require("should");
var request = require("request");

var blueprint = require("../lib/blueprint");

vows.describe("General Module Tests").addBatch({
  "when requiring blueprint":{
    topic:function(){ 
      return blueprint;
    },
    "blueprint should be an object":function(topic){
      topic.should.be.a("object");
    }
  },
  "when creating an index route with a response":{
    topic:function(){
      var app = blueprint.createServer();
      app.get("/", false, function(request, response) {
        response.send({message:"don't taze me bro!"});
      });
      app.listen(9000);
      request("http://localhost:9000/", this.callback);
    },
    "we should be able to make a request and get back text/html, a 200 response code":function(error, response, body){
      assert.equal(error, null);
      assert.equal(response.statusCode, 200);
      assert.equal(response.headers["content-type"], "application/json");
    }
  },
  "when we serve up a non existing route":{
    topic:function(){
      request("http://localhost:9000/fake-stuff/", this.callback);
    },
    "we should be able to make a request and get back text/html, with a 404 response code":function(error, response, body){
      assert.equal(error, null);
      assert.equal(response.statusCode, 404);
    }
  }
}).export(module);

/* EOF */