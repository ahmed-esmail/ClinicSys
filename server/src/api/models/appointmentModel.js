const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: { type: Date, required: true },
  time: { type: Number, required: true, min: 9, max: 20 },
  payment: {
    bill_num: { type: Number, required: true, unique: true },
    bill_date: { type: Date },
    charges: { type: Number, required: true, min: 100, max: 500 },
  },
  condition: { type: String, required: true },
});

appointmentSchema.index(
  { date: 1, visit_time: 1, "payment.bill_num": 1 },
  { unique: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
