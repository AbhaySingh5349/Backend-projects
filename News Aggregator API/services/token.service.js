const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    type: type,
    iat: Math.floor(Date.now() / 1000),
    exp: expires,
  };

  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  // expiration timestamp (in seconds) is 60 minutes after it is generated
  const tokenExpires =
    Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;
  const jwtToken = generateToken(user._id, tokenExpires, "access");

  return {
    access: {
      token: jwtToken,
      expires: new Date(tokenExpires * 1000),
    },
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
