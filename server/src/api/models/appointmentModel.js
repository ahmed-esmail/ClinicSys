const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: { type: Date, required: true },
  time: {type:Date,required:true },
  bill: {
    type: Schema.Types.ObjectId,
    //required: true,
    unique: true,
    ref: "Payment",
  },
  patient: { type: Schema.Types.ObjectId, ref: "Patient" ,required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" ,required: true},
  condition: { type: String, required: true },
});

appointmentSchema.index({  time: 1, bill: 1 }, { unique: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
