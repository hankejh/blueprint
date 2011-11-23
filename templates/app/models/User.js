/*

  Model::User

 */

var SALT = "CHANGE_ME";

var crypto = require("crypto");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

function sha1(passwd) {
    return crypto.createHmac("sha1", SALT).update(passwd).digest("hex");
};

var user_schema = {
  id          : { type : ObjectId },
  Name        : { type : String, },
  UserRole    : { type : String },
  Email       : { type : String },
  Password    : { type : String, set: sha1 },
  created_at  : { type : Date, default : Date.now }
};

var UserSchema = new Schema(user_schema);
var User = mongoose.model("User", UserSchema);

User.authenticateUser = function(params, callback) {
  var email = params.email;
  var password = sha1(params.password, SALT);
  var query = User.find({});
  query.where("Email", email);
  query.where("Password", password);
  query.limit(5);
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