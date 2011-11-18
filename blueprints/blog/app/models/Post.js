
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
  date_updated  : { type : Date },
  comment_count : { type : Number, default : 0 },
  created_at    : { type : Date, default : Date.now }
};

var PostSchema = new Schema(post_schema);
var Post = mongoose.model("Post", PostSchema);

Post.getLatestPosts = function(callback){
  return this.find().sort("_id", "descending").limit(15).find({}, callback);
};

module.exports = Post;

/* EOF */