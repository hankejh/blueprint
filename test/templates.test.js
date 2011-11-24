
var vows = require("vows");
var assert = require("assert");
var should = require("should");
var request = require("request");
var spawn = require("child_process").spawn;

var blueprint = require("../lib/blueprint");

vows.describe("Template Tests").addBatch({
  "when spawning a child process for /templates/app.js":{
    topic:function(){
      var dir = process.cwd() + "/templates/";
      var child = spawn("node", ["app.js"], { cwd : dir });
      request("http://localhost:8000/", this.callback);
    },
    "blueprint.scaffold should be a function":function(error, response, body){
      assert.equal(error, null);
    }
  }
}).export(module);

/* EOF */