const config = require("../config/config");

const generateURL = (req) => {
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const port = config.port;

  return `${protocol}://${host}:${port}${url}`;
};

module.exports = {
  generateURL,
};
