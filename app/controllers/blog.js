
module.exports = {
  mapping:{
    "index":{
      "URL":"/",
      "method":"GET",
      "auth":false  
    } 
  },
  index : function(request, response) {
    Post.find({}, function(error, posts) {
      response.render("index", {
        locals : {
          title : "blueprint.blog",
          posts : posts
        }
      });
    });
  }
};

/* EOF */