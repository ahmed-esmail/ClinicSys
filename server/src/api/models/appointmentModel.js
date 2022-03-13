const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: { type: Date },
  visit_time: { type: Number },
  payment: { type: String },
  condition: { type: String },
  payment: {
    bill_no: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date },
    charges: { type: Number },
    method: { type: String },
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
