
/*!

  blueprint::zone

*/

module.exports = zone = function(request, response, next) {
  if (request.session && request.session.auth === true) {
    next();
  } else {
    response.redirect("/", 302);
  }
};

/* EOF */