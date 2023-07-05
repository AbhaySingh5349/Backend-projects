const { authService, userService, tokenService } = require("../services");

const register = async (req, res) => {
  const user_obj = await userService.createUser(req.body);

  if (user_obj.user) {
    res.status(201);
  } else {
    res.status(400);
  }

  return res.send(user_obj);
};

const login = async (req, res) => {
  const user_obj = await authService.loginUserWithEmailAndPassword(
    req.body.email,
    req.body.password
  );

  if (!user_obj.user) {
    return res.status(400).send(user_obj);
  }
  const token = await tokenService.generateAuthTokens(user_obj.user);

  return res.status(200).send({ user_obj, token });
};

module.exports = {
  register,
  login,
};
