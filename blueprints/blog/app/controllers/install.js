
/*
  
  install
  -------
  /install/

*/

module.exports = {
  mapping:{
    "install":{
      "URL":"/install",
      "method":"GET",
      "auth":false  
    },
    "uninstall":{
      "URL":"/uninstall",
      "method":"GET",
      "auth":false  
    }
  },
  install : function(request, response) {
    var entry1 = new Post({
      title   : "blogging on blueprint",
      content : "<p>This is a skeleton install of a blog using <strong>blueprint</strong>. We use skeletons as demos then setup is as easy as <i>`blueprint myappname`</i>.</p>"
    });
    var entry2 = new Post({
      title   : "overview",
      content : "<p>Although a blog isn't the obvious (or best) use case for NodeJS, it is something that is extremely useful. If you want to run your entire stack with NodeJS, it's trivial to have your blog do likewise.</p>"
    });
    entry1.save(function(error, entry) {
      if (error) {
        throw new Error(error);
      };
    });
    entry2.save(function(error, entry) {
      if (error) {
        throw new Error(error);
      };
    }); 
    response.redirect("/");
  },
  uninstall : function(request, response) {
    Post.find({}, function(error, posts) {
      posts.forEach(function(post) {
        post.remove();
      });
    });
    response.redirect("/");
  }
}