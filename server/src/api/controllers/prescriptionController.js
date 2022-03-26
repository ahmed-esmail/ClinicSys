const { validationResult } = require("express-validator");

const Prescription = require("../models/prescriptionModel");


//----------------------------  Get All Prescriptions
exports.getPrescriptions = function (request, response, next) {

    Prescription.find({})
        .populate({ path: "medicines.medicine" })
        .populate({ path: "doctor" })
        .populate({ path: "patient" })
        .then(result => {
            response.status(200).json(result);
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}


//----------------------------  Get All Prescriptions
exports.getPrescription = function (request, response, next) {

    Prescription.findOne({ _id: request.params._id })
        .populate({ path: "medicines.medicine"})
        .populate({ path: "doctor" })
        .populate({ path: "patient" })
        .then(result => {
            response.status(200).json(result);
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}

//----------------------------  Add Prescription
exports.createPrescription = (request, response, next) => {
    let errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " , ", "");
        next(error);
    }
    else {

        let PrescriptionObject = new Prescription({
            doctor: request.body.doctor,
            patient: request.body.patient,
            medicines: request.body.medicines,
            date: request.body.date,
        });

        PrescriptionObject.save()
            .then(object => {
                response.status(201).json({ message: "Prescription Added" });
            })
            .catch(error => {
                error.status = 500;
                next(error);
            })
    }
};

//----------------------------  Update Prescription
exports.updatePrescription = (request, response, next) => {
        if (request.body._id) {
            Prescription.updateOne({ _id: request.body._id },
                {
                    $set: {
                        // doctor: request.body.doctor,
                        medicines: request.body.medicines,
                        // patient: request.body, patient,
                        // date: request.body.date,
                    }
                }).then(result => {
                    response.status(201).json({ message: "Prescription Updated" })
                })
                .catch(error => {
                    error.status = 500;
                    next(error);
                })
        } else {
            response.status(201).json({ message: "No ID For Update" })
        }
}

//----------------------------  Delete Prescription
exports.deletePrescription = (request, response, next) => {
    let errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "");
        next(error);
    }
    else {
        Prescription.deleteOne({ _id: request.params._id })
                .then(result => {
                    response.status(201).json({ message: "Prescription Deleted" })
                })
                .catch(error => {
                    error.status = 500;

                    next(error);
                })
    }
}


