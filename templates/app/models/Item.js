
/*

  /app/models/Item

 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
  id          : ObjectId,
  title       : { type : String },
  content     : { type : String },
  created_at  : { type : Date, default: Date.now }
});

var Item = mongoose.model("Item", ItemSchema);

module.exports = Item;

/* EOF */