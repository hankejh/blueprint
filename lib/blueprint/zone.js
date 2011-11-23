
/*!

  blueprint::zone

*/

var zone = exports.zone = function(request, response, next) {
  if (request.session && request.session.auth === true) {
    next();
  } else {
    response.redirect("/", 302);
  }
};

/* EOF */