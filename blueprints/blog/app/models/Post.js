
/*

  Models::Post
 
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var post_schema = {
  id            : { type : ObjectId },
  title         : { type : String },
  content       : { type : String },
  date_updated  : { type: Date },
  comment_count : { type : Number, default : 0 },
  created_at    : { type : Date, default : Date.now }
};

var PostSchema = new Schema(post_schema);
var Post = mongoose.model("Post", PostSchema);

Post.getLatestPosts = function(callback){
  return this.find().sort("_id", "descending").limit(15).find({}, callback);
};

Post.find({}, function(error, posts) {
  posts.forEach(function(post) {
    post.remove();
  });
});

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

module.exports = Post;

/* EOF */