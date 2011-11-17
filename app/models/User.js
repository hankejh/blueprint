
/*

  Models::User
 
 */

var crypto = require("crypto");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

function sha1(passwd) {
    var SALT = "sf%TGFcqwcs..!";
    return crypto.createHmac("sha1", SALT).update(passwd).digest("hex");
};

var user_schema = {
  id                : { type : ObjectId },
  Name              : { type : String, },
  URL               : { type : String, },
  Pass              : { type : String, set: sha1 },
  Handle            : { type : String, index : true },
  UserRole          : { type : String },
  Email             : { type : String },
  created_at        : { type : Date, default : Date.now },
  updated_at        : { type : Date }
};

var UserSchema = new Schema(user_schema);
var User = mongoose.model("User", UserSchema);

User.exists = function(Twitter_ID_Str, callback) {
  var query = User.find({});
  query.where("Twitter_ID_Str", Twitter_ID_Str);
  query.exec(function(error, users)  {
    if (error) {
      callback(error, null, null);
    } else {
      if (users.length > 0) {
        callback(null, users.length, users[0]);
      } else {
        callback(null, users.length, null);
      }
    }
  });
};

User.emailExists = function(email, callback) {
  var query = User.find({});
  query.where("Email", email);
  query.exec(function(error, users) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, users.length);
    };
  });
};

User.authenticateUser = function(params, callback) {
  var SALT = "S@LTeDxzcbht!@##";
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