
// core
var vows = require("vows");
var assert = require("assert");
var should = require("should");
var request = require("request");
var http = require("http");

// our blueprint current
var blueprint = new require("../");

// basic tests
vows.describe("Blueprint is a working instance of HTTP.Server").addBatch({
    "When we instantiate blueprint": {
        topic : function () { 
            return blueprint;
        },
        "we get an instance of http.Server()": function (topic) {
            topic.should.be.an.instanceof(http.Server);
        }
    }
}).export(module);

/* EOF */