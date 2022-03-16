const express = require("express");
const { body, param, query } = require("express-validator")
const controller = require("../controllers/prescriptionController")
const router = express.Router()

//----------------------------  Get All Prescriptions
router.get("", controller.getPrescriptions);
//----------------------------  Ger Prescription
router.get("/:id", [
    param('id').isMongoId().withMessage("ID should be ObjectId"),
], controller.getPrescription);

//----------------------------  Add Prescription
router.post("", controller.createPrescription);

//----------------------------  Update Prescription
router.put("", controller.updatePrescription);

//----------------------------  Delete Prescription
router.delete("/:_id", [param("_id").isMongoId().withMessage("_id Should be ObjectID")], controller.deletePrescription);

module.exports = router;