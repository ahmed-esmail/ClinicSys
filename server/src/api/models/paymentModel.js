const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  date: { type: Date },
  charges: { type: Number },
  method: { type: String },
});

module.exports = mongoose.model("Payment", paymentSchema);
