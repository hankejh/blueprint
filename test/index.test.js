
// core
var blueprint = require("../");
var mongoose = require("mongoose");

/*blueprint.get("/", function(request, response) {
	response.send("<h1>hello blueprint</h1>");
});

blueprint.get("/data", function(request, response) {
	var data = { message : "success" };
	response.send(data, 200);
});

blueprint.boot(8080);*/

var vows = require("vows");
var assert = require("assert");

// Create a Test Suite
vows.describe('Division by Zero').addBatch({
    'when dividing a number by zero': {
        topic: function () { return 42 / 0 },

        'we get Infinity': function (topic) {
            assert.equal (topic, Infinity);
        }
    },
    'but when dividing zero by zero': {
        topic: function () { return 0 / 0 },

        'we get a value which': {
            'is not a number': function (topic) {
                assert.isNaN (topic);
            },
            'is not equal to itself': function (topic) {
                assert.notEqual (topic, topic);
            }
        }
    }
}).export(module);

/* EOF */