const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 1,
    maxlength: 25,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  name: {
    type: String,
    minlength: 1,
    maxlength: 25,
    required: true,
  },
  contact: {
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    "privateKey"
  );
  return token;
};
const User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema;
