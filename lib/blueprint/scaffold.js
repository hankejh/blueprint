
/*

  blueprint.scaffold();
  blueprint.scaffold.usage();
  blueprint.scaffold.generate();

*/

var path = require("path");
var wrench = require("wrench");

var scaffold = exports.scaffold = function(command) {
  console.log(command);
}

scaffold.usage = function() {
  var help = "blueprint scaffold myRoute myModelItem\n";
  var help = "USAGE:\n"+
    "\thelp                 Display usage information\n"+
    "\tinit                 Initialize a blueprint app\n"+
    "\tgenerate [mvc-item]  Generate a scaffold\n"+
    "\troutes               Display alls application routes\n";
  console.log(help);
};

scaffold.init = function(name) {
  var source = path.normalize(process.cwd() + "/templates");
  var destination = path.normalize(process.cwd()+"/"+name);
  wrench.copyDirSyncRecursive(source, destination);
}

/* EOF */