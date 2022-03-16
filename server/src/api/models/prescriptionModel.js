const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
  medicines: [{
    medicine: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Medicine"
    },
    dose: { type: String, required: true,},
  }],

});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
