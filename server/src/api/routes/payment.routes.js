// noinspection JSCheckFunctionSignatures
const express = require("express");
const router = express.Router();

const { auth, authRole } = require("../middlewares/auth");
const paymentController = require("../controllers/payment.controllers");
const { validate } = require("../helpers/payment.validator");

router.post(
  "/payments",
  auth,
  authRole(["admin"]),
  validate("createPayment"),
  paymentController.create
);

router.delete(
  "/payments",
  auth,
  authRole(["admin"]),
  validate("deletePayment"),
  paymentController.delete
);
router.patch(
  "/payments",
  auth,
  authRole(["admin"]),
  validate("updatePayment"),
  paymentController.update
);

module.exports = router;
