const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  phone_number: { type: String },
  age: { type: Number },
  address: { type: String },
  profile_img: { type: Buffer },
  type: { type: String, required: true },
  gender: { type: String },
});

module.exports = mongoose.model("User", userSchema);
