const express = require("express");
const { body, param, query } = require("express-validator")
const controller = require("../controllers/medicineController")
const router = express.Router()

//-------------------------------- list
router.get("", controller.getMedicines);

//-------------------------------- add
router.post("", [
    body("name").isAlpha().withMessage("Medicine name should be String"),
    body("description").isAlpha().withMessage("Medicine description should be string")
], controller.createMedicine);

//--------------------------------- update
router.put("", [
    body("name").isAlpha().withMessage("Medicine name should be String"),
    body("description").isAlpha().withMessage("Medicine description should be string")
], controller.updateMedicine);

//--------------------------------- delete
//************ no id for delete !! */
router.delete("/:name", [
    param("name").isAlpha().withMessage("Medicine name should be String")
], controller.deleteMedicine);

module.exports = router;