
/*
  
  Blog

*/

module.exports = {
  mapping:{
    "index":{
      "URL":"/",
      "method":"GET",
      "auth":false  
    },
    "posts":{
      "URL":"/posts",
      "method":"GET",
      "auth":false
    }
  },
  index : function(request, response) {
    Post.getLatestPosts(function(error, posts) {
      response.render("index", {
        locals : {
          title : "blueprint",
          posts : posts
        }
      });
    });
  },
  posts : function (request, response) {
    Post.find().sort("date_updated", "descending").find({}, function(error, posts) {
      if (error) {
        throw new Error(error);
      } else {
       response.send(posts); 
      }
    });
  }
};

/* EOF */