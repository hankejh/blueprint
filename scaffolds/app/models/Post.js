
/*

  Models::Post
 
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

function niceifyCurrent() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var niceDate = month+"."+day+"."+year;
  return niceDate;
};

var PostSchema = new Schema({
  id              : { type : ObjectId },
  title           : { type : String },
  content         : { type : String },
  date_updated    : { type : Date },
  slug            : { type : String }, 
  comment_count   : { type : Number, default : 0 },
  created_at      : { type : Date, default : Date.now },
  created_at_nice : { type : String }
});

var Post = mongoose.model("Post", PostSchema);

Post.find({}, function(error, posts) {
  posts.forEach(function(post) {
    post.remove();
  });
});

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

entry1.save();
entry2.save();

Post.getLatestPosts = function(callback) {
  return this.find().sort("_id", "descending").limit(15).find({}, callback);
};

module.exports = Post;

/* EOF */