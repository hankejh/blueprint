
var vows = require("vows");
var assert = require("assert");
var should = require("should");
var request = require("request");

var blueprint = require("../lib/blueprint");

vows.describe("Template Tests").addBatch({
  "when spawning a child process for /templates/app.js":{
    topic:function(){ 
      var app = blueprint.createServer();
      app.get("/", false, function(request, response) {
        response.send("don't taze me bro!");
      })
      app.listen(8001);
      request("http://localhost:8001/", this.callback);
    },
    "blueprint.scaffold should be a function":function(error, response, body){
      assert.equal(error, null);
    }
  }
}).export(module);

/* EOF */