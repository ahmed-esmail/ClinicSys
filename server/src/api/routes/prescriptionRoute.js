const express = require("express");
const { body, param, query } = require("express-validator")
const controller = require("../controllers/prescriptionController")
const router = express.Router()

//----------------------------  Get All Prescriptions
router.get("", controller.getPrescriptions);
//----------------------------  Ger Prescription
router.get("/:_id", [
    param('_id').isMongoId().withMessage("ID should be ObjectId"),
], controller.getPrescription);

//----------------------------  Add Prescription
router.post("", [
    body("date").isDate().withMessage("Please Enter valid Date "),
    body('medicines').isArray({ min: 0 }).withMessage("Mediciens should be Array of medicine"),
], controller.createPrescription);

//----------------------------  Update Prescription
router.put("", [
    body("date").isDate().withMessage("Please Enter valid Date "),
    body('medicines').isArray({ min: 0 }).withMessage("Mediciens should be Array of medicine"),
], controller.updatePrescription);

//----------------------------  Delete Prescription
router.delete("/:_id", [param("_id").isMongoId().withMessage("_id Should be ObjectID")], controller.deletePrescription);

module.exports = router;