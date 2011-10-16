
/*!
 *
 *
 * MODELS::User
 *
 *
 */

var crypto = require("crypto");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var user_schema = {
  id: ObjectId,
  Name          : { type : String, },
  URL           : { type : String, },
  Geo_Enabled   : { type : Boolean },
  Telephone     : { type : String },
  Password      : { type : String },
  UserRole      : { type : String },
  Email         : { type : String },
  // ms
  timeOnline    : { type : Number, default: 0 },
  Logins        : { type : Number, default: 0 },
  Organization  : { type : String },
  created_at    : { type : Date, default : Date.now }
};

var UserSchema = new Schema(user_schema);
var User = mongoose.model("User", UserSchema);

User.authenticateUser = function(params, callback) {
  var SALT = process.env.SALT;
  var email = params.email;
  var password = sha1(params.password, SALT);
  var query = User.find({});
  query.where("Email", email);
  query.where("Password", password);
  query.limit(1);
  query.exec(function (error, Users) {
    if (error) {
      throw error;
    } else {
      callback(null, Users);
    }
  });
};

module.exports = User;

/* EOF */