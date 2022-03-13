const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
  doctor: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
  medicines: [{ type: Schema.Types.ObjectId, required: true, ref: "Medicine" }],
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
