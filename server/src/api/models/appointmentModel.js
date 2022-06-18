const { isDate } = require("moment");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  time: { type: Date, required: true },
  bill: {
    type: Schema.Types.ObjectId,
    //required: true,
    //unique: true,
    ref: "Payment",
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
    unique: false,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: false,
  },
  condition: { type: String, required: true },
});

appointmentSchema.index({ time: 1, patient: 1, doctor: 1 }, { unique: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
