const { User } = require("../models");
const bcrypt = require("bcrypt");

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    return {
      user: null,
      message: "Email Already Taken",
    };
  }

  if (!(await User.isStrongPassword(userBody.password))) {
    return {
      user: null,
      message: "Password must contain at least one letter and one number",
    };
  }

  const hashedPassword = await bcrypt.hash(userBody.password, 12);
  userBody.password = hashedPassword;
  const user = await User.create(userBody);
  if (user) {
    return {
      user: user,
      message: "User created successfully",
    };
  }
  return {
    user: null,
    message: "Failed to create user",
  };
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return {
        user: user,
        message: "User found with given email",
      };
    } else {
      return {
        user: null,
        message: "User not found with given email",
      };
    }
  } catch (err) {
    return {
      user: null,
      message: err,
    };
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById({ _id: id });
    return {
      user: user,
      message: "User found with given id",
    };
  } catch (err) {
    return {
      user: null,
      message: err,
    };
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
