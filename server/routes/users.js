const express = require("express");
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    if (users.length == 0) {
      return res.send("No Users found !");
    }

    const newUsers = users.filter((user) => {
      return user.isAdmin == false;
    });

    return res.send(newUsers);
  } catch (err) {
    res.status(500).send("Internal Server error");
    return;
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    else return user;
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server error");
    return;
  }
});
router.post("/", async (req, res) => {
  const postSchema = {
    email: Joi.string().email(),
    name: Joi.string().min(1).max(25),
    password: Joi.string().min(5).max(20),
    contact: Joi.string().min(10).max(10),
  };
  try {
    const { error } = Joi.validate(req.body, postSchema);
    if (error) {
      return res.status(400).send("Invalid data sent");
    }
    const existingUser = await User.find({ email: req.body.email });
    if (existingUser.length != 0) {
      return res.status(400).send("User exists with same email");
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
      });
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(user.password, salt);
      user.password = hashed;

      await user.save();
      console.log(user);
      const token = user.generateToken();

      return res.status(201).send(token);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server error");
    return;
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(400).send("User not found");

    const out = await User.deleteOne({ _id: req.params.id });
    res.status(200).send(out);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
