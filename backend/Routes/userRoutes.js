const express = require("express");
const {
  registerUser,
  authUser,
  allUser,
} = require("../Controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
// ? so to reach allUser it should first have to go to protect
router.route("/").post(registerUser).get(protect, allUser);
router.post("/login", authUser);

module.exports = router;
