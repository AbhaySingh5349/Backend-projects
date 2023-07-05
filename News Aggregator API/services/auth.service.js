const userService = require("./user.service");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user_obj = await userService.getUserByEmail(email);

  let matched = false;
  if (user_obj.user) {
    matched = await user_obj.user.isPasswordMatch(password);
  } else {
    return {
      user: null,
      message: user_obj.message,
    };
  }

  if (matched) {
    return {
      user: user_obj.user,
      message: "User logged in successfully!",
    };
  }
  return {
    user: null,
    message: "Incorrect password!",
  };
};

module.exports = {
  loginUserWithEmailAndPassword,
};
