const express = require("express");
const receptionistController = require("./../controllers/ReceptionistController");
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
router.get("", receptionistController.getReceptionists);

//get doctor by id
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("ID should be ObjectId")],
  receptionistController.getReceptionistById
);

//add a doctor
router.post(
  "",
  upload,
  [
    body("firstName").isAlpha().withMessage("First name should be string"),
    body("lastName").isAlpha().withMessage("Last name should be string"),
    body("phoneNumber")
      .isInt()
      .isLength({ min: 11, max: 11 })
      .withMessage("Invalid phone number")
      .custom((value, { req }) => {
        return User.findOne({ phoneNumber: value }).then((user) => {
          if (user) {
            throw new Error("Phone number already exist");
          }
        });
      }),
    body("age").custom((value, { req }) => {
      if (value >= 20 && value <= 100) {
        return true;
      }
      throw new Error("Invalid age");
    }),
    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            throw new Error("Email already exist");
          }
        });
      }),
    body("password")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("Invalid Password"),
    body("address").isAlphanumeric().withMessage("Address should be string"),
    //body('profileImg').isAlpha().withMessage("profileImg path should be string"),
    body("gender").custom((value, { req }) => {
      if (value == "male" || value == "female") {
        return true;
      }
      throw new Error("invalid gender");
    }),
  ],
  receptionistController.addReceptionist
);

//update
router.put(
  "",
  upload,
  [
    body("id").isMongoId().withMessage("ID should be ObjectId"),
    body("firstName").isAlpha().withMessage("First name should be string"),
    body("lastName").isAlpha().withMessage("Last name should be string"),
    body("phoneNumber")
      .isInt()
      .isLength({ min: 11, max: 11 })
      .withMessage("Invalid phone number")
      .custom((value, { req }) => {
        return User.findOne({
          phoneNumber: value,
          _id: { $nin: [req.body.id] },
        }).then((user) => {
          if (user) {
            throw new Error("Phone number already exist");
          }
        });
      }),
    body("age").custom((value, { req }) => {
      if (value >= 20 && value <= 100) {
        return true;
      }
      throw new Error("Invalid age");
    }),
    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .custom((value, { req }) => {
        return User.findOne({
          email: value,
          _id: { $nin: [req.body.id] },
        }).then((user) => {
          if (user) {
            throw new Error("Email already exist");
          }
        });
      }),
    body("password")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("Invalid Password"),
    body("address").isAlphanumeric().withMessage("Address should be string"),
    //body('profileImg').isAlpha().withMessage("profileImg path should be string"),
    body("gender").custom((value, { req }) => {
      if (value == "male" || value == "female") {
        return true;
      }
      throw new Error("invalid gender");
    }),
  ],
  receptionistController.updateReceptionist
);

//delete
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("ID should be ObjectId")],
  receptionistController.deleteReceptionist
);

module.exports = router;
