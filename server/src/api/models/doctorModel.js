const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "User"},
  speciality: { type: String },
  appointments: [
    { type: Schema.Types.ObjectId, required: true, ref: "Appointment" },
  ],
  patients: [
    { type: Schema.Types.ObjectId, required: true, ref: "Patient" },
  ],
});

module.exports = mongoose.model("Doctor", doctorSchema);
