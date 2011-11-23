
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
  console.log(help);
};