const express=require("express");
const controller=require("./../controllers/paientController")
const {body,query,param}=require("express-validator")
const router=express.Router();
var multer = require('multer');
  var path = require('path');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './../images/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toLocaleDateString().replace(/\//g,"-")+"-"+file.originalname)
    }
});
  
var upload = multer({ storage: storage }).single("profileimg")
router.route("/patient")
router.get("",controller.getAllPatient);
router.post("", upload
,[
    body("first_name").isAlpha().withMessage("first_name should be string "),
    body("last_name").isAlpha().withMessage("last_name should be string "),
    body("age").isInt().withMessage("patient age should be Intger"),
    body("gender").isAlpha().custom((value,{req})=>{
        if(value=="male" || value=="female" )
        {  return true;
        }
        throw new Error("gender should be male or female ");
    }).withMessage("gender should be string in Male or Female"),
    body("address").isAlpha().withMessage("address should be string "),
     body("history").isAlpha().withMessage("history should be array of string")
    ]
,controller.createPatient);
router.put("", upload ,[
  
    body("first_name").isAlpha().withMessage("first_name should be string "),
    body("last_name").isAlpha().withMessage("last_name should be string "),
    body("age").isInt().withMessage("patient age should be Intger"),
    body("gender").isAlpha().withMessage("gender should be string in Male or Female"),
    body("address").isAlpha().withMessage("address should be string "),
    body("history").isAlpha().withMessage("history should be array of string")
    ],controller.updatePatient);
router.delete("/:_id",[param("_id").isMongoId().withMessage("_id Should be ObjectID")]
,controller.deletePatient);
router.get("/:_id",[param("_id").isMongoId().withMessage("_id Should be ObjectID")],controller.getPatient);
///////////////////////////////////////////////////////////////

router.put("/addDoctortoPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("doctor").isMongoId().withMessage("DoctorID should be objectID ")],controller.addDoctortoPatient);
router.put("/addAppointmenttoPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("appointment").isMongoId().withMessage("Appointment ID should be objectID ")],controller.addAppointmenttoPatient);
router.put("/addPrescriptiontoPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("prescription").isMongoId().withMessage(" Prescriptions ID should be objectID ")],controller.addPrescriptiontoPatient);
///////////////////////////////////////////////////////////////////////////////
router.put("/deleteDoctorfromPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("doctor").isMongoId().withMessage("DoctorID should be objectID ")],controller.deleteDoctorfromPatient);
router.put("/deleteAppointmentfromPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("appointment").isMongoId().withMessage("Appointment ID should be objectID ")],controller.deleteAppointmentfromPatient);
router.put("/deletePrescriptionfromPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("prescription").isMongoId().withMessage(" Prescriptions ID should be objectID ")],controller.deletePrescriptionfromPatient);
 module.exports=router;