const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  bill_no: { type: Schema.Types.ObjectId, required: true },
  date: { type: Date },
  charges: { type: Number },
  method: { type: String },
});

module.exports = mongoose.model("Payment", paymentSchema);
