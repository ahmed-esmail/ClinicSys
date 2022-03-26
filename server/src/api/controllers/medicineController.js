const { validationResult } = require("express-validator");

const Medicine = require("../models/medicineModel");


//---------------------------- Git All Medicines
exports.getMedicines = function (request, response, next) {
    Medicine.find({})
        .then(result => {
            response.status(200).json(result);
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}

//---------------------------- Git Medicine
exports.getMedicine = function (request, response, next) {
    Medicine.findOne({ _id: request.params._id })
        .then(result => {
            response.status(200).json(result);
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}

//---------------------------- Add Medicine
exports.createMedicine = (request, response, next) => {
    let errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " , ", "");
        next(error);
    }
    else {
        let MedicineObject = new Medicine({
            name: request.body.name,
            description: request.body.description
        });

        MedicineObject.save()
            .then(object => {
                response.status(201).json({ message: "Medicine Added" });
            })
            .catch(error => {
                error.status = 500;
                next(error);
            })
    }
};

//---------------------------- Update Medicine
exports.updateMedicine = (request, response, next) => {
    if (request.body._id) {
        Medicine.updateOne({ _id: request.body._id },
            {
                $set: {
                    name: request.body.name,
                    description: request.body.description,
                }
            }).then(result => {
                response.status(201).json({ message: "Medicine Updated" })
            })
            .catch(error => {
                error.status = 500;
                next(error);
            })
    } else {
        response.status(201).json({ message: "No ID For Update" })
    }
}

//---------------------------- Delete Medicine
exports.deleteMedicine = (request, response, next) => {
    let errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "");
        next(error);
    }
    else {
            Medicine.deleteOne({ _id: request.params._id })
                .then(result => {
                    response.status(200).json({ message: "Medicine Deleted" })
                })
                .catch(error => {
                    error.status = 500;

                    next(error);
                })
    }
}