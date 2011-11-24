
/*!

  blueprint.zone(request, response);

*/

var zone = exports.zone = function(request, response) {
  if (!request.session || request.session.auth === true) {
    response.redirect("/", 302);
  };
};

/* EOF */