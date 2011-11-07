#!/usr/bin/env node

require("colors");
var fs = require("fs");
var ARGS = process.argv.slice(2);

function generate(name) {
  console.log(name);
};

switch (ARGS[0]) {
  case "--help":
    console.log("USAGE: blueprint <yourappname>".magenta);
    break;
  default:
    generate(ARGS[0]);
    break;
};

/* EOF */