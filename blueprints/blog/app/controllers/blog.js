
/*
  
  blog
  ----
  /
  /posts/

*/

function niceify(mongoDate) {
  var date = new Date(mongoDate);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var niceDate = month+"."+day+"."+year;
  return niceDate;
};

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
    Post.getLatestPosts(function(error, results) {
      var posts = [];
      results.forEach(function(post) {
        var edited = {
          title : post.title,
          content : post.content,
          created_at : niceify(post.created_at),
          comment_count : post.comment_count
        };
        posts.push(edited);
      });
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