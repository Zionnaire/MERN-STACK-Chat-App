const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: { typeof: String, required: true },
    password: { typeof: String, required: true },
    email: { typeof: String, required: true },
    pic: {
      typeof: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userModel);

module.exports = User;
