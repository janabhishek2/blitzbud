const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid username or password");
    }
    const token = user.generateToken();
    res.send(token);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server error");
    return;
  }
});
module.exports = router;
