const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Medicine", medicineSchema);