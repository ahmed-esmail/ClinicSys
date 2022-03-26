const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  date: { type: Date, required: true },
  charges: { type: Number, required: true, min: 100, max: 500 },
  method: {
    type: String,
    enum: ["cash", "credit card", "insurance card", "partial"],
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
