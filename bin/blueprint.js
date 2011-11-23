#!/usr/bin/env node

var blueprint = require("../lib/blueprint");
var scaffold = blueprint.scaffold;

var args = process.argv.slice(2);
var command = args.shift();

if (command === undefined) {
  return false;
};

switch(command) {
  case "help":
    scaffold.usage();
    break
  case "--help":
    scaffold.usage();
    break;
  default:
    scaffold.usage();
    break;
}