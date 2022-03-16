const { validationResult } = require("express-validator");

const Prescription = require("../models/prescriptionModel");


//---------------------------------------  list
exports.getPrescriptions = function (request, response, next) {

    Prescription.find({})
        .populate({ path: "medicines" })
        .then(result => {
            response.status(200).json(result);
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}

//----------------------------------------- add
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
            doctor:request.body.doctor,
            medicines: request.body.medicines,
        }) ;

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

//------------------------------------------- update
//************ no id for Update !! */
exports.updatePrescription = (request, response, next) => {
    if (request.body._id) {
        Prescription.updateOne({ _id: request.body._id },
            {
                $set: {
                    doctor:request.body.doctor,
                    medicines: request.body.medicines,
                }
            }).then(result => {
                response.status(201).json({ message: "Prescription Updated" })
            })
            .catch(error => {
                error.status = 500;
                next(error);
            })
    } else {
        response.status(201).json({ message: "Prescription Not Updated" })
    }
}

//------------------------------------------- delete
exports.deletePrescription = (request, response, next) => {
    let errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "");
        next(error);
    }
    else {
        Prescription.deleteOne({ _id: request.body._id })
            .then(result => {
                response.status(201).json({ message: "Prescription Deleted" })
            })
            .catch(error => {
                error.status = 500;

                next(error);
            })
    }
}


