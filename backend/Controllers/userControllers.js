// express-async-handler -> Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
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
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
      // Steps for generating token
      // 1. First make function which accepts unique id
      // 2. import jsonwebtoken
      // 3. return jwt.sign({id} , JWT_SECRET , {expiresIn : "30d"}) -> from your function
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create User");
  }
});

const authUser = expressAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Enter email and password");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      name: user.name,
      email: user.email,
      _id: user._id,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const allUser = expressAsync(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          // Todo : Read about regex
          // ? i is for case insensitivity
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // will give users which do not include user who is logged in at that time
  // ? ne -> not equal to
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
  // console.log(keyword);
});

module.exports = { registerUser, authUser, allUser };
