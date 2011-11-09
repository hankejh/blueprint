
/*!

  blueprint::controller
  
*/

var fs = require("fs");
var util = require("util");
var url  = require("url");
var path = require("path");
var mongoose = require("mongoose");
var zone = require("./zone");

/*

   gangster inflection +
   also, how do we manage zone control on an automatic basis?

*/

String.prototype.routify = function() {
  if (this.charAt(this.length -1) == "y") {
    return "/" + this.slice(0, -1).toLowerCase() + "ies";
  } else if (this.charAt(this.length -1) == "h") {
    return "/" + this.toLowerCase() + "es";
  } else { 
    return "/" + this.toLowerCase() + "s";
  }
};

function router(app, model) {
  var route = modelName.routify();
  var theModel = model.model;
  var method = "GET";
  app.get(route, function(request, response) {  
    theModel.find({}, function(error, modelResults) {
      if (error) {
        responseData = { error : error.message };
        response.send(responseData, 404);
      } else {
        response.send(modelResults, 200);
      }
    });
  });
  route += "/:id";
  app.get(route, function(request, response) {
    theModel.findOne({ _id : request.params.id }, function(error, modelResult) {
      if (error) {
        responseData = { error : error.message };
        response.send(responseData, 404);
      } else {
        response.send(modelResult, 200);
      }
    });
  });
  route = modelName.routify() + "/find/:params";
  app.get(route, function(request, response) {
    var reg = new RegExp("^" + request.params);
    theModel.find({$or: [{ name : reg }, { prename : reg }]}, function(error, modelResults) {
      if (error) {
        responseData = { error : error.message };
        response.send(responseData, 404);
      } else {
        response.send(modelResults, 200);
      }
    });
  });
  method = "PUT";
  route = modelName.routify();
  app.put(route, function(request, response) {
    var item = new theModel();
    for (var key in request.body) {
      item[key] = request.body[key];
    }
    item.save(function(error, item) {
      if (error) {
        responseData = { error : error.message };
        response.send(responseData, 500);
      } else {
        response.send(item, 200);
      }
    });
  });
  method = "POST";
  app.post(route, function(request, response) {
    theModel.findOne({_id : request.body.id}, function(error, item) {
      if (error) {
        responseData = { error : error.message };
        response.send(responseData, 500);
      } else {
        for (var key in request.body.item) {
          item.doc[key] = request.body.item[key];
        }
        item.save(function(error) {
          if (error) {
            responseData = { error : error.message };
            response.send(responseData, 500);
          } else {
            response.send(item, 200);
          }
        });
      }
    });
  });
  method = "DELETE";
  route = modelName.routify() + "/:id";
  app.delete(route, function(request, response) {
    theModel.findOne({ _id : request.params.id }, function(error, modelResult) {
      if (error) {
        responseData = { error : error.message };
        response.send(responseData, 404);
      } else {
        modelResult.remove();
        response.send(modelResult, 200);
      }
    });
  });
  method = "DELETE";
  route = modelName.routify() + "/all";
  app.delete(route, function(request, response) {
    theModel.find({}, function(error, theModels) {
      for (var i = 0; i < theModels.length; i++) {
        theModels[i].remove();
      }
    });
  });
};

/*

  router setup with mapping.
  via https://github.com/MaxGfeller/

*/

var fs = require("fs");
var util = require("util");
var url  = require("url");
var express = require("express");
var mongoose = require("mongoose");

var zone = require("./zone");

function controller(app, file) {
  var controllerName = file.replace(".js", "");
  var parent = __dirname + "/../../../";
  var actions = require(path.normalize(parent + "/controllers/" + controllerName));
  var mapping = actions["mapping"];
  Object.keys(actions).map(function(action) {
    var fn = actions[action];
    if (typeof(fn) === "function") {
      if (MA = mapping[action]) {
        switch(MA.method) {
          case "GET":
            if (MA.auth === true) {
              app.get(MA.URL, zone, fn);
            } else {
              app.get(MA.URL, fn);
            }
            break;
          case "POST":
            if (MA.auth === true) {
              app.post(MA.URL, zone, fn);
            } else {
              app.post(MA.URL, fn);
            }
            break;
          case "PUT":
            if (MA.auth === true) {
              app.put(MA.URL, zone, fn);
            } else {
              app.put(MA.URL, fn);
            }
            break;
          case "DELETE":
            if (MA.auth === true) {
              app.del(MA.URL, zone, fn);
            } else {
              app.del(MA.URL, fn);
            }
            break;
        };
      };
    };
  });
};

module.exports = controllers = function(app) {
  var parent = __dirname + "/../../../";
  var controllerDir = path.normalize(parent + "/controllers");
  fs.readdir(controllerDir, function(error, files) {
    if (error) {
      throw error;
    }
    files.forEach(function(file) {
      controller(app, file);
    });
  });
};

/* EOF */