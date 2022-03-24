const express = require("express");
const doctorController = require("./../controllers/doctorController");
const { param, body, query } = require("express-validator");
const router = express.Router();

// const User = require("./../Models/userModel");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./../images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toLocaleDateString().replace(/\//g, "-") +
        "-" +
        file.originalname
    );
  },
});
const upload = multer({ storage: storage }).single("profileImg");

//get all doctors
router.get("", doctorController.getDoctors);

//get doctor by id
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("ID should be ObjectId")],
  doctorController.getDoctorById
);

//add a doctor
router.post(
  "",
  upload,
  [
    body("_id.firstName").isAlpha().withMessage("First name should be string"),
    body("_id.lastName").isAlpha().withMessage("Last name should be string"),
    body("_id.phoneNumber")
      .isInt()
      .isLength({ min: 11, max: 11 })
      .withMessage("Invalid phone number")
      .custom((value, { req }) => {
        return User.findOne({
          phoneNumber: value
        }).then((user) => {
          if (user) {
            throw new Error("Phone number already exist");
          }
        });
      }),
    body("_id.age").custom((value, { req }) => {
      if (value >= 20 && value <= 100) {
        return true;
      }
      throw new Error("Invalid age");
    }),
    body("_id.email")
      .isEmail()
      .withMessage("Invalid Email")
      .custom((value, { req }) => {
        return User.findOne({
          email: value
        }).then((user) => {
          if (user) {
            throw new Error("Email already exist");
          }
        });
      }),
    body("_id.password")
      .isLength({ min: 7 })
      .withMessage("Invalid Password"),
    body("_id.address")
      .isLength({ min: 3 })
      .withMessage("invalid address"),
    //body('profileImg').isAlpha().withMessage("profileImg path should be string"),
    body("_id.gender").custom((value, { req }) => {
      if (value == "male" || value == "female") {
        return true;
      }
      throw new Error("invalid gender");
    }),
    body("speciality").not().isEmpty().withMessage("speciality should be string"),
  ],
  doctorController.addDoctor
);

//update
router.put(
  "",
  upload,
  [
    body("_id._id").isMongoId().withMessage("ID should be ObjectId"),
    body("_id.firstName").isAlpha().withMessage("First name should be string"),
    body("_id.lastName").isAlpha().withMessage("Last name should be string"),
    body("_id.phoneNumber")
      .isInt()
      .isLength({ min: 11, max: 11 })
      .withMessage("Invalid phone number")
      .custom((value, { req }) => {
        return User.findOne({
          phoneNumber: value,
          _id: { $nin: [req.body._id._id] },
        }).then((user) => {
          if (user) {
            throw new Error("Phone number already exist");
          }
        });
      }),
    body("_id.age").custom((value, { req }) => {
      if (value >= 20 && value <= 100) {
        return true;
      }
      throw new Error("Invalid age");
    }),
    body("_id.email")
      .isEmail()
      .withMessage("Invalid Email")
      .custom((value, { req }) => {
        return User.findOne({
          email: value,
          _id: { $nin: [req.body._id._id] },
        }).then((user) => {
          if (user) {
            throw new Error("Email already exist");
          }
        });
      }),
    body("_id.password")
      .isLength({ min: 7 })
      .withMessage("Invalid Password"),
      body("_id.address")
      .isLength({ min: 3 })
      .withMessage("invalid address"),
    //body('profileImg').isAlpha().withMessage("profileImg path should be string"),
    body("_id.gender").custom((value, { req }) => {
      if (value == "male" || value == "female") {
        return true;
      }
      throw new Error("invalid gender");
    }),
    body("speciality").not().isEmpty().withMessage("speciality should be string"),
  ],
  doctorController.updateDoctor
);

//delete
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("ID should be ObjectId")],
  doctorController.deleteDoctor
);

//add an appointment to a doctor
router.put(
  "/addAppointmentToDoctor",
  [
    body("id").isMongoId().withMessage("ID should be ObjectId"),
    body("appointment")
      .isMongoId()
      .withMessage("Appointment should be array of ObjectId"),
  ],
  doctorController.addAppointmentToDoctor
);

//remove an appointment to a doctor
router.put(
  "/removeAppointmentFromDoctor",
  [
    body("id").isMongoId().withMessage("ID should be ObjectId"),
    body("appointment")
      .isMongoId()
      .withMessage("Appointment should be array of ObjectId"),
  ],
  doctorController.removeAppointmentFromDoctor
);

//add patient to a doctor
router.put(
  "/addPatientToDoctor",
  [
    body("id").isMongoId().withMessage("ID should be ObjectId"),
    body("patient")
      .isMongoId()
      .withMessage("Patient should be array of ObjectId"),
  ],
  doctorController.addPatientToDoctor
);

//remove patient to a doctor
router.put(
  "/removePatientFromDoctor",
  [
    body("id").isMongoId().withMessage("ID should be ObjectId"),
    body("patient")
      .isMongoId()
      .withMessage("Patient should be array of ObjectId"),
  ],
  doctorController.removePatientFromDoctor
);


module.exports = router;
