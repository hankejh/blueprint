
module.exports = {
  mapping:{
    "index":{
      "URL":"/",
      "method":"GET",
      "auth":false  
    } 
  },
  index : function(request, response) {
    Post.getLatestPosts(function(posts) {
      response.render("index", {
        locals : {
          title : "blueprint",
          posts : posts
        }
      });
    });
  }
};

/* EOF */