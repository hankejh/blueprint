#!/usr/bin/env node

var path = require("path");
var wrench = require("wrench");
var arguments = process.argv.slice(2);

function generate(name) {
  var source = path.normalize(__dirname + "/../blueprint/blog");
  var destination = path.normalize(process.cwd()+"/"+name);
  console.log(source+"\n"+destination);
  wrench.copyDirSyncRecursive(source, destination);
};

switch(arguments[0]) {
  case "--help":
    console.log("USAGE: blueprint <yourappname>");
    break;
  default:
    generate(arguments[0]);
    break;
};

/* EOF */