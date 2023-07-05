const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { User } = require("../models");
// const userService = require("../services/user.service");

// token is retrieved from authorization header and check if its valid
const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwt.secret,
      function (err, decode) {
        if (err) {
          req.user = null;
          req.message = "Invalid JWT token: " + err;
          next();
        }

        User.findOne({
          _id: decode.sub,
        })
          .then((user) => {
            req.user = user;
            req.message = "User validated";
            next();
          })
          .catch((err) => {
            req.user = null;
            req.message = "User not found";
            next();
          });
      }
    );
  } else {
    req.user = null;
    req.message = "Authorization Header not found";
    next();
  }
};

module.exports = {
  verifyToken,
};
