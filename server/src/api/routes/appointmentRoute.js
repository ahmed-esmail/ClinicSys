const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const controller = require("./../controllers/appointmentController");

// -------------   Get Appointments -----------------
router.get("", controller.listappointments);

// -------------  Add Appointment --------------
router.post(
  "",
  [
    // body("id").isInt().withMessage("Appointment Id should be Intger"),
    body("date").isDate().withMessage(" ,Please enter valid date "),
    body("time").isInt().withMessage(" ,Please enter valid time  "),
    body("billno").isInt().withMessage(",Please enter valid billno  "),
    // body("billdate").isDate().withMessage(" ,Please enter valid billdate  "),
    body("billcharges").isInt().withMessage(" ,Charges not valid "),
    body("condition").isString().withMessage(",Not valid condition"),
    body(),
  ],
  controller.addappointment
);

// -------------- Update Appointment ----------
router.put("", controller.updateappointment);

// ------------- Delete Appointment -----------
router.delete(
  "",
  [body("id").isInt().withMessage(" Id should be Integer")],
  controller.deleteappointment
);

module.exports = router;
