const { validationResult } = require("express-validator");
// const User = require("./../Models/userModel");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Doctor = require("./../Models/doctorModel");
const fs = require("fs");
const path = require("path");

exports.getDoctors = function (request, response, next) {
  User.find({ type: "Doctor" })
    .populate({
      path: "_id",
      model: "Doctor",
    })
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
};

exports.getDoctorById = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    User.findOne({ _id: request.params.id, type: "Doctor" })
      .populate({
        path: "_id",
        model: "Doctor",
      })
      .then((data) => {
        if (!data) {
          next(new Error("Doctor id not Found"));
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

exports.addDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
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
      type: "Doctor",
    });

    let doctorObject = new Doctor({
      _id: userObject._id,
      speciality: request.body.speciality,
      appointments: [],
      patients: [],
    });

    userObject
      .save()
      .then((object1) => {
        doctorObject
          .save()
          .then((object2) => {
            response.status(201).json({ message: "Doctor added successfully" });
          })
          .catch((error) => {
            //delete user
            User.deleteOne(
              { phoneNumber: userObject.phoneNumber },
              function (err) {
                if (err) throw err;
              }
            );
            error.status = 500;
            next(error);
          });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.addAppointmentToDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    Doctor.updateOne(
      { _id: request.body.id },
      {
        $push: {
          appointments: request.body.appointment,
        },
      }
    )
      .then((result) => {
        response
          .status(201)
          .json({ message: "Appointment added successfully to the doctor" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.removeAppointmentFromDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    Doctor.updateOne(
      { _id: request.body.id },
      {
        $pull: {
          appointments: request.body.appointment,
        },
      }
    )
      .then((result) => {
        response
          .status(201)
          .json({
            message: "Appointment removed successfully from the doctor",
          });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.addPatientToDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    Doctor.updateOne(
      { _id: request.body.id },
      {
        $push: {
          patients: request.body.patient,
        },
      }
    )
      .then((result) => {
        response
          .status(201)
          .json({ message: "Patient added successfully to the doctor" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.removePatientFromDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    Doctor.updateOne(
      { _id: request.body.id },
      {
        $pull: {
          patients: request.body.patient,
        },
      }
    )
      .then((result) => {
        response
          .status(201)
          .json({ message: "Patient removed successfully from the doctor" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.updateDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    Doctor.updateOne(
      { _id: request.body.id },
      {
        $set: {
          speciality: request.body.speciality,
        },
      }
    )
      .then((result) => {
        if (result.matchedCount)
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
                    path.join(
                      __dirname + "./../../../../images/" + request.file.path
                    )
                  ),
                  contentType: "image/png",
                },
                gender: request.body.gender,
                /* type: "Doctor", */
              },
            }
          )
            .then((result) => {
              response
                .status(201)
                .json({ message: "Doctor updated successfully" });
            })
            .catch((error) => {
              error.status = 500;
              next(error);
            });
        else {
          let error = new Error();
          error.status = 422;
          error.message = "Doctor id not found";
          next(error);
        }
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.deleteDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    Doctor.deleteOne({ _id: request.params.id })
      .then((result) => {
        User.deleteOne({ _id: request.params.id })
          .then((result) => {
            if (result.deletedCount != 0)
              response
                .status(201)
                .json({ message: "Doctor deleted successfully" });
            else {
              let error = new Error();
              error.status = 422;
              error.message = "Doctor id not found";
              throw error;
            }
          })
          .catch((error) => {
            error.status = 500;
            next(error);
          });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};
