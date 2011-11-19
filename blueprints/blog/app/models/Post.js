
/*

  Models::Post
 
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

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

Post.getLatestPosts = function(callback) {
  return this.find().sort("_id", "descending").limit(15).find({}, callback);
};

module.exports = Post;

/* EOF */