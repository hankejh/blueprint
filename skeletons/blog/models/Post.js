
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
  title   : "<h1>Blogging on Blueprint</h1>",
  content : "<p>This is a skeleton install of a blog using blueprint. We use skeletons as demos then setup is as easy as `blueprint myappname`.</p>"
});

entry1.save(function(error, entry) {
  if (error) {
    throw new Error(error);
  } else {
    console.log("Post.entry1 saved");
  }
});

module.exports = Post;

/* EOF */