const User = require("../models/userModel");
const { validationResult } = require("express-validator");

exports.register = async (req, res, next) => {
  const user = new User(req.body);
  try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    await user.save();
    res.status(201).json({ message: "added to user collection" });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

exports.login = async (req, res) => {
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
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).json({ message: "" });
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

exports.userMe = async (req, res) => {
  res.send(req.user);
};
