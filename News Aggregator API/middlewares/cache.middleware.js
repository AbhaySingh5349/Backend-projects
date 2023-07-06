const Redis = require("ioredis");
const utils = require("../utils/utils");

// Create a Redis client
const redisClient = new Redis({
  host: "localhost", // Redis server host
  port: 6379, // Redis server port
});

const redisCache = async (req, res, next) => {
  const cacheKey = utils.generateURL(req);

  const cachedNewsArticles = await redisClient.get(cacheKey);
  if (cachedNewsArticles) {
    return res.status(200).send(JSON.parse(cachedNewsArticles));
  }

  next(); // If data is not cached, proceed to the next middleware or route handler
};

module.exports = {
  redisCache,
  redisClient,
};
