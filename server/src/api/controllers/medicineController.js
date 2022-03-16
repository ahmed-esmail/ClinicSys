const { validationResult } = require("express-validator");

const Medicine = require("../models/medicineModel");


//---------------------------------------  list
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

//----------------------------------------- add
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

//------------------------------------------- update
//************ no id for Update !! */
exports.updateMedicine = (request, response, next) => {
    Medicine.updateOne({ name: request.body.name },
        {
            $set: {
                // name: request.body.name,
                description: request.body.description,
            }
        }).then(result => {
            response.status(201).json({ message: "Medicine Updated" })
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}

exports.updateMedicine = (request, response, next) => {
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
}

//------------------------------------------- delete
exports.deleteMedicine = (request, response, next) => {
    let errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "");
        next(error);
    }
    else {
        Medicine.deleteOne({ name: request.params.name })
            .then(result => {
                response.status(201).json({ message: "Medicine Deleted" })
            })
            .catch(error => {
                error.status = 500;

                next(error);
            })
    }
}


