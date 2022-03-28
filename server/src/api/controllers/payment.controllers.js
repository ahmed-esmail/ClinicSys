const Payment = require("../models/paymentModel");
const { validationResult } = require("express-validator");

exports.create = async (req, res, next) => {
  const payment = new Payment(req.body);
  try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    await payment.save();
    res.status(201).send(payment);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const payment = await Payment.findOneAndDelete({
      _id: req.body.id,
    });

    if (!payment) {
      res.status(404).json({ message: "can't delete payment " });
    }

    res.send(payment);
  } catch (e) {
    res.status(500).send();
  }
};

exports.update = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.body.id,
    });

    if (!payment) {
      return res.status(404).send();
    }

    const updates = Object.keys(req.body);
    updates.forEach((update) => (payment[update] = req.body[update]));
    await payment.save();
    res.send(payment);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getAll = (req, res, next) => {
  Payment.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
};
