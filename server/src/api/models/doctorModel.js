const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  profile_img: { type: Buffer },
  gender: { type: String },
  specialty: { type: String },
  Appointment: [
    { type: Schema.Types.ObjectId, required: true, ref: "Appointment" },
  ],
});

module.exports = mongoose.model("Doctor", doctorSchema);
