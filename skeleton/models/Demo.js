
/*

  Models::Demo
 
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var demo_schema = {
  id          : { type : ObjectId },
  title       : { type : String },
  content     : { type : String },
  created_at  : { type : Date, default : Date.now }
};

var DemoSchema = new Schema(demo_schema);
var Demo = mongoose.model("Demo", DemoSchema);

module.exports = Demo;

/* EOF */