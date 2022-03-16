const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String, unique: true },
  age: { type: Number },
  password: { type: Number },
  address: { type: String },
  email: { type: String, require: true, unique: true },
  profileImg: { data: Buffer, contentType: String },
  type: { type: String, required: true, enum: ["Doctor", "Receptionist", "Admin"] },
  gender: { type: String, enum: ["male", "female"]},
});

module.exports = mongoose.model("User", userSchema);
