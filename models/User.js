const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add your first name!"],
  },
  lastname: {
    type: String,
    required: [true, "Please add your first name!"],
  },
  birthdate: {
    type: Date,
    required: [true, "Please add your birthdate!"],
  },
  address: {
    type: String,
    required: [true, "Please add your address"],
  },
  city: {
    type: String,
    required: [true, "Please add your city"],
  },
  mobilenumber: {
    type: Number,
    required: [true, "Please add your mobile number"],
    minlength: 11,
  },
  email: {
    type: String,
    required: [true, "Please add your email address"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-?\w+])*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add your password"],
    // minlength: 11,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
