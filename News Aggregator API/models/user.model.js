const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "name not provided "],
    minlength: [2, "minimum 2 characters required in name"],
    maxlength: [30, "number of characters in name exceeding 30"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "email not provided"],
    unique: true,
    validate: [validator.isEmail, "invalid email"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "password not provided "],
    minLength: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// since arrow function do not have their own 'this', so we use normal function notation
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return user != null;
};

userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.isStrongPassword = async (password) => {
  if (!password.match(/\d/) || !password.match(/[a-zA-Z]/)) {
    return false;
  }
  return true;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
