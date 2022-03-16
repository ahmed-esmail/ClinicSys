const express = require("express");
const { body, param, query } = require("express-validator")
const controller = require("../controllers/prescriptionController")
const router = express.Router()

//-------------------------------- list
router.get("", controller.getPrescriptions);

//-------------------------------- add
router.post("", controller.createPrescription);

//--------------------------------- update
router.put("", controller.updatePrescription);

//--------------------------------- delete
//************ no id for delete !! */
router.delete("", controller.deletePrescription);

module.exports = router;