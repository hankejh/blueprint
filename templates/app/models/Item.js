
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

/*
  Setup a small mongodb doc
*/

/*Item.find({}, function(error, items) {
  if (error) {
    console.error(error);
  } else {
    items.forEach(function(item) {
      item.remove();
    });
  };
});

var itemA = new Item({
  title : "Item A",
  content : "This is item A's content!"
});

var itemB = new Item({
  title : "Item B",
  content : "This is item B's content, excited yet?"
});

itemA.save();
itemB.save();
*/

module.exports = Item;

/* EOF */