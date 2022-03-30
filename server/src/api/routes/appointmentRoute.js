const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const controller = require("./../controllers/appointmentController");

// -------------   Get Appointments -----------------
router.get("", controller.listappointments);

// -------------   Get appointment By Id -----------

router.get("/1", controller.getappointment);

// -------------  Add Appointment --------------
router.post(
  "",
  [
    // body("id").isInt().withMessage("Appointment Id should be Intger"),
    body("time"), //.isDate().withMessage(" ,Please enter valid time  "),
    body("bill")
      .isMongoId()
      .withMessage(",Please enter valid bill number  ")
      .optional(),
    body("patient")
      .isMongoId()
      .withMessage(",Please enter valid patient num  "),
    body("doctor").isMongoId().withMessage(",Please enter valid  doctor "),
    body("condition").isString().withMessage(",Not valid condition"),
  ],
  controller.addappointment
);

// -------------- Update Appointment ----------
router.put(
  "",
  [
    // body("id").isInt().withMessage("Appointment Id should be Intger"),
    body("time").isInt().withMessage(" ,Please enter valid time  "),
    body("bill")
      .isMongoId()
      .withMessage(",Please enter valid bill number  ")
      .optional(),
    body("patient")
      .isMongoId()
      .withMessage(",Please enter valid patient num  "),
    body("doctor").isMongoId().withMessage(",Please enter valid  doctor "),
    body("condition").isString().withMessage(",Not valid condition"),
  ],
  controller.updateappointment
);

// ------------- Delete Appointment -----------
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage(" Id should be Integer")],
  controller.deleteappointment
);

module.exports = router;
