const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  phone_number: { type: String },
  age: { type: Number },
  gender: { type: String, required: true },
  address: { type: String },
  profile_img: { type: Buffer },
  history: [],
  Doctor: [{ type: Schema.Types.ObjectId, required: true, ref: "Doctor" }],
  Appointment: [
    { type: Schema.Types.ObjectId, required: true, ref: "Appointment" },
  ],
  prescriptions: [
    { type: Schema.Types.ObjectId, required: true, ref: "Prescription" },
  ],
});

module.exports = mongoose.model("Patient", patientSchema);
