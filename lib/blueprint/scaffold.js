
/*

  blueprint.scaffold();
  blueprint.scaffold.usage();
  blueprint.scaffold.generate();

*/

var scaffold = exports.scaffold = function(command) {
  console.log(command);
}

scaffold.usage = function() {
  var help = "blueprint scaffold myRoute myModelItem\n";
  var help = "Commands:\n"+
    "help                 Display usage information\n"+
    "init                 Initialize a blueprint app\n"+
    "generate [mvc-item]  Generate a scaffold\n"+
    "routes               Display alls application routes\n";
  console.log(help);
};

scaffold.init = function(name) {
  console.log(name);
}

/* EOF */