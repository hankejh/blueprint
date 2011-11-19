
/*
  
  install
  -------
  GET /admin/install/
  GET /admin/uninstall
  GET /admin/login/
  POST /admin/login/

*/

function niceifyCurrent() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var niceDate = month+"."+day+"."+year;
  return niceDate;
};

module.exports = {
  mapping:{
    "install":{
      "URL":"/admin/install",
      "method":"GET",
      "auth":false  
    },
    "uninstall":{
      "URL":"/admin/uninstall",
      "method":"GET",
      "auth":false  
    },
    "login":{
      "URL":"/admin/login",
      "method":"GET",
      "auth":false
    }
  },
  install : function(request, response) {
    var entry1 = new Post({
      slug    : "blogging-on-blueprint",
      title   : "blogging on blueprint",
      content : "<p>This is a skeleton install of a blog using <strong>blueprint</strong>. We use skeletons as demos then setup is as easy as <i>`blueprint myappname`</i>.</p>",
      created_at_nice : niceifyCurrent()
    });
    var entry2 = new Post({
      slug    : "overview",
      title   : "overview",
      content : "<p>Although a blog isn't the obvious (or best) use case for NodeJS, it is something that is extremely useful. If you want to run your entire stack with NodeJS, it's trivial to have your blog do likewise.</p>",
      created_at_nice : niceifyCurrent()
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
  },
  login : function(request, response) {
    response.render("login", {
      locals : {
        title : "admin | login"
      }
    });
  }
}

/* EOF */