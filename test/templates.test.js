
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
      console.log(dir);
      var child = spawn("node", ["app.js"], { cwd : dir });
      child.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });
      child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });
      child.on('exit', function (code) {
        console.log('child process exited with code ' + code);
      });
      request("http://localhost:8000/", this.callback);
    },
    "blueprint.scaffold should be a function":function(error, response, body){
      assert.equal(error, null);
    }
  }
}).export(module);

/* EOF */