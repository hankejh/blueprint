
/*

  Models::Category
 
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var category_schema = {
  id            : { type : ObjectId },
  content       : { type : String },
  created_at    : { type : Date, default : Date.now }
};

var CategorySchema = new Schema(category_schema);
var Category = mongoose.model("Category", CategorySchema);

module.exports = Category;

/* EOF */