const expressAsync = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../Models/userModel");
const registerUser = expressAsync(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }
  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create User");
  }
});

module.exports = { registerUser };
