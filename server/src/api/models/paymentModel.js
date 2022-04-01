const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  date: { type: Date },
  charges: { type: Number },
  method: { type: String },
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
});

module.exports = mongoose.model("Payment", paymentSchema);
