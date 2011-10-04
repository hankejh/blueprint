
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
    "When we instantiate blueprint" : {
        topic : function () { 
            return blueprint;
        },
        "we get an instance of http.Server()": function (topic) {
            topic.should.be.an.instanceof(http.Server);
        }
    },
    "When we .boot blueprint" : {
    	topic : function() {
    		
    	}
    }
}).export(module);

/* EOF */