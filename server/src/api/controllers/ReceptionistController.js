const { validationResult } = require("express-validator");
// const User = require("./../Models/userModel");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const fs = require("fs");
const path = require("path");

exports.getReceptionists = function (request, response, next) {
  User.find({ type: "Receptionist" })
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
};

exports.getReceptionistById = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    User.findOne({ _id: request.params.id, type: "Receptionist" })
      .then((data) => {
        if (!data) {
          next(new Error("Receptionist id not Found"));
          response.status(422).json(data);
        } else {
          response.status(200).json(data);
        }
      })
      .catch((error) => {
        next(error);
      });
  }
};

exports.addReceptionist = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    //console.log(request.file)
    let userObject = new User({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      phoneNumber: request.body.phoneNumber,
      age: request.body.age,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
      profileImg: {
        data: fs.readFileSync(
          path.join(__dirname + "./../../../../images/" + request.file.path)
        ),
        contentType: "image/png",
      },
      gender: request.body.gender,
      type: "Receptionist",
    });

    userObject
      .save()
      .then((object1) => {
        response
          .status(201)
          .json({ message: "Receptionist added successfully" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.updateReceptionist = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    console.log(request.profileImg);
    User.updateOne(
      { _id: request.body.id },
      {
        $set: {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          phoneNumber: request.body.phoneNumber,
          age: request.body.age,
          email: request.body.email,
          password: request.body.password,
          address: request.body.address,
          profileImg: {
            data: fs.readFileSync(
              path.join(__dirname + "./../../../../images/" + request.file.path)
            ),
            contentType: "image/png",
          },
          gender: request.body.gender,
          /* type: "Receptionist", */
        },
      }
    )
      .then((result) => {
        response
          .status(201)
          .json({ message: "Receptionist updated successfully" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.deleteReceptionist = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    User.deleteOne({ _id: request.params.id })
      .then((result) => {
        response
          .status(201)
          .json({ message: "Receptionist deleted successfully" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};
