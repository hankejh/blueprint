
/*

  Models::Post
 
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var post_schema = {
  id          : { type : ObjectId },
  title       : { type : String },
  content     : { type : String },
  created_at  : { type : Date, default : Date.now }
};

var PostSchema = new Schema(post_schema);
var Post = mongoose.model("Post", PostSchema);

/*

  For testing,
  Remove all old Post docs

*/

Post.find({}, function(error, posts) {
  posts.forEach(function(post) {
    post.remove();
  });
  console.log("Post cleaned up");
});

var entry1 = new Post({
  title   : "<h1>blogging on blueprint</h1>",
  content : "<p>This is a skeleton install of a blog using blueprint. We use skeletons as demos then setup is as easy as `blueprint myappname`.</p>"
});

var entry2 = new Post({
  title   : "<h1>overview</h1>",
  content : "<p>Although a blog isn't the obvious (or best) use case for NodeJS, it is something that is extremely useful. If you want to run your entire stack with NodeJS, it's trivial to have your blog do likewise.</p>"
});

entry1.save(function(error, entry) {
  if (error) {
    throw new Error(error);
  } else {
    console.log("Post.entry2 saved");
  }
});

entry2.save(function(error, entry) {
  if (error) {
    throw new Error(error);
  } else {
    console.log("Post.entry2 saved");
  }
});

module.exports = Post;

/* EOF */