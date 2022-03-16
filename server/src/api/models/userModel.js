const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  first_name: { type: String, trim: true, required: true },
  last_name: { type: String, trim: true, required: true },
  phone_number: { type: String, required: true, unique: true },
  age: { type: Number },
  address: { type: String },
  email: { type: String, require: true, unique: true },
  profileImg: { data: Buffer, contentType: String },
  type: {
    type: String,
    required: true,
    enum: ["Doctor", "Receptionist", "Admin"],
  },
  gender: { type: String, enum: ["male", "female"] },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
      _id: false,
    },
  ],
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.statics.findByCredentials = async (phone_number, password) => {
  const user = await User.findOne({ phone_number });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
