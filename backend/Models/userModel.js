const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  pic: {
    type: String,
    required: true,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
});

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ensures that before saving it should do following work
// Always should be on top of actual model which we are creating

// Steps for Password Encryption
// 1. import bcryptjs
// 2. make salt using genSalt function of value which you want
// 3. hash your pass. using hash
// this.password = bcrypt.hash(this.password , salt)
userModel.pre("save", async function (next) {
  // If password is not modified then go ahead
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;
