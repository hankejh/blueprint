
/*

  Models::Tag
 
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var tag_schema = {
  id            : { type : ObjectId },
  content       : { type : String },
  created_at    : { type : Date, default : Date.now }
};

var TagSchema = new Schema(tag_schema);
var Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;

/* EOF */