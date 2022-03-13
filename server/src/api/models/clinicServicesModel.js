const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clinicServicesSchema = new Schema({
  name: { type: String, required: true },
  team: [{ type: Schema.Types.ObjectId, required: true, ref: "Doctor" }],
});

module.exports = mongoose.model("clinicServices", clinicServicesSchema);
