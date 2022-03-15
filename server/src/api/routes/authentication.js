const express = require("express");
const User = require("../models/userModel");
const { auth, authRole } = require("../middlewares/auth");
const router = express.Router();

router.post("/users/register", async (req, res, next) => {
  let tempUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    age: req.body.age,
    address: req.body.address,
    gender: req.body.gender,
    type: req.body.type,
    password: req.body.password,
  });

  try {
    let isSaved = await tempUser.save();
    res.status(201).json({ message: "added to user collection" });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.phone_number,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res
      .status(400)
      .json({ message: "Failed to login phone number or password incorrect" });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).json({ message: "" });
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
