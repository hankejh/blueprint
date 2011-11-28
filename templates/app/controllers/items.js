
/*

  default route
  fetch all "Item"'s

*/

module.exports = controllers = function(app) {
  app.get("/", false, function(request, response) {
    Item.find({}, function(error, items) {
      if (error) {
        console.error(error);
      } else {
        response.send(items);
      }
    });
  });
};