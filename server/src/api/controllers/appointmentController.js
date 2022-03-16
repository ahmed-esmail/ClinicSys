const { validationResult, Result, body } = require("express-validator");
const Appointment = require("./../models/appointmentModel");

// ----------------------- Get All Apointments -------------
exports.listappointments = function (request, response) {
  Appointment.find({})
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
};

//------ Adding Appointment ------------
exports.addappointment = function (request, response, next) {
  let errors = validationResult(request);
  console.log(errors);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + "", "");
    next(error);
  } else {
    let appointmentObject = new Appointment({
      //_id: request.body.id,
      date: request.body.date,
      time: request.body.time,
      "payment.bill_num": request.body.billno,
      "payment.bill_date": request.body.date,
      "payment.charges": request.body.billcharges,
      condition: request.body.condition,
    });

    appointmentObject
      .save()
      .then((object) => {
        response.status(201).json({ message: "Appointment Added" });
      })
      .catch((error) => {
        error.status = 500;
        console.log(error);
        next(error);
      });
  }
};

// ------------------ Update ِAppontment ---------------------
exports.updateappointment = function (request, response, next) {
  Appointment.findOne()
    .where({ _id: request.body.id })
    .update({
      $set: {
        date: request.body.date,
        visit_time: request.body.time,
        "payment.bill_num": request.body.billno,
        "payment.date": request.body.billdate,
        "payment.charges": request.body.billcharges,
        condition: request.body.condition,
      },
    })
    // .findByIdAndUpdate(
    //   { _id: request.body.id },

    //   {
    //     $set: {
    //       name: request.body.name,
    //       location: request.body.location,
    //     },
    //   }
    // )
    .then((result) => {
      response.status(201).json({ message: " Appointment Updated" });
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
};

// -------- delete Appointment ------------
exports.deleteappointment = function (request, response, next) {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + "", "");
    next(error);
  } else {
    Appointment.deleteOne({ _id: request.body.id })
      .then((result) => {
        response.status(201).json({ message: "Appointment Deleted" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};
